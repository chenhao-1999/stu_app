import Vue from "vue";
import Vuex from "vuex";

//引入发送请求菜单栏函数
import { getMenuList,getLoginLog,getStuMessage } from "@/api"
//引入动态路由
import dynamicRoutes from "../router/dynamicRoutes"
//引入全部路由
import allRouters from "../router/allRouters"
//引入递归算法
import recursionRoutes from "../utils/recursionRoutes"
import router from "../router";

Vue.use(Vuex);
let userInfo=localStorage.getItem("userInfo")||"{}"
userInfo=JSON.parse(userInfo)
export default new Vuex.Store({
  state: {
    userInfo,   //用户信息
    sideMenu:[],
    crumblist:[],
    loginlog:[],
    stulist:[]  //学员信息
  },
  mutations: {
    //改变 userInfo
    GET_USERINFO(state,payload){
      // console.log(payload);
      state.userInfo=payload
    },
    //改变sideMenu
    SET_SIDEMENU(state,payload){
      state.sideMenu=payload;
      //从动态路由中筛选出 路径为'/'(主页)的路由
      let target=dynamicRoutes.find(item=>{
        return item.path==="/"
      })
      //在主页中添加子路由
      target.children=[...payload]
     //把动态路由添加到router中 addRoutes
    //  console.log(target);
     router.addRoutes([...dynamicRoutes])
    },
    SET_CRUMB(state,payload){
      state.crumblist=payload
      // console.log(1);
      // console.log(state.crumblist);
    },
    //获取用户日志
    SET_LOGINLOG(state,payload){
      state.loginlog=payload
    },
    //获取学员信息
    SET_STUDENT(state,payload){
      state.stulist=payload
    },
    STULIST_CHANGE(state,payload){
      state.stulist=payload
    }
  },
  actions: {
    //发送请求,获取用户的菜单栏
    async FETCH_MENULIST({commit}){
      let res=await getMenuList()
      // console.log(res)
    if( res && res.data){
       //得出用户的菜单
      let userMenu=res.data.menuList;
      //计算出 用户拥有的路由
      let userlist=recursionRoutes(allRouters,userMenu)
      //激活 SET_SIDEMENU 把userlist传到mutations
      commit("SET_SIDEMENU",userlist)
     
    }
    },
    // FETCH_LOGINLOG({commit}){
    //   getLoginLog()
    //   .then(res=>{
    //     commit("SET_LOGINLOG",res.data.data)
    //   })
      
    // },
    
    async FETCH_LOGINLOG({commit}){
      console.log(1)
       let res=await getLoginLog()
       
        commit("SET_LOGINLOG",res.data.data)
       
    },
    FETCH_STULISI({commit}){
      getStuMessage()
      .then(res=>{
        console.log(1)
        console.log(res)
        commit("SET_STUDENT",res.data.data)
      })

  },  
},
 
  modules: {}
});
