import {createSingerForSearchData} from './singer'
export default class Song {
  constructor (id, musicId, name, singer, imgUrl, albumName, url) {
    this.id = id
    this.musicId = musicId
    this.name = name
    this.singer = singer
    this.imgUrl = imgUrl
    this.albumName = albumName
    this.url = url
  }
}
export function createSongListForSearchData (data) {
  let list = []
  for (var item in data) {
    let musicId = data[item].id
    let name = data[item].name
    let singer = createSingerForSearchData(data[item].singer[0])
    let imgUrl = 'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + data[item].album.mid + '.jpg?max_age=2592000'
    let albumName = data[item].album.name
    let url = 'http://ws.stream.qqmusic.qq.com/' + data[item].musicId + '.m4a?fromtag=46'
    list.push(new Song(-1, musicId, name, singer, imgUrl, albumName, url))
  }
  return list
}

export function createSongListForData (data, singer) {
  let list = []
  for (var item in data) {
    list.push(new Song(data[item].id, data[item].musicId, data[item].name, singer, data[item].imgUrl, data[item].albumName, data[item].url))
  }
  return list
}
