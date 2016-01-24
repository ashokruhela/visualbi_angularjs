angular.module('vbiApp').controller('chartModalController', ['$scope', '$uibModalInstance', 'chartRenderer', 'parameters', function($scope, $uibModalInstance, chartRenderer, parameters) {
	console.log(chartRenderer);
	console.log($uibModalInstance);
	$scope.hide = function () {
    $uibModalInstance.dismiss('cancel');
  	};
}]);