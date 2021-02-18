<template>
  <card style="height: 500px;overflow: auto;">
    <b-list-group style="text-align: center;padding-bottom: 15px;">
      <b-list-group-item>

        <div class="font-weight-bold" style="font-size: 0.9rem;margin-bottom: 5px;">게이트웨이</div>

        <i v-if="gateway.power==1" class="fa fa-plug fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
        <i v-if="gateway.power==0" class="fa fa-plug fa-2x" aria-hidden="true" style="color: #EE2D20;"></i>

        <el-tooltip class="item" effect="dark" placement="top" :content="'LTE감도: ' + gateway.sensitivity">
          <i v-if="gateway.network==1" class="fa fa-signal fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
          <i v-if="gateway.network==0" class="fa fa-signal fa-2x" aria-hidden="true" style="color: #EE2D20;"></i>
        </el-tooltip>
      </b-list-group-item>

      <b-list-group-item v-for="device in devices">
        <div class="font-weight-bold" style="font-size: 0.9rem;margin-bottom: 5px;">{{ device.devType }}</div>

        <i v-if="device.power==2" class="fa fa-battery-full fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
        <i v-if="device.power==1" class="fa fa-battery-full fa-2x" aria-hidden="true" style="color: #f0a810;"></i>
        <i v-if="device.power==0" class="fa fa-battery-full fa-2x" aria-hidden="true" style="color: #EE2D20;"></i>

        <el-tooltip class="item" effect="dark" placement="bottom" :content="'감도: ' + device.sensitivity">
          <i v-if="device.network==1" class="fa fa-wifi fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
          <i v-if="device.network==0" class="fa fa-wifi fa-2x" aria-hidden="true" style="color: #EE2D20;"></i>
        </el-tooltip>
      </b-list-group-item>


    </b-list-group>
  </card>
</template>

<script>
  import {createNamespacedHelpers} from "vuex";

  const recipientHelper = createNamespacedHelpers('recipient')

  export default {
    name: "DeviceStatus",
    props: ['phone'],
    methods: {
      ...recipientHelper.mapActions([
        'getDevices'
      ]),
    },
    created() {
      this.getDevices(this.$route.params.id);
    },
    computed: {
      ...recipientHelper.mapState({
        devices: state => state.devices,
        gateway: state => state.gateway
      }),
    },
    watch: {
      phone: function(newVal, oldVal) {
        this.getDevices(newVal);
      }
    }
  }
</script>

<style scoped>
  .fa {
    width: 38px;
  }

  .fa-2x {
    font-size: 1.5em;
  }

  .list-group-item {
    padding: 0.55rem 0 0.55rem 0;
  }
</style>
