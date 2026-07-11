/* ============================================
   ENVELOPE — entrance gate interaction
   ============================================ */

(function () {
  const gate = document.getElementById('gate');
  const envelope = document.getElementById('envelope');
  const site = document.getElementById('site');
  const music = document.getElementById('bgMusic');

  if (!gate || !envelope || !site) return;

  let hasOpened = false;

  function openEnvelope() {
    if (hasOpened) return;
    hasOpened = true;

    gate.classList.add('is-opening');
    envelope.classList.add('is-open');

    // Try to start music on the gesture (browsers require user interaction)
    if (music) {
      music.volume = 0.275;
      music.play().catch(() => {
        /* autoplay blocked — sound toggle remains available */
      });
    }

    // Let the card-out animation play, then dissolve the gate
    window.setTimeout(() => {
      gate.classList.add('is-leaving');
      site.classList.add('is-visible');
      site.removeAttribute('aria-hidden');
      document.body.style.overflow = '';

      const hero = document.querySelector('.hero');
      if (hero) {
        window.setTimeout(() => hero.classList.add('hero--revealed'), 250);
      }

      // remove gate from layout after transition completes
      window.setTimeout(() => {
        gate.style.display = 'none';
        window.dispatchEvent(new CustomEvent('site:revealed'));
      }, 1500);
    }, 1700);
  }

  document.body.style.overflow = 'hidden';

  envelope.addEventListener('click', openEnvelope);
  envelope.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openEnvelope();
    }
  });
})();
