# Class 与 Style 绑定

## Class 绑定

### 对象语法

```html
<div id="app">
    <p v-bind:class="classObject">class 绑定-对象语法</p>
</div>
```

```vuejs
var vm = new Vue({
    el: "#app",
    data: {
        isActive: true,
        hasError: false,
    },
    computed: {
        classObject: function() {
            return {
                "active": this.isActive,
                "text-danger": this.hasError,
            }
        }
    }
});
```

### 数组语法

```html
<div id="app">
    <p v-bind:class="[classObj1, classObj2]">class 绑定-数组语法</p>
</div>
```

```vuejs
var vm = new Vue({
    el: "#app",
    data: {
        classObj1: {
            "active": true,
            "text-danger": false,
        },
        classObj2: {
            "font-size": "18px",
            "font-weight": "bolder",
        }
    }
});
```

### 用在组件上

当在一个自定义组件上会用 `class` 属性时，这些类将被添加到该组件的根元素上面，这个元素上已存在的类不会被覆盖。

```html
<div id="app">
    <my-component v-bind:class="classObj"></my-component>
</div>
```

```vuejs
Vue.component("my-component", {
    template: "<p class='faa fva'>This is text</p>"
});

var vm = new Vue({
    el: "#app",
    data: {
        classObj: {
            "faa": true,
            "bzz": true,
        }
    },
});
```

> 此时 `p` 标签红 class 为 faa, fva, faa, bzz

## style 绑定

### 对象语法

```html
<div id="app">
    <p v-bind:style="styleObj">style 绑定-对象语法</p>
</div>
```

```vuejs
var vm = new Vue({
    el: "#app",
    data: {
        styleObj: {
            "font-size": "18px",
            "font-weight": "bolder",
        }
    }
});
```

### 数组语法

```html
<div id="app">
    <p v-bind:style="[styleObj1, styleObj2]">style 绑定-数组语法</p>
</div>
```

```vuejs
var vm = new Vue({
    el: "#app",
    data: {
        styleObj1: {
            "font-weight": "bolder"
        },
        styleObj2: {
            "font-size": "19px"
        }
    }
});
```