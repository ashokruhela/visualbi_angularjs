angular.module('vbiApp')
    .controller('homeController', ['$rootScope', '$scope', 'userManager', 'widgetManager', '$location', function($rootScope, $scope, userManager, widgetManager, $location) {
		 $scope.user = $rootScope.loggedInUser;
		 
		 $scope.tabs = [];
		 
		 userManager.getDashboard($rootScope.loggedInUser.email, function(dashboards) {
			// Make additional dashboard. Assuming that there is only one dashboard now
			if(dashboards && dashboards.length > 0) {
				var dashboard = dashboards[0];
					 if(dashboard.tabs && dashboard.tabs.length > 0) {
								$scope.tabs = dashboard.tabs;
					 }
				}
		});
		 
		$scope.logout = function(event) {
			debugger;
			console.log('logout requested');
			window.localStorage['session'] = null;
			$location.url("/");
		};
		
}]);