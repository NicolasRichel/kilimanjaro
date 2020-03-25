import React from 'react';
import { ServiceProvider, Services } from '../../../services/service-provider';

// Styles
import './NotificationViewport.scss';


class NotificationViewport extends React.Component {

  constructor(props) {
    super(props);
    this.notificationStore = ServiceProvider.get(Services.NOTIFICATION_STORE);
    this.notificationStoreSubscription = null;
    this.state = {
      notification: {}
    };
  }

  componentDidMount() {
    this.notificationStoreSubscription = this.notificationStore.subscribe((state) => {
      this.setState({ notification: state.notification });
      setTimeout(() => this.setState({ notification: {} }), state.notification.timeout);
    });
  }

  componentWillUnmount() {
    this.notificationStore.unsubscribe( this.notificationStoreSubscription );
  }


  render() {
    const notification = this.state.notification;
    return (
      <div className="NotificationViewport">
        {notification.message &&
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
        }
      </div>
    );
  }

}


export default NotificationViewport;
