// * 协变
// * 子类可以传给父类(超类型), 但是父类不能传给子类

type ExistingUser = {
  id: number;
  name: string;
}

type NewUser = Pick<ExistingUser, 'name'>

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
// ? 1. ts 不会报错 因为 ExistingUser 是 { id?: number; name: string } 的子类型
// ? 2. 删除之后 依旧显示为 number 类型
// ? 由于破坏性更新(比如删除一个属性)在实际中很少见, 所以ts放款了要求



