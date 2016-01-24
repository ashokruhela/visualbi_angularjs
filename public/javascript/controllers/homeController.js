angular.module('vbiApp')
    .controller('homeController', ['$rootScope', '$scope', 'userManager', '$location', '$cookies','$timeout', '$uibModal', function($rootScope, $scope, userManager, $location, $cookies, $timeout, $uibModal) {
		 $scope.user = $rootScope.loggedInUser;
		 $scope.isLoading = false;
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
					$cookies.remove($rootScope.authToken);
					$location.url('/');
			}).catch(function(err) {
				//even if any error redirect to home
				$location.url('/');
			});
			
		};
		 
		$scope.fullScreen = function(chartRenderer, parameters, title) {
			console.log("full screen ", chartRenderer);
			console.log("full screen title ", title);
			var modalConfig = {
				templateUrl: 'chartModal',
				controller: 'chartModalController',
				size: 'lg',
				resolve: {
					chartRendererMethod: chartRenderer,
					parameters: parameters
				}
			};
			$uibModal.open(modalConfig);
		}
		
}]);