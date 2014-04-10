/// <reference path="../refs.ts" />

'use strict';

module auction.model {
    export class Product {
        public id: number;
        public title: string;
        public description: string;
        public timeleft: number;
        public watchers: number;
        public price: number;
    }
}
