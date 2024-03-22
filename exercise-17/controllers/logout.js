const router = require('express').Router()

const { SECRET } = require('../util/config')
const {User, Session} = require('../models')

router.delete('/', async (req, res) => {
  if (req.decodedToken) {
    console.log(req.decodedToken)
    const session = await Session.findOne({
      where: {
        "token": req.token
      }
    })
    await session.destroy()
  }
  res.status(204).end()
})

module.exports = router