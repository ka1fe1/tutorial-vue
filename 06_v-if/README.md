# 条件渲染

`v-if` 指令用于条件性的渲染一块内容，这块内容只有在指令表达式返回为 truthy 值的时候渲染。

## v-if, v-else-f, v-else

```html
<div id="app-2">
    <div v-if="num == 2">
        <p>num is equal 2</p>
    </div>
    <div v-else-if="num == 1">
        <p>num is equal 1</p>
    </div>
    <div v-else>
        <p>unknown num, num is {{num}}</p>
    </div>
</div>
```

```vuejs
var vm2 = new Vue({
    el: "#app-2",
    data: {
        num: 9
    }
});
```

> Note: 类似于 v-else，v-else-if 也必须紧跟在带 v-if 或者 v-else-if 的元素之后

## v-show

```html
<div id="app-3">
    <p v-show="ok">see it or not</p>
</div>
```

```vuejs
var vm3 = new Vue({
    el: "#app-3",
    data: {
        ok: true
    }
});
```

## v-if vs v-show

相同点：
- 都可以控制元素的显示和隐藏

不同点：
- v-if 可以用于多条件判断，后面可以接 v-else-if, v-else 等，但 v-show 没有类似 else 的语法
- v-if 是真正的条件渲染，它会确保在切换过程中条件块内的事件监听器和子组件适当的销毁和重建。
而 v-show 始终会渲染元素，只是采取了 css 来控制显示和隐藏

