'use strict';

//TODO validation when min = 40 max = 30
function priceRangeDirective(): ng.IDirective {
    return {
        restrict: 'E',
        templateUrl: 'views/partial/priceRange.html',
        scope: {
            //if one way binding is not set (min-price attribute is not used) then this undefined value
            //overrides default value setted as minPrice in controller every time.
            //so I have separate attrMinPrice for attr and actual minPrice (default or setted) is stored in minPrice
            attrMinPrice  : '@minPrice',
            attrMaxPrice  : '@maxPrice',

            lowPrice  : '=',
            highPrice : '='
        },

        controller: ["$scope", ($scope) => {
            $scope.minPrice = parseInt($scope.attrMinPrice) || 0;
            $scope.maxPrice = parseInt($scope.attrMaxPrice) || 500;

            $scope.lowPrice  =  $scope.lowPrice  || $scope.minPrice;
            $scope.highPrice =  $scope.highPrice || $scope.maxPrice;
        }],

        link: (scope: any, element) => {
            //slider
            var priceSlider : any = angular.element(element).find('div[class="priceRangeSlider"]');
            priceSlider.slider({
                min: scope.minPrice,
                max: scope.maxPrice,
                values: [scope.lowPrice, scope.highPrice],
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

angular.module("auction").directive('auctionPriceRange', priceRangeDirective);