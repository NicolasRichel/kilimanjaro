import React from 'react';
import LabelMark from '../label-mark/LabelMark';
import * as utils from '../../utils';

// Services
import { ServiceProvider, Services } from '../../services/service-provider';

// Styles
import './OperationLabelsRenderer.scss';


class OperationLabelsRenderer extends React.Component {

  constructor(props) {
    super(props);
    this.labelStore = ServiceProvider.get(Services.LABEL_STORE);
    this.labelStoreSubscription = null;
    this.state = {
      labels: {},
      selectedLabels: []
    };
  }

  componentDidMount() {
    const s = this.labelStore.subscribeAndGetState(
      (state) => this.setLabels( state.labels )
    );
    this.labelStoreSubscription = s.subscriptionKey;
    this.setLabels( s.state.labels );
  }

  componentWillUnmount() {
    this.labelStore.unsubscribe( this.labelStoreSubscription );
  }

  componentDidUpdate() {
    const labels = this.props.operation.labels || [];
    const v1 = labels.slice().sort().join();
    const v2 = this.state.selectedLabels.slice().map(l => l._id).sort().join();
    if (v1 !== v2) {
      this.setState({
        selectedLabels: labels.map(id => this.state.labels[id]).filter(l => !!l)
      });
    }
  }


  setLabels = (labelsArray) => {
    const labels = utils.mapArrayToObject(labelsArray, '_id');
    this.setState({
      labels,
      selectedLabels: this.state.selectedLabels.map(l => labels[l._id]).filter(l => !!l)
    });
  };


  render() {
    return (
      <span className="OperationLabelsRenderer">
        {this.state.selectedLabels.map(
          label => <LabelMark key={label._id} label={label} />
        )}
      </span>
    );
  }

}


export default OperationLabelsRenderer;
