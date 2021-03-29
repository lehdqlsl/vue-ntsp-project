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

  <div class="row mt-3">
    <div class="col-lg-12">
        <div class="environment">
          <TemperatureChart :chart-data="data"
                           :chart-labels="doughnut.labels"
                           :height="250"/>
        </div>
    </div>
  </div>

</template>

<script>
  import TemperatureChart from '../chart/TemperatureChart'

    export default {
      name: "Temp",
      components: {
        TemperatureChart
      },
        props: ["data"],
      data() {
        return {
          value: '',
          context: null,
          doughnut: {
            labels:['온도']
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


</style>
