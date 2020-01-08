require('dotenv').config()

let PORT = process.env.PORT
let MONGO_URL = process.env.MONGO_URL

module.exports = {
  MONGO_URL,
  PORT
}