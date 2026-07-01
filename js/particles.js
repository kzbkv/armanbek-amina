/* ============================================
   PARTICLES — ambient gold dust, canvas-based
   ============================================ */

(function () {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let width, height;
  let rafId = null;

  const PARTICLE_COUNT = window.innerWidth < 640 ? 26 : 50;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.4,
      speedY: Math.random() * 0.25 + 0.05,
      speedX: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.5 + 0.15,
      flicker: Math.random() * 0.02,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.y -= p.speedY;
      p.x += p.speedX;
      p.alpha += (Math.random() - 0.5) * p.flicker;
      p.alpha = Math.max(0.08, Math.min(0.65, p.alpha));

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(217, 189, 134, ${p.alpha})`;
      ctx.shadowColor = 'rgba(217, 189, 134, 0.8)';
      ctx.shadowBlur = 4;
      ctx.fill();
    }
    rafId = requestAnimationFrame(draw);
  }

  function start() {
    if (rafId) return;
    draw();
  }

  function stop() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  window.addEventListener('resize', resize);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  init();
  start();
})();
