// Implement "POJO" here to keep data of a single Product item.

module auction.model {
    export class Product {
        private _id: number;
        private _title: string;
        private _description: string;
        private _timeleft: number;
        private _watchers: number;
        private _price: number;

        get id(): number {return this._id}
        set id(val: number) {this._id = val;}

        get title(): string {return this._title}
        set title(val: string) {this._title = val;}

        get description(): string {return this._description}
        set description(val: string) {this._description = val;}

        get timeleft(): number {return this._timeleft}
        set timeleft(val: number) {this._timeleft = val;}

        get watchers(): number {return this._watchers}
        set watchers(val: number) {this._watchers = val;}

        get price(): number {return this._price}
        set price(val: number) {this._price = val;}
    }
}
