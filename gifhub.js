/* global _,MutationObserver,SUPPORTED_HOSTS */

const createWithAttrs = (tag, attrs = {}) => {
  const node = document.createElement(tag)
  _.each(attrs, (value, key) => node.setAttribute(key, value))
  return node
}

const getVideoNode = (href) => {
  const host = SUPPORTED_HOSTS.find(h => href.match(h.pattern))
  if (!host) return null
  const matches = href.match(host.pattern)
  const src = host.template(matches)
  const type = host.type(matches)
  const video = createWithAttrs('video', {
    autoplay: '',
    muted: '',
    loop: '',
    poster: '',
    'res-media-zoomable': '',
    style: 'display: block; max-width: 100%; max-height: 600px;'
  })
  const source = createWithAttrs('source', {src, type})
  video.appendChild(source)
  return video
}

const getPlayer = (videoNode) => {
  const blockContainer = createWithAttrs('div')

  const videoContainer = createWithAttrs('div', {
    style: 'position: relative; display: inline-block;'
  })

  const playOverlay = createWithAttrs('div', {
    style: `
      display: flex;
      opacity: 0;
      transition: opacity 200ms ease;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      `
  })

  const playButton = createWithAttrs('div', {
    style: `
      display: inline-block;
      height: 0;
      width: 0;
      transform: scale(1);
      opacity: 0.6;
      transition: transform 200ms ease, opacity 200ms ease;
      border-top: 30px solid transparent;
      border-bottom: 30px solid transparent;
      border-left: 40px solid #FFF;
      margin-left: -5px;
      `
  })

  playOverlay.addEventListener('mouseenter', () => {
    playButton.style.transform = 'scale(1.1)'
    playButton.style.opacity = 0.9
  })

  playOverlay.addEventListener('mouseleave', () => {
    playButton.style.transform = 'scale(1)'
    playButton.style.opacity = 0.6
  })

  const showPlayOverlay = () => { playOverlay.style.opacity = 1 }
  const hidePlayOverlay = () => { playOverlay.style.opacity = 0 }
  const updateUI = () => { videoNode.paused ? showPlayOverlay() : hidePlayOverlay() }

  playOverlay.appendChild(playButton)
  videoContainer.appendChild(videoNode)
  videoContainer.appendChild(playOverlay)
  blockContainer.appendChild(videoContainer)

  playOverlay.addEventListener('click', () => {
    if (videoNode.paused) {
      videoNode.play()
        .then(updateUI)
        .catch(updateUI)
    } else {
      videoNode.pause()
      updateUI()
    }
  })

  videoNode.play()
    .then(updateUI)
    .catch(updateUI)

  return blockContainer
}

const processPage = () => {
  // grab all valid links that don't already have a video
  const commentLinks = Array.prototype.slice.call(document.querySelectorAll('.comment-body a'))
    .filter(a => !a.querySelector('video'))
    .filter(a => a.href && a.href !== '' && SUPPORTED_HOSTS.some(host => a.href.match(host.pattern)))

  commentLinks.forEach(anchor => {
    const https = anchor.href.replace('http://', 'https://')
    const videoNode = getVideoNode(https)

    if (videoNode !== null) {
      const videoPlayer = getPlayer(videoNode)
      anchor.parentElement.replaceChild(videoPlayer, anchor)
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
