var Clock = /** @class */ (function () {
    function Clock(h, m) {
        this.h = h;
        this.m = m;
    }
    Clock.prototype.tick = function () {
        console.log("beep beep");
    };
    return Clock;
}());
var aa = new Clock(123, 456);
console.log(aa);

