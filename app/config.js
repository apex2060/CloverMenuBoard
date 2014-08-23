app.factory('config', function ($rootScope, $http) {
	var config = {
		fireRoot: 			'https://clovermenuboard.firebaseio.com/',
		fireRef: 			new Firebase('https://clovermenuboard.firebaseio.com/'),
		parseRoot: 			'https://api.parse.com/1/',
	 	parseAppId: 		'DdF22Bds3mDpovzI3fPpyFBJB7CMzhQAN2TBCWTT',
	 	parseJsKey: 		'ridoAXSSAwvvAIEBchxfwSojD8W42MrPcrFfHCRn',
	 	parseRestApiKey: 	'wNs9LgbutOfTw8qmUVSbIGLmVzftIUif2QYlf42u',
	 	roles: 				['Admin','Owner','Manager','Editor']
	};

	Parse.initialize(config.parseAppId, config.parseJsKey);
	 $http.defaults.headers.common['X-Parse-Application-Id'] = config.parseAppId;
	 $http.defaults.headers.common['X-Parse-REST-API-Key'] = config.parseRestApiKey;
	 $http.defaults.headers.common['Content-Type'] = 'application/json';

	return config;
});



app.factory('settings', function ($rootScope) {
	var settings = {
			
	};
	return settings;
});

//Migrate to prod