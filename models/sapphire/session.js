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
                .session_holders_table
                .create(params)
                .then(createSession=>{
            
                    var result = {
                                    'result': 'OK',
                                    'details': createSession
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
                    attributes: ['firstname', 'lastname', ['email','email_address'], 'password'],
                    //group: 'ApplicantNumber',
                    raw: true,
                    where: {
                        email: parameters.user_name,
                        password: md5(parameters.password)
                    }
                })
                .then(accountInformation=>{
                    
                    var result = {
                        'result': 'ERROR',
                        'details':'INVALID_CREDENTIALS',
                        'session_identifier': 'NONE'
                    };
                    
                    if(Object.keys(accountInformation).length > 0)
                    {
                        var session_identifier = md5(uniqid()) + '-' + md5(accountInformation[0].password);
                        result.result = 'OK';
                        result.details = 'VALID_CREDENTIALS';
                        result.session_identifier = session_identifier;
                        result.account_information = {
                                                        'firstname': accountInformation[0].firstname,
                                                        'lastname': accountInformation[0].lastname,
                                                        'email_address': accountInformation[0].email_address
                                                    };
                        result.session_data = {
                            'user_name': accountInformation[0].email_address,
                            'session_identifier': session_identifier,
                            'date_time_accessed': moment().format('YYYY-MM-DD hh:mm:ss'),
                            'date_time_last_accessed': moment().format('YYYY-MM-DD hh:mm:ss'),
                            'flight_number': 'AA-00001',
                            'user_types': 'INFLIGHTAPP',
                            'ip_address': parameters.ip_address
                        };
                        // this.create(result.session_data, function(err, resultSession) {
                        //     console.log(resultSession);

                        // })
                        
                        
                        var validate_parameters = {
                            'user_name': parameters.user_name,
                            'session_identifier': '3bd753606d28fc86e8b105bf74c0b1f7-387e458b533b9302c59b295fcb5403bc'
                        };
                        result.validate_session = session_manager.validate_session_id(validate_parameters, function(err, resultValidate){
                            console.log(resultValidate);
                        });
                    }   

                    callback(null, result);
                    
                });
            
    },
    validate_session_id: function(parameters, callback) {
        var session_time_span = moment().subtract(30, 'minutes');
        session_time_span = moment(session_time_span).format('YYYY-MM-DD hh:mm:ss');
        global
                .seqObj
                .session_holders_table
                .findAll({
                    attributes: ['user_name', 'session_identifier', ['updatedAt', 'last_accessed']],
                    //group: 'ApplicantNumber',
                    raw: true,
                    where: {
                        'user_name': parameters.user_name,
                        'session_identifier': parameters.session_identifier,
                        'updatedAt': {
                            [global.Op.gte]: session_time_span
                        }
                        
                    }
                })
                .then(validateSession=>{
                    var validate_result;
                    var total_difference = moment().format('YYYY-MM-DD hh:mm:ss');
                    total_difference = moment(total_difference);
                    if(Object.keys(validateSession).length>0)
                    {   
                        validate_result = {'result': 'OK', 'details': total_difference.diff(validateSession[0].last_accessed, 'minutes')};
                    }
                    else
                    {
                       validate_result = {'result': 'ERROR', 'details': 'INVALID SESSION'};
                    }
                    callback(null, validate_result);
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