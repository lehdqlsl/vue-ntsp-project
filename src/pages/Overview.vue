<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card2 class="green">
            <div slot="header" class="icon-warning">
            </div>
            <div slot="content">
              <h1 class="stat-title" @click="gatewayList('0')" style="cursor: pointer;">{{ posts.Normal }}</h1>
            </div>
            <div slot="footer">
              정상
            </div>
          </stats-card2>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card2 class="red">
            <div slot="header" class="icon-danger">
            </div>
            <div slot="content">
              <h1 class="stat-title" @click="gatewayList('2')" style="cursor: pointer;">{{ posts.Non_Receive
                }}</h1>
            </div>
            <div slot="footer">
              미수신
            </div>
          </stats-card2>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card2 class="orange">
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-vector text-danger"></i>
            </div>
            <div slot="content">
              <h1 class="stat-title" @click="gatewayList('1')" style="cursor: pointer;">{{ posts.Unplug }}</h1>
            </div>
            <div slot="footer">
              차단
            </div>
          </stats-card2>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card2 class="gray">
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-favourite-28 text-primary"></i>
            </div>
            <div slot="content">
              <h1 class="stat-title" @click="gatewayList('3')" style="cursor: pointer;">{{ posts.AS }}</h1>
            </div>
            <div slot="footer">
              점검
            </div>
          </stats-card2>
        </div>

      </div>

      <div class="row">
        <div class="col-md-6 d-flex">
          <card class="strpied-tabled-with-hover flex-fill"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h5 class="card-title">장애</h5>
            </template>
            <l-table class="table-hover table-sm"
                     :data="failure">
            </l-table>
          </card>
        </div>
        <div class="col-md-6 d-flex">
          <card class="strpied-tabled-with-hover flex-fill"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h5 class="card-title">생활관리사 방문</h5>
            </template>
            <visit-table class="table-hover table-sm"
                         :data="qrcheck">
            </visit-table>
          </card>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-3 col-md-6">
          <chart-card2 v-if="isFetching" :chart-data="actCount">
            <template slot="header">
              <span class="card-title">활동감지기</span>
              <p class="card-category">24 Hours performance</p>
            </template>
            e
            <template slot="footer">
              <hr style="padding: 0;">
              <l-table class="table-hover table-sm"
                       style="width: 100%"
                       :data="this.actFailureList">
              </l-table>
            </template>
          </chart-card2>
        </div>
        <div class="col-xl-3 col-md-6">
          <chart-card2 v-if="isFetching" :chart-data="this.fireCount">
            <template slot="header">
              <span class="card-title">화재감지기</span>
              <p class="card-category">24 Hours performance</p>
            </template>
            <template slot="footer">
              <hr>
              <l-table class="table-hover table-sm"
                       style="width: 100%"
                       :data="this.fireFailureList">
              </l-table>
            </template>
          </chart-card2>
        </div>
        <div class="col-xl-3 col-md-6">
          <chart-card2 v-if="isFetching" :chart-data="this.doorCount">
            <template slot="header">
              <span class="card-title">열림감지기</span>
              <p class="card-category">24 Hours performance</p>
            </template>
            <template slot="footer">
              <hr>
              <l-table class="table-hover table-sm"
                       style="width: 100%"
                       :data="this.doorFailureList">
              </l-table>
            </template>
          </chart-card2>
        </div>
        <div class="col-xl-3 col-md-6">
          <chart-card2 v-if="isFetching" :chart-data="this.emerCount">
            <template slot="header">
              <span class="card-title">응급호출기</span>
              <p class="card-category">24 Hours performance</p>
            </template>
            <template slot="footer">
              <hr>
              <l-table class="table-hover table-sm"
                       style="width: 100%"
                       :data="this.emerFailureList">
              </l-table>
            </template>
          </chart-card2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ChartCard from 'src/components/Cards/ChartCard.vue'
  import ChartCard2 from 'src/components/Cards/ChartCard2.vue'
  import StatsCard from 'src/components/Cards/StatsCard.vue'
  import LTable from 'src/components/Table.vue'
  import VisitTable from 'src/components/VisitTable.vue'
  import StatsCard2 from "../components/Cards/StatsCard2";
  import chart from "../components/chart/CommitChart";
  import {createNamespacedHelpers} from 'vuex'
  import moment from "moment";

  const overviewHelper = createNamespacedHelpers('overview')


  export default {
    components: {
      StatsCard2,
      LTable,
      ChartCard,
      StatsCard,
      ChartCard2,
      VisitTable
    },
    data() {
      return {
        editTooltip: 'Edit Task',
        deleteTooltip: 'Remove',
      }
    },
    computed: {
      ...overviewHelper.mapState({
        posts: state => state.posts,
        failure: state => state.failure,
        actFailureList: state => state.actFailureList,
        fireFailureList: state => state.fireFailureList,
        doorFailureList: state => state.doorFailureList,
        emerFailureList: state => state.emerFailureList,
        actCount: state => state.actCount,
        fireCount: state => state.fireCount,
        doorCount: state => state.doorCount,
        emerCount: state => state.emerCount,
        isFetching: state => state.isFetching,
        qrcheck: state => state.qrcheck
      }),
    },
    methods: {
      ...overviewHelper.mapActions([
        'getPosts',
        'getFailure',
        'getSensorFailure',
        'getSensorCount',
        'getQRCheck'
      ]),
      gatewayList(type) {
        this.$router.push(
          {
            name: 'GatewayList',
            params: {
              "propsData": type
            }
          }
        )
      }
    },
    created() {

      document.body.style.backgroundColor = '#FFFFFF'

      this.getSensorCount()
      this.getPosts()
      this.getFailure()
      this.getSensorFailure()
      this.getQRCheck()
    },
    mounted() {
      this.counterInterval = setInterval(() => {
        this.getPosts()
        this.getFailure()
        this.getSensorFailure()
        this.getQRCheck()
      }, 5000)
      this.alertInterval = setInterval(() => {
        for (let i = 0; i < this.failure.length; i++) {
          let eventTime = moment(this.failure[i].발생시각)
          let now = moment()
          let diff = now.diff(eventTime, "minutes")

          if (diff <= 3) {
            let el = document.querySelectorAll('.table-warning', '.table-danger')
            for (let j = 0; j < el.length; j++) {
              if (!el[j].classList.contains('flash')) {
                el[j].classList.add('flash')
              } else {
                el[j].classList.remove('flash')
              }
            }
          }
        }
      }, 1000)
    },
    beforeDestroy() {
      clearInterval(this.counterInterval)
      clearInterval(this.alertInterval)
    },
  }
</script>
<style scoped>
  .red {
    background-color: #f44336;
  }

  .green {
    background-color: #4caf50;
  }

  .orange {
    background-color: #ff9800;
  }

  .gray {
    background-color: #9A9A9A;
  }

  #doughnut-chart {
    height: 200px;
  }

  hr {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
    border-top: 1.5px solid #00000047;
  }

  .table-danger {
    cursor: pointer;
  }

  .table-warning {
    cursor: pointer;
  }

  .flash {
    background-color: transparent;
  }
</style>
