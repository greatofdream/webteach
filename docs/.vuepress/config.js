import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
//import { docsearchPlugin } from '@vuepress/plugin-docsearch'
export default defineUserConfig({
  title: '量子数据分析云',
  description: 'DWF',
  base: '/',
  record: "京ICP备2020037097号-1",
  year: "2023/01/14",
  theme: defaultTheme({
    navbar: [
      { text: 'Home', link: '/'},
      { text: 'DWF', 
        children: [
          { text: 'web基础', link: '/guide/web/'},
          { text: 'DWF', link: '/guide/dwf/'}
        ]
      },
      { text: '前端', 
	children: [
	  { text: '面试经验', link: '/front/experience/'},
	  { text: 'Node', link: '/front/Node/'},
	  { text: 'Webpack&Babel', link: '/front/Webpack/' },
	]
      },
      { text: '后端',
	children: [
	  { text: 'Typescript', link: '/backend/Typescript/' },
	]
      },
      {
        text: '深度学习',
	link: '/DeepLearning/',
	children: []
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
  })
})
