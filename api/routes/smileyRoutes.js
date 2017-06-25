'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/smileyController');


  //Routes
  app.route('/votes')
    .get(todoList.list_all_votes)
    .post(todoList.create_a_vote);


  app.route('/votes/:voteId')
    .get(todoList.read_a_vote)
    .put(todoList.update_a_vote)
    .delete(todoList.delete_a_vote);
};


