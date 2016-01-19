angular.module('vbiApp')
    .controller('homeController', ['$rootScope', '$scope', 'userManager', 'widgetManager', function($rootScope, $scope, userManager, widgetManager) {
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
		 
		$scope.returnWidth = function() {
			debugger;
			var b = $('.col-sm-12').width();
			var c = $('.col-sm-6').width();
			console.log("width here", width);
			return width;
		};
}]);