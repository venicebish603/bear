<template>
  <div class="fridge-interior-view">
    <img
      src="/images/fridge-interior-background.png"
      alt="冰箱内部背景"
      class="fridge-background"
    />

    <h1 class="page-title">冰箱内部，好多吃的！</h1>

    <div class="food-items-placement-area">
      <img
        v-for="food in foodItems"
        :key="food.type"
        :src="food.src"
        :alt="food.alt"
        class="food-item"
        :style="{ left: food.left, top: food.top, width: food.width }"
        @click="handleFoodClick(food.type)"
      />
    </div>

    <button @click="goBackToHome" class="back-button">返回首页</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

// 定义食物数据数组，包含图片路径、类型、alt文本和定位信息
const foodItems = [
  {
    type: 'milk',
    src: '/images/milk.png',
    alt: '牛奶',
    left: '15%', // 相对于 food-items-placement-area 的左边距
    top: '10%',  // 相对于 food-items-placement-area 的上边距
    width: '100px' // 食物图片宽度
  },
  {
    type: 'cheese',
    src: '/images/cheese.png',
    alt: '奶酪',
    left: '60%',
    top: '25%',
    width: '80px'
  },
  {
    type: 'fruit',
    src: '/images/fruit.png',
    alt: '水果',
    left: '30%',
    top: '55%',
    width: '110px'
  },
  // 添加更多食物，并调整它们的 left, top 和 width 属性以符合冰箱内部的布局
  // {
  //   type: 'jar', // 示例：可以添加一个新食物类型，例如罐子
  //   src: '/images/jar.png', // 假设你有 jar.png 图片
  //   alt: '一罐果酱',
  //   left: '75%',
  //   top: '15%',
  //   width: '90px'
  // },
  // {
  //   type: 'vegetable', // 示例：蔬菜
  //   src: '/images/vegetable.png', // 假设你有 vegetable.png 图片
  //   alt: '一些蔬菜',
  //   left: '20%',
  //   top: '70%',
  //   width: '130px'
  // }
];

const handleFoodClick = (foodType: string) => {
  router.push(`/${foodType}`);
};

const goBackToHome = () => {
  router.push('/');
};
</script>

<style scoped>
.fridge-interior-view {
  position: relative; /* 允许内部元素绝对定位 */
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #e0f7fa; /* 默认背景色 */
  overflow: hidden; /* 防止溢出 */
}

.fridge-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain; /* 或者 cover，取决于你的背景图和期望效果 */
  z-index: 0; /* 确保背景图在最底层 */
  /* 如果你的背景图是按比例缩放，并希望食物在其上方精确覆盖，
     可能需要将 fridg-background 设为 contain，然后调整 food-items-placement-area 的大小和位置 */
}

.page-title {
  z-index: 2; /* 确保标题在最上层，高于背景和食物 */
  color: #333;
  margin-bottom: 20px; /* 调整标题与食物区域的距离 */
  position: absolute; /* 绝对定位标题，让它不影响食物定位区域 */
  top: 5%; /* 调整标题位置 */
}

/* 新的容器：用于绝对定位食物图片 */
.food-items-placement-area {
  position: absolute; /* 相对于 .fridge-interior-view 绝对定位 */
  width: 60%; /* 假设你的冰箱内部图片占据屏幕宽度的大约60% */
  height: 80%; /* 假设你的冰箱内部图片占据屏幕高度的大约80% */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 水平垂直居中这个区域 */
  /* background-color: rgba(255, 0, 0, 0.1); /* 临时背景色，用于调试区域大小和位置 */
  z-index: 1; /* 确保食物在这个区域内，并高于背景 */
  pointer-events: auto; /* 确保区域内的点击事件有效 */
}

.food-item {
  position: absolute; /* 使食物图片可以根据 left/top 精确定位 */
  height: auto; /* 保持图片比例 */
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  /* 初始定位在数据中指定，这里只写共用样式 */
  /* 注意：left/top 是相对于其父容器 .food-items-placement-area 的 */
}

.food-item:hover {
  transform: scale(1.1); /* 鼠标悬停时放大 */
}

.back-button {
  margin-top: 20px; /* 按钮与下方内容的间距 */
  padding: 12px 25px;
  font-size: 18px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 2; /* 确保按钮在最上层 */
  position: absolute; /* 绝对定位按钮，让它不影响食物定位区域 */
  bottom: 5%; /* 调整按钮位置 */
}

.back-button:hover {
  background-color: #45a049;
}
</style>
