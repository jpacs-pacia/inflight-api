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
var returnResults = require(global.appConfiguration.app_configuration_directory + '/response.result.js');
var uniqid = require('uniqid');
var isset = require('isset');
var moment = require('moment');
var sprintf = require("sprintf-js").sprintf;
var vsprintf = require("sprintf-js").vsprintf;


/** MODELS **/

var sessionModel = require(global.appConfiguration.app_sapphire_model_directory + '/session.js');

var musics = {
    read: function(parameters, callback) {
        sessionModel.validate_session_identifier(parameters, function(err, result){
            if(result.result === 'OK')
            {
                global
                    .seqObj
                    .musics_table
                    .findAll({
                        attributes: stables.musics.fields,
                        //group: 'ApplicantNumber',
                        raw: true
                    })
                    .then(musicsInformation=>{
                        parameters.details = musicsInformation;
                        returnResults.RETURN_OK(parameters, function(err, jsondata){
                            callback(null, jsondata);
                        });
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
                var where_params = {};
                if (parameters.flight_number === 'all')
                {
                    where_params = {
                        'transaction_type_id': global.col('musics.id'),
                        'transaction_type_code': 'MUSIC'
                    };
                } else {
                    where_params = {
                        'transaction_type_id': global.col('musics.id'),
                        'flight_number': parameters.flight_number,
                        'transaction_type_code': 'MUSIC',
                        'date_accessed': {
                            [global.Op.gte]: parameters.date_start,
                            [global.Op.lte]: parameters.date_end
                        }
                    };
                }
                global
                    .seqObj
                    .musics_table
                    .findAll({
                        attributes: [[global.fn('COUNT',global.col('musics.id')),'total_records'],'title'],
                        group: 'musics.title',
                        raw: true,
                        include: [
                            {
                                model: global.seqObj.user_activity_logs_table,
                                attributes: [],
                                nested: false,
                                where: where_params
                            }
                        ]
                    })
                    .then(userActivityLogInformation=>{
                        var jsondata = {
                            'result': 'OK',
                            'details': userActivityLogInformation,
                            'filter': {
                                'flight_number': parameters.flight_number,
                                'date': 'all',
                                'transaction_type_code': 'MUSIC'
                            }
                        };
                        callback(null, jsondata);
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
                    //'create': musics.create,
                    'read': musics.read,
                    // 'update': update,
                    // 'delete': deletes,
                    //'application': musics.application,
                    //'job_details': musics.details
                    /*** EXTRA METHDOS ***/
                    'watched_per_flight': musics.watched_per_flight,
                    'watched_per_title': musics.watched_per_title
                };
module.exports = exports_setup;