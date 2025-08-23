const gallery = document.querySelector('.gallery-anim');
const galleryMask = document.querySelector('.gallery-mask');
const overlay = document.querySelector('.gallery-overlay');

// Listen to scroll on the mask itself
galleryMask.addEventListener('scroll', () => {
  const scrollTop = galleryMask.scrollTop;
  const totalScroll = galleryMask.scrollHeight - galleryMask.clientHeight;
  
  // progress from 0 -> 1 as soon as you start scrolling
  let progress = totalScroll > 0 ? scrollTop / totalScroll : 0;
  progress = Math.min(Math.max(progress, 0), 1); // clamp 0-1

  // Apply zoom and darken immediately as scrolling starts
  const scale = 1 - progress * 0.2;       // 1 -> 0.9
  const brightness = 1 - progress * 11;  // 1 -> 0.5

  gallery.style.transform = `scale(${scale})`;
  gallery.style.filter = `brightness(${brightness})`;
  overlay.style.opacity = `${1 - progress * 0.7}`;
});