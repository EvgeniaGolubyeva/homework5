/// <reference path="../refs.ts" />

'use strict';

class SearchFormController {

    public static $inject = ['$scope', 'SearchCriteriaService', 'ProductService'];

    private searchCriteria: auction.model.SearchCriteria;
    private categories: string[];
    private minDate: number;

    constructor($scope: any,
                searchCriteriaService: auction.service.ISearchCriteriaService,
                categoriesService: auction.service.ICategoriesService) {
        this.searchCriteria = searchCriteriaService.getSearchCriteria();
        categoriesService.getCategories().then((data) => this.categories = data);

        this.minDate = new Date().setHours(0,0,0,0);
    }
}

function searchFormDirective(): ng.IDirective {
    return {
        restrict: 'E',
        templateUrl: 'views/partial/searchForm.html',
        scope: {
            searchResultsUrl: "@"
        },
        controller: SearchFormController,
        controllerAs: 'ctrl'
    }
}

angular.module('auction').directive('auctionSearchForm', searchFormDirective);