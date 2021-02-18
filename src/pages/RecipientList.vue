<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-6">
          <card>
              <el-radio
                class="col-xl-1"
                v-model="radio"
                @change="radioChange"
                label="1">G/W 상태</el-radio>
              <el-select
                class="col-xl-2"
                v-model="select_option1"
                clearable
                placeholder="선택">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <!--<el-select
                class="col-xl-3"
                v-model="select_option2"
                v-on:change="change"
              >
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-input
                class="col-xl-3"
                :placeholder="placeholder"
                v-model="inputData"
              >
              </el-input>-->
            <el-button @click="btnSelect" icon="el-icon-search" circle></el-button>
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

            <data-tables :data="gateways" :action-col="actionCol" :filters="filters">
              <el-table-column
                width="200px"
                prop="phone"
                label="G/W 번호">
              </el-table-column>
              <el-table-column
                width="200px"
                prop="gatewayStatus"
                label="G/W 상태">
              </el-table-column>
              <el-table-column
                width="200px"
                prop="app_ver"
                label="App 버전">
              </el-table-column>
              <el-table-column
                width="200px"
                prop="power"
                label="전원 상태">
              </el-table-column>
              <el-table-column
                width="200px"
                prop="network"
                label="통신 상태">
              </el-table-column>
              <el-table-column
                width="200px"
                prop="send_reg_date"
                label="마지막 주기보고">
              </el-table-column>
            </data-tables>
<!--            <data-tables :data="recipient" :action-col="actionCol" :filters="filters">-->
<!--              <el-table-column-->
<!--                width="150px"-->
<!--                prop="name"-->
<!--                label="이름">-->
<!--              </el-table-column>-->
<!--              <el-table-column-->
<!--                width="200px"-->
<!--                prop="mobile"-->
<!--                label="휴대폰 번호">-->
<!--              </el-table-column>-->
<!--              <el-table-column-->
<!--                width="200px"-->
<!--                prop="phone"-->
<!--                label="G/W 번호">-->
<!--              </el-table-column>-->
<!--              <el-table-column-->
<!--                width="300px"-->
<!--                prop="address1"-->
<!--                label="주소">-->
<!--              </el-table-column>-->
<!--              <el-table-column-->
<!--                width="200px"-->
<!--                prop="address2"-->
<!--                label="상세주소">-->
<!--              </el-table-column>-->
<!--              <el-table-column-->
<!--                width="200px"-->
<!--                prop="regDate"-->
<!--                label="개통일자">-->
<!--              </el-table-column>-->
<!--            </data-tables>-->
          </card>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import RecipientList from "../components/UserDetail/RecipientList";
  import {createNamespacedHelpers} from "vuex";

  const recipientHelper = createNamespacedHelpers('recipient')

  export default {
    name: "UserDetail",
    components: {
      RecipientList,
    },
    props: ['propsData'],
    data() {
      return {
        inputData:"",
        placeholder:"",
        select_option1:"",
        select_option2:"3",
        radio:"1",
        options: [
          {value:"Normal", label:"정상"},
          {value:"Non_Receive", label:"미수신"},
          {value:"Unplug", label:"차단"},
          {value:"AS", label:"점검"}
        ],
        options2: [
          {value:"3", label:"전체"},
          {value:"0", label:"뒷번호(4자리)"},
          {value:"1", label:"전체번호(11자리)"},
          {value:"2", label:"이름"}
        ],
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
        actionCol: {
          props: {
            label: '선택',
            align: 'center'
          },
          buttons: [{
            props: {
              type: 'primary'
            },
            handler: row => {
              // this.show = true
              // this.selectedRow = row
              // // 해당 G/W 번호를 가져옴
              // console.log(row.phone)
              // // 1. 대상자 정보 => 가져와서 그대로 적용
              //
              // // 2. 센서 상태
              //
              // // 3. 이벤트 목록
              //
              // // 4. 주기보고 목록
              // //this.getPeriodList(row.phone)
              // this.SET_PHONE(row.phone)
              // this.getPeriodList(row.phone)
              // // 탭 누를 때 마다 주기보고/센서데이터 호출한다.
              const loading = this.$loading({
                lock: true,
                text: '로딩중...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });

              this.$router.push({
                name: 'UserInfo',
                params: {
                  "id": row.phone
                }
              })

              loading.close()
            },
            label: '조회'
          }]
        },
        selectedRow: ""
      }
    },
    methods: {
      btnSelect(){
        let params = {
          gatewayStatus: this.select_option1
        }
        this.getGatewayList(params)
      },
      radioChange(value) {

      },
      change(index) {
        this.inputData = ""
        if (index == 0) {
          this.placeholder = "0000"
          this.max = 4
        } else if (index == 1) {
          this.placeholder = "010-1234-1234"
          this.max = 13
        } else if (index == 2) {
          this.placeholder = "홍길동"
        } else if (index ==3 ){

        }
      },
      selectEvent(select) {

      },
      searchRecipient(data, selected) {
        let params = {
          data: data,
          type: selected
        }
        this.getRecipientList(params)
      },
      ...recipientHelper.mapActions([
        'getRecipientList',
        'getPeriodList',
        'getGatewayList',
      ]),
      ...recipientHelper.mapMutations([
        'SET_PHONE'
      ])
    },
    created() {
      if(this.propsData != ""){
        this.select_option1 = this.propsData
      }
      let params = {
        gatewayStatus: this.propsData
      }
      if(params.gatewayStatus != undefined){
        this.getGatewayList(params)
      }
    },
    mounted() {

    },
    computed: {
      ...recipientHelper.mapState({
        recipient: state => state.recipient,
        gateways: state => state.gateways
      }),
    },
    watch:{
      'inputData': function(val, oldVal) {
        let params = {
          data: this.inputData,
          type: this.selectType
        }
        this.getRecipientList(params)
      },
      'inputType': function(val, oldVal){
        let params = {
          data: this.inputData,
          type: this.selectType
        }
        this.getRecipientList(params)
      }
    }
  }
</script>

<style scoped>
  .sc-table .action-list{
    text-align: left;
  }
</style>
