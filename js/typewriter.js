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

  const inviteSection = document.getElementById('invite');
  const inviteType = document.getElementById('inviteType');

  if (inviteSection && inviteType && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            inviteType.classList.add('is-visible');

            window.setTimeout(() => {
              const namesLine = inviteType.querySelector('.names-line');
              if (namesLine) namesLine.classList.add('names-line--revealed');
              const rule = document.querySelector('.invite__rule');
              if (rule) rule.classList.add('is-revealed');
              document.querySelectorAll('.invite .reveal-up').forEach(el => {
                el.classList.add('is-revealed');
              });
            }, 2200);

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(inviteSection);
  }
})();