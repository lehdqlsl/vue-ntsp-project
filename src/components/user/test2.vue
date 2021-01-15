<template>
  <!--  <b-row>
      <b-col md="auto">
        <b-time v-model="value" locale="en" @context="onContext"></b-time>
      </b-col>
      <b-col>
        <p>Value: <b>'{{ value }}'</b></p>
        <p class="mb-0">Context:</p>
        <pre class="small">{{ context }}</pre>
      </b-col>
    </b-row>-->
  <div class="row">
    <div class="col-md-5">
      <div class="Chart">
        <DoughnutExample :chart-data="doughnut.data"
                         :chart-labels="doughnut.labels"/>
      </div>
    </div>
    <div class="col-md-6 card-info">
        <label class="d-block">방 옮긴 횟수:</label>
        <label class="d-block">활동 시간:</label>
    </div>
  </div>

</template>

<script>
  import DoughnutExample from '../chart/PieChart'


  export default {
    name: "test2",
    components: {
      DoughnutExample
    },
    props: {

    },
    data() {
      return {
        value: '',
        context: null,
        doughnut: {
          data:[56,44],
          labels:['방', '거실']
        },
      }
    },
    methods: {
      onContext(ctx) {
        this.context = ctx
      }
    }
  }
</script>

<style scoped>
  .card-info{
    padding: 10px;
    border: 1px solid #e5e5e5;
  }

  .card-info label{
    font-size: 13px;
  }
</style>
