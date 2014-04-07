/// <reference path="refs.ts" />

'use strict'

interface IRootScope extends ng.IRootScopeService{
    title: string;
}

//create a module for an application
var auctionApplication = angular.module('auction', ['ngRoute']);

//config routerProvider
auctionApplication.config(['$routeProvider', ($routeProvider: ng.route.IRouteProvider) => {
    $routeProvider
        .when ('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController',
            title: 'Home',
            resolve: HomeController.resolve
        })
        .when('/search', {
            templateUrl: 'views/search.html',
            controller: 'SearchController',
            title: 'Search',
            resolve: SearchController.resolve
        })
        .when('/product/:id', {
            templateUrl: 'views/product.html',
            controller: 'ProductController',
            title: 'Product',
            resolve: ProductController.resolve
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

//assign title to current scope
auctionApplication.run(["$rootScope", ($rootScope: IRootScope) => {
    $rootScope.$on("$routeChangeStart",
        (event: ng.IAngularEvent, next: any): any => {
            $rootScope.title = next.title;
        });
}]);