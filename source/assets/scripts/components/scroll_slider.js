var throttle = require('throttle-debounce/throttle');
var sliders = [];

class ScrollSlider {
  static init() {
    $('[data-scroll-slider]').each(function(i, el) {
      new ScrollSlider(el);
    });
  }

  static checkScroll() {
    var scrollTop = $(window).scrollTop();
    for (var slider of sliders) {
      let progress = slider.progress(scrollTop);
      let slide = Math.floor(progress * slider.$slides.length);
      slide = Math.min(slide, slider.$slides.length - 1)
      slider.select(slide);
    }
  }

  constructor(el) {
    sliders.push(this);
    this.$el = $(el).addClass('scroll-slider');
    this.$el.data('slider-instance', this);
    this.name = this.$el.data('scroll-slider');
    this.$nav = $(`[data-scroll-slider-nav-for="${this.name}"]`);
    this.$trigger = $(`[data-scroll-trigger-for="${this.name}"]`);
    this.$slides = this.$el.children();
    this.$slides.wrapAll('<div class="slides">');
    this.createNav();
    this.select(0);
  }

  createNav() {
    this.$nav.addClass('scroll-slider-nav');
    this.$slides.each( (i) => {
      $('<li/>').appendTo(this.$nav);
    });
  }

  select(slideIndex) {
    if (slideIndex == this.slideIndex) return;
    this.slideIndex = slideIndex;
    this.$nav.find('li')
      .removeClass('active')
      .eq(slideIndex).addClass('active');
    this.$slides
      .removeClass('active')
      .eq(slideIndex).addClass('active');
  }

  progress(scrollTop) {
    let $container = this.$trigger.parent();
    let track = $container.height() - this.$trigger.height();
    let distance = this.$trigger.offset().top - $container.offset().top;
    return distance / track;
  }
}

ScrollSlider.init();
$(window).on("scroll", throttle(50, ScrollSlider.checkScroll));


module.exports = ScrollSlider;
