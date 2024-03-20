const router = require('express').Router()

const { Blog } = require('../models')

const findBlog = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const blog = await Blog.create(req.body)
  res.json(blog)
})

router.get('/:id', findBlog, async (req, res) => {
  if (req.blog) {
    console.log("BLOOOG")
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', findBlog, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
  }
  res.status(204).end()
})

router.put('/:id', findBlog, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    // This one kept here, not centralized in the middleware
    res.status(404).end()
  }
})

module.exports = router