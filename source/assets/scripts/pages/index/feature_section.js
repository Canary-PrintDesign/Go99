let Flickity = require('flickity');
require("flickity/dist/flickity.css");

let $slider = $('.features-slider');
let flkty = new Flickity( $slider[0], {
  wrapAround: true,
  initialIndex: 3
});
let updateSelectedClass = function() {
  let lastClass = $slider.data('lastClass');
  $slider.removeClass(`selected-${lastClass}`)
    .addClass(`selected-${flkty.selectedIndex}`)
    .data('lastClass', flkty.selectedIndex);
};
let homogeonizeTextContainers = function() {
  let textContainers = $slider.find('.text-container');
  let maxHeight = textContainers.map(function() {
      return $(this).height();
    }).toArray().sort().reverse()[0];
  textContainers.each(function() {
    $(this).height(maxHeight);
  });
};
flkty.on('select', updateSelectedClass);
updateSelectedClass();
homogeonizeTextContainers();
