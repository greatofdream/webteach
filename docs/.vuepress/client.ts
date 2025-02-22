import { defineClientConfig } from '@vuepress/client'
//import Layout from './layouts/Layout.vue'
import Toolbox from './components/Toolbox.vue'
export default defineClientConfig({
  enhance({ app, router, siteData }) {
	  app.component('Toolbox', Toolbox)
  },
  setup() {},
  rootComponents: [],
  //layouts: {
//	  Layout,
  //},
})
