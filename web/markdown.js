// Deliberately small renderer for this repository's Markdown. Raw HTML is never executed.
export const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const slug = value => value.toLowerCase().replace(/[^\p{L}\p{N}_\- ]/gu, '').replaceAll(' ', '-');

export function createMarkdown(data) {
  function hrefFor(raw, source = 'docs/CATALOG.md') {
    if (/^https?:\/\//i.test(raw)) return raw;
    if (/^[a-z][\w+.-]*:/i.test(raw) || raw.startsWith('//')) return null;
    const url = new URL(raw, `https://guide.local/${source}`);
    const filename = url.pathname.split('/').pop();
    const anchor = decodeURIComponent(url.hash.slice(1));
    if (filename === 'README.md') return '#home';
    if (filename === 'CATALOG.md') return anchor ? `#courses/${encodeURIComponent(anchor.toUpperCase())}` : '#courses';
    if (filename === 'LEARNING_PATHS.md') {
      const path = data.paths.find(p => p.anchor === anchor);
      return path ? `#paths/${path.id}` : '#paths';
    }
    if (filename?.endsWith('.md')) {
      const id = filename.slice(0, -3).toLowerCase().replaceAll('_', '-');
      if (data.guides[id]) return `#guide/${id}${anchor ? '?section=' + encodeURIComponent(anchor) : ''}`;
    }
    return `${data.repository}/blob/master${url.pathname}${url.hash}`;
  }

  function inline(text, source, depth = 0) {
    if (depth > 8) return escapeHTML(text);
    text = text.replace(/<a\s+(?:id|name)="[\w-]+"><\/a>/g, '');
    const token = /`([^`]+)`|\[([^\]]+)\]\(([^\s)]+)(?:\s+"[^"]*")?\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
    let html = '', position = 0;
    for (const m of text.matchAll(token)) {
      html += escapeHTML(text.slice(position, m.index));
      if (m[1] !== undefined) html += `<code>${escapeHTML(m[1])}</code>`;
      else if (m[2] !== undefined) {
        const href = hrefFor(m[3], source);
        html += href ? `<a href="${escapeHTML(href)}"${/^https?:/.test(href) ? ' target="_blank" rel="noopener noreferrer"' : ''}>${inline(m[2], source, depth + 1)}</a>` : escapeHTML(m[2]);
      } else if (m[4] !== undefined) html += `<strong>${inline(m[4], source, depth + 1)}</strong>`;
      else html += `<em>${inline(m[5], source, depth + 1)}</em>`;
      position = m.index + m[0].length;
    }
    return html + escapeHTML(text.slice(position));
  }

  function render(markdown, source = 'docs/CATALOG.md', {skipTitle = false} = {}) {
    const lines = markdown.split('\n');
    const html = [];
    const used = new Map();
    for (let i = 0; i < lines.length;) {
      let line = lines[i];
      if (!line.trim()) { i++; continue; }
      if (line.startsWith('```')) {
        const lang = line.slice(3).trim();
        const block = [];
        while (++i < lines.length && !lines[i].startsWith('```')) block.push(lines[i]);
        i++;
        if (lang === 'mermaid' && source === 'docs/INDUSTRIAL_AI.md') {
          html.push('<div class="mini-diagram" aria-label="Recorded input to embedded classification, edge evidence, agent recommendation, then engineer review"><span>Recorded input</span> → <span>Embedded: classify</span> → <span>Edge: combine</span> → <span>Agent: recommend</span> → <span>Engineer: verify</span></div>');
        } else html.push(`<pre><code>${escapeHTML(block.join('\n'))}</code></pre>`);
        continue;
      }
      const heading = line.match(/^(#{1,6})\s+(.+)$/);
      if (heading) {
        i++;
        if (skipTitle && heading[1].length === 1) continue;
        const base = slug(heading[2]);
        const count = used.get(base) || 0; used.set(base, count + 1);
        const id = base + (count ? '-' + count : '');
        html.push(`<h${heading[1].length} id="${escapeHTML(id)}">${inline(heading[2], source)}</h${heading[1].length}>`);
        continue;
      }
      if (line.startsWith('|') && lines[i + 1]?.match(/^\|[\s:|\-]+\|$/)) {
        const cells = row => row.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
        const header = cells(line); i += 2;
        const rows = [];
        while (i < lines.length && lines[i].startsWith('|')) rows.push(cells(lines[i++]));
        html.push(`<div class="table-wrap"><table><thead><tr>${header.map(c => `<th scope="col">${inline(c, source)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(c => `<td>${inline(c, source)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
        continue;
      }
      if (/^(?:- |\d+\. )/.test(line)) {
        const ordered = /^\d+\./.test(line); const tag = ordered ? 'ol' : 'ul'; const items = [];
        const pattern = ordered ? /^\d+\. / : /^- /;
        while (i < lines.length && pattern.test(lines[i])) items.push(`<li>${inline(lines[i++].replace(pattern, ''), source)}</li>`);
        html.push(`<${tag}>${items.join('')}</${tag}>`); continue;
      }
      if (line.startsWith('> ')) {
        const items = [];
        while (i < lines.length && lines[i].startsWith('> ')) items.push(lines[i++].slice(2));
        html.push(`<blockquote>${inline(items.join(' '), source)}</blockquote>`); continue;
      }
      if (line === '<details>' || line === '</details>') { html.push(line); i++; continue; }
      if (/^<summary>.*<\/summary>$/.test(line)) { html.push(`<summary>${inline(line.slice(9, -10), source)}</summary>`); i++; continue; }
      const paragraph = [line]; i++;
      while (i < lines.length && lines[i].trim() && !/^(?:#|\||```|- |\d+\. |> |<details>|<\/details>|<summary>)/.test(lines[i])) paragraph.push(lines[i++]);
      html.push(`<p>${inline(paragraph.join(' '), source)}</p>`);
    }
    return html.join('\n');
  }
  return {inline, render, hrefFor};
}
