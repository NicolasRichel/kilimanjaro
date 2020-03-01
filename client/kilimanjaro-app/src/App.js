import React from 'react';
import DialogContainer from './components/dialog-container/DialogContainer';
import Header from './components/header/Header';
import NotificationContainer from './components/notification-container/NotificationContainer';
import OperationsManager from './components/operations-manager/OperationsManager';
import StatisticsViewer from './components/statistics-viewer/StatisticsViewer';
import Toolbar from './components/toolbar/Toolbar';
import { Actions } from './flux/actions';
import { ServiceProvider, Services } from './services/service-provider';

// Styles
import './App.scss';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.dispatcher = ServiceProvider.get(Services.DISPATCHER);
    this.logger = ServiceProvider.get(Services.LOGGER_SERVICE);
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
    })
  }


  render() {
    return (
      <div className="App">
        <Header />
        <Toolbar />
        <NotificationContainer />
        <DialogContainer />
        <div className="main-container">
          <OperationsManager />
          <StatisticsViewer />
        </div>
      </div>
    );
  }

}


export default App;
