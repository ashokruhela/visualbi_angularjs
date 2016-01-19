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
			  jsonUrl: "@",
			  chartRendererMethod : "@"
		  },
		  
		  link: function(scope,elements, attrs) {
			  console.log("url", scope.dataUrl);
			  console.log("rederer method", scope.chartRendererMethod);
//			  chartRenderer[scope.chartRendererMethod](elements[0], 500, scope.dataUrl);
			  scope.$watch(function() {
				  		return elements[0].clientWidth;
			 		}, function(value){
				  		if(value >0) {
							debugger;
							
							chartRenderer[scope.chartRendererMethod](elements[0], value, scope.dataUrl);
						}
			 	});
			  
			  
		  }
	  };
}]);