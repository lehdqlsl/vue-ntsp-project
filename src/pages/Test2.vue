<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-6">
          <card>
            <h4 class="card-title" style="margin-bottom: 10px;">이벤트 세부 내용</h4>
            <div class="row">
              <b-table-simple hover small responsive style="text-align: left;">
                <b-tr>
                  <b-th class="pl-3 pt-3" style="width: 200px;"><p>게이트웨이 번호</p></b-th>
                  <b-td class="pl-3 pt-3"><p>{{ emergency.phone }}</p></b-td>
                </b-tr>
                <b-tr>
                  <b-th class="pl-3 pt-3"><p>이벤트 번호</p></b-th>
                  <b-td class="pl-3 pt-3"><p>{{ emergency.emergencyId }}</p></b-td>
                </b-tr>
                <b-tr>
                  <b-th class="pl-3 pt-3"><p>종류</p></b-th>
                  <b-td class="pl-3 pt-3"><p>{{ emergency.eventType }}</p></b-td>
                </b-tr>
                <b-tr>
                  <b-th class="pl-3 pt-3"><p>심각도</p></b-th>
                  <b-td class="pl-3 pt-3" style="background-color: #ef8157"><p style="color: white">경고</p></b-td>
                </b-tr>
                <b-tr>
                  <b-th class="pl-3 pt-3"><p>발생시각</p></b-th>
                  <b-td class="pl-3 pt-3">
                    <p>
                      <a href="#">{{ emergency.regDate }}</a>
                      <el-link v-if="emergency.eventType == '응급호출' || emergency.eventType == '화재'" type="danger" class="ml-3" @click="fireLink">이미지 보기</el-link>
                    </p>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th class="pl-3 pt-3"><p>상태</p></b-th>
                  <b-td class="pl-3 pt-3"><p>{{ emergency.closed }}</p></b-td>
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
                          <e-table class="table-hover table-sm"
                                   :data="emerActionList">
                          </e-table>
          </card>
        </div>

        <div class="col-xl-6">
          <card v-if="emergency.closed == '미처리'">
            <h4 class="card-title">이벤트 갱신</h4>
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
            <h5 class="card-title mb-3">최근 응급 이벤트 목록</h5>
              <e-table class="table-hover table-sm"
                       :data="emergencyList">
              </e-table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ETable from 'src/components/EventTable.vue'
  import {createNamespacedHelpers} from "vuex";
  import define from 'src/store/define'

  const failureHelper = createNamespacedHelpers('failure')

  export default {
    components: {
      ETable
    }, computed: {
      ...failureHelper.mapState({
        emergency: state => state.emergency,
        emerActionList: state => state.emerActionList,
        emergencyList: state => state.emergencyList
      })
    },
    methods: {
      fireLink (){
        let url = define.DEST+"/open/v1/file/fire/"+this.emergency.eventId
        let popHeight=750;
        let popWidth=1000;
        let winHeight = document.body.clientHeight;	// 현재창의 높이
        let winWidth = document.body.clientWidth;	// 현재창의 너비
        let winX = window.screenLeft;	// 현재창의 x좌표
        let winY = window.screenTop;	// 현재창의 y좌표

        let popX = winX + (winWidth - popWidth)/2;
        let popY = winY + (winHeight - popHeight)/2;
        window.open(url,"new","width="+popWidth+"px,height="+popHeight+"px,top="+popY+",left="+popX);
      },
      ...failureHelper.mapActions([
        'getEmerEvent',
        'getEmerActionList',
        'postEmerEventAction',
        'getEmergencyList'
        /*        'postFailureAction',
                'getFailureAction',
                'getFailureList'*/
      ]),
      putData() {
        this.formData.emergencyId = this.$route.params.id
        this.formData.eventId = this.emergency.eventId
        this.postEmerEventAction(this.formData);
        this.$router.go(0)
      }
    },
    created() {

    },
    mounted() {
      this.getEmerEvent(this.$route.params.id)
      this.getEmerActionList(this.$route.params.id)
      this.getEmergencyList(this.$route.params.id)
    },
    data() {
      return {
        formData: {
          contents: '',
          isClosed: ''
        }
      }
    }
  }
</script>
<style>
  label {
    font-size: 0.9rem !important;
  }

  .row p {
    margin-bottom: 0.3rem;
    margin-top: 0.3rem;
    color: #6c757d;
    font-size: 14px;
  }
</style>
