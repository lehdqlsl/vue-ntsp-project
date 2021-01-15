import { Radar } from 'vue-chartjs'

export default {
  extends: Radar,
  props: {
    chartData: {
      type: Array,
      default: () => {
        return {
          data: []
        }
      }
    }
  },
  mounted () {
    this.renderChart({
      labels: ['활동(%)', '외출(%)', '미감지(%)', '수면(%)'],
      datasets: [
        {
          label:"요약",
          data: this.chartData
        }
      ],
    }, {
      responsive: true,
      maintainAspectRatio: false,
      scale:{
        ticks:{
          suggestedMin: 0,
          /*suggestedMax: 100,*/
          fontSize: 15
        },
        pointLabels: {
          fontSize: 15
        }
      },
      legend:{
        labels:{
          fontSize:15
        }
      }
    })
  }
}
