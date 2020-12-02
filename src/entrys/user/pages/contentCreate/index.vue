<template>
  <div class="content-create">
    <bread-crumb></bread-crumb>
    <div class="wrap">
      <p class="c-title">活跃医生数据</p>
      <div class="content flex flex-wrap-wrap">
        <div class="item flex flex-direction-column justify-content-center align-items-center">
          <img class="tuwen" src="" alt="">
          <p>图文</p>
        </div>
        <div class="item flex flex-direction-column justify-content-center align-items-center">
          <img class="shipin" src="" alt="">
          <p>图文</p>
        </div>
        <div class="item flex flex-direction-column justify-content-center align-items-center">
          <img class="wenda" src="" alt="">
          <p>图文</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import breadCrumb from "../../../../components/breadCrumb";
  export default {
    name: "contentCreate",
    components:{
      breadCrumb
    }
  }
</script>

<style scoped lang="scss">
  .content-create{
    .wrap{
      padding: 22px 26px;
      background: white;
      border-radius: 4px;
      .content{
        margin-top: 30px;
        .item{
          width: 180px;
          height: 180px;
          background: rgba(255,255,255,1);
          border: 1px solid rgba(237,240,246,1);
          border-radius: 4px;
          margin-right: 20px;
          .tuwen{
            width: 40px;
            height:40px;
            margin-bottom: 26px;
          }
          .shipin{
            width: 42px;
            heihght:36px;
            margin-bottom: 28px;
          }
          .wenda{
            width: 40px;
            height: 37px;
            margin-bottom: 27px;
          }
        }
      }
    }
  }
</style>
