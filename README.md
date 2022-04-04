

#  [TS](https://jkchao.github.io/typescript-book-chinese/typings/ambient.html)

## 安装

```bash
npm i -g typescript
yarn global add typescript
```



## tsc命令

1. ##### 执行步骤

```js
(1) tsc 文件名.ts  => 将ts文件转译成js文件
(2) node 文件名.js  => 执行转译后的js文件
```

2. ##### 简化步骤(使用ts-node包)

```js
安装ts-node包:

npm i -g ts-node
yarn global add ts-node
```

3. ##### 直接使用`ts-node 命令在node环境中运行`

```bash
ts-node 文件名.ts
```

4. ##### 自动更新——`监视模式`

```js
// 只要保存了修改的ts文件, 就会自动生成新的js文件
tsc --watch 文件名.ts
```

## ts的配置文件

```bash
tsc --init //创建tsconfig.json配置文件
```

```json
// 设置常用配置项
{
    "compilerOptions": {
        "target": "es5",     
    	"module": "commonjs",// js模块化标准
		"outDir": "./dist",  //指定转码后的js文件放在哪个文件夹
		"rootDir": "./src",  //指定从哪里开始转码ts文件
    	"strict": true       // 将ts文件转化为严格模式的js文件
    }
}
```

```bash
tsc -p ./tsconfig.json
```



## 类型注解

```js
(1) 声明变量必须指定变量的类型
let age: number;
let name: string;

(2)指定变量类型并赋值
let age: number = 18;
```



## TS中的undefined和null

> **在TS中, undefined和null也是一种数据类型**
>
> undefined类型的变量, 只能存储undefined值
>
> null类型的变量, 只能存储null值

```js
// 定义了aa为undefined类型, 则只能存储undefined类型
let aa: undefined = undefined

// 定义了aa为unll类型, 则只能存储null类型
let bb: null = null

#因为undefined和null是其他类型的子类, 所以这两个变量的值可以赋值给其他类型的变量 例:
let c: number = aa
console.log(c) => 不报错 c为undefined

let d:string = bb
console.log(c) => 不报错 d为null

let e: number
console.log(e) => 不报错 e为undefined 因为此时e没有被初始化(赋值)
```



## Never类型

表示的是那些永不存在的值的类型. `never`类型是那些`总是会抛出异常或根本就不会有返回值`的函数表达式返回值类型(出错,不会有返回值, 所以此处的返回值类型就为never)

never类型是任何类型的子类型，也可以赋值给任何类型；然而，*没有*类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 `any也不可以赋值给never`

引用场景: 一般只给**不可能有返回值**(区别于返回undefined)的函数设定此类型

## void类型

表示空值

```tsx
let res:void = undefined
```



## 联合数据类型

语法:

```js
let  变量名: 数据类型1 | 数据类型2 | ...
```

说明: 变量的取值, 可以是两个类型的任意一种



## any数据类型

语法:

```js
let data: any
```

说明: 表示可以是任意类型



## 数组类型

- **使用`类型[]`来表示数组：**

```js
let names: string[] = [] // 表示只能出现字符穿类型的数组元素
```

- **`数组泛型`**定义方式

```tsx
// 数组泛型 Array<type>来表示数组
let fibonacci: Array<number> = [ 1, 1, 2, 3, 5 ]


interface ItemObj {
    value: number;
    label: string;
}
const arr: Array<ItemObj> = [
    {
        value: 1,
    	label: 'zs'
    }
]
```

- any类型数组

```ts
let list: any = [ 1, "zs", {} ] // 元素可以是任意类型
```

- 元组类型声明

表示一个已知元素数量和类型的数组

```js
// 表示一个确定数组长度和类型的写法
let x: [ string, number, boolean]

x = ['zhangsan', 123, true]
```

- **类数组**

类数组就是伪数组的定义, 不能用普通数组的方式来描述，而应该用接口：

官方已给了各自的定义接口:

```ts
// arguments不是数组类型 直接用数组的类型注解来描述会报错
function sum() {
    let args: number[] = arguments
}
// error! 

// 利用接口来描述
function sum() {
    let args: {
        [index: number]: number
        length: number
        callee: Function
    } = arguments
}

// 实际上 类数组官方有自定义的接口: IArguments, NodeList, HTMLCollection等
//上述描述可以直接用IArguments来表示:
function sum() {
    let args: IArguments = arguments
}
// IArguments实际上就是:
interface IArguments {
    [index: number]: any
    length: number
    callee: Function
}
```



## 函数

具名函数常用的两种声明方式: 1. 函数声明 2. 函数表达式声明. 

```ts
// 函数声明（Function Declaration）
function sum(x, y) {
    return x + y;
}

// 函数表达式（Function Expression）
let mySum = function (x, y) {
    return x + y;
};
```

- **函数声明的类型注解**

```js
# 语法:
function fn(param1: type, param2: type): 类型注解 {
    return 返回值
}

# 注意! 1.形参和实参的数量必须一致 2.返回值必须符合设定的指定类型, 否则报错
//例一(返回简单数据类型):
function fn(x: number, y: number): number {
    return x + y // 此处返回值必须是数字类型
}

//例二(返回一个对象):
function foo(): { color: string, area: number} {
    //...
}

例: 求数组中的最大值
function findMax( arr: number[]): number {
  let max: number = -Infinity
  arr.forEach( item => {
    if ( item > max) {
      max = item
    }
  })
  return max
}

let result: number = findMax([ 1, 2, 23, 4, 999 ])
```

如果**没有指定函数的返回值**,那么,**`函数返回值的默认类型为 void`**(空,什么都没有)

- **函数表达式声明的类型注解**

```ts
// let mySum = function() {}
// 我们需要手动的给左边的mySum添加类型
let mySum: (x: number, y:number) => number = function(x: number, y: number): number {
    return x + y
}
# ts类型定义中的 => 用来表示函数的定义: 左边是输入类型，需要用括号括起来，右边是输出类型
   (输入类型) => 输出类型
即 (x: number, y:number) => number
```

##### 函数类型接口

```ts
// 先定义函数接口, 给表达式类型注解
interface SearchFunc {
    (source: string, subString: string): boolean
}
let mySearch: SearchFunc
// 再给后面的函数类型注解
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}

// 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。
let mySearch: SearchFunc
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}
// 函数的参数会逐个进行检查, 要求对应位置上的参数类型是兼容的
```

- [**函数的重载(多态)**](https://blog.csdn.net/qq_36380426/article/details/104980915)

> 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
>
> 可以重复定义一个函数的类型

```js
function say(somthing:string):string;
function say(somthing:number):string;
// 以上是函数定义

// 以下是函数实现(利用联合数据)
function say(somthing:string|number):string|number {
    return somthing
}
#注意! ts会优先从最前面的函数定义开始匹配, 所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
```

- ##### 函数声明形式的事件处理程序说明


>1. 函数声明在当前ts文件中的任何位置都有定义
>
>2. 在函数声明形式的事件处理程序中, 如果使用事件对象参数e时, 应当指定事件对象e的类型

```js
// 给 btn添加事件
let btn = document.querySelector('#btn') as HTMLButtonElement

// 形式一: 匿名回调函数的参数, 无需类型注解
btn.addEventListener('click', function(event) {
    console.log(event.target)
})

// 形式二: 具名函数的参数, 需要类型注解
btn.addEventListener('click', handleClick)
function handleClick(e: MouseEvent) {
    console.log(e.target)
}
```

**函数的事件对象e的类型**

```js
function(e: Event) {}
```



## 对象的类型注解

1. ##### 对象的普通属性的类型注解

   1. 先对对象里的元素进行类型约束:

      ```js
      let person: {
          name: string,
          age: number
      }
      ```

      说明: 中间用分号;隔开, 可以省略.

   2. 对对象里的键值对进行赋值

      ```ts
      person = {
          name: '张三',
          age: 18
      }
      ```

2. ##### 对象的方法的注解

   ```js
   let person: {
       sayHi: () => void
       sing: (name: string) => void
       sum: (num1: number, num2: number) => number
   }
   ```

   > 说明: 
   >
   > `fn: () => void` **表示没有返回值**
   >
   > `fn: () => type` **表示return出类型为type的返回值**

3. **对象的完整类型注解**

   ```ts
   // step1: 对象的类型注解
   let person: {
     name: string
     age: number
     sayHi: (birthCity: string) => string  // 方法的参数为字符串类型, 返回值为字符串类型
   }
   
   // step2: 对象的赋值
   person = {
     name: "张三",
     age: 18,
     sayHi(birthCity) {
         return ("你好,我叫" + this.name + ", 今年" + this.age +"岁, 出生于" + birthCity)
     }
   }
   
   person.sayHi("地球")
   
   ```



## 枚举(enum名字注解)

```js
// 给一组数值赋予友好的名字(即字段)
// 按约定 枚举名称为大写的单数形式, 枚举中的键也为大写// 
enum Gender { Male, Female, Unknow }

let gender: Gender = Gender.male  (// 即 gender = 0)

let obj = {
    gender: Gender.male
}

obj.gender // output => 0
```

- 默认枚举从0开始给元素编号, 也可以手动指定成员的值


```js
enum Color { Red = 1, Green, Blue } // 下标从1开始
enum Color { Red = 1, Green = 2, Blue = 4 } // 全部手动赋值
```

- 可以使用元素的名称, 也可以使用下标


```js
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName);  // 显示'Green'因为上面代码里它的下标是2
```

- 反向引用

```bash
# 允许通过值或者键互相访问:
Gender.Male  // 0
Gender[0]    // 'Male'

# 使用 const 禁用反向查找
const enum Language {
	English,
	Spanlish,
	Russian
}
```

> **`本质`**: 就是一个对象

```ts
enum Color {
  red = 1,
  green = 2,
  blue = 4
}

// js 源码:
var Color;
(function (Color) {
    Color[Color["red"] = 1] = "red";
    Color[Color["green"] = 2] = "green";
    Color[Color["blue"] = 4] = "blue";
})(Color || (Color = {}));

{ '1': 'red', '2': 'green', '4': 'blue', red: 1, green: 2, blue: 4 }
```



```ts
// ts识别枚举类型报错:
/ error: : Element implicitly has an 'any' type because index expression is not of type 'number'
// 解决方案一：在对象接口中使用 keyof typeof 枚举变量
enum color {
    b = 'black',
    w = 'white',
    g = 'green'
}
interface Style{
    bg:keyof typeof color,
        [key:string]:string
}
const style:Style = {
    bg:'w',
    fontSize:'12px'
};
const background = color[style.bg];

// 解决方案二：使用断言
enum SortType {
    ascend, // 升序
    descend,
}
const sortType: number = SortType[order as keyof typeof SortType],

```




## 泛型

> 是一种特殊的表示任意类型的变量(变量的形参). 可以捕获传入的类型, 

##### 泛型函数

```tsx
function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
// 泛型函数loggingIdentity接收类型参数T和参数arg, 表明元素类型为T的数组
```

##### 泛型类 泛型函数接口 泛型类接口 泛型接口 接口实现类



[泛型的一些关键字](https://juejin.cn/post/6844903977461514254)

- [partial](https://juejin.cn/post/6844903977461514254#heading-0)
- [Required](https://juejin.cn/post/6844903977461514254#heading-1)
- [Pick](https://juejin.cn/post/6844903977461514254#heading-2)
- [Exclude （排除）](https://juejin.cn/post/6844903977461514254#heading-4)
- [Omit (省略)](https://juejin.cn/post/6844903977461514254#heading-5)



## type[类型别名](https://github.com/SunshowerC/blog/issues/7#type)

> 会给一个类型起一个新的名字, 和接口很像, 但可以作用于原始值, 联合类型, 元组以及任何你需要手写的其他类型
>
> ① type可以声明 基本类型 / 联合类型 / 元组 / ...任意类型,  interface只能定义对象类型
>
> ② 可以使用 typeof 获取类型实例
>
> ③ type支持类型映射, interface不支持
>
> ④interface能够声明合并，type不能
>
> **注**: 类型别名不能出现在声明右侧的任何地方!
>
> https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases

```tsx
①
// 基本类型别名
type Name = string

// 联合类型(多种不同类型)
interface Dog { wong(); }
interface Cat { miao(); }
type Pet = Dog | Cat      # 例: 声明了两种对象类型 

// 元组 具体定义了数组每个位置的类型
type PetList = [Dog, Pet]

②
// 获取变量类型时, 使用typeof
let div = document.createElement('div')
type B = typeof div

③
// 支持映射
type Keys = "firstname" | "surname" // 定义了两个字段, 用来做键名
type DudeType = {
    [key in keys]: string; // 这两个字段对应的属性值为string类型
}
const test: DudeType = {
    firstname: "LeBron",
    surename: "James"
}
/* 报错:
   interface Dudetype {
	 [key in keys]: string       
} */
```



## 接口(interface)

- 为对象的类型注解命名, 约束对象的结构, 达到复用的效果
- 是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）
- 接口名 约定以大写字母 I 开头
- **赋值的时候，变量的形状必须和接口规定的形状保持一致**。

```ts
# 创建一个接口
interface IUser {
    name: string
    age: number
    play: () => void
}
# 使用接口 给多个对象进行类型注解
let jay: IUser = {
    name: '周杰伦',
    age: 18,
    play() {
        console.log(this.name + '会打篮球')
    }
}

let yao: IUser = {
    name: '姚明',
    age: 20,
    play() {
        console.log(this.name + '会打乒乓球')
    }
}
```

##### 接口的可选属性

接口里的属性有些只在某些条件下存在, 可选属性在应用“option bags”模式时很常用

```tsx
# 在接口的属性里, 给该属性后面跟上? 表示可选
interface SquareConfig {
  color?: string;
  width?: number;
}

// 如果param.color存在, 就执行以下代码
if (param.color) {
	newColor = param.color
}
```

##### 接口的只读属性

一些`对象属性`若想创建后不可修改。 可在属性名前用 `readonly`来指定只读属性:

```ts
// 先定义接口
interface Point {
    readonly x: number;
    readonly y: number;
}
// 通过赋值一个对象的字面量来构造一个Point. 一旦赋值, x,y就再也不能被改变了
let p1: Point = {
    x: 1,
    y: 2
}

// 此时再修改p1对象里的属性就会报错
p1.x = 3 // error!
```

- ts具有ReadonlyArray<type>类型, 把所有的可变方法去掉了, 确保数组创建后再也不能被修改

```tsx
let a = [ 1, 2, 3, 4 ]

// 表明ro数组只读, 不可修改
let ro: ReadonlyArray<number> = a

b = ro // error! 重新赋值也不可以, 但是可以使用类型断言重写:
b = ro as number[]
```

##### 接口的额外属性检查

如果一个对象字面量存在任何接口“目标类型”不包含的属性时，会报错.

```ts
// 接口中规定了color和width 2个属性
interface SquareConfig {
  color?: string
  width?: number
}

function createSquare(config: SquareConfig): { color: string; area: number} {
  // ......
  return newSquare;
}

// 传参时传入了三个
let res = createSquare({ color: 'black', width: 20, height: 30 })
// error！因为height属性, 接口中并没有提及
```

##### 额外(任意)属性

如果想**添加除接口规定以外的任意属性**, **绕开额外属性检查**, 可以:

1. **给传入的参数使用类型断言**

```ts
let res = createSquare({ color: 'black', width: 20, height: 30 } as SquareConfig )
```

2. **额外属性使用 `索引签名`**

前提: 能够确定这个对象可能具有某些作为特殊用途使用的额外属性

```ts
interface SquareConfig {
    color?: string
    width?: number
    [propName: string]: any // 使用[propName: string]定义了额外属性取任意类型的值
}

# 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集:
interface Person {
    name: string; // 确定属性 string类型
    age?: number; // 可选属性 number类型
    [propName: string]: string; // 定义了额外属性为string类型
}
// 那么 下列的age就会报错
let tom: Person = {
    name: 'Tom',
    age: 25, // 必须是额外属性规定的类型的子集, 但是number不是string的子集, 所以报错
    gender: 'male'
}

# 一个接口中只能定义一个任意属性。如果接口中有多个类型的额外属性，则可以在任意属性中使用联合类型：
interface Person {
    name: string; // 确定属性 string类型
    age?: number; // 可选属性 number类型
    [propName: string]: string | number // 任意属性可以是string和number两种
}
```

3. **将这个参数对象赋值给一个另一个变量**

   因为赋值给新的变量后, 新变量不会经过额外的属性检查

```ts
// 先赋值给新变量
let squareOptions = { color: 'black', width: 20, height: 30 }
// 再传参
let res = createSquare(squareOptions)
```

##### 可索引类型接口(可用来声明数组)

“通过索引得到”的类型. 可索引类型具有一个 `索引签名`，它描述了对象索引的类型，还有相应的索引返回值类型。

```tsx
interface StringArray {
  // 定义索引类型为数字, 对应的索引返回值类型为字符串
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];  => "Bob"
```

>字符串索引签名能够很好的描述`dictionary`模式，并且它们也会确保所有属性与其返回值类型相匹配。 因为字符串索引声明了 `obj.property`和`obj["property"]`两种形式都可以。 下面的例子里， `name`的类型与字符串索引类型不匹配，所以类型检查器给出一个错误提示

```ts
① 用来声明对象
interface NumberDictionary {
  [propsname: string]: number; # 指键为字符串类型, 值为数字类型的对象
  length: number;    // 可以，length是number类型
  name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}

② 用来声明数组
interface StringArray {
    [index: number]: string # 指键为数字, 值为字符串类型 即数组
}
```



## 接口的继承

##### 接口继承接口

```tsx
// 先定义一个接口
interface Person {
  name: string
  age: number
  eat: () => void
}

// 创建另一个接口 来继承Person接口
interface girlChildren extends Person {
    grade: string
}

// 定义一个对象
let xiaoHong: Children = {
    name: '小红',
    age: 10,
    grade: '四年级',
    eat() {console.log('吃饭')}
}
```

##### 接口的多继承

```tsx
// 创建一个接口, 同时继承多个接口时, 中间用,隔开,继承其它接口的所有属性.
interface boyChildren extends Person, girlChildren {}

let xiaoMing: boyChildren = {
    name: '小红',
    age: 10,
    grade: '四年级',
    eat() {console.log('吃饭')}
}
```

##### 接口继承类

> 当接口继承了一个类类型时，它会**继承类的成员但不包括其实现**。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 **接口同样会继承到类的private和protected成员**。 这意味着当你创建了**一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现**。

```ts
// 定义一个类
class palyGame {
  game: string
  constructor(gameType: string) {
    this.game = gameType
  }
  play(name: string) {
    console.log(name + "喜欢玩" + this.game)
  }
}

//定义一个接口 来继承类
interface Boy extends palyGame {}

let xiaoMing: Boy = {
    game: '英雄联盟',
	play(name: string) {
        console.log(name + "喜欢玩" + this.game)
    }
}

xiaoMing('小明') => // 小明喜欢玩英雄联盟
```



## 类型推论

1. 变量

   - 变量直接赋值, 可省略类型注释. 因为TS会自动根据赋值的类型, 推论出该变量的数据类型.
   - 变量声明但没有赋值,  则必须给该变量类型注解

   - ```js
     let num = 20 // 可以不用类型注解
     
     let num: number; // 没有赋值 必须类型注解
     num = 20;
     ```

2. 函数返回值

   - 函数中, 如果返回值能够明确的判断其类型, 也可以省略类型注解

   - ```js
     function (num1: number, num2: number): number {
         return num1 + num2
     }
     
     // 此处返回值明显是两个数字类型变量运算的结果, 其类型也一定是数字, 所以可以直接省略类型注解 
     function (num1: number, num2: number) {
         return num1 + num2
     }
     ```

## 类型断言

**在进行DOM操作时**, 调用querySelector()`通过id获取DOM元素时`, 拿到的`元素类型都是Element`

因为**无法根据id来确定元素的具体类型**, 所以该方法返回了一个**宽泛的类型**: `元素类型(Element)`

**元素类型**只包含所有元素共有的属性和方法(比如id)

**解决方式**: 使用类型断言, 来手动指定更加具体的类型

```js
// 语法:
值 as 更加具体的类型;

let img = document.querySelector('#image') as HTMLImageElement;
img.src
```

使用场景: 当你比TS更了解某个值的类型, 并且需要制定更具体的类型时

>document.querySelector() 方法的返回值类型为: Element
>
>// 如果是 h1 标签:
>
>let title = document.querySelector('#title') as HTMLHeadingElement
>
>// 如果是 img 标签:
>
>let image = document.querySelector('#image') as HTMLImageElement
>
>

技巧: 通过console.dir()打印DOM对象, 来查看该元素的类型



## JS中的类

> class 就是 构造函数的语法糖

##### 1.基本语法

```js
class Person {
    // 1. constructor构造器: 1.创建一个对象 2.this指向该对象 3.挂载属性 4.返回该对象
    constructor(name, age) {
        this.name = name;
        this.age = age;
        // 1.1 也可以给这个构造的对象直接添加自己的属性方法(但是注意要加this!)
        this.sayHello = function() { console.log(`你好, 我是${this.name}`)}
    }
    // 2.在该Person构造函数的property对象属性上, 挂载公共方法
    sayHi(){
        console.log(this.name + ' ' + this.age)
    }
}

// 实例化
const tom = new Person('tom', 18);

// console.log(Person):
{
	length: 2,
	name: "Person",
	prototype: {
        constructor: class Dad
        sayHi: ƒ sayHi()
		__proto__: Object
    }
}

// console.log(tom)
{
    age: 18,
	name: "tom",
    sayHello: f (), // 自己的方法
	__proto__: { // 指向构造函数Person的property对象
        constructor: class Person
        sayHi: ƒ sayHi() // 构造函数的property里的方法
        __proto__: Object
    }
}
```

##### 2. this指向的问题

```js
/ 1.实例化的方法 赋值给新的变量再调用时, 会出现this丢失为undefined的现象
const tom = new Person('tom', 18);
const james = tom.sayHi;
james(); // error → 'name' of undefined

# 原因: 方法赋值给变量再调用 会出现this丢失的问题

// 2.在构造器中使用 class的方法 出现undefined的现象
class Person {
    constructor(name, age) {
        ......;
        this.btn = document.querySelector('button')
        this.btn.onclick = this.sayHi;
    }
    sayHi(){
        console.log(this.name + ' ' + this.age)
    }
}
const tom = new Person('tom', 18);
// 点击按钮 → 打印结果: undefined
# 原因: sayHi里的方法指向了btn(DOM元素), 而btn没有name,age属性

# 解决方法(bind):
// 例1: 将sayHi方法 放入构造函数中改变this指向
constructor() {
    this.sayHi = this.sayHi.bind(this);
}
// 例2: 
constructor() {
    this.btn.onclick = this.sayHi.bind(this);
}
```

##### 3.继承

> extends 继承
>
> super() 调用父类的属性和方法

```js
class Star extends Person {
    constructor(name, age) {
        super(namge, age); / 一定要写在最开头(this的前面)
        this.say = () => {
            / 利用super调用父类的方法(写在这里一定要箭头函数)
        	super.sayHi();	
        }
        ......; // 自己独有的属性
    }
    sing() {
        / 利用super调用父类的方法
        super.sayHi();	
    }
}
```



## TS中的类

>TS中的属性必须声明, 需要指定类型;
>
>声明好属性之后, **`该属性必须赋值一个默认值 或者 在构造函数中进行初始化`**(this.name = name);

```tsx
class Animal {
    // 属性必须声明,指定类型
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
}
```

##### 类的继承

> (1). 子类使用 `extends` 实现类继承
>
> (2). 在子类`constructor`构造函数中**必须调用一下`super`**，该关键字会调用父类的构造函数和方法.
>
> (3). 在子类`constructor`构造函数调用this之前必须先调用super
>
> (4). 子类的方法与父类中的方法重名时, 如果子类的方法返回值的类型与父类的返回值相同, 则会覆盖, 转而调用子类自己的方法。否则报错!
>
> (5). 调用基类的方法或属性 `this.aa`和`super.aa`是一样的

```ts
class Dog extends Animal {
    // 声明一个自己的属性
    type: string
    constructor(type: string, name: string, age: number) {
        # super会执行基类的constructor,注意参数和基类constructor里的参数顺序一致
        super(name, age)
        this.type = type
    }
	// 当自己的方法与父类重名时, 若两者返回值类型相同, 则会覆盖, 否则报错
	eat() {
        console.log('我是自己的eat方法')
    }
}

const dog = new Dog('哈士奇', '2哈', 4)
dog.name / dog.type / dog.age
dog.eat()
dog.run()
```

##### 类成员的访问修饰符

> 可以在类的成员前通过添加关键字来设置当前成员的访问权限
>
> **`public`**: 公开的 默认值 所有人都能进行访问, 实例对象也能使用
>
> **`private`**: 私有的, 只能在当前类内部中使用, 实例对象不能使用
>
> **`protected`**: 跟**private**基本一样，但它在继承的子类中可以访问, 实例对象不能使用

##### 使用public简写参数属性

> **参数属性**: 对于private protected同样有效	

```ts
// 简写:
class Cat {
    constructor(public type: string){}
}
//等价于 => 
class Cat {
    type: string
    constructor(type: string){}
	this.type = type
}
```

##### 只读属性

##### 存取器

>类似于vue中的computed, 对传入的数据进行进一步操作, 用set存放到类的私有成员中, 通过get取出
>
>`get()`: 取属性, 里面return 出set()存进来的值
>
>`set()`: 存属性, 接收传进来的参数, 可以对该参数进行校验等操作 (set 里不能有return)

```ts
class Person {
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


const p = new Person()
// 实例可以直接获取到,并修改(修改的值 会先经set校验, 符合条件的存入_name)
p.name = 'kobe'

// console.dir(p) 实例上其实有两个属性_name和name
Person {
    _name: "tom"
	name: "tom"
}
```

**注**: 当一个属性**只有get方法的时候，它就是只读的**。 这也是一种外部改变静态属性的方法

##### 类类型的接口

>使用`implements`让类去符合某种契约
>
>接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。

```ts
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number) { }
    setTime(d: Date) {
        this.currentTime = d
    }
}
```

##### 静态属性static

> 使用 `static `修饰符修饰的方法称为静态方法, 它只挂在class本身, 而不是通过new实例化后出来的对象, 所以可以通过`类.static属性`来调用, 但不能使用this.

```js
class Animal {
    static isAnimal(a) {
        return a instanceof Animal
    }
}

let a = new Animal('Jack')
Animal.isAnimal(a) // true 直接通过class类来调用
a.isAnimal(a) // error! isAnimal is not a function 不能通过实例化来调用
```

##### 抽象类 abstract

> `abstract`用来定义抽象类 和 在抽象类中定义抽象方法的 抽象类就是派生类的一个模板类, 一般不会把他实例化, 只是给子类继承用的

```ts
// 抽象一个Animal类
abstract class Animal {
    // 抽象一个方法, 必须在子类实现它
    abstract makeSound(): void
    move(): void {
        console.log('roaming the earch ...')
    }
    constructor() {}
}

class Son extends Animal {
    constructor() {
        super()
    }
    // 必须实现抽象类的方法
    makeSound() {
        return false
    }
    haha() {
        console.log('error')
    }
}

let s.Animal // 可以指定抽象类为一个类型
s.haha()     // 如果上面声明了, 那么调用抽象类中不存在的haha方法是不允许的
s = new Animal() // 不可以new抽象类
s = new Son() // 正确
s.makeSound() // 正确
```



## 高级用法

#### 交叉类型

> 指两个类型的交集 既是a又是b
>
> 交叉时, 使用 & (type 和 interface / interface和interface / type 和 type 都可以使用 & 交叉)

```ts
interface SelItem{
    value: number | string;
    label: string;
}
type Pagination = {
    page: number;
    pageSize: number;
};

//交叉:
type aa = SelItem & Pagination;

// 补充: 定义新接口时,新的接口只能extends继承
interface Bb extends Pagination, SelItem { }
```

#### 联合类型

> 指两个类型中的任何一种(或并集) 要么a 要么b
>
> 联合时, 使用 | 

```tsx
type aa = SelItem | Pagination;

// 例1: 在变量的类型未明确时, 只能访问两种类型的交集
class Dog { 
  run() {}
  eat() { }
}
class Cat {
  sleep() { }
  eat() { }
}

enum Master{ Boy, Gril }

function getPet(master: Master) {
    let pet = master === Master.Boy ? new Dog() : new Cat();
    pet.eat() // 可以访问Dog和Cat的共有属性
    pet.run() // error: 类型“Dog | Cat”上不存在属性“run”。
}

// 例2: 可区分的联合类型, 根据公共属性 创建不同的类型保护区块
interface Square {		interface Rectangle {		interface Cricle {
    kind: 'square';			kind: 'rectangle';			kind: 'circle';
    side: number;			width: number;				r: number;
}							height: number;			}
						}

type Shape = Square | Rectangle | Cricle
// 根据共有属性kind 创建不同的类型保护区块:
function area(shape: Shape) {
    switch(shape.kind) {
        case 'square':
            return shape.side * shape.side;
        case 'rectangle':
            return shape.height * shape.width;
        case 'circle':
            return Math.PI * shape.r ** 2;
        default:
            return ((e: never) => {throw new Error(e)})(shape)
    }
}
```



#### 索引类型

> **类型操作符**:`typeof` 			表示获取一个变量声明或对象的类型。
>
> **查询操作符**: `keyof T` 		表示类型T的所有公共属性名的字面量类型构成的联合类型
>
> **索引访问操作符**: `T[K]`		表示对象T中属性K的值的类型
>
> **泛型约束**:  `T extends U`  表示泛型变量T通过继承U来获得一些属性
>
> [其他操作符](https://www.cnblogs.com/cangqinglang/p/12896595.html)

```ts
// 0. typeof
const sem = { name: 'zs', age: 18 };
type Sem= typeof sem;  // "type Sem = { name: string, age: number }"

// 1. keyof T
interface Obj {
  a: number;
  b: number;
  c: string;
}
type Key = keyof Obj // "type Obj1 = 'a' | 'b' | 'c'"

// 2. T[K]
type Value = Obj['a']

// 3. T extends U
interface Obj1 extends Obj {}

// 例1: 封装函数 功能: 输入对象/键名数组 返回键值组成的数组
function getValues(obj, keys) {
    return keys.map(key => obj[key]);
}

// 泛型函数改造:
function getValues<T, K extends keyof T >(obj: T, keys: K[]): T[K][] {
    return keys.map(key => obj[key]);
}

// 例2:
export interface ResColumn<T> {
    [index: string]: any;
    dataIndex?: keyof T;
}

export interface CustomizedDevice {
    Type: DeviceType.定制机;
    Model: string;
    AssetCode: string;
	......
}

 columns(): ResColumn<CustomizedDevice>[] {
     return [
         {
             title: '标题',
             dataIndex: 'AssetCode',
             scopedSlots: { customRender: 'AssetCode' },
         },
         ......
     ]
}
         
// 例3
const filter = () => ({
    pageSize: 10,
    pageNum: 0,
    keyword: '',
    startTime: '',
    endTime: '',
    status: [],
});
type FilterField = {
    [P in keyof typeof filter]?: typeof filter[P]
};
```



#### [映射类型](https://jishuin.proginn.com/p/763bfbd30a0c)

> **1. 同态映射类型(输入类型T, 来拷贝属性):**
>
> ​		**只读类型: 	`Readonly<T>`**
>
> ​		**可选类型:	`Partial<T>`**
>
> ​		**抽取类型:	 `Pick<T, K extends keyof T>`**
>
> ​		**剔除类型:	`Exclude<T, U>`**
>
> ​		**省略类型:	`Omit<T, K extends keyof any>`**
>
> **2. 非同态类型(本质上会创建新的属性):**
>
> ​		**收录类型:	`Record<K extends keyof any, T>`**
>
> 映射类型本质上就是**预先定义的泛型接口**

```ts
interface Obj {
  a: number;
  b: number;
  c: string;
}

/ 1. Readonly<T>
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
// 例:
type AAObj = Readonly<Obj>

/ 2. Partial<T>
type Partial<T> = {
    [P in keyof T]?: T[P];
};
// 例:
type BBObj = Parital<Obj>

/ 3. Pick<T, K extends keyof T>
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
// 例:
type CCObj = Pick<Obj, 'a' | 'c'>  // type CCObj = {a: number, c: string}

/ 4. Exclude<T, U>
type Exclude<T, U> = T extends U ? never : T;
// 例:
type DD = Exclude<'a' | '1' | '2', 'a' | 'y' | 'z'> //type DD = '1' | '2'
// 注: 将 T 中某些同时属于 U 的类型移除掉。	(详情见下方条件类型)

/ 5. Omit<T, K extends keyof any>
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;


/ 6. Record<K extends keyof any, T>
type Record<K extends keyof any, T> = {
    [P in K]: T;  // 注意: 这里的K是字面量类型!
};
// 例:
interface PageInfo {
  title: string;
}

type Page = "home" | "about" | "contact";

const x: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" }
};
// K的每一个属性 都赋一份T

```



#### 条件类型

> `T extends U ? X : Y` 表示 如果T能够赋值给U 则返回X 否则返回Y 。可以实现类型的过滤
>
> 官方预置条件类型:
>
> **`Exclude<T, U>`**  表示保留T独有的属性
>
> **`Extract<T, U>`**  表示保留T、U共有的属性
>
> **`NonNullable<T>`** 表示/过滤掉T中的null和undefined
>
> **`ReturnType<T>`** 表示获取函数返回值的类型

```ts
extends 的注意点:
// 如果 T 是联合类型, 则会依次判断:
(A | B) extends U ? X : Y
// 会转换成 => 
(A extends U ? X : Y) | (B extends U ? X : Y)
```

```ts
/ Extract<T, U>
type Extract<T, U> = T extends U ? T : never;
// 例:
type DD = Extract<'a'| 'b' | 'c', 'a'| 'e'> // type DD = 'a'

/ NonNullable<T>
type NonNullable<T> = T extends null | undefined ? never : T;

/ ReturnType<T>
type ReturnType<T extends (...args: any) => any> 
	= T extends (...args: any) => infer R ? R : any;
	    | // infer 关键字 表示待推断或延时推 |
```

#### [类型守卫](https://zhuanlan.zhihu.com/p/108856165)

## ts中的导入导出(commonjs/es6)

- es6

```tsx
// 单独导出
// 批量导出
// 导出函数
// 默认导出
export default function(lang = 'zh-CN') {
    // 导出函数时 无需起名字(起了也没用)
    return new VueI18n({
        locale: lang,
        fallbackLocale: 'zh-CN',
        messages,
        silentTranslationWarn: true,
    });
}

// 引入外部模块, 重新导出
export { aa as AA } from './a.js'

// 导出接口
export interface AA {
    a: number;
    b: string
}

// 导出枚举
export enum BB {
    zhangSan,
    liSi,
    wangWU,
}
```

```ts
import { a, b, c } from './a'	// 批量导入
import { AA } from './a'		// 导入接口
import { aa as AA } from './a'	// 导入时起别名
import * as All from './a'		// 导入模块所有成员(会添加一个default属性)
import AA from './a'			// 不加{}, 导入默认export default
```

- node commonjs

```ts
// 整体导出
module.exports = a;

// 单个导出
exports.b = 2
exports.c = 3
// 相当于exports = module.exports

# 注意: commonjs中 当存在一个顶级导出(module.exports)时, 就不再允许导出其他exports了,会被顶级导出覆盖
```

- 兼容问题

> // es6语法导出 ——> commonjs导入 混用 会出现兼容问题:

![](./ts-pic/es6导出 commonjs导入.jpg)

> **原因**: commonjs 只允许有一个顶级导出, 所以export.default 被转化成 commonjs中的次级导出, 而不是module.exports:

![es6编译成commonjs](.\ts-pic\ts 编译成 js.jpg)

```ts
console.log(foo) // 其实是一个对象 function 被放在了 default属性中
{
    _esModule: true,
    aa: 'aa',
	default: [Function: default_1],
}
    
foo.default() // 'es6-export-default'
```

- **`如何解决`**:

```ts
// ts提供了一个export语法:
export = function foo() {
	console.log('es-6 funciton')
}
// 会被编译成 module.exports 同时也意味着不能有其他的导出(全部放入export中)

// 使用import导入
import foo = require'./a'
或
import foo from './a' 
// (需要tsconfig配置: "esModuleInterop": true)
/* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */

foo()
```

## 命名空间

> 也叫'内部模块', 目的是为了避免全局变量污染, 可将相似功能的函数、类、接口等放置到命名空间内。
>
> 其本质就是闭包——沙箱模式的应用
>
> 在es6引入模块系统后, 命名空间很少使用, 主要是为了兼顾全局变量时代的老版本
>
> 不要在一个模块中使用命名空间, 而应该在全局环境中使用

![namespace](.\ts-pic\namespace.jpg)

```ts
namespace Lakers {
  export class Mvp {
    constructor(public name: string, public team: string) {
      this.name = name;
      this.team = team;
    }
    play() {
      return this.team + ' ' + this.name;
    }
  }
}
namespace Bulls {
  export class Mvp {
    constructor(public name: string, public team: string) {
      this.name = name;
      this.team = team;
    }
    play() {
      return this.team + ' ' + this.name;
    }
  }
}
const blackMamba = new Lakers.Mvp('kobe', 'Lakers');
const airJordan = new Bulls.Mvp('Jordan', 'Bulls');
console.log(blackMamba.play());
console.log(airJordan.play());
```

## 声明合并

1. 合并接口

> ① 非函数的成员应该是唯一的。 如果它们不是唯一的，那么它们必须是相同的类型。 否则报错。
>
> ② 同名函数声明会被当成这个函数的一个重载。 同时需要注意，当接口`A`与后来的接口`A`合并时，后面的接口具有更高的优先级(如果有字面量参数, 含有该种参数的函数有最高优先级)

```ts
interface A {
    x: number;
    foo(param: 'a'): number;		// 优先级 2
    foo(param: number): number;		// 优先级 4
}
interface A {
    x: number; // 如果非函数成员重复, name它们类型必须相同
    y: string;
    foo(param: 'b'): number;		// 优先级 1
    foo(param: number[]): number[]  // 优先级 3
}
// 优先级: 先看字面量 再看前后顺序
```

2. 合并命名空间

> ① namespace中的导出成员会合并(不能出现重复,否则报错)
>
> ② 非导出成员仅在其原有的（合并前的）命名空间内可见。合并之后，从其它命名空间合并进来的成员无法访问非导出成员。

```ts
namespace Animal {
    let eat = false;
    export function animalHungry() { // 只有原住民能看自己的非导出成员
        return eat;
    }
}

namespace Animal {
    export function animalFull() {
        return eat;  // <-- error, eat is not visible here
    }
}
```

3. 命名空间和类

```ts
class Album {}
namespace Album {
    export let state = 1;
}
// 相当于给类添加了一些静态属性 
console.log(Album.state)

// js源码:
var Album = /** @class */ (function () {
    function Album() {}
    return Album;
}());

(function (Album) { Album.aa = 'aa'})(Album || (Album = {}));
```

4. 命名空间和函数

```ts
function buildLabel(name: string): string {
    return buildLabel.prefix + name + buildLabel.suffix;
}

namespace buildLabel {
    export let suffix = "";
    export let prefix = "Hello, ";
}

// js源码:
function buildLabel(name) {
    return buildLabel.prefix + name + buildLabel.suffix;
}
(function (buildLabel) {
    buildLabel.suffix = "";
    buildLabel.prefix = "Hello, ";
})(buildLabel || (buildLabel = {}));
console.log(buildLabel("Sam Smith"));
```

5. 命名空间和枚举

```ts
enum Color {
  red = 1,
  green = 2,
  blue = 4
}

namespace Color {
  export function mixColor(colorName: string) {
    switch (colorName) {
      case "yellow": return Color.red + Color.green;
      case "white": return Color.red + Color.green + Color.blue;
      case "magenta": return Color.red + Color.blue;
      case "cyan": return Color.green + Color.blue;
      default: return 'no color';
    }
  }
}
    
// js源码:
var Color;
(function (Color) {
    Color[Color["red"] = 1] = "red";
    Color[Color["green"] = 2] = "green";
    Color[Color["blue"] = 4] = "blue";
})(Color || (Color = {}));
(function (Color) {
    function mixColor(colorName) {
        switch (colorName) {
            case "yellow": return Color.red + Color.green;
            case "white": return Color.red + Color.green + Color.blue;
            case "magenta": return Color.red + Color.blue;
            case "cyan": return Color.green + Color.blue;
            default: return 'no color';
        }
    }
    Color.mixColor = mixColor;
})(Color || (Color = {}));
console.log(Color.mixColor('cyan'));
```

> `本质:` namespace 与函数 / 类 / 枚举 的合并, 其实就是把函数 / 类 / 枚举 当成参数 传入 沙箱(自调用函数)中 给他们添加新的属性

1. 注意: type不能声明合并

## 声明文件

#### 声明语句

第三方库会暴露出一个变量，让我们在项目中直接使用(比如jQuery的$, lodash的_)。但是 ts 编译时不知道这是啥，编译无法通过。

此时我们就要用 `declare` 声明语句来定义他的类型

- [`declare var`](https://ts.xcatliu.com/basics/declaration-files.html#declare-var) 声明全局变量
- [`declare function`](https://ts.xcatliu.com/basics/declaration-files.html#declare-function) 声明全局方法
- [`declare class`](https://ts.xcatliu.com/basics/declaration-files.html#declare-class) 声明全局类
- [`declare enum`](https://ts.xcatliu.com/basics/declaration-files.html#declare-enum) 声明全局枚举类型
- [`declare namespace`](https://ts.xcatliu.com/basics/declaration-files.html#declare-namespace) 声明（含有子属性的）全局对象
- [`interface` 和 `type`](https://ts.xcatliu.com/basics/declaration-files.html#interface-和-type) 声明全局类型
- [`export`](https://ts.xcatliu.com/basics/declaration-files.html#export) 导出变量
- [`export namespace`](https://ts.xcatliu.com/basics/declaration-files.html#export-namespace) 导出（含有子属性的）对象
- [`export default`](https://ts.xcatliu.com/basics/declaration-files.html#export-default) ES6 默认导出
- [`export =`](https://ts.xcatliu.com/basics/declaration-files.html#export-1) commonjs 导出模块
- [`export as namespace`](https://ts.xcatliu.com/basics/declaration-files.html#export-as-namespace) UMD 库声明全局变量
- [`declare global`](https://ts.xcatliu.com/basics/declaration-files.html#declare-global) 扩展全局变量
- [`declare module`](https://ts.xcatliu.com/basics/declaration-files.html#declare-module) 扩展模块
- [`/// <reference> `](https://ts.xcatliu.com/basics/declaration-files.html#san-xie-xian-zhi-ling) 三斜线指令

比如jQuery里的$

```js
$('#foo') / jQuery('#foo')
在ts中都无法识别

// 使用 declare var 来定义它的类型
declare var jQuery: (selector: string) => any
jQuery('#foo')

// declare var 并没有真的定义一个变量, 只是定义了全局变量jQuery的类型, 仅仅会用于编译时的检查, 在编译结果中会被删除. 它的编译结果是:
jQuery('#foo')
```

#### 声明文件

把声明语句放到一个单独的以`.d.ts`为后缀结尾的文件（比如`jQuery.d.ts`）中，这就是声明文件:

```ts
// src/jQuery.d.ts中:

declare var jQuery: (selector: string) => any
```

#### 第三方声明文件

[声明文件查询地址](https://www.typescriptlang.org/dt/search?search=)

推荐使用 `@types` 统一管理第三方库的声明文件。直接用安装npm安装对应的声明模块即可:

```js
npm i @types/jquery -D
```

#### 自定义书写声明文件

>声明文件有以下方法:
>
>1. 全局库的声明文件
>   - 全局变量：通过 `<script>` 标签引入第三方库，注入全局变量
>2. **`es6模块库的声明文件`**
>   - `npm 包`：通过 `import foo from 'foo'` 导入，符合 ES6 模块规范
>3. umd库的声明文件
>   - UMD 库：既可以通过 `<script>` 标签引入，又可以通过 `import` 导入
>
>4. **`模块插件`**：给类库添加一些自定义的方法
>
>   - 改变了模块变量的结构, 比如给egg添加新的一些属性 方法 或 接口等
>
>   - 使用`declare module 'egg' { export 自定义的属性或方法}`
>
>5. 直接扩展全局变量(不推荐)：对全局命名空间会造成一定的污染
>   - 通过 `<script>` 标签引入后，改变一个全局变量的结构。比如为 `String.prototype` 新增了一个方法
>   - 使用`declare global { namespace XXX {自定义属性和方法}}`
>6. 声明文件的依赖: (大型声明文件 会以模块划分, 之间存在依赖关系)
>   - 三斜线指令 /// <reference />
>   - 模块依赖 /// <reference types="文件夹名" />
>   - 路径依赖 /// <reference path="相对路径" />
>
>请看 [书写声明文件](https://ts.xcatliu.com/basics/declaration-files.html)

1. `npm es6模块的声明文件:`

```ts
// module-lib.js (commonjs)
const version = '1.0.0'
function doSomething() {
    console.log('module do something')
}
function moduleLib(options) {
    console.log(options)
}
moduleLib.version = version;
moduleLib.doSomething = doSomething;

module.exports = moduleLib;

// 对应的ts类型声明文件: module-lib.d.ts
declare funciton moduleLib(options: Options): void;
interface Options {
    [key: string]: any
}
declare namespace moduleLib {
    export const vesion: string;         // 这里的 export 可以省略
    export function doSomething(): void
}
export = moduleLib // 推荐使用ts的导出语法!
```

2. 全局变量的声明文件

```ts
// global-lib.js
function globalLib(options): {
    console.log(options)
}
globalLib.version = '1.0.0'
globalLib.doSomething = funciton() {
    console.log('global do something')
}

// global-lib.d.ts
declare funciton globalLib(options: Options): void;
interface Options {
    [key: string]: any
}
declare namespace moduleLib {
    export const vesion: string;         // 这里的 export 可以省略
    export function doSomething(): void
    interface Options {
        [key: string]: any
    }
}
```

3. umd库的声明文件

```ts
// umd-lib.js
(function (root, factory) {
	if (typeof define === "function" && define.amd) {
		define factory);
    } else if (typeof module ==="object" & module exports)
		module exports factory ();
    } else {
		root. umdLib factory ();
    }
}(this, function() {
	return {
		version: '1.0.0',
		doSomethingo() {
 			console. log('umdLib do something);
 		}
}));
    
// umd-lib.d.ts
declare namespace umbLib {
    const version: string
    function doSomething(): void
}
export as namespace umdLib # umd库不可缺少的语句
export = umbLib

// 使用umdLib方法:
① import umbLib from './umb-lib' 
② // 直接去全局使用(ts不建议这样做) 如需全局导入(不使用import), 需在tsconfig中配置"allowUmdGlobalAccess": true,否则会报错
```

4. `模块插件(declare module)`

```tsx
// 扩充 egg 功能
declare module 'egg' {
    interface Context {
        session: {
            user: Persion;
            [key: string]: any;
        };
    }
    funciton doSomething(): void 
}
```

5. 扩展全局变量(declare global)

```ts
declare global {
    namespace globalLib {
        function doSomething(): void
    }
}
```



```bash
# 项目结构
├── README.md
├── src
|  └── index.ts
├── types
|  └── foo
|     └── index.d.ts
└── tsconfig.json

# tsconfig的配置
{
    "compilerOptions": {
        "module": "commonjs",
        "baseUrl": "./",
        "paths": {
            "*" : ["types/*"]
        }
    }
}
```

- export

npm包写的声明文件`declare`不会声明一个全局变量, 只有导出的时候才会应用类型声明

```ts
// 在foo目录中的index.d.ts文件中:
export const name: string

export function getName(): string

export class Animal {
    constructor(name: string)
    sayHi(): string
}

export interface Options {
    data: any
}

// ==> 对应使用到项目中
// 从index.d.ts中解构出来
import { name, getName, Animal, Directions, Options } from 'foo'
let myName = getName()
let cat = new Animal('Tom')
let options: Option = {
    data: {
        name: 'foo'
    }
}
```

- 混用`declare` `export`

```ts
declare const name: string
declare function getName(): string
declare class Animal {
    constructor(name: string)
    syaHi(): string
}

export {
	name,
    getName,
    Animal
}
```

- 导出默认值

> 只有function / class / interface 可以直接默认导出, 其他变量需要先定义出来, 再默认导出
>
> 针对默认导出, 一般会把导出语句放在声明文件的最前面

```ts
// function / class / interface 都可直接默认导出 export default
export default function foo(): string
export default interface Options {
    data: any
}
export default class Person {
    constructor(name: string)
    sayHi(): string
}

// 除上述三种类型之外 其余变量需要先定义 再默认导出
declare const str: string
export default str
```

6. `export namespace` 对象的嵌套声明

> 表示变量是一个包含了子属性的对象类型, 比如lodash, 它是一个对象,但也提供了很多子属性方法 lodash.debunce等
>
> 如果对象拥有深层的层级, 则需要用嵌套的`namespace`来声明深层的属性的类型:
>
> 总的来说 用来导出一个拥有子属性的对象.

```ts
export namespace obj {
    const name: string
    function fn(a: string, b?: number): void
    class Event {
        say(str: string): void
    }
    // 使用namespace继续嵌套声明
    namespace sonObj {
        const foo: string
    }
}
```

## [tsconfig的配置](https://www.cnblogs.com/fangsmile/p/14239529.html)

##### 与文件相关的选项

> files: 数组, 需要编译的单个文件列表
>
> includes: 数组, 需要编译的文件或目录 
>
> excludes: 数组, 需要排除编译的文件或目录 
>
> extend: 导入其他tsconfig配置项
>
> compileOnSave: 保存的时候 编译器自动编译

```json
// tsconfig.base.json
{
    "files": ["src/a.ts"], // 编译当前src目录下的a.ts
    "include": [
        "src", // 编译src目录下的所有文件(包含里面各级目录下的文件)
        "src/*", // (支持通配符)只编译src下一级目录里的文件
        "src/*/*" //只编译src下的二级目录里的文件
    ],
    "exclude": [
        "src/lib"// 需要排除的文件或文件夹(默认排除node_module/所有声明文件)
    ]
}

// 可以通过extends 导入基础配置项
{
    "extends": "./tsconfig.base.json",
    // ......也可通过重写配置项进行覆盖
    "compileOnSave": true // 保存时自动编译
}
```

##### compilerOptions编译选项

```ts
"esModuleInterop": true,  // 允许export = 导出 有import from 导入
"jsx": "preserve",		  // 指定jsx代码用于的开发环境: 'preserve', 'react-native', or 'react'. 
"jsxFactory": "VueTsxSupport" // 安装"VueTsxSupport" vue中既支持jsx又保留vue自带的指令
"baseUrl": "./web",
"path": {
    "typings/*": ["../typings/*"],
    "@/*": ["*"]
}
```

##### [工程引用选项](https://github.com/microsoft/TypeScript/tree/master/src)

> 多个需要单独构建的过程, 需要进行单独配置, 无法仅靠一个tsconfig.json进行配置
>
> 1. 解决输出目录结构的问题
> 2. 单个工程构建的问题
> 3. 通过增量编译 提升了速度

```json
// 四个小工程: client / server / common(公共方法) / test(会用到client和server)

// 最外层 tsconfig.json:
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "strict": true,
        "composite": true,  // 工程可以被引用, 并且可以进行增量编译
        "declaration": true //编译每个ts文件之后会生成一个js文件和一个声明文件。但是declaration和allowJs不能同时设为true
    }
}

// client tsconfig.json:
{
    "extends": "../../tsconfig.json",
    "compilerOptions": {
        "outDir": "../../dist/client",
    },
    "references": [
        { "path": "../common" } // 指定要依赖的项目
    ]
}

// common tsconfig.json
{
    "extends": "../../tsconfig.json",
    "compilerOptions": {
        "outDir": "../../dist/common"
    }
}

// test tsconfig.json
{
    "extends": "../tsconfig.json",
    "references": [
        {"path": "../src/client"},
        {"path": "../src/server"}
    ]
}

$tsc -b src/server --verbose // -b 路径 单独构建一个工程, --verbose 打印出构建信息
```



## vscode中的ts调试配置

1. 准备要调试的ts文件 

2. 添加调试配置

   <img src="C:\Users\zhangYao\AppData\Roaming\Typora\typora-user-images\image-20200905232606601.png" alt="image-20200905232606601" style="zoom:67%;" />

   <img src="C:\Users\zhangYao\AppData\Roaming\Typora\typora-user-images\image-20200905232833002.png" alt="image-20200905232833002" style="zoom: 50%;" />

   > (1) 打开调试窗口：左侧边栏（Debug）
   >
   > (2) 生成默认配置：点击Debug后面的下拉框, 选择添加配置
   >
   > (3) 修改配置内容如下:

   ```js
   // launch.json中配置
   {
       "version": "0.2.0",
       "configurations": [
           {
               "type": "node",
               "request": "launch",
               "name": "调试TS代码",
               // 作用: 调试时加载ts-node包(在调试时运行ts代码)
               "runtimeArgs": ["-r", "ts-node/register"],
               // 此处的a.ts 表示当前要调试的ts文件
               "args": ["${workspaceFolder}/a.ts"]
           }
       ]
   }
   ```

   

3. 安装调试用到的包(重新单独安装调试所需的包)

   - 在当前文件目录中, 打开终端窗口

   - 在终端中输入以下命令:

     ```js
     # 原先通过 -g 全局安装的包, 在调试时不生效, 需要在当前目录中单独安装
     # 调试TS代码, 依赖这两个包:
     npm i typescript ts-node
     ```

4. 调试步骤:

   打断点 → 点击"▷" 开始调试 → 监视变量值(添加到左侧监视窗口)

[慕课网ts教程](http://www.imooc.com/wiki/typescriptlesson/conditionaltype.html)

[TS手册](https://bosens-china.github.io/Typescript-manual/describe/)

[深入理解TS](https://jkchao.github.io/typescript-book-chinese/)

## ts中的协变与逆变(抗变)

> https://www.jianshu.com/p/aeef6d17ce63
>
> https://blog.csdn.net/yehuozhili/article/details/108567297
>
> https://www.jianshu.com/p/1e786ce4786c

## 装饰器

https://juejin.cn/post/6844904090233733134#heading-0


## vue class component

> vue2 基于类的组件

文档地址:

中文文档: https://www.jianshu.com/p/adfe275b731e

官方文档: https://class-component.vuejs.org/

github: https://github.com/vuejs/vue-class-component