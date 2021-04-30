<template>
  <div>
    <div class="row">
      <div class="col-sm-6" style="">
        <hr>
        <div class="row">
            <div class="col-sm-4 pl-4" style="align-self: center;">
              <label style="color: #8492a6;font-size: 0.9rem;">역점검</label>
            </div>
            <div class="col-sm-7">
              <div class="row">
                <el-button class="col-sm-5" size="small" @click="clickCycle">주기보고</el-button>
                <el-button class="col-sm-5" size="small" @click="clickOpen">원격개통</el-button>
              </div>
            </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-4 pl-4" style="align-self: center;">
            <label style="color: #8492a6;font-size: 0.9rem;">로그</label>
          </div>
          <div class="col-sm-7">
            <div class="row">
              <el-button class="col-sm-5" size="small" @click="centerDialogVisible = true">로그요청</el-button>
              <!--<el-button class="col-sm-5" size="small" plain type="primary" @click="logDialogVisible = true, logRefresh2()">로그 다운로드</el-button>-->
              <el-button size="small" type="success"  icon="el-icon-download" circle @click="logDialogVisible = true, logRefresh2()"></el-button>
            </div>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-4 pl-4" style="align-self: center;">
            <label style="color: #8492a6;font-size: 0.9rem;">업데이트</label>
          </div>
          <div class="col-sm-7">
            <div class="row">
              <el-button size="small" @click="appDialogVisible = true" class="col-sm-5">G/W 업데이트</el-button>
              <el-button size="small" @click="fwDialogVisible = true" class="col-sm-5">F/W 업데이트</el-button>
            </div>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-4 pl-4" style="align-self: center;">
            <label style="color: #8492a6;font-size: 0.9rem;">설정변경</label>
          </div>
          <div class="col-sm-7">
            <div class="row mb-2">
              <el-button size="small" @click="changeDialogVisible = true, inactiveDialog = true" class="col-sm-5">미감지 변경</el-button>
              <el-button size="small" @click="changeDialogVisible = true, cycleDialog = true" class="col-sm-5">주기보고 변경</el-button>
            </div>
            <div class="row">
              <el-button size="small" @click="changeModeDialogVisible = true" class="col-sm-5">시스템 모드 변경</el-button>
              <el-button size="small" @click="changeSensorCycleDialogVisible = true" class="col-sm-5">센서 주기 변경</el-button>
            </div>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-4 pl-4" style="align-self: center;">
            <label style="color: #8492a6;font-size: 0.9rem;">이벤트보고</label>
          </div>
          <div class="col-sm-7">
            <div class="row">
              <el-button size="small" @click="clickIndoor" class="col-sm-5">재실보고</el-button>
              <el-button size="small" @click="clickAct" class="col-sm-5">활동보고</el-button>
            </div>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-4 pl-4" style="align-self: center;">
            <label style="color: #8492a6;font-size: 0.9rem;">기타</label>
          </div>
          <div class="col-sm-7">
            <div class="row">
              <el-button size="small" @click="clickStop" class="col-sm-5">응급상황 해제</el-button>
              <el-button size="small" @click="clickReboot" class="col-sm-5">테블릿 재부팅</el-button>
            </div>
          </div>
        </div>
        <hr>
      </div>

      <div class="col-sm-6">
        <div slot="header" class="clearfix">
          <el-button style="float: left; padding: 3px 0" type="text" @click="logRefresh">새로 고침</el-button>
        </div>
        <el-table
          :default-sort="{prop: 'svRegDate', order: 'descending'}"
          :data="remoteList"
          :max-height="385"
          style="width: 100%;">
          <el-table-column
            width="100"
            align="center"
            prop="userName"
            label="요청자">
          </el-table-column>
          <el-table-column
            width="140"
            align="center"
            prop="remoteType"
            label="요청타입">
            <template slot-scope="scope">
              <span v-if="scope.row.remoteType == 'GW_UPDATE'">G/W 업데이트</span>
              <span v-else-if="scope.row.remoteType == 'LOG'">로그요청</span>
              <span v-else-if="scope.row.remoteType == 'CYCLE'">원격 주기보고</span>
              <span v-else-if="scope.row.remoteType == 'OPEN'">원격 개통</span>
              <span v-else-if="scope.row.remoteType == 'CLEAR'">응급상황 해제</span>
              <span v-else-if="scope.row.remoteType == 'REBOOT'">태블릿 재부팅</span>
              <span v-else-if="scope.row.remoteType == 'INDOOR'">재실보고</span>
              <span v-else-if="scope.row.remoteType == 'ACTIVITY'">활동보고</span>
              <span v-else-if="scope.row.remoteType == 'FW_UPDATE'">F/W 업데이트</span>
              <span v-else-if="scope.row.remoteType == 'CHANGE_INACTIVE'">미감지 시간 변경</span>
              <span v-else-if="scope.row.remoteType == 'CHANGE_CYCLE'">주기보고 주기 변경</span>
              <span v-else>{{ scope.row.remoteType }}</span>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            width="190"
            prop="svRegDate"
            align="center"
            label="요청날짜">
          </el-table-column>
          <el-table-column
            width="110"
            prop="received"
            align="center"
            label="송신여부">
            <template slot-scope="scope">
              <span v-if="scope.row.received == false" style="color: #F56C6C">미송신</span>
              <span v-if="scope.row.received == true" style="color:rgb(10, 185, 97);">송신완료</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog
      title="로그 다운로드"
      :visible.sync="logDialogVisible"
      width="50%"
      center>
      <div class="block">
        <div slot="header" class="clearfix">
          <el-button style="float: left; padding: 3px 0" type="text" @click="logRefresh2">새로 고침</el-button>
        </div>
        <el-table
          :default-sort="{prop: 'regDate', order: 'descending'}"
          :data="logList"
          :max-height="500"
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="logDialogVisible = false">닫기</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="시간 변경"
      :visible.sync="changeDialogVisible"
      width="20%"
      center>
      <div class="block">
        <span class="demonstration" style="font-size: 1.0rem;">시간 선택</span>
        <el-select v-model="timeValue" placeholder="선택">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="inactiveDialog" type="primary" @click="requestInactive">요청(미감지)</el-button>
        <el-button v-if="cycleDialog" type="primary" @click="requestCycle">요청(주기보고)</el-button>
        <el-button @click="changeDialogVisible = false, cycleDialog = false, inactiveDialog = false">취소</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="시스템 모드 변경"
      :visible.sync="changeModeDialogVisible"
      width="20%"
      center>
      <div class="block">
        <span class="demonstration" style="font-size: 1.0rem;">모드 선택</span>
        <el-select v-model="modeValue" placeholder="선택">
          <el-option
            v-for="item in systemOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="clickMode">요청</el-button>
        <el-button @click="changeModeDialogVisible = false">취소</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="센서 주기 변경"
      :visible.sync="changeSensorCycleDialogVisible"
      width="25%"
      center>
      <div class="block">
        <span class="col-sm-6">센서 선택</span>
        <el-select  v-model="sensorCycleParam.devType" placeholder="선택">
          <el-option
            v-for="item in devTypeOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <br>
        <br>
        <span class="col-sm-6">변경 시간(분)</span>
          <el-input-number v-if="sensorCycleParam.devType==2 || sensorCycleParam.devType==3" v-model="sensorCycleParam.time" :min="1" :max="10"></el-input-number>
          <el-input-number v-if="sensorCycleParam.devType==4" v-model="sensorCycleParam.time" :min="5" :max="20"></el-input-number>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="clickSensorCycle">요청</el-button>
        <el-button @click="changeSensorCycleDialogVisible = false">취소</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="로그요청"
      :visible.sync="centerDialogVisible"
      width="20%"
      center>
      <div class="block">
        <span class="demonstration" style="font-size: 1.0rem;">날짜 선택</span>
        <el-date-picker
          style="width: 100%;"
          :picker-options="pickerOptions"
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
        systemOptions: [{
          value: 'dev',
          label: '응급안전안심서비스 1차'
        }, {
          value: 'sn',
          label: '성남실증'
        }],
        devTypeOption: [{
          value: '2',
          label: '활동감지(기본:5분)'
        }, {
          value: '3',
          label: '레이더감지(기본:5분)'
        }, {
          value: '4',
          label: '온도/습도/조도(기본:10분)'
        },],
        options: [{
          value: '30',
          label: '30분'
        }, {
          value: '60',
          label: '1시간'
        }, {
          value: '120',
          label: '2시간'
        }, {
          value: '180',
          label: '3시간'
        }, {
          value: '240',
          label: '4시간'
        }],
        timeValue: '',
        modeValue: '',
        logDate: "",
        changeModeDialogVisible: false,
        changeDialogVisible: false,
        centerDialogVisible: false,
        inactiveDialog: false,
        cycleDialog: false,
        centerDialog: false,
        appDialogVisible: false,
        fwDialogVisible: false,
        logDialogVisible: false,
        changeSensorCycleDialogVisible: false,
        radio: "latest",
        disabled: true,
        inputVersion: "latest",
        sensorCycleParam: {
          devType:'2',
          time:'5'
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        }
      };
    },
    methods: {
      clickSensorCycle(){
        let userId = this.$session.get('id')
        let parameter = {
          userId: userId
        }
        axios.post(common.define.DEST + '/gateways/' + this.$route.params.id + '/request-sensor-cycle/' + this.sensorCycleParam.devType + '/'+ this.sensorCycleParam.time, parameter).then(
          this.$notify({
            title: 'Success',
            message: '센서 감지 시간 변경 요청이 완료되었습니다.',
            type: 'success'
          })
        );
        this.changeSensorCycleDialogVisible = false
      },
      close() {
        this.fwDialogVisible = false
        this.appDialogVisible = false
        this.inputVersion = "latest"
        this.radio = "latest"
        this.disabled = true
      },
      radioChange(value) {
        if (value == "latest") {
          this.disabled = true
          this.inputVersion = "latest"
        } else if (value == "select") {
          this.disabled = false
          this.inputVersion = ""
        }
      },
      requestInactive() {
        if (this.timeValue == '') {
          alert("시간을 선택해주세요.")
        } else {
          let userId = this.$session.get('id')
          let parameter = {
            userId: userId
          }
          axios.post(common.define.DEST + '/gateways/' + this.$route.params.id + '/change-inactive/' + this.timeValue, parameter).then(
            this.$notify({
              title: 'Success',
              message: '미감지 시간 변경 요청이 완료되었습니다.',
              type: 'success'
            })
          );
          this.changeDialogVisible = false
          this.cycleDialog = false
          this.inactiveDialog = false
          this.timeValue = ''
        }
      },
      requestCycle() {
        if (this.timeValue == '') {
          alert("시간을 선택해주세요.")
        } else {
          let userId = this.$session.get('id')
          let parameter = {
            userId: userId
          }
          axios.post(common.define.DEST + '/gateways/' + this.$route.params.id + '/change-cycle/' + this.timeValue, parameter).then(
            this.$notify({
              title: 'Success',
              message: '주기보고 시간 변경 요청이 완료되었습니다.',
              type: 'success'
            })
          );
          this.changeDialogVisible = false
          this.cycleDialog = false
          this.inactiveDialog = false
          this.timeValue = ''
        }
      },
      clickCycle() {
        let userId = this.$session.get('id')
        let parameter = {
          userId: userId
        }
        axios.post(common.define.DEST + '/gateways/' + this.$route.params.id + '/request-cycle', parameter).then(
          this.$notify({
            title: 'Success',
            message: '주기보고 요청이 완료되었습니다.',
            type: 'success'
          })
        );
      },
      clickOpen() {
        let userId = this.$session.get('id')
        let parameter = {
          userId: userId
        }
        axios.post(common.define.DEST + '/gateways/' + this.$route.params.id + '/request-open', parameter).then(
          this.$notify({
            title: 'Success',
            message: '개통 요청이 완료되었습니다.',
            type: 'success'
          })
        );
      },
      clickStop() {
        let userId = this.$session.get('id')
        let parameter = {
          userId: userId
        }
        axios.post(common.define.DEST + '/gateways/' + this.$route.params.id + '/request-stop', parameter).then(
          this.$notify({
            title: 'Success',
            message: '응급상황 해제 요청이 완료되었습니다.',
            type: 'success'
          })
        );
      },
      clickReboot() {
        let userId = this.$session.get('id')
        let parameter = {
          userId: userId
        }
        axios.post(common.define.DEST + '/gateways/' + this.$route.params.id + '/request-reboot', parameter).then(
          this.$notify({
            title: 'Success',
            message: '태블릿 재부팅 요청이 완료되었습니다.',
            type: 'success'
          })
        );
      },
      clickIndoor() {
        let userId = this.$session.get('id')
        let parameter = {
          userId: userId
        }
        axios.post(common.define.DEST + '/gateways/' + this.$route.params.id + '/request-indoor', parameter).then(
          this.$notify({
            title: 'Success',
            message: '재실 요청이 완료되었습니다.',
            type: 'success'
          })
        );
      },
      clickAct() {
        let userId = this.$session.get('id')
        let parameter = {
          userId: userId
        }
        axios.post(common.define.DEST + '/gateways/' + this.$route.params.id + '/request-act', parameter).then(
          this.$notify({
            title: 'Success',
            message: '활동보고 요청이 완료되었습니다.',
            type: 'success'
          })
        );
      },
      clickApp() {
        let userId = this.$session.get('id')
        let parameter = {
          userId: userId
        }
        axios.post(common.define.DEST + '/gateways/' + this.$route.params.id + '/request-update/app/' + this.inputVersion, parameter).then(
          this.$notify({
            title: 'Success',
            message: 'App 업데이트 요청이 완료되었습니다.',
            type: 'success'
          })
        );
        this.appDialogVisible = false
      },
      clickFW() {
        let userId = this.$session.get('id')
        let parameter = {
          userId: userId
        }
        axios.post(common.define.DEST + '/gateways/' + this.$route.params.id + '/request-update/fw/' + this.inputVersion, parameter).then(
          this.$notify({
            title: 'Success',
            message: 'FW 업데이트 요청이 완료되었습니다.',
            type: 'success'
          })
        );
        this.fwDialogVisible = false
      },
      clickMode() {
        let userId = this.$session.get('id')
        let parameter = {
          userId: userId
        }
        axios.post(common.define.DEST + '/gateways/' + this.$route.params.id + '/change-mode/' + this.modeValue, parameter).then(
          this.$notify({
            title: 'Success',
            message: '시스템 모드 변경 요청이 완료되었습니다.',
            type: 'success'
          })
        );
        this.changeModeDialogVisible = false
      },
      requestLog() {
        this.centerDialogVisible = false
        let userId = this.$session.get('id')
        //로그요청
        let params = {
          phone: this.$route.params.id,
          parameter: {
            startDate: this.logDate[0],
            endDate: this.logDate[1],
            userId: userId
          }
        }
        this.postRequestLog(params)
        //로그요청

        alert("로그요청이 완료되었습니다.")
      },
      logRefresh2() {
        this.getRequestLog(this.$route.params.id)
      },
      logRefresh() {
        this.getRequestHistory(this.$route.params.id)
      },
      logDownload(index, row) {
        let url = define.DEST + "/open/v1/gateway/log/" + row.file_name
        window.open(url);
      },
      ...recipientHelper.mapActions([
        'postRequestLog',
        'getRequestLog',
        'getRequestHistory',
      ]),
    },
    computed: {
      ...recipientHelper.mapState({
        logList: state => state.logList,
        remoteList: state => state.remoteList
      }),
    },
    created() {
      this.logDate = moment().format("YYYY-MM-DD")
      this.getRequestLog(this.$route.params.id)
      this.getRequestHistory(this.$route.params.id)
    },
    watch: {
      phone: function (newVal, oldVal) {
        this.getRequestHistory(newVal)
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
