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
            { name: 'BlogUpdate', path: "/MainPage/BlogUpdate/:id", component: () => import("../pages/BlogUpdate.vue") },
        ]
    },
    {
        name: 'Preview', path: "/Preview", component: () => import("../pages/Preview.vue"),
        children: [
            { name: 'PreviewBlog', path: '/Preview/PreviewBlog/:id', component: () => import("../pages/PreviewBlog.vue"), }
        ]
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
   
});

export { router };