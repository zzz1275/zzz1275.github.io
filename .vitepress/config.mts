import { defineConfig } from 'vitepress';
import fs from 'node:fs';
import path from 'node:path';

// 定义一个递归函数来读取目录中的所有 Markdown 文件
function getMarkdownFiles(dir: string): string[] {
  let results: string[] = [];
  // 读取目录内容
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if(/node_modules/.test(file)){
        return;
    }
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    // 如果是目录，则递归调用
    if (stat && stat.isDirectory()) {
      results = results.concat(getMarkdownFiles(filePath)); // 递归获取子目录的文件
    } else if (file.endsWith('.md')) {
      results.push(filePath); // 如果是 Markdown 文件，添加到结果列表
    }
  });
  return results;
}
// 获取当前目录下的所有 Markdown 文件
const watchedFiles = getMarkdownFiles(".");
var files_filt = watchedFiles.filter(file => {
    if(    /tags.md$/.test(file) 
        || /lastposts.md$/.test(file)
        || /posts.md$/.test(file)
        || /index.md$/.test(file)
        || /^_nav.+/.test(file)
    ){
        return false;
    }
    return true;
});
    
var layout_hs = {};

files_filt.map((file) => {
    var url = file.replace(/.md$/, '.html');
    
    var url_spl = url.split(/\/|\\/);
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

var trans_rst = trans_hsh("/.", layout_hs);

export default defineConfig({
  title: "zzz",
  description: "zzz' blog",
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '标签', link: '/tags' },
      { text: '我', link: '/introduce' },
      { text: '资源', items:[
          {
            text: '电视剧', items:[{text:'雅图', link:"https://www.yatu.tv/"}]
          },
          {
            text: 'AI问答', items:[{text:'gpt', link:"/_nav/AI_chat.html"}]
          },
          { text: '音乐', link: '/_nav/music_search.html' },
      ]},
      { text: '随机', link: '/random' },
      
      
    ],
    sidebar: trans_rst,
    socialLinks: [
      { icon: 'github', link: 'https://zzz1275.github.io/' }
    ],
    docFooter: {
        prev: false,
        next: false
    }
  }
})
