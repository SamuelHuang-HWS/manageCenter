<template>
  <div class="menu-management">
    <base-table :tableData="tableData"></base-table>
  </div>
</template>

<script>
  import baseTable from "../../../../components/baseTable";
  export default {
    name: "menuManagement",
    components:{
      baseTable,
    },
    data(){
      return{
        tableData:{
          tableHeader:[{
            prop:'menuId',
            label:'菜单ID',
          },{
            prop:'menuName',
            label:'菜单名称',
          },{
            prop:'hierarchy',
            label:'层级',
          },{
            prop:'createTime',
            label:'创建时间',
          },{
            prop:'createMan',
            label:'创建人',
          },],
          tableList:[{
            menuId:'1',
            menuName:'京东健康',

          }],
          tableType:1,
        }
      }
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
