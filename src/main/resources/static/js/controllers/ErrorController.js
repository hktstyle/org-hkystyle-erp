MetronicApp.controller('ErrorController', 
	[ '$rootScope', '$scope', '$http', '$timeout',
	function($rootScope, $scope, $http, $timeout) {
		$scope.$on('$viewContentLoaded', function() {
		Metronic.initAjax();
		// set sidebar closed and body solid layout mode
		$rootScope.settings.layout.pageBodySolid = true;
		$rootScope.settings.layout.pageSidebarClosed = false;
		
		var msg = $rootScope.msg;	
		// 错误信息
		$scope.error = {
			message : msg
		};
	});
}]);