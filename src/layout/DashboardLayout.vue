<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>장비 대시보드</p>
      </sidebar-link>
      <sidebar-link to="/admin/emer-overview">
        <i class="nc-icon nc-ambulance"></i>
        <p>응급 대시보드</p>
      </sidebar-link>
      <sidebar-link to="/admin/history-list">
        <i class="el-icon-document-copy"></i>
        <p>이력 조회</p>
      </sidebar-link>
      <hr>
      <sidebar-link to="/admin/gateway-list">
        <i class="nc-icon nc-bullet-list-67"></i>
        <p>장비 검색</p>
      </sidebar-link>
      <sidebar-link to="/admin/recipient-list">
        <i class="nc-icon nc-bullet-list-67"></i>
        <p>대상자 검색</p>
      </sidebar-link>
      <sidebar-link to="/admin/notice-list">
        <i class="nc-icon nc-notes"></i>
        <p>공지사항</p>
      </sidebar-link>
<!--      <sidebar-link to="/admin/remote-manager">
        <i class="nc-icon nc-bullet-list-67"></i>
        <p>원격 관리</p>
      </sidebar-link>-->
      <hr>

    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>
      <top-bookmark></top-bookmark>
      <dashboard-content @click="toggleSidebar">
      </dashboard-content>
      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import TopBookmark from './TopNavBookmarkBar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'

  export default {
    components: {
      TopNavbar,
      TopBookmark,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
