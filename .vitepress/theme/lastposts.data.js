
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
            || /random.md$/.test(file)
        ){
            return false;
        }
        return true;
    })

    var lastPosts = files_filt.map((file) => {
		var sta = fs.statSync(file);
		var mti = new Date(sta.mtime)
		var src = fs.readFileSync(file, 'utf8');
        var url = file.replace(/.md$/, '.html');
		return {
			//"src": src,
			"date": mti,
			"url": url,
			"title": url,
			"excerpt": createExcerpt(src),
		}
    });
    var lastPosts_srt = lastPosts.sort((a, b)=>{
        return b.date.getTime() - a.date.getTime();
    })
    return lastPosts_srt;
  }
}
        