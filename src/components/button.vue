<template>
  <button
    :class="type"
    @click="clickHandler"
  >
    <slot></slot>
  </button>
</template>
<script>
  export default {
    name: 'ds-button',
    props: {
      type: {
        type: String,
        default: ''
      }
    },
    components: {

    },
    computed: {

    },
    methods: {
      clickHandler () {
        this.$emit('click')
      }
    }
  }
</script>
<style lang="scss">
  button{
    background: #FFFFFF;
    border-radius: 4px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    letter-spacing: 0;
    line-height: 14px;
    padding: 9px 20px;
    display: inline-block;
    cursor: pointer;
    box-sizing: border-box;
    height: 32px;
    box-shadow: 0 2px 4px 2px rgba(0,0,0,0.04);
  }
  .default{
    color: #5F5F6B;
    background: #FCFDFF;
    border: 1px solid #D8DCE5;
  }
  .primary{
    color: #4381E5;
    border: 1px solid #4381E5;
  }
  .submit{
    color: #FFFFFF;
    background: $color;
    border: none;
  }
  .reset{
    color: #989CA5;
    background: #F9FBFF;
    border: 1px solid #D8DCE5;
  }
</style>
