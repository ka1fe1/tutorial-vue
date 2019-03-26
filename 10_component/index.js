Vue.component("blog-post", {
    props: ["blog"],
    template: `
        <div> 
            <label for="title">Title: </label>
            <span id="title">{{blog.title}}</span>
            <br>
            <label for="author">Author: </label>
            <span id="author">{{blog.author}}</span>
            <br>
            <label for="content">Content: </label>
            <span id="content">{{blog.content}}</span>
            
            <button v-on:click="$emit('enlarge-text')">Enlarge blog post</button>
        </div>
    `
});

var vm1 = new Vue({
    el: "#app-1",
    data: {
        items: [
            {
                id: 1,
                title: "title 1",
                content: "content 1",
                author: "a",
            },
            {
                id: 2,
                title: "title 2",
                content: "content 1",
                author: "b",
            },
        ],
        fontSize: 1,
    },
    computed: {
        styleDiv1: function () {
            return {
                "font-size": this.fontSize + "em",
            }
        }
    },
    methods: {
        enlargeText: function () {
            this.fontSize = this.fontSize + 0.1
        }
    }
});

Vue.component('custom-input', {
    props: ['value'],
    template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
});

var vm2 = new Vue({
    el: "#app-2",
    data: {
        searchText: "",

    }
});

Vue.component("custom-alter", {
    template: `
        <div class="demo-alert-box">
            <strong>Error!</strong>
            <slot></slot>
        </div> 
    `,

});

vm3 = new Vue({
    el: "#app-3",
    data: {}
});