import React from 'react';
import NotificationStore from '../../../flux/stores/notification-store';

// Styles
import './NotificationViewport.scss';

class NotificationViewport extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notification: {}
    };
  }

  componentDidMount() {
    this.s0 = NotificationStore.subscribe((state) => {
      this.setState({ notification: state.notification });
      setTimeout(() => this.setState({ notification: {} }), state.notification.timeout);
    });
  }

  componentWillUnmount() {
    this.notificationStore.unsubscribe( this.s0 );
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
