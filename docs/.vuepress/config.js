module.exports = {
  title: '量子数据分析云',
  description: 'DWF',
  base: '/',
  record: "京ICP备2020037097号-1",
  year: "2023/01/14",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/'},
      { text: 'DWF', 
        items: [
          { text: 'web基础', link: '/guide/web/'},
          { text: 'DWF', link: '/guide/dwf/'}
        ]
      },
      { text: '前端', 
	items: [
	  { text: '面试经验', link: '/front/experience/'},
	  { text: 'Node', link: '/front/Node/'},
	  { text: 'Webpack&Babel', link: '/front/Webpack/' },
	]
      },
      { text: '后端',
	items: [
	  { text: 'Typescript', link: '/backend/Typescript/' },
	]
      },
      {
        text: '深度学习',
	link: '/DeepLearning/',
	items: []
      }
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
	  '/front/experience/': [
	    '',
	    'Preparation',
	    'Record'
	  ],
	  '/front/HTML/': [
	    ''
	  ],
	  '/front/CSS/': [''],
	  '/front/Javascript/': [''],
	  '/front/Node/': [
	    '',
	    'Async'
	  ],
	  '/front/Webpack/': [
	    '',
	    'Webpack',
	    'Babel'
	  ],
	  '/front/Vue/': [''],
	  '/front/SQL/': [''],
          '/backend/Typescript/': [
	    '',
	  ],
	   '/': [
            '',
            'about'
          ],
        }
  }
}
