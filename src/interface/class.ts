interface ClockInterface {
  tick(): void;
}

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

const Clock: ClockConstructor = class Clock implements ClockInterface {
  readonly h: number;
  readonly m: number;
  constructor(h: number, m: number) {
    this.h = h;
    this.m = m;
  }
  tick() {
    console.log("beep beep");
  }
};

const time = new Clock(123, 456)
console.log(time);

