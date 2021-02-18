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
                  <b-th class="pl-3 pt-3"><p>처리상태</p></b-th>
                  <b-td class="pl-3 pt-3"><p>{{ failure.aware }}</p></b-td>
                </b-tr>
                <b-tr>
                  <b-th class="pl-3 pt-3"><p>해결</p></b-th>
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
          <card v-if="failure.closed == '미처리'">
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
                    v-model="formData.isAware"
                    @change="checkValue"
                  ></b-form-checkbox>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-lg-4" style="text-align: right">
                  <el-tooltip content="AS 및 장비고장으로 이벤트나 주기보고를 보낼 수 없는 경우 사용" placement="bottom-start">
                    <el-badge value="?" class="item" type="success">
                    </el-badge>
                  </el-tooltip>
                  <label>수동 클로즈</label>
                </div>
                <div class="col-lg-8">
                  <b-form-checkbox
                    v-model="formData.isClosed"
                    :disabled="formData.isAware!=true"
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

  export default {
    components: {
      LTable
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
      putData() {
        this.formData.failureId = this.failure.failureId
        this.postFailureAction(this.formData);
        this.$router.go(0)
      },
      checkValue(check) {
        if (check == false) {
          this.formData.isClosed = false
        }
      }
    },
    mounted() {
      this.getFailure(this.$route.params.id)
      this.getFailureAction(this.$route.params.id)
      this.getFailureList(this.$route.params.id)
    },
    data() {
      return {
        formData: {
          contents: '',
          isClosed: '',
          isAware: ''
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
