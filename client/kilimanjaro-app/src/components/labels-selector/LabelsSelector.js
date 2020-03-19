import React from 'react';
import LabelTag from '../label-tag/LabelTag';

// Styles
import './LabelsSelector.scss';


class LabelsSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasFocus: false
    };
  }


  setValue = (label) => {
    return (e) => {
      const currentValue = this.props.value || [];
      let newValue = [];
      if (e.target.checked) {
        newValue = currentValue.concat(label._id);
      } else {
        newValue = currentValue.filter(id => id !== label._id);
      }
      this.emiValue( newValue );
    }
  };

  emiValue = (value) => this.props.onChange && this.props.onChange( value );

  toggleFocus = () => this.setState({ hasFocus: !this.state.hasFocus });


  render() {
    const value = this.props.value || [];
    return (
      <div className="LabelsSelector">
        <span className={`selection-container ${this.state.hasFocus ? 'focused' : ''}`}
          onClick={this.toggleFocus}>
          {value.length === 0 ?
            <div className="placeholder">Sélectionner des libellés</div> :
            this.props.labels.filter(
              l => value.includes(l._id)
            ).map(label =>
              <LabelTag key={label._id} label={label} />
            )
          }
        </span>
        <div className={`options-container ${this.state.hasFocus ? '' : 'hidden'}`}>
          {this.props.labels.map(label =>
            <div key={label._id} className="option">
              <input type="checkbox"
                checked={value.includes(label._id)}
                onChange={this.setValue(label)}
              />
              <LabelTag label={label} />
            </div>
          )}
        </div>
      </div>
    );
  }

}


export default LabelsSelector;
