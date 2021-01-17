<template>
  <div class="content">
    <div class="container-fluid">
        <div class="row">
          <div class="col-xl-6">
            <card>
              <h5 class="card-title mb-3">장애 세부 내용</h5>
              <div class="row">
                <b-table-simple hover small responsive style="text-align: left;">
                  <b-tr>
                    <b-th class="pl-3 pt-3"><p>장애 번호</p></b-th>
                    <b-td class="pl-3 pt-3"><p>{{ failure.failureId }}</p></b-td>
                  </b-tr>
                  <b-tr>
                    <b-th class="pl-3 pt-3" style="width: 200px;"><p>게이트웨이 번호</p></b-th>
                    <b-td class="pl-3 pt-3"><p>{{ failure.phone }}</p></b-td>
                  </b-tr>
                  <b-tr>
                    <b-th class="pl-3 pt-3"><p>종류</p></b-th>
                    <b-td class="pl-3 pt-3"><p>{{ failure.gatewayFailureStatus }}</p></b-td>
                  </b-tr>
                  <b-tr>
                    <b-th class="pl-3 pt-3"><p>발생시각</p></b-th>
                    <b-td class="pl-3 pt-3"><p><a href="#">{{ failure.regDate }}</a></p></b-td>
                  </b-tr>
                  <b-tr>
                    <b-th class="pl-3 pt-3"><p>상태</p></b-th>
                    <b-td class="pl-3 pt-3"><p>{{ failure.closed }}</p></b-td>
                  </b-tr>
                  <b-tr>
                    <b-th class="pl-3 pt-3"><p>처리자</p></b-th>
                    <b-td class="pl-3 pt-3"><p>Admin(이동빈)</p></b-td>
                  </b-tr>
                </b-table-simple>
              </div>


            </card>
          </div>


          <div class="col-xl-6 d-flex">
            <card class="flex-fill">
              <h5 class="card-title mb-3">처리 이력</h5>
              <l-table class="table-hover table-sm"
                       :data="actionList">
              </l-table>
            </card>
          </div>
          <div class="col-xl-6">
            <card>
              <h5 class="card-title mb-3">장애 갱신</h5>
              <div>
                <div class="row mb-3">
                  <div class="col-lg-4" style="text-align: right">
                    <label>메시지</label>
                  </div>
                  <div class="col-lg-8">
                    <b-form-textarea
                      v-model="formData.contents"
                      no-resize
                      rows="6"
                      style="width: 100%"></b-form-textarea>
                  </div>
                </div>
                <div class="row mb-3">
                </div>
                <div class="row mb-3">
                  <div class="col-lg-4" style="text-align: right">
                    <label>처리 완료</label>
                  </div>
                  <div class="col-lg-8">
                    <b-form-checkbox
                      v-model="formData.isClosed"
                    ></b-form-checkbox>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-lg-4">
                  </div>
                  <div class="col-lg-8">
                    <b-button @click="putData" squared variant="primary" class="mr-3" size="sm">갱신</b-button>
                  </div>
                </div>
              </div>
            </card>
          </div>
          <div class="col-xl-6">
            <card>
              <h5 class="card-title mb-3">최근 발생 장애 목록</h5>
              <l-table class="table-hover table-sm"
                       :data="failureList">
              </l-table>
            </card>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
  import LTable from 'src/components/Table.vue'
  import {createNamespacedHelpers} from "vuex";

  const failureHelper = createNamespacedHelpers('failure')

  const tableColumns = ['장애', '발생시각', '처리시각', '처리자', '인지', '상태']
  const tableData = [{
    이벤트: '미수신',
    발생시각: '2020-08-14 09:05',
    처리시각: '2020-08-14 10:15',
    처리자: 'Admin(이동빈)',
    인지: "예",
    상태: "해결됨"
  },
    {
      이벤트: '미수신',
      발생시각: '2020-08-15 09:05',
      처리시각: '2020-08-15 09:12',
      처리자: 'Admin(이동빈)',
      인지: "예",
      상태: "해결됨"
    }
  ]

  const tableColumns2 = ['장애번호','시각', '처리자', '내용', '처리']
  const tableData2 = [
    {
      장애번호: '2764',
      시각: '2020-08-21 10:05',
      처리자: 'Admin(이동빈)',
      내용: '전원이 빠져있었음<br> 전원 연결 후 재개통',
      처리: "처리"
    },
    {
      장애번호: '2764',
      시각: '2020-08-14 09:05',
      처리자: 'Admin(이동빈)',
      내용: '데이터 미수신<br> 방문 점검예정',
      처리: "미처리"
    }
  ]
  export default {
    components: {
      LTable
    },
    props: {
      id: {
        type: Number,
        default: 0
      }
    },
    computed: {
      ...failureHelper.mapState({
        failure: state => state.failure,
        actionList: state => state.actionList,
        failureList: state => state.failureList
      })
    },
    methods: {
      ...failureHelper.mapActions([
        'getFailure',
        'postFailureAction',
        'getFailureAction',
        'getFailureList'
      ]),
      putData (){
        this.formData.failureId = this.failure.failureId
        this.postFailureAction(this.formData);
        this.$router.go(0)
      }
    },
    mounted() {
      console.log(this.id)
      this.getFailure(this.id)
      this.getFailureAction(this.id)
      this.getFailureList(this.id)
    },
    data() {
      return {
        formData: {
          contents: '',
          isClosed: ''
        },
        table1: {
          columns: [...tableColumns],
          data: [...tableData]
        },
        table2: {
          columns: [...tableColumns2],
          data: [...tableData2]
        },
        fields: ['시각', '유저', '메시지'],
        items: [
          { 시각: '2020/09/17 11:35:00', 유저: 'Admin', 메시지: '전화하였으나 받지않음' },
          { 시각: '2020/09/17 11:35:00', 유저: 'Admin', 메시지: '테스트' },
          { 시각: '2020/09/17 11:35:00', 유저: 'Admin', 메시지: '테스트' }
        ]
      }
    }
  }
</script>
<style>
  label{
    font-size: 0.9rem !important;
  }
  .row p{
    margin-bottom: 0.3rem;
    margin-top: 0.3rem;
    color: #6c757d;
    font-size: 14px;
  }
</style>
