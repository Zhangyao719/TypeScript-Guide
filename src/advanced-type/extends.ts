interface Prop {
  propA: boolean;
  propB: boolean;
}

declare function f<T>(x: T): T extends Prop ? string : number;

function foo<U>(x: U) {
  // Has type 'U extends Prop ? string : number'
  let a = f(x);

  // This assignment is allowed though!
  let b: string | number = a;
}
