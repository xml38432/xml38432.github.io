<template>
  <div class="admin-profile-view">
    <h3 class="section-title">编辑个人简介</h3>
    <p class="hint">点击下方「编辑个人信息」修改资料，保存后首页会同步更新，并同步到 Pinia Store 持久化。</p>

    <transition name="fade">
      <p class="toast" v-if="saved">✅ 个人信息已保存</p>
    </transition>

    <!-- 复用实验二的个人信息组件 -->
    <PersonalInfo
      :personal="personal"
      :isEditing="isEditing"
      @toggle-edit="toggleEdit"
      @update-personal="updatePersonal"
    />

    <!-- 实验四：个人信息页面新增时间线（Element Plus 组件） -->
    <div class="timeline-section">
      <h3 class="section-title">学习与项目时间线</h3>
      <SkillTimeline />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PersonalInfo from '../components/PersonalInfo.vue'
import SkillTimeline from '../components/SkillTimeline.vue'
import avatarImg from '../assets/卡皮巴拉.jpg'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/useUserStore'

const userStore = useUserStore()
const { username, email, bio, avatar } = storeToRefs(userStore)

const isEditing = ref(false)
const saved = ref(false)

const personal = ref({
  name: '谢美琳',
  avatar: avatarImg,
  school: '重庆工程学院',
  major: '计算机科学与技术',
  grade: '大三',
  email: '3152897187@qq.com',
  github: 'https://github.com/xml38432',
  intro: '热爱前端开发，正在学习 Vue 3'
})

onMounted(() => {
  // 从 Store 初始化用户数据（若已登录则覆盖默认资料）
  userStore.initializeUser()
  if (username.value) {
    personal.value.name = username.value
  }
  if (email.value) {
    personal.value.email = email.value
  }
  if (bio.value) {
    personal.value.intro = bio.value
  }
  if (avatar.value) {
    personal.value.avatar = avatar.value
  }
})

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

const updatePersonal = (newPersonal) => {
  personal.value = { ...newPersonal }
  isEditing.value = false

  // 同步更新到 Pinia Store（并持久化到 localStorage）
  userStore.updateUserInfo({
    username: newPersonal.name,
    email: newPersonal.email,
    bio: newPersonal.intro,
    avatar: newPersonal.avatar
  })

  saved.value = true
  console.log('[后台管理] 个人信息已更新并同步到 Store')
  // 保存提示 2 秒后自动消失
  setTimeout(() => {
    saved.value = false
  }, 2000)
}
</script>

<style scoped>
.admin-profile-view {
  padding: 24px;
  background: white;
  border-radius: 8px;
  border: 1px solid #ddd;
}

#app.dark .admin-profile-view {
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
  animation: fadeIn 0.3s ease;
}

#app.dark .toast {
  background: #1b5e20;
  color: #a5d6a7;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.timeline-section {
  margin-top: 24px;
}
</style>
