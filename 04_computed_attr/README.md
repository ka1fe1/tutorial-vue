# 计算属性(computed)

模板表达式是为了简便起见，但对于属性的一些复杂计算或逻辑，建议使用计算属性。

## 基本用法

```html
<div id="app">
    <p>message: {{message}}</p>
    <p>computed message: {{computedMessage}}</p>
</div>
```

```vuejs
var vm = new Vue({
    el: "#app",
    data: {
        message: 1,
    },
    computed: {
        computedMessage: function() {
           return this.message + 1;
        }
    },
});
```

## 计算属性 vs 函数

计算属性能够做的事情，使用函数也能到达同样的效果

```html
<div id="app">
    <p>message: {{message}}</p>
    <p>computed message: {{computedMessage()}}</p>
</div>
```

```vuejs
var vm = new Vue({
    el: "#app",
    data: {
        message: 1,
    },
    methods: {
        computedMessage: function() {
            return this.message + 1
        }
    },
});
```

计算属性比函数的优胜处在于，计算属性可以缓存，即只有当计算属性相关的依赖发生变化时，才会更新计算属性。而函数是每次加载都会执行。

## 计算属性 vs 侦听

```html
<div id="app">
    <p>first name: {{firstName}}</p>
    <p>last name: {{lastName}}</p>
    <p>full name: {{fullName}}</p>
</div>
```

```vuejs
var vm = new Vue({
    el: "#app",
    data: {
        firstName: "a",
        lastName: "b",
    },
    computed: {
        fullName: function() {
            return this.firstName + " " + this.lastName;
        },
    }
});

var vm = new Vue({
    el: "#app",
    data: {
        firstName: "a",
        lastName: "b",    
        fullName: "a b"    
    },
    watch: {
        firstName: function(newVal, oldVal) {
            this.fullName = newVal + " " + this.lastName;
        },
        lastName: function(newVal, oldVal) {
            this.fullName = this.firstName + " " + newVal;
        }
    }
});
```

### 计算属性的 setter

```html
<div id="app">
    <p>first name: {{firstName}}</p>
    <p>last name: {{lastName}}</p>
    <p>full name: {{fullName}}</p>
</div>
```

```vuejs
var vm4 = new Vue({
    el: "#app",
    data: {
        firstName: "a",
        lastName: "b",
    },
    computed: {
        fullName: {
            get: function () {
                return this.firstName + " " + this.lastName;
            },
            set: function (val) {
                var names = val.split(" ")
                this.firstName = names[0]
                this.lastName = names[1]
            }
        }
    }
});
```
