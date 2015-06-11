/*!
 * poker.js notification plugin
 * https://github.com/davelens/poker-js
 *
 * Version 1.0.0
 * Copyright 2015 Dave Lens
 * Released under the MIT license
 */
;(function($){
  window.Poker = {
    _defaults: {
      close_button: true,
      container: {
        css: {
          maxWidth: '400px',
          padding: '0 12px',
          position: 'fixed',
          zIndex: '9999'
        }
      },
      timeout: 5000,
      x: 'right',
      y: 'top'
    }
  };

  Poker.Container = function(x, y) {
    this._x = x;
    this._y = y;
  };

  Poker.Container.prototype.to_html = function() {
    if(this.exists()) {
      var el = $('.poker-container.'+ this._x +'.'+ this._y);
    } else {
      var el = $('<div class="poker-container '+ this._x +' '+ this._y +'" />');
      el.appendTo('body');
    }

    return el.css(this._x, '0').css(this._y, '12px');
  };

  Poker.Container.prototype.exists = function() {
    return $('.poker-container.'+ this._x +'.'+ this._y).length > 0;
  };


  Poker.Notification = function(container, message, options) {
    this._message = message;
    this._options = options;
    this._container = container;
  };

  Poker.Notification.prototype.add_to = function(y) {
    var el = this.to_html();

    if(y == 'bottom') {
      el.appendTo(this._container.to_html()).fadeIn();
    } else {
      el.prependTo(this._container.to_html()).fadeIn();
    }

    this.bind_events(el);
  };

  Poker.Notification.prototype.bind_events = function(el) {
    var notification = this;
    el.on('click', this.click_listener);
    el.delay(this._options.timeout).fadeOut(function(){
      this.remove();
      if(notification._container.to_html().html() == '') {
        notification._container.to_html().remove();
      }
    });
  };

  Poker.Notification.prototype.click_listener = function(e) {
    $(this).fadeOut({
      complete: function(){ this.remove(); },
      queue: false
    });
  };

  Poker.Notification.prototype.to_html = function() {
    var box = $('<div class="poke" />');
    this._options.close_button && box.append(this.close_button());
    $('<p />').html(this._message).appendTo(box);
    return box.hide();
  };

  Poker.Notification.prototype.close_button = function() {
    return $('<span>&times;</span>');
  };


  Poker.prepare_container = function(options) {
    var container = new Poker.Container(options.x, options.y);
    container.to_html().css(options.container.css);
    return container;
  };

  Poker.poke = function(message, options) {
    var options = $.extend({}, this._defaults, options);
    var container = this.prepare_container(options);
    var notification = new Poker.Notification(container, message, options);
    notification.add_to(options.y);
  };
})(jQuery);
