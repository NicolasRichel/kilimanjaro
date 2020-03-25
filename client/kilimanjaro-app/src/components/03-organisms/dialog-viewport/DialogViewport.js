import React from 'react';
import { Actions } from '../../../flux/actions';
import { ServiceProvider, Services } from '../../../service-provider';
// Atoms
import ActionButton from '../../01-atoms/action-button/ActionButton';

// Styles
import './DialogViewport.scss';


class DialogViewport extends React.Component {

  constructor(props) {
    super(props);
    this.dispatcher = ServiceProvider.get(Services.DISPATCHER);
    this.dialogStore = ServiceProvider.get(Services.DIALOG_STORE);
    this.dialogStoreSubscription = null;
    this.state = {
      dialog: null
    };
  }

  componentDidMount() {
    this.dialogStoreSubscription = this.dialogStore.subscribe(
      (state) => this.setState({ dialog: state.dialog })
    );
  }

  componentWillUnmount() {
    this.dialogStore.unsubscribe( this.dialogStoreSubscription );
  }


  closeDialog = () => this.dispatcher.dispatch({ type: Actions.CLOSE_DIALOG });


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
