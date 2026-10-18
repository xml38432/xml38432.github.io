
/**
 * 用户状态管理 Store
 * 负责管理用户登录状态、用户信息等
 */
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  // 定义状态
  state: () => ({
    isAuthenticated: false,
    currentUser: null,
    username: '',
    email: '',
    bio: '',
    avatar: ''
  }),

  // 计算属性
  getters: {
    userInfo: (state) => ({
      username: state.username,
      email: state.email,
      bio: state.bio,
      avatar: state.avatar,
      isAuthenticated: state.isAuthenticated
    }),
    isLoggedIn: (state) => state.isAuthenticated
  },

  // 定义方法
  actions: {
    initializeUser() {
      const savedAuth = localStorage.getItem('isAuthenticated')
      const savedUser = localStorage.getItem('currentUser')

      if (savedAuth === 'true' && savedUser) {
        this.isAuthenticated = true
        const userData = JSON.parse(savedUser)
        this.currentUser = userData
        this.username = userData.username || ''
        this.email = userData.email || ''
        this.bio = userData.bio || ''
        this.avatar = userData.avatar || ''
      }
    },
    // 用户登录
    login(loginUsername, loginPassword) {
      // 模拟登录
      if (loginUsername && loginPassword) {
        this.isAuthenticated = true
        this.username = loginUsername
        this.email = `${loginUsername}@example.com`
        this.bio = '这是我的个人简介'
        this.avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${loginUsername}`
        this.currentUser = {
          username: loginUsername,
          email: this.email,
          bio: this.bio,
          avatar: this.avatar
        }

        // 持久化到 localStorage
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
        return true
      }
      return false
    },
    // 用户退出登录
    logout() {
      this.isAuthenticated = false
      this.currentUser = null
      this.username = ''
      this.email = ''
      this.bio = ''
      this.avatar = ''
      // 清除 localStorage
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('currentUser')
    },

    // 更新用户信息
    updateUserInfo(updates) {
      this.username = updates.username || this.username
      this.email = updates.email || this.email
      this.bio = updates.bio || this.bio
      this.avatar = updates.avatar || this.avatar

      this.currentUser = {
        username: this.username,
        email: this.email,
        bio: this.bio,
        avatar: this.avatar
      }

      // 持久化到 localStorage
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
    }
  }
})
