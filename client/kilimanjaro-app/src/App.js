import React from 'react';
import { Actions } from './flux/actions';
import { ServiceProvider, Services } from './services/service-provider';
// Organisms
import DialogViewport from './components/03-organisms/dialog-viewport/DialogViewport';
import Header from './components/03-organisms/header/Header';
import NotificationViewport from './components/03-organisms/notification-viewport/NotificationViewport';
import OperationsManager from './components/03-organisms/operations-manager/OperationsManager';
import StatisticsManager from './components/03-organisms/statistics-manager/StatisticsManager';
import Toolbar from './components/03-organisms/toolbar/Toolbar';

// Styles
import './App.scss';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.dispatcher = ServiceProvider.get(Services.DISPATCHER);
  }

  componentDidMount() {
    this.dispatcher.dispatch({ type: Actions.FETCH_LABEL_LIST });
    this.dispatcher.dispatch({ type: Actions.FETCH_OPERATION_LIST });
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
        <Toolbar />
        <NotificationViewport />
        <DialogViewport />
        <div className="main-container">
          <OperationsManager />
          <StatisticsManager />
        </div>
      </div>
    );
  }

}


export default App;
