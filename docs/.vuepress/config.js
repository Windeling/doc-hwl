// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";
import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'; // 这个import其实用不着了，因为theme有内置slimsearch，但留着无妨
import { appendDatePlugin } from '@vuepress/plugin-append-date';
import { copyrightPlugin } from '@vuepress/plugin-copyright';
import { noticePlugin } from '@vuepress/plugin-notice';
import { markdownMathPlugin } from '@vuepress/plugin-markdown-math';
import { markdownImagePlugin } from '@vuepress/plugin-markdown-image';
import { feedPlugin } from '@vuepress/plugin-feed';

export default defineUserConfig({
  lang: "zh-CN",
  title: "Windelingの間 文档",
  description: "属于「黄文林」的知识库、清单和说明书",

  bundler: viteBundler(),

  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "keywords", content: "文档,知识库,黄文林" }],
  ],
  plugins: [
    // 只留appendDatePlugin，其他的移到theme里
    markdownImagePlugin({
      // 启用 figure
      figure: true,
      // 启用图片懒加载
      lazyload: true,
      // 启用图片标记
      mark: true,
      // 启用图片大小
      size: true,
    }),

    appendDatePlugin({
      // 你原来的配置，保持不变
      enable: true,
      format: "YYYY-MM-DD HH:mm",
      frontmatter: {
        createTime: "date",
        updateTime: "updated",
      },
      type: [
        "frontmatter",
        "git",
        "file",
      ],
      force: true,
      inject: true,
      template: `
        <div class="append-date-info">
          <i class="iconfont icon-calendar"></i>
          <span>撰写于：{{ createTime }}</span>
          <span v-if="updateTime && updateTime !== createTime">
            ｜ <i class="iconfont icon-update"></i> 更新于：{{ updateTime }}
          </span>
        </div>
      `,
      include: ["**/*.md"],
      exclude: ["node_modules/**", ".vuepress/**", "README.md"],
      git: {
        enabled: process.env.NODE_ENV === "production",
        cache: true,
      },
    }),
    
  ],

  theme: hopeTheme({
    author: "黄文林",
    logo: "https://vuejs.press/images/hero.png",

    navbar: [
      { text: "首页", link: "/" },
      {
        text: "拾枝杂谈",
        children: [
          { text: "奇思妙想", link: "/chat/thought/" },
          { text: "朴实生活", link: "/chat/life/" },
        ],
      },
      { text: "文档说明", link: "/doc.md" },
      { text: "学习笔记", link: "/study/" },
      {
        text: "摄影风光",
        children: [
          {
            text: "风光摄影",
            children: [
              { text: "山水风光", link: "/photo/landscape/mountain-water/" },
              { text: "海滨风光", link: "/photo/landscape/beach/" },
              { text: "星空摄影", link: "/photo/landscape/star/" },
            ],
          },
        ],
      },
    ],

    sidebar: {
      "/chat/": "structure",
      "/docs/": "structure",
      "/study/": "structure",
      "/photo/": "structure",
      "/": "structure",
    },

    darkmode: "switch",
    lastUpdated: true,
    lastUpdatedText: "最后更新",
    editLink: true,
    editLinkPattern: ":repo/edit/:branch/:path",
    editLinkText: "在 GitHub 上完善此页面",
    repo: "Windeling/space-hwl",
    repoLabel: "GitHub",
    docsDir: "docs",
    docsBranch: "main",
    contributors: true,
    contributorsText: "贡献者",

    plugins: {
      markdownMath: {
    // 用 KaTeX（默认检测，装了就自动切）
    type: "katex",     // 或 "mathjax"

    // 支持 $...$ 和 $$...$$（超常见）
    delimiters: "dollars",

    // KaTeX 专属：自动换行长公式
    katex: {
      strict: false,   // 宽容模式，不报小错
      throwOnError: false,
      output: "html",  // 更快渲染
    },

    // MathJax 专属（你选了 mathjax 再开）
    // mathjax: { tex: { inlineMath: [["$", "$"]] } },
  },

      slimsearch: true,
      copyCode: { showInMobile: true },
      // 改成markdown，原来的mdEnhance选项移过来
      markdown: {
        tasklist: true,
        footnote: true,
        imageLazyload: true,  // 这个imageLazyload应该也支持，theme文档里有
      },
      search: true,  // 如果你想用slimsearch代替默认search，可以把这个关成false试试

      // 加comment配置，从你原来的commentPlugin移过来
      comment: {
        provider: 'Waline',
        serverURL: 'https://waline.windeling.com/',
        dark: "auto",
        reaction: true,
        comment: true,
      },

      // 加photoSwipe配置，从你原来的photoSwipePlugin移过来
      photoSwipe: {
        selector: ".theme-default-content img:not(.no-zoom)",
        delay: 300,
        options: {
          shareEl: false,
        },
      },

      copyright: {
      global: true,
      triggerLength: 80,
      author: "黄文林",
      license: "CC BY-NC-SA 4.0",
      copyright: `本文作者：黄文林\n原文链接：{{ page.link }}\n转载请保留出处，禁止商用！`,
    },
    feed: {
    // 三格式全开（RSS最香，Atom/JSON兼容）
    rss: true,
    atom: true,
    json: true,

    // 每格式最多吐 50 篇（默认20，够用）
    count: 70,

    // 只抓正文页（不带首页/404）
    getter: (page) => page.frontmatter.article !== false,

    // 频道信息（自动读你主题的 title/author）
    channel: {
      // 标题（覆盖主题的）
      title: "Windelingの間 · 黄文林的碎碎念",
      // 描述
      description: "摄影风光 + 生活杂谈 + 学习笔记",
      // 站点链接（必须填！）
      link: "https://space.windeling.com",
      // 语言
      language: "zh-CN",
      // 版权
      copyright: "© 2025 黄文林 | CC BY-NC-SA 4.0",
      // 更新时间（自动取最新文章）
      pubDate: new Date(),
      // 最后更新（同上）
      lastUpdated: new Date(),

      // 作者（支持多作者，微信读书认这个）
      author: {
        name: "黄文林",
        email: "hwl@windeling.com",   // 可选
        link: "https://blog.windeling.com/about/", // 可选
      },

      // 封面图（180x180 方图，透明背景最佳）
      image: "https://blog-ground.oss-cn-guangzhou.aliyuncs.com/avatar.jpg",
    },

    // 每篇文章的配置（自动读 frontmatter）
    // 想某篇不进RSS？md 顶部写 feed: false
  },

    notice: [
  // 1. 全站弹窗：每次刷新都跳（关了就本 session 不跳）
  {
    path: "/",                    // 全站生效
    title: "🚨 更新啦！",
    content: "哥们，11月8号刚肝了三篇新笔记：<br>① 星空摄影调色教程<br>② 生活碎碎念 v2.0<br>③ Waline 评论区现在能@人了！<br><br>点右上角 × 拜拜，下次见～",
    actions: [
      { text: "立刻看新文", link: "/chat/life/" },
      { text: "懒得鸟我", type: "default" }  // 关闭按钮
    ],
    fullscreen: false,             // false=顶栏小条，true=全屏霸气弹窗
    showOnce: false,               // true=关了永久消失
    confirm: false,                // true=必须点按钮才能关
  },

  // 2. 只在摄影区弹（正则匹配）
  {
    match: /^\/photo\//,
    title: "📸 摄影专区提醒",
    content: "复制走请保留水印，不然天打雷劈！",
    actions: [{ text: "我知道啦", type: "primary" }],
    fullscreen: true,              // 全屏模式+模糊背景，逼格拉满
    confirm: true,                 // 必须点按钮才让走
    showOnce: true,                // 看一次就够了
  },
],
    },
  }),
});
