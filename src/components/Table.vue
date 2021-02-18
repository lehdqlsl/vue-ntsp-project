<template>
  <!--  <table class="table">-->
  <!--    <thead class="thead-light" style="font-weight: bold;">-->
  <!--      <slot name="columns">-->
  <!--        <tr>-->
  <!--          <th v-for="column in columns" :key="column">{{column}}</th>-->
  <!--        </tr>-->
  <!--      </slot>-->
  <!--    </thead>-->
  <!--    <tbody>-->
  <!--    <tr v-for="(item, index) in data" :key="index">-->
  <!--      <slot :row="item">-->
  <!--        <td v-for="column in columns" :key="column" v-if="hasValue(item, column)">{{itemValue(item, column)}}</td>-->
  <!--      </slot>-->
  <!--    </tr>-->
  <!--    </tbody>-->
  <!--  </table>-->
  <div>
    <b-table
      style="width: 100%"
      :items="data"
      :small=true show-empty sticky-header
    >
      <template v-slot:empty="items">
        <label>내역 없음</label>
      </template>
      <template v-slot:cell(인지)="data">
        <a><span v-html="data.value" v-if="data.value == '아니오'" style='color: #ff0000'></span></a>
        <a><span v-html="data.value" v-if="data.value == '예'" style='color: #0ab961'></span></a>
      </template>
      <template  v-slot:cell(장애)="data" v-bind v->
        {{ data.value }}
      </template>
      <template v-slot:cell(처리)="data" v->
        <el-link class="table-font" @click="moveFailureAction(data.item.장애번호)" type="danger" v-html="data.value"
                 v-if="data.value == '미처리'"></el-link>
        <el-link class="table-font" @click="moveFailureAction(data.item.장애번호)" type="primary" v-html="data.value"
                 v-if="data.value == '처리'"></el-link>
      </template>
      <template v-slot:cell(상태)="data" v->
        <el-link class="table-font" @click="moveFailureAction(data.item.장애번호)" type="danger" v-html="data.value"
                 v-if="data.value == '미처리'"></el-link>
        <el-link class="table-font" @click="moveFailureAction(data.item.장애번호)" type="primary" v-html="data.value"
                 v-if="data.value == '해결됨'"></el-link>
      </template>
      <template v-slot:cell(장비번호)="data" v->
        <el-link class="table-font" @click="moveUserInfo(data.item.장비번호)" type="primary" v-html="data.value"></el-link>
      </template>
      <template v-slot:cell(발생시각)="data" v->
        <a href='#'><span v-html="data.value"></span></a>
      </template>
      <template v-slot:cell(처리시각)="data" v->
        <a href='#'><span v-html="data.value"></span></a>
      </template>
      <template v-slot:cell(시각)="data" v->
        <a href='#'><span v-html="data.value"></span></a>
      </template>
      <template v-slot:cell(이벤트번호)="data" v->
        <a href='#'><span v-html="data.value" style="color: #0ab961"></span></a>
      </template>
      <template v-slot:cell(장애번호)="data" v->
        <a href='#'><span v-html="data.value" style="color: #0ab961"></span></a>
      </template>
      <template v-slot:cell(내용)="data" v->
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(처리상태)="data" v->
        {{ data.value }}
      </template>
    </b-table>
  </div>
</template>
<script>
  export default {
    name: 'l-table',
    props: {
      columns: Array,
      data: Array
    },
    data() {
      return {

      }
    },
    methods: {
      moveUserInfo(phone) {
        const {href} = this.$router.resolve({
          path: '/admin/user-info/'+phone.replace(/-|:/g,"")
        });
        window.open(href, '_blank');
      },
      hasValue(item, column) {
        return item[column.toLowerCase()] !== 'undefined'
      },
      itemValue(item, column) {
        return item[column.toLowerCase()]
      },
      moveFailureAction(failureId) {
        if (this.$router.currentRoute.params.id != failureId) {
          this.$router.push({
            name: 'DeviceDetail',
            params: {
              "id": failureId
            }
          })
        }
      },
    },
    mounted() {

    }
    ,
    watch: {
      $route(to, from) {
        const loading = this.$loading({
          lock: true,
          text: '로딩중...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.5)'
        });

        from.matched[1].instances.default.getFailure(to.params.id)
        from.matched[1].instances.default.getFailureAction(to.params.id)
        from.matched[1].instances.default.getFailureList(to.params.id)

        loading.close();
      }
    }
  }
</script>
<style>
  .classObject {
    background-color: #ef8157;
  }

  .table-font {
    font-size: 0.8rem;
  }

</style>
