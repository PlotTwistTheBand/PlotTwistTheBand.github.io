document.addEventListener("DOMContentLoaded", () => {
  // Reference existing modal elements
  const modal = document.getElementById("newsletter");
  const closeBtn = document.getElementById("close-modal");
  const form = document.getElementById("newsletter-form");
  const openBtns = document.querySelectorAll(".newsletter-link");

  // Modal open logic only on gallery page for double click/double tap
  if (document.body.classList.contains('gallery-page')) {
    openBtns.forEach((btn) => {
      // Double click for desktop
      btn.addEventListener("dblclick", (e) => {
        e.preventDefault();
        if (modal) {
          modal.style.display = "block";
        }
      });

      // Double tap detection for touch devices
      let lastTap = 0;
      btn.addEventListener("touchend", (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
          e.preventDefault();
          if (modal) {
            modal.style.display = "block";
          }
        }
        lastTap = currentTime;
      });
    });
  } else {
    // On non-gallery pages, open modal on single click normally
    openBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (modal) {
          modal.style.display = "block";
        }
      });
    });
  }

  // Modal close logic
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      const content = modal.querySelector(".modal-content");
      if (content && !content.contains(e.target)) {
        modal.style.display = "none";
      }
    });
  }

  // Keep the GOOGLE_SCRIPT_URL and submission logic
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxvEQV7YcvMxhQ-ZN2qClylweyHrnBjTnRY88-4caYuawuemBJ7MBBlG2Ep0a21A9ibBw/exec";

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.email.value;
      alert("Grazie! Ti sei iscritto alla newsletter.");
      form.reset();
      if (modal) {
        modal.style.display = "none";
      }

      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: new URLSearchParams({ email })
      })
      .then(res => res.json())
      .catch(err => {
        console.error(err);
        alert("Ops! Qualcosa è andato storto.");
      });
    });
  }
});