let throttle = require('throttle-debounce/throttle');
let $body = $(document.body);

function toggleScrolledPastTop() {
  $body.toggleClass('scrolled-past-top', $body.scrollTop() > 0);
}

$(window).on("scroll", throttle(50, toggleScrolledPastTop));
toggleScrolledPastTop();
