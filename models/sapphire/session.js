/** SETTINGS **/

var mysql = require('mysql');
var dbase = require(global.appConfiguration.app_configuration_directory + '/sequelize.config.js');
var stables = require(global.appConfiguration.app_configuration_directory + '/sequelize.tables.js');
var uniqid = require('uniqid');
var isset = require('isset');
var moment = require('moment');
var sprintf = require("sprintf-js").sprintf;
var vsprintf = require("sprintf-js").vsprintf;
var md5 = require('md5');

/** REST METHODS **/
var session_manager = {
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
            
                    var result = {
                                    'result': 'OK',
                                    'details': createWorkExperience
                                };
                    callback(null, result);   
                });
            
    },
    login: function(parameters, callback) {
            var params = parameters;
            params.date_accessed = moment().format('YYYY-MM-DD HH:MM:SS');
            global
                .seqObj
                .shopusers_table
                .findAll({
                    attributes: ['firstname', 'lastname', ['email','email_address']],
                    //group: 'ApplicantNumber',
                    raw: true,
                    where: {
                        email: parameters.user_name,
                        password: md5(parameters.password)
                    }
                })
                .then(accountInformation=>{
                    var session_identifier = 'TEMP';
                    var result = {
                        'result': 'ERROR',
                        'details':'INVALID_CREDENTIALS',
                        'session_identifier': 'NONE'
                    };
                    
                    if(Object.keys(accountInformation).length > 0)
                    {
                        result.result = 'OK';
                        result.details = 'VALID_CREDENTIALS';
                        result.session_identifier = session_identifier;
                        result.account_information = accountInformation;
                    }

                    callback(null, result);
                    
                });
            
    }
};

/** EXTRA METHODS **/

var nactivity_logs = {

};

exports_setup = {
                    'create': session_manager.create,
                    'read': session_manager.read,

                    // 'update': update,
                    // 'delete': deletes,
                    //'application': jobs.application,
                    //'job_details': jobs.details
                    /*** EXTRA METHDOS ***/
                    'login': session_manager.login

                };
module.exports = exports_setup;