import React from 'react';
import Actions from '../../../flux/actions';
import Dispatcher from '../../../flux/dispatcher';
import DialogStore from '../../../flux/stores/dialog-store';
// Atoms
import ActionButton from '../../01-atoms/action-button/ActionButton';

// Styles
import './DialogViewport.scss';

class DialogViewport extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dialog: null
    };
  }

  componentDidMount() {
    this.s0 = DialogStore.subscribe( data => this.setState({ dialog: data.dialog }) );
  }

  componentWillUnmount() {
    DialogStore.unsubscribe( this.s0 );
  }

  closeDialog = () => Dispatcher.dispatch({ type: Actions.CLOSE_DIALOG });

  render() {
    const dialog = this.state.dialog;
    return (
      <div className={`DialogViewport ${dialog ? '' : 'hidden'}`}>
        {dialog &&
        <div className="dialog">
          <div className="dialog-header">
            <span className="title">{dialog.title}</span>
            <ActionButton size="30" icon="times" color="white" onClick={this.closeDialog} />
          </div>
          <div className="dialog-content">
            {dialog.component}
          </div>
          <div className="dialog-footer"></div>
        </div>
        }
      </div>
    );
  }

}

export default DialogViewport;
