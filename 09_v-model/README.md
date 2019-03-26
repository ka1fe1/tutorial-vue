# 表单输入绑定

`v-model` 用于表单上可以实现双向数据绑定，其会忽略表单元素的 `value`, `checked`, `selected` 特性的初始化值，
而总是将 Vue 实例的数据作为数据来源。

## 基本用法

### 文本

```html
<div id="app-1">
    <input v-model="message" placeholder="edit me">
    <p>{{ message }}</p>
</div>
```

```vuejs
vm1 = new Vue({
    el: "#app-1",
    data: {
        message: ""
    },
});
```

### 多行文本

```html
<div id="app-2">
    <textarea v-model="message" placeholder="add multiple lines"></textarea>
    <br>
    <p style="white-space: pre-line">{{message}}</p>
</div>
```

```vuejs
vm2 = new Vue({
    el: "#app-2",
    data: {
        message: "",
    }
});
```

### 复选框

```html
<div id="app-3">
    <input type="checkbox" value="Jack" id="jack" v-model="checkNames">
    <label for="jack">Jack</label>
    <input type="checkbox" value="Tom" id="tom" v-model="checkNames">
    <label for="tom">Tom</label>
    <input type="checkbox" value="Mike" id="mike" v-model="checkNames">
    <label for="mike">Mick</label>

    <p>{{checkNames}}</p>
</div>
```

```vuejs
vm3 = new Vue({
    el: "#app-3",
    data: {
        checkNames: [],
    }
});
```

### 单选按钮

```html
<div id="app-4">
    <label for="one">One</label>
    <input type="radio" id="one" value="One" v-model="picked">
    <label for="two">Two</label>
    <input type="radio" id="two" value="Two" v-model="picked">

    <p>{{picked}}</p>
</div>
```

```vuejs
vm4 = new Vue({
    el: "#app-4",
    data: {
        picked: ""
    }
});
```

### 选择框

```html
<div id="app-5">
    <select multiple v-model="selected">
        <option disabled value="">请选择</option>
        <option value="a">A</option>
        <option value="b">B</option>
        <option value="c">C</option>
    </select>
    <p>selected: {{selected}}</p>
</div>

<div id="app-6">
    <select v-model="selected">
        <option disabled value="">请选择</option>
        <option v-for="option in options" v-bind:value="option.value" :key="option.id">
            {{option.text}}
        </option>
    </select>

    <p>selected: {{selected}}</p>
</div>

```

```vuejs
vm5 = new Vue({
    el: "#app-5",
    data: {
        selected: [],
    },
});

vm6 = new Vue({
    el: "#app-6",
    data: {
        selected: "",
        options: [
            {
                id: 1,
                value: "a",
                text: "A"
            },
            {
                id: 2,
                value: "b",
                text: "B"
            },
            {
                id: 3,
                value: "c",
                text: "C"
            },
        ],
    }
});
```

## 值绑定

### 复选框

```html
<div id="app-7">
    <input type="checkbox" v-model="toggle" true-value="yes" false-value="no">

    <p>checked: {{toggle}}</p>
</div>
```

```vuejs
vm7 = new Vue({
    el: "#app-7",
    data: {
        toggle: ""
    }
});
```

### 单选按钮

```html
<div id="app-8">
    <label for="option1">Option1: </label>
    <input type="radio" v-model="selected" v-bind:value="{value: 'A'}" id="option1">
    <label for="option2">Option2: </label>
    <input type="radio" v-model="selected" v-bind:value="{value: 'B'}" id="option2">

    <p>selected: {{selected.value}}</p>
</div>
```

```vuejs
vm8 = new Vue({
    el: "#app-8",
    data: {
        selected: ""
    }
});
```

## 修饰符

### `.lazy`

在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。
你可以添加 lazy 修饰符，从而转变为使用 change 事件进行同步

```html
<div id="app-9">
    <!--在 change 时而非 input 时更新-->
    <input v-model.lazy="msg">
    <p>lazy: {{msg}}</p>
</div>
```

```vuejs
vm9 = new Vue({
    el: "#app-9",
    data: {
        msg: ""
    },
});
```

### `.number`

如果想自动将用户的输入值转为数值类型，可以给 v-model 添加 number 修饰符

```html
<div id="app-10">
    <label>type of age is number</label>
    <input v-model.number="age" type="number">
    <p>age: {{age}}</p>
</div>
```

```vuejs
vm10 = new Vue({
    el: "#app-10",
    data: {
        age: 0
    }
});
```

### `.trim`

如果要自动过滤用户输入的首尾空白字符，可以给 v-model 添加 trim 修饰符

```html
<div id="app-11">
    <label>trim space</label>
    <input v-model.trim="msg">
    <p>msg: {{msg}}</p>
</div>
```

```vuejs
vm11 = new Vue({
    el: "#app-11",
    data: {
        msg: ""
    }
});
```
