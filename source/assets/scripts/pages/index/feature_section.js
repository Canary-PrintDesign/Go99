require('vendor/jquery.sticky-kit');
let Flickity = require('flickity');
require("flickity/dist/flickity.css");

var ScrollSlider = require('components/scroll_slider');
var $toggleSelect = $('.features-section .toggle-select');
window.ScrollSlider = ScrollSlider
function checkUserType(e) {
  let userType = $('[name="user-type"]:checked').val();
  $('.features-section').removeClass('driver shipper').addClass(userType);
  $toggleSelect.toggleClass('right', userType == 'driver');
}

function toggleSelect() {
  $('[name="user-type"]:not(:checked)').click();
}

$('[name="user-type"]').on('change', checkUserType)
checkUserType()

$toggleSelect.on('click', toggleSelect);

$('.features-section .sticky-slider').stick_in_parent({
  spacer: false,
});
