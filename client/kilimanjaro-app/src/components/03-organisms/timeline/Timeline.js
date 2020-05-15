import React from 'react';
import { Actions } from '../../../flux/actions';
import { ServiceProvider, Services } from '../../../service-provider';
import * as utils from '../../../utils';
// Atoms
import TimelineButton from '../../01-atoms/timeline-button/TimelineButton'

// Styles
import './Timeline.scss';

class Timeline extends React.Component {

  constructor(props) {
    super(props);
    this.dispatcher = ServiceProvider.get(Services.DISPATCHER);
    this.operationStore = ServiceProvider.get(Services.OPERATION_STORE);
    this.operationStoreSubscription = null;
    this.state = {
      periods: [],
      currentPeriod: 0
    };
  }

  componentDidMount() {
    this.operationStoreSubscription = this.operationStore.subscribe(
      state => this._buildTimeline( state )
    );
    this._buildTimeline( this.operationStore.getState() );
  }
  
  componentWillUnmount() {
    this.operationStore.unsubscribe( this.operationStoreSubscription );
  }

  _buildTimeline(state) {
    this.setState({
      periods: Object.keys(state.operationsGroupedByMonth).sort().reverse().map(
        month => {
          const m = month.split('-');
          return {
            year: m[0],
            month: m[1],
            name: utils.mapToMonthName(m[1]),
            operations: state.operationsGroupedByMonth[month]
          };
        }
      )
    });
  }

  selectMonth(index) {
    if (this.state.periods.length > 0) {
      this.setState({ currentPeriod: index });
      this.dispatcher.dispatch({
        type: Actions.SET_OPERATIONS,
        operations: this.state.periods[index].operations
      });
    }
  }

  render() {
    return (
      <div className="Timeline">
        {this.state.periods.map((period, i) =>
          <TimelineButton key={period.name}
            text={period.name}
            selected={this.state.currentPeriod === i}
            onClick={() => this.selectMonth(i)} />
        )}
      </div>
    );
  }
}

export default Timeline;
