var TodoApp = angular.module('TodoApp', ['ngRoute', 'ngResource'])
	.config(function ($routeProvider) {
    		$routeProvider.
				when('/', { controller: ListCtrl, templateUrl: '/list.html' }).
				otherwise({ redirectTo: '/' });
		});

TodoApp.factory('Todo', function ($resource) {
	return $resource('/api/Todo/:id', { id: '@id' }, { update: { method: 'PUT' } });
});

var ListCtrl = function ($scope, $location, Todo) {
	$scope.appTitle = "Do All The Things";
	$scope.appSlogan = "Making your life easier one task at a time";
	$scope.reset = function() {
		$scope.items = Todo.query({ q: $scope.query });
	};

	$scope.reset();
};

