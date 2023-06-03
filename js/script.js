

(function() {
    var method;
    var noop = function() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});
  
    while (length--) {
        method = methods[length];
  
        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
  }());
  
  ! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e(require("@popperjs/core")) : "function" == typeof define && define.amd ? define(["@popperjs/core"], e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).bootstrap = e(t.Popper)
  }(this, (function(t) {
    "use strict";
  
    function e(t) {
        if (t && t.__esModule) return t;
        var e = Object.create(null);
        return t && Object.keys(t).forEach((function(s) {
            if ("default" !== s) {
                var i = Object.getOwnPropertyDescriptor(t, s);
                Object.defineProperty(e, s, i.get ? i : {
                    enumerable: !0,
                    get: function() {
                        return t[s]
                    }
                })
            }
        })), e.default = t, Object.freeze(e)
    }
    var s = e(t);
    const i = {
            find: (t, e = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(e, t)),
            findOne: (t, e = document.documentElement) => Element.prototype.querySelector.call(e, t),
            children: (t, e) => [].concat(...t.children).filter(t => t.matches(e)),
            parents(t, e) {
                const s = [];
                let i = t.parentNode;
                for (; i && i.nodeType === Node.ELEMENT_NODE && 3 !== i.nodeType;) i.matches(e) && s.push(i), i = i.parentNode;
                return s
            },
            prev(t, e) {
                let s = t.previousElementSibling;
                for (; s;) {
                    if (s.matches(e)) return [s];
                    s = s.previousElementSibling
                }
                return []
            },
            next(t, e) {
                let s = t.nextElementSibling;
                for (; s;) {
                    if (s.matches(e)) return [s];
                    s = s.nextElementSibling
                }
                return []
            }
        },
        n = t => {
            do {
                t += Math.floor(1e6 * Math.random())
            } while (document.getElementById(t));
            return t
        },
        o = t => {
            let e = t.getAttribute("data-bs-target");
            if (!e || "#" === e) {
                let s = t.getAttribute("href");
                if (!s || !s.includes("#") && !s.startsWith(".")) return null;
                s.includes("#") && !s.startsWith("#") && (s = "#" + s.split("#")[1]), e = s && "#" !== s ? s.trim() : null
            }
            return e
        },
        r = t => {
            const e = o(t);
            return e && document.querySelector(e) ? e : null
        },
        a = t => {
            const e = o(t);
            return e ? document.querySelector(e) : null
        },
        l = t => {
            t.dispatchEvent(new Event("transitionend"))
        },
        c = t => !(!t || "object" != typeof t) && (void 0 !== t.jquery && (t = t[0]), void 0 !== t.nodeType),
        h = t => c(t) ? t.jquery ? t[0] : t : "string" == typeof t && t.length > 0 ? i.findOne(t) : null,
        d = (t, e, s) => {
            Object.keys(s).forEach(i => {
                const n = s[i],
                    o = e[i],
                    r = o && c(o) ? "element" : null == (a = o) ? "" + a : {}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase();
                var a;
                if (!new RegExp(n).test(r)) throw new TypeError(`${t.toUpperCase()}: Option "${i}" provided type "${r}" but expected type "${n}".`)
            })
        },
        u = t => !(!c(t) || 0 === t.getClientRects().length) && "visible" === getComputedStyle(t).getPropertyValue("visibility"),
        g = t => !t || t.nodeType !== Node.ELEMENT_NODE || !!t.classList.contains("disabled") || (void 0 !== t.disabled ? t.disabled : t.hasAttribute("disabled") && "false" !== t.getAttribute("disabled")),
        p = t => {
            if (!document.documentElement.attachShadow) return null;
            if ("function" == typeof t.getRootNode) {
                const e = t.getRootNode();
                return e instanceof ShadowRoot ? e : null
            }
            return t instanceof ShadowRoot ? t : t.parentNode ? p(t.parentNode) : null
        },
        f = () => {},
        m = t => t.offsetHeight,
        _ = () => {
            const {
                jQuery: t
            } = window;
            return t && !document.body.hasAttribute("data-bs-no-jquery") ? t : null
        },
        b = [],
        v = () => "rtl" === document.documentElement.dir,
        y = t => {
            var e;
            e = () => {
                const e = _();
                if (e) {
                    const s = t.NAME,
                        i = e.fn[s];
                    e.fn[s] = t.jQueryInterface, e.fn[s].Constructor = t, e.fn[s].noConflict = () => (e.fn[s] = i, t.jQueryInterface)
                }
            }, "loading" === document.readyState ? (b.length || document.addEventListener("DOMContentLoaded", () => {
                b.forEach(t => t())
            }), b.push(e)) : e()
        },
        w = t => {
            "function" == typeof t && t()
        },
        E = (t, e, s = !0) => {
            if (!s) return void w(t);
            const i = (t => {
                if (!t) return 0;
                let {
                    transitionDuration: e,
                    transitionDelay: s
                } = window.getComputedStyle(t);
                const i = Number.parseFloat(e),
                    n = Number.parseFloat(s);
                return i || n ? (e = e.split(",")[0], s = s.split(",")[0], 1e3 * (Number.parseFloat(e) + Number.parseFloat(s))) : 0
            })(e) + 5;
            let n = !1;
            const o = ({
                target: s
            }) => {
                s === e && (n = !0, e.removeEventListener("transitionend", o), w(t))
            };
            e.addEventListener("transitionend", o), setTimeout(() => {
                n || l(e)
            }, i)
        },
        A = (t, e, s, i) => {
            let n = t.indexOf(e);
            if (-1 === n) return t[!s && i ? t.length - 1 : 0];
            const o = t.length;
            return n += s ? 1 : -1, i && (n = (n + o) % o), t[Math.max(0, Math.min(n, o - 1))]
        },
        T = /[^.]*(?=\..*)\.|.*/,
        C = /\..*/,
        k = /::\d+$/,
        L = {};
    let O = 1;
    const D = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        },
        I = /^(mouseenter|mouseleave)/i,
        N = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
  
    function S(t, e) {
        return e && `${e}::${O++}` || t.uidEvent || O++
    }
  
    function x(t) {
        const e = S(t);
        return t.uidEvent = e, L[e] = L[e] || {}, L[e]
    }
  
    function M(t, e, s = null) {
        const i = Object.keys(t);
        for (let n = 0, o = i.length; n < o; n++) {
            const o = t[i[n]];
            if (o.originalHandler === e && o.delegationSelector === s) return o
        }
        return null
    }
  
    function P(t, e, s) {
        const i = "string" == typeof e,
            n = i ? s : e;
        let o = R(t);
        return N.has(o) || (o = t), [i, n, o]
    }
  
    function j(t, e, s, i, n) {
        if ("string" != typeof e || !t) return;
        if (s || (s = i, i = null), I.test(e)) {
            const t = t => function(e) {
                if (!e.relatedTarget || e.relatedTarget !== e.delegateTarget && !e.delegateTarget.contains(e.relatedTarget)) return t.call(this, e)
            };
            i ? i = t(i) : s = t(s)
        }
        const [o, r, a] = P(e, s, i), l = x(t), c = l[a] || (l[a] = {}), h = M(c, r, o ? s : null);
        if (h) return void(h.oneOff = h.oneOff && n);
        const d = S(r, e.replace(T, "")),
            u = o ? function(t, e, s) {
                return function i(n) {
                    const o = t.querySelectorAll(e);
                    for (let {
                            target: r
                        } = n; r && r !== this; r = r.parentNode)
                        for (let a = o.length; a--;)
                            if (o[a] === r) return n.delegateTarget = r, i.oneOff && B.off(t, n.type, e, s), s.apply(r, [n]);
                    return null
                }
            }(t, s, i) : function(t, e) {
                return function s(i) {
                    return i.delegateTarget = t, s.oneOff && B.off(t, i.type, e), e.apply(t, [i])
                }
            }(t, s);
        u.delegationSelector = o ? s : null, u.originalHandler = r, u.oneOff = n, u.uidEvent = d, c[d] = u, t.addEventListener(a, u, o)
    }
  
    function H(t, e, s, i, n) {
        const o = M(e[s], i, n);
        o && (t.removeEventListener(s, o, Boolean(n)), delete e[s][o.uidEvent])
    }
  
    function R(t) {
        return t = t.replace(C, ""), D[t] || t
    }
    const B = {
            on(t, e, s, i) {
                j(t, e, s, i, !1)
            }, one(t, e, s, i) {
                j(t, e, s, i, !0)
            }, off(t, e, s, i) {
                if ("string" != typeof e || !t) return;
                const [n, o, r] = P(e, s, i), a = r !== e, l = x(t), c = e.startsWith(".");
                if (void 0 !== o) {
                    if (!l || !l[r]) return;
                    return void H(t, l, r, o, n ? s : null)
                }
                c && Object.keys(l).forEach(s => {
                    ! function(t, e, s, i) {
                        const n = e[s] || {};
                        Object.keys(n).forEach(o => {
                            if (o.includes(i)) {
                                const i = n[o];
                                H(t, e, s, i.originalHandler, i.delegationSelector)
                            }
                        })
                    }(t, l, s, e.slice(1))
                });
                const h = l[r] || {};
                Object.keys(h).forEach(s => {
                    const i = s.replace(k, "");
                    if (!a || e.includes(i)) {
                        const e = h[s];
                        H(t, l, r, e.originalHandler, e.delegationSelector)
                    }
                })
            }, trigger(t, e, s) {
                if ("string" != typeof e || !t) return null;
                const i = _(),
                    n = R(e),
                    o = e !== n,
                    r = N.has(n);
                let a, l = !0,
                    c = !0,
                    h = !1,
                    d = null;
                return o && i && (a = i.Event(e, s), i(t).trigger(a), l = !a.isPropagationStopped(), c = !a.isImmediatePropagationStopped(), h = a.isDefaultPrevented()), r ? (d = document.createEvent("HTMLEvents"), d.initEvent(n, l, !0)) : d = new CustomEvent(e, {
                    bubbles: l,
                    cancelable: !0
                }), void 0 !== s && Object.keys(s).forEach(t => {
                    Object.defineProperty(d, t, {
                        get: () => s[t]
                    })
                }), h && d.preventDefault(), c && t.dispatchEvent(d), d.defaultPrevented && void 0 !== a && a.preventDefault(), d
            }
        },
        $ = new Map;
    var W = {
        set(t, e, s) {
            $.has(t) || $.set(t, new Map);
            const i = $.get(t);
            i.has(e) || 0 === i.size ? i.set(e, s) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(i.keys())[0]}.`)
        }, get: (t, e) => $.has(t) && $.get(t).get(e) || null, remove(t, e) {
            if (!$.has(t)) return;
            const s = $.get(t);
            s.delete(e), 0 === s.size && $.delete(t)
        }
    };
    class q {
        constructor(t) {
            (t = h(t)) && (this._element = t, W.set(this._element, this.constructor.DATA_KEY, this))
        }
        dispose() {
            W.remove(this._element, this.constructor.DATA_KEY), B.off(this._element, this.constructor.EVENT_KEY), Object.getOwnPropertyNames(this).forEach(t => {
                this[t] = null
            })
        }
        _queueCallback(t, e, s = !0) {
            E(t, e, s)
        }
        static getInstance(t) {
            return W.get(t, this.DATA_KEY)
        }
        static getOrCreateInstance(t, e = {}) {
            return this.getInstance(t) || new this(t, "object" == typeof e ? e : null)
        }
        static get VERSION() {
            return "5.0.2"
        }
        static get NAME() {
            throw new Error('You have to implement the static method "NAME", for each component!')
        }
        static get DATA_KEY() {
            return "bs." + this.NAME
        }
        static get EVENT_KEY() {
            return "." + this.DATA_KEY
        }
    }
    class z extends q {
        static get NAME() {
            return "alert"
        }
        close(t) {
            const e = t ? this._getRootElement(t) : this._element,
                s = this._triggerCloseEvent(e);
            null === s || s.defaultPrevented || this._removeElement(e)
        }
        _getRootElement(t) {
            return a(t) || t.closest(".alert")
        }
        _triggerCloseEvent(t) {
            return B.trigger(t, "close.bs.alert")
        }
        _removeElement(t) {
            t.classList.remove("show");
            const e = t.classList.contains("fade");
            this._queueCallback(() => this._destroyElement(t), t, e)
        }
        _destroyElement(t) {
            t.remove(), B.trigger(t, "closed.bs.alert")
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = z.getOrCreateInstance(this);
                "close" === t && e[t](this)
            }))
        }
        static handleDismiss(t) {
            return function(e) {
                e && e.preventDefault(), t.close(this)
            }
        }
    }
    B.on(document, "click.bs.alert.data-api", '[data-bs-dismiss="alert"]', z.handleDismiss(new z)), y(z);
    class F extends q {
        static get NAME() {
            return "button"
        }
        toggle() {
            this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"))
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = F.getOrCreateInstance(this);
                "toggle" === t && e[t]()
            }))
        }
    }
  
    function U(t) {
        return "true" === t || "false" !== t && (t === Number(t).toString() ? Number(t) : "" === t || "null" === t ? null : t)
    }
  
    function K(t) {
        return t.replace(/[A-Z]/g, t => "-" + t.toLowerCase())
    }
    B.on(document, "click.bs.button.data-api", '[data-bs-toggle="button"]', t => {
        t.preventDefault();
        const e = t.target.closest('[data-bs-toggle="button"]');
        F.getOrCreateInstance(e).toggle()
    }), y(F);
    const V = {
            setDataAttribute(t, e, s) {
                t.setAttribute("data-bs-" + K(e), s)
            }, removeDataAttribute(t, e) {
                t.removeAttribute("data-bs-" + K(e))
            }, getDataAttributes(t) {
                if (!t) return {};
                const e = {};
                return Object.keys(t.dataset).filter(t => t.startsWith("bs")).forEach(s => {
                    let i = s.replace(/^bs/, "");
                    i = i.charAt(0).toLowerCase() + i.slice(1, i.length), e[i] = U(t.dataset[s])
                }), e
            }, getDataAttribute: (t, e) => U(t.getAttribute("data-bs-" + K(e))), offset(t) {
                const e = t.getBoundingClientRect();
                return {
                    top: e.top + document.body.scrollTop,
                    left: e.left + document.body.scrollLeft
                }
            }, position: t => ({
                top: t.offsetTop,
                left: t.offsetLeft
            })
        },
        Q = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0
        },
        X = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        },
        Y = "next",
        G = "prev",
        Z = "left",
        J = "right",
        tt = {
            ArrowLeft: J,
            ArrowRight: Z
        };
    class et extends q {
        constructor(t, e) {
            super(t), this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._indicatorsElement = i.findOne(".carousel-indicators", this._element), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(window.PointerEvent), this._addEventListeners()
        }
        static get Default() {
            return Q
        }
        static get NAME() {
            return "carousel"
        }
        next() {
            this._slide(Y)
        }
        nextWhenVisible() {
            !document.hidden && u(this._element) && this.next()
        }
        prev() {
            this._slide(G)
        }
        pause(t) {
            t || (this._isPaused = !0), i.findOne(".carousel-item-next, .carousel-item-prev", this._element) && (l(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
        }
        cycle(t) {
            t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config && this._config.interval && !this._isPaused && (this._updateInterval(), this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
        }
        to(t) {
            this._activeElement = i.findOne(".active.carousel-item", this._element);
            const e = this._getItemIndex(this._activeElement);
            if (t > this._items.length - 1 || t < 0) return;
            if (this._isSliding) return void B.one(this._element, "slid.bs.carousel", () => this.to(t));
            if (e === t) return this.pause(), void this.cycle();
            const s = t > e ? Y : G;
            this._slide(s, this._items[t])
        }
        _getConfig(t) {
            return t = {...Q, ...V.getDataAttributes(this._element), ...
                "object" == typeof t ? t : {}
            }, d("carousel", t, X), t
        }
        _handleSwipe() {
            const t = Math.abs(this.touchDeltaX);
            if (t <= 40) return;
            const e = t / this.touchDeltaX;
            this.touchDeltaX = 0, e && this._slide(e > 0 ? J : Z)
        }
        _addEventListeners() {
            this._config.keyboard && B.on(this._element, "keydown.bs.carousel", t => this._keydown(t)), "hover" === this._config.pause && (B.on(this._element, "mouseenter.bs.carousel", t => this.pause(t)), B.on(this._element, "mouseleave.bs.carousel", t => this.cycle(t))), this._config.touch && this._touchSupported && this._addTouchEventListeners()
        }
        _addTouchEventListeners() {
            const t = t => {
                    !this._pointerEvent || "pen" !== t.pointerType && "touch" !== t.pointerType ? this._pointerEvent || (this.touchStartX = t.touches[0].clientX) : this.touchStartX = t.clientX
                },
                e = t => {
                    this.touchDeltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this.touchStartX
                },
                s = t => {
                    !this._pointerEvent || "pen" !== t.pointerType && "touch" !== t.pointerType || (this.touchDeltaX = t.clientX - this.touchStartX), this._handleSwipe(), "hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(t => this.cycle(t), 500 + this._config.interval))
                };
            i.find(".carousel-item img", this._element).forEach(t => {
                B.on(t, "dragstart.bs.carousel", t => t.preventDefault())
            }), this._pointerEvent ? (B.on(this._element, "pointerdown.bs.carousel", e => t(e)), B.on(this._element, "pointerup.bs.carousel", t => s(t)), this._element.classList.add("pointer-event")) : (B.on(this._element, "touchstart.bs.carousel", e => t(e)), B.on(this._element, "touchmove.bs.carousel", t => e(t)), B.on(this._element, "touchend.bs.carousel", t => s(t)))
        }
        _keydown(t) {
            if (/input|textarea/i.test(t.target.tagName)) return;
            const e = tt[t.key];
            e && (t.preventDefault(), this._slide(e))
        }
        _getItemIndex(t) {
            return this._items = t && t.parentNode ? i.find(".carousel-item", t.parentNode) : [], this._items.indexOf(t)
        }
        _getItemByOrder(t, e) {
            const s = t === Y;
            return A(this._items, e, s, this._config.wrap)
        }
        _triggerSlideEvent(t, e) {
            const s = this._getItemIndex(t),
                n = this._getItemIndex(i.findOne(".active.carousel-item", this._element));
            return B.trigger(this._element, "slide.bs.carousel", {
                relatedTarget: t,
                direction: e,
                from: n,
                to: s
            })
        }
        _setActiveIndicatorElement(t) {
            if (this._indicatorsElement) {
                const e = i.findOne(".active", this._indicatorsElement);
                e.classList.remove("active"), e.removeAttribute("aria-current");
                const s = i.find("[data-bs-target]", this._indicatorsElement);
                for (let e = 0; e < s.length; e++)
                    if (Number.parseInt(s[e].getAttribute("data-bs-slide-to"), 10) === this._getItemIndex(t)) {
                        s[e].classList.add("active"), s[e].setAttribute("aria-current", "true");
                        break
                    }
            }
        }
        _updateInterval() {
            const t = this._activeElement || i.findOne(".active.carousel-item", this._element);
            if (!t) return;
            const e = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
            e ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = e) : this._config.interval = this._config.defaultInterval || this._config.interval
        }
        _slide(t, e) {
            const s = this._directionToOrder(t),
                n = i.findOne(".active.carousel-item", this._element),
                o = this._getItemIndex(n),
                r = e || this._getItemByOrder(s, n),
                a = this._getItemIndex(r),
                l = Boolean(this._interval),
                c = s === Y,
                h = c ? "carousel-item-start" : "carousel-item-end",
                d = c ? "carousel-item-next" : "carousel-item-prev",
                u = this._orderToDirection(s);
            if (r && r.classList.contains("active")) return void(this._isSliding = !1);
            if (this._isSliding) return;
            if (this._triggerSlideEvent(r, u).defaultPrevented) return;
            if (!n || !r) return;
            this._isSliding = !0, l && this.pause(), this._setActiveIndicatorElement(r), this._activeElement = r;
            const g = () => {
                B.trigger(this._element, "slid.bs.carousel", {
                    relatedTarget: r,
                    direction: u,
                    from: o,
                    to: a
                })
            };
            if (this._element.classList.contains("slide")) {
                r.classList.add(d), m(r), n.classList.add(h), r.classList.add(h);
                const t = () => {
                    r.classList.remove(h, d), r.classList.add("active"), n.classList.remove("active", d, h), this._isSliding = !1, setTimeout(g, 0)
                };
                this._queueCallback(t, n, !0)
            } else n.classList.remove("active"), r.classList.add("active"), this._isSliding = !1, g();
            l && this.cycle()
        }
        _directionToOrder(t) {
            return [J, Z].includes(t) ? v() ? t === Z ? G : Y : t === Z ? Y : G : t
        }
        _orderToDirection(t) {
            return [Y, G].includes(t) ? v() ? t === G ? Z : J : t === G ? J : Z : t
        }
        static carouselInterface(t, e) {
            const s = et.getOrCreateInstance(t, e);
            let {
                _config: i
            } = s;
            "object" == typeof e && (i = {...i, ...e
            });
            const n = "string" == typeof e ? e : i.slide;
            if ("number" == typeof e) s.to(e);
            else if ("string" == typeof n) {
                if (void 0 === s[n]) throw new TypeError(`No method named "${n}"`);
                s[n]()
            } else i.interval && i.ride && (s.pause(), s.cycle())
        }
        static jQueryInterface(t) {
            return this.each((function() {
                et.carouselInterface(this, t)
            }))
        }
        static dataApiClickHandler(t) {
            const e = a(this);
            if (!e || !e.classList.contains("carousel")) return;
            const s = {...V.getDataAttributes(e), ...V.getDataAttributes(this)
                },
                i = this.getAttribute("data-bs-slide-to");
            i && (s.interval = !1), et.carouselInterface(e, s), i && et.getInstance(e).to(i), t.preventDefault()
        }
    }
    B.on(document, "click.bs.carousel.data-api", "[data-bs-slide], [data-bs-slide-to]", et.dataApiClickHandler), B.on(window, "load.bs.carousel.data-api", () => {
        const t = i.find('[data-bs-ride="carousel"]');
        for (let e = 0, s = t.length; e < s; e++) et.carouselInterface(t[e], et.getInstance(t[e]))
    }), y(et);
    const st = {
            toggle: !0,
            parent: ""
        },
        it = {
            toggle: "boolean",
            parent: "(string|element)"
        };
    class nt extends q {
        constructor(t, e) {
            super(t), this._isTransitioning = !1, this._config = this._getConfig(e), this._triggerArray = i.find(`[data-bs-toggle="collapse"][href="#${this._element.id}"],[data-bs-toggle="collapse"][data-bs-target="#${this._element.id}"]`);
            const s = i.find('[data-bs-toggle="collapse"]');
            for (let t = 0, e = s.length; t < e; t++) {
                const e = s[t],
                    n = r(e),
                    o = i.find(n).filter(t => t === this._element);
                null !== n && o.length && (this._selector = n, this._triggerArray.push(e))
            }
            this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
        }
        static get Default() {
            return st
        }
        static get NAME() {
            return "collapse"
        }
        toggle() {
            this._element.classList.contains("show") ? this.hide() : this.show()
        }
        show() {
            if (this._isTransitioning || this._element.classList.contains("show")) return;
            let t, e;
            this._parent && (t = i.find(".show, .collapsing", this._parent).filter(t => "string" == typeof this._config.parent ? t.getAttribute("data-bs-parent") === this._config.parent : t.classList.contains("collapse")), 0 === t.length && (t = null));
            const s = i.findOne(this._selector);
            if (t) {
                const i = t.find(t => s !== t);
                if (e = i ? nt.getInstance(i) : null, e && e._isTransitioning) return
            }
            if (B.trigger(this._element, "show.bs.collapse").defaultPrevented) return;
            t && t.forEach(t => {
                s !== t && nt.collapseInterface(t, "hide"), e || W.set(t, "bs.collapse", null)
            });
            const n = this._getDimension();
            this._element.classList.remove("collapse"), this._element.classList.add("collapsing"), this._element.style[n] = 0, this._triggerArray.length && this._triggerArray.forEach(t => {
                t.classList.remove("collapsed"), t.setAttribute("aria-expanded", !0)
            }), this.setTransitioning(!0);
            const o = "scroll" + (n[0].toUpperCase() + n.slice(1));
            this._queueCallback(() => {
                this._element.classList.remove("collapsing"), this._element.classList.add("collapse", "show"), this._element.style[n] = "", this.setTransitioning(!1), B.trigger(this._element, "shown.bs.collapse")
            }, this._element, !0), this._element.style[n] = this._element[o] + "px"
        }
        hide() {
            if (this._isTransitioning || !this._element.classList.contains("show")) return;
            if (B.trigger(this._element, "hide.bs.collapse").defaultPrevented) return;
            const t = this._getDimension();
            this._element.style[t] = this._element.getBoundingClientRect()[t] + "px", m(this._element), this._element.classList.add("collapsing"), this._element.classList.remove("collapse", "show");
            const e = this._triggerArray.length;
            if (e > 0)
                for (let t = 0; t < e; t++) {
                    const e = this._triggerArray[t],
                        s = a(e);
                    s && !s.classList.contains("show") && (e.classList.add("collapsed"), e.setAttribute("aria-expanded", !1))
                }
            this.setTransitioning(!0), this._element.style[t] = "", this._queueCallback(() => {
                this.setTransitioning(!1), this._element.classList.remove("collapsing"), this._element.classList.add("collapse"), B.trigger(this._element, "hidden.bs.collapse")
            }, this._element, !0)
        }
        setTransitioning(t) {
            this._isTransitioning = t
        }
        _getConfig(t) {
            return (t = {...st, ...t
            }).toggle = Boolean(t.toggle), d("collapse", t, it), t
        }
        _getDimension() {
            return this._element.classList.contains("width") ? "width" : "height"
        }
        _getParent() {
            let {
                parent: t
            } = this._config;
            t = h(t);
            const e = `[data-bs-toggle="collapse"][data-bs-parent="${t}"]`;
            return i.find(e, t).forEach(t => {
                const e = a(t);
                this._addAriaAndCollapsedClass(e, [t])
            }), t
        }
        _addAriaAndCollapsedClass(t, e) {
            if (!t || !e.length) return;
            const s = t.classList.contains("show");
            e.forEach(t => {
                s ? t.classList.remove("collapsed") : t.classList.add("collapsed"), t.setAttribute("aria-expanded", s)
            })
        }
        static collapseInterface(t, e) {
            let s = nt.getInstance(t);
            const i = {...st, ...V.getDataAttributes(t), ...
                "object" == typeof e && e ? e : {}
            };
            if (!s && i.toggle && "string" == typeof e && /show|hide/.test(e) && (i.toggle = !1), s || (s = new nt(t, i)), "string" == typeof e) {
                if (void 0 === s[e]) throw new TypeError(`No method named "${e}"`);
                s[e]()
            }
        }
        static jQueryInterface(t) {
            return this.each((function() {
                nt.collapseInterface(this, t)
            }))
        }
    }
    B.on(document, "click.bs.collapse.data-api", '[data-bs-toggle="collapse"]', (function(t) {
        ("A" === t.target.tagName || t.delegateTarget && "A" === t.delegateTarget.tagName) && t.preventDefault();
        const e = V.getDataAttributes(this),
            s = r(this);
        i.find(s).forEach(t => {
            const s = nt.getInstance(t);
            let i;
            s ? (null === s._parent && "string" == typeof e.parent && (s._config.parent = e.parent, s._parent = s._getParent()), i = "toggle") : i = e, nt.collapseInterface(t, i)
        })
    })), y(nt);
    const ot = new RegExp("ArrowUp|ArrowDown|Escape"),
        rt = v() ? "top-end" : "top-start",
        at = v() ? "top-start" : "top-end",
        lt = v() ? "bottom-end" : "bottom-start",
        ct = v() ? "bottom-start" : "bottom-end",
        ht = v() ? "left-start" : "right-start",
        dt = v() ? "right-start" : "left-start",
        ut = {
            offset: [0, 2],
            boundary: "clippingParents",
            reference: "toggle",
            display: "dynamic",
            popperConfig: null,
            autoClose: !0
        },
        gt = {
            offset: "(array|string|function)",
            boundary: "(string|element)",
            reference: "(string|element|object)",
            display: "string",
            popperConfig: "(null|object|function)",
            autoClose: "(boolean|string)"
        };
    class pt extends q {
        constructor(t, e) {
            super(t), this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
        }
        static get Default() {
            return ut
        }
        static get DefaultType() {
            return gt
        }
        static get NAME() {
            return "dropdown"
        }
        toggle() {
            g(this._element) || (this._element.classList.contains("show") ? this.hide() : this.show())
        }
        show() {
            if (g(this._element) || this._menu.classList.contains("show")) return;
            const t = pt.getParentFromElement(this._element),
                e = {
                    relatedTarget: this._element
                };
            if (!B.trigger(this._element, "show.bs.dropdown", e).defaultPrevented) {
                if (this._inNavbar) V.setDataAttribute(this._menu, "popper", "none");
                else {
                    if (void 0 === s) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
                    let e = this._element;
                    "parent" === this._config.reference ? e = t : c(this._config.reference) ? e = h(this._config.reference) : "object" == typeof this._config.reference && (e = this._config.reference);
                    const i = this._getPopperConfig(),
                        n = i.modifiers.find(t => "applyStyles" === t.name && !1 === t.enabled);
                    this._popper = s.createPopper(e, this._menu, i), n && V.setDataAttribute(this._menu, "popper", "static")
                }
                "ontouchstart" in document.documentElement && !t.closest(".navbar-nav") && [].concat(...document.body.children).forEach(t => B.on(t, "mouseover", f)), this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.toggle("show"), this._element.classList.toggle("show"), B.trigger(this._element, "shown.bs.dropdown", e)
            }
        }
        hide() {
            if (g(this._element) || !this._menu.classList.contains("show")) return;
            const t = {
                relatedTarget: this._element
            };
            this._completeHide(t)
        }
        dispose() {
            this._popper && this._popper.destroy(), super.dispose()
        }
        update() {
            this._inNavbar = this._detectNavbar(), this._popper && this._popper.update()
        }
        _addEventListeners() {
            B.on(this._element, "click.bs.dropdown", t => {
                t.preventDefault(), this.toggle()
            })
        }
        _completeHide(t) {
            B.trigger(this._element, "hide.bs.dropdown", t).defaultPrevented || ("ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach(t => B.off(t, "mouseover", f)), this._popper && this._popper.destroy(), this._menu.classList.remove("show"), this._element.classList.remove("show"), this._element.setAttribute("aria-expanded", "false"), V.removeDataAttribute(this._menu, "popper"), B.trigger(this._element, "hidden.bs.dropdown", t))
        }
        _getConfig(t) {
            if (t = {...this.constructor.Default, ...V.getDataAttributes(this._element), ...t
                }, d("dropdown", t, this.constructor.DefaultType), "object" == typeof t.reference && !c(t.reference) && "function" != typeof t.reference.getBoundingClientRect) throw new TypeError("dropdown".toUpperCase() + ': Option "reference" provided type "object" without a required "getBoundingClientRect" method.');
            return t
        }
        _getMenuElement() {
            return i.next(this._element, ".dropdown-menu")[0]
        }
        _getPlacement() {
            const t = this._element.parentNode;
            if (t.classList.contains("dropend")) return ht;
            if (t.classList.contains("dropstart")) return dt;
            const e = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
            return t.classList.contains("dropup") ? e ? at : rt : e ? ct : lt
        }
        _detectNavbar() {
            return null !== this._element.closest(".navbar")
        }
        _getOffset() {
            const {
                offset: t
            } = this._config;
            return "string" == typeof t ? t.split(",").map(t => Number.parseInt(t, 10)) : "function" == typeof t ? e => t(e, this._element) : t
        }
        _getPopperConfig() {
            const t = {
                placement: this._getPlacement(),
                modifiers: [{
                    name: "preventOverflow",
                    options: {
                        boundary: this._config.boundary
                    }
                }, {
                    name: "offset",
                    options: {
                        offset: this._getOffset()
                    }
                }]
            };
            return "static" === this._config.display && (t.modifiers = [{
                name: "applyStyles",
                enabled: !1
            }]), {...t, ...
                "function" == typeof this._config.popperConfig ? this._config.popperConfig(t) : this._config.popperConfig
            }
        }
        _selectMenuItem({
            key: t,
            target: e
        }) {
            const s = i.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter(u);
            s.length && A(s, e, "ArrowDown" === t, !s.includes(e)).focus()
        }
        static dropdownInterface(t, e) {
            const s = pt.getOrCreateInstance(t, e);
            if ("string" == typeof e) {
                if (void 0 === s[e]) throw new TypeError(`No method named "${e}"`);
                s[e]()
            }
        }
        static jQueryInterface(t) {
            return this.each((function() {
                pt.dropdownInterface(this, t)
            }))
        }
        static clearMenus(t) {
            if (t && (2 === t.button || "keyup" === t.type && "Tab" !== t.key)) return;
            const e = i.find('[data-bs-toggle="dropdown"]');
            for (let s = 0, i = e.length; s < i; s++) {
                const i = pt.getInstance(e[s]);
                if (!i || !1 === i._config.autoClose) continue;
                if (!i._element.classList.contains("show")) continue;
                const n = {
                    relatedTarget: i._element
                };
                if (t) {
                    const e = t.composedPath(),
                        s = e.includes(i._menu);
                    if (e.includes(i._element) || "inside" === i._config.autoClose && !s || "outside" === i._config.autoClose && s) continue;
                    if (i._menu.contains(t.target) && ("keyup" === t.type && "Tab" === t.key || /input|select|option|textarea|form/i.test(t.target.tagName))) continue;
                    "click" === t.type && (n.clickEvent = t)
                }
                i._completeHide(n)
            }
        }
        static getParentFromElement(t) {
            return a(t) || t.parentNode
        }
        static dataApiKeydownHandler(t) {
            if (/input|textarea/i.test(t.target.tagName) ? "Space" === t.key || "Escape" !== t.key && ("ArrowDown" !== t.key && "ArrowUp" !== t.key || t.target.closest(".dropdown-menu")) : !ot.test(t.key)) return;
            const e = this.classList.contains("show");
            if (!e && "Escape" === t.key) return;
            if (t.preventDefault(), t.stopPropagation(), g(this)) return;
            const s = () => this.matches('[data-bs-toggle="dropdown"]') ? this : i.prev(this, '[data-bs-toggle="dropdown"]')[0];
            return "Escape" === t.key ? (s().focus(), void pt.clearMenus()) : "ArrowUp" === t.key || "ArrowDown" === t.key ? (e || s().click(), void pt.getInstance(s())._selectMenuItem(t)) : void(e && "Space" !== t.key || pt.clearMenus())
        }
    }
    B.on(document, "keydown.bs.dropdown.data-api", '[data-bs-toggle="dropdown"]', pt.dataApiKeydownHandler), B.on(document, "keydown.bs.dropdown.data-api", ".dropdown-menu", pt.dataApiKeydownHandler), B.on(document, "click.bs.dropdown.data-api", pt.clearMenus), B.on(document, "keyup.bs.dropdown.data-api", pt.clearMenus), B.on(document, "click.bs.dropdown.data-api", '[data-bs-toggle="dropdown"]', (function(t) {
        t.preventDefault(), pt.dropdownInterface(this)
    })), y(pt);
    class ft {
        constructor() {
            this._element = document.body
        }
        getWidth() {
            const t = document.documentElement.clientWidth;
            return Math.abs(window.innerWidth - t)
        }
        hide() {
            const t = this.getWidth();
            this._disableOverFlow(), this._setElementAttributes(this._element, "paddingRight", e => e + t), this._setElementAttributes(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", "paddingRight", e => e + t), this._setElementAttributes(".sticky-top", "marginRight", e => e - t)
        }
        _disableOverFlow() {
            this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden"
        }
        _setElementAttributes(t, e, s) {
            const i = this.getWidth();
            this._applyManipulationCallback(t, t => {
                if (t !== this._element && window.innerWidth > t.clientWidth + i) return;
                this._saveInitialAttribute(t, e);
                const n = window.getComputedStyle(t)[e];
                t.style[e] = s(Number.parseFloat(n)) + "px"
            })
        }
        reset() {
            this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, "paddingRight"), this._resetElementAttributes(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", "paddingRight"), this._resetElementAttributes(".sticky-top", "marginRight")
        }
        _saveInitialAttribute(t, e) {
            const s = t.style[e];
            s && V.setDataAttribute(t, e, s)
        }
        _resetElementAttributes(t, e) {
            this._applyManipulationCallback(t, t => {
                const s = V.getDataAttribute(t, e);
                void 0 === s ? t.style.removeProperty(e) : (V.removeDataAttribute(t, e), t.style[e] = s)
            })
        }
        _applyManipulationCallback(t, e) {
            c(t) ? e(t) : i.find(t, this._element).forEach(e)
        }
        isOverflowing() {
            return this.getWidth() > 0
        }
    }
    const mt = {
            isVisible: !0,
            isAnimated: !1,
            rootElement: "body",
            clickCallback: null
        },
        _t = {
            isVisible: "boolean",
            isAnimated: "boolean",
            rootElement: "(element|string)",
            clickCallback: "(function|null)"
        };
    class bt {
        constructor(t) {
            this._config = this._getConfig(t), this._isAppended = !1, this._element = null
        }
        show(t) {
            this._config.isVisible ? (this._append(), this._config.isAnimated && m(this._getElement()), this._getElement().classList.add("show"), this._emulateAnimation(() => {
                w(t)
            })) : w(t)
        }
        hide(t) {
            this._config.isVisible ? (this._getElement().classList.remove("show"), this._emulateAnimation(() => {
                this.dispose(), w(t)
            })) : w(t)
        }
        _getElement() {
            if (!this._element) {
                const t = document.createElement("div");
                t.className = "modal-backdrop", this._config.isAnimated && t.classList.add("fade"), this._element = t
            }
            return this._element
        }
        _getConfig(t) {
            return (t = {...mt, ...
                "object" == typeof t ? t : {}
            }).rootElement = h(t.rootElement), d("backdrop", t, _t), t
        }
        _append() {
            this._isAppended || (this._config.rootElement.appendChild(this._getElement()), B.on(this._getElement(), "mousedown.bs.backdrop", () => {
                w(this._config.clickCallback)
            }), this._isAppended = !0)
        }
        dispose() {
            this._isAppended && (B.off(this._element, "mousedown.bs.backdrop"), this._element.remove(), this._isAppended = !1)
        }
        _emulateAnimation(t) {
            E(t, this._getElement(), this._config.isAnimated)
        }
    }
    const vt = {
            backdrop: !0,
            keyboard: !0,
            focus: !0
        },
        yt = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean"
        };
    class wt extends q {
        constructor(t, e) {
            super(t), this._config = this._getConfig(e), this._dialog = i.findOne(".modal-dialog", this._element), this._backdrop = this._initializeBackDrop(), this._isShown = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollBar = new ft
        }
        static get Default() {
            return vt
        }
        static get NAME() {
            return "modal"
        }
        toggle(t) {
            return this._isShown ? this.hide() : this.show(t)
        }
        show(t) {
            this._isShown || this._isTransitioning || B.trigger(this._element, "show.bs.modal", {
                relatedTarget: t
            }).defaultPrevented || (this._isShown = !0, this._isAnimated() && (this._isTransitioning = !0), this._scrollBar.hide(), document.body.classList.add("modal-open"), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), B.on(this._element, "click.dismiss.bs.modal", '[data-bs-dismiss="modal"]', t => this.hide(t)), B.on(this._dialog, "mousedown.dismiss.bs.modal", () => {
                B.one(this._element, "mouseup.dismiss.bs.modal", t => {
                    t.target === this._element && (this._ignoreBackdropClick = !0)
                })
            }), this._showBackdrop(() => this._showElement(t)))
        }
        hide(t) {
            if (t && ["A", "AREA"].includes(t.target.tagName) && t.preventDefault(), !this._isShown || this._isTransitioning) return;
            if (B.trigger(this._element, "hide.bs.modal").defaultPrevented) return;
            this._isShown = !1;
            const e = this._isAnimated();
            e && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), B.off(document, "focusin.bs.modal"), this._element.classList.remove("show"), B.off(this._element, "click.dismiss.bs.modal"), B.off(this._dialog, "mousedown.dismiss.bs.modal"), this._queueCallback(() => this._hideModal(), this._element, e)
        }
        dispose() {
            [window, this._dialog].forEach(t => B.off(t, ".bs.modal")), this._backdrop.dispose(), super.dispose(), B.off(document, "focusin.bs.modal")
        }
        handleUpdate() {
            this._adjustDialog()
        }
        _initializeBackDrop() {
            return new bt({
                isVisible: Boolean(this._config.backdrop),
                isAnimated: this._isAnimated()
            })
        }
        _getConfig(t) {
            return t = {...vt, ...V.getDataAttributes(this._element), ...
                "object" == typeof t ? t : {}
            }, d("modal", t, yt), t
        }
        _showElement(t) {
            const e = this._isAnimated(),
                s = i.findOne(".modal-body", this._dialog);
            this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0, s && (s.scrollTop = 0), e && m(this._element), this._element.classList.add("show"), this._config.focus && this._enforceFocus(), this._queueCallback(() => {
                this._config.focus && this._element.focus(), this._isTransitioning = !1, B.trigger(this._element, "shown.bs.modal", {
                    relatedTarget: t
                })
            }, this._dialog, e)
        }
        _enforceFocus() {
            B.off(document, "focusin.bs.modal"), B.on(document, "focusin.bs.modal", t => {
                document === t.target || this._element === t.target || this._element.contains(t.target) || this._element.focus()
            })
        }
        _setEscapeEvent() {
            this._isShown ? B.on(this._element, "keydown.dismiss.bs.modal", t => {
                this._config.keyboard && "Escape" === t.key ? (t.preventDefault(), this.hide()) : this._config.keyboard || "Escape" !== t.key || this._triggerBackdropTransition()
            }) : B.off(this._element, "keydown.dismiss.bs.modal")
        }
        _setResizeEvent() {
            this._isShown ? B.on(window, "resize.bs.modal", () => this._adjustDialog()) : B.off(window, "resize.bs.modal")
        }
        _hideModal() {
            this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._backdrop.hide(() => {
                document.body.classList.remove("modal-open"), this._resetAdjustments(), this._scrollBar.reset(), B.trigger(this._element, "hidden.bs.modal")
            })
        }
        _showBackdrop(t) {
            B.on(this._element, "click.dismiss.bs.modal", t => {
                this._ignoreBackdropClick ? this._ignoreBackdropClick = !1 : t.target === t.currentTarget && (!0 === this._config.backdrop ? this.hide() : "static" === this._config.backdrop && this._triggerBackdropTransition())
            }), this._backdrop.show(t)
        }
        _isAnimated() {
            return this._element.classList.contains("fade")
        }
        _triggerBackdropTransition() {
            if (B.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented) return;
            const {
                classList: t,
                scrollHeight: e,
                style: s
            } = this._element, i = e > document.documentElement.clientHeight;
            !i && "hidden" === s.overflowY || t.contains("modal-static") || (i || (s.overflowY = "hidden"), t.add("modal-static"), this._queueCallback(() => {
                t.remove("modal-static"), i || this._queueCallback(() => {
                    s.overflowY = ""
                }, this._dialog)
            }, this._dialog), this._element.focus())
        }
        _adjustDialog() {
            const t = this._element.scrollHeight > document.documentElement.clientHeight,
                e = this._scrollBar.getWidth(),
                s = e > 0;
            (!s && t && !v() || s && !t && v()) && (this._element.style.paddingLeft = e + "px"), (s && !t && !v() || !s && t && v()) && (this._element.style.paddingRight = e + "px")
        }
        _resetAdjustments() {
            this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
        }
        static jQueryInterface(t, e) {
            return this.each((function() {
                const s = wt.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === s[t]) throw new TypeError(`No method named "${t}"`);
                    s[t](e)
                }
            }))
        }
    }
    B.on(document, "click.bs.modal.data-api", '[data-bs-toggle="modal"]', (function(t) {
        const e = a(this);
        ["A", "AREA"].includes(this.tagName) && t.preventDefault(), B.one(e, "show.bs.modal", t => {
            t.defaultPrevented || B.one(e, "hidden.bs.modal", () => {
                u(this) && this.focus()
            })
        }), wt.getOrCreateInstance(e).toggle(this)
    })), y(wt);
    const Et = {
            backdrop: !0,
            keyboard: !0,
            scroll: !1
        },
        At = {
            backdrop: "boolean",
            keyboard: "boolean",
            scroll: "boolean"
        };
    class Tt extends q {
        constructor(t, e) {
            super(t), this._config = this._getConfig(e), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._addEventListeners()
        }
        static get NAME() {
            return "offcanvas"
        }
        static get Default() {
            return Et
        }
        toggle(t) {
            return this._isShown ? this.hide() : this.show(t)
        }
        show(t) {
            this._isShown || B.trigger(this._element, "show.bs.offcanvas", {
                relatedTarget: t
            }).defaultPrevented || (this._isShown = !0, this._element.style.visibility = "visible", this._backdrop.show(), this._config.scroll || ((new ft).hide(), this._enforceFocusOnElement(this._element)), this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add("show"), this._queueCallback(() => {
                B.trigger(this._element, "shown.bs.offcanvas", {
                    relatedTarget: t
                })
            }, this._element, !0))
        }
        hide() {
            this._isShown && (B.trigger(this._element, "hide.bs.offcanvas").defaultPrevented || (B.off(document, "focusin.bs.offcanvas"), this._element.blur(), this._isShown = !1, this._element.classList.remove("show"), this._backdrop.hide(), this._queueCallback(() => {
                this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._element.style.visibility = "hidden", this._config.scroll || (new ft).reset(), B.trigger(this._element, "hidden.bs.offcanvas")
            }, this._element, !0)))
        }
        dispose() {
            this._backdrop.dispose(), super.dispose(), B.off(document, "focusin.bs.offcanvas")
        }
        _getConfig(t) {
            return t = {...Et, ...V.getDataAttributes(this._element), ...
                "object" == typeof t ? t : {}
            }, d("offcanvas", t, At), t
        }
        _initializeBackDrop() {
            return new bt({
                isVisible: this._config.backdrop,
                isAnimated: !0,
                rootElement: this._element.parentNode,
                clickCallback: () => this.hide()
            })
        }
        _enforceFocusOnElement(t) {
            B.off(document, "focusin.bs.offcanvas"), B.on(document, "focusin.bs.offcanvas", e => {
                document === e.target || t === e.target || t.contains(e.target) || t.focus()
            }), t.focus()
        }
        _addEventListeners() {
            B.on(this._element, "click.dismiss.bs.offcanvas", '[data-bs-dismiss="offcanvas"]', () => this.hide()), B.on(this._element, "keydown.dismiss.bs.offcanvas", t => {
                this._config.keyboard && "Escape" === t.key && this.hide()
            })
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = Tt.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                    e[t](this)
                }
            }))
        }
    }
    B.on(document, "click.bs.offcanvas.data-api", '[data-bs-toggle="offcanvas"]', (function(t) {
        const e = a(this);
        if (["A", "AREA"].includes(this.tagName) && t.preventDefault(), g(this)) return;
        B.one(e, "hidden.bs.offcanvas", () => {
            u(this) && this.focus()
        });
        const s = i.findOne(".offcanvas.show");
        s && s !== e && Tt.getInstance(s).hide(), Tt.getOrCreateInstance(e).toggle(this)
    })), B.on(window, "load.bs.offcanvas.data-api", () => i.find(".offcanvas.show").forEach(t => Tt.getOrCreateInstance(t).show())), y(Tt);
    const Ct = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
        kt = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/i,
        Lt = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
        Ot = (t, e) => {
            const s = t.nodeName.toLowerCase();
            if (e.includes(s)) return !Ct.has(s) || Boolean(kt.test(t.nodeValue) || Lt.test(t.nodeValue));
            const i = e.filter(t => t instanceof RegExp);
            for (let t = 0, e = i.length; t < e; t++)
                if (i[t].test(s)) return !0;
            return !1
        };
  
    function Dt(t, e, s) {
        if (!t.length) return t;
        if (s && "function" == typeof s) return s(t);
        const i = (new window.DOMParser).parseFromString(t, "text/html"),
            n = Object.keys(e),
            o = [].concat(...i.body.querySelectorAll("*"));
        for (let t = 0, s = o.length; t < s; t++) {
            const s = o[t],
                i = s.nodeName.toLowerCase();
            if (!n.includes(i)) {
                s.remove();
                continue
            }
            const r = [].concat(...s.attributes),
                a = [].concat(e["*"] || [], e[i] || []);
            r.forEach(t => {
                Ot(t, a) || s.removeAttribute(t.nodeName)
            })
        }
        return i.body.innerHTML
    }
    const It = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
        Nt = new Set(["sanitize", "allowList", "sanitizeFn"]),
        St = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(array|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacements: "array",
            boundary: "(string|element)",
            customClass: "(string|function)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            allowList: "object",
            popperConfig: "(null|object|function)"
        },
        xt = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: v() ? "left" : "right",
            BOTTOM: "bottom",
            LEFT: v() ? "right" : "left"
        },
        Mt = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: [0, 0],
            container: !1,
            fallbackPlacements: ["top", "right", "bottom", "left"],
            boundary: "clippingParents",
            customClass: "",
            sanitize: !0,
            sanitizeFn: null,
            allowList: {
                "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
                a: ["target", "href", "title", "rel"],
                area: [],
                b: [],
                br: [],
                col: [],
                code: [],
                div: [],
                em: [],
                hr: [],
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                h6: [],
                i: [],
                img: ["src", "srcset", "alt", "title", "width", "height"],
                li: [],
                ol: [],
                p: [],
                pre: [],
                s: [],
                small: [],
                span: [],
                sub: [],
                sup: [],
                strong: [],
                u: [],
                ul: []
            },
            popperConfig: null
        },
        Pt = {
            HIDE: "hide.bs.tooltip",
            HIDDEN: "hidden.bs.tooltip",
            SHOW: "show.bs.tooltip",
            SHOWN: "shown.bs.tooltip",
            INSERTED: "inserted.bs.tooltip",
            CLICK: "click.bs.tooltip",
            FOCUSIN: "focusin.bs.tooltip",
            FOCUSOUT: "focusout.bs.tooltip",
            MOUSEENTER: "mouseenter.bs.tooltip",
            MOUSELEAVE: "mouseleave.bs.tooltip"
        };
    class jt extends q {
        constructor(t, e) {
            if (void 0 === s) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
            super(t), this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this._config = this._getConfig(e), this.tip = null, this._setListeners()
        }
        static get Default() {
            return Mt
        }
        static get NAME() {
            return "tooltip"
        }
        static get Event() {
            return Pt
        }
        static get DefaultType() {
            return St
        }
        enable() {
            this._isEnabled = !0
        }
        disable() {
            this._isEnabled = !1
        }
        toggleEnabled() {
            this._isEnabled = !this._isEnabled
        }
        toggle(t) {
            if (this._isEnabled)
                if (t) {
                    const e = this._initializeOnDelegatedTarget(t);
                    e._activeTrigger.click = !e._activeTrigger.click, e._isWithActiveTrigger() ? e._enter(null, e) : e._leave(null, e)
                } else {
                    if (this.getTipElement().classList.contains("show")) return void this._leave(null, this);
                    this._enter(null, this)
                }
        }
        dispose() {
            clearTimeout(this._timeout), B.off(this._element.closest(".modal"), "hide.bs.modal", this._hideModalHandler), this.tip && this.tip.remove(), this._popper && this._popper.destroy(), super.dispose()
        }
        show() {
            if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");
            if (!this.isWithContent() || !this._isEnabled) return;
            const t = B.trigger(this._element, this.constructor.Event.SHOW),
                e = p(this._element),
                i = null === e ? this._element.ownerDocument.documentElement.contains(this._element) : e.contains(this._element);
            if (t.defaultPrevented || !i) return;
            const o = this.getTipElement(),
                r = n(this.constructor.NAME);
            o.setAttribute("id", r), this._element.setAttribute("aria-describedby", r), this.setContent(), this._config.animation && o.classList.add("fade");
            const a = "function" == typeof this._config.placement ? this._config.placement.call(this, o, this._element) : this._config.placement,
                l = this._getAttachment(a);
            this._addAttachmentClass(l);
            const {
                container: c
            } = this._config;
            W.set(o, this.constructor.DATA_KEY, this), this._element.ownerDocument.documentElement.contains(this.tip) || (c.appendChild(o), B.trigger(this._element, this.constructor.Event.INSERTED)), this._popper ? this._popper.update() : this._popper = s.createPopper(this._element, o, this._getPopperConfig(l)), o.classList.add("show");
            const h = "function" == typeof this._config.customClass ? this._config.customClass() : this._config.customClass;
            h && o.classList.add(...h.split(" ")), "ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach(t => {
                B.on(t, "mouseover", f)
            });
            const d = this.tip.classList.contains("fade");
            this._queueCallback(() => {
                const t = this._hoverState;
                this._hoverState = null, B.trigger(this._element, this.constructor.Event.SHOWN), "out" === t && this._leave(null, this)
            }, this.tip, d)
        }
        hide() {
            if (!this._popper) return;
            const t = this.getTipElement();
            if (B.trigger(this._element, this.constructor.Event.HIDE).defaultPrevented) return;
            t.classList.remove("show"), "ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach(t => B.off(t, "mouseover", f)), this._activeTrigger.click = !1, this._activeTrigger.focus = !1, this._activeTrigger.hover = !1;
            const e = this.tip.classList.contains("fade");
            this._queueCallback(() => {
                this._isWithActiveTrigger() || ("show" !== this._hoverState && t.remove(), this._cleanTipClass(), this._element.removeAttribute("aria-describedby"), B.trigger(this._element, this.constructor.Event.HIDDEN), this._popper && (this._popper.destroy(), this._popper = null))
            }, this.tip, e), this._hoverState = ""
        }
        update() {
            null !== this._popper && this._popper.update()
        }
        isWithContent() {
            return Boolean(this.getTitle())
        }
        getTipElement() {
            if (this.tip) return this.tip;
            const t = document.createElement("div");
            return t.innerHTML = this._config.template, this.tip = t.children[0], this.tip
        }
        setContent() {
            const t = this.getTipElement();
            this.setElementContent(i.findOne(".tooltip-inner", t), this.getTitle()), t.classList.remove("fade", "show")
        }
        setElementContent(t, e) {
            if (null !== t) return c(e) ? (e = h(e), void(this._config.html ? e.parentNode !== t && (t.innerHTML = "", t.appendChild(e)) : t.textContent = e.textContent)) : void(this._config.html ? (this._config.sanitize && (e = Dt(e, this._config.allowList, this._config.sanitizeFn)), t.innerHTML = e) : t.textContent = e)
        }
        getTitle() {
            let t = this._element.getAttribute("data-bs-original-title");
            return t || (t = "function" == typeof this._config.title ? this._config.title.call(this._element) : this._config.title), t
        }
        updateAttachment(t) {
            return "right" === t ? "end" : "left" === t ? "start" : t
        }
        _initializeOnDelegatedTarget(t, e) {
            const s = this.constructor.DATA_KEY;
            return (e = e || W.get(t.delegateTarget, s)) || (e = new this.constructor(t.delegateTarget, this._getDelegateConfig()), W.set(t.delegateTarget, s, e)), e
        }
        _getOffset() {
            const {
                offset: t
            } = this._config;
            return "string" == typeof t ? t.split(",").map(t => Number.parseInt(t, 10)) : "function" == typeof t ? e => t(e, this._element) : t
        }
        _getPopperConfig(t) {
            const e = {
                placement: t,
                modifiers: [{
                    name: "flip",
                    options: {
                        fallbackPlacements: this._config.fallbackPlacements
                    }
                }, {
                    name: "offset",
                    options: {
                        offset: this._getOffset()
                    }
                }, {
                    name: "preventOverflow",
                    options: {
                        boundary: this._config.boundary
                    }
                }, {
                    name: "arrow",
                    options: {
                        element: `.${this.constructor.NAME}-arrow`
                    }
                }, {
                    name: "onChange",
                    enabled: !0,
                    phase: "afterWrite",
                    fn: t => this._handlePopperPlacementChange(t)
                }],
                onFirstUpdate: t => {
                    t.options.placement !== t.placement && this._handlePopperPlacementChange(t)
                }
            };
            return {...e, ...
                "function" == typeof this._config.popperConfig ? this._config.popperConfig(e) : this._config.popperConfig
            }
        }
        _addAttachmentClass(t) {
            this.getTipElement().classList.add("bs-tooltip-" + this.updateAttachment(t))
        }
        _getAttachment(t) {
            return xt[t.toUpperCase()]
        }
        _setListeners() {
            this._config.trigger.split(" ").forEach(t => {
                if ("click" === t) B.on(this._element, this.constructor.Event.CLICK, this._config.selector, t => this.toggle(t));
                else if ("manual" !== t) {
                    const e = "hover" === t ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN,
                        s = "hover" === t ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
                    B.on(this._element, e, this._config.selector, t => this._enter(t)), B.on(this._element, s, this._config.selector, t => this._leave(t))
                }
            }), this._hideModalHandler = () => {
                this._element && this.hide()
            }, B.on(this._element.closest(".modal"), "hide.bs.modal", this._hideModalHandler), this._config.selector ? this._config = {...this._config, trigger: "manual", selector: ""
            } : this._fixTitle()
        }
        _fixTitle() {
            const t = this._element.getAttribute("title"),
                e = typeof this._element.getAttribute("data-bs-original-title");
            (t || "string" !== e) && (this._element.setAttribute("data-bs-original-title", t || ""), !t || this._element.getAttribute("aria-label") || this._element.textContent || this._element.setAttribute("aria-label", t), this._element.setAttribute("title", ""))
        }
        _enter(t, e) {
            e = this._initializeOnDelegatedTarget(t, e), t && (e._activeTrigger["focusin" === t.type ? "focus" : "hover"] = !0), e.getTipElement().classList.contains("show") || "show" === e._hoverState ? e._hoverState = "show" : (clearTimeout(e._timeout), e._hoverState = "show", e._config.delay && e._config.delay.show ? e._timeout = setTimeout(() => {
                "show" === e._hoverState && e.show()
            }, e._config.delay.show) : e.show())
        }
        _leave(t, e) {
            e = this._initializeOnDelegatedTarget(t, e), t && (e._activeTrigger["focusout" === t.type ? "focus" : "hover"] = e._element.contains(t.relatedTarget)), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = "out", e._config.delay && e._config.delay.hide ? e._timeout = setTimeout(() => {
                "out" === e._hoverState && e.hide()
            }, e._config.delay.hide) : e.hide())
        }
        _isWithActiveTrigger() {
            for (const t in this._activeTrigger)
                if (this._activeTrigger[t]) return !0;
            return !1
        }
        _getConfig(t) {
            const e = V.getDataAttributes(this._element);
            return Object.keys(e).forEach(t => {
                Nt.has(t) && delete e[t]
            }), (t = {...this.constructor.Default, ...e, ...
                "object" == typeof t && t ? t : {}
            }).container = !1 === t.container ? document.body : h(t.container), "number" == typeof t.delay && (t.delay = {
                show: t.delay,
                hide: t.delay
            }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), d("tooltip", t, this.constructor.DefaultType), t.sanitize && (t.template = Dt(t.template, t.allowList, t.sanitizeFn)), t
        }
        _getDelegateConfig() {
            const t = {};
            if (this._config)
                for (const e in this._config) this.constructor.Default[e] !== this._config[e] && (t[e] = this._config[e]);
            return t
        }
        _cleanTipClass() {
            const t = this.getTipElement(),
                e = t.getAttribute("class").match(It);
            null !== e && e.length > 0 && e.map(t => t.trim()).forEach(e => t.classList.remove(e))
        }
        _handlePopperPlacementChange(t) {
            const {
                state: e
            } = t;
            e && (this.tip = e.elements.popper, this._cleanTipClass(), this._addAttachmentClass(this._getAttachment(e.placement)))
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = jt.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }
    y(jt);
    const Ht = new RegExp("(^|\\s)bs-popover\\S+", "g"),
        Rt = {...jt.Default, placement: "right", offset: [0, 8], trigger: "click", content: "", template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        },
        Bt = {...jt.DefaultType, content: "(string|element|function)"
        },
        $t = {
            HIDE: "hide.bs.popover",
            HIDDEN: "hidden.bs.popover",
            SHOW: "show.bs.popover",
            SHOWN: "shown.bs.popover",
            INSERTED: "inserted.bs.popover",
            CLICK: "click.bs.popover",
            FOCUSIN: "focusin.bs.popover",
            FOCUSOUT: "focusout.bs.popover",
            MOUSEENTER: "mouseenter.bs.popover",
            MOUSELEAVE: "mouseleave.bs.popover"
        };
    class Wt extends jt {
        static get Default() {
            return Rt
        }
        static get NAME() {
            return "popover"
        }
        static get Event() {
            return $t
        }
        static get DefaultType() {
            return Bt
        }
        isWithContent() {
            return this.getTitle() || this._getContent()
        }
        getTipElement() {
            return this.tip || (this.tip = super.getTipElement(), this.getTitle() || i.findOne(".popover-header", this.tip).remove(), this._getContent() || i.findOne(".popover-body", this.tip).remove()), this.tip
        }
        setContent() {
            const t = this.getTipElement();
            this.setElementContent(i.findOne(".popover-header", t), this.getTitle());
            let e = this._getContent();
            "function" == typeof e && (e = e.call(this._element)), this.setElementContent(i.findOne(".popover-body", t), e), t.classList.remove("fade", "show")
        }
        _addAttachmentClass(t) {
            this.getTipElement().classList.add("bs-popover-" + this.updateAttachment(t))
        }
        _getContent() {
            return this._element.getAttribute("data-bs-content") || this._config.content
        }
        _cleanTipClass() {
            const t = this.getTipElement(),
                e = t.getAttribute("class").match(Ht);
            null !== e && e.length > 0 && e.map(t => t.trim()).forEach(e => t.classList.remove(e))
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = Wt.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }
    y(Wt);
    const qt = {
            offset: 10,
            method: "auto",
            target: ""
        },
        zt = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        };
    class Ft extends q {
        constructor(t, e) {
            super(t), this._scrollElement = "BODY" === this._element.tagName ? window : this._element, this._config = this._getConfig(e), this._selector = `${this._config.target} .nav-link, ${this._config.target} .list-group-item, ${this._config.target} .dropdown-item`, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, B.on(this._scrollElement, "scroll.bs.scrollspy", () => this._process()), this.refresh(), this._process()
        }
        static get Default() {
            return qt
        }
        static get NAME() {
            return "scrollspy"
        }
        refresh() {
            const t = this._scrollElement === this._scrollElement.window ? "offset" : "position",
                e = "auto" === this._config.method ? t : this._config.method,
                s = "position" === e ? this._getScrollTop() : 0;
            this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), i.find(this._selector).map(t => {
                const n = r(t),
                    o = n ? i.findOne(n) : null;
                if (o) {
                    const t = o.getBoundingClientRect();
                    if (t.width || t.height) return [V[e](o).top + s, n]
                }
                return null
            }).filter(t => t).sort((t, e) => t[0] - e[0]).forEach(t => {
                this._offsets.push(t[0]), this._targets.push(t[1])
            })
        }
        dispose() {
            B.off(this._scrollElement, ".bs.scrollspy"), super.dispose()
        }
        _getConfig(t) {
            if ("string" != typeof(t = {...qt, ...V.getDataAttributes(this._element), ...
                    "object" == typeof t && t ? t : {}
                }).target && c(t.target)) {
                let {
                    id: e
                } = t.target;
                e || (e = n("scrollspy"), t.target.id = e), t.target = "#" + e
            }
            return d("scrollspy", t, zt), t
        }
        _getScrollTop() {
            return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
        }
        _getScrollHeight() {
            return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
        }
        _getOffsetHeight() {
            return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
        }
        _process() {
            const t = this._getScrollTop() + this._config.offset,
                e = this._getScrollHeight(),
                s = this._config.offset + e - this._getOffsetHeight();
            if (this._scrollHeight !== e && this.refresh(), t >= s) {
                const t = this._targets[this._targets.length - 1];
                this._activeTarget !== t && this._activate(t)
            } else {
                if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
                for (let e = this._offsets.length; e--;) this._activeTarget !== this._targets[e] && t >= this._offsets[e] && (void 0 === this._offsets[e + 1] || t < this._offsets[e + 1]) && this._activate(this._targets[e])
            }
        }
        _activate(t) {
            this._activeTarget = t, this._clear();
            const e = this._selector.split(",").map(e => `${e}[data-bs-target="${t}"],${e}[href="${t}"]`),
                s = i.findOne(e.join(","));
            s.classList.contains("dropdown-item") ? (i.findOne(".dropdown-toggle", s.closest(".dropdown")).classList.add("active"), s.classList.add("active")) : (s.classList.add("active"), i.parents(s, ".nav, .list-group").forEach(t => {
                i.prev(t, ".nav-link, .list-group-item").forEach(t => t.classList.add("active")), i.prev(t, ".nav-item").forEach(t => {
                    i.children(t, ".nav-link").forEach(t => t.classList.add("active"))
                })
            })), B.trigger(this._scrollElement, "activate.bs.scrollspy", {
                relatedTarget: t
            })
        }
        _clear() {
            i.find(this._selector).filter(t => t.classList.contains("active")).forEach(t => t.classList.remove("active"))
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = Ft.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }
    B.on(window, "load.bs.scrollspy.data-api", () => {
        i.find('[data-bs-spy="scroll"]').forEach(t => new Ft(t))
    }), y(Ft);
    class Ut extends q {
        static get NAME() {
            return "tab"
        }
        show() {
            if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains("active")) return;
            let t;
            const e = a(this._element),
                s = this._element.closest(".nav, .list-group");
            if (s) {
                const e = "UL" === s.nodeName || "OL" === s.nodeName ? ":scope > li > .active" : ".active";
                t = i.find(e, s), t = t[t.length - 1]
            }
            const n = t ? B.trigger(t, "hide.bs.tab", {
                relatedTarget: this._element
            }) : null;
            if (B.trigger(this._element, "show.bs.tab", {
                    relatedTarget: t
                }).defaultPrevented || null !== n && n.defaultPrevented) return;
            this._activate(this._element, s);
            const o = () => {
                B.trigger(t, "hidden.bs.tab", {
                    relatedTarget: this._element
                }), B.trigger(this._element, "shown.bs.tab", {
                    relatedTarget: t
                })
            };
            e ? this._activate(e, e.parentNode, o) : o()
        }
        _activate(t, e, s) {
            const n = (!e || "UL" !== e.nodeName && "OL" !== e.nodeName ? i.children(e, ".active") : i.find(":scope > li > .active", e))[0],
                o = s && n && n.classList.contains("fade"),
                r = () => this._transitionComplete(t, n, s);
            n && o ? (n.classList.remove("show"), this._queueCallback(r, t, !0)) : r()
        }
        _transitionComplete(t, e, s) {
            if (e) {
                e.classList.remove("active");
                const t = i.findOne(":scope > .dropdown-menu .active", e.parentNode);
                t && t.classList.remove("active"), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)
            }
            t.classList.add("active"), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), m(t), t.classList.contains("fade") && t.classList.add("show");
            let n = t.parentNode;
            if (n && "LI" === n.nodeName && (n = n.parentNode), n && n.classList.contains("dropdown-menu")) {
                const e = t.closest(".dropdown");
                e && i.find(".dropdown-toggle", e).forEach(t => t.classList.add("active")), t.setAttribute("aria-expanded", !0)
            }
            s && s()
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = Ut.getOrCreateInstance(this);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }
    B.on(document, "click.bs.tab.data-api", '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', (function(t) {
        ["A", "AREA"].includes(this.tagName) && t.preventDefault(), g(this) || Ut.getOrCreateInstance(this).show()
    })), y(Ut);
    const Kt = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        Vt = {
            animation: !0,
            autohide: !0,
            delay: 5e3
        };
    class Qt extends q {
        constructor(t, e) {
            super(t), this._config = this._getConfig(e), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners()
        }
        static get DefaultType() {
            return Kt
        }
        static get Default() {
            return Vt
        }
        static get NAME() {
            return "toast"
        }
        show() {
            B.trigger(this._element, "show.bs.toast").defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add("fade"), this._element.classList.remove("hide"), m(this._element), this._element.classList.add("showing"), this._queueCallback(() => {
                this._element.classList.remove("showing"), this._element.classList.add("show"), B.trigger(this._element, "shown.bs.toast"), this._maybeScheduleHide()
            }, this._element, this._config.animation))
        }
        hide() {
            this._element.classList.contains("show") && (B.trigger(this._element, "hide.bs.toast").defaultPrevented || (this._element.classList.remove("show"), this._queueCallback(() => {
                this._element.classList.add("hide"), B.trigger(this._element, "hidden.bs.toast")
            }, this._element, this._config.animation)))
        }
        dispose() {
            this._clearTimeout(), this._element.classList.contains("show") && this._element.classList.remove("show"), super.dispose()
        }
        _getConfig(t) {
            return t = {...Vt, ...V.getDataAttributes(this._element), ...
                "object" == typeof t && t ? t : {}
            }, d("toast", t, this.constructor.DefaultType), t
        }
        _maybeScheduleHide() {
            this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(() => {
                this.hide()
            }, this._config.delay)))
        }
        _onInteraction(t, e) {
            switch (t.type) {
                case "mouseover":
                case "mouseout":
                    this._hasMouseInteraction = e;
                    break;
                case "focusin":
                case "focusout":
                    this._hasKeyboardInteraction = e
            }
            if (e) return void this._clearTimeout();
            const s = t.relatedTarget;
            this._element === s || this._element.contains(s) || this._maybeScheduleHide()
        }
        _setListeners() {
            B.on(this._element, "click.dismiss.bs.toast", '[data-bs-dismiss="toast"]', () => this.hide()), B.on(this._element, "mouseover.bs.toast", t => this._onInteraction(t, !0)), B.on(this._element, "mouseout.bs.toast", t => this._onInteraction(t, !1)), B.on(this._element, "focusin.bs.toast", t => this._onInteraction(t, !0)), B.on(this._element, "focusout.bs.toast", t => this._onInteraction(t, !1))
        }
        _clearTimeout() {
            clearTimeout(this._timeout), this._timeout = null
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = Qt.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t](this)
                }
            }))
        }
    }
    return y(Qt), {
        Alert: z,
        Button: F,
        Carousel: et,
        Collapse: nt,
        Dropdown: pt,
        Modal: wt,
        Offcanvas: Tt,
        Popover: Wt,
        ScrollSpy: Ft,
        Tab: Ut,
        Toast: Qt,
        Tooltip: jt
    }
  }));
  
  ! function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
  }(function(a) {
    "use strict";
    var b = window.Slick || {};
    b = function() {
        function c(c, d) {
            var f, e = this;
            e.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: a(c),
                appendDots: a(c),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(b, c) {
                    return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, e.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.focussed = !1, e.interrupted = !1, e.hidden = "hidden", e.paused = !0, e.positionProp = null, e.respondTo = null, e.rowCount = 1, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.visibilityChange = "visibilitychange", e.windowWidth = 0, e.windowTimer = null, f = a(c).data("slick") || {}, e.options = a.extend({}, e.defaults, d, f), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden", e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.instanceUid = b++, e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.registerBreakpoints(), e.init(!0)
        }
        var b = 0;
        return c
    }(), b.prototype.activateADA = function() {
        var a = this;
        a.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, b.prototype.addSlide = b.prototype.slickAdd = function(b, c, d) {
        var e = this;
        if ("boolean" == typeof c) d = c, c = null;
        else if (0 > c || c >= e.slideCount) return !1;
        e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function(b, c) {
            a(c).attr("data-slick-index", b)
        }), e.$slidesCache = e.$slides, e.reinit()
    }, b.prototype.animateHeight = function() {
        var a = this;
        if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.animate({
                height: b
            }, a.options.speed)
        }
    }, b.prototype.animateSlide = function(b, c) {
        var d = {},
            e = this;
        e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({
            left: b
        }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({
            top: b
        }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({
            animStart: e.currentLeft
        }).animate({
            animStart: b
        }, {
            duration: e.options.speed,
            easing: e.options.easing,
            step: function(a) {
                a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d))
            },
            complete: function() {
                c && c.call()
            }
        })) : (e.applyTransition(), b = Math.ceil(b), e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function() {
            e.disableTransition(), c.call()
        }, e.options.speed))
    }, b.prototype.getNavTarget = function() {
        var b = this,
            c = b.options.asNavFor;
        return c && null !== c && (c = a(c).not(b.$slider)), c
    }, b.prototype.asNavFor = function(b) {
        var c = this,
            d = c.getNavTarget();
        null !== d && "object" == typeof d && d.each(function() {
            var c = a(this).slick("getSlick");
            c.unslicked || c.slideHandler(b, !0)
        })
    }, b.prototype.applyTransition = function(a) {
        var b = this,
            c = {};
        b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.autoPlay = function() {
        var a = this;
        a.autoPlayClear(), a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
    }, b.prototype.autoPlayClear = function() {
        var a = this;
        a.autoPlayTimer && clearInterval(a.autoPlayTimer)
    }, b.prototype.autoPlayIterator = function() {
        var a = this,
            b = a.currentSlide + a.options.slidesToScroll;
        a.paused || a.interrupted || a.focussed || (a.options.infinite === !1 && (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? a.direction = 0 : 0 === a.direction && (b = a.currentSlide - a.options.slidesToScroll, a.currentSlide - 1 === 0 && (a.direction = 1))), a.slideHandler(b))
    }, b.prototype.buildArrows = function() {
        var b = this;
        b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, b.prototype.buildDots = function() {
        var c, d, b = this;
        if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
            for (b.$slider.addClass("slick-dotted"), d = a("<ul />").addClass(b.options.dotsClass), c = 0; c <= b.getDotCount(); c += 1) d.append(a("<li />").append(b.options.customPaging.call(this, b, c)));
            b.$dots = d.appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }, b.prototype.buildOut = function() {
        var b = this;
        b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function(b, c) {
            a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "")
        }), b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable")
    }, b.prototype.buildRows = function() {
        var b, c, d, e, f, g, h, a = this;
        if (e = document.createDocumentFragment(), g = a.$slider.children(), a.options.rows > 1) {
            for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) {
                var i = document.createElement("div");
                for (c = 0; c < a.options.rows; c++) {
                    var j = document.createElement("div");
                    for (d = 0; d < a.options.slidesPerRow; d++) {
                        var k = b * h + (c * a.options.slidesPerRow + d);
                        g.get(k) && j.appendChild(g.get(k))
                    }
                    i.appendChild(j)
                }
                e.appendChild(i)
            }
            a.$slider.empty().append(e), a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, b.prototype.checkResponsive = function(b, c) {
        var e, f, g, d = this,
            h = !1,
            i = d.$slider.width(),
            j = window.innerWidth || a(window).width();
        if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)), d.options.responsive && d.options.responsive.length && null !== d.options.responsive) {
            f = null;
            for (e in d.breakpoints) d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));
            null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = d.originalSettings, b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), h = f), b || h === !1 || d.$slider.trigger("breakpoint", [d, h])
        }
    }, b.prototype.changeSlide = function(b, c) {
        var f, g, h, d = this,
            e = a(b.currentTarget);
        switch (e.is("a") && b.preventDefault(), e.is("li") || (e = e.closest("li")), h = d.slideCount % d.options.slidesToScroll !== 0, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) {
            case "previous":
                g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
                break;
            case "next":
                g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
                break;
            case "index":
                var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;
                d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus");
                break;
            default:
                return
        }
    }, b.prototype.checkNavigable = function(a) {
        var c, d, b = this;
        if (c = b.getNavigableIndexes(), d = 0, a > c[c.length - 1]) a = c[c.length - 1];
        else
            for (var e in c) {
                if (a < c[e]) {
                    a = d;
                    break
                }
                d = c[e]
            }
        return a
    }, b.prototype.cleanUpEvents = function() {
        var b = this;
        b.options.dots && null !== b.$dots && a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)), b.$slider.off("focus.slick blur.slick"), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.cleanUpSlideEvents(), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }, b.prototype.cleanUpSlideEvents = function() {
        var b = this;
        b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1))
    }, b.prototype.cleanUpRows = function() {
        var b, a = this;
        a.options.rows > 1 && (b = a.$slides.children().children(), b.removeAttr("style"), a.$slider.empty().append(b))
    }, b.prototype.clickHandler = function(a) {
        var b = this;
        b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault())
    }, b.prototype.destroy = function(b) {
        var c = this;
        c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            a(this).attr("style", a(this).data("originalStyling"))
        }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.$slider.removeClass("slick-dotted"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c])
    }, b.prototype.disableTransition = function(a) {
        var b = this,
            c = {};
        c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.fadeSlide = function(a, b) {
        var c = this;
        c.cssTransitions === !1 ? (c.$slides.eq(a).css({
            zIndex: c.options.zIndex
        }), c.$slides.eq(a).animate({
            opacity: 1
        }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({
            opacity: 1,
            zIndex: c.options.zIndex
        }), b && setTimeout(function() {
            c.disableTransition(a), b.call()
        }, c.options.speed))
    }, b.prototype.fadeSlideOut = function(a) {
        var b = this;
        b.cssTransitions === !1 ? b.$slides.eq(a).animate({
            opacity: 0,
            zIndex: b.options.zIndex - 2
        }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({
            opacity: 0,
            zIndex: b.options.zIndex - 2
        }))
    }, b.prototype.filterSlides = b.prototype.slickFilter = function(a) {
        var b = this;
        null !== a && (b.$slidesCache = b.$slides, b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit())
    }, b.prototype.focusHandler = function() {
        var b = this;
        b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(c) {
            c.stopImmediatePropagation();
            var d = a(this);
            setTimeout(function() {
                b.options.pauseOnFocus && (b.focussed = d.is(":focus"), b.autoPlay())
            }, 0)
        })
    }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function() {
        var a = this;
        return a.currentSlide
    }, b.prototype.getDotCount = function() {
        var a = this,
            b = 0,
            c = 0,
            d = 0;
        if (a.options.infinite === !0)
            for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        else if (a.options.centerMode === !0) d = a.slideCount;
        else if (a.options.asNavFor)
            for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        else d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll);
        return d - 1
    }, b.prototype.getLeft = function(a) {
        var c, d, f, b = this,
            e = 0;
        return b.slideOffset = 0, d = b.$slides.first().outerHeight(!0), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = b.slideWidth * b.options.slidesToShow * -1, e = d * b.options.slidesToShow * -1), b.slideCount % b.options.slidesToScroll !== 0 && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1, e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1) : (b.slideOffset = b.slideCount % b.options.slidesToScroll * b.slideWidth * -1, e = b.slideCount % b.options.slidesToScroll * d * -1))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e, b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, b.options.centerMode === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, c += (b.$list.width() - f.outerWidth()) / 2)), c
    }, b.prototype.getOption = b.prototype.slickGetOption = function(a) {
        var b = this;
        return b.options[a]
    }, b.prototype.getNavigableIndexes = function() {
        var e, a = this,
            b = 0,
            c = 0,
            d = [];
        for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll, c = -1 * a.options.slidesToScroll, e = 2 * a.slideCount); e > b;) d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        return d
    }, b.prototype.getSlick = function() {
        return this
    }, b.prototype.getSlideCount = function() {
        var c, d, e, b = this;
        return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0, b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function(c, f) {
            return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f, !1) : void 0
        }), c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll
    }, b.prototype.goTo = b.prototype.slickGoTo = function(a, b) {
        var c = this;
        c.changeSlide({
            data: {
                message: "index",
                index: parseInt(a)
            }
        }, b)
    }, b.prototype.init = function(b) {
        var c = this;
        a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots(), c.checkResponsive(!0), c.focusHandler()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA(), c.options.autoplay && (c.paused = !1, c.autoPlay())
    }, b.prototype.initADA = function() {
        var b = this;
        b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c) {
            a(this).attr({
                role: "option",
                "aria-describedby": "slick-slide" + b.instanceUid + c
            })
        }), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function(c) {
            a(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + b.instanceUid + c,
                id: "slick-slide" + b.instanceUid + c
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA()
    }, b.prototype.initArrowEvents = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, a.changeSlide), a.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, a.changeSlide))
    }, b.prototype.initDotEvents = function() {
        var b = this;
        b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {
            message: "index"
        }, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1))
    }, b.prototype.initSlideEvents = function() {
        var b = this;
        b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)))
    }, b.prototype.initializeEvents = function() {
        var b = this;
        b.initArrowEvents(), b.initDotEvents(), b.initSlideEvents(), b.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }, b.prototype.initUI = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show()
    }, b.prototype.keyHandler = function(a) {
        var b = this;
        a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({
            data: {
                message: b.options.rtl === !0 ? "next" : "previous"
            }
        }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({
            data: {
                message: b.options.rtl === !0 ? "previous" : "next"
            }
        }))
    }, b.prototype.lazyLoad = function() {
        function g(c) {
            a("img[data-lazy]", c).each(function() {
                var c = a(this),
                    d = a(this).attr("data-lazy"),
                    e = document.createElement("img");
                e.onload = function() {
                    c.animate({
                        opacity: 0
                    }, 100, function() {
                        c.attr("src", d).animate({
                            opacity: 1
                        }, 200, function() {
                            c.removeAttr("data-lazy").removeClass("slick-loading")
                        }), b.$slider.trigger("lazyLoaded", [b, c, d])
                    })
                }, e.onerror = function() {
                    c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), b.$slider.trigger("lazyLoadError", [b, c, d])
                }, e.src = d
            })
        }
        var c, d, e, f, b = this;
        b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = Math.ceil(e + b.options.slidesToShow), b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d))
    }, b.prototype.loadSlider = function() {
        var a = this;
        a.setPosition(), a.$slideTrack.css({
            opacity: 1
        }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
    }, b.prototype.next = b.prototype.slickNext = function() {
        var a = this;
        a.changeSlide({
            data: {
                message: "next"
            }
        })
    }, b.prototype.orientationChange = function() {
        var a = this;
        a.checkResponsive(), a.setPosition()
    }, b.prototype.pause = b.prototype.slickPause = function() {
        var a = this;
        a.autoPlayClear(), a.paused = !0
    }, b.prototype.play = b.prototype.slickPlay = function() {
        var a = this;
        a.autoPlay(), a.options.autoplay = !0, a.paused = !1, a.focussed = !1, a.interrupted = !1
    }, b.prototype.postSlide = function(a) {
        var b = this;
        b.unslicked || (b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay && b.autoPlay(), b.options.accessibility === !0 && b.initADA())
    }, b.prototype.prev = b.prototype.slickPrev = function() {
        var a = this;
        a.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, b.prototype.preventDefault = function(a) {
        a.preventDefault()
    }, b.prototype.progressiveLazyLoad = function(b) {
        b = b || 1;
        var e, f, g, c = this,
            d = a("img[data-lazy]", c.$slider);
        d.length ? (e = d.first(), f = e.attr("data-lazy"), g = document.createElement("img"), g.onload = function() {
            e.attr("src", f).removeAttr("data-lazy").removeClass("slick-loading"), c.options.adaptiveHeight === !0 && c.setPosition(), c.$slider.trigger("lazyLoaded", [c, e, f]), c.progressiveLazyLoad()
        }, g.onerror = function() {
            3 > b ? setTimeout(function() {
                c.progressiveLazyLoad(b + 1)
            }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), c.$slider.trigger("lazyLoadError", [c, e, f]), c.progressiveLazyLoad())
        }, g.src = f) : c.$slider.trigger("allImagesLoaded", [c])
    }, b.prototype.refresh = function(b) {
        var d, e, c = this;
        e = c.slideCount - c.options.slidesToShow, !c.options.infinite && c.currentSlide > e && (c.currentSlide = e), c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0), d = c.currentSlide, c.destroy(!0), a.extend(c, c.initials, {
            currentSlide: d
        }), c.init(), b || c.changeSlide({
            data: {
                message: "index",
                index: d
            }
        }, !1)
    }, b.prototype.registerBreakpoints = function() {
        var c, d, e, b = this,
            f = b.options.responsive || null;
        if ("array" === a.type(f) && f.length) {
            b.respondTo = b.options.respondTo || "window";
            for (c in f)
                if (e = b.breakpoints.length - 1, d = f[c].breakpoint, f.hasOwnProperty(c)) {
                    for (; e >= 0;) b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--;
                    b.breakpoints.push(d), b.breakpointSettings[d] = f[c].settings
                }
            b.breakpoints.sort(function(a, c) {
                return b.options.mobileFirst ? a - c : c - a
            })
        }
    }, b.prototype.reinit = function() {
        var b = this;
        b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.cleanUpSlideEvents(), b.initSlideEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.setPosition(), b.focusHandler(), b.paused = !b.options.autoplay, b.autoPlay(), b.$slider.trigger("reInit", [b])
    }, b.prototype.resize = function() {
        var b = this;
        a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function() {
            b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition()
        }, 50))
    }, b.prototype.removeSlide = b.prototype.slickRemove = function(a, b, c) {
        var d = this;
        return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit())
    }, b.prototype.setCSS = function(a) {
        var d, e, b = this,
            c = {};
        b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px", e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c)))
    }, b.prototype.setDimensions = function() {
        var a = this;
        a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({
            padding: "0px " + a.options.centerPadding
        }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({
            padding: a.options.centerPadding + " 0px"
        })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
        var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
        a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b)
    }, b.prototype.setFade = function() {
        var c, b = this;
        b.$slides.each(function(d, e) {
            c = b.slideWidth * d * -1, b.options.rtl === !0 ? a(e).css({
                position: "relative",
                right: c,
                top: 0,
                zIndex: b.options.zIndex - 2,
                opacity: 0
            }) : a(e).css({
                position: "relative",
                left: c,
                top: 0,
                zIndex: b.options.zIndex - 2,
                opacity: 0
            })
        }), b.$slides.eq(b.currentSlide).css({
            zIndex: b.options.zIndex - 1,
            opacity: 1
        })
    }, b.prototype.setHeight = function() {
        var a = this;
        if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.css("height", b)
        }
    }, b.prototype.setOption = b.prototype.slickSetOption = function() {
        var c, d, e, f, h, b = this,
            g = !1;
        if ("object" === a.type(arguments[0]) ? (e = arguments[0], g = arguments[1], h = "multiple") : "string" === a.type(arguments[0]) && (e = arguments[0], f = arguments[1], g = arguments[2], "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? h = "responsive" : "undefined" != typeof arguments[1] && (h = "single")), "single" === h) b.options[e] = f;
        else if ("multiple" === h) a.each(e, function(a, c) {
            b.options[a] = c
        });
        else if ("responsive" === h)
            for (d in f)
                if ("array" !== a.type(b.options.responsive)) b.options.responsive = [f[d]];
                else {
                    for (c = b.options.responsive.length - 1; c >= 0;) b.options.responsive[c].breakpoint === f[d].breakpoint && b.options.responsive.splice(c, 1), c--;
                    b.options.responsive.push(f[d])
                }
        g && (b.unload(), b.reinit())
    }, b.prototype.setPosition = function() {
        var a = this;
        a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a])
    }, b.prototype.setProps = function() {
        var a = this,
            b = document.body.style;
        a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1
    }, b.prototype.setSlideClasses = function(a) {
        var c, d, e, f, b = this;
        d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), b.$slides.eq(a).addClass("slick-current"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a,
            d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === b.options.lazyLoad && b.lazyLoad()
    }, b.prototype.setupInfinite = function() {
        var c, d, e, b = this;
        if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) {
            for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1) d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");
            for (c = 0; e > c; c += 1) d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");
            b.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                a(this).attr("id", "")
            })
        }
    }, b.prototype.interrupt = function(a) {
        var b = this;
        a || b.autoPlay(), b.interrupted = a
    }, b.prototype.selectHandler = function(b) {
        var c = this,
            d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"),
            e = parseInt(d.attr("data-slick-index"));
        return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e)
    }, b.prototype.slideHandler = function(a, b, c) {
        var d, e, f, g, j, h = null,
            i = this;
        return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function() {
            i.postSlide(d)
        }) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function() {
            i.postSlide(d)
        }) : i.postSlide(d))) : (i.options.autoplay && clearInterval(i.autoPlayTimer), e = 0 > d ? i.slideCount % i.options.slidesToScroll !== 0 ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? i.slideCount % i.options.slidesToScroll !== 0 ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.options.asNavFor && (j = i.getNavTarget(), j = j.slick("getSlick"), j.slideCount <= j.options.slidesToShow && j.setSlideClasses(i.currentSlide)), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f), i.fadeSlide(e, function() {
            i.postSlide(e)
        })) : i.postSlide(e), void i.animateHeight()) : void(c !== !0 ? i.animateSlide(h, function() {
            i.postSlide(e)
        }) : i.postSlide(e))))
    }, b.prototype.startLoad = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading")
    }, b.prototype.swipeDirection = function() {
        var a, b, c, d, e = this;
        return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "down" : "up" : "vertical"
    }, b.prototype.swipeEnd = function(a) {
        var c, d, b = this;
        if (b.dragging = !1, b.interrupted = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1;
        if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) {
            switch (d = b.swipeDirection()) {
                case "left":
                case "down":
                    c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.currentDirection = 1
            }
            "vertical" != d && (b.slideHandler(c), b.touchObject = {}, b.$slider.trigger("swipe", [b, d]))
        } else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {})
    }, b.prototype.swipeHandler = function(a) {
        var b = this;
        if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) {
            case "start":
                b.swipeStart(a);
                break;
            case "move":
                b.swipeMove(a);
                break;
            case "end":
                b.swipeEnd(a)
        }
    }, b.prototype.swipeMove = function(a) {
        var d, e, f, g, h, b = this;
        return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX, b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))), e = b.swipeDirection(), "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1), f = b.touchObject.swipeLength, b.touchObject.edgeHit = !1, b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction, b.touchObject.edgeHit = !0), b.options.vertical === !1 ? b.swipeLeft = d + f * g : b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g, b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g), b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : void b.setCSS(b.swipeLeft)) : void 0)
    }, b.prototype.swipeStart = function(a) {
        var c, b = this;
        return b.interrupted = !0, 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, void(b.dragging = !0))
    }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function() {
        var a = this;
        null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit())
    }, b.prototype.unload = function() {
        var b = this;
        a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, b.prototype.unslick = function(a) {
        var b = this;
        b.$slider.trigger("unslick", [b, a]), b.destroy()
    }, b.prototype.updateArrows = function() {
        var b, a = this;
        b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, b.prototype.updateDots = function() {
        var a = this;
        null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, b.prototype.visibility = function() {
        var a = this;
        a.options.autoplay && (document[a.hidden] ? a.interrupted = !0 : a.interrupted = !1)
    }, a.fn.slick = function() {
        var f, g, a = this,
            c = arguments[0],
            d = Array.prototype.slice.call(arguments, 1),
            e = a.length;
        for (f = 0; e > f; f++)
            if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d), "undefined" != typeof g) return g;
        return a
    }
  });
  
  ! function(t) {
    "use strict";
    var e = {
        cache: {},
        support: {},
        objects: {},
        init: function(e) {
            return this.each(function() {
                t(this).unbind("click.lightcase").bind("click.lightcase", function(i) {
                    i.preventDefault(), t(this).lightcase("start", e)
                })
            })
        },
        _matchMedia: function() {
            return window.matchMedia || window.msMatchMedia
        },
        _devicePixelRatio: function() {
            return window.devicePixelRatio || 1
        },
        _isPublicMethod: function(t) {
            return "function" == typeof e[t] && "_" !== t.charAt(0)
        },
        _export: function() {
            window.lightcase = {}, t.each(e, function(t) {
                e._isPublicMethod(t) && (lightcase[t] = e[t])
            })
        }
    };
    e._export(), t.fn.lightcase = function(i) {
        return e._isPublicMethod(i) ? e[i].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof i && i ? void t.error("Method " + i + " does not exist on jQuery.lightcase") : e.init.apply(this, arguments)
    }
  }(jQuery);
  
  
  ! function(t) {
    "use strict";
    var e = {
        cache: {},
        support: {},
        objects: {},
        init: function(e) {
            return this.each(function() {
                t(this).unbind("click.lightcase").bind("click.lightcase", function(i) {
                    i.preventDefault(), t(this).lightcase("start", e)
                })
            })
        },
        start: function(i) {
            e.origin = lightcase.origin = this, e.settings = lightcase.settings = t.extend(!0, {
                idPrefix: "lightcase-",
                classPrefix: "lightcase-",
                attrPrefix: "lc-",
                transition: "elastic",
                transitionOpen: null,
                transitionClose: null,
                transitionIn: null,
                transitionOut: null,
                cssTransitions: !0,
                speedIn: 250,
                speedOut: 250,
                width: null,
                height: null,
                maxWidth: 800,
                maxHeight: 500,
                forceWidth: !1,
                forceHeight: !1,
                liveResize: !0,
                fullScreenModeForMobile: !0,
                mobileMatchExpression: /(iphone|ipod|ipad|android|blackberry|symbian)/,
                disableShrink: !1,
                fixedRatio: !0,
                shrinkFactor: .75,
                overlayOpacity: .9,
                slideshow: !1,
                slideshowAutoStart: !0,
                breakBeforeShow: !1,
                timeout: 5e3,
                swipe: !0,
                useKeys: !0,
                useCategories: !0,
                useAsCollection: !1,
                navigateEndless: !0,
                closeOnOverlayClick: !0,
                title: null,
                caption: null,
                showTitle: !0,
                showCaption: !0,
                showSequenceInfo: !0,
                inline: {
                    width: "auto",
                    height: "auto"
                },
                ajax: {
                    width: "auto",
                    height: "auto",
                    type: "get",
                    dataType: "html",
                    data: {}
                },
                iframe: {
                    width: 800,
                    height: 500,
                    frameborder: 0
                },
                flash: {
                    width: 400,
                    height: 205,
                    wmode: "transparent"
                },
                video: {
                    width: 400,
                    height: 225,
                    poster: "",
                    preload: "auto",
                    controls: !0,
                    autobuffer: !0,
                    autoplay: !0,
                    loop: !1
                },
                attr: "data-rel",
                href: null,
                type: null,
                typeMapping: {
                    image: "jpg,jpeg,gif,png,bmp",
                    flash: "swf",
                    video: "mp4,mov,ogv,ogg,webm",
                    iframe: "html,php",
                    ajax: "json,txt",
                    inline: "#"
                },
                errorMessage: function() {
                    return '<p class="' + e.settings.classPrefix + 'error">' + e.settings.labels.errorMessage + "</p>"
                },
                labels: {
                    errorMessage: "Source could not be found...",
                    "sequenceInfo.of": " of ",
                    close: "Close",
                    "navigator.prev": "Prev",
                    "navigator.next": "Next",
                    "navigator.play": "Play",
                    "navigator.pause": "Pause"
                },
                markup: function() {
                    e.objects.body.append(e.objects.overlay = t('<div id="' + e.settings.idPrefix + 'overlay"></div>'), e.objects.loading = t('<div id="' + e.settings.idPrefix + 'loading" class="' + e.settings.classPrefix + 'icon-spin"></div>'), e.objects.case = t('<div id="' + e.settings.idPrefix + 'case" aria-hidden="true" role="dialog"></div>')), e.objects.case.after(e.objects.close = t('<a href="#" class="' + e.settings.classPrefix + 'icon-close"><span>' + e.settings.labels.close + "</span></a>"), e.objects.nav = t('<div id="' + e.settings.idPrefix + 'nav"></div>')), e.objects.nav.append(e.objects.prev = t('<a href="#" class="' + e.settings.classPrefix + 'icon-prev"><span>' + e.settings.labels["navigator.prev"] + "</span></a>").hide(), e.objects.next = t('<a href="#" class="' + e.settings.classPrefix + 'icon-next"><span>' + e.settings.labels["navigator.next"] + "</span></a>").hide(), e.objects.play = t('<a href="#" class="' + e.settings.classPrefix + 'icon-play"><span>' + e.settings.labels["navigator.play"] + "</span></a>").hide(), e.objects.pause = t('<a href="#" class="' + e.settings.classPrefix + 'icon-pause"><span>' + e.settings.labels["navigator.pause"] + "</span></a>").hide()), e.objects.case.append(e.objects.content = t('<div id="' + e.settings.idPrefix + 'content"></div>'), e.objects.info = t('<div id="' + e.settings.idPrefix + 'info"></div>')), e.objects.content.append(e.objects.contentInner = t('<div class="' + e.settings.classPrefix + 'contentInner"></div>')), e.objects.info.append(e.objects.sequenceInfo = t('<div id="' + e.settings.idPrefix + 'sequenceInfo"></div>'), e.objects.title = t('<h4 id="' + e.settings.idPrefix + 'title"></h4>'), e.objects.caption = t('<p id="' + e.settings.idPrefix + 'caption"></p>'))
                },
                onInit: {},
                onStart: {},
                onBeforeCalculateDimensions: {},
                onAfterCalculateDimensions: {},
                onBeforeShow: {},
                onFinish: {},
                onResize: {},
                onClose: {},
                onCleanup: {}
            }, i, e.origin.data ? e.origin.data("lc-options") : {}), e.objects.document = t("html"), e.objects.body = t("body"), e._callHooks(e.settings.onInit), e.objectData = e._setObjectData(this), e._addElements(), e._open(), e.dimensions = e.getViewportDimensions()
        },
        get: function(t) {
            return e.objects[t]
        },
        getObjectData: function() {
            return e.objectData
        },
        _setObjectData: function(i) {
            var s = t(i),
                n = {
                    this: t(i),
                    title: e.settings.title || s.attr(e._prefixAttributeName("title")) || s.attr("title"),
                    caption: e.settings.caption || s.attr(e._prefixAttributeName("caption")) || s.children("img").attr("alt"),
                    url: e._determineUrl(),
                    requestType: e.settings.ajax.type,
                    requestData: e.settings.ajax.data,
                    requestDataType: e.settings.ajax.dataType,
                    rel: s.attr(e._determineAttributeSelector()),
                    type: e._verifyDataType(e._determineUrl()),
                    isPartOfSequence: e.settings.useAsCollection || e._isPartOfSequence(s.attr(e.settings.attr), ":"),
                    isPartOfSequenceWithSlideshow: e._isPartOfSequence(s.attr(e.settings.attr), ":slideshow"),
                    currentIndex: t(e._determineAttributeSelector()).index(s),
                    sequenceLength: t(e._determineAttributeSelector()).length
                };
            return n.sequenceInfo = n.currentIndex + 1 + e.settings.labels["sequenceInfo.of"] + n.sequenceLength, n.prevIndex = n.currentIndex - 1, n.nextIndex = n.currentIndex + 1, n
        },
        _prefixAttributeName: function(t) {
            return "data-" + e.settings.attrPrefix + t
        },
        _determineLinkTarget: function() {
            return e.settings.href || t(e.origin).attr(e._prefixAttributeName("href")) || t(e.origin).attr("href")
        },
        _determineAttributeSelector: function() {
            var i = t(e.origin),
                s = "";
            if (void 0 !== e.cache.selector) s = e.cache.selector;
            else if (!0 === e.settings.useCategories && i.attr(e._prefixAttributeName("categories"))) {
                var n = i.attr(e._prefixAttributeName("categories")).split(" ");
                t.each(n, function(t, i) {
                    t > 0 && (s += ","), s += "[" + e._prefixAttributeName("categories") + '~="' + i + '"]'
                })
            } else s = "[" + e.settings.attr + '="' + i.attr(e.settings.attr) + '"]';
            return e.cache.selector = s, s
        },
        _determineUrl: function() {
            var i, s = e._verifyDataUrl(e._determineLinkTarget()),
                n = 0,
                a = 0,
                o = "";
            return t.each(s, function(t, s) {
                switch (e._verifyDataType(s.url)) {
                    case "video":
                        var c = document.createElement("video"),
                            r = e._verifyDataType(s.url) + "/" + e._getFileUrlSuffix(s.url);
                        "probably" !== o && o !== c.canPlayType(r) && "" !== c.canPlayType(r) && (o = c.canPlayType(r), i = s.url);
                        break;
                    default:
                        e._devicePixelRatio() >= s.density && s.density >= a && e._matchMedia()("screen and (min-width:" + s.width + "px)").matches && s.width >= n && (n = s.width, a = s.density, i = s.url)
                }
            }), i
        },
        _normalizeUrl: function(t) {
            var e = /^\d+$/,
                i = function(t) {
                    var i = {
                        width: 0,
                        density: 0
                    };
                    return t.trim().split(/\s+/).forEach(function(t, s) {
                        if (0 === s) return i.url = t;
                        var n = t.substring(0, t.length - 1),
                            a = t[t.length - 1],
                            o = parseInt(n, 10),
                            c = parseFloat(n);
                        "w" === a && e.test(n) ? i.width = o : "h" === a && e.test(n) ? i.height = o : "x" !== a || isNaN(c) || (i.density = c)
                    }), i
                };
            return 0 === t.indexOf("data:") ? [i(t)] : t.split(",").map(i)
        },
        _isPartOfSequence: function(i, s) {
            var n = t("[" + e.settings.attr + '="' + i + '"]');
            return new RegExp(s).test(i) && n.length > 1
        },
        isSlideshowEnabled: function() {
            return e.objectData.isPartOfSequence && (!0 === e.settings.slideshow || !0 === e.objectData.isPartOfSequenceWithSlideshow)
        },
        _loadContent: function() {
            e.cache.originalObject && e._restoreObject(), e._createObject()
        },
        _createObject: function() {
            var i;
            switch (e.objectData.type) {
                case "image":
                    (i = t(new Image)).attr({
                        src: e.objectData.url,
                        alt: e.objectData.title
                    });
                    break;
                case "inline":
                    (i = t('<div class="' + e.settings.classPrefix + 'inlineWrap"></div>')).html(e._cloneObject(t(e.objectData.url))), t.each(e.settings.inline, function(t, s) {
                        i.attr(e._prefixAttributeName(t), s)
                    });
                    break;
                case "ajax":
                    i = t('<div class="' + e.settings.classPrefix + 'inlineWrap"></div>'), t.each(e.settings.ajax, function(t, s) {
                        "data" !== t && i.attr(e._prefixAttributeName(t), s)
                    });
                    break;
                case "flash":
                    i = t('<embed src="' + e.objectData.url + '" type="application/x-shockwave-flash"></embed>'), t.each(e.settings.flash, function(t, e) {
                        i.attr(t, e)
                    });
                    break;
                case "video":
                    (i = t("<video></video>")).attr("src", e.objectData.url), t.each(e.settings.video, function(t, e) {
                        i.attr(t, e)
                    });
                    break;
                default:
                    (i = t("<iframe></iframe>")).attr({
                        src: e.objectData.url
                    }), t.each(e.settings.iframe, function(t, e) {
                        i.attr(t, e)
                    })
            }
            e._addObject(i), e._loadObject(i)
        },
        _addObject: function(t) {
            e.objects.contentInner.html(t), e._loading("start"), e._callHooks(e.settings.onStart), !0 === e.settings.showSequenceInfo && e.objectData.isPartOfSequence ? (e.objects.sequenceInfo.html(e.objectData.sequenceInfo), e.objects.sequenceInfo.show()) : (e.objects.sequenceInfo.empty(), e.objects.sequenceInfo.hide()), !0 === e.settings.showTitle && void 0 !== e.objectData.title && "" !== e.objectData.title ? (e.objects.title.html(e.objectData.title), e.objects.title.show()) : (e.objects.title.empty(), e.objects.title.hide()), !0 === e.settings.showCaption && void 0 !== e.objectData.caption && "" !== e.objectData.caption ? (e.objects.caption.html(e.objectData.caption), e.objects.caption.show()) : (e.objects.caption.empty(), e.objects.caption.hide())
        },
        _loadObject: function(i) {
            switch (e.objectData.type) {
                case "inline":
                    t(e.objectData.url) ? e._showContent(i) : e.error();
                    break;
                case "ajax":
                    t.ajax(t.extend({}, e.settings.ajax, {
                        url: e.objectData.url,
                        type: e.objectData.requestType,
                        dataType: e.objectData.requestDataType,
                        data: e.objectData.requestData,
                        success: function(t, s, n) {
                            n.getResponseHeader("X-Ajax-Location") ? (e.objectData.url = n.getResponseHeader("X-Ajax-Location"), e._loadObject(i)) : ("json" === e.objectData.requestDataType ? e.objectData.data = t : i.html(t), e._showContent(i))
                        },
                        error: function(t, i, s) {
                            e.error()
                        }
                    }));
                    break;
                case "flash":
                    e._showContent(i);
                    break;
                case "video":
                    "function" == typeof i.get(0).canPlayType || 0 === e.objects.case.find("video").length ? e._showContent(i) : e.error();
                    break;
                default:
                    e.objectData.url ? (i.on("load", function() {
                        e._showContent(i)
                    }), i.on("error", function() {
                        e.error()
                    })) : e.error()
            }
        },
        error: function() {
            e.objectData.type = "error";
            var i = t('<div class="' + e.settings.classPrefix + 'inlineWrap"></div>');
            i.html(e.settings.errorMessage), e.objects.contentInner.html(i), e._showContent(e.objects.contentInner)
        },
        _calculateDimensions: function(t) {
            if (e._cleanupDimensions(), t) {
                var i = {
                    ratio: 1,
                    objectWidth: t.attr("width") ? t.attr("width") : t.attr(e._prefixAttributeName("width")),
                    objectHeight: t.attr("height") ? t.attr("height") : t.attr(e._prefixAttributeName("height"))
                };
                if (!e.settings.disableShrink) switch (i.maxWidth = parseInt(e.dimensions.windowWidth * e.settings.shrinkFactor), i.maxHeight = parseInt(e.dimensions.windowHeight * e.settings.shrinkFactor), i.maxWidth > e.settings.maxWidth && (i.maxWidth = e.settings.maxWidth), i.maxHeight > e.settings.maxHeight && (i.maxHeight = e.settings.maxHeight), i.differenceWidthAsPercent = parseInt(100 / i.maxWidth * i.objectWidth), i.differenceHeightAsPercent = parseInt(100 / i.maxHeight * i.objectHeight), e.objectData.type) {
                    case "image":
                    case "flash":
                    case "video":
                    case "iframe":
                    case "ajax":
                    case "inline":
                        if ("image" === e.objectData.type || !0 === e.settings.fixedRatio) {
                            i.differenceWidthAsPercent > 100 && i.differenceWidthAsPercent > i.differenceHeightAsPercent && (i.objectWidth = i.maxWidth, i.objectHeight = parseInt(i.objectHeight / i.differenceWidthAsPercent * 100)), i.differenceHeightAsPercent > 100 && i.differenceHeightAsPercent > i.differenceWidthAsPercent && (i.objectWidth = parseInt(i.objectWidth / i.differenceHeightAsPercent * 100), i.objectHeight = i.maxHeight), i.differenceHeightAsPercent > 100 && i.differenceWidthAsPercent < i.differenceHeightAsPercent && (i.objectWidth = parseInt(i.maxWidth / i.differenceHeightAsPercent * i.differenceWidthAsPercent), i.objectHeight = i.maxHeight);
                            break
                        }
                    case "error":
                        !isNaN(i.objectWidth) && i.objectWidth > i.maxWidth && (i.objectWidth = i.maxWidth);
                        break;
                    default:
                        (isNaN(i.objectWidth) || i.objectWidth > i.maxWidth) && !e.settings.forceWidth && (i.objectWidth = i.maxWidth), (isNaN(i.objectHeight) && "auto" !== i.objectHeight || i.objectHeight > i.maxHeight) && !e.settings.forceHeight && (i.objectHeight = i.maxHeight)
                }
                if (e.settings.forceWidth) {
                    try {
                        i.objectWidth = e.settings[e.objectData.type].width
                    } catch (t) {
                        i.objectWidth = e.settings.width || i.objectWidth
                    }
                    i.maxWidth = null
                }
                if (t.attr(e._prefixAttributeName("max-width")) && (i.maxWidth = t.attr(e._prefixAttributeName("max-width"))), e.settings.forceHeight) {
                    try {
                        i.objectHeight = e.settings[e.objectData.type].height
                    } catch (t) {
                        i.objectHeight = e.settings.height || i.objectHeight
                    }
                    i.maxHeight = null
                }
                t.attr(e._prefixAttributeName("max-height")) && (i.maxHeight = t.attr(e._prefixAttributeName("max-height"))), e._adjustDimensions(t, i)
            }
        },
        _adjustDimensions: function(t, i) {
            t.css({
                width: i.objectWidth,
                height: i.objectHeight,
                "max-width": i.maxWidth,
                "max-height": i.maxHeight
            }), e.objects.contentInner.css({
                width: t.outerWidth(),
                height: t.outerHeight(),
                "max-width": "100%"
            }), e.objects.case.css({
                width: e.objects.contentInner.outerWidth(),
                "max-width": "100%"
            }), e.objects.case.css({
                "margin-top": parseInt(-e.objects.case.outerHeight() / 2),
                "margin-left": parseInt(-e.objects.case.outerWidth() / 2)
            })
        },
        _loading: function(t) {
            "start" === t ? (e.objects.case.addClass(e.settings.classPrefix + "loading"), e.objects.loading.show()) : "end" === t && (e.objects.case.removeClass(e.settings.classPrefix + "loading"), e.objects.loading.hide())
        },
        getViewportDimensions: function() {
            return {
                windowWidth: t(window).innerWidth(),
                windowHeight: t(window).innerHeight()
            }
        },
        _verifyDataUrl: function(t) {
            return !(!t || void 0 === t || "" === t) && (t.indexOf("#") > -1 && (t = "#" + (t = t.split("#"))[t.length - 1]), e._normalizeUrl(t.toString()))
        },
        _getFileUrlSuffix: function(t) {
            return /(?:\.([^.]+))?$/.exec(t.toLowerCase())[1]
        },
        _verifyDataType: function(t) {
            var i = e.settings.typeMapping;
            if (!t) return !1;
            if (e.settings.type)
                for (var s in i)
                    if (s === e.settings.type) return e.settings.type;
            for (var s in i)
                if (i.hasOwnProperty(s))
                    for (var n = i[s].split(","), a = 0; a < n.length; a++) {
                        var o = n[a].toLowerCase(),
                            c = new RegExp(".(" + o + ")$", "i"),
                            r = t.toLowerCase().split("?")[0].substr(-5);
                        if (!0 === c.test(r) || "inline" === s && t.indexOf(o) > -1) return s
                    }
                return "iframe"
        },
        _addElements: function() {
            void 0 !== e.objects.case && t("#" + e.objects.case.attr("id")).length || e.settings.markup()
        },
        _showContent: function(t) {
            e.objects.document.attr(e._prefixAttributeName("type"), e.objectData.type), e.cache.object = t, e._callHooks(e.settings.onBeforeShow), e.settings.breakBeforeShow || e.show()
        },
        _startInTransition: function() {
            switch (e.transition.in()) {
                case "scrollTop":
                case "scrollRight":
                case "scrollBottom":
                case "scrollLeft":
                case "scrollHorizontal":
                case "scrollVertical":
                    e.transition.scroll(e.objects.case, "in", e.settings.speedIn), e.transition.fade(e.objects.contentInner, "in", e.settings.speedIn);
                    break;
                case "elastic":
                    e.objects.case.css("opacity") < 1 && (e.transition.zoom(e.objects.case, "in", e.settings.speedIn), e.transition.fade(e.objects.contentInner, "in", e.settings.speedIn));
                case "fade":
                case "fadeInline":
                    e.transition.fade(e.objects.case, "in", e.settings.speedIn), e.transition.fade(e.objects.contentInner, "in", e.settings.speedIn);
                    break;
                default:
                    e.transition.fade(e.objects.case, "in", 0)
            }
            e._loading("end"), e.isBusy = !1, e.cache.firstOpened || (e.cache.firstOpened = e.objectData.this), e.objects.info.hide(), setTimeout(function() {
                e.transition.fade(e.objects.info, "in", e.settings.speedIn)
            }, e.settings.speedIn), e._callHooks(e.settings.onFinish)
        },
        _processContent: function() {
            switch (e.isBusy = !0, e.transition.fade(e.objects.info, "out", 0), e.settings.transitionOut) {
                case "scrollTop":
                case "scrollRight":
                case "scrollBottom":
                case "scrollLeft":
                case "scrollVertical":
                case "scrollHorizontal":
                    e.objects.case.is(":hidden") ? (e.transition.fade(e.objects.contentInner, "out", 0), e.transition.fade(e.objects.case, "out", 0, 0, function() {
                        e._loadContent()
                    })) : e.transition.scroll(e.objects.case, "out", e.settings.speedOut, function() {
                        e._loadContent()
                    });
                    break;
                case "fade":
                    e.objects.case.is(":hidden") ? e.transition.fade(e.objects.case, "out", 0, 0, function() {
                        e._loadContent()
                    }) : e.transition.fade(e.objects.case, "out", e.settings.speedOut, 0, function() {
                        e._loadContent()
                    });
                    break;
                case "fadeInline":
                case "elastic":
                    e.objects.case.is(":hidden") ? e.transition.fade(e.objects.case, "out", 0, 0, function() {
                        e._loadContent()
                    }) : e.transition.fade(e.objects.contentInner, "out", e.settings.speedOut, 0, function() {
                        e._loadContent()
                    });
                    break;
                default:
                    e.transition.fade(e.objects.case, "out", 0, 0, function() {
                        e._loadContent()
                    })
            }
        },
        _handleEvents: function() {
            e._unbindEvents(), e.objects.nav.children().not(e.objects.close).hide(), e.isSlideshowEnabled() && (!0 !== e.settings.slideshowAutoStart && !e.isSlideshowStarted || e.objects.nav.hasClass(e.settings.classPrefix + "paused") ? e._stopTimeout() : e._startTimeout()), e.settings.liveResize && e._watchResizeInteraction(), e.objects.close.click(function(t) {
                t.preventDefault(), e.close()
            }), !0 === e.settings.closeOnOverlayClick && e.objects.overlay.css("cursor", "pointer").click(function(t) {
                t.preventDefault(), e.close()
            }), !0 === e.settings.useKeys && e._addKeyEvents(), e.objectData.isPartOfSequence && (e.objects.nav.attr(e._prefixAttributeName("ispartofsequence"), !0), e.objects.nav.data("items", e._setNavigation()), e.objects.prev.click(function(t) {
                t.preventDefault(), !0 !== e.settings.navigateEndless && e.item.isFirst() || (e.objects.prev.unbind("click"), e.cache.action = "prev", e.objects.nav.data("items").prev.click(), e.isSlideshowEnabled() && e._stopTimeout())
            }), e.objects.next.click(function(t) {
                t.preventDefault(), !0 !== e.settings.navigateEndless && e.item.isLast() || (e.objects.next.unbind("click"), e.cache.action = "next", e.objects.nav.data("items").next.click(), e.isSlideshowEnabled() && e._stopTimeout())
            }), e.isSlideshowEnabled() && (e.objects.play.click(function(t) {
                t.preventDefault(), e._startTimeout()
            }), e.objects.pause.click(function(t) {
                t.preventDefault(), e._stopTimeout()
            })), !0 === e.settings.swipe && (t.isPlainObject(t.event.special.swipeleft) && e.objects.case.on("swipeleft", function(t) {
                t.preventDefault(), e.objects.next.click(), e.isSlideshowEnabled() && e._stopTimeout()
            }), t.isPlainObject(t.event.special.swiperight) && e.objects.case.on("swiperight", function(t) {
                t.preventDefault(), e.objects.prev.click(), e.isSlideshowEnabled() && e._stopTimeout()
            })))
        },
        _addKeyEvents: function() {
            t(document).bind("keyup.lightcase", function(t) {
                if (!e.isBusy) switch (t.keyCode) {
                    case 27:
                        e.objects.close.click();
                        break;
                    case 37:
                        e.objectData.isPartOfSequence && e.objects.prev.click();
                        break;
                    case 39:
                        e.objectData.isPartOfSequence && e.objects.next.click()
                }
            })
        },
        _startTimeout: function() {
            e.isSlideshowStarted = !0, e.objects.play.hide(), e.objects.pause.show(), e.cache.action = "next", e.objects.nav.removeClass(e.settings.classPrefix + "paused"), e.timeout = setTimeout(function() {
                e.objects.nav.data("items").next.click()
            }, e.settings.timeout)
        },
        _stopTimeout: function() {
            e.objects.play.show(), e.objects.pause.hide(), e.objects.nav.addClass(e.settings.classPrefix + "paused"), clearTimeout(e.timeout)
        },
        _setNavigation: function() {
            var i = t(e.cache.selector || e.settings.attr),
                s = e.objectData.sequenceLength - 1,
                n = {
                    prev: i.eq(e.objectData.prevIndex),
                    next: i.eq(e.objectData.nextIndex)
                };
            return e.objectData.currentIndex > 0 ? e.objects.prev.show() : n.prevItem = i.eq(s), e.objectData.nextIndex <= s ? e.objects.next.show() : n.next = i.eq(0), !0 === e.settings.navigateEndless && (e.objects.prev.show(), e.objects.next.show()), n
        },
        item: {
            isFirst: function() {
                return 0 === e.objectData.currentIndex
            },
            isFirstOpened: function() {
                return e.objectData.this.is(e.cache.firstOpened)
            },
            isLast: function() {
                return e.objectData.currentIndex === e.objectData.sequenceLength - 1
            }
        },
        _cloneObject: function(t) {
            var i = t.clone(),
                s = t.attr("id");
            return t.is(":hidden") ? (e._cacheObjectData(t), t.attr("id", e.settings.idPrefix + "temp-" + s).empty()) : i.removeAttr("id"), i.show()
        },
        isMobileDevice: function() {
            return !!navigator.userAgent.toLowerCase().match(e.settings.mobileMatchExpression)
        },
        isTransitionSupported: function() {
            var t = e.objects.body.get(0),
                i = !1,
                s = {
                    transition: "",
                    WebkitTransition: "-webkit-",
                    MozTransition: "-moz-",
                    OTransition: "-o-",
                    MsTransition: "-ms-"
                };
            for (var n in s) s.hasOwnProperty(n) && n in t.style && (e.support.transition = s[n], i = !0);
            return i
        },
        transition: { in : function() {
                return e.settings.transitionOpen && !e.cache.firstOpened ? e.settings.transitionOpen : e.settings.transitionIn
            }, fade: function(t, i, s, n, a) {
                var o = "in" === i,
                    c = {},
                    r = t.css("opacity"),
                    l = {},
                    d = n || (o ? 1 : 0);
                !e.isOpen && o || (c.opacity = r, l.opacity = d, t.css(e.support.transition + "transition", "none"), t.css(c).show(), e.support.transitions ? (l[e.support.transition + "transition"] = s + "ms ease", setTimeout(function() {
                    t.css(l), setTimeout(function() {
                        t.css(e.support.transition + "transition", ""), !a || !e.isOpen && o || a()
                    }, s)
                }, 15)) : (t.stop(), t.animate(l, s, a)))
            }, scroll: function(t, i, s, n) {
                var a = "in" === i,
                    o = a ? e.settings.transitionIn : e.settings.transitionOut,
                    c = "left",
                    r = {},
                    l = a ? 0 : 1,
                    d = a ? "-50%" : "50%",
                    u = {},
                    h = a ? 1 : 0,
                    f = a ? "50%" : "-50%";
                if (e.isOpen || !a) {
                    switch (o) {
                        case "scrollTop":
                            c = "top";
                            break;
                        case "scrollRight":
                            d = a ? "150%" : "50%", f = a ? "50%" : "150%";
                            break;
                        case "scrollBottom":
                            c = "top", d = a ? "150%" : "50%", f = a ? "50%" : "150%";
                            break;
                        case "scrollHorizontal":
                            d = a ? "150%" : "50%", f = a ? "50%" : "-50%";
                            break;
                        case "scrollVertical":
                            c = "top", d = a ? "-50%" : "50%", f = a ? "50%" : "150%"
                    }
                    if ("prev" === e.cache.action) switch (o) {
                        case "scrollHorizontal":
                            d = a ? "-50%" : "50%", f = a ? "50%" : "150%";
                            break;
                        case "scrollVertical":
                            d = a ? "150%" : "50%", f = a ? "50%" : "-50%"
                    }
                    r.opacity = l, r[c] = d, u.opacity = h, u[c] = f, t.css(e.support.transition + "transition", "none"), t.css(r).show(), e.support.transitions ? (u[e.support.transition + "transition"] = s + "ms ease", setTimeout(function() {
                        t.css(u), setTimeout(function() {
                            t.css(e.support.transition + "transition", ""), !n || !e.isOpen && a || n()
                        }, s)
                    }, 15)) : (t.stop(), t.animate(u, s, n))
                }
            }, zoom: function(t, i, s, n) {
                var a = "in" === i,
                    o = {},
                    c = t.css("opacity"),
                    r = a ? "scale(0.75)" : "scale(1)",
                    l = {},
                    d = a ? 1 : 0,
                    u = a ? "scale(1)" : "scale(0.75)";
                !e.isOpen && a || (o.opacity = c, o[e.support.transition + "transform"] = r, l.opacity = d, t.css(e.support.transition + "transition", "none"), t.css(o).show(), e.support.transitions ? (l[e.support.transition + "transform"] = u, l[e.support.transition + "transition"] = s + "ms ease", setTimeout(function() {
                    t.css(l), setTimeout(function() {
                        t.css(e.support.transition + "transform", ""), t.css(e.support.transition + "transition", ""), !n || !e.isOpen && a || n()
                    }, s)
                }, 15)) : (t.stop(), t.animate(l, s, n)))
            }
        },
        _callHooks: function(i) {
            "object" == typeof i && t.each(i, function(t, i) {
                "function" == typeof i && i.call(e.origin)
            })
        },
        _cacheObjectData: function(i) {
            t.data(i, "cache", {
                id: i.attr("id"),
                content: i.html()
            }), e.cache.originalObject = i
        },
        _restoreObject: function() {
            var i = t('[id^="' + e.settings.idPrefix + 'temp-"]');
            i.attr("id", t.data(e.cache.originalObject, "cache").id), i.html(t.data(e.cache.originalObject, "cache").content)
        },
        resize: function(t, i) {
            e.isOpen && (e.isSlideshowEnabled() && e._stopTimeout(), "object" == typeof i && null !== i && (i.width && e.cache.object.attr(e._prefixAttributeName("width"), i.width), i.maxWidth && e.cache.object.attr(e._prefixAttributeName("max-width"), i.maxWidth), i.height && e.cache.object.attr(e._prefixAttributeName("height"), i.height), i.maxHeight && e.cache.object.attr(e._prefixAttributeName("max-height"), i.maxHeight)), e.dimensions = e.getViewportDimensions(), e._calculateDimensions(e.cache.object), e._callHooks(e.settings.onResize))
        },
        _watchResizeInteraction: function() {
            t(window).resize(e.resize)
        },
        _unwatchResizeInteraction: function() {
            t(window).off("resize", e.resize)
        },
        _switchToFullScreenMode: function() {
            e.settings.shrinkFactor = 1, e.settings.overlayOpacity = 1, t("html").addClass(e.settings.classPrefix + "fullScreenMode")
        },
        _open: function() {
            switch (e.isOpen = !0, e.support.transitions = !!e.settings.cssTransitions && e.isTransitionSupported(), e.support.mobileDevice = e.isMobileDevice(), e.support.mobileDevice && (t("html").addClass(e.settings.classPrefix + "isMobileDevice"), e.settings.fullScreenModeForMobile && e._switchToFullScreenMode()), e.settings.transitionIn || (e.settings.transitionIn = e.settings.transition), e.settings.transitionOut || (e.settings.transitionOut = e.settings.transition), e.transition.in()) {
                case "fade":
                case "fadeInline":
                case "elastic":
                case "scrollTop":
                case "scrollRight":
                case "scrollBottom":
                case "scrollLeft":
                case "scrollVertical":
                case "scrollHorizontal":
                    e.objects.case.is(":hidden") && (e.objects.close.css("opacity", 0), e.objects.overlay.css("opacity", 0), e.objects.case.css("opacity", 0), e.objects.contentInner.css("opacity", 0)), e.transition.fade(e.objects.overlay, "in", e.settings.speedIn, e.settings.overlayOpacity, function() {
                        e.transition.fade(e.objects.close, "in", e.settings.speedIn), e._handleEvents(), e._processContent()
                    });
                    break;
                default:
                    e.transition.fade(e.objects.overlay, "in", 0, e.settings.overlayOpacity, function() {
                        e.transition.fade(e.objects.close, "in", 0), e._handleEvents(), e._processContent()
                    })
            }
            e.objects.document.addClass(e.settings.classPrefix + "open"), e.objects.case.attr("aria-hidden", "false")
        },
        show: function() {
            e._callHooks(e.settings.onBeforeCalculateDimensions), e._calculateDimensions(e.cache.object), e._callHooks(e.settings.onAfterCalculateDimensions), e._startInTransition()
        },
        close: function() {
            switch (e.isOpen = !1, e.isSlideshowEnabled() && (e._stopTimeout(), e.isSlideshowStarted = !1, e.objects.nav.removeClass(e.settings.classPrefix + "paused")), e.objects.loading.hide(), e._unbindEvents(), e._unwatchResizeInteraction(), t("html").removeClass(e.settings.classPrefix + "open"), e.objects.case.attr("aria-hidden", "true"), e.objects.nav.children().hide(), e.objects.close.hide(), e._callHooks(e.settings.onClose), e.transition.fade(e.objects.info, "out", 0), e.settings.transitionClose || e.settings.transitionOut) {
                case "fade":
                case "fadeInline":
                case "scrollTop":
                case "scrollRight":
                case "scrollBottom":
                case "scrollLeft":
                case "scrollHorizontal":
                case "scrollVertical":
                    e.transition.fade(e.objects.case, "out", e.settings.speedOut, 0, function() {
                        e.transition.fade(e.objects.overlay, "out", e.settings.speedOut, 0, function() {
                            e.cleanup()
                        })
                    });
                    break;
                case "elastic":
                    e.transition.zoom(e.objects.case, "out", e.settings.speedOut, function() {
                        e.transition.fade(e.objects.overlay, "out", e.settings.speedOut, 0, function() {
                            e.cleanup()
                        })
                    });
                    break;
                default:
                    e.cleanup()
            }
        },
        _unbindEvents: function() {
            e.objects.overlay.unbind("click"), t(document).unbind("keyup.lightcase"), e.objects.case.unbind("swipeleft").unbind("swiperight"), e.objects.prev.unbind("click"), e.objects.next.unbind("click"), e.objects.play.unbind("click"), e.objects.pause.unbind("click"), e.objects.close.unbind("click")
        },
        _cleanupDimensions: function() {
            var t = e.objects.contentInner.css("opacity");
            e.objects.case.css({
                width: "",
                height: "",
                top: "",
                left: "",
                "margin-top": "",
                "margin-left": ""
            }), e.objects.contentInner.removeAttr("style").css("opacity", t), e.objects.contentInner.children().removeAttr("style")
        },
        cleanup: function() {
            e._cleanupDimensions(), e.objects.loading.hide(), e.objects.overlay.hide(), e.objects.case.hide(), e.objects.prev.hide(), e.objects.next.hide(), e.objects.play.hide(), e.objects.pause.hide(), e.objects.document.removeAttr(e._prefixAttributeName("type")), e.objects.nav.removeAttr(e._prefixAttributeName("ispartofsequence")), e.objects.contentInner.empty().hide(), e.objects.info.children().empty(), e.cache.originalObject && e._restoreObject(), e._callHooks(e.settings.onCleanup), e.cache = {}
        },
        _matchMedia: function() {
            return window.matchMedia || window.msMatchMedia
        },
        _devicePixelRatio: function() {
            return window.devicePixelRatio || 1
        },
        _isPublicMethod: function(t) {
            return "function" == typeof e[t] && "_" !== t.charAt(0)
        },
        _export: function() {
            window.lightcase = {}, t.each(e, function(t) {
                e._isPublicMethod(t) && (lightcase[t] = e[t])
            })
        }
    };
    e._export(), t.fn.lightcase = function(i) {
        return e._isPublicMethod(i) ? e[i].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof i && i ? void t.error("Method " + i + " does not exist on jQuery.lightcase") : e.init.apply(this, arguments)
    }
  }(jQuery);
  
  
  ! function(e) {
    e.fn.niceSelect = function(t) {
        
        if ("string" == typeof t) return "update" == t ? this.each(function() {
            var t = e(this),
                n = e(this).next(".nice-select"),
                i = n.hasClass("open");
            n.length && (n.remove(), s(t), i && t.next().trigger("click"))
        }) : "destroy" == t ? (this.each(function() {
            var t = e(this),
                s = e(this).next(".nice-select");
            s.length && (s.remove(), t.css("display", ""))
        }), 0 == e(".nice-select").length && e(document).off(".nice_select")) : console.log('Method "' + t + '" does not exist.'), this;
        this.hide(), this.each(function() {
            var t = e(this);
            t.next().hasClass("nice-select") || s(t)
        }), e(document).off(".nice_select"), e(document).on("click.nice_select", ".nice-select", function(t) {
            var s = e(this);
            e(".nice-select").not(s).removeClass("open"), s.toggleClass("open"), s.hasClass("open") ? (s.find(".option"), s.find(".focus").removeClass("focus"), s.find(".selected").addClass("focus")) : s.focus()
        }), e(document).on("click.nice_select", function(t) {
            0 === e(t.target).closest(".nice-select").length && e(".nice-select").removeClass("open").find(".option")
        }), e(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function(t) {
            var s = e(this),
                n = s.closest(".nice-select");
            n.find(".selected").removeClass("selected"), s.addClass("selected");
            var i = s.data("display") || s.text();
            n.find(".current").text(i), n.prev("select").val(s.data("value")).trigger("change")
        }), e(document).on("keydown.nice_select", ".nice-select", function(t) {
            var s = e(this),
                n = e(s.find(".focus") || s.find(".list .option.selected"));
            if (32 == t.keyCode || 13 == t.keyCode) return s.hasClass("open") ? n.trigger("click") : s.trigger("click"), !1;
            if (40 == t.keyCode) {
                if (s.hasClass("open")) {
                    var i = n.nextAll(".option:not(.disabled)").first();
                    i.length > 0 && (s.find(".focus").removeClass("focus"), i.addClass("focus"))
                } else s.trigger("click");
                return !1
            }
            if (38 == t.keyCode) {
                if (s.hasClass("open")) {
                    var l = n.prevAll(".option:not(.disabled)").first();
                    l.length > 0 && (s.find(".focus").removeClass("focus"), l.addClass("focus"))
                } else s.trigger("click");
                return !1
            }
            if (27 == t.keyCode) s.hasClass("open") && s.trigger("click");
            else if (9 == t.keyCode && s.hasClass("open")) return !1
        });
        var n = document.createElement("a").style;
        return n.cssText = "pointer-events:auto", "auto" !== n.pointerEvents && e("html").addClass("no-csspointerevents"), this
    }
  }(jQuery);
  
  (function() {
    var a, b, c, d, e, f = function(a, b) {
            return function() {
                return a.apply(b, arguments)
            }
        },
        g = [].indexOf || function(a) {
            for (var b = 0, c = this.length; c > b; b++)
                if (b in this && this[b] === a) return b;
            return -1
        };
    b = function() {
        function a() {}
        return a.prototype.extend = function(a, b) {
            var c, d;
            for (c in b) d = b[c], null == a[c] && (a[c] = d);
            return a
        }, a.prototype.isMobile = function(a) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
        }, a.prototype.createEvent = function(a, b, c, d) {
            var e;
            return null == b && (b = !1), null == c && (c = !1), null == d && (d = null), null != document.createEvent ? (e = document.createEvent("CustomEvent"), e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(), e.eventType = a) : e.eventName = a, e
        }, a.prototype.emitEvent = function(a, b) {
            return null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) ? a["on" + b]() : void 0
        }, a.prototype.addEvent = function(a, b, c) {
            return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c
        }, a.prototype.removeEvent = function(a, b, c) {
            return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b]
        }, a.prototype.innerHeight = function() {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
        }, a
    }(), c = this.WeakMap || this.MozWeakMap || (c = function() {
        function a() {
            this.keys = [], this.values = []
        }
        return a.prototype.get = function(a) {
            var b, c, d, e, f;
            for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
                if (c = f[b], c === a) return this.values[b]
        }, a.prototype.set = function(a, b) {
            var c, d, e, f, g;
            for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
                if (d = g[c], d === a) return void(this.values[c] = b);
            return this.keys.push(a), this.values.push(b)
        }, a
    }()), a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function() {
        function a() {
            "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
        }
        return a.notSupported = !0, a.prototype.observe = function() {}, a
    }()), d = this.getComputedStyle || function(a, b) {
        return this.getPropertyValue = function(b) {
            var c;
            return "float" === b && (b = "styleFloat"), e.test(b) && b.replace(e, function(a, b) {
                return b.toUpperCase()
            }), (null != (c = a.currentStyle) ? c[b] : void 0) || null
        }, this
    }, e = /(\-([a-z]){1})/g, this.WOW = function() {
        function e(a) {
            null == a && (a = {}), this.scrollCallback = f(this.scrollCallback, this), this.scrollHandler = f(this.scrollHandler, this), this.resetAnimation = f(this.resetAnimation, this), this.start = f(this.start, this), this.scrolled = !0, this.config = this.util().extend(a, this.defaults), null != a.scrollContainer && (this.config.scrollContainer = document.querySelector(a.scrollContainer)), this.animationNameCache = new c, this.wowEvent = this.util().createEvent(this.config.boxClass)
        }
        return e.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null,
            scrollContainer: null
        }, e.prototype.init = function() {
            var a;
            return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, e.prototype.start = function() {
            var b, c, d, e;
            if (this.stopped = !1, this.boxes = function() {
                    var a, c, d, e;
                    for (d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                    return e
                }.call(this), this.all = function() {
                    var a, c, d, e;
                    for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                    return e
                }.call(this), this.boxes.length)
                if (this.disabled()) this.resetStyle();
                else
                    for (e = this.boxes, c = 0, d = e.length; d > c; c++) b = e[c], this.applyStyle(b, !0);
            return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new a(function(a) {
                return function(b) {
                    var c, d, e, f, g;
                    for (g = [], c = 0, d = b.length; d > c; c++) f = b[c], g.push(function() {
                        var a, b, c, d;
                        for (c = f.addedNodes || [], d = [], a = 0, b = c.length; b > a; a++) e = c[a], d.push(this.doSync(e));
                        return d
                    }.call(a));
                    return g
                }
            }(this)).observe(document.body, {
                childList: !0,
                subtree: !0
            }) : void 0
        }, e.prototype.stop = function() {
            return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
        }, e.prototype.sync = function(b) {
            return a.notSupported ? this.doSync(this.element) : void 0
        }, e.prototype.doSync = function(a) {
            var b, c, d, e, f;
            if (null == a && (a = this.element), 1 === a.nodeType) {
                for (a = a.parentNode || a, e = a.querySelectorAll("." + this.config.boxClass), f = [], c = 0, d = e.length; d > c; c++) b = e[c], g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), f.push(this.scrolled = !0)) : f.push(void 0);
                return f
            }
        }, e.prototype.show = function(a) {
            return this.applyStyle(a), a.className = a.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(a), this.util().emitEvent(a, this.wowEvent), this.util().addEvent(a, "animationend", this.resetAnimation), this.util().addEvent(a, "oanimationend", this.resetAnimation), this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation), a
        }, e.prototype.applyStyle = function(a, b) {
            var c, d, e;
            return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), e = a.getAttribute("data-wow-iteration"), this.animate(function(f) {
                return function() {
                    return f.customStyle(a, b, d, c, e)
                }
            }(this))
        }, e.prototype.animate = function() {
            return "requestAnimationFrame" in window ? function(a) {
                return window.requestAnimationFrame(a)
            } : function(a) {
                return a()
            }
        }(), e.prototype.resetStyle = function() {
            var a, b, c, d, e;
            for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(a.style.visibility = "visible");
            return e
        }, e.prototype.resetAnimation = function(a) {
            var b;
            return a.type.toLowerCase().indexOf("animationend") >= 0 ? (b = a.target || a.srcElement, b.className = b.className.replace(this.config.animateClass, "").trim()) : void 0
        }, e.prototype.customStyle = function(a, b, c, d, e) {
            return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, {
                animationDuration: c
            }), d && this.vendorSet(a.style, {
                animationDelay: d
            }), e && this.vendorSet(a.style, {
                animationIterationCount: e
            }), this.vendorSet(a.style, {
                animationName: b ? "none" : this.cachedAnimationName(a)
            }), a
        }, e.prototype.vendors = ["moz", "webkit"], e.prototype.vendorSet = function(a, b) {
            var c, d, e, f;
            d = [];
            for (c in b) e = b[c], a["" + c] = e, d.push(function() {
                var b, d, g, h;
                for (g = this.vendors, h = [], b = 0, d = g.length; d > b; b++) f = g[b], h.push(a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = e);
                return h
            }.call(this));
            return d
        }, e.prototype.vendorCSS = function(a, b) {
            var c, e, f, g, h, i;
            for (h = d(a), g = h.getPropertyCSSValue(b), f = this.vendors, c = 0, e = f.length; e > c; c++) i = f[c], g = g || h.getPropertyCSSValue("-" + i + "-" + b);
            return g
        }, e.prototype.animationName = function(a) {
            var b;
            try {
                b = this.vendorCSS(a, "animation-name").cssText
            } catch (c) {
                b = d(a).getPropertyValue("animation-name")
            }
            return "none" === b ? "" : b
        }, e.prototype.cacheAnimationName = function(a) {
            return this.animationNameCache.set(a, this.animationName(a))
        }, e.prototype.cachedAnimationName = function(a) {
            return this.animationNameCache.get(a)
        }, e.prototype.scrollHandler = function() {
            return this.scrolled = !0
        }, e.prototype.scrollCallback = function() {
            var a;
            return !this.scrolled || (this.scrolled = !1, this.boxes = function() {
                var b, c, d, e;
                for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));
                return e
            }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
        }, e.prototype.offsetTop = function(a) {
            for (var b; void 0 === a.offsetTop;) a = a.parentNode;
            for (b = a.offsetTop; a = a.offsetParent;) b += a.offsetTop;
            return b
        }, e.prototype.isVisible = function(a) {
            var b, c, d, e, f;
            return c = a.getAttribute("data-wow-offset") || this.config.offset, f = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, d = this.offsetTop(a), b = d + a.clientHeight, e >= d && b >= f
        }, e.prototype.util = function() {
            return null != this._util ? this._util : this._util = new b
        }, e.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, e
    }()
  }).call(this);
  
  
var broccoli_data = { "ajaxurl": "https:\/\/themexriver.com\/wp\/broccoli\/wp-admin\/admin-ajax.php", "nonce": "7d1aa424aa" };
(function () {
    window.mc4wp = window.mc4wp || {
        listeners: [],
        forms: {
            on: function (evt, cb) {
                window.mc4wp.listeners.push(
                    {
                        event: evt,
                        callback: cb
                    }
                );
            }
        }
    }
})();
(function () {
    function maybePrefixUrlField() {
        const value = this.value.trim()
        if (value !== '' && value.indexOf('http') !== 0) {
            this.value = 'http://' + value
        }
    }

    const urlFields = document.querySelectorAll('.mc4wp-form input[type="url"]')
    for (let j = 0; j < urlFields.length; j++) {
        urlFields[j].addEventListener('blur', maybePrefixUrlField)
    }
})();
(function () {
    var c = document.body.className;
    c = c.replace(/woocommerce-no-js/, 'woocommerce-js');
    document.body.className = c;
})();
var wpcf7 = { "api": { "root": "https:\/\/themexriver.com\/wp\/broccoli\/wp-json\/", "namespace": "contact-form-7\/v1" } };
var wc_add_to_cart_params = { "ajax_url": "\/wp\/broccoli\/wp-admin\/admin-ajax.php", "wc_ajax_url": "\/wp\/broccoli\/?wc-ajax=%%endpoint%%", "i18n_view_cart": "View cart", "cart_url": "https:\/\/themexriver.com\/wp\/broccoli\/cart\/", "is_cart": "", "cart_redirect_after_add": "no" };
var wc_cart_fragments_params = { "ajax_url": "\/wp\/broccoli\/wp-admin\/admin-ajax.php", "wc_ajax_url": "\/wp\/broccoli\/?wc-ajax=%%endpoint%%", "cart_hash_key": "wc_cart_hash_c321fca3547b50cb67779efb7fbc1e24", "fragment_name": "wc_fragments_c321fca3547b50cb67779efb7fbc1e24", "request_timeout": "5000" };
 var elementorFrontendConfig = { "environmentMode": { "edit": false, "wpPreview": false, "isScriptDebug": false }, "i18n": { "shareOnFacebook": "Share on Facebook", "shareOnTwitter": "Share on Twitter", "pinIt": "Pin it", "download": "Download", "downloadImage": "Download image", "fullscreen": "Fullscreen", "zoom": "Zoom", "share": "Share", "playVideo": "Play Video", "previous": "Previous", "next": "Next", "close": "Close" }, "is_rtl": false, "breakpoints": { "xs": 0, "sm": 480, "md": 768, "lg": 1025, "xl": 1440, "xxl": 1600 }, "responsive": { "breakpoints": { "mobile": { "label": "Mobile Portrait", "value": 767, "default_value": 767, "direction": "max", "is_enabled": true }, "mobile_extra": { "label": "Mobile Landscape", "value": 880, "default_value": 880, "direction": "max", "is_enabled": false }, "tablet": { "label": "Tablet Portrait", "value": 1024, "default_value": 1024, "direction": "max", "is_enabled": true }, "tablet_extra": { "label": "Tablet Landscape", "value": 1200, "default_value": 1200, "direction": "max", "is_enabled": false }, "laptop": { "label": "Laptop", "value": 1366, "default_value": 1366, "direction": "max", "is_enabled": false }, "widescreen": { "label": "Widescreen", "value": 2400, "default_value": 2400, "direction": "min", "is_enabled": false } } }, "version": "3.13.3", "is_static": false, "experimentalFeatures": { "e_dom_optimization": true, "e_optimized_assets_loading": true, "e_optimized_css_loading": true, "a11y_improvements": true, "additional_custom_breakpoints": true, "landing-pages": true }, "urls": { "assets": "https:\/\/themexriver.com\/wp\/broccoli\/wp-content\/plugins\/elementor\/assets\/" }, "swiperClass": "swiper-container", "settings": { "page": [], "editorPreferences": [] }, "kit": { "active_breakpoints": ["viewport_mobile", "viewport_tablet"], "global_image_lightbox": "yes", "lightbox_enable_counter": "yes", "lightbox_enable_fullscreen": "yes", "lightbox_enable_zoom": "yes", "lightbox_enable_share": "yes", "lightbox_title_src": "title", "lightbox_description_src": "description" }, "post": { "id": 17, "title": "My%20WordPress%20%E2%80%93%20Just%20another%20WordPress%20site", "excerpt": "", "featuredImage": false } };
 var woocommerce_params = { "ajax_url": "\/wp\/broccoli\/wp-admin\/admin-ajax.php", "wc_ajax_url": "\/wp\/broccoli\/?wc-ajax=%%endpoint%%" };
 window._wpemojiSettings = { "baseUrl": "https:\/\/s.w.org\/images\/core\/emoji\/14.0.0\/72x72\/", "ext": ".png", "svgUrl": "https:\/\/s.w.org\/images\/core\/emoji\/14.0.0\/svg\/", "svgExt": ".svg", "source": { "concatemoji": "https:\/\/themexriver.com\/wp\/broccoli\/wp-includes\/js\/wp-emoji-release.min.js?ver=6.2.2" } };
 /*! This file is auto-generated */
 !function (e, a, t) { var n, r, o, i = a.createElement("canvas"), p = i.getContext && i.getContext("2d"); function s(e, t) { p.clearRect(0, 0, i.width, i.height), p.fillText(e, 0, 0); e = i.toDataURL(); return p.clearRect(0, 0, i.width, i.height), p.fillText(t, 0, 0), e === i.toDataURL() } function c(e) { var t = a.createElement("script"); t.src = e, t.defer = t.type = "text/javascript", a.getElementsByTagName("head")[0].appendChild(t) } for (o = Array("flag", "emoji"), t.supports = { everything: !0, everythingExceptFlag: !0 }, r = 0; r < o.length; r++)t.supports[o[r]] = function (e) { if (p && p.fillText) switch (p.textBaseline = "top", p.font = "600 32px Arial", e) { case "flag": return s("\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f", "\ud83c\udff3\ufe0f\u200b\u26a7\ufe0f") ? !1 : !s("\ud83c\uddfa\ud83c\uddf3", "\ud83c\uddfa\u200b\ud83c\uddf3") && !s("\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f", "\ud83c\udff4\u200b\udb40\udc67\u200b\udb40\udc62\u200b\udb40\udc65\u200b\udb40\udc6e\u200b\udb40\udc67\u200b\udb40\udc7f"); case "emoji": return !s("\ud83e\udef1\ud83c\udffb\u200d\ud83e\udef2\ud83c\udfff", "\ud83e\udef1\ud83c\udffb\u200b\ud83e\udef2\ud83c\udfff") }return !1 }(o[r]), t.supports.everything = t.supports.everything && t.supports[o[r]], "flag" !== o[r] && (t.supports.everythingExceptFlag = t.supports.everythingExceptFlag && t.supports[o[r]]); t.supports.everythingExceptFlag = t.supports.everythingExceptFlag && !t.supports.flag, t.DOMReady = !1, t.readyCallback = function () { t.DOMReady = !0 }, t.supports.everything || (n = function () { t.readyCallback() }, a.addEventListener ? (a.addEventListener("DOMContentLoaded", n, !1), e.addEventListener("load", n, !1)) : (e.attachEvent("onload", n), a.attachEvent("onreadystatechange", function () { "complete" === a.readyState && t.readyCallback() })), (e = t.source || {}).concatemoji ? c(e.concatemoji) : e.wpemoji && e.twemoji && (c(e.twemoji), c(e.wpemoji))) }(window, document, window._wpemojiSettings);
 ! function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
  }(function(a) {
    "use strict";
  
    function b(a) {
        if (a instanceof Date) return a;
        if (String(a).match(g)) return String(a).match(/^[0-9]*$/) && (a = Number(a)), String(a).match(/\-/) && (a = String(a).replace(/\-/g, "/")), new Date(a);
        throw new Error("Couldn't cast `" + a + "` to a date object.")
    }
  
    function c(a) {
        var b = a.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        return new RegExp(b)
    }
  
    function d(a) {
        return function(b) {
            var d = b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (d)
                for (var f = 0, g = d.length; f < g; ++f) {
                    var h = d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
                        j = c(h[0]),
                        k = h[1] || "",
                        l = h[3] || "",
                        m = null;
                    h = h[2], i.hasOwnProperty(h) && (m = i[h], m = Number(a[m])), null !== m && ("!" === k && (m = e(l, m)), "" === k && m < 10 && (m = "0" + m.toString()), b = b.replace(j, m.toString()))
                }
            return b = b.replace(/%%/, "%")
        }
    }
  
    function e(a, b) {
        var c = "s",
            d = "";
        return a && (a = a.replace(/(:|;|\s)/gi, "").split(/\,/), 1 === a.length ? c = a[0] : (d = a[0], c = a[1])), Math.abs(b) > 1 ? c : d
    }
    var f = [],
        g = [],
        h = {
            precision: 100,
            elapse: !1,
            defer: !1
        };
    g.push(/^[0-9]*$/.source), g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g = new RegExp(g.join("|"));
    var i = {
            Y: "years",
            m: "months",
            n: "daysToMonth",
            d: "daysToWeek",
            w: "weeks",
            W: "weeksToMonth",
            H: "hours",
            M: "minutes",
            S: "seconds",
            D: "totalDays",
            I: "totalHours",
            N: "totalMinutes",
            T: "totalSeconds"
        },
        j = function(b, c, d) {
            this.el = b, this.$el = a(b), this.interval = null, this.offset = {}, this.options = a.extend({}, h), this.firstTick = !0, this.instanceNumber = f.length, f.push(this), this.$el.data("countdown-instance", this.instanceNumber), d && ("function" == typeof d ? (this.$el.on("update.countdown", d), this.$el.on("stoped.countdown", d), this.$el.on("finish.countdown", d)) : this.options = a.extend({}, h, d)), this.setFinalDate(c), this.options.defer === !1 && this.start()
        };
    a.extend(j.prototype, {
        start: function() {
            null !== this.interval && clearInterval(this.interval);
            var a = this;
            this.update(), this.interval = setInterval(function() {
                a.update.call(a)
            }, this.options.precision)
        },
        stop: function() {
            clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped")
        },
        toggle: function() {
            this.interval ? this.stop() : this.start()
        },
        pause: function() {
            this.stop()
        },
        resume: function() {
            this.start()
        },
        remove: function() {
            this.stop.call(this), f[this.instanceNumber] = null, delete this.$el.data().countdownInstance
        },
        setFinalDate: function(a) {
            this.finalDate = b(a)
        },
        update: function() {
            if (0 === this.$el.closest("html").length) return void this.remove();
            var a, b = new Date;
            return a = this.finalDate.getTime() - b.getTime(), a = Math.ceil(a / 1e3), a = !this.options.elapse && a < 0 ? 0 : Math.abs(a), this.totalSecsLeft === a || this.firstTick ? void(this.firstTick = !1) : (this.totalSecsLeft = a, this.elapsed = b >= this.finalDate, this.offset = {
                seconds: this.totalSecsLeft % 60,
                minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368),
                weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
                months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
                years: Math.abs(this.finalDate.getFullYear() - b.getFullYear()),
                totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
                totalMinutes: Math.floor(this.totalSecsLeft / 60),
                totalSeconds: this.totalSecsLeft
            }, void(this.options.elapse || 0 !== this.totalSecsLeft ? this.dispatchEvent("update") : (this.stop(), this.dispatchEvent("finish"))))
        },
        dispatchEvent: function(b) {
            var c = a.Event(b + ".countdown");
            c.finalDate = this.finalDate, c.elapsed = this.elapsed, c.offset = a.extend({}, this.offset), c.strftime = d(this.offset), this.$el.trigger(c)
        }
    }), a.fn.countdown = function() {
        var b = Array.prototype.slice.call(arguments, 0);
        return this.each(function() {
            var c = a(this).data("countdown-instance");
            if (void 0 !== c) {
                var d = f[c],
                    e = b[0];
                j.prototype.hasOwnProperty(e) ? d[e].apply(d, b.slice(1)) : null === String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (d.setFinalDate.call(d, e), d.start()) : a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, e))
            } else new j(this, b[0], b[1])
        })
    }
  });
  ! function($) {
    "use strict";
    jQuery(document).ready(function() {
        $(window);
        var o = $("body"),
            s = $(".ltn__utilize-toggle"),
            e = $(".ltn__utilize"),
            i = $(".ltn__utilize-overlay"),
            l = $(".mobile-menu-toggle");
        s.on("click", function(s) {
            s.preventDefault();
            var s = $(this),
                e = s.attr("href");
            o.addClass("ltn__utilize-open");
            $(e).addClass("ltn__utilize-open");
            i.fadeIn();
            s.parent().hasClass("mobile-menu-toggle") && s.addClass("close")
        });
        
        $(".ltn__utilize-close, .ltn__utilize-overlay").on("click", function(s) {
            s.preventDefault();
            o.removeClass("ltn__utilize-open");
            e.removeClass("ltn__utilize-open");
            i.fadeOut();
            l.find("a").removeClass("close")
        });
        s = $(".ltn__utilize-menu, .overlay-menu");
        s.find(".sub-menu").parent().prepend('<span class="menu-expand"></span>');
        s.on("click", "li a, .menu-expand", function(s) {
            var e = $(this);
            if ("#" === e.attr("href") || e.hasClass("menu-expand")) {
                s.preventDefault();
                if (e.siblings("ul:visible").length) {
                    e.parent("li").removeClass("active");
                    e.siblings("ul").slideUp();
                    e.parent("li").find("li").removeClass("active");
                    e.parent("li").find("ul:visible").slideUp()
                } else {
                    e.parent("li").addClass("active");
                    e.closest("li").siblings("li").removeClass("active").find("li").removeClass("active");
                    e.closest("li").siblings("li").find("ul:visible").slideUp();
                    e.siblings("ul").slideDown()
                }
            }
        });
        $(".mega-menu").each(function() {
            if ($(this).children("li").length) {
                var s = $(this).children("li").length;
                $(this).addClass("column-" + s)
            }
        });
        $.scrollUp({
            scrollText: '<i class="fa fa-angle-up"></i>',
            easingType: 'linear',
            scrollSpeed: 900,
            animation: 'fade'
        });
        $(".mega-menu").parent().addClass("mega-menu-parent");
        $(window).on("elementor/frontend/init", function() {
            elementorFrontend.hooks.addFilter("frontend/handlers/menu_anchor/scroll_top_distance", function(s) {
                return s - 75
            })
        });
        $(".ltn__category-menu-title").on("click", function() {
            $(".ltn__category-menu-toggle").slideToggle(500)
        });
        $(".ltn__category-menu-more-item-parent").on("click", function() {
            $(".ltn__category-menu-more-item-child").slideToggle();
            $(this).toggleClass("rx-change")
        });
        $(".ltn__category-submenu").each(function() {
            if ($(this).children("li").length) {
                var s = $(this).children("li").length;
                $(this).addClass("ltn__category-column-no-" + s)
            }
        });
        $(".ltn__category-menu-toggle .ltn__category-menu-drop > a").on("click", function() {
            if ($(window).width() < 991) {
                $(this).removeAttr("href");
                var s = $(this).parent("li");
                if (s.hasClass("open")) {
                    s.removeClass("open");
                    s.find("li").removeClass("open");
                    s.find("ul").slideUp()
                } else {
                    s.addClass("open");
                    s.children("ul").slideDown();
                    s.siblings("li").children("ul").slideUp();
                    s.siblings("li").removeClass("open");
                    s.siblings("li").find("li").removeClass("open");
                    s.siblings("li").find("ul").slideUp()
                }
            }
        });
        $(".ltn__category-menu-toggle .ltn__category-menu-drop > a").append('<span class="expand"></span>');
        $(function() {
            $("a.page-scroll").bind("click", function(s) {
                var e = $(this);
                $("html, body").stop().animate({
                    scrollTop: $(e.attr("href")).offset().top
                }, 1500, "easeInOutExpo");
                s.preventDefault()
            })
        });
        $(".header-search-1").on("click", function() {
            $(".header-search-1, .header-search-1-form").toggleClass("search-open");
            return !1
        });
        $(".current-year").text((new Date).getFullYear());
        (new WOW).init();
        $('[data-toggle="tooltip"]').tooltip();
        $("select").niceSelect();
        var t = $(".ltn__feature-item-6, .ltn__our-journey-wrap ul li, .ltn__pricing-plan-item");
        t.mouseover(function() {
            t.removeClass("active");
            $(this).addClass("active")
        });
        $(".ltn__shop-details-large-img").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: !1,
            fade: !0,
            asNavFor: ".ltn__shop-details-small-img"
        });
        $(".ltn__shop-details-small-img").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: ".ltn__shop-details-large-img",
            dots: !1,
            arrows: !0,
            focusOnSelect: !0,
            prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
            nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 580,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }]
        });
        var a = $(".ltn__gallery-active"),
            r = $(".ltn__gallery-filter-menu");
        r.on("click", "button, a", function() {
            var s = $(this),
                e = s.attr("data-filter");
            r.find("button, a").removeClass("active");
            s.addClass("active");
            a.isotope({
                filter: e
            })
        });
        a.each(function() {
            var s = $(this);
            s.imagesLoaded(function() {
                s.isotope({
                    itemSelector: ".ltn__gallery-item",
                    percentPosition: !0,
                    masonry: {
                        columnWidth: ".ltn__gallery-sizer"
                    }
                })
            })
        });
        $("a[data-rel^=lightcase]").lightcase({
            transition: "elastic",
            swipe: !0,
            maxWidth: 1170,
            maxHeight: 600
        });
        $(".ltn__slide-one-active").slick({
            autoplay: !1,
            autoplaySpeed: 2e3,
            arrows: !0,
            dots: !0,
            fade: !0,
            cssEase: "linear",
            infinite: !0,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
            nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
            responsive: [{
                breakpoint: 1200,
                settings: {
                    arrows: !1,
                    dots: !0
                }
            }]
        }).on("afterChange", function() {
            (new WOW).init()
        });
        $(".ltn__slide-active-2").slick({
            autoplay: !1,
            autoplaySpeed: 2e3,
            arrows: !1,
            dots: !0,
            fade: !0,
            cssEase: "linear",
            infinite: !0,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
            nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
            responsive: [{
                breakpoint: 1200,
                settings: {
                    arrows: !1,
                    dots: !0
                }
            }]
        }).on("afterChange", function() {
            (new WOW).init()
        });
        $(".ltn__product-slider-one-active").slick({
            arrows: !0,
            dots: !1,
            infinite: !0,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
            nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: !1,
                    dots: !0
                }
            }, {
                breakpoint: 580,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: !1,
                    dots: !0
                }
            }]
        });
        $(".ltn__product-slider-item-four-active").slick({
            arrows: !0,
            dots: !1,
            infinite: !0,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
            nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
            responsive: [{
                breakpoint: 992,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 768,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 580,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }]
        });
        $(".ltn__related-product-slider-one-active").slick({
            arrows: !0,
            dots: !1,
            infinite: !0,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
            nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 768,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 580,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }]
        });
        $(".ltn__tab-product-slider-one-active").slick({
            arrows: !0,
            dots: !1,
            infinite: !0,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
            nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 992,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 768,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 580,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }]
        });
        $(".ltn__small-product-slider-active").slick({
            arrows: !1,
            dots: !0,
            infinite: !0,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
            nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 992,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 768,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 580,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        $(".ltn__blog-slider-one-active").slick({
            arrows: !0,
            dots: !1,
            infinite: !0,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
            nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: !1,
                    dots: !0
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: !1,
                    dots: !0
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: !1,
                    dots: !0
                }
            }, {
                breakpoint: 580,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        $(".ltn__testimonial-slider-active").slick({
            arrows: !0,
            dots: !0,
            infinite: !0,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
            nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 768,
                settings: {
                    arrows: !1,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 580,
                settings: {
                    arrows: !1,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        $(".ltn__testimonial-slider-2-active").slick({
            arrows: !0,
            dots: !1,
            infinite: !0,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
            nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 580,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        $(".ltn__testimonial-slider-3-active").slick({
            arrows: !0,
            centerMode: !0,
            centerPadding: "80px",
            dots: !1,
            infinite: !0,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
            nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
            responsive: [{
                breakpoint: 1600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 768,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 580,
                settings: {
                    arrows: !1,
                    dots: !0,
                    centerMode: !1,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        $(".ltn__category-slider-active").slick({
            arrows: !0,
            dots: !1,
            infinite: !0,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
            nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 992,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 768,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 580,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 375,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        $(".ltn__image-slider-1-active").slick({
            arrows: !0,
            dots: !1,
            infinite: !0,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 1,
            centerMode: !0,
            centerPadding: "0px",
            prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
            nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: !1,
                    dots: !0
                }
            }, {
                breakpoint: 580,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: !1,
                    dots: !0
                }
            }]
        });
        $(".ltn__image-slider-2-active").slick({
            rtl: !1,
            arrows: !0,
            dots: !1,
            infinite: !0,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: !0,
            centerPadding: "80px",
            prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
            nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
            responsive: [{
                breakpoint: 992,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 768,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerPadding: "50px"
                }
            }, {
                breakpoint: 580,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: "50px"
                }
            }]
        });
        $(".ltn__image-slider-3-active").slick({
            rtl: !1,
            arrows: !0,
            dots: !1,
            infinite: !0,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: !0,
            centerPadding: "0px",
            prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
            nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
            responsive: [{
                breakpoint: 992,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 768,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 580,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        $(".ltn__image-slider-4-active").slick({
            rtl: !1,
            arrows: !0,
            dots: !1,
            infinite: !0,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            centerMode: !0,
            centerPadding: "0px",
            prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
            nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 992,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 768,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 580,
                settings: {
                    arrows: !1,
                    dots: !0,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        $(".ltn__brand-logo-active").length && $(".ltn__brand-logo-active").slick({
            rtl: !1,
            arrows: !1,
            dots: !1,
            infinite: !0,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 1,
            prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
            nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: !1
                }
            }, {
                breakpoint: 580,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }]
        });
        $(".ltn__blog-gallery-active").length && $(".ltn__blog-gallery-active").slick({
            rtl: !1,
            arrows: !0,
            dots: !1,
            infinite: !0,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
            nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>'
        });
        $("[data-countdown]").each(function() {
            var e = $(this),
                s = $(this).data("countdown");
            e.hasClass("countdown-full-format") ? e.countdown(s, function(s) {
                e.html(s.strftime('<div class="single"><h1>%Y</h1><p>Years</p></div> <div class="single"><h1>%m</h1><p>Months</p></div> <div class="single"><h1>%W</h1><p>Weeks</p></div> <div class="single"><h1>%d</h1><p>Days</p></div> <div class="single"><h1>%H</h1><p>Hrs</p></div> <div class="single"><h1>%M</h1><p>Mins</p></div> <div class="single"><h1>%S</h1><p>Secs</p></div>'))
            }) : e.countdown(s, function(s) {
                e.html(s.strftime('<div class="single"><h1>%D</h1><p>Days</p></div> <div class="single"><h1>%H</h1><p>Hrs</p></div> <div class="single"><h1>%M</h1><p>Mins</p></div> <div class="single"><h1>%S</h1><p>Secs</p></div>'))
            })
        });
        $(".counter").counterUp({
            delay: 10,
            time: 2e3
        });
        $(".counter").addClass("animated fadeInDownBig");
        $("h3").addClass("animated fadeIn");
        if ($(".ltn__instafeed").length) {
            $.instagramFeed({
                username: "envato",
                container: ".ltn__instafeed",
                display_profile: !1,
                display_biography: !1,
                display_gallery: !0,
                styling: !1,
                items: 12,
                image_size: "600"
            });
            $(".ltn__instafeed").on("DOMNodeInserted", function(s) {
                if ("instagram_gallery" == s.target.className) {
                    $(".ltn__instafeed-slider-2 ." + s.target.className).slick({
                        infinite: !0,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
                        nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
                        responsive: [{
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 2
                            }
                        }, {
                            breakpoint: 575,
                            settings: {
                                slidesToShow: 1
                            }
                        }]
                    });
                    $(".ltn__instafeed-slider-1 ." + s.target.className).slick({
                        infinite: !0,
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
                        nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
                        responsive: [{
                            breakpoint: 119,
                            settings: {
                                slidesToShow: 4
                            }
                        }, {
                            breakpoint: 991,
                            settings: {
                                slidesToShow: 3
                            }
                        }, {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 2
                            }
                        }, {
                            breakpoint: 575,
                            settings: {
                                slidesToShow: 1
                            }
                        }]
                    })
                }
            })
        }
        $(".slider-range").slider({
            range: !0,
            min: 50,
            max: 5e3,
            values: [50, 1500],
            slide: function(s, e) {
                $(".amount").val("$" + e.values[0] + " - $" + e.values[1])
            }
        });
        $(".amount").val("$" + $(".slider-range").slider("values", 0) + " - $" + $(".slider-range").slider("values", 1));
        $(".cart-plus-minus").prepend('<div class="dec qtybutton">-</div>');
        $(".cart-plus-minus").append('<div class="inc qtybutton">+</div>');
        $(".qtybutton").on("click", function() {
            var s = $(this),
                e = s.parent().find("input").val();
            e = "+" == s.text() ? parseFloat(e) + 1 : 0 < e ? parseFloat(e) - 1 : 0;
            s.parent().find("input").val(e)
        });
        $.scrollUp({
            scrollText: '<i class="fa fa-angle-up"></i>',
            easingType: "linear",
            scrollSpeed: 900,
            animation: "fade"
        });
        $(".ltn__parallax-effect-active").length && (s = $(".ltn__parallax-effect-active").get(0), new Parallax(s));
        var n = $(".ltn__testimonial-slider-4-active");
        n.slick({
            autoplay: !0,
            autoplaySpeed: 3e3,
            dots: !1,
            arrows: !0,
            fade: !0,
            speed: 1500,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
            nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
            responsive: [{
                breakpoint: 992,
                settings: {
                    autoplay: !1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: !0,
                    arrows: !1
                }
            }, {
                breakpoint: 768,
                settings: {
                    autoplay: !1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: !0,
                    arrows: !1
                }
            }, {
                breakpoint: 580,
                settings: {
                    autoplay: !1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: !0,
                    arrows: !1
                }
            }]
        });
        n.on("beforeChange", function(s, e, o, i) {
            i += 1, e = e.slideCount == i ? i - 1 : i, e = $('.ltn__testimonial-slider-4 .slick-slide[data-slick-index="' + e + '"]').find(".ltn__testimonial-image"), i = $(".ltn__testimonial-quote-menu li:nth-child(" + i + ")").find("img").eq(0);
            i && c(i, e)
        });
        $(document).on("click", ".ltn__testimonial-quote-menu li", function(s) {
            var e = $(this),
                o = e.prevAll().length,
                o = (n.slick("slickGoTo", o), $('.ltn__testimonial-slider-4 .slick-slide[data-slick-index="' + o + '"]').find(".ltn__testimonial-image")),
                e = e.find("img").eq(0);
            e && c(e, o)
        });

        function c(s, e) {
            s.clone().offset({
                top: s.offset().top,
                left: s.offset().left
            }).css({
                opacity: "0.5",
                position: "absolute",
                height: "130px",
                width: "130px",
                "z-index": "100"
            }).addClass("quote-animated-image").appendTo($("body")).animate({
                top: e.offset().top + 10,
                left: e.offset().left + 10,
                width: 130,
                height: 130
            }, 300).animate({
                visibility: "hidden",
                opacity: "0"
            }, function() {
                $(this).remove()
            })
        }
        $("#ltn__newsletter_popup").modal("show")
    });
    $(window).on("scroll", function() {
        $(window).scrollTop() < 445 ? $(".ltn__header-sticky").removeClass("sticky-active") : $(".ltn__header-sticky").addClass("sticky-active")
    });
    $(window).on("load", function() {
        $("#preloader").length && $("#preloader").fadeOut(1e3)

    });
}
(jQuery);
! function(l, o, e) {
    "use strict";
    l.fn.scrollUp = function(o) {
        l.data(e.body, "scrollUp") || (l.data(e.body, "scrollUp", !0), l.fn.scrollUp.init(o))
    }, l.fn.scrollUp.init = function(r) {
        var s, t, c, i, n, a, d, p = l.fn.scrollUp.settings = l.extend({}, l.fn.scrollUp.defaults, r),
            f = !1;
        switch (d = p.scrollTrigger ? l(p.scrollTrigger) : l("<a/>", {
            id: p.scrollName,
            href: "#top"
        }), p.scrollTitle && d.attr("title", p.scrollTitle), d.appendTo("body"), p.scrollImg || p.scrollTrigger || d.html(p.scrollText), d.css({
            display: "none",
            position: "fixed",
            zIndex: p.zIndex
        }), p.activeOverlay && l("<div/>", {
            id: p.scrollName + "-active"
        }).css({
            position: "absolute",
            top: p.scrollDistance + "px",
            width: "100%",
            borderTop: "1px dotted" + p.activeOverlay,
            zIndex: p.zIndex
        }).appendTo("body"), p.animation) {
            case "fade":
                s = "fadeIn", t = "fadeOut", c = p.animationSpeed;
                break;
            case "slide":
                s = "slideDown", t = "slideUp", c = p.animationSpeed;
                break;
            default:
                s = "show", t = "hide", c = 0
        }
        i = "top" === p.scrollFrom ? p.scrollDistance : l(e).height() - l(o).height() - p.scrollDistance, n = l(o).scroll(function() {
            l(o).scrollTop() > i ? f || (d[s](c), f = !0) : f && (d[t](c), f = !1)
        }), p.scrollTarget ? "number" == typeof p.scrollTarget ? a = p.scrollTarget : "string" == typeof p.scrollTarget && (a = Math.floor(l(p.scrollTarget).offset().top)) : a = 0, d.click(function(o) {
            o.preventDefault(), l("html, body").animate({
                scrollTop: a
            }, p.scrollSpeed, p.easingType)
        })
    }, l.fn.scrollUp.defaults = {
        scrollName: "scrollUp",
        scrollDistance: 300,
        scrollFrom: "top",
        scrollSpeed: 300,
        easingType: "linear",
        animation: "fade",
        animationSpeed: 200,
        scrollTrigger: !1,
        scrollTarget: !1,
        scrollText: "Scroll to top",
        scrollTitle: !1,
        scrollImg: !1,
        activeOverlay: !1,
        zIndex: 2147483647
    }, l.fn.scrollUp.destroy = function(r) {
        l.removeData(e.body, "scrollUp"), l("#" + l.fn.scrollUp.settings.scrollName).remove(), l("#" + l.fn.scrollUp.settings.scrollName + "-active").remove(), l.fn.jquery.split(".")[1] >= 7 ? l(o).off("scroll", r) : l(o).unbind("scroll", r)
    }, l.scrollUp = l.fn.scrollUp
}(jQuery, window, document);