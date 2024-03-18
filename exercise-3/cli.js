require('dotenv').config()

const { Sequelize, QueryTypes} = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL)

const main = async () => {
  try {
    await sequelize.authenticate()
    const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })

    blogs.forEach(blog => {
      const author = blog["author"];
      const title = blog["title"];
      const likes = blog["likes"];
      console.log(`${author}: ${title}, ${likes} likes`)
    })

    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()