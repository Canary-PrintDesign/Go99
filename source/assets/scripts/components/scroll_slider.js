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
      slider.checkScroll(scrollTop);
    }
  }

  constructor(el) {
    this.$el = $(el);
    this.options = this.$el.data('scroll-slider') || {};
    if ( this.options.watchCSS ) {
      this.watchCSS();
    } else {
      this.activate();
    }
  }

  activate() {
    this.$el.data('slider-instance', this);
    this.name = this.options.name || `scroll-slider-${sliders.length}`;
    sliders.push(this);
    this.$el.addClass('scroll-slider');
    this.$nav = $(`[data-scroll-slider-nav-for="${this.name}"]`);
    this.$trigger = $(`[data-scroll-trigger-for="${this.name}"]`);
    this.$slides = this.$el.children();
    this.$slides.wrapAll('<div class="slides">');
    this.createNav();
    this.select(0);
  }

  // watches the :after property
  // activate if :after { content: 'scroll-slider' }
  watchCSS() {
    var afterContent = getComputedStyle(this.$el[0], ':after').content;
    if ( afterContent.indexOf('scroll-slider') != -1 ) {
      this.activate();
    }
  }

  createNav() {
    this.$nav.addClass('scroll-slider-nav');
    this.$slides.each( (i) => {
      $('<li><a href="#">').appendTo(this.$nav);
    });
    this.$nav.on('click', 'a', this.onClickNav.bind(this));
  }

  select(slideIndex) {
    if (slideIndex == this.slideIndex) return;
    this.slideIndex = slideIndex;
    this.$nav.find('li')
      .removeClass('active')
      .eq(slideIndex).addClass('active');
    this.$slides
      .removeClass('below active above')
      .each(function(i, el) {
        if ( i < slideIndex ) {
          $(el).addClass('below');
        } else if ( i == slideIndex ) {
          $(el).addClass('active');
        } else {
          $(el).addClass('above');
        }
      });
  }

  progress(scrollTop) {
    let $container = this.$trigger.parent();
    let track = $container.height() - this.$trigger.height();
    let distance = this.$trigger.offset().top - $container.offset().top;
    return Math.max(0, distance / track);
  }

  goto(index) {
    let $container = this.$trigger.parent();
    let track = $container.height() - this.$trigger.height();
    let step = track / this.$slides.length
    let scrollTop = $container.offset().top + (index + 0.5) * step;
    $('body').scrollTop(scrollTop);
    return scrollTop;
  }

  onClickNav(e) {
    e.preventDefault();
    let index = $(e.target).closest('li').index();
    this.disable();
    let scrollTop = this.goto(index);
    this.enable();
    this.checkScroll(scrollTop);
  }

  checkScroll(scrollTop) {
    if (this.disableChecks) return;
    let progress = this.progress(scrollTop);
    let slide = Math.floor(progress * this.$slides.length);
    slide = Math.min(slide, this.$slides.length - 1)
    this.select(slide);
  }

  disable() {
    this.disableChecks = true;
  }

  enable() {
    this.disableChecks = true;
  }
}

ScrollSlider.init();
$(window).on("scroll", throttle(50, ScrollSlider.checkScroll));

module.exports = ScrollSlider;
