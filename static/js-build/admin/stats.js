(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/chart.js/dist/chart.js
  var require_chart = __commonJS({
    "node_modules/chart.js/dist/chart.js"(exports, module) {
      (function(global2, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.Chart = factory());
      })(exports, function() {
        "use strict";
        function noop2() {
        }
        const uid2 = function() {
          let id = 0;
          return function() {
            return id++;
          };
        }();
        function isNullOrUndef(value) {
          return value === null || typeof value === "undefined";
        }
        function isArray2(value) {
          if (Array.isArray && Array.isArray(value)) {
            return true;
          }
          const type = Object.prototype.toString.call(value);
          if (type.slice(0, 7) === "[object" && type.slice(-6) === "Array]") {
            return true;
          }
          return false;
        }
        function isObject2(value) {
          return value !== null && Object.prototype.toString.call(value) === "[object Object]";
        }
        const isNumberFinite = (value) => (typeof value === "number" || value instanceof Number) && isFinite(+value);
        function finiteOrDefault(value, defaultValue) {
          return isNumberFinite(value) ? value : defaultValue;
        }
        function valueOrDefault(value, defaultValue) {
          return typeof value === "undefined" ? defaultValue : value;
        }
        const toPercentage = (value, dimension) => typeof value === "string" && value.endsWith("%") ? parseFloat(value) / 100 : value / dimension;
        const toDimension = (value, dimension) => typeof value === "string" && value.endsWith("%") ? parseFloat(value) / 100 * dimension : +value;
        function callback(fn, args, thisArg) {
          if (fn && typeof fn.call === "function") {
            return fn.apply(thisArg, args);
          }
        }
        function each(loopable, fn, thisArg, reverse) {
          let i, len2, keys;
          if (isArray2(loopable)) {
            len2 = loopable.length;
            if (reverse) {
              for (i = len2 - 1; i >= 0; i--) {
                fn.call(thisArg, loopable[i], i);
              }
            } else {
              for (i = 0; i < len2; i++) {
                fn.call(thisArg, loopable[i], i);
              }
            }
          } else if (isObject2(loopable)) {
            keys = Object.keys(loopable);
            len2 = keys.length;
            for (i = 0; i < len2; i++) {
              fn.call(thisArg, loopable[keys[i]], keys[i]);
            }
          }
        }
        function _elementsEqual(a0, a1) {
          let i, ilen, v0, v1;
          if (!a0 || !a1 || a0.length !== a1.length) {
            return false;
          }
          for (i = 0, ilen = a0.length; i < ilen; ++i) {
            v0 = a0[i];
            v1 = a1[i];
            if (v0.datasetIndex !== v1.datasetIndex || v0.index !== v1.index) {
              return false;
            }
          }
          return true;
        }
        function clone$1(source) {
          if (isArray2(source)) {
            return source.map(clone$1);
          }
          if (isObject2(source)) {
            const target2 = /* @__PURE__ */ Object.create(null);
            const keys = Object.keys(source);
            const klen = keys.length;
            let k = 0;
            for (; k < klen; ++k) {
              target2[keys[k]] = clone$1(source[keys[k]]);
            }
            return target2;
          }
          return source;
        }
        function isValidKey(key) {
          return ["__proto__", "prototype", "constructor"].indexOf(key) === -1;
        }
        function _merger(key, target2, source, options) {
          if (!isValidKey(key)) {
            return;
          }
          const tval = target2[key];
          const sval = source[key];
          if (isObject2(tval) && isObject2(sval)) {
            merge(tval, sval, options);
          } else {
            target2[key] = clone$1(sval);
          }
        }
        function merge(target2, source, options) {
          const sources = isArray2(source) ? source : [source];
          const ilen = sources.length;
          if (!isObject2(target2)) {
            return target2;
          }
          options = options || {};
          const merger = options.merger || _merger;
          for (let i = 0; i < ilen; ++i) {
            source = sources[i];
            if (!isObject2(source)) {
              continue;
            }
            const keys = Object.keys(source);
            for (let k = 0, klen = keys.length; k < klen; ++k) {
              merger(keys[k], target2, source, options);
            }
          }
          return target2;
        }
        function mergeIf(target2, source) {
          return merge(target2, source, { merger: _mergerIf });
        }
        function _mergerIf(key, target2, source) {
          if (!isValidKey(key)) {
            return;
          }
          const tval = target2[key];
          const sval = source[key];
          if (isObject2(tval) && isObject2(sval)) {
            mergeIf(tval, sval);
          } else if (!Object.prototype.hasOwnProperty.call(target2, key)) {
            target2[key] = clone$1(sval);
          }
        }
        function _deprecated(scope, value, previous, current) {
          if (value !== void 0) {
            console.warn(scope + ': "' + previous + '" is deprecated. Please use "' + current + '" instead');
          }
        }
        const keyResolvers = {
          "": (v) => v,
          x: (o) => o.x,
          y: (o) => o.y
        };
        function resolveObjectKey(obj, key) {
          const resolver = keyResolvers[key] || (keyResolvers[key] = _getKeyResolver(key));
          return resolver(obj);
        }
        function _getKeyResolver(key) {
          const keys = _splitKey(key);
          return (obj) => {
            for (const k of keys) {
              if (k === "") {
                break;
              }
              obj = obj && obj[k];
            }
            return obj;
          };
        }
        function _splitKey(key) {
          const parts = key.split(".");
          const keys = [];
          let tmp = "";
          for (const part of parts) {
            tmp += part;
            if (tmp.endsWith("\\")) {
              tmp = tmp.slice(0, -1) + ".";
            } else {
              keys.push(tmp);
              tmp = "";
            }
          }
          return keys;
        }
        function _capitalize(str2) {
          return str2.charAt(0).toUpperCase() + str2.slice(1);
        }
        const defined = (value) => typeof value !== "undefined";
        const isFunction2 = (value) => typeof value === "function";
        const setsEqual = (a, b) => {
          if (a.size !== b.size) {
            return false;
          }
          for (const item of a) {
            if (!b.has(item)) {
              return false;
            }
          }
          return true;
        };
        function _isClickEvent(e) {
          return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
        }
        const PI = Math.PI;
        const TAU = 2 * PI;
        const PITAU = TAU + PI;
        const INFINITY = Number.POSITIVE_INFINITY;
        const RAD_PER_DEG = PI / 180;
        const HALF_PI = PI / 2;
        const QUARTER_PI = PI / 4;
        const TWO_THIRDS_PI = PI * 2 / 3;
        const log10 = Math.log10;
        const sign = Math.sign;
        function niceNum(range2) {
          const roundedRange = Math.round(range2);
          range2 = almostEquals(range2, roundedRange, range2 / 1e3) ? roundedRange : range2;
          const niceRange = Math.pow(10, Math.floor(log10(range2)));
          const fraction = range2 / niceRange;
          const niceFraction = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
          return niceFraction * niceRange;
        }
        function _factorize(value) {
          const result = [];
          const sqrt = Math.sqrt(value);
          let i;
          for (i = 1; i < sqrt; i++) {
            if (value % i === 0) {
              result.push(i);
              result.push(value / i);
            }
          }
          if (sqrt === (sqrt | 0)) {
            result.push(sqrt);
          }
          result.sort((a, b) => a - b).pop();
          return result;
        }
        function isNumber(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }
        function almostEquals(x, y, epsilon) {
          return Math.abs(x - y) < epsilon;
        }
        function almostWhole(x, epsilon) {
          const rounded = Math.round(x);
          return rounded - epsilon <= x && rounded + epsilon >= x;
        }
        function _setMinAndMaxByKey(array, target2, property) {
          let i, ilen, value;
          for (i = 0, ilen = array.length; i < ilen; i++) {
            value = array[i][property];
            if (!isNaN(value)) {
              target2.min = Math.min(target2.min, value);
              target2.max = Math.max(target2.max, value);
            }
          }
        }
        function toRadians(degrees) {
          return degrees * (PI / 180);
        }
        function toDegrees(radians) {
          return radians * (180 / PI);
        }
        function _decimalPlaces(x) {
          if (!isNumberFinite(x)) {
            return;
          }
          let e = 1;
          let p = 0;
          while (Math.round(x * e) / e !== x) {
            e *= 10;
            p++;
          }
          return p;
        }
        function getAngleFromPoint(centrePoint, anglePoint) {
          const distanceFromXCenter = anglePoint.x - centrePoint.x;
          const distanceFromYCenter = anglePoint.y - centrePoint.y;
          const radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
          let angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);
          if (angle < -0.5 * PI) {
            angle += TAU;
          }
          return {
            angle,
            distance: radialDistanceFromCenter
          };
        }
        function distanceBetweenPoints(pt1, pt2) {
          return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
        }
        function _angleDiff(a, b) {
          return (a - b + PITAU) % TAU - PI;
        }
        function _normalizeAngle(a) {
          return (a % TAU + TAU) % TAU;
        }
        function _angleBetween(angle, start, end, sameAngleIsFullCircle) {
          const a = _normalizeAngle(angle);
          const s = _normalizeAngle(start);
          const e = _normalizeAngle(end);
          const angleToStart = _normalizeAngle(s - a);
          const angleToEnd = _normalizeAngle(e - a);
          const startToAngle = _normalizeAngle(a - s);
          const endToAngle = _normalizeAngle(a - e);
          return a === s || a === e || sameAngleIsFullCircle && s === e || angleToStart > angleToEnd && startToAngle < endToAngle;
        }
        function _limitValue(value, min, max) {
          return Math.max(min, Math.min(max, value));
        }
        function _int16Range(value) {
          return _limitValue(value, -32768, 32767);
        }
        function _isBetween(value, start, end, epsilon = 1e-6) {
          return value >= Math.min(start, end) - epsilon && value <= Math.max(start, end) + epsilon;
        }
        function _lookup(table, value, cmp) {
          cmp = cmp || ((index3) => table[index3] < value);
          let hi = table.length - 1;
          let lo = 0;
          let mid;
          while (hi - lo > 1) {
            mid = lo + hi >> 1;
            if (cmp(mid)) {
              lo = mid;
            } else {
              hi = mid;
            }
          }
          return { lo, hi };
        }
        const _lookupByKey = (table, key, value, last) => _lookup(table, value, last ? (index3) => table[index3][key] <= value : (index3) => table[index3][key] < value);
        const _rlookupByKey = (table, key, value) => _lookup(table, value, (index3) => table[index3][key] >= value);
        function _filterBetween(values, min, max) {
          let start = 0;
          let end = values.length;
          while (start < end && values[start] < min) {
            start++;
          }
          while (end > start && values[end - 1] > max) {
            end--;
          }
          return start > 0 || end < values.length ? values.slice(start, end) : values;
        }
        const arrayEvents = ["push", "pop", "shift", "splice", "unshift"];
        function listenArrayEvents(array, listener) {
          if (array._chartjs) {
            array._chartjs.listeners.push(listener);
            return;
          }
          Object.defineProperty(array, "_chartjs", {
            configurable: true,
            enumerable: false,
            value: {
              listeners: [listener]
            }
          });
          arrayEvents.forEach((key) => {
            const method = "_onData" + _capitalize(key);
            const base = array[key];
            Object.defineProperty(array, key, {
              configurable: true,
              enumerable: false,
              value(...args) {
                const res = base.apply(this, args);
                array._chartjs.listeners.forEach((object) => {
                  if (typeof object[method] === "function") {
                    object[method](...args);
                  }
                });
                return res;
              }
            });
          });
        }
        function unlistenArrayEvents(array, listener) {
          const stub = array._chartjs;
          if (!stub) {
            return;
          }
          const listeners = stub.listeners;
          const index3 = listeners.indexOf(listener);
          if (index3 !== -1) {
            listeners.splice(index3, 1);
          }
          if (listeners.length > 0) {
            return;
          }
          arrayEvents.forEach((key) => {
            delete array[key];
          });
          delete array._chartjs;
        }
        function _arrayUnique(items) {
          const set3 = /* @__PURE__ */ new Set();
          let i, ilen;
          for (i = 0, ilen = items.length; i < ilen; ++i) {
            set3.add(items[i]);
          }
          if (set3.size === ilen) {
            return items;
          }
          return Array.from(set3);
        }
        function fontString(pixelSize, fontStyle, fontFamily) {
          return fontStyle + " " + pixelSize + "px " + fontFamily;
        }
        const requestAnimFrame = function() {
          if (typeof window === "undefined") {
            return function(callback2) {
              return callback2();
            };
          }
          return window.requestAnimationFrame;
        }();
        function throttled(fn, thisArg, updateFn) {
          const updateArgs = updateFn || ((args2) => Array.prototype.slice.call(args2));
          let ticking = false;
          let args = [];
          return function(...rest) {
            args = updateArgs(rest);
            if (!ticking) {
              ticking = true;
              requestAnimFrame.call(window, () => {
                ticking = false;
                fn.apply(thisArg, args);
              });
            }
          };
        }
        function debounce(fn, delay) {
          let timeout;
          return function(...args) {
            if (delay) {
              clearTimeout(timeout);
              timeout = setTimeout(fn, delay, args);
            } else {
              fn.apply(this, args);
            }
            return delay;
          };
        }
        const _toLeftRightCenter = (align) => align === "start" ? "left" : align === "end" ? "right" : "center";
        const _alignStartEnd = (align, start, end) => align === "start" ? start : align === "end" ? end : (start + end) / 2;
        const _textX = (align, left, right, rtl) => {
          const check = rtl ? "left" : "right";
          return align === check ? right : align === "center" ? (left + right) / 2 : left;
        };
        function _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled) {
          const pointCount = points.length;
          let start = 0;
          let count = pointCount;
          if (meta._sorted) {
            const { iScale, _parsed } = meta;
            const axis = iScale.axis;
            const { min, max, minDefined, maxDefined } = iScale.getUserBounds();
            if (minDefined) {
              start = _limitValue(
                Math.min(
                  _lookupByKey(_parsed, iScale.axis, min).lo,
                  animationsDisabled ? pointCount : _lookupByKey(points, axis, iScale.getPixelForValue(min)).lo
                ),
                0,
                pointCount - 1
              );
            }
            if (maxDefined) {
              count = _limitValue(
                Math.max(
                  _lookupByKey(_parsed, iScale.axis, max, true).hi + 1,
                  animationsDisabled ? 0 : _lookupByKey(points, axis, iScale.getPixelForValue(max), true).hi + 1
                ),
                start,
                pointCount
              ) - start;
            } else {
              count = pointCount - start;
            }
          }
          return { start, count };
        }
        function _scaleRangesChanged(meta) {
          const { xScale, yScale, _scaleRanges } = meta;
          const newRanges = {
            xmin: xScale.min,
            xmax: xScale.max,
            ymin: yScale.min,
            ymax: yScale.max
          };
          if (!_scaleRanges) {
            meta._scaleRanges = newRanges;
            return true;
          }
          const changed = _scaleRanges.xmin !== xScale.min || _scaleRanges.xmax !== xScale.max || _scaleRanges.ymin !== yScale.min || _scaleRanges.ymax !== yScale.max;
          Object.assign(_scaleRanges, newRanges);
          return changed;
        }
        class Animator {
          constructor() {
            this._request = null;
            this._charts = /* @__PURE__ */ new Map();
            this._running = false;
            this._lastDate = void 0;
          }
          _notify(chart, anims, date, type) {
            const callbacks2 = anims.listeners[type];
            const numSteps = anims.duration;
            callbacks2.forEach((fn) => fn({
              chart,
              initial: anims.initial,
              numSteps,
              currentStep: Math.min(date - anims.start, numSteps)
            }));
          }
          _refresh() {
            if (this._request) {
              return;
            }
            this._running = true;
            this._request = requestAnimFrame.call(window, () => {
              this._update();
              this._request = null;
              if (this._running) {
                this._refresh();
              }
            });
          }
          _update(date = Date.now()) {
            let remaining = 0;
            this._charts.forEach((anims, chart) => {
              if (!anims.running || !anims.items.length) {
                return;
              }
              const items = anims.items;
              let i = items.length - 1;
              let draw2 = false;
              let item;
              for (; i >= 0; --i) {
                item = items[i];
                if (item._active) {
                  if (item._total > anims.duration) {
                    anims.duration = item._total;
                  }
                  item.tick(date);
                  draw2 = true;
                } else {
                  items[i] = items[items.length - 1];
                  items.pop();
                }
              }
              if (draw2) {
                chart.draw();
                this._notify(chart, anims, date, "progress");
              }
              if (!items.length) {
                anims.running = false;
                this._notify(chart, anims, date, "complete");
                anims.initial = false;
              }
              remaining += items.length;
            });
            this._lastDate = date;
            if (remaining === 0) {
              this._running = false;
            }
          }
          _getAnims(chart) {
            const charts = this._charts;
            let anims = charts.get(chart);
            if (!anims) {
              anims = {
                running: false,
                initial: true,
                items: [],
                listeners: {
                  complete: [],
                  progress: []
                }
              };
              charts.set(chart, anims);
            }
            return anims;
          }
          listen(chart, event, cb) {
            this._getAnims(chart).listeners[event].push(cb);
          }
          add(chart, items) {
            if (!items || !items.length) {
              return;
            }
            this._getAnims(chart).items.push(...items);
          }
          has(chart) {
            return this._getAnims(chart).items.length > 0;
          }
          start(chart) {
            const anims = this._charts.get(chart);
            if (!anims) {
              return;
            }
            anims.running = true;
            anims.start = Date.now();
            anims.duration = anims.items.reduce((acc, cur) => Math.max(acc, cur._duration), 0);
            this._refresh();
          }
          running(chart) {
            if (!this._running) {
              return false;
            }
            const anims = this._charts.get(chart);
            if (!anims || !anims.running || !anims.items.length) {
              return false;
            }
            return true;
          }
          stop(chart) {
            const anims = this._charts.get(chart);
            if (!anims || !anims.items.length) {
              return;
            }
            const items = anims.items;
            let i = items.length - 1;
            for (; i >= 0; --i) {
              items[i].cancel();
            }
            anims.items = [];
            this._notify(chart, anims, Date.now(), "complete");
          }
          remove(chart) {
            return this._charts.delete(chart);
          }
        }
        var animator = new Animator();
        function round(v) {
          return v + 0.5 | 0;
        }
        const lim = (v, l, h) => Math.max(Math.min(v, h), l);
        function p2b(v) {
          return lim(round(v * 2.55), 0, 255);
        }
        function n2b(v) {
          return lim(round(v * 255), 0, 255);
        }
        function b2n(v) {
          return lim(round(v / 2.55) / 100, 0, 1);
        }
        function n2p(v) {
          return lim(round(v * 100), 0, 100);
        }
        const map$1 = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 };
        const hex = [..."0123456789ABCDEF"];
        const h1 = (b) => hex[b & 15];
        const h2 = (b) => hex[(b & 240) >> 4] + hex[b & 15];
        const eq = (b) => (b & 240) >> 4 === (b & 15);
        const isShort = (v) => eq(v.r) && eq(v.g) && eq(v.b) && eq(v.a);
        function hexParse(str2) {
          var len2 = str2.length;
          var ret;
          if (str2[0] === "#") {
            if (len2 === 4 || len2 === 5) {
              ret = {
                r: 255 & map$1[str2[1]] * 17,
                g: 255 & map$1[str2[2]] * 17,
                b: 255 & map$1[str2[3]] * 17,
                a: len2 === 5 ? map$1[str2[4]] * 17 : 255
              };
            } else if (len2 === 7 || len2 === 9) {
              ret = {
                r: map$1[str2[1]] << 4 | map$1[str2[2]],
                g: map$1[str2[3]] << 4 | map$1[str2[4]],
                b: map$1[str2[5]] << 4 | map$1[str2[6]],
                a: len2 === 9 ? map$1[str2[7]] << 4 | map$1[str2[8]] : 255
              };
            }
          }
          return ret;
        }
        const alpha = (a, f) => a < 255 ? f(a) : "";
        function hexString(v) {
          var f = isShort(v) ? h1 : h2;
          return v ? "#" + f(v.r) + f(v.g) + f(v.b) + alpha(v.a, f) : void 0;
        }
        const HUE_RE = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
        function hsl2rgbn(h, s, l) {
          const a = s * Math.min(l, 1 - l);
          const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
          return [f(0), f(8), f(4)];
        }
        function hsv2rgbn(h, s, v) {
          const f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
          return [f(5), f(3), f(1)];
        }
        function hwb2rgbn(h, w, b) {
          const rgb = hsl2rgbn(h, 1, 0.5);
          let i;
          if (w + b > 1) {
            i = 1 / (w + b);
            w *= i;
            b *= i;
          }
          for (i = 0; i < 3; i++) {
            rgb[i] *= 1 - w - b;
            rgb[i] += w;
          }
          return rgb;
        }
        function hueValue(r, g, b, d, max) {
          if (r === max) {
            return (g - b) / d + (g < b ? 6 : 0);
          }
          if (g === max) {
            return (b - r) / d + 2;
          }
          return (r - g) / d + 4;
        }
        function rgb2hsl(v) {
          const range2 = 255;
          const r = v.r / range2;
          const g = v.g / range2;
          const b = v.b / range2;
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const l = (max + min) / 2;
          let h, s, d;
          if (max !== min) {
            d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            h = hueValue(r, g, b, d, max);
            h = h * 60 + 0.5;
          }
          return [h | 0, s || 0, l];
        }
        function calln(f, a, b, c) {
          return (Array.isArray(a) ? f(a[0], a[1], a[2]) : f(a, b, c)).map(n2b);
        }
        function hsl2rgb(h, s, l) {
          return calln(hsl2rgbn, h, s, l);
        }
        function hwb2rgb(h, w, b) {
          return calln(hwb2rgbn, h, w, b);
        }
        function hsv2rgb(h, s, v) {
          return calln(hsv2rgbn, h, s, v);
        }
        function hue(h) {
          return (h % 360 + 360) % 360;
        }
        function hueParse(str2) {
          const m = HUE_RE.exec(str2);
          let a = 255;
          let v;
          if (!m) {
            return;
          }
          if (m[5] !== v) {
            a = m[6] ? p2b(+m[5]) : n2b(+m[5]);
          }
          const h = hue(+m[2]);
          const p1 = +m[3] / 100;
          const p2 = +m[4] / 100;
          if (m[1] === "hwb") {
            v = hwb2rgb(h, p1, p2);
          } else if (m[1] === "hsv") {
            v = hsv2rgb(h, p1, p2);
          } else {
            v = hsl2rgb(h, p1, p2);
          }
          return {
            r: v[0],
            g: v[1],
            b: v[2],
            a
          };
        }
        function rotate(v, deg) {
          var h = rgb2hsl(v);
          h[0] = hue(h[0] + deg);
          h = hsl2rgb(h);
          v.r = h[0];
          v.g = h[1];
          v.b = h[2];
        }
        function hslString(v) {
          if (!v) {
            return;
          }
          const a = rgb2hsl(v);
          const h = a[0];
          const s = n2p(a[1]);
          const l = n2p(a[2]);
          return v.a < 255 ? `hsla(${h}, ${s}%, ${l}%, ${b2n(v.a)})` : `hsl(${h}, ${s}%, ${l}%)`;
        }
        const map$2 = {
          x: "dark",
          Z: "light",
          Y: "re",
          X: "blu",
          W: "gr",
          V: "medium",
          U: "slate",
          A: "ee",
          T: "ol",
          S: "or",
          B: "ra",
          C: "lateg",
          D: "ights",
          R: "in",
          Q: "turquois",
          E: "hi",
          P: "ro",
          O: "al",
          N: "le",
          M: "de",
          L: "yello",
          F: "en",
          K: "ch",
          G: "arks",
          H: "ea",
          I: "ightg",
          J: "wh"
        };
        const names$1 = {
          OiceXe: "f0f8ff",
          antiquewEte: "faebd7",
          aqua: "ffff",
          aquamarRe: "7fffd4",
          azuY: "f0ffff",
          beige: "f5f5dc",
          bisque: "ffe4c4",
          black: "0",
          blanKedOmond: "ffebcd",
          Xe: "ff",
          XeviTet: "8a2be2",
          bPwn: "a52a2a",
          burlywood: "deb887",
          caMtXe: "5f9ea0",
          KartYuse: "7fff00",
          KocTate: "d2691e",
          cSO: "ff7f50",
          cSnflowerXe: "6495ed",
          cSnsilk: "fff8dc",
          crimson: "dc143c",
          cyan: "ffff",
          xXe: "8b",
          xcyan: "8b8b",
          xgTMnPd: "b8860b",
          xWay: "a9a9a9",
          xgYF: "6400",
          xgYy: "a9a9a9",
          xkhaki: "bdb76b",
          xmagFta: "8b008b",
          xTivegYF: "556b2f",
          xSange: "ff8c00",
          xScEd: "9932cc",
          xYd: "8b0000",
          xsOmon: "e9967a",
          xsHgYF: "8fbc8f",
          xUXe: "483d8b",
          xUWay: "2f4f4f",
          xUgYy: "2f4f4f",
          xQe: "ced1",
          xviTet: "9400d3",
          dAppRk: "ff1493",
          dApskyXe: "bfff",
          dimWay: "696969",
          dimgYy: "696969",
          dodgerXe: "1e90ff",
          fiYbrick: "b22222",
          flSOwEte: "fffaf0",
          foYstWAn: "228b22",
          fuKsia: "ff00ff",
          gaRsbSo: "dcdcdc",
          ghostwEte: "f8f8ff",
          gTd: "ffd700",
          gTMnPd: "daa520",
          Way: "808080",
          gYF: "8000",
          gYFLw: "adff2f",
          gYy: "808080",
          honeyMw: "f0fff0",
          hotpRk: "ff69b4",
          RdianYd: "cd5c5c",
          Rdigo: "4b0082",
          ivSy: "fffff0",
          khaki: "f0e68c",
          lavFMr: "e6e6fa",
          lavFMrXsh: "fff0f5",
          lawngYF: "7cfc00",
          NmoncEffon: "fffacd",
          ZXe: "add8e6",
          ZcSO: "f08080",
          Zcyan: "e0ffff",
          ZgTMnPdLw: "fafad2",
          ZWay: "d3d3d3",
          ZgYF: "90ee90",
          ZgYy: "d3d3d3",
          ZpRk: "ffb6c1",
          ZsOmon: "ffa07a",
          ZsHgYF: "20b2aa",
          ZskyXe: "87cefa",
          ZUWay: "778899",
          ZUgYy: "778899",
          ZstAlXe: "b0c4de",
          ZLw: "ffffe0",
          lime: "ff00",
          limegYF: "32cd32",
          lRF: "faf0e6",
          magFta: "ff00ff",
          maPon: "800000",
          VaquamarRe: "66cdaa",
          VXe: "cd",
          VScEd: "ba55d3",
          VpurpN: "9370db",
          VsHgYF: "3cb371",
          VUXe: "7b68ee",
          VsprRggYF: "fa9a",
          VQe: "48d1cc",
          VviTetYd: "c71585",
          midnightXe: "191970",
          mRtcYam: "f5fffa",
          mistyPse: "ffe4e1",
          moccasR: "ffe4b5",
          navajowEte: "ffdead",
          navy: "80",
          Tdlace: "fdf5e6",
          Tive: "808000",
          TivedBb: "6b8e23",
          Sange: "ffa500",
          SangeYd: "ff4500",
          ScEd: "da70d6",
          pOegTMnPd: "eee8aa",
          pOegYF: "98fb98",
          pOeQe: "afeeee",
          pOeviTetYd: "db7093",
          papayawEp: "ffefd5",
          pHKpuff: "ffdab9",
          peru: "cd853f",
          pRk: "ffc0cb",
          plum: "dda0dd",
          powMrXe: "b0e0e6",
          purpN: "800080",
          YbeccapurpN: "663399",
          Yd: "ff0000",
          Psybrown: "bc8f8f",
          PyOXe: "4169e1",
          saddNbPwn: "8b4513",
          sOmon: "fa8072",
          sandybPwn: "f4a460",
          sHgYF: "2e8b57",
          sHshell: "fff5ee",
          siFna: "a0522d",
          silver: "c0c0c0",
          skyXe: "87ceeb",
          UXe: "6a5acd",
          UWay: "708090",
          UgYy: "708090",
          snow: "fffafa",
          sprRggYF: "ff7f",
          stAlXe: "4682b4",
          tan: "d2b48c",
          teO: "8080",
          tEstN: "d8bfd8",
          tomato: "ff6347",
          Qe: "40e0d0",
          viTet: "ee82ee",
          JHt: "f5deb3",
          wEte: "ffffff",
          wEtesmoke: "f5f5f5",
          Lw: "ffff00",
          LwgYF: "9acd32"
        };
        function unpack() {
          const unpacked = {};
          const keys = Object.keys(names$1);
          const tkeys = Object.keys(map$2);
          let i, j, k, ok, nk;
          for (i = 0; i < keys.length; i++) {
            ok = nk = keys[i];
            for (j = 0; j < tkeys.length; j++) {
              k = tkeys[j];
              nk = nk.replace(k, map$2[k]);
            }
            k = parseInt(names$1[ok], 16);
            unpacked[nk] = [k >> 16 & 255, k >> 8 & 255, k & 255];
          }
          return unpacked;
        }
        let names;
        function nameParse(str2) {
          if (!names) {
            names = unpack();
            names.transparent = [0, 0, 0, 0];
          }
          const a = names[str2.toLowerCase()];
          return a && {
            r: a[0],
            g: a[1],
            b: a[2],
            a: a.length === 4 ? a[3] : 255
          };
        }
        const RGB_RE = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
        function rgbParse(str2) {
          const m = RGB_RE.exec(str2);
          let a = 255;
          let r, g, b;
          if (!m) {
            return;
          }
          if (m[7] !== r) {
            const v = +m[7];
            a = m[8] ? p2b(v) : lim(v * 255, 0, 255);
          }
          r = +m[1];
          g = +m[3];
          b = +m[5];
          r = 255 & (m[2] ? p2b(r) : lim(r, 0, 255));
          g = 255 & (m[4] ? p2b(g) : lim(g, 0, 255));
          b = 255 & (m[6] ? p2b(b) : lim(b, 0, 255));
          return {
            r,
            g,
            b,
            a
          };
        }
        function rgbString(v) {
          return v && (v.a < 255 ? `rgba(${v.r}, ${v.g}, ${v.b}, ${b2n(v.a)})` : `rgb(${v.r}, ${v.g}, ${v.b})`);
        }
        const to = (v) => v <= 31308e-7 ? v * 12.92 : Math.pow(v, 1 / 2.4) * 1.055 - 0.055;
        const from = (v) => v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        function interpolate$1(rgb1, rgb2, t) {
          const r = from(b2n(rgb1.r));
          const g = from(b2n(rgb1.g));
          const b = from(b2n(rgb1.b));
          return {
            r: n2b(to(r + t * (from(b2n(rgb2.r)) - r))),
            g: n2b(to(g + t * (from(b2n(rgb2.g)) - g))),
            b: n2b(to(b + t * (from(b2n(rgb2.b)) - b))),
            a: rgb1.a + t * (rgb2.a - rgb1.a)
          };
        }
        function modHSL(v, i, ratio) {
          if (v) {
            let tmp = rgb2hsl(v);
            tmp[i] = Math.max(0, Math.min(tmp[i] + tmp[i] * ratio, i === 0 ? 360 : 1));
            tmp = hsl2rgb(tmp);
            v.r = tmp[0];
            v.g = tmp[1];
            v.b = tmp[2];
          }
        }
        function clone(v, proto) {
          return v ? Object.assign(proto || {}, v) : v;
        }
        function fromObject(input) {
          var v = { r: 0, g: 0, b: 0, a: 255 };
          if (Array.isArray(input)) {
            if (input.length >= 3) {
              v = { r: input[0], g: input[1], b: input[2], a: 255 };
              if (input.length > 3) {
                v.a = n2b(input[3]);
              }
            }
          } else {
            v = clone(input, { r: 0, g: 0, b: 0, a: 1 });
            v.a = n2b(v.a);
          }
          return v;
        }
        function functionParse(str2) {
          if (str2.charAt(0) === "r") {
            return rgbParse(str2);
          }
          return hueParse(str2);
        }
        class Color {
          constructor(input) {
            if (input instanceof Color) {
              return input;
            }
            const type = typeof input;
            let v;
            if (type === "object") {
              v = fromObject(input);
            } else if (type === "string") {
              v = hexParse(input) || nameParse(input) || functionParse(input);
            }
            this._rgb = v;
            this._valid = !!v;
          }
          get valid() {
            return this._valid;
          }
          get rgb() {
            var v = clone(this._rgb);
            if (v) {
              v.a = b2n(v.a);
            }
            return v;
          }
          set rgb(obj) {
            this._rgb = fromObject(obj);
          }
          rgbString() {
            return this._valid ? rgbString(this._rgb) : void 0;
          }
          hexString() {
            return this._valid ? hexString(this._rgb) : void 0;
          }
          hslString() {
            return this._valid ? hslString(this._rgb) : void 0;
          }
          mix(color2, weight) {
            if (color2) {
              const c1 = this.rgb;
              const c2 = color2.rgb;
              let w2;
              const p = weight === w2 ? 0.5 : weight;
              const w = 2 * p - 1;
              const a = c1.a - c2.a;
              const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
              w2 = 1 - w1;
              c1.r = 255 & w1 * c1.r + w2 * c2.r + 0.5;
              c1.g = 255 & w1 * c1.g + w2 * c2.g + 0.5;
              c1.b = 255 & w1 * c1.b + w2 * c2.b + 0.5;
              c1.a = p * c1.a + (1 - p) * c2.a;
              this.rgb = c1;
            }
            return this;
          }
          interpolate(color2, t) {
            if (color2) {
              this._rgb = interpolate$1(this._rgb, color2._rgb, t);
            }
            return this;
          }
          clone() {
            return new Color(this.rgb);
          }
          alpha(a) {
            this._rgb.a = n2b(a);
            return this;
          }
          clearer(ratio) {
            const rgb = this._rgb;
            rgb.a *= 1 - ratio;
            return this;
          }
          greyscale() {
            const rgb = this._rgb;
            const val = round(rgb.r * 0.3 + rgb.g * 0.59 + rgb.b * 0.11);
            rgb.r = rgb.g = rgb.b = val;
            return this;
          }
          opaquer(ratio) {
            const rgb = this._rgb;
            rgb.a *= 1 + ratio;
            return this;
          }
          negate() {
            const v = this._rgb;
            v.r = 255 - v.r;
            v.g = 255 - v.g;
            v.b = 255 - v.b;
            return this;
          }
          lighten(ratio) {
            modHSL(this._rgb, 2, ratio);
            return this;
          }
          darken(ratio) {
            modHSL(this._rgb, 2, -ratio);
            return this;
          }
          saturate(ratio) {
            modHSL(this._rgb, 1, ratio);
            return this;
          }
          desaturate(ratio) {
            modHSL(this._rgb, 1, -ratio);
            return this;
          }
          rotate(deg) {
            rotate(this._rgb, deg);
            return this;
          }
        }
        function index_esm(input) {
          return new Color(input);
        }
        function isPatternOrGradient(value) {
          if (value && typeof value === "object") {
            const type = value.toString();
            return type === "[object CanvasPattern]" || type === "[object CanvasGradient]";
          }
          return false;
        }
        function color(value) {
          return isPatternOrGradient(value) ? value : index_esm(value);
        }
        function getHoverColor(value) {
          return isPatternOrGradient(value) ? value : index_esm(value).saturate(0.5).darken(0.1).hexString();
        }
        const overrides = /* @__PURE__ */ Object.create(null);
        const descriptors = /* @__PURE__ */ Object.create(null);
        function getScope$1(node, key) {
          if (!key) {
            return node;
          }
          const keys = key.split(".");
          for (let i = 0, n = keys.length; i < n; ++i) {
            const k = keys[i];
            node = node[k] || (node[k] = /* @__PURE__ */ Object.create(null));
          }
          return node;
        }
        function set2(root, scope, values) {
          if (typeof scope === "string") {
            return merge(getScope$1(root, scope), values);
          }
          return merge(getScope$1(root, ""), scope);
        }
        class Defaults {
          constructor(_descriptors2) {
            this.animation = void 0;
            this.backgroundColor = "rgba(0,0,0,0.1)";
            this.borderColor = "rgba(0,0,0,0.1)";
            this.color = "#666";
            this.datasets = {};
            this.devicePixelRatio = (context) => context.chart.platform.getDevicePixelRatio();
            this.elements = {};
            this.events = [
              "mousemove",
              "mouseout",
              "click",
              "touchstart",
              "touchmove"
            ];
            this.font = {
              family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              size: 12,
              style: "normal",
              lineHeight: 1.2,
              weight: null
            };
            this.hover = {};
            this.hoverBackgroundColor = (ctx, options) => getHoverColor(options.backgroundColor);
            this.hoverBorderColor = (ctx, options) => getHoverColor(options.borderColor);
            this.hoverColor = (ctx, options) => getHoverColor(options.color);
            this.indexAxis = "x";
            this.interaction = {
              mode: "nearest",
              intersect: true,
              includeInvisible: false
            };
            this.maintainAspectRatio = true;
            this.onHover = null;
            this.onClick = null;
            this.parsing = true;
            this.plugins = {};
            this.responsive = true;
            this.scale = void 0;
            this.scales = {};
            this.showLine = true;
            this.drawActiveElementsOnTop = true;
            this.describe(_descriptors2);
          }
          set(scope, values) {
            return set2(this, scope, values);
          }
          get(scope) {
            return getScope$1(this, scope);
          }
          describe(scope, values) {
            return set2(descriptors, scope, values);
          }
          override(scope, values) {
            return set2(overrides, scope, values);
          }
          route(scope, name, targetScope, targetName) {
            const scopeObject = getScope$1(this, scope);
            const targetScopeObject = getScope$1(this, targetScope);
            const privateName = "_" + name;
            Object.defineProperties(scopeObject, {
              [privateName]: {
                value: scopeObject[name],
                writable: true
              },
              [name]: {
                enumerable: true,
                get() {
                  const local = this[privateName];
                  const target2 = targetScopeObject[targetName];
                  if (isObject2(local)) {
                    return Object.assign({}, target2, local);
                  }
                  return valueOrDefault(local, target2);
                },
                set(value) {
                  this[privateName] = value;
                }
              }
            });
          }
        }
        var defaults = new Defaults({
          _scriptable: (name) => !name.startsWith("on"),
          _indexable: (name) => name !== "events",
          hover: {
            _fallback: "interaction"
          },
          interaction: {
            _scriptable: false,
            _indexable: false
          }
        });
        function _isDomSupported() {
          return typeof window !== "undefined" && typeof document !== "undefined";
        }
        function _getParentNode(domNode) {
          let parent = domNode.parentNode;
          if (parent && parent.toString() === "[object ShadowRoot]") {
            parent = parent.host;
          }
          return parent;
        }
        function parseMaxStyle(styleValue2, node, parentProperty) {
          let valueInPixels;
          if (typeof styleValue2 === "string") {
            valueInPixels = parseInt(styleValue2, 10);
            if (styleValue2.indexOf("%") !== -1) {
              valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
            }
          } else {
            valueInPixels = styleValue2;
          }
          return valueInPixels;
        }
        const getComputedStyle = (element) => window.getComputedStyle(element, null);
        function getStyle2(el, property) {
          return getComputedStyle(el).getPropertyValue(property);
        }
        const positions = ["top", "right", "bottom", "left"];
        function getPositionedStyle(styles, style2, suffix) {
          const result = {};
          suffix = suffix ? "-" + suffix : "";
          for (let i = 0; i < 4; i++) {
            const pos = positions[i];
            result[pos] = parseFloat(styles[style2 + "-" + pos + suffix]) || 0;
          }
          result.width = result.left + result.right;
          result.height = result.top + result.bottom;
          return result;
        }
        const useOffsetPos = (x, y, target2) => (x > 0 || y > 0) && (!target2 || !target2.shadowRoot);
        function getCanvasPosition(e, canvas) {
          const touches = e.touches;
          const source = touches && touches.length ? touches[0] : e;
          const { offsetX, offsetY } = source;
          let box = false;
          let x, y;
          if (useOffsetPos(offsetX, offsetY, e.target)) {
            x = offsetX;
            y = offsetY;
          } else {
            const rect = canvas.getBoundingClientRect();
            x = source.clientX - rect.left;
            y = source.clientY - rect.top;
            box = true;
          }
          return { x, y, box };
        }
        function getRelativePosition(evt, chart) {
          if ("native" in evt) {
            return evt;
          }
          const { canvas, currentDevicePixelRatio } = chart;
          const style2 = getComputedStyle(canvas);
          const borderBox = style2.boxSizing === "border-box";
          const paddings = getPositionedStyle(style2, "padding");
          const borders = getPositionedStyle(style2, "border", "width");
          const { x, y, box } = getCanvasPosition(evt, canvas);
          const xOffset = paddings.left + (box && borders.left);
          const yOffset = paddings.top + (box && borders.top);
          let { width, height } = chart;
          if (borderBox) {
            width -= paddings.width + borders.width;
            height -= paddings.height + borders.height;
          }
          return {
            x: Math.round((x - xOffset) / width * canvas.width / currentDevicePixelRatio),
            y: Math.round((y - yOffset) / height * canvas.height / currentDevicePixelRatio)
          };
        }
        function getContainerSize(canvas, width, height) {
          let maxWidth, maxHeight;
          if (width === void 0 || height === void 0) {
            const container = _getParentNode(canvas);
            if (!container) {
              width = canvas.clientWidth;
              height = canvas.clientHeight;
            } else {
              const rect = container.getBoundingClientRect();
              const containerStyle = getComputedStyle(container);
              const containerBorder = getPositionedStyle(containerStyle, "border", "width");
              const containerPadding = getPositionedStyle(containerStyle, "padding");
              width = rect.width - containerPadding.width - containerBorder.width;
              height = rect.height - containerPadding.height - containerBorder.height;
              maxWidth = parseMaxStyle(containerStyle.maxWidth, container, "clientWidth");
              maxHeight = parseMaxStyle(containerStyle.maxHeight, container, "clientHeight");
            }
          }
          return {
            width,
            height,
            maxWidth: maxWidth || INFINITY,
            maxHeight: maxHeight || INFINITY
          };
        }
        const round1 = (v) => Math.round(v * 10) / 10;
        function getMaximumSize(canvas, bbWidth, bbHeight, aspectRatio) {
          const style2 = getComputedStyle(canvas);
          const margins = getPositionedStyle(style2, "margin");
          const maxWidth = parseMaxStyle(style2.maxWidth, canvas, "clientWidth") || INFINITY;
          const maxHeight = parseMaxStyle(style2.maxHeight, canvas, "clientHeight") || INFINITY;
          const containerSize = getContainerSize(canvas, bbWidth, bbHeight);
          let { width, height } = containerSize;
          if (style2.boxSizing === "content-box") {
            const borders = getPositionedStyle(style2, "border", "width");
            const paddings = getPositionedStyle(style2, "padding");
            width -= paddings.width + borders.width;
            height -= paddings.height + borders.height;
          }
          width = Math.max(0, width - margins.width);
          height = Math.max(0, aspectRatio ? Math.floor(width / aspectRatio) : height - margins.height);
          width = round1(Math.min(width, maxWidth, containerSize.maxWidth));
          height = round1(Math.min(height, maxHeight, containerSize.maxHeight));
          if (width && !height) {
            height = round1(width / 2);
          }
          return {
            width,
            height
          };
        }
        function retinaScale(chart, forceRatio, forceStyle) {
          const pixelRatio = forceRatio || 1;
          const deviceHeight = Math.floor(chart.height * pixelRatio);
          const deviceWidth = Math.floor(chart.width * pixelRatio);
          chart.height = deviceHeight / pixelRatio;
          chart.width = deviceWidth / pixelRatio;
          const canvas = chart.canvas;
          if (canvas.style && (forceStyle || !canvas.style.height && !canvas.style.width)) {
            canvas.style.height = `${chart.height}px`;
            canvas.style.width = `${chart.width}px`;
          }
          if (chart.currentDevicePixelRatio !== pixelRatio || canvas.height !== deviceHeight || canvas.width !== deviceWidth) {
            chart.currentDevicePixelRatio = pixelRatio;
            canvas.height = deviceHeight;
            canvas.width = deviceWidth;
            chart.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            return true;
          }
          return false;
        }
        const supportsEventListenerOptions = function() {
          let passiveSupported = false;
          try {
            const options = {
              get passive() {
                passiveSupported = true;
                return false;
              }
            };
            window.addEventListener("test", null, options);
            window.removeEventListener("test", null, options);
          } catch (e) {
          }
          return passiveSupported;
        }();
        function readUsedSize(element, property) {
          const value = getStyle2(element, property);
          const matches2 = value && value.match(/^(\d+)(\.\d+)?px$/);
          return matches2 ? +matches2[1] : void 0;
        }
        function toFontString(font) {
          if (!font || isNullOrUndef(font.size) || isNullOrUndef(font.family)) {
            return null;
          }
          return (font.style ? font.style + " " : "") + (font.weight ? font.weight + " " : "") + font.size + "px " + font.family;
        }
        function _measureText(ctx, data, gc, longest, string) {
          let textWidth = data[string];
          if (!textWidth) {
            textWidth = data[string] = ctx.measureText(string).width;
            gc.push(string);
          }
          if (textWidth > longest) {
            longest = textWidth;
          }
          return longest;
        }
        function _longestText(ctx, font, arrayOfThings, cache) {
          cache = cache || {};
          let data = cache.data = cache.data || {};
          let gc = cache.garbageCollect = cache.garbageCollect || [];
          if (cache.font !== font) {
            data = cache.data = {};
            gc = cache.garbageCollect = [];
            cache.font = font;
          }
          ctx.save();
          ctx.font = font;
          let longest = 0;
          const ilen = arrayOfThings.length;
          let i, j, jlen, thing, nestedThing;
          for (i = 0; i < ilen; i++) {
            thing = arrayOfThings[i];
            if (thing !== void 0 && thing !== null && isArray2(thing) !== true) {
              longest = _measureText(ctx, data, gc, longest, thing);
            } else if (isArray2(thing)) {
              for (j = 0, jlen = thing.length; j < jlen; j++) {
                nestedThing = thing[j];
                if (nestedThing !== void 0 && nestedThing !== null && !isArray2(nestedThing)) {
                  longest = _measureText(ctx, data, gc, longest, nestedThing);
                }
              }
            }
          }
          ctx.restore();
          const gcLen = gc.length / 2;
          if (gcLen > arrayOfThings.length) {
            for (i = 0; i < gcLen; i++) {
              delete data[gc[i]];
            }
            gc.splice(0, gcLen);
          }
          return longest;
        }
        function _alignPixel(chart, pixel, width) {
          const devicePixelRatio = chart.currentDevicePixelRatio;
          const halfWidth = width !== 0 ? Math.max(width / 2, 0.5) : 0;
          return Math.round((pixel - halfWidth) * devicePixelRatio) / devicePixelRatio + halfWidth;
        }
        function clearCanvas(canvas, ctx) {
          ctx = ctx || canvas.getContext("2d");
          ctx.save();
          ctx.resetTransform();
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.restore();
        }
        function drawPoint(ctx, options, x, y) {
          drawPointLegend(ctx, options, x, y, null);
        }
        function drawPointLegend(ctx, options, x, y, w) {
          let type, xOffset, yOffset, size, cornerRadius, width;
          const style2 = options.pointStyle;
          const rotation = options.rotation;
          const radius = options.radius;
          let rad = (rotation || 0) * RAD_PER_DEG;
          if (style2 && typeof style2 === "object") {
            type = style2.toString();
            if (type === "[object HTMLImageElement]" || type === "[object HTMLCanvasElement]") {
              ctx.save();
              ctx.translate(x, y);
              ctx.rotate(rad);
              ctx.drawImage(style2, -style2.width / 2, -style2.height / 2, style2.width, style2.height);
              ctx.restore();
              return;
            }
          }
          if (isNaN(radius) || radius <= 0) {
            return;
          }
          ctx.beginPath();
          switch (style2) {
            default:
              if (w) {
                ctx.ellipse(x, y, w / 2, radius, 0, 0, TAU);
              } else {
                ctx.arc(x, y, radius, 0, TAU);
              }
              ctx.closePath();
              break;
            case "triangle":
              ctx.moveTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
              rad += TWO_THIRDS_PI;
              ctx.lineTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
              rad += TWO_THIRDS_PI;
              ctx.lineTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
              ctx.closePath();
              break;
            case "rectRounded":
              cornerRadius = radius * 0.516;
              size = radius - cornerRadius;
              xOffset = Math.cos(rad + QUARTER_PI) * size;
              yOffset = Math.sin(rad + QUARTER_PI) * size;
              ctx.arc(x - xOffset, y - yOffset, cornerRadius, rad - PI, rad - HALF_PI);
              ctx.arc(x + yOffset, y - xOffset, cornerRadius, rad - HALF_PI, rad);
              ctx.arc(x + xOffset, y + yOffset, cornerRadius, rad, rad + HALF_PI);
              ctx.arc(x - yOffset, y + xOffset, cornerRadius, rad + HALF_PI, rad + PI);
              ctx.closePath();
              break;
            case "rect":
              if (!rotation) {
                size = Math.SQRT1_2 * radius;
                width = w ? w / 2 : size;
                ctx.rect(x - width, y - size, 2 * width, 2 * size);
                break;
              }
              rad += QUARTER_PI;
            case "rectRot":
              xOffset = Math.cos(rad) * radius;
              yOffset = Math.sin(rad) * radius;
              ctx.moveTo(x - xOffset, y - yOffset);
              ctx.lineTo(x + yOffset, y - xOffset);
              ctx.lineTo(x + xOffset, y + yOffset);
              ctx.lineTo(x - yOffset, y + xOffset);
              ctx.closePath();
              break;
            case "crossRot":
              rad += QUARTER_PI;
            case "cross":
              xOffset = Math.cos(rad) * radius;
              yOffset = Math.sin(rad) * radius;
              ctx.moveTo(x - xOffset, y - yOffset);
              ctx.lineTo(x + xOffset, y + yOffset);
              ctx.moveTo(x + yOffset, y - xOffset);
              ctx.lineTo(x - yOffset, y + xOffset);
              break;
            case "star":
              xOffset = Math.cos(rad) * radius;
              yOffset = Math.sin(rad) * radius;
              ctx.moveTo(x - xOffset, y - yOffset);
              ctx.lineTo(x + xOffset, y + yOffset);
              ctx.moveTo(x + yOffset, y - xOffset);
              ctx.lineTo(x - yOffset, y + xOffset);
              rad += QUARTER_PI;
              xOffset = Math.cos(rad) * radius;
              yOffset = Math.sin(rad) * radius;
              ctx.moveTo(x - xOffset, y - yOffset);
              ctx.lineTo(x + xOffset, y + yOffset);
              ctx.moveTo(x + yOffset, y - xOffset);
              ctx.lineTo(x - yOffset, y + xOffset);
              break;
            case "line":
              xOffset = w ? w / 2 : Math.cos(rad) * radius;
              yOffset = Math.sin(rad) * radius;
              ctx.moveTo(x - xOffset, y - yOffset);
              ctx.lineTo(x + xOffset, y + yOffset);
              break;
            case "dash":
              ctx.moveTo(x, y);
              ctx.lineTo(x + Math.cos(rad) * radius, y + Math.sin(rad) * radius);
              break;
          }
          ctx.fill();
          if (options.borderWidth > 0) {
            ctx.stroke();
          }
        }
        function _isPointInArea(point, area, margin) {
          margin = margin || 0.5;
          return !area || point && point.x > area.left - margin && point.x < area.right + margin && point.y > area.top - margin && point.y < area.bottom + margin;
        }
        function clipArea(ctx, area) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
          ctx.clip();
        }
        function unclipArea(ctx) {
          ctx.restore();
        }
        function _steppedLineTo(ctx, previous, target2, flip, mode) {
          if (!previous) {
            return ctx.lineTo(target2.x, target2.y);
          }
          if (mode === "middle") {
            const midpoint = (previous.x + target2.x) / 2;
            ctx.lineTo(midpoint, previous.y);
            ctx.lineTo(midpoint, target2.y);
          } else if (mode === "after" !== !!flip) {
            ctx.lineTo(previous.x, target2.y);
          } else {
            ctx.lineTo(target2.x, previous.y);
          }
          ctx.lineTo(target2.x, target2.y);
        }
        function _bezierCurveTo(ctx, previous, target2, flip) {
          if (!previous) {
            return ctx.lineTo(target2.x, target2.y);
          }
          ctx.bezierCurveTo(
            flip ? previous.cp1x : previous.cp2x,
            flip ? previous.cp1y : previous.cp2y,
            flip ? target2.cp2x : target2.cp1x,
            flip ? target2.cp2y : target2.cp1y,
            target2.x,
            target2.y
          );
        }
        function renderText(ctx, text2, x, y, font, opts = {}) {
          const lines = isArray2(text2) ? text2 : [text2];
          const stroke = opts.strokeWidth > 0 && opts.strokeColor !== "";
          let i, line;
          ctx.save();
          ctx.font = font.string;
          setRenderOpts(ctx, opts);
          for (i = 0; i < lines.length; ++i) {
            line = lines[i];
            if (stroke) {
              if (opts.strokeColor) {
                ctx.strokeStyle = opts.strokeColor;
              }
              if (!isNullOrUndef(opts.strokeWidth)) {
                ctx.lineWidth = opts.strokeWidth;
              }
              ctx.strokeText(line, x, y, opts.maxWidth);
            }
            ctx.fillText(line, x, y, opts.maxWidth);
            decorateText(ctx, x, y, line, opts);
            y += font.lineHeight;
          }
          ctx.restore();
        }
        function setRenderOpts(ctx, opts) {
          if (opts.translation) {
            ctx.translate(opts.translation[0], opts.translation[1]);
          }
          if (!isNullOrUndef(opts.rotation)) {
            ctx.rotate(opts.rotation);
          }
          if (opts.color) {
            ctx.fillStyle = opts.color;
          }
          if (opts.textAlign) {
            ctx.textAlign = opts.textAlign;
          }
          if (opts.textBaseline) {
            ctx.textBaseline = opts.textBaseline;
          }
        }
        function decorateText(ctx, x, y, line, opts) {
          if (opts.strikethrough || opts.underline) {
            const metrics = ctx.measureText(line);
            const left = x - metrics.actualBoundingBoxLeft;
            const right = x + metrics.actualBoundingBoxRight;
            const top = y - metrics.actualBoundingBoxAscent;
            const bottom = y + metrics.actualBoundingBoxDescent;
            const yDecoration = opts.strikethrough ? (top + bottom) / 2 : bottom;
            ctx.strokeStyle = ctx.fillStyle;
            ctx.beginPath();
            ctx.lineWidth = opts.decorationWidth || 2;
            ctx.moveTo(left, yDecoration);
            ctx.lineTo(right, yDecoration);
            ctx.stroke();
          }
        }
        function addRoundedRectPath(ctx, rect) {
          const { x, y, w, h, radius } = rect;
          ctx.arc(x + radius.topLeft, y + radius.topLeft, radius.topLeft, -HALF_PI, PI, true);
          ctx.lineTo(x, y + h - radius.bottomLeft);
          ctx.arc(x + radius.bottomLeft, y + h - radius.bottomLeft, radius.bottomLeft, PI, HALF_PI, true);
          ctx.lineTo(x + w - radius.bottomRight, y + h);
          ctx.arc(x + w - radius.bottomRight, y + h - radius.bottomRight, radius.bottomRight, HALF_PI, 0, true);
          ctx.lineTo(x + w, y + radius.topRight);
          ctx.arc(x + w - radius.topRight, y + radius.topRight, radius.topRight, 0, -HALF_PI, true);
          ctx.lineTo(x + radius.topLeft, y);
        }
        function _createResolver(scopes, prefixes = [""], rootScopes = scopes, fallback, getTarget = () => scopes[0]) {
          if (!defined(fallback)) {
            fallback = _resolve("_fallback", scopes);
          }
          const cache = {
            [Symbol.toStringTag]: "Object",
            _cacheable: true,
            _scopes: scopes,
            _rootScopes: rootScopes,
            _fallback: fallback,
            _getTarget: getTarget,
            override: (scope) => _createResolver([scope, ...scopes], prefixes, rootScopes, fallback)
          };
          return new Proxy(cache, {
            deleteProperty(target2, prop) {
              delete target2[prop];
              delete target2._keys;
              delete scopes[0][prop];
              return true;
            },
            get(target2, prop) {
              return _cached(
                target2,
                prop,
                () => _resolveWithPrefixes(prop, prefixes, scopes, target2)
              );
            },
            getOwnPropertyDescriptor(target2, prop) {
              return Reflect.getOwnPropertyDescriptor(target2._scopes[0], prop);
            },
            getPrototypeOf() {
              return Reflect.getPrototypeOf(scopes[0]);
            },
            has(target2, prop) {
              return getKeysFromAllScopes(target2).includes(prop);
            },
            ownKeys(target2) {
              return getKeysFromAllScopes(target2);
            },
            set(target2, prop, value) {
              const storage = target2._storage || (target2._storage = getTarget());
              target2[prop] = storage[prop] = value;
              delete target2._keys;
              return true;
            }
          });
        }
        function _attachContext(proxy2, context, subProxy, descriptorDefaults) {
          const cache = {
            _cacheable: false,
            _proxy: proxy2,
            _context: context,
            _subProxy: subProxy,
            _stack: /* @__PURE__ */ new Set(),
            _descriptors: _descriptors(proxy2, descriptorDefaults),
            setContext: (ctx) => _attachContext(proxy2, ctx, subProxy, descriptorDefaults),
            override: (scope) => _attachContext(proxy2.override(scope), context, subProxy, descriptorDefaults)
          };
          return new Proxy(cache, {
            deleteProperty(target2, prop) {
              delete target2[prop];
              delete proxy2[prop];
              return true;
            },
            get(target2, prop, receiver) {
              return _cached(
                target2,
                prop,
                () => _resolveWithContext(target2, prop, receiver)
              );
            },
            getOwnPropertyDescriptor(target2, prop) {
              return target2._descriptors.allKeys ? Reflect.has(proxy2, prop) ? { enumerable: true, configurable: true } : void 0 : Reflect.getOwnPropertyDescriptor(proxy2, prop);
            },
            getPrototypeOf() {
              return Reflect.getPrototypeOf(proxy2);
            },
            has(target2, prop) {
              return Reflect.has(proxy2, prop);
            },
            ownKeys() {
              return Reflect.ownKeys(proxy2);
            },
            set(target2, prop, value) {
              proxy2[prop] = value;
              delete target2[prop];
              return true;
            }
          });
        }
        function _descriptors(proxy2, defaults2 = { scriptable: true, indexable: true }) {
          const { _scriptable = defaults2.scriptable, _indexable = defaults2.indexable, _allKeys = defaults2.allKeys } = proxy2;
          return {
            allKeys: _allKeys,
            scriptable: _scriptable,
            indexable: _indexable,
            isScriptable: isFunction2(_scriptable) ? _scriptable : () => _scriptable,
            isIndexable: isFunction2(_indexable) ? _indexable : () => _indexable
          };
        }
        const readKey = (prefix, name) => prefix ? prefix + _capitalize(name) : name;
        const needsSubResolver = (prop, value) => isObject2(value) && prop !== "adapters" && (Object.getPrototypeOf(value) === null || value.constructor === Object);
        function _cached(target2, prop, resolve2) {
          if (Object.prototype.hasOwnProperty.call(target2, prop)) {
            return target2[prop];
          }
          const value = resolve2();
          target2[prop] = value;
          return value;
        }
        function _resolveWithContext(target2, prop, receiver) {
          const { _proxy, _context, _subProxy, _descriptors: descriptors2 } = target2;
          let value = _proxy[prop];
          if (isFunction2(value) && descriptors2.isScriptable(prop)) {
            value = _resolveScriptable(prop, value, target2, receiver);
          }
          if (isArray2(value) && value.length) {
            value = _resolveArray(prop, value, target2, descriptors2.isIndexable);
          }
          if (needsSubResolver(prop, value)) {
            value = _attachContext(value, _context, _subProxy && _subProxy[prop], descriptors2);
          }
          return value;
        }
        function _resolveScriptable(prop, value, target2, receiver) {
          const { _proxy, _context, _subProxy, _stack } = target2;
          if (_stack.has(prop)) {
            throw new Error("Recursion detected: " + Array.from(_stack).join("->") + "->" + prop);
          }
          _stack.add(prop);
          value = value(_context, _subProxy || receiver);
          _stack.delete(prop);
          if (needsSubResolver(prop, value)) {
            value = createSubResolver(_proxy._scopes, _proxy, prop, value);
          }
          return value;
        }
        function _resolveArray(prop, value, target2, isIndexable) {
          const { _proxy, _context, _subProxy, _descriptors: descriptors2 } = target2;
          if (defined(_context.index) && isIndexable(prop)) {
            value = value[_context.index % value.length];
          } else if (isObject2(value[0])) {
            const arr = value;
            const scopes = _proxy._scopes.filter((s) => s !== arr);
            value = [];
            for (const item of arr) {
              const resolver = createSubResolver(scopes, _proxy, prop, item);
              value.push(_attachContext(resolver, _context, _subProxy && _subProxy[prop], descriptors2));
            }
          }
          return value;
        }
        function resolveFallback(fallback, prop, value) {
          return isFunction2(fallback) ? fallback(prop, value) : fallback;
        }
        const getScope = (key, parent) => key === true ? parent : typeof key === "string" ? resolveObjectKey(parent, key) : void 0;
        function addScopes(set3, parentScopes, key, parentFallback, value) {
          for (const parent of parentScopes) {
            const scope = getScope(key, parent);
            if (scope) {
              set3.add(scope);
              const fallback = resolveFallback(scope._fallback, key, value);
              if (defined(fallback) && fallback !== key && fallback !== parentFallback) {
                return fallback;
              }
            } else if (scope === false && defined(parentFallback) && key !== parentFallback) {
              return null;
            }
          }
          return false;
        }
        function createSubResolver(parentScopes, resolver, prop, value) {
          const rootScopes = resolver._rootScopes;
          const fallback = resolveFallback(resolver._fallback, prop, value);
          const allScopes = [...parentScopes, ...rootScopes];
          const set3 = /* @__PURE__ */ new Set();
          set3.add(value);
          let key = addScopesFromKey(set3, allScopes, prop, fallback || prop, value);
          if (key === null) {
            return false;
          }
          if (defined(fallback) && fallback !== prop) {
            key = addScopesFromKey(set3, allScopes, fallback, key, value);
            if (key === null) {
              return false;
            }
          }
          return _createResolver(
            Array.from(set3),
            [""],
            rootScopes,
            fallback,
            () => subGetTarget(resolver, prop, value)
          );
        }
        function addScopesFromKey(set3, allScopes, key, fallback, item) {
          while (key) {
            key = addScopes(set3, allScopes, key, fallback, item);
          }
          return key;
        }
        function subGetTarget(resolver, prop, value) {
          const parent = resolver._getTarget();
          if (!(prop in parent)) {
            parent[prop] = {};
          }
          const target2 = parent[prop];
          if (isArray2(target2) && isObject2(value)) {
            return value;
          }
          return target2;
        }
        function _resolveWithPrefixes(prop, prefixes, scopes, proxy2) {
          let value;
          for (const prefix of prefixes) {
            value = _resolve(readKey(prefix, prop), scopes);
            if (defined(value)) {
              return needsSubResolver(prop, value) ? createSubResolver(scopes, proxy2, prop, value) : value;
            }
          }
        }
        function _resolve(key, scopes) {
          for (const scope of scopes) {
            if (!scope) {
              continue;
            }
            const value = scope[key];
            if (defined(value)) {
              return value;
            }
          }
        }
        function getKeysFromAllScopes(target2) {
          let keys = target2._keys;
          if (!keys) {
            keys = target2._keys = resolveKeysFromAllScopes(target2._scopes);
          }
          return keys;
        }
        function resolveKeysFromAllScopes(scopes) {
          const set3 = /* @__PURE__ */ new Set();
          for (const scope of scopes) {
            for (const key of Object.keys(scope).filter((k) => !k.startsWith("_"))) {
              set3.add(key);
            }
          }
          return Array.from(set3);
        }
        function _parseObjectDataRadialScale(meta, data, start, count) {
          const { iScale } = meta;
          const { key = "r" } = this._parsing;
          const parsed = new Array(count);
          let i, ilen, index3, item;
          for (i = 0, ilen = count; i < ilen; ++i) {
            index3 = i + start;
            item = data[index3];
            parsed[i] = {
              r: iScale.parse(resolveObjectKey(item, key), index3)
            };
          }
          return parsed;
        }
        const EPSILON = Number.EPSILON || 1e-14;
        const getPoint = (points, i) => i < points.length && !points[i].skip && points[i];
        const getValueAxis = (indexAxis) => indexAxis === "x" ? "y" : "x";
        function splineCurve(firstPoint, middlePoint, afterPoint, t) {
          const previous = firstPoint.skip ? middlePoint : firstPoint;
          const current = middlePoint;
          const next2 = afterPoint.skip ? middlePoint : afterPoint;
          const d01 = distanceBetweenPoints(current, previous);
          const d12 = distanceBetweenPoints(next2, current);
          let s01 = d01 / (d01 + d12);
          let s12 = d12 / (d01 + d12);
          s01 = isNaN(s01) ? 0 : s01;
          s12 = isNaN(s12) ? 0 : s12;
          const fa = t * s01;
          const fb = t * s12;
          return {
            previous: {
              x: current.x - fa * (next2.x - previous.x),
              y: current.y - fa * (next2.y - previous.y)
            },
            next: {
              x: current.x + fb * (next2.x - previous.x),
              y: current.y + fb * (next2.y - previous.y)
            }
          };
        }
        function monotoneAdjust(points, deltaK, mK) {
          const pointsLen = points.length;
          let alphaK, betaK, tauK, squaredMagnitude, pointCurrent;
          let pointAfter = getPoint(points, 0);
          for (let i = 0; i < pointsLen - 1; ++i) {
            pointCurrent = pointAfter;
            pointAfter = getPoint(points, i + 1);
            if (!pointCurrent || !pointAfter) {
              continue;
            }
            if (almostEquals(deltaK[i], 0, EPSILON)) {
              mK[i] = mK[i + 1] = 0;
              continue;
            }
            alphaK = mK[i] / deltaK[i];
            betaK = mK[i + 1] / deltaK[i];
            squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
            if (squaredMagnitude <= 9) {
              continue;
            }
            tauK = 3 / Math.sqrt(squaredMagnitude);
            mK[i] = alphaK * tauK * deltaK[i];
            mK[i + 1] = betaK * tauK * deltaK[i];
          }
        }
        function monotoneCompute(points, mK, indexAxis = "x") {
          const valueAxis = getValueAxis(indexAxis);
          const pointsLen = points.length;
          let delta, pointBefore, pointCurrent;
          let pointAfter = getPoint(points, 0);
          for (let i = 0; i < pointsLen; ++i) {
            pointBefore = pointCurrent;
            pointCurrent = pointAfter;
            pointAfter = getPoint(points, i + 1);
            if (!pointCurrent) {
              continue;
            }
            const iPixel = pointCurrent[indexAxis];
            const vPixel = pointCurrent[valueAxis];
            if (pointBefore) {
              delta = (iPixel - pointBefore[indexAxis]) / 3;
              pointCurrent[`cp1${indexAxis}`] = iPixel - delta;
              pointCurrent[`cp1${valueAxis}`] = vPixel - delta * mK[i];
            }
            if (pointAfter) {
              delta = (pointAfter[indexAxis] - iPixel) / 3;
              pointCurrent[`cp2${indexAxis}`] = iPixel + delta;
              pointCurrent[`cp2${valueAxis}`] = vPixel + delta * mK[i];
            }
          }
        }
        function splineCurveMonotone(points, indexAxis = "x") {
          const valueAxis = getValueAxis(indexAxis);
          const pointsLen = points.length;
          const deltaK = Array(pointsLen).fill(0);
          const mK = Array(pointsLen);
          let i, pointBefore, pointCurrent;
          let pointAfter = getPoint(points, 0);
          for (i = 0; i < pointsLen; ++i) {
            pointBefore = pointCurrent;
            pointCurrent = pointAfter;
            pointAfter = getPoint(points, i + 1);
            if (!pointCurrent) {
              continue;
            }
            if (pointAfter) {
              const slopeDelta = pointAfter[indexAxis] - pointCurrent[indexAxis];
              deltaK[i] = slopeDelta !== 0 ? (pointAfter[valueAxis] - pointCurrent[valueAxis]) / slopeDelta : 0;
            }
            mK[i] = !pointBefore ? deltaK[i] : !pointAfter ? deltaK[i - 1] : sign(deltaK[i - 1]) !== sign(deltaK[i]) ? 0 : (deltaK[i - 1] + deltaK[i]) / 2;
          }
          monotoneAdjust(points, deltaK, mK);
          monotoneCompute(points, mK, indexAxis);
        }
        function capControlPoint(pt, min, max) {
          return Math.max(Math.min(pt, max), min);
        }
        function capBezierPoints(points, area) {
          let i, ilen, point, inArea, inAreaPrev;
          let inAreaNext = _isPointInArea(points[0], area);
          for (i = 0, ilen = points.length; i < ilen; ++i) {
            inAreaPrev = inArea;
            inArea = inAreaNext;
            inAreaNext = i < ilen - 1 && _isPointInArea(points[i + 1], area);
            if (!inArea) {
              continue;
            }
            point = points[i];
            if (inAreaPrev) {
              point.cp1x = capControlPoint(point.cp1x, area.left, area.right);
              point.cp1y = capControlPoint(point.cp1y, area.top, area.bottom);
            }
            if (inAreaNext) {
              point.cp2x = capControlPoint(point.cp2x, area.left, area.right);
              point.cp2y = capControlPoint(point.cp2y, area.top, area.bottom);
            }
          }
        }
        function _updateBezierControlPoints(points, options, area, loop, indexAxis) {
          let i, ilen, point, controlPoints;
          if (options.spanGaps) {
            points = points.filter((pt) => !pt.skip);
          }
          if (options.cubicInterpolationMode === "monotone") {
            splineCurveMonotone(points, indexAxis);
          } else {
            let prev = loop ? points[points.length - 1] : points[0];
            for (i = 0, ilen = points.length; i < ilen; ++i) {
              point = points[i];
              controlPoints = splineCurve(
                prev,
                point,
                points[Math.min(i + 1, ilen - (loop ? 0 : 1)) % ilen],
                options.tension
              );
              point.cp1x = controlPoints.previous.x;
              point.cp1y = controlPoints.previous.y;
              point.cp2x = controlPoints.next.x;
              point.cp2y = controlPoints.next.y;
              prev = point;
            }
          }
          if (options.capBezierPoints) {
            capBezierPoints(points, area);
          }
        }
        const atEdge = (t) => t === 0 || t === 1;
        const elasticIn = (t, s, p) => -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * TAU / p));
        const elasticOut = (t, s, p) => Math.pow(2, -10 * t) * Math.sin((t - s) * TAU / p) + 1;
        const effects = {
          linear: (t) => t,
          easeInQuad: (t) => t * t,
          easeOutQuad: (t) => -t * (t - 2),
          easeInOutQuad: (t) => (t /= 0.5) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1),
          easeInCubic: (t) => t * t * t,
          easeOutCubic: (t) => (t -= 1) * t * t + 1,
          easeInOutCubic: (t) => (t /= 0.5) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2),
          easeInQuart: (t) => t * t * t * t,
          easeOutQuart: (t) => -((t -= 1) * t * t * t - 1),
          easeInOutQuart: (t) => (t /= 0.5) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2),
          easeInQuint: (t) => t * t * t * t * t,
          easeOutQuint: (t) => (t -= 1) * t * t * t * t + 1,
          easeInOutQuint: (t) => (t /= 0.5) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2),
          easeInSine: (t) => -Math.cos(t * HALF_PI) + 1,
          easeOutSine: (t) => Math.sin(t * HALF_PI),
          easeInOutSine: (t) => -0.5 * (Math.cos(PI * t) - 1),
          easeInExpo: (t) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
          easeOutExpo: (t) => t === 1 ? 1 : -Math.pow(2, -10 * t) + 1,
          easeInOutExpo: (t) => atEdge(t) ? t : t < 0.5 ? 0.5 * Math.pow(2, 10 * (t * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2),
          easeInCirc: (t) => t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1),
          easeOutCirc: (t) => Math.sqrt(1 - (t -= 1) * t),
          easeInOutCirc: (t) => (t /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
          easeInElastic: (t) => atEdge(t) ? t : elasticIn(t, 0.075, 0.3),
          easeOutElastic: (t) => atEdge(t) ? t : elasticOut(t, 0.075, 0.3),
          easeInOutElastic(t) {
            const s = 0.1125;
            const p = 0.45;
            return atEdge(t) ? t : t < 0.5 ? 0.5 * elasticIn(t * 2, s, p) : 0.5 + 0.5 * elasticOut(t * 2 - 1, s, p);
          },
          easeInBack(t) {
            const s = 1.70158;
            return t * t * ((s + 1) * t - s);
          },
          easeOutBack(t) {
            const s = 1.70158;
            return (t -= 1) * t * ((s + 1) * t + s) + 1;
          },
          easeInOutBack(t) {
            let s = 1.70158;
            if ((t /= 0.5) < 1) {
              return 0.5 * (t * t * (((s *= 1.525) + 1) * t - s));
            }
            return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
          },
          easeInBounce: (t) => 1 - effects.easeOutBounce(1 - t),
          easeOutBounce(t) {
            const m = 7.5625;
            const d = 2.75;
            if (t < 1 / d) {
              return m * t * t;
            }
            if (t < 2 / d) {
              return m * (t -= 1.5 / d) * t + 0.75;
            }
            if (t < 2.5 / d) {
              return m * (t -= 2.25 / d) * t + 0.9375;
            }
            return m * (t -= 2.625 / d) * t + 0.984375;
          },
          easeInOutBounce: (t) => t < 0.5 ? effects.easeInBounce(t * 2) * 0.5 : effects.easeOutBounce(t * 2 - 1) * 0.5 + 0.5
        };
        function _pointInLine(p1, p2, t, mode) {
          return {
            x: p1.x + t * (p2.x - p1.x),
            y: p1.y + t * (p2.y - p1.y)
          };
        }
        function _steppedInterpolation(p1, p2, t, mode) {
          return {
            x: p1.x + t * (p2.x - p1.x),
            y: mode === "middle" ? t < 0.5 ? p1.y : p2.y : mode === "after" ? t < 1 ? p1.y : p2.y : t > 0 ? p2.y : p1.y
          };
        }
        function _bezierInterpolation(p1, p2, t, mode) {
          const cp1 = { x: p1.cp2x, y: p1.cp2y };
          const cp2 = { x: p2.cp1x, y: p2.cp1y };
          const a = _pointInLine(p1, cp1, t);
          const b = _pointInLine(cp1, cp2, t);
          const c = _pointInLine(cp2, p2, t);
          const d = _pointInLine(a, b, t);
          const e = _pointInLine(b, c, t);
          return _pointInLine(d, e, t);
        }
        const intlCache = /* @__PURE__ */ new Map();
        function getNumberFormat(locale, options) {
          options = options || {};
          const cacheKey = locale + JSON.stringify(options);
          let formatter = intlCache.get(cacheKey);
          if (!formatter) {
            formatter = new Intl.NumberFormat(locale, options);
            intlCache.set(cacheKey, formatter);
          }
          return formatter;
        }
        function formatNumber(num, locale, options) {
          return getNumberFormat(locale, options).format(num);
        }
        const LINE_HEIGHT = new RegExp(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);
        const FONT_STYLE = new RegExp(/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/);
        function toLineHeight(value, size) {
          const matches2 = ("" + value).match(LINE_HEIGHT);
          if (!matches2 || matches2[1] === "normal") {
            return size * 1.2;
          }
          value = +matches2[2];
          switch (matches2[3]) {
            case "px":
              return value;
            case "%":
              value /= 100;
              break;
          }
          return size * value;
        }
        const numberOrZero = (v) => +v || 0;
        function _readValueToProps(value, props2) {
          const ret = {};
          const objProps = isObject2(props2);
          const keys = objProps ? Object.keys(props2) : props2;
          const read = isObject2(value) ? objProps ? (prop) => valueOrDefault(value[prop], value[props2[prop]]) : (prop) => value[prop] : () => value;
          for (const prop of keys) {
            ret[prop] = numberOrZero(read(prop));
          }
          return ret;
        }
        function toTRBL(value) {
          return _readValueToProps(value, { top: "y", right: "x", bottom: "y", left: "x" });
        }
        function toTRBLCorners(value) {
          return _readValueToProps(value, ["topLeft", "topRight", "bottomLeft", "bottomRight"]);
        }
        function toPadding(value) {
          const obj = toTRBL(value);
          obj.width = obj.left + obj.right;
          obj.height = obj.top + obj.bottom;
          return obj;
        }
        function toFont(options, fallback) {
          options = options || {};
          fallback = fallback || defaults.font;
          let size = valueOrDefault(options.size, fallback.size);
          if (typeof size === "string") {
            size = parseInt(size, 10);
          }
          let style2 = valueOrDefault(options.style, fallback.style);
          if (style2 && !("" + style2).match(FONT_STYLE)) {
            console.warn('Invalid font style specified: "' + style2 + '"');
            style2 = "";
          }
          const font = {
            family: valueOrDefault(options.family, fallback.family),
            lineHeight: toLineHeight(valueOrDefault(options.lineHeight, fallback.lineHeight), size),
            size,
            style: style2,
            weight: valueOrDefault(options.weight, fallback.weight),
            string: ""
          };
          font.string = toFontString(font);
          return font;
        }
        function resolve(inputs, context, index3, info) {
          let cacheable = true;
          let i, ilen, value;
          for (i = 0, ilen = inputs.length; i < ilen; ++i) {
            value = inputs[i];
            if (value === void 0) {
              continue;
            }
            if (context !== void 0 && typeof value === "function") {
              value = value(context);
              cacheable = false;
            }
            if (index3 !== void 0 && isArray2(value)) {
              value = value[index3 % value.length];
              cacheable = false;
            }
            if (value !== void 0) {
              if (info && !cacheable) {
                info.cacheable = false;
              }
              return value;
            }
          }
        }
        function _addGrace(minmax, grace, beginAtZero) {
          const { min, max } = minmax;
          const change = toDimension(grace, (max - min) / 2);
          const keepZero = (value, add2) => beginAtZero && value === 0 ? 0 : value + add2;
          return {
            min: keepZero(min, -Math.abs(change)),
            max: keepZero(max, change)
          };
        }
        function createContext(parentContext, context) {
          return Object.assign(Object.create(parentContext), context);
        }
        const getRightToLeftAdapter = function(rectX, width) {
          return {
            x(x) {
              return rectX + rectX + width - x;
            },
            setWidth(w) {
              width = w;
            },
            textAlign(align) {
              if (align === "center") {
                return align;
              }
              return align === "right" ? "left" : "right";
            },
            xPlus(x, value) {
              return x - value;
            },
            leftForLtr(x, itemWidth) {
              return x - itemWidth;
            }
          };
        };
        const getLeftToRightAdapter = function() {
          return {
            x(x) {
              return x;
            },
            setWidth(w) {
            },
            textAlign(align) {
              return align;
            },
            xPlus(x, value) {
              return x + value;
            },
            leftForLtr(x, _itemWidth) {
              return x;
            }
          };
        };
        function getRtlAdapter(rtl, rectX, width) {
          return rtl ? getRightToLeftAdapter(rectX, width) : getLeftToRightAdapter();
        }
        function overrideTextDirection(ctx, direction) {
          let style2, original;
          if (direction === "ltr" || direction === "rtl") {
            style2 = ctx.canvas.style;
            original = [
              style2.getPropertyValue("direction"),
              style2.getPropertyPriority("direction")
            ];
            style2.setProperty("direction", direction, "important");
            ctx.prevTextDirection = original;
          }
        }
        function restoreTextDirection(ctx, original) {
          if (original !== void 0) {
            delete ctx.prevTextDirection;
            ctx.canvas.style.setProperty("direction", original[0], original[1]);
          }
        }
        function propertyFn(property) {
          if (property === "angle") {
            return {
              between: _angleBetween,
              compare: _angleDiff,
              normalize: _normalizeAngle
            };
          }
          return {
            between: _isBetween,
            compare: (a, b) => a - b,
            normalize: (x) => x
          };
        }
        function normalizeSegment({ start, end, count, loop, style: style2 }) {
          return {
            start: start % count,
            end: end % count,
            loop: loop && (end - start + 1) % count === 0,
            style: style2
          };
        }
        function getSegment(segment, points, bounds) {
          const { property, start: startBound, end: endBound } = bounds;
          const { between, normalize: normalize2 } = propertyFn(property);
          const count = points.length;
          let { start, end, loop } = segment;
          let i, ilen;
          if (loop) {
            start += count;
            end += count;
            for (i = 0, ilen = count; i < ilen; ++i) {
              if (!between(normalize2(points[start % count][property]), startBound, endBound)) {
                break;
              }
              start--;
              end--;
            }
            start %= count;
            end %= count;
          }
          if (end < start) {
            end += count;
          }
          return { start, end, loop, style: segment.style };
        }
        function _boundSegment(segment, points, bounds) {
          if (!bounds) {
            return [segment];
          }
          const { property, start: startBound, end: endBound } = bounds;
          const count = points.length;
          const { compare, between, normalize: normalize2 } = propertyFn(property);
          const { start, end, loop, style: style2 } = getSegment(segment, points, bounds);
          const result = [];
          let inside = false;
          let subStart = null;
          let value, point, prevValue;
          const startIsBefore = () => between(startBound, prevValue, value) && compare(startBound, prevValue) !== 0;
          const endIsBefore = () => compare(endBound, value) === 0 || between(endBound, prevValue, value);
          const shouldStart = () => inside || startIsBefore();
          const shouldStop = () => !inside || endIsBefore();
          for (let i = start, prev = start; i <= end; ++i) {
            point = points[i % count];
            if (point.skip) {
              continue;
            }
            value = normalize2(point[property]);
            if (value === prevValue) {
              continue;
            }
            inside = between(value, startBound, endBound);
            if (subStart === null && shouldStart()) {
              subStart = compare(value, startBound) === 0 ? i : prev;
            }
            if (subStart !== null && shouldStop()) {
              result.push(normalizeSegment({ start: subStart, end: i, loop, count, style: style2 }));
              subStart = null;
            }
            prev = i;
            prevValue = value;
          }
          if (subStart !== null) {
            result.push(normalizeSegment({ start: subStart, end, loop, count, style: style2 }));
          }
          return result;
        }
        function _boundSegments(line, bounds) {
          const result = [];
          const segments = line.segments;
          for (let i = 0; i < segments.length; i++) {
            const sub = _boundSegment(segments[i], line.points, bounds);
            if (sub.length) {
              result.push(...sub);
            }
          }
          return result;
        }
        function findStartAndEnd(points, count, loop, spanGaps) {
          let start = 0;
          let end = count - 1;
          if (loop && !spanGaps) {
            while (start < count && !points[start].skip) {
              start++;
            }
          }
          while (start < count && points[start].skip) {
            start++;
          }
          start %= count;
          if (loop) {
            end += start;
          }
          while (end > start && points[end % count].skip) {
            end--;
          }
          end %= count;
          return { start, end };
        }
        function solidSegments(points, start, max, loop) {
          const count = points.length;
          const result = [];
          let last = start;
          let prev = points[start];
          let end;
          for (end = start + 1; end <= max; ++end) {
            const cur = points[end % count];
            if (cur.skip || cur.stop) {
              if (!prev.skip) {
                loop = false;
                result.push({ start: start % count, end: (end - 1) % count, loop });
                start = last = cur.stop ? end : null;
              }
            } else {
              last = end;
              if (prev.skip) {
                start = end;
              }
            }
            prev = cur;
          }
          if (last !== null) {
            result.push({ start: start % count, end: last % count, loop });
          }
          return result;
        }
        function _computeSegments(line, segmentOptions) {
          const points = line.points;
          const spanGaps = line.options.spanGaps;
          const count = points.length;
          if (!count) {
            return [];
          }
          const loop = !!line._loop;
          const { start, end } = findStartAndEnd(points, count, loop, spanGaps);
          if (spanGaps === true) {
            return splitByStyles(line, [{ start, end, loop }], points, segmentOptions);
          }
          const max = end < start ? end + count : end;
          const completeLoop = !!line._fullLoop && start === 0 && end === count - 1;
          return splitByStyles(line, solidSegments(points, start, max, completeLoop), points, segmentOptions);
        }
        function splitByStyles(line, segments, points, segmentOptions) {
          if (!segmentOptions || !segmentOptions.setContext || !points) {
            return segments;
          }
          return doSplitByStyles(line, segments, points, segmentOptions);
        }
        function doSplitByStyles(line, segments, points, segmentOptions) {
          const chartContext = line._chart.getContext();
          const baseStyle = readStyle(line.options);
          const { _datasetIndex: datasetIndex, options: { spanGaps } } = line;
          const count = points.length;
          const result = [];
          let prevStyle = baseStyle;
          let start = segments[0].start;
          let i = start;
          function addStyle(s, e, l, st) {
            const dir = spanGaps ? -1 : 1;
            if (s === e) {
              return;
            }
            s += count;
            while (points[s % count].skip) {
              s -= dir;
            }
            while (points[e % count].skip) {
              e += dir;
            }
            if (s % count !== e % count) {
              result.push({ start: s % count, end: e % count, loop: l, style: st });
              prevStyle = st;
              start = e % count;
            }
          }
          for (const segment of segments) {
            start = spanGaps ? start : segment.start;
            let prev = points[start % count];
            let style2;
            for (i = start + 1; i <= segment.end; i++) {
              const pt = points[i % count];
              style2 = readStyle(segmentOptions.setContext(createContext(chartContext, {
                type: "segment",
                p0: prev,
                p1: pt,
                p0DataIndex: (i - 1) % count,
                p1DataIndex: i % count,
                datasetIndex
              })));
              if (styleChanged(style2, prevStyle)) {
                addStyle(start, i - 1, segment.loop, prevStyle);
              }
              prev = pt;
              prevStyle = style2;
            }
            if (start < i - 1) {
              addStyle(start, i - 1, segment.loop, prevStyle);
            }
          }
          return result;
        }
        function readStyle(options) {
          return {
            backgroundColor: options.backgroundColor,
            borderCapStyle: options.borderCapStyle,
            borderDash: options.borderDash,
            borderDashOffset: options.borderDashOffset,
            borderJoinStyle: options.borderJoinStyle,
            borderWidth: options.borderWidth,
            borderColor: options.borderColor
          };
        }
        function styleChanged(style2, prevStyle) {
          return prevStyle && JSON.stringify(style2) !== JSON.stringify(prevStyle);
        }
        var helpers = /* @__PURE__ */ Object.freeze({
          __proto__: null,
          easingEffects: effects,
          isPatternOrGradient,
          color,
          getHoverColor,
          noop: noop2,
          uid: uid2,
          isNullOrUndef,
          isArray: isArray2,
          isObject: isObject2,
          isFinite: isNumberFinite,
          finiteOrDefault,
          valueOrDefault,
          toPercentage,
          toDimension,
          callback,
          each,
          _elementsEqual,
          clone: clone$1,
          _merger,
          merge,
          mergeIf,
          _mergerIf,
          _deprecated,
          resolveObjectKey,
          _splitKey,
          _capitalize,
          defined,
          isFunction: isFunction2,
          setsEqual,
          _isClickEvent,
          toFontString,
          _measureText,
          _longestText,
          _alignPixel,
          clearCanvas,
          drawPoint,
          drawPointLegend,
          _isPointInArea,
          clipArea,
          unclipArea,
          _steppedLineTo,
          _bezierCurveTo,
          renderText,
          addRoundedRectPath,
          _lookup,
          _lookupByKey,
          _rlookupByKey,
          _filterBetween,
          listenArrayEvents,
          unlistenArrayEvents,
          _arrayUnique,
          _createResolver,
          _attachContext,
          _descriptors,
          _parseObjectDataRadialScale,
          splineCurve,
          splineCurveMonotone,
          _updateBezierControlPoints,
          _isDomSupported,
          _getParentNode,
          getStyle: getStyle2,
          getRelativePosition,
          getMaximumSize,
          retinaScale,
          supportsEventListenerOptions,
          readUsedSize,
          fontString,
          requestAnimFrame,
          throttled,
          debounce,
          _toLeftRightCenter,
          _alignStartEnd,
          _textX,
          _getStartAndCountOfVisiblePoints,
          _scaleRangesChanged,
          _pointInLine,
          _steppedInterpolation,
          _bezierInterpolation,
          formatNumber,
          toLineHeight,
          _readValueToProps,
          toTRBL,
          toTRBLCorners,
          toPadding,
          toFont,
          resolve,
          _addGrace,
          createContext,
          PI,
          TAU,
          PITAU,
          INFINITY,
          RAD_PER_DEG,
          HALF_PI,
          QUARTER_PI,
          TWO_THIRDS_PI,
          log10,
          sign,
          niceNum,
          _factorize,
          isNumber,
          almostEquals,
          almostWhole,
          _setMinAndMaxByKey,
          toRadians,
          toDegrees,
          _decimalPlaces,
          getAngleFromPoint,
          distanceBetweenPoints,
          _angleDiff,
          _normalizeAngle,
          _angleBetween,
          _limitValue,
          _int16Range,
          _isBetween,
          getRtlAdapter,
          overrideTextDirection,
          restoreTextDirection,
          _boundSegment,
          _boundSegments,
          _computeSegments
        });
        function binarySearch(metaset, axis, value, intersect) {
          const { controller, data, _sorted } = metaset;
          const iScale = controller._cachedMeta.iScale;
          if (iScale && axis === iScale.axis && axis !== "r" && _sorted && data.length) {
            const lookupMethod = iScale._reversePixels ? _rlookupByKey : _lookupByKey;
            if (!intersect) {
              return lookupMethod(data, axis, value);
            } else if (controller._sharedOptions) {
              const el = data[0];
              const range2 = typeof el.getRange === "function" && el.getRange(axis);
              if (range2) {
                const start = lookupMethod(data, axis, value - range2);
                const end = lookupMethod(data, axis, value + range2);
                return { lo: start.lo, hi: end.hi };
              }
            }
          }
          return { lo: 0, hi: data.length - 1 };
        }
        function evaluateInteractionItems(chart, axis, position, handler, intersect) {
          const metasets = chart.getSortedVisibleDatasetMetas();
          const value = position[axis];
          for (let i = 0, ilen = metasets.length; i < ilen; ++i) {
            const { index: index3, data } = metasets[i];
            const { lo, hi } = binarySearch(metasets[i], axis, value, intersect);
            for (let j = lo; j <= hi; ++j) {
              const element = data[j];
              if (!element.skip) {
                handler(element, index3, j);
              }
            }
          }
        }
        function getDistanceMetricForAxis(axis) {
          const useX = axis.indexOf("x") !== -1;
          const useY = axis.indexOf("y") !== -1;
          return function(pt1, pt2) {
            const deltaX = useX ? Math.abs(pt1.x - pt2.x) : 0;
            const deltaY = useY ? Math.abs(pt1.y - pt2.y) : 0;
            return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
          };
        }
        function getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) {
          const items = [];
          if (!includeInvisible && !chart.isPointInArea(position)) {
            return items;
          }
          const evaluationFunc = function(element, datasetIndex, index3) {
            if (!includeInvisible && !_isPointInArea(element, chart.chartArea, 0)) {
              return;
            }
            if (element.inRange(position.x, position.y, useFinalPosition)) {
              items.push({ element, datasetIndex, index: index3 });
            }
          };
          evaluateInteractionItems(chart, axis, position, evaluationFunc, true);
          return items;
        }
        function getNearestRadialItems(chart, position, axis, useFinalPosition) {
          let items = [];
          function evaluationFunc(element, datasetIndex, index3) {
            const { startAngle, endAngle } = element.getProps(["startAngle", "endAngle"], useFinalPosition);
            const { angle } = getAngleFromPoint(element, { x: position.x, y: position.y });
            if (_angleBetween(angle, startAngle, endAngle)) {
              items.push({ element, datasetIndex, index: index3 });
            }
          }
          evaluateInteractionItems(chart, axis, position, evaluationFunc);
          return items;
        }
        function getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition, includeInvisible) {
          let items = [];
          const distanceMetric = getDistanceMetricForAxis(axis);
          let minDistance = Number.POSITIVE_INFINITY;
          function evaluationFunc(element, datasetIndex, index3) {
            const inRange2 = element.inRange(position.x, position.y, useFinalPosition);
            if (intersect && !inRange2) {
              return;
            }
            const center = element.getCenterPoint(useFinalPosition);
            const pointInArea = !!includeInvisible || chart.isPointInArea(center);
            if (!pointInArea && !inRange2) {
              return;
            }
            const distance = distanceMetric(position, center);
            if (distance < minDistance) {
              items = [{ element, datasetIndex, index: index3 }];
              minDistance = distance;
            } else if (distance === minDistance) {
              items.push({ element, datasetIndex, index: index3 });
            }
          }
          evaluateInteractionItems(chart, axis, position, evaluationFunc);
          return items;
        }
        function getNearestItems(chart, position, axis, intersect, useFinalPosition, includeInvisible) {
          if (!includeInvisible && !chart.isPointInArea(position)) {
            return [];
          }
          return axis === "r" && !intersect ? getNearestRadialItems(chart, position, axis, useFinalPosition) : getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition, includeInvisible);
        }
        function getAxisItems(chart, position, axis, intersect, useFinalPosition) {
          const items = [];
          const rangeMethod = axis === "x" ? "inXRange" : "inYRange";
          let intersectsItem = false;
          evaluateInteractionItems(chart, axis, position, (element, datasetIndex, index3) => {
            if (element[rangeMethod](position[axis], useFinalPosition)) {
              items.push({ element, datasetIndex, index: index3 });
              intersectsItem = intersectsItem || element.inRange(position.x, position.y, useFinalPosition);
            }
          });
          if (intersect && !intersectsItem) {
            return [];
          }
          return items;
        }
        var Interaction = {
          evaluateInteractionItems,
          modes: {
            index(chart, e, options, useFinalPosition) {
              const position = getRelativePosition(e, chart);
              const axis = options.axis || "x";
              const includeInvisible = options.includeInvisible || false;
              const items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) : getNearestItems(chart, position, axis, false, useFinalPosition, includeInvisible);
              const elements2 = [];
              if (!items.length) {
                return [];
              }
              chart.getSortedVisibleDatasetMetas().forEach((meta) => {
                const index3 = items[0].index;
                const element = meta.data[index3];
                if (element && !element.skip) {
                  elements2.push({ element, datasetIndex: meta.index, index: index3 });
                }
              });
              return elements2;
            },
            dataset(chart, e, options, useFinalPosition) {
              const position = getRelativePosition(e, chart);
              const axis = options.axis || "xy";
              const includeInvisible = options.includeInvisible || false;
              let items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) : getNearestItems(chart, position, axis, false, useFinalPosition, includeInvisible);
              if (items.length > 0) {
                const datasetIndex = items[0].datasetIndex;
                const data = chart.getDatasetMeta(datasetIndex).data;
                items = [];
                for (let i = 0; i < data.length; ++i) {
                  items.push({ element: data[i], datasetIndex, index: i });
                }
              }
              return items;
            },
            point(chart, e, options, useFinalPosition) {
              const position = getRelativePosition(e, chart);
              const axis = options.axis || "xy";
              const includeInvisible = options.includeInvisible || false;
              return getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible);
            },
            nearest(chart, e, options, useFinalPosition) {
              const position = getRelativePosition(e, chart);
              const axis = options.axis || "xy";
              const includeInvisible = options.includeInvisible || false;
              return getNearestItems(chart, position, axis, options.intersect, useFinalPosition, includeInvisible);
            },
            x(chart, e, options, useFinalPosition) {
              const position = getRelativePosition(e, chart);
              return getAxisItems(chart, position, "x", options.intersect, useFinalPosition);
            },
            y(chart, e, options, useFinalPosition) {
              const position = getRelativePosition(e, chart);
              return getAxisItems(chart, position, "y", options.intersect, useFinalPosition);
            }
          }
        };
        const STATIC_POSITIONS = ["left", "top", "right", "bottom"];
        function filterByPosition(array, position) {
          return array.filter((v) => v.pos === position);
        }
        function filterDynamicPositionByAxis(array, axis) {
          return array.filter((v) => STATIC_POSITIONS.indexOf(v.pos) === -1 && v.box.axis === axis);
        }
        function sortByWeight(array, reverse) {
          return array.sort((a, b) => {
            const v0 = reverse ? b : a;
            const v1 = reverse ? a : b;
            return v0.weight === v1.weight ? v0.index - v1.index : v0.weight - v1.weight;
          });
        }
        function wrapBoxes(boxes) {
          const layoutBoxes = [];
          let i, ilen, box, pos, stack, stackWeight;
          for (i = 0, ilen = (boxes || []).length; i < ilen; ++i) {
            box = boxes[i];
            ({ position: pos, options: { stack, stackWeight = 1 } } = box);
            layoutBoxes.push({
              index: i,
              box,
              pos,
              horizontal: box.isHorizontal(),
              weight: box.weight,
              stack: stack && pos + stack,
              stackWeight
            });
          }
          return layoutBoxes;
        }
        function buildStacks(layouts2) {
          const stacks = {};
          for (const wrap of layouts2) {
            const { stack, pos, stackWeight } = wrap;
            if (!stack || !STATIC_POSITIONS.includes(pos)) {
              continue;
            }
            const _stack = stacks[stack] || (stacks[stack] = { count: 0, placed: 0, weight: 0, size: 0 });
            _stack.count++;
            _stack.weight += stackWeight;
          }
          return stacks;
        }
        function setLayoutDims(layouts2, params) {
          const stacks = buildStacks(layouts2);
          const { vBoxMaxWidth, hBoxMaxHeight } = params;
          let i, ilen, layout;
          for (i = 0, ilen = layouts2.length; i < ilen; ++i) {
            layout = layouts2[i];
            const { fullSize } = layout.box;
            const stack = stacks[layout.stack];
            const factor = stack && layout.stackWeight / stack.weight;
            if (layout.horizontal) {
              layout.width = factor ? factor * vBoxMaxWidth : fullSize && params.availableWidth;
              layout.height = hBoxMaxHeight;
            } else {
              layout.width = vBoxMaxWidth;
              layout.height = factor ? factor * hBoxMaxHeight : fullSize && params.availableHeight;
            }
          }
          return stacks;
        }
        function buildLayoutBoxes(boxes) {
          const layoutBoxes = wrapBoxes(boxes);
          const fullSize = sortByWeight(layoutBoxes.filter((wrap) => wrap.box.fullSize), true);
          const left = sortByWeight(filterByPosition(layoutBoxes, "left"), true);
          const right = sortByWeight(filterByPosition(layoutBoxes, "right"));
          const top = sortByWeight(filterByPosition(layoutBoxes, "top"), true);
          const bottom = sortByWeight(filterByPosition(layoutBoxes, "bottom"));
          const centerHorizontal = filterDynamicPositionByAxis(layoutBoxes, "x");
          const centerVertical = filterDynamicPositionByAxis(layoutBoxes, "y");
          return {
            fullSize,
            leftAndTop: left.concat(top),
            rightAndBottom: right.concat(centerVertical).concat(bottom).concat(centerHorizontal),
            chartArea: filterByPosition(layoutBoxes, "chartArea"),
            vertical: left.concat(right).concat(centerVertical),
            horizontal: top.concat(bottom).concat(centerHorizontal)
          };
        }
        function getCombinedMax(maxPadding, chartArea, a, b) {
          return Math.max(maxPadding[a], chartArea[a]) + Math.max(maxPadding[b], chartArea[b]);
        }
        function updateMaxPadding(maxPadding, boxPadding) {
          maxPadding.top = Math.max(maxPadding.top, boxPadding.top);
          maxPadding.left = Math.max(maxPadding.left, boxPadding.left);
          maxPadding.bottom = Math.max(maxPadding.bottom, boxPadding.bottom);
          maxPadding.right = Math.max(maxPadding.right, boxPadding.right);
        }
        function updateDims(chartArea, params, layout, stacks) {
          const { pos, box } = layout;
          const maxPadding = chartArea.maxPadding;
          if (!isObject2(pos)) {
            if (layout.size) {
              chartArea[pos] -= layout.size;
            }
            const stack = stacks[layout.stack] || { size: 0, count: 1 };
            stack.size = Math.max(stack.size, layout.horizontal ? box.height : box.width);
            layout.size = stack.size / stack.count;
            chartArea[pos] += layout.size;
          }
          if (box.getPadding) {
            updateMaxPadding(maxPadding, box.getPadding());
          }
          const newWidth = Math.max(0, params.outerWidth - getCombinedMax(maxPadding, chartArea, "left", "right"));
          const newHeight = Math.max(0, params.outerHeight - getCombinedMax(maxPadding, chartArea, "top", "bottom"));
          const widthChanged = newWidth !== chartArea.w;
          const heightChanged = newHeight !== chartArea.h;
          chartArea.w = newWidth;
          chartArea.h = newHeight;
          return layout.horizontal ? { same: widthChanged, other: heightChanged } : { same: heightChanged, other: widthChanged };
        }
        function handleMaxPadding(chartArea) {
          const maxPadding = chartArea.maxPadding;
          function updatePos(pos) {
            const change = Math.max(maxPadding[pos] - chartArea[pos], 0);
            chartArea[pos] += change;
            return change;
          }
          chartArea.y += updatePos("top");
          chartArea.x += updatePos("left");
          updatePos("right");
          updatePos("bottom");
        }
        function getMargins(horizontal, chartArea) {
          const maxPadding = chartArea.maxPadding;
          function marginForPositions(positions2) {
            const margin = { left: 0, top: 0, right: 0, bottom: 0 };
            positions2.forEach((pos) => {
              margin[pos] = Math.max(chartArea[pos], maxPadding[pos]);
            });
            return margin;
          }
          return horizontal ? marginForPositions(["left", "right"]) : marginForPositions(["top", "bottom"]);
        }
        function fitBoxes(boxes, chartArea, params, stacks) {
          const refitBoxes = [];
          let i, ilen, layout, box, refit, changed;
          for (i = 0, ilen = boxes.length, refit = 0; i < ilen; ++i) {
            layout = boxes[i];
            box = layout.box;
            box.update(
              layout.width || chartArea.w,
              layout.height || chartArea.h,
              getMargins(layout.horizontal, chartArea)
            );
            const { same, other } = updateDims(chartArea, params, layout, stacks);
            refit |= same && refitBoxes.length;
            changed = changed || other;
            if (!box.fullSize) {
              refitBoxes.push(layout);
            }
          }
          return refit && fitBoxes(refitBoxes, chartArea, params, stacks) || changed;
        }
        function setBoxDims(box, left, top, width, height) {
          box.top = top;
          box.left = left;
          box.right = left + width;
          box.bottom = top + height;
          box.width = width;
          box.height = height;
        }
        function placeBoxes(boxes, chartArea, params, stacks) {
          const userPadding = params.padding;
          let { x, y } = chartArea;
          for (const layout of boxes) {
            const box = layout.box;
            const stack = stacks[layout.stack] || { count: 1, placed: 0, weight: 1 };
            const weight = layout.stackWeight / stack.weight || 1;
            if (layout.horizontal) {
              const width = chartArea.w * weight;
              const height = stack.size || box.height;
              if (defined(stack.start)) {
                y = stack.start;
              }
              if (box.fullSize) {
                setBoxDims(box, userPadding.left, y, params.outerWidth - userPadding.right - userPadding.left, height);
              } else {
                setBoxDims(box, chartArea.left + stack.placed, y, width, height);
              }
              stack.start = y;
              stack.placed += width;
              y = box.bottom;
            } else {
              const height = chartArea.h * weight;
              const width = stack.size || box.width;
              if (defined(stack.start)) {
                x = stack.start;
              }
              if (box.fullSize) {
                setBoxDims(box, x, userPadding.top, width, params.outerHeight - userPadding.bottom - userPadding.top);
              } else {
                setBoxDims(box, x, chartArea.top + stack.placed, width, height);
              }
              stack.start = x;
              stack.placed += height;
              x = box.right;
            }
          }
          chartArea.x = x;
          chartArea.y = y;
        }
        defaults.set("layout", {
          autoPadding: true,
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        });
        var layouts = {
          addBox(chart, item) {
            if (!chart.boxes) {
              chart.boxes = [];
            }
            item.fullSize = item.fullSize || false;
            item.position = item.position || "top";
            item.weight = item.weight || 0;
            item._layers = item._layers || function() {
              return [{
                z: 0,
                draw(chartArea) {
                  item.draw(chartArea);
                }
              }];
            };
            chart.boxes.push(item);
          },
          removeBox(chart, layoutItem) {
            const index3 = chart.boxes ? chart.boxes.indexOf(layoutItem) : -1;
            if (index3 !== -1) {
              chart.boxes.splice(index3, 1);
            }
          },
          configure(chart, item, options) {
            item.fullSize = options.fullSize;
            item.position = options.position;
            item.weight = options.weight;
          },
          update(chart, width, height, minPadding) {
            if (!chart) {
              return;
            }
            const padding = toPadding(chart.options.layout.padding);
            const availableWidth = Math.max(width - padding.width, 0);
            const availableHeight = Math.max(height - padding.height, 0);
            const boxes = buildLayoutBoxes(chart.boxes);
            const verticalBoxes = boxes.vertical;
            const horizontalBoxes = boxes.horizontal;
            each(chart.boxes, (box) => {
              if (typeof box.beforeLayout === "function") {
                box.beforeLayout();
              }
            });
            const visibleVerticalBoxCount = verticalBoxes.reduce((total, wrap) => wrap.box.options && wrap.box.options.display === false ? total : total + 1, 0) || 1;
            const params = Object.freeze({
              outerWidth: width,
              outerHeight: height,
              padding,
              availableWidth,
              availableHeight,
              vBoxMaxWidth: availableWidth / 2 / visibleVerticalBoxCount,
              hBoxMaxHeight: availableHeight / 2
            });
            const maxPadding = Object.assign({}, padding);
            updateMaxPadding(maxPadding, toPadding(minPadding));
            const chartArea = Object.assign({
              maxPadding,
              w: availableWidth,
              h: availableHeight,
              x: padding.left,
              y: padding.top
            }, padding);
            const stacks = setLayoutDims(verticalBoxes.concat(horizontalBoxes), params);
            fitBoxes(boxes.fullSize, chartArea, params, stacks);
            fitBoxes(verticalBoxes, chartArea, params, stacks);
            if (fitBoxes(horizontalBoxes, chartArea, params, stacks)) {
              fitBoxes(verticalBoxes, chartArea, params, stacks);
            }
            handleMaxPadding(chartArea);
            placeBoxes(boxes.leftAndTop, chartArea, params, stacks);
            chartArea.x += chartArea.w;
            chartArea.y += chartArea.h;
            placeBoxes(boxes.rightAndBottom, chartArea, params, stacks);
            chart.chartArea = {
              left: chartArea.left,
              top: chartArea.top,
              right: chartArea.left + chartArea.w,
              bottom: chartArea.top + chartArea.h,
              height: chartArea.h,
              width: chartArea.w
            };
            each(boxes.chartArea, (layout) => {
              const box = layout.box;
              Object.assign(box, chart.chartArea);
              box.update(chartArea.w, chartArea.h, { left: 0, top: 0, right: 0, bottom: 0 });
            });
          }
        };
        class BasePlatform {
          acquireContext(canvas, aspectRatio) {
          }
          releaseContext(context) {
            return false;
          }
          addEventListener(chart, type, listener) {
          }
          removeEventListener(chart, type, listener) {
          }
          getDevicePixelRatio() {
            return 1;
          }
          getMaximumSize(element, width, height, aspectRatio) {
            width = Math.max(0, width || element.width);
            height = height || element.height;
            return {
              width,
              height: Math.max(0, aspectRatio ? Math.floor(width / aspectRatio) : height)
            };
          }
          isAttached(canvas) {
            return true;
          }
          updateConfig(config2) {
          }
        }
        class BasicPlatform extends BasePlatform {
          acquireContext(item) {
            return item && item.getContext && item.getContext("2d") || null;
          }
          updateConfig(config2) {
            config2.options.animation = false;
          }
        }
        const EXPANDO_KEY = "$chartjs";
        const EVENT_TYPES = {
          touchstart: "mousedown",
          touchmove: "mousemove",
          touchend: "mouseup",
          pointerenter: "mouseenter",
          pointerdown: "mousedown",
          pointermove: "mousemove",
          pointerup: "mouseup",
          pointerleave: "mouseout",
          pointerout: "mouseout"
        };
        const isNullOrEmpty = (value) => value === null || value === "";
        function initCanvas(canvas, aspectRatio) {
          const style2 = canvas.style;
          const renderHeight = canvas.getAttribute("height");
          const renderWidth = canvas.getAttribute("width");
          canvas[EXPANDO_KEY] = {
            initial: {
              height: renderHeight,
              width: renderWidth,
              style: {
                display: style2.display,
                height: style2.height,
                width: style2.width
              }
            }
          };
          style2.display = style2.display || "block";
          style2.boxSizing = style2.boxSizing || "border-box";
          if (isNullOrEmpty(renderWidth)) {
            const displayWidth = readUsedSize(canvas, "width");
            if (displayWidth !== void 0) {
              canvas.width = displayWidth;
            }
          }
          if (isNullOrEmpty(renderHeight)) {
            if (canvas.style.height === "") {
              canvas.height = canvas.width / (aspectRatio || 2);
            } else {
              const displayHeight = readUsedSize(canvas, "height");
              if (displayHeight !== void 0) {
                canvas.height = displayHeight;
              }
            }
          }
          return canvas;
        }
        const eventListenerOptions = supportsEventListenerOptions ? { passive: true } : false;
        function addListener(node, type, listener) {
          node.addEventListener(type, listener, eventListenerOptions);
        }
        function removeListener(chart, type, listener) {
          chart.canvas.removeEventListener(type, listener, eventListenerOptions);
        }
        function fromNativeEvent(event, chart) {
          const type = EVENT_TYPES[event.type] || event.type;
          const { x, y } = getRelativePosition(event, chart);
          return {
            type,
            chart,
            native: event,
            x: x !== void 0 ? x : null,
            y: y !== void 0 ? y : null
          };
        }
        function nodeListContains(nodeList, canvas) {
          for (const node of nodeList) {
            if (node === canvas || node.contains(canvas)) {
              return true;
            }
          }
        }
        function createAttachObserver(chart, type, listener) {
          const canvas = chart.canvas;
          const observer = new MutationObserver((entries) => {
            let trigger2 = false;
            for (const entry of entries) {
              trigger2 = trigger2 || nodeListContains(entry.addedNodes, canvas);
              trigger2 = trigger2 && !nodeListContains(entry.removedNodes, canvas);
            }
            if (trigger2) {
              listener();
            }
          });
          observer.observe(document, { childList: true, subtree: true });
          return observer;
        }
        function createDetachObserver(chart, type, listener) {
          const canvas = chart.canvas;
          const observer = new MutationObserver((entries) => {
            let trigger2 = false;
            for (const entry of entries) {
              trigger2 = trigger2 || nodeListContains(entry.removedNodes, canvas);
              trigger2 = trigger2 && !nodeListContains(entry.addedNodes, canvas);
            }
            if (trigger2) {
              listener();
            }
          });
          observer.observe(document, { childList: true, subtree: true });
          return observer;
        }
        const drpListeningCharts = /* @__PURE__ */ new Map();
        let oldDevicePixelRatio = 0;
        function onWindowResize() {
          const dpr = window.devicePixelRatio;
          if (dpr === oldDevicePixelRatio) {
            return;
          }
          oldDevicePixelRatio = dpr;
          drpListeningCharts.forEach((resize, chart) => {
            if (chart.currentDevicePixelRatio !== dpr) {
              resize();
            }
          });
        }
        function listenDevicePixelRatioChanges(chart, resize) {
          if (!drpListeningCharts.size) {
            window.addEventListener("resize", onWindowResize);
          }
          drpListeningCharts.set(chart, resize);
        }
        function unlistenDevicePixelRatioChanges(chart) {
          drpListeningCharts.delete(chart);
          if (!drpListeningCharts.size) {
            window.removeEventListener("resize", onWindowResize);
          }
        }
        function createResizeObserver(chart, type, listener) {
          const canvas = chart.canvas;
          const container = canvas && _getParentNode(canvas);
          if (!container) {
            return;
          }
          const resize = throttled((width, height) => {
            const w = container.clientWidth;
            listener(width, height);
            if (w < container.clientWidth) {
              listener();
            }
          }, window);
          const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            const width = entry.contentRect.width;
            const height = entry.contentRect.height;
            if (width === 0 && height === 0) {
              return;
            }
            resize(width, height);
          });
          observer.observe(container);
          listenDevicePixelRatioChanges(chart, resize);
          return observer;
        }
        function releaseObserver(chart, type, observer) {
          if (observer) {
            observer.disconnect();
          }
          if (type === "resize") {
            unlistenDevicePixelRatioChanges(chart);
          }
        }
        function createProxyAndListen(chart, type, listener) {
          const canvas = chart.canvas;
          const proxy2 = throttled((event) => {
            if (chart.ctx !== null) {
              listener(fromNativeEvent(event, chart));
            }
          }, chart, (args) => {
            const event = args[0];
            return [event, event.offsetX, event.offsetY];
          });
          addListener(canvas, type, proxy2);
          return proxy2;
        }
        class DomPlatform extends BasePlatform {
          acquireContext(canvas, aspectRatio) {
            const context = canvas && canvas.getContext && canvas.getContext("2d");
            if (context && context.canvas === canvas) {
              initCanvas(canvas, aspectRatio);
              return context;
            }
            return null;
          }
          releaseContext(context) {
            const canvas = context.canvas;
            if (!canvas[EXPANDO_KEY]) {
              return false;
            }
            const initial = canvas[EXPANDO_KEY].initial;
            ["height", "width"].forEach((prop) => {
              const value = initial[prop];
              if (isNullOrUndef(value)) {
                canvas.removeAttribute(prop);
              } else {
                canvas.setAttribute(prop, value);
              }
            });
            const style2 = initial.style || {};
            Object.keys(style2).forEach((key) => {
              canvas.style[key] = style2[key];
            });
            canvas.width = canvas.width;
            delete canvas[EXPANDO_KEY];
            return true;
          }
          addEventListener(chart, type, listener) {
            this.removeEventListener(chart, type);
            const proxies = chart.$proxies || (chart.$proxies = {});
            const handlers = {
              attach: createAttachObserver,
              detach: createDetachObserver,
              resize: createResizeObserver
            };
            const handler = handlers[type] || createProxyAndListen;
            proxies[type] = handler(chart, type, listener);
          }
          removeEventListener(chart, type) {
            const proxies = chart.$proxies || (chart.$proxies = {});
            const proxy2 = proxies[type];
            if (!proxy2) {
              return;
            }
            const handlers = {
              attach: releaseObserver,
              detach: releaseObserver,
              resize: releaseObserver
            };
            const handler = handlers[type] || removeListener;
            handler(chart, type, proxy2);
            proxies[type] = void 0;
          }
          getDevicePixelRatio() {
            return window.devicePixelRatio;
          }
          getMaximumSize(canvas, width, height, aspectRatio) {
            return getMaximumSize(canvas, width, height, aspectRatio);
          }
          isAttached(canvas) {
            const container = _getParentNode(canvas);
            return !!(container && container.isConnected);
          }
        }
        function _detectPlatform(canvas) {
          if (!_isDomSupported() || typeof OffscreenCanvas !== "undefined" && canvas instanceof OffscreenCanvas) {
            return BasicPlatform;
          }
          return DomPlatform;
        }
        var platforms = /* @__PURE__ */ Object.freeze({
          __proto__: null,
          _detectPlatform,
          BasePlatform,
          BasicPlatform,
          DomPlatform
        });
        const transparent = "transparent";
        const interpolators = {
          boolean(from2, to2, factor) {
            return factor > 0.5 ? to2 : from2;
          },
          color(from2, to2, factor) {
            const c0 = color(from2 || transparent);
            const c1 = c0.valid && color(to2 || transparent);
            return c1 && c1.valid ? c1.mix(c0, factor).hexString() : to2;
          },
          number(from2, to2, factor) {
            return from2 + (to2 - from2) * factor;
          }
        };
        class Animation {
          constructor(cfg, target2, prop, to2) {
            const currentValue = target2[prop];
            to2 = resolve([cfg.to, to2, currentValue, cfg.from]);
            const from2 = resolve([cfg.from, currentValue, to2]);
            this._active = true;
            this._fn = cfg.fn || interpolators[cfg.type || typeof from2];
            this._easing = effects[cfg.easing] || effects.linear;
            this._start = Math.floor(Date.now() + (cfg.delay || 0));
            this._duration = this._total = Math.floor(cfg.duration);
            this._loop = !!cfg.loop;
            this._target = target2;
            this._prop = prop;
            this._from = from2;
            this._to = to2;
            this._promises = void 0;
          }
          active() {
            return this._active;
          }
          update(cfg, to2, date) {
            if (this._active) {
              this._notify(false);
              const currentValue = this._target[this._prop];
              const elapsed = date - this._start;
              const remain = this._duration - elapsed;
              this._start = date;
              this._duration = Math.floor(Math.max(remain, cfg.duration));
              this._total += elapsed;
              this._loop = !!cfg.loop;
              this._to = resolve([cfg.to, to2, currentValue, cfg.from]);
              this._from = resolve([cfg.from, currentValue, to2]);
            }
          }
          cancel() {
            if (this._active) {
              this.tick(Date.now());
              this._active = false;
              this._notify(false);
            }
          }
          tick(date) {
            const elapsed = date - this._start;
            const duration = this._duration;
            const prop = this._prop;
            const from2 = this._from;
            const loop = this._loop;
            const to2 = this._to;
            let factor;
            this._active = from2 !== to2 && (loop || elapsed < duration);
            if (!this._active) {
              this._target[prop] = to2;
              this._notify(true);
              return;
            }
            if (elapsed < 0) {
              this._target[prop] = from2;
              return;
            }
            factor = elapsed / duration % 2;
            factor = loop && factor > 1 ? 2 - factor : factor;
            factor = this._easing(Math.min(1, Math.max(0, factor)));
            this._target[prop] = this._fn(from2, to2, factor);
          }
          wait() {
            const promises = this._promises || (this._promises = []);
            return new Promise((res, rej) => {
              promises.push({ res, rej });
            });
          }
          _notify(resolved) {
            const method = resolved ? "res" : "rej";
            const promises = this._promises || [];
            for (let i = 0; i < promises.length; i++) {
              promises[i][method]();
            }
          }
        }
        const numbers = ["x", "y", "borderWidth", "radius", "tension"];
        const colors = ["color", "borderColor", "backgroundColor"];
        defaults.set("animation", {
          delay: void 0,
          duration: 1e3,
          easing: "easeOutQuart",
          fn: void 0,
          from: void 0,
          loop: void 0,
          to: void 0,
          type: void 0
        });
        const animationOptions = Object.keys(defaults.animation);
        defaults.describe("animation", {
          _fallback: false,
          _indexable: false,
          _scriptable: (name) => name !== "onProgress" && name !== "onComplete" && name !== "fn"
        });
        defaults.set("animations", {
          colors: {
            type: "color",
            properties: colors
          },
          numbers: {
            type: "number",
            properties: numbers
          }
        });
        defaults.describe("animations", {
          _fallback: "animation"
        });
        defaults.set("transitions", {
          active: {
            animation: {
              duration: 400
            }
          },
          resize: {
            animation: {
              duration: 0
            }
          },
          show: {
            animations: {
              colors: {
                from: "transparent"
              },
              visible: {
                type: "boolean",
                duration: 0
              }
            }
          },
          hide: {
            animations: {
              colors: {
                to: "transparent"
              },
              visible: {
                type: "boolean",
                easing: "linear",
                fn: (v) => v | 0
              }
            }
          }
        });
        class Animations {
          constructor(chart, config2) {
            this._chart = chart;
            this._properties = /* @__PURE__ */ new Map();
            this.configure(config2);
          }
          configure(config2) {
            if (!isObject2(config2)) {
              return;
            }
            const animatedProps = this._properties;
            Object.getOwnPropertyNames(config2).forEach((key) => {
              const cfg = config2[key];
              if (!isObject2(cfg)) {
                return;
              }
              const resolved = {};
              for (const option of animationOptions) {
                resolved[option] = cfg[option];
              }
              (isArray2(cfg.properties) && cfg.properties || [key]).forEach((prop) => {
                if (prop === key || !animatedProps.has(prop)) {
                  animatedProps.set(prop, resolved);
                }
              });
            });
          }
          _animateOptions(target2, values) {
            const newOptions = values.options;
            const options = resolveTargetOptions(target2, newOptions);
            if (!options) {
              return [];
            }
            const animations = this._createAnimations(options, newOptions);
            if (newOptions.$shared) {
              awaitAll(target2.options.$animations, newOptions).then(() => {
                target2.options = newOptions;
              }, () => {
              });
            }
            return animations;
          }
          _createAnimations(target2, values) {
            const animatedProps = this._properties;
            const animations = [];
            const running = target2.$animations || (target2.$animations = {});
            const props2 = Object.keys(values);
            const date = Date.now();
            let i;
            for (i = props2.length - 1; i >= 0; --i) {
              const prop = props2[i];
              if (prop.charAt(0) === "$") {
                continue;
              }
              if (prop === "options") {
                animations.push(...this._animateOptions(target2, values));
                continue;
              }
              const value = values[prop];
              let animation = running[prop];
              const cfg = animatedProps.get(prop);
              if (animation) {
                if (cfg && animation.active()) {
                  animation.update(cfg, value, date);
                  continue;
                } else {
                  animation.cancel();
                }
              }
              if (!cfg || !cfg.duration) {
                target2[prop] = value;
                continue;
              }
              running[prop] = animation = new Animation(cfg, target2, prop, value);
              animations.push(animation);
            }
            return animations;
          }
          update(target2, values) {
            if (this._properties.size === 0) {
              Object.assign(target2, values);
              return;
            }
            const animations = this._createAnimations(target2, values);
            if (animations.length) {
              animator.add(this._chart, animations);
              return true;
            }
          }
        }
        function awaitAll(animations, properties) {
          const running = [];
          const keys = Object.keys(properties);
          for (let i = 0; i < keys.length; i++) {
            const anim = animations[keys[i]];
            if (anim && anim.active()) {
              running.push(anim.wait());
            }
          }
          return Promise.all(running);
        }
        function resolveTargetOptions(target2, newOptions) {
          if (!newOptions) {
            return;
          }
          let options = target2.options;
          if (!options) {
            target2.options = newOptions;
            return;
          }
          if (options.$shared) {
            target2.options = options = Object.assign({}, options, { $shared: false, $animations: {} });
          }
          return options;
        }
        function scaleClip(scale, allowedOverflow) {
          const opts = scale && scale.options || {};
          const reverse = opts.reverse;
          const min = opts.min === void 0 ? allowedOverflow : 0;
          const max = opts.max === void 0 ? allowedOverflow : 0;
          return {
            start: reverse ? max : min,
            end: reverse ? min : max
          };
        }
        function defaultClip(xScale, yScale, allowedOverflow) {
          if (allowedOverflow === false) {
            return false;
          }
          const x = scaleClip(xScale, allowedOverflow);
          const y = scaleClip(yScale, allowedOverflow);
          return {
            top: y.end,
            right: x.end,
            bottom: y.start,
            left: x.start
          };
        }
        function toClip(value) {
          let t, r, b, l;
          if (isObject2(value)) {
            t = value.top;
            r = value.right;
            b = value.bottom;
            l = value.left;
          } else {
            t = r = b = l = value;
          }
          return {
            top: t,
            right: r,
            bottom: b,
            left: l,
            disabled: value === false
          };
        }
        function getSortedDatasetIndices(chart, filterVisible) {
          const keys = [];
          const metasets = chart._getSortedDatasetMetas(filterVisible);
          let i, ilen;
          for (i = 0, ilen = metasets.length; i < ilen; ++i) {
            keys.push(metasets[i].index);
          }
          return keys;
        }
        function applyStack(stack, value, dsIndex, options = {}) {
          const keys = stack.keys;
          const singleMode = options.mode === "single";
          let i, ilen, datasetIndex, otherValue;
          if (value === null) {
            return;
          }
          for (i = 0, ilen = keys.length; i < ilen; ++i) {
            datasetIndex = +keys[i];
            if (datasetIndex === dsIndex) {
              if (options.all) {
                continue;
              }
              break;
            }
            otherValue = stack.values[datasetIndex];
            if (isNumberFinite(otherValue) && (singleMode || (value === 0 || sign(value) === sign(otherValue)))) {
              value += otherValue;
            }
          }
          return value;
        }
        function convertObjectDataToArray(data) {
          const keys = Object.keys(data);
          const adata = new Array(keys.length);
          let i, ilen, key;
          for (i = 0, ilen = keys.length; i < ilen; ++i) {
            key = keys[i];
            adata[i] = {
              x: key,
              y: data[key]
            };
          }
          return adata;
        }
        function isStacked(scale, meta) {
          const stacked = scale && scale.options.stacked;
          return stacked || stacked === void 0 && meta.stack !== void 0;
        }
        function getStackKey(indexScale, valueScale, meta) {
          return `${indexScale.id}.${valueScale.id}.${meta.stack || meta.type}`;
        }
        function getUserBounds(scale) {
          const { min, max, minDefined, maxDefined } = scale.getUserBounds();
          return {
            min: minDefined ? min : Number.NEGATIVE_INFINITY,
            max: maxDefined ? max : Number.POSITIVE_INFINITY
          };
        }
        function getOrCreateStack(stacks, stackKey, indexValue) {
          const subStack = stacks[stackKey] || (stacks[stackKey] = {});
          return subStack[indexValue] || (subStack[indexValue] = {});
        }
        function getLastIndexInStack(stack, vScale, positive, type) {
          for (const meta of vScale.getMatchingVisibleMetas(type).reverse()) {
            const value = stack[meta.index];
            if (positive && value > 0 || !positive && value < 0) {
              return meta.index;
            }
          }
          return null;
        }
        function updateStacks(controller, parsed) {
          const { chart, _cachedMeta: meta } = controller;
          const stacks = chart._stacks || (chart._stacks = {});
          const { iScale, vScale, index: datasetIndex } = meta;
          const iAxis = iScale.axis;
          const vAxis = vScale.axis;
          const key = getStackKey(iScale, vScale, meta);
          const ilen = parsed.length;
          let stack;
          for (let i = 0; i < ilen; ++i) {
            const item = parsed[i];
            const { [iAxis]: index3, [vAxis]: value } = item;
            const itemStacks = item._stacks || (item._stacks = {});
            stack = itemStacks[vAxis] = getOrCreateStack(stacks, key, index3);
            stack[datasetIndex] = value;
            stack._top = getLastIndexInStack(stack, vScale, true, meta.type);
            stack._bottom = getLastIndexInStack(stack, vScale, false, meta.type);
          }
        }
        function getFirstScaleId(chart, axis) {
          const scales2 = chart.scales;
          return Object.keys(scales2).filter((key) => scales2[key].axis === axis).shift();
        }
        function createDatasetContext(parent, index3) {
          return createContext(
            parent,
            {
              active: false,
              dataset: void 0,
              datasetIndex: index3,
              index: index3,
              mode: "default",
              type: "dataset"
            }
          );
        }
        function createDataContext(parent, index3, element) {
          return createContext(parent, {
            active: false,
            dataIndex: index3,
            parsed: void 0,
            raw: void 0,
            element,
            index: index3,
            mode: "default",
            type: "data"
          });
        }
        function clearStacks(meta, items) {
          const datasetIndex = meta.controller.index;
          const axis = meta.vScale && meta.vScale.axis;
          if (!axis) {
            return;
          }
          items = items || meta._parsed;
          for (const parsed of items) {
            const stacks = parsed._stacks;
            if (!stacks || stacks[axis] === void 0 || stacks[axis][datasetIndex] === void 0) {
              return;
            }
            delete stacks[axis][datasetIndex];
          }
        }
        const isDirectUpdateMode = (mode) => mode === "reset" || mode === "none";
        const cloneIfNotShared = (cached2, shared) => shared ? cached2 : Object.assign({}, cached2);
        const createStack = (canStack, meta, chart) => canStack && !meta.hidden && meta._stacked && { keys: getSortedDatasetIndices(chart, true), values: null };
        class DatasetController {
          constructor(chart, datasetIndex) {
            this.chart = chart;
            this._ctx = chart.ctx;
            this.index = datasetIndex;
            this._cachedDataOpts = {};
            this._cachedMeta = this.getMeta();
            this._type = this._cachedMeta.type;
            this.options = void 0;
            this._parsing = false;
            this._data = void 0;
            this._objectData = void 0;
            this._sharedOptions = void 0;
            this._drawStart = void 0;
            this._drawCount = void 0;
            this.enableOptionSharing = false;
            this.supportsDecimation = false;
            this.$context = void 0;
            this._syncList = [];
            this.initialize();
          }
          initialize() {
            const meta = this._cachedMeta;
            this.configure();
            this.linkScales();
            meta._stacked = isStacked(meta.vScale, meta);
            this.addElements();
          }
          updateIndex(datasetIndex) {
            if (this.index !== datasetIndex) {
              clearStacks(this._cachedMeta);
            }
            this.index = datasetIndex;
          }
          linkScales() {
            const chart = this.chart;
            const meta = this._cachedMeta;
            const dataset = this.getDataset();
            const chooseId = (axis, x, y, r) => axis === "x" ? x : axis === "r" ? r : y;
            const xid = meta.xAxisID = valueOrDefault(dataset.xAxisID, getFirstScaleId(chart, "x"));
            const yid = meta.yAxisID = valueOrDefault(dataset.yAxisID, getFirstScaleId(chart, "y"));
            const rid = meta.rAxisID = valueOrDefault(dataset.rAxisID, getFirstScaleId(chart, "r"));
            const indexAxis = meta.indexAxis;
            const iid = meta.iAxisID = chooseId(indexAxis, xid, yid, rid);
            const vid = meta.vAxisID = chooseId(indexAxis, yid, xid, rid);
            meta.xScale = this.getScaleForId(xid);
            meta.yScale = this.getScaleForId(yid);
            meta.rScale = this.getScaleForId(rid);
            meta.iScale = this.getScaleForId(iid);
            meta.vScale = this.getScaleForId(vid);
          }
          getDataset() {
            return this.chart.data.datasets[this.index];
          }
          getMeta() {
            return this.chart.getDatasetMeta(this.index);
          }
          getScaleForId(scaleID) {
            return this.chart.scales[scaleID];
          }
          _getOtherScale(scale) {
            const meta = this._cachedMeta;
            return scale === meta.iScale ? meta.vScale : meta.iScale;
          }
          reset() {
            this._update("reset");
          }
          _destroy() {
            const meta = this._cachedMeta;
            if (this._data) {
              unlistenArrayEvents(this._data, this);
            }
            if (meta._stacked) {
              clearStacks(meta);
            }
          }
          _dataCheck() {
            const dataset = this.getDataset();
            const data = dataset.data || (dataset.data = []);
            const _data = this._data;
            if (isObject2(data)) {
              this._data = convertObjectDataToArray(data);
            } else if (_data !== data) {
              if (_data) {
                unlistenArrayEvents(_data, this);
                const meta = this._cachedMeta;
                clearStacks(meta);
                meta._parsed = [];
              }
              if (data && Object.isExtensible(data)) {
                listenArrayEvents(data, this);
              }
              this._syncList = [];
              this._data = data;
            }
          }
          addElements() {
            const meta = this._cachedMeta;
            this._dataCheck();
            if (this.datasetElementType) {
              meta.dataset = new this.datasetElementType();
            }
          }
          buildOrUpdateElements(resetNewElements) {
            const meta = this._cachedMeta;
            const dataset = this.getDataset();
            let stackChanged = false;
            this._dataCheck();
            const oldStacked = meta._stacked;
            meta._stacked = isStacked(meta.vScale, meta);
            if (meta.stack !== dataset.stack) {
              stackChanged = true;
              clearStacks(meta);
              meta.stack = dataset.stack;
            }
            this._resyncElements(resetNewElements);
            if (stackChanged || oldStacked !== meta._stacked) {
              updateStacks(this, meta._parsed);
            }
          }
          configure() {
            const config2 = this.chart.config;
            const scopeKeys = config2.datasetScopeKeys(this._type);
            const scopes = config2.getOptionScopes(this.getDataset(), scopeKeys, true);
            this.options = config2.createResolver(scopes, this.getContext());
            this._parsing = this.options.parsing;
            this._cachedDataOpts = {};
          }
          parse(start, count) {
            const { _cachedMeta: meta, _data: data } = this;
            const { iScale, _stacked } = meta;
            const iAxis = iScale.axis;
            let sorted = start === 0 && count === data.length ? true : meta._sorted;
            let prev = start > 0 && meta._parsed[start - 1];
            let i, cur, parsed;
            if (this._parsing === false) {
              meta._parsed = data;
              meta._sorted = true;
              parsed = data;
            } else {
              if (isArray2(data[start])) {
                parsed = this.parseArrayData(meta, data, start, count);
              } else if (isObject2(data[start])) {
                parsed = this.parseObjectData(meta, data, start, count);
              } else {
                parsed = this.parsePrimitiveData(meta, data, start, count);
              }
              const isNotInOrderComparedToPrev = () => cur[iAxis] === null || prev && cur[iAxis] < prev[iAxis];
              for (i = 0; i < count; ++i) {
                meta._parsed[i + start] = cur = parsed[i];
                if (sorted) {
                  if (isNotInOrderComparedToPrev()) {
                    sorted = false;
                  }
                  prev = cur;
                }
              }
              meta._sorted = sorted;
            }
            if (_stacked) {
              updateStacks(this, parsed);
            }
          }
          parsePrimitiveData(meta, data, start, count) {
            const { iScale, vScale } = meta;
            const iAxis = iScale.axis;
            const vAxis = vScale.axis;
            const labels = iScale.getLabels();
            const singleScale = iScale === vScale;
            const parsed = new Array(count);
            let i, ilen, index3;
            for (i = 0, ilen = count; i < ilen; ++i) {
              index3 = i + start;
              parsed[i] = {
                [iAxis]: singleScale || iScale.parse(labels[index3], index3),
                [vAxis]: vScale.parse(data[index3], index3)
              };
            }
            return parsed;
          }
          parseArrayData(meta, data, start, count) {
            const { xScale, yScale } = meta;
            const parsed = new Array(count);
            let i, ilen, index3, item;
            for (i = 0, ilen = count; i < ilen; ++i) {
              index3 = i + start;
              item = data[index3];
              parsed[i] = {
                x: xScale.parse(item[0], index3),
                y: yScale.parse(item[1], index3)
              };
            }
            return parsed;
          }
          parseObjectData(meta, data, start, count) {
            const { xScale, yScale } = meta;
            const { xAxisKey = "x", yAxisKey = "y" } = this._parsing;
            const parsed = new Array(count);
            let i, ilen, index3, item;
            for (i = 0, ilen = count; i < ilen; ++i) {
              index3 = i + start;
              item = data[index3];
              parsed[i] = {
                x: xScale.parse(resolveObjectKey(item, xAxisKey), index3),
                y: yScale.parse(resolveObjectKey(item, yAxisKey), index3)
              };
            }
            return parsed;
          }
          getParsed(index3) {
            return this._cachedMeta._parsed[index3];
          }
          getDataElement(index3) {
            return this._cachedMeta.data[index3];
          }
          applyStack(scale, parsed, mode) {
            const chart = this.chart;
            const meta = this._cachedMeta;
            const value = parsed[scale.axis];
            const stack = {
              keys: getSortedDatasetIndices(chart, true),
              values: parsed._stacks[scale.axis]
            };
            return applyStack(stack, value, meta.index, { mode });
          }
          updateRangeFromParsed(range2, scale, parsed, stack) {
            const parsedValue = parsed[scale.axis];
            let value = parsedValue === null ? NaN : parsedValue;
            const values = stack && parsed._stacks[scale.axis];
            if (stack && values) {
              stack.values = values;
              value = applyStack(stack, parsedValue, this._cachedMeta.index);
            }
            range2.min = Math.min(range2.min, value);
            range2.max = Math.max(range2.max, value);
          }
          getMinMax(scale, canStack) {
            const meta = this._cachedMeta;
            const _parsed = meta._parsed;
            const sorted = meta._sorted && scale === meta.iScale;
            const ilen = _parsed.length;
            const otherScale = this._getOtherScale(scale);
            const stack = createStack(canStack, meta, this.chart);
            const range2 = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY };
            const { min: otherMin, max: otherMax } = getUserBounds(otherScale);
            let i, parsed;
            function _skip() {
              parsed = _parsed[i];
              const otherValue = parsed[otherScale.axis];
              return !isNumberFinite(parsed[scale.axis]) || otherMin > otherValue || otherMax < otherValue;
            }
            for (i = 0; i < ilen; ++i) {
              if (_skip()) {
                continue;
              }
              this.updateRangeFromParsed(range2, scale, parsed, stack);
              if (sorted) {
                break;
              }
            }
            if (sorted) {
              for (i = ilen - 1; i >= 0; --i) {
                if (_skip()) {
                  continue;
                }
                this.updateRangeFromParsed(range2, scale, parsed, stack);
                break;
              }
            }
            return range2;
          }
          getAllParsedValues(scale) {
            const parsed = this._cachedMeta._parsed;
            const values = [];
            let i, ilen, value;
            for (i = 0, ilen = parsed.length; i < ilen; ++i) {
              value = parsed[i][scale.axis];
              if (isNumberFinite(value)) {
                values.push(value);
              }
            }
            return values;
          }
          getMaxOverflow() {
            return false;
          }
          getLabelAndValue(index3) {
            const meta = this._cachedMeta;
            const iScale = meta.iScale;
            const vScale = meta.vScale;
            const parsed = this.getParsed(index3);
            return {
              label: iScale ? "" + iScale.getLabelForValue(parsed[iScale.axis]) : "",
              value: vScale ? "" + vScale.getLabelForValue(parsed[vScale.axis]) : ""
            };
          }
          _update(mode) {
            const meta = this._cachedMeta;
            this.update(mode || "default");
            meta._clip = toClip(valueOrDefault(this.options.clip, defaultClip(meta.xScale, meta.yScale, this.getMaxOverflow())));
          }
          update(mode) {
          }
          draw() {
            const ctx = this._ctx;
            const chart = this.chart;
            const meta = this._cachedMeta;
            const elements2 = meta.data || [];
            const area = chart.chartArea;
            const active = [];
            const start = this._drawStart || 0;
            const count = this._drawCount || elements2.length - start;
            const drawActiveElementsOnTop = this.options.drawActiveElementsOnTop;
            let i;
            if (meta.dataset) {
              meta.dataset.draw(ctx, area, start, count);
            }
            for (i = start; i < start + count; ++i) {
              const element = elements2[i];
              if (element.hidden) {
                continue;
              }
              if (element.active && drawActiveElementsOnTop) {
                active.push(element);
              } else {
                element.draw(ctx, area);
              }
            }
            for (i = 0; i < active.length; ++i) {
              active[i].draw(ctx, area);
            }
          }
          getStyle(index3, active) {
            const mode = active ? "active" : "default";
            return index3 === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(mode) : this.resolveDataElementOptions(index3 || 0, mode);
          }
          getContext(index3, active, mode) {
            const dataset = this.getDataset();
            let context;
            if (index3 >= 0 && index3 < this._cachedMeta.data.length) {
              const element = this._cachedMeta.data[index3];
              context = element.$context || (element.$context = createDataContext(this.getContext(), index3, element));
              context.parsed = this.getParsed(index3);
              context.raw = dataset.data[index3];
              context.index = context.dataIndex = index3;
            } else {
              context = this.$context || (this.$context = createDatasetContext(this.chart.getContext(), this.index));
              context.dataset = dataset;
              context.index = context.datasetIndex = this.index;
            }
            context.active = !!active;
            context.mode = mode;
            return context;
          }
          resolveDatasetElementOptions(mode) {
            return this._resolveElementOptions(this.datasetElementType.id, mode);
          }
          resolveDataElementOptions(index3, mode) {
            return this._resolveElementOptions(this.dataElementType.id, mode, index3);
          }
          _resolveElementOptions(elementType, mode = "default", index3) {
            const active = mode === "active";
            const cache = this._cachedDataOpts;
            const cacheKey = elementType + "-" + mode;
            const cached2 = cache[cacheKey];
            const sharing = this.enableOptionSharing && defined(index3);
            if (cached2) {
              return cloneIfNotShared(cached2, sharing);
            }
            const config2 = this.chart.config;
            const scopeKeys = config2.datasetElementScopeKeys(this._type, elementType);
            const prefixes = active ? [`${elementType}Hover`, "hover", elementType, ""] : [elementType, ""];
            const scopes = config2.getOptionScopes(this.getDataset(), scopeKeys);
            const names2 = Object.keys(defaults.elements[elementType]);
            const context = () => this.getContext(index3, active);
            const values = config2.resolveNamedOptions(scopes, names2, context, prefixes);
            if (values.$shared) {
              values.$shared = sharing;
              cache[cacheKey] = Object.freeze(cloneIfNotShared(values, sharing));
            }
            return values;
          }
          _resolveAnimations(index3, transition2, active) {
            const chart = this.chart;
            const cache = this._cachedDataOpts;
            const cacheKey = `animation-${transition2}`;
            const cached2 = cache[cacheKey];
            if (cached2) {
              return cached2;
            }
            let options;
            if (chart.options.animation !== false) {
              const config2 = this.chart.config;
              const scopeKeys = config2.datasetAnimationScopeKeys(this._type, transition2);
              const scopes = config2.getOptionScopes(this.getDataset(), scopeKeys);
              options = config2.createResolver(scopes, this.getContext(index3, active, transition2));
            }
            const animations = new Animations(chart, options && options.animations);
            if (options && options._cacheable) {
              cache[cacheKey] = Object.freeze(animations);
            }
            return animations;
          }
          getSharedOptions(options) {
            if (!options.$shared) {
              return;
            }
            return this._sharedOptions || (this._sharedOptions = Object.assign({}, options));
          }
          includeOptions(mode, sharedOptions) {
            return !sharedOptions || isDirectUpdateMode(mode) || this.chart._animationsDisabled;
          }
          _getSharedOptions(start, mode) {
            const firstOpts = this.resolveDataElementOptions(start, mode);
            const previouslySharedOptions = this._sharedOptions;
            const sharedOptions = this.getSharedOptions(firstOpts);
            const includeOptions = this.includeOptions(mode, sharedOptions) || sharedOptions !== previouslySharedOptions;
            this.updateSharedOptions(sharedOptions, mode, firstOpts);
            return { sharedOptions, includeOptions };
          }
          updateElement(element, index3, properties, mode) {
            if (isDirectUpdateMode(mode)) {
              Object.assign(element, properties);
            } else {
              this._resolveAnimations(index3, mode).update(element, properties);
            }
          }
          updateSharedOptions(sharedOptions, mode, newOptions) {
            if (sharedOptions && !isDirectUpdateMode(mode)) {
              this._resolveAnimations(void 0, mode).update(sharedOptions, newOptions);
            }
          }
          _setStyle(element, index3, mode, active) {
            element.active = active;
            const options = this.getStyle(index3, active);
            this._resolveAnimations(index3, mode, active).update(element, {
              options: !active && this.getSharedOptions(options) || options
            });
          }
          removeHoverStyle(element, datasetIndex, index3) {
            this._setStyle(element, index3, "active", false);
          }
          setHoverStyle(element, datasetIndex, index3) {
            this._setStyle(element, index3, "active", true);
          }
          _removeDatasetHoverStyle() {
            const element = this._cachedMeta.dataset;
            if (element) {
              this._setStyle(element, void 0, "active", false);
            }
          }
          _setDatasetHoverStyle() {
            const element = this._cachedMeta.dataset;
            if (element) {
              this._setStyle(element, void 0, "active", true);
            }
          }
          _resyncElements(resetNewElements) {
            const data = this._data;
            const elements2 = this._cachedMeta.data;
            for (const [method, arg1, arg2] of this._syncList) {
              this[method](arg1, arg2);
            }
            this._syncList = [];
            const numMeta = elements2.length;
            const numData = data.length;
            const count = Math.min(numData, numMeta);
            if (count) {
              this.parse(0, count);
            }
            if (numData > numMeta) {
              this._insertElements(numMeta, numData - numMeta, resetNewElements);
            } else if (numData < numMeta) {
              this._removeElements(numData, numMeta - numData);
            }
          }
          _insertElements(start, count, resetNewElements = true) {
            const meta = this._cachedMeta;
            const data = meta.data;
            const end = start + count;
            let i;
            const move = (arr) => {
              arr.length += count;
              for (i = arr.length - 1; i >= end; i--) {
                arr[i] = arr[i - count];
              }
            };
            move(data);
            for (i = start; i < end; ++i) {
              data[i] = new this.dataElementType();
            }
            if (this._parsing) {
              move(meta._parsed);
            }
            this.parse(start, count);
            if (resetNewElements) {
              this.updateElements(data, start, count, "reset");
            }
          }
          updateElements(element, start, count, mode) {
          }
          _removeElements(start, count) {
            const meta = this._cachedMeta;
            if (this._parsing) {
              const removed = meta._parsed.splice(start, count);
              if (meta._stacked) {
                clearStacks(meta, removed);
              }
            }
            meta.data.splice(start, count);
          }
          _sync(args) {
            if (this._parsing) {
              this._syncList.push(args);
            } else {
              const [method, arg1, arg2] = args;
              this[method](arg1, arg2);
            }
            this.chart._dataChanges.push([this.index, ...args]);
          }
          _onDataPush() {
            const count = arguments.length;
            this._sync(["_insertElements", this.getDataset().data.length - count, count]);
          }
          _onDataPop() {
            this._sync(["_removeElements", this._cachedMeta.data.length - 1, 1]);
          }
          _onDataShift() {
            this._sync(["_removeElements", 0, 1]);
          }
          _onDataSplice(start, count) {
            if (count) {
              this._sync(["_removeElements", start, count]);
            }
            const newCount = arguments.length - 2;
            if (newCount) {
              this._sync(["_insertElements", start, newCount]);
            }
          }
          _onDataUnshift() {
            this._sync(["_insertElements", 0, arguments.length]);
          }
        }
        DatasetController.defaults = {};
        DatasetController.prototype.datasetElementType = null;
        DatasetController.prototype.dataElementType = null;
        class Element {
          constructor() {
            this.x = void 0;
            this.y = void 0;
            this.active = false;
            this.options = void 0;
            this.$animations = void 0;
          }
          tooltipPosition(useFinalPosition) {
            const { x, y } = this.getProps(["x", "y"], useFinalPosition);
            return { x, y };
          }
          hasValue() {
            return isNumber(this.x) && isNumber(this.y);
          }
          getProps(props2, final) {
            const anims = this.$animations;
            if (!final || !anims) {
              return this;
            }
            const ret = {};
            props2.forEach((prop) => {
              ret[prop] = anims[prop] && anims[prop].active() ? anims[prop]._to : this[prop];
            });
            return ret;
          }
        }
        Element.defaults = {};
        Element.defaultRoutes = void 0;
        const formatters = {
          values(value) {
            return isArray2(value) ? value : "" + value;
          },
          numeric(tickValue, index3, ticks) {
            if (tickValue === 0) {
              return "0";
            }
            const locale = this.chart.options.locale;
            let notation;
            let delta = tickValue;
            if (ticks.length > 1) {
              const maxTick = Math.max(Math.abs(ticks[0].value), Math.abs(ticks[ticks.length - 1].value));
              if (maxTick < 1e-4 || maxTick > 1e15) {
                notation = "scientific";
              }
              delta = calculateDelta(tickValue, ticks);
            }
            const logDelta = log10(Math.abs(delta));
            const numDecimal = Math.max(Math.min(-1 * Math.floor(logDelta), 20), 0);
            const options = { notation, minimumFractionDigits: numDecimal, maximumFractionDigits: numDecimal };
            Object.assign(options, this.options.ticks.format);
            return formatNumber(tickValue, locale, options);
          },
          logarithmic(tickValue, index3, ticks) {
            if (tickValue === 0) {
              return "0";
            }
            const remain = tickValue / Math.pow(10, Math.floor(log10(tickValue)));
            if (remain === 1 || remain === 2 || remain === 5) {
              return formatters.numeric.call(this, tickValue, index3, ticks);
            }
            return "";
          }
        };
        function calculateDelta(tickValue, ticks) {
          let delta = ticks.length > 3 ? ticks[2].value - ticks[1].value : ticks[1].value - ticks[0].value;
          if (Math.abs(delta) >= 1 && tickValue !== Math.floor(tickValue)) {
            delta = tickValue - Math.floor(tickValue);
          }
          return delta;
        }
        var Ticks = { formatters };
        defaults.set("scale", {
          display: true,
          offset: false,
          reverse: false,
          beginAtZero: false,
          bounds: "ticks",
          grace: 0,
          grid: {
            display: true,
            lineWidth: 1,
            drawBorder: true,
            drawOnChartArea: true,
            drawTicks: true,
            tickLength: 8,
            tickWidth: (_ctx, options) => options.lineWidth,
            tickColor: (_ctx, options) => options.color,
            offset: false,
            borderDash: [],
            borderDashOffset: 0,
            borderWidth: 1
          },
          title: {
            display: false,
            text: "",
            padding: {
              top: 4,
              bottom: 4
            }
          },
          ticks: {
            minRotation: 0,
            maxRotation: 50,
            mirror: false,
            textStrokeWidth: 0,
            textStrokeColor: "",
            padding: 3,
            display: true,
            autoSkip: true,
            autoSkipPadding: 3,
            labelOffset: 0,
            callback: Ticks.formatters.values,
            minor: {},
            major: {},
            align: "center",
            crossAlign: "near",
            showLabelBackdrop: false,
            backdropColor: "rgba(255, 255, 255, 0.75)",
            backdropPadding: 2
          }
        });
        defaults.route("scale.ticks", "color", "", "color");
        defaults.route("scale.grid", "color", "", "borderColor");
        defaults.route("scale.grid", "borderColor", "", "borderColor");
        defaults.route("scale.title", "color", "", "color");
        defaults.describe("scale", {
          _fallback: false,
          _scriptable: (name) => !name.startsWith("before") && !name.startsWith("after") && name !== "callback" && name !== "parser",
          _indexable: (name) => name !== "borderDash" && name !== "tickBorderDash"
        });
        defaults.describe("scales", {
          _fallback: "scale"
        });
        defaults.describe("scale.ticks", {
          _scriptable: (name) => name !== "backdropPadding" && name !== "callback",
          _indexable: (name) => name !== "backdropPadding"
        });
        function autoSkip(scale, ticks) {
          const tickOpts = scale.options.ticks;
          const ticksLimit = tickOpts.maxTicksLimit || determineMaxTicks(scale);
          const majorIndices = tickOpts.major.enabled ? getMajorIndices(ticks) : [];
          const numMajorIndices = majorIndices.length;
          const first = majorIndices[0];
          const last = majorIndices[numMajorIndices - 1];
          const newTicks = [];
          if (numMajorIndices > ticksLimit) {
            skipMajors(ticks, newTicks, majorIndices, numMajorIndices / ticksLimit);
            return newTicks;
          }
          const spacing = calculateSpacing(majorIndices, ticks, ticksLimit);
          if (numMajorIndices > 0) {
            let i, ilen;
            const avgMajorSpacing = numMajorIndices > 1 ? Math.round((last - first) / (numMajorIndices - 1)) : null;
            skip(ticks, newTicks, spacing, isNullOrUndef(avgMajorSpacing) ? 0 : first - avgMajorSpacing, first);
            for (i = 0, ilen = numMajorIndices - 1; i < ilen; i++) {
              skip(ticks, newTicks, spacing, majorIndices[i], majorIndices[i + 1]);
            }
            skip(ticks, newTicks, spacing, last, isNullOrUndef(avgMajorSpacing) ? ticks.length : last + avgMajorSpacing);
            return newTicks;
          }
          skip(ticks, newTicks, spacing);
          return newTicks;
        }
        function determineMaxTicks(scale) {
          const offset = scale.options.offset;
          const tickLength = scale._tickSize();
          const maxScale = scale._length / tickLength + (offset ? 0 : 1);
          const maxChart = scale._maxLength / tickLength;
          return Math.floor(Math.min(maxScale, maxChart));
        }
        function calculateSpacing(majorIndices, ticks, ticksLimit) {
          const evenMajorSpacing = getEvenSpacing(majorIndices);
          const spacing = ticks.length / ticksLimit;
          if (!evenMajorSpacing) {
            return Math.max(spacing, 1);
          }
          const factors = _factorize(evenMajorSpacing);
          for (let i = 0, ilen = factors.length - 1; i < ilen; i++) {
            const factor = factors[i];
            if (factor > spacing) {
              return factor;
            }
          }
          return Math.max(spacing, 1);
        }
        function getMajorIndices(ticks) {
          const result = [];
          let i, ilen;
          for (i = 0, ilen = ticks.length; i < ilen; i++) {
            if (ticks[i].major) {
              result.push(i);
            }
          }
          return result;
        }
        function skipMajors(ticks, newTicks, majorIndices, spacing) {
          let count = 0;
          let next2 = majorIndices[0];
          let i;
          spacing = Math.ceil(spacing);
          for (i = 0; i < ticks.length; i++) {
            if (i === next2) {
              newTicks.push(ticks[i]);
              count++;
              next2 = majorIndices[count * spacing];
            }
          }
        }
        function skip(ticks, newTicks, spacing, majorStart, majorEnd) {
          const start = valueOrDefault(majorStart, 0);
          const end = Math.min(valueOrDefault(majorEnd, ticks.length), ticks.length);
          let count = 0;
          let length, i, next2;
          spacing = Math.ceil(spacing);
          if (majorEnd) {
            length = majorEnd - majorStart;
            spacing = length / Math.floor(length / spacing);
          }
          next2 = start;
          while (next2 < 0) {
            count++;
            next2 = Math.round(start + count * spacing);
          }
          for (i = Math.max(start, 0); i < end; i++) {
            if (i === next2) {
              newTicks.push(ticks[i]);
              count++;
              next2 = Math.round(start + count * spacing);
            }
          }
        }
        function getEvenSpacing(arr) {
          const len2 = arr.length;
          let i, diff;
          if (len2 < 2) {
            return false;
          }
          for (diff = arr[0], i = 1; i < len2; ++i) {
            if (arr[i] - arr[i - 1] !== diff) {
              return false;
            }
          }
          return diff;
        }
        const reverseAlign = (align) => align === "left" ? "right" : align === "right" ? "left" : align;
        const offsetFromEdge = (scale, edge, offset) => edge === "top" || edge === "left" ? scale[edge] + offset : scale[edge] - offset;
        function sample(arr, numItems) {
          const result = [];
          const increment = arr.length / numItems;
          const len2 = arr.length;
          let i = 0;
          for (; i < len2; i += increment) {
            result.push(arr[Math.floor(i)]);
          }
          return result;
        }
        function getPixelForGridLine(scale, index3, offsetGridLines) {
          const length = scale.ticks.length;
          const validIndex2 = Math.min(index3, length - 1);
          const start = scale._startPixel;
          const end = scale._endPixel;
          const epsilon = 1e-6;
          let lineValue = scale.getPixelForTick(validIndex2);
          let offset;
          if (offsetGridLines) {
            if (length === 1) {
              offset = Math.max(lineValue - start, end - lineValue);
            } else if (index3 === 0) {
              offset = (scale.getPixelForTick(1) - lineValue) / 2;
            } else {
              offset = (lineValue - scale.getPixelForTick(validIndex2 - 1)) / 2;
            }
            lineValue += validIndex2 < index3 ? offset : -offset;
            if (lineValue < start - epsilon || lineValue > end + epsilon) {
              return;
            }
          }
          return lineValue;
        }
        function garbageCollect(caches, length) {
          each(caches, (cache) => {
            const gc = cache.gc;
            const gcLen = gc.length / 2;
            let i;
            if (gcLen > length) {
              for (i = 0; i < gcLen; ++i) {
                delete cache.data[gc[i]];
              }
              gc.splice(0, gcLen);
            }
          });
        }
        function getTickMarkLength(options) {
          return options.drawTicks ? options.tickLength : 0;
        }
        function getTitleHeight(options, fallback) {
          if (!options.display) {
            return 0;
          }
          const font = toFont(options.font, fallback);
          const padding = toPadding(options.padding);
          const lines = isArray2(options.text) ? options.text.length : 1;
          return lines * font.lineHeight + padding.height;
        }
        function createScaleContext(parent, scale) {
          return createContext(parent, {
            scale,
            type: "scale"
          });
        }
        function createTickContext(parent, index3, tick) {
          return createContext(parent, {
            tick,
            index: index3,
            type: "tick"
          });
        }
        function titleAlign(align, position, reverse) {
          let ret = _toLeftRightCenter(align);
          if (reverse && position !== "right" || !reverse && position === "right") {
            ret = reverseAlign(ret);
          }
          return ret;
        }
        function titleArgs(scale, offset, position, align) {
          const { top, left, bottom, right, chart } = scale;
          const { chartArea, scales: scales2 } = chart;
          let rotation = 0;
          let maxWidth, titleX, titleY;
          const height = bottom - top;
          const width = right - left;
          if (scale.isHorizontal()) {
            titleX = _alignStartEnd(align, left, right);
            if (isObject2(position)) {
              const positionAxisID = Object.keys(position)[0];
              const value = position[positionAxisID];
              titleY = scales2[positionAxisID].getPixelForValue(value) + height - offset;
            } else if (position === "center") {
              titleY = (chartArea.bottom + chartArea.top) / 2 + height - offset;
            } else {
              titleY = offsetFromEdge(scale, position, offset);
            }
            maxWidth = right - left;
          } else {
            if (isObject2(position)) {
              const positionAxisID = Object.keys(position)[0];
              const value = position[positionAxisID];
              titleX = scales2[positionAxisID].getPixelForValue(value) - width + offset;
            } else if (position === "center") {
              titleX = (chartArea.left + chartArea.right) / 2 - width + offset;
            } else {
              titleX = offsetFromEdge(scale, position, offset);
            }
            titleY = _alignStartEnd(align, bottom, top);
            rotation = position === "left" ? -HALF_PI : HALF_PI;
          }
          return { titleX, titleY, maxWidth, rotation };
        }
        class Scale extends Element {
          constructor(cfg) {
            super();
            this.id = cfg.id;
            this.type = cfg.type;
            this.options = void 0;
            this.ctx = cfg.ctx;
            this.chart = cfg.chart;
            this.top = void 0;
            this.bottom = void 0;
            this.left = void 0;
            this.right = void 0;
            this.width = void 0;
            this.height = void 0;
            this._margins = {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            };
            this.maxWidth = void 0;
            this.maxHeight = void 0;
            this.paddingTop = void 0;
            this.paddingBottom = void 0;
            this.paddingLeft = void 0;
            this.paddingRight = void 0;
            this.axis = void 0;
            this.labelRotation = void 0;
            this.min = void 0;
            this.max = void 0;
            this._range = void 0;
            this.ticks = [];
            this._gridLineItems = null;
            this._labelItems = null;
            this._labelSizes = null;
            this._length = 0;
            this._maxLength = 0;
            this._longestTextCache = {};
            this._startPixel = void 0;
            this._endPixel = void 0;
            this._reversePixels = false;
            this._userMax = void 0;
            this._userMin = void 0;
            this._suggestedMax = void 0;
            this._suggestedMin = void 0;
            this._ticksLength = 0;
            this._borderValue = 0;
            this._cache = {};
            this._dataLimitsCached = false;
            this.$context = void 0;
          }
          init(options) {
            this.options = options.setContext(this.getContext());
            this.axis = options.axis;
            this._userMin = this.parse(options.min);
            this._userMax = this.parse(options.max);
            this._suggestedMin = this.parse(options.suggestedMin);
            this._suggestedMax = this.parse(options.suggestedMax);
          }
          parse(raw, index3) {
            return raw;
          }
          getUserBounds() {
            let { _userMin, _userMax, _suggestedMin, _suggestedMax } = this;
            _userMin = finiteOrDefault(_userMin, Number.POSITIVE_INFINITY);
            _userMax = finiteOrDefault(_userMax, Number.NEGATIVE_INFINITY);
            _suggestedMin = finiteOrDefault(_suggestedMin, Number.POSITIVE_INFINITY);
            _suggestedMax = finiteOrDefault(_suggestedMax, Number.NEGATIVE_INFINITY);
            return {
              min: finiteOrDefault(_userMin, _suggestedMin),
              max: finiteOrDefault(_userMax, _suggestedMax),
              minDefined: isNumberFinite(_userMin),
              maxDefined: isNumberFinite(_userMax)
            };
          }
          getMinMax(canStack) {
            let { min, max, minDefined, maxDefined } = this.getUserBounds();
            let range2;
            if (minDefined && maxDefined) {
              return { min, max };
            }
            const metas = this.getMatchingVisibleMetas();
            for (let i = 0, ilen = metas.length; i < ilen; ++i) {
              range2 = metas[i].controller.getMinMax(this, canStack);
              if (!minDefined) {
                min = Math.min(min, range2.min);
              }
              if (!maxDefined) {
                max = Math.max(max, range2.max);
              }
            }
            min = maxDefined && min > max ? max : min;
            max = minDefined && min > max ? min : max;
            return {
              min: finiteOrDefault(min, finiteOrDefault(max, min)),
              max: finiteOrDefault(max, finiteOrDefault(min, max))
            };
          }
          getPadding() {
            return {
              left: this.paddingLeft || 0,
              top: this.paddingTop || 0,
              right: this.paddingRight || 0,
              bottom: this.paddingBottom || 0
            };
          }
          getTicks() {
            return this.ticks;
          }
          getLabels() {
            const data = this.chart.data;
            return this.options.labels || (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels || [];
          }
          beforeLayout() {
            this._cache = {};
            this._dataLimitsCached = false;
          }
          beforeUpdate() {
            callback(this.options.beforeUpdate, [this]);
          }
          update(maxWidth, maxHeight, margins) {
            const { beginAtZero, grace, ticks: tickOpts } = this.options;
            const sampleSize = tickOpts.sampleSize;
            this.beforeUpdate();
            this.maxWidth = maxWidth;
            this.maxHeight = maxHeight;
            this._margins = margins = Object.assign({
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }, margins);
            this.ticks = null;
            this._labelSizes = null;
            this._gridLineItems = null;
            this._labelItems = null;
            this.beforeSetDimensions();
            this.setDimensions();
            this.afterSetDimensions();
            this._maxLength = this.isHorizontal() ? this.width + margins.left + margins.right : this.height + margins.top + margins.bottom;
            if (!this._dataLimitsCached) {
              this.beforeDataLimits();
              this.determineDataLimits();
              this.afterDataLimits();
              this._range = _addGrace(this, grace, beginAtZero);
              this._dataLimitsCached = true;
            }
            this.beforeBuildTicks();
            this.ticks = this.buildTicks() || [];
            this.afterBuildTicks();
            const samplingEnabled = sampleSize < this.ticks.length;
            this._convertTicksToLabels(samplingEnabled ? sample(this.ticks, sampleSize) : this.ticks);
            this.configure();
            this.beforeCalculateLabelRotation();
            this.calculateLabelRotation();
            this.afterCalculateLabelRotation();
            if (tickOpts.display && (tickOpts.autoSkip || tickOpts.source === "auto")) {
              this.ticks = autoSkip(this, this.ticks);
              this._labelSizes = null;
              this.afterAutoSkip();
            }
            if (samplingEnabled) {
              this._convertTicksToLabels(this.ticks);
            }
            this.beforeFit();
            this.fit();
            this.afterFit();
            this.afterUpdate();
          }
          configure() {
            let reversePixels = this.options.reverse;
            let startPixel, endPixel;
            if (this.isHorizontal()) {
              startPixel = this.left;
              endPixel = this.right;
            } else {
              startPixel = this.top;
              endPixel = this.bottom;
              reversePixels = !reversePixels;
            }
            this._startPixel = startPixel;
            this._endPixel = endPixel;
            this._reversePixels = reversePixels;
            this._length = endPixel - startPixel;
            this._alignToPixels = this.options.alignToPixels;
          }
          afterUpdate() {
            callback(this.options.afterUpdate, [this]);
          }
          beforeSetDimensions() {
            callback(this.options.beforeSetDimensions, [this]);
          }
          setDimensions() {
            if (this.isHorizontal()) {
              this.width = this.maxWidth;
              this.left = 0;
              this.right = this.width;
            } else {
              this.height = this.maxHeight;
              this.top = 0;
              this.bottom = this.height;
            }
            this.paddingLeft = 0;
            this.paddingTop = 0;
            this.paddingRight = 0;
            this.paddingBottom = 0;
          }
          afterSetDimensions() {
            callback(this.options.afterSetDimensions, [this]);
          }
          _callHooks(name) {
            this.chart.notifyPlugins(name, this.getContext());
            callback(this.options[name], [this]);
          }
          beforeDataLimits() {
            this._callHooks("beforeDataLimits");
          }
          determineDataLimits() {
          }
          afterDataLimits() {
            this._callHooks("afterDataLimits");
          }
          beforeBuildTicks() {
            this._callHooks("beforeBuildTicks");
          }
          buildTicks() {
            return [];
          }
          afterBuildTicks() {
            this._callHooks("afterBuildTicks");
          }
          beforeTickToLabelConversion() {
            callback(this.options.beforeTickToLabelConversion, [this]);
          }
          generateTickLabels(ticks) {
            const tickOpts = this.options.ticks;
            let i, ilen, tick;
            for (i = 0, ilen = ticks.length; i < ilen; i++) {
              tick = ticks[i];
              tick.label = callback(tickOpts.callback, [tick.value, i, ticks], this);
            }
          }
          afterTickToLabelConversion() {
            callback(this.options.afterTickToLabelConversion, [this]);
          }
          beforeCalculateLabelRotation() {
            callback(this.options.beforeCalculateLabelRotation, [this]);
          }
          calculateLabelRotation() {
            const options = this.options;
            const tickOpts = options.ticks;
            const numTicks = this.ticks.length;
            const minRotation = tickOpts.minRotation || 0;
            const maxRotation = tickOpts.maxRotation;
            let labelRotation = minRotation;
            let tickWidth, maxHeight, maxLabelDiagonal;
            if (!this._isVisible() || !tickOpts.display || minRotation >= maxRotation || numTicks <= 1 || !this.isHorizontal()) {
              this.labelRotation = minRotation;
              return;
            }
            const labelSizes = this._getLabelSizes();
            const maxLabelWidth = labelSizes.widest.width;
            const maxLabelHeight = labelSizes.highest.height;
            const maxWidth = _limitValue(this.chart.width - maxLabelWidth, 0, this.maxWidth);
            tickWidth = options.offset ? this.maxWidth / numTicks : maxWidth / (numTicks - 1);
            if (maxLabelWidth + 6 > tickWidth) {
              tickWidth = maxWidth / (numTicks - (options.offset ? 0.5 : 1));
              maxHeight = this.maxHeight - getTickMarkLength(options.grid) - tickOpts.padding - getTitleHeight(options.title, this.chart.options.font);
              maxLabelDiagonal = Math.sqrt(maxLabelWidth * maxLabelWidth + maxLabelHeight * maxLabelHeight);
              labelRotation = toDegrees(Math.min(
                Math.asin(_limitValue((labelSizes.highest.height + 6) / tickWidth, -1, 1)),
                Math.asin(_limitValue(maxHeight / maxLabelDiagonal, -1, 1)) - Math.asin(_limitValue(maxLabelHeight / maxLabelDiagonal, -1, 1))
              ));
              labelRotation = Math.max(minRotation, Math.min(maxRotation, labelRotation));
            }
            this.labelRotation = labelRotation;
          }
          afterCalculateLabelRotation() {
            callback(this.options.afterCalculateLabelRotation, [this]);
          }
          afterAutoSkip() {
          }
          beforeFit() {
            callback(this.options.beforeFit, [this]);
          }
          fit() {
            const minSize = {
              width: 0,
              height: 0
            };
            const { chart, options: { ticks: tickOpts, title: titleOpts, grid: gridOpts } } = this;
            const display = this._isVisible();
            const isHorizontal = this.isHorizontal();
            if (display) {
              const titleHeight = getTitleHeight(titleOpts, chart.options.font);
              if (isHorizontal) {
                minSize.width = this.maxWidth;
                minSize.height = getTickMarkLength(gridOpts) + titleHeight;
              } else {
                minSize.height = this.maxHeight;
                minSize.width = getTickMarkLength(gridOpts) + titleHeight;
              }
              if (tickOpts.display && this.ticks.length) {
                const { first, last, widest, highest } = this._getLabelSizes();
                const tickPadding = tickOpts.padding * 2;
                const angleRadians = toRadians(this.labelRotation);
                const cos = Math.cos(angleRadians);
                const sin = Math.sin(angleRadians);
                if (isHorizontal) {
                  const labelHeight = tickOpts.mirror ? 0 : sin * widest.width + cos * highest.height;
                  minSize.height = Math.min(this.maxHeight, minSize.height + labelHeight + tickPadding);
                } else {
                  const labelWidth = tickOpts.mirror ? 0 : cos * widest.width + sin * highest.height;
                  minSize.width = Math.min(this.maxWidth, minSize.width + labelWidth + tickPadding);
                }
                this._calculatePadding(first, last, sin, cos);
              }
            }
            this._handleMargins();
            if (isHorizontal) {
              this.width = this._length = chart.width - this._margins.left - this._margins.right;
              this.height = minSize.height;
            } else {
              this.width = minSize.width;
              this.height = this._length = chart.height - this._margins.top - this._margins.bottom;
            }
          }
          _calculatePadding(first, last, sin, cos) {
            const { ticks: { align, padding }, position } = this.options;
            const isRotated = this.labelRotation !== 0;
            const labelsBelowTicks = position !== "top" && this.axis === "x";
            if (this.isHorizontal()) {
              const offsetLeft = this.getPixelForTick(0) - this.left;
              const offsetRight = this.right - this.getPixelForTick(this.ticks.length - 1);
              let paddingLeft = 0;
              let paddingRight = 0;
              if (isRotated) {
                if (labelsBelowTicks) {
                  paddingLeft = cos * first.width;
                  paddingRight = sin * last.height;
                } else {
                  paddingLeft = sin * first.height;
                  paddingRight = cos * last.width;
                }
              } else if (align === "start") {
                paddingRight = last.width;
              } else if (align === "end") {
                paddingLeft = first.width;
              } else if (align !== "inner") {
                paddingLeft = first.width / 2;
                paddingRight = last.width / 2;
              }
              this.paddingLeft = Math.max((paddingLeft - offsetLeft + padding) * this.width / (this.width - offsetLeft), 0);
              this.paddingRight = Math.max((paddingRight - offsetRight + padding) * this.width / (this.width - offsetRight), 0);
            } else {
              let paddingTop = last.height / 2;
              let paddingBottom = first.height / 2;
              if (align === "start") {
                paddingTop = 0;
                paddingBottom = first.height;
              } else if (align === "end") {
                paddingTop = last.height;
                paddingBottom = 0;
              }
              this.paddingTop = paddingTop + padding;
              this.paddingBottom = paddingBottom + padding;
            }
          }
          _handleMargins() {
            if (this._margins) {
              this._margins.left = Math.max(this.paddingLeft, this._margins.left);
              this._margins.top = Math.max(this.paddingTop, this._margins.top);
              this._margins.right = Math.max(this.paddingRight, this._margins.right);
              this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom);
            }
          }
          afterFit() {
            callback(this.options.afterFit, [this]);
          }
          isHorizontal() {
            const { axis, position } = this.options;
            return position === "top" || position === "bottom" || axis === "x";
          }
          isFullSize() {
            return this.options.fullSize;
          }
          _convertTicksToLabels(ticks) {
            this.beforeTickToLabelConversion();
            this.generateTickLabels(ticks);
            let i, ilen;
            for (i = 0, ilen = ticks.length; i < ilen; i++) {
              if (isNullOrUndef(ticks[i].label)) {
                ticks.splice(i, 1);
                ilen--;
                i--;
              }
            }
            this.afterTickToLabelConversion();
          }
          _getLabelSizes() {
            let labelSizes = this._labelSizes;
            if (!labelSizes) {
              const sampleSize = this.options.ticks.sampleSize;
              let ticks = this.ticks;
              if (sampleSize < ticks.length) {
                ticks = sample(ticks, sampleSize);
              }
              this._labelSizes = labelSizes = this._computeLabelSizes(ticks, ticks.length);
            }
            return labelSizes;
          }
          _computeLabelSizes(ticks, length) {
            const { ctx, _longestTextCache: caches } = this;
            const widths = [];
            const heights = [];
            let widestLabelSize = 0;
            let highestLabelSize = 0;
            let i, j, jlen, label, tickFont, fontString2, cache, lineHeight, width, height, nestedLabel;
            for (i = 0; i < length; ++i) {
              label = ticks[i].label;
              tickFont = this._resolveTickFontOptions(i);
              ctx.font = fontString2 = tickFont.string;
              cache = caches[fontString2] = caches[fontString2] || { data: {}, gc: [] };
              lineHeight = tickFont.lineHeight;
              width = height = 0;
              if (!isNullOrUndef(label) && !isArray2(label)) {
                width = _measureText(ctx, cache.data, cache.gc, width, label);
                height = lineHeight;
              } else if (isArray2(label)) {
                for (j = 0, jlen = label.length; j < jlen; ++j) {
                  nestedLabel = label[j];
                  if (!isNullOrUndef(nestedLabel) && !isArray2(nestedLabel)) {
                    width = _measureText(ctx, cache.data, cache.gc, width, nestedLabel);
                    height += lineHeight;
                  }
                }
              }
              widths.push(width);
              heights.push(height);
              widestLabelSize = Math.max(width, widestLabelSize);
              highestLabelSize = Math.max(height, highestLabelSize);
            }
            garbageCollect(caches, length);
            const widest = widths.indexOf(widestLabelSize);
            const highest = heights.indexOf(highestLabelSize);
            const valueAt = (idx) => ({ width: widths[idx] || 0, height: heights[idx] || 0 });
            return {
              first: valueAt(0),
              last: valueAt(length - 1),
              widest: valueAt(widest),
              highest: valueAt(highest),
              widths,
              heights
            };
          }
          getLabelForValue(value) {
            return value;
          }
          getPixelForValue(value, index3) {
            return NaN;
          }
          getValueForPixel(pixel) {
          }
          getPixelForTick(index3) {
            const ticks = this.ticks;
            if (index3 < 0 || index3 > ticks.length - 1) {
              return null;
            }
            return this.getPixelForValue(ticks[index3].value);
          }
          getPixelForDecimal(decimal) {
            if (this._reversePixels) {
              decimal = 1 - decimal;
            }
            const pixel = this._startPixel + decimal * this._length;
            return _int16Range(this._alignToPixels ? _alignPixel(this.chart, pixel, 0) : pixel);
          }
          getDecimalForPixel(pixel) {
            const decimal = (pixel - this._startPixel) / this._length;
            return this._reversePixels ? 1 - decimal : decimal;
          }
          getBasePixel() {
            return this.getPixelForValue(this.getBaseValue());
          }
          getBaseValue() {
            const { min, max } = this;
            return min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0;
          }
          getContext(index3) {
            const ticks = this.ticks || [];
            if (index3 >= 0 && index3 < ticks.length) {
              const tick = ticks[index3];
              return tick.$context || (tick.$context = createTickContext(this.getContext(), index3, tick));
            }
            return this.$context || (this.$context = createScaleContext(this.chart.getContext(), this));
          }
          _tickSize() {
            const optionTicks = this.options.ticks;
            const rot = toRadians(this.labelRotation);
            const cos = Math.abs(Math.cos(rot));
            const sin = Math.abs(Math.sin(rot));
            const labelSizes = this._getLabelSizes();
            const padding = optionTicks.autoSkipPadding || 0;
            const w = labelSizes ? labelSizes.widest.width + padding : 0;
            const h = labelSizes ? labelSizes.highest.height + padding : 0;
            return this.isHorizontal() ? h * cos > w * sin ? w / cos : h / sin : h * sin < w * cos ? h / cos : w / sin;
          }
          _isVisible() {
            const display = this.options.display;
            if (display !== "auto") {
              return !!display;
            }
            return this.getMatchingVisibleMetas().length > 0;
          }
          _computeGridLineItems(chartArea) {
            const axis = this.axis;
            const chart = this.chart;
            const options = this.options;
            const { grid, position } = options;
            const offset = grid.offset;
            const isHorizontal = this.isHorizontal();
            const ticks = this.ticks;
            const ticksLength = ticks.length + (offset ? 1 : 0);
            const tl = getTickMarkLength(grid);
            const items = [];
            const borderOpts = grid.setContext(this.getContext());
            const axisWidth = borderOpts.drawBorder ? borderOpts.borderWidth : 0;
            const axisHalfWidth = axisWidth / 2;
            const alignBorderValue = function(pixel) {
              return _alignPixel(chart, pixel, axisWidth);
            };
            let borderValue, i, lineValue, alignedLineValue;
            let tx1, ty1, tx2, ty2, x1, y1, x2, y2;
            if (position === "top") {
              borderValue = alignBorderValue(this.bottom);
              ty1 = this.bottom - tl;
              ty2 = borderValue - axisHalfWidth;
              y1 = alignBorderValue(chartArea.top) + axisHalfWidth;
              y2 = chartArea.bottom;
            } else if (position === "bottom") {
              borderValue = alignBorderValue(this.top);
              y1 = chartArea.top;
              y2 = alignBorderValue(chartArea.bottom) - axisHalfWidth;
              ty1 = borderValue + axisHalfWidth;
              ty2 = this.top + tl;
            } else if (position === "left") {
              borderValue = alignBorderValue(this.right);
              tx1 = this.right - tl;
              tx2 = borderValue - axisHalfWidth;
              x1 = alignBorderValue(chartArea.left) + axisHalfWidth;
              x2 = chartArea.right;
            } else if (position === "right") {
              borderValue = alignBorderValue(this.left);
              x1 = chartArea.left;
              x2 = alignBorderValue(chartArea.right) - axisHalfWidth;
              tx1 = borderValue + axisHalfWidth;
              tx2 = this.left + tl;
            } else if (axis === "x") {
              if (position === "center") {
                borderValue = alignBorderValue((chartArea.top + chartArea.bottom) / 2 + 0.5);
              } else if (isObject2(position)) {
                const positionAxisID = Object.keys(position)[0];
                const value = position[positionAxisID];
                borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
              }
              y1 = chartArea.top;
              y2 = chartArea.bottom;
              ty1 = borderValue + axisHalfWidth;
              ty2 = ty1 + tl;
            } else if (axis === "y") {
              if (position === "center") {
                borderValue = alignBorderValue((chartArea.left + chartArea.right) / 2);
              } else if (isObject2(position)) {
                const positionAxisID = Object.keys(position)[0];
                const value = position[positionAxisID];
                borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
              }
              tx1 = borderValue - axisHalfWidth;
              tx2 = tx1 - tl;
              x1 = chartArea.left;
              x2 = chartArea.right;
            }
            const limit = valueOrDefault(options.ticks.maxTicksLimit, ticksLength);
            const step = Math.max(1, Math.ceil(ticksLength / limit));
            for (i = 0; i < ticksLength; i += step) {
              const optsAtIndex = grid.setContext(this.getContext(i));
              const lineWidth = optsAtIndex.lineWidth;
              const lineColor = optsAtIndex.color;
              const borderDash = optsAtIndex.borderDash || [];
              const borderDashOffset = optsAtIndex.borderDashOffset;
              const tickWidth = optsAtIndex.tickWidth;
              const tickColor = optsAtIndex.tickColor;
              const tickBorderDash = optsAtIndex.tickBorderDash || [];
              const tickBorderDashOffset = optsAtIndex.tickBorderDashOffset;
              lineValue = getPixelForGridLine(this, i, offset);
              if (lineValue === void 0) {
                continue;
              }
              alignedLineValue = _alignPixel(chart, lineValue, lineWidth);
              if (isHorizontal) {
                tx1 = tx2 = x1 = x2 = alignedLineValue;
              } else {
                ty1 = ty2 = y1 = y2 = alignedLineValue;
              }
              items.push({
                tx1,
                ty1,
                tx2,
                ty2,
                x1,
                y1,
                x2,
                y2,
                width: lineWidth,
                color: lineColor,
                borderDash,
                borderDashOffset,
                tickWidth,
                tickColor,
                tickBorderDash,
                tickBorderDashOffset
              });
            }
            this._ticksLength = ticksLength;
            this._borderValue = borderValue;
            return items;
          }
          _computeLabelItems(chartArea) {
            const axis = this.axis;
            const options = this.options;
            const { position, ticks: optionTicks } = options;
            const isHorizontal = this.isHorizontal();
            const ticks = this.ticks;
            const { align, crossAlign, padding, mirror } = optionTicks;
            const tl = getTickMarkLength(options.grid);
            const tickAndPadding = tl + padding;
            const hTickAndPadding = mirror ? -padding : tickAndPadding;
            const rotation = -toRadians(this.labelRotation);
            const items = [];
            let i, ilen, tick, label, x, y, textAlign, pixel, font, lineHeight, lineCount, textOffset;
            let textBaseline = "middle";
            if (position === "top") {
              y = this.bottom - hTickAndPadding;
              textAlign = this._getXAxisLabelAlignment();
            } else if (position === "bottom") {
              y = this.top + hTickAndPadding;
              textAlign = this._getXAxisLabelAlignment();
            } else if (position === "left") {
              const ret = this._getYAxisLabelAlignment(tl);
              textAlign = ret.textAlign;
              x = ret.x;
            } else if (position === "right") {
              const ret = this._getYAxisLabelAlignment(tl);
              textAlign = ret.textAlign;
              x = ret.x;
            } else if (axis === "x") {
              if (position === "center") {
                y = (chartArea.top + chartArea.bottom) / 2 + tickAndPadding;
              } else if (isObject2(position)) {
                const positionAxisID = Object.keys(position)[0];
                const value = position[positionAxisID];
                y = this.chart.scales[positionAxisID].getPixelForValue(value) + tickAndPadding;
              }
              textAlign = this._getXAxisLabelAlignment();
            } else if (axis === "y") {
              if (position === "center") {
                x = (chartArea.left + chartArea.right) / 2 - tickAndPadding;
              } else if (isObject2(position)) {
                const positionAxisID = Object.keys(position)[0];
                const value = position[positionAxisID];
                x = this.chart.scales[positionAxisID].getPixelForValue(value);
              }
              textAlign = this._getYAxisLabelAlignment(tl).textAlign;
            }
            if (axis === "y") {
              if (align === "start") {
                textBaseline = "top";
              } else if (align === "end") {
                textBaseline = "bottom";
              }
            }
            const labelSizes = this._getLabelSizes();
            for (i = 0, ilen = ticks.length; i < ilen; ++i) {
              tick = ticks[i];
              label = tick.label;
              const optsAtIndex = optionTicks.setContext(this.getContext(i));
              pixel = this.getPixelForTick(i) + optionTicks.labelOffset;
              font = this._resolveTickFontOptions(i);
              lineHeight = font.lineHeight;
              lineCount = isArray2(label) ? label.length : 1;
              const halfCount = lineCount / 2;
              const color2 = optsAtIndex.color;
              const strokeColor = optsAtIndex.textStrokeColor;
              const strokeWidth = optsAtIndex.textStrokeWidth;
              let tickTextAlign = textAlign;
              if (isHorizontal) {
                x = pixel;
                if (textAlign === "inner") {
                  if (i === ilen - 1) {
                    tickTextAlign = !this.options.reverse ? "right" : "left";
                  } else if (i === 0) {
                    tickTextAlign = !this.options.reverse ? "left" : "right";
                  } else {
                    tickTextAlign = "center";
                  }
                }
                if (position === "top") {
                  if (crossAlign === "near" || rotation !== 0) {
                    textOffset = -lineCount * lineHeight + lineHeight / 2;
                  } else if (crossAlign === "center") {
                    textOffset = -labelSizes.highest.height / 2 - halfCount * lineHeight + lineHeight;
                  } else {
                    textOffset = -labelSizes.highest.height + lineHeight / 2;
                  }
                } else {
                  if (crossAlign === "near" || rotation !== 0) {
                    textOffset = lineHeight / 2;
                  } else if (crossAlign === "center") {
                    textOffset = labelSizes.highest.height / 2 - halfCount * lineHeight;
                  } else {
                    textOffset = labelSizes.highest.height - lineCount * lineHeight;
                  }
                }
                if (mirror) {
                  textOffset *= -1;
                }
              } else {
                y = pixel;
                textOffset = (1 - lineCount) * lineHeight / 2;
              }
              let backdrop;
              if (optsAtIndex.showLabelBackdrop) {
                const labelPadding = toPadding(optsAtIndex.backdropPadding);
                const height = labelSizes.heights[i];
                const width = labelSizes.widths[i];
                let top = y + textOffset - labelPadding.top;
                let left = x - labelPadding.left;
                switch (textBaseline) {
                  case "middle":
                    top -= height / 2;
                    break;
                  case "bottom":
                    top -= height;
                    break;
                }
                switch (textAlign) {
                  case "center":
                    left -= width / 2;
                    break;
                  case "right":
                    left -= width;
                    break;
                }
                backdrop = {
                  left,
                  top,
                  width: width + labelPadding.width,
                  height: height + labelPadding.height,
                  color: optsAtIndex.backdropColor
                };
              }
              items.push({
                rotation,
                label,
                font,
                color: color2,
                strokeColor,
                strokeWidth,
                textOffset,
                textAlign: tickTextAlign,
                textBaseline,
                translation: [x, y],
                backdrop
              });
            }
            return items;
          }
          _getXAxisLabelAlignment() {
            const { position, ticks } = this.options;
            const rotation = -toRadians(this.labelRotation);
            if (rotation) {
              return position === "top" ? "left" : "right";
            }
            let align = "center";
            if (ticks.align === "start") {
              align = "left";
            } else if (ticks.align === "end") {
              align = "right";
            } else if (ticks.align === "inner") {
              align = "inner";
            }
            return align;
          }
          _getYAxisLabelAlignment(tl) {
            const { position, ticks: { crossAlign, mirror, padding } } = this.options;
            const labelSizes = this._getLabelSizes();
            const tickAndPadding = tl + padding;
            const widest = labelSizes.widest.width;
            let textAlign;
            let x;
            if (position === "left") {
              if (mirror) {
                x = this.right + padding;
                if (crossAlign === "near") {
                  textAlign = "left";
                } else if (crossAlign === "center") {
                  textAlign = "center";
                  x += widest / 2;
                } else {
                  textAlign = "right";
                  x += widest;
                }
              } else {
                x = this.right - tickAndPadding;
                if (crossAlign === "near") {
                  textAlign = "right";
                } else if (crossAlign === "center") {
                  textAlign = "center";
                  x -= widest / 2;
                } else {
                  textAlign = "left";
                  x = this.left;
                }
              }
            } else if (position === "right") {
              if (mirror) {
                x = this.left + padding;
                if (crossAlign === "near") {
                  textAlign = "right";
                } else if (crossAlign === "center") {
                  textAlign = "center";
                  x -= widest / 2;
                } else {
                  textAlign = "left";
                  x -= widest;
                }
              } else {
                x = this.left + tickAndPadding;
                if (crossAlign === "near") {
                  textAlign = "left";
                } else if (crossAlign === "center") {
                  textAlign = "center";
                  x += widest / 2;
                } else {
                  textAlign = "right";
                  x = this.right;
                }
              }
            } else {
              textAlign = "right";
            }
            return { textAlign, x };
          }
          _computeLabelArea() {
            if (this.options.ticks.mirror) {
              return;
            }
            const chart = this.chart;
            const position = this.options.position;
            if (position === "left" || position === "right") {
              return { top: 0, left: this.left, bottom: chart.height, right: this.right };
            }
            if (position === "top" || position === "bottom") {
              return { top: this.top, left: 0, bottom: this.bottom, right: chart.width };
            }
          }
          drawBackground() {
            const { ctx, options: { backgroundColor }, left, top, width, height } = this;
            if (backgroundColor) {
              ctx.save();
              ctx.fillStyle = backgroundColor;
              ctx.fillRect(left, top, width, height);
              ctx.restore();
            }
          }
          getLineWidthForValue(value) {
            const grid = this.options.grid;
            if (!this._isVisible() || !grid.display) {
              return 0;
            }
            const ticks = this.ticks;
            const index3 = ticks.findIndex((t) => t.value === value);
            if (index3 >= 0) {
              const opts = grid.setContext(this.getContext(index3));
              return opts.lineWidth;
            }
            return 0;
          }
          drawGrid(chartArea) {
            const grid = this.options.grid;
            const ctx = this.ctx;
            const items = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(chartArea));
            let i, ilen;
            const drawLine = (p1, p2, style2) => {
              if (!style2.width || !style2.color) {
                return;
              }
              ctx.save();
              ctx.lineWidth = style2.width;
              ctx.strokeStyle = style2.color;
              ctx.setLineDash(style2.borderDash || []);
              ctx.lineDashOffset = style2.borderDashOffset;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
              ctx.restore();
            };
            if (grid.display) {
              for (i = 0, ilen = items.length; i < ilen; ++i) {
                const item = items[i];
                if (grid.drawOnChartArea) {
                  drawLine(
                    { x: item.x1, y: item.y1 },
                    { x: item.x2, y: item.y2 },
                    item
                  );
                }
                if (grid.drawTicks) {
                  drawLine(
                    { x: item.tx1, y: item.ty1 },
                    { x: item.tx2, y: item.ty2 },
                    {
                      color: item.tickColor,
                      width: item.tickWidth,
                      borderDash: item.tickBorderDash,
                      borderDashOffset: item.tickBorderDashOffset
                    }
                  );
                }
              }
            }
          }
          drawBorder() {
            const { chart, ctx, options: { grid } } = this;
            const borderOpts = grid.setContext(this.getContext());
            const axisWidth = grid.drawBorder ? borderOpts.borderWidth : 0;
            if (!axisWidth) {
              return;
            }
            const lastLineWidth = grid.setContext(this.getContext(0)).lineWidth;
            const borderValue = this._borderValue;
            let x1, x2, y1, y2;
            if (this.isHorizontal()) {
              x1 = _alignPixel(chart, this.left, axisWidth) - axisWidth / 2;
              x2 = _alignPixel(chart, this.right, lastLineWidth) + lastLineWidth / 2;
              y1 = y2 = borderValue;
            } else {
              y1 = _alignPixel(chart, this.top, axisWidth) - axisWidth / 2;
              y2 = _alignPixel(chart, this.bottom, lastLineWidth) + lastLineWidth / 2;
              x1 = x2 = borderValue;
            }
            ctx.save();
            ctx.lineWidth = borderOpts.borderWidth;
            ctx.strokeStyle = borderOpts.borderColor;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.restore();
          }
          drawLabels(chartArea) {
            const optionTicks = this.options.ticks;
            if (!optionTicks.display) {
              return;
            }
            const ctx = this.ctx;
            const area = this._computeLabelArea();
            if (area) {
              clipArea(ctx, area);
            }
            const items = this._labelItems || (this._labelItems = this._computeLabelItems(chartArea));
            let i, ilen;
            for (i = 0, ilen = items.length; i < ilen; ++i) {
              const item = items[i];
              const tickFont = item.font;
              const label = item.label;
              if (item.backdrop) {
                ctx.fillStyle = item.backdrop.color;
                ctx.fillRect(item.backdrop.left, item.backdrop.top, item.backdrop.width, item.backdrop.height);
              }
              let y = item.textOffset;
              renderText(ctx, label, 0, y, tickFont, item);
            }
            if (area) {
              unclipArea(ctx);
            }
          }
          drawTitle() {
            const { ctx, options: { position, title, reverse } } = this;
            if (!title.display) {
              return;
            }
            const font = toFont(title.font);
            const padding = toPadding(title.padding);
            const align = title.align;
            let offset = font.lineHeight / 2;
            if (position === "bottom" || position === "center" || isObject2(position)) {
              offset += padding.bottom;
              if (isArray2(title.text)) {
                offset += font.lineHeight * (title.text.length - 1);
              }
            } else {
              offset += padding.top;
            }
            const { titleX, titleY, maxWidth, rotation } = titleArgs(this, offset, position, align);
            renderText(ctx, title.text, 0, 0, font, {
              color: title.color,
              maxWidth,
              rotation,
              textAlign: titleAlign(align, position, reverse),
              textBaseline: "middle",
              translation: [titleX, titleY]
            });
          }
          draw(chartArea) {
            if (!this._isVisible()) {
              return;
            }
            this.drawBackground();
            this.drawGrid(chartArea);
            this.drawBorder();
            this.drawTitle();
            this.drawLabels(chartArea);
          }
          _layers() {
            const opts = this.options;
            const tz = opts.ticks && opts.ticks.z || 0;
            const gz = valueOrDefault(opts.grid && opts.grid.z, -1);
            if (!this._isVisible() || this.draw !== Scale.prototype.draw) {
              return [{
                z: tz,
                draw: (chartArea) => {
                  this.draw(chartArea);
                }
              }];
            }
            return [{
              z: gz,
              draw: (chartArea) => {
                this.drawBackground();
                this.drawGrid(chartArea);
                this.drawTitle();
              }
            }, {
              z: gz + 1,
              draw: () => {
                this.drawBorder();
              }
            }, {
              z: tz,
              draw: (chartArea) => {
                this.drawLabels(chartArea);
              }
            }];
          }
          getMatchingVisibleMetas(type) {
            const metas = this.chart.getSortedVisibleDatasetMetas();
            const axisID = this.axis + "AxisID";
            const result = [];
            let i, ilen;
            for (i = 0, ilen = metas.length; i < ilen; ++i) {
              const meta = metas[i];
              if (meta[axisID] === this.id && (!type || meta.type === type)) {
                result.push(meta);
              }
            }
            return result;
          }
          _resolveTickFontOptions(index3) {
            const opts = this.options.ticks.setContext(this.getContext(index3));
            return toFont(opts.font);
          }
          _maxDigits() {
            const fontSize = this._resolveTickFontOptions(0).lineHeight;
            return (this.isHorizontal() ? this.width : this.height) / fontSize;
          }
        }
        class TypedRegistry {
          constructor(type, scope, override) {
            this.type = type;
            this.scope = scope;
            this.override = override;
            this.items = /* @__PURE__ */ Object.create(null);
          }
          isForType(type) {
            return Object.prototype.isPrototypeOf.call(this.type.prototype, type.prototype);
          }
          register(item) {
            const proto = Object.getPrototypeOf(item);
            let parentScope;
            if (isIChartComponent(proto)) {
              parentScope = this.register(proto);
            }
            const items = this.items;
            const id = item.id;
            const scope = this.scope + "." + id;
            if (!id) {
              throw new Error("class does not have id: " + item);
            }
            if (id in items) {
              return scope;
            }
            items[id] = item;
            registerDefaults(item, scope, parentScope);
            if (this.override) {
              defaults.override(item.id, item.overrides);
            }
            return scope;
          }
          get(id) {
            return this.items[id];
          }
          unregister(item) {
            const items = this.items;
            const id = item.id;
            const scope = this.scope;
            if (id in items) {
              delete items[id];
            }
            if (scope && id in defaults[scope]) {
              delete defaults[scope][id];
              if (this.override) {
                delete overrides[id];
              }
            }
          }
        }
        function registerDefaults(item, scope, parentScope) {
          const itemDefaults = merge(/* @__PURE__ */ Object.create(null), [
            parentScope ? defaults.get(parentScope) : {},
            defaults.get(scope),
            item.defaults
          ]);
          defaults.set(scope, itemDefaults);
          if (item.defaultRoutes) {
            routeDefaults(scope, item.defaultRoutes);
          }
          if (item.descriptors) {
            defaults.describe(scope, item.descriptors);
          }
        }
        function routeDefaults(scope, routes) {
          Object.keys(routes).forEach((property) => {
            const propertyParts = property.split(".");
            const sourceName = propertyParts.pop();
            const sourceScope = [scope].concat(propertyParts).join(".");
            const parts = routes[property].split(".");
            const targetName = parts.pop();
            const targetScope = parts.join(".");
            defaults.route(sourceScope, sourceName, targetScope, targetName);
          });
        }
        function isIChartComponent(proto) {
          return "id" in proto && "defaults" in proto;
        }
        class Registry {
          constructor() {
            this.controllers = new TypedRegistry(DatasetController, "datasets", true);
            this.elements = new TypedRegistry(Element, "elements");
            this.plugins = new TypedRegistry(Object, "plugins");
            this.scales = new TypedRegistry(Scale, "scales");
            this._typedRegistries = [this.controllers, this.scales, this.elements];
          }
          add(...args) {
            this._each("register", args);
          }
          remove(...args) {
            this._each("unregister", args);
          }
          addControllers(...args) {
            this._each("register", args, this.controllers);
          }
          addElements(...args) {
            this._each("register", args, this.elements);
          }
          addPlugins(...args) {
            this._each("register", args, this.plugins);
          }
          addScales(...args) {
            this._each("register", args, this.scales);
          }
          getController(id) {
            return this._get(id, this.controllers, "controller");
          }
          getElement(id) {
            return this._get(id, this.elements, "element");
          }
          getPlugin(id) {
            return this._get(id, this.plugins, "plugin");
          }
          getScale(id) {
            return this._get(id, this.scales, "scale");
          }
          removeControllers(...args) {
            this._each("unregister", args, this.controllers);
          }
          removeElements(...args) {
            this._each("unregister", args, this.elements);
          }
          removePlugins(...args) {
            this._each("unregister", args, this.plugins);
          }
          removeScales(...args) {
            this._each("unregister", args, this.scales);
          }
          _each(method, args, typedRegistry) {
            [...args].forEach((arg) => {
              const reg = typedRegistry || this._getRegistryForType(arg);
              if (typedRegistry || reg.isForType(arg) || reg === this.plugins && arg.id) {
                this._exec(method, reg, arg);
              } else {
                each(arg, (item) => {
                  const itemReg = typedRegistry || this._getRegistryForType(item);
                  this._exec(method, itemReg, item);
                });
              }
            });
          }
          _exec(method, registry2, component) {
            const camelMethod = _capitalize(method);
            callback(component["before" + camelMethod], [], component);
            registry2[method](component);
            callback(component["after" + camelMethod], [], component);
          }
          _getRegistryForType(type) {
            for (let i = 0; i < this._typedRegistries.length; i++) {
              const reg = this._typedRegistries[i];
              if (reg.isForType(type)) {
                return reg;
              }
            }
            return this.plugins;
          }
          _get(id, typedRegistry, type) {
            const item = typedRegistry.get(id);
            if (item === void 0) {
              throw new Error('"' + id + '" is not a registered ' + type + ".");
            }
            return item;
          }
        }
        var registry = new Registry();
        class PluginService {
          constructor() {
            this._init = [];
          }
          notify(chart, hook, args, filter) {
            if (hook === "beforeInit") {
              this._init = this._createDescriptors(chart, true);
              this._notify(this._init, chart, "install");
            }
            const descriptors2 = filter ? this._descriptors(chart).filter(filter) : this._descriptors(chart);
            const result = this._notify(descriptors2, chart, hook, args);
            if (hook === "afterDestroy") {
              this._notify(descriptors2, chart, "stop");
              this._notify(this._init, chart, "uninstall");
            }
            return result;
          }
          _notify(descriptors2, chart, hook, args) {
            args = args || {};
            for (const descriptor of descriptors2) {
              const plugin = descriptor.plugin;
              const method = plugin[hook];
              const params = [chart, args, descriptor.options];
              if (callback(method, params, plugin) === false && args.cancelable) {
                return false;
              }
            }
            return true;
          }
          invalidate() {
            if (!isNullOrUndef(this._cache)) {
              this._oldCache = this._cache;
              this._cache = void 0;
            }
          }
          _descriptors(chart) {
            if (this._cache) {
              return this._cache;
            }
            const descriptors2 = this._cache = this._createDescriptors(chart);
            this._notifyStateChanges(chart);
            return descriptors2;
          }
          _createDescriptors(chart, all) {
            const config2 = chart && chart.config;
            const options = valueOrDefault(config2.options && config2.options.plugins, {});
            const plugins2 = allPlugins(config2);
            return options === false && !all ? [] : createDescriptors(chart, plugins2, options, all);
          }
          _notifyStateChanges(chart) {
            const previousDescriptors = this._oldCache || [];
            const descriptors2 = this._cache;
            const diff = (a, b) => a.filter((x) => !b.some((y) => x.plugin.id === y.plugin.id));
            this._notify(diff(previousDescriptors, descriptors2), chart, "stop");
            this._notify(diff(descriptors2, previousDescriptors), chart, "start");
          }
        }
        function allPlugins(config2) {
          const localIds = {};
          const plugins2 = [];
          const keys = Object.keys(registry.plugins.items);
          for (let i = 0; i < keys.length; i++) {
            plugins2.push(registry.getPlugin(keys[i]));
          }
          const local = config2.plugins || [];
          for (let i = 0; i < local.length; i++) {
            const plugin = local[i];
            if (plugins2.indexOf(plugin) === -1) {
              plugins2.push(plugin);
              localIds[plugin.id] = true;
            }
          }
          return { plugins: plugins2, localIds };
        }
        function getOpts(options, all) {
          if (!all && options === false) {
            return null;
          }
          if (options === true) {
            return {};
          }
          return options;
        }
        function createDescriptors(chart, { plugins: plugins2, localIds }, options, all) {
          const result = [];
          const context = chart.getContext();
          for (const plugin of plugins2) {
            const id = plugin.id;
            const opts = getOpts(options[id], all);
            if (opts === null) {
              continue;
            }
            result.push({
              plugin,
              options: pluginOpts(chart.config, { plugin, local: localIds[id] }, opts, context)
            });
          }
          return result;
        }
        function pluginOpts(config2, { plugin, local }, opts, context) {
          const keys = config2.pluginScopeKeys(plugin);
          const scopes = config2.getOptionScopes(opts, keys);
          if (local && plugin.defaults) {
            scopes.push(plugin.defaults);
          }
          return config2.createResolver(scopes, context, [""], {
            scriptable: false,
            indexable: false,
            allKeys: true
          });
        }
        function getIndexAxis(type, options) {
          const datasetDefaults = defaults.datasets[type] || {};
          const datasetOptions = (options.datasets || {})[type] || {};
          return datasetOptions.indexAxis || options.indexAxis || datasetDefaults.indexAxis || "x";
        }
        function getAxisFromDefaultScaleID(id, indexAxis) {
          let axis = id;
          if (id === "_index_") {
            axis = indexAxis;
          } else if (id === "_value_") {
            axis = indexAxis === "x" ? "y" : "x";
          }
          return axis;
        }
        function getDefaultScaleIDFromAxis(axis, indexAxis) {
          return axis === indexAxis ? "_index_" : "_value_";
        }
        function axisFromPosition(position) {
          if (position === "top" || position === "bottom") {
            return "x";
          }
          if (position === "left" || position === "right") {
            return "y";
          }
        }
        function determineAxis(id, scaleOptions) {
          if (id === "x" || id === "y") {
            return id;
          }
          return scaleOptions.axis || axisFromPosition(scaleOptions.position) || id.charAt(0).toLowerCase();
        }
        function mergeScaleConfig(config2, options) {
          const chartDefaults = overrides[config2.type] || { scales: {} };
          const configScales = options.scales || {};
          const chartIndexAxis = getIndexAxis(config2.type, options);
          const firstIDs = /* @__PURE__ */ Object.create(null);
          const scales2 = /* @__PURE__ */ Object.create(null);
          Object.keys(configScales).forEach((id) => {
            const scaleConf = configScales[id];
            if (!isObject2(scaleConf)) {
              return console.error(`Invalid scale configuration for scale: ${id}`);
            }
            if (scaleConf._proxy) {
              return console.warn(`Ignoring resolver passed as options for scale: ${id}`);
            }
            const axis = determineAxis(id, scaleConf);
            const defaultId = getDefaultScaleIDFromAxis(axis, chartIndexAxis);
            const defaultScaleOptions = chartDefaults.scales || {};
            firstIDs[axis] = firstIDs[axis] || id;
            scales2[id] = mergeIf(/* @__PURE__ */ Object.create(null), [{ axis }, scaleConf, defaultScaleOptions[axis], defaultScaleOptions[defaultId]]);
          });
          config2.data.datasets.forEach((dataset) => {
            const type = dataset.type || config2.type;
            const indexAxis = dataset.indexAxis || getIndexAxis(type, options);
            const datasetDefaults = overrides[type] || {};
            const defaultScaleOptions = datasetDefaults.scales || {};
            Object.keys(defaultScaleOptions).forEach((defaultID) => {
              const axis = getAxisFromDefaultScaleID(defaultID, indexAxis);
              const id = dataset[axis + "AxisID"] || firstIDs[axis] || axis;
              scales2[id] = scales2[id] || /* @__PURE__ */ Object.create(null);
              mergeIf(scales2[id], [{ axis }, configScales[id], defaultScaleOptions[defaultID]]);
            });
          });
          Object.keys(scales2).forEach((key) => {
            const scale = scales2[key];
            mergeIf(scale, [defaults.scales[scale.type], defaults.scale]);
          });
          return scales2;
        }
        function initOptions(config2) {
          const options = config2.options || (config2.options = {});
          options.plugins = valueOrDefault(options.plugins, {});
          options.scales = mergeScaleConfig(config2, options);
        }
        function initData2(data) {
          data = data || {};
          data.datasets = data.datasets || [];
          data.labels = data.labels || [];
          return data;
        }
        function initConfig(config2) {
          config2 = config2 || {};
          config2.data = initData2(config2.data);
          initOptions(config2);
          return config2;
        }
        const keyCache = /* @__PURE__ */ new Map();
        const keysCached = /* @__PURE__ */ new Set();
        function cachedKeys(cacheKey, generate2) {
          let keys = keyCache.get(cacheKey);
          if (!keys) {
            keys = generate2();
            keyCache.set(cacheKey, keys);
            keysCached.add(keys);
          }
          return keys;
        }
        const addIfFound = (set3, obj, key) => {
          const opts = resolveObjectKey(obj, key);
          if (opts !== void 0) {
            set3.add(opts);
          }
        };
        class Config {
          constructor(config2) {
            this._config = initConfig(config2);
            this._scopeCache = /* @__PURE__ */ new Map();
            this._resolverCache = /* @__PURE__ */ new Map();
          }
          get platform() {
            return this._config.platform;
          }
          get type() {
            return this._config.type;
          }
          set type(type) {
            this._config.type = type;
          }
          get data() {
            return this._config.data;
          }
          set data(data) {
            this._config.data = initData2(data);
          }
          get options() {
            return this._config.options;
          }
          set options(options) {
            this._config.options = options;
          }
          get plugins() {
            return this._config.plugins;
          }
          update() {
            const config2 = this._config;
            this.clearCache();
            initOptions(config2);
          }
          clearCache() {
            this._scopeCache.clear();
            this._resolverCache.clear();
          }
          datasetScopeKeys(datasetType) {
            return cachedKeys(
              datasetType,
              () => [[
                `datasets.${datasetType}`,
                ""
              ]]
            );
          }
          datasetAnimationScopeKeys(datasetType, transition2) {
            return cachedKeys(
              `${datasetType}.transition.${transition2}`,
              () => [
                [
                  `datasets.${datasetType}.transitions.${transition2}`,
                  `transitions.${transition2}`
                ],
                [
                  `datasets.${datasetType}`,
                  ""
                ]
              ]
            );
          }
          datasetElementScopeKeys(datasetType, elementType) {
            return cachedKeys(
              `${datasetType}-${elementType}`,
              () => [[
                `datasets.${datasetType}.elements.${elementType}`,
                `datasets.${datasetType}`,
                `elements.${elementType}`,
                ""
              ]]
            );
          }
          pluginScopeKeys(plugin) {
            const id = plugin.id;
            const type = this.type;
            return cachedKeys(
              `${type}-plugin-${id}`,
              () => [[
                `plugins.${id}`,
                ...plugin.additionalOptionScopes || []
              ]]
            );
          }
          _cachedScopes(mainScope, resetCache) {
            const _scopeCache = this._scopeCache;
            let cache = _scopeCache.get(mainScope);
            if (!cache || resetCache) {
              cache = /* @__PURE__ */ new Map();
              _scopeCache.set(mainScope, cache);
            }
            return cache;
          }
          getOptionScopes(mainScope, keyLists, resetCache) {
            const { options, type } = this;
            const cache = this._cachedScopes(mainScope, resetCache);
            const cached2 = cache.get(keyLists);
            if (cached2) {
              return cached2;
            }
            const scopes = /* @__PURE__ */ new Set();
            keyLists.forEach((keys) => {
              if (mainScope) {
                scopes.add(mainScope);
                keys.forEach((key) => addIfFound(scopes, mainScope, key));
              }
              keys.forEach((key) => addIfFound(scopes, options, key));
              keys.forEach((key) => addIfFound(scopes, overrides[type] || {}, key));
              keys.forEach((key) => addIfFound(scopes, defaults, key));
              keys.forEach((key) => addIfFound(scopes, descriptors, key));
            });
            const array = Array.from(scopes);
            if (array.length === 0) {
              array.push(/* @__PURE__ */ Object.create(null));
            }
            if (keysCached.has(keyLists)) {
              cache.set(keyLists, array);
            }
            return array;
          }
          chartOptionScopes() {
            const { options, type } = this;
            return [
              options,
              overrides[type] || {},
              defaults.datasets[type] || {},
              { type },
              defaults,
              descriptors
            ];
          }
          resolveNamedOptions(scopes, names2, context, prefixes = [""]) {
            const result = { $shared: true };
            const { resolver, subPrefixes } = getResolver(this._resolverCache, scopes, prefixes);
            let options = resolver;
            if (needContext(resolver, names2)) {
              result.$shared = false;
              context = isFunction2(context) ? context() : context;
              const subResolver = this.createResolver(scopes, context, subPrefixes);
              options = _attachContext(resolver, context, subResolver);
            }
            for (const prop of names2) {
              result[prop] = options[prop];
            }
            return result;
          }
          createResolver(scopes, context, prefixes = [""], descriptorDefaults) {
            const { resolver } = getResolver(this._resolverCache, scopes, prefixes);
            return isObject2(context) ? _attachContext(resolver, context, void 0, descriptorDefaults) : resolver;
          }
        }
        function getResolver(resolverCache, scopes, prefixes) {
          let cache = resolverCache.get(scopes);
          if (!cache) {
            cache = /* @__PURE__ */ new Map();
            resolverCache.set(scopes, cache);
          }
          const cacheKey = prefixes.join();
          let cached2 = cache.get(cacheKey);
          if (!cached2) {
            const resolver = _createResolver(scopes, prefixes);
            cached2 = {
              resolver,
              subPrefixes: prefixes.filter((p) => !p.toLowerCase().includes("hover"))
            };
            cache.set(cacheKey, cached2);
          }
          return cached2;
        }
        const hasFunction = (value) => isObject2(value) && Object.getOwnPropertyNames(value).reduce((acc, key) => acc || isFunction2(value[key]), false);
        function needContext(proxy2, names2) {
          const { isScriptable, isIndexable } = _descriptors(proxy2);
          for (const prop of names2) {
            const scriptable = isScriptable(prop);
            const indexable = isIndexable(prop);
            const value = (indexable || scriptable) && proxy2[prop];
            if (scriptable && (isFunction2(value) || hasFunction(value)) || indexable && isArray2(value)) {
              return true;
            }
          }
          return false;
        }
        var version2 = "3.9.1";
        const KNOWN_POSITIONS = ["top", "bottom", "left", "right", "chartArea"];
        function positionIsHorizontal(position, axis) {
          return position === "top" || position === "bottom" || KNOWN_POSITIONS.indexOf(position) === -1 && axis === "x";
        }
        function compare2Level(l1, l2) {
          return function(a, b) {
            return a[l1] === b[l1] ? a[l2] - b[l2] : a[l1] - b[l1];
          };
        }
        function onAnimationsComplete(context) {
          const chart = context.chart;
          const animationOptions2 = chart.options.animation;
          chart.notifyPlugins("afterRender");
          callback(animationOptions2 && animationOptions2.onComplete, [context], chart);
        }
        function onAnimationProgress(context) {
          const chart = context.chart;
          const animationOptions2 = chart.options.animation;
          callback(animationOptions2 && animationOptions2.onProgress, [context], chart);
        }
        function getCanvas(item) {
          if (_isDomSupported() && typeof item === "string") {
            item = document.getElementById(item);
          } else if (item && item.length) {
            item = item[0];
          }
          if (item && item.canvas) {
            item = item.canvas;
          }
          return item;
        }
        const instances = {};
        const getChart = (key) => {
          const canvas = getCanvas(key);
          return Object.values(instances).filter((c) => c.canvas === canvas).pop();
        };
        function moveNumericKeys(obj, start, move) {
          const keys = Object.keys(obj);
          for (const key of keys) {
            const intKey = +key;
            if (intKey >= start) {
              const value = obj[key];
              delete obj[key];
              if (move > 0 || intKey > start) {
                obj[intKey + move] = value;
              }
            }
          }
        }
        function determineLastEvent(e, lastEvent, inChartArea, isClick) {
          if (!inChartArea || e.type === "mouseout") {
            return null;
          }
          if (isClick) {
            return lastEvent;
          }
          return e;
        }
        class Chart2 {
          constructor(item, userConfig) {
            const config2 = this.config = new Config(userConfig);
            const initialCanvas = getCanvas(item);
            const existingChart = getChart(initialCanvas);
            if (existingChart) {
              throw new Error(
                "Canvas is already in use. Chart with ID '" + existingChart.id + "' must be destroyed before the canvas with ID '" + existingChart.canvas.id + "' can be reused."
              );
            }
            const options = config2.createResolver(config2.chartOptionScopes(), this.getContext());
            this.platform = new (config2.platform || _detectPlatform(initialCanvas))();
            this.platform.updateConfig(config2);
            const context = this.platform.acquireContext(initialCanvas, options.aspectRatio);
            const canvas = context && context.canvas;
            const height = canvas && canvas.height;
            const width = canvas && canvas.width;
            this.id = uid2();
            this.ctx = context;
            this.canvas = canvas;
            this.width = width;
            this.height = height;
            this._options = options;
            this._aspectRatio = this.aspectRatio;
            this._layers = [];
            this._metasets = [];
            this._stacks = void 0;
            this.boxes = [];
            this.currentDevicePixelRatio = void 0;
            this.chartArea = void 0;
            this._active = [];
            this._lastEvent = void 0;
            this._listeners = {};
            this._responsiveListeners = void 0;
            this._sortedMetasets = [];
            this.scales = {};
            this._plugins = new PluginService();
            this.$proxies = {};
            this._hiddenIndices = {};
            this.attached = false;
            this._animationsDisabled = void 0;
            this.$context = void 0;
            this._doResize = debounce((mode) => this.update(mode), options.resizeDelay || 0);
            this._dataChanges = [];
            instances[this.id] = this;
            if (!context || !canvas) {
              console.error("Failed to create chart: can't acquire context from the given item");
              return;
            }
            animator.listen(this, "complete", onAnimationsComplete);
            animator.listen(this, "progress", onAnimationProgress);
            this._initialize();
            if (this.attached) {
              this.update();
            }
          }
          get aspectRatio() {
            const { options: { aspectRatio, maintainAspectRatio }, width, height, _aspectRatio } = this;
            if (!isNullOrUndef(aspectRatio)) {
              return aspectRatio;
            }
            if (maintainAspectRatio && _aspectRatio) {
              return _aspectRatio;
            }
            return height ? width / height : null;
          }
          get data() {
            return this.config.data;
          }
          set data(data) {
            this.config.data = data;
          }
          get options() {
            return this._options;
          }
          set options(options) {
            this.config.options = options;
          }
          _initialize() {
            this.notifyPlugins("beforeInit");
            if (this.options.responsive) {
              this.resize();
            } else {
              retinaScale(this, this.options.devicePixelRatio);
            }
            this.bindEvents();
            this.notifyPlugins("afterInit");
            return this;
          }
          clear() {
            clearCanvas(this.canvas, this.ctx);
            return this;
          }
          stop() {
            animator.stop(this);
            return this;
          }
          resize(width, height) {
            if (!animator.running(this)) {
              this._resize(width, height);
            } else {
              this._resizeBeforeDraw = { width, height };
            }
          }
          _resize(width, height) {
            const options = this.options;
            const canvas = this.canvas;
            const aspectRatio = options.maintainAspectRatio && this.aspectRatio;
            const newSize = this.platform.getMaximumSize(canvas, width, height, aspectRatio);
            const newRatio = options.devicePixelRatio || this.platform.getDevicePixelRatio();
            const mode = this.width ? "resize" : "attach";
            this.width = newSize.width;
            this.height = newSize.height;
            this._aspectRatio = this.aspectRatio;
            if (!retinaScale(this, newRatio, true)) {
              return;
            }
            this.notifyPlugins("resize", { size: newSize });
            callback(options.onResize, [this, newSize], this);
            if (this.attached) {
              if (this._doResize(mode)) {
                this.render();
              }
            }
          }
          ensureScalesHaveIDs() {
            const options = this.options;
            const scalesOptions = options.scales || {};
            each(scalesOptions, (axisOptions, axisID) => {
              axisOptions.id = axisID;
            });
          }
          buildOrUpdateScales() {
            const options = this.options;
            const scaleOpts = options.scales;
            const scales2 = this.scales;
            const updated = Object.keys(scales2).reduce((obj, id) => {
              obj[id] = false;
              return obj;
            }, {});
            let items = [];
            if (scaleOpts) {
              items = items.concat(
                Object.keys(scaleOpts).map((id) => {
                  const scaleOptions = scaleOpts[id];
                  const axis = determineAxis(id, scaleOptions);
                  const isRadial = axis === "r";
                  const isHorizontal = axis === "x";
                  return {
                    options: scaleOptions,
                    dposition: isRadial ? "chartArea" : isHorizontal ? "bottom" : "left",
                    dtype: isRadial ? "radialLinear" : isHorizontal ? "category" : "linear"
                  };
                })
              );
            }
            each(items, (item) => {
              const scaleOptions = item.options;
              const id = scaleOptions.id;
              const axis = determineAxis(id, scaleOptions);
              const scaleType = valueOrDefault(scaleOptions.type, item.dtype);
              if (scaleOptions.position === void 0 || positionIsHorizontal(scaleOptions.position, axis) !== positionIsHorizontal(item.dposition)) {
                scaleOptions.position = item.dposition;
              }
              updated[id] = true;
              let scale = null;
              if (id in scales2 && scales2[id].type === scaleType) {
                scale = scales2[id];
              } else {
                const scaleClass = registry.getScale(scaleType);
                scale = new scaleClass({
                  id,
                  type: scaleType,
                  ctx: this.ctx,
                  chart: this
                });
                scales2[scale.id] = scale;
              }
              scale.init(scaleOptions, options);
            });
            each(updated, (hasUpdated, id) => {
              if (!hasUpdated) {
                delete scales2[id];
              }
            });
            each(scales2, (scale) => {
              layouts.configure(this, scale, scale.options);
              layouts.addBox(this, scale);
            });
          }
          _updateMetasets() {
            const metasets = this._metasets;
            const numData = this.data.datasets.length;
            const numMeta = metasets.length;
            metasets.sort((a, b) => a.index - b.index);
            if (numMeta > numData) {
              for (let i = numData; i < numMeta; ++i) {
                this._destroyDatasetMeta(i);
              }
              metasets.splice(numData, numMeta - numData);
            }
            this._sortedMetasets = metasets.slice(0).sort(compare2Level("order", "index"));
          }
          _removeUnreferencedMetasets() {
            const { _metasets: metasets, data: { datasets } } = this;
            if (metasets.length > datasets.length) {
              delete this._stacks;
            }
            metasets.forEach((meta, index3) => {
              if (datasets.filter((x) => x === meta._dataset).length === 0) {
                this._destroyDatasetMeta(index3);
              }
            });
          }
          buildOrUpdateControllers() {
            const newControllers = [];
            const datasets = this.data.datasets;
            let i, ilen;
            this._removeUnreferencedMetasets();
            for (i = 0, ilen = datasets.length; i < ilen; i++) {
              const dataset = datasets[i];
              let meta = this.getDatasetMeta(i);
              const type = dataset.type || this.config.type;
              if (meta.type && meta.type !== type) {
                this._destroyDatasetMeta(i);
                meta = this.getDatasetMeta(i);
              }
              meta.type = type;
              meta.indexAxis = dataset.indexAxis || getIndexAxis(type, this.options);
              meta.order = dataset.order || 0;
              meta.index = i;
              meta.label = "" + dataset.label;
              meta.visible = this.isDatasetVisible(i);
              if (meta.controller) {
                meta.controller.updateIndex(i);
                meta.controller.linkScales();
              } else {
                const ControllerClass = registry.getController(type);
                const { datasetElementType, dataElementType } = defaults.datasets[type];
                Object.assign(ControllerClass.prototype, {
                  dataElementType: registry.getElement(dataElementType),
                  datasetElementType: datasetElementType && registry.getElement(datasetElementType)
                });
                meta.controller = new ControllerClass(this, i);
                newControllers.push(meta.controller);
              }
            }
            this._updateMetasets();
            return newControllers;
          }
          _resetElements() {
            each(this.data.datasets, (dataset, datasetIndex) => {
              this.getDatasetMeta(datasetIndex).controller.reset();
            }, this);
          }
          reset() {
            this._resetElements();
            this.notifyPlugins("reset");
          }
          update(mode) {
            const config2 = this.config;
            config2.update();
            const options = this._options = config2.createResolver(config2.chartOptionScopes(), this.getContext());
            const animsDisabled = this._animationsDisabled = !options.animation;
            this._updateScales();
            this._checkEventBindings();
            this._updateHiddenIndices();
            this._plugins.invalidate();
            if (this.notifyPlugins("beforeUpdate", { mode, cancelable: true }) === false) {
              return;
            }
            const newControllers = this.buildOrUpdateControllers();
            this.notifyPlugins("beforeElementsUpdate");
            let minPadding = 0;
            for (let i = 0, ilen = this.data.datasets.length; i < ilen; i++) {
              const { controller } = this.getDatasetMeta(i);
              const reset = !animsDisabled && newControllers.indexOf(controller) === -1;
              controller.buildOrUpdateElements(reset);
              minPadding = Math.max(+controller.getMaxOverflow(), minPadding);
            }
            minPadding = this._minPadding = options.layout.autoPadding ? minPadding : 0;
            this._updateLayout(minPadding);
            if (!animsDisabled) {
              each(newControllers, (controller) => {
                controller.reset();
              });
            }
            this._updateDatasets(mode);
            this.notifyPlugins("afterUpdate", { mode });
            this._layers.sort(compare2Level("z", "_idx"));
            const { _active, _lastEvent } = this;
            if (_lastEvent) {
              this._eventHandler(_lastEvent, true);
            } else if (_active.length) {
              this._updateHoverStyles(_active, _active, true);
            }
            this.render();
          }
          _updateScales() {
            each(this.scales, (scale) => {
              layouts.removeBox(this, scale);
            });
            this.ensureScalesHaveIDs();
            this.buildOrUpdateScales();
          }
          _checkEventBindings() {
            const options = this.options;
            const existingEvents = new Set(Object.keys(this._listeners));
            const newEvents = new Set(options.events);
            if (!setsEqual(existingEvents, newEvents) || !!this._responsiveListeners !== options.responsive) {
              this.unbindEvents();
              this.bindEvents();
            }
          }
          _updateHiddenIndices() {
            const { _hiddenIndices } = this;
            const changes = this._getUniformDataChanges() || [];
            for (const { method, start, count } of changes) {
              const move = method === "_removeElements" ? -count : count;
              moveNumericKeys(_hiddenIndices, start, move);
            }
          }
          _getUniformDataChanges() {
            const _dataChanges = this._dataChanges;
            if (!_dataChanges || !_dataChanges.length) {
              return;
            }
            this._dataChanges = [];
            const datasetCount = this.data.datasets.length;
            const makeSet = (idx) => new Set(
              _dataChanges.filter((c) => c[0] === idx).map((c, i) => i + "," + c.splice(1).join(","))
            );
            const changeSet = makeSet(0);
            for (let i = 1; i < datasetCount; i++) {
              if (!setsEqual(changeSet, makeSet(i))) {
                return;
              }
            }
            return Array.from(changeSet).map((c) => c.split(",")).map((a) => ({ method: a[1], start: +a[2], count: +a[3] }));
          }
          _updateLayout(minPadding) {
            if (this.notifyPlugins("beforeLayout", { cancelable: true }) === false) {
              return;
            }
            layouts.update(this, this.width, this.height, minPadding);
            const area = this.chartArea;
            const noArea = area.width <= 0 || area.height <= 0;
            this._layers = [];
            each(this.boxes, (box) => {
              if (noArea && box.position === "chartArea") {
                return;
              }
              if (box.configure) {
                box.configure();
              }
              this._layers.push(...box._layers());
            }, this);
            this._layers.forEach((item, index3) => {
              item._idx = index3;
            });
            this.notifyPlugins("afterLayout");
          }
          _updateDatasets(mode) {
            if (this.notifyPlugins("beforeDatasetsUpdate", { mode, cancelable: true }) === false) {
              return;
            }
            for (let i = 0, ilen = this.data.datasets.length; i < ilen; ++i) {
              this.getDatasetMeta(i).controller.configure();
            }
            for (let i = 0, ilen = this.data.datasets.length; i < ilen; ++i) {
              this._updateDataset(i, isFunction2(mode) ? mode({ datasetIndex: i }) : mode);
            }
            this.notifyPlugins("afterDatasetsUpdate", { mode });
          }
          _updateDataset(index3, mode) {
            const meta = this.getDatasetMeta(index3);
            const args = { meta, index: index3, mode, cancelable: true };
            if (this.notifyPlugins("beforeDatasetUpdate", args) === false) {
              return;
            }
            meta.controller._update(mode);
            args.cancelable = false;
            this.notifyPlugins("afterDatasetUpdate", args);
          }
          render() {
            if (this.notifyPlugins("beforeRender", { cancelable: true }) === false) {
              return;
            }
            if (animator.has(this)) {
              if (this.attached && !animator.running(this)) {
                animator.start(this);
              }
            } else {
              this.draw();
              onAnimationsComplete({ chart: this });
            }
          }
          draw() {
            let i;
            if (this._resizeBeforeDraw) {
              const { width, height } = this._resizeBeforeDraw;
              this._resize(width, height);
              this._resizeBeforeDraw = null;
            }
            this.clear();
            if (this.width <= 0 || this.height <= 0) {
              return;
            }
            if (this.notifyPlugins("beforeDraw", { cancelable: true }) === false) {
              return;
            }
            const layers = this._layers;
            for (i = 0; i < layers.length && layers[i].z <= 0; ++i) {
              layers[i].draw(this.chartArea);
            }
            this._drawDatasets();
            for (; i < layers.length; ++i) {
              layers[i].draw(this.chartArea);
            }
            this.notifyPlugins("afterDraw");
          }
          _getSortedDatasetMetas(filterVisible) {
            const metasets = this._sortedMetasets;
            const result = [];
            let i, ilen;
            for (i = 0, ilen = metasets.length; i < ilen; ++i) {
              const meta = metasets[i];
              if (!filterVisible || meta.visible) {
                result.push(meta);
              }
            }
            return result;
          }
          getSortedVisibleDatasetMetas() {
            return this._getSortedDatasetMetas(true);
          }
          _drawDatasets() {
            if (this.notifyPlugins("beforeDatasetsDraw", { cancelable: true }) === false) {
              return;
            }
            const metasets = this.getSortedVisibleDatasetMetas();
            for (let i = metasets.length - 1; i >= 0; --i) {
              this._drawDataset(metasets[i]);
            }
            this.notifyPlugins("afterDatasetsDraw");
          }
          _drawDataset(meta) {
            const ctx = this.ctx;
            const clip = meta._clip;
            const useClip = !clip.disabled;
            const area = this.chartArea;
            const args = {
              meta,
              index: meta.index,
              cancelable: true
            };
            if (this.notifyPlugins("beforeDatasetDraw", args) === false) {
              return;
            }
            if (useClip) {
              clipArea(ctx, {
                left: clip.left === false ? 0 : area.left - clip.left,
                right: clip.right === false ? this.width : area.right + clip.right,
                top: clip.top === false ? 0 : area.top - clip.top,
                bottom: clip.bottom === false ? this.height : area.bottom + clip.bottom
              });
            }
            meta.controller.draw();
            if (useClip) {
              unclipArea(ctx);
            }
            args.cancelable = false;
            this.notifyPlugins("afterDatasetDraw", args);
          }
          isPointInArea(point) {
            return _isPointInArea(point, this.chartArea, this._minPadding);
          }
          getElementsAtEventForMode(e, mode, options, useFinalPosition) {
            const method = Interaction.modes[mode];
            if (typeof method === "function") {
              return method(this, e, options, useFinalPosition);
            }
            return [];
          }
          getDatasetMeta(datasetIndex) {
            const dataset = this.data.datasets[datasetIndex];
            const metasets = this._metasets;
            let meta = metasets.filter((x) => x && x._dataset === dataset).pop();
            if (!meta) {
              meta = {
                type: null,
                data: [],
                dataset: null,
                controller: null,
                hidden: null,
                xAxisID: null,
                yAxisID: null,
                order: dataset && dataset.order || 0,
                index: datasetIndex,
                _dataset: dataset,
                _parsed: [],
                _sorted: false
              };
              metasets.push(meta);
            }
            return meta;
          }
          getContext() {
            return this.$context || (this.$context = createContext(null, { chart: this, type: "chart" }));
          }
          getVisibleDatasetCount() {
            return this.getSortedVisibleDatasetMetas().length;
          }
          isDatasetVisible(datasetIndex) {
            const dataset = this.data.datasets[datasetIndex];
            if (!dataset) {
              return false;
            }
            const meta = this.getDatasetMeta(datasetIndex);
            return typeof meta.hidden === "boolean" ? !meta.hidden : !dataset.hidden;
          }
          setDatasetVisibility(datasetIndex, visible) {
            const meta = this.getDatasetMeta(datasetIndex);
            meta.hidden = !visible;
          }
          toggleDataVisibility(index3) {
            this._hiddenIndices[index3] = !this._hiddenIndices[index3];
          }
          getDataVisibility(index3) {
            return !this._hiddenIndices[index3];
          }
          _updateVisibility(datasetIndex, dataIndex, visible) {
            const mode = visible ? "show" : "hide";
            const meta = this.getDatasetMeta(datasetIndex);
            const anims = meta.controller._resolveAnimations(void 0, mode);
            if (defined(dataIndex)) {
              meta.data[dataIndex].hidden = !visible;
              this.update();
            } else {
              this.setDatasetVisibility(datasetIndex, visible);
              anims.update(meta, { visible });
              this.update((ctx) => ctx.datasetIndex === datasetIndex ? mode : void 0);
            }
          }
          hide(datasetIndex, dataIndex) {
            this._updateVisibility(datasetIndex, dataIndex, false);
          }
          show(datasetIndex, dataIndex) {
            this._updateVisibility(datasetIndex, dataIndex, true);
          }
          _destroyDatasetMeta(datasetIndex) {
            const meta = this._metasets[datasetIndex];
            if (meta && meta.controller) {
              meta.controller._destroy();
            }
            delete this._metasets[datasetIndex];
          }
          _stop() {
            let i, ilen;
            this.stop();
            animator.remove(this);
            for (i = 0, ilen = this.data.datasets.length; i < ilen; ++i) {
              this._destroyDatasetMeta(i);
            }
          }
          destroy() {
            this.notifyPlugins("beforeDestroy");
            const { canvas, ctx } = this;
            this._stop();
            this.config.clearCache();
            if (canvas) {
              this.unbindEvents();
              clearCanvas(canvas, ctx);
              this.platform.releaseContext(ctx);
              this.canvas = null;
              this.ctx = null;
            }
            this.notifyPlugins("destroy");
            delete instances[this.id];
            this.notifyPlugins("afterDestroy");
          }
          toBase64Image(...args) {
            return this.canvas.toDataURL(...args);
          }
          bindEvents() {
            this.bindUserEvents();
            if (this.options.responsive) {
              this.bindResponsiveEvents();
            } else {
              this.attached = true;
            }
          }
          bindUserEvents() {
            const listeners = this._listeners;
            const platform = this.platform;
            const _add = (type, listener2) => {
              platform.addEventListener(this, type, listener2);
              listeners[type] = listener2;
            };
            const listener = (e, x, y) => {
              e.offsetX = x;
              e.offsetY = y;
              this._eventHandler(e);
            };
            each(this.options.events, (type) => _add(type, listener));
          }
          bindResponsiveEvents() {
            if (!this._responsiveListeners) {
              this._responsiveListeners = {};
            }
            const listeners = this._responsiveListeners;
            const platform = this.platform;
            const _add = (type, listener2) => {
              platform.addEventListener(this, type, listener2);
              listeners[type] = listener2;
            };
            const _remove = (type, listener2) => {
              if (listeners[type]) {
                platform.removeEventListener(this, type, listener2);
                delete listeners[type];
              }
            };
            const listener = (width, height) => {
              if (this.canvas) {
                this.resize(width, height);
              }
            };
            let detached;
            const attached = () => {
              _remove("attach", attached);
              this.attached = true;
              this.resize();
              _add("resize", listener);
              _add("detach", detached);
            };
            detached = () => {
              this.attached = false;
              _remove("resize", listener);
              this._stop();
              this._resize(0, 0);
              _add("attach", attached);
            };
            if (platform.isAttached(this.canvas)) {
              attached();
            } else {
              detached();
            }
          }
          unbindEvents() {
            each(this._listeners, (listener, type) => {
              this.platform.removeEventListener(this, type, listener);
            });
            this._listeners = {};
            each(this._responsiveListeners, (listener, type) => {
              this.platform.removeEventListener(this, type, listener);
            });
            this._responsiveListeners = void 0;
          }
          updateHoverStyle(items, mode, enabled) {
            const prefix = enabled ? "set" : "remove";
            let meta, item, i, ilen;
            if (mode === "dataset") {
              meta = this.getDatasetMeta(items[0].datasetIndex);
              meta.controller["_" + prefix + "DatasetHoverStyle"]();
            }
            for (i = 0, ilen = items.length; i < ilen; ++i) {
              item = items[i];
              const controller = item && this.getDatasetMeta(item.datasetIndex).controller;
              if (controller) {
                controller[prefix + "HoverStyle"](item.element, item.datasetIndex, item.index);
              }
            }
          }
          getActiveElements() {
            return this._active || [];
          }
          setActiveElements(activeElements) {
            const lastActive = this._active || [];
            const active = activeElements.map(({ datasetIndex, index: index3 }) => {
              const meta = this.getDatasetMeta(datasetIndex);
              if (!meta) {
                throw new Error("No dataset found at index " + datasetIndex);
              }
              return {
                datasetIndex,
                element: meta.data[index3],
                index: index3
              };
            });
            const changed = !_elementsEqual(active, lastActive);
            if (changed) {
              this._active = active;
              this._lastEvent = null;
              this._updateHoverStyles(active, lastActive);
            }
          }
          notifyPlugins(hook, args, filter) {
            return this._plugins.notify(this, hook, args, filter);
          }
          _updateHoverStyles(active, lastActive, replay) {
            const hoverOptions = this.options.hover;
            const diff = (a, b) => a.filter((x) => !b.some((y) => x.datasetIndex === y.datasetIndex && x.index === y.index));
            const deactivated = diff(lastActive, active);
            const activated = replay ? active : diff(active, lastActive);
            if (deactivated.length) {
              this.updateHoverStyle(deactivated, hoverOptions.mode, false);
            }
            if (activated.length && hoverOptions.mode) {
              this.updateHoverStyle(activated, hoverOptions.mode, true);
            }
          }
          _eventHandler(e, replay) {
            const args = {
              event: e,
              replay,
              cancelable: true,
              inChartArea: this.isPointInArea(e)
            };
            const eventFilter = (plugin) => (plugin.options.events || this.options.events).includes(e.native.type);
            if (this.notifyPlugins("beforeEvent", args, eventFilter) === false) {
              return;
            }
            const changed = this._handleEvent(e, replay, args.inChartArea);
            args.cancelable = false;
            this.notifyPlugins("afterEvent", args, eventFilter);
            if (changed || args.changed) {
              this.render();
            }
            return this;
          }
          _handleEvent(e, replay, inChartArea) {
            const { _active: lastActive = [], options } = this;
            const useFinalPosition = replay;
            const active = this._getActiveElements(e, lastActive, inChartArea, useFinalPosition);
            const isClick = _isClickEvent(e);
            const lastEvent = determineLastEvent(e, this._lastEvent, inChartArea, isClick);
            if (inChartArea) {
              this._lastEvent = null;
              callback(options.onHover, [e, active, this], this);
              if (isClick) {
                callback(options.onClick, [e, active, this], this);
              }
            }
            const changed = !_elementsEqual(active, lastActive);
            if (changed || replay) {
              this._active = active;
              this._updateHoverStyles(active, lastActive, replay);
            }
            this._lastEvent = lastEvent;
            return changed;
          }
          _getActiveElements(e, lastActive, inChartArea, useFinalPosition) {
            if (e.type === "mouseout") {
              return [];
            }
            if (!inChartArea) {
              return lastActive;
            }
            const hoverOptions = this.options.hover;
            return this.getElementsAtEventForMode(e, hoverOptions.mode, hoverOptions, useFinalPosition);
          }
        }
        const invalidatePlugins = () => each(Chart2.instances, (chart) => chart._plugins.invalidate());
        const enumerable = true;
        Object.defineProperties(Chart2, {
          defaults: {
            enumerable,
            value: defaults
          },
          instances: {
            enumerable,
            value: instances
          },
          overrides: {
            enumerable,
            value: overrides
          },
          registry: {
            enumerable,
            value: registry
          },
          version: {
            enumerable,
            value: version2
          },
          getChart: {
            enumerable,
            value: getChart
          },
          register: {
            enumerable,
            value: (...items) => {
              registry.add(...items);
              invalidatePlugins();
            }
          },
          unregister: {
            enumerable,
            value: (...items) => {
              registry.remove(...items);
              invalidatePlugins();
            }
          }
        });
        function abstract() {
          throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
        }
        class DateAdapter {
          constructor(options) {
            this.options = options || {};
          }
          init(chartOptions) {
          }
          formats() {
            return abstract();
          }
          parse(value, format) {
            return abstract();
          }
          format(timestamp, format) {
            return abstract();
          }
          add(timestamp, amount, unit) {
            return abstract();
          }
          diff(a, b, unit) {
            return abstract();
          }
          startOf(timestamp, unit, weekday) {
            return abstract();
          }
          endOf(timestamp, unit) {
            return abstract();
          }
        }
        DateAdapter.override = function(members) {
          Object.assign(DateAdapter.prototype, members);
        };
        var _adapters = {
          _date: DateAdapter
        };
        function getAllScaleValues(scale, type) {
          if (!scale._cache.$bar) {
            const visibleMetas = scale.getMatchingVisibleMetas(type);
            let values = [];
            for (let i = 0, ilen = visibleMetas.length; i < ilen; i++) {
              values = values.concat(visibleMetas[i].controller.getAllParsedValues(scale));
            }
            scale._cache.$bar = _arrayUnique(values.sort((a, b) => a - b));
          }
          return scale._cache.$bar;
        }
        function computeMinSampleSize(meta) {
          const scale = meta.iScale;
          const values = getAllScaleValues(scale, meta.type);
          let min = scale._length;
          let i, ilen, curr, prev;
          const updateMinAndPrev = () => {
            if (curr === 32767 || curr === -32768) {
              return;
            }
            if (defined(prev)) {
              min = Math.min(min, Math.abs(curr - prev) || min);
            }
            prev = curr;
          };
          for (i = 0, ilen = values.length; i < ilen; ++i) {
            curr = scale.getPixelForValue(values[i]);
            updateMinAndPrev();
          }
          prev = void 0;
          for (i = 0, ilen = scale.ticks.length; i < ilen; ++i) {
            curr = scale.getPixelForTick(i);
            updateMinAndPrev();
          }
          return min;
        }
        function computeFitCategoryTraits(index3, ruler, options, stackCount) {
          const thickness = options.barThickness;
          let size, ratio;
          if (isNullOrUndef(thickness)) {
            size = ruler.min * options.categoryPercentage;
            ratio = options.barPercentage;
          } else {
            size = thickness * stackCount;
            ratio = 1;
          }
          return {
            chunk: size / stackCount,
            ratio,
            start: ruler.pixels[index3] - size / 2
          };
        }
        function computeFlexCategoryTraits(index3, ruler, options, stackCount) {
          const pixels = ruler.pixels;
          const curr = pixels[index3];
          let prev = index3 > 0 ? pixels[index3 - 1] : null;
          let next2 = index3 < pixels.length - 1 ? pixels[index3 + 1] : null;
          const percent = options.categoryPercentage;
          if (prev === null) {
            prev = curr - (next2 === null ? ruler.end - ruler.start : next2 - curr);
          }
          if (next2 === null) {
            next2 = curr + curr - prev;
          }
          const start = curr - (curr - Math.min(prev, next2)) / 2 * percent;
          const size = Math.abs(next2 - prev) / 2 * percent;
          return {
            chunk: size / stackCount,
            ratio: options.barPercentage,
            start
          };
        }
        function parseFloatBar(entry, item, vScale, i) {
          const startValue = vScale.parse(entry[0], i);
          const endValue = vScale.parse(entry[1], i);
          const min = Math.min(startValue, endValue);
          const max = Math.max(startValue, endValue);
          let barStart = min;
          let barEnd = max;
          if (Math.abs(min) > Math.abs(max)) {
            barStart = max;
            barEnd = min;
          }
          item[vScale.axis] = barEnd;
          item._custom = {
            barStart,
            barEnd,
            start: startValue,
            end: endValue,
            min,
            max
          };
        }
        function parseValue(entry, item, vScale, i) {
          if (isArray2(entry)) {
            parseFloatBar(entry, item, vScale, i);
          } else {
            item[vScale.axis] = vScale.parse(entry, i);
          }
          return item;
        }
        function parseArrayOrPrimitive(meta, data, start, count) {
          const iScale = meta.iScale;
          const vScale = meta.vScale;
          const labels = iScale.getLabels();
          const singleScale = iScale === vScale;
          const parsed = [];
          let i, ilen, item, entry;
          for (i = start, ilen = start + count; i < ilen; ++i) {
            entry = data[i];
            item = {};
            item[iScale.axis] = singleScale || iScale.parse(labels[i], i);
            parsed.push(parseValue(entry, item, vScale, i));
          }
          return parsed;
        }
        function isFloatBar(custom) {
          return custom && custom.barStart !== void 0 && custom.barEnd !== void 0;
        }
        function barSign(size, vScale, actualBase) {
          if (size !== 0) {
            return sign(size);
          }
          return (vScale.isHorizontal() ? 1 : -1) * (vScale.min >= actualBase ? 1 : -1);
        }
        function borderProps(properties) {
          let reverse, start, end, top, bottom;
          if (properties.horizontal) {
            reverse = properties.base > properties.x;
            start = "left";
            end = "right";
          } else {
            reverse = properties.base < properties.y;
            start = "bottom";
            end = "top";
          }
          if (reverse) {
            top = "end";
            bottom = "start";
          } else {
            top = "start";
            bottom = "end";
          }
          return { start, end, reverse, top, bottom };
        }
        function setBorderSkipped(properties, options, stack, index3) {
          let edge = options.borderSkipped;
          const res = {};
          if (!edge) {
            properties.borderSkipped = res;
            return;
          }
          if (edge === true) {
            properties.borderSkipped = { top: true, right: true, bottom: true, left: true };
            return;
          }
          const { start, end, reverse, top, bottom } = borderProps(properties);
          if (edge === "middle" && stack) {
            properties.enableBorderRadius = true;
            if ((stack._top || 0) === index3) {
              edge = top;
            } else if ((stack._bottom || 0) === index3) {
              edge = bottom;
            } else {
              res[parseEdge(bottom, start, end, reverse)] = true;
              edge = top;
            }
          }
          res[parseEdge(edge, start, end, reverse)] = true;
          properties.borderSkipped = res;
        }
        function parseEdge(edge, a, b, reverse) {
          if (reverse) {
            edge = swap(edge, a, b);
            edge = startEnd(edge, b, a);
          } else {
            edge = startEnd(edge, a, b);
          }
          return edge;
        }
        function swap(orig, v1, v2) {
          return orig === v1 ? v2 : orig === v2 ? v1 : orig;
        }
        function startEnd(v, start, end) {
          return v === "start" ? start : v === "end" ? end : v;
        }
        function setInflateAmount(properties, { inflateAmount }, ratio) {
          properties.inflateAmount = inflateAmount === "auto" ? ratio === 1 ? 0.33 : 0 : inflateAmount;
        }
        class BarController extends DatasetController {
          parsePrimitiveData(meta, data, start, count) {
            return parseArrayOrPrimitive(meta, data, start, count);
          }
          parseArrayData(meta, data, start, count) {
            return parseArrayOrPrimitive(meta, data, start, count);
          }
          parseObjectData(meta, data, start, count) {
            const { iScale, vScale } = meta;
            const { xAxisKey = "x", yAxisKey = "y" } = this._parsing;
            const iAxisKey = iScale.axis === "x" ? xAxisKey : yAxisKey;
            const vAxisKey = vScale.axis === "x" ? xAxisKey : yAxisKey;
            const parsed = [];
            let i, ilen, item, obj;
            for (i = start, ilen = start + count; i < ilen; ++i) {
              obj = data[i];
              item = {};
              item[iScale.axis] = iScale.parse(resolveObjectKey(obj, iAxisKey), i);
              parsed.push(parseValue(resolveObjectKey(obj, vAxisKey), item, vScale, i));
            }
            return parsed;
          }
          updateRangeFromParsed(range2, scale, parsed, stack) {
            super.updateRangeFromParsed(range2, scale, parsed, stack);
            const custom = parsed._custom;
            if (custom && scale === this._cachedMeta.vScale) {
              range2.min = Math.min(range2.min, custom.min);
              range2.max = Math.max(range2.max, custom.max);
            }
          }
          getMaxOverflow() {
            return 0;
          }
          getLabelAndValue(index3) {
            const meta = this._cachedMeta;
            const { iScale, vScale } = meta;
            const parsed = this.getParsed(index3);
            const custom = parsed._custom;
            const value = isFloatBar(custom) ? "[" + custom.start + ", " + custom.end + "]" : "" + vScale.getLabelForValue(parsed[vScale.axis]);
            return {
              label: "" + iScale.getLabelForValue(parsed[iScale.axis]),
              value
            };
          }
          initialize() {
            this.enableOptionSharing = true;
            super.initialize();
            const meta = this._cachedMeta;
            meta.stack = this.getDataset().stack;
          }
          update(mode) {
            const meta = this._cachedMeta;
            this.updateElements(meta.data, 0, meta.data.length, mode);
          }
          updateElements(bars, start, count, mode) {
            const reset = mode === "reset";
            const { index: index3, _cachedMeta: { vScale } } = this;
            const base = vScale.getBasePixel();
            const horizontal = vScale.isHorizontal();
            const ruler = this._getRuler();
            const { sharedOptions, includeOptions } = this._getSharedOptions(start, mode);
            for (let i = start; i < start + count; i++) {
              const parsed = this.getParsed(i);
              const vpixels = reset || isNullOrUndef(parsed[vScale.axis]) ? { base, head: base } : this._calculateBarValuePixels(i);
              const ipixels = this._calculateBarIndexPixels(i, ruler);
              const stack = (parsed._stacks || {})[vScale.axis];
              const properties = {
                horizontal,
                base: vpixels.base,
                enableBorderRadius: !stack || isFloatBar(parsed._custom) || (index3 === stack._top || index3 === stack._bottom),
                x: horizontal ? vpixels.head : ipixels.center,
                y: horizontal ? ipixels.center : vpixels.head,
                height: horizontal ? ipixels.size : Math.abs(vpixels.size),
                width: horizontal ? Math.abs(vpixels.size) : ipixels.size
              };
              if (includeOptions) {
                properties.options = sharedOptions || this.resolveDataElementOptions(i, bars[i].active ? "active" : mode);
              }
              const options = properties.options || bars[i].options;
              setBorderSkipped(properties, options, stack, index3);
              setInflateAmount(properties, options, ruler.ratio);
              this.updateElement(bars[i], i, properties, mode);
            }
          }
          _getStacks(last, dataIndex) {
            const { iScale } = this._cachedMeta;
            const metasets = iScale.getMatchingVisibleMetas(this._type).filter((meta) => meta.controller.options.grouped);
            const stacked = iScale.options.stacked;
            const stacks = [];
            const skipNull = (meta) => {
              const parsed = meta.controller.getParsed(dataIndex);
              const val = parsed && parsed[meta.vScale.axis];
              if (isNullOrUndef(val) || isNaN(val)) {
                return true;
              }
            };
            for (const meta of metasets) {
              if (dataIndex !== void 0 && skipNull(meta)) {
                continue;
              }
              if (stacked === false || stacks.indexOf(meta.stack) === -1 || stacked === void 0 && meta.stack === void 0) {
                stacks.push(meta.stack);
              }
              if (meta.index === last) {
                break;
              }
            }
            if (!stacks.length) {
              stacks.push(void 0);
            }
            return stacks;
          }
          _getStackCount(index3) {
            return this._getStacks(void 0, index3).length;
          }
          _getStackIndex(datasetIndex, name, dataIndex) {
            const stacks = this._getStacks(datasetIndex, dataIndex);
            const index3 = name !== void 0 ? stacks.indexOf(name) : -1;
            return index3 === -1 ? stacks.length - 1 : index3;
          }
          _getRuler() {
            const opts = this.options;
            const meta = this._cachedMeta;
            const iScale = meta.iScale;
            const pixels = [];
            let i, ilen;
            for (i = 0, ilen = meta.data.length; i < ilen; ++i) {
              pixels.push(iScale.getPixelForValue(this.getParsed(i)[iScale.axis], i));
            }
            const barThickness = opts.barThickness;
            const min = barThickness || computeMinSampleSize(meta);
            return {
              min,
              pixels,
              start: iScale._startPixel,
              end: iScale._endPixel,
              stackCount: this._getStackCount(),
              scale: iScale,
              grouped: opts.grouped,
              ratio: barThickness ? 1 : opts.categoryPercentage * opts.barPercentage
            };
          }
          _calculateBarValuePixels(index3) {
            const { _cachedMeta: { vScale, _stacked }, options: { base: baseValue, minBarLength } } = this;
            const actualBase = baseValue || 0;
            const parsed = this.getParsed(index3);
            const custom = parsed._custom;
            const floating = isFloatBar(custom);
            let value = parsed[vScale.axis];
            let start = 0;
            let length = _stacked ? this.applyStack(vScale, parsed, _stacked) : value;
            let head, size;
            if (length !== value) {
              start = length - value;
              length = value;
            }
            if (floating) {
              value = custom.barStart;
              length = custom.barEnd - custom.barStart;
              if (value !== 0 && sign(value) !== sign(custom.barEnd)) {
                start = 0;
              }
              start += value;
            }
            const startValue = !isNullOrUndef(baseValue) && !floating ? baseValue : start;
            let base = vScale.getPixelForValue(startValue);
            if (this.chart.getDataVisibility(index3)) {
              head = vScale.getPixelForValue(start + length);
            } else {
              head = base;
            }
            size = head - base;
            if (Math.abs(size) < minBarLength) {
              size = barSign(size, vScale, actualBase) * minBarLength;
              if (value === actualBase) {
                base -= size / 2;
              }
              const startPixel = vScale.getPixelForDecimal(0);
              const endPixel = vScale.getPixelForDecimal(1);
              const min = Math.min(startPixel, endPixel);
              const max = Math.max(startPixel, endPixel);
              base = Math.max(Math.min(base, max), min);
              head = base + size;
            }
            if (base === vScale.getPixelForValue(actualBase)) {
              const halfGrid = sign(size) * vScale.getLineWidthForValue(actualBase) / 2;
              base += halfGrid;
              size -= halfGrid;
            }
            return {
              size,
              base,
              head,
              center: head + size / 2
            };
          }
          _calculateBarIndexPixels(index3, ruler) {
            const scale = ruler.scale;
            const options = this.options;
            const skipNull = options.skipNull;
            const maxBarThickness = valueOrDefault(options.maxBarThickness, Infinity);
            let center, size;
            if (ruler.grouped) {
              const stackCount = skipNull ? this._getStackCount(index3) : ruler.stackCount;
              const range2 = options.barThickness === "flex" ? computeFlexCategoryTraits(index3, ruler, options, stackCount) : computeFitCategoryTraits(index3, ruler, options, stackCount);
              const stackIndex = this._getStackIndex(this.index, this._cachedMeta.stack, skipNull ? index3 : void 0);
              center = range2.start + range2.chunk * stackIndex + range2.chunk / 2;
              size = Math.min(maxBarThickness, range2.chunk * range2.ratio);
            } else {
              center = scale.getPixelForValue(this.getParsed(index3)[scale.axis], index3);
              size = Math.min(maxBarThickness, ruler.min * ruler.ratio);
            }
            return {
              base: center - size / 2,
              head: center + size / 2,
              center,
              size
            };
          }
          draw() {
            const meta = this._cachedMeta;
            const vScale = meta.vScale;
            const rects = meta.data;
            const ilen = rects.length;
            let i = 0;
            for (; i < ilen; ++i) {
              if (this.getParsed(i)[vScale.axis] !== null) {
                rects[i].draw(this._ctx);
              }
            }
          }
        }
        BarController.id = "bar";
        BarController.defaults = {
          datasetElementType: false,
          dataElementType: "bar",
          categoryPercentage: 0.8,
          barPercentage: 0.9,
          grouped: true,
          animations: {
            numbers: {
              type: "number",
              properties: ["x", "y", "base", "width", "height"]
            }
          }
        };
        BarController.overrides = {
          scales: {
            _index_: {
              type: "category",
              offset: true,
              grid: {
                offset: true
              }
            },
            _value_: {
              type: "linear",
              beginAtZero: true
            }
          }
        };
        class BubbleController extends DatasetController {
          initialize() {
            this.enableOptionSharing = true;
            super.initialize();
          }
          parsePrimitiveData(meta, data, start, count) {
            const parsed = super.parsePrimitiveData(meta, data, start, count);
            for (let i = 0; i < parsed.length; i++) {
              parsed[i]._custom = this.resolveDataElementOptions(i + start).radius;
            }
            return parsed;
          }
          parseArrayData(meta, data, start, count) {
            const parsed = super.parseArrayData(meta, data, start, count);
            for (let i = 0; i < parsed.length; i++) {
              const item = data[start + i];
              parsed[i]._custom = valueOrDefault(item[2], this.resolveDataElementOptions(i + start).radius);
            }
            return parsed;
          }
          parseObjectData(meta, data, start, count) {
            const parsed = super.parseObjectData(meta, data, start, count);
            for (let i = 0; i < parsed.length; i++) {
              const item = data[start + i];
              parsed[i]._custom = valueOrDefault(item && item.r && +item.r, this.resolveDataElementOptions(i + start).radius);
            }
            return parsed;
          }
          getMaxOverflow() {
            const data = this._cachedMeta.data;
            let max = 0;
            for (let i = data.length - 1; i >= 0; --i) {
              max = Math.max(max, data[i].size(this.resolveDataElementOptions(i)) / 2);
            }
            return max > 0 && max;
          }
          getLabelAndValue(index3) {
            const meta = this._cachedMeta;
            const { xScale, yScale } = meta;
            const parsed = this.getParsed(index3);
            const x = xScale.getLabelForValue(parsed.x);
            const y = yScale.getLabelForValue(parsed.y);
            const r = parsed._custom;
            return {
              label: meta.label,
              value: "(" + x + ", " + y + (r ? ", " + r : "") + ")"
            };
          }
          update(mode) {
            const points = this._cachedMeta.data;
            this.updateElements(points, 0, points.length, mode);
          }
          updateElements(points, start, count, mode) {
            const reset = mode === "reset";
            const { iScale, vScale } = this._cachedMeta;
            const { sharedOptions, includeOptions } = this._getSharedOptions(start, mode);
            const iAxis = iScale.axis;
            const vAxis = vScale.axis;
            for (let i = start; i < start + count; i++) {
              const point = points[i];
              const parsed = !reset && this.getParsed(i);
              const properties = {};
              const iPixel = properties[iAxis] = reset ? iScale.getPixelForDecimal(0.5) : iScale.getPixelForValue(parsed[iAxis]);
              const vPixel = properties[vAxis] = reset ? vScale.getBasePixel() : vScale.getPixelForValue(parsed[vAxis]);
              properties.skip = isNaN(iPixel) || isNaN(vPixel);
              if (includeOptions) {
                properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? "active" : mode);
                if (reset) {
                  properties.options.radius = 0;
                }
              }
              this.updateElement(point, i, properties, mode);
            }
          }
          resolveDataElementOptions(index3, mode) {
            const parsed = this.getParsed(index3);
            let values = super.resolveDataElementOptions(index3, mode);
            if (values.$shared) {
              values = Object.assign({}, values, { $shared: false });
            }
            const radius = values.radius;
            if (mode !== "active") {
              values.radius = 0;
            }
            values.radius += valueOrDefault(parsed && parsed._custom, radius);
            return values;
          }
        }
        BubbleController.id = "bubble";
        BubbleController.defaults = {
          datasetElementType: false,
          dataElementType: "point",
          animations: {
            numbers: {
              type: "number",
              properties: ["x", "y", "borderWidth", "radius"]
            }
          }
        };
        BubbleController.overrides = {
          scales: {
            x: {
              type: "linear"
            },
            y: {
              type: "linear"
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                title() {
                  return "";
                }
              }
            }
          }
        };
        function getRatioAndOffset(rotation, circumference, cutout) {
          let ratioX = 1;
          let ratioY = 1;
          let offsetX = 0;
          let offsetY = 0;
          if (circumference < TAU) {
            const startAngle = rotation;
            const endAngle = startAngle + circumference;
            const startX = Math.cos(startAngle);
            const startY = Math.sin(startAngle);
            const endX = Math.cos(endAngle);
            const endY = Math.sin(endAngle);
            const calcMax = (angle, a, b) => _angleBetween(angle, startAngle, endAngle, true) ? 1 : Math.max(a, a * cutout, b, b * cutout);
            const calcMin = (angle, a, b) => _angleBetween(angle, startAngle, endAngle, true) ? -1 : Math.min(a, a * cutout, b, b * cutout);
            const maxX = calcMax(0, startX, endX);
            const maxY = calcMax(HALF_PI, startY, endY);
            const minX = calcMin(PI, startX, endX);
            const minY = calcMin(PI + HALF_PI, startY, endY);
            ratioX = (maxX - minX) / 2;
            ratioY = (maxY - minY) / 2;
            offsetX = -(maxX + minX) / 2;
            offsetY = -(maxY + minY) / 2;
          }
          return { ratioX, ratioY, offsetX, offsetY };
        }
        class DoughnutController extends DatasetController {
          constructor(chart, datasetIndex) {
            super(chart, datasetIndex);
            this.enableOptionSharing = true;
            this.innerRadius = void 0;
            this.outerRadius = void 0;
            this.offsetX = void 0;
            this.offsetY = void 0;
          }
          linkScales() {
          }
          parse(start, count) {
            const data = this.getDataset().data;
            const meta = this._cachedMeta;
            if (this._parsing === false) {
              meta._parsed = data;
            } else {
              let getter = (i2) => +data[i2];
              if (isObject2(data[start])) {
                const { key = "value" } = this._parsing;
                getter = (i2) => +resolveObjectKey(data[i2], key);
              }
              let i, ilen;
              for (i = start, ilen = start + count; i < ilen; ++i) {
                meta._parsed[i] = getter(i);
              }
            }
          }
          _getRotation() {
            return toRadians(this.options.rotation - 90);
          }
          _getCircumference() {
            return toRadians(this.options.circumference);
          }
          _getRotationExtents() {
            let min = TAU;
            let max = -TAU;
            for (let i = 0; i < this.chart.data.datasets.length; ++i) {
              if (this.chart.isDatasetVisible(i)) {
                const controller = this.chart.getDatasetMeta(i).controller;
                const rotation = controller._getRotation();
                const circumference = controller._getCircumference();
                min = Math.min(min, rotation);
                max = Math.max(max, rotation + circumference);
              }
            }
            return {
              rotation: min,
              circumference: max - min
            };
          }
          update(mode) {
            const chart = this.chart;
            const { chartArea } = chart;
            const meta = this._cachedMeta;
            const arcs = meta.data;
            const spacing = this.getMaxBorderWidth() + this.getMaxOffset(arcs) + this.options.spacing;
            const maxSize = Math.max((Math.min(chartArea.width, chartArea.height) - spacing) / 2, 0);
            const cutout = Math.min(toPercentage(this.options.cutout, maxSize), 1);
            const chartWeight = this._getRingWeight(this.index);
            const { circumference, rotation } = this._getRotationExtents();
            const { ratioX, ratioY, offsetX, offsetY } = getRatioAndOffset(rotation, circumference, cutout);
            const maxWidth = (chartArea.width - spacing) / ratioX;
            const maxHeight = (chartArea.height - spacing) / ratioY;
            const maxRadius = Math.max(Math.min(maxWidth, maxHeight) / 2, 0);
            const outerRadius = toDimension(this.options.radius, maxRadius);
            const innerRadius = Math.max(outerRadius * cutout, 0);
            const radiusLength = (outerRadius - innerRadius) / this._getVisibleDatasetWeightTotal();
            this.offsetX = offsetX * outerRadius;
            this.offsetY = offsetY * outerRadius;
            meta.total = this.calculateTotal();
            this.outerRadius = outerRadius - radiusLength * this._getRingWeightOffset(this.index);
            this.innerRadius = Math.max(this.outerRadius - radiusLength * chartWeight, 0);
            this.updateElements(arcs, 0, arcs.length, mode);
          }
          _circumference(i, reset) {
            const opts = this.options;
            const meta = this._cachedMeta;
            const circumference = this._getCircumference();
            if (reset && opts.animation.animateRotate || !this.chart.getDataVisibility(i) || meta._parsed[i] === null || meta.data[i].hidden) {
              return 0;
            }
            return this.calculateCircumference(meta._parsed[i] * circumference / TAU);
          }
          updateElements(arcs, start, count, mode) {
            const reset = mode === "reset";
            const chart = this.chart;
            const chartArea = chart.chartArea;
            const opts = chart.options;
            const animationOpts = opts.animation;
            const centerX = (chartArea.left + chartArea.right) / 2;
            const centerY = (chartArea.top + chartArea.bottom) / 2;
            const animateScale = reset && animationOpts.animateScale;
            const innerRadius = animateScale ? 0 : this.innerRadius;
            const outerRadius = animateScale ? 0 : this.outerRadius;
            const { sharedOptions, includeOptions } = this._getSharedOptions(start, mode);
            let startAngle = this._getRotation();
            let i;
            for (i = 0; i < start; ++i) {
              startAngle += this._circumference(i, reset);
            }
            for (i = start; i < start + count; ++i) {
              const circumference = this._circumference(i, reset);
              const arc = arcs[i];
              const properties = {
                x: centerX + this.offsetX,
                y: centerY + this.offsetY,
                startAngle,
                endAngle: startAngle + circumference,
                circumference,
                outerRadius,
                innerRadius
              };
              if (includeOptions) {
                properties.options = sharedOptions || this.resolveDataElementOptions(i, arc.active ? "active" : mode);
              }
              startAngle += circumference;
              this.updateElement(arc, i, properties, mode);
            }
          }
          calculateTotal() {
            const meta = this._cachedMeta;
            const metaData = meta.data;
            let total = 0;
            let i;
            for (i = 0; i < metaData.length; i++) {
              const value = meta._parsed[i];
              if (value !== null && !isNaN(value) && this.chart.getDataVisibility(i) && !metaData[i].hidden) {
                total += Math.abs(value);
              }
            }
            return total;
          }
          calculateCircumference(value) {
            const total = this._cachedMeta.total;
            if (total > 0 && !isNaN(value)) {
              return TAU * (Math.abs(value) / total);
            }
            return 0;
          }
          getLabelAndValue(index3) {
            const meta = this._cachedMeta;
            const chart = this.chart;
            const labels = chart.data.labels || [];
            const value = formatNumber(meta._parsed[index3], chart.options.locale);
            return {
              label: labels[index3] || "",
              value
            };
          }
          getMaxBorderWidth(arcs) {
            let max = 0;
            const chart = this.chart;
            let i, ilen, meta, controller, options;
            if (!arcs) {
              for (i = 0, ilen = chart.data.datasets.length; i < ilen; ++i) {
                if (chart.isDatasetVisible(i)) {
                  meta = chart.getDatasetMeta(i);
                  arcs = meta.data;
                  controller = meta.controller;
                  break;
                }
              }
            }
            if (!arcs) {
              return 0;
            }
            for (i = 0, ilen = arcs.length; i < ilen; ++i) {
              options = controller.resolveDataElementOptions(i);
              if (options.borderAlign !== "inner") {
                max = Math.max(max, options.borderWidth || 0, options.hoverBorderWidth || 0);
              }
            }
            return max;
          }
          getMaxOffset(arcs) {
            let max = 0;
            for (let i = 0, ilen = arcs.length; i < ilen; ++i) {
              const options = this.resolveDataElementOptions(i);
              max = Math.max(max, options.offset || 0, options.hoverOffset || 0);
            }
            return max;
          }
          _getRingWeightOffset(datasetIndex) {
            let ringWeightOffset = 0;
            for (let i = 0; i < datasetIndex; ++i) {
              if (this.chart.isDatasetVisible(i)) {
                ringWeightOffset += this._getRingWeight(i);
              }
            }
            return ringWeightOffset;
          }
          _getRingWeight(datasetIndex) {
            return Math.max(valueOrDefault(this.chart.data.datasets[datasetIndex].weight, 1), 0);
          }
          _getVisibleDatasetWeightTotal() {
            return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
          }
        }
        DoughnutController.id = "doughnut";
        DoughnutController.defaults = {
          datasetElementType: false,
          dataElementType: "arc",
          animation: {
            animateRotate: true,
            animateScale: false
          },
          animations: {
            numbers: {
              type: "number",
              properties: ["circumference", "endAngle", "innerRadius", "outerRadius", "startAngle", "x", "y", "offset", "borderWidth", "spacing"]
            }
          },
          cutout: "50%",
          rotation: 0,
          circumference: 360,
          radius: "100%",
          spacing: 0,
          indexAxis: "r"
        };
        DoughnutController.descriptors = {
          _scriptable: (name) => name !== "spacing",
          _indexable: (name) => name !== "spacing"
        };
        DoughnutController.overrides = {
          aspectRatio: 1,
          plugins: {
            legend: {
              labels: {
                generateLabels(chart) {
                  const data = chart.data;
                  if (data.labels.length && data.datasets.length) {
                    const { labels: { pointStyle } } = chart.legend.options;
                    return data.labels.map((label, i) => {
                      const meta = chart.getDatasetMeta(0);
                      const style2 = meta.controller.getStyle(i);
                      return {
                        text: label,
                        fillStyle: style2.backgroundColor,
                        strokeStyle: style2.borderColor,
                        lineWidth: style2.borderWidth,
                        pointStyle,
                        hidden: !chart.getDataVisibility(i),
                        index: i
                      };
                    });
                  }
                  return [];
                }
              },
              onClick(e, legendItem, legend) {
                legend.chart.toggleDataVisibility(legendItem.index);
                legend.chart.update();
              }
            },
            tooltip: {
              callbacks: {
                title() {
                  return "";
                },
                label(tooltipItem) {
                  let dataLabel = tooltipItem.label;
                  const value = ": " + tooltipItem.formattedValue;
                  if (isArray2(dataLabel)) {
                    dataLabel = dataLabel.slice();
                    dataLabel[0] += value;
                  } else {
                    dataLabel += value;
                  }
                  return dataLabel;
                }
              }
            }
          }
        };
        class LineController extends DatasetController {
          initialize() {
            this.enableOptionSharing = true;
            this.supportsDecimation = true;
            super.initialize();
          }
          update(mode) {
            const meta = this._cachedMeta;
            const { dataset: line, data: points = [], _dataset } = meta;
            const animationsDisabled = this.chart._animationsDisabled;
            let { start, count } = _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled);
            this._drawStart = start;
            this._drawCount = count;
            if (_scaleRangesChanged(meta)) {
              start = 0;
              count = points.length;
            }
            line._chart = this.chart;
            line._datasetIndex = this.index;
            line._decimated = !!_dataset._decimated;
            line.points = points;
            const options = this.resolveDatasetElementOptions(mode);
            if (!this.options.showLine) {
              options.borderWidth = 0;
            }
            options.segment = this.options.segment;
            this.updateElement(line, void 0, {
              animated: !animationsDisabled,
              options
            }, mode);
            this.updateElements(points, start, count, mode);
          }
          updateElements(points, start, count, mode) {
            const reset = mode === "reset";
            const { iScale, vScale, _stacked, _dataset } = this._cachedMeta;
            const { sharedOptions, includeOptions } = this._getSharedOptions(start, mode);
            const iAxis = iScale.axis;
            const vAxis = vScale.axis;
            const { spanGaps, segment } = this.options;
            const maxGapLength = isNumber(spanGaps) ? spanGaps : Number.POSITIVE_INFINITY;
            const directUpdate = this.chart._animationsDisabled || reset || mode === "none";
            let prevParsed = start > 0 && this.getParsed(start - 1);
            for (let i = start; i < start + count; ++i) {
              const point = points[i];
              const parsed = this.getParsed(i);
              const properties = directUpdate ? point : {};
              const nullData = isNullOrUndef(parsed[vAxis]);
              const iPixel = properties[iAxis] = iScale.getPixelForValue(parsed[iAxis], i);
              const vPixel = properties[vAxis] = reset || nullData ? vScale.getBasePixel() : vScale.getPixelForValue(_stacked ? this.applyStack(vScale, parsed, _stacked) : parsed[vAxis], i);
              properties.skip = isNaN(iPixel) || isNaN(vPixel) || nullData;
              properties.stop = i > 0 && Math.abs(parsed[iAxis] - prevParsed[iAxis]) > maxGapLength;
              if (segment) {
                properties.parsed = parsed;
                properties.raw = _dataset.data[i];
              }
              if (includeOptions) {
                properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? "active" : mode);
              }
              if (!directUpdate) {
                this.updateElement(point, i, properties, mode);
              }
              prevParsed = parsed;
            }
          }
          getMaxOverflow() {
            const meta = this._cachedMeta;
            const dataset = meta.dataset;
            const border = dataset.options && dataset.options.borderWidth || 0;
            const data = meta.data || [];
            if (!data.length) {
              return border;
            }
            const firstPoint = data[0].size(this.resolveDataElementOptions(0));
            const lastPoint = data[data.length - 1].size(this.resolveDataElementOptions(data.length - 1));
            return Math.max(border, firstPoint, lastPoint) / 2;
          }
          draw() {
            const meta = this._cachedMeta;
            meta.dataset.updateControlPoints(this.chart.chartArea, meta.iScale.axis);
            super.draw();
          }
        }
        LineController.id = "line";
        LineController.defaults = {
          datasetElementType: "line",
          dataElementType: "point",
          showLine: true,
          spanGaps: false
        };
        LineController.overrides = {
          scales: {
            _index_: {
              type: "category"
            },
            _value_: {
              type: "linear"
            }
          }
        };
        class PolarAreaController extends DatasetController {
          constructor(chart, datasetIndex) {
            super(chart, datasetIndex);
            this.innerRadius = void 0;
            this.outerRadius = void 0;
          }
          getLabelAndValue(index3) {
            const meta = this._cachedMeta;
            const chart = this.chart;
            const labels = chart.data.labels || [];
            const value = formatNumber(meta._parsed[index3].r, chart.options.locale);
            return {
              label: labels[index3] || "",
              value
            };
          }
          parseObjectData(meta, data, start, count) {
            return _parseObjectDataRadialScale.bind(this)(meta, data, start, count);
          }
          update(mode) {
            const arcs = this._cachedMeta.data;
            this._updateRadius();
            this.updateElements(arcs, 0, arcs.length, mode);
          }
          getMinMax() {
            const meta = this._cachedMeta;
            const range2 = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY };
            meta.data.forEach((element, index3) => {
              const parsed = this.getParsed(index3).r;
              if (!isNaN(parsed) && this.chart.getDataVisibility(index3)) {
                if (parsed < range2.min) {
                  range2.min = parsed;
                }
                if (parsed > range2.max) {
                  range2.max = parsed;
                }
              }
            });
            return range2;
          }
          _updateRadius() {
            const chart = this.chart;
            const chartArea = chart.chartArea;
            const opts = chart.options;
            const minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
            const outerRadius = Math.max(minSize / 2, 0);
            const innerRadius = Math.max(opts.cutoutPercentage ? outerRadius / 100 * opts.cutoutPercentage : 1, 0);
            const radiusLength = (outerRadius - innerRadius) / chart.getVisibleDatasetCount();
            this.outerRadius = outerRadius - radiusLength * this.index;
            this.innerRadius = this.outerRadius - radiusLength;
          }
          updateElements(arcs, start, count, mode) {
            const reset = mode === "reset";
            const chart = this.chart;
            const opts = chart.options;
            const animationOpts = opts.animation;
            const scale = this._cachedMeta.rScale;
            const centerX = scale.xCenter;
            const centerY = scale.yCenter;
            const datasetStartAngle = scale.getIndexAngle(0) - 0.5 * PI;
            let angle = datasetStartAngle;
            let i;
            const defaultAngle = 360 / this.countVisibleElements();
            for (i = 0; i < start; ++i) {
              angle += this._computeAngle(i, mode, defaultAngle);
            }
            for (i = start; i < start + count; i++) {
              const arc = arcs[i];
              let startAngle = angle;
              let endAngle = angle + this._computeAngle(i, mode, defaultAngle);
              let outerRadius = chart.getDataVisibility(i) ? scale.getDistanceFromCenterForValue(this.getParsed(i).r) : 0;
              angle = endAngle;
              if (reset) {
                if (animationOpts.animateScale) {
                  outerRadius = 0;
                }
                if (animationOpts.animateRotate) {
                  startAngle = endAngle = datasetStartAngle;
                }
              }
              const properties = {
                x: centerX,
                y: centerY,
                innerRadius: 0,
                outerRadius,
                startAngle,
                endAngle,
                options: this.resolveDataElementOptions(i, arc.active ? "active" : mode)
              };
              this.updateElement(arc, i, properties, mode);
            }
          }
          countVisibleElements() {
            const meta = this._cachedMeta;
            let count = 0;
            meta.data.forEach((element, index3) => {
              if (!isNaN(this.getParsed(index3).r) && this.chart.getDataVisibility(index3)) {
                count++;
              }
            });
            return count;
          }
          _computeAngle(index3, mode, defaultAngle) {
            return this.chart.getDataVisibility(index3) ? toRadians(this.resolveDataElementOptions(index3, mode).angle || defaultAngle) : 0;
          }
        }
        PolarAreaController.id = "polarArea";
        PolarAreaController.defaults = {
          dataElementType: "arc",
          animation: {
            animateRotate: true,
            animateScale: true
          },
          animations: {
            numbers: {
              type: "number",
              properties: ["x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius"]
            }
          },
          indexAxis: "r",
          startAngle: 0
        };
        PolarAreaController.overrides = {
          aspectRatio: 1,
          plugins: {
            legend: {
              labels: {
                generateLabels(chart) {
                  const data = chart.data;
                  if (data.labels.length && data.datasets.length) {
                    const { labels: { pointStyle } } = chart.legend.options;
                    return data.labels.map((label, i) => {
                      const meta = chart.getDatasetMeta(0);
                      const style2 = meta.controller.getStyle(i);
                      return {
                        text: label,
                        fillStyle: style2.backgroundColor,
                        strokeStyle: style2.borderColor,
                        lineWidth: style2.borderWidth,
                        pointStyle,
                        hidden: !chart.getDataVisibility(i),
                        index: i
                      };
                    });
                  }
                  return [];
                }
              },
              onClick(e, legendItem, legend) {
                legend.chart.toggleDataVisibility(legendItem.index);
                legend.chart.update();
              }
            },
            tooltip: {
              callbacks: {
                title() {
                  return "";
                },
                label(context) {
                  return context.chart.data.labels[context.dataIndex] + ": " + context.formattedValue;
                }
              }
            }
          },
          scales: {
            r: {
              type: "radialLinear",
              angleLines: {
                display: false
              },
              beginAtZero: true,
              grid: {
                circular: true
              },
              pointLabels: {
                display: false
              },
              startAngle: 0
            }
          }
        };
        class PieController extends DoughnutController {
        }
        PieController.id = "pie";
        PieController.defaults = {
          cutout: 0,
          rotation: 0,
          circumference: 360,
          radius: "100%"
        };
        class RadarController extends DatasetController {
          getLabelAndValue(index3) {
            const vScale = this._cachedMeta.vScale;
            const parsed = this.getParsed(index3);
            return {
              label: vScale.getLabels()[index3],
              value: "" + vScale.getLabelForValue(parsed[vScale.axis])
            };
          }
          parseObjectData(meta, data, start, count) {
            return _parseObjectDataRadialScale.bind(this)(meta, data, start, count);
          }
          update(mode) {
            const meta = this._cachedMeta;
            const line = meta.dataset;
            const points = meta.data || [];
            const labels = meta.iScale.getLabels();
            line.points = points;
            if (mode !== "resize") {
              const options = this.resolveDatasetElementOptions(mode);
              if (!this.options.showLine) {
                options.borderWidth = 0;
              }
              const properties = {
                _loop: true,
                _fullLoop: labels.length === points.length,
                options
              };
              this.updateElement(line, void 0, properties, mode);
            }
            this.updateElements(points, 0, points.length, mode);
          }
          updateElements(points, start, count, mode) {
            const scale = this._cachedMeta.rScale;
            const reset = mode === "reset";
            for (let i = start; i < start + count; i++) {
              const point = points[i];
              const options = this.resolveDataElementOptions(i, point.active ? "active" : mode);
              const pointPosition = scale.getPointPositionForValue(i, this.getParsed(i).r);
              const x = reset ? scale.xCenter : pointPosition.x;
              const y = reset ? scale.yCenter : pointPosition.y;
              const properties = {
                x,
                y,
                angle: pointPosition.angle,
                skip: isNaN(x) || isNaN(y),
                options
              };
              this.updateElement(point, i, properties, mode);
            }
          }
        }
        RadarController.id = "radar";
        RadarController.defaults = {
          datasetElementType: "line",
          dataElementType: "point",
          indexAxis: "r",
          showLine: true,
          elements: {
            line: {
              fill: "start"
            }
          }
        };
        RadarController.overrides = {
          aspectRatio: 1,
          scales: {
            r: {
              type: "radialLinear"
            }
          }
        };
        class ScatterController extends DatasetController {
          update(mode) {
            const meta = this._cachedMeta;
            const { data: points = [] } = meta;
            const animationsDisabled = this.chart._animationsDisabled;
            let { start, count } = _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled);
            this._drawStart = start;
            this._drawCount = count;
            if (_scaleRangesChanged(meta)) {
              start = 0;
              count = points.length;
            }
            if (this.options.showLine) {
              const { dataset: line, _dataset } = meta;
              line._chart = this.chart;
              line._datasetIndex = this.index;
              line._decimated = !!_dataset._decimated;
              line.points = points;
              const options = this.resolveDatasetElementOptions(mode);
              options.segment = this.options.segment;
              this.updateElement(line, void 0, {
                animated: !animationsDisabled,
                options
              }, mode);
            }
            this.updateElements(points, start, count, mode);
          }
          addElements() {
            const { showLine } = this.options;
            if (!this.datasetElementType && showLine) {
              this.datasetElementType = registry.getElement("line");
            }
            super.addElements();
          }
          updateElements(points, start, count, mode) {
            const reset = mode === "reset";
            const { iScale, vScale, _stacked, _dataset } = this._cachedMeta;
            const firstOpts = this.resolveDataElementOptions(start, mode);
            const sharedOptions = this.getSharedOptions(firstOpts);
            const includeOptions = this.includeOptions(mode, sharedOptions);
            const iAxis = iScale.axis;
            const vAxis = vScale.axis;
            const { spanGaps, segment } = this.options;
            const maxGapLength = isNumber(spanGaps) ? spanGaps : Number.POSITIVE_INFINITY;
            const directUpdate = this.chart._animationsDisabled || reset || mode === "none";
            let prevParsed = start > 0 && this.getParsed(start - 1);
            for (let i = start; i < start + count; ++i) {
              const point = points[i];
              const parsed = this.getParsed(i);
              const properties = directUpdate ? point : {};
              const nullData = isNullOrUndef(parsed[vAxis]);
              const iPixel = properties[iAxis] = iScale.getPixelForValue(parsed[iAxis], i);
              const vPixel = properties[vAxis] = reset || nullData ? vScale.getBasePixel() : vScale.getPixelForValue(_stacked ? this.applyStack(vScale, parsed, _stacked) : parsed[vAxis], i);
              properties.skip = isNaN(iPixel) || isNaN(vPixel) || nullData;
              properties.stop = i > 0 && Math.abs(parsed[iAxis] - prevParsed[iAxis]) > maxGapLength;
              if (segment) {
                properties.parsed = parsed;
                properties.raw = _dataset.data[i];
              }
              if (includeOptions) {
                properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? "active" : mode);
              }
              if (!directUpdate) {
                this.updateElement(point, i, properties, mode);
              }
              prevParsed = parsed;
            }
            this.updateSharedOptions(sharedOptions, mode, firstOpts);
          }
          getMaxOverflow() {
            const meta = this._cachedMeta;
            const data = meta.data || [];
            if (!this.options.showLine) {
              let max = 0;
              for (let i = data.length - 1; i >= 0; --i) {
                max = Math.max(max, data[i].size(this.resolveDataElementOptions(i)) / 2);
              }
              return max > 0 && max;
            }
            const dataset = meta.dataset;
            const border = dataset.options && dataset.options.borderWidth || 0;
            if (!data.length) {
              return border;
            }
            const firstPoint = data[0].size(this.resolveDataElementOptions(0));
            const lastPoint = data[data.length - 1].size(this.resolveDataElementOptions(data.length - 1));
            return Math.max(border, firstPoint, lastPoint) / 2;
          }
        }
        ScatterController.id = "scatter";
        ScatterController.defaults = {
          datasetElementType: false,
          dataElementType: "point",
          showLine: false,
          fill: false
        };
        ScatterController.overrides = {
          interaction: {
            mode: "point"
          },
          plugins: {
            tooltip: {
              callbacks: {
                title() {
                  return "";
                },
                label(item) {
                  return "(" + item.label + ", " + item.formattedValue + ")";
                }
              }
            }
          },
          scales: {
            x: {
              type: "linear"
            },
            y: {
              type: "linear"
            }
          }
        };
        var controllers = /* @__PURE__ */ Object.freeze({
          __proto__: null,
          BarController,
          BubbleController,
          DoughnutController,
          LineController,
          PolarAreaController,
          PieController,
          RadarController,
          ScatterController
        });
        function clipArc(ctx, element, endAngle) {
          const { startAngle, pixelMargin, x, y, outerRadius, innerRadius } = element;
          let angleMargin = pixelMargin / outerRadius;
          ctx.beginPath();
          ctx.arc(x, y, outerRadius, startAngle - angleMargin, endAngle + angleMargin);
          if (innerRadius > pixelMargin) {
            angleMargin = pixelMargin / innerRadius;
            ctx.arc(x, y, innerRadius, endAngle + angleMargin, startAngle - angleMargin, true);
          } else {
            ctx.arc(x, y, pixelMargin, endAngle + HALF_PI, startAngle - HALF_PI);
          }
          ctx.closePath();
          ctx.clip();
        }
        function toRadiusCorners(value) {
          return _readValueToProps(value, ["outerStart", "outerEnd", "innerStart", "innerEnd"]);
        }
        function parseBorderRadius$1(arc, innerRadius, outerRadius, angleDelta) {
          const o = toRadiusCorners(arc.options.borderRadius);
          const halfThickness = (outerRadius - innerRadius) / 2;
          const innerLimit = Math.min(halfThickness, angleDelta * innerRadius / 2);
          const computeOuterLimit = (val) => {
            const outerArcLimit = (outerRadius - Math.min(halfThickness, val)) * angleDelta / 2;
            return _limitValue(val, 0, Math.min(halfThickness, outerArcLimit));
          };
          return {
            outerStart: computeOuterLimit(o.outerStart),
            outerEnd: computeOuterLimit(o.outerEnd),
            innerStart: _limitValue(o.innerStart, 0, innerLimit),
            innerEnd: _limitValue(o.innerEnd, 0, innerLimit)
          };
        }
        function rThetaToXY(r, theta, x, y) {
          return {
            x: x + r * Math.cos(theta),
            y: y + r * Math.sin(theta)
          };
        }
        function pathArc(ctx, element, offset, spacing, end, circular2) {
          const { x, y, startAngle: start, pixelMargin, innerRadius: innerR } = element;
          const outerRadius = Math.max(element.outerRadius + spacing + offset - pixelMargin, 0);
          const innerRadius = innerR > 0 ? innerR + spacing + offset + pixelMargin : 0;
          let spacingOffset = 0;
          const alpha2 = end - start;
          if (spacing) {
            const noSpacingInnerRadius = innerR > 0 ? innerR - spacing : 0;
            const noSpacingOuterRadius = outerRadius > 0 ? outerRadius - spacing : 0;
            const avNogSpacingRadius = (noSpacingInnerRadius + noSpacingOuterRadius) / 2;
            const adjustedAngle = avNogSpacingRadius !== 0 ? alpha2 * avNogSpacingRadius / (avNogSpacingRadius + spacing) : alpha2;
            spacingOffset = (alpha2 - adjustedAngle) / 2;
          }
          const beta = Math.max(1e-3, alpha2 * outerRadius - offset / PI) / outerRadius;
          const angleOffset = (alpha2 - beta) / 2;
          const startAngle = start + angleOffset + spacingOffset;
          const endAngle = end - angleOffset - spacingOffset;
          const { outerStart, outerEnd, innerStart, innerEnd } = parseBorderRadius$1(element, innerRadius, outerRadius, endAngle - startAngle);
          const outerStartAdjustedRadius = outerRadius - outerStart;
          const outerEndAdjustedRadius = outerRadius - outerEnd;
          const outerStartAdjustedAngle = startAngle + outerStart / outerStartAdjustedRadius;
          const outerEndAdjustedAngle = endAngle - outerEnd / outerEndAdjustedRadius;
          const innerStartAdjustedRadius = innerRadius + innerStart;
          const innerEndAdjustedRadius = innerRadius + innerEnd;
          const innerStartAdjustedAngle = startAngle + innerStart / innerStartAdjustedRadius;
          const innerEndAdjustedAngle = endAngle - innerEnd / innerEndAdjustedRadius;
          ctx.beginPath();
          if (circular2) {
            ctx.arc(x, y, outerRadius, outerStartAdjustedAngle, outerEndAdjustedAngle);
            if (outerEnd > 0) {
              const pCenter = rThetaToXY(outerEndAdjustedRadius, outerEndAdjustedAngle, x, y);
              ctx.arc(pCenter.x, pCenter.y, outerEnd, outerEndAdjustedAngle, endAngle + HALF_PI);
            }
            const p4 = rThetaToXY(innerEndAdjustedRadius, endAngle, x, y);
            ctx.lineTo(p4.x, p4.y);
            if (innerEnd > 0) {
              const pCenter = rThetaToXY(innerEndAdjustedRadius, innerEndAdjustedAngle, x, y);
              ctx.arc(pCenter.x, pCenter.y, innerEnd, endAngle + HALF_PI, innerEndAdjustedAngle + Math.PI);
            }
            ctx.arc(x, y, innerRadius, endAngle - innerEnd / innerRadius, startAngle + innerStart / innerRadius, true);
            if (innerStart > 0) {
              const pCenter = rThetaToXY(innerStartAdjustedRadius, innerStartAdjustedAngle, x, y);
              ctx.arc(pCenter.x, pCenter.y, innerStart, innerStartAdjustedAngle + Math.PI, startAngle - HALF_PI);
            }
            const p8 = rThetaToXY(outerStartAdjustedRadius, startAngle, x, y);
            ctx.lineTo(p8.x, p8.y);
            if (outerStart > 0) {
              const pCenter = rThetaToXY(outerStartAdjustedRadius, outerStartAdjustedAngle, x, y);
              ctx.arc(pCenter.x, pCenter.y, outerStart, startAngle - HALF_PI, outerStartAdjustedAngle);
            }
          } else {
            ctx.moveTo(x, y);
            const outerStartX = Math.cos(outerStartAdjustedAngle) * outerRadius + x;
            const outerStartY = Math.sin(outerStartAdjustedAngle) * outerRadius + y;
            ctx.lineTo(outerStartX, outerStartY);
            const outerEndX = Math.cos(outerEndAdjustedAngle) * outerRadius + x;
            const outerEndY = Math.sin(outerEndAdjustedAngle) * outerRadius + y;
            ctx.lineTo(outerEndX, outerEndY);
          }
          ctx.closePath();
        }
        function drawArc(ctx, element, offset, spacing, circular2) {
          const { fullCircles, startAngle, circumference } = element;
          let endAngle = element.endAngle;
          if (fullCircles) {
            pathArc(ctx, element, offset, spacing, startAngle + TAU, circular2);
            for (let i = 0; i < fullCircles; ++i) {
              ctx.fill();
            }
            if (!isNaN(circumference)) {
              endAngle = startAngle + circumference % TAU;
              if (circumference % TAU === 0) {
                endAngle += TAU;
              }
            }
          }
          pathArc(ctx, element, offset, spacing, endAngle, circular2);
          ctx.fill();
          return endAngle;
        }
        function drawFullCircleBorders(ctx, element, inner) {
          const { x, y, startAngle, pixelMargin, fullCircles } = element;
          const outerRadius = Math.max(element.outerRadius - pixelMargin, 0);
          const innerRadius = element.innerRadius + pixelMargin;
          let i;
          if (inner) {
            clipArc(ctx, element, startAngle + TAU);
          }
          ctx.beginPath();
          ctx.arc(x, y, innerRadius, startAngle + TAU, startAngle, true);
          for (i = 0; i < fullCircles; ++i) {
            ctx.stroke();
          }
          ctx.beginPath();
          ctx.arc(x, y, outerRadius, startAngle, startAngle + TAU);
          for (i = 0; i < fullCircles; ++i) {
            ctx.stroke();
          }
        }
        function drawBorder(ctx, element, offset, spacing, endAngle, circular2) {
          const { options } = element;
          const { borderWidth, borderJoinStyle } = options;
          const inner = options.borderAlign === "inner";
          if (!borderWidth) {
            return;
          }
          if (inner) {
            ctx.lineWidth = borderWidth * 2;
            ctx.lineJoin = borderJoinStyle || "round";
          } else {
            ctx.lineWidth = borderWidth;
            ctx.lineJoin = borderJoinStyle || "bevel";
          }
          if (element.fullCircles) {
            drawFullCircleBorders(ctx, element, inner);
          }
          if (inner) {
            clipArc(ctx, element, endAngle);
          }
          pathArc(ctx, element, offset, spacing, endAngle, circular2);
          ctx.stroke();
        }
        class ArcElement extends Element {
          constructor(cfg) {
            super();
            this.options = void 0;
            this.circumference = void 0;
            this.startAngle = void 0;
            this.endAngle = void 0;
            this.innerRadius = void 0;
            this.outerRadius = void 0;
            this.pixelMargin = 0;
            this.fullCircles = 0;
            if (cfg) {
              Object.assign(this, cfg);
            }
          }
          inRange(chartX, chartY, useFinalPosition) {
            const point = this.getProps(["x", "y"], useFinalPosition);
            const { angle, distance } = getAngleFromPoint(point, { x: chartX, y: chartY });
            const { startAngle, endAngle, innerRadius, outerRadius, circumference } = this.getProps([
              "startAngle",
              "endAngle",
              "innerRadius",
              "outerRadius",
              "circumference"
            ], useFinalPosition);
            const rAdjust = this.options.spacing / 2;
            const _circumference = valueOrDefault(circumference, endAngle - startAngle);
            const betweenAngles = _circumference >= TAU || _angleBetween(angle, startAngle, endAngle);
            const withinRadius = _isBetween(distance, innerRadius + rAdjust, outerRadius + rAdjust);
            return betweenAngles && withinRadius;
          }
          getCenterPoint(useFinalPosition) {
            const { x, y, startAngle, endAngle, innerRadius, outerRadius } = this.getProps([
              "x",
              "y",
              "startAngle",
              "endAngle",
              "innerRadius",
              "outerRadius",
              "circumference"
            ], useFinalPosition);
            const { offset, spacing } = this.options;
            const halfAngle = (startAngle + endAngle) / 2;
            const halfRadius = (innerRadius + outerRadius + spacing + offset) / 2;
            return {
              x: x + Math.cos(halfAngle) * halfRadius,
              y: y + Math.sin(halfAngle) * halfRadius
            };
          }
          tooltipPosition(useFinalPosition) {
            return this.getCenterPoint(useFinalPosition);
          }
          draw(ctx) {
            const { options, circumference } = this;
            const offset = (options.offset || 0) / 2;
            const spacing = (options.spacing || 0) / 2;
            const circular2 = options.circular;
            this.pixelMargin = options.borderAlign === "inner" ? 0.33 : 0;
            this.fullCircles = circumference > TAU ? Math.floor(circumference / TAU) : 0;
            if (circumference === 0 || this.innerRadius < 0 || this.outerRadius < 0) {
              return;
            }
            ctx.save();
            let radiusOffset = 0;
            if (offset) {
              radiusOffset = offset / 2;
              const halfAngle = (this.startAngle + this.endAngle) / 2;
              ctx.translate(Math.cos(halfAngle) * radiusOffset, Math.sin(halfAngle) * radiusOffset);
              if (this.circumference >= PI) {
                radiusOffset = offset;
              }
            }
            ctx.fillStyle = options.backgroundColor;
            ctx.strokeStyle = options.borderColor;
            const endAngle = drawArc(ctx, this, radiusOffset, spacing, circular2);
            drawBorder(ctx, this, radiusOffset, spacing, endAngle, circular2);
            ctx.restore();
          }
        }
        ArcElement.id = "arc";
        ArcElement.defaults = {
          borderAlign: "center",
          borderColor: "#fff",
          borderJoinStyle: void 0,
          borderRadius: 0,
          borderWidth: 2,
          offset: 0,
          spacing: 0,
          angle: void 0,
          circular: true
        };
        ArcElement.defaultRoutes = {
          backgroundColor: "backgroundColor"
        };
        function setStyle(ctx, options, style2 = options) {
          ctx.lineCap = valueOrDefault(style2.borderCapStyle, options.borderCapStyle);
          ctx.setLineDash(valueOrDefault(style2.borderDash, options.borderDash));
          ctx.lineDashOffset = valueOrDefault(style2.borderDashOffset, options.borderDashOffset);
          ctx.lineJoin = valueOrDefault(style2.borderJoinStyle, options.borderJoinStyle);
          ctx.lineWidth = valueOrDefault(style2.borderWidth, options.borderWidth);
          ctx.strokeStyle = valueOrDefault(style2.borderColor, options.borderColor);
        }
        function lineTo(ctx, previous, target2) {
          ctx.lineTo(target2.x, target2.y);
        }
        function getLineMethod(options) {
          if (options.stepped) {
            return _steppedLineTo;
          }
          if (options.tension || options.cubicInterpolationMode === "monotone") {
            return _bezierCurveTo;
          }
          return lineTo;
        }
        function pathVars(points, segment, params = {}) {
          const count = points.length;
          const { start: paramsStart = 0, end: paramsEnd = count - 1 } = params;
          const { start: segmentStart, end: segmentEnd } = segment;
          const start = Math.max(paramsStart, segmentStart);
          const end = Math.min(paramsEnd, segmentEnd);
          const outside = paramsStart < segmentStart && paramsEnd < segmentStart || paramsStart > segmentEnd && paramsEnd > segmentEnd;
          return {
            count,
            start,
            loop: segment.loop,
            ilen: end < start && !outside ? count + end - start : end - start
          };
        }
        function pathSegment(ctx, line, segment, params) {
          const { points, options } = line;
          const { count, start, loop, ilen } = pathVars(points, segment, params);
          const lineMethod = getLineMethod(options);
          let { move = true, reverse } = params || {};
          let i, point, prev;
          for (i = 0; i <= ilen; ++i) {
            point = points[(start + (reverse ? ilen - i : i)) % count];
            if (point.skip) {
              continue;
            } else if (move) {
              ctx.moveTo(point.x, point.y);
              move = false;
            } else {
              lineMethod(ctx, prev, point, reverse, options.stepped);
            }
            prev = point;
          }
          if (loop) {
            point = points[(start + (reverse ? ilen : 0)) % count];
            lineMethod(ctx, prev, point, reverse, options.stepped);
          }
          return !!loop;
        }
        function fastPathSegment(ctx, line, segment, params) {
          const points = line.points;
          const { count, start, ilen } = pathVars(points, segment, params);
          const { move = true, reverse } = params || {};
          let avgX = 0;
          let countX = 0;
          let i, point, prevX, minY, maxY, lastY;
          const pointIndex = (index3) => (start + (reverse ? ilen - index3 : index3)) % count;
          const drawX = () => {
            if (minY !== maxY) {
              ctx.lineTo(avgX, maxY);
              ctx.lineTo(avgX, minY);
              ctx.lineTo(avgX, lastY);
            }
          };
          if (move) {
            point = points[pointIndex(0)];
            ctx.moveTo(point.x, point.y);
          }
          for (i = 0; i <= ilen; ++i) {
            point = points[pointIndex(i)];
            if (point.skip) {
              continue;
            }
            const x = point.x;
            const y = point.y;
            const truncX = x | 0;
            if (truncX === prevX) {
              if (y < minY) {
                minY = y;
              } else if (y > maxY) {
                maxY = y;
              }
              avgX = (countX * avgX + x) / ++countX;
            } else {
              drawX();
              ctx.lineTo(x, y);
              prevX = truncX;
              countX = 0;
              minY = maxY = y;
            }
            lastY = y;
          }
          drawX();
        }
        function _getSegmentMethod(line) {
          const opts = line.options;
          const borderDash = opts.borderDash && opts.borderDash.length;
          const useFastPath = !line._decimated && !line._loop && !opts.tension && opts.cubicInterpolationMode !== "monotone" && !opts.stepped && !borderDash;
          return useFastPath ? fastPathSegment : pathSegment;
        }
        function _getInterpolationMethod(options) {
          if (options.stepped) {
            return _steppedInterpolation;
          }
          if (options.tension || options.cubicInterpolationMode === "monotone") {
            return _bezierInterpolation;
          }
          return _pointInLine;
        }
        function strokePathWithCache(ctx, line, start, count) {
          let path = line._path;
          if (!path) {
            path = line._path = new Path2D();
            if (line.path(path, start, count)) {
              path.closePath();
            }
          }
          setStyle(ctx, line.options);
          ctx.stroke(path);
        }
        function strokePathDirect(ctx, line, start, count) {
          const { segments, options } = line;
          const segmentMethod = _getSegmentMethod(line);
          for (const segment of segments) {
            setStyle(ctx, options, segment.style);
            ctx.beginPath();
            if (segmentMethod(ctx, line, segment, { start, end: start + count - 1 })) {
              ctx.closePath();
            }
            ctx.stroke();
          }
        }
        const usePath2D = typeof Path2D === "function";
        function draw(ctx, line, start, count) {
          if (usePath2D && !line.options.segment) {
            strokePathWithCache(ctx, line, start, count);
          } else {
            strokePathDirect(ctx, line, start, count);
          }
        }
        class LineElement extends Element {
          constructor(cfg) {
            super();
            this.animated = true;
            this.options = void 0;
            this._chart = void 0;
            this._loop = void 0;
            this._fullLoop = void 0;
            this._path = void 0;
            this._points = void 0;
            this._segments = void 0;
            this._decimated = false;
            this._pointsUpdated = false;
            this._datasetIndex = void 0;
            if (cfg) {
              Object.assign(this, cfg);
            }
          }
          updateControlPoints(chartArea, indexAxis) {
            const options = this.options;
            if ((options.tension || options.cubicInterpolationMode === "monotone") && !options.stepped && !this._pointsUpdated) {
              const loop = options.spanGaps ? this._loop : this._fullLoop;
              _updateBezierControlPoints(this._points, options, chartArea, loop, indexAxis);
              this._pointsUpdated = true;
            }
          }
          set points(points) {
            this._points = points;
            delete this._segments;
            delete this._path;
            this._pointsUpdated = false;
          }
          get points() {
            return this._points;
          }
          get segments() {
            return this._segments || (this._segments = _computeSegments(this, this.options.segment));
          }
          first() {
            const segments = this.segments;
            const points = this.points;
            return segments.length && points[segments[0].start];
          }
          last() {
            const segments = this.segments;
            const points = this.points;
            const count = segments.length;
            return count && points[segments[count - 1].end];
          }
          interpolate(point, property) {
            const options = this.options;
            const value = point[property];
            const points = this.points;
            const segments = _boundSegments(this, { property, start: value, end: value });
            if (!segments.length) {
              return;
            }
            const result = [];
            const _interpolate = _getInterpolationMethod(options);
            let i, ilen;
            for (i = 0, ilen = segments.length; i < ilen; ++i) {
              const { start, end } = segments[i];
              const p1 = points[start];
              const p2 = points[end];
              if (p1 === p2) {
                result.push(p1);
                continue;
              }
              const t = Math.abs((value - p1[property]) / (p2[property] - p1[property]));
              const interpolated = _interpolate(p1, p2, t, options.stepped);
              interpolated[property] = point[property];
              result.push(interpolated);
            }
            return result.length === 1 ? result[0] : result;
          }
          pathSegment(ctx, segment, params) {
            const segmentMethod = _getSegmentMethod(this);
            return segmentMethod(ctx, this, segment, params);
          }
          path(ctx, start, count) {
            const segments = this.segments;
            const segmentMethod = _getSegmentMethod(this);
            let loop = this._loop;
            start = start || 0;
            count = count || this.points.length - start;
            for (const segment of segments) {
              loop &= segmentMethod(ctx, this, segment, { start, end: start + count - 1 });
            }
            return !!loop;
          }
          draw(ctx, chartArea, start, count) {
            const options = this.options || {};
            const points = this.points || [];
            if (points.length && options.borderWidth) {
              ctx.save();
              draw(ctx, this, start, count);
              ctx.restore();
            }
            if (this.animated) {
              this._pointsUpdated = false;
              this._path = void 0;
            }
          }
        }
        LineElement.id = "line";
        LineElement.defaults = {
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0,
          borderJoinStyle: "miter",
          borderWidth: 3,
          capBezierPoints: true,
          cubicInterpolationMode: "default",
          fill: false,
          spanGaps: false,
          stepped: false,
          tension: 0
        };
        LineElement.defaultRoutes = {
          backgroundColor: "backgroundColor",
          borderColor: "borderColor"
        };
        LineElement.descriptors = {
          _scriptable: true,
          _indexable: (name) => name !== "borderDash" && name !== "fill"
        };
        function inRange$1(el, pos, axis, useFinalPosition) {
          const options = el.options;
          const { [axis]: value } = el.getProps([axis], useFinalPosition);
          return Math.abs(pos - value) < options.radius + options.hitRadius;
        }
        class PointElement extends Element {
          constructor(cfg) {
            super();
            this.options = void 0;
            this.parsed = void 0;
            this.skip = void 0;
            this.stop = void 0;
            if (cfg) {
              Object.assign(this, cfg);
            }
          }
          inRange(mouseX, mouseY, useFinalPosition) {
            const options = this.options;
            const { x, y } = this.getProps(["x", "y"], useFinalPosition);
            return Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2) < Math.pow(options.hitRadius + options.radius, 2);
          }
          inXRange(mouseX, useFinalPosition) {
            return inRange$1(this, mouseX, "x", useFinalPosition);
          }
          inYRange(mouseY, useFinalPosition) {
            return inRange$1(this, mouseY, "y", useFinalPosition);
          }
          getCenterPoint(useFinalPosition) {
            const { x, y } = this.getProps(["x", "y"], useFinalPosition);
            return { x, y };
          }
          size(options) {
            options = options || this.options || {};
            let radius = options.radius || 0;
            radius = Math.max(radius, radius && options.hoverRadius || 0);
            const borderWidth = radius && options.borderWidth || 0;
            return (radius + borderWidth) * 2;
          }
          draw(ctx, area) {
            const options = this.options;
            if (this.skip || options.radius < 0.1 || !_isPointInArea(this, area, this.size(options) / 2)) {
              return;
            }
            ctx.strokeStyle = options.borderColor;
            ctx.lineWidth = options.borderWidth;
            ctx.fillStyle = options.backgroundColor;
            drawPoint(ctx, options, this.x, this.y);
          }
          getRange() {
            const options = this.options || {};
            return options.radius + options.hitRadius;
          }
        }
        PointElement.id = "point";
        PointElement.defaults = {
          borderWidth: 1,
          hitRadius: 1,
          hoverBorderWidth: 1,
          hoverRadius: 4,
          pointStyle: "circle",
          radius: 3,
          rotation: 0
        };
        PointElement.defaultRoutes = {
          backgroundColor: "backgroundColor",
          borderColor: "borderColor"
        };
        function getBarBounds(bar, useFinalPosition) {
          const { x, y, base, width, height } = bar.getProps(["x", "y", "base", "width", "height"], useFinalPosition);
          let left, right, top, bottom, half;
          if (bar.horizontal) {
            half = height / 2;
            left = Math.min(x, base);
            right = Math.max(x, base);
            top = y - half;
            bottom = y + half;
          } else {
            half = width / 2;
            left = x - half;
            right = x + half;
            top = Math.min(y, base);
            bottom = Math.max(y, base);
          }
          return { left, top, right, bottom };
        }
        function skipOrLimit(skip2, value, min, max) {
          return skip2 ? 0 : _limitValue(value, min, max);
        }
        function parseBorderWidth(bar, maxW, maxH) {
          const value = bar.options.borderWidth;
          const skip2 = bar.borderSkipped;
          const o = toTRBL(value);
          return {
            t: skipOrLimit(skip2.top, o.top, 0, maxH),
            r: skipOrLimit(skip2.right, o.right, 0, maxW),
            b: skipOrLimit(skip2.bottom, o.bottom, 0, maxH),
            l: skipOrLimit(skip2.left, o.left, 0, maxW)
          };
        }
        function parseBorderRadius(bar, maxW, maxH) {
          const { enableBorderRadius } = bar.getProps(["enableBorderRadius"]);
          const value = bar.options.borderRadius;
          const o = toTRBLCorners(value);
          const maxR = Math.min(maxW, maxH);
          const skip2 = bar.borderSkipped;
          const enableBorder = enableBorderRadius || isObject2(value);
          return {
            topLeft: skipOrLimit(!enableBorder || skip2.top || skip2.left, o.topLeft, 0, maxR),
            topRight: skipOrLimit(!enableBorder || skip2.top || skip2.right, o.topRight, 0, maxR),
            bottomLeft: skipOrLimit(!enableBorder || skip2.bottom || skip2.left, o.bottomLeft, 0, maxR),
            bottomRight: skipOrLimit(!enableBorder || skip2.bottom || skip2.right, o.bottomRight, 0, maxR)
          };
        }
        function boundingRects(bar) {
          const bounds = getBarBounds(bar);
          const width = bounds.right - bounds.left;
          const height = bounds.bottom - bounds.top;
          const border = parseBorderWidth(bar, width / 2, height / 2);
          const radius = parseBorderRadius(bar, width / 2, height / 2);
          return {
            outer: {
              x: bounds.left,
              y: bounds.top,
              w: width,
              h: height,
              radius
            },
            inner: {
              x: bounds.left + border.l,
              y: bounds.top + border.t,
              w: width - border.l - border.r,
              h: height - border.t - border.b,
              radius: {
                topLeft: Math.max(0, radius.topLeft - Math.max(border.t, border.l)),
                topRight: Math.max(0, radius.topRight - Math.max(border.t, border.r)),
                bottomLeft: Math.max(0, radius.bottomLeft - Math.max(border.b, border.l)),
                bottomRight: Math.max(0, radius.bottomRight - Math.max(border.b, border.r))
              }
            }
          };
        }
        function inRange(bar, x, y, useFinalPosition) {
          const skipX = x === null;
          const skipY = y === null;
          const skipBoth = skipX && skipY;
          const bounds = bar && !skipBoth && getBarBounds(bar, useFinalPosition);
          return bounds && (skipX || _isBetween(x, bounds.left, bounds.right)) && (skipY || _isBetween(y, bounds.top, bounds.bottom));
        }
        function hasRadius(radius) {
          return radius.topLeft || radius.topRight || radius.bottomLeft || radius.bottomRight;
        }
        function addNormalRectPath(ctx, rect) {
          ctx.rect(rect.x, rect.y, rect.w, rect.h);
        }
        function inflateRect(rect, amount, refRect = {}) {
          const x = rect.x !== refRect.x ? -amount : 0;
          const y = rect.y !== refRect.y ? -amount : 0;
          const w = (rect.x + rect.w !== refRect.x + refRect.w ? amount : 0) - x;
          const h = (rect.y + rect.h !== refRect.y + refRect.h ? amount : 0) - y;
          return {
            x: rect.x + x,
            y: rect.y + y,
            w: rect.w + w,
            h: rect.h + h,
            radius: rect.radius
          };
        }
        class BarElement extends Element {
          constructor(cfg) {
            super();
            this.options = void 0;
            this.horizontal = void 0;
            this.base = void 0;
            this.width = void 0;
            this.height = void 0;
            this.inflateAmount = void 0;
            if (cfg) {
              Object.assign(this, cfg);
            }
          }
          draw(ctx) {
            const { inflateAmount, options: { borderColor, backgroundColor } } = this;
            const { inner, outer } = boundingRects(this);
            const addRectPath = hasRadius(outer.radius) ? addRoundedRectPath : addNormalRectPath;
            ctx.save();
            if (outer.w !== inner.w || outer.h !== inner.h) {
              ctx.beginPath();
              addRectPath(ctx, inflateRect(outer, inflateAmount, inner));
              ctx.clip();
              addRectPath(ctx, inflateRect(inner, -inflateAmount, outer));
              ctx.fillStyle = borderColor;
              ctx.fill("evenodd");
            }
            ctx.beginPath();
            addRectPath(ctx, inflateRect(inner, inflateAmount));
            ctx.fillStyle = backgroundColor;
            ctx.fill();
            ctx.restore();
          }
          inRange(mouseX, mouseY, useFinalPosition) {
            return inRange(this, mouseX, mouseY, useFinalPosition);
          }
          inXRange(mouseX, useFinalPosition) {
            return inRange(this, mouseX, null, useFinalPosition);
          }
          inYRange(mouseY, useFinalPosition) {
            return inRange(this, null, mouseY, useFinalPosition);
          }
          getCenterPoint(useFinalPosition) {
            const { x, y, base, horizontal } = this.getProps(["x", "y", "base", "horizontal"], useFinalPosition);
            return {
              x: horizontal ? (x + base) / 2 : x,
              y: horizontal ? y : (y + base) / 2
            };
          }
          getRange(axis) {
            return axis === "x" ? this.width / 2 : this.height / 2;
          }
        }
        BarElement.id = "bar";
        BarElement.defaults = {
          borderSkipped: "start",
          borderWidth: 0,
          borderRadius: 0,
          inflateAmount: "auto",
          pointStyle: void 0
        };
        BarElement.defaultRoutes = {
          backgroundColor: "backgroundColor",
          borderColor: "borderColor"
        };
        var elements = /* @__PURE__ */ Object.freeze({
          __proto__: null,
          ArcElement,
          LineElement,
          PointElement,
          BarElement
        });
        function lttbDecimation(data, start, count, availableWidth, options) {
          const samples = options.samples || availableWidth;
          if (samples >= count) {
            return data.slice(start, start + count);
          }
          const decimated = [];
          const bucketWidth = (count - 2) / (samples - 2);
          let sampledIndex = 0;
          const endIndex = start + count - 1;
          let a = start;
          let i, maxAreaPoint, maxArea, area, nextA;
          decimated[sampledIndex++] = data[a];
          for (i = 0; i < samples - 2; i++) {
            let avgX = 0;
            let avgY = 0;
            let j;
            const avgRangeStart = Math.floor((i + 1) * bucketWidth) + 1 + start;
            const avgRangeEnd = Math.min(Math.floor((i + 2) * bucketWidth) + 1, count) + start;
            const avgRangeLength = avgRangeEnd - avgRangeStart;
            for (j = avgRangeStart; j < avgRangeEnd; j++) {
              avgX += data[j].x;
              avgY += data[j].y;
            }
            avgX /= avgRangeLength;
            avgY /= avgRangeLength;
            const rangeOffs = Math.floor(i * bucketWidth) + 1 + start;
            const rangeTo = Math.min(Math.floor((i + 1) * bucketWidth) + 1, count) + start;
            const { x: pointAx, y: pointAy } = data[a];
            maxArea = area = -1;
            for (j = rangeOffs; j < rangeTo; j++) {
              area = 0.5 * Math.abs(
                (pointAx - avgX) * (data[j].y - pointAy) - (pointAx - data[j].x) * (avgY - pointAy)
              );
              if (area > maxArea) {
                maxArea = area;
                maxAreaPoint = data[j];
                nextA = j;
              }
            }
            decimated[sampledIndex++] = maxAreaPoint;
            a = nextA;
          }
          decimated[sampledIndex++] = data[endIndex];
          return decimated;
        }
        function minMaxDecimation(data, start, count, availableWidth) {
          let avgX = 0;
          let countX = 0;
          let i, point, x, y, prevX, minIndex, maxIndex, startIndex, minY, maxY;
          const decimated = [];
          const endIndex = start + count - 1;
          const xMin = data[start].x;
          const xMax = data[endIndex].x;
          const dx = xMax - xMin;
          for (i = start; i < start + count; ++i) {
            point = data[i];
            x = (point.x - xMin) / dx * availableWidth;
            y = point.y;
            const truncX = x | 0;
            if (truncX === prevX) {
              if (y < minY) {
                minY = y;
                minIndex = i;
              } else if (y > maxY) {
                maxY = y;
                maxIndex = i;
              }
              avgX = (countX * avgX + point.x) / ++countX;
            } else {
              const lastIndex = i - 1;
              if (!isNullOrUndef(minIndex) && !isNullOrUndef(maxIndex)) {
                const intermediateIndex1 = Math.min(minIndex, maxIndex);
                const intermediateIndex2 = Math.max(minIndex, maxIndex);
                if (intermediateIndex1 !== startIndex && intermediateIndex1 !== lastIndex) {
                  decimated.push({
                    ...data[intermediateIndex1],
                    x: avgX
                  });
                }
                if (intermediateIndex2 !== startIndex && intermediateIndex2 !== lastIndex) {
                  decimated.push({
                    ...data[intermediateIndex2],
                    x: avgX
                  });
                }
              }
              if (i > 0 && lastIndex !== startIndex) {
                decimated.push(data[lastIndex]);
              }
              decimated.push(point);
              prevX = truncX;
              countX = 0;
              minY = maxY = y;
              minIndex = maxIndex = startIndex = i;
            }
          }
          return decimated;
        }
        function cleanDecimatedDataset(dataset) {
          if (dataset._decimated) {
            const data = dataset._data;
            delete dataset._decimated;
            delete dataset._data;
            Object.defineProperty(dataset, "data", { value: data });
          }
        }
        function cleanDecimatedData(chart) {
          chart.data.datasets.forEach((dataset) => {
            cleanDecimatedDataset(dataset);
          });
        }
        function getStartAndCountOfVisiblePointsSimplified(meta, points) {
          const pointCount = points.length;
          let start = 0;
          let count;
          const { iScale } = meta;
          const { min, max, minDefined, maxDefined } = iScale.getUserBounds();
          if (minDefined) {
            start = _limitValue(_lookupByKey(points, iScale.axis, min).lo, 0, pointCount - 1);
          }
          if (maxDefined) {
            count = _limitValue(_lookupByKey(points, iScale.axis, max).hi + 1, start, pointCount) - start;
          } else {
            count = pointCount - start;
          }
          return { start, count };
        }
        var plugin_decimation = {
          id: "decimation",
          defaults: {
            algorithm: "min-max",
            enabled: false
          },
          beforeElementsUpdate: (chart, args, options) => {
            if (!options.enabled) {
              cleanDecimatedData(chart);
              return;
            }
            const availableWidth = chart.width;
            chart.data.datasets.forEach((dataset, datasetIndex) => {
              const { _data, indexAxis } = dataset;
              const meta = chart.getDatasetMeta(datasetIndex);
              const data = _data || dataset.data;
              if (resolve([indexAxis, chart.options.indexAxis]) === "y") {
                return;
              }
              if (!meta.controller.supportsDecimation) {
                return;
              }
              const xAxis = chart.scales[meta.xAxisID];
              if (xAxis.type !== "linear" && xAxis.type !== "time") {
                return;
              }
              if (chart.options.parsing) {
                return;
              }
              let { start, count } = getStartAndCountOfVisiblePointsSimplified(meta, data);
              const threshold = options.threshold || 4 * availableWidth;
              if (count <= threshold) {
                cleanDecimatedDataset(dataset);
                return;
              }
              if (isNullOrUndef(_data)) {
                dataset._data = data;
                delete dataset.data;
                Object.defineProperty(dataset, "data", {
                  configurable: true,
                  enumerable: true,
                  get: function() {
                    return this._decimated;
                  },
                  set: function(d) {
                    this._data = d;
                  }
                });
              }
              let decimated;
              switch (options.algorithm) {
                case "lttb":
                  decimated = lttbDecimation(data, start, count, availableWidth, options);
                  break;
                case "min-max":
                  decimated = minMaxDecimation(data, start, count, availableWidth);
                  break;
                default:
                  throw new Error(`Unsupported decimation algorithm '${options.algorithm}'`);
              }
              dataset._decimated = decimated;
            });
          },
          destroy(chart) {
            cleanDecimatedData(chart);
          }
        };
        function _segments(line, target2, property) {
          const segments = line.segments;
          const points = line.points;
          const tpoints = target2.points;
          const parts = [];
          for (const segment of segments) {
            let { start, end } = segment;
            end = _findSegmentEnd(start, end, points);
            const bounds = _getBounds(property, points[start], points[end], segment.loop);
            if (!target2.segments) {
              parts.push({
                source: segment,
                target: bounds,
                start: points[start],
                end: points[end]
              });
              continue;
            }
            const targetSegments = _boundSegments(target2, bounds);
            for (const tgt of targetSegments) {
              const subBounds = _getBounds(property, tpoints[tgt.start], tpoints[tgt.end], tgt.loop);
              const fillSources = _boundSegment(segment, points, subBounds);
              for (const fillSource of fillSources) {
                parts.push({
                  source: fillSource,
                  target: tgt,
                  start: {
                    [property]: _getEdge(bounds, subBounds, "start", Math.max)
                  },
                  end: {
                    [property]: _getEdge(bounds, subBounds, "end", Math.min)
                  }
                });
              }
            }
          }
          return parts;
        }
        function _getBounds(property, first, last, loop) {
          if (loop) {
            return;
          }
          let start = first[property];
          let end = last[property];
          if (property === "angle") {
            start = _normalizeAngle(start);
            end = _normalizeAngle(end);
          }
          return { property, start, end };
        }
        function _pointsFromSegments(boundary, line) {
          const { x = null, y = null } = boundary || {};
          const linePoints = line.points;
          const points = [];
          line.segments.forEach(({ start, end }) => {
            end = _findSegmentEnd(start, end, linePoints);
            const first = linePoints[start];
            const last = linePoints[end];
            if (y !== null) {
              points.push({ x: first.x, y });
              points.push({ x: last.x, y });
            } else if (x !== null) {
              points.push({ x, y: first.y });
              points.push({ x, y: last.y });
            }
          });
          return points;
        }
        function _findSegmentEnd(start, end, points) {
          for (; end > start; end--) {
            const point = points[end];
            if (!isNaN(point.x) && !isNaN(point.y)) {
              break;
            }
          }
          return end;
        }
        function _getEdge(a, b, prop, fn) {
          if (a && b) {
            return fn(a[prop], b[prop]);
          }
          return a ? a[prop] : b ? b[prop] : 0;
        }
        function _createBoundaryLine(boundary, line) {
          let points = [];
          let _loop = false;
          if (isArray2(boundary)) {
            _loop = true;
            points = boundary;
          } else {
            points = _pointsFromSegments(boundary, line);
          }
          return points.length ? new LineElement({
            points,
            options: { tension: 0 },
            _loop,
            _fullLoop: _loop
          }) : null;
        }
        function _shouldApplyFill(source) {
          return source && source.fill !== false;
        }
        function _resolveTarget(sources, index3, propagate) {
          const source = sources[index3];
          let fill2 = source.fill;
          const visited = [index3];
          let target2;
          if (!propagate) {
            return fill2;
          }
          while (fill2 !== false && visited.indexOf(fill2) === -1) {
            if (!isNumberFinite(fill2)) {
              return fill2;
            }
            target2 = sources[fill2];
            if (!target2) {
              return false;
            }
            if (target2.visible) {
              return fill2;
            }
            visited.push(fill2);
            fill2 = target2.fill;
          }
          return false;
        }
        function _decodeFill(line, index3, count) {
          const fill2 = parseFillOption(line);
          if (isObject2(fill2)) {
            return isNaN(fill2.value) ? false : fill2;
          }
          let target2 = parseFloat(fill2);
          if (isNumberFinite(target2) && Math.floor(target2) === target2) {
            return decodeTargetIndex(fill2[0], index3, target2, count);
          }
          return ["origin", "start", "end", "stack", "shape"].indexOf(fill2) >= 0 && fill2;
        }
        function decodeTargetIndex(firstCh, index3, target2, count) {
          if (firstCh === "-" || firstCh === "+") {
            target2 = index3 + target2;
          }
          if (target2 === index3 || target2 < 0 || target2 >= count) {
            return false;
          }
          return target2;
        }
        function _getTargetPixel(fill2, scale) {
          let pixel = null;
          if (fill2 === "start") {
            pixel = scale.bottom;
          } else if (fill2 === "end") {
            pixel = scale.top;
          } else if (isObject2(fill2)) {
            pixel = scale.getPixelForValue(fill2.value);
          } else if (scale.getBasePixel) {
            pixel = scale.getBasePixel();
          }
          return pixel;
        }
        function _getTargetValue(fill2, scale, startValue) {
          let value;
          if (fill2 === "start") {
            value = startValue;
          } else if (fill2 === "end") {
            value = scale.options.reverse ? scale.min : scale.max;
          } else if (isObject2(fill2)) {
            value = fill2.value;
          } else {
            value = scale.getBaseValue();
          }
          return value;
        }
        function parseFillOption(line) {
          const options = line.options;
          const fillOption = options.fill;
          let fill2 = valueOrDefault(fillOption && fillOption.target, fillOption);
          if (fill2 === void 0) {
            fill2 = !!options.backgroundColor;
          }
          if (fill2 === false || fill2 === null) {
            return false;
          }
          if (fill2 === true) {
            return "origin";
          }
          return fill2;
        }
        function _buildStackLine(source) {
          const { scale, index: index3, line } = source;
          const points = [];
          const segments = line.segments;
          const sourcePoints = line.points;
          const linesBelow = getLinesBelow(scale, index3);
          linesBelow.push(_createBoundaryLine({ x: null, y: scale.bottom }, line));
          for (let i = 0; i < segments.length; i++) {
            const segment = segments[i];
            for (let j = segment.start; j <= segment.end; j++) {
              addPointsBelow(points, sourcePoints[j], linesBelow);
            }
          }
          return new LineElement({ points, options: {} });
        }
        function getLinesBelow(scale, index3) {
          const below = [];
          const metas = scale.getMatchingVisibleMetas("line");
          for (let i = 0; i < metas.length; i++) {
            const meta = metas[i];
            if (meta.index === index3) {
              break;
            }
            if (!meta.hidden) {
              below.unshift(meta.dataset);
            }
          }
          return below;
        }
        function addPointsBelow(points, sourcePoint, linesBelow) {
          const postponed = [];
          for (let j = 0; j < linesBelow.length; j++) {
            const line = linesBelow[j];
            const { first, last, point } = findPoint(line, sourcePoint, "x");
            if (!point || first && last) {
              continue;
            }
            if (first) {
              postponed.unshift(point);
            } else {
              points.push(point);
              if (!last) {
                break;
              }
            }
          }
          points.push(...postponed);
        }
        function findPoint(line, sourcePoint, property) {
          const point = line.interpolate(sourcePoint, property);
          if (!point) {
            return {};
          }
          const pointValue = point[property];
          const segments = line.segments;
          const linePoints = line.points;
          let first = false;
          let last = false;
          for (let i = 0; i < segments.length; i++) {
            const segment = segments[i];
            const firstValue = linePoints[segment.start][property];
            const lastValue = linePoints[segment.end][property];
            if (_isBetween(pointValue, firstValue, lastValue)) {
              first = pointValue === firstValue;
              last = pointValue === lastValue;
              break;
            }
          }
          return { first, last, point };
        }
        class simpleArc {
          constructor(opts) {
            this.x = opts.x;
            this.y = opts.y;
            this.radius = opts.radius;
          }
          pathSegment(ctx, bounds, opts) {
            const { x, y, radius } = this;
            bounds = bounds || { start: 0, end: TAU };
            ctx.arc(x, y, radius, bounds.end, bounds.start, true);
            return !opts.bounds;
          }
          interpolate(point) {
            const { x, y, radius } = this;
            const angle = point.angle;
            return {
              x: x + Math.cos(angle) * radius,
              y: y + Math.sin(angle) * radius,
              angle
            };
          }
        }
        function _getTarget(source) {
          const { chart, fill: fill2, line } = source;
          if (isNumberFinite(fill2)) {
            return getLineByIndex(chart, fill2);
          }
          if (fill2 === "stack") {
            return _buildStackLine(source);
          }
          if (fill2 === "shape") {
            return true;
          }
          const boundary = computeBoundary(source);
          if (boundary instanceof simpleArc) {
            return boundary;
          }
          return _createBoundaryLine(boundary, line);
        }
        function getLineByIndex(chart, index3) {
          const meta = chart.getDatasetMeta(index3);
          const visible = meta && chart.isDatasetVisible(index3);
          return visible ? meta.dataset : null;
        }
        function computeBoundary(source) {
          const scale = source.scale || {};
          if (scale.getPointPositionForValue) {
            return computeCircularBoundary(source);
          }
          return computeLinearBoundary(source);
        }
        function computeLinearBoundary(source) {
          const { scale = {}, fill: fill2 } = source;
          const pixel = _getTargetPixel(fill2, scale);
          if (isNumberFinite(pixel)) {
            const horizontal = scale.isHorizontal();
            return {
              x: horizontal ? pixel : null,
              y: horizontal ? null : pixel
            };
          }
          return null;
        }
        function computeCircularBoundary(source) {
          const { scale, fill: fill2 } = source;
          const options = scale.options;
          const length = scale.getLabels().length;
          const start = options.reverse ? scale.max : scale.min;
          const value = _getTargetValue(fill2, scale, start);
          const target2 = [];
          if (options.grid.circular) {
            const center = scale.getPointPositionForValue(0, start);
            return new simpleArc({
              x: center.x,
              y: center.y,
              radius: scale.getDistanceFromCenterForValue(value)
            });
          }
          for (let i = 0; i < length; ++i) {
            target2.push(scale.getPointPositionForValue(i, value));
          }
          return target2;
        }
        function _drawfill(ctx, source, area) {
          const target2 = _getTarget(source);
          const { line, scale, axis } = source;
          const lineOpts = line.options;
          const fillOption = lineOpts.fill;
          const color2 = lineOpts.backgroundColor;
          const { above = color2, below = color2 } = fillOption || {};
          if (target2 && line.points.length) {
            clipArea(ctx, area);
            doFill(ctx, { line, target: target2, above, below, area, scale, axis });
            unclipArea(ctx);
          }
        }
        function doFill(ctx, cfg) {
          const { line, target: target2, above, below, area, scale } = cfg;
          const property = line._loop ? "angle" : cfg.axis;
          ctx.save();
          if (property === "x" && below !== above) {
            clipVertical(ctx, target2, area.top);
            fill(ctx, { line, target: target2, color: above, scale, property });
            ctx.restore();
            ctx.save();
            clipVertical(ctx, target2, area.bottom);
          }
          fill(ctx, { line, target: target2, color: below, scale, property });
          ctx.restore();
        }
        function clipVertical(ctx, target2, clipY) {
          const { segments, points } = target2;
          let first = true;
          let lineLoop = false;
          ctx.beginPath();
          for (const segment of segments) {
            const { start, end } = segment;
            const firstPoint = points[start];
            const lastPoint = points[_findSegmentEnd(start, end, points)];
            if (first) {
              ctx.moveTo(firstPoint.x, firstPoint.y);
              first = false;
            } else {
              ctx.lineTo(firstPoint.x, clipY);
              ctx.lineTo(firstPoint.x, firstPoint.y);
            }
            lineLoop = !!target2.pathSegment(ctx, segment, { move: lineLoop });
            if (lineLoop) {
              ctx.closePath();
            } else {
              ctx.lineTo(lastPoint.x, clipY);
            }
          }
          ctx.lineTo(target2.first().x, clipY);
          ctx.closePath();
          ctx.clip();
        }
        function fill(ctx, cfg) {
          const { line, target: target2, property, color: color2, scale } = cfg;
          const segments = _segments(line, target2, property);
          for (const { source: src, target: tgt, start, end } of segments) {
            const { style: { backgroundColor = color2 } = {} } = src;
            const notShape = target2 !== true;
            ctx.save();
            ctx.fillStyle = backgroundColor;
            clipBounds(ctx, scale, notShape && _getBounds(property, start, end));
            ctx.beginPath();
            const lineLoop = !!line.pathSegment(ctx, src);
            let loop;
            if (notShape) {
              if (lineLoop) {
                ctx.closePath();
              } else {
                interpolatedLineTo(ctx, target2, end, property);
              }
              const targetLoop = !!target2.pathSegment(ctx, tgt, { move: lineLoop, reverse: true });
              loop = lineLoop && targetLoop;
              if (!loop) {
                interpolatedLineTo(ctx, target2, start, property);
              }
            }
            ctx.closePath();
            ctx.fill(loop ? "evenodd" : "nonzero");
            ctx.restore();
          }
        }
        function clipBounds(ctx, scale, bounds) {
          const { top, bottom } = scale.chart.chartArea;
          const { property, start, end } = bounds || {};
          if (property === "x") {
            ctx.beginPath();
            ctx.rect(start, top, end - start, bottom - top);
            ctx.clip();
          }
        }
        function interpolatedLineTo(ctx, target2, point, property) {
          const interpolatedPoint = target2.interpolate(point, property);
          if (interpolatedPoint) {
            ctx.lineTo(interpolatedPoint.x, interpolatedPoint.y);
          }
        }
        var index2 = {
          id: "filler",
          afterDatasetsUpdate(chart, _args, options) {
            const count = (chart.data.datasets || []).length;
            const sources = [];
            let meta, i, line, source;
            for (i = 0; i < count; ++i) {
              meta = chart.getDatasetMeta(i);
              line = meta.dataset;
              source = null;
              if (line && line.options && line instanceof LineElement) {
                source = {
                  visible: chart.isDatasetVisible(i),
                  index: i,
                  fill: _decodeFill(line, i, count),
                  chart,
                  axis: meta.controller.options.indexAxis,
                  scale: meta.vScale,
                  line
                };
              }
              meta.$filler = source;
              sources.push(source);
            }
            for (i = 0; i < count; ++i) {
              source = sources[i];
              if (!source || source.fill === false) {
                continue;
              }
              source.fill = _resolveTarget(sources, i, options.propagate);
            }
          },
          beforeDraw(chart, _args, options) {
            const draw2 = options.drawTime === "beforeDraw";
            const metasets = chart.getSortedVisibleDatasetMetas();
            const area = chart.chartArea;
            for (let i = metasets.length - 1; i >= 0; --i) {
              const source = metasets[i].$filler;
              if (!source) {
                continue;
              }
              source.line.updateControlPoints(area, source.axis);
              if (draw2 && source.fill) {
                _drawfill(chart.ctx, source, area);
              }
            }
          },
          beforeDatasetsDraw(chart, _args, options) {
            if (options.drawTime !== "beforeDatasetsDraw") {
              return;
            }
            const metasets = chart.getSortedVisibleDatasetMetas();
            for (let i = metasets.length - 1; i >= 0; --i) {
              const source = metasets[i].$filler;
              if (_shouldApplyFill(source)) {
                _drawfill(chart.ctx, source, chart.chartArea);
              }
            }
          },
          beforeDatasetDraw(chart, args, options) {
            const source = args.meta.$filler;
            if (!_shouldApplyFill(source) || options.drawTime !== "beforeDatasetDraw") {
              return;
            }
            _drawfill(chart.ctx, source, chart.chartArea);
          },
          defaults: {
            propagate: true,
            drawTime: "beforeDatasetDraw"
          }
        };
        const getBoxSize = (labelOpts, fontSize) => {
          let { boxHeight = fontSize, boxWidth = fontSize } = labelOpts;
          if (labelOpts.usePointStyle) {
            boxHeight = Math.min(boxHeight, fontSize);
            boxWidth = labelOpts.pointStyleWidth || Math.min(boxWidth, fontSize);
          }
          return {
            boxWidth,
            boxHeight,
            itemHeight: Math.max(fontSize, boxHeight)
          };
        };
        const itemsEqual = (a, b) => a !== null && b !== null && a.datasetIndex === b.datasetIndex && a.index === b.index;
        class Legend extends Element {
          constructor(config2) {
            super();
            this._added = false;
            this.legendHitBoxes = [];
            this._hoveredItem = null;
            this.doughnutMode = false;
            this.chart = config2.chart;
            this.options = config2.options;
            this.ctx = config2.ctx;
            this.legendItems = void 0;
            this.columnSizes = void 0;
            this.lineWidths = void 0;
            this.maxHeight = void 0;
            this.maxWidth = void 0;
            this.top = void 0;
            this.bottom = void 0;
            this.left = void 0;
            this.right = void 0;
            this.height = void 0;
            this.width = void 0;
            this._margins = void 0;
            this.position = void 0;
            this.weight = void 0;
            this.fullSize = void 0;
          }
          update(maxWidth, maxHeight, margins) {
            this.maxWidth = maxWidth;
            this.maxHeight = maxHeight;
            this._margins = margins;
            this.setDimensions();
            this.buildLabels();
            this.fit();
          }
          setDimensions() {
            if (this.isHorizontal()) {
              this.width = this.maxWidth;
              this.left = this._margins.left;
              this.right = this.width;
            } else {
              this.height = this.maxHeight;
              this.top = this._margins.top;
              this.bottom = this.height;
            }
          }
          buildLabels() {
            const labelOpts = this.options.labels || {};
            let legendItems = callback(labelOpts.generateLabels, [this.chart], this) || [];
            if (labelOpts.filter) {
              legendItems = legendItems.filter((item) => labelOpts.filter(item, this.chart.data));
            }
            if (labelOpts.sort) {
              legendItems = legendItems.sort((a, b) => labelOpts.sort(a, b, this.chart.data));
            }
            if (this.options.reverse) {
              legendItems.reverse();
            }
            this.legendItems = legendItems;
          }
          fit() {
            const { options, ctx } = this;
            if (!options.display) {
              this.width = this.height = 0;
              return;
            }
            const labelOpts = options.labels;
            const labelFont = toFont(labelOpts.font);
            const fontSize = labelFont.size;
            const titleHeight = this._computeTitleHeight();
            const { boxWidth, itemHeight } = getBoxSize(labelOpts, fontSize);
            let width, height;
            ctx.font = labelFont.string;
            if (this.isHorizontal()) {
              width = this.maxWidth;
              height = this._fitRows(titleHeight, fontSize, boxWidth, itemHeight) + 10;
            } else {
              height = this.maxHeight;
              width = this._fitCols(titleHeight, fontSize, boxWidth, itemHeight) + 10;
            }
            this.width = Math.min(width, options.maxWidth || this.maxWidth);
            this.height = Math.min(height, options.maxHeight || this.maxHeight);
          }
          _fitRows(titleHeight, fontSize, boxWidth, itemHeight) {
            const { ctx, maxWidth, options: { labels: { padding } } } = this;
            const hitboxes = this.legendHitBoxes = [];
            const lineWidths = this.lineWidths = [0];
            const lineHeight = itemHeight + padding;
            let totalHeight = titleHeight;
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            let row = -1;
            let top = -lineHeight;
            this.legendItems.forEach((legendItem, i) => {
              const itemWidth = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;
              if (i === 0 || lineWidths[lineWidths.length - 1] + itemWidth + 2 * padding > maxWidth) {
                totalHeight += lineHeight;
                lineWidths[lineWidths.length - (i > 0 ? 0 : 1)] = 0;
                top += lineHeight;
                row++;
              }
              hitboxes[i] = { left: 0, top, row, width: itemWidth, height: itemHeight };
              lineWidths[lineWidths.length - 1] += itemWidth + padding;
            });
            return totalHeight;
          }
          _fitCols(titleHeight, fontSize, boxWidth, itemHeight) {
            const { ctx, maxHeight, options: { labels: { padding } } } = this;
            const hitboxes = this.legendHitBoxes = [];
            const columnSizes = this.columnSizes = [];
            const heightLimit = maxHeight - titleHeight;
            let totalWidth = padding;
            let currentColWidth = 0;
            let currentColHeight = 0;
            let left = 0;
            let col = 0;
            this.legendItems.forEach((legendItem, i) => {
              const itemWidth = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;
              if (i > 0 && currentColHeight + itemHeight + 2 * padding > heightLimit) {
                totalWidth += currentColWidth + padding;
                columnSizes.push({ width: currentColWidth, height: currentColHeight });
                left += currentColWidth + padding;
                col++;
                currentColWidth = currentColHeight = 0;
              }
              hitboxes[i] = { left, top: currentColHeight, col, width: itemWidth, height: itemHeight };
              currentColWidth = Math.max(currentColWidth, itemWidth);
              currentColHeight += itemHeight + padding;
            });
            totalWidth += currentColWidth;
            columnSizes.push({ width: currentColWidth, height: currentColHeight });
            return totalWidth;
          }
          adjustHitBoxes() {
            if (!this.options.display) {
              return;
            }
            const titleHeight = this._computeTitleHeight();
            const { legendHitBoxes: hitboxes, options: { align, labels: { padding }, rtl } } = this;
            const rtlHelper = getRtlAdapter(rtl, this.left, this.width);
            if (this.isHorizontal()) {
              let row = 0;
              let left = _alignStartEnd(align, this.left + padding, this.right - this.lineWidths[row]);
              for (const hitbox of hitboxes) {
                if (row !== hitbox.row) {
                  row = hitbox.row;
                  left = _alignStartEnd(align, this.left + padding, this.right - this.lineWidths[row]);
                }
                hitbox.top += this.top + titleHeight + padding;
                hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(left), hitbox.width);
                left += hitbox.width + padding;
              }
            } else {
              let col = 0;
              let top = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
              for (const hitbox of hitboxes) {
                if (hitbox.col !== col) {
                  col = hitbox.col;
                  top = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
                }
                hitbox.top = top;
                hitbox.left += this.left + padding;
                hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(hitbox.left), hitbox.width);
                top += hitbox.height + padding;
              }
            }
          }
          isHorizontal() {
            return this.options.position === "top" || this.options.position === "bottom";
          }
          draw() {
            if (this.options.display) {
              const ctx = this.ctx;
              clipArea(ctx, this);
              this._draw();
              unclipArea(ctx);
            }
          }
          _draw() {
            const { options: opts, columnSizes, lineWidths, ctx } = this;
            const { align, labels: labelOpts } = opts;
            const defaultColor = defaults.color;
            const rtlHelper = getRtlAdapter(opts.rtl, this.left, this.width);
            const labelFont = toFont(labelOpts.font);
            const { color: fontColor, padding } = labelOpts;
            const fontSize = labelFont.size;
            const halfFontSize = fontSize / 2;
            let cursor;
            this.drawTitle();
            ctx.textAlign = rtlHelper.textAlign("left");
            ctx.textBaseline = "middle";
            ctx.lineWidth = 0.5;
            ctx.font = labelFont.string;
            const { boxWidth, boxHeight, itemHeight } = getBoxSize(labelOpts, fontSize);
            const drawLegendBox = function(x, y, legendItem) {
              if (isNaN(boxWidth) || boxWidth <= 0 || isNaN(boxHeight) || boxHeight < 0) {
                return;
              }
              ctx.save();
              const lineWidth = valueOrDefault(legendItem.lineWidth, 1);
              ctx.fillStyle = valueOrDefault(legendItem.fillStyle, defaultColor);
              ctx.lineCap = valueOrDefault(legendItem.lineCap, "butt");
              ctx.lineDashOffset = valueOrDefault(legendItem.lineDashOffset, 0);
              ctx.lineJoin = valueOrDefault(legendItem.lineJoin, "miter");
              ctx.lineWidth = lineWidth;
              ctx.strokeStyle = valueOrDefault(legendItem.strokeStyle, defaultColor);
              ctx.setLineDash(valueOrDefault(legendItem.lineDash, []));
              if (labelOpts.usePointStyle) {
                const drawOptions = {
                  radius: boxHeight * Math.SQRT2 / 2,
                  pointStyle: legendItem.pointStyle,
                  rotation: legendItem.rotation,
                  borderWidth: lineWidth
                };
                const centerX = rtlHelper.xPlus(x, boxWidth / 2);
                const centerY = y + halfFontSize;
                drawPointLegend(ctx, drawOptions, centerX, centerY, labelOpts.pointStyleWidth && boxWidth);
              } else {
                const yBoxTop = y + Math.max((fontSize - boxHeight) / 2, 0);
                const xBoxLeft = rtlHelper.leftForLtr(x, boxWidth);
                const borderRadius = toTRBLCorners(legendItem.borderRadius);
                ctx.beginPath();
                if (Object.values(borderRadius).some((v) => v !== 0)) {
                  addRoundedRectPath(ctx, {
                    x: xBoxLeft,
                    y: yBoxTop,
                    w: boxWidth,
                    h: boxHeight,
                    radius: borderRadius
                  });
                } else {
                  ctx.rect(xBoxLeft, yBoxTop, boxWidth, boxHeight);
                }
                ctx.fill();
                if (lineWidth !== 0) {
                  ctx.stroke();
                }
              }
              ctx.restore();
            };
            const fillText = function(x, y, legendItem) {
              renderText(ctx, legendItem.text, x, y + itemHeight / 2, labelFont, {
                strikethrough: legendItem.hidden,
                textAlign: rtlHelper.textAlign(legendItem.textAlign)
              });
            };
            const isHorizontal = this.isHorizontal();
            const titleHeight = this._computeTitleHeight();
            if (isHorizontal) {
              cursor = {
                x: _alignStartEnd(align, this.left + padding, this.right - lineWidths[0]),
                y: this.top + padding + titleHeight,
                line: 0
              };
            } else {
              cursor = {
                x: this.left + padding,
                y: _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - columnSizes[0].height),
                line: 0
              };
            }
            overrideTextDirection(this.ctx, opts.textDirection);
            const lineHeight = itemHeight + padding;
            this.legendItems.forEach((legendItem, i) => {
              ctx.strokeStyle = legendItem.fontColor || fontColor;
              ctx.fillStyle = legendItem.fontColor || fontColor;
              const textWidth = ctx.measureText(legendItem.text).width;
              const textAlign = rtlHelper.textAlign(legendItem.textAlign || (legendItem.textAlign = labelOpts.textAlign));
              const width = boxWidth + halfFontSize + textWidth;
              let x = cursor.x;
              let y = cursor.y;
              rtlHelper.setWidth(this.width);
              if (isHorizontal) {
                if (i > 0 && x + width + padding > this.right) {
                  y = cursor.y += lineHeight;
                  cursor.line++;
                  x = cursor.x = _alignStartEnd(align, this.left + padding, this.right - lineWidths[cursor.line]);
                }
              } else if (i > 0 && y + lineHeight > this.bottom) {
                x = cursor.x = x + columnSizes[cursor.line].width + padding;
                cursor.line++;
                y = cursor.y = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - columnSizes[cursor.line].height);
              }
              const realX = rtlHelper.x(x);
              drawLegendBox(realX, y, legendItem);
              x = _textX(textAlign, x + boxWidth + halfFontSize, isHorizontal ? x + width : this.right, opts.rtl);
              fillText(rtlHelper.x(x), y, legendItem);
              if (isHorizontal) {
                cursor.x += width + padding;
              } else {
                cursor.y += lineHeight;
              }
            });
            restoreTextDirection(this.ctx, opts.textDirection);
          }
          drawTitle() {
            const opts = this.options;
            const titleOpts = opts.title;
            const titleFont = toFont(titleOpts.font);
            const titlePadding = toPadding(titleOpts.padding);
            if (!titleOpts.display) {
              return;
            }
            const rtlHelper = getRtlAdapter(opts.rtl, this.left, this.width);
            const ctx = this.ctx;
            const position = titleOpts.position;
            const halfFontSize = titleFont.size / 2;
            const topPaddingPlusHalfFontSize = titlePadding.top + halfFontSize;
            let y;
            let left = this.left;
            let maxWidth = this.width;
            if (this.isHorizontal()) {
              maxWidth = Math.max(...this.lineWidths);
              y = this.top + topPaddingPlusHalfFontSize;
              left = _alignStartEnd(opts.align, left, this.right - maxWidth);
            } else {
              const maxHeight = this.columnSizes.reduce((acc, size) => Math.max(acc, size.height), 0);
              y = topPaddingPlusHalfFontSize + _alignStartEnd(opts.align, this.top, this.bottom - maxHeight - opts.labels.padding - this._computeTitleHeight());
            }
            const x = _alignStartEnd(position, left, left + maxWidth);
            ctx.textAlign = rtlHelper.textAlign(_toLeftRightCenter(position));
            ctx.textBaseline = "middle";
            ctx.strokeStyle = titleOpts.color;
            ctx.fillStyle = titleOpts.color;
            ctx.font = titleFont.string;
            renderText(ctx, titleOpts.text, x, y, titleFont);
          }
          _computeTitleHeight() {
            const titleOpts = this.options.title;
            const titleFont = toFont(titleOpts.font);
            const titlePadding = toPadding(titleOpts.padding);
            return titleOpts.display ? titleFont.lineHeight + titlePadding.height : 0;
          }
          _getLegendItemAt(x, y) {
            let i, hitBox, lh;
            if (_isBetween(x, this.left, this.right) && _isBetween(y, this.top, this.bottom)) {
              lh = this.legendHitBoxes;
              for (i = 0; i < lh.length; ++i) {
                hitBox = lh[i];
                if (_isBetween(x, hitBox.left, hitBox.left + hitBox.width) && _isBetween(y, hitBox.top, hitBox.top + hitBox.height)) {
                  return this.legendItems[i];
                }
              }
            }
            return null;
          }
          handleEvent(e) {
            const opts = this.options;
            if (!isListened(e.type, opts)) {
              return;
            }
            const hoveredItem = this._getLegendItemAt(e.x, e.y);
            if (e.type === "mousemove" || e.type === "mouseout") {
              const previous = this._hoveredItem;
              const sameItem = itemsEqual(previous, hoveredItem);
              if (previous && !sameItem) {
                callback(opts.onLeave, [e, previous, this], this);
              }
              this._hoveredItem = hoveredItem;
              if (hoveredItem && !sameItem) {
                callback(opts.onHover, [e, hoveredItem, this], this);
              }
            } else if (hoveredItem) {
              callback(opts.onClick, [e, hoveredItem, this], this);
            }
          }
        }
        function isListened(type, opts) {
          if ((type === "mousemove" || type === "mouseout") && (opts.onHover || opts.onLeave)) {
            return true;
          }
          if (opts.onClick && (type === "click" || type === "mouseup")) {
            return true;
          }
          return false;
        }
        var plugin_legend = {
          id: "legend",
          _element: Legend,
          start(chart, _args, options) {
            const legend = chart.legend = new Legend({ ctx: chart.ctx, options, chart });
            layouts.configure(chart, legend, options);
            layouts.addBox(chart, legend);
          },
          stop(chart) {
            layouts.removeBox(chart, chart.legend);
            delete chart.legend;
          },
          beforeUpdate(chart, _args, options) {
            const legend = chart.legend;
            layouts.configure(chart, legend, options);
            legend.options = options;
          },
          afterUpdate(chart) {
            const legend = chart.legend;
            legend.buildLabels();
            legend.adjustHitBoxes();
          },
          afterEvent(chart, args) {
            if (!args.replay) {
              chart.legend.handleEvent(args.event);
            }
          },
          defaults: {
            display: true,
            position: "top",
            align: "center",
            fullSize: true,
            reverse: false,
            weight: 1e3,
            onClick(e, legendItem, legend) {
              const index3 = legendItem.datasetIndex;
              const ci = legend.chart;
              if (ci.isDatasetVisible(index3)) {
                ci.hide(index3);
                legendItem.hidden = true;
              } else {
                ci.show(index3);
                legendItem.hidden = false;
              }
            },
            onHover: null,
            onLeave: null,
            labels: {
              color: (ctx) => ctx.chart.options.color,
              boxWidth: 40,
              padding: 10,
              generateLabels(chart) {
                const datasets = chart.data.datasets;
                const { labels: { usePointStyle, pointStyle, textAlign, color: color2 } } = chart.legend.options;
                return chart._getSortedDatasetMetas().map((meta) => {
                  const style2 = meta.controller.getStyle(usePointStyle ? 0 : void 0);
                  const borderWidth = toPadding(style2.borderWidth);
                  return {
                    text: datasets[meta.index].label,
                    fillStyle: style2.backgroundColor,
                    fontColor: color2,
                    hidden: !meta.visible,
                    lineCap: style2.borderCapStyle,
                    lineDash: style2.borderDash,
                    lineDashOffset: style2.borderDashOffset,
                    lineJoin: style2.borderJoinStyle,
                    lineWidth: (borderWidth.width + borderWidth.height) / 4,
                    strokeStyle: style2.borderColor,
                    pointStyle: pointStyle || style2.pointStyle,
                    rotation: style2.rotation,
                    textAlign: textAlign || style2.textAlign,
                    borderRadius: 0,
                    datasetIndex: meta.index
                  };
                }, this);
              }
            },
            title: {
              color: (ctx) => ctx.chart.options.color,
              display: false,
              position: "center",
              text: ""
            }
          },
          descriptors: {
            _scriptable: (name) => !name.startsWith("on"),
            labels: {
              _scriptable: (name) => !["generateLabels", "filter", "sort"].includes(name)
            }
          }
        };
        class Title extends Element {
          constructor(config2) {
            super();
            this.chart = config2.chart;
            this.options = config2.options;
            this.ctx = config2.ctx;
            this._padding = void 0;
            this.top = void 0;
            this.bottom = void 0;
            this.left = void 0;
            this.right = void 0;
            this.width = void 0;
            this.height = void 0;
            this.position = void 0;
            this.weight = void 0;
            this.fullSize = void 0;
          }
          update(maxWidth, maxHeight) {
            const opts = this.options;
            this.left = 0;
            this.top = 0;
            if (!opts.display) {
              this.width = this.height = this.right = this.bottom = 0;
              return;
            }
            this.width = this.right = maxWidth;
            this.height = this.bottom = maxHeight;
            const lineCount = isArray2(opts.text) ? opts.text.length : 1;
            this._padding = toPadding(opts.padding);
            const textSize = lineCount * toFont(opts.font).lineHeight + this._padding.height;
            if (this.isHorizontal()) {
              this.height = textSize;
            } else {
              this.width = textSize;
            }
          }
          isHorizontal() {
            const pos = this.options.position;
            return pos === "top" || pos === "bottom";
          }
          _drawArgs(offset) {
            const { top, left, bottom, right, options } = this;
            const align = options.align;
            let rotation = 0;
            let maxWidth, titleX, titleY;
            if (this.isHorizontal()) {
              titleX = _alignStartEnd(align, left, right);
              titleY = top + offset;
              maxWidth = right - left;
            } else {
              if (options.position === "left") {
                titleX = left + offset;
                titleY = _alignStartEnd(align, bottom, top);
                rotation = PI * -0.5;
              } else {
                titleX = right - offset;
                titleY = _alignStartEnd(align, top, bottom);
                rotation = PI * 0.5;
              }
              maxWidth = bottom - top;
            }
            return { titleX, titleY, maxWidth, rotation };
          }
          draw() {
            const ctx = this.ctx;
            const opts = this.options;
            if (!opts.display) {
              return;
            }
            const fontOpts = toFont(opts.font);
            const lineHeight = fontOpts.lineHeight;
            const offset = lineHeight / 2 + this._padding.top;
            const { titleX, titleY, maxWidth, rotation } = this._drawArgs(offset);
            renderText(ctx, opts.text, 0, 0, fontOpts, {
              color: opts.color,
              maxWidth,
              rotation,
              textAlign: _toLeftRightCenter(opts.align),
              textBaseline: "middle",
              translation: [titleX, titleY]
            });
          }
        }
        function createTitle(chart, titleOpts) {
          const title = new Title({
            ctx: chart.ctx,
            options: titleOpts,
            chart
          });
          layouts.configure(chart, title, titleOpts);
          layouts.addBox(chart, title);
          chart.titleBlock = title;
        }
        var plugin_title = {
          id: "title",
          _element: Title,
          start(chart, _args, options) {
            createTitle(chart, options);
          },
          stop(chart) {
            const titleBlock = chart.titleBlock;
            layouts.removeBox(chart, titleBlock);
            delete chart.titleBlock;
          },
          beforeUpdate(chart, _args, options) {
            const title = chart.titleBlock;
            layouts.configure(chart, title, options);
            title.options = options;
          },
          defaults: {
            align: "center",
            display: false,
            font: {
              weight: "bold"
            },
            fullSize: true,
            padding: 10,
            position: "top",
            text: "",
            weight: 2e3
          },
          defaultRoutes: {
            color: "color"
          },
          descriptors: {
            _scriptable: true,
            _indexable: false
          }
        };
        const map = /* @__PURE__ */ new WeakMap();
        var plugin_subtitle = {
          id: "subtitle",
          start(chart, _args, options) {
            const title = new Title({
              ctx: chart.ctx,
              options,
              chart
            });
            layouts.configure(chart, title, options);
            layouts.addBox(chart, title);
            map.set(chart, title);
          },
          stop(chart) {
            layouts.removeBox(chart, map.get(chart));
            map.delete(chart);
          },
          beforeUpdate(chart, _args, options) {
            const title = map.get(chart);
            layouts.configure(chart, title, options);
            title.options = options;
          },
          defaults: {
            align: "center",
            display: false,
            font: {
              weight: "normal"
            },
            fullSize: true,
            padding: 0,
            position: "top",
            text: "",
            weight: 1500
          },
          defaultRoutes: {
            color: "color"
          },
          descriptors: {
            _scriptable: true,
            _indexable: false
          }
        };
        const positioners = {
          average(items) {
            if (!items.length) {
              return false;
            }
            let i, len2;
            let x = 0;
            let y = 0;
            let count = 0;
            for (i = 0, len2 = items.length; i < len2; ++i) {
              const el = items[i].element;
              if (el && el.hasValue()) {
                const pos = el.tooltipPosition();
                x += pos.x;
                y += pos.y;
                ++count;
              }
            }
            return {
              x: x / count,
              y: y / count
            };
          },
          nearest(items, eventPosition) {
            if (!items.length) {
              return false;
            }
            let x = eventPosition.x;
            let y = eventPosition.y;
            let minDistance = Number.POSITIVE_INFINITY;
            let i, len2, nearestElement;
            for (i = 0, len2 = items.length; i < len2; ++i) {
              const el = items[i].element;
              if (el && el.hasValue()) {
                const center = el.getCenterPoint();
                const d = distanceBetweenPoints(eventPosition, center);
                if (d < minDistance) {
                  minDistance = d;
                  nearestElement = el;
                }
              }
            }
            if (nearestElement) {
              const tp = nearestElement.tooltipPosition();
              x = tp.x;
              y = tp.y;
            }
            return {
              x,
              y
            };
          }
        };
        function pushOrConcat(base, toPush) {
          if (toPush) {
            if (isArray2(toPush)) {
              Array.prototype.push.apply(base, toPush);
            } else {
              base.push(toPush);
            }
          }
          return base;
        }
        function splitNewlines(str2) {
          if ((typeof str2 === "string" || str2 instanceof String) && str2.indexOf("\n") > -1) {
            return str2.split("\n");
          }
          return str2;
        }
        function createTooltipItem(chart, item) {
          const { element, datasetIndex, index: index3 } = item;
          const controller = chart.getDatasetMeta(datasetIndex).controller;
          const { label, value } = controller.getLabelAndValue(index3);
          return {
            chart,
            label,
            parsed: controller.getParsed(index3),
            raw: chart.data.datasets[datasetIndex].data[index3],
            formattedValue: value,
            dataset: controller.getDataset(),
            dataIndex: index3,
            datasetIndex,
            element
          };
        }
        function getTooltipSize(tooltip, options) {
          const ctx = tooltip.chart.ctx;
          const { body, footer, title } = tooltip;
          const { boxWidth, boxHeight } = options;
          const bodyFont = toFont(options.bodyFont);
          const titleFont = toFont(options.titleFont);
          const footerFont = toFont(options.footerFont);
          const titleLineCount = title.length;
          const footerLineCount = footer.length;
          const bodyLineItemCount = body.length;
          const padding = toPadding(options.padding);
          let height = padding.height;
          let width = 0;
          let combinedBodyLength = body.reduce((count, bodyItem) => count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length, 0);
          combinedBodyLength += tooltip.beforeBody.length + tooltip.afterBody.length;
          if (titleLineCount) {
            height += titleLineCount * titleFont.lineHeight + (titleLineCount - 1) * options.titleSpacing + options.titleMarginBottom;
          }
          if (combinedBodyLength) {
            const bodyLineHeight = options.displayColors ? Math.max(boxHeight, bodyFont.lineHeight) : bodyFont.lineHeight;
            height += bodyLineItemCount * bodyLineHeight + (combinedBodyLength - bodyLineItemCount) * bodyFont.lineHeight + (combinedBodyLength - 1) * options.bodySpacing;
          }
          if (footerLineCount) {
            height += options.footerMarginTop + footerLineCount * footerFont.lineHeight + (footerLineCount - 1) * options.footerSpacing;
          }
          let widthPadding = 0;
          const maxLineWidth = function(line) {
            width = Math.max(width, ctx.measureText(line).width + widthPadding);
          };
          ctx.save();
          ctx.font = titleFont.string;
          each(tooltip.title, maxLineWidth);
          ctx.font = bodyFont.string;
          each(tooltip.beforeBody.concat(tooltip.afterBody), maxLineWidth);
          widthPadding = options.displayColors ? boxWidth + 2 + options.boxPadding : 0;
          each(body, (bodyItem) => {
            each(bodyItem.before, maxLineWidth);
            each(bodyItem.lines, maxLineWidth);
            each(bodyItem.after, maxLineWidth);
          });
          widthPadding = 0;
          ctx.font = footerFont.string;
          each(tooltip.footer, maxLineWidth);
          ctx.restore();
          width += padding.width;
          return { width, height };
        }
        function determineYAlign(chart, size) {
          const { y, height } = size;
          if (y < height / 2) {
            return "top";
          } else if (y > chart.height - height / 2) {
            return "bottom";
          }
          return "center";
        }
        function doesNotFitWithAlign(xAlign, chart, options, size) {
          const { x, width } = size;
          const caret = options.caretSize + options.caretPadding;
          if (xAlign === "left" && x + width + caret > chart.width) {
            return true;
          }
          if (xAlign === "right" && x - width - caret < 0) {
            return true;
          }
        }
        function determineXAlign(chart, options, size, yAlign) {
          const { x, width } = size;
          const { width: chartWidth, chartArea: { left, right } } = chart;
          let xAlign = "center";
          if (yAlign === "center") {
            xAlign = x <= (left + right) / 2 ? "left" : "right";
          } else if (x <= width / 2) {
            xAlign = "left";
          } else if (x >= chartWidth - width / 2) {
            xAlign = "right";
          }
          if (doesNotFitWithAlign(xAlign, chart, options, size)) {
            xAlign = "center";
          }
          return xAlign;
        }
        function determineAlignment(chart, options, size) {
          const yAlign = size.yAlign || options.yAlign || determineYAlign(chart, size);
          return {
            xAlign: size.xAlign || options.xAlign || determineXAlign(chart, options, size, yAlign),
            yAlign
          };
        }
        function alignX(size, xAlign) {
          let { x, width } = size;
          if (xAlign === "right") {
            x -= width;
          } else if (xAlign === "center") {
            x -= width / 2;
          }
          return x;
        }
        function alignY(size, yAlign, paddingAndSize) {
          let { y, height } = size;
          if (yAlign === "top") {
            y += paddingAndSize;
          } else if (yAlign === "bottom") {
            y -= height + paddingAndSize;
          } else {
            y -= height / 2;
          }
          return y;
        }
        function getBackgroundPoint(options, size, alignment, chart) {
          const { caretSize, caretPadding, cornerRadius } = options;
          const { xAlign, yAlign } = alignment;
          const paddingAndSize = caretSize + caretPadding;
          const { topLeft, topRight, bottomLeft, bottomRight } = toTRBLCorners(cornerRadius);
          let x = alignX(size, xAlign);
          const y = alignY(size, yAlign, paddingAndSize);
          if (yAlign === "center") {
            if (xAlign === "left") {
              x += paddingAndSize;
            } else if (xAlign === "right") {
              x -= paddingAndSize;
            }
          } else if (xAlign === "left") {
            x -= Math.max(topLeft, bottomLeft) + caretSize;
          } else if (xAlign === "right") {
            x += Math.max(topRight, bottomRight) + caretSize;
          }
          return {
            x: _limitValue(x, 0, chart.width - size.width),
            y: _limitValue(y, 0, chart.height - size.height)
          };
        }
        function getAlignedX(tooltip, align, options) {
          const padding = toPadding(options.padding);
          return align === "center" ? tooltip.x + tooltip.width / 2 : align === "right" ? tooltip.x + tooltip.width - padding.right : tooltip.x + padding.left;
        }
        function getBeforeAfterBodyLines(callback2) {
          return pushOrConcat([], splitNewlines(callback2));
        }
        function createTooltipContext(parent, tooltip, tooltipItems) {
          return createContext(parent, {
            tooltip,
            tooltipItems,
            type: "tooltip"
          });
        }
        function overrideCallbacks(callbacks2, context) {
          const override = context && context.dataset && context.dataset.tooltip && context.dataset.tooltip.callbacks;
          return override ? callbacks2.override(override) : callbacks2;
        }
        class Tooltip extends Element {
          constructor(config2) {
            super();
            this.opacity = 0;
            this._active = [];
            this._eventPosition = void 0;
            this._size = void 0;
            this._cachedAnimations = void 0;
            this._tooltipItems = [];
            this.$animations = void 0;
            this.$context = void 0;
            this.chart = config2.chart || config2._chart;
            this._chart = this.chart;
            this.options = config2.options;
            this.dataPoints = void 0;
            this.title = void 0;
            this.beforeBody = void 0;
            this.body = void 0;
            this.afterBody = void 0;
            this.footer = void 0;
            this.xAlign = void 0;
            this.yAlign = void 0;
            this.x = void 0;
            this.y = void 0;
            this.height = void 0;
            this.width = void 0;
            this.caretX = void 0;
            this.caretY = void 0;
            this.labelColors = void 0;
            this.labelPointStyles = void 0;
            this.labelTextColors = void 0;
          }
          initialize(options) {
            this.options = options;
            this._cachedAnimations = void 0;
            this.$context = void 0;
          }
          _resolveAnimations() {
            const cached2 = this._cachedAnimations;
            if (cached2) {
              return cached2;
            }
            const chart = this.chart;
            const options = this.options.setContext(this.getContext());
            const opts = options.enabled && chart.options.animation && options.animations;
            const animations = new Animations(this.chart, opts);
            if (opts._cacheable) {
              this._cachedAnimations = Object.freeze(animations);
            }
            return animations;
          }
          getContext() {
            return this.$context || (this.$context = createTooltipContext(this.chart.getContext(), this, this._tooltipItems));
          }
          getTitle(context, options) {
            const { callbacks: callbacks2 } = options;
            const beforeTitle = callbacks2.beforeTitle.apply(this, [context]);
            const title = callbacks2.title.apply(this, [context]);
            const afterTitle = callbacks2.afterTitle.apply(this, [context]);
            let lines = [];
            lines = pushOrConcat(lines, splitNewlines(beforeTitle));
            lines = pushOrConcat(lines, splitNewlines(title));
            lines = pushOrConcat(lines, splitNewlines(afterTitle));
            return lines;
          }
          getBeforeBody(tooltipItems, options) {
            return getBeforeAfterBodyLines(options.callbacks.beforeBody.apply(this, [tooltipItems]));
          }
          getBody(tooltipItems, options) {
            const { callbacks: callbacks2 } = options;
            const bodyItems = [];
            each(tooltipItems, (context) => {
              const bodyItem = {
                before: [],
                lines: [],
                after: []
              };
              const scoped = overrideCallbacks(callbacks2, context);
              pushOrConcat(bodyItem.before, splitNewlines(scoped.beforeLabel.call(this, context)));
              pushOrConcat(bodyItem.lines, scoped.label.call(this, context));
              pushOrConcat(bodyItem.after, splitNewlines(scoped.afterLabel.call(this, context)));
              bodyItems.push(bodyItem);
            });
            return bodyItems;
          }
          getAfterBody(tooltipItems, options) {
            return getBeforeAfterBodyLines(options.callbacks.afterBody.apply(this, [tooltipItems]));
          }
          getFooter(tooltipItems, options) {
            const { callbacks: callbacks2 } = options;
            const beforeFooter = callbacks2.beforeFooter.apply(this, [tooltipItems]);
            const footer = callbacks2.footer.apply(this, [tooltipItems]);
            const afterFooter = callbacks2.afterFooter.apply(this, [tooltipItems]);
            let lines = [];
            lines = pushOrConcat(lines, splitNewlines(beforeFooter));
            lines = pushOrConcat(lines, splitNewlines(footer));
            lines = pushOrConcat(lines, splitNewlines(afterFooter));
            return lines;
          }
          _createItems(options) {
            const active = this._active;
            const data = this.chart.data;
            const labelColors = [];
            const labelPointStyles = [];
            const labelTextColors = [];
            let tooltipItems = [];
            let i, len2;
            for (i = 0, len2 = active.length; i < len2; ++i) {
              tooltipItems.push(createTooltipItem(this.chart, active[i]));
            }
            if (options.filter) {
              tooltipItems = tooltipItems.filter((element, index3, array) => options.filter(element, index3, array, data));
            }
            if (options.itemSort) {
              tooltipItems = tooltipItems.sort((a, b) => options.itemSort(a, b, data));
            }
            each(tooltipItems, (context) => {
              const scoped = overrideCallbacks(options.callbacks, context);
              labelColors.push(scoped.labelColor.call(this, context));
              labelPointStyles.push(scoped.labelPointStyle.call(this, context));
              labelTextColors.push(scoped.labelTextColor.call(this, context));
            });
            this.labelColors = labelColors;
            this.labelPointStyles = labelPointStyles;
            this.labelTextColors = labelTextColors;
            this.dataPoints = tooltipItems;
            return tooltipItems;
          }
          update(changed, replay) {
            const options = this.options.setContext(this.getContext());
            const active = this._active;
            let properties;
            let tooltipItems = [];
            if (!active.length) {
              if (this.opacity !== 0) {
                properties = {
                  opacity: 0
                };
              }
            } else {
              const position = positioners[options.position].call(this, active, this._eventPosition);
              tooltipItems = this._createItems(options);
              this.title = this.getTitle(tooltipItems, options);
              this.beforeBody = this.getBeforeBody(tooltipItems, options);
              this.body = this.getBody(tooltipItems, options);
              this.afterBody = this.getAfterBody(tooltipItems, options);
              this.footer = this.getFooter(tooltipItems, options);
              const size = this._size = getTooltipSize(this, options);
              const positionAndSize = Object.assign({}, position, size);
              const alignment = determineAlignment(this.chart, options, positionAndSize);
              const backgroundPoint = getBackgroundPoint(options, positionAndSize, alignment, this.chart);
              this.xAlign = alignment.xAlign;
              this.yAlign = alignment.yAlign;
              properties = {
                opacity: 1,
                x: backgroundPoint.x,
                y: backgroundPoint.y,
                width: size.width,
                height: size.height,
                caretX: position.x,
                caretY: position.y
              };
            }
            this._tooltipItems = tooltipItems;
            this.$context = void 0;
            if (properties) {
              this._resolveAnimations().update(this, properties);
            }
            if (changed && options.external) {
              options.external.call(this, { chart: this.chart, tooltip: this, replay });
            }
          }
          drawCaret(tooltipPoint, ctx, size, options) {
            const caretPosition = this.getCaretPosition(tooltipPoint, size, options);
            ctx.lineTo(caretPosition.x1, caretPosition.y1);
            ctx.lineTo(caretPosition.x2, caretPosition.y2);
            ctx.lineTo(caretPosition.x3, caretPosition.y3);
          }
          getCaretPosition(tooltipPoint, size, options) {
            const { xAlign, yAlign } = this;
            const { caretSize, cornerRadius } = options;
            const { topLeft, topRight, bottomLeft, bottomRight } = toTRBLCorners(cornerRadius);
            const { x: ptX, y: ptY } = tooltipPoint;
            const { width, height } = size;
            let x1, x2, x3, y1, y2, y3;
            if (yAlign === "center") {
              y2 = ptY + height / 2;
              if (xAlign === "left") {
                x1 = ptX;
                x2 = x1 - caretSize;
                y1 = y2 + caretSize;
                y3 = y2 - caretSize;
              } else {
                x1 = ptX + width;
                x2 = x1 + caretSize;
                y1 = y2 - caretSize;
                y3 = y2 + caretSize;
              }
              x3 = x1;
            } else {
              if (xAlign === "left") {
                x2 = ptX + Math.max(topLeft, bottomLeft) + caretSize;
              } else if (xAlign === "right") {
                x2 = ptX + width - Math.max(topRight, bottomRight) - caretSize;
              } else {
                x2 = this.caretX;
              }
              if (yAlign === "top") {
                y1 = ptY;
                y2 = y1 - caretSize;
                x1 = x2 - caretSize;
                x3 = x2 + caretSize;
              } else {
                y1 = ptY + height;
                y2 = y1 + caretSize;
                x1 = x2 + caretSize;
                x3 = x2 - caretSize;
              }
              y3 = y1;
            }
            return { x1, x2, x3, y1, y2, y3 };
          }
          drawTitle(pt, ctx, options) {
            const title = this.title;
            const length = title.length;
            let titleFont, titleSpacing, i;
            if (length) {
              const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
              pt.x = getAlignedX(this, options.titleAlign, options);
              ctx.textAlign = rtlHelper.textAlign(options.titleAlign);
              ctx.textBaseline = "middle";
              titleFont = toFont(options.titleFont);
              titleSpacing = options.titleSpacing;
              ctx.fillStyle = options.titleColor;
              ctx.font = titleFont.string;
              for (i = 0; i < length; ++i) {
                ctx.fillText(title[i], rtlHelper.x(pt.x), pt.y + titleFont.lineHeight / 2);
                pt.y += titleFont.lineHeight + titleSpacing;
                if (i + 1 === length) {
                  pt.y += options.titleMarginBottom - titleSpacing;
                }
              }
            }
          }
          _drawColorBox(ctx, pt, i, rtlHelper, options) {
            const labelColors = this.labelColors[i];
            const labelPointStyle = this.labelPointStyles[i];
            const { boxHeight, boxWidth, boxPadding } = options;
            const bodyFont = toFont(options.bodyFont);
            const colorX = getAlignedX(this, "left", options);
            const rtlColorX = rtlHelper.x(colorX);
            const yOffSet = boxHeight < bodyFont.lineHeight ? (bodyFont.lineHeight - boxHeight) / 2 : 0;
            const colorY = pt.y + yOffSet;
            if (options.usePointStyle) {
              const drawOptions = {
                radius: Math.min(boxWidth, boxHeight) / 2,
                pointStyle: labelPointStyle.pointStyle,
                rotation: labelPointStyle.rotation,
                borderWidth: 1
              };
              const centerX = rtlHelper.leftForLtr(rtlColorX, boxWidth) + boxWidth / 2;
              const centerY = colorY + boxHeight / 2;
              ctx.strokeStyle = options.multiKeyBackground;
              ctx.fillStyle = options.multiKeyBackground;
              drawPoint(ctx, drawOptions, centerX, centerY);
              ctx.strokeStyle = labelColors.borderColor;
              ctx.fillStyle = labelColors.backgroundColor;
              drawPoint(ctx, drawOptions, centerX, centerY);
            } else {
              ctx.lineWidth = isObject2(labelColors.borderWidth) ? Math.max(...Object.values(labelColors.borderWidth)) : labelColors.borderWidth || 1;
              ctx.strokeStyle = labelColors.borderColor;
              ctx.setLineDash(labelColors.borderDash || []);
              ctx.lineDashOffset = labelColors.borderDashOffset || 0;
              const outerX = rtlHelper.leftForLtr(rtlColorX, boxWidth - boxPadding);
              const innerX = rtlHelper.leftForLtr(rtlHelper.xPlus(rtlColorX, 1), boxWidth - boxPadding - 2);
              const borderRadius = toTRBLCorners(labelColors.borderRadius);
              if (Object.values(borderRadius).some((v) => v !== 0)) {
                ctx.beginPath();
                ctx.fillStyle = options.multiKeyBackground;
                addRoundedRectPath(ctx, {
                  x: outerX,
                  y: colorY,
                  w: boxWidth,
                  h: boxHeight,
                  radius: borderRadius
                });
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = labelColors.backgroundColor;
                ctx.beginPath();
                addRoundedRectPath(ctx, {
                  x: innerX,
                  y: colorY + 1,
                  w: boxWidth - 2,
                  h: boxHeight - 2,
                  radius: borderRadius
                });
                ctx.fill();
              } else {
                ctx.fillStyle = options.multiKeyBackground;
                ctx.fillRect(outerX, colorY, boxWidth, boxHeight);
                ctx.strokeRect(outerX, colorY, boxWidth, boxHeight);
                ctx.fillStyle = labelColors.backgroundColor;
                ctx.fillRect(innerX, colorY + 1, boxWidth - 2, boxHeight - 2);
              }
            }
            ctx.fillStyle = this.labelTextColors[i];
          }
          drawBody(pt, ctx, options) {
            const { body } = this;
            const { bodySpacing, bodyAlign, displayColors, boxHeight, boxWidth, boxPadding } = options;
            const bodyFont = toFont(options.bodyFont);
            let bodyLineHeight = bodyFont.lineHeight;
            let xLinePadding = 0;
            const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
            const fillLineOfText = function(line) {
              ctx.fillText(line, rtlHelper.x(pt.x + xLinePadding), pt.y + bodyLineHeight / 2);
              pt.y += bodyLineHeight + bodySpacing;
            };
            const bodyAlignForCalculation = rtlHelper.textAlign(bodyAlign);
            let bodyItem, textColor, lines, i, j, ilen, jlen;
            ctx.textAlign = bodyAlign;
            ctx.textBaseline = "middle";
            ctx.font = bodyFont.string;
            pt.x = getAlignedX(this, bodyAlignForCalculation, options);
            ctx.fillStyle = options.bodyColor;
            each(this.beforeBody, fillLineOfText);
            xLinePadding = displayColors && bodyAlignForCalculation !== "right" ? bodyAlign === "center" ? boxWidth / 2 + boxPadding : boxWidth + 2 + boxPadding : 0;
            for (i = 0, ilen = body.length; i < ilen; ++i) {
              bodyItem = body[i];
              textColor = this.labelTextColors[i];
              ctx.fillStyle = textColor;
              each(bodyItem.before, fillLineOfText);
              lines = bodyItem.lines;
              if (displayColors && lines.length) {
                this._drawColorBox(ctx, pt, i, rtlHelper, options);
                bodyLineHeight = Math.max(bodyFont.lineHeight, boxHeight);
              }
              for (j = 0, jlen = lines.length; j < jlen; ++j) {
                fillLineOfText(lines[j]);
                bodyLineHeight = bodyFont.lineHeight;
              }
              each(bodyItem.after, fillLineOfText);
            }
            xLinePadding = 0;
            bodyLineHeight = bodyFont.lineHeight;
            each(this.afterBody, fillLineOfText);
            pt.y -= bodySpacing;
          }
          drawFooter(pt, ctx, options) {
            const footer = this.footer;
            const length = footer.length;
            let footerFont, i;
            if (length) {
              const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
              pt.x = getAlignedX(this, options.footerAlign, options);
              pt.y += options.footerMarginTop;
              ctx.textAlign = rtlHelper.textAlign(options.footerAlign);
              ctx.textBaseline = "middle";
              footerFont = toFont(options.footerFont);
              ctx.fillStyle = options.footerColor;
              ctx.font = footerFont.string;
              for (i = 0; i < length; ++i) {
                ctx.fillText(footer[i], rtlHelper.x(pt.x), pt.y + footerFont.lineHeight / 2);
                pt.y += footerFont.lineHeight + options.footerSpacing;
              }
            }
          }
          drawBackground(pt, ctx, tooltipSize, options) {
            const { xAlign, yAlign } = this;
            const { x, y } = pt;
            const { width, height } = tooltipSize;
            const { topLeft, topRight, bottomLeft, bottomRight } = toTRBLCorners(options.cornerRadius);
            ctx.fillStyle = options.backgroundColor;
            ctx.strokeStyle = options.borderColor;
            ctx.lineWidth = options.borderWidth;
            ctx.beginPath();
            ctx.moveTo(x + topLeft, y);
            if (yAlign === "top") {
              this.drawCaret(pt, ctx, tooltipSize, options);
            }
            ctx.lineTo(x + width - topRight, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + topRight);
            if (yAlign === "center" && xAlign === "right") {
              this.drawCaret(pt, ctx, tooltipSize, options);
            }
            ctx.lineTo(x + width, y + height - bottomRight);
            ctx.quadraticCurveTo(x + width, y + height, x + width - bottomRight, y + height);
            if (yAlign === "bottom") {
              this.drawCaret(pt, ctx, tooltipSize, options);
            }
            ctx.lineTo(x + bottomLeft, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - bottomLeft);
            if (yAlign === "center" && xAlign === "left") {
              this.drawCaret(pt, ctx, tooltipSize, options);
            }
            ctx.lineTo(x, y + topLeft);
            ctx.quadraticCurveTo(x, y, x + topLeft, y);
            ctx.closePath();
            ctx.fill();
            if (options.borderWidth > 0) {
              ctx.stroke();
            }
          }
          _updateAnimationTarget(options) {
            const chart = this.chart;
            const anims = this.$animations;
            const animX = anims && anims.x;
            const animY = anims && anims.y;
            if (animX || animY) {
              const position = positioners[options.position].call(this, this._active, this._eventPosition);
              if (!position) {
                return;
              }
              const size = this._size = getTooltipSize(this, options);
              const positionAndSize = Object.assign({}, position, this._size);
              const alignment = determineAlignment(chart, options, positionAndSize);
              const point = getBackgroundPoint(options, positionAndSize, alignment, chart);
              if (animX._to !== point.x || animY._to !== point.y) {
                this.xAlign = alignment.xAlign;
                this.yAlign = alignment.yAlign;
                this.width = size.width;
                this.height = size.height;
                this.caretX = position.x;
                this.caretY = position.y;
                this._resolveAnimations().update(this, point);
              }
            }
          }
          _willRender() {
            return !!this.opacity;
          }
          draw(ctx) {
            const options = this.options.setContext(this.getContext());
            let opacity = this.opacity;
            if (!opacity) {
              return;
            }
            this._updateAnimationTarget(options);
            const tooltipSize = {
              width: this.width,
              height: this.height
            };
            const pt = {
              x: this.x,
              y: this.y
            };
            opacity = Math.abs(opacity) < 1e-3 ? 0 : opacity;
            const padding = toPadding(options.padding);
            const hasTooltipContent = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
            if (options.enabled && hasTooltipContent) {
              ctx.save();
              ctx.globalAlpha = opacity;
              this.drawBackground(pt, ctx, tooltipSize, options);
              overrideTextDirection(ctx, options.textDirection);
              pt.y += padding.top;
              this.drawTitle(pt, ctx, options);
              this.drawBody(pt, ctx, options);
              this.drawFooter(pt, ctx, options);
              restoreTextDirection(ctx, options.textDirection);
              ctx.restore();
            }
          }
          getActiveElements() {
            return this._active || [];
          }
          setActiveElements(activeElements, eventPosition) {
            const lastActive = this._active;
            const active = activeElements.map(({ datasetIndex, index: index3 }) => {
              const meta = this.chart.getDatasetMeta(datasetIndex);
              if (!meta) {
                throw new Error("Cannot find a dataset at index " + datasetIndex);
              }
              return {
                datasetIndex,
                element: meta.data[index3],
                index: index3
              };
            });
            const changed = !_elementsEqual(lastActive, active);
            const positionChanged = this._positionChanged(active, eventPosition);
            if (changed || positionChanged) {
              this._active = active;
              this._eventPosition = eventPosition;
              this._ignoreReplayEvents = true;
              this.update(true);
            }
          }
          handleEvent(e, replay, inChartArea = true) {
            if (replay && this._ignoreReplayEvents) {
              return false;
            }
            this._ignoreReplayEvents = false;
            const options = this.options;
            const lastActive = this._active || [];
            const active = this._getActiveElements(e, lastActive, replay, inChartArea);
            const positionChanged = this._positionChanged(active, e);
            const changed = replay || !_elementsEqual(active, lastActive) || positionChanged;
            if (changed) {
              this._active = active;
              if (options.enabled || options.external) {
                this._eventPosition = {
                  x: e.x,
                  y: e.y
                };
                this.update(true, replay);
              }
            }
            return changed;
          }
          _getActiveElements(e, lastActive, replay, inChartArea) {
            const options = this.options;
            if (e.type === "mouseout") {
              return [];
            }
            if (!inChartArea) {
              return lastActive;
            }
            const active = this.chart.getElementsAtEventForMode(e, options.mode, options, replay);
            if (options.reverse) {
              active.reverse();
            }
            return active;
          }
          _positionChanged(active, e) {
            const { caretX, caretY, options } = this;
            const position = positioners[options.position].call(this, active, e);
            return position !== false && (caretX !== position.x || caretY !== position.y);
          }
        }
        Tooltip.positioners = positioners;
        var plugin_tooltip = {
          id: "tooltip",
          _element: Tooltip,
          positioners,
          afterInit(chart, _args, options) {
            if (options) {
              chart.tooltip = new Tooltip({ chart, options });
            }
          },
          beforeUpdate(chart, _args, options) {
            if (chart.tooltip) {
              chart.tooltip.initialize(options);
            }
          },
          reset(chart, _args, options) {
            if (chart.tooltip) {
              chart.tooltip.initialize(options);
            }
          },
          afterDraw(chart) {
            const tooltip = chart.tooltip;
            if (tooltip && tooltip._willRender()) {
              const args = {
                tooltip
              };
              if (chart.notifyPlugins("beforeTooltipDraw", args) === false) {
                return;
              }
              tooltip.draw(chart.ctx);
              chart.notifyPlugins("afterTooltipDraw", args);
            }
          },
          afterEvent(chart, args) {
            if (chart.tooltip) {
              const useFinalPosition = args.replay;
              if (chart.tooltip.handleEvent(args.event, useFinalPosition, args.inChartArea)) {
                args.changed = true;
              }
            }
          },
          defaults: {
            enabled: true,
            external: null,
            position: "average",
            backgroundColor: "rgba(0,0,0,0.8)",
            titleColor: "#fff",
            titleFont: {
              weight: "bold"
            },
            titleSpacing: 2,
            titleMarginBottom: 6,
            titleAlign: "left",
            bodyColor: "#fff",
            bodySpacing: 2,
            bodyFont: {},
            bodyAlign: "left",
            footerColor: "#fff",
            footerSpacing: 2,
            footerMarginTop: 6,
            footerFont: {
              weight: "bold"
            },
            footerAlign: "left",
            padding: 6,
            caretPadding: 2,
            caretSize: 5,
            cornerRadius: 6,
            boxHeight: (ctx, opts) => opts.bodyFont.size,
            boxWidth: (ctx, opts) => opts.bodyFont.size,
            multiKeyBackground: "#fff",
            displayColors: true,
            boxPadding: 0,
            borderColor: "rgba(0,0,0,0)",
            borderWidth: 0,
            animation: {
              duration: 400,
              easing: "easeOutQuart"
            },
            animations: {
              numbers: {
                type: "number",
                properties: ["x", "y", "width", "height", "caretX", "caretY"]
              },
              opacity: {
                easing: "linear",
                duration: 200
              }
            },
            callbacks: {
              beforeTitle: noop2,
              title(tooltipItems) {
                if (tooltipItems.length > 0) {
                  const item = tooltipItems[0];
                  const labels = item.chart.data.labels;
                  const labelCount = labels ? labels.length : 0;
                  if (this && this.options && this.options.mode === "dataset") {
                    return item.dataset.label || "";
                  } else if (item.label) {
                    return item.label;
                  } else if (labelCount > 0 && item.dataIndex < labelCount) {
                    return labels[item.dataIndex];
                  }
                }
                return "";
              },
              afterTitle: noop2,
              beforeBody: noop2,
              beforeLabel: noop2,
              label(tooltipItem) {
                if (this && this.options && this.options.mode === "dataset") {
                  return tooltipItem.label + ": " + tooltipItem.formattedValue || tooltipItem.formattedValue;
                }
                let label = tooltipItem.dataset.label || "";
                if (label) {
                  label += ": ";
                }
                const value = tooltipItem.formattedValue;
                if (!isNullOrUndef(value)) {
                  label += value;
                }
                return label;
              },
              labelColor(tooltipItem) {
                const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
                const options = meta.controller.getStyle(tooltipItem.dataIndex);
                return {
                  borderColor: options.borderColor,
                  backgroundColor: options.backgroundColor,
                  borderWidth: options.borderWidth,
                  borderDash: options.borderDash,
                  borderDashOffset: options.borderDashOffset,
                  borderRadius: 0
                };
              },
              labelTextColor() {
                return this.options.bodyColor;
              },
              labelPointStyle(tooltipItem) {
                const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
                const options = meta.controller.getStyle(tooltipItem.dataIndex);
                return {
                  pointStyle: options.pointStyle,
                  rotation: options.rotation
                };
              },
              afterLabel: noop2,
              afterBody: noop2,
              beforeFooter: noop2,
              footer: noop2,
              afterFooter: noop2
            }
          },
          defaultRoutes: {
            bodyFont: "font",
            footerFont: "font",
            titleFont: "font"
          },
          descriptors: {
            _scriptable: (name) => name !== "filter" && name !== "itemSort" && name !== "external",
            _indexable: false,
            callbacks: {
              _scriptable: false,
              _indexable: false
            },
            animation: {
              _fallback: false
            },
            animations: {
              _fallback: "animation"
            }
          },
          additionalOptionScopes: ["interaction"]
        };
        var plugins = /* @__PURE__ */ Object.freeze({
          __proto__: null,
          Decimation: plugin_decimation,
          Filler: index2,
          Legend: plugin_legend,
          SubTitle: plugin_subtitle,
          Title: plugin_title,
          Tooltip: plugin_tooltip
        });
        const addIfString = (labels, raw, index3, addedLabels) => {
          if (typeof raw === "string") {
            index3 = labels.push(raw) - 1;
            addedLabels.unshift({ index: index3, label: raw });
          } else if (isNaN(raw)) {
            index3 = null;
          }
          return index3;
        };
        function findOrAddLabel(labels, raw, index3, addedLabels) {
          const first = labels.indexOf(raw);
          if (first === -1) {
            return addIfString(labels, raw, index3, addedLabels);
          }
          const last = labels.lastIndexOf(raw);
          return first !== last ? index3 : first;
        }
        const validIndex = (index3, max) => index3 === null ? null : _limitValue(Math.round(index3), 0, max);
        class CategoryScale extends Scale {
          constructor(cfg) {
            super(cfg);
            this._startValue = void 0;
            this._valueRange = 0;
            this._addedLabels = [];
          }
          init(scaleOptions) {
            const added = this._addedLabels;
            if (added.length) {
              const labels = this.getLabels();
              for (const { index: index3, label } of added) {
                if (labels[index3] === label) {
                  labels.splice(index3, 1);
                }
              }
              this._addedLabels = [];
            }
            super.init(scaleOptions);
          }
          parse(raw, index3) {
            if (isNullOrUndef(raw)) {
              return null;
            }
            const labels = this.getLabels();
            index3 = isFinite(index3) && labels[index3] === raw ? index3 : findOrAddLabel(labels, raw, valueOrDefault(index3, raw), this._addedLabels);
            return validIndex(index3, labels.length - 1);
          }
          determineDataLimits() {
            const { minDefined, maxDefined } = this.getUserBounds();
            let { min, max } = this.getMinMax(true);
            if (this.options.bounds === "ticks") {
              if (!minDefined) {
                min = 0;
              }
              if (!maxDefined) {
                max = this.getLabels().length - 1;
              }
            }
            this.min = min;
            this.max = max;
          }
          buildTicks() {
            const min = this.min;
            const max = this.max;
            const offset = this.options.offset;
            const ticks = [];
            let labels = this.getLabels();
            labels = min === 0 && max === labels.length - 1 ? labels : labels.slice(min, max + 1);
            this._valueRange = Math.max(labels.length - (offset ? 0 : 1), 1);
            this._startValue = this.min - (offset ? 0.5 : 0);
            for (let value = min; value <= max; value++) {
              ticks.push({ value });
            }
            return ticks;
          }
          getLabelForValue(value) {
            const labels = this.getLabels();
            if (value >= 0 && value < labels.length) {
              return labels[value];
            }
            return value;
          }
          configure() {
            super.configure();
            if (!this.isHorizontal()) {
              this._reversePixels = !this._reversePixels;
            }
          }
          getPixelForValue(value) {
            if (typeof value !== "number") {
              value = this.parse(value);
            }
            return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
          }
          getPixelForTick(index3) {
            const ticks = this.ticks;
            if (index3 < 0 || index3 > ticks.length - 1) {
              return null;
            }
            return this.getPixelForValue(ticks[index3].value);
          }
          getValueForPixel(pixel) {
            return Math.round(this._startValue + this.getDecimalForPixel(pixel) * this._valueRange);
          }
          getBasePixel() {
            return this.bottom;
          }
        }
        CategoryScale.id = "category";
        CategoryScale.defaults = {
          ticks: {
            callback: CategoryScale.prototype.getLabelForValue
          }
        };
        function generateTicks$1(generationOptions, dataRange) {
          const ticks = [];
          const MIN_SPACING = 1e-14;
          const { bounds, step, min, max, precision, count, maxTicks, maxDigits, includeBounds } = generationOptions;
          const unit = step || 1;
          const maxSpaces = maxTicks - 1;
          const { min: rmin, max: rmax } = dataRange;
          const minDefined = !isNullOrUndef(min);
          const maxDefined = !isNullOrUndef(max);
          const countDefined = !isNullOrUndef(count);
          const minSpacing = (rmax - rmin) / (maxDigits + 1);
          let spacing = niceNum((rmax - rmin) / maxSpaces / unit) * unit;
          let factor, niceMin, niceMax, numSpaces;
          if (spacing < MIN_SPACING && !minDefined && !maxDefined) {
            return [{ value: rmin }, { value: rmax }];
          }
          numSpaces = Math.ceil(rmax / spacing) - Math.floor(rmin / spacing);
          if (numSpaces > maxSpaces) {
            spacing = niceNum(numSpaces * spacing / maxSpaces / unit) * unit;
          }
          if (!isNullOrUndef(precision)) {
            factor = Math.pow(10, precision);
            spacing = Math.ceil(spacing * factor) / factor;
          }
          if (bounds === "ticks") {
            niceMin = Math.floor(rmin / spacing) * spacing;
            niceMax = Math.ceil(rmax / spacing) * spacing;
          } else {
            niceMin = rmin;
            niceMax = rmax;
          }
          if (minDefined && maxDefined && step && almostWhole((max - min) / step, spacing / 1e3)) {
            numSpaces = Math.round(Math.min((max - min) / spacing, maxTicks));
            spacing = (max - min) / numSpaces;
            niceMin = min;
            niceMax = max;
          } else if (countDefined) {
            niceMin = minDefined ? min : niceMin;
            niceMax = maxDefined ? max : niceMax;
            numSpaces = count - 1;
            spacing = (niceMax - niceMin) / numSpaces;
          } else {
            numSpaces = (niceMax - niceMin) / spacing;
            if (almostEquals(numSpaces, Math.round(numSpaces), spacing / 1e3)) {
              numSpaces = Math.round(numSpaces);
            } else {
              numSpaces = Math.ceil(numSpaces);
            }
          }
          const decimalPlaces = Math.max(
            _decimalPlaces(spacing),
            _decimalPlaces(niceMin)
          );
          factor = Math.pow(10, isNullOrUndef(precision) ? decimalPlaces : precision);
          niceMin = Math.round(niceMin * factor) / factor;
          niceMax = Math.round(niceMax * factor) / factor;
          let j = 0;
          if (minDefined) {
            if (includeBounds && niceMin !== min) {
              ticks.push({ value: min });
              if (niceMin < min) {
                j++;
              }
              if (almostEquals(Math.round((niceMin + j * spacing) * factor) / factor, min, relativeLabelSize(min, minSpacing, generationOptions))) {
                j++;
              }
            } else if (niceMin < min) {
              j++;
            }
          }
          for (; j < numSpaces; ++j) {
            ticks.push({ value: Math.round((niceMin + j * spacing) * factor) / factor });
          }
          if (maxDefined && includeBounds && niceMax !== max) {
            if (ticks.length && almostEquals(ticks[ticks.length - 1].value, max, relativeLabelSize(max, minSpacing, generationOptions))) {
              ticks[ticks.length - 1].value = max;
            } else {
              ticks.push({ value: max });
            }
          } else if (!maxDefined || niceMax === max) {
            ticks.push({ value: niceMax });
          }
          return ticks;
        }
        function relativeLabelSize(value, minSpacing, { horizontal, minRotation }) {
          const rad = toRadians(minRotation);
          const ratio = (horizontal ? Math.sin(rad) : Math.cos(rad)) || 1e-3;
          const length = 0.75 * minSpacing * ("" + value).length;
          return Math.min(minSpacing / ratio, length);
        }
        class LinearScaleBase extends Scale {
          constructor(cfg) {
            super(cfg);
            this.start = void 0;
            this.end = void 0;
            this._startValue = void 0;
            this._endValue = void 0;
            this._valueRange = 0;
          }
          parse(raw, index3) {
            if (isNullOrUndef(raw)) {
              return null;
            }
            if ((typeof raw === "number" || raw instanceof Number) && !isFinite(+raw)) {
              return null;
            }
            return +raw;
          }
          handleTickRangeOptions() {
            const { beginAtZero } = this.options;
            const { minDefined, maxDefined } = this.getUserBounds();
            let { min, max } = this;
            const setMin = (v) => min = minDefined ? min : v;
            const setMax = (v) => max = maxDefined ? max : v;
            if (beginAtZero) {
              const minSign = sign(min);
              const maxSign = sign(max);
              if (minSign < 0 && maxSign < 0) {
                setMax(0);
              } else if (minSign > 0 && maxSign > 0) {
                setMin(0);
              }
            }
            if (min === max) {
              let offset = 1;
              if (max >= Number.MAX_SAFE_INTEGER || min <= Number.MIN_SAFE_INTEGER) {
                offset = Math.abs(max * 0.05);
              }
              setMax(max + offset);
              if (!beginAtZero) {
                setMin(min - offset);
              }
            }
            this.min = min;
            this.max = max;
          }
          getTickLimit() {
            const tickOpts = this.options.ticks;
            let { maxTicksLimit, stepSize } = tickOpts;
            let maxTicks;
            if (stepSize) {
              maxTicks = Math.ceil(this.max / stepSize) - Math.floor(this.min / stepSize) + 1;
              if (maxTicks > 1e3) {
                console.warn(`scales.${this.id}.ticks.stepSize: ${stepSize} would result generating up to ${maxTicks} ticks. Limiting to 1000.`);
                maxTicks = 1e3;
              }
            } else {
              maxTicks = this.computeTickLimit();
              maxTicksLimit = maxTicksLimit || 11;
            }
            if (maxTicksLimit) {
              maxTicks = Math.min(maxTicksLimit, maxTicks);
            }
            return maxTicks;
          }
          computeTickLimit() {
            return Number.POSITIVE_INFINITY;
          }
          buildTicks() {
            const opts = this.options;
            const tickOpts = opts.ticks;
            let maxTicks = this.getTickLimit();
            maxTicks = Math.max(2, maxTicks);
            const numericGeneratorOptions = {
              maxTicks,
              bounds: opts.bounds,
              min: opts.min,
              max: opts.max,
              precision: tickOpts.precision,
              step: tickOpts.stepSize,
              count: tickOpts.count,
              maxDigits: this._maxDigits(),
              horizontal: this.isHorizontal(),
              minRotation: tickOpts.minRotation || 0,
              includeBounds: tickOpts.includeBounds !== false
            };
            const dataRange = this._range || this;
            const ticks = generateTicks$1(numericGeneratorOptions, dataRange);
            if (opts.bounds === "ticks") {
              _setMinAndMaxByKey(ticks, this, "value");
            }
            if (opts.reverse) {
              ticks.reverse();
              this.start = this.max;
              this.end = this.min;
            } else {
              this.start = this.min;
              this.end = this.max;
            }
            return ticks;
          }
          configure() {
            const ticks = this.ticks;
            let start = this.min;
            let end = this.max;
            super.configure();
            if (this.options.offset && ticks.length) {
              const offset = (end - start) / Math.max(ticks.length - 1, 1) / 2;
              start -= offset;
              end += offset;
            }
            this._startValue = start;
            this._endValue = end;
            this._valueRange = end - start;
          }
          getLabelForValue(value) {
            return formatNumber(value, this.chart.options.locale, this.options.ticks.format);
          }
        }
        class LinearScale extends LinearScaleBase {
          determineDataLimits() {
            const { min, max } = this.getMinMax(true);
            this.min = isNumberFinite(min) ? min : 0;
            this.max = isNumberFinite(max) ? max : 1;
            this.handleTickRangeOptions();
          }
          computeTickLimit() {
            const horizontal = this.isHorizontal();
            const length = horizontal ? this.width : this.height;
            const minRotation = toRadians(this.options.ticks.minRotation);
            const ratio = (horizontal ? Math.sin(minRotation) : Math.cos(minRotation)) || 1e-3;
            const tickFont = this._resolveTickFontOptions(0);
            return Math.ceil(length / Math.min(40, tickFont.lineHeight / ratio));
          }
          getPixelForValue(value) {
            return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
          }
          getValueForPixel(pixel) {
            return this._startValue + this.getDecimalForPixel(pixel) * this._valueRange;
          }
        }
        LinearScale.id = "linear";
        LinearScale.defaults = {
          ticks: {
            callback: Ticks.formatters.numeric
          }
        };
        function isMajor(tickVal) {
          const remain = tickVal / Math.pow(10, Math.floor(log10(tickVal)));
          return remain === 1;
        }
        function generateTicks(generationOptions, dataRange) {
          const endExp = Math.floor(log10(dataRange.max));
          const endSignificand = Math.ceil(dataRange.max / Math.pow(10, endExp));
          const ticks = [];
          let tickVal = finiteOrDefault(generationOptions.min, Math.pow(10, Math.floor(log10(dataRange.min))));
          let exp = Math.floor(log10(tickVal));
          let significand = Math.floor(tickVal / Math.pow(10, exp));
          let precision = exp < 0 ? Math.pow(10, Math.abs(exp)) : 1;
          do {
            ticks.push({ value: tickVal, major: isMajor(tickVal) });
            ++significand;
            if (significand === 10) {
              significand = 1;
              ++exp;
              precision = exp >= 0 ? 1 : precision;
            }
            tickVal = Math.round(significand * Math.pow(10, exp) * precision) / precision;
          } while (exp < endExp || exp === endExp && significand < endSignificand);
          const lastTick = finiteOrDefault(generationOptions.max, tickVal);
          ticks.push({ value: lastTick, major: isMajor(tickVal) });
          return ticks;
        }
        class LogarithmicScale extends Scale {
          constructor(cfg) {
            super(cfg);
            this.start = void 0;
            this.end = void 0;
            this._startValue = void 0;
            this._valueRange = 0;
          }
          parse(raw, index3) {
            const value = LinearScaleBase.prototype.parse.apply(this, [raw, index3]);
            if (value === 0) {
              this._zero = true;
              return void 0;
            }
            return isNumberFinite(value) && value > 0 ? value : null;
          }
          determineDataLimits() {
            const { min, max } = this.getMinMax(true);
            this.min = isNumberFinite(min) ? Math.max(0, min) : null;
            this.max = isNumberFinite(max) ? Math.max(0, max) : null;
            if (this.options.beginAtZero) {
              this._zero = true;
            }
            this.handleTickRangeOptions();
          }
          handleTickRangeOptions() {
            const { minDefined, maxDefined } = this.getUserBounds();
            let min = this.min;
            let max = this.max;
            const setMin = (v) => min = minDefined ? min : v;
            const setMax = (v) => max = maxDefined ? max : v;
            const exp = (v, m) => Math.pow(10, Math.floor(log10(v)) + m);
            if (min === max) {
              if (min <= 0) {
                setMin(1);
                setMax(10);
              } else {
                setMin(exp(min, -1));
                setMax(exp(max, 1));
              }
            }
            if (min <= 0) {
              setMin(exp(max, -1));
            }
            if (max <= 0) {
              setMax(exp(min, 1));
            }
            if (this._zero && this.min !== this._suggestedMin && min === exp(this.min, 0)) {
              setMin(exp(min, -1));
            }
            this.min = min;
            this.max = max;
          }
          buildTicks() {
            const opts = this.options;
            const generationOptions = {
              min: this._userMin,
              max: this._userMax
            };
            const ticks = generateTicks(generationOptions, this);
            if (opts.bounds === "ticks") {
              _setMinAndMaxByKey(ticks, this, "value");
            }
            if (opts.reverse) {
              ticks.reverse();
              this.start = this.max;
              this.end = this.min;
            } else {
              this.start = this.min;
              this.end = this.max;
            }
            return ticks;
          }
          getLabelForValue(value) {
            return value === void 0 ? "0" : formatNumber(value, this.chart.options.locale, this.options.ticks.format);
          }
          configure() {
            const start = this.min;
            super.configure();
            this._startValue = log10(start);
            this._valueRange = log10(this.max) - log10(start);
          }
          getPixelForValue(value) {
            if (value === void 0 || value === 0) {
              value = this.min;
            }
            if (value === null || isNaN(value)) {
              return NaN;
            }
            return this.getPixelForDecimal(value === this.min ? 0 : (log10(value) - this._startValue) / this._valueRange);
          }
          getValueForPixel(pixel) {
            const decimal = this.getDecimalForPixel(pixel);
            return Math.pow(10, this._startValue + decimal * this._valueRange);
          }
        }
        LogarithmicScale.id = "logarithmic";
        LogarithmicScale.defaults = {
          ticks: {
            callback: Ticks.formatters.logarithmic,
            major: {
              enabled: true
            }
          }
        };
        function getTickBackdropHeight(opts) {
          const tickOpts = opts.ticks;
          if (tickOpts.display && opts.display) {
            const padding = toPadding(tickOpts.backdropPadding);
            return valueOrDefault(tickOpts.font && tickOpts.font.size, defaults.font.size) + padding.height;
          }
          return 0;
        }
        function measureLabelSize(ctx, font, label) {
          label = isArray2(label) ? label : [label];
          return {
            w: _longestText(ctx, font.string, label),
            h: label.length * font.lineHeight
          };
        }
        function determineLimits(angle, pos, size, min, max) {
          if (angle === min || angle === max) {
            return {
              start: pos - size / 2,
              end: pos + size / 2
            };
          } else if (angle < min || angle > max) {
            return {
              start: pos - size,
              end: pos
            };
          }
          return {
            start: pos,
            end: pos + size
          };
        }
        function fitWithPointLabels(scale) {
          const orig = {
            l: scale.left + scale._padding.left,
            r: scale.right - scale._padding.right,
            t: scale.top + scale._padding.top,
            b: scale.bottom - scale._padding.bottom
          };
          const limits = Object.assign({}, orig);
          const labelSizes = [];
          const padding = [];
          const valueCount = scale._pointLabels.length;
          const pointLabelOpts = scale.options.pointLabels;
          const additionalAngle = pointLabelOpts.centerPointLabels ? PI / valueCount : 0;
          for (let i = 0; i < valueCount; i++) {
            const opts = pointLabelOpts.setContext(scale.getPointLabelContext(i));
            padding[i] = opts.padding;
            const pointPosition = scale.getPointPosition(i, scale.drawingArea + padding[i], additionalAngle);
            const plFont = toFont(opts.font);
            const textSize = measureLabelSize(scale.ctx, plFont, scale._pointLabels[i]);
            labelSizes[i] = textSize;
            const angleRadians = _normalizeAngle(scale.getIndexAngle(i) + additionalAngle);
            const angle = Math.round(toDegrees(angleRadians));
            const hLimits = determineLimits(angle, pointPosition.x, textSize.w, 0, 180);
            const vLimits = determineLimits(angle, pointPosition.y, textSize.h, 90, 270);
            updateLimits(limits, orig, angleRadians, hLimits, vLimits);
          }
          scale.setCenterPoint(
            orig.l - limits.l,
            limits.r - orig.r,
            orig.t - limits.t,
            limits.b - orig.b
          );
          scale._pointLabelItems = buildPointLabelItems(scale, labelSizes, padding);
        }
        function updateLimits(limits, orig, angle, hLimits, vLimits) {
          const sin = Math.abs(Math.sin(angle));
          const cos = Math.abs(Math.cos(angle));
          let x = 0;
          let y = 0;
          if (hLimits.start < orig.l) {
            x = (orig.l - hLimits.start) / sin;
            limits.l = Math.min(limits.l, orig.l - x);
          } else if (hLimits.end > orig.r) {
            x = (hLimits.end - orig.r) / sin;
            limits.r = Math.max(limits.r, orig.r + x);
          }
          if (vLimits.start < orig.t) {
            y = (orig.t - vLimits.start) / cos;
            limits.t = Math.min(limits.t, orig.t - y);
          } else if (vLimits.end > orig.b) {
            y = (vLimits.end - orig.b) / cos;
            limits.b = Math.max(limits.b, orig.b + y);
          }
        }
        function buildPointLabelItems(scale, labelSizes, padding) {
          const items = [];
          const valueCount = scale._pointLabels.length;
          const opts = scale.options;
          const extra = getTickBackdropHeight(opts) / 2;
          const outerDistance = scale.drawingArea;
          const additionalAngle = opts.pointLabels.centerPointLabels ? PI / valueCount : 0;
          for (let i = 0; i < valueCount; i++) {
            const pointLabelPosition = scale.getPointPosition(i, outerDistance + extra + padding[i], additionalAngle);
            const angle = Math.round(toDegrees(_normalizeAngle(pointLabelPosition.angle + HALF_PI)));
            const size = labelSizes[i];
            const y = yForAngle(pointLabelPosition.y, size.h, angle);
            const textAlign = getTextAlignForAngle(angle);
            const left = leftForTextAlign(pointLabelPosition.x, size.w, textAlign);
            items.push({
              x: pointLabelPosition.x,
              y,
              textAlign,
              left,
              top: y,
              right: left + size.w,
              bottom: y + size.h
            });
          }
          return items;
        }
        function getTextAlignForAngle(angle) {
          if (angle === 0 || angle === 180) {
            return "center";
          } else if (angle < 180) {
            return "left";
          }
          return "right";
        }
        function leftForTextAlign(x, w, align) {
          if (align === "right") {
            x -= w;
          } else if (align === "center") {
            x -= w / 2;
          }
          return x;
        }
        function yForAngle(y, h, angle) {
          if (angle === 90 || angle === 270) {
            y -= h / 2;
          } else if (angle > 270 || angle < 90) {
            y -= h;
          }
          return y;
        }
        function drawPointLabels(scale, labelCount) {
          const { ctx, options: { pointLabels } } = scale;
          for (let i = labelCount - 1; i >= 0; i--) {
            const optsAtIndex = pointLabels.setContext(scale.getPointLabelContext(i));
            const plFont = toFont(optsAtIndex.font);
            const { x, y, textAlign, left, top, right, bottom } = scale._pointLabelItems[i];
            const { backdropColor } = optsAtIndex;
            if (!isNullOrUndef(backdropColor)) {
              const borderRadius = toTRBLCorners(optsAtIndex.borderRadius);
              const padding = toPadding(optsAtIndex.backdropPadding);
              ctx.fillStyle = backdropColor;
              const backdropLeft = left - padding.left;
              const backdropTop = top - padding.top;
              const backdropWidth = right - left + padding.width;
              const backdropHeight = bottom - top + padding.height;
              if (Object.values(borderRadius).some((v) => v !== 0)) {
                ctx.beginPath();
                addRoundedRectPath(ctx, {
                  x: backdropLeft,
                  y: backdropTop,
                  w: backdropWidth,
                  h: backdropHeight,
                  radius: borderRadius
                });
                ctx.fill();
              } else {
                ctx.fillRect(backdropLeft, backdropTop, backdropWidth, backdropHeight);
              }
            }
            renderText(
              ctx,
              scale._pointLabels[i],
              x,
              y + plFont.lineHeight / 2,
              plFont,
              {
                color: optsAtIndex.color,
                textAlign,
                textBaseline: "middle"
              }
            );
          }
        }
        function pathRadiusLine(scale, radius, circular2, labelCount) {
          const { ctx } = scale;
          if (circular2) {
            ctx.arc(scale.xCenter, scale.yCenter, radius, 0, TAU);
          } else {
            let pointPosition = scale.getPointPosition(0, radius);
            ctx.moveTo(pointPosition.x, pointPosition.y);
            for (let i = 1; i < labelCount; i++) {
              pointPosition = scale.getPointPosition(i, radius);
              ctx.lineTo(pointPosition.x, pointPosition.y);
            }
          }
        }
        function drawRadiusLine(scale, gridLineOpts, radius, labelCount) {
          const ctx = scale.ctx;
          const circular2 = gridLineOpts.circular;
          const { color: color2, lineWidth } = gridLineOpts;
          if (!circular2 && !labelCount || !color2 || !lineWidth || radius < 0) {
            return;
          }
          ctx.save();
          ctx.strokeStyle = color2;
          ctx.lineWidth = lineWidth;
          ctx.setLineDash(gridLineOpts.borderDash);
          ctx.lineDashOffset = gridLineOpts.borderDashOffset;
          ctx.beginPath();
          pathRadiusLine(scale, radius, circular2, labelCount);
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        }
        function createPointLabelContext(parent, index3, label) {
          return createContext(parent, {
            label,
            index: index3,
            type: "pointLabel"
          });
        }
        class RadialLinearScale extends LinearScaleBase {
          constructor(cfg) {
            super(cfg);
            this.xCenter = void 0;
            this.yCenter = void 0;
            this.drawingArea = void 0;
            this._pointLabels = [];
            this._pointLabelItems = [];
          }
          setDimensions() {
            const padding = this._padding = toPadding(getTickBackdropHeight(this.options) / 2);
            const w = this.width = this.maxWidth - padding.width;
            const h = this.height = this.maxHeight - padding.height;
            this.xCenter = Math.floor(this.left + w / 2 + padding.left);
            this.yCenter = Math.floor(this.top + h / 2 + padding.top);
            this.drawingArea = Math.floor(Math.min(w, h) / 2);
          }
          determineDataLimits() {
            const { min, max } = this.getMinMax(false);
            this.min = isNumberFinite(min) && !isNaN(min) ? min : 0;
            this.max = isNumberFinite(max) && !isNaN(max) ? max : 0;
            this.handleTickRangeOptions();
          }
          computeTickLimit() {
            return Math.ceil(this.drawingArea / getTickBackdropHeight(this.options));
          }
          generateTickLabels(ticks) {
            LinearScaleBase.prototype.generateTickLabels.call(this, ticks);
            this._pointLabels = this.getLabels().map((value, index3) => {
              const label = callback(this.options.pointLabels.callback, [value, index3], this);
              return label || label === 0 ? label : "";
            }).filter((v, i) => this.chart.getDataVisibility(i));
          }
          fit() {
            const opts = this.options;
            if (opts.display && opts.pointLabels.display) {
              fitWithPointLabels(this);
            } else {
              this.setCenterPoint(0, 0, 0, 0);
            }
          }
          setCenterPoint(leftMovement, rightMovement, topMovement, bottomMovement) {
            this.xCenter += Math.floor((leftMovement - rightMovement) / 2);
            this.yCenter += Math.floor((topMovement - bottomMovement) / 2);
            this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(leftMovement, rightMovement, topMovement, bottomMovement));
          }
          getIndexAngle(index3) {
            const angleMultiplier = TAU / (this._pointLabels.length || 1);
            const startAngle = this.options.startAngle || 0;
            return _normalizeAngle(index3 * angleMultiplier + toRadians(startAngle));
          }
          getDistanceFromCenterForValue(value) {
            if (isNullOrUndef(value)) {
              return NaN;
            }
            const scalingFactor = this.drawingArea / (this.max - this.min);
            if (this.options.reverse) {
              return (this.max - value) * scalingFactor;
            }
            return (value - this.min) * scalingFactor;
          }
          getValueForDistanceFromCenter(distance) {
            if (isNullOrUndef(distance)) {
              return NaN;
            }
            const scaledDistance = distance / (this.drawingArea / (this.max - this.min));
            return this.options.reverse ? this.max - scaledDistance : this.min + scaledDistance;
          }
          getPointLabelContext(index3) {
            const pointLabels = this._pointLabels || [];
            if (index3 >= 0 && index3 < pointLabels.length) {
              const pointLabel = pointLabels[index3];
              return createPointLabelContext(this.getContext(), index3, pointLabel);
            }
          }
          getPointPosition(index3, distanceFromCenter, additionalAngle = 0) {
            const angle = this.getIndexAngle(index3) - HALF_PI + additionalAngle;
            return {
              x: Math.cos(angle) * distanceFromCenter + this.xCenter,
              y: Math.sin(angle) * distanceFromCenter + this.yCenter,
              angle
            };
          }
          getPointPositionForValue(index3, value) {
            return this.getPointPosition(index3, this.getDistanceFromCenterForValue(value));
          }
          getBasePosition(index3) {
            return this.getPointPositionForValue(index3 || 0, this.getBaseValue());
          }
          getPointLabelPosition(index3) {
            const { left, top, right, bottom } = this._pointLabelItems[index3];
            return {
              left,
              top,
              right,
              bottom
            };
          }
          drawBackground() {
            const { backgroundColor, grid: { circular: circular2 } } = this.options;
            if (backgroundColor) {
              const ctx = this.ctx;
              ctx.save();
              ctx.beginPath();
              pathRadiusLine(this, this.getDistanceFromCenterForValue(this._endValue), circular2, this._pointLabels.length);
              ctx.closePath();
              ctx.fillStyle = backgroundColor;
              ctx.fill();
              ctx.restore();
            }
          }
          drawGrid() {
            const ctx = this.ctx;
            const opts = this.options;
            const { angleLines, grid } = opts;
            const labelCount = this._pointLabels.length;
            let i, offset, position;
            if (opts.pointLabels.display) {
              drawPointLabels(this, labelCount);
            }
            if (grid.display) {
              this.ticks.forEach((tick, index3) => {
                if (index3 !== 0) {
                  offset = this.getDistanceFromCenterForValue(tick.value);
                  const optsAtIndex = grid.setContext(this.getContext(index3 - 1));
                  drawRadiusLine(this, optsAtIndex, offset, labelCount);
                }
              });
            }
            if (angleLines.display) {
              ctx.save();
              for (i = labelCount - 1; i >= 0; i--) {
                const optsAtIndex = angleLines.setContext(this.getPointLabelContext(i));
                const { color: color2, lineWidth } = optsAtIndex;
                if (!lineWidth || !color2) {
                  continue;
                }
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = color2;
                ctx.setLineDash(optsAtIndex.borderDash);
                ctx.lineDashOffset = optsAtIndex.borderDashOffset;
                offset = this.getDistanceFromCenterForValue(opts.ticks.reverse ? this.min : this.max);
                position = this.getPointPosition(i, offset);
                ctx.beginPath();
                ctx.moveTo(this.xCenter, this.yCenter);
                ctx.lineTo(position.x, position.y);
                ctx.stroke();
              }
              ctx.restore();
            }
          }
          drawBorder() {
          }
          drawLabels() {
            const ctx = this.ctx;
            const opts = this.options;
            const tickOpts = opts.ticks;
            if (!tickOpts.display) {
              return;
            }
            const startAngle = this.getIndexAngle(0);
            let offset, width;
            ctx.save();
            ctx.translate(this.xCenter, this.yCenter);
            ctx.rotate(startAngle);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            this.ticks.forEach((tick, index3) => {
              if (index3 === 0 && !opts.reverse) {
                return;
              }
              const optsAtIndex = tickOpts.setContext(this.getContext(index3));
              const tickFont = toFont(optsAtIndex.font);
              offset = this.getDistanceFromCenterForValue(this.ticks[index3].value);
              if (optsAtIndex.showLabelBackdrop) {
                ctx.font = tickFont.string;
                width = ctx.measureText(tick.label).width;
                ctx.fillStyle = optsAtIndex.backdropColor;
                const padding = toPadding(optsAtIndex.backdropPadding);
                ctx.fillRect(
                  -width / 2 - padding.left,
                  -offset - tickFont.size / 2 - padding.top,
                  width + padding.width,
                  tickFont.size + padding.height
                );
              }
              renderText(ctx, tick.label, 0, -offset, tickFont, {
                color: optsAtIndex.color
              });
            });
            ctx.restore();
          }
          drawTitle() {
          }
        }
        RadialLinearScale.id = "radialLinear";
        RadialLinearScale.defaults = {
          display: true,
          animate: true,
          position: "chartArea",
          angleLines: {
            display: true,
            lineWidth: 1,
            borderDash: [],
            borderDashOffset: 0
          },
          grid: {
            circular: false
          },
          startAngle: 0,
          ticks: {
            showLabelBackdrop: true,
            callback: Ticks.formatters.numeric
          },
          pointLabels: {
            backdropColor: void 0,
            backdropPadding: 2,
            display: true,
            font: {
              size: 10
            },
            callback(label) {
              return label;
            },
            padding: 5,
            centerPointLabels: false
          }
        };
        RadialLinearScale.defaultRoutes = {
          "angleLines.color": "borderColor",
          "pointLabels.color": "color",
          "ticks.color": "color"
        };
        RadialLinearScale.descriptors = {
          angleLines: {
            _fallback: "grid"
          }
        };
        const INTERVALS = {
          millisecond: { common: true, size: 1, steps: 1e3 },
          second: { common: true, size: 1e3, steps: 60 },
          minute: { common: true, size: 6e4, steps: 60 },
          hour: { common: true, size: 36e5, steps: 24 },
          day: { common: true, size: 864e5, steps: 30 },
          week: { common: false, size: 6048e5, steps: 4 },
          month: { common: true, size: 2628e6, steps: 12 },
          quarter: { common: false, size: 7884e6, steps: 4 },
          year: { common: true, size: 3154e7 }
        };
        const UNITS = Object.keys(INTERVALS);
        function sorter(a, b) {
          return a - b;
        }
        function parse2(scale, input) {
          if (isNullOrUndef(input)) {
            return null;
          }
          const adapter = scale._adapter;
          const { parser, round: round2, isoWeekday } = scale._parseOpts;
          let value = input;
          if (typeof parser === "function") {
            value = parser(value);
          }
          if (!isNumberFinite(value)) {
            value = typeof parser === "string" ? adapter.parse(value, parser) : adapter.parse(value);
          }
          if (value === null) {
            return null;
          }
          if (round2) {
            value = round2 === "week" && (isNumber(isoWeekday) || isoWeekday === true) ? adapter.startOf(value, "isoWeek", isoWeekday) : adapter.startOf(value, round2);
          }
          return +value;
        }
        function determineUnitForAutoTicks(minUnit, min, max, capacity) {
          const ilen = UNITS.length;
          for (let i = UNITS.indexOf(minUnit); i < ilen - 1; ++i) {
            const interval = INTERVALS[UNITS[i]];
            const factor = interval.steps ? interval.steps : Number.MAX_SAFE_INTEGER;
            if (interval.common && Math.ceil((max - min) / (factor * interval.size)) <= capacity) {
              return UNITS[i];
            }
          }
          return UNITS[ilen - 1];
        }
        function determineUnitForFormatting(scale, numTicks, minUnit, min, max) {
          for (let i = UNITS.length - 1; i >= UNITS.indexOf(minUnit); i--) {
            const unit = UNITS[i];
            if (INTERVALS[unit].common && scale._adapter.diff(max, min, unit) >= numTicks - 1) {
              return unit;
            }
          }
          return UNITS[minUnit ? UNITS.indexOf(minUnit) : 0];
        }
        function determineMajorUnit(unit) {
          for (let i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i) {
            if (INTERVALS[UNITS[i]].common) {
              return UNITS[i];
            }
          }
        }
        function addTick(ticks, time, timestamps) {
          if (!timestamps) {
            ticks[time] = true;
          } else if (timestamps.length) {
            const { lo, hi } = _lookup(timestamps, time);
            const timestamp = timestamps[lo] >= time ? timestamps[lo] : timestamps[hi];
            ticks[timestamp] = true;
          }
        }
        function setMajorTicks(scale, ticks, map2, majorUnit) {
          const adapter = scale._adapter;
          const first = +adapter.startOf(ticks[0].value, majorUnit);
          const last = ticks[ticks.length - 1].value;
          let major, index3;
          for (major = first; major <= last; major = +adapter.add(major, 1, majorUnit)) {
            index3 = map2[major];
            if (index3 >= 0) {
              ticks[index3].major = true;
            }
          }
          return ticks;
        }
        function ticksFromTimestamps(scale, values, majorUnit) {
          const ticks = [];
          const map2 = {};
          const ilen = values.length;
          let i, value;
          for (i = 0; i < ilen; ++i) {
            value = values[i];
            map2[value] = i;
            ticks.push({
              value,
              major: false
            });
          }
          return ilen === 0 || !majorUnit ? ticks : setMajorTicks(scale, ticks, map2, majorUnit);
        }
        class TimeScale extends Scale {
          constructor(props2) {
            super(props2);
            this._cache = {
              data: [],
              labels: [],
              all: []
            };
            this._unit = "day";
            this._majorUnit = void 0;
            this._offsets = {};
            this._normalized = false;
            this._parseOpts = void 0;
          }
          init(scaleOpts, opts) {
            const time = scaleOpts.time || (scaleOpts.time = {});
            const adapter = this._adapter = new _adapters._date(scaleOpts.adapters.date);
            adapter.init(opts);
            mergeIf(time.displayFormats, adapter.formats());
            this._parseOpts = {
              parser: time.parser,
              round: time.round,
              isoWeekday: time.isoWeekday
            };
            super.init(scaleOpts);
            this._normalized = opts.normalized;
          }
          parse(raw, index3) {
            if (raw === void 0) {
              return null;
            }
            return parse2(this, raw);
          }
          beforeLayout() {
            super.beforeLayout();
            this._cache = {
              data: [],
              labels: [],
              all: []
            };
          }
          determineDataLimits() {
            const options = this.options;
            const adapter = this._adapter;
            const unit = options.time.unit || "day";
            let { min, max, minDefined, maxDefined } = this.getUserBounds();
            function _applyBounds(bounds) {
              if (!minDefined && !isNaN(bounds.min)) {
                min = Math.min(min, bounds.min);
              }
              if (!maxDefined && !isNaN(bounds.max)) {
                max = Math.max(max, bounds.max);
              }
            }
            if (!minDefined || !maxDefined) {
              _applyBounds(this._getLabelBounds());
              if (options.bounds !== "ticks" || options.ticks.source !== "labels") {
                _applyBounds(this.getMinMax(false));
              }
            }
            min = isNumberFinite(min) && !isNaN(min) ? min : +adapter.startOf(Date.now(), unit);
            max = isNumberFinite(max) && !isNaN(max) ? max : +adapter.endOf(Date.now(), unit) + 1;
            this.min = Math.min(min, max - 1);
            this.max = Math.max(min + 1, max);
          }
          _getLabelBounds() {
            const arr = this.getLabelTimestamps();
            let min = Number.POSITIVE_INFINITY;
            let max = Number.NEGATIVE_INFINITY;
            if (arr.length) {
              min = arr[0];
              max = arr[arr.length - 1];
            }
            return { min, max };
          }
          buildTicks() {
            const options = this.options;
            const timeOpts = options.time;
            const tickOpts = options.ticks;
            const timestamps = tickOpts.source === "labels" ? this.getLabelTimestamps() : this._generate();
            if (options.bounds === "ticks" && timestamps.length) {
              this.min = this._userMin || timestamps[0];
              this.max = this._userMax || timestamps[timestamps.length - 1];
            }
            const min = this.min;
            const max = this.max;
            const ticks = _filterBetween(timestamps, min, max);
            this._unit = timeOpts.unit || (tickOpts.autoSkip ? determineUnitForAutoTicks(timeOpts.minUnit, this.min, this.max, this._getLabelCapacity(min)) : determineUnitForFormatting(this, ticks.length, timeOpts.minUnit, this.min, this.max));
            this._majorUnit = !tickOpts.major.enabled || this._unit === "year" ? void 0 : determineMajorUnit(this._unit);
            this.initOffsets(timestamps);
            if (options.reverse) {
              ticks.reverse();
            }
            return ticksFromTimestamps(this, ticks, this._majorUnit);
          }
          afterAutoSkip() {
            if (this.options.offsetAfterAutoskip) {
              this.initOffsets(this.ticks.map((tick) => +tick.value));
            }
          }
          initOffsets(timestamps) {
            let start = 0;
            let end = 0;
            let first, last;
            if (this.options.offset && timestamps.length) {
              first = this.getDecimalForValue(timestamps[0]);
              if (timestamps.length === 1) {
                start = 1 - first;
              } else {
                start = (this.getDecimalForValue(timestamps[1]) - first) / 2;
              }
              last = this.getDecimalForValue(timestamps[timestamps.length - 1]);
              if (timestamps.length === 1) {
                end = last;
              } else {
                end = (last - this.getDecimalForValue(timestamps[timestamps.length - 2])) / 2;
              }
            }
            const limit = timestamps.length < 3 ? 0.5 : 0.25;
            start = _limitValue(start, 0, limit);
            end = _limitValue(end, 0, limit);
            this._offsets = { start, end, factor: 1 / (start + 1 + end) };
          }
          _generate() {
            const adapter = this._adapter;
            const min = this.min;
            const max = this.max;
            const options = this.options;
            const timeOpts = options.time;
            const minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, this._getLabelCapacity(min));
            const stepSize = valueOrDefault(timeOpts.stepSize, 1);
            const weekday = minor === "week" ? timeOpts.isoWeekday : false;
            const hasWeekday = isNumber(weekday) || weekday === true;
            const ticks = {};
            let first = min;
            let time, count;
            if (hasWeekday) {
              first = +adapter.startOf(first, "isoWeek", weekday);
            }
            first = +adapter.startOf(first, hasWeekday ? "day" : minor);
            if (adapter.diff(max, min, minor) > 1e5 * stepSize) {
              throw new Error(min + " and " + max + " are too far apart with stepSize of " + stepSize + " " + minor);
            }
            const timestamps = options.ticks.source === "data" && this.getDataTimestamps();
            for (time = first, count = 0; time < max; time = +adapter.add(time, stepSize, minor), count++) {
              addTick(ticks, time, timestamps);
            }
            if (time === max || options.bounds === "ticks" || count === 1) {
              addTick(ticks, time, timestamps);
            }
            return Object.keys(ticks).sort((a, b) => a - b).map((x) => +x);
          }
          getLabelForValue(value) {
            const adapter = this._adapter;
            const timeOpts = this.options.time;
            if (timeOpts.tooltipFormat) {
              return adapter.format(value, timeOpts.tooltipFormat);
            }
            return adapter.format(value, timeOpts.displayFormats.datetime);
          }
          _tickFormatFunction(time, index3, ticks, format) {
            const options = this.options;
            const formats = options.time.displayFormats;
            const unit = this._unit;
            const majorUnit = this._majorUnit;
            const minorFormat = unit && formats[unit];
            const majorFormat = majorUnit && formats[majorUnit];
            const tick = ticks[index3];
            const major = majorUnit && majorFormat && tick && tick.major;
            const label = this._adapter.format(time, format || (major ? majorFormat : minorFormat));
            const formatter = options.ticks.callback;
            return formatter ? callback(formatter, [label, index3, ticks], this) : label;
          }
          generateTickLabels(ticks) {
            let i, ilen, tick;
            for (i = 0, ilen = ticks.length; i < ilen; ++i) {
              tick = ticks[i];
              tick.label = this._tickFormatFunction(tick.value, i, ticks);
            }
          }
          getDecimalForValue(value) {
            return value === null ? NaN : (value - this.min) / (this.max - this.min);
          }
          getPixelForValue(value) {
            const offsets = this._offsets;
            const pos = this.getDecimalForValue(value);
            return this.getPixelForDecimal((offsets.start + pos) * offsets.factor);
          }
          getValueForPixel(pixel) {
            const offsets = this._offsets;
            const pos = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
            return this.min + pos * (this.max - this.min);
          }
          _getLabelSize(label) {
            const ticksOpts = this.options.ticks;
            const tickLabelWidth = this.ctx.measureText(label).width;
            const angle = toRadians(this.isHorizontal() ? ticksOpts.maxRotation : ticksOpts.minRotation);
            const cosRotation = Math.cos(angle);
            const sinRotation = Math.sin(angle);
            const tickFontSize = this._resolveTickFontOptions(0).size;
            return {
              w: tickLabelWidth * cosRotation + tickFontSize * sinRotation,
              h: tickLabelWidth * sinRotation + tickFontSize * cosRotation
            };
          }
          _getLabelCapacity(exampleTime) {
            const timeOpts = this.options.time;
            const displayFormats = timeOpts.displayFormats;
            const format = displayFormats[timeOpts.unit] || displayFormats.millisecond;
            const exampleLabel = this._tickFormatFunction(exampleTime, 0, ticksFromTimestamps(this, [exampleTime], this._majorUnit), format);
            const size = this._getLabelSize(exampleLabel);
            const capacity = Math.floor(this.isHorizontal() ? this.width / size.w : this.height / size.h) - 1;
            return capacity > 0 ? capacity : 1;
          }
          getDataTimestamps() {
            let timestamps = this._cache.data || [];
            let i, ilen;
            if (timestamps.length) {
              return timestamps;
            }
            const metas = this.getMatchingVisibleMetas();
            if (this._normalized && metas.length) {
              return this._cache.data = metas[0].controller.getAllParsedValues(this);
            }
            for (i = 0, ilen = metas.length; i < ilen; ++i) {
              timestamps = timestamps.concat(metas[i].controller.getAllParsedValues(this));
            }
            return this._cache.data = this.normalize(timestamps);
          }
          getLabelTimestamps() {
            const timestamps = this._cache.labels || [];
            let i, ilen;
            if (timestamps.length) {
              return timestamps;
            }
            const labels = this.getLabels();
            for (i = 0, ilen = labels.length; i < ilen; ++i) {
              timestamps.push(parse2(this, labels[i]));
            }
            return this._cache.labels = this._normalized ? timestamps : this.normalize(timestamps);
          }
          normalize(values) {
            return _arrayUnique(values.sort(sorter));
          }
        }
        TimeScale.id = "time";
        TimeScale.defaults = {
          bounds: "data",
          adapters: {},
          time: {
            parser: false,
            unit: false,
            round: false,
            isoWeekday: false,
            minUnit: "millisecond",
            displayFormats: {}
          },
          ticks: {
            source: "auto",
            major: {
              enabled: false
            }
          }
        };
        function interpolate(table, val, reverse) {
          let lo = 0;
          let hi = table.length - 1;
          let prevSource, nextSource, prevTarget, nextTarget;
          if (reverse) {
            if (val >= table[lo].pos && val <= table[hi].pos) {
              ({ lo, hi } = _lookupByKey(table, "pos", val));
            }
            ({ pos: prevSource, time: prevTarget } = table[lo]);
            ({ pos: nextSource, time: nextTarget } = table[hi]);
          } else {
            if (val >= table[lo].time && val <= table[hi].time) {
              ({ lo, hi } = _lookupByKey(table, "time", val));
            }
            ({ time: prevSource, pos: prevTarget } = table[lo]);
            ({ time: nextSource, pos: nextTarget } = table[hi]);
          }
          const span = nextSource - prevSource;
          return span ? prevTarget + (nextTarget - prevTarget) * (val - prevSource) / span : prevTarget;
        }
        class TimeSeriesScale extends TimeScale {
          constructor(props2) {
            super(props2);
            this._table = [];
            this._minPos = void 0;
            this._tableRange = void 0;
          }
          initOffsets() {
            const timestamps = this._getTimestampsForTable();
            const table = this._table = this.buildLookupTable(timestamps);
            this._minPos = interpolate(table, this.min);
            this._tableRange = interpolate(table, this.max) - this._minPos;
            super.initOffsets(timestamps);
          }
          buildLookupTable(timestamps) {
            const { min, max } = this;
            const items = [];
            const table = [];
            let i, ilen, prev, curr, next2;
            for (i = 0, ilen = timestamps.length; i < ilen; ++i) {
              curr = timestamps[i];
              if (curr >= min && curr <= max) {
                items.push(curr);
              }
            }
            if (items.length < 2) {
              return [
                { time: min, pos: 0 },
                { time: max, pos: 1 }
              ];
            }
            for (i = 0, ilen = items.length; i < ilen; ++i) {
              next2 = items[i + 1];
              prev = items[i - 1];
              curr = items[i];
              if (Math.round((next2 + prev) / 2) !== curr) {
                table.push({ time: curr, pos: i / (ilen - 1) });
              }
            }
            return table;
          }
          _getTimestampsForTable() {
            let timestamps = this._cache.all || [];
            if (timestamps.length) {
              return timestamps;
            }
            const data = this.getDataTimestamps();
            const label = this.getLabelTimestamps();
            if (data.length && label.length) {
              timestamps = this.normalize(data.concat(label));
            } else {
              timestamps = data.length ? data : label;
            }
            timestamps = this._cache.all = timestamps;
            return timestamps;
          }
          getDecimalForValue(value) {
            return (interpolate(this._table, value) - this._minPos) / this._tableRange;
          }
          getValueForPixel(pixel) {
            const offsets = this._offsets;
            const decimal = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
            return interpolate(this._table, decimal * this._tableRange + this._minPos, true);
          }
        }
        TimeSeriesScale.id = "timeseries";
        TimeSeriesScale.defaults = TimeScale.defaults;
        var scales = /* @__PURE__ */ Object.freeze({
          __proto__: null,
          CategoryScale,
          LinearScale,
          LogarithmicScale,
          RadialLinearScale,
          TimeScale,
          TimeSeriesScale
        });
        Chart2.register(controllers, scales, elements, plugins);
        Chart2.helpers = { ...helpers };
        Chart2._adapters = _adapters;
        Chart2.Animation = Animation;
        Chart2.Animations = Animations;
        Chart2.animator = animator;
        Chart2.controllers = registry.controllers.items;
        Chart2.DatasetController = DatasetController;
        Chart2.Element = Element;
        Chart2.elements = elements;
        Chart2.Interaction = Interaction;
        Chart2.layouts = layouts;
        Chart2.platforms = platforms;
        Chart2.Scale = Scale;
        Chart2.Ticks = Ticks;
        Object.assign(Chart2, controllers, scales, elements, plugins, platforms);
        Chart2.Chart = Chart2;
        if (typeof window !== "undefined") {
          window.Chart = Chart2;
        }
        return Chart2;
      });
    }
  });

  // node_modules/vue/dist/vue.esm.js
  var emptyObject = Object.freeze({});
  var isArray = Array.isArray;
  function isUndef(v) {
    return v === void 0 || v === null;
  }
  function isDef(v) {
    return v !== void 0 && v !== null;
  }
  function isTrue(v) {
    return v === true;
  }
  function isFalse(v) {
    return v === false;
  }
  function isPrimitive(value) {
    return typeof value === "string" || typeof value === "number" || typeof value === "symbol" || typeof value === "boolean";
  }
  function isFunction(value) {
    return typeof value === "function";
  }
  function isObject(obj) {
    return obj !== null && typeof obj === "object";
  }
  var _toString = Object.prototype.toString;
  function toRawType(value) {
    return _toString.call(value).slice(8, -1);
  }
  function isPlainObject(obj) {
    return _toString.call(obj) === "[object Object]";
  }
  function isRegExp(v) {
    return _toString.call(v) === "[object RegExp]";
  }
  function isValidArrayIndex(val) {
    var n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) === n && isFinite(val);
  }
  function isPromise(val) {
    return isDef(val) && typeof val.then === "function" && typeof val.catch === "function";
  }
  function toString(val) {
    return val == null ? "" : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
  }
  function toNumber(val) {
    var n = parseFloat(val);
    return isNaN(n) ? val : n;
  }
  function makeMap(str2, expectsLowerCase) {
    var map = /* @__PURE__ */ Object.create(null);
    var list = str2.split(",");
    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase ? function(val) {
      return map[val.toLowerCase()];
    } : function(val) {
      return map[val];
    };
  }
  var isBuiltInTag = makeMap("slot,component", true);
  var isReservedAttribute = makeMap("key,ref,slot,slot-scope,is");
  function remove$2(arr, item) {
    if (arr.length) {
      var index2 = arr.indexOf(item);
      if (index2 > -1) {
        return arr.splice(index2, 1);
      }
    }
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }
  function cached(fn) {
    var cache = /* @__PURE__ */ Object.create(null);
    return function cachedFn(str2) {
      var hit = cache[str2];
      return hit || (cache[str2] = fn(str2));
    };
  }
  var camelizeRE = /-(\w)/g;
  var camelize = cached(function(str2) {
    return str2.replace(camelizeRE, function(_, c) {
      return c ? c.toUpperCase() : "";
    });
  });
  var capitalize = cached(function(str2) {
    return str2.charAt(0).toUpperCase() + str2.slice(1);
  });
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cached(function(str2) {
    return str2.replace(hyphenateRE, "-$1").toLowerCase();
  });
  function polyfillBind(fn, ctx) {
    function boundFn(a) {
      var l = arguments.length;
      return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
    }
    boundFn._length = fn.length;
    return boundFn;
  }
  function nativeBind(fn, ctx) {
    return fn.bind(ctx);
  }
  var bind$1 = Function.prototype.bind ? nativeBind : polyfillBind;
  function toArray(list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = new Array(i);
    while (i--) {
      ret[i] = list[i + start];
    }
    return ret;
  }
  function extend(to, _from) {
    for (var key in _from) {
      to[key] = _from[key];
    }
    return to;
  }
  function toObject(arr) {
    var res = {};
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        extend(res, arr[i]);
      }
    }
    return res;
  }
  function noop(a, b, c) {
  }
  var no = function(a, b, c) {
    return false;
  };
  var identity = function(_) {
    return _;
  };
  function genStaticKeys$1(modules2) {
    return modules2.reduce(function(keys, m) {
      return keys.concat(m.staticKeys || []);
    }, []).join(",");
  }
  function looseEqual(a, b) {
    if (a === b)
      return true;
    var isObjectA = isObject(a);
    var isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
      try {
        var isArrayA = Array.isArray(a);
        var isArrayB = Array.isArray(b);
        if (isArrayA && isArrayB) {
          return a.length === b.length && a.every(function(e, i) {
            return looseEqual(e, b[i]);
          });
        } else if (a instanceof Date && b instanceof Date) {
          return a.getTime() === b.getTime();
        } else if (!isArrayA && !isArrayB) {
          var keysA = Object.keys(a);
          var keysB = Object.keys(b);
          return keysA.length === keysB.length && keysA.every(function(key) {
            return looseEqual(a[key], b[key]);
          });
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    } else if (!isObjectA && !isObjectB) {
      return String(a) === String(b);
    } else {
      return false;
    }
  }
  function looseIndexOf(arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (looseEqual(arr[i], val))
        return i;
    }
    return -1;
  }
  function once(fn) {
    var called = false;
    return function() {
      if (!called) {
        called = true;
        fn.apply(this, arguments);
      }
    };
  }
  function hasChanged(x, y) {
    if (x === y) {
      return x === 0 && 1 / x !== 1 / y;
    } else {
      return x === x || y === y;
    }
  }
  var SSR_ATTR = "data-server-rendered";
  var ASSET_TYPES = ["component", "directive", "filter"];
  var LIFECYCLE_HOOKS = [
    "beforeCreate",
    "created",
    "beforeMount",
    "mounted",
    "beforeUpdate",
    "updated",
    "beforeDestroy",
    "destroyed",
    "activated",
    "deactivated",
    "errorCaptured",
    "serverPrefetch",
    "renderTracked",
    "renderTriggered"
  ];
  var config = {
    optionMergeStrategies: /* @__PURE__ */ Object.create(null),
    silent: false,
    productionTip: true,
    devtools: true,
    performance: false,
    errorHandler: null,
    warnHandler: null,
    ignoredElements: [],
    keyCodes: /* @__PURE__ */ Object.create(null),
    isReservedTag: no,
    isReservedAttr: no,
    isUnknownElement: no,
    getTagNamespace: noop,
    parsePlatformTagName: identity,
    mustUseProp: no,
    async: true,
    _lifecycleHooks: LIFECYCLE_HOOKS
  };
  var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
  function isReserved(str2) {
    var c = (str2 + "").charCodeAt(0);
    return c === 36 || c === 95;
  }
  function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    });
  }
  var bailRE = new RegExp("[^".concat(unicodeRegExp.source, ".$_\\d]"));
  function parsePath(path) {
    if (bailRE.test(path)) {
      return;
    }
    var segments = path.split(".");
    return function(obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj)
          return;
        obj = obj[segments[i]];
      }
      return obj;
    };
  }
  var hasProto = "__proto__" in {};
  var inBrowser = typeof window !== "undefined";
  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
  var isIE = UA && /msie|trident/.test(UA);
  var isIE9 = UA && UA.indexOf("msie 9.0") > 0;
  var isEdge = UA && UA.indexOf("edge/") > 0;
  UA && UA.indexOf("android") > 0;
  var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
  UA && /chrome\/\d+/.test(UA) && !isEdge;
  UA && /phantomjs/.test(UA);
  var isFF = UA && UA.match(/firefox\/(\d+)/);
  var nativeWatch = {}.watch;
  var supportsPassive = false;
  if (inBrowser) {
    try {
      opts = {};
      Object.defineProperty(opts, "passive", {
        get: function() {
          supportsPassive = true;
        }
      });
      window.addEventListener("test-passive", null, opts);
    } catch (e) {
    }
  }
  var opts;
  var _isServer;
  var isServerRendering = function() {
    if (_isServer === void 0) {
      if (!inBrowser && typeof global !== "undefined") {
        _isServer = global["process"] && global["process"].env.VUE_ENV === "server";
      } else {
        _isServer = false;
      }
    }
    return _isServer;
  };
  var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
  function isNative(Ctor) {
    return typeof Ctor === "function" && /native code/.test(Ctor.toString());
  }
  var hasSymbol = typeof Symbol !== "undefined" && isNative(Symbol) && typeof Reflect !== "undefined" && isNative(Reflect.ownKeys);
  var _Set;
  if (typeof Set !== "undefined" && isNative(Set)) {
    _Set = Set;
  } else {
    _Set = function() {
      function Set2() {
        this.set = /* @__PURE__ */ Object.create(null);
      }
      Set2.prototype.has = function(key) {
        return this.set[key] === true;
      };
      Set2.prototype.add = function(key) {
        this.set[key] = true;
      };
      Set2.prototype.clear = function() {
        this.set = /* @__PURE__ */ Object.create(null);
      };
      return Set2;
    }();
  }
  var currentInstance = null;
  function setCurrentInstance(vm) {
    if (vm === void 0) {
      vm = null;
    }
    if (!vm)
      currentInstance && currentInstance._scope.off();
    currentInstance = vm;
    vm && vm._scope.on();
  }
  var VNode = function() {
    function VNode2(tag, data, children, text2, elm, context, componentOptions, asyncFactory) {
      this.tag = tag;
      this.data = data;
      this.children = children;
      this.text = text2;
      this.elm = elm;
      this.ns = void 0;
      this.context = context;
      this.fnContext = void 0;
      this.fnOptions = void 0;
      this.fnScopeId = void 0;
      this.key = data && data.key;
      this.componentOptions = componentOptions;
      this.componentInstance = void 0;
      this.parent = void 0;
      this.raw = false;
      this.isStatic = false;
      this.isRootInsert = true;
      this.isComment = false;
      this.isCloned = false;
      this.isOnce = false;
      this.asyncFactory = asyncFactory;
      this.asyncMeta = void 0;
      this.isAsyncPlaceholder = false;
    }
    Object.defineProperty(VNode2.prototype, "child", {
      get: function() {
        return this.componentInstance;
      },
      enumerable: false,
      configurable: true
    });
    return VNode2;
  }();
  var createEmptyVNode = function(text2) {
    if (text2 === void 0) {
      text2 = "";
    }
    var node = new VNode();
    node.text = text2;
    node.isComment = true;
    return node;
  };
  function createTextVNode(val) {
    return new VNode(void 0, void 0, void 0, String(val));
  }
  function cloneVNode(vnode) {
    var cloned = new VNode(
      vnode.tag,
      vnode.data,
      vnode.children && vnode.children.slice(),
      vnode.text,
      vnode.elm,
      vnode.context,
      vnode.componentOptions,
      vnode.asyncFactory
    );
    cloned.ns = vnode.ns;
    cloned.isStatic = vnode.isStatic;
    cloned.key = vnode.key;
    cloned.isComment = vnode.isComment;
    cloned.fnContext = vnode.fnContext;
    cloned.fnOptions = vnode.fnOptions;
    cloned.fnScopeId = vnode.fnScopeId;
    cloned.asyncMeta = vnode.asyncMeta;
    cloned.isCloned = true;
    return cloned;
  }
  var initProxy;
  if (true) {
    allowedGlobals_1 = makeMap(
      "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,require"
    );
    warnNonPresent_1 = function(target2, key) {
      warn$2('Property or method "'.concat(key, '" is not defined on the instance but ') + "referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property. See: https://v2.vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.", target2);
    };
    warnReservedPrefix_1 = function(target2, key) {
      warn$2('Property "'.concat(key, '" must be accessed with "$data.').concat(key, '" because ') + 'properties starting with "$" or "_" are not proxied in the Vue instance to prevent conflicts with Vue internals. See: https://v2.vuejs.org/v2/api/#data', target2);
    };
    hasProxy_1 = typeof Proxy !== "undefined" && isNative(Proxy);
    if (hasProxy_1) {
      isBuiltInModifier_1 = makeMap("stop,prevent,self,ctrl,shift,alt,meta,exact");
      config.keyCodes = new Proxy(config.keyCodes, {
        set: function(target2, key, value) {
          if (isBuiltInModifier_1(key)) {
            warn$2("Avoid overwriting built-in modifier in config.keyCodes: .".concat(key));
            return false;
          } else {
            target2[key] = value;
            return true;
          }
        }
      });
    }
    hasHandler_1 = {
      has: function(target2, key) {
        var has2 = key in target2;
        var isAllowed = allowedGlobals_1(key) || typeof key === "string" && key.charAt(0) === "_" && !(key in target2.$data);
        if (!has2 && !isAllowed) {
          if (key in target2.$data)
            warnReservedPrefix_1(target2, key);
          else
            warnNonPresent_1(target2, key);
        }
        return has2 || !isAllowed;
      }
    };
    getHandler_1 = {
      get: function(target2, key) {
        if (typeof key === "string" && !(key in target2)) {
          if (key in target2.$data)
            warnReservedPrefix_1(target2, key);
          else
            warnNonPresent_1(target2, key);
        }
        return target2[key];
      }
    };
    initProxy = function initProxy2(vm) {
      if (hasProxy_1) {
        var options = vm.$options;
        var handlers = options.render && options.render._withStripped ? getHandler_1 : hasHandler_1;
        vm._renderProxy = new Proxy(vm, handlers);
      } else {
        vm._renderProxy = vm;
      }
    };
  }
  var allowedGlobals_1;
  var warnNonPresent_1;
  var warnReservedPrefix_1;
  var hasProxy_1;
  var isBuiltInModifier_1;
  var hasHandler_1;
  var getHandler_1;
  var __assign = function() {
    __assign = Object.assign || function __assign2(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  var uid$2 = 0;
  var Dep = function() {
    function Dep2() {
      this.id = uid$2++;
      this.subs = [];
    }
    Dep2.prototype.addSub = function(sub) {
      this.subs.push(sub);
    };
    Dep2.prototype.removeSub = function(sub) {
      remove$2(this.subs, sub);
    };
    Dep2.prototype.depend = function(info) {
      if (Dep2.target) {
        Dep2.target.addDep(this);
        if (info && Dep2.target.onTrack) {
          Dep2.target.onTrack(__assign({ effect: Dep2.target }, info));
        }
      }
    };
    Dep2.prototype.notify = function(info) {
      var subs = this.subs.slice();
      if (!config.async) {
        subs.sort(function(a, b) {
          return a.id - b.id;
        });
      }
      for (var i = 0, l = subs.length; i < l; i++) {
        if (info) {
          var sub = subs[i];
          sub.onTrigger && sub.onTrigger(__assign({ effect: subs[i] }, info));
        }
        subs[i].update();
      }
    };
    return Dep2;
  }();
  Dep.target = null;
  var targetStack = [];
  function pushTarget(target2) {
    targetStack.push(target2);
    Dep.target = target2;
  }
  function popTarget() {
    targetStack.pop();
    Dep.target = targetStack[targetStack.length - 1];
  }
  var arrayProto = Array.prototype;
  var arrayMethods = Object.create(arrayProto);
  var methodsToPatch = [
    "push",
    "pop",
    "shift",
    "unshift",
    "splice",
    "sort",
    "reverse"
  ];
  methodsToPatch.forEach(function(method) {
    var original = arrayProto[method];
    def(arrayMethods, method, function mutator() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var result = original.apply(this, args);
      var ob = this.__ob__;
      var inserted;
      switch (method) {
        case "push":
        case "unshift":
          inserted = args;
          break;
        case "splice":
          inserted = args.slice(2);
          break;
      }
      if (inserted)
        ob.observeArray(inserted);
      if (true) {
        ob.dep.notify({
          type: "array mutation",
          target: this,
          key: method
        });
      } else {
        ob.dep.notify();
      }
      return result;
    });
  });
  var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
  var NO_INIITIAL_VALUE = {};
  var shouldObserve = true;
  function toggleObserving(value) {
    shouldObserve = value;
  }
  var mockDep = {
    notify: noop,
    depend: noop,
    addSub: noop,
    removeSub: noop
  };
  var Observer = function() {
    function Observer2(value, shallow, mock) {
      if (shallow === void 0) {
        shallow = false;
      }
      if (mock === void 0) {
        mock = false;
      }
      this.value = value;
      this.shallow = shallow;
      this.mock = mock;
      this.dep = mock ? mockDep : new Dep();
      this.vmCount = 0;
      def(value, "__ob__", this);
      if (isArray(value)) {
        if (!mock) {
          if (hasProto) {
            value.__proto__ = arrayMethods;
          } else {
            for (var i = 0, l = arrayKeys.length; i < l; i++) {
              var key = arrayKeys[i];
              def(value, key, arrayMethods[key]);
            }
          }
        }
        if (!shallow) {
          this.observeArray(value);
        }
      } else {
        var keys = Object.keys(value);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          defineReactive(value, key, NO_INIITIAL_VALUE, void 0, shallow, mock);
        }
      }
    }
    Observer2.prototype.observeArray = function(value) {
      for (var i = 0, l = value.length; i < l; i++) {
        observe(value[i], false, this.mock);
      }
    };
    return Observer2;
  }();
  function observe(value, shallow, ssrMockReactivity) {
    if (!isObject(value) || isRef(value) || value instanceof VNode) {
      return;
    }
    var ob;
    if (hasOwn(value, "__ob__") && value.__ob__ instanceof Observer) {
      ob = value.__ob__;
    } else if (shouldObserve && (ssrMockReactivity || !isServerRendering()) && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value.__v_skip) {
      ob = new Observer(value, shallow, ssrMockReactivity);
    }
    return ob;
  }
  function defineReactive(obj, key, val, customSetter, shallow, mock) {
    var dep = new Dep();
    var property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
      return;
    }
    var getter = property && property.get;
    var setter = property && property.set;
    if ((!getter || setter) && (val === NO_INIITIAL_VALUE || arguments.length === 2)) {
      val = obj[key];
    }
    var childOb = !shallow && observe(val, false, mock);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter() {
        var value = getter ? getter.call(obj) : val;
        if (Dep.target) {
          if (true) {
            dep.depend({
              target: obj,
              type: "get",
              key
            });
          } else {
            dep.depend();
          }
          if (childOb) {
            childOb.dep.depend();
            if (isArray(value)) {
              dependArray(value);
            }
          }
        }
        return isRef(value) && !shallow ? value.value : value;
      },
      set: function reactiveSetter(newVal) {
        var value = getter ? getter.call(obj) : val;
        if (!hasChanged(value, newVal)) {
          return;
        }
        if (customSetter) {
          customSetter();
        }
        if (setter) {
          setter.call(obj, newVal);
        } else if (getter) {
          return;
        } else if (!shallow && isRef(value) && !isRef(newVal)) {
          value.value = newVal;
          return;
        } else {
          val = newVal;
        }
        childOb = !shallow && observe(newVal, false, mock);
        if (true) {
          dep.notify({
            type: "set",
            target: obj,
            key,
            newValue: newVal,
            oldValue: value
          });
        } else {
          dep.notify();
        }
      }
    });
    return dep;
  }
  function set(target2, key, val) {
    if (isUndef(target2) || isPrimitive(target2)) {
      warn$2("Cannot set reactive property on undefined, null, or primitive value: ".concat(target2));
    }
    if (isReadonly(target2)) {
      warn$2('Set operation on key "'.concat(key, '" failed: target is readonly.'));
      return;
    }
    var ob = target2.__ob__;
    if (isArray(target2) && isValidArrayIndex(key)) {
      target2.length = Math.max(target2.length, key);
      target2.splice(key, 1, val);
      if (ob && !ob.shallow && ob.mock) {
        observe(val, false, true);
      }
      return val;
    }
    if (key in target2 && !(key in Object.prototype)) {
      target2[key] = val;
      return val;
    }
    if (target2._isVue || ob && ob.vmCount) {
      warn$2("Avoid adding reactive properties to a Vue instance or its root $data at runtime - declare it upfront in the data option.");
      return val;
    }
    if (!ob) {
      target2[key] = val;
      return val;
    }
    defineReactive(ob.value, key, val, void 0, ob.shallow, ob.mock);
    if (true) {
      ob.dep.notify({
        type: "add",
        target: target2,
        key,
        newValue: val,
        oldValue: void 0
      });
    } else {
      ob.dep.notify();
    }
    return val;
  }
  function del(target2, key) {
    if (isUndef(target2) || isPrimitive(target2)) {
      warn$2("Cannot delete reactive property on undefined, null, or primitive value: ".concat(target2));
    }
    if (isArray(target2) && isValidArrayIndex(key)) {
      target2.splice(key, 1);
      return;
    }
    var ob = target2.__ob__;
    if (target2._isVue || ob && ob.vmCount) {
      warn$2("Avoid deleting properties on a Vue instance or its root $data - just set it to null.");
      return;
    }
    if (isReadonly(target2)) {
      warn$2('Delete operation on key "'.concat(key, '" failed: target is readonly.'));
      return;
    }
    if (!hasOwn(target2, key)) {
      return;
    }
    delete target2[key];
    if (!ob) {
      return;
    }
    if (true) {
      ob.dep.notify({
        type: "delete",
        target: target2,
        key
      });
    } else {
      ob.dep.notify();
    }
  }
  function dependArray(value) {
    for (var e = void 0, i = 0, l = value.length; i < l; i++) {
      e = value[i];
      if (e && e.__ob__) {
        e.__ob__.dep.depend();
      }
      if (isArray(e)) {
        dependArray(e);
      }
    }
  }
  function shallowReactive(target2) {
    makeReactive(target2, true);
    def(target2, "__v_isShallow", true);
    return target2;
  }
  function makeReactive(target2, shallow) {
    if (!isReadonly(target2)) {
      if (true) {
        if (isArray(target2)) {
          warn$2("Avoid using Array as root value for ".concat(shallow ? "shallowReactive()" : "reactive()", " as it cannot be tracked in watch() or watchEffect(). Use ").concat(shallow ? "shallowRef()" : "ref()", " instead. This is a Vue-2-only limitation."));
        }
        var existingOb = target2 && target2.__ob__;
        if (existingOb && existingOb.shallow !== shallow) {
          warn$2("Target is already a ".concat(existingOb.shallow ? "" : "non-", "shallow reactive object, and cannot be converted to ").concat(shallow ? "" : "non-", "shallow."));
        }
      }
      var ob = observe(target2, shallow, isServerRendering());
      if (!ob) {
        if (target2 == null || isPrimitive(target2)) {
          warn$2("value cannot be made reactive: ".concat(String(target2)));
        }
        if (isCollectionType(target2)) {
          warn$2("Vue 2 does not support reactive collection types such as Map or Set.");
        }
      }
    }
  }
  function isReadonly(value) {
    return !!(value && value.__v_isReadonly);
  }
  function isCollectionType(value) {
    var type = toRawType(value);
    return type === "Map" || type === "WeakMap" || type === "Set" || type === "WeakSet";
  }
  function isRef(r) {
    return !!(r && r.__v_isRef === true);
  }
  function proxyWithRefUnwrap(target2, source, key) {
    Object.defineProperty(target2, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        var val = source[key];
        if (isRef(val)) {
          return val.value;
        } else {
          var ob = val && val.__ob__;
          if (ob)
            ob.dep.depend();
          return val;
        }
      },
      set: function(value) {
        var oldValue = source[key];
        if (isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
        } else {
          source[key] = value;
        }
      }
    });
  }
  var mark;
  var measure;
  if (true) {
    perf_1 = inBrowser && window.performance;
    if (perf_1 && perf_1.mark && perf_1.measure && perf_1.clearMarks && perf_1.clearMeasures) {
      mark = function(tag) {
        return perf_1.mark(tag);
      };
      measure = function(name, startTag, endTag2) {
        perf_1.measure(name, startTag, endTag2);
        perf_1.clearMarks(startTag);
        perf_1.clearMarks(endTag2);
      };
    }
  }
  var perf_1;
  var normalizeEvent = cached(function(name) {
    var passive = name.charAt(0) === "&";
    name = passive ? name.slice(1) : name;
    var once2 = name.charAt(0) === "~";
    name = once2 ? name.slice(1) : name;
    var capture = name.charAt(0) === "!";
    name = capture ? name.slice(1) : name;
    return {
      name,
      once: once2,
      capture,
      passive
    };
  });
  function createFnInvoker(fns, vm) {
    function invoker() {
      var fns2 = invoker.fns;
      if (isArray(fns2)) {
        var cloned = fns2.slice();
        for (var i = 0; i < cloned.length; i++) {
          invokeWithErrorHandling(cloned[i], null, arguments, vm, "v-on handler");
        }
      } else {
        return invokeWithErrorHandling(fns2, null, arguments, vm, "v-on handler");
      }
    }
    invoker.fns = fns;
    return invoker;
  }
  function updateListeners(on2, oldOn, add2, remove2, createOnceHandler2, vm) {
    var name, cur, old, event;
    for (name in on2) {
      cur = on2[name];
      old = oldOn[name];
      event = normalizeEvent(name);
      if (isUndef(cur)) {
        warn$2('Invalid handler for event "'.concat(event.name, '": got ') + String(cur), vm);
      } else if (isUndef(old)) {
        if (isUndef(cur.fns)) {
          cur = on2[name] = createFnInvoker(cur, vm);
        }
        if (isTrue(event.once)) {
          cur = on2[name] = createOnceHandler2(event.name, cur, event.capture);
        }
        add2(event.name, cur, event.capture, event.passive, event.params);
      } else if (cur !== old) {
        old.fns = cur;
        on2[name] = old;
      }
    }
    for (name in oldOn) {
      if (isUndef(on2[name])) {
        event = normalizeEvent(name);
        remove2(event.name, oldOn[name], event.capture);
      }
    }
  }
  function mergeVNodeHook(def2, hookKey, hook) {
    if (def2 instanceof VNode) {
      def2 = def2.data.hook || (def2.data.hook = {});
    }
    var invoker;
    var oldHook = def2[hookKey];
    function wrappedHook() {
      hook.apply(this, arguments);
      remove$2(invoker.fns, wrappedHook);
    }
    if (isUndef(oldHook)) {
      invoker = createFnInvoker([wrappedHook]);
    } else {
      if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
        invoker = oldHook;
        invoker.fns.push(wrappedHook);
      } else {
        invoker = createFnInvoker([oldHook, wrappedHook]);
      }
    }
    invoker.merged = true;
    def2[hookKey] = invoker;
  }
  function extractPropsFromVNodeData(data, Ctor, tag) {
    var propOptions = Ctor.options.props;
    if (isUndef(propOptions)) {
      return;
    }
    var res = {};
    var attrs2 = data.attrs, props2 = data.props;
    if (isDef(attrs2) || isDef(props2)) {
      for (var key in propOptions) {
        var altKey = hyphenate(key);
        if (true) {
          var keyInLowerCase = key.toLowerCase();
          if (key !== keyInLowerCase && attrs2 && hasOwn(attrs2, keyInLowerCase)) {
            tip('Prop "'.concat(keyInLowerCase, '" is passed to component ') + "".concat(formatComponentName(
              tag || Ctor
            ), ", but the declared prop name is") + ' "'.concat(key, '". ') + "Note that HTML attributes are case-insensitive and camelCased props need to use their kebab-case equivalents when using in-DOM " + 'templates. You should probably use "'.concat(altKey, '" instead of "').concat(key, '".'));
          }
        }
        checkProp(res, props2, key, altKey, true) || checkProp(res, attrs2, key, altKey, false);
      }
    }
    return res;
  }
  function checkProp(res, hash2, key, altKey, preserve) {
    if (isDef(hash2)) {
      if (hasOwn(hash2, key)) {
        res[key] = hash2[key];
        if (!preserve) {
          delete hash2[key];
        }
        return true;
      } else if (hasOwn(hash2, altKey)) {
        res[key] = hash2[altKey];
        if (!preserve) {
          delete hash2[altKey];
        }
        return true;
      }
    }
    return false;
  }
  function simpleNormalizeChildren(children) {
    for (var i = 0; i < children.length; i++) {
      if (isArray(children[i])) {
        return Array.prototype.concat.apply([], children);
      }
    }
    return children;
  }
  function normalizeChildren(children) {
    return isPrimitive(children) ? [createTextVNode(children)] : isArray(children) ? normalizeArrayChildren(children) : void 0;
  }
  function isTextNode(node) {
    return isDef(node) && isDef(node.text) && isFalse(node.isComment);
  }
  function normalizeArrayChildren(children, nestedIndex) {
    var res = [];
    var i, c, lastIndex, last;
    for (i = 0; i < children.length; i++) {
      c = children[i];
      if (isUndef(c) || typeof c === "boolean")
        continue;
      lastIndex = res.length - 1;
      last = res[lastIndex];
      if (isArray(c)) {
        if (c.length > 0) {
          c = normalizeArrayChildren(c, "".concat(nestedIndex || "", "_").concat(i));
          if (isTextNode(c[0]) && isTextNode(last)) {
            res[lastIndex] = createTextVNode(last.text + c[0].text);
            c.shift();
          }
          res.push.apply(res, c);
        }
      } else if (isPrimitive(c)) {
        if (isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c);
        } else if (c !== "") {
          res.push(createTextVNode(c));
        }
      } else {
        if (isTextNode(c) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c.text);
        } else {
          if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
            c.key = "__vlist".concat(nestedIndex, "_").concat(i, "__");
          }
          res.push(c);
        }
      }
    }
    return res;
  }
  var SIMPLE_NORMALIZE = 1;
  var ALWAYS_NORMALIZE = 2;
  function createElement$1(context, tag, data, children, normalizationType, alwaysNormalize) {
    if (isArray(data) || isPrimitive(data)) {
      normalizationType = children;
      children = data;
      data = void 0;
    }
    if (isTrue(alwaysNormalize)) {
      normalizationType = ALWAYS_NORMALIZE;
    }
    return _createElement(context, tag, data, children, normalizationType);
  }
  function _createElement(context, tag, data, children, normalizationType) {
    if (isDef(data) && isDef(data.__ob__)) {
      warn$2("Avoid using observed data object as vnode data: ".concat(JSON.stringify(data), "\n") + "Always create fresh vnode data objects in each render!", context);
      return createEmptyVNode();
    }
    if (isDef(data) && isDef(data.is)) {
      tag = data.is;
    }
    if (!tag) {
      return createEmptyVNode();
    }
    if (isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
      warn$2("Avoid using non-primitive value as key, use string/number value instead.", context);
    }
    if (isArray(children) && isFunction(children[0])) {
      data = data || {};
      data.scopedSlots = { default: children[0] };
      children.length = 0;
    }
    if (normalizationType === ALWAYS_NORMALIZE) {
      children = normalizeChildren(children);
    } else if (normalizationType === SIMPLE_NORMALIZE) {
      children = simpleNormalizeChildren(children);
    }
    var vnode, ns;
    if (typeof tag === "string") {
      var Ctor = void 0;
      ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);
      if (config.isReservedTag(tag)) {
        if (isDef(data) && isDef(data.nativeOn) && data.tag !== "component") {
          warn$2("The .native modifier for v-on is only valid on components but it was used on <".concat(tag, ">."), context);
        }
        vnode = new VNode(config.parsePlatformTagName(tag), data, children, void 0, void 0, context);
      } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, "components", tag))) {
        vnode = createComponent(Ctor, data, context, children, tag);
      } else {
        vnode = new VNode(tag, data, children, void 0, void 0, context);
      }
    } else {
      vnode = createComponent(tag, data, context, children);
    }
    if (isArray(vnode)) {
      return vnode;
    } else if (isDef(vnode)) {
      if (isDef(ns))
        applyNS(vnode, ns);
      if (isDef(data))
        registerDeepBindings(data);
      return vnode;
    } else {
      return createEmptyVNode();
    }
  }
  function applyNS(vnode, ns, force) {
    vnode.ns = ns;
    if (vnode.tag === "foreignObject") {
      ns = void 0;
      force = true;
    }
    if (isDef(vnode.children)) {
      for (var i = 0, l = vnode.children.length; i < l; i++) {
        var child = vnode.children[i];
        if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== "svg")) {
          applyNS(child, ns, force);
        }
      }
    }
  }
  function registerDeepBindings(data) {
    if (isObject(data.style)) {
      traverse(data.style);
    }
    if (isObject(data.class)) {
      traverse(data.class);
    }
  }
  function renderList(val, render) {
    var ret = null, i, l, keys, key;
    if (isArray(val) || typeof val === "string") {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = render(val[i], i);
      }
    } else if (typeof val === "number") {
      ret = new Array(val);
      for (i = 0; i < val; i++) {
        ret[i] = render(i + 1, i);
      }
    } else if (isObject(val)) {
      if (hasSymbol && val[Symbol.iterator]) {
        ret = [];
        var iterator = val[Symbol.iterator]();
        var result = iterator.next();
        while (!result.done) {
          ret.push(render(result.value, ret.length));
          result = iterator.next();
        }
      } else {
        keys = Object.keys(val);
        ret = new Array(keys.length);
        for (i = 0, l = keys.length; i < l; i++) {
          key = keys[i];
          ret[i] = render(val[key], key, i);
        }
      }
    }
    if (!isDef(ret)) {
      ret = [];
    }
    ret._isVList = true;
    return ret;
  }
  function renderSlot(name, fallbackRender, props2, bindObject) {
    var scopedSlotFn = this.$scopedSlots[name];
    var nodes;
    if (scopedSlotFn) {
      props2 = props2 || {};
      if (bindObject) {
        if (!isObject(bindObject)) {
          warn$2("slot v-bind without argument expects an Object", this);
        }
        props2 = extend(extend({}, bindObject), props2);
      }
      nodes = scopedSlotFn(props2) || (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
    } else {
      nodes = this.$slots[name] || (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
    }
    var target2 = props2 && props2.slot;
    if (target2) {
      return this.$createElement("template", { slot: target2 }, nodes);
    } else {
      return nodes;
    }
  }
  function resolveFilter(id) {
    return resolveAsset(this.$options, "filters", id, true) || identity;
  }
  function isKeyNotMatch(expect, actual) {
    if (isArray(expect)) {
      return expect.indexOf(actual) === -1;
    } else {
      return expect !== actual;
    }
  }
  function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
    var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
    if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
      return isKeyNotMatch(builtInKeyName, eventKeyName);
    } else if (mappedKeyCode) {
      return isKeyNotMatch(mappedKeyCode, eventKeyCode);
    } else if (eventKeyName) {
      return hyphenate(eventKeyName) !== key;
    }
    return eventKeyCode === void 0;
  }
  function bindObjectProps(data, tag, value, asProp, isSync) {
    if (value) {
      if (!isObject(value)) {
        warn$2("v-bind without argument expects an Object or Array value", this);
      } else {
        if (isArray(value)) {
          value = toObject(value);
        }
        var hash2 = void 0;
        var _loop_1 = function(key2) {
          if (key2 === "class" || key2 === "style" || isReservedAttribute(key2)) {
            hash2 = data;
          } else {
            var type = data.attrs && data.attrs.type;
            hash2 = asProp || config.mustUseProp(tag, type, key2) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
          }
          var camelizedKey = camelize(key2);
          var hyphenatedKey = hyphenate(key2);
          if (!(camelizedKey in hash2) && !(hyphenatedKey in hash2)) {
            hash2[key2] = value[key2];
            if (isSync) {
              var on2 = data.on || (data.on = {});
              on2["update:".concat(key2)] = function($event) {
                value[key2] = $event;
              };
            }
          }
        };
        for (var key in value) {
          _loop_1(key);
        }
      }
    }
    return data;
  }
  function renderStatic(index2, isInFor) {
    var cached2 = this._staticTrees || (this._staticTrees = []);
    var tree = cached2[index2];
    if (tree && !isInFor) {
      return tree;
    }
    tree = cached2[index2] = this.$options.staticRenderFns[index2].call(
      this._renderProxy,
      this._c,
      this
    );
    markStatic$1(tree, "__static__".concat(index2), false);
    return tree;
  }
  function markOnce(tree, index2, key) {
    markStatic$1(tree, "__once__".concat(index2).concat(key ? "_".concat(key) : ""), true);
    return tree;
  }
  function markStatic$1(tree, key, isOnce) {
    if (isArray(tree)) {
      for (var i = 0; i < tree.length; i++) {
        if (tree[i] && typeof tree[i] !== "string") {
          markStaticNode(tree[i], "".concat(key, "_").concat(i), isOnce);
        }
      }
    } else {
      markStaticNode(tree, key, isOnce);
    }
  }
  function markStaticNode(node, key, isOnce) {
    node.isStatic = true;
    node.key = key;
    node.isOnce = isOnce;
  }
  function bindObjectListeners(data, value) {
    if (value) {
      if (!isPlainObject(value)) {
        warn$2("v-on without argument expects an Object value", this);
      } else {
        var on2 = data.on = data.on ? extend({}, data.on) : {};
        for (var key in value) {
          var existing = on2[key];
          var ours = value[key];
          on2[key] = existing ? [].concat(existing, ours) : ours;
        }
      }
    }
    return data;
  }
  function resolveScopedSlots(fns, res, hasDynamicKeys, contentHashKey) {
    res = res || { $stable: !hasDynamicKeys };
    for (var i = 0; i < fns.length; i++) {
      var slot = fns[i];
      if (isArray(slot)) {
        resolveScopedSlots(slot, res, hasDynamicKeys);
      } else if (slot) {
        if (slot.proxy) {
          slot.fn.proxy = true;
        }
        res[slot.key] = slot.fn;
      }
    }
    if (contentHashKey) {
      res.$key = contentHashKey;
    }
    return res;
  }
  function bindDynamicKeys(baseObj, values) {
    for (var i = 0; i < values.length; i += 2) {
      var key = values[i];
      if (typeof key === "string" && key) {
        baseObj[values[i]] = values[i + 1];
      } else if (key !== "" && key !== null) {
        warn$2("Invalid value for dynamic directive argument (expected string or null): ".concat(key), this);
      }
    }
    return baseObj;
  }
  function prependModifier(value, symbol) {
    return typeof value === "string" ? symbol + value : value;
  }
  function installRenderHelpers(target2) {
    target2._o = markOnce;
    target2._n = toNumber;
    target2._s = toString;
    target2._l = renderList;
    target2._t = renderSlot;
    target2._q = looseEqual;
    target2._i = looseIndexOf;
    target2._m = renderStatic;
    target2._f = resolveFilter;
    target2._k = checkKeyCodes;
    target2._b = bindObjectProps;
    target2._v = createTextVNode;
    target2._e = createEmptyVNode;
    target2._u = resolveScopedSlots;
    target2._g = bindObjectListeners;
    target2._d = bindDynamicKeys;
    target2._p = prependModifier;
  }
  function resolveSlots(children, context) {
    if (!children || !children.length) {
      return {};
    }
    var slots = {};
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      var data = child.data;
      if (data && data.attrs && data.attrs.slot) {
        delete data.attrs.slot;
      }
      if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
        var name_1 = data.slot;
        var slot = slots[name_1] || (slots[name_1] = []);
        if (child.tag === "template") {
          slot.push.apply(slot, child.children || []);
        } else {
          slot.push(child);
        }
      } else {
        (slots.default || (slots.default = [])).push(child);
      }
    }
    for (var name_2 in slots) {
      if (slots[name_2].every(isWhitespace)) {
        delete slots[name_2];
      }
    }
    return slots;
  }
  function isWhitespace(node) {
    return node.isComment && !node.asyncFactory || node.text === " ";
  }
  function isAsyncPlaceholder(node) {
    return node.isComment && node.asyncFactory;
  }
  function normalizeScopedSlots(ownerVm, scopedSlots, normalSlots, prevScopedSlots) {
    var res;
    var hasNormalSlots = Object.keys(normalSlots).length > 0;
    var isStable = scopedSlots ? !!scopedSlots.$stable : !hasNormalSlots;
    var key = scopedSlots && scopedSlots.$key;
    if (!scopedSlots) {
      res = {};
    } else if (scopedSlots._normalized) {
      return scopedSlots._normalized;
    } else if (isStable && prevScopedSlots && prevScopedSlots !== emptyObject && key === prevScopedSlots.$key && !hasNormalSlots && !prevScopedSlots.$hasNormal) {
      return prevScopedSlots;
    } else {
      res = {};
      for (var key_1 in scopedSlots) {
        if (scopedSlots[key_1] && key_1[0] !== "$") {
          res[key_1] = normalizeScopedSlot(ownerVm, normalSlots, key_1, scopedSlots[key_1]);
        }
      }
    }
    for (var key_2 in normalSlots) {
      if (!(key_2 in res)) {
        res[key_2] = proxyNormalSlot(normalSlots, key_2);
      }
    }
    if (scopedSlots && Object.isExtensible(scopedSlots)) {
      scopedSlots._normalized = res;
    }
    def(res, "$stable", isStable);
    def(res, "$key", key);
    def(res, "$hasNormal", hasNormalSlots);
    return res;
  }
  function normalizeScopedSlot(vm, normalSlots, key, fn) {
    var normalized = function() {
      var cur = currentInstance;
      setCurrentInstance(vm);
      var res = arguments.length ? fn.apply(null, arguments) : fn({});
      res = res && typeof res === "object" && !isArray(res) ? [res] : normalizeChildren(res);
      var vnode = res && res[0];
      setCurrentInstance(cur);
      return res && (!vnode || res.length === 1 && vnode.isComment && !isAsyncPlaceholder(vnode)) ? void 0 : res;
    };
    if (fn.proxy) {
      Object.defineProperty(normalSlots, key, {
        get: normalized,
        enumerable: true,
        configurable: true
      });
    }
    return normalized;
  }
  function proxyNormalSlot(slots, key) {
    return function() {
      return slots[key];
    };
  }
  function initSetup(vm) {
    var options = vm.$options;
    var setup = options.setup;
    if (setup) {
      var ctx = vm._setupContext = createSetupContext(vm);
      setCurrentInstance(vm);
      pushTarget();
      var setupResult = invokeWithErrorHandling(setup, null, [vm._props || shallowReactive({}), ctx], vm, "setup");
      popTarget();
      setCurrentInstance();
      if (isFunction(setupResult)) {
        options.render = setupResult;
      } else if (isObject(setupResult)) {
        if (setupResult instanceof VNode) {
          warn$2("setup() should not return VNodes directly - return a render function instead.");
        }
        vm._setupState = setupResult;
        if (!setupResult.__sfc) {
          for (var key in setupResult) {
            if (!isReserved(key)) {
              proxyWithRefUnwrap(vm, setupResult, key);
            } else if (true) {
              warn$2("Avoid using variables that start with _ or $ in setup().");
            }
          }
        } else {
          var proxy2 = vm._setupProxy = {};
          for (var key in setupResult) {
            if (key !== "__sfc") {
              proxyWithRefUnwrap(proxy2, setupResult, key);
            }
          }
        }
      } else if (setupResult !== void 0) {
        warn$2("setup() should return an object. Received: ".concat(setupResult === null ? "null" : typeof setupResult));
      }
    }
  }
  function createSetupContext(vm) {
    var exposeCalled = false;
    return {
      get attrs() {
        if (!vm._attrsProxy) {
          var proxy2 = vm._attrsProxy = {};
          def(proxy2, "_v_attr_proxy", true);
          syncSetupProxy(proxy2, vm.$attrs, emptyObject, vm, "$attrs");
        }
        return vm._attrsProxy;
      },
      get listeners() {
        if (!vm._listenersProxy) {
          var proxy2 = vm._listenersProxy = {};
          syncSetupProxy(proxy2, vm.$listeners, emptyObject, vm, "$listeners");
        }
        return vm._listenersProxy;
      },
      get slots() {
        return initSlotsProxy(vm);
      },
      emit: bind$1(vm.$emit, vm),
      expose: function(exposed) {
        if (true) {
          if (exposeCalled) {
            warn$2("expose() should be called only once per setup().", vm);
          }
          exposeCalled = true;
        }
        if (exposed) {
          Object.keys(exposed).forEach(function(key) {
            return proxyWithRefUnwrap(vm, exposed, key);
          });
        }
      }
    };
  }
  function syncSetupProxy(to, from, prev, instance, type) {
    var changed = false;
    for (var key in from) {
      if (!(key in to)) {
        changed = true;
        defineProxyAttr(to, key, instance, type);
      } else if (from[key] !== prev[key]) {
        changed = true;
      }
    }
    for (var key in to) {
      if (!(key in from)) {
        changed = true;
        delete to[key];
      }
    }
    return changed;
  }
  function defineProxyAttr(proxy2, key, instance, type) {
    Object.defineProperty(proxy2, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        return instance[type][key];
      }
    });
  }
  function initSlotsProxy(vm) {
    if (!vm._slotsProxy) {
      syncSetupSlots(vm._slotsProxy = {}, vm.$scopedSlots);
    }
    return vm._slotsProxy;
  }
  function syncSetupSlots(to, from) {
    for (var key in from) {
      to[key] = from[key];
    }
    for (var key in to) {
      if (!(key in from)) {
        delete to[key];
      }
    }
  }
  function initRender(vm) {
    vm._vnode = null;
    vm._staticTrees = null;
    var options = vm.$options;
    var parentVnode = vm.$vnode = options._parentVnode;
    var renderContext = parentVnode && parentVnode.context;
    vm.$slots = resolveSlots(options._renderChildren, renderContext);
    vm.$scopedSlots = parentVnode ? normalizeScopedSlots(vm.$parent, parentVnode.data.scopedSlots, vm.$slots) : emptyObject;
    vm._c = function(a, b, c, d) {
      return createElement$1(vm, a, b, c, d, false);
    };
    vm.$createElement = function(a, b, c, d) {
      return createElement$1(vm, a, b, c, d, true);
    };
    var parentData = parentVnode && parentVnode.data;
    if (true) {
      defineReactive(vm, "$attrs", parentData && parentData.attrs || emptyObject, function() {
        !isUpdatingChildComponent && warn$2("$attrs is readonly.", vm);
      }, true);
      defineReactive(vm, "$listeners", options._parentListeners || emptyObject, function() {
        !isUpdatingChildComponent && warn$2("$listeners is readonly.", vm);
      }, true);
    } else {
      defineReactive(vm, "$attrs", parentData && parentData.attrs || emptyObject, null, true);
      defineReactive(vm, "$listeners", options._parentListeners || emptyObject, null, true);
    }
  }
  var currentRenderingInstance = null;
  function renderMixin(Vue2) {
    installRenderHelpers(Vue2.prototype);
    Vue2.prototype.$nextTick = function(fn) {
      return nextTick(fn, this);
    };
    Vue2.prototype._render = function() {
      var vm = this;
      var _a2 = vm.$options, render = _a2.render, _parentVnode = _a2._parentVnode;
      if (_parentVnode && vm._isMounted) {
        vm.$scopedSlots = normalizeScopedSlots(vm.$parent, _parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
        if (vm._slotsProxy) {
          syncSetupSlots(vm._slotsProxy, vm.$scopedSlots);
        }
      }
      vm.$vnode = _parentVnode;
      var vnode;
      try {
        setCurrentInstance(vm);
        currentRenderingInstance = vm;
        vnode = render.call(vm._renderProxy, vm.$createElement);
      } catch (e) {
        handleError(e, vm, "render");
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e2) {
            handleError(e2, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } finally {
        currentRenderingInstance = null;
        setCurrentInstance();
      }
      if (isArray(vnode) && vnode.length === 1) {
        vnode = vnode[0];
      }
      if (!(vnode instanceof VNode)) {
        if (isArray(vnode)) {
          warn$2("Multiple root nodes returned from render function. Render function should return a single root node.", vm);
        }
        vnode = createEmptyVNode();
      }
      vnode.parent = _parentVnode;
      return vnode;
    };
  }
  function ensureCtor(comp, base) {
    if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === "Module") {
      comp = comp.default;
    }
    return isObject(comp) ? base.extend(comp) : comp;
  }
  function createAsyncPlaceholder(factory, data, context, children, tag) {
    var node = createEmptyVNode();
    node.asyncFactory = factory;
    node.asyncMeta = { data, context, children, tag };
    return node;
  }
  function resolveAsyncComponent(factory, baseCtor) {
    if (isTrue(factory.error) && isDef(factory.errorComp)) {
      return factory.errorComp;
    }
    if (isDef(factory.resolved)) {
      return factory.resolved;
    }
    var owner = currentRenderingInstance;
    if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
      factory.owners.push(owner);
    }
    if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
      return factory.loadingComp;
    }
    if (owner && !isDef(factory.owners)) {
      var owners_1 = factory.owners = [owner];
      var sync_1 = true;
      var timerLoading_1 = null;
      var timerTimeout_1 = null;
      owner.$on("hook:destroyed", function() {
        return remove$2(owners_1, owner);
      });
      var forceRender_1 = function(renderCompleted) {
        for (var i = 0, l = owners_1.length; i < l; i++) {
          owners_1[i].$forceUpdate();
        }
        if (renderCompleted) {
          owners_1.length = 0;
          if (timerLoading_1 !== null) {
            clearTimeout(timerLoading_1);
            timerLoading_1 = null;
          }
          if (timerTimeout_1 !== null) {
            clearTimeout(timerTimeout_1);
            timerTimeout_1 = null;
          }
        }
      };
      var resolve = once(function(res) {
        factory.resolved = ensureCtor(res, baseCtor);
        if (!sync_1) {
          forceRender_1(true);
        } else {
          owners_1.length = 0;
        }
      });
      var reject_1 = once(function(reason) {
        warn$2("Failed to resolve async component: ".concat(String(factory)) + (reason ? "\nReason: ".concat(reason) : ""));
        if (isDef(factory.errorComp)) {
          factory.error = true;
          forceRender_1(true);
        }
      });
      var res_1 = factory(resolve, reject_1);
      if (isObject(res_1)) {
        if (isPromise(res_1)) {
          if (isUndef(factory.resolved)) {
            res_1.then(resolve, reject_1);
          }
        } else if (isPromise(res_1.component)) {
          res_1.component.then(resolve, reject_1);
          if (isDef(res_1.error)) {
            factory.errorComp = ensureCtor(res_1.error, baseCtor);
          }
          if (isDef(res_1.loading)) {
            factory.loadingComp = ensureCtor(res_1.loading, baseCtor);
            if (res_1.delay === 0) {
              factory.loading = true;
            } else {
              timerLoading_1 = setTimeout(function() {
                timerLoading_1 = null;
                if (isUndef(factory.resolved) && isUndef(factory.error)) {
                  factory.loading = true;
                  forceRender_1(false);
                }
              }, res_1.delay || 200);
            }
          }
          if (isDef(res_1.timeout)) {
            timerTimeout_1 = setTimeout(function() {
              timerTimeout_1 = null;
              if (isUndef(factory.resolved)) {
                reject_1(true ? "timeout (".concat(res_1.timeout, "ms)") : null);
              }
            }, res_1.timeout);
          }
        }
      }
      sync_1 = false;
      return factory.loading ? factory.loadingComp : factory.resolved;
    }
  }
  function getFirstComponentChild(children) {
    if (isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        var c = children[i];
        if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
          return c;
        }
      }
    }
  }
  function initEvents(vm) {
    vm._events = /* @__PURE__ */ Object.create(null);
    vm._hasHookEvent = false;
    var listeners = vm.$options._parentListeners;
    if (listeners) {
      updateComponentListeners(vm, listeners);
    }
  }
  var target$1;
  function add$1(event, fn) {
    target$1.$on(event, fn);
  }
  function remove$1(event, fn) {
    target$1.$off(event, fn);
  }
  function createOnceHandler$1(event, fn) {
    var _target = target$1;
    return function onceHandler() {
      var res = fn.apply(null, arguments);
      if (res !== null) {
        _target.$off(event, onceHandler);
      }
    };
  }
  function updateComponentListeners(vm, listeners, oldListeners) {
    target$1 = vm;
    updateListeners(listeners, oldListeners || {}, add$1, remove$1, createOnceHandler$1, vm);
    target$1 = void 0;
  }
  function eventsMixin(Vue2) {
    var hookRE = /^hook:/;
    Vue2.prototype.$on = function(event, fn) {
      var vm = this;
      if (isArray(event)) {
        for (var i = 0, l = event.length; i < l; i++) {
          vm.$on(event[i], fn);
        }
      } else {
        (vm._events[event] || (vm._events[event] = [])).push(fn);
        if (hookRE.test(event)) {
          vm._hasHookEvent = true;
        }
      }
      return vm;
    };
    Vue2.prototype.$once = function(event, fn) {
      var vm = this;
      function on2() {
        vm.$off(event, on2);
        fn.apply(vm, arguments);
      }
      on2.fn = fn;
      vm.$on(event, on2);
      return vm;
    };
    Vue2.prototype.$off = function(event, fn) {
      var vm = this;
      if (!arguments.length) {
        vm._events = /* @__PURE__ */ Object.create(null);
        return vm;
      }
      if (isArray(event)) {
        for (var i_1 = 0, l = event.length; i_1 < l; i_1++) {
          vm.$off(event[i_1], fn);
        }
        return vm;
      }
      var cbs = vm._events[event];
      if (!cbs) {
        return vm;
      }
      if (!fn) {
        vm._events[event] = null;
        return vm;
      }
      var cb;
      var i = cbs.length;
      while (i--) {
        cb = cbs[i];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i, 1);
          break;
        }
      }
      return vm;
    };
    Vue2.prototype.$emit = function(event) {
      var vm = this;
      if (true) {
        var lowerCaseEvent = event.toLowerCase();
        if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
          tip('Event "'.concat(lowerCaseEvent, '" is emitted in component ') + "".concat(formatComponentName(vm), ' but the handler is registered for "').concat(event, '". ') + "Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. " + 'You should probably use "'.concat(hyphenate(event), '" instead of "').concat(event, '".'));
        }
      }
      var cbs = vm._events[event];
      if (cbs) {
        cbs = cbs.length > 1 ? toArray(cbs) : cbs;
        var args = toArray(arguments, 1);
        var info = 'event handler for "'.concat(event, '"');
        for (var i = 0, l = cbs.length; i < l; i++) {
          invokeWithErrorHandling(cbs[i], vm, args, vm, info);
        }
      }
      return vm;
    };
  }
  var activeInstance = null;
  var isUpdatingChildComponent = false;
  function setActiveInstance(vm) {
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    return function() {
      activeInstance = prevActiveInstance;
    };
  }
  function initLifecycle(vm) {
    var options = vm.$options;
    var parent = options.parent;
    if (parent && !options.abstract) {
      while (parent.$options.abstract && parent.$parent) {
        parent = parent.$parent;
      }
      parent.$children.push(vm);
    }
    vm.$parent = parent;
    vm.$root = parent ? parent.$root : vm;
    vm.$children = [];
    vm.$refs = {};
    vm._provided = parent ? parent._provided : /* @__PURE__ */ Object.create(null);
    vm._watcher = null;
    vm._inactive = null;
    vm._directInactive = false;
    vm._isMounted = false;
    vm._isDestroyed = false;
    vm._isBeingDestroyed = false;
  }
  function lifecycleMixin(Vue2) {
    Vue2.prototype._update = function(vnode, hydrating) {
      var vm = this;
      var prevEl = vm.$el;
      var prevVnode = vm._vnode;
      var restoreActiveInstance = setActiveInstance(vm);
      vm._vnode = vnode;
      if (!prevVnode) {
        vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false);
      } else {
        vm.$el = vm.__patch__(prevVnode, vnode);
      }
      restoreActiveInstance();
      if (prevEl) {
        prevEl.__vue__ = null;
      }
      if (vm.$el) {
        vm.$el.__vue__ = vm;
      }
      var wrapper = vm;
      while (wrapper && wrapper.$vnode && wrapper.$parent && wrapper.$vnode === wrapper.$parent._vnode) {
        wrapper.$parent.$el = wrapper.$el;
        wrapper = wrapper.$parent;
      }
    };
    Vue2.prototype.$forceUpdate = function() {
      var vm = this;
      if (vm._watcher) {
        vm._watcher.update();
      }
    };
    Vue2.prototype.$destroy = function() {
      var vm = this;
      if (vm._isBeingDestroyed) {
        return;
      }
      callHook$1(vm, "beforeDestroy");
      vm._isBeingDestroyed = true;
      var parent = vm.$parent;
      if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
        remove$2(parent.$children, vm);
      }
      vm._scope.stop();
      if (vm._data.__ob__) {
        vm._data.__ob__.vmCount--;
      }
      vm._isDestroyed = true;
      vm.__patch__(vm._vnode, null);
      callHook$1(vm, "destroyed");
      vm.$off();
      if (vm.$el) {
        vm.$el.__vue__ = null;
      }
      if (vm.$vnode) {
        vm.$vnode.parent = null;
      }
    };
  }
  function mountComponent(vm, el, hydrating) {
    vm.$el = el;
    if (!vm.$options.render) {
      vm.$options.render = createEmptyVNode;
      if (true) {
        if (vm.$options.template && vm.$options.template.charAt(0) !== "#" || vm.$options.el || el) {
          warn$2("You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.", vm);
        } else {
          warn$2("Failed to mount component: template or render function not defined.", vm);
        }
      }
    }
    callHook$1(vm, "beforeMount");
    var updateComponent;
    if (config.performance && mark) {
      updateComponent = function() {
        var name = vm._name;
        var id = vm._uid;
        var startTag = "vue-perf-start:".concat(id);
        var endTag2 = "vue-perf-end:".concat(id);
        mark(startTag);
        var vnode = vm._render();
        mark(endTag2);
        measure("vue ".concat(name, " render"), startTag, endTag2);
        mark(startTag);
        vm._update(vnode, hydrating);
        mark(endTag2);
        measure("vue ".concat(name, " patch"), startTag, endTag2);
      };
    } else {
      updateComponent = function() {
        vm._update(vm._render(), hydrating);
      };
    }
    var watcherOptions = {
      before: function() {
        if (vm._isMounted && !vm._isDestroyed) {
          callHook$1(vm, "beforeUpdate");
        }
      }
    };
    if (true) {
      watcherOptions.onTrack = function(e) {
        return callHook$1(vm, "renderTracked", [e]);
      };
      watcherOptions.onTrigger = function(e) {
        return callHook$1(vm, "renderTriggered", [e]);
      };
    }
    new Watcher(vm, updateComponent, noop, watcherOptions, true);
    hydrating = false;
    var preWatchers = vm._preWatchers;
    if (preWatchers) {
      for (var i = 0; i < preWatchers.length; i++) {
        preWatchers[i].run();
      }
    }
    if (vm.$vnode == null) {
      vm._isMounted = true;
      callHook$1(vm, "mounted");
    }
    return vm;
  }
  function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
    if (true) {
      isUpdatingChildComponent = true;
    }
    var newScopedSlots = parentVnode.data.scopedSlots;
    var oldScopedSlots = vm.$scopedSlots;
    var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key || !newScopedSlots && vm.$scopedSlots.$key);
    var needsForceUpdate = !!(renderChildren || vm.$options._renderChildren || hasDynamicScopedSlot);
    var prevVNode = vm.$vnode;
    vm.$options._parentVnode = parentVnode;
    vm.$vnode = parentVnode;
    if (vm._vnode) {
      vm._vnode.parent = parentVnode;
    }
    vm.$options._renderChildren = renderChildren;
    var attrs2 = parentVnode.data.attrs || emptyObject;
    if (vm._attrsProxy) {
      if (syncSetupProxy(vm._attrsProxy, attrs2, prevVNode.data && prevVNode.data.attrs || emptyObject, vm, "$attrs")) {
        needsForceUpdate = true;
      }
    }
    vm.$attrs = attrs2;
    listeners = listeners || emptyObject;
    var prevListeners = vm.$options._parentListeners;
    if (vm._listenersProxy) {
      syncSetupProxy(vm._listenersProxy, listeners, prevListeners || emptyObject, vm, "$listeners");
    }
    vm.$listeners = vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, prevListeners);
    if (propsData && vm.$options.props) {
      toggleObserving(false);
      var props2 = vm._props;
      var propKeys = vm.$options._propKeys || [];
      for (var i = 0; i < propKeys.length; i++) {
        var key = propKeys[i];
        var propOptions = vm.$options.props;
        props2[key] = validateProp(key, propOptions, propsData, vm);
      }
      toggleObserving(true);
      vm.$options.propsData = propsData;
    }
    if (needsForceUpdate) {
      vm.$slots = resolveSlots(renderChildren, parentVnode.context);
      vm.$forceUpdate();
    }
    if (true) {
      isUpdatingChildComponent = false;
    }
  }
  function isInInactiveTree(vm) {
    while (vm && (vm = vm.$parent)) {
      if (vm._inactive)
        return true;
    }
    return false;
  }
  function activateChildComponent(vm, direct) {
    if (direct) {
      vm._directInactive = false;
      if (isInInactiveTree(vm)) {
        return;
      }
    } else if (vm._directInactive) {
      return;
    }
    if (vm._inactive || vm._inactive === null) {
      vm._inactive = false;
      for (var i = 0; i < vm.$children.length; i++) {
        activateChildComponent(vm.$children[i]);
      }
      callHook$1(vm, "activated");
    }
  }
  function deactivateChildComponent(vm, direct) {
    if (direct) {
      vm._directInactive = true;
      if (isInInactiveTree(vm)) {
        return;
      }
    }
    if (!vm._inactive) {
      vm._inactive = true;
      for (var i = 0; i < vm.$children.length; i++) {
        deactivateChildComponent(vm.$children[i]);
      }
      callHook$1(vm, "deactivated");
    }
  }
  function callHook$1(vm, hook, args, setContext) {
    if (setContext === void 0) {
      setContext = true;
    }
    pushTarget();
    var prev = currentInstance;
    setContext && setCurrentInstance(vm);
    var handlers = vm.$options[hook];
    var info = "".concat(hook, " hook");
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        invokeWithErrorHandling(handlers[i], vm, args || null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit("hook:" + hook);
    }
    setContext && setCurrentInstance(prev);
    popTarget();
  }
  var MAX_UPDATE_COUNT = 100;
  var queue = [];
  var activatedChildren = [];
  var has = {};
  var circular = {};
  var waiting = false;
  var flushing = false;
  var index$1 = 0;
  function resetSchedulerState() {
    index$1 = queue.length = activatedChildren.length = 0;
    has = {};
    if (true) {
      circular = {};
    }
    waiting = flushing = false;
  }
  var currentFlushTimestamp = 0;
  var getNow = Date.now;
  if (inBrowser && !isIE) {
    performance_1 = window.performance;
    if (performance_1 && typeof performance_1.now === "function" && getNow() > document.createEvent("Event").timeStamp) {
      getNow = function() {
        return performance_1.now();
      };
    }
  }
  var performance_1;
  var sortCompareFn = function(a, b) {
    if (a.post) {
      if (!b.post)
        return 1;
    } else if (b.post) {
      return -1;
    }
    return a.id - b.id;
  };
  function flushSchedulerQueue() {
    currentFlushTimestamp = getNow();
    flushing = true;
    var watcher, id;
    queue.sort(sortCompareFn);
    for (index$1 = 0; index$1 < queue.length; index$1++) {
      watcher = queue[index$1];
      if (watcher.before) {
        watcher.before();
      }
      id = watcher.id;
      has[id] = null;
      watcher.run();
      if (has[id] != null) {
        circular[id] = (circular[id] || 0) + 1;
        if (circular[id] > MAX_UPDATE_COUNT) {
          warn$2("You may have an infinite update loop " + (watcher.user ? 'in watcher with expression "'.concat(watcher.expression, '"') : "in a component render function."), watcher.vm);
          break;
        }
      }
    }
    var activatedQueue = activatedChildren.slice();
    var updatedQueue = queue.slice();
    resetSchedulerState();
    callActivatedHooks(activatedQueue);
    callUpdatedHooks(updatedQueue);
    if (devtools && config.devtools) {
      devtools.emit("flush");
    }
  }
  function callUpdatedHooks(queue2) {
    var i = queue2.length;
    while (i--) {
      var watcher = queue2[i];
      var vm = watcher.vm;
      if (vm && vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
        callHook$1(vm, "updated");
      }
    }
  }
  function queueActivatedComponent(vm) {
    vm._inactive = false;
    activatedChildren.push(vm);
  }
  function callActivatedHooks(queue2) {
    for (var i = 0; i < queue2.length; i++) {
      queue2[i]._inactive = true;
      activateChildComponent(queue2[i], true);
    }
  }
  function queueWatcher(watcher) {
    var id = watcher.id;
    if (has[id] != null) {
      return;
    }
    if (watcher === Dep.target && watcher.noRecurse) {
      return;
    }
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      var i = queue.length - 1;
      while (i > index$1 && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    if (!waiting) {
      waiting = true;
      if (!config.async) {
        flushSchedulerQueue();
        return;
      }
      nextTick(flushSchedulerQueue);
    }
  }
  var WATCHER = "watcher";
  var WATCHER_CB = "".concat(WATCHER, " callback");
  var WATCHER_GETTER = "".concat(WATCHER, " getter");
  var WATCHER_CLEANUP = "".concat(WATCHER, " cleanup");
  var activeEffectScope;
  var EffectScope = function() {
    function EffectScope2(detached) {
      if (detached === void 0) {
        detached = false;
      }
      this.active = true;
      this.effects = [];
      this.cleanups = [];
      if (!detached && activeEffectScope) {
        this.parent = activeEffectScope;
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
      }
    }
    EffectScope2.prototype.run = function(fn) {
      if (this.active) {
        var currentEffectScope = activeEffectScope;
        try {
          activeEffectScope = this;
          return fn();
        } finally {
          activeEffectScope = currentEffectScope;
        }
      } else if (true) {
        warn$2("cannot run an inactive effect scope.");
      }
    };
    EffectScope2.prototype.on = function() {
      activeEffectScope = this;
    };
    EffectScope2.prototype.off = function() {
      activeEffectScope = this.parent;
    };
    EffectScope2.prototype.stop = function(fromParent) {
      if (this.active) {
        var i = void 0, l = void 0;
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].teardown();
        }
        for (i = 0, l = this.cleanups.length; i < l; i++) {
          this.cleanups[i]();
        }
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].stop(true);
          }
        }
        if (this.parent && !fromParent) {
          var last = this.parent.scopes.pop();
          if (last && last !== this) {
            this.parent.scopes[this.index] = last;
            last.index = this.index;
          }
        }
        this.active = false;
      }
    };
    return EffectScope2;
  }();
  function recordEffectScope(effect, scope) {
    if (scope === void 0) {
      scope = activeEffectScope;
    }
    if (scope && scope.active) {
      scope.effects.push(effect);
    }
  }
  function resolveProvided(vm) {
    var existing = vm._provided;
    var parentProvides = vm.$parent && vm.$parent._provided;
    if (parentProvides === existing) {
      return vm._provided = Object.create(parentProvides);
    } else {
      return existing;
    }
  }
  function handleError(err, vm, info) {
    pushTarget();
    try {
      if (vm) {
        var cur = vm;
        while (cur = cur.$parent) {
          var hooks2 = cur.$options.errorCaptured;
          if (hooks2) {
            for (var i = 0; i < hooks2.length; i++) {
              try {
                var capture = hooks2[i].call(cur, err, vm, info) === false;
                if (capture)
                  return;
              } catch (e) {
                globalHandleError(e, cur, "errorCaptured hook");
              }
            }
          }
        }
      }
      globalHandleError(err, vm, info);
    } finally {
      popTarget();
    }
  }
  function invokeWithErrorHandling(handler, context, args, vm, info) {
    var res;
    try {
      res = args ? handler.apply(context, args) : handler.call(context);
      if (res && !res._isVue && isPromise(res) && !res._handled) {
        res.catch(function(e) {
          return handleError(e, vm, info + " (Promise/async)");
        });
        res._handled = true;
      }
    } catch (e) {
      handleError(e, vm, info);
    }
    return res;
  }
  function globalHandleError(err, vm, info) {
    if (config.errorHandler) {
      try {
        return config.errorHandler.call(null, err, vm, info);
      } catch (e) {
        if (e !== err) {
          logError(e, null, "config.errorHandler");
        }
      }
    }
    logError(err, vm, info);
  }
  function logError(err, vm, info) {
    if (true) {
      warn$2("Error in ".concat(info, ': "').concat(err.toString(), '"'), vm);
    }
    if (inBrowser && typeof console !== "undefined") {
      console.error(err);
    } else {
      throw err;
    }
  }
  var isUsingMicroTask = false;
  var callbacks = [];
  var pending = false;
  function flushCallbacks() {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }
  var timerFunc;
  if (typeof Promise !== "undefined" && isNative(Promise)) {
    p_1 = Promise.resolve();
    timerFunc = function() {
      p_1.then(flushCallbacks);
      if (isIOS)
        setTimeout(noop);
    };
    isUsingMicroTask = true;
  } else if (!isIE && typeof MutationObserver !== "undefined" && (isNative(MutationObserver) || MutationObserver.toString() === "[object MutationObserverConstructor]")) {
    counter_1 = 1;
    observer = new MutationObserver(flushCallbacks);
    textNode_1 = document.createTextNode(String(counter_1));
    observer.observe(textNode_1, {
      characterData: true
    });
    timerFunc = function() {
      counter_1 = (counter_1 + 1) % 2;
      textNode_1.data = String(counter_1);
    };
    isUsingMicroTask = true;
  } else if (typeof setImmediate !== "undefined" && isNative(setImmediate)) {
    timerFunc = function() {
      setImmediate(flushCallbacks);
    };
  } else {
    timerFunc = function() {
      setTimeout(flushCallbacks, 0);
    };
  }
  var p_1;
  var counter_1;
  var observer;
  var textNode_1;
  function nextTick(cb, ctx) {
    var _resolve;
    callbacks.push(function() {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, "nextTick");
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== "undefined") {
      return new Promise(function(resolve) {
        _resolve = resolve;
      });
    }
  }
  function createLifeCycle(hookName) {
    return function(fn, target2) {
      if (target2 === void 0) {
        target2 = currentInstance;
      }
      if (!target2) {
        warn$2("".concat(formatName(hookName), " is called when there is no active component instance to be ") + "associated with. Lifecycle injection APIs can only be used during execution of setup().");
        return;
      }
      return injectHook(target2, hookName, fn);
    };
  }
  function formatName(name) {
    if (name === "beforeDestroy") {
      name = "beforeUnmount";
    } else if (name === "destroyed") {
      name = "unmounted";
    }
    return "on".concat(name[0].toUpperCase() + name.slice(1));
  }
  function injectHook(instance, hookName, fn) {
    var options = instance.$options;
    options[hookName] = mergeLifecycleHook(options[hookName], fn);
  }
  var onBeforeMount = createLifeCycle("beforeMount");
  var onMounted = createLifeCycle("mounted");
  var onBeforeUpdate = createLifeCycle("beforeUpdate");
  var onUpdated = createLifeCycle("updated");
  var onBeforeUnmount = createLifeCycle("beforeDestroy");
  var onUnmounted = createLifeCycle("destroyed");
  var onActivated = createLifeCycle("activated");
  var onDeactivated = createLifeCycle("deactivated");
  var onServerPrefetch = createLifeCycle("serverPrefetch");
  var onRenderTracked = createLifeCycle("renderTracked");
  var onRenderTriggered = createLifeCycle("renderTriggered");
  var injectErrorCapturedHook = createLifeCycle("errorCaptured");
  var version = "2.7.10";
  var seenObjects = new _Set();
  function traverse(val) {
    _traverse(val, seenObjects);
    seenObjects.clear();
    return val;
  }
  function _traverse(val, seen) {
    var i, keys;
    var isA = isArray(val);
    if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
      return;
    }
    if (val.__ob__) {
      var depId = val.__ob__.dep.id;
      if (seen.has(depId)) {
        return;
      }
      seen.add(depId);
    }
    if (isA) {
      i = val.length;
      while (i--)
        _traverse(val[i], seen);
    } else if (isRef(val)) {
      _traverse(val.value, seen);
    } else {
      keys = Object.keys(val);
      i = keys.length;
      while (i--)
        _traverse(val[keys[i]], seen);
    }
  }
  var uid$1 = 0;
  var Watcher = function() {
    function Watcher2(vm, expOrFn, cb, options, isRenderWatcher) {
      recordEffectScope(
        this,
        activeEffectScope && !activeEffectScope._vm ? activeEffectScope : vm ? vm._scope : void 0
      );
      if ((this.vm = vm) && isRenderWatcher) {
        vm._watcher = this;
      }
      if (options) {
        this.deep = !!options.deep;
        this.user = !!options.user;
        this.lazy = !!options.lazy;
        this.sync = !!options.sync;
        this.before = options.before;
        if (true) {
          this.onTrack = options.onTrack;
          this.onTrigger = options.onTrigger;
        }
      } else {
        this.deep = this.user = this.lazy = this.sync = false;
      }
      this.cb = cb;
      this.id = ++uid$1;
      this.active = true;
      this.post = false;
      this.dirty = this.lazy;
      this.deps = [];
      this.newDeps = [];
      this.depIds = new _Set();
      this.newDepIds = new _Set();
      this.expression = true ? expOrFn.toString() : "";
      if (isFunction(expOrFn)) {
        this.getter = expOrFn;
      } else {
        this.getter = parsePath(expOrFn);
        if (!this.getter) {
          this.getter = noop;
          warn$2('Failed watching path: "'.concat(expOrFn, '" ') + "Watcher only accepts simple dot-delimited paths. For full control, use a function instead.", vm);
        }
      }
      this.value = this.lazy ? void 0 : this.get();
    }
    Watcher2.prototype.get = function() {
      pushTarget(this);
      var value;
      var vm = this.vm;
      try {
        value = this.getter.call(vm, vm);
      } catch (e) {
        if (this.user) {
          handleError(e, vm, 'getter for watcher "'.concat(this.expression, '"'));
        } else {
          throw e;
        }
      } finally {
        if (this.deep) {
          traverse(value);
        }
        popTarget();
        this.cleanupDeps();
      }
      return value;
    };
    Watcher2.prototype.addDep = function(dep) {
      var id = dep.id;
      if (!this.newDepIds.has(id)) {
        this.newDepIds.add(id);
        this.newDeps.push(dep);
        if (!this.depIds.has(id)) {
          dep.addSub(this);
        }
      }
    };
    Watcher2.prototype.cleanupDeps = function() {
      var i = this.deps.length;
      while (i--) {
        var dep = this.deps[i];
        if (!this.newDepIds.has(dep.id)) {
          dep.removeSub(this);
        }
      }
      var tmp = this.depIds;
      this.depIds = this.newDepIds;
      this.newDepIds = tmp;
      this.newDepIds.clear();
      tmp = this.deps;
      this.deps = this.newDeps;
      this.newDeps = tmp;
      this.newDeps.length = 0;
    };
    Watcher2.prototype.update = function() {
      if (this.lazy) {
        this.dirty = true;
      } else if (this.sync) {
        this.run();
      } else {
        queueWatcher(this);
      }
    };
    Watcher2.prototype.run = function() {
      if (this.active) {
        var value = this.get();
        if (value !== this.value || isObject(value) || this.deep) {
          var oldValue = this.value;
          this.value = value;
          if (this.user) {
            var info = 'callback for watcher "'.concat(this.expression, '"');
            invokeWithErrorHandling(this.cb, this.vm, [value, oldValue], this.vm, info);
          } else {
            this.cb.call(this.vm, value, oldValue);
          }
        }
      }
    };
    Watcher2.prototype.evaluate = function() {
      this.value = this.get();
      this.dirty = false;
    };
    Watcher2.prototype.depend = function() {
      var i = this.deps.length;
      while (i--) {
        this.deps[i].depend();
      }
    };
    Watcher2.prototype.teardown = function() {
      if (this.vm && !this.vm._isBeingDestroyed) {
        remove$2(this.vm._scope.effects, this);
      }
      if (this.active) {
        var i = this.deps.length;
        while (i--) {
          this.deps[i].removeSub(this);
        }
        this.active = false;
        if (this.onStop) {
          this.onStop();
        }
      }
    };
    return Watcher2;
  }();
  var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
  };
  function proxy(target2, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
      return this[sourceKey][key];
    };
    sharedPropertyDefinition.set = function proxySetter(val) {
      this[sourceKey][key] = val;
    };
    Object.defineProperty(target2, key, sharedPropertyDefinition);
  }
  function initState(vm) {
    var opts = vm.$options;
    if (opts.props)
      initProps$1(vm, opts.props);
    initSetup(vm);
    if (opts.methods)
      initMethods(vm, opts.methods);
    if (opts.data) {
      initData(vm);
    } else {
      var ob = observe(vm._data = {});
      ob && ob.vmCount++;
    }
    if (opts.computed)
      initComputed$1(vm, opts.computed);
    if (opts.watch && opts.watch !== nativeWatch) {
      initWatch(vm, opts.watch);
    }
  }
  function initProps$1(vm, propsOptions) {
    var propsData = vm.$options.propsData || {};
    var props2 = vm._props = shallowReactive({});
    var keys = vm.$options._propKeys = [];
    var isRoot = !vm.$parent;
    if (!isRoot) {
      toggleObserving(false);
    }
    var _loop_1 = function(key2) {
      keys.push(key2);
      var value = validateProp(key2, propsOptions, propsData, vm);
      if (true) {
        var hyphenatedKey = hyphenate(key2);
        if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
          warn$2('"'.concat(hyphenatedKey, '" is a reserved attribute and cannot be used as component prop.'), vm);
        }
        defineReactive(props2, key2, value, function() {
          if (!isRoot && !isUpdatingChildComponent) {
            warn$2("Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's " + 'value. Prop being mutated: "'.concat(key2, '"'), vm);
          }
        });
      } else {
        defineReactive(props2, key2, value);
      }
      if (!(key2 in vm)) {
        proxy(vm, "_props", key2);
      }
    };
    for (var key in propsOptions) {
      _loop_1(key);
    }
    toggleObserving(true);
  }
  function initData(vm) {
    var data = vm.$options.data;
    data = vm._data = isFunction(data) ? getData(data, vm) : data || {};
    if (!isPlainObject(data)) {
      data = {};
      warn$2("data functions should return an object:\nhttps://v2.vuejs.org/v2/guide/components.html#data-Must-Be-a-Function", vm);
    }
    var keys = Object.keys(data);
    var props2 = vm.$options.props;
    var methods = vm.$options.methods;
    var i = keys.length;
    while (i--) {
      var key = keys[i];
      if (true) {
        if (methods && hasOwn(methods, key)) {
          warn$2('Method "'.concat(key, '" has already been defined as a data property.'), vm);
        }
      }
      if (props2 && hasOwn(props2, key)) {
        warn$2('The data property "'.concat(key, '" is already declared as a prop. ') + "Use prop default value instead.", vm);
      } else if (!isReserved(key)) {
        proxy(vm, "_data", key);
      }
    }
    var ob = observe(data);
    ob && ob.vmCount++;
  }
  function getData(data, vm) {
    pushTarget();
    try {
      return data.call(vm, vm);
    } catch (e) {
      handleError(e, vm, "data()");
      return {};
    } finally {
      popTarget();
    }
  }
  var computedWatcherOptions = { lazy: true };
  function initComputed$1(vm, computed) {
    var watchers = vm._computedWatchers = /* @__PURE__ */ Object.create(null);
    var isSSR = isServerRendering();
    for (var key in computed) {
      var userDef = computed[key];
      var getter = isFunction(userDef) ? userDef : userDef.get;
      if (getter == null) {
        warn$2('Getter is missing for computed property "'.concat(key, '".'), vm);
      }
      if (!isSSR) {
        watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
      }
      if (!(key in vm)) {
        defineComputed(vm, key, userDef);
      } else if (true) {
        if (key in vm.$data) {
          warn$2('The computed property "'.concat(key, '" is already defined in data.'), vm);
        } else if (vm.$options.props && key in vm.$options.props) {
          warn$2('The computed property "'.concat(key, '" is already defined as a prop.'), vm);
        } else if (vm.$options.methods && key in vm.$options.methods) {
          warn$2('The computed property "'.concat(key, '" is already defined as a method.'), vm);
        }
      }
    }
  }
  function defineComputed(target2, key, userDef) {
    var shouldCache = !isServerRendering();
    if (isFunction(userDef)) {
      sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
      sharedPropertyDefinition.set = noop;
    } else {
      sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
      sharedPropertyDefinition.set = userDef.set || noop;
    }
    if (sharedPropertyDefinition.set === noop) {
      sharedPropertyDefinition.set = function() {
        warn$2('Computed property "'.concat(key, '" was assigned to but it has no setter.'), this);
      };
    }
    Object.defineProperty(target2, key, sharedPropertyDefinition);
  }
  function createComputedGetter(key) {
    return function computedGetter() {
      var watcher = this._computedWatchers && this._computedWatchers[key];
      if (watcher) {
        if (watcher.dirty) {
          watcher.evaluate();
        }
        if (Dep.target) {
          if (Dep.target.onTrack) {
            Dep.target.onTrack({
              effect: Dep.target,
              target: this,
              type: "get",
              key
            });
          }
          watcher.depend();
        }
        return watcher.value;
      }
    };
  }
  function createGetterInvoker(fn) {
    return function computedGetter() {
      return fn.call(this, this);
    };
  }
  function initMethods(vm, methods) {
    var props2 = vm.$options.props;
    for (var key in methods) {
      if (true) {
        if (typeof methods[key] !== "function") {
          warn$2('Method "'.concat(key, '" has type "').concat(typeof methods[key], '" in the component definition. ') + "Did you reference the function correctly?", vm);
        }
        if (props2 && hasOwn(props2, key)) {
          warn$2('Method "'.concat(key, '" has already been defined as a prop.'), vm);
        }
        if (key in vm && isReserved(key)) {
          warn$2('Method "'.concat(key, '" conflicts with an existing Vue instance method. ') + "Avoid defining component methods that start with _ or $.");
        }
      }
      vm[key] = typeof methods[key] !== "function" ? noop : bind$1(methods[key], vm);
    }
  }
  function initWatch(vm, watch) {
    for (var key in watch) {
      var handler = watch[key];
      if (isArray(handler)) {
        for (var i = 0; i < handler.length; i++) {
          createWatcher(vm, key, handler[i]);
        }
      } else {
        createWatcher(vm, key, handler);
      }
    }
  }
  function createWatcher(vm, expOrFn, handler, options) {
    if (isPlainObject(handler)) {
      options = handler;
      handler = handler.handler;
    }
    if (typeof handler === "string") {
      handler = vm[handler];
    }
    return vm.$watch(expOrFn, handler, options);
  }
  function stateMixin(Vue2) {
    var dataDef = {};
    dataDef.get = function() {
      return this._data;
    };
    var propsDef = {};
    propsDef.get = function() {
      return this._props;
    };
    if (true) {
      dataDef.set = function() {
        warn$2("Avoid replacing instance root $data. Use nested data properties instead.", this);
      };
      propsDef.set = function() {
        warn$2("$props is readonly.", this);
      };
    }
    Object.defineProperty(Vue2.prototype, "$data", dataDef);
    Object.defineProperty(Vue2.prototype, "$props", propsDef);
    Vue2.prototype.$set = set;
    Vue2.prototype.$delete = del;
    Vue2.prototype.$watch = function(expOrFn, cb, options) {
      var vm = this;
      if (isPlainObject(cb)) {
        return createWatcher(vm, expOrFn, cb, options);
      }
      options = options || {};
      options.user = true;
      var watcher = new Watcher(vm, expOrFn, cb, options);
      if (options.immediate) {
        var info = 'callback for immediate watcher "'.concat(watcher.expression, '"');
        pushTarget();
        invokeWithErrorHandling(cb, vm, [watcher.value], vm, info);
        popTarget();
      }
      return function unwatchFn() {
        watcher.teardown();
      };
    };
  }
  function initProvide(vm) {
    var provideOption = vm.$options.provide;
    if (provideOption) {
      var provided = isFunction(provideOption) ? provideOption.call(vm) : provideOption;
      if (!isObject(provided)) {
        return;
      }
      var source = resolveProvided(vm);
      var keys = hasSymbol ? Reflect.ownKeys(provided) : Object.keys(provided);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        Object.defineProperty(source, key, Object.getOwnPropertyDescriptor(provided, key));
      }
    }
  }
  function initInjections(vm) {
    var result = resolveInject(vm.$options.inject, vm);
    if (result) {
      toggleObserving(false);
      Object.keys(result).forEach(function(key) {
        if (true) {
          defineReactive(vm, key, result[key], function() {
            warn$2("Avoid mutating an injected value directly since the changes will be overwritten whenever the provided component re-renders. " + 'injection being mutated: "'.concat(key, '"'), vm);
          });
        } else {
          defineReactive(vm, key, result[key]);
        }
      });
      toggleObserving(true);
    }
  }
  function resolveInject(inject, vm) {
    if (inject) {
      var result = /* @__PURE__ */ Object.create(null);
      var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key === "__ob__")
          continue;
        var provideKey = inject[key].from;
        if (provideKey in vm._provided) {
          result[key] = vm._provided[provideKey];
        } else if ("default" in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = isFunction(provideDefault) ? provideDefault.call(vm) : provideDefault;
        } else if (true) {
          warn$2('Injection "'.concat(key, '" not found'), vm);
        }
      }
      return result;
    }
  }
  var uid = 0;
  function initMixin$1(Vue2) {
    Vue2.prototype._init = function(options) {
      var vm = this;
      vm._uid = uid++;
      var startTag, endTag2;
      if (config.performance && mark) {
        startTag = "vue-perf-start:".concat(vm._uid);
        endTag2 = "vue-perf-end:".concat(vm._uid);
        mark(startTag);
      }
      vm._isVue = true;
      vm.__v_skip = true;
      vm._scope = new EffectScope(true);
      vm._scope._vm = true;
      if (options && options._isComponent) {
        initInternalComponent(vm, options);
      } else {
        vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
      }
      if (true) {
        initProxy(vm);
      } else {
        vm._renderProxy = vm;
      }
      vm._self = vm;
      initLifecycle(vm);
      initEvents(vm);
      initRender(vm);
      callHook$1(vm, "beforeCreate", void 0, false);
      initInjections(vm);
      initState(vm);
      initProvide(vm);
      callHook$1(vm, "created");
      if (config.performance && mark) {
        vm._name = formatComponentName(vm, false);
        mark(endTag2);
        measure("vue ".concat(vm._name, " init"), startTag, endTag2);
      }
      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };
  }
  function initInternalComponent(vm, options) {
    var opts = vm.$options = Object.create(vm.constructor.options);
    var parentVnode = options._parentVnode;
    opts.parent = options.parent;
    opts._parentVnode = parentVnode;
    var vnodeComponentOptions = parentVnode.componentOptions;
    opts.propsData = vnodeComponentOptions.propsData;
    opts._parentListeners = vnodeComponentOptions.listeners;
    opts._renderChildren = vnodeComponentOptions.children;
    opts._componentTag = vnodeComponentOptions.tag;
    if (options.render) {
      opts.render = options.render;
      opts.staticRenderFns = options.staticRenderFns;
    }
  }
  function resolveConstructorOptions(Ctor) {
    var options = Ctor.options;
    if (Ctor.super) {
      var superOptions = resolveConstructorOptions(Ctor.super);
      var cachedSuperOptions = Ctor.superOptions;
      if (superOptions !== cachedSuperOptions) {
        Ctor.superOptions = superOptions;
        var modifiedOptions = resolveModifiedOptions(Ctor);
        if (modifiedOptions) {
          extend(Ctor.extendOptions, modifiedOptions);
        }
        options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
        if (options.name) {
          options.components[options.name] = Ctor;
        }
      }
    }
    return options;
  }
  function resolveModifiedOptions(Ctor) {
    var modified;
    var latest = Ctor.options;
    var sealed = Ctor.sealedOptions;
    for (var key in latest) {
      if (latest[key] !== sealed[key]) {
        if (!modified)
          modified = {};
        modified[key] = latest[key];
      }
    }
    return modified;
  }
  function FunctionalRenderContext(data, props2, children, parent, Ctor) {
    var _this = this;
    var options = Ctor.options;
    var contextVm;
    if (hasOwn(parent, "_uid")) {
      contextVm = Object.create(parent);
      contextVm._original = parent;
    } else {
      contextVm = parent;
      parent = parent._original;
    }
    var isCompiled = isTrue(options._compiled);
    var needNormalization = !isCompiled;
    this.data = data;
    this.props = props2;
    this.children = children;
    this.parent = parent;
    this.listeners = data.on || emptyObject;
    this.injections = resolveInject(options.inject, parent);
    this.slots = function() {
      if (!_this.$slots) {
        normalizeScopedSlots(parent, data.scopedSlots, _this.$slots = resolveSlots(children, parent));
      }
      return _this.$slots;
    };
    Object.defineProperty(this, "scopedSlots", {
      enumerable: true,
      get: function() {
        return normalizeScopedSlots(parent, data.scopedSlots, this.slots());
      }
    });
    if (isCompiled) {
      this.$options = options;
      this.$slots = this.slots();
      this.$scopedSlots = normalizeScopedSlots(parent, data.scopedSlots, this.$slots);
    }
    if (options._scopeId) {
      this._c = function(a, b, c, d) {
        var vnode = createElement$1(contextVm, a, b, c, d, needNormalization);
        if (vnode && !isArray(vnode)) {
          vnode.fnScopeId = options._scopeId;
          vnode.fnContext = parent;
        }
        return vnode;
      };
    } else {
      this._c = function(a, b, c, d) {
        return createElement$1(contextVm, a, b, c, d, needNormalization);
      };
    }
  }
  installRenderHelpers(FunctionalRenderContext.prototype);
  function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
    var options = Ctor.options;
    var props2 = {};
    var propOptions = options.props;
    if (isDef(propOptions)) {
      for (var key in propOptions) {
        props2[key] = validateProp(key, propOptions, propsData || emptyObject);
      }
    } else {
      if (isDef(data.attrs))
        mergeProps(props2, data.attrs);
      if (isDef(data.props))
        mergeProps(props2, data.props);
    }
    var renderContext = new FunctionalRenderContext(data, props2, children, contextVm, Ctor);
    var vnode = options.render.call(null, renderContext._c, renderContext);
    if (vnode instanceof VNode) {
      return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
    } else if (isArray(vnode)) {
      var vnodes = normalizeChildren(vnode) || [];
      var res = new Array(vnodes.length);
      for (var i = 0; i < vnodes.length; i++) {
        res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
      }
      return res;
    }
  }
  function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
    var clone = cloneVNode(vnode);
    clone.fnContext = contextVm;
    clone.fnOptions = options;
    if (true) {
      (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
    }
    if (data.slot) {
      (clone.data || (clone.data = {})).slot = data.slot;
    }
    return clone;
  }
  function mergeProps(to, from) {
    for (var key in from) {
      to[camelize(key)] = from[key];
    }
  }
  function getComponentName(options) {
    return options.name || options.__name || options._componentTag;
  }
  var componentVNodeHooks = {
    init: function(vnode, hydrating) {
      if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
        var mountedNode = vnode;
        componentVNodeHooks.prepatch(mountedNode, mountedNode);
      } else {
        var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
        child.$mount(hydrating ? vnode.elm : void 0, hydrating);
      }
    },
    prepatch: function(oldVnode, vnode) {
      var options = vnode.componentOptions;
      var child = vnode.componentInstance = oldVnode.componentInstance;
      updateChildComponent(
        child,
        options.propsData,
        options.listeners,
        vnode,
        options.children
      );
    },
    insert: function(vnode) {
      var context = vnode.context, componentInstance = vnode.componentInstance;
      if (!componentInstance._isMounted) {
        componentInstance._isMounted = true;
        callHook$1(componentInstance, "mounted");
      }
      if (vnode.data.keepAlive) {
        if (context._isMounted) {
          queueActivatedComponent(componentInstance);
        } else {
          activateChildComponent(componentInstance, true);
        }
      }
    },
    destroy: function(vnode) {
      var componentInstance = vnode.componentInstance;
      if (!componentInstance._isDestroyed) {
        if (!vnode.data.keepAlive) {
          componentInstance.$destroy();
        } else {
          deactivateChildComponent(componentInstance, true);
        }
      }
    }
  };
  var hooksToMerge = Object.keys(componentVNodeHooks);
  function createComponent(Ctor, data, context, children, tag) {
    if (isUndef(Ctor)) {
      return;
    }
    var baseCtor = context.$options._base;
    if (isObject(Ctor)) {
      Ctor = baseCtor.extend(Ctor);
    }
    if (typeof Ctor !== "function") {
      if (true) {
        warn$2("Invalid Component definition: ".concat(String(Ctor)), context);
      }
      return;
    }
    var asyncFactory;
    if (isUndef(Ctor.cid)) {
      asyncFactory = Ctor;
      Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
      if (Ctor === void 0) {
        return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
      }
    }
    data = data || {};
    resolveConstructorOptions(Ctor);
    if (isDef(data.model)) {
      transformModel(Ctor.options, data);
    }
    var propsData = extractPropsFromVNodeData(data, Ctor, tag);
    if (isTrue(Ctor.options.functional)) {
      return createFunctionalComponent(Ctor, propsData, data, context, children);
    }
    var listeners = data.on;
    data.on = data.nativeOn;
    if (isTrue(Ctor.options.abstract)) {
      var slot = data.slot;
      data = {};
      if (slot) {
        data.slot = slot;
      }
    }
    installComponentHooks(data);
    var name = getComponentName(Ctor.options) || tag;
    var vnode = new VNode(
      "vue-component-".concat(Ctor.cid).concat(name ? "-".concat(name) : ""),
      data,
      void 0,
      void 0,
      void 0,
      context,
      { Ctor, propsData, listeners, tag, children },
      asyncFactory
    );
    return vnode;
  }
  function createComponentInstanceForVnode(vnode, parent) {
    var options = {
      _isComponent: true,
      _parentVnode: vnode,
      parent
    };
    var inlineTemplate = vnode.data.inlineTemplate;
    if (isDef(inlineTemplate)) {
      options.render = inlineTemplate.render;
      options.staticRenderFns = inlineTemplate.staticRenderFns;
    }
    return new vnode.componentOptions.Ctor(options);
  }
  function installComponentHooks(data) {
    var hooks2 = data.hook || (data.hook = {});
    for (var i = 0; i < hooksToMerge.length; i++) {
      var key = hooksToMerge[i];
      var existing = hooks2[key];
      var toMerge = componentVNodeHooks[key];
      if (existing !== toMerge && !(existing && existing._merged)) {
        hooks2[key] = existing ? mergeHook(toMerge, existing) : toMerge;
      }
    }
  }
  function mergeHook(f1, f2) {
    var merged = function(a, b) {
      f1(a, b);
      f2(a, b);
    };
    merged._merged = true;
    return merged;
  }
  function transformModel(options, data) {
    var prop = options.model && options.model.prop || "value";
    var event = options.model && options.model.event || "input";
    (data.attrs || (data.attrs = {}))[prop] = data.model.value;
    var on2 = data.on || (data.on = {});
    var existing = on2[event];
    var callback = data.model.callback;
    if (isDef(existing)) {
      if (isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
        on2[event] = [callback].concat(existing);
      }
    } else {
      on2[event] = callback;
    }
  }
  var warn$2 = noop;
  var tip = noop;
  var generateComponentTrace;
  var formatComponentName;
  if (true) {
    hasConsole_1 = typeof console !== "undefined";
    classifyRE_1 = /(?:^|[-_])(\w)/g;
    classify_1 = function(str2) {
      return str2.replace(classifyRE_1, function(c) {
        return c.toUpperCase();
      }).replace(/[-_]/g, "");
    };
    warn$2 = function(msg, vm) {
      if (vm === void 0) {
        vm = currentInstance;
      }
      var trace = vm ? generateComponentTrace(vm) : "";
      if (config.warnHandler) {
        config.warnHandler.call(null, msg, vm, trace);
      } else if (hasConsole_1 && !config.silent) {
        console.error("[Vue warn]: ".concat(msg).concat(trace));
      }
    };
    tip = function(msg, vm) {
      if (hasConsole_1 && !config.silent) {
        console.warn("[Vue tip]: ".concat(msg) + (vm ? generateComponentTrace(vm) : ""));
      }
    };
    formatComponentName = function(vm, includeFile) {
      if (vm.$root === vm) {
        return "<Root>";
      }
      var options = isFunction(vm) && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm;
      var name = getComponentName(options);
      var file = options.__file;
      if (!name && file) {
        var match = file.match(/([^/\\]+)\.vue$/);
        name = match && match[1];
      }
      return (name ? "<".concat(classify_1(name), ">") : "<Anonymous>") + (file && includeFile !== false ? " at ".concat(file) : "");
    };
    repeat_1 = function(str2, n) {
      var res = "";
      while (n) {
        if (n % 2 === 1)
          res += str2;
        if (n > 1)
          str2 += str2;
        n >>= 1;
      }
      return res;
    };
    generateComponentTrace = function(vm) {
      if (vm._isVue && vm.$parent) {
        var tree = [];
        var currentRecursiveSequence = 0;
        while (vm) {
          if (tree.length > 0) {
            var last = tree[tree.length - 1];
            if (last.constructor === vm.constructor) {
              currentRecursiveSequence++;
              vm = vm.$parent;
              continue;
            } else if (currentRecursiveSequence > 0) {
              tree[tree.length - 1] = [last, currentRecursiveSequence];
              currentRecursiveSequence = 0;
            }
          }
          tree.push(vm);
          vm = vm.$parent;
        }
        return "\n\nfound in\n\n" + tree.map(function(vm2, i) {
          return "".concat(i === 0 ? "---> " : repeat_1(" ", 5 + i * 2)).concat(isArray(vm2) ? "".concat(formatComponentName(vm2[0]), "... (").concat(vm2[1], " recursive calls)") : formatComponentName(vm2));
        }).join("\n");
      } else {
        return "\n\n(found in ".concat(formatComponentName(vm), ")");
      }
    };
  }
  var hasConsole_1;
  var classifyRE_1;
  var classify_1;
  var repeat_1;
  var strats = config.optionMergeStrategies;
  if (true) {
    strats.el = strats.propsData = function(parent, child, vm, key) {
      if (!vm) {
        warn$2('option "'.concat(key, '" can only be used during instance ') + "creation with the `new` keyword.");
      }
      return defaultStrat(parent, child);
    };
  }
  function mergeData(to, from) {
    if (!from)
      return to;
    var key, toVal, fromVal;
    var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);
    for (var i = 0; i < keys.length; i++) {
      key = keys[i];
      if (key === "__ob__")
        continue;
      toVal = to[key];
      fromVal = from[key];
      if (!hasOwn(to, key)) {
        set(to, key, fromVal);
      } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
        mergeData(toVal, fromVal);
      }
    }
    return to;
  }
  function mergeDataOrFn(parentVal, childVal, vm) {
    if (!vm) {
      if (!childVal) {
        return parentVal;
      }
      if (!parentVal) {
        return childVal;
      }
      return function mergedDataFn() {
        return mergeData(isFunction(childVal) ? childVal.call(this, this) : childVal, isFunction(parentVal) ? parentVal.call(this, this) : parentVal);
      };
    } else {
      return function mergedInstanceDataFn() {
        var instanceData = isFunction(childVal) ? childVal.call(vm, vm) : childVal;
        var defaultData = isFunction(parentVal) ? parentVal.call(vm, vm) : parentVal;
        if (instanceData) {
          return mergeData(instanceData, defaultData);
        } else {
          return defaultData;
        }
      };
    }
  }
  strats.data = function(parentVal, childVal, vm) {
    if (!vm) {
      if (childVal && typeof childVal !== "function") {
        warn$2('The "data" option should be a function that returns a per-instance value in component definitions.', vm);
        return parentVal;
      }
      return mergeDataOrFn(parentVal, childVal);
    }
    return mergeDataOrFn(parentVal, childVal, vm);
  };
  function mergeLifecycleHook(parentVal, childVal) {
    var res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
    return res ? dedupeHooks(res) : res;
  }
  function dedupeHooks(hooks2) {
    var res = [];
    for (var i = 0; i < hooks2.length; i++) {
      if (res.indexOf(hooks2[i]) === -1) {
        res.push(hooks2[i]);
      }
    }
    return res;
  }
  LIFECYCLE_HOOKS.forEach(function(hook) {
    strats[hook] = mergeLifecycleHook;
  });
  function mergeAssets(parentVal, childVal, vm, key) {
    var res = Object.create(parentVal || null);
    if (childVal) {
      assertObjectType(key, childVal, vm);
      return extend(res, childVal);
    } else {
      return res;
    }
  }
  ASSET_TYPES.forEach(function(type) {
    strats[type + "s"] = mergeAssets;
  });
  strats.watch = function(parentVal, childVal, vm, key) {
    if (parentVal === nativeWatch)
      parentVal = void 0;
    if (childVal === nativeWatch)
      childVal = void 0;
    if (!childVal)
      return Object.create(parentVal || null);
    if (true) {
      assertObjectType(key, childVal, vm);
    }
    if (!parentVal)
      return childVal;
    var ret = {};
    extend(ret, parentVal);
    for (var key_1 in childVal) {
      var parent_1 = ret[key_1];
      var child = childVal[key_1];
      if (parent_1 && !isArray(parent_1)) {
        parent_1 = [parent_1];
      }
      ret[key_1] = parent_1 ? parent_1.concat(child) : isArray(child) ? child : [child];
    }
    return ret;
  };
  strats.props = strats.methods = strats.inject = strats.computed = function(parentVal, childVal, vm, key) {
    if (childVal && true) {
      assertObjectType(key, childVal, vm);
    }
    if (!parentVal)
      return childVal;
    var ret = /* @__PURE__ */ Object.create(null);
    extend(ret, parentVal);
    if (childVal)
      extend(ret, childVal);
    return ret;
  };
  strats.provide = mergeDataOrFn;
  var defaultStrat = function(parentVal, childVal) {
    return childVal === void 0 ? parentVal : childVal;
  };
  function checkComponents(options) {
    for (var key in options.components) {
      validateComponentName(key);
    }
  }
  function validateComponentName(name) {
    if (!new RegExp("^[a-zA-Z][\\-\\.0-9_".concat(unicodeRegExp.source, "]*$")).test(name)) {
      warn$2('Invalid component name: "' + name + '". Component names should conform to valid custom element name in html5 specification.');
    }
    if (isBuiltInTag(name) || config.isReservedTag(name)) {
      warn$2("Do not use built-in or reserved HTML elements as component id: " + name);
    }
  }
  function normalizeProps(options, vm) {
    var props2 = options.props;
    if (!props2)
      return;
    var res = {};
    var i, val, name;
    if (isArray(props2)) {
      i = props2.length;
      while (i--) {
        val = props2[i];
        if (typeof val === "string") {
          name = camelize(val);
          res[name] = { type: null };
        } else if (true) {
          warn$2("props must be strings when using array syntax.");
        }
      }
    } else if (isPlainObject(props2)) {
      for (var key in props2) {
        val = props2[key];
        name = camelize(key);
        res[name] = isPlainObject(val) ? val : { type: val };
      }
    } else if (true) {
      warn$2('Invalid value for option "props": expected an Array or an Object, ' + "but got ".concat(toRawType(props2), "."), vm);
    }
    options.props = res;
  }
  function normalizeInject(options, vm) {
    var inject = options.inject;
    if (!inject)
      return;
    var normalized = options.inject = {};
    if (isArray(inject)) {
      for (var i = 0; i < inject.length; i++) {
        normalized[inject[i]] = { from: inject[i] };
      }
    } else if (isPlainObject(inject)) {
      for (var key in inject) {
        var val = inject[key];
        normalized[key] = isPlainObject(val) ? extend({ from: key }, val) : { from: val };
      }
    } else if (true) {
      warn$2('Invalid value for option "inject": expected an Array or an Object, ' + "but got ".concat(toRawType(inject), "."), vm);
    }
  }
  function normalizeDirectives$1(options) {
    var dirs = options.directives;
    if (dirs) {
      for (var key in dirs) {
        var def2 = dirs[key];
        if (isFunction(def2)) {
          dirs[key] = { bind: def2, update: def2 };
        }
      }
    }
  }
  function assertObjectType(name, value, vm) {
    if (!isPlainObject(value)) {
      warn$2('Invalid value for option "'.concat(name, '": expected an Object, ') + "but got ".concat(toRawType(value), "."), vm);
    }
  }
  function mergeOptions(parent, child, vm) {
    if (true) {
      checkComponents(child);
    }
    if (isFunction(child)) {
      child = child.options;
    }
    normalizeProps(child, vm);
    normalizeInject(child, vm);
    normalizeDirectives$1(child);
    if (!child._base) {
      if (child.extends) {
        parent = mergeOptions(parent, child.extends, vm);
      }
      if (child.mixins) {
        for (var i = 0, l = child.mixins.length; i < l; i++) {
          parent = mergeOptions(parent, child.mixins[i], vm);
        }
      }
    }
    var options = {};
    var key;
    for (key in parent) {
      mergeField(key);
    }
    for (key in child) {
      if (!hasOwn(parent, key)) {
        mergeField(key);
      }
    }
    function mergeField(key2) {
      var strat = strats[key2] || defaultStrat;
      options[key2] = strat(parent[key2], child[key2], vm, key2);
    }
    return options;
  }
  function resolveAsset(options, type, id, warnMissing) {
    if (typeof id !== "string") {
      return;
    }
    var assets = options[type];
    if (hasOwn(assets, id))
      return assets[id];
    var camelizedId = camelize(id);
    if (hasOwn(assets, camelizedId))
      return assets[camelizedId];
    var PascalCaseId = capitalize(camelizedId);
    if (hasOwn(assets, PascalCaseId))
      return assets[PascalCaseId];
    var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
    if (warnMissing && !res) {
      warn$2("Failed to resolve " + type.slice(0, -1) + ": " + id);
    }
    return res;
  }
  function validateProp(key, propOptions, propsData, vm) {
    var prop = propOptions[key];
    var absent = !hasOwn(propsData, key);
    var value = propsData[key];
    var booleanIndex = getTypeIndex(Boolean, prop.type);
    if (booleanIndex > -1) {
      if (absent && !hasOwn(prop, "default")) {
        value = false;
      } else if (value === "" || value === hyphenate(key)) {
        var stringIndex = getTypeIndex(String, prop.type);
        if (stringIndex < 0 || booleanIndex < stringIndex) {
          value = true;
        }
      }
    }
    if (value === void 0) {
      value = getPropDefaultValue(vm, prop, key);
      var prevShouldObserve = shouldObserve;
      toggleObserving(true);
      observe(value);
      toggleObserving(prevShouldObserve);
    }
    if (true) {
      assertProp(prop, key, value, vm, absent);
    }
    return value;
  }
  function getPropDefaultValue(vm, prop, key) {
    if (!hasOwn(prop, "default")) {
      return void 0;
    }
    var def2 = prop.default;
    if (isObject(def2)) {
      warn$2('Invalid default value for prop "' + key + '": Props with type Object/Array must use a factory function to return the default value.', vm);
    }
    if (vm && vm.$options.propsData && vm.$options.propsData[key] === void 0 && vm._props[key] !== void 0) {
      return vm._props[key];
    }
    return isFunction(def2) && getType(prop.type) !== "Function" ? def2.call(vm) : def2;
  }
  function assertProp(prop, name, value, vm, absent) {
    if (prop.required && absent) {
      warn$2('Missing required prop: "' + name + '"', vm);
      return;
    }
    if (value == null && !prop.required) {
      return;
    }
    var type = prop.type;
    var valid = !type || type === true;
    var expectedTypes = [];
    if (type) {
      if (!isArray(type)) {
        type = [type];
      }
      for (var i = 0; i < type.length && !valid; i++) {
        var assertedType = assertType(value, type[i], vm);
        expectedTypes.push(assertedType.expectedType || "");
        valid = assertedType.valid;
      }
    }
    var haveExpectedTypes = expectedTypes.some(function(t) {
      return t;
    });
    if (!valid && haveExpectedTypes) {
      warn$2(getInvalidTypeMessage(name, value, expectedTypes), vm);
      return;
    }
    var validator = prop.validator;
    if (validator) {
      if (!validator(value)) {
        warn$2('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
      }
    }
  }
  var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol|BigInt)$/;
  function assertType(value, type, vm) {
    var valid;
    var expectedType = getType(type);
    if (simpleCheckRE.test(expectedType)) {
      var t = typeof value;
      valid = t === expectedType.toLowerCase();
      if (!valid && t === "object") {
        valid = value instanceof type;
      }
    } else if (expectedType === "Object") {
      valid = isPlainObject(value);
    } else if (expectedType === "Array") {
      valid = isArray(value);
    } else {
      try {
        valid = value instanceof type;
      } catch (e) {
        warn$2('Invalid prop type: "' + String(type) + '" is not a constructor', vm);
        valid = false;
      }
    }
    return {
      valid,
      expectedType
    };
  }
  var functionTypeCheckRE = /^\s*function (\w+)/;
  function getType(fn) {
    var match = fn && fn.toString().match(functionTypeCheckRE);
    return match ? match[1] : "";
  }
  function isSameType(a, b) {
    return getType(a) === getType(b);
  }
  function getTypeIndex(type, expectedTypes) {
    if (!isArray(expectedTypes)) {
      return isSameType(expectedTypes, type) ? 0 : -1;
    }
    for (var i = 0, len2 = expectedTypes.length; i < len2; i++) {
      if (isSameType(expectedTypes[i], type)) {
        return i;
      }
    }
    return -1;
  }
  function getInvalidTypeMessage(name, value, expectedTypes) {
    var message = 'Invalid prop: type check failed for prop "'.concat(name, '".') + " Expected ".concat(expectedTypes.map(capitalize).join(", "));
    var expectedType = expectedTypes[0];
    var receivedType = toRawType(value);
    if (expectedTypes.length === 1 && isExplicable(expectedType) && isExplicable(typeof value) && !isBoolean(expectedType, receivedType)) {
      message += " with value ".concat(styleValue(value, expectedType));
    }
    message += ", got ".concat(receivedType, " ");
    if (isExplicable(receivedType)) {
      message += "with value ".concat(styleValue(value, receivedType), ".");
    }
    return message;
  }
  function styleValue(value, type) {
    if (type === "String") {
      return '"'.concat(value, '"');
    } else if (type === "Number") {
      return "".concat(Number(value));
    } else {
      return "".concat(value);
    }
  }
  var EXPLICABLE_TYPES = ["string", "number", "boolean"];
  function isExplicable(value) {
    return EXPLICABLE_TYPES.some(function(elem) {
      return value.toLowerCase() === elem;
    });
  }
  function isBoolean() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    return args.some(function(elem) {
      return elem.toLowerCase() === "boolean";
    });
  }
  function Vue(options) {
    if (!(this instanceof Vue)) {
      warn$2("Vue is a constructor and should be called with the `new` keyword");
    }
    this._init(options);
  }
  initMixin$1(Vue);
  stateMixin(Vue);
  eventsMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);
  function initUse(Vue2) {
    Vue2.use = function(plugin) {
      var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
      if (installedPlugins.indexOf(plugin) > -1) {
        return this;
      }
      var args = toArray(arguments, 1);
      args.unshift(this);
      if (isFunction(plugin.install)) {
        plugin.install.apply(plugin, args);
      } else if (isFunction(plugin)) {
        plugin.apply(null, args);
      }
      installedPlugins.push(plugin);
      return this;
    };
  }
  function initMixin(Vue2) {
    Vue2.mixin = function(mixin) {
      this.options = mergeOptions(this.options, mixin);
      return this;
    };
  }
  function initExtend(Vue2) {
    Vue2.cid = 0;
    var cid = 1;
    Vue2.extend = function(extendOptions) {
      extendOptions = extendOptions || {};
      var Super = this;
      var SuperId = Super.cid;
      var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
      if (cachedCtors[SuperId]) {
        return cachedCtors[SuperId];
      }
      var name = getComponentName(extendOptions) || getComponentName(Super.options);
      if (name) {
        validateComponentName(name);
      }
      var Sub = function VueComponent(options) {
        this._init(options);
      };
      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub;
      Sub.cid = cid++;
      Sub.options = mergeOptions(Super.options, extendOptions);
      Sub["super"] = Super;
      if (Sub.options.props) {
        initProps(Sub);
      }
      if (Sub.options.computed) {
        initComputed(Sub);
      }
      Sub.extend = Super.extend;
      Sub.mixin = Super.mixin;
      Sub.use = Super.use;
      ASSET_TYPES.forEach(function(type) {
        Sub[type] = Super[type];
      });
      if (name) {
        Sub.options.components[name] = Sub;
      }
      Sub.superOptions = Super.options;
      Sub.extendOptions = extendOptions;
      Sub.sealedOptions = extend({}, Sub.options);
      cachedCtors[SuperId] = Sub;
      return Sub;
    };
  }
  function initProps(Comp) {
    var props2 = Comp.options.props;
    for (var key in props2) {
      proxy(Comp.prototype, "_props", key);
    }
  }
  function initComputed(Comp) {
    var computed = Comp.options.computed;
    for (var key in computed) {
      defineComputed(Comp.prototype, key, computed[key]);
    }
  }
  function initAssetRegisters(Vue2) {
    ASSET_TYPES.forEach(function(type) {
      Vue2[type] = function(id, definition) {
        if (!definition) {
          return this.options[type + "s"][id];
        } else {
          if (type === "component") {
            validateComponentName(id);
          }
          if (type === "component" && isPlainObject(definition)) {
            definition.name = definition.name || id;
            definition = this.options._base.extend(definition);
          }
          if (type === "directive" && isFunction(definition)) {
            definition = { bind: definition, update: definition };
          }
          this.options[type + "s"][id] = definition;
          return definition;
        }
      };
    });
  }
  function _getComponentName(opts) {
    return opts && (getComponentName(opts.Ctor.options) || opts.tag);
  }
  function matches(pattern, name) {
    if (isArray(pattern)) {
      return pattern.indexOf(name) > -1;
    } else if (typeof pattern === "string") {
      return pattern.split(",").indexOf(name) > -1;
    } else if (isRegExp(pattern)) {
      return pattern.test(name);
    }
    return false;
  }
  function pruneCache(keepAliveInstance, filter) {
    var cache = keepAliveInstance.cache, keys = keepAliveInstance.keys, _vnode = keepAliveInstance._vnode;
    for (var key in cache) {
      var entry = cache[key];
      if (entry) {
        var name_1 = entry.name;
        if (name_1 && !filter(name_1)) {
          pruneCacheEntry(cache, key, keys, _vnode);
        }
      }
    }
  }
  function pruneCacheEntry(cache, key, keys, current) {
    var entry = cache[key];
    if (entry && (!current || entry.tag !== current.tag)) {
      entry.componentInstance.$destroy();
    }
    cache[key] = null;
    remove$2(keys, key);
  }
  var patternTypes = [String, RegExp, Array];
  var KeepAlive = {
    name: "keep-alive",
    abstract: true,
    props: {
      include: patternTypes,
      exclude: patternTypes,
      max: [String, Number]
    },
    methods: {
      cacheVNode: function() {
        var _a2 = this, cache = _a2.cache, keys = _a2.keys, vnodeToCache = _a2.vnodeToCache, keyToCache = _a2.keyToCache;
        if (vnodeToCache) {
          var tag = vnodeToCache.tag, componentInstance = vnodeToCache.componentInstance, componentOptions = vnodeToCache.componentOptions;
          cache[keyToCache] = {
            name: _getComponentName(componentOptions),
            tag,
            componentInstance
          };
          keys.push(keyToCache);
          if (this.max && keys.length > parseInt(this.max)) {
            pruneCacheEntry(cache, keys[0], keys, this._vnode);
          }
          this.vnodeToCache = null;
        }
      }
    },
    created: function() {
      this.cache = /* @__PURE__ */ Object.create(null);
      this.keys = [];
    },
    destroyed: function() {
      for (var key in this.cache) {
        pruneCacheEntry(this.cache, key, this.keys);
      }
    },
    mounted: function() {
      var _this = this;
      this.cacheVNode();
      this.$watch("include", function(val) {
        pruneCache(_this, function(name) {
          return matches(val, name);
        });
      });
      this.$watch("exclude", function(val) {
        pruneCache(_this, function(name) {
          return !matches(val, name);
        });
      });
    },
    updated: function() {
      this.cacheVNode();
    },
    render: function() {
      var slot = this.$slots.default;
      var vnode = getFirstComponentChild(slot);
      var componentOptions = vnode && vnode.componentOptions;
      if (componentOptions) {
        var name_2 = _getComponentName(componentOptions);
        var _a2 = this, include = _a2.include, exclude = _a2.exclude;
        if (include && (!name_2 || !matches(include, name_2)) || exclude && name_2 && matches(exclude, name_2)) {
          return vnode;
        }
        var _b = this, cache = _b.cache, keys = _b.keys;
        var key = vnode.key == null ? componentOptions.Ctor.cid + (componentOptions.tag ? "::".concat(componentOptions.tag) : "") : vnode.key;
        if (cache[key]) {
          vnode.componentInstance = cache[key].componentInstance;
          remove$2(keys, key);
          keys.push(key);
        } else {
          this.vnodeToCache = vnode;
          this.keyToCache = key;
        }
        vnode.data.keepAlive = true;
      }
      return vnode || slot && slot[0];
    }
  };
  var builtInComponents = {
    KeepAlive
  };
  function initGlobalAPI(Vue2) {
    var configDef = {};
    configDef.get = function() {
      return config;
    };
    if (true) {
      configDef.set = function() {
        warn$2("Do not replace the Vue.config object, set individual fields instead.");
      };
    }
    Object.defineProperty(Vue2, "config", configDef);
    Vue2.util = {
      warn: warn$2,
      extend,
      mergeOptions,
      defineReactive
    };
    Vue2.set = set;
    Vue2.delete = del;
    Vue2.nextTick = nextTick;
    Vue2.observable = function(obj) {
      observe(obj);
      return obj;
    };
    Vue2.options = /* @__PURE__ */ Object.create(null);
    ASSET_TYPES.forEach(function(type) {
      Vue2.options[type + "s"] = /* @__PURE__ */ Object.create(null);
    });
    Vue2.options._base = Vue2;
    extend(Vue2.options.components, builtInComponents);
    initUse(Vue2);
    initMixin(Vue2);
    initExtend(Vue2);
    initAssetRegisters(Vue2);
  }
  initGlobalAPI(Vue);
  Object.defineProperty(Vue.prototype, "$isServer", {
    get: isServerRendering
  });
  Object.defineProperty(Vue.prototype, "$ssrContext", {
    get: function() {
      return this.$vnode && this.$vnode.ssrContext;
    }
  });
  Object.defineProperty(Vue, "FunctionalRenderContext", {
    value: FunctionalRenderContext
  });
  Vue.version = version;
  var isReservedAttr = makeMap("style,class");
  var acceptValue = makeMap("input,textarea,option,select,progress");
  var mustUseProp = function(tag, type, attr) {
    return attr === "value" && acceptValue(tag) && type !== "button" || attr === "selected" && tag === "option" || attr === "checked" && tag === "input" || attr === "muted" && tag === "video";
  };
  var isEnumeratedAttr = makeMap("contenteditable,draggable,spellcheck");
  var isValidContentEditableValue = makeMap("events,caret,typing,plaintext-only");
  var convertEnumeratedValue = function(key, value) {
    return isFalsyAttrValue(value) || value === "false" ? "false" : key === "contenteditable" && isValidContentEditableValue(value) ? value : "true";
  };
  var isBooleanAttr = makeMap("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible");
  var xlinkNS = "http://www.w3.org/1999/xlink";
  var isXlink = function(name) {
    return name.charAt(5) === ":" && name.slice(0, 5) === "xlink";
  };
  var getXlinkProp = function(name) {
    return isXlink(name) ? name.slice(6, name.length) : "";
  };
  var isFalsyAttrValue = function(val) {
    return val == null || val === false;
  };
  function genClassForVnode(vnode) {
    var data = vnode.data;
    var parentNode2 = vnode;
    var childNode = vnode;
    while (isDef(childNode.componentInstance)) {
      childNode = childNode.componentInstance._vnode;
      if (childNode && childNode.data) {
        data = mergeClassData(childNode.data, data);
      }
    }
    while (isDef(parentNode2 = parentNode2.parent)) {
      if (parentNode2 && parentNode2.data) {
        data = mergeClassData(data, parentNode2.data);
      }
    }
    return renderClass(data.staticClass, data.class);
  }
  function mergeClassData(child, parent) {
    return {
      staticClass: concat(child.staticClass, parent.staticClass),
      class: isDef(child.class) ? [child.class, parent.class] : parent.class
    };
  }
  function renderClass(staticClass, dynamicClass) {
    if (isDef(staticClass) || isDef(dynamicClass)) {
      return concat(staticClass, stringifyClass(dynamicClass));
    }
    return "";
  }
  function concat(a, b) {
    return a ? b ? a + " " + b : a : b || "";
  }
  function stringifyClass(value) {
    if (Array.isArray(value)) {
      return stringifyArray(value);
    }
    if (isObject(value)) {
      return stringifyObject(value);
    }
    if (typeof value === "string") {
      return value;
    }
    return "";
  }
  function stringifyArray(value) {
    var res = "";
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (isDef(stringified = stringifyClass(value[i])) && stringified !== "") {
        if (res)
          res += " ";
        res += stringified;
      }
    }
    return res;
  }
  function stringifyObject(value) {
    var res = "";
    for (var key in value) {
      if (value[key]) {
        if (res)
          res += " ";
        res += key;
      }
    }
    return res;
  }
  var namespaceMap = {
    svg: "http://www.w3.org/2000/svg",
    math: "http://www.w3.org/1998/Math/MathML"
  };
  var isHTMLTag = makeMap("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot");
  var isSVG = makeMap("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", true);
  var isPreTag = function(tag) {
    return tag === "pre";
  };
  var isReservedTag = function(tag) {
    return isHTMLTag(tag) || isSVG(tag);
  };
  function getTagNamespace(tag) {
    if (isSVG(tag)) {
      return "svg";
    }
    if (tag === "math") {
      return "math";
    }
  }
  var unknownElementCache = /* @__PURE__ */ Object.create(null);
  function isUnknownElement(tag) {
    if (!inBrowser) {
      return true;
    }
    if (isReservedTag(tag)) {
      return false;
    }
    tag = tag.toLowerCase();
    if (unknownElementCache[tag] != null) {
      return unknownElementCache[tag];
    }
    var el = document.createElement(tag);
    if (tag.indexOf("-") > -1) {
      return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
    } else {
      return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
    }
  }
  var isTextInputType = makeMap("text,number,password,search,email,tel,url");
  function query(el) {
    if (typeof el === "string") {
      var selected = document.querySelector(el);
      if (!selected) {
        warn$2("Cannot find element: " + el);
        return document.createElement("div");
      }
      return selected;
    } else {
      return el;
    }
  }
  function createElement(tagName2, vnode) {
    var elm = document.createElement(tagName2);
    if (tagName2 !== "select") {
      return elm;
    }
    if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== void 0) {
      elm.setAttribute("multiple", "multiple");
    }
    return elm;
  }
  function createElementNS(namespace, tagName2) {
    return document.createElementNS(namespaceMap[namespace], tagName2);
  }
  function createTextNode(text2) {
    return document.createTextNode(text2);
  }
  function createComment(text2) {
    return document.createComment(text2);
  }
  function insertBefore(parentNode2, newNode, referenceNode) {
    parentNode2.insertBefore(newNode, referenceNode);
  }
  function removeChild(node, child) {
    node.removeChild(child);
  }
  function appendChild(node, child) {
    node.appendChild(child);
  }
  function parentNode(node) {
    return node.parentNode;
  }
  function nextSibling(node) {
    return node.nextSibling;
  }
  function tagName(node) {
    return node.tagName;
  }
  function setTextContent(node, text2) {
    node.textContent = text2;
  }
  function setStyleScope(node, scopeId) {
    node.setAttribute(scopeId, "");
  }
  var nodeOps = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    createElement,
    createElementNS,
    createTextNode,
    createComment,
    insertBefore,
    removeChild,
    appendChild,
    parentNode,
    nextSibling,
    tagName,
    setTextContent,
    setStyleScope
  });
  var ref = {
    create: function(_, vnode) {
      registerRef(vnode);
    },
    update: function(oldVnode, vnode) {
      if (oldVnode.data.ref !== vnode.data.ref) {
        registerRef(oldVnode, true);
        registerRef(vnode);
      }
    },
    destroy: function(vnode) {
      registerRef(vnode, true);
    }
  };
  function registerRef(vnode, isRemoval) {
    var ref2 = vnode.data.ref;
    if (!isDef(ref2))
      return;
    var vm = vnode.context;
    var refValue = vnode.componentInstance || vnode.elm;
    var value = isRemoval ? null : refValue;
    var $refsValue = isRemoval ? void 0 : refValue;
    if (isFunction(ref2)) {
      invokeWithErrorHandling(ref2, vm, [value], vm, "template ref function");
      return;
    }
    var isFor = vnode.data.refInFor;
    var _isString = typeof ref2 === "string" || typeof ref2 === "number";
    var _isRef = isRef(ref2);
    var refs = vm.$refs;
    if (_isString || _isRef) {
      if (isFor) {
        var existing = _isString ? refs[ref2] : ref2.value;
        if (isRemoval) {
          isArray(existing) && remove$2(existing, refValue);
        } else {
          if (!isArray(existing)) {
            if (_isString) {
              refs[ref2] = [refValue];
              setSetupRef(vm, ref2, refs[ref2]);
            } else {
              ref2.value = [refValue];
            }
          } else if (!existing.includes(refValue)) {
            existing.push(refValue);
          }
        }
      } else if (_isString) {
        if (isRemoval && refs[ref2] !== refValue) {
          return;
        }
        refs[ref2] = $refsValue;
        setSetupRef(vm, ref2, value);
      } else if (_isRef) {
        if (isRemoval && ref2.value !== refValue) {
          return;
        }
        ref2.value = value;
      } else if (true) {
        warn$2("Invalid template ref type: ".concat(typeof ref2));
      }
    }
  }
  function setSetupRef(_a2, key, val) {
    var _setupState = _a2._setupState;
    if (_setupState && hasOwn(_setupState, key)) {
      if (isRef(_setupState[key])) {
        _setupState[key].value = val;
      } else {
        _setupState[key] = val;
      }
    }
  }
  var emptyNode = new VNode("", {}, []);
  var hooks = ["create", "activate", "update", "remove", "destroy"];
  function sameVnode(a, b) {
    return a.key === b.key && a.asyncFactory === b.asyncFactory && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error));
  }
  function sameInputType(a, b) {
    if (a.tag !== "input")
      return true;
    var i;
    var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
    var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
    return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
  }
  function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i, key;
    var map = {};
    for (i = beginIdx; i <= endIdx; ++i) {
      key = children[i].key;
      if (isDef(key))
        map[key] = i;
    }
    return map;
  }
  function createPatchFunction(backend) {
    var i, j;
    var cbs = {};
    var modules2 = backend.modules, nodeOps2 = backend.nodeOps;
    for (i = 0; i < hooks.length; ++i) {
      cbs[hooks[i]] = [];
      for (j = 0; j < modules2.length; ++j) {
        if (isDef(modules2[j][hooks[i]])) {
          cbs[hooks[i]].push(modules2[j][hooks[i]]);
        }
      }
    }
    function emptyNodeAt(elm) {
      return new VNode(nodeOps2.tagName(elm).toLowerCase(), {}, [], void 0, elm);
    }
    function createRmCb(childElm, listeners) {
      function remove2() {
        if (--remove2.listeners === 0) {
          removeNode(childElm);
        }
      }
      remove2.listeners = listeners;
      return remove2;
    }
    function removeNode(el) {
      var parent = nodeOps2.parentNode(el);
      if (isDef(parent)) {
        nodeOps2.removeChild(parent, el);
      }
    }
    function isUnknownElement2(vnode, inVPre) {
      return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function(ignore) {
        return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
      })) && config.isUnknownElement(vnode.tag);
    }
    var creatingElmInVPre = 0;
    function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index2) {
      if (isDef(vnode.elm) && isDef(ownerArray)) {
        vnode = ownerArray[index2] = cloneVNode(vnode);
      }
      vnode.isRootInsert = !nested;
      if (createComponent2(vnode, insertedVnodeQueue, parentElm, refElm)) {
        return;
      }
      var data = vnode.data;
      var children = vnode.children;
      var tag = vnode.tag;
      if (isDef(tag)) {
        if (true) {
          if (data && data.pre) {
            creatingElmInVPre++;
          }
          if (isUnknownElement2(vnode, creatingElmInVPre)) {
            warn$2("Unknown custom element: <" + tag + '> - did you register the component correctly? For recursive components, make sure to provide the "name" option.', vnode.context);
          }
        }
        vnode.elm = vnode.ns ? nodeOps2.createElementNS(vnode.ns, tag) : nodeOps2.createElement(tag, vnode);
        setScope(vnode);
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
        if (data && data.pre) {
          creatingElmInVPre--;
        }
      } else if (isTrue(vnode.isComment)) {
        vnode.elm = nodeOps2.createComment(vnode.text);
        insert(parentElm, vnode.elm, refElm);
      } else {
        vnode.elm = nodeOps2.createTextNode(vnode.text);
        insert(parentElm, vnode.elm, refElm);
      }
    }
    function createComponent2(vnode, insertedVnodeQueue, parentElm, refElm) {
      var i2 = vnode.data;
      if (isDef(i2)) {
        var isReactivated = isDef(vnode.componentInstance) && i2.keepAlive;
        if (isDef(i2 = i2.hook) && isDef(i2 = i2.init)) {
          i2(vnode, false);
        }
        if (isDef(vnode.componentInstance)) {
          initComponent(vnode, insertedVnodeQueue);
          insert(parentElm, vnode.elm, refElm);
          if (isTrue(isReactivated)) {
            reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
          }
          return true;
        }
      }
    }
    function initComponent(vnode, insertedVnodeQueue) {
      if (isDef(vnode.data.pendingInsert)) {
        insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
        vnode.data.pendingInsert = null;
      }
      vnode.elm = vnode.componentInstance.$el;
      if (isPatchable(vnode)) {
        invokeCreateHooks(vnode, insertedVnodeQueue);
        setScope(vnode);
      } else {
        registerRef(vnode);
        insertedVnodeQueue.push(vnode);
      }
    }
    function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
      var i2;
      var innerNode = vnode;
      while (innerNode.componentInstance) {
        innerNode = innerNode.componentInstance._vnode;
        if (isDef(i2 = innerNode.data) && isDef(i2 = i2.transition)) {
          for (i2 = 0; i2 < cbs.activate.length; ++i2) {
            cbs.activate[i2](emptyNode, innerNode);
          }
          insertedVnodeQueue.push(innerNode);
          break;
        }
      }
      insert(parentElm, vnode.elm, refElm);
    }
    function insert(parent, elm, ref2) {
      if (isDef(parent)) {
        if (isDef(ref2)) {
          if (nodeOps2.parentNode(ref2) === parent) {
            nodeOps2.insertBefore(parent, elm, ref2);
          }
        } else {
          nodeOps2.appendChild(parent, elm);
        }
      }
    }
    function createChildren(vnode, children, insertedVnodeQueue) {
      if (isArray(children)) {
        if (true) {
          checkDuplicateKeys(children);
        }
        for (var i_1 = 0; i_1 < children.length; ++i_1) {
          createElm(children[i_1], insertedVnodeQueue, vnode.elm, null, true, children, i_1);
        }
      } else if (isPrimitive(vnode.text)) {
        nodeOps2.appendChild(vnode.elm, nodeOps2.createTextNode(String(vnode.text)));
      }
    }
    function isPatchable(vnode) {
      while (vnode.componentInstance) {
        vnode = vnode.componentInstance._vnode;
      }
      return isDef(vnode.tag);
    }
    function invokeCreateHooks(vnode, insertedVnodeQueue) {
      for (var i_2 = 0; i_2 < cbs.create.length; ++i_2) {
        cbs.create[i_2](emptyNode, vnode);
      }
      i = vnode.data.hook;
      if (isDef(i)) {
        if (isDef(i.create))
          i.create(emptyNode, vnode);
        if (isDef(i.insert))
          insertedVnodeQueue.push(vnode);
      }
    }
    function setScope(vnode) {
      var i2;
      if (isDef(i2 = vnode.fnScopeId)) {
        nodeOps2.setStyleScope(vnode.elm, i2);
      } else {
        var ancestor = vnode;
        while (ancestor) {
          if (isDef(i2 = ancestor.context) && isDef(i2 = i2.$options._scopeId)) {
            nodeOps2.setStyleScope(vnode.elm, i2);
          }
          ancestor = ancestor.parent;
        }
      }
      if (isDef(i2 = activeInstance) && i2 !== vnode.context && i2 !== vnode.fnContext && isDef(i2 = i2.$options._scopeId)) {
        nodeOps2.setStyleScope(vnode.elm, i2);
      }
    }
    function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
      for (; startIdx <= endIdx; ++startIdx) {
        createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
      }
    }
    function invokeDestroyHook(vnode) {
      var i2, j2;
      var data = vnode.data;
      if (isDef(data)) {
        if (isDef(i2 = data.hook) && isDef(i2 = i2.destroy))
          i2(vnode);
        for (i2 = 0; i2 < cbs.destroy.length; ++i2)
          cbs.destroy[i2](vnode);
      }
      if (isDef(i2 = vnode.children)) {
        for (j2 = 0; j2 < vnode.children.length; ++j2) {
          invokeDestroyHook(vnode.children[j2]);
        }
      }
    }
    function removeVnodes(vnodes, startIdx, endIdx) {
      for (; startIdx <= endIdx; ++startIdx) {
        var ch = vnodes[startIdx];
        if (isDef(ch)) {
          if (isDef(ch.tag)) {
            removeAndInvokeRemoveHook(ch);
            invokeDestroyHook(ch);
          } else {
            removeNode(ch.elm);
          }
        }
      }
    }
    function removeAndInvokeRemoveHook(vnode, rm) {
      if (isDef(rm) || isDef(vnode.data)) {
        var i_3;
        var listeners = cbs.remove.length + 1;
        if (isDef(rm)) {
          rm.listeners += listeners;
        } else {
          rm = createRmCb(vnode.elm, listeners);
        }
        if (isDef(i_3 = vnode.componentInstance) && isDef(i_3 = i_3._vnode) && isDef(i_3.data)) {
          removeAndInvokeRemoveHook(i_3, rm);
        }
        for (i_3 = 0; i_3 < cbs.remove.length; ++i_3) {
          cbs.remove[i_3](vnode, rm);
        }
        if (isDef(i_3 = vnode.data.hook) && isDef(i_3 = i_3.remove)) {
          i_3(vnode, rm);
        } else {
          rm();
        }
      } else {
        removeNode(vnode.elm);
      }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
      var oldStartIdx = 0;
      var newStartIdx = 0;
      var oldEndIdx = oldCh.length - 1;
      var oldStartVnode = oldCh[0];
      var oldEndVnode = oldCh[oldEndIdx];
      var newEndIdx = newCh.length - 1;
      var newStartVnode = newCh[0];
      var newEndVnode = newCh[newEndIdx];
      var oldKeyToIdx, idxInOld, vnodeToMove, refElm;
      var canMove = !removeOnly;
      if (true) {
        checkDuplicateKeys(newCh);
      }
      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (isUndef(oldStartVnode)) {
          oldStartVnode = oldCh[++oldStartIdx];
        } else if (isUndef(oldEndVnode)) {
          oldEndVnode = oldCh[--oldEndIdx];
        } else if (sameVnode(oldStartVnode, newStartVnode)) {
          patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
          oldStartVnode = oldCh[++oldStartIdx];
          newStartVnode = newCh[++newStartIdx];
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
          patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
          oldEndVnode = oldCh[--oldEndIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldStartVnode, newEndVnode)) {
          patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
          canMove && nodeOps2.insertBefore(parentElm, oldStartVnode.elm, nodeOps2.nextSibling(oldEndVnode.elm));
          oldStartVnode = oldCh[++oldStartIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldEndVnode, newStartVnode)) {
          patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
          canMove && nodeOps2.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
          oldEndVnode = oldCh[--oldEndIdx];
          newStartVnode = newCh[++newStartIdx];
        } else {
          if (isUndef(oldKeyToIdx))
            oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
          idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
          if (isUndef(idxInOld)) {
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          } else {
            vnodeToMove = oldCh[idxInOld];
            if (sameVnode(vnodeToMove, newStartVnode)) {
              patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
              oldCh[idxInOld] = void 0;
              canMove && nodeOps2.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
            } else {
              createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
            }
          }
          newStartVnode = newCh[++newStartIdx];
        }
      }
      if (oldStartIdx > oldEndIdx) {
        refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
        addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
      } else if (newStartIdx > newEndIdx) {
        removeVnodes(oldCh, oldStartIdx, oldEndIdx);
      }
    }
    function checkDuplicateKeys(children) {
      var seenKeys = {};
      for (var i_4 = 0; i_4 < children.length; i_4++) {
        var vnode = children[i_4];
        var key = vnode.key;
        if (isDef(key)) {
          if (seenKeys[key]) {
            warn$2("Duplicate keys detected: '".concat(key, "'. This may cause an update error."), vnode.context);
          } else {
            seenKeys[key] = true;
          }
        }
      }
    }
    function findIdxInOld(node, oldCh, start, end) {
      for (var i_5 = start; i_5 < end; i_5++) {
        var c = oldCh[i_5];
        if (isDef(c) && sameVnode(node, c))
          return i_5;
      }
    }
    function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index2, removeOnly) {
      if (oldVnode === vnode) {
        return;
      }
      if (isDef(vnode.elm) && isDef(ownerArray)) {
        vnode = ownerArray[index2] = cloneVNode(vnode);
      }
      var elm = vnode.elm = oldVnode.elm;
      if (isTrue(oldVnode.isAsyncPlaceholder)) {
        if (isDef(vnode.asyncFactory.resolved)) {
          hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
        } else {
          vnode.isAsyncPlaceholder = true;
        }
        return;
      }
      if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
        vnode.componentInstance = oldVnode.componentInstance;
        return;
      }
      var i2;
      var data = vnode.data;
      if (isDef(data) && isDef(i2 = data.hook) && isDef(i2 = i2.prepatch)) {
        i2(oldVnode, vnode);
      }
      var oldCh = oldVnode.children;
      var ch = vnode.children;
      if (isDef(data) && isPatchable(vnode)) {
        for (i2 = 0; i2 < cbs.update.length; ++i2)
          cbs.update[i2](oldVnode, vnode);
        if (isDef(i2 = data.hook) && isDef(i2 = i2.update))
          i2(oldVnode, vnode);
      }
      if (isUndef(vnode.text)) {
        if (isDef(oldCh) && isDef(ch)) {
          if (oldCh !== ch)
            updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        } else if (isDef(ch)) {
          if (true) {
            checkDuplicateKeys(ch);
          }
          if (isDef(oldVnode.text))
            nodeOps2.setTextContent(elm, "");
          addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
        } else if (isDef(oldCh)) {
          removeVnodes(oldCh, 0, oldCh.length - 1);
        } else if (isDef(oldVnode.text)) {
          nodeOps2.setTextContent(elm, "");
        }
      } else if (oldVnode.text !== vnode.text) {
        nodeOps2.setTextContent(elm, vnode.text);
      }
      if (isDef(data)) {
        if (isDef(i2 = data.hook) && isDef(i2 = i2.postpatch))
          i2(oldVnode, vnode);
      }
    }
    function invokeInsertHook(vnode, queue2, initial) {
      if (isTrue(initial) && isDef(vnode.parent)) {
        vnode.parent.data.pendingInsert = queue2;
      } else {
        for (var i_6 = 0; i_6 < queue2.length; ++i_6) {
          queue2[i_6].data.hook.insert(queue2[i_6]);
        }
      }
    }
    var hydrationBailed = false;
    var isRenderedModule = makeMap("attrs,class,staticClass,staticStyle,key");
    function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
      var i2;
      var tag = vnode.tag, data = vnode.data, children = vnode.children;
      inVPre = inVPre || data && data.pre;
      vnode.elm = elm;
      if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
        vnode.isAsyncPlaceholder = true;
        return true;
      }
      if (true) {
        if (!assertNodeMatch(elm, vnode, inVPre)) {
          return false;
        }
      }
      if (isDef(data)) {
        if (isDef(i2 = data.hook) && isDef(i2 = i2.init))
          i2(vnode, true);
        if (isDef(i2 = vnode.componentInstance)) {
          initComponent(vnode, insertedVnodeQueue);
          return true;
        }
      }
      if (isDef(tag)) {
        if (isDef(children)) {
          if (!elm.hasChildNodes()) {
            createChildren(vnode, children, insertedVnodeQueue);
          } else {
            if (isDef(i2 = data) && isDef(i2 = i2.domProps) && isDef(i2 = i2.innerHTML)) {
              if (i2 !== elm.innerHTML) {
                if (typeof console !== "undefined" && !hydrationBailed) {
                  hydrationBailed = true;
                  console.warn("Parent: ", elm);
                  console.warn("server innerHTML: ", i2);
                  console.warn("client innerHTML: ", elm.innerHTML);
                }
                return false;
              }
            } else {
              var childrenMatch = true;
              var childNode = elm.firstChild;
              for (var i_7 = 0; i_7 < children.length; i_7++) {
                if (!childNode || !hydrate(childNode, children[i_7], insertedVnodeQueue, inVPre)) {
                  childrenMatch = false;
                  break;
                }
                childNode = childNode.nextSibling;
              }
              if (!childrenMatch || childNode) {
                if (typeof console !== "undefined" && !hydrationBailed) {
                  hydrationBailed = true;
                  console.warn("Parent: ", elm);
                  console.warn("Mismatching childNodes vs. VNodes: ", elm.childNodes, children);
                }
                return false;
              }
            }
          }
        }
        if (isDef(data)) {
          var fullInvoke = false;
          for (var key in data) {
            if (!isRenderedModule(key)) {
              fullInvoke = true;
              invokeCreateHooks(vnode, insertedVnodeQueue);
              break;
            }
          }
          if (!fullInvoke && data["class"]) {
            traverse(data["class"]);
          }
        }
      } else if (elm.data !== vnode.text) {
        elm.data = vnode.text;
      }
      return true;
    }
    function assertNodeMatch(node, vnode, inVPre) {
      if (isDef(vnode.tag)) {
        return vnode.tag.indexOf("vue-component") === 0 || !isUnknownElement2(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
      } else {
        return node.nodeType === (vnode.isComment ? 8 : 3);
      }
    }
    return function patch2(oldVnode, vnode, hydrating, removeOnly) {
      if (isUndef(vnode)) {
        if (isDef(oldVnode))
          invokeDestroyHook(oldVnode);
        return;
      }
      var isInitialPatch = false;
      var insertedVnodeQueue = [];
      if (isUndef(oldVnode)) {
        isInitialPatch = true;
        createElm(vnode, insertedVnodeQueue);
      } else {
        var isRealElement = isDef(oldVnode.nodeType);
        if (!isRealElement && sameVnode(oldVnode, vnode)) {
          patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
        } else {
          if (isRealElement) {
            if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
              oldVnode.removeAttribute(SSR_ATTR);
              hydrating = true;
            }
            if (isTrue(hydrating)) {
              if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                invokeInsertHook(vnode, insertedVnodeQueue, true);
                return oldVnode;
              } else if (true) {
                warn$2("The client-side rendered virtual DOM tree is not matching server-rendered content. This is likely caused by incorrect HTML markup, for example nesting block-level elements inside <p>, or missing <tbody>. Bailing hydration and performing full client-side render.");
              }
            }
            oldVnode = emptyNodeAt(oldVnode);
          }
          var oldElm = oldVnode.elm;
          var parentElm = nodeOps2.parentNode(oldElm);
          createElm(
            vnode,
            insertedVnodeQueue,
            oldElm._leaveCb ? null : parentElm,
            nodeOps2.nextSibling(oldElm)
          );
          if (isDef(vnode.parent)) {
            var ancestor = vnode.parent;
            var patchable = isPatchable(vnode);
            while (ancestor) {
              for (var i_8 = 0; i_8 < cbs.destroy.length; ++i_8) {
                cbs.destroy[i_8](ancestor);
              }
              ancestor.elm = vnode.elm;
              if (patchable) {
                for (var i_9 = 0; i_9 < cbs.create.length; ++i_9) {
                  cbs.create[i_9](emptyNode, ancestor);
                }
                var insert_1 = ancestor.data.hook.insert;
                if (insert_1.merged) {
                  for (var i_10 = 1; i_10 < insert_1.fns.length; i_10++) {
                    insert_1.fns[i_10]();
                  }
                }
              } else {
                registerRef(ancestor);
              }
              ancestor = ancestor.parent;
            }
          }
          if (isDef(parentElm)) {
            removeVnodes([oldVnode], 0, 0);
          } else if (isDef(oldVnode.tag)) {
            invokeDestroyHook(oldVnode);
          }
        }
      }
      invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
      return vnode.elm;
    };
  }
  var directives$1 = {
    create: updateDirectives,
    update: updateDirectives,
    destroy: function unbindDirectives(vnode) {
      updateDirectives(vnode, emptyNode);
    }
  };
  function updateDirectives(oldVnode, vnode) {
    if (oldVnode.data.directives || vnode.data.directives) {
      _update(oldVnode, vnode);
    }
  }
  function _update(oldVnode, vnode) {
    var isCreate = oldVnode === emptyNode;
    var isDestroy = vnode === emptyNode;
    var oldDirs = normalizeDirectives(oldVnode.data.directives, oldVnode.context);
    var newDirs = normalizeDirectives(vnode.data.directives, vnode.context);
    var dirsWithInsert = [];
    var dirsWithPostpatch = [];
    var key, oldDir, dir;
    for (key in newDirs) {
      oldDir = oldDirs[key];
      dir = newDirs[key];
      if (!oldDir) {
        callHook(dir, "bind", vnode, oldVnode);
        if (dir.def && dir.def.inserted) {
          dirsWithInsert.push(dir);
        }
      } else {
        dir.oldValue = oldDir.value;
        dir.oldArg = oldDir.arg;
        callHook(dir, "update", vnode, oldVnode);
        if (dir.def && dir.def.componentUpdated) {
          dirsWithPostpatch.push(dir);
        }
      }
    }
    if (dirsWithInsert.length) {
      var callInsert = function() {
        for (var i = 0; i < dirsWithInsert.length; i++) {
          callHook(dirsWithInsert[i], "inserted", vnode, oldVnode);
        }
      };
      if (isCreate) {
        mergeVNodeHook(vnode, "insert", callInsert);
      } else {
        callInsert();
      }
    }
    if (dirsWithPostpatch.length) {
      mergeVNodeHook(vnode, "postpatch", function() {
        for (var i = 0; i < dirsWithPostpatch.length; i++) {
          callHook(dirsWithPostpatch[i], "componentUpdated", vnode, oldVnode);
        }
      });
    }
    if (!isCreate) {
      for (key in oldDirs) {
        if (!newDirs[key]) {
          callHook(oldDirs[key], "unbind", oldVnode, oldVnode, isDestroy);
        }
      }
    }
  }
  var emptyModifiers = /* @__PURE__ */ Object.create(null);
  function normalizeDirectives(dirs, vm) {
    var res = /* @__PURE__ */ Object.create(null);
    if (!dirs) {
      return res;
    }
    var i, dir;
    for (i = 0; i < dirs.length; i++) {
      dir = dirs[i];
      if (!dir.modifiers) {
        dir.modifiers = emptyModifiers;
      }
      res[getRawDirName(dir)] = dir;
      if (vm._setupState && vm._setupState.__sfc) {
        var setupDef = dir.def || resolveAsset(vm, "_setupState", "v-" + dir.name);
        if (typeof setupDef === "function") {
          dir.def = {
            bind: setupDef,
            update: setupDef
          };
        } else {
          dir.def = setupDef;
        }
      }
      dir.def = dir.def || resolveAsset(vm.$options, "directives", dir.name, true);
    }
    return res;
  }
  function getRawDirName(dir) {
    return dir.rawName || "".concat(dir.name, ".").concat(Object.keys(dir.modifiers || {}).join("."));
  }
  function callHook(dir, hook, vnode, oldVnode, isDestroy) {
    var fn = dir.def && dir.def[hook];
    if (fn) {
      try {
        fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
      } catch (e) {
        handleError(e, vnode.context, "directive ".concat(dir.name, " ").concat(hook, " hook"));
      }
    }
  }
  var baseModules = [ref, directives$1];
  function updateAttrs(oldVnode, vnode) {
    var opts = vnode.componentOptions;
    if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
      return;
    }
    if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
      return;
    }
    var key, cur, old;
    var elm = vnode.elm;
    var oldAttrs = oldVnode.data.attrs || {};
    var attrs2 = vnode.data.attrs || {};
    if (isDef(attrs2.__ob__) || isTrue(attrs2._v_attr_proxy)) {
      attrs2 = vnode.data.attrs = extend({}, attrs2);
    }
    for (key in attrs2) {
      cur = attrs2[key];
      old = oldAttrs[key];
      if (old !== cur) {
        setAttr(elm, key, cur, vnode.data.pre);
      }
    }
    if ((isIE || isEdge) && attrs2.value !== oldAttrs.value) {
      setAttr(elm, "value", attrs2.value);
    }
    for (key in oldAttrs) {
      if (isUndef(attrs2[key])) {
        if (isXlink(key)) {
          elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
        } else if (!isEnumeratedAttr(key)) {
          elm.removeAttribute(key);
        }
      }
    }
  }
  function setAttr(el, key, value, isInPre) {
    if (isInPre || el.tagName.indexOf("-") > -1) {
      baseSetAttr(el, key, value);
    } else if (isBooleanAttr(key)) {
      if (isFalsyAttrValue(value)) {
        el.removeAttribute(key);
      } else {
        value = key === "allowfullscreen" && el.tagName === "EMBED" ? "true" : key;
        el.setAttribute(key, value);
      }
    } else if (isEnumeratedAttr(key)) {
      el.setAttribute(key, convertEnumeratedValue(key, value));
    } else if (isXlink(key)) {
      if (isFalsyAttrValue(value)) {
        el.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      baseSetAttr(el, key, value);
    }
  }
  function baseSetAttr(el, key, value) {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      if (isIE && !isIE9 && el.tagName === "TEXTAREA" && key === "placeholder" && value !== "" && !el.__ieph) {
        var blocker_1 = function(e) {
          e.stopImmediatePropagation();
          el.removeEventListener("input", blocker_1);
        };
        el.addEventListener("input", blocker_1);
        el.__ieph = true;
      }
      el.setAttribute(key, value);
    }
  }
  var attrs = {
    create: updateAttrs,
    update: updateAttrs
  };
  function updateClass(oldVnode, vnode) {
    var el = vnode.elm;
    var data = vnode.data;
    var oldData = oldVnode.data;
    if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
      return;
    }
    var cls = genClassForVnode(vnode);
    var transitionClass = el._transitionClasses;
    if (isDef(transitionClass)) {
      cls = concat(cls, stringifyClass(transitionClass));
    }
    if (cls !== el._prevClass) {
      el.setAttribute("class", cls);
      el._prevClass = cls;
    }
  }
  var klass$1 = {
    create: updateClass,
    update: updateClass
  };
  var validDivisionCharRE = /[\w).+\-_$\]]/;
  function parseFilters(exp) {
    var inSingle = false;
    var inDouble = false;
    var inTemplateString = false;
    var inRegex = false;
    var curly = 0;
    var square = 0;
    var paren = 0;
    var lastFilterIndex = 0;
    var c, prev, i, expression, filters;
    for (i = 0; i < exp.length; i++) {
      prev = c;
      c = exp.charCodeAt(i);
      if (inSingle) {
        if (c === 39 && prev !== 92)
          inSingle = false;
      } else if (inDouble) {
        if (c === 34 && prev !== 92)
          inDouble = false;
      } else if (inTemplateString) {
        if (c === 96 && prev !== 92)
          inTemplateString = false;
      } else if (inRegex) {
        if (c === 47 && prev !== 92)
          inRegex = false;
      } else if (c === 124 && exp.charCodeAt(i + 1) !== 124 && exp.charCodeAt(i - 1) !== 124 && !curly && !square && !paren) {
        if (expression === void 0) {
          lastFilterIndex = i + 1;
          expression = exp.slice(0, i).trim();
        } else {
          pushFilter();
        }
      } else {
        switch (c) {
          case 34:
            inDouble = true;
            break;
          case 39:
            inSingle = true;
            break;
          case 96:
            inTemplateString = true;
            break;
          case 40:
            paren++;
            break;
          case 41:
            paren--;
            break;
          case 91:
            square++;
            break;
          case 93:
            square--;
            break;
          case 123:
            curly++;
            break;
          case 125:
            curly--;
            break;
        }
        if (c === 47) {
          var j = i - 1;
          var p = void 0;
          for (; j >= 0; j--) {
            p = exp.charAt(j);
            if (p !== " ")
              break;
          }
          if (!p || !validDivisionCharRE.test(p)) {
            inRegex = true;
          }
        }
      }
    }
    if (expression === void 0) {
      expression = exp.slice(0, i).trim();
    } else if (lastFilterIndex !== 0) {
      pushFilter();
    }
    function pushFilter() {
      (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
      lastFilterIndex = i + 1;
    }
    if (filters) {
      for (i = 0; i < filters.length; i++) {
        expression = wrapFilter(expression, filters[i]);
      }
    }
    return expression;
  }
  function wrapFilter(exp, filter) {
    var i = filter.indexOf("(");
    if (i < 0) {
      return '_f("'.concat(filter, '")(').concat(exp, ")");
    } else {
      var name_1 = filter.slice(0, i);
      var args = filter.slice(i + 1);
      return '_f("'.concat(name_1, '")(').concat(exp).concat(args !== ")" ? "," + args : args);
    }
  }
  function baseWarn(msg, range2) {
    console.error("[Vue compiler]: ".concat(msg));
  }
  function pluckModuleFunction(modules2, key) {
    return modules2 ? modules2.map(function(m) {
      return m[key];
    }).filter(function(_) {
      return _;
    }) : [];
  }
  function addProp(el, name, value, range2, dynamic) {
    (el.props || (el.props = [])).push(rangeSetItem({ name, value, dynamic }, range2));
    el.plain = false;
  }
  function addAttr(el, name, value, range2, dynamic) {
    var attrs2 = dynamic ? el.dynamicAttrs || (el.dynamicAttrs = []) : el.attrs || (el.attrs = []);
    attrs2.push(rangeSetItem({ name, value, dynamic }, range2));
    el.plain = false;
  }
  function addRawAttr(el, name, value, range2) {
    el.attrsMap[name] = value;
    el.attrsList.push(rangeSetItem({ name, value }, range2));
  }
  function addDirective(el, name, rawName, value, arg, isDynamicArg, modifiers, range2) {
    (el.directives || (el.directives = [])).push(rangeSetItem({
      name,
      rawName,
      value,
      arg,
      isDynamicArg,
      modifiers
    }, range2));
    el.plain = false;
  }
  function prependModifierMarker(symbol, name, dynamic) {
    return dynamic ? "_p(".concat(name, ',"').concat(symbol, '")') : symbol + name;
  }
  function addHandler(el, name, value, modifiers, important, warn2, range2, dynamic) {
    modifiers = modifiers || emptyObject;
    if (warn2 && modifiers.prevent && modifiers.passive) {
      warn2("passive and prevent can't be used together. Passive handler can't prevent default event.", range2);
    }
    if (modifiers.right) {
      if (dynamic) {
        name = "(".concat(name, ")==='click'?'contextmenu':(").concat(name, ")");
      } else if (name === "click") {
        name = "contextmenu";
        delete modifiers.right;
      }
    } else if (modifiers.middle) {
      if (dynamic) {
        name = "(".concat(name, ")==='click'?'mouseup':(").concat(name, ")");
      } else if (name === "click") {
        name = "mouseup";
      }
    }
    if (modifiers.capture) {
      delete modifiers.capture;
      name = prependModifierMarker("!", name, dynamic);
    }
    if (modifiers.once) {
      delete modifiers.once;
      name = prependModifierMarker("~", name, dynamic);
    }
    if (modifiers.passive) {
      delete modifiers.passive;
      name = prependModifierMarker("&", name, dynamic);
    }
    var events2;
    if (modifiers.native) {
      delete modifiers.native;
      events2 = el.nativeEvents || (el.nativeEvents = {});
    } else {
      events2 = el.events || (el.events = {});
    }
    var newHandler = rangeSetItem({ value: value.trim(), dynamic }, range2);
    if (modifiers !== emptyObject) {
      newHandler.modifiers = modifiers;
    }
    var handlers = events2[name];
    if (Array.isArray(handlers)) {
      important ? handlers.unshift(newHandler) : handlers.push(newHandler);
    } else if (handlers) {
      events2[name] = important ? [newHandler, handlers] : [handlers, newHandler];
    } else {
      events2[name] = newHandler;
    }
    el.plain = false;
  }
  function getRawBindingAttr(el, name) {
    return el.rawAttrsMap[":" + name] || el.rawAttrsMap["v-bind:" + name] || el.rawAttrsMap[name];
  }
  function getBindingAttr(el, name, getStatic) {
    var dynamicValue = getAndRemoveAttr(el, ":" + name) || getAndRemoveAttr(el, "v-bind:" + name);
    if (dynamicValue != null) {
      return parseFilters(dynamicValue);
    } else if (getStatic !== false) {
      var staticValue = getAndRemoveAttr(el, name);
      if (staticValue != null) {
        return JSON.stringify(staticValue);
      }
    }
  }
  function getAndRemoveAttr(el, name, removeFromMap) {
    var val;
    if ((val = el.attrsMap[name]) != null) {
      var list = el.attrsList;
      for (var i = 0, l = list.length; i < l; i++) {
        if (list[i].name === name) {
          list.splice(i, 1);
          break;
        }
      }
    }
    if (removeFromMap) {
      delete el.attrsMap[name];
    }
    return val;
  }
  function getAndRemoveAttrByRegex(el, name) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      var attr = list[i];
      if (name.test(attr.name)) {
        list.splice(i, 1);
        return attr;
      }
    }
  }
  function rangeSetItem(item, range2) {
    if (range2) {
      if (range2.start != null) {
        item.start = range2.start;
      }
      if (range2.end != null) {
        item.end = range2.end;
      }
    }
    return item;
  }
  function genComponentModel(el, value, modifiers) {
    var _a2 = modifiers || {}, number = _a2.number, trim = _a2.trim;
    var baseValueExpression = "$$v";
    var valueExpression = baseValueExpression;
    if (trim) {
      valueExpression = "(typeof ".concat(baseValueExpression, " === 'string'") + "? ".concat(baseValueExpression, ".trim()") + ": ".concat(baseValueExpression, ")");
    }
    if (number) {
      valueExpression = "_n(".concat(valueExpression, ")");
    }
    var assignment = genAssignmentCode(value, valueExpression);
    el.model = {
      value: "(".concat(value, ")"),
      expression: JSON.stringify(value),
      callback: "function (".concat(baseValueExpression, ") {").concat(assignment, "}")
    };
  }
  function genAssignmentCode(value, assignment) {
    var res = parseModel(value);
    if (res.key === null) {
      return "".concat(value, "=").concat(assignment);
    } else {
      return "$set(".concat(res.exp, ", ").concat(res.key, ", ").concat(assignment, ")");
    }
  }
  var len;
  var str;
  var chr;
  var index;
  var expressionPos;
  var expressionEndPos;
  function parseModel(val) {
    val = val.trim();
    len = val.length;
    if (val.indexOf("[") < 0 || val.lastIndexOf("]") < len - 1) {
      index = val.lastIndexOf(".");
      if (index > -1) {
        return {
          exp: val.slice(0, index),
          key: '"' + val.slice(index + 1) + '"'
        };
      } else {
        return {
          exp: val,
          key: null
        };
      }
    }
    str = val;
    index = expressionPos = expressionEndPos = 0;
    while (!eof()) {
      chr = next();
      if (isStringStart(chr)) {
        parseString(chr);
      } else if (chr === 91) {
        parseBracket(chr);
      }
    }
    return {
      exp: val.slice(0, expressionPos),
      key: val.slice(expressionPos + 1, expressionEndPos)
    };
  }
  function next() {
    return str.charCodeAt(++index);
  }
  function eof() {
    return index >= len;
  }
  function isStringStart(chr2) {
    return chr2 === 34 || chr2 === 39;
  }
  function parseBracket(chr2) {
    var inBracket = 1;
    expressionPos = index;
    while (!eof()) {
      chr2 = next();
      if (isStringStart(chr2)) {
        parseString(chr2);
        continue;
      }
      if (chr2 === 91)
        inBracket++;
      if (chr2 === 93)
        inBracket--;
      if (inBracket === 0) {
        expressionEndPos = index;
        break;
      }
    }
  }
  function parseString(chr2) {
    var stringQuote = chr2;
    while (!eof()) {
      chr2 = next();
      if (chr2 === stringQuote) {
        break;
      }
    }
  }
  var warn$1;
  var RANGE_TOKEN = "__r";
  var CHECKBOX_RADIO_TOKEN = "__c";
  function model$1(el, dir, _warn) {
    warn$1 = _warn;
    var value = dir.value;
    var modifiers = dir.modifiers;
    var tag = el.tag;
    var type = el.attrsMap.type;
    if (true) {
      if (tag === "input" && type === "file") {
        warn$1("<".concat(el.tag, ' v-model="').concat(value, '" type="file">:\n') + "File inputs are read only. Use a v-on:change listener instead.", el.rawAttrsMap["v-model"]);
      }
    }
    if (el.component) {
      genComponentModel(el, value, modifiers);
      return false;
    } else if (tag === "select") {
      genSelect(el, value, modifiers);
    } else if (tag === "input" && type === "checkbox") {
      genCheckboxModel(el, value, modifiers);
    } else if (tag === "input" && type === "radio") {
      genRadioModel(el, value, modifiers);
    } else if (tag === "input" || tag === "textarea") {
      genDefaultModel(el, value, modifiers);
    } else if (!config.isReservedTag(tag)) {
      genComponentModel(el, value, modifiers);
      return false;
    } else if (true) {
      warn$1("<".concat(el.tag, ' v-model="').concat(value, '">: ') + "v-model is not supported on this element type. If you are working with contenteditable, it's recommended to wrap a library dedicated for that purpose inside a custom component.", el.rawAttrsMap["v-model"]);
    }
    return true;
  }
  function genCheckboxModel(el, value, modifiers) {
    var number = modifiers && modifiers.number;
    var valueBinding = getBindingAttr(el, "value") || "null";
    var trueValueBinding = getBindingAttr(el, "true-value") || "true";
    var falseValueBinding = getBindingAttr(el, "false-value") || "false";
    addProp(el, "checked", "Array.isArray(".concat(value, ")") + "?_i(".concat(value, ",").concat(valueBinding, ")>-1") + (trueValueBinding === "true" ? ":(".concat(value, ")") : ":_q(".concat(value, ",").concat(trueValueBinding, ")")));
    addHandler(el, "change", "var $$a=".concat(value, ",") + "$$el=$event.target," + "$$c=$$el.checked?(".concat(trueValueBinding, "):(").concat(falseValueBinding, ");") + "if(Array.isArray($$a)){" + "var $$v=".concat(number ? "_n(" + valueBinding + ")" : valueBinding, ",") + "$$i=_i($$a,$$v);" + "if($$el.checked){$$i<0&&(".concat(genAssignmentCode(value, "$$a.concat([$$v])"), ")}") + "else{$$i>-1&&(".concat(genAssignmentCode(value, "$$a.slice(0,$$i).concat($$a.slice($$i+1))"), ")}") + "}else{".concat(genAssignmentCode(value, "$$c"), "}"), null, true);
  }
  function genRadioModel(el, value, modifiers) {
    var number = modifiers && modifiers.number;
    var valueBinding = getBindingAttr(el, "value") || "null";
    valueBinding = number ? "_n(".concat(valueBinding, ")") : valueBinding;
    addProp(el, "checked", "_q(".concat(value, ",").concat(valueBinding, ")"));
    addHandler(el, "change", genAssignmentCode(value, valueBinding), null, true);
  }
  function genSelect(el, value, modifiers) {
    var number = modifiers && modifiers.number;
    var selectedVal = 'Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;' + "return ".concat(number ? "_n(val)" : "val", "})");
    var assignment = "$event.target.multiple ? $$selectedVal : $$selectedVal[0]";
    var code = "var $$selectedVal = ".concat(selectedVal, ";");
    code = "".concat(code, " ").concat(genAssignmentCode(value, assignment));
    addHandler(el, "change", code, null, true);
  }
  function genDefaultModel(el, value, modifiers) {
    var type = el.attrsMap.type;
    if (true) {
      var value_1 = el.attrsMap["v-bind:value"] || el.attrsMap[":value"];
      var typeBinding = el.attrsMap["v-bind:type"] || el.attrsMap[":type"];
      if (value_1 && !typeBinding) {
        var binding = el.attrsMap["v-bind:value"] ? "v-bind:value" : ":value";
        warn$1("".concat(binding, '="').concat(value_1, '" conflicts with v-model on the same element ') + "because the latter already expands to a value binding internally", el.rawAttrsMap[binding]);
      }
    }
    var _a2 = modifiers || {}, lazy = _a2.lazy, number = _a2.number, trim = _a2.trim;
    var needCompositionGuard = !lazy && type !== "range";
    var event = lazy ? "change" : type === "range" ? RANGE_TOKEN : "input";
    var valueExpression = "$event.target.value";
    if (trim) {
      valueExpression = "$event.target.value.trim()";
    }
    if (number) {
      valueExpression = "_n(".concat(valueExpression, ")");
    }
    var code = genAssignmentCode(value, valueExpression);
    if (needCompositionGuard) {
      code = "if($event.target.composing)return;".concat(code);
    }
    addProp(el, "value", "(".concat(value, ")"));
    addHandler(el, event, code, null, true);
    if (trim || number) {
      addHandler(el, "blur", "$forceUpdate()");
    }
  }
  function normalizeEvents(on2) {
    if (isDef(on2[RANGE_TOKEN])) {
      var event_1 = isIE ? "change" : "input";
      on2[event_1] = [].concat(on2[RANGE_TOKEN], on2[event_1] || []);
      delete on2[RANGE_TOKEN];
    }
    if (isDef(on2[CHECKBOX_RADIO_TOKEN])) {
      on2.change = [].concat(on2[CHECKBOX_RADIO_TOKEN], on2.change || []);
      delete on2[CHECKBOX_RADIO_TOKEN];
    }
  }
  var target;
  function createOnceHandler(event, handler, capture) {
    var _target = target;
    return function onceHandler() {
      var res = handler.apply(null, arguments);
      if (res !== null) {
        remove(event, onceHandler, capture, _target);
      }
    };
  }
  var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);
  function add(name, handler, capture, passive) {
    if (useMicrotaskFix) {
      var attachedTimestamp_1 = currentFlushTimestamp;
      var original_1 = handler;
      handler = original_1._wrapper = function(e) {
        if (e.target === e.currentTarget || e.timeStamp >= attachedTimestamp_1 || e.timeStamp <= 0 || e.target.ownerDocument !== document) {
          return original_1.apply(this, arguments);
        }
      };
    }
    target.addEventListener(name, handler, supportsPassive ? { capture, passive } : capture);
  }
  function remove(name, handler, capture, _target) {
    (_target || target).removeEventListener(
      name,
      handler._wrapper || handler,
      capture
    );
  }
  function updateDOMListeners(oldVnode, vnode) {
    if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
      return;
    }
    var on2 = vnode.data.on || {};
    var oldOn = oldVnode.data.on || {};
    target = vnode.elm || oldVnode.elm;
    normalizeEvents(on2);
    updateListeners(on2, oldOn, add, remove, createOnceHandler, vnode.context);
    target = void 0;
  }
  var events = {
    create: updateDOMListeners,
    update: updateDOMListeners,
    destroy: function(vnode) {
      return updateDOMListeners(vnode, emptyNode);
    }
  };
  var svgContainer;
  function updateDOMProps(oldVnode, vnode) {
    if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
      return;
    }
    var key, cur;
    var elm = vnode.elm;
    var oldProps = oldVnode.data.domProps || {};
    var props2 = vnode.data.domProps || {};
    if (isDef(props2.__ob__) || isTrue(props2._v_attr_proxy)) {
      props2 = vnode.data.domProps = extend({}, props2);
    }
    for (key in oldProps) {
      if (!(key in props2)) {
        elm[key] = "";
      }
    }
    for (key in props2) {
      cur = props2[key];
      if (key === "textContent" || key === "innerHTML") {
        if (vnode.children)
          vnode.children.length = 0;
        if (cur === oldProps[key])
          continue;
        if (elm.childNodes.length === 1) {
          elm.removeChild(elm.childNodes[0]);
        }
      }
      if (key === "value" && elm.tagName !== "PROGRESS") {
        elm._value = cur;
        var strCur = isUndef(cur) ? "" : String(cur);
        if (shouldUpdateValue(elm, strCur)) {
          elm.value = strCur;
        }
      } else if (key === "innerHTML" && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
        svgContainer = svgContainer || document.createElement("div");
        svgContainer.innerHTML = "<svg>".concat(cur, "</svg>");
        var svg = svgContainer.firstChild;
        while (elm.firstChild) {
          elm.removeChild(elm.firstChild);
        }
        while (svg.firstChild) {
          elm.appendChild(svg.firstChild);
        }
      } else if (cur !== oldProps[key]) {
        try {
          elm[key] = cur;
        } catch (e) {
        }
      }
    }
  }
  function shouldUpdateValue(elm, checkVal) {
    return !elm.composing && (elm.tagName === "OPTION" || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
  }
  function isNotInFocusAndDirty(elm, checkVal) {
    var notInFocus = true;
    try {
      notInFocus = document.activeElement !== elm;
    } catch (e) {
    }
    return notInFocus && elm.value !== checkVal;
  }
  function isDirtyWithModifiers(elm, newVal) {
    var value = elm.value;
    var modifiers = elm._vModifiers;
    if (isDef(modifiers)) {
      if (modifiers.number) {
        return toNumber(value) !== toNumber(newVal);
      }
      if (modifiers.trim) {
        return value.trim() !== newVal.trim();
      }
    }
    return value !== newVal;
  }
  var domProps = {
    create: updateDOMProps,
    update: updateDOMProps
  };
  var parseStyleText = cached(function(cssText) {
    var res = {};
    var listDelimiter = /;(?![^(]*\))/g;
    var propertyDelimiter = /:(.+)/;
    cssText.split(listDelimiter).forEach(function(item) {
      if (item) {
        var tmp = item.split(propertyDelimiter);
        tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return res;
  });
  function normalizeStyleData(data) {
    var style2 = normalizeStyleBinding(data.style);
    return data.staticStyle ? extend(data.staticStyle, style2) : style2;
  }
  function normalizeStyleBinding(bindingStyle) {
    if (Array.isArray(bindingStyle)) {
      return toObject(bindingStyle);
    }
    if (typeof bindingStyle === "string") {
      return parseStyleText(bindingStyle);
    }
    return bindingStyle;
  }
  function getStyle(vnode, checkChild) {
    var res = {};
    var styleData;
    if (checkChild) {
      var childNode = vnode;
      while (childNode.componentInstance) {
        childNode = childNode.componentInstance._vnode;
        if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
          extend(res, styleData);
        }
      }
    }
    if (styleData = normalizeStyleData(vnode.data)) {
      extend(res, styleData);
    }
    var parentNode2 = vnode;
    while (parentNode2 = parentNode2.parent) {
      if (parentNode2.data && (styleData = normalizeStyleData(parentNode2.data))) {
        extend(res, styleData);
      }
    }
    return res;
  }
  var cssVarRE = /^--/;
  var importantRE = /\s*!important$/;
  var setProp = function(el, name, val) {
    if (cssVarRE.test(name)) {
      el.style.setProperty(name, val);
    } else if (importantRE.test(val)) {
      el.style.setProperty(hyphenate(name), val.replace(importantRE, ""), "important");
    } else {
      var normalizedName = normalize(name);
      if (Array.isArray(val)) {
        for (var i = 0, len2 = val.length; i < len2; i++) {
          el.style[normalizedName] = val[i];
        }
      } else {
        el.style[normalizedName] = val;
      }
    }
  };
  var vendorNames = ["Webkit", "Moz", "ms"];
  var emptyStyle;
  var normalize = cached(function(prop) {
    emptyStyle = emptyStyle || document.createElement("div").style;
    prop = camelize(prop);
    if (prop !== "filter" && prop in emptyStyle) {
      return prop;
    }
    var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
    for (var i = 0; i < vendorNames.length; i++) {
      var name_1 = vendorNames[i] + capName;
      if (name_1 in emptyStyle) {
        return name_1;
      }
    }
  });
  function updateStyle(oldVnode, vnode) {
    var data = vnode.data;
    var oldData = oldVnode.data;
    if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
      return;
    }
    var cur, name;
    var el = vnode.elm;
    var oldStaticStyle = oldData.staticStyle;
    var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};
    var oldStyle = oldStaticStyle || oldStyleBinding;
    var style2 = normalizeStyleBinding(vnode.data.style) || {};
    vnode.data.normalizedStyle = isDef(style2.__ob__) ? extend({}, style2) : style2;
    var newStyle = getStyle(vnode, true);
    for (name in oldStyle) {
      if (isUndef(newStyle[name])) {
        setProp(el, name, "");
      }
    }
    for (name in newStyle) {
      cur = newStyle[name];
      if (cur !== oldStyle[name]) {
        setProp(el, name, cur == null ? "" : cur);
      }
    }
  }
  var style$1 = {
    create: updateStyle,
    update: updateStyle
  };
  var whitespaceRE$1 = /\s+/;
  function addClass(el, cls) {
    if (!cls || !(cls = cls.trim())) {
      return;
    }
    if (el.classList) {
      if (cls.indexOf(" ") > -1) {
        cls.split(whitespaceRE$1).forEach(function(c) {
          return el.classList.add(c);
        });
      } else {
        el.classList.add(cls);
      }
    } else {
      var cur = " ".concat(el.getAttribute("class") || "", " ");
      if (cur.indexOf(" " + cls + " ") < 0) {
        el.setAttribute("class", (cur + cls).trim());
      }
    }
  }
  function removeClass(el, cls) {
    if (!cls || !(cls = cls.trim())) {
      return;
    }
    if (el.classList) {
      if (cls.indexOf(" ") > -1) {
        cls.split(whitespaceRE$1).forEach(function(c) {
          return el.classList.remove(c);
        });
      } else {
        el.classList.remove(cls);
      }
      if (!el.classList.length) {
        el.removeAttribute("class");
      }
    } else {
      var cur = " ".concat(el.getAttribute("class") || "", " ");
      var tar = " " + cls + " ";
      while (cur.indexOf(tar) >= 0) {
        cur = cur.replace(tar, " ");
      }
      cur = cur.trim();
      if (cur) {
        el.setAttribute("class", cur);
      } else {
        el.removeAttribute("class");
      }
    }
  }
  function resolveTransition(def2) {
    if (!def2) {
      return;
    }
    if (typeof def2 === "object") {
      var res = {};
      if (def2.css !== false) {
        extend(res, autoCssTransition(def2.name || "v"));
      }
      extend(res, def2);
      return res;
    } else if (typeof def2 === "string") {
      return autoCssTransition(def2);
    }
  }
  var autoCssTransition = cached(function(name) {
    return {
      enterClass: "".concat(name, "-enter"),
      enterToClass: "".concat(name, "-enter-to"),
      enterActiveClass: "".concat(name, "-enter-active"),
      leaveClass: "".concat(name, "-leave"),
      leaveToClass: "".concat(name, "-leave-to"),
      leaveActiveClass: "".concat(name, "-leave-active")
    };
  });
  var hasTransition = inBrowser && !isIE9;
  var TRANSITION = "transition";
  var ANIMATION = "animation";
  var transitionProp = "transition";
  var transitionEndEvent = "transitionend";
  var animationProp = "animation";
  var animationEndEvent = "animationend";
  if (hasTransition) {
    if (window.ontransitionend === void 0 && window.onwebkittransitionend !== void 0) {
      transitionProp = "WebkitTransition";
      transitionEndEvent = "webkitTransitionEnd";
    }
    if (window.onanimationend === void 0 && window.onwebkitanimationend !== void 0) {
      animationProp = "WebkitAnimation";
      animationEndEvent = "webkitAnimationEnd";
    }
  }
  var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : function(fn) {
    return fn();
  };
  function nextFrame(fn) {
    raf(function() {
      raf(fn);
    });
  }
  function addTransitionClass(el, cls) {
    var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
    if (transitionClasses.indexOf(cls) < 0) {
      transitionClasses.push(cls);
      addClass(el, cls);
    }
  }
  function removeTransitionClass(el, cls) {
    if (el._transitionClasses) {
      remove$2(el._transitionClasses, cls);
    }
    removeClass(el, cls);
  }
  function whenTransitionEnds(el, expectedType, cb) {
    var _a2 = getTransitionInfo(el, expectedType), type = _a2.type, timeout = _a2.timeout, propCount = _a2.propCount;
    if (!type)
      return cb();
    var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
    var ended = 0;
    var end = function() {
      el.removeEventListener(event, onEnd);
      cb();
    };
    var onEnd = function(e) {
      if (e.target === el) {
        if (++ended >= propCount) {
          end();
        }
      }
    };
    setTimeout(function() {
      if (ended < propCount) {
        end();
      }
    }, timeout + 1);
    el.addEventListener(event, onEnd);
  }
  var transformRE = /\b(transform|all)(,|$)/;
  function getTransitionInfo(el, expectedType) {
    var styles = window.getComputedStyle(el);
    var transitionDelays = (styles[transitionProp + "Delay"] || "").split(", ");
    var transitionDurations = (styles[transitionProp + "Duration"] || "").split(", ");
    var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    var animationDelays = (styles[animationProp + "Delay"] || "").split(", ");
    var animationDurations = (styles[animationProp + "Duration"] || "").split(", ");
    var animationTimeout = getTimeout(animationDelays, animationDurations);
    var type;
    var timeout = 0;
    var propCount = 0;
    if (expectedType === TRANSITION) {
      if (transitionTimeout > 0) {
        type = TRANSITION;
        timeout = transitionTimeout;
        propCount = transitionDurations.length;
      }
    } else if (expectedType === ANIMATION) {
      if (animationTimeout > 0) {
        type = ANIMATION;
        timeout = animationTimeout;
        propCount = animationDurations.length;
      }
    } else {
      timeout = Math.max(transitionTimeout, animationTimeout);
      type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
      propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
    }
    var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + "Property"]);
    return {
      type,
      timeout,
      propCount,
      hasTransform
    };
  }
  function getTimeout(delays, durations) {
    while (delays.length < durations.length) {
      delays = delays.concat(delays);
    }
    return Math.max.apply(null, durations.map(function(d, i) {
      return toMs(d) + toMs(delays[i]);
    }));
  }
  function toMs(s) {
    return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
  }
  function enter(vnode, toggleDisplay) {
    var el = vnode.elm;
    if (isDef(el._leaveCb)) {
      el._leaveCb.cancelled = true;
      el._leaveCb();
    }
    var data = resolveTransition(vnode.data.transition);
    if (isUndef(data)) {
      return;
    }
    if (isDef(el._enterCb) || el.nodeType !== 1) {
      return;
    }
    var css = data.css, type = data.type, enterClass = data.enterClass, enterToClass = data.enterToClass, enterActiveClass = data.enterActiveClass, appearClass = data.appearClass, appearToClass = data.appearToClass, appearActiveClass = data.appearActiveClass, beforeEnter = data.beforeEnter, enter2 = data.enter, afterEnter = data.afterEnter, enterCancelled = data.enterCancelled, beforeAppear = data.beforeAppear, appear = data.appear, afterAppear = data.afterAppear, appearCancelled = data.appearCancelled, duration = data.duration;
    var context = activeInstance;
    var transitionNode = activeInstance.$vnode;
    while (transitionNode && transitionNode.parent) {
      context = transitionNode.context;
      transitionNode = transitionNode.parent;
    }
    var isAppear = !context._isMounted || !vnode.isRootInsert;
    if (isAppear && !appear && appear !== "") {
      return;
    }
    var startClass = isAppear && appearClass ? appearClass : enterClass;
    var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
    var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
    var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
    var enterHook = isAppear ? isFunction(appear) ? appear : enter2 : enter2;
    var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
    var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
    var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);
    if (explicitEnterDuration != null) {
      checkDuration(explicitEnterDuration, "enter", vnode);
    }
    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(enterHook);
    var cb = el._enterCb = once(function() {
      if (expectsCSS) {
        removeTransitionClass(el, toClass);
        removeTransitionClass(el, activeClass);
      }
      if (cb.cancelled) {
        if (expectsCSS) {
          removeTransitionClass(el, startClass);
        }
        enterCancelledHook && enterCancelledHook(el);
      } else {
        afterEnterHook && afterEnterHook(el);
      }
      el._enterCb = null;
    });
    if (!vnode.data.show) {
      mergeVNodeHook(vnode, "insert", function() {
        var parent = el.parentNode;
        var pendingNode = parent && parent._pending && parent._pending[vnode.key];
        if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
          pendingNode.elm._leaveCb();
        }
        enterHook && enterHook(el, cb);
      });
    }
    beforeEnterHook && beforeEnterHook(el);
    if (expectsCSS) {
      addTransitionClass(el, startClass);
      addTransitionClass(el, activeClass);
      nextFrame(function() {
        removeTransitionClass(el, startClass);
        if (!cb.cancelled) {
          addTransitionClass(el, toClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitEnterDuration)) {
              setTimeout(cb, explicitEnterDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    if (vnode.data.show) {
      toggleDisplay && toggleDisplay();
      enterHook && enterHook(el, cb);
    }
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
  function leave(vnode, rm) {
    var el = vnode.elm;
    if (isDef(el._enterCb)) {
      el._enterCb.cancelled = true;
      el._enterCb();
    }
    var data = resolveTransition(vnode.data.transition);
    if (isUndef(data) || el.nodeType !== 1) {
      return rm();
    }
    if (isDef(el._leaveCb)) {
      return;
    }
    var css = data.css, type = data.type, leaveClass = data.leaveClass, leaveToClass = data.leaveToClass, leaveActiveClass = data.leaveActiveClass, beforeLeave = data.beforeLeave, leave2 = data.leave, afterLeave = data.afterLeave, leaveCancelled = data.leaveCancelled, delayLeave = data.delayLeave, duration = data.duration;
    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(leave2);
    var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);
    if (isDef(explicitLeaveDuration)) {
      checkDuration(explicitLeaveDuration, "leave", vnode);
    }
    var cb = el._leaveCb = once(function() {
      if (el.parentNode && el.parentNode._pending) {
        el.parentNode._pending[vnode.key] = null;
      }
      if (expectsCSS) {
        removeTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveActiveClass);
      }
      if (cb.cancelled) {
        if (expectsCSS) {
          removeTransitionClass(el, leaveClass);
        }
        leaveCancelled && leaveCancelled(el);
      } else {
        rm();
        afterLeave && afterLeave(el);
      }
      el._leaveCb = null;
    });
    if (delayLeave) {
      delayLeave(performLeave);
    } else {
      performLeave();
    }
    function performLeave() {
      if (cb.cancelled) {
        return;
      }
      if (!vnode.data.show && el.parentNode) {
        (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
      }
      beforeLeave && beforeLeave(el);
      if (expectsCSS) {
        addTransitionClass(el, leaveClass);
        addTransitionClass(el, leaveActiveClass);
        nextFrame(function() {
          removeTransitionClass(el, leaveClass);
          if (!cb.cancelled) {
            addTransitionClass(el, leaveToClass);
            if (!userWantsControl) {
              if (isValidDuration(explicitLeaveDuration)) {
                setTimeout(cb, explicitLeaveDuration);
              } else {
                whenTransitionEnds(el, type, cb);
              }
            }
          }
        });
      }
      leave2 && leave2(el, cb);
      if (!expectsCSS && !userWantsControl) {
        cb();
      }
    }
  }
  function checkDuration(val, name, vnode) {
    if (typeof val !== "number") {
      warn$2("<transition> explicit ".concat(name, " duration is not a valid number - ") + "got ".concat(JSON.stringify(val), "."), vnode.context);
    } else if (isNaN(val)) {
      warn$2("<transition> explicit ".concat(name, " duration is NaN - ") + "the duration expression might be incorrect.", vnode.context);
    }
  }
  function isValidDuration(val) {
    return typeof val === "number" && !isNaN(val);
  }
  function getHookArgumentsLength(fn) {
    if (isUndef(fn)) {
      return false;
    }
    var invokerFns = fn.fns;
    if (isDef(invokerFns)) {
      return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
    } else {
      return (fn._length || fn.length) > 1;
    }
  }
  function _enter(_, vnode) {
    if (vnode.data.show !== true) {
      enter(vnode);
    }
  }
  var transition = inBrowser ? {
    create: _enter,
    activate: _enter,
    remove: function(vnode, rm) {
      if (vnode.data.show !== true) {
        leave(vnode, rm);
      } else {
        rm();
      }
    }
  } : {};
  var platformModules = [attrs, klass$1, events, domProps, style$1, transition];
  var modules$1 = platformModules.concat(baseModules);
  var patch = createPatchFunction({ nodeOps, modules: modules$1 });
  if (isIE9) {
    document.addEventListener("selectionchange", function() {
      var el = document.activeElement;
      if (el && el.vmodel) {
        trigger(el, "input");
      }
    });
  }
  var directive = {
    inserted: function(el, binding, vnode, oldVnode) {
      if (vnode.tag === "select") {
        if (oldVnode.elm && !oldVnode.elm._vOptions) {
          mergeVNodeHook(vnode, "postpatch", function() {
            directive.componentUpdated(el, binding, vnode);
          });
        } else {
          setSelected(el, binding, vnode.context);
        }
        el._vOptions = [].map.call(el.options, getValue);
      } else if (vnode.tag === "textarea" || isTextInputType(el.type)) {
        el._vModifiers = binding.modifiers;
        if (!binding.modifiers.lazy) {
          el.addEventListener("compositionstart", onCompositionStart);
          el.addEventListener("compositionend", onCompositionEnd);
          el.addEventListener("change", onCompositionEnd);
          if (isIE9) {
            el.vmodel = true;
          }
        }
      }
    },
    componentUpdated: function(el, binding, vnode) {
      if (vnode.tag === "select") {
        setSelected(el, binding, vnode.context);
        var prevOptions_1 = el._vOptions;
        var curOptions_1 = el._vOptions = [].map.call(el.options, getValue);
        if (curOptions_1.some(function(o, i) {
          return !looseEqual(o, prevOptions_1[i]);
        })) {
          var needReset = el.multiple ? binding.value.some(function(v) {
            return hasNoMatchingOption(v, curOptions_1);
          }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions_1);
          if (needReset) {
            trigger(el, "change");
          }
        }
      }
    }
  };
  function setSelected(el, binding, vm) {
    actuallySetSelected(el, binding, vm);
    if (isIE || isEdge) {
      setTimeout(function() {
        actuallySetSelected(el, binding, vm);
      }, 0);
    }
  }
  function actuallySetSelected(el, binding, vm) {
    var value = binding.value;
    var isMultiple = el.multiple;
    if (isMultiple && !Array.isArray(value)) {
      warn$2('<select multiple v-model="'.concat(binding.expression, '"> ') + "expects an Array value for its binding, but got ".concat(Object.prototype.toString.call(value).slice(8, -1)), vm);
      return;
    }
    var selected, option;
    for (var i = 0, l = el.options.length; i < l; i++) {
      option = el.options[i];
      if (isMultiple) {
        selected = looseIndexOf(value, getValue(option)) > -1;
        if (option.selected !== selected) {
          option.selected = selected;
        }
      } else {
        if (looseEqual(getValue(option), value)) {
          if (el.selectedIndex !== i) {
            el.selectedIndex = i;
          }
          return;
        }
      }
    }
    if (!isMultiple) {
      el.selectedIndex = -1;
    }
  }
  function hasNoMatchingOption(value, options) {
    return options.every(function(o) {
      return !looseEqual(o, value);
    });
  }
  function getValue(option) {
    return "_value" in option ? option._value : option.value;
  }
  function onCompositionStart(e) {
    e.target.composing = true;
  }
  function onCompositionEnd(e) {
    if (!e.target.composing)
      return;
    e.target.composing = false;
    trigger(e.target, "input");
  }
  function trigger(el, type) {
    var e = document.createEvent("HTMLEvents");
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
  }
  function locateNode(vnode) {
    return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
  }
  var show = {
    bind: function(el, _a2, vnode) {
      var value = _a2.value;
      vnode = locateNode(vnode);
      var transition2 = vnode.data && vnode.data.transition;
      var originalDisplay = el.__vOriginalDisplay = el.style.display === "none" ? "" : el.style.display;
      if (value && transition2) {
        vnode.data.show = true;
        enter(vnode, function() {
          el.style.display = originalDisplay;
        });
      } else {
        el.style.display = value ? originalDisplay : "none";
      }
    },
    update: function(el, _a2, vnode) {
      var value = _a2.value, oldValue = _a2.oldValue;
      if (!value === !oldValue)
        return;
      vnode = locateNode(vnode);
      var transition2 = vnode.data && vnode.data.transition;
      if (transition2) {
        vnode.data.show = true;
        if (value) {
          enter(vnode, function() {
            el.style.display = el.__vOriginalDisplay;
          });
        } else {
          leave(vnode, function() {
            el.style.display = "none";
          });
        }
      } else {
        el.style.display = value ? el.__vOriginalDisplay : "none";
      }
    },
    unbind: function(el, binding, vnode, oldVnode, isDestroy) {
      if (!isDestroy) {
        el.style.display = el.__vOriginalDisplay;
      }
    }
  };
  var platformDirectives = {
    model: directive,
    show
  };
  var transitionProps = {
    name: String,
    appear: Boolean,
    css: Boolean,
    mode: String,
    type: String,
    enterClass: String,
    leaveClass: String,
    enterToClass: String,
    leaveToClass: String,
    enterActiveClass: String,
    leaveActiveClass: String,
    appearClass: String,
    appearActiveClass: String,
    appearToClass: String,
    duration: [Number, String, Object]
  };
  function getRealChild(vnode) {
    var compOptions = vnode && vnode.componentOptions;
    if (compOptions && compOptions.Ctor.options.abstract) {
      return getRealChild(getFirstComponentChild(compOptions.children));
    } else {
      return vnode;
    }
  }
  function extractTransitionData(comp) {
    var data = {};
    var options = comp.$options;
    for (var key in options.propsData) {
      data[key] = comp[key];
    }
    var listeners = options._parentListeners;
    for (var key in listeners) {
      data[camelize(key)] = listeners[key];
    }
    return data;
  }
  function placeholder(h, rawChild) {
    if (/\d-keep-alive$/.test(rawChild.tag)) {
      return h("keep-alive", {
        props: rawChild.componentOptions.propsData
      });
    }
  }
  function hasParentTransition(vnode) {
    while (vnode = vnode.parent) {
      if (vnode.data.transition) {
        return true;
      }
    }
  }
  function isSameChild(child, oldChild) {
    return oldChild.key === child.key && oldChild.tag === child.tag;
  }
  var isNotTextNode = function(c) {
    return c.tag || isAsyncPlaceholder(c);
  };
  var isVShowDirective = function(d) {
    return d.name === "show";
  };
  var Transition = {
    name: "transition",
    props: transitionProps,
    abstract: true,
    render: function(h) {
      var _this = this;
      var children = this.$slots.default;
      if (!children) {
        return;
      }
      children = children.filter(isNotTextNode);
      if (!children.length) {
        return;
      }
      if (children.length > 1) {
        warn$2("<transition> can only be used on a single element. Use <transition-group> for lists.", this.$parent);
      }
      var mode = this.mode;
      if (mode && mode !== "in-out" && mode !== "out-in") {
        warn$2("invalid <transition> mode: " + mode, this.$parent);
      }
      var rawChild = children[0];
      if (hasParentTransition(this.$vnode)) {
        return rawChild;
      }
      var child = getRealChild(rawChild);
      if (!child) {
        return rawChild;
      }
      if (this._leaving) {
        return placeholder(h, rawChild);
      }
      var id = "__transition-".concat(this._uid, "-");
      child.key = child.key == null ? child.isComment ? id + "comment" : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
      var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
      var oldRawChild = this._vnode;
      var oldChild = getRealChild(oldRawChild);
      if (child.data.directives && child.data.directives.some(isVShowDirective)) {
        child.data.show = true;
      }
      if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
        var oldData = oldChild.data.transition = extend({}, data);
        if (mode === "out-in") {
          this._leaving = true;
          mergeVNodeHook(oldData, "afterLeave", function() {
            _this._leaving = false;
            _this.$forceUpdate();
          });
          return placeholder(h, rawChild);
        } else if (mode === "in-out") {
          if (isAsyncPlaceholder(child)) {
            return oldRawChild;
          }
          var delayedLeave_1;
          var performLeave = function() {
            delayedLeave_1();
          };
          mergeVNodeHook(data, "afterEnter", performLeave);
          mergeVNodeHook(data, "enterCancelled", performLeave);
          mergeVNodeHook(oldData, "delayLeave", function(leave2) {
            delayedLeave_1 = leave2;
          });
        }
      }
      return rawChild;
    }
  };
  var props = extend({
    tag: String,
    moveClass: String
  }, transitionProps);
  delete props.mode;
  var TransitionGroup = {
    props,
    beforeMount: function() {
      var _this = this;
      var update = this._update;
      this._update = function(vnode, hydrating) {
        var restoreActiveInstance = setActiveInstance(_this);
        _this.__patch__(
          _this._vnode,
          _this.kept,
          false,
          true
        );
        _this._vnode = _this.kept;
        restoreActiveInstance();
        update.call(_this, vnode, hydrating);
      };
    },
    render: function(h) {
      var tag = this.tag || this.$vnode.data.tag || "span";
      var map = /* @__PURE__ */ Object.create(null);
      var prevChildren = this.prevChildren = this.children;
      var rawChildren = this.$slots.default || [];
      var children = this.children = [];
      var transitionData = extractTransitionData(this);
      for (var i = 0; i < rawChildren.length; i++) {
        var c = rawChildren[i];
        if (c.tag) {
          if (c.key != null && String(c.key).indexOf("__vlist") !== 0) {
            children.push(c);
            map[c.key] = c;
            (c.data || (c.data = {})).transition = transitionData;
          } else if (true) {
            var opts = c.componentOptions;
            var name_1 = opts ? getComponentName(opts.Ctor.options) || opts.tag || "" : c.tag;
            warn$2("<transition-group> children must be keyed: <".concat(name_1, ">"));
          }
        }
      }
      if (prevChildren) {
        var kept = [];
        var removed = [];
        for (var i = 0; i < prevChildren.length; i++) {
          var c = prevChildren[i];
          c.data.transition = transitionData;
          c.data.pos = c.elm.getBoundingClientRect();
          if (map[c.key]) {
            kept.push(c);
          } else {
            removed.push(c);
          }
        }
        this.kept = h(tag, null, kept);
        this.removed = removed;
      }
      return h(tag, null, children);
    },
    updated: function() {
      var children = this.prevChildren;
      var moveClass = this.moveClass || (this.name || "v") + "-move";
      if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
        return;
      }
      children.forEach(callPendingCbs);
      children.forEach(recordPosition);
      children.forEach(applyTranslation);
      this._reflow = document.body.offsetHeight;
      children.forEach(function(c) {
        if (c.data.moved) {
          var el_1 = c.elm;
          var s = el_1.style;
          addTransitionClass(el_1, moveClass);
          s.transform = s.WebkitTransform = s.transitionDuration = "";
          el_1.addEventListener(transitionEndEvent, el_1._moveCb = function cb(e) {
            if (e && e.target !== el_1) {
              return;
            }
            if (!e || /transform$/.test(e.propertyName)) {
              el_1.removeEventListener(transitionEndEvent, cb);
              el_1._moveCb = null;
              removeTransitionClass(el_1, moveClass);
            }
          });
        }
      });
    },
    methods: {
      hasMove: function(el, moveClass) {
        if (!hasTransition) {
          return false;
        }
        if (this._hasMove) {
          return this._hasMove;
        }
        var clone = el.cloneNode();
        if (el._transitionClasses) {
          el._transitionClasses.forEach(function(cls) {
            removeClass(clone, cls);
          });
        }
        addClass(clone, moveClass);
        clone.style.display = "none";
        this.$el.appendChild(clone);
        var info = getTransitionInfo(clone);
        this.$el.removeChild(clone);
        return this._hasMove = info.hasTransform;
      }
    }
  };
  function callPendingCbs(c) {
    if (c.elm._moveCb) {
      c.elm._moveCb();
    }
    if (c.elm._enterCb) {
      c.elm._enterCb();
    }
  }
  function recordPosition(c) {
    c.data.newPos = c.elm.getBoundingClientRect();
  }
  function applyTranslation(c) {
    var oldPos = c.data.pos;
    var newPos = c.data.newPos;
    var dx = oldPos.left - newPos.left;
    var dy = oldPos.top - newPos.top;
    if (dx || dy) {
      c.data.moved = true;
      var s = c.elm.style;
      s.transform = s.WebkitTransform = "translate(".concat(dx, "px,").concat(dy, "px)");
      s.transitionDuration = "0s";
    }
  }
  var platformComponents = {
    Transition,
    TransitionGroup
  };
  Vue.config.mustUseProp = mustUseProp;
  Vue.config.isReservedTag = isReservedTag;
  Vue.config.isReservedAttr = isReservedAttr;
  Vue.config.getTagNamespace = getTagNamespace;
  Vue.config.isUnknownElement = isUnknownElement;
  extend(Vue.options.directives, platformDirectives);
  extend(Vue.options.components, platformComponents);
  Vue.prototype.__patch__ = inBrowser ? patch : noop;
  Vue.prototype.$mount = function(el, hydrating) {
    el = el && inBrowser ? query(el) : void 0;
    return mountComponent(this, el, hydrating);
  };
  if (inBrowser) {
    setTimeout(function() {
      if (config.devtools) {
        if (devtools) {
          devtools.emit("init", Vue);
        } else if (true) {
          console[console.info ? "info" : "log"]("Download the Vue Devtools extension for a better development experience:\nhttps://github.com/vuejs/vue-devtools");
        }
      }
      if (config.productionTip !== false && typeof console !== "undefined") {
        console[console.info ? "info" : "log"]("You are running Vue in development mode.\nMake sure to turn on production mode when deploying for production.\nSee more tips at https://vuejs.org/guide/deployment.html");
      }
    }, 0);
  }
  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
  var buildRegex = cached(function(delimiters2) {
    var open = delimiters2[0].replace(regexEscapeRE, "\\$&");
    var close = delimiters2[1].replace(regexEscapeRE, "\\$&");
    return new RegExp(open + "((?:.|\\n)+?)" + close, "g");
  });
  function parseText(text2, delimiters2) {
    var tagRE = delimiters2 ? buildRegex(delimiters2) : defaultTagRE;
    if (!tagRE.test(text2)) {
      return;
    }
    var tokens = [];
    var rawTokens = [];
    var lastIndex = tagRE.lastIndex = 0;
    var match, index2, tokenValue;
    while (match = tagRE.exec(text2)) {
      index2 = match.index;
      if (index2 > lastIndex) {
        rawTokens.push(tokenValue = text2.slice(lastIndex, index2));
        tokens.push(JSON.stringify(tokenValue));
      }
      var exp = parseFilters(match[1].trim());
      tokens.push("_s(".concat(exp, ")"));
      rawTokens.push({ "@binding": exp });
      lastIndex = index2 + match[0].length;
    }
    if (lastIndex < text2.length) {
      rawTokens.push(tokenValue = text2.slice(lastIndex));
      tokens.push(JSON.stringify(tokenValue));
    }
    return {
      expression: tokens.join("+"),
      tokens: rawTokens
    };
  }
  function transformNode$1(el, options) {
    var warn2 = options.warn || baseWarn;
    var staticClass = getAndRemoveAttr(el, "class");
    if (staticClass) {
      var res = parseText(staticClass, options.delimiters);
      if (res) {
        warn2('class="'.concat(staticClass, '": ') + 'Interpolation inside attributes has been removed. Use v-bind or the colon shorthand instead. For example, instead of <div class="{{ val }}">, use <div :class="val">.', el.rawAttrsMap["class"]);
      }
    }
    if (staticClass) {
      el.staticClass = JSON.stringify(staticClass.replace(/\s+/g, " ").trim());
    }
    var classBinding = getBindingAttr(el, "class", false);
    if (classBinding) {
      el.classBinding = classBinding;
    }
  }
  function genData$2(el) {
    var data = "";
    if (el.staticClass) {
      data += "staticClass:".concat(el.staticClass, ",");
    }
    if (el.classBinding) {
      data += "class:".concat(el.classBinding, ",");
    }
    return data;
  }
  var klass = {
    staticKeys: ["staticClass"],
    transformNode: transformNode$1,
    genData: genData$2
  };
  function transformNode(el, options) {
    var warn2 = options.warn || baseWarn;
    var staticStyle = getAndRemoveAttr(el, "style");
    if (staticStyle) {
      if (true) {
        var res = parseText(staticStyle, options.delimiters);
        if (res) {
          warn2('style="'.concat(staticStyle, '": ') + 'Interpolation inside attributes has been removed. Use v-bind or the colon shorthand instead. For example, instead of <div style="{{ val }}">, use <div :style="val">.', el.rawAttrsMap["style"]);
        }
      }
      el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
    }
    var styleBinding = getBindingAttr(el, "style", false);
    if (styleBinding) {
      el.styleBinding = styleBinding;
    }
  }
  function genData$1(el) {
    var data = "";
    if (el.staticStyle) {
      data += "staticStyle:".concat(el.staticStyle, ",");
    }
    if (el.styleBinding) {
      data += "style:(".concat(el.styleBinding, "),");
    }
    return data;
  }
  var style = {
    staticKeys: ["staticStyle"],
    transformNode,
    genData: genData$1
  };
  var decoder;
  var he = {
    decode: function(html2) {
      decoder = decoder || document.createElement("div");
      decoder.innerHTML = html2;
      return decoder.textContent;
    }
  };
  var isUnaryTag = makeMap("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr");
  var canBeLeftOpenTag = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source");
  var isNonPhrasingTag = makeMap("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track");
  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z".concat(unicodeRegExp.source, "]*");
  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
  var startTagOpen = new RegExp("^<".concat(qnameCapture));
  var startTagClose = /^\s*(\/?)>/;
  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>"));
  var doctype = /^<!DOCTYPE [^>]+>/i;
  var comment = /^<!\--/;
  var conditionalComment = /^<!\[/;
  var isPlainTextElement = makeMap("script,style,textarea", true);
  var reCache = {};
  var decodingMap = {
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&amp;": "&",
    "&#10;": "\n",
    "&#9;": "	",
    "&#39;": "'"
  };
  var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
  var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;
  var isIgnoreNewlineTag = makeMap("pre,textarea", true);
  var shouldIgnoreFirstNewline = function(tag, html2) {
    return tag && isIgnoreNewlineTag(tag) && html2[0] === "\n";
  };
  function decodeAttr(value, shouldDecodeNewlines2) {
    var re = shouldDecodeNewlines2 ? encodedAttrWithNewLines : encodedAttr;
    return value.replace(re, function(match) {
      return decodingMap[match];
    });
  }
  function parseHTML(html2, options) {
    var stack = [];
    var expectHTML = options.expectHTML;
    var isUnaryTag2 = options.isUnaryTag || no;
    var canBeLeftOpenTag2 = options.canBeLeftOpenTag || no;
    var index2 = 0;
    var last, lastTag;
    var _loop_1 = function() {
      last = html2;
      if (!lastTag || !isPlainTextElement(lastTag)) {
        var textEnd = html2.indexOf("<");
        if (textEnd === 0) {
          if (comment.test(html2)) {
            var commentEnd = html2.indexOf("-->");
            if (commentEnd >= 0) {
              if (options.shouldKeepComment && options.comment) {
                options.comment(html2.substring(4, commentEnd), index2, index2 + commentEnd + 3);
              }
              advance(commentEnd + 3);
              return "continue";
            }
          }
          if (conditionalComment.test(html2)) {
            var conditionalEnd = html2.indexOf("]>");
            if (conditionalEnd >= 0) {
              advance(conditionalEnd + 2);
              return "continue";
            }
          }
          var doctypeMatch = html2.match(doctype);
          if (doctypeMatch) {
            advance(doctypeMatch[0].length);
            return "continue";
          }
          var endTagMatch = html2.match(endTag);
          if (endTagMatch) {
            var curIndex = index2;
            advance(endTagMatch[0].length);
            parseEndTag(endTagMatch[1], curIndex, index2);
            return "continue";
          }
          var startTagMatch = parseStartTag();
          if (startTagMatch) {
            handleStartTag(startTagMatch);
            if (shouldIgnoreFirstNewline(startTagMatch.tagName, html2)) {
              advance(1);
            }
            return "continue";
          }
        }
        var text2 = void 0, rest = void 0, next2 = void 0;
        if (textEnd >= 0) {
          rest = html2.slice(textEnd);
          while (!endTag.test(rest) && !startTagOpen.test(rest) && !comment.test(rest) && !conditionalComment.test(rest)) {
            next2 = rest.indexOf("<", 1);
            if (next2 < 0)
              break;
            textEnd += next2;
            rest = html2.slice(textEnd);
          }
          text2 = html2.substring(0, textEnd);
        }
        if (textEnd < 0) {
          text2 = html2;
        }
        if (text2) {
          advance(text2.length);
        }
        if (options.chars && text2) {
          options.chars(text2, index2 - text2.length, index2);
        }
      } else {
        var endTagLength_1 = 0;
        var stackedTag_1 = lastTag.toLowerCase();
        var reStackedTag = reCache[stackedTag_1] || (reCache[stackedTag_1] = new RegExp("([\\s\\S]*?)(</" + stackedTag_1 + "[^>]*>)", "i"));
        var rest = html2.replace(reStackedTag, function(all, text3, endTag2) {
          endTagLength_1 = endTag2.length;
          if (!isPlainTextElement(stackedTag_1) && stackedTag_1 !== "noscript") {
            text3 = text3.replace(/<!\--([\s\S]*?)-->/g, "$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g, "$1");
          }
          if (shouldIgnoreFirstNewline(stackedTag_1, text3)) {
            text3 = text3.slice(1);
          }
          if (options.chars) {
            options.chars(text3);
          }
          return "";
        });
        index2 += html2.length - rest.length;
        html2 = rest;
        parseEndTag(stackedTag_1, index2 - endTagLength_1, index2);
      }
      if (html2 === last) {
        options.chars && options.chars(html2);
        if (!stack.length && options.warn) {
          options.warn('Mal-formatted tag at end of template: "'.concat(html2, '"'), {
            start: index2 + html2.length
          });
        }
        return "break";
      }
    };
    while (html2) {
      var state_1 = _loop_1();
      if (state_1 === "break")
        break;
    }
    parseEndTag();
    function advance(n) {
      index2 += n;
      html2 = html2.substring(n);
    }
    function parseStartTag() {
      var start = html2.match(startTagOpen);
      if (start) {
        var match = {
          tagName: start[1],
          attrs: [],
          start: index2
        };
        advance(start[0].length);
        var end = void 0, attr = void 0;
        while (!(end = html2.match(startTagClose)) && (attr = html2.match(dynamicArgAttribute) || html2.match(attribute))) {
          attr.start = index2;
          advance(attr[0].length);
          attr.end = index2;
          match.attrs.push(attr);
        }
        if (end) {
          match.unarySlash = end[1];
          advance(end[0].length);
          match.end = index2;
          return match;
        }
      }
    }
    function handleStartTag(match) {
      var tagName2 = match.tagName;
      var unarySlash = match.unarySlash;
      if (expectHTML) {
        if (lastTag === "p" && isNonPhrasingTag(tagName2)) {
          parseEndTag(lastTag);
        }
        if (canBeLeftOpenTag2(tagName2) && lastTag === tagName2) {
          parseEndTag(tagName2);
        }
      }
      var unary = isUnaryTag2(tagName2) || !!unarySlash;
      var l = match.attrs.length;
      var attrs2 = new Array(l);
      for (var i = 0; i < l; i++) {
        var args = match.attrs[i];
        var value = args[3] || args[4] || args[5] || "";
        var shouldDecodeNewlines2 = tagName2 === "a" && args[1] === "href" ? options.shouldDecodeNewlinesForHref : options.shouldDecodeNewlines;
        attrs2[i] = {
          name: args[1],
          value: decodeAttr(value, shouldDecodeNewlines2)
        };
        if (options.outputSourceRange) {
          attrs2[i].start = args.start + args[0].match(/^\s*/).length;
          attrs2[i].end = args.end;
        }
      }
      if (!unary) {
        stack.push({
          tag: tagName2,
          lowerCasedTag: tagName2.toLowerCase(),
          attrs: attrs2,
          start: match.start,
          end: match.end
        });
        lastTag = tagName2;
      }
      if (options.start) {
        options.start(tagName2, attrs2, unary, match.start, match.end);
      }
    }
    function parseEndTag(tagName2, start, end) {
      var pos, lowerCasedTagName;
      if (start == null)
        start = index2;
      if (end == null)
        end = index2;
      if (tagName2) {
        lowerCasedTagName = tagName2.toLowerCase();
        for (pos = stack.length - 1; pos >= 0; pos--) {
          if (stack[pos].lowerCasedTag === lowerCasedTagName) {
            break;
          }
        }
      } else {
        pos = 0;
      }
      if (pos >= 0) {
        for (var i = stack.length - 1; i >= pos; i--) {
          if ((i > pos || !tagName2) && options.warn) {
            options.warn("tag <".concat(stack[i].tag, "> has no matching end tag."), {
              start: stack[i].start,
              end: stack[i].end
            });
          }
          if (options.end) {
            options.end(stack[i].tag, start, end);
          }
        }
        stack.length = pos;
        lastTag = pos && stack[pos - 1].tag;
      } else if (lowerCasedTagName === "br") {
        if (options.start) {
          options.start(tagName2, [], true, start, end);
        }
      } else if (lowerCasedTagName === "p") {
        if (options.start) {
          options.start(tagName2, [], false, start, end);
        }
        if (options.end) {
          options.end(tagName2, start, end);
        }
      }
    }
  }
  var onRE = /^@|^v-on:/;
  var dirRE = /^v-|^@|^:|^#/;
  var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
  var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
  var stripParensRE = /^\(|\)$/g;
  var dynamicArgRE = /^\[.*\]$/;
  var argRE = /:(.*)$/;
  var bindRE = /^:|^\.|^v-bind:/;
  var modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;
  var slotRE = /^v-slot(:|$)|^#/;
  var lineBreakRE = /[\r\n]/;
  var whitespaceRE = /[ \f\t\r\n]+/g;
  var invalidAttributeRE = /[\s"'<>\/=]/;
  var decodeHTMLCached = cached(he.decode);
  var emptySlotScopeToken = "_empty_";
  var warn;
  var delimiters;
  var transforms;
  var preTransforms;
  var postTransforms;
  var platformIsPreTag;
  var platformMustUseProp;
  var platformGetTagNamespace;
  var maybeComponent;
  function createASTElement(tag, attrs2, parent) {
    return {
      type: 1,
      tag,
      attrsList: attrs2,
      attrsMap: makeAttrsMap(attrs2),
      rawAttrsMap: {},
      parent,
      children: []
    };
  }
  function parse(template, options) {
    warn = options.warn || baseWarn;
    platformIsPreTag = options.isPreTag || no;
    platformMustUseProp = options.mustUseProp || no;
    platformGetTagNamespace = options.getTagNamespace || no;
    var isReservedTag2 = options.isReservedTag || no;
    maybeComponent = function(el) {
      return !!(el.component || el.attrsMap[":is"] || el.attrsMap["v-bind:is"] || !(el.attrsMap.is ? isReservedTag2(el.attrsMap.is) : isReservedTag2(el.tag)));
    };
    transforms = pluckModuleFunction(options.modules, "transformNode");
    preTransforms = pluckModuleFunction(options.modules, "preTransformNode");
    postTransforms = pluckModuleFunction(options.modules, "postTransformNode");
    delimiters = options.delimiters;
    var stack = [];
    var preserveWhitespace = options.preserveWhitespace !== false;
    var whitespaceOption = options.whitespace;
    var root;
    var currentParent;
    var inVPre = false;
    var inPre = false;
    var warned = false;
    function warnOnce(msg, range2) {
      if (!warned) {
        warned = true;
        warn(msg, range2);
      }
    }
    function closeElement(element) {
      trimEndingWhitespace(element);
      if (!inVPre && !element.processed) {
        element = processElement(element, options);
      }
      if (!stack.length && element !== root) {
        if (root.if && (element.elseif || element.else)) {
          if (true) {
            checkRootConstraints(element);
          }
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (true) {
          warnOnce("Component template should contain exactly one root element. If you are using v-if on multiple elements, use v-else-if to chain them instead.", { start: element.start });
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else {
          if (element.slotScope) {
            var name_1 = element.slotTarget || '"default"';
            (currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name_1] = element;
          }
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      element.children = element.children.filter(function(c) {
        return !c.slotScope;
      });
      trimEndingWhitespace(element);
      if (element.pre) {
        inVPre = false;
      }
      if (platformIsPreTag(element.tag)) {
        inPre = false;
      }
      for (var i = 0; i < postTransforms.length; i++) {
        postTransforms[i](element, options);
      }
    }
    function trimEndingWhitespace(el) {
      if (!inPre) {
        var lastNode = void 0;
        while ((lastNode = el.children[el.children.length - 1]) && lastNode.type === 3 && lastNode.text === " ") {
          el.children.pop();
        }
      }
    }
    function checkRootConstraints(el) {
      if (el.tag === "slot" || el.tag === "template") {
        warnOnce("Cannot use <".concat(el.tag, "> as component root element because it may ") + "contain multiple nodes.", { start: el.start });
      }
      if (el.attrsMap.hasOwnProperty("v-for")) {
        warnOnce("Cannot use v-for on stateful component root element because it renders multiple elements.", el.rawAttrsMap["v-for"]);
      }
    }
    parseHTML(template, {
      warn,
      expectHTML: options.expectHTML,
      isUnaryTag: options.isUnaryTag,
      canBeLeftOpenTag: options.canBeLeftOpenTag,
      shouldDecodeNewlines: options.shouldDecodeNewlines,
      shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
      shouldKeepComment: options.comments,
      outputSourceRange: options.outputSourceRange,
      start: function(tag, attrs2, unary, start, end) {
        var ns = currentParent && currentParent.ns || platformGetTagNamespace(tag);
        if (isIE && ns === "svg") {
          attrs2 = guardIESVGBug(attrs2);
        }
        var element = createASTElement(tag, attrs2, currentParent);
        if (ns) {
          element.ns = ns;
        }
        if (true) {
          if (options.outputSourceRange) {
            element.start = start;
            element.end = end;
            element.rawAttrsMap = element.attrsList.reduce(function(cumulated, attr) {
              cumulated[attr.name] = attr;
              return cumulated;
            }, {});
          }
          attrs2.forEach(function(attr) {
            if (invalidAttributeRE.test(attr.name)) {
              warn("Invalid dynamic argument expression: attribute names cannot contain spaces, quotes, <, >, / or =.", options.outputSourceRange ? {
                start: attr.start + attr.name.indexOf("["),
                end: attr.start + attr.name.length
              } : void 0);
            }
          });
        }
        if (isForbiddenTag(element) && !isServerRendering()) {
          element.forbidden = true;
          warn("Templates should only be responsible for mapping the state to the UI. Avoid placing tags with side-effects in your templates, such as " + "<".concat(tag, ">") + ", as they will not be parsed.", { start: element.start });
        }
        for (var i = 0; i < preTransforms.length; i++) {
          element = preTransforms[i](element, options) || element;
        }
        if (!inVPre) {
          processPre(element);
          if (element.pre) {
            inVPre = true;
          }
        }
        if (platformIsPreTag(element.tag)) {
          inPre = true;
        }
        if (inVPre) {
          processRawAttrs(element);
        } else if (!element.processed) {
          processFor(element);
          processIf(element);
          processOnce(element);
        }
        if (!root) {
          root = element;
          if (true) {
            checkRootConstraints(root);
          }
        }
        if (!unary) {
          currentParent = element;
          stack.push(element);
        } else {
          closeElement(element);
        }
      },
      end: function(tag, start, end) {
        var element = stack[stack.length - 1];
        stack.length -= 1;
        currentParent = stack[stack.length - 1];
        if (options.outputSourceRange) {
          element.end = end;
        }
        closeElement(element);
      },
      chars: function(text2, start, end) {
        if (!currentParent) {
          if (true) {
            if (text2 === template) {
              warnOnce("Component template requires a root element, rather than just text.", { start });
            } else if (text2 = text2.trim()) {
              warnOnce('text "'.concat(text2, '" outside root element will be ignored.'), {
                start
              });
            }
          }
          return;
        }
        if (isIE && currentParent.tag === "textarea" && currentParent.attrsMap.placeholder === text2) {
          return;
        }
        var children = currentParent.children;
        if (inPre || text2.trim()) {
          text2 = isTextTag(currentParent) ? text2 : decodeHTMLCached(text2);
        } else if (!children.length) {
          text2 = "";
        } else if (whitespaceOption) {
          if (whitespaceOption === "condense") {
            text2 = lineBreakRE.test(text2) ? "" : " ";
          } else {
            text2 = " ";
          }
        } else {
          text2 = preserveWhitespace ? " " : "";
        }
        if (text2) {
          if (!inPre && whitespaceOption === "condense") {
            text2 = text2.replace(whitespaceRE, " ");
          }
          var res = void 0;
          var child = void 0;
          if (!inVPre && text2 !== " " && (res = parseText(text2, delimiters))) {
            child = {
              type: 2,
              expression: res.expression,
              tokens: res.tokens,
              text: text2
            };
          } else if (text2 !== " " || !children.length || children[children.length - 1].text !== " ") {
            child = {
              type: 3,
              text: text2
            };
          }
          if (child) {
            if (options.outputSourceRange) {
              child.start = start;
              child.end = end;
            }
            children.push(child);
          }
        }
      },
      comment: function(text2, start, end) {
        if (currentParent) {
          var child = {
            type: 3,
            text: text2,
            isComment: true
          };
          if (options.outputSourceRange) {
            child.start = start;
            child.end = end;
          }
          currentParent.children.push(child);
        }
      }
    });
    return root;
  }
  function processPre(el) {
    if (getAndRemoveAttr(el, "v-pre") != null) {
      el.pre = true;
    }
  }
  function processRawAttrs(el) {
    var list = el.attrsList;
    var len2 = list.length;
    if (len2) {
      var attrs2 = el.attrs = new Array(len2);
      for (var i = 0; i < len2; i++) {
        attrs2[i] = {
          name: list[i].name,
          value: JSON.stringify(list[i].value)
        };
        if (list[i].start != null) {
          attrs2[i].start = list[i].start;
          attrs2[i].end = list[i].end;
        }
      }
    } else if (!el.pre) {
      el.plain = true;
    }
  }
  function processElement(element, options) {
    processKey(element);
    element.plain = !element.key && !element.scopedSlots && !element.attrsList.length;
    processRef(element);
    processSlotContent(element);
    processSlotOutlet(element);
    processComponent(element);
    for (var i = 0; i < transforms.length; i++) {
      element = transforms[i](element, options) || element;
    }
    processAttrs(element);
    return element;
  }
  function processKey(el) {
    var exp = getBindingAttr(el, "key");
    if (exp) {
      if (true) {
        if (el.tag === "template") {
          warn("<template> cannot be keyed. Place the key on real elements instead.", getRawBindingAttr(el, "key"));
        }
        if (el.for) {
          var iterator = el.iterator2 || el.iterator1;
          var parent_1 = el.parent;
          if (iterator && iterator === exp && parent_1 && parent_1.tag === "transition-group") {
            warn("Do not use v-for index as key on <transition-group> children, this is the same as not using keys.", getRawBindingAttr(el, "key"), true);
          }
        }
      }
      el.key = exp;
    }
  }
  function processRef(el) {
    var ref2 = getBindingAttr(el, "ref");
    if (ref2) {
      el.ref = ref2;
      el.refInFor = checkInFor(el);
    }
  }
  function processFor(el) {
    var exp;
    if (exp = getAndRemoveAttr(el, "v-for")) {
      var res = parseFor(exp);
      if (res) {
        extend(el, res);
      } else if (true) {
        warn("Invalid v-for expression: ".concat(exp), el.rawAttrsMap["v-for"]);
      }
    }
  }
  function parseFor(exp) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch)
      return;
    var res = {};
    res.for = inMatch[2].trim();
    var alias = inMatch[1].trim().replace(stripParensRE, "");
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      res.alias = alias.replace(forIteratorRE, "").trim();
      res.iterator1 = iteratorMatch[1].trim();
      if (iteratorMatch[2]) {
        res.iterator2 = iteratorMatch[2].trim();
      }
    } else {
      res.alias = alias;
    }
    return res;
  }
  function processIf(el) {
    var exp = getAndRemoveAttr(el, "v-if");
    if (exp) {
      el.if = exp;
      addIfCondition(el, {
        exp,
        block: el
      });
    } else {
      if (getAndRemoveAttr(el, "v-else") != null) {
        el.else = true;
      }
      var elseif = getAndRemoveAttr(el, "v-else-if");
      if (elseif) {
        el.elseif = elseif;
      }
    }
  }
  function processIfConditions(el, parent) {
    var prev = findPrevElement(parent.children);
    if (prev && prev.if) {
      addIfCondition(prev, {
        exp: el.elseif,
        block: el
      });
    } else if (true) {
      warn("v-".concat(el.elseif ? 'else-if="' + el.elseif + '"' : "else", " ") + "used on element <".concat(el.tag, "> without corresponding v-if."), el.rawAttrsMap[el.elseif ? "v-else-if" : "v-else"]);
    }
  }
  function findPrevElement(children) {
    var i = children.length;
    while (i--) {
      if (children[i].type === 1) {
        return children[i];
      } else {
        if (children[i].text !== " ") {
          warn('text "'.concat(children[i].text.trim(), '" between v-if and v-else(-if) ') + "will be ignored.", children[i]);
        }
        children.pop();
      }
    }
  }
  function addIfCondition(el, condition) {
    if (!el.ifConditions) {
      el.ifConditions = [];
    }
    el.ifConditions.push(condition);
  }
  function processOnce(el) {
    var once2 = getAndRemoveAttr(el, "v-once");
    if (once2 != null) {
      el.once = true;
    }
  }
  function processSlotContent(el) {
    var slotScope;
    if (el.tag === "template") {
      slotScope = getAndRemoveAttr(el, "scope");
      if (slotScope) {
        warn('the "scope" attribute for scoped slots have been deprecated and replaced by "slot-scope" since 2.5. The new "slot-scope" attribute can also be used on plain elements in addition to <template> to denote scoped slots.', el.rawAttrsMap["scope"], true);
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, "slot-scope");
    } else if (slotScope = getAndRemoveAttr(el, "slot-scope")) {
      if (el.attrsMap["v-for"]) {
        warn("Ambiguous combined usage of slot-scope and v-for on <".concat(el.tag, "> ") + "(v-for takes higher priority). Use a wrapper <template> for the scoped slot to make it clearer.", el.rawAttrsMap["slot-scope"], true);
      }
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, "slot");
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      el.slotTargetDynamic = !!(el.attrsMap[":slot"] || el.attrsMap["v-bind:slot"]);
      if (el.tag !== "template" && !el.slotScope) {
        addAttr(el, "slot", slotTarget, getRawBindingAttr(el, "slot"));
      }
    }
    {
      if (el.tag === "template") {
        var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
        if (slotBinding) {
          if (true) {
            if (el.slotTarget || el.slotScope) {
              warn("Unexpected mixed usage of different slot syntaxes.", el);
            }
            if (el.parent && !maybeComponent(el.parent)) {
              warn("<template v-slot> can only appear at the root level inside the receiving component", el);
            }
          }
          var _a2 = getSlotName(slotBinding), name_2 = _a2.name, dynamic = _a2.dynamic;
          el.slotTarget = name_2;
          el.slotTargetDynamic = dynamic;
          el.slotScope = slotBinding.value || emptySlotScopeToken;
        }
      } else {
        var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
        if (slotBinding) {
          if (true) {
            if (!maybeComponent(el)) {
              warn("v-slot can only be used on components or <template>.", slotBinding);
            }
            if (el.slotScope || el.slotTarget) {
              warn("Unexpected mixed usage of different slot syntaxes.", el);
            }
            if (el.scopedSlots) {
              warn("To avoid scope ambiguity, the default slot should also use <template> syntax when there are other named slots.", slotBinding);
            }
          }
          var slots = el.scopedSlots || (el.scopedSlots = {});
          var _b = getSlotName(slotBinding), name_3 = _b.name, dynamic = _b.dynamic;
          var slotContainer_1 = slots[name_3] = createASTElement("template", [], el);
          slotContainer_1.slotTarget = name_3;
          slotContainer_1.slotTargetDynamic = dynamic;
          slotContainer_1.children = el.children.filter(function(c) {
            if (!c.slotScope) {
              c.parent = slotContainer_1;
              return true;
            }
          });
          slotContainer_1.slotScope = slotBinding.value || emptySlotScopeToken;
          el.children = [];
          el.plain = false;
        }
      }
    }
  }
  function getSlotName(binding) {
    var name = binding.name.replace(slotRE, "");
    if (!name) {
      if (binding.name[0] !== "#") {
        name = "default";
      } else if (true) {
        warn("v-slot shorthand syntax requires a slot name.", binding);
      }
    }
    return dynamicArgRE.test(name) ? { name: name.slice(1, -1), dynamic: true } : { name: '"'.concat(name, '"'), dynamic: false };
  }
  function processSlotOutlet(el) {
    if (el.tag === "slot") {
      el.slotName = getBindingAttr(el, "name");
      if (el.key) {
        warn("`key` does not work on <slot> because slots are abstract outlets and can possibly expand into multiple elements. Use the key on a wrapping element instead.", getRawBindingAttr(el, "key"));
      }
    }
  }
  function processComponent(el) {
    var binding;
    if (binding = getBindingAttr(el, "is")) {
      el.component = binding;
    }
    if (getAndRemoveAttr(el, "inline-template") != null) {
      el.inlineTemplate = true;
    }
  }
  function processAttrs(el) {
    var list = el.attrsList;
    var i, l, name, rawName, value, modifiers, syncGen, isDynamic;
    for (i = 0, l = list.length; i < l; i++) {
      name = rawName = list[i].name;
      value = list[i].value;
      if (dirRE.test(name)) {
        el.hasBindings = true;
        modifiers = parseModifiers(name.replace(dirRE, ""));
        if (modifiers) {
          name = name.replace(modifierRE, "");
        }
        if (bindRE.test(name)) {
          name = name.replace(bindRE, "");
          value = parseFilters(value);
          isDynamic = dynamicArgRE.test(name);
          if (isDynamic) {
            name = name.slice(1, -1);
          }
          if (value.trim().length === 0) {
            warn('The value for a v-bind expression cannot be empty. Found in "v-bind:'.concat(name, '"'));
          }
          if (modifiers) {
            if (modifiers.prop && !isDynamic) {
              name = camelize(name);
              if (name === "innerHtml")
                name = "innerHTML";
            }
            if (modifiers.camel && !isDynamic) {
              name = camelize(name);
            }
            if (modifiers.sync) {
              syncGen = genAssignmentCode(value, "$event");
              if (!isDynamic) {
                addHandler(el, "update:".concat(camelize(name)), syncGen, null, false, warn, list[i]);
                if (hyphenate(name) !== camelize(name)) {
                  addHandler(el, "update:".concat(hyphenate(name)), syncGen, null, false, warn, list[i]);
                }
              } else {
                addHandler(
                  el,
                  '"update:"+('.concat(name, ")"),
                  syncGen,
                  null,
                  false,
                  warn,
                  list[i],
                  true
                );
              }
            }
          }
          if (modifiers && modifiers.prop || !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)) {
            addProp(el, name, value, list[i], isDynamic);
          } else {
            addAttr(el, name, value, list[i], isDynamic);
          }
        } else if (onRE.test(name)) {
          name = name.replace(onRE, "");
          isDynamic = dynamicArgRE.test(name);
          if (isDynamic) {
            name = name.slice(1, -1);
          }
          addHandler(el, name, value, modifiers, false, warn, list[i], isDynamic);
        } else {
          name = name.replace(dirRE, "");
          var argMatch = name.match(argRE);
          var arg = argMatch && argMatch[1];
          isDynamic = false;
          if (arg) {
            name = name.slice(0, -(arg.length + 1));
            if (dynamicArgRE.test(arg)) {
              arg = arg.slice(1, -1);
              isDynamic = true;
            }
          }
          addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);
          if (name === "model") {
            checkForAliasModel(el, value);
          }
        }
      } else {
        if (true) {
          var res = parseText(value, delimiters);
          if (res) {
            warn("".concat(name, '="').concat(value, '": ') + 'Interpolation inside attributes has been removed. Use v-bind or the colon shorthand instead. For example, instead of <div id="{{ val }}">, use <div :id="val">.', list[i]);
          }
        }
        addAttr(el, name, JSON.stringify(value), list[i]);
        if (!el.component && name === "muted" && platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, "true", list[i]);
        }
      }
    }
  }
  function checkInFor(el) {
    var parent = el;
    while (parent) {
      if (parent.for !== void 0) {
        return true;
      }
      parent = parent.parent;
    }
    return false;
  }
  function parseModifiers(name) {
    var match = name.match(modifierRE);
    if (match) {
      var ret_1 = {};
      match.forEach(function(m) {
        ret_1[m.slice(1)] = true;
      });
      return ret_1;
    }
  }
  function makeAttrsMap(attrs2) {
    var map = {};
    for (var i = 0, l = attrs2.length; i < l; i++) {
      if (map[attrs2[i].name] && !isIE && !isEdge) {
        warn("duplicate attribute: " + attrs2[i].name, attrs2[i]);
      }
      map[attrs2[i].name] = attrs2[i].value;
    }
    return map;
  }
  function isTextTag(el) {
    return el.tag === "script" || el.tag === "style";
  }
  function isForbiddenTag(el) {
    return el.tag === "style" || el.tag === "script" && (!el.attrsMap.type || el.attrsMap.type === "text/javascript");
  }
  var ieNSBug = /^xmlns:NS\d+/;
  var ieNSPrefix = /^NS\d+:/;
  function guardIESVGBug(attrs2) {
    var res = [];
    for (var i = 0; i < attrs2.length; i++) {
      var attr = attrs2[i];
      if (!ieNSBug.test(attr.name)) {
        attr.name = attr.name.replace(ieNSPrefix, "");
        res.push(attr);
      }
    }
    return res;
  }
  function checkForAliasModel(el, value) {
    var _el = el;
    while (_el) {
      if (_el.for && _el.alias === value) {
        warn("<".concat(el.tag, ' v-model="').concat(value, '">: ') + "You are binding v-model directly to a v-for iteration alias. This will not be able to modify the v-for source array because writing to the alias is like modifying a function local variable. Consider using an array of objects and use v-model on an object property instead.", el.rawAttrsMap["v-model"]);
      }
      _el = _el.parent;
    }
  }
  function preTransformNode(el, options) {
    if (el.tag === "input") {
      var map = el.attrsMap;
      if (!map["v-model"]) {
        return;
      }
      var typeBinding = void 0;
      if (map[":type"] || map["v-bind:type"]) {
        typeBinding = getBindingAttr(el, "type");
      }
      if (!map.type && !typeBinding && map["v-bind"]) {
        typeBinding = "(".concat(map["v-bind"], ").type");
      }
      if (typeBinding) {
        var ifCondition = getAndRemoveAttr(el, "v-if", true);
        var ifConditionExtra = ifCondition ? "&&(".concat(ifCondition, ")") : "";
        var hasElse = getAndRemoveAttr(el, "v-else", true) != null;
        var elseIfCondition = getAndRemoveAttr(el, "v-else-if", true);
        var branch0 = cloneASTElement(el);
        processFor(branch0);
        addRawAttr(branch0, "type", "checkbox");
        processElement(branch0, options);
        branch0.processed = true;
        branch0.if = "(".concat(typeBinding, ")==='checkbox'") + ifConditionExtra;
        addIfCondition(branch0, {
          exp: branch0.if,
          block: branch0
        });
        var branch1 = cloneASTElement(el);
        getAndRemoveAttr(branch1, "v-for", true);
        addRawAttr(branch1, "type", "radio");
        processElement(branch1, options);
        addIfCondition(branch0, {
          exp: "(".concat(typeBinding, ")==='radio'") + ifConditionExtra,
          block: branch1
        });
        var branch2 = cloneASTElement(el);
        getAndRemoveAttr(branch2, "v-for", true);
        addRawAttr(branch2, ":type", typeBinding);
        processElement(branch2, options);
        addIfCondition(branch0, {
          exp: ifCondition,
          block: branch2
        });
        if (hasElse) {
          branch0.else = true;
        } else if (elseIfCondition) {
          branch0.elseif = elseIfCondition;
        }
        return branch0;
      }
    }
  }
  function cloneASTElement(el) {
    return createASTElement(el.tag, el.attrsList.slice(), el.parent);
  }
  var model = {
    preTransformNode
  };
  var modules = [klass, style, model];
  function text(el, dir) {
    if (dir.value) {
      addProp(el, "textContent", "_s(".concat(dir.value, ")"), dir);
    }
  }
  function html(el, dir) {
    if (dir.value) {
      addProp(el, "innerHTML", "_s(".concat(dir.value, ")"), dir);
    }
  }
  var directives = {
    model: model$1,
    text,
    html
  };
  var baseOptions = {
    expectHTML: true,
    modules,
    directives,
    isPreTag,
    isUnaryTag,
    mustUseProp,
    canBeLeftOpenTag,
    isReservedTag,
    getTagNamespace,
    staticKeys: genStaticKeys$1(modules)
  };
  var isStaticKey;
  var isPlatformReservedTag;
  var genStaticKeysCached = cached(genStaticKeys);
  function optimize(root, options) {
    if (!root)
      return;
    isStaticKey = genStaticKeysCached(options.staticKeys || "");
    isPlatformReservedTag = options.isReservedTag || no;
    markStatic(root);
    markStaticRoots(root, false);
  }
  function genStaticKeys(keys) {
    return makeMap("type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap" + (keys ? "," + keys : ""));
  }
  function markStatic(node) {
    node.static = isStatic(node);
    if (node.type === 1) {
      if (!isPlatformReservedTag(node.tag) && node.tag !== "slot" && node.attrsMap["inline-template"] == null) {
        return;
      }
      for (var i = 0, l = node.children.length; i < l; i++) {
        var child = node.children[i];
        markStatic(child);
        if (!child.static) {
          node.static = false;
        }
      }
      if (node.ifConditions) {
        for (var i = 1, l = node.ifConditions.length; i < l; i++) {
          var block = node.ifConditions[i].block;
          markStatic(block);
          if (!block.static) {
            node.static = false;
          }
        }
      }
    }
  }
  function markStaticRoots(node, isInFor) {
    if (node.type === 1) {
      if (node.static || node.once) {
        node.staticInFor = isInFor;
      }
      if (node.static && node.children.length && !(node.children.length === 1 && node.children[0].type === 3)) {
        node.staticRoot = true;
        return;
      } else {
        node.staticRoot = false;
      }
      if (node.children) {
        for (var i = 0, l = node.children.length; i < l; i++) {
          markStaticRoots(node.children[i], isInFor || !!node.for);
        }
      }
      if (node.ifConditions) {
        for (var i = 1, l = node.ifConditions.length; i < l; i++) {
          markStaticRoots(node.ifConditions[i].block, isInFor);
        }
      }
    }
  }
  function isStatic(node) {
    if (node.type === 2) {
      return false;
    }
    if (node.type === 3) {
      return true;
    }
    return !!(node.pre || !node.hasBindings && !node.if && !node.for && !isBuiltInTag(node.tag) && isPlatformReservedTag(node.tag) && !isDirectChildOfTemplateFor(node) && Object.keys(node).every(isStaticKey));
  }
  function isDirectChildOfTemplateFor(node) {
    while (node.parent) {
      node = node.parent;
      if (node.tag !== "template") {
        return false;
      }
      if (node.for) {
        return true;
      }
    }
    return false;
  }
  var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;
  var fnInvokeRE = /\([^)]*?\);*$/;
  var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;
  var keyCodes = {
    esc: 27,
    tab: 9,
    enter: 13,
    space: 32,
    up: 38,
    left: 37,
    right: 39,
    down: 40,
    delete: [8, 46]
  };
  var keyNames = {
    esc: ["Esc", "Escape"],
    tab: "Tab",
    enter: "Enter",
    space: [" ", "Spacebar"],
    up: ["Up", "ArrowUp"],
    left: ["Left", "ArrowLeft"],
    right: ["Right", "ArrowRight"],
    down: ["Down", "ArrowDown"],
    delete: ["Backspace", "Delete", "Del"]
  };
  var genGuard = function(condition) {
    return "if(".concat(condition, ")return null;");
  };
  var modifierCode = {
    stop: "$event.stopPropagation();",
    prevent: "$event.preventDefault();",
    self: genGuard("$event.target !== $event.currentTarget"),
    ctrl: genGuard("!$event.ctrlKey"),
    shift: genGuard("!$event.shiftKey"),
    alt: genGuard("!$event.altKey"),
    meta: genGuard("!$event.metaKey"),
    left: genGuard("'button' in $event && $event.button !== 0"),
    middle: genGuard("'button' in $event && $event.button !== 1"),
    right: genGuard("'button' in $event && $event.button !== 2")
  };
  function genHandlers(events2, isNative2) {
    var prefix = isNative2 ? "nativeOn:" : "on:";
    var staticHandlers = "";
    var dynamicHandlers = "";
    for (var name_1 in events2) {
      var handlerCode = genHandler(events2[name_1]);
      if (events2[name_1] && events2[name_1].dynamic) {
        dynamicHandlers += "".concat(name_1, ",").concat(handlerCode, ",");
      } else {
        staticHandlers += '"'.concat(name_1, '":').concat(handlerCode, ",");
      }
    }
    staticHandlers = "{".concat(staticHandlers.slice(0, -1), "}");
    if (dynamicHandlers) {
      return prefix + "_d(".concat(staticHandlers, ",[").concat(dynamicHandlers.slice(0, -1), "])");
    } else {
      return prefix + staticHandlers;
    }
  }
  function genHandler(handler) {
    if (!handler) {
      return "function(){}";
    }
    if (Array.isArray(handler)) {
      return "[".concat(handler.map(function(handler2) {
        return genHandler(handler2);
      }).join(","), "]");
    }
    var isMethodPath = simplePathRE.test(handler.value);
    var isFunctionExpression = fnExpRE.test(handler.value);
    var isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ""));
    if (!handler.modifiers) {
      if (isMethodPath || isFunctionExpression) {
        return handler.value;
      }
      return "function($event){".concat(isFunctionInvocation ? "return ".concat(handler.value) : handler.value, "}");
    } else {
      var code = "";
      var genModifierCode = "";
      var keys = [];
      var _loop_1 = function(key2) {
        if (modifierCode[key2]) {
          genModifierCode += modifierCode[key2];
          if (keyCodes[key2]) {
            keys.push(key2);
          }
        } else if (key2 === "exact") {
          var modifiers_1 = handler.modifiers;
          genModifierCode += genGuard(["ctrl", "shift", "alt", "meta"].filter(function(keyModifier) {
            return !modifiers_1[keyModifier];
          }).map(function(keyModifier) {
            return "$event.".concat(keyModifier, "Key");
          }).join("||"));
        } else {
          keys.push(key2);
        }
      };
      for (var key in handler.modifiers) {
        _loop_1(key);
      }
      if (keys.length) {
        code += genKeyFilter(keys);
      }
      if (genModifierCode) {
        code += genModifierCode;
      }
      var handlerCode = isMethodPath ? "return ".concat(handler.value, ".apply(null, arguments)") : isFunctionExpression ? "return (".concat(handler.value, ").apply(null, arguments)") : isFunctionInvocation ? "return ".concat(handler.value) : handler.value;
      return "function($event){".concat(code).concat(handlerCode, "}");
    }
  }
  function genKeyFilter(keys) {
    return "if(!$event.type.indexOf('key')&&" + "".concat(keys.map(genFilterCode).join("&&"), ")return null;");
  }
  function genFilterCode(key) {
    var keyVal = parseInt(key, 10);
    if (keyVal) {
      return "$event.keyCode!==".concat(keyVal);
    }
    var keyCode = keyCodes[key];
    var keyName = keyNames[key];
    return "_k($event.keyCode," + "".concat(JSON.stringify(key), ",") + "".concat(JSON.stringify(keyCode), ",") + "$event.key," + "".concat(JSON.stringify(keyName)) + ")";
  }
  function on(el, dir) {
    if (dir.modifiers) {
      warn$2("v-on without argument does not support modifiers.");
    }
    el.wrapListeners = function(code) {
      return "_g(".concat(code, ",").concat(dir.value, ")");
    };
  }
  function bind(el, dir) {
    el.wrapData = function(code) {
      return "_b(".concat(code, ",'").concat(el.tag, "',").concat(dir.value, ",").concat(dir.modifiers && dir.modifiers.prop ? "true" : "false").concat(dir.modifiers && dir.modifiers.sync ? ",true" : "", ")");
    };
  }
  var baseDirectives = {
    on,
    bind,
    cloak: noop
  };
  var CodegenState = function() {
    function CodegenState2(options) {
      this.options = options;
      this.warn = options.warn || baseWarn;
      this.transforms = pluckModuleFunction(options.modules, "transformCode");
      this.dataGenFns = pluckModuleFunction(options.modules, "genData");
      this.directives = extend(extend({}, baseDirectives), options.directives);
      var isReservedTag2 = options.isReservedTag || no;
      this.maybeComponent = function(el) {
        return !!el.component || !isReservedTag2(el.tag);
      };
      this.onceId = 0;
      this.staticRenderFns = [];
      this.pre = false;
    }
    return CodegenState2;
  }();
  function generate(ast, options) {
    var state = new CodegenState(options);
    var code = ast ? ast.tag === "script" ? "null" : genElement(ast, state) : '_c("div")';
    return {
      render: "with(this){return ".concat(code, "}"),
      staticRenderFns: state.staticRenderFns
    };
  }
  function genElement(el, state) {
    if (el.parent) {
      el.pre = el.pre || el.parent.pre;
    }
    if (el.staticRoot && !el.staticProcessed) {
      return genStatic(el, state);
    } else if (el.once && !el.onceProcessed) {
      return genOnce(el, state);
    } else if (el.for && !el.forProcessed) {
      return genFor(el, state);
    } else if (el.if && !el.ifProcessed) {
      return genIf(el, state);
    } else if (el.tag === "template" && !el.slotTarget && !state.pre) {
      return genChildren(el, state) || "void 0";
    } else if (el.tag === "slot") {
      return genSlot(el, state);
    } else {
      var code = void 0;
      if (el.component) {
        code = genComponent(el.component, el, state);
      } else {
        var data = void 0;
        var maybeComponent2 = state.maybeComponent(el);
        if (!el.plain || el.pre && maybeComponent2) {
          data = genData(el, state);
        }
        var tag = void 0;
        var bindings = state.options.bindings;
        if (maybeComponent2 && bindings && bindings.__isScriptSetup !== false) {
          tag = checkBindingType(bindings, el.tag);
        }
        if (!tag)
          tag = "'".concat(el.tag, "'");
        var children = el.inlineTemplate ? null : genChildren(el, state, true);
        code = "_c(".concat(tag).concat(
          data ? ",".concat(data) : ""
        ).concat(
          children ? ",".concat(children) : "",
          ")"
        );
      }
      for (var i = 0; i < state.transforms.length; i++) {
        code = state.transforms[i](el, code);
      }
      return code;
    }
  }
  function checkBindingType(bindings, key) {
    var camelName = camelize(key);
    var PascalName = capitalize(camelName);
    var checkType = function(type) {
      if (bindings[key] === type) {
        return key;
      }
      if (bindings[camelName] === type) {
        return camelName;
      }
      if (bindings[PascalName] === type) {
        return PascalName;
      }
    };
    var fromConst = checkType("setup-const") || checkType("setup-reactive-const");
    if (fromConst) {
      return fromConst;
    }
    var fromMaybeRef = checkType("setup-let") || checkType("setup-ref") || checkType("setup-maybe-ref");
    if (fromMaybeRef) {
      return fromMaybeRef;
    }
  }
  function genStatic(el, state) {
    el.staticProcessed = true;
    var originalPreState = state.pre;
    if (el.pre) {
      state.pre = el.pre;
    }
    state.staticRenderFns.push("with(this){return ".concat(genElement(el, state), "}"));
    state.pre = originalPreState;
    return "_m(".concat(state.staticRenderFns.length - 1).concat(el.staticInFor ? ",true" : "", ")");
  }
  function genOnce(el, state) {
    el.onceProcessed = true;
    if (el.if && !el.ifProcessed) {
      return genIf(el, state);
    } else if (el.staticInFor) {
      var key = "";
      var parent_1 = el.parent;
      while (parent_1) {
        if (parent_1.for) {
          key = parent_1.key;
          break;
        }
        parent_1 = parent_1.parent;
      }
      if (!key) {
        state.warn("v-once can only be used inside v-for that is keyed. ", el.rawAttrsMap["v-once"]);
        return genElement(el, state);
      }
      return "_o(".concat(genElement(el, state), ",").concat(state.onceId++, ",").concat(key, ")");
    } else {
      return genStatic(el, state);
    }
  }
  function genIf(el, state, altGen, altEmpty) {
    el.ifProcessed = true;
    return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty);
  }
  function genIfConditions(conditions, state, altGen, altEmpty) {
    if (!conditions.length) {
      return altEmpty || "_e()";
    }
    var condition = conditions.shift();
    if (condition.exp) {
      return "(".concat(condition.exp, ")?").concat(genTernaryExp(condition.block), ":").concat(genIfConditions(conditions, state, altGen, altEmpty));
    } else {
      return "".concat(genTernaryExp(condition.block));
    }
    function genTernaryExp(el) {
      return altGen ? altGen(el, state) : el.once ? genOnce(el, state) : genElement(el, state);
    }
  }
  function genFor(el, state, altGen, altHelper) {
    var exp = el.for;
    var alias = el.alias;
    var iterator1 = el.iterator1 ? ",".concat(el.iterator1) : "";
    var iterator2 = el.iterator2 ? ",".concat(el.iterator2) : "";
    if (state.maybeComponent(el) && el.tag !== "slot" && el.tag !== "template" && !el.key) {
      state.warn("<".concat(el.tag, ' v-for="').concat(alias, " in ").concat(exp, '">: component lists rendered with ') + "v-for should have explicit keys. See https://vuejs.org/guide/list.html#key for more info.", el.rawAttrsMap["v-for"], true);
    }
    el.forProcessed = true;
    return "".concat(altHelper || "_l", "((").concat(exp, "),") + "function(".concat(alias).concat(iterator1).concat(iterator2, "){") + "return ".concat((altGen || genElement)(el, state)) + "})";
  }
  function genData(el, state) {
    var data = "{";
    var dirs = genDirectives(el, state);
    if (dirs)
      data += dirs + ",";
    if (el.key) {
      data += "key:".concat(el.key, ",");
    }
    if (el.ref) {
      data += "ref:".concat(el.ref, ",");
    }
    if (el.refInFor) {
      data += "refInFor:true,";
    }
    if (el.pre) {
      data += "pre:true,";
    }
    if (el.component) {
      data += 'tag:"'.concat(el.tag, '",');
    }
    for (var i = 0; i < state.dataGenFns.length; i++) {
      data += state.dataGenFns[i](el);
    }
    if (el.attrs) {
      data += "attrs:".concat(genProps(el.attrs), ",");
    }
    if (el.props) {
      data += "domProps:".concat(genProps(el.props), ",");
    }
    if (el.events) {
      data += "".concat(genHandlers(el.events, false), ",");
    }
    if (el.nativeEvents) {
      data += "".concat(genHandlers(el.nativeEvents, true), ",");
    }
    if (el.slotTarget && !el.slotScope) {
      data += "slot:".concat(el.slotTarget, ",");
    }
    if (el.scopedSlots) {
      data += "".concat(genScopedSlots(el, el.scopedSlots, state), ",");
    }
    if (el.model) {
      data += "model:{value:".concat(el.model.value, ",callback:").concat(el.model.callback, ",expression:").concat(el.model.expression, "},");
    }
    if (el.inlineTemplate) {
      var inlineTemplate = genInlineTemplate(el, state);
      if (inlineTemplate) {
        data += "".concat(inlineTemplate, ",");
      }
    }
    data = data.replace(/,$/, "") + "}";
    if (el.dynamicAttrs) {
      data = "_b(".concat(data, ',"').concat(el.tag, '",').concat(genProps(el.dynamicAttrs), ")");
    }
    if (el.wrapData) {
      data = el.wrapData(data);
    }
    if (el.wrapListeners) {
      data = el.wrapListeners(data);
    }
    return data;
  }
  function genDirectives(el, state) {
    var dirs = el.directives;
    if (!dirs)
      return;
    var res = "directives:[";
    var hasRuntime = false;
    var i, l, dir, needRuntime;
    for (i = 0, l = dirs.length; i < l; i++) {
      dir = dirs[i];
      needRuntime = true;
      var gen = state.directives[dir.name];
      if (gen) {
        needRuntime = !!gen(el, dir, state.warn);
      }
      if (needRuntime) {
        hasRuntime = true;
        res += '{name:"'.concat(dir.name, '",rawName:"').concat(dir.rawName, '"').concat(dir.value ? ",value:(".concat(dir.value, "),expression:").concat(JSON.stringify(dir.value)) : "").concat(dir.arg ? ",arg:".concat(dir.isDynamicArg ? dir.arg : '"'.concat(dir.arg, '"')) : "").concat(dir.modifiers ? ",modifiers:".concat(JSON.stringify(dir.modifiers)) : "", "},");
      }
    }
    if (hasRuntime) {
      return res.slice(0, -1) + "]";
    }
  }
  function genInlineTemplate(el, state) {
    var ast = el.children[0];
    if (el.children.length !== 1 || ast.type !== 1) {
      state.warn("Inline-template components must have exactly one child element.", { start: el.start });
    }
    if (ast && ast.type === 1) {
      var inlineRenderFns = generate(ast, state.options);
      return "inlineTemplate:{render:function(){".concat(inlineRenderFns.render, "},staticRenderFns:[").concat(inlineRenderFns.staticRenderFns.map(function(code) {
        return "function(){".concat(code, "}");
      }).join(","), "]}");
    }
  }
  function genScopedSlots(el, slots, state) {
    var needsForceUpdate = el.for || Object.keys(slots).some(function(key) {
      var slot = slots[key];
      return slot.slotTargetDynamic || slot.if || slot.for || containsSlotChild(slot);
    });
    var needsKey = !!el.if;
    if (!needsForceUpdate) {
      var parent_2 = el.parent;
      while (parent_2) {
        if (parent_2.slotScope && parent_2.slotScope !== emptySlotScopeToken || parent_2.for) {
          needsForceUpdate = true;
          break;
        }
        if (parent_2.if) {
          needsKey = true;
        }
        parent_2 = parent_2.parent;
      }
    }
    var generatedSlots = Object.keys(slots).map(function(key) {
      return genScopedSlot(slots[key], state);
    }).join(",");
    return "scopedSlots:_u([".concat(generatedSlots, "]").concat(needsForceUpdate ? ",null,true" : "").concat(!needsForceUpdate && needsKey ? ",null,false,".concat(hash(generatedSlots)) : "", ")");
  }
  function hash(str2) {
    var hash2 = 5381;
    var i = str2.length;
    while (i) {
      hash2 = hash2 * 33 ^ str2.charCodeAt(--i);
    }
    return hash2 >>> 0;
  }
  function containsSlotChild(el) {
    if (el.type === 1) {
      if (el.tag === "slot") {
        return true;
      }
      return el.children.some(containsSlotChild);
    }
    return false;
  }
  function genScopedSlot(el, state) {
    var isLegacySyntax = el.attrsMap["slot-scope"];
    if (el.if && !el.ifProcessed && !isLegacySyntax) {
      return genIf(el, state, genScopedSlot, "null");
    }
    if (el.for && !el.forProcessed) {
      return genFor(el, state, genScopedSlot);
    }
    var slotScope = el.slotScope === emptySlotScopeToken ? "" : String(el.slotScope);
    var fn = "function(".concat(slotScope, "){") + "return ".concat(el.tag === "template" ? el.if && isLegacySyntax ? "(".concat(el.if, ")?").concat(genChildren(el, state) || "undefined", ":undefined") : genChildren(el, state) || "undefined" : genElement(el, state), "}");
    var reverseProxy = slotScope ? "" : ",proxy:true";
    return "{key:".concat(el.slotTarget || '"default"', ",fn:").concat(fn).concat(reverseProxy, "}");
  }
  function genChildren(el, state, checkSkip, altGenElement, altGenNode) {
    var children = el.children;
    if (children.length) {
      var el_1 = children[0];
      if (children.length === 1 && el_1.for && el_1.tag !== "template" && el_1.tag !== "slot") {
        var normalizationType_1 = checkSkip ? state.maybeComponent(el_1) ? ",1" : ",0" : "";
        return "".concat((altGenElement || genElement)(el_1, state)).concat(normalizationType_1);
      }
      var normalizationType = checkSkip ? getNormalizationType(children, state.maybeComponent) : 0;
      var gen_1 = altGenNode || genNode;
      return "[".concat(children.map(function(c) {
        return gen_1(c, state);
      }).join(","), "]").concat(normalizationType ? ",".concat(normalizationType) : "");
    }
  }
  function getNormalizationType(children, maybeComponent2) {
    var res = 0;
    for (var i = 0; i < children.length; i++) {
      var el = children[i];
      if (el.type !== 1) {
        continue;
      }
      if (needsNormalization(el) || el.ifConditions && el.ifConditions.some(function(c) {
        return needsNormalization(c.block);
      })) {
        res = 2;
        break;
      }
      if (maybeComponent2(el) || el.ifConditions && el.ifConditions.some(function(c) {
        return maybeComponent2(c.block);
      })) {
        res = 1;
      }
    }
    return res;
  }
  function needsNormalization(el) {
    return el.for !== void 0 || el.tag === "template" || el.tag === "slot";
  }
  function genNode(node, state) {
    if (node.type === 1) {
      return genElement(node, state);
    } else if (node.type === 3 && node.isComment) {
      return genComment(node);
    } else {
      return genText(node);
    }
  }
  function genText(text2) {
    return "_v(".concat(text2.type === 2 ? text2.expression : transformSpecialNewlines(JSON.stringify(text2.text)), ")");
  }
  function genComment(comment2) {
    return "_e(".concat(JSON.stringify(comment2.text), ")");
  }
  function genSlot(el, state) {
    var slotName = el.slotName || '"default"';
    var children = genChildren(el, state);
    var res = "_t(".concat(slotName).concat(children ? ",function(){return ".concat(children, "}") : "");
    var attrs2 = el.attrs || el.dynamicAttrs ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(function(attr) {
      return {
        name: camelize(attr.name),
        value: attr.value,
        dynamic: attr.dynamic
      };
    })) : null;
    var bind2 = el.attrsMap["v-bind"];
    if ((attrs2 || bind2) && !children) {
      res += ",null";
    }
    if (attrs2) {
      res += ",".concat(attrs2);
    }
    if (bind2) {
      res += "".concat(attrs2 ? "" : ",null", ",").concat(bind2);
    }
    return res + ")";
  }
  function genComponent(componentName, el, state) {
    var children = el.inlineTemplate ? null : genChildren(el, state, true);
    return "_c(".concat(componentName, ",").concat(genData(el, state)).concat(children ? ",".concat(children) : "", ")");
  }
  function genProps(props2) {
    var staticProps = "";
    var dynamicProps = "";
    for (var i = 0; i < props2.length; i++) {
      var prop = props2[i];
      var value = transformSpecialNewlines(prop.value);
      if (prop.dynamic) {
        dynamicProps += "".concat(prop.name, ",").concat(value, ",");
      } else {
        staticProps += '"'.concat(prop.name, '":').concat(value, ",");
      }
    }
    staticProps = "{".concat(staticProps.slice(0, -1), "}");
    if (dynamicProps) {
      return "_d(".concat(staticProps, ",[").concat(dynamicProps.slice(0, -1), "])");
    } else {
      return staticProps;
    }
  }
  function transformSpecialNewlines(text2) {
    return text2.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  var prohibitedKeywordRE = new RegExp("\\b" + "do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b") + "\\b");
  var unaryOperatorsRE = new RegExp("\\b" + "delete,typeof,void".split(",").join("\\s*\\([^\\)]*\\)|\\b") + "\\s*\\([^\\)]*\\)");
  var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;
  function detectErrors(ast, warn2) {
    if (ast) {
      checkNode(ast, warn2);
    }
  }
  function checkNode(node, warn2) {
    if (node.type === 1) {
      for (var name_1 in node.attrsMap) {
        if (dirRE.test(name_1)) {
          var value = node.attrsMap[name_1];
          if (value) {
            var range2 = node.rawAttrsMap[name_1];
            if (name_1 === "v-for") {
              checkFor(node, 'v-for="'.concat(value, '"'), warn2, range2);
            } else if (name_1 === "v-slot" || name_1[0] === "#") {
              checkFunctionParameterExpression(value, "".concat(name_1, '="').concat(value, '"'), warn2, range2);
            } else if (onRE.test(name_1)) {
              checkEvent(value, "".concat(name_1, '="').concat(value, '"'), warn2, range2);
            } else {
              checkExpression(value, "".concat(name_1, '="').concat(value, '"'), warn2, range2);
            }
          }
        }
      }
      if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
          checkNode(node.children[i], warn2);
        }
      }
    } else if (node.type === 2) {
      checkExpression(node.expression, node.text, warn2, node);
    }
  }
  function checkEvent(exp, text2, warn2, range2) {
    var stripped = exp.replace(stripStringRE, "");
    var keywordMatch = stripped.match(unaryOperatorsRE);
    if (keywordMatch && stripped.charAt(keywordMatch.index - 1) !== "$") {
      warn2("avoid using JavaScript unary operator as property name: " + '"'.concat(keywordMatch[0], '" in expression ').concat(text2.trim()), range2);
    }
    checkExpression(exp, text2, warn2, range2);
  }
  function checkFor(node, text2, warn2, range2) {
    checkExpression(node.for || "", text2, warn2, range2);
    checkIdentifier(node.alias, "v-for alias", text2, warn2, range2);
    checkIdentifier(node.iterator1, "v-for iterator", text2, warn2, range2);
    checkIdentifier(node.iterator2, "v-for iterator", text2, warn2, range2);
  }
  function checkIdentifier(ident, type, text2, warn2, range2) {
    if (typeof ident === "string") {
      try {
        new Function("var ".concat(ident, "=_"));
      } catch (e) {
        warn2("invalid ".concat(type, ' "').concat(ident, '" in expression: ').concat(text2.trim()), range2);
      }
    }
  }
  function checkExpression(exp, text2, warn2, range2) {
    try {
      new Function("return ".concat(exp));
    } catch (e) {
      var keywordMatch = exp.replace(stripStringRE, "").match(prohibitedKeywordRE);
      if (keywordMatch) {
        warn2("avoid using JavaScript keyword as property name: " + '"'.concat(keywordMatch[0], '"\n  Raw expression: ').concat(text2.trim()), range2);
      } else {
        warn2("invalid expression: ".concat(e.message, " in\n\n") + "    ".concat(exp, "\n\n") + "  Raw expression: ".concat(text2.trim(), "\n"), range2);
      }
    }
  }
  function checkFunctionParameterExpression(exp, text2, warn2, range2) {
    try {
      new Function(exp, "");
    } catch (e) {
      warn2("invalid function parameter expression: ".concat(e.message, " in\n\n") + "    ".concat(exp, "\n\n") + "  Raw expression: ".concat(text2.trim(), "\n"), range2);
    }
  }
  var range = 2;
  function generateCodeFrame(source, start, end) {
    if (start === void 0) {
      start = 0;
    }
    if (end === void 0) {
      end = source.length;
    }
    var lines = source.split(/\r?\n/);
    var count = 0;
    var res = [];
    for (var i = 0; i < lines.length; i++) {
      count += lines[i].length + 1;
      if (count >= start) {
        for (var j = i - range; j <= i + range || end > count; j++) {
          if (j < 0 || j >= lines.length)
            continue;
          res.push("".concat(j + 1).concat(repeat(" ", 3 - String(j + 1).length), "|  ").concat(lines[j]));
          var lineLength = lines[j].length;
          if (j === i) {
            var pad = start - (count - lineLength) + 1;
            var length_1 = end > count ? lineLength - pad : end - start;
            res.push("   |  " + repeat(" ", pad) + repeat("^", length_1));
          } else if (j > i) {
            if (end > count) {
              var length_2 = Math.min(end - count, lineLength);
              res.push("   |  " + repeat("^", length_2));
            }
            count += lineLength + 1;
          }
        }
        break;
      }
    }
    return res.join("\n");
  }
  function repeat(str2, n) {
    var result = "";
    if (n > 0) {
      while (true) {
        if (n & 1)
          result += str2;
        n >>>= 1;
        if (n <= 0)
          break;
        str2 += str2;
      }
    }
    return result;
  }
  function createFunction(code, errors) {
    try {
      return new Function(code);
    } catch (err) {
      errors.push({ err, code });
      return noop;
    }
  }
  function createCompileToFunctionFn(compile) {
    var cache = /* @__PURE__ */ Object.create(null);
    return function compileToFunctions2(template, options, vm) {
      options = extend({}, options);
      var warn2 = options.warn || warn$2;
      delete options.warn;
      if (true) {
        try {
          new Function("return 1");
        } catch (e) {
          if (e.toString().match(/unsafe-eval|CSP/)) {
            warn2("It seems you are using the standalone build of Vue.js in an environment with Content Security Policy that prohibits unsafe-eval. The template compiler cannot work in this environment. Consider relaxing the policy to allow unsafe-eval or pre-compiling your templates into render functions.");
          }
        }
      }
      var key = options.delimiters ? String(options.delimiters) + template : template;
      if (cache[key]) {
        return cache[key];
      }
      var compiled = compile(template, options);
      if (true) {
        if (compiled.errors && compiled.errors.length) {
          if (options.outputSourceRange) {
            compiled.errors.forEach(function(e) {
              warn2("Error compiling template:\n\n".concat(e.msg, "\n\n") + generateCodeFrame(template, e.start, e.end), vm);
            });
          } else {
            warn2("Error compiling template:\n\n".concat(template, "\n\n") + compiled.errors.map(function(e) {
              return "- ".concat(e);
            }).join("\n") + "\n", vm);
          }
        }
        if (compiled.tips && compiled.tips.length) {
          if (options.outputSourceRange) {
            compiled.tips.forEach(function(e) {
              return tip(e.msg, vm);
            });
          } else {
            compiled.tips.forEach(function(msg) {
              return tip(msg, vm);
            });
          }
        }
      }
      var res = {};
      var fnGenErrors = [];
      res.render = createFunction(compiled.render, fnGenErrors);
      res.staticRenderFns = compiled.staticRenderFns.map(function(code) {
        return createFunction(code, fnGenErrors);
      });
      if (true) {
        if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
          warn2("Failed to generate render function:\n\n" + fnGenErrors.map(function(_a2) {
            var err = _a2.err, code = _a2.code;
            return "".concat(err.toString(), " in\n\n").concat(code, "\n");
          }).join("\n"), vm);
        }
      }
      return cache[key] = res;
    };
  }
  function createCompilerCreator(baseCompile2) {
    return function createCompiler2(baseOptions2) {
      function compile(template, options) {
        var finalOptions = Object.create(baseOptions2);
        var errors = [];
        var tips = [];
        var warn2 = function(msg, range2, tip2) {
          (tip2 ? tips : errors).push(msg);
        };
        if (options) {
          if (options.outputSourceRange) {
            var leadingSpaceLength_1 = template.match(/^\s*/)[0].length;
            warn2 = function(msg, range2, tip2) {
              var data = typeof msg === "string" ? { msg } : msg;
              if (range2) {
                if (range2.start != null) {
                  data.start = range2.start + leadingSpaceLength_1;
                }
                if (range2.end != null) {
                  data.end = range2.end + leadingSpaceLength_1;
                }
              }
              (tip2 ? tips : errors).push(data);
            };
          }
          if (options.modules) {
            finalOptions.modules = (baseOptions2.modules || []).concat(options.modules);
          }
          if (options.directives) {
            finalOptions.directives = extend(Object.create(baseOptions2.directives || null), options.directives);
          }
          for (var key in options) {
            if (key !== "modules" && key !== "directives") {
              finalOptions[key] = options[key];
            }
          }
        }
        finalOptions.warn = warn2;
        var compiled = baseCompile2(template.trim(), finalOptions);
        if (true) {
          detectErrors(compiled.ast, warn2);
        }
        compiled.errors = errors;
        compiled.tips = tips;
        return compiled;
      }
      return {
        compile,
        compileToFunctions: createCompileToFunctionFn(compile)
      };
    };
  }
  var createCompiler = createCompilerCreator(function baseCompile(template, options) {
    var ast = parse(template.trim(), options);
    if (options.optimize !== false) {
      optimize(ast, options);
    }
    var code = generate(ast, options);
    return {
      ast,
      render: code.render,
      staticRenderFns: code.staticRenderFns
    };
  });
  var _a = createCompiler(baseOptions);
  var compileToFunctions = _a.compileToFunctions;
  var div;
  function getShouldDecode(href) {
    div = div || document.createElement("div");
    div.innerHTML = href ? '<a href="\n"/>' : '<div a="\n"/>';
    return div.innerHTML.indexOf("&#10;") > 0;
  }
  var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
  var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;
  var idToTemplate = cached(function(id) {
    var el = query(id);
    return el && el.innerHTML;
  });
  var mount = Vue.prototype.$mount;
  Vue.prototype.$mount = function(el, hydrating) {
    el = el && query(el);
    if (el === document.body || el === document.documentElement) {
      warn$2("Do not mount Vue to <html> or <body> - mount to normal elements instead.");
      return this;
    }
    var options = this.$options;
    if (!options.render) {
      var template = options.template;
      if (template) {
        if (typeof template === "string") {
          if (template.charAt(0) === "#") {
            template = idToTemplate(template);
            if (!template) {
              warn$2("Template element not found or is empty: ".concat(options.template), this);
            }
          }
        } else if (template.nodeType) {
          template = template.innerHTML;
        } else {
          if (true) {
            warn$2("invalid template option:" + template, this);
          }
          return this;
        }
      } else if (el) {
        template = getOuterHTML(el);
      }
      if (template) {
        if (config.performance && mark) {
          mark("compile");
        }
        var _a2 = compileToFunctions(template, {
          outputSourceRange: true,
          shouldDecodeNewlines,
          shouldDecodeNewlinesForHref,
          delimiters: options.delimiters,
          comments: options.comments
        }, this), render = _a2.render, staticRenderFns = _a2.staticRenderFns;
        options.render = render;
        options.staticRenderFns = staticRenderFns;
        if (config.performance && mark) {
          mark("compile end");
          measure("vue ".concat(this._name, " compile"), "compile", "compile end");
        }
      }
    }
    return mount.call(this, el, hydrating);
  };
  function getOuterHTML(el) {
    if (el.outerHTML) {
      return el.outerHTML;
    } else {
      var container = document.createElement("div");
      container.appendChild(el.cloneNode(true));
      return container.innerHTML;
    }
  }
  Vue.compile = compileToFunctions;

  // static/js/modules/fetch.js
  async function fetchJson(path, method = "GET", body = null) {
    let options = {
      method,
      headers: {
        "Content-Type": "application/json"
      }
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    return fetch(path, options);
  }

  // static/js/pages/admin/stats.js
  var Chart = require_chart();
  var USERS_COLOR = "#347aeb";
  var SPRINTS_COLOR = "#9E58EE";
  var SPRINTS_SUBCOLOR = "#ffdb99";
  var LOBBIES_COLOR = "#e13e2e";
  var LOBBIES_SUBCOLOR = "#D7AD38";
  function update_totals(totals) {
    app.totals.users = totals["users_total"];
    app.totals.google_users = totals["goog_total"];
    app.totals.runs = totals["sprints_total"];
    app.totals.marathon_runs = totals["marathons_total"];
    app.totals.finished_runs = totals["sprints_finished"];
    app.totals.finished_marathons = totals["marathons_finished"];
    app.totals.lobby_runs = totals["lobby_runs_total"];
    app.totals.finished_lobby_runs = totals["lobby_runs_finished"];
    app.totals.created_lobbies = totals["lobbies_created"];
    app.totals.daily_active_users = totals["daily_active_users"];
    app.totals.weekly_active_users = totals["weekly_active_users"];
    app.totals.monthly_active_users = totals["monthly_active_users"];
    app.totals.daily_active_users_finished = totals["daily_active_users_finished"];
    app.totals.weekly_active_users_finished = totals["weekly_active_users_finished"];
    app.totals.monthly_active_users_finished = totals["monthly_active_users_finished"];
    let user_runs = totals["user_runs"];
    let user_finished_runs = totals["user_finished_runs"];
    let user_marathons = totals["user_marathons"];
    let user_finished_marathons = totals["user_finished_marathons"];
    app.totals.pct_goog_users = (app.totals.google_users / app.totals.users * 100).toFixed(2);
    app.totals.pct_user_runs = (user_runs / app.totals.runs * 100).toFixed(2);
    app.totals.pct_user_finished_runs = (user_finished_runs / app.totals.finished_runs * 100).toFixed(2);
    app.totals.pct_user_marathons = (user_marathons / app.totals.marathon_runs * 100).toFixed(2);
    app.totals.pct_user_finished_marathons = (user_finished_marathons / app.totals.finished_marathons * 100).toFixed(2);
  }
  function update_daily(daily_totals) {
    app.daily.users = daily_totals["daily_new_users"];
    app.daily.users.shift();
    app.daily.sprint_runs = daily_totals["daily_sprints"];
    app.daily.finished_sprint_runs = daily_totals["daily_finished_sprints"];
    app.daily.sprint_runs_per_user = daily_totals["avg_user_plays"];
    app.daily.finished_sprint_runs_per_user = daily_totals["avg_user_finished_plays"];
    app.daily.active_users = daily_totals["active_users"];
    app.daily.lobby_runs = daily_totals["daily_lobby_runs"];
    app.daily.finished_lobby_runs = daily_totals["daily_finished_lobby_runs"];
    app.daily.created_lobbies = daily_totals["daily_created_lobbies"];
    app.daily.lobby_runs_per_user = daily_totals["avg_user_lobby_plays"];
    app.daily.finished_lobby_runs_per_user = daily_totals["avg_user_finished_lobby_plays"];
    app.daily.active_lobby_users = daily_totals["active_lobby_users"];
  }
  async function get_data(res = null) {
    let response = res ?? await fetch("/api/stats/all");
    let res_json = await response.json();
    const all_stats = JSON.parse(res_json["stats_json"])["stats"];
    update_totals(all_stats);
    update_daily(all_stats);
    app.last_updated = new Date(res_json["timestamp"]);
    calculate_weekly_change();
  }
  function calculate_weekly_change() {
    let last_week_users = app.daily.users[app.daily.users.length - 7]["total"];
    app.weekly.user_change = app.totals.users - last_week_users;
    let last_week_runs = app.daily.sprint_runs[app.daily.sprint_runs.length - 7]["total"];
    app.weekly.runs_change = app.totals.runs - last_week_runs;
    let last_week_finished_runs = app.daily.finished_sprint_runs[app.daily.finished_sprint_runs.length - 7]["total"];
    app.weekly.finished_runs_change = app.totals.finished_runs - last_week_finished_runs;
    let last_week_lobby_runs = app.daily.lobby_runs[app.daily.lobby_runs.length - 7]["total"];
    app.weekly.lobby_runs_change = app.totals.lobby_runs - last_week_lobby_runs;
    let last_week_finished_lobby_runs = app.daily.finished_lobby_runs[app.daily.finished_lobby_runs.length - 7]["total"];
    app.weekly.finished_lobby_runs_change = app.totals.finished_lobby_runs - last_week_finished_lobby_runs;
  }
  async function draw_player_graphs() {
    new Chart("daily-users", {
      type: "line",
      data: {
        labels: app.daily.users.map(({ day }) => day),
        datasets: [
          {
            data: app.daily.users.map(({ total }) => total),
            label: "Total Users",
            borderColor: USERS_COLOR,
            fill: false
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    new Chart("daily-new-users", {
      type: "line",
      data: {
        labels: app.daily.users.map(({ day }) => day),
        datasets: [
          {
            data: app.daily.users.map(({ daily_users }) => daily_users),
            label: "New Users",
            borderColor: USERS_COLOR,
            fill: false
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  async function draw_sprint_graphs() {
    new Chart("daily-runs", {
      type: "line",
      data: {
        labels: app.daily.sprint_runs.map(({ day }) => day),
        datasets: [
          {
            data: app.daily.sprint_runs.map(({ total }) => total),
            label: "Total Sprint Runs",
            borderColor: SPRINTS_COLOR,
            fill: false
          },
          {
            data: app.daily.finished_sprint_runs.map(({ total }) => total),
            label: "Total Finished Sprint Runs",
            borderColor: SPRINTS_SUBCOLOR,
            fill: false
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    new Chart("daily-new-runs", {
      type: "line",
      data: {
        labels: app.daily.sprint_runs.map(({ day }) => day),
        datasets: [
          {
            data: app.daily.sprint_runs.map(({ daily_plays }) => daily_plays),
            label: "New Sprint Runs",
            borderColor: SPRINTS_COLOR,
            fill: false
          },
          {
            data: app.daily.finished_sprint_runs.map(({ daily_plays }) => daily_plays),
            label: "New Finished Sprint Runs",
            borderColor: SPRINTS_SUBCOLOR,
            fill: false
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          subtitle: {
            display: true,
            text: "Note: We stopped submitting start time data for unfinished runs on 2/20",
            color: "red",
            font: {
              weight: "bold"
            }
          }
        }
      }
    });
    new Chart("daily-active-users", {
      type: "line",
      data: {
        labels: app.daily.active_users.map(({ day }) => day),
        datasets: [
          {
            data: app.daily.active_users.map(({ active_users }) => active_users),
            label: "Users That Finished A Sprint Run",
            borderColor: SPRINTS_COLOR,
            fill: false
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    new Chart("daily-average-user-plays", {
      type: "line",
      data: {
        labels: app.daily.sprint_runs_per_user.map(({ day }) => day),
        datasets: [
          {
            data: app.daily.sprint_runs_per_user.map(({ sprint_runs_per_user }) => sprint_runs_per_user),
            label: "Average User Sprint Runs",
            borderColor: SPRINTS_COLOR,
            fill: false
          },
          {
            data: app.daily.finished_sprint_runs_per_user.map(({ finished_sprint_runs_per_user }) => finished_sprint_runs_per_user),
            label: "Average Finished User Sprint Runs",
            borderColor: SPRINTS_SUBCOLOR,
            fill: false
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  async function draw_lobby_graphs() {
    new Chart("daily-lobbies", {
      type: "line",
      data: {
        labels: app.daily.created_lobbies.map(({ day }) => day),
        datasets: [
          {
            data: app.daily.created_lobbies.map(({ total }) => total),
            label: "Total Lobbies Created",
            borderColor: LOBBIES_COLOR,
            fill: false
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    new Chart("daily-new-lobbies", {
      type: "line",
      data: {
        labels: app.daily.created_lobbies.map(({ day }) => day),
        datasets: [
          {
            data: app.daily.created_lobbies.map(({ daily_created_lobbies }) => daily_created_lobbies),
            label: "New Lobbies Created",
            borderColor: LOBBIES_COLOR,
            fill: false
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    new Chart("daily-lobby-runs", {
      type: "line",
      data: {
        labels: app.daily.lobby_runs.map(({ day }) => day),
        datasets: [
          {
            data: app.daily.lobby_runs.map(({ total }) => total),
            label: "Total Lobby Runs",
            borderColor: LOBBIES_COLOR,
            fill: false
          },
          {
            data: app.daily.finished_lobby_runs.map(({ total }) => total),
            label: "Total Finished Lobby Runs",
            borderColor: LOBBIES_SUBCOLOR,
            fill: false
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    new Chart("daily-new-lobby-runs", {
      type: "line",
      data: {
        labels: app.daily.lobby_runs.map(({ day }) => day),
        datasets: [
          {
            data: app.daily.lobby_runs.map(({ daily_plays }) => daily_plays),
            label: "New Lobby Runs",
            borderColor: LOBBIES_COLOR,
            fill: false
          },
          {
            data: app.daily.finished_lobby_runs.map(({ daily_plays }) => daily_plays),
            label: "New Finished Lobby Runs",
            borderColor: LOBBIES_SUBCOLOR,
            fill: false
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    new Chart("daily-active-lobby-users", {
      type: "line",
      data: {
        labels: app.daily.active_lobby_users.map(({ day }) => day),
        datasets: [
          {
            data: app.daily.active_lobby_users.map(({ active_users }) => active_users),
            label: "Users That Finished A Lobby Run",
            borderColor: LOBBIES_COLOR,
            fill: false
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    new Chart("daily-average-lobby-user-plays", {
      type: "line",
      data: {
        labels: app.daily.lobby_runs_per_user.map(({ day }) => day),
        datasets: [
          {
            data: app.daily.lobby_runs_per_user.map(({ lobby_runs_per_user }) => lobby_runs_per_user),
            label: "Average User Lobby Runs",
            borderColor: LOBBIES_COLOR,
            fill: false
          },
          {
            data: app.daily.finished_lobby_runs_per_user.map(({ finished_lobby_runs_per_user }) => finished_lobby_runs_per_user),
            label: "Average Finished User Lobby Runs",
            borderColor: LOBBIES_SUBCOLOR,
            fill: false
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  async function draw_graphs() {
    await draw_player_graphs();
    draw_sprint_graphs();
    draw_lobby_graphs();
  }
  var app = new Vue({
    delimiters: ["[[", "]]"],
    el: "#app",
    data: {
      totals: {
        users: 0,
        google_users: 0,
        runs: 0,
        marathons_runs: 0,
        finished_runs: 0,
        finished_marathons: 0,
        finished_lobby_runs: 0,
        pct_goog_users: 0,
        pct_user_runs: 0,
        pct_user_finished_runs: 0,
        pct_user_marathons: 0,
        pct_user_finished_marathons: 0,
        daily_active_users: 0,
        weekly_active_users: 0,
        monthly_active_users: 0,
        daily_active_users_finished: 0,
        weekly_active_users_finished: 0,
        monthly_active_users_finished: 0
      },
      weekly: {
        user_change: 0,
        runs_change: 0,
        finished_runs_change: 0,
        finished_lobby_runs_change: 0
      },
      daily: {
        users: [],
        sprint_runs: [],
        finished_sprint_runs: [],
        sprint_runs_per_user: [],
        finished_sprint_runs_per_user: [],
        active_users: [],
        lobby_runs: [],
        finished_lobby_runs: [],
        created_lobbies: [],
        lobby_runs_per_user: [],
        finished_lobby_runs_per_user: [],
        active_lobby_users: []
      },
      active_tab: "users",
      loading: false,
      load_time_sec: 0,
      last_updated: "",
      last_request_time: ""
    },
    methods: {
      is_active(tab_name) {
        return this.active_tab === tab_name;
      },
      set_active(tab_name) {
        this.active_tab = tab_name;
      },
      async poll_stats() {
        let response = await fetch("/api/stats/all");
        let res_json = await response.json();
        let last_updated = new Date(res_json["timestamp"]);
        if (last_updated >= this.last_request_time) {
          this.loading = false;
          window.location.reload();
          return;
        }
        setTimeout(this.poll_stats, 5 * 1e3);
      },
      async refresh_stats(event) {
        try {
          const response = await fetchJson("/api/stats/calculate", "GET");
          if (response.status === 200) {
            alert("New stat calculation underway.");
            this.last_request_time = new Date();
            this.loading = true;
            this.load_time_sec = 0;
            this.countLoadTimer();
          } else if (response.status === 503) {
            alert("Server currently processing stats! Check back in a bit.");
          }
          setTimeout(this.poll_stats, 30 * 1e3);
        } catch (e) {
          alert(e);
        }
      },
      countLoadTimer() {
        if (this.loading) {
          setTimeout(() => {
            this.load_time_sec += 1;
            this.countLoadTimer();
          }, 1e3);
        }
      }
    },
    created: async function() {
      await get_data();
      draw_graphs();
    }
  });
})();
/*!
 * @kurkle/color v0.2.1
 * https://github.com/kurkle/color#readme
 * (c) 2022 Jukka Kurkela
 * Released under the MIT License
 */
/*!
 * Chart.js v3.9.1
 * https://www.chartjs.org
 * (c) 2022 Chart.js Contributors
 * Released under the MIT License
 */
/*!
 * Vue.js v2.7.10
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
//# sourceMappingURL=stats.js.map
