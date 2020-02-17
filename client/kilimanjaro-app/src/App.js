import React from 'react';
import Header from './components/header/Header';
import StatContainer from './components/stat-container/StatContainer';
import TableContainer from './components/table-container/TableContainer';
import Toolbar from './components/toolbar/Toolbar';
import { Actions } from './flux/actions';
import { ServiceProvider, Services } from './services/service-provider';

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
  }


  render() {
    return (
      <div className="App">
        <Header />
        <Toolbar />
        <TableContainer />
        <StatContainer />
      </div>
    );
  }

}


export default App;
