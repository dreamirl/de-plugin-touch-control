"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

var _dreamengine = require("@dreamirl/dreamengine");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Stick extends _dreamengine.GameObject {
  constructor(params) {
    super(_objectSpread({}, params, {
      interactive: true // to enable the touch events

    }));
    this.bindEvents();
  }

  bindEvents() {
    this.on('pointerdown', this.touchStick);
    this.on('pointerup', this.releaseStick);
    this.on('pointermove', this.moveStick);
  } // To make difference with multitouch


  touchStick(event) {
    this.identifier = event.data.identifier;
    this.isTouched = true;
  }

  releaseStick() {
    this.isTouched = false;
    this.identifier = null;
    if (this.parent.onStickReleased) this.parent.onStickReleased({
      x: this.x,
      y: this.y
    });
    this.x = 0;
    this.y = 0;
  }

  moveStick(event) {
    // WARNING - on mobile, the target is not set correctly so we need to check the position of the pointer
    if (this.isTouched && event.data && event.data.global && this.identifier === event.data.identifier) {
      const {
        x: xGlobal,
        y: yGlobal
      } = event.data.global;
      const {
        x: xParent,
        y: yParent
      } = this.parent;
      this.x = xGlobal - xParent;
      this.y = yGlobal - yParent;
      this.parent.onStickMoved({
        x: this.x,
        y: this.y
      });
    }
  }

}

exports.default = Stick;