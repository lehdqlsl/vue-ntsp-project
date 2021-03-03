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
    }
  },
  mounted () {
    this.renderChart({
      datasets: [
        {
          data: this.chartData,
          borderColor : 'rgba(255, 0, 0, 0.20)',
          backgroundColor : 'rgba(255, 0, 0, 0.20)',
          label:"활동량",
          fill:false
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
        display: true
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
            suggestedMin: 0
          }
        }]
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';
            return label + ": "+tooltipItem.value+"회";
          }
        }
      }
    })
  }
}
