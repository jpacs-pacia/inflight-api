/*

    ----- MOVIES MODEL -----

    MODEL METHODS: 

    1.  method name: read
        
        description: Get all applicant informations and details
        params: 
        method type: GET
        result type: JSON
        return result: 
            {'result': 'OK', 'details':{}}
*/

/** SETTINGS **/

var mysql = require('mysql');
var dbase = require(global.appConfiguration.app_configuration_directory + '/sequelize.config.js');
var stables = require(global.appConfiguration.app_configuration_directory + '/sequelize.tables.js');
var uniqid = require('uniqid');
var isset = require('isset');
var moment = require('moment');
var sprintf = require("sprintf-js").sprintf;
var vsprintf = require("sprintf-js").vsprintf;


/** MODELS **/

var sessionModel = require(global.appConfiguration.app_sapphire_model_directory + '/session.js');

var jobs = {
    read: function(parameters, callback) {
        sessionModel.validate_session_identifier(parameters, function(err, result){
            if(result.result === 'OK')
            {
                global
                    .seqObj
                    .movies_table
                    .findAll({
                        attributes: stables.movies.fields,
                        //group: 'ApplicantNumber',
                        raw: true
                    })
                    .then(moviesInformation=>{
                        callback(null, moviesInformation);
                    });
            }
            else
            {
                callback(null, result);
            }
        });
            
    },
    watched_per_flight: function(parameters, callback) {
        sessionModel.validate_session_identifier(parameters, function(err, result){
            if(result.result === 'OK')
            {
                global
                    .seqObj
                    .user_activity_logs_table
                    .findAll({
                        attributes: [[global.fn('COUNT',global.col('user_activity_logs.id')),'total_records'],'flight_number'],
                        group: 'user_activity_logs.flight_number',
                        raw: true,
                        include: [
                            {
                                model: global.seqObj.movies_table,
                                attributes: [],
                                nested: false
                            }
                        ]
                    })
                    .then(userActivityLogInformation=>{
                        callback(null, userActivityLogInformation);
                    });
            }
            else
            {
                callback(null, result);
            }
        });
            
    },
    watched_per_title: function(parameters, callback) {
        sessionModel.validate_session_identifier(parameters, function(err, result){
            if(result.result === 'OK')
            {
                global
                    .seqObj
                    .movies_table
                    .findAll({
                        attributes: [[global.fn('COUNT',global.col('movies.id')),'total_records'],'title'],
                        group: 'movies.title',
                        raw: true,
                        include: [
                            {
                                model: global.seqObj.user_activity_logs_table,
                                attributes: [],
                                nested: false
                            }
                        ]
                    })
                    .then(userActivityLogInformation=>{
                        callback(null, userActivityLogInformation);
                    });
            }
            else
            {
                callback(null, result);
            }
        });
            
    }
};

exports_setup = {
                    //'create': jobs.create,
                    'read': jobs.read,
                    // 'update': update,
                    // 'delete': deletes,
                    //'application': jobs.application,
                    //'job_details': jobs.details
                    /*** EXTRA METHDOS ***/
                    'watched_per_flight': jobs.watched_per_flight,
                    'watched_per_title': jobs.watched_per_title
                };
module.exports = exports_setup;