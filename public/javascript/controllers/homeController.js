angular.module('vbiApp')
    .controller('homeController', ['$rootScope', '$scope', 'userManager', 'widgetManager', '$location', '$cookies', function($rootScope, $scope, userManager, widgetManager, $location, $cookies) {
		 $scope.user = $rootScope.loggedInUser;
		 $scope.isLoading = true;
		 $scope.tabs = [];
		 
		 userManager.getDashboard($rootScope.loggedInUser.email)
			 .then(function(dashboards) {
			// Make additional dashboard. Assuming that there is only one dashboard now
			if(dashboards && dashboards.length > 0) {
				var dashboard = dashboards[0];
					 if(dashboard.tabs && dashboard.tabs.length > 0) {
								$scope.tabs = dashboard.tabs;
					 }
				}
		 });
		 
		$scope.logout = function(event) {
			$cookies.remove($rootScope.authToken);
			$location.url("/");
		};
		
}]);