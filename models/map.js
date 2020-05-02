'use strict';
module.exports = (sequelize, DataTypes) => {
  const map = sequelize.define('map', {
    long: DataTypes.STRING,
    lat: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  map.associate = function(models) {
    // associations can be defined here
    map.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'user',
      sourceKey: 'id'
    });
  };
  return map;
};
