/* Digi.Tech core: helpers shared by every page and every tool */
(function () {
  'use strict';
  var root = document.body.getAttribute('data-root') || '';
  var DT = window.DT = { root: root, tools: {} };
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  DT.$ = $; DT.$$ = $$;

  function append(el, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) c.forEach(function (x) { append(el, x); });
    else el.appendChild(c.nodeType ? c : document.createTextNode(String(c)));
  }
  /* h('div', {class: 'x', onclick: fn}, child, child) */
  DT.h = function (tag, attrs) {
    var el = document.createElement(tag), k, i;
    attrs = attrs || {};
    for (k in attrs) {
      if (k === 'text') el.textContent = attrs[k];
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), attrs[k]);
      else if (k === 'value') el.value = attrs[k];
      else if (k === 'checked') el.checked = !!attrs[k];
      else if (attrs[k] !== false && attrs[k] != null) el.setAttribute(k, attrs[k] === true ? '' : attrs[k]);
    }
    for (i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  };
  var h = DT.h;

  DT.store = {
    get: function (k, d) { try { var v = localStorage.getItem('dt-' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem('dt-' + k, JSON.stringify(v)); } catch (e) {} }
  };

  DT.copy = function (text, btn) {
    function done() {
      if (!btn) return;
      var old = btn.textContent; btn.textContent = 'Copied';
      setTimeout(function () { btn.textContent = old; }, 1400);
    }
    function fallback() {
      var ta = h('textarea', { style: 'position:fixed;top:0;opacity:0' }); ta.value = text;
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      ta.remove();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback);
    else fallback();
  };

  /* Small UI kit used by the tools */
  var uid = 0;
  DT.field = function (label, control, hint) {
    var id = control.id || (control.id = 'f' + (++uid));
    return h('div', { class: 'field' }, h('label', { for: id, text: label }), control, hint ? h('small', { text: hint }) : null);
  };
  DT.check = function (label, checked, onchange) {
    var box = h('input', { type: 'checkbox', checked: checked, onchange: onchange });
    var wrap = h('label', { class: 'check' }, box, label);
    wrap.box = box; return wrap;
  };
  DT.select = function (options, value, onchange) {
    var s = h('select', { onchange: onchange });
    options.forEach(function (o) {
      var v = Array.isArray(o) ? o[0] : o, t = Array.isArray(o) ? o[1] : o;
      s.appendChild(h('option', { value: v, text: t }));
    });
    if (value != null) s.value = value;
    return s;
  };
  DT.btn = function (text, fn, cls) { return h('button', { type: 'button', class: 'btn ' + (cls || 'btn-brand'), onclick: fn, text: text }); };
  DT.copyBtn = function (getText, label) {
    var b = DT.btn(label || 'Copy', function () { DT.copy(getText(), b); }, 'btn-line'); return b;
  };
  DT.out = function (cls) { return h('pre', { class: 't-out ' + (cls || ''), 'aria-live': 'polite' }); };
  DT.row = function () { return h('div', { class: 't-row' }, Array.prototype.slice.call(arguments)); };
  DT.grid = function () { return h('div', { class: 't-grid' }, Array.prototype.slice.call(arguments)); };
  DT.stats = function () {
    var box = h('div', { class: 't-stats' });
    box.set = function (pairs) {
      box.textContent = '';
      pairs.forEach(function (p) { box.appendChild(h('div', { class: 't-stat' }, h('b', { text: p[1] }), h('span', { text: p[0] }))); });
    };
    return box;
  };
  DT.msg = function () {
    var p = h('p', { class: 't-msg', role: 'status' });
    p.say = function (text, kind) { p.textContent = text || ''; p.className = 't-msg ' + (kind || ''); };
    return p;
  };
  DT.download = function (name, data, type) {
    var url = typeof data === 'string' && data.indexOf('data:') === 0 ? data : URL.createObjectURL(data instanceof Blob ? data : new Blob([data], { type: type || 'text/plain' }));
    var a = h('a', { href: url, download: name }); document.body.appendChild(a); a.click(); a.remove();
  };
  DT.rand = function (n) { var a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; };

  /* Theme */
  var themeBtn = $('#theme');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var cur = document.documentElement.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('dt-theme', next); } catch (e) {}
  });

  /* Mobile navigation */
  var navBtn = $('.nav-toggle'), nav = $('#nav');
  if (navBtn && nav) navBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('open'); navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  /* Cookie notice */
  var cookie = $('#cookie');
  if (cookie && !DT.store.get('cookie-ok', false)) {
    cookie.hidden = false;
    $('#cookie-ok').addEventListener('click', function () { DT.store.set('cookie-ok', true); cookie.hidden = true; });
  }

  /* Bit strip: the first letter of the page title in binary */
  $$('.bits[data-bits]').forEach(function (el) {
    var code = (el.getAttribute('data-bits') || 'D').charCodeAt(0) & 255;
    for (var i = 7; i >= 0; i--) el.appendChild(h('b', { class: (code >> i) & 1 ? 'on' : '' }));
  });

  /* Search index, loaded on first use */
  var indexPromise = null;
  DT.index = function () {
    if (!indexPromise) indexPromise = fetch(root + 'search.json').then(function (r) { return r.json(); }).catch(function () { return []; });
    return indexPromise;
  };
  function rank(items, q) {
    q = q.trim().toLowerCase();
    if (!q) return [];
    var words = q.split(/\s+/);
    return items.map(function (it) {
      var t = it.t.toLowerCase(), d = (it.d || '').toLowerCase(), score = 0;
      for (var i = 0; i < words.length; i++) {
        var w = words[i];
        if (t.indexOf(w) === 0) score += 6; else if (t.indexOf(w) > -1) score += 4; else if (d.indexOf(w) > -1) score += 1; else return null;
      }
      if (it.k === 'Tool') score += 1;
      return { it: it, s: score };
    }).filter(Boolean).sort(function (a, b) { return b.s - a.s; }).map(function (x) { return x.it; });
  }

  var q = $('#q'), qr = $('#q-results');
  if (q && qr) {
    var showResults = function () {
      DT.index().then(function (items) {
        var hits = rank(items, q.value).slice(0, 8);
        qr.textContent = '';
        if (!q.value.trim()) { qr.hidden = true; return; }
        if (!hits.length) qr.appendChild(h('p', { text: 'Nothing matches "' + q.value.trim() + '". Try a shorter word.' }));
        hits.forEach(function (it) {
          qr.appendChild(h('a', { href: root + it.u }, it.t, h('small', { text: it.k + (it.d ? ': ' + it.d.slice(0, 90) : '') })));
        });
        qr.hidden = false;
      });
    };
    q.addEventListener('input', showResults);
    q.addEventListener('focus', function () { DT.index(); if (q.value.trim()) showResults(); });
    document.addEventListener('click', function (e) { if (!e.target.closest('.search')) qr.hidden = true; });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { qr.hidden = true; }
      if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) { e.preventDefault(); q.focus(); }
    });
  }

  /* Home hero: find a tool by typing what you need */
  var find = $('#find'), hits = $('#find-hits');
  if (find && hits) {
    var paint = function () {
      DT.index().then(function (items) {
        var tools = items.filter(function (it) { return it.k === 'Tool'; });
        var list = find.value.trim() ? rank(items, find.value).slice(0, 8) : tools.slice(0, 6);
        hits.textContent = '';
        if (!list.length) hits.appendChild(h('li', { text: 'No match yet. Try "password", "QR" or "JSON".' }));
        list.forEach(function (it) { hits.appendChild(h('li', {}, h('a', { href: root + it.u, text: it.t }))); });
      });
    };
    find.addEventListener('input', paint); paint();
  }

  /* Tools index: category chips and text filter */
  var tiles = $$('#all-tools .tile');
  if (tiles.length) {
    var cat = 'all', tq = $('#tool-q'), none = $('#no-tools');
    var apply = function () {
      var needle = tq ? tq.value.trim().toLowerCase() : '', shown = 0;
      tiles.forEach(function (t) {
        var ok = (cat === 'all' || t.getAttribute('data-cat') === cat) && (!needle || t.textContent.toLowerCase().indexOf(needle) > -1);
        t.hidden = !ok; if (ok) shown++;
      });
      if (none) none.hidden = shown > 0;
    };
    $$('[data-filter]').forEach(function (b) {
      b.addEventListener('click', function () {
        cat = b.getAttribute('data-filter');
        $$('[data-filter]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        apply();
      });
    });
    if (tq) tq.addEventListener('input', apply);
  }

  /* Favourite tools, kept on this device */
  var favs = DT.store.get('favs', []);
  $$('[data-fav]').forEach(function (b) {
    var slug = b.getAttribute('data-fav');
    var label = function () { b.textContent = favs.indexOf(slug) > -1 ? 'Remove from favourites' : 'Save to favourites'; };
    b.addEventListener('click', function () {
      var i = favs.indexOf(slug);
      if (i > -1) favs.splice(i, 1); else favs.push(slug);
      DT.store.set('favs', favs); label();
    });
    label();
  });
  var favBox = $('#favs');
  if (favBox && favs.length) {
    var list = $('.tiles', favBox);
    favs.forEach(function (slug) {
      var src = $('#all-tools .tile[data-slug="' + slug + '"]');
      if (src) { var c = src.cloneNode(true); c.hidden = false; list.appendChild(c); }
    });
    if (list.children.length) favBox.hidden = false;
  }

  /* Glossary filter */
  var gq = $('#gloss-q');
  if (gq) gq.addEventListener('input', function () {
    var needle = gq.value.trim().toLowerCase(), any = false;
    $$('.gloss-letter').forEach(function (group) {
      var shown = 0;
      $$('dt', group).forEach(function (dt) {
        var dd = dt.nextElementSibling;
        var ok = !needle || dt.textContent.toLowerCase().indexOf(needle) > -1 || dd.textContent.toLowerCase().indexOf(needle) > -1;
        dt.hidden = dd.hidden = !ok; if (ok) shown++;
      });
      group.hidden = !shown; if (shown) any = true;
    });
    var e = $('#no-terms'); if (e) e.hidden = any;
  });

  /* Term of the day */
  var termData = $('#term-data'), termBox = $('#term');
  if (termData && termBox) {
    try {
      var terms = JSON.parse(termData.textContent), day = Math.floor(Date.now() / 864e5), t = terms[day % terms.length];
      termBox.textContent = '';
      termBox.appendChild(h('dfn', { text: t.t }));
      termBox.appendChild(h('p', { text: t.d }));
    } catch (e) {}
  }

  /* Videos load only when asked for */
  $$('[data-playlist]').forEach(function (b) {
    b.addEventListener('click', function () {
      var frame = h('iframe', {
        src: 'https://www.youtube-nocookie.com/embed/videoseries?list=' + encodeURIComponent(b.getAttribute('data-playlist')) + '&autoplay=1',
        title: b.getAttribute('data-title') || 'Video player', loading: 'lazy', allowfullscreen: true,
        allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
        referrerpolicy: 'strict-origin-when-cross-origin'
      });
      b.parentNode.replaceChild(frame, b);
    });
  });

  /* Start whichever tools are on the page, once every tool script has loaded */
  document.addEventListener('DOMContentLoaded', function () {
    $$('[data-tool]').forEach(function (el) {
      var fn = DT.tools[el.getAttribute('data-tool')];
      if (!fn) return;
      el.textContent = '';
      try { fn(el, el.hasAttribute('data-compact')); }
      catch (e) { el.textContent = 'This tool could not start in your browser. Reload the page to try again.'; }
    });
  });
})();
