"use strict";function navbarDirective(){return{scope:!1,restrict:"E",templateUrl:"views/partial/navbar.html"}}function footerDirective(){return{scope:!1,restrict:"E",templateUrl:"views/partial/footer.html"}}function priceRangeDirective(){return{restrict:"E",templateUrl:"views/partial/priceRange.html",scope:{attrMinPrice:"@minPrice",attrMaxPrice:"@maxPrice",lowPrice:"=",highPrice:"="},controller:["$scope",function(a){a.minPrice=parseInt(a.attrMinPrice)||0,a.maxPrice=parseInt(a.attrMaxPrice)||500,a.lowPrice=a.lowPrice||a.minPrice,a.highPrice=a.highPrice||a.maxPrice}],link:function(a,b){var c=angular.element(b).find('div[class="priceRangeSlider"]');c.slider({min:a.minPrice,max:a.maxPrice,values:[a.lowPrice,a.highPrice],range:!0,slide:function(b,c){return a.$apply(function(){a.lowPrice=c.values[0],a.highPrice=c.values[1]})}}),a.$watch("lowPrice",function(b){b<a.highPrice&&c.slider("values",[b,a.highPrice])}),a.$watch("highPrice",function(b){b>a.lowPrice&&c.slider("values",[a.lowPrice,b])})}}}function searchFormDirective(){return{restrict:"E",templateUrl:"views/partial/searchForm.html",scope:{searchCriteria:"=",categories:"=",search:"&"},controller:["$scope",function(a){a.datePickerOpen=function(b){b.preventDefault(),b.stopPropagation(),a.datePickerOpened=!0},a.today=(new Date).setHours(0,0,0,0),a.searchCriteria.date=a.today}]}}var auctionApplication=angular.module("auction",["ngRoute","ui.bootstrap"]);auctionApplication.config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/home.html",controller:"HomeController",title:"Home",resolve:HomeController.resolve}).when("/search",{templateUrl:"views/search.html",controller:"SearchController",title:"Search",resolve:SearchController.resolve}).when("/product/:id",{templateUrl:"views/product.html",controller:"ProductController",title:"Product",resolve:ProductController.resolve}).otherwise({redirectTo:"/"})}]),auctionApplication.run(["$rootScope",function(a){a.$on("$routeChangeStart",function(b,c){a.title=c.title})}]);var HomeController=function(){function a(a,b){this.featuredProducts=a,this.$scope=b,this.$scope.model=this}return a.$inject=["featuredProducts","$scope"],a.resolve={featuredProducts:["ProductService",function(a){return a.getFeaturedProducts().then(function(a){return a})}]},a}();angular.module("auction").controller("HomeController",HomeController);var SearchController=function(){function a(a,b){this.searchProducts=a,this.$scope=b,b.model=this,this.categories=new Array("Category 1","Category 2","Category 3","Category 4"),this.searchCriteria=new SearchCriteria,this.search=function(){console.log("Searching by criteria",this.searchCriteria)}}return a.$inject=["searchProducts","$scope"],a.resolve={searchProducts:["ProductService",function(a){return a.getSearchProducts().then(function(a){return a})}]},a}();angular.module("auction").controller("SearchController",SearchController);var ProductController=function(){function a(a,b){this.product=a,this.$scope=b,this.isSearchFormVisible=!1,this.$scope.model=this,this.categories=new Array("Category 1","Category 2","Category 3","Category 4"),this.searchCriteria=new SearchCriteria,this.search=function(){console.log("Searching by criteria",this.searchCriteria)}}return a.$inject=["product","$scope"],a.resolve={product:["ProductService","$route",function(a,b){return a.getProduct(b.current.params.id).then(function(a){return a})}]},a}();angular.module("auction").controller("ProductController",ProductController);var auction;!function(a){!function(a){var b=function(){function a(a,b,c){var d=this;this.$http=a,this.$q=b,this.$log=c,this.FEATURED_PRODUCTS_FILE="data/featured.json",this.SEARCH_PRODUCTS_FILE="data/search.json",this.getFeaturedProducts=function(){return d.getDataFromJSON(d.FEATURED_PRODUCTS_FILE)},this.getSearchProducts=function(){return d.getDataFromJSON(d.SEARCH_PRODUCTS_FILE)},this.getProduct=function(a){return d.$q.all([d.getFeaturedProducts(),d.getSearchProducts()]).then(function(b){var c=b[0].concat(b[1]),e=c.filter(function(b){return b.id==a});return 1==e.length?e[0]:d.$q.reject("Single product with specified id is not found")},function(a){return d.$q.reject(a)})},this.getDataFromJSON=function(a){return d.$http.get(a).then(function(a){return a.data.items},function(b){return d.$log.error("Can not load file "+a),d.$q.reject(b)})}}return a.$inject=["$http","$q","$log"],a}();a.ProductService=b,angular.module("auction").service("ProductService",b)}(a.service||(a.service={}));a.service}(auction||(auction={})),angular.module("auction").directive("auctionNavbar",navbarDirective),angular.module("auction").directive("auctionFooter",footerDirective),angular.module("auction").directive("auctionPriceRange",priceRangeDirective);var SearchCriteria=function(){function a(){}return a}();angular.module("auction").directive("auctionSearchForm",["$timeout",searchFormDirective]),angular.module("auction").directive("dateValidation",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){a.$watch(c.ngModel,function(){d.$setValidity("dateMoreThenToday",d.$modelValue>=a.today)})}}});