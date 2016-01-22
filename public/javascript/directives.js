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
			  var chartRenderer = scope.chartRendererMethod + '.render(elements[0], JSON.parse(scope.parameters))';
				eval(chartRenderer);
		  }
	  };
}]);