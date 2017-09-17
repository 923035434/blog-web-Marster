import axios from 'axios'

export function getMessages () {
  const url = '/api/Message'
  return axios({
    method: 'Get',
    url: url
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function deleteMessage (id) {
  const url = '/api/Message'
  return axios({
    method: 'Delete',
    url: url,
    params: {
      id: id
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
