import { createRouter, createWebHashHistory } from "vue-router";

let routes: Array<any> = [
    { name: '', path: "/", component: () => import("../pages/Login.vue") },
    { name: 'login', path: "/login", component: () => import("../pages/Login.vue") },
    { name: 'BlogManage', path: "/BlogManage", component: () => import("../pages/BlogManage.vue") },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export { router };