<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-6">
        </div>
        <div class="col-xl-12">
          <card>
            <h4 class="card-title" style="margin-bottom: 10px;"></h4>
            <div style="margin-bottom: 10px">
              <el-row>
                <el-col :offset="0" :span="4">
                  <el-button @click="openDialog = true">신규 공지</el-button>
                </el-col>
              </el-row>
            </div>

            <data-tables :data="noticeList" :page-size="10" :pagination-props="{'pageSizes': [10,20,50]}">
              <el-table-column
                prop="title"
                label="제목">
              </el-table-column>
              <el-table-column
                prop="content"
                label="내용">
              </el-table-column>
              <el-table-column
                prop="type"
                label="전송타입"
                width="200"
                align="center"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.type == 0" style="color:#05AE0E;">일반</span>
                  <span v-if="scope.row.type == 1" style="color:#EE2D20;">긴급</span>
                </template>
              </el-table-column>
              <el-table-column
                width="250"
                prop="regdate"
                align="center"
                label="공지날짜">
              </el-table-column>
              <el-table-column
                width="200"
                align="center"
                label="버튼">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">재공지
                  </el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">삭제
                  </el-button>
                </template>
              </el-table-column>
            </data-tables>
            <el-dialog
              title="공지사항 작성"
              :visible.sync="openDialog"
              width="25%"
              center>
              <el-input
                type="text"
                placeholder="제목"
                v-model="title"
                maxlength="50"
                show-word-limit
              >
              </el-input>
              <div style="margin: 20px 0;"></div>
              <el-input
                type="textarea"
                placeholder="내용"
                v-model="content"
                maxlength="200"
                show-word-limit
              >
              </el-input>
              <div style="margin: 20px 0;"></div>
              <el-radio v-model="type" label="0">일반</el-radio>
              <el-radio v-model="type" label="1">긴급</el-radio>
              <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="sendNotice">전송</el-button>
                  <el-button @click="openDialog = false">취소</el-button>
              </span>
            </el-dialog>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import RecipientList from "../components/UserDetail/RecipientList";
  import {createNamespacedHelpers} from "vuex";

  const recipientHelper = createNamespacedHelpers('recipient')

  export default {
    name: "NoticeList",
    components: {
      RecipientList,
    },
    data() {
      return {
        type:'0',
        title:"",
        content:"",
        openDialog: false,
        inputData: "",
        placeholder: "",
        select_option1: "",
        select_option2: "3",
        radio: "1",
        render: true,
        show: false,
        selectedRow: ""
      }
    },
    methods: {
      ...
        recipientHelper.mapActions([
          'getNoticeList',
          'postNotice',
          'deleteNotice'
        ]),
      sendNotice(){
        let param = {
          type: this.type,
          title: this.title,
          content: this.content
        }
        this.openDialog = false;

        this.postNotice(param)

        this.type = "0"
        this.title = ""
        this.content = ""

        location.reload()
      },
      handleEdit(index, row){
        let param = {
          type: row.type,
          title: row.title,
          content: row.content
        }

        this.postNotice(param)

        this.type = "0"
        this.title = ""
        this.content = ""

      },
      handleDelete(index, row){

        this.deleteNotice(row.seq)
      }
    },
    created() {
      let param = {
        type: 2
      }
      this.getNoticeList(param)
    }
    ,
    mounted() {

    },
    computed: {
      ...
        recipientHelper.mapState({
          noticeList: state => state.noticeList
        }),
    }
  }
</script>

<style scoped>
  .sc-table .action-list {
    text-align: left;
  }
</style>
