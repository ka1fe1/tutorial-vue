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