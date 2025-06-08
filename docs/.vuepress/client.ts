import { defineClientConfig } from '@vuepress/client'
//import Layout from './layouts/Layout.vue'
import Toolbox from './components/Toolbox.vue'
import HomeFooter from './components/HomeFooter.vue'
export default defineClientConfig({
  enhance({ app, router, siteData }) {
	  app.component('Toolbox', Toolbox),
	  app.component('HomeFooter', HomeFooter)
  },
  setup() {},
  rootComponents: [],
  //layouts: {
//	  Layout,
  //},
})
