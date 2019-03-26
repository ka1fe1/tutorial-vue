var vm1 = new Vue({
    el: "#app-1",
    data: {
        isActive: true,
        error: true
    },
    computed: {
        classObject: function () {
            return {
                "active": this.isActive && !this.error,
                "text-danger": this.error
            }
        }
    }
});

var vm2 = new Vue({
    el: "#app-2",
    data: {
        activeClass: {
            "active": true
        },
        errorClass: {
            "text-danger": true,
        }
    }
});

Vue.component("my-component", {
    props: ["pValue"],
    template: "<p class='faa boo'>this is text value</p>"
});

var vm3 = new Vue({
    el: "#app-3",
    data: {
        textValue: "This is text value",
    },
    computed: {
        classObject: function () {
            return {
                "baz": true,
                "faa": true,
            }
        }
    },
});

var vm4 = new Vue({
    el: "#app-4",
    data: {
        styleObject: {
            color: "red",
            "font-size": "18px"
        }
    }
});

var vm5 = new Vue({
    el: "#app-5",
    data: {
        styleObj1: {
            color: "red",
        },
        styleObj2: {
            "font-size": "18px",
            "font-weight": "bolder"
        }
    }
});