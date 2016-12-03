const SCOLL_SPEED = 250;
const SCROLL_OFFSET = 65; // to avoid sticky header cover
let $body = $(document.body);

function smootheScrollTo(target) {
  $body.animate({
    scrollTop: $(target).offset().top - SCROLL_OFFSET
  }, SCOLL_SPEED);
}

$body.on('click', '.scroll-link', function() {
  let target = $(this).attr('href');
  smootheScrollTo(target);
});
