var express = require('express'),
  	app = express(),
  	port = process.env.PORT || 5000;
	mongoose = require('mongoose'),
	Vote = require('./api/models/todoListModel'),
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
	
	var routes = require('./api/routes/todoListRoutes');
	routes(app);
	
	//////direct to pictures 1 - 5
	app.get('/images1', function(req, res){
		res.sendFile(__dirname + '/api/resources/images/1.png');
	});
	app.get('/images2', function(req, res){
		res.sendFile(__dirname + '/api/resources/images/2.png');
	});
	app.get('/images3', function(req, res){
		res.sendFile(__dirname + '/api/resources/images/3.png');
	});
	app.get('/images4', function(req, res){
		res.sendFile(__dirname + '/api/resources/images/4.png');
	});
	app.get('/images5', function(req, res){
		res.sendFile(__dirname + '/api/resources/images/5.png');
	});
	
	//direct to css
	app.get('/css', function(req, res){
		res.sendFile(__dirname + '/api/resources/styles/style.css');
	});
	//direct to main.js
	app.get('/main.js', function(req, res){
		res.sendFile(__dirname + '/api/resources/js/main.js');
	});
	//direct to results.js
	app.get('/results.js', function(req, res){
		res.sendFile(__dirname + '/api/resources/js/results.js');
	});
	//direct to index
	app.get('/', function(req, res){
		res.sendFile(__dirname + '/index.html');
	});
	//direct to results
	app.get('/results', function(req, res){
		res.sendFile(__dirname + '/results.html');
	});
	
//	app.use('/main', express.static('api/resources/main.js'));
	
app.listen(port);

app.use(function(req, res) {
	  res.status(404).send({url: req.originalUrl + ' not found'})
	});

console.log('todo list RESTful API server started on: ' + port);