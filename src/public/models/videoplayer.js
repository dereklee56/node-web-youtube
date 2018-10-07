// Instantiate videoplayer object
const videoplayer = {};

// Return back to search results
videoplayer.return = () => {
  $(document).on('click', '.back-button', (e) => {
    e.preventDefault();
    const userQuery = $('.button-container').data('userquery');
    window.location.href = '/search/' + userQuery;
  })
}

// Instatiate all DOM event listeners
videoplayer.init = () => {
  $(document).ready(() => {
    videoplayer.return();
  })
}

videoplayer.init();
