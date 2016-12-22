require('components/background_fixed')

require('./index/scrolled_past_top')
require('./index/scroll_link')
require('./index/tour_section')
require('./index/feature_section')

// Sorry, Kevin.
var lastWidth = $(window).width();

$(window).resize(function(){
   if($(window).width()!=lastWidth){
      location.reload();
      lastWidth = $(window).width();
   }
})
