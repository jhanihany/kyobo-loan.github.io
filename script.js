(() => {
  const deck = document.getElementById('deck');
  const slides = [...document.querySelectorAll('.slide')];
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const counter = document.getElementById('counter');
  const progressFill = document.getElementById('progressFill');
  const hint = document.getElementById('hint');
  let current = 0;
  let touchStartY = null;
  let touchStartX = null;

  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

  function goTo(index) {
    const target = clamp(index, 0, slides.length - 1);
    slides[target].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateUI(index) {
    current = clamp(index, 0, slides.length - 1);
    counter.textContent = `${current + 1} / ${slides.length}`;
    progressFill.style.width = `${((current + 1) / slides.length) * 100}%`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === slides.length - 1;
    history.replaceState(null, '', `#${current + 1}`);
  }

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) updateUI(Number(visible.target.dataset.slide) - 1);
  }, { root: deck, threshold: [0.55, 0.75] });

  slides.forEach(slide => observer.observe(slide));

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  window.addEventListener('keydown', (e) => {
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) {
      e.preventDefault();
      goTo(current + 1);
    } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
      e.preventDefault();
      goTo(current - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      goTo(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goTo(slides.length - 1);
    }
  });

  deck.addEventListener('touchstart', (e) => {
    if (!e.touches[0]) return;
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  deck.addEventListener('touchend', (e) => {
    if (touchStartY == null || touchStartX == null || !e.changedTouches[0]) return;
    const dy = e.changedTouches[0].clientY - touchStartY;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const primary = Math.abs(dy) > Math.abs(dx) ? dy : dx;
    if (Math.abs(primary) > 55) goTo(current + (primary < 0 ? 1 : -1));
    touchStartY = touchStartX = null;
  }, { passive: true });

  fullscreenBtn.addEventListener('click', async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (_) {}
  });

  document.addEventListener('fullscreenchange', () => {
    fullscreenBtn.textContent = document.fullscreenElement ? '×' : '⛶';
    fullscreenBtn.setAttribute('aria-label', document.fullscreenElement ? '전체화면 종료' : '전체화면');
  });

  const hashSlide = Number(location.hash.replace('#', ''));
  if (Number.isFinite(hashSlide) && hashSlide >= 1 && hashSlide <= slides.length) {
    setTimeout(() => goTo(hashSlide - 1), 0);
  } else {
    updateUI(0);
  }

  setTimeout(() => hint.classList.add('hide'), 3200);
})();
