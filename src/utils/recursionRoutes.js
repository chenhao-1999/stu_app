import allRouters from "../router/allRouters"



//设置递归函数 recursionRoutes 
//参数 1 从服务器玩获取的菜单栏数组 menuList  2 定义的所有菜单栏 allRouters 
const recursionRoutes=(allRouters,menuList)=>{
    let userRoutes=[]
    allRouters.forEach(item=>{
        menuList.forEach(v=>{
            //判断menuList中是否有children 且 children 是个数组
            if(v.name===item.meta.name){
                if(v.children && Array.isArray(v.children)){
                    //递归结束 把得到的结果放在item.children 中 替换了还原的children 以后用来渲染页面
                    item.children=recursionRoutes(item.children,v.children)
                }

                userRoutes.push(item)
            }
        })
    })
    return userRoutes;
}


export default recursionRoutes
