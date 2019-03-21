[TOC]

# Getting started

Vue 是一套用于构建用户界面的渐进式框架，它的核心在于允许用户通过简单的语法将数据渲染到 DOM 元素中。

## 声明式渲染

### 渲染数据

```html
<div id="app-1">
    {{message}}
</div>
```

```vuejs
var app1 = new Vue({
    el: "#app-1",
    data: {
        message: "hello vue",
    },
    methods: {},
});
```

### 渲染属性值(v-bind)

```html
<div id="app-2">
    <input type="text" v-bind:value="defaultMessage">
</div>
```

```vuejs
var app2 = new Vue({
    el: "#app-2",
    data: {
        defaultMessage: "hello vue"
    },
    methods: {},
});
```

## 条件与循环

### 条件判断（v-if）

```html
<div id="app-3">
    <span v-if="seen">显示隐藏</span>
</div>
```

```vuejs
var app3 = new Vue({
    el: "#app-3",
    data: {
        seen: true
    },
    methods: {},
});
```

### 循环（v-for）

```html
<div id="app-4">
    <ol>
        <li v-for="item in items">
            {{item.value}}
        </li>
    </ol>
</div>
```

```vuejs
var app4 = new Vue({
    el: "#app-4",
    data: {
        items: [
            {
                value: "1",
            },
            {
                value: "2",
            },
        ],
    },
    methods: {},
});
```

## 处理用户输入

### 绑定事件(v-on)

```html
<div id="app-5">
    <p>{{message}}</p>
    <button v-on:click="reverseMessage">click to reverse message</button>
</div>
```

```vuejs
var app5 = new Vue({
    el: "#app-5",
    data: {
        message: "hello vue"
    },
    methods: {
        reverseMessage: function() {
            // 方法中可以访问 data 中数据
            this.message = this.message.split(" ").reverse().join(" ")
        }
    },
});
```

### 双向绑定(v-model)

```html
<div id="app-6">
    <p>{{message}}</p>
    <input v-model="message">
</div>
```

```vuejs
var app6 = new Vue({
    el: "#app-6",
    data: {
        message: "hello world",
    },
    methods: {},
});
```

## 组件化应用(Vue.component)

- 声明一个组件
```vuejs
Vue.component("todo-item", {
    props: ["item"],
    template: "<li>{{todo.value}}</li>",
});

var app7 = new Vue({
    el: "#app-7",
    data: {
        todos: [
            {value: "1"},
            {value: "2"}
        ]
    },
    methods: {},
});
```

```html
<div id="app-7">
    <todo-item v-for="todo in todos" v-bind:item="todo"></todo-item>
</div>
```