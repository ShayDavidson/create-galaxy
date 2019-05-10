export function presetToUrl(preset) {
  return `${window.location.href.split('#')[0]}#${presetToHash(preset)}`;
}

export function urlToPreset() {
  const hash = window.location.href.split('#')[1];
  try {
    return hash ? hashToPreset(hash) : undefined;
  } catch {
    return undefined;
  }
}

export function shareOnTwitter(url, text, hashtags) {
  let shareURL = 'http://twitter.com/share?';
  const params = {
    url,
    text,
    hashtags: hashtags.join(','),
  };
  for (var prop in params) shareURL += '&' + prop + '=' + encodeURIComponent(params[prop]);
  window.open(shareURL, '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
}

export function presetToHash(preset) {
  return btoa(JSON.stringify(preset));
}

export function hashToPreset(hash) {
  return JSON.parse(atob(hash));
}
