/* global _,MutationObserver */

const URL_WHITELIST = [
  /^https?:\/\/i.imgur.com\/\w+\.gifv$/i
]

const createWithAttrs = (tag, attrs) => {
  const node = document.createElement(tag)
  _.each(attrs, (value, key) => node.setAttribute(key, value))
  return node
}

const getVideoNode = (href) => {
  const src = href.replace('gifv', 'mp4') // TODO
  const video = createWithAttrs('video', {
    autoplay: '',
    muted: '',
    loop: '',
    poster: '',
    'res-media-zoomable': '',
    style: 'display: block; max-width: 100%; max-height: 400px;'
  })
  const source = createWithAttrs('source', {src, type: 'video/mp4'})
  video.appendChild(source)
  return video
}

const processPage = () => {
  // grab all valid links
  const commentLinks = Array.prototype.slice.call(document.querySelectorAll('.comment-body a'))
    .filter(a => !a.querySelector('video'))
    .filter(a => a.href && a.href !== '' && URL_WHITELIST.some(pattern => a.href.match(pattern)))

  commentLinks.forEach(anchor => {
    const https = anchor.href.replace('http://', 'https://')
    const videoNode = getVideoNode(https)

    if (videoNode !== null) {
      anchor.textContent = ''
      anchor.appendChild(videoNode)
    }
  })
}

const init = () => {
  // the throttle prevents recursion between the MutationObserver and
  // mutations created by processPage
  const observer = new MutationObserver(_.throttle(processPage, 400))
  observer.observe(document, {childList: true, subtree: true})
  processPage()
}

if (document.readyState !== 'loading') {
  init()
} else {
  document.addEventListener('DOMContentLoaded', init)
}
