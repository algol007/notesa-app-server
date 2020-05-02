'use strict';
module.exports = (sequelize, DataTypes) => {
  const chat = sequelize.define('chat', {
    message: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  chat.associate = function(models) {
    // associations can be defined here
    chat.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'user',
      sourceKey: 'id'
    });
  };
  return chat;
};
