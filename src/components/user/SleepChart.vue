<template>
      <div class="row mt-3">
        <div class="col-lg-12">
          <div class="environment">
            <SleepChart :chart-data="act.data"
                              :height="250"/>
          </div>
          <div class="chart-widget-list">
            <p>
              <i class="mdi mdi-square text-activity"></i> 잠든 시간
              <span class="float-right">오후 11시 17분</span>
            </p>
            <p>
              <i class="mdi mdi-square text-activity"></i> 일어난 시간
              <span class="float-right">오전 08시 37분</span>
            </p>
            <p>
              <i class="mdi mdi-square text-activity"></i> 수면 시간
              <span class="float-right">총 08시간 24분</span>
            </p>
          </div>
        </div>
      </div>
</template>

<script>
  import SleepChart from '../chart/SleepChart'

    export default {
      name: "Sleep",
      components: {
        SleepChart
      },
      props: {

      },
      data() {
        return {
          value: '',
          context: null,
          act: {
            data: [
              {x: '2020-08-01 20:00:00', y: "깸"},
              {x: '2020-08-01 21:00:00', y: "깸"},
              {x: '2020-08-01 22:00:00', y: "깸"},
              {x: '2020-08-01 23:00:00', y: "수면"},
              {x: '2020-08-02 00:00:00', y: "수면"},
              {x: '2020-08-02 01:00:00', y: "수면"},
              {x: '2020-08-02 02:00:00', y: "수면"},
              {x: '2020-08-02 03:00:00', y: "깸"},
              {x: '2020-08-02 04:00:00', y: "수면"},
              {x: '2020-08-02 05:00:00', y: "수면"},
              {x: '2020-08-02 06:00:00', y: "수면"},
              {x: '2020-08-02 07:00:00', y: "수면"},
              {x: '2020-08-02 08:00:00', y: "깸"},
              {x: '2020-08-02 09:00:00', y: "깸"},
              {x: '2020-08-02 10:00:00', y: "깸"},
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

  .text-activity{
    color: rgba(16, 99, 241, 0.71);
  }
</style>
