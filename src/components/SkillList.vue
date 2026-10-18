<template>
  <transition-group name="fade" tag="div">
    <div class="skill" v-for="(skill, index) in skills" :key="skill.id">
      <p>
        {{ index + 1 }}. <strong>{{ skill.name }}</strong>
        （{{ skill.category }}）—— 熟练度 {{ skill.level }}%
      </p>
      <p>{{ skill.desc }}</p>
    </div>
  </transition-group>
</template>

<script setup>
import { watch } from 'vue'

// 使用 defineProps 接收父组件传递的技能列表
const props = defineProps({
  skills: {
    type: Array,
    required: true,
    default: () => []
  }
})

// 监听器
watch(() => props.skills, (newVal) => {
  console.log(`[SkillList] 技能列表更新，当前显示 ${newVal.length} 项`)
})
</script>

<style scoped>
/* ===== 技能列表 ===== */
.skill {
  border: 1px solid #ddd;
  padding: 16px;
  margin: 12px 0;
  border-radius: 8px;
  background: white;
  transition: all 0.3s ease;
}

#app.dark .skill {
  background: #3a3a3a;
  border-color: #555;
}

.skill:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateX(4px);
}

#app.dark .skill:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.skill p {
  margin: 8px 0;
}

.skill strong {
  color: #4CAF50;
  font-size: 16px;
}

#app.dark .skill strong {
  color: #81C784;
}
</style>
