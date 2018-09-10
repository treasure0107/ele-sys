<template>
  <div class="panel">
    <header class="panel-heading">
      会员资产管理
    </header>
    <div class="conten">
      <div class="block lb">
        日期范围:
        从
        <el-date-picker
          v-model="BeginTime"
          style="width: 200px;"
          @change="changeFn"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期">
        </el-date-picker>
        到
        <el-date-picker
          v-model="EndTime"
          style="width: 200px;"
          type="datetime"
          @change="changeFn"
          size="large"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期">
        </el-date-picker>
        货币类型
        <template>
          <el-select v-model="label" clearable placeholder="请选择" @change="chan($event)">
            <el-option
              v-for="item in options"
              :key="item.CurrencyID"
              :label="item.CurrencyName + '[' + item.Unit + ']'"
              :value="item.CurrencyID">
            </el-option>
          </el-select>
        </template>
      </div>
      <div class="block lb" style="padding: 10px 0;">
        用户编号：<el-input type="Number" v-model="UserID" placeholder="请输入内容"></el-input>
        用户姓名：<el-input v-model="FullName" placeholder="请输入内容"></el-input>
        手机号码：<el-input v-model="PhoneNumber" placeholder="请输入内容"></el-input>
        Email：<el-input v-model="Email" placeholder="请输入内容"></el-input>
        <el-button type="danger" @click="handleSearch" >搜索</el-button>
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
            width="120">
          </el-table-column>
          <el-table-column
            prop="Email"
            label="Email"
            align="center"
            width="200">
          </el-table-column>
          <el-table-column
            prop="CurrencyName"
            label="货币名称"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="Unit"
            label="货币单位"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="BlockAddr"
            label="区块链地址"
            width="400"
            align="center">
          </el-table-column>
          <el-table-column
            prop="Balance"
            align="center"
            label="余额"
            width="150">
          </el-table-column>
          <el-table-column
            prop="Available"
            align="center"
            label="可用"
            width="150">
          </el-table-column>
          <el-table-column
            prop="Frozen"
            label="冻结"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="CreateTime"
            align="center"
            label="创建时间"
            width="200">
          </el-table-column>
          <el-table-column
            prop="name"
            label="操作"
            align="center"
            width="120">
            <template slot-scope="scope" v-if="editShow">
              <el-button type="primary" size="mini" round @click="$router.push('/PropertyEdit?id=' + scope.row.ID)">编辑</el-button>
            </template>
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
        label: '',
        value: '',
        istr: '',
        valueText: '',
        editShow: false
      }

    },
    mounted(){
      this.getMemberList();
      this.getMonList();
      let path = this.$route.path
      let pvalue = until.getPath((path).substr(1));
      this.editShow = (pvalue&2)==2?true:false;
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
      changeFn() {
        if (this.BeginTime == "" && this.EndTime == "") {
          this.istr = false;
        } else if (this.BeginTime != "" && this.EndTime == "") {
          this.istr = true;
        } else if (this.BeginTime == "" && this.EndTime != "") {
          this.istr = true;
        } else {
          var e = new Date (this.EndTime);
          var s = new Date (this.BeginTime);
          var result = e - s;
          if (result > 0) {
            this.istr = false;
          } else if (result==0) {
            this.istr = false;
          } else {
            this.istr = true;
          }
        }
      },
      getMemberList() {
        let self = this;
        this.$axios({
          method: "post",
          url: baseUrl + 'User/Asset?r=' + Math.random(),
          data: {
            'PageIndex': self.PageIndex,
            'PageSize': self.PageSize,
            'BeginTime': self.BeginTime,
            'EndTime': self.EndTime,
            'UserID': self.UserID,
            'FullName': self.FullName,
            'PhoneNumber': self.PhoneNumber,
            'Email': self.Email,
            'CurrencyID': self.value
          }
        }).then((result) => {
          let res = result.data.Data.DataList || [];
          self.tableData = res;
          self.totalCount = result.data.Data.TotalCount;
        });
      },
      getMonList() {
        let self = this;
        self.$axios({
          method: "get",
          url: baseUrl + 'Currency/QueryCurrencyPage?r=' + Math.random() + '&pageindex=1&pagesize=100',
          data: ''
        }).then((result) => {
          let res = result.data.Data.DataList || [];
          self.options = res;
          self.label=res[0].CurrencyName + '[' + res[0].Unit + ']';
          self.value = res[0].CurrencyID;
        });
      },
      chan (item) {
        this.value = item;
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
      stFn(IdentifyStatus) {
        if(IdentifyStatus == 0){
          return '未认证'
        } else if (IdentifyStatus == 1) {
          return '初级认证'
        } else if (IdentifyStatus == 2) {
          return '高级认证'
        } else if (IdentifyStatus == 3) {
          return '高级待审核'
        } else if (IdentifyStatus == 4) {
          return '高级审核失败'
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
