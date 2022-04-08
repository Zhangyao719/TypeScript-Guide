// 扩展全局类型

declare global {
  interface Array<T> {
    zip<U>(list: U[]): [T, U][]
  }
}

// 不要忘了export
export {}