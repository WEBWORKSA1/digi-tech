/* Digi.Tech pulse: live headlines pulled in the visitor's browser from public APIs.
   Only titles and links are shown; every item opens on its original site. */
(function () {
  'use strict';
  var DT = window.DT, h = DT.h;
  var since = new Date(Date.now() - 14 * 864e5).toISOString().slice(0, 10);
  var feeds = {
    hn: {
      url: 'https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=15',
      map: function (d) {
        return d.hits.map(function (x) {
          return { t: x.title, u: x.url || 'https://news.ycombinator.com/item?id=' + x.objectID, m: (x.points || 0) + ' points, ' + (x.num_comments || 0) + ' comments' };
        });
      }
    },
    dev: {
      url: 'https://dev.to/api/articles?top=7&per_page=15',
      map: function (d) {
        return d.map(function (x) {
          return { t: x.title, u: x.url, m: (x.user && x.user.name ? x.user.name + ', ' : '') + (x.reading_time_minutes || 1) + ' min read' };
        });
      }
    },
    gh: {
      url: 'https://api.github.com/search/repositories?q=' + encodeURIComponent('created:>' + since + ' stars:>50') + '&sort=stars&order=desc&per_page=15',
      map: function (d) {
        return d.items.map(function (x) {
          return { t: x.full_name, u: x.html_url, m: (x.stargazers_count || 0).toLocaleString() + ' stars' + (x.language ? ', ' + x.language : '') + (x.description ? '. ' + x.description.slice(0, 110) : '') };
        });
      }
    }
  };

  function cached(key) {
    try {
      var c = JSON.parse(sessionStorage.getItem('dt-feed-' + key));
      if (c && Date.now() - c.at < 6e5) return c.items;
    } catch (e) {}
    return null;
  }
  function keep(key, items) { try { sessionStorage.setItem('dt-feed-' + key, JSON.stringify({ at: Date.now(), items: items })); } catch (e) {} }

  function paint(list, items) {
    var limit = +list.getAttribute('data-limit') || 10;
    list.textContent = '';
    items.slice(0, limit).forEach(function (it) {
      if (!it.t || !/^https?:\/\//.test(it.u)) return;
      list.appendChild(h('li', {}, h('div', {}, h('a', { href: it.u, target: '_blank', rel: 'noopener nofollow', text: it.t }), h('small', { text: it.m }))));
    });
  }

  var lists = DT.$$('[data-feed]'), status = DT.$('#pulse-status'), pending = lists.length, failed = 0;
  function settle() {
    if (--pending > 0 || !status) return;
    var now = new Date();
    status.textContent = failed === lists.length ? 'Live feeds are unreachable right now' : 'Live, refreshed at ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    status.className = 'live' + (failed === lists.length ? ' off' : '');
  }
  lists.forEach(function (list) {
    var key = list.getAttribute('data-feed'), feed = feeds[key];
    if (!feed) { settle(); return; }
    var hit = cached(key);
    if (hit) { paint(list, hit); settle(); return; }
    fetch(feed.url, { headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) { var items = feed.map(d); if (!items.length) throw new Error('empty'); keep(key, items); paint(list, items); })
      .catch(function () {
        failed++;
        var wait = list.querySelector('.wait');
        if (wait) wait.textContent = 'This feed did not load. It will try again the next time you open the page.';
      })
      .then(settle);
  });
})();
