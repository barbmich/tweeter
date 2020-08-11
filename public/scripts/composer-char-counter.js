$(document).ready(function() {


  // 
  $('#tweet-text').on('input', function () {
    const output = $("#tweet-form").find('output');
    let counter = 140 - $(this).val().length;
    output.text(counter);

    if (counter < 0) {
      output.addClass('counter-flag')
    } else {
      output.removeClass('counter-flag');
    }

  });

});