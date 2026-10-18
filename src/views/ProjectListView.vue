<template>
  <div class="project-list-view">
    <p class="stats">共 {{ projects.length }} 个项目，点击卡片查看详情</p>

    <div class="project-grid">
      <RouterLink
        v-for="project in projects"
        :key="project.id"
        class="project-card"
        :to="{ name: 'ProjectDetail', params: { id: project.id } }"
      >
        <h3>{{ project.title }}</h3>
        <p class="card-summary">{{ project.summary }}</p>
        <div class="tags">
          <span class="tag" v-for="tech in project.tech" :key="tech">{{ tech }}</span>
        </div>
        <div class="card-foot">
          <span class="status" :class="getStatusClass(project.status)">{{ project.status }}</span>
          <span class="date">{{ project.date }}</span>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProjectStore } from '../stores/useProjectStore'

// 使用 Pinia 项目 Store 替代原来的局部 projects 状态，实现跨页面共享与持久化
const projectStore = useProjectStore()
const { projects } = storeToRefs(projectStore)

onMounted(() => {
  projectStore.initializeProjects()
})

const getStatusClass = (status) => {
  if (status === '已完成') return 'done'
  if (status === '进行中') return 'doing'
  return 'plan'
}
</script>

<style scoped>
.project-list-view {
  margin-top: 16px;
}

.stats {
  color: #666;
  margin-bottom: 16px;
  font-size: 14px;
}

#app.dark .stats {
  color: #aaa;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.project-card {
  display: block;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

#app.dark .project-card {
  background: #3a3a3a;
  border-color: #555;
}

.project-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

#app.dark .project-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.project-card h3 {
  margin: 0 0 8px 0;
  color: #2c3e50;
  font-size: 18px;
}

#app.dark .project-card h3 {
  color: #e0e0e0;
}

.card-summary {
  color: #666;
  font-size: 14px;
  margin: 8px 0;
  line-height: 1.6;
}

#app.dark .card-summary {
  color: #aaa;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 12px 0;
}

.tag {
  display: inline-block;
  padding: 4px 8px;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 4px;
  font-size: 12px;
}

#app.dark .tag {
  background: #1a3a52;
  color: #64B5F6;
}

.card-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

#app.dark .card-foot {
  border-top-color: #555;
}

.status {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.status.done {
  background: #c8e6c9;
  color: #2e7d32;
}

.status.doing {
  background: #fff9c4;
  color: #f57f17;
}

.status.plan {
  background: #e0e0e0;
  color: #616161;
}

#app.dark .status.done {
  background: #1b5e20;
  color: #a5d6a7;
}

#app.dark .status.doing {
  background: #f57f17;
  color: #fff9c4;
}

#app.dark .status.plan {
  background: #424242;
  color: #bdbdbd;
}

.date {
  color: #999;
  font-size: 12px;
}

#app.dark .date {
  color: #777;
}
</style>
