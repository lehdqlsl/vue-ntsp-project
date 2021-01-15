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
      <sidebar-link to="/admin/user">
        <i class="nc-icon nc-circle-09"></i>
        <p>대상자 대시보드</p>
      </sidebar-link>
      <sidebar-link to="/admin/test">
        <i class="nc-icon nc-bullet-list-67"></i>
        <p>장애갱신</p>
      </sidebar-link>
      <sidebar-link to="/admin/device-detail">
        <i class="nc-icon nc-bullet-list-67"></i>
        <p>장애 세부내용</p>
      </sidebar-link>
      <sidebar-link to="/admin/event-renew">
        <i class="nc-icon nc-bullet-list-67"></i>
        <p>이벤트갱신</p>
      </sidebar-link>
      <sidebar-link to="/admin/test2">
        <i class="nc-icon nc-bullet-list-67"></i>
        <p>이벤트 세부내용</p>
      </sidebar-link>
      <sidebar-link to="/admin/recipient-list">
        <i class="nc-icon nc-bullet-list-67"></i>
        <p>장비 목록</p>
      </sidebar-link>
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
