<template>
  <div class="fruit-page">
    <h1 class="greeting-title">
      <span class="highlight">Happy Birthday</span>
    </h1>
    <p class="greeting-message">oh my my</p>

    <div class="cake-gif-container">
      <img
        :src="getPublicImagePath('cake.gif')"
        alt="生日蛋糕动画"
        class="birthday-cake-gif"
      />
    </div>

    <div class="spotify-player-container">
      <h2 class="music-title">have fun!!!</h2>
      <iframe
        class="spotify-iframe"
        style="border-radius:12px"
        src="https://open.spotify.com/embed/track/6Hk2Y59I89sLbyOyOketHZ?utm_source=generator"
        width="100%"
        height="152" frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
      <p class="spotify-note">are u sure? are u ready?</p>
    </div>

    <button @click="goBackToFridge" class="back-button">返回冰箱</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const base = import.meta.env.BASE_URL; // 获取公共路径前缀

const getPublicImagePath = (imageName: string) => {
  return `${base}images/${imageName}`;
};

const goBackToFridge = () => {
  router.push('/fridge-interior');
};
</script>

<style scoped>
.fruit-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 40px 20px;
  /* 修改背景颜色为更柔和的粉蓝色渐变 */
  background: linear-gradient(135deg, #e0f7fa, #fce4ec);
  /* 修改文字颜色为深蓝色，更易于阅读 */
  color: #1a237e;
  font-family: 'Comic Sans MS', 'Arial', sans-serif;
  text-align: center;
  box-sizing: border-box;
}

.greeting-title {
  font-size: 4.5em;
  /* 移除原有的亮橙色 */
  margin-bottom: 20px;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  animation: bounceIn 1s ease-out forwards;
}

.highlight {
  font-weight: bold;
  /* 使用荧光蓝色和荧光粉色的渐变 */
  background: linear-gradient(45deg, #00ffff, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.greeting-message {
  font-size: 1.6em;
  /* 修改文字颜色为更深的颜色 */
  color: #311b92;
  margin-bottom: 40px;
  animation: fadeIn 1.5s ease-out forwards;
  animation-delay: 0.5s;
  opacity: 0;
}

.media-display-area {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 40px;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.cake-gif-container {
  flex-basis: 45%;
  max-width: 400px;
  min-width: 280px;
  margin: 0;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  padding: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: slideInUp 1.2s ease-out forwards;
  animation-delay: 1s;
  opacity: 0;
}

.birthday-cake-gif {
  width: 85%;
  height: auto;
  display: block;
  border-radius: 10px;
}

.spotify-player-container {
  flex-basis: 45%;
  max-width: 500px;
  min-width: 280px;
  margin: 35px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  animation: fadeIn 1.8s ease-out forwards;
  animation-delay: 1.5s;
  opacity: 0;
}

.music-title {
  font-size: 1.8em;
  /* 修改标题颜色为深蓝色 */
  color: #311b92;
  margin-bottom: 15px;
}

.spotify-iframe {
  width: 100%;
  height: 152px;
  border: none;
  background-color: #f7f7f7;
}

.spotify-note {
  font-size: 0.9em;
  /* 修改文字颜色为更深的颜色 */
  color: #4527a0;
  margin-top: 10px;
}

.back-button {
  margin-top: 20px;
  padding: 12px 30px;
  font-size: 1.2em;
  /* 修改按钮颜色为紫色 */
  background-color: #5e35b1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.back-button:hover {
  background-color: #4527a0;
  transform: translateY(-3px);
}

/* 动画定义 (保持不变) */
@keyframes bounceIn {
  0%, 20%, 40%, 60%, 80%, 100% {
    -webkit-transition-timing-function: cubic-bezier(0.215, .61, .355, 1);
    transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
  }
  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3)
  }
  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1)
  }
  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9)
  }
  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03)
  }
  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97)
  }
  100% {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInUp {
  from {
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

/* 响应式调整 (保持不变) */
@media (max-width: 768px) {
  .media-display-area {
    flex-direction: column;
    gap: 30px;
  }

  .cake-gif-container,
  .spotify-player-container {
    flex-basis: 100%;
    max-width: 90%;
    margin-bottom: 0;
  }

  .greeting-title {
    font-size: 3em;
  }

  .greeting-message {
    font-size: 1.2em;
  }

  .spotify-player-container {
    padding: 15px;
  }

  .music-title {
    font-size: 1.5em;
  }

  .back-button {
    font-size: 1em;
    padding: 10px 20px;
  }
}
</style>
