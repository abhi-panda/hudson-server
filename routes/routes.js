const express = require('express')
const router = express.Router();
const fetch = require("node-fetch");
const db = require('../db.js');
const Op = require('sequelize').Op
const sequelize = require('sequelize')

router.get('/users/:tableID',function(req,res){
    console.log(`All Users for table no: ${req.params.tableID}`);
    db.Users.findAll({
        where : {
            tableID : req.params.tableID
        }
    }).then(
        users => {
            return res.send(users);
        }
    ).catch(err => {
        return res.status(400).send(err);
    })
});

router.get('/',function(req,res){
    return res.render('index');
});

router.get('/user/:userID',function(req,res){
    console.log(`User info for user ID: ${req.params.userID}`);
    db.Users.findOne({
        where : {
            userID : req.params.userID
        }
    }).then(
        user => {
            return res.send(user);
        }
    ).catch(err => {
        return res.status(400).send(err);
    })
});

router.get('/comments/:userID',function(req,res){
    console.log(`Comments for user ID: ${req.params.userID} 's idea`);
    db.Comments.findAll({
        where : {
            commentID : {
                [Op.startsWith]: req.params.userID
            }
        }
    }).then(
        comments => {
            return res.send(comments)
        }
    ).catch(err =>{
        return res.status(400).send(err);
    })
    
});

router.get(('/table/:tableID'), function(req,res){
    console.log(`Table info for table id : ${req.params.tableID}`);
    db.Tables.findOne({
        where : {
            tableID : req.params.tableID
        }
    }).then(
        table => {
            return res.send(table)
        }
    ).catch(err => {
        return res.status(400).send(err);
    })
});

router.put('/table/:tableID', function (req,res) {
    console.log(`Table updation for table id : ${req.params.tableID}`);
    var tableChanged = db.Tables.build(req.body, {isNewRecord : false});
    db.Tables.findOne({
      where : {
        tableID : req.params.tableID
      }
    }).then (table => {
      if (!table) {
        return res.send("Table not found");
      }
      return tableChanged.save();
    }).then (table => {
      return res.send(table);
    }).catch ( err => {
      return res.status(400).send(err);
    });
});

router.put('/user/:userID', function (req,res) {
    console.log(`Idea updation for user id : ${req.params.userID}`);
    var userChanged = db.Users.build(req.body, {isNewRecord : false});
    db.Users.findOne({
      where : {
        userID : req.params.userID
      }
    }).then (user => {
      if (!user) {
        return res.send("User not found");
      }
      return userChanged.save();
    }).then (user => {
      return res.send(user);
    }).catch ( err => {
      return res.status(400).send(err);
    });
});

router.put('/comments/:userID', function (req,res) {
    console.log(`Comment for idea of: ${req.params.userID}`);
    var userChanged = db.Comments.build(req.body, {isNewRecord : true});
    db.Comments.findOne({
      where : {
        commentID : {
            [Op.startsWith]: req.params.userID
        }
    }
    }).then (user => {
      // if (!user) {
      //   return res.send("User not found");
      // }
      return userChanged.save();
    }).then (user => {
      return res.send(user);
    }).catch ( err => {
      return res.status(400).send(err);
    });
});

router.get(('/topic/:topicID'), function(req,res){
  console.log(`Topic info for topic id : ${req.params.topicID}`);
  const topic = db.Topics.findOne({
    where : {
      topicID : req.params.topicID
    }
  });
  const topics = db.Tables.findAll({
    where : {
      topicID : req.params.topicID
    }
  });

  Promise
    .all([topic,topics])
    .then( responses => {
      // return res.send({topic : responses[0].topic , topics : responses[1]})
      return res.render('result',{topic : responses[0].topic , topics : responses[1]})
    }).catch ( err => {
      return res.status(400).send(err);
    });
});

router.get(('/check/:userID'),function(req,res){
  console.log(`Check status for ${req.params.userID}`);
  const leader = db.Users.findOne({
    where : {
      userID : req.params.userID
    }
  });
  const users = db.Users.findAll({
    where : {
      tableID : leader.tableID
    }
  });
  const table = db.Tables.findOne({
    where : {
      tableID : leader.tableID
    }
  });

  Promise
    .all([users,table])
    .then(responses => {
      for (let i = 0; i < Object.keys(responses[0]).length; i++) {
        if((responses[0][i].ideaRateCount) && ((responses[0][i].ideaRateCount) == (responses[1].peopleCount)-1) ){
          return res.send({result : true , tableID : responses[1].tableID})
        }
        else {
          return res.send({result : false, tableID : responses[1].tableID})
        }
      }
    }).catch ( err => {
      return res.status(400).send(err);
    });
});

router.get(('/topidea/:tableID'),function(req,res){
  console.log(`Top Idea for table :${req.params.tableID}`);
  const max = db.Users.max('rating', {
    where : {
      tableID : req.params.tableID
    }
  });
  const users = db.Users.findAll({
    where : {
      rating : max
    }
  });

  Promise
    .all([users,max])
    .then(responses => {
      if(Object.keys(responses[0]).length == 1){
        return res.send({tie : false, Users : JSONStringify(responses[0]), max : responses[1]})
      }else if(Object.keys(responses[0]).length > 1){
        return res.send({tie : true, Users : JSONStringify(responses[0]), max : responses[1]})
      }else {
        return res.send({tie : null, Users : JSONStringify(responses[0]), max : responses[1]})
      }
    }).catch ( err => {
    return res.status(400).send(err);
  });
});

module.exports = router;