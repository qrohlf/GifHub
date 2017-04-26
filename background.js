/* global chrome */

const HOST_WHITELIST = [
  'https://i.imgur.com'
].join(' ')

const onHeadersReceived = (details) => {
  details.responseHeaders.forEach(header => {
    if (header.name.match(/content-security-policy/i)) {
      header.value = (header.value.replace(/media-src.*?;/, 'media-src ' + HOST_WHITELIST + ';'))
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
