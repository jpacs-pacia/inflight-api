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
/** SETTINGS **/

var jobs = {
    read: function(parameters, callback) {
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
};

exports_setup = {
                    //'create': jobs.create,
                    'read': jobs.read,
                    // 'update': update,
                    // 'delete': deletes,
                    //'application': jobs.application,
                    //'job_details': jobs.details
                };
module.exports = exports_setup;