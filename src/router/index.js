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
            path: "/sponsor-list/",
            name: "sponsor-list",
            component: () => import("../pages/SponsorsPage.vue"),
        },
        {
            path: "/sponsor/single/:id",
            name: "sponsor-single",
            component: () => import("../pages/SponsorSingle.vue"),
        },
        {
            path: "/students-list/",
            name: "students-list",
            component: () => import("../pages/StudentsPage.vue"),
        },
        {
            path: "/student/add",
            name: "student-add",
            component: () => import("../pages/StudentAdd.vue"),
        },
        {
            path: "/student/single/:id",
            name: "student-single",
            component: () => import("../pages/StudentSingle.vue"),
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
});

export default router;
