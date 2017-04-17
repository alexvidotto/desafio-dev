module.exports.geocode = function () {
  let args = arguments;
  return Promise.resolve().then(function () {
    console.log(args)
    return args;
  });
}
