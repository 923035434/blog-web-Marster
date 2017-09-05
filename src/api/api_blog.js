import axios from 'axios'

const url = '/api/blog'

export function addBlog (formData) {
  return axios.post({
    method: 'post',
    url: url,
    data: formData
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
