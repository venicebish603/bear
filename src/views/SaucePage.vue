<template>
  <div class="sauce-page">
    <h1>为你播放特别的视频！</h1>
    <p class="description">希望这个视频能给你带来快乐~</p>

    <div class="video-container">
      <iframe
        width="640"
        height="360"
        src="https://www.youtube.com/embed/HFZUAXhdnHk?si=h54meGblPLcDS9Uz&autoplay=1&controls=0"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>

    <button @click="goBackToFridge" class="back-button">返回冰箱</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goBackToFridge = () => {
  router.push('/fridge-interior'); // 返回冰箱内部视图
};
</script>

<style scoped>
.sauce-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #fce4ec; /* 柔和的背景色 */
  padding: 20px;
  text-align: center;
}

h1 {
  color: #d81b60; /* 标题颜色 */
  margin-bottom: 15px;
  font-size: 2.5em;
}

.description {
  color: #4a148c; /* 描述文字颜色 */
  margin-bottom: 30px;
  font-size: 1.2em;
}

.video-container {
  position: relative;
  width: 80%; /* 视频容器宽度，可调整 */
  padding-bottom: 45%; /* 保持 16:9 比例 (height / width * 100%) */
  height: 0;
  overflow: hidden;
  background-color: #000; /* 视频加载前的背景色 */
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.back-button {
  margin-top: 40px;
  padding: 12px 25px;
  font-size: 18px;
  background-color: #007bff; /* 按钮颜色 */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #0056b3;
}
</style>
