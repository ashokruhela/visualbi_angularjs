angular.module('vbiApp')
    .controller('homeController', ['$scope', 'userManager', 'widgetManager', function($scope, userManager, widgetManager) {
        
        //loads the widgets into widgetManager so that is it widget info be available
        widgetManager.getWidgets(function (widgets) {
            $scope.widgets = widgets;
            //Get users and create dashboards
            userManager.getUser('ashok.kumar6@wipro.com', function(user) {
            // Make additional dashboard. Assuming that there is only one dashboard now
            $scope.tabs = [];
            if(user && user.dashboards && user.dashboards.length >0) {
                var dashboard = user.dashboards[0];
                if(dashboard.tabs && dashboard.tabs.length > 0) {
                        $scope.tabs = user.dashboards[0].tabs;
                }
            }
        });
    });
        
//    $scope.getWidget = widgetManager.getWidget
      $scope.getWidget = function(widgetId) {
        if($scope.widgets && $scope.widgets.length >0) {
            $scope.widgets.filter(function(w) {
                console.log(w);
                return w.widgetId == widgetId ? w : {};
            });
        } else
            return {};
    }
        
}]);