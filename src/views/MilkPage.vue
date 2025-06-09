<template>
  <div class="milk-page">
    <h1 class="page-title">GUESS IT!</h1>
    <p class="page-description">actually a tracker for milk...useless!</p>

    <div class="game-link-area" @click="navigateToGame">
      <img
        :src="getPublicImagePath('milk-bottle.png')"
        alt="点击玩小游戏"
        class="milk-game-icon"
      />
      <p class="game-link-text">わたし DIFFERENT</p>
    </div>

    <div class="add-milk-form">
      <input
        v-model="newMilkName"
        placeholder="牛奶名称 (例: 全脂牛奶)"
        class="milk-input"
      />
      <input
        type="date"
        v-model="newExpiryDate"
        class="milk-input"
        :min="todayDate"
      />
      <button @click="addMilk" :disabled="!newMilkName || !newExpiryDate" class="add-button">
        添加牛奶
      </button>
    </div>

    <div class="milk-list">
      <div v-if="milkItems.length === 0" class="no-milk-message">
        你的牛奶清单空空如也，快去添加一些吧！
      </div>
      <transition-group name="milk-item-fade" tag="div">
        <div
          v-for="milk in sortedMilkItems"
          :key="milk.id"
          :class="['milk-item-card', getMilkStatusClass(milk)]"
        >
          <div class="milk-info">
            <span class="milk-name">{{ milk.name }}</span>
            <span class="milk-expiry">
              保质期至：{{ formatDisplayDate(milk.expiryDate) }}
              <span v-if="isExpired(milk.expiryDate)" class="status-tag expired">已过期</span>
              <span v-else-if="isExpiringSoon(milk.expiryDate)" class="status-tag expiring">即将过期</span>
              <span v-else-if="milk.isConsumed" class="status-tag consumed">已饮用/处理</span>
            </span>
          </div>
          <div class="milk-actions">
            <button
              v-if="!milk.isConsumed && !isExpired(milk.expiryDate)"
              @click="markAsConsumed(milk.id)"
              class="action-button mark-consumed"
            >
              已饮用/处理
            </button>
            <button @click="deleteMilk(milk.id)" class="action-button delete-milk">
              删除
            </button>
          </div>
        </div>
      </transition-group>
    </div>

    <button @click="goBackToFridge" class="back-button">返回冰箱</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

interface MilkItem {
  id: number;
  name: string;
  expiryDate: string; // YYYY-MM-DD 格式
  isConsumed: boolean;
}

const router = useRouter();
const base = import.meta.env.BASE_URL;

const newMilkName = ref('');
const newExpiryDate = ref(''); // YYYY-MM-DD
const milkItems = ref<MilkItem[]>([]);

// 获取今天日期的 YYYY-MM-DD 格式，用于日期选择器的最小值
const todayDate = computed(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
});

// 计算属性，用于排序牛奶列表：未处理的、即将过期的优先，然后是按日期排序
const sortedMilkItems = computed(() => {
  return [...milkItems.value].sort((a, b) => {
    // 已处理的排在后面
    if (a.isConsumed && !b.isConsumed) return 1;
    if (!a.isConsumed && b.isConsumed) return -1;

    // 已过期和即将过期的优先
    const aExpired = isExpired(a.expiryDate);
    const bExpired = isExpired(b.expiryDate);
    const aExpiringSoon = isExpiringSoon(a.expiryDate);
    const bExpiringSoon = isExpiringSoon(b.expiryDate);

    if (aExpired && !bExpired) return -1;
    if (!aExpired && bExpired) return 1;
    if (aExpiringSoon && !bExpiringSoon) return -1;
    if (!aExpiringSoon && bExpiringSoon) return 1;

    // 否则按保质期日期升序排序
    return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
  });
});

const getPublicImagePath = (imageName: string) => {
  return `${base}images/${imageName}`;
};

// 加载牛奶数据
const loadMilkItems = () => {
  const stored = localStorage.getItem('milkTrackerItems');
  if (stored) {
    milkItems.value = JSON.parse(stored);
  }
};

// 保存牛奶数据
const saveMilkItems = () => {
  localStorage.setItem('milkTrackerItems', JSON.stringify(milkItems.value));
};

// 添加牛奶
const addMilk = () => {
  if (newMilkName.value.trim() && newExpiryDate.value) {
    const newMilk: MilkItem = {
      id: Date.now(),
      name: newMilkName.value.trim(),
      expiryDate: newExpiryDate.value,
      isConsumed: false,
    };
    milkItems.value.push(newMilk);
    saveMilkItems();
    newMilkName.value = '';
    newExpiryDate.value = ''; // 清空日期
  }
};

// 标记为已饮用/处理
const markAsConsumed = (id: number) => {
  const milk = milkItems.value.find(item => item.id === id);
  if (milk) {
    milk.isConsumed = !milk.isConsumed; // 切换状态
    saveMilkItems();
  }
};

// 删除牛奶
const deleteMilk = (id: number) => {
  if (confirm('确定要删除这瓶牛奶的记录吗？')) {
    milkItems.value = milkItems.value.filter(item => item.id !== id);
    saveMilkItems();
  }
};

// 检查是否已过期
const isExpired = (expiryDate: string): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 设为当天的开始
  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0); // 设为过期日的开始
  return expiry.getTime() < today.getTime();
};

// 检查是否即将过期（例如：三天内）
const isExpiringSoon = (expiryDate: string): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);

  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 向上取整，不足一天也算一天

  return diffDays <= 3 && diffDays >= 0 && !isExpired(expiryDate); // 3天内且未过期
};

// 根据牛奶状态返回 CSS 类
const getMilkStatusClass = (milk: MilkItem) => {
  if (milk.isConsumed) {
    return 'status-consumed';
  } else if (isExpired(milk.expiryDate)) {
    return 'status-expired';
  } else if (isExpiringSoon(milk.expiryDate)) {
    return 'status-expiring-soon';
  }
  return 'status-fresh'; // 默认新鲜状态
};

// 格式化日期显示
const formatDisplayDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
};


// 跳转到小游戏
const navigateToGame = () => {
  window.open('https://theuselessweb.com/', '_blank'); // 在新标签页打开
};

// 组件加载时加载数据
onMounted(() => {
  loadMilkItems();
});

// 返回冰箱内部视图
const goBackToFridge = () => {
  router.push('/fridge-interior');
};
</script>

<style scoped>
.milk-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #e0f7fa, #bbdefb); /* 清新的淡蓝色渐变 */
  color: #212121;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  box-sizing: border-box;
}

.page-title {
  color: #1a237e;
  margin-bottom: 10px;
  font-size: 3em;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.page-description {
  color: #424242;
  margin-bottom: 30px;
  font-size: 1.1em;
}

.game-link-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.game-link-area:hover {
  transform: translateY(-5px);
}

.milk-game-icon {
  width: 120px; /* 牛奶图片大小 */
  height: auto;
  margin-bottom: 10px;
  border-radius: 50%; /* 如果图片背景透明，可以尝试圆形效果 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.game-link-text {
  color: #3f51b5; /* 蓝色链接文字 */
  font-weight: bold;
  font-size: 1.1em;
}

.add-milk-form {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 25px;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-wrap: wrap; /* 允许在小屏幕上换行 */
  justify-content: center; /* 居中表单项 */
  gap: 15px; /* 表单项间距 */
  margin-bottom: 40px;
}

.milk-input {
  flex-grow: 1; /* 允许输入框填充可用空间 */
  min-width: 150px; /* 最小宽度 */
  padding: 12px 15px;
  border: 1px solid #c5cae9; /* 淡紫色边框 */
  border-radius: 8px;
  font-size: 1em;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.milk-input:focus {
  border-color: #3f51b5; /* 蓝色焦点边框 */
  box-shadow: 0 0 0 3px rgba(63, 81, 181, 0.2);
  outline: none;
}

.add-button {
  background-color: #4caf50; /* 绿色添加按钮 */
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.add-button:hover:not(:disabled) {
  background-color: #43a047;
  transform: translateY(-2px);
}

.add-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.milk-list {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.no-milk-message {
  text-align: center;
  color: #757575;
  font-style: italic;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.milk-item-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* 允许在小屏幕上换行 */
  gap: 10px; /* 卡片内部元素间距 */
  transition: all 0.3s ease; /* 用于状态变化时的过渡 */
}

.milk-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 信息左对齐 */
  flex-grow: 1;
}

.milk-name {
  font-size: 1.2em;
  font-weight: bold;
  color: #212121;
}

.milk-expiry {
  font-size: 0.9em;
  color: #616161;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 5px;
}

.status-tag {
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 0.75em;
  font-weight: bold;
  color: white;
  white-space: nowrap; /* 防止标签换行 */
}

.status-tag.expired {
  background-color: #e53935; /* 深红色 */
}

.status-tag.expiring {
  background-color: #ffb300; /* 橙色 */
}

.status-tag.consumed {
  background-color: #9e9e9e; /* 灰色 */
}

/* 根据状态改变卡片背景和边框 */
.milk-item-card.status-consumed {
  background-color: #f5f5f5;
  border-left: 5px solid #9e9e9e;
  opacity: 0.7;
}

.milk-item-card.status-expired {
  background-color: #ffebee; /* 浅红色背景 */
  border-left: 5px solid #e53935;
}

.milk-item-card.status-expiring-soon {
  background-color: #fffde7; /* 浅黄色背景 */
  border-left: 5px solid #ffb300;
}

.milk-actions {
  display: flex;
  gap: 8px;
}

.action-button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  font-size: 0.9em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-button.mark-consumed {
  background-color: #2196f3; /* 蓝色 */
  color: white;
}

.action-button.mark-consumed:hover {
  background-color: #1976d2;
}

.action-button.delete-milk {
  background-color: #f44336; /* 红色 */
  color: white;
}

.action-button.delete-milk:hover {
  background-color: #d32f2f;
}

/* 列表项进入/离开动画 */
.milk-item-fade-enter-active,
.milk-item-fade-leave-active {
  transition: all 0.5s ease;
}
.milk-item-fade-enter-from,
.milk-item-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.milk-item-fade-leave-active {
  position: absolute;
  width: calc(100% - 40px); /* 减去父容器的 padding */
  max-width: 600px; /* 与 milk-list 的 max-width 匹配 */
}


.back-button {
  margin-top: 40px;
  padding: 12px 25px;
  font-size: 18px;
  background-color: #3f51b5; /* 蓝色按钮 */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.back-button:hover {
  background-color: #303f9f;
}

/* 响应式调整 */
@media (max-width: 600px) {
  .page-title {
    font-size: 2.5em;
  }
  .add-milk-form {
    flex-direction: column; /* 表单项垂直堆叠 */
    gap: 10px;
    padding: 20px;
  }
  .milk-input {
    width: 100%;
    min-width: unset;
  }
  .add-button {
    width: 100%;
  }
  .milk-item-card {
    flex-direction: column; /* 卡片内容垂直堆叠 */
    align-items: flex-start;
    padding: 15px;
  }
  .milk-actions {
    width: 100%;
    justify-content: flex-start; /* 按钮左对齐 */
    margin-top: 10px;
  }
  .action-button {
    flex-grow: 1; /* 按钮填充宽度 */
  }
  .milk-list {
    max-width: 95%;
  }
}
</style>
