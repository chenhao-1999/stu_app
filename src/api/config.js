import axios from "axios"
import router from "../router"
import ElementUI from "element-ui"


axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? "/api" : "http://www.chst.vip"
axios.defaults.withCredentials = true; //
//设置请求的最长时间 在规定时间内没有请求到数据 就报错
axios.create({
    timeout:4000
})


// 添加请求拦截器===可以给每个请求都携带想要的传递的内容
axios.interceptors.request.use(function (config) {
    //token 是在登录成功后才会获取到数据
    //登录页面不用拦截器
    // console.log(config);
    if(config.url=="/getLoginLog"){
        //放行
        return config
    }else{
         // 将token给到一个前后台约定好的key中，作为请求发送
        let token = localStorage.getItem('stu_app')
        if (token) {
        
        config.headers['authorization'] = token
        }
        //放行
        return config
    }
   
  })

  //响应拦截
  axios.interceptors.response.use( config => {
    //   console.log(config);
      let {data}=config
      if(data.code=="1004"||data.code=="10022"){
        localStorage.removeItem("stu_app")
          //当前的后台api中，此时的1004 token校验失败 登陆失效
        //   alert("登入信息失效，请重新登入") 
        router.push("/login") 
        ElementUI.Message.error("登入信息失效，请重新登入")
        window.location.reload()
          
      }
      return config
  })

export default axios;

