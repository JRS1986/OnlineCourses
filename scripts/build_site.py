#!/usr/bin/env python3
"""Build a dependency-free Pages artifact from the maintained guide and assessment."""
import json
import hashlib
import re
import shutil
from dataclasses import asdict
from pathlib import Path
from assess import PATHS, QUESTIONS, REFRESHERS

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / '_site'
GROUPS = {'P': 'Foundations', 'W': 'AI at work', 'D': 'Developing AI', 'T': 'Teaching'}
DESCRIPTIONS = {
    'P0': 'Find the right place for AI in your work.',
    'P1': 'Read, write, and verify small Python programs.',
    'W1': 'Turn information into useful, source-checked work.',
    'W2': 'Explore design alternatives without losing engineering judgment.',
    'W3': 'Use AI to compare components and review electronics.',
    'W4': 'Direct coding assistants through small, verifiable changes.',
    'D1': 'Put a small, responsive model inside a constrained device.',
    'D2': 'Bring perception and coordination close to the machine.',
    'D3': 'Build systems that plan, use tools, and know when to stop.',
    'D4': 'Make reliable predictions from industrial data.',
    'T1': 'Turn a learning path into a team session or lecture.',
}
# Resources that are neither a course nor a reading; everything else follows its C/R prefix.
TYPES = {'C28': 'Courseware', 'C29': 'Tutorial', 'C37': 'Video series', 'C51': 'Courseware', 'R22': 'Dataset'}


def extract_data():
    catalogue = (ROOT / 'docs/CATALOG.md').read_text()
    courses = []
    category = ''
    for line in catalogue.splitlines():
        if line.startswith('## '):
            category = line[3:]
        match = re.search(r'<a id="([cr]\d+)"', line)
        if not match:
            continue
        cells = [cell.strip() for cell in line.strip('|').split('|')]
        resource = re.search(r'\[([^\]]+)\]\((https?://[^\s)]+)\)', cells[0])
        if resource is None:
            raise ValueError('Missing primary resource link: ' + line)
        identifier = match[1].upper()
        reading = identifier.startswith('R')
        provider = cells[0].split(' — ', 1)[1] if ' — ' in cells[0] else 'Author / provider documentation'
        access = cells[-1]
        label = 'Public reading' if reading else ('Platform access' if access.startswith('Platform') else 'Video tier' if access.startswith('Video tier') else 'Open / free material')
        if identifier == 'C13':
            label = 'Access varies'
        courses.append({'id': identifier, 'title': resource[1], 'url': resource[2], 'provider': provider,
                        'category': category, 'type': TYPES.get(identifier, 'Reading' if reading else 'Course'),
                        'prerequisites': '' if reading else cells[1], 'scope': cells[1] if reading else cells[2],
                        'access': access, 'accessLabel': label})
    source = (ROOT / 'docs/LEARNING_PATHS.md').read_text()
    sections = re.split(r'^## ', source, flags=re.M)[1:]
    paths = []
    for key, value in PATHS.items():
        section = next(s for s in sections if s.startswith(key + ' '))
        body = section.split('\n', 1)[1].strip()
        lines = body.splitlines()
        steps = []
        for line in lines:
            cells = [cell.strip() for cell in line.strip('|').split('|')]
            if line.startswith('|') and len(cells) == 3 and cells[0].isdigit():
                steps.append({'order': int(cells[0]), 'text': cells[1], 'hours': float(cells[2])})
        if sum(s['hours'] for s in steps) != value.hours:
            raise ValueError('Study hours do not add up for ' + key)
        table_start = next(i for i, line in enumerate(lines) if line.startswith('|'))
        table_end = table_start
        while table_end < len(lines) and lines[table_end].startswith('|'):
            table_end += 1
        paths.append({'id': key, **asdict(value), 'group': GROUPS[key[0]], 'description': DESCRIPTIONS[key],
                      'intro': '\n'.join(lines[:table_start]).strip(), 'steps': steps,
                      'outcome': '\n'.join(lines[table_end:]).strip(),
                      'allResources': list(dict.fromkeys(re.findall(r'CATALOG\.md#([cr]\d+)', body.upper(), re.I)))})
        paths[-1]['allResources'] = [r.upper() for r in paths[-1]['allResources']]
    docs = {}
    for path in sorted((ROOT / 'docs').glob('*.md')):
        docs[path.stem.lower().replace('_', '-')] = {'title': path.read_text().splitlines()[0].removeprefix('# '), 'source': 'docs/' + path.name, 'body': path.read_text()}
    for path in [ROOT / 'CONTRIBUTING.md', ROOT / 'templates/LEARNING_RECORD.md']:
        docs[path.stem.lower().replace('_', '-')] = {'title': path.read_text().splitlines()[0].removeprefix('# '), 'source': str(path.relative_to(ROOT)), 'body': path.read_text()}
    ids = {c['id'] for c in courses}
    for path in paths:
        if not set(path['allResources']).issubset(ids):
            raise ValueError('Unknown resource in ' + path['id'])
    return {'schemaVersion': 1, 'reviewed': '2026-10-26', 'repository': 'https://github.com/JRS1986/OnlineCourses',
            'paths': paths, 'courses': courses, 'questions': [asdict(q) for q in QUESTIONS],
            'refreshers': REFRESHERS, 'guides': docs}


def main():
    data = extract_data()
    # Only remove our generated artifact, never source or an arbitrary CLI path.
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    shutil.copytree(ROOT / 'web', OUTPUT)
    payload = json.dumps(data, ensure_ascii=False, separators=(',', ':')) + '\n'
    (OUTPUT / 'data.json').write_text(payload)
    # Version the entire module graph, styles, and curriculum together. Old
    # browser caches must not mix a fresh entry module with stale dependencies.
    sources = {path.name: path.read_text() for path in sorted((ROOT / 'web').iterdir()) if path.is_file()}
    version = hashlib.sha256((json.dumps(sources, sort_keys=True) + payload).encode()).hexdigest()[:12]
    names = {name: f'{Path(name).stem}.{version}{Path(name).suffix}' for name in [*sources, 'data.json'] if name != 'index.html'}
    def version_links(text):
        for old, new in names.items():
            text = text.replace('./' + old, './' + new)
        return text
    for name, source in sources.items():
        target = 'index.html' if name == 'index.html' else names[name]
        (OUTPUT / target).write_text(version_links(source))
    (OUTPUT / names['data.json']).write_text(payload)
    (OUTPUT / 'asset-manifest.json').write_text(json.dumps({'version': version, 'assets': names}) + '\n')
    (OUTPUT / '.nojekyll').touch()
    print(f'Built {OUTPUT}: {len(data["paths"])} paths, {len(data["courses"])} resources, {len(data["questions"])} questions.')


if __name__ == '__main__':
    main()
