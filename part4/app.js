const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

mongoose
  .connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((error) => console.log('error connecting to MongoDB:', error.message))

  app.use(cors())
  app.use(bodyParser.json())
  app.use('/api/blogs', blogsRouter)

  module.exports = app