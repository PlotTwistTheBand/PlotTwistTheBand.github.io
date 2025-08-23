///////////////////////////////////////////
//CUSTOM MADE DOMContentLoaded wrapper
// JAVASCRIPTS FOR PLOT TWIST//
//////////////////////////////////////////

  
document.addEventListener('DOMContentLoaded', () => {
  function setupFilter(filterLinksSelector, itemsSelector, activeClass = 'active', allFilterText = 'tutto') {
    const filterLinks = document.querySelectorAll(filterLinksSelector);
    const items = document.querySelectorAll(itemsSelector);
    if (!filterLinks.length || !items.length) return;

    filterLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const filter = link.textContent.trim().toLowerCase();

        filterLinks.forEach(l => l.classList.remove(activeClass));
        link.classList.add(activeClass);

        items.forEach(item => {
          const category = item.getAttribute('data-category');
          item.style.display = (filter === allFilterText || category === filter) ? '' : 'none';
        });
      });
    });
  }

  // Initialize music album filters
  setupFilter('.sidebar .nav-link', '.album-container');
});






