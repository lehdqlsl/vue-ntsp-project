<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-6">
<!--          <card>-->
<!--            <el-button @click="btnSelect" icon="el-icon-search" circle></el-button>-->
<!--          </card>-->
        </div>
        <div class="col-xl-12">
          <card>
            <h4 class="card-title" style="margin-bottom: 10px;"></h4>
            <div style="margin-bottom: 10px">
              <el-row>
                <el-col :offset="0" :span="4">
                  <el-input placeholder="번호 필터링" v-model="filters[0].value"></el-input>
                </el-col>
                <el-col :offset="4" :span="4">
                  <el-select v-model="filters[1].value" placeholder="select type">
                    <el-option label="모두" value=""></el-option>
                    <el-option label="활동감지기" value="활동감지기"></el-option>
                    <el-option label="화재감지기" value="화재감지기"></el-option>
                    <el-option label="응급호출기" value="응급호출기"></el-option>
                    <el-option label="열림감지기" value="열림감지기"></el-option>
                    <el-option label="레이더센서" value="레이더센서"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  <el-select v-model="filters[2].value" placeholder="select type">
                    <el-option label="모두" value=""></el-option>
                    <el-option label="정상" value="정상"></el-option>
                    <el-option label="부족" value="부족"></el-option>
                    <el-option label="교체" value="교체"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  <el-select v-model="filters[3].value" placeholder="select type">
                    <el-option label="모두" value=""></el-option>
                    <el-option label="정상" value="정상"></el-option>
                    <el-option label="차단" value="차단"></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </div>

            <data-tables :data="sensors" :filters="filters" :page-size="10" :pagination-props="{'pageSizes': [10,20,50]}">
              <el-table-column
                prop="phone"
                label="G/W 번호">
                <template slot-scope="scope">
                  <el-link type="primary" @click="moveUserInfo(scope.row.phone)">{{ scope.row.phone }}</el-link>
                </template>
              </el-table-column>
              <el-table-column
                prop="macAddr"
                label="MAC 주소">
              </el-table-column>
              <el-table-column
                prop="devType"
                label="장비타입"
              >
              </el-table-column>
              <el-table-column
                prop="battery"
                label="배터리 상태">
                <template slot-scope="scope">
                  <span v-if="scope.row.battery == '정상'" style="color:#05AE0E;">{{ scope.row.battery }}</span>
                  <span v-if="scope.row.battery == '부족'" style="color:#f0a810;">{{ scope.row.battery }}</span>
                  <span v-if="scope.row.battery == '교체'" style="color:#EE2D20;">{{ scope.row.battery }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="network"
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
              </el-table-column>
            </data-tables>
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
    name: "SensorList",
    components: {
      RecipientList,
    },
    data() {
      return {
        inputData: "",
        placeholder: "",
        select_option1: "",
        select_option2: "3",
        radio: "1",
        options: [
          {value: "Normal", label: "정상"},
          {value: "Non_Receive", label: "미수신"},
          {value: "Unplug", label: "차단"},
          {value: "AS", label: "점검"}
        ],
        options2: [
          {value: "3", label: "전체"},
          {value: "0", label: "뒷번호(4자리)"},
          {value: "1", label: "전체번호(11자리)"},
          {value: "2", label: "이름"}
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
        filters: [
          {
            prop: 'phone',
            value: []
          },
          {
            prop: 'devType',
            value: []
          },
          {
            prop: 'battery',
            value: []
          },
          {
            prop: 'network',
            value: []
          }
        ],
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
      }
      ,
      btnSelect() {
        this.getSensorList()
      }
      ,
      ...
        recipientHelper.mapActions([
          'getSensorList'
        ]),
    },
    created() {
      this.getSensorList()
    }
    ,
    mounted() {

    }
    ,
    computed: {
      ...
        recipientHelper.mapState({
          sensors: state => state.sensors
        }),
    }
  }
</script>

<style scoped>
  .sc-table .action-list {
    text-align: left;
  }
</style>
