interface Aa {
  aa: boolean;
  bb: number;
}

type NewAa<T> = {
  [P in keyof T]: T[P];
}

type NewAa1 = NewAa<Aa>['aa']
type NewAa2 = Readonly<Aa>




