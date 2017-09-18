import axios from 'axios'

export function getBlogs () {
  const url = '/api/blog'
  return axios({
    method: 'get',
    url: url
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function addBlog (formData) {
  const url = '/api/blog'
  return axios({
    method: 'post',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    data: formData
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getType () {
  const url = 'api/blogType'
  return axios({
    url: url,
    method: 'get'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function addType (param) {
  const url = 'api/blogType'
  return axios({
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: param
  }).them((res) => {
    return Promise.resolve(res.data)
  })
}
