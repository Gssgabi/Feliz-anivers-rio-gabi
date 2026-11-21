(() => {
  'use strict';

  const music = document.getElementById('background-music');
  if (!music) return;

  music.volume = 0.55;
  let starting = false;

  function startMusic() {
    if (!music.paused || starting) return;
    starting = true;

    try {
      // Alguns navegadores só liberam o som durante uma interação da pessoa.
      // A chamada fica no próprio evento, sem aguardar fontes ou animações.
      Promise.resolve(music.play()).then(
        () => { starting = false; },
        () => { starting = false; }
      );
    } catch {
      starting = false;
    }
  }

  for (const event of ['pointerdown', 'pointerup', 'touchend', 'click', 'keydown']) {
    document.addEventListener(event, startMusic, { capture: true, passive: true });
  }

  // Também permite retomar após uma interrupção do aparelho ou ao voltar à aba.
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) startMusic();
  });
  window.addEventListener('pageshow', startMusic);
  music.addEventListener('canplay', startMusic, { once: true });
  startMusic();
})();
