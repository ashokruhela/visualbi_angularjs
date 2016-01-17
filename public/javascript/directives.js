//angular.module('vbiApp')
//    .directive('header', function(){
//    return {
//        templateUrl: 'views/directives/header.html',
//        controller: 'headerController'
//    };
//});

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

