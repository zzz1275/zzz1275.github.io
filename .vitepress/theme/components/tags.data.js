
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

    var files_filt = watchedFiles.filter(file => {
        if(    /tags.md$/.test(file) 
            || /lastposts.md$/.test(file)
            || /posts.md$/.test(file)
            || /index.md$/.test(file)
        ){
            return false;
        }
        return true;
    })

    const tagMap = {};
    const postMap = {};
    var lastPosts = files_filt.map((file) => {
		var sta = fs.statSync(file);
		var mti = new Date(sta.mtime)
		var src = fs.readFileSync(file, 'utf8');
        var url = file.replace(/.md$/, '.html');
        
        var tit = url;
        var tags = [];
        
        var no_codesrc = src.replace(/```[^`]+?```/g,"").replace(/`[^`]+?`/g,"");
        var arr_arr = no_codesrc.matchAll(/(\s+#)(([\u4e00-\u9fa5]|\w)+)/g);
         for (var arr of arr_arr){
            var tag = arr[2];
            tags.push(tag);
         }
         
         postMap[url] = { title: tit, url, tags };
         tags.forEach((tag) => {
           if (!tagMap[tag]) tagMap[tag] = [];
           tagMap[tag].push(url);
         });
    });
    
    return {tagMap, postMap};
  }
}
        