import React from 'react';
import LabelMark from '../label-mark/LabelMark';

// Services
import { ServiceProvider, Services } from '../../services/service-provider';

// Styles
import './LabelsSelector.scss';


class LabelsSelector extends React.Component {

  constructor(props) {
    super(props);
    this.labelStore = ServiceProvider.get(Services.LABEL_STORE);
    this.state = {
      labels: [],
      value: props.value || [],
      hasFocus: false
    };
  }

  componentDidMount() {
    const { state } = this.labelStore.subscribeAndGetState(
      (state) => this.setState({ labels: state.labels })
    );
    this.setState({ state });
  }


  setLabels = (e) => {
    const checked = e.target.checked;
    const name = e.target.value;
    let labels = [];
    if (checked) {
      const label = this.state.labels.find(label => label.name === name);
      labels = this.state.value.concat(label);
    } else {
      labels = this.state.value.filter(label => label.name !== name);
    }
    this.setState({ value: labels });
    this.props.onChange && this.props.onChange( labels );
  };

  toggleFocus = (e) => this.setState({ hasFocus: !this.state.hasFocus });


  render() {
    return (
      <div className="LabelsSelector">
        <span className={`selection-container ${this.state.hasFocus ? 'focused' : ''}`}
          onClick={this.toggleFocus}>
          {this.state.value.length === 0 ?
            <div className="placeholder">Sélectionner des libellés</div> :
            this.state.value.map(label =>
              <LabelMark key={label._id} label={label} />
            )
          }
        </span>
        <div className={`options-container ${this.state.hasFocus ? '' : 'hidden'}`}>
          {this.state.labels.map(label =>
            <div key={label._id} className="option">
              <input type="checkbox" onChange={this.setLabels} value={label.name}/>
              <LabelMark label={label} />
            </div>
          )}
        </div>
      </div>
    );
  }

}


export default LabelsSelector;
