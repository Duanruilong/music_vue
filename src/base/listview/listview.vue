/**
 * 滚动
 * @type {String}
 */
<template>
  <scroll @scroll="scroll"
          :listen-scroll="listenScroll"
          :probe-type="probeType"
          :data="data"
          class="listview"
          ref="listview">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <uL>
          <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </uL>
      </li>
    </ul>
    <!-- 右侧字母导航 stop.prevent阻止事件冒泡和原生滚动-->
    <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove"
         @touchend.stop>
      <ul>
        <li v-for="(item, index) in shortcutList"
            :data-index="index"
            class="item"
            :class="{'current':currentIndex===index}">
            {{item}}
        </li>
      </ul>
    </div>
    <!-- 滚动对应的字母flex定位 -->
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getData} from 'common/js/dom'

  const TITLE_HEIGHT = 30
  const ANCHOR_HEIGHT = 18

  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    computed: { // vue的一个计算属性
      shortcutList() { // titile的集合数组
        return this.data.map((group) => { // 遍历每一个的title
          return group.title.substr(0, 1)
        })
      },
      fixedTitle() {
        if (this.scrollY > 0) { // 边界判断
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '' // 判断有没有title
      }
    },
    data() { // 位置数据
      return {
        scrollY: -1, // 实时的滚动位置
        currentIndex: 0,
        diff: -1
      }
    },
    created() { // 不监听变化
      this.probeType = 3 // 实时滚动---3
      this.listenScroll = true
      this.touch = {}
      this.listHeight = []
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item)
      },
      onShortcutTouchStart(e) { // Touch点击事件 点击时要获得索引“:data-index="index"”
        let anchorIndex = getData(e.target, 'index') // 拿到index
        let firstTouch = e.touches[0] // touches 触碰位置
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex // 当前是第几个

        this._scrollTo(anchorIndex)
      },
      onShortcutTouchMove(e) { // Touch移动事件
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta  // 移动的数据

        this._scrollTo(anchorIndex)
      },
      refresh() {
        this.$refs.listview.refresh()
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      _calculateHeight() { // 计算高度，私有方法
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight // dom可以通过clientHeight获取高度
          this.listHeight.push(height)
        }
      },
      _scrollTo(index) { // 动画缓冲
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) { // 处理index的边界情况
          index = this.listHeight.length - 2
        }
        this.scrollY = -this.listHeight[index] // 定位具体字母位置
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0) // 发生滚动  0=没有滚动动画
      }
    },
    watch: { // 观测变化
      data() { // data 发生变化，延时调用
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      scrollY(newY) {
        const listHeight = this.listHeight
        // 当滚动到顶部，newY>0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        // 在中间部分滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i] // 上限
          let height2 = listHeight[i + 1] // 下限
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            this.diff = height2 + newY
            return
          }
        }
        // 当滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    components: {
      Scroll,
      Loading
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
