angular.module('vbiApp').controller('chartModalController', ['$scope', '$uibModalInstance', 'chartRendererMethod', 'parameters', 'title', function($scope, $uibModalInstance, chartRendererMethod, parameters, title) {
//	console.log(chartRenderer.render);
	console.log("chart modal controller ", chartRendererMethod);
	$scope.chartRendererMethod = chartRendererMethod;
	$scope.parameters = parameters;
	$scope.title = title;
	$scope.hide = function () {
    $uibModalInstance.dismiss('cancel');
  	};
}]);