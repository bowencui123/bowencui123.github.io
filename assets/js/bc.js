/* Bowen Cui — Academic Site
   Ported from the claude.ai/design project "英文学术网站雏形" (DCLogic Component)
   to vanilla JS: theme toggle, mobile menu, PTX digital-rain gutters,
   live GitHub contribution heatmap, publication year filters, BibTeX copy. */

(function () {
  'use strict';

  /* ---------------- Theme ---------------- */
  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('bcui-theme', t); } catch (e) {}
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = t === 'light' ? 'Dark' : 'Light';
    renderGh(); // recolor the contribution graph
  }

  /* ---------------- Mobile menu ---------------- */
  function initMenu() {
    var btn = document.getElementById('menu-toggle');
    var nav = document.getElementById('mobile-nav');
    if (!btn || !nav) return;
    btn.addEventListener('click', function () { nav.classList.toggle('open'); });
  }

  /* ---------------- PTX digital rain (side gutters) ---------------- */
  var rain = [];
  var rainRaf = null;
  var reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  var PTX = [
    // ---- classic PTX ----
    'mov.u32', 'ld.global', 'st.global', 'ld.shared', 'st.shared',
    'add.s32', 'mad.lo.s32', 'mul.wide', 'fma.rn.f32', 'div.rn.f32',
    'setp.lt', 'selp.b32', 'bar.sync', 'cvta.to', 'shl.b32',
    'ld.param', 'atom.add', 'shfl.sync', 'vote.sync', 'wmma.load',
    '%tid.x', '%ctaid.x', '%ntid.x', '%laneid', '%warpid',
    // ---- Blackwell / B200 (sm_100): 5th-gen tensor core + async ----
    'tcgen05.mma', 'tcgen05.ld', 'tcgen05.st', 'tcgen05.cp', 'tcgen05.wait',
    'tcgen05.commit', 'wgmma.mma', 'wgmma.wait', 'wgmma.fence', 'mbarrier',
    'mbarrier.arrive', 'cp.async.bulk', 'cp.bulk.tensor', 'fence.proxy', 'elect.sync',
    'st.async', 'red.async', 'mapa', 'getctarank', 'cluster.arrive',
    'cluster.wait', 'clusterlaunch',
    // ---- Blackwell narrow-precision converts (FP4 / FP6 / FP8 MX) ----
    'cvt.e4m3x2', 'cvt.e5m2x2', 'cvt.e2m1x2', 'cvt.e3m2x2', 'cvt.e2m3x2',
    '.mxf8f6f4', '.nvfp4', '.e4m3', '.e2m1'
  ];

  function glyph() { return PTX[Math.floor(Math.random() * PTX.length)]; }

  function sizeRain() {
    var contentW = 1160;      // content column
    var minGutter = 52;       // hide the rain below this gutter width
    var gutter = Math.floor((window.innerWidth - contentW) / 2) - 2;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var fontSize = 11;
    var lineH = Math.round(fontSize * 1.55);
    var els = [document.getElementById('rain-left'), document.getElementById('rain-right')];
    rain = els.filter(Boolean).map(function (cv) {
      if (gutter < minGutter) { cv.style.width = '0px'; return null; }
      var h = window.innerHeight;
      cv.style.width = gutter + 'px';
      cv.width = Math.floor(gutter * dpr);
      cv.height = Math.floor(h * dpr);
      return { cv: cv, ctx: cv.getContext('2d'), dpr: dpr, fontSize: fontSize, lineH: lineH, gutter: gutter, h: h, bursts: [], lastSpawn: 0, nextGap: 300 };
    }).filter(Boolean);
  }

  // Sparse "compute bursts": short glyph runs that pop up at random spots,
  // flicker while "computing", hold, then fade — no top-down waterfall.
  function drawRain(now) {
    if (!rain.length) return;
    var dark = currentTheme() === 'dark';
    var head = dark ? [231, 220, 242] : [110, 88, 140];
    var body = dark ? [150, 108, 175] : [130, 100, 152];
    var maxA = dark ? 0.9 : 0.42;
    var TYPE = 155, HOLD = 900, FADE = 1100;   // per-glyph type delay + hold + fade (ms) — slow
    var maxBursts = 5;

    for (var ri = 0; ri < rain.length; ri++) {
      var r = rain[ri];
      var ctx = r.ctx;
      ctx.setTransform(r.dpr, 0, 0, r.dpr, 0, 0);
      ctx.clearRect(0, 0, r.gutter, r.h);
      ctx.font = '600 ' + r.fontSize + 'px "Source Code Pro", monospace';
      ctx.textBaseline = 'top';

      // spawn a new burst on a slow, jittered cadence
      if (now - r.lastSpawn > r.nextGap && r.bursts.length < maxBursts) {
        r.lastSpawn = now;
        r.nextGap = 650 + Math.random() * 1300;
        var len = 2 + Math.floor(Math.random() * 3);
        var cells = [], indents = [];
        for (var i = 0; i < len; i++) {
          cells.push(glyph());
          indents.push((Math.random() < 0.32 ? 1 : 0) * 7);   // occasional code-style indent
        }
        var y0 = Math.random() * Math.max(1, r.h - len * r.lineH - 10);
        r.bursts.push({
          align: Math.random() < 0.45 ? 'R' : 'L',   // ragged-left vs ragged-right
          y0: y0, indents: indents,
          len: len, cells: cells, t0: now,
          reveal: len * TYPE, total: len * TYPE + HOLD + FADE
        });
      }

      r.bursts = r.bursts.filter(function (b) { return now - b.t0 < b.total; });
      for (var bi = 0; bi < r.bursts.length; bi++) {
        var b = r.bursts[bi];
        var age = now - b.t0;
        var gm = 1;
        if (age > b.reveal + HOLD) gm = Math.max(0, 1 - (age - b.reveal - HOLD) / FADE);
        var lead = Math.min(b.len - 1, Math.floor(age / TYPE));
        for (var j = 0; j < b.len; j++) {
          var appear = j * TYPE;
          if (age < appear) continue;
          var local = age - appear;
          if (local < 180 && Math.random() < 0.4) b.cells[j] = glyph();
          var ramp = Math.min(1, local / 160);
          var isHead = j === lead && age < b.reveal + 120;
          var c = isHead ? head : body;
          ctx.globalAlpha = maxA * ramp * gm * (isHead ? 1 : 0.7);
          ctx.fillStyle = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
          var tok = b.cells[j];
          var w = ctx.measureText(tok).width;
          var x;
          if (b.align === 'R') x = Math.max(3, r.gutter - w - 4 - b.indents[j]);
          else x = Math.min(4 + b.indents[j], Math.max(3, r.gutter - w - 3));
          ctx.fillText(tok, x, b.y0 + j * r.lineH);
        }
      }
      ctx.globalAlpha = 1;
    }
  }

  function startRain() {
    if (rainRaf || reduced) return;   // honor prefers-reduced-motion
    var loop = function () { drawRain(performance.now()); rainRaf = requestAnimationFrame(loop); };
    rainRaf = requestAnimationFrame(loop);
  }

  function stopRain() {
    if (rainRaf) { cancelAnimationFrame(rainRaf); rainRaf = null; }
  }

  /* ---------------- GitHub contribution heatmap ---------------- */
  var ghWeeks = null, ghMonths = null, ghTotal = 0, ghStatus = 'loading';

  function ghRoot() { return document.getElementById('gh-activity'); }

  // Live GitHub contribution calendar via a public CORS-enabled API.
  // Refetched on every page load, so the graph is always current.
  function loadGitHub() {
    var root = ghRoot();
    if (!root) return;
    var user = root.getAttribute('data-user') || 'bowencui123';
    var base = 'https://github-contributions-api.jogruber.de/v4/' + encodeURIComponent(user);
    var grab = function (q) {
      return fetch(base + q).then(function (r) { if (!r.ok) throw new Error('bad status'); return r.json(); });
    };
    var sumOf = function (days) { return days.reduce(function (s, x) { return s + (x.count || 0); }, 0); };

    grab('?y=last')
      .then(function (d) {
        var days = (d && d.contributions) || [];
        // The rolling-year route can serve a stale cached 0 right after a
        // profile-visibility change. Rebuild the true trailing-12-month window
        // from the two calendar years (fresh) so the total matches GitHub.
        if (sumOf(days) > 0) return days;
        var yr = new Date().getFullYear();
        return Promise.all([
          grab('?y=' + (yr - 1)).catch(function () { return {}; }),
          grab('?y=' + yr).catch(function () { return {}; })
        ]).then(function (res) {
          var merged = [].concat((res[0] && res[0].contributions) || [], (res[1] && res[1].contributions) || []);
          var today = new Date();
          var cut = new Date(); cut.setDate(today.getDate() - 370);
          var cutS = cut.toISOString().slice(0, 10);
          var todayS = today.toISOString().slice(0, 10);
          return merged.filter(function (x) { return x && x.date >= cutS && x.date <= todayS; });
        });
      })
      .then(function (days) {
        if (!days.length) throw new Error('empty');
        var weeks = [];
        var week = new Array(7).fill(null);
        days.forEach(function (day) {
          var wd = new Date(day.date + 'T00:00:00').getDay();
          week[wd] = { date: day.date, count: day.count || 0, level: day.level || 0 };
          if (wd === 6) { weeks.push(week); week = new Array(7).fill(null); }
        });
        if (week.some(function (x) { return x; })) weeks.push(week);
        var names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var lastLabeledMonth = -1, lastCol = -99;
        ghMonths = weeks.map(function (w, i) {
          var f = null;
          for (var k = 0; k < w.length; k++) { if (w[k]) { f = w[k]; break; } }
          var m = f ? new Date(f.date + 'T00:00:00').getMonth() : -1;
          if (m === -1) return '';
          if (m !== lastLabeledMonth && (i - lastCol) >= 3) {   // min column gap avoids overlap
            lastLabeledMonth = m; lastCol = i; return names[m];
          }
          return '';
        });
        ghTotal = days.reduce(function (s, x) { return s + (x.count || 0); }, 0);
        ghWeeks = weeks;
        ghStatus = 'ready';
        renderGh();
      })
      .catch(function () { ghStatus = 'error'; renderGh(); });
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function renderGh() {
    var root = ghRoot();
    if (!root) return;
    var user = root.getAttribute('data-user') || 'bowencui123';
    var url = 'https://github.com/' + user;
    var totalEl = document.getElementById('gh-total');

    if (ghStatus === 'loading') {
      root.innerHTML = '<div class="gh-loading">Loading contribution graph…</div>';
      return;
    }
    if (ghStatus === 'error') {
      root.innerHTML = '<div class="gh-error">Live data unavailable right now — <a href="' + url + '" target="_blank" rel="noopener">view @' + esc(user) + ' on GitHub →</a></div>';
      return;
    }
    if (ghStatus === 'ready' && ghTotal === 0) {
      root.innerHTML = '<div class="gh-note">No <em>public</em> contributions found for <a href="' + url + '" target="_blank" rel="noopener">@' + esc(user) + '</a>. If your activity is mostly in private repositories, enable <strong>Settings → Profile → “Include private contributions on my profile”</strong> on GitHub — this graph will then populate automatically on every visit.</div>';
      return;
    }
    if (ghStatus !== 'ready' || !ghWeeks) return;

    // GitHub heatmap levels 0–4, in GitHub's classic green (level 0 tuned to the site bg)
    var dark = currentTheme() === 'dark';
    var levels = dark
      ? ['#241f2e', '#0e4429', '#006d32', '#26a641', '#39d353']
      : ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
    var cellBorder = dark ? 'rgba(255,255,255,0.16)' : 'rgba(27,31,35,0.07)';

    if (totalEl) totalEl.textContent = ghTotal + ' contributions in the last year';

    var h = '<div class="gh-box"><div class="gh-scroll"><div class="gh-inner">';
    h += '<div class="gh-months">';
    ghMonths.forEach(function (m) {
      h += '<div class="gh-month">' + (m ? '<span>' + m + '</span>' : '') + '</div>';
    });
    h += '</div><div class="gh-weeks">';
    ghWeeks.forEach(function (w) {
      h += '<div class="gh-week">';
      w.forEach(function (c) {
        if (c) {
          var tip = c.count + ' contribution' + (c.count === 1 ? '' : 's') + ' on ' + c.date;
          h += '<div class="gh-cell" title="' + esc(tip) + '" style="background:' + (levels[c.level] || levels[0]) + ';border:1px solid ' + cellBorder + ';"></div>';
        } else {
          h += '<div class="gh-cell" style="background:transparent;"></div>';
        }
      });
      h += '</div>';
    });
    h += '</div></div></div>';
    h += '<div class="gh-foot"><a class="gh-link" href="' + url + '" target="_blank" rel="noopener">@' + esc(user) + ' on GitHub →</a>';
    h += '<div class="gh-legend"><span class="lbl">Less</span>';
    levels.forEach(function (lc) {
      h += '<div class="gh-cell" style="background:' + lc + ';border:1px solid ' + cellBorder + ';"></div>';
    });
    h += '<span class="lbl">More</span></div></div>';
    root.innerHTML = h;
  }

  /* ---------------- Publications: year filter + BibTeX copy ---------------- */
  function initPubs() {
    var filters = document.querySelectorAll('.pub-filter');
    var groups = document.querySelectorAll('.pub-group');
    filters.forEach(function (f) {
      f.addEventListener('click', function () {
        var y = f.getAttribute('data-year');
        filters.forEach(function (o) { o.classList.toggle('active', o === f); });
        groups.forEach(function (g) {
          g.style.display = (y === 'all' || g.getAttribute('data-year') === y) ? '' : 'none';
        });
      });
    });

    var copyT = null;
    document.querySelectorAll('.bib-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var text = btn.getAttribute('data-bibtex') || '';
        try {
          var w = navigator.clipboard && navigator.clipboard.writeText(text);
          if (w && w.catch) w.catch(function () {});   // clipboard write rejects async (unfocused/denied)
        } catch (e) {}
        document.querySelectorAll('.bib-btn.copied').forEach(function (o) {
          o.classList.remove('copied'); o.textContent = 'BibTeX';
        });
        btn.classList.add('copied');
        btn.textContent = 'Copied ✓';
        clearTimeout(copyT);
        copyT = setTimeout(function () { btn.classList.remove('copied'); btn.textContent = 'BibTeX'; }, 1600);
      });
    });
  }

  /* ---------------- Boot ---------------- */
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.textContent = currentTheme() === 'light' ? 'Dark' : 'Light';
      btn.addEventListener('click', function () {
        applyTheme(currentTheme() === 'light' ? 'dark' : 'light');
      });
    }
    initMenu();
    initPubs();

    var printBtn = document.getElementById('print-cv');
    if (printBtn) printBtn.addEventListener('click', function () { window.print(); });

    sizeRain();
    startRain();
    window.addEventListener('resize', sizeRain);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stopRain(); else startRain();
    });

    loadGitHub();
  });
})();
