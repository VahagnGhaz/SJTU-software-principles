
import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/", 
        alias: "/home",
        name: "home",
        meta: { transition: 'slide-left' },
        component:  () => import("./components/xq-info.vue")
    },
    {
        path: "/register",
        name: "register",
        meta: { transition: 'slide-right' },
        component: () => import("./components/xq-register.vue")
    },
    {
        path: "/info",
        name: "info",
        meta: { transition: 'slide-right' },
        component: () => import("./components/xq-info.vue")
    },
    {
        path: "/student-details/:id",
        name: "student-details",
        component: () => import("./components/student-details.vue")
    },
    {
        path: "/login",
        name: "login",
        component: () => import("./components/xq-login.vue")
    },
    {
        path: "/xq-events",
        name: "xq-events",
        component: () => import("./components/xq-events.vue")
    }

];

const router= createRouter({
    history: createWebHistory(),
    routes,
});

export default router;