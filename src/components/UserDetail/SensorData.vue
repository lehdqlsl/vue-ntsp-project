<template>
  <div class="row">
    <div class="col-xl-4 col-md-6 col-sm-12">
      <card>
        <template slot="header">
          <ul class="nav float-right d-lg-flex" style="font-size: 13px;">
            <li class="nav-item">
              <a class="nav-link active" href="#">오늘</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-muted" href="#">1주</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-muted" href="#">1달</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-muted" href="#">1년</a>
            </li>
          </ul>
          <span class="card-title">실내 온도 그래프</span>
          <Temp></Temp>
        </template>
      </card>
    </div>
    <div class="col-xl-4 col-md-6 col-sm-12">
      <card>
        <template slot="header">
          <ul class="nav float-right d-lg-flex" style="font-size: 13px;">
            <li class="nav-item">
              <a class="nav-link active" href="#">오늘</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-muted" href="#">1주</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-muted" href="#">1달</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-muted" href="#">1년</a>
            </li>
          </ul>
          <span class="card-title">실내 습도 그래프</span>
          <Humi></Humi>
        </template>
      </card>
    </div>
    <div class="col-xl-4 col-md-6 col-sm-12">
      <card>
        <template slot="header">
          <ul class="nav float-right d-lg-flex" style="font-size: 13px;">
            <li class="nav-item">
              <a class="nav-link active" href="#">오늘</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-muted" href="#">1주</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-muted" href="#">1달</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-muted" href="#">1년</a>
            </li>
          </ul>
          <span class="card-title">실내 조도 그래프</span>
          <Illu></Illu>
        </template>
      </card>
    </div>
  </div>
</template>

<script>
  import Temp from 'src/components/user/TemperatureChart'
  import Humi from 'src/components/user/HumidityChart'
  import Illu from 'src/components/user/IlluminanceChart'

  export default {
    name: "SensorData",
    components: {
      Temp,
      Humi,
      Illu
    }
  }
</script>

<style scoped>

</style>
