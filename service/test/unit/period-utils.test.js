const assert = require('assert').strict;
const { CustomPeriod } = require('../../src/utils/period-utils');

function test_partitionByMonth() {
  const period = new CustomPeriod('2020-01-15', '2021-03-26');
  const partition = period.partition('1m');
  [
    [ '2020-01-15', '2020-01-31' ],
    [ '2020-02-01', '2020-02-29' ],
    [ '2020-03-01', '2020-03-31' ],
    [ '2020-04-01', '2020-04-30' ],
    [ '2020-05-01', '2020-05-31' ],
    [ '2020-06-01', '2020-06-30' ],
    [ '2020-07-01', '2020-07-31' ],
    [ '2020-08-01', '2020-08-31' ],
    [ '2020-09-01', '2020-09-30' ],
    [ '2020-10-01', '2020-10-31' ],
    [ '2020-11-01', '2020-11-30' ],
    [ '2020-12-01', '2020-12-31' ],
    [ '2021-01-01', '2021-01-31' ],
    [ '2021-02-01', '2021-02-28' ],
    [ '2021-03-01', '2021-03-26' ]
  ].forEach(
    (p, i) => {
      assert.equal(partition[i][0], p[0]);
      assert.equal(partition[i][1], p[1]);
    }
  )
}

module.exports = {
  tests: [
    test_partitionByMonth
  ]
}
