class Greeter {
  static standardGreeting = "Hello, there";
  constructor(public greeting: string | null = null) {}
  greet() {
      if (this.greeting) {
          return "Hello, " + this.greeting;
      }
      else {
          return Greeter.standardGreeting;
      }
  }
}

interface GreeterInterface extends Greeter {}

let greeter1: GreeterInterface;
greeter1 = new Greeter('haha');
console.log(greeter1.greet());

// let greeterMaker: GreeterInterface = Greeter;
let greeterMaker: {
  new(greeting: string | null): GreeterInterface;
  standardGreeting: string;
} = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker('');
console.log(greeter2.greet());
