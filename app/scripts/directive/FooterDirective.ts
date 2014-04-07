'use strict';

function footerDirective(): ng.IDirective {
    return <ng.IDirective> {
        scope: false,
        restrict: 'E',
        templateUrl: 'views/partial/footer.html'
    }
}

angular.module("auction").directive('auctionFooter', footerDirective);