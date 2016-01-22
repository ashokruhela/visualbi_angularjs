angular.module('vbiApp')
    .directive('headerDirective', function(){
    return {
		 templateUrl: 'views/directives/header.html'
    };
	
}).directive('widgetPanel', ['chartRenderer', function(chartRenderer){
	  return {
		  templateUrl: 'views/directives/widget.html',
		  replace: true,
		  link: function(scope,elements, attrs) {
			  console.log(elements);
			  chartRenderer.plotContinentChart(elements[0], 400, 'chartdata/gdpContinent');
		  }
	  };
    
}]).directive('chartPanel', ['plotContinentChart', 'gdpPerCapitaBarChart', 'gdpStackedBarChart', 'plotNorthEast', function(plotContinentChart, gdpPerCapitaBarChart, gdpStackedBarChart, plotNorthEast){
	  return {
		  
		  templateUrl: 'views/directives/chart.html',
		  replace: true,
		  scope: {
			  parameters: "@",
			  chartRendererMethod : "@",
			  isLoading: "="
		  },
		  
		  link: function(scope, elements, attrs) {
			  var watchMethod = scope.$watch(function() {
				  		return elements[0].clientWidth;
			 		}, function(value){
				  		if(value > 0) {
							var params = JSON.parse(scope.parameters);
							var chartRenderer = scope.chartRendererMethod + '.render(elements[0], params)';
							eval(chartRenderer)
								.then(function(data) {
								
								watchMethod();
								scope.$apply();
//								console.log(scope.chartRendererMethod + ' chart plotted successfully');
							});
						}
			 	});
		  }
	  };
}]);