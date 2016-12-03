const MQ_SLIDES_3_BY_3 = 600; // must match $breakpoint-tour-3-slides
let Flickity = require('flickity');
require("flickity/dist/flickity.css");
var pageWidth = $(window).width();
var groupCells, pageDots, prevNextButtons;

if (pageWidth >= MQ_SLIDES_3_BY_3 ) {
  groupCells = 3;
} else {
  groupCells = 2;
}

var flkty = new Flickity( $('.features')[0], {
  groupCells: groupCells,
  pageDots: true,
  prevNextButtons: false,
  wrapAround: true,
});
