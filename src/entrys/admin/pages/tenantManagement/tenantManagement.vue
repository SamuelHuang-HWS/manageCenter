<template>
  <div class="tenant-management">
    <div class="tenant-management-header"><button @click="addTenant">+新增</button></div>
    <div class="tenant-management-table">
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
          tableList:[{
            tenantId:1,
            tenantName:'京东健康',
            ss:'1',
            link:[{value:'www.jd.com'},{value:'www,jdhealth.com'}],
            createTime:'1',
            createMan:'1',
            status:'1'
          }],
          tableHeader:[{
            prop:"tenantId",
            label:"租户ID"
          },{
            prop:"tenantName",
            label:"租户名称"
          },{
            prop:"ss",
            label:"所属租户"
          },{
            prop:"link",
            label:"登录租户链接"
          },{
            prop:"createTime",
            label:"租户ID"
          },{
            prop:"createMan",
            label:"创建人"
          }, {
              prop:"status",
              label:"状态"
            },],
          tableType: 3
        },
        dialogFormVisible:false,
      }
    },
    created() {
      this.tableData['goAdmin'] = this.goAdmin;
    },
    methods:{
      addTenant(){
        console.log('新增用户');
        this.dialogFormVisible = true
      },
      changeDialog(){
        this.dialogFormVisible = false
      },
      goAdmin(){
        this.$router.push('/tenant/admin')
      },
    }
  }
</script>

<style scoped lang="scss">
  .tenant-management{

  }
</style>
