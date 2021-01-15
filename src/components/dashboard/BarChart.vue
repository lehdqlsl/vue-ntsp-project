<template>
      <div class="row mt-3">
        <div class="col-lg-12">
          <div class="environment">
            <EmerChart :chart-data="act.data"
                       :out-data="out.data"
                       :inactive-data="inactive.data"
                       :sleep-data="sleep.data"
                              :height="295"/>
          </div>
        </div>
      </div>
</template>

<script>
  import EmerChart from '../chart/emerChart.js'

    export default {
      name: "Emer",
      components: {
        EmerChart
      },
      props: {

      },
      data() {
        return {
          value: '',
          context: null,
          act: {
            data:[
              { x: '2020-08-01', y: 10 },
              { x: '2020-08-02', y: 9},
              { x: '2020-08-03', y: 8 },
              { x: '2020-08-04', y: 7 },
              { x: '2020-08-05', y: 7 },
              { x: '2020-08-06', y: 8 },
              { x: '2020-08-07', y: 7 },
              { x: '2020-08-08', y: 8 },
              { x: '2020-08-09', y: 7 },
              { x: '2020-08-10', y: 8 },
              { x: '2020-08-11', y: 10 },
              { x: '2020-08-12', y: 11 },
              { x: '2020-08-13', y: 12 },
              { x: '2020-08-14', y: 13 },
              { x: '2020-08-15', y: 14 }
            ]
          },
          out: {
            data:[
              { x: '2020-08-01', y: 2.5 },
              { x: '2020-08-02', y: 2.8 },
              { x: '2020-08-03', y: 2.7 },
              { x: '2020-08-04', y: 2.0 },
              { x: '2020-08-05', y: 2.2 },
              { x: '2020-08-06', y: 2.9 },
              { x: '2020-08-07', y: 2.5 },
              { x: '2020-08-08', y: 2.8 },
              { x: '2020-08-09', y: 2.7 },
              { x: '2020-08-10', y: 2.0 },
              { x: '2020-08-11', y: 2.2 },
              { x: '2020-08-12', y: 2.9 },
              { x: '2020-08-13', y: 2 },
              { x: '2020-08-14', y: 2 },
              { x: '2020-08-15', y: 2 }
            ]
          },
          inactive: {
            data:[
              { x: '2020-08-01', y: 1 },
              { x: '2020-08-02', y: 2 },
              { x: '2020-08-03', y: 1 },
              { x: '2020-08-04', y: 2 },
              { x: '2020-08-05', y: 3 },
              { x: '2020-08-06', y: 2 },
              { x: '2020-08-07', y: 1 },
              { x: '2020-08-08', y: 2 },
              { x: '2020-08-09', y: 5 },
              { x: '2020-08-10', y: 1 },
              { x: '2020-08-11', y: 4 },
              { x: '2020-08-12', y: 2 },
              { x: '2020-08-13', y: 3 },
              { x: '2020-08-14', y: 2 },
              { x: '2020-08-15', y: 1 }
            ]
          },
          sleep: {
            data:[
              { x: '2020-08-01', y: 7 },
              { x: '2020-08-02', y: 8 },
              { x: '2020-08-03', y: 7 },
              { x: '2020-08-04', y: 8 },
              { x: '2020-08-05', y: 7 },
              { x: '2020-08-06', y: 8 },
              { x: '2020-08-07', y: 7.5 },
              { x: '2020-08-08', y: 7.0 },
              { x: '2020-08-09', y: 8.5 },
              { x: '2020-08-10', y: 8.0 },
              { x: '2020-08-11', y: 7.3 },
              { x: '2020-08-12', y: 8.2 },
              { x: '2020-08-13', y: 7.1 },
              { x: '2020-08-14', y: 8.0 },
              { x: '2020-08-15', y: 7.5 }
            ]
          }
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
