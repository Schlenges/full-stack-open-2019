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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}