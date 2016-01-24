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
		 
		$scope.fullScreen = function(chartRenderer, parameters) {
			var modalConfig = {
				templateUrl: 'chartModal',
				controller: 'chartModalController',
				size: 'lg',
				resolve: {
					chartRenderer: chartRenderer,
					parameters: parameters
				},
				link: function(scope, element, attrs) {
					console.log(element);
				}
			};
			var modalInstance = $uibModal.open(modalConfig);
			console.log(modalInstance.opened);
			modalInstance.rendered.then(function(a, b,c) {
				var modalElement = angular.element($('#chartModal .modal-body'));
				console.log("modal renderd",modalElement);
				modalElement.append('<div>"Hello - set from home"</div>');
			});
			modalInstance.opened.then(function(a, b,c) {
				var modalElement = angular.element($('#chartModal .modal-body'));
				console.log("modal element",modalElement);
				modalElement.innerHTML = "Hello - set from home";
			});
//			modalInstance.result.then(function(selectedItem) {
//				debugger;
//				alert('some stuff before openeing')
//			}, function(){
//				console.log('modal closed');
//			});
		}
		
}]);