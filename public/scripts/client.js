/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (string) {
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
        <span>${moment(object.created_at).fromNow()}</span>
        <span>icons</span>
      </footer>
    </article>`
  return tweet;
}

const renderTweets = function (tweets) {
  const sortedTweets = tweets.sort((a, b) => (b.created_at - a.created_at));
  for (const tweet of sortedTweets) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
};

const createAlertBox = function (issue) {

  let alert =
    `<article id="alert">
      <span>${issue}</span>
    </article>`;

  return $('.new-tweet').prepend(alert);

}

$(document).ready(function () {

  const apiURL = '/tweets';

  const loadTweets = () => {
    $.ajax({ method: 'GET', url: apiURL }).then((response) => {
      renderTweets(response);
    })
  };
  loadTweets();

  $('#tweet-form').on('submit', function (evt) {
    evt.preventDefault();
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

    const data = $(this).serialize();

    $.ajax({ method: 'POST', url: apiURL, data: data })
      .then(() => $('#tweets-container').empty())
      .then(loadTweets);

  })
})