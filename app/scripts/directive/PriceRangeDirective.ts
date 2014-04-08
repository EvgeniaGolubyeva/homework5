'use strict';

interface IPriceRangeScope extends ng.IScope {
    minPrice  : number;
    maxPrice  : number;
    lowPrice  : number;
    highPrice : number;
}

function priceRangeDirective($timeout: ng.ITimeoutService): ng.IDirective {
    return {
        restrict: 'E',
        templateUrl: 'views/partial/priceRange.html',

        scope: {
            minPrice  : '@',
            maxPrice  : '@',
            lowPrice  : '=',
            highPrice : '='
        },

        link: (scope: IPriceRangeScope, element) => {
            //default values ???
            var min  = scope.minPrice  || 0;
            var max  = scope.maxPrice  || 500;

            //slider
            var priceSlider : any = angular.element(element).find('div[class="priceRangeSlider"]');
            priceSlider.slider({
                min: min,
                max: max,
                values: [scope.lowPrice  || scope.minPrice, scope.highPrice || scope.maxPrice],
                range: true,
                slide: (e, ui) => scope.$apply(function () {
                    scope.lowPrice  = ui.values[0];
                    scope.highPrice = ui.values[1];
                })
            });

            scope.$watch('lowPrice' , (newValue, oldValue) => {
                //TODO try to remove if
                if (newValue < scope.highPrice) priceSlider.slider("values", [newValue, scope.highPrice]);

            });
            scope.$watch('highPrice', (newValue, oldValue) => {
                //TODO try to remove if
                if (newValue > scope.lowPrice) priceSlider.slider("values", [scope.lowPrice, newValue]);
            });
        }
    }
}

angular.module("auction").directive('auctionPriceRange', ["$timeout", priceRangeDirective]);