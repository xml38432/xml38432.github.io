<template>
  <div class="personal-info-container">
    <!-- 头部区域 -->
    <div class="header">
      <div class="personal-info">
        <img class="avatar" :src="personal.avatar" :alt="personal.name + '的头像'">
        <h1>{{ personal.name }}</h1>
        <p class="info-line">
          <span>{{ personal.school }}</span> |
          <span>{{ personal.major }}</span> |
          <span>{{ personal.grade }}</span>
        </p>
        <p class="info-line">{{ personal.intro }}</p>
      </div>
    </div>

    <!-- 操作按钮组 -->
    <div>
      <button @click="toggleDetail">
        {{ showDetail ? '收起详情' : '展开详情' }}
      </button>
      <button class="btn-secondary" @click="handleToggleEdit">
        {{ isEditing ? '取消编辑' : '编辑个人信息' }}
      </button>
    </div>

    <!-- 详情区域 -->
    <transition name="fade">
      <div class="detail" v-show="showDetail">
        <p>邮箱：<a :href="'mailto:' + personal.email">{{ personal.email }}</a></p>
        <p>GitHub: <a :href="personal.github" target="_blank">{{ personal.github }}</a></p>
      </div>
    </transition>

    <!-- 编辑表单 -->
    <transition name="fade">
      <div class="edit-form" v-if="isEditing">
        <h3>编辑个人信息</h3>
        <div class="form-group">
          <label for="edit-name">姓名：</label>
          <input id="edit-name" type="text" v-model.trim="editForm.name">
        </div>
        <div class="form-group">
          <label for="edit-school">学校：</label>
          <input id="edit-school" type="text" v-model.trim="editForm.school">
        </div>
        <div class="form-group">
          <label for="edit-major">专业：</label>
          <input id="edit-major" type="text" v-model.trim="editForm.major">
        </div>
        <div class="form-group">
          <label for="edit-grade">年级：</label>
          <input id="edit-grade" type="text" v-model.trim="editForm.grade">
        </div>
        <div class="form-group">
          <label for="edit-email">邮箱：</label>
          <input id="edit-email" type="email" v-model.trim="editForm.email">
        </div>
        <div class="form-group">
          <label for="edit-github">GitHub：</label>
          <input id="edit-github" type="text" v-model.trim="editForm.github">
        </div>
        <div class="form-group">
          <label for="edit-intro">简介：</label>
          <input id="edit-intro" type="text" v-model.trim="editForm.intro">
        </div>
        <div>
          <button @click="saveEdit">保存修改</button>
          <button class="btn-danger" @click="cancelEdit">取消</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// 使用 defineProps 接收父组件传递的数据
const props = defineProps({
  personal: {
    type: Object,
    required: true
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

// 使用 defineEmits 定义向父组件发送的事件
const emit = defineEmits(['toggle-edit', 'update-personal'])

// 组件内部状态
const showDetail = ref(false)
const editForm = ref({
  name: '',
  school: '',
  major: '',
  grade: '',
  email: '',
  github: '',
  intro: ''
})

// 监听器
watch(showDetail, (newVal) => {
  console.log(`[PersonalInfo] 详情已${newVal ? '展开' : '收起'}`)
})

// 方法
const toggleDetail = () => {
  showDetail.value = !showDetail.value
}

const handleToggleEdit = () => {
  if (!props.isEditing) {
    // 进入编辑模式：复制当前数据到编辑表单
    editForm.value = { ...props.personal }
  }
  emit('toggle-edit')
}

const saveEdit = () => {
  // 验证表单
  if (!editForm.value.name.trim()) {
    alert('姓名不能为空！')
    return
  }
  if (!editForm.value.email.trim()) {
    alert('邮箱不能为空！')
    return
  }

  // 向父组件发送更新事件
  emit('update-personal', editForm.value)
  console.log('[PersonalInfo] 发送更新个人信息事件')
}

const cancelEdit = () => {
  emit('toggle-edit')
  // 清空编辑表单
  editForm.value = {
    name: '',
    school: '',
    major: '',
    grade: '',
    email: '',
    github: '',
    intro: ''
  }
  console.log('[PersonalInfo] 已取消编辑')
}
</script>

<style scoped>
/* ===== 头部区域 ===== */
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.personal-info {
  flex: 1;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #4CAF50;
  transition: transform 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
}

h1 {
  margin: 16px 0 8px 0;
  color: #2c3e50;
  font-size: 28px;
}

#app.dark h1 {
  color: #e0e0e0;
}

.info-line {
  color: #666;
  margin: 8px 0;
  line-height: 1.6;
}

#app.dark .info-line {
  color: #aaa;
}

.info-line span {
  margin: 0 8px;
}

.info-line span:first-child {
  margin-left: 0;
}

/* ===== 按钮样式 ===== */
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

.btn-secondary {
  background: #2196F3;
}

.btn-secondary:hover {
  background: #0b7dda;
}

.btn-danger {
  background: #f44336;
}

.btn-danger:hover {
  background: #da190b;
}

/* ===== 详情区域 ===== */
.detail {
  border: 1px dashed #999;
  padding: 16px;
  margin: 16px 0;
  border-radius: 8px;
  background: #f9f9f9;
  transition: all 0.3s ease;
}

#app.dark .detail {
  background: #3a3a3a;
  border-color: #555;
}

.detail p {
  margin: 8px 0;
  line-height: 1.8;
}

.detail a {
  color: #2196F3;
  text-decoration: none;
  transition: color 0.3s ease;
}

.detail a:hover {
  color: #0b7dda;
  text-decoration: underline;
}

#app.dark .detail a {
  color: #64B5F6;
}

/* ===== 编辑表单 ===== */
.edit-form {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin: 16px 0;
}

#app.dark .edit-form {
  background: #3a3a3a;
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

.form-group input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #333;
}

#app.dark .form-group input {
  background: #2d2d2d;
  border-color: #555;
  color: #e0e0e0;
}

.form-group input:focus {
  outline: none;
  border-color: #4CAF50;
}
</style>
