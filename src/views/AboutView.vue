<template>
  <div class="about-view">
    <h2 class="page-title">关于我</h2>

    <div class="about-section">
      <h3>基本信息</h3>
      <ul class="about-list">
        <li>姓名：谢美琳</li>
        <li>学校：重庆工程学院</li>
        <li>专业：计算机科学与技术</li>
        <li>年级：大三</li>
        <li>邮箱：<a href="mailto:3152897187@qq.com">3152897187@qq.com</a></li>
        <li>GitHub：<a href="https://github.com/xml38432" target="_blank">https://github.com/xml38432</a></li>
      </ul>
    </div>

    <div class="about-section">
      <h3>学习方向</h3>
      <p>
        目前主要学习 Vue 3 与前端工程化，熟悉组件化开发、组合式 API 与 Vue Router，
        同时具备 Java、Spring Boot、MySQL 的后端基础，目标成为能独立完成前后端项目的全栈开发者。
      </p>
    </div>

    <div class="about-section">
      <h3>本实验（实验三）说明</h3>
      <ul class="about-list">
        <li>使用 Vue Router 配置基础路由、动态路由与嵌套路由；</li>
        <li>顶部导航通过 RouterLink 跳转，并实现导航高亮；</li>
        <li>项目详情页通过 useRoute() 获取动态参数，配合 useRouter() 完成编程式导航；</li>
        <li>通过 meta 与全局前置守卫 beforeEach 更新页面标题并实现后台访问控制。</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 静态页面，无需响应式数据
</script>

<style scoped>
.about-view {
  padding: 32px;
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  color: #2c3e50;
  font-size: 28px;
  margin-bottom: 24px;
}

#app.dark .page-title {
  color: #e0e0e0;
}

.about-section {
  margin-bottom: 32px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  border: 1px solid #ddd;
}

#app.dark .about-section {
  background: #3a3a3a;
  border-color: #555;
}

.about-section h3 {
  color: #2c3e50;
  font-size: 20px;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #4CAF50;
}

#app.dark .about-section h3 {
  color: #e0e0e0;
}

.about-section p {
  color: #666;
  line-height: 1.8;
  margin: 0;
}

#app.dark .about-section p {
  color: #aaa;
}

.about-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.about-list li {
  padding: 8px 0;
  color: #666;
  line-height: 1.6;
}

#app.dark .about-list li {
  color: #aaa;
}

.about-view a {
  color: #2196F3;
  text-decoration: none;
  transition: color 0.3s ease;
}

.about-view a:hover {
  color: #0b7dda;
  text-decoration: underline;
}

#app.dark .about-view a {
  color: #64B5F6;
}
</style>
