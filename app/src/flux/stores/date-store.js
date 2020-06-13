import Actions from '../actions';
import { Store } from '../store';
import * as utils from '../../utils';

class DateStore extends Store {

  constructor() {
    super();
    this.setData({
      period: [],
      dateRange: [],
      periodPartition: []
    });
  }

  handleAction(action) {
    switch (action.type) {
      case Actions.SET_PERIOD:
        this._setPeriod(action.period);
        this._partitionPeriodByMonth();
        break;
      case Actions.SET_DATE_RANGE:
        this._setDateRange(action.dateRange)
        break;
      case Actions.PARTITION_PERIOD:
        this._partitionPeriodByMonth();
        break;
    }
  }

  _setPeriod(period) {
    const dateRange = this.data.dateRange;
    if (dateRange[0] < period[0]) {
      dateRange[0] = period[0];
    }
    if (dateRange[1] > period[1]) {
      dateRange[1] = period[1];
    }
    this.setData({ period });
    this.setData({ dateRange });
  }

  _setDateRange(dateRange) {
    const period = this.data.period;
    if (dateRange[0] < period[0]) {
      dateRange[0] = period[0];
    }
    if (dateRange[1] > period[1]) {
      dateRange[1] = period[1];
    }
    this.setData({ dateRange });
  }

  _partitionPeriodByMonth() {
    const period = this.data.period;
    if (period.length === 2) {
      let d = period[0], i = -1;
      const dateRanges = [];
      while (d < period[1]) {
        dateRanges.push([ d, utils.getLastDayOfMonth(d) ]);
        let [ year, month, day ] = d.split('-').map(x => +x);
        if (month === 12) {
          year++;
          month = 1;
        } else {
          month++;
        }
        d = `${year}-${('0'+month).slice(-2)}-01`;
        i++;
      }
      dateRanges[i][1] = period[1];
      this.setData({
        periodPartition: dateRanges,
        dateRange: dateRanges[i]
      });
    }
  }

}

export default new DateStore();
