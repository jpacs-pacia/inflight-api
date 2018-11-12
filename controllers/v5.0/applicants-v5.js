var mongoose = require('mongoose')
var express = require('express');
var router = express.Router();
var url = require('url');
var socketModel = require('../../models/push-sockets');

/* APPLICANTS MODEL */
var applicantsModel = require('../../models/applicants');
var applicantsModelv5 = require('../../models/v5.0/applicants-v5');

/* QUERY GENERATOR */
var qryGenerator = require('../../models/mysql-qry-generator');
var mongoConn = require('../../models/mongo-conn');

router
/**** APPLICANTS REST API ****/
.get('/', function(req, res, next) {
	console.log('v5.0');
	var schema = new mongoose.Schema({ name: 'string', size: 'string' });
	var Tank = mongoose.model('Tank', schema);	

	Tank.create({ size: 'small' }, function (err, small) {
	  if (err) return handleError(err);
	  console.log('Size created');
	});
})
.post('/', function(req, res, next) {

})
.put('/', function(req, res, next) {
        var parseData = url.parse(req.url, true);
        console.log(req.body);
        console.log(req.params);
        applicantsModelv5.create({}, function(err, result){
			res.setHeader('Content-Type', 'application/json');
			res.send(result);
		});
    })
.delete('/online-request/:training_request_id', function(req, res, next) {
    console.log(req.params);
})
/**** DATABASE SERVICES ****/
.post('/create-schema', function(req, res, next) {
	applicantsModelv5.create_schema({}, function(err, result){
		res.setHeader('Content-Type', 'application/json');
		res.send(result);
	});
});

module.exports = router;


/**** REFERENCES ****/

/* DATABASE OBJECT*/
// http://mongoosejs.com/docs/models.html

/* MONGOOSE */
// https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications