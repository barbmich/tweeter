$(document).ready(function() {
  $('#tweet-text').on('input', function () { console.log(140 - this.value.length)});
});