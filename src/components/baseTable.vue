<template>
  <div class="base-table">
    <div class="base-table-table">
      <el-table
        :data="tableList"
        style="width: 100%"
        stripe>
        <template v-for="(item) in tableHeader">
          <el-table-column
            v-if="item.label == '租户登录链接'"
            :label="item.label"
          >
            <template slot-scope="scope">
              <div>
                {{scope}}
              </div>
            </template>
          </el-table-column>
            <el-table-column
              :prop="item.prop"
              :label="item.label"
            >
            </el-table-column>
        </template>
        <template v-if="tableType !== 0">
          <el-table-column
            align="center"
            label="操作"
            width="250"
          >
            <template slot-scope="scope">
              <div v-if="tableType == 1">
                <el-button @click="handleClick(scope.row)" type="text" size="small">管理子集</el-button>
                <span class="border"></span>
                <el-button type="text" size="small">取消管理员权限</el-button>
              </div>
              <div v-else-if="tableType == 2">
                <el-button @click="handleClick(scope.row)" type="text" size="small">管理子集</el-button>
              </div>
              <div v-else-if="tableType == 3">
                <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                <span class="border"></span>
                <el-button type="text" size="small" @click="tableData.goAdmin">租户管理员</el-button>
                <span class="border"></span>
                <el-button type="text" size="small">取消用户权限</el-button>
              </div>
            </template>
          </el-table-column>
        </template>

      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'baseTable',
    props:['tableData'],
    data(){
      return{
        tableList:[],
        tableHeader:[],
        tableType: '',
      }
    },
    methods:{
      handleClick(){},
    },
    created() {
      if(this.tableData){
        var {tableList,tableHeader,tableType} = this.tableData;
      }
      this.tableList = tableList || [];
      this.tableHeader = tableHeader || [];
      this.tableType = tableType || 0;
    }
  }
</script>

<style scoped lang="scss">
  .base-table {
    background-color: #ffffff;
    padding: 20px;
    margin-top: 15px;
    border-radius: 3px;

    &-table {
      border: solid 1px #E7EFF8;
      border-bottom: none;

      /deep/ .el-table thead th {
        height: 54px;
        font-size: 14px;
        padding: 0px 10px 0px 10px;
        color: #5D6072;
        font-weight: bold;
        background: #FAFBFD !important;
      }

      /deep/ .el-table__body td, .el-table__body th {
        height: 68px;
        padding: 0px 10px 0px 10px;
        color: #757575;
        font-size: 12px;
      }
      /deep/.el-table--striped .el-table__body tr.el-table__row--striped td{
        background-color: #FAFBFD;
      }
      .border {
        margin: 0 5px 0;
        display: inline-block;
        height: 8px;
        width: 1px;
        /*background-color: black;*/
        border: 0.9px solid #266CEE;
      }
      .delete {
        color: #F62458;
      }
    }
  }
</style>
