/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Polls = require('../api/polls/polls.model');
var Comments = require('../api/comments/comments.model');


User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');

      Polls.find({}).remove(function () {
        User.find({email: 'admin@admin.com'}, function(err, resp){
          if(err) { return console.error(err); }
          console.log('resp: '+JSON.stringify(resp));
          Polls.create({
            provider: 'local',
            question: 'test1',
            author: resp[0]._id,
            choices: [{"choice":1,"votes":3,},{"choice":3,"votes":1,}]
          }, {
            provider: 'local',
            question: 'test2',
            author: resp[0]._id,
            choices: [{"choice":9,"votes":5,},{"choice":81,"votes":7,}]
          }, function(err, resp){
            console.log('err: '+err);
            console.log('response: '+resp);
            console.log('finished adding polls');
            Comments.find({}).remove(function() {
              console.log('removed all comments');
            })
          });

        });


      });
    }
  );
});


