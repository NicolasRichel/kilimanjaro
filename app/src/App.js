import React from 'react';
import Actions from './flux/actions';
import Dispatcher from './flux/dispatcher';
import DateStore from './flux/stores/date-store';
import LabelStore from './flux/stores/label-store';
import OperationStore from './flux/stores/operation-store';
import * as utils from './utils';
// Organisms
import DialogViewport from './components/03-organisms/dialog-viewport/DialogViewport';
import Header from './components/03-organisms/header/Header';
import NotificationViewport from './components/03-organisms/notification-viewport/NotificationViewport';
import OperationsManager from './components/03-organisms/operations-manager/OperationsManager';
import StatisticsManager from './components/03-organisms/statistics-manager/StatisticsManager';
import Timeline from './components/03-organisms/timeline/Timeline';
import Toolbar from './components/03-organisms/toolbar/Toolbar';

// Styles
import './App.scss';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      operations: [],
      dateRange: []
    };
  }

  componentDidMount() {
    this.s0 = LabelStore.subscribe(
      data => this.setState({ labels: data.labels })
    );
    this.s1 = OperationStore.subscribe(
      data => this.setState({ operations: data.operations })
    );
    this.s2 = DateStore.subscribe(
      data => this.setState({ dateRange: data.dateRange })
    );
    Dispatcher.dispatch({
      type: Actions.FETCH_ALL_LABELS
    });
    Dispatcher.dispatch({
      type: Actions.SET_PERIOD, period: [ '2020-01-01', utils.getCurrentDate() ]
    });
  }

  componentWillUnmount() {
    LabelStore.unsubscribe( this.s0 );
    OperationStore.unsubscribe( this.s1 );
    DateStore.unsubscribe( this.s2 );
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="left-container">
          <Toolbar />
        </div>
        <div className="main-container">
          <OperationsManager
            labels={this.state.labels}
            operations={this.state.operations}
            dateRange={this.state.dateRange} />
          <StatisticsManager
            labels={this.state.labels}
            operations={this.state.operations}
            dateRange={this.state.dateRange} />
        </div>
        <div className="right-container">
          <Timeline />
        </div>
        <NotificationViewport />
        <DialogViewport />
      </div>
    );
  }

}

export default App;
