interface SquareConfig {
  color?: string;
  width?: number;
}
declare function createSquare(config: SquareConfig): any

let mySquare= createSquare({ colour: "red", width: 100 });

let mySquare1 = createSquare({ colour: "red", width: 100 } as SquareConfig);

let params = { colour: "red", width: 100 }
let squareOptions = createSquare(params);

