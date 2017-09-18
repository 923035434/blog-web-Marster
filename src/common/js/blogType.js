import Blog from './blog'

export default class BlogTypes {
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
    for (let j = 0; j < blogsData[i].blogs; j++) {
      let blog = new Blog(blogsData[i].blogs.Id, blogsData[i].blogs.Title, blogsData[i].blogs.Description, blogsData[i].blogs.ImgUrl, blogsData[i].blogs.HtmlContent, blogsData[i].blogs.Time, blogsData[i].blogs.BlogTypeId)
      blogs.push(blog)
    }
    let blogType = new BlogTypes(blogsData.Id, blogsData.Id, blogsData.Id, blogs)
    blogTypes.push(blogType)
  }
}
