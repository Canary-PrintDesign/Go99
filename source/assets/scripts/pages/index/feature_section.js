const TOPNAV_HEIGHT = 95; // must match $topnav-height
require('vendor/jquery.sticky-kit');
var ScrollSlider = require('components/scroll_slider');

$('.features-section .sticky-slider').stick_in_parent({
  offset_top: TOPNAV_HEIGHT
});
