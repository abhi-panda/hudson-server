const Sequelize = require('sequelize');
const sequelize = new Sequelize('heroku_45ca158108d5570', 'b76879d205a49a', '6ac75979' , {
  host: 'us-cdbr-iron-east-02.cleardb.net',
  dialect: 'mysql'
});

sequelize.authenticate().then( function (err) {
  if (err) {
    console.log("There is connection in error");
  }
  else {
    console.log("Connection has been established");
  }
});
const db = {};
db.Users = require('./models/users')(sequelize, Sequelize);
db.Comments = require('./models/comments')(sequelize, Sequelize);
db.Tables = require('./models/tables')(sequelize, Sequelize);
db.Topics = require('./models/topics')(sequelize, Sequelize);

sequelize.sync({  }).then ( (err) => {
  if (err) {
    console.log(err);
  }
});


module.exports = db;
