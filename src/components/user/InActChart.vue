<template>
      <div class="row mt-3">
        <div class="col-lg-12">
          <div class="environment">
            <InActChart :chart-data="data"
                              :height="370"/>
          </div>
        </div>
      </div>
</template>

<script>
  import InActChart from '../chart/inActChart'

    export default {
      name: "Life",
      components: {
        InActChart
      },
      props: ["data"],
      data() {
        return {
          value: '',
          context: null,
        }
      },
      methods: {
        onContext(ctx) {
          this.context = ctx
        }
      }
    }
</script>

<style scoped>
  .card-info{
    border: 1px solid #e5e5e5;
  }

  .card-info label{
    font-size: 13px;
  }

  .chart-widget-list p{
    border-bottom: 1px solid #f1f3fa;
    margin-bottom: .5rem;
    padding-bottom: .5rem;
    color: #6c757d;
  }


</style>
