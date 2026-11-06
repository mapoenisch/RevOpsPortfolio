/** IANA-reservierte Beispieldomains; keine beliebigen realen Empfänger. */
export function isSyntheticEmail(email) {
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return false;
  const domain = email.trim().toLowerCase().split('@')[1];
  return domain.endsWith('.example') || ['example.com', 'example.org', 'example.net'].includes(domain);
}

/** Fachregeln der Demo; gleicher Code in Website, CLI und lokalem Gateway. */
export function normalizeLead(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const text = (value, max = 120) => typeof value === 'string' ? value.trim().slice(0, max) : '';
  const email = text(input.email, 254).toLowerCase();
  const eventId = text(input.eventId, 100);
  const company = text(input.company);
  if (!/^[a-zA-Z0-9._-]{1,100}$/.test(eventId) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !company) return null;
  if (!Number.isInteger(input.employees) || input.employees < 1 || input.employees > 1000000) return null;
  return {
    eventId, email, company, firstName: text(input.firstName), lastName: text(input.lastName),
    employees: input.employees, source: text(input.source) || 'demo',
    domain: email.split('@')[1], owner: input.employees < 50 ? 'inside-sales' : 'account-management',
  };
}

/** Serialisierung und persistierbare Zwischenstände verhindern doppelte Folgeaufgaben. */
export function createRouter({ crm, store = new Map(), save = async () => {} }) {
  let queue = Promise.resolve();
  async function process(input) {
    const lead = normalizeLead(input);
    if (!lead) return { status: 'review', reason: 'Pflichtangaben fehlen oder haben ein ungültiges Format.', steps: ['Eingang prüfen', 'Manuelle Prüfung'] };
    const key = `email:${lead.email}`;
    const event = store.get(`event:${lead.eventId}`);
    if (event && event !== key) return { status: 'review', reason: 'Die Event-ID gehört bereits zu einer anderen Anfrage.', steps: ['Event-ID prüfen', 'Manuelle Prüfung'] };
    let record = store.get(key);
    if (record?.status === 'done') {
      store.set(`event:${lead.eventId}`, key);
      try { await save(store); } catch { return { status: 'error', retryable: true, reason: 'Event-Zuordnung konnte nicht gesichert werden. Kein weiterer CRM-Zugriff.', steps: ['Dublette erkannt', 'Speichern unterbrochen'] }; }
      return { status: 'duplicate', contactId: record.contactId, taskId: record.taskId, owner: lead.owner, reason: 'Anfrage bereits bearbeitet. Keine weitere Aufgabe angelegt.', steps: ['Eingang prüfen', 'E-Mail normalisieren', 'Dublette erkannt'] };
    }
    if (record?.uncertain || record?.taskStarted) return { status: 'review', reason: 'Der letzte Schreibvorgang ist unklar. Vor erneutem Versand im CRM prüfen.', steps: ['Zwischenstand laden', 'Manuelle Prüfung'] };
    record ??= { status: 'pending' };
    store.set(`event:${lead.eventId}`, key);
    store.set(key, record);
    const steps = ['Eingang prüfen', 'E-Mail normalisieren', 'Zuständigkeit zuordnen'];
    try {
      await save(store);
      if (!record.contactId) {
        const contact = await crm.upsertContact(lead);
        if(!contact?.id) { const error = new Error('CRM_CONTACT_RESULT_UNCERTAIN'); error.uncertain = true; throw error; }
        record.contactId = String(contact.id);
        await save(store);
      }
      steps.push('Kontakt abgleichen');
      if (!record.taskId) {
        record.taskStarted = true;
        await save(store);
        const task = await crm.ensureTask(record.contactId, lead);
        if(!task?.id) { const error = new Error('CRM_TASK_RESULT_UNCERTAIN'); error.uncertain = true; throw error; }
        record.taskId = String(task.id);
        record.taskStarted = false;
        await save(store);
      }
      record.status = 'done';
      await save(store);
      steps.push('Folgeaufgabe angelegt');
      return { status: 'accepted', contactId: record.contactId, taskId: record.taskId, owner: lead.owner, steps };
    } catch (error) {
      if (error?.uncertain) record.uncertain = true;
      else record.taskStarted = false;
      // Keine API-Fehlermeldungen oder Credentials in Antworten/Belegen.
      try { await save(store); } catch { record.uncertain = true; }
      return { status: 'error', retryable: !record.uncertain, reason: record.uncertain ? 'Unklarer Schreibstatus. Manuelle Prüfung erforderlich.' : 'CRM vorübergehend nicht erreichbar. Gesicherter Zwischenstand bleibt erhalten.', steps: [...steps, 'Bearbeitung unterbrochen'] };
    }
  }
  return {
    route(input) {
      const result = queue.then(() => process(input));
      queue = result.then(() => undefined, () => undefined);
      return result;
    },
  };
}
