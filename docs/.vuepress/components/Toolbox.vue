<template>
<div>
	<h1>浏览器信息</h1>
<li v-for="label in labels">
       {{label}}: {{browserinfo[label]}}
</li>
<input @click="chromeversion" type='button' value="Chrome的详细信息"/>
<input @click="edgeversion" type='button' value="Edge的详细信息"/>
</div>
</template>

<script>
export default {
data: function (){
  return {
    browserinfo: window.navigator,
    labels: ['appCodeName', 'appName', 'appVersion', 'platform'],
  }
},
methods:{
  chromeversion: function(){
    window.open("chrome://version");
  },
  edgeversion: function(){
    window.open("edge://version");
  }
}
}
</script>

<style></style>
