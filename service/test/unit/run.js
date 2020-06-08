// Unit Test runner

console.log('Start tests');

[
  require('./date-utils.test').tests,
  require('./period-utils.test').tests
].reduce(
  (fullSuite, tests) => fullSuite.concat(tests), []
).forEach(
  test => test()
);

console.log('End of tests');
