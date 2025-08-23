document.addEventListener("DOMContentLoaded", () => {
  const openBtns = document.querySelectorAll(".newsletter-link");

  async function loadNewsletterModal() {
    if (document.getElementById("newsletter")) return;

    try {
      const response = await fetch("newsletter.html"); // check path!
      const html = await response.text();
      document.body.insertAdjacentHTML("beforeend", html);

      const modal = document.getElementById("newsletter");
      const closeBtn = document.getElementById("close-modal");
      const form = document.getElementById("newsletter-form");

      closeBtn.addEventListener("click", () => (modal.style.display = "none"));

      window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
      });

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Grazie per esserti iscritto!");
        form.reset();
        modal.style.display = "none";
      });

    } catch (err) {
      console.error("Errore nel caricamento della newsletter modal:", err);
    }
  }

  openBtns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      await loadNewsletterModal();
      const modal = document.getElementById("newsletter");
      modal.style.display = "block";
    });
  });
});