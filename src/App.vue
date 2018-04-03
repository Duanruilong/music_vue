/**
 * keep-alive  标签可以缓存DOM 优化页面
 * @type {String}
 */
<template>
  <div id="app" @touchmove.prevent>
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import Player from 'components/player/player' // 任何路由下都可以运行
  import Tab from 'components/tab/tab'

  export default {
    components: {
      MHeader,
      Tab,
      Player
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
