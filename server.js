var express = require('express'),
  	app = express(),
  	port = process.env.PORT || 3000;
	mongoose = require('mongoose'),
	Vote = require('./api/models/smileyModel'),
	bodyParser = require('body-parser');
	
	// ES6 Promises
	mongoose.Promise = global.Promise;
	
	//mlab
	var URLmongodb = 'mongodb://Leo:123@ds135522.mlab.com:35522/smileydb';

	//Mongoose Connection
	mongoose.connect(URLmongodb); // connect to our mongoDB database (uncomment after you enter in your own credentials in config/db.js)

	var db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error"));

	db.once("open", function (callback) {
	  console.log("Connection succeeded.");
	});
	mongoose.Promise = global.Promise;
	db = mongoose.createConnection('mongodb://localhost/Votedb');

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	
	var routes = require('./api/routes/smileyRoutes');
	routes(app);
	
	//direct to index
	app.get('/', function(req, res){
		res.sendFile(__dirname + '/index.html');
	});
	
app.listen(port);

app.use(function(req, res) {
	  res.status(404).send({url: req.originalUrl + ' not found'})
	});

console.log('todo list RESTful API server started on: ' + port);