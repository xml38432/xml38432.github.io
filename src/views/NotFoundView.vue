<template>
  <div class="not-found-view">
    <h2 class="code">404</h2>
    <p>抱歉，你访问的页面不存在：<code>{{ route.fullPath }}</code></p>
    <div class="actions">
      <button @click="goBack">← 返回上一页</button>
      <RouterLink class="btn-link" :to="{ name: 'Home' }">返回首页</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.not-found-view {
  text-align: center;
  padding: 80px 32px;
}

.code {
  font-size: 120px;
  font-weight: bold;
  color: #f44336;
  margin: 0 0 24px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

#app.dark .code {
  color: #ef5350;
}

.not-found-view p {
  color: #666;
  font-size: 16px;
  margin-bottom: 32px;
}

#app.dark .not-found-view p {
  color: #aaa;
}

.not-found-view code {
  background: #f0f0f0;
  padding: 4px 8px;
  border-radius: 4px;
  color: #e91e63;
  font-family: monospace;
}

#app.dark .not-found-view code {
  background: #2d2d2d;
  color: #f48fb1;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

button {
  padding: 10px 20px;
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

.btn-link {
  display: inline-block;
  padding: 10px 20px;
  background: #2196F3;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.btn-link:hover {
  background: #0b7dda;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.btn-link:active {
  transform: translateY(0);
}
</style>
