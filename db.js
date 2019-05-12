const Sequelize = require('sequelize');
const sequelize = new Sequelize('collab', 'collab1', '' , {
  host: 'localhost',
  port: '3306',
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
