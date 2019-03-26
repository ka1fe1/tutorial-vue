# 事件处理

```html
<div id="app-1">
    <button v-on:click="btnClick" title="button title">press me</button>
</div>
```

```vuejs
var vm1 = new Vue({
    el: "#app-1",
    methods: {
        btnClick: function (event) {
            console.log(event.target.getAttribute("title"));
            alert("button clicked");
        }
    },
});
```