"use strict";function navbarDirective(){return{scope:!1,restrict:"E",templateUrl:"views/partial/navbar.html",controller:["$scope","SearchCriteriaService",function(a,b){a.searchCriteria=b.getSearchCriteria()}]}}function footerDirective(){return{scope:!1,restrict:"E",templateUrl:"views/partial/footer.html"}}function datePickerDirective(){return{restrict:"E",templateUrl:"views/partial/datePicker.html",scope:{minDate:"=min",ngModel:"="},controller:DatePickerController,controllerAs:"ctrl",require:"ngModel",link:function(a,b){var c=b.controller("ngModel"),d=function(b){var d=b>=a.minDate;return c.$setValidity("date",d),b};c.$parsers.unshift(d),c.$formatters.push(d),a.$watch("ngModel",function(){d(c.$viewValue)})}}}function priceRangeDirective(){return{restrict:"E",templateUrl:"views/partial/priceRange.html",scope:{attrMinPrice:"@minPrice",attrMaxPrice:"@maxPrice",lowPrice:"=",highPrice:"="},link:function(a,b){a.minPrice=parseInt(a.attrMinPrice)||0,a.maxPrice=parseInt(a.attrMaxPrice)||500;var c=angular.element(b).find('div[class="priceRangeSlider"]');c.slider({min:a.minPrice,max:a.maxPrice,values:[a.lowPrice||a.minPrice,a.highPrice||a.maxPrice],range:!0,slide:function(b,c){return a.$apply(function(){a.lowPrice=c.values[0],a.highPrice=c.values[1]})}}),a.$watch("lowPrice",function(b){var d=c.slider("values");c.slider("values",[b||a.minPrice,d[1]])}),a.$watch("highPrice",function(b){var d=c.slider("values");c.slider("values",[d[0],b||a.maxPrice])})}}}function searchFormDirective(){return{restrict:"E",templateUrl:"views/partial/searchForm.html",scope:{searchResultsUrl:"@"},controller:SearchFormController,controllerAs:"ctrl"}}var PageTitles=function(){function a(){}return a.HOME="Home",a.SEARCH="Search",a.PRODUCT="Product",a}(),auctionApplication=angular.module("auction",["ngRoute","ui.bootstrap","restangular"]);auctionApplication.config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/home.html",controller:"HomeController",controllerAs:"ctrl",title:PageTitles.HOME,resolve:HomeController.resolve}).when("/search",{templateUrl:"views/search.html",controller:"SearchController",controllerAs:"ctrl",title:PageTitles.SEARCH,resolve:SearchController.resolve}).when("/product/:id",{templateUrl:"views/product.html",controller:"ProductController",controllerAs:"ctrl",title:PageTitles.PRODUCT,resolve:ProductController.resolve}).otherwise({redirectTo:"/"})}]),auctionApplication.run(["$rootScope","SearchCriteriaService",function(a,b){a.$on("$routeChangeStart",function(c,d){a.title=d.title,a.title==PageTitles.HOME&&b.resetSearchCriteria()})}]);var auction;!function(a){!function(a){var b=function(){function a(){}return a}();a.Product=b}(a.model||(a.model={}));a.model}(auction||(auction={}));var auction;!function(a){!function(a){var b=function(){function a(){}return a}();a.SearchCriteria=b}(a.model||(a.model={}));a.model}(auction||(auction={}));var auction;!function(a){!function(a){var b=function(){function a(a,b,c,d,e){this.restangular=a,this.$location=b,this.$http=c,this.$log=d,this.$q=e,this.FEATURED_PRODUCTS_FILE="data/featured.json",this.SEARCH_PRODUCTS_FILE="data/search.json"}return a.prototype.getFeaturedProducts=function(){return this.getDataFromJSON(this.FEATURED_PRODUCTS_FILE)},a.prototype.getSearchProducts=function(a){var b=this.restangular.one("search");return b.get(a),this.$location.search(a),this.getDataFromJSON(this.SEARCH_PRODUCTS_FILE)},a.prototype.getProduct=function(a){var b=this;return this.$q.all([this.getDataFromJSON(this.FEATURED_PRODUCTS_FILE),this.getDataFromJSON(this.SEARCH_PRODUCTS_FILE)]).then(function(c){var d=c[0].concat(c[1]),e=d.filter(function(b){return b.id==a});return 1==e.length?e[0]:b.$q.reject("Single product with specified id is not found")},function(a){return b.$q.reject(a)})},a.prototype.getCategories=function(){var a=this.$q.defer();return a.resolve(new Array("Category 1","Category 2","Category 3","Category 4")),a.promise},a.prototype.getDataFromJSON=function(a){var b=this;return this.$http.get(a).then(function(a){return a.data.items},function(c){return b.$log.error("Can not load file "+a),b.$q.reject(c)})},a.$inject=["Restangular","$location","$http","$log","$q"],a}();a.ProductService=b,angular.module("auction").service("ProductService",b)}(a.service||(a.service={}));a.service}(auction||(auction={}));var auction;!function(a){!function(b){var c=a.model,d=function(){function a(){this.searchCriteria=new c.SearchCriteria,this.resetSearchCriteria()}return a.prototype.getSearchCriteria=function(){return this.searchCriteria},a.prototype.resetSearchCriteria=function(){this.searchCriteria.title=null,this.searchCriteria.category=null,this.searchCriteria.lowPrice=null,this.searchCriteria.highPrice=null,this.searchCriteria.date=new Date,this.searchCriteria.numberOfBids=null},a}();b.SearchCriteriaService=d,angular.module("auction").service("SearchCriteriaService",d)}(a.service||(a.service={}));a.service}(auction||(auction={}));var HomeController=function(){function a(a){this.featuredProducts=a}return a.$inject=["featuredProducts"],a.resolve={featuredProducts:["ProductService",function(a){return a.getFeaturedProducts().then(function(a){return a})}]},a}();angular.module("auction").controller("HomeController",HomeController);var SearchController=function(){function a(a,b,c){this.searchProducts=a,this.searchCriteria=b,this.categories=c}return a.$inject=["searchProducts","searchCriteria","categories"],a.resolve={searchProducts:["ProductService","SearchCriteriaService",function(a,b){return a.getSearchProducts(b.getSearchCriteria()).then(function(a){return a})}],searchCriteria:["SearchCriteriaService",function(a){return a.getSearchCriteria()}],categories:["ProductService",function(a){return a.getCategories().then(function(a){return a})}]},a}();angular.module("auction").controller("SearchController",SearchController);var ProductController=function(){function a(a){this.product=a}return a.$inject=["product"],a.resolve={product:["ProductService","$route",function(a,b){return a.getProduct(b.current.params.id).then(function(a){return a})}]},a}();angular.module("auction").controller("ProductController",ProductController),angular.module("auction").directive("auctionNavbar",navbarDirective),angular.module("auction").directive("auctionFooter",footerDirective);var DatePickerController=function(){function a(){this.minDate=(new Date).setHours(0,0,0,0),this.isPopupOpened=!1}return a.prototype.openPopup=function(a){a.preventDefault(),a.stopPropagation(),this.isPopupOpened=!0},a}();angular.module("auction").directive("auctionDatePicker",datePickerDirective),angular.module("auction").directive("auctionPriceRange",priceRangeDirective);var SearchFormController=function(){function a(a,b,c){var d=this;this.searchCriteria=b.getSearchCriteria(),c.getCategories().then(function(a){return d.categories=a}),this.minDate=(new Date).setHours(0,0,0,0),this.isPopupOpened=!1}return a.prototype.openPopup=function(a){a.preventDefault(),a.stopPropagation(),this.isPopupOpened=!0},a.$inject=["$scope","SearchCriteriaService","ProductService"],a}();angular.module("auction").directive("auctionSearchForm",searchFormDirective);