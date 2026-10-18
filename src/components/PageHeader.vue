<template>
  <header class="page-header">
    <div class="header-content">
      <h1 class="header-title">{{ title }}</h1>
      <p class="header-subtitle" v-if="subtitle">{{ subtitle }}</p>
    </div>
  </header>
</template>

<script setup>
// 使用 defineProps 接收父组件传递的数据
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 32px 32px 24px;
  color: white;
  text-align: center;
}

#app.dark .page-header {
  background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.header-title {
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: white;
}

.header-subtitle {
  font-size: 16px;
  margin: 0;
  opacity: 0.9;
}
</style>
