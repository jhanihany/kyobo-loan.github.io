(() => {
  const progress = document.getElementById('progressFill');
  const reveals = [...document.querySelectorAll('.reveal')];

  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = `${Math.min(100, Math.max(0, pct))}%`;
  };
  updateProgress();
  addEventListener('scroll', updateProgress, { passive: true });
  addEventListener('resize', updateProgress);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

  reveals.forEach((el) => observer.observe(el));

  const heroDeck = document.querySelector('.hero-deck img');
  if (heroDeck && matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelector('.hero-deck').addEventListener('mousemove', (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      heroDeck.style.transform = `rotateY(${(-5 + x * 5).toFixed(2)}deg) rotateX(${(2 - y * 4).toFixed(2)}deg) translateY(-2px)`;
    });
    document.querySelector('.hero-deck').addEventListener('mouseleave', () => {
      heroDeck.style.transform = 'rotateY(-5deg) rotateX(2deg)';
    });
  }
})();
