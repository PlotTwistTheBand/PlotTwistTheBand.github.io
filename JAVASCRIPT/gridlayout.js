//////////////////// GRID/LIST LAYOUT ///////////////////

// Reusable grid/list toggle function
function setupGridList(containerSelector, gridBtnSelector, listBtnSelector) {
  const container = document.querySelector(containerSelector);
  const gridBtn = document.querySelector(gridBtnSelector);
  const listBtn = document.querySelector(listBtnSelector);

  if (!container || !gridBtn || !listBtn) return; // exit if any element is missing

  // Set default to grid view immediately
  container.classList.add('grid-view');
  container.classList.remove('list-view');
  gridBtn.classList.add('active');
  listBtn.classList.remove('active');

  // Toggle to grid view
  gridBtn.addEventListener('click', () => {
    container.classList.add('grid-view');
    container.classList.remove('list-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
  });

  // Toggle to list view
  listBtn.addEventListener('click', () => {
    container.classList.add('list-view');
    container.classList.remove('grid-view');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
  });
}

// Initialize for album container
document.addEventListener("DOMContentLoaded", function() {
  setupGridList('#album-container', '#grid-btn', '#list-btn');
});