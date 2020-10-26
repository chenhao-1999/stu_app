import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import "@/assets/styles/base.css"
import "@/assets/styles/reset.css"

import '@/assets/iconFonts/iconfont.css'


import recursionRouters from "./utils/recursionRoutes"

//引入侧菜单栏插件
import qfSubMenu from "qf-sub-menu"
//导入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(qfSubMenu)

//路由前置钩子（导航守卫）
router.beforeEach((to, from, next) => {
  
  //打开进度条
  NProgress.start()
  //to 去到哪里  from:从哪来  next 放行
  //用户登陆之后才会有token  判断是否有token 
  let token=localStorage.getItem("stu_app")
  if(token){
    //菜单栏中没有内容的时候 发送请求
    if(!store.state.sideMenu.length){
      store.dispatch("FETCH_MENULIST")
      .then(()=>{
        //请求数据 从 login(/login) 页面 转到 主页 （/）
        // console.log(from);
        // console.log(to);
        
        next({path:to.path})
        // next()
      })
    }
    //有token 直接放行
    next()
  }else{
    //没有token 
    //如果去往注册或者登陆页面 直接放行
    if(to.path==="/login"){
      next()
    }else{
      //否则拦截掉
      next({path:"/login"})
    }
  }
 

// next()
})
//后置参数  面包屑在后置钩子中写
router.afterEach((to,from)=>{
    NProgress.done() //进度条消失
    // console.log(to);
   //to中的matched数组中的第0 项没有内容===解决方案 把第零项设为固定的首页
   let crumblist=to.matched.slice(1)
   store.commit('SET_CRUMB', crumblist)
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
