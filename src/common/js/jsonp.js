import originJsonp from 'jsonp'
/**
 * jsonp封装
 * @param  {[type]}                url
 * @param  {[type]}                data
 * @param  {[type]}                option
 * @return {[type]}                       [description]
 * @author DRLong
 * @date   2018-03-11T21:42:21+080
 */
export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)// 成功
      } else {
        reject(err)// 失败
      }
    })
  })
}

export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
    // url += `&${k}=${encodeURIComponent(value)}`  //es6
  }
  return url ? url.substring(1) : ''
}
