
var movies_table = {		'fields': 
								['title','cast','director','category_id','content_rating','running_time','release_date','cover_image','movie_video','trailer_video','ewallet_price','token_price','movie_description'],
							'sort':
								[['title', 'ASC']]
};

var user_activity_logs_table = {
							'fields': 
								['user_id','user_types','transaction_type_id','transaction_type_code','date_accessed','description'],
							'sort':
								[['description', 'ASC']]

};

var appusers_table =  {
							'fields': 
								['firstname','lastname','email','password'],
							'sort':
								[['email', 'ASC']]
};
var tables = {
				'movies': movies_table, 
				'user_activity_logs': user_activity_logs_table, 
				'appusers': appusers_table
			};
module.exports = tables;


