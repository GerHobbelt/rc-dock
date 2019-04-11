// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"3Fhe":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"21/1":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;

function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }

  var id = bundles[bundles.length - 1];

  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }

    throw err;
  }
}

function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}

var bundleLoaders = {};

function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}

module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};

function loadBundle(bundle) {
  var id;

  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }

  if (bundles[bundle]) {
    return bundles[bundle];
  }

  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];

  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }

      return resolved;
    }).catch(function (e) {
      delete bundles[bundle];
      throw e;
    });
  }
}

function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}

LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};

LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"3Fhe"}],"9hnN":[function(require,module,exports) {
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(async function () {
  let {
    React,
    ReactDOM,
    DockLayout
  } = await require("_bundle_loader")(require.resolve('./shared-import'));
  let groups = {
    headless: {
      // the css class for this would be dock-panel-headless
      // this is a pre-defined style, defined here:
      // https://github.com/ticlo/rc-dock/blob/master/style/predefined-panels.less
      floatable: true
    },
    custom: {
      // the css class for this would be dock-panel-custom
      // this is a custom panel style defined in panel-style.html
      closable: true,
      floatable: true
    }
  };
  let defaultTab = {
    title: 'default-style',
    content: React.createElement("div", null, "Tabs from different style group can't be docked in same panel")
  };
  let headlessTab = {
    title: 'headless',
    content: React.createElement("div", {
      style: {
        background: '#f6f6f6',
        height: '100%',
        margin: 0,
        padding: 30
      }
    }, React.createElement("p", null, "Hide border and header."), "Move mouse near top border to show header."),
    // this is a pre-defined style, defined here:
    // https://github.com/ticlo/rc-dock/blob/master/style/predefined-panels.less
    group: 'headless'
  };
  let cardTab = {
    title: 'card-style',
    content: React.createElement("div", null, "card style"),
    // this is a pre-defined style, defined here:
    // https://github.com/ticlo/rc-dock/blob/master/style/predefined-panels.less
    group: 'card'
  };
  let customTab = {
    title: 'custom-style',
    content: React.createElement("div", null, "Custom style"),
    // you can mix predefined style with you own style
    // separate 2 styles with space
    // the panel class will contain both dock-style-car and dock-style-custom
    group: 'card custom'
  };
  let box = {
    dockbox: {
      mode: 'horizontal',
      children: [{
        mode: 'vertical',
        children: [{
          tabs: [_objectSpread({}, defaultTab, {
            id: 't7'
          }), _objectSpread({}, defaultTab, {
            id: 't8',
            title: React.createElement("div", {
              className: "github-icon"
            }, "custom-tab"),
            content: React.createElement("div", null, "Tab title can be any react component")
          })]
        }, {
          tabs: [_objectSpread({}, cardTab, {
            id: 't9'
          }), _objectSpread({}, cardTab, {
            id: 't10'
          }), _objectSpread({}, cardTab, {
            id: 't11'
          })]
        }]
      }, {
        mode: 'vertical',
        children: [{
          tabs: [_objectSpread({}, customTab, {
            id: 't4'
          }), _objectSpread({}, customTab, {
            id: 't5'
          }), _objectSpread({}, customTab, {
            id: 't6'
          })]
        }, {
          tabs: [_objectSpread({}, headlessTab, {
            id: 't1'
          }), _objectSpread({}, headlessTab, {
            id: 't2'
          }), _objectSpread({}, headlessTab, {
            id: 't3'
          })]
        }]
      }]
    }
  };

  class Demo extends React.Component {
    render() {
      return React.createElement(DockLayout, {
        defaultLayout: box,
        groups: groups,
        style: {
          position: 'absolute',
          left: 10,
          top: 10,
          right: 10,
          bottom: 10
        }
      });
    }

  }

  ReactDOM.render(React.createElement(Demo, null), document.getElementById('app'));
})();
},{"_bundle_loader":"21/1","./shared-import":[["shared-import.js","FeNK"],"FeNK"]}],"Yi9z":[function(require,module,exports) {
module.exports = function loadJSBundle(bundle) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = bundle;

    script.onerror = function (e) {
      script.onerror = script.onload = null;
      reject(e);
    };

    script.onload = function () {
      script.onerror = script.onload = null;
      resolve();
    };

    document.getElementsByTagName('head')[0].appendChild(script);
  });
};
},{}],0:[function(require,module,exports) {
var b=require("21/1");b.register("js",require("Yi9z"));
},{}]},{},[0,"9hnN"], null)