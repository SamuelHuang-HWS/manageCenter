<template>
  <div class="cHeader flex justify-content-space-between align-items-center">
    <img src="@/assets/header.png" alt="logo" class="left-logo">
    <div class="user-info flex align-items-center">
      <div class="headerPic-wrap flex align-items-center justify-content-center">
        <img src="@/assets/header.png" alt="headPic">
      </div>
      <span>Hello,</span>
      <span>雷克斯</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "cHeader"
  }
</script>

<style scoped lang="scss">
  .cHeader{
    padding: 0 26px 0 28px;
    height:70px;
    width: 100%;
    background: white;
    box-shadow: 0px 4px 12px 0px rgba(0,0,0,0.08);
    box-sizing: border-box;
    flex-shrink: 0;
    .left-logo{
      width:320px;
      height:32px;
    }
    .user-info{
      .headerPic-wrap{
        height:40px;
        width: 40px;
        border:2px solid red;
        border-radius: 20px;
        margin-right: 12px;
        img{
          width: 30px;
          height:30px;
          border-radius: 15px;
        }
      }
      span{
        font-size: 14px;
        color: rgba(139,140,154,1);
        &:first-child{
          font-family: PingFangSC-Regular;
          color: rgba(139,140,154,1);
        }
        &:last-child{
          font-family: PingFangSC-Semibold;
          color: rgba(23,23,38,1);
        }
      }

    }
  }
</style>
