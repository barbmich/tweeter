/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // Test / driver code (temporary). Eventually will get this from the server.

const data = require("..//../server/data-files/initial-tweets.json");

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

const createTweetElement = function (object) {
  let $tweet =
    `<article class="tweet">
      <header>
        <span>${object.user.avatars}</span>
        <span class="name">${object.user.name}</span>
        <span class="handle">${object.user.handle}</span>
      </header>
      <p>${object.content.text}</p>
      <footer>
        <span>${object.created_at}</span>
        <span>icons</span>
      </footer>
    </article>`
  return $tweet;
}

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
}

renderTweets(data);