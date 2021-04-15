<template>
  <card style="height: 500px;overflow: auto;">
    <b-list-group style="text-align: center;padding-bottom: 15px;">
      <b-list-group-item>

        <div class="font-weight-bold" style="font-size: 0.9rem;margin-bottom: 5px;">게이트웨이</div>

        <i v-if="gateway.power==1" class="fa fa-plug fa-2x" aria-hidden="true" style="color: #05ae0e;"></i>
        <i v-if="gateway.power==0" class="fa fa-plug fa-2x" aria-hidden="true" style="color: #EE2D20;"></i>

        <el-tooltip v-if="gateway.network==1" class="item" effect="dark" placement="bottom"
                    :content="'LTE감도: ' + gateway.sensitivity">
          <i class="fa fa-signal fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
        </el-tooltip>

        <el-tooltip v-if="gateway.network==0" class="item" effect="dark" placement="bottom"
                    :content="'LTE감도: ' + gateway.sensitivity">
          <i class="fa fa-signal fa-2x" aria-hidden="true" style="color: #EE2D20;"></i>
        </el-tooltip>

        <el-tooltip v-if="gateway.battery>75" class="item" effect="dark" placement="bottom"
                    :content="'배터리: ' + gateway.battery + '%'">
          <i class="fa fa-battery-full fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
        </el-tooltip>

        <el-tooltip v-if="gateway.battery<=75 && gateway.battery>50" class="item" effect="dark" placement="bottom"
                    :content="'배터리: ' + gateway.battery + '%'">
          <i class="fa fa-battery-three-quarters fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
        </el-tooltip>

        <el-tooltip v-if="gateway.battery<=50 && gateway.battery>25" class="item" effect="dark" placement="bottom"
                    :content="'배터리: ' + gateway.battery + '%'">
          <i class="fa fa-battery-half fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
        </el-tooltip>

        <el-tooltip v-if="gateway.battery<=25 && gateway.battery>10" class="item" effect="dark" placement="bottom"
                    :content="'배터리: ' + gateway.battery + '%'">
          <i class="fa fa-battery-quarter fa-2x" aria-hidden="true" style="color: #EE2D20;"></i>
        </el-tooltip>

        <el-tooltip v-if="gateway.battery<=10 && gateway.battery>=0" class="item" effect="dark" placement="bottom"
                    :content="'배터리: ' + gateway.battery + '%'">
          <i class="fa fa-battery-empty fa-2x" aria-hidden="true" style="color: #EE2D20;"></i>
        </el-tooltip>

      </b-list-group-item>

      <b-list-group-item v-for="device in devices">
        <div class="font-weight-bold" style="font-size: 0.9rem;margin-bottom: 5px;">{{ device.devType }}</div>

        <span v-if="device.devType == '레이더센서'">
          <i v-if="device.battery==2" class="fa fa-plug fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
          <i v-if="device.battery==1" class="fa fa-plug fa-2x" aria-hidden="true" style="color: #f0a810;"></i>
          <i v-if="device.battery==0" class="fa fa-plug fa-2x" aria-hidden="true" style="color: #EE2D20;"></i>
        </span>
        <span v-else>
            <el-tooltip v-if="device.battery==2" class="item" effect="dark" placement="bottom" :content="'충만'">
               <i class="fa fa-battery-full fa-2x" aria-hidden="true" style="color: #05AE0E;"></i>
            </el-tooltip>
            <el-tooltip v-if="device.battery==1" class="item" effect="dark" placement="bottom" :content="'부족'">
               <i class="fa fa-battery-full fa-2x" aria-hidden="true" style="color: #f0a810;"></i>
            </el-tooltip>
           <el-tooltip v-if="device.battery==0" class="item" effect="dark" placement="bottom" :content="'교체'">
              <i class="fa fa-battery-full fa-2x" aria-hidden="true" style="color: #EE2D20;"></i>
            </el-tooltip>
        </span>

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
      phone: function (newVal, oldVal) {
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
