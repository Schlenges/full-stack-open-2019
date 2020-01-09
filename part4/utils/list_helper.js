const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.map(blog => sum += blog.likes)
  return sum
}

const favoriteBlog = (blogs) => {
  if(blogs.length == 0){return {} }

  let favourite = blogs.reduce((max, blog) => blog.likes >= max.likes ? blog : max)

  return {
    title: favourite.title,
    author: favourite.author,
    likes: favourite.likes
  }
}

const mostBlogs = (blogs) => {
  if(blogs.length == 0){return {} }

  let authorArray = blogs.reduce((authors, blog) => {
    let authorIncluded = false

    authors.map(entry => {
      if(blog.author == entry.author){
        entry.blogs++
        authorIncluded = true
      }
    })

    if(!authorIncluded){
      authors.push({
        author: blog.author,
        blogs: 1
      })
    }

    return authors
  }, [])

  return authorArray.reduce((max, author) => author.blogs >= max.blogs ? author : max)
}

const mostLikes = (blogs) => {
  if(blogs.length == 0){return {} }

  let authorArray = blogs.reduce((authors, blog) => {
    let authorIncluded = false

    authors.map(entry => {
      if(blog.author == entry.author){
        entry.likes += blog.likes
        authorIncluded = true
      }
    })

    if(!authorIncluded){
      authors.push({
        author: blog.author,
        likes: blog.likes
      })
    }

    return authors
  }, [])

  return authorArray.reduce((max, author) => author.likes >= max.likes ? author : max)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}