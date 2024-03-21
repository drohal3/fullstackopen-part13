const router = require('express').Router()
const { Op } = require("sequelize");

const { Blog, User } = require('../models')

const findBlog = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  console.log(req.decodedToken)
  let where = {}

  if (req.query.search) {
    where = {...where,
      [Op.or]: [
        { title: {[Op.iLike] : `%${req.query.search}%`} },
        { author: {[Op.iLike] : `%${req.query.search}%`} }
      ]
    }
  }

  const blogs = await Blog.findAll({
    attributes: {exclude: ["userId"]},
    include: {
      model: User,
    },
    where,
    order: [
      ['likes','DESC']
    ]
  })
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const decodedToken = req.decodedToken
  if (!decodedToken) {
    return res.status(401).json({ error: 'token missing' })
  }

  const blogData = req.body
  const blog = await Blog.create({...blogData, userId: decodedToken.id})
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
  const decodedToken = req.decodedToken
  if (!decodedToken) {
    return res.status(401).json({ error: 'token missing' })
  }

  if (!req.blog) {
    return res.status(404).json({ error: 'Not Found!' })
  }

  if (req.blog.userId !== decodedToken.id) {
    return res.status(401).json({ error: 'Unauthorized!' })
  }

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