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
},{"./bundle-url":"3Fhe"}],"VRYX":[function(require,module,exports) {
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(async function () {
  let {
    React,
    ReactDOM,
    DockLayout
  } = await require("_bundle_loader")(require.resolve('./shared-import'));
  let group = {
    floatable: true
  };
  let tab1 = {
    id: 't1',
    title: 'Tab 1',
    content: React.createElement("div", null, "Tab 1"),
    group
  };
  let tab2 = {
    id: 't2',
    title: 'Tab 2',
    content: React.createElement("div", null, "Tab 2"),
    group
  };
  let tab3 = {
    id: 't3',
    title: 'Tab 3',
    content: React.createElement("div", null, "Tab 3"),
    group
  };
  let tab4 = {
    id: 't4',
    title: 'Tab 4',
    content: React.createElement("div", null, "Tab 4"),
    group
  };
  let tab5 = {
    id: 't5',
    title: 'Tab 5',
    content: React.createElement("div", null, "Tab 5"),
    group
  };
  let tab6 = {
    id: 't6',
    title: 'Tab 6',
    content: React.createElement("div", null, "Tab 6"),
    group
  };
  let defaultLayout = {
    dockbox: {
      mode: 'horizontal',
      children: [{
        mode: 'vertical',
        children: [{
          tabs: [tab1, tab2]
        }, {
          tabs: [tab3, tab4]
        }]
      }, {
        tabs: [tab5, tab6]
      }]
    }
  };
  let panelLayout = {
    dockbox: {
      mode: 'horizontal',
      children: [{
        tabs: [{
          id: 't1'
        }, {
          id: 't2'
        }, {
          id: 't3'
        }, {
          id: 't4'
        }, {
          id: 't5'
        }, {
          id: 't6'
        }]
      }]
    }
  };
  let horizontalLayout = {
    dockbox: {
      mode: 'horizontal',
      children: [{
        tabs: [{
          id: 't1'
        }]
      }, {
        tabs: [{
          id: 't2'
        }]
      }, {
        tabs: [{
          id: 't3'
        }]
      }, {
        tabs: [{
          id: 't4'
        }]
      }, {
        tabs: [{
          id: 't5'
        }]
      }, {
        tabs: [{
          id: 't6'
        }]
      }]
    }
  };

  class Demo extends React.Component {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "getRef", r => {
        this.dockLayout = r;
      });

      _defineProperty(this, "state", {
        saved: null
      });
    }

    render() {
      return React.createElement("div", null, React.createElement(DockLayout, {
        ref: this.getRef,
        defaultLayout: defaultLayout,
        style: {
          position: 'absolute',
          left: 10,
          top: 10,
          right: 180,
          bottom: 10
        }
      }), React.createElement("div", {
        style: {
          width: 150,
          position: 'absolute',
          right: 20
        }
      }, React.createElement("div", {
        onClick: () => this.setState({
          saved: this.dockLayout.saveLayout()
        })
      }, "Save Layout"), React.createElement("div", {
        onClick: () => this.dockLayout.loadLayout(this.state.saved)
      }, "Load Saved Layout"), React.createElement("div", null, "Load Horizontal"), React.createElement("div", null, "Load Single Panel")));
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
},{}]},{},[0,"VRYX"], null)