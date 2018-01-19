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
    pattern: /^https:\/\/instagram\..*.fbcdn.net\/.*\.mp4$/,
    type: () => 'video/mp4',
    domain: 'instagram.fsnc1-1.fna.fbcdn.net',
    template: m => m[0]
  }
]
