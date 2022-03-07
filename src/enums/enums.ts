enum Color {
  Red,
  Blue,
  Yellow,
}

enum Color1 {
  Red = 3,
  Blue,
  Yellow,
}

enum Color2 {
  Red = 1,
  Blue = 3,
  Yellow,
}

enum Size { 
  Big = '大',
  Small = '小',
  Large = 1,
  Primary,
}

enum Mood {

}

const haha = Size[2]
console.log('🚀 → haha', haha)

function foo(arg: Size) {
  return arg
  
}
foo(Size.Big)
foo(Size.Large)
foo(100) // 然而并没有报错, ts赋值规则导致的不良后果, 如果想纠正这个问题 则全部使用字符串

/**
 * 0. 枚举名称-大写 键名-大写
 * 1. 可以是数字 / 字符串
 * 2. 没有显示注明时, 会根据上一个值自动推导:
 *  (2.1) 如果上一个值是数字, 会自动往下+1
 *  (2.2) 如果上一个值是字符串, 会报错
 * 3. 值为数字, 可以反向引用; 值为字符串, 只能正向使用
 * 4. 可以使用 const enum 来禁止反向引用
 * 5. 如果值是数字 可能会因赋值规则导致 数字类型都可以赋值成功 上述foo的例子
  */
