angular.module('vbiApp')
    .config(['$routeProvider', function($routeProvider) {
        
        $routeProvider
        
        .when('/', {
            templateUrl: 'views/login.html',
            controller: 'loginController'
        })
        
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })
        
        .when('/widget',{
            templateUrl: 'views/widget.html',
            controller: 'widgetController'
        }).otherwise({
        	redirectTo: '/home'
      });;
        
        
}]);