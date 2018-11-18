/**** MODEL ****/
var express = require('express');
var router = express.Router();
var url = require('url');

var sessionModel = require(global.appConfiguration.app_directory +  '/models/sapphire/session'); 
/* GET users listing. */
router
.get('/', function(req, res, next) {
	var parseData = url.parse(req.url, true);
	
 	// userActivityLogModel.read(parseData.query, function(err, result){
 	// 	res.setHeader('Access-Control-Allow-Origin', '*');
		// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		// res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		// res.setHeader('Access-Control-Allow-Credentials', true);
		// res.setHeader('Content-Type', 'application/json');
  //   	res.send(result);
 	// })
	
 	
})
.post('/login', function(req, res, next){
	var parseData = url.parse(req.url, true);
    var obj = req.body;

    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    obj.url_link = fullUrl;
	sessionModel.login(obj, function(err, result){
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		res.setHeader('Access-Control-Allow-Credentials', true);
		res.setHeader('Content-Type', 'application/json');
    	res.send(result);
	})
})
	;


module.exports = router;