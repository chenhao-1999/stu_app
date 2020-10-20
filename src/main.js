import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import "@/assets/styles/base.css"
import "@/assets/styles/reset.css"

import '@/assets/iconFonts/iconfont.css'


Vue.config.productionTip = false;

Vue.use(ElementUI);

//路由前置钩子（导航守卫）
router.beforeEach((to, from, next) => {
  
  //to 去到哪里  from:从哪来  next 放行
  //用户登陆之后才会有token  判断是否有token 
  let token=localStorage.getItem("stu_app")
  if(token){
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



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
