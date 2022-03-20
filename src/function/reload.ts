type Reserve = {
  (from: Date, to: Date, destination: string): void
}

let reserve: Reserve = (from, to, destination) => {
  console.log('🚀 → ', from, to, destination)
}

// 再加一个签名
type Reserve1 = {
  (from: Date, to: Date, destination: string): void
  (from: Date, destination: string): void
}

/**
 * Error: 缺少重载的另一个签名, 提示TypeError
 * 原因: 调用签名重载机制造成的错误, 当声明多个重载签名时, 需实现整个类型组合
 */
let reserve1: Reserve1 = (from, to, destination) => {
  console.log('🚀 → ', from, to, destination)
}

/**
 * 解决方案一: 自己手动组合两个签名, 同时满足两种函数类型
 * 注意: 这种自行组合的类型对调用reserve2的函数是不可见的
 * 但正因为这种组合 使得可以通过两种方式调用, 因此在实现reserve2时, 需要类型守卫:
 */
let reserve2: Reserve1 = (
  from: Date,
  to: Date | string,
  destination?: string) => {
  if (to instanceof Date && destination !== undefined) {
    // 满足第一种函数
  } else {
    // 满足第二种函数
  }
}

// 也可以使用重载函数声明
function reserve3(from: Date, destination: string): void
function reserve3(from: Date, to: Date, destination: string): void
function reserve3(from: Date, to: Date | string, destination?: string): void{

}

// 调用签名也可以来描述函数的属性
type WarnUser = {
  (warning: string): void;
  wasCalled: boolean;
}

let warnUser: WarnUser = (warning: string) => {
  if (warnUser.wasCalled) {
    return
  }
  warnUser.wasCalled = true
  console.log('🚀 → warning', warning)
}
warnUser.wasCalled = false