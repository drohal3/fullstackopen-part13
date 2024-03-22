const router = require('express').Router()
const { ReadingList } = require('../models')


router.post('/', async (req, res) => {
  const readingListData = req.body
  // const readingList = await ReadingList.create({...readingListData, read: false}) // to force read: false
  const readingList = await ReadingList.create(readingListData)

  res.json(readingList)
})

router.put('/:id', async (req, res) => {
  const readingList = await ReadingList.findByPk(req.params.id)

  const decodedToken = req.decodedToken
  if (!decodedToken) {
    return res.status(401).json({ error: 'token missing' })
  }

  if (readingList.userId !== decodedToken.id) {
    return res.status(401).json({ error: 'Unauthorized!' })
  }

  readingList.read = req.body.read
  await readingList.save()

  res.json(readingList)
})

module.exports = router