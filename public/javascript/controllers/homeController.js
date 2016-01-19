angular.module('vbiApp')
    .controller('homeController', ['$scope', 'userManager', 'widgetManager', function($scope, userManager, widgetManager) {
		 $scope.tabs = [];
		 userManager.getDashboard(userManager.user.email, function(dashboards) {
			// Make additional dashboard. Assuming that there is only one dashboard now
			if(dashboards && dashboards.length > 0) {
				var dashboard = dashboards[0];
					 if(dashboard.tabs && dashboard.tabs.length > 0) {
								$scope.tabs = dashboard.tabs;
					 }
				}
		});
}]);