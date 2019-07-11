'use strict';
module.exports = (sequelize, DataTypes) => {
  const childDino = sequelize.define('childDino', {
    name: DataTypes.STRING,
    sex: DataTypes.STRING
  }, {});
  childDino.associate = function(models) {
    // associations can be defined here
    childDino.belongsTo(models.parentDino)
  };
  return childDino;
};