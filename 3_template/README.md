# 模板语法

## 插值

### 文本

文本的插值，使用 `{{var}}` 即可。

```html
<div id="app">
    {{message}}
</div>
```

```vuejs
var vm = new Vue({
    el: "#app",
    data: {
        message: "this is message"
    },
    methods: {}
});
```

### 绑定属性值

给属性赋值，使用 `v-bind` 指令即可

```html
<div id="app">
    <a v-bind:href="url">click to open link</a>
</div>
```

```vuejs
var vm = new Vue({
    el: "#app",
    data: {
        url: "https://www.google.com"
    },
    methods: {},
});
```

### 使用 javascript 表达式

```html
<div id="app">
    <p>{{message + 1}}</p>
    <p>{{ok? yes: no}}</p>
</div>
```

## 指令

指令(Directives) 是以 `v-` 开头的，其作用是改变 Dom 元素的值.
按照指令是否带参数来分的话，可将指令分为：
- 不带参数指令：`v-if`, `v-for` etc.
- 带参数指令：`v-bind`, `v-on` etc.

### 带参数指令

```html
<div id="app">
    <button v-on:click="btnClick">click me</button>
</div>
```

```vuejs
var vm = new Vue({
    el: "#app",
    data: {},
    methods: {
        btnClick: function() {
           console.log("button clicked")
        }
    },
});
```