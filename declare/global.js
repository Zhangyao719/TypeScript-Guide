function globalLib(params) {
  console.log(params.aa);
}
globalLib.version = '1.0';
globalLib.doSomething = function () {
  console.log('globalLib');
};
