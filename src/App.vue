<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style>
/* 你可以在这里添加一些全局样式，例如重置 body 的 margin */
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%; /* 确保html, body, #app 占据整个视口高度 */
  overflow: hidden; /* 防止出现滚动条，如果内容超出视口，可以根据需要调整 */
}

/* 统一字体 */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 确保所有页面组件的根元素也占据整个高度 */
.home-view,
.fridge-interior-view,
.food-page {
  width: 100%;
  height: 100%; /* 让这些页面的内容区域也占据其父容器的全部高度 */
  box-sizing: border-box; /* 包含 padding 和 border 在元素的总宽度和高度内 */
}
</style>
