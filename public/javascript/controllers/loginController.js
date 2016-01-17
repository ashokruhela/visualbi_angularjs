angular.module('vbiApp')
    .controller('loginController', ['$scope', '$location', 'userManager', function($scope, $location, userManager) {
	 $scope.loggedInUser = {};
    $scope.user = {
        email: "",
        password: ""
    };
                                    
    $scope.errorMessage = "";
    $scope.login = function() {
		  debugger;
		  userManager.login($scope.user, function(err, data) {
				if(!err) {
					 debugger;
					 //logged in successfully. load the dashboard
					 $scope.loggedInUser = data;
					 $scope.$watch($scope.loggedInUser, function(){
						  userManager.user = $scope.loggedInUser;
					 });
					 
					 var url = $location.url();
					 $location.url(url + 'home');
//					 $window.location.href = url;
				} else {
					 $scope.errorMessage = err;
				}
				
		  });
    };
                                    
    
}]);