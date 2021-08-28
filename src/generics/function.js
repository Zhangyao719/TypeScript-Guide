var GenericsFunction;
(function (GenericsFunction) {
    var MyMath = /** @class */ (function () {
        function Math(value, add) {
            this.value = value;
            this.add = add;
        }
        Math.prototype.valueLog = function () { return this.value; };
        return Math;
    }());
    var aa = new MyMath(123, function (x, y) { return x + y; });
    console.dir(aa);
})(GenericsFunction || (GenericsFunction = {}));
