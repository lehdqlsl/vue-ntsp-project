<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card2 class="green">
            <div slot="header" class="icon-warning">
            </div>
            <div slot="content">
              <h1 class="stat-title">{{ posts.Normal }}</h1>
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
                <h1 class="stat-title">{{ posts.Non_Receive }}</h1>
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
              <h1 class="stat-title">{{ posts.Unplug }}</h1>
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
              <h1 class="stat-title">{{ posts.AS }}</h1>
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
              <h5 class="card-title" >장애</h5>
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
              <h5 class="card-title" >점검</h5>
            </template>

          </card>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-3 col-md-6">
          <chart-card2 :chart-data="doughnut.data">
            <template slot="header">
              <span class="card-title">활동감지기</span>
              <p class="card-category">24 Hours performance</p>
            </template>
            <template slot="footer">
              <hr style="padding: 0;">
                  <l-table class="table-hover table-sm"
                           style="width: 100%"
                           :data="actFailureList">
                  </l-table>
            </template>
          </chart-card2>
        </div>
        <div class="col-xl-3 col-md-6">
          <chart-card2 :chart-data="doughnut.data">
            <template slot="header">
              <span class="card-title">화재감지기</span>
              <p class="card-category">24 Hours performance</p>
            </template>
            <template slot="footer">
              <hr>
                <l-table class="table-hover table-sm"
                         style="width: 100%"
                         :data="fireFailureList">
                </l-table>

            </template>
          </chart-card2>
        </div>
        <div class="col-xl-3 col-md-6">
          <chart-card2 :chart-data="doughnut.data">
            <template slot="header">
              <span class="card-title">열림감지기</span>
              <p class="card-category">24 Hours performance</p>
            </template>
            <template slot="footer">
              <hr>
                <l-table class="table-hover table-sm"
                         style="width: 100%"
                         :data="doorFailureList">
                </l-table>
            </template>
          </chart-card2>
        </div>
        <div class="col-xl-3 col-md-6">
          <chart-card2 :chart-data="doughnut.data">
            <template slot="header">
              <span class="card-title">응급호출기</span>
              <p class="card-category">24 Hours performance</p>
            </template>
            <template slot="footer">
              <hr>
                <l-table class="table-hover table-sm"
                         style="width: 100%"
                         :data="emerFailureList">
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
  import StatsCard2 from "../components/Cards/StatsCard2";
  import chart from "../components/chart/CommitChart";
  import { createNamespacedHelpers } from 'vuex'
  const overviewHelper = createNamespacedHelpers('overview')

  export default {
    components: {
      StatsCard2,
      LTable,
      ChartCard,
      StatsCard,
      ChartCard2
    },
    data () {
      return {
        editTooltip: 'Edit Task',
        deleteTooltip: 'Remove',
        doughnut: {
          data:[100,10,5,2]
        }
      }
    },
    computed: {
      ...overviewHelper.mapState({
        posts: state => state.posts,
        failure: state => state.failure,
        actFailureList: state => state.actFailureList,
        fireFailureList: state => state.fireFailureList,
        doorFailureList: state => state.doorFailureList,
        emerFailureList: state => state.emerFailureList
      }),
    },
    methods: {
      ...overviewHelper.mapActions([
        'getPosts',
        'getFailure',
        'getSensorFailure'
      ]),
    },
    mounted() {
      this.getPosts()
      this.getFailure()
      this.getSensorFailure()
    }
  }
</script>
<style>
  .red{
    background-color: #f44336;
  }
  .green{
    background-color: #4caf50;
  }
  .orange{
    background-color: #ff9800;
  }
  .gray{
    background-color: #9A9A9A;
  }
  #doughnut-chart{
    height: 200px;
  }

  hr{
    margin-top: 0px !important;
    margin-bottom: 0px !important;
    border-top: 1.5px solid #00000047;
  }

  .table-danger{
    cursor: pointer;
  }
  .table-warning{
    cursor: pointer;
  }
</style>
