<template>
  <div class="home">
    <el-container>
      <!-- 侧边栏 -->

      <el-aside width="200">
        <div class="logo"></div>
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="!isCollapse"
          active-text-color="rgba(228, 120, 51)"
          default-active="welcome"
          :router="true"
        >
          <el-menu-item index="welcome">
            <i
              class="iconfont icon-shouye"
              style="margin-right: 10px; font-size: 20px;"
            ></i>
            <span slot="title">管理首页</span>
          </el-menu-item>

          <el-submenu index="users">
            <template slot="title">
              <i
                class="iconfont icon-xueyuan"
                style="margin-right: 10px; font-size: 20px;"
              ></i>
              <span slot="title" class="slot" style="color: #4e5bf8"
                >学员管理</span
              >
            </template>
            <el-menu-item style="padding:0 0 0 40px;" index="studentManger">
              <i
                class="iconfont icon-wode1"
                style="margin-right: 10px; font-size: 20px;"
              ></i>
              <span>学院项目管理</span>
            </el-menu-item>

            <el-menu-item style="padding:0 0 0 40px;" index="2-2">
              <i
                class="iconfont icon-kaoqin2"
                style="margin-right: 10px; font-size: 20px;"
              ></i>
              <span>学员资料</span>
            </el-menu-item>

            <el-menu-item style="padding:0 0 0 40px;" index="2-3">
              <i
                class="iconfont icon-shuju2"
                style="margin-right: 10px; font-size: 20px;"
              ></i>
              <span>学院宿舍</span>
            </el-menu-item>
          </el-submenu>

          <el-menu-item index="attendance">
            <i
              class="iconfont icon-kaoqin"
              style="margin-right: 10px; font-size: 20px;"
            ></i>
            <span slot="title" class="slot">考勤管理</span>
          </el-menu-item>

          <el-menu-item index="statistics">
            <i
              class="iconfont icon-shuju1"
              style="margin-right: 10px; font-size: 20px;"
            ></i>
            <span slot="title" class="slot">数据统计</span>
          </el-menu-item>

          <el-menu-item index="mine">
            <i
              class="iconfont icon-wode"
              style="margin-right: 10px; font-size: 20px;"
            ></i>
            <span slot="title" class="slot">我的中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- 头部 -->
        <el-header>
          <span>千锋管理系统</span>
          <i
            class="iconfont icon-shouqi"
            style="margin-right: 10px; font-size: 30px;color:#fff"
            v-if="isCollapse"
            @click="shouqi"
          ></i>
          <i
            class="iconfont icon-zhankai"
            style="margin-right: 10px; font-size: 30px;color:#fff"
            v-else
            @click="zhankai"></i>
          <template>
            <el-row class="demo-avatar demo-basic">
              <el-col :span="12">
                <div class="demo-basic--circle">
                  <div class="block">
                    <el-avatar :size="50" :src="circleUrl" style='width:40px;height:40px'></el-avatar>
                  </div>
                </div>
              </el-col>
            </el-row> 
            </template>
             <span style="color:#fff;position:absolute;left:920px;">欢迎您:{{userInfo.nickname}}</span>
             <span style="color:red;position:absolute;right:100px;cursor:pointer" @click="back" >退出</span>
        </el-header>
        <!-- 主体区域 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    
  </div>

</template>

<script>
import { getLoginLog } from "@/api/index.js";
import { mapState } from "vuex";
//导入子组件
// import attendance from "./attendance"
// import mine from "./mine"
// import statistics from "./statistics"
// import studentManger from "./studentManger"
// import users from "./users"
// import welcome from "./welcome"

export default {
  // components:{
  //   attendance,
  //   mine,
  //   statistics,
  //   studentManger,
  //   users,
  //   welcome
  // },
  data() {
    return {
      isCollapse: true,
      circleUrl:
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2304169563,385543199&fm=26&gp=0.jpg",
      
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted(){
    getLoginLog()
    .then(res=>{
      console.log(res);
    })
    console.log(this.userInfo)
  },
  methods: {
    shouqi() {
      // console.log(11);
      this.isCollapse = false;
    },
    zhankai() {
      this.isCollapse = true;
    },
    back(){
      localStorage.removeItem("stu_app")
      localStorage.removeItem("userInfo")
      // console.log(router)
      this.router.push("./login")
      this.$message({
          message: '退出成功',
          type: 'success'
        });
    }
  }
};
</script>
<style>
/* 头部样式 */
.el-header,
.el-footer {
  background: linear-gradient(135deg, #4c67ff, #5635df);
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.29);
  padding-left: 0;
  background-color: #b3c0d1;
  color: #fff;
  text-align: center;
  line-height: 60px;
  position: relative;
}
.el-header i {
  position: absolute;
  left: 10px;
  top: center;
}
/* 头像 */
.demo-avatar{
  position:absolute;
  right:250px;
  top:10px;
  vertical-align: middle;
}

 


.el-aside {
  background-color: #d3dce6;
  color: #4e5bf8;
  text-align: left;
  /* line-height: 200px; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
/* 侧边栏 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

/* 侧边栏 */
el-container {
  position: relative;
}
.el-menu-item {
  color: #4e5bf8;
  text-align: left;
}
/* .el-menu-item:first-child{
  color:rgba(228, 120, 51)
} */
.logo {
  width: 200;
  height: 60px;
  background: url(../../assets/imgs/logo.png) 50% center / 80% no-repeat;
  position: relative;
  background-color: blue;
}
i.iconfont {
  color: #4e5bf8;
}
</style>