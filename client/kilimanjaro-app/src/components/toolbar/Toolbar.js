import React from 'react';
import ToolbarButton from '../toolbar-button/ToolbarButton';

// Styles
import './Toolbar.scss';


class Toolbar extends React.Component {

  openLabelsManager = () => {
    // TODO : Open the labels management dialog
    console.log('Open labels manager.');
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
