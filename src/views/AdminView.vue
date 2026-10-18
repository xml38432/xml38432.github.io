<template>
  <div class="admin-view">
    <h2 class="page-title">后台管理</h2>
    <p class="hint">
      当前登录用户：{{ displayName }}（后台管理需要登录，普通访客无法进入内容修改页面）
    </p>

    <div class="admin-body">
      <!-- 左侧管理菜单：命名路由 + 导航高亮 -->
      <aside class="admin-side">
        <RouterLink :to="{ name: 'AdminProfile' }">📝 个人简介编辑</RouterLink>
        <RouterLink :to="{ name: 'AdminProjects' }">📦 项目信息管理</RouterLink>
        <RouterLink :to="{ name: 'AdminArticles' }">✍️ 文章管理</RouterLink>
        <button class="btn-danger btn-small" @click="handleLogout">退出登录</button>
      </aside>

      <!-- 管理子路由出口 -->
      <div class="admin-main">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/useUserStore'

const router = useRouter()

// 使用 Pinia 用户 Store 替代实验三中的 localStorage 读取
const userStore = useUserStore()
const { username } = storeToRefs(userStore)

onMounted(() => {
  userStore.initializeUser()
})

const displayName = computed(() => username.value || '未知用户')

const handleLogout = () => {
  // 使用 useUserStore 的 logout 方法
  userStore.logout()
  console.log('[退出登录] 已清除登录状态')
  // 退出后回到公开首页
  router.replace({ name: 'Home' })
}
</script>

<style scoped>
.admin-view {
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
  margin-bottom: 24px;
  font-size: 14px;
}

#app.dark .hint {
  color: #aaa;
}

.admin-body {
  display: flex;
  gap: 24px;
}

.admin-side {
  flex: 0 0 200px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.admin-side a {
  display: block;
  padding: 12px 16px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  text-decoration: none;
  color: #2c3e50;
  transition: all 0.3s ease;
}

#app.dark .admin-side a {
  background: #3a3a3a;
  border-color: #555;
  color: #e0e0e0;
}

.admin-side a:hover {
  background: #f0f0f0;
  border-color: #4CAF50;
  transform: translateX(4px);
}

#app.dark .admin-side a:hover {
  background: #4a4a4a;
}

.admin-side a.router-link-exact-active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
  font-weight: bold;
}

.btn-small {
  padding: 8px 12px;
  font-size: 13px;
  margin-top: 8px;
}

.btn-danger {
  background: #f44336;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-danger:hover {
  background: #da190b;
  transform: translateX(0);
}

.admin-main {
  flex: 1;
}
</style>
