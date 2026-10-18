<template>
  <div class="article-detail-view" v-if="article">
    <div class="article-detail-container">
      <div class="article-detail-header">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <span class="category">{{ article.category }}</span>
          <span class="date">📅 {{ article.createdAt }}</span>
          <span class="views">👁️ {{ article.views }} 次浏览</span>
        </div>
      </div>

      <div class="article-tags">
        <span v-for="tag in article.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>

      <div class="article-content">
        {{ article.content }}
      </div>

      <div class="article-footer-info">
        <p><strong>发布时间：</strong> {{ article.createdAt }}</p>
        <p><strong>最后更新：</strong> {{ article.updatedAt }}</p>
      </div>

      <div class="article-actions">
        <RouterLink to="/articles" class="btn btn-secondary">
          ← 返回文章列表
        </RouterLink>
      </div>
    </div>

    <div class="article-sidebar">
      <div class="sidebar-card">
        <h3>相关文章</h3>
        <div v-if="relatedArticles.length > 0" class="related-articles">
          <div
            v-for="relatedArticle in relatedArticles"
            :key="relatedArticle.id"
            class="related-item"
            @click="goToArticle(relatedArticle.id)"
          >
            <p>{{ relatedArticle.title }}</p>
          </div>
        </div>
        <p v-else style="color: #999; text-align: center">暂无相关文章</p>
      </div>
    </div>
  </div>

  <div v-else class="empty-state">
    <p>文章不存在</p>
    <RouterLink to="/articles" class="btn btn-secondary">
      返回文章列表
    </RouterLink>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useArticleStore } from '../stores/useArticleStore'

const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()

const articleId = parseInt(route.params.id)

const article = computed(() => {
  return articleStore.getArticleById(articleId)
})

const relatedArticles = computed(() => {
  if (!article.value) return []
  return articleStore.articles.filter(
    a =>
      a.category === article.value.category &&
      a.id !== article.value.id
  ).slice(0, 3)
})

onMounted(() => {
  articleStore.initializeArticles()
  if (article.value) {
    articleStore.incrementViews(articleId)
  }
})

const goToArticle = (id) => {
  router.push({ name: 'ArticleDetail', params: { id } })
}
</script>

<style scoped>
.article-detail-view {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
  background: white;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.article-detail-header {
  margin-bottom: 30px;
}

.article-detail-header h1 {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 15px;
  line-height: 1.2;
}

.article-meta {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  font-size: 0.9em;
  color: #666;
}

.category {
  background: #667eea;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  display: inline-block;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.tag {
  background: #f0f0f0;
  color: #667eea;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.9em;
}

.article-content {
  font-size: 1.1em;
  line-height: 1.8;
  color: #444;
  margin-bottom: 40px;
  border-top: 2px solid #f0f0f0;
  border-bottom: 2px solid #f0f0f0;
  padding: 30px 0;
}

.article-footer-info {
  background: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  font-size: 0.95em;
}

.article-footer-info p {
  margin: 8px 0;
  color: #666;
}

.article-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-secondary {
  background: #f0f0f0;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-secondary:hover {
  background: #667eea;
  color: white;
}

.article-sidebar {
  height: fit-content;
  position: sticky;
  top: 20px;
}

.sidebar-card {
  background: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
}

.sidebar-card h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
}

.related-articles {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.related-item {
  padding: 10px;
  background: white;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid #667eea;
}

.related-item:hover {
  background: #f0f0f0;
  padding-left: 15px;
}

.related-item p {
  margin: 0;
  color: #666;
  font-size: 0.9em;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 10px;
}

@media (max-width: 968px) {
  .article-detail-view {
    grid-template-columns: 1fr;
    padding: 20px;
  }

  .article-sidebar {
    position: relative;
    top: 0;
  }

  .article-detail-header h1 {
    font-size: 2em;
  }
}
</style>
