// * 协变
// * 子类可以传给父类(超类型), 但是父类不能传给子类

type ExistingUser = {
  id: number;
  name: string;
}

type NewUser = Pick<ExistingUser, 'name'>

type LegacyUser = {
  id?: number | string;
  name: string;
}

function deleteUser(user: { id?: number; name: string }) {
  delete user.id;
  return user;
}

let existingUser: ExistingUser = {
  id: 101,
  name: 'James',
}

deleteUser(existingUser);

existingUser.id // 显示id为number 但其实已经删掉了 是 undefined

// ? 安全问题:
// ? 1. ts 不会报错 因为 id: number 是 id?: number 的子类型
// ? 2. 删除之后 依旧显示为 number 类型
// ? 由于破坏性更新(比如删除一个属性)在实际中很少见, 所以ts放款了要求

let legacyUser: LegacyUser = {
  id: '102',
  name: 'James',
}

deleteUser(legacyUser); // error string 不能赋值给 number | undefined

// ? 原因: 超类型不能 传递给 子类型

/**
 * * 总结:
 * * 在类型上, TS 对结构(对象和类)的属性进行了协变(covariant)
 * * 也就是说, 如果想保证A对象可以赋值给B对象, 那么A对象的每个属性都必须是B对象对应属性的子类型
 */

