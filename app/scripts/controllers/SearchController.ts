// Implement SearchController here. It should manage Search Results page.

/// <reference path="../refs.ts" />

'use strict';

class SearchController {
    public static $inject = ['searchProducts', 'searchCriteria', 'categories'];

    constructor (private searchProducts: auction.model.Product[],
                 private searchCriteria: auction.model.SearchCriteria,
                 private categories: string[])
    {}

    public static resolve = {
        searchProducts: ['ProductService','SearchCriteriaService',
            (productService: auction.service.IProductService,
             searchCriteriaService: auction.service.ISearchCriteriaService) => {
            return productService.getSearchProducts(searchCriteriaService.getSearchCriteria());
        }],
        searchCriteria: ['SearchCriteriaService', (searchCriteriaService: auction.service.ISearchCriteriaService) => {
            return searchCriteriaService.getSearchCriteria();
        }],
        categories: ['ProductService', (categoriesService: auction.service.ICategoriesService) => {
            return categoriesService.getCategories();
        }]
    }
}

angular.module('auction').controller('SearchController', SearchController);
