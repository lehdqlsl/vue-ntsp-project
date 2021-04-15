import { Scatter } from 'vue-chartjs'

export default {
  extends: Scatter,
  props: {
    amData: {
      type: Array,
      default: () => {
        return {
          data: []
        }
      }
    },
    pmData: {
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
          data: this.amData,
          borderColor : 'rgba(0,94,255,0.2)',
          backgroundColor : 'rgba(0,94,255,0.2)',
          label:'오전',
          fill:false
        },
        {
          data: this.pmData,
          borderColor : 'rgba(255,0,0,0.2)',
          backgroundColor : 'rgba(255,0,0,0.2)',
          label:'오후',
          fill:false
        }
      ],
    }, {
      responsive: true,
      maintainAspectRatio: false,
      legend:{
        position : 'top',
        labels: {
          fontSize: 14
        },
        display: true
      },
      scales:{
        xAxes:[{
          ticks:{
            suggestedMin: -300,
            suggestedMax: 300,
            fontSize:14
          }
        }],
        yAxes:[{
          ticks:{
            suggestedMax: 500
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].date
          }
        }
      }
    })
  }
}
