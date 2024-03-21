const Blog = require('./blog')
const User = require('./user')

User.hasMany(Blog)
Blog.belongsTo(User)

// *.sync replaced with migrations
// Blog.sync({ alter: true })
// User.sync({ alter: true })

module.exports = {
  Blog, User
}