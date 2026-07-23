/* ============================================
   PETALS — falling petals, soft & subtle
   Fixed canvas over entire page
   ============================================ */

(function () {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = [
    'position:fixed',
    'inset:0',
    'z-index:3',
    'pointer-events:none',
    'width:100%',
    'height:100%',
  ].join(';');
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let W, H, petals = [], rafId = null;
  const COUNT = window.innerWidth < 640 ? 12 : 22;

  /* muted cream / gold / ivory tones — matches the minimalist palette */
  const COLORS = [
    [216, 203, 176],
    [201, 160, 99],
    [237, 228, 210],
    [184, 146, 79],
    [247, 242, 233],
  ];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makePetal(fromTop) {
    const c = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      x: Math.random() * W,
      y: fromTop ? -20 : Math.random() * H,
      w: Math.random() * 10 + 6,
      h: Math.random() * 6 + 4,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      vy: Math.random() * 0.5 + 0.25,
      vx: (Math.random() - 0.5) * 0.4,
      sway: Math.random() * 0.5 + 0.2,
      swayOff: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.35 + 0.18,
      r: c[0], g: c[1], b: c[2],
    };
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.beginPath();
    ctx.ellipse(0, 0, p.w / 2, p.h / 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.alpha})`;
    ctx.fill();
    ctx.restore();
  }

  function tick(t) {
    ctx.clearRect(0, 0, W, H);
    for (const p of petals) {
      p.rot += p.rotSpeed;
      p.y += p.vy;
      p.x += p.vx + Math.sin(t * 0.0007 + p.swayOff) * p.sway * 0.035;
      if (p.y > H + 20) { Object.assign(p, makePetal(true)); p.y = -20; }
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;
      drawPetal(p);
    }
    rafId = requestAnimationFrame(tick);
  }

  function start() {
    resize();
    petals = Array.from({ length: COUNT }, () => makePetal(false));
    rafId = requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(rafId); rafId = null; }
    else if (!rafId) rafId = requestAnimationFrame(tick);
  });

  window.addEventListener('site:revealed', start, { once: true });
})();
