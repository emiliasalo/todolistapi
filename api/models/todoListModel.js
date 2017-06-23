'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var VoteSchema = new Schema({
  smile1: {
	  type: [{
  
    type: Number,
    enum: ['1', '2', '3', '4','5']
	  }],
  },
  smile2: {
	  type: [{
  
    type: Number,
    enum: ['1', '2', '3', '4','5']
	  }],
  },
  smile3: {
	  type: [{
  
    type: Number,
    enum: ['1', '2', '3', '4','5']
	  }],
  },
  smile4: {
	  type: [{
  
    type: Number,
    enum: ['1', '2', '3', '4','5']
	  }],
  },
  smile5: {
	  type: [{
  
    type: Number,
    enum: ['1', '2', '3', '4','5']
	  }],
  },
});



module.exports = mongoose.model('Votes', VoteSchema);