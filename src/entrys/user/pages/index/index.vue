<template>
  <div class="index">
    <div class="doctor-info flex">
<!--      <img src="@/assets/default-header.png" alt="头像">-->
      <div class="info" v-if="!qx">
        <p class="title">京东健康</p>
        <p class="text">简介：京东健康于2019年5月10日正式宣布独立运营。依托京东集团的各项能力和资源优势，京东健康在目前医药健康电商、互联网医疗、健康服务、智慧解决方案四个业务版块基础上，逐步完善其“互联网+医疗健康”的产业布局，成为健康产业业务版块基础上，逐步完善其“互联网+医疗健康”的产业布局，成为健康产业两行展示……</p>
      </div>
      <div class="info no-pass" v-if="qx">
        <p class="title">未认证游客</p>
        <p class="text"><span class="re-certification">立即认证，</span>审核通过后开始创作</p>
        <p class="text">审核中，2-3个工作日审核通过</p>
        <p class="text" v-if="qx">审核未通过，<span class="re-certification">重新认证</span></p>
      </div>
    </div>
    <div class="item">
      <p class="c-title">消息中心</p>
      <div class="no-data flex flex-direction-column justify-content-center align-items-center">
<!--        <img src="@/assets/message.png" alt="托底图片">-->
        <p>暂无消息</p>
      </div>
    </div>
    <div class="item">
      <p class="c-title">数据看板</p>
      <div class="no-data flex flex-direction-column justify-content-center align-items-center">
<!--        <img src="@/assets/data.png" alt="托底图片">-->
        <p>功能开发中，敬请期待</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return{
        qx:true
      }
    }
  }
</script>

<style scoped lang="scss">
  .index{
    width: 100%;
    .doctor-info{
      height:140px;
      background: white;
      padding: 30px;
      margin-bottom: 20px;
      border-radius: 4px;
      img{
        width: 80px;
        height: 80px;
        border-radius: 40px;
      }
      .info{
        margin-left: 30px;
        p{
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: rgba(95,95,107,1);
        }
        .title{
          font-family: PingFangSC-Semibold;
          font-size: 18px;
          color: rgba(51,56,64,1);
          margin-bottom: 12px;
        }
        .text{
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box; // 作为弹性伸缩盒子模型显示。
          -webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式--从上到下垂直排列
          -webkit-line-clamp: 2; // 显示的行
        }
      }
      .no-pass{
        .title{
          margin-bottom: 32px;
        }
        .re-certification{
          color: #266CEE;
        }
      }
    }
    .item{
      height:235px;
      background: white;
      padding: 22px 0 20px 26px;
      margin-bottom: 20px;
      border-radius: 4px;
      .no-data{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: rgba(156,168,185,1);
        height:100%;
        img{
          width: 170px;
          height:115px;
          margin-bottom: 28px;
        }
      }
    }
  }
</style>
