# Component 

## 基本用法

```html
<div id="app-1" v-bind:style="[styleDiv1]">
    <blog-post v-on:enlarge-text="enlargeText" v-for="item in items" v-bind:blog="item" :key="item.id"></blog-post>
</div>
```

```vuejs
Vue.component("blog-post", {
    props: ["blog"],
    template: `
        <div> 
            <label for="title">Title: </label>
            <span id="title">{{blog.title}}</span>
            <br>
            <label for="author">Author: </label>
            <span id="author">{{blog.author}}</span>
            <br>
            <label for="content">Content: </label>
            <span id="content">{{blog.content}}</span>
            
            <button v-on:click="$emit('enlarge-text')">Enlarge blog post</button>
        </div>
    `
});

var vm1 = new Vue({
    el: "#app-1",
    data: {
        items: [
            {
                id: 1,
                title: "title 1",
                content: "content 1",
                author: "a",
            },
            {
                id: 2,
                title: "title 2",
                content: "content 1",
                author: "b",
            },
        ],
        fontSize: 1,
    },
    computed: {
        styleDiv1: function () {
            return {
                "font-size": this.fontSize + "em",
            }
        }
    },
    methods: {
        enlargeText: function () {
            this.fontSize = this.fontSize + 0.1
        }
    }
});
```

Note:

- `Vue.component(...)` 方式是全局注册组件的方式，在任何新创建的 Vue 根实例中都可以使用
- 每个组件必须只有一个根元素，这就是上述例子中将组件通过 `div` 标签包裹起来的原因
- `props` 是你在组件上注册的自定义属性，可以通过自定义属性来向组件传值
- 可以监听子组件事件，实现组件和父级组件的沟通。实现步骤为：
- - 子组件：申明一个自定义的事件，如 `v-on:click="enlarge-text""`
- - 父组件：处理子组件的自定义事件，如 `v-on:enlarge-text="enlargeText"`

## 使用事件抛出一个值

子组件
```html
<button v-on:click="$emit('enlarge-text', 0.1)">
  Enlarge text
</button>
```

父组件
```html
<blog-post
  ...
  v-on:enlarge-text="onEnlargeText"
></blog-post>
```

```vuejs
methods: {
  onEnlargeText: function (enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
```

## 在组件上使用 v-model

```html
<div id="app-2">
    <custom-input v-model="searchText"></custom-input>
    <p>searchText: {{searchText}}</p>
</div>
```

```vuejs
Vue.component('custom-input', {
    props: ['value'],
    template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
});

var vm2 = new Vue({
    el: "#app-2",
    data: {
        searchText: "",
    }
});
```

## 通过插件槽分发

```html
<div id="app-3">
    <custom-alter>
        Something bad happened
    </custom-alter>
</div>
```

```vuejs
Vue.component("custom-alter", {
    template: `
        <div class="demo-alert-box">
            <strong>Error!</strong>
            <slot></slot>
        </div> 
    `,

});

vm3 = new Vue({
    el: "#app-3",
    data: {
    }
});
```

## 解析 Dom 模板时注意事项

有些 HTML 元素，诸如 <ul>、<ol>、<table> 和 <select>，对于哪些元素可以出现在其内部是有严格限制的。
而有些元素，诸如 <li>、<tr> 和 <option>，只能出现在其它某些特定的元素内部。

这会导致我们使用这些有约束条件的元素时遇到一些问题。例如：

```html
<table>
  <blog-post-row></blog-post-row>
</table>
```

这个自定义组件 <blog-post-row> 会被作为无效的内容提升到外部，并导致最终渲染结果出错。
幸好这个特殊的 is 特性给了我们一个变通的办法：

```html
<table>
  <tr is="blog-post-row"></tr>
</table>
```