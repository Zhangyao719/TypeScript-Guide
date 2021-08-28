namespace Class1 {
  /* class Animal {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  eat(food: string): string {
    return "吃了一顿" + food
  }
  run() {
    console.log("随风奔跑自由是方向~")
  }
} */

// class Dog extends Animal {
//   type: string
//   constructor(type: string, name: string, age: number) {
//     super(name, age)
//     this.type = type
//     this.name = '123'
//   }
  // eat() {
  //   console.log('我是自己的eat方法')
  //   return '123'
  // }
// }

/* const dog = new Dog('哈士奇', '2哈', 4)
console.log(dog.eat('kfc'));

dog.run()

class Cat {
  constructor(public type: string){}
} */

/* class Animal {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal {
  constructor() {
    super('123');
  }
}

class Employee {
  private name: string;
  age: number = 19;
  constructor(theName: string) {
    this.name = theName;
  }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob"); */

// animal = rhino;
// animal = employee; // 错误: Animal 与 Employee 不兼容.
// console.log(animal);

/* class Person {
  protected name: string;
  constructor(name: string) { this.name = name; }
}

class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
      super(name)
      this.department = department;
  }

  public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // 错误 */

/* class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// Employee 能够继承 Person
class Employee1 extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee1("Howard", "Sales");
// console.log(howard.name);
let john = new Person("John"); // 错误: 'Person' 的构造函数是被保护的. */
  
/*   interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
  }

  interface ClockConstructor extends ClockInterface{
    new(h: number, m: number): ClockInterface;
  }

  class Clock implements ClockConstructor {
    currentTime: Date = new Date();
    setTime(d: Date) {
      this.currentTime = d;
    }
    constructor(h: number, m: number) {}
  } */

  interface ClockConstructor {
    new(hour: number, minute: number): ClockInterface;
    // heihei: string;
  }
  interface ClockInterface {
    tick(): void;
  }
  
  function createClock(
    ctor: ClockConstructor,
    hour: number,
    minute: number
  ): ClockInterface {
    return new ctor(hour, minute);
  }
  
  class DigitalClock implements ClockInterface {
    // static heihei = '123';
    // constructor不写 或者参数为空 也能通过校验
    constructor(h: number, m: number) {}
    tick() {
      console.log("beep beep");
    }
  }

  interface Lengthwise {
      length: number;
  }

  function loggingIdentity<T>(arg: T): T {
      console.log(arg.length); // Now we know it has a .length property, so no more error
      return arg;
  }

  
  type Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];

  interface Part {
      id: number;
      name: string;
      subparts: Part[];
      updatePart(newName: string): void;
  }

  type T40 = FunctionPropertyNames<Part>;  // "updatePart"

  
}