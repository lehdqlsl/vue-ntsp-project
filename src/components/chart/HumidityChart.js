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
          backgroundColor : 'rgba(0,102,255,0.20)',
          label:this.chartLabels
        }
      ],
    }, {
      responsive: true,
      maintainAspectRatio: false,
      legend:{
        position : 'top',
        labels:{
          fontSize:14
        },
        display: false
      },
      scales:{
        xAxes:[{
          type:'time',
          time:{
            unit:'hour'
          },
          ticks:{
            fontSize:14
          }
        }],
        yAxes:[{
          ticks:{
            suggestedMin: 0,
            suggestedMax: 100,
          }
        }]
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';
            return label + ": "+tooltipItem.value+"%";
          }
        }
      }
    })
  }
}
