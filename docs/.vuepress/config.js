import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  // 基础配置
  lang: 'zh-CN',
  title: 'Windeling 文档',
  description: '属于「黄文林」的知识库、清单和说明书',
  
  // 主题配置
  theme: defaultTheme({
    // 网站logo
    logo: 'https://vuejs.press/images/hero.png',
    
    // 导航栏
    navbar: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: '快速开始',
        link: '/get-started/'
      },
      {
        text: '文档说明',
        link: '/doc/'
      }
    ],
    
    // 侧边栏配置
    sidebar: {
      '/get-started/': [
        {
          text: '快速开始',
          children: ['auto'
          ]
        }
      ],
      '/docs/': [
        {
          text: '文档汇聚',
          children: ['auto'
          ]
        }
      ]
    },
    
    // 主题颜色配置
    colorMode: 'auto',
    colorModeSwitch: true,
    
    // 最后更新时间
    lastUpdated: true,
    lastUpdatedText: '最后更新',
    
    // 编辑链接
    editLink: true,
    editLinkText: '在 GitHub 上编辑此页',
    
    // 仓库配置
    repo: '你的GitHub用户名/你的仓库名',
    repoLabel: 'GitHub',
    
    // 贡献者
    contributors: true,
    contributorsText: '贡献者'
  }),
  
  // 打包器配置
  bundler: viteBundler(),
  
  // 头部标签
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'keywords', content: '文档,知识库,黄文林' }]
  ]
})