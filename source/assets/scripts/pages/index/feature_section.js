require('vendor/jquery.sticky-kit');
var ScrollSlider = require('components/scroll_slider');
var $toggleSelect = $('.features-section .toggle-select');

function checkUserType(e) {
  let userType = $('[name="user-type"]:checked').val();
  $('.features-section').removeClass('driver shipper').addClass(userType);
  $toggleSelect.toggleClass('right', userType == 'driver');
}

function toggleSelect() {
  $('[name="user-type"]:not(:checked)').click();
}

$('.features-section .sticky-slider').stick_in_parent({
  spacer: false,
});

$('[name="user-type"]').on('change', checkUserType)
checkUserType()

$toggleSelect.on('click', toggleSelect);
