(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target2) => (target2 = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target2, "default", { value: mod, enumerable: true }) : target2,
    mod
  ));

  // node_modules/moment/moment.js
  var require_moment = __commonJS({
    "node_modules/moment/moment.js"(exports, module) {
      (function(global2, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global2.moment = factory();
      })(exports, function() {
        "use strict";
        var hookCallback;
        function hooks2() {
          return hookCallback.apply(null, arguments);
        }
        function setHookCallback(callback) {
          hookCallback = callback;
        }
        function isArray2(input) {
          return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
        }
        function isObject2(input) {
          return input != null && Object.prototype.toString.call(input) === "[object Object]";
        }
        function hasOwnProp(a, b) {
          return Object.prototype.hasOwnProperty.call(a, b);
        }
        function isObjectEmpty(obj) {
          if (Object.getOwnPropertyNames) {
            return Object.getOwnPropertyNames(obj).length === 0;
          } else {
            var k;
            for (k in obj) {
              if (hasOwnProp(obj, k)) {
                return false;
              }
            }
            return true;
          }
        }
        function isUndefined(input) {
          return input === void 0;
        }
        function isNumber(input) {
          return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
        }
        function isDate(input) {
          return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
        }
        function map(arr, fn) {
          var res = [], i, arrLen = arr.length;
          for (i = 0; i < arrLen; ++i) {
            res.push(fn(arr[i], i));
          }
          return res;
        }
        function extend2(a, b) {
          for (var i in b) {
            if (hasOwnProp(b, i)) {
              a[i] = b[i];
            }
          }
          if (hasOwnProp(b, "toString")) {
            a.toString = b.toString;
          }
          if (hasOwnProp(b, "valueOf")) {
            a.valueOf = b.valueOf;
          }
          return a;
        }
        function createUTC(input, format2, locale2, strict) {
          return createLocalOrUTC(input, format2, locale2, strict, true).utc();
        }
        function defaultParsingFlags() {
          return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidEra: null,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false,
            parsedDateParts: [],
            era: null,
            meridiem: null,
            rfc2822: false,
            weekdayMismatch: false
          };
        }
        function getParsingFlags(m) {
          if (m._pf == null) {
            m._pf = defaultParsingFlags();
          }
          return m._pf;
        }
        var some;
        if (Array.prototype.some) {
          some = Array.prototype.some;
        } else {
          some = function(fun) {
            var t = Object(this), len2 = t.length >>> 0, i;
            for (i = 0; i < len2; i++) {
              if (i in t && fun.call(this, t[i], i, t)) {
                return true;
              }
            }
            return false;
          };
        }
        function isValid(m) {
          if (m._isValid == null) {
            var flags = getParsingFlags(m), parsedParts = some.call(flags.parsedDateParts, function(i) {
              return i != null;
            }), isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
            if (m._strict) {
              isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === void 0;
            }
            if (Object.isFrozen == null || !Object.isFrozen(m)) {
              m._isValid = isNowValid;
            } else {
              return isNowValid;
            }
          }
          return m._isValid;
        }
        function createInvalid(flags) {
          var m = createUTC(NaN);
          if (flags != null) {
            extend2(getParsingFlags(m), flags);
          } else {
            getParsingFlags(m).userInvalidated = true;
          }
          return m;
        }
        var momentProperties = hooks2.momentProperties = [], updateInProgress = false;
        function copyConfig(to2, from2) {
          var i, prop, val, momentPropertiesLen = momentProperties.length;
          if (!isUndefined(from2._isAMomentObject)) {
            to2._isAMomentObject = from2._isAMomentObject;
          }
          if (!isUndefined(from2._i)) {
            to2._i = from2._i;
          }
          if (!isUndefined(from2._f)) {
            to2._f = from2._f;
          }
          if (!isUndefined(from2._l)) {
            to2._l = from2._l;
          }
          if (!isUndefined(from2._strict)) {
            to2._strict = from2._strict;
          }
          if (!isUndefined(from2._tzm)) {
            to2._tzm = from2._tzm;
          }
          if (!isUndefined(from2._isUTC)) {
            to2._isUTC = from2._isUTC;
          }
          if (!isUndefined(from2._offset)) {
            to2._offset = from2._offset;
          }
          if (!isUndefined(from2._pf)) {
            to2._pf = getParsingFlags(from2);
          }
          if (!isUndefined(from2._locale)) {
            to2._locale = from2._locale;
          }
          if (momentPropertiesLen > 0) {
            for (i = 0; i < momentPropertiesLen; i++) {
              prop = momentProperties[i];
              val = from2[prop];
              if (!isUndefined(val)) {
                to2[prop] = val;
              }
            }
          }
          return to2;
        }
        function Moment(config2) {
          copyConfig(this, config2);
          this._d = new Date(config2._d != null ? config2._d.getTime() : NaN);
          if (!this.isValid()) {
            this._d = new Date(NaN);
          }
          if (updateInProgress === false) {
            updateInProgress = true;
            hooks2.updateOffset(this);
            updateInProgress = false;
          }
        }
        function isMoment(obj) {
          return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
        }
        function warn2(msg) {
          if (hooks2.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
            console.warn("Deprecation warning: " + msg);
          }
        }
        function deprecate(msg, fn) {
          var firstTime = true;
          return extend2(function() {
            if (hooks2.deprecationHandler != null) {
              hooks2.deprecationHandler(null, msg);
            }
            if (firstTime) {
              var args = [], arg, i, key, argLen = arguments.length;
              for (i = 0; i < argLen; i++) {
                arg = "";
                if (typeof arguments[i] === "object") {
                  arg += "\n[" + i + "] ";
                  for (key in arguments[0]) {
                    if (hasOwnProp(arguments[0], key)) {
                      arg += key + ": " + arguments[0][key] + ", ";
                    }
                  }
                  arg = arg.slice(0, -2);
                } else {
                  arg = arguments[i];
                }
                args.push(arg);
              }
              warn2(
                msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + new Error().stack
              );
              firstTime = false;
            }
            return fn.apply(this, arguments);
          }, fn);
        }
        var deprecations = {};
        function deprecateSimple(name, msg) {
          if (hooks2.deprecationHandler != null) {
            hooks2.deprecationHandler(name, msg);
          }
          if (!deprecations[name]) {
            warn2(msg);
            deprecations[name] = true;
          }
        }
        hooks2.suppressDeprecationWarnings = false;
        hooks2.deprecationHandler = null;
        function isFunction2(input) {
          return typeof Function !== "undefined" && input instanceof Function || Object.prototype.toString.call(input) === "[object Function]";
        }
        function set2(config2) {
          var prop, i;
          for (i in config2) {
            if (hasOwnProp(config2, i)) {
              prop = config2[i];
              if (isFunction2(prop)) {
                this[i] = prop;
              } else {
                this["_" + i] = prop;
              }
            }
          }
          this._config = config2;
          this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
          );
        }
        function mergeConfigs(parentConfig, childConfig) {
          var res = extend2({}, parentConfig), prop;
          for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
              if (isObject2(parentConfig[prop]) && isObject2(childConfig[prop])) {
                res[prop] = {};
                extend2(res[prop], parentConfig[prop]);
                extend2(res[prop], childConfig[prop]);
              } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
              } else {
                delete res[prop];
              }
            }
          }
          for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject2(parentConfig[prop])) {
              res[prop] = extend2({}, res[prop]);
            }
          }
          return res;
        }
        function Locale(config2) {
          if (config2 != null) {
            this.set(config2);
          }
        }
        var keys;
        if (Object.keys) {
          keys = Object.keys;
        } else {
          keys = function(obj) {
            var i, res = [];
            for (i in obj) {
              if (hasOwnProp(obj, i)) {
                res.push(i);
              }
            }
            return res;
          };
        }
        var defaultCalendar = {
          sameDay: "[Today at] LT",
          nextDay: "[Tomorrow at] LT",
          nextWeek: "dddd [at] LT",
          lastDay: "[Yesterday at] LT",
          lastWeek: "[Last] dddd [at] LT",
          sameElse: "L"
        };
        function calendar(key, mom, now2) {
          var output = this._calendar[key] || this._calendar["sameElse"];
          return isFunction2(output) ? output.call(mom, now2) : output;
        }
        function zeroFill(number, targetLength, forceSign) {
          var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign2 = number >= 0;
          return (sign2 ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
        }
        var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
        function addFormatToken(token2, padded, ordinal2, callback) {
          var func = callback;
          if (typeof callback === "string") {
            func = function() {
              return this[callback]();
            };
          }
          if (token2) {
            formatTokenFunctions[token2] = func;
          }
          if (padded) {
            formatTokenFunctions[padded[0]] = function() {
              return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
          }
          if (ordinal2) {
            formatTokenFunctions[ordinal2] = function() {
              return this.localeData().ordinal(
                func.apply(this, arguments),
                token2
              );
            };
          }
        }
        function removeFormattingTokens(input) {
          if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, "");
          }
          return input.replace(/\\/g, "");
        }
        function makeFormatFunction(format2) {
          var array = format2.match(formattingTokens), i, length;
          for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
              array[i] = formatTokenFunctions[array[i]];
            } else {
              array[i] = removeFormattingTokens(array[i]);
            }
          }
          return function(mom) {
            var output = "", i2;
            for (i2 = 0; i2 < length; i2++) {
              output += isFunction2(array[i2]) ? array[i2].call(mom, format2) : array[i2];
            }
            return output;
          };
        }
        function formatMoment(m, format2) {
          if (!m.isValid()) {
            return m.localeData().invalidDate();
          }
          format2 = expandFormat(format2, m.localeData());
          formatFunctions[format2] = formatFunctions[format2] || makeFormatFunction(format2);
          return formatFunctions[format2](m);
        }
        function expandFormat(format2, locale2) {
          var i = 5;
          function replaceLongDateFormatTokens(input) {
            return locale2.longDateFormat(input) || input;
          }
          localFormattingTokens.lastIndex = 0;
          while (i >= 0 && localFormattingTokens.test(format2)) {
            format2 = format2.replace(
              localFormattingTokens,
              replaceLongDateFormatTokens
            );
            localFormattingTokens.lastIndex = 0;
            i -= 1;
          }
          return format2;
        }
        var defaultLongDateFormat = {
          LTS: "h:mm:ss A",
          LT: "h:mm A",
          L: "MM/DD/YYYY",
          LL: "MMMM D, YYYY",
          LLL: "MMMM D, YYYY h:mm A",
          LLLL: "dddd, MMMM D, YYYY h:mm A"
        };
        function longDateFormat(key) {
          var format2 = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
          if (format2 || !formatUpper) {
            return format2;
          }
          this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function(tok) {
            if (tok === "MMMM" || tok === "MM" || tok === "DD" || tok === "dddd") {
              return tok.slice(1);
            }
            return tok;
          }).join("");
          return this._longDateFormat[key];
        }
        var defaultInvalidDate = "Invalid date";
        function invalidDate() {
          return this._invalidDate;
        }
        var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
        function ordinal(number) {
          return this._ordinal.replace("%d", number);
        }
        var defaultRelativeTime = {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          ss: "%d seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          w: "a week",
          ww: "%d weeks",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years"
        };
        function relativeTime(number, withoutSuffix, string, isFuture) {
          var output = this._relativeTime[string];
          return isFunction2(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
        }
        function pastFuture(diff2, output) {
          var format2 = this._relativeTime[diff2 > 0 ? "future" : "past"];
          return isFunction2(format2) ? format2(output) : format2.replace(/%s/i, output);
        }
        var aliases = {};
        function addUnitAlias(unit, shorthand) {
          var lowerCase = unit.toLowerCase();
          aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = unit;
        }
        function normalizeUnits(units) {
          return typeof units === "string" ? aliases[units] || aliases[units.toLowerCase()] : void 0;
        }
        function normalizeObjectUnits(inputObject) {
          var normalizedInput = {}, normalizedProp, prop;
          for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
              normalizedProp = normalizeUnits(prop);
              if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
              }
            }
          }
          return normalizedInput;
        }
        var priorities = {};
        function addUnitPriority(unit, priority) {
          priorities[unit] = priority;
        }
        function getPrioritizedUnits(unitsObj) {
          var units = [], u;
          for (u in unitsObj) {
            if (hasOwnProp(unitsObj, u)) {
              units.push({ unit: u, priority: priorities[u] });
            }
          }
          units.sort(function(a, b) {
            return a.priority - b.priority;
          });
          return units;
        }
        function isLeapYear(year) {
          return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        }
        function absFloor(number) {
          if (number < 0) {
            return Math.ceil(number) || 0;
          } else {
            return Math.floor(number);
          }
        }
        function toInt(argumentForCoercion) {
          var coercedNumber = +argumentForCoercion, value = 0;
          if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
          }
          return value;
        }
        function makeGetSet(unit, keepTime) {
          return function(value) {
            if (value != null) {
              set$1(this, unit, value);
              hooks2.updateOffset(this, keepTime);
              return this;
            } else {
              return get(this, unit);
            }
          };
        }
        function get(mom, unit) {
          return mom.isValid() ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]() : NaN;
        }
        function set$1(mom, unit, value) {
          if (mom.isValid() && !isNaN(value)) {
            if (unit === "FullYear" && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
              value = toInt(value);
              mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](
                value,
                mom.month(),
                daysInMonth(value, mom.month())
              );
            } else {
              mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
            }
          }
        }
        function stringGet(units) {
          units = normalizeUnits(units);
          if (isFunction2(this[units])) {
            return this[units]();
          }
          return this;
        }
        function stringSet(units, value) {
          if (typeof units === "object") {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units), i, prioritizedLen = prioritized.length;
            for (i = 0; i < prioritizedLen; i++) {
              this[prioritized[i].unit](units[prioritized[i].unit]);
            }
          } else {
            units = normalizeUnits(units);
            if (isFunction2(this[units])) {
              return this[units](value);
            }
          }
          return this;
        }
        var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, regexes;
        regexes = {};
        function addRegexToken(token2, regex, strictRegex) {
          regexes[token2] = isFunction2(regex) ? regex : function(isStrict, localeData2) {
            return isStrict && strictRegex ? strictRegex : regex;
          };
        }
        function getParseRegexForToken(token2, config2) {
          if (!hasOwnProp(regexes, token2)) {
            return new RegExp(unescapeFormat(token2));
          }
          return regexes[token2](config2._strict, config2._locale);
        }
        function unescapeFormat(s) {
          return regexEscape(
            s.replace("\\", "").replace(
              /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
              function(matched, p1, p2, p3, p4) {
                return p1 || p2 || p3 || p4;
              }
            )
          );
        }
        function regexEscape(s) {
          return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        }
        var tokens = {};
        function addParseToken(token2, callback) {
          var i, func = callback, tokenLen;
          if (typeof token2 === "string") {
            token2 = [token2];
          }
          if (isNumber(callback)) {
            func = function(input, array) {
              array[callback] = toInt(input);
            };
          }
          tokenLen = token2.length;
          for (i = 0; i < tokenLen; i++) {
            tokens[token2[i]] = func;
          }
        }
        function addWeekParseToken(token2, callback) {
          addParseToken(token2, function(input, array, config2, token3) {
            config2._w = config2._w || {};
            callback(input, config2._w, config2, token3);
          });
        }
        function addTimeToArrayFromToken(token2, input, config2) {
          if (input != null && hasOwnProp(tokens, token2)) {
            tokens[token2](input, config2._a, config2, token2);
          }
        }
        var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
        function mod(n, x) {
          return (n % x + x) % x;
        }
        var indexOf;
        if (Array.prototype.indexOf) {
          indexOf = Array.prototype.indexOf;
        } else {
          indexOf = function(o) {
            var i;
            for (i = 0; i < this.length; ++i) {
              if (this[i] === o) {
                return i;
              }
            }
            return -1;
          };
        }
        function daysInMonth(year, month) {
          if (isNaN(year) || isNaN(month)) {
            return NaN;
          }
          var modMonth = mod(month, 12);
          year += (month - modMonth) / 12;
          return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
        }
        addFormatToken("M", ["MM", 2], "Mo", function() {
          return this.month() + 1;
        });
        addFormatToken("MMM", 0, 0, function(format2) {
          return this.localeData().monthsShort(this, format2);
        });
        addFormatToken("MMMM", 0, 0, function(format2) {
          return this.localeData().months(this, format2);
        });
        addUnitAlias("month", "M");
        addUnitPriority("month", 8);
        addRegexToken("M", match1to2);
        addRegexToken("MM", match1to2, match2);
        addRegexToken("MMM", function(isStrict, locale2) {
          return locale2.monthsShortRegex(isStrict);
        });
        addRegexToken("MMMM", function(isStrict, locale2) {
          return locale2.monthsRegex(isStrict);
        });
        addParseToken(["M", "MM"], function(input, array) {
          array[MONTH] = toInt(input) - 1;
        });
        addParseToken(["MMM", "MMMM"], function(input, array, config2, token2) {
          var month = config2._locale.monthsParse(input, token2, config2._strict);
          if (month != null) {
            array[MONTH] = month;
          } else {
            getParsingFlags(config2).invalidMonth = input;
          }
        });
        var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split(
          "_"
        ), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
        function localeMonths(m, format2) {
          if (!m) {
            return isArray2(this._months) ? this._months : this._months["standalone"];
          }
          return isArray2(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format2) ? "format" : "standalone"][m.month()];
        }
        function localeMonthsShort(m, format2) {
          if (!m) {
            return isArray2(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
          }
          return isArray2(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format2) ? "format" : "standalone"][m.month()];
        }
        function handleStrictParse(monthName, format2, strict) {
          var i, ii, mom, llc = monthName.toLocaleLowerCase();
          if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
              mom = createUTC([2e3, i]);
              this._shortMonthsParse[i] = this.monthsShort(
                mom,
                ""
              ).toLocaleLowerCase();
              this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
            }
          }
          if (strict) {
            if (format2 === "MMM") {
              ii = indexOf.call(this._shortMonthsParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._longMonthsParse, llc);
              return ii !== -1 ? ii : null;
            }
          } else {
            if (format2 === "MMM") {
              ii = indexOf.call(this._shortMonthsParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._longMonthsParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._longMonthsParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._shortMonthsParse, llc);
              return ii !== -1 ? ii : null;
            }
          }
        }
        function localeMonthsParse(monthName, format2, strict) {
          var i, mom, regex;
          if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format2, strict);
          }
          if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
          }
          for (i = 0; i < 12; i++) {
            mom = createUTC([2e3, i]);
            if (strict && !this._longMonthsParse[i]) {
              this._longMonthsParse[i] = new RegExp(
                "^" + this.months(mom, "").replace(".", "") + "$",
                "i"
              );
              this._shortMonthsParse[i] = new RegExp(
                "^" + this.monthsShort(mom, "").replace(".", "") + "$",
                "i"
              );
            }
            if (!strict && !this._monthsParse[i]) {
              regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
              this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
            }
            if (strict && format2 === "MMMM" && this._longMonthsParse[i].test(monthName)) {
              return i;
            } else if (strict && format2 === "MMM" && this._shortMonthsParse[i].test(monthName)) {
              return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
              return i;
            }
          }
        }
        function setMonth(mom, value) {
          var dayOfMonth;
          if (!mom.isValid()) {
            return mom;
          }
          if (typeof value === "string") {
            if (/^\d+$/.test(value)) {
              value = toInt(value);
            } else {
              value = mom.localeData().monthsParse(value);
              if (!isNumber(value)) {
                return mom;
              }
            }
          }
          dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
          mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth);
          return mom;
        }
        function getSetMonth(value) {
          if (value != null) {
            setMonth(this, value);
            hooks2.updateOffset(this, true);
            return this;
          } else {
            return get(this, "Month");
          }
        }
        function getDaysInMonth() {
          return daysInMonth(this.year(), this.month());
        }
        function monthsShortRegex(isStrict) {
          if (this._monthsParseExact) {
            if (!hasOwnProp(this, "_monthsRegex")) {
              computeMonthsParse.call(this);
            }
            if (isStrict) {
              return this._monthsShortStrictRegex;
            } else {
              return this._monthsShortRegex;
            }
          } else {
            if (!hasOwnProp(this, "_monthsShortRegex")) {
              this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
          }
        }
        function monthsRegex(isStrict) {
          if (this._monthsParseExact) {
            if (!hasOwnProp(this, "_monthsRegex")) {
              computeMonthsParse.call(this);
            }
            if (isStrict) {
              return this._monthsStrictRegex;
            } else {
              return this._monthsRegex;
            }
          } else {
            if (!hasOwnProp(this, "_monthsRegex")) {
              this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
          }
        }
        function computeMonthsParse() {
          function cmpLenRev(a, b) {
            return b.length - a.length;
          }
          var shortPieces = [], longPieces = [], mixedPieces = [], i, mom;
          for (i = 0; i < 12; i++) {
            mom = createUTC([2e3, i]);
            shortPieces.push(this.monthsShort(mom, ""));
            longPieces.push(this.months(mom, ""));
            mixedPieces.push(this.months(mom, ""));
            mixedPieces.push(this.monthsShort(mom, ""));
          }
          shortPieces.sort(cmpLenRev);
          longPieces.sort(cmpLenRev);
          mixedPieces.sort(cmpLenRev);
          for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
          }
          for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
          }
          this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
          this._monthsShortRegex = this._monthsRegex;
          this._monthsStrictRegex = new RegExp(
            "^(" + longPieces.join("|") + ")",
            "i"
          );
          this._monthsShortStrictRegex = new RegExp(
            "^(" + shortPieces.join("|") + ")",
            "i"
          );
        }
        addFormatToken("Y", 0, 0, function() {
          var y = this.year();
          return y <= 9999 ? zeroFill(y, 4) : "+" + y;
        });
        addFormatToken(0, ["YY", 2], 0, function() {
          return this.year() % 100;
        });
        addFormatToken(0, ["YYYY", 4], 0, "year");
        addFormatToken(0, ["YYYYY", 5], 0, "year");
        addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
        addUnitAlias("year", "y");
        addUnitPriority("year", 1);
        addRegexToken("Y", matchSigned);
        addRegexToken("YY", match1to2, match2);
        addRegexToken("YYYY", match1to4, match4);
        addRegexToken("YYYYY", match1to6, match6);
        addRegexToken("YYYYYY", match1to6, match6);
        addParseToken(["YYYYY", "YYYYYY"], YEAR);
        addParseToken("YYYY", function(input, array) {
          array[YEAR] = input.length === 2 ? hooks2.parseTwoDigitYear(input) : toInt(input);
        });
        addParseToken("YY", function(input, array) {
          array[YEAR] = hooks2.parseTwoDigitYear(input);
        });
        addParseToken("Y", function(input, array) {
          array[YEAR] = parseInt(input, 10);
        });
        function daysInYear(year) {
          return isLeapYear(year) ? 366 : 365;
        }
        hooks2.parseTwoDigitYear = function(input) {
          return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
        };
        var getSetYear = makeGetSet("FullYear", true);
        function getIsLeapYear() {
          return isLeapYear(this.year());
        }
        function createDate(y, m, d, h, M, s, ms) {
          var date;
          if (y < 100 && y >= 0) {
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
              date.setFullYear(y);
            }
          } else {
            date = new Date(y, m, d, h, M, s, ms);
          }
          return date;
        }
        function createUTCDate(y) {
          var date, args;
          if (y < 100 && y >= 0) {
            args = Array.prototype.slice.call(arguments);
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
              date.setUTCFullYear(y);
            }
          } else {
            date = new Date(Date.UTC.apply(null, arguments));
          }
          return date;
        }
        function firstWeekOffset(year, dow, doy) {
          var fwd = 7 + dow - doy, fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
          return -fwdlw + fwd - 1;
        }
        function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
          var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
          if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
          } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
          } else {
            resYear = year;
            resDayOfYear = dayOfYear;
          }
          return {
            year: resYear,
            dayOfYear: resDayOfYear
          };
        }
        function weekOfYear(mom, dow, doy) {
          var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
          if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
          } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
          } else {
            resYear = mom.year();
            resWeek = week;
          }
          return {
            week: resWeek,
            year: resYear
          };
        }
        function weeksInYear(year, dow, doy) {
          var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
          return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
        }
        addFormatToken("w", ["ww", 2], "wo", "week");
        addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
        addUnitAlias("week", "w");
        addUnitAlias("isoWeek", "W");
        addUnitPriority("week", 5);
        addUnitPriority("isoWeek", 5);
        addRegexToken("w", match1to2);
        addRegexToken("ww", match1to2, match2);
        addRegexToken("W", match1to2);
        addRegexToken("WW", match1to2, match2);
        addWeekParseToken(
          ["w", "ww", "W", "WW"],
          function(input, week, config2, token2) {
            week[token2.substr(0, 1)] = toInt(input);
          }
        );
        function localeWeek(mom) {
          return weekOfYear(mom, this._week.dow, this._week.doy).week;
        }
        var defaultLocaleWeek = {
          dow: 0,
          doy: 6
        };
        function localeFirstDayOfWeek() {
          return this._week.dow;
        }
        function localeFirstDayOfYear() {
          return this._week.doy;
        }
        function getSetWeek(input) {
          var week = this.localeData().week(this);
          return input == null ? week : this.add((input - week) * 7, "d");
        }
        function getSetISOWeek(input) {
          var week = weekOfYear(this, 1, 4).week;
          return input == null ? week : this.add((input - week) * 7, "d");
        }
        addFormatToken("d", 0, "do", "day");
        addFormatToken("dd", 0, 0, function(format2) {
          return this.localeData().weekdaysMin(this, format2);
        });
        addFormatToken("ddd", 0, 0, function(format2) {
          return this.localeData().weekdaysShort(this, format2);
        });
        addFormatToken("dddd", 0, 0, function(format2) {
          return this.localeData().weekdays(this, format2);
        });
        addFormatToken("e", 0, 0, "weekday");
        addFormatToken("E", 0, 0, "isoWeekday");
        addUnitAlias("day", "d");
        addUnitAlias("weekday", "e");
        addUnitAlias("isoWeekday", "E");
        addUnitPriority("day", 11);
        addUnitPriority("weekday", 11);
        addUnitPriority("isoWeekday", 11);
        addRegexToken("d", match1to2);
        addRegexToken("e", match1to2);
        addRegexToken("E", match1to2);
        addRegexToken("dd", function(isStrict, locale2) {
          return locale2.weekdaysMinRegex(isStrict);
        });
        addRegexToken("ddd", function(isStrict, locale2) {
          return locale2.weekdaysShortRegex(isStrict);
        });
        addRegexToken("dddd", function(isStrict, locale2) {
          return locale2.weekdaysRegex(isStrict);
        });
        addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config2, token2) {
          var weekday = config2._locale.weekdaysParse(input, token2, config2._strict);
          if (weekday != null) {
            week.d = weekday;
          } else {
            getParsingFlags(config2).invalidWeekday = input;
          }
        });
        addWeekParseToken(["d", "e", "E"], function(input, week, config2, token2) {
          week[token2] = toInt(input);
        });
        function parseWeekday(input, locale2) {
          if (typeof input !== "string") {
            return input;
          }
          if (!isNaN(input)) {
            return parseInt(input, 10);
          }
          input = locale2.weekdaysParse(input);
          if (typeof input === "number") {
            return input;
          }
          return null;
        }
        function parseIsoWeekday(input, locale2) {
          if (typeof input === "string") {
            return locale2.weekdaysParse(input) % 7 || 7;
          }
          return isNaN(input) ? null : input;
        }
        function shiftWeekdays(ws, n) {
          return ws.slice(n, 7).concat(ws.slice(0, n));
        }
        var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
        function localeWeekdays(m, format2) {
          var weekdays = isArray2(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format2) ? "format" : "standalone"];
          return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
        }
        function localeWeekdaysShort(m) {
          return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
        }
        function localeWeekdaysMin(m) {
          return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
        }
        function handleStrictParse$1(weekdayName, format2, strict) {
          var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
          if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];
            for (i = 0; i < 7; ++i) {
              mom = createUTC([2e3, 1]).day(i);
              this._minWeekdaysParse[i] = this.weekdaysMin(
                mom,
                ""
              ).toLocaleLowerCase();
              this._shortWeekdaysParse[i] = this.weekdaysShort(
                mom,
                ""
              ).toLocaleLowerCase();
              this._weekdaysParse[i] = this.weekdays(mom, "").toLocaleLowerCase();
            }
          }
          if (strict) {
            if (format2 === "dddd") {
              ii = indexOf.call(this._weekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else if (format2 === "ddd") {
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            }
          } else {
            if (format2 === "dddd") {
              ii = indexOf.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else if (format2 === "ddd") {
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._minWeekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            }
          }
        }
        function localeWeekdaysParse(weekdayName, format2, strict) {
          var i, mom, regex;
          if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format2, strict);
          }
          if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
          }
          for (i = 0; i < 7; i++) {
            mom = createUTC([2e3, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
              this._fullWeekdaysParse[i] = new RegExp(
                "^" + this.weekdays(mom, "").replace(".", "\\.?") + "$",
                "i"
              );
              this._shortWeekdaysParse[i] = new RegExp(
                "^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$",
                "i"
              );
              this._minWeekdaysParse[i] = new RegExp(
                "^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$",
                "i"
              );
            }
            if (!this._weekdaysParse[i]) {
              regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
              this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i");
            }
            if (strict && format2 === "dddd" && this._fullWeekdaysParse[i].test(weekdayName)) {
              return i;
            } else if (strict && format2 === "ddd" && this._shortWeekdaysParse[i].test(weekdayName)) {
              return i;
            } else if (strict && format2 === "dd" && this._minWeekdaysParse[i].test(weekdayName)) {
              return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
              return i;
            }
          }
        }
        function getSetDayOfWeek(input) {
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
          if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, "d");
          } else {
            return day;
          }
        }
        function getSetLocaleDayOfWeek(input) {
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
          return input == null ? weekday : this.add(input - weekday, "d");
        }
        function getSetISODayOfWeek(input) {
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
          } else {
            return this.day() || 7;
          }
        }
        function weekdaysRegex(isStrict) {
          if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, "_weekdaysRegex")) {
              computeWeekdaysParse.call(this);
            }
            if (isStrict) {
              return this._weekdaysStrictRegex;
            } else {
              return this._weekdaysRegex;
            }
          } else {
            if (!hasOwnProp(this, "_weekdaysRegex")) {
              this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
          }
        }
        function weekdaysShortRegex(isStrict) {
          if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, "_weekdaysRegex")) {
              computeWeekdaysParse.call(this);
            }
            if (isStrict) {
              return this._weekdaysShortStrictRegex;
            } else {
              return this._weekdaysShortRegex;
            }
          } else {
            if (!hasOwnProp(this, "_weekdaysShortRegex")) {
              this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
          }
        }
        function weekdaysMinRegex(isStrict) {
          if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, "_weekdaysRegex")) {
              computeWeekdaysParse.call(this);
            }
            if (isStrict) {
              return this._weekdaysMinStrictRegex;
            } else {
              return this._weekdaysMinRegex;
            }
          } else {
            if (!hasOwnProp(this, "_weekdaysMinRegex")) {
              this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
          }
        }
        function computeWeekdaysParse() {
          function cmpLenRev(a, b) {
            return b.length - a.length;
          }
          var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i, mom, minp, shortp, longp;
          for (i = 0; i < 7; i++) {
            mom = createUTC([2e3, 1]).day(i);
            minp = regexEscape(this.weekdaysMin(mom, ""));
            shortp = regexEscape(this.weekdaysShort(mom, ""));
            longp = regexEscape(this.weekdays(mom, ""));
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
          }
          minPieces.sort(cmpLenRev);
          shortPieces.sort(cmpLenRev);
          longPieces.sort(cmpLenRev);
          mixedPieces.sort(cmpLenRev);
          this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
          this._weekdaysShortRegex = this._weekdaysRegex;
          this._weekdaysMinRegex = this._weekdaysRegex;
          this._weekdaysStrictRegex = new RegExp(
            "^(" + longPieces.join("|") + ")",
            "i"
          );
          this._weekdaysShortStrictRegex = new RegExp(
            "^(" + shortPieces.join("|") + ")",
            "i"
          );
          this._weekdaysMinStrictRegex = new RegExp(
            "^(" + minPieces.join("|") + ")",
            "i"
          );
        }
        function hFormat() {
          return this.hours() % 12 || 12;
        }
        function kFormat() {
          return this.hours() || 24;
        }
        addFormatToken("H", ["HH", 2], 0, "hour");
        addFormatToken("h", ["hh", 2], 0, hFormat);
        addFormatToken("k", ["kk", 2], 0, kFormat);
        addFormatToken("hmm", 0, 0, function() {
          return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
        });
        addFormatToken("hmmss", 0, 0, function() {
          return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
        });
        addFormatToken("Hmm", 0, 0, function() {
          return "" + this.hours() + zeroFill(this.minutes(), 2);
        });
        addFormatToken("Hmmss", 0, 0, function() {
          return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
        });
        function meridiem(token2, lowercase) {
          addFormatToken(token2, 0, 0, function() {
            return this.localeData().meridiem(
              this.hours(),
              this.minutes(),
              lowercase
            );
          });
        }
        meridiem("a", true);
        meridiem("A", false);
        addUnitAlias("hour", "h");
        addUnitPriority("hour", 13);
        function matchMeridiem(isStrict, locale2) {
          return locale2._meridiemParse;
        }
        addRegexToken("a", matchMeridiem);
        addRegexToken("A", matchMeridiem);
        addRegexToken("H", match1to2);
        addRegexToken("h", match1to2);
        addRegexToken("k", match1to2);
        addRegexToken("HH", match1to2, match2);
        addRegexToken("hh", match1to2, match2);
        addRegexToken("kk", match1to2, match2);
        addRegexToken("hmm", match3to4);
        addRegexToken("hmmss", match5to6);
        addRegexToken("Hmm", match3to4);
        addRegexToken("Hmmss", match5to6);
        addParseToken(["H", "HH"], HOUR);
        addParseToken(["k", "kk"], function(input, array, config2) {
          var kInput = toInt(input);
          array[HOUR] = kInput === 24 ? 0 : kInput;
        });
        addParseToken(["a", "A"], function(input, array, config2) {
          config2._isPm = config2._locale.isPM(input);
          config2._meridiem = input;
        });
        addParseToken(["h", "hh"], function(input, array, config2) {
          array[HOUR] = toInt(input);
          getParsingFlags(config2).bigHour = true;
        });
        addParseToken("hmm", function(input, array, config2) {
          var pos = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos));
          array[MINUTE] = toInt(input.substr(pos));
          getParsingFlags(config2).bigHour = true;
        });
        addParseToken("hmmss", function(input, array, config2) {
          var pos1 = input.length - 4, pos2 = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos1));
          array[MINUTE] = toInt(input.substr(pos1, 2));
          array[SECOND] = toInt(input.substr(pos2));
          getParsingFlags(config2).bigHour = true;
        });
        addParseToken("Hmm", function(input, array, config2) {
          var pos = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos));
          array[MINUTE] = toInt(input.substr(pos));
        });
        addParseToken("Hmmss", function(input, array, config2) {
          var pos1 = input.length - 4, pos2 = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos1));
          array[MINUTE] = toInt(input.substr(pos1, 2));
          array[SECOND] = toInt(input.substr(pos2));
        });
        function localeIsPM(input) {
          return (input + "").toLowerCase().charAt(0) === "p";
        }
        var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", true);
        function localeMeridiem(hours2, minutes2, isLower) {
          if (hours2 > 11) {
            return isLower ? "pm" : "PM";
          } else {
            return isLower ? "am" : "AM";
          }
        }
        var baseConfig = {
          calendar: defaultCalendar,
          longDateFormat: defaultLongDateFormat,
          invalidDate: defaultInvalidDate,
          ordinal: defaultOrdinal,
          dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
          relativeTime: defaultRelativeTime,
          months: defaultLocaleMonths,
          monthsShort: defaultLocaleMonthsShort,
          week: defaultLocaleWeek,
          weekdays: defaultLocaleWeekdays,
          weekdaysMin: defaultLocaleWeekdaysMin,
          weekdaysShort: defaultLocaleWeekdaysShort,
          meridiemParse: defaultLocaleMeridiemParse
        };
        var locales = {}, localeFamilies = {}, globalLocale;
        function commonPrefix(arr1, arr2) {
          var i, minl = Math.min(arr1.length, arr2.length);
          for (i = 0; i < minl; i += 1) {
            if (arr1[i] !== arr2[i]) {
              return i;
            }
          }
          return minl;
        }
        function normalizeLocale(key) {
          return key ? key.toLowerCase().replace("_", "-") : key;
        }
        function chooseLocale(names) {
          var i = 0, j, next2, locale2, split;
          while (i < names.length) {
            split = normalizeLocale(names[i]).split("-");
            j = split.length;
            next2 = normalizeLocale(names[i + 1]);
            next2 = next2 ? next2.split("-") : null;
            while (j > 0) {
              locale2 = loadLocale(split.slice(0, j).join("-"));
              if (locale2) {
                return locale2;
              }
              if (next2 && next2.length >= j && commonPrefix(split, next2) >= j - 1) {
                break;
              }
              j--;
            }
            i++;
          }
          return globalLocale;
        }
        function isLocaleNameSane(name) {
          return name.match("^[^/\\\\]*$") != null;
        }
        function loadLocale(name) {
          var oldLocale = null, aliasedRequire;
          if (locales[name] === void 0 && typeof module !== "undefined" && module && module.exports && isLocaleNameSane(name)) {
            try {
              oldLocale = globalLocale._abbr;
              aliasedRequire = __require;
              aliasedRequire("./locale/" + name);
              getSetGlobalLocale(oldLocale);
            } catch (e) {
              locales[name] = null;
            }
          }
          return locales[name];
        }
        function getSetGlobalLocale(key, values) {
          var data;
          if (key) {
            if (isUndefined(values)) {
              data = getLocale(key);
            } else {
              data = defineLocale(key, values);
            }
            if (data) {
              globalLocale = data;
            } else {
              if (typeof console !== "undefined" && console.warn) {
                console.warn(
                  "Locale " + key + " not found. Did you forget to load it?"
                );
              }
            }
          }
          return globalLocale._abbr;
        }
        function defineLocale(name, config2) {
          if (config2 !== null) {
            var locale2, parentConfig = baseConfig;
            config2.abbr = name;
            if (locales[name] != null) {
              deprecateSimple(
                "defineLocaleOverride",
                "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
              );
              parentConfig = locales[name]._config;
            } else if (config2.parentLocale != null) {
              if (locales[config2.parentLocale] != null) {
                parentConfig = locales[config2.parentLocale]._config;
              } else {
                locale2 = loadLocale(config2.parentLocale);
                if (locale2 != null) {
                  parentConfig = locale2._config;
                } else {
                  if (!localeFamilies[config2.parentLocale]) {
                    localeFamilies[config2.parentLocale] = [];
                  }
                  localeFamilies[config2.parentLocale].push({
                    name,
                    config: config2
                  });
                  return null;
                }
              }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config2));
            if (localeFamilies[name]) {
              localeFamilies[name].forEach(function(x) {
                defineLocale(x.name, x.config);
              });
            }
            getSetGlobalLocale(name);
            return locales[name];
          } else {
            delete locales[name];
            return null;
          }
        }
        function updateLocale(name, config2) {
          if (config2 != null) {
            var locale2, tmpLocale, parentConfig = baseConfig;
            if (locales[name] != null && locales[name].parentLocale != null) {
              locales[name].set(mergeConfigs(locales[name]._config, config2));
            } else {
              tmpLocale = loadLocale(name);
              if (tmpLocale != null) {
                parentConfig = tmpLocale._config;
              }
              config2 = mergeConfigs(parentConfig, config2);
              if (tmpLocale == null) {
                config2.abbr = name;
              }
              locale2 = new Locale(config2);
              locale2.parentLocale = locales[name];
              locales[name] = locale2;
            }
            getSetGlobalLocale(name);
          } else {
            if (locales[name] != null) {
              if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
                if (name === getSetGlobalLocale()) {
                  getSetGlobalLocale(name);
                }
              } else if (locales[name] != null) {
                delete locales[name];
              }
            }
          }
          return locales[name];
        }
        function getLocale(key) {
          var locale2;
          if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
          }
          if (!key) {
            return globalLocale;
          }
          if (!isArray2(key)) {
            locale2 = loadLocale(key);
            if (locale2) {
              return locale2;
            }
            key = [key];
          }
          return chooseLocale(key);
        }
        function listLocales() {
          return keys(locales);
        }
        function checkOverflow(m) {
          var overflow, a = m._a;
          if (a && getParsingFlags(m).overflow === -2) {
            overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
              overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
              overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
              overflow = WEEKDAY;
            }
            getParsingFlags(m).overflow = overflow;
          }
          return m;
        }
        var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [
          ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
          ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
          ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
          ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
          ["YYYY-DDD", /\d{4}-\d{3}/],
          ["YYYY-MM", /\d{4}-\d\d/, false],
          ["YYYYYYMMDD", /[+-]\d{10}/],
          ["YYYYMMDD", /\d{8}/],
          ["GGGG[W]WWE", /\d{4}W\d{3}/],
          ["GGGG[W]WW", /\d{4}W\d{2}/, false],
          ["YYYYDDD", /\d{7}/],
          ["YYYYMM", /\d{6}/, false],
          ["YYYY", /\d{4}/, false]
        ], isoTimes = [
          ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
          ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
          ["HH:mm:ss", /\d\d:\d\d:\d\d/],
          ["HH:mm", /\d\d:\d\d/],
          ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
          ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
          ["HHmmss", /\d\d\d\d\d\d/],
          ["HHmm", /\d\d\d\d/],
          ["HH", /\d\d/]
        ], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
          UT: 0,
          GMT: 0,
          EDT: -4 * 60,
          EST: -5 * 60,
          CDT: -5 * 60,
          CST: -6 * 60,
          MDT: -6 * 60,
          MST: -7 * 60,
          PDT: -7 * 60,
          PST: -8 * 60
        };
        function configFromISO(config2) {
          var i, l, string = config2._i, match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string), allowTime, dateFormat, timeFormat, tzFormat, isoDatesLen = isoDates.length, isoTimesLen = isoTimes.length;
          if (match) {
            getParsingFlags(config2).iso = true;
            for (i = 0, l = isoDatesLen; i < l; i++) {
              if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
              }
            }
            if (dateFormat == null) {
              config2._isValid = false;
              return;
            }
            if (match[3]) {
              for (i = 0, l = isoTimesLen; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                  timeFormat = (match[2] || " ") + isoTimes[i][0];
                  break;
                }
              }
              if (timeFormat == null) {
                config2._isValid = false;
                return;
              }
            }
            if (!allowTime && timeFormat != null) {
              config2._isValid = false;
              return;
            }
            if (match[4]) {
              if (tzRegex.exec(match[4])) {
                tzFormat = "Z";
              } else {
                config2._isValid = false;
                return;
              }
            }
            config2._f = dateFormat + (timeFormat || "") + (tzFormat || "");
            configFromStringAndFormat(config2);
          } else {
            config2._isValid = false;
          }
        }
        function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
          var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10)
          ];
          if (secondStr) {
            result.push(parseInt(secondStr, 10));
          }
          return result;
        }
        function untruncateYear(yearStr) {
          var year = parseInt(yearStr, 10);
          if (year <= 49) {
            return 2e3 + year;
          } else if (year <= 999) {
            return 1900 + year;
          }
          return year;
        }
        function preprocessRFC2822(s) {
          return s.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
        }
        function checkWeekday(weekdayStr, parsedInput, config2) {
          if (weekdayStr) {
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = new Date(
              parsedInput[0],
              parsedInput[1],
              parsedInput[2]
            ).getDay();
            if (weekdayProvided !== weekdayActual) {
              getParsingFlags(config2).weekdayMismatch = true;
              config2._isValid = false;
              return false;
            }
          }
          return true;
        }
        function calculateOffset(obsOffset, militaryOffset, numOffset) {
          if (obsOffset) {
            return obsOffsets[obsOffset];
          } else if (militaryOffset) {
            return 0;
          } else {
            var hm = parseInt(numOffset, 10), m = hm % 100, h = (hm - m) / 100;
            return h * 60 + m;
          }
        }
        function configFromRFC2822(config2) {
          var match = rfc2822.exec(preprocessRFC2822(config2._i)), parsedArray;
          if (match) {
            parsedArray = extractFromRFC2822Strings(
              match[4],
              match[3],
              match[2],
              match[5],
              match[6],
              match[7]
            );
            if (!checkWeekday(match[1], parsedArray, config2)) {
              return;
            }
            config2._a = parsedArray;
            config2._tzm = calculateOffset(match[8], match[9], match[10]);
            config2._d = createUTCDate.apply(null, config2._a);
            config2._d.setUTCMinutes(config2._d.getUTCMinutes() - config2._tzm);
            getParsingFlags(config2).rfc2822 = true;
          } else {
            config2._isValid = false;
          }
        }
        function configFromString(config2) {
          var matched = aspNetJsonRegex.exec(config2._i);
          if (matched !== null) {
            config2._d = new Date(+matched[1]);
            return;
          }
          configFromISO(config2);
          if (config2._isValid === false) {
            delete config2._isValid;
          } else {
            return;
          }
          configFromRFC2822(config2);
          if (config2._isValid === false) {
            delete config2._isValid;
          } else {
            return;
          }
          if (config2._strict) {
            config2._isValid = false;
          } else {
            hooks2.createFromInputFallback(config2);
          }
        }
        hooks2.createFromInputFallback = deprecate(
          "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
          function(config2) {
            config2._d = new Date(config2._i + (config2._useUTC ? " UTC" : ""));
          }
        );
        function defaults(a, b, c) {
          if (a != null) {
            return a;
          }
          if (b != null) {
            return b;
          }
          return c;
        }
        function currentDateArray(config2) {
          var nowValue = new Date(hooks2.now());
          if (config2._useUTC) {
            return [
              nowValue.getUTCFullYear(),
              nowValue.getUTCMonth(),
              nowValue.getUTCDate()
            ];
          }
          return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
        }
        function configFromArray(config2) {
          var i, date, input = [], currentDate, expectedWeekday, yearToUse;
          if (config2._d) {
            return;
          }
          currentDate = currentDateArray(config2);
          if (config2._w && config2._a[DATE] == null && config2._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config2);
          }
          if (config2._dayOfYear != null) {
            yearToUse = defaults(config2._a[YEAR], currentDate[YEAR]);
            if (config2._dayOfYear > daysInYear(yearToUse) || config2._dayOfYear === 0) {
              getParsingFlags(config2)._overflowDayOfYear = true;
            }
            date = createUTCDate(yearToUse, 0, config2._dayOfYear);
            config2._a[MONTH] = date.getUTCMonth();
            config2._a[DATE] = date.getUTCDate();
          }
          for (i = 0; i < 3 && config2._a[i] == null; ++i) {
            config2._a[i] = input[i] = currentDate[i];
          }
          for (; i < 7; i++) {
            config2._a[i] = input[i] = config2._a[i] == null ? i === 2 ? 1 : 0 : config2._a[i];
          }
          if (config2._a[HOUR] === 24 && config2._a[MINUTE] === 0 && config2._a[SECOND] === 0 && config2._a[MILLISECOND] === 0) {
            config2._nextDay = true;
            config2._a[HOUR] = 0;
          }
          config2._d = (config2._useUTC ? createUTCDate : createDate).apply(
            null,
            input
          );
          expectedWeekday = config2._useUTC ? config2._d.getUTCDay() : config2._d.getDay();
          if (config2._tzm != null) {
            config2._d.setUTCMinutes(config2._d.getUTCMinutes() - config2._tzm);
          }
          if (config2._nextDay) {
            config2._a[HOUR] = 24;
          }
          if (config2._w && typeof config2._w.d !== "undefined" && config2._w.d !== expectedWeekday) {
            getParsingFlags(config2).weekdayMismatch = true;
          }
        }
        function dayOfYearFromWeekInfo(config2) {
          var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
          w = config2._w;
          if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;
            weekYear = defaults(
              w.GG,
              config2._a[YEAR],
              weekOfYear(createLocal(), 1, 4).year
            );
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
              weekdayOverflow = true;
            }
          } else {
            dow = config2._locale._week.dow;
            doy = config2._locale._week.doy;
            curWeek = weekOfYear(createLocal(), dow, doy);
            weekYear = defaults(w.gg, config2._a[YEAR], curWeek.year);
            week = defaults(w.w, curWeek.week);
            if (w.d != null) {
              weekday = w.d;
              if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
              }
            } else if (w.e != null) {
              weekday = w.e + dow;
              if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
              }
            } else {
              weekday = dow;
            }
          }
          if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config2)._overflowWeeks = true;
          } else if (weekdayOverflow != null) {
            getParsingFlags(config2)._overflowWeekday = true;
          } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config2._a[YEAR] = temp.year;
            config2._dayOfYear = temp.dayOfYear;
          }
        }
        hooks2.ISO_8601 = function() {
        };
        hooks2.RFC_2822 = function() {
        };
        function configFromStringAndFormat(config2) {
          if (config2._f === hooks2.ISO_8601) {
            configFromISO(config2);
            return;
          }
          if (config2._f === hooks2.RFC_2822) {
            configFromRFC2822(config2);
            return;
          }
          config2._a = [];
          getParsingFlags(config2).empty = true;
          var string = "" + config2._i, i, parsedInput, tokens2, token2, skipped, stringLength = string.length, totalParsedInputLength = 0, era, tokenLen;
          tokens2 = expandFormat(config2._f, config2._locale).match(formattingTokens) || [];
          tokenLen = tokens2.length;
          for (i = 0; i < tokenLen; i++) {
            token2 = tokens2[i];
            parsedInput = (string.match(getParseRegexForToken(token2, config2)) || [])[0];
            if (parsedInput) {
              skipped = string.substr(0, string.indexOf(parsedInput));
              if (skipped.length > 0) {
                getParsingFlags(config2).unusedInput.push(skipped);
              }
              string = string.slice(
                string.indexOf(parsedInput) + parsedInput.length
              );
              totalParsedInputLength += parsedInput.length;
            }
            if (formatTokenFunctions[token2]) {
              if (parsedInput) {
                getParsingFlags(config2).empty = false;
              } else {
                getParsingFlags(config2).unusedTokens.push(token2);
              }
              addTimeToArrayFromToken(token2, parsedInput, config2);
            } else if (config2._strict && !parsedInput) {
              getParsingFlags(config2).unusedTokens.push(token2);
            }
          }
          getParsingFlags(config2).charsLeftOver = stringLength - totalParsedInputLength;
          if (string.length > 0) {
            getParsingFlags(config2).unusedInput.push(string);
          }
          if (config2._a[HOUR] <= 12 && getParsingFlags(config2).bigHour === true && config2._a[HOUR] > 0) {
            getParsingFlags(config2).bigHour = void 0;
          }
          getParsingFlags(config2).parsedDateParts = config2._a.slice(0);
          getParsingFlags(config2).meridiem = config2._meridiem;
          config2._a[HOUR] = meridiemFixWrap(
            config2._locale,
            config2._a[HOUR],
            config2._meridiem
          );
          era = getParsingFlags(config2).era;
          if (era !== null) {
            config2._a[YEAR] = config2._locale.erasConvertYear(era, config2._a[YEAR]);
          }
          configFromArray(config2);
          checkOverflow(config2);
        }
        function meridiemFixWrap(locale2, hour, meridiem2) {
          var isPm;
          if (meridiem2 == null) {
            return hour;
          }
          if (locale2.meridiemHour != null) {
            return locale2.meridiemHour(hour, meridiem2);
          } else if (locale2.isPM != null) {
            isPm = locale2.isPM(meridiem2);
            if (isPm && hour < 12) {
              hour += 12;
            }
            if (!isPm && hour === 12) {
              hour = 0;
            }
            return hour;
          } else {
            return hour;
          }
        }
        function configFromStringAndArray(config2) {
          var tempConfig, bestMoment, scoreToBeat, i, currentScore, validFormatFound, bestFormatIsValid = false, configfLen = config2._f.length;
          if (configfLen === 0) {
            getParsingFlags(config2).invalidFormat = true;
            config2._d = new Date(NaN);
            return;
          }
          for (i = 0; i < configfLen; i++) {
            currentScore = 0;
            validFormatFound = false;
            tempConfig = copyConfig({}, config2);
            if (config2._useUTC != null) {
              tempConfig._useUTC = config2._useUTC;
            }
            tempConfig._f = config2._f[i];
            configFromStringAndFormat(tempConfig);
            if (isValid(tempConfig)) {
              validFormatFound = true;
            }
            currentScore += getParsingFlags(tempConfig).charsLeftOver;
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
            getParsingFlags(tempConfig).score = currentScore;
            if (!bestFormatIsValid) {
              if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
                if (validFormatFound) {
                  bestFormatIsValid = true;
                }
              }
            } else {
              if (currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
              }
            }
          }
          extend2(config2, bestMoment || tempConfig);
        }
        function configFromObject(config2) {
          if (config2._d) {
            return;
          }
          var i = normalizeObjectUnits(config2._i), dayOrDate = i.day === void 0 ? i.date : i.day;
          config2._a = map(
            [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
            function(obj) {
              return obj && parseInt(obj, 10);
            }
          );
          configFromArray(config2);
        }
        function createFromConfig(config2) {
          var res = new Moment(checkOverflow(prepareConfig(config2)));
          if (res._nextDay) {
            res.add(1, "d");
            res._nextDay = void 0;
          }
          return res;
        }
        function prepareConfig(config2) {
          var input = config2._i, format2 = config2._f;
          config2._locale = config2._locale || getLocale(config2._l);
          if (input === null || format2 === void 0 && input === "") {
            return createInvalid({ nullInput: true });
          }
          if (typeof input === "string") {
            config2._i = input = config2._locale.preparse(input);
          }
          if (isMoment(input)) {
            return new Moment(checkOverflow(input));
          } else if (isDate(input)) {
            config2._d = input;
          } else if (isArray2(format2)) {
            configFromStringAndArray(config2);
          } else if (format2) {
            configFromStringAndFormat(config2);
          } else {
            configFromInput(config2);
          }
          if (!isValid(config2)) {
            config2._d = null;
          }
          return config2;
        }
        function configFromInput(config2) {
          var input = config2._i;
          if (isUndefined(input)) {
            config2._d = new Date(hooks2.now());
          } else if (isDate(input)) {
            config2._d = new Date(input.valueOf());
          } else if (typeof input === "string") {
            configFromString(config2);
          } else if (isArray2(input)) {
            config2._a = map(input.slice(0), function(obj) {
              return parseInt(obj, 10);
            });
            configFromArray(config2);
          } else if (isObject2(input)) {
            configFromObject(config2);
          } else if (isNumber(input)) {
            config2._d = new Date(input);
          } else {
            hooks2.createFromInputFallback(config2);
          }
        }
        function createLocalOrUTC(input, format2, locale2, strict, isUTC) {
          var c = {};
          if (format2 === true || format2 === false) {
            strict = format2;
            format2 = void 0;
          }
          if (locale2 === true || locale2 === false) {
            strict = locale2;
            locale2 = void 0;
          }
          if (isObject2(input) && isObjectEmpty(input) || isArray2(input) && input.length === 0) {
            input = void 0;
          }
          c._isAMomentObject = true;
          c._useUTC = c._isUTC = isUTC;
          c._l = locale2;
          c._i = input;
          c._f = format2;
          c._strict = strict;
          return createFromConfig(c);
        }
        function createLocal(input, format2, locale2, strict) {
          return createLocalOrUTC(input, format2, locale2, strict, false);
        }
        var prototypeMin = deprecate(
          "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
          function() {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
              return other < this ? this : other;
            } else {
              return createInvalid();
            }
          }
        ), prototypeMax = deprecate(
          "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
          function() {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
              return other > this ? this : other;
            } else {
              return createInvalid();
            }
          }
        );
        function pickBy(fn, moments) {
          var res, i;
          if (moments.length === 1 && isArray2(moments[0])) {
            moments = moments[0];
          }
          if (!moments.length) {
            return createLocal();
          }
          res = moments[0];
          for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
              res = moments[i];
            }
          }
          return res;
        }
        function min() {
          var args = [].slice.call(arguments, 0);
          return pickBy("isBefore", args);
        }
        function max() {
          var args = [].slice.call(arguments, 0);
          return pickBy("isAfter", args);
        }
        var now = function() {
          return Date.now ? Date.now() : +new Date();
        };
        var ordering = [
          "year",
          "quarter",
          "month",
          "week",
          "day",
          "hour",
          "minute",
          "second",
          "millisecond"
        ];
        function isDurationValid(m) {
          var key, unitHasDecimal = false, i, orderLen = ordering.length;
          for (key in m) {
            if (hasOwnProp(m, key) && !(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
              return false;
            }
          }
          for (i = 0; i < orderLen; ++i) {
            if (m[ordering[i]]) {
              if (unitHasDecimal) {
                return false;
              }
              if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                unitHasDecimal = true;
              }
            }
          }
          return true;
        }
        function isValid$1() {
          return this._isValid;
        }
        function createInvalid$1() {
          return createDuration(NaN);
        }
        function Duration(duration) {
          var normalizedInput = normalizeObjectUnits(duration), years2 = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months2 = normalizedInput.month || 0, weeks2 = normalizedInput.week || normalizedInput.isoWeek || 0, days2 = normalizedInput.day || 0, hours2 = normalizedInput.hour || 0, minutes2 = normalizedInput.minute || 0, seconds2 = normalizedInput.second || 0, milliseconds2 = normalizedInput.millisecond || 0;
          this._isValid = isDurationValid(normalizedInput);
          this._milliseconds = +milliseconds2 + seconds2 * 1e3 + minutes2 * 6e4 + hours2 * 1e3 * 60 * 60;
          this._days = +days2 + weeks2 * 7;
          this._months = +months2 + quarters * 3 + years2 * 12;
          this._data = {};
          this._locale = getLocale();
          this._bubble();
        }
        function isDuration(obj) {
          return obj instanceof Duration;
        }
        function absRound(number) {
          if (number < 0) {
            return Math.round(-1 * number) * -1;
          } else {
            return Math.round(number);
          }
        }
        function compareArrays(array1, array2, dontConvert) {
          var len2 = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i;
          for (i = 0; i < len2; i++) {
            if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
              diffs++;
            }
          }
          return diffs + lengthDiff;
        }
        function offset(token2, separator) {
          addFormatToken(token2, 0, 0, function() {
            var offset2 = this.utcOffset(), sign2 = "+";
            if (offset2 < 0) {
              offset2 = -offset2;
              sign2 = "-";
            }
            return sign2 + zeroFill(~~(offset2 / 60), 2) + separator + zeroFill(~~offset2 % 60, 2);
          });
        }
        offset("Z", ":");
        offset("ZZ", "");
        addRegexToken("Z", matchShortOffset);
        addRegexToken("ZZ", matchShortOffset);
        addParseToken(["Z", "ZZ"], function(input, array, config2) {
          config2._useUTC = true;
          config2._tzm = offsetFromString(matchShortOffset, input);
        });
        var chunkOffset = /([\+\-]|\d\d)/gi;
        function offsetFromString(matcher, string) {
          var matches2 = (string || "").match(matcher), chunk, parts, minutes2;
          if (matches2 === null) {
            return null;
          }
          chunk = matches2[matches2.length - 1] || [];
          parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
          minutes2 = +(parts[1] * 60) + toInt(parts[2]);
          return minutes2 === 0 ? 0 : parts[0] === "+" ? minutes2 : -minutes2;
        }
        function cloneWithOffset(input, model2) {
          var res, diff2;
          if (model2._isUTC) {
            res = model2.clone();
            diff2 = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            res._d.setTime(res._d.valueOf() + diff2);
            hooks2.updateOffset(res, false);
            return res;
          } else {
            return createLocal(input).local();
          }
        }
        function getDateOffset(m) {
          return -Math.round(m._d.getTimezoneOffset());
        }
        hooks2.updateOffset = function() {
        };
        function getSetOffset(input, keepLocalTime, keepMinutes) {
          var offset2 = this._offset || 0, localAdjust;
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          if (input != null) {
            if (typeof input === "string") {
              input = offsetFromString(matchShortOffset, input);
              if (input === null) {
                return this;
              }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
              input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
              localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
              this.add(localAdjust, "m");
            }
            if (offset2 !== input) {
              if (!keepLocalTime || this._changeInProgress) {
                addSubtract(
                  this,
                  createDuration(input - offset2, "m"),
                  1,
                  false
                );
              } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks2.updateOffset(this, true);
                this._changeInProgress = null;
              }
            }
            return this;
          } else {
            return this._isUTC ? offset2 : getDateOffset(this);
          }
        }
        function getSetZone(input, keepLocalTime) {
          if (input != null) {
            if (typeof input !== "string") {
              input = -input;
            }
            this.utcOffset(input, keepLocalTime);
            return this;
          } else {
            return -this.utcOffset();
          }
        }
        function setOffsetToUTC(keepLocalTime) {
          return this.utcOffset(0, keepLocalTime);
        }
        function setOffsetToLocal(keepLocalTime) {
          if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;
            if (keepLocalTime) {
              this.subtract(getDateOffset(this), "m");
            }
          }
          return this;
        }
        function setOffsetToParsedOffset() {
          if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
          } else if (typeof this._i === "string") {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
              this.utcOffset(tZone);
            } else {
              this.utcOffset(0, true);
            }
          }
          return this;
        }
        function hasAlignedHourOffset(input) {
          if (!this.isValid()) {
            return false;
          }
          input = input ? createLocal(input).utcOffset() : 0;
          return (this.utcOffset() - input) % 60 === 0;
        }
        function isDaylightSavingTime() {
          return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
        }
        function isDaylightSavingTimeShifted() {
          if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
          }
          var c = {}, other;
          copyConfig(c, this);
          c = prepareConfig(c);
          if (c._a) {
            other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
          } else {
            this._isDSTShifted = false;
          }
          return this._isDSTShifted;
        }
        function isLocal() {
          return this.isValid() ? !this._isUTC : false;
        }
        function isUtcOffset() {
          return this.isValid() ? this._isUTC : false;
        }
        function isUtc() {
          return this.isValid() ? this._isUTC && this._offset === 0 : false;
        }
        var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
        function createDuration(input, key) {
          var duration = input, match = null, sign2, ret, diffRes;
          if (isDuration(input)) {
            duration = {
              ms: input._milliseconds,
              d: input._days,
              M: input._months
            };
          } else if (isNumber(input) || !isNaN(+input)) {
            duration = {};
            if (key) {
              duration[key] = +input;
            } else {
              duration.milliseconds = +input;
            }
          } else if (match = aspNetRegex.exec(input)) {
            sign2 = match[1] === "-" ? -1 : 1;
            duration = {
              y: 0,
              d: toInt(match[DATE]) * sign2,
              h: toInt(match[HOUR]) * sign2,
              m: toInt(match[MINUTE]) * sign2,
              s: toInt(match[SECOND]) * sign2,
              ms: toInt(absRound(match[MILLISECOND] * 1e3)) * sign2
            };
          } else if (match = isoRegex.exec(input)) {
            sign2 = match[1] === "-" ? -1 : 1;
            duration = {
              y: parseIso(match[2], sign2),
              M: parseIso(match[3], sign2),
              w: parseIso(match[4], sign2),
              d: parseIso(match[5], sign2),
              h: parseIso(match[6], sign2),
              m: parseIso(match[7], sign2),
              s: parseIso(match[8], sign2)
            };
          } else if (duration == null) {
            duration = {};
          } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
            diffRes = momentsDifference(
              createLocal(duration.from),
              createLocal(duration.to)
            );
            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
          }
          ret = new Duration(duration);
          if (isDuration(input) && hasOwnProp(input, "_locale")) {
            ret._locale = input._locale;
          }
          if (isDuration(input) && hasOwnProp(input, "_isValid")) {
            ret._isValid = input._isValid;
          }
          return ret;
        }
        createDuration.fn = Duration.prototype;
        createDuration.invalid = createInvalid$1;
        function parseIso(inp, sign2) {
          var res = inp && parseFloat(inp.replace(",", "."));
          return (isNaN(res) ? 0 : res) * sign2;
        }
        function positiveMomentsDifference(base, other) {
          var res = {};
          res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
          if (base.clone().add(res.months, "M").isAfter(other)) {
            --res.months;
          }
          res.milliseconds = +other - +base.clone().add(res.months, "M");
          return res;
        }
        function momentsDifference(base, other) {
          var res;
          if (!(base.isValid() && other.isValid())) {
            return { milliseconds: 0, months: 0 };
          }
          other = cloneWithOffset(other, base);
          if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
          } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
          }
          return res;
        }
        function createAdder(direction, name) {
          return function(val, period) {
            var dur, tmp;
            if (period !== null && !isNaN(+period)) {
              deprecateSimple(
                name,
                "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
              );
              tmp = val;
              val = period;
              period = tmp;
            }
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
          };
        }
        function addSubtract(mom, duration, isAdding, updateOffset) {
          var milliseconds2 = duration._milliseconds, days2 = absRound(duration._days), months2 = absRound(duration._months);
          if (!mom.isValid()) {
            return;
          }
          updateOffset = updateOffset == null ? true : updateOffset;
          if (months2) {
            setMonth(mom, get(mom, "Month") + months2 * isAdding);
          }
          if (days2) {
            set$1(mom, "Date", get(mom, "Date") + days2 * isAdding);
          }
          if (milliseconds2) {
            mom._d.setTime(mom._d.valueOf() + milliseconds2 * isAdding);
          }
          if (updateOffset) {
            hooks2.updateOffset(mom, days2 || months2);
          }
        }
        var add2 = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
        function isString(input) {
          return typeof input === "string" || input instanceof String;
        }
        function isMomentInput(input) {
          return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === void 0;
        }
        function isMomentInputObject(input) {
          var objectTest = isObject2(input) && !isObjectEmpty(input), propertyTest = false, properties = [
            "years",
            "year",
            "y",
            "months",
            "month",
            "M",
            "days",
            "day",
            "d",
            "dates",
            "date",
            "D",
            "hours",
            "hour",
            "h",
            "minutes",
            "minute",
            "m",
            "seconds",
            "second",
            "s",
            "milliseconds",
            "millisecond",
            "ms"
          ], i, property, propertyLen = properties.length;
          for (i = 0; i < propertyLen; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
          }
          return objectTest && propertyTest;
        }
        function isNumberOrStringArray(input) {
          var arrayTest = isArray2(input), dataTypeTest = false;
          if (arrayTest) {
            dataTypeTest = input.filter(function(item) {
              return !isNumber(item) && isString(input);
            }).length === 0;
          }
          return arrayTest && dataTypeTest;
        }
        function isCalendarSpec(input) {
          var objectTest = isObject2(input) && !isObjectEmpty(input), propertyTest = false, properties = [
            "sameDay",
            "nextDay",
            "lastDay",
            "nextWeek",
            "lastWeek",
            "sameElse"
          ], i, property;
          for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
          }
          return objectTest && propertyTest;
        }
        function getCalendarFormat(myMoment, now2) {
          var diff2 = myMoment.diff(now2, "days", true);
          return diff2 < -6 ? "sameElse" : diff2 < -1 ? "lastWeek" : diff2 < 0 ? "lastDay" : diff2 < 1 ? "sameDay" : diff2 < 2 ? "nextDay" : diff2 < 7 ? "nextWeek" : "sameElse";
        }
        function calendar$1(time, formats) {
          if (arguments.length === 1) {
            if (!arguments[0]) {
              time = void 0;
              formats = void 0;
            } else if (isMomentInput(arguments[0])) {
              time = arguments[0];
              formats = void 0;
            } else if (isCalendarSpec(arguments[0])) {
              formats = arguments[0];
              time = void 0;
            }
          }
          var now2 = time || createLocal(), sod = cloneWithOffset(now2, this).startOf("day"), format2 = hooks2.calendarFormat(this, sod) || "sameElse", output = formats && (isFunction2(formats[format2]) ? formats[format2].call(this, now2) : formats[format2]);
          return this.format(
            output || this.localeData().calendar(format2, this, createLocal(now2))
          );
        }
        function clone() {
          return new Moment(this);
        }
        function isAfter(input, units) {
          var localInput = isMoment(input) ? input : createLocal(input);
          if (!(this.isValid() && localInput.isValid())) {
            return false;
          }
          units = normalizeUnits(units) || "millisecond";
          if (units === "millisecond") {
            return this.valueOf() > localInput.valueOf();
          } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
          }
        }
        function isBefore(input, units) {
          var localInput = isMoment(input) ? input : createLocal(input);
          if (!(this.isValid() && localInput.isValid())) {
            return false;
          }
          units = normalizeUnits(units) || "millisecond";
          if (units === "millisecond") {
            return this.valueOf() < localInput.valueOf();
          } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
          }
        }
        function isBetween(from2, to2, units, inclusivity) {
          var localFrom = isMoment(from2) ? from2 : createLocal(from2), localTo = isMoment(to2) ? to2 : createLocal(to2);
          if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
          }
          inclusivity = inclusivity || "()";
          return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
        }
        function isSame(input, units) {
          var localInput = isMoment(input) ? input : createLocal(input), inputMs;
          if (!(this.isValid() && localInput.isValid())) {
            return false;
          }
          units = normalizeUnits(units) || "millisecond";
          if (units === "millisecond") {
            return this.valueOf() === localInput.valueOf();
          } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
          }
        }
        function isSameOrAfter(input, units) {
          return this.isSame(input, units) || this.isAfter(input, units);
        }
        function isSameOrBefore(input, units) {
          return this.isSame(input, units) || this.isBefore(input, units);
        }
        function diff(input, units, asFloat) {
          var that, zoneDelta, output;
          if (!this.isValid()) {
            return NaN;
          }
          that = cloneWithOffset(input, this);
          if (!that.isValid()) {
            return NaN;
          }
          zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
          units = normalizeUnits(units);
          switch (units) {
            case "year":
              output = monthDiff(this, that) / 12;
              break;
            case "month":
              output = monthDiff(this, that);
              break;
            case "quarter":
              output = monthDiff(this, that) / 3;
              break;
            case "second":
              output = (this - that) / 1e3;
              break;
            case "minute":
              output = (this - that) / 6e4;
              break;
            case "hour":
              output = (this - that) / 36e5;
              break;
            case "day":
              output = (this - that - zoneDelta) / 864e5;
              break;
            case "week":
              output = (this - that - zoneDelta) / 6048e5;
              break;
            default:
              output = this - that;
          }
          return asFloat ? output : absFloor(output);
        }
        function monthDiff(a, b) {
          if (a.date() < b.date()) {
            return -monthDiff(b, a);
          }
          var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
          if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
            adjust = (b - anchor) / (anchor - anchor2);
          } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
            adjust = (b - anchor) / (anchor2 - anchor);
          }
          return -(wholeMonthDiff + adjust) || 0;
        }
        hooks2.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
        hooks2.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
        function toString2() {
          return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        }
        function toISOString(keepOffset) {
          if (!this.isValid()) {
            return null;
          }
          var utc = keepOffset !== true, m = utc ? this.clone().utc() : this;
          if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(
              m,
              utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
            );
          }
          if (isFunction2(Date.prototype.toISOString)) {
            if (utc) {
              return this.toDate().toISOString();
            } else {
              return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", formatMoment(m, "Z"));
            }
          }
          return formatMoment(
            m,
            utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
          );
        }
        function inspect() {
          if (!this.isValid()) {
            return "moment.invalid(/* " + this._i + " */)";
          }
          var func = "moment", zone = "", prefix, year, datetime, suffix;
          if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
            zone = "Z";
          }
          prefix = "[" + func + '("]';
          year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
          datetime = "-MM-DD[T]HH:mm:ss.SSS";
          suffix = zone + '[")]';
          return this.format(prefix + year + datetime + suffix);
        }
        function format(inputString) {
          if (!inputString) {
            inputString = this.isUtc() ? hooks2.defaultFormatUtc : hooks2.defaultFormat;
          }
          var output = formatMoment(this, inputString);
          return this.localeData().postformat(output);
        }
        function from(time, withoutSuffix) {
          if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
            return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
          } else {
            return this.localeData().invalidDate();
          }
        }
        function fromNow(withoutSuffix) {
          return this.from(createLocal(), withoutSuffix);
        }
        function to(time, withoutSuffix) {
          if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
            return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
          } else {
            return this.localeData().invalidDate();
          }
        }
        function toNow(withoutSuffix) {
          return this.to(createLocal(), withoutSuffix);
        }
        function locale(key) {
          var newLocaleData;
          if (key === void 0) {
            return this._locale._abbr;
          } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
              this._locale = newLocaleData;
            }
            return this;
          }
        }
        var lang = deprecate(
          "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
          function(key) {
            if (key === void 0) {
              return this.localeData();
            } else {
              return this.locale(key);
            }
          }
        );
        function localeData() {
          return this._locale;
        }
        var MS_PER_SECOND = 1e3, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
        function mod$1(dividend, divisor) {
          return (dividend % divisor + divisor) % divisor;
        }
        function localStartOfDate(y, m, d) {
          if (y < 100 && y >= 0) {
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
          } else {
            return new Date(y, m, d).valueOf();
          }
        }
        function utcStartOfDate(y, m, d) {
          if (y < 100 && y >= 0) {
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
          } else {
            return Date.UTC(y, m, d);
          }
        }
        function startOf(units) {
          var time, startOfDate;
          units = normalizeUnits(units);
          if (units === void 0 || units === "millisecond" || !this.isValid()) {
            return this;
          }
          startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
          switch (units) {
            case "year":
              time = startOfDate(this.year(), 0, 1);
              break;
            case "quarter":
              time = startOfDate(
                this.year(),
                this.month() - this.month() % 3,
                1
              );
              break;
            case "month":
              time = startOfDate(this.year(), this.month(), 1);
              break;
            case "week":
              time = startOfDate(
                this.year(),
                this.month(),
                this.date() - this.weekday()
              );
              break;
            case "isoWeek":
              time = startOfDate(
                this.year(),
                this.month(),
                this.date() - (this.isoWeekday() - 1)
              );
              break;
            case "day":
            case "date":
              time = startOfDate(this.year(), this.month(), this.date());
              break;
            case "hour":
              time = this._d.valueOf();
              time -= mod$1(
                time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                MS_PER_HOUR
              );
              break;
            case "minute":
              time = this._d.valueOf();
              time -= mod$1(time, MS_PER_MINUTE);
              break;
            case "second":
              time = this._d.valueOf();
              time -= mod$1(time, MS_PER_SECOND);
              break;
          }
          this._d.setTime(time);
          hooks2.updateOffset(this, true);
          return this;
        }
        function endOf(units) {
          var time, startOfDate;
          units = normalizeUnits(units);
          if (units === void 0 || units === "millisecond" || !this.isValid()) {
            return this;
          }
          startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
          switch (units) {
            case "year":
              time = startOfDate(this.year() + 1, 0, 1) - 1;
              break;
            case "quarter":
              time = startOfDate(
                this.year(),
                this.month() - this.month() % 3 + 3,
                1
              ) - 1;
              break;
            case "month":
              time = startOfDate(this.year(), this.month() + 1, 1) - 1;
              break;
            case "week":
              time = startOfDate(
                this.year(),
                this.month(),
                this.date() - this.weekday() + 7
              ) - 1;
              break;
            case "isoWeek":
              time = startOfDate(
                this.year(),
                this.month(),
                this.date() - (this.isoWeekday() - 1) + 7
              ) - 1;
              break;
            case "day":
            case "date":
              time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
              break;
            case "hour":
              time = this._d.valueOf();
              time += MS_PER_HOUR - mod$1(
                time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                MS_PER_HOUR
              ) - 1;
              break;
            case "minute":
              time = this._d.valueOf();
              time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
              break;
            case "second":
              time = this._d.valueOf();
              time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
              break;
          }
          this._d.setTime(time);
          hooks2.updateOffset(this, true);
          return this;
        }
        function valueOf() {
          return this._d.valueOf() - (this._offset || 0) * 6e4;
        }
        function unix() {
          return Math.floor(this.valueOf() / 1e3);
        }
        function toDate() {
          return new Date(this.valueOf());
        }
        function toArray2() {
          var m = this;
          return [
            m.year(),
            m.month(),
            m.date(),
            m.hour(),
            m.minute(),
            m.second(),
            m.millisecond()
          ];
        }
        function toObject2() {
          var m = this;
          return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
          };
        }
        function toJSON() {
          return this.isValid() ? this.toISOString() : null;
        }
        function isValid$2() {
          return isValid(this);
        }
        function parsingFlags() {
          return extend2({}, getParsingFlags(this));
        }
        function invalidAt() {
          return getParsingFlags(this).overflow;
        }
        function creationData() {
          return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
          };
        }
        addFormatToken("N", 0, 0, "eraAbbr");
        addFormatToken("NN", 0, 0, "eraAbbr");
        addFormatToken("NNN", 0, 0, "eraAbbr");
        addFormatToken("NNNN", 0, 0, "eraName");
        addFormatToken("NNNNN", 0, 0, "eraNarrow");
        addFormatToken("y", ["y", 1], "yo", "eraYear");
        addFormatToken("y", ["yy", 2], 0, "eraYear");
        addFormatToken("y", ["yyy", 3], 0, "eraYear");
        addFormatToken("y", ["yyyy", 4], 0, "eraYear");
        addRegexToken("N", matchEraAbbr);
        addRegexToken("NN", matchEraAbbr);
        addRegexToken("NNN", matchEraAbbr);
        addRegexToken("NNNN", matchEraName);
        addRegexToken("NNNNN", matchEraNarrow);
        addParseToken(
          ["N", "NN", "NNN", "NNNN", "NNNNN"],
          function(input, array, config2, token2) {
            var era = config2._locale.erasParse(input, token2, config2._strict);
            if (era) {
              getParsingFlags(config2).era = era;
            } else {
              getParsingFlags(config2).invalidEra = input;
            }
          }
        );
        addRegexToken("y", matchUnsigned);
        addRegexToken("yy", matchUnsigned);
        addRegexToken("yyy", matchUnsigned);
        addRegexToken("yyyy", matchUnsigned);
        addRegexToken("yo", matchEraYearOrdinal);
        addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
        addParseToken(["yo"], function(input, array, config2, token2) {
          var match;
          if (config2._locale._eraYearOrdinalRegex) {
            match = input.match(config2._locale._eraYearOrdinalRegex);
          }
          if (config2._locale.eraYearOrdinalParse) {
            array[YEAR] = config2._locale.eraYearOrdinalParse(input, match);
          } else {
            array[YEAR] = parseInt(input, 10);
          }
        });
        function localeEras(m, format2) {
          var i, l, date, eras = this._eras || getLocale("en")._eras;
          for (i = 0, l = eras.length; i < l; ++i) {
            switch (typeof eras[i].since) {
              case "string":
                date = hooks2(eras[i].since).startOf("day");
                eras[i].since = date.valueOf();
                break;
            }
            switch (typeof eras[i].until) {
              case "undefined":
                eras[i].until = Infinity;
                break;
              case "string":
                date = hooks2(eras[i].until).startOf("day").valueOf();
                eras[i].until = date.valueOf();
                break;
            }
          }
          return eras;
        }
        function localeErasParse(eraName, format2, strict) {
          var i, l, eras = this.eras(), name, abbr, narrow;
          eraName = eraName.toUpperCase();
          for (i = 0, l = eras.length; i < l; ++i) {
            name = eras[i].name.toUpperCase();
            abbr = eras[i].abbr.toUpperCase();
            narrow = eras[i].narrow.toUpperCase();
            if (strict) {
              switch (format2) {
                case "N":
                case "NN":
                case "NNN":
                  if (abbr === eraName) {
                    return eras[i];
                  }
                  break;
                case "NNNN":
                  if (name === eraName) {
                    return eras[i];
                  }
                  break;
                case "NNNNN":
                  if (narrow === eraName) {
                    return eras[i];
                  }
                  break;
              }
            } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
              return eras[i];
            }
          }
        }
        function localeErasConvertYear(era, year) {
          var dir = era.since <= era.until ? 1 : -1;
          if (year === void 0) {
            return hooks2(era.since).year();
          } else {
            return hooks2(era.since).year() + (year - era.offset) * dir;
          }
        }
        function getEraName() {
          var i, l, val, eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            val = this.clone().startOf("day").valueOf();
            if (eras[i].since <= val && val <= eras[i].until) {
              return eras[i].name;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
              return eras[i].name;
            }
          }
          return "";
        }
        function getEraNarrow() {
          var i, l, val, eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            val = this.clone().startOf("day").valueOf();
            if (eras[i].since <= val && val <= eras[i].until) {
              return eras[i].narrow;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
              return eras[i].narrow;
            }
          }
          return "";
        }
        function getEraAbbr() {
          var i, l, val, eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            val = this.clone().startOf("day").valueOf();
            if (eras[i].since <= val && val <= eras[i].until) {
              return eras[i].abbr;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
              return eras[i].abbr;
            }
          }
          return "";
        }
        function getEraYear() {
          var i, l, dir, val, eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            dir = eras[i].since <= eras[i].until ? 1 : -1;
            val = this.clone().startOf("day").valueOf();
            if (eras[i].since <= val && val <= eras[i].until || eras[i].until <= val && val <= eras[i].since) {
              return (this.year() - hooks2(eras[i].since).year()) * dir + eras[i].offset;
            }
          }
          return this.year();
        }
        function erasNameRegex(isStrict) {
          if (!hasOwnProp(this, "_erasNameRegex")) {
            computeErasParse.call(this);
          }
          return isStrict ? this._erasNameRegex : this._erasRegex;
        }
        function erasAbbrRegex(isStrict) {
          if (!hasOwnProp(this, "_erasAbbrRegex")) {
            computeErasParse.call(this);
          }
          return isStrict ? this._erasAbbrRegex : this._erasRegex;
        }
        function erasNarrowRegex(isStrict) {
          if (!hasOwnProp(this, "_erasNarrowRegex")) {
            computeErasParse.call(this);
          }
          return isStrict ? this._erasNarrowRegex : this._erasRegex;
        }
        function matchEraAbbr(isStrict, locale2) {
          return locale2.erasAbbrRegex(isStrict);
        }
        function matchEraName(isStrict, locale2) {
          return locale2.erasNameRegex(isStrict);
        }
        function matchEraNarrow(isStrict, locale2) {
          return locale2.erasNarrowRegex(isStrict);
        }
        function matchEraYearOrdinal(isStrict, locale2) {
          return locale2._eraYearOrdinalRegex || matchUnsigned;
        }
        function computeErasParse() {
          var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i, l, eras = this.eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            namePieces.push(regexEscape(eras[i].name));
            abbrPieces.push(regexEscape(eras[i].abbr));
            narrowPieces.push(regexEscape(eras[i].narrow));
            mixedPieces.push(regexEscape(eras[i].name));
            mixedPieces.push(regexEscape(eras[i].abbr));
            mixedPieces.push(regexEscape(eras[i].narrow));
          }
          this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
          this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
          this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
          this._erasNarrowRegex = new RegExp(
            "^(" + narrowPieces.join("|") + ")",
            "i"
          );
        }
        addFormatToken(0, ["gg", 2], 0, function() {
          return this.weekYear() % 100;
        });
        addFormatToken(0, ["GG", 2], 0, function() {
          return this.isoWeekYear() % 100;
        });
        function addWeekYearFormatToken(token2, getter) {
          addFormatToken(0, [token2, token2.length], 0, getter);
        }
        addWeekYearFormatToken("gggg", "weekYear");
        addWeekYearFormatToken("ggggg", "weekYear");
        addWeekYearFormatToken("GGGG", "isoWeekYear");
        addWeekYearFormatToken("GGGGG", "isoWeekYear");
        addUnitAlias("weekYear", "gg");
        addUnitAlias("isoWeekYear", "GG");
        addUnitPriority("weekYear", 1);
        addUnitPriority("isoWeekYear", 1);
        addRegexToken("G", matchSigned);
        addRegexToken("g", matchSigned);
        addRegexToken("GG", match1to2, match2);
        addRegexToken("gg", match1to2, match2);
        addRegexToken("GGGG", match1to4, match4);
        addRegexToken("gggg", match1to4, match4);
        addRegexToken("GGGGG", match1to6, match6);
        addRegexToken("ggggg", match1to6, match6);
        addWeekParseToken(
          ["gggg", "ggggg", "GGGG", "GGGGG"],
          function(input, week, config2, token2) {
            week[token2.substr(0, 2)] = toInt(input);
          }
        );
        addWeekParseToken(["gg", "GG"], function(input, week, config2, token2) {
          week[token2] = hooks2.parseTwoDigitYear(input);
        });
        function getSetWeekYear(input) {
          return getSetWeekYearHelper.call(
            this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy
          );
        }
        function getSetISOWeekYear(input) {
          return getSetWeekYearHelper.call(
            this,
            input,
            this.isoWeek(),
            this.isoWeekday(),
            1,
            4
          );
        }
        function getISOWeeksInYear() {
          return weeksInYear(this.year(), 1, 4);
        }
        function getISOWeeksInISOWeekYear() {
          return weeksInYear(this.isoWeekYear(), 1, 4);
        }
        function getWeeksInYear() {
          var weekInfo = this.localeData()._week;
          return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
        }
        function getWeeksInWeekYear() {
          var weekInfo = this.localeData()._week;
          return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
        }
        function getSetWeekYearHelper(input, week, weekday, dow, doy) {
          var weeksTarget;
          if (input == null) {
            return weekOfYear(this, dow, doy).year;
          } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
              week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
          }
        }
        function setWeekAll(weekYear, week, weekday, dow, doy) {
          var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
          this.year(date.getUTCFullYear());
          this.month(date.getUTCMonth());
          this.date(date.getUTCDate());
          return this;
        }
        addFormatToken("Q", 0, "Qo", "quarter");
        addUnitAlias("quarter", "Q");
        addUnitPriority("quarter", 7);
        addRegexToken("Q", match1);
        addParseToken("Q", function(input, array) {
          array[MONTH] = (toInt(input) - 1) * 3;
        });
        function getSetQuarter(input) {
          return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
        }
        addFormatToken("D", ["DD", 2], "Do", "date");
        addUnitAlias("date", "D");
        addUnitPriority("date", 9);
        addRegexToken("D", match1to2);
        addRegexToken("DD", match1to2, match2);
        addRegexToken("Do", function(isStrict, locale2) {
          return isStrict ? locale2._dayOfMonthOrdinalParse || locale2._ordinalParse : locale2._dayOfMonthOrdinalParseLenient;
        });
        addParseToken(["D", "DD"], DATE);
        addParseToken("Do", function(input, array) {
          array[DATE] = toInt(input.match(match1to2)[0]);
        });
        var getSetDayOfMonth = makeGetSet("Date", true);
        addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
        addUnitAlias("dayOfYear", "DDD");
        addUnitPriority("dayOfYear", 4);
        addRegexToken("DDD", match1to3);
        addRegexToken("DDDD", match3);
        addParseToken(["DDD", "DDDD"], function(input, array, config2) {
          config2._dayOfYear = toInt(input);
        });
        function getSetDayOfYear(input) {
          var dayOfYear = Math.round(
            (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
          ) + 1;
          return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
        }
        addFormatToken("m", ["mm", 2], 0, "minute");
        addUnitAlias("minute", "m");
        addUnitPriority("minute", 14);
        addRegexToken("m", match1to2);
        addRegexToken("mm", match1to2, match2);
        addParseToken(["m", "mm"], MINUTE);
        var getSetMinute = makeGetSet("Minutes", false);
        addFormatToken("s", ["ss", 2], 0, "second");
        addUnitAlias("second", "s");
        addUnitPriority("second", 15);
        addRegexToken("s", match1to2);
        addRegexToken("ss", match1to2, match2);
        addParseToken(["s", "ss"], SECOND);
        var getSetSecond = makeGetSet("Seconds", false);
        addFormatToken("S", 0, 0, function() {
          return ~~(this.millisecond() / 100);
        });
        addFormatToken(0, ["SS", 2], 0, function() {
          return ~~(this.millisecond() / 10);
        });
        addFormatToken(0, ["SSS", 3], 0, "millisecond");
        addFormatToken(0, ["SSSS", 4], 0, function() {
          return this.millisecond() * 10;
        });
        addFormatToken(0, ["SSSSS", 5], 0, function() {
          return this.millisecond() * 100;
        });
        addFormatToken(0, ["SSSSSS", 6], 0, function() {
          return this.millisecond() * 1e3;
        });
        addFormatToken(0, ["SSSSSSS", 7], 0, function() {
          return this.millisecond() * 1e4;
        });
        addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
          return this.millisecond() * 1e5;
        });
        addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
          return this.millisecond() * 1e6;
        });
        addUnitAlias("millisecond", "ms");
        addUnitPriority("millisecond", 16);
        addRegexToken("S", match1to3, match1);
        addRegexToken("SS", match1to3, match2);
        addRegexToken("SSS", match1to3, match3);
        var token, getSetMillisecond;
        for (token = "SSSS"; token.length <= 9; token += "S") {
          addRegexToken(token, matchUnsigned);
        }
        function parseMs(input, array) {
          array[MILLISECOND] = toInt(("0." + input) * 1e3);
        }
        for (token = "S"; token.length <= 9; token += "S") {
          addParseToken(token, parseMs);
        }
        getSetMillisecond = makeGetSet("Milliseconds", false);
        addFormatToken("z", 0, 0, "zoneAbbr");
        addFormatToken("zz", 0, 0, "zoneName");
        function getZoneAbbr() {
          return this._isUTC ? "UTC" : "";
        }
        function getZoneName() {
          return this._isUTC ? "Coordinated Universal Time" : "";
        }
        var proto = Moment.prototype;
        proto.add = add2;
        proto.calendar = calendar$1;
        proto.clone = clone;
        proto.diff = diff;
        proto.endOf = endOf;
        proto.format = format;
        proto.from = from;
        proto.fromNow = fromNow;
        proto.to = to;
        proto.toNow = toNow;
        proto.get = stringGet;
        proto.invalidAt = invalidAt;
        proto.isAfter = isAfter;
        proto.isBefore = isBefore;
        proto.isBetween = isBetween;
        proto.isSame = isSame;
        proto.isSameOrAfter = isSameOrAfter;
        proto.isSameOrBefore = isSameOrBefore;
        proto.isValid = isValid$2;
        proto.lang = lang;
        proto.locale = locale;
        proto.localeData = localeData;
        proto.max = prototypeMax;
        proto.min = prototypeMin;
        proto.parsingFlags = parsingFlags;
        proto.set = stringSet;
        proto.startOf = startOf;
        proto.subtract = subtract;
        proto.toArray = toArray2;
        proto.toObject = toObject2;
        proto.toDate = toDate;
        proto.toISOString = toISOString;
        proto.inspect = inspect;
        if (typeof Symbol !== "undefined" && Symbol.for != null) {
          proto[Symbol.for("nodejs.util.inspect.custom")] = function() {
            return "Moment<" + this.format() + ">";
          };
        }
        proto.toJSON = toJSON;
        proto.toString = toString2;
        proto.unix = unix;
        proto.valueOf = valueOf;
        proto.creationData = creationData;
        proto.eraName = getEraName;
        proto.eraNarrow = getEraNarrow;
        proto.eraAbbr = getEraAbbr;
        proto.eraYear = getEraYear;
        proto.year = getSetYear;
        proto.isLeapYear = getIsLeapYear;
        proto.weekYear = getSetWeekYear;
        proto.isoWeekYear = getSetISOWeekYear;
        proto.quarter = proto.quarters = getSetQuarter;
        proto.month = getSetMonth;
        proto.daysInMonth = getDaysInMonth;
        proto.week = proto.weeks = getSetWeek;
        proto.isoWeek = proto.isoWeeks = getSetISOWeek;
        proto.weeksInYear = getWeeksInYear;
        proto.weeksInWeekYear = getWeeksInWeekYear;
        proto.isoWeeksInYear = getISOWeeksInYear;
        proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
        proto.date = getSetDayOfMonth;
        proto.day = proto.days = getSetDayOfWeek;
        proto.weekday = getSetLocaleDayOfWeek;
        proto.isoWeekday = getSetISODayOfWeek;
        proto.dayOfYear = getSetDayOfYear;
        proto.hour = proto.hours = getSetHour;
        proto.minute = proto.minutes = getSetMinute;
        proto.second = proto.seconds = getSetSecond;
        proto.millisecond = proto.milliseconds = getSetMillisecond;
        proto.utcOffset = getSetOffset;
        proto.utc = setOffsetToUTC;
        proto.local = setOffsetToLocal;
        proto.parseZone = setOffsetToParsedOffset;
        proto.hasAlignedHourOffset = hasAlignedHourOffset;
        proto.isDST = isDaylightSavingTime;
        proto.isLocal = isLocal;
        proto.isUtcOffset = isUtcOffset;
        proto.isUtc = isUtc;
        proto.isUTC = isUtc;
        proto.zoneAbbr = getZoneAbbr;
        proto.zoneName = getZoneName;
        proto.dates = deprecate(
          "dates accessor is deprecated. Use date instead.",
          getSetDayOfMonth
        );
        proto.months = deprecate(
          "months accessor is deprecated. Use month instead",
          getSetMonth
        );
        proto.years = deprecate(
          "years accessor is deprecated. Use year instead",
          getSetYear
        );
        proto.zone = deprecate(
          "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
          getSetZone
        );
        proto.isDSTShifted = deprecate(
          "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
          isDaylightSavingTimeShifted
        );
        function createUnix(input) {
          return createLocal(input * 1e3);
        }
        function createInZone() {
          return createLocal.apply(null, arguments).parseZone();
        }
        function preParsePostFormat(string) {
          return string;
        }
        var proto$1 = Locale.prototype;
        proto$1.calendar = calendar;
        proto$1.longDateFormat = longDateFormat;
        proto$1.invalidDate = invalidDate;
        proto$1.ordinal = ordinal;
        proto$1.preparse = preParsePostFormat;
        proto$1.postformat = preParsePostFormat;
        proto$1.relativeTime = relativeTime;
        proto$1.pastFuture = pastFuture;
        proto$1.set = set2;
        proto$1.eras = localeEras;
        proto$1.erasParse = localeErasParse;
        proto$1.erasConvertYear = localeErasConvertYear;
        proto$1.erasAbbrRegex = erasAbbrRegex;
        proto$1.erasNameRegex = erasNameRegex;
        proto$1.erasNarrowRegex = erasNarrowRegex;
        proto$1.months = localeMonths;
        proto$1.monthsShort = localeMonthsShort;
        proto$1.monthsParse = localeMonthsParse;
        proto$1.monthsRegex = monthsRegex;
        proto$1.monthsShortRegex = monthsShortRegex;
        proto$1.week = localeWeek;
        proto$1.firstDayOfYear = localeFirstDayOfYear;
        proto$1.firstDayOfWeek = localeFirstDayOfWeek;
        proto$1.weekdays = localeWeekdays;
        proto$1.weekdaysMin = localeWeekdaysMin;
        proto$1.weekdaysShort = localeWeekdaysShort;
        proto$1.weekdaysParse = localeWeekdaysParse;
        proto$1.weekdaysRegex = weekdaysRegex;
        proto$1.weekdaysShortRegex = weekdaysShortRegex;
        proto$1.weekdaysMinRegex = weekdaysMinRegex;
        proto$1.isPM = localeIsPM;
        proto$1.meridiem = localeMeridiem;
        function get$1(format2, index2, field, setter) {
          var locale2 = getLocale(), utc = createUTC().set(setter, index2);
          return locale2[field](utc, format2);
        }
        function listMonthsImpl(format2, index2, field) {
          if (isNumber(format2)) {
            index2 = format2;
            format2 = void 0;
          }
          format2 = format2 || "";
          if (index2 != null) {
            return get$1(format2, index2, field, "month");
          }
          var i, out = [];
          for (i = 0; i < 12; i++) {
            out[i] = get$1(format2, i, field, "month");
          }
          return out;
        }
        function listWeekdaysImpl(localeSorted, format2, index2, field) {
          if (typeof localeSorted === "boolean") {
            if (isNumber(format2)) {
              index2 = format2;
              format2 = void 0;
            }
            format2 = format2 || "";
          } else {
            format2 = localeSorted;
            index2 = format2;
            localeSorted = false;
            if (isNumber(format2)) {
              index2 = format2;
              format2 = void 0;
            }
            format2 = format2 || "";
          }
          var locale2 = getLocale(), shift = localeSorted ? locale2._week.dow : 0, i, out = [];
          if (index2 != null) {
            return get$1(format2, (index2 + shift) % 7, field, "day");
          }
          for (i = 0; i < 7; i++) {
            out[i] = get$1(format2, (i + shift) % 7, field, "day");
          }
          return out;
        }
        function listMonths(format2, index2) {
          return listMonthsImpl(format2, index2, "months");
        }
        function listMonthsShort(format2, index2) {
          return listMonthsImpl(format2, index2, "monthsShort");
        }
        function listWeekdays(localeSorted, format2, index2) {
          return listWeekdaysImpl(localeSorted, format2, index2, "weekdays");
        }
        function listWeekdaysShort(localeSorted, format2, index2) {
          return listWeekdaysImpl(localeSorted, format2, index2, "weekdaysShort");
        }
        function listWeekdaysMin(localeSorted, format2, index2) {
          return listWeekdaysImpl(localeSorted, format2, index2, "weekdaysMin");
        }
        getSetGlobalLocale("en", {
          eras: [
            {
              since: "0001-01-01",
              until: Infinity,
              offset: 1,
              name: "Anno Domini",
              narrow: "AD",
              abbr: "AD"
            },
            {
              since: "0000-12-31",
              until: -Infinity,
              offset: 1,
              name: "Before Christ",
              narrow: "BC",
              abbr: "BC"
            }
          ],
          dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
          ordinal: function(number) {
            var b = number % 10, output = toInt(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
            return number + output;
          }
        });
        hooks2.lang = deprecate(
          "moment.lang is deprecated. Use moment.locale instead.",
          getSetGlobalLocale
        );
        hooks2.langData = deprecate(
          "moment.langData is deprecated. Use moment.localeData instead.",
          getLocale
        );
        var mathAbs = Math.abs;
        function abs() {
          var data = this._data;
          this._milliseconds = mathAbs(this._milliseconds);
          this._days = mathAbs(this._days);
          this._months = mathAbs(this._months);
          data.milliseconds = mathAbs(data.milliseconds);
          data.seconds = mathAbs(data.seconds);
          data.minutes = mathAbs(data.minutes);
          data.hours = mathAbs(data.hours);
          data.months = mathAbs(data.months);
          data.years = mathAbs(data.years);
          return this;
        }
        function addSubtract$1(duration, input, value, direction) {
          var other = createDuration(input, value);
          duration._milliseconds += direction * other._milliseconds;
          duration._days += direction * other._days;
          duration._months += direction * other._months;
          return duration._bubble();
        }
        function add$12(input, value) {
          return addSubtract$1(this, input, value, 1);
        }
        function subtract$1(input, value) {
          return addSubtract$1(this, input, value, -1);
        }
        function absCeil(number) {
          if (number < 0) {
            return Math.floor(number);
          } else {
            return Math.ceil(number);
          }
        }
        function bubble() {
          var milliseconds2 = this._milliseconds, days2 = this._days, months2 = this._months, data = this._data, seconds2, minutes2, hours2, years2, monthsFromDays;
          if (!(milliseconds2 >= 0 && days2 >= 0 && months2 >= 0 || milliseconds2 <= 0 && days2 <= 0 && months2 <= 0)) {
            milliseconds2 += absCeil(monthsToDays(months2) + days2) * 864e5;
            days2 = 0;
            months2 = 0;
          }
          data.milliseconds = milliseconds2 % 1e3;
          seconds2 = absFloor(milliseconds2 / 1e3);
          data.seconds = seconds2 % 60;
          minutes2 = absFloor(seconds2 / 60);
          data.minutes = minutes2 % 60;
          hours2 = absFloor(minutes2 / 60);
          data.hours = hours2 % 24;
          days2 += absFloor(hours2 / 24);
          monthsFromDays = absFloor(daysToMonths(days2));
          months2 += monthsFromDays;
          days2 -= absCeil(monthsToDays(monthsFromDays));
          years2 = absFloor(months2 / 12);
          months2 %= 12;
          data.days = days2;
          data.months = months2;
          data.years = years2;
          return this;
        }
        function daysToMonths(days2) {
          return days2 * 4800 / 146097;
        }
        function monthsToDays(months2) {
          return months2 * 146097 / 4800;
        }
        function as(units) {
          if (!this.isValid()) {
            return NaN;
          }
          var days2, months2, milliseconds2 = this._milliseconds;
          units = normalizeUnits(units);
          if (units === "month" || units === "quarter" || units === "year") {
            days2 = this._days + milliseconds2 / 864e5;
            months2 = this._months + daysToMonths(days2);
            switch (units) {
              case "month":
                return months2;
              case "quarter":
                return months2 / 3;
              case "year":
                return months2 / 12;
            }
          } else {
            days2 = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
              case "week":
                return days2 / 7 + milliseconds2 / 6048e5;
              case "day":
                return days2 + milliseconds2 / 864e5;
              case "hour":
                return days2 * 24 + milliseconds2 / 36e5;
              case "minute":
                return days2 * 1440 + milliseconds2 / 6e4;
              case "second":
                return days2 * 86400 + milliseconds2 / 1e3;
              case "millisecond":
                return Math.floor(days2 * 864e5) + milliseconds2;
              default:
                throw new Error("Unknown unit " + units);
            }
          }
        }
        function valueOf$1() {
          if (!this.isValid()) {
            return NaN;
          }
          return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
        }
        function makeAs(alias) {
          return function() {
            return this.as(alias);
          };
        }
        var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y");
        function clone$1() {
          return createDuration(this);
        }
        function get$2(units) {
          units = normalizeUnits(units);
          return this.isValid() ? this[units + "s"]() : NaN;
        }
        function makeGetter(name) {
          return function() {
            return this.isValid() ? this._data[name] : NaN;
          };
        }
        var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
        function weeks() {
          return absFloor(this.days() / 7);
        }
        var round = Math.round, thresholds = {
          ss: 44,
          s: 45,
          m: 45,
          h: 22,
          d: 26,
          w: null,
          M: 11
        };
        function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale2) {
          return locale2.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
        }
        function relativeTime$1(posNegDuration, withoutSuffix, thresholds2, locale2) {
          var duration = createDuration(posNegDuration).abs(), seconds2 = round(duration.as("s")), minutes2 = round(duration.as("m")), hours2 = round(duration.as("h")), days2 = round(duration.as("d")), months2 = round(duration.as("M")), weeks2 = round(duration.as("w")), years2 = round(duration.as("y")), a = seconds2 <= thresholds2.ss && ["s", seconds2] || seconds2 < thresholds2.s && ["ss", seconds2] || minutes2 <= 1 && ["m"] || minutes2 < thresholds2.m && ["mm", minutes2] || hours2 <= 1 && ["h"] || hours2 < thresholds2.h && ["hh", hours2] || days2 <= 1 && ["d"] || days2 < thresholds2.d && ["dd", days2];
          if (thresholds2.w != null) {
            a = a || weeks2 <= 1 && ["w"] || weeks2 < thresholds2.w && ["ww", weeks2];
          }
          a = a || months2 <= 1 && ["M"] || months2 < thresholds2.M && ["MM", months2] || years2 <= 1 && ["y"] || ["yy", years2];
          a[2] = withoutSuffix;
          a[3] = +posNegDuration > 0;
          a[4] = locale2;
          return substituteTimeAgo.apply(null, a);
        }
        function getSetRelativeTimeRounding(roundingFunction) {
          if (roundingFunction === void 0) {
            return round;
          }
          if (typeof roundingFunction === "function") {
            round = roundingFunction;
            return true;
          }
          return false;
        }
        function getSetRelativeTimeThreshold(threshold, limit) {
          if (thresholds[threshold] === void 0) {
            return false;
          }
          if (limit === void 0) {
            return thresholds[threshold];
          }
          thresholds[threshold] = limit;
          if (threshold === "s") {
            thresholds.ss = limit - 1;
          }
          return true;
        }
        function humanize(argWithSuffix, argThresholds) {
          if (!this.isValid()) {
            return this.localeData().invalidDate();
          }
          var withSuffix = false, th = thresholds, locale2, output;
          if (typeof argWithSuffix === "object") {
            argThresholds = argWithSuffix;
            argWithSuffix = false;
          }
          if (typeof argWithSuffix === "boolean") {
            withSuffix = argWithSuffix;
          }
          if (typeof argThresholds === "object") {
            th = Object.assign({}, thresholds, argThresholds);
            if (argThresholds.s != null && argThresholds.ss == null) {
              th.ss = argThresholds.s - 1;
            }
          }
          locale2 = this.localeData();
          output = relativeTime$1(this, !withSuffix, th, locale2);
          if (withSuffix) {
            output = locale2.pastFuture(+this, output);
          }
          return locale2.postformat(output);
        }
        var abs$1 = Math.abs;
        function sign(x) {
          return (x > 0) - (x < 0) || +x;
        }
        function toISOString$1() {
          if (!this.isValid()) {
            return this.localeData().invalidDate();
          }
          var seconds2 = abs$1(this._milliseconds) / 1e3, days2 = abs$1(this._days), months2 = abs$1(this._months), minutes2, hours2, years2, s, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
          if (!total) {
            return "P0D";
          }
          minutes2 = absFloor(seconds2 / 60);
          hours2 = absFloor(minutes2 / 60);
          seconds2 %= 60;
          minutes2 %= 60;
          years2 = absFloor(months2 / 12);
          months2 %= 12;
          s = seconds2 ? seconds2.toFixed(3).replace(/\.?0+$/, "") : "";
          totalSign = total < 0 ? "-" : "";
          ymSign = sign(this._months) !== sign(total) ? "-" : "";
          daysSign = sign(this._days) !== sign(total) ? "-" : "";
          hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
          return totalSign + "P" + (years2 ? ymSign + years2 + "Y" : "") + (months2 ? ymSign + months2 + "M" : "") + (days2 ? daysSign + days2 + "D" : "") + (hours2 || minutes2 || seconds2 ? "T" : "") + (hours2 ? hmsSign + hours2 + "H" : "") + (minutes2 ? hmsSign + minutes2 + "M" : "") + (seconds2 ? hmsSign + s + "S" : "");
        }
        var proto$2 = Duration.prototype;
        proto$2.isValid = isValid$1;
        proto$2.abs = abs;
        proto$2.add = add$12;
        proto$2.subtract = subtract$1;
        proto$2.as = as;
        proto$2.asMilliseconds = asMilliseconds;
        proto$2.asSeconds = asSeconds;
        proto$2.asMinutes = asMinutes;
        proto$2.asHours = asHours;
        proto$2.asDays = asDays;
        proto$2.asWeeks = asWeeks;
        proto$2.asMonths = asMonths;
        proto$2.asQuarters = asQuarters;
        proto$2.asYears = asYears;
        proto$2.valueOf = valueOf$1;
        proto$2._bubble = bubble;
        proto$2.clone = clone$1;
        proto$2.get = get$2;
        proto$2.milliseconds = milliseconds;
        proto$2.seconds = seconds;
        proto$2.minutes = minutes;
        proto$2.hours = hours;
        proto$2.days = days;
        proto$2.weeks = weeks;
        proto$2.months = months;
        proto$2.years = years;
        proto$2.humanize = humanize;
        proto$2.toISOString = toISOString$1;
        proto$2.toString = toISOString$1;
        proto$2.toJSON = toISOString$1;
        proto$2.locale = locale;
        proto$2.localeData = localeData;
        proto$2.toIsoString = deprecate(
          "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
          toISOString$1
        );
        proto$2.lang = lang;
        addFormatToken("X", 0, 0, "unix");
        addFormatToken("x", 0, 0, "valueOf");
        addRegexToken("x", matchSigned);
        addRegexToken("X", matchTimestamp);
        addParseToken("X", function(input, array, config2) {
          config2._d = new Date(parseFloat(input) * 1e3);
        });
        addParseToken("x", function(input, array, config2) {
          config2._d = new Date(toInt(input));
        });
        hooks2.version = "2.29.4";
        setHookCallback(createLocal);
        hooks2.fn = proto;
        hooks2.min = min;
        hooks2.max = max;
        hooks2.now = now;
        hooks2.utc = createUTC;
        hooks2.unix = createUnix;
        hooks2.months = listMonths;
        hooks2.isDate = isDate;
        hooks2.locale = getSetGlobalLocale;
        hooks2.invalid = createInvalid;
        hooks2.duration = createDuration;
        hooks2.isMoment = isMoment;
        hooks2.weekdays = listWeekdays;
        hooks2.parseZone = createInZone;
        hooks2.localeData = getLocale;
        hooks2.isDuration = isDuration;
        hooks2.monthsShort = listMonthsShort;
        hooks2.weekdaysMin = listWeekdaysMin;
        hooks2.defineLocale = defineLocale;
        hooks2.updateLocale = updateLocale;
        hooks2.locales = listLocales;
        hooks2.weekdaysShort = listWeekdaysShort;
        hooks2.normalizeUnits = normalizeUnits;
        hooks2.relativeTimeRounding = getSetRelativeTimeRounding;
        hooks2.relativeTimeThreshold = getSetRelativeTimeThreshold;
        hooks2.calendarFormat = getCalendarFormat;
        hooks2.prototype = proto;
        hooks2.HTML5_FMT = {
          DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
          DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
          DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
          DATE: "YYYY-MM-DD",
          TIME: "HH:mm",
          TIME_SECONDS: "HH:mm:ss",
          TIME_MS: "HH:mm:ss.SSS",
          WEEK: "GGGG-[W]WW",
          MONTH: "YYYY-MM"
        };
        return hooks2;
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

  // static/js/pages/leaderboard.js
  var import_moment = __toESM(require_moment());

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

  // static/js/modules/userDisplay.js
  var UserDisplay = {
    props: {
      username: String,
      bolded: {
        type: Boolean,
        default: false
      }
    },
    data: function() {
      return {
        link: ""
      };
    },
    mounted: function() {
      this.link = `/profile/${this.username}`;
    },
    template: `
        <a :href="link" :style="{ 'color': 'inherit', 'cursor': 'pointer', 'font-weight': bolded ? 'bold' : 'initial' }" @click.stop="">{{username}}</a>
    `
  };

  // static/js/modules/game/filters.js
  var pathArrowFilter = (arr) => arr.map((pathEntry) => pathEntry["article"]).join(" \u2192 ");

  // static/js/pages/leaderboard.js
  var URL_PROMPT_ID = serverData["prompt_id"];
  var URL_LOBBY_ID = serverData["lobby_id"] || null;
  var USER_ID = serverData["user_id"] === void 0 ? -1 : serverData["user_id"];
  var USERNAME = USER_ID < 0 ? "" : serverData["username"];
  var DEFAULT_PAGE_SIZE = 20;
  Vue.filter("pathArrow", pathArrowFilter);
  var LeaderboardRow = {
    props: [
      "run",
      "currentRunId",
      "pageToLink"
    ],
    components: {
      "user": UserDisplay
    },
    data: function() {
      return {
        lobbyId: URL_LOBBY_ID,
        momentString: import_moment.default.utc(this.run.start_time).fromNow()
      };
    },
    methods: {
      copyResults: function(run) {
        console.log(run);
        let results = this.generateResults(run);
        document.getElementById("custom-tooltip").style.display = "inline";
        document.getElementById("share-btn").style.display = "none";
        navigator.clipboard.writeText(results);
        setTimeout(function() {
          document.getElementById("custom-tooltip").style.display = "none";
          document.getElementById("share-btn").style.display = "inline-block";
        }, 2e3);
      },
      generateResults: function(run) {
        return `WikiSpeedruns ${run.prompt_id}
${this.$parent.prompt.start}
${run.path.length - 1} \u{1F5B1}\uFE0F
${run.play_time} \u23F1\uFE0F`;
      },
      goToRun: function(newRunId) {
        if (newRunId === this.$props.currentRunId)
          return;
        let url = new URL(window.location.href);
        url.searchParams.set("run_id", newRunId);
        window.location.replace(url);
      }
    },
    mounted: async function() {
      if (this.$props.run.run_id === this.$props.currentRunId) {
        this.$el.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
      }
    },
    template: `
        <tr :class="[run.finished ? '' : 'text-danger', 'clickable']" @click="goToRun(run.run_id)">
            <td >
                {{run.rank}}
                <button
                    v-if="pageToLink !== undefined"
                    title="Go to page"
                    type="button"
                    class="btn btn-link"
                    v-on:click="$emit('go-to-page', pageToLink);">
                    <i class="bi bi-box-arrow-right"></i>
                </button>
            </td>


            <td class="l-col">
                <template v-if="run.username">
                    <user :username="run.username" :bolded="run.run_id === currentRunId"/>
                </template>
                <template v-else-if="run.name">
                    <strong v-if="run.run_id === currentRunId">{{run.name}}</strong>
                    <span v-else>{{run.name}}</span>
                </template>
                <template v-else>
                    <strong v-if="run.run_id === currentRunId">Your Last Run</strong>
                    <span v-else>Anonymous</span>
                </template>

                <small class="text-muted">({{momentString}})</small>
            </td>

            <td class="l-col">{{(run.play_time).toFixed(3)}} s</td>
            <td>{{run.path.length}}</td>

            <td class="col-lg">
                {{run.path | pathArrow}}
                <a v-if="!lobbyId" v-bind:href="'/replay?run_id=' + run.run_id" target="_blank" title="Replay" >
                    <i class="bi bi-play"></i>
                </a>
            </td>

            <td class="col">
                <div
                    v-if="run.finished &&
                    run.run_id === currentRunId &&
                    (run.username === this.$parent.username || (this.$parent.preset === 'personal' && !this.$parent.loggedIn))"
                    class="button-tooltip-container col-auto py-2"
                >
                    <button @click="copyResults(run)" id="share-btn" class="share-btn btn-1 btn-1c"><i class="bi bi-share"></i> Share</button>
                    <span id="custom-tooltip">Copied results to clipboard!</span>
                </div>
            </td>
        </tr>
    `
  };
  function populateGraph(runs, runId) {
    function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }
    function rgbToHex(r, g, b) {
      return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
    var graph = new Springy.Graph();
    var nodes = [];
    var edges = [];
    var checkIncludeLabels = function(label, array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].label === label) {
          return i;
        }
      }
      return -1;
    };
    var checkIncludeEdgeLabels = function(src, dest, array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].src === src && array[i].dest === dest) {
          return i;
        }
      }
      return -1;
    };
    var startNode;
    var endNode;
    for (let i = 0; i < runs.length; i++) {
      var pathNodes = runs[i]["path"];
      var cur = runs[i]["run_id"] === Number(runId) ? true : false;
      for (let j = 0; j < pathNodes.length; j++) {
        const article = pathNodes[j]["article"];
        var index2 = checkIncludeLabels(article, nodes);
        if (index2 === -1) {
          let node = { type: 0, label: article, count: 1, current: cur };
          if (j === 0) {
            node.type = 1;
            startNode = node;
          } else if (j === pathNodes.length - 1) {
            node.type = 2;
            endNode = node;
          } else if (node.label !== startNode.label) {
            node.type = 0;
            nodes.push(node);
          }
        } else {
          if (cur) {
            nodes[index2].current = cur;
          }
          nodes[index2].count = nodes[index2].count + 1;
        }
      }
    }
    if (runs.length > 0) {
      nodes.push(startNode);
      nodes.push(endNode);
    }
    for (let i = 0; i < runs.length; i++) {
      var pathNodes = runs[i]["path"];
      var cur = runs[i]["run_id"] === Number(runId) ? true : false;
      for (let j = 0; j < pathNodes.length - 1; j++) {
        const u = pathNodes[j]["article"];
        const v = pathNodes[j + 1]["article"];
        let index3 = checkIncludeEdgeLabels(u, v, edges);
        if (index3 === -1) {
          let edge = { src: u, dest: v, count: 1, current: cur };
          edges.push(edge);
        } else {
          if (cur) {
            edges[index3].current = cur;
          }
          edges[index3].count = edges[index3].count + 1;
        }
      }
    }
    var edgeCountMax = 0;
    var nodeCountMax = 0;
    var nodeObj = [];
    var nodeLabels = [];
    nodes.forEach(function(node) {
      if (node.count > nodeCountMax) {
        nodeCountMax = node.count;
      }
    });
    nodes.forEach(function(node) {
      var color;
      var font;
      var textheight;
      if (node.type === 1) {
        color = "#008000";
        font = "bold 15px Verdana, sans-serif";
        textheight = 18;
      } else if (node.type === 2) {
        color = "#FF5733";
        font = "bold 15px Verdana, sans-serif";
        textheight = 18;
      } else {
        color = "#000000";
        font = "10px Verdana, sans-serif";
        textheight = 10;
      }
      var color = node.current && node.type !== 1 && node.type !== 2 ? "#ff9700" : color;
      var weightScale;
      if (nodeCountMax === 1) {
        weightScale = 12;
      } else {
        weightScale = 12 / (nodeCountMax - 1) * (node.count - 1) + 6;
      }
      var n = graph.newNode({ label: node.label, color, font, textheight, type: node.type, weightScale, count: node.count });
      nodeObj.push(n);
      nodeLabels.push(node.label);
    });
    edges.forEach(function(edge) {
      if (edge.count > edgeCountMax) {
        edgeCountMax = edge.count;
      }
    });
    edges.forEach(function(edge) {
      var srcIndex = nodeLabels.indexOf(edge.src);
      var destIndex = nodeLabels.indexOf(edge.dest);
      var colorScale;
      var weightScale;
      if (edgeCountMax === 1) {
        colorScale = 255;
        weightScale = 2.25;
      } else {
        colorScale = parseInt(255 - 255 / (edgeCountMax - 1) * (edge.count - 1), 10);
        weightScale = 1.5 / (edgeCountMax - 1) * (edge.count - 1) + 1.5;
      }
      var color = edge.current ? "#ff9700" : rgbToHex(255 - colorScale, 0, colorScale);
      graph.newEdge(nodeObj[srcIndex], nodeObj[destIndex], { color, label: edge.count, weight: weightScale });
    });
    return graph;
  }
  var app = new Vue({
    delimiters: ["[[", "]]"],
    el: "#app",
    data: {
      loggedIn: USER_ID !== -1,
      username: USERNAME,
      prompt: {},
      available: false,
      runs: [],
      numRuns: 0,
      runId: -1,
      currentRun: null,
      currentRunPosition: 0,
      promptId: URL_PROMPT_ID,
      lobbyId: URL_LOBBY_ID,
      limit: 20,
      offset: 0,
      preset: "",
      stats: {
        finishPct: 0,
        avgClicks: 0,
        avgTime: 0
      }
    },
    computed: {
      page: function() {
        return Math.floor(this.offset / this.limit);
      },
      numPages: function() {
        return Math.max(1, Math.ceil(this.numRuns / this.limit));
      }
    },
    watch: {
      preset: function(newValue, oldValue) {
        if (oldValue === "")
          return;
        let url = new URL(window.location.href);
        url.searchParams.set("preset", newValue);
        url.searchParams.set("offset", 0);
        window.location.replace(url);
      }
    },
    components: {
      "leaderboard-row": LeaderboardRow
    },
    methods: {
      genGraph: function() {
        var graph = populateGraph(this.runs, this.runId);
        $("#springydemo").springy({ graph });
      },
      goToPage: function(newPage) {
        let url = new URL(window.location.href);
        url.searchParams.set("offset", newPage * this.limit);
        url.searchParams.set("limit", this.limit);
        window.location.replace(url);
      }
    },
    created: async function() {
      let url = new URL(window.location.href);
      this.runId = Number(url.searchParams.get("run_id")) || -1;
      this.offset = Number(url.searchParams.get("offset") || 0);
      this.limit = Number(url.searchParams.get("limit") || DEFAULT_PAGE_SIZE);
      this.preset = url.searchParams.get("preset") || this.preset;
      let args = {};
      if (this.preset === "") {
        this.preset = this.lobbyId === null ? "personal" : "ffa";
      }
      if (this.preset === "ffa") {
      } else if (this.preset === "shortest") {
        args = {
          "sort_mode": "length",
          "user_run_mode": "shortest"
        };
      } else {
        if (this.preset !== "personal") {
          alert("Invalid preset, defaulting to 'Personal'");
        }
        args = {
          "sort_mode": "start",
          "sort_asc": false,
          "user_run_mode": "all",
          "show_unfinished": true,
          "user_id": USER_ID
        };
      }
      let path = this.lobbyId === null ? `/api/sprints/${this.promptId}/leaderboard` : `/api/lobbys/${this.lobbyId}/prompts/${this.promptId}/leaderboard`;
      if (this.runId !== -1) {
        path += "/" + this.runId;
      }
      let resp = await fetchJson(path, "POST", {
        "limit": this.limit,
        "offset": this.offset,
        ...args
      });
      if (resp.status === 401) {
        alert("Unable to fetch leaderboards");
        window.history.back();
        return;
      }
      resp = await resp.json();
      this.available = !("available" in resp["prompt"]) || resp["prompt"]["available"];
      this.prompt = resp["prompt"];
      this.runs = resp["runs"];
      this.numRuns = resp["numRuns"];
      const currRunIndex = this.runs.findIndex((run) => run["run_id"] === this.runId);
      if (currRunIndex !== -1) {
        this.currentRun = this.runs[currRunIndex];
        if (this.currentRun["rank"] - 1 < this.offset) {
          this.currentRunPosition = -1;
          this.runs.splice(currRunIndex, 1);
        } else if (this.currentRun["rank"] - 1 >= this.offset + this.limit) {
          this.currentRunPosition = 1;
          this.runs.splice(currRunIndex, 1);
        }
      }
      let statsEndpoint = this.lobbyId === null ? `/api/sprints/${this.promptId}/stats` : `/api/lobbys/${this.lobbyId}/prompts/${this.promptId}/stats`;
      var response = await fetchJson(statsEndpoint, "POST", {
        ...args,
        "show_unfinished": true,
        "user_run_mode": this.preset === "ffa" ? "first" : "all"
      });
      let statJson = await response.json();
      this.stats.finishPct = parseFloat(statJson["finish_pct"]).toFixed(2);
      this.stats.avgClicks = parseFloat(statJson["avg_path_len"]).toFixed(2);
      this.stats.avgTime = parseFloat(statJson["avg_play_time"]).toFixed(2);
      this.genGraph();
    }
  });
})();
/*!
 * Vue.js v2.7.10
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! moment.js
//! momentjs.com
//! version : 2.29.4
//# sourceMappingURL=leaderboard.js.map
