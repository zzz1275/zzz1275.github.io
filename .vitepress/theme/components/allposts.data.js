
// .vitepress/theme/posts.data.js
import { createContentLoader } from 'vitepress'
//import matter from 'gray-matter' // 这个库用来解析 frontmatter 和正文

// 这里省略了 createExcerpt 函数的具体实现，它主要负责提取纯文本摘要
function createExcerpt(content, maxLength) {
    // ... 实现去除 Markdown/HTML 标记并截取的逻辑 ...
    // 简单示例：去除标签，截取前 maxLength 字符
    const plainText = content.replace(/<[^>]*>/g, '').replace(/#+\s/g, ''); 
    return plainText.slice(0, maxLength) + (plainText.length > maxLength ? '...' : '');
}

export default createContentLoader('**/*.md', { // 匹配所有 Markdown 文件
  includeSrc: true, // 需要加载源文件内容来提取摘要
  ignore: ['index.md','tags.md', '**/node_modules/**', '.vitepress/**'], // 排除非文章文件
  transform(rawData) {
    
   const tagMap = {};
   const postMap = {};
   rawData.forEach(({ url, frontmatter, src }) => {
    var content=src;
        var arr = url.match(/^(.+)$/);
        var tit = arr[1];
     var tags = [];
     var arr_arr = src.matchAll(/\s*#(\w+)\s+/g);
     for (var arr of arr_arr){
        var tag = arr[1];
        tags.push(tag);
     }
     
     postMap[url] = { title: tit, url, tags };
     tags.forEach((tag) => {
       if (!tagMap[tag]) tagMap[tag] = [];
       tagMap[tag].push(url);
     });
   });

    var lastPosts =  rawData
      // 过滤掉 frontmatter 不完整或非目标内容的 md 文件
      .filter(({ frontmatter, src }) => frontmatter && frontmatter.date && src) 
      .map(({ url, frontmatter, src }) => {
        // 使用 gray-matter 分离出 frontmatter 和纯 Markdown 内容
        var content=src;
        var arr = url.match(/^(.+)$/);
        var tit = arr[1];
        return {
          title: tit,
          url,
          // 确保 date 是 Date 对象，方便排序
          date: new Date(frontmatter.date), 
          // 调用我们写的函数生成摘要
          excerpt: createExcerpt(content, 200), 
        }
      }).sort((a, b) => b.date.getTime() - a.date.getTime()); 
      return {tagMap, postMap, lastPosts};
  }
})
        