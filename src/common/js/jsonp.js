import originJsonp from 'jsonp'

export function jsonp (url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + paramContact(data)
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function paramContact (data) {
  let url = ''
  for (var item in data) {
    let value = data[item] !== undefined ? data[item] : ''
    url += '&' + item + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
