<template>
  <div class="login_page fillcontain">
    <section>
      <div>
        <h5 class="fuck">@auther:HatChin</h5>
      </div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px" class="login-container">
        <div>
          <h1 class="title" style="color:white">LHCZ-Kubernetes_CRD-Demo</h1>
        </div>
        <el-form-item prop="username">
          <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="loginSubmit" :loading="logining">登录</el-button>
          <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>

  import qs from 'qs';
  import md5 from 'js-md5';


  let data = () => {
    return {

      loginForm: {
        // account: "",
        // password: ""
      },

      logining: false,

      rules: rules,


    }
  }

  const rules = {
    username: [{
      required: true,
      message: '请输入账号名',
      trigger: 'blur'
    }],
    password: [{
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }]
  }

  let loginSubmit = function () {
    if (this.logining)
      return

    this.$refs.loginForm.validate(valid => {
      if (!valid)
        return

      this.logining = true

      let md5pwd = '';
      //前端密码加密
      if (this.loginForm.password != "" && this.loginForm.username != ""){
        md5pwd = md5(this.loginForm.password)
        this.loginForm.password = md5pwd
      }

      //调用http协议
      this.$axios.post('/Crd/Login', qs.stringify(this.loginForm)).then(res => {
        this.logining = false
        // console.log(res.data.message.Username)

        sessionStorage.setItem("token", res.data.token)
        sessionStorage.setItem("user", res.data.message.Username)

        this.$message({
          message: '欢迎!',
          type: 'success',
        })
        this.$router.push('/Dashboard')
      }).catch(e => {
        // console.log(e.response)
        this.logining = false
        if(e.response.status == 401){
          this.$message({
            message: '记错了！shabi！',
            type: 'error'
          });
          return
        }
      })
    })


  }

  export default {

    data: data,

    methods: {

      loginSubmit

    }
  }
</script>

<style lang="scss" scoped>


  .login_page{
    width:100%;
    height:100%;
    background: no-repeat center top;
    background-size: 100% 100%;
    background-image:url(../../assets/background.jpeg);

  }

  .title {
    width: 100%;
    top: 100px;
    left: 0;
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .fuck {
    width: 100%;
    top: 100px;
    left: 0;
    margin: 0px auto 40px auto;
    text-align: right;
    color: #505458;
  }

  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background-color:rgba(255,255,255,0.0);
    /*border: 1px solid #eaeaea;*/
    /*box-shadow: 0 0 25px #cac6c6;*/
    /*opacity:0.80;*/
  }
</style>
