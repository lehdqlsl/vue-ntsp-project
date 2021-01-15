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
  <div class="row p-3">
    <div class="col-lg-12">
        <div class="Chart" style="margin-bottom: 2.25rem!important;">
          <DoughnutExample :chart-data="doughnut.data"
                           :chart-labels="doughnut.labels"
                           :height="250"/>
        </div>
      <div class="chart-widget-list">
        <p>
          <i class="mdi mdi-square text-activity"></i> 거실
          <span class="float-right">총 09시간 07분</span>
        </p>
        <p>
          <i class="mdi mdi-square text-outside"></i> 방
          <span class="float-right">총 05시간 17분</span>
        </p>
      </div>
    </div>
  </div>

</template>

<script>
  import DoughnutExample from '../chart/PieChart'

    export default {
      name: "test1",
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
            data:[38,22],
            labels:['거실', '방']
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

  .chart-widget-list p{
    border-bottom: 1px solid #f1f3fa;
    margin-bottom: .5rem;
    padding-bottom: .5rem;
    color: #6c757d;
  }

  .text-activity{
    color: rgba(71,212,110,0.71);
  }
  .text-outside{
    color: rgba(255,187,84,0.82);
  }
  .text-Inactivity{
    color: #f1e902;
  }
  .text-sleep{
    color: rgba(99,209,255,0.86);
  }
</style>
