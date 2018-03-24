import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
/**
 * store 的初始化,
 * Vuex----->很好的处理了子路由之间的数据传递问题
 * @type {[type]}
 */

 // createLogger会有一条修改日志
Vue.use(Vuex)
 // 调试工具，开启vuex的严格模式，只是在本地调试使用，会很消耗内存；webpage的时候是production
const debug = process.env.NODE_ENV !== 'production'
 // export 一个Vuex.Store实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
