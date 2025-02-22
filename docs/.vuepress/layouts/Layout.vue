<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <div class="my-footer">
	<div>MIT Licensed | Copyright © 2021-present</div>
	<div>[greatofdream](https://github.com/greatofdream) [京ICP备2020037097号-1](https://beian.miit.gov.cn)</div>
      </div>
    </template>
  </ParentLayout>
</template>

<style lang="css">
.my-footer {
  text-align: center;
}
</style>

