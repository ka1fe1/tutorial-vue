var app1 = new Vue({
    el: "#app-1",
    data: {
        message: "Hello vue!"
    }
});

var app2 = new Vue({
    el: "#app-2",
    data: {
        message: "页面加载于" + new Date().toLocaleString(),
    },
});

var app2_1 = new Vue({
    el: "#app-2-1",
    data: {
        defaultMessage: "hello vue"
    },
    methods: {},
});

var app3 = new Vue({
    el: "#app-3",
    data: {
        seen: true
    }
});

var app4 = new Vue({
    el: "#app-4",
    data: {
        todos: [
            {value: "things 1"},
            {value: "things 2"},
            {value: "things 3"},
        ]
    }
});

var app5 = new Vue({
    el: "#app-5",
    data: {
        message: "Hello vue!"
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split(" ").reverse().join(" ")
        }
    },
});


var app6 = new Vue({
    el: "#app-6",
    data: {
        message: "双向绑定"
    },
    methods: {},
});

Vue.component("todo-item", {
    props: ["todo"], // 类似于自定义属性
    template: "<li>{{todo.text}}</li>"
});

var app7 = new Vue({
    el: "#app-7",
    data: {
        todoLists: [
            {id: 0, text: "apple"},
            {id: 1, text: "orange"},
            {id: 2, text: "banana"},
        ],
    },
    methods: {},
});



