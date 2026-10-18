<template>
  <div class="admin-articles-view">
    <el-card class="main-card">
      <template #header>
        <div class="card-header">
          <span class="title">文章管理</span>
          <el-button type="primary" @click="showAddForm = true">
            + 新增文章
          </el-button>
        </div>
      </template>

      <!-- 文章表格 -->
      <el-table
        :data="articles"
        stripe
        style="width: 100%"
        :default-sort="{ prop: 'createdAt', order: 'descending' }"
      >
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="title" label="文章标题" min-width="200" />
        <el-table-column prop="category" label="分类" width="100">
          <template #default="{ row }">
            <el-tag>{{ row.category }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="views" label="浏览" width="80" />
        <el-table-column prop="createdAt" label="创建时间" width="120" />
        <el-table-column label="操作" width="150" align="center">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="editArticle(row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="deleteArticle(row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination" style="margin-top: 20px; text-align: center">
        <el-pagination
          :current-page="1"
          :page-size="10"
          :total="articles.length"
          layout="total, prev, pager, next"
        />
      </div>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog
      v-model="showAddForm"
      :title="editingArticle ? '编辑文章' : '新增文章'"
      width="50%"
      @close="cancelForm"
    >
      <el-form
        :model="formData"
        label-width="100px"
        @submit.prevent="submitForm"
      >
        <el-form-item label="文章标题" required>
          <el-input
            v-model="formData.title"
            placeholder="请输入文章标题"
          />
        </el-form-item>

        <el-form-item label="文章内容" required>
          <el-input
            v-model="formData.content"
            type="textarea"
            rows="6"
            placeholder="请输入文章内容"
          />
        </el-form-item>

        <el-form-item label="分类" required>
          <el-select v-model="formData.category" placeholder="选择分类">
            <el-option label="前端" value="前端" />
            <el-option label="后端" value="后端" />
            <el-option label="工程化" value="工程化" />
            <el-option label="其他" value="其他" />
          </el-select>
        </el-form-item>

        <el-form-item label="标签">
          <el-input
            v-model="tagsInput"
            placeholder="用逗号分隔，例如：Vue,JavaScript,前端"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelForm">取消</el-button>
          <el-button type="primary" @click="submitForm">
            {{ editingArticle ? '更新' : '保存' }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useArticleStore } from '../stores/useArticleStore'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'

const articleStore = useArticleStore()
const { articles } = storeToRefs(articleStore)

const showAddForm = ref(false)
const editingArticle = ref(null)
const tagsInput = ref('')

const formData = ref({
  title: '',
  content: '',
  category: '',
  tags: []
})

onMounted(() => {
  articleStore.initializeArticles()
})

const submitForm = () => {
  if (!formData.value.title) {
    ElMessage.warning('请输入文章标题')
    return
  }
  if (!formData.value.content) {
    ElMessage.warning('请输入文章内容')
    return
  }
  if (!formData.value.category) {
    ElMessage.warning('请选择分类')
    return
  }

  formData.value.tags = tagsInput.value
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag)

  if (editingArticle.value) {
    articleStore.updateArticle(editingArticle.value.id, formData.value)
    ElMessage.success('文章已更新')
  } else {
    articleStore.addArticle(formData.value)
    ElMessage.success('文章已新增')
  }

  cancelForm()
}

const editArticle = (article) => {
  editingArticle.value = article
  formData.value = {
    title: article.title,
    content: article.content,
    category: article.category,
    tags: article.tags
  }
  tagsInput.value = article.tags.join(', ')
  showAddForm.value = true
}

const deleteArticle = (id) => {
  ElMessageBox.confirm('确定要删除这篇文章吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      articleStore.deleteArticle(id)
      ElMessage.success('文章已删除')
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })
}

const cancelForm = () => {
  showAddForm.value = false
  editingArticle.value = null
  formData.value = {
    title: '',
    content: '',
    category: '',
    tags: []
  }
  tagsInput.value = ''
}
</script>

<style scoped>
.admin-articles-view {
  padding: 20px;
}

.main-card {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 18px;
  font-weight: 600;
}

.pagination {
  display: flex;
  justify-content: center;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
