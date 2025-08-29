# 使用vitepress搭建个人博客

#nodejs #vitepress #博客

vitepress可以搭建非常漂亮的静态博客,可以直接放到github上面渲染, 不用购买服务器和域名. 据说比hexo快, 而且能够定制自己的页面.今天就教大家如何搭建自己的静态vitepress博客.

## 安装方法

vitepress是基于nodejs的, 所以首先要安装nodejs. 然后进入一个目录准备安装.

- 第一步, 安装

```sh
npm add -D vitepress@1.6.4
npx vitepress init
```

之后会提示项目配置:

```
项目路径: .
站点title: zzz
站点描述: zzz
主题: 默认主题
使用typescript: yes
add npm package: yes
```

- 第二步, 运行,运行方法查看安装目录下的package.json

```sh
  "scripts": {
    "docs:dev": "vitepress dev",
    "docs:build": "vitepress build",
    "docs:preview": "vitepress preview"
  },
```

看到这个就可以使用以下命令运行:

```sh
npm run docs:dev
```

根据命令里面的提示, 访问网页能够看到自己的主页,比如`localhost:5173`

最初有三个页面, 每个md文件就代表一个路由:

- index.md  相当于我们的main页面
- api-examples.md  通过`/api-examples.html`来访问
- markdown-examples.md  通过`/markdown-examples.html`来访问.

