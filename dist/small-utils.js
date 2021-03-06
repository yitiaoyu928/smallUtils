(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("smallUtils", [], factory);
	else if(typeof exports === 'object')
		exports["smallUtils"] = factory();
	else
		root["smallUtils"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const _toString = Object.prototype.toString
const _type = ["[object Array]", "[object Object]", "[object Null]", "[object Undefined]", "[object Function]"]
const smallUtils = {}

// ????????????
function flatArray(arr) {
  let isDeep = arr.some(item => {
    return item instanceof Array
  })
  if (!isDeep) {
    return arr
  }
  let ret = Array.prototype.concat.apply([], arr)
  return flatArray(ret)
}

// ?????????
function isObject(v) {
  return typeof v === "object"
}

// ?????????
function equal(target1, target2) {
  // ??????????????????????????????????????????????????????
  if (_toString.call(target1) === _type[1] && _toString.call(target2) === _type[1]) {
    let key1Length = Object.keys(target1).length
    let key2Length = Object.keys(target2).length
    // ????????????????????????????????????????????????????????????????????????false
    if (key1Length !== key2Length) {
      return false
    }
    // ????????????
    for (let k in target1) {
      let ret = equal(target1[k], target2[k])
      if (!ret) {
        return false
      }
    }
    // ???????????????????????????????????????
  } else if (_toString.call(target1) === _type[0] && _toString.call(target2) === _type[0]) {
    let key1Length = target1.length
    let key2Length = target2.length
    if (key1Length !== key2Length) {
      return false
    }
    for (let k in target1) {
      // ??????????????????
      let ret = equal(target1[k], target2[k])
      if (!ret) {
        return false
      }
    }
    return true
    // ??????????????????????????????????????????????????????????????????
  } else {
    // ?????????NaN???????????????????????????
    if (isNaN(target1) && isNaN(target2)) {
      return true
    }
    return target1 === target2
  }
  return true
}

// ?????????
function deepCopy(target1) {
  if (!isObject(target1) || target1 === null) {
    return target1
  }
  let result = null
  if (_toString.call(target1) === _type[0]) {
    result = []
  } else if (_toString.call(target1) === _type[1]) {
    result = {}
  }
  for (let k in target1) {
    if (target1.hasOwnProperty(k)) {
      result[k] = deepCopy(target1[k])
    }
  }
  return result
}

// ??????
function deBounce(func, interval = 300) {
  if (_toString.call(func) !== _type[0] && _toString.call(func) !== _type[4]) {
    return
  }
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
      // timer = null
      // return
    }
    timer = setTimeout(() => {
      if (_toString.call(func) === _type[4]) {
        func()
      } else {
        if (_toString.call(func) === _type[0]) {
          func.forEach((item) => {
            if (_toString.call(func) === _type[4]) {
              item()
            }
          })
        }
      }
      clearTimeout(timer)
      timer = null
    }, interval)
  }
}

// ??????
function throttle(func, interval = 300) {
  if (_toString.call(func) !== _type[0] && _toString.call(func) !== _type[4]) {
    return
  }
  let timer = null
  return function () {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      if (_toString.call(func) === _type[4]) {
        func()
      } else if (_toString.call(func) === _type[0]) {
        func.forEach((item) => {
          if (_toString.call(func) === _type[4]) {
            item()
          }
        })
      }
      clearTimeout(timer)
      timer = null
    }, interval)
  }
}

// ??????????????????
function trimSpace(str) {
  if (_toString.call(str) !== "[object String]") {
    return JSON.parse(JSON.stringify(str).replace(/\s/, ""))
  }
  return str.replace(/\s/, "")
}

// ????????????
function largeNumberAdd(int1, int2) {
  if (!int1 && !int2) {
    return 0
  }
  if (!int1 || !int2) {
    if (_toString.call(int1) === _type[3]) {
      return int2
    }
    if (_toString.call(int2) === _type[3]) {
      return int1
    }
    return int1 + int2
  }
  let a = int1.toString()
  let b = int2.toString()
  let int1Length = a.length - 1
  let int2Length = b.length - 1
  let acc = 0
  let ret = ""
  while (int1Length >= 0 || int2Length >= 0) {
    let x = 0, y = 0, s
    if (int1Length >= 0) {
      x = a[int1Length] - "0"
      int1Length--
    }
    if (int2Length >= 0) {
      y = b[int2Length] - "0"
      int2Length--
    }
    s = x + y + acc
    if (s >= 10) {
      acc = 1
      s -= 10
    } else {
      acc = 0
    }
    ret = s + ret
  }
  if (acc) {
    ret = acc + ret
  }
  return ret
}

// ?????????
function largeNumberMinus(int1, int2) {
  let int1Flag = int1 < 0
  let int2Flag = int2 < 0
  let int1Copy = int1
  let int2Copy = int2
  if (int1Flag) {
    int1Copy = Math.abs(int1Copy)
  }
  if (int2Flag) {
    int2Copy = Math.abs(int2Copy)
  }

}

// ??????????????????
function wipeRepeat(arr) {
  let arrCopy = arr.map(item => {
    if (_toString.call(item) === _type[3]) {
      return "undefined"
    }
    if (_toString.call(item) === _type[4]) {
      return JSON.stringify(item())
    }
    if (isNaN(item) && _toString.call(item) !== _type[0]) {
      return "NaN"
    }
    return JSON.stringify(item)
  })
  let noRepeat = new Set(arrCopy)

  let transArray = Array.from(noRepeat)
  let v = transArray.map(item => {
    let tmp = eval(item)
    console.log(tmp)
    console.log(item, "null", _toString.call(tmp))
    if (_toString.call(tmp) === _type[2]) {
      return null
    }
    if (_toString.call(tmp) === _type[3]) {
      return undefined
    }
    if (_toString.call(tmp) === _type[0]) {
      return tmp
    }
    if (isNaN(item)) {
      return NaN
    }
    return JSON.parse(item)
  })
}

// ????????????
Object.defineProperties(smallUtils, {
  "_toString": {
    value: _toString.call,
    writable: false,
    configurable: false,
    enumerable: false
  },
  "isObject": {
    value: isObject,
    writable: false,
    configurable: false,
    enumerable: false
  },
  "flatArray": {
    value: flatArray,
    writable: false,
    configurable: false,
    enumerable: true
  },
  "equal": {
    value: equal,
    writable: false,
    configurable: false,
    enumerable: true
  },
  "deepCopy": {
    value: deepCopy,
    writable: false,
    configurable: false,
    enumerable: true
  },
  "deBounce": {
    value: deBounce,
    writable: false,
    configurable: false,
    enumerable: true
  },
  "throttle": {
    value: throttle,
    writable: false,
    configurable: false,
    enumerable: true
  },
  "trimSpace": {
    value: trimSpace,
    writable: false,
    configurable: false,
    enumerable: true
  },
  "largeNumberAdd": {
    value: largeNumberAdd,
    writable: false,
    configurable: false,
    enumerable: true
  },
  "largeNumberMinus": {
    value: largeNumberMinus,
    writable: false,
    configurable: false,
    enumerable: true
  },
  "wipeRepeat": {
    value: wipeRepeat,
    writable: false,
    configurable: false,
    enumerable: true
  }
})

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (smallUtils);
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});