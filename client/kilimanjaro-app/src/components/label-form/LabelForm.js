import React from 'react';
import ColorInput from '../color-input/ColorInput';
import IconButton from '../icon-button/IconButton';
import LabelMark from '../label-mark/LabelMark';
import StringInput from '../string-input/StringInput';

// Styles
import './LabelForm.scss';


class LabelForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      label: props.label || {}
    };
  }

  componentDidUpdate() {
    if (this.props.label._id !== this.state.label._id) {
      this.setState({
        label: this.props.label
      });
    }
  }


  setLabelField = (field) => {
    return (value) => this.setState({
      label: {
        ...this.state.label,
        [field]: value
      }
    });
  }

  validate = () => true

  submit = () => {
    if (this.validate()) {
      this.props.onSubmit( this.state.label );
      this.clear();
    }
  }

  clear = () => this.setState({
    label: {}
  });


  render() {
    const label = this.state.label;
    return (
      <div className="LabelForm">
        <div className="block form-control">
          <label>Nom</label>
          <StringInput value={label.name}
            onChange={this.setLabelField('name')}
            className="NameInput" />
        </div>
        <div className="block form-control">
          <label>Couleur</label>
          <ColorInput value={label.color}
            onChange={this.setLabelField('color')} />
        </div>
        <div className="block form-control">
          <label>Couleur Texte</label>
          <ColorInput value={label.textColor}
            onChange={this.setLabelField('textColor')} />
        </div>
        <div className="block submit-button">
          <span className="label-preview">
            Label : {label.name && <LabelMark label={label} />}
          </span>
          <IconButton icon="check" size="30" onClick={this.submit} />
        </div>
      </div>
    );
  }

}


export default LabelForm;
