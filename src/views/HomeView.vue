<template>
  <div class="home-container" :class="{ 'scene-interacting': isInteracting }">
    <img
      src="/images/bear.png"
      alt="一只熊"
      class="bear-image"
      :class="{ 'bear-move': isInteracting }"
      @click="handleBearClick"
    />

    <img
      v-if="!isInteracting"
      src="/images/fridge.png"
      alt="一个关着的冰箱"
      class="fridge-image"
    />
    <img
      v-else
      src="/images/fridge-open.png"
      alt="一个打开的冰箱"
      class="fridge-image fridge-opened"
    />

    <div class="once-a-week-text" :class="{ 'text-hidden': isInteracting }">
      a bear with fridge...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isInteracting = ref(false); // 控制动画状态

const handleBearClick = () => {
  if (isInteracting.value) return; // 避免重复点击
  isInteracting.value = true; // 设置状态为正在交互，触发熊的移动和冰箱图片切换

  // 假设熊的移动动画持续 1.5 秒
  const bearMoveDuration = 1500;

  // 在熊移动动画结束后（或略晚一点），进行页面跳转
  setTimeout(() => {
    router.push('/fridge-interior');
  }, bearMoveDuration + 300); // 预留 300ms 观察冰箱打开效果
};
</script>

<style scoped>
.home-container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f4c3;
  overflow: hidden;
}

.bear-image {
  position: absolute;
  left: 20%; /* 使用百分比，更响应式 */
  top: 50%;
  transform: translateY(-50%);
  width: 25vmax;
  height: auto;
  cursor: pointer;
  z-index: 2; /* 确保熊在冰箱上方 */
  transition: left 1.5s ease-in-out; /* 熊移动的过渡动画，时间可以根据效果调整 */
}

.fridge-image {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  width: 39vmax; /* 示例宽度，根据你的图片调整 */
  height: auto;
  z-index: 1; /* 冰箱在熊下方 */
  /* 为了切换时的平滑效果，可以添加一个透明度过渡 */
  transition: opacity 0.3s ease-in-out;
}

/* 熊移动到的新位置 */
.bear-move {
  left: 45%; /* 熊移动到冰箱旁边 */
}

/* 可以为整个场景添加过渡效果（可选）*/
.scene-interacting {
  filter: brightness(0.8);
  transition: filter 2s ease-in-out;
}

/* once a week 文字样式 */
.once-a-week-text {
  position: absolute;
  /* 调整文字位置，使其在冰箱和熊附近，例如冰箱顶部偏左 */
  top: 10%;
  left: 60%; /* 根据冰箱和熊的位置调整 */
  transform: translate(-50%, -50%); /* 确保文字中心点在指定位置 */
  font-family: 'Comic Sans MS', cursive, sans-serif; /* 可以选择活泼的字体 */
  font-size: 2.5vmax; /* 响应式字体大小 */
  font-weight: bold;
  color: #8d6e63; /* 深棕色，与熊和冰箱颜色搭配 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* 添加阴影增加立体感 */
  z-index: 3; /* 确保在最上层 */
  transition: opacity 0.5s ease-out; /* 添加消失动画 */
  white-space: nowrap; /* 防止文字换行 */
}

/* 文字在交互时隐藏 */
.once-a-week-text.text-hidden {
  opacity: 0;
  pointer-events: none; /* 隐藏时禁用点击事件 */
}


/* 响应式调整 */
@media (max-width: 768px) {
  .bear-image {
    width: 35vmax;
  }
  .fridge-image {
    width: 50vmax;
  }
  .bear-move {
    left: 40%;
  }
  .once-a-week-text {
    font-size: 3vmax;
    top: 25%; /* 移动端位置微调 */
    left: 55%;
  }
}

@media (max-width: 480px) {
  .bear-image {
    width: 45vmax;
  }
  .fridge-image {
    width: 60vmax;
  }
  .bear-move {
    left: 35%;
  }
  .once-a-week-text {
    font-size: 4vmax;
    top: 20%;
    left: 50%;
  }
}
</style>
