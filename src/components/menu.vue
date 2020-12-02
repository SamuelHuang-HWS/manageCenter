<template>
  <div class="cMenu">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      active-text-color="#266CEE"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <img class="el-menu-icon" src="@/assets/home.png" alt="">
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-submenu class="el-threemenu" index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <img class="el-menu-icon" src="@/assets/home.png" alt="">
        <span>导航一</span>
      </el-menu-item>
      <el-menu-item index="3">
        <img class="el-menu-icon" src="@/assets/home.png" alt="">
        <span>导航一</span>
      </el-menu-item>
      <el-menu-item index="4">
        <img class="el-menu-icon" src="@/assets/home.png" alt="">
        <span>导航一</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "cMenu",
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped lang="scss">
  .cMenu{
    width: 180px;
    height: 100%;
    background: white;
    .el-menu-item{
      height:50px;
      line-height: 50px;
    }
    .el-menu-icon{
      width: 16px;
      height:16px;
      margin-right: 10px;
    }
    /deep/ .el-submenu{
      .el-submenu__title{
        height: 50px;
        line-height: 50px;
      }
      .el-menu-item-group__title{
        display: none;
      }
      .el-menu-item{
        width: 100%;
        box-sizing: border-box;
        padding:0 0 0 46px !important;
        min-width: 100% !important;
      }
    }
    /deep/ .el-threemenu{
      .el-submenu__title{
        padding-left: 46px !important;
      }
    }
  }
</style>
