/*   let triangle = {
    a: 10,
    b: 15,
    c: 20,
    area: function () {
      return () => {
        // this 为 any 类型
        const p = (this.a + this.b + this.c) / 2
        return Math.sqrt(p * (p - this.a) * (p - this.b) *(p - this.c))
      }
    }
  }
  
  const myArea = triangle.area()
  console.log(myArea()) */
  
  type Triangle = {
    a: number;
    b: number;
    c: number;
    area(this: Triangle): () => number;
  }
  
  let triangle: Triangle = {
    a: 10,
    b: 15,
    c: 20,
    area: function (this: Triangle) {
      return () => {
        const p = (this.a + this.b + this.c) / 2
        return Math.sqrt(p * (p - this.a) * (p - this.b) *(p - this.c))
      }
    }
  }
  
  const myArea = triangle.area()
  console.log(myArea())

  /**
   * 1. 简写型 调用签名
   * type Log = (msg: string, id?: string) => void;
   * 
   * 2. 完整型 调用签名 (写多个 就是函数重载)
   * type Log = {
   *  (msg: string, id: string) => void;
   *  (msg: string, id: number) => void;
   * }
  */