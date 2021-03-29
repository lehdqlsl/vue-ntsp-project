<template>
  <card>
    <div class="row">
      <h4 class="card-title mb-3 col-lg-5">이벤트 목록</h4>
      <div class="col-lg-7 mt-1">
        <el-tooltip placement="top">
          <div slot="content">
            <span>테스트모드가 활성화되면 노드의 색이 <span style="color:#9c9c9e;font-weight: bold;font-size: 13px;">회색</span>으로 변경됩니다.</span>
          </div>
          <el-switch
            @change="toggleTestMode"
            style="display: block"
            v-model="isActiveTestMode"
            active-text="테스트모드"
            inactive-text="">
          </el-switch>
        </el-tooltip>
      </div>
    </div>

    <div style="max-height: 450px;overflow-y: auto;" @scroll="handleScroll">
      <span v-if="event.length == 0">
          <span>이벤트가 없습니다.</span>
        </span>
      <el-timeline
        v-loading="eventLoading">
        <el-timeline-item
          v-for="(item, index) in event"
          :key="index"
          :color="item.color"
          :type="item.type"
          :icon="item.icon"
          :size="item.size"
          :timestamp="item.regDate">
          {{item.eventType}}
          <p v-if="item.eventType=='119통화'">
            <span class="el-timeline-item__timestamp is-bottom" style="color: #409eff">통화 시작: {{item.data.start}}</span>
            <br>
            <span class="el-timeline-item__timestamp is-bottom" style="color: #409eff">통화 종료: {{item.data.end}}</span>
          </p>
        </el-timeline-item>
      </el-timeline>
    </div>
  </card>
</template>

<script>
  import {createNamespacedHelpers} from "vuex";

  const recipientHelper = createNamespacedHelpers('recipient')

  export default {
    name: "DeviceStatus",
    props: ["phone"],
    methods: {
      toggleTestMode(){

        if(this.isActiveTestMode) {
          //테스트모드 활성화
          this.offset = 0
          this.testEventList()
        }else{
          //테스트모드 비활성화
          this.offset = 0
          this.evnetList()
        }
      },
      handleScroll(event) {
        if(!this.isActiveTestMode){
          if ((event.target.offsetHeight + event.target.scrollTop) >= event.target.scrollHeight) {
            this.offset += 1
            this.evnetList()
          }
        }else{
          if ((event.target.offsetHeight + event.target.scrollTop) >= event.target.scrollHeight) {
            this.offset += 1
            this.testEventList()
          }
        }
      },
      testEventList(){
        let params = {
          param1: this.$route.params.id,
          param2: this.offset
        }
        this.getTestEventList(params)
      },
      evnetList() {
        let params = {
          param1: this.$route.params.id,
          param2: this.offset
        }
        this.getEventList2(params)
      },
      ...recipientHelper.mapActions([
        'getTestEventList',
        'getRefreshEventList',
        'getRefreshTestEventList',
        'getEventList2'
      ]),
    },
    data() {
      return {
        offset : 0,
        isActiveTestMode: false
      }
    },
    created() {
      this.evnetList()
    },
    mounted() {
      this.counterInterval = setInterval(() => {
        if(!this.isActiveTestMode){
          this.getRefreshEventList(this.$route.params.id)
        }else{
          this.getRefreshTestEventList(this.$route.params.id)
        }

      }, 5000)
    },
    beforeDestroy() {
      clearInterval(this.counterInterval)
    },
    computed: {
      ...recipientHelper.mapState({
        event: state => state.event,
        eventLoading: state => state.eventLoading
      }),
    },
    watch: {
      phone: function (newVal, oldVal) {
        //번호 바뀔때
        this.offset = 0
        this.evnetList()
      }
    }
  }
</script>

<style scoped>
  .list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
  }

  .list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active below version 2.1.8 */
  {
    opacity: 0;
    transform: translateY(-30px);
    background-color: rgba(43, 208, 31, 0.66);
  }

  .list-complete-leave-active {
    position: absolute;
  }

</style>
