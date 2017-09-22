import Blog from './blog'

export default class BlogType {
  constructor (id, name, rank, blogs) {
    this.id = id
    this.name = name
    this.rank = rank
    this.blogs = blogs
  }
}

export function createblogTypes (blogsData) {
  let blogTypes = []
  for (let i = 0; i < blogsData.length; i++) {
    let blogs = []
    for (let j = 0; j < blogsData[i].blogs.length; j++) {
      let blog = new Blog(blogsData[i].blogs[j].Id, blogsData[i].blogs[j].Title, blogsData[i].blogs[j].Description, blogsData[i].blogs[j].ImgUrl, blogsData[i].blogs[j].HtmlContent, blogsData[i].blogs[j].Time, blogsData[i].blogs[j].BlogTypeId)
      blogs.push(blog)
    }
    let blogType = new BlogType(blogsData[i].id, blogsData[i].name, blogsData[i].rank, blogs)
    blogTypes.push(blogType)
  }
  return blogTypes
}
