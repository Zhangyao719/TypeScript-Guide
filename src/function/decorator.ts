// 类装饰器

/**
 * *如果类的构造方法可以被扩展(使用extends)
 * *那么, ts要求参数的类型为可展开的any, 即 new(...any[])
 */
type ClassConstructor<U> = new (...args: any[]) => U;

/**
 * *serialzable 方法的作用:
 * !1. 对类进行修改, 为其添加 serialize 方法, 所以传入的参数必须是 构造函数 类型, 即上面的 ClassConstructor
 * *2. 新增的属性和方法 全都放在 ClassConstructor 的泛型中(实例能拿到的)
 * *3. 如果装饰器函数返回一个类, 在运行时这个类将代替被装饰的类; 否则, 要返回原类
 */
function serialzable<
  T extends ClassConstructor<{
    getValue(): number
  }>
  >(Constructor: T) {
  return class extends Constructor {
    serialize() {
      return this.getValue().toString();
    }
  }
}

@serialzable
class Payload {
  getValue() {
    return 123
  }
}

const instance = new Payload()
// const res = instance.serialize()
// error: ts 假定装饰器不改变装饰目标的结构, 即不增加或删除方法和属性

// 解决方法:
// 方法一: 扩展接口 + as 类型断言
interface NewPayload extends Payload {
  serialize(): string
}
const instance1 = new Payload() as NewPayload
instance1.serialize()

// 方法二: 直接使用 serialzable 替代装饰器
const decoratorPayload = serialzable(Payload)
new decoratorPayload().serialize()