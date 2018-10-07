// Instantiate search object
const search = {};

// Youtube video search request method
search.searchRequest = () => {

  // Render search request on submit/click
  const renderSearch = () => {
    let searchInput = $('.search-input').val();
    console.log('You just searched for: ' + searchInput);
    window.location.href = '/search/' + searchInput;
  }

  // Event handler to render search results on click
  $('.search-button').click(() => {
    renderSearch();
  })

  // Event handlers to render search results on form submit
  $('.search-form').submit((e) => {
    e.preventDefault();
    renderSearch();
  })

  $('.home-search-form').submit((e) => {
    e.preventDefault();
    renderSearch();
  })
}

// Play Youtube video from list of results
search.playVideo = () => {
    $(document).on('click', '.thumbnail-block', (e) => {
      const id = $(e.currentTarget).data('videokey');
      const userQuery = $('.search-results-container').data('userquery');
      window.location.href = '/videoplayer/' + userQuery + '/' + id;
  });
}

// Instatiate all DOM event listeners
search.init = () => {
  $(document).ready(() => {
    search.searchRequest();
    search.playVideo();
  })
}

search.init();
