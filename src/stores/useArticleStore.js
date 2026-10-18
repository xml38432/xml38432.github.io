/**
 * 文章状态管理 Store
 * 负责管理文章列表、文章详情等
 */
import { defineStore } from 'pinia'

export const useArticleStore = defineStore('article', {
  // 定义状态
  state: () => ({
    articles: []
  }),
  // 计算属性
  getters: {
    articleCount: (state) => state.articles.length,

    sortedArticles: (state) => {
      return [...state.articles].sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
      )
    },

    articlesByCategory: (state) => {
      return (category) => {
        return state.articles.filter(article => article.category === category)
      }
    },

    getArticleById: (state) => {
      return (id) => {
        return state.articles.find(article => article.id === id)
      }
    }
  },
  // 定义方法
  actions: {
    initializeArticles() {
      const savedArticles = localStorage.getItem('articles')
      if (savedArticles) {
        this.articles = JSON.parse(savedArticles)
      } else {
        // 初始化
        this.articles = [
          {
            id: 1,
            title: 'Vue 3 Composition API 深入浅出',
            content: 'Vue 3 引入的 Composition API 让代码组织更加灵活...',
            category: '前端',
            tags: ['Vue 3', 'JavaScript', 'Composition API'],
            createdAt: '2024-01-15',
            updatedAt: '2024-01-15',
            views: 156
          },
          {
            id: 2,
            title: 'Pinia 状态管理入门指南',
            content: 'Pinia 是 Vue 官方推荐的新一代状态管理库...',
            category: '前端',
            tags: ['Vue 3', 'Pinia', '状态管理'],
            createdAt: '2024-02-10',
            updatedAt: '2024-02-12',
            views: 243
          },
          {
            id: 3,
            title: '现代化前端工程化实践',
            content: '从 Vite 到 CI/CD,探讨现代前端工程化的各个环节...',
            category: '工程化',
            tags: ['Vite', 'CI/CD', '工程化'],
            createdAt: '2024-03-05',
            updatedAt: '2024-03-08',
            views: 189
          }
        ]
        this.persistArticles()
      }
    },
    // 新增文章
    addArticle(article) {
      const newArticle = {
        id: this.articles.length > 0 ? Math.max(...this.articles.map(a => a.id)) + 1 : 1,
        ...article,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        views: 0
      }
      this.articles.push(newArticle)
      this.persistArticles()
      return newArticle
    },
    // 更新文章
    updateArticle(id, updates) {
      const index = this.articles.findIndex(article => article.id === id)
      if (index !== -1) {
        this.articles[index] = {
          ...this.articles[index],
          ...updates,
          updatedAt: new Date().toISOString().split('T')[0]
        }
        this.persistArticles()
        return this.articles[index]
      }
      return null
    },
    // 删除文章
    deleteArticle(id) {
      const index = this.articles.findIndex(article => article.id === id)
      if (index !== -1) {
        this.articles.splice(index, 1)
        this.persistArticles()
        return true
      }
      return false
    },
    // 增加文章浏览量
    incrementViews(id) {
      const article = this.getArticleById(id)
      if (article) {
        article.views++
        this.persistArticles()
      }
    },
    // 搜索文章
    searchArticles(query) {
      const lowerQuery = query.toLowerCase()
      return this.articles.filter(article =>
        article.title.toLowerCase().includes(lowerQuery) ||
        article.content.toLowerCase().includes(lowerQuery) ||
        article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      )
    },
    // 持久化到 localStorage
    persistArticles() {
      localStorage.setItem('articles', JSON.stringify(this.articles))
    }
  }
})
