const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

const storageKey = 'leadpilot-review-selection-v1';
let remembered = {};
try { remembered = JSON.parse(localStorage.getItem(storageKey) || '{}'); }
catch { remembered = {}; }
if (!remembered || Array.isArray(remembered) || typeof remembered !== 'object') remembered = {};

const sectionsRoot = document.querySelector('#sections');
const navRoot = document.querySelector('#section-nav');
const count = document.querySelector('#count');
const copy = document.querySelector('#copy-selection');
const clear = document.querySelector('#clear-selection');
const selectedList = document.querySelector('#selected-list');
const selectionDescription = document.querySelector('#selection-description');
const status = document.querySelector('#copy-status');
const fallbackLabel = document.querySelector('#fallback-label');
const fallback = document.querySelector('#copy-fallback');
let items = [];

function mediaMarkup(item) {
  const id = escapeHTML(item.id);
  const title = escapeHTML(item.title);
  const kind = item.kind;
  if (['png', 'jpg', 'jpeg'].includes(kind)) {
    return `<img src="/file/${id}" alt="${title}" loading="lazy"><span class="media-badge">BILD</span>`;
  }
  if (kind === 'html-dashboard') {
    return `<img src="/poster/${id}" alt="Vorhandene Ansicht des ursprünglichen Unternehmensdashboards" loading="lazy"><span class="media-badge">HISTORISCHE ANSICHT</span>`;
  }
  if (['mp4', 'webm'].includes(kind)) {
    return `<video controls preload="none" poster="/poster/${id}" aria-label="${title}"><source src="/file/${id}">Dein Browser unterstützt dieses Video nicht.</video><span class="media-badge">VIDEO · ORIGINAL</span>`;
  }
  if (kind === 'font') {
    return '<div class="font-sample"><strong>LeadPilot Grotesk</strong><span>Von der Idee zur Anwendung.</span><small>Aa Bb Cc 0123456789</small></div><span class="media-badge">SCHRIFTPROBE</span>';
  }
  if (kind === 'colors') {
    return '<div class="color-sample"><div class="swatch"><i style="background:#061613"></i>#061613</div><div class="swatch"><i style="background:#123330"></i>#123330</div><div class="swatch"><i style="background:#00D9C6"></i>#00D9C6</div><div class="swatch"><i style="background:#FF7A3D"></i>#FF7A3D</div></div><span class="media-badge">ORIGINAL-TOKENS</span>';
  }
  if (item.pages.length) {
    return `<div class="document-pages">${item.pages.map(page => `<a href="/file/${id}" target="_blank" rel="noopener" aria-label="${title}: Original öffnen, Vorschau Seite ${page}"><img src="/preview/${id}?page=${page}" loading="lazy" alt="Vorschau ${title}, Seite ${page}" onerror="this.alt='Vorschau nicht verfügbar. Original über den Link öffnen.'"></a>`).join('')}</div><span class="media-badge">${escapeHTML(kind.toUpperCase())} · SEITEN ${item.pages.join(' / ')}</span>`;
  }
  return `<div class="text-sample">${escapeHTML(item.excerpt || 'Originaldatei über den Link öffnen.')}</div><span class="media-badge">TEXT-AUSZUG</span>`;
}

function cardMarkup(item) {
  const id = escapeHTML(item.id);
  const selected = Object.prototype.hasOwnProperty.call(remembered, item.id);
  const note = selected ? remembered[item.id] : '';
  const filename = escapeHTML(item.filename);
  return `<article class="card" id="${id}">
    <div class="card-media">${mediaMarkup(item)}</div>
    <div class="card-body">
      <span class="card-id">${id}</span>
      <h4 class="card-title">${escapeHTML(item.title)}</h4>
      <p class="card-description">${escapeHTML(item.description)}</p>
      <p class="card-meta">Datei: ${filename}<br>Geändert: ${escapeHTML(item.modified)} · kein automatischer Entstehungsnachweis</p>
      ${item.pages.length > 1 ? '<p class="card-meta">Weitere Vorschauseiten im Bildbereich seitlich scrollen.</p>' : ''}
      ${['pptx', 'docx'].includes(item.kind) ? '<p class="card-meta">Automatisch erzeugte Vorschau: Schrift und Umbrüche können vom Original abweichen.</p>' : ''}
      <div class="why"><strong>Warum vorgeschlagen</strong><p>${escapeHTML(item.recommendation)}</p></div>
      <div class="card-use"><strong>Mögliche Verwendung</strong><p>${escapeHTML(item.use)}</p></div>
      ${item.note ? `<div class="card-note"><strong>Einordnung</strong><p>${escapeHTML(item.note)}</p></div>` : ''}
      <label class="candidate-notes">Dein Hinweis zu diesem Material
        <textarea data-note="${id}" placeholder="Zum Beispiel: nur Seite 1 oder bitte zuschneiden">${escapeHTML(note)}</textarea>
      </label>
      <div class="card-bottom"><a class="source-link" href="/file/${id}" target="_blank" rel="noopener">${item.kind.startsWith('html') ? 'Original als HTML-Text ↗' : 'Original öffnen ↗'}</a>
        <label class="pick"><input type="checkbox" data-pick="${id}" ${selected ? 'checked' : ''}> Vormerken</label></div>
    </div>
  </article>`;
}

function updateSelection() {
  const known = new Map(items.map(item => [item.id,item]));
  const keys = Object.keys(remembered).filter(id => known.has(id)).sort();
  count.textContent = keys.length;
  copy.disabled = keys.length === 0;
  clear.disabled = keys.length === 0;
  selectionDescription.textContent = keys.length
    ? 'Deine Auswahl bleibt auf diesem Gerät gespeichert. Kopiere sie anschließend in den Chat.'
    : 'Noch nichts vorgemerkt. Du kannst beliebig viele Kandidaten markieren.';
  selectedList.replaceChildren(...keys.map(id => {
    const chip = document.createElement('span');
    chip.textContent = id;
    return chip;
  }));
  try { localStorage.setItem(storageKey, JSON.stringify(remembered)); }
  catch { status.textContent = 'Die Merkliste kann in diesem Browser nicht dauerhaft gespeichert werden.'; }
}

function selectedText() {
  const titles = new Map(items.map(item => [item.id,item.title]));
  return 'Meine Auswahl für die LeadPilot-Chronik:\n' + Object.keys(remembered).sort()
    .filter(id => titles.has(id))
    .map(id => `- ${id} · ${titles.get(id)}${remembered[id].trim() ? ': ' + remembered[id].trim() : ''}`).join('\n')
    + '\n\nBitte weitere Entscheidungen oder ausgeschlossene Materialien bei Bedarf ergänzen.';
}

document.addEventListener('change', event => {
  const checkbox = event.target.closest('[data-pick]');
  if (!checkbox) return;
  const id = checkbox.dataset.pick;
  if (checkbox.checked) remembered[id] = '';
  else delete remembered[id];
  const textarea = document.querySelector(`[data-note="${id}"]`);
  if (textarea && !checkbox.checked) textarea.value = '';
  status.textContent = '';
  updateSelection();
});
document.addEventListener('input', event => {
  const textarea = event.target.closest('[data-note]');
  if (!textarea || !(textarea.dataset.note in remembered)) return;
  remembered[textarea.dataset.note] = textarea.value;
  updateSelection();
});
copy.addEventListener('click', async () => {
  const text = selectedText();
  try {
    await navigator.clipboard.writeText(text);
    fallbackLabel.hidden = true;
    status.textContent = 'Kopiert. Füge die Liste jetzt in den Chat ein.';
  } catch {
    fallback.value = text;
    fallbackLabel.hidden = false;
    fallback.focus();
    fallback.select();
    status.textContent = 'Automatisches Kopieren nicht verfügbar. Kopiere den markierten Text.';
  }
});
clear.addEventListener('click', () => {
  remembered = {};
  document.querySelectorAll('[data-pick]').forEach(box => { box.checked = false; });
  document.querySelectorAll('[data-note]').forEach(box => { box.value = ''; });
  fallbackLabel.hidden = true;
  status.textContent = 'Merkliste geleert.';
  updateSelection();
});

fetch('/api/material').then(response => {
  if (!response.ok) throw new Error('Materialübersicht nicht verfügbar');
  return response.json();
}).then(data => {
  items = data.items;
  const ids = new Set(items.map(item => item.id));
  remembered = Object.fromEntries(Object.entries(remembered).filter(([id]) => ids.has(id)));
  document.querySelector('#materials-count').textContent = `${items.length} Vorschläge aus acht Projektkapiteln`;
  navRoot.innerHTML = data.sections.map(([number,, title]) =>
    `<a href="#chapter-${escapeHTML(number)}"><span>${escapeHTML(number)}</span>${escapeHTML(title)}</a>`).join('');
  sectionsRoot.innerHTML = data.sections.map(([number,kicker,title,description]) => {
    const entries = items.filter(item => item.id.startsWith(`LP-${number}-`));
    return `<section class="milestone" id="chapter-${escapeHTML(number)}" aria-labelledby="title-${escapeHTML(number)}">
      <div class="milestone-header"><span class="milestone-number">${escapeHTML(number)} / 08</span><div>
        <p class="milestone-kicker">${escapeHTML(kicker.toUpperCase())}</p>
        <h3 id="title-${escapeHTML(number)}">${escapeHTML(title)}</h3><p>${escapeHTML(description)}</p></div></div>
      <div class="cards">${entries.map(cardMarkup).join('')}</div></section>`;
  }).join('');
  updateSelection();
}).catch(error => {
  document.querySelector('#materials-count').textContent = 'Material konnte nicht geladen werden.';
  sectionsRoot.textContent = error.message + '. Bitte den lokalen Vorschau-Server prüfen.';
});
