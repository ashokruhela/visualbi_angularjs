angular.module('vbiApp')
    .service('userManager', ['$http', function($http) {
        return {
			  user: {},
			  
			  login: function(user, done) {
				  $http.post('/login', {username:user.email, password:user.password})
				  	.success(function (data, status, headers, config) {
					  done(null, data);
					  
				  }).error(function (data, status, header, config) {
					  error = "Invalid User name or passpord!"
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
            
           getDashboard: function(email, done) {
				  $http({
					  method: 'GET',
					  url: '/dashboard/' + email
				 	}).then(function(res) {
					  done(res.data);
				 	});
           }
        };
        
    }]);