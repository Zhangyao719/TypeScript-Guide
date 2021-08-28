/* interface Instance<T> {
  value: T;
  add: (x: T, y: T) => T;
  valueLog(): T;
}
interface Constructor {
  new <T>(x: T, add123: (x: T, y: T) => T): Instance<T>
}

const myMath: Constructor = class Math<T> implements Instance<T>{
  constructor(
    public value: T,
    public add: (x: T, y: T) => T,
  ) { }
  valueLog(): T { return this.value }
} */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = /** @class */ (function () {
    function Animal() {
        this.numLegs = 4;
    }
    return Animal;
}());
var ZooKeeper = /** @class */ (function () {
    function ZooKeeper() {
        this.nametag = 'sunyue';
    }
    return ZooKeeper;
}());
var Lion = /** @class */ (function (_super) {
    __extends(Lion, _super);
    function Lion() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.keeper = new ZooKeeper();
        return _this;
    }
    return Lion;
}(Animal));
function create(c) {
    return new c();
}
console.log(create(Lion).keeper.nametag);
