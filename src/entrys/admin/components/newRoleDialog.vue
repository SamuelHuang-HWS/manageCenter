<template>
  <div class="role-dialog">
    <el-dialog title="新增角色" :visible.sync="dialogVisible" @close='closeDialog'>
      <el-form :model="form" :rules="rules" >
        <el-form-item class="management-id" label="管理员账号" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" class="manage-id" placeholder="内部员工ERP/外部京东PIN"></el-input>
        </el-form-item>
        <div class="menu-permissions">
          <div class="menu-permissions-left">
            <span class="menu-permissions-icon">*</span><span>设置租户管理员菜单权限</span>
          </div>
          <div class="menu-permissions-right">
            <div class="content">
              <div class="menu-permissions-right-box" v-for="(item,index) in 5">
                <el-checkbox v-model="index" class="check-box">备选项</el-checkbox>
                <div v-for="(citem,index) in 3">
                  <el-checkbox v-model="index" class="check-box-child">备选项</el-checkbox>
                </div>
              </div>
            </div>
            <!--          <div class="menu-permissions-right-box"></div>-->
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "newRoleDialog",
    props:['dialogFormVisible','formData'],
    watch:{
      dialogFormVisible(newValue,oldValue){
        console.log(newValue)
        this.dialogVisible  = newValue;
      }
    },
    data(){
      return{
        form: {
          name: '',
        },
        formLabelWidth: '120px',
        dialogVisible:false,
        rules: {
          name: [
            { required: true, message: '请输入管理员账号', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    created() {
    },
    methods:{
      cancel(){
        this.closeDialog();
      },
      closeDialog(){
        this.dialogVisible = false;
        this.$emit('changeDialog',false)
      },
      submit(){

      }
    }
  }
</script>

<style scoped lang="scss">
  .role-dialog{
    /deep/.el-dialog{
      width: 722px;
      height:502px;
      position: relative;
      &__header{
        background-color: #F7F8FB;
        height: 46px;
        display: flex;
        align-items: center;
        .el-dialog__title{
          font-size: 16px ;
          color: #333840;
          font-weight: bolder;
        }
      }
      .management-id{
        margin-left: 60px;
      }
      .manage-id{
        width: 276px;
        height: 32px;
      }
      .menu-permissions{
        display: flex;
        &-left{
          padding-top: 26px;
        }
        &-right{
          .content{
            position: absolute;
            width: 440px;
            overflow-x: hidden;
            overflow-y: scroll;
            padding: 0;
            margin-top: 26px;
            left: 0;
            top: 0;
            right: -17px;
            bottom: 0;
            display: flex;
            flex-flow: row wrap;
            align-content: flex-start;
            .check-box{
              margin-left: 10px;
              &-child{
                margin-top: 15px;
                margin-left: 30px;
              }
            }
          }
          position: relative;
          overflow: hidden;
          width: 420px;
          height: 300px;
          &-box{
            width: 100px;
            flex: 0 0 50%;
            height: 150px;
          }
        }
        &-icon{
          color: #F56C6C;
          margin-right: 2px;
          margin-left: 10px;
        }
      }
      &__footer{
        padding: 0;
        width: 100%;
        position: absolute;
        bottom: 29px;
        text-align: center;
        .el-button{
          border-radius: 0;
          width: 70px;
          height: 34px;
          line-height: 10px;
          &--primary{
            background-color:dodgerblue;
            border-color: dodgerblue;
          }
        }
      }

    }
  }
</style>
