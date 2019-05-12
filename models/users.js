'use strict'

module.exports = (sequelize, DataTypes) => {

  const Users = sequelize.define('users' , {
    userID : {
      type : DataTypes.STRING,
      allowNull:false,
      primaryKey : true
    },
    name : {
      type: DataTypes.STRING,
      allowNull: false
    },
    isLeader : {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    tableID : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idea : {
        type: DataTypes.STRING
    },
    rating : {
        type: DataTypes.INTEGER
    },
    ideaRateCount : {
        type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false
  });
  return Users;
}
