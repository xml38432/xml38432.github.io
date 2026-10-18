<template>
  <div class="articles-view">
    <h2 class="page-title">文章中心</h2>
    <p class="hint">分享技术经验和学习心得</p>
    <div class="view-switch">
      <RouterLink :to="{ name: 'ArticleList' }">📄文章列表</RouterLink>
    </div>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.articles-view {
  padding: 32px;
}

.page-title {
  color: #2c3e50;
  font-size: 28px;
  margin-bottom: 8px;
}

#app.dark .page-title {
  color: #e0e0e0;
}

.hint {
  color: #666;
  margin-bottom: 16px;
  font-size: 14px;
}

#app.dark .hint {
  color: #aaa;
}

.view-switch {
  margin: 16px 0;
}

.view-switch a {
  display: inline-block;
  padding: 8px 16px;
  margin-right: 8px;
  border-radius: 6px;
  text-decoration: none;
  color: #2196F3;
  background: #f0f0f0;
  transition: all 0.3s ease;
}

#app.dark .view-switch a {
  background: #3a3a3a;
  color: #64B5F6;
}

.view-switch a:hover {
  background: #2196F3;
  color: white;
  transform: translateY(-1px);
}

.view-switch a.router-link-exact-active {
  background: #2196F3;
  color: white;
  font-weight: bold;
}
</style>
