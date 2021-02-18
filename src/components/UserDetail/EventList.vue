<template>
  <card>
    <h4 class="card-title mb-3">이벤트 목록</h4>
    <div style="max-height: 450px;overflow-y: auto;" @scroll="handleScroll">

      <!--      <b-list-group style="text-align: center;">
              &lt;!&ndash;<transition-group name="list-complete" tag="p">&ndash;&gt;
              <b-list-group-item v-for="(item, index) in event" v-bind:class="{ 'list-group-item-danger': item.danger, 'list-group-item-warning': item.warning, 'list-group-item-info': item.info }">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{{ item.eventType }}</h5>
                  <small>{{ item.regDate }}</small>
                </div>
              </b-list-group-item>
            </b-list-group>-->

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
      handleScroll(event) {
        if ((event.target.offsetHeight + event.target.scrollTop) >= event.target.scrollHeight) {
          this.hasScrolledToBottom = true;
          this.offset += 1
          this.evnetList()
        }
      },
      evnetList() {
        let params = {
          param1: this.$route.params.id,
          param2: this.offset
        }
        this.getEventList2(params)
      },
      ...recipientHelper.mapActions([
        'getRefreshEventList',
        'getEventList2'
      ]),
    },
    data() {
      return {
        offset : 0
      }
    },
    created() {
      this.evnetList()
    },
    mounted() {
      this.counterInterval = setInterval(() => {
        this.getRefreshEventList(this.$route.params.id)
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
