// Integrated gallery popup & desktop icon system with:
// - Column-first grid layout
// - Responsive icon sizing
// - Dragging (desktop & mobile)
// - Double-click/double-tap popups
// - Trashcan (reset & "delete" popup)
// - Popup closes on outside click
// - Preserves all current features

document.addEventListener("DOMContentLoaded", () => {
  const desktop = document.querySelector('.desktop');
  if (!desktop) return;
  const icons = Array.from(desktop.querySelectorAll('.icon'));
  let iconWidth = 80;
  let iconHeight = 80;
  const minIcon = 60, maxIcon = 100;
  const padding = 30;
  let zCounter = 1010;
  let originalPositions = [];

  // --- Responsive icon sizing ---
  function updateIconSize() {
    // Icon size scales from maxIcon (large screens) to minIcon (small)
    const vw = Math.max(window.innerWidth, 360);
    iconWidth = Math.max(minIcon, Math.min(maxIcon, Math.floor(vw/14)));
    iconHeight = iconWidth;
    icons.forEach(icon => {
      icon.style.width = iconWidth + 'px';
      icon.style.fontSize = Math.round(iconWidth * 0.7) + 'px';
      // Also update icon's inner icon font-size
      const iTag = icon.querySelector('i');
      if (iTag) iTag.style.fontSize = Math.round(iconWidth * 0.62) + 'px';
    });
  }

  // --- Column-first grid layout ---
  function positionIcons(reset=false) {
  updateIconSize();

  const maxRows = 4; // maximum rows before wrapping to next column
  const availableHeight = window.innerHeight - padding;
  const rowsThatFit = Math.max(1, Math.floor(availableHeight / (iconHeight + padding)));
  const rows = Math.min(maxRows, rowsThatFit); // never exceed 4 rows

  icons.forEach((icon, i) => {
    const row = i % rows;             // vertical position
    const col = Math.floor(i / rows); // horizontal position
    icon.style.position = "absolute";
    icon.style.top = (padding + row * (iconHeight + padding)) + "px";
    icon.style.left = (padding + col * (iconWidth + padding)) + "px";
    icon.style.transition = reset ? "all 0.3s cubic-bezier(.77,0,.18,1.01)" : "";
    icon.style.zIndex = 100;
    if (reset) {
      originalPositions[i] = { top: icon.style.top, left: icon.style.left };
    }
  });

  if (reset || originalPositions.length !== icons.length) {
    originalPositions = icons.map(icon => ({
      top: icon.style.top,
      left: icon.style.left
    }));
  }
}
  // Initial grid
  positionIcons(true);

  // --- Trashcan setup ---
  let trashcan = document.getElementById('trashcan');
  if (!trashcan) {
    trashcan = document.createElement('div');
    trashcan.id = 'trashcan';
    trashcan.style.position = 'absolute';
    trashcan.style.width = '80px';
    trashcan.style.height = '80px';
    trashcan.style.bottom = '150px';
    trashcan.style.right = '50px';
    trashcan.style.background = 'transparent';
    trashcan.style.borderRadius = '12px';
    trashcan.style.zIndex = 1;
    trashcan.style.display = 'flex';
    trashcan.style.justifyContent = 'center';
    trashcan.style.alignItems = 'center';
    trashcan.style.boxShadow = '0 0 12px 3px rgba(0,0,0,0.12)';
    trashcan.innerHTML = '<i class="bi bi-trash2-fill" style="font-size:40px;color:rgba(225, 225, 225, 0.99);"></i>';
    document.body.appendChild(trashcan);
  }

  // --- Trashcan "delete" popup ---
  function showTrashPopup() {
    if (document.getElementById('trash-popup')) return;
    const alertPopup = document.createElement('div');
    alertPopup.id = 'trash-popup';
    alertPopup.textContent = "Non puoi eliminare questo file!";
    alertPopup.style.position = 'fixed';
    alertPopup.style.top = '50%';
    alertPopup.style.left = '50%';
    alertPopup.style.transform = 'translate(-50%, -50%)';
    alertPopup.style.background = 'black';
    alertPopup.style.color = 'white';
    alertPopup.style.padding = '1.1rem 2.2rem';
    alertPopup.style.borderRadius = '10px';
    alertPopup.style.zIndex = 3000;
    alertPopup.style.fontSize = '1.1rem';
    alertPopup.style.boxShadow = '0 0 20px 5px rgba(0,0,0,0.25)';
    document.body.appendChild(alertPopup);
    setTimeout(() => {
      if (alertPopup.parentNode) alertPopup.parentNode.removeChild(alertPopup);
    }, 1700);
  }

  // --- Check if icon is over trashcan ---
  function isOverTrash(icon) {
    const iconRect = icon.getBoundingClientRect();
    const trashRect = trashcan.getBoundingClientRect();
    return (
      iconRect.right > trashRect.left &&
      iconRect.left < trashRect.right &&
      iconRect.bottom > trashRect.top &&
      iconRect.top < trashRect.bottom
    );
  }

  // --- Dragging logic (desktop & mobile) ---
  icons.forEach((icon, idx) => {
    let offsetX, offsetY;
    let dragging = false;
    let lastTap = 0;
    let dragMoved = false;
    let origZ = icon.style.zIndex || 100;

    // --- Desktop dragging ---
    icon.addEventListener('mousedown', (e) => {
      e.preventDefault();
      dragging = true;
      dragMoved = false;
      origZ = icon.style.zIndex;
      icon.style.zIndex = ++zCounter;
      offsetX = e.clientX - icon.offsetLeft;
      offsetY = e.clientY - icon.offsetTop;
      icon.style.transition = "none";
      function move(ev) {
        dragMoved = true;
        icon.style.left = (ev.clientX - offsetX) + 'px';
        icon.style.top = (ev.clientY - offsetY) + 'px';
      }
      function stop(ev) {
        dragging = false;
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', stop);
        // Snap back if over trashcan
        if (isOverTrash(icon)) {
          // Reset position
          icon.style.transition = "all .25s";
          icon.style.top = originalPositions[idx].top;
          icon.style.left = originalPositions[idx].left;
          showTrashPopup();
        }
        setTimeout(() => { icon.style.transition = ""; }, 260);
        icon.style.zIndex = origZ;
      }
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', stop);
    });

    // --- Mobile dragging ---
    icon.addEventListener('touchstart', (e) => {
      if (e.touches.length > 1) return;
      dragging = true;
      dragMoved = false;
      origZ = icon.style.zIndex;
      icon.style.zIndex = ++zCounter;
      const touch = e.touches[0];
      offsetX = touch.clientX - icon.offsetLeft;
      offsetY = touch.clientY - icon.offsetTop;
      icon.style.transition = "none";
      function move(ev) {
        if (!ev.touches || ev.touches.length === 0) return;
        dragMoved = true;
        const t = ev.touches[0];
        icon.style.left = (t.clientX - offsetX) + 'px';
        icon.style.top = (t.clientY - offsetY) + 'px';
      }
      function stop(ev) {
        dragging = false;
        document.removeEventListener('touchmove', move);
        document.removeEventListener('touchend', stop);
        // Snap back if over trashcan
        if (isOverTrash(icon)) {
          icon.style.transition = "all .25s";
          icon.style.top = originalPositions[idx].top;
          icon.style.left = originalPositions[idx].left;
          showTrashPopup();
        }
        setTimeout(() => { icon.style.transition = ""; }, 260);
        icon.style.zIndex = origZ;
      }
      document.addEventListener('touchmove', move, { passive: false });
      document.addEventListener('touchend', stop);
    });

    // --- Double-click (desktop) ---
    icon.addEventListener('dblclick', (e) => {
      const popupId = icon.dataset.popup;
      const popup = document.getElementById(popupId);
      if (popup) {
        popup.style.display = 'flex';
        // Prevent icon from being dragged after double-click
        e.stopPropagation();
      }
    });

    // --- Double-tap (mobile) ---
    icon.addEventListener('touchend', (e) => {
      // Ignore if just dragged
      if (dragMoved) { dragMoved = false; return; }
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      if (tapLength < 350 && tapLength > 0) {
        const popupId = icon.dataset.popup;
        const popup = document.getElementById(popupId);
        if (popup) popup.style.display = 'flex';
        e.preventDefault();
      }
      lastTap = currentTime;
    });
  });

  // --- Trashcan click: reset all icons to original positions ---
  trashcan.addEventListener('click', (e) => {
    // Animate icons back
    icons.forEach((icon, idx) => {
      icon.style.transition = "all .35s cubic-bezier(.7,0,.2,1)";
      icon.style.top = originalPositions[idx].top;
      icon.style.left = originalPositions[idx].left;
      setTimeout(() => { icon.style.transition = ""; }, 400);
    });
    showTrashPopup();
    e.stopPropagation();
  });

  // --- Popup close when clicking outside content ---
  document.addEventListener('mousedown', (e) => {
    document.querySelectorAll('.gallery-popup').forEach(popup => {
      if (popup.style.display === 'flex') {
        const content = popup.querySelector('.gallery-popup-content');
        if (content && !content.contains(e.target)) {
          popup.style.display = 'none';
        }
      }
    });
  });
  // For touch devices
  document.addEventListener('touchstart', (e) => {
    document.querySelectorAll('.gallery-popup').forEach(popup => {
      if (popup.style.display === 'flex') {
        const content = popup.querySelector('.gallery-popup-content');
        if (content && !content.contains(e.target)) {
          popup.style.display = 'none';
        }
      }
    });
  });

  // --- Responsive grid on resize ---
  window.addEventListener('resize', () => {
    positionIcons(true);
  });
});
document.querySelectorAll('.gallery-popup').forEach(gallery => {
  const carousel = gallery.querySelector('.carousel');
  const thumbnails = gallery.querySelectorAll('.thumb-row img');

  // Function to update active thumbnail
  const updateActiveThumb = (index) => {
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
  };

  // Initialize first thumbnail as active
  updateActiveThumb(0);

  // On thumbnail click, change carousel slide
  thumbnails.forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
      const carouselInstance = bootstrap.Carousel.getInstance(carousel);
      carouselInstance.to(i);
    });
  });

  // On carousel slide, update thumbnail active
  carousel.addEventListener('slid.bs.carousel', (event) => {
    updateActiveThumb(event.to);
  });
});


// --- Desktop copyright positioning ---
(function () {
  // Only run on the gallery page (desktop)
  if (!document.body.classList.contains('gallery-page')) return;

  const footer = document.querySelector('.footer-section');
  const copyright = document.querySelector('.copyright');
  if (!footer || !copyright) return;

  function updateCopyrightPosition() {
    const footerHeight = footer.getBoundingClientRect().height;
    const offset = 8; // px above footer
    copyright.style.position = 'fixed';
    copyright.style.left = '50%';
    copyright.style.transform = 'translateX(-50%)';
    copyright.style.bottom = footerHeight + offset + 'px';
    copyright.style.width = '100%';
    copyright.style.textAlign = 'center';
    copyright.style.zIndex = 9999;
  }

  // Initial position
  updateCopyrightPosition();

  // Update on window resize
  window.addEventListener('resize', updateCopyrightPosition);

  // Live update if footer height changes
  if ('ResizeObserver' in window) {
    new ResizeObserver(updateCopyrightPosition).observe(footer);
  }
})();

