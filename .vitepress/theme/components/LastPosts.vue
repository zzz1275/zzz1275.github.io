
<script setup>
import { ref, computed } from 'vue'
// 导入构建时生成的数据，注意路径要对
import {data} from '../lastposts.data.js' 

const postsPerPage = ref(10); // 每页显示多少篇
const currentPage = ref(1); // 当前在哪一页

// 计算总页数
const totalPages = computed(() => Math.ceil(data.length / postsPerPage.value));

// 计算当前页应该显示哪些文章
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage.value;
  const end = start + postsPerPage.value;
  return data.slice(start, end);
});

// 切换页码的函数
function changePage(newPage) {
  if (newPage >= 1 && newPage <= totalPages.value) {
    currentPage.value = newPage;
  }
}

// 格式化日期，让它好看点
function formatDate(date) {
  if (!(date instanceof Date)) date = new Date(date);
  return date.toLocaleDateString(); // 或者用更详细的格式
}
</script>

<template>
  <div class="latest-posts">
    <ul>
      <li v-for="post in paginatedPosts" :key="post.url">
        <div class="post-item">
            <a :href="post.url" class="post-title">{{ post.title }}</a>
            <span class="post-date">{{ formatDate(post.date) }}</span>
            <p v-if="post.excerpt" class="post-excerpt">{{ post.excerpt }}</p> 
        </div>
      </li>
    </ul>

    <!-- 分页控件 -->
    <div class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
        上一页
      </button>
      <span>第 {{ currentPage }} / {{ totalPages }} 页</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
        下一页
      </button>
    </div>
  </div>
</template>

<style scoped> 
/* 这里加点样式让列表好看些 */
.latest-posts ul { list-style: none; padding: 0; }
.post-item { margin-bottom: 1.5em; border-bottom: 1px solid #eee; padding-bottom: 1em; }
.post-title { font-size: 1.2em; font-weight: bold; display: block; margin-bottom: 0.3em; }
.post-date { font-size: 0.9em; color: #888; margin-bottom: 0.5em; display: block;}
.post-excerpt { font-size: 1em; color: #555; line-height: 1.6; margin-top: 0.5em; }
.pagination { margin-top: 2em; text-align: center; }
.pagination button { margin: 0 0.5em; padding: 0.5em 1em; cursor: pointer; }
.pagination button:disabled { cursor: not-allowed; opacity: 0.5; }
.pagination span { margin: 0 1em; }
</style>
        