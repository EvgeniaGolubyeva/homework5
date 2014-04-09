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
            $scope.datePickerOpen = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.datePickerOpened = true;
            };
        }]
    }
}

angular.module("auction").directive('auctionSearchForm', ["$timeout", searchFormDirective]);