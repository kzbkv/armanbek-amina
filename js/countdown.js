/* ============================================
   COUNTDOWN — flip-card timer
   ============================================ */

(function () {
  const WEDDING_DATE = new Date('2026-09-13T17:00:00+06:00').getTime();

  const fields = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
  };

  if (!fields.days) return;

  const previousValues = { days: null, hours: null, minutes: null, seconds: null };

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function renderDigit(el, value) {
    const formatted = pad(value);

    if (el.dataset.current === formatted) return;

    const oldVal = el.dataset.current;
    el.dataset.current = formatted;

    el.innerHTML = '';

    if (oldVal === undefined) {
      const span = document.createElement('span');
      span.className = 'digit-new';
      span.textContent = formatted;
      el.appendChild(span);
      return;
    }

    const oldSpan = document.createElement('span');
    oldSpan.className = 'digit-old';
    oldSpan.textContent = oldVal;

    const newSpan = document.createElement('span');
    newSpan.className = 'digit-new';
    newSpan.textContent = formatted;

    el.appendChild(oldSpan);
    el.appendChild(newSpan);
  }

  function tick() {
    const now = Date.now();
    const distance = Math.max(0, WEDDING_DATE - now);

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    renderDigit(fields.days, days);
    renderDigit(fields.hours, hours);
    renderDigit(fields.minutes, minutes);
    renderDigit(fields.seconds, seconds);
  }

  tick();
  setInterval(tick, 1000);
})();
