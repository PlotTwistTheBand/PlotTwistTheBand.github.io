document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll("#footer-toggle");
  
  toggles.forEach(toggleBtn => {
    const page = toggleBtn.closest(".home-page, .gallery-page");
    if (!page) return;

    const footer = page.querySelector(".footer-section");
    if (!footer) return;

    // Store card HTML once
    const cardOpen = `
      <div class="card">
        <div class="card-inner">
          <div class="card-front">♠︎</div>
          <div class="card-back">♤</div>
        </div>
      </div>`;
    const cardClosed = `
      <div class="card">
        <div class="card-inner">
          <div class="card-front">♤</div>
          <div class="card-back">♠︎</div>
        </div>
      </div>`;

    toggleBtn.addEventListener("click", () => {
      footer.classList.toggle("active");
      toggleBtn.innerHTML = footer.classList.contains("active") 
        ? cardOpen 
        : cardClosed;
    });
  });
});

