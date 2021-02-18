<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">

      </div>
    </div>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from "vuex";

  const recipientHelper = createNamespacedHelpers('recipient')

  export default {
    components: {},
    data() {
      return {}
    },
    methods: {
      ...recipientHelper.mapActions([
        'getSensorList'
      ]),
    },
    created() {

    },
    mounted() {

    },
    computed: {
      ...recipientHelper.mapState({
        //sensors: state => state.sensors
      }),
    }
  }
</script>

<style scoped>

</style>
