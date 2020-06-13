import React from 'react';
import Actions from '../../../flux/actions';
import Dispatcher from '../../../flux/dispatcher';
import DateStore from '../../../flux/stores/date-store';
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
    this.s0 = DateStore.subscribe(
      data => this.setState({
        period: data.period,
        dateRanges: data.periodPartition
      })
    );
    const data = DateStore.getData();
    this.setState({
      period: data.period,
      dateRanges: data.periodPartition
    });
  }
  
  componentWillUnmount() {
    DateStore.unsubscribe( this.s0 );
  }

  selectDateRange(index, dateRange) {
    this.setState({ selectedDateRange: index });
    Dispatcher.dispatch({
      type: Actions.SET_DATE_RANGE, dateRange
    });
  }

  render() {
    const dateRanges = this.state.dateRanges.slice().reverse();
    return (
      <div className="Timeline">
        {dateRanges.map((dateRange, i) => {
          const date = dateRange[0];
          return (
            <div key={date}>
              <div className={`month-button ${this.state.selectedDateRange === i ? 'selected' : ''}`}
                onClick={() => this.selectDateRange(i, dateRange)}>
                {utils.getMonthName(date)}
              </div>
              {utils.getMonth(date) === '01' &&
                <div className="year-separator">
                  {utils.getYear(date)} <span className="line"></span>
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
