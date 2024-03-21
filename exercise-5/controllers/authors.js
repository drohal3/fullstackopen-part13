const router = require('express').Router()
const { Op } = require("sequelize");
const { sequelize } = require('../util/db')

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    group: "author",
    attributes: [
        "author",
        [sequelize.fn('COUNT', sequelize.col('id')), 'articles'],
        [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ]
  })

  res.json(authors)
})

module.exports = router