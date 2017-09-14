import axios from 'axios'

export function getBaseInfo () {
  const url = '/api/BlogSetting/BaseInfo'
  return axios({
    method: 'GET',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    }.then((res) => {
      return Promise.resolve(res.data)
    })
  })
}
export function editBaseInfo (param) {
  const url = '/api/BlogSetting/BaseInfo'
  return axios({
    method: 'PUT',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    data: param
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getMImg (param) {
  const url = '/api/BlogSetting/M_BgImg'
  return axios({
    method: 'GET',
    url: url,
    data: param
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function editMImg (param) {
  const url = '/api/BlogSetting/M_BgImg'
  return axios({
    method: 'PUT',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    data: param
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
