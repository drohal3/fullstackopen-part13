const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class ReadingList extends Model {}

// ===> While migration file uses snake case form (user_id), model file uses camel case (userId)! <===
ReadingList.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'blogs', key: 'id' },
  },
  read: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  }

}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'readingLists'
})

module.exports = ReadingList