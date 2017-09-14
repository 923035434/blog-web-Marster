import axios from 'axios'

export function addBlog (formData) {
  const url = '/api/blog'
  return axios({
    method: 'post',
    url: url,
    data: formData
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
