import axios from "./config"
//请求登入
export const login=(username,password)=>axios({
    url:"/users/login",
    method:"post",
    data:{
        username,password
    }
})
//获取日志
// export const getLoginLog=() => axios({
//     url:"/getloginlog", 
//     method:'get'
// })
//获取菜单栏
export const getMenuList=()=>axios.get("/permission/getMenuList")

//获取登入日志
export const getLoginLog=()=>axios.get("/getloginlog")

//获取学员信息
export const getStuMessage=()=>axios.get("/students/getstulist")
//搜索学员信息
export const searchStu=(key)=>axios.get(`/students/searchstu?key=${key}`)

//添加信息
export const addStu=(studentails)=>axios({
    method:"post",
    url:"/students/addstu",
    data:studentails
})
//删除学员信息
export const delStu=(sId)=>axios.get(`/students/delstu?sId=${sId}`)
//编辑学员信息
export const updateStu=(updated)=>axios({
    method:"post",
    url:"/students/updatestu",
    data:updated
})


//获取验证码
export const getCaptcha=()=>axios.get("/users/getCaptcha")
//刷新验证码
export const refreshCaptcha=()=>axios.get("/users/refreshCaptcha")
//校验验证码
export const verifyCaptcha=(captcha)=>axios.get(`/users/verifyCaptcha?captcha=${captcha}`)




