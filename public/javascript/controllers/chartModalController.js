angular.module('vbiApp').controller('chartModalController', ['$scope', '$uibModalInstance', 'chartRenderer', 'parameters', function($scope, $uibModalInstance, chartRenderer, parameters) {
	console.log(chartRenderer.render);
	console.log($uibModalInstance);
	$scope.chartRenderer = chartRenderer;
	$scope.parameters = parameters;
	$scope.hide = function () {
    $uibModalInstance.dismiss('cancel');
  	};
}]);