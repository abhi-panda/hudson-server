'use strict'

module.exports = (sequelize, DataTypes) => {

  const Topics = sequelize.define('topics' , {
    topicID : {
      type : DataTypes.STRING,
      allowNull:false,
      primaryKey : true
    },
    topic : {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  });
  return Topics;
}
