import React from 'react';
import { Actions } from '../../flux/actions';
import IconButton from '../icon-button/IconButton';

// Services
import { ServiceProvider, Services } from '../../services/service-provider';

// Styles
import './DialogContainer.scss';


class DialogContainer extends React.Component {

  constructor(props) {
    super(props);
    this.dispatcher = ServiceProvider.get(Services.DISPATCHER);
    this.dialogStore = ServiceProvider.get(Services.DIALOG_STORE);
    this.state = {
      dialog: null
    };
  }

  componentDidMount() {
    this.dialogStore.subscribe(
      (state) => this.setState({ dialog: state.dialog })
    );
  }


  closeDialog = () => this.dispatcher.dispatch({ type: Actions.CLOSE_DIALOG });


  render() {
    const dialog = this.state.dialog;
    return (
      <div className={`DialogContainer ${dialog ? '' : 'hidden'}`}>
        {dialog &&
        <div className="dialog">
          <div className="dialog-header">
            <span className="title">{dialog.title}</span>
            <IconButton size="30" icon="times" color="white" onClick={this.closeDialog} />
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


export default DialogContainer;
