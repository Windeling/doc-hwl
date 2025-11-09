// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";
import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { appendDatePlugin } from '@vuepress/plugin-append-date';

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
    appendDatePlugin({
      enable: true,
      format: "YYYY-MM-DD HH:mm",
      frontmatter: {
        createTime: "date",
        updateTime: "updated",
      },
      type: ["frontmatter", "git", "file"],
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
              { text: "自然", link: "/photo/nature/" },
              { text: "建筑", link: "/photo/building/" },
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
    changelog: true,
    // 页面信息配置（从 markdown 中移动到这里）
    pageInfo: [
      'Author',
      'PageView',
      'Original',
      'Date',
      'Category',
      'Tag',
      'ReadingTime',
      'Word',
    ],
    // 文章加密配置（从 markdown 中移动到这里）
    encrypt: {
      config: {
        // 可以在这里配置具体的加密规则
        // 例如："/guide/encrypt.html": ["1234"],
      },
    },
    markdown: {
      imgMark: true,
      math: {
        engine: "katex",
        delimiters: "dollars",
        katex: {
          strict: false,
          output: 'html',
        }
      },
      codeTabs: true,
      tabs: true,
      tasklist: {
        label: true,
      },
      linkify: true,
      include: true,
      align: true,
      attrs: true,
      mark: true,
      sup: true,
      sub: true,
      stylize: [
        {
          matcher: '推荐',
          replacer: ({ tag }) => {
            if (tag === 'em') {
              return {
                tag: 'Badge',
                attrs: { type: 'tip' },
                content: '推荐',
              };
            }
          },
        },
        {
          matcher: '应当',
          replacer: ({ tag }) => {
            if (tag === 'em') {
              return {
                tag: 'Badge',
                attrs: { type: 'tip' },
                content: '推荐',
              };
            }
          },
        },
        {
          matcher: '必须',
          replacer: ({ tag }) => {
            if (tag === 'em') {
              return {
                tag: 'Badge',
                attrs: { type: 'danger' },
                content: '必须',
              };
            }
          },
        },
        {
          matcher: '警告',
          replacer: ({ tag }) => {
            if (tag === 'em') {
              return {
                tag: 'Badge',
                attrs: { type: 'danger' },
                content: '警告',
              };
            }
          },
        },
        {
          matcher: '注意',
          replacer: ({ tag }) => {
            if (tag === 'em') {
              return {
                tag: 'Badge',
                attrs: { type: 'warning' },
                content: '注意',
              };
            }
          },
        },
        {
          matcher: /n't$/,
          replacer: ({ tag, attrs, content }) => {
            if (tag === 'em') {
              return {
                tag: 'span',
                attrs: { ...attrs, style: 'color: red;' },
                content,
              };
            }
          },
        },
        {
          matcher: /==(.+?)==/,
          replacer: ({ content }) => ({
            tag: 'mark',
            attrs: { style: 'background: rgba(255, 211, 17, 1);' },
            content: content.slice(2, -2),
          }),
        },
      ],
      chartjs: true,
      mermaid: true,
      demo: true,
      footnotes: true,
      containers: true,
      lazyload: true,
      imgSize: true,
      figure: true,
      alert: true,
      code: {
        lineNumbers: 10,
        highlightLines: true,
      },
      vpre: true,
      checkLinks: true,
      obsidianImgSize: true,
    },
    plugins: {
      icon: {
        assets: "fontawesome",
      },
      git: true,
      // 搜索
      slimsearch: true,
      copyCode: { showInMobile: true },
      search: false,
     
      // 阅读时间（从 markdown 中移动到这里）
      readingTime: {
        wordPerMinute: 300,
      },
     
      // 幻灯片（从 markdown 中移动到这里）
      presentation: {
        plugins: [
          'highlight',
          'math',
          'search',
          'notes',
          'zoom',
        ],
      },
     
      // 评论
      comment: {
        provider: 'Waline',
        serverURL: 'https://waline.windeling.com/',
        dark: "auto",
        reaction: true,
        comment: true,
        pageview: true,
      },
      // 图片预览
      photoSwipe: {
        selector: "[vp-content] :not(a) > img:not([no-view])",
        delay: 300,
        download: true,
        copyToClipboard: true,
        shareEl: false,
        dark: "auto",
        wheelToZoom: true,
        pinchToClose: true,
        tapToClose: true,
        closeOnVerticalDrag: true,
        showCounter: true,
        preload: [2, 2],
      },
      // 版权信息（保留这个，删除了 markdown 中的重复配置）
      copyright: {
        global: true,
        triggerLength: 80,
        author: "黄文林",
        license: "CC BY-NC-SA 4.0",
        copyright: `本文作者：黄文林\n原文链接：{{ page.link }}\n转载请保留出处，禁止商用！`,
      },
      // 订阅
      feed: {
        rss: true,
        atom: true,
        json: true,
        count: 70,
        getter: (page) => page.frontmatter.article !== false,
        channel: {
          title: "Windelingの間 · 黄文林的碎碎念",
          description: "摄影风光 + 生活杂谈 + 学习笔记",
          link: "https://space.windeling.com",
          hostname: "https://space.windeling.com",
          language: "zh-CN",
          copyright: "© 2025 黄文林 | CC BY-NC-SA 4.0",
          author: {
            name: "黄文林",
            email: "hwl@windeling.com",
            link: "https://blog.windeling.com/about/",
          },
          image: "https://blog-ground.oss-cn-guangzhou.aliyuncs.com/avatar.jpg",
        },
      },
      // 通知
      notice: [
        {
          path: "/",
          title: "更新啦！",
          content: "所有数据库汇总更新",
          actions: [
            { text: "立刻看新文", link: "/chat/life/" },
            { text: "懒得鸟我", type: "default" }
          ],
          fullscreen: false,
          showOnce: false,
          confirm: false,
        },
        {
          match: /^\/photo\//,
          title: "摄影专区提醒",
          content: "复制走请保留水印，不然天打雷劈！",
          actions: [{ text: "我知道啦", type: "primary" }],
          fullscreen: true,
          confirm: true,
          showOnce: true,
        },
      ],
    },
  }),
});
