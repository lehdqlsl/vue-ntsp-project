<template>
<!--  <card>
    <b-tabs content-class="mt-4" fill>
      <b-tab title="주기보고" active>
        <period-report></period-report>
      </b-tab>
      <b-tab title="센서데이터" lazy>
        <sensor-data></sensor-data>
      </b-tab>
      <b-tab title="원격제어"><p>I'm the tab with the very, very long title</p></b-tab>
      <b-tab title="설정"><p>I'm a disabled tab!</p></b-tab>
    </b-tabs>
  </card>-->
  <el-tabs
          type="border-card"
          :stretch="true">
    <el-tab-pane lazy>
      <span slot="label"><i class="el-icon-date"></i> 주기보고</span>
      <period-report :phone="phone"></period-report>
    </el-tab-pane>
    <el-tab-pane label="센서데이터" lazy>
      <span slot="label"><i class="el-icon-s-data"></i> 센서데이터</span>
      <sensor-data :phone="phone"></sensor-data>
    </el-tab-pane>
    <el-tab-pane label="원격제어" lazy>
      <span slot="label"><i class="el-icon-phone"></i> 원격제어</span>
      <remote-control :phone="phone"></remote-control>
    </el-tab-pane>
    <el-tab-pane label="설정" lazy>
      <span slot="label"><i class="el-icon-setting"></i> 설정</span>
      <setting :phone="phone"></setting>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import SensorData from "./SensorData"
  import PeriodReport from "./PeriodReport"
  import RemoteControl from "./RemoteControl"
  import Setting from "./Setting"

  export default {
    name: "DeviceStatus",
    props: ["phone"],
    components: {
      SensorData,
      PeriodReport,
      RemoteControl,
      Setting
    }
  }
</script>

<style scoped>

</style>
