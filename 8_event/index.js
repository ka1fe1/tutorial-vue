var vm1 = new Vue({
    el: "#app-1",
    methods: {
        btnClick: function (event) {
            console.log(event.target.getAttribute("title"));
            alert("button clicked");
        }
    },
});