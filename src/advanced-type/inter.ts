namespace Inter {
  type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any

  const add2 = (x:number, y:number) => x + y;
  const add1 = (x: number, y: number) => { };

  type T = ReturnType<typeof add>; // type t = number
  type T0 = ReturnType<() => string>        // string
  type T1 = ReturnType<(s: string) => void>; // void
  type T2 = ReturnType<<T>() => T>;          // unknown
  type T23 = ReturnType<typeof add1>;          // unknown

  type Tuple = [number, string]
  type Flatten<T> = T extends Array<infer U> ? U : never;

  type T3 = Flatten<Tuple>

  type Foo<T> = T extends { a: infer U; b: infer U } ? U : never;

  type T10 = Foo<{ a: string; b: string }>;  // string
  type T11 = Foo<{ a: string; b: number }>;  // string | number

  type Bar<T> = T extends { a: (x: string) => infer U; b: (x: string) => infer U } ? U : never;
  type T20 = Bar<{ a: (x: string) => void; b: (x: string) => void }>;  // string
  type T21 = Bar<{ a: (x: string) => void; b: (x: number) => void }>;  // string & number

/*   type Bar<T> = T extends { a: (x: infer U) => string; b: (x: infer U) => number } ? U : never;

  type T20 = Bar<{ a: (x: string) => string; b: (x: string) => string }>; // string
  type T21 = Bar<{ a: (x: string) => string; b: (x: number) => number }>; // string & number */

  function name<T extends {length: number}>(params: T): number {
    return params.length
  }

  function add(a: number, b: number): number;
  function add(a: string, b: string): string;
  function add(a: string, b: number): string;
  function add(a: number, b: string): string;
  function add(a: any, b:any) {
    if (typeof a === 'string' || typeof b === 'string') {
      return a.toString() + b.toString();
    }
    return a + b;
  }
  add(123, '123')

}