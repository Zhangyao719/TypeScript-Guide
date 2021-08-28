interface Square {
  kind: 'square';
  side: number;
}
interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

interface Cricle {
  kind: 'circle';
  r: number;
}

type Shape = Square | Rectangle | Cricle
// 根据共有属性kind 创建不同的类型保护区块:
function area(shape: Shape) {
  switch (shape.kind) {
    case 'square':
      return shape.side * shape.side;
    case 'rectangle':
      return shape.height * shape.width;
    case 'circle':
      return Math.PI * shape.r ** 2;
    default:
      return ((e: never) => { throw new Error(e) })(shape)
  }
}

