'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.chat, {
      foreignKey: 'id',
      as: 'chat',
      sourceKey: 'id'
    });
    user.hasMany(models.map, {
      foreignKey: 'id',
      as: 'map',
      sourceKey: 'id'
    });
  };
  return user;
};
