// Implement SearchController here. It should manage Search Results page.

/// <reference path="../refs.ts" />

'use strict'

interface ISearchScope extends ng.IScope {
    model: SearchController;
}

class SearchController {
    public static $inject = ['searchProducts', '$scope'];

    constructor (private searchProducts: auction.model.Product[], private $scope: ISearchScope) {
        $scope.model = this;
    }

    public static resolve = {
        searchProducts: ['ProductService', (productService: auction.service.IProductService) => {
            return productService.getSearchProducts().then (function (data) {
                return data;
            });
        }]
    }
}

angular.module('auction').controller('SearchController', SearchController);
