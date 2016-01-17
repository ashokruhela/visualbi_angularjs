angular.module('vbiApp')
    .service('widgetManager', ['$http', function($http) {
        return {
            
            getWidgetFromDB: function(widgetId, done) {
                $http({
                    method: 'GET',
                    url: '/widgets/' + widgetId
                }).then(function(res) {
                    done(res.data);
                });
            },
            
            getWidget: function(widgetId) {
                if(this.widgets && this.widgets.length >0) {
                    this.widgets.filter(function(w) {
                        console.log(w);
                        return w.widgetId == widgetId ? w : {};
                    });
                } else
                    return {};
            },
            
            getWidgets: function(done) {
                $http({
                    method: 'GET',
                    url: '/widgets'
                }).then(function(res) {
                    this.widgets = res.data;
                    done(this.widgets);
                });
            }
            
        };
        
    }]);