<template>
  <div class="food-page">
    <h1>奶酪功能页面</h1>
    <p>这里是关于奶酪的详细信息。</p>
    <router-link to="/fridge-interior">返回冰箱</router-link>
  </div>
</template>

<script setup lang="ts">
// 可以在这里添加组件逻辑
</script>

<style scoped>
.food-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fce4ec; /* 淡粉色背景 */
}
</style>
