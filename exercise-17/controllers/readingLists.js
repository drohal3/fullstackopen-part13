const router = require('express').Router()
const { ReadingList } = require('../models')


router.post('/', async (req, res) => {
  const readingListData = req.body
  // const readingList = await ReadingList.create({...readingListData, read: false}) // to force read: false
  const readingList = await ReadingList.create(readingListData)

  res.json(readingList)
})

module.exports = router