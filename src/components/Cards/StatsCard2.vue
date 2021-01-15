<template>
  <card class="card-stats">
    <div class="row">

      <div class="col-12" v-if="$slots.content">
        <div class="numbers">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
    <div slot="footer" class="stats-white" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </card>
</template>
<script>
  import Card from './Card2.vue'
  export default {
    name: 'stats-card2',
    components: {
      Card
    }
  }

</script>
<style>

</style>
