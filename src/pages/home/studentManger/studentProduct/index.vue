<template>
  <div id="app">
    <el-select
    style="margin-top:20px"
    v-model="searchValue"
    clearable
    filterable
    remote
    reserve-keyword
    placeholder="请输入关键词"
    :remote-method="remoteMethod"
    :loading="loading"
    @change="searchTextChange"
    @clear="clear"
    @blur="searchBlur"
    >
    <el-option
      v-for="item in searchList"
      :key="item._id"
      :label="item.name"
      :value="item.name">
    </el-option>
  </el-select>
    
    <el-button
      type="primary"
      icon="el-icon-search"
      style="width:60px;height:40px;line-height:40px;backgroundColor:#ecf5ff;color:#409eff;margin-left:20px"
      @click="search"
    ></el-button>
    <el-button
      type="primary"
      style="width:80px;height:40px"
      @click="addStu"
      >添加项目</el-button
    >

    <!-- <br />
    <span>请选择班级：</span>
    <el-select v-model="value" placeholder="请选择" style="margin-top:20px">
      <el-option
        v-for="item in searchList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select> -->

    <el-table :data="stulist" border style="width: 100%">
      <el-table-column prop="headimgurl" label="头像" width="180">
        <template scope="scope">
          <img :src="scope.row.headimgurl" alt="" width="50" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="class" label="班级"> </el-table-column>
      <el-table-column prop="productUrl" label="项目"> </el-table-column>
      <el-table-column label="操作">
       <template scope="scope">
          <el-button type="primary" icon="el-icon-view" @click="$router.push({name:'studentProfile'})">查看</el-button>
          <el-button type="primary" icon="el-icon-edit" @click="editStu(scope.row)">编辑</el-button>
          <el-button
            type="primary"
            icon="el-icon-delete"
            style="background-color:red;border:0"
            @click="deleteStu(scope.row.sId)"
            >删除</el-button
          >
       </template>
      </el-table-column>
    </el-table>

    <!-- dialog窗口 用于添加和编辑的弹窗-->
    <el-dialog :title="dialogInfo.title" :visible.sync="dialogVisible">
      <el-form :model="stuForm" :rules="stuRules" ref="addStuRuleForm">
        <el-form-item label="头像">
          <el-upload
            class="uploadAvatar"
            ref="uploadAvatar"
            action="http://chst.vip/students/uploadStuAvatar"
            list-type="picture-card"
            :on-success="uploadSuccess"
            :on-remove="removeAvatar"
            :limit="1"
            name="headimgurl"
            :multiple="false"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="stuForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目地址" prop="productUrl">
          <el-input v-model="stuForm.productUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <el-input v-model="stuForm.class" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="stuForm.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="stuForm.city" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="degree">
          <el-input v-model="stuForm.degree" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input v-model="stuForm.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmClick('addStuRuleForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
import {searchStu,delStu} from "@/api";
const api=require("@/api")
export default {
  data() {
    return {
        searchList: [],
        searchValue: [],
        list: [],
        loading: false,
        searchText:"",

      // value: "",
      // options: [
      //   {
      //     value: "选项1",
      //     label: "黄金糕"
      //   },
      //   {
      //     value: "选项2",
      //     label: "双皮奶"
      //   },
      //   {
      //     value: "选项3",
      //     label: "蚵仔煎"
      //   },
      //   {
      //     value: "选项4",
      //     label: "龙须面"
      //   },
      //   {
      //     value: "选项5",
      //     label: "北京烤鸭"
      //   }
      // ],




    //
      dialogInfo: {
        title: "增加学员信息",
        requestName: "",
        editSuccessMsg: "增加成功",
        editerrorMsg: "增加失败"
      },
      showAvatar: true,
      dialogVisible: false,
      stuRules: {
        name: [{ required: true, message: "请输入名字", trigger: "blur" }],
        class: [{ required: true, message: "请输入班级", trigger: "blur" }],
        degree: [{ required: true, message: "请输入学历", trigger: "blur" }],
        city: [{ required: true, message: "请输入城市", trigger: "blur" }],
        productUrl: [
          { required: true, message: "请输入项目地址", trigger: "blur" }
        ],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" }
        ]
      },
      stuForm: {
        name: "",
        productUrl: "",
        headimgurl: "",
        class: "",
        age: "",
        city: "",
        degree: "",
        description: ""
      }
    }
  },
  methods: {
    ...mapActions(["FETCH_STULISI"]),

    uploadSuccess(r) {
      // 上传成功 给stuForm添加一条 headimgurl的属性
      this.stuForm.headimgurl = r.headimgurl;
      console.log(r);
    },
    removeAvatar(r) {
      this.stuForm.headimgurl = "";
    },
    confirmClick(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 本地表单校验通 将表单信息提交到后台
          // // 关闭 dialog
          this.dialogVisible = false;
          //清理_id 防止字段缺失
          if(this.stuForm["_id"]) delete this.stuForm["_id"]
          api[this.dialogInfo.requestName](this.stuForm)
            .then(res => {
             
              console.log(res);
              //上传成功
              if (res.data && res.data.state) {
                this.$message.success(this.dialogInfo.editSuccessMsg);
                //更新表格
                this.FETCH_STULISI();
                //清空stuForm
                //  Object.keys(this.stuForm).forEach(key => this.stuForm[key] = '')
                for (let key in this.stuForm) {
                  this.stuForm[key] = "";
                }
                this.$refs["uploadAvatar"].clearFiles(); //清空上传的图片
              }
            })
            .catch(err => {
              this.$message.error("登入过期网络错误");
            });
          //编辑
        } else {
          this.$message.error("请将内容填写完整");
        }
      });
    },

    //搜索框方法
    // 搜索框失去焦点 保持输入框的内容
    searchBlur () {
      // 将存储好的输入框值 设置给select组件
      this.searchValue = this.searchText
    },
    //点击搜索按钮
    search(){
        let key=this.searchValue
       
        searchStu(key)
        .then(res=>{
          //获取名字包含query的人的数组
         this.$store.commit("STULIST_CHANGE",res.data.data)
        })
    },
    clear (e) { },
    // 搜索框选中值发生变化的事件
    searchTextChange(searchText){
      console.log(searchText)
      let key=searchText
      searchStu(key)
        .then(res=>{
          //获取名字包含query的人的数组
         this.$store.commit("STULIST_CHANGE",res.data.data)
        })
    },
    //输入框输入内容时 就触发此事件
     remoteMethod(query) {
       //query就是输入框输入的值
        // console.log(query)
        //保存当前输入的值 为失去焦点时使用
        this.searchText=query
        let key=query
        searchStu(key)
        .then(res=>{
          //获取名字包含query的人的数组
         this.searchList=res.data.data
        })
        
      },
      
      //增加学员信息
      addStu(){
       
        this.dialogVisible = ! this.dialogVisible
        this.dialogInfo.title="增加学员信息"
        this.dialogInfo.requestName="addStu"
        this.dialogInfo.editSuccessMsg="增加成功"
        this.dialogInfo.editerrorMsg="增加失败"
      },
      
      //删除学员信息
      deleteStu(sId){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              delStu(sId)
              .then(res=>{
                if(res.data && res.data.state){
                  console.log(this.$message)
                  this.$message.success("删除成功")
                  //更新表格
                  this.FETCH_STULISI();
                }
              })
              .catch(err=>{
                console.log(err)
                this.$message.error("删除出错啦")
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
            
        },
      
     //修改学员信息
     editStu(row){
       //dialog 显示
        this.dialogVisible = ! this.dialogVisible
       //改变title
       this.dialogInfo.title="编辑学员信息"
       this.dialogInfo.requestName="updateStu"
        this.dialogInfo.editSuccessMsg="编辑成功"
        this.dialogInfo.editerrorMsg="编辑失败"
        
       //数据回显
       this.stuForm={...row}
       //提交更改
     }
    

  },
  computed: {
    ...mapState(["stulist"])
  },
  created () {
    
  },
  mounted() {
    this.FETCH_STULISI();
    // //搜索框
     this.list = this.searchList.map(item => {
        return { value: `value:${item}`, label: `label:${item}` };
      });
     
  }
};
</script>
<style  scoped>
.el-button {
  width: 60px;
  padding: 0;
  height: 24px;
  line-height: 24px;
}
.el-button span,
i {
  display: inline-block;
  height: 20px;
}

.el-autocomplete {
  height: 40px;
  margin-top: 20px;
  width: 300px;
}
</style>