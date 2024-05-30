import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";

import { getItemFromLocalStorage } from "@/utils/LocalStorage.js";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
      /**
       * This is a navigation guard. It is used to check whether the user has logged in
       * or not. If the user is logged in then the route will be redirected to /dashboard
       *
       * {param} (Route) - the target Route Object being navigated to.
       * {param} (Route) - the current route being navigated away from.
       * {param} (NavigationGuardNext) - move on to the next hook in the pipeline
       * {return} ()
       */
      beforeEnter(to, from, next) {
        // getting the isLoggedIn variable from local storage
        const isLoggedIn = getItemFromLocalStorage("isLoggedIn");

        // if user is logged in then move onto route with name 'AllPosts'
        if (isLoggedIn) {
          next({ name: "AllPosts" });
        } else {
          next();
        }
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
      /**
       * This is a navigation guard. It is used to check whether the user has logged in
       * or not. If the user is logged in then the route will be redirected to /dashboard
       *
       * {param} (Route) - the target Route Object being navigated to.
       * {param} (Route) - the current route being navigated away from.
       * {param} (NavigationGuardNext) - move on to the next hook in the pipeline
       * {return} ()
       */
      beforeEnter(to, from, next) {
        // getting the isLoggedIn variable from local storage
        const isLoggedIn = getItemFromLocalStorage("isLoggedIn");

        // if user is logged in then move onto route with name 'AllPosts'
        if (isLoggedIn) {
          next({ name: "AllPosts" });
        } else {
          next();
        }
      },
    },
    {
      path: "/dashboard",
      component: () => import("../views/DashboardView.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "AllPosts",
          component: () => import("../components/PostsComponent.vue"),
        },
        {
          path: "create",
          name: "CreatePost",
          component: () => import("../components/PostCreate.vue"),
        },
      ],
    },
    {
      path: "/404",
      alias: "*",
      name: "NotFound",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

/**
 * This is a global navigation guard. It is used to check whether the user is trying to access
 * a protected route without being logged in.
 *
 * {param} (Route) - the target Route Object being navigated to.
 * {param} (Route) - the current route being navigated away from.
 * {param} (NavigationGuardNext) - move on to the next hook in the pipeline
 * {return} (function)
 */
router.beforeEach((to, from, next) => {
  // if the route has a 'requiresAuth' property in meta tag then
  // check whether the user is logged in
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // getting the isLoggedIn variable from local storage
    const isLoggedIn = getItemFromLocalStorage("isLoggedIn");

    // if user is not logged in then redirect user to login page.
    // Here we are passing 'redirect' in query, check LoginForm.vue component
    // to understand why.
    if (!isLoggedIn) {
      next({ name: "login", query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
