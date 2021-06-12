module.exports = {
  title: 'web基础 & DWF',
  description: 'DWF',
  base: '/webdwf/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/'},
      { text: 'Guide', 
        items: [
          { text: 'web基础', link: '/guide/web/'},
          { text: 'DWF', link: '/guide/dwf/'}
        ]
      },
      { text: 'Example', link: '/examples/'}
    ],
    sidebar: {
          '/guide/web/': [
            '',
            'webBrowser',
            'vue',
            'springboot'
          ],
          '/guide/dwf/': [
            '',
            'part1',
            'part2',
            'part3',
	    'part4',
          ],
          '/guide/': [
            ''
          ],
          '/': [
            '',
            'about'
          ],
        }
  }
}
