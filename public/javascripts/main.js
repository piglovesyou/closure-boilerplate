
goog.provide('main');

goog.require('my.App');


/***/
main = function() {
  var app = new my.App();
  app.decorate(goog.dom.getElementByClass('app'));
};



goog.exportSymbol('main', main);
