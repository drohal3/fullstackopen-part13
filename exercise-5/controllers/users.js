const router = require('express').Router()
const { User, Blog} = require('../models')

const findUserByUsername = async (req, res, next) => {
  req.user = await User.findOne({where: {username:req.params.username}})
  next()
}

router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
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