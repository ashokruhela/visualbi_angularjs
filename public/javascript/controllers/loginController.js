angular.module('vbiApp')
    .controller('loginController', ['$rootScope', '$scope', '$location', 'userManager', function($rootScope, $scope, $location, userManager) {
	 $rootScope.loggedInUser = {};
    $scope.user = {
        email: "",
        password: ""
    };
                                    
    $scope.errorMessage = "";
    $scope.login = function() {
		  userManager.login($scope.user, function(err, data) {
				if(!err) {
					 //logged in successfully. load the dashboard
					 $rootScope.loggedInUser = data;
					window.localStorage['session'] = JSON.stringify($rootScope.loggedInUser);
//					 $scope.$watch($scope.loggedInUser, function(){
//						  userManager.user = $scope.loggedInUser;
//					 });
					 
					 var url = $location.url();
					 $location.url(url + 'home');
				} else {
					 $scope.errorMessage = err;
				}
				
		  });
    };
                                    
    
}]);