<template>
  <div class="home">
    <el-container>
      <!-- 侧边栏 -->

      <el-aside width="200">
        <div class="logo"></div>
        <el-menu
          :default-active="$route.path"
          ref="sideMenu"
          class="el-menu-vertical-demo"
          :collapse="!isCollapse"
          text-color="#4e5bf8"
          active-text-color="rgba(228, 120, 51)"
          :router="true"
        >
          <qf-sub-menu :sideMenu="sideMenu"></qf-sub-menu>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- 头部 -->
        <el-header>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="6"
              ><div class="grid-content bg-purple">
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
                  @click="zhankai"
                ></i></div
            ></el-col>
            <el-col :span="6"
              ><div class="grid-content">
                千锋管理系统
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content">
                <template>
                  <el-row class="demo-avatar demo-basic">
                    <el-col :span="12">
                      <div class="demo-basic--circle">
                        <div class="block">
                          <el-avatar
                            :size="50"
                            :src="circleUrl"
                            style="width:40px;height:40px"
                          ></el-avatar>
                          <p
                            style="color:#fff;margin-left:20px;margin-right:10px;"
                          >
                            欢迎您:{{ userInfo.nickname }}
                          </p>
                          <p style="color:red;cursor:pointer" @click="back">
                            退出
                          </p>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </template>
              </div></el-col
            >
          </el-row>
        </el-header>
        <!-- 主体区域 -->
        <el-main>

          <!-- 面包屑 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item
              v-for="item in crumblist"
              :key="item.path"
              :to="{ path: item.path }"
              >{{ item.meta.name }}</el-breadcrumb-item
            >
          </el-breadcrumb>
       

          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getLoginLog } from "@/api/index.js";
import { mapState } from "vuex";

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
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2304169563,385543199&fm=26&gp=0.jpg"
    };
  },
  computed: {
    ...mapState(["userInfo", "sideMenu", "crumblist"])
  },
  mounted() {
    getLoginLog()
    .then(res=>{
      console.log(res);
    })
    console.log(this.userInfo)
    this.$store.dispatch("FETCH_MENULIST")
  },
  methods: {
    shouqi() {
      // console.log(11);
      this.isCollapse = false;
    },
    zhankai() {
      this.isCollapse = true;
    },
    back() {
      localStorage.removeItem("stu_app");
      localStorage.removeItem("userInfo");
      // console.log(router)
      this.$router.push("/login");
      //刷新页面
      window.location.reload();
      this.$message({
        message: "退出成功",
        type: "success"
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
  line-height: 36px;
  position: relative;
}
.block {
  width: 300px;
  /* line-height: 52px; */
  vertical-align: middle;
}
.block p {
  display: inline-block;
  height: 52px;
  line-height: 52px;
  margin-top: -10px;
}
.el-header span:first-child {
  vertical-align: middle;
}

/* 头部布局 */

.el-col {
  border-radius: 4px;
  text-align: left;
  vertical-align: middle;
  /* line-height: 52px; */
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple-light {
  vertical-align: middle;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  /* background-color: #f9fafc; */
}

/* 侧边栏 */
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