'use strict';


var mongoose = require('mongoose'),
  Vote = mongoose.model('Votes');

exports.list_all_votes = function(req, res) {
  Vote.find({}, function(err, vote) {
    if (err)
      res.send(err);
    res.json(vote);
  });
};




exports.create_a_vote = function(req, res) {
  var new_vote = new Vote(req.body);
  new_vote.save(function(err, vote) {
    if (err)
      res.send(err);
    res.json(vote);
  });
};


exports.read_a_vote = function(req, res) {
  Vote.findById(req.params.voteId, function(err, vote) {
    if (err)
      res.send(err);
    res.json(vote);
  });
};


exports.update_a_vote = function(req, res) {
  Vote.findOneAndUpdate({_id: req.params.voteId}, req.body, {new: true}, function(err, vote) {
    if (err)
      res.send(err);
    res.json(vote);
  });
};


exports.delete_a_vote = function(req, res) {


  Vote.remove({
    _id: req.params.voteId
  }, function(err, vote) {
    if (err)
      res.send(err);
    res.json({ message: 'Votes successfully deleted' });
  });
};


