// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";
import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";

export default defineUserConfig({
  lang: "zh-CN",
  title: "Windeling 文档（beta）",
  description: "属于「黄文林」的知识库、清单和说明书",

  // 必须显式指定 bundler
  bundler: viteBundler(),

  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "keywords", content: "文档,知识库,黄文林" }],
  ],

  // 这里 **不再** 使用 @vuepress/plugin-search
  // plugins: [],   // 如果以后需要其它官方插件再打开

  theme: hopeTheme({
    // 作者、logo
    author: "黄文林",
    logo: "https://vuejs.press/images/hero.png",

    // 导航栏
    navbar: [
      { text: "首页", link: "/" },
      {
        text: "拾枝杂谈",
        children: [
          { text: "奇思妙想", link: "/chat/thought/" },
          { text: "朴实生活", link: "/chat/life/" },
        ],
      },
      { text: "文档说明", link: "/doc/" },
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

    // ==================== 侧边栏 ====================
    sidebar: {
      // 首页：可折叠的文件结构
      "/": [
        {
          text: "Windeling 文档",
          collapsible: true,
          collapsed: true,
          children: "structure",
        },
      ],

      // 其它路径：在文章页面显示 H2/H3 标题目录
      "/chat/": "headers",
      "/doc/": "headers",
      "/study/": "headers",
      "/photo/": "headers",
    },

    headerDepth: 3,
    sidebarIcon: true,

    // ==================== Markdown 增强 ====================
    markdown: {
      footnote: true,
      tasklist: true,
      sup: true,
      sub: true,
      imageLazyload: true,
    },

    // ==================== 插件（内置） ====================
    plugins: {
      // 代码复制
      copyCode: { showInMobile: true },

      // 更强大的全文搜索（searchPro）
      searchPro: {
        indexContent: true,     // 索引正文
        autoSuggestions: true,  // 实时建议
        hotKeys: ["s", "/"],    // 快捷键
      },
    },

    // ==================== 其它功能 ====================
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
  }),
});
