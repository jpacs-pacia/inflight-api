
/****** APPLICANTS CONFIGURATION ********/

global.seqObj = {'status': 'PENDING'};

var Sequelize = require('sequelize');
var sequelize = new Sequelize('inflightapp', 'root', 'l0c4lh0st', {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: '3306',
  operatorsAliases: false
});

global.Op = Sequelize.Op;
global.fn = Sequelize.fn;
global.col = Sequelize.col;
console.log('Connecting system...');

sequelize
	.authenticate()
	.then(()=> {
	    global.executeQuery = function(sql, callback) {
			sequelize.query(sql, { type:Sequelize.QueryTypes.SELECT})
				.then(function(result) {
					callback(null, result);
				});
		}
		/**** MOVIES ****/
	    global.seqObj.movies_table = sequelize.define('movies', 
	    	{
	    		
	    		'title': {type:Sequelize.STRING},
	            'cast': {type:Sequelize.STRING},
	            'director': {type:Sequelize.STRING},
	            'category_id': {type:Sequelize.INTEGER},
	            'content_rating': {type:Sequelize.STRING},
	            'running_time': {type:Sequelize.INTEGER},
	            'release_date': {type:Sequelize.STRING},
	            'cover_image': {type:Sequelize.STRING},
	            'movie_video': {type:Sequelize.STRING},
	            'trailer_video': {type:Sequelize.STRING},
	            'ewallet_price': {type:Sequelize.INTEGER},
	            'token_price': {type:Sequelize.INTEGER},
	            'movie_description': {type:Sequelize.STRING}
	    	}, 
	    	{freezeTableName: true},
	    	{timestamps: false}
	    );
	    
	    /**** USER ACTIVITY LOGS ****/

	    global.seqObj.user_activity_logs_table = sequelize.define('user_activity_logs', 
	    	{		
	    		'user_id': {type:Sequelize.INTEGER},
	    		'user_types': {type: Sequelize.STRING},
	            'transaction_type_id': {type:Sequelize.INTEGER},
	            'transaction_type_code': {type:Sequelize.STRING},
	            'date_accessed': {type:Sequelize.DATE},
	            'description': {type:Sequelize.STRING}
	    	}, 
	    	{freezeTableName: true},
	    	{timestamps: false}
	    );

	    /*** SAPPHIRE USER - APPLICATION USERS ***/
	    global.seqObj.appusers_table = sequelize.define('appusers', 
	    	{		
	    		'firstname': {type:Sequelize.STRING},
	    		'lastname': {type: Sequelize.STRING},
	            'email': {type:Sequelize.STRING},
	            'password': {type:Sequelize.STRING}
	    	}, 
	    	{freezeTableName: true},
	    	{timestamps: false}
	    );

	    /*** SAPPHIRE USER - SHOP USERS  ***/
	    global.seqObj.shopusers_table = sequelize.define('shopusers', 
	    	{		
	    		'firstname': {type:Sequelize.STRING},
	    		'lastname': {type: Sequelize.STRING},
	            'email': {type:Sequelize.STRING},
	            'ewallet': {type:Sequelize.DOUBLE},
	            'tokens': {type:Sequelize.DOUBLE},
	            'contactno': {type:Sequelize.BIGINT},
	            'password': {type:Sequelize.STRING}

	    	}, 
	    	{freezeTableName: true},
	    	{timestamps: false}
	    );

	    /*** SAPPHIRE USER - SHOP USERS  ***/
	    global.seqObj.session_holders_table = sequelize.define('session_holders', 
	    	{		
	    		'user_name': {type:Sequelize.STRING},
	    		'session_identifier': {type: Sequelize.STRING},
	            'date_time_accessed': {type:Sequelize.DATE},
	            'date_time_last_accessed': {type:Sequelize.DATE},
	            'ip_address': {type:Sequelize.STRING},
	            'user_types': {type:Sequelize.STRING},
	            'flight_number': {type:Sequelize.STRING}
	    	}, 
	    	{freezeTableName: true},
	    	{timestamps: false}
	    );

	    /*** TABLE JOINS ***/

	    /*** ACCOUNTS TO USER LOGS ***/
	    global.seqObj.user_activity_logs_table.belongsTo(global.seqObj.shopusers_table, {foreignKey:'user_id',constraints:false});
	    global.seqObj.shopusers_table.hasMany(global.seqObj.user_activity_logs_table);
	   

	   /*** MOVIES TO USER LOGS ***/
	   global.seqObj.user_activity_logs_table.belongsTo(global.seqObj.movies_table, {foreignKey:'transaction_type_id',constraints:false});
	   global.seqObj.movies_table.hasMany(global.seqObj.user_activity_logs_table, {foreignKey:'id',constraints:false});
	    // global.seqObj.user_activity_logs_table.belongsTo()
	    // global.seqObj.applicants_job_table.belongsTo(global.seqObj.applicants_table, {foreignKey: 'ApplicantNumber',constraints: false});
	    // global.seqObj.applicants_table.belongsToMany(global.seqObj.applicants_job_table, {through: 'applicantjob', foreignKey: 'ApplicantNumber',timestamps: false})
	    global.seqObj.status = 'CONNECTED';
	    console.log('System connected!');

	}); 


result = {'result': 'OK'};
module.exports = result;

