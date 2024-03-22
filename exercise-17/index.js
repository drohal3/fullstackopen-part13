const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
// const cors = require('cors')

// https://github.com/davidbanham/express-async-errors
// eliminates try-catch structure of our routers
require('express-async-errors')
const middleware = require('./util/middleware')

const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorRouter = require('./controllers/authors')
const readingListRouter = require('./controllers/readingLists')

// app.use(cors)
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorRouter)
app.use('/api/readingLists', readingListRouter)

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

