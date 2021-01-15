<template>

  <div class="content">
    <!-- 장비 상태 창 Start -->
    <div class="fixed-plugin" style="cursor: pointer" >
      <b class="caret"></b>
      <span class="notification"></span>
      <div class="dropdown show-dropdown show" v-b-toggle.sidebar-right style="outline: none">
        <a data-toggle="dropdown"><i class="fa fa-cog fa-2x"></i></a>
      </div>
      <b-sidebar id="sidebar-right"
                 right shadow
                 :backdrop-variant="dark"
                 no-header
                 backdrop
                 shadow>
        <template #default="{ hide }">
          <div class="px-3 py-2">
            <h4 id="sidebar-no-header-title" style="font-weight: bold">장비상태</h4>
            <b-table-simple hover small responsive>
              <b-tr>
                <b-th></b-th>
                <b-th>게이트웨이</b-th>
                <b-th>화재감지기</b-th>
                <b-th>응급호출기</b-th>
                <b-th>활동감지기</b-th>
              </b-tr>
              <b-tr>
                <b-th>전원(배터리)</b-th>
                <b-td><i class="fa fa-circle-o" aria-hidden="true" style="color: #0ab961"></i></b-td>
                <b-td><i class="fa fa-circle-o" aria-hidden="true" style="color: #0ab961"></i></b-td>
                <b-td><i class="fa fa-circle-o" aria-hidden="true" style="color: #ff9900"></i></b-td>
                <b-td><i class="fa fa-circle-o" aria-hidden="true" style="color: #0ab961"></i></b-td>
            </b-tr>
            <b-tr>
              <b-th>통신</b-th>
              <b-td><i class="fa fa-circle-o" aria-hidden="true" style="color: #0ab961"></i></b-td>
              <b-td><i class="fa fa-times" aria-hidden="true" style="color: #ff6c76"></i></b-td>
              <b-td><i class="fa fa-circle-o" aria-hidden="true" style="color: #0ab961"></i></b-td>
              <b-td><i class="fa fa-circle-o" aria-hidden="true" style="color: #ff9900"></i></b-td>
            </b-tr>
          </b-table-simple>

            <b-button variant="primary" @click="hide">닫기</b-button>
          </div>
        </template>
      </b-sidebar>
    </div>
    <!-- 장비 상태 창 End -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 col-sm-12 d-flex">
          <user-card class="flex-fill">
          </user-card>
        </div>
        <div class="col-md-8 col-sm-12 d-flex">
          <card class="flex-fill">
            <template slot="header">
              <ul class="nav float-right d-lg-flex" style="font-size: 13px;">
                <li class="nav-item">
                  <a class="nav-link active" href="#">1주</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-muted" href="#">1달</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-muted" href="#">1년</a>
                </li>
              </ul>
              <span class="card-title">생활 그래프</span>
              <Life></Life>
            </template>
          </card>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-4 col-md-6 d-flex">
          <card class="flex-fill">
            <template slot="header">
              <span class="card-title">2020년 09월 02일</span>
              <p class="card-category">일일 생활 분포</p>
              <test1></test1>
            </template>
          </card>
        </div>
        <div class="col-xl-4 col-md-6 d-flex">
          <card class="flex-fill">
            <template slot="header">
              <span class="card-title">2020년 09월 02일</span>
              <p class="card-category">일일 활동 분포</p>
              <act></act>
            </template>
          </card>
        </div>
        <div class="col-xl-4 col-md-6 d-flex">
          <card class="flex-fill">
            <template slot="header">
              <span class="card-title">2020년 09월 02일</span>
              <p class="card-category">일일 수면 그래프</p>
              <Sleep></Sleep>
            </template>
          </card>
        </div>
        <div class="col-xl-3 col-md-6 col-sm-12">
          <card>
            <template slot="header">
              <ul class="nav float-right d-lg-flex" style="font-size: 13px;">
                <li class="nav-item">
                  <a class="nav-link active" href="#">오늘</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-muted" href="#">1주</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-muted" href="#">1달</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-muted" href="#">1년</a>
                </li>
              </ul>
              <span class="card-title">실내 온도 그래프</span>
              <Temp></Temp>
            </template>
          </card>
        </div>
        <div class="col-xl-3 col-md-6 col-sm-12">
          <card>
            <template slot="header">
              <ul class="nav float-right d-lg-flex" style="font-size: 13px;">
                <li class="nav-item">
                  <a class="nav-link active" href="#">오늘</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-muted" href="#">1주</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-muted" href="#">1달</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-muted" href="#">1년</a>
                </li>
              </ul>
              <span class="card-title">실내 습도 그래프</span>
              <Humi></Humi>
            </template>
          </card>
        </div>
        <div class="col-xl-3 col-md-6 col-sm-12">
          <card>
            <template slot="header">
              <ul class="nav float-right d-lg-flex" style="font-size: 13px;">
                <li class="nav-item">
                  <a class="nav-link active" href="#">오늘</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-muted" href="#">1주</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-muted" href="#">1달</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-muted" href="#">1년</a>
                </li>
              </ul>
              <span class="card-title">실내 조도 그래프</span>
              <Illu></Illu>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import EditProfileForm from './UserProfile/EditProfileForm.vue'
  import Life from 'src/components/user/LifeChart'
  import UserCard from './UserProfile/UserCard.vue'
  import test1 from 'src/components/user/test1'
  import act from 'src/components/user/ActivityChart'
  import Temp from 'src/components/user/TemperatureChart'
  import Humi from 'src/components/user/HumidityChart'
  import Illu from 'src/components/user/IlluminanceChart'
  import Sleep from 'src/components/user/SleepChart'

  export default {
    components: {
      Life,
      UserCard,
      test1,
      Temp,
      Humi,
      Illu,
      act,
      Sleep
    }
  }

</script>
<style>
  .b-sidebar.b-sidebar-right{
    cursor: default;
  }

  .notification{
    display: inline-block;
    position: absolute;
    top: 12px;
    right: 42px;
    border-radius: 50%;
    height: 9px;
    width: 9px;
    background-color: #ff5b5b;
    z-index: 1;
  }

  #sidebar-right{
    top:150px;
    height: 280px;
    width: 850px;
  }
</style>
