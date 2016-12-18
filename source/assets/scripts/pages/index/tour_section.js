const MQ_SLIDES_3_BY_3 = 600; // must match $breakpoint-tour-3-slides
const MQ_SLIDES_4_BY_4 = 800; // must match $breakpoint-tour-4-slides
let Flickity = require('flickity');
require("flickity/dist/flickity.css");
var pageWidth = $(window).width();
var groupCells, pageDots, prevNextButtons;

if (pageWidth >= MQ_SLIDES_4_BY_4 ) {
  groupCells = 4;
  prevNextButtons = true;
} else if (pageWidth >= MQ_SLIDES_3_BY_3 ) {
  groupCells = 3;
  prevNextButtons = false;
} else {
  groupCells = 2;
  prevNextButtons = false;
}

var flkty = new Flickity( $('.features')[0], {
  groupCells: groupCells,
  prevNextButtons: prevNextButtons,
  wrapAround: true,
});
