/* Digi.Tech tools, part 3: web, SEO and media */
(function () {
  'use strict';
  var DT = window.DT, h = DT.h, T = DT.tools;

  function loadScript(urls, done, fail) {
    var i = 0;
    (function next() {
      if (i >= urls.length) { fail(); return; }
      var s = h('script', { src: urls[i++] });
      s.onload = done; s.onerror = next;
      document.head.appendChild(s);
    })();
  }

  /* ---------- QR code generator ---------- */
  T['qr-code-generator'] = function (el) {
    var mode = DT.select([['text', 'Link or text'], ['wifi', 'Wi-Fi network']], 'text', swap);
    var text = h('textarea', { spellcheck: 'false', style: 'min-height:5rem' }); text.value = 'https://digi.tech/';
    var ssid = h('input', { type: 'text', autocomplete: 'off' }), pass = h('input', { type: 'text', autocomplete: 'off' });
    var sec = DT.select([['WPA', 'WPA / WPA2 / WPA3'], ['WEP', 'WEP'], ['nopass', 'No password']], 'WPA', draw);
    var level = DT.select([['L', 'Low (smallest code)'], ['M', 'Medium'], ['Q', 'High'], ['H', 'Highest (survives damage)']], 'M', draw);
    var size = h('input', { type: 'range', min: 160, max: 800, step: 20, value: 320 });
    var dark = h('input', { type: 'color', value: '#17163f' }), light = h('input', { type: 'color', value: '#ffffff' });
    var canvas = h('canvas', { width: 320, height: 320, role: 'img', 'aria-label': 'Generated QR code' }), note = DT.msg();
    var textBox = DT.field('What the code should open', text);
    var wifiBox = h('div', { class: 't-grid', hidden: true }, DT.field('Network name (SSID)', ssid), DT.field('Password', pass), DT.field('Security', sec));
    function esc(s) { return s.replace(/([\\;,:"])/g, '\\$1'); }
    function payload() {
      if (mode.value === 'text') return text.value;
      if (!ssid.value) return '';
      return 'WIFI:T:' + sec.value + ';S:' + esc(ssid.value) + ';' + (sec.value === 'nopass' ? '' : 'P:' + esc(pass.value) + ';') + ';';
    }
    function swap() { textBox.hidden = mode.value !== 'text'; wifiBox.hidden = mode.value === 'text'; draw(); }
    function draw() {
      var ctx = canvas.getContext('2d'), px = +size.value, data = payload();
      canvas.width = canvas.height = px;
      ctx.fillStyle = light.value; ctx.fillRect(0, 0, px, px);
      if (!window.qrcode) return;
      if (!data) { note.say(mode.value === 'wifi' ? 'Enter the network name.' : 'Enter a link or some text.', 'bad'); return; }
      try {
        var qr = window.qrcode(0, level.value);
        qr.addData(data, 'Byte'); qr.make();
        var n = qr.getModuleCount(), quiet = 4, cell = px / (n + quiet * 2);
        ctx.fillStyle = dark.value;
        for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) {
          if (qr.isDark(r, c)) ctx.fillRect(Math.floor((c + quiet) * cell), Math.floor((r + quiet) * cell), Math.ceil(cell), Math.ceil(cell));
        }
        note.say(n + ' x ' + n + ' modules. Test it with your phone camera before printing.', 'ok');
      } catch (e) { note.say('That is too much data for one QR code. Shorten it or lower the error correction.', 'bad'); }
    }
    [text, ssid, pass, size, dark, light].forEach(function (x) { x.addEventListener('input', draw); });
    el.appendChild(DT.grid(
      h('div', { class: 'tool' }, DT.field('Type of code', mode), textBox, wifiBox, DT.field('Error correction', level), DT.field('Image size', size),
        DT.row(DT.field('Code colour', dark), DT.field('Background', light))),
      h('div', { class: 'tool' }, h('div', { class: 't-canvas' }, canvas), note,
        DT.row(DT.btn('Download PNG', function () { DT.download('qr-code.png', canvas.toDataURL('image/png')); })))));
    note.say('Loading the QR encoder...');
    loadScript(['https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js', 'https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js'], function () {
      if (window.qrcode && window.qrcode.stringToBytesFuncs) window.qrcode.stringToBytes = window.qrcode.stringToBytesFuncs['UTF-8'];
      draw();
    }, function () { note.say('The QR encoder could not load. Check your connection and reload the page.', 'bad'); });
  };

  /* ---------- UTM link builder ---------- */
  T['utm-builder'] = function (el) {
    var defs = [['url', 'Page address', 'https://example.com/landing', true], ['utm_source', 'Source', 'newsletter, google, facebook', true], ['utm_medium', 'Medium', 'email, cpc, social', true],
      ['utm_campaign', 'Campaign name', 'spring_sale', true], ['utm_term', 'Term (optional)', 'paid keyword', false], ['utm_content', 'Content (optional)', 'header_link, blue_button', false]];
    var f = {}, grid = h('div', { class: 't-grid' }), out = DT.out(), note = DT.msg();
    var tidy = DT.check('Lowercase values and swap spaces for underscores', true, run);
    function run() {
      var base = f.url.value.trim();
      if (!base) { out.textContent = ''; note.say('Start with the page address.', 'bad'); return; }
      var u;
      try { u = new URL(/^https?:\/\//i.test(base) ? base : 'https://' + base); } catch (e) { out.textContent = ''; note.say('That page address is not a valid URL.', 'bad'); return; }
      var missing = [];
      defs.slice(1).forEach(function (d) {
        var v = f[d[0]].value.trim();
        if (tidy.box.checked) v = v.toLowerCase().replace(/\s+/g, '_');
        if (v) u.searchParams.set(d[0], v); else { u.searchParams.delete(d[0]); if (d[3]) missing.push(d[1].toLowerCase()); }
      });
      out.textContent = u.toString();
      note.say(missing.length ? 'Still needed for clean reports: ' + missing.join(', ') + '.' : 'Ready to use. ' + out.textContent.length + ' characters.', missing.length ? 'bad' : 'ok');
    }
    defs.forEach(function (d) {
      f[d[0]] = h('input', { type: 'text', placeholder: d[2], spellcheck: 'false', autocomplete: 'off' });
      f[d[0]].addEventListener('input', run);
      grid.appendChild(DT.field(d[1], f[d[0]]));
    });
    el.appendChild(grid); el.appendChild(tidy); el.appendChild(note); el.appendChild(out);
    el.appendChild(DT.row(DT.copyBtn(function () { return out.textContent; }, 'Copy link')));
    run();
  };

  /* ---------- Meta tag generator ---------- */
  T['meta-tag-generator'] = function (el) {
    var title = h('input', { type: 'text', maxlength: 120 }), desc = h('textarea', { maxlength: 320, style: 'min-height:5rem' });
    var url = h('input', { type: 'url', placeholder: 'https://example.com/page' }), img = h('input', { type: 'url', placeholder: 'https://example.com/share.jpg' });
    var site = h('input', { type: 'text' }), index = DT.check('Let search engines index this page', true, run);
    var tHint = h('small'), dHint = h('small'), out = DT.out();
    var prev = h('div', { class: 'panel', style: 'border-width:1px' });
    function a(s) { return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
    function run() {
      var t = title.value.trim(), d = desc.value.trim(), u = url.value.trim(), i = img.value.trim(), s = site.value.trim(), L = [];
      tHint.textContent = t.length + ' of about 60 characters' + (t.length > 60 ? ': may be cut off in results' : '');
      dHint.textContent = d.length + ' of about 160 characters' + (d.length > 160 ? ': may be cut off in results' : '');
      if (t) L.push('<title>' + a(t) + '</title>');
      if (d) L.push('<meta name="description" content="' + a(d) + '">');
      L.push('<meta name="robots" content="' + (index.box.checked ? 'index, follow' : 'noindex, nofollow') + '">');
      if (u) L.push('<link rel="canonical" href="' + a(u) + '">');
      L.push('<meta property="og:type" content="website">');
      if (t) L.push('<meta property="og:title" content="' + a(t) + '">');
      if (d) L.push('<meta property="og:description" content="' + a(d) + '">');
      if (u) L.push('<meta property="og:url" content="' + a(u) + '">');
      if (i) L.push('<meta property="og:image" content="' + a(i) + '">');
      if (s) L.push('<meta property="og:site_name" content="' + a(s) + '">');
      L.push('<meta name="twitter:card" content="' + (i ? 'summary_large_image' : 'summary') + '">');
      out.textContent = L.join('\n');
      prev.textContent = '';
      prev.appendChild(h('small', { text: u || 'https://example.com/page', style: 'color:var(--muted)' }));
      prev.appendChild(h('p', { text: (t || 'Your page title').slice(0, 60), style: 'margin:.1rem 0;font-size:1.2rem;color:var(--brand);font-weight:600' }));
      prev.appendChild(h('p', { text: (d || 'Your description appears here in search results.').slice(0, 160), style: 'margin:0;font-size:.95rem' }));
    }
    [title, desc, url, img, site].forEach(function (x) { x.addEventListener('input', run); });
    var tf = DT.field('Page title', title), df = DT.field('Description', desc);
    tf.appendChild(tHint); df.appendChild(dHint);
    el.appendChild(DT.grid(
      h('div', { class: 'tool' }, tf, df, DT.field('Page address', url), DT.field('Share image address', img), DT.field('Site name', site), index),
      h('div', { class: 'tool' }, h('p', { style: 'margin:0;font-weight:600', text: 'Search result preview' }), prev, h('p', { style: 'margin:0;font-weight:600', text: 'Paste inside <head>' }), out,
        DT.row(DT.copyBtn(function () { return out.textContent; }, 'Copy tags')))));
    run();
  };

  /* ---------- Colour helpers ---------- */
  function parseColor(v) {
    v = v.trim().toLowerCase(); var m;
    if ((m = /^#?([0-9a-f]{3})$/.exec(v))) return m[1].split('').map(function (c) { return parseInt(c + c, 16); });
    if ((m = /^#?([0-9a-f]{6})$/.exec(v))) return [0, 2, 4].map(function (i) { return parseInt(m[1].slice(i, i + 2), 16); });
    if ((m = /^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/.exec(v))) return [+m[1], +m[2], +m[3]].map(function (n) { return Math.min(255, n); });
    if ((m = /^hsla?\(\s*([\d.]+)(?:deg)?[\s,]+([\d.]+)%[\s,]+([\d.]+)%/.exec(v))) return hslToRgb(+m[1], +m[2], +m[3]);
    return null;
  }
  function hex(rgb) { return '#' + rgb.map(function (n) { return ('0' + Math.round(n).toString(16)).slice(-2); }).join(''); }
  function rgbToHsl(c) {
    var r = c[0] / 255, g = c[1] / 255, b = c[2] / 255, max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min, hh = 0, l = (max + min) / 2, s = d ? d / (1 - Math.abs(2 * l - 1)) : 0;
    if (d) { hh = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4; hh *= 60; if (hh < 0) hh += 360; }
    return [Math.round(hh), Math.round(s * 100), Math.round(l * 100)];
  }
  function hslToRgb(hh, s, l) {
    s /= 100; l /= 100; var c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs((hh / 60) % 2 - 1)), m = l - c / 2, r = [0, 0, 0];
    var k = Math.floor((hh % 360) / 60); r = [[c, x, 0], [x, c, 0], [0, c, x], [0, x, c], [x, 0, c], [c, 0, x]][k] || r;
    return r.map(function (n) { return Math.round((n + m) * 255); });
  }
  function lum(c) {
    var v = c.map(function (n) { n /= 255; return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4); });
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  }
  function ratio(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }

  /* ---------- Colour converter ---------- */
  T['color-converter'] = function (el) {
    var pick = h('input', { type: 'color', value: '#3a2df0' }), text = h('input', { type: 'text', value: '#3a2df0', spellcheck: 'false' });
    var sw = h('div', { class: 'swatch' }), note = DT.msg(), t = h('table', { class: 't-table' });
    function show(rgb) {
      var hsl = rgbToHsl(rgb), k = 1 - Math.max(rgb[0], rgb[1], rgb[2]) / 255;
      var cmyk = k === 1 ? [0, 0, 0, 100] : rgb.map(function (n) { return Math.round((1 - n / 255 - k) / (1 - k) * 100); }).concat(Math.round(k * 100));
      var rows = [['HEX', hex(rgb)], ['RGB', 'rgb(' + rgb.join(', ') + ')'], ['HSL', 'hsl(' + hsl[0] + ', ' + hsl[1] + '%, ' + hsl[2] + '%)'], ['CMYK', cmyk.join('%, ') + '%']];
      t.textContent = '';
      rows.forEach(function (r) { t.appendChild(h('tr', {}, h('th', { text: r[0] }), h('td', { text: r[1] }), h('td', {}, DT.copyBtn(function () { return r[1]; })))); });
      sw.style.background = hex(rgb); sw.style.color = ratio(rgb, [255, 255, 255]) >= 4.5 ? '#fff' : '#000'; sw.textContent = hex(rgb);
      pick.value = hex(rgb);
    }
    pick.addEventListener('input', function () { text.value = pick.value; note.say(''); show(parseColor(pick.value)); });
    text.addEventListener('input', function () {
      var c = parseColor(text.value);
      if (c) { note.say(''); show(c); } else note.say('Use a HEX code, rgb(58, 45, 240) or hsl(244, 87%, 56%).', 'bad');
    });
    el.appendChild(DT.row(DT.field('Pick', pick), DT.field('Or type a colour', text)));
    el.appendChild(note); el.appendChild(sw); el.appendChild(t);
    show(parseColor(pick.value));
  };

  /* ---------- Contrast checker ---------- */
  T['contrast-checker'] = function (el) {
    function pair(label, init) {
      var p = h('input', { type: 'color', value: init }), t = h('input', { type: 'text', value: init, spellcheck: 'false', size: 9 });
      p.addEventListener('input', function () { t.value = p.value; run(); });
      t.addEventListener('input', function () { var c = parseColor(t.value); if (c) { p.value = hex(c); run(); } });
      return { p: p, t: t, row: DT.row(DT.field(label, p), DT.field('Code', t)) };
    }
    var fg = pair('Text colour', '#17163f'), bg = pair('Background colour', '#f1f2fb');
    var big = DT.out('t-big'), sw = h('div', { class: 'swatch', style: 'height:auto;padding:1.2rem;display:block;font-weight:400;font-size:1rem' }), res = h('table', { class: 't-table' });
    function run() {
      var a = parseColor(fg.p.value), b = parseColor(bg.p.value), r = ratio(a, b);
      big.textContent = r.toFixed(2) + ' : 1';
      sw.style.color = fg.p.value; sw.style.background = bg.p.value; sw.textContent = '';
      sw.appendChild(h('p', { style: 'font-size:1.5rem;font-weight:700;margin:0 0 .3rem', text: 'Large heading text' }));
      sw.appendChild(h('p', { style: 'margin:0', text: 'Body text at normal size. Can you read this comfortably?' }));
      res.textContent = '';
      [['AA, normal text', 4.5], ['AA, large text', 3], ['AAA, normal text', 7], ['AAA, large text', 4.5], ['Icons and controls', 3]].forEach(function (x) {
        var ok = r >= x[1];
        res.appendChild(h('tr', {}, h('th', { text: x[0] + ' (needs ' + x[1] + ' : 1)' }), h('td', { text: ok ? 'Pass' : 'Fail', style: 'font-weight:700;color:var(--' + (ok ? 'ok' : 'bad') + ')' })));
      });
    }
    el.appendChild(DT.grid(h('div', { class: 'tool' }, fg.row, bg.row,
      DT.row(DT.btn('Swap colours', function () { var x = fg.p.value; fg.p.value = fg.t.value = bg.p.value; bg.p.value = bg.t.value = x; run(); }, 'btn-line'))),
      h('div', { class: 'tool' }, big, sw)));
    el.appendChild(res); run();
  };

  /* ---------- Image compressor ---------- */
  T['image-compressor'] = function (el) {
    var file = h('input', { type: 'file', accept: 'image/*' });
    var fmt = DT.select([['image/jpeg', 'JPEG (photos)'], ['image/webp', 'WebP (smallest)'], ['image/png', 'PNG (keeps transparency)']], 'image/jpeg', run);
    var q = h('input', { type: 'range', min: 10, max: 100, value: 75 }), qOut = h('b', { text: '75' });
    var maxW = h('input', { type: 'number', min: 16, max: 10000, placeholder: 'Keep original' });
    var stats = DT.stats(), note = DT.msg(), prev = h('img', { alt: 'Compressed preview', style: 'border-radius:var(--r);border:1px solid var(--line)', hidden: true });
    var img = null, blob = null, name = 'image', orig = 0;
    function kb(n) { return n > 1048576 ? (n / 1048576).toFixed(2) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB'; }
    function run() {
      qOut.textContent = q.value;
      if (!img) return;
      var w = img.naturalWidth, hgt = img.naturalHeight, limit = +maxW.value;
      if (limit && limit < w) { hgt = Math.round(hgt * limit / w); w = limit; }
      var c = h('canvas', { width: w, height: hgt }), ctx = c.getContext('2d');
      if (fmt.value === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, hgt); }
      ctx.drawImage(img, 0, 0, w, hgt);
      c.toBlob(function (b) {
        if (!b) { note.say('This browser cannot save that format. Pick another one.', 'bad'); return; }
        blob = b;
        if (prev.src) URL.revokeObjectURL(prev.src);
        prev.src = URL.createObjectURL(b); prev.hidden = false;
        var saved = Math.round((1 - b.size / orig) * 100);
        stats.set([['original', kb(orig)], ['compressed', kb(b.size)], [saved >= 0 ? 'smaller' : 'larger', Math.abs(saved) + '%'], ['pixels', w + ' x ' + hgt]]);
        note.say(saved >= 0 ? 'Done. Lower the quality or the width to shrink it further.' : 'The result is bigger than the original. Try JPEG or WebP, or lower the quality.', saved >= 0 ? 'ok' : 'bad');
      }, fmt.value, +q.value / 100);
    }
    file.addEventListener('change', function () {
      var f = file.files[0]; if (!f) return;
      if (f.type.indexOf('image/') !== 0) { note.say('Choose an image file such as JPEG, PNG or WebP.', 'bad'); return; }
      orig = f.size; name = f.name.replace(/\.[^.]+$/, '');
      var im = new Image();
      im.onload = function () { img = im; run(); };
      im.onerror = function () { note.say('That image could not be opened.', 'bad'); };
      im.src = URL.createObjectURL(f);
    });
    [q, maxW].forEach(function (x) { x.addEventListener('input', run); });
    el.appendChild(DT.grid(
      h('div', { class: 'tool' }, DT.field('Choose an image', file, 'It stays on your device. Nothing is uploaded.'), DT.field('Save as', fmt), DT.field('Quality', q), h('p', { style: 'margin:0' }, qOut, ' out of 100'), DT.field('Maximum width in pixels', maxW)),
      h('div', { class: 'tool' }, stats, note, prev,
        DT.row(DT.btn('Download image', function () { if (blob) DT.download(name + '-small.' + fmt.value.split('/')[1].replace('jpeg', 'jpg'), blob); else note.say('Choose an image first.', 'bad'); })))));
  };
})();
