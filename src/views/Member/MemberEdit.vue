<template>
  <div class="panel">
    <header class="panel-heading">修改用户信息</header>
    <section>
      <el-form ref="form" label-width="200px" class="form">
        <el-form-item label="用户编码" prop="">
          <el-input v-model="UserID" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="">
          <el-input v-model="FullName"></el-input>
        </el-form-item>
        <el-form-item label="国家" prop="">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="" >
          <el-input v-model="PhoneNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="" >
          <el-input v-model="Email" disabled></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="">
          <el-input type="password" v-model="LoginPwd"></el-input>
        </el-form-item>
        <el-form-item label="资金密码" prop="">
          <el-input type="password" v-model="SafePwd"></el-input>
        </el-form-item>
        <!--<el-form-item label="交易状态" prop="">
          <el-select v-model="jyValue" placeholder="请选择">
            <el-option
              v-for="item in jy"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="提现状态" prop="">
          <el-select v-model="txValue" placeholder="请选择">
            <el-option
              v-for="item in tx"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐人编码" prop="">
          <el-input v-model="ReferralCode"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="">
          <el-input v-model="Comments"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script type="text/babel">
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";
  import country from "@/views/Member/country";
  import { quillEditor } from 'vue-quill-editor'
  export default {
    data(){
      return {
        UserID: '',
        FullName: '',
        value:'',
        PhoneNumber:'',
        Email: '',
        LoginPwd: '',
        SafePwd: '',
        jyValue: '',
        txValue: '',
        ReferralCode: '',
        Comments: '',
        jy: [{
          value: 1,
          label: '开启'
        },{
          value: 0,
          label: '关闭'
        }],
        tx: [{
          value: 1,
          label: '开启'
        },{
          value: 0,
          label: '关闭'
        }],
        options: [],
      }

    },
    created(){
    },
    mounted(){
      this.UserID = this.$route.query.id;
      this.options = country.getData();
      this.getDetails();
    },
    methods: {
      getDetails(){
        try {
          let config = {
            method: "GET",
            url: baseUrl + "User/GetBasicInfoById/{id}?id=" + this.UserID,
          };
          this.$axios(config).then(res => {
            if (until.responesValidate(res)) {
              let data = res.data.Data;
              this.FullName = data.FullName;
              this.PhoneNumber = data.PhoneNumber;
              this.value = data.AreaCode
              this.Email = data.Email;
              this.LoginPwd = data.LoginPwd;
              this.SafePwd = data.SafePwd;
              this.jyValue = data.IsEnableTrade;
              this.txValue = data.IsEnableWithdraw;
              this.ReferralCode = data.ReferralCode;
              this.Comments = data.Comments;
            }
          });
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      submitForm(){
        var self = this;
        if (!self.LoginPwd) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '登录密码不能为空！',
            type: 'error'
          });
          return false;
        }
        if (!self.SafePwd) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '资金密码不能为空！',
            type: 'error'
          });
          return false;
        }
        try {
          let config = {
            method: "POST",
            url: baseUrl + "User/DoBasicAddOrEdit",
            data: {
              'UserID': this.UserID,
              'FullName': this.FullName,
              'AreaCode': this.value,
              'LoginPwd': this.LoginPwd,
              'SafePwd': this.SafePwd,
              'ReferralCode': this.ReferralCode,
              'IsEnableTrade': this.jyValue,
              'IsEnableWithdraw': this.txValue,
              'Comments': this.Comments,
            }
          };
          this.$axios(config).then(result => {
            if (result.data.Status) {
              self.$message({
                type: "success",
                message: "提交成功!",
                onClose: () => {
                  this.$router.back(-1)
                }
              });
            } else {
              self.$message({
                type: "error",
                message: result.data.Msg,
              });
            }
          });
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      onEditorBlur(editor){//失去焦点事件
      },
      onEditorFocus(editor){//获得焦点事件
      },
      onEditorChange({editor,html,text}){//编辑器文本发生变化
        //this.content可以实时获取到当前编辑器内的文本内容
        console.log(this.VerifyCodeTPL);
      },
      onEditorBlur2(editor){//失去焦点事件
      },
      onEditorFocus2(editor){//获得焦点事件
      },
      onEditorChange2({editor,html,text}){//编辑器文本发生变化
        //this.content可以实时获取到当前编辑器内的文本内容
        console.log(this.VerifyCodeTPL_EN);
      }
    },
    components: {
      quillEditor
    }
  }

</script>

<style lang="scss" scoped>
  .form {
    margin-top: 30px;
    padding-bottom: 30px;
    margin-left: 100px;
  }

  /deep/ .el-input {
    width: 460px;
  }
</style>
