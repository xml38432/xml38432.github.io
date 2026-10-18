<template>
  <div class="project-detail-view">
    <!-- 找到项目：展示详情 -->
    <template v-if="project">
      <h2 class="page-title">{{ project.title }}</h2>

      <div class="detail-meta">
        <span class="status" :class="statusClass">{{ project.status }}</span>
        <span>项目编号：{{ project.id }}</span>
        <span>创建日期：{{ project.date }}</span>
      </div>

      <p class="summary">{{ project.summary }}</p>

      <div class="tags">
        <span class="tag" v-for="tech in project.tech" :key="tech">{{ tech }}</span>
      </div>

      <p class="desc">{{ project.description }}</p>

      <p v-if="project.repo">
        仓库地址：<a :href="project.repo" target="_blank">{{ project.repo }}</a>
      </p>

      <!-- 编程式导航：返回上一页 / 返回列表 -->
      <div class="detail-actions">
        <button @click="goBack">← 返回上一页</button>
        <button class="btn-secondary" @click="backToList">返回项目列表</button>
      </div>
    </template>

    <!-- 未找到项目：无效详情地址处理 -->
    <div class="invalid" v-else>
      <h2>❓ 未找到编号为「{{ route.params.id }}」的项目</h2>
      <p>该详情地址无效，你可以返回上一页，或使用 replace 离开当前地址回到项目列表。</p>
      <div class="detail-actions">
        <button @click="goBack">← 返回上一页</button>
        <button class="btn-danger" @click="replaceToList">返回项目列表(replace)</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectStore } from '../stores/useProjectStore'

const route = useRoute()
const router = useRouter()
const projectStore = useProjectStore()

onMounted(() => {
  projectStore.initializeProjects()
})

const projectId = computed(() => Number(route.params.id))
const project = computed(() => projectStore.getProjectById(projectId.value))

const statusClass = computed(() => {
  const status = project.value?.status
  if (status === '已完成') return 'done'
  if (status === '进行中') return 'doing'
  return 'plan'
})

// 监听路由参数变化
watch(() => route.params.id, (newId) => {
  console.log(`[ProjectDetail] 查看项目详情，ID: ${newId}`)
})

const goBack = () => {
  router.go(-1)
}

const backToList = () => {
  router.push({ name: 'ProjectList' })
}

const replaceToList = () => {
  router.replace({ name: 'ProjectList' })
}
</script>

<style scoped>
.project-detail-view {
  margin-top: 16px;
  padding: 24px;
  background: white;
  border-radius: 8px;
  border: 1px solid #ddd;
}

#app.dark .project-detail-view {
  background: #3a3a3a;
  border-color: #555;
}

.page-title {
  color: #2c3e50;
  font-size: 28px;
  margin-bottom: 16px;
}

#app.dark .page-title {
  color: #e0e0e0;
}

.detail-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #666;
}

#app.dark .detail-meta {
  border-bottom-color: #555;
  color: #aaa;
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

.summary {
  font-size: 16px;
  color: #555;
  margin: 16px 0;
  line-height: 1.8;
}

#app.dark .summary {
  color: #bbb;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
}

.tag {
  display: inline-block;
  padding: 6px 12px;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 4px;
  font-size: 14px;
}

#app.dark .tag {
  background: #1a3a52;
  color: #64B5F6;
}

.desc {
  color: #666;
  line-height: 1.8;
  margin: 16px 0;
}

#app.dark .desc {
  color: #aaa;
}

.project-detail-view a {
  color: #2196F3;
  text-decoration: none;
}

.project-detail-view a:hover {
  text-decoration: underline;
}

#app.dark .project-detail-view a {
  color: #64B5F6;
}

.detail-actions {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #eee;
}

#app.dark .detail-actions {
  border-top-color: #555;
}

.detail-actions button {
  padding: 8px 16px;
  margin-right: 8px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  background: #4CAF50;
  color: white;
}

.detail-actions button:hover {
  background: #45a049;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.detail-actions button:active {
  transform: translateY(0);
}

.btn-secondary {
  background: #2196F3 !important;
}

.btn-secondary:hover {
  background: #0b7dda !important;
}

.btn-danger {
  background: #f44336 !important;
}

.btn-danger:hover {
  background: #da190b !important;
}

.invalid {
  text-align: center;
  padding: 48px 24px;
}

.invalid h2 {
  color: #f44336;
  margin-bottom: 16px;
}

#app.dark .invalid h2 {
  color: #ef5350;
}

.invalid p {
  color: #666;
  line-height: 1.8;
  margin-bottom: 24px;
}

#app.dark .invalid p {
  color: #aaa;
}
</style>
