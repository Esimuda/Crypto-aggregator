const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const User = require('./user.model')

const ApiKey = sequelize.define('ApiKey', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: User, key: 'id' },
  },
  exchange: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apiKey: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  secretKey: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'api_keys',
  timestamps: true,
})

User.hasMany(ApiKey, { foreignKey: 'userId' })
ApiKey.belongsTo(User, { foreignKey: 'userId' })

module.exports = ApiKey