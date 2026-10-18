<template>
  <div class="admin-projects-view">
    <h3 class="section-title">管理项目信息</h3>
    <p class="hint">可以新增、修改或删除项目，项目列表与详情页会同步更新（数据由 Pinia Store 管理并持久化）。</p>

    <transition name="fade">
      <p class="toast" v-if="message">{{ message }}</p>
    </transition>

    <!-- 新增 / 编辑表单 -->
    <form class="edit-form" @submit.prevent="handleSubmit">
      <h3>{{ editingId === null ? '新增项目' : '编辑项目 #' + editingId }}</h3>

      <div class="form-group">
        <label for="p-title">项目名称：</label>
        <input id="p-title" type="text" v-model.trim="form.title" placeholder="例如：个人博客系统" />
      </div>
      <div class="form-group">
        <label for="p-summary">一句话简介：</label>
        <input id="p-summary" type="text" v-model.trim="form.summary" placeholder="简要说明项目功能" />
      </div>
      <div class="form-group">
        <label for="p-tech">技术栈（用逗号分隔）：</label>
        <input id="p-tech" type="text" v-model.trim="form.techText" placeholder="例如：Vue 3, Vite" />
      </div>
      <div class="form-group">
        <label for="p-status">项目状态：</label>
        <select id="p-status" v-model="form.status">
          <option>计划中</option>
          <option>进行中</option>
          <option>已完成</option>
        </select>
      </div>
      <div class="form-group">
        <label for="p-desc">详细描述：</label>
        <textarea id="p-desc" rows="3" v-model.trim="form.description"></textarea>
      </div>
      <div class="form-group">
        <label for="p-repo">仓库地址：</label>
        <input id="p-repo" type="text" v-model.trim="form.repo" placeholder="例如：https://github.com/..." />
      </div>

      <div>
        <button type="submit">{{ editingId === null ? '新增项目' : '保存修改' }}</button>
        <button type="button" class="btn-danger" v-if="editingId !== null" @click="cancelEdit">
          取消修改
        </button>
      </div>
    </form>

    <!-- 项目列表 -->
    <table class="data-table">
      <thead>
        <tr>
          <th>编号</th>
          <th>项目名称</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>
            <RouterLink :to="{ name: 'ProjectDetail', params: { id: project.id } }">
              {{ project.title }}
            </RouterLink>
          </td>
          <td>{{ project.status }}</td>
          <td>
            <button class="btn-small" @click="startEdit(project)">编辑</button>
            <button class="btn-small btn-danger" @click="handleRemove(project.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProjectStore } from '../stores/useProjectStore'

// 使用 Pinia 项目 Store 替代实验三中的局部 projects 状态
const projectStore = useProjectStore()
const { projects } = storeToRefs(projectStore)

onMounted(() => {
  projectStore.initializeProjects()
})

const createEmptyForm = () => ({
  title: '',
  summary: '',
  techText: '',
  status: '计划中',
  description: '',
  repo: ''
})

const form = ref(createEmptyForm())
const editingId = ref(null)
const message = ref('')

const showMessage = (text) => {
  message.value = text
  setTimeout(() => {
    message.value = ''
  }, 2000)
}

const parseTech = (text) =>
  text
    .split(/[,，]/)
    .map((item) => item.trim())
    .filter(Boolean)

const handleSubmit = () => {
  // 表单校验
  if (!form.value.title) {
    showMessage('⚠️ 请填写项目名称')
    return
  }
  if (!form.value.summary) {
    showMessage('⚠️ 请填写一句话简介')
    return
  }

  if (editingId.value === null) {
    // 新增：通过 Store 的 action 添加项目
    projectStore.addProject({
      title: form.value.title,
      summary: form.value.summary,
      description: form.value.description,
      tech: parseTech(form.value.techText),
      status: form.value.status,
      date: new Date().toISOString().slice(0, 10),
      repo: form.value.repo
    })
    showMessage('✅ 新增项目成功')
  } else {
    // 修改：通过 Store 的 action 更新项目
    projectStore.updateProject(editingId.value, {
      title: form.value.title,
      summary: form.value.summary,
      description: form.value.description,
      tech: parseTech(form.value.techText),
      status: form.value.status,
      repo: form.value.repo
    })
    showMessage('✅ 修改已保存')
  }
  cancelEdit()
}

const startEdit = (project) => {
  editingId.value = project.id
  form.value = {
    title: project.title,
    summary: project.summary,
    techText: project.tech.join(', '),
    status: project.status,
    description: project.description,
    repo: project.repo
  }
}

const cancelEdit = () => {
  editingId.value = null
  form.value = createEmptyForm()
}

const handleRemove = (id) => {
  if (!confirm('确定删除该项目吗？删除后不可恢复。')) return
  projectStore.deleteProject(id)
  if (editingId.value === id) cancelEdit()
  showMessage('🗑️ 已删除该项目')
}
</script>

<style scoped>
.admin-projects-view {
  padding: 24px;
  background: white;
  border-radius: 8px;
  border: 1px solid #ddd;
}

#app.dark .admin-projects-view {
  background: #3a3a3a;
  border-color: #555;
}

.section-title {
  color: #2c3e50;
  font-size: 22px;
  margin-bottom: 8px;
}

#app.dark .section-title {
  color: #e0e0e0;
}

.hint {
  color: #666;
  margin-bottom: 16px;
  font-size: 14px;
}

#app.dark .hint {
  color: #aaa;
}

.toast {
  background: #c8e6c9;
  color: #2e7d32;
  padding: 12px 16px;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 14px;
  text-align: center;
}

#app.dark .toast {
  background: #1b5e20;
  color: #a5d6a7;
}

.edit-form {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 24px;
}

#app.dark .edit-form {
  background: #2d2d2d;
}

.edit-form h3 {
  color: #2c3e50;
  margin-bottom: 16px;
}

#app.dark .edit-form h3 {
  color: #e0e0e0;
}

.form-group {
  margin: 12px 0;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
  color: #555;
}

#app.dark .form-group label {
  color: #aaa;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #333;
  box-sizing: border-box;
}

#app.dark .form-group input,
#app.dark .form-group select,
#app.dark .form-group textarea {
  background: #1a1a1a;
  border-color: #555;
  color: #e0e0e0;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4CAF50;
}

button {
  padding: 8px 16px;
  margin: 4px;
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

.btn-small {
  padding: 4px 10px;
  font-size: 12px;
  margin: 2px;
}

.btn-danger {
  background: #f44336 !important;
}

.btn-danger:hover {
  background: #da190b !important;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

.data-table th,
.data-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

#app.dark .data-table th,
#app.dark .data-table td {
  border-color: #555;
}

.data-table th {
  background: #f0f0f0;
  color: #333;
  font-weight: bold;
}

#app.dark .data-table th {
  background: #2d2d2d;
  color: #e0e0e0;
}

.data-table td {
  color: #666;
}

#app.dark .data-table td {
  color: #aaa;
}

.data-table a {
  color: #2196F3;
  text-decoration: none;
}

.data-table a:hover {
  text-decoration: underline;
}

#app.dark .data-table a {
  color: #64B5F6;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
