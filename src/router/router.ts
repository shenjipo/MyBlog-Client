import { createRouter, createWebHashHistory } from "vue-router";

let routes: Array<any> = [
    { name: '', path: "/", component: () => import("../pages/Login.vue") },
    { name: 'login', path: "/login", component: () => import("../pages/Login.vue") },
    {
        name: 'MainPage', path: "/MainPage", component: () => import("../pages/MainPage.vue"),
        children: [
            { name: 'BlogManage', path: "/MainPage/BlogManage", component: () => import("../pages/BlogManage.vue") },
            { name: 'Settings', path: "/MainPage/Settings", component: () => import("../pages/Settings.vue") },
            { name: 'BlogEdit', path: "/MainPage/BlogEdit", component: () => import("../pages/BlogEdit.vue") },
        ]
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export { router };