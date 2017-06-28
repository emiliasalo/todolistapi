'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var VoteSchema = new Schema({

  
  feeling1: {
	    type: Object,
		
	  },
	  feeling2: {
		    type: Object,
			
		  },
		  feeling3: {
			    type: Object,
				
			  },
			  feeling4: {
				    type: Object,
					
				  },
				  feeling5: {
					    type: Object,
						
					  },
					  average: {
						    type: Number,
							
						  },
						  votes: {
							    type: Number,
								
							  },
						  name: {
							    type: String,
								
							  },
							  date: {
								    type: Date,
									
								  },

	  
	  

  
  
});



module.exports = mongoose.model('Votes', VoteSchema);