/**** MODEL ****/
var express = require('express');
var router = express.Router();
var url = require('url');
var moviesModel = require(global.appConfiguration.app_sapphire_model_directory + '/movies'); 
/* GET users listing. */
router

	.get('/', function(req, res, next) {
		var parseData = url.parse(req.url, true);
	 	moviesModel.read(parseData.query, function(err, result){

	 		res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
			res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
			res.setHeader('Access-Control-Allow-Credentials', true);
			res.setHeader('Content-Type', 'application/json');
	    	res.send(result);
	 	});	
	})
	.get('/watched/flight/:flight_number', function(req, res, next) {
		var parseData = url.parse(req.url, true);
	 	moviesModel.watched_per_flight(parseData.query, function(err, result){

	 		res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
			res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
			res.setHeader('Access-Control-Allow-Credentials', true);
			res.setHeader('Content-Type', 'application/json');
	    	res.send(result);
	 	});	
	})
	.get('/watched/movie-title/:flight_number', function(req, res, next) {
		var parseData = url.parse(req.url, true);
		parseData.query['flight_number'] = req.params.flight_number;
	 	moviesModel.watched_per_title(parseData.query, function(err, result){

	 		res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
			res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
			res.setHeader('Access-Control-Allow-Credentials', true);
			res.setHeader('Content-Type', 'application/json');
	    	res.send(result);
	 	});	
	})
;


module.exports = router;