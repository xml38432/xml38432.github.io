import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/useUserStore'
import HomeView from '../views/HomeView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import NotFoundView from '../views/NotFoundView.vue'

// 路由表配置
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    meta: { title: '首页 - 个人主页' }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: ProjectsView,
    meta: { title: '项目中心 - 个人主页' },
    children: [
      {
        path: '',
        name: 'ProjectList',
        component: () => import('../views/ProjectListView.vue'),
        meta: { title: '项目列表 - 个人主页' }
      },
      {
        path: ':id',
        name: 'ProjectDetail',
        component: () => import('../views/ProjectDetailView.vue'),
        meta: { title: '项目详情 - 个人主页' }
      }
    ]
  },
  {
    path: '/articles',
    name: 'Articles',
    component: () => import('../views/ArticlesView.vue'),
    meta: { title: '文章中心 - 个人主页' },
    children: [
      {
        path: '',
        name: 'ArticleList',
        component: () => import('../views/ArticleListView.vue'),
        meta: { title: '文章列表 - 个人主页' }
      },
      {
        path: ':id',
        name: 'ArticleDetail',
        component: () => import('../views/ArticleDetailView.vue'),
        meta: { title: '文章详情 - 个人主页' }
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { title: '关于我 - 个人主页' }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { title: '身份认证 - 个人主页' }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    meta: { title: '后台管理 - 个人主页', requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/admin/profile'
      },
      {
        path: 'profile',
        name: 'AdminProfile',
        component: () => import('../views/AdminProfileView.vue'),
        meta: { title: '编辑个人信息 - 后台管理', requiresAuth: true }
      },
      {
        path: 'projects',
        name: 'AdminProjects',
        component: () => import('../views/AdminProjectsView.vue'),
        meta: { title: '管理项目 - 后台管理', requiresAuth: true }
      },
      {
        path: 'articles',
        name: 'AdminArticles',
        component: () => import('../views/AdminArticlesView.vue'),
        meta: { title: '管理文章 - 后台管理', requiresAuth: true }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
    meta: { title: '404 - 页面未找到' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active'
})

// 全局前置守卫，结合 Pinia Store 实现认证控制
router.beforeEach((to, from, next) => {
  // 更新页面标题
  document.title = to.meta.title || '个人主页'

  // 检查是否需要认证
  if (to.meta.requiresAuth) {
    // 在守卫中调用 useUserStore，确保 Pinia 已初始化
    const userStore = useUserStore()

    if (!userStore.isLoggedIn) {
      console.log('[路由守卫] 未登录，跳转到登录页')
      next({ name: 'Login', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
