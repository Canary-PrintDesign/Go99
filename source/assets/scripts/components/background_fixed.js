console.log('background_fixed')

$(window).scroll(function() {
  var scrolledY = $(window).scrollTop();
});

var throttle = require('throttle-debounce/throttle');
var instances = [];
var bgHolder = $('<div>')
  .css({
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
    backgroundSize: 'cover'
  })
  .appendTo('body');
var currentBg;

class BackgroundFixed {
  static init() {
    $('[data-background-fixed]').each(function(i, el) {
      new BackgroundFixed(el);
    });
    BackgroundFixed.checkScroll();
  }

  static checkScroll() {
    if ( instances.length === 0 ) return;
    var newBg = BackgroundFixed.activeBG();
    if ( newBg === currentBg ) return;
    currentBg = newBg.select();
  }

  static activeBG() {
    var scrollTop = $(window).scrollTop();
    return instances.reduce(function(activeBG, instance) {
      if ( scrollTop > activeBG.bottom && scrollTop < instance.top ) {
        return instance;
      } else {
        return activeBG;
      }
    }, instances[0]);
  }

  constructor(el) {
    this.$el = $(el);
    this.top = this.$el.offset().top;
    this.bottom = this.top + this.$el.outerHeight();
    this.background = this.$el.css('background');
    this.$el.css('background', 'none');
    instances.push(this);
  }

  select() {
    console.log({select: this})
    bgHolder.css('background', this.background);
    return this;
  }
}

BackgroundFixed.init();
$(window).on("scroll", BackgroundFixed.checkScroll);

module.exports = BackgroundFixed;
