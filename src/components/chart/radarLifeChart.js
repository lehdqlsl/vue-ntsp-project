import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartDataActivity: {
      type: Array,
      default: () => {
        return {
          data: []
        }
      }
    },
    chartDataBreath: {
      type: Array,
      default: () => {
        return {
          data: []
        }
      }
    },
    chartDataHeart: {
      type: Array,
      default: () => {
        return {
          data: []
        }
      }
    },
    position : {
      type: String,
      default: 'bottom'
    }
  },
  mounted () {
    this.renderChart({
      datasets: [
        {
          data: this.chartDataActivity,
          borderColor : 'rgba(47,250,49,0.3)',
          backgroundColor :'rgba(47,250,49,0.3)',
          label:"활동량",
          fill:false,
          radius: 0,
        },
        {
          data: this.chartDataBreath,
          borderColor : 'rgba(0,165,255,0.3)',
          backgroundColor : 'rgba(0,165,255,0.3)',
          label:"호흡",
          fill:false,
          radius: 0,
        },
        {
          data: this.chartDataHeart,
          borderColor : 'rgba(255,0,0,0.3)',
          backgroundColor : 'rgba(255,0,0,0.3)',
          label:"심박",
          fill:false,
          radius: 0,
        },
      ],
    }, {
      responsive: true,
      maintainAspectRatio: false,
      legend:{
        position : this.position,
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
