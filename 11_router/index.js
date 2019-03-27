/*基本用法*/

// 定义 component
const Foo = {template: '<div>foo</div>'};
const Bar = {template: '<div>bar</div>'};


// 定义路由配置
const routes = [
    {
        path: "/foo", component: Foo,
    },
    {
        path: "/bar", component: Bar,
    },
];


/*动态路由匹配*/

const User = {
    template: "<div>UserId {{userId}}</div>",
    data: function () {
        return {
            userId: ""
        }
    },
    watch: {
        "$route": function (to, from) {
            console.log(to);
            console.log(from);
            this.parseParams();
        }
    },
    mounted() {
        this.parseParams();
    },
    methods: {
        parseParams: function () {
            this.userId = this.$route.params.id;
        }
    }
};

routes.push({
    path: "/user/:id", component: User
});


/*嵌套式路由*/

const User2 = {
    template: `
        <div>
            <p>user id: {{userId}}</p>
            <!--路由出口，路由匹配到的组件会加载在这里-->
            <router-view></router-view>
        </div>
        
    `,
    data: function () {
        return {
            userId: "",
        }
    },
    watch: {
        "$route": function (to, from) {
            this.parseRouteParams();
        }
    },
    mounted() {
        this.parseRouteParams();
    },
    methods: {
        parseRouteParams: function () {
            console.log(this.$route);
            this.userId = this.$route.params.id;
        }
    }
};

var UserProfile = {
    template: `
        <div>
            user profile, user id is {{userId}}, full path is $route.path
        </div>
    `,
    data: function () {
        return {
            userId: this.$route.params.id
        }
    }
};

var UserPosts = {
    template: `
        <div>
            user posts, user id is {{userId}}, full path is {{$route.path}}
        </div>
    `,
    data: function () {
        return {
            userId: this.$route.params.id
        }
    }
};

routes.push(
    {
        path: "/user2/:id",
        component: User2,
        children: [
            {
                path: "",
                component: User2,
            },
            {
                path: "profile",
                component: UserProfile,
            },
            {
                path: "posts",
                component: UserPosts,
            },
        ],
    },
);

/*命名路由*/
const UserInfo = {
    "template": `
        <div>
            userInfo, user id is {{userId}}
        </div>
    `,
    data: function () {
        return {
            userId: ""
        }
    },
    methods: {
        parseRouterParams: function () {
            this.userId = this.$route.params.id
        }
    },
    mounted: function () {
        this.parseRouterParams();
    },
    watch: {
        "$route": function (to, from) {
            this.parseRouterParams();
        }
    },
};

routes.push({
    path: "/userInfo/:id",
    name: "userInfo",
    component: UserInfo,
});


// 创建 router 实例
const router = new VueRouter({
    routes: routes,
});

const app = new Vue({
    el: "#app",
    router
});