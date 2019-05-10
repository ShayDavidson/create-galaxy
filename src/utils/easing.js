export const Easing = {
  linear: function(t) {
    return t;
  },
  inQuad: function(t) {
    return Math.pow(t, 2);
  },
  outQuad: function(t) {
    return -(Math.pow(t - 1, 2) - 1);
  },

  inOutQuad: function(t) {
    if ((t /= 0.5) < 1) return 0.5 * Math.pow(t, 2);
    return -0.5 * ((t -= 2) * t - 2);
  },

  inCubic: function(t) {
    return Math.pow(t, 3);
  },

  outCubic: function(t) {
    return Math.pow(t - 1, 3) + 1;
  },

  inOutCubic: function(t) {
    if ((t /= 0.5) < 1) return 0.5 * Math.pow(t, 3);
    return 0.5 * (Math.pow(t - 2, 3) + 2);
  },

  inQuart: function(t) {
    return Math.pow(t, 4);
  },

  outQuart: function(t) {
    return -(Math.pow(t - 1, 4) - 1);
  },

  inOutQuart: function(t) {
    if ((t /= 0.5) < 1) return 0.5 * Math.pow(t, 4);
    return -0.5 * ((t -= 2) * Math.pow(t, 3) - 2);
  },

  inQuint: function(t) {
    return Math.pow(t, 5);
  },

  outQuint: function(t) {
    return Math.pow(t - 1, 5) + 1;
  },

  inOutQuint: function(t) {
    if ((t /= 0.5) < 1) return 0.5 * Math.pow(t, 5);
    return 0.5 * (Math.pow(t - 2, 5) + 2);
  },

  inSine: function(t) {
    return -Math.cos(t * (Math.PI / 2)) + 1;
  },

  outSine: function(t) {
    return Math.sin(t * (Math.PI / 2));
  },

  inOutSine: function(t) {
    return -0.5 * (Math.cos(Math.PI * t) - 1);
  },

  inExpo: function(t) {
    return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
  },

  outExpo: function(t) {
    return t === 1 ? 1 : -Math.pow(2, -10 * t) + 1;
  },

  inOutExpo: function(t) {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if ((t /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
    return 0.5 * (-Math.pow(2, -10 * --t) + 2);
  },

  inCirc: function(t) {
    return -(Math.sqrt(1 - t * t) - 1);
  },

  outCirc: function(t) {
    return Math.sqrt(1 - Math.pow(t - 1, 2));
  },

  inOutCirc: function(t) {
    if ((t /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);
    return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
  },

  outBounce: function(t) {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
  },

  inBack: function(t) {
    var s = 1.70158;
    return t * t * ((s + 1) * t - s);
  },

  outBack: function(t) {
    var s = 1.70158;
    return (t = t - 1) * t * ((s + 1) * t + s) + 1;
  },

  inOutBack: function(t) {
    var s = 1.70158;
    if ((t /= 0.5) < 1) return 0.5 * (t * t * (((s *= 1.525) + 1) * t - s));
    return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
  },

  elastic: function(t) {
    return -1 * Math.pow(4, -8 * t) * Math.sin(((t * 6 - 1) * (2 * Math.PI)) / 2) + 1;
  },

  swingFromTo: function(t) {
    var s = 1.70158;
    return (t /= 0.5) < 1 ? 0.5 * (t * t * (((s *= 1.525) + 1) * t - s)) : 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
  },

  swingFrom: function(t) {
    var s = 1.70158;
    return t * t * ((s + 1) * t - s);
  },

  swingTo: function(t) {
    var s = 1.70158;
    return (t -= 1) * t * ((s + 1) * t + s) + 1;
  },

  bounce: function(t) {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
  },

  bouncePast: function(t) {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
      return 2 - (7.5625 * (t -= 1.5 / 2.75) * t + 0.75);
    } else if (t < 2.5 / 2.75) {
      return 2 - (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375);
    } else {
      return 2 - (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
    }
  },
};
