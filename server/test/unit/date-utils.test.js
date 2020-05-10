const assert = require('assert').strict;
const { CustomDate } = require('../../src/utils/date-utils');

function test_set_get() {
  const date = new CustomDate('2020-03-11');
  assert.equal(date.get(), '2020-03-11');
  date.set('2018-06-24');
  assert.equal(date.get(), '2018-06-24');
}

function test_nextDay() {
  const date = new CustomDate('2020-02-27');
  assert.equal(date.nextDay().get(), '2020-02-28');
  assert.equal(date.nextDay().get(), '2020-02-29');
  assert.equal(date.nextDay().get(), '2020-03-01');
  date.set('2019-12-31');
  assert.equal(date.nextDay().get(), '2020-01-01');
}

function test_plusMonths() {
  const date = new CustomDate();
  assert.equal(date.set('2020-01-03').plusMonths(1).get(), '2020-02-03');
  assert.equal(date.set('2020-03-31').plusMonths(1).get(), '2020-04-30');
  assert.equal(date.set('2020-03-14').plusMonths(3).get(), '2020-06-14');
  assert.equal(date.set('2019-11-10').plusMonths(5).get(), '2020-04-10');
  assert.equal(date.set('2018-11-30').plusMonths(3).get(), '2019-02-28');
}

function test_lastDayOfMonth() {
  const date = new CustomDate();
  assert.equal(date.set('2019-01-03').lastDayOfMonth().get(), '2019-01-31');
  assert.equal(date.set('2019-02-07').lastDayOfMonth().get(), '2019-02-28');
  assert.equal(date.set('2019-04-18').lastDayOfMonth().get(), '2019-04-30');
  assert.equal(date.set('2020-02-05').lastDayOfMonth().get(), '2020-02-29');
}

module.exports = {
  tests: [
    test_set_get,
    test_nextDay,
    test_plusMonths,
    test_lastDayOfMonth
  ]
};
