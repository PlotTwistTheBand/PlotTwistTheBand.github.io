document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('#items-container .item');
  const itemsPerPage = 3;
  let currentPage = 1;

  const pagination = document.querySelector('.pagination');

  function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    items.forEach((item, index) => {
      item.style.display = (index >= start && index < end) ? 'flex' : 'none';
    });
  }

  function updatePagination() {
    const pageItems = pagination.querySelectorAll('.page-item');
    pageItems.forEach((li, index) => {
      li.classList.remove('active');
      if (index === currentPage) li.classList.add('active');
    });
  }

  function goToPage(page) {
    const pageCount = Math.ceil(items.length / itemsPerPage);
    if (page < 1 || page > pageCount) return;
    currentPage = page;
    showPage(currentPage);
    updatePagination();
  }

  // Initial display
  showPage(currentPage);
  updatePagination();

  // Attach click listeners
  pagination.addEventListener('click', (e) => {
    const link = e.target.closest('.page-link');
    if (!link) return;
    e.preventDefault();

    if (link.getAttribute('aria-label') === 'Previous') {
      goToPage(currentPage - 1);
    } else if (link.getAttribute('aria-label') === 'Next') {
      goToPage(currentPage + 1);
    } else {
      const pageNum = parseInt(link.textContent);
      if (!isNaN(pageNum)) {
        goToPage(pageNum);
      }
    }
  });
});