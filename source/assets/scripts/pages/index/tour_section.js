let Flickity = require('flickity');
require("flickity/dist/flickity.css");

var flkty = new Flickity( $('.features')[0], {
  groupCells: 2,
  pageDots: true,
  prevNextButtons: false,
  wrapAround: true,
});
