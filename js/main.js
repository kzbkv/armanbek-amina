/* ============================================
   MAIN — sound toggle + auto-pause on hide
   ============================================ */

(function () {
  const toggle = document.getElementById('soundToggle');
  const music = document.getElementById('bgMusic');

  if (!toggle || !music) return;

  toggle.addEventListener('click', () => {
    if (music.muted) {
      music.muted = false;
      toggle.classList.remove('is-muted');
      toggle.setAttribute('aria-pressed', 'true');
      music.play().catch(() => {});
    } else {
      music.muted = true;
      toggle.classList.add('is-muted');
      toggle.setAttribute('aria-pressed', 'false');
    }
  });

  // Автопауза при сворачивании вкладки или браузера
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      music.pause();
    } else {
      if (!music.muted) {
        music.play().catch(() => {});
      }
    }
  });
})();
