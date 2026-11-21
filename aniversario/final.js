const template = document.querySelector('#final-de-aniversario');
const site = document.querySelector('#root');

function attachFinale() {
  const lastOriginalSection = site.querySelector('#PBtm61CSGtjVQ1bY');
  if (!lastOriginalSection) return false;

  const finale = template.content.firstElementChild.cloneNode(true);
  lastOriginalSection.parentElement.after(finale);
  const scene = finale.querySelector('.entrega-cena');
  const stage = finale.querySelector('.entrega-palco');
  const bouquet = finale.querySelector('.entrega-buque');
  const replay = finale.querySelector('.entrega-rever');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

  function playDelivery() {
    if (reducedMotion.matches) return;
    delete finale.dataset.estado;
    void bouquet.offsetWidth;
    finale.dataset.estado = 'entregando';
  }

  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    finale.dataset.estado = 'esperando';
    const reveal = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      reveal.disconnect();
      bouquet.decode().catch(() => {}).then(playDelivery);
    }, { threshold: 0.27 });
    reveal.observe(scene);
  }

  replay.addEventListener('click', playDelivery);
  scene.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || reducedMotion.matches) return;
    const bounds = scene.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    stage.style.setProperty('--inclinar-x', `${-vertical * 8}deg`);
    stage.style.setProperty('--inclinar-y', `${horizontal * 12}deg`);
  });
  scene.addEventListener('pointerleave', () => {
    stage.style.removeProperty('--inclinar-x');
    stage.style.removeProperty('--inclinar-y');
  });
  return true;
}

if (!attachFinale()) {
  const waitForExport = new MutationObserver(() => {
    if (attachFinale()) waitForExport.disconnect();
  });
  waitForExport.observe(site, { childList: true, subtree: true });
}
