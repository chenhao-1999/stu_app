<template>
  <el-table :data="loginlog" border style="width: 100%">
    <el-table-column fixed prop="username" label="登入账户" width="218">
    </el-table-column>
    <el-table-column prop="lastLogin.ip" label="上次登入ip" width="218">
    </el-table-column>
    <el-table-column
      prop="lastLogin.loginTime"
      label="上次登入时间"
      width="218"
    >
    </el-table-column>
    <el-table-column prop="nowLogin.ip" label="本次登入ip" width="218">
    </el-table-column>
    <el-table-column
      prop="lastLogin.loginTime"
      label="本次登入时间"
      width="218"
    >
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["FETCH_LOGINLOG"])
  },

  mounted() {
    // this.$store.dispatch("FETCH_LOGINLOG")
    this.FETCH_LOGINLOG();
    setTimeout(() => {
      console.log(this.loginlog);
    },4000);
  },
  computed: {
    ...mapState(["loginlog"])
  },
  data() {
    return {
      table: ""
    };
  }
};
</script>
<style>
.el-table {
  margin-top: 20px;
}
th.is-leaf {
  height: 40px;
  line-height: 40px;
  padding: 0;
  text-align: center;
}
.el-table__row th {
  text-align: center;
}
.el-table .cell {
  text-align: center;
}
</style>
