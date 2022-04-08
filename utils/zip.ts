// * 扩充 Array 的原型 添加 zip 方法, 扩充全局类型声明

/**
 * * 方式一: 脚本模式 (文件中不含export, import)
 * * 此处的类型声明 会变成全局的, 可以直接使用
 */
interface Array<T> {
  zip<U>(list: U[]): [T, U][]
}

function tuple<T extends unknown[]>(...ts: T): T {
  return ts
}

Array.prototype.zip = function<T, U>(this: T[], list: U[]): [T, U][] {
  return this.map((item, index) => tuple(item, list[index]) )
}