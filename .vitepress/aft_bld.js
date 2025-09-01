// 使用 ESM 语法导入 fast-glob
import fg from 'fast-glob';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'node:fs';

// 要搜索的目录（比如项目下的 docs）
const searchDir = "."

// 搜索模式
const patterns = [
  '**/*.md'    // 所有子目录下的 .md 文件
];

async function listFiles() {
  try {
    const files = await fg(patterns, {
      cwd: searchDir,        // 搜索根目录
      absolute: false,        // 返回绝对路径
      onlyFiles: true,       // 只返回文件（不含目录）
      stats: false           // 不需要文件元信息可关闭
    });
    
    var fil_flt = files.filter(file=>{
        if( /^node_modules\//.test(file)
            || /^nav\//.test(file)
            || /^\./.test(file)
        ){
            return false;
        }
        return true;
    })
    fil_flt.forEach(file => {
      var sta = fs.statSync(file);
      var mti = new Date(sta.mtime);
      var now = new Date();
      
      var dst_file = file.replace(/\.md$/,".html");
      console.log(`.vitepress/dist/${dst_file}: ${mti}`)
      fs.utimes(`.vitepress/dist/${dst_file}`, now, mti, (err) => {
          if (err) {
            console.error('无法设置时间:', err);
            return;
          }
      });
    });

    return files;
  } catch (err) {
    console.error('读取文件失败:', err);
  }
}

// 直接执行
listFiles();