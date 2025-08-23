document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('.nav-link[data-song]');
  const lyricBlocks = document.querySelectorAll('.lyrics-container');

  function typeWriter(preElement, speed) {
    const text = preElement.textContent.trim();
    preElement.textContent = '';
    let i = 0;
    function write() {
      if (i <= text.length) {
        preElement.textContent = text.substring(0, i);
        i++;
        setTimeout(write, speed);
      }
    }
    write();
  }

  function showSong(song) {
    lyricBlocks.forEach(block => {
      block.classList.toggle('active', block.dataset.song === song);
      const pre = block.querySelector('pre');
      if (block.classList.contains('active')) typeWriter(pre, 10);
    });
    links.forEach(link => link.classList.toggle('active', link.dataset.song === song));
  }

  links.forEach(link => link.addEventListener('click', e => {
    e.preventDefault();
    showSong(link.dataset.song);
  }));

  if (links.length) showSong(links[0].dataset.song);
});