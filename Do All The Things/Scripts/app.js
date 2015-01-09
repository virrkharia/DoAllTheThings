var TodoApp = angular.module('TodoApp', ['ngRoute', 'ngResource'])
	.config(function ($routeProvider) {
    		$routeProvider.
				when('/', { controller: ListCtrl, templateUrl: '/list.html' }).
				otherwise({ redirectTo: '/' });
		});

TodoApp.factory('Todo', function ($resource) {
	return $resource('/api/Todo/:id', { id: '@id' }, { update: { method: 'PUT' } });
});

TodoApp.directive('sorted', function() {
	return {
		scope: true,
		transclude: true,
		restrict: 'A',
		template: '<a ng-click="do_sort()" ng-transclude></a>' +
			'<span ng-show="do_show(true)"><i class="icon-circle-arrow-down"></i></span>' +
			'<span ng-show="do_show(false)"><i class="icon-circle-arrow-up"></i></span>',
		controller: function($scope, $element, $attrs) {
			$scope.sort_by = $attrs.sorted;
			$scope.do_sort = function() {
				$scope.sort($scope.sort_by);
				$scope.do_show = function(asc) {
					return (asc != $scope.is_desc) && ($scope.sort_order == $scope.sort_by);
				};
			};
		}
	};
});

var ListCtrl = function($scope, $location, Todo) {
	$scope.appTitle = "Do All The Things";
	$scope.appSlogan = "Making your life easier one task at a time";

	$scope.search = function() {
		Todo.query({
				q: $scope.query,
				sort: $scope.sort_order,
				desc: $scope.is_desc,
				offset: $scope.offset,
				limit: $scope.limit
			},
			function (data) {
				$scope.more = data.length === 20;
				$scope.items = $scope.items.concat(data);
			});
	};

	$scope.sort = function(col) {
		if ($scope.sort_order === col) {
			$scope.is_desc = !$scope.is_desc;
		} else {
			$scope.sort_order = col;
			$scope.is_desc = false;
		}
		$scope.reset();
	};

	$scope.show_more = function() {
		$scope.offset += $scope.limit;
		$scope.search();
	};

	$scope.has_more = function() {
		return $scope.more;
	};

	$scope.reset = function() {
		$scope.limit = 20;
		$scope.offset = 0;
		$scope.items = [];
		$scope.more = true;
		$scope.search();
	};
	
	$scope.sort_order = "Priority";
	$scope.is_desc = false;

	$scope.reset();
};