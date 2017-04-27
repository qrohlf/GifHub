window.SUPPORTED_HOSTS = [
  {
    pattern: /^https?:\/\/i\.imgur\.com\/(\w+)\.gifv$/i,
    type: 'video/mp4',
    domain: 'https://i.imgur.com',
    template: m => `https://i.imgur.com/${m[1]}.mp4`
  },
  {
    pattern: /^https?:\/\/(fat|zippy|giant)\.gfycat\.com\/(\w+)\.webm$/i,
    type: 'video/webm',
    domain: 'https://zippy.gfycat.com https://fat.gfycat.com https://giant.gfycat.com',
    template: m => `https://${m[1]}.gfycat.com/${m[2]}.webm`
  }
]
