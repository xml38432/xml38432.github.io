# 实验四（修正版）：状态管理与 UI 组件库应用

> 本目录是在 **实验三** 的基础上叠加 **实验四** 的功能改动后的完整源代码。
> 原则：**只新增功能，不改动实验三原有的样式与交互**。

## 与「实验三」的关系（重要）

实验三的核心特征在本次修正中被完整保留：

| 实验三特征 | 修正后状态 |
|-----------|-----------|
| `#app.light` / `#app.dark` 主题类 + 手写 CSS | ✅ 保留（`App.vue`） |
| 顶部 `.top-bar` + `.nav-bar` 的 `RouterLink` 导航 | ✅ 恢复 |
| 导航栏「登录」入口（未登录时显示） | ✅ 恢复 |
| `PageHeader` / `PageFooter` / `ThemeSwitcher` 组件 | ✅ 原样保留 |
| `PersonalInfo` 组件「展开详情 / 编辑个人信息」 | ✅ 原样保留，编辑可正常使用 |
| 首页技能搜索、项目列表、项目详情、404 页 | ✅ 原样保留 |
| 手写表单 / 按钮 / 表格样式 | ✅ 保留 |

> 之前的版本用 Element Plus 的 `el-container` / `el-menu` 重写了整个 `App.vue`，
> 并改动了多处样式，且导航缺少登录入口、编辑信息无响应 —— 这些都已修正。

## 实验四新增的内容（叠加在实验三之上）

### 1. Pinia 状态管理
- `src/stores/useUserStore.js` —— 用户登录状态与资料（`login` / `logout` / `updateUserInfo` / `initializeUser`）
- `src/stores/useArticleStore.js` —— 文章列表与增删改查
- `src/stores/useProjectStore.js` —— 项目列表与增删改查（数据结构沿用实验三：`title/summary/description/tech/status/date/repo`）
- 全部通过 `storeToRefs` 解构保持响应式，并持久化到 `localStorage`。

### 2. 新增文章相关页面
- `src/views/ArticlesView.vue` —— 文章中心（沿用实验三浅色容器风格）
- `src/views/ArticleListView.vue` —— 文章列表（搜索、分类筛选、分页，Element Plus）
- `src/views/ArticleDetailView.vue` —— 文章详情
- `src/views/AdminArticlesView.vue` —— 文章管理（`el-table` + `el-dialog` + `el-form`）

### 3. Element Plus 集成
- `src/main.js` 全局注册 `ElementPlus` 与样式。
- 新增页面使用 ≥ 10 种组件：`el-card`、`el-row/el-col`、`el-input`、`el-select`、`el-option`、`el-tag`、`el-pagination`、`el-empty`、`el-table`、`el-table-column`、`el-dialog`、`el-form`、`el-form-item`、`el-button`、`el-timeline`、`el-timeline-item`、`el-message`、`el-message-box`。

### 4. 个人信息页新增时间线
- `src/components/SkillTimeline.vue`（`el-timeline` + `el-timeline-item` + `el-card` + `el-tag`）
- 在 `AdminProfileView.vue`（个人信息页面）底部展示。

### 5. 路由守卫改用 Store
- `src/router/index.js` 的 `beforeEach` 中通过 `useUserStore().isLoggedIn` 判断登录态，
  未登录访问 `/admin/**` 自动跳转登录页。
- 新增路由：`/articles`、`/articles/:id`、`/admin/articles`。

## 运行方式

```bash
npm install
npm run dev      # 开发预览
npm run build    # 生产构建
npm run preview  # 预览构建产物
```

- 演示登录：任意用户名 + 密码 `123456`
- 构建已验证通过：`1650 modules transformed`，无错误。

## 目录结构

```
WorkBuddy/
├── index.html
├── package.json
├── vite.config.js          # base: './'，便于部署 GitHub Pages
├── public/
└── src/
    ├── main.js             # Pinia + Element Plus 注册
    ├── App.vue             # 实验三布局 + Store 登录态
    ├── assets/
    ├── components/         # PageHeader/PageFooter/PersonalInfo/SkillList/SkillSearch/ThemeSwitcher/SkillTimeline
    ├── router/index.js
    ├── stores/             # useUserStore / useArticleStore / useProjectStore
    └── views/              # 实验三原有页面 + 文章相关新页面
```
