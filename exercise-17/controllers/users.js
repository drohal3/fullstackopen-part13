const router = require('express').Router()
const { User, Blog} = require('../models')
const {where} = require("sequelize");

const findUserByUsername = async (req, res, next) => {
  req.user = await User.findOne({where: {username:req.params.username}})
  next()
}

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: {exclude: ["userId"]}
    }
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const where = {}

  if (req.query.read !== undefined) {
    where.read = req.query.read
  }

  const user = req.user = await User.findByPk(req.params.id, {
    include: [{
      model: Blog,
      as: 'readings',
      through: {
        attributes: ['id', 'read'],
        where
      },
    }]
  })

  res.json(user)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.put('/:username', findUserByUsername, async (req, res) => {
  if (req.user) {
    req.user.username = req.body.username
    await req.user.save()
    res.json(req.user)
  } else {
    res.status(404).end()
  }
})

module.exports = router