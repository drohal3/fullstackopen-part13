const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Blog extends Model {}

// ===> While migration file uses snake case form (user_id), model file uses camel case (userId)! <===
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
  },
  year: {
    type: DataTypes.INTEGER,
    validate: {
      isCorrectYear(value) {
        if (parseInt(value) > new Date().getUTCFullYear() || parseInt(value) < 1991) {
          throw new Error('The year must be between 1991 and current year!.');
        }
      }
    }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blogs'
})

module.exports = Blog