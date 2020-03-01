import React from 'react';
import { Actions } from '../../flux/actions';
import IconButton from '../icon-button/IconButton';
import ToolbarButton from '../toolbar-button/ToolbarButton';

// Services
import { ServiceProvider, Services } from '../../services/service-provider';

// Styles
import './Toolbar.scss';


class Toolbar extends React.Component {

  constructor(props) {
    super(props);
    this.dispatcher = ServiceProvider.get(Services.DISPATCHER);
  }


  openLabelsManager = () => {
    this.dispatcher.dispatch({
      type: Actions.OPEN_DIALOG,
      dialog: {
        title: 'Gestion des libellés',
        component: <IconButton icon="check" color="green"/>
      }
    })
  }


  render() {
    return (
      <div className="Toolbar">
        <ToolbarButton icon="tags" title="Gérer les libellés"
          onClick={this.openLabelsManager} />
      </div>
    );
  }
}


export default Toolbar;
