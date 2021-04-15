<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-xl-12">
          <card>
            <div style="display: flex;justify-content: center;">
              <el-form style="width:350px;" :model="searchForm" label-width="90px"
                       class="demo-ruleForm">
                <el-form-item label="대상자상태">
                  <el-select v-model="searchForm.status" placeholder="기본(전체)">
                    <el-option
                      v-for="item in recipientOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
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

              <el-form style="width:350px;" :model="searchForm" label-width="80px"
                       class="demo-ruleForm">
                <el-form-item label="이름" prop="devType">
                  <el-input placeholder="홍길동" v-model="searchForm.name"></el-input>
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
              </el-row>
            </div>

            <data-tables :data="recipient" :page-size="20"
                         :table-props='{ defaultSort: {
                           prop: "regDate",
                           order: "descending"
                         } }'
                         :pagination-props="{'pageSizes': [10,20,50]}">
              <el-table-column
                :width="180"
                sortable
                prop="recipientInfo.phone"
                label="G/W 번호">
                <template slot-scope="scope">
                  <el-link type="primary" @click="moveUserInfo(scope.row.recipientInfo.phone)">{{
                    scope.row.recipientInfo.phone }}
                  </el-link>
                </template>
              </el-table-column>
              <el-table-column
                sortable
                align="center"
                prop="recipientInfo.name"
                :width="150"
                label="이름">
              </el-table-column>
              <el-table-column
                sortable
                align="center"
                :width="130"
                sortable
                prop="recipientInfo.birth"
                label="생년월일">
              </el-table-column>
              <el-table-column
                sortable
                align="center"
                :width="170"
                sortable
                prop="recipientInfo.mobile"
                label="연락처"
              >
              </el-table-column>
              <el-table-column
                sortable
                align="center"
                :width="160"
                prop="recipientStatus.current_status"
                label="현재 상태">
                <template slot-scope="scope">
                  <span v-if="scope.row.recipientStatus.current_status == '7'" style="color:#f0a810;">활동미감지</span>
                  <span v-if="scope.row.recipientStatus.current_status == '8'" style="color:#05AE0E;">활동</span>
                  <span v-if="scope.row.recipientStatus.current_status == '17'" style="color:#66b1ff;">외출</span>
                  <span v-if="scope.row.recipientStatus.current_status == '18'" style="color:#05AE0E;">재실</span>
                  <span v-if="scope.row.recipientStatus.current_status == '0'" style="color:#959595;">이벤트 없음</span>
                </template>
              </el-table-column>
              <el-table-column
                sortable
                prop="recipientInfo.address1"
                label="주소">
              </el-table-column>
              <el-table-column
                sortable
                prop="recipientInfo.address2"
                label="상세주소">
              </el-table-column>
              <el-table-column
                align="center"
                :width="200"
                sortable
                prop="regDate"
                label="개통일자">
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
        recipientOptions: [
          {
            value: '-1',
            label: '전체'
          },
          {
            value: '18',
            label: '재실'
          },
          {
            value: '17',
            label: '외출'
          }, {
            value: '8',
            label: '활동'
          }, {
            value: '7',
            label: '활동미감지'
          }, {
            value: '0',
            label: '이벤트없음'
          }
        ],
        searchForm: {
          phone1: '',
          phone2: '',
          phone3: '',
          status: '-1',
          name: '',
          address: ''
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
        this.searchForm.status = '-1'
        this.searchForm.name = ''

        this.$store.commit("recipient/SET_RECIPIENT_RESET")
      },
      searchRecipient() {
        let params = {
          address: this.searchForm.address,
          phone: this.searchForm.phone1 + this.searchForm.phone2 + this.searchForm.phone3,
          status: this.searchForm.status,
          name: this.searchForm.name
        }
        this.getRecipientList(params)
      },
      ...recipientHelper.mapActions([
        'getRecipientList'
      ]),
      ...recipientHelper.mapMutations([
        'SET_PHONE'
      ])
    },
    created() {

    },
    mounted() {

    },
    computed: {
      ...recipientHelper.mapState({
        recipient: state => state.recipient
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
