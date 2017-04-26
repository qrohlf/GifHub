window.SUPPORTED_HOSTS = [
  {
    pattern: /^https?:\/\/i.imgur.com\/(\w+)\.gifv$/i,
    type: 'video/mp4',
    domain: 'https://i.imgur.com',
    template: id => `https://i.imgur.com/${id}.mp4`
  },
  {
    pattern: /^https?:\/\/gfycat.com\/(\w+)$/i,
    type: 'video/webm',
    domain: 'https://zippy.gfycat.com',
    template: id => `https://zippy.gfycat.com/${id}.webm`
  }
]
