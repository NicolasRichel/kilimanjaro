import React from 'react';
import LabelMark from '../label-mark/LabelMark';
import * as utils from '../../utils';

// Services
import { ServiceProvider, Services } from '../../services/service-provider';

// Styles
import './LabelsSelector.scss';


class LabelsSelector extends React.Component {

  constructor(props) {
    super(props);
    this.labelStore = ServiceProvider.get(Services.LABEL_STORE);
    this.labelStoreSubscription = null;
    this.state = {
      labels: [],
      selectedLabels: [],
      value: props.value || [],
      hasFocus: false
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
    const value = this.props.value || [];
    const v1 = value.slice().sort().join();
    const v2 = this.state.value.slice().sort().join();
    if (v1 !== v2) {
      this.setState({
        selectedLabels: value.map(id => this.state.labels[id]).filter(id => !!id),
        value
      });
    }
  }


  setLabels = (labelsArray) => {
    const labels = utils.mapArrayToObject(labelsArray, '_id');
    this.setState({
      labels,
      selectedLabels: this.state.value.map(id => labels[id]).filter(l => !!l)
    });
  };

  setValue = (e) => {
    const checked = e.target.checked;
    const labelID = e.target.value;
    let value = [];
    let selectedLabels = [];
    if (checked) {
      const label = this.state.labels[labelID];
      selectedLabels = this.state.selectedLabels.concat(label);
      value = this.state.value.concat(labelID);
    } else {
      selectedLabels = this.state.selectedLabels.filter(label => label._id !== labelID);
      value = this.state.value.filter(id => id !== labelID);
    }
    this.setState({ selectedLabels, value });
    this.emiValue( value );
  };

  emiValue = (value) => this.props.onChange && this.props.onChange( value );

  toggleFocus = () => this.setState({ hasFocus: !this.state.hasFocus });


  render() {
    return (
      <div className="LabelsSelector">
        <span className={`selection-container ${this.state.hasFocus ? 'focused' : ''}`}
          onClick={this.toggleFocus}>
          {this.state.value.length === 0 ?
            <div className="placeholder">Sélectionner des libellés</div> :
            this.state.selectedLabels.map(label =>
              <LabelMark key={label._id} label={label} />
            )
          }
        </span>
        <div className={`options-container ${this.state.hasFocus ? '' : 'hidden'}`}>
          {Object.keys(this.state.labels).map(labelID => {
            const label = this.state.labels[labelID];
            return (
              <div key={label._id} className="option">
                <input type="checkbox"
                  checked={!!this.state.value.find(id => id === label._id)}
                  value={label._id}
                  onChange={this.setValue}
                />
                <LabelMark label={label} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

}


export default LabelsSelector;
