<template>
  <div class="personal-center">
    <div class="personal-center-title">
      <span></span>基本信息
    </div>
    <div class="personal-center-from">
      <div class="personal-center-from-left">
        <p><span class="title">作者姓名</span> <span class="value">{{authorName}}</span></p>
        <p><span class="title">作者角色</span> <span class="value">{{authorRole}}</span></p>
        <p><span class="title">账号简介</span> <span class="value">{{accountProfile}}</span></p>
        <p><span class="title">稿件样例</span> <span class="value">{{contribution}}</span></p>
        <p><span class="title">关联业务</span> <span class="value">{{business}}</span></p>
      </div>
      <div class="personal-center-from-right">
        <div class="personal-center-from-right-top">
          <div class="font">头像</div>
          <div class="img">
            <div class="demo-basic--circle">
              <div class="block"><el-avatar :size="70" :src="imgUrl"></el-avatar></div>
            </div>
            <div class="upload">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">上传头像</el-button>
              </el-upload>
            </div>

          </div>
        </div>
        <div class="personal-center-from-right-bottom">
          <i class="el-icon-warning"></i>
          建议尺寸不低于180*180像素，大小不超过1M
        </div>

      </div>
    </div>
    <div class="personal-center-footer">
      <div class="personal-center-footer-button">
        <button @click="goUpdate">修改</button>
      </div>
      <div class="personal-center-footer-info">
        <span>*个人信息修改后，需重新审核，会在48小时内反馈</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "detail",
    data(){
      return{
        imgUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        authorName:'京东健康',
        authorRole:'业务运营',
        accountProfile:'家庭首席健康管家',
        contribution:'https://portal1.jd.com:8445/PortalServer/customize',
        business:'京东健康',
        fileList:[],
      }
    },
    methods:{
      handleRemove(){

      },
      beforeRemove(){},
      handleExceed(){},
      handlePreview(){},
      goUpdate(){
        this.$router.push({
          path:'/personalCenter/update'
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .personal-center{
    &-title{
      span{
        display: inline-block;
        height: 10px;
        border: 1.5px solid #1D61FF;
        margin-right: 5px;
      }
      color: #2E3646;
      font-size: 14px;
      font-weight: bold;
    }
    &-from{
      padding: 10px;
      display: flex;
      &-left{
        flex-grow: 3;
        p{
          margin-top: 32px;
          .title{
            color: #8B8C9A;
          }
          .value{
            margin-left: 15px;
          }
        }
      }
      &-right{
        flex-grow: 1;
        color: #2C3443;
        &-top{
          display: flex;
          .font{
            flex-grow: 0.5;
            padding: 10px;
          }
          .img{
            flex-grow: 2;
            .block{
              width: 84px;
              border: 1px dashed #8B8C9A;
              height: 84px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 50%;
            }
            .upload{
              /deep/.el-button--primary{
                background-color: #1D61FF;
              }
              margin-top: 10px;
            }
          }
        }
        &-bottom{
          margin-top: 22px;
          color: #FF9B39;
        }
      }
    }
    &-footer{
      padding: 10px;
      margin-top: 40px;
      &-button{
        button{
          background-color: #1D61FF;
          color: #FFFFFF;
          border: none;
          border-radius: 2px;
          width: 60px;
          height: 30px;
          cursor: pointer;
        }
      }
      &-info{
        margin-top: 10px;
        color: #9CA8B9;
      }
    }
  }
</style>
