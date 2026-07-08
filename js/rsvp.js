/* ============================================
   RSVP FORM — with validation
   ============================================ */

(function () {
  const form = document.getElementById('rsvpForm');
  const success = document.getElementById('rsvpSuccess');

  if (!form || !success) return;

  const GOOGLE_SHEETS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbz4HFIdxJToDRgg1XDXGydYzi2edaa6Obfk0Uqc5jOSCaAcN1tz9xYDvvnChM0SLd2Qdg/exec';

  function submitToSheets(data) {
    if (!GOOGLE_SHEETS_ENDPOINT) return Promise.resolve();
    return fetch(GOOGLE_SHEETS_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch((err) => {
      console.warn('RSVP: could not reach Google Sheets endpoint', err);
    });
  }

  function clearErrors() {
    form.querySelectorAll('.rsvp__error').forEach(el => el.remove());
    form.querySelectorAll('.rsvp__field--error').forEach(el => {
      el.classList.remove('rsvp__field--error');
    });
  }

  function showError(fieldId, message) {
    if (fieldId === 'attending') {
      const group = form.querySelector('.rsvp__radio-group');
      const err = document.createElement('p');
      err.className = 'rsvp__error';
      err.textContent = message;
      group.after(err);
      return;
    }

    const input = form.querySelector('#' + fieldId);
    if (!input) return;
    const fieldEl = input.closest('.rsvp__field');
    if (fieldEl) fieldEl.classList.add('rsvp__field--error');
    const err = document.createElement('p');
    err.className = 'rsvp__error';
    err.textContent = message;
    input.after(err);
    input.focus();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const name = form.querySelector('#guestName').value.trim();
    const count = form.querySelector('#guestCount').value;
    const attending = form.querySelector('input[name="attending"]:checked');

    let hasError = false;

    if (!name) {
      showError('guestName', 'Аты-жөніңізді енгізіңіз');
      hasError = true;
    }

    if (!count) {
      showError('guestCount', 'Қанша адам келетінін таңдаңыз');
      hasError = true;
    }

    if (!attending) {
      showError('attending', 'Қатысу мүмкіндігіңізді белгілеңіз');
      hasError = true;
    }

    if (hasError) return;

    const payload = {
      name,
      guestCount: count,
      attending: attending.value,
      submittedAt: new Date().toISOString(),
    };

    submitToSheets(payload);

    form.classList.add('is-hidden');

    window.setTimeout(() => {
      success.classList.add('is-visible');
    }, 350);
  });

  // Убираем ошибку при вводе
  form.addEventListener('input', (e) => {
    const field = e.target.closest('.rsvp__field');
    if (field) {
      field.classList.remove('rsvp__field--error');
      const err = field.querySelector('.rsvp__error');
      if (err) err.remove();
    }
  });

  form.addEventListener('change', (e) => {
    const err = form.querySelector('.rsvp__error');
    if (err && e.target.name === 'attending') err.remove();
  });

})();