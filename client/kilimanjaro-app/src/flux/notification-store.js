import { Actions } from './actions';
import { Store } from './store';


export class NotificationStore extends Store {

  timeout;

  constructor(config) {
    super();
    this.timeout = config.notificationTimeout;
    this.setState({
      notification: {}
    });
  }


  handleAction(action) {
    switch (action.type) {
      case Actions.NOTIFY:
        this._notify(action.notification);
        break;
      default: // To avoid warnings in console
    }
  }


  _notify(notification) {
    notification.timeout = notification.timeout > 0 ? notification.timeout : this.timeout;
    this.setState({ notification });
  }

}
