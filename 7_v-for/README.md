# v-for

## 遍历数组

```html
<ul id="app-1">
    <li v-for="(item, index) in items" :key="item.id">{{index}} - {{item.value}}</li>
</ul>
```

```vuejs
var vm1 = new Vue({
    el: "#app-1",
    data: {
        items: [
            {
                id: 1,
                value: "a",
            },
            {
                id: 2,
                value: "b",
            },
            {
                id: 3,
                value: "c",
            },
        ],
    }
});
```

> Note: `:key` 是在为每项指定一个唯一的 key 属性，以便于跟踪每个节点的身份，从而重用和重新排序现有元素。

## 遍历对象

```html
<ul id="app-2">
    <li v-for="(fieldValue, fieldName, index) in obj" :key="fieldName">
        {{index}}-{{fieldName}}-{{fieldValue}}
    </li>
</ul>
```

```vuejs
var vm2 = new Vue({
    el: "#app-2",
    data: {
        obj: {
            firstName: "Tom",
            lastName: "Jack",
            fullName: "tom jack"
        }
    }
});
```

一般来讲对象没有遍历的必要性，直接取值即可。

## 数组更新检测

### 变异方法

所谓变异方法即为这些方法调用原始的数组，当调用这些方法时，视图也会响应式的更新。
变异方法有：
- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

### 替换数组

非变异方法，比如：filter(), concat() 和 slice()。这些不会改变原始数组，但总是返回一个新的数组。
当使用非变异方法时，可以用新数组替换旧数组。

```vuejs
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```

### 注意事项

由于 javascript 的限制，vue 不能检测以下变动的数组：

1. 当你直接使用索引改变数组值时，例如：vm.items[indexOfItems]=newValue
2. 当你修改数组的长度时，例如：vm.items.length = newLength

例如：

```vuejs
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```

第一类问题的解决方式：

```vuejs
vm.$set(vm.items, 1, "d"); // vm.$set(vm.items, indexOfItem, newValue)
```

第二类问题的解决方式：

```vuejs
vm.items.splice(newLength);
```

## 对象更改检测注意事项

由于 javascript 的限制，vue 不能检测对象属性的添加或删除。

```vuejs
var vm = new Vue({
  data: {
    a: 1
  }
});
// `vm.a` 现在是响应式的

vm.b = 2
// `vm.b` 不是响应式的
```

可以采取如下方式解决：

```vuejs
vm.$set(vm.data, 'age', 27);
```

```vuejs
// 添加对个属性
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
});
```

## 显示过滤/排序结果

有时，我们想要显示一个数组的过滤或排序结果，而不实际改变或重置原始数据。
在这种情况下，可以创建返回过滤或排序数组的计算属性（或函数）。

## v-for with v-if

当 v-for 和 v-if 处于同一节点，`v-for` 的优先级比 `v-if` 的高，这意味着 `v-if` 将分别重复运行于每个 `v-for` 之中。

```vuejs
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```

如果是有目的的跳出循环，可将 `v-if` 置于 `v-for` 的上层。

```vuejs
<ul v-if="todos.length">
  <li v-for="todo in todos">
    {{ todo }}
  </li>
</ul>
<p v-else>No todos left!</p>
```

## 组件的 v-for

```html
<div id="todo-list-example">
  <form v-on:submit.prevent="addNewTodo">
    <label for="new-todo">Add a todo</label>
    <input
      v-model="newTodoText"
      id="new-todo"
      placeholder="E.g. Feed the cat"
    >
    <button>Add</button>
  </form>
  <ul>
    <li
      is="todo-item"
      v-for="(todo, index) in todos"
      v-bind:key="todo.id"
      v-bind:title="todo.title"
      v-on:remove="todos.splice(index, 1)"
    ></li>
  </ul>
</div>
```

```vuejs
Vue.component('todo-item', {
  template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">Remove</button>\
    </li>\
  ',
  props: ['title']
})

new Vue({
  el: '#todo-list-example',
  data: {
    newTodoText: '',
    todos: [
      {
        id: 1,
        title: 'Do the dishes',
      },
      {
        id: 2,
        title: 'Take out the trash',
      },
      {
        id: 3,
        title: 'Mow the lawn'
      }
    ],
    nextTodoId: 4
  },
  methods: {
    addNewTodo: function () {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      this.newTodoText = ''
    }
  }
})
```