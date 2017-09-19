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
  console.log(blogsData)
  for (let i = 0; i < blogsData.length; i++) {
    let blogs = []
    for (let j = 0; j < blogsData[i].blogs; j++) {
      let blog = new Blog(blogsData[i].blogs.Id, blogsData[i].blogs.Title, blogsData[i].blogs.Description, blogsData[i].blogs.ImgUrl, blogsData[i].blogs.HtmlContent, blogsData[i].blogs.Time, blogsData[i].blogs.BlogTypeId)
      blogs.push(blog)
    }
    let blogType = new BlogType(blogsData[i].id, blogsData[i].name, blogsData[i].rank, blogs)
    blogTypes.push(blogType)
  }
  return blogTypes
}
