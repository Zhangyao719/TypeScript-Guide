type Filter = {
  <T>(array: T[], f: (item: T) => boolean): T[]
}

let filter: Filter = (array, f) => {
  let res = []
  for (let item of array) {
    f(item) && res.push(item)
  }
  return res
}

// * ts 根据传入的参数的类型推导泛型绑定的类型:
filter([1, 2, 3, 4], item => item < 3)

// * 什么时候绑定泛型
// * 1. <T>在调用签名中声明(如上), ts在调用函数时 为T绑定具体类型
// * 2. <T>写在类型别名上, ts在使用该类型时显式绑定:
type Filter1<T> = {
  (array: T[], f: (item: T) => boolean): T[]
}
// * 必须显式的给泛型T指定具体的类型, 否则报错
let filter1: Filter1<string> = (array, f) => {
  let res = []
  for (let item of array) {
    f(item) && res.push(item)
  }
  return res
}
filter1(['haha', 'hehe', 'heihei', 'yaya'], item => item.length > 3)

// * 函数(函数式声明): 调用时
// * 类: 实例化时
// * 类型别名和接口: 使用时

// * 在什么地方声明泛型
// 1. T的作用域在单个签名中 type Type = { <T> }
// 2. T的作用域涵盖全部签名 (写在外面) type Type<T> = {}
// 3. 函数式声明 function foo<T>() {}

// * 使用多个泛型
function map<T, U>(array: T[], f: (item: T) => U): U[] {
  let result = []
  for (let i = 0; i < array.length; i++){
    result[i] = f(array[i])
  }
  return result
}
