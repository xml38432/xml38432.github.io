<template>
  <div class="home-view">
    <PersonalInfo
      :personal="personal"
      :isEditing="false"
    />
    <SkillSearch v-model="keyword" @clear="clearKeyword" />
    <p class="stats">共 {{ skills.length }} 项技能，匹配 {{ filteredSkills.length }} 项</p>
    <SkillList :skills="filteredSkills" />
    <p class="empty" v-if="filteredSkills.length === 0">没有匹配「{{ keyword }}」的技能</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PersonalInfo from '../components/PersonalInfo.vue'
import SkillSearch from '../components/SkillSearch.vue'
import SkillList from '../components/SkillList.vue'
import avatarImg from '../assets/卡皮巴拉.jpg'

const keyword = ref('')

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

const skills = ref([
  { id: 1, name: 'HTML / CSS', category: '前端', level: 85, desc: '能完成响应式页面布局。' },
  { id: 2, name: 'JavaScript', category: '前端', level: 75, desc: '掌握 ES6+ 语法与异步基础。' },
  { id: 3, name: 'Vue 3', category: '前端', level: 60, desc: '正在学习组件化开发。' },
  { id: 4, name: 'Java', category: '后端', level: 70, desc: '用过 Spring Boot 写接口。' },
  { id: 5, name: 'MySQL', category: '后端', level: 65, desc: '熟悉常用 SQL 语句。' },
  { id: 6, name: 'Git', category: '工具', level: 70, desc: '能用分支管理协作。' }
])

const filteredSkills = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  if (!kw) return skills.value
  return skills.value.filter(item =>
    item.name.toLowerCase().includes(kw) ||
    item.category.toLowerCase().includes(kw) ||
    item.desc.toLowerCase().includes(kw)
  )
})

const clearKeyword = () => {
  keyword.value = ''
}
</script>

<style scoped>
.home-view {
  padding: 32px;
}

.stats {
  color: #666;
  margin: 16px 0;
  font-size: 14px;
}

#app.dark .stats {
  color: #aaa;
}

.empty {
  color: #888;
  text-align: center;
  padding: 32px;
  font-style: italic;
}

#app.dark .empty {
  color: #666;
}
</style>
