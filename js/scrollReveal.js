/* ============================================
   SCROLL REVEAL + PARALLAX + PROGRESS
   ============================================ */

(function () {
  const revealEls = document.querySelectorAll(
    '.reveal-up, .reveal-zoom, .reveal-fade, .reveal-photo, .ornament-divider'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));

    // Footer line draw-in
    const footer = document.querySelector('.footer');
    if (footer) {
      const footerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('is-revealed');
          });
        },
        { threshold: 0.3 }
      );
      footerObserver.observe(footer);
    }
  } else {
    revealEls.forEach((el) => el.classList.add('is-revealed'));
  }

  /* ---- gold progress bar, via rAF ---- */
  const progressBar = document.getElementById('goldProgress');
  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progressBar) progressBar.style.width = `${progress}%`;
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();
