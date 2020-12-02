<template>
  <div class="fade" v-if="isShow">
    <div class="modal" :style="{ 'width': width, 'height': modelHeight }">
      <div class="modal-header">
        <span>{{title}}</span>
        <img class="modal-close" src="../assets/default-header.png" @click.stop="close" v-if="isShowClose" alt="">
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer" v-if="btnText.length > 0">
        <div class="btn-list">
          <ds-button class="marRight10" :type="types[0]||'default'" @click="clickHandler('one')" v-if="isShowBtn[0]">{{btnText[0]}}</ds-button>
          <ds-button class="marRight10" :type="types[1]||'submit'" @click="clickHandler('two')" v-if="isShowBtn[1]">{{btnText[1]}}</ds-button>
          <ds-button :type="types[2]||'submit'" @click="clickHandler('three')" v-if="isShowBtn[2]">{{btnText[2]}}</ds-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import dsButton from './button.vue'
  import { lockMaskScroll } from "@/utils/tools"
  export default {
    name: 'ds-modal',
    data(){
      return {
        modelHeight:'auto'
      }
    },
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      isShowClose: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      },
      btnText:{
        type:Array,
        default:function () {
          return []
        }
      },
      types:{
        type:Array,
        default:function () {
          return ['default','submit','submit']
        }
      },
      isShowBtn:{
        type:Array,
        default:function () {
          return []
        }
      },
      width:{
        type: String,
        default: '400px'
      },
      height:{
        type: String,
        default: 'auto'
      }
    },
    components: {
      dsButton
    },
    methods: {
      clickHandler (flag) {
        this.$emit(flag)
      },
      open () {
        this.$emit('update:isShow', true)
        lockMaskScroll.afterOpen()
      },
      close(){
        lockMaskScroll.beforeClose()
        this.$emit('update:isShow', false)
      },
      calcHeight(){
        if(this.height){
          if(/px/.test(this.height)){
            this.modelHeight = this.height
          }else if(/\./.test(this.height)){
            this.modelHeight = window.innerHeight*parseFloat(this.height)+'px'
          }
        }else{
          this.modelHeight = 'auto'
        }
      }
    },
    mounted(){
      this.calcHeight()
    },
    watch:{
      isShow(val){
        this.calcHeight()
      }
    }
  }
</script>
<style lang="scss">
  .fade{
    width:100%;
    height:100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(46,46,46,0.60);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:100;
  }
  .modal{
    overflow: hidden;
    background: #FFFFFF;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    .modal-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height:46px;
      padding:0 19px 0 20px;
      background: #F7F8FB;
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      font-weight: bold;
      color: rgba(51,56,64,1);
      letter-spacing: 0;
      .modal-close{
        width:9px;
        height:9px;
        cursor: pointer;
      }
    }
    .modal-body{

    }
    .modal-footer{
      display: flex;
      justify-content: center;
      padding:20px;
      .btn-list{
        font-size: 14px;
        .marRight10{
          margin-right: 10px;
        }
      }
    }
  }
</style>
