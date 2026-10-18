<template>
  <div class="login-view">
    <h2 class="page-title">身份认证</h2>
    <p class="hint">
      后台管理页面需要登录后才能访问；公开展示页面（首页、项目中心、关于）可直接浏览。
    </p>

    <form class="edit-form login-form" @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">用户名：</label>
        <input id="username" type="text" v-model.trim="username" placeholder="请输入账号：Xml38432" />
      </div>
      <div class="form-group">
        <label for="password">密码：</label>
        <input id="password" type="password" v-model.trim="password" placeholder="演示密码:123456" />
      </div>

      <p class="error" v-if="error">{{ error }}</p>

      <div>
        <button type="submit">登录</button>
        <button type="button" class="btn-secondary" @click="goHome">返回首页</button>
      </div>

      <p class="tip">提示：账号 Xml38432 + 密码 123456 即可登录（本实验为前端模拟登录）。</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/useUserStore'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')
const error = ref('')

const handleLogin = () => {
  // 简单表单校验
  if (!username.value) {
    error.value = '请输入用户名'
    return
  }
  // 账号校验：只允许 Xml38432 登录（不区分大小写）
  if (username.value.toLowerCase() !== 'xml38432') {
    error.value = '账号错误（请使用指定账号登录）'
    return
  }
  if (password.value !== '123456') {
    error.value = '密码错误（演示密码为 123456）'
    return
  }

  error.value = ''

  // 使用 useUserStore 的 login 方法
  const isLoginSuccess = userStore.login(username.value, password.value)

  if (isLoginSuccess) {
    console.log(`[登录成功] 用户：${username.value}`)

    const redirect = route.query.redirect
    const target = typeof redirect === 'string' ? redirect : '/admin/profile'
    router.replace(target)
  } else {
    error.value = '登录失败'
  }
}

const goHome = () => {
  router.replace({ name: 'Home' })
}
</script>

<style scoped>
.login-view {
  padding: 32px;
  max-width: 500px;
  margin: 0 auto;
}

.page-title {
  color: #2c3e50;
  font-size: 28px;
  margin-bottom: 16px;
  text-align: center;
}

#app.dark .page-title {
  color: #e0e0e0;
}

.hint {
  color: #666;
  text-align: center;
  margin-bottom: 24px;
  font-size: 14px;
  line-height: 1.6;
}

#app.dark .hint {
  color: #aaa;
}

.edit-form {
  background: white;
  padding: 32px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

#app.dark .edit-form {
  background: #3a3a3a;
  border-color: #555;
}

.form-group {
  margin: 16px 0;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

#app.dark .form-group label {
  color: #aaa;
}

.form-group input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #333;
  box-sizing: border-box;
}

#app.dark .form-group input {
  background: #2d2d2d;
  border-color: #555;
  color: #e0e0e0;
}

.form-group input:focus {
  outline: none;
  border-color: #4CAF50;
}

.error {
  color: #f44336;
  background: #ffebee;
  padding: 10px;
  border-radius: 4px;
  margin: 16px 0;
  font-size: 14px;
}

#app.dark .error {
  background: #4a1a1a;
  color: #ef5350;
}

.tip {
  color: #999;
  font-size: 12px;
  text-align: center;
  margin-top: 16px;
}

#app.dark .tip {
  color: #777;
}

button {
  padding: 10px 20px;
  margin: 8px 4px;
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

.btn-secondary {
  background: #2196F3 !important;
}

.btn-secondary:hover {
  background: #0b7dda !important;
}
</style>
