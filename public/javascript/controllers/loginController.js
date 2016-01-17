angular.module('vbiApp')
    .controller('loginController', ['$scope', '$location', 'userManager', function($scope, $location, userManager) {
    $scope.user = {
        email: "",
        password: ""
    };
                                    
    $scope.errorMessage = "";
    $scope.login = function() {
		  userManager.login($scope.user, function(err, user) {
				if(!err) {
					 //logged in successfully. load the dashboard
					 userManager.user = user;
					 var url = $location.url();
					 console.log(url);
					 $location.url(url + 'home');
//					 $window.location.href = url;
				} else {
					 $scope.errorMessage = err;
				}
				
		  });
    };
                                    
    
}]);