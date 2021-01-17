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
        <a href='#'><span v-html="data.value" v-if="data.value == '아니오'" style='color: #ff0000'></span></a>
        <a href='#'><span v-html="data.value" v-if="data.value == '예'" style='color: #0ab961'></span></a>
      </template>
      <template v-slot:cell(장애)="data" v->
        {{ data.value }}
      </template>
      <template v-slot:cell(처리)="data" v->
        <a href="#" @click="moveFailureAction(data.item.장애번호)">
          <span v-html="data.value" v-if="data.value == '미처리'" style='color: #ff0000'></span>
        </a>
        <a href="#" @click="moveFailureAction(data.item.장애번호)"><span v-html="data.value"
                                                                     v-if="data.value == '처리'"></span></a>

      </template>
      <template v-slot:cell(상태)="data" v->
        <a href="#" @click="moveFailureAction(data.item.장애번호)">
          <span v-html="data.value" v-if="data.value == '미처리'" style='color: #ff0000'></span>
        </a>
        <a href="#" @click="moveFailureAction(data.item.장애번호)"><span v-html="data.value"
                                                                     v-if="data.value == '해결됨'"></span></a>

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
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== 'undefined'
    },
    itemValue(item, column) {
      return item[column.toLowerCase()]
    },
    moveFailureAction(failureId) {
      if (this.$router.currentRoute.name != 'DeviceDetail') {
        this.$router.push({
              name: 'DeviceDetail',
              params: {
                "id": failureId
              }
            }
        )
      } else {
        this.$router.push({
              name: "DeviceDetail",
              hash: failureId,
              params: {
                "id": failureId
              }
            }
        )
      }
    }
  }
}
</script>
<style>
.classObject {
  background-color: #ef8157;
}
</style>
