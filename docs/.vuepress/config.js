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

    // 在这里配置所有 markdown 增强功能
    markdown: {
      // GFM 功能
  gfm: true,
  
  // 任务列表
  tasklist: {
    disabled: false,
    label: true,
    // 更多任务列表选项
  },
  
  // 脚注
  footnote: true,
  
  // 上下标
  sup: true,
  sub: true,
  
  // 自动链接
  autolink: true,
  
  // 自定义容器
  container: true,
  
  // 组件
  component: true,
  
  // 表格
  table: true,
  
  // 隐藏内容
  spoiler: true,
  
  // 代码标签页
  codeTabs: true,
  
  // 代码演示
  demo: true,
  
  // 图片增强
  image: {
    lazy: true,
    size: true,
    mark: true,
    title: true,
  },
  
  // 图片标记
  imageMark: true,
  
  // 图片大小
  imageSize: true,
  
  // 提示框
  hint: true,
  
  // 对齐支持
  align: true,
  
  // 标记支持
  mark: true,
  
  // 导入支持
  include: true,
  
  // 属性支持
  attrs: true,
  
  // 选项卡
  tabs: true,
  
  // 代码组
  codeGroup: true,
  
  // 代码块行号
  lineNumbers: true,
  
  // 代码块高亮行
  highlightLines: true,
  
  // VPre 容器
  vPre: true,
  
  // 链接检查
  linkCheck: true,
  
  // 数学公式
  
  // 图表支持
  chart: true,
  
  // 流程图
  flowchart: true,
  
  // Mermaid 图表
  mermaid: true,
  
  // 阅读时间
  readingTime: true,
  
  // 页面信息
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
  
  // 版权信息
  copyright: true,
  
  // 文章加密
  encrypt: true,
  
  // 幻灯片
  presentation: {
    plugins: [
      'highlight',
      'math',
      'search',
      'notes',
      'zoom',
    ],
  },
      // 图片相关
      figure: true,
      imgLazyload: true,
      imgMark: true,
      imgSize: true,
      obsidianImgSize: true,
      // 代码块高亮
      code: {
        lineNumbers: 10, // 超过10行显示行号
        highlightLines: true,
      },
      // 数学公式
      math: {
        type: "katex",
        delimiters: "dollars",
        katex: {
          strict: false,
          output: 'html',
        }
      },
      // 图表
      // 标记增强
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
      // 新增：启用 tab 和 spoiler 功能
    },
    plugins: {
      
      icon: {
      // 关键词: "iconify", "fontawesome", "fontawesome-with-brands"
      assets: "fontawesome",
     },
      git: true,
      // 搜索
      slimsearch: true,
      copyCode: { showInMobile: true },
      search: false,
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
      // 版权信息
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
      // 阅读时间
      readingTime: {
        wordPerMinute: 300,
      },
      // 通知
      notice: [
        {
          path: "/",
          title: "更新啦！",
          content: "汇总更新",
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
          content: "复制走请保留注明来源。",
          actions: [{ text: "我知道啦", type: "primary" }],
          fullscreen: true,
          confirm: true,
          showOnce: true,
        },
      ],
    },
  }),
});
