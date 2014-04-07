'use strict';

function navbarDirective(): ng.IDirective {
    return <ng.IDirective> {
        scope: false,
        restrict: 'E',
        templateUrl: 'views/partial/navbar.html'
    }
}

angular.module("auction").directive('auctionNavbar', navbarDirective);