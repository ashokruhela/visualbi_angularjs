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
    
}]).directive('chartPanel', ['chartRenderer', function(chartRenderer){
	  return {
		  templateUrl: 'views/directives/chart.html',
		  replace: true,
		  scope: {
			  dataUrl: "@",
			  chartRendererFunction : "@"
		  },
		  link: function(scope,elements, attrs) {
			  debugger;
			  console.log(scope);
			  scope.dataUrl = 'chartdata/gdpContinent';
			  scope.chartRendererFunction = 'plotContinentChart';
			  chartRenderer[scope.chartRendererFunction](elements[0], 400, scope.dataUrl);
		  }
	  };
}]);