/* Digi.Tech forms: every form on the site is delivered to one inbox.
   The destination is put together only at the moment of sending and is never written into a page. */
(function () {
  'use strict';
  var body = document.body;
  var contact = body.getAttribute('data-contact') || '#';

  function inbox() {
    var alias = body.getAttribute('data-alias');
    if (alias) return alias;
    return [atob('d2Vid29ya3NhMQ=='), atob('Z21haWwuY29t')].join(String.fromCharCode(64));
  }

  function say(form, text, kind, withLink) {
    var note = form.querySelector('.form-note');
    if (!note) return;
    note.textContent = text;
    note.className = 'form-note ' + (kind || '');
    if (withLink) {
      var a = document.createElement('a');
      a.href = contact; a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'Open the contact page';
      note.appendChild(document.createTextNode(' ')); note.appendChild(a);
    }
  }

  Array.prototype.forEach.call(document.querySelectorAll('.js-form'), function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        say(form, 'Check the highlighted fields and try again.', 'bad');
        var bad = form.querySelector(':invalid'); if (bad) bad.focus();
        return;
      }
      var data = {}, fd = new FormData(form);
      fd.forEach(function (v, k) { if (k !== '_honey') data[k] = v; });
      var okText = form.getAttribute('data-ok') || 'Sent. Thank you, we will reply by email.';
      var after = form.getAttribute('data-after');
      var finish = function () {
        say(form, okText, 'ok');
        form.reset();
        if (after) { var el = document.getElementById(after); if (el) { el.hidden = false; el.scrollIntoView({ block: 'nearest' }); } }
      };
      if (fd.get('_honey')) { finish(); return; }
      data._subject = 'Digi.Tech: ' + (form.getAttribute('data-form') || 'Website form');
      data._template = 'table';
      data._captcha = 'false';
      data.Page = location.href;
      var btn = form.querySelector('[type="submit"]');
      if (btn) btn.disabled = true;
      say(form, 'Sending...', '');
      fetch('https://formsubmit.co/ajax/' + inbox(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      }).then(function (r) { if (!r.ok) throw new Error('send failed'); return r.json(); })
        .then(function (res) { if (String(res.success) === 'false') throw new Error('send failed'); finish(); })
        .catch(function () { say(form, 'That did not send from this page.', 'bad', true); })
        .then(function () { if (btn) btn.disabled = false; });
    });
  });

  /* "Email us" links: the address only exists for the instant of the click */
  Array.prototype.forEach.call(document.querySelectorAll('.js-mail'), function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      location.href = 'mailto:' + inbox() + '?subject=' + encodeURIComponent(a.getAttribute('data-subject') || 'Digi.Tech inquiry');
    });
  });

  /* Support page: picking a tier fills in the pledge form */
  Array.prototype.forEach.call(document.querySelectorAll('[data-amount]'), function (b) {
    b.addEventListener('click', function () {
      var field = document.getElementById('pledge-amount');
      if (!field) return;
      field.value = b.getAttribute('data-amount');
      field.focus();
      field.scrollIntoView({ block: 'center' });
    });
  });
})();
