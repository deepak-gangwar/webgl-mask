/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ansi-html-community/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ansi-html-community/index.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),

/***/ "./app/components/mask.js":
/*!********************************!*\
  !*** ./app/components/mask.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Mask)
/* harmony export */ });
/* harmony import */ var ogl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ogl */ "./node_modules/ogl/src/math/Vec2.js");
/* harmony import */ var ogl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ogl */ "./node_modules/ogl/src/core/Renderer.js");
/* harmony import */ var ogl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ogl */ "./node_modules/ogl/src/core/Transform.js");
/* harmony import */ var ogl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ogl */ "./node_modules/ogl/src/core/Camera.js");
/* harmony import */ var ogl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ogl */ "./node_modules/ogl/src/extras/Plane.js");
/* harmony import */ var ogl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ogl */ "./node_modules/ogl/src/core/Texture.js");
/* harmony import */ var ogl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ogl */ "./node_modules/ogl/src/core/Program.js");
/* harmony import */ var ogl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ogl */ "./node_modules/ogl/src/core/Mesh.js");
/* harmony import */ var ogl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ogl */ "./node_modules/ogl/src/extras/Raycast.js");
/* harmony import */ var _utils_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math */ "./app/utils/math.js");
/* harmony import */ var _shaders_vertex_glsl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shaders/vertex.glsl */ "./app/shaders/vertex.glsl");
/* harmony import */ var _shaders_fragment_glsl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shaders/fragment.glsl */ "./app/shaders/fragment.glsl");




const vertex = _shaders_vertex_glsl__WEBPACK_IMPORTED_MODULE_1__["default"];
const fragment = _shaders_fragment_glsl__WEBPACK_IMPORTED_MODULE_2__["default"];
class Mask {
  constructor() {
    this.bind();
    this.el = document.querySelector('.webgl__wrapper');
    this.bounds = this.el.getBoundingClientRect();
    this.planeBCR = {
      width: 1,
      height: 1,
      x: 0,
      y: 0
    };
    this.isLoaded = false;
    this.maskPosition = new ogl__WEBPACK_IMPORTED_MODULE_3__.Vec2();
    this.mouse = new ogl__WEBPACK_IMPORTED_MODULE_3__.Vec2(-0.5, -0.5);
    this.now = 0;
    this.settings = {
      speed: 0
    };
    this.wrapper = null;
    this.media = this.el.querySelector('[data-gl-image="media"]');
    this.rAF = undefined;
    this.init();
  }

  bind() {
    ["mousemove", "resize", "update"].forEach(fn => this[fn] = this[fn].bind(this));
  }

  initRenderer() {
    const canvas = document.querySelector('.webgl'); // This for transparent rendrer

    this.renderer = new ogl__WEBPACK_IMPORTED_MODULE_4__.Renderer({
      canvas: canvas,
      dpr: 1,
      antialias: !0,
      premultiplyAlpha: !1,
      alpha: !0
    });
    this.renderer.setSize(this.bounds.width, this.bounds.height);
    this.gl = this.renderer.gl; // for clear color, divide rgb value by 255

    this.gl.clearColor(247 / 255, 245 / 255, 248 / 255, 1); // this.gl.clearColor(1, 1, 1, 1)
  }

  initScene() {
    this.scene = new ogl__WEBPACK_IMPORTED_MODULE_5__.Transform();
  }

  initCamera() {
    this.fov = 45;
    this.camera = new ogl__WEBPACK_IMPORTED_MODULE_6__.Camera(this.gl, {
      fov: this.fov
    });
    this.camera.perspective({
      // aspect: this.gl.canvas.width / this.gl.canvas.height
      aspect: window.innerWidth / window.innerHeight
    });
    this.camera.position.set(0, 0, 1);
  }

  initShape() {
    this.geometry = new ogl__WEBPACK_IMPORTED_MODULE_7__.Plane(this.gl, {
      width: 1,
      height: 1,
      widthSegments: 10,
      heightSegments: 10
    }); // const scaling = new Vec3(10, (9 / 16) * 10, 1)

    this.texture = new ogl__WEBPACK_IMPORTED_MODULE_8__.Texture(this.gl, {
      minFilter: this.gl.LINEAR,
      generateMipmaps: false,
      width: 1920,
      height: 1080
    }); // update image value with source once loaded

    const img = new Image();
    img.src = "reel.mp4";

    img.onload = () => {
      this.texture.image = img;

      if (this.media instanceof HTMLVideoElement) {
        this.media.load();
        this.media.play();
      }
    }; // this.texture = TextureLoader.load(this.gl, { src: "1.jpg" })


    this.program = new ogl__WEBPACK_IMPORTED_MODULE_9__.Program(this.gl, {
      vertex,
      fragment,
      uniforms: {
        uMaskPosition: {
          value: new ogl__WEBPACK_IMPORTED_MODULE_3__.Vec2(1, 0)
        },
        uHit: {
          value: 0
        },
        uTexture: {
          value: this.texture
        }
      }
    });
    this.mesh = new ogl__WEBPACK_IMPORTED_MODULE_10__.Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.updateSize();
    this.isLoaded = true;
    this.mesh.setParent(this.scene); // Raycaster

    const updateHitUniform = ({
      mesh
    }) => {
      this.program.uniforms.uHit.value = mesh.isHit ? 1 : 0;
    };

    this.mesh.onBeforeRender(updateHitUniform);
    this.raycast = new ogl__WEBPACK_IMPORTED_MODULE_11__.Raycast(this.gl);
  }

  calculateUnitSize(z) {
    const fovInRadian = this.fov * Math.PI / 180; // basic trigonometry
    // this gives the width of plane that would cover the whole screen based on z position

    const i = 2 * Math.tan(fovInRadian / 2) * z;
    return {
      width: i * this.camera.aspect,
      height: i
    };
  }

  updateSize() {
    this.gap = 0;
    this.camUnit = this.calculateUnitSize(this.camera.position.z);
    this.planeBCR.width = this.camUnit.width - this.camUnit.width * this.gap / 100;
    this.planeBCR.height = this.planeBCR.width / this.camera.aspect;
    this.geometry = new ogl__WEBPACK_IMPORTED_MODULE_7__.Plane(this.gl, {
      width: this.planeBCR.width,
      height: this.planeBCR.height,
      widthSegments: 100,
      heightSegments: 100
    });
    this.mesh.geometry = this.geometry;
    this.gl.canvas.style.width = `${this.bounds.width}px`;
    this.gl.canvas.style.height = `${this.bounds.height}px`;
  }

  mousemove(e) {
    this.mouse.set(2.0 * (e.x / this.renderer.width) - 1.0, 2.0 * (1.0 - e.y / this.renderer.height) - 1.0);
    this.raycast.castMouse(this.camera, this.mouse);
    const hits = this.raycast.intersectMeshes(this.mesh, {
      includeUV: true
    });

    if (hits.length) {
      this.maskPosition.x = hits[0].hit.uv.x;
      this.maskPosition.y = hits[0].hit.uv.y;
    }
  }

  update(t) {
    requestAnimationFrame(this.update);
    this.program.uniforms.uMaskPosition.value.x = (0,_utils_math__WEBPACK_IMPORTED_MODULE_0__.lerp)(this.program.uniforms.uMaskPosition.value.x, this.maskPosition.x, 0.085);
    this.program.uniforms.uMaskPosition.value.y = (0,_utils_math__WEBPACK_IMPORTED_MODULE_0__.lerp)(this.program.uniforms.uMaskPosition.value.y, this.maskPosition.y, 0.085);

    if (this.media instanceof HTMLVideoElement) {
      if (this.media.readyState >= this.media.HAVE_ENOUGH_DATA) {
        if (!this.texture.image) {
          this.texture.image = this.media;
        }

        this.texture.needsUpdate = true;
      }
    } else if (this.media instanceof HTMLImageElement) {
      if (!this.texture.image) {
        this.texture.image = this.media;
        this.texture.needsUpdate = true;
      }
    }

    this.renderer.render({
      scene: this.scene,
      camera: this.camera
    });
    this.now = t;
  }

  resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height
    });
  }

  requestAnimationFrame() {
    this.rAF = requestAnimationFrame(this.update);
  }

  cancelAnimationFrame() {
    cancelAnimationFrame(this.rAF);
  }

  addEventlisteners() {
    this.update();
    window.addEventListener('mousemove', this.mousemove, false);
    window.addEventListener('resize', this.resize, false);
  }

  removeEventlisteners() {
    window.removeEventListener('mousemove', this.mousemove, false);
    window.removeEventListener('resize', this.resize, false);
  }

  destroy() {
    this.removeEventListeners();
  }

  init() {
    this.initRenderer();
    this.initScene();
    this.initCamera();
    this.initShape();
    this.addEventlisteners();
    this.resize();
  }

}

/***/ }),

/***/ "./app/utils/math.js":
/*!***************************!*\
  !*** ./app/utils/math.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clamp": () => (/* binding */ clamp),
/* harmony export */   "easeInOut": () => (/* binding */ easeInOut),
/* harmony export */   "interpolate": () => (/* binding */ interpolate),
/* harmony export */   "lerp": () => (/* binding */ lerp),
/* harmony export */   "random": () => (/* binding */ random)
/* harmony export */ });
function lerp(start, end, amt) {
  return start + (end - start) * amt; // return start * (1 - amt) + end * amt
}

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}
function interpolate(start, end, value) {
  return start * (1.0 - value) + end * value;
}
function clamp(min, max, number) {
  return Math.max(min, Math.min(number, max));
}
function random(min, max) {
  return Math.random() * (max - min) + min;
}

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/html-entities/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/html-entities/lib/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var named_references_1 = __webpack_require__(/*! ./named-references */ "./node_modules/html-entities/lib/named-references.js");
var numeric_unicode_map_1 = __webpack_require__(/*! ./numeric-unicode-map */ "./node_modules/html-entities/lib/numeric-unicode-map.js");
var surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");
var allNamedReferences = __assign(__assign({}, named_references_1.namedReferences), { all: named_references_1.namedReferences.html5 });
var encodeRegExps = {
    specialChars: /[<>'"&]/g,
    nonAscii: /(?:[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
    nonAsciiPrintable: /(?:[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
    extensive: /(?:[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g
};
var defaultEncodeOptions = {
    mode: 'specialChars',
    level: 'all',
    numeric: 'decimal'
};
/** Encodes all the necessary (specified by `level`) characters in the text */
function encode(text, _a) {
    var _b = _a === void 0 ? defaultEncodeOptions : _a, _c = _b.mode, mode = _c === void 0 ? 'specialChars' : _c, _d = _b.numeric, numeric = _d === void 0 ? 'decimal' : _d, _e = _b.level, level = _e === void 0 ? 'all' : _e;
    if (!text) {
        return '';
    }
    var encodeRegExp = encodeRegExps[mode];
    var references = allNamedReferences[level].characters;
    var isHex = numeric === 'hexadecimal';
    encodeRegExp.lastIndex = 0;
    var _b = encodeRegExp.exec(text);
    var _c;
    if (_b) {
        _c = '';
        var _d = 0;
        do {
            if (_d !== _b.index) {
                _c += text.substring(_d, _b.index);
            }
            var _e = _b[0];
            var result_1 = references[_e];
            if (!result_1) {
                var code_1 = _e.length > 1 ? surrogate_pairs_1.getCodePoint(_e, 0) : _e.charCodeAt(0);
                result_1 = (isHex ? '&#x' + code_1.toString(16) : '&#' + code_1) + ';';
            }
            _c += result_1;
            _d = _b.index + _e.length;
        } while ((_b = encodeRegExp.exec(text)));
        if (_d !== text.length) {
            _c += text.substring(_d);
        }
    }
    else {
        _c =
            text;
    }
    return _c;
}
exports.encode = encode;
var defaultDecodeOptions = {
    scope: 'body',
    level: 'all'
};
var strict = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;
var attribute = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;
var baseDecodeRegExps = {
    xml: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.xml
    },
    html4: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html4
    },
    html5: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html5
    }
};
var decodeRegExps = __assign(__assign({}, baseDecodeRegExps), { all: baseDecodeRegExps.html5 });
var fromCharCode = String.fromCharCode;
var outOfBoundsChar = fromCharCode(65533);
var defaultDecodeEntityOptions = {
    level: 'all'
};
/** Decodes a single entity */
function decodeEntity(entity, _a) {
    var _b = (_a === void 0 ? defaultDecodeEntityOptions : _a).level, level = _b === void 0 ? 'all' : _b;
    if (!entity) {
        return '';
    }
    var _b = entity;
    var decodeEntityLastChar_1 = entity[entity.length - 1];
    if (false) {}
    else if (false) {}
    else {
        var decodeResultByReference_1 = allNamedReferences[level].entities[entity];
        if (decodeResultByReference_1) {
            _b = decodeResultByReference_1;
        }
        else if (entity[0] === '&' && entity[1] === '#') {
            var decodeSecondChar_1 = entity[2];
            var decodeCode_1 = decodeSecondChar_1 == 'x' || decodeSecondChar_1 == 'X'
                ? parseInt(entity.substr(3), 16)
                : parseInt(entity.substr(2));
            _b =
                decodeCode_1 >= 0x10ffff
                    ? outOfBoundsChar
                    : decodeCode_1 > 65535
                        ? surrogate_pairs_1.fromCodePoint(decodeCode_1)
                        : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_1] || decodeCode_1);
        }
    }
    return _b;
}
exports.decodeEntity = decodeEntity;
/** Decodes all entities in the text */
function decode(text, _a) {
    var decodeSecondChar_1 = _a === void 0 ? defaultDecodeOptions : _a, decodeCode_1 = decodeSecondChar_1.level, level = decodeCode_1 === void 0 ? 'all' : decodeCode_1, _b = decodeSecondChar_1.scope, scope = _b === void 0 ? level === 'xml' ? 'strict' : 'body' : _b;
    if (!text) {
        return '';
    }
    var decodeRegExp = decodeRegExps[level][scope];
    var references = allNamedReferences[level].entities;
    var isAttribute = scope === 'attribute';
    var isStrict = scope === 'strict';
    decodeRegExp.lastIndex = 0;
    var replaceMatch_1 = decodeRegExp.exec(text);
    var replaceResult_1;
    if (replaceMatch_1) {
        replaceResult_1 = '';
        var replaceLastIndex_1 = 0;
        do {
            if (replaceLastIndex_1 !== replaceMatch_1.index) {
                replaceResult_1 += text.substring(replaceLastIndex_1, replaceMatch_1.index);
            }
            var replaceInput_1 = replaceMatch_1[0];
            var decodeResult_1 = replaceInput_1;
            var decodeEntityLastChar_2 = replaceInput_1[replaceInput_1.length - 1];
            if (isAttribute
                && decodeEntityLastChar_2 === '=') {
                decodeResult_1 = replaceInput_1;
            }
            else if (isStrict
                && decodeEntityLastChar_2 !== ';') {
                decodeResult_1 = replaceInput_1;
            }
            else {
                var decodeResultByReference_2 = references[replaceInput_1];
                if (decodeResultByReference_2) {
                    decodeResult_1 = decodeResultByReference_2;
                }
                else if (replaceInput_1[0] === '&' && replaceInput_1[1] === '#') {
                    var decodeSecondChar_2 = replaceInput_1[2];
                    var decodeCode_2 = decodeSecondChar_2 == 'x' || decodeSecondChar_2 == 'X'
                        ? parseInt(replaceInput_1.substr(3), 16)
                        : parseInt(replaceInput_1.substr(2));
                    decodeResult_1 =
                        decodeCode_2 >= 0x10ffff
                            ? outOfBoundsChar
                            : decodeCode_2 > 65535
                                ? surrogate_pairs_1.fromCodePoint(decodeCode_2)
                                : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_2] || decodeCode_2);
                }
            }
            replaceResult_1 += decodeResult_1;
            replaceLastIndex_1 = replaceMatch_1.index + replaceInput_1.length;
        } while ((replaceMatch_1 = decodeRegExp.exec(text)));
        if (replaceLastIndex_1 !== text.length) {
            replaceResult_1 += text.substring(replaceLastIndex_1);
        }
    }
    else {
        replaceResult_1 =
            text;
    }
    return replaceResult_1;
}
exports.decode = decode;


/***/ }),

/***/ "./node_modules/html-entities/lib/named-references.js":
/*!************************************************************!*\
  !*** ./node_modules/html-entities/lib/named-references.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.bodyRegExps={xml:/&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html4:/&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html5:/&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g};exports.namedReferences={xml:{entities:{"&lt;":"<","&gt;":">","&quot;":'"',"&apos;":"'","&amp;":"&"},characters:{"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;","&":"&amp;"}},html4:{entities:{"&apos;":"'","&nbsp":" ","&nbsp;":" ","&iexcl":"¡","&iexcl;":"¡","&cent":"¢","&cent;":"¢","&pound":"£","&pound;":"£","&curren":"¤","&curren;":"¤","&yen":"¥","&yen;":"¥","&brvbar":"¦","&brvbar;":"¦","&sect":"§","&sect;":"§","&uml":"¨","&uml;":"¨","&copy":"©","&copy;":"©","&ordf":"ª","&ordf;":"ª","&laquo":"«","&laquo;":"«","&not":"¬","&not;":"¬","&shy":"­","&shy;":"­","&reg":"®","&reg;":"®","&macr":"¯","&macr;":"¯","&deg":"°","&deg;":"°","&plusmn":"±","&plusmn;":"±","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&acute":"´","&acute;":"´","&micro":"µ","&micro;":"µ","&para":"¶","&para;":"¶","&middot":"·","&middot;":"·","&cedil":"¸","&cedil;":"¸","&sup1":"¹","&sup1;":"¹","&ordm":"º","&ordm;":"º","&raquo":"»","&raquo;":"»","&frac14":"¼","&frac14;":"¼","&frac12":"½","&frac12;":"½","&frac34":"¾","&frac34;":"¾","&iquest":"¿","&iquest;":"¿","&Agrave":"À","&Agrave;":"À","&Aacute":"Á","&Aacute;":"Á","&Acirc":"Â","&Acirc;":"Â","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Aring":"Å","&Aring;":"Å","&AElig":"Æ","&AElig;":"Æ","&Ccedil":"Ç","&Ccedil;":"Ç","&Egrave":"È","&Egrave;":"È","&Eacute":"É","&Eacute;":"É","&Ecirc":"Ê","&Ecirc;":"Ê","&Euml":"Ë","&Euml;":"Ë","&Igrave":"Ì","&Igrave;":"Ì","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Iuml":"Ï","&Iuml;":"Ï","&ETH":"Ð","&ETH;":"Ð","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Ograve":"Ò","&Ograve;":"Ò","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Otilde":"Õ","&Otilde;":"Õ","&Ouml":"Ö","&Ouml;":"Ö","&times":"×","&times;":"×","&Oslash":"Ø","&Oslash;":"Ø","&Ugrave":"Ù","&Ugrave;":"Ù","&Uacute":"Ú","&Uacute;":"Ú","&Ucirc":"Û","&Ucirc;":"Û","&Uuml":"Ü","&Uuml;":"Ü","&Yacute":"Ý","&Yacute;":"Ý","&THORN":"Þ","&THORN;":"Þ","&szlig":"ß","&szlig;":"ß","&agrave":"à","&agrave;":"à","&aacute":"á","&aacute;":"á","&acirc":"â","&acirc;":"â","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&aring":"å","&aring;":"å","&aelig":"æ","&aelig;":"æ","&ccedil":"ç","&ccedil;":"ç","&egrave":"è","&egrave;":"è","&eacute":"é","&eacute;":"é","&ecirc":"ê","&ecirc;":"ê","&euml":"ë","&euml;":"ë","&igrave":"ì","&igrave;":"ì","&iacute":"í","&iacute;":"í","&icirc":"î","&icirc;":"î","&iuml":"ï","&iuml;":"ï","&eth":"ð","&eth;":"ð","&ntilde":"ñ","&ntilde;":"ñ","&ograve":"ò","&ograve;":"ò","&oacute":"ó","&oacute;":"ó","&ocirc":"ô","&ocirc;":"ô","&otilde":"õ","&otilde;":"õ","&ouml":"ö","&ouml;":"ö","&divide":"÷","&divide;":"÷","&oslash":"ø","&oslash;":"ø","&ugrave":"ù","&ugrave;":"ù","&uacute":"ú","&uacute;":"ú","&ucirc":"û","&ucirc;":"û","&uuml":"ü","&uuml;":"ü","&yacute":"ý","&yacute;":"ý","&thorn":"þ","&thorn;":"þ","&yuml":"ÿ","&yuml;":"ÿ","&quot":'"',"&quot;":'"',"&amp":"&","&amp;":"&","&lt":"<","&lt;":"<","&gt":">","&gt;":">","&OElig;":"Œ","&oelig;":"œ","&Scaron;":"Š","&scaron;":"š","&Yuml;":"Ÿ","&circ;":"ˆ","&tilde;":"˜","&ensp;":" ","&emsp;":" ","&thinsp;":" ","&zwnj;":"‌","&zwj;":"‍","&lrm;":"‎","&rlm;":"‏","&ndash;":"–","&mdash;":"—","&lsquo;":"‘","&rsquo;":"’","&sbquo;":"‚","&ldquo;":"“","&rdquo;":"”","&bdquo;":"„","&dagger;":"†","&Dagger;":"‡","&permil;":"‰","&lsaquo;":"‹","&rsaquo;":"›","&euro;":"€","&fnof;":"ƒ","&Alpha;":"Α","&Beta;":"Β","&Gamma;":"Γ","&Delta;":"Δ","&Epsilon;":"Ε","&Zeta;":"Ζ","&Eta;":"Η","&Theta;":"Θ","&Iota;":"Ι","&Kappa;":"Κ","&Lambda;":"Λ","&Mu;":"Μ","&Nu;":"Ν","&Xi;":"Ξ","&Omicron;":"Ο","&Pi;":"Π","&Rho;":"Ρ","&Sigma;":"Σ","&Tau;":"Τ","&Upsilon;":"Υ","&Phi;":"Φ","&Chi;":"Χ","&Psi;":"Ψ","&Omega;":"Ω","&alpha;":"α","&beta;":"β","&gamma;":"γ","&delta;":"δ","&epsilon;":"ε","&zeta;":"ζ","&eta;":"η","&theta;":"θ","&iota;":"ι","&kappa;":"κ","&lambda;":"λ","&mu;":"μ","&nu;":"ν","&xi;":"ξ","&omicron;":"ο","&pi;":"π","&rho;":"ρ","&sigmaf;":"ς","&sigma;":"σ","&tau;":"τ","&upsilon;":"υ","&phi;":"φ","&chi;":"χ","&psi;":"ψ","&omega;":"ω","&thetasym;":"ϑ","&upsih;":"ϒ","&piv;":"ϖ","&bull;":"•","&hellip;":"…","&prime;":"′","&Prime;":"″","&oline;":"‾","&frasl;":"⁄","&weierp;":"℘","&image;":"ℑ","&real;":"ℜ","&trade;":"™","&alefsym;":"ℵ","&larr;":"←","&uarr;":"↑","&rarr;":"→","&darr;":"↓","&harr;":"↔","&crarr;":"↵","&lArr;":"⇐","&uArr;":"⇑","&rArr;":"⇒","&dArr;":"⇓","&hArr;":"⇔","&forall;":"∀","&part;":"∂","&exist;":"∃","&empty;":"∅","&nabla;":"∇","&isin;":"∈","&notin;":"∉","&ni;":"∋","&prod;":"∏","&sum;":"∑","&minus;":"−","&lowast;":"∗","&radic;":"√","&prop;":"∝","&infin;":"∞","&ang;":"∠","&and;":"∧","&or;":"∨","&cap;":"∩","&cup;":"∪","&int;":"∫","&there4;":"∴","&sim;":"∼","&cong;":"≅","&asymp;":"≈","&ne;":"≠","&equiv;":"≡","&le;":"≤","&ge;":"≥","&sub;":"⊂","&sup;":"⊃","&nsub;":"⊄","&sube;":"⊆","&supe;":"⊇","&oplus;":"⊕","&otimes;":"⊗","&perp;":"⊥","&sdot;":"⋅","&lceil;":"⌈","&rceil;":"⌉","&lfloor;":"⌊","&rfloor;":"⌋","&lang;":"〈","&rang;":"〉","&loz;":"◊","&spades;":"♠","&clubs;":"♣","&hearts;":"♥","&diams;":"♦"},characters:{"'":"&apos;"," ":"&nbsp;","¡":"&iexcl;","¢":"&cent;","£":"&pound;","¤":"&curren;","¥":"&yen;","¦":"&brvbar;","§":"&sect;","¨":"&uml;","©":"&copy;","ª":"&ordf;","«":"&laquo;","¬":"&not;","­":"&shy;","®":"&reg;","¯":"&macr;","°":"&deg;","±":"&plusmn;","²":"&sup2;","³":"&sup3;","´":"&acute;","µ":"&micro;","¶":"&para;","·":"&middot;","¸":"&cedil;","¹":"&sup1;","º":"&ordm;","»":"&raquo;","¼":"&frac14;","½":"&frac12;","¾":"&frac34;","¿":"&iquest;","À":"&Agrave;","Á":"&Aacute;","Â":"&Acirc;","Ã":"&Atilde;","Ä":"&Auml;","Å":"&Aring;","Æ":"&AElig;","Ç":"&Ccedil;","È":"&Egrave;","É":"&Eacute;","Ê":"&Ecirc;","Ë":"&Euml;","Ì":"&Igrave;","Í":"&Iacute;","Î":"&Icirc;","Ï":"&Iuml;","Ð":"&ETH;","Ñ":"&Ntilde;","Ò":"&Ograve;","Ó":"&Oacute;","Ô":"&Ocirc;","Õ":"&Otilde;","Ö":"&Ouml;","×":"&times;","Ø":"&Oslash;","Ù":"&Ugrave;","Ú":"&Uacute;","Û":"&Ucirc;","Ü":"&Uuml;","Ý":"&Yacute;","Þ":"&THORN;","ß":"&szlig;","à":"&agrave;","á":"&aacute;","â":"&acirc;","ã":"&atilde;","ä":"&auml;","å":"&aring;","æ":"&aelig;","ç":"&ccedil;","è":"&egrave;","é":"&eacute;","ê":"&ecirc;","ë":"&euml;","ì":"&igrave;","í":"&iacute;","î":"&icirc;","ï":"&iuml;","ð":"&eth;","ñ":"&ntilde;","ò":"&ograve;","ó":"&oacute;","ô":"&ocirc;","õ":"&otilde;","ö":"&ouml;","÷":"&divide;","ø":"&oslash;","ù":"&ugrave;","ú":"&uacute;","û":"&ucirc;","ü":"&uuml;","ý":"&yacute;","þ":"&thorn;","ÿ":"&yuml;",'"':"&quot;","&":"&amp;","<":"&lt;",">":"&gt;","Œ":"&OElig;","œ":"&oelig;","Š":"&Scaron;","š":"&scaron;","Ÿ":"&Yuml;","ˆ":"&circ;","˜":"&tilde;"," ":"&ensp;"," ":"&emsp;"," ":"&thinsp;","‌":"&zwnj;","‍":"&zwj;","‎":"&lrm;","‏":"&rlm;","–":"&ndash;","—":"&mdash;","‘":"&lsquo;","’":"&rsquo;","‚":"&sbquo;","“":"&ldquo;","”":"&rdquo;","„":"&bdquo;","†":"&dagger;","‡":"&Dagger;","‰":"&permil;","‹":"&lsaquo;","›":"&rsaquo;","€":"&euro;","ƒ":"&fnof;","Α":"&Alpha;","Β":"&Beta;","Γ":"&Gamma;","Δ":"&Delta;","Ε":"&Epsilon;","Ζ":"&Zeta;","Η":"&Eta;","Θ":"&Theta;","Ι":"&Iota;","Κ":"&Kappa;","Λ":"&Lambda;","Μ":"&Mu;","Ν":"&Nu;","Ξ":"&Xi;","Ο":"&Omicron;","Π":"&Pi;","Ρ":"&Rho;","Σ":"&Sigma;","Τ":"&Tau;","Υ":"&Upsilon;","Φ":"&Phi;","Χ":"&Chi;","Ψ":"&Psi;","Ω":"&Omega;","α":"&alpha;","β":"&beta;","γ":"&gamma;","δ":"&delta;","ε":"&epsilon;","ζ":"&zeta;","η":"&eta;","θ":"&theta;","ι":"&iota;","κ":"&kappa;","λ":"&lambda;","μ":"&mu;","ν":"&nu;","ξ":"&xi;","ο":"&omicron;","π":"&pi;","ρ":"&rho;","ς":"&sigmaf;","σ":"&sigma;","τ":"&tau;","υ":"&upsilon;","φ":"&phi;","χ":"&chi;","ψ":"&psi;","ω":"&omega;","ϑ":"&thetasym;","ϒ":"&upsih;","ϖ":"&piv;","•":"&bull;","…":"&hellip;","′":"&prime;","″":"&Prime;","‾":"&oline;","⁄":"&frasl;","℘":"&weierp;","ℑ":"&image;","ℜ":"&real;","™":"&trade;","ℵ":"&alefsym;","←":"&larr;","↑":"&uarr;","→":"&rarr;","↓":"&darr;","↔":"&harr;","↵":"&crarr;","⇐":"&lArr;","⇑":"&uArr;","⇒":"&rArr;","⇓":"&dArr;","⇔":"&hArr;","∀":"&forall;","∂":"&part;","∃":"&exist;","∅":"&empty;","∇":"&nabla;","∈":"&isin;","∉":"&notin;","∋":"&ni;","∏":"&prod;","∑":"&sum;","−":"&minus;","∗":"&lowast;","√":"&radic;","∝":"&prop;","∞":"&infin;","∠":"&ang;","∧":"&and;","∨":"&or;","∩":"&cap;","∪":"&cup;","∫":"&int;","∴":"&there4;","∼":"&sim;","≅":"&cong;","≈":"&asymp;","≠":"&ne;","≡":"&equiv;","≤":"&le;","≥":"&ge;","⊂":"&sub;","⊃":"&sup;","⊄":"&nsub;","⊆":"&sube;","⊇":"&supe;","⊕":"&oplus;","⊗":"&otimes;","⊥":"&perp;","⋅":"&sdot;","⌈":"&lceil;","⌉":"&rceil;","⌊":"&lfloor;","⌋":"&rfloor;","〈":"&lang;","〉":"&rang;","◊":"&loz;","♠":"&spades;","♣":"&clubs;","♥":"&hearts;","♦":"&diams;"}},html5:{entities:{"&AElig":"Æ","&AElig;":"Æ","&AMP":"&","&AMP;":"&","&Aacute":"Á","&Aacute;":"Á","&Abreve;":"Ă","&Acirc":"Â","&Acirc;":"Â","&Acy;":"А","&Afr;":"𝔄","&Agrave":"À","&Agrave;":"À","&Alpha;":"Α","&Amacr;":"Ā","&And;":"⩓","&Aogon;":"Ą","&Aopf;":"𝔸","&ApplyFunction;":"⁡","&Aring":"Å","&Aring;":"Å","&Ascr;":"𝒜","&Assign;":"≔","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Backslash;":"∖","&Barv;":"⫧","&Barwed;":"⌆","&Bcy;":"Б","&Because;":"∵","&Bernoullis;":"ℬ","&Beta;":"Β","&Bfr;":"𝔅","&Bopf;":"𝔹","&Breve;":"˘","&Bscr;":"ℬ","&Bumpeq;":"≎","&CHcy;":"Ч","&COPY":"©","&COPY;":"©","&Cacute;":"Ć","&Cap;":"⋒","&CapitalDifferentialD;":"ⅅ","&Cayleys;":"ℭ","&Ccaron;":"Č","&Ccedil":"Ç","&Ccedil;":"Ç","&Ccirc;":"Ĉ","&Cconint;":"∰","&Cdot;":"Ċ","&Cedilla;":"¸","&CenterDot;":"·","&Cfr;":"ℭ","&Chi;":"Χ","&CircleDot;":"⊙","&CircleMinus;":"⊖","&CirclePlus;":"⊕","&CircleTimes;":"⊗","&ClockwiseContourIntegral;":"∲","&CloseCurlyDoubleQuote;":"”","&CloseCurlyQuote;":"’","&Colon;":"∷","&Colone;":"⩴","&Congruent;":"≡","&Conint;":"∯","&ContourIntegral;":"∮","&Copf;":"ℂ","&Coproduct;":"∐","&CounterClockwiseContourIntegral;":"∳","&Cross;":"⨯","&Cscr;":"𝒞","&Cup;":"⋓","&CupCap;":"≍","&DD;":"ⅅ","&DDotrahd;":"⤑","&DJcy;":"Ђ","&DScy;":"Ѕ","&DZcy;":"Џ","&Dagger;":"‡","&Darr;":"↡","&Dashv;":"⫤","&Dcaron;":"Ď","&Dcy;":"Д","&Del;":"∇","&Delta;":"Δ","&Dfr;":"𝔇","&DiacriticalAcute;":"´","&DiacriticalDot;":"˙","&DiacriticalDoubleAcute;":"˝","&DiacriticalGrave;":"`","&DiacriticalTilde;":"˜","&Diamond;":"⋄","&DifferentialD;":"ⅆ","&Dopf;":"𝔻","&Dot;":"¨","&DotDot;":"⃜","&DotEqual;":"≐","&DoubleContourIntegral;":"∯","&DoubleDot;":"¨","&DoubleDownArrow;":"⇓","&DoubleLeftArrow;":"⇐","&DoubleLeftRightArrow;":"⇔","&DoubleLeftTee;":"⫤","&DoubleLongLeftArrow;":"⟸","&DoubleLongLeftRightArrow;":"⟺","&DoubleLongRightArrow;":"⟹","&DoubleRightArrow;":"⇒","&DoubleRightTee;":"⊨","&DoubleUpArrow;":"⇑","&DoubleUpDownArrow;":"⇕","&DoubleVerticalBar;":"∥","&DownArrow;":"↓","&DownArrowBar;":"⤓","&DownArrowUpArrow;":"⇵","&DownBreve;":"̑","&DownLeftRightVector;":"⥐","&DownLeftTeeVector;":"⥞","&DownLeftVector;":"↽","&DownLeftVectorBar;":"⥖","&DownRightTeeVector;":"⥟","&DownRightVector;":"⇁","&DownRightVectorBar;":"⥗","&DownTee;":"⊤","&DownTeeArrow;":"↧","&Downarrow;":"⇓","&Dscr;":"𝒟","&Dstrok;":"Đ","&ENG;":"Ŋ","&ETH":"Ð","&ETH;":"Ð","&Eacute":"É","&Eacute;":"É","&Ecaron;":"Ě","&Ecirc":"Ê","&Ecirc;":"Ê","&Ecy;":"Э","&Edot;":"Ė","&Efr;":"𝔈","&Egrave":"È","&Egrave;":"È","&Element;":"∈","&Emacr;":"Ē","&EmptySmallSquare;":"◻","&EmptyVerySmallSquare;":"▫","&Eogon;":"Ę","&Eopf;":"𝔼","&Epsilon;":"Ε","&Equal;":"⩵","&EqualTilde;":"≂","&Equilibrium;":"⇌","&Escr;":"ℰ","&Esim;":"⩳","&Eta;":"Η","&Euml":"Ë","&Euml;":"Ë","&Exists;":"∃","&ExponentialE;":"ⅇ","&Fcy;":"Ф","&Ffr;":"𝔉","&FilledSmallSquare;":"◼","&FilledVerySmallSquare;":"▪","&Fopf;":"𝔽","&ForAll;":"∀","&Fouriertrf;":"ℱ","&Fscr;":"ℱ","&GJcy;":"Ѓ","&GT":">","&GT;":">","&Gamma;":"Γ","&Gammad;":"Ϝ","&Gbreve;":"Ğ","&Gcedil;":"Ģ","&Gcirc;":"Ĝ","&Gcy;":"Г","&Gdot;":"Ġ","&Gfr;":"𝔊","&Gg;":"⋙","&Gopf;":"𝔾","&GreaterEqual;":"≥","&GreaterEqualLess;":"⋛","&GreaterFullEqual;":"≧","&GreaterGreater;":"⪢","&GreaterLess;":"≷","&GreaterSlantEqual;":"⩾","&GreaterTilde;":"≳","&Gscr;":"𝒢","&Gt;":"≫","&HARDcy;":"Ъ","&Hacek;":"ˇ","&Hat;":"^","&Hcirc;":"Ĥ","&Hfr;":"ℌ","&HilbertSpace;":"ℋ","&Hopf;":"ℍ","&HorizontalLine;":"─","&Hscr;":"ℋ","&Hstrok;":"Ħ","&HumpDownHump;":"≎","&HumpEqual;":"≏","&IEcy;":"Е","&IJlig;":"Ĳ","&IOcy;":"Ё","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Icy;":"И","&Idot;":"İ","&Ifr;":"ℑ","&Igrave":"Ì","&Igrave;":"Ì","&Im;":"ℑ","&Imacr;":"Ī","&ImaginaryI;":"ⅈ","&Implies;":"⇒","&Int;":"∬","&Integral;":"∫","&Intersection;":"⋂","&InvisibleComma;":"⁣","&InvisibleTimes;":"⁢","&Iogon;":"Į","&Iopf;":"𝕀","&Iota;":"Ι","&Iscr;":"ℐ","&Itilde;":"Ĩ","&Iukcy;":"І","&Iuml":"Ï","&Iuml;":"Ï","&Jcirc;":"Ĵ","&Jcy;":"Й","&Jfr;":"𝔍","&Jopf;":"𝕁","&Jscr;":"𝒥","&Jsercy;":"Ј","&Jukcy;":"Є","&KHcy;":"Х","&KJcy;":"Ќ","&Kappa;":"Κ","&Kcedil;":"Ķ","&Kcy;":"К","&Kfr;":"𝔎","&Kopf;":"𝕂","&Kscr;":"𝒦","&LJcy;":"Љ","&LT":"<","&LT;":"<","&Lacute;":"Ĺ","&Lambda;":"Λ","&Lang;":"⟪","&Laplacetrf;":"ℒ","&Larr;":"↞","&Lcaron;":"Ľ","&Lcedil;":"Ļ","&Lcy;":"Л","&LeftAngleBracket;":"⟨","&LeftArrow;":"←","&LeftArrowBar;":"⇤","&LeftArrowRightArrow;":"⇆","&LeftCeiling;":"⌈","&LeftDoubleBracket;":"⟦","&LeftDownTeeVector;":"⥡","&LeftDownVector;":"⇃","&LeftDownVectorBar;":"⥙","&LeftFloor;":"⌊","&LeftRightArrow;":"↔","&LeftRightVector;":"⥎","&LeftTee;":"⊣","&LeftTeeArrow;":"↤","&LeftTeeVector;":"⥚","&LeftTriangle;":"⊲","&LeftTriangleBar;":"⧏","&LeftTriangleEqual;":"⊴","&LeftUpDownVector;":"⥑","&LeftUpTeeVector;":"⥠","&LeftUpVector;":"↿","&LeftUpVectorBar;":"⥘","&LeftVector;":"↼","&LeftVectorBar;":"⥒","&Leftarrow;":"⇐","&Leftrightarrow;":"⇔","&LessEqualGreater;":"⋚","&LessFullEqual;":"≦","&LessGreater;":"≶","&LessLess;":"⪡","&LessSlantEqual;":"⩽","&LessTilde;":"≲","&Lfr;":"𝔏","&Ll;":"⋘","&Lleftarrow;":"⇚","&Lmidot;":"Ŀ","&LongLeftArrow;":"⟵","&LongLeftRightArrow;":"⟷","&LongRightArrow;":"⟶","&Longleftarrow;":"⟸","&Longleftrightarrow;":"⟺","&Longrightarrow;":"⟹","&Lopf;":"𝕃","&LowerLeftArrow;":"↙","&LowerRightArrow;":"↘","&Lscr;":"ℒ","&Lsh;":"↰","&Lstrok;":"Ł","&Lt;":"≪","&Map;":"⤅","&Mcy;":"М","&MediumSpace;":" ","&Mellintrf;":"ℳ","&Mfr;":"𝔐","&MinusPlus;":"∓","&Mopf;":"𝕄","&Mscr;":"ℳ","&Mu;":"Μ","&NJcy;":"Њ","&Nacute;":"Ń","&Ncaron;":"Ň","&Ncedil;":"Ņ","&Ncy;":"Н","&NegativeMediumSpace;":"​","&NegativeThickSpace;":"​","&NegativeThinSpace;":"​","&NegativeVeryThinSpace;":"​","&NestedGreaterGreater;":"≫","&NestedLessLess;":"≪","&NewLine;":"\n","&Nfr;":"𝔑","&NoBreak;":"⁠","&NonBreakingSpace;":" ","&Nopf;":"ℕ","&Not;":"⫬","&NotCongruent;":"≢","&NotCupCap;":"≭","&NotDoubleVerticalBar;":"∦","&NotElement;":"∉","&NotEqual;":"≠","&NotEqualTilde;":"≂̸","&NotExists;":"∄","&NotGreater;":"≯","&NotGreaterEqual;":"≱","&NotGreaterFullEqual;":"≧̸","&NotGreaterGreater;":"≫̸","&NotGreaterLess;":"≹","&NotGreaterSlantEqual;":"⩾̸","&NotGreaterTilde;":"≵","&NotHumpDownHump;":"≎̸","&NotHumpEqual;":"≏̸","&NotLeftTriangle;":"⋪","&NotLeftTriangleBar;":"⧏̸","&NotLeftTriangleEqual;":"⋬","&NotLess;":"≮","&NotLessEqual;":"≰","&NotLessGreater;":"≸","&NotLessLess;":"≪̸","&NotLessSlantEqual;":"⩽̸","&NotLessTilde;":"≴","&NotNestedGreaterGreater;":"⪢̸","&NotNestedLessLess;":"⪡̸","&NotPrecedes;":"⊀","&NotPrecedesEqual;":"⪯̸","&NotPrecedesSlantEqual;":"⋠","&NotReverseElement;":"∌","&NotRightTriangle;":"⋫","&NotRightTriangleBar;":"⧐̸","&NotRightTriangleEqual;":"⋭","&NotSquareSubset;":"⊏̸","&NotSquareSubsetEqual;":"⋢","&NotSquareSuperset;":"⊐̸","&NotSquareSupersetEqual;":"⋣","&NotSubset;":"⊂⃒","&NotSubsetEqual;":"⊈","&NotSucceeds;":"⊁","&NotSucceedsEqual;":"⪰̸","&NotSucceedsSlantEqual;":"⋡","&NotSucceedsTilde;":"≿̸","&NotSuperset;":"⊃⃒","&NotSupersetEqual;":"⊉","&NotTilde;":"≁","&NotTildeEqual;":"≄","&NotTildeFullEqual;":"≇","&NotTildeTilde;":"≉","&NotVerticalBar;":"∤","&Nscr;":"𝒩","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Nu;":"Ν","&OElig;":"Œ","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Ocy;":"О","&Odblac;":"Ő","&Ofr;":"𝔒","&Ograve":"Ò","&Ograve;":"Ò","&Omacr;":"Ō","&Omega;":"Ω","&Omicron;":"Ο","&Oopf;":"𝕆","&OpenCurlyDoubleQuote;":"“","&OpenCurlyQuote;":"‘","&Or;":"⩔","&Oscr;":"𝒪","&Oslash":"Ø","&Oslash;":"Ø","&Otilde":"Õ","&Otilde;":"Õ","&Otimes;":"⨷","&Ouml":"Ö","&Ouml;":"Ö","&OverBar;":"‾","&OverBrace;":"⏞","&OverBracket;":"⎴","&OverParenthesis;":"⏜","&PartialD;":"∂","&Pcy;":"П","&Pfr;":"𝔓","&Phi;":"Φ","&Pi;":"Π","&PlusMinus;":"±","&Poincareplane;":"ℌ","&Popf;":"ℙ","&Pr;":"⪻","&Precedes;":"≺","&PrecedesEqual;":"⪯","&PrecedesSlantEqual;":"≼","&PrecedesTilde;":"≾","&Prime;":"″","&Product;":"∏","&Proportion;":"∷","&Proportional;":"∝","&Pscr;":"𝒫","&Psi;":"Ψ","&QUOT":'"',"&QUOT;":'"',"&Qfr;":"𝔔","&Qopf;":"ℚ","&Qscr;":"𝒬","&RBarr;":"⤐","&REG":"®","&REG;":"®","&Racute;":"Ŕ","&Rang;":"⟫","&Rarr;":"↠","&Rarrtl;":"⤖","&Rcaron;":"Ř","&Rcedil;":"Ŗ","&Rcy;":"Р","&Re;":"ℜ","&ReverseElement;":"∋","&ReverseEquilibrium;":"⇋","&ReverseUpEquilibrium;":"⥯","&Rfr;":"ℜ","&Rho;":"Ρ","&RightAngleBracket;":"⟩","&RightArrow;":"→","&RightArrowBar;":"⇥","&RightArrowLeftArrow;":"⇄","&RightCeiling;":"⌉","&RightDoubleBracket;":"⟧","&RightDownTeeVector;":"⥝","&RightDownVector;":"⇂","&RightDownVectorBar;":"⥕","&RightFloor;":"⌋","&RightTee;":"⊢","&RightTeeArrow;":"↦","&RightTeeVector;":"⥛","&RightTriangle;":"⊳","&RightTriangleBar;":"⧐","&RightTriangleEqual;":"⊵","&RightUpDownVector;":"⥏","&RightUpTeeVector;":"⥜","&RightUpVector;":"↾","&RightUpVectorBar;":"⥔","&RightVector;":"⇀","&RightVectorBar;":"⥓","&Rightarrow;":"⇒","&Ropf;":"ℝ","&RoundImplies;":"⥰","&Rrightarrow;":"⇛","&Rscr;":"ℛ","&Rsh;":"↱","&RuleDelayed;":"⧴","&SHCHcy;":"Щ","&SHcy;":"Ш","&SOFTcy;":"Ь","&Sacute;":"Ś","&Sc;":"⪼","&Scaron;":"Š","&Scedil;":"Ş","&Scirc;":"Ŝ","&Scy;":"С","&Sfr;":"𝔖","&ShortDownArrow;":"↓","&ShortLeftArrow;":"←","&ShortRightArrow;":"→","&ShortUpArrow;":"↑","&Sigma;":"Σ","&SmallCircle;":"∘","&Sopf;":"𝕊","&Sqrt;":"√","&Square;":"□","&SquareIntersection;":"⊓","&SquareSubset;":"⊏","&SquareSubsetEqual;":"⊑","&SquareSuperset;":"⊐","&SquareSupersetEqual;":"⊒","&SquareUnion;":"⊔","&Sscr;":"𝒮","&Star;":"⋆","&Sub;":"⋐","&Subset;":"⋐","&SubsetEqual;":"⊆","&Succeeds;":"≻","&SucceedsEqual;":"⪰","&SucceedsSlantEqual;":"≽","&SucceedsTilde;":"≿","&SuchThat;":"∋","&Sum;":"∑","&Sup;":"⋑","&Superset;":"⊃","&SupersetEqual;":"⊇","&Supset;":"⋑","&THORN":"Þ","&THORN;":"Þ","&TRADE;":"™","&TSHcy;":"Ћ","&TScy;":"Ц","&Tab;":"\t","&Tau;":"Τ","&Tcaron;":"Ť","&Tcedil;":"Ţ","&Tcy;":"Т","&Tfr;":"𝔗","&Therefore;":"∴","&Theta;":"Θ","&ThickSpace;":"  ","&ThinSpace;":" ","&Tilde;":"∼","&TildeEqual;":"≃","&TildeFullEqual;":"≅","&TildeTilde;":"≈","&Topf;":"𝕋","&TripleDot;":"⃛","&Tscr;":"𝒯","&Tstrok;":"Ŧ","&Uacute":"Ú","&Uacute;":"Ú","&Uarr;":"↟","&Uarrocir;":"⥉","&Ubrcy;":"Ў","&Ubreve;":"Ŭ","&Ucirc":"Û","&Ucirc;":"Û","&Ucy;":"У","&Udblac;":"Ű","&Ufr;":"𝔘","&Ugrave":"Ù","&Ugrave;":"Ù","&Umacr;":"Ū","&UnderBar;":"_","&UnderBrace;":"⏟","&UnderBracket;":"⎵","&UnderParenthesis;":"⏝","&Union;":"⋃","&UnionPlus;":"⊎","&Uogon;":"Ų","&Uopf;":"𝕌","&UpArrow;":"↑","&UpArrowBar;":"⤒","&UpArrowDownArrow;":"⇅","&UpDownArrow;":"↕","&UpEquilibrium;":"⥮","&UpTee;":"⊥","&UpTeeArrow;":"↥","&Uparrow;":"⇑","&Updownarrow;":"⇕","&UpperLeftArrow;":"↖","&UpperRightArrow;":"↗","&Upsi;":"ϒ","&Upsilon;":"Υ","&Uring;":"Ů","&Uscr;":"𝒰","&Utilde;":"Ũ","&Uuml":"Ü","&Uuml;":"Ü","&VDash;":"⊫","&Vbar;":"⫫","&Vcy;":"В","&Vdash;":"⊩","&Vdashl;":"⫦","&Vee;":"⋁","&Verbar;":"‖","&Vert;":"‖","&VerticalBar;":"∣","&VerticalLine;":"|","&VerticalSeparator;":"❘","&VerticalTilde;":"≀","&VeryThinSpace;":" ","&Vfr;":"𝔙","&Vopf;":"𝕍","&Vscr;":"𝒱","&Vvdash;":"⊪","&Wcirc;":"Ŵ","&Wedge;":"⋀","&Wfr;":"𝔚","&Wopf;":"𝕎","&Wscr;":"𝒲","&Xfr;":"𝔛","&Xi;":"Ξ","&Xopf;":"𝕏","&Xscr;":"𝒳","&YAcy;":"Я","&YIcy;":"Ї","&YUcy;":"Ю","&Yacute":"Ý","&Yacute;":"Ý","&Ycirc;":"Ŷ","&Ycy;":"Ы","&Yfr;":"𝔜","&Yopf;":"𝕐","&Yscr;":"𝒴","&Yuml;":"Ÿ","&ZHcy;":"Ж","&Zacute;":"Ź","&Zcaron;":"Ž","&Zcy;":"З","&Zdot;":"Ż","&ZeroWidthSpace;":"​","&Zeta;":"Ζ","&Zfr;":"ℨ","&Zopf;":"ℤ","&Zscr;":"𝒵","&aacute":"á","&aacute;":"á","&abreve;":"ă","&ac;":"∾","&acE;":"∾̳","&acd;":"∿","&acirc":"â","&acirc;":"â","&acute":"´","&acute;":"´","&acy;":"а","&aelig":"æ","&aelig;":"æ","&af;":"⁡","&afr;":"𝔞","&agrave":"à","&agrave;":"à","&alefsym;":"ℵ","&aleph;":"ℵ","&alpha;":"α","&amacr;":"ā","&amalg;":"⨿","&amp":"&","&amp;":"&","&and;":"∧","&andand;":"⩕","&andd;":"⩜","&andslope;":"⩘","&andv;":"⩚","&ang;":"∠","&ange;":"⦤","&angle;":"∠","&angmsd;":"∡","&angmsdaa;":"⦨","&angmsdab;":"⦩","&angmsdac;":"⦪","&angmsdad;":"⦫","&angmsdae;":"⦬","&angmsdaf;":"⦭","&angmsdag;":"⦮","&angmsdah;":"⦯","&angrt;":"∟","&angrtvb;":"⊾","&angrtvbd;":"⦝","&angsph;":"∢","&angst;":"Å","&angzarr;":"⍼","&aogon;":"ą","&aopf;":"𝕒","&ap;":"≈","&apE;":"⩰","&apacir;":"⩯","&ape;":"≊","&apid;":"≋","&apos;":"'","&approx;":"≈","&approxeq;":"≊","&aring":"å","&aring;":"å","&ascr;":"𝒶","&ast;":"*","&asymp;":"≈","&asympeq;":"≍","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&awconint;":"∳","&awint;":"⨑","&bNot;":"⫭","&backcong;":"≌","&backepsilon;":"϶","&backprime;":"‵","&backsim;":"∽","&backsimeq;":"⋍","&barvee;":"⊽","&barwed;":"⌅","&barwedge;":"⌅","&bbrk;":"⎵","&bbrktbrk;":"⎶","&bcong;":"≌","&bcy;":"б","&bdquo;":"„","&becaus;":"∵","&because;":"∵","&bemptyv;":"⦰","&bepsi;":"϶","&bernou;":"ℬ","&beta;":"β","&beth;":"ℶ","&between;":"≬","&bfr;":"𝔟","&bigcap;":"⋂","&bigcirc;":"◯","&bigcup;":"⋃","&bigodot;":"⨀","&bigoplus;":"⨁","&bigotimes;":"⨂","&bigsqcup;":"⨆","&bigstar;":"★","&bigtriangledown;":"▽","&bigtriangleup;":"△","&biguplus;":"⨄","&bigvee;":"⋁","&bigwedge;":"⋀","&bkarow;":"⤍","&blacklozenge;":"⧫","&blacksquare;":"▪","&blacktriangle;":"▴","&blacktriangledown;":"▾","&blacktriangleleft;":"◂","&blacktriangleright;":"▸","&blank;":"␣","&blk12;":"▒","&blk14;":"░","&blk34;":"▓","&block;":"█","&bne;":"=⃥","&bnequiv;":"≡⃥","&bnot;":"⌐","&bopf;":"𝕓","&bot;":"⊥","&bottom;":"⊥","&bowtie;":"⋈","&boxDL;":"╗","&boxDR;":"╔","&boxDl;":"╖","&boxDr;":"╓","&boxH;":"═","&boxHD;":"╦","&boxHU;":"╩","&boxHd;":"╤","&boxHu;":"╧","&boxUL;":"╝","&boxUR;":"╚","&boxUl;":"╜","&boxUr;":"╙","&boxV;":"║","&boxVH;":"╬","&boxVL;":"╣","&boxVR;":"╠","&boxVh;":"╫","&boxVl;":"╢","&boxVr;":"╟","&boxbox;":"⧉","&boxdL;":"╕","&boxdR;":"╒","&boxdl;":"┐","&boxdr;":"┌","&boxh;":"─","&boxhD;":"╥","&boxhU;":"╨","&boxhd;":"┬","&boxhu;":"┴","&boxminus;":"⊟","&boxplus;":"⊞","&boxtimes;":"⊠","&boxuL;":"╛","&boxuR;":"╘","&boxul;":"┘","&boxur;":"└","&boxv;":"│","&boxvH;":"╪","&boxvL;":"╡","&boxvR;":"╞","&boxvh;":"┼","&boxvl;":"┤","&boxvr;":"├","&bprime;":"‵","&breve;":"˘","&brvbar":"¦","&brvbar;":"¦","&bscr;":"𝒷","&bsemi;":"⁏","&bsim;":"∽","&bsime;":"⋍","&bsol;":"\\","&bsolb;":"⧅","&bsolhsub;":"⟈","&bull;":"•","&bullet;":"•","&bump;":"≎","&bumpE;":"⪮","&bumpe;":"≏","&bumpeq;":"≏","&cacute;":"ć","&cap;":"∩","&capand;":"⩄","&capbrcup;":"⩉","&capcap;":"⩋","&capcup;":"⩇","&capdot;":"⩀","&caps;":"∩︀","&caret;":"⁁","&caron;":"ˇ","&ccaps;":"⩍","&ccaron;":"č","&ccedil":"ç","&ccedil;":"ç","&ccirc;":"ĉ","&ccups;":"⩌","&ccupssm;":"⩐","&cdot;":"ċ","&cedil":"¸","&cedil;":"¸","&cemptyv;":"⦲","&cent":"¢","&cent;":"¢","&centerdot;":"·","&cfr;":"𝔠","&chcy;":"ч","&check;":"✓","&checkmark;":"✓","&chi;":"χ","&cir;":"○","&cirE;":"⧃","&circ;":"ˆ","&circeq;":"≗","&circlearrowleft;":"↺","&circlearrowright;":"↻","&circledR;":"®","&circledS;":"Ⓢ","&circledast;":"⊛","&circledcirc;":"⊚","&circleddash;":"⊝","&cire;":"≗","&cirfnint;":"⨐","&cirmid;":"⫯","&cirscir;":"⧂","&clubs;":"♣","&clubsuit;":"♣","&colon;":":","&colone;":"≔","&coloneq;":"≔","&comma;":",","&commat;":"@","&comp;":"∁","&compfn;":"∘","&complement;":"∁","&complexes;":"ℂ","&cong;":"≅","&congdot;":"⩭","&conint;":"∮","&copf;":"𝕔","&coprod;":"∐","&copy":"©","&copy;":"©","&copysr;":"℗","&crarr;":"↵","&cross;":"✗","&cscr;":"𝒸","&csub;":"⫏","&csube;":"⫑","&csup;":"⫐","&csupe;":"⫒","&ctdot;":"⋯","&cudarrl;":"⤸","&cudarrr;":"⤵","&cuepr;":"⋞","&cuesc;":"⋟","&cularr;":"↶","&cularrp;":"⤽","&cup;":"∪","&cupbrcap;":"⩈","&cupcap;":"⩆","&cupcup;":"⩊","&cupdot;":"⊍","&cupor;":"⩅","&cups;":"∪︀","&curarr;":"↷","&curarrm;":"⤼","&curlyeqprec;":"⋞","&curlyeqsucc;":"⋟","&curlyvee;":"⋎","&curlywedge;":"⋏","&curren":"¤","&curren;":"¤","&curvearrowleft;":"↶","&curvearrowright;":"↷","&cuvee;":"⋎","&cuwed;":"⋏","&cwconint;":"∲","&cwint;":"∱","&cylcty;":"⌭","&dArr;":"⇓","&dHar;":"⥥","&dagger;":"†","&daleth;":"ℸ","&darr;":"↓","&dash;":"‐","&dashv;":"⊣","&dbkarow;":"⤏","&dblac;":"˝","&dcaron;":"ď","&dcy;":"д","&dd;":"ⅆ","&ddagger;":"‡","&ddarr;":"⇊","&ddotseq;":"⩷","&deg":"°","&deg;":"°","&delta;":"δ","&demptyv;":"⦱","&dfisht;":"⥿","&dfr;":"𝔡","&dharl;":"⇃","&dharr;":"⇂","&diam;":"⋄","&diamond;":"⋄","&diamondsuit;":"♦","&diams;":"♦","&die;":"¨","&digamma;":"ϝ","&disin;":"⋲","&div;":"÷","&divide":"÷","&divide;":"÷","&divideontimes;":"⋇","&divonx;":"⋇","&djcy;":"ђ","&dlcorn;":"⌞","&dlcrop;":"⌍","&dollar;":"$","&dopf;":"𝕕","&dot;":"˙","&doteq;":"≐","&doteqdot;":"≑","&dotminus;":"∸","&dotplus;":"∔","&dotsquare;":"⊡","&doublebarwedge;":"⌆","&downarrow;":"↓","&downdownarrows;":"⇊","&downharpoonleft;":"⇃","&downharpoonright;":"⇂","&drbkarow;":"⤐","&drcorn;":"⌟","&drcrop;":"⌌","&dscr;":"𝒹","&dscy;":"ѕ","&dsol;":"⧶","&dstrok;":"đ","&dtdot;":"⋱","&dtri;":"▿","&dtrif;":"▾","&duarr;":"⇵","&duhar;":"⥯","&dwangle;":"⦦","&dzcy;":"џ","&dzigrarr;":"⟿","&eDDot;":"⩷","&eDot;":"≑","&eacute":"é","&eacute;":"é","&easter;":"⩮","&ecaron;":"ě","&ecir;":"≖","&ecirc":"ê","&ecirc;":"ê","&ecolon;":"≕","&ecy;":"э","&edot;":"ė","&ee;":"ⅇ","&efDot;":"≒","&efr;":"𝔢","&eg;":"⪚","&egrave":"è","&egrave;":"è","&egs;":"⪖","&egsdot;":"⪘","&el;":"⪙","&elinters;":"⏧","&ell;":"ℓ","&els;":"⪕","&elsdot;":"⪗","&emacr;":"ē","&empty;":"∅","&emptyset;":"∅","&emptyv;":"∅","&emsp13;":" ","&emsp14;":" ","&emsp;":" ","&eng;":"ŋ","&ensp;":" ","&eogon;":"ę","&eopf;":"𝕖","&epar;":"⋕","&eparsl;":"⧣","&eplus;":"⩱","&epsi;":"ε","&epsilon;":"ε","&epsiv;":"ϵ","&eqcirc;":"≖","&eqcolon;":"≕","&eqsim;":"≂","&eqslantgtr;":"⪖","&eqslantless;":"⪕","&equals;":"=","&equest;":"≟","&equiv;":"≡","&equivDD;":"⩸","&eqvparsl;":"⧥","&erDot;":"≓","&erarr;":"⥱","&escr;":"ℯ","&esdot;":"≐","&esim;":"≂","&eta;":"η","&eth":"ð","&eth;":"ð","&euml":"ë","&euml;":"ë","&euro;":"€","&excl;":"!","&exist;":"∃","&expectation;":"ℰ","&exponentiale;":"ⅇ","&fallingdotseq;":"≒","&fcy;":"ф","&female;":"♀","&ffilig;":"ﬃ","&fflig;":"ﬀ","&ffllig;":"ﬄ","&ffr;":"𝔣","&filig;":"ﬁ","&fjlig;":"fj","&flat;":"♭","&fllig;":"ﬂ","&fltns;":"▱","&fnof;":"ƒ","&fopf;":"𝕗","&forall;":"∀","&fork;":"⋔","&forkv;":"⫙","&fpartint;":"⨍","&frac12":"½","&frac12;":"½","&frac13;":"⅓","&frac14":"¼","&frac14;":"¼","&frac15;":"⅕","&frac16;":"⅙","&frac18;":"⅛","&frac23;":"⅔","&frac25;":"⅖","&frac34":"¾","&frac34;":"¾","&frac35;":"⅗","&frac38;":"⅜","&frac45;":"⅘","&frac56;":"⅚","&frac58;":"⅝","&frac78;":"⅞","&frasl;":"⁄","&frown;":"⌢","&fscr;":"𝒻","&gE;":"≧","&gEl;":"⪌","&gacute;":"ǵ","&gamma;":"γ","&gammad;":"ϝ","&gap;":"⪆","&gbreve;":"ğ","&gcirc;":"ĝ","&gcy;":"г","&gdot;":"ġ","&ge;":"≥","&gel;":"⋛","&geq;":"≥","&geqq;":"≧","&geqslant;":"⩾","&ges;":"⩾","&gescc;":"⪩","&gesdot;":"⪀","&gesdoto;":"⪂","&gesdotol;":"⪄","&gesl;":"⋛︀","&gesles;":"⪔","&gfr;":"𝔤","&gg;":"≫","&ggg;":"⋙","&gimel;":"ℷ","&gjcy;":"ѓ","&gl;":"≷","&glE;":"⪒","&gla;":"⪥","&glj;":"⪤","&gnE;":"≩","&gnap;":"⪊","&gnapprox;":"⪊","&gne;":"⪈","&gneq;":"⪈","&gneqq;":"≩","&gnsim;":"⋧","&gopf;":"𝕘","&grave;":"`","&gscr;":"ℊ","&gsim;":"≳","&gsime;":"⪎","&gsiml;":"⪐","&gt":">","&gt;":">","&gtcc;":"⪧","&gtcir;":"⩺","&gtdot;":"⋗","&gtlPar;":"⦕","&gtquest;":"⩼","&gtrapprox;":"⪆","&gtrarr;":"⥸","&gtrdot;":"⋗","&gtreqless;":"⋛","&gtreqqless;":"⪌","&gtrless;":"≷","&gtrsim;":"≳","&gvertneqq;":"≩︀","&gvnE;":"≩︀","&hArr;":"⇔","&hairsp;":" ","&half;":"½","&hamilt;":"ℋ","&hardcy;":"ъ","&harr;":"↔","&harrcir;":"⥈","&harrw;":"↭","&hbar;":"ℏ","&hcirc;":"ĥ","&hearts;":"♥","&heartsuit;":"♥","&hellip;":"…","&hercon;":"⊹","&hfr;":"𝔥","&hksearow;":"⤥","&hkswarow;":"⤦","&hoarr;":"⇿","&homtht;":"∻","&hookleftarrow;":"↩","&hookrightarrow;":"↪","&hopf;":"𝕙","&horbar;":"―","&hscr;":"𝒽","&hslash;":"ℏ","&hstrok;":"ħ","&hybull;":"⁃","&hyphen;":"‐","&iacute":"í","&iacute;":"í","&ic;":"⁣","&icirc":"î","&icirc;":"î","&icy;":"и","&iecy;":"е","&iexcl":"¡","&iexcl;":"¡","&iff;":"⇔","&ifr;":"𝔦","&igrave":"ì","&igrave;":"ì","&ii;":"ⅈ","&iiiint;":"⨌","&iiint;":"∭","&iinfin;":"⧜","&iiota;":"℩","&ijlig;":"ĳ","&imacr;":"ī","&image;":"ℑ","&imagline;":"ℐ","&imagpart;":"ℑ","&imath;":"ı","&imof;":"⊷","&imped;":"Ƶ","&in;":"∈","&incare;":"℅","&infin;":"∞","&infintie;":"⧝","&inodot;":"ı","&int;":"∫","&intcal;":"⊺","&integers;":"ℤ","&intercal;":"⊺","&intlarhk;":"⨗","&intprod;":"⨼","&iocy;":"ё","&iogon;":"į","&iopf;":"𝕚","&iota;":"ι","&iprod;":"⨼","&iquest":"¿","&iquest;":"¿","&iscr;":"𝒾","&isin;":"∈","&isinE;":"⋹","&isindot;":"⋵","&isins;":"⋴","&isinsv;":"⋳","&isinv;":"∈","&it;":"⁢","&itilde;":"ĩ","&iukcy;":"і","&iuml":"ï","&iuml;":"ï","&jcirc;":"ĵ","&jcy;":"й","&jfr;":"𝔧","&jmath;":"ȷ","&jopf;":"𝕛","&jscr;":"𝒿","&jsercy;":"ј","&jukcy;":"є","&kappa;":"κ","&kappav;":"ϰ","&kcedil;":"ķ","&kcy;":"к","&kfr;":"𝔨","&kgreen;":"ĸ","&khcy;":"х","&kjcy;":"ќ","&kopf;":"𝕜","&kscr;":"𝓀","&lAarr;":"⇚","&lArr;":"⇐","&lAtail;":"⤛","&lBarr;":"⤎","&lE;":"≦","&lEg;":"⪋","&lHar;":"⥢","&lacute;":"ĺ","&laemptyv;":"⦴","&lagran;":"ℒ","&lambda;":"λ","&lang;":"⟨","&langd;":"⦑","&langle;":"⟨","&lap;":"⪅","&laquo":"«","&laquo;":"«","&larr;":"←","&larrb;":"⇤","&larrbfs;":"⤟","&larrfs;":"⤝","&larrhk;":"↩","&larrlp;":"↫","&larrpl;":"⤹","&larrsim;":"⥳","&larrtl;":"↢","&lat;":"⪫","&latail;":"⤙","&late;":"⪭","&lates;":"⪭︀","&lbarr;":"⤌","&lbbrk;":"❲","&lbrace;":"{","&lbrack;":"[","&lbrke;":"⦋","&lbrksld;":"⦏","&lbrkslu;":"⦍","&lcaron;":"ľ","&lcedil;":"ļ","&lceil;":"⌈","&lcub;":"{","&lcy;":"л","&ldca;":"⤶","&ldquo;":"“","&ldquor;":"„","&ldrdhar;":"⥧","&ldrushar;":"⥋","&ldsh;":"↲","&le;":"≤","&leftarrow;":"←","&leftarrowtail;":"↢","&leftharpoondown;":"↽","&leftharpoonup;":"↼","&leftleftarrows;":"⇇","&leftrightarrow;":"↔","&leftrightarrows;":"⇆","&leftrightharpoons;":"⇋","&leftrightsquigarrow;":"↭","&leftthreetimes;":"⋋","&leg;":"⋚","&leq;":"≤","&leqq;":"≦","&leqslant;":"⩽","&les;":"⩽","&lescc;":"⪨","&lesdot;":"⩿","&lesdoto;":"⪁","&lesdotor;":"⪃","&lesg;":"⋚︀","&lesges;":"⪓","&lessapprox;":"⪅","&lessdot;":"⋖","&lesseqgtr;":"⋚","&lesseqqgtr;":"⪋","&lessgtr;":"≶","&lesssim;":"≲","&lfisht;":"⥼","&lfloor;":"⌊","&lfr;":"𝔩","&lg;":"≶","&lgE;":"⪑","&lhard;":"↽","&lharu;":"↼","&lharul;":"⥪","&lhblk;":"▄","&ljcy;":"љ","&ll;":"≪","&llarr;":"⇇","&llcorner;":"⌞","&llhard;":"⥫","&lltri;":"◺","&lmidot;":"ŀ","&lmoust;":"⎰","&lmoustache;":"⎰","&lnE;":"≨","&lnap;":"⪉","&lnapprox;":"⪉","&lne;":"⪇","&lneq;":"⪇","&lneqq;":"≨","&lnsim;":"⋦","&loang;":"⟬","&loarr;":"⇽","&lobrk;":"⟦","&longleftarrow;":"⟵","&longleftrightarrow;":"⟷","&longmapsto;":"⟼","&longrightarrow;":"⟶","&looparrowleft;":"↫","&looparrowright;":"↬","&lopar;":"⦅","&lopf;":"𝕝","&loplus;":"⨭","&lotimes;":"⨴","&lowast;":"∗","&lowbar;":"_","&loz;":"◊","&lozenge;":"◊","&lozf;":"⧫","&lpar;":"(","&lparlt;":"⦓","&lrarr;":"⇆","&lrcorner;":"⌟","&lrhar;":"⇋","&lrhard;":"⥭","&lrm;":"‎","&lrtri;":"⊿","&lsaquo;":"‹","&lscr;":"𝓁","&lsh;":"↰","&lsim;":"≲","&lsime;":"⪍","&lsimg;":"⪏","&lsqb;":"[","&lsquo;":"‘","&lsquor;":"‚","&lstrok;":"ł","&lt":"<","&lt;":"<","&ltcc;":"⪦","&ltcir;":"⩹","&ltdot;":"⋖","&lthree;":"⋋","&ltimes;":"⋉","&ltlarr;":"⥶","&ltquest;":"⩻","&ltrPar;":"⦖","&ltri;":"◃","&ltrie;":"⊴","&ltrif;":"◂","&lurdshar;":"⥊","&luruhar;":"⥦","&lvertneqq;":"≨︀","&lvnE;":"≨︀","&mDDot;":"∺","&macr":"¯","&macr;":"¯","&male;":"♂","&malt;":"✠","&maltese;":"✠","&map;":"↦","&mapsto;":"↦","&mapstodown;":"↧","&mapstoleft;":"↤","&mapstoup;":"↥","&marker;":"▮","&mcomma;":"⨩","&mcy;":"м","&mdash;":"—","&measuredangle;":"∡","&mfr;":"𝔪","&mho;":"℧","&micro":"µ","&micro;":"µ","&mid;":"∣","&midast;":"*","&midcir;":"⫰","&middot":"·","&middot;":"·","&minus;":"−","&minusb;":"⊟","&minusd;":"∸","&minusdu;":"⨪","&mlcp;":"⫛","&mldr;":"…","&mnplus;":"∓","&models;":"⊧","&mopf;":"𝕞","&mp;":"∓","&mscr;":"𝓂","&mstpos;":"∾","&mu;":"μ","&multimap;":"⊸","&mumap;":"⊸","&nGg;":"⋙̸","&nGt;":"≫⃒","&nGtv;":"≫̸","&nLeftarrow;":"⇍","&nLeftrightarrow;":"⇎","&nLl;":"⋘̸","&nLt;":"≪⃒","&nLtv;":"≪̸","&nRightarrow;":"⇏","&nVDash;":"⊯","&nVdash;":"⊮","&nabla;":"∇","&nacute;":"ń","&nang;":"∠⃒","&nap;":"≉","&napE;":"⩰̸","&napid;":"≋̸","&napos;":"ŉ","&napprox;":"≉","&natur;":"♮","&natural;":"♮","&naturals;":"ℕ","&nbsp":" ","&nbsp;":" ","&nbump;":"≎̸","&nbumpe;":"≏̸","&ncap;":"⩃","&ncaron;":"ň","&ncedil;":"ņ","&ncong;":"≇","&ncongdot;":"⩭̸","&ncup;":"⩂","&ncy;":"н","&ndash;":"–","&ne;":"≠","&neArr;":"⇗","&nearhk;":"⤤","&nearr;":"↗","&nearrow;":"↗","&nedot;":"≐̸","&nequiv;":"≢","&nesear;":"⤨","&nesim;":"≂̸","&nexist;":"∄","&nexists;":"∄","&nfr;":"𝔫","&ngE;":"≧̸","&nge;":"≱","&ngeq;":"≱","&ngeqq;":"≧̸","&ngeqslant;":"⩾̸","&nges;":"⩾̸","&ngsim;":"≵","&ngt;":"≯","&ngtr;":"≯","&nhArr;":"⇎","&nharr;":"↮","&nhpar;":"⫲","&ni;":"∋","&nis;":"⋼","&nisd;":"⋺","&niv;":"∋","&njcy;":"њ","&nlArr;":"⇍","&nlE;":"≦̸","&nlarr;":"↚","&nldr;":"‥","&nle;":"≰","&nleftarrow;":"↚","&nleftrightarrow;":"↮","&nleq;":"≰","&nleqq;":"≦̸","&nleqslant;":"⩽̸","&nles;":"⩽̸","&nless;":"≮","&nlsim;":"≴","&nlt;":"≮","&nltri;":"⋪","&nltrie;":"⋬","&nmid;":"∤","&nopf;":"𝕟","&not":"¬","&not;":"¬","&notin;":"∉","&notinE;":"⋹̸","&notindot;":"⋵̸","&notinva;":"∉","&notinvb;":"⋷","&notinvc;":"⋶","&notni;":"∌","&notniva;":"∌","&notnivb;":"⋾","&notnivc;":"⋽","&npar;":"∦","&nparallel;":"∦","&nparsl;":"⫽⃥","&npart;":"∂̸","&npolint;":"⨔","&npr;":"⊀","&nprcue;":"⋠","&npre;":"⪯̸","&nprec;":"⊀","&npreceq;":"⪯̸","&nrArr;":"⇏","&nrarr;":"↛","&nrarrc;":"⤳̸","&nrarrw;":"↝̸","&nrightarrow;":"↛","&nrtri;":"⋫","&nrtrie;":"⋭","&nsc;":"⊁","&nsccue;":"⋡","&nsce;":"⪰̸","&nscr;":"𝓃","&nshortmid;":"∤","&nshortparallel;":"∦","&nsim;":"≁","&nsime;":"≄","&nsimeq;":"≄","&nsmid;":"∤","&nspar;":"∦","&nsqsube;":"⋢","&nsqsupe;":"⋣","&nsub;":"⊄","&nsubE;":"⫅̸","&nsube;":"⊈","&nsubset;":"⊂⃒","&nsubseteq;":"⊈","&nsubseteqq;":"⫅̸","&nsucc;":"⊁","&nsucceq;":"⪰̸","&nsup;":"⊅","&nsupE;":"⫆̸","&nsupe;":"⊉","&nsupset;":"⊃⃒","&nsupseteq;":"⊉","&nsupseteqq;":"⫆̸","&ntgl;":"≹","&ntilde":"ñ","&ntilde;":"ñ","&ntlg;":"≸","&ntriangleleft;":"⋪","&ntrianglelefteq;":"⋬","&ntriangleright;":"⋫","&ntrianglerighteq;":"⋭","&nu;":"ν","&num;":"#","&numero;":"№","&numsp;":" ","&nvDash;":"⊭","&nvHarr;":"⤄","&nvap;":"≍⃒","&nvdash;":"⊬","&nvge;":"≥⃒","&nvgt;":">⃒","&nvinfin;":"⧞","&nvlArr;":"⤂","&nvle;":"≤⃒","&nvlt;":"<⃒","&nvltrie;":"⊴⃒","&nvrArr;":"⤃","&nvrtrie;":"⊵⃒","&nvsim;":"∼⃒","&nwArr;":"⇖","&nwarhk;":"⤣","&nwarr;":"↖","&nwarrow;":"↖","&nwnear;":"⤧","&oS;":"Ⓢ","&oacute":"ó","&oacute;":"ó","&oast;":"⊛","&ocir;":"⊚","&ocirc":"ô","&ocirc;":"ô","&ocy;":"о","&odash;":"⊝","&odblac;":"ő","&odiv;":"⨸","&odot;":"⊙","&odsold;":"⦼","&oelig;":"œ","&ofcir;":"⦿","&ofr;":"𝔬","&ogon;":"˛","&ograve":"ò","&ograve;":"ò","&ogt;":"⧁","&ohbar;":"⦵","&ohm;":"Ω","&oint;":"∮","&olarr;":"↺","&olcir;":"⦾","&olcross;":"⦻","&oline;":"‾","&olt;":"⧀","&omacr;":"ō","&omega;":"ω","&omicron;":"ο","&omid;":"⦶","&ominus;":"⊖","&oopf;":"𝕠","&opar;":"⦷","&operp;":"⦹","&oplus;":"⊕","&or;":"∨","&orarr;":"↻","&ord;":"⩝","&order;":"ℴ","&orderof;":"ℴ","&ordf":"ª","&ordf;":"ª","&ordm":"º","&ordm;":"º","&origof;":"⊶","&oror;":"⩖","&orslope;":"⩗","&orv;":"⩛","&oscr;":"ℴ","&oslash":"ø","&oslash;":"ø","&osol;":"⊘","&otilde":"õ","&otilde;":"õ","&otimes;":"⊗","&otimesas;":"⨶","&ouml":"ö","&ouml;":"ö","&ovbar;":"⌽","&par;":"∥","&para":"¶","&para;":"¶","&parallel;":"∥","&parsim;":"⫳","&parsl;":"⫽","&part;":"∂","&pcy;":"п","&percnt;":"%","&period;":".","&permil;":"‰","&perp;":"⊥","&pertenk;":"‱","&pfr;":"𝔭","&phi;":"φ","&phiv;":"ϕ","&phmmat;":"ℳ","&phone;":"☎","&pi;":"π","&pitchfork;":"⋔","&piv;":"ϖ","&planck;":"ℏ","&planckh;":"ℎ","&plankv;":"ℏ","&plus;":"+","&plusacir;":"⨣","&plusb;":"⊞","&pluscir;":"⨢","&plusdo;":"∔","&plusdu;":"⨥","&pluse;":"⩲","&plusmn":"±","&plusmn;":"±","&plussim;":"⨦","&plustwo;":"⨧","&pm;":"±","&pointint;":"⨕","&popf;":"𝕡","&pound":"£","&pound;":"£","&pr;":"≺","&prE;":"⪳","&prap;":"⪷","&prcue;":"≼","&pre;":"⪯","&prec;":"≺","&precapprox;":"⪷","&preccurlyeq;":"≼","&preceq;":"⪯","&precnapprox;":"⪹","&precneqq;":"⪵","&precnsim;":"⋨","&precsim;":"≾","&prime;":"′","&primes;":"ℙ","&prnE;":"⪵","&prnap;":"⪹","&prnsim;":"⋨","&prod;":"∏","&profalar;":"⌮","&profline;":"⌒","&profsurf;":"⌓","&prop;":"∝","&propto;":"∝","&prsim;":"≾","&prurel;":"⊰","&pscr;":"𝓅","&psi;":"ψ","&puncsp;":" ","&qfr;":"𝔮","&qint;":"⨌","&qopf;":"𝕢","&qprime;":"⁗","&qscr;":"𝓆","&quaternions;":"ℍ","&quatint;":"⨖","&quest;":"?","&questeq;":"≟","&quot":'"',"&quot;":'"',"&rAarr;":"⇛","&rArr;":"⇒","&rAtail;":"⤜","&rBarr;":"⤏","&rHar;":"⥤","&race;":"∽̱","&racute;":"ŕ","&radic;":"√","&raemptyv;":"⦳","&rang;":"⟩","&rangd;":"⦒","&range;":"⦥","&rangle;":"⟩","&raquo":"»","&raquo;":"»","&rarr;":"→","&rarrap;":"⥵","&rarrb;":"⇥","&rarrbfs;":"⤠","&rarrc;":"⤳","&rarrfs;":"⤞","&rarrhk;":"↪","&rarrlp;":"↬","&rarrpl;":"⥅","&rarrsim;":"⥴","&rarrtl;":"↣","&rarrw;":"↝","&ratail;":"⤚","&ratio;":"∶","&rationals;":"ℚ","&rbarr;":"⤍","&rbbrk;":"❳","&rbrace;":"}","&rbrack;":"]","&rbrke;":"⦌","&rbrksld;":"⦎","&rbrkslu;":"⦐","&rcaron;":"ř","&rcedil;":"ŗ","&rceil;":"⌉","&rcub;":"}","&rcy;":"р","&rdca;":"⤷","&rdldhar;":"⥩","&rdquo;":"”","&rdquor;":"”","&rdsh;":"↳","&real;":"ℜ","&realine;":"ℛ","&realpart;":"ℜ","&reals;":"ℝ","&rect;":"▭","&reg":"®","&reg;":"®","&rfisht;":"⥽","&rfloor;":"⌋","&rfr;":"𝔯","&rhard;":"⇁","&rharu;":"⇀","&rharul;":"⥬","&rho;":"ρ","&rhov;":"ϱ","&rightarrow;":"→","&rightarrowtail;":"↣","&rightharpoondown;":"⇁","&rightharpoonup;":"⇀","&rightleftarrows;":"⇄","&rightleftharpoons;":"⇌","&rightrightarrows;":"⇉","&rightsquigarrow;":"↝","&rightthreetimes;":"⋌","&ring;":"˚","&risingdotseq;":"≓","&rlarr;":"⇄","&rlhar;":"⇌","&rlm;":"‏","&rmoust;":"⎱","&rmoustache;":"⎱","&rnmid;":"⫮","&roang;":"⟭","&roarr;":"⇾","&robrk;":"⟧","&ropar;":"⦆","&ropf;":"𝕣","&roplus;":"⨮","&rotimes;":"⨵","&rpar;":")","&rpargt;":"⦔","&rppolint;":"⨒","&rrarr;":"⇉","&rsaquo;":"›","&rscr;":"𝓇","&rsh;":"↱","&rsqb;":"]","&rsquo;":"’","&rsquor;":"’","&rthree;":"⋌","&rtimes;":"⋊","&rtri;":"▹","&rtrie;":"⊵","&rtrif;":"▸","&rtriltri;":"⧎","&ruluhar;":"⥨","&rx;":"℞","&sacute;":"ś","&sbquo;":"‚","&sc;":"≻","&scE;":"⪴","&scap;":"⪸","&scaron;":"š","&sccue;":"≽","&sce;":"⪰","&scedil;":"ş","&scirc;":"ŝ","&scnE;":"⪶","&scnap;":"⪺","&scnsim;":"⋩","&scpolint;":"⨓","&scsim;":"≿","&scy;":"с","&sdot;":"⋅","&sdotb;":"⊡","&sdote;":"⩦","&seArr;":"⇘","&searhk;":"⤥","&searr;":"↘","&searrow;":"↘","&sect":"§","&sect;":"§","&semi;":";","&seswar;":"⤩","&setminus;":"∖","&setmn;":"∖","&sext;":"✶","&sfr;":"𝔰","&sfrown;":"⌢","&sharp;":"♯","&shchcy;":"щ","&shcy;":"ш","&shortmid;":"∣","&shortparallel;":"∥","&shy":"­","&shy;":"­","&sigma;":"σ","&sigmaf;":"ς","&sigmav;":"ς","&sim;":"∼","&simdot;":"⩪","&sime;":"≃","&simeq;":"≃","&simg;":"⪞","&simgE;":"⪠","&siml;":"⪝","&simlE;":"⪟","&simne;":"≆","&simplus;":"⨤","&simrarr;":"⥲","&slarr;":"←","&smallsetminus;":"∖","&smashp;":"⨳","&smeparsl;":"⧤","&smid;":"∣","&smile;":"⌣","&smt;":"⪪","&smte;":"⪬","&smtes;":"⪬︀","&softcy;":"ь","&sol;":"/","&solb;":"⧄","&solbar;":"⌿","&sopf;":"𝕤","&spades;":"♠","&spadesuit;":"♠","&spar;":"∥","&sqcap;":"⊓","&sqcaps;":"⊓︀","&sqcup;":"⊔","&sqcups;":"⊔︀","&sqsub;":"⊏","&sqsube;":"⊑","&sqsubset;":"⊏","&sqsubseteq;":"⊑","&sqsup;":"⊐","&sqsupe;":"⊒","&sqsupset;":"⊐","&sqsupseteq;":"⊒","&squ;":"□","&square;":"□","&squarf;":"▪","&squf;":"▪","&srarr;":"→","&sscr;":"𝓈","&ssetmn;":"∖","&ssmile;":"⌣","&sstarf;":"⋆","&star;":"☆","&starf;":"★","&straightepsilon;":"ϵ","&straightphi;":"ϕ","&strns;":"¯","&sub;":"⊂","&subE;":"⫅","&subdot;":"⪽","&sube;":"⊆","&subedot;":"⫃","&submult;":"⫁","&subnE;":"⫋","&subne;":"⊊","&subplus;":"⪿","&subrarr;":"⥹","&subset;":"⊂","&subseteq;":"⊆","&subseteqq;":"⫅","&subsetneq;":"⊊","&subsetneqq;":"⫋","&subsim;":"⫇","&subsub;":"⫕","&subsup;":"⫓","&succ;":"≻","&succapprox;":"⪸","&succcurlyeq;":"≽","&succeq;":"⪰","&succnapprox;":"⪺","&succneqq;":"⪶","&succnsim;":"⋩","&succsim;":"≿","&sum;":"∑","&sung;":"♪","&sup1":"¹","&sup1;":"¹","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&sup;":"⊃","&supE;":"⫆","&supdot;":"⪾","&supdsub;":"⫘","&supe;":"⊇","&supedot;":"⫄","&suphsol;":"⟉","&suphsub;":"⫗","&suplarr;":"⥻","&supmult;":"⫂","&supnE;":"⫌","&supne;":"⊋","&supplus;":"⫀","&supset;":"⊃","&supseteq;":"⊇","&supseteqq;":"⫆","&supsetneq;":"⊋","&supsetneqq;":"⫌","&supsim;":"⫈","&supsub;":"⫔","&supsup;":"⫖","&swArr;":"⇙","&swarhk;":"⤦","&swarr;":"↙","&swarrow;":"↙","&swnwar;":"⤪","&szlig":"ß","&szlig;":"ß","&target;":"⌖","&tau;":"τ","&tbrk;":"⎴","&tcaron;":"ť","&tcedil;":"ţ","&tcy;":"т","&tdot;":"⃛","&telrec;":"⌕","&tfr;":"𝔱","&there4;":"∴","&therefore;":"∴","&theta;":"θ","&thetasym;":"ϑ","&thetav;":"ϑ","&thickapprox;":"≈","&thicksim;":"∼","&thinsp;":" ","&thkap;":"≈","&thksim;":"∼","&thorn":"þ","&thorn;":"þ","&tilde;":"˜","&times":"×","&times;":"×","&timesb;":"⊠","&timesbar;":"⨱","&timesd;":"⨰","&tint;":"∭","&toea;":"⤨","&top;":"⊤","&topbot;":"⌶","&topcir;":"⫱","&topf;":"𝕥","&topfork;":"⫚","&tosa;":"⤩","&tprime;":"‴","&trade;":"™","&triangle;":"▵","&triangledown;":"▿","&triangleleft;":"◃","&trianglelefteq;":"⊴","&triangleq;":"≜","&triangleright;":"▹","&trianglerighteq;":"⊵","&tridot;":"◬","&trie;":"≜","&triminus;":"⨺","&triplus;":"⨹","&trisb;":"⧍","&tritime;":"⨻","&trpezium;":"⏢","&tscr;":"𝓉","&tscy;":"ц","&tshcy;":"ћ","&tstrok;":"ŧ","&twixt;":"≬","&twoheadleftarrow;":"↞","&twoheadrightarrow;":"↠","&uArr;":"⇑","&uHar;":"⥣","&uacute":"ú","&uacute;":"ú","&uarr;":"↑","&ubrcy;":"ў","&ubreve;":"ŭ","&ucirc":"û","&ucirc;":"û","&ucy;":"у","&udarr;":"⇅","&udblac;":"ű","&udhar;":"⥮","&ufisht;":"⥾","&ufr;":"𝔲","&ugrave":"ù","&ugrave;":"ù","&uharl;":"↿","&uharr;":"↾","&uhblk;":"▀","&ulcorn;":"⌜","&ulcorner;":"⌜","&ulcrop;":"⌏","&ultri;":"◸","&umacr;":"ū","&uml":"¨","&uml;":"¨","&uogon;":"ų","&uopf;":"𝕦","&uparrow;":"↑","&updownarrow;":"↕","&upharpoonleft;":"↿","&upharpoonright;":"↾","&uplus;":"⊎","&upsi;":"υ","&upsih;":"ϒ","&upsilon;":"υ","&upuparrows;":"⇈","&urcorn;":"⌝","&urcorner;":"⌝","&urcrop;":"⌎","&uring;":"ů","&urtri;":"◹","&uscr;":"𝓊","&utdot;":"⋰","&utilde;":"ũ","&utri;":"▵","&utrif;":"▴","&uuarr;":"⇈","&uuml":"ü","&uuml;":"ü","&uwangle;":"⦧","&vArr;":"⇕","&vBar;":"⫨","&vBarv;":"⫩","&vDash;":"⊨","&vangrt;":"⦜","&varepsilon;":"ϵ","&varkappa;":"ϰ","&varnothing;":"∅","&varphi;":"ϕ","&varpi;":"ϖ","&varpropto;":"∝","&varr;":"↕","&varrho;":"ϱ","&varsigma;":"ς","&varsubsetneq;":"⊊︀","&varsubsetneqq;":"⫋︀","&varsupsetneq;":"⊋︀","&varsupsetneqq;":"⫌︀","&vartheta;":"ϑ","&vartriangleleft;":"⊲","&vartriangleright;":"⊳","&vcy;":"в","&vdash;":"⊢","&vee;":"∨","&veebar;":"⊻","&veeeq;":"≚","&vellip;":"⋮","&verbar;":"|","&vert;":"|","&vfr;":"𝔳","&vltri;":"⊲","&vnsub;":"⊂⃒","&vnsup;":"⊃⃒","&vopf;":"𝕧","&vprop;":"∝","&vrtri;":"⊳","&vscr;":"𝓋","&vsubnE;":"⫋︀","&vsubne;":"⊊︀","&vsupnE;":"⫌︀","&vsupne;":"⊋︀","&vzigzag;":"⦚","&wcirc;":"ŵ","&wedbar;":"⩟","&wedge;":"∧","&wedgeq;":"≙","&weierp;":"℘","&wfr;":"𝔴","&wopf;":"𝕨","&wp;":"℘","&wr;":"≀","&wreath;":"≀","&wscr;":"𝓌","&xcap;":"⋂","&xcirc;":"◯","&xcup;":"⋃","&xdtri;":"▽","&xfr;":"𝔵","&xhArr;":"⟺","&xharr;":"⟷","&xi;":"ξ","&xlArr;":"⟸","&xlarr;":"⟵","&xmap;":"⟼","&xnis;":"⋻","&xodot;":"⨀","&xopf;":"𝕩","&xoplus;":"⨁","&xotime;":"⨂","&xrArr;":"⟹","&xrarr;":"⟶","&xscr;":"𝓍","&xsqcup;":"⨆","&xuplus;":"⨄","&xutri;":"△","&xvee;":"⋁","&xwedge;":"⋀","&yacute":"ý","&yacute;":"ý","&yacy;":"я","&ycirc;":"ŷ","&ycy;":"ы","&yen":"¥","&yen;":"¥","&yfr;":"𝔶","&yicy;":"ї","&yopf;":"𝕪","&yscr;":"𝓎","&yucy;":"ю","&yuml":"ÿ","&yuml;":"ÿ","&zacute;":"ź","&zcaron;":"ž","&zcy;":"з","&zdot;":"ż","&zeetrf;":"ℨ","&zeta;":"ζ","&zfr;":"𝔷","&zhcy;":"ж","&zigrarr;":"⇝","&zopf;":"𝕫","&zscr;":"𝓏","&zwj;":"‍","&zwnj;":"‌"},characters:{"Æ":"&AElig;","&":"&amp;","Á":"&Aacute;","Ă":"&Abreve;","Â":"&Acirc;","А":"&Acy;","𝔄":"&Afr;","À":"&Agrave;","Α":"&Alpha;","Ā":"&Amacr;","⩓":"&And;","Ą":"&Aogon;","𝔸":"&Aopf;","⁡":"&af;","Å":"&angst;","𝒜":"&Ascr;","≔":"&coloneq;","Ã":"&Atilde;","Ä":"&Auml;","∖":"&ssetmn;","⫧":"&Barv;","⌆":"&doublebarwedge;","Б":"&Bcy;","∵":"&because;","ℬ":"&bernou;","Β":"&Beta;","𝔅":"&Bfr;","𝔹":"&Bopf;","˘":"&breve;","≎":"&bump;","Ч":"&CHcy;","©":"&copy;","Ć":"&Cacute;","⋒":"&Cap;","ⅅ":"&DD;","ℭ":"&Cfr;","Č":"&Ccaron;","Ç":"&Ccedil;","Ĉ":"&Ccirc;","∰":"&Cconint;","Ċ":"&Cdot;","¸":"&cedil;","·":"&middot;","Χ":"&Chi;","⊙":"&odot;","⊖":"&ominus;","⊕":"&oplus;","⊗":"&otimes;","∲":"&cwconint;","”":"&rdquor;","’":"&rsquor;","∷":"&Proportion;","⩴":"&Colone;","≡":"&equiv;","∯":"&DoubleContourIntegral;","∮":"&oint;","ℂ":"&complexes;","∐":"&coprod;","∳":"&awconint;","⨯":"&Cross;","𝒞":"&Cscr;","⋓":"&Cup;","≍":"&asympeq;","⤑":"&DDotrahd;","Ђ":"&DJcy;","Ѕ":"&DScy;","Џ":"&DZcy;","‡":"&ddagger;","↡":"&Darr;","⫤":"&DoubleLeftTee;","Ď":"&Dcaron;","Д":"&Dcy;","∇":"&nabla;","Δ":"&Delta;","𝔇":"&Dfr;","´":"&acute;","˙":"&dot;","˝":"&dblac;","`":"&grave;","˜":"&tilde;","⋄":"&diamond;","ⅆ":"&dd;","𝔻":"&Dopf;","¨":"&uml;","⃜":"&DotDot;","≐":"&esdot;","⇓":"&dArr;","⇐":"&lArr;","⇔":"&iff;","⟸":"&xlArr;","⟺":"&xhArr;","⟹":"&xrArr;","⇒":"&rArr;","⊨":"&vDash;","⇑":"&uArr;","⇕":"&vArr;","∥":"&spar;","↓":"&downarrow;","⤓":"&DownArrowBar;","⇵":"&duarr;","̑":"&DownBreve;","⥐":"&DownLeftRightVector;","⥞":"&DownLeftTeeVector;","↽":"&lhard;","⥖":"&DownLeftVectorBar;","⥟":"&DownRightTeeVector;","⇁":"&rightharpoondown;","⥗":"&DownRightVectorBar;","⊤":"&top;","↧":"&mapstodown;","𝒟":"&Dscr;","Đ":"&Dstrok;","Ŋ":"&ENG;","Ð":"&ETH;","É":"&Eacute;","Ě":"&Ecaron;","Ê":"&Ecirc;","Э":"&Ecy;","Ė":"&Edot;","𝔈":"&Efr;","È":"&Egrave;","∈":"&isinv;","Ē":"&Emacr;","◻":"&EmptySmallSquare;","▫":"&EmptyVerySmallSquare;","Ę":"&Eogon;","𝔼":"&Eopf;","Ε":"&Epsilon;","⩵":"&Equal;","≂":"&esim;","⇌":"&rlhar;","ℰ":"&expectation;","⩳":"&Esim;","Η":"&Eta;","Ë":"&Euml;","∃":"&exist;","ⅇ":"&exponentiale;","Ф":"&Fcy;","𝔉":"&Ffr;","◼":"&FilledSmallSquare;","▪":"&squf;","𝔽":"&Fopf;","∀":"&forall;","ℱ":"&Fscr;","Ѓ":"&GJcy;",">":"&gt;","Γ":"&Gamma;","Ϝ":"&Gammad;","Ğ":"&Gbreve;","Ģ":"&Gcedil;","Ĝ":"&Gcirc;","Г":"&Gcy;","Ġ":"&Gdot;","𝔊":"&Gfr;","⋙":"&ggg;","𝔾":"&Gopf;","≥":"&geq;","⋛":"&gtreqless;","≧":"&geqq;","⪢":"&GreaterGreater;","≷":"&gtrless;","⩾":"&ges;","≳":"&gtrsim;","𝒢":"&Gscr;","≫":"&gg;","Ъ":"&HARDcy;","ˇ":"&caron;","^":"&Hat;","Ĥ":"&Hcirc;","ℌ":"&Poincareplane;","ℋ":"&hamilt;","ℍ":"&quaternions;","─":"&boxh;","Ħ":"&Hstrok;","≏":"&bumpeq;","Е":"&IEcy;","Ĳ":"&IJlig;","Ё":"&IOcy;","Í":"&Iacute;","Î":"&Icirc;","И":"&Icy;","İ":"&Idot;","ℑ":"&imagpart;","Ì":"&Igrave;","Ī":"&Imacr;","ⅈ":"&ii;","∬":"&Int;","∫":"&int;","⋂":"&xcap;","⁣":"&ic;","⁢":"&it;","Į":"&Iogon;","𝕀":"&Iopf;","Ι":"&Iota;","ℐ":"&imagline;","Ĩ":"&Itilde;","І":"&Iukcy;","Ï":"&Iuml;","Ĵ":"&Jcirc;","Й":"&Jcy;","𝔍":"&Jfr;","𝕁":"&Jopf;","𝒥":"&Jscr;","Ј":"&Jsercy;","Є":"&Jukcy;","Х":"&KHcy;","Ќ":"&KJcy;","Κ":"&Kappa;","Ķ":"&Kcedil;","К":"&Kcy;","𝔎":"&Kfr;","𝕂":"&Kopf;","𝒦":"&Kscr;","Љ":"&LJcy;","<":"&lt;","Ĺ":"&Lacute;","Λ":"&Lambda;","⟪":"&Lang;","ℒ":"&lagran;","↞":"&twoheadleftarrow;","Ľ":"&Lcaron;","Ļ":"&Lcedil;","Л":"&Lcy;","⟨":"&langle;","←":"&slarr;","⇤":"&larrb;","⇆":"&lrarr;","⌈":"&lceil;","⟦":"&lobrk;","⥡":"&LeftDownTeeVector;","⇃":"&downharpoonleft;","⥙":"&LeftDownVectorBar;","⌊":"&lfloor;","↔":"&leftrightarrow;","⥎":"&LeftRightVector;","⊣":"&dashv;","↤":"&mapstoleft;","⥚":"&LeftTeeVector;","⊲":"&vltri;","⧏":"&LeftTriangleBar;","⊴":"&trianglelefteq;","⥑":"&LeftUpDownVector;","⥠":"&LeftUpTeeVector;","↿":"&upharpoonleft;","⥘":"&LeftUpVectorBar;","↼":"&lharu;","⥒":"&LeftVectorBar;","⋚":"&lesseqgtr;","≦":"&leqq;","≶":"&lg;","⪡":"&LessLess;","⩽":"&les;","≲":"&lsim;","𝔏":"&Lfr;","⋘":"&Ll;","⇚":"&lAarr;","Ŀ":"&Lmidot;","⟵":"&xlarr;","⟷":"&xharr;","⟶":"&xrarr;","𝕃":"&Lopf;","↙":"&swarrow;","↘":"&searrow;","↰":"&lsh;","Ł":"&Lstrok;","≪":"&ll;","⤅":"&Map;","М":"&Mcy;"," ":"&MediumSpace;","ℳ":"&phmmat;","𝔐":"&Mfr;","∓":"&mp;","𝕄":"&Mopf;","Μ":"&Mu;","Њ":"&NJcy;","Ń":"&Nacute;","Ň":"&Ncaron;","Ņ":"&Ncedil;","Н":"&Ncy;","​":"&ZeroWidthSpace;","\n":"&NewLine;","𝔑":"&Nfr;","⁠":"&NoBreak;"," ":"&nbsp;","ℕ":"&naturals;","⫬":"&Not;","≢":"&nequiv;","≭":"&NotCupCap;","∦":"&nspar;","∉":"&notinva;","≠":"&ne;","≂̸":"&nesim;","∄":"&nexists;","≯":"&ngtr;","≱":"&ngeq;","≧̸":"&ngeqq;","≫̸":"&nGtv;","≹":"&ntgl;","⩾̸":"&nges;","≵":"&ngsim;","≎̸":"&nbump;","≏̸":"&nbumpe;","⋪":"&ntriangleleft;","⧏̸":"&NotLeftTriangleBar;","⋬":"&ntrianglelefteq;","≮":"&nlt;","≰":"&nleq;","≸":"&ntlg;","≪̸":"&nLtv;","⩽̸":"&nles;","≴":"&nlsim;","⪢̸":"&NotNestedGreaterGreater;","⪡̸":"&NotNestedLessLess;","⊀":"&nprec;","⪯̸":"&npreceq;","⋠":"&nprcue;","∌":"&notniva;","⋫":"&ntriangleright;","⧐̸":"&NotRightTriangleBar;","⋭":"&ntrianglerighteq;","⊏̸":"&NotSquareSubset;","⋢":"&nsqsube;","⊐̸":"&NotSquareSuperset;","⋣":"&nsqsupe;","⊂⃒":"&vnsub;","⊈":"&nsubseteq;","⊁":"&nsucc;","⪰̸":"&nsucceq;","⋡":"&nsccue;","≿̸":"&NotSucceedsTilde;","⊃⃒":"&vnsup;","⊉":"&nsupseteq;","≁":"&nsim;","≄":"&nsimeq;","≇":"&ncong;","≉":"&napprox;","∤":"&nsmid;","𝒩":"&Nscr;","Ñ":"&Ntilde;","Ν":"&Nu;","Œ":"&OElig;","Ó":"&Oacute;","Ô":"&Ocirc;","О":"&Ocy;","Ő":"&Odblac;","𝔒":"&Ofr;","Ò":"&Ograve;","Ō":"&Omacr;","Ω":"&ohm;","Ο":"&Omicron;","𝕆":"&Oopf;","“":"&ldquo;","‘":"&lsquo;","⩔":"&Or;","𝒪":"&Oscr;","Ø":"&Oslash;","Õ":"&Otilde;","⨷":"&Otimes;","Ö":"&Ouml;","‾":"&oline;","⏞":"&OverBrace;","⎴":"&tbrk;","⏜":"&OverParenthesis;","∂":"&part;","П":"&Pcy;","𝔓":"&Pfr;","Φ":"&Phi;","Π":"&Pi;","±":"&pm;","ℙ":"&primes;","⪻":"&Pr;","≺":"&prec;","⪯":"&preceq;","≼":"&preccurlyeq;","≾":"&prsim;","″":"&Prime;","∏":"&prod;","∝":"&vprop;","𝒫":"&Pscr;","Ψ":"&Psi;",'"':"&quot;","𝔔":"&Qfr;","ℚ":"&rationals;","𝒬":"&Qscr;","⤐":"&drbkarow;","®":"&reg;","Ŕ":"&Racute;","⟫":"&Rang;","↠":"&twoheadrightarrow;","⤖":"&Rarrtl;","Ř":"&Rcaron;","Ŗ":"&Rcedil;","Р":"&Rcy;","ℜ":"&realpart;","∋":"&niv;","⇋":"&lrhar;","⥯":"&duhar;","Ρ":"&Rho;","⟩":"&rangle;","→":"&srarr;","⇥":"&rarrb;","⇄":"&rlarr;","⌉":"&rceil;","⟧":"&robrk;","⥝":"&RightDownTeeVector;","⇂":"&downharpoonright;","⥕":"&RightDownVectorBar;","⌋":"&rfloor;","⊢":"&vdash;","↦":"&mapsto;","⥛":"&RightTeeVector;","⊳":"&vrtri;","⧐":"&RightTriangleBar;","⊵":"&trianglerighteq;","⥏":"&RightUpDownVector;","⥜":"&RightUpTeeVector;","↾":"&upharpoonright;","⥔":"&RightUpVectorBar;","⇀":"&rightharpoonup;","⥓":"&RightVectorBar;","ℝ":"&reals;","⥰":"&RoundImplies;","⇛":"&rAarr;","ℛ":"&realine;","↱":"&rsh;","⧴":"&RuleDelayed;","Щ":"&SHCHcy;","Ш":"&SHcy;","Ь":"&SOFTcy;","Ś":"&Sacute;","⪼":"&Sc;","Š":"&Scaron;","Ş":"&Scedil;","Ŝ":"&Scirc;","С":"&Scy;","𝔖":"&Sfr;","↑":"&uparrow;","Σ":"&Sigma;","∘":"&compfn;","𝕊":"&Sopf;","√":"&radic;","□":"&square;","⊓":"&sqcap;","⊏":"&sqsubset;","⊑":"&sqsubseteq;","⊐":"&sqsupset;","⊒":"&sqsupseteq;","⊔":"&sqcup;","𝒮":"&Sscr;","⋆":"&sstarf;","⋐":"&Subset;","⊆":"&subseteq;","≻":"&succ;","⪰":"&succeq;","≽":"&succcurlyeq;","≿":"&succsim;","∑":"&sum;","⋑":"&Supset;","⊃":"&supset;","⊇":"&supseteq;","Þ":"&THORN;","™":"&trade;","Ћ":"&TSHcy;","Ц":"&TScy;","\t":"&Tab;","Τ":"&Tau;","Ť":"&Tcaron;","Ţ":"&Tcedil;","Т":"&Tcy;","𝔗":"&Tfr;","∴":"&therefore;","Θ":"&Theta;","  ":"&ThickSpace;"," ":"&thinsp;","∼":"&thksim;","≃":"&simeq;","≅":"&cong;","≈":"&thkap;","𝕋":"&Topf;","⃛":"&tdot;","𝒯":"&Tscr;","Ŧ":"&Tstrok;","Ú":"&Uacute;","↟":"&Uarr;","⥉":"&Uarrocir;","Ў":"&Ubrcy;","Ŭ":"&Ubreve;","Û":"&Ucirc;","У":"&Ucy;","Ű":"&Udblac;","𝔘":"&Ufr;","Ù":"&Ugrave;","Ū":"&Umacr;",_:"&lowbar;","⏟":"&UnderBrace;","⎵":"&bbrk;","⏝":"&UnderParenthesis;","⋃":"&xcup;","⊎":"&uplus;","Ų":"&Uogon;","𝕌":"&Uopf;","⤒":"&UpArrowBar;","⇅":"&udarr;","↕":"&varr;","⥮":"&udhar;","⊥":"&perp;","↥":"&mapstoup;","↖":"&nwarrow;","↗":"&nearrow;","ϒ":"&upsih;","Υ":"&Upsilon;","Ů":"&Uring;","𝒰":"&Uscr;","Ũ":"&Utilde;","Ü":"&Uuml;","⊫":"&VDash;","⫫":"&Vbar;","В":"&Vcy;","⊩":"&Vdash;","⫦":"&Vdashl;","⋁":"&xvee;","‖":"&Vert;","∣":"&smid;","|":"&vert;","❘":"&VerticalSeparator;","≀":"&wreath;"," ":"&hairsp;","𝔙":"&Vfr;","𝕍":"&Vopf;","𝒱":"&Vscr;","⊪":"&Vvdash;","Ŵ":"&Wcirc;","⋀":"&xwedge;","𝔚":"&Wfr;","𝕎":"&Wopf;","𝒲":"&Wscr;","𝔛":"&Xfr;","Ξ":"&Xi;","𝕏":"&Xopf;","𝒳":"&Xscr;","Я":"&YAcy;","Ї":"&YIcy;","Ю":"&YUcy;","Ý":"&Yacute;","Ŷ":"&Ycirc;","Ы":"&Ycy;","𝔜":"&Yfr;","𝕐":"&Yopf;","𝒴":"&Yscr;","Ÿ":"&Yuml;","Ж":"&ZHcy;","Ź":"&Zacute;","Ž":"&Zcaron;","З":"&Zcy;","Ż":"&Zdot;","Ζ":"&Zeta;","ℨ":"&zeetrf;","ℤ":"&integers;","𝒵":"&Zscr;","á":"&aacute;","ă":"&abreve;","∾":"&mstpos;","∾̳":"&acE;","∿":"&acd;","â":"&acirc;","а":"&acy;","æ":"&aelig;","𝔞":"&afr;","à":"&agrave;","ℵ":"&aleph;","α":"&alpha;","ā":"&amacr;","⨿":"&amalg;","∧":"&wedge;","⩕":"&andand;","⩜":"&andd;","⩘":"&andslope;","⩚":"&andv;","∠":"&angle;","⦤":"&ange;","∡":"&measuredangle;","⦨":"&angmsdaa;","⦩":"&angmsdab;","⦪":"&angmsdac;","⦫":"&angmsdad;","⦬":"&angmsdae;","⦭":"&angmsdaf;","⦮":"&angmsdag;","⦯":"&angmsdah;","∟":"&angrt;","⊾":"&angrtvb;","⦝":"&angrtvbd;","∢":"&angsph;","⍼":"&angzarr;","ą":"&aogon;","𝕒":"&aopf;","⩰":"&apE;","⩯":"&apacir;","≊":"&approxeq;","≋":"&apid;","'":"&apos;","å":"&aring;","𝒶":"&ascr;","*":"&midast;","ã":"&atilde;","ä":"&auml;","⨑":"&awint;","⫭":"&bNot;","≌":"&bcong;","϶":"&bepsi;","‵":"&bprime;","∽":"&bsim;","⋍":"&bsime;","⊽":"&barvee;","⌅":"&barwedge;","⎶":"&bbrktbrk;","б":"&bcy;","„":"&ldquor;","⦰":"&bemptyv;","β":"&beta;","ℶ":"&beth;","≬":"&twixt;","𝔟":"&bfr;","◯":"&xcirc;","⨀":"&xodot;","⨁":"&xoplus;","⨂":"&xotime;","⨆":"&xsqcup;","★":"&starf;","▽":"&xdtri;","△":"&xutri;","⨄":"&xuplus;","⤍":"&rbarr;","⧫":"&lozf;","▴":"&utrif;","▾":"&dtrif;","◂":"&ltrif;","▸":"&rtrif;","␣":"&blank;","▒":"&blk12;","░":"&blk14;","▓":"&blk34;","█":"&block;","=⃥":"&bne;","≡⃥":"&bnequiv;","⌐":"&bnot;","𝕓":"&bopf;","⋈":"&bowtie;","╗":"&boxDL;","╔":"&boxDR;","╖":"&boxDl;","╓":"&boxDr;","═":"&boxH;","╦":"&boxHD;","╩":"&boxHU;","╤":"&boxHd;","╧":"&boxHu;","╝":"&boxUL;","╚":"&boxUR;","╜":"&boxUl;","╙":"&boxUr;","║":"&boxV;","╬":"&boxVH;","╣":"&boxVL;","╠":"&boxVR;","╫":"&boxVh;","╢":"&boxVl;","╟":"&boxVr;","⧉":"&boxbox;","╕":"&boxdL;","╒":"&boxdR;","┐":"&boxdl;","┌":"&boxdr;","╥":"&boxhD;","╨":"&boxhU;","┬":"&boxhd;","┴":"&boxhu;","⊟":"&minusb;","⊞":"&plusb;","⊠":"&timesb;","╛":"&boxuL;","╘":"&boxuR;","┘":"&boxul;","└":"&boxur;","│":"&boxv;","╪":"&boxvH;","╡":"&boxvL;","╞":"&boxvR;","┼":"&boxvh;","┤":"&boxvl;","├":"&boxvr;","¦":"&brvbar;","𝒷":"&bscr;","⁏":"&bsemi;","\\":"&bsol;","⧅":"&bsolb;","⟈":"&bsolhsub;","•":"&bullet;","⪮":"&bumpE;","ć":"&cacute;","∩":"&cap;","⩄":"&capand;","⩉":"&capbrcup;","⩋":"&capcap;","⩇":"&capcup;","⩀":"&capdot;","∩︀":"&caps;","⁁":"&caret;","⩍":"&ccaps;","č":"&ccaron;","ç":"&ccedil;","ĉ":"&ccirc;","⩌":"&ccups;","⩐":"&ccupssm;","ċ":"&cdot;","⦲":"&cemptyv;","¢":"&cent;","𝔠":"&cfr;","ч":"&chcy;","✓":"&checkmark;","χ":"&chi;","○":"&cir;","⧃":"&cirE;","ˆ":"&circ;","≗":"&cire;","↺":"&olarr;","↻":"&orarr;","Ⓢ":"&oS;","⊛":"&oast;","⊚":"&ocir;","⊝":"&odash;","⨐":"&cirfnint;","⫯":"&cirmid;","⧂":"&cirscir;","♣":"&clubsuit;",":":"&colon;",",":"&comma;","@":"&commat;","∁":"&complement;","⩭":"&congdot;","𝕔":"&copf;","℗":"&copysr;","↵":"&crarr;","✗":"&cross;","𝒸":"&cscr;","⫏":"&csub;","⫑":"&csube;","⫐":"&csup;","⫒":"&csupe;","⋯":"&ctdot;","⤸":"&cudarrl;","⤵":"&cudarrr;","⋞":"&curlyeqprec;","⋟":"&curlyeqsucc;","↶":"&curvearrowleft;","⤽":"&cularrp;","∪":"&cup;","⩈":"&cupbrcap;","⩆":"&cupcap;","⩊":"&cupcup;","⊍":"&cupdot;","⩅":"&cupor;","∪︀":"&cups;","↷":"&curvearrowright;","⤼":"&curarrm;","⋎":"&cuvee;","⋏":"&cuwed;","¤":"&curren;","∱":"&cwint;","⌭":"&cylcty;","⥥":"&dHar;","†":"&dagger;","ℸ":"&daleth;","‐":"&hyphen;","⤏":"&rBarr;","ď":"&dcaron;","д":"&dcy;","⇊":"&downdownarrows;","⩷":"&eDDot;","°":"&deg;","δ":"&delta;","⦱":"&demptyv;","⥿":"&dfisht;","𝔡":"&dfr;","♦":"&diams;","ϝ":"&gammad;","⋲":"&disin;","÷":"&divide;","⋇":"&divonx;","ђ":"&djcy;","⌞":"&llcorner;","⌍":"&dlcrop;",$:"&dollar;","𝕕":"&dopf;","≑":"&eDot;","∸":"&minusd;","∔":"&plusdo;","⊡":"&sdotb;","⌟":"&lrcorner;","⌌":"&drcrop;","𝒹":"&dscr;","ѕ":"&dscy;","⧶":"&dsol;","đ":"&dstrok;","⋱":"&dtdot;","▿":"&triangledown;","⦦":"&dwangle;","џ":"&dzcy;","⟿":"&dzigrarr;","é":"&eacute;","⩮":"&easter;","ě":"&ecaron;","≖":"&eqcirc;","ê":"&ecirc;","≕":"&eqcolon;","э":"&ecy;","ė":"&edot;","≒":"&fallingdotseq;","𝔢":"&efr;","⪚":"&eg;","è":"&egrave;","⪖":"&eqslantgtr;","⪘":"&egsdot;","⪙":"&el;","⏧":"&elinters;","ℓ":"&ell;","⪕":"&eqslantless;","⪗":"&elsdot;","ē":"&emacr;","∅":"&varnothing;"," ":"&emsp13;"," ":"&emsp14;"," ":"&emsp;","ŋ":"&eng;"," ":"&ensp;","ę":"&eogon;","𝕖":"&eopf;","⋕":"&epar;","⧣":"&eparsl;","⩱":"&eplus;","ε":"&epsilon;","ϵ":"&varepsilon;","=":"&equals;","≟":"&questeq;","⩸":"&equivDD;","⧥":"&eqvparsl;","≓":"&risingdotseq;","⥱":"&erarr;","ℯ":"&escr;","η":"&eta;","ð":"&eth;","ë":"&euml;","€":"&euro;","!":"&excl;","ф":"&fcy;","♀":"&female;","ﬃ":"&ffilig;","ﬀ":"&fflig;","ﬄ":"&ffllig;","𝔣":"&ffr;","ﬁ":"&filig;",fj:"&fjlig;","♭":"&flat;","ﬂ":"&fllig;","▱":"&fltns;","ƒ":"&fnof;","𝕗":"&fopf;","⋔":"&pitchfork;","⫙":"&forkv;","⨍":"&fpartint;","½":"&half;","⅓":"&frac13;","¼":"&frac14;","⅕":"&frac15;","⅙":"&frac16;","⅛":"&frac18;","⅔":"&frac23;","⅖":"&frac25;","¾":"&frac34;","⅗":"&frac35;","⅜":"&frac38;","⅘":"&frac45;","⅚":"&frac56;","⅝":"&frac58;","⅞":"&frac78;","⁄":"&frasl;","⌢":"&sfrown;","𝒻":"&fscr;","⪌":"&gtreqqless;","ǵ":"&gacute;","γ":"&gamma;","⪆":"&gtrapprox;","ğ":"&gbreve;","ĝ":"&gcirc;","г":"&gcy;","ġ":"&gdot;","⪩":"&gescc;","⪀":"&gesdot;","⪂":"&gesdoto;","⪄":"&gesdotol;","⋛︀":"&gesl;","⪔":"&gesles;","𝔤":"&gfr;","ℷ":"&gimel;","ѓ":"&gjcy;","⪒":"&glE;","⪥":"&gla;","⪤":"&glj;","≩":"&gneqq;","⪊":"&gnapprox;","⪈":"&gneq;","⋧":"&gnsim;","𝕘":"&gopf;","ℊ":"&gscr;","⪎":"&gsime;","⪐":"&gsiml;","⪧":"&gtcc;","⩺":"&gtcir;","⋗":"&gtrdot;","⦕":"&gtlPar;","⩼":"&gtquest;","⥸":"&gtrarr;","≩︀":"&gvnE;","ъ":"&hardcy;","⥈":"&harrcir;","↭":"&leftrightsquigarrow;","ℏ":"&plankv;","ĥ":"&hcirc;","♥":"&heartsuit;","…":"&mldr;","⊹":"&hercon;","𝔥":"&hfr;","⤥":"&searhk;","⤦":"&swarhk;","⇿":"&hoarr;","∻":"&homtht;","↩":"&larrhk;","↪":"&rarrhk;","𝕙":"&hopf;","―":"&horbar;","𝒽":"&hscr;","ħ":"&hstrok;","⁃":"&hybull;","í":"&iacute;","î":"&icirc;","и":"&icy;","е":"&iecy;","¡":"&iexcl;","𝔦":"&ifr;","ì":"&igrave;","⨌":"&qint;","∭":"&tint;","⧜":"&iinfin;","℩":"&iiota;","ĳ":"&ijlig;","ī":"&imacr;","ı":"&inodot;","⊷":"&imof;","Ƶ":"&imped;","℅":"&incare;","∞":"&infin;","⧝":"&infintie;","⊺":"&intercal;","⨗":"&intlarhk;","⨼":"&iprod;","ё":"&iocy;","į":"&iogon;","𝕚":"&iopf;","ι":"&iota;","¿":"&iquest;","𝒾":"&iscr;","⋹":"&isinE;","⋵":"&isindot;","⋴":"&isins;","⋳":"&isinsv;","ĩ":"&itilde;","і":"&iukcy;","ï":"&iuml;","ĵ":"&jcirc;","й":"&jcy;","𝔧":"&jfr;","ȷ":"&jmath;","𝕛":"&jopf;","𝒿":"&jscr;","ј":"&jsercy;","є":"&jukcy;","κ":"&kappa;","ϰ":"&varkappa;","ķ":"&kcedil;","к":"&kcy;","𝔨":"&kfr;","ĸ":"&kgreen;","х":"&khcy;","ќ":"&kjcy;","𝕜":"&kopf;","𝓀":"&kscr;","⤛":"&lAtail;","⤎":"&lBarr;","⪋":"&lesseqqgtr;","⥢":"&lHar;","ĺ":"&lacute;","⦴":"&laemptyv;","λ":"&lambda;","⦑":"&langd;","⪅":"&lessapprox;","«":"&laquo;","⤟":"&larrbfs;","⤝":"&larrfs;","↫":"&looparrowleft;","⤹":"&larrpl;","⥳":"&larrsim;","↢":"&leftarrowtail;","⪫":"&lat;","⤙":"&latail;","⪭":"&late;","⪭︀":"&lates;","⤌":"&lbarr;","❲":"&lbbrk;","{":"&lcub;","[":"&lsqb;","⦋":"&lbrke;","⦏":"&lbrksld;","⦍":"&lbrkslu;","ľ":"&lcaron;","ļ":"&lcedil;","л":"&lcy;","⤶":"&ldca;","⥧":"&ldrdhar;","⥋":"&ldrushar;","↲":"&ldsh;","≤":"&leq;","⇇":"&llarr;","⋋":"&lthree;","⪨":"&lescc;","⩿":"&lesdot;","⪁":"&lesdoto;","⪃":"&lesdotor;","⋚︀":"&lesg;","⪓":"&lesges;","⋖":"&ltdot;","⥼":"&lfisht;","𝔩":"&lfr;","⪑":"&lgE;","⥪":"&lharul;","▄":"&lhblk;","љ":"&ljcy;","⥫":"&llhard;","◺":"&lltri;","ŀ":"&lmidot;","⎰":"&lmoustache;","≨":"&lneqq;","⪉":"&lnapprox;","⪇":"&lneq;","⋦":"&lnsim;","⟬":"&loang;","⇽":"&loarr;","⟼":"&xmap;","↬":"&rarrlp;","⦅":"&lopar;","𝕝":"&lopf;","⨭":"&loplus;","⨴":"&lotimes;","∗":"&lowast;","◊":"&lozenge;","(":"&lpar;","⦓":"&lparlt;","⥭":"&lrhard;","‎":"&lrm;","⊿":"&lrtri;","‹":"&lsaquo;","𝓁":"&lscr;","⪍":"&lsime;","⪏":"&lsimg;","‚":"&sbquo;","ł":"&lstrok;","⪦":"&ltcc;","⩹":"&ltcir;","⋉":"&ltimes;","⥶":"&ltlarr;","⩻":"&ltquest;","⦖":"&ltrPar;","◃":"&triangleleft;","⥊":"&lurdshar;","⥦":"&luruhar;","≨︀":"&lvnE;","∺":"&mDDot;","¯":"&strns;","♂":"&male;","✠":"&maltese;","▮":"&marker;","⨩":"&mcomma;","м":"&mcy;","—":"&mdash;","𝔪":"&mfr;","℧":"&mho;","µ":"&micro;","⫰":"&midcir;","−":"&minus;","⨪":"&minusdu;","⫛":"&mlcp;","⊧":"&models;","𝕞":"&mopf;","𝓂":"&mscr;","μ":"&mu;","⊸":"&mumap;","⋙̸":"&nGg;","≫⃒":"&nGt;","⇍":"&nlArr;","⇎":"&nhArr;","⋘̸":"&nLl;","≪⃒":"&nLt;","⇏":"&nrArr;","⊯":"&nVDash;","⊮":"&nVdash;","ń":"&nacute;","∠⃒":"&nang;","⩰̸":"&napE;","≋̸":"&napid;","ŉ":"&napos;","♮":"&natural;","⩃":"&ncap;","ň":"&ncaron;","ņ":"&ncedil;","⩭̸":"&ncongdot;","⩂":"&ncup;","н":"&ncy;","–":"&ndash;","⇗":"&neArr;","⤤":"&nearhk;","≐̸":"&nedot;","⤨":"&toea;","𝔫":"&nfr;","↮":"&nleftrightarrow;","⫲":"&nhpar;","⋼":"&nis;","⋺":"&nisd;","њ":"&njcy;","≦̸":"&nleqq;","↚":"&nleftarrow;","‥":"&nldr;","𝕟":"&nopf;","¬":"&not;","⋹̸":"&notinE;","⋵̸":"&notindot;","⋷":"&notinvb;","⋶":"&notinvc;","⋾":"&notnivb;","⋽":"&notnivc;","⫽⃥":"&nparsl;","∂̸":"&npart;","⨔":"&npolint;","↛":"&nrightarrow;","⤳̸":"&nrarrc;","↝̸":"&nrarrw;","𝓃":"&nscr;","⊄":"&nsub;","⫅̸":"&nsubseteqq;","⊅":"&nsup;","⫆̸":"&nsupseteqq;","ñ":"&ntilde;","ν":"&nu;","#":"&num;","№":"&numero;"," ":"&numsp;","⊭":"&nvDash;","⤄":"&nvHarr;","≍⃒":"&nvap;","⊬":"&nvdash;","≥⃒":"&nvge;",">⃒":"&nvgt;","⧞":"&nvinfin;","⤂":"&nvlArr;","≤⃒":"&nvle;","<⃒":"&nvlt;","⊴⃒":"&nvltrie;","⤃":"&nvrArr;","⊵⃒":"&nvrtrie;","∼⃒":"&nvsim;","⇖":"&nwArr;","⤣":"&nwarhk;","⤧":"&nwnear;","ó":"&oacute;","ô":"&ocirc;","о":"&ocy;","ő":"&odblac;","⨸":"&odiv;","⦼":"&odsold;","œ":"&oelig;","⦿":"&ofcir;","𝔬":"&ofr;","˛":"&ogon;","ò":"&ograve;","⧁":"&ogt;","⦵":"&ohbar;","⦾":"&olcir;","⦻":"&olcross;","⧀":"&olt;","ō":"&omacr;","ω":"&omega;","ο":"&omicron;","⦶":"&omid;","𝕠":"&oopf;","⦷":"&opar;","⦹":"&operp;","∨":"&vee;","⩝":"&ord;","ℴ":"&oscr;","ª":"&ordf;","º":"&ordm;","⊶":"&origof;","⩖":"&oror;","⩗":"&orslope;","⩛":"&orv;","ø":"&oslash;","⊘":"&osol;","õ":"&otilde;","⨶":"&otimesas;","ö":"&ouml;","⌽":"&ovbar;","¶":"&para;","⫳":"&parsim;","⫽":"&parsl;","п":"&pcy;","%":"&percnt;",".":"&period;","‰":"&permil;","‱":"&pertenk;","𝔭":"&pfr;","φ":"&phi;","ϕ":"&varphi;","☎":"&phone;","π":"&pi;","ϖ":"&varpi;","ℎ":"&planckh;","+":"&plus;","⨣":"&plusacir;","⨢":"&pluscir;","⨥":"&plusdu;","⩲":"&pluse;","⨦":"&plussim;","⨧":"&plustwo;","⨕":"&pointint;","𝕡":"&popf;","£":"&pound;","⪳":"&prE;","⪷":"&precapprox;","⪹":"&prnap;","⪵":"&prnE;","⋨":"&prnsim;","′":"&prime;","⌮":"&profalar;","⌒":"&profline;","⌓":"&profsurf;","⊰":"&prurel;","𝓅":"&pscr;","ψ":"&psi;"," ":"&puncsp;","𝔮":"&qfr;","𝕢":"&qopf;","⁗":"&qprime;","𝓆":"&qscr;","⨖":"&quatint;","?":"&quest;","⤜":"&rAtail;","⥤":"&rHar;","∽̱":"&race;","ŕ":"&racute;","⦳":"&raemptyv;","⦒":"&rangd;","⦥":"&range;","»":"&raquo;","⥵":"&rarrap;","⤠":"&rarrbfs;","⤳":"&rarrc;","⤞":"&rarrfs;","⥅":"&rarrpl;","⥴":"&rarrsim;","↣":"&rightarrowtail;","↝":"&rightsquigarrow;","⤚":"&ratail;","∶":"&ratio;","❳":"&rbbrk;","}":"&rcub;","]":"&rsqb;","⦌":"&rbrke;","⦎":"&rbrksld;","⦐":"&rbrkslu;","ř":"&rcaron;","ŗ":"&rcedil;","р":"&rcy;","⤷":"&rdca;","⥩":"&rdldhar;","↳":"&rdsh;","▭":"&rect;","⥽":"&rfisht;","𝔯":"&rfr;","⥬":"&rharul;","ρ":"&rho;","ϱ":"&varrho;","⇉":"&rrarr;","⋌":"&rthree;","˚":"&ring;","‏":"&rlm;","⎱":"&rmoustache;","⫮":"&rnmid;","⟭":"&roang;","⇾":"&roarr;","⦆":"&ropar;","𝕣":"&ropf;","⨮":"&roplus;","⨵":"&rotimes;",")":"&rpar;","⦔":"&rpargt;","⨒":"&rppolint;","›":"&rsaquo;","𝓇":"&rscr;","⋊":"&rtimes;","▹":"&triangleright;","⧎":"&rtriltri;","⥨":"&ruluhar;","℞":"&rx;","ś":"&sacute;","⪴":"&scE;","⪸":"&succapprox;","š":"&scaron;","ş":"&scedil;","ŝ":"&scirc;","⪶":"&succneqq;","⪺":"&succnapprox;","⋩":"&succnsim;","⨓":"&scpolint;","с":"&scy;","⋅":"&sdot;","⩦":"&sdote;","⇘":"&seArr;","§":"&sect;",";":"&semi;","⤩":"&tosa;","✶":"&sext;","𝔰":"&sfr;","♯":"&sharp;","щ":"&shchcy;","ш":"&shcy;","­":"&shy;","σ":"&sigma;","ς":"&varsigma;","⩪":"&simdot;","⪞":"&simg;","⪠":"&simgE;","⪝":"&siml;","⪟":"&simlE;","≆":"&simne;","⨤":"&simplus;","⥲":"&simrarr;","⨳":"&smashp;","⧤":"&smeparsl;","⌣":"&ssmile;","⪪":"&smt;","⪬":"&smte;","⪬︀":"&smtes;","ь":"&softcy;","/":"&sol;","⧄":"&solb;","⌿":"&solbar;","𝕤":"&sopf;","♠":"&spadesuit;","⊓︀":"&sqcaps;","⊔︀":"&sqcups;","𝓈":"&sscr;","☆":"&star;","⊂":"&subset;","⫅":"&subseteqq;","⪽":"&subdot;","⫃":"&subedot;","⫁":"&submult;","⫋":"&subsetneqq;","⊊":"&subsetneq;","⪿":"&subplus;","⥹":"&subrarr;","⫇":"&subsim;","⫕":"&subsub;","⫓":"&subsup;","♪":"&sung;","¹":"&sup1;","²":"&sup2;","³":"&sup3;","⫆":"&supseteqq;","⪾":"&supdot;","⫘":"&supdsub;","⫄":"&supedot;","⟉":"&suphsol;","⫗":"&suphsub;","⥻":"&suplarr;","⫂":"&supmult;","⫌":"&supsetneqq;","⊋":"&supsetneq;","⫀":"&supplus;","⫈":"&supsim;","⫔":"&supsub;","⫖":"&supsup;","⇙":"&swArr;","⤪":"&swnwar;","ß":"&szlig;","⌖":"&target;","τ":"&tau;","ť":"&tcaron;","ţ":"&tcedil;","т":"&tcy;","⌕":"&telrec;","𝔱":"&tfr;","θ":"&theta;","ϑ":"&vartheta;","þ":"&thorn;","×":"&times;","⨱":"&timesbar;","⨰":"&timesd;","⌶":"&topbot;","⫱":"&topcir;","𝕥":"&topf;","⫚":"&topfork;","‴":"&tprime;","▵":"&utri;","≜":"&trie;","◬":"&tridot;","⨺":"&triminus;","⨹":"&triplus;","⧍":"&trisb;","⨻":"&tritime;","⏢":"&trpezium;","𝓉":"&tscr;","ц":"&tscy;","ћ":"&tshcy;","ŧ":"&tstrok;","⥣":"&uHar;","ú":"&uacute;","ў":"&ubrcy;","ŭ":"&ubreve;","û":"&ucirc;","у":"&ucy;","ű":"&udblac;","⥾":"&ufisht;","𝔲":"&ufr;","ù":"&ugrave;","▀":"&uhblk;","⌜":"&ulcorner;","⌏":"&ulcrop;","◸":"&ultri;","ū":"&umacr;","ų":"&uogon;","𝕦":"&uopf;","υ":"&upsilon;","⇈":"&uuarr;","⌝":"&urcorner;","⌎":"&urcrop;","ů":"&uring;","◹":"&urtri;","𝓊":"&uscr;","⋰":"&utdot;","ũ":"&utilde;","ü":"&uuml;","⦧":"&uwangle;","⫨":"&vBar;","⫩":"&vBarv;","⦜":"&vangrt;","⊊︀":"&vsubne;","⫋︀":"&vsubnE;","⊋︀":"&vsupne;","⫌︀":"&vsupnE;","в":"&vcy;","⊻":"&veebar;","≚":"&veeeq;","⋮":"&vellip;","𝔳":"&vfr;","𝕧":"&vopf;","𝓋":"&vscr;","⦚":"&vzigzag;","ŵ":"&wcirc;","⩟":"&wedbar;","≙":"&wedgeq;","℘":"&wp;","𝔴":"&wfr;","𝕨":"&wopf;","𝓌":"&wscr;","𝔵":"&xfr;","ξ":"&xi;","⋻":"&xnis;","𝕩":"&xopf;","𝓍":"&xscr;","ý":"&yacute;","я":"&yacy;","ŷ":"&ycirc;","ы":"&ycy;","¥":"&yen;","𝔶":"&yfr;","ї":"&yicy;","𝕪":"&yopf;","𝓎":"&yscr;","ю":"&yucy;","ÿ":"&yuml;","ź":"&zacute;","ž":"&zcaron;","з":"&zcy;","ż":"&zdot;","ζ":"&zeta;","𝔷":"&zfr;","ж":"&zhcy;","⇝":"&zigrarr;","𝕫":"&zopf;","𝓏":"&zscr;","‍":"&zwj;","‌":"&zwnj;"}}};

/***/ }),

/***/ "./node_modules/html-entities/lib/numeric-unicode-map.js":
/*!***************************************************************!*\
  !*** ./node_modules/html-entities/lib/numeric-unicode-map.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.numericUnicodeMap={0:65533,128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};

/***/ }),

/***/ "./node_modules/html-entities/lib/surrogate-pairs.js":
/*!***********************************************************!*\
  !*** ./node_modules/html-entities/lib/surrogate-pairs.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.fromCodePoint=String.fromCodePoint||function(astralCodePoint){return String.fromCharCode(Math.floor((astralCodePoint-65536)/1024)+55296,(astralCodePoint-65536)%1024+56320)};exports.getCodePoint=String.prototype.codePointAt?function(input,position){return input.codePointAt(position)}:function(input,position){return(input.charCodeAt(position)-55296)*1024+input.charCodeAt(position+1)-56320+65536};exports.highSurrogateFrom=55296;exports.highSurrogateTo=56319;

/***/ }),

/***/ "./app/shaders/fragment.glsl":
/*!***********************************!*\
  !*** ./app/shaders/fragment.glsl ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("precision highp float;\n#define GLSLIFY 1\n\n#define PI 3.1415926535897932384626433832795\n\nuniform vec2 uMaskPosition;\nuniform sampler2D uTexture;\n\nvarying vec2 vUv;\n\n// Function to create a rectangle\nvec3 Rectangle(in vec2 size, in vec2 st, in vec2 p, in vec3 c) {\n  float top = step(1. - (p.y + size.y), 1. - st.y);\n  float right = step(1. - (p.x + size.x), 1. - st.x);\n  float bottom = step(p.y, st.y);\n  float left = step(p.x, st.x);\n  return top * right * bottom * left * c;\n}\n\n// Function to create a circle\nfloat circle(in vec2 _st, in float _radius){\n    vec2 dist = _st-vec2(0.5);\n\treturn 1.-smoothstep(_radius-(_radius*0.01),\n                         _radius+(_radius*0.01),\n                         dot(dist,dist)*4.0);\n}\n\nvoid main() {\n    // This so that uv value goes from -0.5 to 0.5\n    // changes origin from bottom left to center\n    vec2 uv = vUv - 0.5;\n    // to make it a square\n    uv.x *= 2.0;\n\n    vec2 maskSize = vec2(0.3, 0.3);\n\n    // Note that we're subtracting HALF of the width and height to position the rectangle at the center of the scene\n    // This is like transform: translate(-50%, -50%)\n    // vec2 maskPosition = vec2(-0.15, -0.15);\n    vec2 maskPosition = vec2(uMaskPosition.x * 2.0 - 1.15, uMaskPosition.y - 0.65);\n    vec3 maskColor =  vec3(1.0);\n\n    vec3 color = vec3(0.0);\n    \n    // This gives a rectangular mask\n    // vec3 mask = Rectangle(maskSize, maskUV, maskPosition, maskColor);\n\n    // This gives a circular mask\n    vec2 st = (uv.xy - maskPosition + 0.35);\n    vec3 mask = vec3(circle(st, 0.3));\n\n    \n    vec3 texture = texture2D(uTexture, uv * 0.5 + 0.5).rgb;\n\n    color = texture * mask;\n\n    gl_FragColor = vec4(color, 1.0);\n}");

/***/ }),

/***/ "./app/shaders/vertex.glsl":
/*!*********************************!*\
  !*** ./app/shaders/vertex.glsl ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("precision highp float;\n#define GLSLIFY 1\n\nattribute vec2 uv;\nattribute vec3 position;\nattribute vec3 normal;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js":
/*!***************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WebSocketClient)
/* harmony export */ });
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var WebSocketClient = /*#__PURE__*/function () {
  /**
   * @param {string} url
   */
  function WebSocketClient(url) {
    _classCallCheck(this, WebSocketClient);

    this.client = new WebSocket(url);

    this.client.onerror = function (error) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);
    };
  }
  /**
   * @param {(...args: any[]) => void} f
   */


  _createClass(WebSocketClient, [{
    key: "onOpen",
    value: function onOpen(f) {
      this.client.onopen = f;
    }
    /**
     * @param {(...args: any[]) => void} f
     */

  }, {
    key: "onClose",
    value: function onClose(f) {
      this.client.onclose = f;
    } // call f with the message string as the first argument

    /**
     * @param {(...args: any[]) => void} f
     */

  }, {
    key: "onMessage",
    value: function onMessage(f) {
      this.client.onmessage = function (e) {
        f(e.data);
      };
    }
  }]);

  return WebSocketClient;
}();



/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/logger/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/logger/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client-src/modules/logger/SyncBailHookFake.js":
/*!*******************************************************!*\
  !*** ./client-src/modules/logger/SyncBailHookFake.js ***!
  \*******************************************************/
/***/ (function(module) {


/**
 * Client stub for tapable SyncBailHook
 */

module.exports = function clientTapableSyncBailHook() {
  return {
    call: function call() {}
  };
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/Logger.js":
/*!****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/Logger.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

var LogType = Object.freeze({
  error:
  /** @type {"error"} */
  "error",
  // message, c style arguments
  warn:
  /** @type {"warn"} */
  "warn",
  // message, c style arguments
  info:
  /** @type {"info"} */
  "info",
  // message, c style arguments
  log:
  /** @type {"log"} */
  "log",
  // message, c style arguments
  debug:
  /** @type {"debug"} */
  "debug",
  // message, c style arguments
  trace:
  /** @type {"trace"} */
  "trace",
  // no arguments
  group:
  /** @type {"group"} */
  "group",
  // [label]
  groupCollapsed:
  /** @type {"groupCollapsed"} */
  "groupCollapsed",
  // [label]
  groupEnd:
  /** @type {"groupEnd"} */
  "groupEnd",
  // [label]
  profile:
  /** @type {"profile"} */
  "profile",
  // [profileName]
  profileEnd:
  /** @type {"profileEnd"} */
  "profileEnd",
  // [profileName]
  time:
  /** @type {"time"} */
  "time",
  // name, time as [seconds, nanoseconds]
  clear:
  /** @type {"clear"} */
  "clear",
  // no arguments
  status:
  /** @type {"status"} */
  "status" // message, arguments

});
exports.LogType = LogType;
/** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */

var LOG_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger raw log method");
var TIMERS_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger times");
var TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger aggregated times");

var WebpackLogger = /*#__PURE__*/function () {
  /**
   * @param {function(LogTypeEnum, any[]=): void} log log function
   * @param {function(string | function(): string): WebpackLogger} getChildLogger function to create child logger
   */
  function WebpackLogger(log, getChildLogger) {
    _classCallCheck(this, WebpackLogger);

    this[LOG_SYMBOL] = log;
    this.getChildLogger = getChildLogger;
  }

  _createClass(WebpackLogger, [{
    key: "error",
    value: function error() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this[LOG_SYMBOL](LogType.error, args);
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this[LOG_SYMBOL](LogType.warn, args);
    }
  }, {
    key: "info",
    value: function info() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this[LOG_SYMBOL](LogType.info, args);
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this[LOG_SYMBOL](LogType.log, args);
    }
  }, {
    key: "debug",
    value: function debug() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      this[LOG_SYMBOL](LogType.debug, args);
    }
  }, {
    key: "assert",
    value: function assert(assertion) {
      if (!assertion) {
        for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          args[_key6 - 1] = arguments[_key6];
        }

        this[LOG_SYMBOL](LogType.error, args);
      }
    }
  }, {
    key: "trace",
    value: function trace() {
      this[LOG_SYMBOL](LogType.trace, ["Trace"]);
    }
  }, {
    key: "clear",
    value: function clear() {
      this[LOG_SYMBOL](LogType.clear);
    }
  }, {
    key: "status",
    value: function status() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      this[LOG_SYMBOL](LogType.status, args);
    }
  }, {
    key: "group",
    value: function group() {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      this[LOG_SYMBOL](LogType.group, args);
    }
  }, {
    key: "groupCollapsed",
    value: function groupCollapsed() {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      this[LOG_SYMBOL](LogType.groupCollapsed, args);
    }
  }, {
    key: "groupEnd",
    value: function groupEnd() {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      this[LOG_SYMBOL](LogType.groupEnd, args);
    }
  }, {
    key: "profile",
    value: function profile(label) {
      this[LOG_SYMBOL](LogType.profile, [label]);
    }
  }, {
    key: "profileEnd",
    value: function profileEnd(label) {
      this[LOG_SYMBOL](LogType.profileEnd, [label]);
    }
  }, {
    key: "time",
    value: function time(label) {
      this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();
      this[TIMERS_SYMBOL].set(label, process.hrtime());
    }
  }, {
    key: "timeLog",
    value: function timeLog(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeLog()"));
      }

      var time = process.hrtime(prev);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeEnd",
    value: function timeEnd(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeEnd()"));
      }

      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeAggregate",
    value: function timeAggregate(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeAggregate()"));
      }

      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();
      var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);

      if (current !== undefined) {
        if (time[1] + current[1] > 1e9) {
          time[0] += current[0] + 1;
          time[1] = time[1] - 1e9 + current[1];
        } else {
          time[0] += current[0];
          time[1] += current[1];
        }
      }

      this[TIMERS_AGGREGATES_SYMBOL].set(label, time);
    }
  }, {
    key: "timeAggregateEnd",
    value: function timeAggregateEnd(label) {
      if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;
      var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);
      if (time === undefined) return;
      this[TIMERS_AGGREGATES_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }]);

  return WebpackLogger;
}();

exports.Logger = WebpackLogger;

/***/ }),

/***/ "./node_modules/webpack/lib/logging/createConsoleLogger.js":
/*!*****************************************************************!*\
  !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_10785__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var _require = __nested_webpack_require_10785__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
    LogType = _require.LogType;
/** @typedef {import("../../declarations/WebpackOptions").FilterItemTypes} FilterItemTypes */

/** @typedef {import("../../declarations/WebpackOptions").FilterTypes} FilterTypes */

/** @typedef {import("./Logger").LogTypeEnum} LogTypeEnum */

/** @typedef {function(string): boolean} FilterFunction */

/**
 * @typedef {Object} LoggerConsole
 * @property {function(): void} clear
 * @property {function(): void} trace
 * @property {(...args: any[]) => void} info
 * @property {(...args: any[]) => void} log
 * @property {(...args: any[]) => void} warn
 * @property {(...args: any[]) => void} error
 * @property {(...args: any[]) => void=} debug
 * @property {(...args: any[]) => void=} group
 * @property {(...args: any[]) => void=} groupCollapsed
 * @property {(...args: any[]) => void=} groupEnd
 * @property {(...args: any[]) => void=} status
 * @property {(...args: any[]) => void=} profile
 * @property {(...args: any[]) => void=} profileEnd
 * @property {(...args: any[]) => void=} logTime
 */

/**
 * @typedef {Object} LoggerOptions
 * @property {false|true|"none"|"error"|"warn"|"info"|"log"|"verbose"} level loglevel
 * @property {FilterTypes|boolean} debug filter for debug logging
 * @property {LoggerConsole} console the console to log to
 */

/**
 * @param {FilterItemTypes} item an input item
 * @returns {FilterFunction} filter function
 */


var filterToFunction = function filterToFunction(item) {
  if (typeof item === "string") {
    var regExp = new RegExp("[\\\\/]".concat(item.replace( // eslint-disable-next-line no-useless-escape
    /[-[\]{}()*+?.\\^$|]/g, "\\$&"), "([\\\\/]|$|!|\\?)"));
    return function (ident) {
      return regExp.test(ident);
    };
  }

  if (item && typeof item === "object" && typeof item.test === "function") {
    return function (ident) {
      return item.test(ident);
    };
  }

  if (typeof item === "function") {
    return item;
  }

  if (typeof item === "boolean") {
    return function () {
      return item;
    };
  }
};
/**
 * @enum {number}
 */


var LogLevel = {
  none: 6,
  false: 6,
  error: 5,
  warn: 4,
  info: 3,
  log: 2,
  true: 2,
  verbose: 1
};
/**
 * @param {LoggerOptions} options options object
 * @returns {function(string, LogTypeEnum, any[]): void} logging function
 */

module.exports = function (_ref) {
  var _ref$level = _ref.level,
      level = _ref$level === void 0 ? "info" : _ref$level,
      _ref$debug = _ref.debug,
      debug = _ref$debug === void 0 ? false : _ref$debug,
      console = _ref.console;
  var debugFilters = typeof debug === "boolean" ? [function () {
    return debug;
  }] :
  /** @type {FilterItemTypes[]} */
  [].concat(debug).map(filterToFunction);
  /** @type {number} */

  var loglevel = LogLevel["".concat(level)] || 0;
  /**
   * @param {string} name name of the logger
   * @param {LogTypeEnum} type type of the log entry
   * @param {any[]} args arguments of the log entry
   * @returns {void}
   */

  var logger = function logger(name, type, args) {
    var labeledArgs = function labeledArgs() {
      if (Array.isArray(args)) {
        if (args.length > 0 && typeof args[0] === "string") {
          return ["[".concat(name, "] ").concat(args[0])].concat(_toConsumableArray(args.slice(1)));
        } else {
          return ["[".concat(name, "]")].concat(_toConsumableArray(args));
        }
      } else {
        return [];
      }
    };

    var debug = debugFilters.some(function (f) {
      return f(name);
    });

    switch (type) {
      case LogType.debug:
        if (!debug) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.debug === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.debug.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.log:
        if (!debug && loglevel > LogLevel.log) return;
        console.log.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.info:
        if (!debug && loglevel > LogLevel.info) return;
        console.info.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.warn:
        if (!debug && loglevel > LogLevel.warn) return;
        console.warn.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.error:
        if (!debug && loglevel > LogLevel.error) return;
        console.error.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.trace:
        if (!debug) return;
        console.trace();
        break;

      case LogType.groupCollapsed:
        if (!debug && loglevel > LogLevel.log) return;

        if (!debug && loglevel > LogLevel.verbose) {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          if (typeof console.groupCollapsed === "function") {
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));
          } else {
            console.log.apply(console, _toConsumableArray(labeledArgs()));
          }

          break;
        }

      // falls through

      case LogType.group:
        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.group === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.group.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.groupEnd:
        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.groupEnd === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.groupEnd();
        }

        break;

      case LogType.time:
        {
          if (!debug && loglevel > LogLevel.log) return;
          var ms = args[1] * 1000 + args[2] / 1000000;
          var msg = "[".concat(name, "] ").concat(args[0], ": ").concat(ms, " ms");

          if (typeof console.logTime === "function") {
            console.logTime(msg);
          } else {
            console.log(msg);
          }

          break;
        }

      case LogType.profile:
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.profile === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.profile.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.profileEnd:
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.profileEnd === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.clear:
        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.clear === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.clear();
        }

        break;

      case LogType.status:
        if (!debug && loglevel > LogLevel.info) return;

        if (typeof console.status === "function") {
          if (args.length === 0) {
            console.status();
          } else {
            console.status.apply(console, _toConsumableArray(labeledArgs()));
          }
        } else {
          if (args.length !== 0) {
            console.info.apply(console, _toConsumableArray(labeledArgs()));
          }
        }

        break;

      default:
        throw new Error("Unexpected LogType ".concat(type));
    }
  };

  return logger;
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/runtime.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_20872__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var SyncBailHook = __nested_webpack_require_20872__(/*! tapable/lib/SyncBailHook */ "./client-src/modules/logger/SyncBailHookFake.js");

var _require = __nested_webpack_require_20872__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
    Logger = _require.Logger;

var createConsoleLogger = __nested_webpack_require_20872__(/*! ./createConsoleLogger */ "./node_modules/webpack/lib/logging/createConsoleLogger.js");
/** @type {createConsoleLogger.LoggerOptions} */


var currentDefaultLoggerOptions = {
  level: "info",
  debug: false,
  console: console
};
var currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
/**
 * @param {string} name name of the logger
 * @returns {Logger} a logger
 */

exports.getLogger = function (name) {
  return new Logger(function (type, args) {
    if (exports.hooks.log.call(name, type, args) === undefined) {
      currentDefaultLogger(name, type, args);
    }
  }, function (childName) {
    return exports.getLogger("".concat(name, "/").concat(childName));
  });
};
/**
 * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options
 * @returns {void}
 */


exports.configureDefaultLogger = function (options) {
  _extends(currentDefaultLoggerOptions, options);

  currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
};

exports.hooks = {
  log: new SyncBailHook(["origin", "type", "args"])
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_22988__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_22988__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_22988__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_22988__.o(definition, key) && !__nested_webpack_require_22988__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_webpack_require_22988__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_22988__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!********************************************!*\
  !*** ./client-src/modules/logger/index.js ***!
  \********************************************/
__nested_webpack_require_22988__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_22988__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport default export from named module */ webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__; }
/* harmony export */ });
/* harmony import */ var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_22988__(/*! webpack/lib/logging/runtime.js */ "./node_modules/webpack/lib/logging/runtime.js");

}();
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/strip-ansi/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/strip-ansi/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/strip-ansi/index.js":
/*!******************************************!*\
  !*** ./node_modules/strip-ansi/index.js ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __nested_webpack_require_368__) {

__nested_webpack_require_368__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_368__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ stripAnsi; }
/* harmony export */ });
/* harmony import */ var ansi_regex__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_368__(/*! ansi-regex */ "./node_modules/strip-ansi/node_modules/ansi-regex/index.js");

function stripAnsi(string) {
  if (typeof string !== 'string') {
    throw new TypeError("Expected a `string`, got `".concat(typeof string, "`"));
  }

  return string.replace((0,ansi_regex__WEBPACK_IMPORTED_MODULE_0__["default"])(), '');
}

/***/ }),

/***/ "./node_modules/strip-ansi/node_modules/ansi-regex/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/strip-ansi/node_modules/ansi-regex/index.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __nested_webpack_require_1387__) {

__nested_webpack_require_1387__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_1387__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ansiRegex; }
/* harmony export */ });
function ansiRegex() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$onlyFirst = _ref.onlyFirst,
      onlyFirst = _ref$onlyFirst === void 0 ? false : _ref$onlyFirst;

  var pattern = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'].join('|');
  return new RegExp(pattern, onlyFirst ? undefined : 'g');
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_2352__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_2352__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_2352__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_2352__.o(definition, key) && !__nested_webpack_require_2352__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_webpack_require_2352__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_2352__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************************************!*\
  !*** ./client-src/modules/strip-ansi/index.js ***!
  \************************************************/
__nested_webpack_require_2352__.r(__webpack_exports__);
/* harmony import */ var strip_ansi__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_2352__(/*! strip-ansi */ "./node_modules/strip-ansi/index.js");

/* harmony default export */ __webpack_exports__["default"] = (strip_ansi__WEBPACK_IMPORTED_MODULE_0__["default"]);
}();
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!***********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatProblem": () => (/* binding */ formatProblem),
/* harmony export */   "hide": () => (/* binding */ hide),
/* harmony export */   "show": () => (/* binding */ show)
/* harmony export */ });
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ansi-html-community */ "./node_modules/ansi-html-community/index.js");
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_html_community__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/lib/index.js");
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(html_entities__WEBPACK_IMPORTED_MODULE_1__);
// The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).


var colors = {
  reset: ["transparent", "transparent"],
  black: "181818",
  red: "E36049",
  green: "B3CB74",
  yellow: "FFD080",
  blue: "7CAFC2",
  magenta: "7FACCA",
  cyan: "C3C2EF",
  lightgrey: "EBE7E3",
  darkgrey: "6D7891"
};
/** @type {HTMLIFrameElement | null | undefined} */

var iframeContainerElement;
/** @type {HTMLDivElement | null | undefined} */

var containerElement;
/** @type {Array<(element: HTMLDivElement) => void>} */

var onLoadQueue = [];
ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default().setColors(colors);

function createContainer() {
  iframeContainerElement = document.createElement("iframe");
  iframeContainerElement.id = "webpack-dev-server-client-overlay";
  iframeContainerElement.src = "about:blank";
  iframeContainerElement.style.position = "fixed";
  iframeContainerElement.style.left = 0;
  iframeContainerElement.style.top = 0;
  iframeContainerElement.style.right = 0;
  iframeContainerElement.style.bottom = 0;
  iframeContainerElement.style.width = "100vw";
  iframeContainerElement.style.height = "100vh";
  iframeContainerElement.style.border = "none";
  iframeContainerElement.style.zIndex = 9999999999;

  iframeContainerElement.onload = function () {
    containerElement =
    /** @type {Document} */

    /** @type {HTMLIFrameElement} */
    iframeContainerElement.contentDocument.createElement("div");
    containerElement.id = "webpack-dev-server-client-overlay-div";
    containerElement.style.position = "fixed";
    containerElement.style.boxSizing = "border-box";
    containerElement.style.left = 0;
    containerElement.style.top = 0;
    containerElement.style.right = 0;
    containerElement.style.bottom = 0;
    containerElement.style.width = "100vw";
    containerElement.style.height = "100vh";
    containerElement.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
    containerElement.style.color = "#E8E8E8";
    containerElement.style.fontFamily = "Menlo, Consolas, monospace";
    containerElement.style.fontSize = "large";
    containerElement.style.padding = "2rem";
    containerElement.style.lineHeight = "1.2";
    containerElement.style.whiteSpace = "pre-wrap";
    containerElement.style.overflow = "auto";
    var headerElement = document.createElement("span");
    headerElement.innerText = "Compiled with problems:";
    var closeButtonElement = document.createElement("button");
    closeButtonElement.innerText = "X";
    closeButtonElement.style.background = "transparent";
    closeButtonElement.style.border = "none";
    closeButtonElement.style.fontSize = "20px";
    closeButtonElement.style.fontWeight = "bold";
    closeButtonElement.style.color = "white";
    closeButtonElement.style.cursor = "pointer";
    closeButtonElement.style.cssFloat = "right"; // @ts-ignore

    closeButtonElement.style.styleFloat = "right";
    closeButtonElement.addEventListener("click", function () {
      hide();
    });
    containerElement.appendChild(headerElement);
    containerElement.appendChild(closeButtonElement);
    containerElement.appendChild(document.createElement("br"));
    containerElement.appendChild(document.createElement("br"));
    /** @type {Document} */

    /** @type {HTMLIFrameElement} */
    iframeContainerElement.contentDocument.body.appendChild(containerElement);
    onLoadQueue.forEach(function (onLoad) {
      onLoad(
      /** @type {HTMLDivElement} */
      containerElement);
    });
    onLoadQueue = [];
    /** @type {HTMLIFrameElement} */

    iframeContainerElement.onload = null;
  };

  document.body.appendChild(iframeContainerElement);
}
/**
 * @param {(element: HTMLDivElement) => void} callback
 */


function ensureOverlayExists(callback) {
  if (containerElement) {
    // Everything is ready, call the callback right away.
    callback(containerElement);
    return;
  }

  onLoadQueue.push(callback);

  if (iframeContainerElement) {
    return;
  }

  createContainer();
} // Successful compilation.


function hide() {
  if (!iframeContainerElement) {
    return;
  } // Clean up and reset internal state.


  document.body.removeChild(iframeContainerElement);
  iframeContainerElement = null;
  containerElement = null;
}
/**
 * @param {string} type
 * @param {string  | { file?: string, moduleName?: string, loc?: string, message?: string }} item
 * @returns {{ header: string, body: string }}
 */


function formatProblem(type, item) {
  var header = type === "warning" ? "WARNING" : "ERROR";
  var body = "";

  if (typeof item === "string") {
    body += item;
  } else {
    var file = item.file || ""; // eslint-disable-next-line no-nested-ternary

    var moduleName = item.moduleName ? item.moduleName.indexOf("!") !== -1 ? "".concat(item.moduleName.replace(/^(\s|\S)*!/, ""), " (").concat(item.moduleName, ")") : "".concat(item.moduleName) : "";
    var loc = item.loc;
    header += "".concat(moduleName || file ? " in ".concat(moduleName ? "".concat(moduleName).concat(file ? " (".concat(file, ")") : "") : file).concat(loc ? " ".concat(loc) : "") : "");
    body += item.message || "";
  }

  return {
    header: header,
    body: body
  };
} // Compilation with errors (e.g. syntax error or missing modules).

/**
 * @param {string} type
 * @param {Array<string  | { file?: string, moduleName?: string, loc?: string, message?: string }>} messages
 */


function show(type, messages) {
  ensureOverlayExists(function () {
    messages.forEach(function (message) {
      var entryElement = document.createElement("div");
      var typeElement = document.createElement("span");

      var _formatProblem = formatProblem(type, message),
          header = _formatProblem.header,
          body = _formatProblem.body;

      typeElement.innerText = header;
      typeElement.style.color = "#".concat(colors.red); // Make it look similar to our terminal.

      var text = ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default()((0,html_entities__WEBPACK_IMPORTED_MODULE_1__.encode)(body));
      var messageTextNode = document.createElement("div");
      messageTextNode.innerHTML = text;
      entryElement.appendChild(typeElement);
      entryElement.appendChild(document.createElement("br"));
      entryElement.appendChild(document.createElement("br"));
      entryElement.appendChild(messageTextNode);
      entryElement.appendChild(document.createElement("br"));
      entryElement.appendChild(document.createElement("br"));
      /** @type {HTMLDivElement} */

      containerElement.appendChild(entryElement);
    });
  });
}



/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!**********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/socket.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__(/*! ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* global __webpack_dev_server_client__ */

 // this WebsocketClient is here as a default fallback, in case the client is not injected

/* eslint-disable camelcase */

var Client = // eslint-disable-next-line no-nested-ternary
typeof __webpack_dev_server_client__ !== "undefined" ? typeof __webpack_dev_server_client__.default !== "undefined" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__["default"];
/* eslint-enable camelcase */

var retries = 0;
var maxRetries = 10;
var client = null;
/**
 * @param {string} url
 * @param {{ [handler: string]: (data?: any, params?: any) => any }} handlers
 * @param {number} [reconnect]
 */

var socket = function initSocket(url, handlers, reconnect) {
  client = new Client(url);
  client.onOpen(function () {
    retries = 0;

    if (typeof reconnect !== "undefined") {
      maxRetries = reconnect;
    }
  });
  client.onClose(function () {
    if (retries === 0) {
      handlers.close();
    } // Try to reconnect.


    client = null; // After 10 retries stop trying, to prevent logspam.

    if (retries < maxRetries) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      // eslint-disable-next-line no-restricted-properties
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;
      _utils_log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("Trying to reconnect...");
      setTimeout(function () {
        socket(url, handlers, reconnect);
      }, retryInMs);
    }
  });
  client.onMessage(
  /**
   * @param {any} data
   */
  function (data) {
    var message = JSON.parse(data);

    if (handlers[message.type]) {
      handlers[message.type](message.data, message.params);
    }
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/createSocketURL.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @param {{ protocol?: string, auth?: string, hostname?: string, port?: string, pathname?: string, search?: string, hash?: string, slashes?: boolean }} objURL
 * @returns {string}
 */
function format(objURL) {
  var protocol = objURL.protocol || "";

  if (protocol && protocol.substr(-1) !== ":") {
    protocol += ":";
  }

  var auth = objURL.auth || "";

  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ":");
    auth += "@";
  }

  var host = "";

  if (objURL.hostname) {
    host = auth + (objURL.hostname.indexOf(":") === -1 ? objURL.hostname : "[".concat(objURL.hostname, "]"));

    if (objURL.port) {
      host += ":".concat(objURL.port);
    }
  }

  var pathname = objURL.pathname || "";

  if (objURL.slashes) {
    host = "//".concat(host || "");

    if (pathname && pathname.charAt(0) !== "/") {
      pathname = "/".concat(pathname);
    }
  } else if (!host) {
    host = "";
  }

  var search = objURL.search || "";

  if (search && search.charAt(0) !== "?") {
    search = "?".concat(search);
  }

  var hash = objURL.hash || "";

  if (hash && hash.charAt(0) !== "#") {
    hash = "#".concat(hash);
  }

  pathname = pathname.replace(/[?#]/g,
  /**
   * @param {string} match
   * @returns {string}
   */
  function (match) {
    return encodeURIComponent(match);
  });
  search = search.replace("#", "%23");
  return "".concat(protocol).concat(host).concat(pathname).concat(search).concat(hash);
}
/**
 * @param {URL & { fromCurrentScript?: boolean }} parsedURL
 * @returns {string}
 */


function createSocketURL(parsedURL) {
  var hostname = parsedURL.hostname; // Node.js module parses it as `::`
  // `new URL(urlString, [baseURLString])` parses it as '[::]'

  var isInAddrAny = hostname === "0.0.0.0" || hostname === "::" || hostname === "[::]"; // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384

  if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf("http") === 0) {
    hostname = self.location.hostname;
  }

  var socketURLProtocol = parsedURL.protocol || self.location.protocol; // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.

  if (socketURLProtocol === "auto:" || hostname && isInAddrAny && self.location.protocol === "https:") {
    socketURLProtocol = self.location.protocol;
  }

  socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, "ws");
  var socketURLAuth = ""; // `new URL(urlString, [baseURLstring])` doesn't have `auth` property
  // Parse authentication credentials in case we need them

  if (parsedURL.username) {
    socketURLAuth = parsedURL.username; // Since HTTP basic authentication does not allow empty username,
    // we only include password if the username is not empty.

    if (parsedURL.password) {
      // Result: <username>:<password>
      socketURLAuth = socketURLAuth.concat(":", parsedURL.password);
    }
  } // In case the host is a raw IPv6 address, it can be enclosed in
  // the brackets as the brackets are needed in the final URL string.
  // Need to remove those as url.format blindly adds its own set of brackets
  // if the host string contains colons. That would lead to non-working
  // double brackets (e.g. [[::]]) host
  //
  // All of these web socket url params are optionally passed in through resourceQuery,
  // so we need to fall back to the default if they are not provided


  var socketURLHostname = (hostname || self.location.hostname || "localhost").replace(/^\[(.*)\]$/, "$1");
  var socketURLPort = parsedURL.port;

  if (!socketURLPort || socketURLPort === "0") {
    socketURLPort = self.location.port;
  } // If path is provided it'll be passed in via the resourceQuery as a
  // query param so it has to be parsed out of the querystring in order for the
  // client to open the socket to the correct location.


  var socketURLPathname = "/ws";

  if (parsedURL.pathname && !parsedURL.fromCurrentScript) {
    socketURLPathname = parsedURL.pathname;
  }

  return format({
    protocol: socketURLProtocol,
    auth: socketURLAuth,
    hostname: socketURLHostname,
    port: socketURLPort,
    pathname: socketURLPathname,
    slashes: true
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createSocketURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
/*!********************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @returns {string}
 */
function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute("src");
  } // Fallback to getting all scripts running in the document.


  var scriptElements = document.scripts || [];
  var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, function (element) {
    return element.getAttribute("src");
  });

  if (scriptElementsWithSrc.length > 0) {
    var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];
    return currentScript.getAttribute("src");
  } // Fail as there was no script to use.


  throw new Error("[webpack-dev-server] Failed to get current script source.");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getCurrentScriptSource);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!*************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/log.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "log": () => (/* binding */ log),
/* harmony export */   "setLogLevel": () => (/* binding */ setLogLevel)
/* harmony export */ });
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/logger/index.js */ "./node_modules/webpack-dev-server/client/modules/logger/index.js");
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);

var name = "webpack-dev-server"; // default level is set on the client side, so it does not need
// to be set by the CLI or API

var defaultLevel = "info"; // options new options, merge with old options

/**
 * @param {false | true | "none" | "error" | "warn" | "info" | "log" | "verbose"} level
 * @returns {void}
 */

function setLogLevel(level) {
  _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({
    level: level
  });
}

setLogLevel(defaultLevel);
var log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/parseURL.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/parseURL.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCurrentScriptSource.js */ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");

/**
 * @param {string} resourceQuery
 * @returns {{ [key: string]: string | boolean }}
 */

function parseURL(resourceQuery) {
  /** @type {{ [key: string]: string }} */
  var options = {};

  if (typeof resourceQuery === "string" && resourceQuery !== "") {
    var searchParams = resourceQuery.substr(1).split("&");

    for (var i = 0; i < searchParams.length; i++) {
      var pair = searchParams[i].split("=");
      options[pair[0]] = decodeURIComponent(pair[1]);
    }
  } else {
    // Else, get the url from the <script> this file was called with.
    var scriptSource = (0,_getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    var scriptSourceURL;

    try {
      // The placeholder `baseURL` with `window.location.href`,
      // is to allow parsing of path-relative or protocol-relative URLs,
      // and will have no effect if `scriptSource` is a fully valid URL.
      scriptSourceURL = new URL(scriptSource, self.location.href);
    } catch (error) {// URL parsing failed, do nothing.
      // We will still proceed to see if we can recover using `resourceQuery`
    }

    if (scriptSourceURL) {
      options = scriptSourceURL;
      options.fromCurrentScript = true;
    }
  }

  return options;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/reloadApp.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/emitter.js */ "./node_modules/webpack/hot/emitter.js");
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");


/** @typedef {import("../index").Options} Options
/** @typedef {import("../index").Status} Status

/**
 * @param {Options} options
 * @param {Status} status
 */

function reloadApp(_ref, status) {
  var hot = _ref.hot,
      liveReload = _ref.liveReload;

  if (status.isUnloading) {
    return;
  }

  var currentHash = status.currentHash,
      previousHash = status.previousHash;
  var isInitial = currentHash.indexOf(
  /** @type {string} */
  previousHash) >= 0;

  if (isInitial) {
    return;
  }
  /**
   * @param {Window} rootWindow
   * @param {number} intervalId
   */


  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App updated. Reloading...");
    rootWindow.location.reload();
  }

  var search = self.location.search.toLowerCase();
  var allowToHot = search.indexOf("webpack-dev-server-hot=false") === -1;
  var allowToLiveReload = search.indexOf("webpack-dev-server-live-reload=false") === -1;

  if (hot && allowToHot) {
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App hot update...");
    webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default().emit("webpackHotUpdate", status.currentHash);

    if (typeof self !== "undefined" && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(status.currentHash), "*");
    }
  } // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload && allowToLiveReload) {
    var rootWindow = self; // use parent window for reload (in case we're in an iframe with no valid src)

    var intervalId = self.setInterval(function () {
      if (rootWindow.location.protocol !== "about:") {
        // reload immediately if protocol is valid
        applyReload(rootWindow, intervalId);
      } else {
        rootWindow = rootWindow.parent;

        if (rootWindow.parent === rootWindow) {
          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
          applyReload(rootWindow, intervalId);
        }
      }
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reloadApp);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/sendMessage.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* global __resourceQuery WorkerGlobalScope */
// Send messages to the outside, so plugins can consume it.

/**
 * @param {string} type
 * @param {any} [data]
 */
function sendMsg(type, data) {
  if (typeof self !== "undefined" && (typeof WorkerGlobalScope === "undefined" || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: "webpack".concat(type),
      data: data
    }, "*");
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendMsg);

/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
module.exports = new EventEmitter();


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/
/***/ ((module) => {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function (level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function (level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function (level) {
	logLevel = level;
};

module.exports.formatError = function (err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),

/***/ "./node_modules/ogl/src/core/Camera.js":
/*!*********************************************!*\
  !*** ./node_modules/ogl/src/core/Camera.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Camera": () => (/* binding */ Camera)
/* harmony export */ });
/* harmony import */ var _Transform_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Transform.js */ "./node_modules/ogl/src/core/Transform.js");
/* harmony import */ var _math_Mat4_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Mat4.js */ "./node_modules/ogl/src/math/Mat4.js");
/* harmony import */ var _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Vec3.js */ "./node_modules/ogl/src/math/Vec3.js");




const tempMat4 = new _math_Mat4_js__WEBPACK_IMPORTED_MODULE_0__.Mat4();
const tempVec3a = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();
const tempVec3b = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();

class Camera extends _Transform_js__WEBPACK_IMPORTED_MODULE_2__.Transform {
    constructor(gl, { near = 0.1, far = 100, fov = 45, aspect = 1, left, right, bottom, top, zoom = 1 } = {}) {
        super();

        Object.assign(this, { near, far, fov, aspect, left, right, bottom, top, zoom });

        this.projectionMatrix = new _math_Mat4_js__WEBPACK_IMPORTED_MODULE_0__.Mat4();
        this.viewMatrix = new _math_Mat4_js__WEBPACK_IMPORTED_MODULE_0__.Mat4();
        this.projectionViewMatrix = new _math_Mat4_js__WEBPACK_IMPORTED_MODULE_0__.Mat4();
        this.worldPosition = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();

        // Use orthographic if left/right set, else default to perspective camera
        this.type = left || right ? 'orthographic' : 'perspective';

        if (this.type === 'orthographic') this.orthographic();
        else this.perspective();
    }

    perspective({ near = this.near, far = this.far, fov = this.fov, aspect = this.aspect } = {}) {
        Object.assign(this, { near, far, fov, aspect });
        this.projectionMatrix.fromPerspective({ fov: fov * (Math.PI / 180), aspect, near, far });
        this.type = 'perspective';
        return this;
    }

    orthographic({
        near = this.near,
        far = this.far,
        left = this.left,
        right = this.right,
        bottom = this.bottom,
        top = this.top,
        zoom = this.zoom,
    } = {}) {
        Object.assign(this, { near, far, left, right, bottom, top, zoom });
        left /= zoom;
        right /= zoom;
        bottom /= zoom;
        top /= zoom;
        this.projectionMatrix.fromOrthogonal({ left, right, bottom, top, near, far });
        this.type = 'orthographic';
        return this;
    }

    updateMatrixWorld() {
        super.updateMatrixWorld();
        this.viewMatrix.inverse(this.worldMatrix);
        this.worldMatrix.getTranslation(this.worldPosition);

        // used for sorting
        this.projectionViewMatrix.multiply(this.projectionMatrix, this.viewMatrix);
        return this;
    }

    lookAt(target) {
        super.lookAt(target, true);
        return this;
    }

    // Project 3D coordinate to 2D point
    project(v) {
        v.applyMatrix4(this.viewMatrix);
        v.applyMatrix4(this.projectionMatrix);
        return this;
    }

    // Unproject 2D point to 3D coordinate
    unproject(v) {
        v.applyMatrix4(tempMat4.inverse(this.projectionMatrix));
        v.applyMatrix4(this.worldMatrix);
        return this;
    }

    updateFrustum() {
        if (!this.frustum) {
            this.frustum = [new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3(), new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3(), new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3(), new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3(), new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3(), new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3()];
        }

        const m = this.projectionViewMatrix;
        this.frustum[0].set(m[3] - m[0], m[7] - m[4], m[11] - m[8]).constant = m[15] - m[12]; // -x
        this.frustum[1].set(m[3] + m[0], m[7] + m[4], m[11] + m[8]).constant = m[15] + m[12]; // +x
        this.frustum[2].set(m[3] + m[1], m[7] + m[5], m[11] + m[9]).constant = m[15] + m[13]; // +y
        this.frustum[3].set(m[3] - m[1], m[7] - m[5], m[11] - m[9]).constant = m[15] - m[13]; // -y
        this.frustum[4].set(m[3] - m[2], m[7] - m[6], m[11] - m[10]).constant = m[15] - m[14]; // +z (far)
        this.frustum[5].set(m[3] + m[2], m[7] + m[6], m[11] + m[10]).constant = m[15] + m[14]; // -z (near)

        for (let i = 0; i < 6; i++) {
            const invLen = 1.0 / this.frustum[i].distance();
            this.frustum[i].multiply(invLen);
            this.frustum[i].constant *= invLen;
        }
    }

    frustumIntersectsMesh(node) {
        // If no position attribute, treat as frustumCulled false
        if (!node.geometry.attributes.position) return true;

        if (!node.geometry.bounds || node.geometry.bounds.radius === Infinity) node.geometry.computeBoundingSphere();

        if (!node.geometry.bounds) return true;

        const center = tempVec3a;
        center.copy(node.geometry.bounds.center);
        center.applyMatrix4(node.worldMatrix);

        const radius = node.geometry.bounds.radius * node.worldMatrix.getMaxScaleOnAxis();

        return this.frustumIntersectsSphere(center, radius);
    }

    frustumIntersectsSphere(center, radius) {
        const normal = tempVec3b;

        for (let i = 0; i < 6; i++) {
            const plane = this.frustum[i];
            const distance = normal.copy(plane).dot(center) + plane.constant;
            if (distance < -radius) return false;
        }
        return true;
    }
}


/***/ }),

/***/ "./node_modules/ogl/src/core/Geometry.js":
/*!***********************************************!*\
  !*** ./node_modules/ogl/src/core/Geometry.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Geometry": () => (/* binding */ Geometry)
/* harmony export */ });
/* harmony import */ var _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vec3.js */ "./node_modules/ogl/src/math/Vec3.js");
// attribute params
// {
//     data - typed array eg UInt16Array for indices, Float32Array
//     size - int default 1
//     instanced - default null. Pass divisor amount
//     type - gl enum default gl.UNSIGNED_SHORT for 'index', gl.FLOAT for others
//     normalized - boolean default false

//     buffer - gl buffer, if buffer exists, don't need to provide data - although needs position data for bounds calculation
//     stride - default 0 - for when passing in buffer
//     offset - default 0 - for when passing in buffer
//     count - default null - for when passing in buffer
//     min - array - for when passing in buffer
//     max - array - for when passing in buffer
// }

// TODO: fit in transform feedback



const tempVec3 = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__.Vec3();

let ID = 1;
let ATTR_ID = 1;

// To stop inifinite warnings
let isBoundsWarned = false;

class Geometry {
    constructor(gl, attributes = {}) {
        if (!gl.canvas) console.error('gl not passed as first argument to Geometry');
        this.gl = gl;
        this.attributes = attributes;
        this.id = ID++;

        // Store one VAO per program attribute locations order
        this.VAOs = {};

        this.drawRange = { start: 0, count: 0 };
        this.instancedCount = 0;

        // Unbind current VAO so that new buffers don't get added to active mesh
        this.gl.renderer.bindVertexArray(null);
        this.gl.renderer.currentGeometry = null;

        // Alias for state store to avoid redundant calls for global state
        this.glState = this.gl.renderer.state;

        // create the buffers
        for (let key in attributes) {
            this.addAttribute(key, attributes[key]);
        }
    }

    addAttribute(key, attr) {
        this.attributes[key] = attr;

        // Set options
        attr.id = ATTR_ID++; // TODO: currently unused, remove?
        attr.size = attr.size || 1;
        attr.type =
            attr.type ||
            (attr.data.constructor === Float32Array
                ? this.gl.FLOAT
                : attr.data.constructor === Uint16Array
                ? this.gl.UNSIGNED_SHORT
                : this.gl.UNSIGNED_INT); // Uint32Array
        attr.target = key === 'index' ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER;
        attr.normalized = attr.normalized || false;
        attr.stride = attr.stride || 0;
        attr.offset = attr.offset || 0;
        attr.count = attr.count || (attr.stride ? attr.data.byteLength / attr.stride : attr.data.length / attr.size);
        attr.divisor = attr.instanced || 0;
        attr.needsUpdate = false;
        attr.usage = attr.usage || this.gl.STATIC_DRAW;

        if (!attr.buffer) {
            // Push data to buffer
            this.updateAttribute(attr);
        }

        // Update geometry counts. If indexed, ignore regular attributes
        if (attr.divisor) {
            this.isInstanced = true;
            if (this.instancedCount && this.instancedCount !== attr.count * attr.divisor) {
                console.warn('geometry has multiple instanced buffers of different length');
                return (this.instancedCount = Math.min(this.instancedCount, attr.count * attr.divisor));
            }
            this.instancedCount = attr.count * attr.divisor;
        } else if (key === 'index') {
            this.drawRange.count = attr.count;
        } else if (!this.attributes.index) {
            this.drawRange.count = Math.max(this.drawRange.count, attr.count);
        }
    }

    updateAttribute(attr) {
        const isNewBuffer = !attr.buffer;
        if (isNewBuffer) attr.buffer = this.gl.createBuffer();
        if (this.glState.boundBuffer !== attr.buffer) {
            this.gl.bindBuffer(attr.target, attr.buffer);
            this.glState.boundBuffer = attr.buffer;
        }
        if (isNewBuffer) {
            this.gl.bufferData(attr.target, attr.data, attr.usage);
        } else {
            this.gl.bufferSubData(attr.target, 0, attr.data);
        }
        attr.needsUpdate = false;
    }

    setIndex(value) {
        this.addAttribute('index', value);
    }

    setDrawRange(start, count) {
        this.drawRange.start = start;
        this.drawRange.count = count;
    }

    setInstancedCount(value) {
        this.instancedCount = value;
    }

    createVAO(program) {
        this.VAOs[program.attributeOrder] = this.gl.renderer.createVertexArray();
        this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
        this.bindAttributes(program);
    }

    bindAttributes(program) {
        // Link all attributes to program using gl.vertexAttribPointer
        program.attributeLocations.forEach((location, { name, type }) => {
            // If geometry missing a required shader attribute
            if (!this.attributes[name]) {
                console.warn(`active attribute ${name} not being supplied`);
                return;
            }

            const attr = this.attributes[name];

            this.gl.bindBuffer(attr.target, attr.buffer);
            this.glState.boundBuffer = attr.buffer;

            // For matrix attributes, buffer needs to be defined per column
            let numLoc = 1;
            if (type === 35674) numLoc = 2; // mat2
            if (type === 35675) numLoc = 3; // mat3
            if (type === 35676) numLoc = 4; // mat4

            const size = attr.size / numLoc;
            const stride = numLoc === 1 ? 0 : numLoc * numLoc * numLoc;
            const offset = numLoc === 1 ? 0 : numLoc * numLoc;

            for (let i = 0; i < numLoc; i++) {
                this.gl.vertexAttribPointer(location + i, size, attr.type, attr.normalized, attr.stride + stride, attr.offset + i * offset);
                this.gl.enableVertexAttribArray(location + i);

                // For instanced attributes, divisor needs to be set.
                // For firefox, need to set back to 0 if non-instanced drawn after instanced. Else won't render
                this.gl.renderer.vertexAttribDivisor(location + i, attr.divisor);
            }
        });

        // Bind indices if geometry indexed
        if (this.attributes.index) this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.attributes.index.buffer);
    }

    draw({ program, mode = this.gl.TRIANGLES }) {
        if (this.gl.renderer.currentGeometry !== `${this.id}_${program.attributeOrder}`) {
            if (!this.VAOs[program.attributeOrder]) this.createVAO(program);
            this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
            this.gl.renderer.currentGeometry = `${this.id}_${program.attributeOrder}`;
        }

        // Check if any attributes need updating
        program.attributeLocations.forEach((location, { name }) => {
            const attr = this.attributes[name];
            if (attr.needsUpdate) this.updateAttribute(attr);
        });

        if (this.isInstanced) {
            if (this.attributes.index) {
                this.gl.renderer.drawElementsInstanced(
                    mode,
                    this.drawRange.count,
                    this.attributes.index.type,
                    this.attributes.index.offset + this.drawRange.start * 2,
                    this.instancedCount
                );
            } else {
                this.gl.renderer.drawArraysInstanced(mode, this.drawRange.start, this.drawRange.count, this.instancedCount);
            }
        } else {
            if (this.attributes.index) {
                this.gl.drawElements(mode, this.drawRange.count, this.attributes.index.type, this.attributes.index.offset + this.drawRange.start * 2);
            } else {
                this.gl.drawArrays(mode, this.drawRange.start, this.drawRange.count);
            }
        }
    }

    getPosition() {
        // Use position buffer, or min/max if available
        const attr = this.attributes.position;
        // if (attr.min) return [...attr.min, ...attr.max];
        if (attr.data) return attr;
        if (isBoundsWarned) return;
        console.warn('No position buffer data found to compute bounds');
        return (isBoundsWarned = true);
    }

    computeBoundingBox(attr) {
        if (!attr) attr = this.getPosition();
        const array = attr.data;
        const stride = attr.stride ? attr.stride / array.BYTES_PER_ELEMENT : attr.size;

        if (!this.bounds) {
            this.bounds = {
                min: new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__.Vec3(),
                max: new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__.Vec3(),
                center: new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__.Vec3(),
                scale: new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__.Vec3(),
                radius: Infinity,
            };
        }

        const min = this.bounds.min;
        const max = this.bounds.max;
        const center = this.bounds.center;
        const scale = this.bounds.scale;

        min.set(+Infinity);
        max.set(-Infinity);

        // TODO: check size of position (eg triangle with Vec2)
        for (let i = 0, l = array.length; i < l; i += stride) {
            const x = array[i];
            const y = array[i + 1];
            const z = array[i + 2];

            min.x = Math.min(x, min.x);
            min.y = Math.min(y, min.y);
            min.z = Math.min(z, min.z);

            max.x = Math.max(x, max.x);
            max.y = Math.max(y, max.y);
            max.z = Math.max(z, max.z);
        }

        scale.sub(max, min);
        center.add(min, max).divide(2);
    }

    computeBoundingSphere(attr) {
        if (!attr) attr = this.getPosition();
        const array = attr.data;
        const stride = attr.stride ? attr.stride / array.BYTES_PER_ELEMENT : attr.size;

        if (!this.bounds) this.computeBoundingBox(attr);

        let maxRadiusSq = 0;
        for (let i = 0, l = array.length; i < l; i += stride) {
            tempVec3.fromArray(array, i);
            maxRadiusSq = Math.max(maxRadiusSq, this.bounds.center.squaredDistance(tempVec3));
        }

        this.bounds.radius = Math.sqrt(maxRadiusSq);
    }

    remove() {
        for (let key in this.VAOs) {
            this.gl.renderer.deleteVertexArray(this.VAOs[key]);
            delete this.VAOs[key];
        }
        for (let key in this.attributes) {
            this.gl.deleteBuffer(this.attributes[key].buffer);
            delete this.attributes[key];
        }
    }
}


/***/ }),

/***/ "./node_modules/ogl/src/core/Mesh.js":
/*!*******************************************!*\
  !*** ./node_modules/ogl/src/core/Mesh.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Mesh": () => (/* binding */ Mesh)
/* harmony export */ });
/* harmony import */ var _Transform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Transform.js */ "./node_modules/ogl/src/core/Transform.js");
/* harmony import */ var _math_Mat3_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Mat3.js */ "./node_modules/ogl/src/math/Mat3.js");
/* harmony import */ var _math_Mat4_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Mat4.js */ "./node_modules/ogl/src/math/Mat4.js");




let ID = 0;

class Mesh extends _Transform_js__WEBPACK_IMPORTED_MODULE_0__.Transform {
    constructor(gl, { geometry, program, mode = gl.TRIANGLES, frustumCulled = true, renderOrder = 0 } = {}) {
        super();
        if (!gl.canvas) console.error('gl not passed as first argument to Mesh');
        this.gl = gl;
        this.id = ID++;
        this.geometry = geometry;
        this.program = program;
        this.mode = mode;

        // Used to skip frustum culling
        this.frustumCulled = frustumCulled;

        // Override sorting to force an order
        this.renderOrder = renderOrder;
        this.modelViewMatrix = new _math_Mat4_js__WEBPACK_IMPORTED_MODULE_1__.Mat4();
        this.normalMatrix = new _math_Mat3_js__WEBPACK_IMPORTED_MODULE_2__.Mat3();
        this.beforeRenderCallbacks = [];
        this.afterRenderCallbacks = [];
    }

    onBeforeRender(f) {
        this.beforeRenderCallbacks.push(f);
        return this;
    }

    onAfterRender(f) {
        this.afterRenderCallbacks.push(f);
        return this;
    }

    draw({ camera } = {}) {
        this.beforeRenderCallbacks.forEach((f) => f && f({ mesh: this, camera }));
        if (camera) {
            // Add empty matrix uniforms to program if unset
            if (!this.program.uniforms.modelMatrix) {
                Object.assign(this.program.uniforms, {
                    modelMatrix: { value: null },
                    viewMatrix: { value: null },
                    modelViewMatrix: { value: null },
                    normalMatrix: { value: null },
                    projectionMatrix: { value: null },
                    cameraPosition: { value: null },
                });
            }

            // Set the matrix uniforms
            this.program.uniforms.projectionMatrix.value = camera.projectionMatrix;
            this.program.uniforms.cameraPosition.value = camera.worldPosition;
            this.program.uniforms.viewMatrix.value = camera.viewMatrix;
            this.modelViewMatrix.multiply(camera.viewMatrix, this.worldMatrix);
            this.normalMatrix.getNormalMatrix(this.modelViewMatrix);
            this.program.uniforms.modelMatrix.value = this.worldMatrix;
            this.program.uniforms.modelViewMatrix.value = this.modelViewMatrix;
            this.program.uniforms.normalMatrix.value = this.normalMatrix;
        }

        // determine if faces need to be flipped - when mesh scaled negatively
        let flipFaces = this.program.cullFace && this.worldMatrix.determinant() < 0;
        this.program.use({ flipFaces });
        this.geometry.draw({ mode: this.mode, program: this.program });
        this.afterRenderCallbacks.forEach((f) => f && f({ mesh: this, camera }));
    }
}


/***/ }),

/***/ "./node_modules/ogl/src/core/Program.js":
/*!**********************************************!*\
  !*** ./node_modules/ogl/src/core/Program.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Program": () => (/* binding */ Program)
/* harmony export */ });
// TODO: upload empty texture if null ? maybe not
// TODO: upload identity matrix if null ?
// TODO: sampler Cube

let ID = 1;

// cache of typed arrays used to flatten uniform arrays
const arrayCacheF32 = {};

class Program {
    constructor(
        gl,
        {
            vertex,
            fragment,
            uniforms = {},

            transparent = false,
            cullFace = gl.BACK,
            frontFace = gl.CCW,
            depthTest = true,
            depthWrite = true,
            depthFunc = gl.LESS,
        } = {}
    ) {
        if (!gl.canvas) console.error('gl not passed as fist argument to Program');
        this.gl = gl;
        this.uniforms = uniforms;
        this.id = ID++;

        if (!vertex) console.warn('vertex shader not supplied');
        if (!fragment) console.warn('fragment shader not supplied');

        // Store program state
        this.transparent = transparent;
        this.cullFace = cullFace;
        this.frontFace = frontFace;
        this.depthTest = depthTest;
        this.depthWrite = depthWrite;
        this.depthFunc = depthFunc;
        this.blendFunc = {};
        this.blendEquation = {};

        // set default blendFunc if transparent flagged
        if (this.transparent && !this.blendFunc.src) {
            if (this.gl.renderer.premultipliedAlpha) this.setBlendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
            else this.setBlendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        }

        // compile vertex shader and log errors
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertex);
        gl.compileShader(vertexShader);
        if (gl.getShaderInfoLog(vertexShader) !== '') {
            console.warn(`${gl.getShaderInfoLog(vertexShader)}\nVertex Shader\n${addLineNumbers(vertex)}`);
        }

        // compile fragment shader and log errors
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragment);
        gl.compileShader(fragmentShader);
        if (gl.getShaderInfoLog(fragmentShader) !== '') {
            console.warn(`${gl.getShaderInfoLog(fragmentShader)}\nFragment Shader\n${addLineNumbers(fragment)}`);
        }

        // compile program and log errors
        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            return console.warn(gl.getProgramInfoLog(this.program));
        }

        // Remove shader once linked
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);

        // Get active uniform locations
        this.uniformLocations = new Map();
        let numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
        for (let uIndex = 0; uIndex < numUniforms; uIndex++) {
            let uniform = gl.getActiveUniform(this.program, uIndex);
            this.uniformLocations.set(uniform, gl.getUniformLocation(this.program, uniform.name));

            // split uniforms' names to separate array and struct declarations
            const split = uniform.name.match(/(\w+)/g);

            uniform.uniformName = split[0];

            if (split.length === 3) {
                uniform.isStructArray = true;
                uniform.structIndex = Number(split[1]);
                uniform.structProperty = split[2];
            } else if (split.length === 2 && isNaN(Number(split[1]))) {
                uniform.isStruct = true;
                uniform.structProperty = split[1];
            }
        }

        // Get active attribute locations
        this.attributeLocations = new Map();
        const locations = [];
        const numAttribs = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
        for (let aIndex = 0; aIndex < numAttribs; aIndex++) {
            const attribute = gl.getActiveAttrib(this.program, aIndex);
            const location = gl.getAttribLocation(this.program, attribute.name);
            // Ignore special built-in inputs. eg gl_VertexID, gl_InstanceID
            if (location === -1) continue;
            locations[location] = attribute.name;
            this.attributeLocations.set(attribute, location);
        }
        this.attributeOrder = locations.join('');
    }

    setBlendFunc(src, dst, srcAlpha, dstAlpha) {
        this.blendFunc.src = src;
        this.blendFunc.dst = dst;
        this.blendFunc.srcAlpha = srcAlpha;
        this.blendFunc.dstAlpha = dstAlpha;
        if (src) this.transparent = true;
    }

    setBlendEquation(modeRGB, modeAlpha) {
        this.blendEquation.modeRGB = modeRGB;
        this.blendEquation.modeAlpha = modeAlpha;
    }

    applyState() {
        if (this.depthTest) this.gl.renderer.enable(this.gl.DEPTH_TEST);
        else this.gl.renderer.disable(this.gl.DEPTH_TEST);

        if (this.cullFace) this.gl.renderer.enable(this.gl.CULL_FACE);
        else this.gl.renderer.disable(this.gl.CULL_FACE);

        if (this.blendFunc.src) this.gl.renderer.enable(this.gl.BLEND);
        else this.gl.renderer.disable(this.gl.BLEND);

        if (this.cullFace) this.gl.renderer.setCullFace(this.cullFace);
        this.gl.renderer.setFrontFace(this.frontFace);
        this.gl.renderer.setDepthMask(this.depthWrite);
        this.gl.renderer.setDepthFunc(this.depthFunc);
        if (this.blendFunc.src)
            this.gl.renderer.setBlendFunc(this.blendFunc.src, this.blendFunc.dst, this.blendFunc.srcAlpha, this.blendFunc.dstAlpha);
        this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB, this.blendEquation.modeAlpha);
    }

    use({ flipFaces = false } = {}) {
        let textureUnit = -1;
        const programActive = this.gl.renderer.state.currentProgram === this.id;

        // Avoid gl call if program already in use
        if (!programActive) {
            this.gl.useProgram(this.program);
            this.gl.renderer.state.currentProgram = this.id;
        }

        // Set only the active uniforms found in the shader
        this.uniformLocations.forEach((location, activeUniform) => {
            let name = activeUniform.uniformName;

            // get supplied uniform
            let uniform = this.uniforms[name];

            // For structs, get the specific property instead of the entire object
            if (activeUniform.isStruct) {
                uniform = uniform[activeUniform.structProperty];
                name += `.${activeUniform.structProperty}`;
            }
            if (activeUniform.isStructArray) {
                uniform = uniform[activeUniform.structIndex][activeUniform.structProperty];
                name += `[${activeUniform.structIndex}].${activeUniform.structProperty}`;
            }

            if (!uniform) {
                return warn(`Active uniform ${name} has not been supplied`);
            }

            if (uniform && uniform.value === undefined) {
                return warn(`${name} uniform is missing a value parameter`);
            }

            if (uniform.value.texture) {
                textureUnit = textureUnit + 1;

                // Check if texture needs to be updated
                uniform.value.update(textureUnit);
                return setUniform(this.gl, activeUniform.type, location, textureUnit);
            }

            // For texture arrays, set uniform as an array of texture units instead of just one
            if (uniform.value.length && uniform.value[0].texture) {
                const textureUnits = [];
                uniform.value.forEach((value) => {
                    textureUnit = textureUnit + 1;
                    value.update(textureUnit);
                    textureUnits.push(textureUnit);
                });

                return setUniform(this.gl, activeUniform.type, location, textureUnits);
            }

            setUniform(this.gl, activeUniform.type, location, uniform.value);
        });

        this.applyState();
        if (flipFaces) this.gl.renderer.setFrontFace(this.frontFace === this.gl.CCW ? this.gl.CW : this.gl.CCW);
    }

    remove() {
        this.gl.deleteProgram(this.program);
    }
}

function setUniform(gl, type, location, value) {
    value = value.length ? flatten(value) : value;
    const setValue = gl.renderer.state.uniformLocations.get(location);

    // Avoid redundant uniform commands
    if (value.length) {
        if (setValue === undefined || setValue.length !== value.length) {
            // clone array to store as cache
            gl.renderer.state.uniformLocations.set(location, value.slice(0));
        } else {
            if (arraysEqual(setValue, value)) return;

            // Update cached array values
            setValue.set ? setValue.set(value) : setArray(setValue, value);
            gl.renderer.state.uniformLocations.set(location, setValue);
        }
    } else {
        if (setValue === value) return;
        gl.renderer.state.uniformLocations.set(location, value);
    }

    switch (type) {
        case 5126:
            return value.length ? gl.uniform1fv(location, value) : gl.uniform1f(location, value); // FLOAT
        case 35664:
            return gl.uniform2fv(location, value); // FLOAT_VEC2
        case 35665:
            return gl.uniform3fv(location, value); // FLOAT_VEC3
        case 35666:
            return gl.uniform4fv(location, value); // FLOAT_VEC4
        case 35670: // BOOL
        case 5124: // INT
        case 35678: // SAMPLER_2D
        case 35680:
            return value.length ? gl.uniform1iv(location, value) : gl.uniform1i(location, value); // SAMPLER_CUBE
        case 35671: // BOOL_VEC2
        case 35667:
            return gl.uniform2iv(location, value); // INT_VEC2
        case 35672: // BOOL_VEC3
        case 35668:
            return gl.uniform3iv(location, value); // INT_VEC3
        case 35673: // BOOL_VEC4
        case 35669:
            return gl.uniform4iv(location, value); // INT_VEC4
        case 35674:
            return gl.uniformMatrix2fv(location, false, value); // FLOAT_MAT2
        case 35675:
            return gl.uniformMatrix3fv(location, false, value); // FLOAT_MAT3
        case 35676:
            return gl.uniformMatrix4fv(location, false, value); // FLOAT_MAT4
    }
}

function addLineNumbers(string) {
    let lines = string.split('\n');
    for (let i = 0; i < lines.length; i++) {
        lines[i] = i + 1 + ': ' + lines[i];
    }
    return lines.join('\n');
}

function flatten(a) {
    const arrayLen = a.length;
    const valueLen = a[0].length;
    if (valueLen === undefined) return a;
    const length = arrayLen * valueLen;
    let value = arrayCacheF32[length];
    if (!value) arrayCacheF32[length] = value = new Float32Array(length);
    for (let i = 0; i < arrayLen; i++) value.set(a[i], i * valueLen);
    return value;
}

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0, l = a.length; i < l; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function setArray(a, b) {
    for (let i = 0, l = a.length; i < l; i++) {
        a[i] = b[i];
    }
}

let warnCount = 0;
function warn(message) {
    if (warnCount > 100) return;
    console.warn(message);
    warnCount++;
    if (warnCount > 100) console.warn('More than 100 program warnings - stopping logs.');
}


/***/ }),

/***/ "./node_modules/ogl/src/core/Renderer.js":
/*!***********************************************!*\
  !*** ./node_modules/ogl/src/core/Renderer.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Renderer": () => (/* binding */ Renderer)
/* harmony export */ });
/* harmony import */ var _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vec3.js */ "./node_modules/ogl/src/math/Vec3.js");


// TODO: Handle context loss https://www.khronos.org/webgl/wiki/HandlingContextLost

// Not automatic - devs to use these methods manually
// gl.colorMask( colorMask, colorMask, colorMask, colorMask );
// gl.clearColor( r, g, b, a );
// gl.stencilMask( stencilMask );
// gl.stencilFunc( stencilFunc, stencilRef, stencilMask );
// gl.stencilOp( stencilFail, stencilZFail, stencilZPass );
// gl.clearStencil( stencil );

const tempVec3 = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__.Vec3();
let ID = 1;

class Renderer {
    constructor({
        canvas = document.createElement('canvas'),
        width = 300,
        height = 150,
        dpr = 1,
        alpha = false,
        depth = true,
        stencil = false,
        antialias = false,
        premultipliedAlpha = false,
        preserveDrawingBuffer = false,
        powerPreference = 'default',
        autoClear = true,
        webgl = 2,
    } = {}) {
        const attributes = { alpha, depth, stencil, antialias, premultipliedAlpha, preserveDrawingBuffer, powerPreference };
        this.dpr = dpr;
        this.alpha = alpha;
        this.color = true;
        this.depth = depth;
        this.stencil = stencil;
        this.premultipliedAlpha = premultipliedAlpha;
        this.autoClear = autoClear;
        this.id = ID++;

        // Attempt WebGL2 unless forced to 1, if not supported fallback to WebGL1
        if (webgl === 2) this.gl = canvas.getContext('webgl2', attributes);
        this.isWebgl2 = !!this.gl;
        if (!this.gl) this.gl = canvas.getContext('webgl', attributes);
        if (!this.gl) console.error('unable to create webgl context');

        // Attach renderer to gl so that all classes have access to internal state functions
        this.gl.renderer = this;

        // initialise size values
        this.setSize(width, height);

        // gl state stores to avoid redundant calls on methods used internally
        this.state = {};
        this.state.blendFunc = { src: this.gl.ONE, dst: this.gl.ZERO };
        this.state.blendEquation = { modeRGB: this.gl.FUNC_ADD };
        this.state.cullFace = null;
        this.state.frontFace = this.gl.CCW;
        this.state.depthMask = true;
        this.state.depthFunc = this.gl.LESS;
        this.state.premultiplyAlpha = false;
        this.state.flipY = false;
        this.state.unpackAlignment = 4;
        this.state.framebuffer = null;
        this.state.viewport = { x: 0, y: 0, width: null, height: null };
        this.state.textureUnits = [];
        this.state.activeTextureUnit = 0;
        this.state.boundBuffer = null;
        this.state.uniformLocations = new Map();
        this.state.currentProgram = null;

        // store requested extensions
        this.extensions = {};

        // Initialise extra format types
        if (this.isWebgl2) {
            this.getExtension('EXT_color_buffer_float');
            this.getExtension('OES_texture_float_linear');
        } else {
            this.getExtension('OES_texture_float');
            this.getExtension('OES_texture_float_linear');
            this.getExtension('OES_texture_half_float');
            this.getExtension('OES_texture_half_float_linear');
            this.getExtension('OES_element_index_uint');
            this.getExtension('OES_standard_derivatives');
            this.getExtension('EXT_sRGB');
            this.getExtension('WEBGL_depth_texture');
            this.getExtension('WEBGL_draw_buffers');
        }
        this.getExtension('WEBGL_compressed_texture_astc');
        this.getExtension('EXT_texture_compression_bptc');
        this.getExtension('WEBGL_compressed_texture_s3tc');
        this.getExtension('WEBGL_compressed_texture_etc1');
        this.getExtension('WEBGL_compressed_texture_pvrtc');
        this.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc');

        // Create method aliases using extension (WebGL1) or native if available (WebGL2)
        this.vertexAttribDivisor = this.getExtension('ANGLE_instanced_arrays', 'vertexAttribDivisor', 'vertexAttribDivisorANGLE');
        this.drawArraysInstanced = this.getExtension('ANGLE_instanced_arrays', 'drawArraysInstanced', 'drawArraysInstancedANGLE');
        this.drawElementsInstanced = this.getExtension('ANGLE_instanced_arrays', 'drawElementsInstanced', 'drawElementsInstancedANGLE');
        this.createVertexArray = this.getExtension('OES_vertex_array_object', 'createVertexArray', 'createVertexArrayOES');
        this.bindVertexArray = this.getExtension('OES_vertex_array_object', 'bindVertexArray', 'bindVertexArrayOES');
        this.deleteVertexArray = this.getExtension('OES_vertex_array_object', 'deleteVertexArray', 'deleteVertexArrayOES');
        this.drawBuffers = this.getExtension('WEBGL_draw_buffers', 'drawBuffers', 'drawBuffersWEBGL');

        // Store device parameters
        this.parameters = {};
        this.parameters.maxTextureUnits = this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
        this.parameters.maxAnisotropy = this.getExtension('EXT_texture_filter_anisotropic')
            ? this.gl.getParameter(this.getExtension('EXT_texture_filter_anisotropic').MAX_TEXTURE_MAX_ANISOTROPY_EXT)
            : 0;
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;

        this.gl.canvas.width = width * this.dpr;
        this.gl.canvas.height = height * this.dpr;

        Object.assign(this.gl.canvas.style, {
            width: width + 'px',
            height: height + 'px',
        });
    }

    setViewport(width, height, x = 0, y = 0) {
        if (this.state.viewport.width === width && this.state.viewport.height === height) return;
        this.state.viewport.width = width;
        this.state.viewport.height = height;
        this.state.viewport.x = x;
        this.state.viewport.y = y;
        this.gl.viewport(x, y, width, height);
    }

    setScissor(width, height, x = 0, y = 0) {
        this.gl.scissor(x, y, width, height);
    }

    enable(id) {
        if (this.state[id] === true) return;
        this.gl.enable(id);
        this.state[id] = true;
    }

    disable(id) {
        if (this.state[id] === false) return;
        this.gl.disable(id);
        this.state[id] = false;
    }

    setBlendFunc(src, dst, srcAlpha, dstAlpha) {
        if (
            this.state.blendFunc.src === src &&
            this.state.blendFunc.dst === dst &&
            this.state.blendFunc.srcAlpha === srcAlpha &&
            this.state.blendFunc.dstAlpha === dstAlpha
        )
            return;
        this.state.blendFunc.src = src;
        this.state.blendFunc.dst = dst;
        this.state.blendFunc.srcAlpha = srcAlpha;
        this.state.blendFunc.dstAlpha = dstAlpha;
        if (srcAlpha !== undefined) this.gl.blendFuncSeparate(src, dst, srcAlpha, dstAlpha);
        else this.gl.blendFunc(src, dst);
    }

    setBlendEquation(modeRGB, modeAlpha) {
        modeRGB = modeRGB || this.gl.FUNC_ADD;
        if (this.state.blendEquation.modeRGB === modeRGB && this.state.blendEquation.modeAlpha === modeAlpha) return;
        this.state.blendEquation.modeRGB = modeRGB;
        this.state.blendEquation.modeAlpha = modeAlpha;
        if (modeAlpha !== undefined) this.gl.blendEquationSeparate(modeRGB, modeAlpha);
        else this.gl.blendEquation(modeRGB);
    }

    setCullFace(value) {
        if (this.state.cullFace === value) return;
        this.state.cullFace = value;
        this.gl.cullFace(value);
    }

    setFrontFace(value) {
        if (this.state.frontFace === value) return;
        this.state.frontFace = value;
        this.gl.frontFace(value);
    }

    setDepthMask(value) {
        if (this.state.depthMask === value) return;
        this.state.depthMask = value;
        this.gl.depthMask(value);
    }

    setDepthFunc(value) {
        if (this.state.depthFunc === value) return;
        this.state.depthFunc = value;
        this.gl.depthFunc(value);
    }

    activeTexture(value) {
        if (this.state.activeTextureUnit === value) return;
        this.state.activeTextureUnit = value;
        this.gl.activeTexture(this.gl.TEXTURE0 + value);
    }

    bindFramebuffer({ target = this.gl.FRAMEBUFFER, buffer = null } = {}) {
        if (this.state.framebuffer === buffer) return;
        this.state.framebuffer = buffer;
        this.gl.bindFramebuffer(target, buffer);
    }

    getExtension(extension, webgl2Func, extFunc) {
        // if webgl2 function supported, return func bound to gl context
        if (webgl2Func && this.gl[webgl2Func]) return this.gl[webgl2Func].bind(this.gl);

        // fetch extension once only
        if (!this.extensions[extension]) {
            this.extensions[extension] = this.gl.getExtension(extension);
        }

        // return extension if no function requested
        if (!webgl2Func) return this.extensions[extension];

        // Return null if extension not supported
        if (!this.extensions[extension]) return null;

        // return extension function, bound to extension
        return this.extensions[extension][extFunc].bind(this.extensions[extension]);
    }

    sortOpaque(a, b) {
        if (a.renderOrder !== b.renderOrder) {
            return a.renderOrder - b.renderOrder;
        } else if (a.program.id !== b.program.id) {
            return a.program.id - b.program.id;
        } else if (a.zDepth !== b.zDepth) {
            return a.zDepth - b.zDepth;
        } else {
            return b.id - a.id;
        }
    }

    sortTransparent(a, b) {
        if (a.renderOrder !== b.renderOrder) {
            return a.renderOrder - b.renderOrder;
        }
        if (a.zDepth !== b.zDepth) {
            return b.zDepth - a.zDepth;
        } else {
            return b.id - a.id;
        }
    }

    sortUI(a, b) {
        if (a.renderOrder !== b.renderOrder) {
            return a.renderOrder - b.renderOrder;
        } else if (a.program.id !== b.program.id) {
            return a.program.id - b.program.id;
        } else {
            return b.id - a.id;
        }
    }

    getRenderList({ scene, camera, frustumCull, sort }) {
        let renderList = [];

        if (camera && frustumCull) camera.updateFrustum();

        // Get visible
        scene.traverse((node) => {
            if (!node.visible) return true;
            if (!node.draw) return;

            if (frustumCull && node.frustumCulled && camera) {
                if (!camera.frustumIntersectsMesh(node)) return;
            }

            renderList.push(node);
        });

        if (sort) {
            const opaque = [];
            const transparent = []; // depthTest true
            const ui = []; // depthTest false

            renderList.forEach((node) => {
                // Split into the 3 render groups
                if (!node.program.transparent) {
                    opaque.push(node);
                } else if (node.program.depthTest) {
                    transparent.push(node);
                } else {
                    ui.push(node);
                }

                node.zDepth = 0;

                // Only calculate z-depth if renderOrder unset and depthTest is true
                if (node.renderOrder !== 0 || !node.program.depthTest || !camera) return;

                // update z-depth
                node.worldMatrix.getTranslation(tempVec3);
                tempVec3.applyMatrix4(camera.projectionViewMatrix);
                node.zDepth = tempVec3.z;
            });

            opaque.sort(this.sortOpaque);
            transparent.sort(this.sortTransparent);
            ui.sort(this.sortUI);

            renderList = opaque.concat(transparent, ui);
        }

        return renderList;
    }

    render({ scene, camera, target = null, update = true, sort = true, frustumCull = true, clear }) {
        if (target === null) {
            // make sure no render target bound so draws to canvas
            this.bindFramebuffer();
            this.setViewport(this.width * this.dpr, this.height * this.dpr);
        } else {
            // bind supplied render target and update viewport
            this.bindFramebuffer(target);
            this.setViewport(target.width, target.height);
        }

        if (clear || (this.autoClear && clear !== false)) {
            // Ensure depth buffer writing is enabled so it can be cleared
            if (this.depth && (!target || target.depth)) {
                this.enable(this.gl.DEPTH_TEST);
                this.setDepthMask(true);
            }
            this.gl.clear(
                (this.color ? this.gl.COLOR_BUFFER_BIT : 0) |
                    (this.depth ? this.gl.DEPTH_BUFFER_BIT : 0) |
                    (this.stencil ? this.gl.STENCIL_BUFFER_BIT : 0)
            );
        }

        // updates all scene graph matrices
        if (update) scene.updateMatrixWorld();

        // Update camera separately, in case not in scene graph
        if (camera) camera.updateMatrixWorld();

        // Get render list - entails culling and sorting
        const renderList = this.getRenderList({ scene, camera, frustumCull, sort });

        renderList.forEach((node) => {
            node.draw({ camera });
        });
    }
}


/***/ }),

/***/ "./node_modules/ogl/src/core/Texture.js":
/*!**********************************************!*\
  !*** ./node_modules/ogl/src/core/Texture.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Texture": () => (/* binding */ Texture)
/* harmony export */ });
// TODO: delete texture
// TODO: use texSubImage2D for updates (video or when loaded)
// TODO: need? encoding = linearEncoding
// TODO: support non-compressed mipmaps uploads

const emptyPixel = new Uint8Array(4);

function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
}

let ID = 1;

class Texture {
    constructor(
        gl,
        {
            image,
            target = gl.TEXTURE_2D,
            type = gl.UNSIGNED_BYTE,
            format = gl.RGBA,
            internalFormat = format,
            wrapS = gl.CLAMP_TO_EDGE,
            wrapT = gl.CLAMP_TO_EDGE,
            generateMipmaps = true,
            minFilter = generateMipmaps ? gl.NEAREST_MIPMAP_LINEAR : gl.LINEAR,
            magFilter = gl.LINEAR,
            premultiplyAlpha = false,
            unpackAlignment = 4,
            flipY = target == gl.TEXTURE_2D ? true : false,
            anisotropy = 0,
            level = 0,
            width, // used for RenderTargets or Data Textures
            height = width,
        } = {}
    ) {
        this.gl = gl;
        this.id = ID++;

        this.image = image;
        this.target = target;
        this.type = type;
        this.format = format;
        this.internalFormat = internalFormat;
        this.minFilter = minFilter;
        this.magFilter = magFilter;
        this.wrapS = wrapS;
        this.wrapT = wrapT;
        this.generateMipmaps = generateMipmaps;
        this.premultiplyAlpha = premultiplyAlpha;
        this.unpackAlignment = unpackAlignment;
        this.flipY = flipY;
        this.anisotropy = Math.min(anisotropy, this.gl.renderer.parameters.maxAnisotropy);
        this.level = level;
        this.width = width;
        this.height = height;
        this.texture = this.gl.createTexture();

        this.store = {
            image: null,
        };

        // Alias for state store to avoid redundant calls for global state
        this.glState = this.gl.renderer.state;

        // State store to avoid redundant calls for per-texture state
        this.state = {};
        this.state.minFilter = this.gl.NEAREST_MIPMAP_LINEAR;
        this.state.magFilter = this.gl.LINEAR;
        this.state.wrapS = this.gl.REPEAT;
        this.state.wrapT = this.gl.REPEAT;
        this.state.anisotropy = 0;
    }

    bind() {
        // Already bound to active texture unit
        if (this.glState.textureUnits[this.glState.activeTextureUnit] === this.id) return;
        this.gl.bindTexture(this.target, this.texture);
        this.glState.textureUnits[this.glState.activeTextureUnit] = this.id;
    }

    update(textureUnit = 0) {
        const needsUpdate = !(this.image === this.store.image && !this.needsUpdate);

        // Make sure that texture is bound to its texture unit
        if (needsUpdate || this.glState.textureUnits[textureUnit] !== this.id) {
            // set active texture unit to perform texture functions
            this.gl.renderer.activeTexture(textureUnit);
            this.bind();
        }

        if (!needsUpdate) return;
        this.needsUpdate = false;

        if (this.flipY !== this.glState.flipY) {
            this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
            this.glState.flipY = this.flipY;
        }

        if (this.premultiplyAlpha !== this.glState.premultiplyAlpha) {
            this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
            this.glState.premultiplyAlpha = this.premultiplyAlpha;
        }

        if (this.unpackAlignment !== this.glState.unpackAlignment) {
            this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, this.unpackAlignment);
            this.glState.unpackAlignment = this.unpackAlignment;
        }

        if (this.minFilter !== this.state.minFilter) {
            this.gl.texParameteri(this.target, this.gl.TEXTURE_MIN_FILTER, this.minFilter);
            this.state.minFilter = this.minFilter;
        }

        if (this.magFilter !== this.state.magFilter) {
            this.gl.texParameteri(this.target, this.gl.TEXTURE_MAG_FILTER, this.magFilter);
            this.state.magFilter = this.magFilter;
        }

        if (this.wrapS !== this.state.wrapS) {
            this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_S, this.wrapS);
            this.state.wrapS = this.wrapS;
        }

        if (this.wrapT !== this.state.wrapT) {
            this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_T, this.wrapT);
            this.state.wrapT = this.wrapT;
        }

        if (this.anisotropy && this.anisotropy !== this.state.anisotropy) {
            this.gl.texParameterf(
                this.target,
                this.gl.renderer.getExtension('EXT_texture_filter_anisotropic').TEXTURE_MAX_ANISOTROPY_EXT,
                this.anisotropy
            );
            this.state.anisotropy = this.anisotropy;
        }

        if (this.image) {
            if (this.image.width) {
                this.width = this.image.width;
                this.height = this.image.height;
            }

            if (this.target === this.gl.TEXTURE_CUBE_MAP) {
                // For cube maps
                for (let i = 0; i < 6; i++) {
                    this.gl.texImage2D(
                        this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
                        this.level,
                        this.internalFormat,
                        this.format,
                        this.type,
                        this.image[i]
                    );
                }
            } else if (ArrayBuffer.isView(this.image)) {
                // Data texture
                this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, this.image);
            } else if (this.image.isCompressedTexture) {
                // Compressed texture
                for (let level = 0; level < this.image.length; level++) {
                    this.gl.compressedTexImage2D(
                        this.target,
                        level,
                        this.internalFormat,
                        this.image[level].width,
                        this.image[level].height,
                        0,
                        this.image[level].data
                    );
                }
            } else {
                // Regular texture
                this.gl.texImage2D(this.target, this.level, this.internalFormat, this.format, this.type, this.image);
            }

            if (this.generateMipmaps) {
                // For WebGL1, if not a power of 2, turn off mips, set wrapping to clamp to edge and minFilter to linear
                if (!this.gl.renderer.isWebgl2 && (!isPowerOf2(this.image.width) || !isPowerOf2(this.image.height))) {
                    this.generateMipmaps = false;
                    this.wrapS = this.wrapT = this.gl.CLAMP_TO_EDGE;
                    this.minFilter = this.gl.LINEAR;
                } else {
                    this.gl.generateMipmap(this.target);
                }
            }

            // Callback for when data is pushed to GPU
            this.onUpdate && this.onUpdate();
        } else {
            if (this.target === this.gl.TEXTURE_CUBE_MAP) {
                // Upload empty pixel for each side while no image to avoid errors while image or video loading
                for (let i = 0; i < 6; i++) {
                    this.gl.texImage2D(
                        this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
                        0,
                        this.gl.RGBA,
                        1,
                        1,
                        0,
                        this.gl.RGBA,
                        this.gl.UNSIGNED_BYTE,
                        emptyPixel
                    );
                }
            } else if (this.width) {
                // image intentionally left null for RenderTarget
                this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, null);
            } else {
                // Upload empty pixel if no image to avoid errors while image or video loading
                this.gl.texImage2D(this.target, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, emptyPixel);
            }
        }
        this.store.image = this.image;
    }
}


/***/ }),

/***/ "./node_modules/ogl/src/core/Transform.js":
/*!************************************************!*\
  !*** ./node_modules/ogl/src/core/Transform.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Transform": () => (/* binding */ Transform)
/* harmony export */ });
/* harmony import */ var _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Vec3.js */ "./node_modules/ogl/src/math/Vec3.js");
/* harmony import */ var _math_Quat_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Quat.js */ "./node_modules/ogl/src/math/Quat.js");
/* harmony import */ var _math_Mat4_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Mat4.js */ "./node_modules/ogl/src/math/Mat4.js");
/* harmony import */ var _math_Euler_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../math/Euler.js */ "./node_modules/ogl/src/math/Euler.js");





class Transform {
    constructor() {
        this.parent = null;
        this.children = [];
        this.visible = true;

        this.matrix = new _math_Mat4_js__WEBPACK_IMPORTED_MODULE_0__.Mat4();
        this.worldMatrix = new _math_Mat4_js__WEBPACK_IMPORTED_MODULE_0__.Mat4();
        this.matrixAutoUpdate = true;

        this.position = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();
        this.quaternion = new _math_Quat_js__WEBPACK_IMPORTED_MODULE_2__.Quat();
        this.scale = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3(1);
        this.rotation = new _math_Euler_js__WEBPACK_IMPORTED_MODULE_3__.Euler();
        this.up = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3(0, 1, 0);

        this.rotation.onChange = () => this.quaternion.fromEuler(this.rotation);
        this.quaternion.onChange = () => this.rotation.fromQuaternion(this.quaternion);
    }

    setParent(parent, notifyParent = true) {
        if (this.parent && parent !== this.parent) this.parent.removeChild(this, false);
        this.parent = parent;
        if (notifyParent && parent) parent.addChild(this, false);
    }

    addChild(child, notifyChild = true) {
        if (!~this.children.indexOf(child)) this.children.push(child);
        if (notifyChild) child.setParent(this, false);
    }

    removeChild(child, notifyChild = true) {
        if (!!~this.children.indexOf(child)) this.children.splice(this.children.indexOf(child), 1);
        if (notifyChild) child.setParent(null, false);
    }

    updateMatrixWorld(force) {
        if (this.matrixAutoUpdate) this.updateMatrix();
        if (this.worldMatrixNeedsUpdate || force) {
            if (this.parent === null) this.worldMatrix.copy(this.matrix);
            else this.worldMatrix.multiply(this.parent.worldMatrix, this.matrix);
            this.worldMatrixNeedsUpdate = false;
            force = true;
        }

        for (let i = 0, l = this.children.length; i < l; i++) {
            this.children[i].updateMatrixWorld(force);
        }
    }

    updateMatrix() {
        this.matrix.compose(this.quaternion, this.position, this.scale);
        this.worldMatrixNeedsUpdate = true;
    }

    traverse(callback) {
        // Return true in callback to stop traversing children
        if (callback(this)) return;
        for (let i = 0, l = this.children.length; i < l; i++) {
            this.children[i].traverse(callback);
        }
    }

    decompose() {
        this.matrix.getTranslation(this.position);
        this.matrix.getRotation(this.quaternion);
        this.matrix.getScaling(this.scale);
        this.rotation.fromQuaternion(this.quaternion);
    }

    lookAt(target, invert = false) {
        if (invert) this.matrix.lookAt(this.position, target, this.up);
        else this.matrix.lookAt(target, this.position, this.up);
        this.matrix.getRotation(this.quaternion);
        this.rotation.fromQuaternion(this.quaternion);
    }
}


/***/ }),

/***/ "./node_modules/ogl/src/extras/Plane.js":
/*!**********************************************!*\
  !*** ./node_modules/ogl/src/extras/Plane.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Plane": () => (/* binding */ Plane)
/* harmony export */ });
/* harmony import */ var _core_Geometry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Geometry.js */ "./node_modules/ogl/src/core/Geometry.js");


class Plane extends _core_Geometry_js__WEBPACK_IMPORTED_MODULE_0__.Geometry {
    constructor(gl, { width = 1, height = 1, widthSegments = 1, heightSegments = 1, attributes = {} } = {}) {
        const wSegs = widthSegments;
        const hSegs = heightSegments;

        // Determine length of arrays
        const num = (wSegs + 1) * (hSegs + 1);
        const numIndices = wSegs * hSegs * 6;

        // Generate empty arrays once
        const position = new Float32Array(num * 3);
        const normal = new Float32Array(num * 3);
        const uv = new Float32Array(num * 2);
        const index = numIndices > 65536 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);

        Plane.buildPlane(position, normal, uv, index, width, height, 0, wSegs, hSegs);

        Object.assign(attributes, {
            position: { size: 3, data: position },
            normal: { size: 3, data: normal },
            uv: { size: 2, data: uv },
            index: { data: index },
        });

        super(gl, attributes);
    }

    static buildPlane(position, normal, uv, index, width, height, depth, wSegs, hSegs, u = 0, v = 1, w = 2, uDir = 1, vDir = -1, i = 0, ii = 0) {
        const io = i;
        const segW = width / wSegs;
        const segH = height / hSegs;

        for (let iy = 0; iy <= hSegs; iy++) {
            let y = iy * segH - height / 2;
            for (let ix = 0; ix <= wSegs; ix++, i++) {
                let x = ix * segW - width / 2;

                position[i * 3 + u] = x * uDir;
                position[i * 3 + v] = y * vDir;
                position[i * 3 + w] = depth / 2;

                normal[i * 3 + u] = 0;
                normal[i * 3 + v] = 0;
                normal[i * 3 + w] = depth >= 0 ? 1 : -1;

                uv[i * 2] = ix / wSegs;
                uv[i * 2 + 1] = 1 - iy / hSegs;

                if (iy === hSegs || ix === wSegs) continue;
                let a = io + ix + iy * (wSegs + 1);
                let b = io + ix + (iy + 1) * (wSegs + 1);
                let c = io + ix + (iy + 1) * (wSegs + 1) + 1;
                let d = io + ix + iy * (wSegs + 1) + 1;

                index[ii * 6] = a;
                index[ii * 6 + 1] = b;
                index[ii * 6 + 2] = d;
                index[ii * 6 + 3] = b;
                index[ii * 6 + 4] = c;
                index[ii * 6 + 5] = d;
                ii++;
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/ogl/src/extras/Raycast.js":
/*!************************************************!*\
  !*** ./node_modules/ogl/src/extras/Raycast.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Raycast": () => (/* binding */ Raycast)
/* harmony export */ });
/* harmony import */ var _math_Vec2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vec2.js */ "./node_modules/ogl/src/math/Vec2.js");
/* harmony import */ var _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Vec3.js */ "./node_modules/ogl/src/math/Vec3.js");
/* harmony import */ var _math_Mat4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Mat4.js */ "./node_modules/ogl/src/math/Mat4.js");
// TODO: barycentric code shouldn't be here, but where?
// TODO: SphereCast?





const tempVec2a = new _math_Vec2_js__WEBPACK_IMPORTED_MODULE_0__.Vec2();
const tempVec2b = new _math_Vec2_js__WEBPACK_IMPORTED_MODULE_0__.Vec2();
const tempVec2c = new _math_Vec2_js__WEBPACK_IMPORTED_MODULE_0__.Vec2();

const tempVec3a = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();
const tempVec3b = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();
const tempVec3c = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();
const tempVec3d = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();
const tempVec3e = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();
const tempVec3f = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();
const tempVec3g = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();
const tempVec3h = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();
const tempVec3i = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();
const tempVec3j = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();
const tempVec3k = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();

const tempMat4 = new _math_Mat4_js__WEBPACK_IMPORTED_MODULE_2__.Mat4();

class Raycast {
    constructor() {
        this.origin = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();
        this.direction = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();
    }

    // Set ray from mouse unprojection
    castMouse(camera, mouse = [0, 0]) {
        if (camera.type === 'orthographic') {
            // Set origin
            // Since camera is orthographic, origin is not the camera position
            const { left, right, bottom, top, zoom } = camera;
            const x = left / zoom + ((right - left) / zoom) * (mouse[0] * 0.5 + 0.5);
            const y = bottom / zoom + ((top - bottom) / zoom) * (mouse[1] * 0.5 + 0.5);
            this.origin.set(x, y, 0);
            this.origin.applyMatrix4(camera.worldMatrix);

            // Set direction
            // https://community.khronos.org/t/get-direction-from-transformation-matrix-or-quat/65502/2
            this.direction.x = -camera.worldMatrix[8];
            this.direction.y = -camera.worldMatrix[9];
            this.direction.z = -camera.worldMatrix[10];
        } else {
            // Set origin
            camera.worldMatrix.getTranslation(this.origin);

            // Set direction
            this.direction.set(mouse[0], mouse[1], 0.5);
            camera.unproject(this.direction);
            this.direction.sub(this.origin).normalize();
        }
    }

    intersectBounds(meshes, { maxDistance, output = [] } = {}) {
        if (!Array.isArray(meshes)) meshes = [meshes];

        const invWorldMat4 = tempMat4;
        const origin = tempVec3a;
        const direction = tempVec3b;

        const hits = output;
        hits.length = 0;

        meshes.forEach((mesh) => {
            // Create bounds
            if (!mesh.geometry.bounds || mesh.geometry.bounds.radius === Infinity) mesh.geometry.computeBoundingSphere();
            const bounds = mesh.geometry.bounds;
            invWorldMat4.inverse(mesh.worldMatrix);

            // Get max distance locally
            let localMaxDistance;
            if (maxDistance) {
                direction.copy(this.direction).scaleRotateMatrix4(invWorldMat4);
                localMaxDistance = maxDistance * direction.len();
            }

            // Take world space ray and make it object space to align with bounding box
            origin.copy(this.origin).applyMatrix4(invWorldMat4);
            direction.copy(this.direction).transformDirection(invWorldMat4);

            // Break out early if bounds too far away from origin
            if (maxDistance) {
                if (origin.distance(bounds.center) - bounds.radius > localMaxDistance) return;
            }

            let localDistance = 0;

            // Check origin isn't inside bounds before testing intersection
            if (mesh.geometry.raycast === 'sphere') {
                if (origin.distance(bounds.center) > bounds.radius) {
                    localDistance = this.intersectSphere(bounds, origin, direction);
                    if (!localDistance) return;
                }
            } else {
                if (
                    origin.x < bounds.min.x ||
                    origin.x > bounds.max.x ||
                    origin.y < bounds.min.y ||
                    origin.y > bounds.max.y ||
                    origin.z < bounds.min.z ||
                    origin.z > bounds.max.z
                ) {
                    localDistance = this.intersectBox(bounds, origin, direction);
                    if (!localDistance) return;
                }
            }

            if (maxDistance && localDistance > localMaxDistance) return;

            // Create object on mesh to avoid generating lots of objects
            if (!mesh.hit) mesh.hit = { localPoint: new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3(), point: new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3() };

            mesh.hit.localPoint.copy(direction).multiply(localDistance).add(origin);
            mesh.hit.point.copy(mesh.hit.localPoint).applyMatrix4(mesh.worldMatrix);
            mesh.hit.distance = mesh.hit.point.distance(this.origin);

            hits.push(mesh);
        });

        hits.sort((a, b) => a.hit.distance - b.hit.distance);
        return hits;
    }

    intersectMeshes(meshes, { cullFace = true, maxDistance, includeUV = true, includeNormal = true, output = [] } = {}) {
        // Test bounds first before testing geometry
        const hits = this.intersectBounds(meshes, { maxDistance, output });
        if (!hits.length) return hits;

        const invWorldMat4 = tempMat4;
        const origin = tempVec3a;
        const direction = tempVec3b;
        const a = tempVec3c;
        const b = tempVec3d;
        const c = tempVec3e;
        const closestFaceNormal = tempVec3f;
        const faceNormal = tempVec3g;
        const barycoord = tempVec3h;
        const uvA = tempVec2a;
        const uvB = tempVec2b;
        const uvC = tempVec2c;

        for (let i = hits.length - 1; i >= 0; i--) {
            const mesh = hits[i];
            invWorldMat4.inverse(mesh.worldMatrix);

            // Get max distance locally
            let localMaxDistance;
            if (maxDistance) {
                direction.copy(this.direction).scaleRotateMatrix4(invWorldMat4);
                localMaxDistance = maxDistance * direction.len();
            }

            // Take world space ray and make it object space to align with bounding box
            origin.copy(this.origin).applyMatrix4(invWorldMat4);
            direction.copy(this.direction).transformDirection(invWorldMat4);

            let localDistance = 0;
            let closestA, closestB, closestC;

            const geometry = mesh.geometry;
            const attributes = geometry.attributes;
            const index = attributes.index;
            const position = attributes.position;

            const start = Math.max(0, geometry.drawRange.start);
            const end = Math.min(index ? index.count : position.count, geometry.drawRange.start + geometry.drawRange.count);
            const stride = position.stride ? position.stride / position.data.BYTES_PER_ELEMENT : position.size;

            for (let j = start; j < end; j += 3) {
                // Position attribute indices for each triangle
                const ai = index ? index.data[j] : j;
                const bi = index ? index.data[j + 1] : j + 1;
                const ci = index ? index.data[j + 2] : j + 2;

                a.fromArray(position.data, ai * stride);
                b.fromArray(position.data, bi * stride);
                c.fromArray(position.data, ci * stride);

                const distance = this.intersectTriangle(a, b, c, cullFace, origin, direction, faceNormal);
                if (!distance) continue;

                // Too far away
                if (maxDistance && distance > localMaxDistance) continue;

                if (!localDistance || distance < localDistance) {
                    localDistance = distance;
                    closestA = ai;
                    closestB = bi;
                    closestC = ci;
                    closestFaceNormal.copy(faceNormal);
                }
            }

            if (!localDistance) hits.splice(i, 1);

            // Update hit values from bounds-test
            mesh.hit.localPoint.copy(direction).multiply(localDistance).add(origin);
            mesh.hit.point.copy(mesh.hit.localPoint).applyMatrix4(mesh.worldMatrix);
            mesh.hit.distance = mesh.hit.point.distance(this.origin);

            // Add unique hit objects on mesh to avoid generating lots of objects
            if (!mesh.hit.faceNormal) {
                mesh.hit.localFaceNormal = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();
                mesh.hit.faceNormal = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();
                mesh.hit.uv = new _math_Vec2_js__WEBPACK_IMPORTED_MODULE_0__.Vec2();
                mesh.hit.localNormal = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();
                mesh.hit.normal = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();
            }

            // Add face normal data which is already computed
            mesh.hit.localFaceNormal.copy(closestFaceNormal);
            mesh.hit.faceNormal.copy(mesh.hit.localFaceNormal).transformDirection(mesh.worldMatrix);

            // Optional data, opt out to optimise a bit if necessary
            if (includeUV || includeNormal) {
                // Calculate barycoords to find uv values at hit point
                a.fromArray(position.data, closestA * 3);
                b.fromArray(position.data, closestB * 3);
                c.fromArray(position.data, closestC * 3);
                this.getBarycoord(mesh.hit.localPoint, a, b, c, barycoord);
            }

            if (includeUV && attributes.uv) {
                uvA.fromArray(attributes.uv.data, closestA * 2);
                uvB.fromArray(attributes.uv.data, closestB * 2);
                uvC.fromArray(attributes.uv.data, closestC * 2);
                mesh.hit.uv.set(
                    uvA.x * barycoord.x + uvB.x * barycoord.y + uvC.x * barycoord.z,
                    uvA.y * barycoord.x + uvB.y * barycoord.y + uvC.y * barycoord.z
                );
            }

            if (includeNormal && attributes.normal) {
                a.fromArray(attributes.normal.data, closestA * 3);
                b.fromArray(attributes.normal.data, closestB * 3);
                c.fromArray(attributes.normal.data, closestC * 3);
                mesh.hit.localNormal.set(
                    a.x * barycoord.x + b.x * barycoord.y + c.x * barycoord.z,
                    a.y * barycoord.x + b.y * barycoord.y + c.y * barycoord.z,
                    a.z * barycoord.x + b.z * barycoord.y + c.z * barycoord.z
                );

                mesh.hit.normal.copy(mesh.hit.localNormal).transformDirection(mesh.worldMatrix);
            }
        }

        hits.sort((a, b) => a.hit.distance - b.hit.distance);
        return hits;
    }

    intersectSphere(sphere, origin = this.origin, direction = this.direction) {
        const ray = tempVec3c;
        ray.sub(sphere.center, origin);
        const tca = ray.dot(direction);
        const d2 = ray.dot(ray) - tca * tca;
        const radius2 = sphere.radius * sphere.radius;
        if (d2 > radius2) return 0;
        const thc = Math.sqrt(radius2 - d2);
        const t0 = tca - thc;
        const t1 = tca + thc;
        if (t0 < 0 && t1 < 0) return 0;
        if (t0 < 0) return t1;
        return t0;
    }

    // Ray AABB - Ray Axis aligned bounding box testing
    intersectBox(box, origin = this.origin, direction = this.direction) {
        let tmin, tmax, tYmin, tYmax, tZmin, tZmax;
        const invdirx = 1 / direction.x;
        const invdiry = 1 / direction.y;
        const invdirz = 1 / direction.z;
        const min = box.min;
        const max = box.max;
        tmin = ((invdirx >= 0 ? min.x : max.x) - origin.x) * invdirx;
        tmax = ((invdirx >= 0 ? max.x : min.x) - origin.x) * invdirx;
        tYmin = ((invdiry >= 0 ? min.y : max.y) - origin.y) * invdiry;
        tYmax = ((invdiry >= 0 ? max.y : min.y) - origin.y) * invdiry;
        if (tmin > tYmax || tYmin > tmax) return 0;
        if (tYmin > tmin) tmin = tYmin;
        if (tYmax < tmax) tmax = tYmax;
        tZmin = ((invdirz >= 0 ? min.z : max.z) - origin.z) * invdirz;
        tZmax = ((invdirz >= 0 ? max.z : min.z) - origin.z) * invdirz;
        if (tmin > tZmax || tZmin > tmax) return 0;
        if (tZmin > tmin) tmin = tZmin;
        if (tZmax < tmax) tmax = tZmax;
        if (tmax < 0) return 0;
        return tmin >= 0 ? tmin : tmax;
    }

    intersectTriangle(a, b, c, backfaceCulling = true, origin = this.origin, direction = this.direction, normal = tempVec3g) {
        // from https://github.com/mrdoob/three.js/blob/master/src/math/Ray.js
        // which is from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h
        const edge1 = tempVec3h;
        const edge2 = tempVec3i;
        const diff = tempVec3j;
        edge1.sub(b, a);
        edge2.sub(c, a);
        normal.cross(edge1, edge2);
        let DdN = direction.dot(normal);
        if (!DdN) return 0;
        let sign;
        if (DdN > 0) {
            if (backfaceCulling) return 0;
            sign = 1;
        } else {
            sign = -1;
            DdN = -DdN;
        }
        diff.sub(origin, a);
        let DdQxE2 = sign * direction.dot(edge2.cross(diff, edge2));
        if (DdQxE2 < 0) return 0;
        let DdE1xQ = sign * direction.dot(edge1.cross(diff));
        if (DdE1xQ < 0) return 0;
        if (DdQxE2 + DdE1xQ > DdN) return 0;
        let QdN = -sign * diff.dot(normal);
        if (QdN < 0) return 0;
        return QdN / DdN;
    }

    getBarycoord(point, a, b, c, target = tempVec3h) {
        // From https://github.com/mrdoob/three.js/blob/master/src/math/Triangle.js
        // static/instance method to calculate barycentric coordinates
        // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
        const v0 = tempVec3i;
        const v1 = tempVec3j;
        const v2 = tempVec3k;
        v0.sub(c, a);
        v1.sub(b, a);
        v2.sub(point, a);
        const dot00 = v0.dot(v0);
        const dot01 = v0.dot(v1);
        const dot02 = v0.dot(v2);
        const dot11 = v1.dot(v1);
        const dot12 = v1.dot(v2);
        const denom = dot00 * dot11 - dot01 * dot01;
        if (denom === 0) return target.set(-2, -1, -1);
        const invDenom = 1 / denom;
        const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
        const v = (dot00 * dot12 - dot01 * dot02) * invDenom;
        return target.set(1 - u - v, v, u);
    }
}


/***/ }),

/***/ "./node_modules/ogl/src/math/Euler.js":
/*!********************************************!*\
  !*** ./node_modules/ogl/src/math/Euler.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Euler": () => (/* binding */ Euler)
/* harmony export */ });
/* harmony import */ var _functions_EulerFunc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions/EulerFunc.js */ "./node_modules/ogl/src/math/functions/EulerFunc.js");
/* harmony import */ var _Mat4_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Mat4.js */ "./node_modules/ogl/src/math/Mat4.js");



const tmpMat4 = new _Mat4_js__WEBPACK_IMPORTED_MODULE_0__.Mat4();

class Euler extends Array {
    constructor(x = 0, y = x, z = x, order = 'YXZ') {
        super(x, y, z);
        this.order = order;
        this.onChange = () => {};
        return this;
    }

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }

    get z() {
        return this[2];
    }

    set x(v) {
        this[0] = v;
        this.onChange();
    }

    set y(v) {
        this[1] = v;
        this.onChange();
    }

    set z(v) {
        this[2] = v;
        this.onChange();
    }

    set(x, y = x, z = x) {
        if (x.length) return this.copy(x);
        this[0] = x;
        this[1] = y;
        this[2] = z;
        this.onChange();
        return this;
    }

    copy(v) {
        this[0] = v[0];
        this[1] = v[1];
        this[2] = v[2];
        this.onChange();
        return this;
    }

    reorder(order) {
        this.order = order;
        this.onChange();
        return this;
    }

    fromRotationMatrix(m, order = this.order) {
        _functions_EulerFunc_js__WEBPACK_IMPORTED_MODULE_1__.fromRotationMatrix(this, m, order);
        return this;
    }

    fromQuaternion(q, order = this.order) {
        tmpMat4.fromQuaternion(q);
        return this.fromRotationMatrix(tmpMat4, order);
    }

    toArray(a = [], o = 0) {
        a[o] = this[0];
        a[o + 1] = this[1];
        a[o + 2] = this[2];
        return a;
    }
}


/***/ }),

/***/ "./node_modules/ogl/src/math/Mat3.js":
/*!*******************************************!*\
  !*** ./node_modules/ogl/src/math/Mat3.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Mat3": () => (/* binding */ Mat3)
/* harmony export */ });
/* harmony import */ var _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/Mat3Func.js */ "./node_modules/ogl/src/math/functions/Mat3Func.js");


class Mat3 extends Array {
    constructor(m00 = 1, m01 = 0, m02 = 0, m10 = 0, m11 = 1, m12 = 0, m20 = 0, m21 = 0, m22 = 1) {
        super(m00, m01, m02, m10, m11, m12, m20, m21, m22);
        return this;
    }

    set(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
        if (m00.length) return this.copy(m00);
        _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.set(this, m00, m01, m02, m10, m11, m12, m20, m21, m22);
        return this;
    }

    translate(v, m = this) {
        _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.translate(this, m, v);
        return this;
    }

    rotate(v, m = this) {
        _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.rotate(this, m, v);
        return this;
    }

    scale(v, m = this) {
        _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.scale(this, m, v);
        return this;
    }

    multiply(ma, mb) {
        if (mb) {
            _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.multiply(this, ma, mb);
        } else {
            _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.multiply(this, this, ma);
        }
        return this;
    }

    identity() {
        _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.identity(this);
        return this;
    }

    copy(m) {
        _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.copy(this, m);
        return this;
    }

    fromMatrix4(m) {
        _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.fromMat4(this, m);
        return this;
    }

    fromQuaternion(q) {
        _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.fromQuat(this, q);
        return this;
    }

    fromBasis(vec3a, vec3b, vec3c) {
        this.set(vec3a[0], vec3a[1], vec3a[2], vec3b[0], vec3b[1], vec3b[2], vec3c[0], vec3c[1], vec3c[2]);
        return this;
    }

    inverse(m = this) {
        _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.invert(this, m);
        return this;
    }

    getNormalMatrix(m) {
        _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.normalFromMat4(this, m);
        return this;
    }
}


/***/ }),

/***/ "./node_modules/ogl/src/math/Mat4.js":
/*!*******************************************!*\
  !*** ./node_modules/ogl/src/math/Mat4.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Mat4": () => (/* binding */ Mat4)
/* harmony export */ });
/* harmony import */ var _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/Mat4Func.js */ "./node_modules/ogl/src/math/functions/Mat4Func.js");


class Mat4 extends Array {
    constructor(
        m00 = 1,
        m01 = 0,
        m02 = 0,
        m03 = 0,
        m10 = 0,
        m11 = 1,
        m12 = 0,
        m13 = 0,
        m20 = 0,
        m21 = 0,
        m22 = 1,
        m23 = 0,
        m30 = 0,
        m31 = 0,
        m32 = 0,
        m33 = 1
    ) {
        super(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
        return this;
    }

    get x() {
        return this[12];
    }

    get y() {
        return this[13];
    }

    get z() {
        return this[14];
    }

    get w() {
        return this[15];
    }

    set x(v) {
        this[12] = v;
    }

    set y(v) {
        this[13] = v;
    }

    set z(v) {
        this[14] = v;
    }

    set w(v) {
        this[15] = v;
    }

    set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
        if (m00.length) return this.copy(m00);
        _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__.set(this, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
        return this;
    }

    translate(v, m = this) {
        _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__.translate(this, m, v);
        return this;
    }

    rotate(v, axis, m = this) {
        _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__.rotate(this, m, v, axis);
        return this;
    }

    scale(v, m = this) {
        _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__.scale(this, m, typeof v === 'number' ? [v, v, v] : v);
        return this;
    }

    multiply(ma, mb) {
        if (mb) {
            _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__.multiply(this, ma, mb);
        } else {
            _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__.multiply(this, this, ma);
        }
        return this;
    }

    identity() {
        _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__.identity(this);
        return this;
    }

    copy(m) {
        _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__.copy(this, m);
        return this;
    }

    fromPerspective({ fov, aspect, near, far } = {}) {
        _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__.perspective(this, fov, aspect, near, far);
        return this;
    }

    fromOrthogonal({ left, right, bottom, top, near, far }) {
        _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__.ortho(this, left, right, bottom, top, near, far);
        return this;
    }

    fromQuaternion(q) {
        _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__.fromQuat(this, q);
        return this;
    }

    setPosition(v) {
        this.x = v[0];
        this.y = v[1];
        this.z = v[2];
        return this;
    }

    inverse(m = this) {
        _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__.invert(this, m);
        return this;
    }

    compose(q, pos, scale) {
        _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__.fromRotationTranslationScale(this, q, pos, scale);
        return this;
    }

    getRotation(q) {
        _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__.getRotation(q, this);
        return this;
    }

    getTranslation(pos) {
        _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__.getTranslation(pos, this);
        return this;
    }

    getScaling(scale) {
        _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__.getScaling(scale, this);
        return this;
    }

    getMaxScaleOnAxis() {
        return _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__.getMaxScaleOnAxis(this);
    }

    lookAt(eye, target, up) {
        _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__.targetTo(this, eye, target, up);
        return this;
    }

    determinant() {
        return _functions_Mat4Func_js__WEBPACK_IMPORTED_MODULE_0__.determinant(this);
    }

    fromArray(a, o = 0) {
        this[0] = a[o];
        this[1] = a[o + 1];
        this[2] = a[o + 2];
        this[3] = a[o + 3];
        this[4] = a[o + 4];
        this[5] = a[o + 5];
        this[6] = a[o + 6];
        this[7] = a[o + 7];
        this[8] = a[o + 8];
        this[9] = a[o + 9];
        this[10] = a[o + 10];
        this[11] = a[o + 11];
        this[12] = a[o + 12];
        this[13] = a[o + 13];
        this[14] = a[o + 14];
        this[15] = a[o + 15];
        return this;
    }

    toArray(a = [], o = 0) {
        a[o] = this[0];
        a[o + 1] = this[1];
        a[o + 2] = this[2];
        a[o + 3] = this[3];
        a[o + 4] = this[4];
        a[o + 5] = this[5];
        a[o + 6] = this[6];
        a[o + 7] = this[7];
        a[o + 8] = this[8];
        a[o + 9] = this[9];
        a[o + 10] = this[10];
        a[o + 11] = this[11];
        a[o + 12] = this[12];
        a[o + 13] = this[13];
        a[o + 14] = this[14];
        a[o + 15] = this[15];
        return a;
    }
}


/***/ }),

/***/ "./node_modules/ogl/src/math/Quat.js":
/*!*******************************************!*\
  !*** ./node_modules/ogl/src/math/Quat.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Quat": () => (/* binding */ Quat)
/* harmony export */ });
/* harmony import */ var _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/QuatFunc.js */ "./node_modules/ogl/src/math/functions/QuatFunc.js");


class Quat extends Array {
    constructor(x = 0, y = 0, z = 0, w = 1) {
        super(x, y, z, w);
        this.onChange = () => {};
        return this;
    }

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }

    get z() {
        return this[2];
    }

    get w() {
        return this[3];
    }

    set x(v) {
        this[0] = v;
        this.onChange();
    }

    set y(v) {
        this[1] = v;
        this.onChange();
    }

    set z(v) {
        this[2] = v;
        this.onChange();
    }

    set w(v) {
        this[3] = v;
        this.onChange();
    }

    identity() {
        _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__.identity(this);
        this.onChange();
        return this;
    }

    set(x, y, z, w) {
        if (x.length) return this.copy(x);
        _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__.set(this, x, y, z, w);
        this.onChange();
        return this;
    }

    rotateX(a) {
        _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__.rotateX(this, this, a);
        this.onChange();
        return this;
    }

    rotateY(a) {
        _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__.rotateY(this, this, a);
        this.onChange();
        return this;
    }

    rotateZ(a) {
        _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__.rotateZ(this, this, a);
        this.onChange();
        return this;
    }

    inverse(q = this) {
        _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__.invert(this, q);
        this.onChange();
        return this;
    }

    conjugate(q = this) {
        _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__.conjugate(this, q);
        this.onChange();
        return this;
    }

    copy(q) {
        _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__.copy(this, q);
        this.onChange();
        return this;
    }

    normalize(q = this) {
        _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__.normalize(this, q);
        this.onChange();
        return this;
    }

    multiply(qA, qB) {
        if (qB) {
            _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__.multiply(this, qA, qB);
        } else {
            _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__.multiply(this, this, qA);
        }
        this.onChange();
        return this;
    }

    dot(v) {
        return _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__.dot(this, v);
    }

    fromMatrix3(matrix3) {
        _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__.fromMat3(this, matrix3);
        this.onChange();
        return this;
    }

    fromEuler(euler) {
        _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__.fromEuler(this, euler, euler.order);
        return this;
    }

    fromAxisAngle(axis, a) {
        _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__.setAxisAngle(this, axis, a);
        return this;
    }

    slerp(q, t) {
        _functions_QuatFunc_js__WEBPACK_IMPORTED_MODULE_0__.slerp(this, this, q, t);
        return this;
    }

    fromArray(a, o = 0) {
        this[0] = a[o];
        this[1] = a[o + 1];
        this[2] = a[o + 2];
        this[3] = a[o + 3];
        return this;
    }

    toArray(a = [], o = 0) {
        a[o] = this[0];
        a[o + 1] = this[1];
        a[o + 2] = this[2];
        a[o + 3] = this[3];
        return a;
    }
}


/***/ }),

/***/ "./node_modules/ogl/src/math/Vec2.js":
/*!*******************************************!*\
  !*** ./node_modules/ogl/src/math/Vec2.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Vec2": () => (/* binding */ Vec2)
/* harmony export */ });
/* harmony import */ var _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/Vec2Func.js */ "./node_modules/ogl/src/math/functions/Vec2Func.js");


class Vec2 extends Array {
    constructor(x = 0, y = x) {
        super(x, y);
        return this;
    }

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }

    set x(v) {
        this[0] = v;
    }

    set y(v) {
        this[1] = v;
    }

    set(x, y = x) {
        if (x.length) return this.copy(x);
        _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.set(this, x, y);
        return this;
    }

    copy(v) {
        _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.copy(this, v);
        return this;
    }

    add(va, vb) {
        if (vb) _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.add(this, va, vb);
        else _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.add(this, this, va);
        return this;
    }

    sub(va, vb) {
        if (vb) _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.subtract(this, va, vb);
        else _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.subtract(this, this, va);
        return this;
    }

    multiply(v) {
        if (v.length) _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.multiply(this, this, v);
        else _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.scale(this, this, v);
        return this;
    }

    divide(v) {
        if (v.length) _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.divide(this, this, v);
        else _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.scale(this, this, 1 / v);
        return this;
    }

    inverse(v = this) {
        _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.inverse(this, v);
        return this;
    }

    // Can't use 'length' as Array.prototype uses it
    len() {
        return _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.length(this);
    }

    distance(v) {
        if (v) return _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.distance(this, v);
        else return _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.length(this);
    }

    squaredLen() {
        return this.squaredDistance();
    }

    squaredDistance(v) {
        if (v) return _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.squaredDistance(this, v);
        else return _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.squaredLength(this);
    }

    negate(v = this) {
        _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.negate(this, v);
        return this;
    }

    cross(va, vb) {
        if (vb) return _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.cross(va, vb);
        return _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.cross(this, va);
    }

    scale(v) {
        _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.scale(this, this, v);
        return this;
    }

    normalize() {
        _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.normalize(this, this);
        return this;
    }

    dot(v) {
        return _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.dot(this, v);
    }

    equals(v) {
        return _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.exactEquals(this, v);
    }

    applyMatrix3(mat3) {
        _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.transformMat3(this, this, mat3);
        return this;
    }

    applyMatrix4(mat4) {
        _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.transformMat4(this, this, mat4);
        return this;
    }

    lerp(v, a) {
        _functions_Vec2Func_js__WEBPACK_IMPORTED_MODULE_0__.lerp(this, this, v, a);
        return this;
    }

    clone() {
        return new Vec2(this[0], this[1]);
    }

    fromArray(a, o = 0) {
        this[0] = a[o];
        this[1] = a[o + 1];
        return this;
    }

    toArray(a = [], o = 0) {
        a[o] = this[0];
        a[o + 1] = this[1];
        return a;
    }
}


/***/ }),

/***/ "./node_modules/ogl/src/math/Vec3.js":
/*!*******************************************!*\
  !*** ./node_modules/ogl/src/math/Vec3.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Vec3": () => (/* binding */ Vec3)
/* harmony export */ });
/* harmony import */ var _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/Vec3Func.js */ "./node_modules/ogl/src/math/functions/Vec3Func.js");


class Vec3 extends Array {
    constructor(x = 0, y = x, z = x) {
        super(x, y, z);
        return this;
    }

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }

    get z() {
        return this[2];
    }

    set x(v) {
        this[0] = v;
    }

    set y(v) {
        this[1] = v;
    }

    set z(v) {
        this[2] = v;
    }

    set(x, y = x, z = x) {
        if (x.length) return this.copy(x);
        _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.set(this, x, y, z);
        return this;
    }

    copy(v) {
        _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.copy(this, v);
        return this;
    }

    add(va, vb) {
        if (vb) _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.add(this, va, vb);
        else _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.add(this, this, va);
        return this;
    }

    sub(va, vb) {
        if (vb) _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.subtract(this, va, vb);
        else _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.subtract(this, this, va);
        return this;
    }

    multiply(v) {
        if (v.length) _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.multiply(this, this, v);
        else _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.scale(this, this, v);
        return this;
    }

    divide(v) {
        if (v.length) _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.divide(this, this, v);
        else _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.scale(this, this, 1 / v);
        return this;
    }

    inverse(v = this) {
        _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.inverse(this, v);
        return this;
    }

    // Can't use 'length' as Array.prototype uses it
    len() {
        return _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.length(this);
    }

    distance(v) {
        if (v) return _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.distance(this, v);
        else return _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.length(this);
    }

    squaredLen() {
        return _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.squaredLength(this);
    }

    squaredDistance(v) {
        if (v) return _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.squaredDistance(this, v);
        else return _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.squaredLength(this);
    }

    negate(v = this) {
        _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.negate(this, v);
        return this;
    }

    cross(va, vb) {
        if (vb) _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.cross(this, va, vb);
        else _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.cross(this, this, va);
        return this;
    }

    scale(v) {
        _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.scale(this, this, v);
        return this;
    }

    normalize() {
        _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.normalize(this, this);
        return this;
    }

    dot(v) {
        return _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.dot(this, v);
    }

    equals(v) {
        return _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.exactEquals(this, v);
    }

    applyMatrix3(mat3) {
        _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.transformMat3(this, this, mat3);
        return this;
    }

    applyMatrix4(mat4) {
        _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.transformMat4(this, this, mat4);
        return this;
    }

    scaleRotateMatrix4(mat4) {
        _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.scaleRotateMat4(this, this, mat4);
        return this;
    }

    applyQuaternion(q) {
        _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.transformQuat(this, this, q);
        return this;
    }

    angle(v) {
        return _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.angle(this, v);
    }

    lerp(v, t) {
        _functions_Vec3Func_js__WEBPACK_IMPORTED_MODULE_0__.lerp(this, this, v, t);
        return this;
    }

    clone() {
        return new Vec3(this[0], this[1], this[2]);
    }

    fromArray(a, o = 0) {
        this[0] = a[o];
        this[1] = a[o + 1];
        this[2] = a[o + 2];
        return this;
    }

    toArray(a = [], o = 0) {
        a[o] = this[0];
        a[o + 1] = this[1];
        a[o + 2] = this[2];
        return a;
    }

    transformDirection(mat4) {
        const x = this[0];
        const y = this[1];
        const z = this[2];

        this[0] = mat4[0] * x + mat4[4] * y + mat4[8] * z;
        this[1] = mat4[1] * x + mat4[5] * y + mat4[9] * z;
        this[2] = mat4[2] * x + mat4[6] * y + mat4[10] * z;

        return this.normalize();
    }
}


/***/ }),

/***/ "./node_modules/ogl/src/math/functions/EulerFunc.js":
/*!**********************************************************!*\
  !*** ./node_modules/ogl/src/math/functions/EulerFunc.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fromRotationMatrix": () => (/* binding */ fromRotationMatrix)
/* harmony export */ });
// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
function fromRotationMatrix(out, m, order = 'YXZ') {
    if (order === 'XYZ') {
        out[1] = Math.asin(Math.min(Math.max(m[8], -1), 1));
        if (Math.abs(m[8]) < 0.99999) {
            out[0] = Math.atan2(-m[9], m[10]);
            out[2] = Math.atan2(-m[4], m[0]);
        } else {
            out[0] = Math.atan2(m[6], m[5]);
            out[2] = 0;
        }
    } else if (order === 'YXZ') {
        out[0] = Math.asin(-Math.min(Math.max(m[9], -1), 1));
        if (Math.abs(m[9]) < 0.99999) {
            out[1] = Math.atan2(m[8], m[10]);
            out[2] = Math.atan2(m[1], m[5]);
        } else {
            out[1] = Math.atan2(-m[2], m[0]);
            out[2] = 0;
        }
    } else if (order === 'ZXY') {
        out[0] = Math.asin(Math.min(Math.max(m[6], -1), 1));
        if (Math.abs(m[6]) < 0.99999) {
            out[1] = Math.atan2(-m[2], m[10]);
            out[2] = Math.atan2(-m[4], m[5]);
        } else {
            out[1] = 0;
            out[2] = Math.atan2(m[1], m[0]);
        }
    } else if (order === 'ZYX') {
        out[1] = Math.asin(-Math.min(Math.max(m[2], -1), 1));
        if (Math.abs(m[2]) < 0.99999) {
            out[0] = Math.atan2(m[6], m[10]);
            out[2] = Math.atan2(m[1], m[0]);
        } else {
            out[0] = 0;
            out[2] = Math.atan2(-m[4], m[5]);
        }
    } else if (order === 'YZX') {
        out[2] = Math.asin(Math.min(Math.max(m[1], -1), 1));
        if (Math.abs(m[1]) < 0.99999) {
            out[0] = Math.atan2(-m[9], m[5]);
            out[1] = Math.atan2(-m[2], m[0]);
        } else {
            out[0] = 0;
            out[1] = Math.atan2(m[8], m[10]);
        }
    } else if (order === 'XZY') {
        out[2] = Math.asin(-Math.min(Math.max(m[4], -1), 1));
        if (Math.abs(m[4]) < 0.99999) {
            out[0] = Math.atan2(m[6], m[5]);
            out[1] = Math.atan2(m[8], m[0]);
        } else {
            out[0] = Math.atan2(-m[9], m[10]);
            out[1] = 0;
        }
    }

    return out;
}


/***/ }),

/***/ "./node_modules/ogl/src/math/functions/Mat3Func.js":
/*!*********************************************************!*\
  !*** ./node_modules/ogl/src/math/functions/Mat3Func.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "determinant": () => (/* binding */ determinant),
/* harmony export */   "fromMat4": () => (/* binding */ fromMat4),
/* harmony export */   "fromQuat": () => (/* binding */ fromQuat),
/* harmony export */   "identity": () => (/* binding */ identity),
/* harmony export */   "invert": () => (/* binding */ invert),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "multiplyScalar": () => (/* binding */ multiplyScalar),
/* harmony export */   "normalFromMat4": () => (/* binding */ normalFromMat4),
/* harmony export */   "projection": () => (/* binding */ projection),
/* harmony export */   "rotate": () => (/* binding */ rotate),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "subtract": () => (/* binding */ subtract),
/* harmony export */   "translate": () => (/* binding */ translate),
/* harmony export */   "transpose": () => (/* binding */ transpose)
/* harmony export */ });
const EPSILON = 0.000001;

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
function fromMat4(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
}

/**
 * Calculates a 3x3 matrix from the given quaternion
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat3} out
 */
function fromQuat(out, q) {
    let x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;

    let xx = x * x2;
    let yx = y * x2;
    let yy = y * y2;
    let zx = z * x2;
    let zy = z * y2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
}

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
}

/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
}

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
}

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        let a01 = a[1],
            a02 = a[2],
            a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }

    return out;
}

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function invert(out, a) {
    let a00 = a[0],
        a01 = a[1],
        a02 = a[2];
    let a10 = a[3],
        a11 = a[4],
        a12 = a[5];
    let a20 = a[6],
        a21 = a[7],
        a22 = a[8];

    let b01 = a22 * a11 - a12 * a21;
    let b11 = -a22 * a10 + a12 * a20;
    let b21 = a21 * a10 - a11 * a20;

    // Calculate the determinant
    let det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
}

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
    let a00 = a[0],
        a01 = a[1],
        a02 = a[2];
    let a10 = a[3],
        a11 = a[4],
        a12 = a[5];
    let a20 = a[6],
        a21 = a[7],
        a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function multiply(out, a, b) {
    let a00 = a[0],
        a01 = a[1],
        a02 = a[2];
    let a10 = a[3],
        a11 = a[4],
        a12 = a[5];
    let a20 = a[6],
        a21 = a[7],
        a22 = a[8];

    let b00 = b[0],
        b01 = b[1],
        b02 = b[2];
    let b10 = b[3],
        b11 = b[4],
        b12 = b[5];
    let b20 = b[6],
        b21 = b[7],
        b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
}

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
function translate(out, a, v) {
    let a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8],
        x = v[0],
        y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
}

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
function rotate(out, a, rad) {
    let a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8],
        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
}

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
function scale(out, a, v) {
    let x = v[0],
        y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
}

/**
 * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {mat4} a Mat4 to derive the normal matrix from
 *
 * @returns {mat3} out
 */
function normalFromMat4(out, a) {
    let a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    let a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    let a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    let a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];

    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
}

/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param {mat3} out mat3 frustum matrix will be written into
 * @param {number} width Width of your gl context
 * @param {number} height Height of gl context
 * @returns {mat3} out
 */
function projection(out, width, height) {
    out[0] = 2 / width;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = -2 / height;
    out[5] = 0;
    out[6] = -1;
    out[7] = 1;
    out[8] = 1;
    return out;
}

/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    return out;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */
function multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    return out;
}


/***/ }),

/***/ "./node_modules/ogl/src/math/functions/Mat4Func.js":
/*!*********************************************************!*\
  !*** ./node_modules/ogl/src/math/functions/Mat4Func.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "determinant": () => (/* binding */ determinant),
/* harmony export */   "fromQuat": () => (/* binding */ fromQuat),
/* harmony export */   "fromRotationTranslationScale": () => (/* binding */ fromRotationTranslationScale),
/* harmony export */   "getMaxScaleOnAxis": () => (/* binding */ getMaxScaleOnAxis),
/* harmony export */   "getRotation": () => (/* binding */ getRotation),
/* harmony export */   "getScaling": () => (/* binding */ getScaling),
/* harmony export */   "getTranslation": () => (/* binding */ getTranslation),
/* harmony export */   "identity": () => (/* binding */ identity),
/* harmony export */   "invert": () => (/* binding */ invert),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "multiplyScalar": () => (/* binding */ multiplyScalar),
/* harmony export */   "ortho": () => (/* binding */ ortho),
/* harmony export */   "perspective": () => (/* binding */ perspective),
/* harmony export */   "rotate": () => (/* binding */ rotate),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "subtract": () => (/* binding */ subtract),
/* harmony export */   "targetTo": () => (/* binding */ targetTo),
/* harmony export */   "translate": () => (/* binding */ translate),
/* harmony export */   "transpose": () => (/* binding */ transpose)
/* harmony export */ });
const EPSILON = 0.000001;

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
}

/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
}

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        let a01 = a[1],
            a02 = a[2],
            a03 = a[3];
        let a12 = a[6],
            a13 = a[7];
        let a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }

    return out;
}

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function invert(out, a) {
    let a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    let a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    let a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    let a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];

    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
}

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
    let a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    let a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    let a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    let a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];

    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}

/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function multiply(out, a, b) {
    let a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    let a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    let a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    let a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];

    // Cache only the current line of the second matrix
    let b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
}

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
function translate(out, a, v) {
    let x = v[0],
        y = v[1],
        z = v[2];
    let a00, a01, a02, a03;
    let a10, a11, a12, a13;
    let a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0];
        a01 = a[1];
        a02 = a[2];
        a03 = a[3];
        a10 = a[4];
        a11 = a[5];
        a12 = a[6];
        a13 = a[7];
        a20 = a[8];
        a21 = a[9];
        a22 = a[10];
        a23 = a[11];

        out[0] = a00;
        out[1] = a01;
        out[2] = a02;
        out[3] = a03;
        out[4] = a10;
        out[5] = a11;
        out[6] = a12;
        out[7] = a13;
        out[8] = a20;
        out[9] = a21;
        out[10] = a22;
        out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
}

/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
function scale(out, a, v) {
    let x = v[0],
        y = v[1],
        z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
}

/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function rotate(out, a, rad, axis) {
    let x = axis[0],
        y = axis[1],
        z = axis[2];
    let len = Math.hypot(x, y, z);
    let s, c, t;
    let a00, a01, a02, a03;
    let a10, a11, a12, a13;
    let a20, a21, a22, a23;
    let b00, b01, b02;
    let b10, b11, b12;
    let b20, b21, b22;

    if (Math.abs(len) < EPSILON) {
        return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) {
        // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
}

/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
function getTranslation(out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];

    return out;
}

/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
function getScaling(out, mat) {
    let m11 = mat[0];
    let m12 = mat[1];
    let m13 = mat[2];
    let m21 = mat[4];
    let m22 = mat[5];
    let m23 = mat[6];
    let m31 = mat[8];
    let m32 = mat[9];
    let m33 = mat[10];

    out[0] = Math.hypot(m11, m12, m13);
    out[1] = Math.hypot(m21, m22, m23);
    out[2] = Math.hypot(m31, m32, m33);

    return out;
}

function getMaxScaleOnAxis(mat) {
    let m11 = mat[0];
    let m12 = mat[1];
    let m13 = mat[2];
    let m21 = mat[4];
    let m22 = mat[5];
    let m23 = mat[6];
    let m31 = mat[8];
    let m32 = mat[9];
    let m33 = mat[10];

    const x = m11 * m11 + m12 * m12 + m13 * m13;
    const y = m21 * m21 + m22 * m22 + m23 * m23;
    const z = m31 * m31 + m32 * m32 + m33 * m33;

    return Math.sqrt(Math.max(x, y, z));
}

/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */
const getRotation = (function () {
    const temp = [0, 0, 0];

    return function (out, mat) {
        let scaling = temp;
        getScaling(scaling, mat);

        let is1 = 1 / scaling[0];
        let is2 = 1 / scaling[1];
        let is3 = 1 / scaling[2];

        let sm11 = mat[0] * is1;
        let sm12 = mat[1] * is2;
        let sm13 = mat[2] * is3;
        let sm21 = mat[4] * is1;
        let sm22 = mat[5] * is2;
        let sm23 = mat[6] * is3;
        let sm31 = mat[8] * is1;
        let sm32 = mat[9] * is2;
        let sm33 = mat[10] * is3;

        let trace = sm11 + sm22 + sm33;
        let S = 0;

        if (trace > 0) {
            S = Math.sqrt(trace + 1.0) * 2;
            out[3] = 0.25 * S;
            out[0] = (sm23 - sm32) / S;
            out[1] = (sm31 - sm13) / S;
            out[2] = (sm12 - sm21) / S;
        } else if (sm11 > sm22 && sm11 > sm33) {
            S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
            out[3] = (sm23 - sm32) / S;
            out[0] = 0.25 * S;
            out[1] = (sm12 + sm21) / S;
            out[2] = (sm31 + sm13) / S;
        } else if (sm22 > sm33) {
            S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
            out[3] = (sm31 - sm13) / S;
            out[0] = (sm12 + sm21) / S;
            out[1] = 0.25 * S;
            out[2] = (sm23 + sm32) / S;
        } else {
            S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
            out[3] = (sm12 - sm21) / S;
            out[0] = (sm31 + sm13) / S;
            out[1] = (sm23 + sm32) / S;
            out[2] = 0.25 * S;
        }

        return out;
    };
})();

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */
function fromRotationTranslationScale(out, q, v, s) {
    // Quaternion math
    let x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;

    let xx = x * x2;
    let xy = x * y2;
    let xz = x * z2;
    let yy = y * y2;
    let yz = y * z2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;
    let sx = s[0];
    let sy = s[1];
    let sz = s[2];

    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
}

/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */
function fromQuat(out, q) {
    let x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;

    let xx = x * x2;
    let yx = y * x2;
    let yy = y * y2;
    let zx = z * x2;
    let zy = z * y2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
}

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function perspective(out, fovy, aspect, near, far) {
    let f = 1.0 / Math.tan(fovy / 2);
    let nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = 2 * far * near * nf;
    out[15] = 0;
    return out;
}

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function ortho(out, left, right, bottom, top, near, far) {
    let lr = 1 / (left - right);
    let bt = 1 / (bottom - top);
    let nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
}

/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} target Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
function targetTo(out, eye, target, up) {
    let eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2];

    let z0 = eyex - target[0],
        z1 = eyey - target[1],
        z2 = eyez - target[2];

    let len = z0 * z0 + z1 * z1 + z2 * z2;
    if (len === 0) {
        // eye and target are in the same position
        z2 = 1;
    } else {
        len = 1 / Math.sqrt(len);
        z0 *= len;
        z1 *= len;
        z2 *= len;
    }

    let x0 = upy * z2 - upz * z1,
        x1 = upz * z0 - upx * z2,
        x2 = upx * z1 - upy * z0;

    len = x0 * x0 + x1 * x1 + x2 * x2;
    if (len === 0) {
        // up and z are parallel
        if (upz) {
            upx += 1e-6;
        } else if (upy) {
            upz += 1e-6;
        } else {
            upy += 1e-6;
        }
        (x0 = upy * z2 - upz * z1), (x1 = upz * z0 - upx * z2), (x2 = upx * z1 - upy * z0);

        len = x0 * x0 + x1 * x1 + x2 * x2;
    }

    len = 1 / Math.sqrt(len);
    x0 *= len;
    x1 *= len;
    x2 *= len;

    out[0] = x0;
    out[1] = x1;
    out[2] = x2;
    out[3] = 0;
    out[4] = z1 * x2 - z2 * x1;
    out[5] = z2 * x0 - z0 * x2;
    out[6] = z0 * x1 - z1 * x0;
    out[7] = 0;
    out[8] = z0;
    out[9] = z1;
    out[10] = z2;
    out[11] = 0;
    out[12] = eyex;
    out[13] = eyey;
    out[14] = eyez;
    out[15] = 1;
    return out;
}

/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */
function multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
}


/***/ }),

/***/ "./node_modules/ogl/src/math/functions/QuatFunc.js":
/*!*********************************************************!*\
  !*** ./node_modules/ogl/src/math/functions/QuatFunc.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "conjugate": () => (/* binding */ conjugate),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "dot": () => (/* binding */ dot),
/* harmony export */   "fromEuler": () => (/* binding */ fromEuler),
/* harmony export */   "fromMat3": () => (/* binding */ fromMat3),
/* harmony export */   "identity": () => (/* binding */ identity),
/* harmony export */   "invert": () => (/* binding */ invert),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "lerp": () => (/* binding */ lerp),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "normalize": () => (/* binding */ normalize),
/* harmony export */   "rotateX": () => (/* binding */ rotateX),
/* harmony export */   "rotateY": () => (/* binding */ rotateY),
/* harmony export */   "rotateZ": () => (/* binding */ rotateZ),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "setAxisAngle": () => (/* binding */ setAxisAngle),
/* harmony export */   "slerp": () => (/* binding */ slerp)
/* harmony export */ });
/* harmony import */ var _Vec4Func_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vec4Func.js */ "./node_modules/ogl/src/math/functions/Vec4Func.js");


/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
function identity(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
}

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
function setAxisAngle(out, axis, rad) {
    rad = rad * 0.5;
    let s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
}

/**
 * Multiplies two quats
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
function multiply(out, a, b) {
    let ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    let bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
}

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateX(out, a, rad) {
    rad *= 0.5;

    let ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    let bx = Math.sin(rad),
        bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
}

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateY(out, a, rad) {
    rad *= 0.5;

    let ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    let by = Math.sin(rad),
        bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
}

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateZ(out, a, rad) {
    rad *= 0.5;

    let ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    let bz = Math.sin(rad),
        bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
}

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
function slerp(out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations
    let ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    let bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];

    let omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if (cosom < 0.0) {
        cosom = -cosom;
        bx = -bx;
        by = -by;
        bz = -bz;
        bw = -bw;
    }
    // calculate coefficients
    if (1.0 - cosom > 0.000001) {
        // standard case (slerp)
        omega = Math.acos(cosom);
        sinom = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {
        // "from" and "to" quaternions are very close
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;

    return out;
}

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
function invert(out, a) {
    let a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    let dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
    let invDot = dot ? 1.0 / dot : 0;

    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0 * invDot;
    out[1] = -a1 * invDot;
    out[2] = -a2 * invDot;
    out[3] = a3 * invDot;
    return out;
}

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
function conjugate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
}

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
function fromMat3(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    let fTrace = m[0] + m[4] + m[8];
    let fRoot;

    if (fTrace > 0.0) {
        // |w| > 1/2, may as well choose w > 1/2
        fRoot = Math.sqrt(fTrace + 1.0); // 2w
        out[3] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot; // 1/(4w)
        out[0] = (m[5] - m[7]) * fRoot;
        out[1] = (m[6] - m[2]) * fRoot;
        out[2] = (m[1] - m[3]) * fRoot;
    } else {
        // |w| <= 1/2
        let i = 0;
        if (m[4] > m[0]) i = 1;
        if (m[8] > m[i * 3 + i]) i = 2;
        let j = (i + 1) % 3;
        let k = (i + 2) % 3;

        fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
        out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
        out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
    }

    return out;
}

/**
 * Creates a quaternion from the given euler angle x, y, z.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} euler Angles to rotate around each axis in degrees.
 * @param {String} order detailing order of operations. Default 'XYZ'.
 * @returns {quat} out
 * @function
 */
function fromEuler(out, euler, order = 'YXZ') {
    let sx = Math.sin(euler[0] * 0.5);
    let cx = Math.cos(euler[0] * 0.5);
    let sy = Math.sin(euler[1] * 0.5);
    let cy = Math.cos(euler[1] * 0.5);
    let sz = Math.sin(euler[2] * 0.5);
    let cz = Math.cos(euler[2] * 0.5);

    if (order === 'XYZ') {
        out[0] = sx * cy * cz + cx * sy * sz;
        out[1] = cx * sy * cz - sx * cy * sz;
        out[2] = cx * cy * sz + sx * sy * cz;
        out[3] = cx * cy * cz - sx * sy * sz;
    } else if (order === 'YXZ') {
        out[0] = sx * cy * cz + cx * sy * sz;
        out[1] = cx * sy * cz - sx * cy * sz;
        out[2] = cx * cy * sz - sx * sy * cz;
        out[3] = cx * cy * cz + sx * sy * sz;
    } else if (order === 'ZXY') {
        out[0] = sx * cy * cz - cx * sy * sz;
        out[1] = cx * sy * cz + sx * cy * sz;
        out[2] = cx * cy * sz + sx * sy * cz;
        out[3] = cx * cy * cz - sx * sy * sz;
    } else if (order === 'ZYX') {
        out[0] = sx * cy * cz - cx * sy * sz;
        out[1] = cx * sy * cz + sx * cy * sz;
        out[2] = cx * cy * sz - sx * sy * cz;
        out[3] = cx * cy * cz + sx * sy * sz;
    } else if (order === 'YZX') {
        out[0] = sx * cy * cz + cx * sy * sz;
        out[1] = cx * sy * cz + sx * cy * sz;
        out[2] = cx * cy * sz - sx * sy * cz;
        out[3] = cx * cy * cz - sx * sy * sz;
    } else if (order === 'XZY') {
        out[0] = sx * cy * cz - cx * sy * sz;
        out[1] = cx * sy * cz - sx * cy * sz;
        out[2] = cx * cy * sz + sx * sy * cz;
        out[3] = cx * cy * cz + sx * sy * sz;
    }

    return out;
}

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
const copy = _Vec4Func_js__WEBPACK_IMPORTED_MODULE_0__.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
const set = _Vec4Func_js__WEBPACK_IMPORTED_MODULE_0__.set;

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
const add = _Vec4Func_js__WEBPACK_IMPORTED_MODULE_0__.add;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
const scale = _Vec4Func_js__WEBPACK_IMPORTED_MODULE_0__.scale;

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
const dot = _Vec4Func_js__WEBPACK_IMPORTED_MODULE_0__.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
const lerp = _Vec4Func_js__WEBPACK_IMPORTED_MODULE_0__.lerp;

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 */
const length = _Vec4Func_js__WEBPACK_IMPORTED_MODULE_0__.length;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
const normalize = _Vec4Func_js__WEBPACK_IMPORTED_MODULE_0__.normalize;


/***/ }),

/***/ "./node_modules/ogl/src/math/functions/Vec2Func.js":
/*!*********************************************************!*\
  !*** ./node_modules/ogl/src/math/functions/Vec2Func.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "cross": () => (/* binding */ cross),
/* harmony export */   "distance": () => (/* binding */ distance),
/* harmony export */   "divide": () => (/* binding */ divide),
/* harmony export */   "dot": () => (/* binding */ dot),
/* harmony export */   "exactEquals": () => (/* binding */ exactEquals),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "lerp": () => (/* binding */ lerp),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "negate": () => (/* binding */ negate),
/* harmony export */   "normalize": () => (/* binding */ normalize),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "squaredDistance": () => (/* binding */ squaredDistance),
/* harmony export */   "squaredLength": () => (/* binding */ squaredLength),
/* harmony export */   "subtract": () => (/* binding */ subtract),
/* harmony export */   "transformMat2": () => (/* binding */ transformMat2),
/* harmony export */   "transformMat2d": () => (/* binding */ transformMat2d),
/* harmony export */   "transformMat3": () => (/* binding */ transformMat3),
/* harmony export */   "transformMat4": () => (/* binding */ transformMat4)
/* harmony export */ });
const EPSILON = 0.000001;

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
}

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
function set(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
}

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
}

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
}

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
}

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
function scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
}

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x * x + y * y);
}

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x * x + y * y;
}

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x * x + y * y);
}

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
    var x = a[0],
        y = a[1];
    return x * x + y * y;
}

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
function negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
}

/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */
function inverse(out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    return out;
}

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
function normalize(out, a) {
    var x = a[0],
        y = a[1];
    var len = x * x + y * y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
    }
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    return out;
}

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
}

/**
 * Computes the cross product of two vec2's
 * Note that the cross product returns a scalar
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} cross product of a and b
 */
function cross(a, b) {
    return a[0] * b[1] - a[1] * b[0];
}

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
function lerp(out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
}

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat2(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
}

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat2d(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
}

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat3(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
}

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat4(out, a, m) {
    let x = a[0];
    let y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
}

/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1];
}


/***/ }),

/***/ "./node_modules/ogl/src/math/functions/Vec3Func.js":
/*!*********************************************************!*\
  !*** ./node_modules/ogl/src/math/functions/Vec3Func.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "angle": () => (/* binding */ angle),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "cross": () => (/* binding */ cross),
/* harmony export */   "distance": () => (/* binding */ distance),
/* harmony export */   "divide": () => (/* binding */ divide),
/* harmony export */   "dot": () => (/* binding */ dot),
/* harmony export */   "exactEquals": () => (/* binding */ exactEquals),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "lerp": () => (/* binding */ lerp),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "negate": () => (/* binding */ negate),
/* harmony export */   "normalize": () => (/* binding */ normalize),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "scaleRotateMat4": () => (/* binding */ scaleRotateMat4),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "squaredDistance": () => (/* binding */ squaredDistance),
/* harmony export */   "squaredLength": () => (/* binding */ squaredLength),
/* harmony export */   "subtract": () => (/* binding */ subtract),
/* harmony export */   "transformMat3": () => (/* binding */ transformMat3),
/* harmony export */   "transformMat4": () => (/* binding */ transformMat4),
/* harmony export */   "transformQuat": () => (/* binding */ transformQuat)
/* harmony export */ });
const EPSILON = 0.000001;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    return Math.sqrt(x * x + y * y + z * z);
}

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
}

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
function set(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
}

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
}

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
}

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
}

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
function scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
}

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    let z = b[2] - a[2];
    return Math.sqrt(x * x + y * y + z * z);
}

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    let z = b[2] - a[2];
    return x * x + y * y + z * z;
}

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    return x * x + y * y + z * z;
}

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
function negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
}

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
function inverse(out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    out[2] = 1.0 / a[2];
    return out;
}

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
function normalize(out, a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let len = x * x + y * y + z * z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
    }
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
    return out;
}

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
    let ax = a[0],
        ay = a[1],
        az = a[2];
    let bx = b[0],
        by = b[1],
        bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
}

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
function lerp(out, a, b, t) {
    let ax = a[0];
    let ay = a[1];
    let az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
}

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
function transformMat4(out, a, m) {
    let x = a[0],
        y = a[1],
        z = a[2];
    let w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
}

/**
 * Same as above but doesn't apply translation.
 * Useful for rays.
 */
function scaleRotateMat4(out, a, m) {
    let x = a[0],
        y = a[1],
        z = a[2];
    let w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z) / w;
    return out;
}

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
function transformMat3(out, a, m) {
    let x = a[0],
        y = a[1],
        z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
}

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
function transformQuat(out, a, q) {
    // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed

    let x = a[0],
        y = a[1],
        z = a[2];
    let qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3];

    let uvx = qy * z - qz * y;
    let uvy = qz * x - qx * z;
    let uvz = qx * y - qy * x;

    let uuvx = qy * uvz - qz * uvy;
    let uuvy = qz * uvx - qx * uvz;
    let uuvz = qx * uvy - qy * uvx;

    let w2 = qw * 2;
    uvx *= w2;
    uvy *= w2;
    uvz *= w2;

    uuvx *= 2;
    uuvy *= 2;
    uuvz *= 2;

    out[0] = x + uvx + uuvx;
    out[1] = y + uvy + uuvy;
    out[2] = z + uvz + uuvz;
    return out;
}

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
const angle = (function () {
    const tempA = [0, 0, 0];
    const tempB = [0, 0, 0];

    return function (a, b) {
        copy(tempA, a);
        copy(tempB, b);

        normalize(tempA, tempA);
        normalize(tempB, tempB);

        let cosine = dot(tempA, tempB);

        if (cosine > 1.0) {
            return 0;
        } else if (cosine < -1.0) {
            return Math.PI;
        } else {
            return Math.acos(cosine);
        }
    };
})();

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}


/***/ }),

/***/ "./node_modules/ogl/src/math/functions/Vec4Func.js":
/*!*********************************************************!*\
  !*** ./node_modules/ogl/src/math/functions/Vec4Func.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "dot": () => (/* binding */ dot),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "lerp": () => (/* binding */ lerp),
/* harmony export */   "normalize": () => (/* binding */ normalize),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "set": () => (/* binding */ set)
/* harmony export */ });
const EPSILON = 0.000001;

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
}

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
function set(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
}

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
}

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
function scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
}

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let w = a[3];
    return Math.sqrt(x * x + y * y + z * z + w * w);
}

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
function normalize(out, a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let w = a[3];
    let len = x * x + y * y + z * z + w * w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
    }
    out[0] = x * len;
    out[1] = y * len;
    out[2] = z * len;
    out[3] = w * len;
    return out;
}

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
function lerp(out, a, b, t) {
    let ax = a[0];
    let ay = a[1];
    let az = a[2];
    let aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("84c176fa6ab39122f3f0")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=none&reconnect=10 ***!
  \********************************************************************************************************************************************/
var __resourceQuery = "?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=none&reconnect=10";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/log.js */ "./node_modules/webpack/hot/log.js");
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/strip-ansi/index.js */ "./node_modules/webpack-dev-server/client/modules/strip-ansi/index.js");
/* harmony import */ var _modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/parseURL.js */ "./node_modules/webpack-dev-server/client/utils/parseURL.js");
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./socket.js */ "./node_modules/webpack-dev-server/client/socket.js");
/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./overlay.js */ "./node_modules/webpack-dev-server/client/overlay.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* harmony import */ var _utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/sendMessage.js */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");
/* harmony import */ var _utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/reloadApp.js */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");
/* harmony import */ var _utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/createSocketURL.js */ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js");
/* global __resourceQuery, __webpack_hash__ */
/// <reference types="webpack/module" />









/**
 * @typedef {Object} Options
 * @property {boolean} hot
 * @property {boolean} liveReload
 * @property {boolean} progress
 * @property {boolean | { warnings?: boolean, errors?: boolean }} overlay
 * @property {string} [logging]
 * @property {number} [reconnect]
 */

/**
 * @typedef {Object} Status
 * @property {boolean} isUnloading
 * @property {string} currentHash
 * @property {string} [previousHash]
 */

/**
 * @type {Status}
 */

var status = {
  isUnloading: false,
  // TODO Workaround for webpack v4, `__webpack_hash__` is not replaced without HotModuleReplacement
  // eslint-disable-next-line camelcase
  currentHash:  true ? __webpack_require__.h() : 0
};
/** @type {Options} */

var options = {
  hot: false,
  liveReload: false,
  progress: false,
  overlay: false
};
var parsedResourceQuery = (0,_utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__["default"])(__resourceQuery);

if (parsedResourceQuery.hot === "true") {
  options.hot = true;
  _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Hot Module Replacement enabled.");
}

if (parsedResourceQuery["live-reload"] === "true") {
  options.liveReload = true;
  _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Live Reloading enabled.");
}

if (parsedResourceQuery.logging) {
  options.logging = parsedResourceQuery.logging;
}

if (typeof parsedResourceQuery.reconnect !== "undefined") {
  options.reconnect = Number(parsedResourceQuery.reconnect);
}
/**
 * @param {string} level
 */


function setAllLogLevel(level) {
  // This is needed because the HMR logger operate separately from dev server logger
  webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default().setLogLevel(level === "verbose" || level === "log" ? "info" : level);
  (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.setLogLevel)(level);
}

if (options.logging) {
  setAllLogLevel(options.logging);
}

self.addEventListener("beforeunload", function () {
  status.isUnloading = true;
});
var onSocketMessage = {
  hot: function hot() {
    if (parsedResourceQuery.hot === "false") {
      return;
    }

    options.hot = true;
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Hot Module Replacement enabled.");
  },
  liveReload: function liveReload() {
    if (parsedResourceQuery["live-reload"] === "false") {
      return;
    }

    options.liveReload = true;
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Live Reloading enabled.");
  },
  invalid: function invalid() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("App updated. Recompiling..."); // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Invalid");
  },

  /**
   * @param {string} hash
   */
  hash: function hash(_hash) {
    status.previousHash = status.currentHash;
    status.currentHash = _hash;
  },
  logging: setAllLogLevel,

  /**
   * @param {boolean} value
   */
  overlay: function overlay(value) {
    if (typeof document === "undefined") {
      return;
    }

    options.overlay = value;
  },

  /**
   * @param {number} value
   */
  reconnect: function reconnect(value) {
    if (parsedResourceQuery.reconnect === "false") {
      return;
    }

    options.reconnect = value;
  },

  /**
   * @param {boolean} value
   */
  progress: function progress(value) {
    options.progress = value;
  },

  /**
   * @param {{ pluginName?: string, percent: number, msg: string }} data
   */
  "progress-update": function progressUpdate(data) {
    if (options.progress) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(data.pluginName ? "[".concat(data.pluginName, "] ") : "").concat(data.percent, "% - ").concat(data.msg, "."));
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Progress", data);
  },
  "still-ok": function stillOk() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Nothing changed.");

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("StillOk");
  },
  ok: function ok() {
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Ok");

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  // TODO: remove in v5 in favor of 'static-changed'

  /**
   * @param {string} file
   */
  "content-changed": function contentChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },

  /**
   * @param {string} file
   */
  "static-changed": function staticChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },

  /**
   * @param {Error[]} warnings
   * @param {any} params
   */
  warnings: function warnings(_warnings, params) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn("Warnings while compiling.");

    var printableWarnings = _warnings.map(function (error) {
      var _formatProblem = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("warning", error),
          header = _formatProblem.header,
          body = _formatProblem.body;

      return "".concat(header, "\n").concat(_modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1___default()(body));
    });

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Warnings", printableWarnings);

    for (var i = 0; i < printableWarnings.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn(printableWarnings[i]);
    }

    var needShowOverlayForWarnings = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.warnings;

    if (needShowOverlayForWarnings) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.show)("warning", _warnings);
    }

    if (params && params.preventReloading) {
      return;
    }

    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },

  /**
   * @param {Error[]} errors
   */
  errors: function errors(_errors) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Errors while compiling. Reload prevented.");

    var printableErrors = _errors.map(function (error) {
      var _formatProblem2 = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("error", error),
          header = _formatProblem2.header,
          body = _formatProblem2.body;

      return "".concat(header, "\n").concat(_modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1___default()(body));
    });

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Errors", printableErrors);

    for (var i = 0; i < printableErrors.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(printableErrors[i]);
    }

    var needShowOverlayForErrors = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.errors;

    if (needShowOverlayForErrors) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.show)("error", _errors);
    }
  },

  /**
   * @param {Error} error
   */
  error: function error(_error) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(_error);
  },
  close: function close() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Disconnected!");

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Close");
  }
};
var socketURL = (0,_utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__["default"])(parsedResourceQuery);
(0,_socket_js__WEBPACK_IMPORTED_MODULE_3__["default"])(socketURL, onSocketMessage, options.reconnect);
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_mask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/mask */ "./app/components/mask.js");


class App {
  constructor() {
    this.init();
  }

  init() {
    new _components_mask__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

}

new App();
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***************************!*\
  !*** ./styles/index.scss ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0EsZUFBZTtBQUNmOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQSxrQ0FBa0MsUUFBUTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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MkIseUJBQXlCLDZCQUE2QiwyQkFBMkIsMkJBQTJCLDZCQUE2Qiw2QkFBNkIsMkJBQTJCLDZCQUE2Qix5QkFBeUIsMkJBQTJCLDJCQUEyQiw2QkFBNkIsNkJBQTZCLDZCQUE2QiwyQkFBMkIseUJBQXlCLDZCQUE2Qiw2QkFBNkIsMkJBQTJCLHlCQUF5Qix1QkFBdUIsNkJBQTZCLDZCQUE2Qiw2QkFBNkIsMkJBQTJCLDZCQUE2Qix5QkFBeUIsNkJBQTZCLDZCQUE2Qiw2QkFBNkIsNkJBQTZCLDJCQUEyQix5QkFBeUIsNkJBQTZCLDJCQUEyQix5QkFBeUIseUJBQXlCLHVCQUF1QixxQkFBcUIscUJBQXFCLGNBQWMsY0FBYyxlQUFlLGVBQWUsYUFBYSxhQUFhLGNBQWMsYUFBYSxhQUFhLGVBQWUsYUFBYSxZQUFZLFlBQVksWUFBWSxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGFBQWEsYUFBYSxjQUFjLGFBQWEsY0FBYyxjQUFjLGdCQUFnQixhQUFhLFlBQVksY0FBYyxhQUFhLGNBQWMsZUFBZSxXQUFXLFdBQVcsV0FBVyxnQkFBZ0IsV0FBVyxZQUFZLGNBQWMsWUFBWSxnQkFBZ0IsWUFBWSxZQUFZLFlBQVksY0FBYyxjQUFjLGFBQWEsY0FBYyxjQUFjLGdCQUFnQixhQUFhLFlBQVksY0FBYyxhQUFhLGNBQWMsZUFBZSxXQUFXLFdBQVcsV0FBVyxnQkFBZ0IsV0FBVyxZQUFZLGVBQWUsY0FBYyxZQUFZLGdCQUFnQixZQUFZLFlBQVksWUFBWSxjQUFjLGlCQUFpQixjQUFjLFlBQVksYUFBYSxlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsZUFBZSxjQUFjLGFBQWEsY0FBYyxnQkFBZ0IsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGNBQWMsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGVBQWUsYUFBYSxjQUFjLGNBQWMsY0FBYyxhQUFhLGNBQWMsV0FBVyxhQUFhLFlBQVksY0FBYyxlQUFlLGNBQWMsYUFBYSxjQUFjLFlBQVksWUFBWSxXQUFXLFlBQVksWUFBWSxZQUFZLGVBQWUsWUFBWSxhQUFhLGNBQWMsV0FBVyxjQUFjLFdBQVcsV0FBVyxZQUFZLFlBQVksYUFBYSxhQUFhLGFBQWEsY0FBYyxlQUFlLGFBQWEsYUFBYSxjQUFjLGNBQWMsZUFBZSxlQUFlLGFBQWEsYUFBYSxZQUFZLGVBQWUsY0FBYyxlQUFlLGNBQWMsTUFBTSxhQUFhLFdBQVcsYUFBYSxjQUFjLGFBQWEsY0FBYyxlQUFlLFlBQVksZUFBZSxhQUFhLFlBQVksYUFBYSxhQUFhLGNBQWMsWUFBWSxZQUFZLFlBQVksYUFBYSxZQUFZLGVBQWUsYUFBYSxhQUFhLGNBQWMsY0FBYyxhQUFhLGVBQWUsY0FBYyxhQUFhLGFBQWEsY0FBYyxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxjQUFjLGVBQWUsYUFBYSxjQUFjLGNBQWMsZUFBZSxlQUFlLGVBQWUsY0FBYyxhQUFhLGVBQWUsZUFBZSxjQUFjLGFBQWEsWUFBWSxlQUFlLGVBQWUsZUFBZSxjQUFjLGVBQWUsYUFBYSxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsYUFBYSxlQUFlLGNBQWMsY0FBYyxlQUFlLGVBQWUsY0FBYyxlQUFlLGFBQWEsY0FBYyxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsYUFBYSxlQUFlLGVBQWUsY0FBYyxhQUFhLFlBQVksZUFBZSxlQUFlLGVBQWUsY0FBYyxlQUFlLGFBQWEsZUFBZSxlQUFlLGVBQWUsZUFBZSxjQUFjLGFBQWEsZUFBZSxjQUFjLGFBQWEsYUFBYSxZQUFZLFdBQVcsV0FBVyxjQUFjLGNBQWMsZUFBZSxlQUFlLGFBQWEsYUFBYSxjQUFjLGFBQWEsYUFBYSxlQUFlLGFBQWEsWUFBWSxZQUFZLFlBQVksY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxhQUFhLGFBQWEsY0FBYyxhQUFhLGNBQWMsY0FBYyxnQkFBZ0IsYUFBYSxZQUFZLGNBQWMsYUFBYSxjQUFjLGVBQWUsV0FBVyxXQUFXLFdBQVcsZ0JBQWdCLFdB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QWMsYUFBYSxjQUFjLGNBQWMsZUFBZSxlQUFlLGVBQWUsY0FBYyxjQUFjLGNBQWMsZUFBZSxjQUFjLGFBQWEsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsYUFBYSxpQkFBaUIsYUFBYSxjQUFjLGVBQWUsY0FBYyxjQUFjLGNBQWMsY0FBYyxhQUFhLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxhQUFhLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsY0FBYyxlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsYUFBYSxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsaUJBQWlCLGVBQWUsY0FBYyxlQUFlLFlBQVksZUFBZSxpQkFBaUIsZUFBZSxlQUFlLGVBQWUsY0FBYyxjQUFjLGNBQWMsZUFBZSxlQUFlLGNBQWMsY0FBYyxnQkFBZ0IsYUFBYSxnQkFBZ0IsYUFBYSxhQUFhLGFBQWEsa0JBQWtCLFlBQVksWUFBWSxhQUFhLGFBQWEsYUFBYSxjQUFjLGNBQWMsV0FBVyxhQUFhLGFBQWEsY0FBYyxpQkFBaUIsZUFBZSxnQkFBZ0IsaUJBQWlCLGNBQWMsY0FBYyxlQUFlLG1CQUFtQixnQkFBZ0IsY0FBYyxlQUFlLGNBQWMsY0FBYyxjQUFjLGFBQWEsY0FBYyxhQUFhLGNBQWMsY0FBYyxnQkFBZ0IsZ0JBQWdCLG9CQUFvQixvQkFBb0IsdUJBQXVCLGdCQUFnQixZQUFZLGlCQUFpQixlQUFlLGVBQWUsZUFBZSxjQUFjLGNBQWMsd0JBQXdCLGdCQUFnQixjQUFjLGNBQWMsZUFBZSxjQUFjLGVBQWUsYUFBYSxlQUFlLGVBQWUsZUFBZSxjQUFjLGVBQWUsWUFBWSx1QkFBdUIsY0FBYyxZQUFZLGNBQWMsZ0JBQWdCLGVBQWUsYUFBYSxjQUFjLGVBQWUsY0FBYyxlQUFlLGVBQWUsYUFBYSxpQkFBaUIsZUFBZSxhQUFhLGNBQWMsYUFBYSxlQUFlLGVBQWUsY0FBYyxpQkFBaUIsZUFBZSxjQUFjLGFBQWEsYUFBYSxlQUFlLGNBQWMscUJBQXFCLGdCQUFnQixhQUFhLGlCQUFpQixlQUFlLGVBQWUsZUFBZSxlQUFlLGNBQWMsZ0JBQWdCLFlBQVksYUFBYSxzQkFBc0IsYUFBYSxXQUFXLGVBQWUsbUJBQW1CLGVBQWUsV0FBVyxpQkFBaUIsWUFBWSxvQkFBb0IsZUFBZSxjQUFjLG1CQUFtQixlQUFlLGVBQWUsYUFBYSxZQUFZLGFBQWEsY0FBYyxjQUFjLGFBQWEsZUFBZSxjQUFjLGdCQUFnQixtQkFBbUIsZUFBZSxnQkFBZ0IsZ0JBQWdCLGlCQUFpQixxQkFBcUIsY0FBYyxhQUFhLFlBQVksWUFBWSxhQUFhLGFBQWEsYUFBYSxZQUFZLGVBQWUsZUFBZSxjQUFjLGVBQWUsYUFBYSxjQUFjLGFBQWEsYUFBYSxjQUFjLGNBQWMsYUFBYSxjQUFjLGtCQUFrQixjQUFjLGlCQUFpQixhQUFhLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxjQUFjLGVBQWUsY0FBYyxtQkFBbUIsZUFBZSxjQUFjLGtCQUFrQixlQUFlLGNBQWMsWUFBWSxhQUFhLGNBQWMsZUFBZSxnQkFBZ0IsaUJBQWlCLGNBQWMsZUFBZSxhQUFhLGNBQWMsYUFBYSxZQUFZLFlBQVksWUFBWSxjQUFjLGlCQUFpQixhQUFhLGNBQWMsY0FBYyxhQUFhLGNBQWMsY0FBYyxhQUFhLGNBQWMsZUFBZSxlQUFlLGdCQUFnQixlQUFlLGNBQWMsZUFBZSxnQkFBZ0IsNEJBQTRCLGVBQWUsY0FBYyxrQkFBa0IsYUFBYSxlQUFlLGFBQWEsZUFBZSxlQUFlLGNBQWMsZUFBZSxlQUFlLGVBQWUsY0FBYyxlQUFlLGNBQWMsZUFBZSxlQUFlLGVBQWUsY0FBYyxZQUFZLGFBQWEsY0FBYyxhQUFhLGVBQWUsYUFBYSxhQUFhLGVBQWUsY0FBYyxjQUFjLGNBQWMsZUFBZSxhQUFhLGNBQWMsZUFBZSxjQUFjLGlCQUFpQixpQkFBaUIsaUJBQWlCLGNBQWMsYUFBYSxjQUFjLGNBQWMsYUFBYSxlQUFlLGNBQWMsY0FBYyxnQkFBZ0IsY0FBYyxlQUFlLGVBQWUsY0FBYyxhQUFhLGNBQWMsWUFBWSxhQUFhLGNBQWMsY0FBYyxjQUFjLGVBQWUsY0FBYyxjQUFjLGlCQUFpQixlQUFlLFlBQVksYUFBYSxlQUFlLGFBQWEsYUFBYSxjQUFjLGNBQWMsZUFBZSxjQUFjLG1CQUFtQixhQUFhLGVBQWUsaUJBQWlCLGVBQWUsY0FBYyxtQkFBbUIsY0FBYyxnQkFBZ0IsZUFBZSxzQkFBc0IsZUFBZSxnQkFBZ0Isc0JBQXNCLFlBQVksZUFBZSxhQUFhLGVBQWUsY0FBYyxjQUFjLElBQUksU0FBUyxhQUFhLGNBQWMsZ0JBQWdCLGdCQUFnQixlQUFlLGVBQWUsWUFBWSxhQUFhLGdCQUFnQixpQkFBaUIsYUFBYSxZQUFZLGNBQWMsZUFBZSxjQUFjLGVBQWUsZ0JBQWdCLGlCQUFpQixjQUFjLGVBQWUsY0FBYyxlQUFlLGFBQWEsWUFBWSxlQUFlLGNBQWMsYUFBYSxlQUFlLGNBQWMsZUFBZSxtQkFBbUIsY0FBYyxpQkFBaUIsYUFBYSxjQUFjLGNBQWMsY0FBYyxhQUFhLGVBQWUsY0FBYyxjQUFjLGVBQWUsZ0JBQWdCLGVBQWUsZ0JBQWdCLGFBQWEsZUFBZSxlQUFlLFlBQVksY0FBYyxlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsZUFBZSxhQUFhLGNBQWMsZUFBZSxlQUFlLGdCQUFnQixlQUFlLHFCQUFxQixpQkFBaUIsZ0JBQWdCLGNBQWMsY0FBYyxjQUFjLGFBQWEsZ0JBQWdCLGVBQWUsZUFBZSxZQUFZLGNBQWMsYUFBYSxZQUFZLGNBQWMsZUFBZSxjQUFjLGdCQUFnQixhQUFhLGVBQWUsY0FBYyxjQUFjLFdBQVcsY0FBYyxhQUFhLGFBQWEsY0FBYyxjQUFjLGFBQWEsYUFBYSxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsY0FBYyxlQUFlLGNBQWMsZ0JBQWdCLGFBQWEsZUFBZSxlQUFlLGtCQUFrQixhQUFhLFlBQVksY0FBYyxjQUFjLGVBQWUsZUFBZSxhQUFhLGFBQWEsd0JBQXdCLGNBQWMsWUFBWSxhQUFhLGFBQWEsZUFBZSxtQkFBbUIsYUFBYSxjQUFjLFlBQVksZ0JBQWdCLGtCQUFrQixnQkFBZ0IsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLGVBQWUsZ0JBQWdCLG9CQUFvQixnQkFBZ0IsZ0JBQWdCLGNBQWMsYUFBYSxvQkFBb0IsYUFBYSxvQkFBb0IsZUFBZSxXQUFXLFlBQVksZUFBZSxjQUFjLGVBQWUsZUFBZSxjQUFjLGVBQWUsY0FBYyxjQUFjLGdCQUFnQixlQUFlLGNBQWMsY0FBYyxpQkFBaUIsZUFBZSxpQkFBaUIsZUFBZSxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsWUFBWSxlQUFlLGFBQWEsZUFBZSxjQUFjLGNBQWMsYUFBYSxhQUFhLGVBQWUsWUFBWSxjQUFjLGNBQWMsZ0JBQWdCLFlBQVksY0FBYyxjQUFjLGdCQUFnQixhQUFhLGNBQWMsYUFBYSxjQUFjLFlBQVksWUFBWSxhQUFhLGFBQWEsYUFBYSxlQUFlLGFBQWEsZ0JBQWdCLFlBQVksZUFBZSxhQUFhLGVBQWUsaUJBQWlCLGFBQWEsY0FBYyxhQUFhLGVBQWUsY0FBYyxZQUFZLGVBQWUsZUFBZSxlQUFlLGdCQUFnQixhQUFhLFlBQVksZUFBZSxjQUFjLFdBQVcsY0FBYyxnQkFBZ0IsYUFBYSxpQkFBaUIsZ0JBQWdCLGVBQWUsY0FBYyxnQkFBZ0IsZ0JBQWdCLGlCQUFpQixjQUFjLGNBQWMsWUFBWSxtQkFBbUIsY0FBYyxhQUFhLGVBQWUsY0FBYyxpQkFBaUIsaUJBQWlCLGlCQUFpQixlQUFlLGNBQWMsWUFBWSxlQUFlLGFBQWEsY0FBYyxlQUFlLGNBQWMsZ0JBQWdCLGNBQWMsZUFBZSxhQUFhLGNBQWMsZUFBZSxpQkFBaUIsY0FBYyxjQUFjLGNBQWMsZUFBZSxnQkFBZ0IsY0FBYyxlQUFlLGVBQWUsZ0JBQWdCLHVCQUF1Qix3QkFBd0IsZUFBZSxjQUFjLGNBQWMsSUFBSSxTQUFTLGFBQWEsY0FBYyxnQkFBZ0IsZ0JBQWdCLGVBQWUsZUFBZSxZQUFZLGFBQWEsZ0JBQWdCLGFBQWEsYUFBYSxlQUFlLGFBQWEsZUFBZSxZQUFZLGVBQWUsY0FBYyxlQUFlLGFBQWEsWUFBWSxtQkFBbUIsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsZ0JBQWdCLGFBQWEsZUFBZSxpQkFBaUIsZUFBZSxjQUFjLGVBQWUsc0JBQXNCLGlCQUFpQixnQkFBZ0IsV0FBVyxlQUFlLFlBQVksbUJBQW1CLGVBQWUsZUFBZSxjQUFjLGlCQUFpQixvQkFBb0IsaUJBQWlCLGlCQUFpQixZQUFZLGFBQWEsY0FBYyxjQUFjLGFBQWEsSUFBSSxTQUFTLGFBQWEsYUFBYSxhQUFhLGNBQWMsZUFBZSxhQUFhLFlBQVksY0FBYyxpQkFBaUIsZUFBZSxhQUFhLGNBQWMsYUFBYSxjQUFjLGNBQWMsZ0JBQWdCLGdCQUFnQixlQUFlLGlCQUFpQixlQUFlLFlBQVksYUFBYSxlQUFlLGVBQWUsWUFBWSxhQUFhLGVBQWUsY0FBYyxrQkFBa0IsZ0JBQWdCLGdCQUFnQixjQUFjLGFBQWEsZUFBZSxrQkFBa0IsZUFBZSxnQkFBZ0IsZ0JBQWdCLG1CQUFtQixrQkFBa0IsZ0JBQWdCLGdCQUFnQixlQUFlLGVBQWUsZUFBZSxhQUFhLGFBQWEsYUFBYSxhQUFhLGtCQUFrQixlQUFlLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLG1CQUFtQixrQkFBa0IsZ0JBQWdCLGVBQWUsZUFBZSxlQUFlLGNBQWMsZUFBZSxjQUFjLGVBQWUsWUFBWSxlQUFlLGVBQWUsWUFBWSxlQUFlLGFBQWEsY0FBYyxpQkFBaUIsY0FBYyxjQUFjLGlCQUFpQixlQUFlLGVBQWUsZUFBZSxjQUFjLGdCQUFnQixlQUFlLGFBQWEsYUFBYSxlQUFlLGlCQUFpQixnQkFBZ0IsY0FBYyxnQkFBZ0IsaUJBQWlCLGNBQWMsYUFBYSxjQUFjLGVBQWUsYUFBYSxlQUFlLGNBQWMsZUFBZSxjQUFjLFlBQVksZUFBZSxlQUFlLGFBQWEsZUFBZSxjQUFjLGlCQUFpQixlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsZ0JBQWdCLGNBQWMsaUJBQWlCLGVBQWUsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGFBQWEsZ0JBQWdCLGFBQWEsY0FBYyxlQUFlLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLGdCQUFnQixZQUFZLGVBQWUsY0FBYyxlQUFlLGFBQWEsY0FBYyxjQUFjLGdCQUFnQixjQUFjLGVBQWUsZUFBZSxXQUFXLGFBQWEsY0FBYyxjQUFjLGFBQWEsV0FBVyxhQUFhLGNBQWMsY0FBYyxlQUFlLGFBQWEsY0FBYyxZQUFZLFlBQVksYUFBYSxhQUFhLGNBQWMsY0FBYyxhQUFhLGFBQWEsZUFBZSxlQUFlLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxnQkFBZ0IsY0FBYyxjQUFjLFlBQVksYUFBYTs7Ozs7Ozs7Ozs7QUNBOTZpRSw4Q0FBMkMsQ0FBQyxXQUFXLEVBQUMsQ0FBQyx5QkFBeUIsRUFBRTs7Ozs7Ozs7Ozs7QUNBcEYsOENBQTJDLENBQUMsV0FBVyxFQUFDLENBQUMscUJBQXFCLGlEQUFpRCwrR0FBK0csb0JBQW9CLHVEQUF1RCxtQ0FBbUMsMEJBQTBCLHdGQUF3Rix5QkFBeUIsT0FBTyx1QkFBdUI7Ozs7Ozs7Ozs7Ozs7OztBQ0FsaEIsaUVBQWUsdUJBQXVCLGtHQUFrRyw2QkFBNkIscUJBQXFCLHVHQUF1RyxxREFBcUQsdURBQXVELG1DQUFtQyxpQ0FBaUMsMkNBQTJDLEdBQUcsZ0ZBQWdGLGdDQUFnQyxpSkFBaUosR0FBRyxpQkFBaUIsZ0lBQWdJLDhDQUE4Qyx1Q0FBdUMsOE5BQThOLHFGQUFxRixrQ0FBa0MsK0JBQStCLHNIQUFzSCxtRkFBbUYsd0NBQXdDLHFFQUFxRSwrQkFBK0Isd0NBQXdDLEdBQUcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDQTl0RCxpRUFBZSx1QkFBdUIseUNBQXlDLDBCQUEwQix3QkFBd0IsaUNBQWlDLGdDQUFnQyxxQkFBcUIsaUJBQWlCLGFBQWEsNkVBQTZFLEdBQUcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ0F0VSxrREFBa0QsMENBQTBDOztBQUU1Riw0Q0FBNEMsZ0JBQWdCLGtCQUFrQixPQUFPLDJCQUEyQix3REFBd0QsZ0NBQWdDLHVEQUF1RDs7QUFFL1AsOERBQThELHNFQUFzRSw4REFBOEQsa0RBQWtELGlCQUFpQixHQUFHOztBQUVsTzs7QUFFdEM7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxNQUFNLG9EQUFTO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsYUFBYSwwQkFBMEI7QUFDdkM7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsMEJBQTBCO0FBQ3pDOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0EsZUFBZSwwQkFBMEI7QUFDekM7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUN2REQsdUJBQXVCO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzRUFBc0UsV0FBVyxtRkFBbUYsV0FBVztBQUMvSzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx5Q0FBeUMsU0FBUztBQUNsRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixrQkFBa0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsYUFBYSxrQkFBa0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsYUFBYSxZQUFZO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsV0FBVztBQUN4QjtBQUNBO0FBQ0E7QUFDQSxhQUFhLGNBQWM7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQSxhQUFhLFVBQVU7QUFDdkI7O0FBRUEsQ0FBQztBQUNEO0FBQ0EsY0FBYyxzQ0FBc0M7O0FBRXBELDBFQUEwRSxXQUFXO0FBQ3JGLDZFQUE2RSxXQUFXO0FBQ3hGLHdGQUF3RixXQUFXOztBQUVuRztBQUNBO0FBQ0EsYUFBYSxxQ0FBcUM7QUFDbEQsYUFBYSxzREFBc0Q7QUFDbkU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwRUFBMEUsYUFBYTtBQUN2RjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLDZFQUE2RSxlQUFlO0FBQzVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsNkVBQTZFLGVBQWU7QUFDNUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSw2RUFBNkUsZUFBZTtBQUM1RjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLDZFQUE2RSxlQUFlO0FBQzVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxtR0FBbUcsZUFBZTtBQUNsSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsNkVBQTZFLGVBQWU7QUFDNUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSw2RUFBNkUsZUFBZTtBQUM1RjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLDZFQUE2RSxlQUFlO0FBQzVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsZ0ZBQWdGLGlCQUFpQjtBQUNqRztBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLENBQUM7O0FBRUQ7O0FBRUEsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxnQ0FBbUI7O0FBRXJFO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzRUFBc0UsV0FBVyxtRkFBbUYsV0FBVztBQUMvSzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx5Q0FBeUMsU0FBUztBQUNsRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZUFBZSxnQ0FBbUI7QUFDbEM7QUFDQSxjQUFjLDZEQUE2RDs7QUFFM0UsY0FBYyx5REFBeUQ7O0FBRXZFLGNBQWMsZ0NBQWdDOztBQUU5QyxjQUFjLDJCQUEyQjs7QUFFekM7QUFDQSxhQUFhLFFBQVE7QUFDckIsY0FBYyxrQkFBa0I7QUFDaEMsY0FBYyxrQkFBa0I7QUFDaEMsY0FBYywwQkFBMEI7QUFDeEMsY0FBYywwQkFBMEI7QUFDeEMsY0FBYywwQkFBMEI7QUFDeEMsY0FBYywwQkFBMEI7QUFDeEMsY0FBYywyQkFBMkI7QUFDekMsY0FBYywyQkFBMkI7QUFDekMsY0FBYywyQkFBMkI7QUFDekMsY0FBYywyQkFBMkI7QUFDekMsY0FBYywyQkFBMkI7QUFDekMsY0FBYywyQkFBMkI7QUFDekMsY0FBYywyQkFBMkI7QUFDekMsY0FBYywyQkFBMkI7QUFDekM7O0FBRUE7QUFDQSxhQUFhLFFBQVE7QUFDckIsY0FBYyx5REFBeUQ7QUFDdkUsY0FBYyxxQkFBcUI7QUFDbkMsY0FBYyxlQUFlO0FBQzdCOztBQUVBO0FBQ0EsV0FBVyxpQkFBaUI7QUFDNUIsYUFBYSxnQkFBZ0I7QUFDN0I7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZUFBZTtBQUMxQixhQUFhLDRDQUE0QztBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILGFBQWEsbUJBQW1CO0FBQ2hDO0FBQ0EsYUFBYSxRQUFROztBQUVyQjtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsYUFBYTtBQUMxQixhQUFhLE9BQU87QUFDcEIsZUFBZTtBQUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLDRCQUE0Qjs7QUFFNUI7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHVEQUF1RDs7QUFFdkQ7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx1REFBdUQ7O0FBRXZEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHVEQUF1RDs7QUFFdkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsZ0NBQW1COztBQUVyRTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLG9CQUFvQixzQkFBc0I7QUFDMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxtQkFBbUIsZ0NBQW1COztBQUV0QyxlQUFlLGdDQUFtQjtBQUNsQzs7QUFFQSwwQkFBMEIsZ0NBQW1CO0FBQzdDLFdBQVcsbUNBQW1DOzs7QUFHOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLFdBQVcsbUNBQW1DO0FBQzlDLGFBQWE7QUFDYjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPOztBQUVQLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdDQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSxnQ0FBbUI7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxnQ0FBbUI7QUFDOUI7QUFDQSxnQkFBZ0IsZ0NBQW1CLHdCQUF3QixnQ0FBbUI7QUFDOUUsb0RBQW9ELHdDQUF3QztBQUM1RjtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVyxnQ0FBbUIsMkJBQTJCO0FBQ3pELFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZ0NBQW1CO0FBQzlCO0FBQ0Esa0VBQWtFLGlCQUFpQjtBQUNuRjtBQUNBLDJEQUEyRCxhQUFhO0FBQ3hFO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBbUI7QUFDbkIscUJBQXFCLGdDQUFtQjtBQUN4QywrQ0FBK0M7QUFDL0Msc0JBQXNCO0FBQ3RCLHVGQUF1RixnQ0FBbUI7O0FBRTFHLENBQUM7QUFDRDtBQUNBO0FBQ0Esb0dBQW9HLGFBQWE7QUFDakgsVUFBVTtBQUNWOzs7Ozs7Ozs7O0FDM3pCQSx1QkFBdUI7QUFDdkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBFQUEwRSw4QkFBbUI7O0FBRTdGLDhCQUFtQjtBQUNuQixxQkFBcUIsOEJBQW1CO0FBQ3hDLCtDQUErQztBQUMvQyxzQkFBc0I7QUFDdEIsbUVBQW1FLDhCQUFtQjs7QUFFdEY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEVBQTBFLCtCQUFtQjs7QUFFN0YsK0JBQW1CO0FBQ25CLHFCQUFxQiwrQkFBbUI7QUFDeEMsK0NBQStDO0FBQy9DLHNCQUFzQjtBQUN0QjtBQUNBLG1GQUFtRjtBQUNuRjtBQUNBOztBQUVBLDJDQUEyQyxnQkFBZ0IsNkNBQTZDLG9EQUFvRCxJQUFJLElBQUksSUFBSSxJQUFJO0FBQzVLO0FBQ0E7O0FBRUEsT0FBTzs7QUFFUCxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwrQkFBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUUsK0JBQW1CO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsK0JBQW1CO0FBQzlCO0FBQ0EsZ0JBQWdCLCtCQUFtQix3QkFBd0IsK0JBQW1CO0FBQzlFLG9EQUFvRCx3Q0FBd0M7QUFDNUY7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVcsK0JBQW1CLDJCQUEyQjtBQUN6RCxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLCtCQUFtQjtBQUM5QjtBQUNBLGtFQUFrRSxpQkFBaUI7QUFDbkY7QUFDQSwyREFBMkQsYUFBYTtBQUN4RTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQW1CO0FBQ25CLG1FQUFtRSwrQkFBbUI7O0FBRXRGO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxvR0FBb0csYUFBYTtBQUNqSCxVQUFVO0FBQ1Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RIQTtBQUNBO0FBQzJDO0FBQ0o7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxzQ0FBc0M7O0FBRWpEO0FBQ0EsV0FBVyxtQ0FBbUM7O0FBRTlDO0FBQ0EsV0FBVywwQ0FBMEM7O0FBRXJEO0FBQ0Esb0VBQWtCOztBQUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxVQUFVOztBQUV6QixlQUFlLG1CQUFtQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDs7QUFFakQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxVQUFVOztBQUV6QixlQUFlLG1CQUFtQjtBQUNsQztBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0EsS0FBSztBQUNMO0FBQ0EsZUFBZSxtQkFBbUI7O0FBRWxDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQ0FBbUM7QUFDOUM7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFOzs7QUFHRjtBQUNBO0FBQ0E7QUFDQSxJQUFJOzs7QUFHSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsWUFBWSxzRUFBc0U7QUFDN0YsZUFBZTtBQUNmOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSixnQ0FBZ0M7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsa0JBQWtCLG9FQUFvRSxHQUFHO0FBQ3BHOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdEQUF3RDs7QUFFeEQsaUJBQWlCLDBEQUFRLENBQUMscURBQU07QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7O0FBRWpDO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsTUE7QUFDMkQ7QUFDdEIsQ0FBQzs7QUFFdEM7O0FBRUE7QUFDQSxPQUFPLDZCQUE2QiwwQkFBMEIsNkJBQTZCLDJCQUEyQiw2QkFBNkIsV0FBVyw2QkFBNkIsR0FBRyxtRUFBZTtBQUM3TTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLHdEQUF3RDtBQUNyRSxXQUFXLFFBQVE7QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLE1BQU07OztBQUdOLG1CQUFtQjs7QUFFbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxtREFBUTtBQUNkO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGlFQUFlLE1BQU07Ozs7Ozs7Ozs7Ozs7OztBQzdEckI7QUFDQSxhQUFhLDRJQUE0STtBQUN6SixhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUSwrQkFBK0I7QUFDbEQsYUFBYTtBQUNiOzs7QUFHQTtBQUNBLHFDQUFxQztBQUNyQzs7QUFFQSx3RkFBd0Y7QUFDeEY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0VBQXdFOztBQUV4RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEI7QUFDMUI7O0FBRUE7QUFDQSx3Q0FBd0M7QUFDeEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsaUVBQWUsZUFBZTs7Ozs7Ozs7Ozs7Ozs7O0FDeEk5QjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOzs7QUFHSjtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUk7OztBQUdKO0FBQ0E7O0FBRUEsaUVBQWUsc0JBQXNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6Qlc7QUFDaEQsaUNBQWlDO0FBQ2pDOztBQUVBLDJCQUEyQjs7QUFFM0I7QUFDQSxXQUFXLHVFQUF1RTtBQUNsRixhQUFhO0FBQ2I7O0FBRUE7QUFDQSxFQUFFLHNGQUE2QjtBQUMvQjtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLFVBQVUseUVBQWdCOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCdUM7QUFDakU7QUFDQSxXQUFXLFFBQVE7QUFDbkIsZUFBZTtBQUNmOztBQUVBO0FBQ0EsZUFBZSx5QkFBeUI7QUFDeEM7O0FBRUE7QUFDQTs7QUFFQSxvQkFBb0IseUJBQXlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLHVCQUF1QixzRUFBc0I7QUFDN0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sZUFBZTtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpRUFBZSxRQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4Q3lCO0FBQ2pCO0FBQy9CLGNBQWMsNEJBQTRCO0FBQzFDLGNBQWMsMkJBQTJCOztBQUV6QztBQUNBLFdBQVcsU0FBUztBQUNwQixXQUFXLFFBQVE7QUFDbkI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0EsSUFBSSw2Q0FBUTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSSw2Q0FBUTtBQUNaLElBQUksa0VBQWU7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsMkJBQTJCOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUEsaUVBQWUsU0FBUzs7Ozs7Ozs7Ozs7Ozs7O0FDdkV4QjtBQUNBOztBQUVBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsS0FBSztBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxpRUFBZSxPQUFPOzs7Ozs7Ozs7O0FDaEJ0QixtQkFBbUIsbUJBQU8sQ0FBQywrQ0FBUTtBQUNuQzs7Ozs7Ozs7Ozs7QUNEQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQjs7QUFFcEIsNkJBQTZCOztBQUU3Qix1QkFBdUI7O0FBRXZCLDBCQUEwQjtBQUMxQjtBQUNBOztBQUVBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRDJDO0FBQ0o7QUFDQTs7QUFFdkMscUJBQXFCLCtDQUFJO0FBQ3pCLHNCQUFzQiwrQ0FBSTtBQUMxQixzQkFBc0IsK0NBQUk7O0FBRW5CLHFCQUFxQixvREFBUztBQUNyQyxzQkFBc0Isa0ZBQWtGLElBQUk7QUFDNUc7O0FBRUEsOEJBQThCLHdEQUF3RDs7QUFFdEYsb0NBQW9DLCtDQUFJO0FBQ3hDLDhCQUE4QiwrQ0FBSTtBQUNsQyx3Q0FBd0MsK0NBQUk7QUFDNUMsaUNBQWlDLCtDQUFJOztBQUVyQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IseUVBQXlFLElBQUk7QUFDL0YsOEJBQThCLHdCQUF3QjtBQUN0RCxnREFBZ0QsK0NBQStDO0FBQy9GO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxJQUFJO0FBQ1YsOEJBQThCLDJDQUEyQztBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxxQ0FBcUM7QUFDcEY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdDQUFnQywrQ0FBSSxRQUFRLCtDQUFJLFFBQVEsK0NBQUksUUFBUSwrQ0FBSSxRQUFRLCtDQUFJLFFBQVEsK0NBQUk7QUFDaEc7O0FBRUE7QUFDQSw4RkFBOEY7QUFDOUYsOEZBQThGO0FBQzlGLDhGQUE4RjtBQUM5Riw4RkFBOEY7QUFDOUYsK0ZBQStGO0FBQy9GLCtGQUErRjs7QUFFL0Ysd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRXVDOztBQUV2QyxxQkFBcUIsK0NBQUk7O0FBRXpCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFTztBQUNQLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3REFBd0QsWUFBWTtBQUNwRTtBQUNBO0FBQ0EsaURBQWlELE1BQU07QUFDdkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUMsNENBQTRDO0FBQzVDLDRDQUE0Qzs7QUFFNUM7QUFDQTtBQUNBOztBQUVBLDRCQUE0QixZQUFZO0FBQ3hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLG1DQUFtQztBQUM5QyxvREFBb0QsUUFBUSxHQUFHLHVCQUF1QjtBQUN0RjtBQUNBO0FBQ0Esa0RBQWtELFFBQVEsR0FBRyx1QkFBdUI7QUFDcEY7O0FBRUE7QUFDQSx3REFBd0QsTUFBTTtBQUM5RDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCLCtDQUFJO0FBQzdCLHlCQUF5QiwrQ0FBSTtBQUM3Qiw0QkFBNEIsK0NBQUk7QUFDaEMsMkJBQTJCLCtDQUFJO0FBQy9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDLE9BQU87QUFDakQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSwwQ0FBMEMsT0FBTztBQUNqRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeFIyQztBQUNKO0FBQ0E7O0FBRXZDOztBQUVPLG1CQUFtQixvREFBUztBQUNuQyxzQkFBc0IsZ0ZBQWdGLElBQUk7QUFDMUc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLCtDQUFJO0FBQ3ZDLGdDQUFnQywrQ0FBSTtBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVyxTQUFTLElBQUk7QUFDeEIsMkRBQTJELG9CQUFvQjtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxhQUFhO0FBQ2hELGtDQUFrQyxhQUFhO0FBQy9DLHVDQUF1QyxhQUFhO0FBQ3BELG9DQUFvQyxhQUFhO0FBQ2pELHdDQUF3QyxhQUFhO0FBQ3JELHNDQUFzQyxhQUFhO0FBQ25ELGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkJBQTJCLFdBQVc7QUFDdEMsNkJBQTZCLHdDQUF3QztBQUNyRSwwREFBMEQsb0JBQW9CO0FBQzlFO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsa0NBQWtDLG1CQUFtQix1QkFBdUI7QUFDeEc7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixvQ0FBb0MscUJBQXFCLHlCQUF5QjtBQUM5Rzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsc0JBQXNCO0FBQ25EO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixxQkFBcUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVLG9CQUFvQixJQUFJO0FBQ2xDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsNkJBQTZCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QiwwQkFBMEIsSUFBSSw2QkFBNkI7QUFDdkY7O0FBRUE7QUFDQSw4Q0FBOEMsTUFBTTtBQUNwRDs7QUFFQTtBQUNBLCtCQUErQixNQUFNO0FBQ3JDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtHQUFrRztBQUNsRztBQUNBLG1EQUFtRDtBQUNuRDtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtHQUFrRztBQUNsRztBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBLGdFQUFnRTtBQUNoRTtBQUNBLGdFQUFnRTtBQUNoRTtBQUNBLGdFQUFnRTtBQUNoRTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGNBQWM7QUFDbEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0NBQWtDLE9BQU87QUFDekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBa0MsT0FBTztBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbFR1Qzs7QUFFdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLCtDQUFJO0FBQ3pCOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sSUFBSTtBQUNWLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxVnNEO0FBQ3JCOztBQUVqQyxvQkFBb0IsMENBQUk7O0FBRWpCO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsdUVBQTRCO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0VvRDs7QUFFN0M7QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUSx1REFBWTtBQUNwQjtBQUNBOztBQUVBO0FBQ0EsUUFBUSw2REFBa0I7QUFDMUI7QUFDQTs7QUFFQTtBQUNBLFFBQVEsMERBQWU7QUFDdkI7QUFDQTs7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OztBQUVmLG9CQUFvQiw0QkFBNEI7QUFDaEQsTUFBTSxvREFBUztBQUNmOztBQUVBOztBQUVBO0FBQ0EsTUFBTSxpREFBSTtBQUNWO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0EsSUFBSSxvREFBUztBQUNiLEdBQUc7QUFDSDtBQUNBLElBQUksbURBQVE7O0FBRVo7QUFDQSxNQUFNLGlEQUFJO0FBQ1Y7O0FBRUEsSUFBSSxpRUFBVztBQUNmO0FBQ0E7QUFDQSxnQkFBZ0IscUVBQWU7QUFDL0Isc0RBQU0sZ0Q7Ozs7Ozs7Ozs7OztBQ2hSTjs7QUFFQSxNQUFNSSxHQUFOLENBQVU7QUFDTmhJLEVBQUFBLFdBQVcsR0FBRztBQUNWLFNBQUtzQixJQUFMO0FBQ0g7O0FBRURBLEVBQUFBLElBQUksR0FBRztBQUNILFFBQUl2Qix3REFBSjtBQUNIOztBQVBLOztBQVVWLElBQUlpSSxHQUFKLEc7Ozs7Ozs7Ozs7QUNaQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbnNpLWh0bWwtY29tbXVuaXR5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL21hc2suanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3V0aWxzL21hdGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2h0bWwtZW50aXRpZXMvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9odG1sLWVudGl0aWVzL2xpYi9uYW1lZC1yZWZlcmVuY2VzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9odG1sLWVudGl0aWVzL2xpYi9udW1lcmljLXVuaWNvZGUtbWFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9odG1sLWVudGl0aWVzL2xpYi9zdXJyb2dhdGUtcGFpcnMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NoYWRlcnMvZnJhZ21lbnQuZ2xzbCIsIndlYnBhY2s6Ly8vLi9hcHAvc2hhZGVycy92ZXJ0ZXguZ2xzbCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9jbGllbnRzL1dlYlNvY2tldENsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9tb2R1bGVzL2xvZ2dlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9tb2R1bGVzL3N0cmlwLWFuc2kvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvb3ZlcmxheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9zb2NrZXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvdXRpbHMvY3JlYXRlU29ja2V0VVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL2dldEN1cnJlbnRTY3JpcHRTb3VyY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvdXRpbHMvbG9nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL3BhcnNlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL3JlbG9hZEFwcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9zZW5kTWVzc2FnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvZW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvbG9nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vZ2wvc3JjL2NvcmUvQ2FtZXJhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vZ2wvc3JjL2NvcmUvR2VvbWV0cnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29nbC9zcmMvY29yZS9NZXNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vZ2wvc3JjL2NvcmUvUHJvZ3JhbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2dsL3NyYy9jb3JlL1JlbmRlcmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vZ2wvc3JjL2NvcmUvVGV4dHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2dsL3NyYy9jb3JlL1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2dsL3NyYy9leHRyYXMvUGxhbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29nbC9zcmMvZXh0cmFzL1JheWNhc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29nbC9zcmMvbWF0aC9FdWxlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2dsL3NyYy9tYXRoL01hdDMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29nbC9zcmMvbWF0aC9NYXQ0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vZ2wvc3JjL21hdGgvUXVhdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2dsL3NyYy9tYXRoL1ZlYzIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29nbC9zcmMvbWF0aC9WZWMzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vZ2wvc3JjL21hdGgvZnVuY3Rpb25zL0V1bGVyRnVuYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2dsL3NyYy9tYXRoL2Z1bmN0aW9ucy9NYXQzRnVuYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2dsL3NyYy9tYXRoL2Z1bmN0aW9ucy9NYXQ0RnVuYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2dsL3NyYy9tYXRoL2Z1bmN0aW9ucy9RdWF0RnVuYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2dsL3NyYy9tYXRoL2Z1bmN0aW9ucy9WZWMyRnVuYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2dsL3NyYy9tYXRoL2Z1bmN0aW9ucy9WZWMzRnVuYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2dsL3NyYy9tYXRoL2Z1bmN0aW9ucy9WZWM0RnVuYy5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL2luZGV4LnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gYW5zaUhUTUxcblxuLy8gUmVmZXJlbmNlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvYW5zaS1yZWdleFxudmFyIF9yZWdBTlNJID0gLyg/Oig/OlxcdTAwMWJcXFspfFxcdTAwOWIpKD86KD86WzAtOV17MSwzfSk/KD86KD86O1swLTldezAsM30pKik/W0EtTXxmLW1dKXxcXHUwMDFiW0EtTV0vXG5cbnZhciBfZGVmQ29sb3JzID0ge1xuICByZXNldDogWydmZmYnLCAnMDAwJ10sIC8vIFtGT1JFR1JPVURfQ09MT1IsIEJBQ0tHUk9VTkRfQ09MT1JdXG4gIGJsYWNrOiAnMDAwJyxcbiAgcmVkOiAnZmYwMDAwJyxcbiAgZ3JlZW46ICcyMDk4MDUnLFxuICB5ZWxsb3c6ICdlOGJmMDMnLFxuICBibHVlOiAnMDAwMGZmJyxcbiAgbWFnZW50YTogJ2ZmMDBmZicsXG4gIGN5YW46ICcwMGZmZWUnLFxuICBsaWdodGdyZXk6ICdmMGYwZjAnLFxuICBkYXJrZ3JleTogJzg4OCdcbn1cbnZhciBfc3R5bGVzID0ge1xuICAzMDogJ2JsYWNrJyxcbiAgMzE6ICdyZWQnLFxuICAzMjogJ2dyZWVuJyxcbiAgMzM6ICd5ZWxsb3cnLFxuICAzNDogJ2JsdWUnLFxuICAzNTogJ21hZ2VudGEnLFxuICAzNjogJ2N5YW4nLFxuICAzNzogJ2xpZ2h0Z3JleSdcbn1cbnZhciBfb3BlblRhZ3MgPSB7XG4gICcxJzogJ2ZvbnQtd2VpZ2h0OmJvbGQnLCAvLyBib2xkXG4gICcyJzogJ29wYWNpdHk6MC41JywgLy8gZGltXG4gICczJzogJzxpPicsIC8vIGl0YWxpY1xuICAnNCc6ICc8dT4nLCAvLyB1bmRlcnNjb3JlXG4gICc4JzogJ2Rpc3BsYXk6bm9uZScsIC8vIGhpZGRlblxuICAnOSc6ICc8ZGVsPicgLy8gZGVsZXRlXG59XG52YXIgX2Nsb3NlVGFncyA9IHtcbiAgJzIzJzogJzwvaT4nLCAvLyByZXNldCBpdGFsaWNcbiAgJzI0JzogJzwvdT4nLCAvLyByZXNldCB1bmRlcnNjb3JlXG4gICcyOSc6ICc8L2RlbD4nIC8vIHJlc2V0IGRlbGV0ZVxufVxuXG47WzAsIDIxLCAyMiwgMjcsIDI4LCAzOSwgNDldLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgX2Nsb3NlVGFnc1tuXSA9ICc8L3NwYW4+J1xufSlcblxuLyoqXG4gKiBDb252ZXJ0cyB0ZXh0IHdpdGggQU5TSSBjb2xvciBjb2RlcyB0byBIVE1MIG1hcmt1cC5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gYW5zaUhUTUwgKHRleHQpIHtcbiAgLy8gUmV0dXJucyB0aGUgdGV4dCBpZiB0aGUgc3RyaW5nIGhhcyBubyBBTlNJIGVzY2FwZSBjb2RlLlxuICBpZiAoIV9yZWdBTlNJLnRlc3QodGV4dCkpIHtcbiAgICByZXR1cm4gdGV4dFxuICB9XG5cbiAgLy8gQ2FjaGUgb3BlbmVkIHNlcXVlbmNlLlxuICB2YXIgYW5zaUNvZGVzID0gW11cbiAgLy8gUmVwbGFjZSB3aXRoIG1hcmt1cC5cbiAgdmFyIHJldCA9IHRleHQucmVwbGFjZSgvXFwwMzNcXFsoXFxkKyltL2csIGZ1bmN0aW9uIChtYXRjaCwgc2VxKSB7XG4gICAgdmFyIG90ID0gX29wZW5UYWdzW3NlcV1cbiAgICBpZiAob3QpIHtcbiAgICAgIC8vIElmIGN1cnJlbnQgc2VxdWVuY2UgaGFzIGJlZW4gb3BlbmVkLCBjbG9zZSBpdC5cbiAgICAgIGlmICghIX5hbnNpQ29kZXMuaW5kZXhPZihzZXEpKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXh0cmEtYm9vbGVhbi1jYXN0XG4gICAgICAgIGFuc2lDb2Rlcy5wb3AoKVxuICAgICAgICByZXR1cm4gJzwvc3Bhbj4nXG4gICAgICB9XG4gICAgICAvLyBPcGVuIHRhZy5cbiAgICAgIGFuc2lDb2Rlcy5wdXNoKHNlcSlcbiAgICAgIHJldHVybiBvdFswXSA9PT0gJzwnID8gb3QgOiAnPHNwYW4gc3R5bGU9XCInICsgb3QgKyAnO1wiPidcbiAgICB9XG5cbiAgICB2YXIgY3QgPSBfY2xvc2VUYWdzW3NlcV1cbiAgICBpZiAoY3QpIHtcbiAgICAgIC8vIFBvcCBzZXF1ZW5jZVxuICAgICAgYW5zaUNvZGVzLnBvcCgpXG4gICAgICByZXR1cm4gY3RcbiAgICB9XG4gICAgcmV0dXJuICcnXG4gIH0pXG5cbiAgLy8gTWFrZSBzdXJlIHRhZ3MgYXJlIGNsb3NlZC5cbiAgdmFyIGwgPSBhbnNpQ29kZXMubGVuZ3RoXG4gIDsobCA+IDApICYmIChyZXQgKz0gQXJyYXkobCArIDEpLmpvaW4oJzwvc3Bhbj4nKSlcblxuICByZXR1cm4gcmV0XG59XG5cbi8qKlxuICogQ3VzdG9taXplIGNvbG9ycy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb2xvcnMgcmVmZXJlbmNlIHRvIF9kZWZDb2xvcnNcbiAqL1xuYW5zaUhUTUwuc2V0Q29sb3JzID0gZnVuY3Rpb24gKGNvbG9ycykge1xuICBpZiAodHlwZW9mIGNvbG9ycyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Bjb2xvcnNgIHBhcmFtZXRlciBtdXN0IGJlIGFuIE9iamVjdC4nKVxuICB9XG5cbiAgdmFyIF9maW5hbENvbG9ycyA9IHt9XG4gIGZvciAodmFyIGtleSBpbiBfZGVmQ29sb3JzKSB7XG4gICAgdmFyIGhleCA9IGNvbG9ycy5oYXNPd25Qcm9wZXJ0eShrZXkpID8gY29sb3JzW2tleV0gOiBudWxsXG4gICAgaWYgKCFoZXgpIHtcbiAgICAgIF9maW5hbENvbG9yc1trZXldID0gX2RlZkNvbG9yc1trZXldXG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBpZiAoJ3Jlc2V0JyA9PT0ga2V5KSB7XG4gICAgICBpZiAodHlwZW9mIGhleCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaGV4ID0gW2hleF1cbiAgICAgIH1cbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShoZXgpIHx8IGhleC5sZW5ndGggPT09IDAgfHwgaGV4LnNvbWUoZnVuY3Rpb24gKGgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBoICE9PSAnc3RyaW5nJ1xuICAgICAgfSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdmFsdWUgb2YgYCcgKyBrZXkgKyAnYCBwcm9wZXJ0eSBtdXN0IGJlIGFuIEFycmF5IGFuZCBlYWNoIGl0ZW0gY291bGQgb25seSBiZSBhIGhleCBzdHJpbmcsIGUuZy46IEZGMDAwMCcpXG4gICAgICB9XG4gICAgICB2YXIgZGVmSGV4Q29sb3IgPSBfZGVmQ29sb3JzW2tleV1cbiAgICAgIGlmICghaGV4WzBdKSB7XG4gICAgICAgIGhleFswXSA9IGRlZkhleENvbG9yWzBdXG4gICAgICB9XG4gICAgICBpZiAoaGV4Lmxlbmd0aCA9PT0gMSB8fCAhaGV4WzFdKSB7XG4gICAgICAgIGhleCA9IFtoZXhbMF1dXG4gICAgICAgIGhleC5wdXNoKGRlZkhleENvbG9yWzFdKVxuICAgICAgfVxuXG4gICAgICBoZXggPSBoZXguc2xpY2UoMCwgMilcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBoZXggIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB2YWx1ZSBvZiBgJyArIGtleSArICdgIHByb3BlcnR5IG11c3QgYmUgYSBoZXggc3RyaW5nLCBlLmcuOiBGRjAwMDAnKVxuICAgIH1cbiAgICBfZmluYWxDb2xvcnNba2V5XSA9IGhleFxuICB9XG4gIF9zZXRUYWdzKF9maW5hbENvbG9ycylcbn1cblxuLyoqXG4gKiBSZXNldCBjb2xvcnMuXG4gKi9cbmFuc2lIVE1MLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICBfc2V0VGFncyhfZGVmQ29sb3JzKVxufVxuXG4vKipcbiAqIEV4cG9zZSB0YWdzLCBpbmNsdWRpbmcgb3BlbiBhbmQgY2xvc2UuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5hbnNpSFRNTC50YWdzID0ge31cblxuaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYW5zaUhUTUwudGFncywgJ29wZW4nLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfb3BlblRhZ3MgfVxuICB9KVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYW5zaUhUTUwudGFncywgJ2Nsb3NlJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX2Nsb3NlVGFncyB9XG4gIH0pXG59IGVsc2Uge1xuICBhbnNpSFRNTC50YWdzLm9wZW4gPSBfb3BlblRhZ3NcbiAgYW5zaUhUTUwudGFncy5jbG9zZSA9IF9jbG9zZVRhZ3Ncbn1cblxuZnVuY3Rpb24gX3NldFRhZ3MgKGNvbG9ycykge1xuICAvLyByZXNldCBhbGxcbiAgX29wZW5UYWdzWycwJ10gPSAnZm9udC13ZWlnaHQ6bm9ybWFsO29wYWNpdHk6MTtjb2xvcjojJyArIGNvbG9ycy5yZXNldFswXSArICc7YmFja2dyb3VuZDojJyArIGNvbG9ycy5yZXNldFsxXVxuICAvLyBpbnZlcnNlXG4gIF9vcGVuVGFnc1snNyddID0gJ2NvbG9yOiMnICsgY29sb3JzLnJlc2V0WzFdICsgJztiYWNrZ3JvdW5kOiMnICsgY29sb3JzLnJlc2V0WzBdXG4gIC8vIGRhcmsgZ3JleVxuICBfb3BlblRhZ3NbJzkwJ10gPSAnY29sb3I6IycgKyBjb2xvcnMuZGFya2dyZXlcblxuICBmb3IgKHZhciBjb2RlIGluIF9zdHlsZXMpIHtcbiAgICB2YXIgY29sb3IgPSBfc3R5bGVzW2NvZGVdXG4gICAgdmFyIG9yaUNvbG9yID0gY29sb3JzW2NvbG9yXSB8fCAnMDAwJ1xuICAgIF9vcGVuVGFnc1tjb2RlXSA9ICdjb2xvcjojJyArIG9yaUNvbG9yXG4gICAgY29kZSA9IHBhcnNlSW50KGNvZGUpXG4gICAgX29wZW5UYWdzWyhjb2RlICsgMTApLnRvU3RyaW5nKCldID0gJ2JhY2tncm91bmQ6IycgKyBvcmlDb2xvclxuICB9XG59XG5cbmFuc2lIVE1MLnJlc2V0KClcbiIsImltcG9ydCB7IFJlbmRlcmVyLCBDYW1lcmEsIFRyYW5zZm9ybSwgUGxhbmUsIFZlYzIsIFZlYzMsIFRleHR1cmUsIFRleHR1cmVMb2FkZXIsIFByb2dyYW0sIE1lc2gsIFJheWNhc3QgfSBmcm9tICdvZ2wnXHJcbmltcG9ydCB7IGxlcnAgfSBmcm9tICcuLi91dGlscy9tYXRoJ1xyXG5cclxuaW1wb3J0IHZlcnRleFNoYWRlciBmcm9tICcuLi9zaGFkZXJzL3ZlcnRleC5nbHNsJ1xyXG5pbXBvcnQgZnJhZ21lbnRTaGFkZXIgZnJvbSAnLi4vc2hhZGVycy9mcmFnbWVudC5nbHNsJ1xyXG5cclxuY29uc3QgdmVydGV4ID0gdmVydGV4U2hhZGVyXHJcbmNvbnN0IGZyYWdtZW50ID0gZnJhZ21lbnRTaGFkZXJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hc2sge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5iaW5kKClcclxuXHJcblx0XHR0aGlzLmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYmdsX193cmFwcGVyJylcclxuXHJcblx0XHR0aGlzLmJvdW5kcyA9IHRoaXMuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuXHRcdHRoaXMucGxhbmVCQ1IgPSB7IFxyXG4gICAgICAgICAgICB3aWR0aDogMSwgXHJcbiAgICAgICAgICAgIGhlaWdodDogMSwgXHJcbiAgICAgICAgICAgIHg6IDAsIFxyXG4gICAgICAgICAgICB5OiAwIFxyXG4gICAgICAgIH1cclxuXHJcblx0XHR0aGlzLmlzTG9hZGVkID0gZmFsc2VcclxuXHJcblx0XHR0aGlzLm1hc2tQb3NpdGlvbiA9IG5ldyBWZWMyKClcclxuXHRcdHRoaXMubW91c2UgPSBuZXcgVmVjMigtMC41LCAtMC41KVxyXG5cclxuXHRcdHRoaXMubm93ID0gMFxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IHtcclxuXHRcdFx0c3BlZWQ6IDBcclxuXHRcdH1cclxuXHJcbiAgICAgICAgdGhpcy53cmFwcGVyID0gbnVsbFxyXG4gICAgICAgIHRoaXMubWVkaWEgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWdsLWltYWdlPVwibWVkaWFcIl0nKVxyXG5cclxuXHRcdHRoaXMuckFGID0gdW5kZWZpbmVkXHJcblxyXG5cdFx0dGhpcy5pbml0KClcclxuXHR9XHJcblxyXG5cdGJpbmQoKSB7XHJcblx0XHRbXCJtb3VzZW1vdmVcIiwgXCJyZXNpemVcIiwgXCJ1cGRhdGVcIl1cclxuXHRcdC5mb3JFYWNoKChmbikgPT4gKHRoaXNbZm5dID0gdGhpc1tmbl0uYmluZCh0aGlzKSkpXHJcblx0fVxyXG5cclxuXHRpbml0UmVuZGVyZXIoKSB7XHJcblx0XHRjb25zdCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2ViZ2wnKVxyXG5cdFx0Ly8gVGhpcyBmb3IgdHJhbnNwYXJlbnQgcmVuZHJlclxyXG5cdFx0dGhpcy5yZW5kZXJlciA9IG5ldyBSZW5kZXJlcih7IGNhbnZhczogY2FudmFzLCBkcHI6IDEsIGFudGlhbGlhczogITAsIHByZW11bHRpcGx5QWxwaGE6ICExLCBhbHBoYTogITAgIH0pXHJcblx0XHR0aGlzLnJlbmRlcmVyLnNldFNpemUodGhpcy5ib3VuZHMud2lkdGgsIHRoaXMuYm91bmRzLmhlaWdodClcclxuXHRcdFxyXG5cdFx0dGhpcy5nbCA9IHRoaXMucmVuZGVyZXIuZ2xcclxuXHRcdC8vIGZvciBjbGVhciBjb2xvciwgZGl2aWRlIHJnYiB2YWx1ZSBieSAyNTVcclxuXHRcdHRoaXMuZ2wuY2xlYXJDb2xvcigyNDcgLyAyNTUsIDI0NSAvIDI1NSwgMjQ4IC8gMjU1LCAxKVxyXG5cdFx0Ly8gdGhpcy5nbC5jbGVhckNvbG9yKDEsIDEsIDEsIDEpXHJcblx0fVxyXG5cdFxyXG5cdGluaXRTY2VuZSgpIHtcclxuXHRcdHRoaXMuc2NlbmUgPSBuZXcgVHJhbnNmb3JtKClcclxuXHR9XHJcblxyXG5cdGluaXRDYW1lcmEoKSB7XHJcblx0XHR0aGlzLmZvdiA9IDQ1XHJcblx0XHR0aGlzLmNhbWVyYSA9IG5ldyBDYW1lcmEodGhpcy5nbCwgeyBmb3Y6IHRoaXMuZm92IH0pXHJcblx0XHR0aGlzLmNhbWVyYS5wZXJzcGVjdGl2ZSh7XHJcblx0XHRcdC8vIGFzcGVjdDogdGhpcy5nbC5jYW52YXMud2lkdGggLyB0aGlzLmdsLmNhbnZhcy5oZWlnaHRcclxuXHRcdFx0YXNwZWN0OiB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodFxyXG5cdFx0fSlcclxuXHRcdHRoaXMuY2FtZXJhLnBvc2l0aW9uLnNldCgwLCAwLCAxKVxyXG5cdH1cclxuXHJcblx0aW5pdFNoYXBlKCkge1xyXG5cdFx0dGhpcy5nZW9tZXRyeSA9IG5ldyBQbGFuZSh0aGlzLmdsLCB7IHdpZHRoOiAxLCBoZWlnaHQ6IDEsIHdpZHRoU2VnbWVudHM6IDEwLCBoZWlnaHRTZWdtZW50czogMTAgfSlcclxuXHRcdC8vIGNvbnN0IHNjYWxpbmcgPSBuZXcgVmVjMygxMCwgKDkgLyAxNikgKiAxMCwgMSlcclxuXHJcblx0XHR0aGlzLnRleHR1cmUgPSBuZXcgVGV4dHVyZSh0aGlzLmdsLCB7IFxyXG5cdFx0XHRtaW5GaWx0ZXI6IHRoaXMuZ2wuTElORUFSLFxyXG5cdFx0XHRnZW5lcmF0ZU1pcG1hcHM6IGZhbHNlLFxyXG5cdFx0XHR3aWR0aDogMTkyMCxcclxuXHRcdFx0aGVpZ2h0OiAxMDgwIFxyXG5cdFx0fSlcclxuXHJcblx0XHQvLyB1cGRhdGUgaW1hZ2UgdmFsdWUgd2l0aCBzb3VyY2Ugb25jZSBsb2FkZWRcclxuXHRcdGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpXHJcblx0XHRpbWcuc3JjID0gXCJyZWVsLm1wNFwiXHJcblx0XHRpbWcub25sb2FkID0gKCkgPT4ge1xyXG5cdFx0XHR0aGlzLnRleHR1cmUuaW1hZ2UgPSBpbWdcclxuXHRcdCAgXHJcblx0XHRcdGlmKHRoaXMubWVkaWEgaW5zdGFuY2VvZiBIVE1MVmlkZW9FbGVtZW50KSB7XHJcblx0XHRcdFx0dGhpcy5tZWRpYS5sb2FkKClcclxuXHRcdFx0XHR0aGlzLm1lZGlhLnBsYXkoKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gdGhpcy50ZXh0dXJlID0gVGV4dHVyZUxvYWRlci5sb2FkKHRoaXMuZ2wsIHsgc3JjOiBcIjEuanBnXCIgfSlcclxuXHJcblx0XHR0aGlzLnByb2dyYW0gPSBuZXcgUHJvZ3JhbSh0aGlzLmdsLCB7XHJcblx0XHRcdHZlcnRleCxcclxuXHRcdFx0ZnJhZ21lbnQsXHJcblx0XHRcdHVuaWZvcm1zOiB7XHJcblx0XHRcdFx0dU1hc2tQb3NpdGlvbjogeyB2YWx1ZTogbmV3IFZlYzIoMSwgMCkgfSxcclxuXHRcdFx0XHR1SGl0OiB7IHZhbHVlOiAwIH0sXHJcblx0XHRcdFx0dVRleHR1cmU6IHsgdmFsdWU6IHRoaXMudGV4dHVyZSB9LFxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cclxuXHRcdHRoaXMubWVzaCA9IG5ldyBNZXNoKHRoaXMuZ2wsIHsgZ2VvbWV0cnk6IHRoaXMuZ2VvbWV0cnksIHByb2dyYW06IHRoaXMucHJvZ3JhbSB9KVxyXG5cdFx0XHJcblx0XHR0aGlzLnVwZGF0ZVNpemUoKVxyXG5cdFx0dGhpcy5pc0xvYWRlZCA9IHRydWVcclxuXHRcdHRoaXMubWVzaC5zZXRQYXJlbnQodGhpcy5zY2VuZSlcclxuXHJcblx0XHQvLyBSYXljYXN0ZXJcclxuXHRcdGNvbnN0IHVwZGF0ZUhpdFVuaWZvcm0gPSAoeyBtZXNoIH0pID0+IHtcclxuXHRcdFx0dGhpcy5wcm9ncmFtLnVuaWZvcm1zLnVIaXQudmFsdWUgPSBtZXNoLmlzSGl0ID8gMSA6IDA7XHJcblx0XHR9XHJcblx0XHR0aGlzLm1lc2gub25CZWZvcmVSZW5kZXIodXBkYXRlSGl0VW5pZm9ybSlcclxuXHJcblx0XHR0aGlzLnJheWNhc3QgPSBuZXcgUmF5Y2FzdCh0aGlzLmdsKVxyXG5cclxuXHR9XHJcblxyXG5cdGNhbGN1bGF0ZVVuaXRTaXplKHopIHtcclxuICAgICAgICBjb25zdCBmb3ZJblJhZGlhbiA9ICh0aGlzLmZvdiAqIE1hdGguUEkpIC8gMTgwXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gYmFzaWMgdHJpZ29ub21ldHJ5XHJcbiAgICAgICAgLy8gdGhpcyBnaXZlcyB0aGUgd2lkdGggb2YgcGxhbmUgdGhhdCB3b3VsZCBjb3ZlciB0aGUgd2hvbGUgc2NyZWVuIGJhc2VkIG9uIHogcG9zaXRpb25cclxuICAgICAgICBjb25zdCBpID0gMiAqIE1hdGgudGFuKGZvdkluUmFkaWFuIC8gMikgKiB6XHJcblxyXG4gICAgICAgIHJldHVybiB7IHdpZHRoOiBpICogdGhpcy5jYW1lcmEuYXNwZWN0LCBoZWlnaHQ6IGkgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVNpemUoKSB7XHJcblx0XHR0aGlzLmdhcCA9IDBcclxuICAgICAgICB0aGlzLmNhbVVuaXQgPSB0aGlzLmNhbGN1bGF0ZVVuaXRTaXplKHRoaXMuY2FtZXJhLnBvc2l0aW9uLnopXHJcbiAgICAgICAgdGhpcy5wbGFuZUJDUi53aWR0aCA9IHRoaXMuY2FtVW5pdC53aWR0aCAtIHRoaXMuY2FtVW5pdC53aWR0aCAqIHRoaXMuZ2FwIC8gMTAwXHJcbiAgICAgICAgdGhpcy5wbGFuZUJDUi5oZWlnaHQgPSB0aGlzLnBsYW5lQkNSLndpZHRoIC8gdGhpcy5jYW1lcmEuYXNwZWN0XHJcblxyXG4gICAgICAgIHRoaXMuZ2VvbWV0cnkgPSBuZXcgUGxhbmUodGhpcy5nbCwgeyB3aWR0aDogdGhpcy5wbGFuZUJDUi53aWR0aCwgaGVpZ2h0OiB0aGlzLnBsYW5lQkNSLmhlaWdodCwgd2lkdGhTZWdtZW50czogMTAwLCBoZWlnaHRTZWdtZW50czogMTAwIH0pXHJcbiAgICAgICAgdGhpcy5tZXNoLmdlb21ldHJ5ID0gdGhpcy5nZW9tZXRyeVxyXG5cclxuICAgICAgICB0aGlzLmdsLmNhbnZhcy5zdHlsZS53aWR0aCA9IGAke3RoaXMuYm91bmRzLndpZHRofXB4YFxyXG4gICAgICAgIHRoaXMuZ2wuY2FudmFzLnN0eWxlLmhlaWdodCA9IGAke3RoaXMuYm91bmRzLmhlaWdodH1weGBcclxuICAgIH1cclxuXHJcblx0bW91c2Vtb3ZlKGUpIHtcclxuXHRcdHRoaXMubW91c2Uuc2V0KDIuMCAqIChlLnggLyB0aGlzLnJlbmRlcmVyLndpZHRoKSAtIDEuMCwgMi4wICogKDEuMCAtIGUueSAvIHRoaXMucmVuZGVyZXIuaGVpZ2h0KSAtIDEuMClcclxuXHJcblx0XHR0aGlzLnJheWNhc3QuY2FzdE1vdXNlKHRoaXMuY2FtZXJhLCB0aGlzLm1vdXNlKVxyXG5cdFx0Y29uc3QgaGl0cyA9IHRoaXMucmF5Y2FzdC5pbnRlcnNlY3RNZXNoZXModGhpcy5tZXNoLCB7XHJcblx0XHRcdGluY2x1ZGVVVjogdHJ1ZVxyXG5cdFx0fSlcclxuXHJcblx0XHRpZihoaXRzLmxlbmd0aCkge1xyXG5cdFx0XHR0aGlzLm1hc2tQb3NpdGlvbi54ID0gaGl0c1swXS5oaXQudXYueFxyXG5cdFx0XHR0aGlzLm1hc2tQb3NpdGlvbi55ID0gaGl0c1swXS5oaXQudXYueVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dXBkYXRlKHQpIHtcclxuXHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZSlcclxuXHJcbiAgICAgICAgdGhpcy5wcm9ncmFtLnVuaWZvcm1zLnVNYXNrUG9zaXRpb24udmFsdWUueCA9IGxlcnAodGhpcy5wcm9ncmFtLnVuaWZvcm1zLnVNYXNrUG9zaXRpb24udmFsdWUueCwgdGhpcy5tYXNrUG9zaXRpb24ueCwgMC4wODUpXHJcbiAgICAgICAgdGhpcy5wcm9ncmFtLnVuaWZvcm1zLnVNYXNrUG9zaXRpb24udmFsdWUueSA9IGxlcnAodGhpcy5wcm9ncmFtLnVuaWZvcm1zLnVNYXNrUG9zaXRpb24udmFsdWUueSwgdGhpcy5tYXNrUG9zaXRpb24ueSwgMC4wODUpXHJcblxyXG5cdFx0aWYodGhpcy5tZWRpYSBpbnN0YW5jZW9mIEhUTUxWaWRlb0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWVkaWEucmVhZHlTdGF0ZSA+PSB0aGlzLm1lZGlhLkhBVkVfRU5PVUdIX0RBVEEpIHtcclxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLnRleHR1cmUuaW1hZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuaW1hZ2UgPSB0aGlzLm1lZGlhXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubWVkaWEgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLnRleHR1cmUuaW1hZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5pbWFnZSA9IHRoaXMubWVkaWFcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5uZWVkc1VwZGF0ZSA9IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblx0XHR0aGlzLnJlbmRlcmVyLnJlbmRlcih7IHNjZW5lOiB0aGlzLnNjZW5lLCBjYW1lcmE6IHRoaXMuY2FtZXJhIH0pXHJcblx0XHR0aGlzLm5vdyA9IHRcclxuXHR9XHJcblxyXG5cdHJlc2l6ZSgpIHtcclxuXHRcdHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KVxyXG5cdFx0dGhpcy5jYW1lcmEucGVyc3BlY3RpdmUoe1xyXG5cdFx0XHRhc3BlY3Q6IHRoaXMuZ2wuY2FudmFzLndpZHRoIC8gdGhpcy5nbC5jYW52YXMuaGVpZ2h0XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKCkge1xyXG5cdFx0dGhpcy5yQUYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUpXHJcblx0fVxyXG5cclxuXHRjYW5jZWxBbmltYXRpb25GcmFtZSgpIHtcclxuXHRcdGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuckFGKVxyXG5cdH1cclxuXHJcblx0YWRkRXZlbnRsaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLnVwZGF0ZSgpXHJcblxyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW91c2Vtb3ZlLCBmYWxzZSlcclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZSwgZmFsc2UpXHJcblx0fVxyXG5cclxuXHRyZW1vdmVFdmVudGxpc3RlbmVycygpIHtcclxuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlbW92ZSwgZmFsc2UpXHJcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemUsIGZhbHNlKVxyXG5cdH1cclxuXHJcblx0ZGVzdHJveSgpIHtcclxuXHRcdHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKVxyXG5cdH1cclxuXHJcblx0aW5pdCgpIHtcclxuXHRcdHRoaXMuaW5pdFJlbmRlcmVyKClcclxuXHRcdHRoaXMuaW5pdFNjZW5lKClcclxuXHRcdHRoaXMuaW5pdENhbWVyYSgpXHJcblx0XHR0aGlzLmluaXRTaGFwZSgpXHJcblx0XHR0aGlzLmFkZEV2ZW50bGlzdGVuZXJzKClcclxuXHRcdHRoaXMucmVzaXplKClcclxuXHR9XHJcbn0iLCJleHBvcnQgZnVuY3Rpb24gbGVycCAoc3RhcnQsIGVuZCwgYW10KSB7XHJcbiAgICByZXR1cm4gc3RhcnQgKyAoZW5kIC0gc3RhcnQpICogYW10XHJcbiAgICAvLyByZXR1cm4gc3RhcnQgKiAoMSAtIGFtdCkgKyBlbmQgKiBhbXRcclxuICB9XHJcblxyXG5OdW1iZXIucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uKGluX21pbiwgaW5fbWF4LCBvdXRfbWluLCBvdXRfbWF4KSB7XHJcbiAgcmV0dXJuICgodGhpcyAtIGluX21pbikgKiAob3V0X21heCAtIG91dF9taW4pKSAvIChpbl9tYXggLSBpbl9taW4pICsgb3V0X21pblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0ICh0KSB7XHJcbiAgcmV0dXJuIHQgPCAwLjUgPyA0ICogdCAqIHQgKiB0IDogKHQgLSAxKSAqICgyICogdCAtIDIpICogKDIgKiB0IC0gMikgKyAxO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW50ZXJwb2xhdGUgKHN0YXJ0LCBlbmQsIHZhbHVlKSB7XHJcbiAgcmV0dXJuIChzdGFydCAqICgxLjAgLSB2YWx1ZSkpICsgKGVuZCAqIHZhbHVlKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2xhbXAgKG1pbiwgbWF4LCBudW1iZXIpIHtcclxuICByZXR1cm4gTWF0aC5tYXgobWluLCBNYXRoLm1pbihudW1iZXIsIG1heCkpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByYW5kb20gKG1pbiwgbWF4KSB7XHJcbiAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pblxyXG59IiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbm1vZHVsZS5leHBvcnRzLm9uY2UgPSBvbmNlO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuZnVuY3Rpb24gY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gX2dldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gX2dldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9IF9nZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5jYWxsKHRoaXMudGFyZ2V0KTtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5hcHBseSh0aGlzLnRhcmdldCwgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBFbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWYgYW5kIG9ubHkgaWYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gb25jZShlbWl0dGVyLCBuYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZnVuY3Rpb24gZXJyb3JMaXN0ZW5lcihlcnIpIHtcbiAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIobmFtZSwgcmVzb2x2ZXIpO1xuICAgICAgcmVqZWN0KGVycik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzb2x2ZXIoKSB7XG4gICAgICBpZiAodHlwZW9mIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBlcnJvckxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICB9O1xuXG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIHJlc29sdmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgaWYgKG5hbWUgIT09ICdlcnJvcicpIHtcbiAgICAgIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGVycm9yTGlzdGVuZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBoYW5kbGVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgJ2Vycm9yJywgaGFuZGxlciwgZmxhZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCBsaXN0ZW5lciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgIGVtaXR0ZXIub25jZShuYW1lLCBsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVtaXR0ZXIub24obmFtZSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gRXZlbnRUYXJnZXQgZG9lcyBub3QgaGF2ZSBgZXJyb3JgIGV2ZW50IHNlbWFudGljcyBsaWtlIE5vZGVcbiAgICAvLyBFdmVudEVtaXR0ZXJzLCB3ZSBkbyBub3QgbGlzdGVuIGZvciBgZXJyb3JgIGV2ZW50cyBoZXJlLlxuICAgIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBmdW5jdGlvbiB3cmFwTGlzdGVuZXIoYXJnKSB7XG4gICAgICAvLyBJRSBkb2VzIG5vdCBoYXZlIGJ1aWx0aW4gYHsgb25jZTogdHJ1ZSB9YCBzdXBwb3J0IHNvIHdlXG4gICAgICAvLyBoYXZlIHRvIGRvIGl0IG1hbnVhbGx5LlxuICAgICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIHdyYXBMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICBsaXN0ZW5lcihhcmcpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImVtaXR0ZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRXZlbnRFbWl0dGVyLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgZW1pdHRlcik7XG4gIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBuYW1lZF9yZWZlcmVuY2VzXzEgPSByZXF1aXJlKFwiLi9uYW1lZC1yZWZlcmVuY2VzXCIpO1xudmFyIG51bWVyaWNfdW5pY29kZV9tYXBfMSA9IHJlcXVpcmUoXCIuL251bWVyaWMtdW5pY29kZS1tYXBcIik7XG52YXIgc3Vycm9nYXRlX3BhaXJzXzEgPSByZXF1aXJlKFwiLi9zdXJyb2dhdGUtcGFpcnNcIik7XG52YXIgYWxsTmFtZWRSZWZlcmVuY2VzID0gX19hc3NpZ24oX19hc3NpZ24oe30sIG5hbWVkX3JlZmVyZW5jZXNfMS5uYW1lZFJlZmVyZW5jZXMpLCB7IGFsbDogbmFtZWRfcmVmZXJlbmNlc18xLm5hbWVkUmVmZXJlbmNlcy5odG1sNSB9KTtcbnZhciBlbmNvZGVSZWdFeHBzID0ge1xuICAgIHNwZWNpYWxDaGFyczogL1s8PidcIiZdL2csXG4gICAgbm9uQXNjaWk6IC8oPzpbPD4nXCImXFx1MDA4MC1cXHVEN0ZGXFx1RTAwMC1cXHVGRkZGXXxbXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdfFtcXHVEODAwLVxcdURCRkZdKD8hW1xcdURDMDAtXFx1REZGRl0pfCg/OlteXFx1RDgwMC1cXHVEQkZGXXxeKVtcXHVEQzAwLVxcdURGRkZdKS9nLFxuICAgIG5vbkFzY2lpUHJpbnRhYmxlOiAvKD86Wzw+J1wiJlxceDAxLVxceDA4XFx4MTEtXFx4MTVcXHgxNy1cXHgxRlxceDdmLVxcdUQ3RkZcXHVFMDAwLVxcdUZGRkZdfFtcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl18W1xcdUQ4MDAtXFx1REJGRl0oPyFbXFx1REMwMC1cXHVERkZGXSl8KD86W15cXHVEODAwLVxcdURCRkZdfF4pW1xcdURDMDAtXFx1REZGRl0pL2csXG4gICAgZXh0ZW5zaXZlOiAvKD86W1xceDAxLVxceDBjXFx4MGUtXFx4MWZcXHgyMS1cXHgyY1xceDJlLVxceDJmXFx4M2EtXFx4NDBcXHg1Yi1cXHg2MFxceDdiLVxceDdkXFx4N2YtXFx1RDdGRlxcdUUwMDAtXFx1RkZGRl18W1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXXxbXFx1RDgwMC1cXHVEQkZGXSg/IVtcXHVEQzAwLVxcdURGRkZdKXwoPzpbXlxcdUQ4MDAtXFx1REJGRl18XilbXFx1REMwMC1cXHVERkZGXSkvZ1xufTtcbnZhciBkZWZhdWx0RW5jb2RlT3B0aW9ucyA9IHtcbiAgICBtb2RlOiAnc3BlY2lhbENoYXJzJyxcbiAgICBsZXZlbDogJ2FsbCcsXG4gICAgbnVtZXJpYzogJ2RlY2ltYWwnXG59O1xuLyoqIEVuY29kZXMgYWxsIHRoZSBuZWNlc3NhcnkgKHNwZWNpZmllZCBieSBgbGV2ZWxgKSBjaGFyYWN0ZXJzIGluIHRoZSB0ZXh0ICovXG5mdW5jdGlvbiBlbmNvZGUodGV4dCwgX2EpIHtcbiAgICB2YXIgX2IgPSBfYSA9PT0gdm9pZCAwID8gZGVmYXVsdEVuY29kZU9wdGlvbnMgOiBfYSwgX2MgPSBfYi5tb2RlLCBtb2RlID0gX2MgPT09IHZvaWQgMCA/ICdzcGVjaWFsQ2hhcnMnIDogX2MsIF9kID0gX2IubnVtZXJpYywgbnVtZXJpYyA9IF9kID09PSB2b2lkIDAgPyAnZGVjaW1hbCcgOiBfZCwgX2UgPSBfYi5sZXZlbCwgbGV2ZWwgPSBfZSA9PT0gdm9pZCAwID8gJ2FsbCcgOiBfZTtcbiAgICBpZiAoIXRleHQpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICB2YXIgZW5jb2RlUmVnRXhwID0gZW5jb2RlUmVnRXhwc1ttb2RlXTtcbiAgICB2YXIgcmVmZXJlbmNlcyA9IGFsbE5hbWVkUmVmZXJlbmNlc1tsZXZlbF0uY2hhcmFjdGVycztcbiAgICB2YXIgaXNIZXggPSBudW1lcmljID09PSAnaGV4YWRlY2ltYWwnO1xuICAgIGVuY29kZVJlZ0V4cC5sYXN0SW5kZXggPSAwO1xuICAgIHZhciBfYiA9IGVuY29kZVJlZ0V4cC5leGVjKHRleHQpO1xuICAgIHZhciBfYztcbiAgICBpZiAoX2IpIHtcbiAgICAgICAgX2MgPSAnJztcbiAgICAgICAgdmFyIF9kID0gMDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKF9kICE9PSBfYi5pbmRleCkge1xuICAgICAgICAgICAgICAgIF9jICs9IHRleHQuc3Vic3RyaW5nKF9kLCBfYi5pbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgX2UgPSBfYlswXTtcbiAgICAgICAgICAgIHZhciByZXN1bHRfMSA9IHJlZmVyZW5jZXNbX2VdO1xuICAgICAgICAgICAgaWYgKCFyZXN1bHRfMSkge1xuICAgICAgICAgICAgICAgIHZhciBjb2RlXzEgPSBfZS5sZW5ndGggPiAxID8gc3Vycm9nYXRlX3BhaXJzXzEuZ2V0Q29kZVBvaW50KF9lLCAwKSA6IF9lLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0XzEgPSAoaXNIZXggPyAnJiN4JyArIGNvZGVfMS50b1N0cmluZygxNikgOiAnJiMnICsgY29kZV8xKSArICc7JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9jICs9IHJlc3VsdF8xO1xuICAgICAgICAgICAgX2QgPSBfYi5pbmRleCArIF9lLmxlbmd0aDtcbiAgICAgICAgfSB3aGlsZSAoKF9iID0gZW5jb2RlUmVnRXhwLmV4ZWModGV4dCkpKTtcbiAgICAgICAgaWYgKF9kICE9PSB0ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgX2MgKz0gdGV4dC5zdWJzdHJpbmcoX2QpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBfYyA9XG4gICAgICAgICAgICB0ZXh0O1xuICAgIH1cbiAgICByZXR1cm4gX2M7XG59XG5leHBvcnRzLmVuY29kZSA9IGVuY29kZTtcbnZhciBkZWZhdWx0RGVjb2RlT3B0aW9ucyA9IHtcbiAgICBzY29wZTogJ2JvZHknLFxuICAgIGxldmVsOiAnYWxsJ1xufTtcbnZhciBzdHJpY3QgPSAvJig/OiNcXGQrfCNbeFhdW1xcZGEtZkEtRl0rfFswLTlhLXpBLVpdKyk7L2c7XG52YXIgYXR0cmlidXRlID0gLyYoPzojXFxkK3wjW3hYXVtcXGRhLWZBLUZdK3xbMC05YS16QS1aXSspWzs9XT8vZztcbnZhciBiYXNlRGVjb2RlUmVnRXhwcyA9IHtcbiAgICB4bWw6IHtcbiAgICAgICAgc3RyaWN0OiBzdHJpY3QsXG4gICAgICAgIGF0dHJpYnV0ZTogYXR0cmlidXRlLFxuICAgICAgICBib2R5OiBuYW1lZF9yZWZlcmVuY2VzXzEuYm9keVJlZ0V4cHMueG1sXG4gICAgfSxcbiAgICBodG1sNDoge1xuICAgICAgICBzdHJpY3Q6IHN0cmljdCxcbiAgICAgICAgYXR0cmlidXRlOiBhdHRyaWJ1dGUsXG4gICAgICAgIGJvZHk6IG5hbWVkX3JlZmVyZW5jZXNfMS5ib2R5UmVnRXhwcy5odG1sNFxuICAgIH0sXG4gICAgaHRtbDU6IHtcbiAgICAgICAgc3RyaWN0OiBzdHJpY3QsXG4gICAgICAgIGF0dHJpYnV0ZTogYXR0cmlidXRlLFxuICAgICAgICBib2R5OiBuYW1lZF9yZWZlcmVuY2VzXzEuYm9keVJlZ0V4cHMuaHRtbDVcbiAgICB9XG59O1xudmFyIGRlY29kZVJlZ0V4cHMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgYmFzZURlY29kZVJlZ0V4cHMpLCB7IGFsbDogYmFzZURlY29kZVJlZ0V4cHMuaHRtbDUgfSk7XG52YXIgZnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZTtcbnZhciBvdXRPZkJvdW5kc0NoYXIgPSBmcm9tQ2hhckNvZGUoNjU1MzMpO1xudmFyIGRlZmF1bHREZWNvZGVFbnRpdHlPcHRpb25zID0ge1xuICAgIGxldmVsOiAnYWxsJ1xufTtcbi8qKiBEZWNvZGVzIGEgc2luZ2xlIGVudGl0eSAqL1xuZnVuY3Rpb24gZGVjb2RlRW50aXR5KGVudGl0eSwgX2EpIHtcbiAgICB2YXIgX2IgPSAoX2EgPT09IHZvaWQgMCA/IGRlZmF1bHREZWNvZGVFbnRpdHlPcHRpb25zIDogX2EpLmxldmVsLCBsZXZlbCA9IF9iID09PSB2b2lkIDAgPyAnYWxsJyA6IF9iO1xuICAgIGlmICghZW50aXR5KSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIF9iID0gZW50aXR5O1xuICAgIHZhciBkZWNvZGVFbnRpdHlMYXN0Q2hhcl8xID0gZW50aXR5W2VudGl0eS5sZW5ndGggLSAxXTtcbiAgICBpZiAoZmFsc2VcbiAgICAgICAgJiYgZGVjb2RlRW50aXR5TGFzdENoYXJfMSA9PT0gJz0nKSB7XG4gICAgICAgIF9iID1cbiAgICAgICAgICAgIGVudGl0eTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZmFsc2VcbiAgICAgICAgJiYgZGVjb2RlRW50aXR5TGFzdENoYXJfMSAhPT0gJzsnKSB7XG4gICAgICAgIF9iID1cbiAgICAgICAgICAgIGVudGl0eTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBkZWNvZGVSZXN1bHRCeVJlZmVyZW5jZV8xID0gYWxsTmFtZWRSZWZlcmVuY2VzW2xldmVsXS5lbnRpdGllc1tlbnRpdHldO1xuICAgICAgICBpZiAoZGVjb2RlUmVzdWx0QnlSZWZlcmVuY2VfMSkge1xuICAgICAgICAgICAgX2IgPSBkZWNvZGVSZXN1bHRCeVJlZmVyZW5jZV8xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGVudGl0eVswXSA9PT0gJyYnICYmIGVudGl0eVsxXSA9PT0gJyMnKSB7XG4gICAgICAgICAgICB2YXIgZGVjb2RlU2Vjb25kQ2hhcl8xID0gZW50aXR5WzJdO1xuICAgICAgICAgICAgdmFyIGRlY29kZUNvZGVfMSA9IGRlY29kZVNlY29uZENoYXJfMSA9PSAneCcgfHwgZGVjb2RlU2Vjb25kQ2hhcl8xID09ICdYJ1xuICAgICAgICAgICAgICAgID8gcGFyc2VJbnQoZW50aXR5LnN1YnN0cigzKSwgMTYpXG4gICAgICAgICAgICAgICAgOiBwYXJzZUludChlbnRpdHkuc3Vic3RyKDIpKTtcbiAgICAgICAgICAgIF9iID1cbiAgICAgICAgICAgICAgICBkZWNvZGVDb2RlXzEgPj0gMHgxMGZmZmZcbiAgICAgICAgICAgICAgICAgICAgPyBvdXRPZkJvdW5kc0NoYXJcbiAgICAgICAgICAgICAgICAgICAgOiBkZWNvZGVDb2RlXzEgPiA2NTUzNVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBzdXJyb2dhdGVfcGFpcnNfMS5mcm9tQ29kZVBvaW50KGRlY29kZUNvZGVfMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZnJvbUNoYXJDb2RlKG51bWVyaWNfdW5pY29kZV9tYXBfMS5udW1lcmljVW5pY29kZU1hcFtkZWNvZGVDb2RlXzFdIHx8IGRlY29kZUNvZGVfMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIF9iO1xufVxuZXhwb3J0cy5kZWNvZGVFbnRpdHkgPSBkZWNvZGVFbnRpdHk7XG4vKiogRGVjb2RlcyBhbGwgZW50aXRpZXMgaW4gdGhlIHRleHQgKi9cbmZ1bmN0aW9uIGRlY29kZSh0ZXh0LCBfYSkge1xuICAgIHZhciBkZWNvZGVTZWNvbmRDaGFyXzEgPSBfYSA9PT0gdm9pZCAwID8gZGVmYXVsdERlY29kZU9wdGlvbnMgOiBfYSwgZGVjb2RlQ29kZV8xID0gZGVjb2RlU2Vjb25kQ2hhcl8xLmxldmVsLCBsZXZlbCA9IGRlY29kZUNvZGVfMSA9PT0gdm9pZCAwID8gJ2FsbCcgOiBkZWNvZGVDb2RlXzEsIF9iID0gZGVjb2RlU2Vjb25kQ2hhcl8xLnNjb3BlLCBzY29wZSA9IF9iID09PSB2b2lkIDAgPyBsZXZlbCA9PT0gJ3htbCcgPyAnc3RyaWN0JyA6ICdib2R5JyA6IF9iO1xuICAgIGlmICghdGV4dCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHZhciBkZWNvZGVSZWdFeHAgPSBkZWNvZGVSZWdFeHBzW2xldmVsXVtzY29wZV07XG4gICAgdmFyIHJlZmVyZW5jZXMgPSBhbGxOYW1lZFJlZmVyZW5jZXNbbGV2ZWxdLmVudGl0aWVzO1xuICAgIHZhciBpc0F0dHJpYnV0ZSA9IHNjb3BlID09PSAnYXR0cmlidXRlJztcbiAgICB2YXIgaXNTdHJpY3QgPSBzY29wZSA9PT0gJ3N0cmljdCc7XG4gICAgZGVjb2RlUmVnRXhwLmxhc3RJbmRleCA9IDA7XG4gICAgdmFyIHJlcGxhY2VNYXRjaF8xID0gZGVjb2RlUmVnRXhwLmV4ZWModGV4dCk7XG4gICAgdmFyIHJlcGxhY2VSZXN1bHRfMTtcbiAgICBpZiAocmVwbGFjZU1hdGNoXzEpIHtcbiAgICAgICAgcmVwbGFjZVJlc3VsdF8xID0gJyc7XG4gICAgICAgIHZhciByZXBsYWNlTGFzdEluZGV4XzEgPSAwO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAocmVwbGFjZUxhc3RJbmRleF8xICE9PSByZXBsYWNlTWF0Y2hfMS5pbmRleCkge1xuICAgICAgICAgICAgICAgIHJlcGxhY2VSZXN1bHRfMSArPSB0ZXh0LnN1YnN0cmluZyhyZXBsYWNlTGFzdEluZGV4XzEsIHJlcGxhY2VNYXRjaF8xLmluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZXBsYWNlSW5wdXRfMSA9IHJlcGxhY2VNYXRjaF8xWzBdO1xuICAgICAgICAgICAgdmFyIGRlY29kZVJlc3VsdF8xID0gcmVwbGFjZUlucHV0XzE7XG4gICAgICAgICAgICB2YXIgZGVjb2RlRW50aXR5TGFzdENoYXJfMiA9IHJlcGxhY2VJbnB1dF8xW3JlcGxhY2VJbnB1dF8xLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYgKGlzQXR0cmlidXRlXG4gICAgICAgICAgICAgICAgJiYgZGVjb2RlRW50aXR5TGFzdENoYXJfMiA9PT0gJz0nKSB7XG4gICAgICAgICAgICAgICAgZGVjb2RlUmVzdWx0XzEgPSByZXBsYWNlSW5wdXRfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzU3RyaWN0XG4gICAgICAgICAgICAgICAgJiYgZGVjb2RlRW50aXR5TGFzdENoYXJfMiAhPT0gJzsnKSB7XG4gICAgICAgICAgICAgICAgZGVjb2RlUmVzdWx0XzEgPSByZXBsYWNlSW5wdXRfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBkZWNvZGVSZXN1bHRCeVJlZmVyZW5jZV8yID0gcmVmZXJlbmNlc1tyZXBsYWNlSW5wdXRfMV07XG4gICAgICAgICAgICAgICAgaWYgKGRlY29kZVJlc3VsdEJ5UmVmZXJlbmNlXzIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVjb2RlUmVzdWx0XzEgPSBkZWNvZGVSZXN1bHRCeVJlZmVyZW5jZV8yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXBsYWNlSW5wdXRfMVswXSA9PT0gJyYnICYmIHJlcGxhY2VJbnB1dF8xWzFdID09PSAnIycpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlY29kZVNlY29uZENoYXJfMiA9IHJlcGxhY2VJbnB1dF8xWzJdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGVjb2RlQ29kZV8yID0gZGVjb2RlU2Vjb25kQ2hhcl8yID09ICd4JyB8fCBkZWNvZGVTZWNvbmRDaGFyXzIgPT0gJ1gnXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHBhcnNlSW50KHJlcGxhY2VJbnB1dF8xLnN1YnN0cigzKSwgMTYpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHBhcnNlSW50KHJlcGxhY2VJbnB1dF8xLnN1YnN0cigyKSk7XG4gICAgICAgICAgICAgICAgICAgIGRlY29kZVJlc3VsdF8xID1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlY29kZUNvZGVfMiA+PSAweDEwZmZmZlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gb3V0T2ZCb3VuZHNDaGFyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkZWNvZGVDb2RlXzIgPiA2NTUzNVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHN1cnJvZ2F0ZV9wYWlyc18xLmZyb21Db2RlUG9pbnQoZGVjb2RlQ29kZV8yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGZyb21DaGFyQ29kZShudW1lcmljX3VuaWNvZGVfbWFwXzEubnVtZXJpY1VuaWNvZGVNYXBbZGVjb2RlQ29kZV8yXSB8fCBkZWNvZGVDb2RlXzIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcGxhY2VSZXN1bHRfMSArPSBkZWNvZGVSZXN1bHRfMTtcbiAgICAgICAgICAgIHJlcGxhY2VMYXN0SW5kZXhfMSA9IHJlcGxhY2VNYXRjaF8xLmluZGV4ICsgcmVwbGFjZUlucHV0XzEubGVuZ3RoO1xuICAgICAgICB9IHdoaWxlICgocmVwbGFjZU1hdGNoXzEgPSBkZWNvZGVSZWdFeHAuZXhlYyh0ZXh0KSkpO1xuICAgICAgICBpZiAocmVwbGFjZUxhc3RJbmRleF8xICE9PSB0ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmVwbGFjZVJlc3VsdF8xICs9IHRleHQuc3Vic3RyaW5nKHJlcGxhY2VMYXN0SW5kZXhfMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlcGxhY2VSZXN1bHRfMSA9XG4gICAgICAgICAgICB0ZXh0O1xuICAgIH1cbiAgICByZXR1cm4gcmVwbGFjZVJlc3VsdF8xO1xufVxuZXhwb3J0cy5kZWNvZGUgPSBkZWNvZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMuYm9keVJlZ0V4cHM9e3htbDovJig/OiNcXGQrfCNbeFhdW1xcZGEtZkEtRl0rfFswLTlhLXpBLVpdKyk7Py9nLGh0bWw0Oi8mKD86bmJzcHxpZXhjbHxjZW50fHBvdW5kfGN1cnJlbnx5ZW58YnJ2YmFyfHNlY3R8dW1sfGNvcHl8b3JkZnxsYXF1b3xub3R8c2h5fHJlZ3xtYWNyfGRlZ3xwbHVzbW58c3VwMnxzdXAzfGFjdXRlfG1pY3JvfHBhcmF8bWlkZG90fGNlZGlsfHN1cDF8b3JkbXxyYXF1b3xmcmFjMTR8ZnJhYzEyfGZyYWMzNHxpcXVlc3R8QWdyYXZlfEFhY3V0ZXxBY2lyY3xBdGlsZGV8QXVtbHxBcmluZ3xBRWxpZ3xDY2VkaWx8RWdyYXZlfEVhY3V0ZXxFY2lyY3xFdW1sfElncmF2ZXxJYWN1dGV8SWNpcmN8SXVtbHxFVEh8TnRpbGRlfE9ncmF2ZXxPYWN1dGV8T2NpcmN8T3RpbGRlfE91bWx8dGltZXN8T3NsYXNofFVncmF2ZXxVYWN1dGV8VWNpcmN8VXVtbHxZYWN1dGV8VEhPUk58c3psaWd8YWdyYXZlfGFhY3V0ZXxhY2lyY3xhdGlsZGV8YXVtbHxhcmluZ3xhZWxpZ3xjY2VkaWx8ZWdyYXZlfGVhY3V0ZXxlY2lyY3xldW1sfGlncmF2ZXxpYWN1dGV8aWNpcmN8aXVtbHxldGh8bnRpbGRlfG9ncmF2ZXxvYWN1dGV8b2NpcmN8b3RpbGRlfG91bWx8ZGl2aWRlfG9zbGFzaHx1Z3JhdmV8dWFjdXRlfHVjaXJjfHV1bWx8eWFjdXRlfHRob3JufHl1bWx8cXVvdHxhbXB8bHR8Z3R8I1xcZCt8I1t4WF1bXFxkYS1mQS1GXSt8WzAtOWEtekEtWl0rKTs/L2csaHRtbDU6LyYoPzpBRWxpZ3xBTVB8QWFjdXRlfEFjaXJjfEFncmF2ZXxBcmluZ3xBdGlsZGV8QXVtbHxDT1BZfENjZWRpbHxFVEh8RWFjdXRlfEVjaXJjfEVncmF2ZXxFdW1sfEdUfElhY3V0ZXxJY2lyY3xJZ3JhdmV8SXVtbHxMVHxOdGlsZGV8T2FjdXRlfE9jaXJjfE9ncmF2ZXxPc2xhc2h8T3RpbGRlfE91bWx8UVVPVHxSRUd8VEhPUk58VWFjdXRlfFVjaXJjfFVncmF2ZXxVdW1sfFlhY3V0ZXxhYWN1dGV8YWNpcmN8YWN1dGV8YWVsaWd8YWdyYXZlfGFtcHxhcmluZ3xhdGlsZGV8YXVtbHxicnZiYXJ8Y2NlZGlsfGNlZGlsfGNlbnR8Y29weXxjdXJyZW58ZGVnfGRpdmlkZXxlYWN1dGV8ZWNpcmN8ZWdyYXZlfGV0aHxldW1sfGZyYWMxMnxmcmFjMTR8ZnJhYzM0fGd0fGlhY3V0ZXxpY2lyY3xpZXhjbHxpZ3JhdmV8aXF1ZXN0fGl1bWx8bGFxdW98bHR8bWFjcnxtaWNyb3xtaWRkb3R8bmJzcHxub3R8bnRpbGRlfG9hY3V0ZXxvY2lyY3xvZ3JhdmV8b3JkZnxvcmRtfG9zbGFzaHxvdGlsZGV8b3VtbHxwYXJhfHBsdXNtbnxwb3VuZHxxdW90fHJhcXVvfHJlZ3xzZWN0fHNoeXxzdXAxfHN1cDJ8c3VwM3xzemxpZ3x0aG9ybnx0aW1lc3x1YWN1dGV8dWNpcmN8dWdyYXZlfHVtbHx1dW1sfHlhY3V0ZXx5ZW58eXVtbHwjXFxkK3wjW3hYXVtcXGRhLWZBLUZdK3xbMC05YS16QS1aXSspOz8vZ307ZXhwb3J0cy5uYW1lZFJlZmVyZW5jZXM9e3htbDp7ZW50aXRpZXM6e1wiJmx0O1wiOlwiPFwiLFwiJmd0O1wiOlwiPlwiLFwiJnF1b3Q7XCI6J1wiJyxcIiZhcG9zO1wiOlwiJ1wiLFwiJmFtcDtcIjpcIiZcIn0sY2hhcmFjdGVyczp7XCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJ1wiOlwiJmFwb3M7XCIsXCImXCI6XCImYW1wO1wifX0saHRtbDQ6e2VudGl0aWVzOntcIiZhcG9zO1wiOlwiJ1wiLFwiJm5ic3BcIjpcIsKgXCIsXCImbmJzcDtcIjpcIsKgXCIsXCImaWV4Y2xcIjpcIsKhXCIsXCImaWV4Y2w7XCI6XCLCoVwiLFwiJmNlbnRcIjpcIsKiXCIsXCImY2VudDtcIjpcIsKiXCIsXCImcG91bmRcIjpcIsKjXCIsXCImcG91bmQ7XCI6XCLCo1wiLFwiJmN1cnJlblwiOlwiwqRcIixcIiZjdXJyZW47XCI6XCLCpFwiLFwiJnllblwiOlwiwqVcIixcIiZ5ZW47XCI6XCLCpVwiLFwiJmJydmJhclwiOlwiwqZcIixcIiZicnZiYXI7XCI6XCLCplwiLFwiJnNlY3RcIjpcIsKnXCIsXCImc2VjdDtcIjpcIsKnXCIsXCImdW1sXCI6XCLCqFwiLFwiJnVtbDtcIjpcIsKoXCIsXCImY29weVwiOlwiwqlcIixcIiZjb3B5O1wiOlwiwqlcIixcIiZvcmRmXCI6XCLCqlwiLFwiJm9yZGY7XCI6XCLCqlwiLFwiJmxhcXVvXCI6XCLCq1wiLFwiJmxhcXVvO1wiOlwiwqtcIixcIiZub3RcIjpcIsKsXCIsXCImbm90O1wiOlwiwqxcIixcIiZzaHlcIjpcIsKtXCIsXCImc2h5O1wiOlwiwq1cIixcIiZyZWdcIjpcIsKuXCIsXCImcmVnO1wiOlwiwq5cIixcIiZtYWNyXCI6XCLCr1wiLFwiJm1hY3I7XCI6XCLCr1wiLFwiJmRlZ1wiOlwiwrBcIixcIiZkZWc7XCI6XCLCsFwiLFwiJnBsdXNtblwiOlwiwrFcIixcIiZwbHVzbW47XCI6XCLCsVwiLFwiJnN1cDJcIjpcIsKyXCIsXCImc3VwMjtcIjpcIsKyXCIsXCImc3VwM1wiOlwiwrNcIixcIiZzdXAzO1wiOlwiwrNcIixcIiZhY3V0ZVwiOlwiwrRcIixcIiZhY3V0ZTtcIjpcIsK0XCIsXCImbWljcm9cIjpcIsK1XCIsXCImbWljcm87XCI6XCLCtVwiLFwiJnBhcmFcIjpcIsK2XCIsXCImcGFyYTtcIjpcIsK2XCIsXCImbWlkZG90XCI6XCLCt1wiLFwiJm1pZGRvdDtcIjpcIsK3XCIsXCImY2VkaWxcIjpcIsK4XCIsXCImY2VkaWw7XCI6XCLCuFwiLFwiJnN1cDFcIjpcIsK5XCIsXCImc3VwMTtcIjpcIsK5XCIsXCImb3JkbVwiOlwiwrpcIixcIiZvcmRtO1wiOlwiwrpcIixcIiZyYXF1b1wiOlwiwrtcIixcIiZyYXF1bztcIjpcIsK7XCIsXCImZnJhYzE0XCI6XCLCvFwiLFwiJmZyYWMxNDtcIjpcIsK8XCIsXCImZnJhYzEyXCI6XCLCvVwiLFwiJmZyYWMxMjtcIjpcIsK9XCIsXCImZnJhYzM0XCI6XCLCvlwiLFwiJmZyYWMzNDtcIjpcIsK+XCIsXCImaXF1ZXN0XCI6XCLCv1wiLFwiJmlxdWVzdDtcIjpcIsK/XCIsXCImQWdyYXZlXCI6XCLDgFwiLFwiJkFncmF2ZTtcIjpcIsOAXCIsXCImQWFjdXRlXCI6XCLDgVwiLFwiJkFhY3V0ZTtcIjpcIsOBXCIsXCImQWNpcmNcIjpcIsOCXCIsXCImQWNpcmM7XCI6XCLDglwiLFwiJkF0aWxkZVwiOlwiw4NcIixcIiZBdGlsZGU7XCI6XCLDg1wiLFwiJkF1bWxcIjpcIsOEXCIsXCImQXVtbDtcIjpcIsOEXCIsXCImQXJpbmdcIjpcIsOFXCIsXCImQXJpbmc7XCI6XCLDhVwiLFwiJkFFbGlnXCI6XCLDhlwiLFwiJkFFbGlnO1wiOlwiw4ZcIixcIiZDY2VkaWxcIjpcIsOHXCIsXCImQ2NlZGlsO1wiOlwiw4dcIixcIiZFZ3JhdmVcIjpcIsOIXCIsXCImRWdyYXZlO1wiOlwiw4hcIixcIiZFYWN1dGVcIjpcIsOJXCIsXCImRWFjdXRlO1wiOlwiw4lcIixcIiZFY2lyY1wiOlwiw4pcIixcIiZFY2lyYztcIjpcIsOKXCIsXCImRXVtbFwiOlwiw4tcIixcIiZFdW1sO1wiOlwiw4tcIixcIiZJZ3JhdmVcIjpcIsOMXCIsXCImSWdyYXZlO1wiOlwiw4xcIixcIiZJYWN1dGVcIjpcIsONXCIsXCImSWFjdXRlO1wiOlwiw41cIixcIiZJY2lyY1wiOlwiw45cIixcIiZJY2lyYztcIjpcIsOOXCIsXCImSXVtbFwiOlwiw49cIixcIiZJdW1sO1wiOlwiw49cIixcIiZFVEhcIjpcIsOQXCIsXCImRVRIO1wiOlwiw5BcIixcIiZOdGlsZGVcIjpcIsORXCIsXCImTnRpbGRlO1wiOlwiw5FcIixcIiZPZ3JhdmVcIjpcIsOSXCIsXCImT2dyYXZlO1wiOlwiw5JcIixcIiZPYWN1dGVcIjpcIsOTXCIsXCImT2FjdXRlO1wiOlwiw5NcIixcIiZPY2lyY1wiOlwiw5RcIixcIiZPY2lyYztcIjpcIsOUXCIsXCImT3RpbGRlXCI6XCLDlVwiLFwiJk90aWxkZTtcIjpcIsOVXCIsXCImT3VtbFwiOlwiw5ZcIixcIiZPdW1sO1wiOlwiw5ZcIixcIiZ0aW1lc1wiOlwiw5dcIixcIiZ0aW1lcztcIjpcIsOXXCIsXCImT3NsYXNoXCI6XCLDmFwiLFwiJk9zbGFzaDtcIjpcIsOYXCIsXCImVWdyYXZlXCI6XCLDmVwiLFwiJlVncmF2ZTtcIjpcIsOZXCIsXCImVWFjdXRlXCI6XCLDmlwiLFwiJlVhY3V0ZTtcIjpcIsOaXCIsXCImVWNpcmNcIjpcIsObXCIsXCImVWNpcmM7XCI6XCLDm1wiLFwiJlV1bWxcIjpcIsOcXCIsXCImVXVtbDtcIjpcIsOcXCIsXCImWWFjdXRlXCI6XCLDnVwiLFwiJllhY3V0ZTtcIjpcIsOdXCIsXCImVEhPUk5cIjpcIsOeXCIsXCImVEhPUk47XCI6XCLDnlwiLFwiJnN6bGlnXCI6XCLDn1wiLFwiJnN6bGlnO1wiOlwiw59cIixcIiZhZ3JhdmVcIjpcIsOgXCIsXCImYWdyYXZlO1wiOlwiw6BcIixcIiZhYWN1dGVcIjpcIsOhXCIsXCImYWFjdXRlO1wiOlwiw6FcIixcIiZhY2lyY1wiOlwiw6JcIixcIiZhY2lyYztcIjpcIsOiXCIsXCImYXRpbGRlXCI6XCLDo1wiLFwiJmF0aWxkZTtcIjpcIsOjXCIsXCImYXVtbFwiOlwiw6RcIixcIiZhdW1sO1wiOlwiw6RcIixcIiZhcmluZ1wiOlwiw6VcIixcIiZhcmluZztcIjpcIsOlXCIsXCImYWVsaWdcIjpcIsOmXCIsXCImYWVsaWc7XCI6XCLDplwiLFwiJmNjZWRpbFwiOlwiw6dcIixcIiZjY2VkaWw7XCI6XCLDp1wiLFwiJmVncmF2ZVwiOlwiw6hcIixcIiZlZ3JhdmU7XCI6XCLDqFwiLFwiJmVhY3V0ZVwiOlwiw6lcIixcIiZlYWN1dGU7XCI6XCLDqVwiLFwiJmVjaXJjXCI6XCLDqlwiLFwiJmVjaXJjO1wiOlwiw6pcIixcIiZldW1sXCI6XCLDq1wiLFwiJmV1bWw7XCI6XCLDq1wiLFwiJmlncmF2ZVwiOlwiw6xcIixcIiZpZ3JhdmU7XCI6XCLDrFwiLFwiJmlhY3V0ZVwiOlwiw61cIixcIiZpYWN1dGU7XCI6XCLDrVwiLFwiJmljaXJjXCI6XCLDrlwiLFwiJmljaXJjO1wiOlwiw65cIixcIiZpdW1sXCI6XCLDr1wiLFwiJml1bWw7XCI6XCLDr1wiLFwiJmV0aFwiOlwiw7BcIixcIiZldGg7XCI6XCLDsFwiLFwiJm50aWxkZVwiOlwiw7FcIixcIiZudGlsZGU7XCI6XCLDsVwiLFwiJm9ncmF2ZVwiOlwiw7JcIixcIiZvZ3JhdmU7XCI6XCLDslwiLFwiJm9hY3V0ZVwiOlwiw7NcIixcIiZvYWN1dGU7XCI6XCLDs1wiLFwiJm9jaXJjXCI6XCLDtFwiLFwiJm9jaXJjO1wiOlwiw7RcIixcIiZvdGlsZGVcIjpcIsO1XCIsXCImb3RpbGRlO1wiOlwiw7VcIixcIiZvdW1sXCI6XCLDtlwiLFwiJm91bWw7XCI6XCLDtlwiLFwiJmRpdmlkZVwiOlwiw7dcIixcIiZkaXZpZGU7XCI6XCLDt1wiLFwiJm9zbGFzaFwiOlwiw7hcIixcIiZvc2xhc2g7XCI6XCLDuFwiLFwiJnVncmF2ZVwiOlwiw7lcIixcIiZ1Z3JhdmU7XCI6XCLDuVwiLFwiJnVhY3V0ZVwiOlwiw7pcIixcIiZ1YWN1dGU7XCI6XCLDulwiLFwiJnVjaXJjXCI6XCLDu1wiLFwiJnVjaXJjO1wiOlwiw7tcIixcIiZ1dW1sXCI6XCLDvFwiLFwiJnV1bWw7XCI6XCLDvFwiLFwiJnlhY3V0ZVwiOlwiw71cIixcIiZ5YWN1dGU7XCI6XCLDvVwiLFwiJnRob3JuXCI6XCLDvlwiLFwiJnRob3JuO1wiOlwiw75cIixcIiZ5dW1sXCI6XCLDv1wiLFwiJnl1bWw7XCI6XCLDv1wiLFwiJnF1b3RcIjonXCInLFwiJnF1b3Q7XCI6J1wiJyxcIiZhbXBcIjpcIiZcIixcIiZhbXA7XCI6XCImXCIsXCImbHRcIjpcIjxcIixcIiZsdDtcIjpcIjxcIixcIiZndFwiOlwiPlwiLFwiJmd0O1wiOlwiPlwiLFwiJk9FbGlnO1wiOlwixZJcIixcIiZvZWxpZztcIjpcIsWTXCIsXCImU2Nhcm9uO1wiOlwixaBcIixcIiZzY2Fyb247XCI6XCLFoVwiLFwiJll1bWw7XCI6XCLFuFwiLFwiJmNpcmM7XCI6XCLLhlwiLFwiJnRpbGRlO1wiOlwiy5xcIixcIiZlbnNwO1wiOlwi4oCCXCIsXCImZW1zcDtcIjpcIuKAg1wiLFwiJnRoaW5zcDtcIjpcIuKAiVwiLFwiJnp3bmo7XCI6XCLigIxcIixcIiZ6d2o7XCI6XCLigI1cIixcIiZscm07XCI6XCLigI5cIixcIiZybG07XCI6XCLigI9cIixcIiZuZGFzaDtcIjpcIuKAk1wiLFwiJm1kYXNoO1wiOlwi4oCUXCIsXCImbHNxdW87XCI6XCLigJhcIixcIiZyc3F1bztcIjpcIuKAmVwiLFwiJnNicXVvO1wiOlwi4oCaXCIsXCImbGRxdW87XCI6XCLigJxcIixcIiZyZHF1bztcIjpcIuKAnVwiLFwiJmJkcXVvO1wiOlwi4oCeXCIsXCImZGFnZ2VyO1wiOlwi4oCgXCIsXCImRGFnZ2VyO1wiOlwi4oChXCIsXCImcGVybWlsO1wiOlwi4oCwXCIsXCImbHNhcXVvO1wiOlwi4oC5XCIsXCImcnNhcXVvO1wiOlwi4oC6XCIsXCImZXVybztcIjpcIuKCrFwiLFwiJmZub2Y7XCI6XCLGklwiLFwiJkFscGhhO1wiOlwizpFcIixcIiZCZXRhO1wiOlwizpJcIixcIiZHYW1tYTtcIjpcIs6TXCIsXCImRGVsdGE7XCI6XCLOlFwiLFwiJkVwc2lsb247XCI6XCLOlVwiLFwiJlpldGE7XCI6XCLOllwiLFwiJkV0YTtcIjpcIs6XXCIsXCImVGhldGE7XCI6XCLOmFwiLFwiJklvdGE7XCI6XCLOmVwiLFwiJkthcHBhO1wiOlwizppcIixcIiZMYW1iZGE7XCI6XCLOm1wiLFwiJk11O1wiOlwizpxcIixcIiZOdTtcIjpcIs6dXCIsXCImWGk7XCI6XCLOnlwiLFwiJk9taWNyb247XCI6XCLOn1wiLFwiJlBpO1wiOlwizqBcIixcIiZSaG87XCI6XCLOoVwiLFwiJlNpZ21hO1wiOlwizqNcIixcIiZUYXU7XCI6XCLOpFwiLFwiJlVwc2lsb247XCI6XCLOpVwiLFwiJlBoaTtcIjpcIs6mXCIsXCImQ2hpO1wiOlwizqdcIixcIiZQc2k7XCI6XCLOqFwiLFwiJk9tZWdhO1wiOlwizqlcIixcIiZhbHBoYTtcIjpcIs6xXCIsXCImYmV0YTtcIjpcIs6yXCIsXCImZ2FtbWE7XCI6XCLOs1wiLFwiJmRlbHRhO1wiOlwizrRcIixcIiZlcHNpbG9uO1wiOlwizrVcIixcIiZ6ZXRhO1wiOlwizrZcIixcIiZldGE7XCI6XCLOt1wiLFwiJnRoZXRhO1wiOlwizrhcIixcIiZpb3RhO1wiOlwizrlcIixcIiZrYXBwYTtcIjpcIs66XCIsXCImbGFtYmRhO1wiOlwizrtcIixcIiZtdTtcIjpcIs68XCIsXCImbnU7XCI6XCLOvVwiLFwiJnhpO1wiOlwizr5cIixcIiZvbWljcm9uO1wiOlwizr9cIixcIiZwaTtcIjpcIs+AXCIsXCImcmhvO1wiOlwiz4FcIixcIiZzaWdtYWY7XCI6XCLPglwiLFwiJnNpZ21hO1wiOlwiz4NcIixcIiZ0YXU7XCI6XCLPhFwiLFwiJnVwc2lsb247XCI6XCLPhVwiLFwiJnBoaTtcIjpcIs+GXCIsXCImY2hpO1wiOlwiz4dcIixcIiZwc2k7XCI6XCLPiFwiLFwiJm9tZWdhO1wiOlwiz4lcIixcIiZ0aGV0YXN5bTtcIjpcIs+RXCIsXCImdXBzaWg7XCI6XCLPklwiLFwiJnBpdjtcIjpcIs+WXCIsXCImYnVsbDtcIjpcIuKAolwiLFwiJmhlbGxpcDtcIjpcIuKAplwiLFwiJnByaW1lO1wiOlwi4oCyXCIsXCImUHJpbWU7XCI6XCLigLNcIixcIiZvbGluZTtcIjpcIuKAvlwiLFwiJmZyYXNsO1wiOlwi4oGEXCIsXCImd2VpZXJwO1wiOlwi4oSYXCIsXCImaW1hZ2U7XCI6XCLihJFcIixcIiZyZWFsO1wiOlwi4oScXCIsXCImdHJhZGU7XCI6XCLihKJcIixcIiZhbGVmc3ltO1wiOlwi4oS1XCIsXCImbGFycjtcIjpcIuKGkFwiLFwiJnVhcnI7XCI6XCLihpFcIixcIiZyYXJyO1wiOlwi4oaSXCIsXCImZGFycjtcIjpcIuKGk1wiLFwiJmhhcnI7XCI6XCLihpRcIixcIiZjcmFycjtcIjpcIuKGtVwiLFwiJmxBcnI7XCI6XCLih5BcIixcIiZ1QXJyO1wiOlwi4oeRXCIsXCImckFycjtcIjpcIuKHklwiLFwiJmRBcnI7XCI6XCLih5NcIixcIiZoQXJyO1wiOlwi4oeUXCIsXCImZm9yYWxsO1wiOlwi4oiAXCIsXCImcGFydDtcIjpcIuKIglwiLFwiJmV4aXN0O1wiOlwi4oiDXCIsXCImZW1wdHk7XCI6XCLiiIVcIixcIiZuYWJsYTtcIjpcIuKIh1wiLFwiJmlzaW47XCI6XCLiiIhcIixcIiZub3RpbjtcIjpcIuKIiVwiLFwiJm5pO1wiOlwi4oiLXCIsXCImcHJvZDtcIjpcIuKIj1wiLFwiJnN1bTtcIjpcIuKIkVwiLFwiJm1pbnVzO1wiOlwi4oiSXCIsXCImbG93YXN0O1wiOlwi4oiXXCIsXCImcmFkaWM7XCI6XCLiiJpcIixcIiZwcm9wO1wiOlwi4oidXCIsXCImaW5maW47XCI6XCLiiJ5cIixcIiZhbmc7XCI6XCLiiKBcIixcIiZhbmQ7XCI6XCLiiKdcIixcIiZvcjtcIjpcIuKIqFwiLFwiJmNhcDtcIjpcIuKIqVwiLFwiJmN1cDtcIjpcIuKIqlwiLFwiJmludDtcIjpcIuKIq1wiLFwiJnRoZXJlNDtcIjpcIuKItFwiLFwiJnNpbTtcIjpcIuKIvFwiLFwiJmNvbmc7XCI6XCLiiYVcIixcIiZhc3ltcDtcIjpcIuKJiFwiLFwiJm5lO1wiOlwi4omgXCIsXCImZXF1aXY7XCI6XCLiiaFcIixcIiZsZTtcIjpcIuKJpFwiLFwiJmdlO1wiOlwi4omlXCIsXCImc3ViO1wiOlwi4oqCXCIsXCImc3VwO1wiOlwi4oqDXCIsXCImbnN1YjtcIjpcIuKKhFwiLFwiJnN1YmU7XCI6XCLiioZcIixcIiZzdXBlO1wiOlwi4oqHXCIsXCImb3BsdXM7XCI6XCLiipVcIixcIiZvdGltZXM7XCI6XCLiipdcIixcIiZwZXJwO1wiOlwi4oqlXCIsXCImc2RvdDtcIjpcIuKLhVwiLFwiJmxjZWlsO1wiOlwi4oyIXCIsXCImcmNlaWw7XCI6XCLijIlcIixcIiZsZmxvb3I7XCI6XCLijIpcIixcIiZyZmxvb3I7XCI6XCLijItcIixcIiZsYW5nO1wiOlwi4oypXCIsXCImcmFuZztcIjpcIuKMqlwiLFwiJmxvejtcIjpcIuKXilwiLFwiJnNwYWRlcztcIjpcIuKZoFwiLFwiJmNsdWJzO1wiOlwi4pmjXCIsXCImaGVhcnRzO1wiOlwi4pmlXCIsXCImZGlhbXM7XCI6XCLimaZcIn0sY2hhcmFjdGVyczp7XCInXCI6XCImYXBvcztcIixcIsKgXCI6XCImbmJzcDtcIixcIsKhXCI6XCImaWV4Y2w7XCIsXCLColwiOlwiJmNlbnQ7XCIsXCLCo1wiOlwiJnBvdW5kO1wiLFwiwqRcIjpcIiZjdXJyZW47XCIsXCLCpVwiOlwiJnllbjtcIixcIsKmXCI6XCImYnJ2YmFyO1wiLFwiwqdcIjpcIiZzZWN0O1wiLFwiwqhcIjpcIiZ1bWw7XCIsXCLCqVwiOlwiJmNvcHk7XCIsXCLCqlwiOlwiJm9yZGY7XCIsXCLCq1wiOlwiJmxhcXVvO1wiLFwiwqxcIjpcIiZub3Q7XCIsXCLCrVwiOlwiJnNoeTtcIixcIsKuXCI6XCImcmVnO1wiLFwiwq9cIjpcIiZtYWNyO1wiLFwiwrBcIjpcIiZkZWc7XCIsXCLCsVwiOlwiJnBsdXNtbjtcIixcIsKyXCI6XCImc3VwMjtcIixcIsKzXCI6XCImc3VwMztcIixcIsK0XCI6XCImYWN1dGU7XCIsXCLCtVwiOlwiJm1pY3JvO1wiLFwiwrZcIjpcIiZwYXJhO1wiLFwiwrdcIjpcIiZtaWRkb3Q7XCIsXCLCuFwiOlwiJmNlZGlsO1wiLFwiwrlcIjpcIiZzdXAxO1wiLFwiwrpcIjpcIiZvcmRtO1wiLFwiwrtcIjpcIiZyYXF1bztcIixcIsK8XCI6XCImZnJhYzE0O1wiLFwiwr1cIjpcIiZmcmFjMTI7XCIsXCLCvlwiOlwiJmZyYWMzNDtcIixcIsK/XCI6XCImaXF1ZXN0O1wiLFwiw4BcIjpcIiZBZ3JhdmU7XCIsXCLDgVwiOlwiJkFhY3V0ZTtcIixcIsOCXCI6XCImQWNpcmM7XCIsXCLDg1wiOlwiJkF0aWxkZTtcIixcIsOEXCI6XCImQXVtbDtcIixcIsOFXCI6XCImQXJpbmc7XCIsXCLDhlwiOlwiJkFFbGlnO1wiLFwiw4dcIjpcIiZDY2VkaWw7XCIsXCLDiFwiOlwiJkVncmF2ZTtcIixcIsOJXCI6XCImRWFjdXRlO1wiLFwiw4pcIjpcIiZFY2lyYztcIixcIsOLXCI6XCImRXVtbDtcIixcIsOMXCI6XCImSWdyYXZlO1wiLFwiw41cIjpcIiZJYWN1dGU7XCIsXCLDjlwiOlwiJkljaXJjO1wiLFwiw49cIjpcIiZJdW1sO1wiLFwiw5BcIjpcIiZFVEg7XCIsXCLDkVwiOlwiJk50aWxkZTtcIixcIsOSXCI6XCImT2dyYXZlO1wiLFwiw5NcIjpcIiZPYWN1dGU7XCIsXCLDlFwiOlwiJk9jaXJjO1wiLFwiw5VcIjpcIiZPdGlsZGU7XCIsXCLDllwiOlwiJk91bWw7XCIsXCLDl1wiOlwiJnRpbWVzO1wiLFwiw5hcIjpcIiZPc2xhc2g7XCIsXCLDmVwiOlwiJlVncmF2ZTtcIixcIsOaXCI6XCImVWFjdXRlO1wiLFwiw5tcIjpcIiZVY2lyYztcIixcIsOcXCI6XCImVXVtbDtcIixcIsOdXCI6XCImWWFjdXRlO1wiLFwiw55cIjpcIiZUSE9STjtcIixcIsOfXCI6XCImc3psaWc7XCIsXCLDoFwiOlwiJmFncmF2ZTtcIixcIsOhXCI6XCImYWFjdXRlO1wiLFwiw6JcIjpcIiZhY2lyYztcIixcIsOjXCI6XCImYXRpbGRlO1wiLFwiw6RcIjpcIiZhdW1sO1wiLFwiw6VcIjpcIiZhcmluZztcIixcIsOmXCI6XCImYWVsaWc7XCIsXCLDp1wiOlwiJmNjZWRpbDtcIixcIsOoXCI6XCImZWdyYXZlO1wiLFwiw6lcIjpcIiZlYWN1dGU7XCIsXCLDqlwiOlwiJmVjaXJjO1wiLFwiw6tcIjpcIiZldW1sO1wiLFwiw6xcIjpcIiZpZ3JhdmU7XCIsXCLDrVwiOlwiJmlhY3V0ZTtcIixcIsOuXCI6XCImaWNpcmM7XCIsXCLDr1wiOlwiJml1bWw7XCIsXCLDsFwiOlwiJmV0aDtcIixcIsOxXCI6XCImbnRpbGRlO1wiLFwiw7JcIjpcIiZvZ3JhdmU7XCIsXCLDs1wiOlwiJm9hY3V0ZTtcIixcIsO0XCI6XCImb2NpcmM7XCIsXCLDtVwiOlwiJm90aWxkZTtcIixcIsO2XCI6XCImb3VtbDtcIixcIsO3XCI6XCImZGl2aWRlO1wiLFwiw7hcIjpcIiZvc2xhc2g7XCIsXCLDuVwiOlwiJnVncmF2ZTtcIixcIsO6XCI6XCImdWFjdXRlO1wiLFwiw7tcIjpcIiZ1Y2lyYztcIixcIsO8XCI6XCImdXVtbDtcIixcIsO9XCI6XCImeWFjdXRlO1wiLFwiw75cIjpcIiZ0aG9ybjtcIixcIsO/XCI6XCImeXVtbDtcIiwnXCInOlwiJnF1b3Q7XCIsXCImXCI6XCImYW1wO1wiLFwiPFwiOlwiJmx0O1wiLFwiPlwiOlwiJmd0O1wiLFwixZJcIjpcIiZPRWxpZztcIixcIsWTXCI6XCImb2VsaWc7XCIsXCLFoFwiOlwiJlNjYXJvbjtcIixcIsWhXCI6XCImc2Nhcm9uO1wiLFwixbhcIjpcIiZZdW1sO1wiLFwiy4ZcIjpcIiZjaXJjO1wiLFwiy5xcIjpcIiZ0aWxkZTtcIixcIuKAglwiOlwiJmVuc3A7XCIsXCLigINcIjpcIiZlbXNwO1wiLFwi4oCJXCI6XCImdGhpbnNwO1wiLFwi4oCMXCI6XCImenduajtcIixcIuKAjVwiOlwiJnp3ajtcIixcIuKAjlwiOlwiJmxybTtcIixcIuKAj1wiOlwiJnJsbTtcIixcIuKAk1wiOlwiJm5kYXNoO1wiLFwi4oCUXCI6XCImbWRhc2g7XCIsXCLigJhcIjpcIiZsc3F1bztcIixcIuKAmVwiOlwiJnJzcXVvO1wiLFwi4oCaXCI6XCImc2JxdW87XCIsXCLigJxcIjpcIiZsZHF1bztcIixcIuKAnVwiOlwiJnJkcXVvO1wiLFwi4oCeXCI6XCImYmRxdW87XCIsXCLigKBcIjpcIiZkYWdnZXI7XCIsXCLigKFcIjpcIiZEYWdnZXI7XCIsXCLigLBcIjpcIiZwZXJtaWw7XCIsXCLigLlcIjpcIiZsc2FxdW87XCIsXCLigLpcIjpcIiZyc2FxdW87XCIsXCLigqxcIjpcIiZldXJvO1wiLFwixpJcIjpcIiZmbm9mO1wiLFwizpFcIjpcIiZBbHBoYTtcIixcIs6SXCI6XCImQmV0YTtcIixcIs6TXCI6XCImR2FtbWE7XCIsXCLOlFwiOlwiJkRlbHRhO1wiLFwizpVcIjpcIiZFcHNpbG9uO1wiLFwizpZcIjpcIiZaZXRhO1wiLFwizpdcIjpcIiZFdGE7XCIsXCLOmFwiOlwiJlRoZXRhO1wiLFwizplcIjpcIiZJb3RhO1wiLFwizppcIjpcIiZLYXBwYTtcIixcIs6bXCI6XCImTGFtYmRhO1wiLFwizpxcIjpcIiZNdTtcIixcIs6dXCI6XCImTnU7XCIsXCLOnlwiOlwiJlhpO1wiLFwizp9cIjpcIiZPbWljcm9uO1wiLFwizqBcIjpcIiZQaTtcIixcIs6hXCI6XCImUmhvO1wiLFwizqNcIjpcIiZTaWdtYTtcIixcIs6kXCI6XCImVGF1O1wiLFwizqVcIjpcIiZVcHNpbG9uO1wiLFwizqZcIjpcIiZQaGk7XCIsXCLOp1wiOlwiJkNoaTtcIixcIs6oXCI6XCImUHNpO1wiLFwizqlcIjpcIiZPbWVnYTtcIixcIs6xXCI6XCImYWxwaGE7XCIsXCLOslwiOlwiJmJldGE7XCIsXCLOs1wiOlwiJmdhbW1hO1wiLFwizrRcIjpcIiZkZWx0YTtcIixcIs61XCI6XCImZXBzaWxvbjtcIixcIs62XCI6XCImemV0YTtcIixcIs63XCI6XCImZXRhO1wiLFwizrhcIjpcIiZ0aGV0YTtcIixcIs65XCI6XCImaW90YTtcIixcIs66XCI6XCIma2FwcGE7XCIsXCLOu1wiOlwiJmxhbWJkYTtcIixcIs68XCI6XCImbXU7XCIsXCLOvVwiOlwiJm51O1wiLFwizr5cIjpcIiZ4aTtcIixcIs6/XCI6XCImb21pY3JvbjtcIixcIs+AXCI6XCImcGk7XCIsXCLPgVwiOlwiJnJobztcIixcIs+CXCI6XCImc2lnbWFmO1wiLFwiz4NcIjpcIiZzaWdtYTtcIixcIs+EXCI6XCImdGF1O1wiLFwiz4VcIjpcIiZ1cHNpbG9uO1wiLFwiz4ZcIjpcIiZwaGk7XCIsXCLPh1wiOlwiJmNoaTtcIixcIs+IXCI6XCImcHNpO1wiLFwiz4lcIjpcIiZvbWVnYTtcIixcIs+RXCI6XCImdGhldGFzeW07XCIsXCLPklwiOlwiJnVwc2loO1wiLFwiz5ZcIjpcIiZwaXY7XCIsXCLigKJcIjpcIiZidWxsO1wiLFwi4oCmXCI6XCImaGVsbGlwO1wiLFwi4oCyXCI6XCImcHJpbWU7XCIsXCLigLNcIjpcIiZQcmltZTtcIixcIuKAvlwiOlwiJm9saW5lO1wiLFwi4oGEXCI6XCImZnJhc2w7XCIsXCLihJhcIjpcIiZ3ZWllcnA7XCIsXCLihJFcIjpcIiZpbWFnZTtcIixcIuKEnFwiOlwiJnJlYWw7XCIsXCLihKJcIjpcIiZ0cmFkZTtcIixcIuKEtVwiOlwiJmFsZWZzeW07XCIsXCLihpBcIjpcIiZsYXJyO1wiLFwi4oaRXCI6XCImdWFycjtcIixcIuKGklwiOlwiJnJhcnI7XCIsXCLihpNcIjpcIiZkYXJyO1wiLFwi4oaUXCI6XCImaGFycjtcIixcIuKGtVwiOlwiJmNyYXJyO1wiLFwi4oeQXCI6XCImbEFycjtcIixcIuKHkVwiOlwiJnVBcnI7XCIsXCLih5JcIjpcIiZyQXJyO1wiLFwi4oeTXCI6XCImZEFycjtcIixcIuKHlFwiOlwiJmhBcnI7XCIsXCLiiIBcIjpcIiZmb3JhbGw7XCIsXCLiiIJcIjpcIiZwYXJ0O1wiLFwi4oiDXCI6XCImZXhpc3Q7XCIsXCLiiIVcIjpcIiZlbXB0eTtcIixcIuKIh1wiOlwiJm5hYmxhO1wiLFwi4oiIXCI6XCImaXNpbjtcIixcIuKIiVwiOlwiJm5vdGluO1wiLFwi4oiLXCI6XCImbmk7XCIsXCLiiI9cIjpcIiZwcm9kO1wiLFwi4oiRXCI6XCImc3VtO1wiLFwi4oiSXCI6XCImbWludXM7XCIsXCLiiJdcIjpcIiZsb3dhc3Q7XCIsXCLiiJpcIjpcIiZyYWRpYztcIixcIuKInVwiOlwiJnByb3A7XCIsXCLiiJ5cIjpcIiZpbmZpbjtcIixcIuKIoFwiOlwiJmFuZztcIixcIuKIp1wiOlwiJmFuZDtcIixcIuKIqFwiOlwiJm9yO1wiLFwi4oipXCI6XCImY2FwO1wiLFwi4oiqXCI6XCImY3VwO1wiLFwi4oirXCI6XCImaW50O1wiLFwi4oi0XCI6XCImdGhlcmU0O1wiLFwi4oi8XCI6XCImc2ltO1wiLFwi4omFXCI6XCImY29uZztcIixcIuKJiFwiOlwiJmFzeW1wO1wiLFwi4omgXCI6XCImbmU7XCIsXCLiiaFcIjpcIiZlcXVpdjtcIixcIuKJpFwiOlwiJmxlO1wiLFwi4omlXCI6XCImZ2U7XCIsXCLiioJcIjpcIiZzdWI7XCIsXCLiioNcIjpcIiZzdXA7XCIsXCLiioRcIjpcIiZuc3ViO1wiLFwi4oqGXCI6XCImc3ViZTtcIixcIuKKh1wiOlwiJnN1cGU7XCIsXCLiipVcIjpcIiZvcGx1cztcIixcIuKKl1wiOlwiJm90aW1lcztcIixcIuKKpVwiOlwiJnBlcnA7XCIsXCLii4VcIjpcIiZzZG90O1wiLFwi4oyIXCI6XCImbGNlaWw7XCIsXCLijIlcIjpcIiZyY2VpbDtcIixcIuKMilwiOlwiJmxmbG9vcjtcIixcIuKMi1wiOlwiJnJmbG9vcjtcIixcIuKMqVwiOlwiJmxhbmc7XCIsXCLijKpcIjpcIiZyYW5nO1wiLFwi4peKXCI6XCImbG96O1wiLFwi4pmgXCI6XCImc3BhZGVzO1wiLFwi4pmjXCI6XCImY2x1YnM7XCIsXCLimaVcIjpcIiZoZWFydHM7XCIsXCLimaZcIjpcIiZkaWFtcztcIn19LGh0bWw1OntlbnRpdGllczp7XCImQUVsaWdcIjpcIsOGXCIsXCImQUVsaWc7XCI6XCLDhlwiLFwiJkFNUFwiOlwiJlwiLFwiJkFNUDtcIjpcIiZcIixcIiZBYWN1dGVcIjpcIsOBXCIsXCImQWFjdXRlO1wiOlwiw4FcIixcIiZBYnJldmU7XCI6XCLEglwiLFwiJkFjaXJjXCI6XCLDglwiLFwiJkFjaXJjO1wiOlwiw4JcIixcIiZBY3k7XCI6XCLQkFwiLFwiJkFmcjtcIjpcIvCdlIRcIixcIiZBZ3JhdmVcIjpcIsOAXCIsXCImQWdyYXZlO1wiOlwiw4BcIixcIiZBbHBoYTtcIjpcIs6RXCIsXCImQW1hY3I7XCI6XCLEgFwiLFwiJkFuZDtcIjpcIuKpk1wiLFwiJkFvZ29uO1wiOlwixIRcIixcIiZBb3BmO1wiOlwi8J2UuFwiLFwiJkFwcGx5RnVuY3Rpb247XCI6XCLigaFcIixcIiZBcmluZ1wiOlwiw4VcIixcIiZBcmluZztcIjpcIsOFXCIsXCImQXNjcjtcIjpcIvCdkpxcIixcIiZBc3NpZ247XCI6XCLiiZRcIixcIiZBdGlsZGVcIjpcIsODXCIsXCImQXRpbGRlO1wiOlwiw4NcIixcIiZBdW1sXCI6XCLDhFwiLFwiJkF1bWw7XCI6XCLDhFwiLFwiJkJhY2tzbGFzaDtcIjpcIuKIllwiLFwiJkJhcnY7XCI6XCLiq6dcIixcIiZCYXJ3ZWQ7XCI6XCLijIZcIixcIiZCY3k7XCI6XCLQkVwiLFwiJkJlY2F1c2U7XCI6XCLiiLVcIixcIiZCZXJub3VsbGlzO1wiOlwi4oSsXCIsXCImQmV0YTtcIjpcIs6SXCIsXCImQmZyO1wiOlwi8J2UhVwiLFwiJkJvcGY7XCI6XCLwnZS5XCIsXCImQnJldmU7XCI6XCLLmFwiLFwiJkJzY3I7XCI6XCLihKxcIixcIiZCdW1wZXE7XCI6XCLiiY5cIixcIiZDSGN5O1wiOlwi0KdcIixcIiZDT1BZXCI6XCLCqVwiLFwiJkNPUFk7XCI6XCLCqVwiLFwiJkNhY3V0ZTtcIjpcIsSGXCIsXCImQ2FwO1wiOlwi4ouSXCIsXCImQ2FwaXRhbERpZmZlcmVudGlhbEQ7XCI6XCLihYVcIixcIiZDYXlsZXlzO1wiOlwi4oStXCIsXCImQ2Nhcm9uO1wiOlwixIxcIixcIiZDY2VkaWxcIjpcIsOHXCIsXCImQ2NlZGlsO1wiOlwiw4dcIixcIiZDY2lyYztcIjpcIsSIXCIsXCImQ2NvbmludDtcIjpcIuKIsFwiLFwiJkNkb3Q7XCI6XCLEilwiLFwiJkNlZGlsbGE7XCI6XCLCuFwiLFwiJkNlbnRlckRvdDtcIjpcIsK3XCIsXCImQ2ZyO1wiOlwi4oStXCIsXCImQ2hpO1wiOlwizqdcIixcIiZDaXJjbGVEb3Q7XCI6XCLiiplcIixcIiZDaXJjbGVNaW51cztcIjpcIuKKllwiLFwiJkNpcmNsZVBsdXM7XCI6XCLiipVcIixcIiZDaXJjbGVUaW1lcztcIjpcIuKKl1wiLFwiJkNsb2Nrd2lzZUNvbnRvdXJJbnRlZ3JhbDtcIjpcIuKIslwiLFwiJkNsb3NlQ3VybHlEb3VibGVRdW90ZTtcIjpcIuKAnVwiLFwiJkNsb3NlQ3VybHlRdW90ZTtcIjpcIuKAmVwiLFwiJkNvbG9uO1wiOlwi4oi3XCIsXCImQ29sb25lO1wiOlwi4qm0XCIsXCImQ29uZ3J1ZW50O1wiOlwi4omhXCIsXCImQ29uaW50O1wiOlwi4oivXCIsXCImQ29udG91ckludGVncmFsO1wiOlwi4oiuXCIsXCImQ29wZjtcIjpcIuKEglwiLFwiJkNvcHJvZHVjdDtcIjpcIuKIkFwiLFwiJkNvdW50ZXJDbG9ja3dpc2VDb250b3VySW50ZWdyYWw7XCI6XCLiiLNcIixcIiZDcm9zcztcIjpcIuKor1wiLFwiJkNzY3I7XCI6XCLwnZKeXCIsXCImQ3VwO1wiOlwi4ouTXCIsXCImQ3VwQ2FwO1wiOlwi4omNXCIsXCImREQ7XCI6XCLihYVcIixcIiZERG90cmFoZDtcIjpcIuKkkVwiLFwiJkRKY3k7XCI6XCLQglwiLFwiJkRTY3k7XCI6XCLQhVwiLFwiJkRaY3k7XCI6XCLQj1wiLFwiJkRhZ2dlcjtcIjpcIuKAoVwiLFwiJkRhcnI7XCI6XCLihqFcIixcIiZEYXNodjtcIjpcIuKrpFwiLFwiJkRjYXJvbjtcIjpcIsSOXCIsXCImRGN5O1wiOlwi0JRcIixcIiZEZWw7XCI6XCLiiIdcIixcIiZEZWx0YTtcIjpcIs6UXCIsXCImRGZyO1wiOlwi8J2Uh1wiLFwiJkRpYWNyaXRpY2FsQWN1dGU7XCI6XCLCtFwiLFwiJkRpYWNyaXRpY2FsRG90O1wiOlwiy5lcIixcIiZEaWFjcml0aWNhbERvdWJsZUFjdXRlO1wiOlwiy51cIixcIiZEaWFjcml0aWNhbEdyYXZlO1wiOlwiYFwiLFwiJkRpYWNyaXRpY2FsVGlsZGU7XCI6XCLLnFwiLFwiJkRpYW1vbmQ7XCI6XCLii4RcIixcIiZEaWZmZXJlbnRpYWxEO1wiOlwi4oWGXCIsXCImRG9wZjtcIjpcIvCdlLtcIixcIiZEb3Q7XCI6XCLCqFwiLFwiJkRvdERvdDtcIjpcIuKDnFwiLFwiJkRvdEVxdWFsO1wiOlwi4omQXCIsXCImRG91YmxlQ29udG91ckludGVncmFsO1wiOlwi4oivXCIsXCImRG91YmxlRG90O1wiOlwiwqhcIixcIiZEb3VibGVEb3duQXJyb3c7XCI6XCLih5NcIixcIiZEb3VibGVMZWZ0QXJyb3c7XCI6XCLih5BcIixcIiZEb3VibGVMZWZ0UmlnaHRBcnJvdztcIjpcIuKHlFwiLFwiJkRvdWJsZUxlZnRUZWU7XCI6XCLiq6RcIixcIiZEb3VibGVMb25nTGVmdEFycm93O1wiOlwi4p+4XCIsXCImRG91YmxlTG9uZ0xlZnRSaWdodEFycm93O1wiOlwi4p+6XCIsXCImRG91YmxlTG9uZ1JpZ2h0QXJyb3c7XCI6XCLin7lcIixcIiZEb3VibGVSaWdodEFycm93O1wiOlwi4oeSXCIsXCImRG91YmxlUmlnaHRUZWU7XCI6XCLiiqhcIixcIiZEb3VibGVVcEFycm93O1wiOlwi4oeRXCIsXCImRG91YmxlVXBEb3duQXJyb3c7XCI6XCLih5VcIixcIiZEb3VibGVWZXJ0aWNhbEJhcjtcIjpcIuKIpVwiLFwiJkRvd25BcnJvdztcIjpcIuKGk1wiLFwiJkRvd25BcnJvd0JhcjtcIjpcIuKkk1wiLFwiJkRvd25BcnJvd1VwQXJyb3c7XCI6XCLih7VcIixcIiZEb3duQnJldmU7XCI6XCLMkVwiLFwiJkRvd25MZWZ0UmlnaHRWZWN0b3I7XCI6XCLipZBcIixcIiZEb3duTGVmdFRlZVZlY3RvcjtcIjpcIuKlnlwiLFwiJkRvd25MZWZ0VmVjdG9yO1wiOlwi4oa9XCIsXCImRG93bkxlZnRWZWN0b3JCYXI7XCI6XCLipZZcIixcIiZEb3duUmlnaHRUZWVWZWN0b3I7XCI6XCLipZ9cIixcIiZEb3duUmlnaHRWZWN0b3I7XCI6XCLih4FcIixcIiZEb3duUmlnaHRWZWN0b3JCYXI7XCI6XCLipZdcIixcIiZEb3duVGVlO1wiOlwi4oqkXCIsXCImRG93blRlZUFycm93O1wiOlwi4oanXCIsXCImRG93bmFycm93O1wiOlwi4oeTXCIsXCImRHNjcjtcIjpcIvCdkp9cIixcIiZEc3Ryb2s7XCI6XCLEkFwiLFwiJkVORztcIjpcIsWKXCIsXCImRVRIXCI6XCLDkFwiLFwiJkVUSDtcIjpcIsOQXCIsXCImRWFjdXRlXCI6XCLDiVwiLFwiJkVhY3V0ZTtcIjpcIsOJXCIsXCImRWNhcm9uO1wiOlwixJpcIixcIiZFY2lyY1wiOlwiw4pcIixcIiZFY2lyYztcIjpcIsOKXCIsXCImRWN5O1wiOlwi0K1cIixcIiZFZG90O1wiOlwixJZcIixcIiZFZnI7XCI6XCLwnZSIXCIsXCImRWdyYXZlXCI6XCLDiFwiLFwiJkVncmF2ZTtcIjpcIsOIXCIsXCImRWxlbWVudDtcIjpcIuKIiFwiLFwiJkVtYWNyO1wiOlwixJJcIixcIiZFbXB0eVNtYWxsU3F1YXJlO1wiOlwi4pe7XCIsXCImRW1wdHlWZXJ5U21hbGxTcXVhcmU7XCI6XCLilqtcIixcIiZFb2dvbjtcIjpcIsSYXCIsXCImRW9wZjtcIjpcIvCdlLxcIixcIiZFcHNpbG9uO1wiOlwizpVcIixcIiZFcXVhbDtcIjpcIuKptVwiLFwiJkVxdWFsVGlsZGU7XCI6XCLiiYJcIixcIiZFcXVpbGlicml1bTtcIjpcIuKHjFwiLFwiJkVzY3I7XCI6XCLihLBcIixcIiZFc2ltO1wiOlwi4qmzXCIsXCImRXRhO1wiOlwizpdcIixcIiZFdW1sXCI6XCLDi1wiLFwiJkV1bWw7XCI6XCLDi1wiLFwiJkV4aXN0cztcIjpcIuKIg1wiLFwiJkV4cG9uZW50aWFsRTtcIjpcIuKFh1wiLFwiJkZjeTtcIjpcItCkXCIsXCImRmZyO1wiOlwi8J2UiVwiLFwiJkZpbGxlZFNtYWxsU3F1YXJlO1wiOlwi4pe8XCIsXCImRmlsbGVkVmVyeVNtYWxsU3F1YXJlO1wiOlwi4paqXCIsXCImRm9wZjtcIjpcIvCdlL1cIixcIiZGb3JBbGw7XCI6XCLiiIBcIixcIiZGb3VyaWVydHJmO1wiOlwi4oSxXCIsXCImRnNjcjtcIjpcIuKEsVwiLFwiJkdKY3k7XCI6XCLQg1wiLFwiJkdUXCI6XCI+XCIsXCImR1Q7XCI6XCI+XCIsXCImR2FtbWE7XCI6XCLOk1wiLFwiJkdhbW1hZDtcIjpcIs+cXCIsXCImR2JyZXZlO1wiOlwixJ5cIixcIiZHY2VkaWw7XCI6XCLEolwiLFwiJkdjaXJjO1wiOlwixJxcIixcIiZHY3k7XCI6XCLQk1wiLFwiJkdkb3Q7XCI6XCLEoFwiLFwiJkdmcjtcIjpcIvCdlIpcIixcIiZHZztcIjpcIuKLmVwiLFwiJkdvcGY7XCI6XCLwnZS+XCIsXCImR3JlYXRlckVxdWFsO1wiOlwi4omlXCIsXCImR3JlYXRlckVxdWFsTGVzcztcIjpcIuKLm1wiLFwiJkdyZWF0ZXJGdWxsRXF1YWw7XCI6XCLiiadcIixcIiZHcmVhdGVyR3JlYXRlcjtcIjpcIuKqolwiLFwiJkdyZWF0ZXJMZXNzO1wiOlwi4om3XCIsXCImR3JlYXRlclNsYW50RXF1YWw7XCI6XCLiqb5cIixcIiZHcmVhdGVyVGlsZGU7XCI6XCLiibNcIixcIiZHc2NyO1wiOlwi8J2SolwiLFwiJkd0O1wiOlwi4omrXCIsXCImSEFSRGN5O1wiOlwi0KpcIixcIiZIYWNlaztcIjpcIsuHXCIsXCImSGF0O1wiOlwiXlwiLFwiJkhjaXJjO1wiOlwixKRcIixcIiZIZnI7XCI6XCLihIxcIixcIiZIaWxiZXJ0U3BhY2U7XCI6XCLihItcIixcIiZIb3BmO1wiOlwi4oSNXCIsXCImSG9yaXpvbnRhbExpbmU7XCI6XCLilIBcIixcIiZIc2NyO1wiOlwi4oSLXCIsXCImSHN0cm9rO1wiOlwixKZcIixcIiZIdW1wRG93bkh1bXA7XCI6XCLiiY5cIixcIiZIdW1wRXF1YWw7XCI6XCLiiY9cIixcIiZJRWN5O1wiOlwi0JVcIixcIiZJSmxpZztcIjpcIsSyXCIsXCImSU9jeTtcIjpcItCBXCIsXCImSWFjdXRlXCI6XCLDjVwiLFwiJklhY3V0ZTtcIjpcIsONXCIsXCImSWNpcmNcIjpcIsOOXCIsXCImSWNpcmM7XCI6XCLDjlwiLFwiJkljeTtcIjpcItCYXCIsXCImSWRvdDtcIjpcIsSwXCIsXCImSWZyO1wiOlwi4oSRXCIsXCImSWdyYXZlXCI6XCLDjFwiLFwiJklncmF2ZTtcIjpcIsOMXCIsXCImSW07XCI6XCLihJFcIixcIiZJbWFjcjtcIjpcIsSqXCIsXCImSW1hZ2luYXJ5STtcIjpcIuKFiFwiLFwiJkltcGxpZXM7XCI6XCLih5JcIixcIiZJbnQ7XCI6XCLiiKxcIixcIiZJbnRlZ3JhbDtcIjpcIuKIq1wiLFwiJkludGVyc2VjdGlvbjtcIjpcIuKLglwiLFwiJkludmlzaWJsZUNvbW1hO1wiOlwi4oGjXCIsXCImSW52aXNpYmxlVGltZXM7XCI6XCLigaJcIixcIiZJb2dvbjtcIjpcIsSuXCIsXCImSW9wZjtcIjpcIvCdlYBcIixcIiZJb3RhO1wiOlwizplcIixcIiZJc2NyO1wiOlwi4oSQXCIsXCImSXRpbGRlO1wiOlwixKhcIixcIiZJdWtjeTtcIjpcItCGXCIsXCImSXVtbFwiOlwiw49cIixcIiZJdW1sO1wiOlwiw49cIixcIiZKY2lyYztcIjpcIsS0XCIsXCImSmN5O1wiOlwi0JlcIixcIiZKZnI7XCI6XCLwnZSNXCIsXCImSm9wZjtcIjpcIvCdlYFcIixcIiZKc2NyO1wiOlwi8J2SpVwiLFwiJkpzZXJjeTtcIjpcItCIXCIsXCImSnVrY3k7XCI6XCLQhFwiLFwiJktIY3k7XCI6XCLQpVwiLFwiJktKY3k7XCI6XCLQjFwiLFwiJkthcHBhO1wiOlwizppcIixcIiZLY2VkaWw7XCI6XCLEtlwiLFwiJktjeTtcIjpcItCaXCIsXCImS2ZyO1wiOlwi8J2UjlwiLFwiJktvcGY7XCI6XCLwnZWCXCIsXCImS3NjcjtcIjpcIvCdkqZcIixcIiZMSmN5O1wiOlwi0IlcIixcIiZMVFwiOlwiPFwiLFwiJkxUO1wiOlwiPFwiLFwiJkxhY3V0ZTtcIjpcIsS5XCIsXCImTGFtYmRhO1wiOlwizptcIixcIiZMYW5nO1wiOlwi4p+qXCIsXCImTGFwbGFjZXRyZjtcIjpcIuKEklwiLFwiJkxhcnI7XCI6XCLihp5cIixcIiZMY2Fyb247XCI6XCLEvVwiLFwiJkxjZWRpbDtcIjpcIsS7XCIsXCImTGN5O1wiOlwi0JtcIixcIiZMZWZ0QW5nbGVCcmFja2V0O1wiOlwi4p+oXCIsXCImTGVmdEFycm93O1wiOlwi4oaQXCIsXCImTGVmdEFycm93QmFyO1wiOlwi4oekXCIsXCImTGVmdEFycm93UmlnaHRBcnJvdztcIjpcIuKHhlwiLFwiJkxlZnRDZWlsaW5nO1wiOlwi4oyIXCIsXCImTGVmdERvdWJsZUJyYWNrZXQ7XCI6XCLin6ZcIixcIiZMZWZ0RG93blRlZVZlY3RvcjtcIjpcIuKloVwiLFwiJkxlZnREb3duVmVjdG9yO1wiOlwi4oeDXCIsXCImTGVmdERvd25WZWN0b3JCYXI7XCI6XCLipZlcIixcIiZMZWZ0Rmxvb3I7XCI6XCLijIpcIixcIiZMZWZ0UmlnaHRBcnJvdztcIjpcIuKGlFwiLFwiJkxlZnRSaWdodFZlY3RvcjtcIjpcIuKljlwiLFwiJkxlZnRUZWU7XCI6XCLiiqNcIixcIiZMZWZ0VGVlQXJyb3c7XCI6XCLihqRcIixcIiZMZWZ0VGVlVmVjdG9yO1wiOlwi4qWaXCIsXCImTGVmdFRyaWFuZ2xlO1wiOlwi4oqyXCIsXCImTGVmdFRyaWFuZ2xlQmFyO1wiOlwi4qePXCIsXCImTGVmdFRyaWFuZ2xlRXF1YWw7XCI6XCLiirRcIixcIiZMZWZ0VXBEb3duVmVjdG9yO1wiOlwi4qWRXCIsXCImTGVmdFVwVGVlVmVjdG9yO1wiOlwi4qWgXCIsXCImTGVmdFVwVmVjdG9yO1wiOlwi4oa/XCIsXCImTGVmdFVwVmVjdG9yQmFyO1wiOlwi4qWYXCIsXCImTGVmdFZlY3RvcjtcIjpcIuKGvFwiLFwiJkxlZnRWZWN0b3JCYXI7XCI6XCLipZJcIixcIiZMZWZ0YXJyb3c7XCI6XCLih5BcIixcIiZMZWZ0cmlnaHRhcnJvdztcIjpcIuKHlFwiLFwiJkxlc3NFcXVhbEdyZWF0ZXI7XCI6XCLii5pcIixcIiZMZXNzRnVsbEVxdWFsO1wiOlwi4ommXCIsXCImTGVzc0dyZWF0ZXI7XCI6XCLiibZcIixcIiZMZXNzTGVzcztcIjpcIuKqoVwiLFwiJkxlc3NTbGFudEVxdWFsO1wiOlwi4qm9XCIsXCImTGVzc1RpbGRlO1wiOlwi4omyXCIsXCImTGZyO1wiOlwi8J2Uj1wiLFwiJkxsO1wiOlwi4ouYXCIsXCImTGxlZnRhcnJvdztcIjpcIuKHmlwiLFwiJkxtaWRvdDtcIjpcIsS/XCIsXCImTG9uZ0xlZnRBcnJvdztcIjpcIuKftVwiLFwiJkxvbmdMZWZ0UmlnaHRBcnJvdztcIjpcIuKft1wiLFwiJkxvbmdSaWdodEFycm93O1wiOlwi4p+2XCIsXCImTG9uZ2xlZnRhcnJvdztcIjpcIuKfuFwiLFwiJkxvbmdsZWZ0cmlnaHRhcnJvdztcIjpcIuKfulwiLFwiJkxvbmdyaWdodGFycm93O1wiOlwi4p+5XCIsXCImTG9wZjtcIjpcIvCdlYNcIixcIiZMb3dlckxlZnRBcnJvdztcIjpcIuKGmVwiLFwiJkxvd2VyUmlnaHRBcnJvdztcIjpcIuKGmFwiLFwiJkxzY3I7XCI6XCLihJJcIixcIiZMc2g7XCI6XCLihrBcIixcIiZMc3Ryb2s7XCI6XCLFgVwiLFwiJkx0O1wiOlwi4omqXCIsXCImTWFwO1wiOlwi4qSFXCIsXCImTWN5O1wiOlwi0JxcIixcIiZNZWRpdW1TcGFjZTtcIjpcIuKBn1wiLFwiJk1lbGxpbnRyZjtcIjpcIuKEs1wiLFwiJk1mcjtcIjpcIvCdlJBcIixcIiZNaW51c1BsdXM7XCI6XCLiiJNcIixcIiZNb3BmO1wiOlwi8J2VhFwiLFwiJk1zY3I7XCI6XCLihLNcIixcIiZNdTtcIjpcIs6cXCIsXCImTkpjeTtcIjpcItCKXCIsXCImTmFjdXRlO1wiOlwixYNcIixcIiZOY2Fyb247XCI6XCLFh1wiLFwiJk5jZWRpbDtcIjpcIsWFXCIsXCImTmN5O1wiOlwi0J1cIixcIiZOZWdhdGl2ZU1lZGl1bVNwYWNlO1wiOlwi4oCLXCIsXCImTmVnYXRpdmVUaGlja1NwYWNlO1wiOlwi4oCLXCIsXCImTmVnYXRpdmVUaGluU3BhY2U7XCI6XCLigItcIixcIiZOZWdhdGl2ZVZlcnlUaGluU3BhY2U7XCI6XCLigItcIixcIiZOZXN0ZWRHcmVhdGVyR3JlYXRlcjtcIjpcIuKJq1wiLFwiJk5lc3RlZExlc3NMZXNzO1wiOlwi4omqXCIsXCImTmV3TGluZTtcIjpcIlxcblwiLFwiJk5mcjtcIjpcIvCdlJFcIixcIiZOb0JyZWFrO1wiOlwi4oGgXCIsXCImTm9uQnJlYWtpbmdTcGFjZTtcIjpcIsKgXCIsXCImTm9wZjtcIjpcIuKElVwiLFwiJk5vdDtcIjpcIuKrrFwiLFwiJk5vdENvbmdydWVudDtcIjpcIuKJolwiLFwiJk5vdEN1cENhcDtcIjpcIuKJrVwiLFwiJk5vdERvdWJsZVZlcnRpY2FsQmFyO1wiOlwi4oimXCIsXCImTm90RWxlbWVudDtcIjpcIuKIiVwiLFwiJk5vdEVxdWFsO1wiOlwi4omgXCIsXCImTm90RXF1YWxUaWxkZTtcIjpcIuKJgsy4XCIsXCImTm90RXhpc3RzO1wiOlwi4oiEXCIsXCImTm90R3JlYXRlcjtcIjpcIuKJr1wiLFwiJk5vdEdyZWF0ZXJFcXVhbDtcIjpcIuKJsVwiLFwiJk5vdEdyZWF0ZXJGdWxsRXF1YWw7XCI6XCLiiafMuFwiLFwiJk5vdEdyZWF0ZXJHcmVhdGVyO1wiOlwi4omrzLhcIixcIiZOb3RHcmVhdGVyTGVzcztcIjpcIuKJuVwiLFwiJk5vdEdyZWF0ZXJTbGFudEVxdWFsO1wiOlwi4qm+zLhcIixcIiZOb3RHcmVhdGVyVGlsZGU7XCI6XCLiibVcIixcIiZOb3RIdW1wRG93bkh1bXA7XCI6XCLiiY7MuFwiLFwiJk5vdEh1bXBFcXVhbDtcIjpcIuKJj8y4XCIsXCImTm90TGVmdFRyaWFuZ2xlO1wiOlwi4ouqXCIsXCImTm90TGVmdFRyaWFuZ2xlQmFyO1wiOlwi4qePzLhcIixcIiZOb3RMZWZ0VHJpYW5nbGVFcXVhbDtcIjpcIuKLrFwiLFwiJk5vdExlc3M7XCI6XCLiia5cIixcIiZOb3RMZXNzRXF1YWw7XCI6XCLiibBcIixcIiZOb3RMZXNzR3JlYXRlcjtcIjpcIuKJuFwiLFwiJk5vdExlc3NMZXNzO1wiOlwi4omqzLhcIixcIiZOb3RMZXNzU2xhbnRFcXVhbDtcIjpcIuKpvcy4XCIsXCImTm90TGVzc1RpbGRlO1wiOlwi4om0XCIsXCImTm90TmVzdGVkR3JlYXRlckdyZWF0ZXI7XCI6XCLiqqLMuFwiLFwiJk5vdE5lc3RlZExlc3NMZXNzO1wiOlwi4qqhzLhcIixcIiZOb3RQcmVjZWRlcztcIjpcIuKKgFwiLFwiJk5vdFByZWNlZGVzRXF1YWw7XCI6XCLiqq/MuFwiLFwiJk5vdFByZWNlZGVzU2xhbnRFcXVhbDtcIjpcIuKLoFwiLFwiJk5vdFJldmVyc2VFbGVtZW50O1wiOlwi4oiMXCIsXCImTm90UmlnaHRUcmlhbmdsZTtcIjpcIuKLq1wiLFwiJk5vdFJpZ2h0VHJpYW5nbGVCYXI7XCI6XCLip5DMuFwiLFwiJk5vdFJpZ2h0VHJpYW5nbGVFcXVhbDtcIjpcIuKLrVwiLFwiJk5vdFNxdWFyZVN1YnNldDtcIjpcIuKKj8y4XCIsXCImTm90U3F1YXJlU3Vic2V0RXF1YWw7XCI6XCLii6JcIixcIiZOb3RTcXVhcmVTdXBlcnNldDtcIjpcIuKKkMy4XCIsXCImTm90U3F1YXJlU3VwZXJzZXRFcXVhbDtcIjpcIuKLo1wiLFwiJk5vdFN1YnNldDtcIjpcIuKKguKDklwiLFwiJk5vdFN1YnNldEVxdWFsO1wiOlwi4oqIXCIsXCImTm90U3VjY2VlZHM7XCI6XCLiioFcIixcIiZOb3RTdWNjZWVkc0VxdWFsO1wiOlwi4qqwzLhcIixcIiZOb3RTdWNjZWVkc1NsYW50RXF1YWw7XCI6XCLii6FcIixcIiZOb3RTdWNjZWVkc1RpbGRlO1wiOlwi4om/zLhcIixcIiZOb3RTdXBlcnNldDtcIjpcIuKKg+KDklwiLFwiJk5vdFN1cGVyc2V0RXF1YWw7XCI6XCLiiolcIixcIiZOb3RUaWxkZTtcIjpcIuKJgVwiLFwiJk5vdFRpbGRlRXF1YWw7XCI6XCLiiYRcIixcIiZOb3RUaWxkZUZ1bGxFcXVhbDtcIjpcIuKJh1wiLFwiJk5vdFRpbGRlVGlsZGU7XCI6XCLiiYlcIixcIiZOb3RWZXJ0aWNhbEJhcjtcIjpcIuKIpFwiLFwiJk5zY3I7XCI6XCLwnZKpXCIsXCImTnRpbGRlXCI6XCLDkVwiLFwiJk50aWxkZTtcIjpcIsORXCIsXCImTnU7XCI6XCLOnVwiLFwiJk9FbGlnO1wiOlwixZJcIixcIiZPYWN1dGVcIjpcIsOTXCIsXCImT2FjdXRlO1wiOlwiw5NcIixcIiZPY2lyY1wiOlwiw5RcIixcIiZPY2lyYztcIjpcIsOUXCIsXCImT2N5O1wiOlwi0J5cIixcIiZPZGJsYWM7XCI6XCLFkFwiLFwiJk9mcjtcIjpcIvCdlJJcIixcIiZPZ3JhdmVcIjpcIsOSXCIsXCImT2dyYXZlO1wiOlwiw5JcIixcIiZPbWFjcjtcIjpcIsWMXCIsXCImT21lZ2E7XCI6XCLOqVwiLFwiJk9taWNyb247XCI6XCLOn1wiLFwiJk9vcGY7XCI6XCLwnZWGXCIsXCImT3BlbkN1cmx5RG91YmxlUXVvdGU7XCI6XCLigJxcIixcIiZPcGVuQ3VybHlRdW90ZTtcIjpcIuKAmFwiLFwiJk9yO1wiOlwi4qmUXCIsXCImT3NjcjtcIjpcIvCdkqpcIixcIiZPc2xhc2hcIjpcIsOYXCIsXCImT3NsYXNoO1wiOlwiw5hcIixcIiZPdGlsZGVcIjpcIsOVXCIsXCImT3RpbGRlO1wiOlwiw5VcIixcIiZPdGltZXM7XCI6XCLiqLdcIixcIiZPdW1sXCI6XCLDllwiLFwiJk91bWw7XCI6XCLDllwiLFwiJk92ZXJCYXI7XCI6XCLigL5cIixcIiZPdmVyQnJhY2U7XCI6XCLij55cIixcIiZPdmVyQnJhY2tldDtcIjpcIuKOtFwiLFwiJk92ZXJQYXJlbnRoZXNpcztcIjpcIuKPnFwiLFwiJlBhcnRpYWxEO1wiOlwi4oiCXCIsXCImUGN5O1wiOlwi0J9cIixcIiZQZnI7XCI6XCLwnZSTXCIsXCImUGhpO1wiOlwizqZcIixcIiZQaTtcIjpcIs6gXCIsXCImUGx1c01pbnVzO1wiOlwiwrFcIixcIiZQb2luY2FyZXBsYW5lO1wiOlwi4oSMXCIsXCImUG9wZjtcIjpcIuKEmVwiLFwiJlByO1wiOlwi4qq7XCIsXCImUHJlY2VkZXM7XCI6XCLiibpcIixcIiZQcmVjZWRlc0VxdWFsO1wiOlwi4qqvXCIsXCImUHJlY2VkZXNTbGFudEVxdWFsO1wiOlwi4om8XCIsXCImUHJlY2VkZXNUaWxkZTtcIjpcIuKJvlwiLFwiJlByaW1lO1wiOlwi4oCzXCIsXCImUHJvZHVjdDtcIjpcIuKIj1wiLFwiJlByb3BvcnRpb247XCI6XCLiiLdcIixcIiZQcm9wb3J0aW9uYWw7XCI6XCLiiJ1cIixcIiZQc2NyO1wiOlwi8J2Sq1wiLFwiJlBzaTtcIjpcIs6oXCIsXCImUVVPVFwiOidcIicsXCImUVVPVDtcIjonXCInLFwiJlFmcjtcIjpcIvCdlJRcIixcIiZRb3BmO1wiOlwi4oSaXCIsXCImUXNjcjtcIjpcIvCdkqxcIixcIiZSQmFycjtcIjpcIuKkkFwiLFwiJlJFR1wiOlwiwq5cIixcIiZSRUc7XCI6XCLCrlwiLFwiJlJhY3V0ZTtcIjpcIsWUXCIsXCImUmFuZztcIjpcIuKfq1wiLFwiJlJhcnI7XCI6XCLihqBcIixcIiZSYXJydGw7XCI6XCLipJZcIixcIiZSY2Fyb247XCI6XCLFmFwiLFwiJlJjZWRpbDtcIjpcIsWWXCIsXCImUmN5O1wiOlwi0KBcIixcIiZSZTtcIjpcIuKEnFwiLFwiJlJldmVyc2VFbGVtZW50O1wiOlwi4oiLXCIsXCImUmV2ZXJzZUVxdWlsaWJyaXVtO1wiOlwi4oeLXCIsXCImUmV2ZXJzZVVwRXF1aWxpYnJpdW07XCI6XCLipa9cIixcIiZSZnI7XCI6XCLihJxcIixcIiZSaG87XCI6XCLOoVwiLFwiJlJpZ2h0QW5nbGVCcmFja2V0O1wiOlwi4p+pXCIsXCImUmlnaHRBcnJvdztcIjpcIuKGklwiLFwiJlJpZ2h0QXJyb3dCYXI7XCI6XCLih6VcIixcIiZSaWdodEFycm93TGVmdEFycm93O1wiOlwi4oeEXCIsXCImUmlnaHRDZWlsaW5nO1wiOlwi4oyJXCIsXCImUmlnaHREb3VibGVCcmFja2V0O1wiOlwi4p+nXCIsXCImUmlnaHREb3duVGVlVmVjdG9yO1wiOlwi4qWdXCIsXCImUmlnaHREb3duVmVjdG9yO1wiOlwi4oeCXCIsXCImUmlnaHREb3duVmVjdG9yQmFyO1wiOlwi4qWVXCIsXCImUmlnaHRGbG9vcjtcIjpcIuKMi1wiLFwiJlJpZ2h0VGVlO1wiOlwi4oqiXCIsXCImUmlnaHRUZWVBcnJvdztcIjpcIuKGplwiLFwiJlJpZ2h0VGVlVmVjdG9yO1wiOlwi4qWbXCIsXCImUmlnaHRUcmlhbmdsZTtcIjpcIuKKs1wiLFwiJlJpZ2h0VHJpYW5nbGVCYXI7XCI6XCLip5BcIixcIiZSaWdodFRyaWFuZ2xlRXF1YWw7XCI6XCLiirVcIixcIiZSaWdodFVwRG93blZlY3RvcjtcIjpcIuKlj1wiLFwiJlJpZ2h0VXBUZWVWZWN0b3I7XCI6XCLipZxcIixcIiZSaWdodFVwVmVjdG9yO1wiOlwi4oa+XCIsXCImUmlnaHRVcFZlY3RvckJhcjtcIjpcIuKllFwiLFwiJlJpZ2h0VmVjdG9yO1wiOlwi4oeAXCIsXCImUmlnaHRWZWN0b3JCYXI7XCI6XCLipZNcIixcIiZSaWdodGFycm93O1wiOlwi4oeSXCIsXCImUm9wZjtcIjpcIuKEnVwiLFwiJlJvdW5kSW1wbGllcztcIjpcIuKlsFwiLFwiJlJyaWdodGFycm93O1wiOlwi4oebXCIsXCImUnNjcjtcIjpcIuKEm1wiLFwiJlJzaDtcIjpcIuKGsVwiLFwiJlJ1bGVEZWxheWVkO1wiOlwi4qe0XCIsXCImU0hDSGN5O1wiOlwi0KlcIixcIiZTSGN5O1wiOlwi0KhcIixcIiZTT0ZUY3k7XCI6XCLQrFwiLFwiJlNhY3V0ZTtcIjpcIsWaXCIsXCImU2M7XCI6XCLiqrxcIixcIiZTY2Fyb247XCI6XCLFoFwiLFwiJlNjZWRpbDtcIjpcIsWeXCIsXCImU2NpcmM7XCI6XCLFnFwiLFwiJlNjeTtcIjpcItChXCIsXCImU2ZyO1wiOlwi8J2UllwiLFwiJlNob3J0RG93bkFycm93O1wiOlwi4oaTXCIsXCImU2hvcnRMZWZ0QXJyb3c7XCI6XCLihpBcIixcIiZTaG9ydFJpZ2h0QXJyb3c7XCI6XCLihpJcIixcIiZTaG9ydFVwQXJyb3c7XCI6XCLihpFcIixcIiZTaWdtYTtcIjpcIs6jXCIsXCImU21hbGxDaXJjbGU7XCI6XCLiiJhcIixcIiZTb3BmO1wiOlwi8J2VilwiLFwiJlNxcnQ7XCI6XCLiiJpcIixcIiZTcXVhcmU7XCI6XCLilqFcIixcIiZTcXVhcmVJbnRlcnNlY3Rpb247XCI6XCLiipNcIixcIiZTcXVhcmVTdWJzZXQ7XCI6XCLiio9cIixcIiZTcXVhcmVTdWJzZXRFcXVhbDtcIjpcIuKKkVwiLFwiJlNxdWFyZVN1cGVyc2V0O1wiOlwi4oqQXCIsXCImU3F1YXJlU3VwZXJzZXRFcXVhbDtcIjpcIuKKklwiLFwiJlNxdWFyZVVuaW9uO1wiOlwi4oqUXCIsXCImU3NjcjtcIjpcIvCdkq5cIixcIiZTdGFyO1wiOlwi4ouGXCIsXCImU3ViO1wiOlwi4ouQXCIsXCImU3Vic2V0O1wiOlwi4ouQXCIsXCImU3Vic2V0RXF1YWw7XCI6XCLiioZcIixcIiZTdWNjZWVkcztcIjpcIuKJu1wiLFwiJlN1Y2NlZWRzRXF1YWw7XCI6XCLiqrBcIixcIiZTdWNjZWVkc1NsYW50RXF1YWw7XCI6XCLiib1cIixcIiZTdWNjZWVkc1RpbGRlO1wiOlwi4om/XCIsXCImU3VjaFRoYXQ7XCI6XCLiiItcIixcIiZTdW07XCI6XCLiiJFcIixcIiZTdXA7XCI6XCLii5FcIixcIiZTdXBlcnNldDtcIjpcIuKKg1wiLFwiJlN1cGVyc2V0RXF1YWw7XCI6XCLiiodcIixcIiZTdXBzZXQ7XCI6XCLii5FcIixcIiZUSE9STlwiOlwiw55cIixcIiZUSE9STjtcIjpcIsOeXCIsXCImVFJBREU7XCI6XCLihKJcIixcIiZUU0hjeTtcIjpcItCLXCIsXCImVFNjeTtcIjpcItCmXCIsXCImVGFiO1wiOlwiXFx0XCIsXCImVGF1O1wiOlwizqRcIixcIiZUY2Fyb247XCI6XCLFpFwiLFwiJlRjZWRpbDtcIjpcIsWiXCIsXCImVGN5O1wiOlwi0KJcIixcIiZUZnI7XCI6XCLwnZSXXCIsXCImVGhlcmVmb3JlO1wiOlwi4oi0XCIsXCImVGhldGE7XCI6XCLOmFwiLFwiJlRoaWNrU3BhY2U7XCI6XCLigZ/igIpcIixcIiZUaGluU3BhY2U7XCI6XCLigIlcIixcIiZUaWxkZTtcIjpcIuKIvFwiLFwiJlRpbGRlRXF1YWw7XCI6XCLiiYNcIixcIiZUaWxkZUZ1bGxFcXVhbDtcIjpcIuKJhVwiLFwiJlRpbGRlVGlsZGU7XCI6XCLiiYhcIixcIiZUb3BmO1wiOlwi8J2Vi1wiLFwiJlRyaXBsZURvdDtcIjpcIuKDm1wiLFwiJlRzY3I7XCI6XCLwnZKvXCIsXCImVHN0cm9rO1wiOlwixaZcIixcIiZVYWN1dGVcIjpcIsOaXCIsXCImVWFjdXRlO1wiOlwiw5pcIixcIiZVYXJyO1wiOlwi4oafXCIsXCImVWFycm9jaXI7XCI6XCLipYlcIixcIiZVYnJjeTtcIjpcItCOXCIsXCImVWJyZXZlO1wiOlwixaxcIixcIiZVY2lyY1wiOlwiw5tcIixcIiZVY2lyYztcIjpcIsObXCIsXCImVWN5O1wiOlwi0KNcIixcIiZVZGJsYWM7XCI6XCLFsFwiLFwiJlVmcjtcIjpcIvCdlJhcIixcIiZVZ3JhdmVcIjpcIsOZXCIsXCImVWdyYXZlO1wiOlwiw5lcIixcIiZVbWFjcjtcIjpcIsWqXCIsXCImVW5kZXJCYXI7XCI6XCJfXCIsXCImVW5kZXJCcmFjZTtcIjpcIuKPn1wiLFwiJlVuZGVyQnJhY2tldDtcIjpcIuKOtVwiLFwiJlVuZGVyUGFyZW50aGVzaXM7XCI6XCLij51cIixcIiZVbmlvbjtcIjpcIuKLg1wiLFwiJlVuaW9uUGx1cztcIjpcIuKKjlwiLFwiJlVvZ29uO1wiOlwixbJcIixcIiZVb3BmO1wiOlwi8J2VjFwiLFwiJlVwQXJyb3c7XCI6XCLihpFcIixcIiZVcEFycm93QmFyO1wiOlwi4qSSXCIsXCImVXBBcnJvd0Rvd25BcnJvdztcIjpcIuKHhVwiLFwiJlVwRG93bkFycm93O1wiOlwi4oaVXCIsXCImVXBFcXVpbGlicml1bTtcIjpcIuKlrlwiLFwiJlVwVGVlO1wiOlwi4oqlXCIsXCImVXBUZWVBcnJvdztcIjpcIuKGpVwiLFwiJlVwYXJyb3c7XCI6XCLih5FcIixcIiZVcGRvd25hcnJvdztcIjpcIuKHlVwiLFwiJlVwcGVyTGVmdEFycm93O1wiOlwi4oaWXCIsXCImVXBwZXJSaWdodEFycm93O1wiOlwi4oaXXCIsXCImVXBzaTtcIjpcIs+SXCIsXCImVXBzaWxvbjtcIjpcIs6lXCIsXCImVXJpbmc7XCI6XCLFrlwiLFwiJlVzY3I7XCI6XCLwnZKwXCIsXCImVXRpbGRlO1wiOlwixahcIixcIiZVdW1sXCI6XCLDnFwiLFwiJlV1bWw7XCI6XCLDnFwiLFwiJlZEYXNoO1wiOlwi4oqrXCIsXCImVmJhcjtcIjpcIuKrq1wiLFwiJlZjeTtcIjpcItCSXCIsXCImVmRhc2g7XCI6XCLiiqlcIixcIiZWZGFzaGw7XCI6XCLiq6ZcIixcIiZWZWU7XCI6XCLii4FcIixcIiZWZXJiYXI7XCI6XCLigJZcIixcIiZWZXJ0O1wiOlwi4oCWXCIsXCImVmVydGljYWxCYXI7XCI6XCLiiKNcIixcIiZWZXJ0aWNhbExpbmU7XCI6XCJ8XCIsXCImVmVydGljYWxTZXBhcmF0b3I7XCI6XCLinZhcIixcIiZWZXJ0aWNhbFRpbGRlO1wiOlwi4omAXCIsXCImVmVyeVRoaW5TcGFjZTtcIjpcIuKAilwiLFwiJlZmcjtcIjpcIvCdlJlcIixcIiZWb3BmO1wiOlwi8J2VjVwiLFwiJlZzY3I7XCI6XCLwnZKxXCIsXCImVnZkYXNoO1wiOlwi4oqqXCIsXCImV2NpcmM7XCI6XCLFtFwiLFwiJldlZGdlO1wiOlwi4ouAXCIsXCImV2ZyO1wiOlwi8J2UmlwiLFwiJldvcGY7XCI6XCLwnZWOXCIsXCImV3NjcjtcIjpcIvCdkrJcIixcIiZYZnI7XCI6XCLwnZSbXCIsXCImWGk7XCI6XCLOnlwiLFwiJlhvcGY7XCI6XCLwnZWPXCIsXCImWHNjcjtcIjpcIvCdkrNcIixcIiZZQWN5O1wiOlwi0K9cIixcIiZZSWN5O1wiOlwi0IdcIixcIiZZVWN5O1wiOlwi0K5cIixcIiZZYWN1dGVcIjpcIsOdXCIsXCImWWFjdXRlO1wiOlwiw51cIixcIiZZY2lyYztcIjpcIsW2XCIsXCImWWN5O1wiOlwi0KtcIixcIiZZZnI7XCI6XCLwnZScXCIsXCImWW9wZjtcIjpcIvCdlZBcIixcIiZZc2NyO1wiOlwi8J2StFwiLFwiJll1bWw7XCI6XCLFuFwiLFwiJlpIY3k7XCI6XCLQllwiLFwiJlphY3V0ZTtcIjpcIsW5XCIsXCImWmNhcm9uO1wiOlwixb1cIixcIiZaY3k7XCI6XCLQl1wiLFwiJlpkb3Q7XCI6XCLFu1wiLFwiJlplcm9XaWR0aFNwYWNlO1wiOlwi4oCLXCIsXCImWmV0YTtcIjpcIs6WXCIsXCImWmZyO1wiOlwi4oSoXCIsXCImWm9wZjtcIjpcIuKEpFwiLFwiJlpzY3I7XCI6XCLwnZK1XCIsXCImYWFjdXRlXCI6XCLDoVwiLFwiJmFhY3V0ZTtcIjpcIsOhXCIsXCImYWJyZXZlO1wiOlwixINcIixcIiZhYztcIjpcIuKIvlwiLFwiJmFjRTtcIjpcIuKIvsyzXCIsXCImYWNkO1wiOlwi4oi/XCIsXCImYWNpcmNcIjpcIsOiXCIsXCImYWNpcmM7XCI6XCLDolwiLFwiJmFjdXRlXCI6XCLCtFwiLFwiJmFjdXRlO1wiOlwiwrRcIixcIiZhY3k7XCI6XCLQsFwiLFwiJmFlbGlnXCI6XCLDplwiLFwiJmFlbGlnO1wiOlwiw6ZcIixcIiZhZjtcIjpcIuKBoVwiLFwiJmFmcjtcIjpcIvCdlJ5cIixcIiZhZ3JhdmVcIjpcIsOgXCIsXCImYWdyYXZlO1wiOlwiw6BcIixcIiZhbGVmc3ltO1wiOlwi4oS1XCIsXCImYWxlcGg7XCI6XCLihLVcIixcIiZhbHBoYTtcIjpcIs6xXCIsXCImYW1hY3I7XCI6XCLEgVwiLFwiJmFtYWxnO1wiOlwi4qi/XCIsXCImYW1wXCI6XCImXCIsXCImYW1wO1wiOlwiJlwiLFwiJmFuZDtcIjpcIuKIp1wiLFwiJmFuZGFuZDtcIjpcIuKplVwiLFwiJmFuZGQ7XCI6XCLiqZxcIixcIiZhbmRzbG9wZTtcIjpcIuKpmFwiLFwiJmFuZHY7XCI6XCLiqZpcIixcIiZhbmc7XCI6XCLiiKBcIixcIiZhbmdlO1wiOlwi4qakXCIsXCImYW5nbGU7XCI6XCLiiKBcIixcIiZhbmdtc2Q7XCI6XCLiiKFcIixcIiZhbmdtc2RhYTtcIjpcIuKmqFwiLFwiJmFuZ21zZGFiO1wiOlwi4qapXCIsXCImYW5nbXNkYWM7XCI6XCLipqpcIixcIiZhbmdtc2RhZDtcIjpcIuKmq1wiLFwiJmFuZ21zZGFlO1wiOlwi4qasXCIsXCImYW5nbXNkYWY7XCI6XCLipq1cIixcIiZhbmdtc2RhZztcIjpcIuKmrlwiLFwiJmFuZ21zZGFoO1wiOlwi4qavXCIsXCImYW5ncnQ7XCI6XCLiiJ9cIixcIiZhbmdydHZiO1wiOlwi4oq+XCIsXCImYW5ncnR2YmQ7XCI6XCLipp1cIixcIiZhbmdzcGg7XCI6XCLiiKJcIixcIiZhbmdzdDtcIjpcIsOFXCIsXCImYW5nemFycjtcIjpcIuKNvFwiLFwiJmFvZ29uO1wiOlwixIVcIixcIiZhb3BmO1wiOlwi8J2VklwiLFwiJmFwO1wiOlwi4omIXCIsXCImYXBFO1wiOlwi4qmwXCIsXCImYXBhY2lyO1wiOlwi4qmvXCIsXCImYXBlO1wiOlwi4omKXCIsXCImYXBpZDtcIjpcIuKJi1wiLFwiJmFwb3M7XCI6XCInXCIsXCImYXBwcm94O1wiOlwi4omIXCIsXCImYXBwcm94ZXE7XCI6XCLiiYpcIixcIiZhcmluZ1wiOlwiw6VcIixcIiZhcmluZztcIjpcIsOlXCIsXCImYXNjcjtcIjpcIvCdkrZcIixcIiZhc3Q7XCI6XCIqXCIsXCImYXN5bXA7XCI6XCLiiYhcIixcIiZhc3ltcGVxO1wiOlwi4omNXCIsXCImYXRpbGRlXCI6XCLDo1wiLFwiJmF0aWxkZTtcIjpcIsOjXCIsXCImYXVtbFwiOlwiw6RcIixcIiZhdW1sO1wiOlwiw6RcIixcIiZhd2NvbmludDtcIjpcIuKIs1wiLFwiJmF3aW50O1wiOlwi4qiRXCIsXCImYk5vdDtcIjpcIuKrrVwiLFwiJmJhY2tjb25nO1wiOlwi4omMXCIsXCImYmFja2Vwc2lsb247XCI6XCLPtlwiLFwiJmJhY2twcmltZTtcIjpcIuKAtVwiLFwiJmJhY2tzaW07XCI6XCLiiL1cIixcIiZiYWNrc2ltZXE7XCI6XCLii41cIixcIiZiYXJ2ZWU7XCI6XCLiir1cIixcIiZiYXJ3ZWQ7XCI6XCLijIVcIixcIiZiYXJ3ZWRnZTtcIjpcIuKMhVwiLFwiJmJicms7XCI6XCLijrVcIixcIiZiYnJrdGJyaztcIjpcIuKOtlwiLFwiJmJjb25nO1wiOlwi4omMXCIsXCImYmN5O1wiOlwi0LFcIixcIiZiZHF1bztcIjpcIuKAnlwiLFwiJmJlY2F1cztcIjpcIuKItVwiLFwiJmJlY2F1c2U7XCI6XCLiiLVcIixcIiZiZW1wdHl2O1wiOlwi4qawXCIsXCImYmVwc2k7XCI6XCLPtlwiLFwiJmJlcm5vdTtcIjpcIuKErFwiLFwiJmJldGE7XCI6XCLOslwiLFwiJmJldGg7XCI6XCLihLZcIixcIiZiZXR3ZWVuO1wiOlwi4omsXCIsXCImYmZyO1wiOlwi8J2Un1wiLFwiJmJpZ2NhcDtcIjpcIuKLglwiLFwiJmJpZ2NpcmM7XCI6XCLil69cIixcIiZiaWdjdXA7XCI6XCLii4NcIixcIiZiaWdvZG90O1wiOlwi4qiAXCIsXCImYmlnb3BsdXM7XCI6XCLiqIFcIixcIiZiaWdvdGltZXM7XCI6XCLiqIJcIixcIiZiaWdzcWN1cDtcIjpcIuKohlwiLFwiJmJpZ3N0YXI7XCI6XCLimIVcIixcIiZiaWd0cmlhbmdsZWRvd247XCI6XCLilr1cIixcIiZiaWd0cmlhbmdsZXVwO1wiOlwi4pazXCIsXCImYmlndXBsdXM7XCI6XCLiqIRcIixcIiZiaWd2ZWU7XCI6XCLii4FcIixcIiZiaWd3ZWRnZTtcIjpcIuKLgFwiLFwiJmJrYXJvdztcIjpcIuKkjVwiLFwiJmJsYWNrbG96ZW5nZTtcIjpcIuKnq1wiLFwiJmJsYWNrc3F1YXJlO1wiOlwi4paqXCIsXCImYmxhY2t0cmlhbmdsZTtcIjpcIuKWtFwiLFwiJmJsYWNrdHJpYW5nbGVkb3duO1wiOlwi4pa+XCIsXCImYmxhY2t0cmlhbmdsZWxlZnQ7XCI6XCLil4JcIixcIiZibGFja3RyaWFuZ2xlcmlnaHQ7XCI6XCLilrhcIixcIiZibGFuaztcIjpcIuKQo1wiLFwiJmJsazEyO1wiOlwi4paSXCIsXCImYmxrMTQ7XCI6XCLilpFcIixcIiZibGszNDtcIjpcIuKWk1wiLFwiJmJsb2NrO1wiOlwi4paIXCIsXCImYm5lO1wiOlwiPeKDpVwiLFwiJmJuZXF1aXY7XCI6XCLiiaHig6VcIixcIiZibm90O1wiOlwi4oyQXCIsXCImYm9wZjtcIjpcIvCdlZNcIixcIiZib3Q7XCI6XCLiiqVcIixcIiZib3R0b207XCI6XCLiiqVcIixcIiZib3d0aWU7XCI6XCLii4hcIixcIiZib3hETDtcIjpcIuKVl1wiLFwiJmJveERSO1wiOlwi4pWUXCIsXCImYm94RGw7XCI6XCLilZZcIixcIiZib3hEcjtcIjpcIuKVk1wiLFwiJmJveEg7XCI6XCLilZBcIixcIiZib3hIRDtcIjpcIuKVplwiLFwiJmJveEhVO1wiOlwi4pWpXCIsXCImYm94SGQ7XCI6XCLilaRcIixcIiZib3hIdTtcIjpcIuKVp1wiLFwiJmJveFVMO1wiOlwi4pWdXCIsXCImYm94VVI7XCI6XCLilZpcIixcIiZib3hVbDtcIjpcIuKVnFwiLFwiJmJveFVyO1wiOlwi4pWZXCIsXCImYm94VjtcIjpcIuKVkVwiLFwiJmJveFZIO1wiOlwi4pWsXCIsXCImYm94Vkw7XCI6XCLilaNcIixcIiZib3hWUjtcIjpcIuKVoFwiLFwiJmJveFZoO1wiOlwi4pWrXCIsXCImYm94Vmw7XCI6XCLilaJcIixcIiZib3hWcjtcIjpcIuKVn1wiLFwiJmJveGJveDtcIjpcIuKniVwiLFwiJmJveGRMO1wiOlwi4pWVXCIsXCImYm94ZFI7XCI6XCLilZJcIixcIiZib3hkbDtcIjpcIuKUkFwiLFwiJmJveGRyO1wiOlwi4pSMXCIsXCImYm94aDtcIjpcIuKUgFwiLFwiJmJveGhEO1wiOlwi4pWlXCIsXCImYm94aFU7XCI6XCLilahcIixcIiZib3hoZDtcIjpcIuKUrFwiLFwiJmJveGh1O1wiOlwi4pS0XCIsXCImYm94bWludXM7XCI6XCLiip9cIixcIiZib3hwbHVzO1wiOlwi4oqeXCIsXCImYm94dGltZXM7XCI6XCLiiqBcIixcIiZib3h1TDtcIjpcIuKVm1wiLFwiJmJveHVSO1wiOlwi4pWYXCIsXCImYm94dWw7XCI6XCLilJhcIixcIiZib3h1cjtcIjpcIuKUlFwiLFwiJmJveHY7XCI6XCLilIJcIixcIiZib3h2SDtcIjpcIuKVqlwiLFwiJmJveHZMO1wiOlwi4pWhXCIsXCImYm94dlI7XCI6XCLilZ5cIixcIiZib3h2aDtcIjpcIuKUvFwiLFwiJmJveHZsO1wiOlwi4pSkXCIsXCImYm94dnI7XCI6XCLilJxcIixcIiZicHJpbWU7XCI6XCLigLVcIixcIiZicmV2ZTtcIjpcIsuYXCIsXCImYnJ2YmFyXCI6XCLCplwiLFwiJmJydmJhcjtcIjpcIsKmXCIsXCImYnNjcjtcIjpcIvCdkrdcIixcIiZic2VtaTtcIjpcIuKBj1wiLFwiJmJzaW07XCI6XCLiiL1cIixcIiZic2ltZTtcIjpcIuKLjVwiLFwiJmJzb2w7XCI6XCJcXFxcXCIsXCImYnNvbGI7XCI6XCLip4VcIixcIiZic29saHN1YjtcIjpcIuKfiFwiLFwiJmJ1bGw7XCI6XCLigKJcIixcIiZidWxsZXQ7XCI6XCLigKJcIixcIiZidW1wO1wiOlwi4omOXCIsXCImYnVtcEU7XCI6XCLiqq5cIixcIiZidW1wZTtcIjpcIuKJj1wiLFwiJmJ1bXBlcTtcIjpcIuKJj1wiLFwiJmNhY3V0ZTtcIjpcIsSHXCIsXCImY2FwO1wiOlwi4oipXCIsXCImY2FwYW5kO1wiOlwi4qmEXCIsXCImY2FwYnJjdXA7XCI6XCLiqYlcIixcIiZjYXBjYXA7XCI6XCLiqYtcIixcIiZjYXBjdXA7XCI6XCLiqYdcIixcIiZjYXBkb3Q7XCI6XCLiqYBcIixcIiZjYXBzO1wiOlwi4oip77iAXCIsXCImY2FyZXQ7XCI6XCLigYFcIixcIiZjYXJvbjtcIjpcIsuHXCIsXCImY2NhcHM7XCI6XCLiqY1cIixcIiZjY2Fyb247XCI6XCLEjVwiLFwiJmNjZWRpbFwiOlwiw6dcIixcIiZjY2VkaWw7XCI6XCLDp1wiLFwiJmNjaXJjO1wiOlwixIlcIixcIiZjY3VwcztcIjpcIuKpjFwiLFwiJmNjdXBzc207XCI6XCLiqZBcIixcIiZjZG90O1wiOlwixItcIixcIiZjZWRpbFwiOlwiwrhcIixcIiZjZWRpbDtcIjpcIsK4XCIsXCImY2VtcHR5djtcIjpcIuKmslwiLFwiJmNlbnRcIjpcIsKiXCIsXCImY2VudDtcIjpcIsKiXCIsXCImY2VudGVyZG90O1wiOlwiwrdcIixcIiZjZnI7XCI6XCLwnZSgXCIsXCImY2hjeTtcIjpcItGHXCIsXCImY2hlY2s7XCI6XCLinJNcIixcIiZjaGVja21hcms7XCI6XCLinJNcIixcIiZjaGk7XCI6XCLPh1wiLFwiJmNpcjtcIjpcIuKXi1wiLFwiJmNpckU7XCI6XCLip4NcIixcIiZjaXJjO1wiOlwiy4ZcIixcIiZjaXJjZXE7XCI6XCLiiZdcIixcIiZjaXJjbGVhcnJvd2xlZnQ7XCI6XCLihrpcIixcIiZjaXJjbGVhcnJvd3JpZ2h0O1wiOlwi4oa7XCIsXCImY2lyY2xlZFI7XCI6XCLCrlwiLFwiJmNpcmNsZWRTO1wiOlwi4pOIXCIsXCImY2lyY2xlZGFzdDtcIjpcIuKKm1wiLFwiJmNpcmNsZWRjaXJjO1wiOlwi4oqaXCIsXCImY2lyY2xlZGRhc2g7XCI6XCLiip1cIixcIiZjaXJlO1wiOlwi4omXXCIsXCImY2lyZm5pbnQ7XCI6XCLiqJBcIixcIiZjaXJtaWQ7XCI6XCLiq69cIixcIiZjaXJzY2lyO1wiOlwi4qeCXCIsXCImY2x1YnM7XCI6XCLimaNcIixcIiZjbHVic3VpdDtcIjpcIuKZo1wiLFwiJmNvbG9uO1wiOlwiOlwiLFwiJmNvbG9uZTtcIjpcIuKJlFwiLFwiJmNvbG9uZXE7XCI6XCLiiZRcIixcIiZjb21tYTtcIjpcIixcIixcIiZjb21tYXQ7XCI6XCJAXCIsXCImY29tcDtcIjpcIuKIgVwiLFwiJmNvbXBmbjtcIjpcIuKImFwiLFwiJmNvbXBsZW1lbnQ7XCI6XCLiiIFcIixcIiZjb21wbGV4ZXM7XCI6XCLihIJcIixcIiZjb25nO1wiOlwi4omFXCIsXCImY29uZ2RvdDtcIjpcIuKprVwiLFwiJmNvbmludDtcIjpcIuKIrlwiLFwiJmNvcGY7XCI6XCLwnZWUXCIsXCImY29wcm9kO1wiOlwi4oiQXCIsXCImY29weVwiOlwiwqlcIixcIiZjb3B5O1wiOlwiwqlcIixcIiZjb3B5c3I7XCI6XCLihJdcIixcIiZjcmFycjtcIjpcIuKGtVwiLFwiJmNyb3NzO1wiOlwi4pyXXCIsXCImY3NjcjtcIjpcIvCdkrhcIixcIiZjc3ViO1wiOlwi4quPXCIsXCImY3N1YmU7XCI6XCLiq5FcIixcIiZjc3VwO1wiOlwi4quQXCIsXCImY3N1cGU7XCI6XCLiq5JcIixcIiZjdGRvdDtcIjpcIuKLr1wiLFwiJmN1ZGFycmw7XCI6XCLipLhcIixcIiZjdWRhcnJyO1wiOlwi4qS1XCIsXCImY3VlcHI7XCI6XCLii55cIixcIiZjdWVzYztcIjpcIuKLn1wiLFwiJmN1bGFycjtcIjpcIuKGtlwiLFwiJmN1bGFycnA7XCI6XCLipL1cIixcIiZjdXA7XCI6XCLiiKpcIixcIiZjdXBicmNhcDtcIjpcIuKpiFwiLFwiJmN1cGNhcDtcIjpcIuKphlwiLFwiJmN1cGN1cDtcIjpcIuKpilwiLFwiJmN1cGRvdDtcIjpcIuKKjVwiLFwiJmN1cG9yO1wiOlwi4qmFXCIsXCImY3VwcztcIjpcIuKIqu+4gFwiLFwiJmN1cmFycjtcIjpcIuKGt1wiLFwiJmN1cmFycm07XCI6XCLipLxcIixcIiZjdXJseWVxcHJlYztcIjpcIuKLnlwiLFwiJmN1cmx5ZXFzdWNjO1wiOlwi4oufXCIsXCImY3VybHl2ZWU7XCI6XCLii45cIixcIiZjdXJseXdlZGdlO1wiOlwi4ouPXCIsXCImY3VycmVuXCI6XCLCpFwiLFwiJmN1cnJlbjtcIjpcIsKkXCIsXCImY3VydmVhcnJvd2xlZnQ7XCI6XCLihrZcIixcIiZjdXJ2ZWFycm93cmlnaHQ7XCI6XCLihrdcIixcIiZjdXZlZTtcIjpcIuKLjlwiLFwiJmN1d2VkO1wiOlwi4ouPXCIsXCImY3djb25pbnQ7XCI6XCLiiLJcIixcIiZjd2ludDtcIjpcIuKIsVwiLFwiJmN5bGN0eTtcIjpcIuKMrVwiLFwiJmRBcnI7XCI6XCLih5NcIixcIiZkSGFyO1wiOlwi4qWlXCIsXCImZGFnZ2VyO1wiOlwi4oCgXCIsXCImZGFsZXRoO1wiOlwi4oS4XCIsXCImZGFycjtcIjpcIuKGk1wiLFwiJmRhc2g7XCI6XCLigJBcIixcIiZkYXNodjtcIjpcIuKKo1wiLFwiJmRia2Fyb3c7XCI6XCLipI9cIixcIiZkYmxhYztcIjpcIsudXCIsXCImZGNhcm9uO1wiOlwixI9cIixcIiZkY3k7XCI6XCLQtFwiLFwiJmRkO1wiOlwi4oWGXCIsXCImZGRhZ2dlcjtcIjpcIuKAoVwiLFwiJmRkYXJyO1wiOlwi4oeKXCIsXCImZGRvdHNlcTtcIjpcIuKpt1wiLFwiJmRlZ1wiOlwiwrBcIixcIiZkZWc7XCI6XCLCsFwiLFwiJmRlbHRhO1wiOlwizrRcIixcIiZkZW1wdHl2O1wiOlwi4qaxXCIsXCImZGZpc2h0O1wiOlwi4qW/XCIsXCImZGZyO1wiOlwi8J2UoVwiLFwiJmRoYXJsO1wiOlwi4oeDXCIsXCImZGhhcnI7XCI6XCLih4JcIixcIiZkaWFtO1wiOlwi4ouEXCIsXCImZGlhbW9uZDtcIjpcIuKLhFwiLFwiJmRpYW1vbmRzdWl0O1wiOlwi4pmmXCIsXCImZGlhbXM7XCI6XCLimaZcIixcIiZkaWU7XCI6XCLCqFwiLFwiJmRpZ2FtbWE7XCI6XCLPnVwiLFwiJmRpc2luO1wiOlwi4ouyXCIsXCImZGl2O1wiOlwiw7dcIixcIiZkaXZpZGVcIjpcIsO3XCIsXCImZGl2aWRlO1wiOlwiw7dcIixcIiZkaXZpZGVvbnRpbWVzO1wiOlwi4ouHXCIsXCImZGl2b254O1wiOlwi4ouHXCIsXCImZGpjeTtcIjpcItGSXCIsXCImZGxjb3JuO1wiOlwi4oyeXCIsXCImZGxjcm9wO1wiOlwi4oyNXCIsXCImZG9sbGFyO1wiOlwiJFwiLFwiJmRvcGY7XCI6XCLwnZWVXCIsXCImZG90O1wiOlwiy5lcIixcIiZkb3RlcTtcIjpcIuKJkFwiLFwiJmRvdGVxZG90O1wiOlwi4omRXCIsXCImZG90bWludXM7XCI6XCLiiLhcIixcIiZkb3RwbHVzO1wiOlwi4oiUXCIsXCImZG90c3F1YXJlO1wiOlwi4oqhXCIsXCImZG91YmxlYmFyd2VkZ2U7XCI6XCLijIZcIixcIiZkb3duYXJyb3c7XCI6XCLihpNcIixcIiZkb3duZG93bmFycm93cztcIjpcIuKHilwiLFwiJmRvd25oYXJwb29ubGVmdDtcIjpcIuKHg1wiLFwiJmRvd25oYXJwb29ucmlnaHQ7XCI6XCLih4JcIixcIiZkcmJrYXJvdztcIjpcIuKkkFwiLFwiJmRyY29ybjtcIjpcIuKMn1wiLFwiJmRyY3JvcDtcIjpcIuKMjFwiLFwiJmRzY3I7XCI6XCLwnZK5XCIsXCImZHNjeTtcIjpcItGVXCIsXCImZHNvbDtcIjpcIuKntlwiLFwiJmRzdHJvaztcIjpcIsSRXCIsXCImZHRkb3Q7XCI6XCLii7FcIixcIiZkdHJpO1wiOlwi4pa/XCIsXCImZHRyaWY7XCI6XCLilr5cIixcIiZkdWFycjtcIjpcIuKHtVwiLFwiJmR1aGFyO1wiOlwi4qWvXCIsXCImZHdhbmdsZTtcIjpcIuKmplwiLFwiJmR6Y3k7XCI6XCLRn1wiLFwiJmR6aWdyYXJyO1wiOlwi4p+/XCIsXCImZUREb3Q7XCI6XCLiqbdcIixcIiZlRG90O1wiOlwi4omRXCIsXCImZWFjdXRlXCI6XCLDqVwiLFwiJmVhY3V0ZTtcIjpcIsOpXCIsXCImZWFzdGVyO1wiOlwi4qmuXCIsXCImZWNhcm9uO1wiOlwixJtcIixcIiZlY2lyO1wiOlwi4omWXCIsXCImZWNpcmNcIjpcIsOqXCIsXCImZWNpcmM7XCI6XCLDqlwiLFwiJmVjb2xvbjtcIjpcIuKJlVwiLFwiJmVjeTtcIjpcItGNXCIsXCImZWRvdDtcIjpcIsSXXCIsXCImZWU7XCI6XCLihYdcIixcIiZlZkRvdDtcIjpcIuKJklwiLFwiJmVmcjtcIjpcIvCdlKJcIixcIiZlZztcIjpcIuKqmlwiLFwiJmVncmF2ZVwiOlwiw6hcIixcIiZlZ3JhdmU7XCI6XCLDqFwiLFwiJmVncztcIjpcIuKqllwiLFwiJmVnc2RvdDtcIjpcIuKqmFwiLFwiJmVsO1wiOlwi4qqZXCIsXCImZWxpbnRlcnM7XCI6XCLij6dcIixcIiZlbGw7XCI6XCLihJNcIixcIiZlbHM7XCI6XCLiqpVcIixcIiZlbHNkb3Q7XCI6XCLiqpdcIixcIiZlbWFjcjtcIjpcIsSTXCIsXCImZW1wdHk7XCI6XCLiiIVcIixcIiZlbXB0eXNldDtcIjpcIuKIhVwiLFwiJmVtcHR5djtcIjpcIuKIhVwiLFwiJmVtc3AxMztcIjpcIuKAhFwiLFwiJmVtc3AxNDtcIjpcIuKAhVwiLFwiJmVtc3A7XCI6XCLigINcIixcIiZlbmc7XCI6XCLFi1wiLFwiJmVuc3A7XCI6XCLigIJcIixcIiZlb2dvbjtcIjpcIsSZXCIsXCImZW9wZjtcIjpcIvCdlZZcIixcIiZlcGFyO1wiOlwi4ouVXCIsXCImZXBhcnNsO1wiOlwi4qejXCIsXCImZXBsdXM7XCI6XCLiqbFcIixcIiZlcHNpO1wiOlwizrVcIixcIiZlcHNpbG9uO1wiOlwizrVcIixcIiZlcHNpdjtcIjpcIs+1XCIsXCImZXFjaXJjO1wiOlwi4omWXCIsXCImZXFjb2xvbjtcIjpcIuKJlVwiLFwiJmVxc2ltO1wiOlwi4omCXCIsXCImZXFzbGFudGd0cjtcIjpcIuKqllwiLFwiJmVxc2xhbnRsZXNzO1wiOlwi4qqVXCIsXCImZXF1YWxzO1wiOlwiPVwiLFwiJmVxdWVzdDtcIjpcIuKJn1wiLFwiJmVxdWl2O1wiOlwi4omhXCIsXCImZXF1aXZERDtcIjpcIuKpuFwiLFwiJmVxdnBhcnNsO1wiOlwi4qelXCIsXCImZXJEb3Q7XCI6XCLiiZNcIixcIiZlcmFycjtcIjpcIuKlsVwiLFwiJmVzY3I7XCI6XCLihK9cIixcIiZlc2RvdDtcIjpcIuKJkFwiLFwiJmVzaW07XCI6XCLiiYJcIixcIiZldGE7XCI6XCLOt1wiLFwiJmV0aFwiOlwiw7BcIixcIiZldGg7XCI6XCLDsFwiLFwiJmV1bWxcIjpcIsOrXCIsXCImZXVtbDtcIjpcIsOrXCIsXCImZXVybztcIjpcIuKCrFwiLFwiJmV4Y2w7XCI6XCIhXCIsXCImZXhpc3Q7XCI6XCLiiINcIixcIiZleHBlY3RhdGlvbjtcIjpcIuKEsFwiLFwiJmV4cG9uZW50aWFsZTtcIjpcIuKFh1wiLFwiJmZhbGxpbmdkb3RzZXE7XCI6XCLiiZJcIixcIiZmY3k7XCI6XCLRhFwiLFwiJmZlbWFsZTtcIjpcIuKZgFwiLFwiJmZmaWxpZztcIjpcIu+sg1wiLFwiJmZmbGlnO1wiOlwi76yAXCIsXCImZmZsbGlnO1wiOlwi76yEXCIsXCImZmZyO1wiOlwi8J2Uo1wiLFwiJmZpbGlnO1wiOlwi76yBXCIsXCImZmpsaWc7XCI6XCJmalwiLFwiJmZsYXQ7XCI6XCLima1cIixcIiZmbGxpZztcIjpcIu+sglwiLFwiJmZsdG5zO1wiOlwi4paxXCIsXCImZm5vZjtcIjpcIsaSXCIsXCImZm9wZjtcIjpcIvCdlZdcIixcIiZmb3JhbGw7XCI6XCLiiIBcIixcIiZmb3JrO1wiOlwi4ouUXCIsXCImZm9ya3Y7XCI6XCLiq5lcIixcIiZmcGFydGludDtcIjpcIuKojVwiLFwiJmZyYWMxMlwiOlwiwr1cIixcIiZmcmFjMTI7XCI6XCLCvVwiLFwiJmZyYWMxMztcIjpcIuKFk1wiLFwiJmZyYWMxNFwiOlwiwrxcIixcIiZmcmFjMTQ7XCI6XCLCvFwiLFwiJmZyYWMxNTtcIjpcIuKFlVwiLFwiJmZyYWMxNjtcIjpcIuKFmVwiLFwiJmZyYWMxODtcIjpcIuKFm1wiLFwiJmZyYWMyMztcIjpcIuKFlFwiLFwiJmZyYWMyNTtcIjpcIuKFllwiLFwiJmZyYWMzNFwiOlwiwr5cIixcIiZmcmFjMzQ7XCI6XCLCvlwiLFwiJmZyYWMzNTtcIjpcIuKFl1wiLFwiJmZyYWMzODtcIjpcIuKFnFwiLFwiJmZyYWM0NTtcIjpcIuKFmFwiLFwiJmZyYWM1NjtcIjpcIuKFmlwiLFwiJmZyYWM1ODtcIjpcIuKFnVwiLFwiJmZyYWM3ODtcIjpcIuKFnlwiLFwiJmZyYXNsO1wiOlwi4oGEXCIsXCImZnJvd247XCI6XCLijKJcIixcIiZmc2NyO1wiOlwi8J2Su1wiLFwiJmdFO1wiOlwi4omnXCIsXCImZ0VsO1wiOlwi4qqMXCIsXCImZ2FjdXRlO1wiOlwix7VcIixcIiZnYW1tYTtcIjpcIs6zXCIsXCImZ2FtbWFkO1wiOlwiz51cIixcIiZnYXA7XCI6XCLiqoZcIixcIiZnYnJldmU7XCI6XCLEn1wiLFwiJmdjaXJjO1wiOlwixJ1cIixcIiZnY3k7XCI6XCLQs1wiLFwiJmdkb3Q7XCI6XCLEoVwiLFwiJmdlO1wiOlwi4omlXCIsXCImZ2VsO1wiOlwi4oubXCIsXCImZ2VxO1wiOlwi4omlXCIsXCImZ2VxcTtcIjpcIuKJp1wiLFwiJmdlcXNsYW50O1wiOlwi4qm+XCIsXCImZ2VzO1wiOlwi4qm+XCIsXCImZ2VzY2M7XCI6XCLiqqlcIixcIiZnZXNkb3Q7XCI6XCLiqoBcIixcIiZnZXNkb3RvO1wiOlwi4qqCXCIsXCImZ2VzZG90b2w7XCI6XCLiqoRcIixcIiZnZXNsO1wiOlwi4oub77iAXCIsXCImZ2VzbGVzO1wiOlwi4qqUXCIsXCImZ2ZyO1wiOlwi8J2UpFwiLFwiJmdnO1wiOlwi4omrXCIsXCImZ2dnO1wiOlwi4ouZXCIsXCImZ2ltZWw7XCI6XCLihLdcIixcIiZnamN5O1wiOlwi0ZNcIixcIiZnbDtcIjpcIuKJt1wiLFwiJmdsRTtcIjpcIuKqklwiLFwiJmdsYTtcIjpcIuKqpVwiLFwiJmdsajtcIjpcIuKqpFwiLFwiJmduRTtcIjpcIuKJqVwiLFwiJmduYXA7XCI6XCLiqopcIixcIiZnbmFwcHJveDtcIjpcIuKqilwiLFwiJmduZTtcIjpcIuKqiFwiLFwiJmduZXE7XCI6XCLiqohcIixcIiZnbmVxcTtcIjpcIuKJqVwiLFwiJmduc2ltO1wiOlwi4ounXCIsXCImZ29wZjtcIjpcIvCdlZhcIixcIiZncmF2ZTtcIjpcImBcIixcIiZnc2NyO1wiOlwi4oSKXCIsXCImZ3NpbTtcIjpcIuKJs1wiLFwiJmdzaW1lO1wiOlwi4qqOXCIsXCImZ3NpbWw7XCI6XCLiqpBcIixcIiZndFwiOlwiPlwiLFwiJmd0O1wiOlwiPlwiLFwiJmd0Y2M7XCI6XCLiqqdcIixcIiZndGNpcjtcIjpcIuKpulwiLFwiJmd0ZG90O1wiOlwi4ouXXCIsXCImZ3RsUGFyO1wiOlwi4qaVXCIsXCImZ3RxdWVzdDtcIjpcIuKpvFwiLFwiJmd0cmFwcHJveDtcIjpcIuKqhlwiLFwiJmd0cmFycjtcIjpcIuKluFwiLFwiJmd0cmRvdDtcIjpcIuKLl1wiLFwiJmd0cmVxbGVzcztcIjpcIuKLm1wiLFwiJmd0cmVxcWxlc3M7XCI6XCLiqoxcIixcIiZndHJsZXNzO1wiOlwi4om3XCIsXCImZ3Ryc2ltO1wiOlwi4omzXCIsXCImZ3ZlcnRuZXFxO1wiOlwi4omp77iAXCIsXCImZ3ZuRTtcIjpcIuKJqe+4gFwiLFwiJmhBcnI7XCI6XCLih5RcIixcIiZoYWlyc3A7XCI6XCLigIpcIixcIiZoYWxmO1wiOlwiwr1cIixcIiZoYW1pbHQ7XCI6XCLihItcIixcIiZoYXJkY3k7XCI6XCLRilwiLFwiJmhhcnI7XCI6XCLihpRcIixcIiZoYXJyY2lyO1wiOlwi4qWIXCIsXCImaGFycnc7XCI6XCLihq1cIixcIiZoYmFyO1wiOlwi4oSPXCIsXCImaGNpcmM7XCI6XCLEpVwiLFwiJmhlYXJ0cztcIjpcIuKZpVwiLFwiJmhlYXJ0c3VpdDtcIjpcIuKZpVwiLFwiJmhlbGxpcDtcIjpcIuKAplwiLFwiJmhlcmNvbjtcIjpcIuKKuVwiLFwiJmhmcjtcIjpcIvCdlKVcIixcIiZoa3NlYXJvdztcIjpcIuKkpVwiLFwiJmhrc3dhcm93O1wiOlwi4qSmXCIsXCImaG9hcnI7XCI6XCLih79cIixcIiZob210aHQ7XCI6XCLiiLtcIixcIiZob29rbGVmdGFycm93O1wiOlwi4oapXCIsXCImaG9va3JpZ2h0YXJyb3c7XCI6XCLihqpcIixcIiZob3BmO1wiOlwi8J2VmVwiLFwiJmhvcmJhcjtcIjpcIuKAlVwiLFwiJmhzY3I7XCI6XCLwnZK9XCIsXCImaHNsYXNoO1wiOlwi4oSPXCIsXCImaHN0cm9rO1wiOlwixKdcIixcIiZoeWJ1bGw7XCI6XCLigYNcIixcIiZoeXBoZW47XCI6XCLigJBcIixcIiZpYWN1dGVcIjpcIsOtXCIsXCImaWFjdXRlO1wiOlwiw61cIixcIiZpYztcIjpcIuKBo1wiLFwiJmljaXJjXCI6XCLDrlwiLFwiJmljaXJjO1wiOlwiw65cIixcIiZpY3k7XCI6XCLQuFwiLFwiJmllY3k7XCI6XCLQtVwiLFwiJmlleGNsXCI6XCLCoVwiLFwiJmlleGNsO1wiOlwiwqFcIixcIiZpZmY7XCI6XCLih5RcIixcIiZpZnI7XCI6XCLwnZSmXCIsXCImaWdyYXZlXCI6XCLDrFwiLFwiJmlncmF2ZTtcIjpcIsOsXCIsXCImaWk7XCI6XCLihYhcIixcIiZpaWlpbnQ7XCI6XCLiqIxcIixcIiZpaWludDtcIjpcIuKIrVwiLFwiJmlpbmZpbjtcIjpcIuKnnFwiLFwiJmlpb3RhO1wiOlwi4oSpXCIsXCImaWpsaWc7XCI6XCLEs1wiLFwiJmltYWNyO1wiOlwixKtcIixcIiZpbWFnZTtcIjpcIuKEkVwiLFwiJmltYWdsaW5lO1wiOlwi4oSQXCIsXCImaW1hZ3BhcnQ7XCI6XCLihJFcIixcIiZpbWF0aDtcIjpcIsSxXCIsXCImaW1vZjtcIjpcIuKKt1wiLFwiJmltcGVkO1wiOlwixrVcIixcIiZpbjtcIjpcIuKIiFwiLFwiJmluY2FyZTtcIjpcIuKEhVwiLFwiJmluZmluO1wiOlwi4oieXCIsXCImaW5maW50aWU7XCI6XCLip51cIixcIiZpbm9kb3Q7XCI6XCLEsVwiLFwiJmludDtcIjpcIuKIq1wiLFwiJmludGNhbDtcIjpcIuKKulwiLFwiJmludGVnZXJzO1wiOlwi4oSkXCIsXCImaW50ZXJjYWw7XCI6XCLiirpcIixcIiZpbnRsYXJoaztcIjpcIuKol1wiLFwiJmludHByb2Q7XCI6XCLiqLxcIixcIiZpb2N5O1wiOlwi0ZFcIixcIiZpb2dvbjtcIjpcIsSvXCIsXCImaW9wZjtcIjpcIvCdlZpcIixcIiZpb3RhO1wiOlwizrlcIixcIiZpcHJvZDtcIjpcIuKovFwiLFwiJmlxdWVzdFwiOlwiwr9cIixcIiZpcXVlc3Q7XCI6XCLCv1wiLFwiJmlzY3I7XCI6XCLwnZK+XCIsXCImaXNpbjtcIjpcIuKIiFwiLFwiJmlzaW5FO1wiOlwi4ou5XCIsXCImaXNpbmRvdDtcIjpcIuKLtVwiLFwiJmlzaW5zO1wiOlwi4ou0XCIsXCImaXNpbnN2O1wiOlwi4ouzXCIsXCImaXNpbnY7XCI6XCLiiIhcIixcIiZpdDtcIjpcIuKBolwiLFwiJml0aWxkZTtcIjpcIsSpXCIsXCImaXVrY3k7XCI6XCLRllwiLFwiJml1bWxcIjpcIsOvXCIsXCImaXVtbDtcIjpcIsOvXCIsXCImamNpcmM7XCI6XCLEtVwiLFwiJmpjeTtcIjpcItC5XCIsXCImamZyO1wiOlwi8J2Up1wiLFwiJmptYXRoO1wiOlwiyLdcIixcIiZqb3BmO1wiOlwi8J2Vm1wiLFwiJmpzY3I7XCI6XCLwnZK/XCIsXCImanNlcmN5O1wiOlwi0ZhcIixcIiZqdWtjeTtcIjpcItGUXCIsXCIma2FwcGE7XCI6XCLOulwiLFwiJmthcHBhdjtcIjpcIs+wXCIsXCIma2NlZGlsO1wiOlwixLdcIixcIiZrY3k7XCI6XCLQulwiLFwiJmtmcjtcIjpcIvCdlKhcIixcIiZrZ3JlZW47XCI6XCLEuFwiLFwiJmtoY3k7XCI6XCLRhVwiLFwiJmtqY3k7XCI6XCLRnFwiLFwiJmtvcGY7XCI6XCLwnZWcXCIsXCIma3NjcjtcIjpcIvCdk4BcIixcIiZsQWFycjtcIjpcIuKHmlwiLFwiJmxBcnI7XCI6XCLih5BcIixcIiZsQXRhaWw7XCI6XCLipJtcIixcIiZsQmFycjtcIjpcIuKkjlwiLFwiJmxFO1wiOlwi4ommXCIsXCImbEVnO1wiOlwi4qqLXCIsXCImbEhhcjtcIjpcIuKlolwiLFwiJmxhY3V0ZTtcIjpcIsS6XCIsXCImbGFlbXB0eXY7XCI6XCLiprRcIixcIiZsYWdyYW47XCI6XCLihJJcIixcIiZsYW1iZGE7XCI6XCLOu1wiLFwiJmxhbmc7XCI6XCLin6hcIixcIiZsYW5nZDtcIjpcIuKmkVwiLFwiJmxhbmdsZTtcIjpcIuKfqFwiLFwiJmxhcDtcIjpcIuKqhVwiLFwiJmxhcXVvXCI6XCLCq1wiLFwiJmxhcXVvO1wiOlwiwqtcIixcIiZsYXJyO1wiOlwi4oaQXCIsXCImbGFycmI7XCI6XCLih6RcIixcIiZsYXJyYmZzO1wiOlwi4qSfXCIsXCImbGFycmZzO1wiOlwi4qSdXCIsXCImbGFycmhrO1wiOlwi4oapXCIsXCImbGFycmxwO1wiOlwi4oarXCIsXCImbGFycnBsO1wiOlwi4qS5XCIsXCImbGFycnNpbTtcIjpcIuKls1wiLFwiJmxhcnJ0bDtcIjpcIuKGolwiLFwiJmxhdDtcIjpcIuKqq1wiLFwiJmxhdGFpbDtcIjpcIuKkmVwiLFwiJmxhdGU7XCI6XCLiqq1cIixcIiZsYXRlcztcIjpcIuKqre+4gFwiLFwiJmxiYXJyO1wiOlwi4qSMXCIsXCImbGJicms7XCI6XCLinbJcIixcIiZsYnJhY2U7XCI6XCJ7XCIsXCImbGJyYWNrO1wiOlwiW1wiLFwiJmxicmtlO1wiOlwi4qaLXCIsXCImbGJya3NsZDtcIjpcIuKmj1wiLFwiJmxicmtzbHU7XCI6XCLipo1cIixcIiZsY2Fyb247XCI6XCLEvlwiLFwiJmxjZWRpbDtcIjpcIsS8XCIsXCImbGNlaWw7XCI6XCLijIhcIixcIiZsY3ViO1wiOlwie1wiLFwiJmxjeTtcIjpcItC7XCIsXCImbGRjYTtcIjpcIuKktlwiLFwiJmxkcXVvO1wiOlwi4oCcXCIsXCImbGRxdW9yO1wiOlwi4oCeXCIsXCImbGRyZGhhcjtcIjpcIuKlp1wiLFwiJmxkcnVzaGFyO1wiOlwi4qWLXCIsXCImbGRzaDtcIjpcIuKGslwiLFwiJmxlO1wiOlwi4omkXCIsXCImbGVmdGFycm93O1wiOlwi4oaQXCIsXCImbGVmdGFycm93dGFpbDtcIjpcIuKGolwiLFwiJmxlZnRoYXJwb29uZG93bjtcIjpcIuKGvVwiLFwiJmxlZnRoYXJwb29udXA7XCI6XCLihrxcIixcIiZsZWZ0bGVmdGFycm93cztcIjpcIuKHh1wiLFwiJmxlZnRyaWdodGFycm93O1wiOlwi4oaUXCIsXCImbGVmdHJpZ2h0YXJyb3dzO1wiOlwi4oeGXCIsXCImbGVmdHJpZ2h0aGFycG9vbnM7XCI6XCLih4tcIixcIiZsZWZ0cmlnaHRzcXVpZ2Fycm93O1wiOlwi4oatXCIsXCImbGVmdHRocmVldGltZXM7XCI6XCLii4tcIixcIiZsZWc7XCI6XCLii5pcIixcIiZsZXE7XCI6XCLiiaRcIixcIiZsZXFxO1wiOlwi4ommXCIsXCImbGVxc2xhbnQ7XCI6XCLiqb1cIixcIiZsZXM7XCI6XCLiqb1cIixcIiZsZXNjYztcIjpcIuKqqFwiLFwiJmxlc2RvdDtcIjpcIuKpv1wiLFwiJmxlc2RvdG87XCI6XCLiqoFcIixcIiZsZXNkb3RvcjtcIjpcIuKqg1wiLFwiJmxlc2c7XCI6XCLii5rvuIBcIixcIiZsZXNnZXM7XCI6XCLiqpNcIixcIiZsZXNzYXBwcm94O1wiOlwi4qqFXCIsXCImbGVzc2RvdDtcIjpcIuKLllwiLFwiJmxlc3NlcWd0cjtcIjpcIuKLmlwiLFwiJmxlc3NlcXFndHI7XCI6XCLiqotcIixcIiZsZXNzZ3RyO1wiOlwi4om2XCIsXCImbGVzc3NpbTtcIjpcIuKJslwiLFwiJmxmaXNodDtcIjpcIuKlvFwiLFwiJmxmbG9vcjtcIjpcIuKMilwiLFwiJmxmcjtcIjpcIvCdlKlcIixcIiZsZztcIjpcIuKJtlwiLFwiJmxnRTtcIjpcIuKqkVwiLFwiJmxoYXJkO1wiOlwi4oa9XCIsXCImbGhhcnU7XCI6XCLihrxcIixcIiZsaGFydWw7XCI6XCLipapcIixcIiZsaGJsaztcIjpcIuKWhFwiLFwiJmxqY3k7XCI6XCLRmVwiLFwiJmxsO1wiOlwi4omqXCIsXCImbGxhcnI7XCI6XCLih4dcIixcIiZsbGNvcm5lcjtcIjpcIuKMnlwiLFwiJmxsaGFyZDtcIjpcIuKlq1wiLFwiJmxsdHJpO1wiOlwi4pe6XCIsXCImbG1pZG90O1wiOlwixYBcIixcIiZsbW91c3Q7XCI6XCLijrBcIixcIiZsbW91c3RhY2hlO1wiOlwi4o6wXCIsXCImbG5FO1wiOlwi4omoXCIsXCImbG5hcDtcIjpcIuKqiVwiLFwiJmxuYXBwcm94O1wiOlwi4qqJXCIsXCImbG5lO1wiOlwi4qqHXCIsXCImbG5lcTtcIjpcIuKqh1wiLFwiJmxuZXFxO1wiOlwi4omoXCIsXCImbG5zaW07XCI6XCLii6ZcIixcIiZsb2FuZztcIjpcIuKfrFwiLFwiJmxvYXJyO1wiOlwi4oe9XCIsXCImbG9icms7XCI6XCLin6ZcIixcIiZsb25nbGVmdGFycm93O1wiOlwi4p+1XCIsXCImbG9uZ2xlZnRyaWdodGFycm93O1wiOlwi4p+3XCIsXCImbG9uZ21hcHN0bztcIjpcIuKfvFwiLFwiJmxvbmdyaWdodGFycm93O1wiOlwi4p+2XCIsXCImbG9vcGFycm93bGVmdDtcIjpcIuKGq1wiLFwiJmxvb3BhcnJvd3JpZ2h0O1wiOlwi4oasXCIsXCImbG9wYXI7XCI6XCLipoVcIixcIiZsb3BmO1wiOlwi8J2VnVwiLFwiJmxvcGx1cztcIjpcIuKorVwiLFwiJmxvdGltZXM7XCI6XCLiqLRcIixcIiZsb3dhc3Q7XCI6XCLiiJdcIixcIiZsb3diYXI7XCI6XCJfXCIsXCImbG96O1wiOlwi4peKXCIsXCImbG96ZW5nZTtcIjpcIuKXilwiLFwiJmxvemY7XCI6XCLip6tcIixcIiZscGFyO1wiOlwiKFwiLFwiJmxwYXJsdDtcIjpcIuKmk1wiLFwiJmxyYXJyO1wiOlwi4oeGXCIsXCImbHJjb3JuZXI7XCI6XCLijJ9cIixcIiZscmhhcjtcIjpcIuKHi1wiLFwiJmxyaGFyZDtcIjpcIuKlrVwiLFwiJmxybTtcIjpcIuKAjlwiLFwiJmxydHJpO1wiOlwi4oq/XCIsXCImbHNhcXVvO1wiOlwi4oC5XCIsXCImbHNjcjtcIjpcIvCdk4FcIixcIiZsc2g7XCI6XCLihrBcIixcIiZsc2ltO1wiOlwi4omyXCIsXCImbHNpbWU7XCI6XCLiqo1cIixcIiZsc2ltZztcIjpcIuKqj1wiLFwiJmxzcWI7XCI6XCJbXCIsXCImbHNxdW87XCI6XCLigJhcIixcIiZsc3F1b3I7XCI6XCLigJpcIixcIiZsc3Ryb2s7XCI6XCLFglwiLFwiJmx0XCI6XCI8XCIsXCImbHQ7XCI6XCI8XCIsXCImbHRjYztcIjpcIuKqplwiLFwiJmx0Y2lyO1wiOlwi4qm5XCIsXCImbHRkb3Q7XCI6XCLii5ZcIixcIiZsdGhyZWU7XCI6XCLii4tcIixcIiZsdGltZXM7XCI6XCLii4lcIixcIiZsdGxhcnI7XCI6XCLipbZcIixcIiZsdHF1ZXN0O1wiOlwi4qm7XCIsXCImbHRyUGFyO1wiOlwi4qaWXCIsXCImbHRyaTtcIjpcIuKXg1wiLFwiJmx0cmllO1wiOlwi4oq0XCIsXCImbHRyaWY7XCI6XCLil4JcIixcIiZsdXJkc2hhcjtcIjpcIuKlilwiLFwiJmx1cnVoYXI7XCI6XCLipaZcIixcIiZsdmVydG5lcXE7XCI6XCLiiajvuIBcIixcIiZsdm5FO1wiOlwi4omo77iAXCIsXCImbUREb3Q7XCI6XCLiiLpcIixcIiZtYWNyXCI6XCLCr1wiLFwiJm1hY3I7XCI6XCLCr1wiLFwiJm1hbGU7XCI6XCLimYJcIixcIiZtYWx0O1wiOlwi4pygXCIsXCImbWFsdGVzZTtcIjpcIuKcoFwiLFwiJm1hcDtcIjpcIuKGplwiLFwiJm1hcHN0bztcIjpcIuKGplwiLFwiJm1hcHN0b2Rvd247XCI6XCLihqdcIixcIiZtYXBzdG9sZWZ0O1wiOlwi4oakXCIsXCImbWFwc3RvdXA7XCI6XCLihqVcIixcIiZtYXJrZXI7XCI6XCLilq5cIixcIiZtY29tbWE7XCI6XCLiqKlcIixcIiZtY3k7XCI6XCLQvFwiLFwiJm1kYXNoO1wiOlwi4oCUXCIsXCImbWVhc3VyZWRhbmdsZTtcIjpcIuKIoVwiLFwiJm1mcjtcIjpcIvCdlKpcIixcIiZtaG87XCI6XCLihKdcIixcIiZtaWNyb1wiOlwiwrVcIixcIiZtaWNybztcIjpcIsK1XCIsXCImbWlkO1wiOlwi4oijXCIsXCImbWlkYXN0O1wiOlwiKlwiLFwiJm1pZGNpcjtcIjpcIuKrsFwiLFwiJm1pZGRvdFwiOlwiwrdcIixcIiZtaWRkb3Q7XCI6XCLCt1wiLFwiJm1pbnVzO1wiOlwi4oiSXCIsXCImbWludXNiO1wiOlwi4oqfXCIsXCImbWludXNkO1wiOlwi4oi4XCIsXCImbWludXNkdTtcIjpcIuKoqlwiLFwiJm1sY3A7XCI6XCLiq5tcIixcIiZtbGRyO1wiOlwi4oCmXCIsXCImbW5wbHVzO1wiOlwi4oiTXCIsXCImbW9kZWxzO1wiOlwi4oqnXCIsXCImbW9wZjtcIjpcIvCdlZ5cIixcIiZtcDtcIjpcIuKIk1wiLFwiJm1zY3I7XCI6XCLwnZOCXCIsXCImbXN0cG9zO1wiOlwi4oi+XCIsXCImbXU7XCI6XCLOvFwiLFwiJm11bHRpbWFwO1wiOlwi4oq4XCIsXCImbXVtYXA7XCI6XCLiirhcIixcIiZuR2c7XCI6XCLii5nMuFwiLFwiJm5HdDtcIjpcIuKJq+KDklwiLFwiJm5HdHY7XCI6XCLiiavMuFwiLFwiJm5MZWZ0YXJyb3c7XCI6XCLih41cIixcIiZuTGVmdHJpZ2h0YXJyb3c7XCI6XCLih45cIixcIiZuTGw7XCI6XCLii5jMuFwiLFwiJm5MdDtcIjpcIuKJquKDklwiLFwiJm5MdHY7XCI6XCLiiarMuFwiLFwiJm5SaWdodGFycm93O1wiOlwi4oePXCIsXCImblZEYXNoO1wiOlwi4oqvXCIsXCImblZkYXNoO1wiOlwi4oquXCIsXCImbmFibGE7XCI6XCLiiIdcIixcIiZuYWN1dGU7XCI6XCLFhFwiLFwiJm5hbmc7XCI6XCLiiKDig5JcIixcIiZuYXA7XCI6XCLiiYlcIixcIiZuYXBFO1wiOlwi4qmwzLhcIixcIiZuYXBpZDtcIjpcIuKJi8y4XCIsXCImbmFwb3M7XCI6XCLFiVwiLFwiJm5hcHByb3g7XCI6XCLiiYlcIixcIiZuYXR1cjtcIjpcIuKZrlwiLFwiJm5hdHVyYWw7XCI6XCLima5cIixcIiZuYXR1cmFscztcIjpcIuKElVwiLFwiJm5ic3BcIjpcIsKgXCIsXCImbmJzcDtcIjpcIsKgXCIsXCImbmJ1bXA7XCI6XCLiiY7MuFwiLFwiJm5idW1wZTtcIjpcIuKJj8y4XCIsXCImbmNhcDtcIjpcIuKpg1wiLFwiJm5jYXJvbjtcIjpcIsWIXCIsXCImbmNlZGlsO1wiOlwixYZcIixcIiZuY29uZztcIjpcIuKJh1wiLFwiJm5jb25nZG90O1wiOlwi4qmtzLhcIixcIiZuY3VwO1wiOlwi4qmCXCIsXCImbmN5O1wiOlwi0L1cIixcIiZuZGFzaDtcIjpcIuKAk1wiLFwiJm5lO1wiOlwi4omgXCIsXCImbmVBcnI7XCI6XCLih5dcIixcIiZuZWFyaGs7XCI6XCLipKRcIixcIiZuZWFycjtcIjpcIuKGl1wiLFwiJm5lYXJyb3c7XCI6XCLihpdcIixcIiZuZWRvdDtcIjpcIuKJkMy4XCIsXCImbmVxdWl2O1wiOlwi4omiXCIsXCImbmVzZWFyO1wiOlwi4qSoXCIsXCImbmVzaW07XCI6XCLiiYLMuFwiLFwiJm5leGlzdDtcIjpcIuKIhFwiLFwiJm5leGlzdHM7XCI6XCLiiIRcIixcIiZuZnI7XCI6XCLwnZSrXCIsXCImbmdFO1wiOlwi4omnzLhcIixcIiZuZ2U7XCI6XCLiibFcIixcIiZuZ2VxO1wiOlwi4omxXCIsXCImbmdlcXE7XCI6XCLiiafMuFwiLFwiJm5nZXFzbGFudDtcIjpcIuKpvsy4XCIsXCImbmdlcztcIjpcIuKpvsy4XCIsXCImbmdzaW07XCI6XCLiibVcIixcIiZuZ3Q7XCI6XCLiia9cIixcIiZuZ3RyO1wiOlwi4omvXCIsXCImbmhBcnI7XCI6XCLih45cIixcIiZuaGFycjtcIjpcIuKGrlwiLFwiJm5ocGFyO1wiOlwi4quyXCIsXCImbmk7XCI6XCLiiItcIixcIiZuaXM7XCI6XCLii7xcIixcIiZuaXNkO1wiOlwi4ou6XCIsXCImbml2O1wiOlwi4oiLXCIsXCImbmpjeTtcIjpcItGaXCIsXCImbmxBcnI7XCI6XCLih41cIixcIiZubEU7XCI6XCLiiabMuFwiLFwiJm5sYXJyO1wiOlwi4oaaXCIsXCImbmxkcjtcIjpcIuKApVwiLFwiJm5sZTtcIjpcIuKJsFwiLFwiJm5sZWZ0YXJyb3c7XCI6XCLihppcIixcIiZubGVmdHJpZ2h0YXJyb3c7XCI6XCLihq5cIixcIiZubGVxO1wiOlwi4omwXCIsXCImbmxlcXE7XCI6XCLiiabMuFwiLFwiJm5sZXFzbGFudDtcIjpcIuKpvcy4XCIsXCImbmxlcztcIjpcIuKpvcy4XCIsXCImbmxlc3M7XCI6XCLiia5cIixcIiZubHNpbTtcIjpcIuKJtFwiLFwiJm5sdDtcIjpcIuKJrlwiLFwiJm5sdHJpO1wiOlwi4ouqXCIsXCImbmx0cmllO1wiOlwi4ousXCIsXCImbm1pZDtcIjpcIuKIpFwiLFwiJm5vcGY7XCI6XCLwnZWfXCIsXCImbm90XCI6XCLCrFwiLFwiJm5vdDtcIjpcIsKsXCIsXCImbm90aW47XCI6XCLiiIlcIixcIiZub3RpbkU7XCI6XCLii7nMuFwiLFwiJm5vdGluZG90O1wiOlwi4ou1zLhcIixcIiZub3RpbnZhO1wiOlwi4oiJXCIsXCImbm90aW52YjtcIjpcIuKLt1wiLFwiJm5vdGludmM7XCI6XCLii7ZcIixcIiZub3RuaTtcIjpcIuKIjFwiLFwiJm5vdG5pdmE7XCI6XCLiiIxcIixcIiZub3RuaXZiO1wiOlwi4ou+XCIsXCImbm90bml2YztcIjpcIuKLvVwiLFwiJm5wYXI7XCI6XCLiiKZcIixcIiZucGFyYWxsZWw7XCI6XCLiiKZcIixcIiZucGFyc2w7XCI6XCLiq73ig6VcIixcIiZucGFydDtcIjpcIuKIgsy4XCIsXCImbnBvbGludDtcIjpcIuKolFwiLFwiJm5wcjtcIjpcIuKKgFwiLFwiJm5wcmN1ZTtcIjpcIuKLoFwiLFwiJm5wcmU7XCI6XCLiqq/MuFwiLFwiJm5wcmVjO1wiOlwi4oqAXCIsXCImbnByZWNlcTtcIjpcIuKqr8y4XCIsXCImbnJBcnI7XCI6XCLih49cIixcIiZucmFycjtcIjpcIuKGm1wiLFwiJm5yYXJyYztcIjpcIuKks8y4XCIsXCImbnJhcnJ3O1wiOlwi4oadzLhcIixcIiZucmlnaHRhcnJvdztcIjpcIuKGm1wiLFwiJm5ydHJpO1wiOlwi4ourXCIsXCImbnJ0cmllO1wiOlwi4outXCIsXCImbnNjO1wiOlwi4oqBXCIsXCImbnNjY3VlO1wiOlwi4ouhXCIsXCImbnNjZTtcIjpcIuKqsMy4XCIsXCImbnNjcjtcIjpcIvCdk4NcIixcIiZuc2hvcnRtaWQ7XCI6XCLiiKRcIixcIiZuc2hvcnRwYXJhbGxlbDtcIjpcIuKIplwiLFwiJm5zaW07XCI6XCLiiYFcIixcIiZuc2ltZTtcIjpcIuKJhFwiLFwiJm5zaW1lcTtcIjpcIuKJhFwiLFwiJm5zbWlkO1wiOlwi4oikXCIsXCImbnNwYXI7XCI6XCLiiKZcIixcIiZuc3FzdWJlO1wiOlwi4ouiXCIsXCImbnNxc3VwZTtcIjpcIuKLo1wiLFwiJm5zdWI7XCI6XCLiioRcIixcIiZuc3ViRTtcIjpcIuKrhcy4XCIsXCImbnN1YmU7XCI6XCLiiohcIixcIiZuc3Vic2V0O1wiOlwi4oqC4oOSXCIsXCImbnN1YnNldGVxO1wiOlwi4oqIXCIsXCImbnN1YnNldGVxcTtcIjpcIuKrhcy4XCIsXCImbnN1Y2M7XCI6XCLiioFcIixcIiZuc3VjY2VxO1wiOlwi4qqwzLhcIixcIiZuc3VwO1wiOlwi4oqFXCIsXCImbnN1cEU7XCI6XCLiq4bMuFwiLFwiJm5zdXBlO1wiOlwi4oqJXCIsXCImbnN1cHNldDtcIjpcIuKKg+KDklwiLFwiJm5zdXBzZXRlcTtcIjpcIuKKiVwiLFwiJm5zdXBzZXRlcXE7XCI6XCLiq4bMuFwiLFwiJm50Z2w7XCI6XCLiiblcIixcIiZudGlsZGVcIjpcIsOxXCIsXCImbnRpbGRlO1wiOlwiw7FcIixcIiZudGxnO1wiOlwi4om4XCIsXCImbnRyaWFuZ2xlbGVmdDtcIjpcIuKLqlwiLFwiJm50cmlhbmdsZWxlZnRlcTtcIjpcIuKLrFwiLFwiJm50cmlhbmdsZXJpZ2h0O1wiOlwi4ourXCIsXCImbnRyaWFuZ2xlcmlnaHRlcTtcIjpcIuKLrVwiLFwiJm51O1wiOlwizr1cIixcIiZudW07XCI6XCIjXCIsXCImbnVtZXJvO1wiOlwi4oSWXCIsXCImbnVtc3A7XCI6XCLigIdcIixcIiZudkRhc2g7XCI6XCLiiq1cIixcIiZudkhhcnI7XCI6XCLipIRcIixcIiZudmFwO1wiOlwi4omN4oOSXCIsXCImbnZkYXNoO1wiOlwi4oqsXCIsXCImbnZnZTtcIjpcIuKJpeKDklwiLFwiJm52Z3Q7XCI6XCI+4oOSXCIsXCImbnZpbmZpbjtcIjpcIuKnnlwiLFwiJm52bEFycjtcIjpcIuKkglwiLFwiJm52bGU7XCI6XCLiiaTig5JcIixcIiZudmx0O1wiOlwiPOKDklwiLFwiJm52bHRyaWU7XCI6XCLiirTig5JcIixcIiZudnJBcnI7XCI6XCLipINcIixcIiZudnJ0cmllO1wiOlwi4oq14oOSXCIsXCImbnZzaW07XCI6XCLiiLzig5JcIixcIiZud0FycjtcIjpcIuKHllwiLFwiJm53YXJoaztcIjpcIuKko1wiLFwiJm53YXJyO1wiOlwi4oaWXCIsXCImbndhcnJvdztcIjpcIuKGllwiLFwiJm53bmVhcjtcIjpcIuKkp1wiLFwiJm9TO1wiOlwi4pOIXCIsXCImb2FjdXRlXCI6XCLDs1wiLFwiJm9hY3V0ZTtcIjpcIsOzXCIsXCImb2FzdDtcIjpcIuKKm1wiLFwiJm9jaXI7XCI6XCLiippcIixcIiZvY2lyY1wiOlwiw7RcIixcIiZvY2lyYztcIjpcIsO0XCIsXCImb2N5O1wiOlwi0L5cIixcIiZvZGFzaDtcIjpcIuKKnVwiLFwiJm9kYmxhYztcIjpcIsWRXCIsXCImb2RpdjtcIjpcIuKouFwiLFwiJm9kb3Q7XCI6XCLiiplcIixcIiZvZHNvbGQ7XCI6XCLiprxcIixcIiZvZWxpZztcIjpcIsWTXCIsXCImb2ZjaXI7XCI6XCLipr9cIixcIiZvZnI7XCI6XCLwnZSsXCIsXCImb2dvbjtcIjpcIsubXCIsXCImb2dyYXZlXCI6XCLDslwiLFwiJm9ncmF2ZTtcIjpcIsOyXCIsXCImb2d0O1wiOlwi4qeBXCIsXCImb2hiYXI7XCI6XCLiprVcIixcIiZvaG07XCI6XCLOqVwiLFwiJm9pbnQ7XCI6XCLiiK5cIixcIiZvbGFycjtcIjpcIuKGulwiLFwiJm9sY2lyO1wiOlwi4qa+XCIsXCImb2xjcm9zcztcIjpcIuKmu1wiLFwiJm9saW5lO1wiOlwi4oC+XCIsXCImb2x0O1wiOlwi4qeAXCIsXCImb21hY3I7XCI6XCLFjVwiLFwiJm9tZWdhO1wiOlwiz4lcIixcIiZvbWljcm9uO1wiOlwizr9cIixcIiZvbWlkO1wiOlwi4qa2XCIsXCImb21pbnVzO1wiOlwi4oqWXCIsXCImb29wZjtcIjpcIvCdlaBcIixcIiZvcGFyO1wiOlwi4qa3XCIsXCImb3BlcnA7XCI6XCLiprlcIixcIiZvcGx1cztcIjpcIuKKlVwiLFwiJm9yO1wiOlwi4oioXCIsXCImb3JhcnI7XCI6XCLihrtcIixcIiZvcmQ7XCI6XCLiqZ1cIixcIiZvcmRlcjtcIjpcIuKEtFwiLFwiJm9yZGVyb2Y7XCI6XCLihLRcIixcIiZvcmRmXCI6XCLCqlwiLFwiJm9yZGY7XCI6XCLCqlwiLFwiJm9yZG1cIjpcIsK6XCIsXCImb3JkbTtcIjpcIsK6XCIsXCImb3JpZ29mO1wiOlwi4oq2XCIsXCImb3JvcjtcIjpcIuKpllwiLFwiJm9yc2xvcGU7XCI6XCLiqZdcIixcIiZvcnY7XCI6XCLiqZtcIixcIiZvc2NyO1wiOlwi4oS0XCIsXCImb3NsYXNoXCI6XCLDuFwiLFwiJm9zbGFzaDtcIjpcIsO4XCIsXCImb3NvbDtcIjpcIuKKmFwiLFwiJm90aWxkZVwiOlwiw7VcIixcIiZvdGlsZGU7XCI6XCLDtVwiLFwiJm90aW1lcztcIjpcIuKKl1wiLFwiJm90aW1lc2FzO1wiOlwi4qi2XCIsXCImb3VtbFwiOlwiw7ZcIixcIiZvdW1sO1wiOlwiw7ZcIixcIiZvdmJhcjtcIjpcIuKMvVwiLFwiJnBhcjtcIjpcIuKIpVwiLFwiJnBhcmFcIjpcIsK2XCIsXCImcGFyYTtcIjpcIsK2XCIsXCImcGFyYWxsZWw7XCI6XCLiiKVcIixcIiZwYXJzaW07XCI6XCLiq7NcIixcIiZwYXJzbDtcIjpcIuKrvVwiLFwiJnBhcnQ7XCI6XCLiiIJcIixcIiZwY3k7XCI6XCLQv1wiLFwiJnBlcmNudDtcIjpcIiVcIixcIiZwZXJpb2Q7XCI6XCIuXCIsXCImcGVybWlsO1wiOlwi4oCwXCIsXCImcGVycDtcIjpcIuKKpVwiLFwiJnBlcnRlbms7XCI6XCLigLFcIixcIiZwZnI7XCI6XCLwnZStXCIsXCImcGhpO1wiOlwiz4ZcIixcIiZwaGl2O1wiOlwiz5VcIixcIiZwaG1tYXQ7XCI6XCLihLNcIixcIiZwaG9uZTtcIjpcIuKYjlwiLFwiJnBpO1wiOlwiz4BcIixcIiZwaXRjaGZvcms7XCI6XCLii5RcIixcIiZwaXY7XCI6XCLPllwiLFwiJnBsYW5jaztcIjpcIuKEj1wiLFwiJnBsYW5ja2g7XCI6XCLihI5cIixcIiZwbGFua3Y7XCI6XCLihI9cIixcIiZwbHVzO1wiOlwiK1wiLFwiJnBsdXNhY2lyO1wiOlwi4qijXCIsXCImcGx1c2I7XCI6XCLiip5cIixcIiZwbHVzY2lyO1wiOlwi4qiiXCIsXCImcGx1c2RvO1wiOlwi4oiUXCIsXCImcGx1c2R1O1wiOlwi4qilXCIsXCImcGx1c2U7XCI6XCLiqbJcIixcIiZwbHVzbW5cIjpcIsKxXCIsXCImcGx1c21uO1wiOlwiwrFcIixcIiZwbHVzc2ltO1wiOlwi4qimXCIsXCImcGx1c3R3bztcIjpcIuKop1wiLFwiJnBtO1wiOlwiwrFcIixcIiZwb2ludGludDtcIjpcIuKolVwiLFwiJnBvcGY7XCI6XCLwnZWhXCIsXCImcG91bmRcIjpcIsKjXCIsXCImcG91bmQ7XCI6XCLCo1wiLFwiJnByO1wiOlwi4om6XCIsXCImcHJFO1wiOlwi4qqzXCIsXCImcHJhcDtcIjpcIuKqt1wiLFwiJnByY3VlO1wiOlwi4om8XCIsXCImcHJlO1wiOlwi4qqvXCIsXCImcHJlYztcIjpcIuKJulwiLFwiJnByZWNhcHByb3g7XCI6XCLiqrdcIixcIiZwcmVjY3VybHllcTtcIjpcIuKJvFwiLFwiJnByZWNlcTtcIjpcIuKqr1wiLFwiJnByZWNuYXBwcm94O1wiOlwi4qq5XCIsXCImcHJlY25lcXE7XCI6XCLiqrVcIixcIiZwcmVjbnNpbTtcIjpcIuKLqFwiLFwiJnByZWNzaW07XCI6XCLiib5cIixcIiZwcmltZTtcIjpcIuKAslwiLFwiJnByaW1lcztcIjpcIuKEmVwiLFwiJnBybkU7XCI6XCLiqrVcIixcIiZwcm5hcDtcIjpcIuKquVwiLFwiJnBybnNpbTtcIjpcIuKLqFwiLFwiJnByb2Q7XCI6XCLiiI9cIixcIiZwcm9mYWxhcjtcIjpcIuKMrlwiLFwiJnByb2ZsaW5lO1wiOlwi4oySXCIsXCImcHJvZnN1cmY7XCI6XCLijJNcIixcIiZwcm9wO1wiOlwi4oidXCIsXCImcHJvcHRvO1wiOlwi4oidXCIsXCImcHJzaW07XCI6XCLiib5cIixcIiZwcnVyZWw7XCI6XCLiirBcIixcIiZwc2NyO1wiOlwi8J2ThVwiLFwiJnBzaTtcIjpcIs+IXCIsXCImcHVuY3NwO1wiOlwi4oCIXCIsXCImcWZyO1wiOlwi8J2UrlwiLFwiJnFpbnQ7XCI6XCLiqIxcIixcIiZxb3BmO1wiOlwi8J2VolwiLFwiJnFwcmltZTtcIjpcIuKBl1wiLFwiJnFzY3I7XCI6XCLwnZOGXCIsXCImcXVhdGVybmlvbnM7XCI6XCLihI1cIixcIiZxdWF0aW50O1wiOlwi4qiWXCIsXCImcXVlc3Q7XCI6XCI/XCIsXCImcXVlc3RlcTtcIjpcIuKJn1wiLFwiJnF1b3RcIjonXCInLFwiJnF1b3Q7XCI6J1wiJyxcIiZyQWFycjtcIjpcIuKHm1wiLFwiJnJBcnI7XCI6XCLih5JcIixcIiZyQXRhaWw7XCI6XCLipJxcIixcIiZyQmFycjtcIjpcIuKkj1wiLFwiJnJIYXI7XCI6XCLipaRcIixcIiZyYWNlO1wiOlwi4oi9zLFcIixcIiZyYWN1dGU7XCI6XCLFlVwiLFwiJnJhZGljO1wiOlwi4oiaXCIsXCImcmFlbXB0eXY7XCI6XCLiprNcIixcIiZyYW5nO1wiOlwi4p+pXCIsXCImcmFuZ2Q7XCI6XCLippJcIixcIiZyYW5nZTtcIjpcIuKmpVwiLFwiJnJhbmdsZTtcIjpcIuKfqVwiLFwiJnJhcXVvXCI6XCLCu1wiLFwiJnJhcXVvO1wiOlwiwrtcIixcIiZyYXJyO1wiOlwi4oaSXCIsXCImcmFycmFwO1wiOlwi4qW1XCIsXCImcmFycmI7XCI6XCLih6VcIixcIiZyYXJyYmZzO1wiOlwi4qSgXCIsXCImcmFycmM7XCI6XCLipLNcIixcIiZyYXJyZnM7XCI6XCLipJ5cIixcIiZyYXJyaGs7XCI6XCLihqpcIixcIiZyYXJybHA7XCI6XCLihqxcIixcIiZyYXJycGw7XCI6XCLipYVcIixcIiZyYXJyc2ltO1wiOlwi4qW0XCIsXCImcmFycnRsO1wiOlwi4oajXCIsXCImcmFycnc7XCI6XCLihp1cIixcIiZyYXRhaWw7XCI6XCLipJpcIixcIiZyYXRpbztcIjpcIuKItlwiLFwiJnJhdGlvbmFscztcIjpcIuKEmlwiLFwiJnJiYXJyO1wiOlwi4qSNXCIsXCImcmJicms7XCI6XCLinbNcIixcIiZyYnJhY2U7XCI6XCJ9XCIsXCImcmJyYWNrO1wiOlwiXVwiLFwiJnJicmtlO1wiOlwi4qaMXCIsXCImcmJya3NsZDtcIjpcIuKmjlwiLFwiJnJicmtzbHU7XCI6XCLippBcIixcIiZyY2Fyb247XCI6XCLFmVwiLFwiJnJjZWRpbDtcIjpcIsWXXCIsXCImcmNlaWw7XCI6XCLijIlcIixcIiZyY3ViO1wiOlwifVwiLFwiJnJjeTtcIjpcItGAXCIsXCImcmRjYTtcIjpcIuKkt1wiLFwiJnJkbGRoYXI7XCI6XCLipalcIixcIiZyZHF1bztcIjpcIuKAnVwiLFwiJnJkcXVvcjtcIjpcIuKAnVwiLFwiJnJkc2g7XCI6XCLihrNcIixcIiZyZWFsO1wiOlwi4oScXCIsXCImcmVhbGluZTtcIjpcIuKEm1wiLFwiJnJlYWxwYXJ0O1wiOlwi4oScXCIsXCImcmVhbHM7XCI6XCLihJ1cIixcIiZyZWN0O1wiOlwi4patXCIsXCImcmVnXCI6XCLCrlwiLFwiJnJlZztcIjpcIsKuXCIsXCImcmZpc2h0O1wiOlwi4qW9XCIsXCImcmZsb29yO1wiOlwi4oyLXCIsXCImcmZyO1wiOlwi8J2Ur1wiLFwiJnJoYXJkO1wiOlwi4oeBXCIsXCImcmhhcnU7XCI6XCLih4BcIixcIiZyaGFydWw7XCI6XCLipaxcIixcIiZyaG87XCI6XCLPgVwiLFwiJnJob3Y7XCI6XCLPsVwiLFwiJnJpZ2h0YXJyb3c7XCI6XCLihpJcIixcIiZyaWdodGFycm93dGFpbDtcIjpcIuKGo1wiLFwiJnJpZ2h0aGFycG9vbmRvd247XCI6XCLih4FcIixcIiZyaWdodGhhcnBvb251cDtcIjpcIuKHgFwiLFwiJnJpZ2h0bGVmdGFycm93cztcIjpcIuKHhFwiLFwiJnJpZ2h0bGVmdGhhcnBvb25zO1wiOlwi4oeMXCIsXCImcmlnaHRyaWdodGFycm93cztcIjpcIuKHiVwiLFwiJnJpZ2h0c3F1aWdhcnJvdztcIjpcIuKGnVwiLFwiJnJpZ2h0dGhyZWV0aW1lcztcIjpcIuKLjFwiLFwiJnJpbmc7XCI6XCLLmlwiLFwiJnJpc2luZ2RvdHNlcTtcIjpcIuKJk1wiLFwiJnJsYXJyO1wiOlwi4oeEXCIsXCImcmxoYXI7XCI6XCLih4xcIixcIiZybG07XCI6XCLigI9cIixcIiZybW91c3Q7XCI6XCLijrFcIixcIiZybW91c3RhY2hlO1wiOlwi4o6xXCIsXCImcm5taWQ7XCI6XCLiq65cIixcIiZyb2FuZztcIjpcIuKfrVwiLFwiJnJvYXJyO1wiOlwi4oe+XCIsXCImcm9icms7XCI6XCLin6dcIixcIiZyb3BhcjtcIjpcIuKmhlwiLFwiJnJvcGY7XCI6XCLwnZWjXCIsXCImcm9wbHVzO1wiOlwi4qiuXCIsXCImcm90aW1lcztcIjpcIuKotVwiLFwiJnJwYXI7XCI6XCIpXCIsXCImcnBhcmd0O1wiOlwi4qaUXCIsXCImcnBwb2xpbnQ7XCI6XCLiqJJcIixcIiZycmFycjtcIjpcIuKHiVwiLFwiJnJzYXF1bztcIjpcIuKAulwiLFwiJnJzY3I7XCI6XCLwnZOHXCIsXCImcnNoO1wiOlwi4oaxXCIsXCImcnNxYjtcIjpcIl1cIixcIiZyc3F1bztcIjpcIuKAmVwiLFwiJnJzcXVvcjtcIjpcIuKAmVwiLFwiJnJ0aHJlZTtcIjpcIuKLjFwiLFwiJnJ0aW1lcztcIjpcIuKLilwiLFwiJnJ0cmk7XCI6XCLilrlcIixcIiZydHJpZTtcIjpcIuKKtVwiLFwiJnJ0cmlmO1wiOlwi4pa4XCIsXCImcnRyaWx0cmk7XCI6XCLip45cIixcIiZydWx1aGFyO1wiOlwi4qWoXCIsXCImcng7XCI6XCLihJ5cIixcIiZzYWN1dGU7XCI6XCLFm1wiLFwiJnNicXVvO1wiOlwi4oCaXCIsXCImc2M7XCI6XCLiibtcIixcIiZzY0U7XCI6XCLiqrRcIixcIiZzY2FwO1wiOlwi4qq4XCIsXCImc2Nhcm9uO1wiOlwixaFcIixcIiZzY2N1ZTtcIjpcIuKJvVwiLFwiJnNjZTtcIjpcIuKqsFwiLFwiJnNjZWRpbDtcIjpcIsWfXCIsXCImc2NpcmM7XCI6XCLFnVwiLFwiJnNjbkU7XCI6XCLiqrZcIixcIiZzY25hcDtcIjpcIuKqulwiLFwiJnNjbnNpbTtcIjpcIuKLqVwiLFwiJnNjcG9saW50O1wiOlwi4qiTXCIsXCImc2NzaW07XCI6XCLiib9cIixcIiZzY3k7XCI6XCLRgVwiLFwiJnNkb3Q7XCI6XCLii4VcIixcIiZzZG90YjtcIjpcIuKKoVwiLFwiJnNkb3RlO1wiOlwi4qmmXCIsXCImc2VBcnI7XCI6XCLih5hcIixcIiZzZWFyaGs7XCI6XCLipKVcIixcIiZzZWFycjtcIjpcIuKGmFwiLFwiJnNlYXJyb3c7XCI6XCLihphcIixcIiZzZWN0XCI6XCLCp1wiLFwiJnNlY3Q7XCI6XCLCp1wiLFwiJnNlbWk7XCI6XCI7XCIsXCImc2Vzd2FyO1wiOlwi4qSpXCIsXCImc2V0bWludXM7XCI6XCLiiJZcIixcIiZzZXRtbjtcIjpcIuKIllwiLFwiJnNleHQ7XCI6XCLinLZcIixcIiZzZnI7XCI6XCLwnZSwXCIsXCImc2Zyb3duO1wiOlwi4oyiXCIsXCImc2hhcnA7XCI6XCLima9cIixcIiZzaGNoY3k7XCI6XCLRiVwiLFwiJnNoY3k7XCI6XCLRiFwiLFwiJnNob3J0bWlkO1wiOlwi4oijXCIsXCImc2hvcnRwYXJhbGxlbDtcIjpcIuKIpVwiLFwiJnNoeVwiOlwiwq1cIixcIiZzaHk7XCI6XCLCrVwiLFwiJnNpZ21hO1wiOlwiz4NcIixcIiZzaWdtYWY7XCI6XCLPglwiLFwiJnNpZ21hdjtcIjpcIs+CXCIsXCImc2ltO1wiOlwi4oi8XCIsXCImc2ltZG90O1wiOlwi4qmqXCIsXCImc2ltZTtcIjpcIuKJg1wiLFwiJnNpbWVxO1wiOlwi4omDXCIsXCImc2ltZztcIjpcIuKqnlwiLFwiJnNpbWdFO1wiOlwi4qqgXCIsXCImc2ltbDtcIjpcIuKqnVwiLFwiJnNpbWxFO1wiOlwi4qqfXCIsXCImc2ltbmU7XCI6XCLiiYZcIixcIiZzaW1wbHVzO1wiOlwi4qikXCIsXCImc2ltcmFycjtcIjpcIuKlslwiLFwiJnNsYXJyO1wiOlwi4oaQXCIsXCImc21hbGxzZXRtaW51cztcIjpcIuKIllwiLFwiJnNtYXNocDtcIjpcIuKos1wiLFwiJnNtZXBhcnNsO1wiOlwi4qekXCIsXCImc21pZDtcIjpcIuKIo1wiLFwiJnNtaWxlO1wiOlwi4oyjXCIsXCImc210O1wiOlwi4qqqXCIsXCImc210ZTtcIjpcIuKqrFwiLFwiJnNtdGVzO1wiOlwi4qqs77iAXCIsXCImc29mdGN5O1wiOlwi0YxcIixcIiZzb2w7XCI6XCIvXCIsXCImc29sYjtcIjpcIuKnhFwiLFwiJnNvbGJhcjtcIjpcIuKMv1wiLFwiJnNvcGY7XCI6XCLwnZWkXCIsXCImc3BhZGVzO1wiOlwi4pmgXCIsXCImc3BhZGVzdWl0O1wiOlwi4pmgXCIsXCImc3BhcjtcIjpcIuKIpVwiLFwiJnNxY2FwO1wiOlwi4oqTXCIsXCImc3FjYXBzO1wiOlwi4oqT77iAXCIsXCImc3FjdXA7XCI6XCLiipRcIixcIiZzcWN1cHM7XCI6XCLiipTvuIBcIixcIiZzcXN1YjtcIjpcIuKKj1wiLFwiJnNxc3ViZTtcIjpcIuKKkVwiLFwiJnNxc3Vic2V0O1wiOlwi4oqPXCIsXCImc3FzdWJzZXRlcTtcIjpcIuKKkVwiLFwiJnNxc3VwO1wiOlwi4oqQXCIsXCImc3FzdXBlO1wiOlwi4oqSXCIsXCImc3FzdXBzZXQ7XCI6XCLiipBcIixcIiZzcXN1cHNldGVxO1wiOlwi4oqSXCIsXCImc3F1O1wiOlwi4pahXCIsXCImc3F1YXJlO1wiOlwi4pahXCIsXCImc3F1YXJmO1wiOlwi4paqXCIsXCImc3F1ZjtcIjpcIuKWqlwiLFwiJnNyYXJyO1wiOlwi4oaSXCIsXCImc3NjcjtcIjpcIvCdk4hcIixcIiZzc2V0bW47XCI6XCLiiJZcIixcIiZzc21pbGU7XCI6XCLijKNcIixcIiZzc3RhcmY7XCI6XCLii4ZcIixcIiZzdGFyO1wiOlwi4piGXCIsXCImc3RhcmY7XCI6XCLimIVcIixcIiZzdHJhaWdodGVwc2lsb247XCI6XCLPtVwiLFwiJnN0cmFpZ2h0cGhpO1wiOlwiz5VcIixcIiZzdHJucztcIjpcIsKvXCIsXCImc3ViO1wiOlwi4oqCXCIsXCImc3ViRTtcIjpcIuKrhVwiLFwiJnN1YmRvdDtcIjpcIuKqvVwiLFwiJnN1YmU7XCI6XCLiioZcIixcIiZzdWJlZG90O1wiOlwi4quDXCIsXCImc3VibXVsdDtcIjpcIuKrgVwiLFwiJnN1Ym5FO1wiOlwi4quLXCIsXCImc3VibmU7XCI6XCLiiopcIixcIiZzdWJwbHVzO1wiOlwi4qq/XCIsXCImc3VicmFycjtcIjpcIuKluVwiLFwiJnN1YnNldDtcIjpcIuKKglwiLFwiJnN1YnNldGVxO1wiOlwi4oqGXCIsXCImc3Vic2V0ZXFxO1wiOlwi4quFXCIsXCImc3Vic2V0bmVxO1wiOlwi4oqKXCIsXCImc3Vic2V0bmVxcTtcIjpcIuKri1wiLFwiJnN1YnNpbTtcIjpcIuKrh1wiLFwiJnN1YnN1YjtcIjpcIuKrlVwiLFwiJnN1YnN1cDtcIjpcIuKrk1wiLFwiJnN1Y2M7XCI6XCLiibtcIixcIiZzdWNjYXBwcm94O1wiOlwi4qq4XCIsXCImc3VjY2N1cmx5ZXE7XCI6XCLiib1cIixcIiZzdWNjZXE7XCI6XCLiqrBcIixcIiZzdWNjbmFwcHJveDtcIjpcIuKqulwiLFwiJnN1Y2NuZXFxO1wiOlwi4qq2XCIsXCImc3VjY25zaW07XCI6XCLii6lcIixcIiZzdWNjc2ltO1wiOlwi4om/XCIsXCImc3VtO1wiOlwi4oiRXCIsXCImc3VuZztcIjpcIuKZqlwiLFwiJnN1cDFcIjpcIsK5XCIsXCImc3VwMTtcIjpcIsK5XCIsXCImc3VwMlwiOlwiwrJcIixcIiZzdXAyO1wiOlwiwrJcIixcIiZzdXAzXCI6XCLCs1wiLFwiJnN1cDM7XCI6XCLCs1wiLFwiJnN1cDtcIjpcIuKKg1wiLFwiJnN1cEU7XCI6XCLiq4ZcIixcIiZzdXBkb3Q7XCI6XCLiqr5cIixcIiZzdXBkc3ViO1wiOlwi4quYXCIsXCImc3VwZTtcIjpcIuKKh1wiLFwiJnN1cGVkb3Q7XCI6XCLiq4RcIixcIiZzdXBoc29sO1wiOlwi4p+JXCIsXCImc3VwaHN1YjtcIjpcIuKrl1wiLFwiJnN1cGxhcnI7XCI6XCLipbtcIixcIiZzdXBtdWx0O1wiOlwi4quCXCIsXCImc3VwbkU7XCI6XCLiq4xcIixcIiZzdXBuZTtcIjpcIuKKi1wiLFwiJnN1cHBsdXM7XCI6XCLiq4BcIixcIiZzdXBzZXQ7XCI6XCLiioNcIixcIiZzdXBzZXRlcTtcIjpcIuKKh1wiLFwiJnN1cHNldGVxcTtcIjpcIuKrhlwiLFwiJnN1cHNldG5lcTtcIjpcIuKKi1wiLFwiJnN1cHNldG5lcXE7XCI6XCLiq4xcIixcIiZzdXBzaW07XCI6XCLiq4hcIixcIiZzdXBzdWI7XCI6XCLiq5RcIixcIiZzdXBzdXA7XCI6XCLiq5ZcIixcIiZzd0FycjtcIjpcIuKHmVwiLFwiJnN3YXJoaztcIjpcIuKkplwiLFwiJnN3YXJyO1wiOlwi4oaZXCIsXCImc3dhcnJvdztcIjpcIuKGmVwiLFwiJnN3bndhcjtcIjpcIuKkqlwiLFwiJnN6bGlnXCI6XCLDn1wiLFwiJnN6bGlnO1wiOlwiw59cIixcIiZ0YXJnZXQ7XCI6XCLijJZcIixcIiZ0YXU7XCI6XCLPhFwiLFwiJnRicms7XCI6XCLijrRcIixcIiZ0Y2Fyb247XCI6XCLFpVwiLFwiJnRjZWRpbDtcIjpcIsWjXCIsXCImdGN5O1wiOlwi0YJcIixcIiZ0ZG90O1wiOlwi4oObXCIsXCImdGVscmVjO1wiOlwi4oyVXCIsXCImdGZyO1wiOlwi8J2UsVwiLFwiJnRoZXJlNDtcIjpcIuKItFwiLFwiJnRoZXJlZm9yZTtcIjpcIuKItFwiLFwiJnRoZXRhO1wiOlwizrhcIixcIiZ0aGV0YXN5bTtcIjpcIs+RXCIsXCImdGhldGF2O1wiOlwiz5FcIixcIiZ0aGlja2FwcHJveDtcIjpcIuKJiFwiLFwiJnRoaWNrc2ltO1wiOlwi4oi8XCIsXCImdGhpbnNwO1wiOlwi4oCJXCIsXCImdGhrYXA7XCI6XCLiiYhcIixcIiZ0aGtzaW07XCI6XCLiiLxcIixcIiZ0aG9yblwiOlwiw75cIixcIiZ0aG9ybjtcIjpcIsO+XCIsXCImdGlsZGU7XCI6XCLLnFwiLFwiJnRpbWVzXCI6XCLDl1wiLFwiJnRpbWVzO1wiOlwiw5dcIixcIiZ0aW1lc2I7XCI6XCLiiqBcIixcIiZ0aW1lc2JhcjtcIjpcIuKosVwiLFwiJnRpbWVzZDtcIjpcIuKosFwiLFwiJnRpbnQ7XCI6XCLiiK1cIixcIiZ0b2VhO1wiOlwi4qSoXCIsXCImdG9wO1wiOlwi4oqkXCIsXCImdG9wYm90O1wiOlwi4oy2XCIsXCImdG9wY2lyO1wiOlwi4quxXCIsXCImdG9wZjtcIjpcIvCdlaVcIixcIiZ0b3Bmb3JrO1wiOlwi4quaXCIsXCImdG9zYTtcIjpcIuKkqVwiLFwiJnRwcmltZTtcIjpcIuKAtFwiLFwiJnRyYWRlO1wiOlwi4oSiXCIsXCImdHJpYW5nbGU7XCI6XCLilrVcIixcIiZ0cmlhbmdsZWRvd247XCI6XCLilr9cIixcIiZ0cmlhbmdsZWxlZnQ7XCI6XCLil4NcIixcIiZ0cmlhbmdsZWxlZnRlcTtcIjpcIuKKtFwiLFwiJnRyaWFuZ2xlcTtcIjpcIuKJnFwiLFwiJnRyaWFuZ2xlcmlnaHQ7XCI6XCLilrlcIixcIiZ0cmlhbmdsZXJpZ2h0ZXE7XCI6XCLiirVcIixcIiZ0cmlkb3Q7XCI6XCLil6xcIixcIiZ0cmllO1wiOlwi4omcXCIsXCImdHJpbWludXM7XCI6XCLiqLpcIixcIiZ0cmlwbHVzO1wiOlwi4qi5XCIsXCImdHJpc2I7XCI6XCLip41cIixcIiZ0cml0aW1lO1wiOlwi4qi7XCIsXCImdHJwZXppdW07XCI6XCLij6JcIixcIiZ0c2NyO1wiOlwi8J2TiVwiLFwiJnRzY3k7XCI6XCLRhlwiLFwiJnRzaGN5O1wiOlwi0ZtcIixcIiZ0c3Ryb2s7XCI6XCLFp1wiLFwiJnR3aXh0O1wiOlwi4omsXCIsXCImdHdvaGVhZGxlZnRhcnJvdztcIjpcIuKGnlwiLFwiJnR3b2hlYWRyaWdodGFycm93O1wiOlwi4oagXCIsXCImdUFycjtcIjpcIuKHkVwiLFwiJnVIYXI7XCI6XCLipaNcIixcIiZ1YWN1dGVcIjpcIsO6XCIsXCImdWFjdXRlO1wiOlwiw7pcIixcIiZ1YXJyO1wiOlwi4oaRXCIsXCImdWJyY3k7XCI6XCLRnlwiLFwiJnVicmV2ZTtcIjpcIsWtXCIsXCImdWNpcmNcIjpcIsO7XCIsXCImdWNpcmM7XCI6XCLDu1wiLFwiJnVjeTtcIjpcItGDXCIsXCImdWRhcnI7XCI6XCLih4VcIixcIiZ1ZGJsYWM7XCI6XCLFsVwiLFwiJnVkaGFyO1wiOlwi4qWuXCIsXCImdWZpc2h0O1wiOlwi4qW+XCIsXCImdWZyO1wiOlwi8J2UslwiLFwiJnVncmF2ZVwiOlwiw7lcIixcIiZ1Z3JhdmU7XCI6XCLDuVwiLFwiJnVoYXJsO1wiOlwi4oa/XCIsXCImdWhhcnI7XCI6XCLihr5cIixcIiZ1aGJsaztcIjpcIuKWgFwiLFwiJnVsY29ybjtcIjpcIuKMnFwiLFwiJnVsY29ybmVyO1wiOlwi4oycXCIsXCImdWxjcm9wO1wiOlwi4oyPXCIsXCImdWx0cmk7XCI6XCLil7hcIixcIiZ1bWFjcjtcIjpcIsWrXCIsXCImdW1sXCI6XCLCqFwiLFwiJnVtbDtcIjpcIsKoXCIsXCImdW9nb247XCI6XCLFs1wiLFwiJnVvcGY7XCI6XCLwnZWmXCIsXCImdXBhcnJvdztcIjpcIuKGkVwiLFwiJnVwZG93bmFycm93O1wiOlwi4oaVXCIsXCImdXBoYXJwb29ubGVmdDtcIjpcIuKGv1wiLFwiJnVwaGFycG9vbnJpZ2h0O1wiOlwi4oa+XCIsXCImdXBsdXM7XCI6XCLiio5cIixcIiZ1cHNpO1wiOlwiz4VcIixcIiZ1cHNpaDtcIjpcIs+SXCIsXCImdXBzaWxvbjtcIjpcIs+FXCIsXCImdXB1cGFycm93cztcIjpcIuKHiFwiLFwiJnVyY29ybjtcIjpcIuKMnVwiLFwiJnVyY29ybmVyO1wiOlwi4oydXCIsXCImdXJjcm9wO1wiOlwi4oyOXCIsXCImdXJpbmc7XCI6XCLFr1wiLFwiJnVydHJpO1wiOlwi4pe5XCIsXCImdXNjcjtcIjpcIvCdk4pcIixcIiZ1dGRvdDtcIjpcIuKLsFwiLFwiJnV0aWxkZTtcIjpcIsWpXCIsXCImdXRyaTtcIjpcIuKWtVwiLFwiJnV0cmlmO1wiOlwi4pa0XCIsXCImdXVhcnI7XCI6XCLih4hcIixcIiZ1dW1sXCI6XCLDvFwiLFwiJnV1bWw7XCI6XCLDvFwiLFwiJnV3YW5nbGU7XCI6XCLipqdcIixcIiZ2QXJyO1wiOlwi4oeVXCIsXCImdkJhcjtcIjpcIuKrqFwiLFwiJnZCYXJ2O1wiOlwi4qupXCIsXCImdkRhc2g7XCI6XCLiiqhcIixcIiZ2YW5ncnQ7XCI6XCLippxcIixcIiZ2YXJlcHNpbG9uO1wiOlwiz7VcIixcIiZ2YXJrYXBwYTtcIjpcIs+wXCIsXCImdmFybm90aGluZztcIjpcIuKIhVwiLFwiJnZhcnBoaTtcIjpcIs+VXCIsXCImdmFycGk7XCI6XCLPllwiLFwiJnZhcnByb3B0bztcIjpcIuKInVwiLFwiJnZhcnI7XCI6XCLihpVcIixcIiZ2YXJyaG87XCI6XCLPsVwiLFwiJnZhcnNpZ21hO1wiOlwiz4JcIixcIiZ2YXJzdWJzZXRuZXE7XCI6XCLiiorvuIBcIixcIiZ2YXJzdWJzZXRuZXFxO1wiOlwi4quL77iAXCIsXCImdmFyc3Vwc2V0bmVxO1wiOlwi4oqL77iAXCIsXCImdmFyc3Vwc2V0bmVxcTtcIjpcIuKrjO+4gFwiLFwiJnZhcnRoZXRhO1wiOlwiz5FcIixcIiZ2YXJ0cmlhbmdsZWxlZnQ7XCI6XCLiirJcIixcIiZ2YXJ0cmlhbmdsZXJpZ2h0O1wiOlwi4oqzXCIsXCImdmN5O1wiOlwi0LJcIixcIiZ2ZGFzaDtcIjpcIuKKolwiLFwiJnZlZTtcIjpcIuKIqFwiLFwiJnZlZWJhcjtcIjpcIuKKu1wiLFwiJnZlZWVxO1wiOlwi4omaXCIsXCImdmVsbGlwO1wiOlwi4ouuXCIsXCImdmVyYmFyO1wiOlwifFwiLFwiJnZlcnQ7XCI6XCJ8XCIsXCImdmZyO1wiOlwi8J2Us1wiLFwiJnZsdHJpO1wiOlwi4oqyXCIsXCImdm5zdWI7XCI6XCLiioLig5JcIixcIiZ2bnN1cDtcIjpcIuKKg+KDklwiLFwiJnZvcGY7XCI6XCLwnZWnXCIsXCImdnByb3A7XCI6XCLiiJ1cIixcIiZ2cnRyaTtcIjpcIuKKs1wiLFwiJnZzY3I7XCI6XCLwnZOLXCIsXCImdnN1Ym5FO1wiOlwi4quL77iAXCIsXCImdnN1Ym5lO1wiOlwi4oqK77iAXCIsXCImdnN1cG5FO1wiOlwi4quM77iAXCIsXCImdnN1cG5lO1wiOlwi4oqL77iAXCIsXCImdnppZ3phZztcIjpcIuKmmlwiLFwiJndjaXJjO1wiOlwixbVcIixcIiZ3ZWRiYXI7XCI6XCLiqZ9cIixcIiZ3ZWRnZTtcIjpcIuKIp1wiLFwiJndlZGdlcTtcIjpcIuKJmVwiLFwiJndlaWVycDtcIjpcIuKEmFwiLFwiJndmcjtcIjpcIvCdlLRcIixcIiZ3b3BmO1wiOlwi8J2VqFwiLFwiJndwO1wiOlwi4oSYXCIsXCImd3I7XCI6XCLiiYBcIixcIiZ3cmVhdGg7XCI6XCLiiYBcIixcIiZ3c2NyO1wiOlwi8J2TjFwiLFwiJnhjYXA7XCI6XCLii4JcIixcIiZ4Y2lyYztcIjpcIuKXr1wiLFwiJnhjdXA7XCI6XCLii4NcIixcIiZ4ZHRyaTtcIjpcIuKWvVwiLFwiJnhmcjtcIjpcIvCdlLVcIixcIiZ4aEFycjtcIjpcIuKfulwiLFwiJnhoYXJyO1wiOlwi4p+3XCIsXCImeGk7XCI6XCLOvlwiLFwiJnhsQXJyO1wiOlwi4p+4XCIsXCImeGxhcnI7XCI6XCLin7VcIixcIiZ4bWFwO1wiOlwi4p+8XCIsXCImeG5pcztcIjpcIuKLu1wiLFwiJnhvZG90O1wiOlwi4qiAXCIsXCImeG9wZjtcIjpcIvCdlalcIixcIiZ4b3BsdXM7XCI6XCLiqIFcIixcIiZ4b3RpbWU7XCI6XCLiqIJcIixcIiZ4ckFycjtcIjpcIuKfuVwiLFwiJnhyYXJyO1wiOlwi4p+2XCIsXCImeHNjcjtcIjpcIvCdk41cIixcIiZ4c3FjdXA7XCI6XCLiqIZcIixcIiZ4dXBsdXM7XCI6XCLiqIRcIixcIiZ4dXRyaTtcIjpcIuKWs1wiLFwiJnh2ZWU7XCI6XCLii4FcIixcIiZ4d2VkZ2U7XCI6XCLii4BcIixcIiZ5YWN1dGVcIjpcIsO9XCIsXCImeWFjdXRlO1wiOlwiw71cIixcIiZ5YWN5O1wiOlwi0Y9cIixcIiZ5Y2lyYztcIjpcIsW3XCIsXCImeWN5O1wiOlwi0YtcIixcIiZ5ZW5cIjpcIsKlXCIsXCImeWVuO1wiOlwiwqVcIixcIiZ5ZnI7XCI6XCLwnZS2XCIsXCImeWljeTtcIjpcItGXXCIsXCImeW9wZjtcIjpcIvCdlapcIixcIiZ5c2NyO1wiOlwi8J2TjlwiLFwiJnl1Y3k7XCI6XCLRjlwiLFwiJnl1bWxcIjpcIsO/XCIsXCImeXVtbDtcIjpcIsO/XCIsXCImemFjdXRlO1wiOlwixbpcIixcIiZ6Y2Fyb247XCI6XCLFvlwiLFwiJnpjeTtcIjpcItC3XCIsXCImemRvdDtcIjpcIsW8XCIsXCImemVldHJmO1wiOlwi4oSoXCIsXCImemV0YTtcIjpcIs62XCIsXCImemZyO1wiOlwi8J2Ut1wiLFwiJnpoY3k7XCI6XCLQtlwiLFwiJnppZ3JhcnI7XCI6XCLih51cIixcIiZ6b3BmO1wiOlwi8J2Vq1wiLFwiJnpzY3I7XCI6XCLwnZOPXCIsXCImendqO1wiOlwi4oCNXCIsXCImenduajtcIjpcIuKAjFwifSxjaGFyYWN0ZXJzOntcIsOGXCI6XCImQUVsaWc7XCIsXCImXCI6XCImYW1wO1wiLFwiw4FcIjpcIiZBYWN1dGU7XCIsXCLEglwiOlwiJkFicmV2ZTtcIixcIsOCXCI6XCImQWNpcmM7XCIsXCLQkFwiOlwiJkFjeTtcIixcIvCdlIRcIjpcIiZBZnI7XCIsXCLDgFwiOlwiJkFncmF2ZTtcIixcIs6RXCI6XCImQWxwaGE7XCIsXCLEgFwiOlwiJkFtYWNyO1wiLFwi4qmTXCI6XCImQW5kO1wiLFwixIRcIjpcIiZBb2dvbjtcIixcIvCdlLhcIjpcIiZBb3BmO1wiLFwi4oGhXCI6XCImYWY7XCIsXCLDhVwiOlwiJmFuZ3N0O1wiLFwi8J2SnFwiOlwiJkFzY3I7XCIsXCLiiZRcIjpcIiZjb2xvbmVxO1wiLFwiw4NcIjpcIiZBdGlsZGU7XCIsXCLDhFwiOlwiJkF1bWw7XCIsXCLiiJZcIjpcIiZzc2V0bW47XCIsXCLiq6dcIjpcIiZCYXJ2O1wiLFwi4oyGXCI6XCImZG91YmxlYmFyd2VkZ2U7XCIsXCLQkVwiOlwiJkJjeTtcIixcIuKItVwiOlwiJmJlY2F1c2U7XCIsXCLihKxcIjpcIiZiZXJub3U7XCIsXCLOklwiOlwiJkJldGE7XCIsXCLwnZSFXCI6XCImQmZyO1wiLFwi8J2UuVwiOlwiJkJvcGY7XCIsXCLLmFwiOlwiJmJyZXZlO1wiLFwi4omOXCI6XCImYnVtcDtcIixcItCnXCI6XCImQ0hjeTtcIixcIsKpXCI6XCImY29weTtcIixcIsSGXCI6XCImQ2FjdXRlO1wiLFwi4ouSXCI6XCImQ2FwO1wiLFwi4oWFXCI6XCImREQ7XCIsXCLihK1cIjpcIiZDZnI7XCIsXCLEjFwiOlwiJkNjYXJvbjtcIixcIsOHXCI6XCImQ2NlZGlsO1wiLFwixIhcIjpcIiZDY2lyYztcIixcIuKIsFwiOlwiJkNjb25pbnQ7XCIsXCLEilwiOlwiJkNkb3Q7XCIsXCLCuFwiOlwiJmNlZGlsO1wiLFwiwrdcIjpcIiZtaWRkb3Q7XCIsXCLOp1wiOlwiJkNoaTtcIixcIuKKmVwiOlwiJm9kb3Q7XCIsXCLiipZcIjpcIiZvbWludXM7XCIsXCLiipVcIjpcIiZvcGx1cztcIixcIuKKl1wiOlwiJm90aW1lcztcIixcIuKIslwiOlwiJmN3Y29uaW50O1wiLFwi4oCdXCI6XCImcmRxdW9yO1wiLFwi4oCZXCI6XCImcnNxdW9yO1wiLFwi4oi3XCI6XCImUHJvcG9ydGlvbjtcIixcIuKptFwiOlwiJkNvbG9uZTtcIixcIuKJoVwiOlwiJmVxdWl2O1wiLFwi4oivXCI6XCImRG91YmxlQ29udG91ckludGVncmFsO1wiLFwi4oiuXCI6XCImb2ludDtcIixcIuKEglwiOlwiJmNvbXBsZXhlcztcIixcIuKIkFwiOlwiJmNvcHJvZDtcIixcIuKIs1wiOlwiJmF3Y29uaW50O1wiLFwi4qivXCI6XCImQ3Jvc3M7XCIsXCLwnZKeXCI6XCImQ3NjcjtcIixcIuKLk1wiOlwiJkN1cDtcIixcIuKJjVwiOlwiJmFzeW1wZXE7XCIsXCLipJFcIjpcIiZERG90cmFoZDtcIixcItCCXCI6XCImREpjeTtcIixcItCFXCI6XCImRFNjeTtcIixcItCPXCI6XCImRFpjeTtcIixcIuKAoVwiOlwiJmRkYWdnZXI7XCIsXCLihqFcIjpcIiZEYXJyO1wiLFwi4qukXCI6XCImRG91YmxlTGVmdFRlZTtcIixcIsSOXCI6XCImRGNhcm9uO1wiLFwi0JRcIjpcIiZEY3k7XCIsXCLiiIdcIjpcIiZuYWJsYTtcIixcIs6UXCI6XCImRGVsdGE7XCIsXCLwnZSHXCI6XCImRGZyO1wiLFwiwrRcIjpcIiZhY3V0ZTtcIixcIsuZXCI6XCImZG90O1wiLFwiy51cIjpcIiZkYmxhYztcIixcImBcIjpcIiZncmF2ZTtcIixcIsucXCI6XCImdGlsZGU7XCIsXCLii4RcIjpcIiZkaWFtb25kO1wiLFwi4oWGXCI6XCImZGQ7XCIsXCLwnZS7XCI6XCImRG9wZjtcIixcIsKoXCI6XCImdW1sO1wiLFwi4oOcXCI6XCImRG90RG90O1wiLFwi4omQXCI6XCImZXNkb3Q7XCIsXCLih5NcIjpcIiZkQXJyO1wiLFwi4oeQXCI6XCImbEFycjtcIixcIuKHlFwiOlwiJmlmZjtcIixcIuKfuFwiOlwiJnhsQXJyO1wiLFwi4p+6XCI6XCImeGhBcnI7XCIsXCLin7lcIjpcIiZ4ckFycjtcIixcIuKHklwiOlwiJnJBcnI7XCIsXCLiiqhcIjpcIiZ2RGFzaDtcIixcIuKHkVwiOlwiJnVBcnI7XCIsXCLih5VcIjpcIiZ2QXJyO1wiLFwi4oilXCI6XCImc3BhcjtcIixcIuKGk1wiOlwiJmRvd25hcnJvdztcIixcIuKkk1wiOlwiJkRvd25BcnJvd0JhcjtcIixcIuKHtVwiOlwiJmR1YXJyO1wiLFwizJFcIjpcIiZEb3duQnJldmU7XCIsXCLipZBcIjpcIiZEb3duTGVmdFJpZ2h0VmVjdG9yO1wiLFwi4qWeXCI6XCImRG93bkxlZnRUZWVWZWN0b3I7XCIsXCLihr1cIjpcIiZsaGFyZDtcIixcIuKlllwiOlwiJkRvd25MZWZ0VmVjdG9yQmFyO1wiLFwi4qWfXCI6XCImRG93blJpZ2h0VGVlVmVjdG9yO1wiLFwi4oeBXCI6XCImcmlnaHRoYXJwb29uZG93bjtcIixcIuKll1wiOlwiJkRvd25SaWdodFZlY3RvckJhcjtcIixcIuKKpFwiOlwiJnRvcDtcIixcIuKGp1wiOlwiJm1hcHN0b2Rvd247XCIsXCLwnZKfXCI6XCImRHNjcjtcIixcIsSQXCI6XCImRHN0cm9rO1wiLFwixYpcIjpcIiZFTkc7XCIsXCLDkFwiOlwiJkVUSDtcIixcIsOJXCI6XCImRWFjdXRlO1wiLFwixJpcIjpcIiZFY2Fyb247XCIsXCLDilwiOlwiJkVjaXJjO1wiLFwi0K1cIjpcIiZFY3k7XCIsXCLEllwiOlwiJkVkb3Q7XCIsXCLwnZSIXCI6XCImRWZyO1wiLFwiw4hcIjpcIiZFZ3JhdmU7XCIsXCLiiIhcIjpcIiZpc2ludjtcIixcIsSSXCI6XCImRW1hY3I7XCIsXCLil7tcIjpcIiZFbXB0eVNtYWxsU3F1YXJlO1wiLFwi4parXCI6XCImRW1wdHlWZXJ5U21hbGxTcXVhcmU7XCIsXCLEmFwiOlwiJkVvZ29uO1wiLFwi8J2UvFwiOlwiJkVvcGY7XCIsXCLOlVwiOlwiJkVwc2lsb247XCIsXCLiqbVcIjpcIiZFcXVhbDtcIixcIuKJglwiOlwiJmVzaW07XCIsXCLih4xcIjpcIiZybGhhcjtcIixcIuKEsFwiOlwiJmV4cGVjdGF0aW9uO1wiLFwi4qmzXCI6XCImRXNpbTtcIixcIs6XXCI6XCImRXRhO1wiLFwiw4tcIjpcIiZFdW1sO1wiLFwi4oiDXCI6XCImZXhpc3Q7XCIsXCLihYdcIjpcIiZleHBvbmVudGlhbGU7XCIsXCLQpFwiOlwiJkZjeTtcIixcIvCdlIlcIjpcIiZGZnI7XCIsXCLil7xcIjpcIiZGaWxsZWRTbWFsbFNxdWFyZTtcIixcIuKWqlwiOlwiJnNxdWY7XCIsXCLwnZS9XCI6XCImRm9wZjtcIixcIuKIgFwiOlwiJmZvcmFsbDtcIixcIuKEsVwiOlwiJkZzY3I7XCIsXCLQg1wiOlwiJkdKY3k7XCIsXCI+XCI6XCImZ3Q7XCIsXCLOk1wiOlwiJkdhbW1hO1wiLFwiz5xcIjpcIiZHYW1tYWQ7XCIsXCLEnlwiOlwiJkdicmV2ZTtcIixcIsSiXCI6XCImR2NlZGlsO1wiLFwixJxcIjpcIiZHY2lyYztcIixcItCTXCI6XCImR2N5O1wiLFwixKBcIjpcIiZHZG90O1wiLFwi8J2UilwiOlwiJkdmcjtcIixcIuKLmVwiOlwiJmdnZztcIixcIvCdlL5cIjpcIiZHb3BmO1wiLFwi4omlXCI6XCImZ2VxO1wiLFwi4oubXCI6XCImZ3RyZXFsZXNzO1wiLFwi4omnXCI6XCImZ2VxcTtcIixcIuKqolwiOlwiJkdyZWF0ZXJHcmVhdGVyO1wiLFwi4om3XCI6XCImZ3RybGVzcztcIixcIuKpvlwiOlwiJmdlcztcIixcIuKJs1wiOlwiJmd0cnNpbTtcIixcIvCdkqJcIjpcIiZHc2NyO1wiLFwi4omrXCI6XCImZ2c7XCIsXCLQqlwiOlwiJkhBUkRjeTtcIixcIsuHXCI6XCImY2Fyb247XCIsXCJeXCI6XCImSGF0O1wiLFwixKRcIjpcIiZIY2lyYztcIixcIuKEjFwiOlwiJlBvaW5jYXJlcGxhbmU7XCIsXCLihItcIjpcIiZoYW1pbHQ7XCIsXCLihI1cIjpcIiZxdWF0ZXJuaW9ucztcIixcIuKUgFwiOlwiJmJveGg7XCIsXCLEplwiOlwiJkhzdHJvaztcIixcIuKJj1wiOlwiJmJ1bXBlcTtcIixcItCVXCI6XCImSUVjeTtcIixcIsSyXCI6XCImSUpsaWc7XCIsXCLQgVwiOlwiJklPY3k7XCIsXCLDjVwiOlwiJklhY3V0ZTtcIixcIsOOXCI6XCImSWNpcmM7XCIsXCLQmFwiOlwiJkljeTtcIixcIsSwXCI6XCImSWRvdDtcIixcIuKEkVwiOlwiJmltYWdwYXJ0O1wiLFwiw4xcIjpcIiZJZ3JhdmU7XCIsXCLEqlwiOlwiJkltYWNyO1wiLFwi4oWIXCI6XCImaWk7XCIsXCLiiKxcIjpcIiZJbnQ7XCIsXCLiiKtcIjpcIiZpbnQ7XCIsXCLii4JcIjpcIiZ4Y2FwO1wiLFwi4oGjXCI6XCImaWM7XCIsXCLigaJcIjpcIiZpdDtcIixcIsSuXCI6XCImSW9nb247XCIsXCLwnZWAXCI6XCImSW9wZjtcIixcIs6ZXCI6XCImSW90YTtcIixcIuKEkFwiOlwiJmltYWdsaW5lO1wiLFwixKhcIjpcIiZJdGlsZGU7XCIsXCLQhlwiOlwiJkl1a2N5O1wiLFwiw49cIjpcIiZJdW1sO1wiLFwixLRcIjpcIiZKY2lyYztcIixcItCZXCI6XCImSmN5O1wiLFwi8J2UjVwiOlwiJkpmcjtcIixcIvCdlYFcIjpcIiZKb3BmO1wiLFwi8J2SpVwiOlwiJkpzY3I7XCIsXCLQiFwiOlwiJkpzZXJjeTtcIixcItCEXCI6XCImSnVrY3k7XCIsXCLQpVwiOlwiJktIY3k7XCIsXCLQjFwiOlwiJktKY3k7XCIsXCLOmlwiOlwiJkthcHBhO1wiLFwixLZcIjpcIiZLY2VkaWw7XCIsXCLQmlwiOlwiJktjeTtcIixcIvCdlI5cIjpcIiZLZnI7XCIsXCLwnZWCXCI6XCImS29wZjtcIixcIvCdkqZcIjpcIiZLc2NyO1wiLFwi0IlcIjpcIiZMSmN5O1wiLFwiPFwiOlwiJmx0O1wiLFwixLlcIjpcIiZMYWN1dGU7XCIsXCLOm1wiOlwiJkxhbWJkYTtcIixcIuKfqlwiOlwiJkxhbmc7XCIsXCLihJJcIjpcIiZsYWdyYW47XCIsXCLihp5cIjpcIiZ0d29oZWFkbGVmdGFycm93O1wiLFwixL1cIjpcIiZMY2Fyb247XCIsXCLEu1wiOlwiJkxjZWRpbDtcIixcItCbXCI6XCImTGN5O1wiLFwi4p+oXCI6XCImbGFuZ2xlO1wiLFwi4oaQXCI6XCImc2xhcnI7XCIsXCLih6RcIjpcIiZsYXJyYjtcIixcIuKHhlwiOlwiJmxyYXJyO1wiLFwi4oyIXCI6XCImbGNlaWw7XCIsXCLin6ZcIjpcIiZsb2JyaztcIixcIuKloVwiOlwiJkxlZnREb3duVGVlVmVjdG9yO1wiLFwi4oeDXCI6XCImZG93bmhhcnBvb25sZWZ0O1wiLFwi4qWZXCI6XCImTGVmdERvd25WZWN0b3JCYXI7XCIsXCLijIpcIjpcIiZsZmxvb3I7XCIsXCLihpRcIjpcIiZsZWZ0cmlnaHRhcnJvdztcIixcIuKljlwiOlwiJkxlZnRSaWdodFZlY3RvcjtcIixcIuKKo1wiOlwiJmRhc2h2O1wiLFwi4oakXCI6XCImbWFwc3RvbGVmdDtcIixcIuKlmlwiOlwiJkxlZnRUZWVWZWN0b3I7XCIsXCLiirJcIjpcIiZ2bHRyaTtcIixcIuKnj1wiOlwiJkxlZnRUcmlhbmdsZUJhcjtcIixcIuKKtFwiOlwiJnRyaWFuZ2xlbGVmdGVxO1wiLFwi4qWRXCI6XCImTGVmdFVwRG93blZlY3RvcjtcIixcIuKloFwiOlwiJkxlZnRVcFRlZVZlY3RvcjtcIixcIuKGv1wiOlwiJnVwaGFycG9vbmxlZnQ7XCIsXCLipZhcIjpcIiZMZWZ0VXBWZWN0b3JCYXI7XCIsXCLihrxcIjpcIiZsaGFydTtcIixcIuKlklwiOlwiJkxlZnRWZWN0b3JCYXI7XCIsXCLii5pcIjpcIiZsZXNzZXFndHI7XCIsXCLiiaZcIjpcIiZsZXFxO1wiLFwi4om2XCI6XCImbGc7XCIsXCLiqqFcIjpcIiZMZXNzTGVzcztcIixcIuKpvVwiOlwiJmxlcztcIixcIuKJslwiOlwiJmxzaW07XCIsXCLwnZSPXCI6XCImTGZyO1wiLFwi4ouYXCI6XCImTGw7XCIsXCLih5pcIjpcIiZsQWFycjtcIixcIsS/XCI6XCImTG1pZG90O1wiLFwi4p+1XCI6XCImeGxhcnI7XCIsXCLin7dcIjpcIiZ4aGFycjtcIixcIuKftlwiOlwiJnhyYXJyO1wiLFwi8J2Vg1wiOlwiJkxvcGY7XCIsXCLihplcIjpcIiZzd2Fycm93O1wiLFwi4oaYXCI6XCImc2VhcnJvdztcIixcIuKGsFwiOlwiJmxzaDtcIixcIsWBXCI6XCImTHN0cm9rO1wiLFwi4omqXCI6XCImbGw7XCIsXCLipIVcIjpcIiZNYXA7XCIsXCLQnFwiOlwiJk1jeTtcIixcIuKBn1wiOlwiJk1lZGl1bVNwYWNlO1wiLFwi4oSzXCI6XCImcGhtbWF0O1wiLFwi8J2UkFwiOlwiJk1mcjtcIixcIuKIk1wiOlwiJm1wO1wiLFwi8J2VhFwiOlwiJk1vcGY7XCIsXCLOnFwiOlwiJk11O1wiLFwi0IpcIjpcIiZOSmN5O1wiLFwixYNcIjpcIiZOYWN1dGU7XCIsXCLFh1wiOlwiJk5jYXJvbjtcIixcIsWFXCI6XCImTmNlZGlsO1wiLFwi0J1cIjpcIiZOY3k7XCIsXCLigItcIjpcIiZaZXJvV2lkdGhTcGFjZTtcIixcIlxcblwiOlwiJk5ld0xpbmU7XCIsXCLwnZSRXCI6XCImTmZyO1wiLFwi4oGgXCI6XCImTm9CcmVhaztcIixcIsKgXCI6XCImbmJzcDtcIixcIuKElVwiOlwiJm5hdHVyYWxzO1wiLFwi4qusXCI6XCImTm90O1wiLFwi4omiXCI6XCImbmVxdWl2O1wiLFwi4omtXCI6XCImTm90Q3VwQ2FwO1wiLFwi4oimXCI6XCImbnNwYXI7XCIsXCLiiIlcIjpcIiZub3RpbnZhO1wiLFwi4omgXCI6XCImbmU7XCIsXCLiiYLMuFwiOlwiJm5lc2ltO1wiLFwi4oiEXCI6XCImbmV4aXN0cztcIixcIuKJr1wiOlwiJm5ndHI7XCIsXCLiibFcIjpcIiZuZ2VxO1wiLFwi4omnzLhcIjpcIiZuZ2VxcTtcIixcIuKJq8y4XCI6XCImbkd0djtcIixcIuKJuVwiOlwiJm50Z2w7XCIsXCLiqb7MuFwiOlwiJm5nZXM7XCIsXCLiibVcIjpcIiZuZ3NpbTtcIixcIuKJjsy4XCI6XCImbmJ1bXA7XCIsXCLiiY/MuFwiOlwiJm5idW1wZTtcIixcIuKLqlwiOlwiJm50cmlhbmdsZWxlZnQ7XCIsXCLip4/MuFwiOlwiJk5vdExlZnRUcmlhbmdsZUJhcjtcIixcIuKLrFwiOlwiJm50cmlhbmdsZWxlZnRlcTtcIixcIuKJrlwiOlwiJm5sdDtcIixcIuKJsFwiOlwiJm5sZXE7XCIsXCLiibhcIjpcIiZudGxnO1wiLFwi4omqzLhcIjpcIiZuTHR2O1wiLFwi4qm9zLhcIjpcIiZubGVzO1wiLFwi4om0XCI6XCImbmxzaW07XCIsXCLiqqLMuFwiOlwiJk5vdE5lc3RlZEdyZWF0ZXJHcmVhdGVyO1wiLFwi4qqhzLhcIjpcIiZOb3ROZXN0ZWRMZXNzTGVzcztcIixcIuKKgFwiOlwiJm5wcmVjO1wiLFwi4qqvzLhcIjpcIiZucHJlY2VxO1wiLFwi4ougXCI6XCImbnByY3VlO1wiLFwi4oiMXCI6XCImbm90bml2YTtcIixcIuKLq1wiOlwiJm50cmlhbmdsZXJpZ2h0O1wiLFwi4qeQzLhcIjpcIiZOb3RSaWdodFRyaWFuZ2xlQmFyO1wiLFwi4outXCI6XCImbnRyaWFuZ2xlcmlnaHRlcTtcIixcIuKKj8y4XCI6XCImTm90U3F1YXJlU3Vic2V0O1wiLFwi4ouiXCI6XCImbnNxc3ViZTtcIixcIuKKkMy4XCI6XCImTm90U3F1YXJlU3VwZXJzZXQ7XCIsXCLii6NcIjpcIiZuc3FzdXBlO1wiLFwi4oqC4oOSXCI6XCImdm5zdWI7XCIsXCLiiohcIjpcIiZuc3Vic2V0ZXE7XCIsXCLiioFcIjpcIiZuc3VjYztcIixcIuKqsMy4XCI6XCImbnN1Y2NlcTtcIixcIuKLoVwiOlwiJm5zY2N1ZTtcIixcIuKJv8y4XCI6XCImTm90U3VjY2VlZHNUaWxkZTtcIixcIuKKg+KDklwiOlwiJnZuc3VwO1wiLFwi4oqJXCI6XCImbnN1cHNldGVxO1wiLFwi4omBXCI6XCImbnNpbTtcIixcIuKJhFwiOlwiJm5zaW1lcTtcIixcIuKJh1wiOlwiJm5jb25nO1wiLFwi4omJXCI6XCImbmFwcHJveDtcIixcIuKIpFwiOlwiJm5zbWlkO1wiLFwi8J2SqVwiOlwiJk5zY3I7XCIsXCLDkVwiOlwiJk50aWxkZTtcIixcIs6dXCI6XCImTnU7XCIsXCLFklwiOlwiJk9FbGlnO1wiLFwiw5NcIjpcIiZPYWN1dGU7XCIsXCLDlFwiOlwiJk9jaXJjO1wiLFwi0J5cIjpcIiZPY3k7XCIsXCLFkFwiOlwiJk9kYmxhYztcIixcIvCdlJJcIjpcIiZPZnI7XCIsXCLDklwiOlwiJk9ncmF2ZTtcIixcIsWMXCI6XCImT21hY3I7XCIsXCLOqVwiOlwiJm9obTtcIixcIs6fXCI6XCImT21pY3JvbjtcIixcIvCdlYZcIjpcIiZPb3BmO1wiLFwi4oCcXCI6XCImbGRxdW87XCIsXCLigJhcIjpcIiZsc3F1bztcIixcIuKplFwiOlwiJk9yO1wiLFwi8J2SqlwiOlwiJk9zY3I7XCIsXCLDmFwiOlwiJk9zbGFzaDtcIixcIsOVXCI6XCImT3RpbGRlO1wiLFwi4qi3XCI6XCImT3RpbWVzO1wiLFwiw5ZcIjpcIiZPdW1sO1wiLFwi4oC+XCI6XCImb2xpbmU7XCIsXCLij55cIjpcIiZPdmVyQnJhY2U7XCIsXCLijrRcIjpcIiZ0YnJrO1wiLFwi4o+cXCI6XCImT3ZlclBhcmVudGhlc2lzO1wiLFwi4oiCXCI6XCImcGFydDtcIixcItCfXCI6XCImUGN5O1wiLFwi8J2Uk1wiOlwiJlBmcjtcIixcIs6mXCI6XCImUGhpO1wiLFwizqBcIjpcIiZQaTtcIixcIsKxXCI6XCImcG07XCIsXCLihJlcIjpcIiZwcmltZXM7XCIsXCLiqrtcIjpcIiZQcjtcIixcIuKJulwiOlwiJnByZWM7XCIsXCLiqq9cIjpcIiZwcmVjZXE7XCIsXCLiibxcIjpcIiZwcmVjY3VybHllcTtcIixcIuKJvlwiOlwiJnByc2ltO1wiLFwi4oCzXCI6XCImUHJpbWU7XCIsXCLiiI9cIjpcIiZwcm9kO1wiLFwi4oidXCI6XCImdnByb3A7XCIsXCLwnZKrXCI6XCImUHNjcjtcIixcIs6oXCI6XCImUHNpO1wiLCdcIic6XCImcXVvdDtcIixcIvCdlJRcIjpcIiZRZnI7XCIsXCLihJpcIjpcIiZyYXRpb25hbHM7XCIsXCLwnZKsXCI6XCImUXNjcjtcIixcIuKkkFwiOlwiJmRyYmthcm93O1wiLFwiwq5cIjpcIiZyZWc7XCIsXCLFlFwiOlwiJlJhY3V0ZTtcIixcIuKfq1wiOlwiJlJhbmc7XCIsXCLihqBcIjpcIiZ0d29oZWFkcmlnaHRhcnJvdztcIixcIuKkllwiOlwiJlJhcnJ0bDtcIixcIsWYXCI6XCImUmNhcm9uO1wiLFwixZZcIjpcIiZSY2VkaWw7XCIsXCLQoFwiOlwiJlJjeTtcIixcIuKEnFwiOlwiJnJlYWxwYXJ0O1wiLFwi4oiLXCI6XCImbml2O1wiLFwi4oeLXCI6XCImbHJoYXI7XCIsXCLipa9cIjpcIiZkdWhhcjtcIixcIs6hXCI6XCImUmhvO1wiLFwi4p+pXCI6XCImcmFuZ2xlO1wiLFwi4oaSXCI6XCImc3JhcnI7XCIsXCLih6VcIjpcIiZyYXJyYjtcIixcIuKHhFwiOlwiJnJsYXJyO1wiLFwi4oyJXCI6XCImcmNlaWw7XCIsXCLin6dcIjpcIiZyb2JyaztcIixcIuKlnVwiOlwiJlJpZ2h0RG93blRlZVZlY3RvcjtcIixcIuKHglwiOlwiJmRvd25oYXJwb29ucmlnaHQ7XCIsXCLipZVcIjpcIiZSaWdodERvd25WZWN0b3JCYXI7XCIsXCLijItcIjpcIiZyZmxvb3I7XCIsXCLiiqJcIjpcIiZ2ZGFzaDtcIixcIuKGplwiOlwiJm1hcHN0bztcIixcIuKlm1wiOlwiJlJpZ2h0VGVlVmVjdG9yO1wiLFwi4oqzXCI6XCImdnJ0cmk7XCIsXCLip5BcIjpcIiZSaWdodFRyaWFuZ2xlQmFyO1wiLFwi4oq1XCI6XCImdHJpYW5nbGVyaWdodGVxO1wiLFwi4qWPXCI6XCImUmlnaHRVcERvd25WZWN0b3I7XCIsXCLipZxcIjpcIiZSaWdodFVwVGVlVmVjdG9yO1wiLFwi4oa+XCI6XCImdXBoYXJwb29ucmlnaHQ7XCIsXCLipZRcIjpcIiZSaWdodFVwVmVjdG9yQmFyO1wiLFwi4oeAXCI6XCImcmlnaHRoYXJwb29udXA7XCIsXCLipZNcIjpcIiZSaWdodFZlY3RvckJhcjtcIixcIuKEnVwiOlwiJnJlYWxzO1wiLFwi4qWwXCI6XCImUm91bmRJbXBsaWVzO1wiLFwi4oebXCI6XCImckFhcnI7XCIsXCLihJtcIjpcIiZyZWFsaW5lO1wiLFwi4oaxXCI6XCImcnNoO1wiLFwi4qe0XCI6XCImUnVsZURlbGF5ZWQ7XCIsXCLQqVwiOlwiJlNIQ0hjeTtcIixcItCoXCI6XCImU0hjeTtcIixcItCsXCI6XCImU09GVGN5O1wiLFwixZpcIjpcIiZTYWN1dGU7XCIsXCLiqrxcIjpcIiZTYztcIixcIsWgXCI6XCImU2Nhcm9uO1wiLFwixZ5cIjpcIiZTY2VkaWw7XCIsXCLFnFwiOlwiJlNjaXJjO1wiLFwi0KFcIjpcIiZTY3k7XCIsXCLwnZSWXCI6XCImU2ZyO1wiLFwi4oaRXCI6XCImdXBhcnJvdztcIixcIs6jXCI6XCImU2lnbWE7XCIsXCLiiJhcIjpcIiZjb21wZm47XCIsXCLwnZWKXCI6XCImU29wZjtcIixcIuKImlwiOlwiJnJhZGljO1wiLFwi4pahXCI6XCImc3F1YXJlO1wiLFwi4oqTXCI6XCImc3FjYXA7XCIsXCLiio9cIjpcIiZzcXN1YnNldDtcIixcIuKKkVwiOlwiJnNxc3Vic2V0ZXE7XCIsXCLiipBcIjpcIiZzcXN1cHNldDtcIixcIuKKklwiOlwiJnNxc3Vwc2V0ZXE7XCIsXCLiipRcIjpcIiZzcWN1cDtcIixcIvCdkq5cIjpcIiZTc2NyO1wiLFwi4ouGXCI6XCImc3N0YXJmO1wiLFwi4ouQXCI6XCImU3Vic2V0O1wiLFwi4oqGXCI6XCImc3Vic2V0ZXE7XCIsXCLiibtcIjpcIiZzdWNjO1wiLFwi4qqwXCI6XCImc3VjY2VxO1wiLFwi4om9XCI6XCImc3VjY2N1cmx5ZXE7XCIsXCLiib9cIjpcIiZzdWNjc2ltO1wiLFwi4oiRXCI6XCImc3VtO1wiLFwi4ouRXCI6XCImU3Vwc2V0O1wiLFwi4oqDXCI6XCImc3Vwc2V0O1wiLFwi4oqHXCI6XCImc3Vwc2V0ZXE7XCIsXCLDnlwiOlwiJlRIT1JOO1wiLFwi4oSiXCI6XCImdHJhZGU7XCIsXCLQi1wiOlwiJlRTSGN5O1wiLFwi0KZcIjpcIiZUU2N5O1wiLFwiXFx0XCI6XCImVGFiO1wiLFwizqRcIjpcIiZUYXU7XCIsXCLFpFwiOlwiJlRjYXJvbjtcIixcIsWiXCI6XCImVGNlZGlsO1wiLFwi0KJcIjpcIiZUY3k7XCIsXCLwnZSXXCI6XCImVGZyO1wiLFwi4oi0XCI6XCImdGhlcmVmb3JlO1wiLFwizphcIjpcIiZUaGV0YTtcIixcIuKBn+KAilwiOlwiJlRoaWNrU3BhY2U7XCIsXCLigIlcIjpcIiZ0aGluc3A7XCIsXCLiiLxcIjpcIiZ0aGtzaW07XCIsXCLiiYNcIjpcIiZzaW1lcTtcIixcIuKJhVwiOlwiJmNvbmc7XCIsXCLiiYhcIjpcIiZ0aGthcDtcIixcIvCdlYtcIjpcIiZUb3BmO1wiLFwi4oObXCI6XCImdGRvdDtcIixcIvCdkq9cIjpcIiZUc2NyO1wiLFwixaZcIjpcIiZUc3Ryb2s7XCIsXCLDmlwiOlwiJlVhY3V0ZTtcIixcIuKGn1wiOlwiJlVhcnI7XCIsXCLipYlcIjpcIiZVYXJyb2NpcjtcIixcItCOXCI6XCImVWJyY3k7XCIsXCLFrFwiOlwiJlVicmV2ZTtcIixcIsObXCI6XCImVWNpcmM7XCIsXCLQo1wiOlwiJlVjeTtcIixcIsWwXCI6XCImVWRibGFjO1wiLFwi8J2UmFwiOlwiJlVmcjtcIixcIsOZXCI6XCImVWdyYXZlO1wiLFwixapcIjpcIiZVbWFjcjtcIixfOlwiJmxvd2JhcjtcIixcIuKPn1wiOlwiJlVuZGVyQnJhY2U7XCIsXCLijrVcIjpcIiZiYnJrO1wiLFwi4o+dXCI6XCImVW5kZXJQYXJlbnRoZXNpcztcIixcIuKLg1wiOlwiJnhjdXA7XCIsXCLiio5cIjpcIiZ1cGx1cztcIixcIsWyXCI6XCImVW9nb247XCIsXCLwnZWMXCI6XCImVW9wZjtcIixcIuKkklwiOlwiJlVwQXJyb3dCYXI7XCIsXCLih4VcIjpcIiZ1ZGFycjtcIixcIuKGlVwiOlwiJnZhcnI7XCIsXCLipa5cIjpcIiZ1ZGhhcjtcIixcIuKKpVwiOlwiJnBlcnA7XCIsXCLihqVcIjpcIiZtYXBzdG91cDtcIixcIuKGllwiOlwiJm53YXJyb3c7XCIsXCLihpdcIjpcIiZuZWFycm93O1wiLFwiz5JcIjpcIiZ1cHNpaDtcIixcIs6lXCI6XCImVXBzaWxvbjtcIixcIsWuXCI6XCImVXJpbmc7XCIsXCLwnZKwXCI6XCImVXNjcjtcIixcIsWoXCI6XCImVXRpbGRlO1wiLFwiw5xcIjpcIiZVdW1sO1wiLFwi4oqrXCI6XCImVkRhc2g7XCIsXCLiq6tcIjpcIiZWYmFyO1wiLFwi0JJcIjpcIiZWY3k7XCIsXCLiiqlcIjpcIiZWZGFzaDtcIixcIuKrplwiOlwiJlZkYXNobDtcIixcIuKLgVwiOlwiJnh2ZWU7XCIsXCLigJZcIjpcIiZWZXJ0O1wiLFwi4oijXCI6XCImc21pZDtcIixcInxcIjpcIiZ2ZXJ0O1wiLFwi4p2YXCI6XCImVmVydGljYWxTZXBhcmF0b3I7XCIsXCLiiYBcIjpcIiZ3cmVhdGg7XCIsXCLigIpcIjpcIiZoYWlyc3A7XCIsXCLwnZSZXCI6XCImVmZyO1wiLFwi8J2VjVwiOlwiJlZvcGY7XCIsXCLwnZKxXCI6XCImVnNjcjtcIixcIuKKqlwiOlwiJlZ2ZGFzaDtcIixcIsW0XCI6XCImV2NpcmM7XCIsXCLii4BcIjpcIiZ4d2VkZ2U7XCIsXCLwnZSaXCI6XCImV2ZyO1wiLFwi8J2VjlwiOlwiJldvcGY7XCIsXCLwnZKyXCI6XCImV3NjcjtcIixcIvCdlJtcIjpcIiZYZnI7XCIsXCLOnlwiOlwiJlhpO1wiLFwi8J2Vj1wiOlwiJlhvcGY7XCIsXCLwnZKzXCI6XCImWHNjcjtcIixcItCvXCI6XCImWUFjeTtcIixcItCHXCI6XCImWUljeTtcIixcItCuXCI6XCImWVVjeTtcIixcIsOdXCI6XCImWWFjdXRlO1wiLFwixbZcIjpcIiZZY2lyYztcIixcItCrXCI6XCImWWN5O1wiLFwi8J2UnFwiOlwiJllmcjtcIixcIvCdlZBcIjpcIiZZb3BmO1wiLFwi8J2StFwiOlwiJllzY3I7XCIsXCLFuFwiOlwiJll1bWw7XCIsXCLQllwiOlwiJlpIY3k7XCIsXCLFuVwiOlwiJlphY3V0ZTtcIixcIsW9XCI6XCImWmNhcm9uO1wiLFwi0JdcIjpcIiZaY3k7XCIsXCLFu1wiOlwiJlpkb3Q7XCIsXCLOllwiOlwiJlpldGE7XCIsXCLihKhcIjpcIiZ6ZWV0cmY7XCIsXCLihKRcIjpcIiZpbnRlZ2VycztcIixcIvCdkrVcIjpcIiZac2NyO1wiLFwiw6FcIjpcIiZhYWN1dGU7XCIsXCLEg1wiOlwiJmFicmV2ZTtcIixcIuKIvlwiOlwiJm1zdHBvcztcIixcIuKIvsyzXCI6XCImYWNFO1wiLFwi4oi/XCI6XCImYWNkO1wiLFwiw6JcIjpcIiZhY2lyYztcIixcItCwXCI6XCImYWN5O1wiLFwiw6ZcIjpcIiZhZWxpZztcIixcIvCdlJ5cIjpcIiZhZnI7XCIsXCLDoFwiOlwiJmFncmF2ZTtcIixcIuKEtVwiOlwiJmFsZXBoO1wiLFwizrFcIjpcIiZhbHBoYTtcIixcIsSBXCI6XCImYW1hY3I7XCIsXCLiqL9cIjpcIiZhbWFsZztcIixcIuKIp1wiOlwiJndlZGdlO1wiLFwi4qmVXCI6XCImYW5kYW5kO1wiLFwi4qmcXCI6XCImYW5kZDtcIixcIuKpmFwiOlwiJmFuZHNsb3BlO1wiLFwi4qmaXCI6XCImYW5kdjtcIixcIuKIoFwiOlwiJmFuZ2xlO1wiLFwi4qakXCI6XCImYW5nZTtcIixcIuKIoVwiOlwiJm1lYXN1cmVkYW5nbGU7XCIsXCLipqhcIjpcIiZhbmdtc2RhYTtcIixcIuKmqVwiOlwiJmFuZ21zZGFiO1wiLFwi4qaqXCI6XCImYW5nbXNkYWM7XCIsXCLipqtcIjpcIiZhbmdtc2RhZDtcIixcIuKmrFwiOlwiJmFuZ21zZGFlO1wiLFwi4qatXCI6XCImYW5nbXNkYWY7XCIsXCLipq5cIjpcIiZhbmdtc2RhZztcIixcIuKmr1wiOlwiJmFuZ21zZGFoO1wiLFwi4oifXCI6XCImYW5ncnQ7XCIsXCLiir5cIjpcIiZhbmdydHZiO1wiLFwi4qadXCI6XCImYW5ncnR2YmQ7XCIsXCLiiKJcIjpcIiZhbmdzcGg7XCIsXCLijbxcIjpcIiZhbmd6YXJyO1wiLFwixIVcIjpcIiZhb2dvbjtcIixcIvCdlZJcIjpcIiZhb3BmO1wiLFwi4qmwXCI6XCImYXBFO1wiLFwi4qmvXCI6XCImYXBhY2lyO1wiLFwi4omKXCI6XCImYXBwcm94ZXE7XCIsXCLiiYtcIjpcIiZhcGlkO1wiLFwiJ1wiOlwiJmFwb3M7XCIsXCLDpVwiOlwiJmFyaW5nO1wiLFwi8J2StlwiOlwiJmFzY3I7XCIsXCIqXCI6XCImbWlkYXN0O1wiLFwiw6NcIjpcIiZhdGlsZGU7XCIsXCLDpFwiOlwiJmF1bWw7XCIsXCLiqJFcIjpcIiZhd2ludDtcIixcIuKrrVwiOlwiJmJOb3Q7XCIsXCLiiYxcIjpcIiZiY29uZztcIixcIs+2XCI6XCImYmVwc2k7XCIsXCLigLVcIjpcIiZicHJpbWU7XCIsXCLiiL1cIjpcIiZic2ltO1wiLFwi4ouNXCI6XCImYnNpbWU7XCIsXCLiir1cIjpcIiZiYXJ2ZWU7XCIsXCLijIVcIjpcIiZiYXJ3ZWRnZTtcIixcIuKOtlwiOlwiJmJicmt0YnJrO1wiLFwi0LFcIjpcIiZiY3k7XCIsXCLigJ5cIjpcIiZsZHF1b3I7XCIsXCLiprBcIjpcIiZiZW1wdHl2O1wiLFwizrJcIjpcIiZiZXRhO1wiLFwi4oS2XCI6XCImYmV0aDtcIixcIuKJrFwiOlwiJnR3aXh0O1wiLFwi8J2Un1wiOlwiJmJmcjtcIixcIuKXr1wiOlwiJnhjaXJjO1wiLFwi4qiAXCI6XCImeG9kb3Q7XCIsXCLiqIFcIjpcIiZ4b3BsdXM7XCIsXCLiqIJcIjpcIiZ4b3RpbWU7XCIsXCLiqIZcIjpcIiZ4c3FjdXA7XCIsXCLimIVcIjpcIiZzdGFyZjtcIixcIuKWvVwiOlwiJnhkdHJpO1wiLFwi4pazXCI6XCImeHV0cmk7XCIsXCLiqIRcIjpcIiZ4dXBsdXM7XCIsXCLipI1cIjpcIiZyYmFycjtcIixcIuKnq1wiOlwiJmxvemY7XCIsXCLilrRcIjpcIiZ1dHJpZjtcIixcIuKWvlwiOlwiJmR0cmlmO1wiLFwi4peCXCI6XCImbHRyaWY7XCIsXCLilrhcIjpcIiZydHJpZjtcIixcIuKQo1wiOlwiJmJsYW5rO1wiLFwi4paSXCI6XCImYmxrMTI7XCIsXCLilpFcIjpcIiZibGsxNDtcIixcIuKWk1wiOlwiJmJsazM0O1wiLFwi4paIXCI6XCImYmxvY2s7XCIsXCI94oOlXCI6XCImYm5lO1wiLFwi4omh4oOlXCI6XCImYm5lcXVpdjtcIixcIuKMkFwiOlwiJmJub3Q7XCIsXCLwnZWTXCI6XCImYm9wZjtcIixcIuKLiFwiOlwiJmJvd3RpZTtcIixcIuKVl1wiOlwiJmJveERMO1wiLFwi4pWUXCI6XCImYm94RFI7XCIsXCLilZZcIjpcIiZib3hEbDtcIixcIuKVk1wiOlwiJmJveERyO1wiLFwi4pWQXCI6XCImYm94SDtcIixcIuKVplwiOlwiJmJveEhEO1wiLFwi4pWpXCI6XCImYm94SFU7XCIsXCLilaRcIjpcIiZib3hIZDtcIixcIuKVp1wiOlwiJmJveEh1O1wiLFwi4pWdXCI6XCImYm94VUw7XCIsXCLilZpcIjpcIiZib3hVUjtcIixcIuKVnFwiOlwiJmJveFVsO1wiLFwi4pWZXCI6XCImYm94VXI7XCIsXCLilZFcIjpcIiZib3hWO1wiLFwi4pWsXCI6XCImYm94Vkg7XCIsXCLilaNcIjpcIiZib3hWTDtcIixcIuKVoFwiOlwiJmJveFZSO1wiLFwi4pWrXCI6XCImYm94Vmg7XCIsXCLilaJcIjpcIiZib3hWbDtcIixcIuKVn1wiOlwiJmJveFZyO1wiLFwi4qeJXCI6XCImYm94Ym94O1wiLFwi4pWVXCI6XCImYm94ZEw7XCIsXCLilZJcIjpcIiZib3hkUjtcIixcIuKUkFwiOlwiJmJveGRsO1wiLFwi4pSMXCI6XCImYm94ZHI7XCIsXCLilaVcIjpcIiZib3hoRDtcIixcIuKVqFwiOlwiJmJveGhVO1wiLFwi4pSsXCI6XCImYm94aGQ7XCIsXCLilLRcIjpcIiZib3hodTtcIixcIuKKn1wiOlwiJm1pbnVzYjtcIixcIuKKnlwiOlwiJnBsdXNiO1wiLFwi4oqgXCI6XCImdGltZXNiO1wiLFwi4pWbXCI6XCImYm94dUw7XCIsXCLilZhcIjpcIiZib3h1UjtcIixcIuKUmFwiOlwiJmJveHVsO1wiLFwi4pSUXCI6XCImYm94dXI7XCIsXCLilIJcIjpcIiZib3h2O1wiLFwi4pWqXCI6XCImYm94dkg7XCIsXCLilaFcIjpcIiZib3h2TDtcIixcIuKVnlwiOlwiJmJveHZSO1wiLFwi4pS8XCI6XCImYm94dmg7XCIsXCLilKRcIjpcIiZib3h2bDtcIixcIuKUnFwiOlwiJmJveHZyO1wiLFwiwqZcIjpcIiZicnZiYXI7XCIsXCLwnZK3XCI6XCImYnNjcjtcIixcIuKBj1wiOlwiJmJzZW1pO1wiLFwiXFxcXFwiOlwiJmJzb2w7XCIsXCLip4VcIjpcIiZic29sYjtcIixcIuKfiFwiOlwiJmJzb2xoc3ViO1wiLFwi4oCiXCI6XCImYnVsbGV0O1wiLFwi4qquXCI6XCImYnVtcEU7XCIsXCLEh1wiOlwiJmNhY3V0ZTtcIixcIuKIqVwiOlwiJmNhcDtcIixcIuKphFwiOlwiJmNhcGFuZDtcIixcIuKpiVwiOlwiJmNhcGJyY3VwO1wiLFwi4qmLXCI6XCImY2FwY2FwO1wiLFwi4qmHXCI6XCImY2FwY3VwO1wiLFwi4qmAXCI6XCImY2FwZG90O1wiLFwi4oip77iAXCI6XCImY2FwcztcIixcIuKBgVwiOlwiJmNhcmV0O1wiLFwi4qmNXCI6XCImY2NhcHM7XCIsXCLEjVwiOlwiJmNjYXJvbjtcIixcIsOnXCI6XCImY2NlZGlsO1wiLFwixIlcIjpcIiZjY2lyYztcIixcIuKpjFwiOlwiJmNjdXBzO1wiLFwi4qmQXCI6XCImY2N1cHNzbTtcIixcIsSLXCI6XCImY2RvdDtcIixcIuKmslwiOlwiJmNlbXB0eXY7XCIsXCLColwiOlwiJmNlbnQ7XCIsXCLwnZSgXCI6XCImY2ZyO1wiLFwi0YdcIjpcIiZjaGN5O1wiLFwi4pyTXCI6XCImY2hlY2ttYXJrO1wiLFwiz4dcIjpcIiZjaGk7XCIsXCLil4tcIjpcIiZjaXI7XCIsXCLip4NcIjpcIiZjaXJFO1wiLFwiy4ZcIjpcIiZjaXJjO1wiLFwi4omXXCI6XCImY2lyZTtcIixcIuKGulwiOlwiJm9sYXJyO1wiLFwi4oa7XCI6XCImb3JhcnI7XCIsXCLik4hcIjpcIiZvUztcIixcIuKKm1wiOlwiJm9hc3Q7XCIsXCLiippcIjpcIiZvY2lyO1wiLFwi4oqdXCI6XCImb2Rhc2g7XCIsXCLiqJBcIjpcIiZjaXJmbmludDtcIixcIuKrr1wiOlwiJmNpcm1pZDtcIixcIuKnglwiOlwiJmNpcnNjaXI7XCIsXCLimaNcIjpcIiZjbHVic3VpdDtcIixcIjpcIjpcIiZjb2xvbjtcIixcIixcIjpcIiZjb21tYTtcIixcIkBcIjpcIiZjb21tYXQ7XCIsXCLiiIFcIjpcIiZjb21wbGVtZW50O1wiLFwi4qmtXCI6XCImY29uZ2RvdDtcIixcIvCdlZRcIjpcIiZjb3BmO1wiLFwi4oSXXCI6XCImY29weXNyO1wiLFwi4oa1XCI6XCImY3JhcnI7XCIsXCLinJdcIjpcIiZjcm9zcztcIixcIvCdkrhcIjpcIiZjc2NyO1wiLFwi4quPXCI6XCImY3N1YjtcIixcIuKrkVwiOlwiJmNzdWJlO1wiLFwi4quQXCI6XCImY3N1cDtcIixcIuKrklwiOlwiJmNzdXBlO1wiLFwi4ouvXCI6XCImY3Rkb3Q7XCIsXCLipLhcIjpcIiZjdWRhcnJsO1wiLFwi4qS1XCI6XCImY3VkYXJycjtcIixcIuKLnlwiOlwiJmN1cmx5ZXFwcmVjO1wiLFwi4oufXCI6XCImY3VybHllcXN1Y2M7XCIsXCLihrZcIjpcIiZjdXJ2ZWFycm93bGVmdDtcIixcIuKkvVwiOlwiJmN1bGFycnA7XCIsXCLiiKpcIjpcIiZjdXA7XCIsXCLiqYhcIjpcIiZjdXBicmNhcDtcIixcIuKphlwiOlwiJmN1cGNhcDtcIixcIuKpilwiOlwiJmN1cGN1cDtcIixcIuKKjVwiOlwiJmN1cGRvdDtcIixcIuKphVwiOlwiJmN1cG9yO1wiLFwi4oiq77iAXCI6XCImY3VwcztcIixcIuKGt1wiOlwiJmN1cnZlYXJyb3dyaWdodDtcIixcIuKkvFwiOlwiJmN1cmFycm07XCIsXCLii45cIjpcIiZjdXZlZTtcIixcIuKLj1wiOlwiJmN1d2VkO1wiLFwiwqRcIjpcIiZjdXJyZW47XCIsXCLiiLFcIjpcIiZjd2ludDtcIixcIuKMrVwiOlwiJmN5bGN0eTtcIixcIuKlpVwiOlwiJmRIYXI7XCIsXCLigKBcIjpcIiZkYWdnZXI7XCIsXCLihLhcIjpcIiZkYWxldGg7XCIsXCLigJBcIjpcIiZoeXBoZW47XCIsXCLipI9cIjpcIiZyQmFycjtcIixcIsSPXCI6XCImZGNhcm9uO1wiLFwi0LRcIjpcIiZkY3k7XCIsXCLih4pcIjpcIiZkb3duZG93bmFycm93cztcIixcIuKpt1wiOlwiJmVERG90O1wiLFwiwrBcIjpcIiZkZWc7XCIsXCLOtFwiOlwiJmRlbHRhO1wiLFwi4qaxXCI6XCImZGVtcHR5djtcIixcIuKlv1wiOlwiJmRmaXNodDtcIixcIvCdlKFcIjpcIiZkZnI7XCIsXCLimaZcIjpcIiZkaWFtcztcIixcIs+dXCI6XCImZ2FtbWFkO1wiLFwi4ouyXCI6XCImZGlzaW47XCIsXCLDt1wiOlwiJmRpdmlkZTtcIixcIuKLh1wiOlwiJmRpdm9ueDtcIixcItGSXCI6XCImZGpjeTtcIixcIuKMnlwiOlwiJmxsY29ybmVyO1wiLFwi4oyNXCI6XCImZGxjcm9wO1wiLCQ6XCImZG9sbGFyO1wiLFwi8J2VlVwiOlwiJmRvcGY7XCIsXCLiiZFcIjpcIiZlRG90O1wiLFwi4oi4XCI6XCImbWludXNkO1wiLFwi4oiUXCI6XCImcGx1c2RvO1wiLFwi4oqhXCI6XCImc2RvdGI7XCIsXCLijJ9cIjpcIiZscmNvcm5lcjtcIixcIuKMjFwiOlwiJmRyY3JvcDtcIixcIvCdkrlcIjpcIiZkc2NyO1wiLFwi0ZVcIjpcIiZkc2N5O1wiLFwi4qe2XCI6XCImZHNvbDtcIixcIsSRXCI6XCImZHN0cm9rO1wiLFwi4ouxXCI6XCImZHRkb3Q7XCIsXCLilr9cIjpcIiZ0cmlhbmdsZWRvd247XCIsXCLipqZcIjpcIiZkd2FuZ2xlO1wiLFwi0Z9cIjpcIiZkemN5O1wiLFwi4p+/XCI6XCImZHppZ3JhcnI7XCIsXCLDqVwiOlwiJmVhY3V0ZTtcIixcIuKprlwiOlwiJmVhc3RlcjtcIixcIsSbXCI6XCImZWNhcm9uO1wiLFwi4omWXCI6XCImZXFjaXJjO1wiLFwiw6pcIjpcIiZlY2lyYztcIixcIuKJlVwiOlwiJmVxY29sb247XCIsXCLRjVwiOlwiJmVjeTtcIixcIsSXXCI6XCImZWRvdDtcIixcIuKJklwiOlwiJmZhbGxpbmdkb3RzZXE7XCIsXCLwnZSiXCI6XCImZWZyO1wiLFwi4qqaXCI6XCImZWc7XCIsXCLDqFwiOlwiJmVncmF2ZTtcIixcIuKqllwiOlwiJmVxc2xhbnRndHI7XCIsXCLiqphcIjpcIiZlZ3Nkb3Q7XCIsXCLiqplcIjpcIiZlbDtcIixcIuKPp1wiOlwiJmVsaW50ZXJzO1wiLFwi4oSTXCI6XCImZWxsO1wiLFwi4qqVXCI6XCImZXFzbGFudGxlc3M7XCIsXCLiqpdcIjpcIiZlbHNkb3Q7XCIsXCLEk1wiOlwiJmVtYWNyO1wiLFwi4oiFXCI6XCImdmFybm90aGluZztcIixcIuKAhFwiOlwiJmVtc3AxMztcIixcIuKAhVwiOlwiJmVtc3AxNDtcIixcIuKAg1wiOlwiJmVtc3A7XCIsXCLFi1wiOlwiJmVuZztcIixcIuKAglwiOlwiJmVuc3A7XCIsXCLEmVwiOlwiJmVvZ29uO1wiLFwi8J2VllwiOlwiJmVvcGY7XCIsXCLii5VcIjpcIiZlcGFyO1wiLFwi4qejXCI6XCImZXBhcnNsO1wiLFwi4qmxXCI6XCImZXBsdXM7XCIsXCLOtVwiOlwiJmVwc2lsb247XCIsXCLPtVwiOlwiJnZhcmVwc2lsb247XCIsXCI9XCI6XCImZXF1YWxzO1wiLFwi4omfXCI6XCImcXVlc3RlcTtcIixcIuKpuFwiOlwiJmVxdWl2REQ7XCIsXCLip6VcIjpcIiZlcXZwYXJzbDtcIixcIuKJk1wiOlwiJnJpc2luZ2RvdHNlcTtcIixcIuKlsVwiOlwiJmVyYXJyO1wiLFwi4oSvXCI6XCImZXNjcjtcIixcIs63XCI6XCImZXRhO1wiLFwiw7BcIjpcIiZldGg7XCIsXCLDq1wiOlwiJmV1bWw7XCIsXCLigqxcIjpcIiZldXJvO1wiLFwiIVwiOlwiJmV4Y2w7XCIsXCLRhFwiOlwiJmZjeTtcIixcIuKZgFwiOlwiJmZlbWFsZTtcIixcIu+sg1wiOlwiJmZmaWxpZztcIixcIu+sgFwiOlwiJmZmbGlnO1wiLFwi76yEXCI6XCImZmZsbGlnO1wiLFwi8J2Uo1wiOlwiJmZmcjtcIixcIu+sgVwiOlwiJmZpbGlnO1wiLGZqOlwiJmZqbGlnO1wiLFwi4pmtXCI6XCImZmxhdDtcIixcIu+sglwiOlwiJmZsbGlnO1wiLFwi4paxXCI6XCImZmx0bnM7XCIsXCLGklwiOlwiJmZub2Y7XCIsXCLwnZWXXCI6XCImZm9wZjtcIixcIuKLlFwiOlwiJnBpdGNoZm9yaztcIixcIuKrmVwiOlwiJmZvcmt2O1wiLFwi4qiNXCI6XCImZnBhcnRpbnQ7XCIsXCLCvVwiOlwiJmhhbGY7XCIsXCLihZNcIjpcIiZmcmFjMTM7XCIsXCLCvFwiOlwiJmZyYWMxNDtcIixcIuKFlVwiOlwiJmZyYWMxNTtcIixcIuKFmVwiOlwiJmZyYWMxNjtcIixcIuKFm1wiOlwiJmZyYWMxODtcIixcIuKFlFwiOlwiJmZyYWMyMztcIixcIuKFllwiOlwiJmZyYWMyNTtcIixcIsK+XCI6XCImZnJhYzM0O1wiLFwi4oWXXCI6XCImZnJhYzM1O1wiLFwi4oWcXCI6XCImZnJhYzM4O1wiLFwi4oWYXCI6XCImZnJhYzQ1O1wiLFwi4oWaXCI6XCImZnJhYzU2O1wiLFwi4oWdXCI6XCImZnJhYzU4O1wiLFwi4oWeXCI6XCImZnJhYzc4O1wiLFwi4oGEXCI6XCImZnJhc2w7XCIsXCLijKJcIjpcIiZzZnJvd247XCIsXCLwnZK7XCI6XCImZnNjcjtcIixcIuKqjFwiOlwiJmd0cmVxcWxlc3M7XCIsXCLHtVwiOlwiJmdhY3V0ZTtcIixcIs6zXCI6XCImZ2FtbWE7XCIsXCLiqoZcIjpcIiZndHJhcHByb3g7XCIsXCLEn1wiOlwiJmdicmV2ZTtcIixcIsSdXCI6XCImZ2NpcmM7XCIsXCLQs1wiOlwiJmdjeTtcIixcIsShXCI6XCImZ2RvdDtcIixcIuKqqVwiOlwiJmdlc2NjO1wiLFwi4qqAXCI6XCImZ2VzZG90O1wiLFwi4qqCXCI6XCImZ2VzZG90bztcIixcIuKqhFwiOlwiJmdlc2RvdG9sO1wiLFwi4oub77iAXCI6XCImZ2VzbDtcIixcIuKqlFwiOlwiJmdlc2xlcztcIixcIvCdlKRcIjpcIiZnZnI7XCIsXCLihLdcIjpcIiZnaW1lbDtcIixcItGTXCI6XCImZ2pjeTtcIixcIuKqklwiOlwiJmdsRTtcIixcIuKqpVwiOlwiJmdsYTtcIixcIuKqpFwiOlwiJmdsajtcIixcIuKJqVwiOlwiJmduZXFxO1wiLFwi4qqKXCI6XCImZ25hcHByb3g7XCIsXCLiqohcIjpcIiZnbmVxO1wiLFwi4ounXCI6XCImZ25zaW07XCIsXCLwnZWYXCI6XCImZ29wZjtcIixcIuKEilwiOlwiJmdzY3I7XCIsXCLiqo5cIjpcIiZnc2ltZTtcIixcIuKqkFwiOlwiJmdzaW1sO1wiLFwi4qqnXCI6XCImZ3RjYztcIixcIuKpulwiOlwiJmd0Y2lyO1wiLFwi4ouXXCI6XCImZ3RyZG90O1wiLFwi4qaVXCI6XCImZ3RsUGFyO1wiLFwi4qm8XCI6XCImZ3RxdWVzdDtcIixcIuKluFwiOlwiJmd0cmFycjtcIixcIuKJqe+4gFwiOlwiJmd2bkU7XCIsXCLRilwiOlwiJmhhcmRjeTtcIixcIuKliFwiOlwiJmhhcnJjaXI7XCIsXCLihq1cIjpcIiZsZWZ0cmlnaHRzcXVpZ2Fycm93O1wiLFwi4oSPXCI6XCImcGxhbmt2O1wiLFwixKVcIjpcIiZoY2lyYztcIixcIuKZpVwiOlwiJmhlYXJ0c3VpdDtcIixcIuKAplwiOlwiJm1sZHI7XCIsXCLiirlcIjpcIiZoZXJjb247XCIsXCLwnZSlXCI6XCImaGZyO1wiLFwi4qSlXCI6XCImc2VhcmhrO1wiLFwi4qSmXCI6XCImc3dhcmhrO1wiLFwi4oe/XCI6XCImaG9hcnI7XCIsXCLiiLtcIjpcIiZob210aHQ7XCIsXCLihqlcIjpcIiZsYXJyaGs7XCIsXCLihqpcIjpcIiZyYXJyaGs7XCIsXCLwnZWZXCI6XCImaG9wZjtcIixcIuKAlVwiOlwiJmhvcmJhcjtcIixcIvCdkr1cIjpcIiZoc2NyO1wiLFwixKdcIjpcIiZoc3Ryb2s7XCIsXCLigYNcIjpcIiZoeWJ1bGw7XCIsXCLDrVwiOlwiJmlhY3V0ZTtcIixcIsOuXCI6XCImaWNpcmM7XCIsXCLQuFwiOlwiJmljeTtcIixcItC1XCI6XCImaWVjeTtcIixcIsKhXCI6XCImaWV4Y2w7XCIsXCLwnZSmXCI6XCImaWZyO1wiLFwiw6xcIjpcIiZpZ3JhdmU7XCIsXCLiqIxcIjpcIiZxaW50O1wiLFwi4oitXCI6XCImdGludDtcIixcIuKnnFwiOlwiJmlpbmZpbjtcIixcIuKEqVwiOlwiJmlpb3RhO1wiLFwixLNcIjpcIiZpamxpZztcIixcIsSrXCI6XCImaW1hY3I7XCIsXCLEsVwiOlwiJmlub2RvdDtcIixcIuKKt1wiOlwiJmltb2Y7XCIsXCLGtVwiOlwiJmltcGVkO1wiLFwi4oSFXCI6XCImaW5jYXJlO1wiLFwi4oieXCI6XCImaW5maW47XCIsXCLip51cIjpcIiZpbmZpbnRpZTtcIixcIuKKulwiOlwiJmludGVyY2FsO1wiLFwi4qiXXCI6XCImaW50bGFyaGs7XCIsXCLiqLxcIjpcIiZpcHJvZDtcIixcItGRXCI6XCImaW9jeTtcIixcIsSvXCI6XCImaW9nb247XCIsXCLwnZWaXCI6XCImaW9wZjtcIixcIs65XCI6XCImaW90YTtcIixcIsK/XCI6XCImaXF1ZXN0O1wiLFwi8J2SvlwiOlwiJmlzY3I7XCIsXCLii7lcIjpcIiZpc2luRTtcIixcIuKLtVwiOlwiJmlzaW5kb3Q7XCIsXCLii7RcIjpcIiZpc2lucztcIixcIuKLs1wiOlwiJmlzaW5zdjtcIixcIsSpXCI6XCImaXRpbGRlO1wiLFwi0ZZcIjpcIiZpdWtjeTtcIixcIsOvXCI6XCImaXVtbDtcIixcIsS1XCI6XCImamNpcmM7XCIsXCLQuVwiOlwiJmpjeTtcIixcIvCdlKdcIjpcIiZqZnI7XCIsXCLIt1wiOlwiJmptYXRoO1wiLFwi8J2Vm1wiOlwiJmpvcGY7XCIsXCLwnZK/XCI6XCImanNjcjtcIixcItGYXCI6XCImanNlcmN5O1wiLFwi0ZRcIjpcIiZqdWtjeTtcIixcIs66XCI6XCIma2FwcGE7XCIsXCLPsFwiOlwiJnZhcmthcHBhO1wiLFwixLdcIjpcIiZrY2VkaWw7XCIsXCLQulwiOlwiJmtjeTtcIixcIvCdlKhcIjpcIiZrZnI7XCIsXCLEuFwiOlwiJmtncmVlbjtcIixcItGFXCI6XCIma2hjeTtcIixcItGcXCI6XCIma2pjeTtcIixcIvCdlZxcIjpcIiZrb3BmO1wiLFwi8J2TgFwiOlwiJmtzY3I7XCIsXCLipJtcIjpcIiZsQXRhaWw7XCIsXCLipI5cIjpcIiZsQmFycjtcIixcIuKqi1wiOlwiJmxlc3NlcXFndHI7XCIsXCLipaJcIjpcIiZsSGFyO1wiLFwixLpcIjpcIiZsYWN1dGU7XCIsXCLiprRcIjpcIiZsYWVtcHR5djtcIixcIs67XCI6XCImbGFtYmRhO1wiLFwi4qaRXCI6XCImbGFuZ2Q7XCIsXCLiqoVcIjpcIiZsZXNzYXBwcm94O1wiLFwiwqtcIjpcIiZsYXF1bztcIixcIuKkn1wiOlwiJmxhcnJiZnM7XCIsXCLipJ1cIjpcIiZsYXJyZnM7XCIsXCLihqtcIjpcIiZsb29wYXJyb3dsZWZ0O1wiLFwi4qS5XCI6XCImbGFycnBsO1wiLFwi4qWzXCI6XCImbGFycnNpbTtcIixcIuKGolwiOlwiJmxlZnRhcnJvd3RhaWw7XCIsXCLiqqtcIjpcIiZsYXQ7XCIsXCLipJlcIjpcIiZsYXRhaWw7XCIsXCLiqq1cIjpcIiZsYXRlO1wiLFwi4qqt77iAXCI6XCImbGF0ZXM7XCIsXCLipIxcIjpcIiZsYmFycjtcIixcIuKdslwiOlwiJmxiYnJrO1wiLFwie1wiOlwiJmxjdWI7XCIsXCJbXCI6XCImbHNxYjtcIixcIuKmi1wiOlwiJmxicmtlO1wiLFwi4qaPXCI6XCImbGJya3NsZDtcIixcIuKmjVwiOlwiJmxicmtzbHU7XCIsXCLEvlwiOlwiJmxjYXJvbjtcIixcIsS8XCI6XCImbGNlZGlsO1wiLFwi0LtcIjpcIiZsY3k7XCIsXCLipLZcIjpcIiZsZGNhO1wiLFwi4qWnXCI6XCImbGRyZGhhcjtcIixcIuKli1wiOlwiJmxkcnVzaGFyO1wiLFwi4oayXCI6XCImbGRzaDtcIixcIuKJpFwiOlwiJmxlcTtcIixcIuKHh1wiOlwiJmxsYXJyO1wiLFwi4ouLXCI6XCImbHRocmVlO1wiLFwi4qqoXCI6XCImbGVzY2M7XCIsXCLiqb9cIjpcIiZsZXNkb3Q7XCIsXCLiqoFcIjpcIiZsZXNkb3RvO1wiLFwi4qqDXCI6XCImbGVzZG90b3I7XCIsXCLii5rvuIBcIjpcIiZsZXNnO1wiLFwi4qqTXCI6XCImbGVzZ2VzO1wiLFwi4ouWXCI6XCImbHRkb3Q7XCIsXCLipbxcIjpcIiZsZmlzaHQ7XCIsXCLwnZSpXCI6XCImbGZyO1wiLFwi4qqRXCI6XCImbGdFO1wiLFwi4qWqXCI6XCImbGhhcnVsO1wiLFwi4paEXCI6XCImbGhibGs7XCIsXCLRmVwiOlwiJmxqY3k7XCIsXCLipatcIjpcIiZsbGhhcmQ7XCIsXCLil7pcIjpcIiZsbHRyaTtcIixcIsWAXCI6XCImbG1pZG90O1wiLFwi4o6wXCI6XCImbG1vdXN0YWNoZTtcIixcIuKJqFwiOlwiJmxuZXFxO1wiLFwi4qqJXCI6XCImbG5hcHByb3g7XCIsXCLiqodcIjpcIiZsbmVxO1wiLFwi4oumXCI6XCImbG5zaW07XCIsXCLin6xcIjpcIiZsb2FuZztcIixcIuKHvVwiOlwiJmxvYXJyO1wiLFwi4p+8XCI6XCImeG1hcDtcIixcIuKGrFwiOlwiJnJhcnJscDtcIixcIuKmhVwiOlwiJmxvcGFyO1wiLFwi8J2VnVwiOlwiJmxvcGY7XCIsXCLiqK1cIjpcIiZsb3BsdXM7XCIsXCLiqLRcIjpcIiZsb3RpbWVzO1wiLFwi4oiXXCI6XCImbG93YXN0O1wiLFwi4peKXCI6XCImbG96ZW5nZTtcIixcIihcIjpcIiZscGFyO1wiLFwi4qaTXCI6XCImbHBhcmx0O1wiLFwi4qWtXCI6XCImbHJoYXJkO1wiLFwi4oCOXCI6XCImbHJtO1wiLFwi4oq/XCI6XCImbHJ0cmk7XCIsXCLigLlcIjpcIiZsc2FxdW87XCIsXCLwnZOBXCI6XCImbHNjcjtcIixcIuKqjVwiOlwiJmxzaW1lO1wiLFwi4qqPXCI6XCImbHNpbWc7XCIsXCLigJpcIjpcIiZzYnF1bztcIixcIsWCXCI6XCImbHN0cm9rO1wiLFwi4qqmXCI6XCImbHRjYztcIixcIuKpuVwiOlwiJmx0Y2lyO1wiLFwi4ouJXCI6XCImbHRpbWVzO1wiLFwi4qW2XCI6XCImbHRsYXJyO1wiLFwi4qm7XCI6XCImbHRxdWVzdDtcIixcIuKmllwiOlwiJmx0clBhcjtcIixcIuKXg1wiOlwiJnRyaWFuZ2xlbGVmdDtcIixcIuKlilwiOlwiJmx1cmRzaGFyO1wiLFwi4qWmXCI6XCImbHVydWhhcjtcIixcIuKJqO+4gFwiOlwiJmx2bkU7XCIsXCLiiLpcIjpcIiZtRERvdDtcIixcIsKvXCI6XCImc3RybnM7XCIsXCLimYJcIjpcIiZtYWxlO1wiLFwi4pygXCI6XCImbWFsdGVzZTtcIixcIuKWrlwiOlwiJm1hcmtlcjtcIixcIuKoqVwiOlwiJm1jb21tYTtcIixcItC8XCI6XCImbWN5O1wiLFwi4oCUXCI6XCImbWRhc2g7XCIsXCLwnZSqXCI6XCImbWZyO1wiLFwi4oSnXCI6XCImbWhvO1wiLFwiwrVcIjpcIiZtaWNybztcIixcIuKrsFwiOlwiJm1pZGNpcjtcIixcIuKIklwiOlwiJm1pbnVzO1wiLFwi4qiqXCI6XCImbWludXNkdTtcIixcIuKrm1wiOlwiJm1sY3A7XCIsXCLiiqdcIjpcIiZtb2RlbHM7XCIsXCLwnZWeXCI6XCImbW9wZjtcIixcIvCdk4JcIjpcIiZtc2NyO1wiLFwizrxcIjpcIiZtdTtcIixcIuKKuFwiOlwiJm11bWFwO1wiLFwi4ouZzLhcIjpcIiZuR2c7XCIsXCLiiavig5JcIjpcIiZuR3Q7XCIsXCLih41cIjpcIiZubEFycjtcIixcIuKHjlwiOlwiJm5oQXJyO1wiLFwi4ouYzLhcIjpcIiZuTGw7XCIsXCLiiarig5JcIjpcIiZuTHQ7XCIsXCLih49cIjpcIiZuckFycjtcIixcIuKKr1wiOlwiJm5WRGFzaDtcIixcIuKKrlwiOlwiJm5WZGFzaDtcIixcIsWEXCI6XCImbmFjdXRlO1wiLFwi4oig4oOSXCI6XCImbmFuZztcIixcIuKpsMy4XCI6XCImbmFwRTtcIixcIuKJi8y4XCI6XCImbmFwaWQ7XCIsXCLFiVwiOlwiJm5hcG9zO1wiLFwi4pmuXCI6XCImbmF0dXJhbDtcIixcIuKpg1wiOlwiJm5jYXA7XCIsXCLFiFwiOlwiJm5jYXJvbjtcIixcIsWGXCI6XCImbmNlZGlsO1wiLFwi4qmtzLhcIjpcIiZuY29uZ2RvdDtcIixcIuKpglwiOlwiJm5jdXA7XCIsXCLQvVwiOlwiJm5jeTtcIixcIuKAk1wiOlwiJm5kYXNoO1wiLFwi4oeXXCI6XCImbmVBcnI7XCIsXCLipKRcIjpcIiZuZWFyaGs7XCIsXCLiiZDMuFwiOlwiJm5lZG90O1wiLFwi4qSoXCI6XCImdG9lYTtcIixcIvCdlKtcIjpcIiZuZnI7XCIsXCLihq5cIjpcIiZubGVmdHJpZ2h0YXJyb3c7XCIsXCLiq7JcIjpcIiZuaHBhcjtcIixcIuKLvFwiOlwiJm5pcztcIixcIuKLulwiOlwiJm5pc2Q7XCIsXCLRmlwiOlwiJm5qY3k7XCIsXCLiiabMuFwiOlwiJm5sZXFxO1wiLFwi4oaaXCI6XCImbmxlZnRhcnJvdztcIixcIuKApVwiOlwiJm5sZHI7XCIsXCLwnZWfXCI6XCImbm9wZjtcIixcIsKsXCI6XCImbm90O1wiLFwi4ou5zLhcIjpcIiZub3RpbkU7XCIsXCLii7XMuFwiOlwiJm5vdGluZG90O1wiLFwi4ou3XCI6XCImbm90aW52YjtcIixcIuKLtlwiOlwiJm5vdGludmM7XCIsXCLii75cIjpcIiZub3RuaXZiO1wiLFwi4ou9XCI6XCImbm90bml2YztcIixcIuKrveKDpVwiOlwiJm5wYXJzbDtcIixcIuKIgsy4XCI6XCImbnBhcnQ7XCIsXCLiqJRcIjpcIiZucG9saW50O1wiLFwi4oabXCI6XCImbnJpZ2h0YXJyb3c7XCIsXCLipLPMuFwiOlwiJm5yYXJyYztcIixcIuKGncy4XCI6XCImbnJhcnJ3O1wiLFwi8J2Tg1wiOlwiJm5zY3I7XCIsXCLiioRcIjpcIiZuc3ViO1wiLFwi4quFzLhcIjpcIiZuc3Vic2V0ZXFxO1wiLFwi4oqFXCI6XCImbnN1cDtcIixcIuKrhsy4XCI6XCImbnN1cHNldGVxcTtcIixcIsOxXCI6XCImbnRpbGRlO1wiLFwizr1cIjpcIiZudTtcIixcIiNcIjpcIiZudW07XCIsXCLihJZcIjpcIiZudW1lcm87XCIsXCLigIdcIjpcIiZudW1zcDtcIixcIuKKrVwiOlwiJm52RGFzaDtcIixcIuKkhFwiOlwiJm52SGFycjtcIixcIuKJjeKDklwiOlwiJm52YXA7XCIsXCLiiqxcIjpcIiZudmRhc2g7XCIsXCLiiaXig5JcIjpcIiZudmdlO1wiLFwiPuKDklwiOlwiJm52Z3Q7XCIsXCLip55cIjpcIiZudmluZmluO1wiLFwi4qSCXCI6XCImbnZsQXJyO1wiLFwi4omk4oOSXCI6XCImbnZsZTtcIixcIjzig5JcIjpcIiZudmx0O1wiLFwi4oq04oOSXCI6XCImbnZsdHJpZTtcIixcIuKkg1wiOlwiJm52ckFycjtcIixcIuKKteKDklwiOlwiJm52cnRyaWU7XCIsXCLiiLzig5JcIjpcIiZudnNpbTtcIixcIuKHllwiOlwiJm53QXJyO1wiLFwi4qSjXCI6XCImbndhcmhrO1wiLFwi4qSnXCI6XCImbnduZWFyO1wiLFwiw7NcIjpcIiZvYWN1dGU7XCIsXCLDtFwiOlwiJm9jaXJjO1wiLFwi0L5cIjpcIiZvY3k7XCIsXCLFkVwiOlwiJm9kYmxhYztcIixcIuKouFwiOlwiJm9kaXY7XCIsXCLiprxcIjpcIiZvZHNvbGQ7XCIsXCLFk1wiOlwiJm9lbGlnO1wiLFwi4qa/XCI6XCImb2ZjaXI7XCIsXCLwnZSsXCI6XCImb2ZyO1wiLFwiy5tcIjpcIiZvZ29uO1wiLFwiw7JcIjpcIiZvZ3JhdmU7XCIsXCLip4FcIjpcIiZvZ3Q7XCIsXCLiprVcIjpcIiZvaGJhcjtcIixcIuKmvlwiOlwiJm9sY2lyO1wiLFwi4qa7XCI6XCImb2xjcm9zcztcIixcIuKngFwiOlwiJm9sdDtcIixcIsWNXCI6XCImb21hY3I7XCIsXCLPiVwiOlwiJm9tZWdhO1wiLFwizr9cIjpcIiZvbWljcm9uO1wiLFwi4qa2XCI6XCImb21pZDtcIixcIvCdlaBcIjpcIiZvb3BmO1wiLFwi4qa3XCI6XCImb3BhcjtcIixcIuKmuVwiOlwiJm9wZXJwO1wiLFwi4oioXCI6XCImdmVlO1wiLFwi4qmdXCI6XCImb3JkO1wiLFwi4oS0XCI6XCImb3NjcjtcIixcIsKqXCI6XCImb3JkZjtcIixcIsK6XCI6XCImb3JkbTtcIixcIuKKtlwiOlwiJm9yaWdvZjtcIixcIuKpllwiOlwiJm9yb3I7XCIsXCLiqZdcIjpcIiZvcnNsb3BlO1wiLFwi4qmbXCI6XCImb3J2O1wiLFwiw7hcIjpcIiZvc2xhc2g7XCIsXCLiiphcIjpcIiZvc29sO1wiLFwiw7VcIjpcIiZvdGlsZGU7XCIsXCLiqLZcIjpcIiZvdGltZXNhcztcIixcIsO2XCI6XCImb3VtbDtcIixcIuKMvVwiOlwiJm92YmFyO1wiLFwiwrZcIjpcIiZwYXJhO1wiLFwi4quzXCI6XCImcGFyc2ltO1wiLFwi4qu9XCI6XCImcGFyc2w7XCIsXCLQv1wiOlwiJnBjeTtcIixcIiVcIjpcIiZwZXJjbnQ7XCIsXCIuXCI6XCImcGVyaW9kO1wiLFwi4oCwXCI6XCImcGVybWlsO1wiLFwi4oCxXCI6XCImcGVydGVuaztcIixcIvCdlK1cIjpcIiZwZnI7XCIsXCLPhlwiOlwiJnBoaTtcIixcIs+VXCI6XCImdmFycGhpO1wiLFwi4piOXCI6XCImcGhvbmU7XCIsXCLPgFwiOlwiJnBpO1wiLFwiz5ZcIjpcIiZ2YXJwaTtcIixcIuKEjlwiOlwiJnBsYW5ja2g7XCIsXCIrXCI6XCImcGx1cztcIixcIuKoo1wiOlwiJnBsdXNhY2lyO1wiLFwi4qiiXCI6XCImcGx1c2NpcjtcIixcIuKopVwiOlwiJnBsdXNkdTtcIixcIuKpslwiOlwiJnBsdXNlO1wiLFwi4qimXCI6XCImcGx1c3NpbTtcIixcIuKop1wiOlwiJnBsdXN0d287XCIsXCLiqJVcIjpcIiZwb2ludGludDtcIixcIvCdlaFcIjpcIiZwb3BmO1wiLFwiwqNcIjpcIiZwb3VuZDtcIixcIuKqs1wiOlwiJnByRTtcIixcIuKqt1wiOlwiJnByZWNhcHByb3g7XCIsXCLiqrlcIjpcIiZwcm5hcDtcIixcIuKqtVwiOlwiJnBybkU7XCIsXCLii6hcIjpcIiZwcm5zaW07XCIsXCLigLJcIjpcIiZwcmltZTtcIixcIuKMrlwiOlwiJnByb2ZhbGFyO1wiLFwi4oySXCI6XCImcHJvZmxpbmU7XCIsXCLijJNcIjpcIiZwcm9mc3VyZjtcIixcIuKKsFwiOlwiJnBydXJlbDtcIixcIvCdk4VcIjpcIiZwc2NyO1wiLFwiz4hcIjpcIiZwc2k7XCIsXCLigIhcIjpcIiZwdW5jc3A7XCIsXCLwnZSuXCI6XCImcWZyO1wiLFwi8J2VolwiOlwiJnFvcGY7XCIsXCLigZdcIjpcIiZxcHJpbWU7XCIsXCLwnZOGXCI6XCImcXNjcjtcIixcIuKollwiOlwiJnF1YXRpbnQ7XCIsXCI/XCI6XCImcXVlc3Q7XCIsXCLipJxcIjpcIiZyQXRhaWw7XCIsXCLipaRcIjpcIiZySGFyO1wiLFwi4oi9zLFcIjpcIiZyYWNlO1wiLFwixZVcIjpcIiZyYWN1dGU7XCIsXCLiprNcIjpcIiZyYWVtcHR5djtcIixcIuKmklwiOlwiJnJhbmdkO1wiLFwi4qalXCI6XCImcmFuZ2U7XCIsXCLCu1wiOlwiJnJhcXVvO1wiLFwi4qW1XCI6XCImcmFycmFwO1wiLFwi4qSgXCI6XCImcmFycmJmcztcIixcIuKks1wiOlwiJnJhcnJjO1wiLFwi4qSeXCI6XCImcmFycmZzO1wiLFwi4qWFXCI6XCImcmFycnBsO1wiLFwi4qW0XCI6XCImcmFycnNpbTtcIixcIuKGo1wiOlwiJnJpZ2h0YXJyb3d0YWlsO1wiLFwi4oadXCI6XCImcmlnaHRzcXVpZ2Fycm93O1wiLFwi4qSaXCI6XCImcmF0YWlsO1wiLFwi4oi2XCI6XCImcmF0aW87XCIsXCLinbNcIjpcIiZyYmJyaztcIixcIn1cIjpcIiZyY3ViO1wiLFwiXVwiOlwiJnJzcWI7XCIsXCLipoxcIjpcIiZyYnJrZTtcIixcIuKmjlwiOlwiJnJicmtzbGQ7XCIsXCLippBcIjpcIiZyYnJrc2x1O1wiLFwixZlcIjpcIiZyY2Fyb247XCIsXCLFl1wiOlwiJnJjZWRpbDtcIixcItGAXCI6XCImcmN5O1wiLFwi4qS3XCI6XCImcmRjYTtcIixcIuKlqVwiOlwiJnJkbGRoYXI7XCIsXCLihrNcIjpcIiZyZHNoO1wiLFwi4patXCI6XCImcmVjdDtcIixcIuKlvVwiOlwiJnJmaXNodDtcIixcIvCdlK9cIjpcIiZyZnI7XCIsXCLipaxcIjpcIiZyaGFydWw7XCIsXCLPgVwiOlwiJnJobztcIixcIs+xXCI6XCImdmFycmhvO1wiLFwi4oeJXCI6XCImcnJhcnI7XCIsXCLii4xcIjpcIiZydGhyZWU7XCIsXCLLmlwiOlwiJnJpbmc7XCIsXCLigI9cIjpcIiZybG07XCIsXCLijrFcIjpcIiZybW91c3RhY2hlO1wiLFwi4quuXCI6XCImcm5taWQ7XCIsXCLin61cIjpcIiZyb2FuZztcIixcIuKHvlwiOlwiJnJvYXJyO1wiLFwi4qaGXCI6XCImcm9wYXI7XCIsXCLwnZWjXCI6XCImcm9wZjtcIixcIuKorlwiOlwiJnJvcGx1cztcIixcIuKotVwiOlwiJnJvdGltZXM7XCIsXCIpXCI6XCImcnBhcjtcIixcIuKmlFwiOlwiJnJwYXJndDtcIixcIuKoklwiOlwiJnJwcG9saW50O1wiLFwi4oC6XCI6XCImcnNhcXVvO1wiLFwi8J2Th1wiOlwiJnJzY3I7XCIsXCLii4pcIjpcIiZydGltZXM7XCIsXCLilrlcIjpcIiZ0cmlhbmdsZXJpZ2h0O1wiLFwi4qeOXCI6XCImcnRyaWx0cmk7XCIsXCLipahcIjpcIiZydWx1aGFyO1wiLFwi4oSeXCI6XCImcng7XCIsXCLFm1wiOlwiJnNhY3V0ZTtcIixcIuKqtFwiOlwiJnNjRTtcIixcIuKquFwiOlwiJnN1Y2NhcHByb3g7XCIsXCLFoVwiOlwiJnNjYXJvbjtcIixcIsWfXCI6XCImc2NlZGlsO1wiLFwixZ1cIjpcIiZzY2lyYztcIixcIuKqtlwiOlwiJnN1Y2NuZXFxO1wiLFwi4qq6XCI6XCImc3VjY25hcHByb3g7XCIsXCLii6lcIjpcIiZzdWNjbnNpbTtcIixcIuKok1wiOlwiJnNjcG9saW50O1wiLFwi0YFcIjpcIiZzY3k7XCIsXCLii4VcIjpcIiZzZG90O1wiLFwi4qmmXCI6XCImc2RvdGU7XCIsXCLih5hcIjpcIiZzZUFycjtcIixcIsKnXCI6XCImc2VjdDtcIixcIjtcIjpcIiZzZW1pO1wiLFwi4qSpXCI6XCImdG9zYTtcIixcIuKctlwiOlwiJnNleHQ7XCIsXCLwnZSwXCI6XCImc2ZyO1wiLFwi4pmvXCI6XCImc2hhcnA7XCIsXCLRiVwiOlwiJnNoY2hjeTtcIixcItGIXCI6XCImc2hjeTtcIixcIsKtXCI6XCImc2h5O1wiLFwiz4NcIjpcIiZzaWdtYTtcIixcIs+CXCI6XCImdmFyc2lnbWE7XCIsXCLiqapcIjpcIiZzaW1kb3Q7XCIsXCLiqp5cIjpcIiZzaW1nO1wiLFwi4qqgXCI6XCImc2ltZ0U7XCIsXCLiqp1cIjpcIiZzaW1sO1wiLFwi4qqfXCI6XCImc2ltbEU7XCIsXCLiiYZcIjpcIiZzaW1uZTtcIixcIuKopFwiOlwiJnNpbXBsdXM7XCIsXCLipbJcIjpcIiZzaW1yYXJyO1wiLFwi4qizXCI6XCImc21hc2hwO1wiLFwi4qekXCI6XCImc21lcGFyc2w7XCIsXCLijKNcIjpcIiZzc21pbGU7XCIsXCLiqqpcIjpcIiZzbXQ7XCIsXCLiqqxcIjpcIiZzbXRlO1wiLFwi4qqs77iAXCI6XCImc210ZXM7XCIsXCLRjFwiOlwiJnNvZnRjeTtcIixcIi9cIjpcIiZzb2w7XCIsXCLip4RcIjpcIiZzb2xiO1wiLFwi4oy/XCI6XCImc29sYmFyO1wiLFwi8J2VpFwiOlwiJnNvcGY7XCIsXCLimaBcIjpcIiZzcGFkZXN1aXQ7XCIsXCLiipPvuIBcIjpcIiZzcWNhcHM7XCIsXCLiipTvuIBcIjpcIiZzcWN1cHM7XCIsXCLwnZOIXCI6XCImc3NjcjtcIixcIuKYhlwiOlwiJnN0YXI7XCIsXCLiioJcIjpcIiZzdWJzZXQ7XCIsXCLiq4VcIjpcIiZzdWJzZXRlcXE7XCIsXCLiqr1cIjpcIiZzdWJkb3Q7XCIsXCLiq4NcIjpcIiZzdWJlZG90O1wiLFwi4quBXCI6XCImc3VibXVsdDtcIixcIuKri1wiOlwiJnN1YnNldG5lcXE7XCIsXCLiiopcIjpcIiZzdWJzZXRuZXE7XCIsXCLiqr9cIjpcIiZzdWJwbHVzO1wiLFwi4qW5XCI6XCImc3VicmFycjtcIixcIuKrh1wiOlwiJnN1YnNpbTtcIixcIuKrlVwiOlwiJnN1YnN1YjtcIixcIuKrk1wiOlwiJnN1YnN1cDtcIixcIuKZqlwiOlwiJnN1bmc7XCIsXCLCuVwiOlwiJnN1cDE7XCIsXCLCslwiOlwiJnN1cDI7XCIsXCLCs1wiOlwiJnN1cDM7XCIsXCLiq4ZcIjpcIiZzdXBzZXRlcXE7XCIsXCLiqr5cIjpcIiZzdXBkb3Q7XCIsXCLiq5hcIjpcIiZzdXBkc3ViO1wiLFwi4quEXCI6XCImc3VwZWRvdDtcIixcIuKfiVwiOlwiJnN1cGhzb2w7XCIsXCLiq5dcIjpcIiZzdXBoc3ViO1wiLFwi4qW7XCI6XCImc3VwbGFycjtcIixcIuKrglwiOlwiJnN1cG11bHQ7XCIsXCLiq4xcIjpcIiZzdXBzZXRuZXFxO1wiLFwi4oqLXCI6XCImc3Vwc2V0bmVxO1wiLFwi4quAXCI6XCImc3VwcGx1cztcIixcIuKriFwiOlwiJnN1cHNpbTtcIixcIuKrlFwiOlwiJnN1cHN1YjtcIixcIuKrllwiOlwiJnN1cHN1cDtcIixcIuKHmVwiOlwiJnN3QXJyO1wiLFwi4qSqXCI6XCImc3dud2FyO1wiLFwiw59cIjpcIiZzemxpZztcIixcIuKMllwiOlwiJnRhcmdldDtcIixcIs+EXCI6XCImdGF1O1wiLFwixaVcIjpcIiZ0Y2Fyb247XCIsXCLFo1wiOlwiJnRjZWRpbDtcIixcItGCXCI6XCImdGN5O1wiLFwi4oyVXCI6XCImdGVscmVjO1wiLFwi8J2UsVwiOlwiJnRmcjtcIixcIs64XCI6XCImdGhldGE7XCIsXCLPkVwiOlwiJnZhcnRoZXRhO1wiLFwiw75cIjpcIiZ0aG9ybjtcIixcIsOXXCI6XCImdGltZXM7XCIsXCLiqLFcIjpcIiZ0aW1lc2JhcjtcIixcIuKosFwiOlwiJnRpbWVzZDtcIixcIuKMtlwiOlwiJnRvcGJvdDtcIixcIuKrsVwiOlwiJnRvcGNpcjtcIixcIvCdlaVcIjpcIiZ0b3BmO1wiLFwi4quaXCI6XCImdG9wZm9yaztcIixcIuKAtFwiOlwiJnRwcmltZTtcIixcIuKWtVwiOlwiJnV0cmk7XCIsXCLiiZxcIjpcIiZ0cmllO1wiLFwi4pesXCI6XCImdHJpZG90O1wiLFwi4qi6XCI6XCImdHJpbWludXM7XCIsXCLiqLlcIjpcIiZ0cmlwbHVzO1wiLFwi4qeNXCI6XCImdHJpc2I7XCIsXCLiqLtcIjpcIiZ0cml0aW1lO1wiLFwi4o+iXCI6XCImdHJwZXppdW07XCIsXCLwnZOJXCI6XCImdHNjcjtcIixcItGGXCI6XCImdHNjeTtcIixcItGbXCI6XCImdHNoY3k7XCIsXCLFp1wiOlwiJnRzdHJvaztcIixcIuKlo1wiOlwiJnVIYXI7XCIsXCLDulwiOlwiJnVhY3V0ZTtcIixcItGeXCI6XCImdWJyY3k7XCIsXCLFrVwiOlwiJnVicmV2ZTtcIixcIsO7XCI6XCImdWNpcmM7XCIsXCLRg1wiOlwiJnVjeTtcIixcIsWxXCI6XCImdWRibGFjO1wiLFwi4qW+XCI6XCImdWZpc2h0O1wiLFwi8J2UslwiOlwiJnVmcjtcIixcIsO5XCI6XCImdWdyYXZlO1wiLFwi4paAXCI6XCImdWhibGs7XCIsXCLijJxcIjpcIiZ1bGNvcm5lcjtcIixcIuKMj1wiOlwiJnVsY3JvcDtcIixcIuKXuFwiOlwiJnVsdHJpO1wiLFwixatcIjpcIiZ1bWFjcjtcIixcIsWzXCI6XCImdW9nb247XCIsXCLwnZWmXCI6XCImdW9wZjtcIixcIs+FXCI6XCImdXBzaWxvbjtcIixcIuKHiFwiOlwiJnV1YXJyO1wiLFwi4oydXCI6XCImdXJjb3JuZXI7XCIsXCLijI5cIjpcIiZ1cmNyb3A7XCIsXCLFr1wiOlwiJnVyaW5nO1wiLFwi4pe5XCI6XCImdXJ0cmk7XCIsXCLwnZOKXCI6XCImdXNjcjtcIixcIuKLsFwiOlwiJnV0ZG90O1wiLFwixalcIjpcIiZ1dGlsZGU7XCIsXCLDvFwiOlwiJnV1bWw7XCIsXCLipqdcIjpcIiZ1d2FuZ2xlO1wiLFwi4quoXCI6XCImdkJhcjtcIixcIuKrqVwiOlwiJnZCYXJ2O1wiLFwi4qacXCI6XCImdmFuZ3J0O1wiLFwi4oqK77iAXCI6XCImdnN1Ym5lO1wiLFwi4quL77iAXCI6XCImdnN1Ym5FO1wiLFwi4oqL77iAXCI6XCImdnN1cG5lO1wiLFwi4quM77iAXCI6XCImdnN1cG5FO1wiLFwi0LJcIjpcIiZ2Y3k7XCIsXCLiirtcIjpcIiZ2ZWViYXI7XCIsXCLiiZpcIjpcIiZ2ZWVlcTtcIixcIuKLrlwiOlwiJnZlbGxpcDtcIixcIvCdlLNcIjpcIiZ2ZnI7XCIsXCLwnZWnXCI6XCImdm9wZjtcIixcIvCdk4tcIjpcIiZ2c2NyO1wiLFwi4qaaXCI6XCImdnppZ3phZztcIixcIsW1XCI6XCImd2NpcmM7XCIsXCLiqZ9cIjpcIiZ3ZWRiYXI7XCIsXCLiiZlcIjpcIiZ3ZWRnZXE7XCIsXCLihJhcIjpcIiZ3cDtcIixcIvCdlLRcIjpcIiZ3ZnI7XCIsXCLwnZWoXCI6XCImd29wZjtcIixcIvCdk4xcIjpcIiZ3c2NyO1wiLFwi8J2UtVwiOlwiJnhmcjtcIixcIs6+XCI6XCImeGk7XCIsXCLii7tcIjpcIiZ4bmlzO1wiLFwi8J2VqVwiOlwiJnhvcGY7XCIsXCLwnZONXCI6XCImeHNjcjtcIixcIsO9XCI6XCImeWFjdXRlO1wiLFwi0Y9cIjpcIiZ5YWN5O1wiLFwixbdcIjpcIiZ5Y2lyYztcIixcItGLXCI6XCImeWN5O1wiLFwiwqVcIjpcIiZ5ZW47XCIsXCLwnZS2XCI6XCImeWZyO1wiLFwi0ZdcIjpcIiZ5aWN5O1wiLFwi8J2VqlwiOlwiJnlvcGY7XCIsXCLwnZOOXCI6XCImeXNjcjtcIixcItGOXCI6XCImeXVjeTtcIixcIsO/XCI6XCImeXVtbDtcIixcIsW6XCI6XCImemFjdXRlO1wiLFwixb5cIjpcIiZ6Y2Fyb247XCIsXCLQt1wiOlwiJnpjeTtcIixcIsW8XCI6XCImemRvdDtcIixcIs62XCI6XCImemV0YTtcIixcIvCdlLdcIjpcIiZ6ZnI7XCIsXCLQtlwiOlwiJnpoY3k7XCIsXCLih51cIjpcIiZ6aWdyYXJyO1wiLFwi8J2Vq1wiOlwiJnpvcGY7XCIsXCLwnZOPXCI6XCImenNjcjtcIixcIuKAjVwiOlwiJnp3ajtcIixcIuKAjFwiOlwiJnp3bmo7XCJ9fX07IiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOnRydWV9KTtleHBvcnRzLm51bWVyaWNVbmljb2RlTWFwPXswOjY1NTMzLDEyODo4MzY0LDEzMDo4MjE4LDEzMTo0MDIsMTMyOjgyMjIsMTMzOjgyMzAsMTM0OjgyMjQsMTM1OjgyMjUsMTM2OjcxMCwxMzc6ODI0MCwxMzg6MzUyLDEzOTo4MjQ5LDE0MDozMzgsMTQyOjM4MSwxNDU6ODIxNiwxNDY6ODIxNywxNDc6ODIyMCwxNDg6ODIyMSwxNDk6ODIyNiwxNTA6ODIxMSwxNTE6ODIxMiwxNTI6NzMyLDE1Mzo4NDgyLDE1NDozNTMsMTU1OjgyNTAsMTU2OjMzOSwxNTg6MzgyLDE1OTozNzZ9OyIsIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7ZXhwb3J0cy5mcm9tQ29kZVBvaW50PVN0cmluZy5mcm9tQ29kZVBvaW50fHxmdW5jdGlvbihhc3RyYWxDb2RlUG9pbnQpe3JldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKE1hdGguZmxvb3IoKGFzdHJhbENvZGVQb2ludC02NTUzNikvMTAyNCkrNTUyOTYsKGFzdHJhbENvZGVQb2ludC02NTUzNiklMTAyNCs1NjMyMCl9O2V4cG9ydHMuZ2V0Q29kZVBvaW50PVN0cmluZy5wcm90b3R5cGUuY29kZVBvaW50QXQ/ZnVuY3Rpb24oaW5wdXQscG9zaXRpb24pe3JldHVybiBpbnB1dC5jb2RlUG9pbnRBdChwb3NpdGlvbil9OmZ1bmN0aW9uKGlucHV0LHBvc2l0aW9uKXtyZXR1cm4oaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbiktNTUyOTYpKjEwMjQraW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbisxKS01NjMyMCs2NTUzNn07ZXhwb3J0cy5oaWdoU3Vycm9nYXRlRnJvbT01NTI5NjtleHBvcnRzLmhpZ2hTdXJyb2dhdGVUbz01NjMxOTsiLCJleHBvcnQgZGVmYXVsdCBcInByZWNpc2lvbiBoaWdocCBmbG9hdDtcXG4jZGVmaW5lIEdMU0xJRlkgMVxcblxcbiNkZWZpbmUgUEkgMy4xNDE1OTI2NTM1ODk3OTMyMzg0NjI2NDMzODMyNzk1XFxuXFxudW5pZm9ybSB2ZWMyIHVNYXNrUG9zaXRpb247XFxudW5pZm9ybSBzYW1wbGVyMkQgdVRleHR1cmU7XFxuXFxudmFyeWluZyB2ZWMyIHZVdjtcXG5cXG4vLyBGdW5jdGlvbiB0byBjcmVhdGUgYSByZWN0YW5nbGVcXG52ZWMzIFJlY3RhbmdsZShpbiB2ZWMyIHNpemUsIGluIHZlYzIgc3QsIGluIHZlYzIgcCwgaW4gdmVjMyBjKSB7XFxuICBmbG9hdCB0b3AgPSBzdGVwKDEuIC0gKHAueSArIHNpemUueSksIDEuIC0gc3QueSk7XFxuICBmbG9hdCByaWdodCA9IHN0ZXAoMS4gLSAocC54ICsgc2l6ZS54KSwgMS4gLSBzdC54KTtcXG4gIGZsb2F0IGJvdHRvbSA9IHN0ZXAocC55LCBzdC55KTtcXG4gIGZsb2F0IGxlZnQgPSBzdGVwKHAueCwgc3QueCk7XFxuICByZXR1cm4gdG9wICogcmlnaHQgKiBib3R0b20gKiBsZWZ0ICogYztcXG59XFxuXFxuLy8gRnVuY3Rpb24gdG8gY3JlYXRlIGEgY2lyY2xlXFxuZmxvYXQgY2lyY2xlKGluIHZlYzIgX3N0LCBpbiBmbG9hdCBfcmFkaXVzKXtcXG4gICAgdmVjMiBkaXN0ID0gX3N0LXZlYzIoMC41KTtcXG5cXHRyZXR1cm4gMS4tc21vb3Roc3RlcChfcmFkaXVzLShfcmFkaXVzKjAuMDEpLFxcbiAgICAgICAgICAgICAgICAgICAgICAgICBfcmFkaXVzKyhfcmFkaXVzKjAuMDEpLFxcbiAgICAgICAgICAgICAgICAgICAgICAgICBkb3QoZGlzdCxkaXN0KSo0LjApO1xcbn1cXG5cXG52b2lkIG1haW4oKSB7XFxuICAgIC8vIFRoaXMgc28gdGhhdCB1diB2YWx1ZSBnb2VzIGZyb20gLTAuNSB0byAwLjVcXG4gICAgLy8gY2hhbmdlcyBvcmlnaW4gZnJvbSBib3R0b20gbGVmdCB0byBjZW50ZXJcXG4gICAgdmVjMiB1diA9IHZVdiAtIDAuNTtcXG4gICAgLy8gdG8gbWFrZSBpdCBhIHNxdWFyZVxcbiAgICB1di54ICo9IDIuMDtcXG5cXG4gICAgdmVjMiBtYXNrU2l6ZSA9IHZlYzIoMC4zLCAwLjMpO1xcblxcbiAgICAvLyBOb3RlIHRoYXQgd2UncmUgc3VidHJhY3RpbmcgSEFMRiBvZiB0aGUgd2lkdGggYW5kIGhlaWdodCB0byBwb3NpdGlvbiB0aGUgcmVjdGFuZ2xlIGF0IHRoZSBjZW50ZXIgb2YgdGhlIHNjZW5lXFxuICAgIC8vIFRoaXMgaXMgbGlrZSB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKVxcbiAgICAvLyB2ZWMyIG1hc2tQb3NpdGlvbiA9IHZlYzIoLTAuMTUsIC0wLjE1KTtcXG4gICAgdmVjMiBtYXNrUG9zaXRpb24gPSB2ZWMyKHVNYXNrUG9zaXRpb24ueCAqIDIuMCAtIDEuMTUsIHVNYXNrUG9zaXRpb24ueSAtIDAuNjUpO1xcbiAgICB2ZWMzIG1hc2tDb2xvciA9ICB2ZWMzKDEuMCk7XFxuXFxuICAgIHZlYzMgY29sb3IgPSB2ZWMzKDAuMCk7XFxuICAgIFxcbiAgICAvLyBUaGlzIGdpdmVzIGEgcmVjdGFuZ3VsYXIgbWFza1xcbiAgICAvLyB2ZWMzIG1hc2sgPSBSZWN0YW5nbGUobWFza1NpemUsIG1hc2tVViwgbWFza1Bvc2l0aW9uLCBtYXNrQ29sb3IpO1xcblxcbiAgICAvLyBUaGlzIGdpdmVzIGEgY2lyY3VsYXIgbWFza1xcbiAgICB2ZWMyIHN0ID0gKHV2Lnh5IC0gbWFza1Bvc2l0aW9uICsgMC4zNSk7XFxuICAgIHZlYzMgbWFzayA9IHZlYzMoY2lyY2xlKHN0LCAwLjMpKTtcXG5cXG4gICAgXFxuICAgIHZlYzMgdGV4dHVyZSA9IHRleHR1cmUyRCh1VGV4dHVyZSwgdXYgKiAwLjUgKyAwLjUpLnJnYjtcXG5cXG4gICAgY29sb3IgPSB0ZXh0dXJlICogbWFzaztcXG5cXG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNChjb2xvciwgMS4wKTtcXG59XCI7IiwiZXhwb3J0IGRlZmF1bHQgXCJwcmVjaXNpb24gaGlnaHAgZmxvYXQ7XFxuI2RlZmluZSBHTFNMSUZZIDFcXG5cXG5hdHRyaWJ1dGUgdmVjMiB1djtcXG5hdHRyaWJ1dGUgdmVjMyBwb3NpdGlvbjtcXG5hdHRyaWJ1dGUgdmVjMyBub3JtYWw7XFxuXFxudW5pZm9ybSBtYXQ0IG1vZGVsVmlld01hdHJpeDtcXG51bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDtcXG5cXG52YXJ5aW5nIHZlYzIgdlV2O1xcblxcbnZvaWQgbWFpbigpIHtcXG4gIHZVdiA9IHV2O1xcblxcbiAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTtcXG59XCI7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwgeyB3cml0YWJsZTogZmFsc2UgfSk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi4vdXRpbHMvbG9nLmpzXCI7XG5cbnZhciBXZWJTb2NrZXRDbGllbnQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKi9cbiAgZnVuY3Rpb24gV2ViU29ja2V0Q2xpZW50KHVybCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBXZWJTb2NrZXRDbGllbnQpO1xuXG4gICAgdGhpcy5jbGllbnQgPSBuZXcgV2ViU29ja2V0KHVybCk7XG5cbiAgICB0aGlzLmNsaWVudC5vbmVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBsb2cuZXJyb3IoZXJyb3IpO1xuICAgIH07XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBmXG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKFdlYlNvY2tldENsaWVudCwgW3tcbiAgICBrZXk6IFwib25PcGVuXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uT3BlbihmKSB7XG4gICAgICB0aGlzLmNsaWVudC5vbm9wZW4gPSBmO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gZlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwib25DbG9zZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkNsb3NlKGYpIHtcbiAgICAgIHRoaXMuY2xpZW50Lm9uY2xvc2UgPSBmO1xuICAgIH0gLy8gY2FsbCBmIHdpdGggdGhlIG1lc3NhZ2Ugc3RyaW5nIGFzIHRoZSBmaXJzdCBhcmd1bWVudFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IGZcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcIm9uTWVzc2FnZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk1lc3NhZ2UoZikge1xuICAgICAgdGhpcy5jbGllbnQub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZihlLmRhdGEpO1xuICAgICAgfTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gV2ViU29ja2V0Q2xpZW50O1xufSgpO1xuXG5leHBvcnQgeyBXZWJTb2NrZXRDbGllbnQgYXMgZGVmYXVsdCB9OyIsIi8qKioqKiovIChmdW5jdGlvbigpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHRcInVzZSBzdHJpY3RcIjtcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVzX18gPSAoe1xuXG4vKioqLyBcIi4vY2xpZW50LXNyYy9tb2R1bGVzL2xvZ2dlci9TeW5jQmFpbEhvb2tGYWtlLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vY2xpZW50LXNyYy9tb2R1bGVzL2xvZ2dlci9TeW5jQmFpbEhvb2tGYWtlLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSkge1xuXG5cbi8qKlxuICogQ2xpZW50IHN0dWIgZm9yIHRhcGFibGUgU3luY0JhaWxIb29rXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjbGllbnRUYXBhYmxlU3luY0JhaWxIb29rKCkge1xuICByZXR1cm4ge1xuICAgIGNhbGw6IGZ1bmN0aW9uIGNhbGwoKSB7fVxuICB9O1xufTtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9Mb2dnZXIuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9Mb2dnZXIuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24oX191bnVzZWRfd2VicGFja19tb2R1bGUsIGV4cG9ydHMpIHtcblxuLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5KGFycikgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFycikgfHwgX25vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkgIT09IFwidW5kZWZpbmVkXCIgJiYgaXRlclsodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KS5pdGVyYXRvcl0gIT0gbnVsbCB8fCBpdGVyW1wiQEBpdGVyYXRvclwiXSAhPSBudWxsKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn1cblxuZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgYXJyMltpXSA9IGFycltpXTtcbiAgfVxuXG4gIHJldHVybiBhcnIyO1xufVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxudmFyIExvZ1R5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgZXJyb3I6XG4gIC8qKiBAdHlwZSB7XCJlcnJvclwifSAqL1xuICBcImVycm9yXCIsXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIHdhcm46XG4gIC8qKiBAdHlwZSB7XCJ3YXJuXCJ9ICovXG4gIFwid2FyblwiLFxuICAvLyBtZXNzYWdlLCBjIHN0eWxlIGFyZ3VtZW50c1xuICBpbmZvOlxuICAvKiogQHR5cGUge1wiaW5mb1wifSAqL1xuICBcImluZm9cIixcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgbG9nOlxuICAvKiogQHR5cGUge1wibG9nXCJ9ICovXG4gIFwibG9nXCIsXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIGRlYnVnOlxuICAvKiogQHR5cGUge1wiZGVidWdcIn0gKi9cbiAgXCJkZWJ1Z1wiLFxuICAvLyBtZXNzYWdlLCBjIHN0eWxlIGFyZ3VtZW50c1xuICB0cmFjZTpcbiAgLyoqIEB0eXBlIHtcInRyYWNlXCJ9ICovXG4gIFwidHJhY2VcIixcbiAgLy8gbm8gYXJndW1lbnRzXG4gIGdyb3VwOlxuICAvKiogQHR5cGUge1wiZ3JvdXBcIn0gKi9cbiAgXCJncm91cFwiLFxuICAvLyBbbGFiZWxdXG4gIGdyb3VwQ29sbGFwc2VkOlxuICAvKiogQHR5cGUge1wiZ3JvdXBDb2xsYXBzZWRcIn0gKi9cbiAgXCJncm91cENvbGxhcHNlZFwiLFxuICAvLyBbbGFiZWxdXG4gIGdyb3VwRW5kOlxuICAvKiogQHR5cGUge1wiZ3JvdXBFbmRcIn0gKi9cbiAgXCJncm91cEVuZFwiLFxuICAvLyBbbGFiZWxdXG4gIHByb2ZpbGU6XG4gIC8qKiBAdHlwZSB7XCJwcm9maWxlXCJ9ICovXG4gIFwicHJvZmlsZVwiLFxuICAvLyBbcHJvZmlsZU5hbWVdXG4gIHByb2ZpbGVFbmQ6XG4gIC8qKiBAdHlwZSB7XCJwcm9maWxlRW5kXCJ9ICovXG4gIFwicHJvZmlsZUVuZFwiLFxuICAvLyBbcHJvZmlsZU5hbWVdXG4gIHRpbWU6XG4gIC8qKiBAdHlwZSB7XCJ0aW1lXCJ9ICovXG4gIFwidGltZVwiLFxuICAvLyBuYW1lLCB0aW1lIGFzIFtzZWNvbmRzLCBuYW5vc2Vjb25kc11cbiAgY2xlYXI6XG4gIC8qKiBAdHlwZSB7XCJjbGVhclwifSAqL1xuICBcImNsZWFyXCIsXG4gIC8vIG5vIGFyZ3VtZW50c1xuICBzdGF0dXM6XG4gIC8qKiBAdHlwZSB7XCJzdGF0dXNcIn0gKi9cbiAgXCJzdGF0dXNcIiAvLyBtZXNzYWdlLCBhcmd1bWVudHNcblxufSk7XG5leHBvcnRzLkxvZ1R5cGUgPSBMb2dUeXBlO1xuLyoqIEB0eXBlZGVmIHt0eXBlb2YgTG9nVHlwZVtrZXlvZiB0eXBlb2YgTG9nVHlwZV19IExvZ1R5cGVFbnVtICovXG5cbnZhciBMT0dfU1lNQk9MID0gKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkoXCJ3ZWJwYWNrIGxvZ2dlciByYXcgbG9nIG1ldGhvZFwiKTtcbnZhciBUSU1FUlNfU1lNQk9MID0gKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkoXCJ3ZWJwYWNrIGxvZ2dlciB0aW1lc1wiKTtcbnZhciBUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0wgPSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KShcIndlYnBhY2sgbG9nZ2VyIGFnZ3JlZ2F0ZWQgdGltZXNcIik7XG5cbnZhciBXZWJwYWNrTG9nZ2VyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oTG9nVHlwZUVudW0sIGFueVtdPSk6IHZvaWR9IGxvZyBsb2cgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtmdW5jdGlvbihzdHJpbmcgfCBmdW5jdGlvbigpOiBzdHJpbmcpOiBXZWJwYWNrTG9nZ2VyfSBnZXRDaGlsZExvZ2dlciBmdW5jdGlvbiB0byBjcmVhdGUgY2hpbGQgbG9nZ2VyXG4gICAqL1xuICBmdW5jdGlvbiBXZWJwYWNrTG9nZ2VyKGxvZywgZ2V0Q2hpbGRMb2dnZXIpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgV2VicGFja0xvZ2dlcik7XG5cbiAgICB0aGlzW0xPR19TWU1CT0xdID0gbG9nO1xuICAgIHRoaXMuZ2V0Q2hpbGRMb2dnZXIgPSBnZXRDaGlsZExvZ2dlcjtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhXZWJwYWNrTG9nZ2VyLCBbe1xuICAgIGtleTogXCJlcnJvclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlcnJvcigpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZXJyb3IsIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ3YXJuXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHdhcm4oKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUud2FybiwgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImluZm9cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5mbygpIHtcbiAgICAgIGZvciAodmFyIF9sZW4zID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMyksIF9rZXkzID0gMDsgX2tleTMgPCBfbGVuMzsgX2tleTMrKykge1xuICAgICAgICBhcmdzW19rZXkzXSA9IGFyZ3VtZW50c1tfa2V5M107XG4gICAgICB9XG5cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5pbmZvLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibG9nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxvZygpIHtcbiAgICAgIGZvciAodmFyIF9sZW40ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNCksIF9rZXk0ID0gMDsgX2tleTQgPCBfbGVuNDsgX2tleTQrKykge1xuICAgICAgICBhcmdzW19rZXk0XSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgICB9XG5cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5sb2csIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZWJ1Z1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZWJ1ZygpIHtcbiAgICAgIGZvciAodmFyIF9sZW41ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNSksIF9rZXk1ID0gMDsgX2tleTUgPCBfbGVuNTsgX2tleTUrKykge1xuICAgICAgICBhcmdzW19rZXk1XSA9IGFyZ3VtZW50c1tfa2V5NV07XG4gICAgICB9XG5cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5kZWJ1ZywgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImFzc2VydFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhc3NlcnQoYXNzZXJ0aW9uKSB7XG4gICAgICBpZiAoIWFzc2VydGlvbikge1xuICAgICAgICBmb3IgKHZhciBfbGVuNiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjYgPiAxID8gX2xlbjYgLSAxIDogMCksIF9rZXk2ID0gMTsgX2tleTYgPCBfbGVuNjsgX2tleTYrKykge1xuICAgICAgICAgIGFyZ3NbX2tleTYgLSAxXSA9IGFyZ3VtZW50c1tfa2V5Nl07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZXJyb3IsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0cmFjZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0cmFjZSgpIHtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS50cmFjZSwgW1wiVHJhY2VcIl0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjbGVhclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5jbGVhcik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInN0YXR1c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdGF0dXMoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuNyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjcpLCBfa2V5NyA9IDA7IF9rZXk3IDwgX2xlbjc7IF9rZXk3KyspIHtcbiAgICAgICAgYXJnc1tfa2V5N10gPSBhcmd1bWVudHNbX2tleTddO1xuICAgICAgfVxuXG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuc3RhdHVzLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ3JvdXBcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ3JvdXAoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuOCA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjgpLCBfa2V5OCA9IDA7IF9rZXk4IDwgX2xlbjg7IF9rZXk4KyspIHtcbiAgICAgICAgYXJnc1tfa2V5OF0gPSBhcmd1bWVudHNbX2tleThdO1xuICAgICAgfVxuXG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZ3JvdXAsIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJncm91cENvbGxhcHNlZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBncm91cENvbGxhcHNlZCgpIHtcbiAgICAgIGZvciAodmFyIF9sZW45ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuOSksIF9rZXk5ID0gMDsgX2tleTkgPCBfbGVuOTsgX2tleTkrKykge1xuICAgICAgICBhcmdzW19rZXk5XSA9IGFyZ3VtZW50c1tfa2V5OV07XG4gICAgICB9XG5cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5ncm91cENvbGxhcHNlZCwgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdyb3VwRW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdyb3VwRW5kKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjEwID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMTApLCBfa2V5MTAgPSAwOyBfa2V5MTAgPCBfbGVuMTA7IF9rZXkxMCsrKSB7XG4gICAgICAgIGFyZ3NbX2tleTEwXSA9IGFyZ3VtZW50c1tfa2V5MTBdO1xuICAgICAgfVxuXG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZ3JvdXBFbmQsIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwcm9maWxlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByb2ZpbGUobGFiZWwpIHtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5wcm9maWxlLCBbbGFiZWxdKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicHJvZmlsZUVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcm9maWxlRW5kKGxhYmVsKSB7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUucHJvZmlsZUVuZCwgW2xhYmVsXSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRpbWVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZShsYWJlbCkge1xuICAgICAgdGhpc1tUSU1FUlNfU1lNQk9MXSA9IHRoaXNbVElNRVJTX1NZTUJPTF0gfHwgbmV3IE1hcCgpO1xuICAgICAgdGhpc1tUSU1FUlNfU1lNQk9MXS5zZXQobGFiZWwsIHByb2Nlc3MuaHJ0aW1lKCkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lTG9nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWVMb2cobGFiZWwpIHtcbiAgICAgIHZhciBwcmV2ID0gdGhpc1tUSU1FUlNfU1lNQk9MXSAmJiB0aGlzW1RJTUVSU19TWU1CT0xdLmdldChsYWJlbCk7XG5cbiAgICAgIGlmICghcHJldikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzdWNoIGxhYmVsICdcIi5jb25jYXQobGFiZWwsIFwiJyBmb3IgV2VicGFja0xvZ2dlci50aW1lTG9nKClcIikpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGltZSA9IHByb2Nlc3MuaHJ0aW1lKHByZXYpO1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnRpbWUsIFtsYWJlbF0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheSh0aW1lKSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lRW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWVFbmQobGFiZWwpIHtcbiAgICAgIHZhciBwcmV2ID0gdGhpc1tUSU1FUlNfU1lNQk9MXSAmJiB0aGlzW1RJTUVSU19TWU1CT0xdLmdldChsYWJlbCk7XG5cbiAgICAgIGlmICghcHJldikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzdWNoIGxhYmVsICdcIi5jb25jYXQobGFiZWwsIFwiJyBmb3IgV2VicGFja0xvZ2dlci50aW1lRW5kKClcIikpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGltZSA9IHByb2Nlc3MuaHJ0aW1lKHByZXYpO1xuICAgICAgdGhpc1tUSU1FUlNfU1lNQk9MXS5kZWxldGUobGFiZWwpO1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnRpbWUsIFtsYWJlbF0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheSh0aW1lKSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lQWdncmVnYXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWVBZ2dyZWdhdGUobGFiZWwpIHtcbiAgICAgIHZhciBwcmV2ID0gdGhpc1tUSU1FUlNfU1lNQk9MXSAmJiB0aGlzW1RJTUVSU19TWU1CT0xdLmdldChsYWJlbCk7XG5cbiAgICAgIGlmICghcHJldikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzdWNoIGxhYmVsICdcIi5jb25jYXQobGFiZWwsIFwiJyBmb3IgV2VicGFja0xvZ2dlci50aW1lQWdncmVnYXRlKClcIikpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGltZSA9IHByb2Nlc3MuaHJ0aW1lKHByZXYpO1xuICAgICAgdGhpc1tUSU1FUlNfU1lNQk9MXS5kZWxldGUobGFiZWwpO1xuICAgICAgdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdID0gdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdIHx8IG5ldyBNYXAoKTtcbiAgICAgIHZhciBjdXJyZW50ID0gdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdLmdldChsYWJlbCk7XG5cbiAgICAgIGlmIChjdXJyZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHRpbWVbMV0gKyBjdXJyZW50WzFdID4gMWU5KSB7XG4gICAgICAgICAgdGltZVswXSArPSBjdXJyZW50WzBdICsgMTtcbiAgICAgICAgICB0aW1lWzFdID0gdGltZVsxXSAtIDFlOSArIGN1cnJlbnRbMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGltZVswXSArPSBjdXJyZW50WzBdO1xuICAgICAgICAgIHRpbWVbMV0gKz0gY3VycmVudFsxXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0uc2V0KGxhYmVsLCB0aW1lKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidGltZUFnZ3JlZ2F0ZUVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0aW1lQWdncmVnYXRlRW5kKGxhYmVsKSB7XG4gICAgICBpZiAodGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICAgIHZhciB0aW1lID0gdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdLmdldChsYWJlbCk7XG4gICAgICBpZiAodGltZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgICB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0uZGVsZXRlKGxhYmVsKTtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS50aW1lLCBbbGFiZWxdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkodGltZSkpKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gV2VicGFja0xvZ2dlcjtcbn0oKTtcblxuZXhwb3J0cy5Mb2dnZXIgPSBXZWJwYWNrTG9nZ2VyO1xuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL2NyZWF0ZUNvbnNvbGVMb2dnZXIuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvY3JlYXRlQ29uc29sZUxvZ2dlci5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBfX3VudXNlZF93ZWJwYWNrX2V4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5KGFycikgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFycikgfHwgX25vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkgIT09IFwidW5kZWZpbmVkXCIgJiYgaXRlclsodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KS5pdGVyYXRvcl0gIT0gbnVsbCB8fCBpdGVyW1wiQEBpdGVyYXRvclwiXSAhPSBudWxsKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn1cblxuZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgYXJyMltpXSA9IGFycltpXTtcbiAgfVxuXG4gIHJldHVybiBhcnIyO1xufVxuXG52YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL0xvZ2dlciAqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvTG9nZ2VyLmpzXCIpLFxuICAgIExvZ1R5cGUgPSBfcmVxdWlyZS5Mb2dUeXBlO1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi8uLi9kZWNsYXJhdGlvbnMvV2VicGFja09wdGlvbnNcIikuRmlsdGVySXRlbVR5cGVzfSBGaWx0ZXJJdGVtVHlwZXMgKi9cblxuLyoqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi8uLi9kZWNsYXJhdGlvbnMvV2VicGFja09wdGlvbnNcIikuRmlsdGVyVHlwZXN9IEZpbHRlclR5cGVzICovXG5cbi8qKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi9Mb2dnZXJcIikuTG9nVHlwZUVudW19IExvZ1R5cGVFbnVtICovXG5cbi8qKiBAdHlwZWRlZiB7ZnVuY3Rpb24oc3RyaW5nKTogYm9vbGVhbn0gRmlsdGVyRnVuY3Rpb24gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBMb2dnZXJDb25zb2xlXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9uKCk6IHZvaWR9IGNsZWFyXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9uKCk6IHZvaWR9IHRyYWNlXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gaW5mb1xuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IGxvZ1xuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IHdhcm5cbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBlcnJvclxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBkZWJ1Z1xuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBncm91cFxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBncm91cENvbGxhcHNlZFxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBncm91cEVuZFxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBzdGF0dXNcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gcHJvZmlsZVxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBwcm9maWxlRW5kXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IGxvZ1RpbWVcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IExvZ2dlck9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7ZmFsc2V8dHJ1ZXxcIm5vbmVcInxcImVycm9yXCJ8XCJ3YXJuXCJ8XCJpbmZvXCJ8XCJsb2dcInxcInZlcmJvc2VcIn0gbGV2ZWwgbG9nbGV2ZWxcbiAqIEBwcm9wZXJ0eSB7RmlsdGVyVHlwZXN8Ym9vbGVhbn0gZGVidWcgZmlsdGVyIGZvciBkZWJ1ZyBsb2dnaW5nXG4gKiBAcHJvcGVydHkge0xvZ2dlckNvbnNvbGV9IGNvbnNvbGUgdGhlIGNvbnNvbGUgdG8gbG9nIHRvXG4gKi9cblxuLyoqXG4gKiBAcGFyYW0ge0ZpbHRlckl0ZW1UeXBlc30gaXRlbSBhbiBpbnB1dCBpdGVtXG4gKiBAcmV0dXJucyB7RmlsdGVyRnVuY3Rpb259IGZpbHRlciBmdW5jdGlvblxuICovXG5cblxudmFyIGZpbHRlclRvRnVuY3Rpb24gPSBmdW5jdGlvbiBmaWx0ZXJUb0Z1bmN0aW9uKGl0ZW0pIHtcbiAgaWYgKHR5cGVvZiBpdGVtID09PSBcInN0cmluZ1wiKSB7XG4gICAgdmFyIHJlZ0V4cCA9IG5ldyBSZWdFeHAoXCJbXFxcXFxcXFwvXVwiLmNvbmNhdChpdGVtLnJlcGxhY2UoIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICAgIC9bLVtcXF17fSgpKis/LlxcXFxeJHxdL2csIFwiXFxcXCQmXCIpLCBcIihbXFxcXFxcXFwvXXwkfCF8XFxcXD8pXCIpKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGlkZW50KSB7XG4gICAgICByZXR1cm4gcmVnRXhwLnRlc3QoaWRlbnQpO1xuICAgIH07XG4gIH1cblxuICBpZiAoaXRlbSAmJiB0eXBlb2YgaXRlbSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgaXRlbS50ZXN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGlkZW50KSB7XG4gICAgICByZXR1cm4gaXRlbS50ZXN0KGlkZW50KTtcbiAgICB9O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBpdGVtID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gaXRlbTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJib29sZWFuXCIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfTtcbiAgfVxufTtcbi8qKlxuICogQGVudW0ge251bWJlcn1cbiAqL1xuXG5cbnZhciBMb2dMZXZlbCA9IHtcbiAgbm9uZTogNixcbiAgZmFsc2U6IDYsXG4gIGVycm9yOiA1LFxuICB3YXJuOiA0LFxuICBpbmZvOiAzLFxuICBsb2c6IDIsXG4gIHRydWU6IDIsXG4gIHZlcmJvc2U6IDFcbn07XG4vKipcbiAqIEBwYXJhbSB7TG9nZ2VyT3B0aW9uc30gb3B0aW9ucyBvcHRpb25zIG9iamVjdFxuICogQHJldHVybnMge2Z1bmN0aW9uKHN0cmluZywgTG9nVHlwZUVudW0sIGFueVtdKTogdm9pZH0gbG9nZ2luZyBmdW5jdGlvblxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIF9yZWYkbGV2ZWwgPSBfcmVmLmxldmVsLFxuICAgICAgbGV2ZWwgPSBfcmVmJGxldmVsID09PSB2b2lkIDAgPyBcImluZm9cIiA6IF9yZWYkbGV2ZWwsXG4gICAgICBfcmVmJGRlYnVnID0gX3JlZi5kZWJ1ZyxcbiAgICAgIGRlYnVnID0gX3JlZiRkZWJ1ZyA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVmJGRlYnVnLFxuICAgICAgY29uc29sZSA9IF9yZWYuY29uc29sZTtcbiAgdmFyIGRlYnVnRmlsdGVycyA9IHR5cGVvZiBkZWJ1ZyA9PT0gXCJib29sZWFuXCIgPyBbZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkZWJ1ZztcbiAgfV0gOlxuICAvKiogQHR5cGUge0ZpbHRlckl0ZW1UeXBlc1tdfSAqL1xuICBbXS5jb25jYXQoZGVidWcpLm1hcChmaWx0ZXJUb0Z1bmN0aW9uKTtcbiAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG5cbiAgdmFyIGxvZ2xldmVsID0gTG9nTGV2ZWxbXCJcIi5jb25jYXQobGV2ZWwpXSB8fCAwO1xuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgbmFtZSBvZiB0aGUgbG9nZ2VyXG4gICAqIEBwYXJhbSB7TG9nVHlwZUVudW19IHR5cGUgdHlwZSBvZiB0aGUgbG9nIGVudHJ5XG4gICAqIEBwYXJhbSB7YW55W119IGFyZ3MgYXJndW1lbnRzIG9mIHRoZSBsb2cgZW50cnlcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuXG4gIHZhciBsb2dnZXIgPSBmdW5jdGlvbiBsb2dnZXIobmFtZSwgdHlwZSwgYXJncykge1xuICAgIHZhciBsYWJlbGVkQXJncyA9IGZ1bmN0aW9uIGxhYmVsZWRBcmdzKCkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJncykpIHtcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gMCAmJiB0eXBlb2YgYXJnc1swXSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIHJldHVybiBbXCJbXCIuY29uY2F0KG5hbWUsIFwiXSBcIikuY29uY2F0KGFyZ3NbMF0pXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KGFyZ3Muc2xpY2UoMSkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gW1wiW1wiLmNvbmNhdChuYW1lLCBcIl1cIildLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoYXJncykpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBkZWJ1ZyA9IGRlYnVnRmlsdGVycy5zb21lKGZ1bmN0aW9uIChmKSB7XG4gICAgICByZXR1cm4gZihuYW1lKTtcbiAgICB9KTtcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBMb2dUeXBlLmRlYnVnOlxuICAgICAgICBpZiAoIWRlYnVnKSByZXR1cm47IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuZGVidWcgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgICBjb25zb2xlLmRlYnVnLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUubG9nOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUuaW5mbzpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmluZm8pIHJldHVybjtcbiAgICAgICAgY29uc29sZS5pbmZvLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUud2FybjpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLndhcm4pIHJldHVybjtcbiAgICAgICAgY29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUuZXJyb3I6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5lcnJvcikgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUudHJhY2U6XG4gICAgICAgIGlmICghZGVidWcpIHJldHVybjtcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBMb2dUeXBlLmdyb3VwQ29sbGFwc2VkOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLnZlcmJvc2UpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmdyb3VwQ29sbGFwc2VkID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAvLyBmYWxscyB0aHJvdWdoXG5cbiAgICAgIGNhc2UgTG9nVHlwZS5ncm91cDpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmxvZykgcmV0dXJuOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmdyb3VwID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgICAgY29uc29sZS5ncm91cC5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBMb2dUeXBlLmdyb3VwRW5kOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuZ3JvdXBFbmQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBMb2dUeXBlLnRpbWU6XG4gICAgICAgIHtcbiAgICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47XG4gICAgICAgICAgdmFyIG1zID0gYXJnc1sxXSAqIDEwMDAgKyBhcmdzWzJdIC8gMTAwMDAwMDtcbiAgICAgICAgICB2YXIgbXNnID0gXCJbXCIuY29uY2F0KG5hbWUsIFwiXSBcIikuY29uY2F0KGFyZ3NbMF0sIFwiOiBcIikuY29uY2F0KG1zLCBcIiBtc1wiKTtcblxuICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5sb2dUaW1lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nVGltZShtc2cpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5wcm9maWxlOlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5wcm9maWxlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgICAgY29uc29sZS5wcm9maWxlLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBMb2dUeXBlLnByb2ZpbGVFbmQ6XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnByb2ZpbGVFbmQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgICBjb25zb2xlLnByb2ZpbGVFbmQuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUuY2xlYXI6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5jbGVhciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICAgIGNvbnNvbGUuY2xlYXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUuc3RhdHVzOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwuaW5mbykgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5zdGF0dXMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29uc29sZS5zdGF0dXMoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5zdGF0dXMuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8uYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCBMb2dUeXBlIFwiLmNvbmNhdCh0eXBlKSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsb2dnZXI7XG59O1xuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL3J1bnRpbWUuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24oX191bnVzZWRfd2VicGFja19tb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxuXG5mdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuXG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG52YXIgU3luY0JhaWxIb29rID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgdGFwYWJsZS9saWIvU3luY0JhaWxIb29rICovIFwiLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL1N5bmNCYWlsSG9va0Zha2UuanNcIik7XG5cbnZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vTG9nZ2VyICovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9Mb2dnZXIuanNcIiksXG4gICAgTG9nZ2VyID0gX3JlcXVpcmUuTG9nZ2VyO1xuXG52YXIgY3JlYXRlQ29uc29sZUxvZ2dlciA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vY3JlYXRlQ29uc29sZUxvZ2dlciAqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvY3JlYXRlQ29uc29sZUxvZ2dlci5qc1wiKTtcbi8qKiBAdHlwZSB7Y3JlYXRlQ29uc29sZUxvZ2dlci5Mb2dnZXJPcHRpb25zfSAqL1xuXG5cbnZhciBjdXJyZW50RGVmYXVsdExvZ2dlck9wdGlvbnMgPSB7XG4gIGxldmVsOiBcImluZm9cIixcbiAgZGVidWc6IGZhbHNlLFxuICBjb25zb2xlOiBjb25zb2xlXG59O1xudmFyIGN1cnJlbnREZWZhdWx0TG9nZ2VyID0gY3JlYXRlQ29uc29sZUxvZ2dlcihjdXJyZW50RGVmYXVsdExvZ2dlck9wdGlvbnMpO1xuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBuYW1lIG9mIHRoZSBsb2dnZXJcbiAqIEByZXR1cm5zIHtMb2dnZXJ9IGEgbG9nZ2VyXG4gKi9cblxuZXhwb3J0cy5nZXRMb2dnZXIgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gbmV3IExvZ2dlcihmdW5jdGlvbiAodHlwZSwgYXJncykge1xuICAgIGlmIChleHBvcnRzLmhvb2tzLmxvZy5jYWxsKG5hbWUsIHR5cGUsIGFyZ3MpID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGN1cnJlbnREZWZhdWx0TG9nZ2VyKG5hbWUsIHR5cGUsIGFyZ3MpO1xuICAgIH1cbiAgfSwgZnVuY3Rpb24gKGNoaWxkTmFtZSkge1xuICAgIHJldHVybiBleHBvcnRzLmdldExvZ2dlcihcIlwiLmNvbmNhdChuYW1lLCBcIi9cIikuY29uY2F0KGNoaWxkTmFtZSkpO1xuICB9KTtcbn07XG4vKipcbiAqIEBwYXJhbSB7Y3JlYXRlQ29uc29sZUxvZ2dlci5Mb2dnZXJPcHRpb25zfSBvcHRpb25zIG5ldyBvcHRpb25zLCBtZXJnZSB3aXRoIG9sZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuXG5cbmV4cG9ydHMuY29uZmlndXJlRGVmYXVsdExvZ2dlciA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIF9leHRlbmRzKGN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgY3VycmVudERlZmF1bHRMb2dnZXIgPSBjcmVhdGVDb25zb2xlTG9nZ2VyKGN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucyk7XG59O1xuXG5leHBvcnRzLmhvb2tzID0ge1xuICBsb2c6IG5ldyBTeW5jQmFpbEhvb2soW1wib3JpZ2luXCIsIFwidHlwZVwiLCBcImFyZ3NcIl0pXG59O1xuXG4vKioqLyB9KVxuXG4vKioqKioqLyBcdH0pO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG4vKioqKioqLyBcdFx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMgKi9cbi8qKioqKiovIFx0IWZ1bmN0aW9uKCkge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG4vKioqKioqLyBcdFx0XHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG4vKioqKioqLyBcdFx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuLyoqKioqKi8gXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG4vKioqKioqLyBcdFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9XG4vKioqKioqLyBcdH0oKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QgKi9cbi8qKioqKiovIFx0IWZ1bmN0aW9uKCkge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4vKioqKioqLyBcdFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbi8qKioqKiovIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0oKTtcbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbi8vIFRoaXMgZW50cnkgbmVlZCB0byBiZSB3cmFwcGVkIGluIGFuIElJRkUgYmVjYXVzZSBpdCBuZWVkIHRvIGJlIGlzb2xhdGVkIGFnYWluc3Qgb3RoZXIgbW9kdWxlcyBpbiB0aGUgY2h1bmsuXG4hZnVuY3Rpb24oKSB7XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL2NsaWVudC1zcmMvbW9kdWxlcy9sb2dnZXIvaW5kZXguanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pO1xuLyogaGFybW9ueSBleHBvcnQgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgXCJkZWZhdWx0XCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogcmVleHBvcnQgZGVmYXVsdCBleHBvcnQgZnJvbSBuYW1lZCBtb2R1bGUgKi8gd2VicGFja19saWJfbG9nZ2luZ19ydW50aW1lX2pzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX187IH1cbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIHdlYnBhY2tfbGliX2xvZ2dpbmdfcnVudGltZV9qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgd2VicGFjay9saWIvbG9nZ2luZy9ydW50aW1lLmpzICovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9ydW50aW1lLmpzXCIpO1xuXG59KCk7XG52YXIgX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfXyA9IGV4cG9ydHM7XG5mb3IodmFyIGkgaW4gX193ZWJwYWNrX2V4cG9ydHNfXykgX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfX1tpXSA9IF9fd2VicGFja19leHBvcnRzX19baV07XG5pZihfX3dlYnBhY2tfZXhwb3J0c19fLl9fZXNNb2R1bGUpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfX3dlYnBhY2tfZXhwb3J0X3RhcmdldF9fLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKioqKiovIH0pKClcbjsiLCIvKioqKioqLyAoZnVuY3Rpb24oKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0XCJ1c2Ugc3RyaWN0XCI7XG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlc19fID0gKHtcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9zdHJpcC1hbnNpL2luZGV4LmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvc3RyaXAtYW5zaS9pbmRleC5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKGZ1bmN0aW9uKF9fdW51c2VkX3dlYnBhY2tfX193ZWJwYWNrX21vZHVsZV9fLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFwiZGVmYXVsdFwiOiBmdW5jdGlvbigpIHsgcmV0dXJuIC8qIGJpbmRpbmcgKi8gc3RyaXBBbnNpOyB9XG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBhbnNpX3JlZ2V4X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISBhbnNpLXJlZ2V4ICovIFwiLi9ub2RlX21vZHVsZXMvc3RyaXAtYW5zaS9ub2RlX21vZHVsZXMvYW5zaS1yZWdleC9pbmRleC5qc1wiKTtcblxuZnVuY3Rpb24gc3RyaXBBbnNpKHN0cmluZykge1xuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRXhwZWN0ZWQgYSBgc3RyaW5nYCwgZ290IGBcIi5jb25jYXQodHlwZW9mIHN0cmluZywgXCJgXCIpKTtcbiAgfVxuXG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgoMCxhbnNpX3JlZ2V4X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19bXCJkZWZhdWx0XCJdKSgpLCAnJyk7XG59XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3N0cmlwLWFuc2kvbm9kZV9tb2R1bGVzL2Fuc2ktcmVnZXgvaW5kZXguanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9zdHJpcC1hbnNpL25vZGVfbW9kdWxlcy9hbnNpLXJlZ2V4L2luZGV4LmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24oX191bnVzZWRfd2VicGFja19fX3dlYnBhY2tfbW9kdWxlX18sIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pO1xuLyogaGFybW9ueSBleHBvcnQgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgXCJkZWZhdWx0XCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogYmluZGluZyAqLyBhbnNpUmVnZXg7IH1cbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuZnVuY3Rpb24gYW5zaVJlZ2V4KCkge1xuICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge30sXG4gICAgICBfcmVmJG9ubHlGaXJzdCA9IF9yZWYub25seUZpcnN0LFxuICAgICAgb25seUZpcnN0ID0gX3JlZiRvbmx5Rmlyc3QgPT09IHZvaWQgMCA/IGZhbHNlIDogX3JlZiRvbmx5Rmlyc3Q7XG5cbiAgdmFyIHBhdHRlcm4gPSBbXCJbXFxcXHUwMDFCXFxcXHUwMDlCXVtbXFxcXF0oKSM7P10qKD86KD86KD86KD86O1stYS16QS1aXFxcXGRcXFxcLyMmLjo9PyVAfl9dKykqfFthLXpBLVpcXFxcZF0rKD86O1stYS16QS1aXFxcXGRcXFxcLyMmLjo9PyVAfl9dKikqKT9cXFxcdTAwMDcpXCIsICcoPzooPzpcXFxcZHsxLDR9KD86O1xcXFxkezAsNH0pKik/W1xcXFxkQS1QUi1UWmNmLW50cXJ5PT48fl0pKSddLmpvaW4oJ3wnKTtcbiAgcmV0dXJuIG5ldyBSZWdFeHAocGF0dGVybiwgb25seUZpcnN0ID8gdW5kZWZpbmVkIDogJ2cnKTtcbn1cblxuLyoqKi8gfSlcblxuLyoqKioqKi8gXHR9KTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuLyoqKioqKi8gXHRcdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcbi8qKioqKiovIFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuLyoqKioqKi8gXHRcdFx0XHR9XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfVxuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0ICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuLyoqKioqKi8gXHRcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4vKioqKioqLyBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuLyoqKioqKi8gXHRcdFx0fVxuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG4vLyBUaGlzIGVudHJ5IG5lZWQgdG8gYmUgd3JhcHBlZCBpbiBhbiBJSUZFIGJlY2F1c2UgaXQgbmVlZCB0byBiZSBpc29sYXRlZCBhZ2FpbnN0IG90aGVyIG1vZHVsZXMgaW4gdGhlIGNodW5rLlxuIWZ1bmN0aW9uKCkge1xuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vY2xpZW50LXNyYy9tb2R1bGVzL3N0cmlwLWFuc2kvaW5kZXguanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBzdHJpcF9hbnNpX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISBzdHJpcC1hbnNpICovIFwiLi9ub2RlX21vZHVsZXMvc3RyaXAtYW5zaS9pbmRleC5qc1wiKTtcblxuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyBfX3dlYnBhY2tfZXhwb3J0c19fW1wiZGVmYXVsdFwiXSA9IChzdHJpcF9hbnNpX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19bXCJkZWZhdWx0XCJdKTtcbn0oKTtcbnZhciBfX3dlYnBhY2tfZXhwb3J0X3RhcmdldF9fID0gZXhwb3J0cztcbmZvcih2YXIgaSBpbiBfX3dlYnBhY2tfZXhwb3J0c19fKSBfX3dlYnBhY2tfZXhwb3J0X3RhcmdldF9fW2ldID0gX193ZWJwYWNrX2V4cG9ydHNfX1tpXTtcbmlmKF9fd2VicGFja19leHBvcnRzX18uX19lc01vZHVsZSkgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9fd2VicGFja19leHBvcnRfdGFyZ2V0X18sIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gfSkoKVxuOyIsIi8vIFRoZSBlcnJvciBvdmVybGF5IGlzIGluc3BpcmVkIChhbmQgbW9zdGx5IGNvcGllZCkgZnJvbSBDcmVhdGUgUmVhY3QgQXBwIChodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2tpbmN1YmF0b3IvY3JlYXRlLXJlYWN0LWFwcClcbi8vIFRoZXksIGluIHR1cm4sIGdvdCBpbnNwaXJlZCBieSB3ZWJwYWNrLWhvdC1taWRkbGV3YXJlIChodHRwczovL2dpdGh1Yi5jb20vZ2xlbmphbWluL3dlYnBhY2staG90LW1pZGRsZXdhcmUpLlxuaW1wb3J0IGFuc2lIVE1MIGZyb20gXCJhbnNpLWh0bWwtY29tbXVuaXR5XCI7XG5pbXBvcnQgeyBlbmNvZGUgfSBmcm9tIFwiaHRtbC1lbnRpdGllc1wiO1xudmFyIGNvbG9ycyA9IHtcbiAgcmVzZXQ6IFtcInRyYW5zcGFyZW50XCIsIFwidHJhbnNwYXJlbnRcIl0sXG4gIGJsYWNrOiBcIjE4MTgxOFwiLFxuICByZWQ6IFwiRTM2MDQ5XCIsXG4gIGdyZWVuOiBcIkIzQ0I3NFwiLFxuICB5ZWxsb3c6IFwiRkZEMDgwXCIsXG4gIGJsdWU6IFwiN0NBRkMyXCIsXG4gIG1hZ2VudGE6IFwiN0ZBQ0NBXCIsXG4gIGN5YW46IFwiQzNDMkVGXCIsXG4gIGxpZ2h0Z3JleTogXCJFQkU3RTNcIixcbiAgZGFya2dyZXk6IFwiNkQ3ODkxXCJcbn07XG4vKiogQHR5cGUge0hUTUxJRnJhbWVFbGVtZW50IHwgbnVsbCB8IHVuZGVmaW5lZH0gKi9cblxudmFyIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQ7XG4vKiogQHR5cGUge0hUTUxEaXZFbGVtZW50IHwgbnVsbCB8IHVuZGVmaW5lZH0gKi9cblxudmFyIGNvbnRhaW5lckVsZW1lbnQ7XG4vKiogQHR5cGUge0FycmF5PChlbGVtZW50OiBIVE1MRGl2RWxlbWVudCkgPT4gdm9pZD59ICovXG5cbnZhciBvbkxvYWRRdWV1ZSA9IFtdO1xuYW5zaUhUTUwuc2V0Q29sb3JzKGNvbG9ycyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lcigpIHtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuaWQgPSBcIndlYnBhY2stZGV2LXNlcnZlci1jbGllbnQtb3ZlcmxheVwiO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnNyYyA9IFwiYWJvdXQ6YmxhbmtcIjtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gMDtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zdHlsZS50b3AgPSAwO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLnJpZ2h0ID0gMDtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zdHlsZS5ib3R0b20gPSAwO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLndpZHRoID0gXCIxMDB2d1wiO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLmhlaWdodCA9IFwiMTAwdmhcIjtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zdHlsZS5ib3JkZXIgPSBcIm5vbmVcIjtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zdHlsZS56SW5kZXggPSA5OTk5OTk5OTk5O1xuXG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnRhaW5lckVsZW1lbnQgPVxuICAgIC8qKiBAdHlwZSB7RG9jdW1lbnR9ICovXG5cbiAgICAvKiogQHR5cGUge0hUTUxJRnJhbWVFbGVtZW50fSAqL1xuICAgIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuY29udGVudERvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29udGFpbmVyRWxlbWVudC5pZCA9IFwid2VicGFjay1kZXYtc2VydmVyLWNsaWVudC1vdmVybGF5LWRpdlwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5ib3hTaXppbmcgPSBcImJvcmRlci1ib3hcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLmxlZnQgPSAwO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUudG9wID0gMDtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLnJpZ2h0ID0gMDtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLmJvdHRvbSA9IDA7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS53aWR0aCA9IFwiMTAwdndcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLmhlaWdodCA9IFwiMTAwdmhcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLCAwLCAwLCAwLjg1KVwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUuY29sb3IgPSBcIiNFOEU4RThcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLmZvbnRGYW1pbHkgPSBcIk1lbmxvLCBDb25zb2xhcywgbW9ub3NwYWNlXCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IFwibGFyZ2VcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLnBhZGRpbmcgPSBcIjJyZW1cIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLmxpbmVIZWlnaHQgPSBcIjEuMlwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUud2hpdGVTcGFjZSA9IFwicHJlLXdyYXBcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gXCJhdXRvXCI7XG4gICAgdmFyIGhlYWRlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBoZWFkZXJFbGVtZW50LmlubmVyVGV4dCA9IFwiQ29tcGlsZWQgd2l0aCBwcm9ibGVtczpcIjtcbiAgICB2YXIgY2xvc2VCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuaW5uZXJUZXh0ID0gXCJYXCI7XG4gICAgY2xvc2VCdXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSBcInRyYW5zcGFyZW50XCI7XG4gICAgY2xvc2VCdXR0b25FbGVtZW50LnN0eWxlLmJvcmRlciA9IFwibm9uZVwiO1xuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IFwiMjBweFwiO1xuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5zdHlsZS5mb250V2VpZ2h0ID0gXCJib2xkXCI7XG4gICAgY2xvc2VCdXR0b25FbGVtZW50LnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuc3R5bGUuY3NzRmxvYXQgPSBcInJpZ2h0XCI7IC8vIEB0cy1pZ25vcmVcblxuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5zdHlsZS5zdHlsZUZsb2F0ID0gXCJyaWdodFwiO1xuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgaGlkZSgpO1xuICAgIH0pO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoaGVhZGVyRWxlbWVudCk7XG4gICAgY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbkVsZW1lbnQpO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgICBjb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgLyoqIEB0eXBlIHtEb2N1bWVudH0gKi9cblxuICAgIC8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9ICovXG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5jb250ZW50RG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXJFbGVtZW50KTtcbiAgICBvbkxvYWRRdWV1ZS5mb3JFYWNoKGZ1bmN0aW9uIChvbkxvYWQpIHtcbiAgICAgIG9uTG9hZChcbiAgICAgIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9ICovXG4gICAgICBjb250YWluZXJFbGVtZW50KTtcbiAgICB9KTtcbiAgICBvbkxvYWRRdWV1ZSA9IFtdO1xuICAgIC8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9ICovXG5cbiAgICBpZnJhbWVDb250YWluZXJFbGVtZW50Lm9ubG9hZCA9IG51bGw7XG4gIH07XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWVDb250YWluZXJFbGVtZW50KTtcbn1cbi8qKlxuICogQHBhcmFtIHsoZWxlbWVudDogSFRNTERpdkVsZW1lbnQpID0+IHZvaWR9IGNhbGxiYWNrXG4gKi9cblxuXG5mdW5jdGlvbiBlbnN1cmVPdmVybGF5RXhpc3RzKGNhbGxiYWNrKSB7XG4gIGlmIChjb250YWluZXJFbGVtZW50KSB7XG4gICAgLy8gRXZlcnl0aGluZyBpcyByZWFkeSwgY2FsbCB0aGUgY2FsbGJhY2sgcmlnaHQgYXdheS5cbiAgICBjYWxsYmFjayhjb250YWluZXJFbGVtZW50KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBvbkxvYWRRdWV1ZS5wdXNoKGNhbGxiYWNrKTtcblxuICBpZiAoaWZyYW1lQ29udGFpbmVyRWxlbWVudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNyZWF0ZUNvbnRhaW5lcigpO1xufSAvLyBTdWNjZXNzZnVsIGNvbXBpbGF0aW9uLlxuXG5cbmZ1bmN0aW9uIGhpZGUoKSB7XG4gIGlmICghaWZyYW1lQ29udGFpbmVyRWxlbWVudCkge1xuICAgIHJldHVybjtcbiAgfSAvLyBDbGVhbiB1cCBhbmQgcmVzZXQgaW50ZXJuYWwgc3RhdGUuXG5cblxuICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGlmcmFtZUNvbnRhaW5lckVsZW1lbnQpO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50ID0gbnVsbDtcbiAgY29udGFpbmVyRWxlbWVudCA9IG51bGw7XG59XG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge3N0cmluZyAgfCB7IGZpbGU/OiBzdHJpbmcsIG1vZHVsZU5hbWU/OiBzdHJpbmcsIGxvYz86IHN0cmluZywgbWVzc2FnZT86IHN0cmluZyB9fSBpdGVtXG4gKiBAcmV0dXJucyB7eyBoZWFkZXI6IHN0cmluZywgYm9keTogc3RyaW5nIH19XG4gKi9cblxuXG5mdW5jdGlvbiBmb3JtYXRQcm9ibGVtKHR5cGUsIGl0ZW0pIHtcbiAgdmFyIGhlYWRlciA9IHR5cGUgPT09IFwid2FybmluZ1wiID8gXCJXQVJOSU5HXCIgOiBcIkVSUk9SXCI7XG4gIHZhciBib2R5ID0gXCJcIjtcblxuICBpZiAodHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIpIHtcbiAgICBib2R5ICs9IGl0ZW07XG4gIH0gZWxzZSB7XG4gICAgdmFyIGZpbGUgPSBpdGVtLmZpbGUgfHwgXCJcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG5cbiAgICB2YXIgbW9kdWxlTmFtZSA9IGl0ZW0ubW9kdWxlTmFtZSA/IGl0ZW0ubW9kdWxlTmFtZS5pbmRleE9mKFwiIVwiKSAhPT0gLTEgPyBcIlwiLmNvbmNhdChpdGVtLm1vZHVsZU5hbWUucmVwbGFjZSgvXihcXHN8XFxTKSohLywgXCJcIiksIFwiIChcIikuY29uY2F0KGl0ZW0ubW9kdWxlTmFtZSwgXCIpXCIpIDogXCJcIi5jb25jYXQoaXRlbS5tb2R1bGVOYW1lKSA6IFwiXCI7XG4gICAgdmFyIGxvYyA9IGl0ZW0ubG9jO1xuICAgIGhlYWRlciArPSBcIlwiLmNvbmNhdChtb2R1bGVOYW1lIHx8IGZpbGUgPyBcIiBpbiBcIi5jb25jYXQobW9kdWxlTmFtZSA/IFwiXCIuY29uY2F0KG1vZHVsZU5hbWUpLmNvbmNhdChmaWxlID8gXCIgKFwiLmNvbmNhdChmaWxlLCBcIilcIikgOiBcIlwiKSA6IGZpbGUpLmNvbmNhdChsb2MgPyBcIiBcIi5jb25jYXQobG9jKSA6IFwiXCIpIDogXCJcIik7XG4gICAgYm9keSArPSBpdGVtLm1lc3NhZ2UgfHwgXCJcIjtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaGVhZGVyOiBoZWFkZXIsXG4gICAgYm9keTogYm9keVxuICB9O1xufSAvLyBDb21waWxhdGlvbiB3aXRoIGVycm9ycyAoZS5nLiBzeW50YXggZXJyb3Igb3IgbWlzc2luZyBtb2R1bGVzKS5cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtBcnJheTxzdHJpbmcgIHwgeyBmaWxlPzogc3RyaW5nLCBtb2R1bGVOYW1lPzogc3RyaW5nLCBsb2M/OiBzdHJpbmcsIG1lc3NhZ2U/OiBzdHJpbmcgfT59IG1lc3NhZ2VzXG4gKi9cblxuXG5mdW5jdGlvbiBzaG93KHR5cGUsIG1lc3NhZ2VzKSB7XG4gIGVuc3VyZU92ZXJsYXlFeGlzdHMoZnVuY3Rpb24gKCkge1xuICAgIG1lc3NhZ2VzLmZvckVhY2goZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgIHZhciBlbnRyeUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdmFyIHR5cGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cbiAgICAgIHZhciBfZm9ybWF0UHJvYmxlbSA9IGZvcm1hdFByb2JsZW0odHlwZSwgbWVzc2FnZSksXG4gICAgICAgICAgaGVhZGVyID0gX2Zvcm1hdFByb2JsZW0uaGVhZGVyLFxuICAgICAgICAgIGJvZHkgPSBfZm9ybWF0UHJvYmxlbS5ib2R5O1xuXG4gICAgICB0eXBlRWxlbWVudC5pbm5lclRleHQgPSBoZWFkZXI7XG4gICAgICB0eXBlRWxlbWVudC5zdHlsZS5jb2xvciA9IFwiI1wiLmNvbmNhdChjb2xvcnMucmVkKTsgLy8gTWFrZSBpdCBsb29rIHNpbWlsYXIgdG8gb3VyIHRlcm1pbmFsLlxuXG4gICAgICB2YXIgdGV4dCA9IGFuc2lIVE1MKGVuY29kZShib2R5KSk7XG4gICAgICB2YXIgbWVzc2FnZVRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIG1lc3NhZ2VUZXh0Tm9kZS5pbm5lckhUTUwgPSB0ZXh0O1xuICAgICAgZW50cnlFbGVtZW50LmFwcGVuZENoaWxkKHR5cGVFbGVtZW50KTtcbiAgICAgIGVudHJ5RWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpO1xuICAgICAgZW50cnlFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgICBlbnRyeUVsZW1lbnQuYXBwZW5kQ2hpbGQobWVzc2FnZVRleHROb2RlKTtcbiAgICAgIGVudHJ5RWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpO1xuICAgICAgZW50cnlFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgICAvKiogQHR5cGUge0hUTUxEaXZFbGVtZW50fSAqL1xuXG4gICAgICBjb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGVudHJ5RWxlbWVudCk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgeyBmb3JtYXRQcm9ibGVtLCBzaG93LCBoaWRlIH07IiwiLyogZ2xvYmFsIF9fd2VicGFja19kZXZfc2VydmVyX2NsaWVudF9fICovXG5pbXBvcnQgV2ViU29ja2V0Q2xpZW50IGZyb20gXCIuL2NsaWVudHMvV2ViU29ja2V0Q2xpZW50LmpzXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi91dGlscy9sb2cuanNcIjsgLy8gdGhpcyBXZWJzb2NrZXRDbGllbnQgaXMgaGVyZSBhcyBhIGRlZmF1bHQgZmFsbGJhY2ssIGluIGNhc2UgdGhlIGNsaWVudCBpcyBub3QgaW5qZWN0ZWRcblxuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5cbnZhciBDbGllbnQgPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcbnR5cGVvZiBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IHR5cGVvZiBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXy5kZWZhdWx0ICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18uZGVmYXVsdCA6IF9fd2VicGFja19kZXZfc2VydmVyX2NsaWVudF9fIDogV2ViU29ja2V0Q2xpZW50O1xuLyogZXNsaW50LWVuYWJsZSBjYW1lbGNhc2UgKi9cblxudmFyIHJldHJpZXMgPSAwO1xudmFyIG1heFJldHJpZXMgPSAxMDtcbnZhciBjbGllbnQgPSBudWxsO1xuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge3sgW2hhbmRsZXI6IHN0cmluZ106IChkYXRhPzogYW55LCBwYXJhbXM/OiBhbnkpID0+IGFueSB9fSBoYW5kbGVyc1xuICogQHBhcmFtIHtudW1iZXJ9IFtyZWNvbm5lY3RdXG4gKi9cblxudmFyIHNvY2tldCA9IGZ1bmN0aW9uIGluaXRTb2NrZXQodXJsLCBoYW5kbGVycywgcmVjb25uZWN0KSB7XG4gIGNsaWVudCA9IG5ldyBDbGllbnQodXJsKTtcbiAgY2xpZW50Lm9uT3BlbihmdW5jdGlvbiAoKSB7XG4gICAgcmV0cmllcyA9IDA7XG5cbiAgICBpZiAodHlwZW9mIHJlY29ubmVjdCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgbWF4UmV0cmllcyA9IHJlY29ubmVjdDtcbiAgICB9XG4gIH0pO1xuICBjbGllbnQub25DbG9zZShmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHJldHJpZXMgPT09IDApIHtcbiAgICAgIGhhbmRsZXJzLmNsb3NlKCk7XG4gICAgfSAvLyBUcnkgdG8gcmVjb25uZWN0LlxuXG5cbiAgICBjbGllbnQgPSBudWxsOyAvLyBBZnRlciAxMCByZXRyaWVzIHN0b3AgdHJ5aW5nLCB0byBwcmV2ZW50IGxvZ3NwYW0uXG5cbiAgICBpZiAocmV0cmllcyA8IG1heFJldHJpZXMpIHtcbiAgICAgIC8vIEV4cG9uZW50aWFsbHkgaW5jcmVhc2UgdGltZW91dCB0byByZWNvbm5lY3QuXG4gICAgICAvLyBSZXNwZWN0ZnVsbHkgY29waWVkIGZyb20gdGhlIHBhY2thZ2UgYGdvdGAuXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1wcm9wZXJ0aWVzXG4gICAgICB2YXIgcmV0cnlJbk1zID0gMTAwMCAqIE1hdGgucG93KDIsIHJldHJpZXMpICsgTWF0aC5yYW5kb20oKSAqIDEwMDtcbiAgICAgIHJldHJpZXMgKz0gMTtcbiAgICAgIGxvZy5pbmZvKFwiVHJ5aW5nIHRvIHJlY29ubmVjdC4uLlwiKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzb2NrZXQodXJsLCBoYW5kbGVycywgcmVjb25uZWN0KTtcbiAgICAgIH0sIHJldHJ5SW5Ncyk7XG4gICAgfVxuICB9KTtcbiAgY2xpZW50Lm9uTWVzc2FnZShcbiAgLyoqXG4gICAqIEBwYXJhbSB7YW55fSBkYXRhXG4gICAqL1xuICBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZShkYXRhKTtcblxuICAgIGlmIChoYW5kbGVyc1ttZXNzYWdlLnR5cGVdKSB7XG4gICAgICBoYW5kbGVyc1ttZXNzYWdlLnR5cGVdKG1lc3NhZ2UuZGF0YSwgbWVzc2FnZS5wYXJhbXMpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzb2NrZXQ7IiwiLyoqXG4gKiBAcGFyYW0ge3sgcHJvdG9jb2w/OiBzdHJpbmcsIGF1dGg/OiBzdHJpbmcsIGhvc3RuYW1lPzogc3RyaW5nLCBwb3J0Pzogc3RyaW5nLCBwYXRobmFtZT86IHN0cmluZywgc2VhcmNoPzogc3RyaW5nLCBoYXNoPzogc3RyaW5nLCBzbGFzaGVzPzogYm9vbGVhbiB9fSBvYmpVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGZvcm1hdChvYmpVUkwpIHtcbiAgdmFyIHByb3RvY29sID0gb2JqVVJMLnByb3RvY29sIHx8IFwiXCI7XG5cbiAgaWYgKHByb3RvY29sICYmIHByb3RvY29sLnN1YnN0cigtMSkgIT09IFwiOlwiKSB7XG4gICAgcHJvdG9jb2wgKz0gXCI6XCI7XG4gIH1cblxuICB2YXIgYXV0aCA9IG9ialVSTC5hdXRoIHx8IFwiXCI7XG5cbiAgaWYgKGF1dGgpIHtcbiAgICBhdXRoID0gZW5jb2RlVVJJQ29tcG9uZW50KGF1dGgpO1xuICAgIGF1dGggPSBhdXRoLnJlcGxhY2UoLyUzQS9pLCBcIjpcIik7XG4gICAgYXV0aCArPSBcIkBcIjtcbiAgfVxuXG4gIHZhciBob3N0ID0gXCJcIjtcblxuICBpZiAob2JqVVJMLmhvc3RuYW1lKSB7XG4gICAgaG9zdCA9IGF1dGggKyAob2JqVVJMLmhvc3RuYW1lLmluZGV4T2YoXCI6XCIpID09PSAtMSA/IG9ialVSTC5ob3N0bmFtZSA6IFwiW1wiLmNvbmNhdChvYmpVUkwuaG9zdG5hbWUsIFwiXVwiKSk7XG5cbiAgICBpZiAob2JqVVJMLnBvcnQpIHtcbiAgICAgIGhvc3QgKz0gXCI6XCIuY29uY2F0KG9ialVSTC5wb3J0KTtcbiAgICB9XG4gIH1cblxuICB2YXIgcGF0aG5hbWUgPSBvYmpVUkwucGF0aG5hbWUgfHwgXCJcIjtcblxuICBpZiAob2JqVVJMLnNsYXNoZXMpIHtcbiAgICBob3N0ID0gXCIvL1wiLmNvbmNhdChob3N0IHx8IFwiXCIpO1xuXG4gICAgaWYgKHBhdGhuYW1lICYmIHBhdGhuYW1lLmNoYXJBdCgwKSAhPT0gXCIvXCIpIHtcbiAgICAgIHBhdGhuYW1lID0gXCIvXCIuY29uY2F0KHBhdGhuYW1lKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIWhvc3QpIHtcbiAgICBob3N0ID0gXCJcIjtcbiAgfVxuXG4gIHZhciBzZWFyY2ggPSBvYmpVUkwuc2VhcmNoIHx8IFwiXCI7XG5cbiAgaWYgKHNlYXJjaCAmJiBzZWFyY2guY2hhckF0KDApICE9PSBcIj9cIikge1xuICAgIHNlYXJjaCA9IFwiP1wiLmNvbmNhdChzZWFyY2gpO1xuICB9XG5cbiAgdmFyIGhhc2ggPSBvYmpVUkwuaGFzaCB8fCBcIlwiO1xuXG4gIGlmIChoYXNoICYmIGhhc2guY2hhckF0KDApICE9PSBcIiNcIikge1xuICAgIGhhc2ggPSBcIiNcIi5jb25jYXQoaGFzaCk7XG4gIH1cblxuICBwYXRobmFtZSA9IHBhdGhuYW1lLnJlcGxhY2UoL1s/I10vZyxcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYXRjaFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChtYXRjaCk7XG4gIH0pO1xuICBzZWFyY2ggPSBzZWFyY2gucmVwbGFjZShcIiNcIiwgXCIlMjNcIik7XG4gIHJldHVybiBcIlwiLmNvbmNhdChwcm90b2NvbCkuY29uY2F0KGhvc3QpLmNvbmNhdChwYXRobmFtZSkuY29uY2F0KHNlYXJjaCkuY29uY2F0KGhhc2gpO1xufVxuLyoqXG4gKiBAcGFyYW0ge1VSTCAmIHsgZnJvbUN1cnJlbnRTY3JpcHQ/OiBib29sZWFuIH19IHBhcnNlZFVSTFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZVNvY2tldFVSTChwYXJzZWRVUkwpIHtcbiAgdmFyIGhvc3RuYW1lID0gcGFyc2VkVVJMLmhvc3RuYW1lOyAvLyBOb2RlLmpzIG1vZHVsZSBwYXJzZXMgaXQgYXMgYDo6YFxuICAvLyBgbmV3IFVSTCh1cmxTdHJpbmcsIFtiYXNlVVJMU3RyaW5nXSlgIHBhcnNlcyBpdCBhcyAnWzo6XSdcblxuICB2YXIgaXNJbkFkZHJBbnkgPSBob3N0bmFtZSA9PT0gXCIwLjAuMC4wXCIgfHwgaG9zdG5hbWUgPT09IFwiOjpcIiB8fCBob3N0bmFtZSA9PT0gXCJbOjpdXCI7IC8vIHdoeSBkbyB3ZSBuZWVkIHRoaXMgY2hlY2s/XG4gIC8vIGhvc3RuYW1lIG4vYSBmb3IgZmlsZSBwcm90b2NvbCAoZXhhbXBsZSwgd2hlbiB1c2luZyBlbGVjdHJvbiwgaW9uaWMpXG4gIC8vIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2svd2VicGFjay1kZXYtc2VydmVyL3B1bGwvMzg0XG5cbiAgaWYgKGlzSW5BZGRyQW55ICYmIHNlbGYubG9jYXRpb24uaG9zdG5hbWUgJiYgc2VsZi5sb2NhdGlvbi5wcm90b2NvbC5pbmRleE9mKFwiaHR0cFwiKSA9PT0gMCkge1xuICAgIGhvc3RuYW1lID0gc2VsZi5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgfVxuXG4gIHZhciBzb2NrZXRVUkxQcm90b2NvbCA9IHBhcnNlZFVSTC5wcm90b2NvbCB8fCBzZWxmLmxvY2F0aW9uLnByb3RvY29sOyAvLyBXaGVuIGh0dHBzIGlzIHVzZWQgaW4gdGhlIGFwcCwgc2VjdXJlIHdlYiBzb2NrZXRzIGFyZSBhbHdheXMgbmVjZXNzYXJ5IGJlY2F1c2UgdGhlIGJyb3dzZXIgZG9lc24ndCBhY2NlcHQgbm9uLXNlY3VyZSB3ZWIgc29ja2V0cy5cblxuICBpZiAoc29ja2V0VVJMUHJvdG9jb2wgPT09IFwiYXV0bzpcIiB8fCBob3N0bmFtZSAmJiBpc0luQWRkckFueSAmJiBzZWxmLmxvY2F0aW9uLnByb3RvY29sID09PSBcImh0dHBzOlwiKSB7XG4gICAgc29ja2V0VVJMUHJvdG9jb2wgPSBzZWxmLmxvY2F0aW9uLnByb3RvY29sO1xuICB9XG5cbiAgc29ja2V0VVJMUHJvdG9jb2wgPSBzb2NrZXRVUkxQcm90b2NvbC5yZXBsYWNlKC9eKD86aHR0cHwuKy1leHRlbnNpb258ZmlsZSkvaSwgXCJ3c1wiKTtcbiAgdmFyIHNvY2tldFVSTEF1dGggPSBcIlwiOyAvLyBgbmV3IFVSTCh1cmxTdHJpbmcsIFtiYXNlVVJMc3RyaW5nXSlgIGRvZXNuJ3QgaGF2ZSBgYXV0aGAgcHJvcGVydHlcbiAgLy8gUGFyc2UgYXV0aGVudGljYXRpb24gY3JlZGVudGlhbHMgaW4gY2FzZSB3ZSBuZWVkIHRoZW1cblxuICBpZiAocGFyc2VkVVJMLnVzZXJuYW1lKSB7XG4gICAgc29ja2V0VVJMQXV0aCA9IHBhcnNlZFVSTC51c2VybmFtZTsgLy8gU2luY2UgSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvbiBkb2VzIG5vdCBhbGxvdyBlbXB0eSB1c2VybmFtZSxcbiAgICAvLyB3ZSBvbmx5IGluY2x1ZGUgcGFzc3dvcmQgaWYgdGhlIHVzZXJuYW1lIGlzIG5vdCBlbXB0eS5cblxuICAgIGlmIChwYXJzZWRVUkwucGFzc3dvcmQpIHtcbiAgICAgIC8vIFJlc3VsdDogPHVzZXJuYW1lPjo8cGFzc3dvcmQ+XG4gICAgICBzb2NrZXRVUkxBdXRoID0gc29ja2V0VVJMQXV0aC5jb25jYXQoXCI6XCIsIHBhcnNlZFVSTC5wYXNzd29yZCk7XG4gICAgfVxuICB9IC8vIEluIGNhc2UgdGhlIGhvc3QgaXMgYSByYXcgSVB2NiBhZGRyZXNzLCBpdCBjYW4gYmUgZW5jbG9zZWQgaW5cbiAgLy8gdGhlIGJyYWNrZXRzIGFzIHRoZSBicmFja2V0cyBhcmUgbmVlZGVkIGluIHRoZSBmaW5hbCBVUkwgc3RyaW5nLlxuICAvLyBOZWVkIHRvIHJlbW92ZSB0aG9zZSBhcyB1cmwuZm9ybWF0IGJsaW5kbHkgYWRkcyBpdHMgb3duIHNldCBvZiBicmFja2V0c1xuICAvLyBpZiB0aGUgaG9zdCBzdHJpbmcgY29udGFpbnMgY29sb25zLiBUaGF0IHdvdWxkIGxlYWQgdG8gbm9uLXdvcmtpbmdcbiAgLy8gZG91YmxlIGJyYWNrZXRzIChlLmcuIFtbOjpdXSkgaG9zdFxuICAvL1xuICAvLyBBbGwgb2YgdGhlc2Ugd2ViIHNvY2tldCB1cmwgcGFyYW1zIGFyZSBvcHRpb25hbGx5IHBhc3NlZCBpbiB0aHJvdWdoIHJlc291cmNlUXVlcnksXG4gIC8vIHNvIHdlIG5lZWQgdG8gZmFsbCBiYWNrIHRvIHRoZSBkZWZhdWx0IGlmIHRoZXkgYXJlIG5vdCBwcm92aWRlZFxuXG5cbiAgdmFyIHNvY2tldFVSTEhvc3RuYW1lID0gKGhvc3RuYW1lIHx8IHNlbGYubG9jYXRpb24uaG9zdG5hbWUgfHwgXCJsb2NhbGhvc3RcIikucmVwbGFjZSgvXlxcWyguKilcXF0kLywgXCIkMVwiKTtcbiAgdmFyIHNvY2tldFVSTFBvcnQgPSBwYXJzZWRVUkwucG9ydDtcblxuICBpZiAoIXNvY2tldFVSTFBvcnQgfHwgc29ja2V0VVJMUG9ydCA9PT0gXCIwXCIpIHtcbiAgICBzb2NrZXRVUkxQb3J0ID0gc2VsZi5sb2NhdGlvbi5wb3J0O1xuICB9IC8vIElmIHBhdGggaXMgcHJvdmlkZWQgaXQnbGwgYmUgcGFzc2VkIGluIHZpYSB0aGUgcmVzb3VyY2VRdWVyeSBhcyBhXG4gIC8vIHF1ZXJ5IHBhcmFtIHNvIGl0IGhhcyB0byBiZSBwYXJzZWQgb3V0IG9mIHRoZSBxdWVyeXN0cmluZyBpbiBvcmRlciBmb3IgdGhlXG4gIC8vIGNsaWVudCB0byBvcGVuIHRoZSBzb2NrZXQgdG8gdGhlIGNvcnJlY3QgbG9jYXRpb24uXG5cblxuICB2YXIgc29ja2V0VVJMUGF0aG5hbWUgPSBcIi93c1wiO1xuXG4gIGlmIChwYXJzZWRVUkwucGF0aG5hbWUgJiYgIXBhcnNlZFVSTC5mcm9tQ3VycmVudFNjcmlwdCkge1xuICAgIHNvY2tldFVSTFBhdGhuYW1lID0gcGFyc2VkVVJMLnBhdGhuYW1lO1xuICB9XG5cbiAgcmV0dXJuIGZvcm1hdCh7XG4gICAgcHJvdG9jb2w6IHNvY2tldFVSTFByb3RvY29sLFxuICAgIGF1dGg6IHNvY2tldFVSTEF1dGgsXG4gICAgaG9zdG5hbWU6IHNvY2tldFVSTEhvc3RuYW1lLFxuICAgIHBvcnQ6IHNvY2tldFVSTFBvcnQsXG4gICAgcGF0aG5hbWU6IHNvY2tldFVSTFBhdGhuYW1lLFxuICAgIHNsYXNoZXM6IHRydWVcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVNvY2tldFVSTDsiLCIvKipcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldEN1cnJlbnRTY3JpcHRTb3VyY2UoKSB7XG4gIC8vIGBkb2N1bWVudC5jdXJyZW50U2NyaXB0YCBpcyB0aGUgbW9zdCBhY2N1cmF0ZSB3YXkgdG8gZmluZCB0aGUgY3VycmVudCBzY3JpcHQsXG4gIC8vIGJ1dCBpcyBub3Qgc3VwcG9ydGVkIGluIGFsbCBicm93c2Vycy5cbiAgaWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5nZXRBdHRyaWJ1dGUoXCJzcmNcIik7XG4gIH0gLy8gRmFsbGJhY2sgdG8gZ2V0dGluZyBhbGwgc2NyaXB0cyBydW5uaW5nIGluIHRoZSBkb2N1bWVudC5cblxuXG4gIHZhciBzY3JpcHRFbGVtZW50cyA9IGRvY3VtZW50LnNjcmlwdHMgfHwgW107XG4gIHZhciBzY3JpcHRFbGVtZW50c1dpdGhTcmMgPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoc2NyaXB0RWxlbWVudHMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwic3JjXCIpO1xuICB9KTtcblxuICBpZiAoc2NyaXB0RWxlbWVudHNXaXRoU3JjLmxlbmd0aCA+IDApIHtcbiAgICB2YXIgY3VycmVudFNjcmlwdCA9IHNjcmlwdEVsZW1lbnRzV2l0aFNyY1tzY3JpcHRFbGVtZW50c1dpdGhTcmMubGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIGN1cnJlbnRTY3JpcHQuZ2V0QXR0cmlidXRlKFwic3JjXCIpO1xuICB9IC8vIEZhaWwgYXMgdGhlcmUgd2FzIG5vIHNjcmlwdCB0byB1c2UuXG5cblxuICB0aHJvdyBuZXcgRXJyb3IoXCJbd2VicGFjay1kZXYtc2VydmVyXSBGYWlsZWQgdG8gZ2V0IGN1cnJlbnQgc2NyaXB0IHNvdXJjZS5cIik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldEN1cnJlbnRTY3JpcHRTb3VyY2U7IiwiaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vbW9kdWxlcy9sb2dnZXIvaW5kZXguanNcIjtcbnZhciBuYW1lID0gXCJ3ZWJwYWNrLWRldi1zZXJ2ZXJcIjsgLy8gZGVmYXVsdCBsZXZlbCBpcyBzZXQgb24gdGhlIGNsaWVudCBzaWRlLCBzbyBpdCBkb2VzIG5vdCBuZWVkXG4vLyB0byBiZSBzZXQgYnkgdGhlIENMSSBvciBBUElcblxudmFyIGRlZmF1bHRMZXZlbCA9IFwiaW5mb1wiOyAvLyBvcHRpb25zIG5ldyBvcHRpb25zLCBtZXJnZSB3aXRoIG9sZCBvcHRpb25zXG5cbi8qKlxuICogQHBhcmFtIHtmYWxzZSB8IHRydWUgfCBcIm5vbmVcIiB8IFwiZXJyb3JcIiB8IFwid2FyblwiIHwgXCJpbmZvXCIgfCBcImxvZ1wiIHwgXCJ2ZXJib3NlXCJ9IGxldmVsXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuXG5mdW5jdGlvbiBzZXRMb2dMZXZlbChsZXZlbCkge1xuICBsb2dnZXIuY29uZmlndXJlRGVmYXVsdExvZ2dlcih7XG4gICAgbGV2ZWw6IGxldmVsXG4gIH0pO1xufVxuXG5zZXRMb2dMZXZlbChkZWZhdWx0TGV2ZWwpO1xudmFyIGxvZyA9IGxvZ2dlci5nZXRMb2dnZXIobmFtZSk7XG5leHBvcnQgeyBsb2csIHNldExvZ0xldmVsIH07IiwiaW1wb3J0IGdldEN1cnJlbnRTY3JpcHRTb3VyY2UgZnJvbSBcIi4vZ2V0Q3VycmVudFNjcmlwdFNvdXJjZS5qc1wiO1xuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2VRdWVyeVxuICogQHJldHVybnMge3sgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgYm9vbGVhbiB9fVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlVVJMKHJlc291cmNlUXVlcnkpIHtcbiAgLyoqIEB0eXBlIHt7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9fSAqL1xuICB2YXIgb3B0aW9ucyA9IHt9O1xuXG4gIGlmICh0eXBlb2YgcmVzb3VyY2VRdWVyeSA9PT0gXCJzdHJpbmdcIiAmJiByZXNvdXJjZVF1ZXJ5ICE9PSBcIlwiKSB7XG4gICAgdmFyIHNlYXJjaFBhcmFtcyA9IHJlc291cmNlUXVlcnkuc3Vic3RyKDEpLnNwbGl0KFwiJlwiKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VhcmNoUGFyYW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcGFpciA9IHNlYXJjaFBhcmFtc1tpXS5zcGxpdChcIj1cIik7XG4gICAgICBvcHRpb25zW3BhaXJbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBFbHNlLCBnZXQgdGhlIHVybCBmcm9tIHRoZSA8c2NyaXB0PiB0aGlzIGZpbGUgd2FzIGNhbGxlZCB3aXRoLlxuICAgIHZhciBzY3JpcHRTb3VyY2UgPSBnZXRDdXJyZW50U2NyaXB0U291cmNlKCk7XG4gICAgdmFyIHNjcmlwdFNvdXJjZVVSTDtcblxuICAgIHRyeSB7XG4gICAgICAvLyBUaGUgcGxhY2Vob2xkZXIgYGJhc2VVUkxgIHdpdGggYHdpbmRvdy5sb2NhdGlvbi5ocmVmYCxcbiAgICAgIC8vIGlzIHRvIGFsbG93IHBhcnNpbmcgb2YgcGF0aC1yZWxhdGl2ZSBvciBwcm90b2NvbC1yZWxhdGl2ZSBVUkxzLFxuICAgICAgLy8gYW5kIHdpbGwgaGF2ZSBubyBlZmZlY3QgaWYgYHNjcmlwdFNvdXJjZWAgaXMgYSBmdWxseSB2YWxpZCBVUkwuXG4gICAgICBzY3JpcHRTb3VyY2VVUkwgPSBuZXcgVVJMKHNjcmlwdFNvdXJjZSwgc2VsZi5sb2NhdGlvbi5ocmVmKTtcbiAgICB9IGNhdGNoIChlcnJvcikgey8vIFVSTCBwYXJzaW5nIGZhaWxlZCwgZG8gbm90aGluZy5cbiAgICAgIC8vIFdlIHdpbGwgc3RpbGwgcHJvY2VlZCB0byBzZWUgaWYgd2UgY2FuIHJlY292ZXIgdXNpbmcgYHJlc291cmNlUXVlcnlgXG4gICAgfVxuXG4gICAgaWYgKHNjcmlwdFNvdXJjZVVSTCkge1xuICAgICAgb3B0aW9ucyA9IHNjcmlwdFNvdXJjZVVSTDtcbiAgICAgIG9wdGlvbnMuZnJvbUN1cnJlbnRTY3JpcHQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvcHRpb25zO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJzZVVSTDsiLCJpbXBvcnQgaG90RW1pdHRlciBmcm9tIFwid2VicGFjay9ob3QvZW1pdHRlci5qc1wiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nLmpzXCI7XG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4uL2luZGV4XCIpLk9wdGlvbnN9IE9wdGlvbnNcbi8qKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vaW5kZXhcIikuU3RhdHVzfSBTdGF0dXNcblxuLyoqXG4gKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnNcbiAqIEBwYXJhbSB7U3RhdHVzfSBzdGF0dXNcbiAqL1xuXG5mdW5jdGlvbiByZWxvYWRBcHAoX3JlZiwgc3RhdHVzKSB7XG4gIHZhciBob3QgPSBfcmVmLmhvdCxcbiAgICAgIGxpdmVSZWxvYWQgPSBfcmVmLmxpdmVSZWxvYWQ7XG5cbiAgaWYgKHN0YXR1cy5pc1VubG9hZGluZykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBjdXJyZW50SGFzaCA9IHN0YXR1cy5jdXJyZW50SGFzaCxcbiAgICAgIHByZXZpb3VzSGFzaCA9IHN0YXR1cy5wcmV2aW91c0hhc2g7XG4gIHZhciBpc0luaXRpYWwgPSBjdXJyZW50SGFzaC5pbmRleE9mKFxuICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgcHJldmlvdXNIYXNoKSA+PSAwO1xuXG4gIGlmIChpc0luaXRpYWwpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7V2luZG93fSByb290V2luZG93XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbnRlcnZhbElkXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gYXBwbHlSZWxvYWQocm9vdFdpbmRvdywgaW50ZXJ2YWxJZCkge1xuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG4gICAgbG9nLmluZm8oXCJBcHAgdXBkYXRlZC4gUmVsb2FkaW5nLi4uXCIpO1xuICAgIHJvb3RXaW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gIH1cblxuICB2YXIgc2VhcmNoID0gc2VsZi5sb2NhdGlvbi5zZWFyY2gudG9Mb3dlckNhc2UoKTtcbiAgdmFyIGFsbG93VG9Ib3QgPSBzZWFyY2guaW5kZXhPZihcIndlYnBhY2stZGV2LXNlcnZlci1ob3Q9ZmFsc2VcIikgPT09IC0xO1xuICB2YXIgYWxsb3dUb0xpdmVSZWxvYWQgPSBzZWFyY2guaW5kZXhPZihcIndlYnBhY2stZGV2LXNlcnZlci1saXZlLXJlbG9hZD1mYWxzZVwiKSA9PT0gLTE7XG5cbiAgaWYgKGhvdCAmJiBhbGxvd1RvSG90KSB7XG4gICAgbG9nLmluZm8oXCJBcHAgaG90IHVwZGF0ZS4uLlwiKTtcbiAgICBob3RFbWl0dGVyLmVtaXQoXCJ3ZWJwYWNrSG90VXBkYXRlXCIsIHN0YXR1cy5jdXJyZW50SGFzaCk7XG5cbiAgICBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi53aW5kb3cpIHtcbiAgICAgIC8vIGJyb2FkY2FzdCB1cGRhdGUgdG8gd2luZG93XG4gICAgICBzZWxmLnBvc3RNZXNzYWdlKFwid2VicGFja0hvdFVwZGF0ZVwiLmNvbmNhdChzdGF0dXMuY3VycmVudEhhc2gpLCBcIipcIik7XG4gICAgfVxuICB9IC8vIGFsbG93IHJlZnJlc2hpbmcgdGhlIHBhZ2Ugb25seSBpZiBsaXZlUmVsb2FkIGlzbid0IGRpc2FibGVkXG4gIGVsc2UgaWYgKGxpdmVSZWxvYWQgJiYgYWxsb3dUb0xpdmVSZWxvYWQpIHtcbiAgICB2YXIgcm9vdFdpbmRvdyA9IHNlbGY7IC8vIHVzZSBwYXJlbnQgd2luZG93IGZvciByZWxvYWQgKGluIGNhc2Ugd2UncmUgaW4gYW4gaWZyYW1lIHdpdGggbm8gdmFsaWQgc3JjKVxuXG4gICAgdmFyIGludGVydmFsSWQgPSBzZWxmLnNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChyb290V2luZG93LmxvY2F0aW9uLnByb3RvY29sICE9PSBcImFib3V0OlwiKSB7XG4gICAgICAgIC8vIHJlbG9hZCBpbW1lZGlhdGVseSBpZiBwcm90b2NvbCBpcyB2YWxpZFxuICAgICAgICBhcHBseVJlbG9hZChyb290V2luZG93LCBpbnRlcnZhbElkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3RXaW5kb3cgPSByb290V2luZG93LnBhcmVudDtcblxuICAgICAgICBpZiAocm9vdFdpbmRvdy5wYXJlbnQgPT09IHJvb3RXaW5kb3cpIHtcbiAgICAgICAgICAvLyBpZiBwYXJlbnQgZXF1YWxzIGN1cnJlbnQgd2luZG93IHdlJ3ZlIHJlYWNoZWQgdGhlIHJvb3Qgd2hpY2ggd291bGQgY29udGludWUgZm9yZXZlciwgc28gdHJpZ2dlciBhIHJlbG9hZCBhbnl3YXlzXG4gICAgICAgICAgYXBwbHlSZWxvYWQocm9vdFdpbmRvdywgaW50ZXJ2YWxJZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCByZWxvYWRBcHA7IiwiLyogZ2xvYmFsIF9fcmVzb3VyY2VRdWVyeSBXb3JrZXJHbG9iYWxTY29wZSAqL1xuLy8gU2VuZCBtZXNzYWdlcyB0byB0aGUgb3V0c2lkZSwgc28gcGx1Z2lucyBjYW4gY29uc3VtZSBpdC5cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHthbnl9IFtkYXRhXVxuICovXG5mdW5jdGlvbiBzZW5kTXNnKHR5cGUsIGRhdGEpIHtcbiAgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmICh0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgPT09IFwidW5kZWZpbmVkXCIgfHwgIShzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUpKSkge1xuICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgdHlwZTogXCJ3ZWJwYWNrXCIuY29uY2F0KHR5cGUpLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0sIFwiKlwiKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBzZW5kTXNnOyIsInZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKFwiZXZlbnRzXCIpO1xubW9kdWxlLmV4cG9ydHMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4iLCJ2YXIgbG9nTGV2ZWwgPSBcImluZm9cIjtcblxuZnVuY3Rpb24gZHVtbXkoKSB7fVxuXG5mdW5jdGlvbiBzaG91bGRMb2cobGV2ZWwpIHtcblx0dmFyIHNob3VsZExvZyA9XG5cdFx0KGxvZ0xldmVsID09PSBcImluZm9cIiAmJiBsZXZlbCA9PT0gXCJpbmZvXCIpIHx8XG5cdFx0KFtcImluZm9cIiwgXCJ3YXJuaW5nXCJdLmluZGV4T2YobG9nTGV2ZWwpID49IDAgJiYgbGV2ZWwgPT09IFwid2FybmluZ1wiKSB8fFxuXHRcdChbXCJpbmZvXCIsIFwid2FybmluZ1wiLCBcImVycm9yXCJdLmluZGV4T2YobG9nTGV2ZWwpID49IDAgJiYgbGV2ZWwgPT09IFwiZXJyb3JcIik7XG5cdHJldHVybiBzaG91bGRMb2c7XG59XG5cbmZ1bmN0aW9uIGxvZ0dyb3VwKGxvZ0ZuKSB7XG5cdHJldHVybiBmdW5jdGlvbiAobGV2ZWwsIG1zZykge1xuXHRcdGlmIChzaG91bGRMb2cobGV2ZWwpKSB7XG5cdFx0XHRsb2dGbihtc2cpO1xuXHRcdH1cblx0fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGV2ZWwsIG1zZykge1xuXHRpZiAoc2hvdWxkTG9nKGxldmVsKSkge1xuXHRcdGlmIChsZXZlbCA9PT0gXCJpbmZvXCIpIHtcblx0XHRcdGNvbnNvbGUubG9nKG1zZyk7XG5cdFx0fSBlbHNlIGlmIChsZXZlbCA9PT0gXCJ3YXJuaW5nXCIpIHtcblx0XHRcdGNvbnNvbGUud2Fybihtc2cpO1xuXHRcdH0gZWxzZSBpZiAobGV2ZWwgPT09IFwiZXJyb3JcIikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihtc2cpO1xuXHRcdH1cblx0fVxufTtcblxuLyogZXNsaW50LWRpc2FibGUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zICovXG52YXIgZ3JvdXAgPSBjb25zb2xlLmdyb3VwIHx8IGR1bW15O1xudmFyIGdyb3VwQ29sbGFwc2VkID0gY29uc29sZS5ncm91cENvbGxhcHNlZCB8fCBkdW1teTtcbnZhciBncm91cEVuZCA9IGNvbnNvbGUuZ3JvdXBFbmQgfHwgZHVtbXk7XG4vKiBlc2xpbnQtZW5hYmxlIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGlucyAqL1xuXG5tb2R1bGUuZXhwb3J0cy5ncm91cCA9IGxvZ0dyb3VwKGdyb3VwKTtcblxubW9kdWxlLmV4cG9ydHMuZ3JvdXBDb2xsYXBzZWQgPSBsb2dHcm91cChncm91cENvbGxhcHNlZCk7XG5cbm1vZHVsZS5leHBvcnRzLmdyb3VwRW5kID0gbG9nR3JvdXAoZ3JvdXBFbmQpO1xuXG5tb2R1bGUuZXhwb3J0cy5zZXRMb2dMZXZlbCA9IGZ1bmN0aW9uIChsZXZlbCkge1xuXHRsb2dMZXZlbCA9IGxldmVsO1xufTtcblxubW9kdWxlLmV4cG9ydHMuZm9ybWF0RXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG5cdHZhciBtZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG5cdHZhciBzdGFjayA9IGVyci5zdGFjaztcblx0aWYgKCFzdGFjaykge1xuXHRcdHJldHVybiBtZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHN0YWNrLmluZGV4T2YobWVzc2FnZSkgPCAwKSB7XG5cdFx0cmV0dXJuIG1lc3NhZ2UgKyBcIlxcblwiICsgc3RhY2s7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHN0YWNrO1xuXHR9XG59O1xuIiwiaW1wb3J0IHsgVHJhbnNmb3JtIH0gZnJvbSAnLi9UcmFuc2Zvcm0uanMnO1xuaW1wb3J0IHsgTWF0NCB9IGZyb20gJy4uL21hdGgvTWF0NC5qcyc7XG5pbXBvcnQgeyBWZWMzIH0gZnJvbSAnLi4vbWF0aC9WZWMzLmpzJztcblxuY29uc3QgdGVtcE1hdDQgPSBuZXcgTWF0NCgpO1xuY29uc3QgdGVtcFZlYzNhID0gbmV3IFZlYzMoKTtcbmNvbnN0IHRlbXBWZWMzYiA9IG5ldyBWZWMzKCk7XG5cbmV4cG9ydCBjbGFzcyBDYW1lcmEgZXh0ZW5kcyBUcmFuc2Zvcm0ge1xuICAgIGNvbnN0cnVjdG9yKGdsLCB7IG5lYXIgPSAwLjEsIGZhciA9IDEwMCwgZm92ID0gNDUsIGFzcGVjdCA9IDEsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgem9vbSA9IDEgfSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7IG5lYXIsIGZhciwgZm92LCBhc3BlY3QsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgem9vbSB9KTtcblxuICAgICAgICB0aGlzLnByb2plY3Rpb25NYXRyaXggPSBuZXcgTWF0NCgpO1xuICAgICAgICB0aGlzLnZpZXdNYXRyaXggPSBuZXcgTWF0NCgpO1xuICAgICAgICB0aGlzLnByb2plY3Rpb25WaWV3TWF0cml4ID0gbmV3IE1hdDQoKTtcbiAgICAgICAgdGhpcy53b3JsZFBvc2l0aW9uID0gbmV3IFZlYzMoKTtcblxuICAgICAgICAvLyBVc2Ugb3J0aG9ncmFwaGljIGlmIGxlZnQvcmlnaHQgc2V0LCBlbHNlIGRlZmF1bHQgdG8gcGVyc3BlY3RpdmUgY2FtZXJhXG4gICAgICAgIHRoaXMudHlwZSA9IGxlZnQgfHwgcmlnaHQgPyAnb3J0aG9ncmFwaGljJyA6ICdwZXJzcGVjdGl2ZSc7XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ29ydGhvZ3JhcGhpYycpIHRoaXMub3J0aG9ncmFwaGljKCk7XG4gICAgICAgIGVsc2UgdGhpcy5wZXJzcGVjdGl2ZSgpO1xuICAgIH1cblxuICAgIHBlcnNwZWN0aXZlKHsgbmVhciA9IHRoaXMubmVhciwgZmFyID0gdGhpcy5mYXIsIGZvdiA9IHRoaXMuZm92LCBhc3BlY3QgPSB0aGlzLmFzcGVjdCB9ID0ge30pIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7IG5lYXIsIGZhciwgZm92LCBhc3BlY3QgfSk7XG4gICAgICAgIHRoaXMucHJvamVjdGlvbk1hdHJpeC5mcm9tUGVyc3BlY3RpdmUoeyBmb3Y6IGZvdiAqIChNYXRoLlBJIC8gMTgwKSwgYXNwZWN0LCBuZWFyLCBmYXIgfSk7XG4gICAgICAgIHRoaXMudHlwZSA9ICdwZXJzcGVjdGl2ZSc7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIG9ydGhvZ3JhcGhpYyh7XG4gICAgICAgIG5lYXIgPSB0aGlzLm5lYXIsXG4gICAgICAgIGZhciA9IHRoaXMuZmFyLFxuICAgICAgICBsZWZ0ID0gdGhpcy5sZWZ0LFxuICAgICAgICByaWdodCA9IHRoaXMucmlnaHQsXG4gICAgICAgIGJvdHRvbSA9IHRoaXMuYm90dG9tLFxuICAgICAgICB0b3AgPSB0aGlzLnRvcCxcbiAgICAgICAgem9vbSA9IHRoaXMuem9vbSxcbiAgICB9ID0ge30pIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7IG5lYXIsIGZhciwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCB6b29tIH0pO1xuICAgICAgICBsZWZ0IC89IHpvb207XG4gICAgICAgIHJpZ2h0IC89IHpvb207XG4gICAgICAgIGJvdHRvbSAvPSB6b29tO1xuICAgICAgICB0b3AgLz0gem9vbTtcbiAgICAgICAgdGhpcy5wcm9qZWN0aW9uTWF0cml4LmZyb21PcnRob2dvbmFsKHsgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIgfSk7XG4gICAgICAgIHRoaXMudHlwZSA9ICdvcnRob2dyYXBoaWMnO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB1cGRhdGVNYXRyaXhXb3JsZCgpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlTWF0cml4V29ybGQoKTtcbiAgICAgICAgdGhpcy52aWV3TWF0cml4LmludmVyc2UodGhpcy53b3JsZE1hdHJpeCk7XG4gICAgICAgIHRoaXMud29ybGRNYXRyaXguZ2V0VHJhbnNsYXRpb24odGhpcy53b3JsZFBvc2l0aW9uKTtcblxuICAgICAgICAvLyB1c2VkIGZvciBzb3J0aW5nXG4gICAgICAgIHRoaXMucHJvamVjdGlvblZpZXdNYXRyaXgubXVsdGlwbHkodGhpcy5wcm9qZWN0aW9uTWF0cml4LCB0aGlzLnZpZXdNYXRyaXgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBsb29rQXQodGFyZ2V0KSB7XG4gICAgICAgIHN1cGVyLmxvb2tBdCh0YXJnZXQsIHRydWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBQcm9qZWN0IDNEIGNvb3JkaW5hdGUgdG8gMkQgcG9pbnRcbiAgICBwcm9qZWN0KHYpIHtcbiAgICAgICAgdi5hcHBseU1hdHJpeDQodGhpcy52aWV3TWF0cml4KTtcbiAgICAgICAgdi5hcHBseU1hdHJpeDQodGhpcy5wcm9qZWN0aW9uTWF0cml4KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gVW5wcm9qZWN0IDJEIHBvaW50IHRvIDNEIGNvb3JkaW5hdGVcbiAgICB1bnByb2plY3Qodikge1xuICAgICAgICB2LmFwcGx5TWF0cml4NCh0ZW1wTWF0NC5pbnZlcnNlKHRoaXMucHJvamVjdGlvbk1hdHJpeCkpO1xuICAgICAgICB2LmFwcGx5TWF0cml4NCh0aGlzLndvcmxkTWF0cml4KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdXBkYXRlRnJ1c3R1bSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmZydXN0dW0pIHtcbiAgICAgICAgICAgIHRoaXMuZnJ1c3R1bSA9IFtuZXcgVmVjMygpLCBuZXcgVmVjMygpLCBuZXcgVmVjMygpLCBuZXcgVmVjMygpLCBuZXcgVmVjMygpLCBuZXcgVmVjMygpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLnByb2plY3Rpb25WaWV3TWF0cml4O1xuICAgICAgICB0aGlzLmZydXN0dW1bMF0uc2V0KG1bM10gLSBtWzBdLCBtWzddIC0gbVs0XSwgbVsxMV0gLSBtWzhdKS5jb25zdGFudCA9IG1bMTVdIC0gbVsxMl07IC8vIC14XG4gICAgICAgIHRoaXMuZnJ1c3R1bVsxXS5zZXQobVszXSArIG1bMF0sIG1bN10gKyBtWzRdLCBtWzExXSArIG1bOF0pLmNvbnN0YW50ID0gbVsxNV0gKyBtWzEyXTsgLy8gK3hcbiAgICAgICAgdGhpcy5mcnVzdHVtWzJdLnNldChtWzNdICsgbVsxXSwgbVs3XSArIG1bNV0sIG1bMTFdICsgbVs5XSkuY29uc3RhbnQgPSBtWzE1XSArIG1bMTNdOyAvLyAreVxuICAgICAgICB0aGlzLmZydXN0dW1bM10uc2V0KG1bM10gLSBtWzFdLCBtWzddIC0gbVs1XSwgbVsxMV0gLSBtWzldKS5jb25zdGFudCA9IG1bMTVdIC0gbVsxM107IC8vIC15XG4gICAgICAgIHRoaXMuZnJ1c3R1bVs0XS5zZXQobVszXSAtIG1bMl0sIG1bN10gLSBtWzZdLCBtWzExXSAtIG1bMTBdKS5jb25zdGFudCA9IG1bMTVdIC0gbVsxNF07IC8vICt6IChmYXIpXG4gICAgICAgIHRoaXMuZnJ1c3R1bVs1XS5zZXQobVszXSArIG1bMl0sIG1bN10gKyBtWzZdLCBtWzExXSArIG1bMTBdKS5jb25zdGFudCA9IG1bMTVdICsgbVsxNF07IC8vIC16IChuZWFyKVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBpbnZMZW4gPSAxLjAgLyB0aGlzLmZydXN0dW1baV0uZGlzdGFuY2UoKTtcbiAgICAgICAgICAgIHRoaXMuZnJ1c3R1bVtpXS5tdWx0aXBseShpbnZMZW4pO1xuICAgICAgICAgICAgdGhpcy5mcnVzdHVtW2ldLmNvbnN0YW50ICo9IGludkxlbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZydXN0dW1JbnRlcnNlY3RzTWVzaChub2RlKSB7XG4gICAgICAgIC8vIElmIG5vIHBvc2l0aW9uIGF0dHJpYnV0ZSwgdHJlYXQgYXMgZnJ1c3R1bUN1bGxlZCBmYWxzZVxuICAgICAgICBpZiAoIW5vZGUuZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbikgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgaWYgKCFub2RlLmdlb21ldHJ5LmJvdW5kcyB8fCBub2RlLmdlb21ldHJ5LmJvdW5kcy5yYWRpdXMgPT09IEluZmluaXR5KSBub2RlLmdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ1NwaGVyZSgpO1xuXG4gICAgICAgIGlmICghbm9kZS5nZW9tZXRyeS5ib3VuZHMpIHJldHVybiB0cnVlO1xuXG4gICAgICAgIGNvbnN0IGNlbnRlciA9IHRlbXBWZWMzYTtcbiAgICAgICAgY2VudGVyLmNvcHkobm9kZS5nZW9tZXRyeS5ib3VuZHMuY2VudGVyKTtcbiAgICAgICAgY2VudGVyLmFwcGx5TWF0cml4NChub2RlLndvcmxkTWF0cml4KTtcblxuICAgICAgICBjb25zdCByYWRpdXMgPSBub2RlLmdlb21ldHJ5LmJvdW5kcy5yYWRpdXMgKiBub2RlLndvcmxkTWF0cml4LmdldE1heFNjYWxlT25BeGlzKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZnJ1c3R1bUludGVyc2VjdHNTcGhlcmUoY2VudGVyLCByYWRpdXMpO1xuICAgIH1cblxuICAgIGZydXN0dW1JbnRlcnNlY3RzU3BoZXJlKGNlbnRlciwgcmFkaXVzKSB7XG4gICAgICAgIGNvbnN0IG5vcm1hbCA9IHRlbXBWZWMzYjtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcGxhbmUgPSB0aGlzLmZydXN0dW1baV07XG4gICAgICAgICAgICBjb25zdCBkaXN0YW5jZSA9IG5vcm1hbC5jb3B5KHBsYW5lKS5kb3QoY2VudGVyKSArIHBsYW5lLmNvbnN0YW50O1xuICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgLXJhZGl1cykgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbiIsIi8vIGF0dHJpYnV0ZSBwYXJhbXNcbi8vIHtcbi8vICAgICBkYXRhIC0gdHlwZWQgYXJyYXkgZWcgVUludDE2QXJyYXkgZm9yIGluZGljZXMsIEZsb2F0MzJBcnJheVxuLy8gICAgIHNpemUgLSBpbnQgZGVmYXVsdCAxXG4vLyAgICAgaW5zdGFuY2VkIC0gZGVmYXVsdCBudWxsLiBQYXNzIGRpdmlzb3IgYW1vdW50XG4vLyAgICAgdHlwZSAtIGdsIGVudW0gZGVmYXVsdCBnbC5VTlNJR05FRF9TSE9SVCBmb3IgJ2luZGV4JywgZ2wuRkxPQVQgZm9yIG90aGVyc1xuLy8gICAgIG5vcm1hbGl6ZWQgLSBib29sZWFuIGRlZmF1bHQgZmFsc2VcblxuLy8gICAgIGJ1ZmZlciAtIGdsIGJ1ZmZlciwgaWYgYnVmZmVyIGV4aXN0cywgZG9uJ3QgbmVlZCB0byBwcm92aWRlIGRhdGEgLSBhbHRob3VnaCBuZWVkcyBwb3NpdGlvbiBkYXRhIGZvciBib3VuZHMgY2FsY3VsYXRpb25cbi8vICAgICBzdHJpZGUgLSBkZWZhdWx0IDAgLSBmb3Igd2hlbiBwYXNzaW5nIGluIGJ1ZmZlclxuLy8gICAgIG9mZnNldCAtIGRlZmF1bHQgMCAtIGZvciB3aGVuIHBhc3NpbmcgaW4gYnVmZmVyXG4vLyAgICAgY291bnQgLSBkZWZhdWx0IG51bGwgLSBmb3Igd2hlbiBwYXNzaW5nIGluIGJ1ZmZlclxuLy8gICAgIG1pbiAtIGFycmF5IC0gZm9yIHdoZW4gcGFzc2luZyBpbiBidWZmZXJcbi8vICAgICBtYXggLSBhcnJheSAtIGZvciB3aGVuIHBhc3NpbmcgaW4gYnVmZmVyXG4vLyB9XG5cbi8vIFRPRE86IGZpdCBpbiB0cmFuc2Zvcm0gZmVlZGJhY2tcblxuaW1wb3J0IHsgVmVjMyB9IGZyb20gJy4uL21hdGgvVmVjMy5qcyc7XG5cbmNvbnN0IHRlbXBWZWMzID0gbmV3IFZlYzMoKTtcblxubGV0IElEID0gMTtcbmxldCBBVFRSX0lEID0gMTtcblxuLy8gVG8gc3RvcCBpbmlmaW5pdGUgd2FybmluZ3NcbmxldCBpc0JvdW5kc1dhcm5lZCA9IGZhbHNlO1xuXG5leHBvcnQgY2xhc3MgR2VvbWV0cnkge1xuICAgIGNvbnN0cnVjdG9yKGdsLCBhdHRyaWJ1dGVzID0ge30pIHtcbiAgICAgICAgaWYgKCFnbC5jYW52YXMpIGNvbnNvbGUuZXJyb3IoJ2dsIG5vdCBwYXNzZWQgYXMgZmlyc3QgYXJndW1lbnQgdG8gR2VvbWV0cnknKTtcbiAgICAgICAgdGhpcy5nbCA9IGdsO1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xuICAgICAgICB0aGlzLmlkID0gSUQrKztcblxuICAgICAgICAvLyBTdG9yZSBvbmUgVkFPIHBlciBwcm9ncmFtIGF0dHJpYnV0ZSBsb2NhdGlvbnMgb3JkZXJcbiAgICAgICAgdGhpcy5WQU9zID0ge307XG5cbiAgICAgICAgdGhpcy5kcmF3UmFuZ2UgPSB7IHN0YXJ0OiAwLCBjb3VudDogMCB9O1xuICAgICAgICB0aGlzLmluc3RhbmNlZENvdW50ID0gMDtcblxuICAgICAgICAvLyBVbmJpbmQgY3VycmVudCBWQU8gc28gdGhhdCBuZXcgYnVmZmVycyBkb24ndCBnZXQgYWRkZWQgdG8gYWN0aXZlIG1lc2hcbiAgICAgICAgdGhpcy5nbC5yZW5kZXJlci5iaW5kVmVydGV4QXJyYXkobnVsbCk7XG4gICAgICAgIHRoaXMuZ2wucmVuZGVyZXIuY3VycmVudEdlb21ldHJ5ID0gbnVsbDtcblxuICAgICAgICAvLyBBbGlhcyBmb3Igc3RhdGUgc3RvcmUgdG8gYXZvaWQgcmVkdW5kYW50IGNhbGxzIGZvciBnbG9iYWwgc3RhdGVcbiAgICAgICAgdGhpcy5nbFN0YXRlID0gdGhpcy5nbC5yZW5kZXJlci5zdGF0ZTtcblxuICAgICAgICAvLyBjcmVhdGUgdGhlIGJ1ZmZlcnNcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZEF0dHJpYnV0ZShrZXksIGF0dHIpIHtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzW2tleV0gPSBhdHRyO1xuXG4gICAgICAgIC8vIFNldCBvcHRpb25zXG4gICAgICAgIGF0dHIuaWQgPSBBVFRSX0lEKys7IC8vIFRPRE86IGN1cnJlbnRseSB1bnVzZWQsIHJlbW92ZT9cbiAgICAgICAgYXR0ci5zaXplID0gYXR0ci5zaXplIHx8IDE7XG4gICAgICAgIGF0dHIudHlwZSA9XG4gICAgICAgICAgICBhdHRyLnR5cGUgfHxcbiAgICAgICAgICAgIChhdHRyLmRhdGEuY29uc3RydWN0b3IgPT09IEZsb2F0MzJBcnJheVxuICAgICAgICAgICAgICAgID8gdGhpcy5nbC5GTE9BVFxuICAgICAgICAgICAgICAgIDogYXR0ci5kYXRhLmNvbnN0cnVjdG9yID09PSBVaW50MTZBcnJheVxuICAgICAgICAgICAgICAgID8gdGhpcy5nbC5VTlNJR05FRF9TSE9SVFxuICAgICAgICAgICAgICAgIDogdGhpcy5nbC5VTlNJR05FRF9JTlQpOyAvLyBVaW50MzJBcnJheVxuICAgICAgICBhdHRyLnRhcmdldCA9IGtleSA9PT0gJ2luZGV4JyA/IHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIgOiB0aGlzLmdsLkFSUkFZX0JVRkZFUjtcbiAgICAgICAgYXR0ci5ub3JtYWxpemVkID0gYXR0ci5ub3JtYWxpemVkIHx8IGZhbHNlO1xuICAgICAgICBhdHRyLnN0cmlkZSA9IGF0dHIuc3RyaWRlIHx8IDA7XG4gICAgICAgIGF0dHIub2Zmc2V0ID0gYXR0ci5vZmZzZXQgfHwgMDtcbiAgICAgICAgYXR0ci5jb3VudCA9IGF0dHIuY291bnQgfHwgKGF0dHIuc3RyaWRlID8gYXR0ci5kYXRhLmJ5dGVMZW5ndGggLyBhdHRyLnN0cmlkZSA6IGF0dHIuZGF0YS5sZW5ndGggLyBhdHRyLnNpemUpO1xuICAgICAgICBhdHRyLmRpdmlzb3IgPSBhdHRyLmluc3RhbmNlZCB8fCAwO1xuICAgICAgICBhdHRyLm5lZWRzVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIGF0dHIudXNhZ2UgPSBhdHRyLnVzYWdlIHx8IHRoaXMuZ2wuU1RBVElDX0RSQVc7XG5cbiAgICAgICAgaWYgKCFhdHRyLmJ1ZmZlcikge1xuICAgICAgICAgICAgLy8gUHVzaCBkYXRhIHRvIGJ1ZmZlclxuICAgICAgICAgICAgdGhpcy51cGRhdGVBdHRyaWJ1dGUoYXR0cik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVcGRhdGUgZ2VvbWV0cnkgY291bnRzLiBJZiBpbmRleGVkLCBpZ25vcmUgcmVndWxhciBhdHRyaWJ1dGVzXG4gICAgICAgIGlmIChhdHRyLmRpdmlzb3IpIHtcbiAgICAgICAgICAgIHRoaXMuaXNJbnN0YW5jZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2VkQ291bnQgJiYgdGhpcy5pbnN0YW5jZWRDb3VudCAhPT0gYXR0ci5jb3VudCAqIGF0dHIuZGl2aXNvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignZ2VvbWV0cnkgaGFzIG11bHRpcGxlIGluc3RhbmNlZCBidWZmZXJzIG9mIGRpZmZlcmVudCBsZW5ndGgnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuaW5zdGFuY2VkQ291bnQgPSBNYXRoLm1pbih0aGlzLmluc3RhbmNlZENvdW50LCBhdHRyLmNvdW50ICogYXR0ci5kaXZpc29yKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlZENvdW50ID0gYXR0ci5jb3VudCAqIGF0dHIuZGl2aXNvcjtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdpbmRleCcpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd1JhbmdlLmNvdW50ID0gYXR0ci5jb3VudDtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5hdHRyaWJ1dGVzLmluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdSYW5nZS5jb3VudCA9IE1hdGgubWF4KHRoaXMuZHJhd1JhbmdlLmNvdW50LCBhdHRyLmNvdW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUF0dHJpYnV0ZShhdHRyKSB7XG4gICAgICAgIGNvbnN0IGlzTmV3QnVmZmVyID0gIWF0dHIuYnVmZmVyO1xuICAgICAgICBpZiAoaXNOZXdCdWZmZXIpIGF0dHIuYnVmZmVyID0gdGhpcy5nbC5jcmVhdGVCdWZmZXIoKTtcbiAgICAgICAgaWYgKHRoaXMuZ2xTdGF0ZS5ib3VuZEJ1ZmZlciAhPT0gYXR0ci5idWZmZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcihhdHRyLnRhcmdldCwgYXR0ci5idWZmZXIpO1xuICAgICAgICAgICAgdGhpcy5nbFN0YXRlLmJvdW5kQnVmZmVyID0gYXR0ci5idWZmZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzTmV3QnVmZmVyKSB7XG4gICAgICAgICAgICB0aGlzLmdsLmJ1ZmZlckRhdGEoYXR0ci50YXJnZXQsIGF0dHIuZGF0YSwgYXR0ci51c2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdsLmJ1ZmZlclN1YkRhdGEoYXR0ci50YXJnZXQsIDAsIGF0dHIuZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgYXR0ci5uZWVkc1VwZGF0ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNldEluZGV4KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuYWRkQXR0cmlidXRlKCdpbmRleCcsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBzZXREcmF3UmFuZ2Uoc3RhcnQsIGNvdW50KSB7XG4gICAgICAgIHRoaXMuZHJhd1JhbmdlLnN0YXJ0ID0gc3RhcnQ7XG4gICAgICAgIHRoaXMuZHJhd1JhbmdlLmNvdW50ID0gY291bnQ7XG4gICAgfVxuXG4gICAgc2V0SW5zdGFuY2VkQ291bnQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5pbnN0YW5jZWRDb3VudCA9IHZhbHVlO1xuICAgIH1cblxuICAgIGNyZWF0ZVZBTyhwcm9ncmFtKSB7XG4gICAgICAgIHRoaXMuVkFPc1twcm9ncmFtLmF0dHJpYnV0ZU9yZGVyXSA9IHRoaXMuZ2wucmVuZGVyZXIuY3JlYXRlVmVydGV4QXJyYXkoKTtcbiAgICAgICAgdGhpcy5nbC5yZW5kZXJlci5iaW5kVmVydGV4QXJyYXkodGhpcy5WQU9zW3Byb2dyYW0uYXR0cmlidXRlT3JkZXJdKTtcbiAgICAgICAgdGhpcy5iaW5kQXR0cmlidXRlcyhwcm9ncmFtKTtcbiAgICB9XG5cbiAgICBiaW5kQXR0cmlidXRlcyhwcm9ncmFtKSB7XG4gICAgICAgIC8vIExpbmsgYWxsIGF0dHJpYnV0ZXMgdG8gcHJvZ3JhbSB1c2luZyBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyXG4gICAgICAgIHByb2dyYW0uYXR0cmlidXRlTG9jYXRpb25zLmZvckVhY2goKGxvY2F0aW9uLCB7IG5hbWUsIHR5cGUgfSkgPT4ge1xuICAgICAgICAgICAgLy8gSWYgZ2VvbWV0cnkgbWlzc2luZyBhIHJlcXVpcmVkIHNoYWRlciBhdHRyaWJ1dGVcbiAgICAgICAgICAgIGlmICghdGhpcy5hdHRyaWJ1dGVzW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBhY3RpdmUgYXR0cmlidXRlICR7bmFtZX0gbm90IGJlaW5nIHN1cHBsaWVkYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBhdHRyID0gdGhpcy5hdHRyaWJ1dGVzW25hbWVdO1xuXG4gICAgICAgICAgICB0aGlzLmdsLmJpbmRCdWZmZXIoYXR0ci50YXJnZXQsIGF0dHIuYnVmZmVyKTtcbiAgICAgICAgICAgIHRoaXMuZ2xTdGF0ZS5ib3VuZEJ1ZmZlciA9IGF0dHIuYnVmZmVyO1xuXG4gICAgICAgICAgICAvLyBGb3IgbWF0cml4IGF0dHJpYnV0ZXMsIGJ1ZmZlciBuZWVkcyB0byBiZSBkZWZpbmVkIHBlciBjb2x1bW5cbiAgICAgICAgICAgIGxldCBudW1Mb2MgPSAxO1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09IDM1Njc0KSBudW1Mb2MgPSAyOyAvLyBtYXQyXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gMzU2NzUpIG51bUxvYyA9IDM7IC8vIG1hdDNcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAzNTY3NikgbnVtTG9jID0gNDsgLy8gbWF0NFxuXG4gICAgICAgICAgICBjb25zdCBzaXplID0gYXR0ci5zaXplIC8gbnVtTG9jO1xuICAgICAgICAgICAgY29uc3Qgc3RyaWRlID0gbnVtTG9jID09PSAxID8gMCA6IG51bUxvYyAqIG51bUxvYyAqIG51bUxvYztcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IG51bUxvYyA9PT0gMSA/IDAgOiBudW1Mb2MgKiBudW1Mb2M7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtTG9jOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIobG9jYXRpb24gKyBpLCBzaXplLCBhdHRyLnR5cGUsIGF0dHIubm9ybWFsaXplZCwgYXR0ci5zdHJpZGUgKyBzdHJpZGUsIGF0dHIub2Zmc2V0ICsgaSAqIG9mZnNldCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NhdGlvbiArIGkpO1xuXG4gICAgICAgICAgICAgICAgLy8gRm9yIGluc3RhbmNlZCBhdHRyaWJ1dGVzLCBkaXZpc29yIG5lZWRzIHRvIGJlIHNldC5cbiAgICAgICAgICAgICAgICAvLyBGb3IgZmlyZWZveCwgbmVlZCB0byBzZXQgYmFjayB0byAwIGlmIG5vbi1pbnN0YW5jZWQgZHJhd24gYWZ0ZXIgaW5zdGFuY2VkLiBFbHNlIHdvbid0IHJlbmRlclxuICAgICAgICAgICAgICAgIHRoaXMuZ2wucmVuZGVyZXIudmVydGV4QXR0cmliRGl2aXNvcihsb2NhdGlvbiArIGksIGF0dHIuZGl2aXNvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEJpbmQgaW5kaWNlcyBpZiBnZW9tZXRyeSBpbmRleGVkXG4gICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXMuaW5kZXgpIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLmF0dHJpYnV0ZXMuaW5kZXguYnVmZmVyKTtcbiAgICB9XG5cbiAgICBkcmF3KHsgcHJvZ3JhbSwgbW9kZSA9IHRoaXMuZ2wuVFJJQU5HTEVTIH0pIHtcbiAgICAgICAgaWYgKHRoaXMuZ2wucmVuZGVyZXIuY3VycmVudEdlb21ldHJ5ICE9PSBgJHt0aGlzLmlkfV8ke3Byb2dyYW0uYXR0cmlidXRlT3JkZXJ9YCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLlZBT3NbcHJvZ3JhbS5hdHRyaWJ1dGVPcmRlcl0pIHRoaXMuY3JlYXRlVkFPKHByb2dyYW0pO1xuICAgICAgICAgICAgdGhpcy5nbC5yZW5kZXJlci5iaW5kVmVydGV4QXJyYXkodGhpcy5WQU9zW3Byb2dyYW0uYXR0cmlidXRlT3JkZXJdKTtcbiAgICAgICAgICAgIHRoaXMuZ2wucmVuZGVyZXIuY3VycmVudEdlb21ldHJ5ID0gYCR7dGhpcy5pZH1fJHtwcm9ncmFtLmF0dHJpYnV0ZU9yZGVyfWA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBpZiBhbnkgYXR0cmlidXRlcyBuZWVkIHVwZGF0aW5nXG4gICAgICAgIHByb2dyYW0uYXR0cmlidXRlTG9jYXRpb25zLmZvckVhY2goKGxvY2F0aW9uLCB7IG5hbWUgfSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYXR0ciA9IHRoaXMuYXR0cmlidXRlc1tuYW1lXTtcbiAgICAgICAgICAgIGlmIChhdHRyLm5lZWRzVXBkYXRlKSB0aGlzLnVwZGF0ZUF0dHJpYnV0ZShhdHRyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNJbnN0YW5jZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXMuaW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdsLnJlbmRlcmVyLmRyYXdFbGVtZW50c0luc3RhbmNlZChcbiAgICAgICAgICAgICAgICAgICAgbW9kZSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3UmFuZ2UuY291bnQsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0cmlidXRlcy5pbmRleC50eXBlLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dHJpYnV0ZXMuaW5kZXgub2Zmc2V0ICsgdGhpcy5kcmF3UmFuZ2Uuc3RhcnQgKiAyLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlZENvdW50XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nbC5yZW5kZXJlci5kcmF3QXJyYXlzSW5zdGFuY2VkKG1vZGUsIHRoaXMuZHJhd1JhbmdlLnN0YXJ0LCB0aGlzLmRyYXdSYW5nZS5jb3VudCwgdGhpcy5pbnN0YW5jZWRDb3VudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzLmluZGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nbC5kcmF3RWxlbWVudHMobW9kZSwgdGhpcy5kcmF3UmFuZ2UuY291bnQsIHRoaXMuYXR0cmlidXRlcy5pbmRleC50eXBlLCB0aGlzLmF0dHJpYnV0ZXMuaW5kZXgub2Zmc2V0ICsgdGhpcy5kcmF3UmFuZ2Uuc3RhcnQgKiAyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nbC5kcmF3QXJyYXlzKG1vZGUsIHRoaXMuZHJhd1JhbmdlLnN0YXJ0LCB0aGlzLmRyYXdSYW5nZS5jb3VudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQb3NpdGlvbigpIHtcbiAgICAgICAgLy8gVXNlIHBvc2l0aW9uIGJ1ZmZlciwgb3IgbWluL21heCBpZiBhdmFpbGFibGVcbiAgICAgICAgY29uc3QgYXR0ciA9IHRoaXMuYXR0cmlidXRlcy5wb3NpdGlvbjtcbiAgICAgICAgLy8gaWYgKGF0dHIubWluKSByZXR1cm4gWy4uLmF0dHIubWluLCAuLi5hdHRyLm1heF07XG4gICAgICAgIGlmIChhdHRyLmRhdGEpIHJldHVybiBhdHRyO1xuICAgICAgICBpZiAoaXNCb3VuZHNXYXJuZWQpIHJldHVybjtcbiAgICAgICAgY29uc29sZS53YXJuKCdObyBwb3NpdGlvbiBidWZmZXIgZGF0YSBmb3VuZCB0byBjb21wdXRlIGJvdW5kcycpO1xuICAgICAgICByZXR1cm4gKGlzQm91bmRzV2FybmVkID0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcHV0ZUJvdW5kaW5nQm94KGF0dHIpIHtcbiAgICAgICAgaWYgKCFhdHRyKSBhdHRyID0gdGhpcy5nZXRQb3NpdGlvbigpO1xuICAgICAgICBjb25zdCBhcnJheSA9IGF0dHIuZGF0YTtcbiAgICAgICAgY29uc3Qgc3RyaWRlID0gYXR0ci5zdHJpZGUgPyBhdHRyLnN0cmlkZSAvIGFycmF5LkJZVEVTX1BFUl9FTEVNRU5UIDogYXR0ci5zaXplO1xuXG4gICAgICAgIGlmICghdGhpcy5ib3VuZHMpIHtcbiAgICAgICAgICAgIHRoaXMuYm91bmRzID0ge1xuICAgICAgICAgICAgICAgIG1pbjogbmV3IFZlYzMoKSxcbiAgICAgICAgICAgICAgICBtYXg6IG5ldyBWZWMzKCksXG4gICAgICAgICAgICAgICAgY2VudGVyOiBuZXcgVmVjMygpLFxuICAgICAgICAgICAgICAgIHNjYWxlOiBuZXcgVmVjMygpLFxuICAgICAgICAgICAgICAgIHJhZGl1czogSW5maW5pdHksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWluID0gdGhpcy5ib3VuZHMubWluO1xuICAgICAgICBjb25zdCBtYXggPSB0aGlzLmJvdW5kcy5tYXg7XG4gICAgICAgIGNvbnN0IGNlbnRlciA9IHRoaXMuYm91bmRzLmNlbnRlcjtcbiAgICAgICAgY29uc3Qgc2NhbGUgPSB0aGlzLmJvdW5kcy5zY2FsZTtcblxuICAgICAgICBtaW4uc2V0KCtJbmZpbml0eSk7XG4gICAgICAgIG1heC5zZXQoLUluZmluaXR5KTtcblxuICAgICAgICAvLyBUT0RPOiBjaGVjayBzaXplIG9mIHBvc2l0aW9uIChlZyB0cmlhbmdsZSB3aXRoIFZlYzIpXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gYXJyYXkubGVuZ3RoOyBpIDwgbDsgaSArPSBzdHJpZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHggPSBhcnJheVtpXTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBhcnJheVtpICsgMV07XG4gICAgICAgICAgICBjb25zdCB6ID0gYXJyYXlbaSArIDJdO1xuXG4gICAgICAgICAgICBtaW4ueCA9IE1hdGgubWluKHgsIG1pbi54KTtcbiAgICAgICAgICAgIG1pbi55ID0gTWF0aC5taW4oeSwgbWluLnkpO1xuICAgICAgICAgICAgbWluLnogPSBNYXRoLm1pbih6LCBtaW4ueik7XG5cbiAgICAgICAgICAgIG1heC54ID0gTWF0aC5tYXgoeCwgbWF4LngpO1xuICAgICAgICAgICAgbWF4LnkgPSBNYXRoLm1heCh5LCBtYXgueSk7XG4gICAgICAgICAgICBtYXgueiA9IE1hdGgubWF4KHosIG1heC56KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjYWxlLnN1YihtYXgsIG1pbik7XG4gICAgICAgIGNlbnRlci5hZGQobWluLCBtYXgpLmRpdmlkZSgyKTtcbiAgICB9XG5cbiAgICBjb21wdXRlQm91bmRpbmdTcGhlcmUoYXR0cikge1xuICAgICAgICBpZiAoIWF0dHIpIGF0dHIgPSB0aGlzLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIGNvbnN0IGFycmF5ID0gYXR0ci5kYXRhO1xuICAgICAgICBjb25zdCBzdHJpZGUgPSBhdHRyLnN0cmlkZSA/IGF0dHIuc3RyaWRlIC8gYXJyYXkuQllURVNfUEVSX0VMRU1FTlQgOiBhdHRyLnNpemU7XG5cbiAgICAgICAgaWYgKCF0aGlzLmJvdW5kcykgdGhpcy5jb21wdXRlQm91bmRpbmdCb3goYXR0cik7XG5cbiAgICAgICAgbGV0IG1heFJhZGl1c1NxID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBhcnJheS5sZW5ndGg7IGkgPCBsOyBpICs9IHN0cmlkZSkge1xuICAgICAgICAgICAgdGVtcFZlYzMuZnJvbUFycmF5KGFycmF5LCBpKTtcbiAgICAgICAgICAgIG1heFJhZGl1c1NxID0gTWF0aC5tYXgobWF4UmFkaXVzU3EsIHRoaXMuYm91bmRzLmNlbnRlci5zcXVhcmVkRGlzdGFuY2UodGVtcFZlYzMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYm91bmRzLnJhZGl1cyA9IE1hdGguc3FydChtYXhSYWRpdXNTcSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKCkge1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5WQU9zKSB7XG4gICAgICAgICAgICB0aGlzLmdsLnJlbmRlcmVyLmRlbGV0ZVZlcnRleEFycmF5KHRoaXMuVkFPc1trZXldKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLlZBT3Nba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICB0aGlzLmdsLmRlbGV0ZUJ1ZmZlcih0aGlzLmF0dHJpYnV0ZXNba2V5XS5idWZmZXIpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuYXR0cmlidXRlc1trZXldO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVHJhbnNmb3JtIH0gZnJvbSAnLi9UcmFuc2Zvcm0uanMnO1xuaW1wb3J0IHsgTWF0MyB9IGZyb20gJy4uL21hdGgvTWF0My5qcyc7XG5pbXBvcnQgeyBNYXQ0IH0gZnJvbSAnLi4vbWF0aC9NYXQ0LmpzJztcblxubGV0IElEID0gMDtcblxuZXhwb3J0IGNsYXNzIE1lc2ggZXh0ZW5kcyBUcmFuc2Zvcm0ge1xuICAgIGNvbnN0cnVjdG9yKGdsLCB7IGdlb21ldHJ5LCBwcm9ncmFtLCBtb2RlID0gZ2wuVFJJQU5HTEVTLCBmcnVzdHVtQ3VsbGVkID0gdHJ1ZSwgcmVuZGVyT3JkZXIgPSAwIH0gPSB7fSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpZiAoIWdsLmNhbnZhcykgY29uc29sZS5lcnJvcignZ2wgbm90IHBhc3NlZCBhcyBmaXJzdCBhcmd1bWVudCB0byBNZXNoJyk7XG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcbiAgICAgICAgdGhpcy5pZCA9IElEKys7XG4gICAgICAgIHRoaXMuZ2VvbWV0cnkgPSBnZW9tZXRyeTtcbiAgICAgICAgdGhpcy5wcm9ncmFtID0gcHJvZ3JhbTtcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcblxuICAgICAgICAvLyBVc2VkIHRvIHNraXAgZnJ1c3R1bSBjdWxsaW5nXG4gICAgICAgIHRoaXMuZnJ1c3R1bUN1bGxlZCA9IGZydXN0dW1DdWxsZWQ7XG5cbiAgICAgICAgLy8gT3ZlcnJpZGUgc29ydGluZyB0byBmb3JjZSBhbiBvcmRlclxuICAgICAgICB0aGlzLnJlbmRlck9yZGVyID0gcmVuZGVyT3JkZXI7XG4gICAgICAgIHRoaXMubW9kZWxWaWV3TWF0cml4ID0gbmV3IE1hdDQoKTtcbiAgICAgICAgdGhpcy5ub3JtYWxNYXRyaXggPSBuZXcgTWF0MygpO1xuICAgICAgICB0aGlzLmJlZm9yZVJlbmRlckNhbGxiYWNrcyA9IFtdO1xuICAgICAgICB0aGlzLmFmdGVyUmVuZGVyQ2FsbGJhY2tzID0gW107XG4gICAgfVxuXG4gICAgb25CZWZvcmVSZW5kZXIoZikge1xuICAgICAgICB0aGlzLmJlZm9yZVJlbmRlckNhbGxiYWNrcy5wdXNoKGYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBvbkFmdGVyUmVuZGVyKGYpIHtcbiAgICAgICAgdGhpcy5hZnRlclJlbmRlckNhbGxiYWNrcy5wdXNoKGYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBkcmF3KHsgY2FtZXJhIH0gPSB7fSkge1xuICAgICAgICB0aGlzLmJlZm9yZVJlbmRlckNhbGxiYWNrcy5mb3JFYWNoKChmKSA9PiBmICYmIGYoeyBtZXNoOiB0aGlzLCBjYW1lcmEgfSkpO1xuICAgICAgICBpZiAoY2FtZXJhKSB7XG4gICAgICAgICAgICAvLyBBZGQgZW1wdHkgbWF0cml4IHVuaWZvcm1zIHRvIHByb2dyYW0gaWYgdW5zZXRcbiAgICAgICAgICAgIGlmICghdGhpcy5wcm9ncmFtLnVuaWZvcm1zLm1vZGVsTWF0cml4KSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnByb2dyYW0udW5pZm9ybXMsIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxNYXRyaXg6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgICAgICAgICAgICAgdmlld01hdHJpeDogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbFZpZXdNYXRyaXg6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsTWF0cml4OiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3Rpb25NYXRyaXg6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgICAgICAgICAgICAgY2FtZXJhUG9zaXRpb246IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU2V0IHRoZSBtYXRyaXggdW5pZm9ybXNcbiAgICAgICAgICAgIHRoaXMucHJvZ3JhbS51bmlmb3Jtcy5wcm9qZWN0aW9uTWF0cml4LnZhbHVlID0gY2FtZXJhLnByb2plY3Rpb25NYXRyaXg7XG4gICAgICAgICAgICB0aGlzLnByb2dyYW0udW5pZm9ybXMuY2FtZXJhUG9zaXRpb24udmFsdWUgPSBjYW1lcmEud29ybGRQb3NpdGlvbjtcbiAgICAgICAgICAgIHRoaXMucHJvZ3JhbS51bmlmb3Jtcy52aWV3TWF0cml4LnZhbHVlID0gY2FtZXJhLnZpZXdNYXRyaXg7XG4gICAgICAgICAgICB0aGlzLm1vZGVsVmlld01hdHJpeC5tdWx0aXBseShjYW1lcmEudmlld01hdHJpeCwgdGhpcy53b3JsZE1hdHJpeCk7XG4gICAgICAgICAgICB0aGlzLm5vcm1hbE1hdHJpeC5nZXROb3JtYWxNYXRyaXgodGhpcy5tb2RlbFZpZXdNYXRyaXgpO1xuICAgICAgICAgICAgdGhpcy5wcm9ncmFtLnVuaWZvcm1zLm1vZGVsTWF0cml4LnZhbHVlID0gdGhpcy53b3JsZE1hdHJpeDtcbiAgICAgICAgICAgIHRoaXMucHJvZ3JhbS51bmlmb3Jtcy5tb2RlbFZpZXdNYXRyaXgudmFsdWUgPSB0aGlzLm1vZGVsVmlld01hdHJpeDtcbiAgICAgICAgICAgIHRoaXMucHJvZ3JhbS51bmlmb3Jtcy5ub3JtYWxNYXRyaXgudmFsdWUgPSB0aGlzLm5vcm1hbE1hdHJpeDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRldGVybWluZSBpZiBmYWNlcyBuZWVkIHRvIGJlIGZsaXBwZWQgLSB3aGVuIG1lc2ggc2NhbGVkIG5lZ2F0aXZlbHlcbiAgICAgICAgbGV0IGZsaXBGYWNlcyA9IHRoaXMucHJvZ3JhbS5jdWxsRmFjZSAmJiB0aGlzLndvcmxkTWF0cml4LmRldGVybWluYW50KCkgPCAwO1xuICAgICAgICB0aGlzLnByb2dyYW0udXNlKHsgZmxpcEZhY2VzIH0pO1xuICAgICAgICB0aGlzLmdlb21ldHJ5LmRyYXcoeyBtb2RlOiB0aGlzLm1vZGUsIHByb2dyYW06IHRoaXMucHJvZ3JhbSB9KTtcbiAgICAgICAgdGhpcy5hZnRlclJlbmRlckNhbGxiYWNrcy5mb3JFYWNoKChmKSA9PiBmICYmIGYoeyBtZXNoOiB0aGlzLCBjYW1lcmEgfSkpO1xuICAgIH1cbn1cbiIsIi8vIFRPRE86IHVwbG9hZCBlbXB0eSB0ZXh0dXJlIGlmIG51bGwgPyBtYXliZSBub3Rcbi8vIFRPRE86IHVwbG9hZCBpZGVudGl0eSBtYXRyaXggaWYgbnVsbCA/XG4vLyBUT0RPOiBzYW1wbGVyIEN1YmVcblxubGV0IElEID0gMTtcblxuLy8gY2FjaGUgb2YgdHlwZWQgYXJyYXlzIHVzZWQgdG8gZmxhdHRlbiB1bmlmb3JtIGFycmF5c1xuY29uc3QgYXJyYXlDYWNoZUYzMiA9IHt9O1xuXG5leHBvcnQgY2xhc3MgUHJvZ3JhbSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGdsLFxuICAgICAgICB7XG4gICAgICAgICAgICB2ZXJ0ZXgsXG4gICAgICAgICAgICBmcmFnbWVudCxcbiAgICAgICAgICAgIHVuaWZvcm1zID0ge30sXG5cbiAgICAgICAgICAgIHRyYW5zcGFyZW50ID0gZmFsc2UsXG4gICAgICAgICAgICBjdWxsRmFjZSA9IGdsLkJBQ0ssXG4gICAgICAgICAgICBmcm9udEZhY2UgPSBnbC5DQ1csXG4gICAgICAgICAgICBkZXB0aFRlc3QgPSB0cnVlLFxuICAgICAgICAgICAgZGVwdGhXcml0ZSA9IHRydWUsXG4gICAgICAgICAgICBkZXB0aEZ1bmMgPSBnbC5MRVNTLFxuICAgICAgICB9ID0ge31cbiAgICApIHtcbiAgICAgICAgaWYgKCFnbC5jYW52YXMpIGNvbnNvbGUuZXJyb3IoJ2dsIG5vdCBwYXNzZWQgYXMgZmlzdCBhcmd1bWVudCB0byBQcm9ncmFtJyk7XG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcbiAgICAgICAgdGhpcy51bmlmb3JtcyA9IHVuaWZvcm1zO1xuICAgICAgICB0aGlzLmlkID0gSUQrKztcblxuICAgICAgICBpZiAoIXZlcnRleCkgY29uc29sZS53YXJuKCd2ZXJ0ZXggc2hhZGVyIG5vdCBzdXBwbGllZCcpO1xuICAgICAgICBpZiAoIWZyYWdtZW50KSBjb25zb2xlLndhcm4oJ2ZyYWdtZW50IHNoYWRlciBub3Qgc3VwcGxpZWQnKTtcblxuICAgICAgICAvLyBTdG9yZSBwcm9ncmFtIHN0YXRlXG4gICAgICAgIHRoaXMudHJhbnNwYXJlbnQgPSB0cmFuc3BhcmVudDtcbiAgICAgICAgdGhpcy5jdWxsRmFjZSA9IGN1bGxGYWNlO1xuICAgICAgICB0aGlzLmZyb250RmFjZSA9IGZyb250RmFjZTtcbiAgICAgICAgdGhpcy5kZXB0aFRlc3QgPSBkZXB0aFRlc3Q7XG4gICAgICAgIHRoaXMuZGVwdGhXcml0ZSA9IGRlcHRoV3JpdGU7XG4gICAgICAgIHRoaXMuZGVwdGhGdW5jID0gZGVwdGhGdW5jO1xuICAgICAgICB0aGlzLmJsZW5kRnVuYyA9IHt9O1xuICAgICAgICB0aGlzLmJsZW5kRXF1YXRpb24gPSB7fTtcblxuICAgICAgICAvLyBzZXQgZGVmYXVsdCBibGVuZEZ1bmMgaWYgdHJhbnNwYXJlbnQgZmxhZ2dlZFxuICAgICAgICBpZiAodGhpcy50cmFuc3BhcmVudCAmJiAhdGhpcy5ibGVuZEZ1bmMuc3JjKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5nbC5yZW5kZXJlci5wcmVtdWx0aXBsaWVkQWxwaGEpIHRoaXMuc2V0QmxlbmRGdW5jKHRoaXMuZ2wuT05FLCB0aGlzLmdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuICAgICAgICAgICAgZWxzZSB0aGlzLnNldEJsZW5kRnVuYyh0aGlzLmdsLlNSQ19BTFBIQSwgdGhpcy5nbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbXBpbGUgdmVydGV4IHNoYWRlciBhbmQgbG9nIGVycm9yc1xuICAgICAgICBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XG4gICAgICAgIGdsLnNoYWRlclNvdXJjZSh2ZXJ0ZXhTaGFkZXIsIHZlcnRleCk7XG4gICAgICAgIGdsLmNvbXBpbGVTaGFkZXIodmVydGV4U2hhZGVyKTtcbiAgICAgICAgaWYgKGdsLmdldFNoYWRlckluZm9Mb2codmVydGV4U2hhZGVyKSAhPT0gJycpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtnbC5nZXRTaGFkZXJJbmZvTG9nKHZlcnRleFNoYWRlcil9XFxuVmVydGV4IFNoYWRlclxcbiR7YWRkTGluZU51bWJlcnModmVydGV4KX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbXBpbGUgZnJhZ21lbnQgc2hhZGVyIGFuZCBsb2cgZXJyb3JzXG4gICAgICAgIGNvbnN0IGZyYWdtZW50U2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XG4gICAgICAgIGdsLnNoYWRlclNvdXJjZShmcmFnbWVudFNoYWRlciwgZnJhZ21lbnQpO1xuICAgICAgICBnbC5jb21waWxlU2hhZGVyKGZyYWdtZW50U2hhZGVyKTtcbiAgICAgICAgaWYgKGdsLmdldFNoYWRlckluZm9Mb2coZnJhZ21lbnRTaGFkZXIpICE9PSAnJykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGAke2dsLmdldFNoYWRlckluZm9Mb2coZnJhZ21lbnRTaGFkZXIpfVxcbkZyYWdtZW50IFNoYWRlclxcbiR7YWRkTGluZU51bWJlcnMoZnJhZ21lbnQpfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29tcGlsZSBwcm9ncmFtIGFuZCBsb2cgZXJyb3JzXG4gICAgICAgIHRoaXMucHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgICAgICAgZ2wuYXR0YWNoU2hhZGVyKHRoaXMucHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcbiAgICAgICAgZ2wuYXR0YWNoU2hhZGVyKHRoaXMucHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xuICAgICAgICBnbC5saW5rUHJvZ3JhbSh0aGlzLnByb2dyYW0pO1xuICAgICAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcm9ncmFtLCBnbC5MSU5LX1NUQVRVUykpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLndhcm4oZ2wuZ2V0UHJvZ3JhbUluZm9Mb2codGhpcy5wcm9ncmFtKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW1vdmUgc2hhZGVyIG9uY2UgbGlua2VkXG4gICAgICAgIGdsLmRlbGV0ZVNoYWRlcih2ZXJ0ZXhTaGFkZXIpO1xuICAgICAgICBnbC5kZWxldGVTaGFkZXIoZnJhZ21lbnRTaGFkZXIpO1xuXG4gICAgICAgIC8vIEdldCBhY3RpdmUgdW5pZm9ybSBsb2NhdGlvbnNcbiAgICAgICAgdGhpcy51bmlmb3JtTG9jYXRpb25zID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgbnVtVW5pZm9ybXMgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMucHJvZ3JhbSwgZ2wuQUNUSVZFX1VOSUZPUk1TKTtcbiAgICAgICAgZm9yIChsZXQgdUluZGV4ID0gMDsgdUluZGV4IDwgbnVtVW5pZm9ybXM7IHVJbmRleCsrKSB7XG4gICAgICAgICAgICBsZXQgdW5pZm9ybSA9IGdsLmdldEFjdGl2ZVVuaWZvcm0odGhpcy5wcm9ncmFtLCB1SW5kZXgpO1xuICAgICAgICAgICAgdGhpcy51bmlmb3JtTG9jYXRpb25zLnNldCh1bmlmb3JtLCBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcm9ncmFtLCB1bmlmb3JtLm5hbWUpKTtcblxuICAgICAgICAgICAgLy8gc3BsaXQgdW5pZm9ybXMnIG5hbWVzIHRvIHNlcGFyYXRlIGFycmF5IGFuZCBzdHJ1Y3QgZGVjbGFyYXRpb25zXG4gICAgICAgICAgICBjb25zdCBzcGxpdCA9IHVuaWZvcm0ubmFtZS5tYXRjaCgvKFxcdyspL2cpO1xuXG4gICAgICAgICAgICB1bmlmb3JtLnVuaWZvcm1OYW1lID0gc3BsaXRbMF07XG5cbiAgICAgICAgICAgIGlmIChzcGxpdC5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgICAgICB1bmlmb3JtLmlzU3RydWN0QXJyYXkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHVuaWZvcm0uc3RydWN0SW5kZXggPSBOdW1iZXIoc3BsaXRbMV0pO1xuICAgICAgICAgICAgICAgIHVuaWZvcm0uc3RydWN0UHJvcGVydHkgPSBzcGxpdFsyXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3BsaXQubGVuZ3RoID09PSAyICYmIGlzTmFOKE51bWJlcihzcGxpdFsxXSkpKSB7XG4gICAgICAgICAgICAgICAgdW5pZm9ybS5pc1N0cnVjdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdW5pZm9ybS5zdHJ1Y3RQcm9wZXJ0eSA9IHNwbGl0WzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IGFjdGl2ZSBhdHRyaWJ1dGUgbG9jYXRpb25zXG4gICAgICAgIHRoaXMuYXR0cmlidXRlTG9jYXRpb25zID0gbmV3IE1hcCgpO1xuICAgICAgICBjb25zdCBsb2NhdGlvbnMgPSBbXTtcbiAgICAgICAgY29uc3QgbnVtQXR0cmlicyA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcm9ncmFtLCBnbC5BQ1RJVkVfQVRUUklCVVRFUyk7XG4gICAgICAgIGZvciAobGV0IGFJbmRleCA9IDA7IGFJbmRleCA8IG51bUF0dHJpYnM7IGFJbmRleCsrKSB7XG4gICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBnbC5nZXRBY3RpdmVBdHRyaWIodGhpcy5wcm9ncmFtLCBhSW5kZXgpO1xuICAgICAgICAgICAgY29uc3QgbG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByb2dyYW0sIGF0dHJpYnV0ZS5uYW1lKTtcbiAgICAgICAgICAgIC8vIElnbm9yZSBzcGVjaWFsIGJ1aWx0LWluIGlucHV0cy4gZWcgZ2xfVmVydGV4SUQsIGdsX0luc3RhbmNlSURcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbiA9PT0gLTEpIGNvbnRpbnVlO1xuICAgICAgICAgICAgbG9jYXRpb25zW2xvY2F0aW9uXSA9IGF0dHJpYnV0ZS5uYW1lO1xuICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGVMb2NhdGlvbnMuc2V0KGF0dHJpYnV0ZSwgbG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXR0cmlidXRlT3JkZXIgPSBsb2NhdGlvbnMuam9pbignJyk7XG4gICAgfVxuXG4gICAgc2V0QmxlbmRGdW5jKHNyYywgZHN0LCBzcmNBbHBoYSwgZHN0QWxwaGEpIHtcbiAgICAgICAgdGhpcy5ibGVuZEZ1bmMuc3JjID0gc3JjO1xuICAgICAgICB0aGlzLmJsZW5kRnVuYy5kc3QgPSBkc3Q7XG4gICAgICAgIHRoaXMuYmxlbmRGdW5jLnNyY0FscGhhID0gc3JjQWxwaGE7XG4gICAgICAgIHRoaXMuYmxlbmRGdW5jLmRzdEFscGhhID0gZHN0QWxwaGE7XG4gICAgICAgIGlmIChzcmMpIHRoaXMudHJhbnNwYXJlbnQgPSB0cnVlO1xuICAgIH1cblxuICAgIHNldEJsZW5kRXF1YXRpb24obW9kZVJHQiwgbW9kZUFscGhhKSB7XG4gICAgICAgIHRoaXMuYmxlbmRFcXVhdGlvbi5tb2RlUkdCID0gbW9kZVJHQjtcbiAgICAgICAgdGhpcy5ibGVuZEVxdWF0aW9uLm1vZGVBbHBoYSA9IG1vZGVBbHBoYTtcbiAgICB9XG5cbiAgICBhcHBseVN0YXRlKCkge1xuICAgICAgICBpZiAodGhpcy5kZXB0aFRlc3QpIHRoaXMuZ2wucmVuZGVyZXIuZW5hYmxlKHRoaXMuZ2wuREVQVEhfVEVTVCk7XG4gICAgICAgIGVsc2UgdGhpcy5nbC5yZW5kZXJlci5kaXNhYmxlKHRoaXMuZ2wuREVQVEhfVEVTVCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VsbEZhY2UpIHRoaXMuZ2wucmVuZGVyZXIuZW5hYmxlKHRoaXMuZ2wuQ1VMTF9GQUNFKTtcbiAgICAgICAgZWxzZSB0aGlzLmdsLnJlbmRlcmVyLmRpc2FibGUodGhpcy5nbC5DVUxMX0ZBQ0UpO1xuXG4gICAgICAgIGlmICh0aGlzLmJsZW5kRnVuYy5zcmMpIHRoaXMuZ2wucmVuZGVyZXIuZW5hYmxlKHRoaXMuZ2wuQkxFTkQpO1xuICAgICAgICBlbHNlIHRoaXMuZ2wucmVuZGVyZXIuZGlzYWJsZSh0aGlzLmdsLkJMRU5EKTtcblxuICAgICAgICBpZiAodGhpcy5jdWxsRmFjZSkgdGhpcy5nbC5yZW5kZXJlci5zZXRDdWxsRmFjZSh0aGlzLmN1bGxGYWNlKTtcbiAgICAgICAgdGhpcy5nbC5yZW5kZXJlci5zZXRGcm9udEZhY2UodGhpcy5mcm9udEZhY2UpO1xuICAgICAgICB0aGlzLmdsLnJlbmRlcmVyLnNldERlcHRoTWFzayh0aGlzLmRlcHRoV3JpdGUpO1xuICAgICAgICB0aGlzLmdsLnJlbmRlcmVyLnNldERlcHRoRnVuYyh0aGlzLmRlcHRoRnVuYyk7XG4gICAgICAgIGlmICh0aGlzLmJsZW5kRnVuYy5zcmMpXG4gICAgICAgICAgICB0aGlzLmdsLnJlbmRlcmVyLnNldEJsZW5kRnVuYyh0aGlzLmJsZW5kRnVuYy5zcmMsIHRoaXMuYmxlbmRGdW5jLmRzdCwgdGhpcy5ibGVuZEZ1bmMuc3JjQWxwaGEsIHRoaXMuYmxlbmRGdW5jLmRzdEFscGhhKTtcbiAgICAgICAgdGhpcy5nbC5yZW5kZXJlci5zZXRCbGVuZEVxdWF0aW9uKHRoaXMuYmxlbmRFcXVhdGlvbi5tb2RlUkdCLCB0aGlzLmJsZW5kRXF1YXRpb24ubW9kZUFscGhhKTtcbiAgICB9XG5cbiAgICB1c2UoeyBmbGlwRmFjZXMgPSBmYWxzZSB9ID0ge30pIHtcbiAgICAgICAgbGV0IHRleHR1cmVVbml0ID0gLTE7XG4gICAgICAgIGNvbnN0IHByb2dyYW1BY3RpdmUgPSB0aGlzLmdsLnJlbmRlcmVyLnN0YXRlLmN1cnJlbnRQcm9ncmFtID09PSB0aGlzLmlkO1xuXG4gICAgICAgIC8vIEF2b2lkIGdsIGNhbGwgaWYgcHJvZ3JhbSBhbHJlYWR5IGluIHVzZVxuICAgICAgICBpZiAoIXByb2dyYW1BY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuZ2wudXNlUHJvZ3JhbSh0aGlzLnByb2dyYW0pO1xuICAgICAgICAgICAgdGhpcy5nbC5yZW5kZXJlci5zdGF0ZS5jdXJyZW50UHJvZ3JhbSA9IHRoaXMuaWQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXQgb25seSB0aGUgYWN0aXZlIHVuaWZvcm1zIGZvdW5kIGluIHRoZSBzaGFkZXJcbiAgICAgICAgdGhpcy51bmlmb3JtTG9jYXRpb25zLmZvckVhY2goKGxvY2F0aW9uLCBhY3RpdmVVbmlmb3JtKSA9PiB7XG4gICAgICAgICAgICBsZXQgbmFtZSA9IGFjdGl2ZVVuaWZvcm0udW5pZm9ybU5hbWU7XG5cbiAgICAgICAgICAgIC8vIGdldCBzdXBwbGllZCB1bmlmb3JtXG4gICAgICAgICAgICBsZXQgdW5pZm9ybSA9IHRoaXMudW5pZm9ybXNbbmFtZV07XG5cbiAgICAgICAgICAgIC8vIEZvciBzdHJ1Y3RzLCBnZXQgdGhlIHNwZWNpZmljIHByb3BlcnR5IGluc3RlYWQgb2YgdGhlIGVudGlyZSBvYmplY3RcbiAgICAgICAgICAgIGlmIChhY3RpdmVVbmlmb3JtLmlzU3RydWN0KSB7XG4gICAgICAgICAgICAgICAgdW5pZm9ybSA9IHVuaWZvcm1bYWN0aXZlVW5pZm9ybS5zdHJ1Y3RQcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgbmFtZSArPSBgLiR7YWN0aXZlVW5pZm9ybS5zdHJ1Y3RQcm9wZXJ0eX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFjdGl2ZVVuaWZvcm0uaXNTdHJ1Y3RBcnJheSkge1xuICAgICAgICAgICAgICAgIHVuaWZvcm0gPSB1bmlmb3JtW2FjdGl2ZVVuaWZvcm0uc3RydWN0SW5kZXhdW2FjdGl2ZVVuaWZvcm0uc3RydWN0UHJvcGVydHldO1xuICAgICAgICAgICAgICAgIG5hbWUgKz0gYFske2FjdGl2ZVVuaWZvcm0uc3RydWN0SW5kZXh9XS4ke2FjdGl2ZVVuaWZvcm0uc3RydWN0UHJvcGVydHl9YDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF1bmlmb3JtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdhcm4oYEFjdGl2ZSB1bmlmb3JtICR7bmFtZX0gaGFzIG5vdCBiZWVuIHN1cHBsaWVkYCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh1bmlmb3JtICYmIHVuaWZvcm0udmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3YXJuKGAke25hbWV9IHVuaWZvcm0gaXMgbWlzc2luZyBhIHZhbHVlIHBhcmFtZXRlcmApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodW5pZm9ybS52YWx1ZS50ZXh0dXJlKSB7XG4gICAgICAgICAgICAgICAgdGV4dHVyZVVuaXQgPSB0ZXh0dXJlVW5pdCArIDE7XG5cbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiB0ZXh0dXJlIG5lZWRzIHRvIGJlIHVwZGF0ZWRcbiAgICAgICAgICAgICAgICB1bmlmb3JtLnZhbHVlLnVwZGF0ZSh0ZXh0dXJlVW5pdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldFVuaWZvcm0odGhpcy5nbCwgYWN0aXZlVW5pZm9ybS50eXBlLCBsb2NhdGlvbiwgdGV4dHVyZVVuaXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBGb3IgdGV4dHVyZSBhcnJheXMsIHNldCB1bmlmb3JtIGFzIGFuIGFycmF5IG9mIHRleHR1cmUgdW5pdHMgaW5zdGVhZCBvZiBqdXN0IG9uZVxuICAgICAgICAgICAgaWYgKHVuaWZvcm0udmFsdWUubGVuZ3RoICYmIHVuaWZvcm0udmFsdWVbMF0udGV4dHVyZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRleHR1cmVVbml0cyA9IFtdO1xuICAgICAgICAgICAgICAgIHVuaWZvcm0udmFsdWUuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dHVyZVVuaXQgPSB0ZXh0dXJlVW5pdCArIDE7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLnVwZGF0ZSh0ZXh0dXJlVW5pdCk7XG4gICAgICAgICAgICAgICAgICAgIHRleHR1cmVVbml0cy5wdXNoKHRleHR1cmVVbml0KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBzZXRVbmlmb3JtKHRoaXMuZ2wsIGFjdGl2ZVVuaWZvcm0udHlwZSwgbG9jYXRpb24sIHRleHR1cmVVbml0cyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldFVuaWZvcm0odGhpcy5nbCwgYWN0aXZlVW5pZm9ybS50eXBlLCBsb2NhdGlvbiwgdW5pZm9ybS52YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYXBwbHlTdGF0ZSgpO1xuICAgICAgICBpZiAoZmxpcEZhY2VzKSB0aGlzLmdsLnJlbmRlcmVyLnNldEZyb250RmFjZSh0aGlzLmZyb250RmFjZSA9PT0gdGhpcy5nbC5DQ1cgPyB0aGlzLmdsLkNXIDogdGhpcy5nbC5DQ1cpO1xuICAgIH1cblxuICAgIHJlbW92ZSgpIHtcbiAgICAgICAgdGhpcy5nbC5kZWxldGVQcm9ncmFtKHRoaXMucHJvZ3JhbSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRVbmlmb3JtKGdsLCB0eXBlLCBsb2NhdGlvbiwgdmFsdWUpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLmxlbmd0aCA/IGZsYXR0ZW4odmFsdWUpIDogdmFsdWU7XG4gICAgY29uc3Qgc2V0VmFsdWUgPSBnbC5yZW5kZXJlci5zdGF0ZS51bmlmb3JtTG9jYXRpb25zLmdldChsb2NhdGlvbik7XG5cbiAgICAvLyBBdm9pZCByZWR1bmRhbnQgdW5pZm9ybSBjb21tYW5kc1xuICAgIGlmICh2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHNldFZhbHVlID09PSB1bmRlZmluZWQgfHwgc2V0VmFsdWUubGVuZ3RoICE9PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIGNsb25lIGFycmF5IHRvIHN0b3JlIGFzIGNhY2hlXG4gICAgICAgICAgICBnbC5yZW5kZXJlci5zdGF0ZS51bmlmb3JtTG9jYXRpb25zLnNldChsb2NhdGlvbiwgdmFsdWUuc2xpY2UoMCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGFycmF5c0VxdWFsKHNldFZhbHVlLCB2YWx1ZSkpIHJldHVybjtcblxuICAgICAgICAgICAgLy8gVXBkYXRlIGNhY2hlZCBhcnJheSB2YWx1ZXNcbiAgICAgICAgICAgIHNldFZhbHVlLnNldCA/IHNldFZhbHVlLnNldCh2YWx1ZSkgOiBzZXRBcnJheShzZXRWYWx1ZSwgdmFsdWUpO1xuICAgICAgICAgICAgZ2wucmVuZGVyZXIuc3RhdGUudW5pZm9ybUxvY2F0aW9ucy5zZXQobG9jYXRpb24sIHNldFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzZXRWYWx1ZSA9PT0gdmFsdWUpIHJldHVybjtcbiAgICAgICAgZ2wucmVuZGVyZXIuc3RhdGUudW5pZm9ybUxvY2F0aW9ucy5zZXQobG9jYXRpb24sIHZhbHVlKTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSA1MTI2OlxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA/IGdsLnVuaWZvcm0xZnYobG9jYXRpb24sIHZhbHVlKSA6IGdsLnVuaWZvcm0xZihsb2NhdGlvbiwgdmFsdWUpOyAvLyBGTE9BVFxuICAgICAgICBjYXNlIDM1NjY0OlxuICAgICAgICAgICAgcmV0dXJuIGdsLnVuaWZvcm0yZnYobG9jYXRpb24sIHZhbHVlKTsgLy8gRkxPQVRfVkVDMlxuICAgICAgICBjYXNlIDM1NjY1OlxuICAgICAgICAgICAgcmV0dXJuIGdsLnVuaWZvcm0zZnYobG9jYXRpb24sIHZhbHVlKTsgLy8gRkxPQVRfVkVDM1xuICAgICAgICBjYXNlIDM1NjY2OlxuICAgICAgICAgICAgcmV0dXJuIGdsLnVuaWZvcm00ZnYobG9jYXRpb24sIHZhbHVlKTsgLy8gRkxPQVRfVkVDNFxuICAgICAgICBjYXNlIDM1NjcwOiAvLyBCT09MXG4gICAgICAgIGNhc2UgNTEyNDogLy8gSU5UXG4gICAgICAgIGNhc2UgMzU2Nzg6IC8vIFNBTVBMRVJfMkRcbiAgICAgICAgY2FzZSAzNTY4MDpcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPyBnbC51bmlmb3JtMWl2KGxvY2F0aW9uLCB2YWx1ZSkgOiBnbC51bmlmb3JtMWkobG9jYXRpb24sIHZhbHVlKTsgLy8gU0FNUExFUl9DVUJFXG4gICAgICAgIGNhc2UgMzU2NzE6IC8vIEJPT0xfVkVDMlxuICAgICAgICBjYXNlIDM1NjY3OlxuICAgICAgICAgICAgcmV0dXJuIGdsLnVuaWZvcm0yaXYobG9jYXRpb24sIHZhbHVlKTsgLy8gSU5UX1ZFQzJcbiAgICAgICAgY2FzZSAzNTY3MjogLy8gQk9PTF9WRUMzXG4gICAgICAgIGNhc2UgMzU2Njg6XG4gICAgICAgICAgICByZXR1cm4gZ2wudW5pZm9ybTNpdihsb2NhdGlvbiwgdmFsdWUpOyAvLyBJTlRfVkVDM1xuICAgICAgICBjYXNlIDM1NjczOiAvLyBCT09MX1ZFQzRcbiAgICAgICAgY2FzZSAzNTY2OTpcbiAgICAgICAgICAgIHJldHVybiBnbC51bmlmb3JtNGl2KGxvY2F0aW9uLCB2YWx1ZSk7IC8vIElOVF9WRUM0XG4gICAgICAgIGNhc2UgMzU2NzQ6XG4gICAgICAgICAgICByZXR1cm4gZ2wudW5pZm9ybU1hdHJpeDJmdihsb2NhdGlvbiwgZmFsc2UsIHZhbHVlKTsgLy8gRkxPQVRfTUFUMlxuICAgICAgICBjYXNlIDM1Njc1OlxuICAgICAgICAgICAgcmV0dXJuIGdsLnVuaWZvcm1NYXRyaXgzZnYobG9jYXRpb24sIGZhbHNlLCB2YWx1ZSk7IC8vIEZMT0FUX01BVDNcbiAgICAgICAgY2FzZSAzNTY3NjpcbiAgICAgICAgICAgIHJldHVybiBnbC51bmlmb3JtTWF0cml4NGZ2KGxvY2F0aW9uLCBmYWxzZSwgdmFsdWUpOyAvLyBGTE9BVF9NQVQ0XG4gICAgfVxufVxuXG5mdW5jdGlvbiBhZGRMaW5lTnVtYmVycyhzdHJpbmcpIHtcbiAgICBsZXQgbGluZXMgPSBzdHJpbmcuc3BsaXQoJ1xcbicpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGluZXNbaV0gPSBpICsgMSArICc6ICcgKyBsaW5lc1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGxpbmVzLmpvaW4oJ1xcbicpO1xufVxuXG5mdW5jdGlvbiBmbGF0dGVuKGEpIHtcbiAgICBjb25zdCBhcnJheUxlbiA9IGEubGVuZ3RoO1xuICAgIGNvbnN0IHZhbHVlTGVuID0gYVswXS5sZW5ndGg7XG4gICAgaWYgKHZhbHVlTGVuID09PSB1bmRlZmluZWQpIHJldHVybiBhO1xuICAgIGNvbnN0IGxlbmd0aCA9IGFycmF5TGVuICogdmFsdWVMZW47XG4gICAgbGV0IHZhbHVlID0gYXJyYXlDYWNoZUYzMltsZW5ndGhdO1xuICAgIGlmICghdmFsdWUpIGFycmF5Q2FjaGVGMzJbbGVuZ3RoXSA9IHZhbHVlID0gbmV3IEZsb2F0MzJBcnJheShsZW5ndGgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXlMZW47IGkrKykgdmFsdWUuc2V0KGFbaV0sIGkgKiB2YWx1ZUxlbik7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBhcnJheXNFcXVhbChhLCBiKSB7XG4gICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwLCBsID0gYS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKGFbaV0gIT09IGJbaV0pIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHNldEFycmF5KGEsIGIpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IGEubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGFbaV0gPSBiW2ldO1xuICAgIH1cbn1cblxubGV0IHdhcm5Db3VudCA9IDA7XG5mdW5jdGlvbiB3YXJuKG1lc3NhZ2UpIHtcbiAgICBpZiAod2FybkNvdW50ID4gMTAwKSByZXR1cm47XG4gICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICAgIHdhcm5Db3VudCsrO1xuICAgIGlmICh3YXJuQ291bnQgPiAxMDApIGNvbnNvbGUud2FybignTW9yZSB0aGFuIDEwMCBwcm9ncmFtIHdhcm5pbmdzIC0gc3RvcHBpbmcgbG9ncy4nKTtcbn1cbiIsImltcG9ydCB7IFZlYzMgfSBmcm9tICcuLi9tYXRoL1ZlYzMuanMnO1xuXG4vLyBUT0RPOiBIYW5kbGUgY29udGV4dCBsb3NzIGh0dHBzOi8vd3d3Lmtocm9ub3Mub3JnL3dlYmdsL3dpa2kvSGFuZGxpbmdDb250ZXh0TG9zdFxuXG4vLyBOb3QgYXV0b21hdGljIC0gZGV2cyB0byB1c2UgdGhlc2UgbWV0aG9kcyBtYW51YWxseVxuLy8gZ2wuY29sb3JNYXNrKCBjb2xvck1hc2ssIGNvbG9yTWFzaywgY29sb3JNYXNrLCBjb2xvck1hc2sgKTtcbi8vIGdsLmNsZWFyQ29sb3IoIHIsIGcsIGIsIGEgKTtcbi8vIGdsLnN0ZW5jaWxNYXNrKCBzdGVuY2lsTWFzayApO1xuLy8gZ2wuc3RlbmNpbEZ1bmMoIHN0ZW5jaWxGdW5jLCBzdGVuY2lsUmVmLCBzdGVuY2lsTWFzayApO1xuLy8gZ2wuc3RlbmNpbE9wKCBzdGVuY2lsRmFpbCwgc3RlbmNpbFpGYWlsLCBzdGVuY2lsWlBhc3MgKTtcbi8vIGdsLmNsZWFyU3RlbmNpbCggc3RlbmNpbCApO1xuXG5jb25zdCB0ZW1wVmVjMyA9IG5ldyBWZWMzKCk7XG5sZXQgSUQgPSAxO1xuXG5leHBvcnQgY2xhc3MgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKHtcbiAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyksXG4gICAgICAgIHdpZHRoID0gMzAwLFxuICAgICAgICBoZWlnaHQgPSAxNTAsXG4gICAgICAgIGRwciA9IDEsXG4gICAgICAgIGFscGhhID0gZmFsc2UsXG4gICAgICAgIGRlcHRoID0gdHJ1ZSxcbiAgICAgICAgc3RlbmNpbCA9IGZhbHNlLFxuICAgICAgICBhbnRpYWxpYXMgPSBmYWxzZSxcbiAgICAgICAgcHJlbXVsdGlwbGllZEFscGhhID0gZmFsc2UsXG4gICAgICAgIHByZXNlcnZlRHJhd2luZ0J1ZmZlciA9IGZhbHNlLFxuICAgICAgICBwb3dlclByZWZlcmVuY2UgPSAnZGVmYXVsdCcsXG4gICAgICAgIGF1dG9DbGVhciA9IHRydWUsXG4gICAgICAgIHdlYmdsID0gMixcbiAgICB9ID0ge30pIHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IHsgYWxwaGEsIGRlcHRoLCBzdGVuY2lsLCBhbnRpYWxpYXMsIHByZW11bHRpcGxpZWRBbHBoYSwgcHJlc2VydmVEcmF3aW5nQnVmZmVyLCBwb3dlclByZWZlcmVuY2UgfTtcbiAgICAgICAgdGhpcy5kcHIgPSBkcHI7XG4gICAgICAgIHRoaXMuYWxwaGEgPSBhbHBoYTtcbiAgICAgICAgdGhpcy5jb2xvciA9IHRydWU7XG4gICAgICAgIHRoaXMuZGVwdGggPSBkZXB0aDtcbiAgICAgICAgdGhpcy5zdGVuY2lsID0gc3RlbmNpbDtcbiAgICAgICAgdGhpcy5wcmVtdWx0aXBsaWVkQWxwaGEgPSBwcmVtdWx0aXBsaWVkQWxwaGE7XG4gICAgICAgIHRoaXMuYXV0b0NsZWFyID0gYXV0b0NsZWFyO1xuICAgICAgICB0aGlzLmlkID0gSUQrKztcblxuICAgICAgICAvLyBBdHRlbXB0IFdlYkdMMiB1bmxlc3MgZm9yY2VkIHRvIDEsIGlmIG5vdCBzdXBwb3J0ZWQgZmFsbGJhY2sgdG8gV2ViR0wxXG4gICAgICAgIGlmICh3ZWJnbCA9PT0gMikgdGhpcy5nbCA9IGNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbDInLCBhdHRyaWJ1dGVzKTtcbiAgICAgICAgdGhpcy5pc1dlYmdsMiA9ICEhdGhpcy5nbDtcbiAgICAgICAgaWYgKCF0aGlzLmdsKSB0aGlzLmdsID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJywgYXR0cmlidXRlcyk7XG4gICAgICAgIGlmICghdGhpcy5nbCkgY29uc29sZS5lcnJvcigndW5hYmxlIHRvIGNyZWF0ZSB3ZWJnbCBjb250ZXh0Jyk7XG5cbiAgICAgICAgLy8gQXR0YWNoIHJlbmRlcmVyIHRvIGdsIHNvIHRoYXQgYWxsIGNsYXNzZXMgaGF2ZSBhY2Nlc3MgdG8gaW50ZXJuYWwgc3RhdGUgZnVuY3Rpb25zXG4gICAgICAgIHRoaXMuZ2wucmVuZGVyZXIgPSB0aGlzO1xuXG4gICAgICAgIC8vIGluaXRpYWxpc2Ugc2l6ZSB2YWx1ZXNcbiAgICAgICAgdGhpcy5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgIC8vIGdsIHN0YXRlIHN0b3JlcyB0byBhdm9pZCByZWR1bmRhbnQgY2FsbHMgb24gbWV0aG9kcyB1c2VkIGludGVybmFsbHlcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgICAgICB0aGlzLnN0YXRlLmJsZW5kRnVuYyA9IHsgc3JjOiB0aGlzLmdsLk9ORSwgZHN0OiB0aGlzLmdsLlpFUk8gfTtcbiAgICAgICAgdGhpcy5zdGF0ZS5ibGVuZEVxdWF0aW9uID0geyBtb2RlUkdCOiB0aGlzLmdsLkZVTkNfQUREIH07XG4gICAgICAgIHRoaXMuc3RhdGUuY3VsbEZhY2UgPSBudWxsO1xuICAgICAgICB0aGlzLnN0YXRlLmZyb250RmFjZSA9IHRoaXMuZ2wuQ0NXO1xuICAgICAgICB0aGlzLnN0YXRlLmRlcHRoTWFzayA9IHRydWU7XG4gICAgICAgIHRoaXMuc3RhdGUuZGVwdGhGdW5jID0gdGhpcy5nbC5MRVNTO1xuICAgICAgICB0aGlzLnN0YXRlLnByZW11bHRpcGx5QWxwaGEgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGF0ZS5mbGlwWSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YXRlLnVucGFja0FsaWdubWVudCA9IDQ7XG4gICAgICAgIHRoaXMuc3RhdGUuZnJhbWVidWZmZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnN0YXRlLnZpZXdwb3J0ID0geyB4OiAwLCB5OiAwLCB3aWR0aDogbnVsbCwgaGVpZ2h0OiBudWxsIH07XG4gICAgICAgIHRoaXMuc3RhdGUudGV4dHVyZVVuaXRzID0gW107XG4gICAgICAgIHRoaXMuc3RhdGUuYWN0aXZlVGV4dHVyZVVuaXQgPSAwO1xuICAgICAgICB0aGlzLnN0YXRlLmJvdW5kQnVmZmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdGF0ZS51bmlmb3JtTG9jYXRpb25zID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnN0YXRlLmN1cnJlbnRQcm9ncmFtID0gbnVsbDtcblxuICAgICAgICAvLyBzdG9yZSByZXF1ZXN0ZWQgZXh0ZW5zaW9uc1xuICAgICAgICB0aGlzLmV4dGVuc2lvbnMgPSB7fTtcblxuICAgICAgICAvLyBJbml0aWFsaXNlIGV4dHJhIGZvcm1hdCB0eXBlc1xuICAgICAgICBpZiAodGhpcy5pc1dlYmdsMikge1xuICAgICAgICAgICAgdGhpcy5nZXRFeHRlbnNpb24oJ0VYVF9jb2xvcl9idWZmZXJfZmxvYXQnKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0RXh0ZW5zaW9uKCdPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXInKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0RXh0ZW5zaW9uKCdPRVNfdGV4dHVyZV9mbG9hdCcpO1xuICAgICAgICAgICAgdGhpcy5nZXRFeHRlbnNpb24oJ09FU190ZXh0dXJlX2Zsb2F0X2xpbmVhcicpO1xuICAgICAgICAgICAgdGhpcy5nZXRFeHRlbnNpb24oJ09FU190ZXh0dXJlX2hhbGZfZmxvYXQnKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0RXh0ZW5zaW9uKCdPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0X2xpbmVhcicpO1xuICAgICAgICAgICAgdGhpcy5nZXRFeHRlbnNpb24oJ09FU19lbGVtZW50X2luZGV4X3VpbnQnKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0RXh0ZW5zaW9uKCdPRVNfc3RhbmRhcmRfZGVyaXZhdGl2ZXMnKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0RXh0ZW5zaW9uKCdFWFRfc1JHQicpO1xuICAgICAgICAgICAgdGhpcy5nZXRFeHRlbnNpb24oJ1dFQkdMX2RlcHRoX3RleHR1cmUnKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0RXh0ZW5zaW9uKCdXRUJHTF9kcmF3X2J1ZmZlcnMnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldEV4dGVuc2lvbignV0VCR0xfY29tcHJlc3NlZF90ZXh0dXJlX2FzdGMnKTtcbiAgICAgICAgdGhpcy5nZXRFeHRlbnNpb24oJ0VYVF90ZXh0dXJlX2NvbXByZXNzaW9uX2JwdGMnKTtcbiAgICAgICAgdGhpcy5nZXRFeHRlbnNpb24oJ1dFQkdMX2NvbXByZXNzZWRfdGV4dHVyZV9zM3RjJyk7XG4gICAgICAgIHRoaXMuZ2V0RXh0ZW5zaW9uKCdXRUJHTF9jb21wcmVzc2VkX3RleHR1cmVfZXRjMScpO1xuICAgICAgICB0aGlzLmdldEV4dGVuc2lvbignV0VCR0xfY29tcHJlc3NlZF90ZXh0dXJlX3B2cnRjJyk7XG4gICAgICAgIHRoaXMuZ2V0RXh0ZW5zaW9uKCdXRUJLSVRfV0VCR0xfY29tcHJlc3NlZF90ZXh0dXJlX3B2cnRjJyk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIG1ldGhvZCBhbGlhc2VzIHVzaW5nIGV4dGVuc2lvbiAoV2ViR0wxKSBvciBuYXRpdmUgaWYgYXZhaWxhYmxlIChXZWJHTDIpXG4gICAgICAgIHRoaXMudmVydGV4QXR0cmliRGl2aXNvciA9IHRoaXMuZ2V0RXh0ZW5zaW9uKCdBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJywgJ3ZlcnRleEF0dHJpYkRpdmlzb3InLCAndmVydGV4QXR0cmliRGl2aXNvckFOR0xFJyk7XG4gICAgICAgIHRoaXMuZHJhd0FycmF5c0luc3RhbmNlZCA9IHRoaXMuZ2V0RXh0ZW5zaW9uKCdBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJywgJ2RyYXdBcnJheXNJbnN0YW5jZWQnLCAnZHJhd0FycmF5c0luc3RhbmNlZEFOR0xFJyk7XG4gICAgICAgIHRoaXMuZHJhd0VsZW1lbnRzSW5zdGFuY2VkID0gdGhpcy5nZXRFeHRlbnNpb24oJ0FOR0xFX2luc3RhbmNlZF9hcnJheXMnLCAnZHJhd0VsZW1lbnRzSW5zdGFuY2VkJywgJ2RyYXdFbGVtZW50c0luc3RhbmNlZEFOR0xFJyk7XG4gICAgICAgIHRoaXMuY3JlYXRlVmVydGV4QXJyYXkgPSB0aGlzLmdldEV4dGVuc2lvbignT0VTX3ZlcnRleF9hcnJheV9vYmplY3QnLCAnY3JlYXRlVmVydGV4QXJyYXknLCAnY3JlYXRlVmVydGV4QXJyYXlPRVMnKTtcbiAgICAgICAgdGhpcy5iaW5kVmVydGV4QXJyYXkgPSB0aGlzLmdldEV4dGVuc2lvbignT0VTX3ZlcnRleF9hcnJheV9vYmplY3QnLCAnYmluZFZlcnRleEFycmF5JywgJ2JpbmRWZXJ0ZXhBcnJheU9FUycpO1xuICAgICAgICB0aGlzLmRlbGV0ZVZlcnRleEFycmF5ID0gdGhpcy5nZXRFeHRlbnNpb24oJ09FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0JywgJ2RlbGV0ZVZlcnRleEFycmF5JywgJ2RlbGV0ZVZlcnRleEFycmF5T0VTJyk7XG4gICAgICAgIHRoaXMuZHJhd0J1ZmZlcnMgPSB0aGlzLmdldEV4dGVuc2lvbignV0VCR0xfZHJhd19idWZmZXJzJywgJ2RyYXdCdWZmZXJzJywgJ2RyYXdCdWZmZXJzV0VCR0wnKTtcblxuICAgICAgICAvLyBTdG9yZSBkZXZpY2UgcGFyYW1ldGVyc1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMgPSB7fTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLm1heFRleHR1cmVVbml0cyA9IHRoaXMuZ2wuZ2V0UGFyYW1ldGVyKHRoaXMuZ2wuTUFYX0NPTUJJTkVEX1RFWFRVUkVfSU1BR0VfVU5JVFMpO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMubWF4QW5pc290cm9weSA9IHRoaXMuZ2V0RXh0ZW5zaW9uKCdFWFRfdGV4dHVyZV9maWx0ZXJfYW5pc290cm9waWMnKVxuICAgICAgICAgICAgPyB0aGlzLmdsLmdldFBhcmFtZXRlcih0aGlzLmdldEV4dGVuc2lvbignRVhUX3RleHR1cmVfZmlsdGVyX2FuaXNvdHJvcGljJykuTUFYX1RFWFRVUkVfTUFYX0FOSVNPVFJPUFlfRVhUKVxuICAgICAgICAgICAgOiAwO1xuICAgIH1cblxuICAgIHNldFNpemUod2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuZ2wuY2FudmFzLndpZHRoID0gd2lkdGggKiB0aGlzLmRwcjtcbiAgICAgICAgdGhpcy5nbC5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0ICogdGhpcy5kcHI7XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmdsLmNhbnZhcy5zdHlsZSwge1xuICAgICAgICAgICAgd2lkdGg6IHdpZHRoICsgJ3B4JyxcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0ICsgJ3B4JyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0Vmlld3BvcnQod2lkdGgsIGhlaWdodCwgeCA9IDAsIHkgPSAwKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnZpZXdwb3J0LndpZHRoID09PSB3aWR0aCAmJiB0aGlzLnN0YXRlLnZpZXdwb3J0LmhlaWdodCA9PT0gaGVpZ2h0KSByZXR1cm47XG4gICAgICAgIHRoaXMuc3RhdGUudmlld3BvcnQud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5zdGF0ZS52aWV3cG9ydC5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuc3RhdGUudmlld3BvcnQueCA9IHg7XG4gICAgICAgIHRoaXMuc3RhdGUudmlld3BvcnQueSA9IHk7XG4gICAgICAgIHRoaXMuZ2wudmlld3BvcnQoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuXG4gICAgc2V0U2Npc3Nvcih3aWR0aCwgaGVpZ2h0LCB4ID0gMCwgeSA9IDApIHtcbiAgICAgICAgdGhpcy5nbC5zY2lzc29yKHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cblxuICAgIGVuYWJsZShpZCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZVtpZF0gPT09IHRydWUpIHJldHVybjtcbiAgICAgICAgdGhpcy5nbC5lbmFibGUoaWQpO1xuICAgICAgICB0aGlzLnN0YXRlW2lkXSA9IHRydWU7XG4gICAgfVxuXG4gICAgZGlzYWJsZShpZCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZVtpZF0gPT09IGZhbHNlKSByZXR1cm47XG4gICAgICAgIHRoaXMuZ2wuZGlzYWJsZShpZCk7XG4gICAgICAgIHRoaXMuc3RhdGVbaWRdID0gZmFsc2U7XG4gICAgfVxuXG4gICAgc2V0QmxlbmRGdW5jKHNyYywgZHN0LCBzcmNBbHBoYSwgZHN0QWxwaGEpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5ibGVuZEZ1bmMuc3JjID09PSBzcmMgJiZcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuYmxlbmRGdW5jLmRzdCA9PT0gZHN0ICYmXG4gICAgICAgICAgICB0aGlzLnN0YXRlLmJsZW5kRnVuYy5zcmNBbHBoYSA9PT0gc3JjQWxwaGEgJiZcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuYmxlbmRGdW5jLmRzdEFscGhhID09PSBkc3RBbHBoYVxuICAgICAgICApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuc3RhdGUuYmxlbmRGdW5jLnNyYyA9IHNyYztcbiAgICAgICAgdGhpcy5zdGF0ZS5ibGVuZEZ1bmMuZHN0ID0gZHN0O1xuICAgICAgICB0aGlzLnN0YXRlLmJsZW5kRnVuYy5zcmNBbHBoYSA9IHNyY0FscGhhO1xuICAgICAgICB0aGlzLnN0YXRlLmJsZW5kRnVuYy5kc3RBbHBoYSA9IGRzdEFscGhhO1xuICAgICAgICBpZiAoc3JjQWxwaGEgIT09IHVuZGVmaW5lZCkgdGhpcy5nbC5ibGVuZEZ1bmNTZXBhcmF0ZShzcmMsIGRzdCwgc3JjQWxwaGEsIGRzdEFscGhhKTtcbiAgICAgICAgZWxzZSB0aGlzLmdsLmJsZW5kRnVuYyhzcmMsIGRzdCk7XG4gICAgfVxuXG4gICAgc2V0QmxlbmRFcXVhdGlvbihtb2RlUkdCLCBtb2RlQWxwaGEpIHtcbiAgICAgICAgbW9kZVJHQiA9IG1vZGVSR0IgfHwgdGhpcy5nbC5GVU5DX0FERDtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYmxlbmRFcXVhdGlvbi5tb2RlUkdCID09PSBtb2RlUkdCICYmIHRoaXMuc3RhdGUuYmxlbmRFcXVhdGlvbi5tb2RlQWxwaGEgPT09IG1vZGVBbHBoYSkgcmV0dXJuO1xuICAgICAgICB0aGlzLnN0YXRlLmJsZW5kRXF1YXRpb24ubW9kZVJHQiA9IG1vZGVSR0I7XG4gICAgICAgIHRoaXMuc3RhdGUuYmxlbmRFcXVhdGlvbi5tb2RlQWxwaGEgPSBtb2RlQWxwaGE7XG4gICAgICAgIGlmIChtb2RlQWxwaGEgIT09IHVuZGVmaW5lZCkgdGhpcy5nbC5ibGVuZEVxdWF0aW9uU2VwYXJhdGUobW9kZVJHQiwgbW9kZUFscGhhKTtcbiAgICAgICAgZWxzZSB0aGlzLmdsLmJsZW5kRXF1YXRpb24obW9kZVJHQik7XG4gICAgfVxuXG4gICAgc2V0Q3VsbEZhY2UodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY3VsbEZhY2UgPT09IHZhbHVlKSByZXR1cm47XG4gICAgICAgIHRoaXMuc3RhdGUuY3VsbEZhY2UgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5nbC5jdWxsRmFjZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgc2V0RnJvbnRGYWNlKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZyb250RmFjZSA9PT0gdmFsdWUpIHJldHVybjtcbiAgICAgICAgdGhpcy5zdGF0ZS5mcm9udEZhY2UgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5nbC5mcm9udEZhY2UodmFsdWUpO1xuICAgIH1cblxuICAgIHNldERlcHRoTWFzayh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5kZXB0aE1hc2sgPT09IHZhbHVlKSByZXR1cm47XG4gICAgICAgIHRoaXMuc3RhdGUuZGVwdGhNYXNrID0gdmFsdWU7XG4gICAgICAgIHRoaXMuZ2wuZGVwdGhNYXNrKHZhbHVlKTtcbiAgICB9XG5cbiAgICBzZXREZXB0aEZ1bmModmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGVwdGhGdW5jID09PSB2YWx1ZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLnN0YXRlLmRlcHRoRnVuYyA9IHZhbHVlO1xuICAgICAgICB0aGlzLmdsLmRlcHRoRnVuYyh2YWx1ZSk7XG4gICAgfVxuXG4gICAgYWN0aXZlVGV4dHVyZSh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVUZXh0dXJlVW5pdCA9PT0gdmFsdWUpIHJldHVybjtcbiAgICAgICAgdGhpcy5zdGF0ZS5hY3RpdmVUZXh0dXJlVW5pdCA9IHZhbHVlO1xuICAgICAgICB0aGlzLmdsLmFjdGl2ZVRleHR1cmUodGhpcy5nbC5URVhUVVJFMCArIHZhbHVlKTtcbiAgICB9XG5cbiAgICBiaW5kRnJhbWVidWZmZXIoeyB0YXJnZXQgPSB0aGlzLmdsLkZSQU1FQlVGRkVSLCBidWZmZXIgPSBudWxsIH0gPSB7fSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5mcmFtZWJ1ZmZlciA9PT0gYnVmZmVyKSByZXR1cm47XG4gICAgICAgIHRoaXMuc3RhdGUuZnJhbWVidWZmZXIgPSBidWZmZXI7XG4gICAgICAgIHRoaXMuZ2wuYmluZEZyYW1lYnVmZmVyKHRhcmdldCwgYnVmZmVyKTtcbiAgICB9XG5cbiAgICBnZXRFeHRlbnNpb24oZXh0ZW5zaW9uLCB3ZWJnbDJGdW5jLCBleHRGdW5jKSB7XG4gICAgICAgIC8vIGlmIHdlYmdsMiBmdW5jdGlvbiBzdXBwb3J0ZWQsIHJldHVybiBmdW5jIGJvdW5kIHRvIGdsIGNvbnRleHRcbiAgICAgICAgaWYgKHdlYmdsMkZ1bmMgJiYgdGhpcy5nbFt3ZWJnbDJGdW5jXSkgcmV0dXJuIHRoaXMuZ2xbd2ViZ2wyRnVuY10uYmluZCh0aGlzLmdsKTtcblxuICAgICAgICAvLyBmZXRjaCBleHRlbnNpb24gb25jZSBvbmx5XG4gICAgICAgIGlmICghdGhpcy5leHRlbnNpb25zW2V4dGVuc2lvbl0pIHtcbiAgICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uc1tleHRlbnNpb25dID0gdGhpcy5nbC5nZXRFeHRlbnNpb24oZXh0ZW5zaW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJldHVybiBleHRlbnNpb24gaWYgbm8gZnVuY3Rpb24gcmVxdWVzdGVkXG4gICAgICAgIGlmICghd2ViZ2wyRnVuYykgcmV0dXJuIHRoaXMuZXh0ZW5zaW9uc1tleHRlbnNpb25dO1xuXG4gICAgICAgIC8vIFJldHVybiBudWxsIGlmIGV4dGVuc2lvbiBub3Qgc3VwcG9ydGVkXG4gICAgICAgIGlmICghdGhpcy5leHRlbnNpb25zW2V4dGVuc2lvbl0pIHJldHVybiBudWxsO1xuXG4gICAgICAgIC8vIHJldHVybiBleHRlbnNpb24gZnVuY3Rpb24sIGJvdW5kIHRvIGV4dGVuc2lvblxuICAgICAgICByZXR1cm4gdGhpcy5leHRlbnNpb25zW2V4dGVuc2lvbl1bZXh0RnVuY10uYmluZCh0aGlzLmV4dGVuc2lvbnNbZXh0ZW5zaW9uXSk7XG4gICAgfVxuXG4gICAgc29ydE9wYXF1ZShhLCBiKSB7XG4gICAgICAgIGlmIChhLnJlbmRlck9yZGVyICE9PSBiLnJlbmRlck9yZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gYS5yZW5kZXJPcmRlciAtIGIucmVuZGVyT3JkZXI7XG4gICAgICAgIH0gZWxzZSBpZiAoYS5wcm9ncmFtLmlkICE9PSBiLnByb2dyYW0uaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBhLnByb2dyYW0uaWQgLSBiLnByb2dyYW0uaWQ7XG4gICAgICAgIH0gZWxzZSBpZiAoYS56RGVwdGggIT09IGIuekRlcHRoKSB7XG4gICAgICAgICAgICByZXR1cm4gYS56RGVwdGggLSBiLnpEZXB0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBiLmlkIC0gYS5pZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNvcnRUcmFuc3BhcmVudChhLCBiKSB7XG4gICAgICAgIGlmIChhLnJlbmRlck9yZGVyICE9PSBiLnJlbmRlck9yZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gYS5yZW5kZXJPcmRlciAtIGIucmVuZGVyT3JkZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGEuekRlcHRoICE9PSBiLnpEZXB0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGIuekRlcHRoIC0gYS56RGVwdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYi5pZCAtIGEuaWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzb3J0VUkoYSwgYikge1xuICAgICAgICBpZiAoYS5yZW5kZXJPcmRlciAhPT0gYi5yZW5kZXJPcmRlcikge1xuICAgICAgICAgICAgcmV0dXJuIGEucmVuZGVyT3JkZXIgLSBiLnJlbmRlck9yZGVyO1xuICAgICAgICB9IGVsc2UgaWYgKGEucHJvZ3JhbS5pZCAhPT0gYi5wcm9ncmFtLmlkKSB7XG4gICAgICAgICAgICByZXR1cm4gYS5wcm9ncmFtLmlkIC0gYi5wcm9ncmFtLmlkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGIuaWQgLSBhLmlkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UmVuZGVyTGlzdCh7IHNjZW5lLCBjYW1lcmEsIGZydXN0dW1DdWxsLCBzb3J0IH0pIHtcbiAgICAgICAgbGV0IHJlbmRlckxpc3QgPSBbXTtcblxuICAgICAgICBpZiAoY2FtZXJhICYmIGZydXN0dW1DdWxsKSBjYW1lcmEudXBkYXRlRnJ1c3R1bSgpO1xuXG4gICAgICAgIC8vIEdldCB2aXNpYmxlXG4gICAgICAgIHNjZW5lLnRyYXZlcnNlKChub2RlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIW5vZGUudmlzaWJsZSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBpZiAoIW5vZGUuZHJhdykgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAoZnJ1c3R1bUN1bGwgJiYgbm9kZS5mcnVzdHVtQ3VsbGVkICYmIGNhbWVyYSkge1xuICAgICAgICAgICAgICAgIGlmICghY2FtZXJhLmZydXN0dW1JbnRlcnNlY3RzTWVzaChub2RlKSkgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZW5kZXJMaXN0LnB1c2gobm9kZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzb3J0KSB7XG4gICAgICAgICAgICBjb25zdCBvcGFxdWUgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zcGFyZW50ID0gW107IC8vIGRlcHRoVGVzdCB0cnVlXG4gICAgICAgICAgICBjb25zdCB1aSA9IFtdOyAvLyBkZXB0aFRlc3QgZmFsc2VcblxuICAgICAgICAgICAgcmVuZGVyTGlzdC5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gU3BsaXQgaW50byB0aGUgMyByZW5kZXIgZ3JvdXBzXG4gICAgICAgICAgICAgICAgaWYgKCFub2RlLnByb2dyYW0udHJhbnNwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3BhcXVlLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLnByb2dyYW0uZGVwdGhUZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcGFyZW50LnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdWkucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBub2RlLnpEZXB0aCA9IDA7XG5cbiAgICAgICAgICAgICAgICAvLyBPbmx5IGNhbGN1bGF0ZSB6LWRlcHRoIGlmIHJlbmRlck9yZGVyIHVuc2V0IGFuZCBkZXB0aFRlc3QgaXMgdHJ1ZVxuICAgICAgICAgICAgICAgIGlmIChub2RlLnJlbmRlck9yZGVyICE9PSAwIHx8ICFub2RlLnByb2dyYW0uZGVwdGhUZXN0IHx8ICFjYW1lcmEpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSB6LWRlcHRoXG4gICAgICAgICAgICAgICAgbm9kZS53b3JsZE1hdHJpeC5nZXRUcmFuc2xhdGlvbih0ZW1wVmVjMyk7XG4gICAgICAgICAgICAgICAgdGVtcFZlYzMuYXBwbHlNYXRyaXg0KGNhbWVyYS5wcm9qZWN0aW9uVmlld01hdHJpeCk7XG4gICAgICAgICAgICAgICAgbm9kZS56RGVwdGggPSB0ZW1wVmVjMy56O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG9wYXF1ZS5zb3J0KHRoaXMuc29ydE9wYXF1ZSk7XG4gICAgICAgICAgICB0cmFuc3BhcmVudC5zb3J0KHRoaXMuc29ydFRyYW5zcGFyZW50KTtcbiAgICAgICAgICAgIHVpLnNvcnQodGhpcy5zb3J0VUkpO1xuXG4gICAgICAgICAgICByZW5kZXJMaXN0ID0gb3BhcXVlLmNvbmNhdCh0cmFuc3BhcmVudCwgdWkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlbmRlckxpc3Q7XG4gICAgfVxuXG4gICAgcmVuZGVyKHsgc2NlbmUsIGNhbWVyYSwgdGFyZ2V0ID0gbnVsbCwgdXBkYXRlID0gdHJ1ZSwgc29ydCA9IHRydWUsIGZydXN0dW1DdWxsID0gdHJ1ZSwgY2xlYXIgfSkge1xuICAgICAgICBpZiAodGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgbm8gcmVuZGVyIHRhcmdldCBib3VuZCBzbyBkcmF3cyB0byBjYW52YXNcbiAgICAgICAgICAgIHRoaXMuYmluZEZyYW1lYnVmZmVyKCk7XG4gICAgICAgICAgICB0aGlzLnNldFZpZXdwb3J0KHRoaXMud2lkdGggKiB0aGlzLmRwciwgdGhpcy5oZWlnaHQgKiB0aGlzLmRwcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBiaW5kIHN1cHBsaWVkIHJlbmRlciB0YXJnZXQgYW5kIHVwZGF0ZSB2aWV3cG9ydFxuICAgICAgICAgICAgdGhpcy5iaW5kRnJhbWVidWZmZXIodGFyZ2V0KTtcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld3BvcnQodGFyZ2V0LndpZHRoLCB0YXJnZXQuaGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjbGVhciB8fCAodGhpcy5hdXRvQ2xlYXIgJiYgY2xlYXIgIT09IGZhbHNlKSkge1xuICAgICAgICAgICAgLy8gRW5zdXJlIGRlcHRoIGJ1ZmZlciB3cml0aW5nIGlzIGVuYWJsZWQgc28gaXQgY2FuIGJlIGNsZWFyZWRcbiAgICAgICAgICAgIGlmICh0aGlzLmRlcHRoICYmICghdGFyZ2V0IHx8IHRhcmdldC5kZXB0aCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZSh0aGlzLmdsLkRFUFRIX1RFU1QpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGVwdGhNYXNrKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5nbC5jbGVhcihcbiAgICAgICAgICAgICAgICAodGhpcy5jb2xvciA/IHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCA6IDApIHxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuZGVwdGggPyB0aGlzLmdsLkRFUFRIX0JVRkZFUl9CSVQgOiAwKSB8XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnN0ZW5jaWwgPyB0aGlzLmdsLlNURU5DSUxfQlVGRkVSX0JJVCA6IDApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlcyBhbGwgc2NlbmUgZ3JhcGggbWF0cmljZXNcbiAgICAgICAgaWYgKHVwZGF0ZSkgc2NlbmUudXBkYXRlTWF0cml4V29ybGQoKTtcblxuICAgICAgICAvLyBVcGRhdGUgY2FtZXJhIHNlcGFyYXRlbHksIGluIGNhc2Ugbm90IGluIHNjZW5lIGdyYXBoXG4gICAgICAgIGlmIChjYW1lcmEpIGNhbWVyYS51cGRhdGVNYXRyaXhXb3JsZCgpO1xuXG4gICAgICAgIC8vIEdldCByZW5kZXIgbGlzdCAtIGVudGFpbHMgY3VsbGluZyBhbmQgc29ydGluZ1xuICAgICAgICBjb25zdCByZW5kZXJMaXN0ID0gdGhpcy5nZXRSZW5kZXJMaXN0KHsgc2NlbmUsIGNhbWVyYSwgZnJ1c3R1bUN1bGwsIHNvcnQgfSk7XG5cbiAgICAgICAgcmVuZGVyTGlzdC5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBub2RlLmRyYXcoeyBjYW1lcmEgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8vIFRPRE86IGRlbGV0ZSB0ZXh0dXJlXG4vLyBUT0RPOiB1c2UgdGV4U3ViSW1hZ2UyRCBmb3IgdXBkYXRlcyAodmlkZW8gb3Igd2hlbiBsb2FkZWQpXG4vLyBUT0RPOiBuZWVkPyBlbmNvZGluZyA9IGxpbmVhckVuY29kaW5nXG4vLyBUT0RPOiBzdXBwb3J0IG5vbi1jb21wcmVzc2VkIG1pcG1hcHMgdXBsb2Fkc1xuXG5jb25zdCBlbXB0eVBpeGVsID0gbmV3IFVpbnQ4QXJyYXkoNCk7XG5cbmZ1bmN0aW9uIGlzUG93ZXJPZjIodmFsdWUpIHtcbiAgICByZXR1cm4gKHZhbHVlICYgKHZhbHVlIC0gMSkpID09PSAwO1xufVxuXG5sZXQgSUQgPSAxO1xuXG5leHBvcnQgY2xhc3MgVGV4dHVyZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGdsLFxuICAgICAgICB7XG4gICAgICAgICAgICBpbWFnZSxcbiAgICAgICAgICAgIHRhcmdldCA9IGdsLlRFWFRVUkVfMkQsXG4gICAgICAgICAgICB0eXBlID0gZ2wuVU5TSUdORURfQllURSxcbiAgICAgICAgICAgIGZvcm1hdCA9IGdsLlJHQkEsXG4gICAgICAgICAgICBpbnRlcm5hbEZvcm1hdCA9IGZvcm1hdCxcbiAgICAgICAgICAgIHdyYXBTID0gZ2wuQ0xBTVBfVE9fRURHRSxcbiAgICAgICAgICAgIHdyYXBUID0gZ2wuQ0xBTVBfVE9fRURHRSxcbiAgICAgICAgICAgIGdlbmVyYXRlTWlwbWFwcyA9IHRydWUsXG4gICAgICAgICAgICBtaW5GaWx0ZXIgPSBnZW5lcmF0ZU1pcG1hcHMgPyBnbC5ORUFSRVNUX01JUE1BUF9MSU5FQVIgOiBnbC5MSU5FQVIsXG4gICAgICAgICAgICBtYWdGaWx0ZXIgPSBnbC5MSU5FQVIsXG4gICAgICAgICAgICBwcmVtdWx0aXBseUFscGhhID0gZmFsc2UsXG4gICAgICAgICAgICB1bnBhY2tBbGlnbm1lbnQgPSA0LFxuICAgICAgICAgICAgZmxpcFkgPSB0YXJnZXQgPT0gZ2wuVEVYVFVSRV8yRCA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgIGFuaXNvdHJvcHkgPSAwLFxuICAgICAgICAgICAgbGV2ZWwgPSAwLFxuICAgICAgICAgICAgd2lkdGgsIC8vIHVzZWQgZm9yIFJlbmRlclRhcmdldHMgb3IgRGF0YSBUZXh0dXJlc1xuICAgICAgICAgICAgaGVpZ2h0ID0gd2lkdGgsXG4gICAgICAgIH0gPSB7fVxuICAgICkge1xuICAgICAgICB0aGlzLmdsID0gZ2w7XG4gICAgICAgIHRoaXMuaWQgPSBJRCsrO1xuXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuZm9ybWF0ID0gZm9ybWF0O1xuICAgICAgICB0aGlzLmludGVybmFsRm9ybWF0ID0gaW50ZXJuYWxGb3JtYXQ7XG4gICAgICAgIHRoaXMubWluRmlsdGVyID0gbWluRmlsdGVyO1xuICAgICAgICB0aGlzLm1hZ0ZpbHRlciA9IG1hZ0ZpbHRlcjtcbiAgICAgICAgdGhpcy53cmFwUyA9IHdyYXBTO1xuICAgICAgICB0aGlzLndyYXBUID0gd3JhcFQ7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVNaXBtYXBzID0gZ2VuZXJhdGVNaXBtYXBzO1xuICAgICAgICB0aGlzLnByZW11bHRpcGx5QWxwaGEgPSBwcmVtdWx0aXBseUFscGhhO1xuICAgICAgICB0aGlzLnVucGFja0FsaWdubWVudCA9IHVucGFja0FsaWdubWVudDtcbiAgICAgICAgdGhpcy5mbGlwWSA9IGZsaXBZO1xuICAgICAgICB0aGlzLmFuaXNvdHJvcHkgPSBNYXRoLm1pbihhbmlzb3Ryb3B5LCB0aGlzLmdsLnJlbmRlcmVyLnBhcmFtZXRlcnMubWF4QW5pc290cm9weSk7XG4gICAgICAgIHRoaXMubGV2ZWwgPSBsZXZlbDtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy50ZXh0dXJlID0gdGhpcy5nbC5jcmVhdGVUZXh0dXJlKCk7XG5cbiAgICAgICAgdGhpcy5zdG9yZSA9IHtcbiAgICAgICAgICAgIGltYWdlOiBudWxsLFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEFsaWFzIGZvciBzdGF0ZSBzdG9yZSB0byBhdm9pZCByZWR1bmRhbnQgY2FsbHMgZm9yIGdsb2JhbCBzdGF0ZVxuICAgICAgICB0aGlzLmdsU3RhdGUgPSB0aGlzLmdsLnJlbmRlcmVyLnN0YXRlO1xuXG4gICAgICAgIC8vIFN0YXRlIHN0b3JlIHRvIGF2b2lkIHJlZHVuZGFudCBjYWxscyBmb3IgcGVyLXRleHR1cmUgc3RhdGVcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgICAgICB0aGlzLnN0YXRlLm1pbkZpbHRlciA9IHRoaXMuZ2wuTkVBUkVTVF9NSVBNQVBfTElORUFSO1xuICAgICAgICB0aGlzLnN0YXRlLm1hZ0ZpbHRlciA9IHRoaXMuZ2wuTElORUFSO1xuICAgICAgICB0aGlzLnN0YXRlLndyYXBTID0gdGhpcy5nbC5SRVBFQVQ7XG4gICAgICAgIHRoaXMuc3RhdGUud3JhcFQgPSB0aGlzLmdsLlJFUEVBVDtcbiAgICAgICAgdGhpcy5zdGF0ZS5hbmlzb3Ryb3B5ID0gMDtcbiAgICB9XG5cbiAgICBiaW5kKCkge1xuICAgICAgICAvLyBBbHJlYWR5IGJvdW5kIHRvIGFjdGl2ZSB0ZXh0dXJlIHVuaXRcbiAgICAgICAgaWYgKHRoaXMuZ2xTdGF0ZS50ZXh0dXJlVW5pdHNbdGhpcy5nbFN0YXRlLmFjdGl2ZVRleHR1cmVVbml0XSA9PT0gdGhpcy5pZCkgcmV0dXJuO1xuICAgICAgICB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMudGFyZ2V0LCB0aGlzLnRleHR1cmUpO1xuICAgICAgICB0aGlzLmdsU3RhdGUudGV4dHVyZVVuaXRzW3RoaXMuZ2xTdGF0ZS5hY3RpdmVUZXh0dXJlVW5pdF0gPSB0aGlzLmlkO1xuICAgIH1cblxuICAgIHVwZGF0ZSh0ZXh0dXJlVW5pdCA9IDApIHtcbiAgICAgICAgY29uc3QgbmVlZHNVcGRhdGUgPSAhKHRoaXMuaW1hZ2UgPT09IHRoaXMuc3RvcmUuaW1hZ2UgJiYgIXRoaXMubmVlZHNVcGRhdGUpO1xuXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRleHR1cmUgaXMgYm91bmQgdG8gaXRzIHRleHR1cmUgdW5pdFxuICAgICAgICBpZiAobmVlZHNVcGRhdGUgfHwgdGhpcy5nbFN0YXRlLnRleHR1cmVVbml0c1t0ZXh0dXJlVW5pdF0gIT09IHRoaXMuaWQpIHtcbiAgICAgICAgICAgIC8vIHNldCBhY3RpdmUgdGV4dHVyZSB1bml0IHRvIHBlcmZvcm0gdGV4dHVyZSBmdW5jdGlvbnNcbiAgICAgICAgICAgIHRoaXMuZ2wucmVuZGVyZXIuYWN0aXZlVGV4dHVyZSh0ZXh0dXJlVW5pdCk7XG4gICAgICAgICAgICB0aGlzLmJpbmQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbmVlZHNVcGRhdGUpIHJldHVybjtcbiAgICAgICAgdGhpcy5uZWVkc1VwZGF0ZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLmZsaXBZICE9PSB0aGlzLmdsU3RhdGUuZmxpcFkpIHtcbiAgICAgICAgICAgIHRoaXMuZ2wucGl4ZWxTdG9yZWkodGhpcy5nbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCB0aGlzLmZsaXBZKTtcbiAgICAgICAgICAgIHRoaXMuZ2xTdGF0ZS5mbGlwWSA9IHRoaXMuZmxpcFk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcmVtdWx0aXBseUFscGhhICE9PSB0aGlzLmdsU3RhdGUucHJlbXVsdGlwbHlBbHBoYSkge1xuICAgICAgICAgICAgdGhpcy5nbC5waXhlbFN0b3JlaSh0aGlzLmdsLlVOUEFDS19QUkVNVUxUSVBMWV9BTFBIQV9XRUJHTCwgdGhpcy5wcmVtdWx0aXBseUFscGhhKTtcbiAgICAgICAgICAgIHRoaXMuZ2xTdGF0ZS5wcmVtdWx0aXBseUFscGhhID0gdGhpcy5wcmVtdWx0aXBseUFscGhhO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudW5wYWNrQWxpZ25tZW50ICE9PSB0aGlzLmdsU3RhdGUudW5wYWNrQWxpZ25tZW50KSB7XG4gICAgICAgICAgICB0aGlzLmdsLnBpeGVsU3RvcmVpKHRoaXMuZ2wuVU5QQUNLX0FMSUdOTUVOVCwgdGhpcy51bnBhY2tBbGlnbm1lbnQpO1xuICAgICAgICAgICAgdGhpcy5nbFN0YXRlLnVucGFja0FsaWdubWVudCA9IHRoaXMudW5wYWNrQWxpZ25tZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWluRmlsdGVyICE9PSB0aGlzLnN0YXRlLm1pbkZpbHRlcikge1xuICAgICAgICAgICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMudGFyZ2V0LCB0aGlzLmdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgdGhpcy5taW5GaWx0ZXIpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5taW5GaWx0ZXIgPSB0aGlzLm1pbkZpbHRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1hZ0ZpbHRlciAhPT0gdGhpcy5zdGF0ZS5tYWdGaWx0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLnRhcmdldCwgdGhpcy5nbC5URVhUVVJFX01BR19GSUxURVIsIHRoaXMubWFnRmlsdGVyKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUubWFnRmlsdGVyID0gdGhpcy5tYWdGaWx0ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy53cmFwUyAhPT0gdGhpcy5zdGF0ZS53cmFwUykge1xuICAgICAgICAgICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMudGFyZ2V0LCB0aGlzLmdsLlRFWFRVUkVfV1JBUF9TLCB0aGlzLndyYXBTKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUud3JhcFMgPSB0aGlzLndyYXBTO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMud3JhcFQgIT09IHRoaXMuc3RhdGUud3JhcFQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLnRhcmdldCwgdGhpcy5nbC5URVhUVVJFX1dSQVBfVCwgdGhpcy53cmFwVCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLndyYXBUID0gdGhpcy53cmFwVDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmFuaXNvdHJvcHkgJiYgdGhpcy5hbmlzb3Ryb3B5ICE9PSB0aGlzLnN0YXRlLmFuaXNvdHJvcHkpIHtcbiAgICAgICAgICAgIHRoaXMuZ2wudGV4UGFyYW1ldGVyZihcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCxcbiAgICAgICAgICAgICAgICB0aGlzLmdsLnJlbmRlcmVyLmdldEV4dGVuc2lvbignRVhUX3RleHR1cmVfZmlsdGVyX2FuaXNvdHJvcGljJykuVEVYVFVSRV9NQVhfQU5JU09UUk9QWV9FWFQsXG4gICAgICAgICAgICAgICAgdGhpcy5hbmlzb3Ryb3B5XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5hbmlzb3Ryb3B5ID0gdGhpcy5hbmlzb3Ryb3B5O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaW1hZ2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmltYWdlLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0ID09PSB0aGlzLmdsLlRFWFRVUkVfQ1VCRV9NQVApIHtcbiAgICAgICAgICAgICAgICAvLyBGb3IgY3ViZSBtYXBzXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nbC50ZXhJbWFnZTJEKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nbC5URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1ggKyBpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sZXZlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJuYWxGb3JtYXQsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1hdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VbaV1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5QnVmZmVyLmlzVmlldyh0aGlzLmltYWdlKSkge1xuICAgICAgICAgICAgICAgIC8vIERhdGEgdGV4dHVyZVxuICAgICAgICAgICAgICAgIHRoaXMuZ2wudGV4SW1hZ2UyRCh0aGlzLnRhcmdldCwgdGhpcy5sZXZlbCwgdGhpcy5pbnRlcm5hbEZvcm1hdCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIDAsIHRoaXMuZm9ybWF0LCB0aGlzLnR5cGUsIHRoaXMuaW1hZ2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmltYWdlLmlzQ29tcHJlc3NlZFRleHR1cmUpIHtcbiAgICAgICAgICAgICAgICAvLyBDb21wcmVzc2VkIHRleHR1cmVcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBsZXZlbCA9IDA7IGxldmVsIDwgdGhpcy5pbWFnZS5sZW5ndGg7IGxldmVsKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nbC5jb21wcmVzc2VkVGV4SW1hZ2UyRChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmludGVybmFsRm9ybWF0LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZVtsZXZlbF0ud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlW2xldmVsXS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZVtsZXZlbF0uZGF0YVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUmVndWxhciB0ZXh0dXJlXG4gICAgICAgICAgICAgICAgdGhpcy5nbC50ZXhJbWFnZTJEKHRoaXMudGFyZ2V0LCB0aGlzLmxldmVsLCB0aGlzLmludGVybmFsRm9ybWF0LCB0aGlzLmZvcm1hdCwgdGhpcy50eXBlLCB0aGlzLmltYWdlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZ2VuZXJhdGVNaXBtYXBzKSB7XG4gICAgICAgICAgICAgICAgLy8gRm9yIFdlYkdMMSwgaWYgbm90IGEgcG93ZXIgb2YgMiwgdHVybiBvZmYgbWlwcywgc2V0IHdyYXBwaW5nIHRvIGNsYW1wIHRvIGVkZ2UgYW5kIG1pbkZpbHRlciB0byBsaW5lYXJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZ2wucmVuZGVyZXIuaXNXZWJnbDIgJiYgKCFpc1Bvd2VyT2YyKHRoaXMuaW1hZ2Uud2lkdGgpIHx8ICFpc1Bvd2VyT2YyKHRoaXMuaW1hZ2UuaGVpZ2h0KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZU1pcG1hcHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53cmFwUyA9IHRoaXMud3JhcFQgPSB0aGlzLmdsLkNMQU1QX1RPX0VER0U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluRmlsdGVyID0gdGhpcy5nbC5MSU5FQVI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nbC5nZW5lcmF0ZU1pcG1hcCh0aGlzLnRhcmdldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3Igd2hlbiBkYXRhIGlzIHB1c2hlZCB0byBHUFVcbiAgICAgICAgICAgIHRoaXMub25VcGRhdGUgJiYgdGhpcy5vblVwZGF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0ID09PSB0aGlzLmdsLlRFWFRVUkVfQ1VCRV9NQVApIHtcbiAgICAgICAgICAgICAgICAvLyBVcGxvYWQgZW1wdHkgcGl4ZWwgZm9yIGVhY2ggc2lkZSB3aGlsZSBubyBpbWFnZSB0byBhdm9pZCBlcnJvcnMgd2hpbGUgaW1hZ2Ugb3IgdmlkZW8gbG9hZGluZ1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2wudGV4SW1hZ2UyRChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2wuVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9YICsgaSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdsLlJHQkEsXG4gICAgICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdsLlJHQkEsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdsLlVOU0lHTkVEX0JZVEUsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbXB0eVBpeGVsXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgLy8gaW1hZ2UgaW50ZW50aW9uYWxseSBsZWZ0IG51bGwgZm9yIFJlbmRlclRhcmdldFxuICAgICAgICAgICAgICAgIHRoaXMuZ2wudGV4SW1hZ2UyRCh0aGlzLnRhcmdldCwgdGhpcy5sZXZlbCwgdGhpcy5pbnRlcm5hbEZvcm1hdCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIDAsIHRoaXMuZm9ybWF0LCB0aGlzLnR5cGUsIG51bGwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBVcGxvYWQgZW1wdHkgcGl4ZWwgaWYgbm8gaW1hZ2UgdG8gYXZvaWQgZXJyb3JzIHdoaWxlIGltYWdlIG9yIHZpZGVvIGxvYWRpbmdcbiAgICAgICAgICAgICAgICB0aGlzLmdsLnRleEltYWdlMkQodGhpcy50YXJnZXQsIDAsIHRoaXMuZ2wuUkdCQSwgMSwgMSwgMCwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlVOU0lHTkVEX0JZVEUsIGVtcHR5UGl4ZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RvcmUuaW1hZ2UgPSB0aGlzLmltYWdlO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFZlYzMgfSBmcm9tICcuLi9tYXRoL1ZlYzMuanMnO1xuaW1wb3J0IHsgUXVhdCB9IGZyb20gJy4uL21hdGgvUXVhdC5qcyc7XG5pbXBvcnQgeyBNYXQ0IH0gZnJvbSAnLi4vbWF0aC9NYXQ0LmpzJztcbmltcG9ydCB7IEV1bGVyIH0gZnJvbSAnLi4vbWF0aC9FdWxlci5qcyc7XG5cbmV4cG9ydCBjbGFzcyBUcmFuc2Zvcm0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLm1hdHJpeCA9IG5ldyBNYXQ0KCk7XG4gICAgICAgIHRoaXMud29ybGRNYXRyaXggPSBuZXcgTWF0NCgpO1xuICAgICAgICB0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBuZXcgVmVjMygpO1xuICAgICAgICB0aGlzLnF1YXRlcm5pb24gPSBuZXcgUXVhdCgpO1xuICAgICAgICB0aGlzLnNjYWxlID0gbmV3IFZlYzMoMSk7XG4gICAgICAgIHRoaXMucm90YXRpb24gPSBuZXcgRXVsZXIoKTtcbiAgICAgICAgdGhpcy51cCA9IG5ldyBWZWMzKDAsIDEsIDApO1xuXG4gICAgICAgIHRoaXMucm90YXRpb24ub25DaGFuZ2UgPSAoKSA9PiB0aGlzLnF1YXRlcm5pb24uZnJvbUV1bGVyKHRoaXMucm90YXRpb24pO1xuICAgICAgICB0aGlzLnF1YXRlcm5pb24ub25DaGFuZ2UgPSAoKSA9PiB0aGlzLnJvdGF0aW9uLmZyb21RdWF0ZXJuaW9uKHRoaXMucXVhdGVybmlvbik7XG4gICAgfVxuXG4gICAgc2V0UGFyZW50KHBhcmVudCwgbm90aWZ5UGFyZW50ID0gdHJ1ZSkge1xuICAgICAgICBpZiAodGhpcy5wYXJlbnQgJiYgcGFyZW50ICE9PSB0aGlzLnBhcmVudCkgdGhpcy5wYXJlbnQucmVtb3ZlQ2hpbGQodGhpcywgZmFsc2UpO1xuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgaWYgKG5vdGlmeVBhcmVudCAmJiBwYXJlbnQpIHBhcmVudC5hZGRDaGlsZCh0aGlzLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgYWRkQ2hpbGQoY2hpbGQsIG5vdGlmeUNoaWxkID0gdHJ1ZSkge1xuICAgICAgICBpZiAoIX50aGlzLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpKSB0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgICBpZiAobm90aWZ5Q2hpbGQpIGNoaWxkLnNldFBhcmVudCh0aGlzLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQ2hpbGQoY2hpbGQsIG5vdGlmeUNoaWxkID0gdHJ1ZSkge1xuICAgICAgICBpZiAoISF+dGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKSkgdGhpcy5jaGlsZHJlbi5zcGxpY2UodGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKSwgMSk7XG4gICAgICAgIGlmIChub3RpZnlDaGlsZCkgY2hpbGQuc2V0UGFyZW50KG51bGwsIGZhbHNlKTtcbiAgICB9XG5cbiAgICB1cGRhdGVNYXRyaXhXb3JsZChmb3JjZSkge1xuICAgICAgICBpZiAodGhpcy5tYXRyaXhBdXRvVXBkYXRlKSB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgICBpZiAodGhpcy53b3JsZE1hdHJpeE5lZWRzVXBkYXRlIHx8IGZvcmNlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJlbnQgPT09IG51bGwpIHRoaXMud29ybGRNYXRyaXguY29weSh0aGlzLm1hdHJpeCk7XG4gICAgICAgICAgICBlbHNlIHRoaXMud29ybGRNYXRyaXgubXVsdGlwbHkodGhpcy5wYXJlbnQud29ybGRNYXRyaXgsIHRoaXMubWF0cml4KTtcbiAgICAgICAgICAgIHRoaXMud29ybGRNYXRyaXhOZWVkc1VwZGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yY2UgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbltpXS51cGRhdGVNYXRyaXhXb3JsZChmb3JjZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVNYXRyaXgoKSB7XG4gICAgICAgIHRoaXMubWF0cml4LmNvbXBvc2UodGhpcy5xdWF0ZXJuaW9uLCB0aGlzLnBvc2l0aW9uLCB0aGlzLnNjYWxlKTtcbiAgICAgICAgdGhpcy53b3JsZE1hdHJpeE5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0cmF2ZXJzZShjYWxsYmFjaykge1xuICAgICAgICAvLyBSZXR1cm4gdHJ1ZSBpbiBjYWxsYmFjayB0byBzdG9wIHRyYXZlcnNpbmcgY2hpbGRyZW5cbiAgICAgICAgaWYgKGNhbGxiYWNrKHRoaXMpKSByZXR1cm47XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5baV0udHJhdmVyc2UoY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVjb21wb3NlKCkge1xuICAgICAgICB0aGlzLm1hdHJpeC5nZXRUcmFuc2xhdGlvbih0aGlzLnBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5tYXRyaXguZ2V0Um90YXRpb24odGhpcy5xdWF0ZXJuaW9uKTtcbiAgICAgICAgdGhpcy5tYXRyaXguZ2V0U2NhbGluZyh0aGlzLnNjYWxlKTtcbiAgICAgICAgdGhpcy5yb3RhdGlvbi5mcm9tUXVhdGVybmlvbih0aGlzLnF1YXRlcm5pb24pO1xuICAgIH1cblxuICAgIGxvb2tBdCh0YXJnZXQsIGludmVydCA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChpbnZlcnQpIHRoaXMubWF0cml4Lmxvb2tBdCh0aGlzLnBvc2l0aW9uLCB0YXJnZXQsIHRoaXMudXApO1xuICAgICAgICBlbHNlIHRoaXMubWF0cml4Lmxvb2tBdCh0YXJnZXQsIHRoaXMucG9zaXRpb24sIHRoaXMudXApO1xuICAgICAgICB0aGlzLm1hdHJpeC5nZXRSb3RhdGlvbih0aGlzLnF1YXRlcm5pb24pO1xuICAgICAgICB0aGlzLnJvdGF0aW9uLmZyb21RdWF0ZXJuaW9uKHRoaXMucXVhdGVybmlvbik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgR2VvbWV0cnkgfSBmcm9tICcuLi9jb3JlL0dlb21ldHJ5LmpzJztcblxuZXhwb3J0IGNsYXNzIFBsYW5lIGV4dGVuZHMgR2VvbWV0cnkge1xuICAgIGNvbnN0cnVjdG9yKGdsLCB7IHdpZHRoID0gMSwgaGVpZ2h0ID0gMSwgd2lkdGhTZWdtZW50cyA9IDEsIGhlaWdodFNlZ21lbnRzID0gMSwgYXR0cmlidXRlcyA9IHt9IH0gPSB7fSkge1xuICAgICAgICBjb25zdCB3U2VncyA9IHdpZHRoU2VnbWVudHM7XG4gICAgICAgIGNvbnN0IGhTZWdzID0gaGVpZ2h0U2VnbWVudHM7XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIGxlbmd0aCBvZiBhcnJheXNcbiAgICAgICAgY29uc3QgbnVtID0gKHdTZWdzICsgMSkgKiAoaFNlZ3MgKyAxKTtcbiAgICAgICAgY29uc3QgbnVtSW5kaWNlcyA9IHdTZWdzICogaFNlZ3MgKiA2O1xuXG4gICAgICAgIC8vIEdlbmVyYXRlIGVtcHR5IGFycmF5cyBvbmNlXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gbmV3IEZsb2F0MzJBcnJheShudW0gKiAzKTtcbiAgICAgICAgY29uc3Qgbm9ybWFsID0gbmV3IEZsb2F0MzJBcnJheShudW0gKiAzKTtcbiAgICAgICAgY29uc3QgdXYgPSBuZXcgRmxvYXQzMkFycmF5KG51bSAqIDIpO1xuICAgICAgICBjb25zdCBpbmRleCA9IG51bUluZGljZXMgPiA2NTUzNiA/IG5ldyBVaW50MzJBcnJheShudW1JbmRpY2VzKSA6IG5ldyBVaW50MTZBcnJheShudW1JbmRpY2VzKTtcblxuICAgICAgICBQbGFuZS5idWlsZFBsYW5lKHBvc2l0aW9uLCBub3JtYWwsIHV2LCBpbmRleCwgd2lkdGgsIGhlaWdodCwgMCwgd1NlZ3MsIGhTZWdzKTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKGF0dHJpYnV0ZXMsIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7IHNpemU6IDMsIGRhdGE6IHBvc2l0aW9uIH0sXG4gICAgICAgICAgICBub3JtYWw6IHsgc2l6ZTogMywgZGF0YTogbm9ybWFsIH0sXG4gICAgICAgICAgICB1djogeyBzaXplOiAyLCBkYXRhOiB1diB9LFxuICAgICAgICAgICAgaW5kZXg6IHsgZGF0YTogaW5kZXggfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3VwZXIoZ2wsIGF0dHJpYnV0ZXMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBidWlsZFBsYW5lKHBvc2l0aW9uLCBub3JtYWwsIHV2LCBpbmRleCwgd2lkdGgsIGhlaWdodCwgZGVwdGgsIHdTZWdzLCBoU2VncywgdSA9IDAsIHYgPSAxLCB3ID0gMiwgdURpciA9IDEsIHZEaXIgPSAtMSwgaSA9IDAsIGlpID0gMCkge1xuICAgICAgICBjb25zdCBpbyA9IGk7XG4gICAgICAgIGNvbnN0IHNlZ1cgPSB3aWR0aCAvIHdTZWdzO1xuICAgICAgICBjb25zdCBzZWdIID0gaGVpZ2h0IC8gaFNlZ3M7XG5cbiAgICAgICAgZm9yIChsZXQgaXkgPSAwOyBpeSA8PSBoU2VnczsgaXkrKykge1xuICAgICAgICAgICAgbGV0IHkgPSBpeSAqIHNlZ0ggLSBoZWlnaHQgLyAyO1xuICAgICAgICAgICAgZm9yIChsZXQgaXggPSAwOyBpeCA8PSB3U2VnczsgaXgrKywgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHggPSBpeCAqIHNlZ1cgLSB3aWR0aCAvIDI7XG5cbiAgICAgICAgICAgICAgICBwb3NpdGlvbltpICogMyArIHVdID0geCAqIHVEaXI7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25baSAqIDMgKyB2XSA9IHkgKiB2RGlyO1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uW2kgKiAzICsgd10gPSBkZXB0aCAvIDI7XG5cbiAgICAgICAgICAgICAgICBub3JtYWxbaSAqIDMgKyB1XSA9IDA7XG4gICAgICAgICAgICAgICAgbm9ybWFsW2kgKiAzICsgdl0gPSAwO1xuICAgICAgICAgICAgICAgIG5vcm1hbFtpICogMyArIHddID0gZGVwdGggPj0gMCA/IDEgOiAtMTtcblxuICAgICAgICAgICAgICAgIHV2W2kgKiAyXSA9IGl4IC8gd1NlZ3M7XG4gICAgICAgICAgICAgICAgdXZbaSAqIDIgKyAxXSA9IDEgLSBpeSAvIGhTZWdzO1xuXG4gICAgICAgICAgICAgICAgaWYgKGl5ID09PSBoU2VncyB8fCBpeCA9PT0gd1NlZ3MpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGxldCBhID0gaW8gKyBpeCArIGl5ICogKHdTZWdzICsgMSk7XG4gICAgICAgICAgICAgICAgbGV0IGIgPSBpbyArIGl4ICsgKGl5ICsgMSkgKiAod1NlZ3MgKyAxKTtcbiAgICAgICAgICAgICAgICBsZXQgYyA9IGlvICsgaXggKyAoaXkgKyAxKSAqICh3U2VncyArIDEpICsgMTtcbiAgICAgICAgICAgICAgICBsZXQgZCA9IGlvICsgaXggKyBpeSAqICh3U2VncyArIDEpICsgMTtcblxuICAgICAgICAgICAgICAgIGluZGV4W2lpICogNl0gPSBhO1xuICAgICAgICAgICAgICAgIGluZGV4W2lpICogNiArIDFdID0gYjtcbiAgICAgICAgICAgICAgICBpbmRleFtpaSAqIDYgKyAyXSA9IGQ7XG4gICAgICAgICAgICAgICAgaW5kZXhbaWkgKiA2ICsgM10gPSBiO1xuICAgICAgICAgICAgICAgIGluZGV4W2lpICogNiArIDRdID0gYztcbiAgICAgICAgICAgICAgICBpbmRleFtpaSAqIDYgKyA1XSA9IGQ7XG4gICAgICAgICAgICAgICAgaWkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIFRPRE86IGJhcnljZW50cmljIGNvZGUgc2hvdWxkbid0IGJlIGhlcmUsIGJ1dCB3aGVyZT9cbi8vIFRPRE86IFNwaGVyZUNhc3Q/XG5cbmltcG9ydCB7IFZlYzIgfSBmcm9tICcuLi9tYXRoL1ZlYzIuanMnO1xuaW1wb3J0IHsgVmVjMyB9IGZyb20gJy4uL21hdGgvVmVjMy5qcyc7XG5pbXBvcnQgeyBNYXQ0IH0gZnJvbSAnLi4vbWF0aC9NYXQ0LmpzJztcblxuY29uc3QgdGVtcFZlYzJhID0gbmV3IFZlYzIoKTtcbmNvbnN0IHRlbXBWZWMyYiA9IG5ldyBWZWMyKCk7XG5jb25zdCB0ZW1wVmVjMmMgPSBuZXcgVmVjMigpO1xuXG5jb25zdCB0ZW1wVmVjM2EgPSBuZXcgVmVjMygpO1xuY29uc3QgdGVtcFZlYzNiID0gbmV3IFZlYzMoKTtcbmNvbnN0IHRlbXBWZWMzYyA9IG5ldyBWZWMzKCk7XG5jb25zdCB0ZW1wVmVjM2QgPSBuZXcgVmVjMygpO1xuY29uc3QgdGVtcFZlYzNlID0gbmV3IFZlYzMoKTtcbmNvbnN0IHRlbXBWZWMzZiA9IG5ldyBWZWMzKCk7XG5jb25zdCB0ZW1wVmVjM2cgPSBuZXcgVmVjMygpO1xuY29uc3QgdGVtcFZlYzNoID0gbmV3IFZlYzMoKTtcbmNvbnN0IHRlbXBWZWMzaSA9IG5ldyBWZWMzKCk7XG5jb25zdCB0ZW1wVmVjM2ogPSBuZXcgVmVjMygpO1xuY29uc3QgdGVtcFZlYzNrID0gbmV3IFZlYzMoKTtcblxuY29uc3QgdGVtcE1hdDQgPSBuZXcgTWF0NCgpO1xuXG5leHBvcnQgY2xhc3MgUmF5Y2FzdCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3JpZ2luID0gbmV3IFZlYzMoKTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBuZXcgVmVjMygpO1xuICAgIH1cblxuICAgIC8vIFNldCByYXkgZnJvbSBtb3VzZSB1bnByb2plY3Rpb25cbiAgICBjYXN0TW91c2UoY2FtZXJhLCBtb3VzZSA9IFswLCAwXSkge1xuICAgICAgICBpZiAoY2FtZXJhLnR5cGUgPT09ICdvcnRob2dyYXBoaWMnKSB7XG4gICAgICAgICAgICAvLyBTZXQgb3JpZ2luXG4gICAgICAgICAgICAvLyBTaW5jZSBjYW1lcmEgaXMgb3J0aG9ncmFwaGljLCBvcmlnaW4gaXMgbm90IHRoZSBjYW1lcmEgcG9zaXRpb25cbiAgICAgICAgICAgIGNvbnN0IHsgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCB6b29tIH0gPSBjYW1lcmE7XG4gICAgICAgICAgICBjb25zdCB4ID0gbGVmdCAvIHpvb20gKyAoKHJpZ2h0IC0gbGVmdCkgLyB6b29tKSAqIChtb3VzZVswXSAqIDAuNSArIDAuNSk7XG4gICAgICAgICAgICBjb25zdCB5ID0gYm90dG9tIC8gem9vbSArICgodG9wIC0gYm90dG9tKSAvIHpvb20pICogKG1vdXNlWzFdICogMC41ICsgMC41KTtcbiAgICAgICAgICAgIHRoaXMub3JpZ2luLnNldCh4LCB5LCAwKTtcbiAgICAgICAgICAgIHRoaXMub3JpZ2luLmFwcGx5TWF0cml4NChjYW1lcmEud29ybGRNYXRyaXgpO1xuXG4gICAgICAgICAgICAvLyBTZXQgZGlyZWN0aW9uXG4gICAgICAgICAgICAvLyBodHRwczovL2NvbW11bml0eS5raHJvbm9zLm9yZy90L2dldC1kaXJlY3Rpb24tZnJvbS10cmFuc2Zvcm1hdGlvbi1tYXRyaXgtb3ItcXVhdC82NTUwMi8yXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbi54ID0gLWNhbWVyYS53b3JsZE1hdHJpeFs4XTtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uLnkgPSAtY2FtZXJhLndvcmxkTWF0cml4WzldO1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24ueiA9IC1jYW1lcmEud29ybGRNYXRyaXhbMTBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gU2V0IG9yaWdpblxuICAgICAgICAgICAgY2FtZXJhLndvcmxkTWF0cml4LmdldFRyYW5zbGF0aW9uKHRoaXMub3JpZ2luKTtcblxuICAgICAgICAgICAgLy8gU2V0IGRpcmVjdGlvblxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24uc2V0KG1vdXNlWzBdLCBtb3VzZVsxXSwgMC41KTtcbiAgICAgICAgICAgIGNhbWVyYS51bnByb2plY3QodGhpcy5kaXJlY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24uc3ViKHRoaXMub3JpZ2luKS5ub3JtYWxpemUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGludGVyc2VjdEJvdW5kcyhtZXNoZXMsIHsgbWF4RGlzdGFuY2UsIG91dHB1dCA9IFtdIH0gPSB7fSkge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkobWVzaGVzKSkgbWVzaGVzID0gW21lc2hlc107XG5cbiAgICAgICAgY29uc3QgaW52V29ybGRNYXQ0ID0gdGVtcE1hdDQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbiA9IHRlbXBWZWMzYTtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gdGVtcFZlYzNiO1xuXG4gICAgICAgIGNvbnN0IGhpdHMgPSBvdXRwdXQ7XG4gICAgICAgIGhpdHMubGVuZ3RoID0gMDtcblxuICAgICAgICBtZXNoZXMuZm9yRWFjaCgobWVzaCkgPT4ge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGJvdW5kc1xuICAgICAgICAgICAgaWYgKCFtZXNoLmdlb21ldHJ5LmJvdW5kcyB8fCBtZXNoLmdlb21ldHJ5LmJvdW5kcy5yYWRpdXMgPT09IEluZmluaXR5KSBtZXNoLmdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ1NwaGVyZSgpO1xuICAgICAgICAgICAgY29uc3QgYm91bmRzID0gbWVzaC5nZW9tZXRyeS5ib3VuZHM7XG4gICAgICAgICAgICBpbnZXb3JsZE1hdDQuaW52ZXJzZShtZXNoLndvcmxkTWF0cml4KTtcblxuICAgICAgICAgICAgLy8gR2V0IG1heCBkaXN0YW5jZSBsb2NhbGx5XG4gICAgICAgICAgICBsZXQgbG9jYWxNYXhEaXN0YW5jZTtcbiAgICAgICAgICAgIGlmIChtYXhEaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbi5jb3B5KHRoaXMuZGlyZWN0aW9uKS5zY2FsZVJvdGF0ZU1hdHJpeDQoaW52V29ybGRNYXQ0KTtcbiAgICAgICAgICAgICAgICBsb2NhbE1heERpc3RhbmNlID0gbWF4RGlzdGFuY2UgKiBkaXJlY3Rpb24ubGVuKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRha2Ugd29ybGQgc3BhY2UgcmF5IGFuZCBtYWtlIGl0IG9iamVjdCBzcGFjZSB0byBhbGlnbiB3aXRoIGJvdW5kaW5nIGJveFxuICAgICAgICAgICAgb3JpZ2luLmNvcHkodGhpcy5vcmlnaW4pLmFwcGx5TWF0cml4NChpbnZXb3JsZE1hdDQpO1xuICAgICAgICAgICAgZGlyZWN0aW9uLmNvcHkodGhpcy5kaXJlY3Rpb24pLnRyYW5zZm9ybURpcmVjdGlvbihpbnZXb3JsZE1hdDQpO1xuXG4gICAgICAgICAgICAvLyBCcmVhayBvdXQgZWFybHkgaWYgYm91bmRzIHRvbyBmYXIgYXdheSBmcm9tIG9yaWdpblxuICAgICAgICAgICAgaWYgKG1heERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9yaWdpbi5kaXN0YW5jZShib3VuZHMuY2VudGVyKSAtIGJvdW5kcy5yYWRpdXMgPiBsb2NhbE1heERpc3RhbmNlKSByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBsb2NhbERpc3RhbmNlID0gMDtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgb3JpZ2luIGlzbid0IGluc2lkZSBib3VuZHMgYmVmb3JlIHRlc3RpbmcgaW50ZXJzZWN0aW9uXG4gICAgICAgICAgICBpZiAobWVzaC5nZW9tZXRyeS5yYXljYXN0ID09PSAnc3BoZXJlJykge1xuICAgICAgICAgICAgICAgIGlmIChvcmlnaW4uZGlzdGFuY2UoYm91bmRzLmNlbnRlcikgPiBib3VuZHMucmFkaXVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsRGlzdGFuY2UgPSB0aGlzLmludGVyc2VjdFNwaGVyZShib3VuZHMsIG9yaWdpbiwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFsb2NhbERpc3RhbmNlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbi54IDwgYm91bmRzLm1pbi54IHx8XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbi54ID4gYm91bmRzLm1heC54IHx8XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbi55IDwgYm91bmRzLm1pbi55IHx8XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbi55ID4gYm91bmRzLm1heC55IHx8XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbi56IDwgYm91bmRzLm1pbi56IHx8XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbi56ID4gYm91bmRzLm1heC56XG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsRGlzdGFuY2UgPSB0aGlzLmludGVyc2VjdEJveChib3VuZHMsIG9yaWdpbiwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFsb2NhbERpc3RhbmNlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWF4RGlzdGFuY2UgJiYgbG9jYWxEaXN0YW5jZSA+IGxvY2FsTWF4RGlzdGFuY2UpIHJldHVybjtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIG9iamVjdCBvbiBtZXNoIHRvIGF2b2lkIGdlbmVyYXRpbmcgbG90cyBvZiBvYmplY3RzXG4gICAgICAgICAgICBpZiAoIW1lc2guaGl0KSBtZXNoLmhpdCA9IHsgbG9jYWxQb2ludDogbmV3IFZlYzMoKSwgcG9pbnQ6IG5ldyBWZWMzKCkgfTtcblxuICAgICAgICAgICAgbWVzaC5oaXQubG9jYWxQb2ludC5jb3B5KGRpcmVjdGlvbikubXVsdGlwbHkobG9jYWxEaXN0YW5jZSkuYWRkKG9yaWdpbik7XG4gICAgICAgICAgICBtZXNoLmhpdC5wb2ludC5jb3B5KG1lc2guaGl0LmxvY2FsUG9pbnQpLmFwcGx5TWF0cml4NChtZXNoLndvcmxkTWF0cml4KTtcbiAgICAgICAgICAgIG1lc2guaGl0LmRpc3RhbmNlID0gbWVzaC5oaXQucG9pbnQuZGlzdGFuY2UodGhpcy5vcmlnaW4pO1xuXG4gICAgICAgICAgICBoaXRzLnB1c2gobWVzaCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGhpdHMuc29ydCgoYSwgYikgPT4gYS5oaXQuZGlzdGFuY2UgLSBiLmhpdC5kaXN0YW5jZSk7XG4gICAgICAgIHJldHVybiBoaXRzO1xuICAgIH1cblxuICAgIGludGVyc2VjdE1lc2hlcyhtZXNoZXMsIHsgY3VsbEZhY2UgPSB0cnVlLCBtYXhEaXN0YW5jZSwgaW5jbHVkZVVWID0gdHJ1ZSwgaW5jbHVkZU5vcm1hbCA9IHRydWUsIG91dHB1dCA9IFtdIH0gPSB7fSkge1xuICAgICAgICAvLyBUZXN0IGJvdW5kcyBmaXJzdCBiZWZvcmUgdGVzdGluZyBnZW9tZXRyeVxuICAgICAgICBjb25zdCBoaXRzID0gdGhpcy5pbnRlcnNlY3RCb3VuZHMobWVzaGVzLCB7IG1heERpc3RhbmNlLCBvdXRwdXQgfSk7XG4gICAgICAgIGlmICghaGl0cy5sZW5ndGgpIHJldHVybiBoaXRzO1xuXG4gICAgICAgIGNvbnN0IGludldvcmxkTWF0NCA9IHRlbXBNYXQ0O1xuICAgICAgICBjb25zdCBvcmlnaW4gPSB0ZW1wVmVjM2E7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRlbXBWZWMzYjtcbiAgICAgICAgY29uc3QgYSA9IHRlbXBWZWMzYztcbiAgICAgICAgY29uc3QgYiA9IHRlbXBWZWMzZDtcbiAgICAgICAgY29uc3QgYyA9IHRlbXBWZWMzZTtcbiAgICAgICAgY29uc3QgY2xvc2VzdEZhY2VOb3JtYWwgPSB0ZW1wVmVjM2Y7XG4gICAgICAgIGNvbnN0IGZhY2VOb3JtYWwgPSB0ZW1wVmVjM2c7XG4gICAgICAgIGNvbnN0IGJhcnljb29yZCA9IHRlbXBWZWMzaDtcbiAgICAgICAgY29uc3QgdXZBID0gdGVtcFZlYzJhO1xuICAgICAgICBjb25zdCB1dkIgPSB0ZW1wVmVjMmI7XG4gICAgICAgIGNvbnN0IHV2QyA9IHRlbXBWZWMyYztcblxuICAgICAgICBmb3IgKGxldCBpID0gaGl0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgY29uc3QgbWVzaCA9IGhpdHNbaV07XG4gICAgICAgICAgICBpbnZXb3JsZE1hdDQuaW52ZXJzZShtZXNoLndvcmxkTWF0cml4KTtcblxuICAgICAgICAgICAgLy8gR2V0IG1heCBkaXN0YW5jZSBsb2NhbGx5XG4gICAgICAgICAgICBsZXQgbG9jYWxNYXhEaXN0YW5jZTtcbiAgICAgICAgICAgIGlmIChtYXhEaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbi5jb3B5KHRoaXMuZGlyZWN0aW9uKS5zY2FsZVJvdGF0ZU1hdHJpeDQoaW52V29ybGRNYXQ0KTtcbiAgICAgICAgICAgICAgICBsb2NhbE1heERpc3RhbmNlID0gbWF4RGlzdGFuY2UgKiBkaXJlY3Rpb24ubGVuKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRha2Ugd29ybGQgc3BhY2UgcmF5IGFuZCBtYWtlIGl0IG9iamVjdCBzcGFjZSB0byBhbGlnbiB3aXRoIGJvdW5kaW5nIGJveFxuICAgICAgICAgICAgb3JpZ2luLmNvcHkodGhpcy5vcmlnaW4pLmFwcGx5TWF0cml4NChpbnZXb3JsZE1hdDQpO1xuICAgICAgICAgICAgZGlyZWN0aW9uLmNvcHkodGhpcy5kaXJlY3Rpb24pLnRyYW5zZm9ybURpcmVjdGlvbihpbnZXb3JsZE1hdDQpO1xuXG4gICAgICAgICAgICBsZXQgbG9jYWxEaXN0YW5jZSA9IDA7XG4gICAgICAgICAgICBsZXQgY2xvc2VzdEEsIGNsb3Nlc3RCLCBjbG9zZXN0QztcblxuICAgICAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBtZXNoLmdlb21ldHJ5O1xuICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IGdlb21ldHJ5LmF0dHJpYnV0ZXM7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGF0dHJpYnV0ZXMuaW5kZXg7XG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGF0dHJpYnV0ZXMucG9zaXRpb247XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gTWF0aC5tYXgoMCwgZ2VvbWV0cnkuZHJhd1JhbmdlLnN0YXJ0KTtcbiAgICAgICAgICAgIGNvbnN0IGVuZCA9IE1hdGgubWluKGluZGV4ID8gaW5kZXguY291bnQgOiBwb3NpdGlvbi5jb3VudCwgZ2VvbWV0cnkuZHJhd1JhbmdlLnN0YXJ0ICsgZ2VvbWV0cnkuZHJhd1JhbmdlLmNvdW50KTtcbiAgICAgICAgICAgIGNvbnN0IHN0cmlkZSA9IHBvc2l0aW9uLnN0cmlkZSA/IHBvc2l0aW9uLnN0cmlkZSAvIHBvc2l0aW9uLmRhdGEuQllURVNfUEVSX0VMRU1FTlQgOiBwb3NpdGlvbi5zaXplO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gc3RhcnQ7IGogPCBlbmQ7IGogKz0gMykge1xuICAgICAgICAgICAgICAgIC8vIFBvc2l0aW9uIGF0dHJpYnV0ZSBpbmRpY2VzIGZvciBlYWNoIHRyaWFuZ2xlXG4gICAgICAgICAgICAgICAgY29uc3QgYWkgPSBpbmRleCA/IGluZGV4LmRhdGFbal0gOiBqO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJpID0gaW5kZXggPyBpbmRleC5kYXRhW2ogKyAxXSA6IGogKyAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNpID0gaW5kZXggPyBpbmRleC5kYXRhW2ogKyAyXSA6IGogKyAyO1xuXG4gICAgICAgICAgICAgICAgYS5mcm9tQXJyYXkocG9zaXRpb24uZGF0YSwgYWkgKiBzdHJpZGUpO1xuICAgICAgICAgICAgICAgIGIuZnJvbUFycmF5KHBvc2l0aW9uLmRhdGEsIGJpICogc3RyaWRlKTtcbiAgICAgICAgICAgICAgICBjLmZyb21BcnJheShwb3NpdGlvbi5kYXRhLCBjaSAqIHN0cmlkZSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkaXN0YW5jZSA9IHRoaXMuaW50ZXJzZWN0VHJpYW5nbGUoYSwgYiwgYywgY3VsbEZhY2UsIG9yaWdpbiwgZGlyZWN0aW9uLCBmYWNlTm9ybWFsKTtcbiAgICAgICAgICAgICAgICBpZiAoIWRpc3RhbmNlKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIC8vIFRvbyBmYXIgYXdheVxuICAgICAgICAgICAgICAgIGlmIChtYXhEaXN0YW5jZSAmJiBkaXN0YW5jZSA+IGxvY2FsTWF4RGlzdGFuY2UpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFsb2NhbERpc3RhbmNlIHx8IGRpc3RhbmNlIDwgbG9jYWxEaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbERpc3RhbmNlID0gZGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RBID0gYWk7XG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RCID0gYmk7XG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RDID0gY2k7XG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RGYWNlTm9ybWFsLmNvcHkoZmFjZU5vcm1hbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWxvY2FsRGlzdGFuY2UpIGhpdHMuc3BsaWNlKGksIDEpO1xuXG4gICAgICAgICAgICAvLyBVcGRhdGUgaGl0IHZhbHVlcyBmcm9tIGJvdW5kcy10ZXN0XG4gICAgICAgICAgICBtZXNoLmhpdC5sb2NhbFBvaW50LmNvcHkoZGlyZWN0aW9uKS5tdWx0aXBseShsb2NhbERpc3RhbmNlKS5hZGQob3JpZ2luKTtcbiAgICAgICAgICAgIG1lc2guaGl0LnBvaW50LmNvcHkobWVzaC5oaXQubG9jYWxQb2ludCkuYXBwbHlNYXRyaXg0KG1lc2gud29ybGRNYXRyaXgpO1xuICAgICAgICAgICAgbWVzaC5oaXQuZGlzdGFuY2UgPSBtZXNoLmhpdC5wb2ludC5kaXN0YW5jZSh0aGlzLm9yaWdpbik7XG5cbiAgICAgICAgICAgIC8vIEFkZCB1bmlxdWUgaGl0IG9iamVjdHMgb24gbWVzaCB0byBhdm9pZCBnZW5lcmF0aW5nIGxvdHMgb2Ygb2JqZWN0c1xuICAgICAgICAgICAgaWYgKCFtZXNoLmhpdC5mYWNlTm9ybWFsKSB7XG4gICAgICAgICAgICAgICAgbWVzaC5oaXQubG9jYWxGYWNlTm9ybWFsID0gbmV3IFZlYzMoKTtcbiAgICAgICAgICAgICAgICBtZXNoLmhpdC5mYWNlTm9ybWFsID0gbmV3IFZlYzMoKTtcbiAgICAgICAgICAgICAgICBtZXNoLmhpdC51diA9IG5ldyBWZWMyKCk7XG4gICAgICAgICAgICAgICAgbWVzaC5oaXQubG9jYWxOb3JtYWwgPSBuZXcgVmVjMygpO1xuICAgICAgICAgICAgICAgIG1lc2guaGl0Lm5vcm1hbCA9IG5ldyBWZWMzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEFkZCBmYWNlIG5vcm1hbCBkYXRhIHdoaWNoIGlzIGFscmVhZHkgY29tcHV0ZWRcbiAgICAgICAgICAgIG1lc2guaGl0LmxvY2FsRmFjZU5vcm1hbC5jb3B5KGNsb3Nlc3RGYWNlTm9ybWFsKTtcbiAgICAgICAgICAgIG1lc2guaGl0LmZhY2VOb3JtYWwuY29weShtZXNoLmhpdC5sb2NhbEZhY2VOb3JtYWwpLnRyYW5zZm9ybURpcmVjdGlvbihtZXNoLndvcmxkTWF0cml4KTtcblxuICAgICAgICAgICAgLy8gT3B0aW9uYWwgZGF0YSwgb3B0IG91dCB0byBvcHRpbWlzZSBhIGJpdCBpZiBuZWNlc3NhcnlcbiAgICAgICAgICAgIGlmIChpbmNsdWRlVVYgfHwgaW5jbHVkZU5vcm1hbCkge1xuICAgICAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBiYXJ5Y29vcmRzIHRvIGZpbmQgdXYgdmFsdWVzIGF0IGhpdCBwb2ludFxuICAgICAgICAgICAgICAgIGEuZnJvbUFycmF5KHBvc2l0aW9uLmRhdGEsIGNsb3Nlc3RBICogMyk7XG4gICAgICAgICAgICAgICAgYi5mcm9tQXJyYXkocG9zaXRpb24uZGF0YSwgY2xvc2VzdEIgKiAzKTtcbiAgICAgICAgICAgICAgICBjLmZyb21BcnJheShwb3NpdGlvbi5kYXRhLCBjbG9zZXN0QyAqIDMpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0QmFyeWNvb3JkKG1lc2guaGl0LmxvY2FsUG9pbnQsIGEsIGIsIGMsIGJhcnljb29yZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbmNsdWRlVVYgJiYgYXR0cmlidXRlcy51dikge1xuICAgICAgICAgICAgICAgIHV2QS5mcm9tQXJyYXkoYXR0cmlidXRlcy51di5kYXRhLCBjbG9zZXN0QSAqIDIpO1xuICAgICAgICAgICAgICAgIHV2Qi5mcm9tQXJyYXkoYXR0cmlidXRlcy51di5kYXRhLCBjbG9zZXN0QiAqIDIpO1xuICAgICAgICAgICAgICAgIHV2Qy5mcm9tQXJyYXkoYXR0cmlidXRlcy51di5kYXRhLCBjbG9zZXN0QyAqIDIpO1xuICAgICAgICAgICAgICAgIG1lc2guaGl0LnV2LnNldChcbiAgICAgICAgICAgICAgICAgICAgdXZBLnggKiBiYXJ5Y29vcmQueCArIHV2Qi54ICogYmFyeWNvb3JkLnkgKyB1dkMueCAqIGJhcnljb29yZC56LFxuICAgICAgICAgICAgICAgICAgICB1dkEueSAqIGJhcnljb29yZC54ICsgdXZCLnkgKiBiYXJ5Y29vcmQueSArIHV2Qy55ICogYmFyeWNvb3JkLnpcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaW5jbHVkZU5vcm1hbCAmJiBhdHRyaWJ1dGVzLm5vcm1hbCkge1xuICAgICAgICAgICAgICAgIGEuZnJvbUFycmF5KGF0dHJpYnV0ZXMubm9ybWFsLmRhdGEsIGNsb3Nlc3RBICogMyk7XG4gICAgICAgICAgICAgICAgYi5mcm9tQXJyYXkoYXR0cmlidXRlcy5ub3JtYWwuZGF0YSwgY2xvc2VzdEIgKiAzKTtcbiAgICAgICAgICAgICAgICBjLmZyb21BcnJheShhdHRyaWJ1dGVzLm5vcm1hbC5kYXRhLCBjbG9zZXN0QyAqIDMpO1xuICAgICAgICAgICAgICAgIG1lc2guaGl0LmxvY2FsTm9ybWFsLnNldChcbiAgICAgICAgICAgICAgICAgICAgYS54ICogYmFyeWNvb3JkLnggKyBiLnggKiBiYXJ5Y29vcmQueSArIGMueCAqIGJhcnljb29yZC56LFxuICAgICAgICAgICAgICAgICAgICBhLnkgKiBiYXJ5Y29vcmQueCArIGIueSAqIGJhcnljb29yZC55ICsgYy55ICogYmFyeWNvb3JkLnosXG4gICAgICAgICAgICAgICAgICAgIGEueiAqIGJhcnljb29yZC54ICsgYi56ICogYmFyeWNvb3JkLnkgKyBjLnogKiBiYXJ5Y29vcmQuelxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBtZXNoLmhpdC5ub3JtYWwuY29weShtZXNoLmhpdC5sb2NhbE5vcm1hbCkudHJhbnNmb3JtRGlyZWN0aW9uKG1lc2gud29ybGRNYXRyaXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaGl0cy5zb3J0KChhLCBiKSA9PiBhLmhpdC5kaXN0YW5jZSAtIGIuaGl0LmRpc3RhbmNlKTtcbiAgICAgICAgcmV0dXJuIGhpdHM7XG4gICAgfVxuXG4gICAgaW50ZXJzZWN0U3BoZXJlKHNwaGVyZSwgb3JpZ2luID0gdGhpcy5vcmlnaW4sIGRpcmVjdGlvbiA9IHRoaXMuZGlyZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHJheSA9IHRlbXBWZWMzYztcbiAgICAgICAgcmF5LnN1YihzcGhlcmUuY2VudGVyLCBvcmlnaW4pO1xuICAgICAgICBjb25zdCB0Y2EgPSByYXkuZG90KGRpcmVjdGlvbik7XG4gICAgICAgIGNvbnN0IGQyID0gcmF5LmRvdChyYXkpIC0gdGNhICogdGNhO1xuICAgICAgICBjb25zdCByYWRpdXMyID0gc3BoZXJlLnJhZGl1cyAqIHNwaGVyZS5yYWRpdXM7XG4gICAgICAgIGlmIChkMiA+IHJhZGl1czIpIHJldHVybiAwO1xuICAgICAgICBjb25zdCB0aGMgPSBNYXRoLnNxcnQocmFkaXVzMiAtIGQyKTtcbiAgICAgICAgY29uc3QgdDAgPSB0Y2EgLSB0aGM7XG4gICAgICAgIGNvbnN0IHQxID0gdGNhICsgdGhjO1xuICAgICAgICBpZiAodDAgPCAwICYmIHQxIDwgMCkgcmV0dXJuIDA7XG4gICAgICAgIGlmICh0MCA8IDApIHJldHVybiB0MTtcbiAgICAgICAgcmV0dXJuIHQwO1xuICAgIH1cblxuICAgIC8vIFJheSBBQUJCIC0gUmF5IEF4aXMgYWxpZ25lZCBib3VuZGluZyBib3ggdGVzdGluZ1xuICAgIGludGVyc2VjdEJveChib3gsIG9yaWdpbiA9IHRoaXMub3JpZ2luLCBkaXJlY3Rpb24gPSB0aGlzLmRpcmVjdGlvbikge1xuICAgICAgICBsZXQgdG1pbiwgdG1heCwgdFltaW4sIHRZbWF4LCB0Wm1pbiwgdFptYXg7XG4gICAgICAgIGNvbnN0IGludmRpcnggPSAxIC8gZGlyZWN0aW9uLng7XG4gICAgICAgIGNvbnN0IGludmRpcnkgPSAxIC8gZGlyZWN0aW9uLnk7XG4gICAgICAgIGNvbnN0IGludmRpcnogPSAxIC8gZGlyZWN0aW9uLno7XG4gICAgICAgIGNvbnN0IG1pbiA9IGJveC5taW47XG4gICAgICAgIGNvbnN0IG1heCA9IGJveC5tYXg7XG4gICAgICAgIHRtaW4gPSAoKGludmRpcnggPj0gMCA/IG1pbi54IDogbWF4LngpIC0gb3JpZ2luLngpICogaW52ZGlyeDtcbiAgICAgICAgdG1heCA9ICgoaW52ZGlyeCA+PSAwID8gbWF4LnggOiBtaW4ueCkgLSBvcmlnaW4ueCkgKiBpbnZkaXJ4O1xuICAgICAgICB0WW1pbiA9ICgoaW52ZGlyeSA+PSAwID8gbWluLnkgOiBtYXgueSkgLSBvcmlnaW4ueSkgKiBpbnZkaXJ5O1xuICAgICAgICB0WW1heCA9ICgoaW52ZGlyeSA+PSAwID8gbWF4LnkgOiBtaW4ueSkgLSBvcmlnaW4ueSkgKiBpbnZkaXJ5O1xuICAgICAgICBpZiAodG1pbiA+IHRZbWF4IHx8IHRZbWluID4gdG1heCkgcmV0dXJuIDA7XG4gICAgICAgIGlmICh0WW1pbiA+IHRtaW4pIHRtaW4gPSB0WW1pbjtcbiAgICAgICAgaWYgKHRZbWF4IDwgdG1heCkgdG1heCA9IHRZbWF4O1xuICAgICAgICB0Wm1pbiA9ICgoaW52ZGlyeiA+PSAwID8gbWluLnogOiBtYXgueikgLSBvcmlnaW4ueikgKiBpbnZkaXJ6O1xuICAgICAgICB0Wm1heCA9ICgoaW52ZGlyeiA+PSAwID8gbWF4LnogOiBtaW4ueikgLSBvcmlnaW4ueikgKiBpbnZkaXJ6O1xuICAgICAgICBpZiAodG1pbiA+IHRabWF4IHx8IHRabWluID4gdG1heCkgcmV0dXJuIDA7XG4gICAgICAgIGlmICh0Wm1pbiA+IHRtaW4pIHRtaW4gPSB0Wm1pbjtcbiAgICAgICAgaWYgKHRabWF4IDwgdG1heCkgdG1heCA9IHRabWF4O1xuICAgICAgICBpZiAodG1heCA8IDApIHJldHVybiAwO1xuICAgICAgICByZXR1cm4gdG1pbiA+PSAwID8gdG1pbiA6IHRtYXg7XG4gICAgfVxuXG4gICAgaW50ZXJzZWN0VHJpYW5nbGUoYSwgYiwgYywgYmFja2ZhY2VDdWxsaW5nID0gdHJ1ZSwgb3JpZ2luID0gdGhpcy5vcmlnaW4sIGRpcmVjdGlvbiA9IHRoaXMuZGlyZWN0aW9uLCBub3JtYWwgPSB0ZW1wVmVjM2cpIHtcbiAgICAgICAgLy8gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2Jsb2IvbWFzdGVyL3NyYy9tYXRoL1JheS5qc1xuICAgICAgICAvLyB3aGljaCBpcyBmcm9tIGh0dHA6Ly93d3cuZ2VvbWV0cmljdG9vbHMuY29tL0dURW5naW5lL0luY2x1ZGUvTWF0aGVtYXRpY3MvR3RlSW50clJheTNUcmlhbmdsZTMuaFxuICAgICAgICBjb25zdCBlZGdlMSA9IHRlbXBWZWMzaDtcbiAgICAgICAgY29uc3QgZWRnZTIgPSB0ZW1wVmVjM2k7XG4gICAgICAgIGNvbnN0IGRpZmYgPSB0ZW1wVmVjM2o7XG4gICAgICAgIGVkZ2UxLnN1YihiLCBhKTtcbiAgICAgICAgZWRnZTIuc3ViKGMsIGEpO1xuICAgICAgICBub3JtYWwuY3Jvc3MoZWRnZTEsIGVkZ2UyKTtcbiAgICAgICAgbGV0IERkTiA9IGRpcmVjdGlvbi5kb3Qobm9ybWFsKTtcbiAgICAgICAgaWYgKCFEZE4pIHJldHVybiAwO1xuICAgICAgICBsZXQgc2lnbjtcbiAgICAgICAgaWYgKERkTiA+IDApIHtcbiAgICAgICAgICAgIGlmIChiYWNrZmFjZUN1bGxpbmcpIHJldHVybiAwO1xuICAgICAgICAgICAgc2lnbiA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaWduID0gLTE7XG4gICAgICAgICAgICBEZE4gPSAtRGROO1xuICAgICAgICB9XG4gICAgICAgIGRpZmYuc3ViKG9yaWdpbiwgYSk7XG4gICAgICAgIGxldCBEZFF4RTIgPSBzaWduICogZGlyZWN0aW9uLmRvdChlZGdlMi5jcm9zcyhkaWZmLCBlZGdlMikpO1xuICAgICAgICBpZiAoRGRReEUyIDwgMCkgcmV0dXJuIDA7XG4gICAgICAgIGxldCBEZEUxeFEgPSBzaWduICogZGlyZWN0aW9uLmRvdChlZGdlMS5jcm9zcyhkaWZmKSk7XG4gICAgICAgIGlmIChEZEUxeFEgPCAwKSByZXR1cm4gMDtcbiAgICAgICAgaWYgKERkUXhFMiArIERkRTF4USA+IERkTikgcmV0dXJuIDA7XG4gICAgICAgIGxldCBRZE4gPSAtc2lnbiAqIGRpZmYuZG90KG5vcm1hbCk7XG4gICAgICAgIGlmIChRZE4gPCAwKSByZXR1cm4gMDtcbiAgICAgICAgcmV0dXJuIFFkTiAvIERkTjtcbiAgICB9XG5cbiAgICBnZXRCYXJ5Y29vcmQocG9pbnQsIGEsIGIsIGMsIHRhcmdldCA9IHRlbXBWZWMzaCkge1xuICAgICAgICAvLyBGcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9tYXN0ZXIvc3JjL21hdGgvVHJpYW5nbGUuanNcbiAgICAgICAgLy8gc3RhdGljL2luc3RhbmNlIG1ldGhvZCB0byBjYWxjdWxhdGUgYmFyeWNlbnRyaWMgY29vcmRpbmF0ZXNcbiAgICAgICAgLy8gYmFzZWQgb246IGh0dHA6Ly93d3cuYmxhY2twYXduLmNvbS90ZXh0cy9wb2ludGlucG9seS9kZWZhdWx0Lmh0bWxcbiAgICAgICAgY29uc3QgdjAgPSB0ZW1wVmVjM2k7XG4gICAgICAgIGNvbnN0IHYxID0gdGVtcFZlYzNqO1xuICAgICAgICBjb25zdCB2MiA9IHRlbXBWZWMzaztcbiAgICAgICAgdjAuc3ViKGMsIGEpO1xuICAgICAgICB2MS5zdWIoYiwgYSk7XG4gICAgICAgIHYyLnN1Yihwb2ludCwgYSk7XG4gICAgICAgIGNvbnN0IGRvdDAwID0gdjAuZG90KHYwKTtcbiAgICAgICAgY29uc3QgZG90MDEgPSB2MC5kb3QodjEpO1xuICAgICAgICBjb25zdCBkb3QwMiA9IHYwLmRvdCh2Mik7XG4gICAgICAgIGNvbnN0IGRvdDExID0gdjEuZG90KHYxKTtcbiAgICAgICAgY29uc3QgZG90MTIgPSB2MS5kb3QodjIpO1xuICAgICAgICBjb25zdCBkZW5vbSA9IGRvdDAwICogZG90MTEgLSBkb3QwMSAqIGRvdDAxO1xuICAgICAgICBpZiAoZGVub20gPT09IDApIHJldHVybiB0YXJnZXQuc2V0KC0yLCAtMSwgLTEpO1xuICAgICAgICBjb25zdCBpbnZEZW5vbSA9IDEgLyBkZW5vbTtcbiAgICAgICAgY29uc3QgdSA9IChkb3QxMSAqIGRvdDAyIC0gZG90MDEgKiBkb3QxMikgKiBpbnZEZW5vbTtcbiAgICAgICAgY29uc3QgdiA9IChkb3QwMCAqIGRvdDEyIC0gZG90MDEgKiBkb3QwMikgKiBpbnZEZW5vbTtcbiAgICAgICAgcmV0dXJuIHRhcmdldC5zZXQoMSAtIHUgLSB2LCB2LCB1KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBFdWxlckZ1bmMgZnJvbSAnLi9mdW5jdGlvbnMvRXVsZXJGdW5jLmpzJztcbmltcG9ydCB7IE1hdDQgfSBmcm9tICcuL01hdDQuanMnO1xuXG5jb25zdCB0bXBNYXQ0ID0gbmV3IE1hdDQoKTtcblxuZXhwb3J0IGNsYXNzIEV1bGVyIGV4dGVuZHMgQXJyYXkge1xuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0geCwgeiA9IHgsIG9yZGVyID0gJ1lYWicpIHtcbiAgICAgICAgc3VwZXIoeCwgeSwgeik7XG4gICAgICAgIHRoaXMub3JkZXIgPSBvcmRlcjtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9ICgpID0+IHt9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBnZXQgeCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbMF07XG4gICAgfVxuXG4gICAgZ2V0IHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzWzFdO1xuICAgIH1cblxuICAgIGdldCB6KCkge1xuICAgICAgICByZXR1cm4gdGhpc1syXTtcbiAgICB9XG5cbiAgICBzZXQgeCh2KSB7XG4gICAgICAgIHRoaXNbMF0gPSB2O1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgc2V0IHkodikge1xuICAgICAgICB0aGlzWzFdID0gdjtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSgpO1xuICAgIH1cblxuICAgIHNldCB6KHYpIHtcbiAgICAgICAgdGhpc1syXSA9IHY7XG4gICAgICAgIHRoaXMub25DaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBzZXQoeCwgeSA9IHgsIHogPSB4KSB7XG4gICAgICAgIGlmICh4Lmxlbmd0aCkgcmV0dXJuIHRoaXMuY29weSh4KTtcbiAgICAgICAgdGhpc1swXSA9IHg7XG4gICAgICAgIHRoaXNbMV0gPSB5O1xuICAgICAgICB0aGlzWzJdID0gejtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb3B5KHYpIHtcbiAgICAgICAgdGhpc1swXSA9IHZbMF07XG4gICAgICAgIHRoaXNbMV0gPSB2WzFdO1xuICAgICAgICB0aGlzWzJdID0gdlsyXTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZW9yZGVyKG9yZGVyKSB7XG4gICAgICAgIHRoaXMub3JkZXIgPSBvcmRlcjtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmcm9tUm90YXRpb25NYXRyaXgobSwgb3JkZXIgPSB0aGlzLm9yZGVyKSB7XG4gICAgICAgIEV1bGVyRnVuYy5mcm9tUm90YXRpb25NYXRyaXgodGhpcywgbSwgb3JkZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmcm9tUXVhdGVybmlvbihxLCBvcmRlciA9IHRoaXMub3JkZXIpIHtcbiAgICAgICAgdG1wTWF0NC5mcm9tUXVhdGVybmlvbihxKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJvbVJvdGF0aW9uTWF0cml4KHRtcE1hdDQsIG9yZGVyKTtcbiAgICB9XG5cbiAgICB0b0FycmF5KGEgPSBbXSwgbyA9IDApIHtcbiAgICAgICAgYVtvXSA9IHRoaXNbMF07XG4gICAgICAgIGFbbyArIDFdID0gdGhpc1sxXTtcbiAgICAgICAgYVtvICsgMl0gPSB0aGlzWzJdO1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBNYXQzRnVuYyBmcm9tICcuL2Z1bmN0aW9ucy9NYXQzRnVuYy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBNYXQzIGV4dGVuZHMgQXJyYXkge1xuICAgIGNvbnN0cnVjdG9yKG0wMCA9IDEsIG0wMSA9IDAsIG0wMiA9IDAsIG0xMCA9IDAsIG0xMSA9IDEsIG0xMiA9IDAsIG0yMCA9IDAsIG0yMSA9IDAsIG0yMiA9IDEpIHtcbiAgICAgICAgc3VwZXIobTAwLCBtMDEsIG0wMiwgbTEwLCBtMTEsIG0xMiwgbTIwLCBtMjEsIG0yMik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldChtMDAsIG0wMSwgbTAyLCBtMTAsIG0xMSwgbTEyLCBtMjAsIG0yMSwgbTIyKSB7XG4gICAgICAgIGlmIChtMDAubGVuZ3RoKSByZXR1cm4gdGhpcy5jb3B5KG0wMCk7XG4gICAgICAgIE1hdDNGdW5jLnNldCh0aGlzLCBtMDAsIG0wMSwgbTAyLCBtMTAsIG0xMSwgbTEyLCBtMjAsIG0yMSwgbTIyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlKHYsIG0gPSB0aGlzKSB7XG4gICAgICAgIE1hdDNGdW5jLnRyYW5zbGF0ZSh0aGlzLCBtLCB2KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcm90YXRlKHYsIG0gPSB0aGlzKSB7XG4gICAgICAgIE1hdDNGdW5jLnJvdGF0ZSh0aGlzLCBtLCB2KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2NhbGUodiwgbSA9IHRoaXMpIHtcbiAgICAgICAgTWF0M0Z1bmMuc2NhbGUodGhpcywgbSwgdik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIG11bHRpcGx5KG1hLCBtYikge1xuICAgICAgICBpZiAobWIpIHtcbiAgICAgICAgICAgIE1hdDNGdW5jLm11bHRpcGx5KHRoaXMsIG1hLCBtYik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBNYXQzRnVuYy5tdWx0aXBseSh0aGlzLCB0aGlzLCBtYSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWRlbnRpdHkoKSB7XG4gICAgICAgIE1hdDNGdW5jLmlkZW50aXR5KHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb3B5KG0pIHtcbiAgICAgICAgTWF0M0Z1bmMuY29weSh0aGlzLCBtKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnJvbU1hdHJpeDQobSkge1xuICAgICAgICBNYXQzRnVuYy5mcm9tTWF0NCh0aGlzLCBtKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnJvbVF1YXRlcm5pb24ocSkge1xuICAgICAgICBNYXQzRnVuYy5mcm9tUXVhdCh0aGlzLCBxKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnJvbUJhc2lzKHZlYzNhLCB2ZWMzYiwgdmVjM2MpIHtcbiAgICAgICAgdGhpcy5zZXQodmVjM2FbMF0sIHZlYzNhWzFdLCB2ZWMzYVsyXSwgdmVjM2JbMF0sIHZlYzNiWzFdLCB2ZWMzYlsyXSwgdmVjM2NbMF0sIHZlYzNjWzFdLCB2ZWMzY1syXSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGludmVyc2UobSA9IHRoaXMpIHtcbiAgICAgICAgTWF0M0Z1bmMuaW52ZXJ0KHRoaXMsIG0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBnZXROb3JtYWxNYXRyaXgobSkge1xuICAgICAgICBNYXQzRnVuYy5ub3JtYWxGcm9tTWF0NCh0aGlzLCBtKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgTWF0NEZ1bmMgZnJvbSAnLi9mdW5jdGlvbnMvTWF0NEZ1bmMuanMnO1xuXG5leHBvcnQgY2xhc3MgTWF0NCBleHRlbmRzIEFycmF5IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgbTAwID0gMSxcbiAgICAgICAgbTAxID0gMCxcbiAgICAgICAgbTAyID0gMCxcbiAgICAgICAgbTAzID0gMCxcbiAgICAgICAgbTEwID0gMCxcbiAgICAgICAgbTExID0gMSxcbiAgICAgICAgbTEyID0gMCxcbiAgICAgICAgbTEzID0gMCxcbiAgICAgICAgbTIwID0gMCxcbiAgICAgICAgbTIxID0gMCxcbiAgICAgICAgbTIyID0gMSxcbiAgICAgICAgbTIzID0gMCxcbiAgICAgICAgbTMwID0gMCxcbiAgICAgICAgbTMxID0gMCxcbiAgICAgICAgbTMyID0gMCxcbiAgICAgICAgbTMzID0gMVxuICAgICkge1xuICAgICAgICBzdXBlcihtMDAsIG0wMSwgbTAyLCBtMDMsIG0xMCwgbTExLCBtMTIsIG0xMywgbTIwLCBtMjEsIG0yMiwgbTIzLCBtMzAsIG0zMSwgbTMyLCBtMzMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBnZXQgeCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbMTJdO1xuICAgIH1cblxuICAgIGdldCB5KCkge1xuICAgICAgICByZXR1cm4gdGhpc1sxM107XG4gICAgfVxuXG4gICAgZ2V0IHooKSB7XG4gICAgICAgIHJldHVybiB0aGlzWzE0XTtcbiAgICB9XG5cbiAgICBnZXQgdygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbMTVdO1xuICAgIH1cblxuICAgIHNldCB4KHYpIHtcbiAgICAgICAgdGhpc1sxMl0gPSB2O1xuICAgIH1cblxuICAgIHNldCB5KHYpIHtcbiAgICAgICAgdGhpc1sxM10gPSB2O1xuICAgIH1cblxuICAgIHNldCB6KHYpIHtcbiAgICAgICAgdGhpc1sxNF0gPSB2O1xuICAgIH1cblxuICAgIHNldCB3KHYpIHtcbiAgICAgICAgdGhpc1sxNV0gPSB2O1xuICAgIH1cblxuICAgIHNldChtMDAsIG0wMSwgbTAyLCBtMDMsIG0xMCwgbTExLCBtMTIsIG0xMywgbTIwLCBtMjEsIG0yMiwgbTIzLCBtMzAsIG0zMSwgbTMyLCBtMzMpIHtcbiAgICAgICAgaWYgKG0wMC5sZW5ndGgpIHJldHVybiB0aGlzLmNvcHkobTAwKTtcbiAgICAgICAgTWF0NEZ1bmMuc2V0KHRoaXMsIG0wMCwgbTAxLCBtMDIsIG0wMywgbTEwLCBtMTEsIG0xMiwgbTEzLCBtMjAsIG0yMSwgbTIyLCBtMjMsIG0zMCwgbTMxLCBtMzIsIG0zMyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRyYW5zbGF0ZSh2LCBtID0gdGhpcykge1xuICAgICAgICBNYXQ0RnVuYy50cmFuc2xhdGUodGhpcywgbSwgdik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJvdGF0ZSh2LCBheGlzLCBtID0gdGhpcykge1xuICAgICAgICBNYXQ0RnVuYy5yb3RhdGUodGhpcywgbSwgdiwgYXhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNjYWxlKHYsIG0gPSB0aGlzKSB7XG4gICAgICAgIE1hdDRGdW5jLnNjYWxlKHRoaXMsIG0sIHR5cGVvZiB2ID09PSAnbnVtYmVyJyA/IFt2LCB2LCB2XSA6IHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBtdWx0aXBseShtYSwgbWIpIHtcbiAgICAgICAgaWYgKG1iKSB7XG4gICAgICAgICAgICBNYXQ0RnVuYy5tdWx0aXBseSh0aGlzLCBtYSwgbWIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgTWF0NEZ1bmMubXVsdGlwbHkodGhpcywgdGhpcywgbWEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlkZW50aXR5KCkge1xuICAgICAgICBNYXQ0RnVuYy5pZGVudGl0eSh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY29weShtKSB7XG4gICAgICAgIE1hdDRGdW5jLmNvcHkodGhpcywgbSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZyb21QZXJzcGVjdGl2ZSh7IGZvdiwgYXNwZWN0LCBuZWFyLCBmYXIgfSA9IHt9KSB7XG4gICAgICAgIE1hdDRGdW5jLnBlcnNwZWN0aXZlKHRoaXMsIGZvdiwgYXNwZWN0LCBuZWFyLCBmYXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmcm9tT3J0aG9nb25hbCh7IGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyIH0pIHtcbiAgICAgICAgTWF0NEZ1bmMub3J0aG8odGhpcywgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmcm9tUXVhdGVybmlvbihxKSB7XG4gICAgICAgIE1hdDRGdW5jLmZyb21RdWF0KHRoaXMsIHEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRQb3NpdGlvbih2KSB7XG4gICAgICAgIHRoaXMueCA9IHZbMF07XG4gICAgICAgIHRoaXMueSA9IHZbMV07XG4gICAgICAgIHRoaXMueiA9IHZbMl07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGludmVyc2UobSA9IHRoaXMpIHtcbiAgICAgICAgTWF0NEZ1bmMuaW52ZXJ0KHRoaXMsIG0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb21wb3NlKHEsIHBvcywgc2NhbGUpIHtcbiAgICAgICAgTWF0NEZ1bmMuZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZSh0aGlzLCBxLCBwb3MsIHNjYWxlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZ2V0Um90YXRpb24ocSkge1xuICAgICAgICBNYXQ0RnVuYy5nZXRSb3RhdGlvbihxLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZ2V0VHJhbnNsYXRpb24ocG9zKSB7XG4gICAgICAgIE1hdDRGdW5jLmdldFRyYW5zbGF0aW9uKHBvcywgdGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldFNjYWxpbmcoc2NhbGUpIHtcbiAgICAgICAgTWF0NEZ1bmMuZ2V0U2NhbGluZyhzY2FsZSwgdGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldE1heFNjYWxlT25BeGlzKCkge1xuICAgICAgICByZXR1cm4gTWF0NEZ1bmMuZ2V0TWF4U2NhbGVPbkF4aXModGhpcyk7XG4gICAgfVxuXG4gICAgbG9va0F0KGV5ZSwgdGFyZ2V0LCB1cCkge1xuICAgICAgICBNYXQ0RnVuYy50YXJnZXRUbyh0aGlzLCBleWUsIHRhcmdldCwgdXApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBkZXRlcm1pbmFudCgpIHtcbiAgICAgICAgcmV0dXJuIE1hdDRGdW5jLmRldGVybWluYW50KHRoaXMpO1xuICAgIH1cblxuICAgIGZyb21BcnJheShhLCBvID0gMCkge1xuICAgICAgICB0aGlzWzBdID0gYVtvXTtcbiAgICAgICAgdGhpc1sxXSA9IGFbbyArIDFdO1xuICAgICAgICB0aGlzWzJdID0gYVtvICsgMl07XG4gICAgICAgIHRoaXNbM10gPSBhW28gKyAzXTtcbiAgICAgICAgdGhpc1s0XSA9IGFbbyArIDRdO1xuICAgICAgICB0aGlzWzVdID0gYVtvICsgNV07XG4gICAgICAgIHRoaXNbNl0gPSBhW28gKyA2XTtcbiAgICAgICAgdGhpc1s3XSA9IGFbbyArIDddO1xuICAgICAgICB0aGlzWzhdID0gYVtvICsgOF07XG4gICAgICAgIHRoaXNbOV0gPSBhW28gKyA5XTtcbiAgICAgICAgdGhpc1sxMF0gPSBhW28gKyAxMF07XG4gICAgICAgIHRoaXNbMTFdID0gYVtvICsgMTFdO1xuICAgICAgICB0aGlzWzEyXSA9IGFbbyArIDEyXTtcbiAgICAgICAgdGhpc1sxM10gPSBhW28gKyAxM107XG4gICAgICAgIHRoaXNbMTRdID0gYVtvICsgMTRdO1xuICAgICAgICB0aGlzWzE1XSA9IGFbbyArIDE1XTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdG9BcnJheShhID0gW10sIG8gPSAwKSB7XG4gICAgICAgIGFbb10gPSB0aGlzWzBdO1xuICAgICAgICBhW28gKyAxXSA9IHRoaXNbMV07XG4gICAgICAgIGFbbyArIDJdID0gdGhpc1syXTtcbiAgICAgICAgYVtvICsgM10gPSB0aGlzWzNdO1xuICAgICAgICBhW28gKyA0XSA9IHRoaXNbNF07XG4gICAgICAgIGFbbyArIDVdID0gdGhpc1s1XTtcbiAgICAgICAgYVtvICsgNl0gPSB0aGlzWzZdO1xuICAgICAgICBhW28gKyA3XSA9IHRoaXNbN107XG4gICAgICAgIGFbbyArIDhdID0gdGhpc1s4XTtcbiAgICAgICAgYVtvICsgOV0gPSB0aGlzWzldO1xuICAgICAgICBhW28gKyAxMF0gPSB0aGlzWzEwXTtcbiAgICAgICAgYVtvICsgMTFdID0gdGhpc1sxMV07XG4gICAgICAgIGFbbyArIDEyXSA9IHRoaXNbMTJdO1xuICAgICAgICBhW28gKyAxM10gPSB0aGlzWzEzXTtcbiAgICAgICAgYVtvICsgMTRdID0gdGhpc1sxNF07XG4gICAgICAgIGFbbyArIDE1XSA9IHRoaXNbMTVdO1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBRdWF0RnVuYyBmcm9tICcuL2Z1bmN0aW9ucy9RdWF0RnVuYy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBRdWF0IGV4dGVuZHMgQXJyYXkge1xuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCwgeiA9IDAsIHcgPSAxKSB7XG4gICAgICAgIHN1cGVyKHgsIHksIHosIHcpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gKCkgPT4ge307XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldCB4KCkge1xuICAgICAgICByZXR1cm4gdGhpc1swXTtcbiAgICB9XG5cbiAgICBnZXQgeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbMV07XG4gICAgfVxuXG4gICAgZ2V0IHooKSB7XG4gICAgICAgIHJldHVybiB0aGlzWzJdO1xuICAgIH1cblxuICAgIGdldCB3KCkge1xuICAgICAgICByZXR1cm4gdGhpc1szXTtcbiAgICB9XG5cbiAgICBzZXQgeCh2KSB7XG4gICAgICAgIHRoaXNbMF0gPSB2O1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgc2V0IHkodikge1xuICAgICAgICB0aGlzWzFdID0gdjtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSgpO1xuICAgIH1cblxuICAgIHNldCB6KHYpIHtcbiAgICAgICAgdGhpc1syXSA9IHY7XG4gICAgICAgIHRoaXMub25DaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBzZXQgdyh2KSB7XG4gICAgICAgIHRoaXNbM10gPSB2O1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgaWRlbnRpdHkoKSB7XG4gICAgICAgIFF1YXRGdW5jLmlkZW50aXR5KHRoaXMpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldCh4LCB5LCB6LCB3KSB7XG4gICAgICAgIGlmICh4Lmxlbmd0aCkgcmV0dXJuIHRoaXMuY29weSh4KTtcbiAgICAgICAgUXVhdEZ1bmMuc2V0KHRoaXMsIHgsIHksIHosIHcpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJvdGF0ZVgoYSkge1xuICAgICAgICBRdWF0RnVuYy5yb3RhdGVYKHRoaXMsIHRoaXMsIGEpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJvdGF0ZVkoYSkge1xuICAgICAgICBRdWF0RnVuYy5yb3RhdGVZKHRoaXMsIHRoaXMsIGEpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJvdGF0ZVooYSkge1xuICAgICAgICBRdWF0RnVuYy5yb3RhdGVaKHRoaXMsIHRoaXMsIGEpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGludmVyc2UocSA9IHRoaXMpIHtcbiAgICAgICAgUXVhdEZ1bmMuaW52ZXJ0KHRoaXMsIHEpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNvbmp1Z2F0ZShxID0gdGhpcykge1xuICAgICAgICBRdWF0RnVuYy5jb25qdWdhdGUodGhpcywgcSk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY29weShxKSB7XG4gICAgICAgIFF1YXRGdW5jLmNvcHkodGhpcywgcSk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbm9ybWFsaXplKHEgPSB0aGlzKSB7XG4gICAgICAgIFF1YXRGdW5jLm5vcm1hbGl6ZSh0aGlzLCBxKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBtdWx0aXBseShxQSwgcUIpIHtcbiAgICAgICAgaWYgKHFCKSB7XG4gICAgICAgICAgICBRdWF0RnVuYy5tdWx0aXBseSh0aGlzLCBxQSwgcUIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgUXVhdEZ1bmMubXVsdGlwbHkodGhpcywgdGhpcywgcUEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25DaGFuZ2UoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZG90KHYpIHtcbiAgICAgICAgcmV0dXJuIFF1YXRGdW5jLmRvdCh0aGlzLCB2KTtcbiAgICB9XG5cbiAgICBmcm9tTWF0cml4MyhtYXRyaXgzKSB7XG4gICAgICAgIFF1YXRGdW5jLmZyb21NYXQzKHRoaXMsIG1hdHJpeDMpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZyb21FdWxlcihldWxlcikge1xuICAgICAgICBRdWF0RnVuYy5mcm9tRXVsZXIodGhpcywgZXVsZXIsIGV1bGVyLm9yZGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnJvbUF4aXNBbmdsZShheGlzLCBhKSB7XG4gICAgICAgIFF1YXRGdW5jLnNldEF4aXNBbmdsZSh0aGlzLCBheGlzLCBhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2xlcnAocSwgdCkge1xuICAgICAgICBRdWF0RnVuYy5zbGVycCh0aGlzLCB0aGlzLCBxLCB0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnJvbUFycmF5KGEsIG8gPSAwKSB7XG4gICAgICAgIHRoaXNbMF0gPSBhW29dO1xuICAgICAgICB0aGlzWzFdID0gYVtvICsgMV07XG4gICAgICAgIHRoaXNbMl0gPSBhW28gKyAyXTtcbiAgICAgICAgdGhpc1szXSA9IGFbbyArIDNdO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0b0FycmF5KGEgPSBbXSwgbyA9IDApIHtcbiAgICAgICAgYVtvXSA9IHRoaXNbMF07XG4gICAgICAgIGFbbyArIDFdID0gdGhpc1sxXTtcbiAgICAgICAgYVtvICsgMl0gPSB0aGlzWzJdO1xuICAgICAgICBhW28gKyAzXSA9IHRoaXNbM107XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFZlYzJGdW5jIGZyb20gJy4vZnVuY3Rpb25zL1ZlYzJGdW5jLmpzJztcblxuZXhwb3J0IGNsYXNzIFZlYzIgZXh0ZW5kcyBBcnJheSB7XG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSB4KSB7XG4gICAgICAgIHN1cGVyKHgsIHkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBnZXQgeCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbMF07XG4gICAgfVxuXG4gICAgZ2V0IHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzWzFdO1xuICAgIH1cblxuICAgIHNldCB4KHYpIHtcbiAgICAgICAgdGhpc1swXSA9IHY7XG4gICAgfVxuXG4gICAgc2V0IHkodikge1xuICAgICAgICB0aGlzWzFdID0gdjtcbiAgICB9XG5cbiAgICBzZXQoeCwgeSA9IHgpIHtcbiAgICAgICAgaWYgKHgubGVuZ3RoKSByZXR1cm4gdGhpcy5jb3B5KHgpO1xuICAgICAgICBWZWMyRnVuYy5zZXQodGhpcywgeCwgeSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNvcHkodikge1xuICAgICAgICBWZWMyRnVuYy5jb3B5KHRoaXMsIHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBhZGQodmEsIHZiKSB7XG4gICAgICAgIGlmICh2YikgVmVjMkZ1bmMuYWRkKHRoaXMsIHZhLCB2Yik7XG4gICAgICAgIGVsc2UgVmVjMkZ1bmMuYWRkKHRoaXMsIHRoaXMsIHZhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc3ViKHZhLCB2Yikge1xuICAgICAgICBpZiAodmIpIFZlYzJGdW5jLnN1YnRyYWN0KHRoaXMsIHZhLCB2Yik7XG4gICAgICAgIGVsc2UgVmVjMkZ1bmMuc3VidHJhY3QodGhpcywgdGhpcywgdmEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBtdWx0aXBseSh2KSB7XG4gICAgICAgIGlmICh2Lmxlbmd0aCkgVmVjMkZ1bmMubXVsdGlwbHkodGhpcywgdGhpcywgdik7XG4gICAgICAgIGVsc2UgVmVjMkZ1bmMuc2NhbGUodGhpcywgdGhpcywgdik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGRpdmlkZSh2KSB7XG4gICAgICAgIGlmICh2Lmxlbmd0aCkgVmVjMkZ1bmMuZGl2aWRlKHRoaXMsIHRoaXMsIHYpO1xuICAgICAgICBlbHNlIFZlYzJGdW5jLnNjYWxlKHRoaXMsIHRoaXMsIDEgLyB2KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaW52ZXJzZSh2ID0gdGhpcykge1xuICAgICAgICBWZWMyRnVuYy5pbnZlcnNlKHRoaXMsIHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBDYW4ndCB1c2UgJ2xlbmd0aCcgYXMgQXJyYXkucHJvdG90eXBlIHVzZXMgaXRcbiAgICBsZW4oKSB7XG4gICAgICAgIHJldHVybiBWZWMyRnVuYy5sZW5ndGgodGhpcyk7XG4gICAgfVxuXG4gICAgZGlzdGFuY2Uodikge1xuICAgICAgICBpZiAodikgcmV0dXJuIFZlYzJGdW5jLmRpc3RhbmNlKHRoaXMsIHYpO1xuICAgICAgICBlbHNlIHJldHVybiBWZWMyRnVuYy5sZW5ndGgodGhpcyk7XG4gICAgfVxuXG4gICAgc3F1YXJlZExlbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3F1YXJlZERpc3RhbmNlKCk7XG4gICAgfVxuXG4gICAgc3F1YXJlZERpc3RhbmNlKHYpIHtcbiAgICAgICAgaWYgKHYpIHJldHVybiBWZWMyRnVuYy5zcXVhcmVkRGlzdGFuY2UodGhpcywgdik7XG4gICAgICAgIGVsc2UgcmV0dXJuIFZlYzJGdW5jLnNxdWFyZWRMZW5ndGgodGhpcyk7XG4gICAgfVxuXG4gICAgbmVnYXRlKHYgPSB0aGlzKSB7XG4gICAgICAgIFZlYzJGdW5jLm5lZ2F0ZSh0aGlzLCB2KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY3Jvc3ModmEsIHZiKSB7XG4gICAgICAgIGlmICh2YikgcmV0dXJuIFZlYzJGdW5jLmNyb3NzKHZhLCB2Yik7XG4gICAgICAgIHJldHVybiBWZWMyRnVuYy5jcm9zcyh0aGlzLCB2YSk7XG4gICAgfVxuXG4gICAgc2NhbGUodikge1xuICAgICAgICBWZWMyRnVuYy5zY2FsZSh0aGlzLCB0aGlzLCB2KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbm9ybWFsaXplKCkge1xuICAgICAgICBWZWMyRnVuYy5ub3JtYWxpemUodGhpcywgdGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGRvdCh2KSB7XG4gICAgICAgIHJldHVybiBWZWMyRnVuYy5kb3QodGhpcywgdik7XG4gICAgfVxuXG4gICAgZXF1YWxzKHYpIHtcbiAgICAgICAgcmV0dXJuIFZlYzJGdW5jLmV4YWN0RXF1YWxzKHRoaXMsIHYpO1xuICAgIH1cblxuICAgIGFwcGx5TWF0cml4MyhtYXQzKSB7XG4gICAgICAgIFZlYzJGdW5jLnRyYW5zZm9ybU1hdDModGhpcywgdGhpcywgbWF0Myk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGFwcGx5TWF0cml4NChtYXQ0KSB7XG4gICAgICAgIFZlYzJGdW5jLnRyYW5zZm9ybU1hdDQodGhpcywgdGhpcywgbWF0NCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGxlcnAodiwgYSkge1xuICAgICAgICBWZWMyRnVuYy5sZXJwKHRoaXMsIHRoaXMsIHYsIGEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjbG9uZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXNbMF0sIHRoaXNbMV0pO1xuICAgIH1cblxuICAgIGZyb21BcnJheShhLCBvID0gMCkge1xuICAgICAgICB0aGlzWzBdID0gYVtvXTtcbiAgICAgICAgdGhpc1sxXSA9IGFbbyArIDFdO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0b0FycmF5KGEgPSBbXSwgbyA9IDApIHtcbiAgICAgICAgYVtvXSA9IHRoaXNbMF07XG4gICAgICAgIGFbbyArIDFdID0gdGhpc1sxXTtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgVmVjM0Z1bmMgZnJvbSAnLi9mdW5jdGlvbnMvVmVjM0Z1bmMuanMnO1xuXG5leHBvcnQgY2xhc3MgVmVjMyBleHRlbmRzIEFycmF5IHtcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IHgsIHogPSB4KSB7XG4gICAgICAgIHN1cGVyKHgsIHksIHopO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBnZXQgeCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbMF07XG4gICAgfVxuXG4gICAgZ2V0IHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzWzFdO1xuICAgIH1cblxuICAgIGdldCB6KCkge1xuICAgICAgICByZXR1cm4gdGhpc1syXTtcbiAgICB9XG5cbiAgICBzZXQgeCh2KSB7XG4gICAgICAgIHRoaXNbMF0gPSB2O1xuICAgIH1cblxuICAgIHNldCB5KHYpIHtcbiAgICAgICAgdGhpc1sxXSA9IHY7XG4gICAgfVxuXG4gICAgc2V0IHoodikge1xuICAgICAgICB0aGlzWzJdID0gdjtcbiAgICB9XG5cbiAgICBzZXQoeCwgeSA9IHgsIHogPSB4KSB7XG4gICAgICAgIGlmICh4Lmxlbmd0aCkgcmV0dXJuIHRoaXMuY29weSh4KTtcbiAgICAgICAgVmVjM0Z1bmMuc2V0KHRoaXMsIHgsIHksIHopO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb3B5KHYpIHtcbiAgICAgICAgVmVjM0Z1bmMuY29weSh0aGlzLCB2KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgYWRkKHZhLCB2Yikge1xuICAgICAgICBpZiAodmIpIFZlYzNGdW5jLmFkZCh0aGlzLCB2YSwgdmIpO1xuICAgICAgICBlbHNlIFZlYzNGdW5jLmFkZCh0aGlzLCB0aGlzLCB2YSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHN1Yih2YSwgdmIpIHtcbiAgICAgICAgaWYgKHZiKSBWZWMzRnVuYy5zdWJ0cmFjdCh0aGlzLCB2YSwgdmIpO1xuICAgICAgICBlbHNlIFZlYzNGdW5jLnN1YnRyYWN0KHRoaXMsIHRoaXMsIHZhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbXVsdGlwbHkodikge1xuICAgICAgICBpZiAodi5sZW5ndGgpIFZlYzNGdW5jLm11bHRpcGx5KHRoaXMsIHRoaXMsIHYpO1xuICAgICAgICBlbHNlIFZlYzNGdW5jLnNjYWxlKHRoaXMsIHRoaXMsIHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBkaXZpZGUodikge1xuICAgICAgICBpZiAodi5sZW5ndGgpIFZlYzNGdW5jLmRpdmlkZSh0aGlzLCB0aGlzLCB2KTtcbiAgICAgICAgZWxzZSBWZWMzRnVuYy5zY2FsZSh0aGlzLCB0aGlzLCAxIC8gdik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGludmVyc2UodiA9IHRoaXMpIHtcbiAgICAgICAgVmVjM0Z1bmMuaW52ZXJzZSh0aGlzLCB2KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gQ2FuJ3QgdXNlICdsZW5ndGgnIGFzIEFycmF5LnByb3RvdHlwZSB1c2VzIGl0XG4gICAgbGVuKCkge1xuICAgICAgICByZXR1cm4gVmVjM0Z1bmMubGVuZ3RoKHRoaXMpO1xuICAgIH1cblxuICAgIGRpc3RhbmNlKHYpIHtcbiAgICAgICAgaWYgKHYpIHJldHVybiBWZWMzRnVuYy5kaXN0YW5jZSh0aGlzLCB2KTtcbiAgICAgICAgZWxzZSByZXR1cm4gVmVjM0Z1bmMubGVuZ3RoKHRoaXMpO1xuICAgIH1cblxuICAgIHNxdWFyZWRMZW4oKSB7XG4gICAgICAgIHJldHVybiBWZWMzRnVuYy5zcXVhcmVkTGVuZ3RoKHRoaXMpO1xuICAgIH1cblxuICAgIHNxdWFyZWREaXN0YW5jZSh2KSB7XG4gICAgICAgIGlmICh2KSByZXR1cm4gVmVjM0Z1bmMuc3F1YXJlZERpc3RhbmNlKHRoaXMsIHYpO1xuICAgICAgICBlbHNlIHJldHVybiBWZWMzRnVuYy5zcXVhcmVkTGVuZ3RoKHRoaXMpO1xuICAgIH1cblxuICAgIG5lZ2F0ZSh2ID0gdGhpcykge1xuICAgICAgICBWZWMzRnVuYy5uZWdhdGUodGhpcywgdik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNyb3NzKHZhLCB2Yikge1xuICAgICAgICBpZiAodmIpIFZlYzNGdW5jLmNyb3NzKHRoaXMsIHZhLCB2Yik7XG4gICAgICAgIGVsc2UgVmVjM0Z1bmMuY3Jvc3ModGhpcywgdGhpcywgdmEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzY2FsZSh2KSB7XG4gICAgICAgIFZlYzNGdW5jLnNjYWxlKHRoaXMsIHRoaXMsIHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBub3JtYWxpemUoKSB7XG4gICAgICAgIFZlYzNGdW5jLm5vcm1hbGl6ZSh0aGlzLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZG90KHYpIHtcbiAgICAgICAgcmV0dXJuIFZlYzNGdW5jLmRvdCh0aGlzLCB2KTtcbiAgICB9XG5cbiAgICBlcXVhbHModikge1xuICAgICAgICByZXR1cm4gVmVjM0Z1bmMuZXhhY3RFcXVhbHModGhpcywgdik7XG4gICAgfVxuXG4gICAgYXBwbHlNYXRyaXgzKG1hdDMpIHtcbiAgICAgICAgVmVjM0Z1bmMudHJhbnNmb3JtTWF0Myh0aGlzLCB0aGlzLCBtYXQzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgYXBwbHlNYXRyaXg0KG1hdDQpIHtcbiAgICAgICAgVmVjM0Z1bmMudHJhbnNmb3JtTWF0NCh0aGlzLCB0aGlzLCBtYXQ0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2NhbGVSb3RhdGVNYXRyaXg0KG1hdDQpIHtcbiAgICAgICAgVmVjM0Z1bmMuc2NhbGVSb3RhdGVNYXQ0KHRoaXMsIHRoaXMsIG1hdDQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBhcHBseVF1YXRlcm5pb24ocSkge1xuICAgICAgICBWZWMzRnVuYy50cmFuc2Zvcm1RdWF0KHRoaXMsIHRoaXMsIHEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBhbmdsZSh2KSB7XG4gICAgICAgIHJldHVybiBWZWMzRnVuYy5hbmdsZSh0aGlzLCB2KTtcbiAgICB9XG5cbiAgICBsZXJwKHYsIHQpIHtcbiAgICAgICAgVmVjM0Z1bmMubGVycCh0aGlzLCB0aGlzLCB2LCB0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjMyh0aGlzWzBdLCB0aGlzWzFdLCB0aGlzWzJdKTtcbiAgICB9XG5cbiAgICBmcm9tQXJyYXkoYSwgbyA9IDApIHtcbiAgICAgICAgdGhpc1swXSA9IGFbb107XG4gICAgICAgIHRoaXNbMV0gPSBhW28gKyAxXTtcbiAgICAgICAgdGhpc1syXSA9IGFbbyArIDJdO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0b0FycmF5KGEgPSBbXSwgbyA9IDApIHtcbiAgICAgICAgYVtvXSA9IHRoaXNbMF07XG4gICAgICAgIGFbbyArIDFdID0gdGhpc1sxXTtcbiAgICAgICAgYVtvICsgMl0gPSB0aGlzWzJdO1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG5cbiAgICB0cmFuc2Zvcm1EaXJlY3Rpb24obWF0NCkge1xuICAgICAgICBjb25zdCB4ID0gdGhpc1swXTtcbiAgICAgICAgY29uc3QgeSA9IHRoaXNbMV07XG4gICAgICAgIGNvbnN0IHogPSB0aGlzWzJdO1xuXG4gICAgICAgIHRoaXNbMF0gPSBtYXQ0WzBdICogeCArIG1hdDRbNF0gKiB5ICsgbWF0NFs4XSAqIHo7XG4gICAgICAgIHRoaXNbMV0gPSBtYXQ0WzFdICogeCArIG1hdDRbNV0gKiB5ICsgbWF0NFs5XSAqIHo7XG4gICAgICAgIHRoaXNbMl0gPSBtYXQ0WzJdICogeCArIG1hdDRbNl0gKiB5ICsgbWF0NFsxMF0gKiB6O1xuXG4gICAgICAgIHJldHVybiB0aGlzLm5vcm1hbGl6ZSgpO1xuICAgIH1cbn1cbiIsIi8vIGFzc3VtZXMgdGhlIHVwcGVyIDN4MyBvZiBtIGlzIGEgcHVyZSByb3RhdGlvbiBtYXRyaXggKGkuZSwgdW5zY2FsZWQpXG5leHBvcnQgZnVuY3Rpb24gZnJvbVJvdGF0aW9uTWF0cml4KG91dCwgbSwgb3JkZXIgPSAnWVhaJykge1xuICAgIGlmIChvcmRlciA9PT0gJ1hZWicpIHtcbiAgICAgICAgb3V0WzFdID0gTWF0aC5hc2luKE1hdGgubWluKE1hdGgubWF4KG1bOF0sIC0xKSwgMSkpO1xuICAgICAgICBpZiAoTWF0aC5hYnMobVs4XSkgPCAwLjk5OTk5KSB7XG4gICAgICAgICAgICBvdXRbMF0gPSBNYXRoLmF0YW4yKC1tWzldLCBtWzEwXSk7XG4gICAgICAgICAgICBvdXRbMl0gPSBNYXRoLmF0YW4yKC1tWzRdLCBtWzBdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dFswXSA9IE1hdGguYXRhbjIobVs2XSwgbVs1XSk7XG4gICAgICAgICAgICBvdXRbMl0gPSAwO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChvcmRlciA9PT0gJ1lYWicpIHtcbiAgICAgICAgb3V0WzBdID0gTWF0aC5hc2luKC1NYXRoLm1pbihNYXRoLm1heChtWzldLCAtMSksIDEpKTtcbiAgICAgICAgaWYgKE1hdGguYWJzKG1bOV0pIDwgMC45OTk5OSkge1xuICAgICAgICAgICAgb3V0WzFdID0gTWF0aC5hdGFuMihtWzhdLCBtWzEwXSk7XG4gICAgICAgICAgICBvdXRbMl0gPSBNYXRoLmF0YW4yKG1bMV0sIG1bNV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0WzFdID0gTWF0aC5hdGFuMigtbVsyXSwgbVswXSk7XG4gICAgICAgICAgICBvdXRbMl0gPSAwO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChvcmRlciA9PT0gJ1pYWScpIHtcbiAgICAgICAgb3V0WzBdID0gTWF0aC5hc2luKE1hdGgubWluKE1hdGgubWF4KG1bNl0sIC0xKSwgMSkpO1xuICAgICAgICBpZiAoTWF0aC5hYnMobVs2XSkgPCAwLjk5OTk5KSB7XG4gICAgICAgICAgICBvdXRbMV0gPSBNYXRoLmF0YW4yKC1tWzJdLCBtWzEwXSk7XG4gICAgICAgICAgICBvdXRbMl0gPSBNYXRoLmF0YW4yKC1tWzRdLCBtWzVdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dFsxXSA9IDA7XG4gICAgICAgICAgICBvdXRbMl0gPSBNYXRoLmF0YW4yKG1bMV0sIG1bMF0pO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChvcmRlciA9PT0gJ1pZWCcpIHtcbiAgICAgICAgb3V0WzFdID0gTWF0aC5hc2luKC1NYXRoLm1pbihNYXRoLm1heChtWzJdLCAtMSksIDEpKTtcbiAgICAgICAgaWYgKE1hdGguYWJzKG1bMl0pIDwgMC45OTk5OSkge1xuICAgICAgICAgICAgb3V0WzBdID0gTWF0aC5hdGFuMihtWzZdLCBtWzEwXSk7XG4gICAgICAgICAgICBvdXRbMl0gPSBNYXRoLmF0YW4yKG1bMV0sIG1bMF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0WzBdID0gMDtcbiAgICAgICAgICAgIG91dFsyXSA9IE1hdGguYXRhbjIoLW1bNF0sIG1bNV0pO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChvcmRlciA9PT0gJ1laWCcpIHtcbiAgICAgICAgb3V0WzJdID0gTWF0aC5hc2luKE1hdGgubWluKE1hdGgubWF4KG1bMV0sIC0xKSwgMSkpO1xuICAgICAgICBpZiAoTWF0aC5hYnMobVsxXSkgPCAwLjk5OTk5KSB7XG4gICAgICAgICAgICBvdXRbMF0gPSBNYXRoLmF0YW4yKC1tWzldLCBtWzVdKTtcbiAgICAgICAgICAgIG91dFsxXSA9IE1hdGguYXRhbjIoLW1bMl0sIG1bMF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0WzBdID0gMDtcbiAgICAgICAgICAgIG91dFsxXSA9IE1hdGguYXRhbjIobVs4XSwgbVsxMF0pO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChvcmRlciA9PT0gJ1haWScpIHtcbiAgICAgICAgb3V0WzJdID0gTWF0aC5hc2luKC1NYXRoLm1pbihNYXRoLm1heChtWzRdLCAtMSksIDEpKTtcbiAgICAgICAgaWYgKE1hdGguYWJzKG1bNF0pIDwgMC45OTk5OSkge1xuICAgICAgICAgICAgb3V0WzBdID0gTWF0aC5hdGFuMihtWzZdLCBtWzVdKTtcbiAgICAgICAgICAgIG91dFsxXSA9IE1hdGguYXRhbjIobVs4XSwgbVswXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXRbMF0gPSBNYXRoLmF0YW4yKC1tWzldLCBtWzEwXSk7XG4gICAgICAgICAgICBvdXRbMV0gPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn1cbiIsImNvbnN0IEVQU0lMT04gPSAwLjAwMDAwMTtcblxuLyoqXG4gKiBDb3BpZXMgdGhlIHVwcGVyLWxlZnQgM3gzIHZhbHVlcyBpbnRvIHRoZSBnaXZlbiBtYXQzLlxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgM3gzIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhICAgdGhlIHNvdXJjZSA0eDQgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmcm9tTWF0NChvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzRdO1xuICAgIG91dFs0XSA9IGFbNV07XG4gICAgb3V0WzVdID0gYVs2XTtcbiAgICBvdXRbNl0gPSBhWzhdO1xuICAgIG91dFs3XSA9IGFbOV07XG4gICAgb3V0WzhdID0gYVsxMF07XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIGEgM3gzIG1hdHJpeCBmcm9tIHRoZSBnaXZlbiBxdWF0ZXJuaW9uXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgbWF0MyByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0fSBxIFF1YXRlcm5pb24gdG8gY3JlYXRlIG1hdHJpeCBmcm9tXG4gKlxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gZnJvbVF1YXQob3V0LCBxKSB7XG4gICAgbGV0IHggPSBxWzBdLFxuICAgICAgICB5ID0gcVsxXSxcbiAgICAgICAgeiA9IHFbMl0sXG4gICAgICAgIHcgPSBxWzNdO1xuICAgIGxldCB4MiA9IHggKyB4O1xuICAgIGxldCB5MiA9IHkgKyB5O1xuICAgIGxldCB6MiA9IHogKyB6O1xuXG4gICAgbGV0IHh4ID0geCAqIHgyO1xuICAgIGxldCB5eCA9IHkgKiB4MjtcbiAgICBsZXQgeXkgPSB5ICogeTI7XG4gICAgbGV0IHp4ID0geiAqIHgyO1xuICAgIGxldCB6eSA9IHogKiB5MjtcbiAgICBsZXQgenogPSB6ICogejI7XG4gICAgbGV0IHd4ID0gdyAqIHgyO1xuICAgIGxldCB3eSA9IHcgKiB5MjtcbiAgICBsZXQgd3ogPSB3ICogejI7XG5cbiAgICBvdXRbMF0gPSAxIC0geXkgLSB6ejtcbiAgICBvdXRbM10gPSB5eCAtIHd6O1xuICAgIG91dFs2XSA9IHp4ICsgd3k7XG5cbiAgICBvdXRbMV0gPSB5eCArIHd6O1xuICAgIG91dFs0XSA9IDEgLSB4eCAtIHp6O1xuICAgIG91dFs3XSA9IHp5IC0gd3g7XG5cbiAgICBvdXRbMl0gPSB6eCAtIHd5O1xuICAgIG91dFs1XSA9IHp5ICsgd3g7XG4gICAgb3V0WzhdID0gMSAtIHh4IC0geXk7XG5cbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSBtYXQzIHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5KG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgb3V0WzRdID0gYVs0XTtcbiAgICBvdXRbNV0gPSBhWzVdO1xuICAgIG91dFs2XSA9IGFbNl07XG4gICAgb3V0WzddID0gYVs3XTtcbiAgICBvdXRbOF0gPSBhWzhdO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgbWF0MyB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldChvdXQsIG0wMCwgbTAxLCBtMDIsIG0xMCwgbTExLCBtMTIsIG0yMCwgbTIxLCBtMjIpIHtcbiAgICBvdXRbMF0gPSBtMDA7XG4gICAgb3V0WzFdID0gbTAxO1xuICAgIG91dFsyXSA9IG0wMjtcbiAgICBvdXRbM10gPSBtMTA7XG4gICAgb3V0WzRdID0gbTExO1xuICAgIG91dFs1XSA9IG0xMjtcbiAgICBvdXRbNl0gPSBtMjA7XG4gICAgb3V0WzddID0gbTIxO1xuICAgIG91dFs4XSA9IG0yMjtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFNldCBhIG1hdDMgdG8gdGhlIGlkZW50aXR5IG1hdHJpeFxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpZGVudGl0eShvdXQpIHtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDE7XG4gICAgb3V0WzVdID0gMDtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFRyYW5zcG9zZSB0aGUgdmFsdWVzIG9mIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zcG9zZShvdXQsIGEpIHtcbiAgICAvLyBJZiB3ZSBhcmUgdHJhbnNwb3Npbmcgb3Vyc2VsdmVzIHdlIGNhbiBza2lwIGEgZmV3IHN0ZXBzIGJ1dCBoYXZlIHRvIGNhY2hlIHNvbWUgdmFsdWVzXG4gICAgaWYgKG91dCA9PT0gYSkge1xuICAgICAgICBsZXQgYTAxID0gYVsxXSxcbiAgICAgICAgICAgIGEwMiA9IGFbMl0sXG4gICAgICAgICAgICBhMTIgPSBhWzVdO1xuICAgICAgICBvdXRbMV0gPSBhWzNdO1xuICAgICAgICBvdXRbMl0gPSBhWzZdO1xuICAgICAgICBvdXRbM10gPSBhMDE7XG4gICAgICAgIG91dFs1XSA9IGFbN107XG4gICAgICAgIG91dFs2XSA9IGEwMjtcbiAgICAgICAgb3V0WzddID0gYTEyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG91dFswXSA9IGFbMF07XG4gICAgICAgIG91dFsxXSA9IGFbM107XG4gICAgICAgIG91dFsyXSA9IGFbNl07XG4gICAgICAgIG91dFszXSA9IGFbMV07XG4gICAgICAgIG91dFs0XSA9IGFbNF07XG4gICAgICAgIG91dFs1XSA9IGFbN107XG4gICAgICAgIG91dFs2XSA9IGFbMl07XG4gICAgICAgIG91dFs3XSA9IGFbNV07XG4gICAgICAgIG91dFs4XSA9IGFbOF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBJbnZlcnRzIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludmVydChvdXQsIGEpIHtcbiAgICBsZXQgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXTtcbiAgICBsZXQgYTEwID0gYVszXSxcbiAgICAgICAgYTExID0gYVs0XSxcbiAgICAgICAgYTEyID0gYVs1XTtcbiAgICBsZXQgYTIwID0gYVs2XSxcbiAgICAgICAgYTIxID0gYVs3XSxcbiAgICAgICAgYTIyID0gYVs4XTtcblxuICAgIGxldCBiMDEgPSBhMjIgKiBhMTEgLSBhMTIgKiBhMjE7XG4gICAgbGV0IGIxMSA9IC1hMjIgKiBhMTAgKyBhMTIgKiBhMjA7XG4gICAgbGV0IGIyMSA9IGEyMSAqIGExMCAtIGExMSAqIGEyMDtcblxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcbiAgICBsZXQgZGV0ID0gYTAwICogYjAxICsgYTAxICogYjExICsgYTAyICogYjIxO1xuXG4gICAgaWYgKCFkZXQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGRldCA9IDEuMCAvIGRldDtcblxuICAgIG91dFswXSA9IGIwMSAqIGRldDtcbiAgICBvdXRbMV0gPSAoLWEyMiAqIGEwMSArIGEwMiAqIGEyMSkgKiBkZXQ7XG4gICAgb3V0WzJdID0gKGExMiAqIGEwMSAtIGEwMiAqIGExMSkgKiBkZXQ7XG4gICAgb3V0WzNdID0gYjExICogZGV0O1xuICAgIG91dFs0XSA9IChhMjIgKiBhMDAgLSBhMDIgKiBhMjApICogZGV0O1xuICAgIG91dFs1XSA9ICgtYTEyICogYTAwICsgYTAyICogYTEwKSAqIGRldDtcbiAgICBvdXRbNl0gPSBiMjEgKiBkZXQ7XG4gICAgb3V0WzddID0gKC1hMjEgKiBhMDAgKyBhMDEgKiBhMjApICogZGV0O1xuICAgIG91dFs4XSA9IChhMTEgKiBhMDAgLSBhMDEgKiBhMTApICogZGV0O1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZGV0ZXJtaW5hbnQgb2YgYSBtYXQzXG4gKlxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkZXRlcm1pbmFudCBvZiBhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZXRlcm1pbmFudChhKSB7XG4gICAgbGV0IGEwMCA9IGFbMF0sXG4gICAgICAgIGEwMSA9IGFbMV0sXG4gICAgICAgIGEwMiA9IGFbMl07XG4gICAgbGV0IGExMCA9IGFbM10sXG4gICAgICAgIGExMSA9IGFbNF0sXG4gICAgICAgIGExMiA9IGFbNV07XG4gICAgbGV0IGEyMCA9IGFbNl0sXG4gICAgICAgIGEyMSA9IGFbN10sXG4gICAgICAgIGEyMiA9IGFbOF07XG5cbiAgICByZXR1cm4gYTAwICogKGEyMiAqIGExMSAtIGExMiAqIGEyMSkgKyBhMDEgKiAoLWEyMiAqIGExMCArIGExMiAqIGEyMCkgKyBhMDIgKiAoYTIxICogYTEwIC0gYTExICogYTIwKTtcbn1cblxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byBtYXQzJ3NcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge21hdDN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aXBseShvdXQsIGEsIGIpIHtcbiAgICBsZXQgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXTtcbiAgICBsZXQgYTEwID0gYVszXSxcbiAgICAgICAgYTExID0gYVs0XSxcbiAgICAgICAgYTEyID0gYVs1XTtcbiAgICBsZXQgYTIwID0gYVs2XSxcbiAgICAgICAgYTIxID0gYVs3XSxcbiAgICAgICAgYTIyID0gYVs4XTtcblxuICAgIGxldCBiMDAgPSBiWzBdLFxuICAgICAgICBiMDEgPSBiWzFdLFxuICAgICAgICBiMDIgPSBiWzJdO1xuICAgIGxldCBiMTAgPSBiWzNdLFxuICAgICAgICBiMTEgPSBiWzRdLFxuICAgICAgICBiMTIgPSBiWzVdO1xuICAgIGxldCBiMjAgPSBiWzZdLFxuICAgICAgICBiMjEgPSBiWzddLFxuICAgICAgICBiMjIgPSBiWzhdO1xuXG4gICAgb3V0WzBdID0gYjAwICogYTAwICsgYjAxICogYTEwICsgYjAyICogYTIwO1xuICAgIG91dFsxXSA9IGIwMCAqIGEwMSArIGIwMSAqIGExMSArIGIwMiAqIGEyMTtcbiAgICBvdXRbMl0gPSBiMDAgKiBhMDIgKyBiMDEgKiBhMTIgKyBiMDIgKiBhMjI7XG5cbiAgICBvdXRbM10gPSBiMTAgKiBhMDAgKyBiMTEgKiBhMTAgKyBiMTIgKiBhMjA7XG4gICAgb3V0WzRdID0gYjEwICogYTAxICsgYjExICogYTExICsgYjEyICogYTIxO1xuICAgIG91dFs1XSA9IGIxMCAqIGEwMiArIGIxMSAqIGExMiArIGIxMiAqIGEyMjtcblxuICAgIG91dFs2XSA9IGIyMCAqIGEwMCArIGIyMSAqIGExMCArIGIyMiAqIGEyMDtcbiAgICBvdXRbN10gPSBiMjAgKiBhMDEgKyBiMjEgKiBhMTEgKyBiMjIgKiBhMjE7XG4gICAgb3V0WzhdID0gYjIwICogYTAyICsgYjIxICogYTEyICsgYjIyICogYTIyO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogVHJhbnNsYXRlIGEgbWF0MyBieSB0aGUgZ2l2ZW4gdmVjdG9yXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgbWF0cml4IHRvIHRyYW5zbGF0ZVxuICogQHBhcmFtIHt2ZWMyfSB2IHZlY3RvciB0byB0cmFuc2xhdGUgYnlcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZShvdXQsIGEsIHYpIHtcbiAgICBsZXQgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTEwID0gYVszXSxcbiAgICAgICAgYTExID0gYVs0XSxcbiAgICAgICAgYTEyID0gYVs1XSxcbiAgICAgICAgYTIwID0gYVs2XSxcbiAgICAgICAgYTIxID0gYVs3XSxcbiAgICAgICAgYTIyID0gYVs4XSxcbiAgICAgICAgeCA9IHZbMF0sXG4gICAgICAgIHkgPSB2WzFdO1xuXG4gICAgb3V0WzBdID0gYTAwO1xuICAgIG91dFsxXSA9IGEwMTtcbiAgICBvdXRbMl0gPSBhMDI7XG5cbiAgICBvdXRbM10gPSBhMTA7XG4gICAgb3V0WzRdID0gYTExO1xuICAgIG91dFs1XSA9IGExMjtcblxuICAgIG91dFs2XSA9IHggKiBhMDAgKyB5ICogYTEwICsgYTIwO1xuICAgIG91dFs3XSA9IHggKiBhMDEgKyB5ICogYTExICsgYTIxO1xuICAgIG91dFs4XSA9IHggKiBhMDIgKyB5ICogYTEyICsgYTIyO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdDMgYnkgdGhlIGdpdmVuIGFuZ2xlXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZShvdXQsIGEsIHJhZCkge1xuICAgIGxldCBhMDAgPSBhWzBdLFxuICAgICAgICBhMDEgPSBhWzFdLFxuICAgICAgICBhMDIgPSBhWzJdLFxuICAgICAgICBhMTAgPSBhWzNdLFxuICAgICAgICBhMTEgPSBhWzRdLFxuICAgICAgICBhMTIgPSBhWzVdLFxuICAgICAgICBhMjAgPSBhWzZdLFxuICAgICAgICBhMjEgPSBhWzddLFxuICAgICAgICBhMjIgPSBhWzhdLFxuICAgICAgICBzID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgICAgYyA9IE1hdGguY29zKHJhZCk7XG5cbiAgICBvdXRbMF0gPSBjICogYTAwICsgcyAqIGExMDtcbiAgICBvdXRbMV0gPSBjICogYTAxICsgcyAqIGExMTtcbiAgICBvdXRbMl0gPSBjICogYTAyICsgcyAqIGExMjtcblxuICAgIG91dFszXSA9IGMgKiBhMTAgLSBzICogYTAwO1xuICAgIG91dFs0XSA9IGMgKiBhMTEgLSBzICogYTAxO1xuICAgIG91dFs1XSA9IGMgKiBhMTIgLSBzICogYTAyO1xuXG4gICAgb3V0WzZdID0gYTIwO1xuICAgIG91dFs3XSA9IGEyMTtcbiAgICBvdXRbOF0gPSBhMjI7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBTY2FsZXMgdGhlIG1hdDMgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzJcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge3ZlYzJ9IHYgdGhlIHZlYzIgdG8gc2NhbGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDN9IG91dFxuICoqL1xuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlKG91dCwgYSwgdikge1xuICAgIGxldCB4ID0gdlswXSxcbiAgICAgICAgeSA9IHZbMV07XG5cbiAgICBvdXRbMF0gPSB4ICogYVswXTtcbiAgICBvdXRbMV0gPSB4ICogYVsxXTtcbiAgICBvdXRbMl0gPSB4ICogYVsyXTtcblxuICAgIG91dFszXSA9IHkgKiBhWzNdO1xuICAgIG91dFs0XSA9IHkgKiBhWzRdO1xuICAgIG91dFs1XSA9IHkgKiBhWzVdO1xuXG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIG91dFs4XSA9IGFbOF07XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIGEgM3gzIG5vcm1hbCBtYXRyaXggKHRyYW5zcG9zZSBpbnZlcnNlKSBmcm9tIHRoZSA0eDQgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgbWF0MyByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHttYXQ0fSBhIE1hdDQgdG8gZGVyaXZlIHRoZSBub3JtYWwgbWF0cml4IGZyb21cbiAqXG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxGcm9tTWF0NChvdXQsIGEpIHtcbiAgICBsZXQgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTAzID0gYVszXTtcbiAgICBsZXQgYTEwID0gYVs0XSxcbiAgICAgICAgYTExID0gYVs1XSxcbiAgICAgICAgYTEyID0gYVs2XSxcbiAgICAgICAgYTEzID0gYVs3XTtcbiAgICBsZXQgYTIwID0gYVs4XSxcbiAgICAgICAgYTIxID0gYVs5XSxcbiAgICAgICAgYTIyID0gYVsxMF0sXG4gICAgICAgIGEyMyA9IGFbMTFdO1xuICAgIGxldCBhMzAgPSBhWzEyXSxcbiAgICAgICAgYTMxID0gYVsxM10sXG4gICAgICAgIGEzMiA9IGFbMTRdLFxuICAgICAgICBhMzMgPSBhWzE1XTtcblxuICAgIGxldCBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTA7XG4gICAgbGV0IGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMDtcbiAgICBsZXQgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwO1xuICAgIGxldCBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTE7XG4gICAgbGV0IGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMTtcbiAgICBsZXQgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyO1xuICAgIGxldCBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzA7XG4gICAgbGV0IGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMDtcbiAgICBsZXQgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwO1xuICAgIGxldCBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzE7XG4gICAgbGV0IGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMTtcbiAgICBsZXQgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuICAgIGxldCBkZXQgPSBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XG5cbiAgICBpZiAoIWRldCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZGV0ID0gMS4wIC8gZGV0O1xuXG4gICAgb3V0WzBdID0gKGExMSAqIGIxMSAtIGExMiAqIGIxMCArIGExMyAqIGIwOSkgKiBkZXQ7XG4gICAgb3V0WzFdID0gKGExMiAqIGIwOCAtIGExMCAqIGIxMSAtIGExMyAqIGIwNykgKiBkZXQ7XG4gICAgb3V0WzJdID0gKGExMCAqIGIxMCAtIGExMSAqIGIwOCArIGExMyAqIGIwNikgKiBkZXQ7XG5cbiAgICBvdXRbM10gPSAoYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5KSAqIGRldDtcbiAgICBvdXRbNF0gPSAoYTAwICogYjExIC0gYTAyICogYjA4ICsgYTAzICogYjA3KSAqIGRldDtcbiAgICBvdXRbNV0gPSAoYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2KSAqIGRldDtcblxuICAgIG91dFs2XSA9IChhMzEgKiBiMDUgLSBhMzIgKiBiMDQgKyBhMzMgKiBiMDMpICogZGV0O1xuICAgIG91dFs3XSA9IChhMzIgKiBiMDIgLSBhMzAgKiBiMDUgLSBhMzMgKiBiMDEpICogZGV0O1xuICAgIG91dFs4XSA9IChhMzAgKiBiMDQgLSBhMzEgKiBiMDIgKyBhMzMgKiBiMDApICogZGV0O1xuXG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSAyRCBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHNcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCBtYXQzIGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge251bWJlcn0gd2lkdGggV2lkdGggb2YgeW91ciBnbCBjb250ZXh0XG4gKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IEhlaWdodCBvZiBnbCBjb250ZXh0XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9qZWN0aW9uKG91dCwgd2lkdGgsIGhlaWdodCkge1xuICAgIG91dFswXSA9IDIgLyB3aWR0aDtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAtMiAvIGhlaWdodDtcbiAgICBvdXRbNV0gPSAwO1xuICAgIG91dFs2XSA9IC0xO1xuICAgIG91dFs3XSA9IDE7XG4gICAgb3V0WzhdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIEFkZHMgdHdvIG1hdDMnc1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7bWF0M30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZChvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdICsgYlsyXTtcbiAgICBvdXRbM10gPSBhWzNdICsgYlszXTtcbiAgICBvdXRbNF0gPSBhWzRdICsgYls0XTtcbiAgICBvdXRbNV0gPSBhWzVdICsgYls1XTtcbiAgICBvdXRbNl0gPSBhWzZdICsgYls2XTtcbiAgICBvdXRbN10gPSBhWzddICsgYls3XTtcbiAgICBvdXRbOF0gPSBhWzhdICsgYls4XTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFN1YnRyYWN0cyBtYXRyaXggYiBmcm9tIG1hdHJpeCBhXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHttYXQzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VidHJhY3Qob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAtIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAtIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSAtIGJbMl07XG4gICAgb3V0WzNdID0gYVszXSAtIGJbM107XG4gICAgb3V0WzRdID0gYVs0XSAtIGJbNF07XG4gICAgb3V0WzVdID0gYVs1XSAtIGJbNV07XG4gICAgb3V0WzZdID0gYVs2XSAtIGJbNl07XG4gICAgb3V0WzddID0gYVs3XSAtIGJbN107XG4gICAgb3V0WzhdID0gYVs4XSAtIGJbOF07XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBNdWx0aXBseSBlYWNoIGVsZW1lbnQgb2YgdGhlIG1hdHJpeCBieSBhIHNjYWxhci5cbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBtYXRyaXggdG8gc2NhbGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgbWF0cml4J3MgZWxlbWVudHMgYnlcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5U2NhbGFyKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiO1xuICAgIG91dFsyXSA9IGFbMl0gKiBiO1xuICAgIG91dFszXSA9IGFbM10gKiBiO1xuICAgIG91dFs0XSA9IGFbNF0gKiBiO1xuICAgIG91dFs1XSA9IGFbNV0gKiBiO1xuICAgIG91dFs2XSA9IGFbNl0gKiBiO1xuICAgIG91dFs3XSA9IGFbN10gKiBiO1xuICAgIG91dFs4XSA9IGFbOF0gKiBiO1xuICAgIHJldHVybiBvdXQ7XG59XG4iLCJjb25zdCBFUFNJTE9OID0gMC4wMDAwMDE7XG5cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIG1hdDQgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcHkob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIG91dFs4XSA9IGFbOF07XG4gICAgb3V0WzldID0gYVs5XTtcbiAgICBvdXRbMTBdID0gYVsxMF07XG4gICAgb3V0WzExXSA9IGFbMTFdO1xuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIG1hdDQgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXQob3V0LCBtMDAsIG0wMSwgbTAyLCBtMDMsIG0xMCwgbTExLCBtMTIsIG0xMywgbTIwLCBtMjEsIG0yMiwgbTIzLCBtMzAsIG0zMSwgbTMyLCBtMzMpIHtcbiAgICBvdXRbMF0gPSBtMDA7XG4gICAgb3V0WzFdID0gbTAxO1xuICAgIG91dFsyXSA9IG0wMjtcbiAgICBvdXRbM10gPSBtMDM7XG4gICAgb3V0WzRdID0gbTEwO1xuICAgIG91dFs1XSA9IG0xMTtcbiAgICBvdXRbNl0gPSBtMTI7XG4gICAgb3V0WzddID0gbTEzO1xuICAgIG91dFs4XSA9IG0yMDtcbiAgICBvdXRbOV0gPSBtMjE7XG4gICAgb3V0WzEwXSA9IG0yMjtcbiAgICBvdXRbMTFdID0gbTIzO1xuICAgIG91dFsxMl0gPSBtMzA7XG4gICAgb3V0WzEzXSA9IG0zMTtcbiAgICBvdXRbMTRdID0gbTMyO1xuICAgIG91dFsxNV0gPSBtMzM7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBTZXQgYSBtYXQ0IHRvIHRoZSBpZGVudGl0eSBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gaWRlbnRpdHkob3V0KSB7XG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IDE7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDA7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTBdID0gMTtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gMDtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFRyYW5zcG9zZSB0aGUgdmFsdWVzIG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zcG9zZShvdXQsIGEpIHtcbiAgICAvLyBJZiB3ZSBhcmUgdHJhbnNwb3Npbmcgb3Vyc2VsdmVzIHdlIGNhbiBza2lwIGEgZmV3IHN0ZXBzIGJ1dCBoYXZlIHRvIGNhY2hlIHNvbWUgdmFsdWVzXG4gICAgaWYgKG91dCA9PT0gYSkge1xuICAgICAgICBsZXQgYTAxID0gYVsxXSxcbiAgICAgICAgICAgIGEwMiA9IGFbMl0sXG4gICAgICAgICAgICBhMDMgPSBhWzNdO1xuICAgICAgICBsZXQgYTEyID0gYVs2XSxcbiAgICAgICAgICAgIGExMyA9IGFbN107XG4gICAgICAgIGxldCBhMjMgPSBhWzExXTtcblxuICAgICAgICBvdXRbMV0gPSBhWzRdO1xuICAgICAgICBvdXRbMl0gPSBhWzhdO1xuICAgICAgICBvdXRbM10gPSBhWzEyXTtcbiAgICAgICAgb3V0WzRdID0gYTAxO1xuICAgICAgICBvdXRbNl0gPSBhWzldO1xuICAgICAgICBvdXRbN10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzhdID0gYTAyO1xuICAgICAgICBvdXRbOV0gPSBhMTI7XG4gICAgICAgIG91dFsxMV0gPSBhWzE0XTtcbiAgICAgICAgb3V0WzEyXSA9IGEwMztcbiAgICAgICAgb3V0WzEzXSA9IGExMztcbiAgICAgICAgb3V0WzE0XSA9IGEyMztcbiAgICB9IGVsc2Uge1xuICAgICAgICBvdXRbMF0gPSBhWzBdO1xuICAgICAgICBvdXRbMV0gPSBhWzRdO1xuICAgICAgICBvdXRbMl0gPSBhWzhdO1xuICAgICAgICBvdXRbM10gPSBhWzEyXTtcbiAgICAgICAgb3V0WzRdID0gYVsxXTtcbiAgICAgICAgb3V0WzVdID0gYVs1XTtcbiAgICAgICAgb3V0WzZdID0gYVs5XTtcbiAgICAgICAgb3V0WzddID0gYVsxM107XG4gICAgICAgIG91dFs4XSA9IGFbMl07XG4gICAgICAgIG91dFs5XSA9IGFbNl07XG4gICAgICAgIG91dFsxMF0gPSBhWzEwXTtcbiAgICAgICAgb3V0WzExXSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTJdID0gYVszXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbN107XG4gICAgICAgIG91dFsxNF0gPSBhWzExXTtcbiAgICAgICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogSW52ZXJ0cyBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnQob3V0LCBhKSB7XG4gICAgbGV0IGEwMCA9IGFbMF0sXG4gICAgICAgIGEwMSA9IGFbMV0sXG4gICAgICAgIGEwMiA9IGFbMl0sXG4gICAgICAgIGEwMyA9IGFbM107XG4gICAgbGV0IGExMCA9IGFbNF0sXG4gICAgICAgIGExMSA9IGFbNV0sXG4gICAgICAgIGExMiA9IGFbNl0sXG4gICAgICAgIGExMyA9IGFbN107XG4gICAgbGV0IGEyMCA9IGFbOF0sXG4gICAgICAgIGEyMSA9IGFbOV0sXG4gICAgICAgIGEyMiA9IGFbMTBdLFxuICAgICAgICBhMjMgPSBhWzExXTtcbiAgICBsZXQgYTMwID0gYVsxMl0sXG4gICAgICAgIGEzMSA9IGFbMTNdLFxuICAgICAgICBhMzIgPSBhWzE0XSxcbiAgICAgICAgYTMzID0gYVsxNV07XG5cbiAgICBsZXQgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwO1xuICAgIGxldCBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTA7XG4gICAgbGV0IGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMDtcbiAgICBsZXQgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExO1xuICAgIGxldCBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTE7XG4gICAgbGV0IGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMjtcbiAgICBsZXQgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwO1xuICAgIGxldCBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzA7XG4gICAgbGV0IGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMDtcbiAgICBsZXQgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxO1xuICAgIGxldCBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzE7XG4gICAgbGV0IGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMjtcblxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcbiAgICBsZXQgZGV0ID0gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xuXG4gICAgaWYgKCFkZXQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGRldCA9IDEuMCAvIGRldDtcblxuICAgIG91dFswXSA9IChhMTEgKiBiMTEgLSBhMTIgKiBiMTAgKyBhMTMgKiBiMDkpICogZGV0O1xuICAgIG91dFsxXSA9IChhMDIgKiBiMTAgLSBhMDEgKiBiMTEgLSBhMDMgKiBiMDkpICogZGV0O1xuICAgIG91dFsyXSA9IChhMzEgKiBiMDUgLSBhMzIgKiBiMDQgKyBhMzMgKiBiMDMpICogZGV0O1xuICAgIG91dFszXSA9IChhMjIgKiBiMDQgLSBhMjEgKiBiMDUgLSBhMjMgKiBiMDMpICogZGV0O1xuICAgIG91dFs0XSA9IChhMTIgKiBiMDggLSBhMTAgKiBiMTEgLSBhMTMgKiBiMDcpICogZGV0O1xuICAgIG91dFs1XSA9IChhMDAgKiBiMTEgLSBhMDIgKiBiMDggKyBhMDMgKiBiMDcpICogZGV0O1xuICAgIG91dFs2XSA9IChhMzIgKiBiMDIgLSBhMzAgKiBiMDUgLSBhMzMgKiBiMDEpICogZGV0O1xuICAgIG91dFs3XSA9IChhMjAgKiBiMDUgLSBhMjIgKiBiMDIgKyBhMjMgKiBiMDEpICogZGV0O1xuICAgIG91dFs4XSA9IChhMTAgKiBiMTAgLSBhMTEgKiBiMDggKyBhMTMgKiBiMDYpICogZGV0O1xuICAgIG91dFs5XSA9IChhMDEgKiBiMDggLSBhMDAgKiBiMTAgLSBhMDMgKiBiMDYpICogZGV0O1xuICAgIG91dFsxMF0gPSAoYTMwICogYjA0IC0gYTMxICogYjAyICsgYTMzICogYjAwKSAqIGRldDtcbiAgICBvdXRbMTFdID0gKGEyMSAqIGIwMiAtIGEyMCAqIGIwNCAtIGEyMyAqIGIwMCkgKiBkZXQ7XG4gICAgb3V0WzEyXSA9IChhMTEgKiBiMDcgLSBhMTAgKiBiMDkgLSBhMTIgKiBiMDYpICogZGV0O1xuICAgIG91dFsxM10gPSAoYTAwICogYjA5IC0gYTAxICogYjA3ICsgYTAyICogYjA2KSAqIGRldDtcbiAgICBvdXRbMTRdID0gKGEzMSAqIGIwMSAtIGEzMCAqIGIwMyAtIGEzMiAqIGIwMCkgKiBkZXQ7XG4gICAgb3V0WzE1XSA9IChhMjAgKiBiMDMgLSBhMjEgKiBiMDEgKyBhMjIgKiBiMDApICogZGV0O1xuXG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRldGVybWluYW50IG9mIGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRldGVybWluYW50KGEpIHtcbiAgICBsZXQgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTAzID0gYVszXTtcbiAgICBsZXQgYTEwID0gYVs0XSxcbiAgICAgICAgYTExID0gYVs1XSxcbiAgICAgICAgYTEyID0gYVs2XSxcbiAgICAgICAgYTEzID0gYVs3XTtcbiAgICBsZXQgYTIwID0gYVs4XSxcbiAgICAgICAgYTIxID0gYVs5XSxcbiAgICAgICAgYTIyID0gYVsxMF0sXG4gICAgICAgIGEyMyA9IGFbMTFdO1xuICAgIGxldCBhMzAgPSBhWzEyXSxcbiAgICAgICAgYTMxID0gYVsxM10sXG4gICAgICAgIGEzMiA9IGFbMTRdLFxuICAgICAgICBhMzMgPSBhWzE1XTtcblxuICAgIGxldCBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTA7XG4gICAgbGV0IGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMDtcbiAgICBsZXQgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwO1xuICAgIGxldCBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTE7XG4gICAgbGV0IGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMTtcbiAgICBsZXQgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyO1xuICAgIGxldCBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzA7XG4gICAgbGV0IGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMDtcbiAgICBsZXQgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwO1xuICAgIGxldCBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzE7XG4gICAgbGV0IGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMTtcbiAgICBsZXQgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuICAgIHJldHVybiBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XG59XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gbWF0NHNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge21hdDR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aXBseShvdXQsIGEsIGIpIHtcbiAgICBsZXQgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTAzID0gYVszXTtcbiAgICBsZXQgYTEwID0gYVs0XSxcbiAgICAgICAgYTExID0gYVs1XSxcbiAgICAgICAgYTEyID0gYVs2XSxcbiAgICAgICAgYTEzID0gYVs3XTtcbiAgICBsZXQgYTIwID0gYVs4XSxcbiAgICAgICAgYTIxID0gYVs5XSxcbiAgICAgICAgYTIyID0gYVsxMF0sXG4gICAgICAgIGEyMyA9IGFbMTFdO1xuICAgIGxldCBhMzAgPSBhWzEyXSxcbiAgICAgICAgYTMxID0gYVsxM10sXG4gICAgICAgIGEzMiA9IGFbMTRdLFxuICAgICAgICBhMzMgPSBhWzE1XTtcblxuICAgIC8vIENhY2hlIG9ubHkgdGhlIGN1cnJlbnQgbGluZSBvZiB0aGUgc2Vjb25kIG1hdHJpeFxuICAgIGxldCBiMCA9IGJbMF0sXG4gICAgICAgIGIxID0gYlsxXSxcbiAgICAgICAgYjIgPSBiWzJdLFxuICAgICAgICBiMyA9IGJbM107XG4gICAgb3V0WzBdID0gYjAgKiBhMDAgKyBiMSAqIGExMCArIGIyICogYTIwICsgYjMgKiBhMzA7XG4gICAgb3V0WzFdID0gYjAgKiBhMDEgKyBiMSAqIGExMSArIGIyICogYTIxICsgYjMgKiBhMzE7XG4gICAgb3V0WzJdID0gYjAgKiBhMDIgKyBiMSAqIGExMiArIGIyICogYTIyICsgYjMgKiBhMzI7XG4gICAgb3V0WzNdID0gYjAgKiBhMDMgKyBiMSAqIGExMyArIGIyICogYTIzICsgYjMgKiBhMzM7XG5cbiAgICBiMCA9IGJbNF07XG4gICAgYjEgPSBiWzVdO1xuICAgIGIyID0gYls2XTtcbiAgICBiMyA9IGJbN107XG4gICAgb3V0WzRdID0gYjAgKiBhMDAgKyBiMSAqIGExMCArIGIyICogYTIwICsgYjMgKiBhMzA7XG4gICAgb3V0WzVdID0gYjAgKiBhMDEgKyBiMSAqIGExMSArIGIyICogYTIxICsgYjMgKiBhMzE7XG4gICAgb3V0WzZdID0gYjAgKiBhMDIgKyBiMSAqIGExMiArIGIyICogYTIyICsgYjMgKiBhMzI7XG4gICAgb3V0WzddID0gYjAgKiBhMDMgKyBiMSAqIGExMyArIGIyICogYTIzICsgYjMgKiBhMzM7XG5cbiAgICBiMCA9IGJbOF07XG4gICAgYjEgPSBiWzldO1xuICAgIGIyID0gYlsxMF07XG4gICAgYjMgPSBiWzExXTtcbiAgICBvdXRbOF0gPSBiMCAqIGEwMCArIGIxICogYTEwICsgYjIgKiBhMjAgKyBiMyAqIGEzMDtcbiAgICBvdXRbOV0gPSBiMCAqIGEwMSArIGIxICogYTExICsgYjIgKiBhMjEgKyBiMyAqIGEzMTtcbiAgICBvdXRbMTBdID0gYjAgKiBhMDIgKyBiMSAqIGExMiArIGIyICogYTIyICsgYjMgKiBhMzI7XG4gICAgb3V0WzExXSA9IGIwICogYTAzICsgYjEgKiBhMTMgKyBiMiAqIGEyMyArIGIzICogYTMzO1xuXG4gICAgYjAgPSBiWzEyXTtcbiAgICBiMSA9IGJbMTNdO1xuICAgIGIyID0gYlsxNF07XG4gICAgYjMgPSBiWzE1XTtcbiAgICBvdXRbMTJdID0gYjAgKiBhMDAgKyBiMSAqIGExMCArIGIyICogYTIwICsgYjMgKiBhMzA7XG4gICAgb3V0WzEzXSA9IGIwICogYTAxICsgYjEgKiBhMTEgKyBiMiAqIGEyMSArIGIzICogYTMxO1xuICAgIG91dFsxNF0gPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjIgKyBiMyAqIGEzMjtcbiAgICBvdXRbMTVdID0gYjAgKiBhMDMgKyBiMSAqIGExMyArIGIyICogYTIzICsgYjMgKiBhMzM7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBUcmFuc2xhdGUgYSBtYXQ0IGJ5IHRoZSBnaXZlbiB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gdHJhbnNsYXRlXG4gKiBAcGFyYW0ge3ZlYzN9IHYgdmVjdG9yIHRvIHRyYW5zbGF0ZSBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlKG91dCwgYSwgdikge1xuICAgIGxldCB4ID0gdlswXSxcbiAgICAgICAgeSA9IHZbMV0sXG4gICAgICAgIHogPSB2WzJdO1xuICAgIGxldCBhMDAsIGEwMSwgYTAyLCBhMDM7XG4gICAgbGV0IGExMCwgYTExLCBhMTIsIGExMztcbiAgICBsZXQgYTIwLCBhMjEsIGEyMiwgYTIzO1xuXG4gICAgaWYgKGEgPT09IG91dCkge1xuICAgICAgICBvdXRbMTJdID0gYVswXSAqIHggKyBhWzRdICogeSArIGFbOF0gKiB6ICsgYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzFdICogeCArIGFbNV0gKiB5ICsgYVs5XSAqIHogKyBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMl0gKiB4ICsgYVs2XSAqIHkgKyBhWzEwXSAqIHogKyBhWzE0XTtcbiAgICAgICAgb3V0WzE1XSA9IGFbM10gKiB4ICsgYVs3XSAqIHkgKyBhWzExXSAqIHogKyBhWzE1XTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBhMDAgPSBhWzBdO1xuICAgICAgICBhMDEgPSBhWzFdO1xuICAgICAgICBhMDIgPSBhWzJdO1xuICAgICAgICBhMDMgPSBhWzNdO1xuICAgICAgICBhMTAgPSBhWzRdO1xuICAgICAgICBhMTEgPSBhWzVdO1xuICAgICAgICBhMTIgPSBhWzZdO1xuICAgICAgICBhMTMgPSBhWzddO1xuICAgICAgICBhMjAgPSBhWzhdO1xuICAgICAgICBhMjEgPSBhWzldO1xuICAgICAgICBhMjIgPSBhWzEwXTtcbiAgICAgICAgYTIzID0gYVsxMV07XG5cbiAgICAgICAgb3V0WzBdID0gYTAwO1xuICAgICAgICBvdXRbMV0gPSBhMDE7XG4gICAgICAgIG91dFsyXSA9IGEwMjtcbiAgICAgICAgb3V0WzNdID0gYTAzO1xuICAgICAgICBvdXRbNF0gPSBhMTA7XG4gICAgICAgIG91dFs1XSA9IGExMTtcbiAgICAgICAgb3V0WzZdID0gYTEyO1xuICAgICAgICBvdXRbN10gPSBhMTM7XG4gICAgICAgIG91dFs4XSA9IGEyMDtcbiAgICAgICAgb3V0WzldID0gYTIxO1xuICAgICAgICBvdXRbMTBdID0gYTIyO1xuICAgICAgICBvdXRbMTFdID0gYTIzO1xuXG4gICAgICAgIG91dFsxMl0gPSBhMDAgKiB4ICsgYTEwICogeSArIGEyMCAqIHogKyBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGEwMSAqIHggKyBhMTEgKiB5ICsgYTIxICogeiArIGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYTAyICogeCArIGExMiAqIHkgKyBhMjIgKiB6ICsgYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhMDMgKiB4ICsgYTEzICogeSArIGEyMyAqIHogKyBhWzE1XTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFNjYWxlcyB0aGUgbWF0NCBieSB0aGUgZGltZW5zaW9ucyBpbiB0aGUgZ2l2ZW4gdmVjMyBub3QgdXNpbmcgdmVjdG9yaXphdGlvblxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byBzY2FsZVxuICogQHBhcmFtIHt2ZWMzfSB2IHRoZSB2ZWMzIHRvIHNjYWxlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqKi9cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZShvdXQsIGEsIHYpIHtcbiAgICBsZXQgeCA9IHZbMF0sXG4gICAgICAgIHkgPSB2WzFdLFxuICAgICAgICB6ID0gdlsyXTtcblxuICAgIG91dFswXSA9IGFbMF0gKiB4O1xuICAgIG91dFsxXSA9IGFbMV0gKiB4O1xuICAgIG91dFsyXSA9IGFbMl0gKiB4O1xuICAgIG91dFszXSA9IGFbM10gKiB4O1xuICAgIG91dFs0XSA9IGFbNF0gKiB5O1xuICAgIG91dFs1XSA9IGFbNV0gKiB5O1xuICAgIG91dFs2XSA9IGFbNl0gKiB5O1xuICAgIG91dFs3XSA9IGFbN10gKiB5O1xuICAgIG91dFs4XSA9IGFbOF0gKiB6O1xuICAgIG91dFs5XSA9IGFbOV0gKiB6O1xuICAgIG91dFsxMF0gPSBhWzEwXSAqIHo7XG4gICAgb3V0WzExXSA9IGFbMTFdICogejtcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0NCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBnaXZlbiBheGlzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEBwYXJhbSB7dmVjM30gYXhpcyB0aGUgYXhpcyB0byByb3RhdGUgYXJvdW5kXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGUob3V0LCBhLCByYWQsIGF4aXMpIHtcbiAgICBsZXQgeCA9IGF4aXNbMF0sXG4gICAgICAgIHkgPSBheGlzWzFdLFxuICAgICAgICB6ID0gYXhpc1syXTtcbiAgICBsZXQgbGVuID0gTWF0aC5oeXBvdCh4LCB5LCB6KTtcbiAgICBsZXQgcywgYywgdDtcbiAgICBsZXQgYTAwLCBhMDEsIGEwMiwgYTAzO1xuICAgIGxldCBhMTAsIGExMSwgYTEyLCBhMTM7XG4gICAgbGV0IGEyMCwgYTIxLCBhMjIsIGEyMztcbiAgICBsZXQgYjAwLCBiMDEsIGIwMjtcbiAgICBsZXQgYjEwLCBiMTEsIGIxMjtcbiAgICBsZXQgYjIwLCBiMjEsIGIyMjtcblxuICAgIGlmIChNYXRoLmFicyhsZW4pIDwgRVBTSUxPTikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZW4gPSAxIC8gbGVuO1xuICAgIHggKj0gbGVuO1xuICAgIHkgKj0gbGVuO1xuICAgIHogKj0gbGVuO1xuXG4gICAgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgdCA9IDEgLSBjO1xuXG4gICAgYTAwID0gYVswXTtcbiAgICBhMDEgPSBhWzFdO1xuICAgIGEwMiA9IGFbMl07XG4gICAgYTAzID0gYVszXTtcbiAgICBhMTAgPSBhWzRdO1xuICAgIGExMSA9IGFbNV07XG4gICAgYTEyID0gYVs2XTtcbiAgICBhMTMgPSBhWzddO1xuICAgIGEyMCA9IGFbOF07XG4gICAgYTIxID0gYVs5XTtcbiAgICBhMjIgPSBhWzEwXTtcbiAgICBhMjMgPSBhWzExXTtcblxuICAgIC8vIENvbnN0cnVjdCB0aGUgZWxlbWVudHMgb2YgdGhlIHJvdGF0aW9uIG1hdHJpeFxuICAgIGIwMCA9IHggKiB4ICogdCArIGM7XG4gICAgYjAxID0geSAqIHggKiB0ICsgeiAqIHM7XG4gICAgYjAyID0geiAqIHggKiB0IC0geSAqIHM7XG4gICAgYjEwID0geCAqIHkgKiB0IC0geiAqIHM7XG4gICAgYjExID0geSAqIHkgKiB0ICsgYztcbiAgICBiMTIgPSB6ICogeSAqIHQgKyB4ICogcztcbiAgICBiMjAgPSB4ICogeiAqIHQgKyB5ICogcztcbiAgICBiMjEgPSB5ICogeiAqIHQgLSB4ICogcztcbiAgICBiMjIgPSB6ICogeiAqIHQgKyBjO1xuXG4gICAgLy8gUGVyZm9ybSByb3RhdGlvbi1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICBvdXRbMF0gPSBhMDAgKiBiMDAgKyBhMTAgKiBiMDEgKyBhMjAgKiBiMDI7XG4gICAgb3V0WzFdID0gYTAxICogYjAwICsgYTExICogYjAxICsgYTIxICogYjAyO1xuICAgIG91dFsyXSA9IGEwMiAqIGIwMCArIGExMiAqIGIwMSArIGEyMiAqIGIwMjtcbiAgICBvdXRbM10gPSBhMDMgKiBiMDAgKyBhMTMgKiBiMDEgKyBhMjMgKiBiMDI7XG4gICAgb3V0WzRdID0gYTAwICogYjEwICsgYTEwICogYjExICsgYTIwICogYjEyO1xuICAgIG91dFs1XSA9IGEwMSAqIGIxMCArIGExMSAqIGIxMSArIGEyMSAqIGIxMjtcbiAgICBvdXRbNl0gPSBhMDIgKiBiMTAgKyBhMTIgKiBiMTEgKyBhMjIgKiBiMTI7XG4gICAgb3V0WzddID0gYTAzICogYjEwICsgYTEzICogYjExICsgYTIzICogYjEyO1xuICAgIG91dFs4XSA9IGEwMCAqIGIyMCArIGExMCAqIGIyMSArIGEyMCAqIGIyMjtcbiAgICBvdXRbOV0gPSBhMDEgKiBiMjAgKyBhMTEgKiBiMjEgKyBhMjEgKiBiMjI7XG4gICAgb3V0WzEwXSA9IGEwMiAqIGIyMCArIGExMiAqIGIyMSArIGEyMiAqIGIyMjtcbiAgICBvdXRbMTFdID0gYTAzICogYjIwICsgYTEzICogYjIxICsgYTIzICogYjIyO1xuXG4gICAgaWYgKGEgIT09IG91dCkge1xuICAgICAgICAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCBsYXN0IHJvd1xuICAgICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdHJhbnNsYXRpb24gdmVjdG9yIGNvbXBvbmVudCBvZiBhIHRyYW5zZm9ybWF0aW9uXG4gKiAgbWF0cml4LiBJZiBhIG1hdHJpeCBpcyBidWlsdCB3aXRoIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uLFxuICogIHRoZSByZXR1cm5lZCB2ZWN0b3Igd2lsbCBiZSB0aGUgc2FtZSBhcyB0aGUgdHJhbnNsYXRpb24gdmVjdG9yXG4gKiAgb3JpZ2luYWxseSBzdXBwbGllZC5cbiAqIEBwYXJhbSAge3ZlYzN9IG91dCBWZWN0b3IgdG8gcmVjZWl2ZSB0cmFuc2xhdGlvbiBjb21wb25lbnRcbiAqIEBwYXJhbSAge21hdDR9IG1hdCBNYXRyaXggdG8gYmUgZGVjb21wb3NlZCAoaW5wdXQpXG4gKiBAcmV0dXJuIHt2ZWMzfSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zbGF0aW9uKG91dCwgbWF0KSB7XG4gICAgb3V0WzBdID0gbWF0WzEyXTtcbiAgICBvdXRbMV0gPSBtYXRbMTNdO1xuICAgIG91dFsyXSA9IG1hdFsxNF07XG5cbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHNjYWxpbmcgZmFjdG9yIGNvbXBvbmVudCBvZiBhIHRyYW5zZm9ybWF0aW9uXG4gKiAgbWF0cml4LiBJZiBhIG1hdHJpeCBpcyBidWlsdCB3aXRoIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uU2NhbGVcbiAqICB3aXRoIGEgbm9ybWFsaXplZCBRdWF0ZXJuaW9uIHBhcmFtdGVyLCB0aGUgcmV0dXJuZWQgdmVjdG9yIHdpbGwgYmVcbiAqICB0aGUgc2FtZSBhcyB0aGUgc2NhbGluZyB2ZWN0b3JcbiAqICBvcmlnaW5hbGx5IHN1cHBsaWVkLlxuICogQHBhcmFtICB7dmVjM30gb3V0IFZlY3RvciB0byByZWNlaXZlIHNjYWxpbmcgZmFjdG9yIGNvbXBvbmVudFxuICogQHBhcmFtICB7bWF0NH0gbWF0IE1hdHJpeCB0byBiZSBkZWNvbXBvc2VkIChpbnB1dClcbiAqIEByZXR1cm4ge3ZlYzN9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NhbGluZyhvdXQsIG1hdCkge1xuICAgIGxldCBtMTEgPSBtYXRbMF07XG4gICAgbGV0IG0xMiA9IG1hdFsxXTtcbiAgICBsZXQgbTEzID0gbWF0WzJdO1xuICAgIGxldCBtMjEgPSBtYXRbNF07XG4gICAgbGV0IG0yMiA9IG1hdFs1XTtcbiAgICBsZXQgbTIzID0gbWF0WzZdO1xuICAgIGxldCBtMzEgPSBtYXRbOF07XG4gICAgbGV0IG0zMiA9IG1hdFs5XTtcbiAgICBsZXQgbTMzID0gbWF0WzEwXTtcblxuICAgIG91dFswXSA9IE1hdGguaHlwb3QobTExLCBtMTIsIG0xMyk7XG4gICAgb3V0WzFdID0gTWF0aC5oeXBvdChtMjEsIG0yMiwgbTIzKTtcbiAgICBvdXRbMl0gPSBNYXRoLmh5cG90KG0zMSwgbTMyLCBtMzMpO1xuXG4gICAgcmV0dXJuIG91dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1heFNjYWxlT25BeGlzKG1hdCkge1xuICAgIGxldCBtMTEgPSBtYXRbMF07XG4gICAgbGV0IG0xMiA9IG1hdFsxXTtcbiAgICBsZXQgbTEzID0gbWF0WzJdO1xuICAgIGxldCBtMjEgPSBtYXRbNF07XG4gICAgbGV0IG0yMiA9IG1hdFs1XTtcbiAgICBsZXQgbTIzID0gbWF0WzZdO1xuICAgIGxldCBtMzEgPSBtYXRbOF07XG4gICAgbGV0IG0zMiA9IG1hdFs5XTtcbiAgICBsZXQgbTMzID0gbWF0WzEwXTtcblxuICAgIGNvbnN0IHggPSBtMTEgKiBtMTEgKyBtMTIgKiBtMTIgKyBtMTMgKiBtMTM7XG4gICAgY29uc3QgeSA9IG0yMSAqIG0yMSArIG0yMiAqIG0yMiArIG0yMyAqIG0yMztcbiAgICBjb25zdCB6ID0gbTMxICogbTMxICsgbTMyICogbTMyICsgbTMzICogbTMzO1xuXG4gICAgcmV0dXJuIE1hdGguc3FydChNYXRoLm1heCh4LCB5LCB6KSk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIHF1YXRlcm5pb24gcmVwcmVzZW50aW5nIHRoZSByb3RhdGlvbmFsIGNvbXBvbmVudFxuICogIG9mIGEgdHJhbnNmb3JtYXRpb24gbWF0cml4LiBJZiBhIG1hdHJpeCBpcyBidWlsdCB3aXRoXG4gKiAgZnJvbVJvdGF0aW9uVHJhbnNsYXRpb24sIHRoZSByZXR1cm5lZCBxdWF0ZXJuaW9uIHdpbGwgYmUgdGhlXG4gKiAgc2FtZSBhcyB0aGUgcXVhdGVybmlvbiBvcmlnaW5hbGx5IHN1cHBsaWVkLlxuICogQHBhcmFtIHtxdWF0fSBvdXQgUXVhdGVybmlvbiB0byByZWNlaXZlIHRoZSByb3RhdGlvbiBjb21wb25lbnRcbiAqIEBwYXJhbSB7bWF0NH0gbWF0IE1hdHJpeCB0byBiZSBkZWNvbXBvc2VkIChpbnB1dClcbiAqIEByZXR1cm4ge3F1YXR9IG91dFxuICovXG5leHBvcnQgY29uc3QgZ2V0Um90YXRpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHRlbXAgPSBbMCwgMCwgMF07XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKG91dCwgbWF0KSB7XG4gICAgICAgIGxldCBzY2FsaW5nID0gdGVtcDtcbiAgICAgICAgZ2V0U2NhbGluZyhzY2FsaW5nLCBtYXQpO1xuXG4gICAgICAgIGxldCBpczEgPSAxIC8gc2NhbGluZ1swXTtcbiAgICAgICAgbGV0IGlzMiA9IDEgLyBzY2FsaW5nWzFdO1xuICAgICAgICBsZXQgaXMzID0gMSAvIHNjYWxpbmdbMl07XG5cbiAgICAgICAgbGV0IHNtMTEgPSBtYXRbMF0gKiBpczE7XG4gICAgICAgIGxldCBzbTEyID0gbWF0WzFdICogaXMyO1xuICAgICAgICBsZXQgc20xMyA9IG1hdFsyXSAqIGlzMztcbiAgICAgICAgbGV0IHNtMjEgPSBtYXRbNF0gKiBpczE7XG4gICAgICAgIGxldCBzbTIyID0gbWF0WzVdICogaXMyO1xuICAgICAgICBsZXQgc20yMyA9IG1hdFs2XSAqIGlzMztcbiAgICAgICAgbGV0IHNtMzEgPSBtYXRbOF0gKiBpczE7XG4gICAgICAgIGxldCBzbTMyID0gbWF0WzldICogaXMyO1xuICAgICAgICBsZXQgc20zMyA9IG1hdFsxMF0gKiBpczM7XG5cbiAgICAgICAgbGV0IHRyYWNlID0gc20xMSArIHNtMjIgKyBzbTMzO1xuICAgICAgICBsZXQgUyA9IDA7XG5cbiAgICAgICAgaWYgKHRyYWNlID4gMCkge1xuICAgICAgICAgICAgUyA9IE1hdGguc3FydCh0cmFjZSArIDEuMCkgKiAyO1xuICAgICAgICAgICAgb3V0WzNdID0gMC4yNSAqIFM7XG4gICAgICAgICAgICBvdXRbMF0gPSAoc20yMyAtIHNtMzIpIC8gUztcbiAgICAgICAgICAgIG91dFsxXSA9IChzbTMxIC0gc20xMykgLyBTO1xuICAgICAgICAgICAgb3V0WzJdID0gKHNtMTIgLSBzbTIxKSAvIFM7XG4gICAgICAgIH0gZWxzZSBpZiAoc20xMSA+IHNtMjIgJiYgc20xMSA+IHNtMzMpIHtcbiAgICAgICAgICAgIFMgPSBNYXRoLnNxcnQoMS4wICsgc20xMSAtIHNtMjIgLSBzbTMzKSAqIDI7XG4gICAgICAgICAgICBvdXRbM10gPSAoc20yMyAtIHNtMzIpIC8gUztcbiAgICAgICAgICAgIG91dFswXSA9IDAuMjUgKiBTO1xuICAgICAgICAgICAgb3V0WzFdID0gKHNtMTIgKyBzbTIxKSAvIFM7XG4gICAgICAgICAgICBvdXRbMl0gPSAoc20zMSArIHNtMTMpIC8gUztcbiAgICAgICAgfSBlbHNlIGlmIChzbTIyID4gc20zMykge1xuICAgICAgICAgICAgUyA9IE1hdGguc3FydCgxLjAgKyBzbTIyIC0gc20xMSAtIHNtMzMpICogMjtcbiAgICAgICAgICAgIG91dFszXSA9IChzbTMxIC0gc20xMykgLyBTO1xuICAgICAgICAgICAgb3V0WzBdID0gKHNtMTIgKyBzbTIxKSAvIFM7XG4gICAgICAgICAgICBvdXRbMV0gPSAwLjI1ICogUztcbiAgICAgICAgICAgIG91dFsyXSA9IChzbTIzICsgc20zMikgLyBTO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgUyA9IE1hdGguc3FydCgxLjAgKyBzbTMzIC0gc20xMSAtIHNtMjIpICogMjtcbiAgICAgICAgICAgIG91dFszXSA9IChzbTEyIC0gc20yMSkgLyBTO1xuICAgICAgICAgICAgb3V0WzBdID0gKHNtMzEgKyBzbTEzKSAvIFM7XG4gICAgICAgICAgICBvdXRbMV0gPSAoc20yMyArIHNtMzIpIC8gUztcbiAgICAgICAgICAgIG91dFsyXSA9IDAuMjUgKiBTO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9O1xufSkoKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBxdWF0ZXJuaW9uIHJvdGF0aW9uLCB2ZWN0b3IgdHJhbnNsYXRpb24gYW5kIHZlY3RvciBzY2FsZVxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgdmVjKTtcbiAqICAgICBsZXQgcXVhdE1hdCA9IG1hdDQuY3JlYXRlKCk7XG4gKiAgICAgcXVhdDQudG9NYXQ0KHF1YXQsIHF1YXRNYXQpO1xuICogICAgIG1hdDQubXVsdGlwbHkoZGVzdCwgcXVhdE1hdCk7XG4gKiAgICAgbWF0NC5zY2FsZShkZXN0LCBzY2FsZSlcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge3F1YXQ0fSBxIFJvdGF0aW9uIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7dmVjM30gdiBUcmFuc2xhdGlvbiB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gcyBTY2FsaW5nIHZlY3RvclxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZShvdXQsIHEsIHYsIHMpIHtcbiAgICAvLyBRdWF0ZXJuaW9uIG1hdGhcbiAgICBsZXQgeCA9IHFbMF0sXG4gICAgICAgIHkgPSBxWzFdLFxuICAgICAgICB6ID0gcVsyXSxcbiAgICAgICAgdyA9IHFbM107XG4gICAgbGV0IHgyID0geCArIHg7XG4gICAgbGV0IHkyID0geSArIHk7XG4gICAgbGV0IHoyID0geiArIHo7XG5cbiAgICBsZXQgeHggPSB4ICogeDI7XG4gICAgbGV0IHh5ID0geCAqIHkyO1xuICAgIGxldCB4eiA9IHggKiB6MjtcbiAgICBsZXQgeXkgPSB5ICogeTI7XG4gICAgbGV0IHl6ID0geSAqIHoyO1xuICAgIGxldCB6eiA9IHogKiB6MjtcbiAgICBsZXQgd3ggPSB3ICogeDI7XG4gICAgbGV0IHd5ID0gdyAqIHkyO1xuICAgIGxldCB3eiA9IHcgKiB6MjtcbiAgICBsZXQgc3ggPSBzWzBdO1xuICAgIGxldCBzeSA9IHNbMV07XG4gICAgbGV0IHN6ID0gc1syXTtcblxuICAgIG91dFswXSA9ICgxIC0gKHl5ICsgenopKSAqIHN4O1xuICAgIG91dFsxXSA9ICh4eSArIHd6KSAqIHN4O1xuICAgIG91dFsyXSA9ICh4eiAtIHd5KSAqIHN4O1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gKHh5IC0gd3opICogc3k7XG4gICAgb3V0WzVdID0gKDEgLSAoeHggKyB6eikpICogc3k7XG4gICAgb3V0WzZdID0gKHl6ICsgd3gpICogc3k7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAoeHogKyB3eSkgKiBzejtcbiAgICBvdXRbOV0gPSAoeXogLSB3eCkgKiBzejtcbiAgICBvdXRbMTBdID0gKDEgLSAoeHggKyB5eSkpICogc3o7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IHZbMF07XG4gICAgb3V0WzEzXSA9IHZbMV07XG4gICAgb3V0WzE0XSA9IHZbMl07XG4gICAgb3V0WzE1XSA9IDE7XG5cbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgYSA0eDQgbWF0cml4IGZyb20gdGhlIGdpdmVuIHF1YXRlcm5pb25cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge3F1YXR9IHEgUXVhdGVybmlvbiB0byBjcmVhdGUgbWF0cml4IGZyb21cbiAqXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmcm9tUXVhdChvdXQsIHEpIHtcbiAgICBsZXQgeCA9IHFbMF0sXG4gICAgICAgIHkgPSBxWzFdLFxuICAgICAgICB6ID0gcVsyXSxcbiAgICAgICAgdyA9IHFbM107XG4gICAgbGV0IHgyID0geCArIHg7XG4gICAgbGV0IHkyID0geSArIHk7XG4gICAgbGV0IHoyID0geiArIHo7XG5cbiAgICBsZXQgeHggPSB4ICogeDI7XG4gICAgbGV0IHl4ID0geSAqIHgyO1xuICAgIGxldCB5eSA9IHkgKiB5MjtcbiAgICBsZXQgenggPSB6ICogeDI7XG4gICAgbGV0IHp5ID0geiAqIHkyO1xuICAgIGxldCB6eiA9IHogKiB6MjtcbiAgICBsZXQgd3ggPSB3ICogeDI7XG4gICAgbGV0IHd5ID0gdyAqIHkyO1xuICAgIGxldCB3eiA9IHcgKiB6MjtcblxuICAgIG91dFswXSA9IDEgLSB5eSAtIHp6O1xuICAgIG91dFsxXSA9IHl4ICsgd3o7XG4gICAgb3V0WzJdID0genggLSB3eTtcbiAgICBvdXRbM10gPSAwO1xuXG4gICAgb3V0WzRdID0geXggLSB3ejtcbiAgICBvdXRbNV0gPSAxIC0geHggLSB6ejtcbiAgICBvdXRbNl0gPSB6eSArIHd4O1xuICAgIG91dFs3XSA9IDA7XG5cbiAgICBvdXRbOF0gPSB6eCArIHd5O1xuICAgIG91dFs5XSA9IHp5IC0gd3g7XG4gICAgb3V0WzEwXSA9IDEgLSB4eCAtIHl5O1xuICAgIG91dFsxMV0gPSAwO1xuXG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG5cbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHBlcnNwZWN0aXZlIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGJvdW5kc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3Z5IFZlcnRpY2FsIGZpZWxkIG9mIHZpZXcgaW4gcmFkaWFuc1xuICogQHBhcmFtIHtudW1iZXJ9IGFzcGVjdCBBc3BlY3QgcmF0aW8uIHR5cGljYWxseSB2aWV3cG9ydCB3aWR0aC9oZWlnaHRcbiAqIEBwYXJhbSB7bnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwZXJzcGVjdGl2ZShvdXQsIGZvdnksIGFzcGVjdCwgbmVhciwgZmFyKSB7XG4gICAgbGV0IGYgPSAxLjAgLyBNYXRoLnRhbihmb3Z5IC8gMik7XG4gICAgbGV0IG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMF0gPSBmIC8gYXNwZWN0O1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gZjtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSAoZmFyICsgbmVhcikgKiBuZjtcbiAgICBvdXRbMTFdID0gLTE7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDIgKiBmYXIgKiBuZWFyICogbmY7XG4gICAgb3V0WzE1XSA9IDA7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBvcnRob2dvbmFsIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGJvdW5kc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7bnVtYmVyfSBsZWZ0IExlZnQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSByaWdodCBSaWdodCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGJvdHRvbSBCb3R0b20gYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSB0b3AgVG9wIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gb3J0aG8ob3V0LCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhcikge1xuICAgIGxldCBsciA9IDEgLyAobGVmdCAtIHJpZ2h0KTtcbiAgICBsZXQgYnQgPSAxIC8gKGJvdHRvbSAtIHRvcCk7XG4gICAgbGV0IG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMF0gPSAtMiAqIGxyO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gLTIgKiBidDtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSAyICogbmY7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IChsZWZ0ICsgcmlnaHQpICogbHI7XG4gICAgb3V0WzEzXSA9ICh0b3AgKyBib3R0b20pICogYnQ7XG4gICAgb3V0WzE0XSA9IChmYXIgKyBuZWFyKSAqIG5mO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgbWF0cml4IHRoYXQgbWFrZXMgc29tZXRoaW5nIGxvb2sgYXQgc29tZXRoaW5nIGVsc2UuXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHt2ZWMzfSBleWUgUG9zaXRpb24gb2YgdGhlIHZpZXdlclxuICogQHBhcmFtIHt2ZWMzfSB0YXJnZXQgUG9pbnQgdGhlIHZpZXdlciBpcyBsb29raW5nIGF0XG4gKiBAcGFyYW0ge3ZlYzN9IHVwIHZlYzMgcG9pbnRpbmcgdXBcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRhcmdldFRvKG91dCwgZXllLCB0YXJnZXQsIHVwKSB7XG4gICAgbGV0IGV5ZXggPSBleWVbMF0sXG4gICAgICAgIGV5ZXkgPSBleWVbMV0sXG4gICAgICAgIGV5ZXogPSBleWVbMl0sXG4gICAgICAgIHVweCA9IHVwWzBdLFxuICAgICAgICB1cHkgPSB1cFsxXSxcbiAgICAgICAgdXB6ID0gdXBbMl07XG5cbiAgICBsZXQgejAgPSBleWV4IC0gdGFyZ2V0WzBdLFxuICAgICAgICB6MSA9IGV5ZXkgLSB0YXJnZXRbMV0sXG4gICAgICAgIHoyID0gZXlleiAtIHRhcmdldFsyXTtcblxuICAgIGxldCBsZW4gPSB6MCAqIHowICsgejEgKiB6MSArIHoyICogejI7XG4gICAgaWYgKGxlbiA9PT0gMCkge1xuICAgICAgICAvLyBleWUgYW5kIHRhcmdldCBhcmUgaW4gdGhlIHNhbWUgcG9zaXRpb25cbiAgICAgICAgejIgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgICAgICAgejAgKj0gbGVuO1xuICAgICAgICB6MSAqPSBsZW47XG4gICAgICAgIHoyICo9IGxlbjtcbiAgICB9XG5cbiAgICBsZXQgeDAgPSB1cHkgKiB6MiAtIHVweiAqIHoxLFxuICAgICAgICB4MSA9IHVweiAqIHowIC0gdXB4ICogejIsXG4gICAgICAgIHgyID0gdXB4ICogejEgLSB1cHkgKiB6MDtcblxuICAgIGxlbiA9IHgwICogeDAgKyB4MSAqIHgxICsgeDIgKiB4MjtcbiAgICBpZiAobGVuID09PSAwKSB7XG4gICAgICAgIC8vIHVwIGFuZCB6IGFyZSBwYXJhbGxlbFxuICAgICAgICBpZiAodXB6KSB7XG4gICAgICAgICAgICB1cHggKz0gMWUtNjtcbiAgICAgICAgfSBlbHNlIGlmICh1cHkpIHtcbiAgICAgICAgICAgIHVweiArPSAxZS02O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXB5ICs9IDFlLTY7XG4gICAgICAgIH1cbiAgICAgICAgKHgwID0gdXB5ICogejIgLSB1cHogKiB6MSksICh4MSA9IHVweiAqIHowIC0gdXB4ICogejIpLCAoeDIgPSB1cHggKiB6MSAtIHVweSAqIHowKTtcblxuICAgICAgICBsZW4gPSB4MCAqIHgwICsgeDEgKiB4MSArIHgyICogeDI7XG4gICAgfVxuXG4gICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICAgIHgwICo9IGxlbjtcbiAgICB4MSAqPSBsZW47XG4gICAgeDIgKj0gbGVuO1xuXG4gICAgb3V0WzBdID0geDA7XG4gICAgb3V0WzFdID0geDE7XG4gICAgb3V0WzJdID0geDI7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSB6MSAqIHgyIC0gejIgKiB4MTtcbiAgICBvdXRbNV0gPSB6MiAqIHgwIC0gejAgKiB4MjtcbiAgICBvdXRbNl0gPSB6MCAqIHgxIC0gejEgKiB4MDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IHowO1xuICAgIG91dFs5XSA9IHoxO1xuICAgIG91dFsxMF0gPSB6MjtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gZXlleDtcbiAgICBvdXRbMTNdID0gZXlleTtcbiAgICBvdXRbMTRdID0gZXllejtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIEFkZHMgdHdvIG1hdDQnc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7bWF0NH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZChvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdICsgYlsyXTtcbiAgICBvdXRbM10gPSBhWzNdICsgYlszXTtcbiAgICBvdXRbNF0gPSBhWzRdICsgYls0XTtcbiAgICBvdXRbNV0gPSBhWzVdICsgYls1XTtcbiAgICBvdXRbNl0gPSBhWzZdICsgYls2XTtcbiAgICBvdXRbN10gPSBhWzddICsgYls3XTtcbiAgICBvdXRbOF0gPSBhWzhdICsgYls4XTtcbiAgICBvdXRbOV0gPSBhWzldICsgYls5XTtcbiAgICBvdXRbMTBdID0gYVsxMF0gKyBiWzEwXTtcbiAgICBvdXRbMTFdID0gYVsxMV0gKyBiWzExXTtcbiAgICBvdXRbMTJdID0gYVsxMl0gKyBiWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM10gKyBiWzEzXTtcbiAgICBvdXRbMTRdID0gYVsxNF0gKyBiWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV0gKyBiWzE1XTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFN1YnRyYWN0cyBtYXRyaXggYiBmcm9tIG1hdHJpeCBhXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHttYXQ0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VidHJhY3Qob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAtIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAtIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSAtIGJbMl07XG4gICAgb3V0WzNdID0gYVszXSAtIGJbM107XG4gICAgb3V0WzRdID0gYVs0XSAtIGJbNF07XG4gICAgb3V0WzVdID0gYVs1XSAtIGJbNV07XG4gICAgb3V0WzZdID0gYVs2XSAtIGJbNl07XG4gICAgb3V0WzddID0gYVs3XSAtIGJbN107XG4gICAgb3V0WzhdID0gYVs4XSAtIGJbOF07XG4gICAgb3V0WzldID0gYVs5XSAtIGJbOV07XG4gICAgb3V0WzEwXSA9IGFbMTBdIC0gYlsxMF07XG4gICAgb3V0WzExXSA9IGFbMTFdIC0gYlsxMV07XG4gICAgb3V0WzEyXSA9IGFbMTJdIC0gYlsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdIC0gYlsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdIC0gYlsxNF07XG4gICAgb3V0WzE1XSA9IGFbMTVdIC0gYlsxNV07XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBNdWx0aXBseSBlYWNoIGVsZW1lbnQgb2YgdGhlIG1hdHJpeCBieSBhIHNjYWxhci5cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gc2NhbGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgbWF0cml4J3MgZWxlbWVudHMgYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5U2NhbGFyKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiO1xuICAgIG91dFsyXSA9IGFbMl0gKiBiO1xuICAgIG91dFszXSA9IGFbM10gKiBiO1xuICAgIG91dFs0XSA9IGFbNF0gKiBiO1xuICAgIG91dFs1XSA9IGFbNV0gKiBiO1xuICAgIG91dFs2XSA9IGFbNl0gKiBiO1xuICAgIG91dFs3XSA9IGFbN10gKiBiO1xuICAgIG91dFs4XSA9IGFbOF0gKiBiO1xuICAgIG91dFs5XSA9IGFbOV0gKiBiO1xuICAgIG91dFsxMF0gPSBhWzEwXSAqIGI7XG4gICAgb3V0WzExXSA9IGFbMTFdICogYjtcbiAgICBvdXRbMTJdID0gYVsxMl0gKiBiO1xuICAgIG91dFsxM10gPSBhWzEzXSAqIGI7XG4gICAgb3V0WzE0XSA9IGFbMTRdICogYjtcbiAgICBvdXRbMTVdID0gYVsxNV0gKiBiO1xuICAgIHJldHVybiBvdXQ7XG59XG4iLCJpbXBvcnQgKiBhcyB2ZWM0IGZyb20gJy4vVmVjNEZ1bmMuanMnO1xuXG4vKipcbiAqIFNldCBhIHF1YXQgdG8gdGhlIGlkZW50aXR5IHF1YXRlcm5pb25cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlkZW50aXR5KG91dCkge1xuICAgIG91dFswXSA9IDA7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBTZXRzIGEgcXVhdCBmcm9tIHRoZSBnaXZlbiBhbmdsZSBhbmQgcm90YXRpb24gYXhpcyxcbiAqIHRoZW4gcmV0dXJucyBpdC5cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7dmVjM30gYXhpcyB0aGUgYXhpcyBhcm91bmQgd2hpY2ggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSBpbiByYWRpYW5zXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKiovXG5leHBvcnQgZnVuY3Rpb24gc2V0QXhpc0FuZ2xlKG91dCwgYXhpcywgcmFkKSB7XG4gICAgcmFkID0gcmFkICogMC41O1xuICAgIGxldCBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICBvdXRbMF0gPSBzICogYXhpc1swXTtcbiAgICBvdXRbMV0gPSBzICogYXhpc1sxXTtcbiAgICBvdXRbMl0gPSBzICogYXhpc1syXTtcbiAgICBvdXRbM10gPSBNYXRoLmNvcyhyYWQpO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gcXVhdHNcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtxdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlwbHkob3V0LCBhLCBiKSB7XG4gICAgbGV0IGF4ID0gYVswXSxcbiAgICAgICAgYXkgPSBhWzFdLFxuICAgICAgICBheiA9IGFbMl0sXG4gICAgICAgIGF3ID0gYVszXTtcbiAgICBsZXQgYnggPSBiWzBdLFxuICAgICAgICBieSA9IGJbMV0sXG4gICAgICAgIGJ6ID0gYlsyXSxcbiAgICAgICAgYncgPSBiWzNdO1xuXG4gICAgb3V0WzBdID0gYXggKiBidyArIGF3ICogYnggKyBheSAqIGJ6IC0gYXogKiBieTtcbiAgICBvdXRbMV0gPSBheSAqIGJ3ICsgYXcgKiBieSArIGF6ICogYnggLSBheCAqIGJ6O1xuICAgIG91dFsyXSA9IGF6ICogYncgKyBhdyAqIGJ6ICsgYXggKiBieSAtIGF5ICogYng7XG4gICAgb3V0WzNdID0gYXcgKiBidyAtIGF4ICogYnggLSBheSAqIGJ5IC0gYXogKiBiejtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFJvdGF0ZXMgYSBxdWF0ZXJuaW9uIGJ5IHRoZSBnaXZlbiBhbmdsZSBhYm91dCB0aGUgWCBheGlzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgcXVhdCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0fSBhIHF1YXQgdG8gcm90YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gcmFkIGFuZ2xlIChpbiByYWRpYW5zKSB0byByb3RhdGVcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZVgob3V0LCBhLCByYWQpIHtcbiAgICByYWQgKj0gMC41O1xuXG4gICAgbGV0IGF4ID0gYVswXSxcbiAgICAgICAgYXkgPSBhWzFdLFxuICAgICAgICBheiA9IGFbMl0sXG4gICAgICAgIGF3ID0gYVszXTtcbiAgICBsZXQgYnggPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBidyA9IE1hdGguY29zKHJhZCk7XG5cbiAgICBvdXRbMF0gPSBheCAqIGJ3ICsgYXcgKiBieDtcbiAgICBvdXRbMV0gPSBheSAqIGJ3ICsgYXogKiBieDtcbiAgICBvdXRbMl0gPSBheiAqIGJ3IC0gYXkgKiBieDtcbiAgICBvdXRbM10gPSBhdyAqIGJ3IC0gYXggKiBieDtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFJvdGF0ZXMgYSBxdWF0ZXJuaW9uIGJ5IHRoZSBnaXZlbiBhbmdsZSBhYm91dCB0aGUgWSBheGlzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgcXVhdCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0fSBhIHF1YXQgdG8gcm90YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gcmFkIGFuZ2xlIChpbiByYWRpYW5zKSB0byByb3RhdGVcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZVkob3V0LCBhLCByYWQpIHtcbiAgICByYWQgKj0gMC41O1xuXG4gICAgbGV0IGF4ID0gYVswXSxcbiAgICAgICAgYXkgPSBhWzFdLFxuICAgICAgICBheiA9IGFbMl0sXG4gICAgICAgIGF3ID0gYVszXTtcbiAgICBsZXQgYnkgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBidyA9IE1hdGguY29zKHJhZCk7XG5cbiAgICBvdXRbMF0gPSBheCAqIGJ3IC0gYXogKiBieTtcbiAgICBvdXRbMV0gPSBheSAqIGJ3ICsgYXcgKiBieTtcbiAgICBvdXRbMl0gPSBheiAqIGJ3ICsgYXggKiBieTtcbiAgICBvdXRbM10gPSBhdyAqIGJ3IC0gYXkgKiBieTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFJvdGF0ZXMgYSBxdWF0ZXJuaW9uIGJ5IHRoZSBnaXZlbiBhbmdsZSBhYm91dCB0aGUgWiBheGlzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgcXVhdCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0fSBhIHF1YXQgdG8gcm90YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gcmFkIGFuZ2xlIChpbiByYWRpYW5zKSB0byByb3RhdGVcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZVoob3V0LCBhLCByYWQpIHtcbiAgICByYWQgKj0gMC41O1xuXG4gICAgbGV0IGF4ID0gYVswXSxcbiAgICAgICAgYXkgPSBhWzFdLFxuICAgICAgICBheiA9IGFbMl0sXG4gICAgICAgIGF3ID0gYVszXTtcbiAgICBsZXQgYnogPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBidyA9IE1hdGguY29zKHJhZCk7XG5cbiAgICBvdXRbMF0gPSBheCAqIGJ3ICsgYXkgKiBiejtcbiAgICBvdXRbMV0gPSBheSAqIGJ3IC0gYXggKiBiejtcbiAgICBvdXRbMl0gPSBheiAqIGJ3ICsgYXcgKiBiejtcbiAgICBvdXRbM10gPSBhdyAqIGJ3IC0gYXogKiBiejtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFBlcmZvcm1zIGEgc3BoZXJpY2FsIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtxdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2xlcnAob3V0LCBhLCBiLCB0KSB7XG4gICAgLy8gYmVuY2htYXJrczpcbiAgICAvLyAgICBodHRwOi8vanNwZXJmLmNvbS9xdWF0ZXJuaW9uLXNsZXJwLWltcGxlbWVudGF0aW9uc1xuICAgIGxldCBheCA9IGFbMF0sXG4gICAgICAgIGF5ID0gYVsxXSxcbiAgICAgICAgYXogPSBhWzJdLFxuICAgICAgICBhdyA9IGFbM107XG4gICAgbGV0IGJ4ID0gYlswXSxcbiAgICAgICAgYnkgPSBiWzFdLFxuICAgICAgICBieiA9IGJbMl0sXG4gICAgICAgIGJ3ID0gYlszXTtcblxuICAgIGxldCBvbWVnYSwgY29zb20sIHNpbm9tLCBzY2FsZTAsIHNjYWxlMTtcblxuICAgIC8vIGNhbGMgY29zaW5lXG4gICAgY29zb20gPSBheCAqIGJ4ICsgYXkgKiBieSArIGF6ICogYnogKyBhdyAqIGJ3O1xuICAgIC8vIGFkanVzdCBzaWducyAoaWYgbmVjZXNzYXJ5KVxuICAgIGlmIChjb3NvbSA8IDAuMCkge1xuICAgICAgICBjb3NvbSA9IC1jb3NvbTtcbiAgICAgICAgYnggPSAtYng7XG4gICAgICAgIGJ5ID0gLWJ5O1xuICAgICAgICBieiA9IC1iejtcbiAgICAgICAgYncgPSAtYnc7XG4gICAgfVxuICAgIC8vIGNhbGN1bGF0ZSBjb2VmZmljaWVudHNcbiAgICBpZiAoMS4wIC0gY29zb20gPiAwLjAwMDAwMSkge1xuICAgICAgICAvLyBzdGFuZGFyZCBjYXNlIChzbGVycClcbiAgICAgICAgb21lZ2EgPSBNYXRoLmFjb3MoY29zb20pO1xuICAgICAgICBzaW5vbSA9IE1hdGguc2luKG9tZWdhKTtcbiAgICAgICAgc2NhbGUwID0gTWF0aC5zaW4oKDEuMCAtIHQpICogb21lZ2EpIC8gc2lub207XG4gICAgICAgIHNjYWxlMSA9IE1hdGguc2luKHQgKiBvbWVnYSkgLyBzaW5vbTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBcImZyb21cIiBhbmQgXCJ0b1wiIHF1YXRlcm5pb25zIGFyZSB2ZXJ5IGNsb3NlXG4gICAgICAgIC8vICAuLi4gc28gd2UgY2FuIGRvIGEgbGluZWFyIGludGVycG9sYXRpb25cbiAgICAgICAgc2NhbGUwID0gMS4wIC0gdDtcbiAgICAgICAgc2NhbGUxID0gdDtcbiAgICB9XG4gICAgLy8gY2FsY3VsYXRlIGZpbmFsIHZhbHVlc1xuICAgIG91dFswXSA9IHNjYWxlMCAqIGF4ICsgc2NhbGUxICogYng7XG4gICAgb3V0WzFdID0gc2NhbGUwICogYXkgKyBzY2FsZTEgKiBieTtcbiAgICBvdXRbMl0gPSBzY2FsZTAgKiBheiArIHNjYWxlMSAqIGJ6O1xuICAgIG91dFszXSA9IHNjYWxlMCAqIGF3ICsgc2NhbGUxICogYnc7XG5cbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGludmVyc2Ugb2YgYSBxdWF0XG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdCB0byBjYWxjdWxhdGUgaW52ZXJzZSBvZlxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJ0KG91dCwgYSkge1xuICAgIGxldCBhMCA9IGFbMF0sXG4gICAgICAgIGExID0gYVsxXSxcbiAgICAgICAgYTIgPSBhWzJdLFxuICAgICAgICBhMyA9IGFbM107XG4gICAgbGV0IGRvdCA9IGEwICogYTAgKyBhMSAqIGExICsgYTIgKiBhMiArIGEzICogYTM7XG4gICAgbGV0IGludkRvdCA9IGRvdCA/IDEuMCAvIGRvdCA6IDA7XG5cbiAgICAvLyBUT0RPOiBXb3VsZCBiZSBmYXN0ZXIgdG8gcmV0dXJuIFswLDAsMCwwXSBpbW1lZGlhdGVseSBpZiBkb3QgPT0gMFxuXG4gICAgb3V0WzBdID0gLWEwICogaW52RG90O1xuICAgIG91dFsxXSA9IC1hMSAqIGludkRvdDtcbiAgICBvdXRbMl0gPSAtYTIgKiBpbnZEb3Q7XG4gICAgb3V0WzNdID0gYTMgKiBpbnZEb3Q7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBjb25qdWdhdGUgb2YgYSBxdWF0XG4gKiBJZiB0aGUgcXVhdGVybmlvbiBpcyBub3JtYWxpemVkLCB0aGlzIGZ1bmN0aW9uIGlzIGZhc3RlciB0aGFuIHF1YXQuaW52ZXJzZSBhbmQgcHJvZHVjZXMgdGhlIHNhbWUgcmVzdWx0LlxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtxdWF0fSBhIHF1YXQgdG8gY2FsY3VsYXRlIGNvbmp1Z2F0ZSBvZlxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gY29uanVnYXRlKG91dCwgYSkge1xuICAgIG91dFswXSA9IC1hWzBdO1xuICAgIG91dFsxXSA9IC1hWzFdO1xuICAgIG91dFsyXSA9IC1hWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgcXVhdGVybmlvbiBmcm9tIHRoZSBnaXZlbiAzeDMgcm90YXRpb24gbWF0cml4LlxuICpcbiAqIE5PVEU6IFRoZSByZXN1bHRhbnQgcXVhdGVybmlvbiBpcyBub3Qgbm9ybWFsaXplZCwgc28geW91IHNob3VsZCBiZSBzdXJlXG4gKiB0byByZW5vcm1hbGl6ZSB0aGUgcXVhdGVybmlvbiB5b3Vyc2VsZiB3aGVyZSBuZWNlc3NhcnkuXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge21hdDN9IG0gcm90YXRpb24gbWF0cml4XG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21NYXQzKG91dCwgbSkge1xuICAgIC8vIEFsZ29yaXRobSBpbiBLZW4gU2hvZW1ha2UncyBhcnRpY2xlIGluIDE5ODcgU0lHR1JBUEggY291cnNlIG5vdGVzXG4gICAgLy8gYXJ0aWNsZSBcIlF1YXRlcm5pb24gQ2FsY3VsdXMgYW5kIEZhc3QgQW5pbWF0aW9uXCIuXG4gICAgbGV0IGZUcmFjZSA9IG1bMF0gKyBtWzRdICsgbVs4XTtcbiAgICBsZXQgZlJvb3Q7XG5cbiAgICBpZiAoZlRyYWNlID4gMC4wKSB7XG4gICAgICAgIC8vIHx3fCA+IDEvMiwgbWF5IGFzIHdlbGwgY2hvb3NlIHcgPiAxLzJcbiAgICAgICAgZlJvb3QgPSBNYXRoLnNxcnQoZlRyYWNlICsgMS4wKTsgLy8gMndcbiAgICAgICAgb3V0WzNdID0gMC41ICogZlJvb3Q7XG4gICAgICAgIGZSb290ID0gMC41IC8gZlJvb3Q7IC8vIDEvKDR3KVxuICAgICAgICBvdXRbMF0gPSAobVs1XSAtIG1bN10pICogZlJvb3Q7XG4gICAgICAgIG91dFsxXSA9IChtWzZdIC0gbVsyXSkgKiBmUm9vdDtcbiAgICAgICAgb3V0WzJdID0gKG1bMV0gLSBtWzNdKSAqIGZSb290O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHx3fCA8PSAxLzJcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBpZiAobVs0XSA+IG1bMF0pIGkgPSAxO1xuICAgICAgICBpZiAobVs4XSA+IG1baSAqIDMgKyBpXSkgaSA9IDI7XG4gICAgICAgIGxldCBqID0gKGkgKyAxKSAlIDM7XG4gICAgICAgIGxldCBrID0gKGkgKyAyKSAlIDM7XG5cbiAgICAgICAgZlJvb3QgPSBNYXRoLnNxcnQobVtpICogMyArIGldIC0gbVtqICogMyArIGpdIC0gbVtrICogMyArIGtdICsgMS4wKTtcbiAgICAgICAgb3V0W2ldID0gMC41ICogZlJvb3Q7XG4gICAgICAgIGZSb290ID0gMC41IC8gZlJvb3Q7XG4gICAgICAgIG91dFszXSA9IChtW2ogKiAzICsga10gLSBtW2sgKiAzICsgal0pICogZlJvb3Q7XG4gICAgICAgIG91dFtqXSA9IChtW2ogKiAzICsgaV0gKyBtW2kgKiAzICsgal0pICogZlJvb3Q7XG4gICAgICAgIG91dFtrXSA9IChtW2sgKiAzICsgaV0gKyBtW2kgKiAzICsga10pICogZlJvb3Q7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgcXVhdGVybmlvbiBmcm9tIHRoZSBnaXZlbiBldWxlciBhbmdsZSB4LCB5LCB6LlxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHt2ZWMzfSBldWxlciBBbmdsZXMgdG8gcm90YXRlIGFyb3VuZCBlYWNoIGF4aXMgaW4gZGVncmVlcy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBvcmRlciBkZXRhaWxpbmcgb3JkZXIgb2Ygb3BlcmF0aW9ucy4gRGVmYXVsdCAnWFlaJy5cbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZnJvbUV1bGVyKG91dCwgZXVsZXIsIG9yZGVyID0gJ1lYWicpIHtcbiAgICBsZXQgc3ggPSBNYXRoLnNpbihldWxlclswXSAqIDAuNSk7XG4gICAgbGV0IGN4ID0gTWF0aC5jb3MoZXVsZXJbMF0gKiAwLjUpO1xuICAgIGxldCBzeSA9IE1hdGguc2luKGV1bGVyWzFdICogMC41KTtcbiAgICBsZXQgY3kgPSBNYXRoLmNvcyhldWxlclsxXSAqIDAuNSk7XG4gICAgbGV0IHN6ID0gTWF0aC5zaW4oZXVsZXJbMl0gKiAwLjUpO1xuICAgIGxldCBjeiA9IE1hdGguY29zKGV1bGVyWzJdICogMC41KTtcblxuICAgIGlmIChvcmRlciA9PT0gJ1hZWicpIHtcbiAgICAgICAgb3V0WzBdID0gc3ggKiBjeSAqIGN6ICsgY3ggKiBzeSAqIHN6O1xuICAgICAgICBvdXRbMV0gPSBjeCAqIHN5ICogY3ogLSBzeCAqIGN5ICogc3o7XG4gICAgICAgIG91dFsyXSA9IGN4ICogY3kgKiBzeiArIHN4ICogc3kgKiBjejtcbiAgICAgICAgb3V0WzNdID0gY3ggKiBjeSAqIGN6IC0gc3ggKiBzeSAqIHN6O1xuICAgIH0gZWxzZSBpZiAob3JkZXIgPT09ICdZWFonKSB7XG4gICAgICAgIG91dFswXSA9IHN4ICogY3kgKiBjeiArIGN4ICogc3kgKiBzejtcbiAgICAgICAgb3V0WzFdID0gY3ggKiBzeSAqIGN6IC0gc3ggKiBjeSAqIHN6O1xuICAgICAgICBvdXRbMl0gPSBjeCAqIGN5ICogc3ogLSBzeCAqIHN5ICogY3o7XG4gICAgICAgIG91dFszXSA9IGN4ICogY3kgKiBjeiArIHN4ICogc3kgKiBzejtcbiAgICB9IGVsc2UgaWYgKG9yZGVyID09PSAnWlhZJykge1xuICAgICAgICBvdXRbMF0gPSBzeCAqIGN5ICogY3ogLSBjeCAqIHN5ICogc3o7XG4gICAgICAgIG91dFsxXSA9IGN4ICogc3kgKiBjeiArIHN4ICogY3kgKiBzejtcbiAgICAgICAgb3V0WzJdID0gY3ggKiBjeSAqIHN6ICsgc3ggKiBzeSAqIGN6O1xuICAgICAgICBvdXRbM10gPSBjeCAqIGN5ICogY3ogLSBzeCAqIHN5ICogc3o7XG4gICAgfSBlbHNlIGlmIChvcmRlciA9PT0gJ1pZWCcpIHtcbiAgICAgICAgb3V0WzBdID0gc3ggKiBjeSAqIGN6IC0gY3ggKiBzeSAqIHN6O1xuICAgICAgICBvdXRbMV0gPSBjeCAqIHN5ICogY3ogKyBzeCAqIGN5ICogc3o7XG4gICAgICAgIG91dFsyXSA9IGN4ICogY3kgKiBzeiAtIHN4ICogc3kgKiBjejtcbiAgICAgICAgb3V0WzNdID0gY3ggKiBjeSAqIGN6ICsgc3ggKiBzeSAqIHN6O1xuICAgIH0gZWxzZSBpZiAob3JkZXIgPT09ICdZWlgnKSB7XG4gICAgICAgIG91dFswXSA9IHN4ICogY3kgKiBjeiArIGN4ICogc3kgKiBzejtcbiAgICAgICAgb3V0WzFdID0gY3ggKiBzeSAqIGN6ICsgc3ggKiBjeSAqIHN6O1xuICAgICAgICBvdXRbMl0gPSBjeCAqIGN5ICogc3ogLSBzeCAqIHN5ICogY3o7XG4gICAgICAgIG91dFszXSA9IGN4ICogY3kgKiBjeiAtIHN4ICogc3kgKiBzejtcbiAgICB9IGVsc2UgaWYgKG9yZGVyID09PSAnWFpZJykge1xuICAgICAgICBvdXRbMF0gPSBzeCAqIGN5ICogY3ogLSBjeCAqIHN5ICogc3o7XG4gICAgICAgIG91dFsxXSA9IGN4ICogc3kgKiBjeiAtIHN4ICogY3kgKiBzejtcbiAgICAgICAgb3V0WzJdID0gY3ggKiBjeSAqIHN6ICsgc3ggKiBzeSAqIGN6O1xuICAgICAgICBvdXRbM10gPSBjeCAqIGN5ICogY3ogKyBzeCAqIHN5ICogc3o7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgcXVhdCB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgdGhlIHNvdXJjZSBxdWF0ZXJuaW9uXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGNvcHkgPSB2ZWM0LmNvcHk7XG5cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgcXVhdCB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0gdyBXIGNvbXBvbmVudFxuICogQHJldHVybnMge3F1YXR9IG91dFxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBzZXQgPSB2ZWM0LnNldDtcblxuLyoqXG4gKiBBZGRzIHR3byBxdWF0J3NcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtxdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3F1YXR9IG91dFxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBhZGQgPSB2ZWM0LmFkZDtcblxuLyoqXG4gKiBTY2FsZXMgYSBxdWF0IGJ5IGEgc2NhbGFyIG51bWJlclxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3F1YXR9IGEgdGhlIHZlY3RvciB0byBzY2FsZVxuICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSB2ZWN0b3IgYnlcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3Qgc2NhbGUgPSB2ZWM0LnNjYWxlO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byBxdWF0J3NcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7cXVhdH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgZG90ID0gdmVjNC5kb3Q7XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byBxdWF0J3NcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtxdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3F1YXR9IG91dFxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBsZXJwID0gdmVjNC5sZXJwO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGxlbmd0aCBvZiBhXG4gKi9cbmV4cG9ydCBjb25zdCBsZW5ndGggPSB2ZWM0Lmxlbmd0aDtcblxuLyoqXG4gKiBOb3JtYWxpemUgYSBxdWF0XG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdGVybmlvbiB0byBub3JtYWxpemVcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplID0gdmVjNC5ub3JtYWxpemU7XG4iLCJjb25zdCBFUFNJTE9OID0gMC4wMDAwMDE7XG5cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHZlYzIgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIHNvdXJjZSB2ZWN0b3JcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcHkob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMiB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0KG91dCwgeCwgeSkge1xuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIEFkZHMgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZChvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFN1YnRyYWN0cyB2ZWN0b3IgYiBmcm9tIHZlY3RvciBhXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VidHJhY3Qob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAtIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAtIGJbMV07XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aXBseShvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICogYlsxXTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIERpdmlkZXMgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpdmlkZShvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC8gYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdIC8gYlsxXTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFNjYWxlcyBhIHZlYzIgYnkgYSBzY2FsYXIgbnVtYmVyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2NhbGUob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGI7XG4gICAgb3V0WzFdID0gYVsxXSAqIGI7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc3RhbmNlKGEsIGIpIHtcbiAgICB2YXIgeCA9IGJbMF0gLSBhWzBdLFxuICAgICAgICB5ID0gYlsxXSAtIGFbMV07XG4gICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcXVhcmVkRGlzdGFuY2UoYSwgYikge1xuICAgIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICAgIHkgPSBiWzFdIC0gYVsxXTtcbiAgICByZXR1cm4geCAqIHggKyB5ICogeTtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSB2ZWMyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICovXG5leHBvcnQgZnVuY3Rpb24gbGVuZ3RoKGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdO1xuICAgIHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgYSB2ZWMyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgc3F1YXJlZCBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgbGVuZ3RoIG9mIGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNxdWFyZWRMZW5ndGgoYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV07XG4gICAgcmV0dXJuIHggKiB4ICsgeSAqIHk7XG59XG5cbi8qKlxuICogTmVnYXRlcyB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHZlY3RvciB0byBuZWdhdGVcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5lZ2F0ZShvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSAtYVswXTtcbiAgICBvdXRbMV0gPSAtYVsxXTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGludmVyc2Ugb2YgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB2ZWN0b3IgdG8gaW52ZXJ0XG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKG91dCwgYSkge1xuICAgIG91dFswXSA9IDEuMCAvIGFbMF07XG4gICAgb3V0WzFdID0gMS4wIC8gYVsxXTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIE5vcm1hbGl6ZSBhIHZlYzJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHZlY3RvciB0byBub3JtYWxpemVcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZShvdXQsIGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdO1xuICAgIHZhciBsZW4gPSB4ICogeCArIHkgKiB5O1xuICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgIC8vVE9ETzogZXZhbHVhdGUgdXNlIG9mIGdsbV9pbnZzcXJ0IGhlcmU/XG4gICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgICB9XG4gICAgb3V0WzBdID0gYVswXSAqIGxlbjtcbiAgICBvdXRbMV0gPSBhWzFdICogbGVuO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZG90IHByb2R1Y3Qgb2YgYSBhbmQgYlxuICovXG5leHBvcnQgZnVuY3Rpb24gZG90KGEsIGIpIHtcbiAgICByZXR1cm4gYVswXSAqIGJbMF0gKyBhWzFdICogYlsxXTtcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0d28gdmVjMidzXG4gKiBOb3RlIHRoYXQgdGhlIGNyb3NzIHByb2R1Y3QgcmV0dXJucyBhIHNjYWxhclxuICpcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gY3Jvc3MgcHJvZHVjdCBvZiBhIGFuZCBiXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcm9zcyhhLCBiKSB7XG4gICAgcmV0dXJuIGFbMF0gKiBiWzFdIC0gYVsxXSAqIGJbMF07XG59XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsZXJwKG91dCwgYSwgYiwgdCkge1xuICAgIHZhciBheCA9IGFbMF0sXG4gICAgICAgIGF5ID0gYVsxXTtcbiAgICBvdXRbMF0gPSBheCArIHQgKiAoYlswXSAtIGF4KTtcbiAgICBvdXRbMV0gPSBheSArIHQgKiAoYlsxXSAtIGF5KTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzIgd2l0aCBhIG1hdDJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge21hdDJ9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1NYXQyKG91dCwgYSwgbSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV07XG4gICAgb3V0WzBdID0gbVswXSAqIHggKyBtWzJdICogeTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bM10gKiB5O1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0MmRcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge21hdDJkfSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtTWF0MmQob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bMl0gKiB5ICsgbVs0XTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bM10gKiB5ICsgbVs1XTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzIgd2l0aCBhIG1hdDNcbiAqIDNyZCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzEnXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHttYXQzfSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtTWF0MyhvdXQsIGEsIG0pIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVszXSAqIHkgKyBtWzZdO1xuICAgIG91dFsxXSA9IG1bMV0gKiB4ICsgbVs0XSAqIHkgKyBtWzddO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0NFxuICogM3JkIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMCdcbiAqIDR0aCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzEnXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHttYXQ0fSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtTWF0NChvdXQsIGEsIG0pIHtcbiAgICBsZXQgeCA9IGFbMF07XG4gICAgbGV0IHkgPSBhWzFdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzEyXTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bNV0gKiB5ICsgbVsxM107XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB2ZWN0b3JzIGV4YWN0bHkgaGF2ZSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbiAod2hlbiBjb21wYXJlZCB3aXRoID09PSlcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgVGhlIGZpcnN0IHZlY3Rvci5cbiAqIEBwYXJhbSB7dmVjMn0gYiBUaGUgc2Vjb25kIHZlY3Rvci5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXhhY3RFcXVhbHMoYSwgYikge1xuICAgIHJldHVybiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV07XG59XG4iLCJjb25zdCBFUFNJTE9OID0gMC4wMDAwMDE7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gbGVuZ3RoIG9mIGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxlbmd0aChhKSB7XG4gICAgbGV0IHggPSBhWzBdO1xuICAgIGxldCB5ID0gYVsxXTtcbiAgICBsZXQgeiA9IGFbMl07XG4gICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHopO1xufVxuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSB2ZWMzIHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBzb3VyY2UgdmVjdG9yXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5KG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMyB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldChvdXQsIHgsIHksIHopIHtcbiAgICBvdXRbMF0gPSB4O1xuICAgIG91dFsxXSA9IHk7XG4gICAgb3V0WzJdID0gejtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIEFkZHMgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZChvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdICsgYlsyXTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFN1YnRyYWN0cyB2ZWN0b3IgYiBmcm9tIHZlY3RvciBhXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VidHJhY3Qob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAtIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAtIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSAtIGJbMl07XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aXBseShvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICogYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdICogYlsyXTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIERpdmlkZXMgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpdmlkZShvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC8gYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdIC8gYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdIC8gYlsyXTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFNjYWxlcyBhIHZlYzMgYnkgYSBzY2FsYXIgbnVtYmVyXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2NhbGUob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGI7XG4gICAgb3V0WzFdID0gYVsxXSAqIGI7XG4gICAgb3V0WzJdID0gYVsyXSAqIGI7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc3RhbmNlKGEsIGIpIHtcbiAgICBsZXQgeCA9IGJbMF0gLSBhWzBdO1xuICAgIGxldCB5ID0gYlsxXSAtIGFbMV07XG4gICAgbGV0IHogPSBiWzJdIC0gYVsyXTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkgKyB6ICogeik7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3F1YXJlZERpc3RhbmNlKGEsIGIpIHtcbiAgICBsZXQgeCA9IGJbMF0gLSBhWzBdO1xuICAgIGxldCB5ID0gYlsxXSAtIGFbMV07XG4gICAgbGV0IHogPSBiWzJdIC0gYVsyXTtcbiAgICByZXR1cm4geCAqIHggKyB5ICogeSArIHogKiB6O1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHNxdWFyZWQgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGxlbmd0aCBvZiBhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcXVhcmVkTGVuZ3RoKGEpIHtcbiAgICBsZXQgeCA9IGFbMF07XG4gICAgbGV0IHkgPSBhWzFdO1xuICAgIGxldCB6ID0gYVsyXTtcbiAgICByZXR1cm4geCAqIHggKyB5ICogeSArIHogKiB6O1xufVxuXG4vKipcbiAqIE5lZ2F0ZXMgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gbmVnYXRlXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBuZWdhdGUob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gLWFbMF07XG4gICAgb3V0WzFdID0gLWFbMV07XG4gICAgb3V0WzJdID0gLWFbMl07XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpbnZlcnNlIG9mIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdmVjdG9yIHRvIGludmVydFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSAxLjAgLyBhWzBdO1xuICAgIG91dFsxXSA9IDEuMCAvIGFbMV07XG4gICAgb3V0WzJdID0gMS4wIC8gYVsyXTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIE5vcm1hbGl6ZSBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBub3JtYWxpemVcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZShvdXQsIGEpIHtcbiAgICBsZXQgeCA9IGFbMF07XG4gICAgbGV0IHkgPSBhWzFdO1xuICAgIGxldCB6ID0gYVsyXTtcbiAgICBsZXQgbGVuID0geCAqIHggKyB5ICogeSArIHogKiB6O1xuICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgIC8vVE9ETzogZXZhbHVhdGUgdXNlIG9mIGdsbV9pbnZzcXJ0IGhlcmU/XG4gICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgICB9XG4gICAgb3V0WzBdID0gYVswXSAqIGxlbjtcbiAgICBvdXRbMV0gPSBhWzFdICogbGVuO1xuICAgIG91dFsyXSA9IGFbMl0gKiBsZW47XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkb3QoYSwgYikge1xuICAgIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdICsgYVsyXSAqIGJbMl07XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIGNyb3NzIHByb2R1Y3Qgb2YgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyb3NzKG91dCwgYSwgYikge1xuICAgIGxldCBheCA9IGFbMF0sXG4gICAgICAgIGF5ID0gYVsxXSxcbiAgICAgICAgYXogPSBhWzJdO1xuICAgIGxldCBieCA9IGJbMF0sXG4gICAgICAgIGJ5ID0gYlsxXSxcbiAgICAgICAgYnogPSBiWzJdO1xuXG4gICAgb3V0WzBdID0gYXkgKiBieiAtIGF6ICogYnk7XG4gICAgb3V0WzFdID0gYXogKiBieCAtIGF4ICogYno7XG4gICAgb3V0WzJdID0gYXggKiBieSAtIGF5ICogYng7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50IGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxlcnAob3V0LCBhLCBiLCB0KSB7XG4gICAgbGV0IGF4ID0gYVswXTtcbiAgICBsZXQgYXkgPSBhWzFdO1xuICAgIGxldCBheiA9IGFbMl07XG4gICAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheCk7XG4gICAgb3V0WzFdID0gYXkgKyB0ICogKGJbMV0gLSBheSk7XG4gICAgb3V0WzJdID0gYXogKyB0ICogKGJbMl0gLSBheik7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMzIHdpdGggYSBtYXQ0LlxuICogNHRoIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMSdcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge21hdDR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1NYXQ0KG91dCwgYSwgbSkge1xuICAgIGxldCB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdO1xuICAgIGxldCB3ID0gbVszXSAqIHggKyBtWzddICogeSArIG1bMTFdICogeiArIG1bMTVdO1xuICAgIHcgPSB3IHx8IDEuMDtcbiAgICBvdXRbMF0gPSAobVswXSAqIHggKyBtWzRdICogeSArIG1bOF0gKiB6ICsgbVsxMl0pIC8gdztcbiAgICBvdXRbMV0gPSAobVsxXSAqIHggKyBtWzVdICogeSArIG1bOV0gKiB6ICsgbVsxM10pIC8gdztcbiAgICBvdXRbMl0gPSAobVsyXSAqIHggKyBtWzZdICogeSArIG1bMTBdICogeiArIG1bMTRdKSAvIHc7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBTYW1lIGFzIGFib3ZlIGJ1dCBkb2Vzbid0IGFwcGx5IHRyYW5zbGF0aW9uLlxuICogVXNlZnVsIGZvciByYXlzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2NhbGVSb3RhdGVNYXQ0KG91dCwgYSwgbSkge1xuICAgIGxldCB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdO1xuICAgIGxldCB3ID0gbVszXSAqIHggKyBtWzddICogeSArIG1bMTFdICogeiArIG1bMTVdO1xuICAgIHcgPSB3IHx8IDEuMDtcbiAgICBvdXRbMF0gPSAobVswXSAqIHggKyBtWzRdICogeSArIG1bOF0gKiB6KSAvIHc7XG4gICAgb3V0WzFdID0gKG1bMV0gKiB4ICsgbVs1XSAqIHkgKyBtWzldICogeikgLyB3O1xuICAgIG91dFsyXSA9IChtWzJdICogeCArIG1bNl0gKiB5ICsgbVsxMF0gKiB6KSAvIHc7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMzIHdpdGggYSBtYXQzLlxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0M30gbSB0aGUgM3gzIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtTWF0MyhvdXQsIGEsIG0pIHtcbiAgICBsZXQgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdLFxuICAgICAgICB6ID0gYVsyXTtcbiAgICBvdXRbMF0gPSB4ICogbVswXSArIHkgKiBtWzNdICsgeiAqIG1bNl07XG4gICAgb3V0WzFdID0geCAqIG1bMV0gKyB5ICogbVs0XSArIHogKiBtWzddO1xuICAgIG91dFsyXSA9IHggKiBtWzJdICsgeSAqIG1bNV0gKyB6ICogbVs4XTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge3F1YXR9IHEgcXVhdGVybmlvbiB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtUXVhdChvdXQsIGEsIHEpIHtcbiAgICAvLyBiZW5jaG1hcmtzOiBodHRwczovL2pzcGVyZi5jb20vcXVhdGVybmlvbi10cmFuc2Zvcm0tdmVjMy1pbXBsZW1lbnRhdGlvbnMtZml4ZWRcblxuICAgIGxldCB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdO1xuICAgIGxldCBxeCA9IHFbMF0sXG4gICAgICAgIHF5ID0gcVsxXSxcbiAgICAgICAgcXogPSBxWzJdLFxuICAgICAgICBxdyA9IHFbM107XG5cbiAgICBsZXQgdXZ4ID0gcXkgKiB6IC0gcXogKiB5O1xuICAgIGxldCB1dnkgPSBxeiAqIHggLSBxeCAqIHo7XG4gICAgbGV0IHV2eiA9IHF4ICogeSAtIHF5ICogeDtcblxuICAgIGxldCB1dXZ4ID0gcXkgKiB1dnogLSBxeiAqIHV2eTtcbiAgICBsZXQgdXV2eSA9IHF6ICogdXZ4IC0gcXggKiB1dno7XG4gICAgbGV0IHV1dnogPSBxeCAqIHV2eSAtIHF5ICogdXZ4O1xuXG4gICAgbGV0IHcyID0gcXcgKiAyO1xuICAgIHV2eCAqPSB3MjtcbiAgICB1dnkgKj0gdzI7XG4gICAgdXZ6ICo9IHcyO1xuXG4gICAgdXV2eCAqPSAyO1xuICAgIHV1dnkgKj0gMjtcbiAgICB1dXZ6ICo9IDI7XG5cbiAgICBvdXRbMF0gPSB4ICsgdXZ4ICsgdXV2eDtcbiAgICBvdXRbMV0gPSB5ICsgdXZ5ICsgdXV2eTtcbiAgICBvdXRbMl0gPSB6ICsgdXZ6ICsgdXV2ejtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIEdldCB0aGUgYW5nbGUgYmV0d2VlbiB0d28gM0QgdmVjdG9yc1xuICogQHBhcmFtIHt2ZWMzfSBhIFRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgVGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgYW5nbGUgaW4gcmFkaWFuc1xuICovXG5leHBvcnQgY29uc3QgYW5nbGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHRlbXBBID0gWzAsIDAsIDBdO1xuICAgIGNvbnN0IHRlbXBCID0gWzAsIDAsIDBdO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIGNvcHkodGVtcEEsIGEpO1xuICAgICAgICBjb3B5KHRlbXBCLCBiKTtcblxuICAgICAgICBub3JtYWxpemUodGVtcEEsIHRlbXBBKTtcbiAgICAgICAgbm9ybWFsaXplKHRlbXBCLCB0ZW1wQik7XG5cbiAgICAgICAgbGV0IGNvc2luZSA9IGRvdCh0ZW1wQSwgdGVtcEIpO1xuXG4gICAgICAgIGlmIChjb3NpbmUgPiAxLjApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9IGVsc2UgaWYgKGNvc2luZSA8IC0xLjApIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLlBJO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguYWNvcyhjb3NpbmUpO1xuICAgICAgICB9XG4gICAgfTtcbn0pKCk7XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdmVjdG9ycyBoYXZlIGV4YWN0bHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24gKHdoZW4gY29tcGFyZWQgd2l0aCA9PT0pXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIFRoZSBmaXJzdCB2ZWN0b3IuXG4gKiBAcGFyYW0ge3ZlYzN9IGIgVGhlIHNlY29uZCB2ZWN0b3IuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4YWN0RXF1YWxzKGEsIGIpIHtcbiAgICByZXR1cm4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdICYmIGFbMl0gPT09IGJbMl07XG59XG4iLCJjb25zdCBFUFNJTE9OID0gMC4wMDAwMDE7XG5cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHZlYzQgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIHNvdXJjZSB2ZWN0b3JcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcHkob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzQgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0gdyBXIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0KG91dCwgeCwgeSwgeiwgdykge1xuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICBvdXRbMl0gPSB6O1xuICAgIG91dFszXSA9IHc7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBBZGRzIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGQob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gICAgb3V0WzNdID0gYVszXSArIGJbM107XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBTY2FsZXMgYSB2ZWM0IGJ5IGEgc2NhbGFyIG51bWJlclxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIHZlY3RvciB0byBzY2FsZVxuICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSB2ZWN0b3IgYnlcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiO1xuICAgIG91dFsyXSA9IGFbMl0gKiBiO1xuICAgIG91dFszXSA9IGFbM10gKiBiO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gbGVuZ3RoIG9mIGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxlbmd0aChhKSB7XG4gICAgbGV0IHggPSBhWzBdO1xuICAgIGxldCB5ID0gYVsxXTtcbiAgICBsZXQgeiA9IGFbMl07XG4gICAgbGV0IHcgPSBhWzNdO1xuICAgIHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHcpO1xufVxuXG4vKipcbiAqIE5vcm1hbGl6ZSBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byBub3JtYWxpemVcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZShvdXQsIGEpIHtcbiAgICBsZXQgeCA9IGFbMF07XG4gICAgbGV0IHkgPSBhWzFdO1xuICAgIGxldCB6ID0gYVsyXTtcbiAgICBsZXQgdyA9IGFbM107XG4gICAgbGV0IGxlbiA9IHggKiB4ICsgeSAqIHkgKyB6ICogeiArIHcgKiB3O1xuICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgICB9XG4gICAgb3V0WzBdID0geCAqIGxlbjtcbiAgICBvdXRbMV0gPSB5ICogbGVuO1xuICAgIG91dFsyXSA9IHogKiBsZW47XG4gICAgb3V0WzNdID0gdyAqIGxlbjtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRvdChhLCBiKSB7XG4gICAgcmV0dXJuIGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV0gKyBhWzJdICogYlsyXSArIGFbM10gKiBiWzNdO1xufVxuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gbGVycChvdXQsIGEsIGIsIHQpIHtcbiAgICBsZXQgYXggPSBhWzBdO1xuICAgIGxldCBheSA9IGFbMV07XG4gICAgbGV0IGF6ID0gYVsyXTtcbiAgICBsZXQgYXcgPSBhWzNdO1xuICAgIG91dFswXSA9IGF4ICsgdCAqIChiWzBdIC0gYXgpO1xuICAgIG91dFsxXSA9IGF5ICsgdCAqIChiWzFdIC0gYXkpO1xuICAgIG91dFsyXSA9IGF6ICsgdCAqIChiWzJdIC0gYXopO1xuICAgIG91dFszXSA9IGF3ICsgdCAqIChiWzNdIC0gYXcpO1xuICAgIHJldHVybiBvdXQ7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI4NGMxNzZmYTZhYjM5MTIyZjNmMFwiKSIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKiBnbG9iYWwgX19yZXNvdXJjZVF1ZXJ5LCBfX3dlYnBhY2tfaGFzaF9fICovXG4vLy8gPHJlZmVyZW5jZSB0eXBlcz1cIndlYnBhY2svbW9kdWxlXCIgLz5cbmltcG9ydCB3ZWJwYWNrSG90TG9nIGZyb20gXCJ3ZWJwYWNrL2hvdC9sb2cuanNcIjtcbmltcG9ydCBzdHJpcEFuc2kgZnJvbSBcIi4vbW9kdWxlcy9zdHJpcC1hbnNpL2luZGV4LmpzXCI7XG5pbXBvcnQgcGFyc2VVUkwgZnJvbSBcIi4vdXRpbHMvcGFyc2VVUkwuanNcIjtcbmltcG9ydCBzb2NrZXQgZnJvbSBcIi4vc29ja2V0LmpzXCI7XG5pbXBvcnQgeyBmb3JtYXRQcm9ibGVtLCBzaG93LCBoaWRlIH0gZnJvbSBcIi4vb3ZlcmxheS5qc1wiO1xuaW1wb3J0IHsgbG9nLCBzZXRMb2dMZXZlbCB9IGZyb20gXCIuL3V0aWxzL2xvZy5qc1wiO1xuaW1wb3J0IHNlbmRNZXNzYWdlIGZyb20gXCIuL3V0aWxzL3NlbmRNZXNzYWdlLmpzXCI7XG5pbXBvcnQgcmVsb2FkQXBwIGZyb20gXCIuL3V0aWxzL3JlbG9hZEFwcC5qc1wiO1xuaW1wb3J0IGNyZWF0ZVNvY2tldFVSTCBmcm9tIFwiLi91dGlscy9jcmVhdGVTb2NrZXRVUkwuanNcIjtcbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gT3B0aW9uc1xuICogQHByb3BlcnR5IHtib29sZWFufSBob3RcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gbGl2ZVJlbG9hZFxuICogQHByb3BlcnR5IHtib29sZWFufSBwcm9ncmVzc1xuICogQHByb3BlcnR5IHtib29sZWFuIHwgeyB3YXJuaW5ncz86IGJvb2xlYW4sIGVycm9ycz86IGJvb2xlYW4gfX0gb3ZlcmxheVxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtsb2dnaW5nXVxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtyZWNvbm5lY3RdXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTdGF0dXNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNVbmxvYWRpbmdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjdXJyZW50SGFzaFxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtwcmV2aW91c0hhc2hdXG4gKi9cblxuLyoqXG4gKiBAdHlwZSB7U3RhdHVzfVxuICovXG5cbnZhciBzdGF0dXMgPSB7XG4gIGlzVW5sb2FkaW5nOiBmYWxzZSxcbiAgLy8gVE9ETyBXb3JrYXJvdW5kIGZvciB3ZWJwYWNrIHY0LCBgX193ZWJwYWNrX2hhc2hfX2AgaXMgbm90IHJlcGxhY2VkIHdpdGhvdXQgSG90TW9kdWxlUmVwbGFjZW1lbnRcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICBjdXJyZW50SGFzaDogdHlwZW9mIF9fd2VicGFja19oYXNoX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfaGFzaF9fIDogXCJcIlxufTtcbi8qKiBAdHlwZSB7T3B0aW9uc30gKi9cblxudmFyIG9wdGlvbnMgPSB7XG4gIGhvdDogZmFsc2UsXG4gIGxpdmVSZWxvYWQ6IGZhbHNlLFxuICBwcm9ncmVzczogZmFsc2UsXG4gIG92ZXJsYXk6IGZhbHNlXG59O1xudmFyIHBhcnNlZFJlc291cmNlUXVlcnkgPSBwYXJzZVVSTChfX3Jlc291cmNlUXVlcnkpO1xuXG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5ob3QgPT09IFwidHJ1ZVwiKSB7XG4gIG9wdGlvbnMuaG90ID0gdHJ1ZTtcbiAgbG9nLmluZm8oXCJIb3QgTW9kdWxlIFJlcGxhY2VtZW50IGVuYWJsZWQuXCIpO1xufVxuXG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeVtcImxpdmUtcmVsb2FkXCJdID09PSBcInRydWVcIikge1xuICBvcHRpb25zLmxpdmVSZWxvYWQgPSB0cnVlO1xuICBsb2cuaW5mbyhcIkxpdmUgUmVsb2FkaW5nIGVuYWJsZWQuXCIpO1xufVxuXG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5sb2dnaW5nKSB7XG4gIG9wdGlvbnMubG9nZ2luZyA9IHBhcnNlZFJlc291cmNlUXVlcnkubG9nZ2luZztcbn1cblxuaWYgKHR5cGVvZiBwYXJzZWRSZXNvdXJjZVF1ZXJ5LnJlY29ubmVjdCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICBvcHRpb25zLnJlY29ubmVjdCA9IE51bWJlcihwYXJzZWRSZXNvdXJjZVF1ZXJ5LnJlY29ubmVjdCk7XG59XG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBsZXZlbFxuICovXG5cblxuZnVuY3Rpb24gc2V0QWxsTG9nTGV2ZWwobGV2ZWwpIHtcbiAgLy8gVGhpcyBpcyBuZWVkZWQgYmVjYXVzZSB0aGUgSE1SIGxvZ2dlciBvcGVyYXRlIHNlcGFyYXRlbHkgZnJvbSBkZXYgc2VydmVyIGxvZ2dlclxuICB3ZWJwYWNrSG90TG9nLnNldExvZ0xldmVsKGxldmVsID09PSBcInZlcmJvc2VcIiB8fCBsZXZlbCA9PT0gXCJsb2dcIiA/IFwiaW5mb1wiIDogbGV2ZWwpO1xuICBzZXRMb2dMZXZlbChsZXZlbCk7XG59XG5cbmlmIChvcHRpb25zLmxvZ2dpbmcpIHtcbiAgc2V0QWxsTG9nTGV2ZWwob3B0aW9ucy5sb2dnaW5nKTtcbn1cblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgc3RhdHVzLmlzVW5sb2FkaW5nID0gdHJ1ZTtcbn0pO1xudmFyIG9uU29ja2V0TWVzc2FnZSA9IHtcbiAgaG90OiBmdW5jdGlvbiBob3QoKSB7XG4gICAgaWYgKHBhcnNlZFJlc291cmNlUXVlcnkuaG90ID09PSBcImZhbHNlXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvcHRpb25zLmhvdCA9IHRydWU7XG4gICAgbG9nLmluZm8oXCJIb3QgTW9kdWxlIFJlcGxhY2VtZW50IGVuYWJsZWQuXCIpO1xuICB9LFxuICBsaXZlUmVsb2FkOiBmdW5jdGlvbiBsaXZlUmVsb2FkKCkge1xuICAgIGlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5W1wibGl2ZS1yZWxvYWRcIl0gPT09IFwiZmFsc2VcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG9wdGlvbnMubGl2ZVJlbG9hZCA9IHRydWU7XG4gICAgbG9nLmluZm8oXCJMaXZlIFJlbG9hZGluZyBlbmFibGVkLlwiKTtcbiAgfSxcbiAgaW52YWxpZDogZnVuY3Rpb24gaW52YWxpZCgpIHtcbiAgICBsb2cuaW5mbyhcIkFwcCB1cGRhdGVkLiBSZWNvbXBpbGluZy4uLlwiKTsgLy8gRml4ZXMgIzEwNDIuIG92ZXJsYXkgZG9lc24ndCBjbGVhciBpZiBlcnJvcnMgYXJlIGZpeGVkIGJ1dCB3YXJuaW5ncyByZW1haW4uXG5cbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBoaWRlKCk7XG4gICAgfVxuXG4gICAgc2VuZE1lc3NhZ2UoXCJJbnZhbGlkXCIpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaGFzaFxuICAgKi9cbiAgaGFzaDogZnVuY3Rpb24gaGFzaChfaGFzaCkge1xuICAgIHN0YXR1cy5wcmV2aW91c0hhc2ggPSBzdGF0dXMuY3VycmVudEhhc2g7XG4gICAgc3RhdHVzLmN1cnJlbnRIYXNoID0gX2hhc2g7XG4gIH0sXG4gIGxvZ2dpbmc6IHNldEFsbExvZ0xldmVsLFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXG4gICAqL1xuICBvdmVybGF5OiBmdW5jdGlvbiBvdmVybGF5KHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG9wdGlvbnMub3ZlcmxheSA9IHZhbHVlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAgICovXG4gIHJlY29ubmVjdDogZnVuY3Rpb24gcmVjb25uZWN0KHZhbHVlKSB7XG4gICAgaWYgKHBhcnNlZFJlc291cmNlUXVlcnkucmVjb25uZWN0ID09PSBcImZhbHNlXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvcHRpb25zLnJlY29ubmVjdCA9IHZhbHVlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXG4gICAqL1xuICBwcm9ncmVzczogZnVuY3Rpb24gcHJvZ3Jlc3ModmFsdWUpIHtcbiAgICBvcHRpb25zLnByb2dyZXNzID0gdmFsdWU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7eyBwbHVnaW5OYW1lPzogc3RyaW5nLCBwZXJjZW50OiBudW1iZXIsIG1zZzogc3RyaW5nIH19IGRhdGFcbiAgICovXG4gIFwicHJvZ3Jlc3MtdXBkYXRlXCI6IGZ1bmN0aW9uIHByb2dyZXNzVXBkYXRlKGRhdGEpIHtcbiAgICBpZiAob3B0aW9ucy5wcm9ncmVzcykge1xuICAgICAgbG9nLmluZm8oXCJcIi5jb25jYXQoZGF0YS5wbHVnaW5OYW1lID8gXCJbXCIuY29uY2F0KGRhdGEucGx1Z2luTmFtZSwgXCJdIFwiKSA6IFwiXCIpLmNvbmNhdChkYXRhLnBlcmNlbnQsIFwiJSAtIFwiKS5jb25jYXQoZGF0YS5tc2csIFwiLlwiKSk7XG4gICAgfVxuXG4gICAgc2VuZE1lc3NhZ2UoXCJQcm9ncmVzc1wiLCBkYXRhKTtcbiAgfSxcbiAgXCJzdGlsbC1va1wiOiBmdW5jdGlvbiBzdGlsbE9rKCkge1xuICAgIGxvZy5pbmZvKFwiTm90aGluZyBjaGFuZ2VkLlwiKTtcblxuICAgIGlmIChvcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgIGhpZGUoKTtcbiAgICB9XG5cbiAgICBzZW5kTWVzc2FnZShcIlN0aWxsT2tcIik7XG4gIH0sXG4gIG9rOiBmdW5jdGlvbiBvaygpIHtcbiAgICBzZW5kTWVzc2FnZShcIk9rXCIpO1xuXG4gICAgaWYgKG9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgaGlkZSgpO1xuICAgIH1cblxuICAgIHJlbG9hZEFwcChvcHRpb25zLCBzdGF0dXMpO1xuICB9LFxuICAvLyBUT0RPOiByZW1vdmUgaW4gdjUgaW4gZmF2b3Igb2YgJ3N0YXRpYy1jaGFuZ2VkJ1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZVxuICAgKi9cbiAgXCJjb250ZW50LWNoYW5nZWRcIjogZnVuY3Rpb24gY29udGVudENoYW5nZWQoZmlsZSkge1xuICAgIGxvZy5pbmZvKFwiXCIuY29uY2F0KGZpbGUgPyBcIlxcXCJcIi5jb25jYXQoZmlsZSwgXCJcXFwiXCIpIDogXCJDb250ZW50XCIsIFwiIGZyb20gc3RhdGljIGRpcmVjdG9yeSB3YXMgY2hhbmdlZC4gUmVsb2FkaW5nLi4uXCIpKTtcbiAgICBzZWxmLmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZVxuICAgKi9cbiAgXCJzdGF0aWMtY2hhbmdlZFwiOiBmdW5jdGlvbiBzdGF0aWNDaGFuZ2VkKGZpbGUpIHtcbiAgICBsb2cuaW5mbyhcIlwiLmNvbmNhdChmaWxlID8gXCJcXFwiXCIuY29uY2F0KGZpbGUsIFwiXFxcIlwiKSA6IFwiQ29udGVudFwiLCBcIiBmcm9tIHN0YXRpYyBkaXJlY3Rvcnkgd2FzIGNoYW5nZWQuIFJlbG9hZGluZy4uLlwiKSk7XG4gICAgc2VsZi5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtFcnJvcltdfSB3YXJuaW5nc1xuICAgKiBAcGFyYW0ge2FueX0gcGFyYW1zXG4gICAqL1xuICB3YXJuaW5nczogZnVuY3Rpb24gd2FybmluZ3MoX3dhcm5pbmdzLCBwYXJhbXMpIHtcbiAgICBsb2cud2FybihcIldhcm5pbmdzIHdoaWxlIGNvbXBpbGluZy5cIik7XG5cbiAgICB2YXIgcHJpbnRhYmxlV2FybmluZ3MgPSBfd2FybmluZ3MubWFwKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgdmFyIF9mb3JtYXRQcm9ibGVtID0gZm9ybWF0UHJvYmxlbShcIndhcm5pbmdcIiwgZXJyb3IpLFxuICAgICAgICAgIGhlYWRlciA9IF9mb3JtYXRQcm9ibGVtLmhlYWRlcixcbiAgICAgICAgICBib2R5ID0gX2Zvcm1hdFByb2JsZW0uYm9keTtcblxuICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KGhlYWRlciwgXCJcXG5cIikuY29uY2F0KHN0cmlwQW5zaShib2R5KSk7XG4gICAgfSk7XG5cbiAgICBzZW5kTWVzc2FnZShcIldhcm5pbmdzXCIsIHByaW50YWJsZVdhcm5pbmdzKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJpbnRhYmxlV2FybmluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxvZy53YXJuKHByaW50YWJsZVdhcm5pbmdzW2ldKTtcbiAgICB9XG5cbiAgICB2YXIgbmVlZFNob3dPdmVybGF5Rm9yV2FybmluZ3MgPSB0eXBlb2Ygb3B0aW9ucy5vdmVybGF5ID09PSBcImJvb2xlYW5cIiA/IG9wdGlvbnMub3ZlcmxheSA6IG9wdGlvbnMub3ZlcmxheSAmJiBvcHRpb25zLm92ZXJsYXkud2FybmluZ3M7XG5cbiAgICBpZiAobmVlZFNob3dPdmVybGF5Rm9yV2FybmluZ3MpIHtcbiAgICAgIHNob3coXCJ3YXJuaW5nXCIsIF93YXJuaW5ncyk7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcyAmJiBwYXJhbXMucHJldmVudFJlbG9hZGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJlbG9hZEFwcChvcHRpb25zLCBzdGF0dXMpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0Vycm9yW119IGVycm9yc1xuICAgKi9cbiAgZXJyb3JzOiBmdW5jdGlvbiBlcnJvcnMoX2Vycm9ycykge1xuICAgIGxvZy5lcnJvcihcIkVycm9ycyB3aGlsZSBjb21waWxpbmcuIFJlbG9hZCBwcmV2ZW50ZWQuXCIpO1xuXG4gICAgdmFyIHByaW50YWJsZUVycm9ycyA9IF9lcnJvcnMubWFwKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgdmFyIF9mb3JtYXRQcm9ibGVtMiA9IGZvcm1hdFByb2JsZW0oXCJlcnJvclwiLCBlcnJvciksXG4gICAgICAgICAgaGVhZGVyID0gX2Zvcm1hdFByb2JsZW0yLmhlYWRlcixcbiAgICAgICAgICBib2R5ID0gX2Zvcm1hdFByb2JsZW0yLmJvZHk7XG5cbiAgICAgIHJldHVybiBcIlwiLmNvbmNhdChoZWFkZXIsIFwiXFxuXCIpLmNvbmNhdChzdHJpcEFuc2koYm9keSkpO1xuICAgIH0pO1xuXG4gICAgc2VuZE1lc3NhZ2UoXCJFcnJvcnNcIiwgcHJpbnRhYmxlRXJyb3JzKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJpbnRhYmxlRXJyb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsb2cuZXJyb3IocHJpbnRhYmxlRXJyb3JzW2ldKTtcbiAgICB9XG5cbiAgICB2YXIgbmVlZFNob3dPdmVybGF5Rm9yRXJyb3JzID0gdHlwZW9mIG9wdGlvbnMub3ZlcmxheSA9PT0gXCJib29sZWFuXCIgPyBvcHRpb25zLm92ZXJsYXkgOiBvcHRpb25zLm92ZXJsYXkgJiYgb3B0aW9ucy5vdmVybGF5LmVycm9ycztcblxuICAgIGlmIChuZWVkU2hvd092ZXJsYXlGb3JFcnJvcnMpIHtcbiAgICAgIHNob3coXCJlcnJvclwiLCBfZXJyb3JzKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXJyb3J9IGVycm9yXG4gICAqL1xuICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoX2Vycm9yKSB7XG4gICAgbG9nLmVycm9yKF9lcnJvcik7XG4gIH0sXG4gIGNsb3NlOiBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICBsb2cuaW5mbyhcIkRpc2Nvbm5lY3RlZCFcIik7XG5cbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBoaWRlKCk7XG4gICAgfVxuXG4gICAgc2VuZE1lc3NhZ2UoXCJDbG9zZVwiKTtcbiAgfVxufTtcbnZhciBzb2NrZXRVUkwgPSBjcmVhdGVTb2NrZXRVUkwocGFyc2VkUmVzb3VyY2VRdWVyeSk7XG5zb2NrZXQoc29ja2V0VVJMLCBvblNvY2tldE1lc3NhZ2UsIG9wdGlvbnMucmVjb25uZWN0KTsiLCJpbXBvcnQgTWFzayBmcm9tIFwiLi9jb21wb25lbnRzL21hc2tcIlxyXG5cclxuY2xhc3MgQXBwIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBuZXcgTWFzaygpXHJcbiAgICB9XHJcbn1cclxuXHJcbm5ldyBBcHAoKSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJSZW5kZXJlciIsIkNhbWVyYSIsIlRyYW5zZm9ybSIsIlBsYW5lIiwiVmVjMiIsIlZlYzMiLCJUZXh0dXJlIiwiVGV4dHVyZUxvYWRlciIsIlByb2dyYW0iLCJNZXNoIiwiUmF5Y2FzdCIsImxlcnAiLCJ2ZXJ0ZXhTaGFkZXIiLCJmcmFnbWVudFNoYWRlciIsInZlcnRleCIsImZyYWdtZW50IiwiTWFzayIsImNvbnN0cnVjdG9yIiwiYmluZCIsImVsIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYm91bmRzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicGxhbmVCQ1IiLCJ3aWR0aCIsImhlaWdodCIsIngiLCJ5IiwiaXNMb2FkZWQiLCJtYXNrUG9zaXRpb24iLCJtb3VzZSIsIm5vdyIsInNldHRpbmdzIiwic3BlZWQiLCJ3cmFwcGVyIiwibWVkaWEiLCJyQUYiLCJ1bmRlZmluZWQiLCJpbml0IiwiZm9yRWFjaCIsImZuIiwiaW5pdFJlbmRlcmVyIiwiY2FudmFzIiwicmVuZGVyZXIiLCJkcHIiLCJhbnRpYWxpYXMiLCJwcmVtdWx0aXBseUFscGhhIiwiYWxwaGEiLCJzZXRTaXplIiwiZ2wiLCJjbGVhckNvbG9yIiwiaW5pdFNjZW5lIiwic2NlbmUiLCJpbml0Q2FtZXJhIiwiZm92IiwiY2FtZXJhIiwicGVyc3BlY3RpdmUiLCJhc3BlY3QiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJwb3NpdGlvbiIsInNldCIsImluaXRTaGFwZSIsImdlb21ldHJ5Iiwid2lkdGhTZWdtZW50cyIsImhlaWdodFNlZ21lbnRzIiwidGV4dHVyZSIsIm1pbkZpbHRlciIsIkxJTkVBUiIsImdlbmVyYXRlTWlwbWFwcyIsImltZyIsIkltYWdlIiwic3JjIiwib25sb2FkIiwiaW1hZ2UiLCJIVE1MVmlkZW9FbGVtZW50IiwibG9hZCIsInBsYXkiLCJwcm9ncmFtIiwidW5pZm9ybXMiLCJ1TWFza1Bvc2l0aW9uIiwidmFsdWUiLCJ1SGl0IiwidVRleHR1cmUiLCJtZXNoIiwidXBkYXRlU2l6ZSIsInNldFBhcmVudCIsInVwZGF0ZUhpdFVuaWZvcm0iLCJpc0hpdCIsIm9uQmVmb3JlUmVuZGVyIiwicmF5Y2FzdCIsImNhbGN1bGF0ZVVuaXRTaXplIiwieiIsImZvdkluUmFkaWFuIiwiTWF0aCIsIlBJIiwiaSIsInRhbiIsImdhcCIsImNhbVVuaXQiLCJzdHlsZSIsIm1vdXNlbW92ZSIsImUiLCJjYXN0TW91c2UiLCJoaXRzIiwiaW50ZXJzZWN0TWVzaGVzIiwiaW5jbHVkZVVWIiwibGVuZ3RoIiwiaGl0IiwidXYiLCJ1cGRhdGUiLCJ0IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicmVhZHlTdGF0ZSIsIkhBVkVfRU5PVUdIX0RBVEEiLCJuZWVkc1VwZGF0ZSIsIkhUTUxJbWFnZUVsZW1lbnQiLCJyZW5kZXIiLCJyZXNpemUiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImFkZEV2ZW50bGlzdGVuZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50bGlzdGVuZXJzIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRlc3Ryb3kiLCJyZW1vdmVFdmVudExpc3RlbmVycyIsInN0YXJ0IiwiZW5kIiwiYW10IiwiTnVtYmVyIiwicHJvdG90eXBlIiwibWFwIiwiaW5fbWluIiwiaW5fbWF4Iiwib3V0X21pbiIsIm91dF9tYXgiLCJlYXNlSW5PdXQiLCJpbnRlcnBvbGF0ZSIsImNsYW1wIiwibWluIiwibWF4IiwibnVtYmVyIiwicmFuZG9tIiwiQXBwIl0sInNvdXJjZVJvb3QiOiIifQ==