// Implement SearchController here. It should manage Search Results page.

/// <reference path="../refs.ts" />

'use strict'

interface ISearchScope extends ng.IScope {
    model: SearchController;
}

class SearchController {
    public static $inject = ['searchProducts', '$scope'];

    private categories: string[];
    private searchCriteria: SearchCriteria;
    private search: Function;

    constructor (private searchProducts: auction.model.Product[], private $scope: ISearchScope) {
        $scope.model = this;

        //for search form
        //TODO duplicated in ProductController
        this.categories     = new Array("Category 1", "Category 2", "Category 3", "Category 4");
        this.searchCriteria = new SearchCriteria();
        this.search = function() {
            console.log("Searching by criteria", this.searchCriteria);
        }
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
