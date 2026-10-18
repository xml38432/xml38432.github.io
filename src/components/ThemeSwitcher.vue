<template>
  <div class="theme-switcher">
    <button @click="switchTheme" :style="buttonStyle">
      {{ currentTheme === 'light' ? '🌙 切换到暗色' : '☀️ 切换到亮色' }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// 使用 defineProps 接收父组件传递的数据
const props = defineProps({
  currentTheme: {
    type: String,
    required: true,
    validator: (value) => ['light', 'dark'].includes(value)
  }
})

// 使用 defineEmits 定义向父组件发送的事件
const emit = defineEmits(['theme-change'])

// 计算属性
const buttonStyle = computed(() => ({
  background: props.currentTheme === 'light' ? '#333' : '#fff',
  color: props.currentTheme === 'light' ? '#fff' : '#333',
  padding: '8px 16px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'all 0.3s ease'
}))

// 方法
const switchTheme = () => {
  const newTheme = props.currentTheme === 'light' ? 'dark' : 'light'
  // 使用 emit 向父组件发送事件
  emit('theme-change', newTheme)
  console.log(`[ThemeSwitcher] 发送主题切换事件：${newTheme}`)
}
</script>

<style scoped>
.theme-switcher {
  text-align: right;
  margin-bottom: 16px;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

button:active {
  transform: translateY(0);
}
</style>
