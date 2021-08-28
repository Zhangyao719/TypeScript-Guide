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


class Animal {
  numLegs: number = 4;
}
class ZooKeeper {
  nametag: string = 'sunyue';
}
class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

// function create<T>(c: { new(): T; }): T {
//   return new c();
// }
function create<T extends Lion>(c: { new(): T }): T {
  return new c();
}

console.log(create(Lion).keeper.nametag);

