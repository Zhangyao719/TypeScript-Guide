namespace MapTs {
  type BoxedValue<T> = { value: T };
  type BoxedArray<T> = { array: T[] };
  type Boxed<T> = T extends any[] ? BoxedArray<T[number]> : BoxedValue<T>;
  
  type FunctionProperty<T> = { [K in keyof T]: T[K] extends Function ? K : never };
  type FunctionPropertyNames<U> = U[keyof U];
  
  interface Part {
    id: number;
    name: string;
    subparts: Part[];
    updatePart(newName: string): void;
  }

  type Literal = FunctionProperty<Part>

  const bb: FunctionPropertyNames<Literal> = 'updatePart'
  
}
