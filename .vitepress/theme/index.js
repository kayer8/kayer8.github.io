import mermaid from 'mermaid';

export default {
  enhanceApp({ app, router }) {
    if (typeof window !== 'undefined') {
      mermaid.initialize({ 
        startOnLoad: false,
        theme: 'default' // 可选主题配置
      });
      
      // 页面加载后渲染
      router.afterEach(() => {
        setTimeout(() => {
          mermaid.init(undefined, '.mermaid');
        }, 100);
      });
    }
  }
};