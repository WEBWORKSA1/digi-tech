// Saves a daily snapshot of the tech pulse into _data/pulse.json.
// The live page refreshes itself in the visitor's browser; this snapshot is what
// search engines and visitors without JavaScript see. Needs Node 20 or later, no packages.
import { readFile, writeFile } from 'node:fs/promises';

const FILE = new URL('../_data/pulse.json', import.meta.url);
const since = new Date(Date.now() - 14 * 864e5).toISOString().slice(0, 10);
const headers = { Accept: 'application/json', 'User-Agent': 'digi-tech-pulse' };
const clean = (s, n = 160) => String(s || '').replace(/\s+/g, ' ').trim().slice(0, n);

const feeds = {
  hn: {
    url: 'https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=15',
    map: (d) => d.hits.map((x) => ({
      t: clean(x.title),
      u: x.url || `https://news.ycombinator.com/item?id=${x.objectID}`,
      m: `${x.points || 0} points, ${x.num_comments || 0} comments`
    }))
  },
  dev: {
    url: 'https://dev.to/api/articles?top=7&per_page=15',
    map: (d) => d.map((x) => ({
      t: clean(x.title),
      u: x.url,
      m: `${x.user?.name ? x.user.name + ', ' : ''}${x.reading_time_minutes || 1} min read`
    }))
  },
  gh: {
    url: `https://api.github.com/search/repositories?q=${encodeURIComponent(`created:>${since} stars:>50`)}&sort=stars&order=desc&per_page=15`,
    map: (d) => d.items.map((x) => ({
      t: clean(x.full_name),
      u: x.html_url,
      m: clean(`${(x.stargazers_count || 0).toLocaleString('en-US')} stars${x.language ? ', ' + x.language : ''}${x.description ? '. ' + x.description : ''}`, 150)
    }))
  }
};

let current = { updated: '', hn: [], dev: [], gh: [] };
try { current = { ...current, ...JSON.parse(await readFile(FILE, 'utf8')) }; } catch {}

let changed = 0;
for (const [key, feed] of Object.entries(feeds)) {
  try {
    const res = await fetch(feed.url, { headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const items = feed.map(await res.json()).filter((it) => it.t && /^https?:\/\//.test(it.u));
    if (!items.length) throw new Error('empty list');
    current[key] = items;
    changed++;
    console.log(`${key}: ${items.length} items`);
  } catch (err) {
    console.warn(`${key}: kept previous list (${err.message})`);
  }
}

if (changed) {
  current.updated = new Date().toISOString().slice(0, 10);
  await writeFile(FILE, JSON.stringify(current, null, 1) + '\n');
  console.log('Snapshot saved.');
} else {
  console.log('No feed responded. Snapshot left unchanged.');
}
