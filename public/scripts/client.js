/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function(string) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(string));
  return div.innerHTML;
}

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
        <span>${object.created_at}</span>
        <span>icons</span>
      </footer>
    </article>`
  return tweet;
}

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
};

$(document).ready(function() {

  const apiURL = '/tweets';

  const loadTweets = () => {
    $.ajax({method: 'GET', url: apiURL}).then((response) => {
      renderTweets(response);
    })
  };
  loadTweets();

  $('#tweet-form').on('submit', function(evt) {
    evt.preventDefault();

    let currentContent = $('#tweet-text').val();
    console.log(currentContent);

    if (currentContent.length === 0) {
      return alert("enter something first!");
    }
    if (currentContent > 140) {
      return alert("too many chars");
    }

    const data = $(this).serialize();
    console.log(data);

    $.ajax({method: 'POST', url: apiURL, data: data})

    $('#tweets-container').empty();
    loadTweets();

  })
})