<template>
  <div id="app" :class="theme">
    <PageHeader title="个人主页" subtitle="" />

    <div class="top-bar">
      <nav class="nav-bar">
        <RouterLink :to="{ name: 'Home' }">首页</RouterLink>
        <RouterLink :to="{ name: 'Projects' }">项目中心</RouterLink>
        <RouterLink :to="{ name: 'Articles' }">文章中心</RouterLink>
        <RouterLink :to="{ name: 'About' }">关于</RouterLink>
        <RouterLink v-if="isLoggedIn" :to="{ name: 'Admin' }">后台管理</RouterLink>
        <RouterLink v-else :to="{ name: 'Login' }">登录</RouterLink>
      </nav>
      <ThemeSwitcher :currentTheme="theme" @theme-change="handleThemeChange" />
    </div>

    <main class="main-content">
      <!-- 路由出口：匹配到的页面组件渲染在这里 -->
      <RouterView v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </RouterView>
    </main>

    <PageFooter author="谢美琳" year="2026" course="" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import PageHeader from './components/PageHeader.vue'
import PageFooter from './components/PageFooter.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import { useUserStore } from './stores/useUserStore'
import { storeToRefs } from 'pinia'

const theme = ref('light')

// 使用 Pinia 用户 Store 替代实验三中的局部 isLoggedIn 状态
const userStore = useUserStore()
const { isLoggedIn } = storeToRefs(userStore)

onMounted(() => {
  // 从 Store（localStorage）初始化登录状态
  userStore.initializeUser()

  // 监听storage事件，实现跨标签页同步登录状态
  window.addEventListener('storage', () => {
    userStore.initializeUser()
  })

  // 从 localStorage 恢复主题
  const savedTheme = localStorage.getItem('app-theme')
  if (savedTheme) {
    theme.value = savedTheme
  }
})

const handleThemeChange = (newTheme) => {
  theme.value = newTheme
  localStorage.setItem('app-theme', newTheme)
}
</script>

<style>
/* ===== 全局样式 ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  padding: 24px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* ===== 主题样式 ===== */
#app.light {
  background-color: #f5f5f5;
  color: #333;
  min-height: 100vh;
  padding: 24px;
}

#app.dark {
  background-color: #1a1a1a;
  color: #e0e0e0;
  min-height: 100vh;
  padding: 24px;
}

/* ===== 容器样式 ===== */
#app {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

#app.dark {
  background: #2d2d2d;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* ===== 顶部导航栏 ===== */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  border-bottom: 1px solid #e0e0e0;
  flex-wrap: wrap;
  gap: 12px;
}

#app.dark .top-bar {
  border-bottom-color: #444;
}

.nav-bar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.nav-bar a {
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  color: #2c3e50;
  transition: all 0.3s ease;
  font-size: 15px;
}

#app.dark .nav-bar a {
  color: #e0e0e0;
}

.nav-bar a:hover {
  background: #f0f0f0;
}

#app.dark .nav-bar a:hover {
  background: #3a3a3a;
}

/* 命名路由导航高亮 */
.nav-bar a.router-link-active {
  background: #e3f2fd;
  color: #2196F3;
}

#app.dark .nav-bar a.router-link-active {
  background: #1a3a52;
  color: #64B5F6;
}

.nav-bar a.router-link-exact-active {
  background: #2196F3;
  color: white;
  font-weight: bold;
}

/* ===== 主体内容区 ===== */
.main-content {
  min-height: 400px;
}

/* ===== 过渡动画 ===== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
