# FixedPageFooter 底部固定栏

用于页面底部固定显示的通用容器组件，适配全面屏安全区域。

## 基本使用

~~~html

```wxml
<!-- 页面模板 -->
<view class="container">
  <scroll-view scroll-y style="height: 100vh">
    <!-- 页面内容 -->
  </scroll-view>

  <!-- 固定底部 -->
  <fixed-page-footer 
    class="custom-footer"
    style="--fixed-page-footer-bg-color: #f7f7f7;"
  >
    <view class="fixed-page-footer__wrapper">
      <button class="submit-btn">提交订单</button>
    </view>
  </fixed-page-footer>
</view>
~~~

## 组件特性

### 安全区域适配

- 自动处理 iOS+ 底部安全区域
- 自动处理 Android 全面屏适配
- 需要配合占位符元素使用

### CSS 变量

| 变量名称                     | 说明                   | 默认值 |
| :--------------------------- | :--------------------- | :----- |
| --fixed-page-footer-bg-color | 背景颜色               | #fff   |
| --fixed-page-footer-z-index  | 层级索引               | 1001   |
| --fixed-page-footer-height   | 容器高度（不含安全区） | 128rpx |

### 类名说明

| 类名                           | 说明                 |
| :----------------------------- | :------------------- |
| class                          | 外部传入的自定义类名 |
| fixed-page-footer              | 根节点样式类         |
| fixed-page-footer__wrapper     | 内容容器样式类       |
| fixed-page-footer__placeholder | 占位符样式类         |

## 使用注意事项

1. **必须添加占位符元素**
   在页面底部需要添加 `<view class="fixed-page-footer__placeholder"/>` 防止内容被遮挡

2. **层级控制**
   默认 z-index 为 1001，可通过 CSS 变量覆盖：

   css

   

   复制

   

   下载

   ```
   /* 在页面样式文件中 */
   .custom-footer {
     --fixed-page-footer-z-index: 999;
   }
   ```

3. **样式覆盖**
   推荐通过以下方式覆盖样式：

   ```
   <!-- 方式1：通过外部类名 -->
   <fixed-page-footer class="custom-footer" />
   
   <!-- 方式2：通过内联样式 -->
   <fixed-page-footer style="--fixed-page-footer-bg-color: #f0f0f0;" />
   ```

## 最佳实践

```html
<!-- 带安全区适配的底部操作栏 -->
<fixed-page-footer>
  <view class="fixed-page-footer__wrapper space-around">
    <button class="action-btn">加入购物车</button>
    <button class="action-btn primary">立即购买</button>
  </view>
</fixed-page-footer>

<!-- 配套样式 -->
<style lang="scss">
.action-btn {
  width: 320rpx;
  height: 80rpx;
  border-radius: 40rpx;
  
  &.primary {
    background: linear-gradient(90deg, #ff5a5f, #ff2d52);
    color: white;
  }
}
</style>
```

## 技术实现

- 使用 `position: fixed` 实现固定定位
- 通过 `safe-area-inset-bottom` 适配全面屏设备
- 采用 CSS 变量实现灵活样式配置
- 使用 BEM 命名规范保持样式结构清晰