namespace IndexInterface {
  /* interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0]; */


// interface StringObj {
//   [index: string]: string;
//   [index: number]: string;
// }
// let myObj: StringObj;
// myObj = {
//   100: 'aa',
//   age: '18',
// }
// let myStr1: string = myObj['name'];
// console.log('🚀 → myStr1', myStr1)


/* class Animal {
  name: string = "animal";
}
class Dog extends Animal {
  breed: string = "husky";
}

// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
interface NotOkay {
  [x: number]: Animal;
  [x: string]: Dog;
} */

interface AA {
  [index: string]: string | number;
  // [index: number]: string | number;
}
const obj: AA = {
  '100': 'aa',
  '200': 200,
  300: 300,
  cc: 400,
  'name': 123,
}

console.log(obj['300']);
console.log(obj[300]);
console.log(obj[100]);
console.log(obj['cc']);
console.log(obj);



}