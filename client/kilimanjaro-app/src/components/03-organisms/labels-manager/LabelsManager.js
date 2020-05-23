import React from 'react';
import { Actions } from '../../../flux/actions';
import Dispatcher from '../../../flux/dispatcher';
import LabelStore from '../../../flux/stores/label-store';
// Molecules
import LabelForm from '../../02-molecules/label-form/LabelForm';
import LabelsTable from '../../02-molecules/labels-table/LabelsTable';

// Styles
import './LabelsManager.scss';

class LabelsManager extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      currentLabel: {}
    };
  }

  componentDidMount() {
    this.s0 = LabelStore.subscribe( data => this.setState({ labels: data.labels }) );
    this.setState({ labels: LabelStore.getData().labels });
  }

  componentWillUnmount() {
    LabelStore.unsubscribe( this.s0 );
  }

  setCurrentLabel = (label) => this.setState({
    currentLabel: label
  });

  submitLabel = (label) => Dispatcher.dispatch({
    type: this.state.currentLabel._id ? Actions.UPDATE_LABEL : Actions.CREATE_LABEL, label
  });

  deleteLabel = (label) => Dispatcher.dispatch({
    type: Actions.DELETE_LABEL, label
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
