module.exports = {
  title: '量子数据分析云',
  description: 'DWF',
  base: '/',
  record: "京ICP备2020037097号-1",
  year: "2023/01/14",
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
	    'newFeature',
	    'scriptCallback',
	    'appendix'
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
