/* =========================================================
   JACQUES LOGOH COUTURE — interactions & expérience immersive
   ========================================================= */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = window.matchMedia('(hover: none)').matches;
  var WA = '33782533170';
  function isClair() { return document.documentElement.getAttribute('data-theme') !== 'nuit'; }
  function mediaSrc(base, ext) { return 'assets/video/' + base + (isClair() ? '-clair' : '') + '.' + ext; }
  var PRODUCTS = window.JLC_PRODUCTS || [];
  var byId = {}; PRODUCTS.forEach(function (p) { byId[p.id] = p; });

  /* ---------- stockage (tolérant) ---------- */
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* noop */ } }
  };

  /* ---------- devise ---------- */
  var currency = store.get('jlc-cur', 'EUR');
  function money(p, cur) {
    cur = cur || currency;
    if (cur === 'FCFA') return p.fcfa.toLocaleString('fr-FR').replace(/ | /g, ' ') + ' FCFA';
    return p.eur.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
  }
  function moneyRaw(eur, fcfa) { return money({ eur: eur, fcfa: fcfa }); }

  /* ---------- GSAP / Lenis ---------- */
  var hasGsap = !!window.gsap;
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);
  var lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ duration: 1.25, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, smoothWheel: true, touchMultiplier: 1.4 });
    lenis.stop();
    if (hasGsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      var raf = function (t) { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf);
    }
  }
  function scrollToEl(target) {
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.6 });
    else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }

  /* ---------- découpe de texte ---------- */
  function splitChars(el) {
    var txt = el.textContent; el.textContent = '';
    el.setAttribute('aria-label', txt);
    txt.split('').forEach(function (c) {
      var s = document.createElement('span'); s.className = 'ch'; s.setAttribute('aria-hidden', 'true');
      s.textContent = c === ' ' ? ' ' : c; el.appendChild(s);
    });
    return $$('.ch', el);
  }
  function splitWords(el) {
    var txt = el.textContent.trim().replace(/\s+/g, ' '); el.textContent = '';
    txt.split(' ').forEach(function (w, i) {
      var s = document.createElement('span'); s.className = 'w'; s.textContent = w;
      el.appendChild(s); el.appendChild(document.createTextNode(' '));
    });
    return $$('.w', el);
  }
  function splitLines(el) {
    var parts = el.innerHTML.split(/<br\s*\/?>/i);
    el.innerHTML = parts.map(function (h) { return '<span class="rl"><span>' + h.trim() + '</span></span>'; }).join('');
    return $$('.rl > span', el);
  }

  /* =========================================================
     PRELOADER
     ========================================================= */
  var loaderRect = $('#loaderRect'), loaderCount = $('#loaderCount');
  var heroChars = [];
  $$('.hero__title .split').forEach(function (el) { heroChars = heroChars.concat(splitChars(el)); });
  if (hasGsap) gsap.set(heroChars, { yPercent: 115 });

  function preload(done) {
    var targets = [];
    var heroVid = $('.hero__video');
    targets.push(new Promise(function (res) {
      if (!heroVid) return res();
      if (heroVid.readyState >= 2) return res();
      heroVid.addEventListener('loadeddata', res, { once: true });
      heroVid.addEventListener('error', res, { once: true });
      setTimeout(res, 3000);
    }));
    if (document.fonts && document.fonts.ready) targets.push(document.fonts.ready);
    ['assets/img/site/jacques-logoh.webp', 'assets/img/p/lignes-sacrees-1.webp'].forEach(function (src) {
      targets.push(new Promise(function (res) { var i = new Image(); i.onload = i.onerror = res; i.src = src; }));
    });
    var progress = { v: 0 }, loaded = 0, total = targets.length;
    targets.forEach(function (p) { Promise.resolve(p).then(function () { loaded++; }); });
    var start = performance.now();
    (function tick() {
      var target = Math.min(loaded / total, (performance.now() - start) / 1800);
      progress.v += (target - progress.v) * 0.08;
      if (target >= 1 && progress.v > 0.995) progress.v = 1;
      var pct = Math.round(progress.v * 100);
      if (loaderCount) loaderCount.textContent = pct;
      if (loaderRect) loaderRect.setAttribute('y', String(929 - 929 * progress.v));
      if (progress.v < 1) requestAnimationFrame(tick); else setTimeout(done, 250);
    })();
  }

  function intro() {
    document.body.classList.remove('is-loading');
    if (lenis) lenis.start();
    var loader = $('#loader');
    if (!hasGsap) { if (loader) loader.remove(); return; }
    var tl = gsap.timeline({ defaults: { ease: 'expo.inOut' } });
    tl.to('.loader__mark', { scale: .7, opacity: 0, duration: .9 })
      .to('.loader__meta', { opacity: 0, duration: .5 }, 0)
      .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 1.2 }, .35)
      .set(loader, { display: 'none' })
      .to('.hero__arch', { clipPath: 'inset(0% 0 0 0)', duration: 1.6 }, .7)
      .fromTo('.hero__video', { scale: 1.4 }, { scale: 1.15, duration: 2.2, ease: 'expo.out' }, .7)
      .to(heroChars, { yPercent: 0, duration: 1.4, stagger: .035, ease: 'expo.out' }, 1.0)
      .from('.hero__side span, .hero__foot > *', { opacity: 0, y: 20, duration: 1, stagger: .06, ease: 'power3.out' }, 1.4)
      .call(function () { header.classList.add('is-in'); }, null, 1.3);
    setupScroll();
  }

  /* =========================================================
     HEADER / MENU
     ========================================================= */
  var header = $('#header'), lastY = 0;
  function onScrollHeader(y) {
    if (document.body.classList.contains('menu-open')) return;
    if (y > 200 && y > lastY + 4) header.classList.add('is-hidden');
    else if (y < lastY - 4 || y < 200) header.classList.remove('is-hidden');
    lastY = y;
  }
  if (lenis) lenis.on('scroll', function (e) { onScrollHeader(e.scroll); });
  else window.addEventListener('scroll', function () { onScrollHeader(window.scrollY); }, { passive: true });

  var menuBtn = $('#menuBtn'), menu = $('#menu'), menuPrev = $('#menuPreview');
  function toggleMenu(force) {
    var open = typeof force === 'boolean' ? force : !document.body.classList.contains('menu-open');
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    $('.header__label').textContent = open ? 'Fermer' : 'Menu';
    if (lenis) open ? lenis.stop() : lenis.start();
  }
  menuBtn.addEventListener('click', function () { toggleMenu(); });
  $$('.menu__list a').forEach(function (a) {
    a.addEventListener('mouseenter', function () {
      if (!menuPrev) return; menuPrev.style.opacity = 0;
      setTimeout(function () { menuPrev.src = a.dataset.img; menuPrev.style.opacity = 1; }, 180);
    });
  });

  /* liens d'ancrage */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (id.length < 2 && id !== '#') return;
    var t = id === '#top' || id === '#' ? document.body : $(id);
    if (!t) return;
    e.preventDefault();
    if (document.body.classList.contains('menu-open')) { toggleMenu(false); setTimeout(function () { scrollToEl(t); }, 500); }
    else scrollToEl(t);
    if (a.dataset.open) setTimeout(function () { openQuick(a.dataset.open); }, 1300);
  });

  /* =========================================================
     SCROLL SCENES
     ========================================================= */
  function setupScroll() {
    if (!hasGsap) return;
    var mm = gsap.matchMedia();

    /* hero : le titre s'ouvre, l'arche grandit */
    gsap.timeline({ scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } })
      .to('.hero__title--top', { xPercent: -18, yPercent: -40, ease: 'none' }, 0)
      .to('.hero__title--bottom', { xPercent: 18, yPercent: 40, ease: 'none' }, 0)
      .to('.hero__arch', { scale: 1.18, yPercent: 10, ease: 'none' }, 0)
      .to('.hero__side, .hero__foot', { opacity: 0, ease: 'none' }, 0);

    /* manifeste : mots révélés au défilement */
    var words = splitWords($('[data-words]'));
    gsap.to(words, { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: '.manifesto', start: 'top 70%', end: 'bottom 75%', scrub: true } });
    gsap.from('.manifesto__marks', { yPercent: 30, rotate: -8, ease: 'none', scrollTrigger: { trigger: '.manifesto', start: 'top bottom', end: 'bottom top', scrub: true } });

    /* lignes de titres */
    $$('.reveal-lines').forEach(function (el) {
      var lines = splitLines(el);
      gsap.from(lines, { yPercent: 110, duration: 1.4, stagger: .1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
    });

    /* titre Lignes Sacrées en lettres */
    $$('.split-chars').forEach(function (el) {
      var chs = splitChars(el);
      gsap.from(chs, { yPercent: 100, opacity: 0, duration: 1.3, stagger: .04, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
    });

    /* apparitions */
    ScrollTrigger.batch('.reveal', {
      start: 'top 88%',
      onEnter: function (els) { gsap.to(els, { opacity: 1, y: 0, duration: 1.2, stagger: .08, ease: 'expo.out' }); }
    });

    /* parallaxe */
    $$('[data-parallax]').forEach(function (el) {
      var k = parseFloat(el.dataset.parallax) || .1;
      var target = el.querySelector('img') || el;
      gsap.fromTo(target, { yPercent: -k * 100 }, { yPercent: k * 100, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    /* timeline horizontale (bureau) */
    mm.add('(min-width: 761px)', function () {
      var track = $('.timeline__track');
      var dist = function () { return Math.max(0, track.scrollWidth - window.innerWidth); };
      gsap.to(track, {
        x: function () { return -dist(); }, ease: 'none',
        scrollTrigger: { trigger: '#timeline', start: 'top top', end: function () { return '+=' + dist(); }, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 }
      });
    });
    gsap.from('.tl', { opacity: 0, y: 60, stagger: .08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '#timeline', start: 'top 75%' } });

    /* défilé horizontal */
    var rTrack = $('#runwayTrack');
    gsap.to(rTrack, {
      x: function () { return -(rTrack.scrollWidth - window.innerWidth); }, ease: 'none',
      scrollTrigger: { trigger: '#runway', start: 'top top', end: 'bottom bottom', scrub: 1, invalidateOnRefresh: true,
        onUpdate: function (s) { $('#runwayBar').style.transform = 'scaleX(' + s.progress + ')'; } }
    });
    $$('.look__img img', rTrack).forEach(function (img) {
      gsap.fromTo(img, { xPercent: -6 }, { xPercent: 6, ease: 'none', scrollTrigger: { trigger: '#runway', start: 'top top', end: 'bottom bottom', scrub: true } });
    });

    /* film : la fenêtre s'ouvre en plein écran */
    gsap.fromTo('#filmFrame', { clipPath: 'inset(18% 22% 18% 22%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
      scrollTrigger: { trigger: '#film', start: 'top top', end: 'bottom bottom', scrub: true }
    });
    gsap.fromTo('#filmVideo', { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '#film', start: 'top top', end: 'bottom bottom', scrub: true } });

    /* galerie 3D */
    ScrollTrigger.create({ trigger: '#gallery3d', start: 'top top', end: 'bottom bottom', scrub: true, onUpdate: function (s) { g3d.progress = s.progress; } });

    /* univers */
    gsap.from('.universe__list li', { opacity: 0, y: 50, stagger: .08, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.universe__list', start: 'top 80%' } });
    gsap.from('.card', { opacity: 0, y: 60, stagger: .05, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '#grid', start: 'top 80%' } });
    gsap.from('.footer__word > *', { yPercent: 60, opacity: 0, stagger: .12, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.footer__word', start: 'top 90%' } });

    ScrollTrigger.refresh();
  }

  /* =========================================================
     DÉFILÉ (Lignes Sacrées)
     ========================================================= */
  (function buildRunway() {
    var looks = [
      ['lignes-sacrees', 0], ['robe-solaia-2', 0], ['adelita', 0], ['roger', 0], ['lignes-sacrees', 1], ['red-corine', 0],
      ['jamy', 0], ['robe-bintou', 4], ['lignes-sacrees', 3], ['adelita', 2], ['chemise-jlnml', 0], ['robe-solaia', 0]
    ];
    var track = $('#runwayTrack');
    looks.forEach(function (l, i) {
      var p = byId[l[0]]; if (!p) return;
      var img = p.imgs[l[1]] || p.imgs[0];
      var el = document.createElement('figure'); el.className = 'look'; el.dataset.open = p.id; el.dataset.cursor = 'Voir';
      el.innerHTML = '<span class="look__n">Look ' + String(i + 1).padStart(2, '0') + '</span><div class="look__img"><img src="' + img.src + '" alt="' + p.name + '" loading="lazy"></div>' +
        '<figcaption class="look__cap"><b>' + p.name + '</b><span>' + p.cat + '</span></figcaption>';
      track.appendChild(el);
    });
  })();

  /* =========================================================
     ATELIER DES COULEURS
     ========================================================= */
  $$('.swatch').forEach(function (sw) {
    sw.addEventListener('click', function () {
      var c = sw.dataset.color;
      $$('.swatch').forEach(function (s) { s.classList.toggle('is-on', s === sw); s.setAttribute('aria-checked', String(s === sw)); });
      $$('.atelier__img, .atelier__img2').forEach(function (img) { img.classList.toggle('is-on', img.dataset.color === c); });
      var name = $('#atelierName');
      if (hasGsap) gsap.fromTo(name, { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .8, ease: 'expo.out' });
      name.textContent = sw.querySelector('span').textContent;
    });
  });
  $('.atelier__frame').addEventListener('click', function () { openQuick('robe-bintou'); });

  /* =========================================================
     FILM
     ========================================================= */
  var filmVideo = $('#filmVideo');
  function openFilm() {
    var m = $('#filmModal'), v = $('#filmFull');
    openModal(m);
    try { v.currentTime = 0; var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } catch (e) {}
  }
  $('#filmFrame').addEventListener('click', openFilm);

  /* lecture auto des vidéos visibles */
  var vidIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      var v = en.target;
      if (en.isIntersecting) { if (v.preload === 'none') v.preload = 'auto'; var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
      else v.pause();
    });
  }, { threshold: .15 });
  [filmVideo].concat($$('video[data-autoplay]')).forEach(function (v) { if (v) vidIO.observe(v); });

  /* =========================================================
     GALERIE 3D — la visite des salles
     ========================================================= */
  var g3d = { progress: 0, mx: 0, my: 0, cmx: 0, cmy: 0 };
  (function build3D() {
    var world = $('#g3dWorld'); if (!world) return;
    var rooms = [
      { num: 'Salle I', name: 'L’Héritage', items: [
        { src: 'assets/img/site/tissus-lignes-sacrees.webp', t: 'Fait main au Togo', s: 'Tissus' },
        { src: 'assets/img/site/detail-batik.webp', t: 'Le batik signature', s: 'Détail' },
        { video: 'visite-maison', t: 'La Visite', s: 'Film' },
        { src: 'assets/img/site/bijou-logo.webp', t: 'Le monogramme', s: 'Pièce signature' } ] },
      { num: 'Salle II', name: 'Lignes Sacrées', items: [
        { id: 'lignes-sacrees', i: 0 }, { id: 'robe-bintou', i: 0 }, { id: 'roger', i: 0 }, { id: 'robe-solaia-2', i: 3 }, { id: 'lignes-sacrees', i: 2 } ] },
      { num: 'Salle III', name: 'Homme', items: [
        { id: 'jamy', i: 0 }, { id: 'israel', i: 0 }, { id: 'veste-haute-couture', i: 0 }, { id: 'formose', i: 2 }, { id: 'waris-paspoil', i: 0 } ] },
      { num: 'Salle IV', name: 'Femme', items: [
        { id: 'robe-solaia-2', i: 0 }, { id: 'robe-dos-o', i: 0 }, { id: 'denim-jl', i: 0 }, { id: 'ensemble-2-pieces', i: 0 }, { id: 'sable', i: 0 } ] },
      { num: 'Salle V', name: 'Paris', items: [
        { id: 'red-corine', i: 0 }, { id: 'adelita', i: 0 }, { id: 'red-corine', i: 1 }, { id: 'adelita', i: 2 } ] }
    ];
    var Z = 0, STEP = 760, side = 1, nodes = [], titles = [], roomZ = [];
    rooms.forEach(function (room, ri) {
      Z -= ri === 0 ? 900 : 1300;
      roomZ.push(Z);
      var t = document.createElement('div'); t.className = 'g3d__item g3d__title-wrap';
      t.innerHTML = '<div class="g3d__glow"></div><div class="g3d__title"><small>' + room.num + '</small><b>' + room.name + '</b></div>';
      t.style.pointerEvents = 'none';
      world.appendChild(t); titles.push({ el: t, z: Z - 300, x: 0, y: -60, ry: 0, title: true });
      Z -= 1100;
      room.items.forEach(function (it, k) {
        var p = it.id ? byId[it.id] : null;
        var src = p ? (p.imgs[it.i] || p.imgs[0]).src : it.src;
        var el = document.createElement('div'); el.className = 'g3d__item';
        var media = it.video ? '<video data-media="' + it.video + '" data-src="' + mediaSrc(it.video, 'mp4') + '" poster="' + mediaSrc(it.video, 'jpg') + '" muted loop playsinline preload="none"></video>' : '<img data-src="' + src + '" alt="' + (p ? p.name : it.t) + '">';
        el.innerHTML = '<figure class="g3d__card">' + media + '<figcaption><b>' + (p ? p.name : it.t) + '</b><span>' + (p ? money(p) : it.s) + '</span></figcaption></figure>';
        if (p) { el.dataset.open = p.id; el.dataset.cursor = 'Découvrir'; }
        else if (it.video) { el.dataset.cursor = 'Lecture'; el.addEventListener('click', openFilm); }
        else { el.dataset.cursor = 'Voir'; }
        world.appendChild(el);
        nodes.push({ el: el, z: Z, side: side, y: (k % 2 ? 30 : -20), room: ri, p: p });
        side *= -1; Z -= STEP;
      });
    });
    var DEPTH = -Z - 300;
    /* poussière d'or en suspension */
    for (var d = 0; d < 70; d++) {
      var dust = document.createElement('span'); dust.className = 'g3d__dust g3d__item';
      world.appendChild(dust);
      titles.push({ el: dust, z: -Math.random() * (DEPTH + 2000), x: (Math.random() - .5) * 2600, y: (Math.random() - .5) * 1100, dust: true, title: true });
    }
    g3d.nodes = nodes; g3d.titles = titles; g3d.depth = DEPTH; g3d.rooms = rooms; g3d.roomZ = roomZ;

    /* chargement paresseux */
    var loaded = false;
    new IntersectionObserver(function (en) {
      if (loaded || !en[0].isIntersecting) return; loaded = true;
      $$('[data-src]', world).forEach(function (m) { m.src = m.dataset.src; });
    }, { rootMargin: '150% 0px' }).observe($('#gallery3d'));

    var viewport = $('#g3dViewport'), floor = $('#g3dFloor');
    $('#gallery3d').addEventListener('mousemove', function (e) {
      g3d.mx = (e.clientX / window.innerWidth - .5); g3d.my = (e.clientY / window.innerHeight - .5);
    });

    var roomNum = $('#g3dRoomNum'), roomName = $('#g3dRoomName'), bar = $('#g3dBar'), curRoom = -1;
    var inView = false;
    new IntersectionObserver(function (en) { inView = en[0].isIntersecting; document.body.classList.toggle('in-g3d', inView); }).observe($('#gallery3d'));

    function frame() {
      requestAnimationFrame(frame);
      if (!inView) return;
      var w = window.innerWidth, mobile = w < 760;
      var spread = mobile ? w * .2 : Math.min(560, w * .27);
      g3d.cmx += (g3d.mx - g3d.cmx) * .06; g3d.cmy += (g3d.my - g3d.cmy) * .06;
      var cam = g3d.progress * DEPTH;
      world.style.transform = 'translate3d(0,0,0) rotateY(' + (g3d.cmx * -6) + 'deg) rotateX(' + (g3d.cmy * 4) + 'deg) translate3d(' + (g3d.cmx * -60) + 'px,' + (g3d.cmy * -30) + 'px,' + cam + 'px)';
      var list = nodes.concat(titles);
      for (var i = 0; i < list.length; i++) {
        var n = list[i], rel = n.z + cam; // distance devant la caméra (négatif = devant)
        var op;
        if (rel > 520) op = 0;
        else if (rel > 120) op = 1 - (rel - 120) / 400;
        else if (rel < -4600) op = 0;
        else if (rel < -2800) op = (rel + 4600) / 1800;
        else op = 1;
        if (n.dust) op *= .55;
        var x = n.dust ? n.x : (n.title ? 0 : n.side * spread);
        var ry = n.title ? 0 : n.side * (mobile ? -10 : -16);
        n.el.style.opacity = op.toFixed(3);
        n.el.style.visibility = op <= 0.001 ? 'hidden' : 'visible';
        n.el.style.transform = 'translate3d(' + x + 'px,' + (n.y || 0) + 'px,' + n.z + 'px) rotateY(' + ry + 'deg)';
      }
      /* salle courante */
      var r = 0;
      for (var q = roomZ.length - 1; q >= 0; q--) { if (cam >= -roomZ[q] - 1800) { r = q; break; } }
      if (r !== curRoom) {
        curRoom = r; roomNum.textContent = rooms[r].num; roomName.textContent = rooms[r].name;
        if (hasGsap) gsap.fromTo(roomName, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .8, ease: 'expo.out' });
      }
      bar.style.transform = 'scaleX(' + g3d.progress.toFixed(4) + ')';
      if (floor) floor.style.backgroundPosition = '0 0, 0 ' + (cam * .35).toFixed(1) + 'px, ' + (g3d.cmx * -80).toFixed(1) + 'px 0';
    }
    requestAnimationFrame(frame);
    // ScrollTrigger si GSAP absent ou mouvement réduit
    if (!hasGsap) window.addEventListener('scroll', function () {
      var s = $('#gallery3d'), r = s.getBoundingClientRect();
      g3d.progress = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
    }, { passive: true });
  })();

  /* =========================================================
     COLLECTIONS
     ========================================================= */
  var grid = $('#grid');
  function renderGrid() {
    grid.innerHTML = '';
    PRODUCTS.forEach(function (p, i) {
      var feature = (i % 9 === 0);
      var el = document.createElement('article');
      el.className = 'card' + (feature ? ' is-feature' : '');
      el.dataset.cat = p.cat; el.dataset.open = p.id; el.dataset.cursor = 'Voir';
      var a = p.imgs[0], b = p.imgs[1];
      el.innerHTML = '<div class="card__img"><img src="' + a.src + '" alt="' + p.name + '" loading="lazy" width="' + a.w + '" height="' + a.h + '">' +
        (b ? '<img src="' + b.src + '" alt="" loading="lazy" aria-hidden="true">' : '') +
        (p.id === 'lignes-sacrees' ? '<span class="card__tag">Collection signature</span>' : (p.id === 'jamy' ? '<span class="card__tag">Notre plus grand succès</span>' : '')) +
        '<span class="card__quick">Aperçu rapide</span></div>' +
        '<div class="card__meta"><h3 class="card__name">' + p.name + '</h3><span class="card__price" data-price="' + p.id + '">' + money(p) + '</span></div>' +
        '<div class="card__cat">' + p.cat + ' · ' + p.colors.length + ' coloris</div>';
      grid.appendChild(el);
    });
  }
  renderGrid();
  $$('.filters button').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.dataset.filter;
      $$('.filters button').forEach(function (x) { x.classList.toggle('is-on', x === b); x.setAttribute('aria-selected', String(x === b)); });
      $$('.card', grid).forEach(function (c, i) {
        var show = f === 'all' || c.dataset.cat === f;
        c.classList.toggle('is-hidden', !show);
      });
      // mise en avant recalculée
      var vis = $$('.card:not(.is-hidden)', grid);
      vis.forEach(function (c, i) { c.classList.toggle('is-feature', i % 9 === 0); });
      if (hasGsap) { gsap.fromTo(vis, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .8, stagger: .03, ease: 'expo.out' }); ScrollTrigger.refresh(); }
    });
  });

  /* devise */
  function setCurrency(c) {
    currency = c; store.set('jlc-cur', c);
    $$('.currency button').forEach(function (b) { b.classList.toggle('is-active', b.dataset.cur === c); });
    $$('[data-price]').forEach(function (el) { var p = byId[el.dataset.price]; if (p) el.textContent = money(p); });
    $$('.g3d__item[data-open] figcaption span').forEach(function (s) { var p = byId[s.closest('[data-open]').dataset.open]; if (p) s.textContent = money(p); });
    if (qvCurrent) $('#qvPrice').textContent = money(qvCurrent);
    renderCart();
  }
  $$('.currency button').forEach(function (b) { b.addEventListener('click', function () { setCurrency(b.dataset.cur); }); });

  /* =========================================================
     MODALES
     ========================================================= */
  var openStack = [];
  function openModal(m) {
    m.classList.add('is-open'); m.setAttribute('aria-hidden', 'false'); openStack.push(m);
    if (lenis) lenis.stop(); document.documentElement.style.overflow = 'hidden';
    var c = m.querySelector('.modal__close'); if (c) setTimeout(function () { c.focus({ preventScroll: true }); }, 50);
  }
  function closeModal(m) {
    m = m || openStack[openStack.length - 1]; if (!m) return;
    m.classList.remove('is-open'); m.setAttribute('aria-hidden', 'true');
    openStack = openStack.filter(function (x) { return x !== m; });
    $$('video', m).forEach(function (v) { v.pause(); });
    if (!openStack.length && !cartEl.classList.contains('is-open')) { if (lenis) lenis.start(); document.documentElement.style.overflow = ''; }
  }
  $$('.modal [data-close]').forEach(function (b) { b.addEventListener('click', function () { closeModal(b.closest('.modal')); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (openStack.length) closeModal(); else if (cartEl.classList.contains('is-open')) toggleCart(false); else if (document.body.classList.contains('menu-open')) toggleMenu(false);
  });

  /* aperçu produit */
  var qv = $('#qv'), qvCurrent = null, qvSel = { size: null, color: null };
  function chips(container, list, key) {
    container.innerHTML = '';
    list.forEach(function (v, i) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = v;
      if (i === 0) { b.classList.add('is-on'); qvSel[key] = v; }
      b.addEventListener('click', function () { $$('button', container).forEach(function (x) { x.classList.toggle('is-on', x === b); }); qvSel[key] = v; updateWa(); });
      container.appendChild(b);
    });
  }
  function updateWa() {
    var p = qvCurrent; if (!p) return;
    var msg = 'Bonjour Jacques Logoh Couture, je souhaite commander : ' + p.name + ' — Taille ' + qvSel.size + ', couleur ' + qvSel.color + ' (' + money(p) + ').';
    $('#qvWa').href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
  }
  function openQuick(id) {
    var p = byId[id]; if (!p) return;
    qvCurrent = p;
    $('#qvCat').textContent = p.cat; $('#qvName').textContent = p.name; $('#qvPrice').textContent = money(p);
    $('#qvDesc').textContent = p.desc || '';
    var main = $('#qvMain'), th = $('#qvThumbs');
    main.innerHTML = '<img src="' + p.imgs[0].src + '" alt="' + p.name + '">';
    th.innerHTML = '';
    p.imgs.forEach(function (im, i) {
      var b = document.createElement('button'); b.type = 'button'; b.className = i === 0 ? 'is-on' : '';
      b.setAttribute('aria-label', 'Vue ' + (i + 1));
      b.innerHTML = '<img src="' + im.src + '" alt="">';
      b.addEventListener('click', function () {
        $$('button', th).forEach(function (x) { x.classList.toggle('is-on', x === b); });
        var img = main.querySelector('img');
        if (hasGsap) gsap.fromTo(img, { opacity: .2, scale: 1.04 }, { opacity: 1, scale: 1, duration: .8, ease: 'expo.out' });
        img.src = im.src;
      });
      th.appendChild(b);
    });
    th.style.display = p.imgs.length > 1 ? '' : 'none';
    chips($('#qvSizes'), p.sizes, 'size'); chips($('#qvColors'), p.colors, 'color');
    updateWa();
    openModal(qv);
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-open]');
    if (!t || t.tagName === 'A') return;
    openQuick(t.dataset.open);
  });
  $('#qvAdd').addEventListener('click', function () {
    if (!qvCurrent) return;
    cart.push({ id: qvCurrent.id, size: qvSel.size, color: qvSel.color });
    store.set('jlc-cart', cart); renderCart();
    toast('Ajouté au panier — ' + qvCurrent.name);
    closeModal(qv); setTimeout(function () { toggleCart(true); }, 400);
  });

  /* articles */
  var POSTS = {
    lignes: { date: '13 juin 2026', title: 'Story telling de la collection Lignes Sacrées', img: 'assets/img/site/tissus-lignes-sacrees.webp', text: [
      'Lignes Sacrées est bien plus qu’une collection : c’est la signature de la Maison Jacques Logoh Couture. Elle incarne l’ADN même de la marque en mettant à l’honneur son symbole le plus précieux : son logo.',
      'À travers cette collection, le logo ne se limite plus à une simple identité visuelle ; il devient un langage, un motif et une empreinte artistique qui raconte l’histoire de la Maison. Chaque ligne, chaque détail et chaque silhouette traduisent les valeurs de raffinement, d’héritage et d’excellence qui définissent Jacques Logoh Couture.',
      'Ce qui rend Lignes Sacrées encore plus exceptionnelle est le savoir-faire artisanal qui lui donne vie. Les tissus utilisés sont entièrement réalisés à la main par des artisans togolais, gardiens de techniques ancestrales transmises de génération en génération. Chaque pièce porte ainsi l’empreinte du geste humain, de la patience et de l’authenticité.',
      'Lignes Sacrées est la rencontre entre la création contemporaine et le patrimoine africain. Une collection qui célèbre la noblesse du travail artisanal, la richesse culturelle du Togo et la volonté de la Maison Jacques Logoh Couture de transformer son identité en œuvre d’art à porter.',
      'Porter Lignes Sacrées, c’est porter une histoire, un héritage et une vision de l’élégance africaine tournée vers le monde.' ] },
    cocktail: { date: '14 janvier 2026', title: 'Présentation cocktail', img: 'assets/img/site/news-brazzaville.webp', text: [
      'Notre pop-up à Brazzaville a été une véritable réussite. Nous y avons rencontré un public ambitieux, passionné et profondément réceptif à notre univers créatif.',
      'Une expérience forte, riche en échanges et en belles énergies, qui confirme l’impact et l’attrait de notre vision.' ] },
    vente: { date: '14 janvier 2026', title: 'Vente privée', img: 'assets/img/site/news-vente-privee.webp', text: [
      'Nous organisons régulièrement des ventes privées dans plusieurs pays. Cette année, Jacques Logoh Couture déploie un programme international ambitieux à travers un Pop-Up Tour exclusif.',
      'Abonnez-vous à nos pages Instagram pour suivre toute l’actualité de nos collections, de nos ventes privées et de nos événements à venir.',
      'Notre expérience pop-up à Conakry en décembre a été tout simplement exceptionnelle, marquée par de belles rencontres et des échanges de grande qualité. Nous vous remercions chaleureusement.' ] }
  };
  $$('[data-post]').forEach(function (el) {
    el.addEventListener('click', function () {
      var p = POSTS[el.dataset.post];
      $('#artImg').src = p.img; $('#artImg').alt = p.title; $('#artDate').textContent = p.date; $('#artTitle').textContent = p.title;
      $('#artText').innerHTML = p.text.map(function (t) { return '<p>' + t + '</p>'; }).join('');
      openModal($('#article'));
    });
  });

  /* =========================================================
     PANIER
     ========================================================= */
  var cart = store.get('jlc-cart', []).filter(function (c) { return byId[c.id]; });
  var cartEl = $('#cart');
  function toggleCart(open) {
    open = typeof open === 'boolean' ? open : !cartEl.classList.contains('is-open');
    cartEl.classList.toggle('is-open', open); cartEl.setAttribute('aria-hidden', String(!open));
    if (lenis) open ? lenis.stop() : (!openStack.length && lenis.start());
  }
  $('#cartBtn').addEventListener('click', function () { toggleCart(true); });
  $$('[data-close-cart]').forEach(function (b) { b.addEventListener('click', function () { toggleCart(false); }); });
  function renderCart() {
    var box = $('#cartItems'); $('#cartCount').textContent = cart.length;
    if (!cart.length) { box.innerHTML = '<p class="cart__empty">Votre panier est vide.</p>'; $('#cartTotal').textContent = money({ eur: 0, fcfa: 0 }); $('#cartWa').removeAttribute('href'); return; }
    var eur = 0, fcfa = 0, lines = [];
    box.innerHTML = '';
    cart.forEach(function (c, i) {
      var p = byId[c.id]; eur += p.eur; fcfa += p.fcfa;
      lines.push('• ' + p.name + ' — Taille ' + c.size + ', ' + c.color + ' (' + money(p) + ')');
      var row = document.createElement('div'); row.className = 'ci';
      row.innerHTML = '<img src="' + p.imgs[0].src + '" alt=""><div><b>' + p.name + '</b><small>Taille ' + c.size + ' · ' + c.color + '</small></div><div class="ci__r">' + money(p) + '<button data-rm="' + i + '">Retirer</button></div>';
      box.appendChild(row);
    });
    var total = moneyRaw(Math.round(eur * 100) / 100, fcfa);
    $('#cartTotal').textContent = total;
    var msg = 'Bonjour Jacques Logoh Couture, je souhaite commander :\n' + lines.join('\n') + '\nTotal : ' + total;
    $('#cartWa').href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
    $$('[data-rm]', box).forEach(function (b) { b.addEventListener('click', function () { cart.splice(+b.dataset.rm, 1); store.set('jlc-cart', cart); renderCart(); }); });
  }
  renderCart();

  var toastEl = document.createElement('div'); toastEl.className = 'toast'; document.body.appendChild(toastEl);
  function toast(t) { toastEl.textContent = t; toastEl.classList.add('is-on'); clearTimeout(toastEl._t); toastEl._t = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2400); }

  /* newsletter */
  $('#newsForm').addEventListener('submit', function (e) { e.preventDefault(); this.hidden = true; $('#newsOk').hidden = false; });

  /* =========================================================
     UNIVERS — image flottante
     ========================================================= */
  (function () {
    var fl = $('#universeFloat'), img = fl.querySelector('img'), x = 0, y = 0, tx = 0, ty = 0, on = false;
    $$('#universeList li').forEach(function (li) {
      li.addEventListener('mouseenter', function () { img.src = li.dataset.img; fl.classList.add('is-on'); on = true; });
      li.addEventListener('mouseleave', function () { fl.classList.remove('is-on'); on = false; });
    });
    window.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; });
    (function loop() { x += (tx - x) * .12; y += (ty - y) * .12; if (on) fl.style.transform = 'translate(' + (x - 130) + 'px,' + (y - 160) + 'px) rotate(' + ((tx - x) * .05) + 'deg)'; requestAnimationFrame(loop); })();
  })();

  /* =========================================================
     CURSEUR
     ========================================================= */
  (function () {
    if (isTouch) return;
    var c = $('.cursor'), dot = $('.cursor__dot'), ring = $('.cursor__ring'), label = $('.cursor__label');
    var mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    window.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });
    (function loop() {
      rx += (mx - rx) * .16; ry += (my - ry) * .16;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover', function (e) {
      var t = e.target.closest('[data-cursor]');
      var l = e.target.closest('a, button');
      if (t) { c.classList.add('is-hover'); c.classList.remove('is-link'); label.textContent = t.dataset.cursor; }
      else if (l) { c.classList.remove('is-hover'); c.classList.add('is-link'); }
      else { c.classList.remove('is-hover', 'is-link'); }
    });
  })();

  /* =========================================================
     MODE CLAIR (par défaut) / MODE SOMBRE — sur la même page
     ========================================================= */
  (function () {
    var root = document.documentElement, meta = $('meta[name="theme-color"]');
    function swapVideo(v, src) {
      var playing = !v.paused, t = v.currentTime || 0;
      var onMeta = function () {
        v.removeEventListener('loadedmetadata', onMeta);
        try { v.currentTime = Math.min(t, (v.duration || t + 1) - .1); } catch (e) {}
        if (playing) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
      };
      v.addEventListener('loadedmetadata', onMeta);
      v.setAttribute('src', src); if (v.dataset.src) v.dataset.src = src;
      v.load();
    }
    function applyMedia() {
      $$('video[data-media]').forEach(function (v) {
        var src = mediaSrc(v.dataset.media, 'mp4');
        v.poster = mediaSrc(v.dataset.media, 'jpg');
        if (!v.getAttribute('src')) { if (v.dataset.src) v.dataset.src = src; return; }
        if (v.getAttribute('src') !== src) swapVideo(v, src);
      });
      var mv = $('.menu__list a[href="#visite"]');
      if (mv) mv.dataset.img = mediaSrc('film-maison', 'jpg');
    }
    function setTheme(t, animate) {
      var go = function () {
        root.setAttribute('data-theme', t === 'nuit' ? 'nuit' : 'clair');
        if (meta) meta.setAttribute('content', t === 'nuit' ? '#0c0b0a' : '#fbf9f6');
        $$('[data-theme-set]').forEach(function (b) { var on = b.dataset.themeSet === t; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on)); });
        applyMedia();
      };
      if (animate && document.startViewTransition && !reduce) document.startViewTransition(go); else go();
    }
    $$('[data-theme-set]').forEach(function (b) { b.addEventListener('click', function () { setTheme(b.dataset.themeSet, true); }); });
    setTheme(isClair() ? 'clair' : 'nuit', false);
  })();

  /* =========================================================
     EXPÉRIENCE SONORE — « La Visite », thème original de la Maison
     ========================================================= */
  (function () {
    var audio = $('#ambient'); if (!audio) return;
    var btn = $('#soundBtn'), invite = $('#soundInvite');
    var on = false, vol = 0, target = 0, inVisit = false, ducked = false, invited = store.get('jlc-invite', false);
    var BASE = .22, VISIT = .85;
    function computeTarget() { target = !on || ducked || document.hidden ? 0 : (inVisit ? VISIT : BASE); }
    (function fade() {
      vol += (target - vol) * .035;
      if (Math.abs(target - vol) < .002) vol = target;
      audio.volume = Math.max(0, Math.min(1, vol));
      if (vol === 0 && target === 0 && !audio.paused) audio.pause();
      requestAnimationFrame(fade);
    })();
    function setSound(state) {
      on = state; store.set('jlc-sound', on);
      document.body.classList.toggle('is-sound', on);
      btn.setAttribute('aria-pressed', String(on));
      btn.setAttribute('aria-label', on ? 'Couper la musique' : 'Activer la musique');
      if (on) { audio.preload = 'auto'; var pr = audio.play(); if (pr && pr.catch) pr.catch(function () { setSound(false); }); hideInvite(); }
      computeTarget();
    }
    function hideInvite() { invite.classList.remove('is-on'); invite.setAttribute('aria-hidden', 'true'); }
    btn.addEventListener('click', function () { setSound(!on); });
    $$('[data-sound-on]').forEach(function (b) { b.addEventListener('click', function () { setSound(true); }); });
    $('#soundNo').addEventListener('click', function () { invited = true; store.set('jlc-invite', true); hideInvite(); });

    /* la musique s'élève quand on entre dans la Maison */
    new IntersectionObserver(function (en) {
      inVisit = en[0].isIntersecting; computeTarget();
      if (inVisit && !on && !invited) { invite.classList.add('is-on'); invite.setAttribute('aria-hidden', 'false'); }
      if (!inVisit) hideInvite();
    }, { rootMargin: '-20% 0px -20% 0px' }).observe($('#visite'));

    /* le film plein écran a sa propre bande-son : la musique d'ambiance s'efface */
    var fm = $('#filmModal');
    new MutationObserver(function () { ducked = fm.classList.contains('is-open'); computeTarget(); if (!ducked && on && audio.paused) audio.play().catch(function () {}); })
      .observe(fm, { attributes: true, attributeFilter: ['class'] });
    document.addEventListener('visibilitychange', function () { computeTarget(); if (!document.hidden && on && audio.paused) audio.play().catch(function () {}); });

    /* préférence mémorisée : reprise au premier geste du visiteur */
    if (store.get('jlc-sound', false)) {
      var resume = function (ev) {
        ['pointerdown', 'keydown', 'touchstart'].forEach(function (e) { window.removeEventListener(e, resume); });
        if (ev && ev.target && ev.target.closest && ev.target.closest('#soundBtn, [data-sound-on]')) return; // le bouton gère lui-même
        setSound(true);
      };
      ['pointerdown', 'keydown', 'touchstart'].forEach(function (e) { window.addEventListener(e, resume, { once: true }); });
    }
  })();

  /* =========================================================
     DÉMARRAGE
     ========================================================= */
  if (reduce || !hasGsap) {
    header.classList.add('is-in');
    var ld = $('#loader'); if (ld) ld.style.display = 'none';
    document.body.classList.remove('is-loading');
    $$('.reveal').forEach(function (e) { e.style.opacity = 1; e.style.transform = 'none'; });
    $('.hero__arch').style.clipPath = 'none';
    if (hasGsap) { gsap.set(heroChars, { yPercent: 0 }); ScrollTrigger.create({ trigger: '#gallery3d', start: 'top top', end: 'bottom bottom', onUpdate: function (s) { g3d.progress = s.progress; } }); }
    else { $$('.manifesto__quote').forEach(function (q) { q.style.opacity = 1; }); }
  } else {
    preload(intro);
  }
  window.addEventListener('load', function () { if (hasGsap) ScrollTrigger.refresh(); });
})();
