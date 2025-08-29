import fs from 'node:fs';

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
    console.log("tt");
    var files_filt = watchedFiles.filter(file => {
        if(    /tags.md$/.test(file) 
            || /lastposts.md$/.test(file)
            || /posts.md$/.test(file)
            || /index.md$/.test(file)
        ){
            return false;
        }
        return true;
    });
        
    var layout_hs = {};
    
    files_filt.map((file) => {
        var url = file.replace(/.md$/, '.html');
        
        var url_spl = url.split("/");
        var last_spl = layout_hs;
        url_spl.forEach(spl=>{
            if(last_spl == layout_hs){
                if(! layout_hs[spl]){
                    layout_hs[spl] = {};
                }
                last_spl = layout_hs[spl];
            }else{
                if(! last_spl[spl]){
                    last_spl[spl] = {};
                }
                last_spl = last_spl[spl];
            }
        });
    });
    
    function trans_hsh(pre, hsh){
        var keys = Object.keys(hsh);
        var rst = [];
        keys.forEach(tmp_key=>{
            if(Object.keys(hsh[tmp_key]).length == 0){
                rst.push({
                    text:tmp_key,
                    link:`${pre}/${tmp_key}`
                })
            }else{
                rst.push({
                    text:tmp_key,
                    items:trans_hsh(`${pre}/${tmp_key}`,hsh[tmp_key])
                })
            }
        });
        return rst;
    }

    var trans_rst = trans_hsh(".", layout_hs);
    
    return trans_rst;

  }
}