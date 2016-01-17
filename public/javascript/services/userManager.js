angular.module('vbiApp')
    .service('userManager', ['$http', function($http) {
        return {
			  
			  login: function(user, done) {
				  $http.post('/login', {username:user.email, password:user.password})
				  	.success(function (data, status, headers, config) {
					  done(null, data);
					  
				  }).error(function (data, status, header, config) {
					  error = "Invalid User name or passpord!"
					  console.log(data);
					  done(error, data);
					  
				  });
				  
			  },
            
           getUser: function(email, done) {
				  $http({
					  method: 'GET',
					  url: '/user/' + email
				 	}).then(function(res) {
					  done(res.data);
				 	});
           },
            
           getDashboards: function(email) {
                $http({
                    method: 'GET',
                    url: '/dashboard'
                }).then(function(res) {
                    
                });
            }
        };
        
    }]);