<template>
  <div class="cheese-page">
    <h1 class="page-title">奶酪留言板</h1>
    <p class="page-description">在这里留下你的祝福或想说的话吧！</p>

    <div class="message-input-area">
      <textarea
        v-model="newMessageContent"
        placeholder="写下你的留言..."
        rows="4"
        class="message-textarea"
      ></textarea>
      <button @click="addMessage" :disabled="!newMessageContent.trim()" class="submit-button">
        留下留言
      </button>
    </div>

    <div class="messages-list">
      <div v-if="messages.length === 0" class="no-messages">
        目前还没有留言，快来成为第一个吧！
      </div>
      <transition-group name="message-fade" tag="div">
        <div v-for="message in messages" :key="message.id" class="message-card">
          <p class="message-content">{{ message.content }}</p>
          <div class="message-meta">
            <span class="message-time">{{ formatTime(message.timestamp) }}</span>
            <button @click="deleteMessage(message.id)" class="delete-button" title="删除留言">
              &times;
            </button>
          </div>
        </div>
      </transition-group>
    </div>

    <button @click="goBackToFridge" class="back-button">返回冰箱</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// 定义留言数据结构
interface Message {
  id: number;
  content: string;
  timestamp: number; // 存储时间戳，便于排序和格式化
}

const router = useRouter();
const newMessageContent = ref('');
const messages = ref<Message[]>([]); // 存储所有留言的数组

// 获取 localStorage 中的留言数据
const loadMessages = () => {
  const storedMessages = localStorage.getItem('cheeseGuestbookMessages');
  if (storedMessages) {
    messages.value = JSON.parse(storedMessages).sort(
      (a: Message, b: Message) => b.timestamp - a.timestamp // 按时间倒序排列，最新留言在前
    );
  }
};

// 保存留言数据到 localStorage
const saveMessages = () => {
  localStorage.setItem('cheeseGuestbookMessages', JSON.stringify(messages.value));
};

// 添加新留言
const addMessage = () => {
  if (newMessageContent.value.trim()) {
    const newMessage: Message = {
      id: Date.now(), // 使用当前时间戳作为唯一ID
      content: newMessageContent.value.trim(),
      timestamp: Date.now(),
    };
    messages.value.unshift(newMessage); // 将新留言添加到数组开头
    saveMessages();
    newMessageContent.value = ''; // 清空输入框
  }
};

// 删除留言
const deleteMessage = (id: number) => {
  if (confirm('确定要删除这条留言吗？')) {
    messages.value = messages.value.filter(msg => msg.id !== id);
    saveMessages();
  }
};

// 格式化时间戳
const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // 24小时制
  });
};

// 组件加载时加载留言
onMounted(() => {
  loadMessages();
});

// 返回冰箱内部视图
const goBackToFridge = () => {
  router.push('/fridge-interior');
};
</script>

<style scoped>
.cheese-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #fceabb, #f8b500); /* 渐变背景，暖色调 */
  color: #333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
}

.page-title {
  color: #8b4513; /* 深棕色标题 */
  margin-bottom: 15px;
  font-size: 3em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.page-description {
  color: #5a2d0b; /* 稍浅的棕色描述 */
  margin-bottom: 30px;
  font-size: 1.2em;
  text-align: center;
}

.message-input-area {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  padding: 25px;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 40px;
}

.message-textarea {
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  resize: vertical; /* 允许垂直拖动调整大小 */
  box-sizing: border-box; /* 确保 padding 不增加总宽度 */
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.message-textarea:focus {
  border-color: #f8b500;
  box-shadow: 0 0 0 3px rgba(248, 181, 0, 0.2);
  outline: none;
}

.submit-button {
  background-color: #f8b500; /* 亮黄色按钮 */
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  align-self: flex-end; /* 让按钮靠右对齐 */
}

.submit-button:hover:not(:disabled) {
  background-color: #e0a200;
  transform: translateY(-2px);
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.messages-list {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.no-messages {
  text-align: center;
  color: #777;
  font-style: italic;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.message-card {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative; /* 用于删除按钮定位 */
}

.message-content {
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 10px;
  color: #444;
  word-break: break-word; /* 防止长单词溢出 */
}

.message-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85em;
  color: #888;
  border-top: 1px solid #eee;
  padding-top: 10px;
  margin-top: auto; /* 确保时间在底部 */
}

.message-time {
  /* 可以在这里调整时间文字样式 */
}

.delete-button {
  background: none;
  border: none;
  color: #ff6347; /* 醒目的删除颜色 */
  font-size: 1.5em;
  cursor: pointer;
  padding: 0 5px;
  transition: color 0.3s ease;
  line-height: 1; /* 确保按钮垂直居中 */
}

.delete-button:hover {
  color: #cc0000;
}

/* 留言进入/离开动画 */
.message-fade-enter-active,
.message-fade-leave-active {
  transition: all 0.5s ease;
}
.message-fade-enter-from,
.message-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
/* 确保离开的元素不会影响后续元素的布局 */
.message-fade-leave-active {
  position: absolute;
  width: 100%; /* 离开时保持宽度 */
  max-width: 600px;
}

.back-button {
  margin-top: 40px;
  padding: 12px 25px;
  font-size: 18px;
  background-color: #8b4513; /* 与标题颜色协调 */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.back-button:hover {
  background-color: #6a2e0b;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.5em;
  }
  .page-description {
    font-size: 1em;
  }
  .message-input-area,
  .messages-list {
    max-width: 95%; /* 适应小屏幕 */
  }
  .message-textarea {
    min-height: 80px;
  }
}
</style>
