<template>
  <div class="fridge-interior-view">
    <h2 class="page-title animated-title">
      食物会到处乱飞的冰箱<br />说明了冰箱狗熊乱扔食物！！
    </h2>

    <div class="food-items-placement-area">
      <img
        v-for="food in foodItems"
        :key="food.type"
        :src="getPublicImagePath(food.imgName)"
        :alt="food.alt"
        class="food-item animated-food-item"
        :style="{ left: food.left, top: food.top, width: food.width }"
        @click="handleFoodClick(food.type)"
      />
    </div>

    <button @click="goBackToHome" class="back-button animated-button">返回首页</button>
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
    top: '12%', // 相对于 food-items-placement-area 的上边距
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
  background-image: v-bind("`url(${getPublicImagePath('fridge-interior-background.png')})`");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  /* 粉色から水色へのグラデーションを背景画像の上に重ねる */
  background-color: #f0f8ff; /* 背景画像がない場合のフォールバックカラー */
  background-blend-mode: normal; /* デフォルトのブレンドモード */
  /* グラデーションを疑似要素として追加 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(255, 205, 210, 0.5), rgba(187, 223, 251, 0.5)); /* 半透明のグラデーション */
    z-index: 0; /* 背景画像より手前、食品より奥 */
    pointer-events: none; /* クリックイベントを透過 */
  }

  overflow: hidden;
}

.food-items-placement-area {
  position: absolute;
  width: 40vw;
  height: 60vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  pointer-events: auto;
}


.page-title {
  z-index: 2;
  /* 调整标题颜色和阴影，使其更醒目 */
  color: #2c3e50; /* 深灰色，更具质感 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* 增加阴影，使其浮动感更强 */
  font-family: 'Comic Sans MS', 'Arial', sans-serif; /* 保持原有的活泼字体 */
  font-weight: bold; /* 加粗 */
  text-align: center; /* 确保文字居中 */

  margin-bottom: 30px;
  position: absolute;
  top: 2vh;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 2.2em; /* 稍微增大字体，更具冲击力 */
  letter-spacing: 1px; /* 增加字母间距 */
}

/* 标题入场动画 */
.animated-title {
  animation: slideInDown 1s ease-out forwards;
  opacity: 0;
}

.food-items-placement-area {
  position: absolute;
  width: 40vw;
  height: 60vh;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 1;
  pointer-events: auto;
}

.food-item {
  position: absolute;
  height: auto;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, opacity 0.5s ease; /* 增加透明度动画 */
  /* 为食物项添加阴影，使其看起来更有立体感，从背景中“浮现” */
  filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.3)); /* 投射阴影 */
}

.food-item:hover {
  transform: scale(1.15) rotate(5deg); /* 增加旋转效果，更生动 */
}

/* 食物入场动画 */
.animated-food-item {
  animation: popIn 0.8s ease-out forwards;
  opacity: 0;
}
/* 为每个食物项设置不同的动画延迟，让它们依次出现 */
.food-item:nth-child(1) { animation-delay: 0.5s; }
.food-item:nth-child(2) { animation-delay: 0.7s; }
.food-item:nth-child(3) { animation-delay: 0.9s; }
.food-item:nth-child(4) { animation-delay: 1.1s; }


.back-button {
  margin-top: 20px;
  padding: 14px 30px; /* 增大按钮 */
  font-size: 1.2em; /* 增大字体 */
  background-color: #6a1b9a; /* 更深、更有活力的紫色 */
  color: white;
  border: none;
  border-radius: 25px; /* 更圆润的按钮 */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  z-index: 2;
  position: absolute;
  bottom: 5vh;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); /* 按钮阴影 */
}

.back-button:hover {
  background-color: #4a148c; /* 鼠标悬停时的深紫色 */
  transform: translateY(-3px) scale(1.05); /* 提升并稍微放大 */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3); /* 鼠标悬停时阴影更明显 */
}

/* 按钮入场动画 */
.animated-button {
  animation: fadeInFromBottom 1s ease-out forwards;
  opacity: 0;
  animation-delay: 1.5s; /* 延迟出现 */
}


/* 动画定义 */
@keyframes slideInDown {
  from {
    transform: translate(-50%, -100px);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

@keyframes popIn {
  from {
    transform: scale(0.5) translate(-50%, -50%); /* 确保居中后从缩小状态出现 */
    opacity: 0;
  }
  to {
    transform: scale(1) translate(-50%, -50%);
    opacity: 1;
  }
}

@keyframes fadeInFromBottom {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}


/* 响应式调整（可以在此处添加或修改） */
@media (max-width: 768px) {
  .page-title {
    font-size: 1.8em; /* 移动端标题小一些 */
    white-space: normal; /* 允许换行 */
    top: 5vh; /* 调整位置 */
  }
  .food-items-placement-area {
    width: 60vw; /* 移动端食物区域大一些 */
    height: 50vh;
  }
  .back-button {
    bottom: 3vh;
    padding: 10px 20px;
    font-size: 1em;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.5em;
  }
  .food-items-placement-area {
    width: 70vw;
    height: 45vh;
  }
}
</style>
