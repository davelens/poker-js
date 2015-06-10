/*!
 * jQuery Poker notification Plugin v1.0.0
 * https://github.com/davelens/jquery-poker
 *
 * Copyright 2015 Dave Lens
 * Released under the MIT license
 */
;(function($){
  var context = this;
  var methods = {};
  var defaults = {
    close_button: true,
    timeout: 5000
  };

  function Poke(message, options) {
    this._message = message;
    this._options = options;
  };

  Poke.prototype.html = function() {
    var box = $('<div class="poke" />');
    this._options.close_button && box.append(this.close_button());
    $('<p />').html(this._message).appendTo(box);
    return box;
  };

  Poke.prototype.close_button = function() {
    return $('<span>&times;</span>') ;
  };

  var Poker = window.Poker = { _container: null };

  Poker._poke_click_listener = function(e) {
    $(this).fadeOut({
      complete: function(){ this.remove(); },
      queue: false
    });
  };

  Poker._exists = function() {
    return $('#poker-container').length > 0;
  };

  Poker.container = function() {
    this._container = this._container || $('<div id="poker-container" />');
    !this._exists() && this._container.appendTo('body');
    return this._container;
  };

  Poker.poke = function(message, options) {
    var options = $.extend(defaults, options);
    var poke = new Poke(message, options);
    var pokebox = poke.html().hide().prependTo(this.container()).fadeIn()
    pokebox.on('click', this._poke_click_listener);
    pokebox.delay(options.timeout).fadeOut(function(){ this.remove(); });
  };
})(jQuery);
