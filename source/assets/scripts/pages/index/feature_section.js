const TOPNAV_HEIGHT = 95; // must match $topnav-sticky-height
require('vendor/jquery.sticky-kit');
var ScrollSlider = require('components/scroll_slider');

function checkUserType(e) {
  let userType = $('[name="user-type"]:checked').val();
  $('.features-section').removeClass('driver shipper').addClass(userType);
}

$('.features-section .sticky-slider').stick_in_parent({
  offset_top: TOPNAV_HEIGHT,
  spacer: false,
});

$('[name="user-type"]').on('change', checkUserType)
checkUserType()
