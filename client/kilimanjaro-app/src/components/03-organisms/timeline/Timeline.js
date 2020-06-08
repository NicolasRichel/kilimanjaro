import React from 'react';
import Actions from '../../../flux/actions';
import Dispatcher from '../../../flux/dispatcher';
import PeriodStore from '../../../flux/stores/period-store';
import * as utils from '../../../utils';

// Styles
import './Timeline.scss';

class Timeline extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      period: [],
      dateRanges: [],
      selectedDateRange: 0
    };
  }

  componentDidMount() {
    this.s0 = PeriodStore.subscribe( data => this._buildDateRanges( data ) );
    this._buildDateRanges( PeriodStore.getData() );
  }
  
  componentWillUnmount() {
    PeriodStore.unsubscribe( this.s0 );
  }

  _buildDateRanges(data) {
    if (data.period.length === 2) {
      let d = data.period[0];
      const dateRanges = [];
      while (d < data.period[1]) {
        dateRanges.push([ d, utils.getLastDayOfMonth(d) ]);
        let [ year, month, day ] = d.split('-').map(x => +x);
        if (month === 12) {
          year++;
          month = 1;
        } else {
          month++;
        }
        d = `${year}-${('0'+month).slice(-2)}-01`;
      }
      dateRanges[ dateRanges.length-1 ][1] = data.period[1];
      this.setState({
        period: data.period,
        dateRanges: dateRanges.reverse()
      });
    }
  }

  selectDateRange(index) {
    if (this.state.dateRanges.length > 0) {
      this.setState({ selectedDateRange: index });
      Dispatcher.dispatch({
        type: Actions.SET_DATE_RANGE, dateRange: this.state.dateRanges[index]
      });
    }
  }

  render() {
    return (
      <div className="Timeline">
        {this.state.dateRanges.map((dateRange, i) => {
          const date = dateRange[0];
          return (
            <div>
              <div className={`month-button ${this.state.selectedDateRange === i ? 'selected' : ''}`}
                onClick={() => this.selectDateRange(i)}>
                {utils.getMonthName(date)}
              </div>
              {date.slice(5, 7) === '01' &&
                <div className="year-separator">
                  {date.slice(0, 4)} <span className="line"></span>
                </div>
              }
            </div>
          );
        })}
      </div>
    );
  }
}

export default Timeline;
