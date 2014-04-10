/// <reference path="../refs.ts" />

'use strict';

module auction.service {

    import m = auction.model;

    export interface ISearchCriteriaService {
        getSearchCriteria(): m.SearchCriteria;
        resetSearchCriteria(): void;
    }

    export class SearchCriteriaService {
        private searchCriteria: m.SearchCriteria;

        constructor() {
            this.searchCriteria = new m.SearchCriteria();
            this.resetSearchCriteria();
        }

        public getSearchCriteria(): m.SearchCriteria {
            return this.searchCriteria;
        }

        //invoked by $routeChangeStart event listener (app.ts)
        //when user goes to home page criteria should be reseted
        public resetSearchCriteria(): void {
            this.searchCriteria.title = null;
            this.searchCriteria.category = null;
            this.searchCriteria.lowPrice = null;
            this.searchCriteria.highPrice = null;
            this.searchCriteria.date = new Date();
            this.searchCriteria.numberOfBids = null;
        }
    }

    angular.module('auction').service('SearchCriteriaService', SearchCriteriaService);
}