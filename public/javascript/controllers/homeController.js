angular.module('vbiApp')
    .controller('homeController', ['$rootScope', '$scope', 'userManager', '$location', '$cookies', function($rootScope, $scope, userManager, $location, $cookies) {
		 $scope.user = $rootScope.loggedInUser;
		 $scope.isLoading = true;
		 $scope.tabs = [];
		 
		 userManager.getDashboard($rootScope.loggedInUser.authToken)
			 .then(function(dashboards) {
			// Make additional dashboard. Assuming that there is only one dashboard now
			if(dashboards && dashboards.length > 0) {
				var dashboard = dashboards[0];
					 if(dashboard.tabs && dashboard.tabs.length > 0) {
								$scope.tabs = dashboard.tabs;
					 }
				}
		 });
		 
		$scope.logout = function() {
			userManager.logout()
				.then(function() {
					console.log('logged out');
					$cookies.remove($rootScope.authToken);
					$location.url('/');
					//sometime it doesn't redirect
					$scope.$apply() 
			}).catch(function(err) {
				
				console.log(err);
				alert(err);
//				$cookies.remove($rootScope.authToken);
			});
			
		};
		
}]);