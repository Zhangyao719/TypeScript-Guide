// interface Dictionary<T> {
//   [key: string]: T;
// }
// let keys: keyof Dictionary<number>; // string | number
// let value: Dictionary<number>['foo']; // number

interface Dictionary<T> {
  [key: number]: T;
}
let keys: keyof Dictionary<number>; // number
let value: Dictionary<number>['foo']; // Error, Property 'foo' does not exist on type 'Dictionary<number>'.
let value: Dictionary<number>[42]; // number