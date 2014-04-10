/// <reference path="../refs.ts" />

'use strict';

module auction.model {
    export class SearchCriteria {
        public title:string;
        public category:string;
        public lowPrice:number;
        public highPrice:number;
        public date:Object;
        public numberOfBids:number;
    }
}