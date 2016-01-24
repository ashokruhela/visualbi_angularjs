angular.module('vbiApp')
	.factory('chartRenderer', ['gdpPerCapitaBarChart', 'gdpStackedBarChart', 'plotContinentChart', 'plotNorthEast', 'executeQueryService', function(gdpPerCapitaBarChart, gdpStackedBarChart, plotContinentChart, plotNorthEast, executeQueryService){
		
		this.plotChart = function(serviceName, chartContainer, parameter) {
			return new Promise(function(resolve, reject) {
				 // temp code to be removed
			  if(serviceName == "{}") {
					serviceName = "gdpStackedBarChart";  
			  	}
			   //temp code ends
				var chartRendererMethod = serviceName + '.render(chartContainer, parameter)';
				eval(chartRendererMethod);
			});
		};
		
		return this;

}]);