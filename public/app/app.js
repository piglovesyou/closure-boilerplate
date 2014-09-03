
goog.provide('my.App');
goog.provide('my.Component');

goog.require('app.soy');
goog.require('goog.dom');
goog.require('goog.ui.Component');
goog.require('goog.style');
goog.require('goog.module');
goog.require('my.Yellable');



/**
 * @constructor
 * @extends goog.ui.Component
 */
my.Component = function () {
  goog.base(this);
};
goog.inherits(my.Component, goog.ui.Component);

/** @inheritDoc */
my.Component.prototype.enterDocument = function () {
  goog.base(this, 'enterDocument');
  goog.style.setStyle(this.getElement(), {
    'background': '#' +
      Math.round(Math.random() * 9).toString(16) + 'f' + 
      Math.round(Math.random() * 9).toString(16) + 'f' + 
      Math.round(Math.random() * 9).toString(16) + 'f'
  });
  // console.log(this);
};




/**
 * @constructor
 * @extends my.Component
 */
my.App = function() {
  goog.base(this);

  // this.header = new my.Header;
  // this.addChild(this.header);

  this.body = new my.Body;
  this.addChild(this.body);
};
goog.inherits(my.App, my.Component);

/** @inheritDoc */
my.App.prototype.decorateInternal = function(element) {
  goog.base(this, 'decorateInternal', element);

  // var headerEl = this.getElementByClass('header');
  // this.header.decorate(headerEl);

  var bodyEl = this.getElementByClass('body');
  this.body.decorate(bodyEl);
};

/** @inheritDoc */
my.App.prototype.enterDocument = function() {
  var that = this;
  goog.module.initLoader('http://localhost:9810/module/plovr-sample/', function (base, module) {
    return base + module;
  });
  setTimeout(goog.bind(function() {
    var i = 0;
    goog.module.require('header', 'header', goog.bind(function () {
      this.header = new my.Header;
      this.addChild(this.header);
      this.header.decorate(this.getElementByClass('header'));
    }, this));
  }, this), 1000);
};


// my.Header = function() { goog.base(this) };
// goog.inherits(my.Header, my.Component);
// 
// my.Header.prototype.decorateInternal = function (element) {
//   goog.base(this, 'decorateInternal', element);
// };



/**
 * @constructor
 * @extends my.Component
 */
my.Body = function() {
  goog.base(this) 

  this.list = new my.List;

  this.detail = new my.Detail;
};
goog.inherits(my.Body, my.Component);

/** @inheritDoc */
my.Body.prototype.decorateInternal = function (element) {
  goog.base(this, 'decorateInternal', element);
  this.list.decorate(this.getElementByClass('list'));
  this.detail.decorate(this.getElementByClass('detail'));
};



/**
 * @constructor
 * @extends my.Component
 */
my.List = function() {
  goog.base(this);
};
goog.inherits(my.List, my.Component);

/** @inheritDoc */
my.List.prototype.decorateInternal = function (element) {
  goog.base(this, 'decorateInternal', element);

  goog.array.forEach(goog.dom.getElementsByTagNameAndClass(null, 'row', element), function (rowEl) {
    var row = new my.Row;
    this.addChild(row);
    row.decorate(rowEl);
  }, this);
};



/**
 * @constructor
 * @extends my.Component
 */
my.Row = function() {
  goog.base(this);
};
goog.inherits(my.Row, my.Component);



/**
 * @constructor
 * @extends my.Component
 */
my.Detail = function() {
  goog.base(this);
};
goog.inherits(my.Detail, my.Component);

/** @inheritDoc */
my.Detail.prototype.enterDocument = function () {
  goog.base(this, 'enterDocument');

  var p1 = new my.ui.Yeah;
  p1.render(this.getElement());

  var p2 = new my.ui.Ohh;
  p2.render(this.getElement());

  this.printYell(p1);
  this.printYell(p2);
};

/**
 * @param {my.Yellable} comp
 */
my.Detail.prototype.printYell = function (comp) {
  var dh = this.getDomHelper();
  dh.append(/** @type {!Node} */(this.getElement()),
      dh.createDom('p', null, comp.yeah() + '!!!!!!!!!!'));
};



// @interface try out

my.ui = {};

/**
 * @constructor
 * @extends my.Component
 * @implements my.Yellable
 */
my.ui.Yeah = function () {
  goog.base(this);

  this.data = {};
};
goog.inherits(my.ui.Yeah, my.Component);

my.ui.Yeah.prototype.yeah = function () {
  return 'yeah';
};

/**
 * @constructor
 * @extends my.Component
 * @implements my.Yellable
 */
my.ui.Ohh = function () {
  goog.base(this);

  this.data = {};
};
goog.inherits(my.ui.Ohh, my.Component);

my.ui.Ohh.prototype.yeah = function () {
  return 'ohhh';
};
