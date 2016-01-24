angular.module('vbiApp')
    .directive('chartPanel', ['chartRenderer', function(chartRenderer){
	  return {
		  
		  templateUrl: 'views/directiveTemplates/chart.html',
		  replace: true,
		  transclude: true,
		  scope: {
			  parameters: "@",
			  chartRendererMethod : "@",
		  },
		  
		  link: function(scope, elements, attrs) {
			  var params;
			  if(scope.parameters) {
				  params = JSON.parse(scope.parameters);
			  }
			  chartRenderer.plotChart(scope.chartRendererMethod, elements[0].childNodes[1], params)
					.then(function(data) {
				  		//any stuff after plotting the chart will go here
				});
		  }
	  };
}]);