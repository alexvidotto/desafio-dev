module.exports.calc = function () {
  let args = arguments;
  return Promise.resolve().then(function () {
    console.log(args)
    return args;
  });
}
