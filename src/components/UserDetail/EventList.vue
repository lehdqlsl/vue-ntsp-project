<template>
  <card>
    <h4 class="card-title mb-3">이벤트 목록</h4>
    <div style="max-height: 450px;overflow-y: auto;">

      <b-list-group style="text-align: center;">
        <!--<transition-group name="list-complete" tag="p">-->
        <b-list-group-item v-for="(item, index) in event" v-bind:class="{ 'list-group-item-danger': item.danger, 'list-group-item-warning': item.warning, 'list-group-item-info': item.info }">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ item.eventType }}</h5>
            <small>{{ item.regDate }}</small>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
  </card>
</template>

<script>
  import {createNamespacedHelpers} from "vuex";

  const recipientHelper = createNamespacedHelpers('recipient')

  export default {
    name: "DeviceStatus",
    methods: {
      test(){
        let data = {
          id:"테스트",
          time:"2021-01-13 18:26:23"
        }
        this.items.unshift(data)
      },
      ...recipientHelper.mapActions([
        'getEventList'
      ]),
    },
    data () {
     return {

     }
    },
    created() {
      this.getEventList(this.phone)
    },
    mounted() {
      setInterval(() => {
        console.log("이ㅏ아")
        this.getEventList(this.phone)
      }, 5000)
    },
    computed: {
      ...recipientHelper.mapState({
        phone: state => state.phone,
        event: state => state.event
      }),
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
    /* .list-complete-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(-30px);
    background-color: rgba(43, 208, 31, 0.66);
  }
  .list-complete-leave-active {
    position: absolute;
  }
</style>
