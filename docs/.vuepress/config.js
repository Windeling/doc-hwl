// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";
import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { appendDatePlugin } from '@vuepress/plugin-append-date';
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch';
import { copyrightPlugin } from '@vuepress/plugin-copyright';
import { noticePlugin } from '@vuepress/plugin-notice';
import { markdownMathPlugin } from '@vuepress/plugin-markdown-math';
import { markdownImagePlugin } from '@vuepress/plugin-markdown-image';
import { feedPlugin } from '@vuepress/plugin-feed';
import { photoSwipePlugin } from '@vuepress/plugin-photo-swipe';
import { markdownExtPlugin } from '@vuepress/plugin-markdown-ext';
import { markdownStylizePlugin } from '@vuepress/plugin-markdown-stylize';
import { shikiPlugin } from '@vuepress/plugin-shiki';
import { markdownChartPlugin } from '@vuepress/plugin-markdown-chart'

export default defineUserConfig({
  lang: "zh-CN",
  title: "Windelingの間 文档",
  description: "属于「黄文林」的知识库、清单和说明书",

  bundler: viteBundler(),

  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "keywords", content: "文档,知识库,黄文林" }],
  ],

  // —— 根 plugins 只留 appendDate —— //
  plugins: [
    markdownChartPlugin({
      echarts: true   // 就这一行，ECharts 就活了！
    }),

    shikiPlugin({
      // 光暗双主题（Hope 自动切）
      themes: {
        light: "github-light",   // 白天清爽
        dark: "github-dark",     // 夜间护眼
      },

      // 行号 + 高亮
      lineNumbers: true,
      notationDiff: true,
      notationFocus: true,
      notationHighlight: true,
      notationWordHighlight: true,

      // TS 神器：悬浮看类型
      twoslash: true,

      // 预加载常用语言（加速）
      preload: ["js", "ts", "vue", "bash", "json", "md", "yaml"],
    }),

    markdownStylizePlugin({
      // 自定义规则数组
      custom: [
        // 1. *推荐* → 绿底徽章
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

        // 2. *必须* → 红底徽章
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
                content: '必须',
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
                attrs: { type: 'danger' },
                content: '必须',
              };
            }
          },
        },

        // 3. n't 结尾的单词 → 红字（比如 *doesn't*）
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

        // 4. ==高亮== → 荧光黄
        {
          matcher: /==(.+?)==/,
          replacer: ({ content }) => ({
            tag: 'mark',
            attrs: { style: 'background: rgba(255, 211, 17, 1);' },
            content: content.slice(2, -2), // 去掉 ==
          }),
        },
      ],
    }),
    
    markdownExtPlugin({
      // GFM 全家桶（自动链接、删节线、任务列表、表格对齐）
      gfm: true,

      // 脚注：[^1]: 描述
      footnote: true,

      // 上标 ^text^ 和下标 ~text~
      sup: true,
      sub: true,

      // 自动转链接：www.baidu.com → 可点
      autolink: true,

      // 自定义容器：::: tip ::::
      container: true,

      // 组件 fence：::: my-comp ::::
      component: true,

      // 任务列表：[x] 已完成
      tasklist: true,

      // 表格对齐：:--: 居中
      table: true,
    }),

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

    // —— 所有 markdown 增强写这里 —— //
    markdown: {
      tasklist: true,
      footnote: true,
      imageLazyload: true,

      // markdown-image 功能全开
      figure: true,
      imgLazyload: true,
      imgMark: true,
      imgSize: true,
      obsidianImgSize: true,

      // 数学公式
      math: {
        type: "katex",
        delimiters: "dollars",
        katex: { strict: false }
      }
    },

    // —— 所有插件配置写 theme.plugins —— //
    plugins: {
      slimsearch: true,
      copyCode: { showInMobile: true },
      search: false, // slimsearch 替代

      comment: {
        provider: 'Waline',
        serverURL: 'https://waline.windeling.com/',
        dark: "auto",
        reaction: true,
        comment: true,
        pageview: true,
      },

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

      copyright: {
        global: true,
        triggerLength: 80,
        author: "黄文林",
        license: "CC BY-NC-SA 4.0",
        copyright: `本文作者：黄文林\n原文链接：{{ page.link }}\n转载请保留出处，禁止商用！`,
      },

      feed: {
        rss: true,
        atom: true,
        json: true,
        count: 70,
        getter: (page) => page.frontmatter.article !== latencies !== false,

        channel: {
          title: "Windelingの間 · 黄文林的碎碎念",
          description: "摄影风光 + 生活杂谈 + 学习笔记",
          link: "https://space.windeling.com",
          hostname: "https://space.windeling.com",  // 必须！
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
      readingTime: {
      wordPerMinute: 300,  // 中文每分钟300字
      // 访问量开关（默认关）
      pageViews: true,     // ← 关键！开访问量
    },
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