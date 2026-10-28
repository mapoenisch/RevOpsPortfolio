import { createHash } from 'node:crypto';
import { isSyntheticEmail } from './core.mjs';

export function createLocalCrm(state) {
  state.contacts ??= {}; state.tasks ??= {};
  return {
    async upsertContact(lead) {
      state.contacts[lead.email] ??= { ...lead, id: `local-contact-${Object.keys(state.contacts).length + 1}` };
      return state.contacts[lead.email];
    },
    async ensureTask(contactId, lead) {
      state.tasks[lead.email] ??= { id: `local-task-${Object.keys(state.tasks).length + 1}`, contactId, owner: lead.owner, title: 'Anfrage qualifizieren' };
      return state.tasks[lead.email];
    },
  };
}

export function createHubSpotCrm({ token, portalId, ownerSmall, ownerLarge, fetcher = fetch }) {
  if (!token || !portalId || !ownerSmall || !ownerLarge) throw new Error('HUBSPOT_TEST_NOT_CONFIGURED');
  let checked;
  async function request(path, method = 'GET', body) {
    let response;
    try {
      response = await fetcher(`https://api.hubapi.com${path}`, { method, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(15000) });
    } catch {
      const error = new Error('HUBSPOT_NETWORK_ERROR'); error.uncertain = method !== 'GET'; throw error;
    }
    if (!response.ok) { const error = new Error(`HUBSPOT_HTTP_${response.status}`); error.uncertain = method !== 'GET' && response.status >= 500; throw error; }
    try { return await response.json(); } catch { const error = new Error('HUBSPOT_RESPONSE_INVALID'); error.uncertain = method !== 'GET'; throw error; }
  }
  async function preflight() {
    checked ??= request('/account-info/v3/details').then(info => { if (String(info.portalId) !== String(portalId)) throw new Error('HUBSPOT_PORTAL_MISMATCH'); }).catch(error => { checked = undefined; throw error; });
    return checked;
  }
  return {
    async upsertContact(lead) {
      if (!isSyntheticEmail(lead.email) || lead.source !== 'demo') throw new Error('SYNTHETIC_DEMO_DATA_ONLY');
      await preflight();
      const properties = { email: lead.email, firstname: lead.firstName, lastname: lead.lastName, company: lead.company, hubspot_owner_id: lead.owner === 'inside-sales' ? ownerSmall : ownerLarge };
      const response = await request('/crm/v3/objects/contacts/batch/upsert', 'POST', { inputs: [{ id: lead.email, idProperty: 'email', properties }] });
      if (!response.results?.[0]?.id || response.errors?.length) { const error = new Error('HUBSPOT_CONTACT_UNCERTAIN'); error.uncertain = true; throw error; }
      return response.results[0];
    },
    async ensureTask(contactId, lead) {
      await preflight();
      const marker = createHash('sha256').update(lead.email).digest('hex').slice(0, 12);
      const subject = `[LP-DEMO ${marker}] Anfrage qualifizieren`;
      const existing = await request('/crm/v3/objects/tasks/search', 'POST', { filterGroups: [{ filters: [{ propertyName: 'hs_task_subject', operator: 'EQ', value: subject }] }], limit: 1 });
      if (existing.results?.[0]) return existing.results[0];
      return request('/crm/v3/objects/tasks', 'POST', {
        properties: { hs_task_subject: subject, hs_task_body: 'Synthetischer Portfolio-Test. Keine reale Kundenanfrage.', hs_timestamp: new Date().toISOString(), hs_task_status: 'NOT_STARTED', hs_task_priority: 'MEDIUM', hs_task_type: 'TODO', hubspot_owner_id: lead.owner === 'inside-sales' ? ownerSmall : ownerLarge },
        associations: [{ to: { id: contactId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 204 }] }],
      });
    },
  };
}
