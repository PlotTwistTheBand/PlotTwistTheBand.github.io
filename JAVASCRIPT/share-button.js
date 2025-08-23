//DONE////////////////// GENERAL SHARE BUTTON ///////////////////
function shareArticle() {
  if (navigator.share) {
    navigator.share({
      title: 'Article title',
      text: 'Check this out!',
      url: 'https://ladygaga.com'
    })
    .catch(err => console.log('Share failed:', err));
  } else {
    alert('Sharing not supported on this browser');
  }
}













