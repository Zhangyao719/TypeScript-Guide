var Class1;
(function (Class1) {
    /* class Animal {
    name: string
    age: number
    constructor(name: string, age: number) {
      this.name = name
      this.age = age
    }
    eat(food: string): string {
      return "吃了一顿" + food
    }
    run() {
      console.log("随风奔跑自由是方向~")
    }
  } */
    function createClock(ctor, hour, minute) {
        return new ctor(hour, minute);
    }
    var DigitalClock = /** @class */ (function () {
        function DigitalClock(h, m) {
        }
        DigitalClock.prototype.tick = function () {
            console.log("beep beep");
        };
        return DigitalClock;
    }());
    var digital = createClock(DigitalClock, 12, 17);
    var CrazyClass = /** @class */ (function () {
        function CrazyClass() {
            this.hello = 123;
        }
        return CrazyClass;
    }());
    // Because
    var crazy = new CrazyClass(); // crazy would be { hello:123 }
})(Class1 || (Class1 = {}));
