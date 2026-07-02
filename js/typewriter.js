/* ============================================
   TYPEWRITER + LETTER REVEAL
   ============================================ */

(function () {
  /* ---- split text into spans for letter-by-letter reveal ---- */
  function prepareLetterReveal() {
    document.querySelectorAll('.reveal-letters[data-text]').forEach((el) => {
      const text = el.getAttribute('data-text');
      el.innerHTML = '';
      [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${i * 0.0281}s`;
        el.appendChild(span);
      });
    });
  }

  prepareLetterReveal();

  function revealHero() {
    // Hero text is now static — no animated reveal needed
  }

  window.addEventListener('site:revealed', revealHero, { once: true });

  /* ---- typewriter for the invitation section ---- */
const inviteLines = [
  'Қадірлі ағайын-туыс, бауырлар, құда-жекжат, нағашы-жиен, бөлелер, құрбы-құрдас, әпке-жезделер, дос-жарандар, әріптестер!',
  'Сіздерді балаларымыз',
  'Арманбек пен Әминаның',
  'Үйлену тойына арналған ақ дастарханымыздың қадірлі қонағы болуға шақырамыз!'
];

  let typewriterStarted = false;

  function typeLines(container) {
    if (typewriterStarted) return;
    typewriterStarted = true;

    const cursor = document.createElement('span');
    cursor.className = 'cursor';

    let lineIndex = 0;
    let charIndex = 0;
    let currentLineEl = null;

    function typeNextChar() {
      if (lineIndex >= inviteLines.length) {
        cursor.remove();
        const rule = document.querySelector('.invite__rule');
        if (rule) rule.classList.add('is-revealed');
        document.querySelectorAll('.invite .reveal-up').forEach((el) => {
          el.classList.add('is-revealed');
        });
        return;
      }

      if (!currentLineEl) {
        currentLineEl = document.createElement('span');
        currentLineEl.className = 'line';
        container.appendChild(currentLineEl);
        currentLineEl.appendChild(cursor);
      }

      const line = inviteLines[lineIndex];

      if (charIndex < line.length) {
        cursor.insertAdjacentHTML('beforebegin', line[charIndex]);
        charIndex++;
        window.setTimeout(typeNextChar, 26 + Math.random() * 22);
      } else {
        lineIndex++;
        charIndex = 0;
        currentLineEl = null;
        window.setTimeout(typeNextChar, 380);
      }
    }

    typeNextChar();
  }

  const inviteSection = document.getElementById('invite');
  const inviteType = document.getElementById('inviteType');

  if (inviteSection && inviteType && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            typeLines(inviteType);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(inviteSection);
  }
})();
