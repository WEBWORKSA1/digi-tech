/* Digi.Tech quiz */
(function () {
  'use strict';
  var DT = window.DT, h = DT.h, box = DT.$('#quiz'), src = DT.$('#quiz-data');
  if (!box || !src) return;
  var all;
  try { all = JSON.parse(src.textContent); } catch (e) { return; }
  var i = 0, score = 0, best = DT.store.get('quiz-best', null);

  function start() {
    i = 0; score = 0;
    for (var k = all.length - 1; k > 0; k--) { var j = DT.rand(k + 1), t = all[k]; all[k] = all[j]; all[j] = t; }
    ask();
  }

  function ask() {
    var item = all[i], opts = h('div', { class: 'quiz-opts' }), why = h('div', { class: 'quiz-why', hidden: true });
    var next = DT.btn(i === all.length - 1 ? 'See my score' : 'Next question', function () { i++; if (i < all.length) ask(); else finish(); });
    next.hidden = true;
    item.a.forEach(function (text, n) {
      opts.appendChild(h('button', {
        type: 'button', text: text, onclick: function (e) {
          var right = n === item.c;
          if (right) score++;
          Array.prototype.forEach.call(opts.children, function (b, k) { b.disabled = true; if (k === item.c) b.classList.add('right'); });
          if (!right) e.currentTarget.classList.add('wrong');
          why.textContent = (right ? 'Correct. ' : 'Not quite. ') + item.why;
          why.hidden = false; next.hidden = false; next.focus();
        }
      }));
    });
    box.textContent = '';
    box.appendChild(h('p', { class: 'quiz-progress', text: 'Question ' + (i + 1) + ' of ' + all.length }));
    box.appendChild(h('h2', { class: 'quiz-q', text: item.q }));
    box.appendChild(opts); box.appendChild(why); box.appendChild(next);
  }

  function finish() {
    var pct = score / all.length;
    var verdict = pct === 1 ? 'Flawless. You could write our guides.' : pct >= 0.8 ? 'Sharp. You know your way around digital tech.' : pct >= 0.5 ? 'Solid base, with a few gaps worth closing.' : 'Plenty to gain here, and the guides are a quick way to gain it.';
    if (best == null || score > best) { best = score; DT.store.set('quiz-best', best); }
    var line = 'I scored ' + score + ' out of ' + all.length + ' on the Digi.Tech Digital IQ quiz. ' + location.href.split('#')[0];
    box.textContent = '';
    box.appendChild(h('p', { class: 'quiz-score', text: score + ' / ' + all.length }));
    box.appendChild(h('h2', { text: verdict }));
    box.appendChild(h('p', { text: 'Your best on this device: ' + best + ' out of ' + all.length + '.' }));
    box.appendChild(DT.row(DT.btn('Play again', start), DT.copyBtn(function () { return line; }, 'Copy my result to share')));
    box.appendChild(h('p', { style: 'margin-top:1.25rem' }, 'Close the gaps with the ', h('a', { href: DT.root + 'guides/', text: 'plain-English guides' }), ' or look anything up in the ', h('a', { href: DT.root + 'glossary/', text: 'glossary' }), '.'));
  }

  var go = DT.$('#quiz-start');
  if (go) go.addEventListener('click', start);
})();
