<template>
  <card class="flex-fill">
    <template slot="header">
      <ul class="nav float-right d-lg-flex" style="font-size: 13px;">
        <li class="nav-item">
          <a class="nav-link active" href="#">1주</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-muted" href="#">1달</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-muted" href="#">1년</a>
        </li>
      </ul>
      <span class="card-title">생활 그래프</span>
      <Life></Life>
    </template>
  </card>
</template>

<script>
  import Life from 'src/components/user/LifeChart'

  export default {
    name: "UserLife",
    components: {
      Life
    }
  }
</script>

<style scoped>

</style>
