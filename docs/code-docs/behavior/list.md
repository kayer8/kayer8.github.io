# list-behavior.js 前端文档

## 概述

本文件定义了一个用于处理列表加载、刷新、分页等行为的通用 Behavior 模块，适用于需要分页加载数据的列表场景。


## 数据字段 (Data)

| 字段名          | 类型    | 默认值 | 说明                                          |
| :-------------- | :------ | :----- | :-------------------------------------------- |
| `loaded`        | boolean | false  | 标识是否已完成首次加载                        |
| `page`          | number  | 1      | 当前页码（从 1 开始）                         |
| `finished`      | boolean | false  | 标识是否已加载完所有数据                      |
| `list`          | Array   | []     | 存储列表数据                                  |
| `loading`       | boolean | false  | 全局加载状态（任何加载操作进行中时为 `true`） |
| `refresherBool` | boolean | false  | 下拉刷新状态                                  |
| `loadMoreBool`  | boolean | false  | 加载更多状态                                  |
| `scrollTop`     | number  | 0      | 列表滚动位置（需通过 `onScroll` 方法更新）    |

## 方法 (Methods)

### `load()`

- **功能**: 初始加载列表数据（第一页）
- **流程**:
  1. 调用 `fetchList(1)` 获取数据
  2. 通过 `transformData` 处理响应数据
  3. 重置列表状态并更新数据
  4. 触发 `afterListAction('load')` 回调

------

### `refresher()`

- **功能**: 下拉刷新操作
- **流程**:
  1. 设置加载状态
  2. 重新加载第一页数据
  3. 重置列表到顶部 (`scrollTop: 0`)
  4. 触发 `afterListAction('refresher')` 回调
- **注意**: 会自动取消下拉刷新动画

------

### `loadMore()`

- **功能**: 加载下一页数据
- **拦截条件**（满足任一则中断）:
  - `loading === true`
  - `finished === true`
  - `loadMoreBool === true`
- **流程**:
  1. 递增页码请求数据
  2. 合并新旧列表数据
  3. 触发 `afterListAction('loadMore')` 回调

------

### `transformData(payload, page)`

- **功能**: 格式化接口返回数据

- **参数**:

  - `payload`: 接口响应数据
  - `page`: 当前请求的页码

- **返回值**:

  ```javascript
  {
    finished: boolean,  // 是否已加载完全部数据
    list: Array,        // 当前页数据列表
    page: number        // 当前页码
  }
  ```

- **逻辑**:

  ```javascript
  finished = page >= payload.last_page
  list = payload.data
  ```

------

### `onScroll(e)`

- **功能**: 记录列表滚动位置
- **参数**:
  - `e.detail.scrollTop`: 滚动条距顶部距离

------

### `handleError(error)`

- **功能**: 统一错误处理
- **行为**:
  - 控制台打印错误
  - 显示 Toast 提示（优先使用 `error.message`，默认显示 "未知错误"）

------

### `afterListAction(type)`

- **功能**: 列表操作后置钩子（需组件覆盖实现）
- **参数**:
  - `type`: 操作类型，可选值 `'load' | 'refresher' | 'loadMore'`

------

## 注意事项

1. **必需实现的方法**:

   - 组件中必须实现 `fetchList(page)` 方法用于实际请求数据，示例：

     ```javascript
     fetchList(page) {
       return api.getList({ page })
     }
     ```

2. **滚动位置问题**:

   - `scrollTop` 需要通过 `onScroll` 方法手动更新
   - 直接修改 `this.scrollTop` 无效，需使用 `setData({ scrollTop })`

3. **状态管理**:

   - 避免同时触发多个加载操作（通过 `loading` 状态拦截）
   - 首次加载完成后 `loaded` 会置为 `true`

4. **数据格式要求**:

   - 接口响应需包含 `last_page` (总页数) 和 `data` (当前页数据) 字段

------

## 使用示例



```js
const listBehavior = require('./list-behavior.js');

Component({
  behaviors: [listBehavior],
  
  methods: {
    // 必须实现的数据请求方法
    async fetchList(page) {
      return api.getList({ page });
    },

    // 覆盖后置钩子
    afterListAction(type) {
      if (type === 'loadMore') {
        console.log('已加载第', this.data.page, '页数据');
      }
    }
  }
})
```