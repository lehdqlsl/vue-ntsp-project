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
          borderColor : 'rgba(0,189,2,0.7)',
          backgroundColor :'rgba(0,189,2,0.7)',
          label:"활동량",
          fill:false,
          radius: 0,
        },
        {
          data: this.chartDataBreath,
          borderColor : 'rgb(89,189,252)',
          backgroundColor : 'rgb(89,189,252)',
          label:"호흡",
          fill:false,
          radius: 0,
        },
        {
          data: this.chartDataHeart,
          borderColor : 'rgba(255,82,82,0.78)',
          backgroundColor : 'rgba(255,82,82,0.78)',
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
