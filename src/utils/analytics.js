export function track(eventAction, value = undefined) {
  if (window.ga) {
    window.ga('send', 'event', { eventAction, eventLabel: value });
  }
}
