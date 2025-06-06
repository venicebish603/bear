<template>
  <div class="food-page">
    <h1>牛奶功能页面</h1>
    <p>这里是关于牛奶的详细信息。</p>
    <router-link to="/fridge-interior" class="page-back-link">返回冰箱</router-link>
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
  background-color: #fffde7;
  padding: 20px;
  box-sizing: border-box; /* 确保内边距不撑大元素 */
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

p {
  color: #555;
  font-size: 1.1em;
  text-align: center;
  max-width: 600px;
  line-height: 1.5;
  margin-bottom: 30px;
}

.page-back-link {
  margin-top: 30px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff; /* 蓝色链接按钮 */
  color: white;
  text-decoration: none; /* 移除下划线 */
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.page-back-link:hover {
  background-color: #0056b3;
}
</style>
