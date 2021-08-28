class Dog {
    run() { }
    eat() { }
}
class Cat {
    sleep() { }
    eat() { }
}

/* enum Master {
    Boy,
    Gril,
}

function getPet(master: Master) {
    let pet = master === Master.Boy ? new Dog() : new Cat();
    pet.eat(); // 可以访问Dog和Cat的共有属性
    pet.run(); // error: 类型“Dog | Cat”上不存在属性“run”。
} */

function isDog(pet: Dog | Cat): pet is Dog {
    return (pet as Dog).run !== undefined;
}

function getPet(pet: Dog | Cat) {
    // if (isDog(pet)) {
    //     pet.run();
    // } else {
    //     pet.sleep();
    // }
    if (pet instanceof Dog) {
        pet.run();
    } else {
        pet.sleep();
    }
}

function test1(input: string | number) {
    if (typeof input === 'string') {
        // 这里 input 的类型「收紧」为 string
    } else {
        // 这里 input 的类型「收紧」为 number
    }
}

interface Foo1 {
    foo: string;
}

interface Bar {
    bar: string;
}

function test2(input: Foo1 | Bar) {
    if ('foo' in input) {
        // 这里 input 的类型「收紧」为 Foo
    } else {
        // 这里 input 的类型「收紧」为 Bar
    }
}

type Foo = 'foo' | 'bar' | 'unknown';
function test(input: Foo) {
    if (input !== 'unknown') {
        // 这里 input 的类型「收紧」为 'foo' | 'bar'
    } else {
        // 这里 input 的类型「收紧」为 'unknown'
    }
}

function isString(input: any): input is string {
    return typeof input === 'string';
}

function foo(input: string | number) {
    if (isString(input)) {
        console.log(input);
        // 这里 input 的类型没有「收紧」，仍为 string | number
    } else {
        // 这里也一样
    }
}

