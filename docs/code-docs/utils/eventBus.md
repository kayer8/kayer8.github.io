# 前端 EventBus 文档

## 一、概述

该 EventBus 主要用于解决前端跨页面通信、多页面通信问题，通过发布订阅模式，让页面间可以更高效、更精准地进行数据交互与行为通知，避免因页面反复刷新带来的不必要请求开支。

## 二、核心模块

### （一）事件行为枚举（constant.js）

对各类事件行为进行统一命名规范与管理，以模块名称（大写）_行为名称（大写）的形式定义事件类型：

- **LINK 模块事件** ：
  - `LINK_CREATE` ：链接创建
  - `LINK_UPDATE` ：链接更新
  - `LINK_DELETE` ：链接删除
  - `LINK_UP_OR_DOWN` ：链接上下架
  - `LINK_FORWARD_CHANGE` ：链接转发状态变更
- **SCENE 模块事件** ：
  - `SCENE_TEMPLATE_CREATE` ：场景模板创建
  - `SCENE_TEMPLATE_UPDATE` ：场景模板编辑
  - `SCENE_TEMPLATE_DELETE` ：场景模板删除
  - 其他如场景修改、成员标签变更、圈子加入等相关事件
- **COMPANYCARD 模块事件** ：`COMPANYCARD_MEMBER_UPDATE` （企业名片成员编辑）

### （二）异步事件行为（asyncEvent.js）

- **功能** ：提供一种在页面显示隐藏状态变化下的异步事件处理机制。
- **核心数据** ：
  - `pageShowBool` ：标识页面是否显示，初始为 false，在页面显示的生命周期函数 `show` 中设为 true，在页面隐藏的生命周期函数 `hide` 中设为 false。
  - `asyncCallBack` ：用于存储异步回调函数的队列，初始为 null。
- **核心方法** ：
  - `bindAsyncEvent(fun)` ：用于绑定异步事件的函数。页面显示时直接执行传入的回调函数；页面隐藏时，将回调函数添加到 `asyncCallBack` 队列中，且会去重。当页面再次显示时，在 `show` 生命周期中会依次执行队列中的回调函数，并清空队列。
  - `clearAsyncEvents()` ：清除所有待处理的异步事件，即清空 `asyncCallBack` 队列。

### （三）事件总线（eventBus.js）

- **单例模式** ：通过 `static getInstance()` 方法确保整个应用中只有一个 EventBus 实例，方便全局通信。
- **调试模式** ：可通过 `setDebug(enabled)` 方法启用或禁用调试模式，开启后会在控制台输出相关调试信息。
- **核心功能** ：
  - **事件订阅（on）** ：用于订阅指定事件，添加回调函数到对应的事件监听器集合中。参数为事件名称（字符串）和回调函数，返回一个包含 `unsubscribe`（取消订阅）和 `remove`（移除监听器）方法的对象。
  - **监听一次（once）** ：让回调函数只执行一次，执行完毕后自动移除该监听器。通过包装回调函数实现，在回调执行后移除自身。
  - **事件取消订阅（off）** ：可移除指定事件的特定回调函数，或移除整个事件的所有监听器。参数为事件名称和可选的回调函数。
  - **事件触发（emit）** ：触发指定事件，执行该事件对应的所有回调函数，并将传入的参数传递给回调函数。在执行回调时，会先对监听器集合进行复制，防止迭代过程中对集合的修改引发问题。
  - **私有方法** ：如 `#validateEventType` 用于校验事件名称类型，`#log` 用于调试日志输出，`#handleError` 用于处理事件执行过程中的错误。
  - **其他辅助功能** ：`clear` 方法用于清空所有事件监听（需谨慎使用），`eventCount` 属性可获取当前事件总数。

## 三、使用指南

### （一）订阅事件

1. 在页面的 `onLoad` 生命周期中，通过 `EventBus.getInstance().on(EVENT_ACTION.具体事件, 回调函数.bind(this))` 订阅感兴趣的事件。
2. 在页面的 `onUnload` 生命周期中，调用 `EventBus.getInstance().off(EVENT_ACTION.具体事件, 回调函数.bind(this))` 取消订阅，避免内存泄漏。

### （二）发布事件

在需要通知其他页面或组件的地方（如保存操作完成后），调用 `EventBus.getInstance().emit(EVENT_ACTION.具体事件, 数据)` 发布事件，将相关数据传递给订阅该事件的回调函数。

### （三）示例代码

- **订阅页面代码** ：

JavaScript

复制

```javascript
import { EventBus, EVENT_ACTION } from "~/utils/event/index.js";

Page({
    onLoad() { 
        // 订阅  
        EventBus.getInstance().on(EVENT_ACTION.LINK.UPDATE, this.afterUpdated.bind(this));
    },

    onUnload() {
        // 销毁
        EventBus.getInstance().off(EVENT_ACTION.LINK.UPDATE, this.afterUpdated.bind(this));
    },
    // 接收到保存后的行为
    afterUpdated(data) {
        // 根据 data 进行相关操作，如刷新列表等
    }
})
```

- **发布页面代码** ：

JavaScript

复制

```javascript
import { EventBus, EVENT_ACTION } from "~/utils/event/index.js";

Page({
    async save() {
        // ... 保存行为逻辑 
        EventBus.getInstance().emit(EVENT_ACTION.LINK.UPDATE, data);
    }
})
```

## 四、注意事项

1. 合理使用事件订阅与发布，避免过度依赖导致代码逻辑混乱。在页面卸载时及时取消订阅。
2. 确保事件名称的唯一性和准确性，遵循命名规范，在 constant.js 中统一管理。
3. 在使用异步事件行为时，要注意页面显示隐藏状态对事件执行的影响，合理安排异步操作逻辑。