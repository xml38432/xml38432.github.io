<template>
  <div class="timeline-container">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in timelineItems"
        :key="index"
        :timestamp="item.date"
        placement="top"
        :type="item.type"
      >
        <el-card>
          <template #header>
            <div class="timeline-header">
              <span class="title">{{ item.title }}</span>
              <el-tag :type="item.tagType" size="small">{{ item.category }}</el-tag>
            </div>
          </template>
          <p>{{ item.description }}</p>
          <div class="skills" v-if="item.skills">
            <el-tag
              v-for="skill in item.skills"
              :key="skill"
              type="info"
              size="small"
              style="margin-right: 5px; margin-bottom: 5px"
            >
              {{ skill }}
            </el-tag>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const timelineItems = ref([
  {
    title: 'Vue 3 学习与应用',
    date: '2024-09-01',
    category: '学习',
    tagType: 'success',
    type: 'primary',
    description: '深入学习 Vue 3 Composition API 的特性和最佳实践',
    skills: ['Vue 3', 'Composition API', 'TypeScript']
  },
  {
    title: 'Pinia 状态管理实践',
    date: '2024-10-01',
    category: '技术',
    tagType: 'primary',
    type: 'success',
    description: '在实际项目中应用 Pinia 进行全局状态管理',
    skills: ['Pinia', 'Store', '状态管理']
  },
  {
    title: 'Element Plus 组件库应用',
    date: '2024-10-10',
    category: '项目',
    tagType: 'warning',
    type: 'warning',
    description: '使用 Element Plus 构建规范、美观的应用界面',
    skills: ['Element Plus', 'UI组件', '前端设计']
  },
  {
    title: '项目部署与优化',
    date: '2024-10-15',
    category: '工程',
    tagType: 'info',
    type: 'info',
    description: '学习项目部署、性能优化和最佳实践',
    skills: ['性能优化', 'GitHub Actions', 'Vite']
  }
])
</script>

<style scoped>
.timeline-container {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.title {
  font-weight: 600;
  font-size: 16px;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
}

:deep(.el-timeline-item__content) {
  padding: 0;
}

:deep(.el-card) {
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
</style>
