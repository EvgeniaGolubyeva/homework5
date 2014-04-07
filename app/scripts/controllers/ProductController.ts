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

    constructor (private product: auction.model.Product, private $scope: IProductScope) {
        this.$scope.model = this;
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
