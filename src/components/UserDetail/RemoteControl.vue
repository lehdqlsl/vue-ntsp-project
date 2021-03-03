<template>
  <div>
    <div class="row">
      <div class="col-sm-6">
        <el-button @click="clickCycle" class="col-sm-3 mb-2" style="margin-left:10px;">주기보고</el-button>
        <el-button @click="clickOpen" class="col-sm-3 mb-2">원격개통</el-button>
        <el-button @click="clickStop" class="col-sm-3 mb-2">응급상황 해제</el-button>
        <el-button @click="clickReboot" class="col-sm-3 mb-2">테블릿 재부팅</el-button>
        <el-button @click="clickIndoor" class="col-sm-3 mb-2">재실보고</el-button>
        <el-button @click="clickAct" class="col-sm-3 mb-2">활동보고</el-button>
        <el-button @click="centerDialogVisible = true" class="col-sm-3 mb-2" style="margin-left:10px;">로그요청</el-button>
        <el-button @click="appDialogVisible = true" class="col-sm-3 mb-2" style="margin-left:10px;">G/W 업데이트</el-button>
        <el-button @click="fwDialogVisible = true" class="col-sm-3 mb-2" style="margin-left:10px;">F/W 업데이트</el-button>
      </div>

      <div class="col-sm-6">
        <div slot="header" class="clearfix">
          <el-button style="float: left; padding: 3px 0" type="text" @click="logRefresh">새로 고침</el-button>
        </div>
        <el-table
          :default-sort="{prop: 'regDate', order: 'descending'}"
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

    <el-dialog
      title="App 업데이트"
      :visible.sync="appDialogVisible"
      width="20%"
      center>
      <div class="block">
        <el-radio @change="radioChange" v-model="radio" label="latest">최신버전</el-radio>
        <el-radio @change="radioChange" v-model="radio" label="select">특정버전</el-radio>
      </div>
      <el-input
        placeholder="버전 입력"
        v-model="inputVersion"
        :disabled=disabled
        minlength="6"
        maxlength="6"
        show-word-limit
        >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="clickApp">요청</el-button>
            <el-button @click="close">취소</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="FW 업데이트"
      :visible.sync="fwDialogVisible"
      width="20%"
      center>
      <div class="block">
        <el-radio @change="radioChange" v-model="radio" label="latest">최신버전</el-radio>
        <el-radio @change="radioChange" v-model="radio" label="select">특정버전</el-radio>
      </div>
      <el-input
        placeholder="버전 입력"
        v-model="inputVersion"
        :disabled=disabled
        minlength="3"
        maxlength="3"
        show-word-limit
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="clickFW">요청</el-button>
            <el-button @click="close">취소</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {createNamespacedHelpers} from "vuex";
  import moment from "moment";
  import define from "../../store/define";
  import axios from 'axios'
  import common from "../../store/common";

  const recipientHelper = createNamespacedHelpers('recipient')

  export default {
    props: ["phone"],
    data() {
      return {
        logDate: "",
        centerDialogVisible: false,
        appDialogVisible: false,
        fwDialogVisible: false,
        radio: "latest",
        disabled:true,
        inputVersion:"latest"
      };
    },
    methods: {
      close(){
        this.fwDialogVisible = false
        this.appDialogVisible = false
        this.inputVersion = "latest"
        this.radio = "latest"
        this.disabled = true
      },
      radioChange(value){
        if(value == "latest"){
          this.disabled = true
          this.inputVersion = "latest"
        }else if(value == "select"){
          this.disabled = false
          this.inputVersion = ""
        }
      },
      clickCycle() {
        axios.get(common.define.DEST + '/gateways/' + this.$route.params.id + '/request-cycle').then(
          this.$notify({
            title: 'Success',
            message: '주기보고 요청이 완료되었습니다.',
            type: 'success'
          })
        );
      },
      clickOpen() {
        axios.get(common.define.DEST + '/gateways/' + this.$route.params.id + '/request-open').then(
          this.$notify({
            title: 'Success',
            message: '개통 요청이 완료되었습니다.',
            type: 'success'
          })
        );
      },
      clickStop() {
        axios.get(common.define.DEST + '/gateways/' + this.$route.params.id + '/request-stop').then(
          this.$notify({
            title: 'Success',
            message: '응급상황 해제 요청이 완료되었습니다.',
            type: 'success'
          })
        );
      },
      clickReboot() {
        axios.get(common.define.DEST + '/gateways/' + this.$route.params.id + '/request-reboot').then(
          this.$notify({
            title: 'Success',
            message: '태블릿 재부팅 요청이 완료되었습니다.',
            type: 'success'
          })
        );
      },
      clickIndoor() {
        axios.get(common.define.DEST + '/gateways/' + this.$route.params.id + '/request-indoor').then(
          this.$notify({
            title: 'Success',
            message: '재실 요청이 완료되었습니다.',
            type: 'success'
          })
        );
      },
      clickAct() {
        axios.get(common.define.DEST + '/gateways/' + this.$route.params.id + '/request-act').then(
          this.$notify({
            title: 'Success',
            message: '활동보고 요청이 완료되었습니다.',
            type: 'success'
          })
        );
      },
      clickApp() {
        axios.get(common.define.DEST + '/gateways/'+this.$route.params.id+'/request-update/app/'+this.inputVersion).then(
          this.$notify({
            title: 'Success',
            message: 'App 업데이트 요청이 완료되었습니다.',
            type: 'success'
          })
        );
        this.appDialogVisible = false
      },
      clickFW() {
        axios.get(common.define.DEST + '/gateways/'+this.$route.params.id+'/request-update/fw/'+this.inputVersion).then(
          this.$notify({
            title: 'Success',
            message: 'FW 업데이트 요청이 완료되었습니다.',
            type: 'success'
          })
        );
        this.fwDialogVisible = false
      },
      requestLog() {
        this.centerDialogVisible = false

        //로그요청
        let params = {
          phone: this.$route.params.id,
          parameter: {
            startDate: this.logDate[0],
            endDate: this.logDate[1],
          }
        }
        this.postRequestLog(params)
        //로그요청

        alert("로그요청이 완료되었습니다.")
      },
      logRefresh() {
        this.getRequestLog(this.$route.params.id)
      },
      logDownload(index, row) {
        let url = define.DEST + "/open/v1/gateway/log/" + row.file_name
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
      this.logDate = moment().format("YYYY-MM-DD")
      this.getRequestLog(this.$route.params.id)
    },
    watch: {
      phone: function (newVal, oldVal) {
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
