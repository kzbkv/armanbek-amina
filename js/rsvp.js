/* ============================================
   RSVP FORM
   ============================================ */

(function () {
  const form = document.getElementById('rsvpForm');
  const success = document.getElementById('rsvpSuccess');

  if (!form || !success) return;

  /* ============================================
     Google Sheets integration point
     ============================================
     To connect this form to Google Sheets:
     1. Create a Google Apps Script Web App that accepts
        POST requests and appends rows to a sheet.
     2. Replace GOOGLE_SHEETS_ENDPOINT below with that
        Web App URL.
     3. Uncomment the fetch() call inside submitToSheets().
     ============================================ */
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

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const payload = {
      name: formData.get('guestName'),
      guestCount: formData.get('guestCount'),
      attending: formData.get('attending'),
      wish: formData.get('guestWish'),
      submittedAt: new Date().toISOString(),
    };

    submitToSheets(payload);

    form.classList.add('is-hidden');

    window.setTimeout(() => {
      success.classList.add('is-visible');
    }, 350);
  });
})();
