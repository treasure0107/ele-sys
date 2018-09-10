<template>
  <div class="panel">
    <header class="panel-heading">
      安全日志管理
    </header>
    <div class="conten">
      <div class="block lb">
        日期范围:
        从
        <el-date-picker
          v-model="BeginTime"
          style="width: 200px;"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期">
        </el-date-picker>
        到
        <el-date-picker
          v-model="EndTime"
          style="width: 200px;"
          type="datetime"
          size="large"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="block lb" style="padding: 10px 0;">
        用户编号：<el-input type="Number" v-model="UserID" placeholder="请输入内容"></el-input>
        用户姓名：<el-input v-model="FullName" placeholder="请输入内容"></el-input>
        手机号码：<el-input v-model="PhoneNumber" placeholder="请输入内容"></el-input>
        Email：<el-input v-model="Email" placeholder="请输入内容"></el-input>
        <el-button type="danger" @click="handleSearch">搜索</el-button>
      </div>
      <div style="margin-top: 10px;">
        <el-table
          ref="multipleTable"
          @selection-change="selsChange"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="用户编号"
            prop="UserID"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="FullName"
            label="姓名"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="PhoneNumber"
            label="手机号码"
            align="center"
            width="">
          </el-table-column>
          <el-table-column
            prop="Email"
            label="Email"
            align="center"
            width="">
          </el-table-column>
          <el-table-column
            prop="IP"
            label="IP地址"
            align="center"
            width="">
          </el-table-column>
          <el-table-column
            prop="OperationTypeName"
            label="操作类型"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="Comments"
            align="center"
            label="备注"
            width="150">
          </el-table-column>
          <el-table-column
            prop="CreateTime"
            align="center"
            label="创建时间"
            width="200">
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="PageIndex"
          :page-size="PageSize"
          layout="total, prev, pager, next"
          :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import {baseUrl} from "@/config/env";
  import until from "@/scripts/until";
  export default {
    data(){
      return {
        tableData: [],
        PageIndex: 1,
        PageSize: 10,
        totalCount: 1,
        BeginTime: '',
        EndTime: '',
        UserID: '',
        FullName: '',
        PhoneNumber: '',
        Email: '',
        ids: [],
        isCheck: false,
        sels: '',
        options: [],
        value: ''
      }

    },
    mounted(){
      this.getMemberList();
    },
    computed: {
      timeDiff: function () {
        if (this.BeginTime == "" && this.EndTime == ""){
          return false;
        } else {
          var e = new Date (this.EndTime);
          var s = new Date (this.BeginTime);
          var result = e - s;
          if (result > 0) {
            return false;
          } else {
            return true;
          }
        }
      }
    },
    methods: {
      getMemberList() {
        let self = this;
        this.$axios({
          method: "post",
          url: baseUrl + 'User/Log?r=' + Math.random(),
          data: {
            'PageIndex': self.PageIndex,
            'PageSize': self.PageSize,
            'BeginTime': self.BeginTime,
            'EndTime': self.EndTime,
            'UserID': self.UserID,
            'FullName': self.FullName,
            'PhoneNumber': self.PhoneNumber,
            'Email': self.Email
          }
        }).then((result) => {
          let res = result.data.Data.DataList;
          self.tableData = res;
          self.totalCount = result.data.Data.TotalCount;
        });
      },
      handleSearch() {
        this.PageIndex = 1;
        this.getMemberList ();
      },
      selsChange(sels) {
        this.sels = sels
      },
      handleCurrentChange(val) {
        this.PageIndex = val;
        this.getMemberList ();
      },
      stFn(val) {
        if(val == 0){
          return '禁用'
        } else if (val == 1) {
          return '正常'
        } else {
          return '已删除'
        }
      },
    },
    components: {}
  }

</script>

<style lang="" scoped>
  h4 {
    text-align: left;
    font-size: 20px;
    padding: 20px 20px;
    border-bottom: 1px solid #f1f1f1;
  }
  .lb {
    text-align: left;
    height: 25px;
    line-height: 25px;
    margin-bottom: 15px;
  }
  .conten {
    padding: 20px 20px;
  }
  .el-input {
    width: 150px;
    margin-right: 10px;
  }
  el-date-picker {
    width: 250px!important;
  }
</style>
