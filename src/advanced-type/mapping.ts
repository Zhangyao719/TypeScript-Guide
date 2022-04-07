// 映射类型

// 可选
type OptionalAccount<T> = {
  [P in keyof T]?: T[P];
}

// 取消可选
type OptionalAccount1<T> = {
  [P in keyof T]-?: T[P];
}

// 只读
type RealonlyAccount<T> = {
  readonly [P in keyof T]: T[P];
}

// 取消只读
type RealonlyAccount1<T> = {
  -readonly [P in keyof T]: T[P];
}

// * 减号(-) 运算符 (只对映射类型可用) 可以把 ? 和 readonly 撤销, 分别还原成必须 和 可写的

// 添加新成员
type NewAccount<T> = {
  [P in keyof T]: T[P];
} & { newMember: boolean }
