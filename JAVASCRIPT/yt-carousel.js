//DONE///////////// THUMBNAIL FOR YOUTUBE CAROUSEL ///////////////
// Update active thumbnail styling on slide change
const carousel = document.querySelector('#youtubeCarousel');
  const thumbs = document.querySelectorAll('.thumb-row img');
  // Update thumbnail active state and pause all videos on slide
  carousel.addEventListener('slide.bs.carousel', function (event) {
    thumbs.forEach(img => img.classList.remove('active'));
    thumbs[event.to].classList.add('active');

    // Pause videos by resetting src on all non-active iframes
    const iframes = carousel.querySelectorAll('iframe');
    iframes.forEach((iframe, index) => {
      if (index !== event.to) {
        const src = iframe.src;
        iframe.src = src; // reload to stop playback
      }
    });
});