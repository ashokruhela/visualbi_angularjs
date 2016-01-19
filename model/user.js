 var mongoose = require('mongoose'),
	  deepPopulate = require('mongoose-deep-populate')(mongoose);

var UserSchema = mongoose.Schema({
   name: String,
   email: String,
   password: String,
//	widgetId: {type: mongoose.Schema.ObjectId, ref: 'Widget'},
   preferences:[{
      _id: false,
      theme:String,
      showLegend: Boolean
   }],
   dashboards: [{
      sharedWith: [mongoose.Schema.Types.Mixed],
      tabs: [{tabTitle: String,
         tabId: String,
         rows: [{
            colWidth: String,
            widgetId: {type: mongoose.Schema.ObjectId, ref: 'Widget'}
         }]
      }]
   }]
}, {strict: false});

UserSchema.statics.getUser = function (email, callback) {
   this.model('User').findOne({
      'email': email
   }, {
      '_id': 0
   },function(err, data) {
      callback(data);
   });
}

UserSchema.plugin(deepPopulate);

UserSchema.statics.getDashboard = function (email, callback) {
	this.model('User')
		.findOne({
		'email': email
	}, {
		'_id': 0,
		'password':0
	}).deepPopulate('dashboards')
		.exec(function(err, data) {
		callback(data.dashboards);
	});
}

UserSchema.statics.getTabs = function (email, callback) {

   this.model('User').find({
      'email': email
   }, {
      'preferences.theme': 1,
      'dashboards.tabs.tabTitle': 1,
      'dashboards.tabs.tabId': 1,
      '_id': 0
   },function(err, data) {
      var tabs = [];
      if(data && data.length > 0 && data[0].dashboards.length > 0) {
         tabs = data[0];
      }
      callback(tabs);
   });
}

UserSchema.statics.findById = function(id, callback) {
   this.model('User').findOne({"email" : id }, {
      "_id": 0,
      "password": 1,
      "email": 1,
      "name": 1}, function(err, data) {
      callback(err, data);
   })
}

UserSchema.statics.setUserTheme=function(id, userTheme){
   this.model('User').update({
     'email' : id
   },{
     $set: {
       preferences:{
         theme:userTheme
       }
     }
   },function(err, userTheme) {
   });
}

module.exports = mongoose.model("User", UserSchema);
