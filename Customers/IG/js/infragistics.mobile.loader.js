﻿/* Infragistics.Mobile.Loader 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/
if (typeof (jQuery) === "undefined") {
    throw new Error("jQuery is undefined")
}
$.ig = $.ig || {};
$.ig.dependencies = [{
    widget: "theme",
    scripts: [],
    css: ["$path$/themes/$theme$/infragistics.mobile.theme.css"]
}, {
    widget: "igDataSource",
    dependency: [{
        name: "igUtil"
    }],
    scripts: ["$path$/modules/infragistics.datasource.js"],
    locale: ["$localePath$/infragistics.datasource-$locale$.js"],
    css: []
}, {
    widget: "igTemplating",
    dependency: [{
        name: "igUtil"
    }],
    scripts: ["$path$/modules/infragistics.templating.js"],
    css: []
}, {
    widget: "igUtil",
    scripts: ["$path$/modules/infragistics.util.js"],
    css: []
}, {
    widget: "igScroll",
    scripts: ["$path$/modules/infragistics.ui.scroll.js"],
    css: []
}, {
    widget: "igmList",
    dependency: [{
        name: "igUtil"
    }, {
        name: "igTemplating"
    }, {
        name: "igDataSource"
    }],
    scripts: ["$path$/modules/infragistics.mobileui.list.js"],
    css: ["$path$/structure/modules/infragistics.mobile.list.css"],
    locale: ["$localePath$/infragistics.mobileui.list-$locale$.js"]
}, {
    widget: "Filtering",
    parentWidget: "igmList",
    dependency: [{
        name: "igmList"
    }],
    scripts: ["$path$/modules/infragistics.mobileui.list.filtering.js"]
}, {
    widget: "LoadOnDemand",
    parentWidget: "igmList",
    dependency: [{
        name: "igmList"
    }],
    scripts: ["$path$/modules/infragistics.mobileui.list.loadondemand.js"]
}, {
    widget: "Sorting",
    parentWidget: "igmList",
    dependency: [{
        name: "igmList"
    }],
    scripts: ["$path$/modules/infragistics.mobileui.list.sorting.js"]
}, {
    widget: "igmList.*",
    dependency: [{
        name: "igmList"
    }, {
        name: "Filtering"
    }, {
        name: "LoadOnDemand"
    }, {
        name: "Sorting"
    }]
}, {
    widget: "igmRating",
    dependency: [{
        name: "igUtil"
    }],
    scripts: ["$path$/modules/infragistics.mobileui.rating.js"],
    css: ["$path$/structure/modules/infragistics.mobile.rating.css"]
}];
$.ig.theme = "";
if (typeof ($.ig.isDocumentReady) === "undefined") {
    $.ig.isDocumentReady = false;
    $(document).bind("pagebeforeload", function () {
        $.ig.isDocumentReady = false
    });
    $(document).bind("pageinit", function () {
        $.ig.isDocumentReady = true;
        if ($.ig._loader) {
            $.ig.loader()._notifyLoaded()
        }
    })
}
$.extend($.ig, {
    loader: function (d, e, f) {
        var c, b, g;

        function a(h) {
            if (typeof (h) === "object") {
                c = h
            }
            if (typeof (h) === "function") {
                b = h
            }
            if (typeof (h) === "string") {
                g = h
            }
        }
        if (arguments.length > 0) {
            a(d)
        }
        if (arguments.length > 1) {
            a(e)
        }
        if (arguments.length > 2) {
            a(f)
        }
        if (c) {
            if (g) {
                c.resources = g
            }
            if (b) {
                c.ready = b
            }
        }
        $.ig._loader = $.ig.loaderClass;
        $.ig._loader._init(c);
        if (!c) {
            $.ig._loader.load(g, b)
        }
        return $.ig._loader
    }
});
$.ig.loaderClass = $.ig.loaderClass || {};
$.extend($.ig.loaderClass, {
    settings: {
        resources: null,
        scriptPath: "js",
        cssPath: "css",
        theme: $.ig.theme,
        localePath: "$path$/modules/i18n",
        autoDetectLocale: false,
        locale: null,
        regional: null,
        preinit: null,
        ready: null
    },
    load: function (f, a, d) {
        if (!f) {
            if (!a && !d) {
                return this
            }
            if (a) {
                this._callbackArray.push(a)
            }
            if (d) {
                this._preinitArray.push(d)
            }
            this._waitBatches(this._proxy(this, this._notifyLoaded, []))
        } else {
            if (!this._themeLoaded && this.settings.theme) {
                this._themeLoaded = true;
                f = "theme," + f
            }
            this.settings.ready = a;
            var e = f.split(","),
                c = {},
                b;
            c.callback = this._proxy(c, this._callback, []);
            c.waitFireCallback = this._proxy(c, this._waitFireCallback, []);
            c._noWdgtLoaded = e.length;
            c.loader = this;
            c.ready = this._proxy(this, this._notifyLoaded, []);
            if (a) {
                this._callbackArray.push(a)
            }
            if (d) {
                this._preinitArray.push(d)
            }
            this._loadBatches.push(c);
            for (b = 0; b < e.length; b++) {
                (new $.ig._loadWorkItem(this)).loadWidgetResources(e[b], c.callback)
            }
        }
        return this
    },
    preinit: function (a) {
        if (a) {
            this._preinitArray.push(a)
        }
        this._notifyLoaded();
        return this
    },
    _themeLoaded: false,
    _dataLog: "",
    _loadBatches: [],
    _resources: $.ig.dependencies,
    _init: function (e) {
        if (e) {
            var a = e.scriptPath,
                d = e.localePath,
                b = e.cssPath,
                f = e.regional,
                c = e.locale,
                g;
            if (a && a.length > 0) {
                if (a.lastIndexOf("/") === a.length - 1) {
                    a = a.slice(0, a.length - 1)
                }
                this.settings.scriptPath = a
            }
            if (b && b.length > 0) {
                if (b.lastIndexOf("/") === b.length - 1) {
                    b = b.slice(0, b.length - 1)
                }
                this.settings.cssPath = b
            }
            if (d && d.length > 0) {
                if (d.lastIndexOf("/") === d.length - 1) {
                    d = d.slice(0, d.length - 1)
                }
                this.settings.localePath = d
            }
            if (typeof (e.theme) !== "undefined") {
                this.settings.theme = e.theme
            }
            if (e.resources) {
                this.settings.resources = e.resources
            }
            if (e.ready) {
                this.settings.ready = e.ready
            }
            if (e.preinit) {
                this.settings.preinit = e.preinit
            }
            if (typeof (e.autoDetectLocale) !== "undefined") {
                this.settings.autoDetectLocale = e.autoDetectLocale
            }
            if (!c && this.settings.autoDetectLocale) {
                g = (navigator.language || navigator.userLanguage);
                c = g.split("-")[0];
                if (!f) {
                    f = c
                }
            }
            if (!this._isSupportedLocale(c) || c === this._defaultLocale) {
                c = ""
            }
            if (!c && this._defaultLocale) {
                this.settings.locale = ""
            } else {
                if (c) {
                    this.settings.locale = c
                } else {
                    this.settings.locale = "en"
                }
            }
            if (!f) {
                f = e.locale
            }
            if (!f && this._defaultLocale === "ja") {
                f = "ja"
            }
            if (f === "en") {
                f = null
            }
            this.settings.regional = f;
            this._initializePaths("script");
            this._initializePaths("css");
            if (this.settings.resources) {
                this.load(this.settings.resources, this.settings.ready, this.settings.preinit)
            }
        }
    },
    _defaultLocale: "en",
    _languages: ["en", "ja", "ru", "bg"],
    _isSupportedLocale: function (b) {
        var a;
        for (a in this._languages) {
            if (this._languages[a] === b) {
                return true
            }
        }
        return false
    },
    _proxy: function (b, c, a) {
        return function () {
            return c.apply(b, a)
        }
    },
    _initializePaths: function (l) {
        var a, b, c = this._resources.length,
            f = (l === "script" ? this.settings.scriptPath : this.settings.cssPath),
            d = this.settings.localePath,
            k = this.settings.theme,
            h, m = (l === "script" && this.settings.locale),
            n = (l === "script" && this.settings.regional),
            e, g;
        for (a = 0; a < c; a++) {
            h = (l === "script" ? this._resources[a].scripts : this._resources[a].css);
            h = h || [];
            if (m) {
                e = this._resources[a].locale;
                if (e) {
                    while (e.length > 0) {
                        h.unshift(e.pop().replace("$locale$", this.settings.locale))
                    }
                }
            }
            if (n) {
                g = this._resources[a].regional;
                if (g) {
                    while (g.length > 0) {
                        h.unshift(g.pop().replace("$regional$", this.settings.regional))
                    }
                }
            }
            for (b = 0; b < h.length; b++) {
                h[b] = h[b].replace("$localePath$", d).replace("$path$", f).replace("$theme$", k)
            }
        }
    },
    _log: function (a) {
        this._dataLog += (a.toString() + "<br/>")
    },
    log: function () {
        return this._dataLog
    },
    _callback: function () {
        this._noWdgtLoaded--;
        if (this._noWdgtLoaded <= 0) {
            if (this.ready) {
                this.waitFireCallback()
            } else {
                this.loader._loadBatches.pop(this)
            }
        }
    },
    _waitFireCallback: function () {
        if ($.ig.isDocumentReady) {
            this.loader._loadBatches.pop(this);
            this.ready()
        } else {
            window.setTimeout(this.loader._proxy(this, this.waitFireCallback, []), 25)
        }
    },
    _waitBatches: function (a) {
        if (this._loadBatches.length === 0 && $.ig.isDocumentReady) {
            a()
        } else {
            window.setTimeout(this._proxy(this, this._waitBatches, [a]), 25)
        }
    },
    _preinitArray: [],
    _callbackArray: [],
    _notifyLoaded: function () {
        if (this._loadBatches.length > 0) {
            return
        }
        var b = this._preinitArray,
            a = this._callbackArray;
        if (this._preinitArray.length) {
            this._preinitArray = []
        }
        if (this._callbackArray.length) {
            this._callbackArray = []
        }
        if (this.settings.regional && typeof ($.ig.setRegionalDefault) === "function") {
            $.ig.setRegionalDefault(this.settings.regional)
        }
        while (b.length > 0) {
            b.shift()()
        }
        while (a.length > 0) {
            a.shift()()
        }
    },
    _findWidgetScriptData: function (d) {
        var a, b = this._resources.length,
            c;
        if (d.length > 3 && d.indexOf(".js") === d.length - 3) {
            return {
                widget: d,
                scripts: [this.settings.scriptPath + "/" + d],
                css: []
            }
        }
        if (d.length > 4 && d.indexOf(".css") === d.length - 4) {
            return {
                widget: d,
                scripts: [],
                css: [this.settings.cssPath + "/" + d]
            }
        }
        for (a = 0; a < b; a++) {
            c = this._resources[a];
            if (c.widget === d) {
                return c
            }
        }
        return null
    }
});
$.ig._loadWorkItem = function (a) {
    this._loader = a;
    this._loadedCssDependencies = [];
    this._loadedScriptDependencies = []
};
$.ig._loadWorkItem.prototype = {
    _loadingEntities: [],
    _inArray: function (b, a) {
        var c, d = a && b ? a.length : 0;
        for (c = 0; c < d; c++) {
            if (b === a[c]) {
                return true
            }
        }
        return false
    },
    _loadDependency: function (e, c, f) {
        var a, b = e.dependency ? e.dependency.length : 0,
            d;
        for (a = 0; a < b; a++) {
            d = e.dependency[a].name;
            if (!this._inArray(d, (f === "script" ? this._loadedScriptDependencies : this._loadedCssDependencies))) {
                this._loadFeatureItem(d, f, c);
                if (f === "script") {
                    this._loadedScriptDependencies.push(d)
                } else {
                    this._loadedCssDependencies.push(d)
                }
            }
        }
    },
    _loadFeatureItem: function (h, g, d) {
        var f = this._loader._findWidgetScriptData(h),
            a, e, c, b;
        if (!f) {
            throw ("Resource '{0}' cannot be found. Please check that the resource name is correct.").replace("{0}", h)
        }
        e = (g === "script" ? f.scripts : f.css);
        e = e || [];
        c = e.length;
        this._loadDependency(f, d, g);
        for (a = 0; a < c; a++) {
            b = e[a];
            this._queueItem(b, d, g, f.priority)
        }
    },
    _loadFeatures: function (e, f, a) {
        var b, c, d;
        if (f.indexOf("*") === f.length - 1 || (f.length > 3 && f.indexOf(".js") === f.length - 3) || (f.length > 4 && f.indexOf(".css") === f.length - 4)) {
            b = [f]
        } else {
            b = f.split(".")
        }
        d = b.length;
        for (c = 0; c < d; c++) {
            this._loadFeatureItem(b[c], e, f)
        }
    },
    _loadAllFeatures: function (l, a) {
        var b, d, f = this._loader._resources.length,
            e = 0,
            k, c, g = "ALL",
            h;
        for (b = 0; b < f; b++) {
            k = this._loader._resources[b];
            this._loadDependency(k, g, l);
            h = (l === "script" ? k.scripts : k.css);
            h = h || [];
            e = h.length;
            for (d = 0; d < e; d++) {
                c = h[d];
                this._queueItem(c, g, l, k.priority)
            }
        }
    },
    loadWidgetResources: function (b, a) {
        if (typeof (this._loadingEntities[b]) !== "undefined") {
            this._loadingEntities[b].call.push(a)
        } else {
            this._loadingEntities[b] = {
                name: b,
                call: [a],
                queue: []
            }
        }
        this._loadFeatures("css", b, a);
        this._loadFeatures("script", b, a);
        this._loadMonitor()
    },
    loadWidgetCss: function (b, a) {
        this._loadFeatures("css", b, a)
    },
    loadWidgetScripts: function (b, a) {
        this._loadFeatures("script", b, a)
    },
    loadAllScripts: function (a) {
        this._loadAllFeatures("script", a)
    },
    loadAllCss: function (a) {
        this._loadAllFeatures("css", a)
    },
    loadAllResources: function (a) {
        var b = "ALL";
        this._loadingEntities[b] = {
            name: b,
            call: [a],
            queue: []
        };
        this._loadAllFeatures("css", a);
        this._loadAllFeatures("script", a);
        this._loadMonitor()
    },
    _queueItem: function (a, d, c, b) {
        if (!this._loadingEntities[d].queue[a]) {
            this._loadingEntities[d].queue[a] = {
                type: c,
                loaded: false,
                priority: b
            };
            this._loader._log("Enqueue: " + a)
        }
    },
    _loadScript: function (a, e) {
        var g = this._loadingEntities[e].queue[a],
            f, b, c, d, h = this;
        if (!this.isLoadedScript(a)) {
            g.loading = true;
            f = document.createElement("script");
            b = document.documentElement;
            d = b.childNodes.length;
            f.type = "text/javascript";
            f.src = a;
            f.async = true;
            f.loadingEntity = e;
            f.fileName = a;
            f.onreadystatechange = f.onload = function () {
                if (typeof (f.readyState) === "undefined" || f.readyState === "complete" || f.readyState === "loaded") {
                    g.loading = false;
                    h._scriptLoaded(this)
                }
            };
            if (b.nodeName !== "HEAD") {
                for (c = 0; c < d; c++) {
                    if (b.childNodes[c].nodeName === "HEAD") {
                        b = b.childNodes[c];
                        break
                    }
                }
            }
            b.appendChild(f)
        } else {
            if (!g.loading) {
                g.loaded = true;
                this._loadMonitor()
            }
        }
    },
    _loadCss: function (a, f) {
        if (!this.isLoadedCss(a)) {
            var d = document.createElement("link"),
                b = document.documentElement,
                c, e = b.childNodes.length;
            d.type = "text/css";
            d.rel = "stylesheet";
            d.href = a;
            d.media = "screen";
            d.loadingEntity = f;
            d.fileName = a;
            if (b.nodeName !== "HEAD") {
                for (c = 0; c < e; c++) {
                    if (b.childNodes[c].nodeName === "HEAD") {
                        b = b.childNodes[c];
                        break
                    }
                }
            }
            b.appendChild(d)
        }
        this._loadingEntities[f].queue[a].loaded = true;
        this._loadMonitor()
    },
    _scriptLoaded: function (d) {
        var c = d.readyState,
            a = this._loadingEntities[d.loadingEntity],
            b;
        if (a) {
            b = a.queue[d.fileName];
            if (b && !b.loaded && (!c || /loaded|complete/.test(c))) {
                b.loaded = true;
                this._loader._log("Loaded: " + d.fileName);
                this._loadMonitor()
            }
        }
    },
    _isLoadedHeadElem: function (f, g) {
        var b = document.documentElement,
            c, d = b.childNodes.length,
            a, e;
        if (b.nodeName !== "HEAD") {
            for (c = 0; c < d; c++) {
                if (b.childNodes[c].nodeName === "HEAD") {
                    b = b.childNodes[c];
                    break
                }
            }
            d = b.childNodes.length
        }
        for (c = 0; c < d; c++) {
            a = b.childNodes[c];
            if (g === "LINK") {
                e = a.href
            } else {
                if (g === "SCRIPT") {
                    e = a.src
                }
            }
            if (e && a.nodeName === g && e.lastIndexOf(f) !== -1) {
                return true
            }
        }
        return false
    },
    isLoadedScript: function (a) {
        return (a && a.length > 0 ? this._isLoadedHeadElem(a.substring(a.lastIndexOf("/")), "SCRIPT") : false)
    },
    isLoadedCss: function (a) {
        return (a && a.length > 0 ? this._isLoadedHeadElem(a.substring(a.lastIndexOf("/")), "link") : false)
    },
    _loadMonitor: function () {
        var d, j, b, f, e, g, h, a;
        for (d in this._loadingEntities) {
            if (this._loadingEntities.hasOwnProperty(d)) {
                b = this._loadingEntities[d];
                f = true;
                g = false;
                h = false;
                for (j in b.queue) {
                    if (b.queue.hasOwnProperty(j)) {
                        g = true;
                        e = b.queue[j];
                        f = f && e.loaded;
                        if (!f) {
                            if (e.type === "script") {
                                this._loadScript(j, d)
                            } else {
                                this._loadCss(j, d)
                            }
                            h = e.priority;
                            break
                        }
                    }
                }
                if (f && g && b.call) {
                    for (a = 0; a < b.call.length; a++) {
                        if (b.call[a]) {
                            b.call[a]()
                        }
                    }
                    delete this._loadingEntities[b.name]
                } else {
                    if (g && h) {
                        break
                    }
                }
            }
        }
    }
};