<template>
  <div class="bread-crumb flex align-items-center">
    <span>当前位置：</span>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">创作中心</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">内容创作</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: "breadCrumb"
  }
</script>

<style scoped lang="scss">
  .bread-crumb{
    font-family: PingFangSC-Regular;
    color: rgba(124,132,149,1);
    font-size: 13px;
    margin-bottom:20px;
    /deep/ .el-breadcrumb__item{
      font-family: PingFangSC-Regular;
      font-size: 13px;
      color: rgba(124,132,149,1);
      .is-link {
        font-weight: normal;
        color: rgba(124,132,149,1);
      }
      &:last-child{
        .is-link {
          color: rgba(76,84,99,1);
        }
      }
    }
  }
</style>
