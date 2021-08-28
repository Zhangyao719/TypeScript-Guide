declare function globalLib(params: Params): void;
declare namespace globalLib {
  const version: string;
  function doSomething(): void;
  interface Params {
    [key: string]: any
  }
}