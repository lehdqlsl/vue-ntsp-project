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
          borderColor : 'rgba(0,80,253,0.2)',
          backgroundColor : 'rgba(0,80,253,0.2)',
          label:"수면",
          fill:true,
          steppedLine:"before"
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
            unit:'hour'
          },
          ticks:{
            fontSize:14
          }
        }],
        yAxes:[{
          type:'category',
          labels:["수면","깸"],
          ticks:{
            suggestedMin: 0,
            suggestedMax: 1
          }
        }]
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';
            return label + ": "+tooltipItem.value+"시간";
          }
        }
      }
    })
  }
}
