import Vue from "vue";
import VueRouter from "vue-router";
import login from "../pages/login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name:"login",
    component: login
  },
  {
    path: "/",
    name: "home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "home" */ "../pages/home"),
      children:[
        {
          path:"mine",//二级路由没有/,
          name:"mine",
          component: () =>import(/* webpackChunkName: "mine" */ "../pages/home/mine"),
        },
        {
          path:"attendance",//二级路由没有/,
          name:"attendance",
          component: () =>import(/* webpackChunkName: "attendance" */ "../pages/home/attendance"),
        },
        {
          path:"statistics",//二级路由没有/,
          name:"statistics",
          component: () =>import(/* webpackChunkName: "statistics" */ "../pages/home/statistics"),
        },
        {
          path:"studentManger",//二级路由没有/,
          name:"studentManger",
          component: () =>import(/* webpackChunkName: "studentManger" */ "../pages/home/studentManger"),
        },
        {
          path:"welcome",//二级路由没有/,
          name:"welcome",
          component: () =>import(/* webpackChunkName: "welcome" */ "../pages/home/welcome"),
        },
        {
          path:"users",//二级路由没有/,
          name:"users",
          component: () =>import(/* webpackChunkName: "users" */ "../pages/home/users"),
        },
      ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
