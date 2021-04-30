<template>
  <div>
    <div class="row">
      <div class="col-sm-6">
        <hr>
        <div class="row">
          <div class="col-sm-5 pl-4" style="align-self: center;">
              <label style="color: #8492a6;font-size: 0.9rem;">장비 점검 설정</label>
          </div>
          <div class="col-sm-6">
            <el-radio-group @change="radioChange" v-model="gatewayStatus">
              <el-radio :label="0" style="margin-bottom: 0px;">해제</el-radio>
              <el-radio :label="1" style="margin-bottom: 0px;">점검</el-radio>
            </el-radio-group>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-5 pl-4" style="align-self: center;">
            <label style="color: #8492a6;font-size: 0.9rem;">데이터 삭제</label>
          </div>
          <div class="col-sm-5">
            <el-button icon="el-icon-delete" @click="deleteGateway" size="mini" type="danger">삭제</el-button>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-5 pl-4" style="align-self: center;">
            <label style="color: #8492a6;font-size: 0.9rem;">전화번호 목록</label>
          </div>
          <div class="col-sm-5">
            <el-button icon="el-icon-phone" @click="openNumbersDialog" size="mini" type="">수정</el-button>
          </div>
        </div>
        <hr>
      </div>
      <div class="col-sm-6" style="padding:20px;">

      </div>
    </div>

    <el-dialog
      title="전화번호 목록"
      :visible.sync="numbersDialogVisible"
      width="40%"
      center>
      <div class="block">
        <div slot="header" class="">

        </div>
        <hr>
        <div class="row">
          <div class="col-sm-6" style="border-right: 1px solid rgba(0, 0, 0, 0.2);">
            <div class="row">
              <div class="col-sm-4" style="align-self: center;text-align: right;">
                <label style="color: #8492a6;font-size: 0.9rem;">119</label>
              </div>
              <div class="col-sm-5">
                <el-input size="mini" v-model="numbersList._119"></el-input>
              </div>
              <div class="col-sm-3">
                <el-button size="mini" @click="setNumbers('_119',numbersList._119)" type="">수정</el-button>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="row">
              <div class="col-sm-4" style="align-self: center;text-align: right;">
                <label style="color: #8492a6;font-size: 0.9rem;">응급관리요원</label>
              </div>
              <div class="col-sm-5">
                <el-input size="mini" v-model="numbersList.helper"></el-input>
              </div>
              <div class="col-sm-3">
                <el-button size="mini" @click="setNumbers('helper',numbersList.helper)" type="">수정</el-button>
              </div>
            </div>
          </div>
        </div>

        <hr>
        <div class="row">
          <div class="col-sm-6" style="border-right: 1px solid rgba(0, 0, 0, 0.2);">
            <div class="row">
              <div class="col-sm-4" style="align-self: center;text-align: right;">
                <label style="color: #8492a6;font-size: 0.9rem;">지역센터</label>
              </div>
              <div class="col-sm-5">
                <el-input size="mini" v-model="numbersList.center"></el-input>
              </div>
              <div class="col-sm-3">
                <el-button size="mini" @click="setNumbers('center',numbersList.center)" type="">수정</el-button>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="row">
              <div class="col-sm-4" style="align-self: center;text-align: right;">
                <label style="color: #8492a6;font-size: 0.9rem;">말벗</label>
              </div>
              <div class="col-sm-5">
                <el-input size="mini" v-model="numbersList.care1"></el-input>
              </div>
              <div class="col-sm-3">
                <el-button size="mini" @click="setNumbers('care1',numbersList.care1)" type="">수정</el-button>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-6" style="border-right: 1px solid rgba(0, 0, 0, 0.2);">
            <div class="row">
              <div class="col-sm-4" style="align-self: center;text-align: right;">
                <label style="color: #8492a6;font-size: 0.9rem;">보호자</label>
              </div>
              <div class="col-sm-5">
                <el-input size="mini" v-model="numbersList.care2"></el-input>
              </div>
              <div class="col-sm-3">
                <el-button size="mini" @click="setNumbers('care2',numbersList.care2)" type="">수정</el-button>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="row">
              <div class="col-sm-4" style="align-self: center;text-align: right;">
                <label style="color: #8492a6;font-size: 0.9rem;">기타</label>
              </div>
              <div class="col-sm-5">
                <el-input size="mini" v-model="numbersList.etc1"></el-input>
              </div>
              <div class="col-sm-3">
                <el-button size="mini" @click="setNumbers('etc1',numbersList.etc1)" type="">수정</el-button>
              </div>
            </div>
          </div>
        </div>

        <hr>
        <div class="row">
          <div class="col-sm-6" style="border-right: 1px solid rgba(0, 0, 0, 0.2);">
            <div class="row">
              <div class="col-sm-4" style="align-self: center;text-align: right;">
                <label style="color: #8492a6;font-size: 0.9rem;">기타</label>
              </div>
              <div class="col-sm-5">
                <el-input size="mini" v-model="numbersList.etc2"></el-input>
              </div>
              <div class="col-sm-3">
                <el-button size="mini" @click="setNumbers('etc2',numbersList.etc2)" type="">수정</el-button>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="row">
              <div class="col-sm-4" style="align-self: center;text-align: right;">
                <label style="color: #8492a6;font-size: 0.9rem;">기타</label>
              </div>
              <div class="col-sm-5">
                <el-input size="mini" v-model="numbersList.etc3"></el-input>
              </div>
              <div class="col-sm-3">
                <el-button size="mini" @click="setNumbers('etc3',numbersList.etc3)" type="">수정</el-button>
              </div>
            </div>
          </div>
        </div>

        <hr>
        <div class="row">
          <div class="col-sm-6" style="border-right: 1px solid rgba(0, 0, 0, 0.2);">
            <div class="row">
              <div class="col-sm-4" style="align-self: center;text-align: right;">
                <label style="color: #8492a6;font-size: 0.9rem;">기타</label>
              </div>
              <div class="col-sm-5">
                <el-input size="mini" v-model="numbersList.etc4"></el-input>
              </div>
              <div class="col-sm-3">
                <el-button size="mini" @click="setNumbers('etc4',numbersList.etc4)" type="">수정</el-button>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="row">
              <div class="col-sm-4" style="align-self: center;text-align: right;">
                <label style="color: #8492a6;font-size: 0.9rem;">기타</label>
              </div>
              <div class="col-sm-5">
                <el-input size="mini" v-model="numbersList.etc5"></el-input>
              </div>
              <div class="col-sm-3">
                <el-button size="mini" @click="setNumbers('etc5',numbersList.etc5)" type="">수정</el-button>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-6" style="border-right: 1px solid rgba(0, 0, 0, 0.2);">
            <div class="row">
              <div class="col-sm-4" style="align-self: center;text-align: right;">
                <label style="color: #8492a6;font-size: 0.9rem;">기타</label>
              </div>
              <div class="col-sm-5">
                <el-input size="mini" v-model="numbersList.etc6"></el-input>
              </div>
              <div class="col-sm-3">
                <el-button size="mini" @click="setNumbers('etc6',numbersList.etc6)" type="">수정</el-button>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="row">
              <div class="col-sm-4" style="align-self: center;text-align: right;">
                <label style="color: #8492a6;font-size: 0.9rem;">기타</label>
              </div>
              <div class="col-sm-5">
                <el-input size="mini" v-model="numbersList.etc7"></el-input>
              </div>
              <div class="col-sm-3">
                <el-button size="mini" @click="setNumbers('etc7',numbersList.etc7)" type="">수정</el-button>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-6" style="border-right: 1px solid rgba(0, 0, 0, 0.2);">
            <div class="row">
              <div class="col-sm-4" style="align-self: center;text-align: right;">
                <label style="color: #8492a6;font-size: 0.9rem;">기타</label>
              </div>
              <div class="col-sm-5">
                <el-input size="mini" v-model="numbersList.etc8"></el-input>
              </div>
              <div class="col-sm-3">
                <el-button size="mini" @click="setNumbers('etc8',numbersList.etc8)" type="">수정</el-button>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="row">
              <div class="col-sm-4" style="align-self: center;text-align: right;">
                <label style="color: #8492a6;font-size: 0.9rem;">기타</label>
              </div>
              <div class="col-sm-5">
                <el-input size="mini" v-model="numbersList.etc9"></el-input>
              </div>
              <div class="col-sm-3">
                <el-button size="mini" @click="setNumbers('etc9',numbersList.etc9)" type="">수정</el-button>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-6">
            <div class="row">
              <div class="col-sm-4" style="align-self: center;text-align: right;">
                <label style="color: #8492a6;font-size: 0.9rem;">기타</label>
              </div>
              <div class="col-sm-5">
                <el-input size="mini" v-model="numbersList.etc10"></el-input>
              </div>
              <div class="col-sm-3">
                <el-button size="mini" @click="setNumbers('etc10',numbersList.etc10)" type="">수정</el-button>
              </div>
            </div>
          </div>
        </div>


      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="numbersDialogVisible = false">닫기</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from "vuex";
  import axios from 'axios'
  import common from "../../store/common";

  const recipientHelper = createNamespacedHelpers('recipient')

  export default {
    props: ["phone"],
    data() {
      return {
        gatewayStatus: '',
        numbersDialogVisible: false,
        numbers: {
          phone: this.phone,
          _119 : "",
          care1 : "",
          care2: "",
          center: "",
          helper: "",
          etc1: "",
          etc2: "",
          etc3: "",
          etc4: "",
          etc5: "",
          etc6: "",
          etc7: "",
          etc8: "",
          etc9: "",
          etc10: "",
        }
      };
    },
    methods: {
      setNumbers(type,number){
        axios.put(common.define.DEST + '/open/v1/gateways/' + this.$route.params.id + '/number',
          {
              type: type,
              number: number

          }).then((Response)=>{
          this.$notify({
            title: 'Success',
            message: '수정 완료되었습니다.',
            type: 'success'
          })
        });
      },
      openNumbersDialog(){
        this.numbersDialogVisible = true
      },
      deleteGateway(){
        this.$confirm('게이트웨이 및 대상자정보를 삭제합니다.', '삭제', {
          cancelButtonText: '취소',
          confirmButtonText: '확인',
          type: 'warning'
        }).then(() => {
          axios.delete(common.define.DEST + '/gateways/' + this.$route.params.id).then((Response)=>{
            location.reload()
          });
        }).catch(() => {

        });
      },
      radioChange(value) {
        if (value == 1) {
          this.$confirm('게이트웨이를 "점검" 상태로 변경하시겠습니까?', '상태 변경', {
            cancelButtonText: '취소',
            confirmButtonText: '확인',
            type: 'info'
          }).then(() => {
            axios.put(common.define.DEST + '/gateways/' + this.$route.params.id + '/change-status', {
              status : value
            }).then((Response)=>{
                location.reload()
            });
          }).catch(() => {
            this.gatewayStatus = 0
          });
        } else if (value == 0) {
          this.$confirm('"점검" 상태를 해제하겠습니까?', '상태 변경', {
            cancelButtonText: '취소',
            confirmButtonText: '확인',
            type: 'info'
          }).then(() => {
            axios.put(common.define.DEST + '/gateways/' + this.$route.params.id + '/change-status', {
              status : value
            }).then((Response)=>{
              location.reload()
            });
          }).catch(() => {
            this.gatewayStatus = 1
          });

        }
      },
      clickCycle() {

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
      requestLog() {

      },
      logRefresh() {

      },
      logDownload(index, row) {

      },
      ...recipientHelper.mapActions([
        'getNumbers'
      ]),
    },
    computed: {
      ...recipientHelper.mapState({
        recipientInfo: state => state.recipientInfo,
        numbersList: state => state.numbersList
      }),
    },
    created() {
      let status = this.recipientInfo.gateway_status
      switch (status) {
        case 0:
        case 1:
        case 2:
          this.gatewayStatus = 0
          break;

        case 3:
          this.gatewayStatus = 1
          break;
      }
      this.getNumbers(this.$route.params.id)
    },
    watch: {
      phone: function (newVal, oldVal) {

      }
    }
  };
</script>

<style scoped>
  label {
    margin-bottom: 0px;
  }

  td:last-child {

  }

  th:last-child {

  }
</style>
