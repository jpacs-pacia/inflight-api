var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/recruitment_db_hris');
var db = mongoose.connection;
var schema = new mongoose.Schema({  'applicant_id' : 'string', 
										'last_name': 'string', 
										'first_name': 'string',
										'middle_name': 'string',
										'address_1': 'string',
										'address_2': 'string',
										'municipality_city': 'string',
										'province': 'string',
										'birthday': 'string',
										'gender': 'string',
										'status': 'string',
										'phone_number': 'string',
										'email_address': 'string',
										'status': 'string'
									});

var create = function(object, callback) {
	
	var applicants = mongoose.model('applicants', schema);
	var applicantsObject = applicants({ 'applicant_id' : 'APP-0000000000002', 
											'last_name': 'Dela Cruz', 
											'first_name': 'Juan',
											'middle_name': 'Pedro',
											'address_1': '147 San Roque',
											'address_2': 'NONE',
											'municipality_city': 'Macabebe',
											'province': 'Pampanga',
											'birthday': '1985-10-29',
											'gender': 'Male',
											'status': 'Single',
											'phone_number': '09123456789',
											'email_address': 'hrmd@lausgroup.com.ph',
											'status': 'Processing'
									});
		applicantsObject.save(function (err) {
		  	var result = {'result': 'OK', 'details': 'Applicants saved'};
			callback(null, result);
		});
}
var create_schema = function(object, callback) {

	var schema = new mongoose.Schema({  'applicant_id' : 'string', 
										'last_name': 'string', 
										'first_name': 'string',
										'middle_name': 'string',
										'address_1': 'string',
										'address_2': 'string',
										'municipality_city': 'string',
										'province': 'string',
										'birthday': 'string',
										'gender': 'string',
										'status': 'string',
										'phone_number': 'string',
										'email_address': 'string',
										'status': 'string'
									});

	var applicants = mongoose.model('applicants', schema);
	var applicantsObject = new applicants({ 'applicant_id' : 'APP-0000000000001', 
											'last_name': 'Dela Cruz', 
											'first_name': 'Juan',
											'middle_name': 'Pedro',
											'address_1': '147 San Roque',
											'address_2': 'NONE',
											'municipality_city': 'Macabebe',
											'province': 'Pampanga',
											'birthday': '1985-10-29',
											'gender': 'Male',
											'status': 'Single',
											'phone_number': '09123456789',
											'email_address': 'hrmd@lausgroup.com.ph',
											'status': 'Processing'
									});
		applicantsObject.save(function (err) {
		  	var result = {'result': 'OK', 'details': 'Applicants schema creation'};
			callback(null, result);
		});
}

var read = function(object, callback) {

}

exports_setup = {
					'create': create,
                    /**** OTHERS ****/
                    'create_schema': create_schema
                };

module.exports = exports_setup;