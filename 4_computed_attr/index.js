var vm1 = new Vue({
    el: "#app-1",
    data: {
        message: 1
    },
    computed: {
        computedMessage: function () {
            return this.message + 1
        }
    },
});

var vm2 = new Vue({
    el: "#app-2",
    data: {
        message: 1,
    },
    methods: {
        getMessage: function () {
            return this.message + 1
        }
    },
});

var vm3 = new Vue({
    el: "#app-3",
    data: {
        message: 1,
        watchMessage: null
    },
    watch: {
        message: function (newVal, oldVal) {
            console.log("new value is " + newVal);
            console.log("old value is " + oldVal);
            this.watchMessage = newVal + 1
        }
    }
});

var vm4 = new Vue({
    el: "#app-4",
    data: {
        firstName: "hu",
        lastName: "kaifei",
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