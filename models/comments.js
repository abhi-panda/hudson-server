'use strict'

module.exports = (sequelize, DataTypes) => {

  const Comments = sequelize.define('comments' , {
    commentID : {
      type : DataTypes.STRING,
      allowNull:false,
      primaryKey : true
    },
    comment : {
      type: DataTypes.STRING,
      allowNull: false
    },
    commentorID : {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  });
  return Comments;
}
