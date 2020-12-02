<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style lang="scss">
  .tenant-management,.tenant-admin{
    &-header{
      height: 76px;
      background-color: #FFFFFF;
      border-radius: 4px;
      display: flex;
      align-items: center;
      padding-left: 20px;
      button{
        border-radius: 4px;
        background-color: #266CEE;
        width: 88px;
        height: 32px;
        border: none;
        font-size: 14px;
        color: #FFFFFF;
        cursor: pointer;
      }
    }
    &-table{
      background-color: #FFFFFF;
    }
  }
</style>
