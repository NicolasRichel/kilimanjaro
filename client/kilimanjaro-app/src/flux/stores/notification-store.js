import { Actions } from '../actions';
import { Store } from '../store';

class NotificationStore extends Store {

  timeout;

  constructor() {
    super();
    this.timeout = parseInt(process.env.REACT_APP_NOTIF_TIMEOUT)
    this.setData({
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
    this.setData({ notification });
  }

}

export default new NotificationStore();
