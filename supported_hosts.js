window.SUPPORTED_HOSTS = [
  {
    pattern: /^https?:\/\/i\.imgur\.com\/(\w+)\.gifv$/i,
    type: m => 'video/mp4',
    domain: 'https://i.imgur.com',
    template: m => `https://i.imgur.com/${m[1]}.mp4`
  },
  {
    pattern: /^https:\/\/(thumbs|zippy|fat|giant).?gfycat\.com\/.*\.(webm|mp4)$/,
    type: m => `video/${m[2]}`,
    domain: 'https://thumbs.gfycat.com https://zippy.gfycat.com https://fat.gfycat.com https://giant.gfycat.com',
    template: m => m[0]
  },
  {
    pattern: /^https?://(media|i)\.giphy\.com\/media\/([^\/]+)\/giphy.*/,
    type: m => `video/mp4`,
    domain: 'https://media.giphy.com https://i.giphy.com http://media.giphy.com http://i.giphy.com',
    template: m => `https://i.giphy.com/${m[2]}/giphy.mp4`
  }
]
