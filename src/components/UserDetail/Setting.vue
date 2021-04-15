<template>
  <div>
    <div class="row">
      <div class="col-sm-6" style="padding:20px;">
        <div class="row" style="align-items: center;">
          <span class="col-sm-3">장비 점검 설정</span>
          <div class="col-sm-5">
            <el-radio-group @change="radioChange" v-model="gatewayStatus">
              <el-radio :label="0" style="margin-bottom: 0px;">해제</el-radio>
              <el-radio :label="1" style="margin-bottom: 0px;">점검</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="row mt-5">
          <span class="col-sm-3">데이터 삭제</span>
          <div class="col-sm-5">
              <el-button icon="el-icon-delete" @click="deleteGateway" size="mini" type="danger">삭제</el-button>
          </div>
        </div>
      </div>

      <div class="col-sm-6">

      </div>
    </div>
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
        gatewayStatus: ''
      };
    },
    methods: {
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
      ...recipientHelper.mapActions([]),
    },
    computed: {
      ...recipientHelper.mapState({
        recipientInfo: state => state.recipientInfo
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
    },
    watch: {
      phone: function (newVal, oldVal) {

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
