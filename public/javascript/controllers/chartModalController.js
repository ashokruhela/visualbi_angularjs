angular.module('vbiApp').controller('chartModalController', ['$scope', '$uibModalInstance', 'chartRendererMethod', 'parameters', function($scope, $uibModalInstance, chartRendererMethod, parameters) {
//	console.log(chartRenderer.render);
	console.log("chart modal controller ", chartRendererMethod);
	$scope.chartRendererMethod = chartRendererMethod;
	$scope.parameters = parameters;
	$scope.title = "Chart title goes here";
	$scope.hide = function () {
    $uibModalInstance.dismiss('cancel');
  	};
}]);