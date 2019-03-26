# Vue 实例

## 创建一个 Vue 实例

vue 实例都是通过 `new Vue({...})` 函数来创建的，其中创建时可传入不同的数据对象，参考[API列表](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E6%95%B0%E6%8D%AE)

```vuejs
var vm = new Vue({
    // 数据对象...
});
```

## 数据和方法

### 数据属性

当一个 vue 实例被创建时，它向 vue 的响应式系统中加了其 `data` 对象中能找到的所有属性。
当这些属性值发生变化时，视图也会随之发生改变。

```vuejs
var d = { a: "1"};
var vm = new Vue({
    data: d,
})

vm.a == d.a // true

d.a = "2"
console.log(vm.a); // 2

vm.a = "3"
console.log(d.a); // 3
```

> note: 只有在实例被创建时 `data` 中存在的属性才是响应式的。也就是说在创建之后新添加的属性，是不会响应式的。

### 实例属性和方法

除了上述的数据属性，vue 还暴露除了一些实例属性和方法，他们都以 `$` 开头，以方便与用户的属性区分开来。

```vuejs
var d = {a: 1};
var vm = new Vue({
    data: d,
});

vm.$data // {a: 1}
vm.$data.a == d.a // true

// $watch 是一个实例方法
vm.$watch('a', function(newValue, oldValue) {
    // 这个回调将在 `vm.a` 改变后调用
});
```

## 实例生命周期钩子

钩子有：`created`, `mounted`, `updated`, `destoryed` etc, 详见 [vue 实例-生命周期钩子](https://cn.vuejs.org/v2/guide/instance.html#%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)

```vuejs
new Vue({
  data: {
    a: 1
  },
  created: function () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  }
})
// => "a is: 1"
```

## Note

本小节只是做基础的介绍，更加深入的了解，需要自行研究 [API 文档](https://cn.vuejs.org/v2/api/) 和 [生命周期](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)


