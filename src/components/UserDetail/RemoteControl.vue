<template>
  <div>
    <div class="row">
      <div class="col-sm-6">
        <el-button class="col-sm-3 mb-2" style="margin-left:10px;">주기보고</el-button>
        <el-button class="col-sm-3 mb-2">원격개통</el-button>
        <el-button class="col-sm-3 mb-2">USB 리셋</el-button>
        <el-button class="col-sm-3 mb-2">응급상황 해제</el-button>
        <el-button class="col-sm-3 mb-2">CODI 리셋</el-button>
        <el-button class="col-sm-3 mb-2">테블릿 재부팅</el-button>
        <el-button class="col-sm-3 mb-2">재실보고</el-button>
        <el-button class="col-sm-3 mb-2">활동보고</el-button>
        <el-button @click="centerDialogVisible = true" class="col-sm-3 mb-2" style="margin-left:10px;">로그요청</el-button>
        <el-button class="col-sm-3 mb-2" style="margin-left:10px;">G/W 업데이트</el-button>
        <el-button class="col-sm-3 mb-2" style="margin-left:10px;">F/W 업데이트</el-button>
      </div>

      <div class="col-sm-6">
          <div slot="header" class="clearfix">
            <el-button style="float: left; padding: 3px 0" type="text" @click="logRefresh">새로 고침</el-button>
          </div>
          <el-table
            :default-sort = "{prop: 'regDate', order: 'descending'}"
            :data="logList"
            :max-height="385"
            style="width: 100%;">
            <el-table-column
              sortable
              prop="regDate"
              label="로그날짜">
            </el-table-column>
            <el-table-column
              prop="size"
              label="파일크기">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="다운로드">
              <template slot-scope="scope">
                <el-button @click="logDownload(scope.$index, scope.row)" type="text">다운로드</el-button>
              </template>
            </el-table-column>
          </el-table>
      </div>
    </div>

    <el-dialog
      title="로그요청"
      :visible.sync="centerDialogVisible"
      width="20%"
      center>
      <div class="block">
        <span class="demonstration" style="font-size: 1.0rem;">날짜 선택</span>
        <el-date-picker
          style="width: 100%;"
          v-model="logDate"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="~"
          start-placeholder="시작 날짜"
          end-placeholder="종료 날짜"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="requestLog">요청</el-button>
            <el-button @click="centerDialogVisible = false">취소</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from "vuex";
  import moment from "moment";
  import define from "../../store/define";

  const recipientHelper = createNamespacedHelpers('recipient')

  export default {
    props:["phone"],
    data() {
      return {
        logDate: "",
        centerDialogVisible: false
      };
    },
    methods: {
      requestLog() {
        this.centerDialogVisible = false

        //로그요청
        let params = {
          phone: this.$route.params.id,
          parameter: {
            startDate : this.logDate[0],
            endDate : this.logDate[1],
          }
        }
        this.postRequestLog(params)
        //로그요청

        alert("로그요청이 완료되었습니다.")
      },
      logRefresh() {
        this.getRequestLog(this.$route.params.id)
      },
      logDownload(index, row){
        let url = define.DEST+"/gateway/log/"+row.file_name
        window.open(url);
      },
      ...recipientHelper.mapActions([
        'postRequestLog',
        'getRequestLog'
      ]),
    },
    computed: {
      ...recipientHelper.mapState({
        logList: state => state.logList,
      }),
    },
    created() {
      this.logDate= moment().format("YYYY-MM-DD")
      this.getRequestLog(this.$route.params.id)
    },
    watch: {
      phone: function(newVal, oldVal) {
        this.getRequestLog(newVal)
      }
    }
  };
</script>

<style scoped>
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
  .block {
    padding: 10px 0;
    text-align: center;
    border-right: 1px solid #eff2f6;
    flex: 1;
  }
</style>
