import React from 'react';
import { Actions } from '../../../flux/actions';
import { ServiceProvider, Services } from '../../../services/service-provider';
// Molecules
import LabelForm from '../../02-molecules/label-form/LabelForm';
import LabelsTable from '../../02-molecules/labels-table/LabelsTable';

// Styles
import './LabelsManager.scss';


class LabelsManager extends React.Component {

  constructor(props) {
    super(props);
    this.dispatcher = ServiceProvider.get(Services.DISPATCHER);
    this.labelStore = ServiceProvider.get(Services.LABEL_STORE);
    this.labelStoreSubscription = null;
    this.state = {
      labels: [],
      currentLabel: {}
    };
  }

  componentDidMount() {
    this.labelStoreSubscription = this.labelStore.subscribe(
      state => this.setState({ labels: state.labels })
    );
    this.setState({
      labels: this.labelStore.getState().labels
    });
  }

  componentWillUnmount() {
    this.labelStore.unsubscribe( this.labelStoreSubscription );
  }


  setCurrentLabel = (label) => this.setState({
    currentLabel: label
  });

  submitLabel = (label) => this.dispatcher.dispatch({
    type: this.state.currentLabel._id ? Actions.UPDATE_LABEL : Actions.CREATE_LABEL,
    label
  });

  deleteLabel = (label) => this.dispatcher.dispatch({
    type: Actions.DELETE_LABEL,
    labelID: label._id
  });


  render() {
    return (
      <div className="LabelsManager">
        <LabelsTable labels={this.state.labels}
          onSelect={this.setCurrentLabel}
          onDelete={this.deleteLabel} />
        <LabelForm label={this.state.currentLabel}
          onSubmit={this.submitLabel} />
      </div>
    );
  }

}


export default LabelsManager;
