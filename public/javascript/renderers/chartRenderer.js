angular.module('vbiApp')
	.factory('chartRenderer', ['gdpPerCapitaBarChart', 'gdpStackedBarChart', 'plotContinentChart', 'plotNorthEast', 'executeQueryService', function(gdpPerCapitaBarChart, gdpStackedBarChart, plotContinentChart, plotNorthEast, executeQueryService){
		
		return {
			plotChart: function(serviceName, chartContainer, parameter) {
				return new Promise(function(resolve, reject) {
					var chartRendererMethod = serviceName + '.render(chartContainer, parameter)';
					eval(chartRendererMethod);
				});
			}
		}
//		this.plotChart(serviceName, chartContainer, parameter) {
//			return new Promise(function(resolve, reject) {
//				var chartRendererMethod = serviceName + '.render(chartContainer, parameter)';
//				eval(chartRendererMethod);
//			});
//		}
}]);