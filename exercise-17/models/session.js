const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Session extends Model {}

// ===> While migration file uses snake case form (user_id), model file uses camel case (userId)! <===
Session.init({
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
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
  }

}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'sessions'
})

module.exports = Session