/* ============================================
   CALENDAR — September 2026 grid, highlights the 13th
   ============================================ */

(function () {
  const grid = document.getElementById('calendarDays');
  if (!grid) return;

  const year = 2026, month = 8; // September (0-indexed)
  const highlightDay = 13;

  const firstDay = new Date(year, month, 1);
  let startOffset = firstDay.getDay() - 1; // Monday = 0
  if (startOffset < 0) startOffset = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < startOffset; i++) {
    const empty = document.createElement('span');
    empty.className = 'calendar__day calendar__day--empty';
    grid.appendChild(empty);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement('span');
    cell.className = 'calendar__day';
    cell.textContent = d;
    if (d === highlightDay) cell.classList.add('calendar__day--active');
    grid.appendChild(cell);
  }
})();
