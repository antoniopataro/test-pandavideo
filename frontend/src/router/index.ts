import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import { store } from "../stores";

import Videos from "../views/videos.vue";
import Login from "../views/login.vue";
import Register from "../views/register.vue";
import Video from "../views/video.vue";

const privateRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/videos",
  },
  {
    component: Videos,
    meta: { requiresAuth: true },
    name: "Videos",
    path: "/videos",
  },
  {
    component: Video,
    meta: { requiresAuth: true },
    name: "Video",
    path: "/videos/:id",
  },
];

const publicRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    component: Login,
    meta: { guest: true },
    name: "Login",
    path: "/login",
  },
  {
    component: Register,
    meta: { guest: true },
    name: "Register",
    path: "/register",
  },
];

const routes: RouteRecordRaw[] = [...publicRoutes, ...privateRoutes];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const isLoggedIn = store.getters["userModule/isLoggedIn"];

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (isLoggedIn) {
      next({ name: "Videos" });
    } else {
      next();
    }
  } else {
    next();
  }
});
