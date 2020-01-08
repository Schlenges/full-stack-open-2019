const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.map(blog => sum += blog.likes)
  return sum
}

module.exports = {
  dummy,
  totalLikes
}