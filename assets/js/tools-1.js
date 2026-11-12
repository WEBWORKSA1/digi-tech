/* Digi.Tech tools, part 1: security and text */
(function () {
  'use strict';
  var DT = window.DT, h = DT.h, T = DT.tools;

  function log2(n) { return Math.log(n) / Math.LN2; }
  function span(seconds) {
    if (seconds < 1) return 'less than a second';
    var units = [['year', 31557600], ['day', 86400], ['hour', 3600], ['minute', 60], ['second', 1]];
    if (seconds > 31557600 * 1e9) return 'billions of years';
    if (seconds > 31557600 * 1e6) return Math.round(seconds / 31557600 / 1e6) + ' million years';
    for (var i = 0; i < units.length; i++) {
      if (seconds >= units[i][1]) { var n = Math.round(seconds / units[i][1]); return n.toLocaleString() + ' ' + units[i][0] + (n === 1 ? '' : 's'); }
    }
  }
  function grade(bits) {
    if (bits < 36) return ['Weak', 'bad', 20];
    if (bits < 60) return ['Fair', 'bad', 45];
    if (bits < 80) return ['Strong', 'ok', 75];
    return ['Very strong', 'ok', 100];
  }

  /* ---------- Password generator ---------- */
  T['password-generator'] = function (el, compact) {
    var len = h('input', { type: 'range', min: 8, max: 64, value: 20 });
    var lenOut = h('b', { text: '20' });
    var sets = [
      DT.check('Uppercase letters', true, make), DT.check('Lowercase letters', true, make),
      DT.check('Numbers', true, make), DT.check('Symbols', true, make)
    ];
    var pools = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz', '0123456789', '!@#$%^&*()-_=+[]{};:,.?'];
    var clear = DT.check('Skip look-alike characters such as O, 0, l and 1', false, make);
    var out = DT.out('t-big'), info = DT.msg(), bar = h('div', { class: 't-bar' }, h('i'));

    function make() {
      var n = +len.value, chosen = [], all = '', pw = [], i, j, tmp;
      lenOut.textContent = n;
      sets.forEach(function (s, k) {
        if (!s.box.checked) return;
        var p = clear.box.checked ? pools[k].replace(/[O0Il1|]/g, '') : pools[k];
        chosen.push(p); all += p;
      });
      if (!all) { out.textContent = ''; info.say('Pick at least one kind of character.', 'bad'); return; }
      chosen.forEach(function (p) { pw.push(p[DT.rand(p.length)]); });
      while (pw.length < n) pw.push(all[DT.rand(all.length)]);
      for (i = pw.length - 1; i > 0; i--) { j = DT.rand(i + 1); tmp = pw[i]; pw[i] = pw[j]; pw[j] = tmp; }
      out.textContent = pw.join('');
      var bits = Math.round(n * log2(all.length)), g = grade(bits);
      info.say(g[0] + ': about ' + bits + ' bits of randomness', g[1]);
      bar.firstChild.style.width = g[2] + '%';
      bar.firstChild.style.background = g[1] === 'ok' ? 'var(--ok)' : 'var(--bad)';
    }
    len.addEventListener('input', make);
    el.appendChild(out);
    el.appendChild(bar);
    el.appendChild(info);
    el.appendChild(DT.row(DT.btn('Generate another', make), DT.copyBtn(function () { return out.textContent; }, 'Copy password')));
    el.appendChild(DT.field('Length', len));
    el.appendChild(h('p', { style: 'margin:0' }, lenOut, ' characters'));
    if (!compact) el.appendChild(h('div', { class: 't-grid' }, sets, clear));
    make();
  };

  /* ---------- Password strength checker ---------- */
  T['password-strength'] = function (el) {
    var common = ['password', '123456', '12345678', 'qwerty', 'abc123', 'letmein', 'iloveyou', 'admin', 'welcome', 'monkey', 'dragon', 'football', '111111', 'passw0rd', 'sunshine', 'princess', 'login', 'master'];
    var input = h('input', { type: 'password', autocomplete: 'off', spellcheck: 'false', placeholder: 'Type a password to test' });
    var show = DT.check('Show what I type', false, function () { input.type = show.box.checked ? 'text' : 'password'; });
    var bar = h('div', { class: 't-bar' }, h('i')), verdict = DT.msg(), stats = DT.stats(), tips = h('ul');
    function check() {
      var v = input.value, pool = 0, advice = [];
      tips.textContent = '';
      if (!v) { verdict.say(''); bar.firstChild.style.width = '0'; stats.set([]); return; }
      if (/[a-z]/.test(v)) pool += 26; else advice.push('Add lowercase letters.');
      if (/[A-Z]/.test(v)) pool += 26; else advice.push('Add uppercase letters.');
      if (/[0-9]/.test(v)) pool += 10; else advice.push('Add numbers.');
      if (/[^A-Za-z0-9]/.test(v)) pool += 33; else advice.push('Add symbols or spaces.');
      var bits = v.length * log2(pool || 1);
      var lower = v.toLowerCase();
      if (common.some(function (c) { return lower.indexOf(c) > -1; })) { bits = Math.min(bits, 12); advice.unshift('It contains one of the most-used passwords. Attackers try those first.'); }
      if (/(.)\1{2,}/.test(v)) { bits *= 0.75; advice.push('Avoid repeating the same character.'); }
      if (/(012|123|234|345|456|567|678|789|abc|bcd|cde|qwe|wer|ert|asd)/i.test(v)) { bits *= 0.8; advice.push('Avoid keyboard runs and sequences such as 123 or qwe.'); }
      if (v.length < 14) advice.push('Make it longer. Length adds more strength than anything else: aim for 14 characters or more.');
      bits = Math.round(bits);
      var g = grade(bits);
      verdict.say(g[0], g[1]);
      bar.firstChild.style.width = g[2] + '%';
      bar.firstChild.style.background = g[1] === 'ok' ? 'var(--ok)' : 'var(--bad)';
      stats.set([['characters', v.length], ['bits of randomness (estimate)', bits], ['to crack at 10 billion guesses a second', span(Math.pow(2, bits - 1) / 1e10)]]);
      advice.forEach(function (a) { tips.appendChild(h('li', { text: a })); });
    }
    input.addEventListener('input', check);
    el.appendChild(DT.field('Password', input, 'Checked on this device only. It is never sent anywhere.'));
    el.appendChild(show); el.appendChild(bar); el.appendChild(verdict); el.appendChild(stats); el.appendChild(tips);
  };

  /* ---------- Hash generator ---------- */
  T['hash-generator'] = function (el) {
    var input = h('textarea', { placeholder: 'Text to hash', spellcheck: 'false' });
    var algos = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
    var table = h('table', { class: 't-table' }), note = DT.msg(), cells = {};
    algos.forEach(function (a) {
      cells[a] = h('td', { text: '' });
      var copy = DT.copyBtn(function () { return cells[a].textContent; });
      table.appendChild(h('tr', {}, h('th', { text: a }), cells[a], h('td', {}, copy)));
    });
    function run() {
      if (!(window.crypto && crypto.subtle)) { note.say('Hashing needs a secure (https) page in this browser.', 'bad'); return; }
      var bytes = new TextEncoder().encode(input.value);
      algos.forEach(function (a) {
        crypto.subtle.digest(a, bytes).then(function (buf) {
          cells[a].textContent = Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
        });
      });
    }
    input.addEventListener('input', run);
    el.appendChild(DT.field('Input', input)); el.appendChild(note); el.appendChild(table);
    run();
  };

  /* ---------- UUID generator ---------- */
  T['uuid-generator'] = function (el) {
    var count = h('input', { type: 'number', min: 1, max: 100, value: 5 });
    var upper = DT.check('Uppercase', false, make), plain = DT.check('Remove hyphens', false, make);
    var out = DT.out();
    function one() {
      if (crypto.randomUUID) return crypto.randomUUID();
      var b = new Uint8Array(16); crypto.getRandomValues(b);
      b[6] = (b[6] & 15) | 64; b[8] = (b[8] & 63) | 128;
      var x = Array.prototype.map.call(b, function (v) { return ('0' + v.toString(16)).slice(-2); }).join('');
      return x.slice(0, 8) + '-' + x.slice(8, 12) + '-' + x.slice(12, 16) + '-' + x.slice(16, 20) + '-' + x.slice(20);
    }
    function make() {
      var n = Math.max(1, Math.min(100, +count.value || 1)), list = [];
      for (var i = 0; i < n; i++) {
        var u = one(); if (plain.box.checked) u = u.replace(/-/g, ''); if (upper.box.checked) u = u.toUpperCase();
        list.push(u);
      }
      out.textContent = list.join('\n');
    }
    count.addEventListener('input', make);
    el.appendChild(DT.row(DT.field('How many', count), upper, plain));
    el.appendChild(out);
    el.appendChild(DT.row(DT.btn('Generate again', make), DT.copyBtn(function () { return out.textContent; }, 'Copy all')));
    make();
  };

  /* ---------- Word counter ---------- */
  T['word-counter'] = function (el) {
    var input = h('textarea', { placeholder: 'Type or paste your text here', style: 'min-height:12rem' });
    var stats = DT.stats();
    function mins(m) { return m < 1 ? Math.max(1, Math.round(m * 60)) + ' sec' : Math.round(m) + ' min'; }
    function run() {
      var v = input.value, words = (v.trim().match(/\S+/g) || []).length;
      stats.set([
        ['words', words.toLocaleString()],
        ['characters', v.length.toLocaleString()],
        ['characters without spaces', v.replace(/\s/g, '').length.toLocaleString()],
        ['sentences', (v.match(/[^.!?\s][^.!?]*[.!?]+/g) || (v.trim() ? [1] : [])).length],
        ['paragraphs', v.split(/\n\s*\n/).filter(function (p) { return p.trim(); }).length],
        ['reading time', words ? mins(words / 230) : '0'],
        ['speaking time', words ? mins(words / 140) : '0']
      ]);
    }
    input.addEventListener('input', run);
    el.appendChild(DT.field('Your text', input)); el.appendChild(stats);
    run();
  };

  /* ---------- Case converter ---------- */
  T['case-converter'] = function (el) {
    var input = h('textarea', { placeholder: 'Type or paste text, then pick a style' });
    var out = DT.out();
    function words(v) { return v.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(/[^A-Za-z0-9]+/).filter(Boolean); }
    var modes = {
      'UPPERCASE': function (v) { return v.toUpperCase(); },
      'lowercase': function (v) { return v.toLowerCase(); },
      'Title Case': function (v) { return v.toLowerCase().replace(/(^|[\s\-(])([a-z])/g, function (m, a, b) { return a + b.toUpperCase(); }); },
      'Sentence case': function (v) { return v.toLowerCase().replace(/(^\s*|[.!?]\s+)([a-z])/g, function (m, a, b) { return a + b.toUpperCase(); }); },
      'camelCase': function (v) { return words(v).map(function (w, i) { w = w.toLowerCase(); return i ? w[0].toUpperCase() + w.slice(1) : w; }).join(''); },
      'snake_case': function (v) { return words(v).join('_').toLowerCase(); },
      'kebab-case': function (v) { return words(v).join('-').toLowerCase(); }
    };
    var row = h('div', { class: 't-row' });
    Object.keys(modes).forEach(function (name) {
      row.appendChild(DT.btn(name, function () { out.textContent = modes[name](input.value); }, 'btn-line'));
    });
    el.appendChild(DT.field('Your text', input)); el.appendChild(row); el.appendChild(out);
    el.appendChild(DT.row(DT.copyBtn(function () { return out.textContent; }, 'Copy result')));
  };

  /* ---------- Lorem ipsum generator ---------- */
  T['lorem-ipsum'] = function (el) {
    var bank = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'.split(' ');
    var paras = h('input', { type: 'number', min: 1, max: 30, value: 3 });
    var size = DT.select([['short', 'Short paragraphs'], ['medium', 'Medium paragraphs'], ['long', 'Long paragraphs']], 'medium', make);
    var classic = DT.check('Start with "Lorem ipsum dolor sit amet"', true, make);
    var out = DT.out();
    function sentence() {
      var n = 6 + DT.rand(10), w = [];
      for (var i = 0; i < n; i++) w.push(bank[DT.rand(bank.length)]);
      var s = w.join(' '); return s[0].toUpperCase() + s.slice(1) + '.';
    }
    function make() {
      var n = Math.max(1, Math.min(30, +paras.value || 1)), per = { short: 3, medium: 5, long: 8 }[size.value], list = [];
      for (var i = 0; i < n; i++) {
        var s = []; for (var j = 0; j < per; j++) s.push(sentence());
        list.push(s.join(' '));
      }
      if (classic.box.checked) list[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + list[0];
      out.textContent = list.join('\n\n');
    }
    paras.addEventListener('input', make);
    el.appendChild(DT.row(DT.field('Paragraphs', paras), DT.field('Length', size)));
    el.appendChild(classic); el.appendChild(out);
    el.appendChild(DT.row(DT.btn('Generate again', make), DT.copyBtn(function () { return out.textContent; }, 'Copy text')));
    make();
  };

  /* ---------- Typing speed test ---------- */
  T['typing-test'] = function (el) {
    var texts = [
      'A strong password is long, random and used on one site only. A password manager remembers them all so you do not have to.',
      'Every photo, message and video on your phone is stored as numbers. Software turns those numbers back into something you can see and hear.',
      'The cloud is not a place in the sky. It is a very large number of computers in warehouses that you rent by the minute over the internet.',
      'A router reads the address on each packet of data and passes it one step closer to where it is going, thousands of times a second.',
      'Backups only count when you have tested them. Keep three copies of anything you cannot replace, on two kinds of storage, with one copy somewhere else.'
    ];
    var view = h('div', { class: 't-type', 'aria-hidden': 'true' });
    var input = h('textarea', { placeholder: 'Start typing here. The clock starts with your first key.', spellcheck: 'false', autocomplete: 'off', autocapitalize: 'off' });
    var stats = DT.stats(), note = DT.msg(), text = '', start = 0, timer = null, done = false;
    function paint() {
      var v = input.value; view.textContent = '';
      for (var i = 0; i < text.length; i++) {
        var cls = i < v.length ? (v[i] === text[i] ? 'done' : 'miss') : (i === v.length ? 'cur' : '');
        view.appendChild(h('span', { class: cls, text: text[i] }));
      }
    }
    function score() {
      var v = input.value, right = 0;
      for (var i = 0; i < v.length && i < text.length; i++) if (v[i] === text[i]) right++;
      var minutes = start ? (Date.now() - start) / 60000 : 0;
      stats.set([
        ['words a minute', minutes > 0.01 ? Math.round(right / 5 / minutes) : 0],
        ['accuracy', v.length ? Math.round(right / v.length * 100) + '%' : '100%'],
        ['seconds', Math.round(minutes * 60)]
      ]);
    }
    function reset() {
      clearInterval(timer); timer = null; start = 0; done = false;
      text = texts[DT.rand(texts.length)]; input.value = ''; input.disabled = false;
      note.say(''); paint(); score();
    }
    input.addEventListener('input', function () {
      if (done) return;
      if (!start) { start = Date.now(); timer = setInterval(score, 500); }
      paint(); score();
      if (input.value.length >= text.length) {
        done = true; clearInterval(timer); input.disabled = true;
        note.say('Finished. Press "Try another passage" to go again.', 'ok');
      }
    });
    input.addEventListener('paste', function (e) { e.preventDefault(); });
    el.appendChild(view); el.appendChild(DT.field('Type the passage above', input)); el.appendChild(stats); el.appendChild(note);
    el.appendChild(DT.row(DT.btn('Try another passage', reset, 'btn-line')));
    reset();
  };
})();
