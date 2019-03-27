# Vue router

## 基本用法

```html
<div id="app">
    <h1>hello vue app</h1>

    <p>
        <router-link to="/foo">go to foo</router-link>
        <router-link to="/bar">go to bar</router-link>
    </p>

    <router-view></router-view>
</div>
```

```vuejs
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

// 创建 router 实例
const router = new VueRouter({
    routes: routes,
});

const app = new Vue({
    el: "#app",
    router
});
```

html 
- 使用 `router-link` 组件来导航，通过传入 `to` 属性来指定链接
- `router-view` 是路由出口，即路由匹配到的组件将渲染在这里

js 
- 定义路由配置
- 创建 router 实例
- 将 router 实例挂载到 vue 实例中

## 动态路由匹配

```html
<div id="app">
    <h1>hello vue app</h1>
    <p>
        <router-link to="/foo">go to foo</router-link>
        <router-link to="/bar">go to bar</router-link>
        <router-link to="/user/:id">动态路由</router-link>
    </p>
    <router-view></router-view>
</div>
```

```vuejs
const User = {
    template: "<div>UserId {{userId}}</div>",
    data: function() {
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
```

Note: 
- 当路由参数发送变化时，组件会复用，这以为着原来的生命周期钩子不会再被调用。要想对路由参数变化做出响应的话，
你可以简单的 watch `$route` 对象。或者使用 beforeRouteUpdate 导航守卫的方法。
- 有时候同一个路径可能匹配多个路由，此时匹配的优先级为：谁先定义，谁优先级较高

## 嵌套路由

```html
<div id="app">
    <h1>hello vue app</h1>
    <p>
        <router-link to="/foo">go to foo</router-link>
        <router-link to="/bar">go to bar</router-link>
        <router-link to="/user/:id">动态路由</router-link>
        <router-link to="/user2/:id">嵌套路由</router-link>
    </p>
    <router-view></router-view>
</div>
```

```vuejs
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
```

## 命名路由

```html
<div id="app">
    <h1>hello vue app</h1>
    <p>
        <router-link to="/foo">go to foo</router-link>
        <router-link to="/bar">go to bar</router-link>
        <router-link to="/user/:id">动态路由</router-link>
        <router-link to="/user2/:id">嵌套路由</router-link>
        <router-link :to="{name: 'userInfo', params: {id: 123}}">命名路由</router-link>
    </p>
    <router-view></router-view>
</div>
```

```vuejs
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
```

## 命名视图

可以在界面上拥有多个单独命名的视图，而不只是只有一个单独的出口，以到达同时(同级)展示多个视图，而不是嵌套展示。

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

```vuejs
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

### 嵌套命名视图

```
/settings/emails                                       /settings/profile
+-----------------------------------+                  +------------------------------+
| UserSettings                      |                  | UserSettings                 |
| +-----+-------------------------+ |                  | +-----+--------------------+ |
| | Nav | UserEmailsSubscriptions | |  +------------>  | | Nav | UserProfile        | |
| |     +-------------------------+ |                  | |     +--------------------+ |
| |     |                         | |                  | |     | UserProfilePreview | |
| +-----+-------------------------+ |                  | +-----+--------------------+ |
+-----------------------------------+                  +------------------------------+
```

- `Nav` 只是一个常规组件
- `UserSetting` 是一个视图组件
- `UserEmailsSubscriptions、UserProfile、UserProfilePreview` 是嵌套的视图组件

`UserSettings` 组件的 `<template>` 部分应该是类似下面的这段代码：

```html
<!-- UserSettings.vue -->
<div>
  <h1>User Settings</h1>
  <NavBar/>
  <router-view/>
  <router-view name="helper"/>
</div>
```

```vuejs
// 路由配置
{
  path: '/settings',
  // 你也可以在顶级路由就配置命名视图
  component: UserSettings,
  children: [{
    path: 'emails',
    component: UserEmailsSubscriptions
  }, {
    path: 'profile',
    components: {
      default: UserProfile,
      helper: UserProfilePreview
    }
  }]
}
```

## 重定向和别名

### 重定向

重定向也是用过 `routes` 配置完成的

**从 `/a` redirect 到 `/b`**

```vuejs
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
```

**重定向到一个命名路由**

```vuejs
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
})
```

**动态重定向**

```vuejs
// dynamic redirect, note that the target route `to` is available for the redirect function
    { path: '/dynamic-redirect/:id?',
      redirect: to => {
        const { hash, params, query } = to
        if (query.to === 'foo') {
          return { path: '/foo', query: null }
        }
        if (hash === '#baz') {
          return { name: 'baz', hash: '' }
        }
        if (params.id) {
          return '/with-params/:id'
        } else {
          return '/bar'
        }
      }
    }
```

### 别名

`/a` 的别名是 `/b`，意味着，当用户访问 `/b` 时，URL 会保持为 `/b`，但是路由匹配则为 `/a`，就像用户访问 `/a` 一样

```vuejs
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```

## 路由组件传参

```vuejs
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```

### 布尔模式

如果 `props` 被设置为 `true`，`route.params` 将会被设置为组件属性

### 对象模式

如果 `props` 是一个对象，它会被按原样设置为组件属性。当 `props` 是静态的时候有用。

```vuejs
const router = new VueRouter({
  routes: [
    { path: '/promotion/from-newsletter', component: Promotion, props: { newsletterPopup: false } }
  ]
})
```

### 函数模式

你可以创建一个函数返回 `props`。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。

```vuejs
const router = new VueRouter({
  routes: [
    { path: '/search', component: SearchUser, props: (route) => ({ query: route.query.q }) }
  ]
})
```

URL `/search?q=vue` 会将 `{query: 'vue'}` 作为属性传递给 `SearchUser` 组件。

