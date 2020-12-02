<template>
  <div class="tenant-admin">
    <div class="tenant-admin-header"><button @click="addTenant">+新增</button></div>
    <div class="tenant-admin-table">
      <base-table :tableData="tableData"></base-table>
    </div>
    <new-role-dialog :dialogFormVisible="dialogFormVisible" @changeDialog="changeDialog"></new-role-dialog>
  </div>
</template>

<script>
  import baseTable from "../../../../components/baseTable";
  import newRoleDialog from "../../components/newRoleDialog";
  export default {
    name: "tenantManagement",
    components:{
      baseTable,
      newRoleDialog
    },
    data(){
      return{
        tableData:{
          tableList:[],
          tableHeader:[],
          tableType:0
        },
        dialogFormVisible:false,
      }
    },
    methods:{
      addTenant(){
        console.log('新增用户');
        this.dialogFormVisible = true
      },
      changeDialog(){
        this.dialogFormVisible = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .tenant-admin{

  }
</style>
