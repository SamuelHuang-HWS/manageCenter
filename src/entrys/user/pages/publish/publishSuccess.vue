<template>
  <div class="publish-article-success">
    <p class="title">发布文章</p>
    <div class="content flexs flex-column middle-a flex-center">
      <img src="~_img/publish-success.png" alt="">
      <p class="tips">提交成功</p>
      <p class="sub-tips">恭喜您的文章提交成功，2个工作日内完成审核</p>
      <div class="btns flexs flex-center">
        <router-link :to="{path:'/publish'}">
          <el-button class="publish">继续发布</el-button>
        </router-link>
        <router-link :to="{path:'/content'}">
          <el-button class="list">去文章列表</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "publishSuccess"
  }
</script>

<style lang="scss" scoped>
.publish-article-success{
  background: #ffffff;
  .title{
    height:60px;
    line-height: 60px;
    width: 100%;
    padding-left:30px ;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: rgba(38,38,38,1);
    border-bottom: 2px solid rgba(227,232,235,1);
  }
  .content{
    min-height: 504px;
    img{
      width:120px;
      height:120px;
    }
    .tips{
      font-family: PingFang-SC-Medium;
      font-size: 20px;
      color: rgba(0,0,0,1);
      margin-top: 8px;
    }
    .sub-tips{
      margin-top: 12px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: rgba(95,95,107,1);
    }
    .btns{
      width: 100%;
      margin-top: 30px;
      .el-button{
        width: 95px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border-radius: 2px;
        font-family: PingFang-SC-Regular;
        font-size: 14px;
        padding: 0;
        &.publish{
          background: rgba(249,249,249,1);
          border: 1px solid rgba(216,220,229,1);
          color: rgba(38,38,38,1);
        }
        &.list{
          margin-left: 15px;
          background: rgba(255,110,0,1);
          color: rgba(255,255,255,1);
          border: none;
        }
      }
    }
  }
}
</style>
