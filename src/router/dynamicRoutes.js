//动态路由  主页 根据获取的菜单栏 显示内容
import allRouters from "./allRouters"
const dynamicRoutes=[
    {
        path: "/",
        redirect: "./welcome",
        name: "home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "../pages/home"),
          children:[]
         
      },
      {
        path:"*",
        name:"page404",
        component: () =>
        import(/* webpackChunkName: "page404" */ "../pages/page404"),
      }
     
]

export default dynamicRoutes;