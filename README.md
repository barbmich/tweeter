# Tweeter Project

Tweeter is a simple, single-page Twitter clone. It displays fictituous tweets in reverse-chronological order (most recent at the top).
An initial database with 2 entries already exists, the rest can be posted by the user.
A counter for remaining characters is available.

This project has been completed for didactic purposes: each student forked and cloned the initial repository, then built upon it to practice their HTML, CSS, JS, jQuery and AJAX front-end skills, and their Node, Express and MongoDB back-end skills.

## Screenshots

The main - and only! - page. I hope you like wafers!
![Main-menu](https://github.com/barbmich/tweeter/blob/master/docs/main-menu.png)

New tweet button - it toggles the tweet form. A new AJAX POST request is made to the API with each tweet submission.
![new-tweet-button](https://github.com/barbmich/tweeter/blob/master/docs/new-tweet-button.png)

The list of tweets. When your many personalities had each a chance to express themselves, a button allows to go back to the top of the page.
![tweets-list](https://github.com/barbmich/tweeter/blob/master/docs/tweets-list.png)

2 different layouts (above and below 768px of width), with the tweets list that remains centered when past 1440px of width.
![responsive-design](https://github.com/barbmich/tweeter/blob/master/docs/responsive-design.png)

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above
- body-parser 1.15.2 or above
- chance 1.0.2 or above
- express 4.13.4 or above
- jquery 3.5.1 or above
- md5 2.1.0 or above
- moment 2.27.0 or above
