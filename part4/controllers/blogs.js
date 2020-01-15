const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  let reqObject = request.body

  if(!reqObject.likes){
    reqObject = {...reqObject, likes: 0}
  }
  
  const blog = new Blog(reqObject)
  
  try{
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch(error){
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try{
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(error){
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try{
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog.toJSON())
  } catch(error){
    next(error)
  }
})

module.exports = blogsRouter