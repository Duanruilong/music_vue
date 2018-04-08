import {commonParams} from './config'
import axios from 'axios'
/** 
 * javascript comment 
 * @Author: drl 
 * @Date: 2018-04-09 00:02:29 
 * @Desc: 获取歌词接口 
 */
export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json',
    g_tk: 447086842
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}