---
title: 【JavaScript插件】点击复制之clipboard.js
date: 2021-07-03
showSponsor: true
categories:
 - javascript插件
tags:
 - javascript插件
---

## [复制粘贴插件——clipboard.js的使用]

### 1.安装方式：

- npm下载:

```
// npm 安装
npm install clipboard --save
```

- [点击此处下载zip文件](href="https://github.com/zenorocha/clipboard.js/archive/master.zip")

### 2.设置

- `script` 引入

```javascript
<script src="dist/clipboard.min.js"></script>
```

- 三方CDN引入

  ```javascript
  <script src="https://cdn.bootcdn.net/ajax/libs/clipboard.js/2.0.6/clipboard.min.js"></script>
  ```



### 3.使用方法：

```javascript
<script>
    //使用前，需要实例化
	new ClipboardJS('.btn');
</script>
```

#### 	复制

相当普遍的使用场景是从其他元素复制文本。在触发元素上添加 `data-clipboard-target` 属性，该属性值用来匹配另一个元素选择器。

```javascript
<!-- Target -->
<!-- <input
  id="bar"
  value="无敌大帅哥"
> -->
<p id="bar">无敌大帅哥</p>
<!-- Trigger -->
<button class="btn" data-clipboard-target="#bar" > 复制 </button>
```

#### 剪切

另外，也可以定义 `data-clipboard-action` 属性为 `copy/cut` 来，明确操作是 `复制 / 剪切`
如果忽略了这个属性，便默认 `复制`

```javascript
<!-- Target -->
<textarea id="bar">Mussum ipsum cacilds...</textarea>

<!-- Trigger -->
<button class="btn" data-clipboard-action="cut" data-clipboard-target="#bar">
    Cut to clipboard
</button>
```

正如上例，**剪切 `cut`** 的操作只能在 `<input>` 和 `<textarea>` 标签中起作用，**在其他标签中会出现事件正常调用，但是操作是失败的，粘贴板是没有改变的**。

#### 通过属性复制文本

我们甚至不必需要其他承载文本的元素，仅通过 在触发元素中 添加 `data-clipboard-text` 属性 来完成复制

```javascript
<!-- Trigger -->
<button class="btn" data-clipboard-text="Just because you can doesn't mean you should — clipboard.js">
    Copy to clipboard
</button>
```

注意：

- `data-clipboard-text` “级别最高”，在 `data-clipboard-target` 等属性存在时，复制内容及相关参数以 `data-clipboard-text` 为准

#### 事件

回调函数： `success / error`

| 事件名  | 参数                               |
| ------- | ---------------------------------- |
| success | event.action `copy/cut` 操作       |
|         | event.text `copy/cut` 操作文本内容 |
|         | event.triger 触发操作的`DOM`元素   |
| error   | event.action `copy/cut` 操作       |
|         | event.triger 触发操作的`DOM`元素   |

```javascript
var clipboard = new ClipboardJS('.btn');

clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);

    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});
```

#### 高级用法(推荐)

如果你不想修改你的HTML，有一个非常方便的命令式API供你使用。您所需要做的就是声明一个函数，执行您的操作，然后返回一个值。

例如 如果想动态的设置一个目标元素`target`，则需要返回一个节点,即 动态设置点击复制的目标元素

```javascript
new ClipboardJS('.btn', {
    target: function(trigger) {
        return trigger.nextElementSibling  ||  document.getElementById('name');
    }
});
```

如果想动态设置内容文本`text`，则返回一个字符串`String`

```javascript
new ClipboardJS('.btn', {
    text: function(trigger) {
        return trigger.getAttribute('aria-label') || 'default text ';
    }
});
```

在`Bootstrap Modals` 中或与任何其他更改焦点的库一起使用时，将希望将焦点元素设置为 `container` 值。

```
new ClipboardJS('.btn', {
    container: document.getElementById('modal')
});
```

并且，如果在单页应用中使用时，要更精确地管理DOM的生命周期，可以使用以下方法清除创建的事件对象

```
var clipboard = new ClipboardJS('.btn');
clipboard.destroy();
```

#### 浏览器支持

这个库同时依赖于`Selection`和`execCommand` **api**。所有浏览器都支持第一个，而以下浏览器支持第二个。

- Chrome 42 +
- Edge12 +
- Firefox 41 +
- IE 9 +
- Opera 29 +
- Safari 10 +



#### 注意事项：

##### 解决 clipboard.js 在ios中失效的问题

解决办法有6种：

- 将 `click` 事件直接绑定到目标元素(即 `.target` ) 上
- 将目标元素换成 `<a>` 或者 `<button>` 等可点击的元素
- 给目标元素添加一个空的 `onclick=""`(<div class="target" onclick="">点击我!</div>)
- 把 `click` 改成 `touchend` 或 `touchstart`（注意加上preventDefault）
- 将 `click` 元素委托到非 `document` 或 `body` 的父级元素上
- 给目标元素加一条样式规则 `cursor: pointer;` (cursor: pointer; -webkit-tap-highlight-color: transparent;)

推荐后两种。推测在 Safari 中，不可点击元素的点击事件是不会冒泡到父级元素的。通过添加 `cursor: pointer;` 使得元素变成了可点击的了。



目前试过第二种，尽量把元素放在可点击的元素上，使用 button  元素，解决ios 真机复制失效的问题