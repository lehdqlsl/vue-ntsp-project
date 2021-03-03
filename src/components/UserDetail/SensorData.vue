<template>
  <div class="row">
    <div class="col-xl-4 col-md-6 col-sm-12">
      <card>
        <template slot="header">
          <ul class="nav float-right d-lg-flex" style="font-size: 13px;">
            <li class="nav-item">
              <el-link class="nav-link" @click="getData(0)"
                       :class="[isActiveDay ? 'active' : '', !isActiveDay ? 'text-muted' : '']"
                       type="primary" :underline="false">오늘
              </el-link>
            </li>
            <li class="nav-item">
              <el-link class="nav-link" @click="getData(1)"
                       :class="[isActiveWeek ? 'active' : '', !isActiveWeek ? 'text-muted' : '']" type="primary"
                       :underline="false">1주
              </el-link>
            </li>
            <li class="nav-item">
              <el-link class="nav-link" @click="getData(2)"
                       :class="[isActiveMonth ? 'active' : '', !isActiveMonth ? 'text-muted' : '']"
                       type="primary" :underline="false">1달
              </el-link>
            </li>
            <li class="nav-item">
              <el-link class="nav-link" @click="getData(3)"
                       :class="[isActiveYear ? 'active' : '', !isActiveYear ? 'text-muted' : '']"
                       type="primary" :underline="false">1년
              </el-link>
            </li>
          </ul>
          <span class="card-title">실내 온도 그래프</span>
          <Temp v-if="loading" :data="env.temperature"></Temp>
        </template>
      </card>
    </div>
    <div class="col-xl-4 col-md-6 col-sm-12">
      <card>
        <template slot="header">
          <ul class="nav float-right d-lg-flex" style="font-size: 13px;">
            <li class="nav-item">
              <el-link class="nav-link" @click="getData(0)"
                       :class="[isActiveDay ? 'active' : '', !isActiveDay ? 'text-muted' : '']"
                       type="primary" :underline="false">오늘
              </el-link>
            </li>
            <li class="nav-item">
              <el-link class="nav-link" @click="getData(1)"
                       :class="[isActiveWeek ? 'active' : '', !isActiveWeek ? 'text-muted' : '']"
                       type="primary" :underline="false">1주
              </el-link>
            </li>
            <li class="nav-item">
              <el-link class="nav-link" @click="getData(2)"
                       :class="[isActiveMonth ? 'active' : '', !isActiveMonth ? 'text-muted' : '']"
                       type="primary" :underline="false">1달
              </el-link>
            </li>
            <li class="nav-item">
              <el-link class="nav-link" @click="getData(3)"
                       :class="[isActiveYear ? 'active' : '', !isActiveYear ? 'text-muted' : '']"
                       type="primary" :underline="false">1년
              </el-link>
            </li>
          </ul>
          <span class="card-title">실내 습도 그래프</span>
          <Humi v-if="loading" :data="env.humidity"></Humi>
        </template>
      </card>
    </div>
    <div class="col-xl-4 col-md-6 col-sm-12">
      <card>
        <template slot="header">
          <ul class="nav float-right d-lg-flex" style="font-size: 13px;">
            <li class="nav-item">
              <el-link class="nav-link" @click="getData(0)"
                       :class="[isActiveDay ? 'active' : '', !isActiveDay ? 'text-muted' : '']"
                       type="primary" :underline="false">오늘
              </el-link>
            </li>
            <li class="nav-item">
              <el-link class="nav-link" @click="getData(1)"
                       :class="[isActiveWeek ? 'active' : '', !isActiveWeek ? 'text-muted' : '']"
                       type="primary" :underline="false">1주
              </el-link>
            </li>
            <li class="nav-item">
              <el-link class="nav-link" @click="getData(2)"
                       :class="[isActiveMonth ? 'active' : '', !isActiveMonth ? 'text-muted' : '']"
                       type="primary" :underline="false">1달
              </el-link>
            </li>
            <li class="nav-item">
              <el-link class="nav-link" @click="getData(3)"
                       :class="[isActiveYear ? 'active' : '', !isActiveYear ? 'text-muted' : '']"
                       type="primary" :underline="false">1년
              </el-link>
            </li>
          </ul>
          <span class="card-title">실내 조도 그래프</span>
          <Illu v-if="loading" :data="env.illuminance"></Illu>
        </template>
      </card>
    </div>
  </div>
</template>

<script>
  import Temp from 'src/components/user/TemperatureChart'
  import Humi from 'src/components/user/HumidityChart'
  import Illu from 'src/components/user/IlluminanceChart'
  import {createNamespacedHelpers} from "vuex";

  const recipientHelper = createNamespacedHelpers('recipient')

  export default {
    name: "SensorData",
    components: {
      Temp,
      Humi,
      Illu
    },
    data() {
      return {
        isActiveDay: true,
        isActiveWeek: false,
        isActiveMonth: false,
        isActiveYear: false,
      }
    },
    props: ["phone"],
    computed: {
      ...recipientHelper.mapState({
        env: state => state.env,
        loading: state => state.loading
      })
    },
    methods: {
      ...recipientHelper.mapActions([
        'getTemp'
      ])
      , getData(param) {
        let params = {
          phone: this.$route.params.id,
          dateType: param
        }
        switch (param) {
          case 0:
            this.isActiveDay = true
            this.isActiveWeek = false
            this.isActiveMonth = false
            this.isActiveYear = false
            break;
          case 1:
            this.isActiveDay = false
            this.isActiveWeek = true
            this.isActiveMonth = false
            this.isActiveYear = false
            break;
          case 2:
            this.isActiveDay = false
            this.isActiveWeek = false
            this.isActiveMonth = true
            this.isActiveYear = false
            break;
          case 3:
            this.isActiveDay = false
            this.isActiveWeek = false
            this.isActiveMonth = false
            this.isActiveYear = true
            break;
        }
        this.getTemp(params)
      }
    }, created() {
      let params = {
        phone: this.$route.params.id,
        dateType: 0
      }
      this.getTemp(params)
    },
    watch: {
      phone: function (newVal, oldVal) {
        let params = {
          phone: newVal,
          dateType: 0
        }
        this.getTemp(params)
      }
    }
  }
</script>

<style scoped>

</style>
