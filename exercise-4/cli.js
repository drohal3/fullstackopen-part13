require('dotenv').config()
const { Sequelize, QueryTypes, DataTypes, Model } = require('sequelize')
const express = require('express')
const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {});

class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  author: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
    // Sequelize does not provide any way to declare Check Constraints on tables yet
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
    // Sequelize does not provide any way to declare Check Constraints on tables yet
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {sequelize, modelName: 'blogs', timestamps: false})

Blog.sync({ alter: true })

app.get('/api/blogs', async (req, res) => {
  const notes = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
  res.json(notes)
})

app.post('/api/blogs', async (req, res) => {
  const blog = await Blog.create(req.body)
  res.status(201).json(blog)
})

app.delete('/api/blogs/:id', async (req, res) => {
  const { id } = req.params
  await Blog.destroy({
    where: {
      id
    },
  });
  return res.status(204).send()
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})