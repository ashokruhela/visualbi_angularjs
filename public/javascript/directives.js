angular.module('vbiApp')
    .directive('headerDirective', function(){
    return {
		 templateUrl: 'views/directives/header.html'
    };
});

angular.module('vbiApp')
    .directive('widgetPanel', function(){
        return {
            templateUrl: 'views/directives/widget.html',
//            controller: 'widgetController',
            replace: true,
            scope: {
                widgetId:"@",
                widgetObject: "@",
                getWidgetFunction: "&"
            }
        };
    
    });
