/* ============================================
   TYPEWRITER + LETTER REVEAL
   ============================================ */

(function () {
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
    // Hero text is now static
  }

  window.addEventListener('site:revealed', revealHero, { once: true });

  /* ---- typewriter ---- */
  const inviteLines = [
    'Қадірлі ағайын-туыс, бауырлар, құда-жекжат, нағашы-жиен, бөлелер, құрбы-құрдас, әпке-жезделер, дос-жарандар, әріптестер, көршілер, барша жақындарымыз!',
    'Сіздерді балаларымыз',
    'Арманбек пен Әминаның',   // ← line index 2 — special
    'Үйлену тойына арналған ақ дастарханымыздың қадірлі қонағы болуға шақырамыз!',
  ];

  // Index of the line to highlight
  const HIGHLIGHT_LINE = 2;

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

        // Wrap the special line in a highlight container
        if (lineIndex === HIGHLIGHT_LINE) {
          currentLineEl.className = 'line names-line';
          const inner = document.createElement('span');
          inner.className = 'names-highlight';
          currentLineEl.appendChild(inner);
          container.appendChild(currentLineEl);
          // cursor lives inside the inner span
          inner.appendChild(cursor);
        } else {
          container.appendChild(currentLineEl);
          currentLineEl.appendChild(cursor);
        }
      }

      const line = inviteLines[lineIndex];
      const targetEl = lineIndex === HIGHLIGHT_LINE
        ? currentLineEl.querySelector('.names-highlight')
        : currentLineEl;

      if (charIndex < line.length) {
        cursor.insertAdjacentHTML('beforebegin', line[charIndex]);
        charIndex++;
        // Type the special line slightly faster for drama
        const speed = lineIndex === HIGHLIGHT_LINE ? 55 : 26 + Math.random() * 22;
        window.setTimeout(typeNextChar, speed);
      } else {
        // When the highlight line finishes, trigger the flourish
        if (lineIndex === HIGHLIGHT_LINE) {
          triggerNameReveal(currentLineEl);
        }
        lineIndex++;
        charIndex = 0;
        currentLineEl = null;
        window.setTimeout(typeNextChar, lineIndex === HIGHLIGHT_LINE + 1 ? 700 : 380);
      }
    }

    typeNextChar();
  }

  /* Fire the post-type flourish on the special line */
  function triggerNameReveal(lineEl) {
    // Add glow class after a beat
    window.setTimeout(() => {
      lineEl.classList.add('names-line--revealed');
      // Draw the decorative underline
      const under = lineEl.querySelector('.names-underline');
      if (under) under.classList.add('names-underline--in');
    }, 200);
  }

  const inviteSection = document.getElementById('invite');
  const inviteType    = document.getElementById('inviteType');

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
