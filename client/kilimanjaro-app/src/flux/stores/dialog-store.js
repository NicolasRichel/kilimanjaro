import Actions from '../actions';
import { Store } from '../store';

class DialogStore extends Store {

  constructor() {
    super();
    this.setData({
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
    this.setData({ dialog });
  }

  _closeDialog() {
    this.setData({ dialog: null });
  }

}

export default new DialogStore();
