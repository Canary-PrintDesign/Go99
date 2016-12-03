const SCOLL_SPEED = 250;
const SCROLL_OFFSET = 65; // to avoid sticky header cover
let throttle = require('throttle-debounce/throttle');
let $body = $(document.body);

function smootheScrollTo(target) {
  $body.animate({
    scrollTop: $(target).offset().top - SCROLL_OFFSET
  }, SCOLL_SPEED);
}

function toggleScrolledPastTop() {
  $body.toggleClass('scrolled-past-top', $body.scrollTop() > 0);
}

$body.on('click', '.scroll-link', function() {
  let target = $(this).attr('href');
  smootheScrollTo(target);
});

$(window).on("scroll", throttle(50, toggleScrolledPastTop));
