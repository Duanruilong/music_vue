/**
 * 滚动  Scroll组件抽象
 * @type {String}
 */
<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: { // 声明一些变量，包括变量的类型
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: { // 监听scroll滚动事件
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, { // scroll初始化
          probeType: this.probeType,
          click: this.click
        })

        if (this.listenScroll) { // 监听了scroll事件
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos) // scroll事件
          })
        }

        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() { // 方法代理
        this.scroll && this.scroll.disable()
      },
      enable() { // 方法代理
        this.scroll && this.scroll.enable()
      },
      refresh() { // 刷新scroll
        this.scroll && this.scroll.refresh()
      },
      scrollTo() { // 滚动到位置
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: { // watch data变化，去重新计算scroll
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
