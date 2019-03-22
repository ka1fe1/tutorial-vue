var vm1 = new Vue({
    el: "#app-1",
    data: {
        message: "插值-文本"
    },
});

var vm2 = new Vue({
    el: "#app-2",
    data: {
        html: "<span style='color: green'>原谅色</span>"
    }
});

var vm3 = new Vue({
    el: "#app-3",
    data: {
        disabledAttrValue: false,
    },
    methods: {},
});

var vm4 = new Vue({
    el: "#app-4",
    data: {
        message: 2
    },
    methods: {},
});

var vm5 = new Vue({
    el: "#app-5",
    data: {
        url: "https://www.baidu.com",
    },
    methods: {}
});

var vm6 = new Vue({
    el: "#app-6",
    data: {},
    methods: {
        btnClick: function () {
            console.log("button clicked")
        }
    }
});

var vm7 = new Vue({
    el: "#app-7",
    data: {
        title: "this is title",
    },
    methods: {},
});