/* global chrome, SUPPORTED_HOSTS */
const CSP_WHITELIST = SUPPORTED_HOSTS.map(h => h.domain).join(' ')

const onHeadersReceived = (details) => {
  details.responseHeaders.forEach(header => {
    if (header.name.match(/content-security-policy/i)) {
      header.value = (header.value.replace(/media-src.*?;/, 'media-src ' + CSP_WHITELIST + ';'))
    }
  })

  return {responseHeaders: details.responseHeaders}
}

const filter = {
  urls: ['https://github.com/*'],
  types: ['main_frame', 'sub_frame']
}

const contexts = ['blocking', 'responseHeaders']

chrome.webRequest.onHeadersReceived.addListener(onHeadersReceived, filter, contexts)
