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

/** REST METHODS **/
var activity_logs = {
    read: function(parameters, callback) {
        global
            .seqObj
            .user_activity_logs_table
            .findAll({
                attributes: stables.user_activity_logs.fields,
                //group: 'ApplicantNumber',
                raw: true,
                include: [
                    {
                        model: global.seqObj.shopusers_table
                    }
                ]
            })
            .then(userLogsInformation=>{
                callback(null, userLogsInformation);
            });

    },
    create: function(parameters, callback) {

    }
};

/** EXTRA METHODS **/

var nactivity_logs = {

};

exports_setup = {
                    'create': activity_logs.create,
                    'read': activity_logs.read,
                    // 'update': update,
                    // 'delete': deletes,
                    //'application': jobs.application,
                    //'job_details': jobs.details
                    /*** EXTRA METHDOS ***/

                };
module.exports = exports_setup;