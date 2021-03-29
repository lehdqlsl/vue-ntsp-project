import { Line } from 'vue-chartjs'

export default {
  extends: Line,
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
      datasets: [
        {
          data: this.chartData,
          backgroundColor : 'rgba(255, 0, 0, 0.20)',
          label:this.chartLabels
        }
      ],
    }, {
      responsive: true,
      maintainAspectRatio: false,
      legend:{
        position : 'bottom',
        labels: {
          fontSize: 14
        },
        display: false
      },
      scales:{
        xAxes:[{
          type:'time',
          time:{
            unit:'day'
          },
          ticks:{
            fontSize:14
          }
        }],
        yAxes:[{
          ticks:{
            suggestedMin: 0,
            suggestedMax: 40
          }
        }]
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';
            return label + ": "+tooltipItem.value+"ºc";
          }
        }
      }
    })
  }
}
