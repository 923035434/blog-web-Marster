export default class Singer {
  constructor (id, singerId, name, img) {
    this.id = id
    this.singerId = singerId
    this.name = name
    this.img = img
  }
}

export function createSingerForSearchData (data) {
  let imgUrl = 'https://y.gtimg.cn/music/photo_new/T001R300x300M000' + data.mid + '.jpg?max_age=2592000'
  let singer = new Singer(-1, data.mid, data.name, imgUrl)
  return singer
}

export function createSingerListForSearchData (data) {
  let list = []
  for (var item in data) {
    let imgUrl = 'https://y.gtimg.cn/music/photo_new/T001R300x300M000' + data[item].mid + '.jpg?max_age=2592000'
    list.push(new Singer(-1, data[item].mid, data[item].name, imgUrl))
  }
  return list
}

export function createSingerListForData (data) {
  let list = []
  for (var item in data) {
    list.push(new Singer(data[item].id, data[item].singerId, data[item].name, data[item].img))
  }
  return list
}
