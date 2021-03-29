<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xxl-4 col-xl-5 col-lg-7 col-md-8 col-sm-8 d-flex">
        <user-card class="flex-fill"
                     :phone="phone">
          </user-card>
        </div>
        <div class="col-xxl-2 col-xl-2 col-lg-5 col-md-4 col-sm-4 d-flex">
          <device-status class="flex-fill"
                         :phone="phone">
          </device-status>
        </div>
        <div class="col-xxl-6 col-xl-5 col-lg-12 col-md-12 col-sm-12 d-flex">
          <user-life class="flex-fill"
                     :phone="phone">
          </user-life>
        </div>

        <div class="col-xxl-3 col-xl-4 col-lg-12 col-md-5 col-sm-12 d-flex">
          <event-list class="flex-fill" style="margin-bottom: 0px;"
                      :phone="phone">
          </event-list>
        </div>
        <div class="col-xxl-9 col-xl-8 col-md-12 col-sm-12 d-flex">
          <user-tab class="flex-fill"
                    :phone="phone">
          </user-tab>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import UserCard from 'src/pages/UserProfile/UserCard'
  import DeviceStatus from './DeviceStatus'
  import EventList from "./EventList";
  import UserTab from "./UserTab";
  import UserLife from "./UserLife";
  import {createNamespacedHelpers} from "vuex";

  const recipientHelper = createNamespacedHelpers('recipient')

  export default {
    name: "UserDetail",
    components: {
      UserCard,
      DeviceStatus,
      EventList,
      UserTab,
      UserLife
    },
    props: {
      inputData: {
        type: String,
        default: ""
      },
      selectType: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        render: true,
        phone: ""
      }
    },
    methods: {
      selectEvent(select) {

      },
      ...recipientHelper.mapActions([
        'getPeriodList'
      ]),
      ...recipientHelper.mapMutations([
        'SET_PHONE'
      ])
    },
    created() {

    },
    mounted() {

    },
    computed: {
      ...recipientHelper.mapState({
        recipient: state => state.recipient
      }),
    },
    watch: {
      $route(to, from) {
        this.phone = this.$route.params.id
      }
    }
  }
</script>

<style scoped>
  .sc-table .action-list {
    text-align: left;
  }
</style>
