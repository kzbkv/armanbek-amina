(function () {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;z-index:1;pointer-events:none;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let W, H, sparks = [];

  const COUNT = window.innerWidth < 640 ? 35 : 65;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function create() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      size: Math.random() * 2.5 + 0.5,
      speedY: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random(),
      alphaDir: (Math.random() - 0.5) * 0.015,
      twinkle: Math.random() * Math.PI * 2,
    };
  }

  function drawStar(x, y, r, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = alpha;
    
    // 4-pointed star
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const radius = i % 2 === 0 ? r : r * 0.4;
      i === 0
        ? ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius)
        : ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    }
    ctx.closePath();
    ctx.fillStyle = '#D9BD86';
    ctx.fill();
    ctx.restore();
  }

  function tick(time) {
    ctx.clearRect(0, 0, W, H);
    for (const s of sparks) {
      s.y -= s.speedY;
      s.x += s.speedX;
      s.twinkle += 0.05;
      s.alpha += s.alphaDir;
      if (s.alpha > 0.85) s.alphaDir = -Math.abs(s.alphaDir);
      if (s.alpha < 0.05) s.alphaDir = Math.abs(s.alphaDir);
      if (s.y < -10) { s.y = H + 10; s.x = Math.random() * W; }

      const twinkleAlpha = s.alpha * (0.6 + 0.4 * Math.sin(s.twinkle));
      drawStar(s.x, s.y, s.size, twinkleAlpha);
    }
    requestAnimationFrame(tick);
  }

  function init() {
    resize();
    sparks = Array.from({ length: COUNT }, create);
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('site:revealed', init, { once: true });
})();
