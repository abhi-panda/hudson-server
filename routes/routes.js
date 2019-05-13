const express = require('express')
const router = express.Router();
const db = require('../db.js');
const Op = require('sequelize').Op

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
    var userChanged = db.Users.build(req.body, {isNewRecord : false});
    db.Users.findOne({
      where : {
        commentID : {
            [Op.startsWith]: req.params.userID
        }
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

router.get(('/topic/:topicID'), function(req,res){
  console.log(`Topic info for topic id : ${req.params.topicID}`);
  topic = {}
  db.Topics.findOne({
      where : {
         topicID : req.params.topicID
      }
  }).then(
      topic => {
        topic = topic
      }
  ).then( db.Tables.findAll({
    where : {
      topicID : req.params.topicID
    }
  }).then(topics => {
    return res.send({topic : topic , topics : topics})
  }).catch(err => {
    return res.status(400).send(err);
})
  ).catch(err => {
      return res.status(400).send(err);
  })
});


module.exports = router;