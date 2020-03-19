import { Store } from './store';
import { Actions } from './actions';


export class DialogStore extends Store {

  constructor() {
    super();
    this.setState({
      dialog: null
    });
  }


  handleAction(action) {
    switch (action.type) {
      case Actions.OPEN_DIALOG:
        this._openDialog(action.dialog);
        break;
      case Actions.CLOSE_DIALOG:
        this._closeDialog();
        break;
    }
  }


  _openDialog(dialog) {
    this.setState({ dialog });
  }

  _closeDialog() {
    this.setState({ dialog: null });
  }

}
