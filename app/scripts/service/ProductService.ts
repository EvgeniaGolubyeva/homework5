/// <reference path="../refs.ts" />

'use strict';

module auction.service {

    import m = auction.model;

    export interface IProductService {
        getFeaturedProducts: () => ng.IPromise<m.Product[]>;

        getSearchProducts:(params: string[]) => ng.IPromise<m.Product[]>;

        getProduct: (id: number) => ng.IPromise<m.Product>;
    }

    export interface ICategoriesService {
        getCategories:() => ng.IPromise<string[]>;
    }

    export class ProductService implements IProductService, ICategoriesService {
        public static $inject = ['Restangular', '$location', '$http', '$log', '$q'];

        private FEATURED_PRODUCTS_FILE: string = 'data/featured.json';
        private SEARCH_PRODUCTS_FILE:   string = 'data/search.json';

        constructor(private restangular: Restangular,
                    private $location:   ng.ILocationService,
                    private $http:       ng.IHttpService,
                    private $log:        ng.ILogService,
                    private $q:          ng.IQService)
        {}

        public getFeaturedProducts(): ng.IPromise<m.Product[]> {
            return this.getDataFromJSON(this.FEATURED_PRODUCTS_FILE);
        }

        public getSearchProducts(params: string[]): ng.IPromise<m.Product[]> {
            var search = this.restangular.one('search');
            search.get(params);

            return this.getDataFromJSON(this.SEARCH_PRODUCTS_FILE);
        }

        public getProduct(id: number): ng.IPromise<m.Product> {
            return this.$q.all([this.getDataFromJSON(this.FEATURED_PRODUCTS_FILE),
                                this.getDataFromJSON(this.SEARCH_PRODUCTS_FILE)]).then(
                (products) => {
                    var combined = products[0].concat(products[1]);

                    var found = combined.filter(function(p) {
                        return p.id == id
                    });

                    return found.length == 1 ? found[0] : this.$q.reject('Single product with specified id is not found');
                },
                (reason) => {
                    return this.$q.reject(reason);
                }
            );
        }

        //invoked by SearchFormController to populate categories select(comboBox)
        public getCategories(): ng.IPromise<string[]> {
            var res = this.$q.defer();
            res.resolve(new Array('Category 1', 'Category 2', 'Category 3', 'Category 4'));
            return res.promise;
        }

        private getDataFromJSON(fileName: string): ng.IPromise<m.Product[]> {
            return this.$http.get(fileName).then(
                (response) => <m.Product[]> response.data.items,
                (reason)   => {
                    this.$log.error('Can not load file ' + fileName);
                    return this.$q.reject(reason);
                });
        }
    }

    angular.module('auction').service('ProductService', ProductService);
}