<template>
  <div class="login">
    <div class="left"></div>
    <div class="login_container">
      <h1>千锋管理系统</h1>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="username"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <video
      class="bg_video"
      muted
      src="@/assets/imgs/echarts/bg_video.mp4"
      autoplay
      loop
      preload="auto"
    ></video>
  </div>
</template>
<script>
import { login } from "@/api";
import { mapMutations } from "vuex"
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["GET_USERINFO"]),

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //创建loading事件
          const loading = this.$loading({
            lock: true,
            text: "登陆中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });

          let { username, password } = this.ruleForm;
          //收集username password 向后端发送请求
          login(username, password)
            .then(res => {
              //服务器响应,关闭loading动画
              loading.close();
              console.log(res);
              if (res.data.state) {
                //登录通过后，将后端返回的token 存入到本地
                localStorage.setItem("stu_app", res.data.token);
                //把用户信息存储到本地
                localStorage.setItem("userInfo",JSON.stringify(res.data.userInfo))
                this.GET_USERINFO(res.data.userInfo)
                //登录成功，跳到主页
                this.$router.push("./");
                this.$message({
                  message: "登录成功！",
                  type: "success"
                });
              } else {
                this.$message.error("用户名或密码错误！！！");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.el-form {
  width: 400px;
}

.login {
  height: 100%;
  width: 100%;
  background: url("../../assets/imgs/bg.jpg");
  overflow: hidden;
  position: relative;
}
.login_container {
  z-index: 9;
  width: 25rem;
  height: 30.47619048rem;
  position: absolute;
  top: 50%;
  left: 75%;
  /* -webkit-transform: translate(-50%, -50%); */
  transform: translate(-50%, -50%);
  border-radius: 11px;

  background: rgba(0, 0, 0, 0.2);
  text-align: center;
}
.login_container h1 {
  color: #fff;
  margin-top: 100px;
  margin-bottom: 50px;
}
.el-button.el-button--primary {
  width: 100%;
  background: linear-gradient(90deg, #1596fb, #002dff);
}

.bg_video {
  display: block;
  margin: auto;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.5;
}
.left {
  width: 50%;
  height: 100%;
  background-image: url(../../assets/imgs/bg2.png);
  background-repeat: no-repeat;
  background-size: 50%;
  position: absolute;
  opacity: 0.7;
  background-position: 60% 65%;
  z-index: 8;
}
</style>
