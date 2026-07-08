/* ============================================
   PETALS — falling cherry blossom petals
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
  const COUNT = window.innerWidth < 640 ? 20 : 38;

  const COLORS = [
    [255, 210, 220],
    [255, 195, 210],
    [245, 205, 195],
    [255, 230, 230],
    [250, 220, 200],
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
      w: Math.random() * 12 + 7,
      h: Math.random() * 7 + 4,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.035,
      vy: Math.random() * 0.7 + 0.3,
      vx: (Math.random() - 0.5) * 0.5,
      sway: Math.random() * 0.6 + 0.2,
      swayOff: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.45 + 0.25,
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
    // vein
    ctx.beginPath();
    ctx.moveTo(-p.w / 2 + 2, 0);
    ctx.lineTo(p.w / 2 - 2, 0);
    ctx.strokeStyle = `rgba(${p.r},${p.g},${p.b},${p.alpha * 0.35})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
    ctx.restore();
  }

  function tick(t) {
    ctx.clearRect(0, 0, W, H);
    for (const p of petals) {
      p.rot += p.rotSpeed;
      p.y += p.vy;
      p.x += p.vx + Math.sin(t * 0.0008 + p.swayOff) * p.sway * 0.04;
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
