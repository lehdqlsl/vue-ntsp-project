<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-12">
          <card>
            <h4 class="card-title" style="margin-bottom: 10px;"></h4>
            <div style="margin-bottom: 10px">
              <el-row>
                <el-col :span="5">

                </el-col>
                <el-col :span="12">
                  <el-select v-model="filters[1].value" placeholder="select type">
                    <el-option label="All" value=""></el-option>
                    <el-option label="Repair" value="repair"></el-option>
                    <el-option label="Help" value="help"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="6">
                  <el-input placeholder="search NO." v-model="filters[0].value"></el-input>
                </el-col>
              </el-row>
            </div>

            <data-tables :data="recipient" :action-col="actionCol" :filters="filters">
              <el-table-column
                width="150px"
                prop="name"
                label="이름">
              </el-table-column>
              <el-table-column
                width="200px"
                prop="mobile"
                label="휴대폰 번호">
              </el-table-column>
              <el-table-column
                width="200px"
                prop="phone"
                label="G/W 번호">
              </el-table-column>
              <el-table-column
                width="300px"
                prop="address1"
                label="주소">
              </el-table-column>
              <el-table-column
                width="200px"
                prop="address2"
                label="상세주소">
              </el-table-column>
              <el-table-column
                width="200px"
                prop="regDate"
                label="개통일자">
              </el-table-column>
            </data-tables>
          </card>
        </div>

        <div v-if="show" class="col-xxl-4 col-xl-5 col-lg-7 col-md-8 col-sm-8 d-flex">
          <user-card class="flex-fill"
                     :selectedRow="selectedRow">
          </user-card>
        </div>
        <div v-if="show" class="col-xxl-2 col-xl-2 col-lg-5 col-md-4 col-sm-4 d-flex">
          <device-status class="flex-fill">
          </device-status>
        </div>
        <div v-if="show" class="col-xxl-6 col-xl-5 col-lg-12 col-md-7 col-sm-12 d-flex">
          <user-life class="flex-fill">
          </user-life>
        </div>

        <div v-if="show" class="col-xxl-3 col-xl-4 col-lg-12 col-md-5 col-sm-12 d-flex">
          <event-list class="flex-fill">
          </event-list>
        </div>
        <div v-if="show" class="col-xxl-9 col-xl-8 col-md-12 col-sm-12 d-flex">
          <user-tab class="flex-fill">
          </user-tab>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import UserCard from './UserProfile/UserCard.vue'
  import RecipientList from "../components/UserDetail/RecipientList";
  import DeviceStatus from "../components/UserDetail/DeviceStatus";
  import EventList from "../components/UserDetail/EventList";
  import UserTab from "../components/UserDetail/UserTab";
  import UserLife from "../components/UserDetail/UserLife";
  import {createNamespacedHelpers} from "vuex";

  const recipientHelper = createNamespacedHelpers('recipient')

  export default {
    name: "UserDetail",
    components: {
      UserCard,
      RecipientList,
      DeviceStatus,
      EventList,
      UserTab,
      UserLife
    },
    props: {
      inputData: {
        type: String,
        default: ""
      },
      selectType: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
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
              this.show = true
              this.selectedRow = row
              // 해당 G/W 번호를 가져옴
              console.log(row.phone)
              // 1. 대상자 정보 => 가져와서 그대로 적용

              // 2. 센서 상태

              // 3. 이벤트 목록

              // 4. 주기보고 목록
              //this.getPeriodList(row.phone)
              this.SET_PHONE(row.phone)
              this.getPeriodList(row.phone)
              // 탭 누를 때 마다 주기보고/센서데이터 호출한다.

            },
            label: '조회'
          }]
        },
        selectedRow: ""
      }
    },
    methods: {
      selectEvent(select) {

      },
      searchRecipient(data, selected) {
        let params = {
          data: data,
          type: selected
        }
        this.getRecipientList(params)
        this.show = false
      },
      ...recipientHelper.mapActions([
        'getRecipientList',
        'getPeriodList'
      ]),
      ...recipientHelper.mapMutations([
        'SET_PHONE'
      ])
    },
    created() {

    },
    mounted() {
      if(this.inputData != ""){
        this.searchRecipient(this.inputData, this.selectType)
      }
    },
    computed: {
      ...recipientHelper.mapState({
        recipient: state => state.recipient
      }),
    }
  }
</script>

<style scoped>
  .sc-table .action-list{
    text-align: left;
  }
</style>
