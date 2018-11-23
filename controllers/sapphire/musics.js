/**** MODEL ****/
var express = require('express');
var router = express.Router();
var url = require('url');
var musicsModel = require(global.appConfiguration.app_sapphire_model_directory + '/musics'); 
/* GET users listing. */
router

	.get('/', function(req, res, next) {
		var parseData = url.parse(req.url, true);
	 	musicsModel.read(parseData.query, function(err, result){

	 		res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
			res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
			res.setHeader('Access-Control-Allow-Credentials', true);
			res.setHeader('Content-Type', 'application/json');
	    	res.send(result);
	 	});	
	})
	.get('/played/flight/:flight_number', function(req, res, next) {
		var parseData = url.parse(req.url, true);
	 	musicsModel.watched_per_flight(parseData.query, function(err, result){

	 		res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
			res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
			res.setHeader('Access-Control-Allow-Credentials', true);
			res.setHeader('Content-Type', 'application/json');
	    	res.send(result);
	 	});	
	})
	.get('/played/music-title/:flight_number', function(req, res, next) {
		var parseData = url.parse(req.url, true);
		parseData.query['flight_number'] = req.params.flight_number;
	 	musicsModel.watched_per_title(parseData.query, function(err, result){

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