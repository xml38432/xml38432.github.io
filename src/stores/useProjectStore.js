import { defineStore } from 'pinia'

/**
 * 项目状态管理 Store
 * 负责管理项目列表、项目详情等
 * 数据结构与实验三保持一致：title / summary / description / tech / status / date / repo
 */
export const useProjectStore = defineStore('project', {
  // 定义状态
  state: () => ({
    projects: []
  }),

  // 计算属性
  getters: {
    // 项目总数
    projectCount: (state) => state.projects.length,

    // 已完成的项目
    doneProjects: (state) =>
      state.projects.filter(project => project.status === '已完成'),

    // 进行中的项目
    doingProjects: (state) =>
      state.projects.filter(project => project.status === '进行中'),

    // 根据ID获取项目
    getProjectById: (state) => {
      return (id) => {
        return state.projects.find(project => project.id === id)
      }
    }
  },

  // 定义方法（Action）
  actions: {
    // 初始化项目数据（从 localStorage 读取或使用默认数据）
    initializeProjects() {
      const savedProjects = localStorage.getItem('projects')
      if (savedProjects) {
        this.projects = JSON.parse(savedProjects)
      } else {
        // 初始化默认项目数据（沿用实验三的数据）
        this.projects = [
          {
            id: 1,
            title: '个人主页（Vue 组件化）',
            summary: '实验二成果，使用 Vue 3 组合式 API 完成个人主页组件化开发。',
            description: '把页面拆分为页头、个人信息、技能搜索、技能列表、页脚等组件，使用 props 和 emits 完成父子通信。',
            tech: ['Vue 3', 'Vite', 'CSS'],
            status: '已完成',
            date: '2024-09-25',
            repo: 'https://github.com/xml38432/vue-homepage'
          },
          {
            id: 2,
            title: '待办事项清单',
            summary: '支持增删改查与本地存储的任务管理小工具。',
            description: '使用 localStorage 持久化待办数据，支持完成状态切换、按分类筛选以及一键清除已完成任务。',
            tech: ['Vue 3', 'JavaScript', 'localStorage'],
            status: '已完成',
            date: '2024-08-10',
            repo: 'https://github.com/xml38432/todo-list'
          },
          {
            id: 3,
            title: '学生成绩管理系统',
            summary: '基于 Spring Boot + Vue 的成绩录入与统计平台。',
            description: '后端提供 RESTful 接口，前端实现成绩录入、条件查询、排名与图表统计，正在完善权限模块。',
            tech: ['Vue 3', 'Spring Boot', 'MySQL'],
            status: '进行中',
            date: '2024-09-30',
            repo: 'https://github.com/xml38432/score-manage'
          },
          {
            id: 4,
            title: '天气查询小工具',
            summary: '调用公开天气接口，查询城市实时天气。',
            description: '使用 fetch 请求天气 API，展示温度、湿度、风力等数据，支持城市切换与历史查询记录。',
            tech: ['Vue 3', 'Fetch API'],
            status: '已完成',
            date: '2024-07-15',
            repo: 'https://github.com/xml38432/weather-app'
          },
          {
            id: 5,
            title: '卡皮巴拉图片墙',
            summary: '响应式图片瀑布流展示页面。',
            description: '使用 CSS Grid 与图片懒加载实现图片墙，点击可放大预览，计划加入图片上传功能。',
            tech: ['HTML', 'CSS', 'JavaScript'],
            status: '计划中',
            date: '2024-10-20',
            repo: 'https://github.com/xml38432/capybara-wall'
          }
        ]
        this.persistProjects()
      }
    },

    // 新增项目
    addProject(project) {
      const newProject = {
        id: this.projects.length > 0 ? Math.max(...this.projects.map(p => p.id)) + 1 : 1,
        title: project.title || '',
        summary: project.summary || '',
        description: project.description || '',
        tech: project.tech || [],
        status: project.status || '计划中',
        date: project.date || new Date().toISOString().slice(0, 10),
        repo: project.repo || ''
      }
      this.projects.push(newProject)
      this.persistProjects()
      return newProject
    },

    // 更新项目
    updateProject(id, updates) {
      const index = this.projects.findIndex(project => project.id === id)
      if (index !== -1) {
        this.projects[index] = {
          ...this.projects[index],
          ...updates
        }
        this.persistProjects()
        return this.projects[index]
      }
      return null
    },

    // 删除项目
    deleteProject(id) {
      const index = this.projects.findIndex(project => project.id === id)
      if (index !== -1) {
        this.projects.splice(index, 1)
        this.persistProjects()
        return true
      }
      return false
    },

    // 搜索项目
    searchProjects(query) {
      const lowerQuery = query.toLowerCase()
      return this.projects.filter(project =>
        project.title.toLowerCase().includes(lowerQuery) ||
        project.summary.toLowerCase().includes(lowerQuery) ||
        project.tech.some(tech =>
          tech.toLowerCase().includes(lowerQuery)
        )
      )
    },

    // 持久化到 localStorage
    persistProjects() {
      localStorage.setItem('projects', JSON.stringify(this.projects))
    }
  }
})
