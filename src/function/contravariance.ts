/**
 * * 逆变
 * * 如果 函数A 是 函数B 的子类型, 那么 函数A 的 this 类型和参数类型必定是 函数B this 类型和参数类型的 超类型
 * * 而 函数A 的返回类型必定是 函数B 返回类型的 子类型
 */

class Animal { }

class Bird extends Animal {
  chirp() { }
}

class Crow extends Bird {
  caw() { }
}

// * 定义一个参数为 Bird 对象的函数, 调用chirp(), 返回Bird实例
function chirp(bird: Bird): Bird {
  bird.chirp()
  return bird
}

// * 当参数是一个对象时 发生协变:
chirp(new Animal) // error Animal 是 Bird 的超类型 实例上并没有 chirp 方法
chirp(new Bird)
chirp(new Crow)

// ! 函数当参数时, 返回类型的比较:
function birdToBird(bird: Bird): Bird {
  return new Bird()
}
function birdToCrow(bird: Bird): Crow {
  return new Crow()
}
function birdToAnimal(bird: Bird): Animal {
  return new Animal()
}

function clone(f: (bird: Bird) => Bird): void {
}

clone(birdToBird)
clone(birdToCrow)
clone(birdToAnimal) // error birdToAnimal 返回值 类型为 Animal, 是 Bird 超类型, 不符合函数逆变的规则


