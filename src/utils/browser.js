export function isSafari() {
  return !!navigator.userAgent.match(/Version\/[\d.]+.*Safari/);
}

export function isiOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

export function isAndroid() {
  return /android|Android/.test(navigator.userAgent);
}

export function isFirefox() {
  return /firefox|Firefox/.test(navigator.userAgent);
}

export function supportsEffects() {
  return !isSafari() && !isiOS();
}

export function isMobile() {
  return isiOS() || isAndroid();
}
