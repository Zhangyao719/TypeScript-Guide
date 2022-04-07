// 有条件类型

// * 分布式条件类型 过滤 联合类型
type Without<T, U> = T extends U ? never : T

type P = Without<boolean | string | number, boolean> // string | number

/**
 * * infer 关键字
 * * 只能在条件语句中使用
 * * 用来声明泛型
 * * 靠ts自动推导
 */
// 例一: 获取数组中元素的类型
type ElementType<T> = T extends unknown[] ? T[number] : T
type O1 = ElementType<number[]>
type O2 = ElementType<(number | string)[]>
// T[number] 数组的键入 用来获取数组元素类型

// * 可以重写成:
type ElementType1<T> = T extends (infer U)[] ? U : T

// 例二: 获取函数参数的类型
type SecondArg<F> = F extends (a: any, b: infer B) => any ? B : never
type F = typeof Array['prototype']['slice']
type I = SecondArg<F>