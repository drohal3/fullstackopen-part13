const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readingList')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, {through: ReadingList, as: 'readings'})
Blog.belongsToMany(User, {through: ReadingList})

Session.belongsTo(User)
User.hasMany(Session)

// *.sync replaced with migrations
// Blog.sync({ alter: true })
// User.sync({ alter: true })

module.exports = {
  Blog, User, ReadingList, Session
}