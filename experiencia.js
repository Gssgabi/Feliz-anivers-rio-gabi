(() => {
  'use strict';
  const letter = document.querySelector('.letter');
  const copy = document.querySelector('.letter-copy');
  if (letter && copy) {
    // A textura tem uma margem transparente. O espaço interno acompanha a
    // altura real do conteúdo, inclusive após carregar fontes ou dar zoom.
    const fitLetter = () => {
      const contentHeight = Math.ceil(copy.getBoundingClientRect().height);
      if (!contentHeight) return;
      const paperHeight = contentHeight / 0.7;
      letter.style.setProperty('--letter-pad-top', `${Math.max(72, Math.ceil(paperHeight * 0.17) + 8)}px`);
      letter.style.setProperty('--letter-pad-bottom', `${Math.max(72, Math.ceil(paperHeight * 0.13) + 8)}px`);
    };
    fitLetter();
    if ('ResizeObserver' in window) new ResizeObserver(fitLetter).observe(copy);
    window.addEventListener('resize', fitLetter, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitLetter, fitLetter);
  }
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const previewMotion = new URLSearchParams(location.search).get('movimento') === '1';
  const allowMotion = () => previewMotion || !reduceMotion.matches;
  const canObserve = 'IntersectionObserver' in window;
  const bouquetScene = document.getElementById('buque');
  const bouquetAnimation = document.getElementById('bouquet-animation');
  if (bouquetScene && bouquetAnimation) {
    let active = !canObserve;
    let outside = false;
    const targetOrigin = location.origin === 'null' ? '*' : location.origin;

    const sendVisibility = () => {
      bouquetAnimation.contentWindow?.postMessage({
        type: 'bouquet-visibility',
        active,
        outside,
        animate: allowMotion()
      }, targetOrigin);
    };

    bouquetAnimation.addEventListener('load', sendVisibility);
    reduceMotion.addEventListener('change', sendVisibility);
    if (canObserve) {
      const observer = new IntersectionObserver(([entry]) => {
        const ratio = entry.intersectionRatio;
        active = active ? ratio >= 0.38 : ratio >= 0.78;
        outside = ratio < 0.12;
        sendVisibility();
      }, { threshold: [0.12, 0.38, 0.78] });
      observer.observe(bouquetScene);
    } else {
      sendVisibility();
    }
  }

  const scenes = Array.from(document.querySelectorAll('#happy, #moldura, #fotos'));
  if (!allowMotion() || !canObserve) {
    scenes.forEach(scene => scene.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.intersectionRatio < 0.42) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.42 });
  document.documentElement.classList.add('has-motion');

  function start() {
    scenes.forEach(scene => observer.observe(scene));
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(start, start);
  else start();

  const onMotionChange = () => {
    if (allowMotion()) return;
    document.documentElement.classList.remove('has-motion');
    scenes.forEach(scene => scene.classList.add('is-visible'));
    observer.disconnect();
  };
  if (typeof reduceMotion.addEventListener === 'function') {
    reduceMotion.addEventListener('change', onMotionChange);
  } else if (typeof reduceMotion.addListener === 'function') {
    reduceMotion.addListener(onMotionChange);
  }
})();
