// Implement HomeController here. It should manage Home page.

/// <reference path="../refs.ts" />

'use strict'

class HomeController {
    public static $inject = ['featuredProducts'];

    constructor (private featuredProducts: auction.model.Product[]) {}

    public static resolve = {
        featuredProducts: ['ProductService', (productService: auction.service.IProductService) => {
            return productService.getFeaturedProducts().then ((data) => {
                return data;
            });
        }]
    }
}

angular.module('auction').controller('HomeController', HomeController);
