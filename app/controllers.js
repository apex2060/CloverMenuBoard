var MainCtrl = app.controller('MainCtrl', function($rootScope, $scope, $routeParams, $location, $http, config, userService, dataService){
	$rootScope.action = $routeParams.action;
	$rootScope.view = $routeParams.view;
	$rootScope.id = $routeParams.id;
	$rootScope.config = config;
	$rootScope.moment = moment;

	function setup(){
		$scope.$on('$viewContentLoaded', function(event) {
			// ga('send', 'pageview', $location.path());
		});
	}

	
	var tools = {
		rp: $routeParams,
		loc: $location,
		user: userService,
		logout: function(){
			tools.user.logout();
			tools.setup();
		},
		url:function(){
			console.log($routeParams.view, $routeParams.view.indexOf('access_token')!=-1)
			if($routeParams.view.indexOf('access_token') != -1){
				$rootScope.access_token = $routeParams.view.split('=')[1]
				$location.path('/start')
			}
			if($rootScope.user)
				return 'views/'+$routeParams.view+'.html';
			else
				return 'views/auth.html';
		},
		side:function(side, url){
			if(url)
				if(url=='show')
					$('#aside_'+side).addClass('show');
				else if(url=='hide')
					$('#aside_'+side).removeClass('show').addClass('hide');
				else
					$rootScope.side[side]=url;
			else
				return $rootScope.side[side]
		},
		setup:function(){
			userService.init();
			setup();
			$rootScope.data=	{};
			$rootScope.resource={};
			$rootScope.temp=	{};
			$rootScope.side=	{};
			$rootScope.mode=	'normal';
			tools.side('left','partials/sidebar.html')
			// tools.side('right','partials/sidebar.html')
		}
	}
	$scope.tools 			= tools;
	$rootScope.rootTools 	= tools;

	if(!$rootScope.data){
		tools.setup();
	}
	it.MainCtrl=$scope;
});




/*
?merchant_id=VAD1KXRANSGMG
&employee_id=P5VNAG599QEJ6
&client_id=NB6RYVATYYGQ8
&code=ff79deec-c758-a9d4-99ac-b23864d1d749
#/setup

?merchant_id=VAD1KXRANSGMG&employee_id=P5VNAG599QEJ6&client_id=NB6RYVATYYGQ8#
/access_token=b7c3b84e-a139-015f-87c9-ba5ff1747bdc
*/















var AdminCtrl = app.controller('AdminCtrl', function($rootScope, $scope, $http, $q, config, initSetupService, roleService){
	var tools = {
		email:function(fun){
			$http.post(config.parseRoot+'functions/'+fun, {}).success(function(data){
				$scope.response = data;
			}).error(function(error, data){
				$scope.response = {error:error,data:data};
			});
		},
		setup:function(){
			roleService.detailedRoles().then(function(roles){
				$rootScope.data.roles = roles;
				roleService.unassigned().then(function(unassigned){
					$rootScope.data.unassigned = unassigned;
				})
			})
		},
		userRoles:roleService,
		user:{
			editRoles:function(user){
				$rootScope.temp.user = user;
				$('#adminUserModal').modal('show');
				// ga('send', 'event', 'admin', 'editRoles');
			}
		},
		roles:{
			setup:function(){	//This is a one time only thing - used to initiate the website roles.
				initSetupService.setup($rootScope.user,config.roles).then(function(results){
					$rootScope.data.roles = results;
				})
			}
		}
	}

	tools.setup();
	$scope.$on('authenticated', function() {
		tools.setup();
	})
	$rootScope.$on('role-reassigned', function(event,unassigned){
		$rootScope.data.unassigned = unassigned;
	})
	$scope.tools = tools;
	it.AdminCtrl=$scope;
});