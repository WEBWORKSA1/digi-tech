/* Digi.Tech tools, part 2: developer and network */
(function () {
  'use strict';
  var DT = window.DT, h = DT.h, T = DT.tools;

  function table(rows) {
    var t = h('table', { class: 't-table' });
    t.set = function (list) {
      t.textContent = '';
      list.forEach(function (r) { t.appendChild(h('tr', {}, h('th', { text: r[0] }), h('td', { text: r[1] }))); });
    };
    if (rows) t.set(rows);
    return t;
  }
  function num(n, digits) {
    if (!isFinite(n)) return '-';
    return Number(n.toPrecision(digits || 6)).toLocaleString(undefined, { maximumFractionDigits: 6 });
  }

  /* ---------- JSON formatter ---------- */
  T['json-formatter'] = function (el) {
    var input = h('textarea', { placeholder: 'Paste JSON here', spellcheck: 'false', style: 'min-height:11rem;font-family:var(--mono)' });
    var indent = DT.select([['2', '2 spaces'], ['4', '4 spaces'], ['\t', 'Tabs']], '2');
    var out = DT.out(), note = DT.msg();
    function run(minify) {
      if (!input.value.trim()) { out.textContent = ''; note.say('Paste some JSON first.', 'bad'); return; }
      try {
        var data = JSON.parse(input.value);
        var pad = indent.value === '\t' ? '\t' : +indent.value;
        out.textContent = minify ? JSON.stringify(data) : JSON.stringify(data, null, pad);
        note.say('Valid JSON. ' + out.textContent.length.toLocaleString() + ' characters.', 'ok');
      } catch (e) {
        out.textContent = '';
        var m = /position (\d+)/.exec(e.message), where = '';
        if (m) { var before = input.value.slice(0, +m[1]).split('\n'); where = ' Line ' + before.length + ', column ' + (before[before.length - 1].length + 1) + '.'; }
        note.say('Not valid JSON: ' + e.message + '.' + where, 'bad');
      }
    }
    el.appendChild(DT.field('JSON input', input));
    el.appendChild(DT.row(DT.btn('Format', function () { run(false); }), DT.btn('Minify', function () { run(true); }, 'btn-line'), DT.field('Indent with', indent)));
    el.appendChild(note); el.appendChild(out);
    el.appendChild(DT.row(DT.copyBtn(function () { return out.textContent; }, 'Copy result')));
  };

  /* ---------- Base64 ---------- */
  T['base64'] = function (el) {
    var input = h('textarea', { placeholder: 'Text to encode, or Base64 to decode', spellcheck: 'false' });
    var safe = DT.check('URL-safe alphabet (- and _ instead of + and /)', false);
    var out = DT.out(), note = DT.msg();
    function enc() {
      var bytes = new TextEncoder().encode(input.value), s = '';
      for (var i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
      var b = btoa(s);
      if (safe.box.checked) b = b.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      out.textContent = b; note.say('Encoded ' + bytes.length.toLocaleString() + ' bytes.', 'ok');
    }
    function dec() {
      try {
        var v = input.value.replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/');
        while (v.length % 4) v += '=';
        var s = atob(v), bytes = new Uint8Array(s.length);
        for (var i = 0; i < s.length; i++) bytes[i] = s.charCodeAt(i);
        out.textContent = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
        note.say('Decoded ' + bytes.length.toLocaleString() + ' bytes.', 'ok');
      } catch (e) { out.textContent = ''; note.say('That is not valid Base64. Check for missing or extra characters.', 'bad'); }
    }
    el.appendChild(DT.field('Input', input)); el.appendChild(safe);
    el.appendChild(DT.row(DT.btn('Encode to Base64', enc), DT.btn('Decode from Base64', dec, 'btn-line')));
    el.appendChild(note); el.appendChild(out);
    el.appendChild(DT.row(DT.copyBtn(function () { return out.textContent; }, 'Copy result')));
  };

  /* ---------- URL encoder ---------- */
  T['url-encoder'] = function (el) {
    var input = h('textarea', { placeholder: 'Text or a full web address', spellcheck: 'false' });
    var out = DT.out(), note = DT.msg(), parts = table();
    function show(fn, label) {
      try { out.textContent = fn(input.value); note.say(label, 'ok'); }
      catch (e) { out.textContent = ''; note.say('That text has a broken % sequence and cannot be decoded.', 'bad'); }
      try {
        var u = new URL(input.value.trim()), rows = [['Protocol', u.protocol], ['Host', u.host], ['Path', u.pathname]];
        u.searchParams.forEach(function (v, k) { rows.push(['Parameter ' + k, v]); });
        if (u.hash) rows.push(['Fragment', u.hash]);
        parts.set(rows);
      } catch (e) { parts.set([]); }
    }
    el.appendChild(DT.field('Input', input));
    el.appendChild(DT.row(
      DT.btn('Encode text', function () { show(encodeURIComponent, 'Encoded every reserved character.'); }),
      DT.btn('Encode whole URL', function () { show(encodeURI, 'Encoded, keeping : / ? & = intact.'); }, 'btn-line'),
      DT.btn('Decode', function () { show(decodeURIComponent, 'Decoded.'); }, 'btn-line')));
    el.appendChild(note); el.appendChild(out);
    el.appendChild(DT.row(DT.copyBtn(function () { return out.textContent; }, 'Copy result')));
    el.appendChild(parts);
  };

  /* ---------- Regex tester ---------- */
  T['regex-tester'] = function (el) {
    var pattern = h('input', { type: 'text', value: '\\b[\\w.+-]+@[\\w-]+\\.[\\w.]+\\b', spellcheck: 'false', style: 'font-family:var(--mono)' });
    var flags = h('input', { type: 'text', value: 'g', size: 6, spellcheck: 'false', style: 'font-family:var(--mono)' });
    var text = h('textarea', { spellcheck: 'false' });
    text.value = 'Write to hello@example.com or sales@example.org.\nNot an address: hello@ or @example.';
    var view = h('div', { class: 't-out' }), note = DT.msg(), list = table();
    function run() {
      var re, f = flags.value.replace(/[^dgimsuy]/g, '');
      view.textContent = ''; list.set([]);
      try { re = new RegExp(pattern.value, f.indexOf('g') > -1 ? f : f + 'g'); }
      catch (e) { note.say('Pattern error: ' + e.message, 'bad'); view.textContent = text.value; return; }
      var s = text.value, last = 0, m, rows = [], guard = 0;
      while ((m = re.exec(s)) && guard++ < 2000) {
        if (m[0] === '') { re.lastIndex++; continue; }
        view.appendChild(document.createTextNode(s.slice(last, m.index)));
        view.appendChild(h('mark', { text: m[0] }));
        last = m.index + m[0].length;
        rows.push(['Match ' + rows.length + 1 - 0 === 0 ? '' : 'Match ' + (rows.length + 1) + ' at ' + m.index, m[0] + (m.length > 1 ? '   groups: ' + m.slice(1).map(function (g) { return g === undefined ? '(none)' : g; }).join(' | ') : '')]);
      }
      view.appendChild(document.createTextNode(s.slice(last)));
      list.set(rows.slice(0, 50));
      note.say(rows.length ? rows.length + (rows.length === 1 ? ' match' : ' matches') : 'No matches', rows.length ? 'ok' : 'bad');
    }
    [pattern, flags, text].forEach(function (x) { x.addEventListener('input', run); });
    el.appendChild(DT.row(DT.field('Pattern', pattern), DT.field('Flags', flags, 'g i m s u y')));
    el.appendChild(DT.field('Test text', text));
    el.appendChild(note); el.appendChild(view); el.appendChild(list);
    run();
  };

  /* ---------- Timestamp converter ---------- */
  T['timestamp-converter'] = function (el) {
    var now = h('b', { class: 'mono' }), stamp = h('input', { type: 'text', inputmode: 'numeric', spellcheck: 'false' });
    var when = h('input', { type: 'datetime-local', step: 1 });
    var t1 = table(), t2 = table();
    function pad(n) { return ('0' + n).slice(-2); }
    function fromStamp() {
      var raw = stamp.value.trim();
      if (!/^-?\d+(\.\d+)?$/.test(raw)) { t1.set(raw ? [['Problem', 'Enter digits only, for example 1700000000']] : []); return; }
      var n = Number(raw), ms = Math.abs(n) > 1e11 ? n : n * 1000, d = new Date(ms);
      if (isNaN(d)) { t1.set([['Problem', 'That number is outside the range a date can hold']]); return; }
      var diff = Math.round((ms - Date.now()) / 1000), a = Math.abs(diff);
      var rel = a < 60 ? a + ' seconds' : a < 3600 ? Math.round(a / 60) + ' minutes' : a < 86400 ? Math.round(a / 3600) + ' hours' : Math.round(a / 86400).toLocaleString() + ' days';
      t1.set([['Read as', Math.abs(n) > 1e11 ? 'milliseconds' : 'seconds'], ['Your local time', d.toString()], ['UTC', d.toUTCString()], ['ISO 8601', d.toISOString()], ['Relative', diff < 0 ? rel + ' ago' : 'in ' + rel]]);
    }
    function fromDate() {
      var d = new Date(when.value);
      if (isNaN(d)) { t2.set([]); return; }
      t2.set([['Unix seconds', String(Math.floor(d.getTime() / 1000))], ['Unix milliseconds', String(d.getTime())], ['ISO 8601', d.toISOString()]]);
    }
    function tick() { now.textContent = Math.floor(Date.now() / 1000); }
    var d0 = new Date();
    stamp.value = Math.floor(d0.getTime() / 1000);
    when.value = d0.getFullYear() + '-' + pad(d0.getMonth() + 1) + '-' + pad(d0.getDate()) + 'T' + pad(d0.getHours()) + ':' + pad(d0.getMinutes()) + ':' + pad(d0.getSeconds());
    stamp.addEventListener('input', fromStamp); when.addEventListener('input', fromDate);
    el.appendChild(h('p', { style: 'margin:0' }, 'Unix time right now: ', now, ' ', DT.btn('Use it', function () { stamp.value = now.textContent; fromStamp(); }, 'btn-line')));
    el.appendChild(DT.grid(
      h('div', { class: 'tool' }, DT.field('Timestamp to date', stamp, 'Seconds or milliseconds, detected automatically'), t1),
      h('div', { class: 'tool' }, DT.field('Date to timestamp', when, 'In your local time zone'), t2)));
    tick(); setInterval(tick, 1000); fromStamp(); fromDate();
  };

  /* ---------- Number base converter ---------- */
  T['number-base'] = function (el) {
    var bases = [['Decimal (base 10)', 10, /^[0-9]+$/], ['Binary (base 2)', 2, /^[01]+$/], ['Octal (base 8)', 8, /^[0-7]+$/], ['Hexadecimal (base 16)', 16, /^[0-9a-fA-F]+$/]];
    var prefix = { 2: '0b', 8: '0o', 16: '0x', 10: '' }, note = DT.msg(), inputs = [];
    function sync(from) {
      var raw = from.el.value.trim().replace(/[\s_]/g, '');
      if (!raw) { inputs.forEach(function (i) { if (i !== from) i.el.value = ''; }); note.say(''); return; }
      if (!from.re.test(raw)) { note.say('That is not a valid ' + from.label.toLowerCase() + ' number.', 'bad'); return; }
      var n;
      try { n = BigInt(prefix[from.base] + raw); } catch (e) { note.say('This browser cannot convert numbers that large.', 'bad'); return; }
      inputs.forEach(function (i) { if (i !== from) i.el.value = n.toString(i.base).toUpperCase(); });
      note.say(n.toString(2).length + ' bits needed to store this value', 'ok');
    }
    var grid = h('div', { class: 't-grid' });
    bases.forEach(function (b) {
      var item = { label: b[0], base: b[1], re: b[2], el: h('input', { type: 'text', spellcheck: 'false', autocomplete: 'off', style: 'font-family:var(--mono)' }) };
      item.el.addEventListener('input', function () { sync(item); });
      inputs.push(item); grid.appendChild(DT.field(b[0], item.el));
    });
    el.appendChild(grid); el.appendChild(note);
    inputs[0].el.value = '255'; sync(inputs[0]);
  };

  /* ---------- Data size converter ---------- */
  var SIZE = [['bits', 0.125], ['bytes', 1], ['kilobytes (KB)', 1e3], ['megabytes (MB)', 1e6], ['gigabytes (GB)', 1e9], ['terabytes (TB)', 1e12], ['kibibytes (KiB)', 1024], ['mebibytes (MiB)', 1048576], ['gibibytes (GiB)', 1073741824], ['tebibytes (TiB)', 1099511627776]];
  T['data-size'] = function (el) {
    var value = h('input', { type: 'number', min: 0, step: 'any', value: 1 });
    var unit = DT.select(SIZE.map(function (s, i) { return [String(i), s[0]]; }), '4', run);
    var out = table();
    function run() {
      var bytes = (+value.value || 0) * SIZE[+unit.value][1];
      out.set(SIZE.map(function (s) { return [s[0], num(bytes / s[1], 8)]; }));
    }
    value.addEventListener('input', run);
    el.appendChild(DT.row(DT.field('Amount', value), DT.field('Unit', unit)));
    el.appendChild(out); run();
  };

  /* ---------- Download time calculator ---------- */
  T['download-time'] = function (el) {
    var size = h('input', { type: 'number', min: 0, step: 'any', value: 50 });
    var sUnit = DT.select([['1e6', 'MB'], ['1e9', 'GB'], ['1e12', 'TB']], '1e9', run);
    var speed = h('input', { type: 'number', min: 0, step: 'any', value: 100 });
    var vUnit = DT.select([['1e3', 'Kbps'], ['1e6', 'Mbps'], ['1e9', 'Gbps'], ['8e6', 'MB per second']], '1e6', run);
    var big = DT.out('t-big'), out = table();
    function clock(s) {
      if (!isFinite(s) || s <= 0) return '-';
      if (s < 1) return 'under a second';
      var d = Math.floor(s / 86400), hh = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), sec = Math.round(s % 60), p = [];
      if (d) p.push(d + ' d'); if (hh) p.push(hh + ' h'); if (m) p.push(m + ' min'); if (!d && !hh) p.push(sec + ' s');
      return p.join(' ');
    }
    function run() {
      var bits = (+size.value || 0) * +sUnit.value * 8, bps = (+speed.value || 0) * +vUnit.value;
      big.textContent = clock(bits / bps);
      out.set([10, 50, 100, 300, 1000].map(function (m) { return ['At ' + m + ' Mbps', clock(bits / (m * 1e6))]; }));
    }
    size.addEventListener('input', run); speed.addEventListener('input', run);
    el.appendChild(DT.grid(DT.row(DT.field('File size', size), DT.field('Unit', sUnit)), DT.row(DT.field('Connection speed', speed), DT.field('Unit', vUnit))));
    el.appendChild(big); el.appendChild(out); run();
  };

  /* ---------- Subnet calculator ---------- */
  T['subnet-calculator'] = function (el) {
    var input = h('input', { type: 'text', value: '192.168.1.10/24', spellcheck: 'false', style: 'font-family:var(--mono)' });
    var out = table(), note = DT.msg();
    function ip(n) { return [n >>> 24, n >>> 16 & 255, n >>> 8 & 255, n & 255].join('.'); }
    function run() {
      var m = /^\s*(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\s*\/\s*(\d{1,2})\s*$/.exec(input.value);
      if (!m || m.slice(1, 5).some(function (o) { return +o > 255; }) || +m[5] > 32) { out.set([]); note.say('Enter an IPv4 address and prefix, for example 10.0.0.5/16', 'bad'); return; }
      var bits = +m[5], addr = ((+m[1] << 24) | (+m[2] << 16) | (+m[3] << 8) | +m[4]) >>> 0;
      var mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0, net = (addr & mask) >>> 0, bc = (net | ~mask) >>> 0;
      var total = Math.pow(2, 32 - bits), usable = bits >= 31 ? total : total - 2;
      var first = bits >= 31 ? net : net + 1, last = bits >= 31 ? bc : bc - 1;
      var a = +m[1], b = +m[2], priv = a === 10 || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168);
      note.say('');
      out.set([['Network address', ip(net) + '/' + bits], ['Subnet mask', ip(mask)], ['Wildcard mask', ip(~mask >>> 0)], ['Broadcast address', ip(bc)],
        ['First usable host', ip(first)], ['Last usable host', ip(last)], ['Usable hosts', usable.toLocaleString()], ['Total addresses', total.toLocaleString()],
        ['Address type', priv ? 'Private (RFC 1918)' : a === 127 ? 'Loopback' : a === 169 && b === 254 ? 'Link-local' : 'Public']]);
    }
    input.addEventListener('input', run);
    el.appendChild(DT.field('IPv4 address with prefix (CIDR)', input)); el.appendChild(note); el.appendChild(out); run();
  };

  /* ---------- Screen and browser info ---------- */
  T['screen-info'] = function (el) {
    var out = table(), text = '';
    function run() {
      var n = navigator, c = n.connection || {}, tz = '';
      try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) {}
      var rows = [
        ['Screen resolution', screen.width + ' x ' + screen.height + ' px'],
        ['Browser window (viewport)', window.innerWidth + ' x ' + window.innerHeight + ' px'],
        ['Device pixel ratio', String(window.devicePixelRatio || 1)],
        ['Physical pixels (estimate)', Math.round(screen.width * (window.devicePixelRatio || 1)) + ' x ' + Math.round(screen.height * (window.devicePixelRatio || 1)) + ' px'],
        ['Colour depth', screen.colorDepth + ' bit'],
        ['Orientation', window.innerWidth >= window.innerHeight ? 'Landscape' : 'Portrait'],
        ['Touch screen', (n.maxTouchPoints || 0) > 0 ? 'Yes, ' + n.maxTouchPoints + ' touch points' : 'No'],
        ['Processor threads', n.hardwareConcurrency ? String(n.hardwareConcurrency) : 'Not reported'],
        ['Memory (approximate)', n.deviceMemory ? n.deviceMemory + ' GB or more' : 'Not reported'],
        ['Connection', c.effectiveType ? c.effectiveType + (c.downlink ? ', about ' + c.downlink + ' Mbps' : '') : 'Not reported'],
        ['Online', n.onLine ? 'Yes' : 'No'],
        ['Language', n.language || ''],
        ['Time zone', tz],
        ['Cookies enabled', n.cookieEnabled ? 'Yes' : 'No'],
        ['User agent', n.userAgent]
      ];
      out.set(rows);
      text = rows.map(function (r) { return r[0] + ': ' + r[1]; }).join('\n');
    }
    window.addEventListener('resize', run);
    el.appendChild(out);
    el.appendChild(DT.row(DT.copyBtn(function () { return text; }, 'Copy as text')));
    run();
  };
})();
