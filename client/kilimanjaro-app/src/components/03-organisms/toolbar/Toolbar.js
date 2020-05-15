import React from 'react';
import { Actions } from '../../../flux/actions';
import { ServiceProvider, Services } from '../../../service-provider';
// Atoms
import ToolbarButton from '../../01-atoms/toolbar-button/ToolbarButton';
// Organisms
import LabelsManager from '../labels-manager/LabelsManager';

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
        component: <LabelsManager />
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
