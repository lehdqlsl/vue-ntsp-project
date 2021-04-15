<template>
  <card>
    <h4 class="card-title" style="margin-bottom: 10px;">장비 목록</h4>
    <div style="margin-bottom: 10px">
      <el-row>
        <el-col :span="5">
          <el-button @click="onCreate">create 1 row</el-button>
          <el-button @click="bulkDelete">bulk delete</el-button>
        </el-col>
        <el-col :span="12">
          <el-select v-model="filters[1].value" placeholder="select type">
            <el-option label="All" value=""></el-option>
            <el-option label="Repair" value="repair"></el-option>
            <el-option label="Help" value="help"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="search NO." v-model="filters[0].value"></el-input>
        </el-col>
      </el-row>
    </div>

    <data-tables :data="data" :action-col="actionCol" :filters="filters" @selection-change="handleSelectionChange">
      <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.prop"
                       sortable="custom">
      </el-table-column>
    </data-tables>
  </card>
</template>

<script>
  export default {
    components: {},
    data() {
      return {

      }
    },
    methods: {
      onCreate() {

      },
      handleSelectionChange(val) {
        this.selectedRow = val
      },
      bulkDelete() {
        this.selectedRow.map(row => {
          this.data.splice(this.data.indexOf(row), 1)
        })
        this.$message('bulk delete success')
      }
    }
  }
</script>
<style>
  .el-pagination {
    margin-top : 10px;
  }

  .nav-tabs .nav-link {
    padding: 0.6rem 0 0.6rem 0
  }
</style>
