<template>
  <el-tabs v-model="select" :stretch="true"
           style="max-height: 500px;" @tab-click="handleClick">

    <el-tab-pane label="활동량" name="init" lazy>
      <card class="flex-fill">
        <template slot="header">
          <ul class="nav float-right d-lg-flex" style="font-size: 13px;">
            <li class="nav-item">
              <el-link class="nav-link" @click="getActData(1)"
                       :class="[isActiveWeek ? 'active' : '', !isActiveWeek ? 'text-muted' : '']" type="primary"
                       :underline="false">1주
              </el-link>
            </li>
            <li class="nav-item">
              <el-link class="nav-link" @click="getActData(2)"
                       :class="[isActiveMonth ? 'active' : '', !isActiveMonth ? 'text-muted' : '']" type="primary"
                       :underline="false">1달
              </el-link>
            </li>
            <li class="nav-item">
              <el-link class="nav-link" @click="getActData(3)"
                       :class="[isActiveYear ? 'active' : '', !isActiveYear ? 'text-muted' : '']" type="primary"
                       :underline="false">1년
              </el-link>
            </li>
          </ul>
          <span class="card-title">활동량 모니터링</span>
          <Life v-if="statLoading" :data="act"></Life>
        </template>
      </card>
    </el-tab-pane>

    <el-tab-pane label="활동미감지" lazy>
      <card class="flex-fill">
        <template slot="header">
          <ul class="nav float-right d-lg-flex" style="font-size: 13px;">
            <li class="nav-item">
              <el-link class="nav-link" @click="getStatData(1,7)"
                       :class="[isActiveWeek ? 'active' : '', !isActiveWeek ? 'text-muted' : '']" type="primary"
                       :underline="false">1주
              </el-link>
            </li>
            <li class="nav-item">
              <el-link class="nav-link" @click="getStatData(2,7)"
                       :class="[isActiveMonth ? 'active' : '', !isActiveMonth ? 'text-muted' : '']" type="primary"
                       :underline="false">1달
              </el-link>
            </li>
            <li class="nav-item">
              <el-link class="nav-link" @click="getStatData(3,7)"
                       :class="[isActiveYear ? 'active' : '', !isActiveYear ? 'text-muted' : '']" type="primary"
                       :underline="false">1년
              </el-link>
            </li>
          </ul>
          <span class="card-title">활동미감지 통계</span>
          <InAct v-if="statLoading" :data="inact"></InAct>
        </template>
      </card>
    </el-tab-pane>

    <el-tab-pane label="외출" lazy>
      <card class="flex-fill">
        <template slot="header">
          <ul class="nav float-right d-lg-flex" style="font-size: 13px;">
            <li class="nav-item">
              <el-link class="nav-link" @click="getStatData(1,17)"
                       :class="[isActiveWeek ? 'active' : '', !isActiveWeek ? 'text-muted' : '']" type="primary"
                       :underline="false">1주
              </el-link>
            </li>
            <li class="nav-item">
              <el-link class="nav-link" @click="getStatData(2,17)"
                       :class="[isActiveMonth ? 'active' : '', !isActiveMonth ? 'text-muted' : '']" type="primary"
                       :underline="false">1달
              </el-link>
            </li>
            <li class="nav-item">
              <el-link class="nav-link" @click="getStatData(3,17)"
                       :class="[isActiveYear ? 'active' : '', !isActiveYear ? 'text-muted' : '']" type="primary"
                       :underline="false">1년
              </el-link>
            </li>
          </ul>
          <span class="card-title">외출 통계</span>
          <GoOut v-if="statLoading" :data="goout"></GoOut>
        </template>
      </card>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import Life from 'src/components/user/LifeChart'
  import InAct from 'src/components/user/InActChart'
  import GoOut from 'src/components/user/goOutChart'
  import {createNamespacedHelpers} from "vuex";

  const recipientHelper = createNamespacedHelpers('recipient')

  export default {
    name: "UserLife",
    components: {
      Life,
      InAct,
      GoOut
    },
    props: ["phone"],
    data() {
      return {
        isActiveWeek: true,
        isActiveMonth: false,
        isActiveYear: false,
        select: 'init'
      };
    },
    computed: {
      ...recipientHelper.mapState({
        act: state => state.act,
        inact: state => state.inact,
        goout: state => state.goout,
        statLoading: state => state.statLoading
      })
    },
    methods: {
      ...recipientHelper.mapActions([
        'getAct',
        'getStat'
      ]),
      handleClick(tab, event) {
        this.isActiveWeek = true
        this.isActiveMonth = false
        this.isActiveYear = false

        let params = {
          phone: this.$route.params.id,
          dateType: 1
        }

        switch (tab.index) {
          case '0': // 활동량
            this.getAct(params)
            break;
          case '1': // 활동미감지
            params.eventType=7
            this.getStat(params)
            break;
          case '2': // 외출
            params.eventType=17
            this.getStat(params)
            break;
        }
      },
      getActData(param) {
        let params = {
          phone: this.$route.params.id,
          dateType: param
        }

        switch (param) {
          case 1:
            this.isActiveWeek = true
            this.isActiveMonth = false
            this.isActiveYear = false
            break;
          case 2:
            this.isActiveWeek = false
            this.isActiveMonth = true
            this.isActiveYear = false
            break;
          case 3:
            this.isActiveWeek = false
            this.isActiveMonth = false
            this.isActiveYear = true
            break;
        }
        this.getAct(params)
      },
      getStatData(dateType, eventType) {
        let params = {
          phone: this.$route.params.id,
          dateType: dateType,
          eventType: eventType
        }

        switch (dateType) {
          case 1:
            this.isActiveWeek = true
            this.isActiveMonth = false
            this.isActiveYear = false
            break;
          case 2:
            this.isActiveWeek = false
            this.isActiveMonth = true
            this.isActiveYear = false
            break;
          case 3:
            this.isActiveWeek = false
            this.isActiveMonth = false
            this.isActiveYear = true
            break;
        }
         this.getStat(params)
      }
    }, created() {
      let params = {
        phone: this.$route.params.id,
        dateType: 1
      }
      this.getAct(params)
    },
    watch: {
      phone: function (newVal, oldVal) {
        let params = {
          phone: newVal,
          dateType: 1
        }
        this.select='init'
        this.isActiveWeek = true
        this.isActiveMonth = false
        this.isActiveYear = false
        this.getAct(params)
      }
    }
  }
</script>

<style scoped>

</style>
