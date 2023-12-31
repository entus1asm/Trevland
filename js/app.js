(() => {
  "use strict";
  function e(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function t(s = {}, r = {}) {
    Object.keys(r).forEach((i) => {
      void 0 === s[i]
        ? (s[i] = r[i])
        : e(r[i]) && e(s[i]) && Object.keys(r[i]).length > 0 && t(s[i], r[i]);
    });
  }
  const s = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function r() {
    const e = "undefined" != typeof document ? document : {};
    return t(e, s), e;
  }
  const i = {
    document: s,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function a() {
    const e = "undefined" != typeof window ? window : {};
    return t(e, i), e;
  }
  function n(e, t = 0) {
    return setTimeout(e, t);
  }
  function l() {
    return Date.now();
  }
  function o(e, t = "x") {
    const s = a();
    let r, i, n;
    const l = (function (e) {
      const t = a();
      let s;
      return (
        t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
      );
    })(e);
    return (
      s.WebKitCSSMatrix
        ? ((i = l.transform || l.webkitTransform),
          i.split(",").length > 6 &&
            (i = i
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (n = new s.WebKitCSSMatrix("none" === i ? "" : i)))
        : ((n =
            l.MozTransform ||
            l.OTransform ||
            l.MsTransform ||
            l.msTransform ||
            l.transform ||
            l
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (r = n.toString().split(","))),
      "x" === t &&
        (i = s.WebKitCSSMatrix
          ? n.m41
          : 16 === r.length
          ? parseFloat(r[12])
          : parseFloat(r[4])),
      "y" === t &&
        (i = s.WebKitCSSMatrix
          ? n.m42
          : 16 === r.length
          ? parseFloat(r[13])
          : parseFloat(r[5])),
      i || 0
    );
  }
  function d(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function c(...e) {
    const t = Object(e[0]),
      s = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < e.length; i += 1) {
      const a = e[i];
      if (
        null != a &&
        ((r = a),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? r instanceof HTMLElement
          : r && (1 === r.nodeType || 11 === r.nodeType)))
      ) {
        const e = Object.keys(Object(a)).filter((e) => s.indexOf(e) < 0);
        for (let s = 0, r = e.length; s < r; s += 1) {
          const r = e[s],
            i = Object.getOwnPropertyDescriptor(a, r);
          void 0 !== i &&
            i.enumerable &&
            (d(t[r]) && d(a[r])
              ? a[r].__swiper__
                ? (t[r] = a[r])
                : c(t[r], a[r])
              : !d(t[r]) && d(a[r])
              ? ((t[r] = {}), a[r].__swiper__ ? (t[r] = a[r]) : c(t[r], a[r]))
              : (t[r] = a[r]));
        }
      }
    }
    var r;
    return t;
  }
  function p(e, t, s) {
    e.style.setProperty(t, s);
  }
  function u({ swiper: e, targetPosition: t, side: s }) {
    const r = a(),
      i = -e.translate;
    let n,
      l = null;
    const o = e.params.speed;
    (e.wrapperEl.style.scrollSnapType = "none"),
      r.cancelAnimationFrame(e.cssModeFrameID);
    const d = t > i ? "next" : "prev",
      c = (e, t) => ("next" === d && e >= t) || ("prev" === d && e <= t),
      p = () => {
        (n = new Date().getTime()), null === l && (l = n);
        const a = Math.max(Math.min((n - l) / o, 1), 0),
          d = 0.5 - Math.cos(a * Math.PI) / 2;
        let u = i + d * (t - i);
        if ((c(u, t) && (u = t), e.wrapperEl.scrollTo({ [s]: u }), c(u, t)))
          return (
            (e.wrapperEl.style.overflow = "hidden"),
            (e.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (e.wrapperEl.style.overflow = ""),
                e.wrapperEl.scrollTo({ [s]: u });
            }),
            void r.cancelAnimationFrame(e.cssModeFrameID)
          );
        e.cssModeFrameID = r.requestAnimationFrame(p);
      };
    p();
  }
  function f(e, t = "") {
    return [...e.children].filter((e) => e.matches(t));
  }
  function m(e, t = []) {
    const s = document.createElement(e);
    return s.classList.add(...(Array.isArray(t) ? t : [t])), s;
  }
  function h(e, t) {
    return a().getComputedStyle(e, null).getPropertyValue(t);
  }
  function v(e) {
    let t,
      s = e;
    if (s) {
      for (t = 0; null !== (s = s.previousSibling); )
        1 === s.nodeType && (t += 1);
      return t;
    }
  }
  function g(e, t, s) {
    const r = a();
    return s
      ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
          parseFloat(
            r
              .getComputedStyle(e, null)
              .getPropertyValue("width" === t ? "margin-right" : "margin-top")
          ) +
          parseFloat(
            r
              .getComputedStyle(e, null)
              .getPropertyValue("width" === t ? "margin-left" : "margin-bottom")
          )
      : e.offsetWidth;
  }
  let w, b, S;
  function T() {
    return (
      w ||
        (w = (function () {
          const e = a(),
            t = r();
          return {
            smoothScroll:
              t.documentElement &&
              t.documentElement.style &&
              "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
          };
        })()),
      w
    );
  }
  function y(e = {}) {
    return (
      b ||
        (b = (function ({ userAgent: e } = {}) {
          const t = T(),
            s = a(),
            r = s.navigator.platform,
            i = e || s.navigator.userAgent,
            n = { ios: !1, android: !1 },
            l = s.screen.width,
            o = s.screen.height,
            d = i.match(/(Android);?[\s\/]+([\d.]+)?/);
          let c = i.match(/(iPad).*OS\s([\d_]+)/);
          const p = i.match(/(iPod)(.*OS\s([\d_]+))?/),
            u = !c && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            f = "Win32" === r;
          let m = "MacIntel" === r;
          return (
            !c &&
              m &&
              t.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${l}x${o}`) >= 0 &&
              ((c = i.match(/(Version)\/([\d.]+)/)),
              c || (c = [0, 1, "13_0_0"]),
              (m = !1)),
            d && !f && ((n.os = "android"), (n.android = !0)),
            (c || u || p) && ((n.os = "ios"), (n.ios = !0)),
            n
          );
        })(e)),
      b
    );
  }
  function x() {
    return (
      S ||
        (S = (function () {
          const e = a();
          let t = !1;
          function s() {
            const t = e.navigator.userAgent.toLowerCase();
            return (
              t.indexOf("safari") >= 0 &&
              t.indexOf("chrome") < 0 &&
              t.indexOf("android") < 0
            );
          }
          if (s()) {
            const s = String(e.navigator.userAgent);
            if (s.includes("Version/")) {
              const [e, r] = s
                .split("Version/")[1]
                .split(" ")[0]
                .split(".")
                .map((e) => Number(e));
              t = e < 16 || (16 === e && r < 2);
            }
          }
          return {
            isSafari: t || s(),
            needPerspectiveFix: t,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent
            ),
          };
        })()),
      S
    );
  }
  const E = {
    on(e, t, s) {
      const r = this;
      if (!r.eventsListeners || r.destroyed) return r;
      if ("function" != typeof t) return r;
      const i = s ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          r.eventsListeners[e] || (r.eventsListeners[e] = []),
            r.eventsListeners[e][i](t);
        }),
        r
      );
    },
    once(e, t, s) {
      const r = this;
      if (!r.eventsListeners || r.destroyed) return r;
      if ("function" != typeof t) return r;
      function i(...s) {
        r.off(e, i), i.__emitterProxy && delete i.__emitterProxy, t.apply(r, s);
      }
      return (i.__emitterProxy = t), r.on(e, i, s);
    },
    onAny(e, t) {
      const s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ("function" != typeof e) return s;
      const r = t ? "unshift" : "push";
      return (
        s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[r](e), s
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off(e, t) {
      const s = this;
      return !s.eventsListeners || s.destroyed
        ? s
        : s.eventsListeners
        ? (e.split(" ").forEach((e) => {
            void 0 === t
              ? (s.eventsListeners[e] = [])
              : s.eventsListeners[e] &&
                s.eventsListeners[e].forEach((r, i) => {
                  (r === t || (r.__emitterProxy && r.__emitterProxy === t)) &&
                    s.eventsListeners[e].splice(i, 1);
                });
          }),
          s)
        : s;
    },
    emit(...e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsListeners) return t;
      let s, r, i;
      "string" == typeof e[0] || Array.isArray(e[0])
        ? ((s = e[0]), (r = e.slice(1, e.length)), (i = t))
        : ((s = e[0].events), (r = e[0].data), (i = e[0].context || t)),
        r.unshift(i);
      return (
        (Array.isArray(s) ? s : s.split(" ")).forEach((e) => {
          t.eventsAnyListeners &&
            t.eventsAnyListeners.length &&
            t.eventsAnyListeners.forEach((t) => {
              t.apply(i, [e, ...r]);
            }),
            t.eventsListeners &&
              t.eventsListeners[e] &&
              t.eventsListeners[e].forEach((e) => {
                e.apply(i, r);
              });
        }),
        t
      );
    },
  };
  const C = (e, t) => {
      if (!e || e.destroyed || !e.params) return;
      const s = t.closest(
        e.isElement ? "swiper-slide" : `.${e.params.slideClass}`
      );
      if (s) {
        const t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
        t && t.remove();
      }
    },
    M = (e, t) => {
      if (!e.slides[t]) return;
      const s = e.slides[t].querySelector('[loading="lazy"]');
      s && s.removeAttribute("loading");
    },
    P = (e) => {
      if (!e || e.destroyed || !e.params) return;
      let t = e.params.lazyPreloadPrevNext;
      const s = e.slides.length;
      if (!s || !t || t < 0) return;
      t = Math.min(t, s);
      const r =
          "auto" === e.params.slidesPerView
            ? e.slidesPerViewDynamic()
            : Math.ceil(e.params.slidesPerView),
        i = e.activeIndex;
      if (e.params.grid && e.params.grid.rows > 1) {
        const s = i,
          a = [s - t];
        return (
          a.push(...Array.from({ length: t }).map((e, t) => s + r + t)),
          void e.slides.forEach((t, s) => {
            a.includes(t.column) && M(e, s);
          })
        );
      }
      const a = i + r - 1;
      if (e.params.rewind || e.params.loop)
        for (let r = i - t; r <= a + t; r += 1) {
          const t = ((r % s) + s) % s;
          (t < i || t > a) && M(e, t);
        }
      else
        for (let r = Math.max(i - t, 0); r <= Math.min(a + t, s - 1); r += 1)
          r !== i && (r > a || r < i) && M(e, r);
    };
  const L = {
    updateSize: function () {
      const e = this;
      let t, s;
      const r = e.el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : r.clientWidth),
        (s =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : r.clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === s && e.isVertical()) ||
          ((t =
            t -
            parseInt(h(r, "padding-left") || 0, 10) -
            parseInt(h(r, "padding-right") || 0, 10)),
          (s =
            s -
            parseInt(h(r, "padding-top") || 0, 10) -
            parseInt(h(r, "padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(s) && (s = 0),
          Object.assign(e, {
            width: t,
            height: s,
            size: e.isHorizontal() ? t : s,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t) {
        return e.isHorizontal()
          ? t
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[t];
      }
      function s(e, s) {
        return parseFloat(e.getPropertyValue(t(s)) || 0);
      }
      const r = e.params,
        {
          wrapperEl: i,
          slidesEl: a,
          size: n,
          rtlTranslate: l,
          wrongRTL: o,
        } = e,
        d = e.virtual && r.virtual.enabled,
        c = d ? e.virtual.slides.length : e.slides.length,
        u = f(a, `.${e.params.slideClass}, swiper-slide`),
        m = d ? e.virtual.slides.length : u.length;
      let v = [];
      const w = [],
        b = [];
      let S = r.slidesOffsetBefore;
      "function" == typeof S && (S = r.slidesOffsetBefore.call(e));
      let T = r.slidesOffsetAfter;
      "function" == typeof T && (T = r.slidesOffsetAfter.call(e));
      const y = e.snapGrid.length,
        x = e.slidesGrid.length;
      let E = r.spaceBetween,
        C = -S,
        M = 0,
        P = 0;
      if (void 0 === n) return;
      "string" == typeof E && E.indexOf("%") >= 0
        ? (E = (parseFloat(E.replace("%", "")) / 100) * n)
        : "string" == typeof E && (E = parseFloat(E)),
        (e.virtualSize = -E),
        u.forEach((e) => {
          l ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
            (e.style.marginBottom = ""),
            (e.style.marginTop = "");
        }),
        r.centeredSlides &&
          r.cssMode &&
          (p(i, "--swiper-centered-offset-before", ""),
          p(i, "--swiper-centered-offset-after", ""));
      const L = r.grid && r.grid.rows > 1 && e.grid;
      let k;
      L && e.grid.initSlides(m);
      const z =
        "auto" === r.slidesPerView &&
        r.breakpoints &&
        Object.keys(r.breakpoints).filter(
          (e) => void 0 !== r.breakpoints[e].slidesPerView
        ).length > 0;
      for (let i = 0; i < m; i += 1) {
        let a;
        if (
          ((k = 0),
          u[i] && (a = u[i]),
          L && e.grid.updateSlide(i, a, m, t),
          !u[i] || "none" !== h(a, "display"))
        ) {
          if ("auto" === r.slidesPerView) {
            z && (u[i].style[t("width")] = "");
            const n = getComputedStyle(a),
              l = a.style.transform,
              o = a.style.webkitTransform;
            if (
              (l && (a.style.transform = "none"),
              o && (a.style.webkitTransform = "none"),
              r.roundLengths)
            )
              k = e.isHorizontal() ? g(a, "width", !0) : g(a, "height", !0);
            else {
              const e = s(n, "width"),
                t = s(n, "padding-left"),
                r = s(n, "padding-right"),
                i = s(n, "margin-left"),
                l = s(n, "margin-right"),
                o = n.getPropertyValue("box-sizing");
              if (o && "border-box" === o) k = e + i + l;
              else {
                const { clientWidth: s, offsetWidth: n } = a;
                k = e + t + r + i + l + (n - s);
              }
            }
            l && (a.style.transform = l),
              o && (a.style.webkitTransform = o),
              r.roundLengths && (k = Math.floor(k));
          } else
            (k = (n - (r.slidesPerView - 1) * E) / r.slidesPerView),
              r.roundLengths && (k = Math.floor(k)),
              u[i] && (u[i].style[t("width")] = `${k}px`);
          u[i] && (u[i].swiperSlideSize = k),
            b.push(k),
            r.centeredSlides
              ? ((C = C + k / 2 + M / 2 + E),
                0 === M && 0 !== i && (C = C - n / 2 - E),
                0 === i && (C = C - n / 2 - E),
                Math.abs(C) < 0.001 && (C = 0),
                r.roundLengths && (C = Math.floor(C)),
                P % r.slidesPerGroup == 0 && v.push(C),
                w.push(C))
              : (r.roundLengths && (C = Math.floor(C)),
                (P - Math.min(e.params.slidesPerGroupSkip, P)) %
                  e.params.slidesPerGroup ==
                  0 && v.push(C),
                w.push(C),
                (C = C + k + E)),
            (e.virtualSize += k + E),
            (M = k),
            (P += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, n) + T),
        l &&
          o &&
          ("slide" === r.effect || "coverflow" === r.effect) &&
          (i.style.width = `${e.virtualSize + E}px`),
        r.setWrapperSize && (i.style[t("width")] = `${e.virtualSize + E}px`),
        L && e.grid.updateWrapperSize(k, v, t),
        !r.centeredSlides)
      ) {
        const t = [];
        for (let s = 0; s < v.length; s += 1) {
          let i = v[s];
          r.roundLengths && (i = Math.floor(i)),
            v[s] <= e.virtualSize - n && t.push(i);
        }
        (v = t),
          Math.floor(e.virtualSize - n) - Math.floor(v[v.length - 1]) > 1 &&
            v.push(e.virtualSize - n);
      }
      if (d && r.loop) {
        const t = b[0] + E;
        if (r.slidesPerGroup > 1) {
          const s = Math.ceil(
              (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                r.slidesPerGroup
            ),
            i = t * r.slidesPerGroup;
          for (let e = 0; e < s; e += 1) v.push(v[v.length - 1] + i);
        }
        for (
          let s = 0;
          s < e.virtual.slidesBefore + e.virtual.slidesAfter;
          s += 1
        )
          1 === r.slidesPerGroup && v.push(v[v.length - 1] + t),
            w.push(w[w.length - 1] + t),
            (e.virtualSize += t);
      }
      if ((0 === v.length && (v = [0]), 0 !== E)) {
        const s = e.isHorizontal() && l ? "marginLeft" : t("marginRight");
        u.filter(
          (e, t) => !(r.cssMode && !r.loop) || t !== u.length - 1
        ).forEach((e) => {
          e.style[s] = `${E}px`;
        });
      }
      if (r.centeredSlides && r.centeredSlidesBounds) {
        let e = 0;
        b.forEach((t) => {
          e += t + (E || 0);
        }),
          (e -= E);
        const t = e - n;
        v = v.map((e) => (e <= 0 ? -S : e > t ? t + T : e));
      }
      if (r.centerInsufficientSlides) {
        let e = 0;
        if (
          (b.forEach((t) => {
            e += t + (E || 0);
          }),
          (e -= E),
          e < n)
        ) {
          const t = (n - e) / 2;
          v.forEach((e, s) => {
            v[s] = e - t;
          }),
            w.forEach((e, s) => {
              w[s] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: u,
          snapGrid: v,
          slidesGrid: w,
          slidesSizesGrid: b,
        }),
        r.centeredSlides && r.cssMode && !r.centeredSlidesBounds)
      ) {
        p(i, "--swiper-centered-offset-before", -v[0] + "px"),
          p(
            i,
            "--swiper-centered-offset-after",
            e.size / 2 - b[b.length - 1] / 2 + "px"
          );
        const t = -e.snapGrid[0],
          s = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + s));
      }
      if (
        (m !== c && e.emit("slidesLengthChange"),
        v.length !== y &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        w.length !== x && e.emit("slidesGridLengthChange"),
        r.watchSlidesProgress && e.updateSlidesOffset(),
        !(d || r.cssMode || ("slide" !== r.effect && "fade" !== r.effect)))
      ) {
        const t = `${r.containerModifierClass}backface-hidden`,
          s = e.el.classList.contains(t);
        m <= r.maxBackfaceHiddenSlides
          ? s || e.el.classList.add(t)
          : s && e.el.classList.remove(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        s = [],
        r = t.virtual && t.params.virtual.enabled;
      let i,
        a = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const n = (e) => (r ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]);
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          (t.visibleSlides || []).forEach((e) => {
            s.push(e);
          });
        else
          for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
            const e = t.activeIndex + i;
            if (e > t.slides.length && !r) break;
            s.push(n(e));
          }
      else s.push(n(t.activeIndex));
      for (i = 0; i < s.length; i += 1)
        if (void 0 !== s[i]) {
          const e = s[i].offsetHeight;
          a = e > a ? e : a;
        }
      (a || 0 === a) && (t.wrapperEl.style.height = `${a}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides,
        s = e.isElement
          ? e.isHorizontal()
            ? e.wrapperEl.offsetLeft
            : e.wrapperEl.offsetTop
          : 0;
      for (let r = 0; r < t.length; r += 1)
        t[r].swiperSlideOffset =
          (e.isHorizontal() ? t[r].offsetLeft : t[r].offsetTop) -
          s -
          e.cssOverflowAdjustment();
    },
    updateSlidesProgress: function (e = (this && this.translate) || 0) {
      const t = this,
        s = t.params,
        { slides: r, rtlTranslate: i, snapGrid: a } = t;
      if (0 === r.length) return;
      void 0 === r[0].swiperSlideOffset && t.updateSlidesOffset();
      let n = -e;
      i && (n = e),
        r.forEach((e) => {
          e.classList.remove(s.slideVisibleClass);
        }),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      let l = s.spaceBetween;
      "string" == typeof l && l.indexOf("%") >= 0
        ? (l = (parseFloat(l.replace("%", "")) / 100) * t.size)
        : "string" == typeof l && (l = parseFloat(l));
      for (let e = 0; e < r.length; e += 1) {
        const o = r[e];
        let d = o.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (d -= r[0].swiperSlideOffset);
        const c =
            (n + (s.centeredSlides ? t.minTranslate() : 0) - d) /
            (o.swiperSlideSize + l),
          p =
            (n - a[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) /
            (o.swiperSlideSize + l),
          u = -(n - d),
          f = u + t.slidesSizesGrid[e];
        ((u >= 0 && u < t.size - 1) ||
          (f > 1 && f <= t.size) ||
          (u <= 0 && f >= t.size)) &&
          (t.visibleSlides.push(o),
          t.visibleSlidesIndexes.push(e),
          r[e].classList.add(s.slideVisibleClass)),
          (o.progress = i ? -c : c),
          (o.originalProgress = i ? -p : p);
      }
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const s = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * s) || 0;
      }
      const s = t.params,
        r = t.maxTranslate() - t.minTranslate();
      let { progress: i, isBeginning: a, isEnd: n, progressLoop: l } = t;
      const o = a,
        d = n;
      if (0 === r) (i = 0), (a = !0), (n = !0);
      else {
        i = (e - t.minTranslate()) / r;
        const s = Math.abs(e - t.minTranslate()) < 1,
          l = Math.abs(e - t.maxTranslate()) < 1;
        (a = s || i <= 0), (n = l || i >= 1), s && (i = 0), l && (i = 1);
      }
      if (s.loop) {
        const s = t.getSlideIndexByData(0),
          r = t.getSlideIndexByData(t.slides.length - 1),
          i = t.slidesGrid[s],
          a = t.slidesGrid[r],
          n = t.slidesGrid[t.slidesGrid.length - 1],
          o = Math.abs(e);
        (l = o >= i ? (o - i) / n : (o + n - a) / n), l > 1 && (l -= 1);
      }
      Object.assign(t, {
        progress: i,
        progressLoop: l,
        isBeginning: a,
        isEnd: n,
      }),
        (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
          t.updateSlidesProgress(e),
        a && !o && t.emit("reachBeginning toEdge"),
        n && !d && t.emit("reachEnd toEdge"),
        ((o && !a) || (d && !n)) && t.emit("fromEdge"),
        t.emit("progress", i);
    },
    updateSlidesClasses: function () {
      const e = this,
        { slides: t, params: s, slidesEl: r, activeIndex: i } = e,
        a = e.virtual && s.virtual.enabled,
        n = (e) => f(r, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
      let l;
      if (
        (t.forEach((e) => {
          e.classList.remove(
            s.slideActiveClass,
            s.slideNextClass,
            s.slidePrevClass
          );
        }),
        a)
      )
        if (s.loop) {
          let t = i - e.virtual.slidesBefore;
          t < 0 && (t = e.virtual.slides.length + t),
            t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
            (l = n(`[data-swiper-slide-index="${t}"]`));
        } else l = n(`[data-swiper-slide-index="${i}"]`);
      else l = t[i];
      if (l) {
        l.classList.add(s.slideActiveClass);
        let e = (function (e, t) {
          const s = [];
          for (; e.nextElementSibling; ) {
            const r = e.nextElementSibling;
            t ? r.matches(t) && s.push(r) : s.push(r), (e = r);
          }
          return s;
        })(l, `.${s.slideClass}, swiper-slide`)[0];
        s.loop && !e && (e = t[0]), e && e.classList.add(s.slideNextClass);
        let r = (function (e, t) {
          const s = [];
          for (; e.previousElementSibling; ) {
            const r = e.previousElementSibling;
            t ? r.matches(t) && s.push(r) : s.push(r), (e = r);
          }
          return s;
        })(l, `.${s.slideClass}, swiper-slide`)[0];
        s.loop && 0 === !r && (r = t[t.length - 1]),
          r && r.classList.add(s.slidePrevClass);
      }
      e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        {
          snapGrid: r,
          params: i,
          activeIndex: a,
          realIndex: n,
          snapIndex: l,
        } = t;
      let o,
        d = e;
      const c = (e) => {
        let s = e - t.virtual.slidesBefore;
        return (
          s < 0 && (s = t.virtual.slides.length + s),
          s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
          s
        );
      };
      if (
        (void 0 === d &&
          (d = (function (e) {
            const { slidesGrid: t, params: s } = e,
              r = e.rtlTranslate ? e.translate : -e.translate;
            let i;
            for (let e = 0; e < t.length; e += 1)
              void 0 !== t[e + 1]
                ? r >= t[e] && r < t[e + 1] - (t[e + 1] - t[e]) / 2
                  ? (i = e)
                  : r >= t[e] && r < t[e + 1] && (i = e + 1)
                : r >= t[e] && (i = e);
            return (
              s.normalizeSlideIndex && (i < 0 || void 0 === i) && (i = 0), i
            );
          })(t)),
        r.indexOf(s) >= 0)
      )
        o = r.indexOf(s);
      else {
        const e = Math.min(i.slidesPerGroupSkip, d);
        o = e + Math.floor((d - e) / i.slidesPerGroup);
      }
      if ((o >= r.length && (o = r.length - 1), d === a))
        return (
          o !== l && ((t.snapIndex = o), t.emit("snapIndexChange")),
          void (
            t.params.loop &&
            t.virtual &&
            t.params.virtual.enabled &&
            (t.realIndex = c(d))
          )
        );
      let p;
      (p =
        t.virtual && i.virtual.enabled && i.loop
          ? c(d)
          : t.slides[d]
          ? parseInt(
              t.slides[d].getAttribute("data-swiper-slide-index") || d,
              10
            )
          : d),
        Object.assign(t, {
          previousSnapIndex: l,
          snapIndex: o,
          previousRealIndex: n,
          realIndex: p,
          previousIndex: a,
          activeIndex: d,
        }),
        t.initialized && P(t),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        n !== p && t.emit("realIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
    },
    updateClickedSlide: function (e) {
      const t = this,
        s = t.params,
        r = e.closest(`.${s.slideClass}, swiper-slide`);
      let i,
        a = !1;
      if (r)
        for (let e = 0; e < t.slides.length; e += 1)
          if (t.slides[e] === r) {
            (a = !0), (i = e);
            break;
          }
      if (!r || !a)
        return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
      (t.clickedSlide = r),
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              r.getAttribute("data-swiper-slide-index"),
              10
            ))
          : (t.clickedIndex = i),
        s.slideToClickedSlide &&
          void 0 !== t.clickedIndex &&
          t.clickedIndex !== t.activeIndex &&
          t.slideToClickedSlide();
    },
  };
  const k = {
    getTranslate: function (e = this.isHorizontal() ? "x" : "y") {
      const { params: t, rtlTranslate: s, translate: r, wrapperEl: i } = this;
      if (t.virtualTranslate) return s ? -r : r;
      if (t.cssMode) return r;
      let a = o(i, e);
      return (a += this.cssOverflowAdjustment()), s && (a = -a), a || 0;
    },
    setTranslate: function (e, t) {
      const s = this,
        { rtlTranslate: r, params: i, wrapperEl: a, progress: n } = s;
      let l,
        o = 0,
        d = 0;
      s.isHorizontal() ? (o = r ? -e : e) : (d = e),
        i.roundLengths && ((o = Math.floor(o)), (d = Math.floor(d))),
        (s.previousTranslate = s.translate),
        (s.translate = s.isHorizontal() ? o : d),
        i.cssMode
          ? (a[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
              ? -o
              : -d)
          : i.virtualTranslate ||
            (s.isHorizontal()
              ? (o -= s.cssOverflowAdjustment())
              : (d -= s.cssOverflowAdjustment()),
            (a.style.transform = `translate3d(${o}px, ${d}px, 0px)`));
      const c = s.maxTranslate() - s.minTranslate();
      (l = 0 === c ? 0 : (e - s.minTranslate()) / c),
        l !== n && s.updateProgress(e),
        s.emit("setTranslate", s.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e = 0, t = this.params.speed, s = !0, r = !0, i) {
      const a = this,
        { params: n, wrapperEl: l } = a;
      if (a.animating && n.preventInteractionOnTransition) return !1;
      const o = a.minTranslate(),
        d = a.maxTranslate();
      let c;
      if (
        ((c = r && e > o ? o : r && e < d ? d : e),
        a.updateProgress(c),
        n.cssMode)
      ) {
        const e = a.isHorizontal();
        if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -c;
        else {
          if (!a.support.smoothScroll)
            return (
              u({ swiper: a, targetPosition: -c, side: e ? "left" : "top" }), !0
            );
          l.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (a.setTransition(0),
            a.setTranslate(c),
            s &&
              (a.emit("beforeTransitionStart", t, i), a.emit("transitionEnd")))
          : (a.setTransition(t),
            a.setTranslate(c),
            s &&
              (a.emit("beforeTransitionStart", t, i),
              a.emit("transitionStart")),
            a.animating ||
              ((a.animating = !0),
              a.onTranslateToWrapperTransitionEnd ||
                (a.onTranslateToWrapperTransitionEnd = function (e) {
                  a &&
                    !a.destroyed &&
                    e.target === this &&
                    (a.wrapperEl.removeEventListener(
                      "transitionend",
                      a.onTranslateToWrapperTransitionEnd
                    ),
                    (a.onTranslateToWrapperTransitionEnd = null),
                    delete a.onTranslateToWrapperTransitionEnd,
                    s && a.emit("transitionEnd"));
                }),
              a.wrapperEl.addEventListener(
                "transitionend",
                a.onTranslateToWrapperTransitionEnd
              ))),
        !0
      );
    },
  };
  function z({ swiper: e, runCallbacks: t, direction: s, step: r }) {
    const { activeIndex: i, previousIndex: a } = e;
    let n = s;
    if (
      (n || (n = i > a ? "next" : i < a ? "prev" : "reset"),
      e.emit(`transition${r}`),
      t && i !== a)
    ) {
      if ("reset" === n) return void e.emit(`slideResetTransition${r}`);
      e.emit(`slideChangeTransition${r}`),
        "next" === n
          ? e.emit(`slideNextTransition${r}`)
          : e.emit(`slidePrevTransition${r}`);
    }
  }
  const O = {
    slideTo: function (e = 0, t = this.params.speed, s = !0, r, i) {
      "string" == typeof e && (e = parseInt(e, 10));
      const a = this;
      let n = e;
      n < 0 && (n = 0);
      const {
        params: l,
        snapGrid: o,
        slidesGrid: d,
        previousIndex: c,
        activeIndex: p,
        rtlTranslate: f,
        wrapperEl: m,
        enabled: h,
      } = a;
      if ((a.animating && l.preventInteractionOnTransition) || (!h && !r && !i))
        return !1;
      const v = Math.min(a.params.slidesPerGroupSkip, n);
      let g = v + Math.floor((n - v) / a.params.slidesPerGroup);
      g >= o.length && (g = o.length - 1);
      const w = -o[g];
      if (l.normalizeSlideIndex)
        for (let e = 0; e < d.length; e += 1) {
          const t = -Math.floor(100 * w),
            s = Math.floor(100 * d[e]),
            r = Math.floor(100 * d[e + 1]);
          void 0 !== d[e + 1]
            ? t >= s && t < r - (r - s) / 2
              ? (n = e)
              : t >= s && t < r && (n = e + 1)
            : t >= s && (n = e);
        }
      if (a.initialized && n !== p) {
        if (
          !a.allowSlideNext &&
          (f
            ? w > a.translate && w > a.minTranslate()
            : w < a.translate && w < a.minTranslate())
        )
          return !1;
        if (
          !a.allowSlidePrev &&
          w > a.translate &&
          w > a.maxTranslate() &&
          (p || 0) !== n
        )
          return !1;
      }
      let b;
      if (
        (n !== (c || 0) && s && a.emit("beforeSlideChangeStart"),
        a.updateProgress(w),
        (b = n > p ? "next" : n < p ? "prev" : "reset"),
        (f && -w === a.translate) || (!f && w === a.translate))
      )
        return (
          a.updateActiveIndex(n),
          l.autoHeight && a.updateAutoHeight(),
          a.updateSlidesClasses(),
          "slide" !== l.effect && a.setTranslate(w),
          "reset" !== b && (a.transitionStart(s, b), a.transitionEnd(s, b)),
          !1
        );
      if (l.cssMode) {
        const e = a.isHorizontal(),
          s = f ? w : -w;
        if (0 === t) {
          const t = a.virtual && a.params.virtual.enabled;
          t &&
            ((a.wrapperEl.style.scrollSnapType = "none"),
            (a._immediateVirtual = !0)),
            t && !a._cssModeVirtualInitialSet && a.params.initialSlide > 0
              ? ((a._cssModeVirtualInitialSet = !0),
                requestAnimationFrame(() => {
                  m[e ? "scrollLeft" : "scrollTop"] = s;
                }))
              : (m[e ? "scrollLeft" : "scrollTop"] = s),
            t &&
              requestAnimationFrame(() => {
                (a.wrapperEl.style.scrollSnapType = ""),
                  (a._immediateVirtual = !1);
              });
        } else {
          if (!a.support.smoothScroll)
            return (
              u({ swiper: a, targetPosition: s, side: e ? "left" : "top" }), !0
            );
          m.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
        }
        return !0;
      }
      return (
        a.setTransition(t),
        a.setTranslate(w),
        a.updateActiveIndex(n),
        a.updateSlidesClasses(),
        a.emit("beforeTransitionStart", t, r),
        a.transitionStart(s, b),
        0 === t
          ? a.transitionEnd(s, b)
          : a.animating ||
            ((a.animating = !0),
            a.onSlideToWrapperTransitionEnd ||
              (a.onSlideToWrapperTransitionEnd = function (e) {
                a &&
                  !a.destroyed &&
                  e.target === this &&
                  (a.wrapperEl.removeEventListener(
                    "transitionend",
                    a.onSlideToWrapperTransitionEnd
                  ),
                  (a.onSlideToWrapperTransitionEnd = null),
                  delete a.onSlideToWrapperTransitionEnd,
                  a.transitionEnd(s, b));
              }),
            a.wrapperEl.addEventListener(
              "transitionend",
              a.onSlideToWrapperTransitionEnd
            )),
        !0
      );
    },
    slideToLoop: function (e = 0, t = this.params.speed, s = !0, r) {
      if ("string" == typeof e) {
        e = parseInt(e, 10);
      }
      const i = this;
      let a = e;
      return (
        i.params.loop &&
          (i.virtual && i.params.virtual.enabled
            ? (a += i.virtual.slidesBefore)
            : (a = i.getSlideIndexByData(a))),
        i.slideTo(a, t, s, r)
      );
    },
    slideNext: function (e = this.params.speed, t = !0, s) {
      const r = this,
        { enabled: i, params: a, animating: n } = r;
      if (!i) return r;
      let l = a.slidesPerGroup;
      "auto" === a.slidesPerView &&
        1 === a.slidesPerGroup &&
        a.slidesPerGroupAuto &&
        (l = Math.max(r.slidesPerViewDynamic("current", !0), 1));
      const o = r.activeIndex < a.slidesPerGroupSkip ? 1 : l,
        d = r.virtual && a.virtual.enabled;
      if (a.loop) {
        if (n && !d && a.loopPreventsSliding) return !1;
        r.loopFix({ direction: "next" }),
          (r._clientLeft = r.wrapperEl.clientLeft);
      }
      return a.rewind && r.isEnd
        ? r.slideTo(0, e, t, s)
        : r.slideTo(r.activeIndex + o, e, t, s);
    },
    slidePrev: function (e = this.params.speed, t = !0, s) {
      const r = this,
        {
          params: i,
          snapGrid: a,
          slidesGrid: n,
          rtlTranslate: l,
          enabled: o,
          animating: d,
        } = r;
      if (!o) return r;
      const c = r.virtual && i.virtual.enabled;
      if (i.loop) {
        if (d && !c && i.loopPreventsSliding) return !1;
        r.loopFix({ direction: "prev" }),
          (r._clientLeft = r.wrapperEl.clientLeft);
      }
      function p(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const u = p(l ? r.translate : -r.translate),
        f = a.map((e) => p(e));
      let m = a[f.indexOf(u) - 1];
      if (void 0 === m && i.cssMode) {
        let e;
        a.forEach((t, s) => {
          u >= t && (e = s);
        }),
          void 0 !== e && (m = a[e > 0 ? e - 1 : e]);
      }
      let h = 0;
      if (
        (void 0 !== m &&
          ((h = n.indexOf(m)),
          h < 0 && (h = r.activeIndex - 1),
          "auto" === i.slidesPerView &&
            1 === i.slidesPerGroup &&
            i.slidesPerGroupAuto &&
            ((h = h - r.slidesPerViewDynamic("previous", !0) + 1),
            (h = Math.max(h, 0)))),
        i.rewind && r.isBeginning)
      ) {
        const i =
          r.params.virtual && r.params.virtual.enabled && r.virtual
            ? r.virtual.slides.length - 1
            : r.slides.length - 1;
        return r.slideTo(i, e, t, s);
      }
      return r.slideTo(h, e, t, s);
    },
    slideReset: function (e = this.params.speed, t = !0, s) {
      return this.slideTo(this.activeIndex, e, t, s);
    },
    slideToClosest: function (e = this.params.speed, t = !0, s, r = 0.5) {
      const i = this;
      let a = i.activeIndex;
      const n = Math.min(i.params.slidesPerGroupSkip, a),
        l = n + Math.floor((a - n) / i.params.slidesPerGroup),
        o = i.rtlTranslate ? i.translate : -i.translate;
      if (o >= i.snapGrid[l]) {
        const e = i.snapGrid[l];
        o - e > (i.snapGrid[l + 1] - e) * r && (a += i.params.slidesPerGroup);
      } else {
        const e = i.snapGrid[l - 1];
        o - e <= (i.snapGrid[l] - e) * r && (a -= i.params.slidesPerGroup);
      }
      return (
        (a = Math.max(a, 0)),
        (a = Math.min(a, i.slidesGrid.length - 1)),
        i.slideTo(a, e, t, s)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, slidesEl: s } = e,
        r =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let i,
        a = e.clickedIndex;
      const l = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
      if (t.loop) {
        if (e.animating) return;
        (i = parseInt(
          e.clickedSlide.getAttribute("data-swiper-slide-index"),
          10
        )),
          t.centeredSlides
            ? a < e.loopedSlides - r / 2 ||
              a > e.slides.length - e.loopedSlides + r / 2
              ? (e.loopFix(),
                (a = e.getSlideIndex(
                  f(s, `${l}[data-swiper-slide-index="${i}"]`)[0]
                )),
                n(() => {
                  e.slideTo(a);
                }))
              : e.slideTo(a)
            : a > e.slides.length - r
            ? (e.loopFix(),
              (a = e.getSlideIndex(
                f(s, `${l}[data-swiper-slide-index="${i}"]`)[0]
              )),
              n(() => {
                e.slideTo(a);
              }))
            : e.slideTo(a);
      } else e.slideTo(a);
    },
  };
  const I = {
    loopCreate: function (e) {
      const t = this,
        { params: s, slidesEl: r } = t;
      if (!s.loop || (t.virtual && t.params.virtual.enabled)) return;
      f(r, `.${s.slideClass}, swiper-slide`).forEach((e, t) => {
        e.setAttribute("data-swiper-slide-index", t);
      }),
        t.loopFix({
          slideRealIndex: e,
          direction: s.centeredSlides ? void 0 : "next",
        });
    },
    loopFix: function ({
      slideRealIndex: e,
      slideTo: t = !0,
      direction: s,
      setTranslate: r,
      activeSlideIndex: i,
      byController: a,
      byMousewheel: n,
    } = {}) {
      const l = this;
      if (!l.params.loop) return;
      l.emit("beforeLoopFix");
      const {
        slides: o,
        allowSlidePrev: d,
        allowSlideNext: c,
        slidesEl: p,
        params: u,
      } = l;
      if (
        ((l.allowSlidePrev = !0),
        (l.allowSlideNext = !0),
        l.virtual && u.virtual.enabled)
      )
        return (
          t &&
            (u.centeredSlides || 0 !== l.snapIndex
              ? u.centeredSlides && l.snapIndex < u.slidesPerView
                ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0)
                : l.snapIndex === l.snapGrid.length - 1 &&
                  l.slideTo(l.virtual.slidesBefore, 0, !1, !0)
              : l.slideTo(l.virtual.slides.length, 0, !1, !0)),
          (l.allowSlidePrev = d),
          (l.allowSlideNext = c),
          void l.emit("loopFix")
        );
      const f =
        "auto" === u.slidesPerView
          ? l.slidesPerViewDynamic()
          : Math.ceil(parseFloat(u.slidesPerView, 10));
      let m = u.loopedSlides || f;
      m % u.slidesPerGroup != 0 &&
        (m += u.slidesPerGroup - (m % u.slidesPerGroup)),
        (l.loopedSlides = m);
      const h = [],
        v = [];
      let g = l.activeIndex;
      void 0 === i
        ? (i = l.getSlideIndex(
            l.slides.filter((e) => e.classList.contains(u.slideActiveClass))[0]
          ))
        : (g = i);
      const w = "next" === s || !s,
        b = "prev" === s || !s;
      let S = 0,
        T = 0;
      if (i < m) {
        S = Math.max(m - i, u.slidesPerGroup);
        for (let e = 0; e < m - i; e += 1) {
          const t = e - Math.floor(e / o.length) * o.length;
          h.push(o.length - t - 1);
        }
      } else if (i > l.slides.length - 2 * m) {
        T = Math.max(i - (l.slides.length - 2 * m), u.slidesPerGroup);
        for (let e = 0; e < T; e += 1) {
          const t = e - Math.floor(e / o.length) * o.length;
          v.push(t);
        }
      }
      if (
        (b &&
          h.forEach((e) => {
            (l.slides[e].swiperLoopMoveDOM = !0),
              p.prepend(l.slides[e]),
              (l.slides[e].swiperLoopMoveDOM = !1);
          }),
        w &&
          v.forEach((e) => {
            (l.slides[e].swiperLoopMoveDOM = !0),
              p.append(l.slides[e]),
              (l.slides[e].swiperLoopMoveDOM = !1);
          }),
        l.recalcSlides(),
        "auto" === u.slidesPerView && l.updateSlides(),
        u.watchSlidesProgress && l.updateSlidesOffset(),
        t)
      )
        if (h.length > 0 && b)
          if (void 0 === e) {
            const e = l.slidesGrid[g],
              t = l.slidesGrid[g + S] - e;
            n
              ? l.setTranslate(l.translate - t)
              : (l.slideTo(g + S, 0, !1, !0),
                r && (l.touches[l.isHorizontal() ? "startX" : "startY"] += t));
          } else r && l.slideToLoop(e, 0, !1, !0);
        else if (v.length > 0 && w)
          if (void 0 === e) {
            const e = l.slidesGrid[g],
              t = l.slidesGrid[g - T] - e;
            n
              ? l.setTranslate(l.translate - t)
              : (l.slideTo(g - T, 0, !1, !0),
                r && (l.touches[l.isHorizontal() ? "startX" : "startY"] += t));
          } else l.slideToLoop(e, 0, !1, !0);
      if (
        ((l.allowSlidePrev = d),
        (l.allowSlideNext = c),
        l.controller && l.controller.control && !a)
      ) {
        const t = {
          slideRealIndex: e,
          slideTo: !1,
          direction: s,
          setTranslate: r,
          activeSlideIndex: i,
          byController: !0,
        };
        Array.isArray(l.controller.control)
          ? l.controller.control.forEach((e) => {
              !e.destroyed && e.params.loop && e.loopFix(t);
            })
          : l.controller.control instanceof l.constructor &&
            l.controller.control.params.loop &&
            l.controller.control.loopFix(t);
      }
      l.emit("loopFix");
    },
    loopDestroy: function () {
      const e = this,
        { params: t, slidesEl: s } = e;
      if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
      e.recalcSlides();
      const r = [];
      e.slides.forEach((e) => {
        const t =
          void 0 === e.swiperSlideIndex
            ? 1 * e.getAttribute("data-swiper-slide-index")
            : e.swiperSlideIndex;
        r[t] = e;
      }),
        e.slides.forEach((e) => {
          e.removeAttribute("data-swiper-slide-index");
        }),
        r.forEach((e) => {
          s.append(e);
        }),
        e.recalcSlides(),
        e.slideTo(e.realIndex, 0);
    },
  };
  function A(e) {
    const t = this,
      s = r(),
      i = a(),
      n = t.touchEventsData;
    n.evCache.push(e);
    const { params: o, touches: d, enabled: c } = t;
    if (!c) return;
    if (!o.simulateTouch && "mouse" === e.pointerType) return;
    if (t.animating && o.preventInteractionOnTransition) return;
    !t.animating && o.cssMode && o.loop && t.loopFix();
    let p = e;
    p.originalEvent && (p = p.originalEvent);
    let u = p.target;
    if ("wrapper" === o.touchEventsTarget && !t.wrapperEl.contains(u)) return;
    if ("which" in p && 3 === p.which) return;
    if ("button" in p && p.button > 0) return;
    if (n.isTouched && n.isMoved) return;
    const f = !!o.noSwipingClass && "" !== o.noSwipingClass,
      m = e.composedPath ? e.composedPath() : e.path;
    f && p.target && p.target.shadowRoot && m && (u = m[0]);
    const h = o.noSwipingSelector
        ? o.noSwipingSelector
        : `.${o.noSwipingClass}`,
      v = !(!p.target || !p.target.shadowRoot);
    if (
      o.noSwiping &&
      (v
        ? (function (e, t = this) {
            return (function t(s) {
              if (!s || s === r() || s === a()) return null;
              s.assignedSlot && (s = s.assignedSlot);
              const i = s.closest(e);
              return i || s.getRootNode ? i || t(s.getRootNode().host) : null;
            })(t);
          })(h, u)
        : u.closest(h))
    )
      return void (t.allowClick = !0);
    if (o.swipeHandler && !u.closest(o.swipeHandler)) return;
    (d.currentX = p.pageX), (d.currentY = p.pageY);
    const g = d.currentX,
      w = d.currentY,
      b = o.edgeSwipeDetection || o.iOSEdgeSwipeDetection,
      S = o.edgeSwipeThreshold || o.iOSEdgeSwipeThreshold;
    if (b && (g <= S || g >= i.innerWidth - S)) {
      if ("prevent" !== b) return;
      e.preventDefault();
    }
    Object.assign(n, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0,
    }),
      (d.startX = g),
      (d.startY = w),
      (n.touchStartTime = l()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      o.threshold > 0 && (n.allowThresholdMove = !1);
    let T = !0;
    u.matches(n.focusableElements) &&
      ((T = !1), "SELECT" === u.nodeName && (n.isTouched = !1)),
      s.activeElement &&
        s.activeElement.matches(n.focusableElements) &&
        s.activeElement !== u &&
        s.activeElement.blur();
    const y = T && t.allowTouchMove && o.touchStartPreventDefault;
    (!o.touchStartForcePreventDefault && !y) ||
      u.isContentEditable ||
      p.preventDefault(),
      o.freeMode &&
        o.freeMode.enabled &&
        t.freeMode &&
        t.animating &&
        !o.cssMode &&
        t.freeMode.onTouchStart(),
      t.emit("touchStart", p);
  }
  function G(e) {
    const t = r(),
      s = this,
      i = s.touchEventsData,
      { params: a, touches: n, rtlTranslate: o, enabled: d } = s;
    if (!d) return;
    if (!a.simulateTouch && "mouse" === e.pointerType) return;
    let c = e;
    if ((c.originalEvent && (c = c.originalEvent), !i.isTouched))
      return void (
        i.startMoving &&
        i.isScrolling &&
        s.emit("touchMoveOpposite", c)
      );
    const p = i.evCache.findIndex((e) => e.pointerId === c.pointerId);
    p >= 0 && (i.evCache[p] = c);
    const u = i.evCache.length > 1 ? i.evCache[0] : c,
      f = u.pageX,
      m = u.pageY;
    if (c.preventedByNestedSwiper) return (n.startX = f), void (n.startY = m);
    if (!s.allowTouchMove)
      return (
        c.target.matches(i.focusableElements) || (s.allowClick = !1),
        void (
          i.isTouched &&
          (Object.assign(n, {
            startX: f,
            startY: m,
            prevX: s.touches.currentX,
            prevY: s.touches.currentY,
            currentX: f,
            currentY: m,
          }),
          (i.touchStartTime = l()))
        )
      );
    if (a.touchReleaseOnEdges && !a.loop)
      if (s.isVertical()) {
        if (
          (m < n.startY && s.translate <= s.maxTranslate()) ||
          (m > n.startY && s.translate >= s.minTranslate())
        )
          return (i.isTouched = !1), void (i.isMoved = !1);
      } else if (
        (f < n.startX && s.translate <= s.maxTranslate()) ||
        (f > n.startX && s.translate >= s.minTranslate())
      )
        return;
    if (
      t.activeElement &&
      c.target === t.activeElement &&
      c.target.matches(i.focusableElements)
    )
      return (i.isMoved = !0), void (s.allowClick = !1);
    if (
      (i.allowTouchCallbacks && s.emit("touchMove", c),
      c.targetTouches && c.targetTouches.length > 1)
    )
      return;
    (n.currentX = f), (n.currentY = m);
    const h = n.currentX - n.startX,
      v = n.currentY - n.startY;
    if (s.params.threshold && Math.sqrt(h ** 2 + v ** 2) < s.params.threshold)
      return;
    if (void 0 === i.isScrolling) {
      let e;
      (s.isHorizontal() && n.currentY === n.startY) ||
      (s.isVertical() && n.currentX === n.startX)
        ? (i.isScrolling = !1)
        : h * h + v * v >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(v), Math.abs(h))) / Math.PI),
          (i.isScrolling = s.isHorizontal()
            ? e > a.touchAngle
            : 90 - e > a.touchAngle));
    }
    if (
      (i.isScrolling && s.emit("touchMoveOpposite", c),
      void 0 === i.startMoving &&
        ((n.currentX === n.startX && n.currentY === n.startY) ||
          (i.startMoving = !0)),
      i.isScrolling ||
        (s.zoom &&
          s.params.zoom &&
          s.params.zoom.enabled &&
          i.evCache.length > 1))
    )
      return void (i.isTouched = !1);
    if (!i.startMoving) return;
    (s.allowClick = !1),
      !a.cssMode && c.cancelable && c.preventDefault(),
      a.touchMoveStopPropagation && !a.nested && c.stopPropagation();
    let g = s.isHorizontal() ? h : v,
      w = s.isHorizontal()
        ? n.currentX - n.previousX
        : n.currentY - n.previousY;
    a.oneWayMovement &&
      ((g = Math.abs(g) * (o ? 1 : -1)), (w = Math.abs(w) * (o ? 1 : -1))),
      (n.diff = g),
      (g *= a.touchRatio),
      o && ((g = -g), (w = -w));
    const b = s.touchesDirection;
    (s.swipeDirection = g > 0 ? "prev" : "next"),
      (s.touchesDirection = w > 0 ? "prev" : "next");
    const S = s.params.loop && !a.cssMode;
    if (!i.isMoved) {
      if (
        (S && s.loopFix({ direction: s.swipeDirection }),
        (i.startTranslate = s.getTranslate()),
        s.setTransition(0),
        s.animating)
      ) {
        const e = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0,
        });
        s.wrapperEl.dispatchEvent(e);
      }
      (i.allowMomentumBounce = !1),
        !a.grabCursor ||
          (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
          s.setGrabCursor(!0),
        s.emit("sliderFirstMove", c);
    }
    let T;
    i.isMoved &&
      b !== s.touchesDirection &&
      S &&
      Math.abs(g) >= 1 &&
      (s.loopFix({ direction: s.swipeDirection, setTranslate: !0 }), (T = !0)),
      s.emit("sliderMove", c),
      (i.isMoved = !0),
      (i.currentTranslate = g + i.startTranslate);
    let y = !0,
      x = a.resistanceRatio;
    if (
      (a.touchReleaseOnEdges && (x = 0),
      g > 0
        ? (S &&
            !T &&
            i.currentTranslate >
              (a.centeredSlides
                ? s.minTranslate() - s.size / 2
                : s.minTranslate()) &&
            s.loopFix({
              direction: "prev",
              setTranslate: !0,
              activeSlideIndex: 0,
            }),
          i.currentTranslate > s.minTranslate() &&
            ((y = !1),
            a.resistance &&
              (i.currentTranslate =
                s.minTranslate() -
                1 +
                (-s.minTranslate() + i.startTranslate + g) ** x)))
        : g < 0 &&
          (S &&
            !T &&
            i.currentTranslate <
              (a.centeredSlides
                ? s.maxTranslate() + s.size / 2
                : s.maxTranslate()) &&
            s.loopFix({
              direction: "next",
              setTranslate: !0,
              activeSlideIndex:
                s.slides.length -
                ("auto" === a.slidesPerView
                  ? s.slidesPerViewDynamic()
                  : Math.ceil(parseFloat(a.slidesPerView, 10))),
            }),
          i.currentTranslate < s.maxTranslate() &&
            ((y = !1),
            a.resistance &&
              (i.currentTranslate =
                s.maxTranslate() +
                1 -
                (s.maxTranslate() - i.startTranslate - g) ** x))),
      y && (c.preventedByNestedSwiper = !0),
      !s.allowSlideNext &&
        "next" === s.swipeDirection &&
        i.currentTranslate < i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      !s.allowSlidePrev &&
        "prev" === s.swipeDirection &&
        i.currentTranslate > i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      s.allowSlidePrev ||
        s.allowSlideNext ||
        (i.currentTranslate = i.startTranslate),
      a.threshold > 0)
    ) {
      if (!(Math.abs(g) > a.threshold || i.allowThresholdMove))
        return void (i.currentTranslate = i.startTranslate);
      if (!i.allowThresholdMove)
        return (
          (i.allowThresholdMove = !0),
          (n.startX = n.currentX),
          (n.startY = n.currentY),
          (i.currentTranslate = i.startTranslate),
          void (n.diff = s.isHorizontal()
            ? n.currentX - n.startX
            : n.currentY - n.startY)
        );
    }
    a.followFinger &&
      !a.cssMode &&
      (((a.freeMode && a.freeMode.enabled && s.freeMode) ||
        a.watchSlidesProgress) &&
        (s.updateActiveIndex(),
        s.updateSlidesClasses(),
        s.freeMode.onTouchMove()),
      s.updateProgress(i.currentTranslate),
      s.setTranslate(i.currentTranslate));
  }
  function D(e) {
    const t = this,
      s = t.touchEventsData,
      r = s.evCache.findIndex((t) => t.pointerId === e.pointerId);
    if (
      (r >= 0 && s.evCache.splice(r, 1),
      ["pointercancel", "pointerout", "pointerleave"].includes(e.type))
    ) {
      if (
        !(
          "pointercancel" === e.type &&
          (t.browser.isSafari || t.browser.isWebView)
        )
      )
        return;
    }
    const {
      params: i,
      touches: a,
      rtlTranslate: o,
      slidesGrid: d,
      enabled: c,
    } = t;
    if (!c) return;
    if (!i.simulateTouch && "mouse" === e.pointerType) return;
    let p = e;
    if (
      (p.originalEvent && (p = p.originalEvent),
      s.allowTouchCallbacks && t.emit("touchEnd", p),
      (s.allowTouchCallbacks = !1),
      !s.isTouched)
    )
      return (
        s.isMoved && i.grabCursor && t.setGrabCursor(!1),
        (s.isMoved = !1),
        void (s.startMoving = !1)
      );
    i.grabCursor &&
      s.isMoved &&
      s.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const u = l(),
      f = u - s.touchStartTime;
    if (t.allowClick) {
      const e = p.path || (p.composedPath && p.composedPath());
      t.updateClickedSlide((e && e[0]) || p.target),
        t.emit("tap click", p),
        f < 300 &&
          u - s.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", p);
    }
    if (
      ((s.lastClickTime = l()),
      n(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !s.isTouched ||
        !s.isMoved ||
        !t.swipeDirection ||
        0 === a.diff ||
        s.currentTranslate === s.startTranslate)
    )
      return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
    let m;
    if (
      ((s.isTouched = !1),
      (s.isMoved = !1),
      (s.startMoving = !1),
      (m = i.followFinger
        ? o
          ? t.translate
          : -t.translate
        : -s.currentTranslate),
      i.cssMode)
    )
      return;
    if (i.freeMode && i.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: m });
    let h = 0,
      v = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < d.length;
      e += e < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup
    ) {
      const t = e < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
      void 0 !== d[e + t]
        ? m >= d[e] && m < d[e + t] && ((h = e), (v = d[e + t] - d[e]))
        : m >= d[e] && ((h = e), (v = d[d.length - 1] - d[d.length - 2]));
    }
    let g = null,
      w = null;
    i.rewind &&
      (t.isBeginning
        ? (w =
            i.virtual && i.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (g = 0));
    const b = (m - d[h]) / v,
      S = h < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
    if (f > i.longSwipesMs) {
      if (!i.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (b >= i.longSwipesRatio
          ? t.slideTo(i.rewind && t.isEnd ? g : h + S)
          : t.slideTo(h)),
        "prev" === t.swipeDirection &&
          (b > 1 - i.longSwipesRatio
            ? t.slideTo(h + S)
            : null !== w && b < 0 && Math.abs(b) > i.longSwipesRatio
            ? t.slideTo(w)
            : t.slideTo(h));
    } else {
      if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (p.target === t.navigation.nextEl || p.target === t.navigation.prevEl)
        ? p.target === t.navigation.nextEl
          ? t.slideTo(h + S)
          : t.slideTo(h)
        : ("next" === t.swipeDirection && t.slideTo(null !== g ? g : h + S),
          "prev" === t.swipeDirection && t.slideTo(null !== w ? w : h));
    }
  }
  function _() {
    const e = this,
      { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: r, allowSlidePrev: i, snapGrid: a } = e,
      n = e.virtual && e.params.virtual.enabled;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses();
    const l = n && t.loop;
    !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
    !e.isEnd ||
    e.isBeginning ||
    e.params.centeredSlides ||
    l
      ? e.params.loop && !n
        ? e.slideToLoop(e.realIndex, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0)
      : e.slideTo(e.slides.length - 1, 0, !1, !0),
      e.autoplay &&
        e.autoplay.running &&
        e.autoplay.paused &&
        (clearTimeout(e.autoplay.resizeTimeout),
        (e.autoplay.resizeTimeout = setTimeout(() => {
          e.autoplay &&
            e.autoplay.running &&
            e.autoplay.paused &&
            e.autoplay.resume();
        }, 500))),
      (e.allowSlidePrev = i),
      (e.allowSlideNext = r),
      e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow();
  }
  function V(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function B() {
    const e = this,
      { wrapperEl: t, rtlTranslate: s, enabled: r } = e;
    if (!r) return;
    let i;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const a = e.maxTranslate() - e.minTranslate();
    (i = 0 === a ? 0 : (e.translate - e.minTranslate()) / a),
      i !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  function H(e) {
    const t = this;
    C(t, e.target),
      t.params.cssMode ||
        ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
        t.update();
  }
  let $ = !1;
  function F() {}
  const N = (e, t) => {
    const s = r(),
      { params: i, el: a, wrapperEl: n, device: l } = e,
      o = !!i.nested,
      d = "on" === t ? "addEventListener" : "removeEventListener",
      c = t;
    a[d]("pointerdown", e.onTouchStart, { passive: !1 }),
      s[d]("pointermove", e.onTouchMove, { passive: !1, capture: o }),
      s[d]("pointerup", e.onTouchEnd, { passive: !0 }),
      s[d]("pointercancel", e.onTouchEnd, { passive: !0 }),
      s[d]("pointerout", e.onTouchEnd, { passive: !0 }),
      s[d]("pointerleave", e.onTouchEnd, { passive: !0 }),
      (i.preventClicks || i.preventClicksPropagation) &&
        a[d]("click", e.onClick, !0),
      i.cssMode && n[d]("scroll", e.onScroll),
      i.updateOnWindowResize
        ? e[c](
            l.ios || l.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            _,
            !0
          )
        : e[c]("observerUpdate", _, !0),
      a[d]("load", e.onLoad, { capture: !0 });
  };
  const j = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  const R = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopedSlides: null,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function W(e, t) {
    return function (s = {}) {
      const r = Object.keys(s)[0],
        i = s[r];
      "object" == typeof i && null !== i
        ? (["navigation", "pagination", "scrollbar"].indexOf(r) >= 0 &&
            !0 === e[r] &&
            (e[r] = { auto: !0 }),
          r in e && "enabled" in i
            ? (!0 === e[r] && (e[r] = { enabled: !0 }),
              "object" != typeof e[r] ||
                "enabled" in e[r] ||
                (e[r].enabled = !0),
              e[r] || (e[r] = { enabled: !1 }),
              c(t, s))
            : c(t, s))
        : c(t, s);
    };
  }
  const q = {
      eventsEmitter: E,
      update: L,
      translate: k,
      transition: {
        setTransition: function (e, t) {
          const s = this;
          s.params.cssMode || (s.wrapperEl.style.transitionDuration = `${e}ms`),
            s.emit("setTransition", e, t);
        },
        transitionStart: function (e = !0, t) {
          const s = this,
            { params: r } = s;
          r.cssMode ||
            (r.autoHeight && s.updateAutoHeight(),
            z({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e = !0, t) {
          const s = this,
            { params: r } = s;
          (s.animating = !1),
            r.cssMode ||
              (s.setTransition(0),
              z({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: O,
      loop: I,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const s =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          t.isElement && (t.__preventObserver__ = !0),
            (s.style.cursor = "move"),
            (s.style.cursor = e ? "grabbing" : "grab"),
            t.isElement &&
              requestAnimationFrame(() => {
                t.__preventObserver__ = !1;
              });
        },
        unsetGrabCursor: function () {
          const e = this;
          (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e.isElement && (e.__preventObserver__ = !0),
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = ""),
            e.isElement &&
              requestAnimationFrame(() => {
                e.__preventObserver__ = !1;
              }));
        },
      },
      events: {
        attachEvents: function () {
          const e = this,
            t = r(),
            { params: s } = e;
          (e.onTouchStart = A.bind(e)),
            (e.onTouchMove = G.bind(e)),
            (e.onTouchEnd = D.bind(e)),
            s.cssMode && (e.onScroll = B.bind(e)),
            (e.onClick = V.bind(e)),
            (e.onLoad = H.bind(e)),
            $ || (t.addEventListener("touchstart", F), ($ = !0)),
            N(e, "on");
        },
        detachEvents: function () {
          N(this, "off");
        },
      },
      breakpoints: {
        setBreakpoint: function () {
          const e = this,
            { realIndex: t, initialized: s, params: r, el: i } = e,
            a = r.breakpoints;
          if (!a || (a && 0 === Object.keys(a).length)) return;
          const n = e.getBreakpoint(a, e.params.breakpointsBase, e.el);
          if (!n || e.currentBreakpoint === n) return;
          const l = (n in a ? a[n] : void 0) || e.originalParams,
            o = j(e, r),
            d = j(e, l),
            p = r.enabled;
          o && !d
            ? (i.classList.remove(
                `${r.containerModifierClass}grid`,
                `${r.containerModifierClass}grid-column`
              ),
              e.emitContainerClasses())
            : !o &&
              d &&
              (i.classList.add(`${r.containerModifierClass}grid`),
              ((l.grid.fill && "column" === l.grid.fill) ||
                (!l.grid.fill && "column" === r.grid.fill)) &&
                i.classList.add(`${r.containerModifierClass}grid-column`),
              e.emitContainerClasses()),
            ["navigation", "pagination", "scrollbar"].forEach((t) => {
              if (void 0 === l[t]) return;
              const s = r[t] && r[t].enabled,
                i = l[t] && l[t].enabled;
              s && !i && e[t].disable(), !s && i && e[t].enable();
            });
          const u = l.direction && l.direction !== r.direction,
            f = r.loop && (l.slidesPerView !== r.slidesPerView || u);
          u && s && e.changeDirection(), c(e.params, l);
          const m = e.params.enabled;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev,
          }),
            p && !m ? e.disable() : !p && m && e.enable(),
            (e.currentBreakpoint = n),
            e.emit("_beforeBreakpoint", l),
            f && s && (e.loopDestroy(), e.loopCreate(t), e.updateSlides()),
            e.emit("breakpoint", l);
        },
        getBreakpoint: function (e, t = "window", s) {
          if (!e || ("container" === t && !s)) return;
          let r = !1;
          const i = a(),
            n = "window" === t ? i.innerHeight : s.clientHeight,
            l = Object.keys(e).map((e) => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                const t = parseFloat(e.substr(1));
                return { value: n * t, point: e };
              }
              return { value: e, point: e };
            });
          l.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
          for (let e = 0; e < l.length; e += 1) {
            const { point: a, value: n } = l[e];
            "window" === t
              ? i.matchMedia(`(min-width: ${n}px)`).matches && (r = a)
              : n <= s.clientWidth && (r = a);
          }
          return r || "max";
        },
      },
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: s } = e,
            { slidesOffsetBefore: r } = s;
          if (r) {
            const t = e.slides.length - 1,
              s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * r;
            e.isLocked = e.size > s;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: {
        addClasses: function () {
          const e = this,
            { classNames: t, params: s, rtl: r, el: i, device: a } = e,
            n = (function (e, t) {
              const s = [];
              return (
                e.forEach((e) => {
                  "object" == typeof e
                    ? Object.keys(e).forEach((r) => {
                        e[r] && s.push(t + r);
                      })
                    : "string" == typeof e && s.push(t + e);
                }),
                s
              );
            })(
              [
                "initialized",
                s.direction,
                { "free-mode": e.params.freeMode && s.freeMode.enabled },
                { autoheight: s.autoHeight },
                { rtl: r },
                { grid: s.grid && s.grid.rows > 1 },
                {
                  "grid-column":
                    s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                },
                { android: a.android },
                { ios: a.ios },
                { "css-mode": s.cssMode },
                { centered: s.cssMode && s.centeredSlides },
                { "watch-progress": s.watchSlidesProgress },
              ],
              s.containerModifierClass
            );
          t.push(...n), i.classList.add(...t), e.emitContainerClasses();
        },
        removeClasses: function () {
          const { el: e, classNames: t } = this;
          e.classList.remove(...t), this.emitContainerClasses();
        },
      },
    },
    X = {};
  class Y {
    constructor(...e) {
      let t, s;
      1 === e.length &&
      e[0].constructor &&
      "Object" === Object.prototype.toString.call(e[0]).slice(8, -1)
        ? (s = e[0])
        : ([t, s] = e),
        s || (s = {}),
        (s = c({}, s)),
        t && !s.el && (s.el = t);
      const i = r();
      if (
        s.el &&
        "string" == typeof s.el &&
        i.querySelectorAll(s.el).length > 1
      ) {
        const e = [];
        return (
          i.querySelectorAll(s.el).forEach((t) => {
            const r = c({}, s, { el: t });
            e.push(new Y(r));
          }),
          e
        );
      }
      const a = this;
      (a.__swiper__ = !0),
        (a.support = T()),
        (a.device = y({ userAgent: s.userAgent })),
        (a.browser = x()),
        (a.eventsListeners = {}),
        (a.eventsAnyListeners = []),
        (a.modules = [...a.__modules__]),
        s.modules && Array.isArray(s.modules) && a.modules.push(...s.modules);
      const n = {};
      a.modules.forEach((e) => {
        e({
          params: s,
          swiper: a,
          extendParams: W(s, n),
          on: a.on.bind(a),
          once: a.once.bind(a),
          off: a.off.bind(a),
          emit: a.emit.bind(a),
        });
      });
      const l = c({}, R, n);
      return (
        (a.params = c({}, l, X, s)),
        (a.originalParams = c({}, a.params)),
        (a.passedParams = c({}, s)),
        a.params &&
          a.params.on &&
          Object.keys(a.params.on).forEach((e) => {
            a.on(e, a.params.on[e]);
          }),
        a.params && a.params.onAny && a.onAny(a.params.onAny),
        Object.assign(a, {
          enabled: a.params.enabled,
          el: t,
          classNames: [],
          slides: [],
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === a.params.direction,
          isVertical: () => "vertical" === a.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          cssOverflowAdjustment() {
            return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
          },
          allowSlideNext: a.params.allowSlideNext,
          allowSlidePrev: a.params.allowSlidePrev,
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: a.params.focusableElements,
            lastClickTime: 0,
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            startMoving: void 0,
            evCache: [],
          },
          allowClick: !0,
          allowTouchMove: a.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        a.emit("_swiper"),
        a.params.init && a.init(),
        a
      );
    }
    getSlideIndex(e) {
      const { slidesEl: t, params: s } = this,
        r = v(f(t, `.${s.slideClass}, swiper-slide`)[0]);
      return v(e) - r;
    }
    getSlideIndexByData(e) {
      return this.getSlideIndex(
        this.slides.filter(
          (t) => 1 * t.getAttribute("data-swiper-slide-index") === e
        )[0]
      );
    }
    recalcSlides() {
      const { slidesEl: e, params: t } = this;
      this.slides = f(e, `.${t.slideClass}, swiper-slide`);
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const s = this;
      e = Math.min(Math.max(e, 0), 1);
      const r = s.minTranslate(),
        i = (s.maxTranslate() - r) * e + r;
      s.translateTo(i, void 0 === t ? 0 : t),
        s.updateActiveIndex(),
        s.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass)
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return t.destroyed
        ? ""
        : e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass)
            )
            .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.forEach((s) => {
        const r = e.getSlideClasses(s);
        t.push({ slideEl: s, classNames: r }), e.emit("_slideClass", s, r);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e = "current", t = !1) {
      const {
        params: s,
        slides: r,
        slidesGrid: i,
        slidesSizesGrid: a,
        size: n,
        activeIndex: l,
      } = this;
      let o = 1;
      if (s.centeredSlides) {
        let e,
          t = r[l] ? r[l].swiperSlideSize : 0;
        for (let s = l + 1; s < r.length; s += 1)
          r[s] &&
            !e &&
            ((t += r[s].swiperSlideSize), (o += 1), t > n && (e = !0));
        for (let s = l - 1; s >= 0; s -= 1)
          r[s] &&
            !e &&
            ((t += r[s].swiperSlideSize), (o += 1), t > n && (e = !0));
      } else if ("current" === e)
        for (let e = l + 1; e < r.length; e += 1) {
          (t ? i[e] + a[e] - i[l] < n : i[e] - i[l] < n) && (o += 1);
        }
      else
        for (let e = l - 1; e >= 0; e -= 1) {
          i[l] - i[e] < n && (o += 1);
        }
      return o;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: s } = e;
      function r() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let i;
      if (
        (s.breakpoints && e.setBreakpoint(),
        [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
          t.complete && C(e, t);
        }),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        s.freeMode && s.freeMode.enabled && !s.cssMode)
      )
        r(), s.autoHeight && e.updateAutoHeight();
      else {
        if (
          ("auto" === s.slidesPerView || s.slidesPerView > 1) &&
          e.isEnd &&
          !s.centeredSlides
        ) {
          const t =
            e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
          i = e.slideTo(t.length - 1, 0, !1, !0);
        } else i = e.slideTo(e.activeIndex, 0, !1, !0);
        i || r();
      }
      s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t = !0) {
      const s = this,
        r = s.params.direction;
      return (
        e || (e = "horizontal" === r ? "vertical" : "horizontal"),
        e === r ||
          ("horizontal" !== e && "vertical" !== e) ||
          (s.el.classList.remove(`${s.params.containerModifierClass}${r}`),
          s.el.classList.add(`${s.params.containerModifierClass}${e}`),
          s.emitContainerClasses(),
          (s.params.direction = e),
          s.slides.forEach((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          s.emit("changeDirection"),
          t && s.update()),
        s
      );
    }
    changeLanguageDirection(e) {
      const t = this;
      (t.rtl && "rtl" === e) ||
        (!t.rtl && "ltr" === e) ||
        ((t.rtl = "rtl" === e),
        (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
        t.rtl
          ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "rtl"))
          : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "ltr")),
        t.update());
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      let s = e || t.params.el;
      if (("string" == typeof s && (s = document.querySelector(s)), !s))
        return !1;
      (s.swiper = t), s.shadowEl && (t.isElement = !0);
      const r = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let i = (() => {
        if (s && s.shadowRoot && s.shadowRoot.querySelector) {
          return s.shadowRoot.querySelector(r());
        }
        return f(s, r())[0];
      })();
      return (
        !i &&
          t.params.createElements &&
          ((i = m("div", t.params.wrapperClass)),
          s.append(i),
          f(s, `.${t.params.slideClass}`).forEach((e) => {
            i.append(e);
          })),
        Object.assign(t, {
          el: s,
          wrapperEl: i,
          slidesEl: t.isElement ? s : i,
          mounted: !0,
          rtl: "rtl" === s.dir.toLowerCase() || "rtl" === h(s, "direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === s.dir.toLowerCase() || "rtl" === h(s, "direction")),
          wrongRTL: "-webkit-box" === h(i, "display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      return (
        !1 === t.mount(e) ||
          (t.emit("beforeInit"),
          t.params.breakpoints && t.setBreakpoint(),
          t.addClasses(),
          t.updateSize(),
          t.updateSlides(),
          t.params.watchOverflow && t.checkOverflow(),
          t.params.grabCursor && t.enabled && t.setGrabCursor(),
          t.params.loop && t.virtual && t.params.virtual.enabled
            ? t.slideTo(
                t.params.initialSlide + t.virtual.slidesBefore,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              )
            : t.slideTo(
                t.params.initialSlide,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              ),
          t.params.loop && t.loopCreate(),
          t.attachEvents(),
          [...t.el.querySelectorAll('[loading="lazy"]')].forEach((e) => {
            e.complete
              ? C(t, e)
              : e.addEventListener("load", (e) => {
                  C(t, e.target);
                });
          }),
          P(t),
          (t.initialized = !0),
          P(t),
          t.emit("init"),
          t.emit("afterInit")),
        t
      );
    }
    destroy(e = !0, t = !0) {
      const s = this,
        { params: r, el: i, wrapperEl: a, slides: n } = s;
      return (
        void 0 === s.params ||
          s.destroyed ||
          (s.emit("beforeDestroy"),
          (s.initialized = !1),
          s.detachEvents(),
          r.loop && s.loopDestroy(),
          t &&
            (s.removeClasses(),
            i.removeAttribute("style"),
            a.removeAttribute("style"),
            n &&
              n.length &&
              n.forEach((e) => {
                e.classList.remove(
                  r.slideVisibleClass,
                  r.slideActiveClass,
                  r.slideNextClass,
                  r.slidePrevClass
                ),
                  e.removeAttribute("style"),
                  e.removeAttribute("data-swiper-slide-index");
              })),
          s.emit("destroy"),
          Object.keys(s.eventsListeners).forEach((e) => {
            s.off(e);
          }),
          !1 !== e &&
            ((s.el.swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(s)),
          (s.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      c(X, e);
    }
    static get extendedDefaults() {
      return X;
    }
    static get defaults() {
      return R;
    }
    static installModule(e) {
      Y.prototype.__modules__ || (Y.prototype.__modules__ = []);
      const t = Y.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => Y.installModule(e)), Y)
        : (Y.installModule(e), Y);
    }
  }
  Object.keys(q).forEach((e) => {
    Object.keys(q[e]).forEach((t) => {
      Y.prototype[t] = q[e][t];
    });
  }),
    Y.use([
      function ({ swiper: e, on: t, emit: s }) {
        const r = a();
        let i = null,
          n = null;
        const l = () => {
            e &&
              !e.destroyed &&
              e.initialized &&
              (s("beforeResize"), s("resize"));
          },
          o = () => {
            e && !e.destroyed && e.initialized && s("orientationchange");
          };
        t("init", () => {
          e.params.resizeObserver && void 0 !== r.ResizeObserver
            ? e &&
              !e.destroyed &&
              e.initialized &&
              ((i = new ResizeObserver((t) => {
                n = r.requestAnimationFrame(() => {
                  const { width: s, height: r } = e;
                  let i = s,
                    a = r;
                  t.forEach(
                    ({ contentBoxSize: t, contentRect: s, target: r }) => {
                      (r && r !== e.el) ||
                        ((i = s ? s.width : (t[0] || t).inlineSize),
                        (a = s ? s.height : (t[0] || t).blockSize));
                    }
                  ),
                    (i === s && a === r) || l();
                });
              })),
              i.observe(e.el))
            : (r.addEventListener("resize", l),
              r.addEventListener("orientationchange", o));
        }),
          t("destroy", () => {
            n && r.cancelAnimationFrame(n),
              i && i.unobserve && e.el && (i.unobserve(e.el), (i = null)),
              r.removeEventListener("resize", l),
              r.removeEventListener("orientationchange", o);
          });
      },
      function ({ swiper: e, extendParams: t, on: s, emit: r }) {
        const i = [],
          n = a(),
          l = (t, s = {}) => {
            const a = new (n.MutationObserver || n.WebkitMutationObserver)(
              (t) => {
                if (e.__preventObserver__) return;
                if (1 === t.length) return void r("observerUpdate", t[0]);
                const s = function () {
                  r("observerUpdate", t[0]);
                };
                n.requestAnimationFrame
                  ? n.requestAnimationFrame(s)
                  : n.setTimeout(s, 0);
              }
            );
            a.observe(t, {
              attributes: void 0 === s.attributes || s.attributes,
              childList: void 0 === s.childList || s.childList,
              characterData: void 0 === s.characterData || s.characterData,
            }),
              i.push(a);
          };
        t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          s("init", () => {
            if (e.params.observer) {
              if (e.params.observeParents) {
                const t = (function (e, t) {
                  const s = [];
                  let r = e.parentElement;
                  for (; r; )
                    t ? r.matches(t) && s.push(r) : s.push(r),
                      (r = r.parentElement);
                  return s;
                })(e.el);
                for (let e = 0; e < t.length; e += 1) l(t[e]);
              }
              l(e.el, { childList: e.params.observeSlideChildren }),
                l(e.wrapperEl, { attributes: !1 });
            }
          }),
          s("destroy", () => {
            i.forEach((e) => {
              e.disconnect();
            }),
              i.splice(0, i.length);
          });
      },
    ]);
  const U = Y;
  function K({ swiper: e, extendParams: t, on: s, emit: i }) {
    const l = r();
    let o,
      d,
      c,
      p,
      u = !1,
      h = null,
      v = null;
    function g() {
      if (!e.params.scrollbar.el || !e.scrollbar.el) return;
      const { scrollbar: t, rtlTranslate: s } = e,
        { dragEl: r, el: i } = t,
        a = e.params.scrollbar,
        n = e.params.loop ? e.progressLoop : e.progress;
      let l = d,
        o = (c - d) * n;
      s
        ? ((o = -o), o > 0 ? ((l = d - o), (o = 0)) : -o + d > c && (l = c + o))
        : o < 0
        ? ((l = d + o), (o = 0))
        : o + d > c && (l = c - o),
        e.isHorizontal()
          ? ((r.style.transform = `translate3d(${o}px, 0, 0)`),
            (r.style.width = `${l}px`))
          : ((r.style.transform = `translate3d(0px, ${o}px, 0)`),
            (r.style.height = `${l}px`)),
        a.hide &&
          (clearTimeout(h),
          (i.style.opacity = 1),
          (h = setTimeout(() => {
            (i.style.opacity = 0), (i.style.transitionDuration = "400ms");
          }, 1e3)));
    }
    function w() {
      if (!e.params.scrollbar.el || !e.scrollbar.el) return;
      const { scrollbar: t } = e,
        { dragEl: s, el: r } = t;
      (s.style.width = ""),
        (s.style.height = ""),
        (c = e.isHorizontal() ? r.offsetWidth : r.offsetHeight),
        (p =
          e.size /
          (e.virtualSize +
            e.params.slidesOffsetBefore -
            (e.params.centeredSlides ? e.snapGrid[0] : 0))),
        (d =
          "auto" === e.params.scrollbar.dragSize
            ? c * p
            : parseInt(e.params.scrollbar.dragSize, 10)),
        e.isHorizontal()
          ? (s.style.width = `${d}px`)
          : (s.style.height = `${d}px`),
        (r.style.display = p >= 1 ? "none" : ""),
        e.params.scrollbar.hide && (r.style.opacity = 0),
        e.params.watchOverflow &&
          e.enabled &&
          t.el.classList[e.isLocked ? "add" : "remove"](
            e.params.scrollbar.lockClass
          );
    }
    function b(t) {
      return e.isHorizontal() ? t.clientX : t.clientY;
    }
    function S(t) {
      const { scrollbar: s, rtlTranslate: i } = e,
        { el: n } = s;
      let l;
      (l =
        (b(t) -
          (function (e) {
            const t = a(),
              s = r(),
              i = e.getBoundingClientRect(),
              n = s.body,
              l = e.clientTop || n.clientTop || 0,
              o = e.clientLeft || n.clientLeft || 0,
              d = e === t ? t.scrollY : e.scrollTop,
              c = e === t ? t.scrollX : e.scrollLeft;
            return { top: i.top + d - l, left: i.left + c - o };
          })(n)[e.isHorizontal() ? "left" : "top"] -
          (null !== o ? o : d / 2)) /
        (c - d)),
        (l = Math.max(Math.min(l, 1), 0)),
        i && (l = 1 - l);
      const p = e.minTranslate() + (e.maxTranslate() - e.minTranslate()) * l;
      e.updateProgress(p),
        e.setTranslate(p),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
    }
    function T(t) {
      const s = e.params.scrollbar,
        { scrollbar: r, wrapperEl: a } = e,
        { el: n, dragEl: l } = r;
      (u = !0),
        (o =
          t.target === l
            ? b(t) -
              t.target.getBoundingClientRect()[
                e.isHorizontal() ? "left" : "top"
              ]
            : null),
        t.preventDefault(),
        t.stopPropagation(),
        (a.style.transitionDuration = "100ms"),
        (l.style.transitionDuration = "100ms"),
        S(t),
        clearTimeout(v),
        (n.style.transitionDuration = "0ms"),
        s.hide && (n.style.opacity = 1),
        e.params.cssMode && (e.wrapperEl.style["scroll-snap-type"] = "none"),
        i("scrollbarDragStart", t);
    }
    function y(t) {
      const { scrollbar: s, wrapperEl: r } = e,
        { el: a, dragEl: n } = s;
      u &&
        (t.preventDefault ? t.preventDefault() : (t.returnValue = !1),
        S(t),
        (r.style.transitionDuration = "0ms"),
        (a.style.transitionDuration = "0ms"),
        (n.style.transitionDuration = "0ms"),
        i("scrollbarDragMove", t));
    }
    function x(t) {
      const s = e.params.scrollbar,
        { scrollbar: r, wrapperEl: a } = e,
        { el: l } = r;
      u &&
        ((u = !1),
        e.params.cssMode &&
          ((e.wrapperEl.style["scroll-snap-type"] = ""),
          (a.style.transitionDuration = "")),
        s.hide &&
          (clearTimeout(v),
          (v = n(() => {
            (l.style.opacity = 0), (l.style.transitionDuration = "400ms");
          }, 1e3))),
        i("scrollbarDragEnd", t),
        s.snapOnRelease && e.slideToClosest());
    }
    function E(t) {
      const { scrollbar: s, params: r } = e,
        i = s.el;
      if (!i) return;
      const a = i,
        n = !!r.passiveListeners && { passive: !1, capture: !1 },
        o = !!r.passiveListeners && { passive: !0, capture: !1 };
      if (!a) return;
      const d = "on" === t ? "addEventListener" : "removeEventListener";
      a[d]("pointerdown", T, n),
        l[d]("pointermove", y, n),
        l[d]("pointerup", x, o);
    }
    function C() {
      const { scrollbar: t, el: s } = e;
      e.params.scrollbar = (function (e, t, s, r) {
        return (
          e.params.createElements &&
            Object.keys(r).forEach((i) => {
              if (!s[i] && !0 === s.auto) {
                let a = f(e.el, `.${r[i]}`)[0];
                a ||
                  ((a = m("div", r[i])), (a.className = r[i]), e.el.append(a)),
                  (s[i] = a),
                  (t[i] = a);
              }
            }),
          s
        );
      })(e, e.originalParams.scrollbar, e.params.scrollbar, {
        el: "swiper-scrollbar",
      });
      const r = e.params.scrollbar;
      if (!r.el) return;
      let i, a;
      "string" == typeof r.el &&
        e.isElement &&
        (i = e.el.shadowRoot.querySelector(r.el)),
        i || "string" != typeof r.el
          ? i || (i = r.el)
          : (i = l.querySelectorAll(r.el)),
        e.params.uniqueNavElements &&
          "string" == typeof r.el &&
          i.length > 1 &&
          1 === s.querySelectorAll(r.el).length &&
          (i = s.querySelector(r.el)),
        i.length > 0 && (i = i[0]),
        i.classList.add(e.isHorizontal() ? r.horizontalClass : r.verticalClass),
        i &&
          ((a = i.querySelector(`.${e.params.scrollbar.dragClass}`)),
          a || ((a = m("div", e.params.scrollbar.dragClass)), i.append(a))),
        Object.assign(t, { el: i, dragEl: a }),
        r.draggable && e.params.scrollbar.el && e.scrollbar.el && E("on"),
        i &&
          i.classList[e.enabled ? "remove" : "add"](
            e.params.scrollbar.lockClass
          );
    }
    function M() {
      const t = e.params.scrollbar,
        s = e.scrollbar.el;
      s &&
        s.classList.remove(
          e.isHorizontal() ? t.horizontalClass : t.verticalClass
        ),
        e.params.scrollbar.el && e.scrollbar.el && E("off");
    }
    t({
      scrollbar: {
        el: null,
        dragSize: "auto",
        hide: !1,
        draggable: !1,
        snapOnRelease: !0,
        lockClass: "swiper-scrollbar-lock",
        dragClass: "swiper-scrollbar-drag",
        scrollbarDisabledClass: "swiper-scrollbar-disabled",
        horizontalClass: "swiper-scrollbar-horizontal",
        verticalClass: "swiper-scrollbar-vertical",
      },
    }),
      (e.scrollbar = { el: null, dragEl: null }),
      s("init", () => {
        !1 === e.params.scrollbar.enabled ? P() : (C(), w(), g());
      }),
      s("update resize observerUpdate lock unlock", () => {
        w();
      }),
      s("setTranslate", () => {
        g();
      }),
      s("setTransition", (t, s) => {
        !(function (t) {
          e.params.scrollbar.el &&
            e.scrollbar.el &&
            (e.scrollbar.dragEl.style.transitionDuration = `${t}ms`);
        })(s);
      }),
      s("enable disable", () => {
        const { el: t } = e.scrollbar;
        t &&
          t.classList[e.enabled ? "remove" : "add"](
            e.params.scrollbar.lockClass
          );
      }),
      s("destroy", () => {
        M();
      });
    const P = () => {
      e.el.classList.add(e.params.scrollbar.scrollbarDisabledClass),
        e.scrollbar.el &&
          e.scrollbar.el.classList.add(
            e.params.scrollbar.scrollbarDisabledClass
          ),
        M();
    };
    Object.assign(e.scrollbar, {
      enable: () => {
        e.el.classList.remove(e.params.scrollbar.scrollbarDisabledClass),
          e.scrollbar.el &&
            e.scrollbar.el.classList.remove(
              e.params.scrollbar.scrollbarDisabledClass
            ),
          C(),
          w(),
          g();
      },
      disable: P,
      updateSize: w,
      setTranslate: g,
      init: C,
      destroy: M,
    });
  }
  function J() {
    let e = document.querySelectorAll(
      '[class*="__swiper"]:not(.swiper-wrapper)'
    );
    e &&
      e.forEach((e) => {
        e.parentElement.classList.add("swiper"),
          e.classList.add("swiper-wrapper");
        for (const t of e.children) t.classList.add("swiper-slide");
      });
  }
  window.addEventListener("load", function (e) {
    J(),
      document.querySelector(".swiper") &&
        new U(".swiper", {
          modules: [K],
          grabCursor: !0,
          observer: !0,
          observeParents: !0,
          slidesPerView: 4.5,
          spaceBetween: 0,
          autoHeight: !0,
          speed: 800,
          pagination: { el: ".slider-quality__pagging", clickable: !0 },
          scrollbar: { el: ".swiper-scrollbar", draggable: !0 },
          breakpoints: {
            768: { slidesPerView: 2.5, spaceBetween: 0, autoHeight: !0 },
            1130: { slidesPerView: 3, spaceBetween: 0 },
            1260: { slidesPerView: 3.5, spaceBetween: 0 },
            1440: { slidesPerView: 4.5, spaceBetween: 0 },
          },
          on: {},
        }),
      (function () {
        J();
        let e = document.querySelectorAll(".swiper_scroll");
        if (e.length > 0)
          for (let t = 0; t < e.length; t++) {
            const s = e[t],
              r = s.querySelector(".swiper-scrollbar");
            new U(s, {
              observer: !0,
              observeParents: !0,
              direction: "vertical",
              slidesPerView: "auto",
              freeMode: { enabled: !0 },
              scrollbar: { el: r, draggable: !0, snapOnRelease: !1 },
              mousewheel: { releaseOnEdges: !0 },
            }).scrollbar.updateSize();
          }
      })();
  });
  let Q = !1;
  setTimeout(() => {
    if (Q) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    });
})();
