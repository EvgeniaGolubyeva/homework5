// This file should contain ProductService implementation which is responsible for managing products.
// All other parts of the app shouldn't access data/*.json files directly, instead they should use this service.

// Leverage as many TypeScript features (classes, type annotations, lambdas, etc.)
// as you can (and as it seems reasonable to you ;))

/// <reference path="../refs.ts" />

'use strict'

module auction.service {

    import m = auction.model;

    export interface IProductService {
        getFeaturedProducts: () => ng.IPromise<m.Product[]>;
        getSearchProducts:   () => ng.IPromise<m.Product[]>;

        getProduct:          (id: number) => ng.IPromise<m.Product>;
    }

    export class ProductService implements IProductService {
        public static $inject = ['$http', '$q', '$log'];

        private FEATURED_PRODUCTS_FILE: string = 'data/featured.json';
        private SEARCH_PRODUCTS_FILE:   string = 'data/search.json';

        constructor(private $http: ng.IHttpService,
                    private $q:    ng.IQService,
                    private $log:  ng.ILogService)
        {}

        getFeaturedProducts = (): ng.IPromise<m.Product[]> => this.getDataFromJSON(this.FEATURED_PRODUCTS_FILE);
        getSearchProducts   = (): ng.IPromise<m.Product[]> => this.getDataFromJSON(this.SEARCH_PRODUCTS_FILE);

        getProduct = (id: number): ng.IPromise<m.Product> => {
            return this.$q.all([this.getFeaturedProducts(), this.getSearchProducts()]).then(
                (products) => {
                    var combined = products[0].concat(products[1]);

                    var found = combined.filter(function(p) {
                        return p.id == id
                    });

                    return found.length == 1 ? found[0] : this.$q.reject("Single product with specified id is not found");
                },
                (reason) => {
                    return this.$q.reject(reason);
                }
            );
        };

        private getDataFromJSON = (fileName: string): ng.IPromise<m.Product[]> => {
            return this.$http.get(fileName).then(
                (response) => <m.Product[]> response.data.items,
                (reason)   => {
                    this.$log.error("Can not load file " + fileName);
                    return this.$q.reject(reason);
                });
        }
    }

    angular.module('auction').service('ProductService', ProductService);
}