import {Doughnut} from 'vue-chartjs'

export default {
  extends: Doughnut,
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
  mounted() {
    this.renderChart({
      labels: ['정상', '배터리부족', '배터리교체', '통신차단'],
      datasets: [
        {
          backgroundColor: [
            '#269eff',
            '#fdf927',
            '#ff7200',
            '#ff0700'
          ],
          data: this.chartData
        }
      ],
    }, {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'right'
      }
    })
  }
}
