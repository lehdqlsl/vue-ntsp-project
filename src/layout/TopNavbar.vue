<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"></a>
      <button type="button"
              class="navbar-toggler navbar-toggler-right"
              :class="{toggled: $sidebar.showSidebar}"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="toggleSidebar">
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="nav navbar-nav mr-auto">
          <!--          <li class="nav-item">
                      <a class="nav-link" href="#" data-toggle="dropdown">
                        <i class="nc-icon nc-palette"></i>
                      </a>
                    </li>-->
          <!--          <base-dropdown tag="li">
                      <template slot="title">
                        <i class="nc-icon nc-planet"></i>
                        <b class="caret"></b>
                        <span class="notification">5</span>
                      </template>
                      <a class="dropdown-item" href="#">Notification 1</a>
                      <a class="dropdown-item" href="#">Notification 2</a>
                      <a class="dropdown-item" href="#">Notification 3</a>
                      <a class="dropdown-item" href="#">Notification 4</a>
                      <a class="dropdown-item" href="#">Another notification</a>
                    </base-dropdown>-->

        </ul>
        <ul class="navbar-nav ml-auto">
<!--          <li class="nav-item">
            <a class="nav-link" href="#">
              관리
            </a>
          </li>
          <base-dropdown title="메뉴">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something</a>
            <div class="divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </base-dropdown>-->
          <li class="nav-item">
            <a class="nav-link">
              {{ this.$session.get('id') }}
              ({{ this.$session.get('name') }})
            </a>
          </li>
          <li class="nav-item">
            <a @click="logout" class="nav-link" style="cursor:pointer;">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  import {createNamespacedHelpers} from "vuex";

  const authHelper = createNamespacedHelpers('auth')

  export default {

    computed: {
      routeName() {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      },
      ...authHelper.mapState({
        user: state => state.user,
      })
    },
    data() {
      return {
        activeNotifications: false,
        selected: 0,
        placeholder: "0000",
        inputData: "",
        max: 4
      }
    },
    methods: {
      logout(){
        this.$session.destroy()
        this.$router.push('/login')
      },
      btnSearch() {
        if(this.$router.currentRoute.name != 'RecipientList'){
          this.$router.push(
            {
              name:'RecipientList',
              params: {
                "inputData": this.inputData,
                "selectedType": this.selected
              }
            }
          )
        }else{
          this.$router.currentRoute.matched[1].instances.default.searchRecipient(this.inputData, this.selected)
        }

      },
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown() {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown() {
        this.activeNotifications = false
      },
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false)
      },
      change(index) {
        this.inputData = ""
        if (index == 0) {
          this.placeholder = "0000"
          this.max = 4
        } else if (index == 1) {
          this.placeholder = "010-1234-1234"
          this.max = 13
        } else if (index == 2) {
          this.placeholder = "홍길동"
        }
      },
      inputMethod(data) {

      }
    },
    watch: {
      'inputData': function(val, oldVal){
        if(this.selected == 1){
          if(val.length == 3){
            this.inputData += "-"
          } else if(val.length == 8){
            this.inputData += "-"
          }
        }
      }
    }
  }
</script>
<style>
  #inputText::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #b6b6b6;
    opacity: 1; /* Firefox */
  }

  #inputText::-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #b6b6b6;
  }

  #inputText::-ms-input-placeholder { /* Microsoft Edge */
    color: #b6b6b6;
  }
</style>
