<template>
  <div id="login">
    <div class="header">
      <h1 class="logo">TELEFIELD</h1>
    </div>
    <LoginComponent/>

    <div class="footer">
      <div class="links">
        <span><el-link target="_blank" :underline=false href="http://telefield.com/" style="color: white">공식홈페이지</el-link></span>
        <span><el-link target="_blank" :underline=false href="http://telefield.com/%ec%a0%9c%ed%92%88%ec%a0%95%eb%b3%b4/iot/iot-%ec%84%9c%eb%b9%84%ec%8a%a4%ed%94%8c%eb%9e%ab%ed%8f%bc/" style="color: white">서비스플랫폼</el-link></span>
        <span><el-link target="_blank" :underline=false href="http://telefield.com/%ec%a0%9c%ed%92%88%ec%a0%95%eb%b3%b4/iot/teleguard-%eb%94%94%eb%b0%94%ec%9d%b4%ec%8a%a4/" style="color: white">디바이스</el-link></span>
      </div>
      <div class="version">Version 1.02.05</div>
    </div>
  </div>
</template>

<script>
  import LoginComponent from "src/components/LoginComponent";

  export default {
    name: "login",
    components: {
      LoginComponent
    },
    created() {
      document.body.style.backgroundColor = '#102a43'
      this.$cookies.set("token", null);
    }
  };
</script>

<style lang="scss" scoped>
  #login {
    font-family: Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
    display: flex;
    flex-direction: column;
    min-height: 90vh;
  }

  .footer,
  .header {
    background-color: #102a43;
    padding: 20px 20px;
    color: #f0f4f8;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1,
    h2,
    h3 {
      color: #f0f4f8;
      padding: 0;
      margin: 0;
    }
    .links {
      display: flex;
      font-family: "Open Sans";
      span {
        padding: 0 10px;
        font-size: 18px;
        border-right: 1px solid #9fb3c8;
        &:last-child {
          border-right: none;
        }
      }
    }
    .version {
      font-family: "Open Sans";
      padding: 0 10px;
      color: #9fb3c8;
      font-size: 12px;
      margin-top: 5px;
    }
  }
  .header {
    padding: 10px 20px;
    .logo {
      font-family: "Open Sans";
      letter-spacing: 3px;
      padding-top: 15px;
      padding-bottom: 15px;
    }
    .logo .part-2 {
      color: #d64545;
    }
  }
</style>
