'use strict';

function navbarDirective(): ng.IDirective {
    return {
        scope: false,
        restrict: 'E',
        templateUrl: 'views/partial/navbar.html'
    }
}

angular.module("auction").directive('auctionNavbar', navbarDirective);