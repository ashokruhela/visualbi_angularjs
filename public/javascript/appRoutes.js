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
        })
			  
			.otherwise({
        		redirectTo: '/home'
      });
        
}]).run(['$rootScope','$location', function($rootScope, $location) {
	  $rootScope.$on('$routeChangeStart', function(event, next, current) {
		  //hard code not login to avoid multiple times
//		  $rootScope.loggedInUser = {name: "Ashok Kumar", email: "ashok.kumar6@wipro.com"};
		  if(window.localStorage['session']) {
				$rootScope.loggedInUser= JSON.parse(window.localStorage['session']);  
		  }
		  
		  if(!$rootScope.loggedInUser) {
			  //nobody logged in, redirect to /
			  if ( next.templateUrl !== "views/login.html") {
				  $location.path("/");
				}
		  } 
		  else {
			  $location.path("/home");
		  }
	  });
}]);