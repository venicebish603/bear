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
  left: 20vm;
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

/* 当冰箱打开图片显示时，可能需要调整位置或大小以匹配 */
/* .fridge-opened {
  // 如果打开和关闭的冰箱图片大小或定位不同，可以在这里微调
  // 例如：transform: translateY(-50%) scale(1.05);
} */

/* 可以为整个场景添加过渡效果（可选）*/
.scene-interacting {
  filter: brightness(0.8);
  transition: filter 2s ease-in-out;
}
</style>
