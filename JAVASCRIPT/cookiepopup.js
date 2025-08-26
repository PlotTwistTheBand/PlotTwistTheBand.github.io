document.addEventListener("DOMContentLoaded", function() {
  const cookiePopup = document.getElementById('cookie-popup');
  const acceptBtn = document.getElementById('accept-cookies');
  const rejectBtn = document.getElementById('reject-cookies');

  // Block the page by default
  document.body.style.overflow = "hidden";

  // Show popup if cookie not set
  if (!localStorage.getItem('cookieConsent')) {
    cookiePopup.style.display = 'flex';
  } else {
    const consent = localStorage.getItem('cookieConsent');
    cookiePopup.style.display = 'none';
    document.body.style.overflow = "auto"; // enable scrolling
    if (consent === 'accepted') loadAnalytics();
  }

  acceptBtn.addEventListener('click', function() {
    localStorage.setItem('cookieConsent', 'accepted');
    // Insert gtag consent update and config for GA4 after consent
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted'
      });
      gtag('config', 'G-PLSVD1FMYS');
    }
    cookiePopup.style.display = 'none';
    document.body.style.overflow = "auto"; // enable scrolling
    loadAnalytics();
  });

  rejectBtn.addEventListener('click', function() {
    localStorage.setItem('cookieConsent', 'rejected');
    cookiePopup.style.display = 'none';
    document.body.style.overflow = "auto"; // enable scrolling
    // No GA loaded
  });

  function loadAnalytics() {
    const gaScript = document.createElement('script');
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-PLSVD1FMYS";
    gaScript.async = true;
    document.head.appendChild(gaScript);

    gaScript.onload = function() {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-PLSVD1FMYS');
    };
  }
});

function openCookieSettings() {
  const popup = document.getElementById('cookie-settings-popup');
  const statusEl = document.getElementById('cookie-status');
  popup.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // block scrolling

  // Show current consent
  const consent = localStorage.getItem('cookieConsent');
  statusEl.textContent = consent === 'accepted' ? "Accettato"
                      : consent === 'rejected' ? "Rifiutato"
                      : "Non impostato";

  // Buttons
  document.getElementById('accept-cookies-settings').onclick = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    // Insert gtag consent update and config for GA4 after consent
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted'
      });
      gtag('config', 'G-PLSVD1FMYS');
    }
    statusEl.textContent = "Accettato";
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
    loadAnalytics(); // optional: start GA immediately
  };

  document.getElementById('reject-cookies-settings').onclick = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    statusEl.textContent = "Rifiutato";
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
  };
}