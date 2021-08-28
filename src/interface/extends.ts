interface A { aa: string }

interface B {
  bb: number;
}

interface C extends A, B {
  cc: boolean;
}

let field = {} as C;
field.aa = "blue";
field.bb = 10;
field.cc = true;
