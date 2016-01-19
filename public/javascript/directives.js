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
			  chartRendererFunction : "@",
			  returnWidth: "&",
			  colWidth: "@"
		  },
		  link: function(scope,elements, attrs) {
			  scope.dataUrl = 'chartdata/gdpContinent';
			  scope.chartRendererFunction = 'plotContinentChart';
//			  var a = returnWidth();
			  var w = chartRenderer.getContainerWidth(elements[0]);
			  
			  scope.$watch(function() {
				  		return elements[0].clientWidth;
			 		}, function(value){
				  		if(value >0) {
							console.log(scope.chartRendererFunction);
							console.log(chartRenderer[scope.chartRendererFunction]);
							chartRenderer['plotContinentChart'](elements[0], value, scope.dataUrl);
						}
			 	});
			  
			  
		  }
	  };
}]);