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

      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxvEQV7YcvMxhQ-ZN2qClylweyHrnBjTnRY88-4caYuawuemBJ7MBBlG2Ep0a21A9ibBw/exec";
      
      form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.email.value; // grab the input by name

        fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          body: new URLSearchParams({ email }) // send as URL-encoded
        })
        .then(res => res.json())
        .then(data => {
          alert("Grazie! Ti sei iscritto alla newsletter.");
          form.reset();
          modal.style.display = "none";
        })
        .catch(err => {
          console.error(err);
          alert("Ops! Qualcosa è andato storto.");
        });
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