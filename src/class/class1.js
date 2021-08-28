class Animal {
  /* private  */name;
  constructor(theName) { this.name = theName; }
}

class Rhino extends Animal {
  constructor() {
    super('123');
  }
}

class Employee {
  /* private  */name;
  constructor(theName) {
    this.name = theName;
  }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
animal = employee; // 错误: Animal 与 Employee 不兼容.
