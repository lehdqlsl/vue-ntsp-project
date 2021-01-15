import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: {
    chartData: {
      type: Array,
      default: () => {
        return {
          data: []
        }
      }
    },
    chartLabels:{
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
      labels: this.chartLabels,
      datasets: [
        {
          backgroundColor: [
             'rgba(71,212,110,0.71)',
             'rgba(255,187,84,0.82)',
             '#f1e902',
             'rgba(99,209,255,0.86)'
            // '#44D92E',
            // '#ABD5FF',
            // '#E6A117',
            // '#409FFF',
            // '#BF8A1F'
          ],
          data: this.chartData
        }
      ],
    }, {
      responsive: true,
      maintainAspectRatio: false,
      legend:{
        position : 'bottom',
        labels:{
          fontSize:14
        }
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {

            console.log(data.datasets[0].data[tooltipItem.index]);
            return "%";
          }
        }
      }
    })
  }
}
