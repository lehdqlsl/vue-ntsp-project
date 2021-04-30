<template>
  <div class="login">
    <el-card>
      <h2>Login</h2>
      <el-form
        class="login-form"
        :model="model"
        :rules="rules"
        ref="form"
        @submit.native.prevent="login"
      >
        <el-form-item prop="username">
          <el-input v-model="model.username" placeholder="Username" prefix-icon="fas fa-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="model.password"
            placeholder="Password"
            type="password"
            prefix-icon="fas fa-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            block
          >Login
          </el-button>
        </el-form-item>
        <a class="forgot-password" href="http://telefield.com/%ea%b3%a0%ea%b0%9d%ec%a7%80%ec%9b%90/faq/">계정 문의</a>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import axios from "axios";
  import common from "../store/common";
  import {createNamespacedHelpers} from "vuex";

  const authHelper = createNamespacedHelpers('auth')

  export default {
    data() {
      return {
        loading: false,
        validCredentials: {
          username: "lightscope",
          password: "lightscope"
        },
        model: {
          username: "",
          password: ""
        },
        rules: {
          username: [
            {
              required: true,
              message: "Username is required",
              trigger: "blur"
            },
            {
              min: 4,
              message: "Username length should be at least 5 characters",
              trigger: "blur"
            }
          ],
          password: [
            {required: true, message: "Password is required", trigger: "blur"},
            {
              min: 5,
              message: "Password length should be at least 5 characters",
              trigger: "blur"
            }
          ]
        }
      };
    },
    computed: {
      ...authHelper.mapState({
        token: state => state.token,
      })
    },
    methods: {
      simulateLogin() {
        this.loading = true

        let param = {
          userId: this.model.username,
          password: this.model.password
        }

        axios.post(common.define.DEST + '/login', param).then((response) => {
          this.$store.commit("auth/SET_TOKEN", response.data.accessToken)
          //axios.defaults.headers.common['token'] = response.data.accessToken;
          let json = JSON.parse(response.data.user)

          this.$session.start()
          this.$session.set('id', json.userId)
          this.$session.set('token', response.data.accessToken)
          this.$session.set('name', json.userName)
          this.$session.set('role', json.role)

          this.$router.push('/admin/overview')
        }, (error) => {
          console.log(error)
          this.loading = false
          this.$message.error("계정이 올바르지 않습니다.");
        });
      },
      async login() {
        let valid = await this.$refs.form.validate();

        if (!valid) {
          return;
        }
        await this.simulateLogin();
      }
    },

  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .login {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-button {
    width: 100%;
    margin-top: 40px;
  }

  .login-form {
    width: 290px;
  }

  .forgot-password {
    margin-top: 10px;
  }
</style>
<style lang="scss" scoped>
  $teal: rgb(0, 124, 137);
  .el-button--primary {
    background: $teal;
    border-color: $teal;

    &:hover,
    &.active,
    &:focus {
      background: lighten($teal, 7);
      border-color: lighten($teal, 7);
    }
  }

  .login .el-input__inner:hover {
    border-color: $teal;
  }

  .login .el-input__prefix {
    background: rgb(238, 237, 234);
    left: 0;
    height: calc(100% - 2px);
    left: 1px;
    top: 1px;
    border-radius: 3px;

    .el-input__icon {
      width: 30px;
    }
  }

  .login .el-input input {
    padding-left: 35px;
  }

  .login .el-card {
    padding-top: 0;
    padding-bottom: 30px;
  }

  h2 {
    font-family: "Open Sans";
    letter-spacing: 1px;
    font-family: Roboto, sans-serif;
    padding-bottom: 20px;
  }

  a {
    color: $teal;
    text-decoration: none;

    &:hover,
    &:active,
    &:focus {
      color: lighten($teal, 7);
    }
  }

  .login .el-card {
    width: 340px;
    display: flex;
    justify-content: center;
  }
</style>
