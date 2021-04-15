<template>
  <div class="row mt-3">
    <div class="environment col-sm-6">
      <RadarChart :am-data="this.data.am" :pm-data="this.data.pm"
                  :height="370"/>
    </div>
    <div class="environment col-sm-6">
      <LifeChart :chart-data-activity="this.data.activity"
                 :chart-data-breath="this.data.breath"
                 :chart-data-heart="this.data.heart"
                  :height="370"
                  :position="'top'"/>
    </div>
  </div>
</template>

<script>
  import RadarChart from '../chart/RadarChart'
  import LifeChart from '../chart/radarLifeChart'

  export default {
    name: "Radar",
    components: {
      RadarChart,
      LifeChart
    },
    props: ["data"],
    data() {
      return {
        value: '',
        context: null,
        testData: {
          am: [
            {x: 135, y: 5, date:"07:23"},
            {x: 45, y: 13, date:"07:24"},
            {x: 45, y: 24, date:"07:25"},
            {x: 33, y: 15, date:"07:26"},
            {x: 42, y: 45, date:"07:27"},
            {x: 15, y: 55, date:"07:28"},
            {x: 15, y: 65, date:"07:29"},
            {x: 25, y: 31, date:"07:30"},
            {x: 55, y: 85, date:"07:31"},
            {x: 93, y: 92, date:"07:32"}
          ],
          pm: [
            {x: -5, y: 5, date:"08:23"},
            {x: 15, y: 115, date:"09:23"},
            {x: -25, y: 25, date:"10:23"},
            {x: 35, y: 135, date:"11:23"},
            {x: -45, y: 45, date:"12:23"},
            {x: 55, y: 155, date:"13:23"},
            {x: -65, y: 65, date:"14:23"},
            {x: 75, y: 175, date:"15:23"},
            {x: -85, y: 185, date:"16:23"},
            {x: 95, y: 195, date:"17:23"}
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
  .card-info {
    border: 1px solid #e5e5e5;
  }

  .card-info label {
    font-size: 13px;
  }

  .chart-widget-list p {
    border-bottom: 1px solid #f1f3fa;
    margin-bottom: .5rem;
    padding-bottom: .5rem;
    color: #6c757d;
  }


</style>
