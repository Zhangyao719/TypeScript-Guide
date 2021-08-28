namespace GenericsFunction {
  interface Instance<T> {
    value: T;
    add: (x: T, y: T) => T;
    valueLog(): T;
  }
  interface Constructor {
    new <T>(x: T, y: (a: T, b: T) => T): Instance<T>;
  }

  const MyMath: Constructor = class Math<T> implements Instance<T>{
    constructor(
      public value: T,
      public add: (x: T, y: T) => T,
    ) { }
    valueLog(): T { return this.value }
  }
  const aa = new MyMath<number>(
    123,
    (x: number, y: number) => x + y,
  )
  console.dir(aa)
}
