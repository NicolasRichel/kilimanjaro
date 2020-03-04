import React from 'react';
import { Actions } from '../../flux/actions';
import LabelForm from '../label-form/LabelForm';
import LabelsTable from '../labels-table/LabelsTable';

// Services
import { ServiceProvider, Services } from '../../services/service-provider';

// Styles
import './LabelsManager.scss';


class LabelsManager extends React.Component {

  constructor(props) {
    super(props);
    this.dispatcher = ServiceProvider.get(Services.DISPATCHER);
    this.state = {
      currentLabel: {}
    };
  }


  selectLabel = (label) => this.setState({
    currentLabel: label
  });

  submitLabel = (label) => this.dispatcher.dispatch({
    type: this.state.currentLabel._id ? Actions.UPDATE_LABEL : Actions.CREATE_LABEL,
    label
  });


  render() {
    return (
      <div className="LabelsManager">
        <LabelsTable onSelect={this.selectLabel} />
        <LabelForm label={this.state.currentLabel} onSubmit={this.submitLabel} />
      </div>
    );
  }

}


export default LabelsManager;
