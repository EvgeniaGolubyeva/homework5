/// <reference path="../refs.ts" />

'use strict';

function navbarDirective($rootScope): ng.IDirective {
    return {
        scope: false,
        restrict: 'E',
        templateUrl: 'views/partial/navbar.html',
        controller: ['$scope', 'SearchCriteriaService',
            function($scope, searchCriteriaService: auction.service.ISearchCriteriaService) {
                $scope.searchCriteria = searchCriteriaService.getSearchCriteria();
            }]
    }
}

angular.module('auction').directive('auctionNavbar', navbarDirective);