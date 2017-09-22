import {jsonp} from '../common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getSearchSinger (singerName) {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg'

  const data = Object.assign({}, commonParams, {
    is_xml: 0,
    key: singerName
  })

  return jsonp(url, data, options)
}

export function getSearchSong (songName) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp'

  const data = Object.assign({}, commonParams, {
    ct: 24,
    qqmusic_ver: 1298,
    new_json: 1,
    remoteplace: 'txt.yqq.center',
    searchid: 42812062247912150,
    t: 0,
    aggr: 1,
    cr: 1,
    catZhida: 1,
    lossless: 0,
    flag_qc: 0,
    p: 1,
    n: 20,
    w: songName
  })

  return jsonp(url, data, options)
}

export function getSinger () {
  const url = '/api/Singer'
  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function addSinger (param) {
  const url = '/api/Singer'
  return axios({
    url: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: param
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function deleteSinger (id) {
  const url = '/api/Singer'
  return axios({
    url: url + '?id=' + id,
    method: 'DELETE'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongForSinger (singerId) {
  const url = '/api/singer/' + singerId + '/song'
  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function addSong (param) {
  const url = '/api/Song'
  return axios({
    url: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: param
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function deleteSong (id) {
  const url = '/api/Song'
  return axios({
    url: url + '?id=' + id,
    method: 'DELETE'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
