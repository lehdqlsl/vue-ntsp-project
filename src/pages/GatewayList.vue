<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-xl-12">
          <card>
            <div style="display: flex;justify-content: center;">
              <el-form style="width:400px;" :model="searchForm" :rules="rules" ref="ruleForm" label-width="80px"
                       class="demo-ruleForm">
                <el-form-item label="타입" prop="devType">
                  <el-radio-group v-model="searchForm.devType">
                    <el-radio label="0" style="margin-bottom: 0px;">게이트웨이</el-radio>
                    <el-radio label="1" style="margin-bottom: 0px;">센서</el-radio>
                  </el-radio-group>
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

                <el-form-item v-if="searchForm.devType==1" label="센서종류">
                  <el-select v-model="searchForm.devValue" placeholder="기본(전체)">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="통태" v-if="searchForm.devType==1">
                  <el-radio-group v-model="searchForm.network">
                    <el-radio label="2" style="margin-bottom: 0px;">전체</el-radio>
                    <el-radio label="1" style="margin-bottom: 0px;">양호</el-radio>
                    <el-radio label="0" style="margin-bottom: 0px;">불량</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="배터리" v-if="searchForm.devType==1">
                  <el-radio-group v-model="searchForm.battery">
                    <el-radio label="3" style="margin-bottom: 0px;">전체</el-radio>
                    <el-radio label="2" style="margin-bottom: 0px;">정상</el-radio>
                    <el-radio label="1" style="margin-bottom: 0px;">부족</el-radio>
                    <el-radio label="0" style="margin-bottom: 0px;">교체</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="장비상태" v-if="searchForm.devType==0">
                  <el-select v-model="searchForm.gatewayStatus" placeholder="기본(전체)">
                    <el-option
                      v-for="item in gwOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <hr style="width:800px;" class="mt-0">
            <div style="display: flex;justify-content: center;">
              <el-button @click="searchRecipient" size="small" type="primary">검색</el-button>
              <el-button @click="btnReset(searchForm)" size="small">리셋</el-button>
            </div>
          </card>
        </div>

        <div class="col-xl-12">
          <card>
            <h4 class="card-title" style="margin-bottom: 10px;"></h4>
            <div style="margin-bottom: 10px">
              <el-row>
                <el-col :span="5">

                </el-col>
                <!--<el-col :span="12">
                  <el-select v-model="filters[1].value" placeholder="select type">
                    <el-option label="All" value=""></el-option>
                    <el-option label="Repair" value="repair"></el-option>
                    <el-option label="Help" value="help"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="6">
                  <el-input placeholder="search NO." v-model="filters[0].value"></el-input>
                </el-col>-->
              </el-row>
            </div>

            <data-tables v-if="searchForm.devType==0"
                         :page-size="10"
                         :pagination-props="{'pageSizes': [10,20,50]}"
                         :table-props='{ defaultSort: {
                           prop: "send_reg_date",
                           order: "descending"
                         } }'
                         :data="gateways" :filters="filters">
              <el-table-column
                prop="phone"
                sortable
                :width="200"
                label="G/W 번호">
                <template slot-scope="scope">
                  <el-link type="primary" @click="moveUserInfo(scope.row.phone)">{{ scope.row.phone }}</el-link>
                </template>
              </el-table-column>
              <el-table-column
                :width="220"
                prop="mac_addr"
                sortable
                label="MAC 주소">
              </el-table-column>
              <el-table-column
                align="center"
                :width="150"
                sortable
                prop="gatewayStatus"
                label="G/W 상태">
                <template slot-scope="scope">
                  <span v-if="scope.row.gatewayStatus == '정상'"
                        style="color:#05AE0E;">{{ scope.row.gatewayStatus }}</span>
                  <span v-if="scope.row.gatewayStatus == '전원 차단'"
                        style="color:#f0a810;">{{ scope.row.gatewayStatus }}</span>
                  <span v-if="scope.row.gatewayStatus == '데이터 미수신'"
                        style="color:#EE2D20;">{{ scope.row.gatewayStatus }}</span>
                  <span v-if="scope.row.gatewayStatus == '점검'"
                        style="color:#6f6c6c;">{{ scope.row.gatewayStatus }}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                :width="150"
                prop="app_ver"
                sortable
                label="App 버전">
                <template slot-scope="scope">
                  {{ scope.row.app_ver }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                :width="150"
                prop="fw_ver"
                sortable
                label="F/W 버전">
              </el-table-column>
              <el-table-column
                align="center"
                :width="180"
                prop="power"
                sortable
                label="전원 상태">
                <template slot-scope="scope">
                   <span v-if="scope.row.power == '연결'"
                         style="color:#05AE0E;">{{ scope.row.power }} ({{ scope.row.battery }}%)</span>
                  <span v-if="scope.row.power == '차단'"
                        style="color:#f0a810;">{{ scope.row.power }} ({{ scope.row.battery }}%)</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                :width="180"
                sortable
                prop="sensitivity"
                label="LTE 감도">
                <template slot-scope="scope">
                  <span v-if="scope.row.sensitivity == 0">X</span>
                  <span v-else-if="scope.row.sensitivity < 60" style="color: #409EFF">매우 좋음 (-{{ scope.row.sensitivity }})</span>
                  <span v-else-if="scope.row.sensitivity < 75" style="color: #05AE0E">좋음 (-{{ scope.row.sensitivity }})</span>
                  <span v-else-if="scope.row.sensitivity < 85" style="color: #f0a810">보통 (-{{ scope.row.sensitivity }})</span>
                  <span v-else-if="scope.row.sensitivity < 95" style="color: #EE2D20">나쁨 (-{{ scope.row.sensitivity }})</span>
                  <span v-else-if="scope.row.sensitivity < 124" style="color: #bb0502">매우 나쁨 (-{{ scope.row.sensitivity }})</span>
                </template>
              </el-table-column>
              <el-table-column
                sortable
                align="center"
                prop="send_reg_date"
                label="마지막 주기보고">
              </el-table-column>
            </data-tables>


            <data-tables v-if="searchForm.devType==1" :data="sensors" :filters="filters" :page-size="10"
                         :pagination-props="{'pageSizes': [10,20,50]}">
              <el-table-column
                sortable
                prop="phone"
                label="G/W 번호">
                <template slot-scope="scope">
                  <el-link type="primary" @click="moveUserInfo(scope.row.phone)">{{ scope.row.phone }}</el-link>
                </template>
              </el-table-column>
              <el-table-column
                sortable
                prop="macAddr"
                label="MAC 주소">
              </el-table-column>
              <el-table-column
                sortable
                prop="devType"
                label="장비타입"
              >
                <template slot-scope="scope">
                  {{ scope.row.devType }}
                </template>
              </el-table-column>
              <el-table-column
                sortable
                prop="battery"
                label="배터리 상태">
                <template slot-scope="scope">
                  <span v-if="scope.row.battery == '충만'" style="color:#05AE0E;">{{ scope.row.battery }}</span>
                  <span v-else-if="scope.row.battery == '부족'" style="color:#f0a810;">{{ scope.row.battery }}</span>
                  <span v-else-if="scope.row.battery == '교체'" style="color:#EE2D20;">{{ scope.row.battery }}</span>
                </template>
              </el-table-column>
              <el-table-column
                sortable
                prop="sensitivity"
                label="통신 상태 (감도)">
                <template slot-scope="scope">
                  <span v-if="scope.row.network == '정상'" style="color:#05AE0E;">{{ scope.row.network }} ({{scope.row.sensitivity}})</span>
                  <span v-if="scope.row.network == '차단'" style="color:#EE2D20;">{{ scope.row.network }} ({{scope.row.sensitivity}})</span>
                </template>
              </el-table-column>
              <el-table-column
                sortable
                prop="sendRegDate"
                label="마지막 주기보고">
                <template slot-scope="scope">
                  {{ scope.row.sendRegDate }}
                </template>
              </el-table-column>
            </data-tables>
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

  const recipientHelper = createNamespacedHelpers('recipient')

  export default {
    name: "UserDetail",
    components: {
      RecipientList,
    },
    props: ['propsData'],
    data() {
      return {
        gwOptions: [
          {
            value: '4',
            label: '전체'
          },
          {
            value: '0',
            label: '정상'
          },
          {
            value: '1',
            label: '차단'
          }, {
            value: '2',
            label: '미수신'
          }, {
            value: '3',
            label: '점검'
          }],
        options: [
          {
            value: '0',
            label: '전체'
          },
          {
            value: '2',
            label: '활동감지기'
          },
          {
            value: '18',
            label: '열림감지기'
          }, {
            value: '11',
            label: '화재감지기'
          }, {
            value: '10',
            label: '응급호출기'
          }, {
            value: '3',
            label: '레이더센서'
          }],
        rules: {
          date: [
            {required: true}
          ],
          type: [
            {required: true, message: 'Please select activity resource', trigger: 'change'}
          ],
          devType: [
            {required: true, message: 'Please select activity resource', trigger: 'change'}
          ],
        },
        searchForm: {
          date: '',
          phone1: '',
          phone2: '',
          phone3: '',
          devType: '0',
          devValue: '0',
          gatewayStatus: '4',
          network: '2',
          battery: '3',
          eventValue: '0'
        },
        inputData: "",
        placeholder: "",
        select_option1: "",
        select_option2: "3",
        radio: "1",
        render: true,
        show: false,
        titles: [{
          prop: "name",
          label: "이름"
        }, {
          prop: "mobile",
          label: "휴대폰 번호"
        }, {
          prop: "phone",
          label: "G/W 번호"
        }, {
          prop: "address1",
          label: "주소"
        }, {
          prop: "address2",
          label: "상세주소"
        }, {
          prop: "regDate",
          label: "개통일자"
        }],
        filters: [{
          value: ''
        }, {
          value: []
        }],
        select: "1번",
        selectedRow: ""
      }
    },
    methods: {
      moveUserInfo(phone) {
        const {href} = this.$router.resolve({
          path: '/admin/user-info/' + phone.replace(/-|:/g, "")
        });
        window.open(href, '_blank');
      },
      btnReset() {
        this.searchForm.phone1 = ''
        this.searchForm.phone2 = ''
        this.searchForm.phone3 = ''
        this.searchForm.devType = '0'
        this.searchForm.gatewayStatus = '4'

        this.$store.commit("recipient/SET_RESET")
      },
      searchRecipient() {
        if (this.searchForm.devType == 0) {
          // GW 검색
          let params = {
            gatewayStatus: this.searchForm.gatewayStatus,
            phone: this.searchForm.phone1 + this.searchForm.phone2 + this.searchForm.phone3
          }
          this.getGatewayList(params)
        } else {
          // 센서 검색
          let params = {
            devType: this.searchForm.devValue,
            phone: this.searchForm.phone1 + this.searchForm.phone2 + this.searchForm.phone3,
            network: this.searchForm.network,
            battery: this.searchForm.battery
          }
          this.getSensorList(params)
        }
      },
      ...recipientHelper.mapActions([
        'getRecipientList',
        'getPeriodList',
        'getGatewayList',
        'getSensorList'
      ]),
      ...recipientHelper.mapMutations([
        'SET_PHONE'
      ])
    },
    created() {
      this.$store.commit("recipient/SET_RESET")
      if (this.propsData != undefined) {
        this.searchForm.gatewayStatus = this.propsData
        this.searchForm.devType = "0"
        let params = {
          gatewayStatus: this.searchForm.gatewayStatus,
          phone: ""
        }
        this.getGatewayList(params)
      }
    },
    mounted() {

    },
    computed: {
      ...recipientHelper.mapState({
        recipient: state => state.recipient,
        gateways: state => state.gateways,
        sensors: state => state.sensors
      }),
    },
    watch: {
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
</style>
