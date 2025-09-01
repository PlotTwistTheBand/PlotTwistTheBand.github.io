document.addEventListener('DOMContentLoaded', () => {
  const winBtn = document.querySelector('.windows98');
  const winPopup = document.getElementById('popup-windows98');
  const closeBtn = document.getElementById('close-windows98');

  if (!winBtn || !winPopup || !closeBtn) return;

  // Open popup on click or tap
  winBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent interference with desktop icon clicks
    winPopup.style.display = 'flex';
  });

  // Close popup with close button
  closeBtn.addEventListener('click', () => {
    winPopup.style.display = 'none';
  });

  // Close popup by clicking/tapping outside content
  const closeOnOutsideClick = (e) => {
    if (winPopup.style.display === 'flex' && e.target === winPopup) {
      winPopup.style.display = 'none';
    }
  };
  winPopup.addEventListener('mousedown', closeOnOutsideClick);
  winPopup.addEventListener('touchstart', closeOnOutsideClick);
});