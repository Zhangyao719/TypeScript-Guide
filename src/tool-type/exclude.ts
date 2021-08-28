namespace Exclude{

  type Aa = {
    b: number;
    a: string;
  }

  type Bb = {
    b: number;
  }
  type Exclude1<T, U> = T extends U ? never : T

  type T0 = Exclude<'a' | 'b' | 'c', 'a'>; // "b" | "c"

  type Ee = Exclude<Aa, Bb>
  
  
  interface Aa1 extends Bb {
    a: string;
  }
  type Ee1 = Exclude<Aa1, Bb>

}