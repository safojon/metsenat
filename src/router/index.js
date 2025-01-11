import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../pages/DashboardPage.vue"),
        },
        {
            path: "/sponsors",
            name: "sponsors",
            component: () => import("../pages/SponsorsPage.vue"),
        },
        {
            path: "/students",
            name: "students",
            component: () => import("../pages/StudentsPage.vue"),
        },
    ],
});

export default router;
