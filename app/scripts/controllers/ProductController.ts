/// <reference path="../refs.ts" />

'use strict';

interface IRouteParamsService extends ng.route.IRouteParamsService {
    id: number;
}

class ProductController {
    public static $inject = ['product'];

    constructor (private product: auction.model.Product)
    {}

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
