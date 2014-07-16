
goog.provide('my.Header');

goog.require('my.Component');



/**
 * @constructor
 * @extends my.Component
 */
my.Header = function() { goog.base(this) };
goog.inherits(my.Header, my.Component);

/** @inheritDoc */
my.Header.prototype.decorateInternal = function (element) {
  goog.base(this, 'decorateInternal', element);
};

my.Header.prototype.enterDocument = function () {
  goog.base(this, 'enterDocument');

  this.getElement().innerHTML += ' ...header module loaded.'
};
