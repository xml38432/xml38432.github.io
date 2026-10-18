<template>
  <footer class="page-footer">
    <div class="footer-content">
      <p class="footer-text">
        © {{ year }} {{ author }}
      </p>
      <p class="footer-info">
        249980736-24计科2班-谢美琳
      </p>
    </div>
  </footer>
</template>

<script setup>
// 使用 defineProps 接收父组件传递的数据
const props = defineProps({
  author: {
    type: String,
    required: true
  },
  year: {
    type: [String, Number],
    default: new Date().getFullYear()
  },
  course: {
    type: String,
    default: 'Web前端开发'
  }
})
</script>

<style scoped>
.page-footer {
  background: #f5f5f5;
  padding: 24px 32px;
  text-align: center;
  border-top: 1px solid #e0e0e0;
}

#app.dark .page-footer {
  background: #1a1a1a;
  border-top-color: #444;
}

.footer-content {
  max-width: 800px;
  margin: 0 auto;
}

.footer-text {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #666;
}

#app.dark .footer-text {
  color: #aaa;
}

.footer-info {
  margin: 0;
  font-size: 12px;
  color: #999;
}

#app.dark .footer-info {
  color: #777;
}
</style>
