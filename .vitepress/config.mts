import { defineConfig } from 'vitepress'
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/",
  title: "宽脉文档",
  description: "A VitePress Site",
  vite: {
    plugins: [MermaidPlugin()],
    optimizeDeps: {
        include: ['mermaid'],
    },
  },
  markdown: {
    config: (md) => {
      md.use(MermaidMarkdown)
    }
  },
  themeConfig: {
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '快速开始', link: 'docs/guide/getting-started' },
          { text: '主题样式', link: 'https://semi.design/zh-CN/basic/tokens' },
        ]
      },
      {
        text: '前端规范',
        collapsed: false,
        items: [
          { text: 'Git 提交规范', link: 'docs/frontend-standard/git' },
          {
            text: '代码规范',
            items: [
              { text: '命名规范', link: 'docs/frontend-standard/coding-style/naming-rules' },
              { text: '最佳实践', link: 'docs/frontend-standard/coding-style/best-practice' },
              { text: '注释规范', link: 'docs/frontend-standard/coding-style/comments' }
            ]
          },
          {
            text: '格式规范',
            items: [
              { text: 'Prettier 配置', link: 'docs/frontend-standard/format/prettier-config' },
              { text: 'ESLint 配置', link: 'docs/frontend-standard/format/eslint-config' }
            ]
          }
        ]
      },
      {
        text: '代码文档',
        collapsed: false,
        items: [
          {
            text: '组件文档',
            items: [
              { text: 'Button 按钮', link: 'docs/code-docs/components/button' },
              { text: 'FixedPageFooter 底部固定栏', link: 'docs/code-docs/components/fixed-page-footer' },
              { text: 'Input 输入框', link: 'docs/code-docs/components/input' },
              { text: 'Table 表格', link: 'docs/code-docs/components/table' }
            ]
          },
          {
            text: '工具类文档',
            items: [
              { text: 'eventBus', link: 'docs/code-docs/utils/eventBus' },
            ]
          },
          {
            text: 'behavior文档',
            items: [
              { text: 'list', link: 'docs/code-docs/behavior/list' },
            ]
          },
          {
            text: 'scripts文档',
            items: [
              { text: 'scripts', link: 'docs/code-docs/scripts/index' },
            ]
          },
          {
            text: 'template文档',
            items: [
              { text: 'index', link: 'docs/code-docs/template/index' },
            ]
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kayer8/kayer8.github.io' }
    ]
  }
})
