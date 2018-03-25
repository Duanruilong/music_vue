import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
/**
 * 歌手页面  接口
 * @return {[type]}                [description]
 * @author DRLong
 * @date   2018-03-13T00:40:13+080
 */
export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 614208872
  })

  return jsonp(url, data, options)
}

export function getSingerDetail(singerId) { // getSingerDetail获取歌手的详情数据
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1,
    singermid: singerId,
    g_tk: 614208872
  })

  return jsonp(url, data, options)
}
