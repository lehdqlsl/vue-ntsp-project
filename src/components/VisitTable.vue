<template>
  <div>
    <b-table
      style="width: 100%"
      :items="data"
      :small=true show-empty sticky-header
    >
      <template v-slot:empty="items">
        <label>내역 없음</label>
      </template>

      <template v-slot:cell(방문번호)="data" v->
        <a href='#'><span v-html="data.value" style="color: #0ab961"></span></a>
      </template>

      <template v-slot:cell(장비번호)="data" v->
        <el-link class="table-font" @click="moveUserInfo(data.item.장비번호)" type="primary" v-html="data.value"></el-link>
      </template>

      <template v-slot:cell(방문시각)="data" v->
        <span v-html="data.value"></span>
      </template>

      <template v-slot:cell(ID)="data" v->
        <a href='#'><span v-html="data.value"></span></a>
      </template>

      <template v-slot:cell(방문자)="data" v->
        <a href='#'><span v-html="data.value"></span></a>
      </template>
    </b-table>
  </div>
</template>
<script>
  export default {
    name: 'visit-table',
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
      }
    },
    mounted() {

    },
    watch: {

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
