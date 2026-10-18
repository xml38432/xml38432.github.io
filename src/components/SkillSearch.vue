<template>
  <div class="search-box">
    <label for="keyword">技能搜索：</label>
    <input
      id="keyword"
      type="text"
      v-model="modelValue"
      placeholder="例如: Vue / 前端 / Git"
    >
    <button @click="handleClear" :disabled="!modelValue">清空</button>
  </div>
</template>

<script setup>
// 使用 defineModel 实现组件双向绑定
const modelValue = defineModel({
  type: String,
  default: ''
})

// 使用 defineEmits 定义向父组件发送的事件
const emit = defineEmits(['clear'])

// 方法
const handleClear = () => {
  modelValue.value = ''
  emit('clear')
  console.log('[SkillSearch] 已清空搜索关键词')
}
</script>

<style scoped>
/* ===== 搜索区域 ===== */
.search-box {
  margin: 24px 0;
  padding: 16px;
  background: #f0f0f0;
  border-radius: 8px;
}

#app.dark .search-box {
  background: #3a3a3a;
}

.search-box label {
  font-weight: bold;
  margin-right: 8px;
}

input[type="text"] {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s ease;
  background: white;
  color: #333;
}

#app.dark input[type="text"] {
  background: #2d2d2d;
  border-color: #555;
  color: #e0e0e0;
}

input[type="text"]:focus {
  outline: none;
  border-color: #4CAF50;
}

button {
  padding: 8px 16px;
  margin: 4px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  background: #4CAF50;
  color: white;
}

button:hover {
  background: #45a049;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

button:active {
  transform: translateY(0);
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
}

#app.dark button:disabled {
  background: #555;
  color: #888;
}
</style>
