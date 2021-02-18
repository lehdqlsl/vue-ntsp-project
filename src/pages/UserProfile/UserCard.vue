<template>
  <card class="card-user">
    <img slot="image" src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400" alt="..."/>
    <div class="author">
      <el-link type="primary" @click="changeInfo" v-if="!editable" style="font-size: 14px;position:absolute;right: 20px;margin-top: 75px;">수정하기</el-link>
      <el-link type="primary" @click="saveInfo" v-if="editable" style="font-size: 14px;position:absolute;right: 20px;margin-top: 75px;">수정완료</el-link>
        <img class="avatar border-gray" @click="openDialog = true" style="cursor:pointer;" :src="recipientInfo.image" alt="..."/>

        <h4 v-if="!editable" class="title" style="font-weight: bold;margin-top: 0px;">{{ recipientInfo.name }}<br/></h4>
        <el-input class="col-sm-4" v-if="editable" placeholder="이름" v-model="recipientInfo.name"></el-input><br>
    </div>
    <div class="" style="padding-left: 5px;padding-right: 5px;">
      <div class="row" v-if="!editable">
        <small class="col-sm-3">G/W 번호:</small><small class="col-sm-9">{{recipientInfo.phone}}</small>
      </div>
      <div class="row" style="margin-bottom: 5px;">
        <small class="col-sm-3">주소:</small>
        <small class="col-sm-9" v-if="!editable">{{recipientInfo.address1}}</small>
        <el-input class="col-sm-9" v-if="editable" placeholder="주소" v-model="recipientInfo.address1"></el-input>
        <small class="col-sm-3"></small>
        <small class="col-sm-9" v-if="!editable">{{recipientInfo.address2}}</small>
        <el-input class="col-sm-9" v-if="editable" placeholder="상세주소" v-model="recipientInfo.address2">{{recipientInfo.address2}}</el-input>
      </div>
      <div class="row" style="margin-bottom: 5px;">
        <small class="col-sm-3">전화번호:</small><a href="#"><small class="col-sm-9" v-if="!editable">{{recipientInfo.mobile}}</small></a>
        <el-input class="col-sm-9" v-if="editable" placeholder="010-1234-1234" v-model="recipientInfo.mobile"></el-input>
      </div>
      <div class="row" style="margin-bottom: 5px;">
        <small class="col-sm-3">생년월일:</small><small v-if="!editable" class="col-sm-9">{{recipientInfo.birth}}</small>
        <el-input class="col-sm-9" v-if="editable" placeholder="1993-03-19" v-model="recipientInfo.birth"></el-input>
      </div>
      <div class="row">
        <small class="col-sm-3">성별:</small><small class="col-sm-9">남자</small>
      </div>
    </div>

    <!--<div slot="footer" class="text-center justify-content-center">
      <h4 class="d-inline mr-1" style="font-size: 19px;"><b-badge pill variant="success">정상</b-badge></h4>
      <h4 class="d-inline mr-1" style="font-size: 19px;"><b-badge pill variant="success">외출</b-badge></h4>
      <h4 class="d-inline mr-1" style="font-size: 19px;"><b-badge pill variant="info" style="background-color: #ffed00;color: #000000">미감지 (주의)</b-badge></h4>
      <h4 class="d-inline mr-1" style="font-size: 19px;"><b-badge pill variant="warning">미감지 (경고)</b-badge></h4>
      <h4 class="d-inline mr-1" style="font-size: 19px;"><b-badge pill variant="danger" >미감지 (위험)</b-badge></h4>
      <h4 class="d-inline mr-1" style="font-size: 19px;"><b-badge pill variant="danger" >화재발생</b-badge></h4>
      <h4 class="d-inline mr-1" style="font-size: 19px;"><b-badge pill variant="danger" >응급호출</b-badge></h4>
      <h4 class="d-inline mr-1" style="font-size: 19px;"><b-badge pill variant="danger" >센서불량</b-badge></h4>
      <h4 class="d-inline mr-1" style="font-size: 19px;"><b-badge pill variant="danger" >게이트웨이불량</b-badge></h4>
    </div>-->

    <el-dialog
      title="프로필 사진"
      :visible.sync="openDialog"
      width="20%"
      center>
      <div class="block">
        <b-form-file
          accept="image/jpg, image/png, image/jpeg"
          v-model="file1"
          :state="Boolean(file1)"
          placeholder="선택된 파일 없음"
          no-drop
        ></b-form-file>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpload">업로드</el-button>
        <el-button @click="openDialog = false">취소</el-button>
      </span>
    </el-dialog>
  </card>


</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import common from 'src/store/common'
  import {createNamespacedHelpers} from "vuex";

  const recipientHelper = createNamespacedHelpers('recipient')

  export default {
    components: {
      Card
    },
    props: ['phone'],
    data () {
      return {
        file1: null,
        details: [
          {
            title: '12',
            subTitle: 'Files'
          },
          {
            title: '2GB',
            subTitle: 'Used'
          },
          {
            title: '24,6$',
            subTitle: 'Spent'
          }
        ],
        openDialog: false,
        editable: false,
        userInfo: {
          address1:"",
          address2:"",
          mobile:"",
          birth:"",
          name:"",
          phone:"",
          image:""
        }
      }
    },
    created() {
      this.getRecipientInfo(this.$route.params.id)
    },
    methods: {
      submitUpload() {
        // 파일 크기 제한
        if(this.file1.size/1024/1024 > 3){
          alert("3M 이하 파일만 업로드 가능합니다.")
          return
        }

        // 파일 업로드
        let formData = new FormData()
        formData.append('phone', this.$route.params.id)
        formData.append('file', this.file1)
        this.postImageUpload(formData)

        // 다이얼로그 닫기
        this.openDialog = false
      },
      ...recipientHelper.mapActions([
        'postRecipient',
        'getRecipientInfo',
        'postImageUpload'
      ]),
      getClasses (index) {
        var remainder = index % 3
        if (remainder === 0) {
          return 'col-md-3 col-md-offset-1'
        } else if (remainder === 2) {
          return 'col-md-4'
        } else {
          return 'col-md-3'
        }
      },
      changeInfo(){
        this.editable = true
      },
      saveInfo(){
        this.recipientInfo.phone = this.$route.params.id
        this.postRecipient(this.recipientInfo)
        this.editable = false
      }
    },
    computed: {
      ...recipientHelper.mapState({
        recipientInfo: state => state.recipientInfo
      }),
    },
    watch: {
      phone: function(newVal, oldVal) {
        this.getRecipientInfo(newVal)
      }
    }
  }

</script>
<style scoped>
small{
  font-weight: bold;
}
</style>
