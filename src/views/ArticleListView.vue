<template>
  <div class="article-list-view">
    <!-- 搜索和筛选区 -->
    <el-card class="filter-card">
      <template #header>
        <div class="card-header">
          <span class="title">文章管理</span>
        </div>
      </template>

      <!-- 搜索框 -->
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="16">
          <el-input
            v-model="searchQuery"
            placeholder="搜索文章标题、内容或标签..."
            clearable
            prefix-icon="Search"
          />
        </el-col>
        <el-col :xs="24" :sm="24" :md="8">
          <el-select
            v-model="selectedCategory"
            placeholder="选择分类"
            clearable
            @change="() => {}"
          >
            <el-option
              v-for="category in categories"
              :key="category"
              :label="category"
              :value="category"
            />
          </el-select>
        </el-col>
      </el-row>

      <!-- 分类标签 -->
      <div class="category-tags" style="margin-top: 20px">
        <el-tag
          v-for="category in categories"
          :key="category"
          :type="selectedCategory === category ? 'primary' : 'info'"
          style="cursor: pointer; margin-right: 8px"
          @click="selectedCategory = category"
          closable
          @close="selectedCategory = ''"
        >
          {{ category }}
        </el-tag>
      </div>
    </el-card>

    <!-- 文章列表 -->
    <el-empty v-if="filteredArticles.length === 0" description="暂无文章" />

    <el-row :gutter="20" class="article-grid" v-else>
      <el-col
        v-for="article in filteredArticles"
        :key="article.id"
        :xs="24"
        :sm="12"
        :md="8"
      >
        <el-card class="article-card" @click="goToDetail(article.id)">
          <template #header>
            <div class="article-header">
              <h3>{{ article.title }}</h3>
              <el-tag type="success">{{ article.category }}</el-tag>
            </div>
          </template>

          <p class="article-content">{{ article.content }}</p>

          <div class="article-tags">
            <el-tag
              v-for="tag in article.tags"
              :key="tag"
              type="info"
              size="small"
              style="margin-right: 5px"
            >
              {{ tag }}
            </el-tag>
          </div>

          <div class="article-footer" style="margin-top: 15px; display: flex; justify-content: space-between; color: #999; font-size: 12px">
            <span>{{ article.createdAt }}</span>
            <span>👁️ {{ article.views }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 分页 -->
    <div class="pagination" v-if="filteredArticles.length > 0" style="margin-top: 20px; text-align: center">
      <el-pagination
        :current-page="1"
        :page-size="9"
        :total="filteredArticles.length"
        layout="total, prev, pager, next"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useArticleStore } from '../stores/useArticleStore'
import { storeToRefs } from 'pinia'

const router = useRouter()
const articleStore = useArticleStore()
const { articles } = storeToRefs(articleStore)

const searchQuery = ref('')
const selectedCategory = ref('')
const categories = ref(['全部', '前端', '后端', '工程化', '其他'])

onMounted(() => {
  articleStore.initializeArticles()
})

const filteredArticles = computed(() => {
  let filtered = articles.value

  if (selectedCategory.value && selectedCategory.value !== '全部') {
    filtered = filtered.filter(
      article => article.category === selectedCategory.value
    )
  }

  if (searchQuery.value) {
    filtered = articleStore.searchArticles(searchQuery.value)
  }

  return [...filtered].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )
})

const goToDetail = (id) => {
  router.push({ name: 'ArticleDetail', params: { id } })
}
</script>

<style scoped>
.article-list-view {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

#app.dark .article-list-view {
  background: #2d2d2d;
}

.filter-card {
  margin-bottom: 20px;
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
  color: #333;
}

#app.dark .title {
  color: #e0e0e0;
}

.category-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.article-grid {
  margin-bottom: 20px;
}

.article-card {
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.article-card:hover {
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px);
}

.article-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 10px;
}

.article-header h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
  flex: 1;
  word-break: break-word;
}

#app.dark .article-header h3 {
  color: #e0e0e0;
}

.article-content {
  color: #666;
  font-size: 14px;
  margin: 10px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
}

#app.dark .article-content {
  color: #aaa;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
}

.article-footer {
  padding-top: 10px;
  border-top: 1px solid #f0f0f0;
}

.pagination {
  display: flex;
  justify-content: center;
}
</style>
