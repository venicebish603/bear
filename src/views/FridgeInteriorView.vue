<template>
  <div class="fridge-interior-view">
    <!-- <img
      :src="getPublicImagePath('fridge-interior-background.png')"
      alt="冰箱内部背景"
      class="fridge-background"
    /> -->

    <h2 class="page-title">食物会到处乱飞的冰箱<br>说明了冰箱狗熊乱扔食物！！</h2>

    <div class="food-items-placement-area">
      <img
        v-for="food in foodItems"
        :key="food.type"
        :src="getPublicImagePath(food.imgName)"
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
import { ref, computed } from 'vue';

const router = useRouter();
const base = import.meta.env.BASE_URL;

const getPublicImagePath = (imageName: string) => {
  return `${base}images/${imageName}`;
}
const fridgeBgUrl = computed(() => getPublicImagePath('fridge-interior-background.png'));
// 定义食物数据数组，包含图片路径、类型、alt文本和定位信息
const foodItems = [
  {
    type: 'milk',
    imgName: 'milk.png',
    alt: '牛奶',
    left: '29%', // 相对于 food-items-placement-area 的左边距
    top: '12%',  // 相对于 food-items-placement-area 的上边距
    width: '8%' // 食物图片宽度
  },
  {
    type: 'cheese',
    imgName: 'cheese.png',
    alt: '奶酪',
    left: '61%',
    top: '32%',
    width: '8%'
  },
  {
    type: 'fruit',
    imgName: 'fruit.png',
    alt: '水果',
    left: '30%',
    top: '23%',
    width: '9%'
  },
  {
    type: 'sauce', // 示例：可以添加一个新食物类型，例如罐子
    imgName: 'sauce.png', // 假设你有 jar.png 图片
    alt: '一罐辣酱',
    left: '102%',
    top: '38%',
    width: '6%'
  },
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
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* 将冰箱背景图设置为这个容器的背景 */
  background-image: v-bind("`url(${getPublicImagePath('fridge-interior-background.png')})`"); /* 动态绑定背景图 */
  background-size: contain;   /* 让背景图按比例缩放并完全显示 */
  background-repeat: no-repeat; /* 不重复 */
  background-position: center;  /* 背景图居中显示 */
  background-color: #e0f7fa; /* 默认背景色（用于填充背景图留下的空白区域） */
  overflow: hidden;
}


.page-title {
  z-index: 2;
  color: #333;
  margin-bottom: 30px;
  position: absolute;
  /* 调整标题位置，使其在冰箱背景图的顶部区域 */
  top: 2vh; /* 使用 vh 保持相对高度 */
  left: 50%;
  transform: translateX(-50%); /* 水平居中 */
  white-space: nowrap; /* 防止标题文字换行 */
  font-size: 2em; /* 调整字体大小 */
}

.food-items-placement-area {
  position: absolute;
  width: 40vw;
  height: 60vh;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 先居中整个区域 */

  z-index: 1;
  pointer-events: auto;
}

/* 食物图片样式和 back-button 保持不变 */
.food-item {
  position: absolute;
  height: auto;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.food-item:hover {
  transform: scale(1.1);
}

.back-button {
  margin-top: 20px;
  padding: 12px 25px;
  font-size: 18px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 2;
  position: absolute;
  bottom: 5vh; /* 使用 vh 保持相对高度 */
}

.back-button:hover {
  background-color: #45a049;
}
</style>
