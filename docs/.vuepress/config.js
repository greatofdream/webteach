import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { getDirname, path } from '@vuepress/utils'
const __dirname = getDirname(import.meta.url)
//import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
export default defineUserConfig({
  title: '量子数据分析云',
  description: 'DWF',
  base: '/',
  record: "京ICP备2020037097号-1",
  year: "2023/01/14",
  theme: defaultTheme({
    navbar: [
      { text: 'Home', link: '/'},
      { text: '低代码', 
        children: [
          { text: 'web基础', link: '/guide/web/'},
          { text: 'DWF', link: '/guide/dwf/'}
        ]
      },
      { text: '前端', 
	children: [
	  { text: '面试经验', link: '/front/experience/'},
	  { text: 'Javascript', link: '/front/Javascript/'},
	  { text: 'CSS', link: '/front/CSS/'},
	  { text: 'Node', link: '/front/Node/'},
	  { text: 'Webpack', link: '/front/Webpack/' },
	  { text: 'Vue', link: '/front/Vue/' },
	  { text: 'spider', link: '/front/Spider/'},
	]
      },
      { text: '后端',
	children: [
	  { text: 'Typescript', link: '/backend/Typescript/' },
	]
      },
      {
	text: '桌面',
	children: [
	  { text: 'VScode', link: '/Desktop/VSCode/'},
	]
      },
      {
        text: '深度学习',
	link: '/DeepLearning/',
	children: [
          { text: 'pytorch', link: '/DeepLearning/Torch' },
	]
      },
      {
        text: '操作系统',
	children: [
          { text: '快捷键', link: '/OS/Shortcut/' },
          { text: 'X11', link: '/OS/X11/'},
	  { text: 'Linux', link: '/OS/Linux/' },
	  { text: 'Windows', link: '/OS/Windows/' },
	],
      },
      {
        text: '硬件',
	children: [
	  { text: 'CPU', link: '/Hardware/CPU/' },
	  { text: 'GPU', link: '/Hardware/GPU/' },
	  { text: '开发板', link: '/Hardware/Board/'},
	  { text: '开发软件', link: '/Hardware/Software/' },
          { text: '屏幕', link: '/Hardware/Panel/' },
          { text: 'U盘', link: '/Hardware/UDisk/' },
	],
      },
      {
	text: '软件',
	children: [
	  { text: 'Gitea', link: '/Software/gitea' },
	  { text: 'Vuepress', link: '/Software/vuepress'},
	  { text: 'Geant4', link: '/Software/Geant4'},
	  { text: 'ROOT', link: '/Software/ROOT'},
	  { text: 'Matplotlib', link: '/Software/matplotlib'},
	],
      },
      {
	text: '编程语言',
	children: [
	  { text: 'C语言', link: '/Coding/CLanguage' },
	],
      },
      {
	text: '安全',
	children: [
		{ text: '网络', link: '/Security/Web/' },
		{ text: '二进制', link: '/Security/Binary/' },
	]
      },
      {
	text: '理论',
	link: '/Theory/',
	children: [
	  { text: '概述', link: '/Theory/' },
	  { text: '金融学', link: '/Theory/Finance/' },
	  { text: '概率论', link: '/Theory/Probability' },
	]
      },
      {
	text: '工具箱',
	link: '/Tools/',
      },
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
	  '/front/Vue/': [
		  '',
		  'Nuxt',
	  ],
	  '/front/SQL/': [''],
	  '/front/Spider/': [''],
          '/backend/Typescript/': [
	    '',
	  ],
	  '/DeepLearning/': [
		  '',
	    'Torch',
	  ],
	  '/OS/Shortcut': [''],
	  '/OS/X11': [''],
	  '/OS/Linux/': [
		  '',
		  'Manjaro',
		  'Fonts',
	  ],
	  '/Security/Web/': [
		  '',
		  'PacketCapture',
		  'VPN',
	  ],
	  '/Security/Binary/': [
		  '',
	  ],
	  '/Hardware/CPU': [
	    '',
	    'Intel',
	    'AMD',
	    'Qualcomm',
	    'Nvidia',
	    'RockChip',
	  ],
	  '/Hardware/GPU': [
		  'AMD',
	  ],
	  '/Hardware/Board': [
		'',
		'WCH',
		'Redefine',
		'TVBox',
		'PortableWifi',
		'Phone',
	  ],
	  '/Hardware/Software': [
		  '',
		  'Verilator',
	  ],
	  '/Hardware/Panel': [
		  '',
		  'Ink',
	  ],
	  '/Theory/Finance': [
		  '',
		  'CorporateFinance',
	  ],
	  '/Tools/': [
		 '',
		 'Books',
		  'Sign',
		  'DrivingLicense',
	  ],
	   '/': [
            '',
          ],
        }
  }),
  alias: {
    '@theme/HomeFooter.vue': path.resolve(__dirname, './components/HomeFooter.vue'),
  },
  plugins:[
      registerComponentsPlugin({
	      components: {
		      MyChart: path.resolve(__dirname, './components/MyChart.vue'),
	      },
      }),
  ],
})
