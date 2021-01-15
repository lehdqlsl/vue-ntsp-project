<template>
  <div class="row">
    <div class="col-lg-7">
      <div style="margin-bottom: 5px;">
        <el-row :gutter="20">
          <el-col :xs="16" :sm="12" :md="18" :lg="18" :xl="12">
            <el-date-picker
              style="width: 100%;"
              v-model="value2"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="~"
              start-placeholder="시작 날짜"
              end-placeholder="종료 날짜"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-col>
          <el-col :xs="8" :sm="12" :md="6" :lg="6" :xl="12">
            <el-button @click="searchPeriod" icon="el-icon-search" type="primary" circle></el-button>
          </el-col>
        </el-row>
      </div>
      <el-table
        v-on:handleScroll
        :data="period"
        :max-height="385"
        @current-change="handleCurrentChange"
        highlight-current-row
        style="width: 100%;cursor: pointer;">
        <el-table-column
          width="80px"
          prop="id"
          label="보고 번호">
        </el-table-column>
        <el-table-column
          width="80px"
          prop="app_ver"
          label="버전">
        </el-table-column>
        <el-table-column
          prop="send_reg_date"
          label="주기보고 날짜">
        </el-table-column>
        <el-table-column
          prop="regDate"
          label="서버등록 날짜">
        </el-table-column>
        <el-table-column
          prop="sensitivity"
          label="LTE 감도">
        </el-table-column>
      </el-table>
    </div>
    <div class="col-lg-5 mt-4">
      <el-input
        type="textarea"
        :rows="19"
        readonly
        resize="none"
        v-model="textarea">
      </el-input>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import {createNamespacedHelpers} from "vuex";
  const recipientHelper = createNamespacedHelpers('recipient')

  export default {
    name: "PeriodReport",
    components: {},
    data() {
      return {
        textarea: "",
        titles: [{
          prop: "flow_no",
          label: "NO."
        }, {
          prop: "content",
          label: "Content"
        }, {
          prop: "flow_type",
          label: "Type"
        }],
        filters: [{
          /*          prop: 'flow_no',*/
          value: ''
        }, {
          value: []
        }],
        value1: "",
        value2: "",
        pickerOptions: {
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
        },
        selectedRow: []
      }
    },
    methods: {
      searchPeriod(){
        this.getPeriodList(this.phone)
      },
      onCreate() {
        this.data.push({
          content: "new created",
          flow_no: "FW201601010003" + Math.floor(Math.random() * 100),
          flow_type: "Help",
          flow_type_code: "help"
        })
      },
      onCreate100() {
        [...new Array(100)].map(_ => {
          this.onCreate()
        })
      },
      handleSelectionChange(val) {
        this.selectedRow = val
      },
      bulkDelete() {
        this.selectedRow.map(row => {
          this.data.splice(this.data.indexOf(row), 1)
        })
        this.$message('bulk delete success')
      },
      handleCurrentChange(val){
        this.textarea = val.data
      },
      ...recipientHelper.mapActions([
        'getPeriodList'
      ]),
    },
    created() {
      this.value2=[
        moment().subtract(7,'days').format("YYYY-MM-DD"),
        moment().format("YYYY-MM-DD")
      ]
    },
    mounted() {
      this.getPeriodList(this.phone)
    },
    computed: {
      ...recipientHelper.mapState({
        period: state => state.period,
        phone: state => state.phone
      }),
    }
  }
</script>
<style>
  .el-pagination {
    margin-top: 10px;
  }
</style>
