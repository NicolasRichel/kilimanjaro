const { CustomDate } = require('./date-utils');

class CustomPeriod {

  constructor(startDateString, endDateString) {
    this.set(startDateString, endDateString);
  }

  get() {
    return [ this.start.get(), this.end.get() ];
  }

  set(startDateString, endDateString) {
    if (startDateString > endDateString) {
      let d = startDateString;
      startDateString = endDateString;
      endDateString = d;
    }
    this.start = new CustomDate(startDateString);
    this.end = new CustomDate(endDateString);
    return this;
  }


  partition(x) {
    const n = parseInt(x);
    const t = x.slice(-1);
    let increment;
    switch (t) {
      case 'd':
        increment = (d) => d.plusDays(n - 1); break;
      case 'w':
        increment = (d) => d.plusWeeks(n - 1).lastDayOfWeek(); break;
      case 'm':
      default:
        increment = (d) => d.plusMonths(n - 1).lastDayOfMonth();
    }
    let date = new CustomDate( this.start.get() );
    let partition = [];
    while (date.get() < this.end.get()) {
      partition.push([ date.get(), increment(date).get() ]);
      date.nextDay();
    }
    partition[partition.length - 1][1] = this.end.get();
    return partition;
  }

}

module.exports = {
  CustomPeriod
};
