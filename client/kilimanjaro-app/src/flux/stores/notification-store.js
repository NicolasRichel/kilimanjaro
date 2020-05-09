import { Actions } from '../actions';
import { Store } from '../store';

export class NotificationStore extends Store {

  timeout;

  constructor() {
    super();
    this.timeout = parseInt(process.env.REACT_APP_NOTIF_TIMEOUT)
    this.setState({
      notification: {}
    });
  }


  handleAction(action) {
    switch (action.type) {
      case Actions.NOTIFY:
        this._notify(action.notification);
        break;
    }
  }


  _notify(notification) {
    notification.timeout = notification.timeout > 0 ? notification.timeout : this.timeout;
    this.setState({ notification });
  }

}
