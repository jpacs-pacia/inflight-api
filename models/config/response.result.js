
var RETURN_OK =  function(parameters, callback) {
					result = {
							'result': 'OK',
							'details': parameters.details
					};
					callback(null, result);	
				}


var RETURN_ERROR = {
					'result': 'ERROR',
					'details': [],
					'notification': ''
				};

var RETURN_CREATE = {
					'result': 'OK',
					'details': 'Successfully created.'
				};

var result = {
				'RETURN_OK': RETURN_OK, 
				'RETURN_ERROR': RETURN_ERROR,
				'RETURN_CREATE': RETURN_CREATE
			};
module.exports = result;


