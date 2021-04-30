<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-12">
          <card>
            <div style="display: flex;justify-content: center;">
              <el-form style="width:400px;" :model="searchForm" :rules="rules" ref="ruleForm" label-width="80px"
                       class="demo-ruleForm">
                <el-form-item label="타입" prop="resource">
                  <el-radio-group v-model="searchForm.resource">
                    <el-radio label="0" style="margin-bottom: 0px;">장애</el-radio>
                    <el-radio label="1" style="margin-bottom: 0px;">응급</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="날짜" prop="date">
                  <el-date-picker
                    :picker-options="pickerOptions"
                    style="width: 90%;"
                    v-model="searchForm.date"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="~"
                    start-placeholder="시작 날짜"
                    end-placeholder="종료 날짜"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>

                <el-form-item label="G/W 번호">
                  <el-input size="mini" maxlength="3" v-model="searchForm.phone1" style="width: 55px;"></el-input>
                  -
                  <el-input ref="phone2" size="mini" maxlength="4" v-model="searchForm.phone2"
                            style="width: 65px;"></el-input>
                  -
                  <el-input ref="phone3" size="mini" maxlength="4" v-model="searchForm.phone3"
                            style="width: 65px;"></el-input>
                </el-form-item>
              </el-form>

              <el-form style="width:400px;" :model="searchForm" :rules="rules" ref="ruleForm" label-width="80px"
                       class="demo-ruleForm">

                <el-form-item v-if="searchForm.resource==0" label="장애종류">
                  <el-radio-group v-model="searchForm.failureType">
                    <el-radio label="0" style="margin-bottom: 0px;">전체</el-radio>
                    <el-radio label="1" style="margin-bottom: 0px;">차단</el-radio>
                    <el-radio label="2" style="margin-bottom: 0px;">미수신</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item v-if="searchForm.resource==1" label="응급종류">
                  <el-select v-model="searchForm.eventValue" placeholder="기본(전체)">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="처리상태">
                  <el-radio-group v-model="searchForm.closeType">
                    <el-radio label="0" style="margin-bottom: 0px;">전체</el-radio>
                    <el-radio label="1" style="margin-bottom: 0px;">처리</el-radio>
                    <el-radio label="2" style="margin-bottom: 0px;">미처리</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
            <hr style="width:800px;" class="mt-0">
            <div style="display: flex;justify-content: center;">
              <el-button @click="btnSearch(searchForm)" size="small" type="primary">검색</el-button>
              <el-button @click="btnReset(searchForm)" size="small">리셋</el-button>
            </div>
          </card>
        </div>
        <div class="col-xl-12">
          <card>
            <h4 class="card-title" style="margin-bottom: 10px;"></h4>

            <!-- 장애검색 테이블 -->
            <data-tables
              v-loading="searchLoading"
              v-if="searchForm.resource==0" :data="failureList" :page-size="10"
              :pagination-props="{'pageSizes': [10,20,50]}">

              <el-table-column
                prop="failureId"
                label="장애번호">
                <template slot-scope="scope">
                  <span style="color:#05AE0E;">{{scope.row.failureId}}</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="phone"
                label="G/W 번호">
                <template slot-scope="scope">
                  <el-link type="primary" @click="moveUserInfo(scope.row.phone)">{{ scope.row.phone }}</el-link>
                </template>
              </el-table-column>

              <el-table-column
                prop="regDate"
                label="발생시각">
              </el-table-column>

              <el-table-column
                prop="gatewayFailureStatus"
                label="장애">
                <template slot-scope="scope">
                  <span v-if="scope.row.gatewayFailureStatus == 'Unplug'" style="color:#ff304c;">차단</span>
                  <span v-if="scope.row.gatewayFailureStatus == 'Non_Receive'" style="color:#ff304c;">미수신</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="closed"
                label="처리상태">
                <template slot-scope="scope">
                  <el-link v-if="scope.row.closed == true" type="primary"
                           @click="moveDeviceDetail(scope.row.failureId)">처리
                  </el-link>
                  <el-link v-if="scope.row.closed == false" type="danger"
                           @click="moveDeviceDetail(scope.row.failureId)">미처리
                  </el-link>
                </template>
              </el-table-column>

              <el-table-column
                prop="closedDate"
                label="장애처리시각">
              </el-table-column>

            </data-tables>
            <!-- 장애검색 테이블 -->


            <!-- 응급검색 테이블 -->
            <data-tables
              v-loading="searchLoading"
              v-if="searchForm.resource==1" :data="emergencyList" :page-size="10"
                         :pagination-props="{'pageSizes': [10,20,50]}">
              <el-table-column
                prop="emergencyId"
                label="응급번호">
                <template slot-scope="scope">
                  <span style="color:#05AE0E;">{{scope.row.emergencyId}}</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="eventId.phone"
                label="G/W 번호">
                <template slot-scope="scope">
                  <el-link type="primary" @click="moveUserInfo(scope.row.eventId.phone)">{{ scope.row.eventId.phone }}</el-link>
                </template>
              </el-table-column>

              <el-table-column
                prop="eventId.gwRegDate"
                label="이벤트 발생시각">
              </el-table-column>

              <el-table-column
                prop="eventId.eventType"
                label="이벤트 종류">
                <template slot-scope="scope">
                  <span v-if="scope.row.eventId.eventType == '7'" style="color:#ff304c;">미감지</span>
                  <span v-if="scope.row.eventId.eventType == '11'" style="color:#ff304c;">화재</span>
                  <span v-if="scope.row.eventId.eventType == '15'" style="color:#ff304c;">응급호출</span>
                  <span v-if="scope.row.eventId.eventType == '2'" style="color:#ff304c;">119</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="closed"
                label="처리상태">
                <template slot-scope="scope">
                  <el-link v-if="scope.row.closed == true" type="primary"
                           @click="moveEmerDetail(scope.row.emergencyId)">처리
                  </el-link>
                  <el-link v-if="scope.row.closed == false" type="danger"
                           @click="moveEmerDetail(scope.row.emergencyId)">미처리
                  </el-link>
                </template>
              </el-table-column>

              <el-table-column
                prop="closedDate"
                label="응급처리시각">
              </el-table-column>

            </data-tables>
            <!-- 응급검색 테이블 -->
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import RecipientList from "../components/UserDetail/RecipientList";
  import {createNamespacedHelpers} from "vuex";
  import moment from "moment";


  const searchHelper = createNamespacedHelpers('search')

  export default {
    name: "HistoryList",
    components: {
      RecipientList,
    },
    props: ['propsData'],
    data() {
      return {
        test:0,
        options: [
          {
            value: '0',
            label: '전체'
          },
          {
            value: '11',
            label: '화재'
          }, {
            value: '15',
            label: '응급호출'
          }, {
            value: '2',
            label: '119'
          }, {
            value: '7',
            label: '미감지'
          }],
        selectEventType: '',
        rules: {
          date: [
            {required: true}
          ],
          type: [
            {required: true, message: 'Please select activity resource', trigger: 'change'}
          ],
          resource: [
            {required: true, message: 'Please select activity resource', trigger: 'change'}
          ],
        },
        searchForm: {
          date: '',
          phone1: '',
          phone2: '',
          phone3: '',
          resource: '0',
          failureType: '0',
          closeType: '0',
          eventValue: '0'
        },
        render: true,
        show: false,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '최근 1주일',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '최근 1달',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '최근 3달',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    methods: {
      btnReset() {
        this.searchForm.date = [
          moment().subtract(7, 'days').format("YYYY-MM-DD"),
          moment().format("YYYY-MM-DD")
        ]
        this.searchForm.phone1 = ''
        this.searchForm.phone2 = ''
        this.searchForm.phone3 = ''
        this.searchForm.failureType = '0'
        this.searchForm.closeType = '0'
        this.searchForm.resource = '0'
        this.searchForm.eventValue = '0'
        this.$store.commit("recipient/SET_RESET")
      },
      btnSearch(formName) {
        let param = {
          startDate: formName.date[0],
          endDate: formName.date[1],
          phone: formName.phone1 + formName.phone2 + formName.phone3,
          searchType: formName.resource,
          failureType: formName.failureType,
          closeType: formName.closeType,
          eventValue: formName.eventValue,
          vm: this
        }
        this.getSearch(param)
      },
      moveUserInfo(phone) {
        const {href} = this.$router.resolve({
          path: '/admin/user-info/' + phone.replace(/-|:/g, "")
        });
        window.open(href, '_blank');
      },
      moveDeviceDetail(failureId) {
        const {href} = this.$router.resolve({
          path: '/admin/device-detail/' + failureId
        });
        window.open(href, '_blank');
      },
      moveEmerDetail(emergencyId) {
        const {href} = this.$router.resolve({
          path: '/admin/test2/' + emergencyId
        });
        window.open(href, '_blank');
      }
      ,
      btnSelect() {
        this.getSensorList()
      }
      ,
      ...
        searchHelper.mapActions([
          'getSearch'
        ]),
    },
    created() {

    },mounted() {
      if (this.propsData != undefined) {
        this.searchForm.resource = '1'
        this.searchForm.eventValue = this.propsData.toString()
        this.searchForm.date = [
          moment().clone().startOf('month').format('YYYY-MM-DD'),
          moment().clone().endOf('month').format('YYYY-MM-DD')
        ]
        this.btnSearch(this.searchForm)
      }else{
        this.searchForm.date = [
          moment().subtract(7, 'days').format("YYYY-MM-DD"),
          moment().format("YYYY-MM-DD")
        ]
      }
    }
    ,
    computed: {
      ...
        searchHelper.mapState({
          failureList: state => state.failureList,
          emergencyList: state => state.emergencyList,
          searchLoading: state => state.searchLoading
        }),
    }, watch: {
      'searchForm.phone1': function (val, oldVal) {
        if (val.length == 3) {
          this.$refs.phone2.focus();
        }
      },
      'searchForm.phone2': function (val, oldVal) {
        if (val.length == 4) {
          this.$refs.phone3.focus();
        }
      }
    }
  }
</script>

<style scoped>
  .sc-table .action-list {
    text-align: left;
  }

  .el-form-item {
    margin-bottom: 15px;
  }

</style>
<style>
  .el-form-item__label {
    font-size: 14px !important;
  }
</style>
