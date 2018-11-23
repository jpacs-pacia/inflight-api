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
                // raw: true,
                include: [
                    {
                        model: global.seqObj.shopusers_table,
                        attributes: ['firstname','lastname'],
                        nested: false
                    }
                ]
            })
            .then(userLogsInformation=>{
                
                // var key;
                // for(key in userLogsInformation)
                // {

                //     userLogsInformation[key]['first_name'] = userLogsInformation[key].shopuser.firstname;
                //     console.log(userLogsInformation[key].user_activity_logs);
                // }
                // console.log(userLogsInformation);
                var result = {
                                    'result': 'OK',
                                    'details': userLogsInformation
                                };
                callback(null, result);
            });

    },
    create: function(parameters, callback) {
            var params = parameters;
            params.date_accessed = moment().format('YYYY-MM-DD HH:MM:SS');
            global
                .seqObj
                .user_activity_logs_table
                .create(params)
                .then(createWorkExperience=>{
                    console.log(createWorkExperience);
                    var result = {
                                    'result': 'OK',
                                    'details': createWorkExperience
                                };
                    callback(null, result);   
                });
            
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