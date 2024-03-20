const express = require('express')


const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
// const cors = require('cors')

// https://github.com/davidbanham/express-async-errors
// ^^^ can eliminate try-catch structure of our routers
require('express-async-errors')
const middleware = require('./util/middleware')
const blogsRouter = require('./controllers/blogs')

const app = express()
// app.use(cors)
app.use(express.json())
app.use('/api/blogs', blogsRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start().then(() => {
  app.use(middleware.errorHandler)
  app.use(middleware.unknownEndpoint)
})

