/*!
 * poker.js notification plugin
 * https://github.com/davelens/poker-js
 *
 * Version 1.0.0
 * Copyright 2015 Dave Lens
 * Released under the MIT license
 */
;(function($){
  var defaults = {
    close_button: true,
    container: {
      css: {
        maxWidth: '400px',
        padding: '0 12px',
        position: 'fixed',
        right: '0',
        top: '12px',
        zIndex: '9999'
      }
    },
    timeout: 5000
  };

  window.Poker = { _container: null };

  Poker._poke_click_listener = function(e) {
    $(this).fadeOut({
      complete: function(){ this.remove(); },
      queue: false
    });
  };

  Poker._exists = function() {
    return $('#poker-container').length > 0;
  };

  Poker.Notification = function(message, options) {
    this._message = message;
    this._options = options;
  };

  Poker.Notification.prototype.html = function() {
    var box = $('<div class="poke" />');
    this._options.close_button && box.append(this.close_button());
    $('<p />').html(this._message).appendTo(box);
    return box;
  };

  Poker.Notification.prototype.close_button = function() {
    return $('<span>&times;</span>') ;
  };

  Poker.container = function() {
    this._container = this._container || $('<div id="poker-container" />');
    !this._exists() && this._container.appendTo('body');
    return this._container;
  };

  Poker.poke = function(message, options) {
    var options = $.extend({}, defaults, options);
    var poke = new Poker.Notification(message, options);
    var container = this.container().css(options.container.css);
    var notification = poke.html().hide().prependTo(container).fadeIn();
    notification
      .on('click', this._poke_click_listener)
      .delay(options.timeout).fadeOut(function(){ this.remove(); });
  };
})(jQuery);
