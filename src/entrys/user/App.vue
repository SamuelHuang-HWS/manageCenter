<template>
  <div id="app" class="flex flex-direction-column">
    <c-header></c-header>
    <div class="line"></div>
    <div class="wrap flex">
      <c-menu></c-menu>
        <div class="content">
          <router-view></router-view>
        </div>

    </div>
  </div>
</template>

<script>
import cHeader from '../../components/header.vue'
import cMenu from '../../components/menu.vue'

export default {
  name: 'App',
  components: {
    cHeader,
    cMenu
  }
}
</script>

<style lang="scss">
  #app {
    height:100%;
  }
  .line{
    height:1px;
    background: rgba(223,223,233,1);
  }
  .wrap{
    height:100%;
    margin-top: 1px;
    overflow: hidden;
  }
  .content{
    padding: 26px 26px 18px 26px;
    flex: 1;
    overflow: auto;
  }
</style>
