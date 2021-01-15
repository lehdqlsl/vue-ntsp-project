<template>
  <div class="card">
    <div class="card-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <div class="Chart">
        <DoughnutExample :chart-data="doughnut.data"/>
      </div>
    </div>
    <div class="card-footer" v-if="$slots.footer" style="padding: 0;line-height: 1.5;">
        <slot name="footer">
        </slot>
    </div>
  </div>
</template>
<script>
  import Card from './Card.vue'
  import DoughnutExample from '../chart/CommitChart'

  export default {
    name: 'chart-card2',
    components: {
      Card,
      DoughnutExample
    },
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
    data(){
      return {
        doughnut: {
          data: this.chartData
        }
      }
    }
  }
</script>
<style>

</style>
