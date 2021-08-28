/* const fullNameMaxLength = 10;

class Employee {
  constructor(private _fullName: string = 'Bob Smith') {}

  set fullName(newName: string) {
    console.log(111);
    
    if (newName && newName.length > fullNameMaxLength) {
      throw new Error("fullName has a max length of " + fullNameMaxLength);
    }

    this._fullName = newName + '456';
  }

  get fullName(): string {
    return this._fullName;
  }
}

let employee = new Employee();
// employee.fullName = "tom";
if (employee.fullName) {
  console.log(employee.fullName);
}

console.dir(employee) */


class Person2 {
  // 定义一个私有属性, 可用来接收set校验后的值
  // constructor(private _name: string = 'Tom') {}
  private _name: string = 'Tom'

  // set校验并存储传进来的参数
  set name(val: string) {
    if (val.length > 4 || val.length < 2) {
      throw new Error("名字格式不正确")
    }
    // 满足校验条件, 将val保存到_name
    this._name = val
  }
  // get 取出_name的值
  get name() {
    return this._name
  }
}


const p = new Person2()
// 实例可以直接获取到,并修改(修改的值 会先经set校验, 符合条件的存入_name)
p.name = 'kobe'
console.dir(p)