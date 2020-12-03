<template>
  <div class="role-dialog">
    <el-dialog title="新增角色" :visible.sync="dialogVisible" @close='closeDialog'>
      <el-form :model="form" :rules="rules" >
        <el-form-item class="management-id" label="角色名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" class="manage-id" placeholder="不超过十个汉字"></el-input>
        </el-form-item>
        <el-form-item class="management-id" label="角色类型" :label-width="formLabelWidth" prop="name">
          <el-select v-model="form.name" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <div class="menu-permissions">
          <div class="menu-permissions-left">
            <span class="menu-permissions-icon">*</span><span>设置角色菜单权限</span>
          </div>
          <div class="menu-permissions-right role">
            <div class="content">
              <div class="menu-permissions-right-box" v-for="(item,index) in 5">
                <el-checkbox v-model="index" class="check-box">备选项</el-checkbox>
                <div v-for="(citem,index) in 3">
                  <el-checkbox v-model="index" class="check-box-child">备选项</el-checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="menu-permissions">
          <div class="menu-permissions-left">
            <span class="menu-permissions-icon">*</span><span>关联业务</span>
          </div>
          <div class="menu-permissions-right rolebox">
            <div class="content">
              <div class="menu-permissions-right-rolebox" v-for="(item,index) in 5">
                <el-checkbox v-model="index" class="check-box">备选项</el-checkbox>
              </div>
            </div>
          </div>
        </div>

        <div class="menu-permissions">
          <div class="menu-permissions-left">
            <span class="menu-permissions-icon">*</span><span>设置角色内容权限</span>
          </div>
          <div class="menu-permissions-right rolebox">
            <div class="content">
              <div class="menu-permissions-right-rolebox" v-for="(item,index) in 2">
                <el-checkbox v-model="index" class="check-box">备选项</el-checkbox>
              </div>
            </div>
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
      /*height:502px;*/
      padding-bottom: 50px;
      position: relative;
      .el-input__inner{
        height: 32px;
      }
      .el-input--suffix{
        width: 276px !important;
      }
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
        margin-top: 10px;
      }
      .manage-id{
        width: 276px;
        height: 32px;
      }
      .menu-permissions{
        display: flex;
        &-left{
          width: 170px;
          padding-top: 26px;
          text-align: right;
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
          &.role{
            height: 300px;
          }
          &.rolebox{
            height: 80px;
          }
          &-box{
            width: 100px;
            flex: 0 0 50%;
            height: 150px;
          }
          &-rolebox{
            width: 100px;
            flex: 0 0 50%;
            height: 30px;
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
