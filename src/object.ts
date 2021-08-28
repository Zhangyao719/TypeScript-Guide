namespace Object1 {
  function fetch(p: number) {
    return p
  }
  /* declare  */function create(o: object | null): void {
    // fetch(o.p);
  };
  
  create({ prop: 0 }); // OK
  create(null); // OK
  
  // create(42); // Error
  // create("string"); // Error
  // create(false); // Error
  // create(undefined); // Error
  
  let aa: any = 123;
  let value: string = aa;
  console.log('🚀 → value', value)
}
