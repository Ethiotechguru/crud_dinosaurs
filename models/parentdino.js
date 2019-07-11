'use strict';
module.exports = (sequelize, DataTypes) => {
  const parentDino = sequelize.define('parentDino', {
    name: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  parentDino.associate = function(models) {
    // associations can be defined here
    parentDino.hasMany(models.childDino)
  };
  return parentDino;
};