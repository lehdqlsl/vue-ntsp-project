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
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-col>
          <el-col :xs="8" :sm="12" :md="6" :lg="6" :xl="12">
            <el-button @click="searchPeriod" icon="el-icon-search" type="primary" circle></el-button>
          </el-col>
        </el-row>
      </div>
      <el-table
        v-loading="cycleLoading"
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
  import axios from 'axios'
  import common from 'src/store/common'

  const recipientHelper = createNamespacedHelpers('recipient')

  export default {
    name: "PeriodReport",
    components: {},
    props: ["phone"],
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
      syntaxHighlight(json) {
        if (typeof json != 'string') {
          json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
          var cls = 'number';
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'key';
            } else {
              cls = 'string';
            }
          } else if (/true|false/.test(match)) {
            cls = 'boolean';
          } else if (/null/.test(match)) {
            cls = 'null';
          }
          return '<span class="' + cls + '">' + match + '</span>';
        });
      },
      searchPeriod() {
        let params = {
          phone: this.$route.params.id,
          startDate: this.value2[0],
          endDate: this.value2[1],
        }
        this.getPeriodList(params)
      },
      handleCurrentChange(val) {
        axios.get(common.define.DEST + '/sensors/cycles/' + val.id).then((Response) => {
          if (val != null) {
            let json = {
              gateway: val,
              sensors: Response.data
            }
            this.textarea = JSON.stringify(json, null, '\t')
          }
        })
      },
      ...recipientHelper.mapActions([
        'getPeriodList',
        'getSensorPeriod'
      ]),
    },
    created() {
      this.value2 = [
        moment().subtract(7, 'days').format("YYYY-MM-DD"),
        moment().format("YYYY-MM-DD")
      ]
    },
    mounted() {
      let params = {
        phone: this.$route.params.id,
        startDate: this.value2[0],
        endDate: this.value2[1],
      }
      this.getPeriodList(params)
    },
    computed: {
      ...recipientHelper.mapState({
        period: state => state.period,
        cycleLoading: state => state.cycleLoading,
        sensorCycle: state => state.sensorCycle
      }),
    },
    watch: {
      phone: function (newVal, oldVal) {
        let params = {
          phone: newVal,
          startDate: this.value2[0],
          endDate: this.value2[1],
        }
        this.getPeriodList(params)
      }
    }
  }
</script>
<style>
  .el-pagination {
    margin-top: 10px;
  }
</style>
