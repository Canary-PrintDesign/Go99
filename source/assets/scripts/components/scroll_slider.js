$('.scroll-slider .slide').first().addClass('active');

class ScrollSlider {
  static init() {
    $('[data-scroll-slider]').each(function(i, el) {
      new ScrollSlider(el);
    });
  }

  constructor(el) {
    this.$el = $(el).addClass('scroll-slider');
    this.$el.data('slider-instance', this);
    this.name = this.$el.data('scroll-slider');
    this.$slides = this.$el.children();
    this.$slides.wrapAll('<div class="slides">');
    this.createNav();
    this.select(0);
  }

  createNav() {
    this.$nav = $(`[data-scroll-slider-nav-for="${this.name}"]`)
      .addClass('scroll-slider-nav');
    this.$slides.each( (i) => {
      $('<li/>').appendTo(this.$nav);
    });
  }

  select(slideIndex) {
    this.$nav.find('li')
      .removeClass('active')
      .eq(slideIndex).addClass('active');
    this.$slides
      .removeClass('active')
      .eq(slideIndex).addClass('active');
  }
}

ScrollSlider.init();

module.exports = ScrollSlider;
