/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//  escapes text to avoid injection of code
const escape = function (string) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(string));
  return div.innerHTML;
}

// outputs HTML based on object values
const createTweetElement = function (object) {

  const safeHTML = escape(object.content.text);

  let tweet =
    `<article class="tweet">
      <header>
        <span><img src="${object.user.avatars}"/></span>
        <span class="name">${object.user.name}</span>
        <span class="handle">${object.user.handle}</span>
      </header>
      <p>${safeHTML}</p>
      <footer>
        <span>${moment(object.created_at).fromNow()}</span>
        <span>icons</span>
      </footer>
    </article>`
  return tweet;
}

// array of tweets is first sorted by date, then function appends each
// iteration to #tweet-container using the previous function declaration.
const renderTweets = function (tweets) {
  const sortedTweets = tweets.sort((a, b) => (b.created_at - a.created_at));
  for (const tweet of sortedTweets) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
};

// loads the following events once document is fully loaded.
$(document).ready(function () {

  const apiURL = '/tweets';

  // when called, fires an AJAX GET request that receives a JSON. this
  // is parsed and used by renderTweets to outputs the tweets.
  const loadTweets = () => {
    $.ajax({ method: 'GET', url: apiURL }).then((response) => {
      renderTweets(response);
    })
  };
  // called once as the webpage is loaded to retrieve the initial
  // database content
  loadTweets();

  // handles the submit event on the new-tweet form.
  $('#tweet-form').on('submit', function (evt) {    
    evt.preventDefault();
    
    // #alert is set to "display: none"; called by default
    // on each submission, to hide possible warning
    // displayed during previous event handling. 
    $('#alert').slideUp("slow");

    let currentContent = $('#tweet-text').val();

    if (currentContent.length === 0) {
      $('#alert-text').text("⚠️ You should enter some text! ⚠️")
      return $('#alert').slideDown("slow");
    }

    if (currentContent.length > 140) {
      $('#alert-text').text("⚠️ That's waaaay to many characters! ⚠️")
      return $('#alert').slideDown("slow");
    }

    // creates a string in standard URL-encoded notation
    // so that the API can handle it
    const data = $(this).serialize();

    // 1. POSTs form content to API,
    // 2. removes all elements from #tweets-container
    // 3. makes a new GET request to API for updated db
    $.ajax({ method: 'POST', url: apiURL, data: data })
      .then(() => $('#tweets-container').empty())
      .then(loadTweets);

  })
})