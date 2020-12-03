<template>
  <div class="base-dialog">
    <el-dialog :title="formList.title" :visible.sync="dialogFormVisible" @close='closeDialog'>
      <el-form :model="formList">
        <el-form-item :label="formList.nameKey" v-if="formList.type == 0">
          <el-input v-model="formList.nameValue"
                    class="base-dialog-input"
                    autocomplete="off"
                    type="text"
                    placeholder="请输入"
                    maxlength="10"
                    show-word-limit></el-input>
        </el-form-item>
        <el-form-item :label="formList.nameKey" v-else>
          <span>{{formList.nameValue}}</span>
        </el-form-item>
        <el-form-item :label="formList.infoKey">
          <el-input
            class="base-dialog-textarea"
            type="textarea"
            :rows="6"
            :placeholder="formList.placeholder"
            v-model="formList.infoValue"
            :maxlength="formList.maxlength"
            show-word-limit>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "baseDialog",
    props:['formData','dialogShow'],
    watch:{
      dialogShow(newValue){
        this.dialogFormVisible = newValue
      }
    },
    created() {

      if(this.formData){
        var {formList} = this.formData;
      }
      this.formList = formList || {}
    },
    data(){
      return{
        formList:{},
        dialogFormVisible:this.dialogShow
      }
    },
    methods:{
      cancel(){
        this.closeDialog()
        console.log('cancel')
      },
      submit(){
        this.closeDialog()
        console.log('submit')
      },
      closeDialog(){
        this.$emit('dialogHandel',false);
        console.log('closeDialog')
      }
    }
  }
</script>

<style scoped lang="scss">
  .base-dialog{
    &-input{
      width: 276px;
    }
    &-textarea{
      width: 276px;
      padding-top: 10px;
    }
    /deep/.el-dialog{
      width: 400px;
      position: relative;
      padding-bottom: 50px;
      font-size: 14px;
      color: #2C3443;
      .el-form-item__label{
        width: 68px;
        font-weight: bolder;
      }
      .el-input__inner{
        height: 32px;
      }
      &__body{
        padding: 30px 26px
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
      &__footer{
        padding: 0;
        width: 100%;
        position: absolute;
        bottom: 29px;
        text-align: center;
        .el-button{
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
