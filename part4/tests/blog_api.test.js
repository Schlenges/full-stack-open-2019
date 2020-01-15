const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  }, 
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let promiseArray = initialBlogs.map(async (blog) => {
    let newBlog = new Blog(blog)
    await newBlog.save()
  })

  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(initialBlogs.length)
})

test('unique identifier property of a blog is named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "The Developer New Year's Resolution Guide",
    author: "Quincy Larson",
    url: "https://www.freecodecamp.org/news/developer-new-years-resolution-guide/",
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(blog => blog.title)

  expect(response.body.length).toBe(initialBlogs.length + 1)
  expect(titles).toContain("The Developer New Year's Resolution Guide")
})

test('if likes property is missing, it will default to 0', async () => {
  const newBlog = {
    title: "The Developer New Year's Resolution Guide",
    author: "Quincy Larson",
    url: "https://www.freecodecamp.org/news/developer-new-years-resolution-guide/"
  }

  const response = await api.post('/api/blogs').send(newBlog)

  expect(response.body.likes).toBeDefined()
  expect(response.body.likes).toEqual(0)
})

test('missing url results in status code 400', async () => {
  const newBlog = {
    title: "The Developer New Year's Resolution Guide",
    author: "Quincy Larson",
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('missing title results in status code 400', async () => {
  const newBlog = {
    author: "Quincy Larson",
    url: "https://www.freecodecamp.org/news/developer-new-years-resolution-guide/",
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('a blog gets succesfully deleted', async () => {
  const blogs = await Blog.find({})
  const blog = blogs[0].toJSON()

  await api
    .delete(`/api/blogs/${blog.id}`)
    .expect(204)

  const blogsAfterDeletion = await Blog.find({})
  expect(blogsAfterDeletion.length).toBe(blogs.length - 1)
  
  const titles = blogsAfterDeletion.map(blog => blog.toJSON().title)
  expect(titles).not.toContain(blog.title)
})

test('a blog gets succesfully updated', async () => {
  const blogs = await Blog.find({})
  const blog = blogs[0].toJSON()
  blog.likes = 10

  await api
    .put(`/api/blogs/${blog.id}`)
    .send(blog)

  const updatedBlogs = await Blog.find({})
  expect(updatedBlogs[0].toJSON().likes).toBe(10)
})

afterAll(() => {
  mongoose.connection.close()
})