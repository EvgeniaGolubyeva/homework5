// Implement HomeController here. It should manage Home page.

/// <reference path="../refs.ts" />

'use strict'

interface IProductScope extends ng.IScope {
    model: ProductController;
}

interface IRouteParamsService extends ng.route.IRouteParamsService {
    id: number;
}

class ProductController {
    public static $inject = ["product", '$scope'];

    private isSearchFormVisible: boolean = false;

    private categories: string[];
    private searchCriteria: SearchCriteria;
    private search: Function;

    constructor (private product: auction.model.Product, private $scope: IProductScope) {
        this.$scope.model = this;

        //for search form
        //TODO duplicated in SearchController, do not understand where search results will be displayed
        this.categories     = new Array("Category 1", "Category 2", "Category 3", "Category 4");
        this.searchCriteria = new SearchCriteria();
        this.search = function() {
            console.log("Searching by criteria", this.searchCriteria);
        }
    }

    public static resolve = {
        product: ['ProductService', '$route',
            (productService: auction.service.IProductService, $route: ng.route.IRouteService) => {
                return productService.getProduct($route.current.params.id).then ((data) => {
                    return data;
                });
            }
        ]
    }
}

angular.module('auction').controller('ProductController', ProductController);
