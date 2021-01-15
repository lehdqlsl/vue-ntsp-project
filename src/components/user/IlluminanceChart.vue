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
          <IlluminanceChart :chart-data="doughnut.data"
                           :chart-labels="doughnut.labels"
                           :height="250"/>
        </div>
    </div>
  </div>

</template>

<script>
  import IlluminanceChart from '../chart/IlluminanceChart'

    export default {
      name: "Illu",
      components: {
        IlluminanceChart
      },
      props: {

      },
      data() {
        return {
          value: '',
          context: null,
          doughnut: {
            data:[
              { x: '2020-08-01 08:00', y: 60.5 },
              { x: '2020-08-01 08:10', y: 60.8 },
              { x: '2020-08-01 08:20', y: 60.7 },
              { x: '2020-08-01 08:30', y: 60.0 },
              { x: '2020-08-01 08:40', y: 960.2 },
              { x: '2020-08-01 08:50', y: 955.9 },
              { x: '2020-08-01 09:00', y: 955.5 },
              { x: '2020-08-01 09:10', y: 956.8 },
              { x: '2020-08-01 09:20', y: 955.7 },
              { x: '2020-08-01 09:30', y: 966.0 },
              { x: '2020-08-01 09:40', y: 965.2 },
              { x: '2020-08-01 09:50', y: 165.9 },
              { x: '2020-08-01 10:00', y: 165 },
              { x: '2020-08-01 10:10', y: 167 },
              { x: '2020-08-01 10:20', y: 156 }
            ],
            labels:['조도']
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
</style>
