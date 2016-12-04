// Sticky provides a class on the <body> that we can hook into with CSS.
//
// Initialize by adding sticky="{name}" to the element that you"d like to add
// a hook for. You may optionally use sticky-offset="{int}" to define a
// hardcoded offset position (the point at which the class will be added to the
// body).
var throttle = require('throttle-debounce/throttle');
let scrollTargets = [];

class Scrolled {
  constructor(trigger, name, el) {
    this.trigger = trigger;
    this.name = name;
    this.el = $(el);
    this.bodyClass = `scrolled-${trigger}-${name}`;

    scrollTargets.push(this)
  }

  static checkScroll(e) {
    let scrolltop = $(window).scrollTop();
    scrollTargets.map(function(sticky) {
      sticky.checkScroll(scrolltop);
    });
  }

  offset() {
    switch (this.trigger) {
      // element has entered the screen
      case "into":
        return this.el.offset().top - $(window).height();
      // element is fully out of screen
      case "past":
        return this.el.offset().top + this.el.outerHeight() + parseInt(this.el.css('margin-top'));
      // top of element is at middle of viewport
      case "to":
        return this.el.offset().top - ($(window).height() / 2);
      // element is centered in viewport
      case "at":
        return this.el.offset().top - ($(window).height() - this.el.outerHeight()) / 2;
    }
  }

  checkScroll(scrollPosition) {
    var isActive = scrollPosition > this.offset();
    if(isActive === this.isActive) {
      return;
    }
    this.isActive = isActive;
    $(document.body).toggleClass(this.bodyClass, isActive);
    $(window).trigger(`scrolled.${this.trigger}`, [isActive, this]);
  }
}

$(function() {
  for (var direction of ['into', 'past', 'to', 'at']) {
    $(`[data-scrolled-${direction}]`).each(function(i, el) {
      new Scrolled(direction, $(el).data(`scrolled-${direction}`), el);
    });
  }

  $(window).on("scroll", throttle(50, Scrolled.checkScroll));
  $(window).on("load", Scrolled.checkScroll);
  Scrolled.checkScroll();
});
