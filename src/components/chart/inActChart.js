import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
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
          backgroundColor : 'rgba(255,153,0,0.5)',
          label:"활동미감지",
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
          offset: true,
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
            return label + ": "+tooltipItem.value+"건";
          }
        }
      }
    })
  }
}
