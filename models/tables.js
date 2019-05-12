'use strict'

module.exports = (sequelize, DataTypes) => {

  const Tables = sequelize.define('tables' , {
    tableID : {
      type : DataTypes.INTEGER,
      allowNull:false,
      primaryKey : true
    },
    topicID : {
      type: DataTypes.STRING,
      allowNull: false
    },
    topUserID : {
      type: DataTypes.STRING
    },
    peopleCount : {
      type : DataTypes.INTEGER
    }
  },
  {
    timestamps: false
  });
  return Tables;
}
