<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <h5 style="font-weight: bold">금월 응급내역 현황</h5>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-5 col-lg-6">
          <div class="row">
            <div class="col-xl-6 col-md-6 d-flex">
              <card class="flex-fill"
                    title="화재"
                    sub-title="2020년 10월">
                <div slot="header" class="pt-2 pl-3">
                  <h4 class="card-title">화재</h4>
                  <p class="card-category">{{ date }}</p>
                </div>
                <div slot="default" class="pl-3">
                  <div class="p-4" style="position: absolute;right: 40px;top:15px;">
                    <a class=""><i class="fa fa-fire" aria-hidden="true"
                                   style="font-size: 40px;color: #FF5C5B;"></i></a>
                  </div>

                  <h2 @click="EmergencyList(11)" class="mt-0 mb-0 emer-title" style="cursor: pointer;">{{ count.fire }}</h2>
                </div>
                <div slot="footer" class="pl-2">
                  <div style="color: #10c469;" v-if="lastCount.fire > count.fire">
                    <b-icon-arrow-down font-scale="1.5"></b-icon-arrow-down>
                    <span  style="font-size: 1rem;">{{ (100 - (count.fire/lastCount.fire*100)).toFixed(2) }}%</span>
                  </div>
                  <div style="color: #ff5c5b;" v-if="lastCount.fire < count.fire">
                    <b-icon-arrow-up font-scale="1.5"></b-icon-arrow-up>
                    <span style="font-size: 1rem;">{{ ((count.fire/lastCount.fire*100) - 100).toFixed(2) }}%</span>
                  </div>
                  <div style="color: #10c469;" v-if="lastCount.fire == count.fire">
                    <span style="font-size: 1rem;">0.00%</span>
                  </div>
                  <div class="stats ml-4">
                    지난 달 ({{ lastCount.fire }}건)
                  </div>
                </div>
              </card>
            </div>

            <div class="col-xl-6 col-md-6 d-flex">
              <card class="flex-fill"
                    title="응급호출"
                    sub-title="2020년 10월">
                <div slot="header" class="pt-2 pl-3">
                  <h4 class="card-title">응급호출</h4>
                  <p class="card-category">{{ date }}</p>
                </div>
                <div slot="default">
                  <div class="p-4" style="position: absolute;right: 30px;top:15px;">
                    <a class=""><i class="fa fa-phone-square" aria-hidden="true"
                                   style="font-size: 40px;color: rgba(250,52,52,0.82);"></i></a>
                  </div>
                  <h2 @click="EmergencyList(15)" class="mt-0 mb-0 emer-title pl-3" style="cursor: pointer;">{{ count.emergency }}</h2>
                </div>
                <div slot="footer" class="pl-2">
                  <div style="color: #10c469;" v-if="lastCount.emergency > count.emergency">
                    <b-icon-arrow-down font-scale="1.5"></b-icon-arrow-down>
                    <span  style="font-size: 1rem;">{{ (100 - (count.emergency/lastCount.emergency*100)).toFixed(2) }}%</span>
                  </div>
                  <div style="color: #ff5c5b;" v-if="lastCount.emergency < count.emergency">
                    <b-icon-arrow-up font-scale="1.5"></b-icon-arrow-up>
                    <span style="font-size: 1rem;">{{ ((count.emergency/lastCount.emergency*100) - 100).toFixed(2) }}%</span>
                  </div>
                  <div class="stats ml-4">
                    지난 달 ({{ lastCount.emergency }}건)
                  </div>
                </div>
              </card>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-6 col-md-6">
              <card class="flex-fill"
                    title="119 신고"
                    sub-title="2020년 10월">
                <div slot="header" class="pt-2 pl-3">
                  <h4 class="card-title">119 신고</h4>
                  <p class="card-category">{{ date }}</p>
                </div>
                <div slot="default" class="pl-3">
                  <div class="p-4" style="position: absolute;right: 15px;top:10px;">
                    <a class=""><i class="nc-icon nc-ambulance" style="font-size: 50px;color: #FF5C5B;"></i></a>
                  </div>
                  <h2 @click="EmergencyList(2)" class="mt-0 mb-0 emer-title" style="cursor: pointer;">{{ count._119 }}</h2>
                </div>
                <div slot="footer" class="pl-2">
                  <div style="color: #10c469;" v-if="lastCount._119 > count._119">
                    <b-icon-arrow-down font-scale="1.5"></b-icon-arrow-down>
                    <span  style="font-size: 1rem;">{{ (100 - (count._119/lastCount._119*100)).toFixed(2) }}%</span>
                  </div>
                  <div style="color: #ff5c5b;" v-if="lastCount._119 < count._119">
                    <b-icon-arrow-up font-scale="1.5"></b-icon-arrow-up>
                    <span style="font-size: 1rem;">{{ ((count._119/lastCount._119*100) - 100).toFixed(2) }}%</span>
                  </div>
                  <div class="stats ml-4">
                    지난 달 ({{ lastCount._119 }}건)
                  </div>
                </div>
              </card>
            </div>

            <div class="col-xl-6 col-md-6">
              <card class="flex-fill"
                    title="활동 미감지"
                    sub-title="2020년 10월 22일">
                <div slot="header" class="pt-2 pl-3">
                  <h4 class="card-title">활동 미감지</h4>
                  <p class="card-category">{{ date }}</p>
                </div>
                <div slot="default" class="pl-3">
                  <div class="p-4" style="position: absolute;right: 30px;top:15px;">
                    <a class=""><i class="fa fa-heartbeat" aria-hidden="true"
                                   style="font-size: 40px;color: #ffdb09;"></i></a>
                  </div>
                  <h2 @click="EmergencyList(7)" class="mt-0 mb-0 emer-title" style="cursor: pointer;">{{ count.no_activity }}</h2>
                </div>
                <div slot="footer" class="pl-2">
                  <div style="color: #10c469;" v-if="lastCount.no_activity > count.no_activity">
                    <b-icon-arrow-down font-scale="1.5"></b-icon-arrow-down>
                    <span  style="font-size: 1rem;">{{ (100 - (count.no_activity/lastCount.no_activity*100)).toFixed(2) }}%</span>
                  </div>
                  <div style="color: #ff5c5b;" v-if="lastCount.no_activity < count.no_activity">
                    <b-icon-arrow-up font-scale="1.5"></b-icon-arrow-up>
                    <span style="font-size: 1rem;">{{ ((count.no_activity/lastCount.no_activity*100) - 100).toFixed(2) }}%</span>
                  </div>
                  <div class="stats ml-4">
                    지난 달 ({{ lastCount.no_activity }}건)
                  </div>
                </div>
              </card>
            </div>
          </div>
        </div>
        <div class="col-xl-7 col-lg-6">
          <card class="flex-fill"
                title="일별 응급 그래프">
            <Bar></Bar>
          </card>
        </div>
      </div>


      <div class="row">
        <div class="col-md-6 d-flex">
          <card class="strpied-tabled-with-hover flex-fill"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h5 class="card-title">미처리 응급 목록</h5>
            </template>
            <e-table class="table-hover table-sm"
                     :data="emerList">
            </e-table>
          </card>
        </div>
        <div class="col-md-6 d-flex">
          <card class="strpied-tabled-with-hover flex-fill"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h5 class="card-title">미처리 활동 미감지 목록</h5>
            </template>
            <div slot="default" class="">
              <e-table class="table-hover table-sm"
                       :data="noActList">
              </e-table>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ChartCard from 'src/components/Cards/ChartCard.vue'
  import ChartCard2 from 'src/components/Cards/ChartCard2.vue'
  import StatsCard from 'src/components/Cards/StatsCard.vue'
  import ETable from 'src/components/EventTable.vue'
  import StatsCard2 from "../components/Cards/StatsCard2"
  import Bar from 'src/components/dashboard/BarChart'
  import {createNamespacedHelpers} from "vuex";
  import moment from 'moment'

  const title1 = "타이틀"
  const subTitle1 = "서브타이틀"

  const helper = createNamespacedHelpers('emergency')


  export default {
    components: {
      Bar,
      StatsCard2,
      ETable,
      ChartCard,
      StatsCard,
      ChartCard2
    },
    data() {
      return {
        date: ""
      }
    },
    computed: {
      ...helper.mapState({
        count: state => state.count,
        lastCount: state => state.lastCount,
        emerList: state => state.emerList,
        noActList: state => state.noActList
      }),
    },
    methods: {
      ...helper.mapActions([
        'getEmerCount',
        'getEmerList',
        'getLastEmerCount'
      ]),
      EmergencyList(type) {
        this.$router.push(
          {
            name: 'HistoryList',
            params: {
              "propsData": type
            }
          }
        )
      }
    },
    mounted() {
      this.getEmerCount()
      this.getEmerList()
      this.getLastEmerCount()
      this.date = moment().format("YYYY년 MM월")
    }
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

  .stat-title {
    font-weight: bold;
  }
</style>
