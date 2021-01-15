<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <h5 style="font-weight: bold">응급내역</h5>
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
                  <p class="card-category">2020년 10월</p>
                </div>
                <div slot="default" class="pl-3">
                  <div class="p-4" style="position: absolute;right: 40px;top:15px;">
                    <a class=""><i class="fa fa-fire" aria-hidden="true" style="font-size: 40px;color: #FF5C5B;"></i></a>
                  </div>

                  <h2 class="mt-0 mb-0 emer-title">{{ count.fire }}</h2>
                </div>
                <div slot="footer" class="pl-2">
                  <div style="color: #10c469;">
                    <b-icon-arrow-down font-scale="1.5"></b-icon-arrow-down>
                    <span style="font-size: 1rem;">3.16%</span>
                  </div>
                  <div class="stats ml-4">
                    Since last month
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
                  <p class="card-category">2020년 10월</p>
                </div>
                <div slot="default">
                  <div class="p-4" style="position: absolute;right: 30px;top:15px;">
                    <a class=""><i class="fa fa-phone-square" aria-hidden="true" style="font-size: 40px;color: rgba(250,52,52,0.82);"></i></a>
                  </div>
                  <h2 class="mt-0 mb-0 emer-title pl-3">{{ count.emergency }}</h2>
                </div>
                <div slot="footer" class="pl-2">
                  <div style="color: #10c469;">
                    <b-icon-arrow-down font-scale="1.5"></b-icon-arrow-down>
                    <span style="font-size: 1rem;">40.16%</span>
                  </div>
                  <div class="stats ml-4">
                    Since last month
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
                  <p class="card-category">2020년 10월</p>
                </div>
                <div slot="default" class="pl-3">
                  <div class="p-4" style="position: absolute;right: 15px;top:10px;">
                    <a class=""><i class="nc-icon nc-ambulance" style="font-size: 50px;color: #FF5C5B;"></i></a>
                  </div>
                  <h2 class="mt-0 mb-0 emer-title">{{ count._119 }}</h2>
                </div>
                <div slot="footer" class="pl-2">
                  <div style="color: #ff5c5b;">
                    <b-icon-arrow-up font-scale="1.5"></b-icon-arrow-up>
                    <span style="font-size: 1rem;">6.16%</span>
                  </div>
                  <div class="stats ml-4">
                    Since last month
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
                  <p class="card-category">10월 22일 15시</p>
                </div>
                <div slot="default" class="pl-3">
                  <div class="p-4" style="position: absolute;right: 30px;top:15px;">
                    <a class=""><i class="fa fa-heartbeat" aria-hidden="true" style="font-size: 40px;color: #ffdb09;"></i></a>
                  </div>
                  <h2 class="mt-0 mb-0 emer-title">{{ count.no_activity }}</h2>
                </div>
                <div slot="footer" class="pl-2">
                    <div style="color: #FF5C5B;">
                      <b-icon-arrow-up font-scale="1.5"></b-icon-arrow-up>
                      <span style="font-size: 1rem;">6.16%</span>
                    </div>
                    <div class="stats ml-4">
                      Since last day
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
              <h5 class="card-title" >Today 응급 목록</h5>
            </template>
            <l-table class="table-hover table-sm"
                     :data="emerList">
            </l-table>
          </card>
        </div>
        <div class="col-md-6 d-flex">
          <card class="strpied-tabled-with-hover flex-fill"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h5 class="card-title" >활동 미감지 목록</h5>
            </template>
            <div slot="default" class="">
              <l-table class="table-hover table-sm"
                       :columns="table2.columns"
                       :data="noActList">
              </l-table>
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
  import LTable from 'src/components/Table.vue'
  import StatsCard2 from "../components/Cards/StatsCard2";
  import chart from "../components/chart/CommitChart";
  import Bar from 'src/components/dashboard/BarChart'
  import {createNamespacedHelpers} from "vuex";

  const title1 = "타이틀"
  const subTitle1 = "서브타이틀"

  const helper = createNamespacedHelpers('emergency')

  const sensorTableColumns = ['상태', '정보']
  const sensortableData = [
    {
      시각: "2020-08-14 09:05",
      정보: "012-6423-5642",
      상태: "배터리교체",
      _cellVariants: { 상태: 'warning'}
    },
    {
      시각: "2020-08-14 09:05",
      정보: "012-6423-5642",
      상태: "통신차단",
      _cellVariants: { 상태: 'danger '}
    },
    {
      시각: "2020-08-14 09:05",
      정보: "012-6423-5642",
      상태: "배터리부족",
      _cellVariants: { 상태: 'secondary '}
    },
    {
      시각: "2020-08-14 09:05",
      정보: "012-6423-5642",
      상태: "배터리 교체",
      _cellVariants: { 상태: 'warning'}
    }
  ]


  const tableColumns = ['시각', '번호', '이벤트', '기간', '인지', '처리']
  const tableData = [{
    시각: '2020-08-14 09:05',
    번호: '012-6423-5642',
    이벤트: '화재',
    인지: "예",
    처리: "처리",
    _cellVariants: { 이벤트: 'danger'}
  },
    {
      시각: '2020-08-14 09:05',
      번호: '012-6423-5642',
      이벤트: '응급호출',
      기간: '5분',
      인지: "아니오",
      처리: "처리",
      _cellVariants: { 장애: 'danger'}
    },
    {
      시각: '2020-08-14 09:05',
      번호: '012-6423-5642',
      이벤트: '응급호출',
      인지: "아니오",
      처리: "처리",
      _cellVariants: { 장애: 'danger'}
    },
    {
      시각: '2020-08-14 09:05',
      번호: '012-6423-5642',
      이벤트: '119 신고',
      인지: "아니오",
      처리: "미처리",
      _cellVariants: {장애: 'danger'}
    }
    ]

  const tableColumns2 = ['시각', '번호', '심각도', '기간', '인지', '처리']
  const tableData2 = [{
    시각: '2020-08-14 09:05',
    번호: '012-6423-5642',
    심각도: '보통',
    기간: '5분',
    인지: "아니오",
    처리: "처리",
    _cellVariants: { 심각도: 'secondary '}
  },
    {
      시각: '2020-08-14 09:05',
      번호: '012-6423-5642',
      심각도: '주의',
      기간: '7시간',
      인지: "아니오",
      처리: "처리",
      _cellVariants: { 심각도: 'warning'}
    },
    {
      시각: '2020-08-14 09:05',
      번호: '012-6423-5642',
      심각도: '위험',
      기간: '25시간',
      인지: "예",
      처리: "처리",
      _cellVariants: { 심각도: 'danger'}
    },
    {
      시각: '2020-08-14 09:05',
      번호: '012-6423-5642',
      심각도: '경고',
      기간: '13시간',
      인지: "아니오",
      처리: "미처리",
      _cellVariants: {심각도: 'caution'}
    }
  ]
  export default {
    components: {
      Bar,
      StatsCard2,
      LTable,
      ChartCard,
      StatsCard,
      ChartCard2
    },
    data () {
      return {
        table1: {
          columns: [...tableColumns],
          data: [...tableData]
        },
        table2: {
          columns: [...tableColumns2],
          data: [...tableData2]
        },
        table3: {
          columns: [...sensorTableColumns],
          data: [...sensortableData]
        }
      }
    },
    computed: {
      ...helper.mapState({
        count: state => state.count,
        emerList: state => state.emerList,
        noActList: state => state.noActList
      }),
    },
    methods: {
      ...helper.mapActions([
        'getEmerCount',
        'getEmerList'
      ]),
    },
    mounted() {
      this.getEmerCount()
      this.getEmerList()
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

  .stat-title{
    font-weight: bold;
  }
</style>
