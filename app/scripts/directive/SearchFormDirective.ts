'use strict';

class SearchCriteria {
    public title: string;
    public category: string;
    public lowPrice: number;
    public highPrice: number;
    public date: Object;
    public numberOfBids: number;
}

function searchFormDirective($timeout: ng.ITimeoutService): ng.IDirective {
    return {
        restrict: 'E',
        templateUrl: 'views/partial/searchForm.html',

        scope: {
            searchCriteria: "=",
            categories: "=",
            search: "&"
        },

        controller: ["$scope", function ($scope) {
            $scope.datePickerOpen = ($event) => {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.datePickerOpened = true;
            };

            $scope.today = new Date().setHours(0,0,0,0);
            $scope.searchCriteria.date = $scope.today;
        }]
    }
}

angular.module("auction").directive('auctionSearchForm', ["$timeout", searchFormDirective]);

//date custom validation
angular.module("auction").directive('dateValidation', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function () {
                ctrl.$setValidity('dateMoreThenToday', ctrl.$modelValue >= scope.today);
            });
        }
    }
});