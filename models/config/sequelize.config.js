
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
	    
	    // global.seqObj.applicants_job_table.belongsTo(global.seqObj.applicants_table, {foreignKey: 'ApplicantNumber',constraints: false});
	    // global.seqObj.applicants_table.belongsToMany(global.seqObj.applicants_job_table, {through: 'applicantjob', foreignKey: 'ApplicantNumber',timestamps: false})
	    global.seqObj.status = 'CONNECTED';
	    console.log('System connected!');

	}); 


result = {'result': 'OK'};
module.exports = result;

