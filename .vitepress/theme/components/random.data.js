import fs from 'node:fs'

function createExcerpt(content, maxLength) {
    const plainText = content.replace(/<[^>]*>/g, '').replace(/#+\s/g, ''); 
    return plainText.slice(0, maxLength) + (plainText.length > maxLength ? '...' : '');
}

export default {
  watch: ['**/*.md'],
  load(watchedFiles) {
    // watchFiles 是一个所匹配文件的绝对路径的数组。
    // 生成一个博客文章元数据数组
    // 可用于在主题布局中呈现列表。

    var urls = watchedFiles.filter(file => {
        if(    /tags.md$/.test(file) 
            || /allposts.md$/.test(file)
            || /index.md$/.test(file)
            || /random.md$/.test(file)
            || /^_nav.+/.test(file)
        ){
            return false;
        }
        return true;
    }).map(function(url){
        return url.replace(/.md$/, '.html');
    });
    
    return {urls};
  }
}