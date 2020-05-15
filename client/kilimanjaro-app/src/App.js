import React from 'react';
import { Actions } from './flux/actions';
import { ServiceProvider, Services } from './service-provider';
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
    this.dispatcher = ServiceProvider.get(Services.DISPATCHER);
  }

  componentDidMount() {
    this.dispatcher.dispatch({ type: Actions.FETCH_ALL_LABELS });

    this.dispatcher.dispatch({
      type: Actions.FETCH_OPERATIONS_GROUPED_BY_MONTH,
      start: '2020-01-01',
      end: utils.getCurrentDate()
    });

    this.dispatcher.dispatch({
      type: Actions.NOTIFY,
      notification: {
        type: 'info',
        message: 'Bienvenue dans Kilimanjaro ! :-)',
        timeout: 1000
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="left-container">
          <Toolbar />
        </div>
        <div className="main-container">
          <OperationsManager />
          <StatisticsManager />
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
